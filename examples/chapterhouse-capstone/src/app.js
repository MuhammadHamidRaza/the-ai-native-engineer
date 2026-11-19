import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import health from './routes/health.js';
import bookings from './routes/bookings.js';
import reconciliations from './routes/reconciliations.js';
import webhooks from './routes/webhooks.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function createApp() {
  const app = express();
  app.disable('x-powered-by');

  // Webhook route needs the raw body for signature verification.
  // Everything else is plain JSON.
  app.use('/webhooks/stripe', express.raw({ type: 'application/json' }));
  app.use(express.json());

  // Serve the small demo dashboard (static files only).
  app.use(express.static(path.join(__dirname, '..', 'public')));

  app.use(health);
  app.use('/api', bookings);
  app.use('/api', reconciliations);
  app.use(webhooks);

  // JSON 404 for unknown API routes (avoid leaking stacks via HTML).
  app.use('/api', (req, res) => res.status(404).json({ error: 'not found' }));

  // Central error handler: never leak stacks to clients.
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, _next) => {
    if (err?.type === 'entity.parse.failed') {
      return res.status(400).json({ error: 'malformed JSON body' });
    }
    console.error(JSON.stringify({ error: err.message, path: req.path }));
    res.status(500).json({ error: 'internal server error' });
  });

  return app;
}
