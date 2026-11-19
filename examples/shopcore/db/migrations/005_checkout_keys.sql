-- 005_checkout_keys.sql — idempotency for checkout (15.2.3 Challenge, implemented here)
-- A client may send an Idempotency-Key header; the key is stored with the resulting
-- order id so a retry returns the same order instead of double-charging.
BEGIN;

CREATE TABLE checkout_keys (
  key        TEXT PRIMARY KEY,
  user_id    BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  order_id   BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
INSERT INTO schema_migrations (version) VALUES ('005_checkout_keys') ON CONFLICT DO NOTHING;

COMMIT;
