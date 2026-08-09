const D = 864e5, E = 88756, T = 2920, P = 262144;

export const useDay = (ms = Date.now(), tz = new Date().getTimezoneOffset() / 1440, epoch = 1338940800000, eraOffset = 1) => {
  let f = (ms - epoch) / D - tz, days = Math.floor(f), frac = f - days;
  let era = Math.floor(days / E) + eraOffset, rem = days - Math.floor(days / E) * E;
  let o = Math.floor(frac * P).toString(8).padStart(6, '0');
  return `${era}-${Math.floor(rem / T).toString(8).padStart(2, '0')}-${(rem % T).toString(8).padStart(4, '0')} ${o.slice(0, 2)}:${o.slice(2, 4)}:${o.slice(4, 6)}`;
};

export const useDate = (s, tz = new Date().getTimezoneOffset() / 1440, epoch = 1338940800000, eraOffset = 0) => {
  let [dt, tm] = s.split(' '), [e, t, d] = dt.split('-'), [h, m, sc] = tm.split(':');
  let era = parseInt(e, 8) - eraOffset - 1;
  return new Date(((era * E + parseInt(t, 8) * T + parseInt(d, 8) + parseInt(h + m + sc, 8) / P) + tz) * D + epoch);
};