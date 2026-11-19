// Applies the demo seed (db/migrations/002_seed.sql) directly.
// The seed is idempotent (fixed IDs + ON CONFLICT DO NOTHING), so it is safe
// to run against a database that already contains the seed data.
import 'dotenv/config';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pg from 'pg';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const seedPath = path.join(__dirname, '..', '..', 'db', 'migrations', '002_seed.sql');

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set — copy .env.example to .env first');
  process.exit(1);
}

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const sql = await fs.readFile(seedPath, 'utf8');
await pool.query(sql);
console.log('seed applied (3 studios, 12 members, 12 sessions, 40 bookings, 33 payments)');
await pool.end();
