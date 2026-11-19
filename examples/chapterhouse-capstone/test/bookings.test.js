// Offline integration test: boots in-process PostgreSQL (PGlite + socket),
// applies the real migrations (including the demo seed), starts the app on an
// ephemeral port, and exercises the public HTTP surface end to end.

import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { PGlite } from '@electric-sql/pglite';
import { PGLiteSocketServer } from '@electric-sql/pglite-socket';
import pg from 'pg';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const migrationsDir = path.join(__dirname, '..', 'db', 'migrations');
const PGLITE_PORT = 55441;

process.env.CRON_SECRET = 'test-cron-secret';
process.env.STRIPE_WEBHOOK_SECRET = 'whsec_test';

let db, socket, server, baseUrl;

before(async () => {
  db = new PGlite();
  socket = new PGLiteSocketServer({ db, port: PGLITE_PORT, host: '127.0.0.1' });
  await socket.start();

  process.env.DATABASE_URL = `postgresql://postgres@127.0.0.1:${PGLITE_PORT}/template1`;

  const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  const files = (await fs.readdir(migrationsDir)).filter((f) => f.endsWith('.sql')).sort();
  for (const file of files) {
    await client.query(await fs.readFile(path.join(migrationsDir, file), 'utf8'));
  }
  await client.end();

  const { createApp } = await import('../src/app.js');
  const app = createApp();
  await new Promise((resolve) => { server = app.listen(0, '127.0.0.1', resolve); });
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve) => server.close(resolve));
  const { pool } = await import('../src/db/pool.js');
  await pool.end();
  await socket.stop();
  await db.close();
});

test('member can read own bookings (seeded data)', async () => {
  const res = await fetch(`${baseUrl}/api/members/1/bookings`, { headers: { 'x-member-id': '1' } });
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.member_id, 1);
  assert.ok(body.bookings.length >= 4, `expected seeded bookings for member 1, got ${body.bookings.length}`);
});

test('member cannot read another member\'s bookings (403)', async () => {
  const res = await fetch(`${baseUrl}/api/members/2/bookings`, { headers: { 'x-member-id': '1' } });
  assert.equal(res.status, 403);
});

test('missing auth header is 401', async () => {
  const res = await fetch(`${baseUrl}/api/members/1/bookings`);
  assert.equal(res.status, 401);
});

test('cron route rejects wrong secret (401)', async () => {
  const res = await fetch(`${baseUrl}/api/reconciliations/run`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-cron-secret': 'wrong' },
    body: JSON.stringify({ studio_id: 1 }),
  });
  assert.equal(res.status, 401);
});

test('cron run reconciles seeded data and reports known mismatches', async () => {
  const res = await fetch(`${baseUrl}/api/reconciliations/run`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-cron-secret': 'test-cron-secret' },
    body: JSON.stringify({ studio_id: 1 }),
  });
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.summary.missing_payment, 1);
  assert.equal(body.summary.missing_booking, 1);
  assert.equal(body.summary.duplicate_payment, 1);
  assert.ok(body.summary.attended > 0);
});

test('stripe webhook rejects bad signature (401)', async () => {
  const res = await fetch(`${baseUrl}/webhooks/stripe`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'stripe-signature': 't=1,v1=bad' },
    body: JSON.stringify({ type: 'charge.succeeded', id: 'evt_test' }),
  });
  assert.equal(res.status, 401);
});

test('stripe webhook accepts a correctly signed payload', async () => {
  const { signTestPayload } = await import('../src/lib/stripeVerify.js');
  const payload = JSON.stringify({ type: 'charge.succeeded', id: 'evt_test_ok' });
  const header = signTestPayload(payload, 'whsec_test');
  const res = await fetch(`${baseUrl}/webhooks/stripe`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'stripe-signature': header },
    body: payload,
  });
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.received, true);
});

