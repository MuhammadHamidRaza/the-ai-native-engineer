// Shared corpus IO for ingest/eval/tests.
import fs from 'node:fs/promises';
import path from 'node:path';

const TEXT_EXTS = new Set(['.md', '.txt']);

export async function loadPolicyDocs(dir, { includeEvil = false } = {}) {
  const docs = [];
  const warnings = [];
  let entries = [];
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch (err) {
    throw new Error(`policy directory not readable: ${dir} (${err.message})`);
  }

  for (const entry of entries) {
    if (!entry.isFile()) continue;
    const ext = path.extname(entry.name).toLowerCase();
    const full = path.join(dir, entry.name);
    if (!TEXT_EXTS.has(ext)) {
      warnings.push(`skipped non-text file: ${entry.name}`);
      continue;
    }
    const raw = await fs.readFile(full);
    if (raw.length === 0 || raw.toString('utf8').trim().length === 0) {
      warnings.push(`skipped empty document: ${entry.name}`);
      continue;
    }
    // Heuristic binary detection — NUL bytes mean this is not UTF-8 text.
    if (raw.includes(0)) {
      warnings.push(`skipped binary-looking file: ${entry.name}`);
      continue;
    }
    const text = raw.toString('utf8');
    const docId = entry.name.replace(/\.(md|txt)$/i, '');
    if (docs.some(d => d.docId === docId)) {
      warnings.push(`duplicate doc id "${docId}" — later file wins`);
      const idx = docs.findIndex(d => d.docId === docId);
      docs.splice(idx, 1);
    }
    docs.push({ docId, text, sourcePath: full });
  }

  if (includeEvil) {
    const evilDir = path.resolve(dir, '..', 'evil');
    try {
      for (const entry of await fs.readdir(evilDir, { withFileTypes: true })) {
        if (!entry.isFile()) continue;
        const full = path.join(evilDir, entry.name);
        const text = await fs.readFile(full, 'utf8');
        if (text.trim()) docs.push({ docId: entry.name.replace(/\.(md|txt)$/i, ''), text, sourcePath: full, taintedFixture: true });
      }
    } catch {
      warnings.push('no evil/ fixture directory — skipping injection drill');
    }
  }

  return { docs, warnings };
}

export async function loadIndex(indexPath) {
  const raw = await fs.readFile(indexPath, 'utf8');
  return raw.split('\n').map(l => l.trim()).filter(Boolean).map(l => JSON.parse(l));
}
