import { Router } from 'express';
import { z } from 'zod';
import { pool } from '../db/pool.js';
import { requireAuth } from '../middleware/requireAuth.js';
import { validateBody } from '../middleware/validate.js';

export const cartRouter = Router();

cartRouter.use(requireAuth); // every cart route requires a session

cartRouter.get('/', async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT ci.product_id, ci.qty, p.title, p.price_cents, p.stock_qty,
              ci.qty * p.price_cents AS line_total_cents
       FROM cart_items ci JOIN products p ON p.id = ci.product_id
       WHERE ci.user_id = $1
       ORDER BY ci.product_id`,
      [req.user.user_id]
    );
    const total = rows.reduce((s, r) => s + Number(r.line_total_cents), 0);
    res.json({ items: rows, total_cents: total });
  } catch (err) { next(err); }
});

cartRouter.put('/items/:productId',
  validateBody(z.object({ qty: z.number().int().min(0).max(99) })),
  async (req, res, next) => {
    try {
      const productId = Number(req.params.productId);
      if (!Number.isInteger(productId)) return res.status(400).json({ error: 'VALIDATION' });
      const { qty } = req.body;
      if (qty === 0) {
        await pool.query('DELETE FROM cart_items WHERE user_id = $1 AND product_id = $2',
          [req.user.user_id, productId]);
        return res.status(204).end();
      }
      const { rowCount } = await pool.query(
        'SELECT 1 FROM products WHERE id = $1', [productId]);
      if (rowCount === 0) return res.status(404).json({ error: 'PRODUCT_NOT_FOUND' });
      await pool.query(
        `INSERT INTO cart_items (user_id, product_id, qty) VALUES ($1, $2, $3)
         ON CONFLICT (user_id, product_id) DO UPDATE SET qty = EXCLUDED.qty`,
        [req.user.user_id, productId, qty]
      );
      res.json({ ok: true });
    } catch (err) { next(err); }
  });

cartRouter.delete('/items/:productId', async (req, res, next) => {
  try {
    const productId = Number(req.params.productId);
    if (!Number.isInteger(productId)) return res.status(400).json({ error: 'VALIDATION' });
    await pool.query('DELETE FROM cart_items WHERE user_id = $1 AND product_id = $2',
      [req.user.user_id, productId]);
    res.status(204).end();
  } catch (err) { next(err); }
});
