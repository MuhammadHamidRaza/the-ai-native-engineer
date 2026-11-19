import 'dotenv/config';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pg from 'pg';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, '..', '..', 'db', 'migrations');

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set — copy .env.example to .env first');
  process.exit(1);
}

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

// Ledger may not exist yet on a fresh database — tolerate that.
const { rows: applied } = await pool
  .query('SELECT version FROM schema_migrations')
  .catch(() => ({ rows: [] }));
const done = new Set(applied.map((r) => r.version));

for (const file of (await fs.readdir(dir)).filter((f) => f.endsWith('.sql')).sort()) {
  const version = file.replace('.sql', '');
  if (done.has(version)) { console.log('skip', version); continue; }
  const sql = await fs.readFile(path.join(dir, file), 'utf8');
  await pool.query(sql); // each migration wraps itself in BEGIN/COMMIT
  console.log('applied', version);
}
await pool.end();
