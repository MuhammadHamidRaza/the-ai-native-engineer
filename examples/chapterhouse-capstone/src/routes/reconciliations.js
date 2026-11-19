import { Router } from 'express';
import { pool } from '../db/pool.js';
import { reconcile } from '../reconcile.js';
import { requireCronSecret } from '../lib/cronGate.js';
import { rateLimit } from '../lib/rateLimit.js';
import { createMailer } from '../lib/mailer.js';
import { log } from '../lib/log.js';

const router = Router();
const mailer = createMailer();

// Reconciliation reports are studio-owner/ops data. They are gated behind the
// same machine-to-machine secret as the runner; members never see them.
router.get('/reconciliations', requireCronSecret, async (req, res, next) => {
  try {
    const studioId = req.query.studio_id ? Number(req.query.studio_id) : null;
    if (req.query.studio_id && !Number.isInteger(studioId)) {
      return res.status(400).json({ error: 'studio_id must be an integer' });
    }
    const { rows } = studioId
      ? await pool.query(
          'SELECT * FROM reconciliations WHERE studio_id = $1 ORDER BY run_date DESC LIMIT 60',
          [studioId],
        )
      : await pool.query('SELECT * FROM reconciliations ORDER BY run_date DESC LIMIT 60');
    res.json({ reconciliations: rows });
  } catch (err) {
    next(err);
  }
});

router.get('/reconciliations/:id', requireCronSecret, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ error: 'id must be an integer' });
    const { rows } = await pool.query('SELECT * FROM reconciliations WHERE id = $1', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'not found' });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

// Trigger the reconciliation on demand. Machine-to-machine only, rate-limited.
router.post('/reconciliations/run', requireCronSecret, rateLimit({ limit: 10, keyPrefix: 'recon-run' }), async (req, res, next) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const studioId = req.body?.studio_id != null ? Number(req.body.studio_id) : 1;
    if (!Number.isInteger(studioId)) {
      await client.query('ROLLBACK');
      return res.status(400).json({ error: 'studio_id must be an integer' });
    }

    const { rows: bookings } = await client.query(
      'SELECT id, member_id, class_session_id, attended FROM bookings WHERE studio_id = $1',
      [studioId],
    );
    const { rows: payments } = await client.query(
      `SELECT p.id, p.member_id, p.class_session_id, p.amount_cents, p.stripe_charge_id,
              s.price_cents AS expected_amount_cents
         FROM payments p
         JOIN class_sessions s ON s.id = p.class_session_id
        WHERE p.studio_id = $1`,
      [studioId],
    );

    const { mismatches, summary } = reconcile(bookings, payments);
    const runDate = new Date().toISOString().slice(0, 10);

    const { rows } = await client.query(
      `INSERT INTO reconciliations (studio_id, run_date, booking_count, payment_count, mismatches, needs_action)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (studio_id, run_date)
       DO UPDATE SET booking_count = EXCLUDED.booking_count,
                     payment_count = EXCLUDED.payment_count,
                     mismatches = EXCLUDED.mismatches,
                     needs_action = EXCLUDED.needs_action
       RETURNING id`,
      [studioId, runDate, bookings.length, payments.length, JSON.stringify(mismatches), mismatches.length],
    );

    if (mismatches.length > 0) {
      await mailer.send({
        to: process.env.ALERT_EMAIL ?? 'ops@brightside.example',
        subject: `Brightside reconciliation: ${mismatches.length} mismatch(es) on ${runDate}`,
        body: JSON.stringify(summary),
      });
    }

    await client.query('COMMIT');
    log('reconciliation_run', { studio_id: studioId, run_date: runDate, mismatches: mismatches.length });
    res.json({ run_date: runDate, summary, reconciliation_id: rows[0].id });
  } catch (err) {
    await client.query('ROLLBACK');
    next(err);
  } finally {
    client.release();
  }
});

export default router;
