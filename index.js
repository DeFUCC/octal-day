//#region README.md
var D = 864e5;
var E = 88756;
var T = 2920;
var P = 262144;
var Dn = 86400000000000n;
var Pn = 68719476736n;
var E1 = 13389408e5;
var toNs = (t, tz) => typeof t == "bigint" ? t + BigInt(Math.round(tz * D)) * 1000000n : BigInt(Math.round(t + tz * D)) * 1000000n;
function octalDay(t = Date.now(), tz = -(/* @__PURE__ */ new Date()).getTimezoneOffset() / 1440, ep = E1, eo = 1) {
	let ns = toNs(t, tz) - BigInt(ep) * 1000000n, d = ns / Dn, r = ns % Dn;
	if (r < 0n) {
		d--;
		r += Dn;
	}
	let eraBig = d / BigInt(E), eraRem = d % BigInt(E);
	if (eraRem < 0n) {
		eraBig--;
		eraRem += BigInt(E);
	}
	let e = Number(eraBig) + eo, rm = Number(eraRem);
	let o = (r * Pn / Dn).toString(8).padStart(12, "0"), hi = typeof t == "bigint";
	return `${e.toString(8)}-${(rm / T | 0).toString(8).padStart(2, "0")}-${(rm % T).toString(8).padStart(4, "0")} ${o.slice(0, 2)}:${o.slice(2, 4)}:${o.slice(4, 6)}${hi ? "." + o.slice(6, 8) + ":" + o.slice(8, 10) + ":" + o.slice(10, 12) : ""}`;
}
function octalDate(s, tz = -(/* @__PURE__ */ new Date()).getTimezoneOffset() / 1440, ep = E1, eo = 1) {
	let [dt, tm] = s.split(" "), [e, t, d] = dt.split("-"), [std, mic] = tm.split(".");
	let days = (parseInt(e, 8) - eo) * E + parseInt(t, 8) * T + parseInt(d, 8), [p1, p2, p3] = std.split(":");
	if (mic) {
		let [p4, p5, p6] = mic.split(":");
		return BigInt(days) * Dn - BigInt(Math.round(tz * D)) * 1000000n + (BigInt(parseInt(p1 + p2 + p3, 8)) * BigInt(P) + BigInt(parseInt(p4 + p5 + p6, 8))) * Dn / Pn + BigInt(ep) * 1000000n;
	}
	return (days + tz + parseInt(p1 + p2 + p3, 8) / P) * D + ep;
}
//#endregion
export { octalDate, octalDay };
