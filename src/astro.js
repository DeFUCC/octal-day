import { AstroTime, SearchTransit, NextTransit, Observer, HourAngle, Body, SearchRelativeLongitude, Illumination, MoonPhase, Seasons } from 'astronomy-engine'

import { Temporal } from '@js-temporal/polyfill';


const JD0 = new Date('2000-01-01T00:00:00Z')
const jd0Astro = new AstroTime(JD0);
const firstTransit = SearchTransit(Body.Venus, jd0Astro);
const startYear = firstTransit.peak.date.getUTCFullYear()

const offsetMinutes = JD0.getTimezoneOffset()
const offsetHours = -offsetMinutes / 60;
const estimatedLongitude = offsetHours * 15;
const offlineObserver = new Observer(0, estimatedLongitude, 0);


const startSolstice = findFirstSolsticeAfter(firstTransit.finish)
const startOffset = getOfflineSolarFraction(startSolstice)
const CALENDAR_EPOCH_UT = startSolstice.ut - startOffset;
const CALENDAR_EPOCH = new AstroTime(CALENDAR_EPOCH_UT);

const transits = [firstTransit]
for (let t = 1; t < 6; t++) {
  transits[t] = NextTransit(Body.Venus, transits[t - 1].finish)
}


function getOfflineSolarFraction(astroTime) {
  const sunHourAngle = HourAngle(Body.Sun, astroTime, offlineObserver);
  const fraction = (sunHourAngle + 12) / 24;
  return ((fraction % 1) + 1) % 1;
}

function formatWithTemporal(utcIsoString) {
  const zdt = Temporal.Instant.from(utcIsoString)
    .toZonedDateTimeISO(Temporal.Now.timeZoneId());
  return `${zdt.toLocaleString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', })}, ${zdt.toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', })}`;
}


const ics = [firstTransit.finish]
for (let ic = 1; ic < 32; ic++) {
  ics.push(findNextIC(ics[ic - 1].AddDays(2900.0)))
}

function findNextIC(startDate) {
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

function getMoonPhase(astroTime) {
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

function findFirstSolsticeAfter(afterTime) {
  let year = afterTime.date.getUTCFullYear();
  while (true) {
    const s = Seasons(year);
    if (s.jun_solstice.ut > afterTime.ut) return s.jun_solstice;
    if (s.dec_solstice.ut > afterTime.ut) return s.dec_solstice;
    year++;
  }
}

export { firstTransit, getOfflineSolarFraction, getMoonPhase, transits, ics, formatWithTemporal, CALENDAR_EPOCH, CALENDAR_EPOCH_UT, estimatedLongitude }