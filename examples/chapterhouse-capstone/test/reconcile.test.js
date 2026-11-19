import { test } from 'node:test';
import assert from 'node:assert/strict';
import { reconcile } from '../src/reconcile.js';

const booking = (id, member_id, class_session_id, attended) => ({ id, member_id, class_session_id, attended });
const payment = (id, member_id, class_session_id, stripe_charge_id) => ({
  id, member_id, class_session_id, stripe_charge_id, amount_cents: 1800,
});

test('attended booking with exactly one matching payment reconciles clean', () => {
  const { mismatches, summary } = reconcile(
    [booking(1, 10, 100, true)],
    [payment(50, 10, 100, 'ch_x')],
  );
  assert.equal(mismatches.length, 0);
  assert.equal(summary.matched, 1);
  assert.equal(summary.attended, 1);
});

test('attended booking with no charge is missing_payment', () => {
  const { mismatches, summary } = reconcile(
    [booking(2, 11, 100, true)],
    [],
  );
  assert.equal(mismatches.length, 1);
  assert.equal(mismatches[0].reason, 'missing_payment');
  assert.equal(mismatches[0].booking_id, 2);
  assert.equal(summary.missing_payment, 1);
});

test('charge with no corresponding booking is missing_booking', () => {
  const { mismatches, summary } = reconcile(
    [],
    [payment(60, 12, 100, 'ch_dangling')],
  );
  assert.equal(mismatches.length, 1);
  assert.equal(mismatches[0].reason, 'missing_booking');
  assert.equal(mismatches[0].payment_id, 60);
  assert.equal(summary.missing_booking, 1);
});

test('attended booking paid twice is duplicate_payment', () => {
  const { mismatches, summary } = reconcile(
    [booking(3, 13, 100, true)],
    [payment(70, 13, 100, 'ch_a'), payment(71, 13, 100, 'ch_b')],
  );
  assert.equal(mismatches.length, 1);
  assert.equal(mismatches[0].reason, 'duplicate_payment');
  assert.deepEqual(mismatches[0].payment_ids, [70, 71]);
  assert.equal(summary.duplicate_payment, 1);
});

test('NULL attendance (session not closed) is not a mismatch', () => {
  const { mismatches, summary } = reconcile(
    [booking(4, 14, 100, null)],
    [],
  );
  assert.equal(mismatches.length, 0);
  assert.equal(summary.attended, 0);
});

test('attended=false members owe nothing even with no payment', () => {
  const { mismatches } = reconcile(
    [booking(5, 15, 100, false)],
    [],
  );
  assert.equal(mismatches.length, 0);
});

test('payment charging a different amount than the session price is amount_mismatch', () => {
  const p = { ...payment(80, 16, 100, 'ch_amt'), amount_cents: 1200, expected_amount_cents: 1800 };
  const { mismatches, summary } = reconcile(
    [booking(6, 16, 100, true)],
    [p],
  );
  assert.equal(mismatches.length, 1);
  assert.equal(mismatches[0].reason, 'amount_mismatch');
  assert.equal(mismatches[0].amount_cents, 1200);
  assert.equal(mismatches[0].expected_amount_cents, 1800);
  assert.equal(summary.amount_mismatch, 1);
  assert.equal(summary.matched, 1); // still counts as matched — money arrived, just wrong
});

test('payment matching the session price raises no amount_mismatch', () => {
  const p = { ...payment(81, 17, 100, 'ch_ok'), amount_cents: 1800, expected_amount_cents: 1800 };
  const { mismatches, summary } = reconcile(
    [booking(7, 17, 100, true)],
    [p],
  );
  assert.equal(mismatches.length, 0);
  assert.equal(summary.amount_mismatch, 0);
});
