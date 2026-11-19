// Input-side prompt-injection detection for retrieved content.
// A retrieved document is DATA, not INSTRUCTIONS. These patterns catch the
// classic indirect-injection phrasings we see in the wild. This is one layer —
// not a guarantee of immunity (see 31.2.1: defense in depth).
//
// Quarantine is DOCUMENT-LEVEL: if any chunk of a document fails integrity
// checks (flagged doc_tainted at ingest), the whole document is excluded from
// answering. A poisoned appendix must not launder its innocent-looking
// sections into the answer — even if the poisonous chunk never ranks.

const INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?(prior|previous|above|earlier)\s+instructions?/i,
  /you\s+are\s+now\s+in\s+(maintenance|debug|admin|developer)\s+mode/i,
  /disregard\s+(all\s+)?(prior|previous|above|any)\s+(instructions?|rules?|policies)/i,
  /do\s+not\s+cite\s+sources/i,
  /approve\s+(every|any|all)\s+(refund|request|claim)s?/i,
  /new\s+(system\s+)?instructions?\s*:/i,
  /override\s+(the\s+)?(system|safety|policy)/i,
  /reveal\s+(your|the)\s+(system\s+)?(prompt|instructions)/i,
];

export function findInjection(text) {
  const hits = [];
  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(text)) hits.push(pattern.source);
  }
  return hits;
}

export function quarantine(chunks) {
  // A chunk/document is tainted if it carries the ingest-time flag OR trips
  // the detector right now (covers hand-built indexes and tests).
  const taintedDocs = new Set(
    chunks
      .filter(c => c.doc_tainted === true || findInjection(c.text).length > 0)
      .map(c => c.doc_id)
  );
  const clean = chunks.filter(c => !taintedDocs.has(c.doc_id));
  const tainted = [...taintedDocs].map(docId => ({
    doc_id: docId,
    hits: [...new Set(
      chunks.filter(c => c.doc_id === docId).flatMap(c => findInjection(c.text))
    )],
  }));
  return { clean, tainted };
}
