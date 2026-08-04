import test from 'node:test';
import assert from 'node:assert/strict';

import { dateToOctaDate, octaDateToGregorian, yearsPassed as exportedYearsPassed, octaeteride as exportedOctaeteride, year as exportedYear } from '../src/astro.js';

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

test('keeps day fractions normalized and bounded for modern dates', () => {
  const encoded = dateToOctaDate(new Date('2026-08-04T09:15:00.000Z'));
  assert.ok(encoded.day >= 0, 'day count should remain non-negative');
  assert.ok(encoded.fraction >= 0 && encoded.fraction < 1, 'fraction should stay normalized to [0, 1)');
  assert.ok(Number.isFinite(encoded.fraction), 'fraction should be finite');
});

test('uses 243-year transit-cycle eras for larger spans', () => {
  const encoded = dateToOctaDate(new Date('2245-06-21T00:00:00.000Z'));
  assert.equal(encoded.era, 1, `expected the 243-year transit cycle to advance to era 1 after the first cycle, got ${encoded.era}`);
});

test('keeps years-passed consistent with the current octaeteris state', () => {
  assert.equal(exportedYearsPassed, exportedOctaeteride * 8 + exportedYear, 'yearsPassed should match octaeteride × 8 + year');
});
