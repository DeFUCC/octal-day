//#region src/index.js
var UNIX_DAY = /* @__PURE__ */ new Date(`1970-01-02T00:00:00Z`);
var VENUS_T2 = /* @__PURE__ */ new Date(`2004-06-08T08:20:00Z`);
var VENUS_T3 = /* @__PURE__ */ new Date(`2012-06-06T01:29:00Z`);
var VENUS_T5 = /* @__PURE__ */ new Date(`2255-06-09T04:38:00Z`);
var T3_DAY = new Date(VENUS_T3).setUTCHours(0, 0, 0, 0);
var ERA_DAYS = (new Date(VENUS_T5).setUTCHours(0, 0, 0, 0) - T3_DAY) / UNIX_DAY;
var TRANSIT_DAYS = Math.ceil((VENUS_T3 - VENUS_T2) / UNIX_DAY);
var PETAL = TRANSIT_DAYS / 40;
function useDay(timestamp = Date.now(), offset = (/* @__PURE__ */ new Date()).getTimezoneOffset() * 60 * 1e3 / UNIX_DAY) {
	if (!timestamp) return {};
	const octal = {};
	const render = {};
	const adjustedDays = (timestamp - T3_DAY) / UNIX_DAY - offset;
	const eraIndex = Math.floor(adjustedDays / ERA_DAYS);
	const normalizedEraDay = ((adjustedDays - eraIndex * ERA_DAYS) % ERA_DAYS + ERA_DAYS) % ERA_DAYS;
	const transit = Math.floor(normalizedEraDay / TRANSIT_DAYS);
	const transitDay = Math.floor(normalizedEraDay) % TRANSIT_DAYS;
	const petal = Math.floor(transitDay / PETAL);
	const petalOctave = Math.floor((transitDay - PETAL * petal) / 8);
	const sun = Math.floor(petal / 5);
	const sunPetal = petal - sun * 5;
	const venus = Math.floor(petal / 8);
	const venusPetal = petal - venus * 8;
	const raw = {
		era: eraIndex,
		day: normalizedEraDay
	};
	octal.era = (eraIndex + 1).toString(8);
	octal.eraDay = Math.floor(normalizedEraDay).toString(8);
	octal.time = (normalizedEraDay % 1).toString(8).padEnd(6, "0").slice(2);
	octal.transit = transit.toString(8);
	octal.transitDay = transitDay.toString(8);
	octal.transitOctave = transitDay.toString(8).slice(0, -1);
	octal.octave = octal.eraDay.slice(0, -1);
	octal.octaveDay = octal.eraDay.slice(-1);
	octal.petal = petal.toString(8);
	octal.sun = sun.toString(8);
	octal.sunPetal = sunPetal.toString(8);
	octal.petalOctave = petalOctave.toString(8);
	render.time = `${octal.time.slice(0, 2)}:${octal.time.slice(2, 4)}:${octal.time.slice(4, 6)}`;
	render.era = "E" + octal.era + "-D" + octal.eraDay.padStart(6, "0");
	render.transit = `e${octal.era}-t${octal.transit}-d${octal.transitDay}`;
	render.octave = `e${octal.era}-t${octal.transit}-v${octal.transitOctave}-d${octal.octaveDay}`;
	render.petal = `e${octal.era}-t${octal.transit}-p${octal.petal}-v${octal.petalOctave}-d${octal.octaveDay}`;
	render.sun = `e${octal.era}-t${octal.transit}-s${octal.sun}-p${octal.sunPetal}-v${petalOctave.toString(8)}-d${octal.octaveDay}`;
	render.venus = `e${octal.era}-t${octal.transit}-n${venus.toString(8)}-p${venusPetal.toString(8)}-v${petalOctave.toString(8)}-d${octal.octaveDay}`;
	return {
		raw,
		octal,
		render
	};
}
function useDate({ count, time = 0, era = 1 } = {}) {
	return new Date(T3_DAY + ((era - 1) * ERA_DAYS + (parseInt(count, 8) + parseInt(time, 8) / 8 ** time.length)) * UNIX_DAY);
}
//#endregion
export { useDate, useDay };
