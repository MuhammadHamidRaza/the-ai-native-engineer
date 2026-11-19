// Offline integration tests for the ShopCore reference API.
// Boots an in-process PostgreSQL (PGlite + pglite-socket), applies the real
// migrations from db/migrations/, starts the app on an ephemeral port, and
// exercises the public HTTP surface. No external services required.

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
const PGLITE_PORT = 55440;

let db, socket, server, baseUrl;

before(async () => {
  db = new PGlite();
  socket = new PGLiteSocketServer({ db, port: PGLITE_PORT, host: '127.0.0.1' });
  await socket.start();

  process.env.DATABASE_URL = `postgresql://postgres@127.0.0.1:${PGLITE_PORT}/template1`;
  process.env.SESSION_TTL_DAYS = '7';
  process.env.NODE_ENV = 'test';
  process.env.CORS_ORIGIN = 'http://localhost:3000';

  // Apply every migration in order — exactly like production.
  const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  const files = (await fs.readdir(migrationsDir)).filter((f) => f.endsWith('.sql')).sort();
  for (const file of files) {
    await client.query(await fs.readFile(path.join(migrationsDir, file), 'utf8'));
  }
  await client.end();

  // Import the app AFTER env vars exist (pool.js reads DATABASE_URL at import time).
  const { app } = await import('../src/app.js');
  await new Promise((resolve) => { server = app.listen(0, '127.0.0.1', resolve); });
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve) => server.close(resolve));
  const { pool } = await import('../src/db/pool.js');
  await pool.end(); // drain the app's connections before the DB vanishes
  await socket.stop();
  await db.close();
});

// --- tiny cookie-aware client ------------------------------------------------

function makeJar() {
  const jar = new Map();
  return {
    store(res) {
      const set = res.headers.getSetCookie?.() ?? [];
      for (const line of set) {
        const [pair] = line.split(';');
        const eq = pair.indexOf('=');
        if (eq > 0) jar.set(pair.slice(0, eq).trim(), pair.slice(eq + 1).trim());
      }
    },
    header() {
      return [...jar.entries()].map(([k, v]) => `${k}=${v}`).join('; ');
    },
  };
}

async function api(pathname, { method = 'GET', body, jar, headers = {} } = {}) {
  const finalHeaders = { ...headers };
  if (body !== undefined) finalHeaders['content-type'] = 'application/json';
  if (jar) finalHeaders['cookie'] = jar.header();
  const res = await fetch(`${baseUrl}${pathname}`, {
    method,
    headers: finalHeaders,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  if (jar) jar.store(res);
  const text = await res.text();
  let json = null;
  try { json = text ? JSON.parse(text) : null; } catch { /* non-JSON */ }
  return { status: res.status, json };
}

// --- tests --------------------------------------------------------------------

test('GET /health reports ok', async () => {
  const { status, json } = await api('/health');
  assert.equal(status, 200);
  assert.deepEqual(json, { status: 'ok' });
});

test('catalog exposes the seeded products and search works', async () => {
  const { status, json } = await api('/api/v1/products');
  assert.equal(status, 200);
  assert.equal(json.products.length, 3);

  const search = await api('/api/v1/products?q=keyboard');
  assert.equal(search.status, 200);
  assert.deepEqual(search.json.products.map((p) => p.sku), ['KB-01']);

  const filtered = await api('/api/v1/products?category=books');
  assert.deepEqual(filtered.json.products.map((p) => p.sku), ['BK-03']);
});

test('register validates input and rejects duplicate emails', async () => {
  const bad = await api('/api/v1/auth/register', {
    method: 'POST',
    body: { email: 'not-an-email', full_name: 'X', password: 'short' },
  });
  assert.equal(bad.status, 400);

  const jar = makeJar();
  const email = `learner-${Date.now()}@example.com`;
  const created = await api('/api/v1/auth/register', {
    method: 'POST',
    body: { email, full_name: 'Learner', password: 'learner-password-123' },
    jar,
  });
  assert.equal(created.status, 201);
  assert.equal(created.json.user.email, email);

  const dup = await api('/api/v1/auth/register', {
    method: 'POST',
    body: { email, full_name: 'Learner Again', password: 'learner-password-123' },
  });
  assert.equal(dup.status, 409);
  assert.equal(dup.json.error, 'EMAIL_TAKEN');
});

test('ada can log in with the seeded demo password, /me works, logout kills the session', async () => {
  const jar = makeJar();
  const login = await api('/api/v1/auth/login', {
    method: 'POST',
    body: { email: 'ada@example.com', password: 'correct horse battery staple' },
    jar,
  });
  assert.equal(login.status, 200);
  assert.equal(login.json.user.role, 'customer');

  const me = await api('/api/v1/auth/me', { jar });
  assert.equal(me.status, 200);
  assert.equal(me.json.user.email, 'ada@example.com');

  const out = await api('/api/v1/auth/logout', { method: 'POST', jar });
  assert.equal(out.status, 204);
  const meAfter = await api('/api/v1/auth/me', { jar });
  assert.equal(meAfter.status, 401);
});

test('admin guard: anonymous 401, customer 403, admin 200', async () => {
  const anon = await api('/api/v1/orders');
  assert.equal(anon.status, 401);

  const adaJar = makeJar();
  await api('/api/v1/auth/login', {
    method: 'POST',
    body: { email: 'ada@example.com', password: 'correct horse battery staple' },
    jar: adaJar,
  });
  const forbidden = await api('/api/v1/orders', { jar: adaJar });
  assert.equal(forbidden.status, 403);

  const adminJar = makeJar();
  await api('/api/v1/auth/login', {
    method: 'POST',
    body: { email: 'linus@example.com', password: 'linus-demo-password-1' },
    jar: adminJar,
  });
  const allowed = await api('/api/v1/orders', { jar: adminJar });
  assert.equal(allowed.status, 200);
  assert.ok(Array.isArray(allowed.json.orders));
});

test('cart + checkout: atomic transaction decrements stock and empties cart', async () => {
  const jar = makeJar();
  const email = `buyer-${Date.now()}@example.com`;
  await api('/api/v1/auth/register', {
    method: 'POST',
    body: { email, full_name: 'Buyer', password: 'buyer-password-123' },
    jar,
  });

  // Seed stock: KB-01 (product 1) starts at 15 units — see 11.1.3 / 002_seed.sql.
  const add = await api('/api/v1/cart/items/1', { method: 'PUT', body: { qty: 1 }, jar });
  assert.equal(add.status, 200);
  const add2 = await api('/api/v1/cart/items/2', { method: 'PUT', body: { qty: 2 }, jar });
  assert.equal(add2.status, 200);

  const checkout = await api('/api/v1/orders/checkout', { method: 'POST', jar });
  assert.equal(checkout.status, 201);
  assert.equal(checkout.json.total_cents, 12900 + 2 * 5900);

  const cart = await api('/api/v1/cart', { jar });
  assert.equal(cart.json.items.length, 0);

  const product = await api('/api/v1/products/1');
  assert.equal(product.json.stock_qty, 14);
});

test('checkout is idempotent with an Idempotency-Key: replay returns the same order, no double stock decrement', async () => {
  const jar = makeJar();
  const email = `idem-${Date.now()}@example.com`;
  await api('/api/v1/auth/register', {
    method: 'POST',
    body: { email, full_name: 'Idem', password: 'idem-password-123' },
    jar,
  });
  await api('/api/v1/cart/items/1', { method: 'PUT', body: { qty: 1 }, jar });

  const key = `test-key-${Date.now()}`;
  const first = await api('/api/v1/orders/checkout', {
    method: 'POST', jar, headers: { 'idempotency-key': key },
  });
  assert.equal(first.status, 201);

  // Rebuild the cart and replay with the same key — the original order must come back.
  await api('/api/v1/cart/items/1', { method: 'PUT', body: { qty: 1 }, jar });
  const replay = await api('/api/v1/orders/checkout', {
    method: 'POST', jar, headers: { 'idempotency-key': key },
  });
  assert.equal(replay.status, 200);
  assert.equal(replay.json.idempotentReplay, true);
  assert.equal(replay.json.orderId, first.json.orderId);

  const product = await api('/api/v1/products/1');
  assert.equal(product.json.stock_qty, 13); // 15 - 1 (first) - 1 (replay must not decrement)
});

test('checkout rejects an oversized cart with 409 OUT_OF_STOCK and empty checkout with 400', async () => {
  const jar = makeJar();
  const email = `stock-${Date.now()}@example.com`;
  await api('/api/v1/auth/register', {
    method: 'POST',
    body: { email, full_name: 'Stock', password: 'stock-password-123' },
    jar,
  });

  const empty = await api('/api/v1/orders/checkout', { method: 'POST', jar });
  assert.equal(empty.status, 400);
  assert.equal(empty.json.error, 'CART_EMPTY');

  await api('/api/v1/cart/items/1', { method: 'PUT', body: { qty: 99 }, jar }); // KB-01 has only 15
  const tooBig = await api('/api/v1/orders/checkout', { method: 'POST', jar });
  assert.equal(tooBig.status, 409);
  assert.equal(tooBig.json.error, 'OUT_OF_STOCK');

  // Stock unchanged by the failed transaction.
  const product = await api('/api/v1/products/1');
  assert.equal(product.json.stock_qty, 13); // already decremented by the two earlier purchases
});

test('orders are visible only to their owner (and admins)', async () => {
  const buyerJar = makeJar();
  const email = `owner-${Date.now()}@example.com`;
  await api('/api/v1/auth/register', {
    method: 'POST',
    body: { email, full_name: 'Owner', password: 'owner-password-123' },
    jar: buyerJar,
  });
  await api('/api/v1/cart/items/3', { method: 'PUT', body: { qty: 1 }, jar: buyerJar });
  const checkout = await api('/api/v1/orders/checkout', { method: 'POST', jar: buyerJar });
  assert.equal(checkout.status, 201);
  const orderId = checkout.json.orderId;

  const ownerView = await api(`/api/v1/orders/${orderId}`, { jar: buyerJar });
  assert.equal(ownerView.status, 200);

  const strangerJar = makeJar();
  const strangerEmail = `stranger-${Date.now()}@example.com`;
  await api('/api/v1/auth/register', {
    method: 'POST',
    body: { email: strangerEmail, full_name: 'Stranger', password: 'stranger-password-123' },
    jar: strangerJar,
  });
  const strangerView = await api(`/api/v1/orders/${orderId}`, { jar: strangerJar });
  assert.equal(strangerView.status, 403);
});
