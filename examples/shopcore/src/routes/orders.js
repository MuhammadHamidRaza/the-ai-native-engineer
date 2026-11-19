import { Router } from 'express';
import { pool } from '../db/pool.js';
import { requireAuth, requireRole } from '../middleware/requireAuth.js';
import { sha256 } from '../lib/crypto.js';

export const ordersRouter = Router();

ordersRouter.post('/checkout', requireAuth, async (req, res, next) => {
  const userId = req.user.user_id;
  const idemKey = typeof req.get('Idempotency-Key') === 'string'
    ? req.get('Idempotency-Key').slice(0, 200)
    : null;

  const client = await pool.connect(); // dedicated client — NOT pool.query
  try {
    await client.query('BEGIN');

    // 0. Idempotency replay — same key, same user: return the original order.
    if (idemKey) {
      const { rows } = await client.query(
        `SELECT o.id, COALESCE(SUM(oi.qty * oi.unit_price_cents), 0) AS total_cents
         FROM checkout_keys k
         JOIN orders o ON o.id = k.order_id
         JOIN order_items oi ON oi.order_id = o.id
         WHERE k.key = $1 AND k.user_id = $2
         GROUP BY o.id`,
        [sha256(idemKey), userId]
      );
      if (rows[0]) {
        await client.query('ROLLBACK'); // no writes needed
        return res.status(200).json({
          orderId: rows[0].id,
          total_cents: Number(rows[0].total_cents),
          idempotentReplay: true,
        });
      }
    }

    // 1. Read the cart with current prices, locked for update
    const { rows: items } = await client.query(
      `SELECT ci.product_id, ci.qty, p.price_cents, p.stock_qty, p.title
       FROM cart_items ci JOIN products p ON p.id = ci.product_id
       WHERE ci.user_id = $1
       ORDER BY ci.product_id
       FOR UPDATE OF p`,
      [userId]
    );
    if (items.length === 0) {
      await client.query('ROLLBACK');
      return res.status(400).json({ error: 'CART_EMPTY' });
    }

    // 2. Atomic stock guard
    for (const it of items) {
      if (it.stock_qty < it.qty) {
        await client.query('ROLLBACK');
        return res.status(409).json({
          error: 'OUT_OF_STOCK',
          productId: it.product_id,
          available: it.stock_qty,
        });
      }
    }

    // 3. Create order + line items (price snapshot!) + decrement stock + payment
    const total = items.reduce((s, it) => s + it.qty * it.price_cents, 0);
    const { rows: [order] } = await client.query(
      `INSERT INTO orders (user_id, status) VALUES ($1, 'paid') RETURNING id`,
      [userId]
    );
    for (const it of items) {
      await client.query(
        `INSERT INTO order_items (order_id, product_id, qty, unit_price_cents)
         VALUES ($1, $2, $3, $4)`,
        [order.id, it.product_id, it.qty, it.price_cents]
      );
      const dec = await client.query(
        `UPDATE products SET stock_qty = stock_qty - $1
         WHERE id = $2 AND stock_qty >= $1`,
        [it.qty, it.product_id]
      );
      if (dec.rowCount !== 1) { // concurrent purchase beat us to it
        await client.query('ROLLBACK');
        return res.status(409).json({ error: 'OUT_OF_STOCK', productId: it.product_id });
      }
    }
    await client.query(
      `INSERT INTO payments (order_id, amount_cents, provider, status)
       VALUES ($1, $2, 'manual', 'succeeded')`,
      [order.id, total]
    );
    await client.query('DELETE FROM cart_items WHERE user_id = $1', [userId]);

    if (idemKey) {
      // Stored in the SAME transaction — key becomes durable with the order.
      await client.query(
        'INSERT INTO checkout_keys (key, user_id, order_id) VALUES ($1, $2, $3)',
        [sha256(idemKey), userId, order.id]
      );
    }

    await client.query('COMMIT');
    res.status(201).json({ orderId: order.id, total_cents: total });
  } catch (err) {
    await client.query('ROLLBACK').catch(() => {});
    next(err);
  } finally {
    client.release();
  }
});

ordersRouter.get('/:id', requireAuth, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ error: 'VALIDATION' });
    const { rows } = await pool.query(
      `SELECT o.id, o.status, o.created_at, u.full_name AS customer,
              COALESCE(SUM(oi.qty * oi.unit_price_cents), 0) AS total_cents
       FROM orders o
       JOIN users u ON u.id = o.user_id
       LEFT JOIN order_items oi ON oi.order_id = o.id
       WHERE o.id = $1
       GROUP BY o.id, u.full_name`,
      [id]
    );
    const order = rows[0];
    if (!order) return res.status(404).json({ error: 'NOT_FOUND' });
    const isOwner = req.user.role === 'admin'
      || (await pool.query('SELECT 1 FROM orders WHERE id = $1 AND user_id = $2', [id, req.user.user_id])).rowCount === 1;
    if (!isOwner) return res.status(403).json({ error: 'FORBIDDEN' });
    const { rows: items } = await pool.query(
      `SELECT p.title, oi.qty, oi.unit_price_cents
       FROM order_items oi JOIN products p ON p.id = oi.product_id
       WHERE oi.order_id = $1 ORDER BY oi.id`,
      [id]
    );
    res.json({ ...order, total_cents: Number(order.total_cents), items });
  } catch (err) { next(err); }
});

ordersRouter.get('/', requireAuth, requireRole('admin'), async (_req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT o.id, o.status, u.full_name AS customer, o.created_at
       FROM orders o JOIN users u ON u.id = o.user_id
       ORDER BY o.id DESC LIMIT 100`
    );
    res.json({ orders: rows });
  } catch (err) { next(err); }
});
