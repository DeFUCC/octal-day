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
const SUN = 8 // 365x8=2920 === 0o555x0o10=0o5550
const VENUS = 5 // 584*5=2920 === 0o1110x0o5=0o5550
const PETAL = TRANSIT_DAYS / (SUN * VENUS)  // 2920/(5*8)=73 === 0o5550/(0o5*0o10)=0o111

export const MARKERS = {
  'e': ERA_DAYS,      // Era
  't': TRANSIT_DAYS,  // Transit (Octaeteris)
  's': PETAL * 5,     // Sun Year (5 Petals)
  'p': PETAL,         // Petal (73 days)
  'v': 8,             // Octave (8 days)
  'd': 1              // Day
}

export function useDay(timestamp = Date.now(), offset = (new Date().getTimezoneOffset() * 60 * 1000) / UNIX_DAY) {

  if (!timestamp) return {}

  const octal = {}
  const render = {}

  const epochDays = (timestamp - T3_DAY) / UNIX_DAY - offset;
  const eraIndex = Math.floor(epochDays / ERA_DAYS)
  const eraDayRaw = epochDays - (eraIndex * ERA_DAYS);
  const normalizedEraDay = ((eraDayRaw % ERA_DAYS) + ERA_DAYS) % ERA_DAYS;
  const transit = Math.floor(normalizedEraDay / TRANSIT_DAYS)
  const transitDay = Math.floor(normalizedEraDay) % TRANSIT_DAYS
  const petal = Math.floor(transitDay / PETAL)
  const petalOctave = Math.floor((transitDay - PETAL * petal) / 8)
  const withinPetal = transitDay % PETAL
  const dayOfPetalOctave = withinPetal % 8

  const raw = { era: eraIndex, day: normalizedEraDay }

  octal.era = (eraIndex + 1).toString(8)
  octal.eraDay = Math.floor(normalizedEraDay).toString(8)
  octal.time = (normalizedEraDay % 1).toString(8).padEnd(6, '0').slice(2)
  octal.transit = transit.toString(8).padStart(2, '0')
  octal.transitDay = transitDay.toString(8)
  octal.transitOctave = transitDay.toString(8).slice(0, -1)
  octal.octave = octal.transitDay.slice(0, -1)
  octal.octaveDay = octal.transitDay.slice(-1)
  octal.petal = petal.toString(8)
  octal.petalOctave = petalOctave.toString(8)
  octal.petalDay = dayOfPetalOctave.toString(8)

  render.time = `${octal.time.slice(0, 2)}:${octal.time.slice(2, 4)}:${octal.time.slice(4, 6)}`
  render.era = `E${octal.era}-D${octal.eraDay.padStart(6, '0')}`
  render.transit = `e${octal.era}-t${octal.transit}-d${octal.transitDay}`
  render.octave = `e${octal.era}-t${octal.transit}-v${octal.transitOctave}-d${octal.octaveDay}`
  render.petal = `e${octal.era}-t${octal.transit}-p${octal.petal}-v${octal.petalOctave}-d${octal.petalDay}`


  return { raw, octal, render }
}

export function useDate(address, offset = 0) {
  if (!address) return new Date()

  let totalDays = 0

  const pattern = /([etspvd])([0-7]+)/gi
  let match

  while ((match = pattern.exec(address)) !== null) {
    const marker = match[1].toLowerCase()
    const value = parseInt(match[2], 8)

    if (MARKERS[marker]) {
      totalDays += value * MARKERS[marker]
    }
  }

  let timeDecimal = 0
  const timeMatch = address.match(/\.([\d:]+)/)
  if (timeMatch) {
    const cleanTime = timeMatch[1].replace(/:/g, '')
    timeDecimal = parseInt(cleanTime, 8) / Math.pow(8, cleanTime.length)
  }

  const eraOffset = (Math.floor(totalDays / ERA_DAYS)) * ERA_DAYS
  const finalDays = totalDays + timeDecimal

  const eraMatch = address.match(/[Ee](\d+)/)
  const eraIndex = eraMatch ? (parseInt(eraMatch[1], 8) - 1) : 0

  const utcMs = T3_DAY + ((eraIndex * ERA_DAYS) + (totalDays % ERA_DAYS) + timeDecimal) * UNIX_DAY

  return new Date(utcMs + (offset * UNIX_DAY))
}