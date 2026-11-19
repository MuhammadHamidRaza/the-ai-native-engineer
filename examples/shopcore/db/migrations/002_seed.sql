-- 002_seed.sql — canonical ShopCore seed data (identical to 11.1.3 §4)
-- The three seeded users get PUBLIC DEMO-ONLY password hashes so login, sessions
-- and the E2E smoke tests work out of the box:
--   ada@example.com    / correct horse battery staple   (customer)
--   grace@example.com  / grace-demo-password-1          (customer)
--   linus@example.com  / linus-demo-password-1          (admin)
-- NEVER reuse these demo credentials for anything real.
BEGIN;

INSERT INTO users (email, full_name, role, password_hash) VALUES
  ('ada@example.com',  'Ada Lovelace',  'customer', '71470320f818710a6fe0ba103cc8b198:9995009a325a7f8ad1d83d0ed9a76de4f239990ea2e1cc04e1c4ba6fe9afa833974ec53c485a1257e59b7452f4bf21983a2f2d9f0f85fc7cfe4aa59197a7926c'),
  ('grace@example.com','Grace Hopper',  'customer', '0f39cef21a0ebc5193e7fcb692fa0c46:99ea6b5e1d6b8484510d7314a7000949f9a5c0e10dfce67737ff8e7a3634fc463fc2f82b9e669fdd610a7c17e4f81e2c9f613d3877f1d814c1e7e0e93b44d8f5'),
  ('linus@example.com','Linus Torvalds','admin',    '44131e6a5ce45e5f13fb32071d437456:55f612128858b7b14ac47c06e4fbc1e054ed37736b81a9b5a48d8f9f6aaad18dc0360319f77cb651261cdfd0b5983de75c2221efa3787d3c18fc101c3576b4b8');

INSERT INTO categories (name, slug) VALUES
  ('Hardware', 'hardware'),
  ('Books',    'books');

INSERT INTO products (category_id, sku, title, price_cents, stock_qty) VALUES
  (1, 'KB-01', 'Mechanical Keyboard',  12900, 15),
  (1, 'MS-02', 'Ergonomic Mouse',       5900, 30),
  (2, 'BK-03', 'Systems Architecture',  4500, 20);

-- Order 1: Ada buys a keyboard and two mice (paid)
INSERT INTO orders (user_id, status) VALUES (1, 'paid');
INSERT INTO order_items (order_id, product_id, qty, unit_price_cents) VALUES
  (1, 1, 1, 12900),
  (1, 2, 2,  5900);
INSERT INTO payments (order_id, amount_cents, provider, status) VALUES
  (1, 24700, 'manual', 'succeeded');

-- Order 2: Ada buys a book (pending payment)
INSERT INTO orders (user_id, status) VALUES (1, 'pending');
INSERT INTO order_items (order_id, product_id, qty, unit_price_cents) VALUES
  (2, 3, 1, 4500);

-- Order 3: Grace orders a mouse (pending payment)
INSERT INTO orders (user_id, status) VALUES (2, 'pending');
INSERT INTO order_items (order_id, product_id, qty, unit_price_cents) VALUES
  (3, 2, 1, 5900);

INSERT INTO schema_migrations (version) VALUES ('002_seed') ON CONFLICT DO NOTHING;

COMMIT;
