import { AstroTime, SearchTransit, NextTransit, Observer, HourAngle, Body, SearchRelativeLongitude, Illumination, MoonPhase, Seasons, SearchMoonQuarter, NextMoonQuarter } from 'astronomy-engine'

export const astroTime = new AstroTime(new Date())
export const jd0Astro = new AstroTime(0);
export const firstTransit = SearchTransit(Body.Venus, jd0Astro);
export const transits = [firstTransit]
for (let t = 1; t < 6; t++) {
  transits[t] = NextTransit(Body.Venus, transits[t - 1].finish)
}


export const startYear = firstTransit.peak.date.getUTCFullYear()
export const startSolstice = Seasons(startYear).jun_solstice
export const currentYear = astroTime.date.getUTCFullYear()
export const recentSolstice = Seasons(currentYear).jun_solstice.ut < astroTime.ut ? Seasons(currentYear).jun_solstice : Seasons(currentYear - 1).jun_solstice
export const yearLength = Seasons(currentYear).jun_solstice.ut - Seasons(currentYear - 1).jun_solstice.ut
export const yearsPassed = Math.round((recentSolstice.ut - startSolstice.ut) / yearLength)
export const octaeteride = Math.floor(yearsPassed / 8)
export const year = yearsPassed - octaeteride * 8
export const currentStart = Seasons(startYear + octaeteride * 8).jun_solstice
export const dayCount = Math.floor(astroTime.ut - currentStart.ut)
export const octaveCount = Math.floor(dayCount / 8)
export const seasonCount = Math.floor(dayCount / 73)
export const startMoon = NextMoonQuarter(SearchMoonQuarter(firstTransit.peak))
export const nextMoon = NextMoonQuarter(SearchMoonQuarter(transits[1].peak))
export const moonCycle = (nextMoon.time.ut - startMoon.time.ut) / 99


export const offsetMinutes = (new Date()).getTimezoneOffset()
export const offsetHours = -offsetMinutes / 60;
export const estimatedLongitude = offsetHours * 15;


export const startOffset = getOfflineSolarFraction(startSolstice)
export const CALENDAR_EPOCH_UT = startSolstice.ut - startOffset;
export const CALENDAR_EPOCH = new AstroTime(CALENDAR_EPOCH_UT);


export const octaeterides = [firstTransit.finish]
for (let ic = 1; ic < 33; ic++) {
  octaeterides.push(findNextIC(octaeterides[ic - 1].AddDays(2900.0)))
}


export function findNextIC(startDate) {
  let currentTime = new AstroTime(startDate);

  while (true) {
    let conjTime = SearchRelativeLongitude(Body.Venus, 0, currentTime);
    let illum = Illumination(Body.Venus, conjTime);

    if (illum.geo_dist < 1.0) {
      return conjTime; // It's an Inferior Conjunction!
    }
    currentTime = conjTime.AddDays(200.0);
  }
}


export function getOfflineSolarFraction(astroTime, longitutde = estimatedLongitude) {
  const sunHourAngle = HourAngle(Body.Sun, astroTime, new Observer(0, longitutde, 0));
  const fraction = (sunHourAngle + 12) / 24;
  return ((fraction % 1) + 1) % 1;
}


export function getMoonPhase(astroTime) {
  const angle = MoonPhase(astroTime);
  const illum = Illumination(Body.Moon, astroTime);
  const age = (angle / 360) * 29.53;

  return {
    angle,
    age,
    illumination: illum.phase_fraction,
    magnitude: illum.mag,
  };
}

