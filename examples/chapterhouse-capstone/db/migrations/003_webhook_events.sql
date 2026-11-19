-- Webhook idempotency ledger for Stripe events.
-- Stripe retries webhooks for up to ~3 days; without this table every retry
-- re-triggers downstream logic. The insert-or-skip pattern below is the same
-- idempotency the booking/payment flows use.
BEGIN;

CREATE TABLE IF NOT EXISTS webhook_events (
  stripe_event_id TEXT PRIMARY KEY,
  event_type      TEXT NOT NULL,
  received_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO schema_migrations (version) VALUES ('003_webhook_events')
ON CONFLICT (version) DO NOTHING;

COMMIT;
