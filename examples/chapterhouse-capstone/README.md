# Chapterhouse Capstone — Reference Implementation

The runnable spine for **Chapter 42 — From Real Problem to Production Product** in *The AI-Native Engineer*. It implements the deterministic half of the Brightside Yoga case study: nightly reconciliation of class bookings against payment charges, surfacing the mismatches that cost the studio real money.

It deliberately contains **no AI**. The agent triage layer described in lesson 42.2.2 is intentionally absent here — the capstone rule is *deterministic spine first*, agents only when a task is irreducibly open-ended. Everything in this folder is verifiable with a laptop and zero external services.

## What's in the box

```
chapterhouse-capstone/
├── package.json               # scripts: dev, start, migrate, seed, test, build
├── .env.example               # every variable documented; test-mode Stripe keys only
├── db/migrations/
│   ├── 001_init.sql           # studios, members, class_sessions, bookings, payments, reconciliations
│   ├── 002_seed.sql           # 3 studios × 12 members × 12 sessions × 40 bookings × 33 payments
│   └── 003_webhook_events.sql # Stripe webhook idempotency ledger (replay protection)
├── public/
│   └── index.html             # demo dashboard — gated UI for the same ops data
├── src/
│   ├── app.js                 # Express assembly — NO business logic here
│   ├── server.js              # entrypoint
│   ├── reconcile.js           # PURE function: (bookings, payments) → mismatches
│   ├── routes/                # health · bookings · reconciliations · webhooks/stripe
│   ├── lib/                   # stripe signature verify · cron gate (timing-safe) · rate limiter · JSON logger
│   └── db/                    # pool · migrate · seed
└── test/
    ├── health.test.js         # /health responds ok
    ├── reconcile.test.js      # pure-function fixture cases (incl. amount-mismatch)
    └── bookings.test.js       # full HTTP integration against in-process PGlite
```

## Business rules (all in `src/reconcile.js`)

- An **attended booking with no matching charge** → `missing_payment`
- A **charge with no corresponding booking** → `missing_booking`
- An **attended booking paid more than once** → `duplicate_payment`
- A **charge whose amount differs from the session price** → `amount_mismatch` (when the session price is known, which it always is here)
- `attended = NULL` means the session hasn't closed yet — never flagged
- **Payments not tied to a session** (`class_session_id IS NULL`) are skipped by the matcher — they cannot be reconciled against bookings and are surfaced nowhere in this demo. Real deployments should emit an `unlinked_payment` verdict for visibility.
- Cross-studio integrity: the reconciliation run is **studio-scoped** (`WHERE studio_id = $1`); the seed contains one deliberately dangling charge (`ch_4033`, studio 1, member 6 — a studio-2 member), which the studio-1 run reports as `missing_booking` by design.

## Quick start

```bash
npm ci
cp .env.example .env    # fill in test-mode Stripe values if you want the webhook route
npm run migrate         # applies 001_init + 002_seed + 003_webhook_events (idempotent)
npm run dev             # listens on :3000 (and serves the demo dashboard at /)
```

Demo walkthrough:

```bash
# 1. list bookings as member 1 (seeded data)
curl -H "x-member-id: 1" http://localhost:3000/api/members/1/bookings

# 2. trigger the nightly reconciliation on demand (machine-to-machine)
curl -X POST http://localhost:3000/api/reconciliations/run \
  -H "x-cron-secret: change-me-to-a-long-random-string" \
  -H "content-type: application/json" \
  -d '{"studio_id": 1}'
# → summary: { attended: 31, matched: 30, missing_payment: 1, missing_booking: 1, duplicate_payment: 1, amount_mismatch: 0 }

# 3. read the persisted result (ops-only — same secret)
curl -H "x-cron-secret: change-me-to-a-long-random-string" http://localhost:3000/api/reconciliations
# → { reconciliations: [ { run_date, booking_count, payment_count, mismatches, needs_action, ... } ] }

# 4. or open the dashboard
open http://localhost:3000/    # paste the same secret into the box
```

Members 1–12 exist in the seed; member 6 has one dangling charge (`ch_4033`).

## Tests

```bash
npm test
```

Boots an in-process PostgreSQL (PGlite), applies the real migrations **and** the seed, and exercises the HTTP surface: authz (401/403), ops-route auth (401/200), studio filtering, the reconciliation run against known-seeded mismatches, malformed input (400), Stripe webhook signature verification (reject + accept + replay-duplicate), and the zero-amount schema guard. One command, no Docker, no cloud account.

`npm run build` syntax-checks every file instead — a Node service has nothing to bundle.

## Security model

- **Demo `x-member-id` header** authenticates member-scoped routes (`/api/members/:id/bookings`) — a placeholder; production uses the client's SSO/OIDC.
- **Machine-to-machine `x-cron-secret`** gates all reconciliation-ops routes (`/api/reconciliations*`). Compared with `crypto.timingSafeEqual`; missing secret fails closed (503), wrong secret is a 401.
- **Stripe webhooks** are verified with `node:crypto` (HMAC-SHA256 of `t.body` against the signing secret, 5-minute tolerance, `timingSafeEqual`), replay-protected via the `webhook_events` table (atomic insert-or-skip), and reject malformed JSON after a valid signature with 400.
- **Rate limiting** on the machine-run route (10 req/min per IP) — production should use Redis or platform rules.
- **Structured JSON logs** — one line per event; secrets and PII are never logged (`x-cron-secret`, `stripe-signature`, `authorization`, `password` denylist).
- **Errors never leak stacks** — the central handler logs JSON and returns a generic message.
- No secrets are committed; `.env.example` uses `replace_me` values. New webhook/cron tests use throwaway literals, never real keys.

## Cost model (illustrative, dated 2026-11-19)

Estimates assume: single studio pilot, ~400 members, one nightly run/day, ~40 bookings/day, ~35 payments/day, ops-only dashboard, logs retained 30 days. Replace with your own numbers at production time; cloud prices drift — verify against current provider pages.

| Component | Example tier | Ballpark/mo |
| :-- | :-- | --: |
| App hosting (Render/Railway/Fly small) | 512MB–1GB instance, always-on or nightly cron | $0–25 |
| Postgres (managed small / Neon/Supabase free tier) | 0.5–1 CU | $0–30 |
| Object storage (if receipts/PDFs later) | <1 GB | $0–1 |
| Cron runner | included in host or GitHub Actions (free tier) | $0 |
| Logs/metrics (platform-native) | 30-day retention | $0–10 |
| Stripe fees | 2.9% + 30¢ per successful charge (US cards) | usage-based |
| **Fixed pilot floor** | | **$0–65** |
| **Variable** | per payment | ~3% of GPV |

Cost-control measures: run the reconciliation **once nightly** (not per-request); cache the dashboard's summary for 5 minutes; cap alert email volume; keep mismatch payloads small; avoid storing raw card data (Stripe IDs only); right-size the DB and scale down between nightly runs.

## Rolling back

Migrations are forward-only by design. To roll back: restore the pre-deploy database backup (`pg_dump` snapshot) and redeploy the previous release; for surgical reversals, write a one-off `004_down_<name>.sql` that reverses exactly one change and apply it manually — never edit an already-applied migration. Roll the app first, the schema second.

## Troubleshooting

| Symptom | Cause | Fix |
| :-- | :-- | :-- |
| `DATABASE_URL is not set` | `.env` missing or not loaded | `cp .env.example .env` |
| `ECONNREFUSED` on port 5432 | No local Postgres | Use `npm test` (PGlite) or point `DATABASE_URL` at one |
| Webhook returns 503 | `STRIPE_WEBHOOK_SECRET` unset | Set it, or use `stripe listen` output |
| `401 invalid cron secret` | Header mismatch | Send `x-cron-secret` matching `.env` |
| `attended` total seems low | Sessions not closed (`attended = NULL`) | Expected — NULLs are never counted |
| 404 on `/api/reconciliations` with no secret | Ops-only route | Expected — the gate is the spec |

## Deployment notes

Any Node host works (Render, Railway, Fly.io, a VM). Run `npm run migrate` as part of the release step, provide the env vars from your secret store, and put the nightly trigger behind the same secret. Do not expose `/api/reconciliations/run` publicly without it. Terminate TLS at the platform or a reverse proxy (see Part 05, Chapter 17).

## Verification status

- Executed locally before this README was written: `npm test` (integration + unit), `npm run build`.
- Not exercised: live Stripe delivery, real cron infrastructure, production deploy. Those are documented-not-executed — see the capstone lesson's shipping checklist (42.3.2). Never treat mocked signature acceptance as proof of a live Stripe integration.
