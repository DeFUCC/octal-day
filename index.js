//#region README.md
var e = 0xfd018ddc00, t = 88756, n = 2920, r = 864e5, i = 86400000000000n, a = 262144, o = 68719476736n, s = (e, t) => typeof e == "bigint" ? e + BigInt(Math.round(t * r)) * 1000000n : BigInt(Math.round(e + t * r)) * 1000000n;
function c(r = Date.now(), a = -(/* @__PURE__ */ new Date()).getTimezoneOffset() / 1440, c = e, l = 1) {
	let u = s(r, a) - BigInt(c) * 1000000n, d = u / i, f = u % i;
	f < 0n && (d--, f += i);
	let p = d / BigInt(t), m = d % BigInt(t);
	m < 0n && (p--, m += BigInt(t));
	let h = Number(p) + l, g = Number(m), _ = (f * o / i).toString(8).padStart(12, "0"), v = typeof r == "bigint";
	return `${h.toString(8)}-${(g / n | 0).toString(8).padStart(2, "0")}-${(g % n).toString(8).padStart(4, "0")} ${_.slice(0, 2)}:${_.slice(2, 4)}:${_.slice(4, 6)}${v ? "." + _.slice(6, 8) + ":" + _.slice(8, 10) + ":" + _.slice(10, 12) : ""}`;
}
function l(s, c = -(/* @__PURE__ */ new Date()).getTimezoneOffset() / 1440, l = e, u = 1) {
	let [d, f] = s.split(" "), [p, m, h] = d.split("-"), [g, _] = f.split("."), v = (parseInt(p, 8) - u) * t + parseInt(m, 8) * n + parseInt(h, 8), [y, b, x] = g.split(":");
	if (_) {
		let [e, t, n] = _.split(":");
		return BigInt(v) * i - BigInt(Math.round(c * r)) * 1000000n + (BigInt(parseInt(y + b + x, 8)) * BigInt(a) + BigInt(parseInt(e + t + n, 8))) * i / o + BigInt(l) * 1000000n;
	}
	return (v + c + parseInt(y + b + x, 8) / a) * r + l;
}
//#endregion
export { r as DAY_MS, i as DAY_NS, e as EPOCH_1, t as ERA_DAYS, o as MICRO_SCALE, a as TIME_SCALE, n as TRANSIT_DAYS, l as octalDate, c as octalDay, s as toNs };
