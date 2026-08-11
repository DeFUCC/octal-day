//#region README.md
var e = 0xfd018ddc00, t = 88756, n = 2920, r = 864e5, i = 86400000000000n, a = 262144, o = 68719476736n, s = (e, t) => {
	let n = Math.round(t * r), i = BigInt(n) * 1000000n;
	return typeof e == "bigint" ? e + i : BigInt(Math.round(e + t * r)) * 1000000n;
};
function c(r = Date.now(), a = -(/* @__PURE__ */ new Date()).getTimezoneOffset() / 1440, c = e, l = 1) {
	let u = s(r, a) - BigInt(c) * 1000000n, d = u / i, f = u % i;
	f < 0n && (d--, f += i);
	let p = d / BigInt(t), m = d % BigInt(t);
	m < 0n && (p--, m += BigInt(t));
	let h = (Number(p) + l).toString(8), g = Number(m), _ = (g / n | 0).toString(8).padStart(2, "0"), v = (g % n).toString(8).padStart(4, "0"), y = (f * o / i).toString(8).padStart(12, "0");
	return `${h}-${_}-${v} ${`${y.slice(0, 2)}:${y.slice(2, 4)}:${y.slice(4, 6)}`}${typeof r == "bigint" ? `.${y.slice(6, 8)}:${y.slice(8, 10)}:${y.slice(10, 12)}` : ""}`;
}
function l(s, c = -(/* @__PURE__ */ new Date()).getTimezoneOffset() / 1440, l = e, u = 1) {
	let [d, f] = s.split(" "), [p, m, h] = d.split("-"), [g, _] = f.split("."), [v, y, b] = g.split(":"), x = (parseInt(p, 8) - u) * t + parseInt(m, 8) * n + parseInt(h, 8);
	if (_) {
		let [e, t, n] = _.split(":"), s = Math.round(c * r), u = BigInt(s) * 1000000n, d = BigInt(parseInt(v + y + b, 8)) * BigInt(a), f = BigInt(parseInt(e + t + n, 8));
		return BigInt(x) * i - u + (d + f) * i / o + BigInt(l) * 1000000n;
	}
	return (x + c + parseInt(v + y + b, 8) / a) * r + l;
}
//#endregion
export { r as DAY_MS, i as DAY_NS, e as EPOCH_1, t as ERA_DAYS, o as MICRO_SCALE, a as TIME_SCALE, n as TRANSIT_DAYS, l as octalDate, c as octalDay };
