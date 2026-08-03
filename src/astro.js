import { AstroTime, SearchTransit, NextTransit, Observer, HourAngle, Body, SearchRelativeLongitude, Illumination, MoonPhase, Seasons, SearchMoonQuarter, NextMoonQuarter } from 'astronomy-engine'

export const offsetMinutes = (new Date()).getTimezoneOffset()
export const offsetHours = -offsetMinutes / 60;
export const estimatedLongitude = offsetHours * 15;

export const astroTime = new AstroTime(new Date())
export const jd0Astro = new AstroTime(0);
export const firstTransit = SearchTransit(Body.Venus, jd0Astro);
export const transits = [firstTransit]
for (let t = 1; t < 6; t++) {
  transits[t] = NextTransit(Body.Venus, transits[t - 1].finish)
}

export const historicalTransits = [SearchTransit(Body.Venus, new AstroTime(new Date('01/01/1760')))]

for (let t = 1; t < 10; t++) {
  historicalTransits[t] = NextTransit(Body.Venus, historicalTransits[t - 1].finish)
}

export const startYear = firstTransit.peak.date.getUTCFullYear()
export const startSolstice = Seasons(startYear).jun_solstice
export const currentYear = astroTime.date.getUTCFullYear()
export const recentSolstice = Seasons(currentYear).jun_solstice.ut < astroTime.ut ? Seasons(currentYear).jun_solstice : Seasons(currentYear - 1).jun_solstice
export const yearLength = Seasons(currentYear).jun_solstice.ut - Seasons(currentYear - 1).jun_solstice.ut
export const yearsPassed = Math.round((recentSolstice.ut - startSolstice.ut) / yearLength)
export const octaeteride = Math.floor(yearsPassed / 8)
export const year = yearsPassed - octaeteride * 8
export const startOffset = getOfflineSolarFraction(startSolstice)
export const currentStart = Seasons(startYear + octaeteride * 8).jun_solstice
export const dayCount = Math.floor(astroTime.ut - currentStart.ut - startOffset)
export const octaveCount = Math.floor(dayCount / 8)
export const seasonCount = Math.floor(dayCount / 73)
export const startMoon = NextMoonQuarter(SearchMoonQuarter(firstTransit.peak))
export const nextMoon = NextMoonQuarter(SearchMoonQuarter(transits[1].peak))
export const moonCycle = (nextMoon.time.ut - startMoon.time.ut) / 99

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

export function getLocalEpochUT(eventTime, longitude = estimatedLongitude) {
  const observer = new Observer(0, longitude, 0);
  const sunHourAngle = HourAngle(Body.Sun, eventTime, observer);
  const fraction = (sunHourAngle + 12) / 24;
  const solarFraction = ((fraction % 1) + 1) % 1;
  return eventTime.ut - solarFraction;
}

export const EPOCH_YEAR = 1760;
export const EPOCH_SOLSTICE = Seasons(EPOCH_YEAR).jun_solstice;
const DAYS_PER_OCTAETERIS = 2920;
const OCTAETERIS_YEARS = 8;
const YEARS_PER_TRANSIT_CYCLE = 243;
const OCTAETERIDES_PER_TRANSIT_CYCLE = Math.floor(YEARS_PER_TRANSIT_CYCLE / OCTAETERIS_YEARS);

function getOctaeterisBoundary(year, longitude = estimatedLongitude) {
  const solstice = Seasons(year).jun_solstice;
  return getLocalEpochUT(solstice, longitude);
}

export function dateToOctaDate(date, longitude = estimatedLongitude) {
  const astroTime = date instanceof AstroTime ? date : new AstroTime(date);
  const targetUT = astroTime.ut;
  const epochYear = startSolstice.date.getUTCFullYear();
  const targetYear = astroTime.date.getUTCFullYear();

  let boundaryYear = epochYear + Math.floor((targetYear - epochYear) / OCTAETERIS_YEARS) * OCTAETERIS_YEARS;
  let boundaryUT = getOctaeterisBoundary(boundaryYear, longitude);

  while (boundaryUT > targetUT) {
    boundaryYear -= OCTAETERIS_YEARS;
    boundaryUT = getOctaeterisBoundary(boundaryYear, longitude);
  }

  let nextBoundaryYear = boundaryYear + OCTAETERIS_YEARS;
  let nextBoundaryUT = getOctaeterisBoundary(nextBoundaryYear, longitude);
  while (nextBoundaryUT <= targetUT) {
    boundaryYear = nextBoundaryYear;
    boundaryUT = nextBoundaryUT;
    nextBoundaryYear += OCTAETERIS_YEARS;
    nextBoundaryUT = getOctaeterisBoundary(nextBoundaryYear, longitude);
  }

  const elapsedDays = targetUT - boundaryUT;
  const day = Math.floor(elapsedDays);
  const fraction = elapsedDays - day;
  const absoluteOctaeteris = Math.floor((boundaryYear - epochYear) / OCTAETERIS_YEARS);
  const era = Math.floor(absoluteOctaeteris / OCTAETERIDES_PER_TRANSIT_CYCLE);
  const octaeteris = absoluteOctaeteris - era * OCTAETERIDES_PER_TRANSIT_CYCLE;
  const isWaiting = day >= DAYS_PER_OCTAETERIS;

  return {
    era,
    octaeteris,
    day,
    fraction,
    isWaiting,
    boundaryYear,
    boundaryUT,
    absoluteOctaeteris,
  };
}

export function octaDateToGregorian(octaDate, longitude = estimatedLongitude) {
  const {
    era: eraValue = 0,
    octaeteris: octaeterisValue = 0,
    day: dayValue = 0,
    fraction: fractionValue = 0,
  } = octaDate ?? {};

  const absoluteOctaeteris = eraValue * OCTAETERIDES_PER_TRANSIT_CYCLE + octaeterisValue;
  const epochYear = startSolstice.date.getUTCFullYear();
  const boundaryYear = epochYear + absoluteOctaeteris * OCTAETERIS_YEARS;
  const boundaryUT = getOctaeterisBoundary(boundaryYear, longitude);
  const normalizedFraction = ((fractionValue % 1) + 1) % 1;
  const absoluteUT = boundaryUT + dayValue + normalizedFraction;

  return new AstroTime(absoluteUT).date;
}