import { Router } from 'express';
import { pool } from '../db/pool.js';
import { verifyStripeSignature } from '../lib/stripeVerify.js';
import { log } from '../lib/log.js';

const router = Router();

// Stripe webhook receiver. The raw body is required for signature
// verification — app.js captures it before any JSON parsing happens here.
router.post('/webhooks/stripe', async (req, res, next) => {
  try {
    const rawBody = req.body; // Buffer, captured via the raw webhook route below
    const header = req.get('stripe-signature');
    const secret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!secret) {
      return res.status(503).json({ error: 'STRIPE_WEBHOOK_SECRET is not configured' });
    }
    if (!Buffer.isBuffer(rawBody)) {
      return res.status(400).json({ error: 'expected raw webhook payload' });
    }
    if (!verifyStripeSignature(rawBody.toString('utf8'), header, secret)) {
      log('webhook_rejected', { level: 'warn', reason: 'bad_signature' });
      return res.status(401).json({ error: 'invalid stripe-signature' });
    }

    let event;
    try {
      event = JSON.parse(rawBody.toString('utf8'));
    } catch {
      return res.status(400).json({ error: 'malformed webhook JSON' });
    }

    // Replay protection: Stripe retries delivery for days. Persist the event id
    // atomically; a replayed delivery is acknowledged without re-processing.
    try {
      const { rows } = await pool.query(
        `INSERT INTO webhook_events (stripe_event_id, event_type)
         VALUES ($1, $2)
         ON CONFLICT (stripe_event_id) DO NOTHING
         RETURNING stripe_event_id`,
        [event?.id ?? 'unknown', event?.type ?? 'unknown'],
      );
      if (rows.length === 0) {
        log('webhook_duplicate', { event_id: event?.id, type: event?.type });
        return res.json({ received: true, duplicate: true, type: event?.type });
      }
    } catch (ledgerErr) {
      // Ledger failure must not lose the event; Stripe will retry.
      log('webhook_ledger_error', { level: 'error', error: ledgerErr.message });
      return res.status(503).json({ error: 'webhook ledger unavailable; retry' });
    }

    log('webhook_accepted', { event_id: event?.id, type: event?.type });
    res.json({ received: true, type: event?.type });
  } catch (err) {
    next(err);
  }
});

export default router;
