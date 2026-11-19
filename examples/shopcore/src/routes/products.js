import { Router } from 'express';
import { z } from 'zod';
import { pool } from '../db/pool.js';
import { requireAuth, requireRole } from '../middleware/requireAuth.js';
import { validateBody } from '../middleware/validate.js';
import { AppError } from '../lib/errors.js';

export const productsRouter = Router();

const productSchema = z.object({
  category_id: z.number().int().positive(),
  sku: z.string().min(1).max(64),
  title: z.string().min(1).max(200),
  price_cents: z.number().int().min(0),
  stock_qty: z.number().int().min(0),
});

productsRouter.get('/', async (req, res, next) => {
  try {
    const { category, q } = req.query;
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 12));
    const params = [];
    let where = ' WHERE 1=1';
    if (category) { params.push(category); where += ` AND c.slug = $${params.length}`; }
    if (q) {
      params.push(`%${q}%`);
      where += ` AND (p.title ILIKE $${params.length} OR p.sku ILIKE $${params.length})`;
    }
    params.push(limit, (page - 1) * limit);
    const { rows } = await pool.query(
      `SELECT p.id, p.sku, p.title, p.price_cents, p.stock_qty, c.name AS category
       FROM products p JOIN categories c ON c.id = p.category_id
       ${where}
       ORDER BY p.id
       LIMIT $${params.length - 1} OFFSET $${params.length}`,
      params
    );
    res.json({ page, limit, products: rows });
  } catch (err) { next(err); }
});

productsRouter.get('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) throw new AppError(400, 'VALIDATION', 'id must be an integer');
    const { rows } = await pool.query(
      `SELECT p.id, p.sku, p.title, p.price_cents, p.stock_qty, c.name AS category
       FROM products p JOIN categories c ON c.id = p.category_id WHERE p.id = $1`,
      [id]
    );
    if (!rows[0]) return res.status(404).json({ error: 'NOT_FOUND' });
    res.json(rows[0]);
  } catch (err) { next(err); }
});

productsRouter.post('/', requireAuth, requireRole('admin'), validateBody(productSchema), async (req, res, next) => {
  try {
    const { category_id, sku, title, price_cents, stock_qty } = req.body;
    const { rows } = await pool.query(
      `INSERT INTO products (category_id, sku, title, price_cents, stock_qty)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, sku, title, price_cents, stock_qty`,
      [category_id, sku, title, price_cents, stock_qty]
    ).catch((err) => {
      if (err.code === '23505') throw new AppError(409, 'SKU_TAKEN', 'sku already exists');
      if (err.code === '23503') throw new AppError(400, 'BAD_CATEGORY', 'category does not exist');
      throw err;
    });
    res.status(201).json(rows[0]);
  } catch (err) { next(err); }
});
