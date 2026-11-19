#!/usr/bin/env node
// Ask HelpBot a question — OFFLINE, no LLM. Demonstrates the grounded-answer
// contract (refusal + citations). Live LLM answering is taught in Chapter 28.
// Usage: node scripts/ask.mjs "How many days do I have to return an opened item?"
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadIndex } from '../src/corpus.mjs';
import { answerQuestion } from '../src/generate.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const question = process.argv.slice(2).join(' ').trim();

if (!question) {
  console.error('usage: node scripts/ask.mjs "your question"');
  process.exit(1);
}

const chunks = await loadIndex(path.join(root, 'data', 'index.jsonl'));
const result = answerQuestion(question, chunks, { k: 3 });
console.log(result.answer);
if (result.citations.length) {
  console.log('\nSources:');
  for (const c of result.citations) console.log(' ', c);
}
if (result.note) console.log(`\nnote: ${result.note}`);
