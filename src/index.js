const DAY_MS = 864e5, ERA_DAYS = 88756, TRANSIT_DAYS = 2920, TIME_SCALE = 262144;

export const useDay = (ms = Date.now(), tz = new Date().getTimezoneOffset() / 1440, epoch = 1338940800000, eraOffset = 1) => {
  let f = (ms - epoch) / DAY_MS - tz, days = Math.floor(f), frac = f - days;
  let era = Math.floor(days / ERA_DAYS) + eraOffset, rem = days - Math.floor(days / ERA_DAYS) * ERA_DAYS;
  let o = Math.floor(frac * TIME_SCALE).toString(8).padStart(6, '0');
  return `${era.toString(8)}-${Math.floor(rem / TRANSIT_DAYS).toString(8).padStart(2, '0')}-${(rem % TRANSIT_DAYS).toString(8).padStart(4, '0')} ${o.slice(0, 2)}:${o.slice(2, 4)}:${o.slice(4, 6)}`;
};

export const useDate = (s, tz = new Date().getTimezoneOffset() / 1440, epoch = 1338940800000, eraOffset = 1) => {
  let [dt, tm] = s.split(' '), [e, t, d] = dt.split('-'), [h, m, sc] = tm.split(':');
  let era = parseInt(e, 8) - eraOffset - 1;
  return new Date(((era * ERA_DAYS + parseInt(t, 8) * TRANSIT_DAYS + parseInt(d, 8) + parseInt(h + m + sc, 8) / TIME_SCALE) + tz) * DAY_MS + epoch);
};