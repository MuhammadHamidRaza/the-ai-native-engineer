# ShopCore — Reference Implementation

Runnable backend for the **ShopCore** project used throughout Part 04 of *The AI-Native Engineer*. It is the API the book teaches you to write — kept here so the book's claims can be **executed and verified**, not just read.

**Status: EXECUTED (November 2026, Node v24.13.1, PostgreSQL 18 via PGlite WASM) — see `test/`.**

## What is inside

```text
examples/shopcore/
├── db/migrations/          # 001_init, 002_seed, 003_sessions, 004_cart, 005_checkout_keys
├── src/
│   ├── app.js              # express assembly: helmet, cors, cookies, routes, error handler
│   ├── server.js           # listen on PORT (default 4000)
│   ├── db/                 # pool + migration runner
│   ├── lib/                # crypto.js (scrypt/sha256), session.js, errors.js
│   ├── middleware/         # validateBody, requireAuth, requireRole
│   └── routes/             # auth.js, products.js, cart.js, orders.js
└── test/shopcore.test.mjs  # PGlite-backed integration suite (offline)
```

## Offline test harness (no Postgres install required)

The suite boots an **in-process PostgreSQL 18** (`@electric-sql/pglite` + `@electric-sql/pglite-socket`), applies the real migrations, starts the app, and exercises the HTTP API: health, catalog + search, register (201/409/400), login/me/logout, role guard (401/403/200), the cart → checkout transaction (stock decrement + payment + cart clearing), **checkout idempotency** via `Idempotency-Key`, `OUT_OF_STOCK` handling, and order ownership (403 for non-owners).

```bash
cd examples/shopcore
npm ci
npm test
```

Expected: `9 passed`.

> Note: `@electric-sql/pglite` runs Postgres compiled to WebAssembly inside the Node process — it is a real Postgres engine (it prints `PostgreSQL 18.6 (PGlite 0.5.16)`), ideal for tests. Use a real PostgreSQL server for the production-like exercises in Chapters 12–15.

## Run against a local PostgreSQL

```bash
createdb -U postgres shopcore
cp .env.example .env    # set DATABASE_URL + password
npm run migrate
npm start
curl -s localhost:4000/health
```

Register your **own** fresh account (`ada@example.com` is taken by the seed):

```bash
curl -c jar.txt -X POST localhost:4000/api/v1/auth/register \
  -H 'content-type: application/json' \
  -d '{"email":"you@example.com","full_name":"You","password":"your-long-password"}'
curl -b jar.txt localhost:4000/api/v1/auth/me
```

## Demo credentials (public, local-only)

| Email | Password | Role |
| :-- | :-- | :-- |
| `ada@example.com` | `correct horse battery staple` | customer |
| `grace@example.com` | `grace-demo-password-1` | customer |
| `linus@example.com` | `linus-demo-password-1` | admin |

These protect only the seeded local demo database — never reuse them anywhere real.

## Honest notes

- Pinned in `package-lock.json` as of Nov 2026: Express 5, zod 4. The book's code snippets remain valid for Express 4 / zod 3 — the API subset used here is identical.
- The order-creation flow snapshots `unit_price_cents` on `order_items`, so future catalog price edits never rewrite historical receipts.
- Checkout uses a single dedicated client with `BEGIN … COMMIT` — never `pool.query` for multi-statement transactions.
