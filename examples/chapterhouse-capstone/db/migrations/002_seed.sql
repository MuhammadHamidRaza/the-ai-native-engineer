-- Deterministic sample data for the Brightside Yoga reconciliation demo.
-- 3 studios · 12 members · 12 class sessions · 40 bookings · payments with
-- intentional mismatches so the nightly job has something to find.
-- Safe to re-run: guards use fixed IDs and ON CONFLICT DO NOTHING.

BEGIN;

INSERT INTO studios (id, name, city) VALUES
  (1, 'Brightside Downtown', 'Austin'),
  (2, 'Brightside Northgate', 'Austin'),
  (3, 'Brightside Riverside', 'Round Rock')
ON CONFLICT (id) DO NOTHING;

INSERT INTO members (id, studio_id, full_name, email) VALUES
  (1, 1, 'Maya Chen', 'maya@brightside.example'),
  (2, 1, 'Jordan Ellis', 'jordan@brightside.example'),
  (3, 1, 'Priya Raman', 'priya@brightside.example'),
  (4, 1, 'Tom Alvarez', 'tom@brightside.example'),
  (5, 2, 'Lena Fischer', 'lena@brightside.example'),
  (6, 2, 'Sam Whitmore', 'sam@brightside.example'),
  (7, 2, 'Nadia Rahman', 'nadia@brightside.example'),
  (8, 2, 'Chris Duarte', 'chris@brightside.example'),
  (9, 3, 'Olivia Park', 'olivia@brightside.example'),
  (10, 3, 'Ben Okafor', 'ben@brightside.example'),
  (11, 3, 'Rosa Jimenez', 'rosa@brightside.example'),
  (12, 3, 'Alex Kim', 'alex@brightside.example')
ON CONFLICT (id) DO NOTHING;

INSERT INTO class_sessions (id, studio_id, title, starts_at, price_cents) VALUES
  (1, 1, 'Sunrise Flow', '2026-10-05 07:00:00+00', 1800),
  (2, 1, 'Midday Power', '2026-10-07 12:15:00+00', 2000),
  (3, 1, 'Evening Yin', '2026-10-09 18:30:00+00', 1500),
  (4, 2, 'Sunrise Flow', '2026-10-06 07:00:00+00', 1800),
  (5, 2, 'Restorative', '2026-10-08 19:00:00+00', 1600),
  (6, 2, 'Power Hour', '2026-10-12 12:15:00+00', 2000),
  (7, 3, 'Riverside Rise', '2026-10-05 06:30:00+00', 1900),
  (8, 3, 'Lunch Express', '2026-10-09 12:30:00+00', 1700),
  (9, 3, 'Deep Stretch', '2026-10-13 18:00:00+00', 1500),
  (10, 1, 'Sunrise Flow', '2026-10-14 07:00:00+00', 1800),
  (11, 2, 'Restorative', '2026-10-15 19:00:00+00', 1600),
  (12, 3, 'Riverside Rise', '2026-10-16 06:30:00+00', 1900)
ON CONFLICT (id) DO NOTHING;

-- 40 bookings across members and sessions
INSERT INTO bookings (id, studio_id, member_id, class_session_id, booked_at, attended) VALUES
  (1, 1, 1, 1, '2026-09-28 10:00:00+00', true),
  (2, 1, 2, 1, '2026-09-28 11:00:00+00', true),
  (3, 1, 3, 2, '2026-09-30 09:00:00+00', true),
  (4, 1, 4, 3, '2026-10-01 08:00:00+00', false),
  (5, 1, 1, 2, '2026-10-02 07:30:00+00', true),
  (6, 1, 2, 2, '2026-10-02 08:45:00+00', NULL),
  (7, 1, 3, 3, '2026-10-03 15:00:00+00', true),
  (8, 1, 4, 1, '2026-10-03 16:20:00+00', true),
  (9, 1, 1, 3, '2026-10-04 10:10:00+00', true),
  (10, 1, 2, 3, '2026-10-04 11:30:00+00', false),
  (11, 1, 3, 1, '2026-10-04 12:00:00+00', true),
  (12, 1, 4, 2, '2026-10-05 09:15:00+00', true),
  (13, 1, 1, 10, '2026-10-06 08:00:00+00', true),
  (14, 1, 2, 10, '2026-10-06 08:40:00+00', true),
  (15, 1, 3, 10, '2026-10-07 07:20:00+00', NULL),
  (16, 2, 5, 4, '2026-09-29 10:00:00+00', true),
  (17, 2, 6, 4, '2026-09-29 12:00:00+00', true),
  (18, 2, 7, 5, '2026-10-01 09:00:00+00', true),
  (19, 2, 8, 5, '2026-10-01 10:30:00+00', false),
  (20, 2, 5, 5, '2026-10-02 08:00:00+00', true),
  (21, 2, 6, 5, '2026-10-02 09:45:00+00', true),
  (22, 2, 7, 6, '2026-10-04 07:30:00+00', true),
  (23, 2, 8, 6, '2026-10-04 08:15:00+00', true),
  (24, 2, 5, 6, '2026-10-05 18:00:00+00', true),
  (25, 2, 6, 6, '2026-10-05 19:00:00+00', false),
  (26, 2, 7, 4, '2026-10-06 06:30:00+00', true),
  (27, 2, 8, 4, '2026-10-06 09:00:00+00', true),
  (28, 2, 5, 11, '2026-10-08 10:00:00+00', true),
  (29, 2, 6, 11, '2026-10-08 11:00:00+00', NULL),
  (30, 2, 7, 11, '2026-10-09 12:15:00+00', true),
  (31, 3, 9, 7, '2026-09-28 09:00:00+00', true),
  (32, 3, 10, 7, '2026-09-28 10:30:00+00', true),
  (33, 3, 11, 8, '2026-10-01 08:30:00+00', true),
  (34, 3, 12, 8, '2026-10-01 09:15:00+00', false),
  (35, 3, 9, 8, '2026-10-02 07:30:00+00', true),
  (36, 3, 10, 9, '2026-10-04 08:00:00+00', true),
  (37, 3, 11, 9, '2026-10-04 09:45:00+00', true),
  (38, 3, 12, 9, '2026-10-05 10:00:00+00', true),
  (39, 3, 9, 12, '2026-10-09 09:00:00+00', true),
  (40, 3, 10, 12, '2026-10-09 10:30:00+00', NULL)
ON CONFLICT (id) DO NOTHING;

-- Payments: most bookings have a clean charge; three intentional defects:
--   missing_payment : booking 5 attended, never paid
--   missing_booking : charge ch_4001 exists with no booking row
--   duplicate_payment: booking 13 paid twice (ch_4013a + ch_4013b)
INSERT INTO payments (id, studio_id, member_id, class_session_id, stripe_charge_id, amount_cents, paid_at) VALUES
  (1, 1, 1, 1, 'ch_4001', 1800, '2026-10-05 08:00:00+00'),
  (2, 1, 2, 1, 'ch_4002', 1800, '2026-10-05 08:30:00+00'),
  (3, 1, 3, 2, 'ch_4003', 2000, '2026-10-07 13:00:00+00'),
  (4, 1, 3, 3, 'ch_4004', 1500, '2026-10-09 19:15:00+00'),
  (5, 1, 4, 1, 'ch_4005', 1800, '2026-10-05 09:00:00+00'),
  (6, 1, 1, 3, 'ch_4006', 1500, '2026-10-09 19:00:00+00'),
  (7, 1, 3, 1, 'ch_4007', 1800, '2026-10-05 07:30:00+00'),
  (8, 1, 4, 2, 'ch_4008', 2000, '2026-10-07 12:30:00+00'),
  (9, 1, 1, 10, 'ch_4009a', 1800, '2026-10-14 07:15:00+00'),
  (10, 1, 2, 10, 'ch_4010', 1800, '2026-10-14 07:20:00+00'),
  (11, 2, 5, 4, 'ch_4011', 1800, '2026-10-06 07:30:00+00'),
  (12, 2, 6, 4, 'ch_4012', 1800, '2026-10-06 07:35:00+00'),
  (13, 2, 7, 5, 'ch_4013', 1600, '2026-10-08 19:30:00+00'),
  (14, 2, 5, 5, 'ch_4014', 1600, '2026-10-08 19:10:00+00'),
  (15, 2, 6, 5, 'ch_4015', 1600, '2026-10-08 19:45:00+00'),
  (16, 2, 7, 6, 'ch_4016', 2000, '2026-10-12 12:30:00+00'),
  (17, 2, 8, 6, 'ch_4017', 2000, '2026-10-12 12:40:00+00'),
  (18, 2, 5, 6, 'ch_4018', 2000, '2026-10-12 12:50:00+00'),
  (19, 2, 7, 4, 'ch_4019', 1800, '2026-10-06 07:40:00+00'),
  (20, 2, 8, 4, 'ch_4020', 1800, '2026-10-06 07:45:00+00'),
  (21, 2, 5, 11, 'ch_4021', 1600, '2026-10-15 19:00:00+00'),
  (22, 2, 7, 11, 'ch_4022', 1600, '2026-10-15 19:20:00+00'),
  (23, 3, 9, 7, 'ch_4023', 1900, '2026-10-05 07:00:00+00'),
  (24, 3, 10, 7, 'ch_4024', 1900, '2026-10-05 07:10:00+00'),
  (25, 3, 11, 8, 'ch_4025', 1700, '2026-10-09 12:45:00+00'),
  (26, 3, 9, 8, 'ch_4026', 1700, '2026-10-09 12:50:00+00'),
  (27, 3, 10, 9, 'ch_4027', 1500, '2026-10-13 18:15:00+00'),
  (28, 3, 11, 9, 'ch_4028', 1500, '2026-10-13 18:25:00+00'),
  (29, 3, 12, 9, 'ch_4029', 1500, '2026-10-13 18:35:00+00'),
  (30, 3, 9, 12, 'ch_4030', 1900, '2026-10-16 06:45:00+00'),
  (31, 1, 1, 10, 'ch_4013a', 1800, '2026-10-14 07:25:00+00'),
  (32, 1, 1, 10, 'ch_4013b', 1800, '2026-10-14 07:26:00+00')
ON CONFLICT (id) DO NOTHING;

-- one dangling charge: no booking exists for member 6 / session 10
INSERT INTO payments (id, studio_id, member_id, class_session_id, stripe_charge_id, amount_cents, paid_at) VALUES
  (33, 1, 6, 10, 'ch_4033', 1800, '2026-10-14 08:00:00+00')
ON CONFLICT (id) DO NOTHING;

-- Reset sequences so app inserts continue after seed IDs
SELECT setval('studios_id_seq', (SELECT max(id) FROM studios));
SELECT setval('members_id_seq', (SELECT max(id) FROM members));
SELECT setval('class_sessions_id_seq', (SELECT max(id) FROM class_sessions));
SELECT setval('bookings_id_seq', (SELECT max(id) FROM bookings));
SELECT setval('payments_id_seq', (SELECT max(id) FROM payments));
SELECT setval('reconciliations_id_seq', 1, false);

INSERT INTO schema_migrations (version) VALUES ('002_seed')
ON CONFLICT (version) DO NOTHING;

COMMIT;
