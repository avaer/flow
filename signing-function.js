var parcelRequire = function(e, r, t, n) {
    var i, o = "function" == typeof parcelRequire && parcelRequire,
        u = "function" == typeof require && require;

    function f(t, n) {
        if (!r[t]) {
            if (!e[t]) {
                var i = "function" == typeof parcelRequire && parcelRequire;
                if (!n && i) return i(t, !0);
                if (o) return o(t, !0);
                if (u && "string" == typeof t) return u(t);
                var c = new Error("Cannot find module '" + t + "'");
                throw c.code = "MODULE_NOT_FOUND", c
            }
            p.resolve = function(r) {
                return e[t][1][r] || r
            }, p.cache = {};
            var l = r[t] = new f.Module(t);
            e[t][0].call(l.exports, p, l, l.exports, globalThis)
        }
        return r[t].exports;

        function p(e) {
            return f(p.resolve(e))
        }
    }
    f.isParcelRequire = !0, f.Module = function(e) {
        this.id = e, this.bundle = f, this.exports = {}
    }, f.modules = e, f.cache = r, f.parent = o, f.register = function(r, t) {
        e[r] = [function(e, r) {
            r.exports = t
        }, {}]
    };
    for (var c = 0; c < t.length; c++) try {
        f(t[c])
    } catch (e) {
        i || (i = e)
    }
    if (t.length) {
        var l = f(t[t.length - 1]);
        "object" == typeof exports && "undefined" != typeof module ? module.exports = l : "function" == typeof define && define.amd ? define(function() {
            return l
        }) : n && (this[n] = l)
    }
    if (parcelRequire = f, i) throw i;
    return f
}({
    "iKuJ": [function(require, module, exports) {
        "use strict";
        exports.byteLength = u, exports.toByteArray = i, exports.fromByteArray = d;
        for (var r = [], t = [], e = "undefined" != typeof Uint8Array ? Uint8Array : Array, n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", o = 0, a = n.length; o < a; ++o) r[o] = n[o], t[n.charCodeAt(o)] = o;

        function h(r) {
            var t = r.length;
            if (t % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
            var e = r.indexOf("=");
            return -1 === e && (e = t), [e, e === t ? 0 : 4 - e % 4]
        }

        function u(r) {
            var t = h(r),
                e = t[0],
                n = t[1];
            return 3 * (e + n) / 4 - n
        }

        function c(r, t, e) {
            return 3 * (t + e) / 4 - e
        }

        function i(r) {
            var n, o, a = h(r),
                u = a[0],
                i = a[1],
                f = new e(c(r, u, i)),
                A = 0,
                d = i > 0 ? u - 4 : u;
            for (o = 0; o < d; o += 4) n = t[r.charCodeAt(o)] << 18 | t[r.charCodeAt(o + 1)] << 12 | t[r.charCodeAt(o + 2)] << 6 | t[r.charCodeAt(o + 3)], f[A++] = n >> 16 & 255, f[A++] = n >> 8 & 255, f[A++] = 255 & n;
            return 2 === i && (n = t[r.charCodeAt(o)] << 2 | t[r.charCodeAt(o + 1)] >> 4, f[A++] = 255 & n), 1 === i && (n = t[r.charCodeAt(o)] << 10 | t[r.charCodeAt(o + 1)] << 4 | t[r.charCodeAt(o + 2)] >> 2, f[A++] = n >> 8 & 255, f[A++] = 255 & n), f
        }

        function f(t) {
            return r[t >> 18 & 63] + r[t >> 12 & 63] + r[t >> 6 & 63] + r[63 & t]
        }

        function A(r, t, e) {
            for (var n, o = [], a = t; a < e; a += 3) n = (r[a] << 16 & 16711680) + (r[a + 1] << 8 & 65280) + (255 & r[a + 2]), o.push(f(n));
            return o.join("")
        }

        function d(t) {
            for (var e, n = t.length, o = n % 3, a = [], h = 0, u = n - o; h < u; h += 16383) a.push(A(t, h, h + 16383 > u ? u : h + 16383));
            return 1 === o ? (e = t[n - 1], a.push(r[e >> 2] + r[e << 4 & 63] + "==")) : 2 === o && (e = (t[n - 2] << 8) + t[n - 1], a.push(r[e >> 10] + r[e >> 4 & 63] + r[e << 2 & 63] + "=")), a.join("")
        }
        t["-".charCodeAt(0)] = 62, t["_".charCodeAt(0)] = 63;
    }, {}],
    "LqlQ": [function(require, module, exports) {
        exports.read = function(a, o, t, r, h) {
            var M, p, w = 8 * h - r - 1,
                f = (1 << w) - 1,
                e = f >> 1,
                i = -7,
                N = t ? h - 1 : 0,
                n = t ? -1 : 1,
                s = a[o + N];
            for (N += n, M = s & (1 << -i) - 1, s >>= -i, i += w; i > 0; M = 256 * M + a[o + N], N += n, i -= 8);
            for (p = M & (1 << -i) - 1, M >>= -i, i += r; i > 0; p = 256 * p + a[o + N], N += n, i -= 8);
            if (0 === M) M = 1 - e;
            else {
                if (M === f) return p ? NaN : 1 / 0 * (s ? -1 : 1);
                p += Math.pow(2, r), M -= e
            }
            return (s ? -1 : 1) * p * Math.pow(2, M - r)
        }, exports.write = function(a, o, t, r, h, M) {
            var p, w, f, e = 8 * M - h - 1,
                i = (1 << e) - 1,
                N = i >> 1,
                n = 23 === h ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                s = r ? 0 : M - 1,
                u = r ? 1 : -1,
                l = o < 0 || 0 === o && 1 / o < 0 ? 1 : 0;
            for (o = Math.abs(o), isNaN(o) || o === 1 / 0 ? (w = isNaN(o) ? 1 : 0, p = i) : (p = Math.floor(Math.log(o) / Math.LN2), o * (f = Math.pow(2, -p)) < 1 && (p--, f *= 2), (o += p + N >= 1 ? n / f : n * Math.pow(2, 1 - N)) * f >= 2 && (p++, f /= 2), p + N >= i ? (w = 0, p = i) : p + N >= 1 ? (w = (o * f - 1) * Math.pow(2, h), p += N) : (w = o * Math.pow(2, N - 1) * Math.pow(2, h), p = 0)); h >= 8; a[t + s] = 255 & w, s += u, w /= 256, h -= 8);
            for (p = p << h | w, e += h; e > 0; a[t + s] = 255 & p, s += u, p /= 256, e -= 8);
            a[t + s - u] |= 128 * l
        };
    }, {}],
    "hNJ8": [function(require, module, exports) {
        var r = {}.toString;
        module.exports = Array.isArray || function(t) {
            return "[object Array]" == r.call(t)
        };
    }, {}],
    "ARb5": [function(require, module, exports) {

        var global = arguments[3];
        var t = arguments[3],
            r = require("base64-js"),
            e = require("ieee754"),
            n = require("isarray");

        function i() {
            try {
                var t = new Uint8Array(1);
                return t.__proto__ = {
                    __proto__: Uint8Array.prototype,
                    foo: function() {
                        return 42
                    }
                }, 42 === t.foo() && "function" == typeof t.subarray && 0 === t.subarray(1, 1).byteLength
            } catch (r) {
                return !1
            }
        }

        function o() {
            return f.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
        }

        function u(t, r) {
            if (o() < r) throw new RangeError("Invalid typed array length");
            return f.TYPED_ARRAY_SUPPORT ? (t = new Uint8Array(r)).__proto__ = f.prototype : (null === t && (t = new f(r)), t.length = r), t
        }

        function f(t, r, e) {
            if (!(f.TYPED_ARRAY_SUPPORT || this instanceof f)) return new f(t, r, e);
            if ("number" == typeof t) {
                if ("string" == typeof r) throw new Error("If encoding is specified then the first argument must be a string");
                return c(this, t)
            }
            return s(this, t, r, e)
        }

        function s(t, r, e, n) {
            if ("number" == typeof r) throw new TypeError('"value" argument must not be a number');
            return "undefined" != typeof ArrayBuffer && r instanceof ArrayBuffer ? g(t, r, e, n) : "string" == typeof r ? l(t, r, e) : y(t, r)
        }

        function h(t) {
            if ("number" != typeof t) throw new TypeError('"size" argument must be a number');
            if (t < 0) throw new RangeError('"size" argument must not be negative')
        }

        function a(t, r, e, n) {
            return h(r), r <= 0 ? u(t, r) : void 0 !== e ? "string" == typeof n ? u(t, r).fill(e, n) : u(t, r).fill(e) : u(t, r)
        }

        function c(t, r) {
            if (h(r), t = u(t, r < 0 ? 0 : 0 | w(r)), !f.TYPED_ARRAY_SUPPORT)
                for (var e = 0; e < r; ++e) t[e] = 0;
            return t
        }

        function l(t, r, e) {
            if ("string" == typeof e && "" !== e || (e = "utf8"), !f.isEncoding(e)) throw new TypeError('"encoding" must be a valid string encoding');
            var n = 0 | v(r, e),
                i = (t = u(t, n)).write(r, e);
            return i !== n && (t = t.slice(0, i)), t
        }

        function p(t, r) {
            var e = r.length < 0 ? 0 : 0 | w(r.length);
            t = u(t, e);
            for (var n = 0; n < e; n += 1) t[n] = 255 & r[n];
            return t
        }

        function g(t, r, e, n) {
            if (r.byteLength, e < 0 || r.byteLength < e) throw new RangeError("'offset' is out of bounds");
            if (r.byteLength < e + (n || 0)) throw new RangeError("'length' is out of bounds");
            return r = void 0 === e && void 0 === n ? new Uint8Array(r) : void 0 === n ? new Uint8Array(r, e) : new Uint8Array(r, e, n), f.TYPED_ARRAY_SUPPORT ? (t = r).__proto__ = f.prototype : t = p(t, r), t
        }

        function y(t, r) {
            if (f.isBuffer(r)) {
                var e = 0 | w(r.length);
                return 0 === (t = u(t, e)).length ? t : (r.copy(t, 0, 0, e), t)
            }
            if (r) {
                if ("undefined" != typeof ArrayBuffer && r.buffer instanceof ArrayBuffer || "length" in r) return "number" != typeof r.length || W(r.length) ? u(t, 0) : p(t, r);
                if ("Buffer" === r.type && n(r.data)) return p(t, r.data)
            }
            throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
        }

        function w(t) {
            if (t >= o()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + o().toString(16) + " bytes");
            return 0 | t
        }

        function d(t) {
            return +t != t && (t = 0), f.alloc(+t)
        }

        function v(t, r) {
            if (f.isBuffer(t)) return t.length;
            if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)) return t.byteLength;
            "string" != typeof t && (t = "" + t);
            var e = t.length;
            if (0 === e) return 0;
            for (var n = !1;;) switch (r) {
                case "ascii":
                case "latin1":
                case "binary":
                    return e;
                case "utf8":
                case "utf-8":
                case void 0:
                    return $(t).length;
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return 2 * e;
                case "hex":
                    return e >>> 1;
                case "base64":
                    return K(t).length;
                default:
                    if (n) return $(t).length;
                    r = ("" + r).toLowerCase(), n = !0
            }
        }

        function E(t, r, e) {
            var n = !1;
            if ((void 0 === r || r < 0) && (r = 0), r > this.length) return "";
            if ((void 0 === e || e > this.length) && (e = this.length), e <= 0) return "";
            if ((e >>>= 0) <= (r >>>= 0)) return "";
            for (t || (t = "utf8");;) switch (t) {
                case "hex":
                    return x(this, r, e);
                case "utf8":
                case "utf-8":
                    return Y(this, r, e);
                case "ascii":
                    return L(this, r, e);
                case "latin1":
                case "binary":
                    return D(this, r, e);
                case "base64":
                    return S(this, r, e);
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return C(this, r, e);
                default:
                    if (n) throw new TypeError("Unknown encoding: " + t);
                    t = (t + "").toLowerCase(), n = !0
            }
        }

        function b(t, r, e) {
            var n = t[r];
            t[r] = t[e], t[e] = n
        }

        function R(t, r, e, n, i) {
            if (0 === t.length) return -1;
            if ("string" == typeof e ? (n = e, e = 0) : e > 2147483647 ? e = 2147483647 : e < -2147483648 && (e = -2147483648), e = +e, isNaN(e) && (e = i ? 0 : t.length - 1), e < 0 && (e = t.length + e), e >= t.length) {
                if (i) return -1;
                e = t.length - 1
            } else if (e < 0) {
                if (!i) return -1;
                e = 0
            }
            if ("string" == typeof r && (r = f.from(r, n)), f.isBuffer(r)) return 0 === r.length ? -1 : _(t, r, e, n, i);
            if ("number" == typeof r) return r &= 255, f.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? i ? Uint8Array.prototype.indexOf.call(t, r, e) : Uint8Array.prototype.lastIndexOf.call(t, r, e) : _(t, [r], e, n, i);
            throw new TypeError("val must be string, number or Buffer")
        }

        function _(t, r, e, n, i) {
            var o, u = 1,
                f = t.length,
                s = r.length;
            if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
                if (t.length < 2 || r.length < 2) return -1;
                u = 2, f /= 2, s /= 2, e /= 2
            }

            function h(t, r) {
                return 1 === u ? t[r] : t.readUInt16BE(r * u)
            }
            if (i) {
                var a = -1;
                for (o = e; o < f; o++)
                    if (h(t, o) === h(r, -1 === a ? 0 : o - a)) {
                        if (-1 === a && (a = o), o - a + 1 === s) return a * u
                    } else -1 !== a && (o -= o - a), a = -1
            } else
                for (e + s > f && (e = f - s), o = e; o >= 0; o--) {
                    for (var c = !0, l = 0; l < s; l++)
                        if (h(t, o + l) !== h(r, l)) {
                            c = !1;
                            break
                        } if (c) return o
                }
            return -1
        }

        function A(t, r, e, n) {
            e = Number(e) || 0;
            var i = t.length - e;
            n ? (n = Number(n)) > i && (n = i) : n = i;
            var o = r.length;
            if (o % 2 != 0) throw new TypeError("Invalid hex string");
            n > o / 2 && (n = o / 2);
            for (var u = 0; u < n; ++u) {
                var f = parseInt(r.substr(2 * u, 2), 16);
                if (isNaN(f)) return u;
                t[e + u] = f
            }
            return u
        }

        function m(t, r, e, n) {
            return Q($(r, t.length - e), t, e, n)
        }

        function P(t, r, e, n) {
            return Q(G(r), t, e, n)
        }

        function T(t, r, e, n) {
            return P(t, r, e, n)
        }

        function B(t, r, e, n) {
            return Q(K(r), t, e, n)
        }

        function U(t, r, e, n) {
            return Q(H(r, t.length - e), t, e, n)
        }

        function S(t, e, n) {
            return 0 === e && n === t.length ? r.fromByteArray(t) : r.fromByteArray(t.slice(e, n))
        }

        function Y(t, r, e) {
            e = Math.min(t.length, e);
            for (var n = [], i = r; i < e;) {
                var o, u, f, s, h = t[i],
                    a = null,
                    c = h > 239 ? 4 : h > 223 ? 3 : h > 191 ? 2 : 1;
                if (i + c <= e) switch (c) {
                    case 1:
                        h < 128 && (a = h);
                        break;
                    case 2:
                        128 == (192 & (o = t[i + 1])) && (s = (31 & h) << 6 | 63 & o) > 127 && (a = s);
                        break;
                    case 3:
                        o = t[i + 1], u = t[i + 2], 128 == (192 & o) && 128 == (192 & u) && (s = (15 & h) << 12 | (63 & o) << 6 | 63 & u) > 2047 && (s < 55296 || s > 57343) && (a = s);
                        break;
                    case 4:
                        o = t[i + 1], u = t[i + 2], f = t[i + 3], 128 == (192 & o) && 128 == (192 & u) && 128 == (192 & f) && (s = (15 & h) << 18 | (63 & o) << 12 | (63 & u) << 6 | 63 & f) > 65535 && s < 1114112 && (a = s)
                }
                null === a ? (a = 65533, c = 1) : a > 65535 && (a -= 65536, n.push(a >>> 10 & 1023 | 55296), a = 56320 | 1023 & a), n.push(a), i += c
            }
            return O(n)
        }
        exports.Buffer = f, exports.SlowBuffer = d, exports.INSPECT_MAX_BYTES = 50, f.TYPED_ARRAY_SUPPORT = void 0 !== t.TYPED_ARRAY_SUPPORT ? t.TYPED_ARRAY_SUPPORT : i(), exports.kMaxLength = o(), f.poolSize = 8192, f._augment = function(t) {
            return t.__proto__ = f.prototype, t
        }, f.from = function(t, r, e) {
            return s(null, t, r, e)
        }, f.TYPED_ARRAY_SUPPORT && (f.prototype.__proto__ = Uint8Array.prototype, f.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && f[Symbol.species] === f && Object.defineProperty(f, Symbol.species, {
            value: null,
            configurable: !0
        })), f.alloc = function(t, r, e) {
            return a(null, t, r, e)
        }, f.allocUnsafe = function(t) {
            return c(null, t)
        }, f.allocUnsafeSlow = function(t) {
            return c(null, t)
        }, f.isBuffer = function(t) {
            return !(null == t || !t._isBuffer)
        }, f.compare = function(t, r) {
            if (!f.isBuffer(t) || !f.isBuffer(r)) throw new TypeError("Arguments must be Buffers");
            if (t === r) return 0;
            for (var e = t.length, n = r.length, i = 0, o = Math.min(e, n); i < o; ++i)
                if (t[i] !== r[i]) {
                    e = t[i], n = r[i];
                    break
                } return e < n ? -1 : n < e ? 1 : 0
        }, f.isEncoding = function(t) {
            switch (String(t).toLowerCase()) {
                case "hex":
                case "utf8":
                case "utf-8":
                case "ascii":
                case "latin1":
                case "binary":
                case "base64":
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return !0;
                default:
                    return !1
            }
        }, f.concat = function(t, r) {
            if (!n(t)) throw new TypeError('"list" argument must be an Array of Buffers');
            if (0 === t.length) return f.alloc(0);
            var e;
            if (void 0 === r)
                for (r = 0, e = 0; e < t.length; ++e) r += t[e].length;
            var i = f.allocUnsafe(r),
                o = 0;
            for (e = 0; e < t.length; ++e) {
                var u = t[e];
                if (!f.isBuffer(u)) throw new TypeError('"list" argument must be an Array of Buffers');
                u.copy(i, o), o += u.length
            }
            return i
        }, f.byteLength = v, f.prototype._isBuffer = !0, f.prototype.swap16 = function() {
            var t = this.length;
            if (t % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
            for (var r = 0; r < t; r += 2) b(this, r, r + 1);
            return this
        }, f.prototype.swap32 = function() {
            var t = this.length;
            if (t % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
            for (var r = 0; r < t; r += 4) b(this, r, r + 3), b(this, r + 1, r + 2);
            return this
        }, f.prototype.swap64 = function() {
            var t = this.length;
            if (t % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
            for (var r = 0; r < t; r += 8) b(this, r, r + 7), b(this, r + 1, r + 6), b(this, r + 2, r + 5), b(this, r + 3, r + 4);
            return this
        }, f.prototype.toString = function() {
            var t = 0 | this.length;
            return 0 === t ? "" : 0 === arguments.length ? Y(this, 0, t) : E.apply(this, arguments)
        }, f.prototype.equals = function(t) {
            if (!f.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
            return this === t || 0 === f.compare(this, t)
        }, f.prototype.inspect = function() {
            var t = "",
                r = exports.INSPECT_MAX_BYTES;
            return this.length > 0 && (t = this.toString("hex", 0, r).match(/.{2}/g).join(" "), this.length > r && (t += " ... ")), "<Buffer " + t + ">"
        }, f.prototype.compare = function(t, r, e, n, i) {
            if (!f.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
            if (void 0 === r && (r = 0), void 0 === e && (e = t ? t.length : 0), void 0 === n && (n = 0), void 0 === i && (i = this.length), r < 0 || e > t.length || n < 0 || i > this.length) throw new RangeError("out of range index");
            if (n >= i && r >= e) return 0;
            if (n >= i) return -1;
            if (r >= e) return 1;
            if (this === t) return 0;
            for (var o = (i >>>= 0) - (n >>>= 0), u = (e >>>= 0) - (r >>>= 0), s = Math.min(o, u), h = this.slice(n, i), a = t.slice(r, e), c = 0; c < s; ++c)
                if (h[c] !== a[c]) {
                    o = h[c], u = a[c];
                    break
                } return o < u ? -1 : u < o ? 1 : 0
        }, f.prototype.includes = function(t, r, e) {
            return -1 !== this.indexOf(t, r, e)
        }, f.prototype.indexOf = function(t, r, e) {
            return R(this, t, r, e, !0)
        }, f.prototype.lastIndexOf = function(t, r, e) {
            return R(this, t, r, e, !1)
        }, f.prototype.write = function(t, r, e, n) {
            if (void 0 === r) n = "utf8", e = this.length, r = 0;
            else if (void 0 === e && "string" == typeof r) n = r, e = this.length, r = 0;
            else {
                if (!isFinite(r)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                r |= 0, isFinite(e) ? (e |= 0, void 0 === n && (n = "utf8")) : (n = e, e = void 0)
            }
            var i = this.length - r;
            if ((void 0 === e || e > i) && (e = i), t.length > 0 && (e < 0 || r < 0) || r > this.length) throw new RangeError("Attempt to write outside buffer bounds");
            n || (n = "utf8");
            for (var o = !1;;) switch (n) {
                case "hex":
                    return A(this, t, r, e);
                case "utf8":
                case "utf-8":
                    return m(this, t, r, e);
                case "ascii":
                    return P(this, t, r, e);
                case "latin1":
                case "binary":
                    return T(this, t, r, e);
                case "base64":
                    return B(this, t, r, e);
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return U(this, t, r, e);
                default:
                    if (o) throw new TypeError("Unknown encoding: " + n);
                    n = ("" + n).toLowerCase(), o = !0
            }
        }, f.prototype.toJSON = function() {
            return {
                type: "Buffer",
                data: Array.prototype.slice.call(this._arr || this, 0)
            }
        };
        var I = 4096;

        function O(t) {
            var r = t.length;
            if (r <= I) return String.fromCharCode.apply(String, t);
            for (var e = "", n = 0; n < r;) e += String.fromCharCode.apply(String, t.slice(n, n += I));
            return e
        }

        function L(t, r, e) {
            var n = "";
            e = Math.min(t.length, e);
            for (var i = r; i < e; ++i) n += String.fromCharCode(127 & t[i]);
            return n
        }

        function D(t, r, e) {
            var n = "";
            e = Math.min(t.length, e);
            for (var i = r; i < e; ++i) n += String.fromCharCode(t[i]);
            return n
        }

        function x(t, r, e) {
            var n = t.length;
            (!r || r < 0) && (r = 0), (!e || e < 0 || e > n) && (e = n);
            for (var i = "", o = r; o < e; ++o) i += Z(t[o]);
            return i
        }

        function C(t, r, e) {
            for (var n = t.slice(r, e), i = "", o = 0; o < n.length; o += 2) i += String.fromCharCode(n[o] + 256 * n[o + 1]);
            return i
        }

        function M(t, r, e) {
            if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
            if (t + r > e) throw new RangeError("Trying to access beyond buffer length")
        }

        function k(t, r, e, n, i, o) {
            if (!f.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
            if (r > i || r < o) throw new RangeError('"value" argument is out of bounds');
            if (e + n > t.length) throw new RangeError("Index out of range")
        }

        function N(t, r, e, n) {
            r < 0 && (r = 65535 + r + 1);
            for (var i = 0, o = Math.min(t.length - e, 2); i < o; ++i) t[e + i] = (r & 255 << 8 * (n ? i : 1 - i)) >>> 8 * (n ? i : 1 - i)
        }

        function z(t, r, e, n) {
            r < 0 && (r = 4294967295 + r + 1);
            for (var i = 0, o = Math.min(t.length - e, 4); i < o; ++i) t[e + i] = r >>> 8 * (n ? i : 3 - i) & 255
        }

        function F(t, r, e, n, i, o) {
            if (e + n > t.length) throw new RangeError("Index out of range");
            if (e < 0) throw new RangeError("Index out of range")
        }

        function j(t, r, n, i, o) {
            return o || F(t, r, n, 4, 3.4028234663852886e38, -3.4028234663852886e38), e.write(t, r, n, i, 23, 4), n + 4
        }

        function q(t, r, n, i, o) {
            return o || F(t, r, n, 8, 1.7976931348623157e308, -1.7976931348623157e308), e.write(t, r, n, i, 52, 8), n + 8
        }
        f.prototype.slice = function(t, r) {
            var e, n = this.length;
            if ((t = ~~t) < 0 ? (t += n) < 0 && (t = 0) : t > n && (t = n), (r = void 0 === r ? n : ~~r) < 0 ? (r += n) < 0 && (r = 0) : r > n && (r = n), r < t && (r = t), f.TYPED_ARRAY_SUPPORT)(e = this.subarray(t, r)).__proto__ = f.prototype;
            else {
                var i = r - t;
                e = new f(i, void 0);
                for (var o = 0; o < i; ++o) e[o] = this[o + t]
            }
            return e
        }, f.prototype.readUIntLE = function(t, r, e) {
            t |= 0, r |= 0, e || M(t, r, this.length);
            for (var n = this[t], i = 1, o = 0; ++o < r && (i *= 256);) n += this[t + o] * i;
            return n
        }, f.prototype.readUIntBE = function(t, r, e) {
            t |= 0, r |= 0, e || M(t, r, this.length);
            for (var n = this[t + --r], i = 1; r > 0 && (i *= 256);) n += this[t + --r] * i;
            return n
        }, f.prototype.readUInt8 = function(t, r) {
            return r || M(t, 1, this.length), this[t]
        }, f.prototype.readUInt16LE = function(t, r) {
            return r || M(t, 2, this.length), this[t] | this[t + 1] << 8
        }, f.prototype.readUInt16BE = function(t, r) {
            return r || M(t, 2, this.length), this[t] << 8 | this[t + 1]
        }, f.prototype.readUInt32LE = function(t, r) {
            return r || M(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3]
        }, f.prototype.readUInt32BE = function(t, r) {
            return r || M(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
        }, f.prototype.readIntLE = function(t, r, e) {
            t |= 0, r |= 0, e || M(t, r, this.length);
            for (var n = this[t], i = 1, o = 0; ++o < r && (i *= 256);) n += this[t + o] * i;
            return n >= (i *= 128) && (n -= Math.pow(2, 8 * r)), n
        }, f.prototype.readIntBE = function(t, r, e) {
            t |= 0, r |= 0, e || M(t, r, this.length);
            for (var n = r, i = 1, o = this[t + --n]; n > 0 && (i *= 256);) o += this[t + --n] * i;
            return o >= (i *= 128) && (o -= Math.pow(2, 8 * r)), o
        }, f.prototype.readInt8 = function(t, r) {
            return r || M(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
        }, f.prototype.readInt16LE = function(t, r) {
            r || M(t, 2, this.length);
            var e = this[t] | this[t + 1] << 8;
            return 32768 & e ? 4294901760 | e : e
        }, f.prototype.readInt16BE = function(t, r) {
            r || M(t, 2, this.length);
            var e = this[t + 1] | this[t] << 8;
            return 32768 & e ? 4294901760 | e : e
        }, f.prototype.readInt32LE = function(t, r) {
            return r || M(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
        }, f.prototype.readInt32BE = function(t, r) {
            return r || M(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
        }, f.prototype.readFloatLE = function(t, r) {
            return r || M(t, 4, this.length), e.read(this, t, !0, 23, 4)
        }, f.prototype.readFloatBE = function(t, r) {
            return r || M(t, 4, this.length), e.read(this, t, !1, 23, 4)
        }, f.prototype.readDoubleLE = function(t, r) {
            return r || M(t, 8, this.length), e.read(this, t, !0, 52, 8)
        }, f.prototype.readDoubleBE = function(t, r) {
            return r || M(t, 8, this.length), e.read(this, t, !1, 52, 8)
        }, f.prototype.writeUIntLE = function(t, r, e, n) {
            (t = +t, r |= 0, e |= 0, n) || k(this, t, r, e, Math.pow(2, 8 * e) - 1, 0);
            var i = 1,
                o = 0;
            for (this[r] = 255 & t; ++o < e && (i *= 256);) this[r + o] = t / i & 255;
            return r + e
        }, f.prototype.writeUIntBE = function(t, r, e, n) {
            (t = +t, r |= 0, e |= 0, n) || k(this, t, r, e, Math.pow(2, 8 * e) - 1, 0);
            var i = e - 1,
                o = 1;
            for (this[r + i] = 255 & t; --i >= 0 && (o *= 256);) this[r + i] = t / o & 255;
            return r + e
        }, f.prototype.writeUInt8 = function(t, r, e) {
            return t = +t, r |= 0, e || k(this, t, r, 1, 255, 0), f.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), this[r] = 255 & t, r + 1
        }, f.prototype.writeUInt16LE = function(t, r, e) {
            return t = +t, r |= 0, e || k(this, t, r, 2, 65535, 0), f.TYPED_ARRAY_SUPPORT ? (this[r] = 255 & t, this[r + 1] = t >>> 8) : N(this, t, r, !0), r + 2
        }, f.prototype.writeUInt16BE = function(t, r, e) {
            return t = +t, r |= 0, e || k(this, t, r, 2, 65535, 0), f.TYPED_ARRAY_SUPPORT ? (this[r] = t >>> 8, this[r + 1] = 255 & t) : N(this, t, r, !1), r + 2
        }, f.prototype.writeUInt32LE = function(t, r, e) {
            return t = +t, r |= 0, e || k(this, t, r, 4, 4294967295, 0), f.TYPED_ARRAY_SUPPORT ? (this[r + 3] = t >>> 24, this[r + 2] = t >>> 16, this[r + 1] = t >>> 8, this[r] = 255 & t) : z(this, t, r, !0), r + 4
        }, f.prototype.writeUInt32BE = function(t, r, e) {
            return t = +t, r |= 0, e || k(this, t, r, 4, 4294967295, 0), f.TYPED_ARRAY_SUPPORT ? (this[r] = t >>> 24, this[r + 1] = t >>> 16, this[r + 2] = t >>> 8, this[r + 3] = 255 & t) : z(this, t, r, !1), r + 4
        }, f.prototype.writeIntLE = function(t, r, e, n) {
            if (t = +t, r |= 0, !n) {
                var i = Math.pow(2, 8 * e - 1);
                k(this, t, r, e, i - 1, -i)
            }
            var o = 0,
                u = 1,
                f = 0;
            for (this[r] = 255 & t; ++o < e && (u *= 256);) t < 0 && 0 === f && 0 !== this[r + o - 1] && (f = 1), this[r + o] = (t / u >> 0) - f & 255;
            return r + e
        }, f.prototype.writeIntBE = function(t, r, e, n) {
            if (t = +t, r |= 0, !n) {
                var i = Math.pow(2, 8 * e - 1);
                k(this, t, r, e, i - 1, -i)
            }
            var o = e - 1,
                u = 1,
                f = 0;
            for (this[r + o] = 255 & t; --o >= 0 && (u *= 256);) t < 0 && 0 === f && 0 !== this[r + o + 1] && (f = 1), this[r + o] = (t / u >> 0) - f & 255;
            return r + e
        }, f.prototype.writeInt8 = function(t, r, e) {
            return t = +t, r |= 0, e || k(this, t, r, 1, 127, -128), f.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), t < 0 && (t = 255 + t + 1), this[r] = 255 & t, r + 1
        }, f.prototype.writeInt16LE = function(t, r, e) {
            return t = +t, r |= 0, e || k(this, t, r, 2, 32767, -32768), f.TYPED_ARRAY_SUPPORT ? (this[r] = 255 & t, this[r + 1] = t >>> 8) : N(this, t, r, !0), r + 2
        }, f.prototype.writeInt16BE = function(t, r, e) {
            return t = +t, r |= 0, e || k(this, t, r, 2, 32767, -32768), f.TYPED_ARRAY_SUPPORT ? (this[r] = t >>> 8, this[r + 1] = 255 & t) : N(this, t, r, !1), r + 2
        }, f.prototype.writeInt32LE = function(t, r, e) {
            return t = +t, r |= 0, e || k(this, t, r, 4, 2147483647, -2147483648), f.TYPED_ARRAY_SUPPORT ? (this[r] = 255 & t, this[r + 1] = t >>> 8, this[r + 2] = t >>> 16, this[r + 3] = t >>> 24) : z(this, t, r, !0), r + 4
        }, f.prototype.writeInt32BE = function(t, r, e) {
            return t = +t, r |= 0, e || k(this, t, r, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), f.TYPED_ARRAY_SUPPORT ? (this[r] = t >>> 24, this[r + 1] = t >>> 16, this[r + 2] = t >>> 8, this[r + 3] = 255 & t) : z(this, t, r, !1), r + 4
        }, f.prototype.writeFloatLE = function(t, r, e) {
            return j(this, t, r, !0, e)
        }, f.prototype.writeFloatBE = function(t, r, e) {
            return j(this, t, r, !1, e)
        }, f.prototype.writeDoubleLE = function(t, r, e) {
            return q(this, t, r, !0, e)
        }, f.prototype.writeDoubleBE = function(t, r, e) {
            return q(this, t, r, !1, e)
        }, f.prototype.copy = function(t, r, e, n) {
            if (e || (e = 0), n || 0 === n || (n = this.length), r >= t.length && (r = t.length), r || (r = 0), n > 0 && n < e && (n = e), n === e) return 0;
            if (0 === t.length || 0 === this.length) return 0;
            if (r < 0) throw new RangeError("targetStart out of bounds");
            if (e < 0 || e >= this.length) throw new RangeError("sourceStart out of bounds");
            if (n < 0) throw new RangeError("sourceEnd out of bounds");
            n > this.length && (n = this.length), t.length - r < n - e && (n = t.length - r + e);
            var i, o = n - e;
            if (this === t && e < r && r < n)
                for (i = o - 1; i >= 0; --i) t[i + r] = this[i + e];
            else if (o < 1e3 || !f.TYPED_ARRAY_SUPPORT)
                for (i = 0; i < o; ++i) t[i + r] = this[i + e];
            else Uint8Array.prototype.set.call(t, this.subarray(e, e + o), r);
            return o
        }, f.prototype.fill = function(t, r, e, n) {
            if ("string" == typeof t) {
                if ("string" == typeof r ? (n = r, r = 0, e = this.length) : "string" == typeof e && (n = e, e = this.length), 1 === t.length) {
                    var i = t.charCodeAt(0);
                    i < 256 && (t = i)
                }
                if (void 0 !== n && "string" != typeof n) throw new TypeError("encoding must be a string");
                if ("string" == typeof n && !f.isEncoding(n)) throw new TypeError("Unknown encoding: " + n)
            } else "number" == typeof t && (t &= 255);
            if (r < 0 || this.length < r || this.length < e) throw new RangeError("Out of range index");
            if (e <= r) return this;
            var o;
            if (r >>>= 0, e = void 0 === e ? this.length : e >>> 0, t || (t = 0), "number" == typeof t)
                for (o = r; o < e; ++o) this[o] = t;
            else {
                var u = f.isBuffer(t) ? t : $(new f(t, n).toString()),
                    s = u.length;
                for (o = 0; o < e - r; ++o) this[o + r] = u[o % s]
            }
            return this
        };
        var V = /[^+\/0-9A-Za-z-_]/g;

        function X(t) {
            if ((t = J(t).replace(V, "")).length < 2) return "";
            for (; t.length % 4 != 0;) t += "=";
            return t
        }

        function J(t) {
            return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
        }

        function Z(t) {
            return t < 16 ? "0" + t.toString(16) : t.toString(16)
        }

        function $(t, r) {
            var e;
            r = r || 1 / 0;
            for (var n = t.length, i = null, o = [], u = 0; u < n; ++u) {
                if ((e = t.charCodeAt(u)) > 55295 && e < 57344) {
                    if (!i) {
                        if (e > 56319) {
                            (r -= 3) > -1 && o.push(239, 191, 189);
                            continue
                        }
                        if (u + 1 === n) {
                            (r -= 3) > -1 && o.push(239, 191, 189);
                            continue
                        }
                        i = e;
                        continue
                    }
                    if (e < 56320) {
                        (r -= 3) > -1 && o.push(239, 191, 189), i = e;
                        continue
                    }
                    e = 65536 + (i - 55296 << 10 | e - 56320)
                } else i && (r -= 3) > -1 && o.push(239, 191, 189);
                if (i = null, e < 128) {
                    if ((r -= 1) < 0) break;
                    o.push(e)
                } else if (e < 2048) {
                    if ((r -= 2) < 0) break;
                    o.push(e >> 6 | 192, 63 & e | 128)
                } else if (e < 65536) {
                    if ((r -= 3) < 0) break;
                    o.push(e >> 12 | 224, e >> 6 & 63 | 128, 63 & e | 128)
                } else {
                    if (!(e < 1114112)) throw new Error("Invalid code point");
                    if ((r -= 4) < 0) break;
                    o.push(e >> 18 | 240, e >> 12 & 63 | 128, e >> 6 & 63 | 128, 63 & e | 128)
                }
            }
            return o
        }

        function G(t) {
            for (var r = [], e = 0; e < t.length; ++e) r.push(255 & t.charCodeAt(e));
            return r
        }

        function H(t, r) {
            for (var e, n, i, o = [], u = 0; u < t.length && !((r -= 2) < 0); ++u) n = (e = t.charCodeAt(u)) >> 8, i = e % 256, o.push(i), o.push(n);
            return o
        }

        function K(t) {
            return r.toByteArray(X(t))
        }

        function Q(t, r, e, n) {
            for (var i = 0; i < n && !(i + e >= r.length || i >= t.length); ++i) r[i + e] = t[i];
            return i
        }

        function W(t) {
            return t != t
        }
    }, {
        "base64-js": "iKuJ",
        "ieee754": "LqlQ",
        "isarray": "hNJ8",
        "buffer": "ARb5"
    }],
    "szrx": [function(require, module, exports) {
        var Buffer = require("buffer").Buffer;
        var r = require("buffer").Buffer;
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.scriptToBuffer = exports.keyToBuffer = exports.hashToBuffer = exports.bytesToString = exports.bytesToHex = exports.bytesToBuffer = exports.bytes = exports.bufferToHexString = exports.addressToBuffer = void 0;
        var e = function(e, t) {
                var o = e;
                return "string" == typeof e ? o = r.from(e, "hex") : e instanceof Uint8Array && (o = r.from(e)), void 0 !== t && (o = function(e, t) {
                    var o = r.alloc(t);
                    return e.copy(o, t - e.length, 0, e.length), o
                }(o, t)), o
            },
            t = function(r) {
                return r.toString("utf8")
            },
            o = function(r) {
                return r.toString("hex")
            },
            f = function(e) {
                return r.from(e)
            },
            n = function(r) {
                return f(r)
            },
            u = function(e) {
                return r.from(e, "utf8")
            },
            s = function(e) {
                return r.from(e, "hex")
            },
            i = function(e) {
                return r.from(e, "hex")
            },
            x = function(r) {
                return r.reduce(function(r, e) {
                    return r + ("0" + e.toString(16)).slice(-2)
                }, "")
            };
        exports.bufferToHexString = x, exports.hashToBuffer = i, exports.keyToBuffer = s, exports.scriptToBuffer = u, exports.addressToBuffer = n, exports.bytesToBuffer = f, exports.bytesToHex = o, exports.bytesToString = t, exports.bytes = e;
    }, {
        "buffer": "ARb5"
    }],
    "IO6f": [function(require, module, exports) {
        module.exports = {
            _from: "elliptic@^6.5.2",
            _id: "elliptic@6.5.3",
            _inBundle: !1,
            _integrity: "sha512-IMqzv5wNQf+E6aHeIqATs0tOLeOTwj1QKbRcS3jBbYkl5oLAserA8yJTT7/VyHUYG91PRmPyeQDObKLPpeS4dw==",
            _location: "/elliptic",
            _phantomChildren: {},
            _requested: {
                type: "range",
                registry: !0,
                raw: "elliptic@^6.5.2",
                name: "elliptic",
                escapedName: "elliptic",
                rawSpec: "^6.5.2",
                saveSpec: null,
                fetchSpec: "^6.5.2"
            },
            _requiredBy: ["/@onflow/dev-wallet"],
            _resolved: "https://registry.npmjs.org/elliptic/-/elliptic-6.5.3.tgz",
            _shasum: "cb59eb2efdaf73a0bd78ccd7015a62ad6e0f93d6",
            _spec: "elliptic@^6.5.2",
            _where: "/Users/k/Documents/GitHub/hackathon/s/node_modules/@onflow/dev-wallet",
            author: {
                name: "Fedor Indutny",
                email: "fedor@indutny.com"
            },
            bugs: {
                url: "https://github.com/indutny/elliptic/issues"
            },
            bundleDependencies: !1,
            dependencies: {
                "bn.js": "^4.4.0",
                brorand: "^1.0.1",
                "hash.js": "^1.0.0",
                "hmac-drbg": "^1.0.0",
                inherits: "^2.0.1",
                "minimalistic-assert": "^1.0.0",
                "minimalistic-crypto-utils": "^1.0.0"
            },
            deprecated: !1,
            description: "EC cryptography",
            devDependencies: {
                brfs: "^1.4.3",
                coveralls: "^3.0.8",
                grunt: "^1.0.4",
                "grunt-browserify": "^5.0.0",
                "grunt-cli": "^1.2.0",
                "grunt-contrib-connect": "^1.0.0",
                "grunt-contrib-copy": "^1.0.0",
                "grunt-contrib-uglify": "^1.0.1",
                "grunt-mocha-istanbul": "^3.0.1",
                "grunt-saucelabs": "^9.0.1",
                istanbul: "^0.4.2",
                jscs: "^3.0.7",
                jshint: "^2.10.3",
                mocha: "^6.2.2"
            },
            files: ["lib"],
            homepage: "https://github.com/indutny/elliptic",
            keywords: ["EC", "Elliptic", "curve", "Cryptography"],
            license: "MIT",
            main: "lib/elliptic.js",
            name: "elliptic",
            repository: {
                type: "git",
                url: "git+ssh://git@github.com/indutny/elliptic.git"
            },
            scripts: {
                jscs: "jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/index.js",
                jshint: "jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/index.js",
                lint: "npm run jscs && npm run jshint",
                test: "npm run lint && npm run unit",
                unit: "istanbul test _mocha --reporter=spec test/index.js",
                version: "grunt dist && git add dist/"
            },
            version: "6.5.3"
        };
    }, {}],
    "jtu4": [function(require, module, exports) {

    }, {}],
    "VOEF": [function(require, module, exports) {
        var Buffer = require("buffer").Buffer;
        var t = require("buffer").Buffer;
        ! function(t, i) {
            "use strict";

            function r(t, i) {
                if (!t) throw new Error(i || "Assertion failed")
            }

            function h(t, i) {
                t.super_ = i;
                var r = function() {};
                r.prototype = i.prototype, t.prototype = new r, t.prototype.constructor = t
            }

            function n(t, i, r) {
                if (n.isBN(t)) return t;
                this.negative = 0, this.words = null, this.length = 0, this.red = null, null !== t && ("le" !== i && "be" !== i || (r = i, i = 10), this._init(t || 0, i || 10, r || "be"))
            }
            var e;
            "object" == typeof t ? t.exports = n : i.BN = n, n.BN = n, n.wordSize = 26;
            try {
                e = require("buffer").Buffer
            } catch (k) {}

            function o(t, i, r) {
                for (var h = 0, n = Math.min(t.length, r), e = i; e < n; e++) {
                    var o = t.charCodeAt(e) - 48;
                    h <<= 4, h |= o >= 49 && o <= 54 ? o - 49 + 10 : o >= 17 && o <= 22 ? o - 17 + 10 : 15 & o
                }
                return h
            }

            function s(t, i, r, h) {
                for (var n = 0, e = Math.min(t.length, r), o = i; o < e; o++) {
                    var s = t.charCodeAt(o) - 48;
                    n *= h, n += s >= 49 ? s - 49 + 10 : s >= 17 ? s - 17 + 10 : s
                }
                return n
            }
            n.isBN = function(t) {
                return t instanceof n || null !== t && "object" == typeof t && t.constructor.wordSize === n.wordSize && Array.isArray(t.words)
            }, n.max = function(t, i) {
                return t.cmp(i) > 0 ? t : i
            }, n.min = function(t, i) {
                return t.cmp(i) < 0 ? t : i
            }, n.prototype._init = function(t, i, h) {
                if ("number" == typeof t) return this._initNumber(t, i, h);
                if ("object" == typeof t) return this._initArray(t, i, h);
                "hex" === i && (i = 16), r(i === (0 | i) && i >= 2 && i <= 36);
                var n = 0;
                "-" === (t = t.toString().replace(/\s+/g, ""))[0] && n++, 16 === i ? this._parseHex(t, n) : this._parseBase(t, i, n), "-" === t[0] && (this.negative = 1), this.strip(), "le" === h && this._initArray(this.toArray(), i, h)
            }, n.prototype._initNumber = function(t, i, h) {
                t < 0 && (this.negative = 1, t = -t), t < 67108864 ? (this.words = [67108863 & t], this.length = 1) : t < 4503599627370496 ? (this.words = [67108863 & t, t / 67108864 & 67108863], this.length = 2) : (r(t < 9007199254740992), this.words = [67108863 & t, t / 67108864 & 67108863, 1], this.length = 3), "le" === h && this._initArray(this.toArray(), i, h)
            }, n.prototype._initArray = function(t, i, h) {
                if (r("number" == typeof t.length), t.length <= 0) return this.words = [0], this.length = 1, this;
                this.length = Math.ceil(t.length / 3), this.words = new Array(this.length);
                for (var n = 0; n < this.length; n++) this.words[n] = 0;
                var e, o, s = 0;
                if ("be" === h)
                    for (n = t.length - 1, e = 0; n >= 0; n -= 3) o = t[n] | t[n - 1] << 8 | t[n - 2] << 16, this.words[e] |= o << s & 67108863, this.words[e + 1] = o >>> 26 - s & 67108863, (s += 24) >= 26 && (s -= 26, e++);
                else if ("le" === h)
                    for (n = 0, e = 0; n < t.length; n += 3) o = t[n] | t[n + 1] << 8 | t[n + 2] << 16, this.words[e] |= o << s & 67108863, this.words[e + 1] = o >>> 26 - s & 67108863, (s += 24) >= 26 && (s -= 26, e++);
                return this.strip()
            }, n.prototype._parseHex = function(t, i) {
                this.length = Math.ceil((t.length - i) / 6), this.words = new Array(this.length);
                for (var r = 0; r < this.length; r++) this.words[r] = 0;
                var h, n, e = 0;
                for (r = t.length - 6, h = 0; r >= i; r -= 6) n = o(t, r, r + 6), this.words[h] |= n << e & 67108863, this.words[h + 1] |= n >>> 26 - e & 4194303, (e += 24) >= 26 && (e -= 26, h++);
                r + 6 !== i && (n = o(t, i, r + 6), this.words[h] |= n << e & 67108863, this.words[h + 1] |= n >>> 26 - e & 4194303), this.strip()
            }, n.prototype._parseBase = function(t, i, r) {
                this.words = [0], this.length = 1;
                for (var h = 0, n = 1; n <= 67108863; n *= i) h++;
                h--, n = n / i | 0;
                for (var e = t.length - r, o = e % h, u = Math.min(e, e - o) + r, a = 0, l = r; l < u; l += h) a = s(t, l, l + h, i), this.imuln(n), this.words[0] + a < 67108864 ? this.words[0] += a : this._iaddn(a);
                if (0 !== o) {
                    var m = 1;
                    for (a = s(t, l, t.length, i), l = 0; l < o; l++) m *= i;
                    this.imuln(m), this.words[0] + a < 67108864 ? this.words[0] += a : this._iaddn(a)
                }
            }, n.prototype.copy = function(t) {
                t.words = new Array(this.length);
                for (var i = 0; i < this.length; i++) t.words[i] = this.words[i];
                t.length = this.length, t.negative = this.negative, t.red = this.red
            }, n.prototype.clone = function() {
                var t = new n(null);
                return this.copy(t), t
            }, n.prototype._expand = function(t) {
                for (; this.length < t;) this.words[this.length++] = 0;
                return this
            }, n.prototype.strip = function() {
                for (; this.length > 1 && 0 === this.words[this.length - 1];) this.length--;
                return this._normSign()
            }, n.prototype._normSign = function() {
                return 1 === this.length && 0 === this.words[0] && (this.negative = 0), this
            }, n.prototype.inspect = function() {
                return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">"
            };
            var u = ["", "0", "00", "000", "0000", "00000", "000000", "0000000", "00000000", "000000000", "0000000000", "00000000000", "000000000000", "0000000000000", "00000000000000", "000000000000000", "0000000000000000", "00000000000000000", "000000000000000000", "0000000000000000000", "00000000000000000000", "000000000000000000000", "0000000000000000000000", "00000000000000000000000", "000000000000000000000000", "0000000000000000000000000"],
                a = [0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
                l = [0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536, 11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101, 5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176];

            function m(t, i, r) {
                r.negative = i.negative ^ t.negative;
                var h = t.length + i.length | 0;
                r.length = h, h = h - 1 | 0;
                var n = 0 | t.words[0],
                    e = 0 | i.words[0],
                    o = n * e,
                    s = 67108863 & o,
                    u = o / 67108864 | 0;
                r.words[0] = s;
                for (var a = 1; a < h; a++) {
                    for (var l = u >>> 26, m = 67108863 & u, f = Math.min(a, i.length - 1), d = Math.max(0, a - t.length + 1); d <= f; d++) {
                        var p = a - d | 0;
                        l += (o = (n = 0 | t.words[p]) * (e = 0 | i.words[d]) + m) / 67108864 | 0, m = 67108863 & o
                    }
                    r.words[a] = 0 | m, u = 0 | l
                }
                return 0 !== u ? r.words[a] = 0 | u : r.length--, r.strip()
            }
            n.prototype.toString = function(t, i) {
                var h;
                if (i = 0 | i || 1, 16 === (t = t || 10) || "hex" === t) {
                    h = "";
                    for (var n = 0, e = 0, o = 0; o < this.length; o++) {
                        var s = this.words[o],
                            m = (16777215 & (s << n | e)).toString(16);
                        h = 0 !== (e = s >>> 24 - n & 16777215) || o !== this.length - 1 ? u[6 - m.length] + m + h : m + h, (n += 2) >= 26 && (n -= 26, o--)
                    }
                    for (0 !== e && (h = e.toString(16) + h); h.length % i != 0;) h = "0" + h;
                    return 0 !== this.negative && (h = "-" + h), h
                }
                if (t === (0 | t) && t >= 2 && t <= 36) {
                    var f = a[t],
                        d = l[t];
                    h = "";
                    var p = this.clone();
                    for (p.negative = 0; !p.isZero();) {
                        var M = p.modn(d).toString(t);
                        h = (p = p.idivn(d)).isZero() ? M + h : u[f - M.length] + M + h
                    }
                    for (this.isZero() && (h = "0" + h); h.length % i != 0;) h = "0" + h;
                    return 0 !== this.negative && (h = "-" + h), h
                }
                r(!1, "Base should be between 2 and 36")
            }, n.prototype.toNumber = function() {
                var t = this.words[0];
                return 2 === this.length ? t += 67108864 * this.words[1] : 3 === this.length && 1 === this.words[2] ? t += 4503599627370496 + 67108864 * this.words[1] : this.length > 2 && r(!1, "Number can only safely store up to 53 bits"), 0 !== this.negative ? -t : t
            }, n.prototype.toJSON = function() {
                return this.toString(16)
            }, n.prototype.toBuffer = function(t, i) {
                return r(void 0 !== e), this.toArrayLike(e, t, i)
            }, n.prototype.toArray = function(t, i) {
                return this.toArrayLike(Array, t, i)
            }, n.prototype.toArrayLike = function(t, i, h) {
                var n = this.byteLength(),
                    e = h || Math.max(1, n);
                r(n <= e, "byte array longer than desired length"), r(e > 0, "Requested array length <= 0"), this.strip();
                var o, s, u = "le" === i,
                    a = new t(e),
                    l = this.clone();
                if (u) {
                    for (s = 0; !l.isZero(); s++) o = l.andln(255), l.iushrn(8), a[s] = o;
                    for (; s < e; s++) a[s] = 0
                } else {
                    for (s = 0; s < e - n; s++) a[s] = 0;
                    for (s = 0; !l.isZero(); s++) o = l.andln(255), l.iushrn(8), a[e - s - 1] = o
                }
                return a
            }, Math.clz32 ? n.prototype._countBits = function(t) {
                return 32 - Math.clz32(t)
            } : n.prototype._countBits = function(t) {
                var i = t,
                    r = 0;
                return i >= 4096 && (r += 13, i >>>= 13), i >= 64 && (r += 7, i >>>= 7), i >= 8 && (r += 4, i >>>= 4), i >= 2 && (r += 2, i >>>= 2), r + i
            }, n.prototype._zeroBits = function(t) {
                if (0 === t) return 26;
                var i = t,
                    r = 0;
                return 0 == (8191 & i) && (r += 13, i >>>= 13), 0 == (127 & i) && (r += 7, i >>>= 7), 0 == (15 & i) && (r += 4, i >>>= 4), 0 == (3 & i) && (r += 2, i >>>= 2), 0 == (1 & i) && r++, r
            }, n.prototype.bitLength = function() {
                var t = this.words[this.length - 1],
                    i = this._countBits(t);
                return 26 * (this.length - 1) + i
            }, n.prototype.zeroBits = function() {
                if (this.isZero()) return 0;
                for (var t = 0, i = 0; i < this.length; i++) {
                    var r = this._zeroBits(this.words[i]);
                    if (t += r, 26 !== r) break
                }
                return t
            }, n.prototype.byteLength = function() {
                return Math.ceil(this.bitLength() / 8)
            }, n.prototype.toTwos = function(t) {
                return 0 !== this.negative ? this.abs().inotn(t).iaddn(1) : this.clone()
            }, n.prototype.fromTwos = function(t) {
                return this.testn(t - 1) ? this.notn(t).iaddn(1).ineg() : this.clone()
            }, n.prototype.isNeg = function() {
                return 0 !== this.negative
            }, n.prototype.neg = function() {
                return this.clone().ineg()
            }, n.prototype.ineg = function() {
                return this.isZero() || (this.negative ^= 1), this
            }, n.prototype.iuor = function(t) {
                for (; this.length < t.length;) this.words[this.length++] = 0;
                for (var i = 0; i < t.length; i++) this.words[i] = this.words[i] | t.words[i];
                return this.strip()
            }, n.prototype.ior = function(t) {
                return r(0 == (this.negative | t.negative)), this.iuor(t)
            }, n.prototype.or = function(t) {
                return this.length > t.length ? this.clone().ior(t) : t.clone().ior(this)
            }, n.prototype.uor = function(t) {
                return this.length > t.length ? this.clone().iuor(t) : t.clone().iuor(this)
            }, n.prototype.iuand = function(t) {
                var i;
                i = this.length > t.length ? t : this;
                for (var r = 0; r < i.length; r++) this.words[r] = this.words[r] & t.words[r];
                return this.length = i.length, this.strip()
            }, n.prototype.iand = function(t) {
                return r(0 == (this.negative | t.negative)), this.iuand(t)
            }, n.prototype.and = function(t) {
                return this.length > t.length ? this.clone().iand(t) : t.clone().iand(this)
            }, n.prototype.uand = function(t) {
                return this.length > t.length ? this.clone().iuand(t) : t.clone().iuand(this)
            }, n.prototype.iuxor = function(t) {
                var i, r;
                this.length > t.length ? (i = this, r = t) : (i = t, r = this);
                for (var h = 0; h < r.length; h++) this.words[h] = i.words[h] ^ r.words[h];
                if (this !== i)
                    for (; h < i.length; h++) this.words[h] = i.words[h];
                return this.length = i.length, this.strip()
            }, n.prototype.ixor = function(t) {
                return r(0 == (this.negative | t.negative)), this.iuxor(t)
            }, n.prototype.xor = function(t) {
                return this.length > t.length ? this.clone().ixor(t) : t.clone().ixor(this)
            }, n.prototype.uxor = function(t) {
                return this.length > t.length ? this.clone().iuxor(t) : t.clone().iuxor(this)
            }, n.prototype.inotn = function(t) {
                r("number" == typeof t && t >= 0);
                var i = 0 | Math.ceil(t / 26),
                    h = t % 26;
                this._expand(i), h > 0 && i--;
                for (var n = 0; n < i; n++) this.words[n] = 67108863 & ~this.words[n];
                return h > 0 && (this.words[n] = ~this.words[n] & 67108863 >> 26 - h), this.strip()
            }, n.prototype.notn = function(t) {
                return this.clone().inotn(t)
            }, n.prototype.setn = function(t, i) {
                r("number" == typeof t && t >= 0);
                var h = t / 26 | 0,
                    n = t % 26;
                return this._expand(h + 1), this.words[h] = i ? this.words[h] | 1 << n : this.words[h] & ~(1 << n), this.strip()
            }, n.prototype.iadd = function(t) {
                var i, r, h;
                if (0 !== this.negative && 0 === t.negative) return this.negative = 0, i = this.isub(t), this.negative ^= 1, this._normSign();
                if (0 === this.negative && 0 !== t.negative) return t.negative = 0, i = this.isub(t), t.negative = 1, i._normSign();
                this.length > t.length ? (r = this, h = t) : (r = t, h = this);
                for (var n = 0, e = 0; e < h.length; e++) i = (0 | r.words[e]) + (0 | h.words[e]) + n, this.words[e] = 67108863 & i, n = i >>> 26;
                for (; 0 !== n && e < r.length; e++) i = (0 | r.words[e]) + n, this.words[e] = 67108863 & i, n = i >>> 26;
                if (this.length = r.length, 0 !== n) this.words[this.length] = n, this.length++;
                else if (r !== this)
                    for (; e < r.length; e++) this.words[e] = r.words[e];
                return this
            }, n.prototype.add = function(t) {
                var i;
                return 0 !== t.negative && 0 === this.negative ? (t.negative = 0, i = this.sub(t), t.negative ^= 1, i) : 0 === t.negative && 0 !== this.negative ? (this.negative = 0, i = t.sub(this), this.negative = 1, i) : this.length > t.length ? this.clone().iadd(t) : t.clone().iadd(this)
            }, n.prototype.isub = function(t) {
                if (0 !== t.negative) {
                    t.negative = 0;
                    var i = this.iadd(t);
                    return t.negative = 1, i._normSign()
                }
                if (0 !== this.negative) return this.negative = 0, this.iadd(t), this.negative = 1, this._normSign();
                var r, h, n = this.cmp(t);
                if (0 === n) return this.negative = 0, this.length = 1, this.words[0] = 0, this;
                n > 0 ? (r = this, h = t) : (r = t, h = this);
                for (var e = 0, o = 0; o < h.length; o++) e = (i = (0 | r.words[o]) - (0 | h.words[o]) + e) >> 26, this.words[o] = 67108863 & i;
                for (; 0 !== e && o < r.length; o++) e = (i = (0 | r.words[o]) + e) >> 26, this.words[o] = 67108863 & i;
                if (0 === e && o < r.length && r !== this)
                    for (; o < r.length; o++) this.words[o] = r.words[o];
                return this.length = Math.max(this.length, o), r !== this && (this.negative = 1), this.strip()
            }, n.prototype.sub = function(t) {
                return this.clone().isub(t)
            };
            var f = function(t, i, r) {
                var h, n, e, o = t.words,
                    s = i.words,
                    u = r.words,
                    a = 0,
                    l = 0 | o[0],
                    m = 8191 & l,
                    f = l >>> 13,
                    d = 0 | o[1],
                    p = 8191 & d,
                    M = d >>> 13,
                    v = 0 | o[2],
                    g = 8191 & v,
                    c = v >>> 13,
                    w = 0 | o[3],
                    y = 8191 & w,
                    b = w >>> 13,
                    _ = 0 | o[4],
                    k = 8191 & _,
                    A = _ >>> 13,
                    x = 0 | o[5],
                    S = 8191 & x,
                    q = x >>> 13,
                    Z = 0 | o[6],
                    R = 8191 & Z,
                    B = Z >>> 13,
                    N = 0 | o[7],
                    L = 8191 & N,
                    I = N >>> 13,
                    z = 0 | o[8],
                    T = 8191 & z,
                    E = z >>> 13,
                    O = 0 | o[9],
                    j = 8191 & O,
                    K = O >>> 13,
                    P = 0 | s[0],
                    F = 8191 & P,
                    C = P >>> 13,
                    D = 0 | s[1],
                    H = 8191 & D,
                    J = D >>> 13,
                    U = 0 | s[2],
                    G = 8191 & U,
                    Q = U >>> 13,
                    V = 0 | s[3],
                    W = 8191 & V,
                    X = V >>> 13,
                    Y = 0 | s[4],
                    $ = 8191 & Y,
                    tt = Y >>> 13,
                    it = 0 | s[5],
                    rt = 8191 & it,
                    ht = it >>> 13,
                    nt = 0 | s[6],
                    et = 8191 & nt,
                    ot = nt >>> 13,
                    st = 0 | s[7],
                    ut = 8191 & st,
                    at = st >>> 13,
                    lt = 0 | s[8],
                    mt = 8191 & lt,
                    ft = lt >>> 13,
                    dt = 0 | s[9],
                    pt = 8191 & dt,
                    Mt = dt >>> 13;
                r.negative = t.negative ^ i.negative, r.length = 19;
                var vt = (a + (h = Math.imul(m, F)) | 0) + ((8191 & (n = (n = Math.imul(m, C)) + Math.imul(f, F) | 0)) << 13) | 0;
                a = ((e = Math.imul(f, C)) + (n >>> 13) | 0) + (vt >>> 26) | 0, vt &= 67108863, h = Math.imul(p, F), n = (n = Math.imul(p, C)) + Math.imul(M, F) | 0, e = Math.imul(M, C);
                var gt = (a + (h = h + Math.imul(m, H) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(m, J) | 0) + Math.imul(f, H) | 0)) << 13) | 0;
                a = ((e = e + Math.imul(f, J) | 0) + (n >>> 13) | 0) + (gt >>> 26) | 0, gt &= 67108863, h = Math.imul(g, F), n = (n = Math.imul(g, C)) + Math.imul(c, F) | 0, e = Math.imul(c, C), h = h + Math.imul(p, H) | 0, n = (n = n + Math.imul(p, J) | 0) + Math.imul(M, H) | 0, e = e + Math.imul(M, J) | 0;
                var ct = (a + (h = h + Math.imul(m, G) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(m, Q) | 0) + Math.imul(f, G) | 0)) << 13) | 0;
                a = ((e = e + Math.imul(f, Q) | 0) + (n >>> 13) | 0) + (ct >>> 26) | 0, ct &= 67108863, h = Math.imul(y, F), n = (n = Math.imul(y, C)) + Math.imul(b, F) | 0, e = Math.imul(b, C), h = h + Math.imul(g, H) | 0, n = (n = n + Math.imul(g, J) | 0) + Math.imul(c, H) | 0, e = e + Math.imul(c, J) | 0, h = h + Math.imul(p, G) | 0, n = (n = n + Math.imul(p, Q) | 0) + Math.imul(M, G) | 0, e = e + Math.imul(M, Q) | 0;
                var wt = (a + (h = h + Math.imul(m, W) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(m, X) | 0) + Math.imul(f, W) | 0)) << 13) | 0;
                a = ((e = e + Math.imul(f, X) | 0) + (n >>> 13) | 0) + (wt >>> 26) | 0, wt &= 67108863, h = Math.imul(k, F), n = (n = Math.imul(k, C)) + Math.imul(A, F) | 0, e = Math.imul(A, C), h = h + Math.imul(y, H) | 0, n = (n = n + Math.imul(y, J) | 0) + Math.imul(b, H) | 0, e = e + Math.imul(b, J) | 0, h = h + Math.imul(g, G) | 0, n = (n = n + Math.imul(g, Q) | 0) + Math.imul(c, G) | 0, e = e + Math.imul(c, Q) | 0, h = h + Math.imul(p, W) | 0, n = (n = n + Math.imul(p, X) | 0) + Math.imul(M, W) | 0, e = e + Math.imul(M, X) | 0;
                var yt = (a + (h = h + Math.imul(m, $) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(m, tt) | 0) + Math.imul(f, $) | 0)) << 13) | 0;
                a = ((e = e + Math.imul(f, tt) | 0) + (n >>> 13) | 0) + (yt >>> 26) | 0, yt &= 67108863, h = Math.imul(S, F), n = (n = Math.imul(S, C)) + Math.imul(q, F) | 0, e = Math.imul(q, C), h = h + Math.imul(k, H) | 0, n = (n = n + Math.imul(k, J) | 0) + Math.imul(A, H) | 0, e = e + Math.imul(A, J) | 0, h = h + Math.imul(y, G) | 0, n = (n = n + Math.imul(y, Q) | 0) + Math.imul(b, G) | 0, e = e + Math.imul(b, Q) | 0, h = h + Math.imul(g, W) | 0, n = (n = n + Math.imul(g, X) | 0) + Math.imul(c, W) | 0, e = e + Math.imul(c, X) | 0, h = h + Math.imul(p, $) | 0, n = (n = n + Math.imul(p, tt) | 0) + Math.imul(M, $) | 0, e = e + Math.imul(M, tt) | 0;
                var bt = (a + (h = h + Math.imul(m, rt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(m, ht) | 0) + Math.imul(f, rt) | 0)) << 13) | 0;
                a = ((e = e + Math.imul(f, ht) | 0) + (n >>> 13) | 0) + (bt >>> 26) | 0, bt &= 67108863, h = Math.imul(R, F), n = (n = Math.imul(R, C)) + Math.imul(B, F) | 0, e = Math.imul(B, C), h = h + Math.imul(S, H) | 0, n = (n = n + Math.imul(S, J) | 0) + Math.imul(q, H) | 0, e = e + Math.imul(q, J) | 0, h = h + Math.imul(k, G) | 0, n = (n = n + Math.imul(k, Q) | 0) + Math.imul(A, G) | 0, e = e + Math.imul(A, Q) | 0, h = h + Math.imul(y, W) | 0, n = (n = n + Math.imul(y, X) | 0) + Math.imul(b, W) | 0, e = e + Math.imul(b, X) | 0, h = h + Math.imul(g, $) | 0, n = (n = n + Math.imul(g, tt) | 0) + Math.imul(c, $) | 0, e = e + Math.imul(c, tt) | 0, h = h + Math.imul(p, rt) | 0, n = (n = n + Math.imul(p, ht) | 0) + Math.imul(M, rt) | 0, e = e + Math.imul(M, ht) | 0;
                var _t = (a + (h = h + Math.imul(m, et) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(m, ot) | 0) + Math.imul(f, et) | 0)) << 13) | 0;
                a = ((e = e + Math.imul(f, ot) | 0) + (n >>> 13) | 0) + (_t >>> 26) | 0, _t &= 67108863, h = Math.imul(L, F), n = (n = Math.imul(L, C)) + Math.imul(I, F) | 0, e = Math.imul(I, C), h = h + Math.imul(R, H) | 0, n = (n = n + Math.imul(R, J) | 0) + Math.imul(B, H) | 0, e = e + Math.imul(B, J) | 0, h = h + Math.imul(S, G) | 0, n = (n = n + Math.imul(S, Q) | 0) + Math.imul(q, G) | 0, e = e + Math.imul(q, Q) | 0, h = h + Math.imul(k, W) | 0, n = (n = n + Math.imul(k, X) | 0) + Math.imul(A, W) | 0, e = e + Math.imul(A, X) | 0, h = h + Math.imul(y, $) | 0, n = (n = n + Math.imul(y, tt) | 0) + Math.imul(b, $) | 0, e = e + Math.imul(b, tt) | 0, h = h + Math.imul(g, rt) | 0, n = (n = n + Math.imul(g, ht) | 0) + Math.imul(c, rt) | 0, e = e + Math.imul(c, ht) | 0, h = h + Math.imul(p, et) | 0, n = (n = n + Math.imul(p, ot) | 0) + Math.imul(M, et) | 0, e = e + Math.imul(M, ot) | 0;
                var kt = (a + (h = h + Math.imul(m, ut) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(m, at) | 0) + Math.imul(f, ut) | 0)) << 13) | 0;
                a = ((e = e + Math.imul(f, at) | 0) + (n >>> 13) | 0) + (kt >>> 26) | 0, kt &= 67108863, h = Math.imul(T, F), n = (n = Math.imul(T, C)) + Math.imul(E, F) | 0, e = Math.imul(E, C), h = h + Math.imul(L, H) | 0, n = (n = n + Math.imul(L, J) | 0) + Math.imul(I, H) | 0, e = e + Math.imul(I, J) | 0, h = h + Math.imul(R, G) | 0, n = (n = n + Math.imul(R, Q) | 0) + Math.imul(B, G) | 0, e = e + Math.imul(B, Q) | 0, h = h + Math.imul(S, W) | 0, n = (n = n + Math.imul(S, X) | 0) + Math.imul(q, W) | 0, e = e + Math.imul(q, X) | 0, h = h + Math.imul(k, $) | 0, n = (n = n + Math.imul(k, tt) | 0) + Math.imul(A, $) | 0, e = e + Math.imul(A, tt) | 0, h = h + Math.imul(y, rt) | 0, n = (n = n + Math.imul(y, ht) | 0) + Math.imul(b, rt) | 0, e = e + Math.imul(b, ht) | 0, h = h + Math.imul(g, et) | 0, n = (n = n + Math.imul(g, ot) | 0) + Math.imul(c, et) | 0, e = e + Math.imul(c, ot) | 0, h = h + Math.imul(p, ut) | 0, n = (n = n + Math.imul(p, at) | 0) + Math.imul(M, ut) | 0, e = e + Math.imul(M, at) | 0;
                var At = (a + (h = h + Math.imul(m, mt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(m, ft) | 0) + Math.imul(f, mt) | 0)) << 13) | 0;
                a = ((e = e + Math.imul(f, ft) | 0) + (n >>> 13) | 0) + (At >>> 26) | 0, At &= 67108863, h = Math.imul(j, F), n = (n = Math.imul(j, C)) + Math.imul(K, F) | 0, e = Math.imul(K, C), h = h + Math.imul(T, H) | 0, n = (n = n + Math.imul(T, J) | 0) + Math.imul(E, H) | 0, e = e + Math.imul(E, J) | 0, h = h + Math.imul(L, G) | 0, n = (n = n + Math.imul(L, Q) | 0) + Math.imul(I, G) | 0, e = e + Math.imul(I, Q) | 0, h = h + Math.imul(R, W) | 0, n = (n = n + Math.imul(R, X) | 0) + Math.imul(B, W) | 0, e = e + Math.imul(B, X) | 0, h = h + Math.imul(S, $) | 0, n = (n = n + Math.imul(S, tt) | 0) + Math.imul(q, $) | 0, e = e + Math.imul(q, tt) | 0, h = h + Math.imul(k, rt) | 0, n = (n = n + Math.imul(k, ht) | 0) + Math.imul(A, rt) | 0, e = e + Math.imul(A, ht) | 0, h = h + Math.imul(y, et) | 0, n = (n = n + Math.imul(y, ot) | 0) + Math.imul(b, et) | 0, e = e + Math.imul(b, ot) | 0, h = h + Math.imul(g, ut) | 0, n = (n = n + Math.imul(g, at) | 0) + Math.imul(c, ut) | 0, e = e + Math.imul(c, at) | 0, h = h + Math.imul(p, mt) | 0, n = (n = n + Math.imul(p, ft) | 0) + Math.imul(M, mt) | 0, e = e + Math.imul(M, ft) | 0;
                var xt = (a + (h = h + Math.imul(m, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(m, Mt) | 0) + Math.imul(f, pt) | 0)) << 13) | 0;
                a = ((e = e + Math.imul(f, Mt) | 0) + (n >>> 13) | 0) + (xt >>> 26) | 0, xt &= 67108863, h = Math.imul(j, H), n = (n = Math.imul(j, J)) + Math.imul(K, H) | 0, e = Math.imul(K, J), h = h + Math.imul(T, G) | 0, n = (n = n + Math.imul(T, Q) | 0) + Math.imul(E, G) | 0, e = e + Math.imul(E, Q) | 0, h = h + Math.imul(L, W) | 0, n = (n = n + Math.imul(L, X) | 0) + Math.imul(I, W) | 0, e = e + Math.imul(I, X) | 0, h = h + Math.imul(R, $) | 0, n = (n = n + Math.imul(R, tt) | 0) + Math.imul(B, $) | 0, e = e + Math.imul(B, tt) | 0, h = h + Math.imul(S, rt) | 0, n = (n = n + Math.imul(S, ht) | 0) + Math.imul(q, rt) | 0, e = e + Math.imul(q, ht) | 0, h = h + Math.imul(k, et) | 0, n = (n = n + Math.imul(k, ot) | 0) + Math.imul(A, et) | 0, e = e + Math.imul(A, ot) | 0, h = h + Math.imul(y, ut) | 0, n = (n = n + Math.imul(y, at) | 0) + Math.imul(b, ut) | 0, e = e + Math.imul(b, at) | 0, h = h + Math.imul(g, mt) | 0, n = (n = n + Math.imul(g, ft) | 0) + Math.imul(c, mt) | 0, e = e + Math.imul(c, ft) | 0;
                var St = (a + (h = h + Math.imul(p, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(p, Mt) | 0) + Math.imul(M, pt) | 0)) << 13) | 0;
                a = ((e = e + Math.imul(M, Mt) | 0) + (n >>> 13) | 0) + (St >>> 26) | 0, St &= 67108863, h = Math.imul(j, G), n = (n = Math.imul(j, Q)) + Math.imul(K, G) | 0, e = Math.imul(K, Q), h = h + Math.imul(T, W) | 0, n = (n = n + Math.imul(T, X) | 0) + Math.imul(E, W) | 0, e = e + Math.imul(E, X) | 0, h = h + Math.imul(L, $) | 0, n = (n = n + Math.imul(L, tt) | 0) + Math.imul(I, $) | 0, e = e + Math.imul(I, tt) | 0, h = h + Math.imul(R, rt) | 0, n = (n = n + Math.imul(R, ht) | 0) + Math.imul(B, rt) | 0, e = e + Math.imul(B, ht) | 0, h = h + Math.imul(S, et) | 0, n = (n = n + Math.imul(S, ot) | 0) + Math.imul(q, et) | 0, e = e + Math.imul(q, ot) | 0, h = h + Math.imul(k, ut) | 0, n = (n = n + Math.imul(k, at) | 0) + Math.imul(A, ut) | 0, e = e + Math.imul(A, at) | 0, h = h + Math.imul(y, mt) | 0, n = (n = n + Math.imul(y, ft) | 0) + Math.imul(b, mt) | 0, e = e + Math.imul(b, ft) | 0;
                var qt = (a + (h = h + Math.imul(g, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(g, Mt) | 0) + Math.imul(c, pt) | 0)) << 13) | 0;
                a = ((e = e + Math.imul(c, Mt) | 0) + (n >>> 13) | 0) + (qt >>> 26) | 0, qt &= 67108863, h = Math.imul(j, W), n = (n = Math.imul(j, X)) + Math.imul(K, W) | 0, e = Math.imul(K, X), h = h + Math.imul(T, $) | 0, n = (n = n + Math.imul(T, tt) | 0) + Math.imul(E, $) | 0, e = e + Math.imul(E, tt) | 0, h = h + Math.imul(L, rt) | 0, n = (n = n + Math.imul(L, ht) | 0) + Math.imul(I, rt) | 0, e = e + Math.imul(I, ht) | 0, h = h + Math.imul(R, et) | 0, n = (n = n + Math.imul(R, ot) | 0) + Math.imul(B, et) | 0, e = e + Math.imul(B, ot) | 0, h = h + Math.imul(S, ut) | 0, n = (n = n + Math.imul(S, at) | 0) + Math.imul(q, ut) | 0, e = e + Math.imul(q, at) | 0, h = h + Math.imul(k, mt) | 0, n = (n = n + Math.imul(k, ft) | 0) + Math.imul(A, mt) | 0, e = e + Math.imul(A, ft) | 0;
                var Zt = (a + (h = h + Math.imul(y, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(y, Mt) | 0) + Math.imul(b, pt) | 0)) << 13) | 0;
                a = ((e = e + Math.imul(b, Mt) | 0) + (n >>> 13) | 0) + (Zt >>> 26) | 0, Zt &= 67108863, h = Math.imul(j, $), n = (n = Math.imul(j, tt)) + Math.imul(K, $) | 0, e = Math.imul(K, tt), h = h + Math.imul(T, rt) | 0, n = (n = n + Math.imul(T, ht) | 0) + Math.imul(E, rt) | 0, e = e + Math.imul(E, ht) | 0, h = h + Math.imul(L, et) | 0, n = (n = n + Math.imul(L, ot) | 0) + Math.imul(I, et) | 0, e = e + Math.imul(I, ot) | 0, h = h + Math.imul(R, ut) | 0, n = (n = n + Math.imul(R, at) | 0) + Math.imul(B, ut) | 0, e = e + Math.imul(B, at) | 0, h = h + Math.imul(S, mt) | 0, n = (n = n + Math.imul(S, ft) | 0) + Math.imul(q, mt) | 0, e = e + Math.imul(q, ft) | 0;
                var Rt = (a + (h = h + Math.imul(k, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(k, Mt) | 0) + Math.imul(A, pt) | 0)) << 13) | 0;
                a = ((e = e + Math.imul(A, Mt) | 0) + (n >>> 13) | 0) + (Rt >>> 26) | 0, Rt &= 67108863, h = Math.imul(j, rt), n = (n = Math.imul(j, ht)) + Math.imul(K, rt) | 0, e = Math.imul(K, ht), h = h + Math.imul(T, et) | 0, n = (n = n + Math.imul(T, ot) | 0) + Math.imul(E, et) | 0, e = e + Math.imul(E, ot) | 0, h = h + Math.imul(L, ut) | 0, n = (n = n + Math.imul(L, at) | 0) + Math.imul(I, ut) | 0, e = e + Math.imul(I, at) | 0, h = h + Math.imul(R, mt) | 0, n = (n = n + Math.imul(R, ft) | 0) + Math.imul(B, mt) | 0, e = e + Math.imul(B, ft) | 0;
                var Bt = (a + (h = h + Math.imul(S, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(S, Mt) | 0) + Math.imul(q, pt) | 0)) << 13) | 0;
                a = ((e = e + Math.imul(q, Mt) | 0) + (n >>> 13) | 0) + (Bt >>> 26) | 0, Bt &= 67108863, h = Math.imul(j, et), n = (n = Math.imul(j, ot)) + Math.imul(K, et) | 0, e = Math.imul(K, ot), h = h + Math.imul(T, ut) | 0, n = (n = n + Math.imul(T, at) | 0) + Math.imul(E, ut) | 0, e = e + Math.imul(E, at) | 0, h = h + Math.imul(L, mt) | 0, n = (n = n + Math.imul(L, ft) | 0) + Math.imul(I, mt) | 0, e = e + Math.imul(I, ft) | 0;
                var Nt = (a + (h = h + Math.imul(R, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(R, Mt) | 0) + Math.imul(B, pt) | 0)) << 13) | 0;
                a = ((e = e + Math.imul(B, Mt) | 0) + (n >>> 13) | 0) + (Nt >>> 26) | 0, Nt &= 67108863, h = Math.imul(j, ut), n = (n = Math.imul(j, at)) + Math.imul(K, ut) | 0, e = Math.imul(K, at), h = h + Math.imul(T, mt) | 0, n = (n = n + Math.imul(T, ft) | 0) + Math.imul(E, mt) | 0, e = e + Math.imul(E, ft) | 0;
                var Lt = (a + (h = h + Math.imul(L, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(L, Mt) | 0) + Math.imul(I, pt) | 0)) << 13) | 0;
                a = ((e = e + Math.imul(I, Mt) | 0) + (n >>> 13) | 0) + (Lt >>> 26) | 0, Lt &= 67108863, h = Math.imul(j, mt), n = (n = Math.imul(j, ft)) + Math.imul(K, mt) | 0, e = Math.imul(K, ft);
                var It = (a + (h = h + Math.imul(T, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(T, Mt) | 0) + Math.imul(E, pt) | 0)) << 13) | 0;
                a = ((e = e + Math.imul(E, Mt) | 0) + (n >>> 13) | 0) + (It >>> 26) | 0, It &= 67108863;
                var zt = (a + (h = Math.imul(j, pt)) | 0) + ((8191 & (n = (n = Math.imul(j, Mt)) + Math.imul(K, pt) | 0)) << 13) | 0;
                return a = ((e = Math.imul(K, Mt)) + (n >>> 13) | 0) + (zt >>> 26) | 0, zt &= 67108863, u[0] = vt, u[1] = gt, u[2] = ct, u[3] = wt, u[4] = yt, u[5] = bt, u[6] = _t, u[7] = kt, u[8] = At, u[9] = xt, u[10] = St, u[11] = qt, u[12] = Zt, u[13] = Rt, u[14] = Bt, u[15] = Nt, u[16] = Lt, u[17] = It, u[18] = zt, 0 !== a && (u[19] = a, r.length++), r
            };

            function d(t, i, r) {
                return (new p).mulp(t, i, r)
            }

            function p(t, i) {
                this.x = t, this.y = i
            }
            Math.imul || (f = m), n.prototype.mulTo = function(t, i) {
                var r = this.length + t.length;
                return 10 === this.length && 10 === t.length ? f(this, t, i) : r < 63 ? m(this, t, i) : r < 1024 ? function(t, i, r) {
                    r.negative = i.negative ^ t.negative, r.length = t.length + i.length;
                    for (var h = 0, n = 0, e = 0; e < r.length - 1; e++) {
                        var o = n;
                        n = 0;
                        for (var s = 67108863 & h, u = Math.min(e, i.length - 1), a = Math.max(0, e - t.length + 1); a <= u; a++) {
                            var l = e - a,
                                m = (0 | t.words[l]) * (0 | i.words[a]),
                                f = 67108863 & m;
                            s = 67108863 & (f = f + s | 0), n += (o = (o = o + (m / 67108864 | 0) | 0) + (f >>> 26) | 0) >>> 26, o &= 67108863
                        }
                        r.words[e] = s, h = o, o = n
                    }
                    return 0 !== h ? r.words[e] = h : r.length--, r.strip()
                }(this, t, i) : d(this, t, i)
            }, p.prototype.makeRBT = function(t) {
                for (var i = new Array(t), r = n.prototype._countBits(t) - 1, h = 0; h < t; h++) i[h] = this.revBin(h, r, t);
                return i
            }, p.prototype.revBin = function(t, i, r) {
                if (0 === t || t === r - 1) return t;
                for (var h = 0, n = 0; n < i; n++) h |= (1 & t) << i - n - 1, t >>= 1;
                return h
            }, p.prototype.permute = function(t, i, r, h, n, e) {
                for (var o = 0; o < e; o++) h[o] = i[t[o]], n[o] = r[t[o]]
            }, p.prototype.transform = function(t, i, r, h, n, e) {
                this.permute(e, t, i, r, h, n);
                for (var o = 1; o < n; o <<= 1)
                    for (var s = o << 1, u = Math.cos(2 * Math.PI / s), a = Math.sin(2 * Math.PI / s), l = 0; l < n; l += s)
                        for (var m = u, f = a, d = 0; d < o; d++) {
                            var p = r[l + d],
                                M = h[l + d],
                                v = r[l + d + o],
                                g = h[l + d + o],
                                c = m * v - f * g;
                            g = m * g + f * v, v = c, r[l + d] = p + v, h[l + d] = M + g, r[l + d + o] = p - v, h[l + d + o] = M - g, d !== s && (c = u * m - a * f, f = u * f + a * m, m = c)
                        }
            }, p.prototype.guessLen13b = function(t, i) {
                var r = 1 | Math.max(i, t),
                    h = 1 & r,
                    n = 0;
                for (r = r / 2 | 0; r; r >>>= 1) n++;
                return 1 << n + 1 + h
            }, p.prototype.conjugate = function(t, i, r) {
                if (!(r <= 1))
                    for (var h = 0; h < r / 2; h++) {
                        var n = t[h];
                        t[h] = t[r - h - 1], t[r - h - 1] = n, n = i[h], i[h] = -i[r - h - 1], i[r - h - 1] = -n
                    }
            }, p.prototype.normalize13b = function(t, i) {
                for (var r = 0, h = 0; h < i / 2; h++) {
                    var n = 8192 * Math.round(t[2 * h + 1] / i) + Math.round(t[2 * h] / i) + r;
                    t[h] = 67108863 & n, r = n < 67108864 ? 0 : n / 67108864 | 0
                }
                return t
            }, p.prototype.convert13b = function(t, i, h, n) {
                for (var e = 0, o = 0; o < i; o++) e += 0 | t[o], h[2 * o] = 8191 & e, e >>>= 13, h[2 * o + 1] = 8191 & e, e >>>= 13;
                for (o = 2 * i; o < n; ++o) h[o] = 0;
                r(0 === e), r(0 == (-8192 & e))
            }, p.prototype.stub = function(t) {
                for (var i = new Array(t), r = 0; r < t; r++) i[r] = 0;
                return i
            }, p.prototype.mulp = function(t, i, r) {
                var h = 2 * this.guessLen13b(t.length, i.length),
                    n = this.makeRBT(h),
                    e = this.stub(h),
                    o = new Array(h),
                    s = new Array(h),
                    u = new Array(h),
                    a = new Array(h),
                    l = new Array(h),
                    m = new Array(h),
                    f = r.words;
                f.length = h, this.convert13b(t.words, t.length, o, h), this.convert13b(i.words, i.length, a, h), this.transform(o, e, s, u, h, n), this.transform(a, e, l, m, h, n);
                for (var d = 0; d < h; d++) {
                    var p = s[d] * l[d] - u[d] * m[d];
                    u[d] = s[d] * m[d] + u[d] * l[d], s[d] = p
                }
                return this.conjugate(s, u, h), this.transform(s, u, f, e, h, n), this.conjugate(f, e, h), this.normalize13b(f, h), r.negative = t.negative ^ i.negative, r.length = t.length + i.length, r.strip()
            }, n.prototype.mul = function(t) {
                var i = new n(null);
                return i.words = new Array(this.length + t.length), this.mulTo(t, i)
            }, n.prototype.mulf = function(t) {
                var i = new n(null);
                return i.words = new Array(this.length + t.length), d(this, t, i)
            }, n.prototype.imul = function(t) {
                return this.clone().mulTo(t, this)
            }, n.prototype.imuln = function(t) {
                r("number" == typeof t), r(t < 67108864);
                for (var i = 0, h = 0; h < this.length; h++) {
                    var n = (0 | this.words[h]) * t,
                        e = (67108863 & n) + (67108863 & i);
                    i >>= 26, i += n / 67108864 | 0, i += e >>> 26, this.words[h] = 67108863 & e
                }
                return 0 !== i && (this.words[h] = i, this.length++), this
            }, n.prototype.muln = function(t) {
                return this.clone().imuln(t)
            }, n.prototype.sqr = function() {
                return this.mul(this)
            }, n.prototype.isqr = function() {
                return this.imul(this.clone())
            }, n.prototype.pow = function(t) {
                var i = function(t) {
                    for (var i = new Array(t.bitLength()), r = 0; r < i.length; r++) {
                        var h = r / 26 | 0,
                            n = r % 26;
                        i[r] = (t.words[h] & 1 << n) >>> n
                    }
                    return i
                }(t);
                if (0 === i.length) return new n(1);
                for (var r = this, h = 0; h < i.length && 0 === i[h]; h++, r = r.sqr());
                if (++h < i.length)
                    for (var e = r.sqr(); h < i.length; h++, e = e.sqr()) 0 !== i[h] && (r = r.mul(e));
                return r
            }, n.prototype.iushln = function(t) {
                r("number" == typeof t && t >= 0);
                var i, h = t % 26,
                    n = (t - h) / 26,
                    e = 67108863 >>> 26 - h << 26 - h;
                if (0 !== h) {
                    var o = 0;
                    for (i = 0; i < this.length; i++) {
                        var s = this.words[i] & e,
                            u = (0 | this.words[i]) - s << h;
                        this.words[i] = u | o, o = s >>> 26 - h
                    }
                    o && (this.words[i] = o, this.length++)
                }
                if (0 !== n) {
                    for (i = this.length - 1; i >= 0; i--) this.words[i + n] = this.words[i];
                    for (i = 0; i < n; i++) this.words[i] = 0;
                    this.length += n
                }
                return this.strip()
            }, n.prototype.ishln = function(t) {
                return r(0 === this.negative), this.iushln(t)
            }, n.prototype.iushrn = function(t, i, h) {
                var n;
                r("number" == typeof t && t >= 0), n = i ? (i - i % 26) / 26 : 0;
                var e = t % 26,
                    o = Math.min((t - e) / 26, this.length),
                    s = 67108863 ^ 67108863 >>> e << e,
                    u = h;
                if (n -= o, n = Math.max(0, n), u) {
                    for (var a = 0; a < o; a++) u.words[a] = this.words[a];
                    u.length = o
                }
                if (0 === o);
                else if (this.length > o)
                    for (this.length -= o, a = 0; a < this.length; a++) this.words[a] = this.words[a + o];
                else this.words[0] = 0, this.length = 1;
                var l = 0;
                for (a = this.length - 1; a >= 0 && (0 !== l || a >= n); a--) {
                    var m = 0 | this.words[a];
                    this.words[a] = l << 26 - e | m >>> e, l = m & s
                }
                return u && 0 !== l && (u.words[u.length++] = l), 0 === this.length && (this.words[0] = 0, this.length = 1), this.strip()
            }, n.prototype.ishrn = function(t, i, h) {
                return r(0 === this.negative), this.iushrn(t, i, h)
            }, n.prototype.shln = function(t) {
                return this.clone().ishln(t)
            }, n.prototype.ushln = function(t) {
                return this.clone().iushln(t)
            }, n.prototype.shrn = function(t) {
                return this.clone().ishrn(t)
            }, n.prototype.ushrn = function(t) {
                return this.clone().iushrn(t)
            }, n.prototype.testn = function(t) {
                r("number" == typeof t && t >= 0);
                var i = t % 26,
                    h = (t - i) / 26,
                    n = 1 << i;
                return !(this.length <= h) && !!(this.words[h] & n)
            }, n.prototype.imaskn = function(t) {
                r("number" == typeof t && t >= 0);
                var i = t % 26,
                    h = (t - i) / 26;
                if (r(0 === this.negative, "imaskn works only with positive numbers"), this.length <= h) return this;
                if (0 !== i && h++, this.length = Math.min(h, this.length), 0 !== i) {
                    var n = 67108863 ^ 67108863 >>> i << i;
                    this.words[this.length - 1] &= n
                }
                return this.strip()
            }, n.prototype.maskn = function(t) {
                return this.clone().imaskn(t)
            }, n.prototype.iaddn = function(t) {
                return r("number" == typeof t), r(t < 67108864), t < 0 ? this.isubn(-t) : 0 !== this.negative ? 1 === this.length && (0 | this.words[0]) < t ? (this.words[0] = t - (0 | this.words[0]), this.negative = 0, this) : (this.negative = 0, this.isubn(t), this.negative = 1, this) : this._iaddn(t)
            }, n.prototype._iaddn = function(t) {
                this.words[0] += t;
                for (var i = 0; i < this.length && this.words[i] >= 67108864; i++) this.words[i] -= 67108864, i === this.length - 1 ? this.words[i + 1] = 1 : this.words[i + 1]++;
                return this.length = Math.max(this.length, i + 1), this
            }, n.prototype.isubn = function(t) {
                if (r("number" == typeof t), r(t < 67108864), t < 0) return this.iaddn(-t);
                if (0 !== this.negative) return this.negative = 0, this.iaddn(t), this.negative = 1, this;
                if (this.words[0] -= t, 1 === this.length && this.words[0] < 0) this.words[0] = -this.words[0], this.negative = 1;
                else
                    for (var i = 0; i < this.length && this.words[i] < 0; i++) this.words[i] += 67108864, this.words[i + 1] -= 1;
                return this.strip()
            }, n.prototype.addn = function(t) {
                return this.clone().iaddn(t)
            }, n.prototype.subn = function(t) {
                return this.clone().isubn(t)
            }, n.prototype.iabs = function() {
                return this.negative = 0, this
            }, n.prototype.abs = function() {
                return this.clone().iabs()
            }, n.prototype._ishlnsubmul = function(t, i, h) {
                var n, e, o = t.length + h;
                this._expand(o);
                var s = 0;
                for (n = 0; n < t.length; n++) {
                    e = (0 | this.words[n + h]) + s;
                    var u = (0 | t.words[n]) * i;
                    s = ((e -= 67108863 & u) >> 26) - (u / 67108864 | 0), this.words[n + h] = 67108863 & e
                }
                for (; n < this.length - h; n++) s = (e = (0 | this.words[n + h]) + s) >> 26, this.words[n + h] = 67108863 & e;
                if (0 === s) return this.strip();
                for (r(-1 === s), s = 0, n = 0; n < this.length; n++) s = (e = -(0 | this.words[n]) + s) >> 26, this.words[n] = 67108863 & e;
                return this.negative = 1, this.strip()
            }, n.prototype._wordDiv = function(t, i) {
                var r = (this.length, t.length),
                    h = this.clone(),
                    e = t,
                    o = 0 | e.words[e.length - 1];
                0 !== (r = 26 - this._countBits(o)) && (e = e.ushln(r), h.iushln(r), o = 0 | e.words[e.length - 1]);
                var s, u = h.length - e.length;
                if ("mod" !== i) {
                    (s = new n(null)).length = u + 1, s.words = new Array(s.length);
                    for (var a = 0; a < s.length; a++) s.words[a] = 0
                }
                var l = h.clone()._ishlnsubmul(e, 1, u);
                0 === l.negative && (h = l, s && (s.words[u] = 1));
                for (var m = u - 1; m >= 0; m--) {
                    var f = 67108864 * (0 | h.words[e.length + m]) + (0 | h.words[e.length + m - 1]);
                    for (f = Math.min(f / o | 0, 67108863), h._ishlnsubmul(e, f, m); 0 !== h.negative;) f--, h.negative = 0, h._ishlnsubmul(e, 1, m), h.isZero() || (h.negative ^= 1);
                    s && (s.words[m] = f)
                }
                return s && s.strip(), h.strip(), "div" !== i && 0 !== r && h.iushrn(r), {
                    div: s || null,
                    mod: h
                }
            }, n.prototype.divmod = function(t, i, h) {
                return r(!t.isZero()), this.isZero() ? {
                    div: new n(0),
                    mod: new n(0)
                } : 0 !== this.negative && 0 === t.negative ? (s = this.neg().divmod(t, i), "mod" !== i && (e = s.div.neg()), "div" !== i && (o = s.mod.neg(), h && 0 !== o.negative && o.iadd(t)), {
                    div: e,
                    mod: o
                }) : 0 === this.negative && 0 !== t.negative ? (s = this.divmod(t.neg(), i), "mod" !== i && (e = s.div.neg()), {
                    div: e,
                    mod: s.mod
                }) : 0 != (this.negative & t.negative) ? (s = this.neg().divmod(t.neg(), i), "div" !== i && (o = s.mod.neg(), h && 0 !== o.negative && o.isub(t)), {
                    div: s.div,
                    mod: o
                }) : t.length > this.length || this.cmp(t) < 0 ? {
                    div: new n(0),
                    mod: this
                } : 1 === t.length ? "div" === i ? {
                    div: this.divn(t.words[0]),
                    mod: null
                } : "mod" === i ? {
                    div: null,
                    mod: new n(this.modn(t.words[0]))
                } : {
                    div: this.divn(t.words[0]),
                    mod: new n(this.modn(t.words[0]))
                } : this._wordDiv(t, i);
                var e, o, s
            }, n.prototype.div = function(t) {
                return this.divmod(t, "div", !1).div
            }, n.prototype.mod = function(t) {
                return this.divmod(t, "mod", !1).mod
            }, n.prototype.umod = function(t) {
                return this.divmod(t, "mod", !0).mod
            }, n.prototype.divRound = function(t) {
                var i = this.divmod(t);
                if (i.mod.isZero()) return i.div;
                var r = 0 !== i.div.negative ? i.mod.isub(t) : i.mod,
                    h = t.ushrn(1),
                    n = t.andln(1),
                    e = r.cmp(h);
                return e < 0 || 1 === n && 0 === e ? i.div : 0 !== i.div.negative ? i.div.isubn(1) : i.div.iaddn(1)
            }, n.prototype.modn = function(t) {
                r(t <= 67108863);
                for (var i = (1 << 26) % t, h = 0, n = this.length - 1; n >= 0; n--) h = (i * h + (0 | this.words[n])) % t;
                return h
            }, n.prototype.idivn = function(t) {
                r(t <= 67108863);
                for (var i = 0, h = this.length - 1; h >= 0; h--) {
                    var n = (0 | this.words[h]) + 67108864 * i;
                    this.words[h] = n / t | 0, i = n % t
                }
                return this.strip()
            }, n.prototype.divn = function(t) {
                return this.clone().idivn(t)
            }, n.prototype.egcd = function(t) {
                r(0 === t.negative), r(!t.isZero());
                var i = this,
                    h = t.clone();
                i = 0 !== i.negative ? i.umod(t) : i.clone();
                for (var e = new n(1), o = new n(0), s = new n(0), u = new n(1), a = 0; i.isEven() && h.isEven();) i.iushrn(1), h.iushrn(1), ++a;
                for (var l = h.clone(), m = i.clone(); !i.isZero();) {
                    for (var f = 0, d = 1; 0 == (i.words[0] & d) && f < 26; ++f, d <<= 1);
                    if (f > 0)
                        for (i.iushrn(f); f-- > 0;)(e.isOdd() || o.isOdd()) && (e.iadd(l), o.isub(m)), e.iushrn(1), o.iushrn(1);
                    for (var p = 0, M = 1; 0 == (h.words[0] & M) && p < 26; ++p, M <<= 1);
                    if (p > 0)
                        for (h.iushrn(p); p-- > 0;)(s.isOdd() || u.isOdd()) && (s.iadd(l), u.isub(m)), s.iushrn(1), u.iushrn(1);
                    i.cmp(h) >= 0 ? (i.isub(h), e.isub(s), o.isub(u)) : (h.isub(i), s.isub(e), u.isub(o))
                }
                return {
                    a: s,
                    b: u,
                    gcd: h.iushln(a)
                }
            }, n.prototype._invmp = function(t) {
                r(0 === t.negative), r(!t.isZero());
                var i = this,
                    h = t.clone();
                i = 0 !== i.negative ? i.umod(t) : i.clone();
                for (var e, o = new n(1), s = new n(0), u = h.clone(); i.cmpn(1) > 0 && h.cmpn(1) > 0;) {
                    for (var a = 0, l = 1; 0 == (i.words[0] & l) && a < 26; ++a, l <<= 1);
                    if (a > 0)
                        for (i.iushrn(a); a-- > 0;) o.isOdd() && o.iadd(u), o.iushrn(1);
                    for (var m = 0, f = 1; 0 == (h.words[0] & f) && m < 26; ++m, f <<= 1);
                    if (m > 0)
                        for (h.iushrn(m); m-- > 0;) s.isOdd() && s.iadd(u), s.iushrn(1);
                    i.cmp(h) >= 0 ? (i.isub(h), o.isub(s)) : (h.isub(i), s.isub(o))
                }
                return (e = 0 === i.cmpn(1) ? o : s).cmpn(0) < 0 && e.iadd(t), e
            }, n.prototype.gcd = function(t) {
                if (this.isZero()) return t.abs();
                if (t.isZero()) return this.abs();
                var i = this.clone(),
                    r = t.clone();
                i.negative = 0, r.negative = 0;
                for (var h = 0; i.isEven() && r.isEven(); h++) i.iushrn(1), r.iushrn(1);
                for (;;) {
                    for (; i.isEven();) i.iushrn(1);
                    for (; r.isEven();) r.iushrn(1);
                    var n = i.cmp(r);
                    if (n < 0) {
                        var e = i;
                        i = r, r = e
                    } else if (0 === n || 0 === r.cmpn(1)) break;
                    i.isub(r)
                }
                return r.iushln(h)
            }, n.prototype.invm = function(t) {
                return this.egcd(t).a.umod(t)
            }, n.prototype.isEven = function() {
                return 0 == (1 & this.words[0])
            }, n.prototype.isOdd = function() {
                return 1 == (1 & this.words[0])
            }, n.prototype.andln = function(t) {
                return this.words[0] & t
            }, n.prototype.bincn = function(t) {
                r("number" == typeof t);
                var i = t % 26,
                    h = (t - i) / 26,
                    n = 1 << i;
                if (this.length <= h) return this._expand(h + 1), this.words[h] |= n, this;
                for (var e = n, o = h; 0 !== e && o < this.length; o++) {
                    var s = 0 | this.words[o];
                    e = (s += e) >>> 26, s &= 67108863, this.words[o] = s
                }
                return 0 !== e && (this.words[o] = e, this.length++), this
            }, n.prototype.isZero = function() {
                return 1 === this.length && 0 === this.words[0]
            }, n.prototype.cmpn = function(t) {
                var i, h = t < 0;
                if (0 !== this.negative && !h) return -1;
                if (0 === this.negative && h) return 1;
                if (this.strip(), this.length > 1) i = 1;
                else {
                    h && (t = -t), r(t <= 67108863, "Number is too big");
                    var n = 0 | this.words[0];
                    i = n === t ? 0 : n < t ? -1 : 1
                }
                return 0 !== this.negative ? 0 | -i : i
            }, n.prototype.cmp = function(t) {
                if (0 !== this.negative && 0 === t.negative) return -1;
                if (0 === this.negative && 0 !== t.negative) return 1;
                var i = this.ucmp(t);
                return 0 !== this.negative ? 0 | -i : i
            }, n.prototype.ucmp = function(t) {
                if (this.length > t.length) return 1;
                if (this.length < t.length) return -1;
                for (var i = 0, r = this.length - 1; r >= 0; r--) {
                    var h = 0 | this.words[r],
                        n = 0 | t.words[r];
                    if (h !== n) {
                        h < n ? i = -1 : h > n && (i = 1);
                        break
                    }
                }
                return i
            }, n.prototype.gtn = function(t) {
                return 1 === this.cmpn(t)
            }, n.prototype.gt = function(t) {
                return 1 === this.cmp(t)
            }, n.prototype.gten = function(t) {
                return this.cmpn(t) >= 0
            }, n.prototype.gte = function(t) {
                return this.cmp(t) >= 0
            }, n.prototype.ltn = function(t) {
                return -1 === this.cmpn(t)
            }, n.prototype.lt = function(t) {
                return -1 === this.cmp(t)
            }, n.prototype.lten = function(t) {
                return this.cmpn(t) <= 0
            }, n.prototype.lte = function(t) {
                return this.cmp(t) <= 0
            }, n.prototype.eqn = function(t) {
                return 0 === this.cmpn(t)
            }, n.prototype.eq = function(t) {
                return 0 === this.cmp(t)
            }, n.red = function(t) {
                return new b(t)
            }, n.prototype.toRed = function(t) {
                return r(!this.red, "Already a number in reduction context"), r(0 === this.negative, "red works only with positives"), t.convertTo(this)._forceRed(t)
            }, n.prototype.fromRed = function() {
                return r(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this)
            }, n.prototype._forceRed = function(t) {
                return this.red = t, this
            }, n.prototype.forceRed = function(t) {
                return r(!this.red, "Already a number in reduction context"), this._forceRed(t)
            }, n.prototype.redAdd = function(t) {
                return r(this.red, "redAdd works only with red numbers"), this.red.add(this, t)
            }, n.prototype.redIAdd = function(t) {
                return r(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, t)
            }, n.prototype.redSub = function(t) {
                return r(this.red, "redSub works only with red numbers"), this.red.sub(this, t)
            }, n.prototype.redISub = function(t) {
                return r(this.red, "redISub works only with red numbers"), this.red.isub(this, t)
            }, n.prototype.redShl = function(t) {
                return r(this.red, "redShl works only with red numbers"), this.red.shl(this, t)
            }, n.prototype.redMul = function(t) {
                return r(this.red, "redMul works only with red numbers"), this.red._verify2(this, t), this.red.mul(this, t)
            }, n.prototype.redIMul = function(t) {
                return r(this.red, "redMul works only with red numbers"), this.red._verify2(this, t), this.red.imul(this, t)
            }, n.prototype.redSqr = function() {
                return r(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this.red.sqr(this)
            }, n.prototype.redISqr = function() {
                return r(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this.red.isqr(this)
            }, n.prototype.redSqrt = function() {
                return r(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this.red.sqrt(this)
            }, n.prototype.redInvm = function() {
                return r(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this.red.invm(this)
            }, n.prototype.redNeg = function() {
                return r(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this.red.neg(this)
            }, n.prototype.redPow = function(t) {
                return r(this.red && !t.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, t)
            };
            var M = {
                k256: null,
                p224: null,
                p192: null,
                p25519: null
            };

            function v(t, i) {
                this.name = t, this.p = new n(i, 16), this.n = this.p.bitLength(), this.k = new n(1).iushln(this.n).isub(this.p), this.tmp = this._tmp()
            }

            function g() {
                v.call(this, "k256", "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f")
            }

            function c() {
                v.call(this, "p224", "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001")
            }

            function w() {
                v.call(this, "p192", "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff")
            }

            function y() {
                v.call(this, "25519", "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed")
            }

            function b(t) {
                if ("string" == typeof t) {
                    var i = n._prime(t);
                    this.m = i.p, this.prime = i
                } else r(t.gtn(1), "modulus must be greater than 1"), this.m = t, this.prime = null
            }

            function _(t) {
                b.call(this, t), this.shift = this.m.bitLength(), this.shift % 26 != 0 && (this.shift += 26 - this.shift % 26), this.r = new n(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv)
            }
            v.prototype._tmp = function() {
                var t = new n(null);
                return t.words = new Array(Math.ceil(this.n / 13)), t
            }, v.prototype.ireduce = function(t) {
                var i, r = t;
                do {
                    this.split(r, this.tmp), i = (r = (r = this.imulK(r)).iadd(this.tmp)).bitLength()
                } while (i > this.n);
                var h = i < this.n ? -1 : r.ucmp(this.p);
                return 0 === h ? (r.words[0] = 0, r.length = 1) : h > 0 ? r.isub(this.p) : void 0 !== r.strip ? r.strip() : r._strip(), r
            }, v.prototype.split = function(t, i) {
                t.iushrn(this.n, 0, i)
            }, v.prototype.imulK = function(t) {
                return t.imul(this.k)
            }, h(g, v), g.prototype.split = function(t, i) {
                for (var r = Math.min(t.length, 9), h = 0; h < r; h++) i.words[h] = t.words[h];
                if (i.length = r, t.length <= 9) return t.words[0] = 0, void(t.length = 1);
                var n = t.words[9];
                for (i.words[i.length++] = 4194303 & n, h = 10; h < t.length; h++) {
                    var e = 0 | t.words[h];
                    t.words[h - 10] = (4194303 & e) << 4 | n >>> 22, n = e
                }
                n >>>= 22, t.words[h - 10] = n, 0 === n && t.length > 10 ? t.length -= 10 : t.length -= 9
            }, g.prototype.imulK = function(t) {
                t.words[t.length] = 0, t.words[t.length + 1] = 0, t.length += 2;
                for (var i = 0, r = 0; r < t.length; r++) {
                    var h = 0 | t.words[r];
                    i += 977 * h, t.words[r] = 67108863 & i, i = 64 * h + (i / 67108864 | 0)
                }
                return 0 === t.words[t.length - 1] && (t.length--, 0 === t.words[t.length - 1] && t.length--), t
            }, h(c, v), h(w, v), h(y, v), y.prototype.imulK = function(t) {
                for (var i = 0, r = 0; r < t.length; r++) {
                    var h = 19 * (0 | t.words[r]) + i,
                        n = 67108863 & h;
                    h >>>= 26, t.words[r] = n, i = h
                }
                return 0 !== i && (t.words[t.length++] = i), t
            }, n._prime = function(t) {
                if (M[t]) return M[t];
                var i;
                if ("k256" === t) i = new g;
                else if ("p224" === t) i = new c;
                else if ("p192" === t) i = new w;
                else {
                    if ("p25519" !== t) throw new Error("Unknown prime " + t);
                    i = new y
                }
                return M[t] = i, i
            }, b.prototype._verify1 = function(t) {
                r(0 === t.negative, "red works only with positives"), r(t.red, "red works only with red numbers")
            }, b.prototype._verify2 = function(t, i) {
                r(0 == (t.negative | i.negative), "red works only with positives"), r(t.red && t.red === i.red, "red works only with red numbers")
            }, b.prototype.imod = function(t) {
                return this.prime ? this.prime.ireduce(t)._forceRed(this) : t.umod(this.m)._forceRed(this)
            }, b.prototype.neg = function(t) {
                return t.isZero() ? t.clone() : this.m.sub(t)._forceRed(this)
            }, b.prototype.add = function(t, i) {
                this._verify2(t, i);
                var r = t.add(i);
                return r.cmp(this.m) >= 0 && r.isub(this.m), r._forceRed(this)
            }, b.prototype.iadd = function(t, i) {
                this._verify2(t, i);
                var r = t.iadd(i);
                return r.cmp(this.m) >= 0 && r.isub(this.m), r
            }, b.prototype.sub = function(t, i) {
                this._verify2(t, i);
                var r = t.sub(i);
                return r.cmpn(0) < 0 && r.iadd(this.m), r._forceRed(this)
            }, b.prototype.isub = function(t, i) {
                this._verify2(t, i);
                var r = t.isub(i);
                return r.cmpn(0) < 0 && r.iadd(this.m), r
            }, b.prototype.shl = function(t, i) {
                return this._verify1(t), this.imod(t.ushln(i))
            }, b.prototype.imul = function(t, i) {
                return this._verify2(t, i), this.imod(t.imul(i))
            }, b.prototype.mul = function(t, i) {
                return this._verify2(t, i), this.imod(t.mul(i))
            }, b.prototype.isqr = function(t) {
                return this.imul(t, t.clone())
            }, b.prototype.sqr = function(t) {
                return this.mul(t, t)
            }, b.prototype.sqrt = function(t) {
                if (t.isZero()) return t.clone();
                var i = this.m.andln(3);
                if (r(i % 2 == 1), 3 === i) {
                    var h = this.m.add(new n(1)).iushrn(2);
                    return this.pow(t, h)
                }
                for (var e = this.m.subn(1), o = 0; !e.isZero() && 0 === e.andln(1);) o++, e.iushrn(1);
                r(!e.isZero());
                var s = new n(1).toRed(this),
                    u = s.redNeg(),
                    a = this.m.subn(1).iushrn(1),
                    l = this.m.bitLength();
                for (l = new n(2 * l * l).toRed(this); 0 !== this.pow(l, a).cmp(u);) l.redIAdd(u);
                for (var m = this.pow(l, e), f = this.pow(t, e.addn(1).iushrn(1)), d = this.pow(t, e), p = o; 0 !== d.cmp(s);) {
                    for (var M = d, v = 0; 0 !== M.cmp(s); v++) M = M.redSqr();
                    r(v < p);
                    var g = this.pow(m, new n(1).iushln(p - v - 1));
                    f = f.redMul(g), m = g.redSqr(), d = d.redMul(m), p = v
                }
                return f
            }, b.prototype.invm = function(t) {
                var i = t._invmp(this.m);
                return 0 !== i.negative ? (i.negative = 0, this.imod(i).redNeg()) : this.imod(i)
            }, b.prototype.pow = function(t, i) {
                if (i.isZero()) return new n(1).toRed(this);
                if (0 === i.cmpn(1)) return t.clone();
                var r = new Array(16);
                r[0] = new n(1).toRed(this), r[1] = t;
                for (var h = 2; h < r.length; h++) r[h] = this.mul(r[h - 1], t);
                var e = r[0],
                    o = 0,
                    s = 0,
                    u = i.bitLength() % 26;
                for (0 === u && (u = 26), h = i.length - 1; h >= 0; h--) {
                    for (var a = i.words[h], l = u - 1; l >= 0; l--) {
                        var m = a >> l & 1;
                        e !== r[0] && (e = this.sqr(e)), 0 !== m || 0 !== o ? (o <<= 1, o |= m, (4 === ++s || 0 === h && 0 === l) && (e = this.mul(e, r[o]), s = 0, o = 0)) : s = 0
                    }
                    u = 26
                }
                return e
            }, b.prototype.convertTo = function(t) {
                var i = t.umod(this.m);
                return i === t ? i.clone() : i
            }, b.prototype.convertFrom = function(t) {
                var i = t.clone();
                return i.red = null, i
            }, n.mont = function(t) {
                return new _(t)
            }, h(_, b), _.prototype.convertTo = function(t) {
                return this.imod(t.ushln(this.shift))
            }, _.prototype.convertFrom = function(t) {
                var i = this.imod(t.mul(this.rinv));
                return i.red = null, i
            }, _.prototype.imul = function(t, i) {
                if (t.isZero() || i.isZero()) return t.words[0] = 0, t.length = 1, t;
                var r = t.imul(i),
                    h = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
                    n = r.isub(h).iushrn(this.shift),
                    e = n;
                return n.cmp(this.m) >= 0 ? e = n.isub(this.m) : n.cmpn(0) < 0 && (e = n.iadd(this.m)), e._forceRed(this)
            }, _.prototype.mul = function(t, i) {
                if (t.isZero() || i.isZero()) return new n(0)._forceRed(this);
                var r = t.mul(i),
                    h = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
                    e = r.isub(h).iushrn(this.shift),
                    o = e;
                return e.cmp(this.m) >= 0 ? o = e.isub(this.m) : e.cmpn(0) < 0 && (o = e.iadd(this.m)), o._forceRed(this)
            }, _.prototype.invm = function(t) {
                return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this)
            }
        }("undefined" == typeof module || module, this);
    }, {
        "buffer": "jtu4"
    }],
    "tXM1": [function(require, module, exports) {
        function r(r, o) {
            if (!r) throw new Error(o || "Assertion failed")
        }
        module.exports = r, r.equal = function(r, o, e) {
            if (r != o) throw new Error(e || "Assertion failed: " + r + " != " + o)
        };
    }, {}],
    "K53u": [function(require, module, exports) {
        "use strict";
        var r = exports;

        function e(r, e) {
            if (Array.isArray(r)) return r.slice();
            if (!r) return [];
            var t = [];
            if ("string" != typeof r) {
                for (var n = 0; n < r.length; n++) t[n] = 0 | r[n];
                return t
            }
            if ("hex" === e) {
                (r = r.replace(/[^a-z0-9]+/gi, "")).length % 2 != 0 && (r = "0" + r);
                for (n = 0; n < r.length; n += 2) t.push(parseInt(r[n] + r[n + 1], 16))
            } else
                for (n = 0; n < r.length; n++) {
                    var o = r.charCodeAt(n),
                        u = o >> 8,
                        i = 255 & o;
                    u ? t.push(u, i) : t.push(i)
                }
            return t
        }

        function t(r) {
            return 1 === r.length ? "0" + r : r
        }

        function n(r) {
            for (var e = "", n = 0; n < r.length; n++) e += t(r[n].toString(16));
            return e
        }
        r.toArray = e, r.zero2 = t, r.toHex = n, r.encode = function(r, e) {
            return "hex" === e ? n(r) : r
        };
    }, {}],
    "THL6": [function(require, module, exports) {
        "use strict";
        var r = exports,
            n = require("bn.js"),
            e = require("minimalistic-assert"),
            t = require("minimalistic-crypto-utils");

        function i(r, n, e) {
            var t = new Array(Math.max(r.bitLength(), e) + 1);
            t.fill(0);
            for (var i = 1 << n + 1, o = r.clone(), s = 0; s < t.length; s++) {
                var a, u = o.andln(i - 1);
                o.isOdd() ? (a = u > (i >> 1) - 1 ? (i >> 1) - u : u, o.isubn(a)) : a = 0, t[s] = a, o.iushrn(1)
            }
            return t
        }

        function o(r, n) {
            var e = [
                [],
                []
            ];
            r = r.clone(), n = n.clone();
            for (var t = 0, i = 0; r.cmpn(-t) > 0 || n.cmpn(-i) > 0;) {
                var o, s, a, u = r.andln(3) + t & 3,
                    c = n.andln(3) + i & 3;
                if (3 === u && (u = -1), 3 === c && (c = -1), 0 == (1 & u)) o = 0;
                else o = 3 !== (a = r.andln(7) + t & 7) && 5 !== a || 2 !== c ? u : -u;
                if (e[0].push(o), 0 == (1 & c)) s = 0;
                else s = 3 !== (a = n.andln(7) + i & 7) && 5 !== a || 2 !== u ? c : -c;
                e[1].push(s), 2 * t === o + 1 && (t = 1 - t), 2 * i === s + 1 && (i = 1 - i), r.iushrn(1), n.iushrn(1)
            }
            return e
        }

        function s(r, n, e) {
            var t = "_" + n;
            r.prototype[n] = function() {
                return void 0 !== this[t] ? this[t] : this[t] = e.call(this)
            }
        }

        function a(n) {
            return "string" == typeof n ? r.toArray(n, "hex") : n
        }

        function u(r) {
            return new n(r, "hex", "le")
        }
        r.assert = e, r.toArray = t.toArray, r.zero2 = t.zero2, r.toHex = t.toHex, r.encode = t.encode, r.getNAF = i, r.getJSF = o, r.cachedProperty = s, r.parseBytes = a, r.intFromLE = u;
    }, {
        "bn.js": "VOEF",
        "minimalistic-assert": "tXM1",
        "minimalistic-crypto-utils": "K53u"
    }],
    "gjcq": [function(require, module, exports) {
        var t;

        function e(t) {
            this.rand = t
        }
        if (module.exports = function(r) {
                return t || (t = new e(null)), t.generate(r)
            }, module.exports.Rand = e, e.prototype.generate = function(t) {
                return this._rand(t)
            }, e.prototype._rand = function(t) {
                if (this.rand.getBytes) return this.rand.getBytes(t);
                for (var e = new Uint8Array(t), r = 0; r < e.length; r++) e[r] = this.rand.getByte();
                return e
            }, "object" == typeof self) self.crypto && self.crypto.getRandomValues ? e.prototype._rand = function(t) {
            var e = new Uint8Array(t);
            return self.crypto.getRandomValues(e), e
        } : self.msCrypto && self.msCrypto.getRandomValues ? e.prototype._rand = function(t) {
            var e = new Uint8Array(t);
            return self.msCrypto.getRandomValues(e), e
        } : "object" == typeof window && (e.prototype._rand = function() {
            throw new Error("Not implemented yet")
        });
        else try {
            var r = require("crypto");
            if ("function" != typeof r.randomBytes) throw new Error("Not supported");
            e.prototype._rand = function(t) {
                return r.randomBytes(t)
            }
        } catch (n) {}
    }, {
        "crypto": "jtu4"
    }],
    "mMXE": [function(require, module, exports) {
        "use strict";
        var t = require("bn.js"),
            e = require("../utils"),
            n = e.getNAF,
            r = e.getJSF,
            i = e.assert;

        function o(e, n) {
            this.type = e, this.p = new t(n.p, 16), this.red = n.prime ? t.red(n.prime) : t.mont(this.p), this.zero = new t(0).toRed(this.red), this.one = new t(1).toRed(this.red), this.two = new t(2).toRed(this.red), this.n = n.n && new t(n.n, 16), this.g = n.g && this.pointFromJSON(n.g, n.gRed), this._wnafT1 = new Array(4), this._wnafT2 = new Array(4), this._wnafT3 = new Array(4), this._wnafT4 = new Array(4), this._bitLength = this.n ? this.n.bitLength() : 0;
            var r = this.n && this.p.div(this.n);
            !r || r.cmpn(100) > 0 ? this.redN = null : (this._maxwellTrick = !0, this.redN = this.n.toRed(this.red))
        }

        function s(t, e) {
            this.curve = t, this.type = e, this.precomputed = null
        }
        module.exports = o, o.prototype.point = function() {
            throw new Error("Not implemented")
        }, o.prototype.validate = function() {
            throw new Error("Not implemented")
        }, o.prototype._fixedNafMul = function(t, e) {
            i(t.precomputed);
            var r = t._getDoubles(),
                o = n(e, 1, this._bitLength),
                s = (1 << r.step + 1) - (r.step % 2 == 0 ? 2 : 1);
            s /= 3;
            for (var p = [], h = 0; h < o.length; h += r.step) {
                var d = 0;
                for (e = h + r.step - 1; e >= h; e--) d = (d << 1) + o[e];
                p.push(d)
            }
            for (var u = this.jpoint(null, null, null), a = this.jpoint(null, null, null), l = s; l > 0; l--) {
                for (h = 0; h < p.length; h++) {
                    (d = p[h]) === l ? a = a.mixedAdd(r.points[h]) : d === -l && (a = a.mixedAdd(r.points[h].neg()))
                }
                u = u.add(a)
            }
            return u.toP()
        }, o.prototype._wnafMul = function(t, e) {
            var r = 4,
                o = t._getNAFPoints(r);
            r = o.wnd;
            for (var s = o.points, p = n(e, r, this._bitLength), h = this.jpoint(null, null, null), d = p.length - 1; d >= 0; d--) {
                for (e = 0; d >= 0 && 0 === p[d]; d--) e++;
                if (d >= 0 && e++, h = h.dblp(e), d < 0) break;
                var u = p[d];
                i(0 !== u), h = "affine" === t.type ? u > 0 ? h.mixedAdd(s[u - 1 >> 1]) : h.mixedAdd(s[-u - 1 >> 1].neg()) : u > 0 ? h.add(s[u - 1 >> 1]) : h.add(s[-u - 1 >> 1].neg())
            }
            return "affine" === t.type ? h.toP() : h
        }, o.prototype._wnafMulAdd = function(t, e, i, o, s) {
            for (var p = this._wnafT1, h = this._wnafT2, d = this._wnafT3, u = 0, a = 0; a < o; a++) {
                var l = (L = e[a])._getNAFPoints(t);
                p[a] = l.wnd, h[a] = l.points
            }
            for (a = o - 1; a >= 1; a -= 2) {
                var f = a - 1,
                    c = a;
                if (1 === p[f] && 1 === p[c]) {
                    var g = [e[f], null, null, e[c]];
                    0 === e[f].y.cmp(e[c].y) ? (g[1] = e[f].add(e[c]), g[2] = e[f].toJ().mixedAdd(e[c].neg())) : 0 === e[f].y.cmp(e[c].y.redNeg()) ? (g[1] = e[f].toJ().mixedAdd(e[c]), g[2] = e[f].add(e[c].neg())) : (g[1] = e[f].toJ().mixedAdd(e[c]), g[2] = e[f].toJ().mixedAdd(e[c].neg()));
                    var m = [-3, -1, -5, -7, 0, 7, 5, 1, 3],
                        y = r(i[f], i[c]);
                    u = Math.max(y[0].length, u), d[f] = new Array(u), d[c] = new Array(u);
                    for (var v = 0; v < u; v++) {
                        var w = 0 | y[0][v],
                            b = 0 | y[1][v];
                        d[f][v] = m[3 * (w + 1) + (b + 1)], d[c][v] = 0, h[f] = g
                    }
                } else d[f] = n(i[f], p[f], this._bitLength), d[c] = n(i[c], p[c], this._bitLength), u = Math.max(d[f].length, u), u = Math.max(d[c].length, u)
            }
            var _ = this.jpoint(null, null, null),
                A = this._wnafT4;
            for (a = u; a >= 0; a--) {
                for (var x = 0; a >= 0;) {
                    var N = !0;
                    for (v = 0; v < o; v++) A[v] = 0 | d[v][a], 0 !== A[v] && (N = !1);
                    if (!N) break;
                    x++, a--
                }
                if (a >= 0 && x++, _ = _.dblp(x), a < 0) break;
                for (v = 0; v < o; v++) {
                    var L, P = A[v];
                    0 !== P && (P > 0 ? L = h[v][P - 1 >> 1] : P < 0 && (L = h[v][-P - 1 >> 1].neg()), _ = "affine" === L.type ? _.mixedAdd(L) : _.add(L))
                }
            }
            for (a = 0; a < o; a++) h[a] = null;
            return s ? _ : _.toP()
        }, o.BasePoint = s, s.prototype.eq = function() {
            throw new Error("Not implemented")
        }, s.prototype.validate = function() {
            return this.curve.validate(this)
        }, o.prototype.decodePoint = function(t, n) {
            t = e.toArray(t, n);
            var r = this.p.byteLength();
            if ((4 === t[0] || 6 === t[0] || 7 === t[0]) && t.length - 1 == 2 * r) return 6 === t[0] ? i(t[t.length - 1] % 2 == 0) : 7 === t[0] && i(t[t.length - 1] % 2 == 1), this.point(t.slice(1, 1 + r), t.slice(1 + r, 1 + 2 * r));
            if ((2 === t[0] || 3 === t[0]) && t.length - 1 === r) return this.pointFromX(t.slice(1, 1 + r), 3 === t[0]);
            throw new Error("Unknown point format")
        }, s.prototype.encodeCompressed = function(t) {
            return this.encode(t, !0)
        }, s.prototype._encode = function(t) {
            var e = this.curve.p.byteLength(),
                n = this.getX().toArray("be", e);
            return t ? [this.getY().isEven() ? 2 : 3].concat(n) : [4].concat(n, this.getY().toArray("be", e))
        }, s.prototype.encode = function(t, n) {
            return e.encode(this._encode(n), t)
        }, s.prototype.precompute = function(t) {
            if (this.precomputed) return this;
            var e = {
                doubles: null,
                naf: null,
                beta: null
            };
            return e.naf = this._getNAFPoints(8), e.doubles = this._getDoubles(4, t), e.beta = this._getBeta(), this.precomputed = e, this
        }, s.prototype._hasDoubles = function(t) {
            if (!this.precomputed) return !1;
            var e = this.precomputed.doubles;
            return !!e && e.points.length >= Math.ceil((t.bitLength() + 1) / e.step)
        }, s.prototype._getDoubles = function(t, e) {
            if (this.precomputed && this.precomputed.doubles) return this.precomputed.doubles;
            for (var n = [this], r = this, i = 0; i < e; i += t) {
                for (var o = 0; o < t; o++) r = r.dbl();
                n.push(r)
            }
            return {
                step: t,
                points: n
            }
        }, s.prototype._getNAFPoints = function(t) {
            if (this.precomputed && this.precomputed.naf) return this.precomputed.naf;
            for (var e = [this], n = (1 << t) - 1, r = 1 === n ? null : this.dbl(), i = 1; i < n; i++) e[i] = e[i - 1].add(r);
            return {
                wnd: t,
                points: e
            }
        }, s.prototype._getBeta = function() {
            return null
        }, s.prototype.dblp = function(t) {
            for (var e = this, n = 0; n < t; n++) e = e.dbl();
            return e
        };
    }, {
        "bn.js": "VOEF",
        "../utils": "THL6"
    }],
    "wqxK": [function(require, module, exports) {
        "function" == typeof Object.create ? module.exports = function(t, e) {
            t.super_ = e, t.prototype = Object.create(e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            })
        } : module.exports = function(t, e) {
            t.super_ = e;
            var o = function() {};
            o.prototype = e.prototype, t.prototype = new o, t.prototype.constructor = t
        };
    }, {}],
    "XqLT": [function(require, module, exports) {
        "use strict";
        var r = require("../utils"),
            e = require("bn.js"),
            t = require("inherits"),
            d = require("./base"),
            i = r.assert;

        function n(r) {
            d.call(this, "short", r), this.a = new e(r.a, 16).toRed(this.red), this.b = new e(r.b, 16).toRed(this.red), this.tinv = this.two.redInvm(), this.zeroA = 0 === this.a.fromRed().cmpn(0), this.threeA = 0 === this.a.fromRed().sub(this.p).cmpn(-3), this.endo = this._getEndomorphism(r), this._endoWnafT1 = new Array(4), this._endoWnafT2 = new Array(4)
        }

        function u(r, t, i, n) {
            d.BasePoint.call(this, r, "affine"), null === t && null === i ? (this.x = null, this.y = null, this.inf = !0) : (this.x = new e(t, 16), this.y = new e(i, 16), n && (this.x.forceRed(this.curve.red), this.y.forceRed(this.curve.red)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.inf = !1)
        }

        function s(r, t, i, n) {
            d.BasePoint.call(this, r, "jacobian"), null === t && null === i && null === n ? (this.x = this.curve.one, this.y = this.curve.one, this.z = new e(0)) : (this.x = new e(t, 16), this.y = new e(i, 16), this.z = new e(n, 16)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)), this.zOne = this.z === this.curve.one
        }
        t(n, d), module.exports = n, n.prototype._getEndomorphism = function(r) {
            if (this.zeroA && this.g && this.n && 1 === this.p.modn(3)) {
                var t, d;
                if (r.beta) t = new e(r.beta, 16).toRed(this.red);
                else {
                    var n = this._getEndoRoots(this.p);
                    t = (t = n[0].cmp(n[1]) < 0 ? n[0] : n[1]).toRed(this.red)
                }
                if (r.lambda) d = new e(r.lambda, 16);
                else {
                    var u = this._getEndoRoots(this.n);
                    0 === this.g.mul(u[0]).x.cmp(this.g.x.redMul(t)) ? d = u[0] : (d = u[1], i(0 === this.g.mul(d).x.cmp(this.g.x.redMul(t))))
                }
                return {
                    beta: t,
                    lambda: d,
                    basis: r.basis ? r.basis.map(function(r) {
                        return {
                            a: new e(r.a, 16),
                            b: new e(r.b, 16)
                        }
                    }) : this._getEndoBasis(d)
                }
            }
        }, n.prototype._getEndoRoots = function(r) {
            var t = r === this.p ? this.red : e.mont(r),
                d = new e(2).toRed(t).redInvm(),
                i = d.redNeg(),
                n = new e(3).toRed(t).redNeg().redSqrt().redMul(d);
            return [i.redAdd(n).fromRed(), i.redSub(n).fromRed()]
        }, n.prototype._getEndoBasis = function(r) {
            for (var t, d, i, n, u, s, o, h, p, l = this.n.ushrn(Math.floor(this.n.bitLength() / 2)), a = r, f = this.n.clone(), c = new e(1), S = new e(0), b = new e(0), v = new e(1), I = 0; 0 !== a.cmpn(0);) {
                var y = f.div(a);
                h = f.sub(y.mul(a)), p = b.sub(y.mul(c));
                var A = v.sub(y.mul(S));
                if (!i && h.cmp(l) < 0) t = o.neg(), d = c, i = h.neg(), n = p;
                else if (i && 2 == ++I) break;
                o = h, f = a, a = h, b = c, c = p, v = S, S = A
            }
            u = h.neg(), s = p;
            var m = i.sqr().add(n.sqr());
            return u.sqr().add(s.sqr()).cmp(m) >= 0 && (u = t, s = d), i.negative && (i = i.neg(), n = n.neg()), u.negative && (u = u.neg(), s = s.neg()), [{
                a: i,
                b: n
            }, {
                a: u,
                b: s
            }]
        }, n.prototype._endoSplit = function(r) {
            var e = this.endo.basis,
                t = e[0],
                d = e[1],
                i = d.b.mul(r).divRound(this.n),
                n = t.b.neg().mul(r).divRound(this.n),
                u = i.mul(t.a),
                s = n.mul(d.a),
                o = i.mul(t.b),
                h = n.mul(d.b);
            return {
                k1: r.sub(u).sub(s),
                k2: o.add(h).neg()
            }
        }, n.prototype.pointFromX = function(r, t) {
            (r = new e(r, 16)).red || (r = r.toRed(this.red));
            var d = r.redSqr().redMul(r).redIAdd(r.redMul(this.a)).redIAdd(this.b),
                i = d.redSqrt();
            if (0 !== i.redSqr().redSub(d).cmp(this.zero)) throw new Error("invalid point");
            var n = i.fromRed().isOdd();
            return (t && !n || !t && n) && (i = i.redNeg()), this.point(r, i)
        }, n.prototype.validate = function(r) {
            if (r.inf) return !0;
            var e = r.x,
                t = r.y,
                d = this.a.redMul(e),
                i = e.redSqr().redMul(e).redIAdd(d).redIAdd(this.b);
            return 0 === t.redSqr().redISub(i).cmpn(0)
        }, n.prototype._endoWnafMulAdd = function(r, e, t) {
            for (var d = this._endoWnafT1, i = this._endoWnafT2, n = 0; n < r.length; n++) {
                var u = this._endoSplit(e[n]),
                    s = r[n],
                    o = s._getBeta();
                u.k1.negative && (u.k1.ineg(), s = s.neg(!0)), u.k2.negative && (u.k2.ineg(), o = o.neg(!0)), d[2 * n] = s, d[2 * n + 1] = o, i[2 * n] = u.k1, i[2 * n + 1] = u.k2
            }
            for (var h = this._wnafMulAdd(1, d, i, 2 * n, t), p = 0; p < 2 * n; p++) d[p] = null, i[p] = null;
            return h
        }, t(u, d.BasePoint), n.prototype.point = function(r, e, t) {
            return new u(this, r, e, t)
        }, n.prototype.pointFromJSON = function(r, e) {
            return u.fromJSON(this, r, e)
        }, u.prototype._getBeta = function() {
            if (this.curve.endo) {
                var r = this.precomputed;
                if (r && r.beta) return r.beta;
                var e = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
                if (r) {
                    var t = this.curve,
                        d = function(r) {
                            return t.point(r.x.redMul(t.endo.beta), r.y)
                        };
                    r.beta = e, e.precomputed = {
                        beta: null,
                        naf: r.naf && {
                            wnd: r.naf.wnd,
                            points: r.naf.points.map(d)
                        },
                        doubles: r.doubles && {
                            step: r.doubles.step,
                            points: r.doubles.points.map(d)
                        }
                    }
                }
                return e
            }
        }, u.prototype.toJSON = function() {
            return this.precomputed ? [this.x, this.y, this.precomputed && {
                doubles: this.precomputed.doubles && {
                    step: this.precomputed.doubles.step,
                    points: this.precomputed.doubles.points.slice(1)
                },
                naf: this.precomputed.naf && {
                    wnd: this.precomputed.naf.wnd,
                    points: this.precomputed.naf.points.slice(1)
                }
            }] : [this.x, this.y]
        }, u.fromJSON = function(r, e, t) {
            "string" == typeof e && (e = JSON.parse(e));
            var d = r.point(e[0], e[1], t);
            if (!e[2]) return d;

            function i(e) {
                return r.point(e[0], e[1], t)
            }
            var n = e[2];
            return d.precomputed = {
                beta: null,
                doubles: n.doubles && {
                    step: n.doubles.step,
                    points: [d].concat(n.doubles.points.map(i))
                },
                naf: n.naf && {
                    wnd: n.naf.wnd,
                    points: [d].concat(n.naf.points.map(i))
                }
            }, d
        }, u.prototype.inspect = function() {
            return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + ">"
        }, u.prototype.isInfinity = function() {
            return this.inf
        }, u.prototype.add = function(r) {
            if (this.inf) return r;
            if (r.inf) return this;
            if (this.eq(r)) return this.dbl();
            if (this.neg().eq(r)) return this.curve.point(null, null);
            if (0 === this.x.cmp(r.x)) return this.curve.point(null, null);
            var e = this.y.redSub(r.y);
            0 !== e.cmpn(0) && (e = e.redMul(this.x.redSub(r.x).redInvm()));
            var t = e.redSqr().redISub(this.x).redISub(r.x),
                d = e.redMul(this.x.redSub(t)).redISub(this.y);
            return this.curve.point(t, d)
        }, u.prototype.dbl = function() {
            if (this.inf) return this;
            var r = this.y.redAdd(this.y);
            if (0 === r.cmpn(0)) return this.curve.point(null, null);
            var e = this.curve.a,
                t = this.x.redSqr(),
                d = r.redInvm(),
                i = t.redAdd(t).redIAdd(t).redIAdd(e).redMul(d),
                n = i.redSqr().redISub(this.x.redAdd(this.x)),
                u = i.redMul(this.x.redSub(n)).redISub(this.y);
            return this.curve.point(n, u)
        }, u.prototype.getX = function() {
            return this.x.fromRed()
        }, u.prototype.getY = function() {
            return this.y.fromRed()
        }, u.prototype.mul = function(r) {
            return r = new e(r, 16), this.isInfinity() ? this : this._hasDoubles(r) ? this.curve._fixedNafMul(this, r) : this.curve.endo ? this.curve._endoWnafMulAdd([this], [r]) : this.curve._wnafMul(this, r)
        }, u.prototype.mulAdd = function(r, e, t) {
            var d = [this, e],
                i = [r, t];
            return this.curve.endo ? this.curve._endoWnafMulAdd(d, i) : this.curve._wnafMulAdd(1, d, i, 2)
        }, u.prototype.jmulAdd = function(r, e, t) {
            var d = [this, e],
                i = [r, t];
            return this.curve.endo ? this.curve._endoWnafMulAdd(d, i, !0) : this.curve._wnafMulAdd(1, d, i, 2, !0)
        }, u.prototype.eq = function(r) {
            return this === r || this.inf === r.inf && (this.inf || 0 === this.x.cmp(r.x) && 0 === this.y.cmp(r.y))
        }, u.prototype.neg = function(r) {
            if (this.inf) return this;
            var e = this.curve.point(this.x, this.y.redNeg());
            if (r && this.precomputed) {
                var t = this.precomputed,
                    d = function(r) {
                        return r.neg()
                    };
                e.precomputed = {
                    naf: t.naf && {
                        wnd: t.naf.wnd,
                        points: t.naf.points.map(d)
                    },
                    doubles: t.doubles && {
                        step: t.doubles.step,
                        points: t.doubles.points.map(d)
                    }
                }
            }
            return e
        }, u.prototype.toJ = function() {
            return this.inf ? this.curve.jpoint(null, null, null) : this.curve.jpoint(this.x, this.y, this.curve.one)
        }, t(s, d.BasePoint), n.prototype.jpoint = function(r, e, t) {
            return new s(this, r, e, t)
        }, s.prototype.toP = function() {
            if (this.isInfinity()) return this.curve.point(null, null);
            var r = this.z.redInvm(),
                e = r.redSqr(),
                t = this.x.redMul(e),
                d = this.y.redMul(e).redMul(r);
            return this.curve.point(t, d)
        }, s.prototype.neg = function() {
            return this.curve.jpoint(this.x, this.y.redNeg(), this.z)
        }, s.prototype.add = function(r) {
            if (this.isInfinity()) return r;
            if (r.isInfinity()) return this;
            var e = r.z.redSqr(),
                t = this.z.redSqr(),
                d = this.x.redMul(e),
                i = r.x.redMul(t),
                n = this.y.redMul(e.redMul(r.z)),
                u = r.y.redMul(t.redMul(this.z)),
                s = d.redSub(i),
                o = n.redSub(u);
            if (0 === s.cmpn(0)) return 0 !== o.cmpn(0) ? this.curve.jpoint(null, null, null) : this.dbl();
            var h = s.redSqr(),
                p = h.redMul(s),
                l = d.redMul(h),
                a = o.redSqr().redIAdd(p).redISub(l).redISub(l),
                f = o.redMul(l.redISub(a)).redISub(n.redMul(p)),
                c = this.z.redMul(r.z).redMul(s);
            return this.curve.jpoint(a, f, c)
        }, s.prototype.mixedAdd = function(r) {
            if (this.isInfinity()) return r.toJ();
            if (r.isInfinity()) return this;
            var e = this.z.redSqr(),
                t = this.x,
                d = r.x.redMul(e),
                i = this.y,
                n = r.y.redMul(e).redMul(this.z),
                u = t.redSub(d),
                s = i.redSub(n);
            if (0 === u.cmpn(0)) return 0 !== s.cmpn(0) ? this.curve.jpoint(null, null, null) : this.dbl();
            var o = u.redSqr(),
                h = o.redMul(u),
                p = t.redMul(o),
                l = s.redSqr().redIAdd(h).redISub(p).redISub(p),
                a = s.redMul(p.redISub(l)).redISub(i.redMul(h)),
                f = this.z.redMul(u);
            return this.curve.jpoint(l, a, f)
        }, s.prototype.dblp = function(r) {
            if (0 === r) return this;
            if (this.isInfinity()) return this;
            if (!r) return this.dbl();
            if (this.curve.zeroA || this.curve.threeA) {
                for (var e = this, t = 0; t < r; t++) e = e.dbl();
                return e
            }
            var d = this.curve.a,
                i = this.curve.tinv,
                n = this.x,
                u = this.y,
                s = this.z,
                o = s.redSqr().redSqr(),
                h = u.redAdd(u);
            for (t = 0; t < r; t++) {
                var p = n.redSqr(),
                    l = h.redSqr(),
                    a = l.redSqr(),
                    f = p.redAdd(p).redIAdd(p).redIAdd(d.redMul(o)),
                    c = n.redMul(l),
                    S = f.redSqr().redISub(c.redAdd(c)),
                    b = c.redISub(S),
                    v = f.redMul(b);
                v = v.redIAdd(v).redISub(a);
                var I = h.redMul(s);
                t + 1 < r && (o = o.redMul(a)), n = S, s = I, h = v
            }
            return this.curve.jpoint(n, h.redMul(i), s)
        }, s.prototype.dbl = function() {
            return this.isInfinity() ? this : this.curve.zeroA ? this._zeroDbl() : this.curve.threeA ? this._threeDbl() : this._dbl()
        }, s.prototype._zeroDbl = function() {
            var r, e, t;
            if (this.zOne) {
                var d = this.x.redSqr(),
                    i = this.y.redSqr(),
                    n = i.redSqr(),
                    u = this.x.redAdd(i).redSqr().redISub(d).redISub(n);
                u = u.redIAdd(u);
                var s = d.redAdd(d).redIAdd(d),
                    o = s.redSqr().redISub(u).redISub(u),
                    h = n.redIAdd(n);
                h = (h = h.redIAdd(h)).redIAdd(h), r = o, e = s.redMul(u.redISub(o)).redISub(h), t = this.y.redAdd(this.y)
            } else {
                var p = this.x.redSqr(),
                    l = this.y.redSqr(),
                    a = l.redSqr(),
                    f = this.x.redAdd(l).redSqr().redISub(p).redISub(a);
                f = f.redIAdd(f);
                var c = p.redAdd(p).redIAdd(p),
                    S = c.redSqr(),
                    b = a.redIAdd(a);
                b = (b = b.redIAdd(b)).redIAdd(b), r = S.redISub(f).redISub(f), e = c.redMul(f.redISub(r)).redISub(b), t = (t = this.y.redMul(this.z)).redIAdd(t)
            }
            return this.curve.jpoint(r, e, t)
        }, s.prototype._threeDbl = function() {
            var r, e, t;
            if (this.zOne) {
                var d = this.x.redSqr(),
                    i = this.y.redSqr(),
                    n = i.redSqr(),
                    u = this.x.redAdd(i).redSqr().redISub(d).redISub(n);
                u = u.redIAdd(u);
                var s = d.redAdd(d).redIAdd(d).redIAdd(this.curve.a),
                    o = s.redSqr().redISub(u).redISub(u);
                r = o;
                var h = n.redIAdd(n);
                h = (h = h.redIAdd(h)).redIAdd(h), e = s.redMul(u.redISub(o)).redISub(h), t = this.y.redAdd(this.y)
            } else {
                var p = this.z.redSqr(),
                    l = this.y.redSqr(),
                    a = this.x.redMul(l),
                    f = this.x.redSub(p).redMul(this.x.redAdd(p));
                f = f.redAdd(f).redIAdd(f);
                var c = a.redIAdd(a),
                    S = (c = c.redIAdd(c)).redAdd(c);
                r = f.redSqr().redISub(S), t = this.y.redAdd(this.z).redSqr().redISub(l).redISub(p);
                var b = l.redSqr();
                b = (b = (b = b.redIAdd(b)).redIAdd(b)).redIAdd(b), e = f.redMul(c.redISub(r)).redISub(b)
            }
            return this.curve.jpoint(r, e, t)
        }, s.prototype._dbl = function() {
            var r = this.curve.a,
                e = this.x,
                t = this.y,
                d = this.z,
                i = d.redSqr().redSqr(),
                n = e.redSqr(),
                u = t.redSqr(),
                s = n.redAdd(n).redIAdd(n).redIAdd(r.redMul(i)),
                o = e.redAdd(e),
                h = (o = o.redIAdd(o)).redMul(u),
                p = s.redSqr().redISub(h.redAdd(h)),
                l = h.redISub(p),
                a = u.redSqr();
            a = (a = (a = a.redIAdd(a)).redIAdd(a)).redIAdd(a);
            var f = s.redMul(l).redISub(a),
                c = t.redAdd(t).redMul(d);
            return this.curve.jpoint(p, f, c)
        }, s.prototype.trpl = function() {
            if (!this.curve.zeroA) return this.dbl().add(this);
            var r = this.x.redSqr(),
                e = this.y.redSqr(),
                t = this.z.redSqr(),
                d = e.redSqr(),
                i = r.redAdd(r).redIAdd(r),
                n = i.redSqr(),
                u = this.x.redAdd(e).redSqr().redISub(r).redISub(d),
                s = (u = (u = (u = u.redIAdd(u)).redAdd(u).redIAdd(u)).redISub(n)).redSqr(),
                o = d.redIAdd(d);
            o = (o = (o = o.redIAdd(o)).redIAdd(o)).redIAdd(o);
            var h = i.redIAdd(u).redSqr().redISub(n).redISub(s).redISub(o),
                p = e.redMul(h);
            p = (p = p.redIAdd(p)).redIAdd(p);
            var l = this.x.redMul(s).redISub(p);
            l = (l = l.redIAdd(l)).redIAdd(l);
            var a = this.y.redMul(h.redMul(o.redISub(h)).redISub(u.redMul(s)));
            a = (a = (a = a.redIAdd(a)).redIAdd(a)).redIAdd(a);
            var f = this.z.redAdd(u).redSqr().redISub(t).redISub(s);
            return this.curve.jpoint(l, a, f)
        }, s.prototype.mul = function(r, t) {
            return r = new e(r, t), this.curve._wnafMul(this, r)
        }, s.prototype.eq = function(r) {
            if ("affine" === r.type) return this.eq(r.toJ());
            if (this === r) return !0;
            var e = this.z.redSqr(),
                t = r.z.redSqr();
            if (0 !== this.x.redMul(t).redISub(r.x.redMul(e)).cmpn(0)) return !1;
            var d = e.redMul(this.z),
                i = t.redMul(r.z);
            return 0 === this.y.redMul(i).redISub(r.y.redMul(d)).cmpn(0)
        }, s.prototype.eqXToP = function(r) {
            var e = this.z.redSqr(),
                t = r.toRed(this.curve.red).redMul(e);
            if (0 === this.x.cmp(t)) return !0;
            for (var d = r.clone(), i = this.curve.redN.redMul(e);;) {
                if (d.iadd(this.curve.n), d.cmp(this.curve.p) >= 0) return !1;
                if (t.redIAdd(i), 0 === this.x.cmp(t)) return !0
            }
        }, s.prototype.inspect = function() {
            return this.isInfinity() ? "<EC JPoint Infinity>" : "<EC JPoint x: " + this.x.toString(16, 2) + " y: " + this.y.toString(16, 2) + " z: " + this.z.toString(16, 2) + ">"
        }, s.prototype.isInfinity = function() {
            return 0 === this.z.cmpn(0)
        };
    }, {
        "../utils": "THL6",
        "bn.js": "VOEF",
        "inherits": "wqxK",
        "./base": "mMXE"
    }],
    "nvh3": [function(require, module, exports) {
        "use strict";
        var t = require("bn.js"),
            r = require("inherits"),
            e = require("./base"),
            i = require("../utils");

        function o(r) {
            e.call(this, "mont", r), this.a = new t(r.a, 16).toRed(this.red), this.b = new t(r.b, 16).toRed(this.red), this.i4 = new t(4).toRed(this.red).redInvm(), this.two = new t(2).toRed(this.red), this.a24 = this.i4.redMul(this.a.redAdd(this.two))
        }

        function n(r, i, o) {
            e.BasePoint.call(this, r, "projective"), null === i && null === o ? (this.x = this.curve.one, this.z = this.curve.zero) : (this.x = new t(i, 16), this.z = new t(o, 16), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)))
        }
        r(o, e), module.exports = o, o.prototype.validate = function(t) {
            var r = t.normalize().x,
                e = r.redSqr(),
                i = e.redMul(r).redAdd(e.redMul(this.a)).redAdd(r);
            return 0 === i.redSqrt().redSqr().cmp(i)
        }, r(n, e.BasePoint), o.prototype.decodePoint = function(t, r) {
            return this.point(i.toArray(t, r), 1)
        }, o.prototype.point = function(t, r) {
            return new n(this, t, r)
        }, o.prototype.pointFromJSON = function(t) {
            return n.fromJSON(this, t)
        }, n.prototype.precompute = function() {}, n.prototype._encode = function() {
            return this.getX().toArray("be", this.curve.p.byteLength())
        }, n.fromJSON = function(t, r) {
            return new n(t, r[0], r[1] || t.one)
        }, n.prototype.inspect = function() {
            return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " z: " + this.z.fromRed().toString(16, 2) + ">"
        }, n.prototype.isInfinity = function() {
            return 0 === this.z.cmpn(0)
        }, n.prototype.dbl = function() {
            var t = this.x.redAdd(this.z).redSqr(),
                r = this.x.redSub(this.z).redSqr(),
                e = t.redSub(r),
                i = t.redMul(r),
                o = e.redMul(r.redAdd(this.curve.a24.redMul(e)));
            return this.curve.point(i, o)
        }, n.prototype.add = function() {
            throw new Error("Not supported on Montgomery curve")
        }, n.prototype.diffAdd = function(t, r) {
            var e = this.x.redAdd(this.z),
                i = this.x.redSub(this.z),
                o = t.x.redAdd(t.z),
                n = t.x.redSub(t.z).redMul(e),
                d = o.redMul(i),
                u = r.z.redMul(n.redAdd(d).redSqr()),
                s = r.x.redMul(n.redISub(d).redSqr());
            return this.curve.point(u, s)
        }, n.prototype.mul = function(t) {
            for (var r = t.clone(), e = this, i = this.curve.point(null, null), o = []; 0 !== r.cmpn(0); r.iushrn(1)) o.push(r.andln(1));
            for (var n = o.length - 1; n >= 0; n--) 0 === o[n] ? (e = e.diffAdd(i, this), i = i.dbl()) : (i = e.diffAdd(i, this), e = e.dbl());
            return i
        }, n.prototype.mulAdd = function() {
            throw new Error("Not supported on Montgomery curve")
        }, n.prototype.jumlAdd = function() {
            throw new Error("Not supported on Montgomery curve")
        }, n.prototype.eq = function(t) {
            return 0 === this.getX().cmp(t.getX())
        }, n.prototype.normalize = function() {
            return this.x = this.x.redMul(this.z.redInvm()), this.z = this.curve.one, this
        }, n.prototype.getX = function() {
            return this.normalize(), this.x.fromRed()
        };
    }, {
        "bn.js": "VOEF",
        "inherits": "wqxK",
        "./base": "mMXE",
        "../utils": "THL6"
    }],
    "QrE4": [function(require, module, exports) {
        "use strict";
        var t = require("../utils"),
            e = require("bn.js"),
            r = require("inherits"),
            i = require("./base"),
            d = t.assert;

        function s(t) {
            this.twisted = 1 != (0 | t.a), this.mOneA = this.twisted && -1 == (0 | t.a), this.extended = this.mOneA, i.call(this, "edwards", t), this.a = new e(t.a, 16).umod(this.red.m), this.a = this.a.toRed(this.red), this.c = new e(t.c, 16).toRed(this.red), this.c2 = this.c.redSqr(), this.d = new e(t.d, 16).toRed(this.red), this.dd = this.d.redAdd(this.d), d(!this.twisted || 0 === this.c.fromRed().cmpn(1)), this.oneC = 1 == (0 | t.c)
        }

        function u(t, r, d, s, u) {
            i.BasePoint.call(this, t, "projective"), null === r && null === d && null === s ? (this.x = this.curve.zero, this.y = this.curve.one, this.z = this.curve.one, this.t = this.curve.zero, this.zOne = !0) : (this.x = new e(r, 16), this.y = new e(d, 16), this.z = s ? new e(s, 16) : this.curve.one, this.t = u && new e(u, 16), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)), this.t && !this.t.red && (this.t = this.t.toRed(this.curve.red)), this.zOne = this.z === this.curve.one, this.curve.extended && !this.t && (this.t = this.x.redMul(this.y), this.zOne || (this.t = this.t.redMul(this.z.redInvm()))))
        }
        r(s, i), module.exports = s, s.prototype._mulA = function(t) {
            return this.mOneA ? t.redNeg() : this.a.redMul(t)
        }, s.prototype._mulC = function(t) {
            return this.oneC ? t : this.c.redMul(t)
        }, s.prototype.jpoint = function(t, e, r, i) {
            return this.point(t, e, r, i)
        }, s.prototype.pointFromX = function(t, r) {
            (t = new e(t, 16)).red || (t = t.toRed(this.red));
            var i = t.redSqr(),
                d = this.c2.redSub(this.a.redMul(i)),
                s = this.one.redSub(this.c2.redMul(this.d).redMul(i)),
                u = d.redMul(s.redInvm()),
                h = u.redSqrt();
            if (0 !== h.redSqr().redSub(u).cmp(this.zero)) throw new Error("invalid point");
            var n = h.fromRed().isOdd();
            return (r && !n || !r && n) && (h = h.redNeg()), this.point(t, h)
        }, s.prototype.pointFromY = function(t, r) {
            (t = new e(t, 16)).red || (t = t.toRed(this.red));
            var i = t.redSqr(),
                d = i.redSub(this.c2),
                s = i.redMul(this.d).redMul(this.c2).redSub(this.a),
                u = d.redMul(s.redInvm());
            if (0 === u.cmp(this.zero)) {
                if (r) throw new Error("invalid point");
                return this.point(this.zero, t)
            }
            var h = u.redSqrt();
            if (0 !== h.redSqr().redSub(u).cmp(this.zero)) throw new Error("invalid point");
            return h.fromRed().isOdd() !== r && (h = h.redNeg()), this.point(h, t)
        }, s.prototype.validate = function(t) {
            if (t.isInfinity()) return !0;
            t.normalize();
            var e = t.x.redSqr(),
                r = t.y.redSqr(),
                i = e.redMul(this.a).redAdd(r),
                d = this.c2.redMul(this.one.redAdd(this.d.redMul(e).redMul(r)));
            return 0 === i.cmp(d)
        }, r(u, i.BasePoint), s.prototype.pointFromJSON = function(t) {
            return u.fromJSON(this, t)
        }, s.prototype.point = function(t, e, r, i) {
            return new u(this, t, e, r, i)
        }, u.fromJSON = function(t, e) {
            return new u(t, e[0], e[1], e[2])
        }, u.prototype.inspect = function() {
            return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + " z: " + this.z.fromRed().toString(16, 2) + ">"
        }, u.prototype.isInfinity = function() {
            return 0 === this.x.cmpn(0) && (0 === this.y.cmp(this.z) || this.zOne && 0 === this.y.cmp(this.curve.c))
        }, u.prototype._extDbl = function() {
            var t = this.x.redSqr(),
                e = this.y.redSqr(),
                r = this.z.redSqr();
            r = r.redIAdd(r);
            var i = this.curve._mulA(t),
                d = this.x.redAdd(this.y).redSqr().redISub(t).redISub(e),
                s = i.redAdd(e),
                u = s.redSub(r),
                h = i.redSub(e),
                n = d.redMul(u),
                o = s.redMul(h),
                l = d.redMul(h),
                c = u.redMul(s);
            return this.curve.point(n, o, c, l)
        }, u.prototype._projDbl = function() {
            var t, e, r, i = this.x.redAdd(this.y).redSqr(),
                d = this.x.redSqr(),
                s = this.y.redSqr();
            if (this.curve.twisted) {
                var u = (o = this.curve._mulA(d)).redAdd(s);
                if (this.zOne) t = i.redSub(d).redSub(s).redMul(u.redSub(this.curve.two)), e = u.redMul(o.redSub(s)), r = u.redSqr().redSub(u).redSub(u);
                else {
                    var h = this.z.redSqr(),
                        n = u.redSub(h).redISub(h);
                    t = i.redSub(d).redISub(s).redMul(n), e = u.redMul(o.redSub(s)), r = u.redMul(n)
                }
            } else {
                var o = d.redAdd(s);
                h = this.curve._mulC(this.z).redSqr(), n = o.redSub(h).redSub(h);
                t = this.curve._mulC(i.redISub(o)).redMul(n), e = this.curve._mulC(o).redMul(d.redISub(s)), r = o.redMul(n)
            }
            return this.curve.point(t, e, r)
        }, u.prototype.dbl = function() {
            return this.isInfinity() ? this : this.curve.extended ? this._extDbl() : this._projDbl()
        }, u.prototype._extAdd = function(t) {
            var e = this.y.redSub(this.x).redMul(t.y.redSub(t.x)),
                r = this.y.redAdd(this.x).redMul(t.y.redAdd(t.x)),
                i = this.t.redMul(this.curve.dd).redMul(t.t),
                d = this.z.redMul(t.z.redAdd(t.z)),
                s = r.redSub(e),
                u = d.redSub(i),
                h = d.redAdd(i),
                n = r.redAdd(e),
                o = s.redMul(u),
                l = h.redMul(n),
                c = s.redMul(n),
                p = u.redMul(h);
            return this.curve.point(o, l, p, c)
        }, u.prototype._projAdd = function(t) {
            var e, r, i = this.z.redMul(t.z),
                d = i.redSqr(),
                s = this.x.redMul(t.x),
                u = this.y.redMul(t.y),
                h = this.curve.d.redMul(s).redMul(u),
                n = d.redSub(h),
                o = d.redAdd(h),
                l = this.x.redAdd(this.y).redMul(t.x.redAdd(t.y)).redISub(s).redISub(u),
                c = i.redMul(n).redMul(l);
            return this.curve.twisted ? (e = i.redMul(o).redMul(u.redSub(this.curve._mulA(s))), r = n.redMul(o)) : (e = i.redMul(o).redMul(u.redSub(s)), r = this.curve._mulC(n).redMul(o)), this.curve.point(c, e, r)
        }, u.prototype.add = function(t) {
            return this.isInfinity() ? t : t.isInfinity() ? this : this.curve.extended ? this._extAdd(t) : this._projAdd(t)
        }, u.prototype.mul = function(t) {
            return this._hasDoubles(t) ? this.curve._fixedNafMul(this, t) : this.curve._wnafMul(this, t)
        }, u.prototype.mulAdd = function(t, e, r) {
            return this.curve._wnafMulAdd(1, [this, e], [t, r], 2, !1)
        }, u.prototype.jmulAdd = function(t, e, r) {
            return this.curve._wnafMulAdd(1, [this, e], [t, r], 2, !0)
        }, u.prototype.normalize = function() {
            if (this.zOne) return this;
            var t = this.z.redInvm();
            return this.x = this.x.redMul(t), this.y = this.y.redMul(t), this.t && (this.t = this.t.redMul(t)), this.z = this.curve.one, this.zOne = !0, this
        }, u.prototype.neg = function() {
            return this.curve.point(this.x.redNeg(), this.y, this.z, this.t && this.t.redNeg())
        }, u.prototype.getX = function() {
            return this.normalize(), this.x.fromRed()
        }, u.prototype.getY = function() {
            return this.normalize(), this.y.fromRed()
        }, u.prototype.eq = function(t) {
            return this === t || 0 === this.getX().cmp(t.getX()) && 0 === this.getY().cmp(t.getY())
        }, u.prototype.eqXToP = function(t) {
            var e = t.toRed(this.curve.red).redMul(this.z);
            if (0 === this.x.cmp(e)) return !0;
            for (var r = t.clone(), i = this.curve.redN.redMul(this.z);;) {
                if (r.iadd(this.curve.n), r.cmp(this.curve.p) >= 0) return !1;
                if (e.redIAdd(i), 0 === this.x.cmp(e)) return !0
            }
        }, u.prototype.toP = u.prototype.normalize, u.prototype.mixedAdd = u.prototype.add;
    }, {
        "../utils": "THL6",
        "bn.js": "VOEF",
        "inherits": "wqxK",
        "./base": "mMXE"
    }],
    "ibwU": [function(require, module, exports) {
        "use strict";
        var r = exports;
        r.base = require("./base"), r.short = require("./short"), r.mont = require("./mont"), r.edwards = require("./edwards");
    }, {
        "./base": "mMXE",
        "./short": "XqLT",
        "./mont": "nvh3",
        "./edwards": "QrE4"
    }],
    "y2E6": [function(require, module, exports) {
        "use strict";
        var r = require("minimalistic-assert"),
            t = require("inherits");

        function n(r, t) {
            return 55296 == (64512 & r.charCodeAt(t)) && (!(t < 0 || t + 1 >= r.length) && 56320 == (64512 & r.charCodeAt(t + 1)))
        }

        function e(r, t) {
            if (Array.isArray(r)) return r.slice();
            if (!r) return [];
            var e = [];
            if ("string" == typeof r)
                if (t) {
                    if ("hex" === t)
                        for ((r = r.replace(/[^a-z0-9]+/gi, "")).length % 2 != 0 && (r = "0" + r), u = 0; u < r.length; u += 2) e.push(parseInt(r[u] + r[u + 1], 16))
                } else
                    for (var o = 0, u = 0; u < r.length; u++) {
                        var i = r.charCodeAt(u);
                        i < 128 ? e[o++] = i : i < 2048 ? (e[o++] = i >> 6 | 192, e[o++] = 63 & i | 128) : n(r, u) ? (i = 65536 + ((1023 & i) << 10) + (1023 & r.charCodeAt(++u)), e[o++] = i >> 18 | 240, e[o++] = i >> 12 & 63 | 128, e[o++] = i >> 6 & 63 | 128, e[o++] = 63 & i | 128) : (e[o++] = i >> 12 | 224, e[o++] = i >> 6 & 63 | 128, e[o++] = 63 & i | 128)
                    } else
                        for (u = 0; u < r.length; u++) e[u] = 0 | r[u];
            return e
        }

        function o(r) {
            for (var t = "", n = 0; n < r.length; n++) t += s(r[n].toString(16));
            return t
        }

        function u(r) {
            return (r >>> 24 | r >>> 8 & 65280 | r << 8 & 16711680 | (255 & r) << 24) >>> 0
        }

        function i(r, t) {
            for (var n = "", e = 0; e < r.length; e++) {
                var o = r[e];
                "little" === t && (o = u(o)), n += f(o.toString(16))
            }
            return n
        }

        function s(r) {
            return 1 === r.length ? "0" + r : r
        }

        function f(r) {
            return 7 === r.length ? "0" + r : 6 === r.length ? "00" + r : 5 === r.length ? "000" + r : 4 === r.length ? "0000" + r : 3 === r.length ? "00000" + r : 2 === r.length ? "000000" + r : 1 === r.length ? "0000000" + r : r
        }

        function c(t, n, e, o) {
            var u = e - n;
            r(u % 4 == 0);
            for (var i = new Array(u / 4), s = 0, f = n; s < i.length; s++, f += 4) {
                var c;
                c = "big" === o ? t[f] << 24 | t[f + 1] << 16 | t[f + 2] << 8 | t[f + 3] : t[f + 3] << 24 | t[f + 2] << 16 | t[f + 1] << 8 | t[f], i[s] = c >>> 0
            }
            return i
        }

        function h(r, t) {
            for (var n = new Array(4 * r.length), e = 0, o = 0; e < r.length; e++, o += 4) {
                var u = r[e];
                "big" === t ? (n[o] = u >>> 24, n[o + 1] = u >>> 16 & 255, n[o + 2] = u >>> 8 & 255, n[o + 3] = 255 & u) : (n[o + 3] = u >>> 24, n[o + 2] = u >>> 16 & 255, n[o + 1] = u >>> 8 & 255, n[o] = 255 & u)
            }
            return n
        }

        function l(r, t) {
            return r >>> t | r << 32 - t
        }

        function p(r, t) {
            return r << t | r >>> 32 - t
        }

        function a(r, t) {
            return r + t >>> 0
        }

        function x(r, t, n) {
            return r + t + n >>> 0
        }

        function g(r, t, n, e) {
            return r + t + n + e >>> 0
        }

        function _(r, t, n, e, o) {
            return r + t + n + e + o >>> 0
        }

        function v(r, t, n, e) {
            var o = r[t],
                u = e + r[t + 1] >>> 0,
                i = (u < e ? 1 : 0) + n + o;
            r[t] = i >>> 0, r[t + 1] = u
        }

        function m(r, t, n, e) {
            return (t + e >>> 0 < t ? 1 : 0) + r + n >>> 0
        }

        function A(r, t, n, e) {
            return t + e >>> 0
        }

        function y(r, t, n, e, o, u, i, s) {
            var f = 0,
                c = t;
            return f += (c = c + e >>> 0) < t ? 1 : 0, f += (c = c + u >>> 0) < u ? 1 : 0, r + n + o + i + (f += (c = c + s >>> 0) < s ? 1 : 0) >>> 0
        }

        function d(r, t, n, e, o, u, i, s) {
            return t + e + u + s >>> 0
        }

        function C(r, t, n, e, o, u, i, s, f, c) {
            var h = 0,
                l = t;
            return h += (l = l + e >>> 0) < t ? 1 : 0, h += (l = l + u >>> 0) < u ? 1 : 0, h += (l = l + s >>> 0) < s ? 1 : 0, r + n + o + i + f + (h += (l = l + c >>> 0) < c ? 1 : 0) >>> 0
        }

        function z(r, t, n, e, o, u, i, s, f, c) {
            return t + e + u + s + c >>> 0
        }

        function b(r, t, n) {
            return (t << 32 - n | r >>> n) >>> 0
        }

        function q(r, t, n) {
            return (r << 32 - n | t >>> n) >>> 0
        }

        function w(r, t, n) {
            return r >>> n
        }

        function H(r, t, n) {
            return (r << 32 - n | t >>> n) >>> 0
        }
        exports.inherits = t, exports.toArray = e, exports.toHex = o, exports.htonl = u, exports.toHex32 = i, exports.zero2 = s, exports.zero8 = f, exports.join32 = c, exports.split32 = h, exports.rotr32 = l, exports.rotl32 = p, exports.sum32 = a, exports.sum32_3 = x, exports.sum32_4 = g, exports.sum32_5 = _, exports.sum64 = v, exports.sum64_hi = m, exports.sum64_lo = A, exports.sum64_4_hi = y, exports.sum64_4_lo = d, exports.sum64_5_hi = C, exports.sum64_5_lo = z, exports.rotr64_hi = b, exports.rotr64_lo = q, exports.shr64_hi = w, exports.shr64_lo = H;
    }, {
        "minimalistic-assert": "tXM1",
        "inherits": "wqxK"
    }],
    "xsYF": [function(require, module, exports) {
        "use strict";
        var t = require("./utils"),
            i = require("minimalistic-assert");

        function n() {
            this.pending = null, this.pendingTotal = 0, this.blockSize = this.constructor.blockSize, this.outSize = this.constructor.outSize, this.hmacStrength = this.constructor.hmacStrength, this.padLength = this.constructor.padLength / 8, this.endian = "big", this._delta8 = this.blockSize / 8, this._delta32 = this.blockSize / 32
        }
        exports.BlockHash = n, n.prototype.update = function(i, n) {
            if (i = t.toArray(i, n), this.pending ? this.pending = this.pending.concat(i) : this.pending = i, this.pendingTotal += i.length, this.pending.length >= this._delta8) {
                var e = (i = this.pending).length % this._delta8;
                this.pending = i.slice(i.length - e, i.length), 0 === this.pending.length && (this.pending = null), i = t.join32(i, 0, i.length - e, this.endian);
                for (var h = 0; h < i.length; h += this._delta32) this._update(i, h, h + this._delta32)
            }
            return this
        }, n.prototype.digest = function(t) {
            return this.update(this._pad()), i(null === this.pending), this._digest(t)
        }, n.prototype._pad = function() {
            var t = this.pendingTotal,
                i = this._delta8,
                n = i - (t + this.padLength) % i,
                e = new Array(n + this.padLength);
            e[0] = 128;
            for (var h = 1; h < n; h++) e[h] = 0;
            if (t <<= 3, "big" === this.endian) {
                for (var s = 8; s < this.padLength; s++) e[h++] = 0;
                e[h++] = 0, e[h++] = 0, e[h++] = 0, e[h++] = 0, e[h++] = t >>> 24 & 255, e[h++] = t >>> 16 & 255, e[h++] = t >>> 8 & 255, e[h++] = 255 & t
            } else
                for (e[h++] = 255 & t, e[h++] = t >>> 8 & 255, e[h++] = t >>> 16 & 255, e[h++] = t >>> 24 & 255, e[h++] = 0, e[h++] = 0, e[h++] = 0, e[h++] = 0, s = 8; s < this.padLength; s++) e[h++] = 0;
            return e
        };
    }, {
        "./utils": "y2E6",
        "minimalistic-assert": "tXM1"
    }],
    "SdJ5": [function(require, module, exports) {
        "use strict";
        var r = require("../utils"),
            t = r.rotr32;

        function n(r, t, n, s) {
            return 0 === r ? e(t, n, s) : 1 === r || 3 === r ? o(t, n, s) : 2 === r ? u(t, n, s) : void 0
        }

        function e(r, t, n) {
            return r & t ^ ~r & n
        }

        function u(r, t, n) {
            return r & t ^ r & n ^ t & n
        }

        function o(r, t, n) {
            return r ^ t ^ n
        }

        function s(r) {
            return t(r, 2) ^ t(r, 13) ^ t(r, 22)
        }

        function i(r) {
            return t(r, 6) ^ t(r, 11) ^ t(r, 25)
        }

        function c(r) {
            return t(r, 7) ^ t(r, 18) ^ r >>> 3
        }

        function f(r) {
            return t(r, 17) ^ t(r, 19) ^ r >>> 10
        }
        exports.ft_1 = n, exports.ch32 = e, exports.maj32 = u, exports.p32 = o, exports.s0_256 = s, exports.s1_256 = i, exports.g0_256 = c, exports.g1_256 = f;
    }, {
        "../utils": "y2E6"
    }],
    "J7wi": [function(require, module, exports) {
        "use strict";
        var t = require("../utils"),
            h = require("../common"),
            i = require("./common"),
            s = t.rotl32,
            e = t.sum32,
            r = t.sum32_5,
            o = i.ft_1,
            n = h.BlockHash,
            u = [1518500249, 1859775393, 2400959708, 3395469782];

        function a() {
            if (!(this instanceof a)) return new a;
            n.call(this), this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.W = new Array(80)
        }
        t.inherits(a, n), module.exports = a, a.blockSize = 512, a.outSize = 160, a.hmacStrength = 80, a.padLength = 64, a.prototype._update = function(t, h) {
            for (var i = this.W, n = 0; n < 16; n++) i[n] = t[h + n];
            for (; n < i.length; n++) i[n] = s(i[n - 3] ^ i[n - 8] ^ i[n - 14] ^ i[n - 16], 1);
            var a = this.h[0],
                c = this.h[1],
                l = this.h[2],
                f = this.h[3],
                m = this.h[4];
            for (n = 0; n < i.length; n++) {
                var p = ~~(n / 20),
                    g = r(s(a, 5), o(p, c, l, f), m, i[n], u[p]);
                m = f, f = l, l = s(c, 30), c = a, a = g
            }
            this.h[0] = e(this.h[0], a), this.h[1] = e(this.h[1], c), this.h[2] = e(this.h[2], l), this.h[3] = e(this.h[3], f), this.h[4] = e(this.h[4], m)
        }, a.prototype._digest = function(h) {
            return "hex" === h ? t.toHex32(this.h, "big") : t.split32(this.h, "big")
        };
    }, {
        "../utils": "y2E6",
        "../common": "xsYF",
        "./common": "SdJ5"
    }],
    "IOQN": [function(require, module, exports) {
        "use strict";
        var h = require("../utils"),
            t = require("../common"),
            i = require("./common"),
            s = require("minimalistic-assert"),
            e = h.sum32,
            r = h.sum32_4,
            n = h.sum32_5,
            o = i.ch32,
            u = i.maj32,
            a = i.s0_256,
            c = i.s1_256,
            l = i.g0_256,
            m = i.g1_256,
            g = t.BlockHash,
            f = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];

        function p() {
            if (!(this instanceof p)) return new p;
            g.call(this), this.h = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225], this.k = f, this.W = new Array(64)
        }
        h.inherits(p, g), module.exports = p, p.blockSize = 512, p.outSize = 256, p.hmacStrength = 192, p.padLength = 64, p.prototype._update = function(h, t) {
            for (var i = this.W, g = 0; g < 16; g++) i[g] = h[t + g];
            for (; g < i.length; g++) i[g] = r(m(i[g - 2]), i[g - 7], l(i[g - 15]), i[g - 16]);
            var f = this.h[0],
                p = this.h[1],
                _ = this.h[2],
                k = this.h[3],
                d = this.h[4],
                q = this.h[5],
                v = this.h[6],
                b = this.h[7];
            for (s(this.k.length === i.length), g = 0; g < i.length; g++) {
                var x = n(b, c(d), o(d, q, v), this.k[g], i[g]),
                    y = e(a(f), u(f, p, _));
                b = v, v = q, q = d, d = e(k, x), k = _, _ = p, p = f, f = e(x, y)
            }
            this.h[0] = e(this.h[0], f), this.h[1] = e(this.h[1], p), this.h[2] = e(this.h[2], _), this.h[3] = e(this.h[3], k), this.h[4] = e(this.h[4], d), this.h[5] = e(this.h[5], q), this.h[6] = e(this.h[6], v), this.h[7] = e(this.h[7], b)
        }, p.prototype._digest = function(t) {
            return "hex" === t ? h.toHex32(this.h, "big") : h.split32(this.h, "big")
        };
    }, {
        "../utils": "y2E6",
        "../common": "xsYF",
        "./common": "SdJ5",
        "minimalistic-assert": "tXM1"
    }],
    "OnIw": [function(require, module, exports) {
        "use strict";
        var t = require("../utils"),
            i = require("./256");

        function e() {
            if (!(this instanceof e)) return new e;
            i.call(this), this.h = [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428]
        }
        t.inherits(e, i), module.exports = e, e.blockSize = 512, e.outSize = 224, e.hmacStrength = 192, e.padLength = 64, e.prototype._digest = function(i) {
            return "hex" === i ? t.toHex32(this.h.slice(0, 7), "big") : t.split32(this.h.slice(0, 7), "big")
        };
    }, {
        "../utils": "y2E6",
        "./256": "IOQN"
    }],
    "okBY": [function(require, module, exports) {
        "use strict";
        var t = require("../utils"),
            h = require("../common"),
            i = require("minimalistic-assert"),
            r = t.rotr64_hi,
            n = t.rotr64_lo,
            s = t.shr64_hi,
            e = t.shr64_lo,
            u = t.sum64,
            o = t.sum64_hi,
            a = t.sum64_lo,
            c = t.sum64_4_hi,
            f = t.sum64_4_lo,
            l = t.sum64_5_hi,
            v = t.sum64_5_lo,
            _ = h.BlockHash,
            p = [1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823, 1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315, 685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591];

        function m() {
            if (!(this instanceof m)) return new m;
            _.call(this), this.h = [1779033703, 4089235720, 3144134277, 2227873595, 1013904242, 4271175723, 2773480762, 1595750129, 1359893119, 2917565137, 2600822924, 725511199, 528734635, 4215389547, 1541459225, 327033209], this.k = p, this.W = new Array(160)
        }

        function g(t, h, i, r, n) {
            var s = t & i ^ ~t & n;
            return s < 0 && (s += 4294967296), s
        }

        function k(t, h, i, r, n, s) {
            var e = h & r ^ ~h & s;
            return e < 0 && (e += 4294967296), e
        }

        function d(t, h, i, r, n) {
            var s = t & i ^ t & n ^ i & n;
            return s < 0 && (s += 4294967296), s
        }

        function y(t, h, i, r, n, s) {
            var e = h & r ^ h & s ^ r & s;
            return e < 0 && (e += 4294967296), e
        }

        function b(t, h) {
            var i = r(t, h, 28) ^ r(h, t, 2) ^ r(h, t, 7);
            return i < 0 && (i += 4294967296), i
        }

        function q(t, h) {
            var i = n(t, h, 28) ^ n(h, t, 2) ^ n(h, t, 7);
            return i < 0 && (i += 4294967296), i
        }

        function x(t, h) {
            var i = r(t, h, 14) ^ r(t, h, 18) ^ r(h, t, 9);
            return i < 0 && (i += 4294967296), i
        }

        function B(t, h) {
            var i = n(t, h, 14) ^ n(t, h, 18) ^ n(h, t, 9);
            return i < 0 && (i += 4294967296), i
        }

        function S(t, h) {
            var i = r(t, h, 1) ^ r(t, h, 8) ^ s(t, h, 7);
            return i < 0 && (i += 4294967296), i
        }

        function W(t, h) {
            var i = n(t, h, 1) ^ n(t, h, 8) ^ e(t, h, 7);
            return i < 0 && (i += 4294967296), i
        }

        function w(t, h) {
            var i = r(t, h, 19) ^ r(h, t, 29) ^ s(t, h, 6);
            return i < 0 && (i += 4294967296), i
        }

        function z(t, h) {
            var i = n(t, h, 19) ^ n(h, t, 29) ^ e(t, h, 6);
            return i < 0 && (i += 4294967296), i
        }
        t.inherits(m, _), module.exports = m, m.blockSize = 1024, m.outSize = 512, m.hmacStrength = 192, m.padLength = 128, m.prototype._prepareBlock = function(t, h) {
            for (var i = this.W, r = 0; r < 32; r++) i[r] = t[h + r];
            for (; r < i.length; r += 2) {
                var n = w(i[r - 4], i[r - 3]),
                    s = z(i[r - 4], i[r - 3]),
                    e = i[r - 14],
                    u = i[r - 13],
                    o = S(i[r - 30], i[r - 29]),
                    a = W(i[r - 30], i[r - 29]),
                    l = i[r - 32],
                    v = i[r - 31];
                i[r] = c(n, s, e, u, o, a, l, v), i[r + 1] = f(n, s, e, u, o, a, l, v)
            }
        }, m.prototype._update = function(t, h) {
            this._prepareBlock(t, h);
            var r = this.W,
                n = this.h[0],
                s = this.h[1],
                e = this.h[2],
                c = this.h[3],
                f = this.h[4],
                _ = this.h[5],
                p = this.h[6],
                m = this.h[7],
                S = this.h[8],
                W = this.h[9],
                w = this.h[10],
                z = this.h[11],
                H = this.h[12],
                A = this.h[13],
                L = this.h[14],
                j = this.h[15];
            i(this.k.length === r.length);
            for (var C = 0; C < r.length; C += 2) {
                var D = L,
                    E = j,
                    F = x(S, W),
                    G = B(S, W),
                    I = g(S, W, w, z, H, A),
                    J = k(S, W, w, z, H, A),
                    K = this.k[C],
                    M = this.k[C + 1],
                    N = r[C],
                    O = r[C + 1],
                    P = l(D, E, F, G, I, J, K, M, N, O),
                    Q = v(D, E, F, G, I, J, K, M, N, O);
                D = b(n, s), E = q(n, s), F = d(n, s, e, c, f, _), G = y(n, s, e, c, f, _);
                var R = o(D, E, F, G),
                    T = a(D, E, F, G);
                L = H, j = A, H = w, A = z, w = S, z = W, S = o(p, m, P, Q), W = a(m, m, P, Q), p = f, m = _, f = e, _ = c, e = n, c = s, n = o(P, Q, R, T), s = a(P, Q, R, T)
            }
            u(this.h, 0, n, s), u(this.h, 2, e, c), u(this.h, 4, f, _), u(this.h, 6, p, m), u(this.h, 8, S, W), u(this.h, 10, w, z), u(this.h, 12, H, A), u(this.h, 14, L, j)
        }, m.prototype._digest = function(h) {
            return "hex" === h ? t.toHex32(this.h, "big") : t.split32(this.h, "big")
        };
    }, {
        "../utils": "y2E6",
        "../common": "xsYF",
        "minimalistic-assert": "tXM1"
    }],
    "rnF6": [function(require, module, exports) {
        "use strict";
        var t = require("../utils"),
            i = require("./512");

        function e() {
            if (!(this instanceof e)) return new e;
            i.call(this), this.h = [3418070365, 3238371032, 1654270250, 914150663, 2438529370, 812702999, 355462360, 4144912697, 1731405415, 4290775857, 2394180231, 1750603025, 3675008525, 1694076839, 1203062813, 3204075428]
        }
        t.inherits(e, i), module.exports = e, e.blockSize = 1024, e.outSize = 384, e.hmacStrength = 192, e.padLength = 128, e.prototype._digest = function(i) {
            return "hex" === i ? t.toHex32(this.h.slice(0, 12), "big") : t.split32(this.h.slice(0, 12), "big")
        };
    }, {
        "../utils": "y2E6",
        "./512": "okBY"
    }],
    "S5V6": [function(require, module, exports) {
        "use strict";
        exports.sha1 = require("./sha/1"), exports.sha224 = require("./sha/224"), exports.sha256 = require("./sha/256"), exports.sha384 = require("./sha/384"), exports.sha512 = require("./sha/512");
    }, {
        "./sha/1": "J7wi",
        "./sha/224": "OnIw",
        "./sha/256": "IOQN",
        "./sha/384": "rnF6",
        "./sha/512": "okBY"
    }],
    "glJe": [function(require, module, exports) {
        "use strict";
        var t = require("./utils"),
            h = require("./common"),
            i = t.rotl32,
            s = t.sum32,
            e = t.sum32_3,
            r = t.sum32_4,
            n = h.BlockHash;

        function o() {
            if (!(this instanceof o)) return new o;
            n.call(this), this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.endian = "little"
        }

        function u(t, h, i, s) {
            return t <= 15 ? h ^ i ^ s : t <= 31 ? h & i | ~h & s : t <= 47 ? (h | ~i) ^ s : t <= 63 ? h & s | i & ~s : h ^ (i | ~s)
        }

        function c(t) {
            return t <= 15 ? 0 : t <= 31 ? 1518500249 : t <= 47 ? 1859775393 : t <= 63 ? 2400959708 : 2840853838
        }

        function l(t) {
            return t <= 15 ? 1352829926 : t <= 31 ? 1548603684 : t <= 47 ? 1836072691 : t <= 63 ? 2053994217 : 0
        }
        t.inherits(o, n), exports.ripemd160 = o, o.blockSize = 512, o.outSize = 160, o.hmacStrength = 192, o.padLength = 64, o.prototype._update = function(t, h) {
            for (var n = this.h[0], o = this.h[1], d = this.h[2], v = this.h[3], _ = this.h[4], g = n, x = o, S = d, k = v, q = _, y = 0; y < 80; y++) {
                var z = s(i(r(n, u(y, o, d, v), t[a[y] + h], c(y)), p[y]), _);
                n = _, _ = v, v = i(d, 10), d = o, o = z, z = s(i(r(g, u(79 - y, x, S, k), t[f[y] + h], l(y)), m[y]), q), g = q, q = k, k = i(S, 10), S = x, x = z
            }
            z = e(this.h[1], d, k), this.h[1] = e(this.h[2], v, q), this.h[2] = e(this.h[3], _, g), this.h[3] = e(this.h[4], n, x), this.h[4] = e(this.h[0], o, S), this.h[0] = z
        }, o.prototype._digest = function(h) {
            return "hex" === h ? t.toHex32(this.h, "little") : t.split32(this.h, "little")
        };
        var a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13],
            f = [5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11],
            p = [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6],
            m = [8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11];
    }, {
        "./utils": "y2E6",
        "./common": "xsYF"
    }],
    "lzWs": [function(require, module, exports) {
        "use strict";
        var t = require("./utils"),
            i = require("minimalistic-assert");

        function e(i, s, n) {
            if (!(this instanceof e)) return new e(i, s, n);
            this.Hash = i, this.blockSize = i.blockSize / 8, this.outSize = i.outSize / 8, this.inner = null, this.outer = null, this._init(t.toArray(s, n))
        }
        module.exports = e, e.prototype._init = function(t) {
            t.length > this.blockSize && (t = (new this.Hash).update(t).digest()), i(t.length <= this.blockSize);
            for (var e = t.length; e < this.blockSize; e++) t.push(0);
            for (e = 0; e < t.length; e++) t[e] ^= 54;
            for (this.inner = (new this.Hash).update(t), e = 0; e < t.length; e++) t[e] ^= 106;
            this.outer = (new this.Hash).update(t)
        }, e.prototype.update = function(t, i) {
            return this.inner.update(t, i), this
        }, e.prototype.digest = function(t) {
            return this.outer.update(this.inner.digest()), this.outer.digest(t)
        };
    }, {
        "./utils": "y2E6",
        "minimalistic-assert": "tXM1"
    }],
    "HObn": [function(require, module, exports) {
        var h = exports;
        h.utils = require("./hash/utils"), h.common = require("./hash/common"), h.sha = require("./hash/sha"), h.ripemd = require("./hash/ripemd"), h.hmac = require("./hash/hmac"), h.sha1 = h.sha.sha1, h.sha256 = h.sha.sha256, h.sha224 = h.sha.sha224, h.sha384 = h.sha.sha384, h.sha512 = h.sha.sha512, h.ripemd160 = h.ripemd.ripemd160;
    }, {
        "./hash/utils": "y2E6",
        "./hash/common": "xsYF",
        "./hash/sha": "S5V6",
        "./hash/ripemd": "glJe",
        "./hash/hmac": "lzWs"
    }],
    "eUz0": [function(require, module, exports) {
        module.exports = {
            doubles: {
                step: 4,
                points: [
                    ["e60fce93b59e9ec53011aabc21c23e97b2a31369b87a5ae9c44ee89e2a6dec0a", "f7e3507399e595929db99f34f57937101296891e44d23f0be1f32cce69616821"],
                    ["8282263212c609d9ea2a6e3e172de238d8c39cabd5ac1ca10646e23fd5f51508", "11f8a8098557dfe45e8256e830b60ace62d613ac2f7b17bed31b6eaff6e26caf"],
                    ["175e159f728b865a72f99cc6c6fc846de0b93833fd2222ed73fce5b551e5b739", "d3506e0d9e3c79eba4ef97a51ff71f5eacb5955add24345c6efa6ffee9fed695"],
                    ["363d90d447b00c9c99ceac05b6262ee053441c7e55552ffe526bad8f83ff4640", "4e273adfc732221953b445397f3363145b9a89008199ecb62003c7f3bee9de9"],
                    ["8b4b5f165df3c2be8c6244b5b745638843e4a781a15bcd1b69f79a55dffdf80c", "4aad0a6f68d308b4b3fbd7813ab0da04f9e336546162ee56b3eff0c65fd4fd36"],
                    ["723cbaa6e5db996d6bf771c00bd548c7b700dbffa6c0e77bcb6115925232fcda", "96e867b5595cc498a921137488824d6e2660a0653779494801dc069d9eb39f5f"],
                    ["eebfa4d493bebf98ba5feec812c2d3b50947961237a919839a533eca0e7dd7fa", "5d9a8ca3970ef0f269ee7edaf178089d9ae4cdc3a711f712ddfd4fdae1de8999"],
                    ["100f44da696e71672791d0a09b7bde459f1215a29b3c03bfefd7835b39a48db0", "cdd9e13192a00b772ec8f3300c090666b7ff4a18ff5195ac0fbd5cd62bc65a09"],
                    ["e1031be262c7ed1b1dc9227a4a04c017a77f8d4464f3b3852c8acde6e534fd2d", "9d7061928940405e6bb6a4176597535af292dd419e1ced79a44f18f29456a00d"],
                    ["feea6cae46d55b530ac2839f143bd7ec5cf8b266a41d6af52d5e688d9094696d", "e57c6b6c97dce1bab06e4e12bf3ecd5c981c8957cc41442d3155debf18090088"],
                    ["da67a91d91049cdcb367be4be6ffca3cfeed657d808583de33fa978bc1ec6cb1", "9bacaa35481642bc41f463f7ec9780e5dec7adc508f740a17e9ea8e27a68be1d"],
                    ["53904faa0b334cdda6e000935ef22151ec08d0f7bb11069f57545ccc1a37b7c0", "5bc087d0bc80106d88c9eccac20d3c1c13999981e14434699dcb096b022771c8"],
                    ["8e7bcd0bd35983a7719cca7764ca906779b53a043a9b8bcaeff959f43ad86047", "10b7770b2a3da4b3940310420ca9514579e88e2e47fd68b3ea10047e8460372a"],
                    ["385eed34c1cdff21e6d0818689b81bde71a7f4f18397e6690a841e1599c43862", "283bebc3e8ea23f56701de19e9ebf4576b304eec2086dc8cc0458fe5542e5453"],
                    ["6f9d9b803ecf191637c73a4413dfa180fddf84a5947fbc9c606ed86c3fac3a7", "7c80c68e603059ba69b8e2a30e45c4d47ea4dd2f5c281002d86890603a842160"],
                    ["3322d401243c4e2582a2147c104d6ecbf774d163db0f5e5313b7e0e742d0e6bd", "56e70797e9664ef5bfb019bc4ddaf9b72805f63ea2873af624f3a2e96c28b2a0"],
                    ["85672c7d2de0b7da2bd1770d89665868741b3f9af7643397721d74d28134ab83", "7c481b9b5b43b2eb6374049bfa62c2e5e77f17fcc5298f44c8e3094f790313a6"],
                    ["948bf809b1988a46b06c9f1919413b10f9226c60f668832ffd959af60c82a0a", "53a562856dcb6646dc6b74c5d1c3418c6d4dff08c97cd2bed4cb7f88d8c8e589"],
                    ["6260ce7f461801c34f067ce0f02873a8f1b0e44dfc69752accecd819f38fd8e8", "bc2da82b6fa5b571a7f09049776a1ef7ecd292238051c198c1a84e95b2b4ae17"],
                    ["e5037de0afc1d8d43d8348414bbf4103043ec8f575bfdc432953cc8d2037fa2d", "4571534baa94d3b5f9f98d09fb990bddbd5f5b03ec481f10e0e5dc841d755bda"],
                    ["e06372b0f4a207adf5ea905e8f1771b4e7e8dbd1c6a6c5b725866a0ae4fce725", "7a908974bce18cfe12a27bb2ad5a488cd7484a7787104870b27034f94eee31dd"],
                    ["213c7a715cd5d45358d0bbf9dc0ce02204b10bdde2a3f58540ad6908d0559754", "4b6dad0b5ae462507013ad06245ba190bb4850f5f36a7eeddff2c27534b458f2"],
                    ["4e7c272a7af4b34e8dbb9352a5419a87e2838c70adc62cddf0cc3a3b08fbd53c", "17749c766c9d0b18e16fd09f6def681b530b9614bff7dd33e0b3941817dcaae6"],
                    ["fea74e3dbe778b1b10f238ad61686aa5c76e3db2be43057632427e2840fb27b6", "6e0568db9b0b13297cf674deccb6af93126b596b973f7b77701d3db7f23cb96f"],
                    ["76e64113f677cf0e10a2570d599968d31544e179b760432952c02a4417bdde39", "c90ddf8dee4e95cf577066d70681f0d35e2a33d2b56d2032b4b1752d1901ac01"],
                    ["c738c56b03b2abe1e8281baa743f8f9a8f7cc643df26cbee3ab150242bcbb891", "893fb578951ad2537f718f2eacbfbbbb82314eef7880cfe917e735d9699a84c3"],
                    ["d895626548b65b81e264c7637c972877d1d72e5f3a925014372e9f6588f6c14b", "febfaa38f2bc7eae728ec60818c340eb03428d632bb067e179363ed75d7d991f"],
                    ["b8da94032a957518eb0f6433571e8761ceffc73693e84edd49150a564f676e03", "2804dfa44805a1e4d7c99cc9762808b092cc584d95ff3b511488e4e74efdf6e7"],
                    ["e80fea14441fb33a7d8adab9475d7fab2019effb5156a792f1a11778e3c0df5d", "eed1de7f638e00771e89768ca3ca94472d155e80af322ea9fcb4291b6ac9ec78"],
                    ["a301697bdfcd704313ba48e51d567543f2a182031efd6915ddc07bbcc4e16070", "7370f91cfb67e4f5081809fa25d40f9b1735dbf7c0a11a130c0d1a041e177ea1"],
                    ["90ad85b389d6b936463f9d0512678de208cc330b11307fffab7ac63e3fb04ed4", "e507a3620a38261affdcbd9427222b839aefabe1582894d991d4d48cb6ef150"],
                    ["8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0da", "662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82"],
                    ["e4f3fb0176af85d65ff99ff9198c36091f48e86503681e3e6686fd5053231e11", "1e63633ad0ef4f1c1661a6d0ea02b7286cc7e74ec951d1c9822c38576feb73bc"],
                    ["8c00fa9b18ebf331eb961537a45a4266c7034f2f0d4e1d0716fb6eae20eae29e", "efa47267fea521a1a9dc343a3736c974c2fadafa81e36c54e7d2a4c66702414b"],
                    ["e7a26ce69dd4829f3e10cec0a9e98ed3143d084f308b92c0997fddfc60cb3e41", "2a758e300fa7984b471b006a1aafbb18d0a6b2c0420e83e20e8a9421cf2cfd51"],
                    ["b6459e0ee3662ec8d23540c223bcbdc571cbcb967d79424f3cf29eb3de6b80ef", "67c876d06f3e06de1dadf16e5661db3c4b3ae6d48e35b2ff30bf0b61a71ba45"],
                    ["d68a80c8280bb840793234aa118f06231d6f1fc67e73c5a5deda0f5b496943e8", "db8ba9fff4b586d00c4b1f9177b0e28b5b0e7b8f7845295a294c84266b133120"],
                    ["324aed7df65c804252dc0270907a30b09612aeb973449cea4095980fc28d3d5d", "648a365774b61f2ff130c0c35aec1f4f19213b0c7e332843967224af96ab7c84"],
                    ["4df9c14919cde61f6d51dfdbe5fee5dceec4143ba8d1ca888e8bd373fd054c96", "35ec51092d8728050974c23a1d85d4b5d506cdc288490192ebac06cad10d5d"],
                    ["9c3919a84a474870faed8a9c1cc66021523489054d7f0308cbfc99c8ac1f98cd", "ddb84f0f4a4ddd57584f044bf260e641905326f76c64c8e6be7e5e03d4fc599d"],
                    ["6057170b1dd12fdf8de05f281d8e06bb91e1493a8b91d4cc5a21382120a959e5", "9a1af0b26a6a4807add9a2daf71df262465152bc3ee24c65e899be932385a2a8"],
                    ["a576df8e23a08411421439a4518da31880cef0fba7d4df12b1a6973eecb94266", "40a6bf20e76640b2c92b97afe58cd82c432e10a7f514d9f3ee8be11ae1b28ec8"],
                    ["7778a78c28dec3e30a05fe9629de8c38bb30d1f5cf9a3a208f763889be58ad71", "34626d9ab5a5b22ff7098e12f2ff580087b38411ff24ac563b513fc1fd9f43ac"],
                    ["928955ee637a84463729fd30e7afd2ed5f96274e5ad7e5cb09eda9c06d903ac", "c25621003d3f42a827b78a13093a95eeac3d26efa8a8d83fc5180e935bcd091f"],
                    ["85d0fef3ec6db109399064f3a0e3b2855645b4a907ad354527aae75163d82751", "1f03648413a38c0be29d496e582cf5663e8751e96877331582c237a24eb1f962"],
                    ["ff2b0dce97eece97c1c9b6041798b85dfdfb6d8882da20308f5404824526087e", "493d13fef524ba188af4c4dc54d07936c7b7ed6fb90e2ceb2c951e01f0c29907"],
                    ["827fbbe4b1e880ea9ed2b2e6301b212b57f1ee148cd6dd28780e5e2cf856e241", "c60f9c923c727b0b71bef2c67d1d12687ff7a63186903166d605b68baec293ec"],
                    ["eaa649f21f51bdbae7be4ae34ce6e5217a58fdce7f47f9aa7f3b58fa2120e2b3", "be3279ed5bbbb03ac69a80f89879aa5a01a6b965f13f7e59d47a5305ba5ad93d"],
                    ["e4a42d43c5cf169d9391df6decf42ee541b6d8f0c9a137401e23632dda34d24f", "4d9f92e716d1c73526fc99ccfb8ad34ce886eedfa8d8e4f13a7f7131deba9414"],
                    ["1ec80fef360cbdd954160fadab352b6b92b53576a88fea4947173b9d4300bf19", "aeefe93756b5340d2f3a4958a7abbf5e0146e77f6295a07b671cdc1cc107cefd"],
                    ["146a778c04670c2f91b00af4680dfa8bce3490717d58ba889ddb5928366642be", "b318e0ec3354028add669827f9d4b2870aaa971d2f7e5ed1d0b297483d83efd0"],
                    ["fa50c0f61d22e5f07e3acebb1aa07b128d0012209a28b9776d76a8793180eef9", "6b84c6922397eba9b72cd2872281a68a5e683293a57a213b38cd8d7d3f4f2811"],
                    ["da1d61d0ca721a11b1a5bf6b7d88e8421a288ab5d5bba5220e53d32b5f067ec2", "8157f55a7c99306c79c0766161c91e2966a73899d279b48a655fba0f1ad836f1"],
                    ["a8e282ff0c9706907215ff98e8fd416615311de0446f1e062a73b0610d064e13", "7f97355b8db81c09abfb7f3c5b2515888b679a3e50dd6bd6cef7c73111f4cc0c"],
                    ["174a53b9c9a285872d39e56e6913cab15d59b1fa512508c022f382de8319497c", "ccc9dc37abfc9c1657b4155f2c47f9e6646b3a1d8cb9854383da13ac079afa73"],
                    ["959396981943785c3d3e57edf5018cdbe039e730e4918b3d884fdff09475b7ba", "2e7e552888c331dd8ba0386a4b9cd6849c653f64c8709385e9b8abf87524f2fd"],
                    ["d2a63a50ae401e56d645a1153b109a8fcca0a43d561fba2dbb51340c9d82b151", "e82d86fb6443fcb7565aee58b2948220a70f750af484ca52d4142174dcf89405"],
                    ["64587e2335471eb890ee7896d7cfdc866bacbdbd3839317b3436f9b45617e073", "d99fcdd5bf6902e2ae96dd6447c299a185b90a39133aeab358299e5e9faf6589"],
                    ["8481bde0e4e4d885b3a546d3e549de042f0aa6cea250e7fd358d6c86dd45e458", "38ee7b8cba5404dd84a25bf39cecb2ca900a79c42b262e556d64b1b59779057e"],
                    ["13464a57a78102aa62b6979ae817f4637ffcfed3c4b1ce30bcd6303f6caf666b", "69be159004614580ef7e433453ccb0ca48f300a81d0942e13f495a907f6ecc27"],
                    ["bc4a9df5b713fe2e9aef430bcc1dc97a0cd9ccede2f28588cada3a0d2d83f366", "d3a81ca6e785c06383937adf4b798caa6e8a9fbfa547b16d758d666581f33c1"],
                    ["8c28a97bf8298bc0d23d8c749452a32e694b65e30a9472a3954ab30fe5324caa", "40a30463a3305193378fedf31f7cc0eb7ae784f0451cb9459e71dc73cbef9482"],
                    ["8ea9666139527a8c1dd94ce4f071fd23c8b350c5a4bb33748c4ba111faccae0", "620efabbc8ee2782e24e7c0cfb95c5d735b783be9cf0f8e955af34a30e62b945"],
                    ["dd3625faef5ba06074669716bbd3788d89bdde815959968092f76cc4eb9a9787", "7a188fa3520e30d461da2501045731ca941461982883395937f68d00c644a573"],
                    ["f710d79d9eb962297e4f6232b40e8f7feb2bc63814614d692c12de752408221e", "ea98e67232d3b3295d3b535532115ccac8612c721851617526ae47a9c77bfc82"]
                ]
            },
            naf: {
                wnd: 7,
                points: [
                    ["f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9", "388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672"],
                    ["2f8bde4d1a07209355b4a7250a5c5128e88b84bddc619ab7cba8d569b240efe4", "d8ac222636e5e3d6d4dba9dda6c9c426f788271bab0d6840dca87d3aa6ac62d6"],
                    ["5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc", "6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264da"],
                    ["acd484e2f0c7f65309ad178a9f559abde09796974c57e714c35f110dfc27ccbe", "cc338921b0a7d9fd64380971763b61e9add888a4375f8e0f05cc262ac64f9c37"],
                    ["774ae7f858a9411e5ef4246b70c65aac5649980be5c17891bbec17895da008cb", "d984a032eb6b5e190243dd56d7b7b365372db1e2dff9d6a8301d74c9c953c61b"],
                    ["f28773c2d975288bc7d1d205c3748651b075fbc6610e58cddeeddf8f19405aa8", "ab0902e8d880a89758212eb65cdaf473a1a06da521fa91f29b5cb52db03ed81"],
                    ["d7924d4f7d43ea965a465ae3095ff41131e5946f3c85f79e44adbcf8e27e080e", "581e2872a86c72a683842ec228cc6defea40af2bd896d3a5c504dc9ff6a26b58"],
                    ["defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34", "4211ab0694635168e997b0ead2a93daeced1f4a04a95c0f6cfb199f69e56eb77"],
                    ["2b4ea0a797a443d293ef5cff444f4979f06acfebd7e86d277475656138385b6c", "85e89bc037945d93b343083b5a1c86131a01f60c50269763b570c854e5c09b7a"],
                    ["352bbf4a4cdd12564f93fa332ce333301d9ad40271f8107181340aef25be59d5", "321eb4075348f534d59c18259dda3e1f4a1b3b2e71b1039c67bd3d8bcf81998c"],
                    ["2fa2104d6b38d11b0230010559879124e42ab8dfeff5ff29dc9cdadd4ecacc3f", "2de1068295dd865b64569335bd5dd80181d70ecfc882648423ba76b532b7d67"],
                    ["9248279b09b4d68dab21a9b066edda83263c3d84e09572e269ca0cd7f5453714", "73016f7bf234aade5d1aa71bdea2b1ff3fc0de2a887912ffe54a32ce97cb3402"],
                    ["daed4f2be3a8bf278e70132fb0beb7522f570e144bf615c07e996d443dee8729", "a69dce4a7d6c98e8d4a1aca87ef8d7003f83c230f3afa726ab40e52290be1c55"],
                    ["c44d12c7065d812e8acf28d7cbb19f9011ecd9e9fdf281b0e6a3b5e87d22e7db", "2119a460ce326cdc76c45926c982fdac0e106e861edf61c5a039063f0e0e6482"],
                    ["6a245bf6dc698504c89a20cfded60853152b695336c28063b61c65cbd269e6b4", "e022cf42c2bd4a708b3f5126f16a24ad8b33ba48d0423b6efd5e6348100d8a82"],
                    ["1697ffa6fd9de627c077e3d2fe541084ce13300b0bec1146f95ae57f0d0bd6a5", "b9c398f186806f5d27561506e4557433a2cf15009e498ae7adee9d63d01b2396"],
                    ["605bdb019981718b986d0f07e834cb0d9deb8360ffb7f61df982345ef27a7479", "2972d2de4f8d20681a78d93ec96fe23c26bfae84fb14db43b01e1e9056b8c49"],
                    ["62d14dab4150bf497402fdc45a215e10dcb01c354959b10cfe31c7e9d87ff33d", "80fc06bd8cc5b01098088a1950eed0db01aa132967ab472235f5642483b25eaf"],
                    ["80c60ad0040f27dade5b4b06c408e56b2c50e9f56b9b8b425e555c2f86308b6f", "1c38303f1cc5c30f26e66bad7fe72f70a65eed4cbe7024eb1aa01f56430bd57a"],
                    ["7a9375ad6167ad54aa74c6348cc54d344cc5dc9487d847049d5eabb0fa03c8fb", "d0e3fa9eca8726909559e0d79269046bdc59ea10c70ce2b02d499ec224dc7f7"],
                    ["d528ecd9b696b54c907a9ed045447a79bb408ec39b68df504bb51f459bc3ffc9", "eecf41253136e5f99966f21881fd656ebc4345405c520dbc063465b521409933"],
                    ["49370a4b5f43412ea25f514e8ecdad05266115e4a7ecb1387231808f8b45963", "758f3f41afd6ed428b3081b0512fd62a54c3f3afbb5b6764b653052a12949c9a"],
                    ["77f230936ee88cbbd73df930d64702ef881d811e0e1498e2f1c13eb1fc345d74", "958ef42a7886b6400a08266e9ba1b37896c95330d97077cbbe8eb3c7671c60d6"],
                    ["f2dac991cc4ce4b9ea44887e5c7c0bce58c80074ab9d4dbaeb28531b7739f530", "e0dedc9b3b2f8dad4da1f32dec2531df9eb5fbeb0598e4fd1a117dba703a3c37"],
                    ["463b3d9f662621fb1b4be8fbbe2520125a216cdfc9dae3debcba4850c690d45b", "5ed430d78c296c3543114306dd8622d7c622e27c970a1de31cb377b01af7307e"],
                    ["f16f804244e46e2a09232d4aff3b59976b98fac14328a2d1a32496b49998f247", "cedabd9b82203f7e13d206fcdf4e33d92a6c53c26e5cce26d6579962c4e31df6"],
                    ["caf754272dc84563b0352b7a14311af55d245315ace27c65369e15f7151d41d1", "cb474660ef35f5f2a41b643fa5e460575f4fa9b7962232a5c32f908318a04476"],
                    ["2600ca4b282cb986f85d0f1709979d8b44a09c07cb86d7c124497bc86f082120", "4119b88753c15bd6a693b03fcddbb45d5ac6be74ab5f0ef44b0be9475a7e4b40"],
                    ["7635ca72d7e8432c338ec53cd12220bc01c48685e24f7dc8c602a7746998e435", "91b649609489d613d1d5e590f78e6d74ecfc061d57048bad9e76f302c5b9c61"],
                    ["754e3239f325570cdbbf4a87deee8a66b7f2b33479d468fbc1a50743bf56cc18", "673fb86e5bda30fb3cd0ed304ea49a023ee33d0197a695d0c5d98093c536683"],
                    ["e3e6bd1071a1e96aff57859c82d570f0330800661d1c952f9fe2694691d9b9e8", "59c9e0bba394e76f40c0aa58379a3cb6a5a2283993e90c4167002af4920e37f5"],
                    ["186b483d056a033826ae73d88f732985c4ccb1f32ba35f4b4cc47fdcf04aa6eb", "3b952d32c67cf77e2e17446e204180ab21fb8090895138b4a4a797f86e80888b"],
                    ["df9d70a6b9876ce544c98561f4be4f725442e6d2b737d9c91a8321724ce0963f", "55eb2dafd84d6ccd5f862b785dc39d4ab157222720ef9da217b8c45cf2ba2417"],
                    ["5edd5cc23c51e87a497ca815d5dce0f8ab52554f849ed8995de64c5f34ce7143", "efae9c8dbc14130661e8cec030c89ad0c13c66c0d17a2905cdc706ab7399a868"],
                    ["290798c2b6476830da12fe02287e9e777aa3fba1c355b17a722d362f84614fba", "e38da76dcd440621988d00bcf79af25d5b29c094db2a23146d003afd41943e7a"],
                    ["af3c423a95d9f5b3054754efa150ac39cd29552fe360257362dfdecef4053b45", "f98a3fd831eb2b749a93b0e6f35cfb40c8cd5aa667a15581bc2feded498fd9c6"],
                    ["766dbb24d134e745cccaa28c99bf274906bb66b26dcf98df8d2fed50d884249a", "744b1152eacbe5e38dcc887980da38b897584a65fa06cedd2c924f97cbac5996"],
                    ["59dbf46f8c94759ba21277c33784f41645f7b44f6c596a58ce92e666191abe3e", "c534ad44175fbc300f4ea6ce648309a042ce739a7919798cd85e216c4a307f6e"],
                    ["f13ada95103c4537305e691e74e9a4a8dd647e711a95e73cb62dc6018cfd87b8", "e13817b44ee14de663bf4bc808341f326949e21a6a75c2570778419bdaf5733d"],
                    ["7754b4fa0e8aced06d4167a2c59cca4cda1869c06ebadfb6488550015a88522c", "30e93e864e669d82224b967c3020b8fa8d1e4e350b6cbcc537a48b57841163a2"],
                    ["948dcadf5990e048aa3874d46abef9d701858f95de8041d2a6828c99e2262519", "e491a42537f6e597d5d28a3224b1bc25df9154efbd2ef1d2cbba2cae5347d57e"],
                    ["7962414450c76c1689c7b48f8202ec37fb224cf5ac0bfa1570328a8a3d7c77ab", "100b610ec4ffb4760d5c1fc133ef6f6b12507a051f04ac5760afa5b29db83437"],
                    ["3514087834964b54b15b160644d915485a16977225b8847bb0dd085137ec47ca", "ef0afbb2056205448e1652c48e8127fc6039e77c15c2378b7e7d15a0de293311"],
                    ["d3cc30ad6b483e4bc79ce2c9dd8bc54993e947eb8df787b442943d3f7b527eaf", "8b378a22d827278d89c5e9be8f9508ae3c2ad46290358630afb34db04eede0a4"],
                    ["1624d84780732860ce1c78fcbfefe08b2b29823db913f6493975ba0ff4847610", "68651cf9b6da903e0914448c6cd9d4ca896878f5282be4c8cc06e2a404078575"],
                    ["733ce80da955a8a26902c95633e62a985192474b5af207da6df7b4fd5fc61cd4", "f5435a2bd2badf7d485a4d8b8db9fcce3e1ef8e0201e4578c54673bc1dc5ea1d"],
                    ["15d9441254945064cf1a1c33bbd3b49f8966c5092171e699ef258dfab81c045c", "d56eb30b69463e7234f5137b73b84177434800bacebfc685fc37bbe9efe4070d"],
                    ["a1d0fcf2ec9de675b612136e5ce70d271c21417c9d2b8aaaac138599d0717940", "edd77f50bcb5a3cab2e90737309667f2641462a54070f3d519212d39c197a629"],
                    ["e22fbe15c0af8ccc5780c0735f84dbe9a790badee8245c06c7ca37331cb36980", "a855babad5cd60c88b430a69f53a1a7a38289154964799be43d06d77d31da06"],
                    ["311091dd9860e8e20ee13473c1155f5f69635e394704eaa74009452246cfa9b3", "66db656f87d1f04fffd1f04788c06830871ec5a64feee685bd80f0b1286d8374"],
                    ["34c1fd04d301be89b31c0442d3e6ac24883928b45a9340781867d4232ec2dbdf", "9414685e97b1b5954bd46f730174136d57f1ceeb487443dc5321857ba73abee"],
                    ["f219ea5d6b54701c1c14de5b557eb42a8d13f3abbcd08affcc2a5e6b049b8d63", "4cb95957e83d40b0f73af4544cccf6b1f4b08d3c07b27fb8d8c2962a400766d1"],
                    ["d7b8740f74a8fbaab1f683db8f45de26543a5490bca627087236912469a0b448", "fa77968128d9c92ee1010f337ad4717eff15db5ed3c049b3411e0315eaa4593b"],
                    ["32d31c222f8f6f0ef86f7c98d3a3335ead5bcd32abdd94289fe4d3091aa824bf", "5f3032f5892156e39ccd3d7915b9e1da2e6dac9e6f26e961118d14b8462e1661"],
                    ["7461f371914ab32671045a155d9831ea8793d77cd59592c4340f86cbc18347b5", "8ec0ba238b96bec0cbdddcae0aa442542eee1ff50c986ea6b39847b3cc092ff6"],
                    ["ee079adb1df1860074356a25aa38206a6d716b2c3e67453d287698bad7b2b2d6", "8dc2412aafe3be5c4c5f37e0ecc5f9f6a446989af04c4e25ebaac479ec1c8c1e"],
                    ["16ec93e447ec83f0467b18302ee620f7e65de331874c9dc72bfd8616ba9da6b5", "5e4631150e62fb40d0e8c2a7ca5804a39d58186a50e497139626778e25b0674d"],
                    ["eaa5f980c245f6f038978290afa70b6bd8855897f98b6aa485b96065d537bd99", "f65f5d3e292c2e0819a528391c994624d784869d7e6ea67fb18041024edc07dc"],
                    ["78c9407544ac132692ee1910a02439958ae04877151342ea96c4b6b35a49f51", "f3e0319169eb9b85d5404795539a5e68fa1fbd583c064d2462b675f194a3ddb4"],
                    ["494f4be219a1a77016dcd838431aea0001cdc8ae7a6fc688726578d9702857a5", "42242a969283a5f339ba7f075e36ba2af925ce30d767ed6e55f4b031880d562c"],
                    ["a598a8030da6d86c6bc7f2f5144ea549d28211ea58faa70ebf4c1e665c1fe9b5", "204b5d6f84822c307e4b4a7140737aec23fc63b65b35f86a10026dbd2d864e6b"],
                    ["c41916365abb2b5d09192f5f2dbeafec208f020f12570a184dbadc3e58595997", "4f14351d0087efa49d245b328984989d5caf9450f34bfc0ed16e96b58fa9913"],
                    ["841d6063a586fa475a724604da03bc5b92a2e0d2e0a36acfe4c73a5514742881", "73867f59c0659e81904f9a1c7543698e62562d6744c169ce7a36de01a8d6154"],
                    ["5e95bb399a6971d376026947f89bde2f282b33810928be4ded112ac4d70e20d5", "39f23f366809085beebfc71181313775a99c9aed7d8ba38b161384c746012865"],
                    ["36e4641a53948fd476c39f8a99fd974e5ec07564b5315d8bf99471bca0ef2f66", "d2424b1b1abe4eb8164227b085c9aa9456ea13493fd563e06fd51cf5694c78fc"],
                    ["336581ea7bfbbb290c191a2f507a41cf5643842170e914faeab27c2c579f726", "ead12168595fe1be99252129b6e56b3391f7ab1410cd1e0ef3dcdcabd2fda224"],
                    ["8ab89816dadfd6b6a1f2634fcf00ec8403781025ed6890c4849742706bd43ede", "6fdcef09f2f6d0a044e654aef624136f503d459c3e89845858a47a9129cdd24e"],
                    ["1e33f1a746c9c5778133344d9299fcaa20b0938e8acff2544bb40284b8c5fb94", "60660257dd11b3aa9c8ed618d24edff2306d320f1d03010e33a7d2057f3b3b6"],
                    ["85b7c1dcb3cec1b7ee7f30ded79dd20a0ed1f4cc18cbcfcfa410361fd8f08f31", "3d98a9cdd026dd43f39048f25a8847f4fcafad1895d7a633c6fed3c35e999511"],
                    ["29df9fbd8d9e46509275f4b125d6d45d7fbe9a3b878a7af872a2800661ac5f51", "b4c4fe99c775a606e2d8862179139ffda61dc861c019e55cd2876eb2a27d84b"],
                    ["a0b1cae06b0a847a3fea6e671aaf8adfdfe58ca2f768105c8082b2e449fce252", "ae434102edde0958ec4b19d917a6a28e6b72da1834aff0e650f049503a296cf2"],
                    ["4e8ceafb9b3e9a136dc7ff67e840295b499dfb3b2133e4ba113f2e4c0e121e5", "cf2174118c8b6d7a4b48f6d534ce5c79422c086a63460502b827ce62a326683c"],
                    ["d24a44e047e19b6f5afb81c7ca2f69080a5076689a010919f42725c2b789a33b", "6fb8d5591b466f8fc63db50f1c0f1c69013f996887b8244d2cdec417afea8fa3"],
                    ["ea01606a7a6c9cdd249fdfcfacb99584001edd28abbab77b5104e98e8e3b35d4", "322af4908c7312b0cfbfe369f7a7b3cdb7d4494bc2823700cfd652188a3ea98d"],
                    ["af8addbf2b661c8a6c6328655eb96651252007d8c5ea31be4ad196de8ce2131f", "6749e67c029b85f52a034eafd096836b2520818680e26ac8f3dfbcdb71749700"],
                    ["e3ae1974566ca06cc516d47e0fb165a674a3dabcfca15e722f0e3450f45889", "2aeabe7e4531510116217f07bf4d07300de97e4874f81f533420a72eeb0bd6a4"],
                    ["591ee355313d99721cf6993ffed1e3e301993ff3ed258802075ea8ced397e246", "b0ea558a113c30bea60fc4775460c7901ff0b053d25ca2bdeee98f1a4be5d196"],
                    ["11396d55fda54c49f19aa97318d8da61fa8584e47b084945077cf03255b52984", "998c74a8cd45ac01289d5833a7beb4744ff536b01b257be4c5767bea93ea57a4"],
                    ["3c5d2a1ba39c5a1790000738c9e0c40b8dcdfd5468754b6405540157e017aa7a", "b2284279995a34e2f9d4de7396fc18b80f9b8b9fdd270f6661f79ca4c81bd257"],
                    ["cc8704b8a60a0defa3a99a7299f2e9c3fbc395afb04ac078425ef8a1793cc030", "bdd46039feed17881d1e0862db347f8cf395b74fc4bcdc4e940b74e3ac1f1b13"],
                    ["c533e4f7ea8555aacd9777ac5cad29b97dd4defccc53ee7ea204119b2889b197", "6f0a256bc5efdf429a2fb6242f1a43a2d9b925bb4a4b3a26bb8e0f45eb596096"],
                    ["c14f8f2ccb27d6f109f6d08d03cc96a69ba8c34eec07bbcf566d48e33da6593", "c359d6923bb398f7fd4473e16fe1c28475b740dd098075e6c0e8649113dc3a38"],
                    ["a6cbc3046bc6a450bac24789fa17115a4c9739ed75f8f21ce441f72e0b90e6ef", "21ae7f4680e889bb130619e2c0f95a360ceb573c70603139862afd617fa9b9f"],
                    ["347d6d9a02c48927ebfb86c1359b1caf130a3c0267d11ce6344b39f99d43cc38", "60ea7f61a353524d1c987f6ecec92f086d565ab687870cb12689ff1e31c74448"],
                    ["da6545d2181db8d983f7dcb375ef5866d47c67b1bf31c8cf855ef7437b72656a", "49b96715ab6878a79e78f07ce5680c5d6673051b4935bd897fea824b77dc208a"],
                    ["c40747cc9d012cb1a13b8148309c6de7ec25d6945d657146b9d5994b8feb1111", "5ca560753be2a12fc6de6caf2cb489565db936156b9514e1bb5e83037e0fa2d4"],
                    ["4e42c8ec82c99798ccf3a610be870e78338c7f713348bd34c8203ef4037f3502", "7571d74ee5e0fb92a7a8b33a07783341a5492144cc54bcc40a94473693606437"],
                    ["3775ab7089bc6af823aba2e1af70b236d251cadb0c86743287522a1b3b0dedea", "be52d107bcfa09d8bcb9736a828cfa7fac8db17bf7a76a2c42ad961409018cf7"],
                    ["cee31cbf7e34ec379d94fb814d3d775ad954595d1314ba8846959e3e82f74e26", "8fd64a14c06b589c26b947ae2bcf6bfa0149ef0be14ed4d80f448a01c43b1c6d"],
                    ["b4f9eaea09b6917619f6ea6a4eb5464efddb58fd45b1ebefcdc1a01d08b47986", "39e5c9925b5a54b07433a4f18c61726f8bb131c012ca542eb24a8ac07200682a"],
                    ["d4263dfc3d2df923a0179a48966d30ce84e2515afc3dccc1b77907792ebcc60e", "62dfaf07a0f78feb30e30d6295853ce189e127760ad6cf7fae164e122a208d54"],
                    ["48457524820fa65a4f8d35eb6930857c0032acc0a4a2de422233eeda897612c4", "25a748ab367979d98733c38a1fa1c2e7dc6cc07db2d60a9ae7a76aaa49bd0f77"],
                    ["dfeeef1881101f2cb11644f3a2afdfc2045e19919152923f367a1767c11cceda", "ecfb7056cf1de042f9420bab396793c0c390bde74b4bbdff16a83ae09a9a7517"],
                    ["6d7ef6b17543f8373c573f44e1f389835d89bcbc6062ced36c82df83b8fae859", "cd450ec335438986dfefa10c57fea9bcc521a0959b2d80bbf74b190dca712d10"],
                    ["e75605d59102a5a2684500d3b991f2e3f3c88b93225547035af25af66e04541f", "f5c54754a8f71ee540b9b48728473e314f729ac5308b06938360990e2bfad125"],
                    ["eb98660f4c4dfaa06a2be453d5020bc99a0c2e60abe388457dd43fefb1ed620c", "6cb9a8876d9cb8520609af3add26cd20a0a7cd8a9411131ce85f44100099223e"],
                    ["13e87b027d8514d35939f2e6892b19922154596941888336dc3563e3b8dba942", "fef5a3c68059a6dec5d624114bf1e91aac2b9da568d6abeb2570d55646b8adf1"],
                    ["ee163026e9fd6fe017c38f06a5be6fc125424b371ce2708e7bf4491691e5764a", "1acb250f255dd61c43d94ccc670d0f58f49ae3fa15b96623e5430da0ad6c62b2"],
                    ["b268f5ef9ad51e4d78de3a750c2dc89b1e626d43505867999932e5db33af3d80", "5f310d4b3c99b9ebb19f77d41c1dee018cf0d34fd4191614003e945a1216e423"],
                    ["ff07f3118a9df035e9fad85eb6c7bfe42b02f01ca99ceea3bf7ffdba93c4750d", "438136d603e858a3a5c440c38eccbaddc1d2942114e2eddd4740d098ced1f0d8"],
                    ["8d8b9855c7c052a34146fd20ffb658bea4b9f69e0d825ebec16e8c3ce2b526a1", "cdb559eedc2d79f926baf44fb84ea4d44bcf50fee51d7ceb30e2e7f463036758"],
                    ["52db0b5384dfbf05bfa9d472d7ae26dfe4b851ceca91b1eba54263180da32b63", "c3b997d050ee5d423ebaf66a6db9f57b3180c902875679de924b69d84a7b375"],
                    ["e62f9490d3d51da6395efd24e80919cc7d0f29c3f3fa48c6fff543becbd43352", "6d89ad7ba4876b0b22c2ca280c682862f342c8591f1daf5170e07bfd9ccafa7d"],
                    ["7f30ea2476b399b4957509c88f77d0191afa2ff5cb7b14fd6d8e7d65aaab1193", "ca5ef7d4b231c94c3b15389a5f6311e9daff7bb67b103e9880ef4bff637acaec"],
                    ["5098ff1e1d9f14fb46a210fada6c903fef0fb7b4a1dd1d9ac60a0361800b7a00", "9731141d81fc8f8084d37c6e7542006b3ee1b40d60dfe5362a5b132fd17ddc0"],
                    ["32b78c7de9ee512a72895be6b9cbefa6e2f3c4ccce445c96b9f2c81e2778ad58", "ee1849f513df71e32efc3896ee28260c73bb80547ae2275ba497237794c8753c"],
                    ["e2cb74fddc8e9fbcd076eef2a7c72b0ce37d50f08269dfc074b581550547a4f7", "d3aa2ed71c9dd2247a62df062736eb0baddea9e36122d2be8641abcb005cc4a4"],
                    ["8438447566d4d7bedadc299496ab357426009a35f235cb141be0d99cd10ae3a8", "c4e1020916980a4da5d01ac5e6ad330734ef0d7906631c4f2390426b2edd791f"],
                    ["4162d488b89402039b584c6fc6c308870587d9c46f660b878ab65c82c711d67e", "67163e903236289f776f22c25fb8a3afc1732f2b84b4e95dbda47ae5a0852649"],
                    ["3fad3fa84caf0f34f0f89bfd2dcf54fc175d767aec3e50684f3ba4a4bf5f683d", "cd1bc7cb6cc407bb2f0ca647c718a730cf71872e7d0d2a53fa20efcdfe61826"],
                    ["674f2600a3007a00568c1a7ce05d0816c1fb84bf1370798f1c69532faeb1a86b", "299d21f9413f33b3edf43b257004580b70db57da0b182259e09eecc69e0d38a5"],
                    ["d32f4da54ade74abb81b815ad1fb3b263d82d6c692714bcff87d29bd5ee9f08f", "f9429e738b8e53b968e99016c059707782e14f4535359d582fc416910b3eea87"],
                    ["30e4e670435385556e593657135845d36fbb6931f72b08cb1ed954f1e3ce3ff6", "462f9bce619898638499350113bbc9b10a878d35da70740dc695a559eb88db7b"],
                    ["be2062003c51cc3004682904330e4dee7f3dcd10b01e580bf1971b04d4cad297", "62188bc49d61e5428573d48a74e1c655b1c61090905682a0d5558ed72dccb9bc"],
                    ["93144423ace3451ed29e0fb9ac2af211cb6e84a601df5993c419859fff5df04a", "7c10dfb164c3425f5c71a3f9d7992038f1065224f72bb9d1d902a6d13037b47c"],
                    ["b015f8044f5fcbdcf21ca26d6c34fb8197829205c7b7d2a7cb66418c157b112c", "ab8c1e086d04e813744a655b2df8d5f83b3cdc6faa3088c1d3aea1454e3a1d5f"],
                    ["d5e9e1da649d97d89e4868117a465a3a4f8a18de57a140d36b3f2af341a21b52", "4cb04437f391ed73111a13cc1d4dd0db1693465c2240480d8955e8592f27447a"],
                    ["d3ae41047dd7ca065dbf8ed77b992439983005cd72e16d6f996a5316d36966bb", "bd1aeb21ad22ebb22a10f0303417c6d964f8cdd7df0aca614b10dc14d125ac46"],
                    ["463e2763d885f958fc66cdd22800f0a487197d0a82e377b49f80af87c897b065", "bfefacdb0e5d0fd7df3a311a94de062b26b80c61fbc97508b79992671ef7ca7f"],
                    ["7985fdfd127c0567c6f53ec1bb63ec3158e597c40bfe747c83cddfc910641917", "603c12daf3d9862ef2b25fe1de289aed24ed291e0ec6708703a5bd567f32ed03"],
                    ["74a1ad6b5f76e39db2dd249410eac7f99e74c59cb83d2d0ed5ff1543da7703e9", "cc6157ef18c9c63cd6193d83631bbea0093e0968942e8c33d5737fd790e0db08"],
                    ["30682a50703375f602d416664ba19b7fc9bab42c72747463a71d0896b22f6da3", "553e04f6b018b4fa6c8f39e7f311d3176290d0e0f19ca73f17714d9977a22ff8"],
                    ["9e2158f0d7c0d5f26c3791efefa79597654e7a2b2464f52b1ee6c1347769ef57", "712fcdd1b9053f09003a3481fa7762e9ffd7c8ef35a38509e2fbf2629008373"],
                    ["176e26989a43c9cfeba4029c202538c28172e566e3c4fce7322857f3be327d66", "ed8cc9d04b29eb877d270b4878dc43c19aefd31f4eee09ee7b47834c1fa4b1c3"],
                    ["75d46efea3771e6e68abb89a13ad747ecf1892393dfc4f1b7004788c50374da8", "9852390a99507679fd0b86fd2b39a868d7efc22151346e1a3ca4726586a6bed8"],
                    ["809a20c67d64900ffb698c4c825f6d5f2310fb0451c869345b7319f645605721", "9e994980d9917e22b76b061927fa04143d096ccc54963e6a5ebfa5f3f8e286c1"],
                    ["1b38903a43f7f114ed4500b4eac7083fdefece1cf29c63528d563446f972c180", "4036edc931a60ae889353f77fd53de4a2708b26b6f5da72ad3394119daf408f9"]
                ]
            }
        };
    }, {}],
    "Jq2I": [function(require, module, exports) {
        "use strict";
        var f, e = exports,
            a = require("hash.js"),
            b = require("./curve"),
            c = require("./utils"),
            d = c.assert;

        function r(f) {
            "short" === f.type ? this.curve = new b.short(f) : "edwards" === f.type ? this.curve = new b.edwards(f) : this.curve = new b.mont(f), this.g = this.curve.g, this.n = this.curve.n, this.hash = f.hash, d(this.g.validate(), "Invalid curve"), d(this.g.mul(this.n).isInfinity(), "Invalid curve, G*N != O")
        }

        function s(f, a) {
            Object.defineProperty(e, f, {
                configurable: !0,
                enumerable: !0,
                get: function() {
                    var b = new r(a);
                    return Object.defineProperty(e, f, {
                        configurable: !0,
                        enumerable: !0,
                        value: b
                    }), b
                }
            })
        }
        e.PresetCurve = r, s("p192", {
            type: "short",
            prime: "p192",
            p: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",
            a: "ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc",
            b: "64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1",
            n: "ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831",
            hash: a.sha256,
            gRed: !1,
            g: ["188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012", "07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811"]
        }), s("p224", {
            type: "short",
            prime: "p224",
            p: "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",
            a: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe",
            b: "b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4",
            n: "ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d",
            hash: a.sha256,
            gRed: !1,
            g: ["b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21", "bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34"]
        }), s("p256", {
            type: "short",
            prime: null,
            p: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff",
            a: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc",
            b: "5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b",
            n: "ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551",
            hash: a.sha256,
            gRed: !1,
            g: ["6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296", "4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5"]
        }), s("p384", {
            type: "short",
            prime: null,
            p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff",
            a: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc",
            b: "b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef",
            n: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973",
            hash: a.sha384,
            gRed: !1,
            g: ["aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7", "3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f"]
        }), s("p521", {
            type: "short",
            prime: null,
            p: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff",
            a: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc",
            b: "00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00",
            n: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409",
            hash: a.sha512,
            gRed: !1,
            g: ["000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66", "00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650"]
        }), s("curve25519", {
            type: "mont",
            prime: "p25519",
            p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
            a: "76d06",
            b: "1",
            n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
            hash: a.sha256,
            gRed: !1,
            g: ["9"]
        }), s("ed25519", {
            type: "edwards",
            prime: "p25519",
            p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
            a: "-1",
            c: "1",
            d: "52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3",
            n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
            hash: a.sha256,
            gRed: !1,
            g: ["216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a", "6666666666666666666666666666666666666666666666666666666666666658"]
        });
        try {
            f = require("./precomputed/secp256k1")
        } catch (t) {
            f = void 0
        }
        s("secp256k1", {
            type: "short",
            prime: "k256",
            p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",
            a: "0",
            b: "7",
            n: "ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141",
            h: "1",
            hash: a.sha256,
            beta: "7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee",
            lambda: "5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72",
            basis: [{
                a: "3086d221a7d46bcde86c90e49284eb15",
                b: "-e4437ed6010e88286f547fa90abfe4c3"
            }, {
                a: "114ca50f7a8e2f3f657c1108d9d44cfd8",
                b: "3086d221a7d46bcde86c90e49284eb15"
            }],
            gRed: !1,
            g: ["79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798", "483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8", f]
        });
    }, {
        "hash.js": "HObn",
        "./curve": "ibwU",
        "./utils": "THL6",
        "./precomputed/secp256k1": "eUz0"
    }],
    "yfnL": [function(require, module, exports) {
        "use strict";
        var t = require("hash.js"),
            e = require("minimalistic-crypto-utils"),
            i = require("minimalistic-assert");

        function s(t) {
            if (!(this instanceof s)) return new s(t);
            this.hash = t.hash, this.predResist = !!t.predResist, this.outLen = this.hash.outSize, this.minEntropy = t.minEntropy || this.hash.hmacStrength, this._reseed = null, this.reseedInterval = null, this.K = null, this.V = null;
            var h = e.toArray(t.entropy, t.entropyEnc || "hex"),
                r = e.toArray(t.nonce, t.nonceEnc || "hex"),
                n = e.toArray(t.pers, t.persEnc || "hex");
            i(h.length >= this.minEntropy / 8, "Not enough entropy. Minimum is: " + this.minEntropy + " bits"), this._init(h, r, n)
        }
        module.exports = s, s.prototype._init = function(t, e, i) {
            var s = t.concat(e).concat(i);
            this.K = new Array(this.outLen / 8), this.V = new Array(this.outLen / 8);
            for (var h = 0; h < this.V.length; h++) this.K[h] = 0, this.V[h] = 1;
            this._update(s), this._reseed = 1, this.reseedInterval = 281474976710656
        }, s.prototype._hmac = function() {
            return new t.hmac(this.hash, this.K)
        }, s.prototype._update = function(t) {
            var e = this._hmac().update(this.V).update([0]);
            t && (e = e.update(t)), this.K = e.digest(), this.V = this._hmac().update(this.V).digest(), t && (this.K = this._hmac().update(this.V).update([1]).update(t).digest(), this.V = this._hmac().update(this.V).digest())
        }, s.prototype.reseed = function(t, s, h, r) {
            "string" != typeof s && (r = h, h = s, s = null), t = e.toArray(t, s), h = e.toArray(h, r), i(t.length >= this.minEntropy / 8, "Not enough entropy. Minimum is: " + this.minEntropy + " bits"), this._update(t.concat(h || [])), this._reseed = 1
        }, s.prototype.generate = function(t, i, s, h) {
            if (this._reseed > this.reseedInterval) throw new Error("Reseed is required");
            "string" != typeof i && (h = s, s = i, i = null), s && (s = e.toArray(s, h || "hex"), this._update(s));
            for (var r = []; r.length < t;) this.V = this._hmac().update(this.V).digest(), r = r.concat(this.V);
            var n = r.slice(0, t);
            return this._update(s), this._reseed++, e.encode(n, i)
        };
    }, {
        "hash.js": "HObn",
        "minimalistic-crypto-utils": "K53u",
        "minimalistic-assert": "tXM1"
    }],
    "KRKn": [function(require, module, exports) {
        "use strict";
        var t = require("bn.js"),
            i = require("../utils"),
            e = i.assert;

        function r(t, i) {
            this.ec = t, this.priv = null, this.pub = null, i.priv && this._importPrivate(i.priv, i.privEnc), i.pub && this._importPublic(i.pub, i.pubEnc)
        }
        module.exports = r, r.fromPublic = function(t, i, e) {
            return i instanceof r ? i : new r(t, {
                pub: i,
                pubEnc: e
            })
        }, r.fromPrivate = function(t, i, e) {
            return i instanceof r ? i : new r(t, {
                priv: i,
                privEnc: e
            })
        }, r.prototype.validate = function() {
            var t = this.getPublic();
            return t.isInfinity() ? {
                result: !1,
                reason: "Invalid public key"
            } : t.validate() ? t.mul(this.ec.curve.n).isInfinity() ? {
                result: !0,
                reason: null
            } : {
                result: !1,
                reason: "Public key * N != O"
            } : {
                result: !1,
                reason: "Public key is not a point"
            }
        }, r.prototype.getPublic = function(t, i) {
            return "string" == typeof t && (i = t, t = null), this.pub || (this.pub = this.ec.g.mul(this.priv)), i ? this.pub.encode(i, t) : this.pub
        }, r.prototype.getPrivate = function(t) {
            return "hex" === t ? this.priv.toString(16, 2) : this.priv
        }, r.prototype._importPrivate = function(i, e) {
            this.priv = new t(i, e || 16), this.priv = this.priv.umod(this.ec.curve.n)
        }, r.prototype._importPublic = function(t, i) {
            if (t.x || t.y) return "mont" === this.ec.curve.type ? e(t.x, "Need x coordinate") : "short" !== this.ec.curve.type && "edwards" !== this.ec.curve.type || e(t.x && t.y, "Need both x and y coordinate"), void(this.pub = this.ec.curve.point(t.x, t.y));
            this.pub = this.ec.curve.decodePoint(t, i)
        }, r.prototype.derive = function(t) {
            return t.mul(this.priv).getX()
        }, r.prototype.sign = function(t, i, e) {
            return this.ec.sign(t, this, i, e)
        }, r.prototype.verify = function(t, i) {
            return this.ec.verify(t, i, this)
        }, r.prototype.inspect = function() {
            return "<Key priv: " + (this.priv && this.priv.toString(16, 2)) + " pub: " + (this.pub && this.pub.inspect()) + " >"
        };
    }, {
        "bn.js": "VOEF",
        "../utils": "THL6"
    }],
    "Dsrt": [function(require, module, exports) {
        "use strict";
        var r = require("bn.js"),
            e = require("../utils"),
            t = e.assert;

        function n(e, a) {
            if (e instanceof n) return e;
            this._importDER(e, a) || (t(e.r && e.s, "Signature without r or s"), this.r = new r(e.r, 16), this.s = new r(e.s, 16), void 0 === e.recoveryParam ? this.recoveryParam = null : this.recoveryParam = e.recoveryParam)
        }

        function a() {
            this.place = 0
        }

        function i(r, e) {
            var t = r[e.place++];
            if (!(128 & t)) return t;
            var n = 15 & t;
            if (0 === n || n > 4) return !1;
            for (var a = 0, i = 0, c = e.place; i < n; i++, c++) a <<= 8, a |= r[c], a >>>= 0;
            return !(a <= 127) && (e.place = c, a)
        }

        function c(r) {
            for (var e = 0, t = r.length - 1; !r[e] && !(128 & r[e + 1]) && e < t;) e++;
            return 0 === e ? r : r.slice(e)
        }

        function o(r, e) {
            if (e < 128) r.push(e);
            else {
                var t = 1 + (Math.log(e) / Math.LN2 >>> 3);
                for (r.push(128 | t); --t;) r.push(e >>> (t << 3) & 255);
                r.push(e)
            }
        }
        module.exports = n, n.prototype._importDER = function(t, n) {
            t = e.toArray(t, n);
            var c = new a;
            if (48 !== t[c.place++]) return !1;
            var o = i(t, c);
            if (!1 === o) return !1;
            if (o + c.place !== t.length) return !1;
            if (2 !== t[c.place++]) return !1;
            var u = i(t, c);
            if (!1 === u) return !1;
            var s = t.slice(c.place, u + c.place);
            if (c.place += u, 2 !== t[c.place++]) return !1;
            var l = i(t, c);
            if (!1 === l) return !1;
            if (t.length !== l + c.place) return !1;
            var f = t.slice(c.place, l + c.place);
            if (0 === s[0]) {
                if (!(128 & s[1])) return !1;
                s = s.slice(1)
            }
            if (0 === f[0]) {
                if (!(128 & f[1])) return !1;
                f = f.slice(1)
            }
            return this.r = new r(s), this.s = new r(f), this.recoveryParam = null, !0
        }, n.prototype.toDER = function(r) {
            var t = this.r.toArray(),
                n = this.s.toArray();
            for (128 & t[0] && (t = [0].concat(t)), 128 & n[0] && (n = [0].concat(n)), t = c(t), n = c(n); !(n[0] || 128 & n[1]);) n = n.slice(1);
            var a = [2];
            o(a, t.length), (a = a.concat(t)).push(2), o(a, n.length);
            var i = a.concat(n),
                u = [48];
            return o(u, i.length), u = u.concat(i), e.encode(u, r)
        };
    }, {
        "bn.js": "VOEF",
        "../utils": "THL6"
    }],
    "Uofk": [function(require, module, exports) {
        "use strict";
        var r = require("bn.js"),
            e = require("hmac-drbg"),
            t = require("../utils"),
            n = require("../curves"),
            i = require("brorand"),
            s = t.assert,
            o = require("./key"),
            u = require("./signature");

        function h(r) {
            if (!(this instanceof h)) return new h(r);
            "string" == typeof r && (s(n.hasOwnProperty(r), "Unknown curve " + r), r = n[r]), r instanceof n.PresetCurve && (r = {
                curve: r
            }), this.curve = r.curve.curve, this.n = this.curve.n, this.nh = this.n.ushrn(1), this.g = this.curve.g, this.g = r.curve.g, this.g.precompute(r.curve.n.bitLength() + 1), this.hash = r.hash || r.curve.hash
        }
        module.exports = h, h.prototype.keyPair = function(r) {
            return new o(this, r)
        }, h.prototype.keyFromPrivate = function(r, e) {
            return o.fromPrivate(this, r, e)
        }, h.prototype.keyFromPublic = function(r, e) {
            return o.fromPublic(this, r, e)
        }, h.prototype.genKeyPair = function(t) {
            t || (t = {});
            for (var n = new e({
                    hash: this.hash,
                    pers: t.pers,
                    persEnc: t.persEnc || "utf8",
                    entropy: t.entropy || i(this.hash.hmacStrength),
                    entropyEnc: t.entropy && t.entropyEnc || "utf8",
                    nonce: this.n.toArray()
                }), s = this.n.byteLength(), o = this.n.sub(new r(2));;) {
                var u = new r(n.generate(s));
                if (!(u.cmp(o) > 0)) return u.iaddn(1), this.keyFromPrivate(u)
            }
        }, h.prototype._truncateToN = function(r, e) {
            var t = 8 * r.byteLength() - this.n.bitLength();
            return t > 0 && (r = r.ushrn(t)), !e && r.cmp(this.n) >= 0 ? r.sub(this.n) : r
        }, h.prototype.sign = function(t, n, i, s) {
            "object" == typeof i && (s = i, i = null), s || (s = {}), n = this.keyFromPrivate(n, i), t = this._truncateToN(new r(t, 16));
            for (var o = this.n.byteLength(), h = n.getPrivate().toArray("be", o), c = t.toArray("be", o), a = new e({
                    hash: this.hash,
                    entropy: h,
                    nonce: c,
                    pers: s.pers,
                    persEnc: s.persEnc || "utf8"
                }), p = this.n.sub(new r(1)), m = 0;; m++) {
                var v = s.k ? s.k(m) : new r(a.generate(this.n.byteLength()));
                if (!((v = this._truncateToN(v, !0)).cmpn(1) <= 0 || v.cmp(p) >= 0)) {
                    var y = this.g.mul(v);
                    if (!y.isInfinity()) {
                        var f = y.getX(),
                            g = f.umod(this.n);
                        if (0 !== g.cmpn(0)) {
                            var d = v.invm(this.n).mul(g.mul(n.getPrivate()).iadd(t));
                            if (0 !== (d = d.umod(this.n)).cmpn(0)) {
                                var b = (y.getY().isOdd() ? 1 : 0) | (0 !== f.cmp(g) ? 2 : 0);
                                return s.canonical && d.cmp(this.nh) > 0 && (d = this.n.sub(d), b ^= 1), new u({
                                    r: g,
                                    s: d,
                                    recoveryParam: b
                                })
                            }
                        }
                    }
                }
            }
        }, h.prototype.verify = function(e, t, n, i) {
            e = this._truncateToN(new r(e, 16)), n = this.keyFromPublic(n, i);
            var s = (t = new u(t, "hex")).r,
                o = t.s;
            if (s.cmpn(1) < 0 || s.cmp(this.n) >= 0) return !1;
            if (o.cmpn(1) < 0 || o.cmp(this.n) >= 0) return !1;
            var h, c = o.invm(this.n),
                a = c.mul(e).umod(this.n),
                p = c.mul(s).umod(this.n);
            return this.curve._maxwellTrick ? !(h = this.g.jmulAdd(a, n.getPublic(), p)).isInfinity() && h.eqXToP(s) : !(h = this.g.mulAdd(a, n.getPublic(), p)).isInfinity() && 0 === h.getX().umod(this.n).cmp(s)
        }, h.prototype.recoverPubKey = function(e, t, n, i) {
            s((3 & n) === n, "The recovery param is more than two bits"), t = new u(t, i);
            var o = this.n,
                h = new r(e),
                c = t.r,
                a = t.s,
                p = 1 & n,
                m = n >> 1;
            if (c.cmp(this.curve.p.umod(this.curve.n)) >= 0 && m) throw new Error("Unable to find sencond key candinate");
            c = m ? this.curve.pointFromX(c.add(this.curve.n), p) : this.curve.pointFromX(c, p);
            var v = t.r.invm(o),
                y = o.sub(h).mul(v).umod(o),
                f = a.mul(v).umod(o);
            return this.g.mulAdd(y, c, f)
        }, h.prototype.getKeyRecoveryParam = function(r, e, t, n) {
            if (null !== (e = new u(e, n)).recoveryParam) return e.recoveryParam;
            for (var i = 0; i < 4; i++) {
                var s;
                try {
                    s = this.recoverPubKey(r, e, i)
                } catch (r) {
                    continue
                }
                if (s.eq(t)) return i
            }
            throw new Error("Unable to find valid recovery factor")
        };
    }, {
        "bn.js": "VOEF",
        "hmac-drbg": "yfnL",
        "../utils": "THL6",
        "../curves": "Jq2I",
        "brorand": "gjcq",
        "./key": "KRKn",
        "./signature": "Dsrt"
    }],
    "w0jg": [function(require, module, exports) {
        "use strict";
        var t = require("../utils"),
            e = t.assert,
            s = t.parseBytes,
            i = t.cachedProperty;

        function n(t, e) {
            this.eddsa = t, this._secret = s(e.secret), t.isPoint(e.pub) ? this._pub = e.pub : this._pubBytes = s(e.pub)
        }
        n.fromPublic = function(t, e) {
            return e instanceof n ? e : new n(t, {
                pub: e
            })
        }, n.fromSecret = function(t, e) {
            return e instanceof n ? e : new n(t, {
                secret: e
            })
        }, n.prototype.secret = function() {
            return this._secret
        }, i(n, "pubBytes", function() {
            return this.eddsa.encodePoint(this.pub())
        }), i(n, "pub", function() {
            return this._pubBytes ? this.eddsa.decodePoint(this._pubBytes) : this.eddsa.g.mul(this.priv())
        }), i(n, "privBytes", function() {
            var t = this.eddsa,
                e = this.hash(),
                s = t.encodingLength - 1,
                i = e.slice(0, t.encodingLength);
            return i[0] &= 248, i[s] &= 127, i[s] |= 64, i
        }), i(n, "priv", function() {
            return this.eddsa.decodeInt(this.privBytes())
        }), i(n, "hash", function() {
            return this.eddsa.hash().update(this.secret()).digest()
        }), i(n, "messagePrefix", function() {
            return this.hash().slice(this.eddsa.encodingLength)
        }), n.prototype.sign = function(t) {
            return e(this._secret, "KeyPair can only verify"), this.eddsa.sign(t, this)
        }, n.prototype.verify = function(t, e) {
            return this.eddsa.verify(t, e, this)
        }, n.prototype.getSecret = function(s) {
            return e(this._secret, "KeyPair is public only"), t.encode(this.secret(), s)
        }, n.prototype.getPublic = function(e) {
            return t.encode(this.pubBytes(), e)
        }, module.exports = n;
    }, {
        "../utils": "THL6"
    }],
    "AjyZ": [function(require, module, exports) {
        "use strict";
        var e = require("bn.js"),
            t = require("../utils"),
            n = t.assert,
            o = t.cachedProperty,
            d = t.parseBytes;

        function i(t, o) {
            this.eddsa = t, "object" != typeof o && (o = d(o)), Array.isArray(o) && (o = {
                R: o.slice(0, t.encodingLength),
                S: o.slice(t.encodingLength)
            }), n(o.R && o.S, "Signature without R or S"), t.isPoint(o.R) && (this._R = o.R), o.S instanceof e && (this._S = o.S), this._Rencoded = Array.isArray(o.R) ? o.R : o.Rencoded, this._Sencoded = Array.isArray(o.S) ? o.S : o.Sencoded
        }
        o(i, "S", function() {
            return this.eddsa.decodeInt(this.Sencoded())
        }), o(i, "R", function() {
            return this.eddsa.decodePoint(this.Rencoded())
        }), o(i, "Rencoded", function() {
            return this.eddsa.encodePoint(this.R())
        }), o(i, "Sencoded", function() {
            return this.eddsa.encodeInt(this.S())
        }), i.prototype.toBytes = function() {
            return this.Rencoded().concat(this.Sencoded())
        }, i.prototype.toHex = function() {
            return t.encode(this.toBytes(), "hex").toUpperCase()
        }, module.exports = i;
    }, {
        "bn.js": "VOEF",
        "../utils": "THL6"
    }],
    "lyfI": [function(require, module, exports) {
        "use strict";
        var t = require("hash.js"),
            e = require("../curves"),
            n = require("../utils"),
            r = n.assert,
            i = n.parseBytes,
            o = require("./key"),
            s = require("./signature");

        function u(n) {
            if (r("ed25519" === n, "only tested with ed25519 so far"), !(this instanceof u)) return new u(n);
            n = e[n].curve;
            this.curve = n, this.g = n.g, this.g.precompute(n.n.bitLength() + 1), this.pointClass = n.point().constructor, this.encodingLength = Math.ceil(n.n.bitLength() / 8), this.hash = t.sha512
        }
        module.exports = u, u.prototype.sign = function(t, e) {
            t = i(t);
            var n = this.keyFromSecret(e),
                r = this.hashInt(n.messagePrefix(), t),
                o = this.g.mul(r),
                s = this.encodePoint(o),
                u = this.hashInt(s, n.pubBytes(), t).mul(n.priv()),
                h = r.add(u).umod(this.curve.n);
            return this.makeSignature({
                R: o,
                S: h,
                Rencoded: s
            })
        }, u.prototype.verify = function(t, e, n) {
            t = i(t), e = this.makeSignature(e);
            var r = this.keyFromPublic(n),
                o = this.hashInt(e.Rencoded(), r.pubBytes(), t),
                s = this.g.mul(e.S());
            return e.R().add(r.pub().mul(o)).eq(s)
        }, u.prototype.hashInt = function() {
            for (var t = this.hash(), e = 0; e < arguments.length; e++) t.update(arguments[e]);
            return n.intFromLE(t.digest()).umod(this.curve.n)
        }, u.prototype.keyFromPublic = function(t) {
            return o.fromPublic(this, t)
        }, u.prototype.keyFromSecret = function(t) {
            return o.fromSecret(this, t)
        }, u.prototype.makeSignature = function(t) {
            return t instanceof s ? t : new s(this, t)
        }, u.prototype.encodePoint = function(t) {
            var e = t.getY().toArray("le", this.encodingLength);
            return e[this.encodingLength - 1] |= t.getX().isOdd() ? 128 : 0, e
        }, u.prototype.decodePoint = function(t) {
            var e = (t = n.parseBytes(t)).length - 1,
                r = t.slice(0, e).concat(-129 & t[e]),
                i = 0 != (128 & t[e]),
                o = n.intFromLE(r);
            return this.curve.pointFromY(o, i)
        }, u.prototype.encodeInt = function(t) {
            return t.toArray("le", this.encodingLength)
        }, u.prototype.decodeInt = function(t) {
            return n.intFromLE(t)
        }, u.prototype.isPoint = function(t) {
            return t instanceof this.pointClass
        };
    }, {
        "hash.js": "HObn",
        "../curves": "Jq2I",
        "../utils": "THL6",
        "./key": "w0jg",
        "./signature": "AjyZ"
    }],
    "nTwE": [function(require, module, exports) {
        "use strict";
        var e = exports;
        e.version = require("../package.json").version, e.utils = require("./elliptic/utils"), e.rand = require("brorand"), e.curve = require("./elliptic/curve"), e.curves = require("./elliptic/curves"), e.ec = require("./elliptic/ec"), e.eddsa = require("./elliptic/eddsa");
    }, {
        "../package.json": "IO6f",
        "./elliptic/utils": "THL6",
        "brorand": "gjcq",
        "./elliptic/curve": "ibwU",
        "./elliptic/curves": "Jq2I",
        "./elliptic/ec": "Uofk",
        "./elliptic/eddsa": "lyfI"
    }],
    "TPje": [function(require, module, exports) {
        "use strict";
        var r = function(r, t) {
            return function(n, u) {
                var e = 2 * u,
                    o = 2 * t;
                n[e] = r[o], n[e + 1] = r[o + 1]
            }
        };
        module.exports = r;
    }, {}],
    "f91U": [function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.default = void 0;
        var e = r(require("../copy"));

        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        var t = function(r) {
                for (var t = r.A, o = r.C, u = 0; u < 25; u += 5) {
                    for (var a = 0; a < 5; a++)(0, e.default)(t, u + a)(o, a);
                    for (var f = 0; f < 5; f++) {
                        var d = 2 * (u + f),
                            v = (f + 1) % 5 * 2,
                            l = (f + 2) % 5 * 2;
                        t[d] ^= ~o[v] & o[l], t[d + 1] ^= ~o[v + 1] & o[l + 1]
                    }
                }
            },
            o = t;
        exports.default = o;
    }, {
        "../copy": "TPje"
    }],
    "WWwJ": [function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.default = void 0;
        var e = new Uint32Array([0, 1, 0, 32898, 2147483648, 32906, 2147483648, 2147516416, 0, 32907, 0, 2147483649, 2147483648, 2147516545, 2147483648, 32777, 0, 138, 0, 136, 0, 2147516425, 0, 2147483658, 0, 2147516555, 2147483648, 139, 2147483648, 32905, 2147483648, 32771, 2147483648, 32770, 2147483648, 128, 0, 32778, 2147483648, 2147483658, 2147483648, 2147516545, 2147483648, 32896, 0, 2147483649, 2147483648, 2147516424]),
            t = e;
        exports.default = t;
    }, {}],
    "Js9P": [function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.default = void 0;
        var e = t(require("./round-constants"));

        function t(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        var r = function(t) {
                var r = t.A,
                    u = 2 * t.roundIndex;
                r[0] ^= e.default[u], r[1] ^= e.default[u + 1]
            },
            u = r;
        exports.default = u;
    }, {
        "./round-constants": "WWwJ"
    }],
    "XBk0": [function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.default = void 0;
        var e = [10, 7, 11, 17, 18, 3, 5, 16, 8, 21, 24, 4, 15, 23, 19, 13, 12, 2, 20, 14, 22, 9, 6, 1],
            t = e;
        exports.default = t;
    }, {}],
    "aEk5": [function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.default = void 0;
        var e = [1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 2, 14, 27, 41, 56, 8, 25, 43, 62, 18, 39, 61, 20, 44],
            t = e;
        exports.default = t;
    }, {}],
    "csrG": [function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.default = void 0;
        var e = u(require("./pi-shuffles")),
            r = u(require("./rho-offsets")),
            t = u(require("../copy"));

        function u(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        var f = function(u) {
                var f = u.A,
                    a = u.C,
                    d = u.W;
                (0, t.default)(f, 1)(d, 0);
                for (var l = 0, o = 0, s = 0, i = 32, v = 0; v < 24; v++) {
                    var n = e.default[v],
                        p = r.default[v];
                    (0, t.default)(f, n)(a, 0), l = d[0], o = d[1], i = 32 - p, d[s = p < 32 ? 0 : 1] = l << p | o >>> i, d[(s + 1) % 2] = o << p | l >>> i, (0, t.default)(d, 0)(f, n), (0, t.default)(a, 0)(d, 0)
                }
            },
            a = f;
        exports.default = a;
    }, {
        "./pi-shuffles": "XBk0",
        "./rho-offsets": "aEk5",
        "../copy": "TPje"
    }],
    "Fb3k": [function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.default = void 0;
        var e = r(require("../copy"));

        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        var t = function(r) {
                for (var t = r.A, o = r.C, u = r.D, a = r.W, f = 0, d = 0, v = 0; v < 5; v++) {
                    var l = 2 * v,
                        s = 2 * (v + 5),
                        i = 2 * (v + 10),
                        n = 2 * (v + 15),
                        c = 2 * (v + 20);
                    o[l] = t[l] ^ t[s] ^ t[i] ^ t[n] ^ t[c], o[l + 1] = t[l + 1] ^ t[s + 1] ^ t[i + 1] ^ t[n + 1] ^ t[c + 1]
                }
                for (var p = 0; p < 5; p++) {
                    (0, e.default)(o, (p + 1) % 5)(a, 0), f = a[0], d = a[1], a[0] = f << 1 | d >>> 31, a[1] = d << 1 | f >>> 31, u[2 * p] = o[(p + 4) % 5 * 2] ^ a[0], u[2 * p + 1] = o[(p + 4) % 5 * 2 + 1] ^ a[1];
                    for (var _ = 0; _ < 25; _ += 5) t[2 * (_ + p)] ^= u[2 * p], t[2 * (_ + p) + 1] ^= u[2 * p + 1]
                }
            },
            o = t;
        exports.default = o;
    }, {
        "../copy": "TPje"
    }],
    "flZT": [function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.default = void 0;
        var e = i(require("./chi")),
            r = i(require("./iota")),
            t = i(require("./rho-pi")),
            u = i(require("./theta"));

        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        var a = function() {
                var i = new Uint32Array(10),
                    a = new Uint32Array(10),
                    n = new Uint32Array(2);
                return function(l) {
                    for (var f = 0; f < 24; f++)(0, u.default)({
                        A: l,
                        C: i,
                        D: a,
                        W: n
                    }), (0, t.default)({
                        A: l,
                        C: i,
                        W: n
                    }), (0, e.default)({
                        A: l,
                        C: i
                    }), (0, r.default)({
                        A: l,
                        roundIndex: f
                    });
                    i.fill(0), a.fill(0), n.fill(0)
                }
            },
            n = a;
        exports.default = n;
    }, {
        "./chi": "f91U",
        "./iota": "Js9P",
        "./rho-pi": "csrG",
        "./theta": "Fb3k"
    }],
    "dI6l": [function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.default = void 0;
        var e = require("buffer"),
            r = t(require("./permute"));

        function t(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        var u = function(e, r) {
                for (var t = 0; t < e.length; t += 8) {
                    var u = t / 4;
                    r[u] ^= e[t + 7] << 24 | e[t + 6] << 16 | e[t + 5] << 8 | e[t + 4], r[u + 1] ^= e[t + 3] << 24 | e[t + 2] << 16 | e[t + 1] << 8 | e[t]
                }
                return r
            },
            f = function(e, r) {
                for (var t = 0; t < r.length; t += 8) {
                    var u = t / 4;
                    r[t] = e[u + 1], r[t + 1] = e[u + 1] >>> 8, r[t + 2] = e[u + 1] >>> 16, r[t + 3] = e[u + 1] >>> 24, r[t + 4] = e[u], r[t + 5] = e[u] >>> 8, r[t + 6] = e[u] >>> 16, r[t + 7] = e[u] >>> 24
                }
                return r
            },
            n = function(t) {
                var n = this,
                    a = t.capacity,
                    i = t.padding,
                    l = (0, r.default)(),
                    o = a / 8,
                    s = 200 - a / 4,
                    d = 0,
                    c = new Uint32Array(50),
                    v = e.Buffer.allocUnsafe(s);
                return this.absorb = function(e) {
                    for (var r = 0; r < e.length; r++) v[d] = e[r], (d += 1) >= s && (u(v, c), l(c), d = 0);
                    return n
                }, this.squeeze = function() {
                    var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                        t = {
                            buffer: r.buffer || e.Buffer.allocUnsafe(o),
                            padding: r.padding || i,
                            queue: e.Buffer.allocUnsafe(v.length),
                            state: new Uint32Array(c.length)
                        };
                    v.copy(t.queue);
                    for (var n = 0; n < c.length; n++) t.state[n] = c[n];
                    t.queue.fill(0, d), t.queue[d] |= t.padding, t.queue[s - 1] |= 128, u(t.queue, t.state);
                    for (var a = 0; a < t.buffer.length; a += s) l(t.state), f(t.state, t.buffer.slice(a, a + s));
                    return t.buffer
                }, this.reset = function() {
                    return v.fill(0), c.fill(0), d = 0, n
                }, this
            },
            a = n;
        exports.default = a;
    }, {
        "buffer": "ARb5",
        "./permute": "flZT"
    }],
    "g3tS": [function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.default = exports.SHAKE = exports.SHA3Hash = exports.SHA3 = exports.Keccak = void 0;
        var e = require("buffer"),
            r = t(require("./sponge"));

        function t(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        var o = function(t) {
                var o = t.allowedSizes,
                    i = t.padding;
                return function t() {
                    var n = this,
                        a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 512;
                    if (!this || this.constructor !== t) return new t(a);
                    if (o && !o.includes(a)) throw new Error("Unsupported hash length");
                    var s = new r.default({
                        capacity: a
                    });
                    return this.update = function(r) {
                        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "utf8";
                        if (e.Buffer.isBuffer(r)) return s.absorb(r), n;
                        if ("string" == typeof r) return n.update(e.Buffer.from(r, t));
                        throw new TypeError("Not a string or buffer")
                    }, this.digest = function() {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "binary",
                            r = "string" == typeof e ? {
                                format: e
                            } : e,
                            t = s.squeeze({
                                buffer: r.buffer,
                                padding: r.padding || i
                            });
                        return r.format && "binary" !== r.format ? t.toString(r.format) : t
                    }, this.reset = function() {
                        return s.reset(), n
                    }, this
                }
            },
            i = o({
                allowedSizes: [224, 256, 384, 512],
                padding: 1
            });
        exports.Keccak = i;
        var n = o({
            allowedSizes: [224, 256, 384, 512],
            padding: 6
        });
        exports.SHA3 = n;
        var a = o({
            allowedSizes: [128, 256],
            padding: 31
        });
        exports.SHAKE = a;
        var s = i;
        exports.SHA3Hash = s, n.SHA3Hash = s;
        var u = n;
        exports.default = u;
    }, {
        "buffer": "ARb5",
        "./sponge": "dI6l"
    }],
    "teAA": [function(require, module, exports) {
        var Buffer = require("buffer").Buffer;
        var e = require("buffer").Buffer;
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.hexToPrivateKey = exports.signHash = exports.signTransactionPayload = void 0;
        var r = require("elliptic"),
            t = require("sha3"),
            a = require("@onflow/bytes"),
            o = 64,
            i = new r.ec("p256"),
            n = function(e, r) {
                var o = new t.SHA3(256);
                o.update(r);
                var i = (0, a.bytes)(Uint8Array.from(o.digest()), 32);
                return s(u(e), i)
            };
        exports.signTransactionPayload = n;
        var s = function(r, t) {
            var i = r.sign((0, a.bytesToBuffer)(t)),
                n = o / 2,
                s = i.r.toArrayLike(e, "be", n),
                u = i.s.toArrayLike(e, "be", n);
            return e.concat([s, u])
        };
        exports.signHash = s;
        var u = function(r) {
            var t = e.from(r, "hex");
            return i.keyFromPrivate(t)
        };
        exports.hexToPrivateKey = u;
    }, {
        "elliptic": "nTwE",
        "sha3": "g3tS",
        "@onflow/bytes": "szrx",
        "buffer": "ARb5"
    }],
    "bpyt": [function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.signingFunction = void 0;
        var e = require("@onflow/bytes"),
            r = require("./ECDSA256Signer"),
            n = function(n) {
                return function(i) {
                    var o = i.message,
                        t = i.addr,
                        s = i.keyId,
                        a = i.roles;
                    a.proposer, a.authorizer, a.payer, i.interaction;
                    return {
                        addr: t,
                        keyId: s,
                        signature: (0, e.bufferToHexString)((0, r.signTransactionPayload)(n, (0, e.hashToBuffer)(o)))
                    }
                }
            };
        exports.signingFunction = n;
    }, {
        "@onflow/bytes": "szrx",
        "./ECDSA256Signer": "teAA"
    }]
}, {}, ["bpyt"], null)
//# sourceMappingURL=/signing-function.js.map

const x = (() => {
	const exports = {};
	const module = {exports};
	return parcelRequire.call(globalThis, "bpyt", module, exports);
})();
export default x;