-- Chapterhouse capstone reference schema (PostgreSQL 14+)
-- Deterministic core for the Brightside Yoga reconciliation product.
-- Every change is a numbered file; never edit an applied migration.

BEGIN;

CREATE TABLE IF NOT EXISTS schema_migrations (
  version TEXT PRIMARY KEY,
  applied_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS studios (
  id          BIGSERIAL PRIMARY KEY,
  name        TEXT NOT NULL UNIQUE,
  city        TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS members (
  id          BIGSERIAL PRIMARY KEY,
  studio_id   BIGINT NOT NULL REFERENCES studios(id) ON DELETE CASCADE,
  full_name   TEXT NOT NULL,
  email       TEXT NOT NULL UNIQUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_members_studio ON members (studio_id);

CREATE TABLE IF NOT EXISTS class_sessions (
  id          BIGSERIAL PRIMARY KEY,
  studio_id   BIGINT NOT NULL REFERENCES studios(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  starts_at   TIMESTAMPTZ NOT NULL,
  price_cents INTEGER NOT NULL CHECK (price_cents > 0),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_sessions_studio ON class_sessions (studio_id);

-- bookings come from the booking app (source of truth for attendance)
CREATE TABLE IF NOT EXISTS bookings (
  id               BIGSERIAL PRIMARY KEY,
  studio_id        BIGINT NOT NULL REFERENCES studios(id) ON DELETE CASCADE,
  member_id        BIGINT NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  class_session_id BIGINT NOT NULL REFERENCES class_sessions(id) ON DELETE CASCADE,
  booked_at        TIMESTAMPTZ NOT NULL,
  attended         BOOLEAN,                 -- NULL until session closes
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (member_id, class_session_id)
);
CREATE INDEX IF NOT EXISTS idx_bookings_studio ON bookings (studio_id);
CREATE INDEX IF NOT EXISTS idx_bookings_member ON bookings (member_id);

-- payments come from the payment processor (source of truth for money)
CREATE TABLE IF NOT EXISTS payments (
  id               BIGSERIAL PRIMARY KEY,
  studio_id        BIGINT NOT NULL REFERENCES studios(id) ON DELETE CASCADE,
  member_id        BIGINT NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  class_session_id BIGINT REFERENCES class_sessions(id) ON DELETE SET NULL,
  stripe_charge_id TEXT UNIQUE NOT NULL,
  amount_cents     INTEGER NOT NULL CHECK (amount_cents > 0),
  paid_at          TIMESTAMPTZ NOT NULL,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_payments_studio ON payments (studio_id);
CREATE INDEX IF NOT EXISTS idx_payments_member ON payments (member_id);
CREATE INDEX IF NOT EXISTS idx_payments_session ON payments (class_session_id);

-- our product: the reconciliation verdict, computed nightly
CREATE TABLE IF NOT EXISTS reconciliations (
  id            BIGSERIAL PRIMARY KEY,
  studio_id     BIGINT NOT NULL REFERENCES studios(id) ON DELETE CASCADE,
  run_date      DATE NOT NULL,
  booking_count INTEGER NOT NULL,
  payment_count INTEGER NOT NULL,
  mismatches    JSONB NOT NULL DEFAULT '[]',
  auto_resolved INTEGER NOT NULL DEFAULT 0,
  needs_action  INTEGER NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (studio_id, run_date)
);

INSERT INTO schema_migrations (version) VALUES ('001_init')
ON CONFLICT (version) DO NOTHING;

COMMIT;
