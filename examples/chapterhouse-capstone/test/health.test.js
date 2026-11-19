import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';

// The app builds its DB pool lazily at import time; no query is made for
// /health, so a placeholder URL is fine here.
process.env.DATABASE_URL ??= 'postgresql://127.0.0.1:1/unused';

let server, baseUrl;

before(async () => {
  const { createApp } = await import('../src/app.js');
  const app = createApp();
  await new Promise((resolve) => { server = app.listen(0, '127.0.0.1', resolve); });
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve) => server.close(resolve));
});

test('GET /health returns ok', async () => {
  const res = await fetch(`${baseUrl}/health`);
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.status, 'ok');
});
