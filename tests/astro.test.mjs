import test from 'node:test';
import assert from 'node:assert/strict';

import { dateToOctaDate, octaDateToGregorian } from '../src/astro.js';

function assertRoundTrip(label, inputDate) {
  const encoded = dateToOctaDate(inputDate);
  const decoded = octaDateToGregorian(encoded);
  const deltaMs = Math.abs(decoded.getTime() - inputDate.getTime());
  assert.ok(deltaMs <= 1000, `${label}: expected round-trip delta <= 1000ms, got ${deltaMs}ms`);
}

test('round-trips modern and recent dates', () => {
  assertRoundTrip('modern date', new Date('2024-06-21T12:34:56.789Z'));
  assertRoundTrip('recent date', new Date('2026-08-04T09:15:00.000Z'));
});

test('supports negative-era conversions for ancient dates', () => {
  assertRoundTrip('ancient date', new Date('0100-01-01T00:00:00.000Z'));
  const encoded = dateToOctaDate(new Date('0100-01-01T00:00:00.000Z'));
  assert.ok(encoded.era < 0, `expected negative era for ancient dates, got ${encoded.era}`);
});
