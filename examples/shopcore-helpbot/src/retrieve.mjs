// Tiny retrieval layer: lexical (TF-IDF-ish) and vector (cosine) rankings,
// fused with Reciprocal Rank Fusion (RRF). RRF needs no score calibration —
// it rewards being near the top of either list.

import { embedText, cosineSimilarity } from './embed.mjs';

const STOPWORDS = new Set([
  'the','a','an','and','or','of','to','in','is','are','for','on','with','by','at','it','this','that','be','as','from','you','your','we','our',
]);

export function tokenize(text) {
  return String(text).toLowerCase().match(/[a-z0-9]+/g)?.filter(t => t.length > 2 && !STOPWORDS.has(t)) ?? [];
}

export function lexicalScore(queryTokens, docTokens) {
  if (docTokens.length === 0) return 0;
  const tf = new Map();
  for (const t of docTokens) tf.set(t, (tf.get(t) ?? 0) + 1);
  let score = 0;
  for (const q of queryTokens) {
    const f = tf.get(q) ?? 0;
    if (f > 0) score += (f / docTokens.length) * Math.log(1 + docTokens.length / (1 + f));
  }
  return score;
}

function rankIndex(scoresDesc) {
  // Returns 0-based rank per index for a score array (ties share a rank).
  const order = [...scoresDesc.keys()].sort((a, b) => scoresDesc[b] - scoresDesc[a]);
  const rank = new Array(scoresDesc.length).fill(0);
  let r = 0;
  for (let i = 0; i < order.length; i++) {
    if (i > 0 && scoresDesc[order[i]] < scoresDesc[order[i - 1]]) r = i;
    rank[order[i]] = r;
  }
  return rank;
}

export function retrieve(query, chunks, { k = 3, vectorWeight = 1, lexicalWeight = 1, rrfK = 60 } = {}) {
  if (!query || chunks.length === 0) return [];
  const queryVec = embedText(query);
  const queryTokens = tokenize(query);
  const docTokenCache = chunks.map(c => tokenize(c.text));

  const vectorScores = chunks.map(c => cosineSimilarity(queryVec, embedText(c.text)));
  const lexicalScores = docTokenCache.map(tokens => lexicalScore(queryTokens, tokens));

  const vRank = rankIndex(vectorScores);
  const lRank = rankIndex(lexicalScores);

  const fused = chunks.map((_, i) => ({
    index: i,
    rrf: vectorWeight / (rrfK + vRank[i]) + lexicalWeight / (rrfK + lRank[i]),
    vectorScore: vectorScores[i],
    lexicalScore: lexicalScores[i],
  }));
  fused.sort((a, b) => b.rrf - a.rrf);
  return fused.slice(0, Math.max(0, k)).map(f => ({
    ...chunks[f.index],
    score: f.rrf,
    vector_score: f.vectorScore,
    lexical_score: f.lexicalScore,
  }));
}
