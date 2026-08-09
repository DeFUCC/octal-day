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
	const epochDays = (timestamp - T3_DAY) / UNIX_DAY - offset;
	const eraIndex = Math.floor(epochDays / ERA_DAYS);
	const normalizedEraDay = ((epochDays - eraIndex * ERA_DAYS) % ERA_DAYS + ERA_DAYS) % ERA_DAYS;
	const transit = Math.floor(normalizedEraDay / TRANSIT_DAYS);
	const transitDay = Math.floor(normalizedEraDay) % TRANSIT_DAYS;
	const octalTime = (normalizedEraDay % 1).toString(8).padEnd(6, "0").slice(2);
	const time = `${octalTime.slice(0, 2)}:${octalTime.slice(2, 4)}:${octalTime.slice(4, 6)}`;
	return `${`${(eraIndex + 1).toString(8)}-${transit.toString(8).padStart(2, "0")}-${transitDay.toString(8).padStart(4, "0")}`} ${time}`;
}
//#endregion
export { MARKERS, useDay };
