-- 003_sessions.sql — sessions (identical to 15.2.2 §1)
BEGIN;

CREATE TABLE sessions (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id     BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash  TEXT NOT NULL UNIQUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at  TIMESTAMPTZ NOT NULL
);
CREATE INDEX idx_sessions_user_id ON sessions (user_id);
CREATE INDEX idx_sessions_expiry  ON sessions (expires_at);
INSERT INTO schema_migrations (version) VALUES ('003_sessions') ON CONFLICT DO NOTHING;

COMMIT;
