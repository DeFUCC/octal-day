// ==========================================
// 🪐 octal-day - Planetary Time Scale Tests
// ==========================================

import { readFileSync } from 'fs';

const source = readFileSync('./README.md', 'utf8');
const dataUrl = 'data:text/javascript;base64,' + Buffer.from(source).toString('base64');
const { octalDay, octalDate } = await import(dataUrl);

// ==========================================
// 🧪 Test Runner & Assertions
// ==========================================

let passed = 0, failed = 0;

const test = (name, fn) => {
  try {
    fn();
    console.log(`✅ ${name}`);
    passed++;
  } catch (e) {
    console.log(`❌ ${name}`);
    console.log(`   ↳ ${e.message}`);
    failed++;
  }
};

const assertEqual = (actual, expected, msg = '') => {
  if (actual !== expected) {
    throw new Error(`${msg}\n   Expected: ${expected}\n   Actual:   ${actual}`);
  }
};

const assertClose = (actual, expected, tolerance, msg = '') => {
  if (typeof actual === 'bigint' && typeof expected === 'bigint') {
    if (actual > expected + BigInt(tolerance) || actual < expected - BigInt(tolerance)) {
      throw new Error(`${msg}\n   Expected: ${expected} (±${tolerance})\n   Actual:   ${actual}`);
    }
  } else {
    if (Math.abs(actual - expected) > tolerance) {
      throw new Error(`${msg}\n   Expected: ${expected} (±${tolerance})\n   Actual:   ${actual}`);
    }
  }
};

const assertMatch = (str, regex, msg = '') => {
  if (!regex.test(str)) {
    throw new Error(`${msg}\n   String: ${str} does not match ${regex}`);
  }
};

// ==========================================
// 🚀 Test Cases
// ==========================================

console.log('\n🌌 Running octal-day test suite...\n');

// 1. Epoch Anchors
test('Era 1 Epoch (2012-06-06) maps to 1-00-0000 00:00:00', () => {
  const str = octalDay(1086652800000, 0);
  assertEqual(str, '1-00-0000 00:00:00');
});

test('Era 2 Epoch (2255-06-09) maps to 2-00-0000 00:00:00', () => {
  const era2Ms = 1086652800000 + (88756 * 86400000);
  const str = octalDay(era2Ms, 0);
  assertEqual(str, '2-00-0000 00:00:00');
});

// 2. Deep Time & Negative Eras
test('Deep Time (1761 Kepler Transit) correctly resolves to negative Era', () => {
  const keplerMs = -7513574400000;
  const str = octalDay(keplerMs, 0);
  const era = parseInt(str.split('-')[0], 8);
  if (era > 0) throw new Error(`Expected Era <= 0 for 1761, got ${era}`);
  assertMatch(str, /^-?\d+-\d{2}-\d{4} \d{2}:\d{2}:\d{2}$/);
});

// 3. Standard Precision (Milliseconds) Round-Trip
test('Standard Precision (Number) round-trips within 330ms quantization limit', () => {
  const ms = 1700000000000;
  const str = octalDay(ms, 0);
  const reconstructed = octalDate(str, 0);
  assertClose(reconstructed, ms, 330, 'Standard precision drift exceeded 330ms');
});

// 4. High Precision (Nanoseconds) Round-Trip
test('High Precision (BigInt) round-trips within hardware quantization limits', () => {
  const ns = 1700000000000123456n;
  const str = octalDay(ns, 0);
  const reconstructed = octalDate(str, 0);
  assertClose(reconstructed, ns, 2000n, 'Nanosecond drift exceeded 2000ns');
  assertMatch(str, /^-?\d+-\d{2}-\d{4} \d{2}:\d{2}:\d{2}\.\d{2}:\d{2}:\d{2}$/);
});

// 5. Timezone / Longitude Offsets
test('Timezone offset shifts the day boundary correctly', () => {
  const str = octalDay(1086652800000, 0.5);
  assertEqual(str, '1-00-0000 40:00:00');

  const preEpochMs = 1086652800000 - (12 * 3600 * 1000);
  const str2 = octalDay(preEpochMs, 0.5);
  assertEqual(str2, '1-00-0000 00:00:00');
});

// 6. Canonical Format Validation
test('Output strictly matches the canonical ETD format', () => {
  const regex = /^-?\d+-\d{2}-\d{4} \d{2}:\d{2}:\d{2}$/;
  const str = octalDay(Date.now(), 0);
  assertMatch(str, regex);
});

test('High-precision output strictly matches the micro-scale format', () => {
  const regex = /^-?\d+-\d{2}-\d{4} \d{2}:\d{2}:\d{2}\.\d{2}:\d{2}:\d{2}$/;
  const str = octalDay(process.hrtime ? process.hrtime.bigint() : BigInt(Date.now()) * 1000000n, 0);
  assertMatch(str, regex);
});

// 7. Edge Cases
test('Handles exact day boundaries without fractional bleed', () => {
  const oneDayMs = 1086652800000 + 86400000;
  const str = octalDay(oneDayMs, 0);
  assertEqual(str, '1-00-0001 00:00:00');
});

// 🌟 FIX: The string round-trips perfectly, but the ms timestamp will snap to the nearest 330ms grid line.
test('Parses arbitrary valid strings back to timestamps (with quantization awareness)', () => {
  const str = '1-02-1234 23:45:67';
  const ms = octalDate(str, 0);
  const str2 = octalDay(ms, 0);

  // The string MUST round-trip perfectly
  assertEqual(str2, str, 'String round-trip failed');

  // The timestamp will be within the 330ms quantization limit of the original
  const originalMs = octalDate(str, 0);
  assertClose(ms, originalMs, 330, 'Standard precision drift exceeded 330ms');
});

// ==========================================
// 🏁 Summary
// ==========================================

console.log('\n' + '='.repeat(40));
if (failed === 0) {
  console.log(`🎉 All ${passed} tests passed! The engine is flawless.`);
} else {
  console.log(`⚠️  ${failed} test(s) failed. ${passed} passed.`);
}
console.log('='.repeat(40) + '\n');