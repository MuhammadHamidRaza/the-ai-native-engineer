// Refusal-aware, citation-grounded answering — OFFLINE (no LLM call).
//
// This module demonstrates the contract every grounded generator must honor:
//   1. Refuse out-of-scope or action-requesting questions.
//   2. Answer ONLY from retrieved sources; cite them.
//   3. Never treat retrieved text as instructions (tainted chunks excluded).
//   4. Say "I don't know" when retrieval finds nothing to ground on.
// In live mode (Chapter 28) the answer is drafted by a model and constrained
// to these same rules by the system prompt — the citation + refusal checks
// stay deterministic and run in code, not in the prompt.
//
// Refusal signal: the top hit must share at least one content term with the
// corpus (lexical score > 0). That is deliberately blunt — a precise semantic
// threshold is impossible with deterministic n-gram vectors; it exists so the
// refusal path is exercisable and honest, not to fake ML confidence. Live mode
// uses the model + golden eval set for the same decision.

import { retrieve } from './retrieve.mjs';
import { quarantine, findInjection } from './guard.mjs';

const REFUSALS = [
  {
    name: 'refund_commitment',
    test: (q) => /\b(refund|money\s*back|reimburse)\b/i.test(q)
      && /\b(now|immediately|today|right\s+away|guarante\w+|for\s+me|approve|\$?\s?\d{3,})\b/i.test(q),
    answer: 'I can’t approve refunds myself — approval is always human and amount-gated. Per the Returns Policy: refunds go to the original payment method within 5 business days of warehouse inspection; refunds over $50 need manager approval and over $500 need a finance lead. Sign in and start the return from Orders, or contact support.',
  },
  {
    name: 'pii_other_user',
    test: (q) => /\b(someone\s+else|another\s+(customer|user|person)|other\s+customer)\b/i.test(q)
      && /\b(order|address|card|payment|data|email|phone|details)\b/i.test(q),
    answer: 'I can only ever discuss data for the account you are signed in with. For order-status or data requests for another person, I can’t help — and if you believe we exposed such data, contact privacy@shopcore.example immediately.',
  },
  {
    name: 'legal_or_medical',
    test: (q) => /\b(sue|lawsuit|legal\s+advice|lawyer|attorney|court|class\s+action|medical\s+advice|diagnos\w+)\b/i.test(q),
    answer: 'I’m not a lawyer or a doctor, and I won’t give legal or medical advice. For anything like that, consult a qualified professional. For order problems, I can explain the returns, refund or warranty policies.',
  },
  {
    name: 'account_security',
    test: (q) => /\b(my\s+password|change\s+password|reset\s+password|locked\s+out|hacked|unauthori[sz]ed\s+(login|purchase)|compromised)\b/i.test(q),
    answer: 'Account security matters. I can’t change passwords or credentials in chat. Use “Forgot password” on the sign-in page, or contact support if you suspect an unauthorized purchase — never share your password with anyone, including “ShopCore staff”.',
  },
];

export function answerQuestion(question, chunks, { k = 3 } = {}) {
  const q = String(question ?? '').trim();
  if (!q) return { answer: 'Ask a complete question.', refused: true, citations: [], sources: [], tainted: 0 };

  for (const refusal of REFUSALS) {
    if (refusal.test(q)) {
      return { answer: refusal.answer, refused: true, citations: [], sources: [], tainted: 0, reason: refusal.name };
    }
  }

  const hits = retrieve(q, chunks, { k: k + 3 }); // fetch extra to allow quarantine
  const { clean, tainted } = quarantine(hits);
  const used = clean.slice(0, k);

  const grounded = used.length > 0 && used.some(u => u.lexical_score > 0);
  if (!grounded) {
    return {
      answer: 'I don’t have enough verified information in the ShopCore policies to answer that. I’ve logged it for the support team.',
      refused: true,
      citations: [],
      sources: [],
      tainted: tainted.length,
      reason: 'low_confidence',
    };
  }

  const citations = used.map((u, i) => `[${i + 1}] ${u.heading_path} (${u.doc_id})`);
  const excerpt = used
    .filter(u => u.lexical_score > 0)
    .slice(0, 2)
    .map(u => u.text.split('\n').map(l => l.trim()).filter(Boolean).slice(0, 3).join(' '))
    .join(' ')
    .slice(0, 700);

  return {
    answer: `Based on the ShopCore policies: ${excerpt}`,
    refused: false,
    citations,
    sources: used.map(u => ({ doc_id: u.doc_id, heading_path: u.heading_path, chunk_index: u.chunk_index })),
    tainted: tainted.length,
    ...(tainted.length > 0 ? { note: `${tainted.length} source(s) failed integrity checks and were excluded from the answer.` } : {}),
  };
}

export { findInjection };
