// `octal-day` - planetary time scale 

const VENUS_T0 = new Date(`1761-06-06T05:19:00Z`)  // -6581846460000 
const VENUS_T1 = new Date(`1769-06-03T22:25:00Z`) // -6329583300000
const UNIX_EPOCH = new Date(`1970-01-01T00:00:00Z`) // 0
const UNIX_DAY = new Date(`1970-01-02T00:00:00Z`) // 86400000
const VENUS_T2 = new Date(`2004-06-08T08:20:00Z`) // 1086682800000
const VENUS_T3 = new Date(`2012-06-06T01:29:00Z`) // 1338946140000
const VENUS_T4 = new Date(`2247-06-11T11:33:00Z`) // 8755212780000
const VENUS_T5 = new Date(`2255-06-09T04:38:00Z`) // 9007475880000

const T3_DAY = new Date(VENUS_T3).setUTCHours(0, 0, 0, 0) // 1338940800000
const T5_DAY = new Date(VENUS_T5).setUTCHours(0, 0, 0, 0) // 9007459200000

const ERA_DAYS = (T5_DAY - T3_DAY) / UNIX_DAY // 88756 === 0o255264
const TRANSIT_DAYS = Math.ceil((VENUS_T3 - VENUS_T2) / UNIX_DAY) // 2920 === 0o5550
const SUN = 8 // 0o555x0o10=0o5550
const VENUS = 5 // 0o1110x0o5=0o5550
const PETAL = TRANSIT_DAYS / (SUN * VENUS)  // 2920/40=73 === 0o5550/0o50=0o111

export function useDay(timestamp = Date.now(), offset = (new Date().getTimezoneOffset() * 60 * 1000) / UNIX_DAY) {

  if (!timestamp) return {}

  const octal = {}
  const render = {}

  const utcDaysSinceEpoch = (timestamp - T3_DAY) / UNIX_DAY;
  const adjustedDays = utcDaysSinceEpoch - offset

  const eraIndex = Math.floor(adjustedDays / ERA_DAYS)
  const eraDayRaw = adjustedDays - (eraIndex * ERA_DAYS);
  const normalizedEraDay = ((eraDayRaw % ERA_DAYS) + ERA_DAYS) % ERA_DAYS;
  const transit = Math.floor(normalizedEraDay / TRANSIT_DAYS)
  const transitDay = Math.floor(normalizedEraDay) % TRANSIT_DAYS
  const petal = Math.floor(transitDay / PETAL)
  const petalOctave = Math.floor((transitDay - PETAL * petal) / 8)
  const sun = Math.floor(petal / 5)
  const sunPetal = petal - sun * 5
  const venus = Math.floor(petal / 8)
  const venusPetal = petal - venus * 8

  const raw = { era: eraIndex, day: normalizedEraDay }

  octal.era = (eraIndex + 1).toString(8)
  octal.eraDay = Math.floor(normalizedEraDay).toString(8)
  octal.time = (normalizedEraDay % 1).toString(8).padEnd(6, '0').slice(2)
  octal.transit = transit.toString(8)
  octal.transitDay = transitDay.toString(8)
  octal.transitOctave = transitDay.toString(8).slice(0, -1)
  octal.octave = octal.eraDay.slice(0, -1)
  octal.octaveDay = octal.eraDay.slice(-1)
  octal.petal = petal.toString(8)
  octal.sun = sun.toString(8)
  octal.sunPetal = sunPetal.toString(8)
  octal.petalOctave = petalOctave.toString(8)

  render.time = `${octal.time.slice(0, 2)}:${octal.time.slice(2, 4)}:${octal.time.slice(4, 6)}`
  render.era = 'E' + octal.era + '-D' + octal.eraDay.padStart(6, '0')
  render.transit = `e${octal.era}-t${octal.transit}-d${octal.transitDay}`
  render.octave = `e${octal.era}-t${octal.transit}-v${octal.transitOctave}-d${octal.octaveDay}`
  render.petal = `e${octal.era}-t${octal.transit}-p${octal.petal}-v${octal.petalOctave}-d${octal.octaveDay}`
  render.sun = `e${octal.era}-t${octal.transit}-s${octal.sun}-p${octal.sunPetal}-v${petalOctave.toString(8)}-d${octal.octaveDay}`
  render.venus = `e${octal.era}-t${octal.transit}-n${venus.toString(8)}-p${venusPetal.toString(8)}-v${petalOctave.toString(8)}-d${octal.octaveDay}`

  return { raw, octal, render }
}

export function useDate({ count, time = 0, era = 1 } = {}) {
  return new Date(T3_DAY + ((era - 1) * ERA_DAYS + (parseInt(count, 8) + parseInt(time, 8) / (8 ** time.length))) * UNIX_DAY)
}