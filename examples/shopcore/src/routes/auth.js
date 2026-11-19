import { Router } from 'express';
import { z } from 'zod';
import { pool } from '../db/pool.js';
import { hashPassword, verifyPassword } from '../lib/crypto.js';
import { createSession, destroySession, findSession } from '../lib/session.js';
import { validateBody } from '../middleware/validate.js';
import { AppError } from '../lib/errors.js';

export const authRouter = Router();

const cookieOpts = {
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  maxAge: 7 * 86_400_000,
  path: '/',
};

const registerSchema = z.object({
  email: z.email().max(254),
  full_name: z.string().min(2).max(120),
  password: z.string().min(10, 'at least 10 characters').max(200),
});

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

authRouter.post('/register', validateBody(registerSchema), async (req, res, next) => {
  try {
    const { email, full_name, password } = req.body;
    const hash = await hashPassword(password);
    const { rows } = await pool.query(
      `INSERT INTO users (email, full_name, role, password_hash)
       VALUES ($1, $2, 'customer', $3)
       RETURNING id, email, full_name, role`,
      [email.toLowerCase(), full_name, hash]
    ).catch((err) => {
      if (err.code === '23505') throw new AppError(409, 'EMAIL_TAKEN', 'email already registered');
      throw err;
    });
    const user = rows[0];
    const token = await createSession(user.id, Number(process.env.SESSION_TTL_DAYS ?? 7));
    res.cookie('session', token, cookieOpts).status(201).json({ user });
  } catch (err) { next(err); }
});

authRouter.post('/login', validateBody(loginSchema), async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { rows } = await pool.query(
      'SELECT id, email, full_name, role, password_hash FROM users WHERE email = $1',
      [email.toLowerCase()]
    );
    const user = rows[0];
    if (!user || !(await verifyPassword(password, user.password_hash ?? ''))) {
      throw new AppError(401, 'BAD_CREDENTIALS', 'invalid email or password');
    }
    const token = await createSession(user.id, Number(process.env.SESSION_TTL_DAYS ?? 7));
    const { password_hash, ...safe } = user;
    res.cookie('session', token, cookieOpts).json({ user: safe });
  } catch (err) { next(err); }
});

authRouter.post('/logout', async (req, res, next) => {
  try {
    const token = req.cookies?.session;
    if (token) await destroySession(token);
    res.clearCookie('session', cookieOpts).status(204).end();
  } catch (err) { next(err); }
});

authRouter.get('/me', async (req, res, next) => {
  try {
    const token = req.cookies?.session;
    const user = token && (await findSession(token));
    if (!user) return res.status(401).json({ error: 'UNAUTHORIZED' });
    res.json({ user });
  } catch (err) { next(err); }
});
