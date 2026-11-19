#!/usr/bin/env node
// Ingest policy documents into data/index.jsonl (offline, deterministic).
// Usage: node scripts/ingest.mjs [--include-evil] [--verbose]
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadPolicyDocs } from '../src/corpus.mjs';
import { chunkMarkdown } from '../src/chunker.mjs';
import { embedText } from '../src/embed.mjs';
import { findInjection } from '../src/guard.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const includeEvil = process.argv.includes('--include-evil');
const verbose = process.argv.includes('--verbose');

const { docs, warnings } = await loadPolicyDocs(path.join(root, 'data', 'policies'), { includeEvil });

for (const w of warnings) console.warn(`warn: ${w}`);

const chunks = [];
for (const doc of docs) {
  const docChunks = chunkMarkdown(doc.docId, doc.text, { accessTier: doc.taintedFixture ? 'public-tainted-fixture' : 'public' });
  // DOCUMENT-LEVEL integrity gate at ingest: if any chunk of this document
  // trips the injection detector, every chunk of the document is marked
  // doc_tainted — retrieval can then exclude the whole document even when
  // the poisonous chunk itself never ranks in the top-k.
  const docTainted = docChunks.some(c => findInjection(c.text).length > 0);
  for (const c of docChunks) c.doc_tainted = docTainted;
  chunks.push(...docChunks);
  console.log(`${doc.docId}: ${docChunks.length} chunk(s)${docTainted ? '  [TAINTED — excluded from answering]' : ''}`);
}

const records = chunks.map(c => ({ ...c, embedding: Array.from(embedText(c.text)) }));
await fs.mkdir(path.join(root, 'data'), { recursive: true });
await fs.writeFile(
  path.join(root, 'data', 'index.jsonl'),
  records.map(r => JSON.stringify(r)).join('\n') + '\n',
  'utf8'
);

console.log(`ingested ${docs.length} doc(s) -> ${records.length} chunk(s) -> data/index.jsonl`);

if (verbose) {
  for (const r of records.slice(0, 3)) {
    console.log('---', r.heading_path, `[${r.chunk_index}]`);
    console.log(r.text.slice(0, 160).replace(/\n/g, ' '));
  }
}

if (records.length === 0) {
  console.error('error: no chunks produced — refusing to write an empty index');
  process.exit(1);
}
