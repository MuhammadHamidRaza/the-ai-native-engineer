// Pure reconciliation engine for the Chapterhouse capstone.
// No I/O, no framework, no dates: takes plain arrays, returns a verdict.
// The web layer and the nightly cron both call this — business rules live
// here and only here.
//
// Payment objects may carry `expected_amount_cents` (the class session price).
// When present, a payment whose amount differs from the expected price is
// reported as `amount_mismatch`. All other objects are ignored.

export function reconcile(bookings, payments) {
  const key = (memberId, sessionId) => `${memberId}:${sessionId}`;

  const paymentsByKey = new Map();
  for (const p of payments) {
    if (p.class_session_id == null) continue; // not tied to a session — skip
    const k = key(p.member_id, p.class_session_id);
    if (!paymentsByKey.has(k)) paymentsByKey.set(k, []);
    paymentsByKey.get(k).push(p);
  }

  const bookingKeys = new Set(bookings.map((b) => key(b.member_id, b.class_session_id)));

  const mismatches = [];
  let attended = 0;
  let matched = 0;

  for (const b of bookings) {
    if (b.attended !== true) continue; // NULL = session not closed; false = never showed
    attended += 1;
    const k = key(b.member_id, b.class_session_id);
    const found = paymentsByKey.get(k) ?? [];
    if (found.length === 0) {
      mismatches.push({
        reason: 'missing_payment',
        booking_id: b.id,
        member_id: b.member_id,
        class_session_id: b.class_session_id,
        detail: 'attended booking with no matching charge',
      });
    } else if (found.length > 1) {
      matched += 1;
      mismatches.push({
        reason: 'duplicate_payment',
        booking_id: b.id,
        member_id: b.member_id,
        class_session_id: b.class_session_id,
        payment_ids: found.map((p) => p.id),
        detail: `attended booking paid ${found.length} times (${found.map((p) => p.stripe_charge_id).join(', ')})`,
      });
    } else {
      matched += 1;
    }
  }

  for (const p of payments) {
    if (p.class_session_id == null) continue;
    const k = key(p.member_id, p.class_session_id);
    if (!bookingKeys.has(k)) {
      mismatches.push({
        reason: 'missing_booking',
        payment_id: p.id,
        member_id: p.member_id,
        class_session_id: p.class_session_id,
        stripe_charge_id: p.stripe_charge_id,
        detail: 'charge with no corresponding booking',
      });
      continue;
    }
    if (p.expected_amount_cents != null && Number(p.amount_cents) !== Number(p.expected_amount_cents)) {
      mismatches.push({
        reason: 'amount_mismatch',
        payment_id: p.id,
        member_id: p.member_id,
        class_session_id: p.class_session_id,
        amount_cents: p.amount_cents,
        expected_amount_cents: p.expected_amount_cents,
        detail: `charge ${p.amount_cents} != session price ${p.expected_amount_cents}`,
      });
    }
  }

  const summary = {
    attended,
    matched,
    missing_payment: mismatches.filter((m) => m.reason === 'missing_payment').length,
    missing_booking: mismatches.filter((m) => m.reason === 'missing_booking').length,
    duplicate_payment: mismatches.filter((m) => m.reason === 'duplicate_payment').length,
    amount_mismatch: mismatches.filter((m) => m.reason === 'amount_mismatch').length,
  };

  return { mismatches, summary };
}
