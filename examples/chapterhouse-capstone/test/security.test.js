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
const PGLITE_PORT = 55442;

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

// NOTE: this file reuses the same PGlite port pattern as bookings.test.js but is
// intentionally standalone so security tests run in isolation.
after(async () => {
  await new Promise((resolve) => server.close(resolve));
  const { pool } = await import('../src/db/pool.js');
  await pool.end();
  await socket.stop();
  await db.close();
});

test('reconciliation reports require the cron secret', async () => {
  const unauth = await fetch(`${baseUrl}/api/reconciliations`);
  assert.equal(unauth.status, 401);
  const auth = await fetch(`${baseUrl}/api/reconciliations`, { headers: { 'x-cron-secret': 'test-cron-secret' } });
  assert.equal(auth.status, 200);
  const body = await auth.json();
  assert.ok(Array.isArray(body.reconciliations));
});

test('reconciliation detail 400s on a non-numeric id', async () => {
  const res = await fetch(`${baseUrl}/api/reconciliations/abc`, { headers: { 'x-cron-secret': 'test-cron-secret' } });
  assert.equal(res.status, 400);
});

test('studio filter returns only that studio', async () => {
  const res = await fetch(`${baseUrl}/api/reconciliations?studio_id=1`, { headers: { 'x-cron-secret': 'test-cron-secret' } });
  assert.equal(res.status, 200);
  const body = await res.json();
  for (const row of body.reconciliations) assert.equal(row.studio_id, 1);
});

test('stripe webhook replayed delivery is acknowledged without reprocessing', async () => {
  const { signTestPayload } = await import('../src/lib/stripeVerify.js');
  const payload = JSON.stringify({ type: 'charge.succeeded', id: 'evt_test_replay' });
  const header = signTestPayload(payload, 'whsec_test');
  const first = await fetch(`${baseUrl}/webhooks/stripe`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'stripe-signature': header },
    body: payload,
  });
  assert.equal(first.status, 200);
  const second = await fetch(`${baseUrl}/webhooks/stripe`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'stripe-signature': header },
    body: payload,
  });
  assert.equal(second.status, 200);
  const body = await second.json();
  assert.equal(body.duplicate, true);
});

test('malformed webhook JSON after a valid signature is rejected as 400', async () => {
  const crypto = await import('node:crypto');
  const secret = 'whsec_test';
  const t = Math.floor(Date.now() / 1000);
  const raw = 'not-json{{{';
  const sig = crypto.createHmac('sha256', secret).update(t + '.' + raw, 'utf8').digest('hex');
  const res = await fetch(`${baseUrl}/webhooks/stripe`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'stripe-signature': 't=' + t + ',v1=' + sig },
    body: raw,
  });
  assert.equal(res.status, 400);
});

test('zero-amount payment is rejected by the schema', async () => {
  const { pool } = await import('../src/db/pool.js');
  await assert.rejects(
    pool.query("INSERT INTO payments (studio_id, member_id, class_session_id, stripe_charge_id, amount_cents, paid_at) VALUES (1, 1, 1, 'ch_zero_test', 0, now())"),
    /amount_cents/i,
  );
});

test('malformed JSON body on POST /api/reconciliations/run returns 400, not 500', async () => {
  const res = await fetch(`${baseUrl}/api/reconciliations/run`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-cron-secret': 'test-cron-secret' },
    body: '{not json',
  });
  assert.equal(res.status, 400);
});
