import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { authRouter } from './routes/auth.js';
import { productsRouter } from './routes/products.js';
import { cartRouter } from './routes/cart.js';
import { ordersRouter } from './routes/orders.js';
import { AppError } from './lib/errors.js';

export const app = express();

app.disable('x-powered-by');
app.use(helmet());
// The React dev server runs on :3000; cookies cross origins — name the origin explicitly.
app.use(cors({
  origin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json({ limit: '100kb' }));
app.use(cookieParser());

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/products', productsRouter);
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/orders', ordersRouter);

app.use((_req, res) => res.status(404).json({ error: 'NOT_FOUND' }));

// Central error handler — AppError becomes its status/code; anything else is a 500.
app.use((err, _req, res, _next) => {
  const status = err instanceof AppError ? err.status : 500;
  const code = err instanceof AppError ? err.code : 'INTERNAL';
  if (status === 500) console.error('[internal error]', err);
  res.status(status).json({ error: code, message: err.message });
});
