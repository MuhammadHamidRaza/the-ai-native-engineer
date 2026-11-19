// Deterministic LOCAL embeddings for offline/CI use.
//
// This is a character n-gram hashing embedder, NOT a neural embedding model.
// It exists so the full pipeline (parse → chunk → embed → store → retrieve →
// cite → evaluate) runs deterministically with zero external dependencies
// and zero API keys. It validates PIPELINE LOGIC — not semantic quality.
//
// Production retrieval (Part 08, Chapter 28) uses OpenAI text-embedding-3-small
// (1536 dims) with pgvector; swap this module out, keep everything else.

export const DIMENSIONS = 256;

function hashToken(token) {
  // FNV-1a 32-bit — small, fast, dependency-free.
  let hash = 0x811c9dc5;
  for (let i = 0; i < token.length; i++) {
    hash ^= token.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

export function embedText(text) {
  const vec = new Float32Array(DIMENSIONS);
  const normalized = String(text).toLowerCase().replace(/\s+/g, ' ');
  // Char n-grams 3–5 grams give some morphology awareness in English.
  for (let n = 3; n <= 5; n++) {
    for (let i = 0; i + n <= normalized.length; i++) {
      const gram = normalized.slice(i, i + n);
      const h = hashToken(gram);
      vec[h % DIMENSIONS] += 1;
      // Bucket-pairing reduces collision bias for short vectors.
      vec[(h >>> 8) % DIMENSIONS] += 0.5;
    }
  }
  // L2-normalize so cosine similarity is a plain dot product.
  let norm = 0;
  for (let i = 0; i < DIMENSIONS; i++) norm += vec[i] * vec[i];
  norm = Math.sqrt(norm) || 1;
  for (let i = 0; i < DIMENSIONS; i++) vec[i] /= norm;
  return vec;
}

export function cosineSimilarity(a, b) {
  let dot = 0;
  for (let i = 0; i < DIMENSIONS; i++) dot += a[i] * b[i];
  return dot; // both vectors are already L2-normalized
}
