import { Router } from 'express';
import { pool } from '../db/pool.js';

const router = Router();

// Demo-only auth: the booking app mints an opaque member id and the client
// passes it as a header. Production replaces this with the client's SSO.
// Authorization rule: you may only read your own bookings or your own studio's.
function demoMemberId(req) {
  const raw = req.get('x-member-id');
  const id = Number(raw);
  return Number.isInteger(id) && id > 0 ? id : null;
}

router.get('/members/:memberId/bookings', async (req, res, next) => {
  try {
    const me = demoMemberId(req);
    const target = Number(req.params.memberId);
    if (me === null) return res.status(401).json({ error: 'missing x-member-id header' });
    if (me !== target) return res.status(403).json({ error: 'cannot read another member\'s bookings' });

    const { rows } = await pool.query(
      `SELECT b.id, b.class_session_id, b.booked_at, b.attended,
              s.title AS session_title, s.starts_at, s.price_cents
         FROM bookings b
         JOIN class_sessions s ON s.id = b.class_session_id
        WHERE b.member_id = $1
        ORDER BY s.starts_at DESC`,
      [target],
    );
    res.json({ member_id: target, bookings: rows });
  } catch (err) {
    next(err);
  }
});

export default router;
