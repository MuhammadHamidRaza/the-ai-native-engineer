#!/usr/bin/env node
// "Build" for a plain Node service: syntax-check every source file.
// Exits non-zero on the first failure so CI fails loudly.
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';

const roots = ['src', 'test', 'scripts'];
const files = [];
function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full);
    else if (entry.endsWith('.js')) files.push(full);
  }
}
for (const root of roots) {
  try { walk(root); } catch { /* directory may not exist */ }
}

for (const file of files) {
  execFileSync(process.execPath, ['--check', file], { stdio: 'inherit' });
  console.log('checked', file);
}
console.log(`build ok — ${files.length} files syntax-checked`);
