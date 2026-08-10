//#region src/index.js
var UNIX_DAY = /* @__PURE__ */ new Date(`1970-01-02T00:00:00Z`);
var VENUS_T2 = /* @__PURE__ */ new Date(`2004-06-08T08:20:00Z`);
var VENUS_T3 = /* @__PURE__ */ new Date(`2012-06-06T01:29:00Z`);
var VENUS_T5 = /* @__PURE__ */ new Date(`2255-06-09T04:38:00Z`);
var T3_DAY = new Date(VENUS_T3).setUTCHours(0, 0, 0, 0);
var ERA_DAYS = (new Date(VENUS_T5).setUTCHours(0, 0, 0, 0) - T3_DAY) / UNIX_DAY;
var TRANSIT_DAYS = Math.ceil((VENUS_T3 - VENUS_T2) / UNIX_DAY);
var PETAL = TRANSIT_DAYS / 40;
var MARKERS = {
	"e": ERA_DAYS,
	"t": TRANSIT_DAYS,
	"s": PETAL * 5,
	"p": PETAL,
	"v": 8,
	"d": 1
};
function useDay(timestamp = Date.now(), offset = (/* @__PURE__ */ new Date()).getTimezoneOffset() * 60 * 1e3 / UNIX_DAY) {
	if (!timestamp) return {};
	const octal = {};
	const render = {};
	const epochDays = (timestamp - T3_DAY) / UNIX_DAY - offset;
	const eraIndex = Math.floor(epochDays / ERA_DAYS);
	const normalizedEraDay = ((epochDays - eraIndex * ERA_DAYS) % ERA_DAYS + ERA_DAYS) % ERA_DAYS;
	const transit = Math.floor(normalizedEraDay / TRANSIT_DAYS);
	const transitDay = Math.floor(normalizedEraDay) % TRANSIT_DAYS;
	const petal = Math.floor(transitDay / PETAL);
	const petalOctave = Math.floor((transitDay - PETAL * petal) / 8);
	const dayOfPetalOctave = transitDay % PETAL % 8;
	const raw = {
		era: eraIndex,
		day: normalizedEraDay
	};
	octal.era = (eraIndex + 1).toString(8);
	octal.eraDay = Math.floor(normalizedEraDay).toString(8);
	octal.time = (normalizedEraDay % 1).toString(8).padEnd(6, "0").slice(2);
	octal.transit = transit.toString(8).padStart(2, "0");
	octal.transitDay = transitDay.toString(8);
	octal.transitOctave = transitDay.toString(8).slice(0, -1);
	octal.octave = octal.transitDay.slice(0, -1);
	octal.octaveDay = octal.transitDay.slice(-1);
	octal.petal = petal.toString(8);
	octal.petalOctave = petalOctave.toString(8);
	octal.petalDay = dayOfPetalOctave.toString(8);
	render.time = `${octal.time.slice(0, 2)}:${octal.time.slice(2, 4)}:${octal.time.slice(4, 6)}`;
	render.era = `E${octal.era}-D${octal.eraDay.padStart(6, "0")}`;
	render.transit = `e${octal.era}-t${octal.transit}-d${octal.transitDay}`;
	render.octave = `e${octal.era}-t${octal.transit}-v${octal.transitOctave}-d${octal.octaveDay}`;
	render.petal = `e${octal.era}-t${octal.transit}-p${octal.petal}-v${octal.petalOctave}-d${octal.petalDay}`;
	return {
		raw,
		octal,
		render
	};
}
function useDate(address, offset = 0) {
	if (!address) return /* @__PURE__ */ new Date();
	let totalDays = 0;
	const pattern = /([etspvd])([0-7]+)/gi;
	let match;
	while ((match = pattern.exec(address)) !== null) {
		const marker = match[1].toLowerCase();
		const value = parseInt(match[2], 8);
		if (MARKERS[marker]) totalDays += value * MARKERS[marker];
	}
	let timeDecimal = 0;
	const timeMatch = address.match(/\.([\d:]+)/);
	if (timeMatch) {
		const cleanTime = timeMatch[1].replace(/:/g, "");
		timeDecimal = parseInt(cleanTime, 8) / Math.pow(8, cleanTime.length);
	}
	Math.floor(totalDays / ERA_DAYS) * ERA_DAYS;
	totalDays + timeDecimal;
	const eraMatch = address.match(/[Ee](\d+)/);
	const utcMs = T3_DAY + ((eraMatch ? parseInt(eraMatch[1], 8) - 1 : 0) * ERA_DAYS + totalDays % ERA_DAYS + timeDecimal) * UNIX_DAY;
	return new Date(utcMs + offset * UNIX_DAY);
}
//#endregion
export { MARKERS, useDate, useDay };
