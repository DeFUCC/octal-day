// octal.js — Convenience module for octal operations in the Octaeteris Calendar
// ============================================================================
// Provides: OctalNumber, octal formatting, digit extraction, trigram/hexagram lookup,
// weekday calculation, and named time-level accessors.

import { trigrams, hexagrams } from './iching.js'

// ─── Core Constants ────────────────────────────────────────────────────────

export const O = {
  BASE: 8,
  PENTAD_DAYS: 0o111,        // 73 decimal — the octal "repunit"
  OCTAETERIS_DAYS: 0o5550,   // 2920 decimal = 8 × 0o111 × 5
  YEAR_DAYS: 0o555,          // 365 decimal
  WEEK_DAYS: 0o10,           // 8 decimal
  VENUS_CYCLES_PER_OCTA: 5,
  PENTADS_PER_OCTA: 0o50,   // 40 decimal
  YEARS_PER_OCTA: 0o10,     // 8 decimal
}

// ─── OctalNumber Class ─────────────────────────────────────────────────────
// Wraps a number and provides octal-native operations without fighting JS

export class OctalNumber {
  constructor(value) {
    this.value = Number(value)
  }

  // Static factory methods
  static fromDecimal(n) { return new OctalNumber(n) }
  static fromOctalString(str) { return new OctalNumber(parseInt(String(str).replace(/^0o/, ''), 8)) }
  static fromDigits(...digits) {
    return new OctalNumber(parseInt(digits.join(''), 8))
  }

  // ── Conversion ──────────────────────────────────────────────────────────
  toString() { return this.value.toString(8) }
  toDecimal() { return this.value }
  toBinary() { return this.value.toString(2).padStart(3 * this.digitCount(), '0') }
  toHex() { return '0x' + this.value.toString(16) }
  toOctalLiteral() { return '0o' + this.toString() }

  // ── Digit Operations ────────────────────────────────────────────────────
  digits() {
    return this.toString().split('').map(Number)
  }

  digitCount() {
    return this.toString().length
  }

  digit(pos) {
    // pos: 0 = most significant, -1 = least significant
    const ds = this.digits()
    if (pos >= 0) return ds[pos] ?? 0
    return ds[ds.length + pos] ?? 0
  }

  lastDigit() { return this.digit(-1) }
  firstDigit() { return this.digit(0) }

  // ── Arithmetic (returns new OctalNumber) ─────────────────────────────────
  add(n) { return new OctalNumber(this.value + Number(n)) }
  sub(n) { return new OctalNumber(this.value - Number(n)) }
  mul(n) { return new OctalNumber(this.value * Number(n)) }
  div(n) { return new OctalNumber(Math.floor(this.value / Number(n))) }
  mod(n) { return new OctalNumber(this.value % Number(n)) }

  // ── Formatting ────────────────────────────────────────────────────────────
  pad(width) {
    return this.toString().padStart(width, '0')
  }

  format(parts, separator = '-') {
    // parts: array of digit widths, e.g. [1,2,2] for "2-36-53"
    let s = this.pad(parts.reduce((a, b) => a + b, 0))
    let result = []
    let offset = 0
    for (const w of parts) {
      result.push(s.slice(offset, offset + w))
      offset += w
    }
    return result.join(separator)
  }

  // ── I Ching Symbolism ─────────────────────────────────────────────────────
  trigram() {
    // Single digit: returns trigram object
    const d = this.lastDigit()
    return trigrams.find(t => t.octal_value === String(d))
  }

  hexagram() {
    // Two digits: returns hexagram object
    const ds = this.digits()
    if (ds.length < 2) ds.unshift(0)
    const pair = ds.slice(-2).join('')
    return hexagrams.find(h => h.octal_pair === pair)
  }

  // ── Iterator ─────────────────────────────────────────────────────────────
  *[Symbol.iterator]() {
    yield* this.digits()
  }

  // ── Primitive coercion ───────────────────────────────────────────────────
  valueOf() { return this.value }
  [Symbol.toPrimitive](hint) {
    return hint === 'string' ? this.toString() : this.value
  }
}

// ─── Standalone Utility Functions ────────────────────────────────────────────

/**
 * Convert any value to octal string (handles numbers, OctalNumber, strings)
 */
export function toOctal(value, options = {}) {
  const { pad = 0, prefix = false } = options
  let n = Number(value)
  let s = n.toString(8)
  if (pad > 0) s = s.padStart(pad, '0')
  return prefix ? '0o' + s : s
}

/**
 * Get a specific digit from an octal number
 * @param {number} n - The number
 * @param {number} pos - Digit position (0 = MSD, -1 = LSD)
 * @returns {number} The digit value 0-7
 */
export function octDigit(n, pos = -1) {
  const ds = toOctal(n).split('').map(Number)
  if (pos >= 0) return ds[pos] ?? 0
  return ds[ds.length + pos] ?? 0
}

/**
 * Get the last (least significant) octal digit
 */
export function lastOctDigit(n) {
  return octDigit(n, -1)
}

/**
 * Sum of last digits modulo 8 — used for weekday calculation
 * @param {...number} numbers - Any number of values
 * @returns {number} The weekday digit (0-7)
 */
export function octSumMod(...numbers) {
  const sum = numbers.reduce((acc, n) => acc + lastOctDigit(n), 0)
  return sum % 8
}

/**
 * Calculate weekday from pentad and day (in decimal or octal)
 * Each pentad shifts weekday by 1 because 73 = 8×9 + 1
 * @param {number} pentad - Pentad number
 * @param {number} day - Day within pentad
 * @returns {number} Weekday digit (0-7)
 */
export function weekday(pentad, day) {
  return octSumMod(pentad, day)
}

/**
 * Calculate continuous week number within octaeteris
 * @param {number} dayCount - Total days since octaeteris start
 * @returns {number} Week number
 */
export function weekNumber(dayCount) {
  return Math.floor(dayCount / 8)
}

/**
 * Decompose a day count into octaeteris calendar components
 * @param {number} totalDays - Days since epoch
 * @returns {Object} Decomposed calendar components
 */
export function decomposeDays(totalDays) {
  const octaeteris = Math.floor(totalDays / O.OCTAETERIS_DAYS)
  const daysInOcta = totalDays % O.OCTAETERIS_DAYS
  const pentad = Math.floor(daysInOcta / O.PENTAD_DAYS)
  const dayOfPentad = daysInOcta % O.PENTAD_DAYS
  const year = Math.floor(daysInOcta / O.YEAR_DAYS)
  const dayOfYear = daysInOcta % O.YEAR_DAYS
  const week = weekNumber(daysInOcta)
  const dayOfWeek = daysInOcta % 8

  return {
    octaeteris,
    daysInOcta,
    pentad,
    dayOfPentad,
    year,
    dayOfYear,
    week,
    dayOfWeek,
  }
}

// ─── Day Fraction (Time-of-Day) Operations ─────────────────────────────────

/**
 * Extract octal digits from a day fraction (0.0 to 0.999...)
 * @param {number} fraction - Day fraction
 * @param {number} count - Number of digits to extract (default 6)
 * @returns {string} Octal fractional digits
 */
export function octalFraction(fraction, count = 6) {
  const safe = Math.min(fraction, 0.999999999)
  const octalString = safe.toString(8)
  const fracPart = octalString.split('.')[1] || ''
  return fracPart.padEnd(count, '0').slice(0, count)
}

/**
 * Named time levels for day fraction digits
 */
export const TIME_LEVELS = [
  { name: 'octant', duration: 3 * 60, unit: 'minutes' },        // 3 hours
  { name: 'session', duration: 22.5 * 60, unit: 'seconds' },     // 22.5 min
  { name: 'topic', duration: 168.75, unit: 'seconds' },          // ~2.8 min
  { name: 'turn', duration: 21.09375, unit: 'seconds' },           // ~21 sec
  { name: 'phrase', duration: 2.63671875, unit: 'seconds' },     // ~2.6 sec
  { name: 'beat', duration: 0.32958984, unit: 'seconds' },        // ~0.33 sec
]

/**
 * Get all time level values from a day fraction
 * @param {number} fraction - Day fraction (0.0 to <1.0)
 * @returns {Object} Named time levels
 */
export function timeLevels(fraction) {
  const digits = octalFraction(fraction, TIME_LEVELS.length)
  const result = {}
  for (let i = 0; i < TIME_LEVELS.length; i++) {
    result[TIME_LEVELS[i].name] = Number(digits[i])
  }
  return result
}

/**
 * Format time as octal clock string: octant:session:topic
 * @param {number} fraction - Day fraction
 * @returns {string} Formatted time
 */
export function octime(fraction) {
  const digits = octalFraction(fraction, 6)
  const pairs = []
  for (let i = 0; i < 3; i++) {
    pairs.push(digits[i * 2] + digits[i * 2 + 1])
  }
  return pairs.join(':')
}

// ─── I Ching Lookup ────────────────────────────────────────────────────────

/**
 * Get trigram by octal digit (0-7)
 */
export function getTrigram(digit) {
  return trigrams.find(t => t.octal_value === String(digit))
}

/**
 * Get hexagram by octal pair string (e.g. "41", "77")
 */
export function getHexagram(pair) {
  const normalized = String(pair).padStart(2, '0')
  return hexagrams.find(h => h.octal_pair === normalized)
}

/**
 * Get hexagram from two octal digits
 */
export function hexagramFromDigits(upper, lower) {
  return getHexagram(`${upper}${lower}`)
}

// ─── Formatting Utilities ──────────────────────────────────────────────────

/**
 * Format a complete octaeteris date
 * @param {number} octaeteris - Octaeteris number
 * @param {number} pentad - Pentad number
 * @param {number} day - Day of pentad
 * @param {number} fraction - Day fraction (optional)
 * @returns {string} Formatted date
 */
export function formatDate(octaeteris, pentad, day, fraction = null) {
  const parts = [toOctal(octaeteris), toOctal(pentad, { pad: 2 }), toOctal(day, { pad: 2 })]
  let result = parts.join('-')
  if (fraction !== null) {
    result += '.' + octalFraction(fraction, 5)
  }
  return result
}

/**
 * Format a pure day count date
 * @param {number} octaeteris - Octaeteris number
 * @param {number} dayCount - Days within octaeteris
 * @param {number} fraction - Day fraction (optional)
 * @returns {string} Formatted date
 */
export function formatPureDate(octaeteris, dayCount, fraction = null) {
  let result = `${toOctal(octaeteris)}-${toOctal(dayCount, { pad: 4 })}`
  if (fraction !== null) {
    result += '.' + octalFraction(fraction, 5)
  }
  return result
}

// ─── Vue Composables (if using Vue) ─────────────────────────────────────────

/**
 * Vue composable for octal time display
 * Returns reactive octal time components
 */
export function useOctalTime(dayFractionRef) {
  // If using Vue, this would be a computed-based composable
  // For vanilla JS, we return a getter function
  return {
    get digits() { return octalFraction(dayFractionRef, 6).split('').map(Number) },
    get octant() { return this.digits[0] },
    get session() { return this.digits[1] },
    get topic() { return this.digits[2] },
    get turn() { return this.digits[3] },
    get phrase() { return this.digits[4] },
    get beat() { return this.digits[5] },
    get timeString() { return octime(dayFractionRef) },
    get levels() { return timeLevels(dayFractionRef) },
  }
}

// ─── Default Export ──────────────────────────────────────────────────────────

export default {
  O,
  OctalNumber,
  toOctal,
  octDigit,
  lastOctDigit,
  octSumMod,
  weekday,
  weekNumber,
  decomposeDays,
  octalFraction,
  TIME_LEVELS,
  timeLevels,
  octime,
  getTrigram,
  getHexagram,
  hexagramFromDigits,
  formatDate,
  formatPureDate,
  useOctalTime,
}
