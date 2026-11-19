-- 004_cart.sql — server-side per-user cart (identical to 15.2.3 §2)
BEGIN;

CREATE TABLE cart_items (
  user_id    BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  qty        INTEGER NOT NULL CHECK (qty > 0),
  PRIMARY KEY (user_id, product_id)
);
INSERT INTO schema_migrations (version) VALUES ('004_cart') ON CONFLICT DO NOTHING;

COMMIT;
