/**
 * OCTAL DAY PARSER SPEC v1.0
 * A continuous, base-8 time system grounded in the 243-year Venus transit cycle.
 * 
 * HIERARCHY:
 *   e = Era (243 years, 88756 days)
 *   t = octaeTeris (2920 days, 0o5550)
 *   s = Sol year (365 days, 0o555)
 *   q = Quintant (73 days, 0o111)
 *   v = octave (8 days, 0o10)
 *   d = Day (1 day, 0o1)
 * 
 * ADDRESS FORMAT:
 *   Full: e1-t01-s5-q01-v02-d4.23:34:33
 *   Compact: E1-T01-D2253.233433
 */

// ═══════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════

const EPOCH_MS = new Date('2012-06-06T01:29:00Z').setUTCHours(0, 0, 0, 0)
const EPOCH_FINISH_MS = new Date('2255-06-09T04:38:00Z').setUTCHours(0, 0, 0, 0)
const DAY_MS = 86400000
const ERA_DAYS = (EPOCH_FINISH_MS - EPOCH_MS) / DAY_MS // 88756
const JD_OFFSET = -10957.5

const CYCLES = {
  octave: 8,      // 0o10
  quintant: 73,   // 0o111
  year: 365,      // 0o555
  octaeteris: 2920 // 0o5550
}

// ═══════════════════════════════════════════════════════════════
// CORE CONVERSION
// ═══════════════════════════════════════════════════════════════

/**
 * Convert Date → Octal Day state
 */
export function useDay(date) {
  const unixMs = date instanceof Date ? date.getTime() : new Date(date).getTime()
  const raw = (unixMs - EPOCH_MS) / DAY_MS

  const era = Math.floor(raw / ERA_DAYS) + 1
  const decimal = ((raw % ERA_DAYS) + ERA_DAYS) % ERA_DAYS
  const intDay = Math.floor(decimal)

  return {
    // Raw coordinates
    raw, era, decimal, jd: (unixMs / DAY_MS) + JD_OFFSET,
    progress: decimal / ERA_DAYS,

    // Octal format
    day: intDay.toString(8).padStart(6, '0'),
    time: (decimal % 1).toString(8).slice(2).padEnd(6, '0'),

    // Lenses (cycle positions)
    weekday: intDay % CYCLES.octave,
    octave: Math.floor(intDay / CYCLES.octave),
    quintant: Math.floor(intDay / CYCLES.quintant),
    dayInQuintant: intDay % CYCLES.quintant,
    year: Math.floor(intDay / CYCLES.year),
    dayInYear: intDay % CYCLES.year,
    octaeteris: Math.floor(intDay / CYCLES.octaeteris),
    dayInOctaeteris: intDay % CYCLES.octaeteris,

    // Fractional day
    fraction: decimal % 1
  }
}

/**
 * Convert Octal Day state → Date
 */
export function useDate(state) {
  const era = state.era ?? 1
  const dayDecimal = parseInt(state.day, 8)
  const timeDecimal = state.time ? parseInt(state.time, 8) / (8 ** state.time.length) : 0
  const raw = (era - 1) * ERA_DAYS + dayDecimal + timeDecimal
  return new Date(EPOCH_MS + raw * DAY_MS)
}

// ═══════════════════════════════════════════════════════════════
// ADDRESS FORMATTING
// ═══════════════════════════════════════════════════════════════

/**
 * Format full hierarchical address
 * Example: e1-t01-s5-q01-v02-d4.23:34:33
 */
export function formatFullAddress(state) {
  const e = state.era.toString(8)
  const t = state.octaeteris.toString(8).padStart(2, '0')
  const s = state.year.toString(8).padStart(2, '0')
  const q = state.quintant.toString(8).padStart(2, '0')
  const v = state.octave.toString(8).padStart(2, '0')
  const d = state.weekday.toString(8)
  const time = state.time.match(/.{1,2}/g)?.join(':') ?? '00:00:00'

  return `e${e}-t${t}-s${s}-q${q}-v${v}-d${d}.${time}`
}

/**
 * Format compact address
 * Example: E1-T01-D2253.233433
 */
export function formatCompactAddress(state) {
  const e = state.era.toString(8)
  const t = state.octaeteris.toString(8).padStart(2, '0')
  const d = state.dayInOctaeteris.toString(8).padStart(4, '0')
  const time = state.time

  return `E${e}-T${t}-D${d}.${time}`
}

/**
 * Parse compact address → OctalState
 */
export function parseCompactAddress(address) {
  const match = address.match(/^(\d+)-(\w+)\.(\w+)\.(\w+)$/)
  if (!match) throw new Error('Invalid address format')

  const [, era, octaeteris, dayInOctaeteris, time] = match
  return {
    era: parseInt(era),
    octaeteris: parseInt(octaeteris, 8),
    dayInOctaeteris: parseInt(dayInOctaeteris, 8),
    time
  }
}

/**
 * @typedef {Object} OctalState
 * @property {number} raw
 * @property {number} era
 * @property {number} decimal
 * @property {number} jd
 * @property {number} progress
 * @property {string} day
 * @property {string} time
 * @property {number} weekday
 * @property {number} octave
 * @property {number} quintant
 * @property {number} dayInQuintant
 * @property {number} year
 * @property {number} dayInYear
 * @property {number} octaeteris
 * @property {number} dayInOctaeteris
 * @property {number} fraction
 */

// ═══════════════════════════════════════════════════════════════
// USAGE EXAMPLES
// ═══════════════════════════════════════════════════════════════

/*
// Current moment
const now = useDay(new Date())
console.log(formatFullAddress(now))
// "e1-t01-s5-q01-v02-d4.23:34:33"

console.log(formatCompactAddress(now))
// "1-01.2253.233433"

// Historical date
const historical = useDay(new Date('1889-08-20'))
console.log(historical.era) // 0
console.log(historical.day) // "125603"

// Round-trip conversion
const state = useDay(new Date('2026-08-05T16:51:15.455Z'))
const reconstructed = useDate(state)
console.log(reconstructed.toISOString()) // "2026-08-05T16:51:15.455Z"

// Parse compact address
const parsed = parseCompactAddress('1-01.2253.233433')
console.log(parsed.era) // 1
console.log(parsed.octaeteris) // 1
console.log(parsed.dayInOctaeteris) // 1195 (decimal)
*/