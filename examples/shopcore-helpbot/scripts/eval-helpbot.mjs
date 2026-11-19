#!/usr/bin/env node
// Offline Recall@3 evaluation over eval/helpbot-golden-set.json.
// Deterministic: same corpus, same vectors, same numbers — every run.
// Usage: node scripts/eval-helpbot.mjs [--verbose]
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadIndex } from '../src/corpus.mjs';
import { retrieve } from '../src/retrieve.mjs';
import { answerQuestion } from '../src/generate.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const indexPath = path.join(root, 'data', 'index.jsonl');

try {
  await fs.access(indexPath);
} catch {
  console.error('data/index.jsonl missing — run `npm run ingest` first');
  process.exit(1);
}

const chunks = await loadIndex(indexPath);
const golden = JSON.parse(await fs.readFile(path.join(root, 'eval', 'helpbot-golden-set.json'), 'utf8'));

let hits = 0;
let refusalCorrect = 0;
let refusalTotal = 0;

for (const item of golden) {
  const top = retrieve(item.question, chunks, { k: 3 });
  const got = [...new Set(top.map(t => t.doc_id))];
  if (item.expect_refusal) {
    const { refused } = answerQuestion(item.question, chunks, { k: 3 });
    refusalTotal++;
    if (refused) refusalCorrect++;
    console.log(`${item.id.padEnd(30)} expect REFUSAL  got ${refused ? 'REFUSAL' : 'ANSWER'}  ${refused ? 'PASS' : 'MISS'}`);
    continue;
  }
  const hit = got.some(d => item.expected_docs.includes(d));
  hits += hit ? 1 : 0;
  console.log(`${item.id.padEnd(30)} expected [${item.expected_docs.join(',')}]  got [${got.join(',')}]  ${hit ? 'PASS' : 'MISS'}`);
}

const retrievable = golden.filter(i => !i.expect_refusal).length;
console.log(`\nRecall@3: ${hits}/${retrievable}`);
console.log(`Refusal:  ${refusalCorrect}/${refusalTotal}`);

// Guard: a healthy offline index should retrieve most policy questions. If it
// collapses to zero, something in the pipeline broke (not the eval).
if (retrievable > 0 && hits === 0) process.exit(1);
