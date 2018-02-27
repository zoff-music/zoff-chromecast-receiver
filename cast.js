// Copyright Google Inc. All Rights Reserved.
(function() {
    'use strict';
    var g, aa = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
            a != Array.prototype && a != Object.prototype && (a[b] = c.value)
        },
        ba = "undefined" != typeof window && window === this ? this : "undefined" != typeof global && null != global ? global : this;

    function ca() {
        ca = function() {};
        ba.Symbol || (ba.Symbol = da)
    }
    var da = function() {
        var a = 0;
        return function(b) {
            return "jscomp_symbol_" + (b || "") + a++
        }
    }();

    function ea() {
        ca();
        var a = ba.Symbol.iterator;
        a || (a = ba.Symbol.iterator = ba.Symbol("iterator"));
        "function" != typeof Array.prototype[a] && aa(Array.prototype, a, {
            configurable: !0,
            writable: !0,
            value: function() {
                return fa(this)
            }
        });
        ea = function() {}
    }

    function fa(a) {
        var b = 0;
        return ha(function() {
            return b < a.length ? {
                done: !1,
                value: a[b++]
            } : {
                done: !0
            }
        })
    }

    function ha(a) {
        ea();
        a = {
            next: a
        };
        a[ba.Symbol.iterator] = function() {
            return this
        };
        return a
    }

    function k(a) {
        ea();
        var b = a[Symbol.iterator];
        return b ? b.call(a) : fa(a)
    }
    var ia = "function" == typeof Object.create ? Object.create : function(a) {
            function b() {}
            b.prototype = a;
            return new b
        },
        ja;
    if ("function" == typeof Object.setPrototypeOf) ja = Object.setPrototypeOf;
    else {
        var ka;
        a: {
            var la = {
                    we: !0
                },
                ma = {};
            try {
                ma.__proto__ = la;
                ka = ma.we;
                break a
            } catch (a) {}
            ka = !1
        }
        ja = ka ? function(a, b) {
            a.__proto__ = b;
            if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
            return a
        } : null
    }
    var na = ja;

    function m(a, b) {
        a.prototype = ia(b.prototype);
        a.prototype.constructor = a;
        if (na) na(a, b);
        else
            for (var c in b)
                if ("prototype" != c)
                    if (Object.defineProperties) {
                        var d = Object.getOwnPropertyDescriptor(b, c);
                        d && Object.defineProperty(a, c, d)
                    } else a[c] = b[c];
        a.Xb = b.prototype
    }

    function pa(a) {
        if (!(a instanceof Array)) {
            a = k(a);
            for (var b, c = []; !(b = a.next()).done;) c.push(b.value);
            a = c
        }
        return a
    }

    function qa(a, b, c) {
        if (null == a) throw new TypeError("The 'this' value for String.prototype." + c + " must not be null or undefined");
        if (b instanceof RegExp) throw new TypeError("First argument to String.prototype." + c + " must not be a regular expression");
        return a + ""
    }

    function ra(a, b) {
        if (b) {
            var c = ba;
            a = a.split(".");
            for (var d = 0; d < a.length - 1; d++) {
                var e = a[d];
                e in c || (c[e] = {});
                c = c[e]
            }
            a = a[a.length - 1];
            d = c[a];
            b = b(d);
            b != d && null != b && aa(c, a, {
                configurable: !0,
                writable: !0,
                value: b
            })
        }
    }

    function sa(a, b, c) {
        a instanceof String && (a = String(a));
        for (var d = a.length, e = 0; e < d; e++) {
            var f = a[e];
            if (b.call(c, f, e, a)) return {
                yd: e,
                Td: f
            }
        }
        return {
            yd: -1,
            Td: void 0
        }
    }
    ra("Array.prototype.findIndex", function(a) {
        return a ? a : function(a, c) {
            return sa(this, a, c).yd
        }
    });
    ra("Array.prototype.find", function(a) {
        return a ? a : function(a, c) {
            return sa(this, a, c).Td
        }
    });
    ra("String.prototype.startsWith", function(a) {
        return a ? a : function(a, c) {
            var b = qa(this, a, "startsWith");
            a += "";
            var e = b.length,
                f = a.length;
            c = Math.max(0, Math.min(c | 0, b.length));
            for (var h = 0; h < f && c < e;)
                if (b[c++] != a[h++]) return !1;
            return h >= f
        }
    });
    ra("Promise", function(a) {
        function b(a) {
            this.a = 0;
            this.c = void 0;
            this.b = [];
            var b = this.g();
            try {
                a(b.resolve, b.reject)
            } catch (v) {
                b.reject(v)
            }
        }

        function c() {
            this.a = null
        }

        function d(a) {
            return a instanceof b ? a : new b(function(b) {
                b(a)
            })
        }
        if (a) return a;
        c.prototype.b = function(a) {
            null == this.a && (this.a = [], this.g());
            this.a.push(a)
        };
        c.prototype.g = function() {
            var a = this;
            this.c(function() {
                a.j()
            })
        };
        var e = ba.setTimeout;
        c.prototype.c = function(a) {
            e(a, 0)
        };
        c.prototype.j = function() {
            for (; this.a && this.a.length;) {
                var a = this.a;
                this.a = [];
                for (var b = 0; b < a.length; ++b) {
                    var c = a[b];
                    delete a[b];
                    try {
                        c()
                    } catch (x) {
                        this.h(x)
                    }
                }
            }
            this.a = null
        };
        c.prototype.h = function(a) {
            this.c(function() {
                throw a;
            })
        };
        b.prototype.g = function() {
            function a(a) {
                return function(d) {
                    c || (c = !0, a.call(b, d))
                }
            }
            var b = this,
                c = !1;
            return {
                resolve: a(this.s),
                reject: a(this.h)
            }
        };
        b.prototype.s = function(a) {
            if (a === this) this.h(new TypeError("A Promise cannot resolve to itself"));
            else if (a instanceof b) this.u(a);
            else {
                a: switch (typeof a) {
                    case "object":
                        var c = null != a;
                        break a;
                    case "function":
                        c = !0;
                        break a;
                    default:
                        c = !1
                }
                c ? this.m(a) : this.j(a)
            }
        };
        b.prototype.m = function(a) {
            var b = void 0;
            try {
                b = a.then
            } catch (v) {
                this.h(v);
                return
            }
            "function" == typeof b ? this.v(b, a) : this.j(a)
        };
        b.prototype.h = function(a) {
            this.i(2, a)
        };
        b.prototype.j = function(a) {
            this.i(1, a)
        };
        b.prototype.i = function(a, b) {
            if (0 != this.a) throw Error("Cannot settle(" + a + ", " + b | "): Promise already settled in state" + this.a);
            this.a = a;
            this.c = b;
            this.l()
        };
        b.prototype.l = function() {
            if (null != this.b) {
                for (var a = this.b, b = 0; b < a.length; ++b) a[b].call(), a[b] = null;
                this.b = null
            }
        };
        var f = new c;
        b.prototype.u = function(a) {
            var b = this.g();
            a.ib(b.resolve, b.reject)
        };
        b.prototype.v = function(a, b) {
            var c = this.g();
            try {
                a.call(b, c.resolve, c.reject)
            } catch (x) {
                c.reject(x)
            }
        };
        b.prototype.then = function(a, c) {
            function d(a, b) {
                return "function" == typeof a ? function(b) {
                    try {
                        e(a(b))
                    } catch (za) {
                        f(za)
                    }
                } : b
            }
            var e, f, h = new b(function(a, b) {
                e = a;
                f = b
            });
            this.ib(d(a, e), d(c, f));
            return h
        };
        b.prototype.catch = function(a) {
            return this.then(void 0, a)
        };
        b.prototype.ib = function(a, b) {
            function c() {
                switch (d.a) {
                    case 1:
                        a(d.c);
                        break;
                    case 2:
                        b(d.c);
                        break;
                    default:
                        throw Error("Unexpected state: " + d.a);
                }
            }
            var d = this;
            null == this.b ? f.b(c) : this.b.push(function() {
                f.b(c)
            })
        };
        b.resolve = d;
        b.reject = function(a) {
            return new b(function(b, c) {
                c(a)
            })
        };
        b.race = function(a) {
            return new b(function(b, c) {
                for (var e = k(a), f = e.next(); !f.done; f = e.next()) d(f.value).ib(b, c)
            })
        };
        b.all = function(a) {
            var c = k(a),
                e = c.next();
            return e.done ? d([]) : new b(function(a, b) {
                function f(b) {
                    return function(c) {
                        h[b] = c;
                        l--;
                        0 == l && a(h)
                    }
                }
                var h = [],
                    l = 0;
                do h.push(void 0), l++, d(e.value).ib(f(h.length -
                    1), b), e = c.next(); while (!e.done)
            })
        };
        return b
    });
    ra("Object.is", function(a) {
        return a ? a : function(a, c) {
            return a === c ? 0 !== a || 1 / a === 1 / c : a !== a && c !== c
        }
    });
    ra("Array.prototype.includes", function(a) {
        return a ? a : function(a, c) {
            var b = this;
            b instanceof String && (b = String(b));
            var e = b.length;
            for (c = c || 0; c < e; c++)
                if (b[c] == a || Object.is(b[c], a)) return !0;
            return !1
        }
    });
    ra("String.prototype.includes", function(a) {
        return a ? a : function(a, c) {
            return -1 !== qa(this, a, "includes").indexOf(a, c || 0)
        }
    });
    ra("Number.isFinite", function(a) {
        return a ? a : function(a) {
            return "number" !== typeof a ? !1 : !isNaN(a) && Infinity !== a && -Infinity !== a
        }
    });
    ra("Number.isInteger", function(a) {
        return a ? a : function(a) {
            return Number.isFinite(a) ? a === Math.floor(a) : !1
        }
    });

    function ta(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    }
    ra("WeakMap", function(a) {
        function b(a) {
            this.a = (f += Math.random() + 1).toString();
            if (a) {
                ca();
                ea();
                a = k(a);
                for (var b; !(b = a.next()).done;) b = b.value, this.set(b[0], b[1])
            }
        }

        function c(a) {
            ta(a, e) || aa(a, e, {
                value: {}
            })
        }

        function d(a) {
            var b = Object[a];
            b && (Object[a] = function(a) {
                c(a);
                return b(a)
            })
        }
        if (function() {
                if (!a || !Object.seal) return !1;
                try {
                    var b = Object.seal({}),
                        c = Object.seal({}),
                        d = new a([
                            [b, 2],
                            [c, 3]
                        ]);
                    if (2 != d.get(b) || 3 != d.get(c)) return !1;
                    d.delete(b);
                    d.set(c, 4);
                    return !d.has(b) && 4 == d.get(c)
                } catch (x) {
                    return !1
                }
            }()) return a;
        var e = "$jscomp_hidden_" + Math.random().toString().substring(2);
        d("freeze");
        d("preventExtensions");
        d("seal");
        var f = 0;
        b.prototype.set = function(a, b) {
            c(a);
            if (!ta(a, e)) throw Error("WeakMap key fail: " + a);
            a[e][this.a] = b;
            return this
        };
        b.prototype.get = function(a) {
            return ta(a, e) ? a[e][this.a] : void 0
        };
        b.prototype.has = function(a) {
            return ta(a, e) && ta(a[e], this.a)
        };
        b.prototype.delete = function(a) {
            return ta(a, e) && ta(a[e], this.a) ? delete a[e][this.a] : !1
        };
        return b
    });
    ra("Map", function(a) {
        function b() {
            var a = {};
            return a.ka = a.next = a.head = a
        }

        function c(a, b) {
            var c = a.a;
            return ha(function() {
                if (c) {
                    for (; c.head != a.a;) c = c.ka;
                    for (; c.next != c.head;) return c = c.next, {
                        done: !1,
                        value: b(c)
                    };
                    c = null
                }
                return {
                    done: !0,
                    value: void 0
                }
            })
        }

        function d(a, b) {
            var c = b && typeof b;
            "object" == c || "function" == c ? f.has(b) ? c = f.get(b) : (c = "" + ++h, f.set(b, c)) : c = "p_" + b;
            var d = a.b[c];
            if (d && ta(a.b, c))
                for (a = 0; a < d.length; a++) {
                    var e = d[a];
                    if (b !== b && e.key !== e.key || b === e.key) return {
                        id: c,
                        list: d,
                        index: a,
                        T: e
                    }
                }
            return {
                id: c,
                list: d,
                index: -1,
                T: void 0
            }
        }

        function e(a) {
            this.b = {};
            this.a = b();
            this.size = 0;
            if (a) {
                a = k(a);
                for (var c; !(c = a.next()).done;) c = c.value, this.set(c[0], c[1])
            }
        }
        if (function() {
                if (!a || !a.prototype.entries || "function" != typeof Object.seal) return !1;
                try {
                    var b = Object.seal({
                            x: 4
                        }),
                        c = new a(k([
                            [b, "s"]
                        ]));
                    if ("s" != c.get(b) || 1 != c.size || c.get({
                            x: 4
                        }) || c.set({
                            x: 4
                        }, "t") != c || 2 != c.size) return !1;
                    var d = c.entries(),
                        e = d.next();
                    if (e.done || e.value[0] != b || "s" != e.value[1]) return !1;
                    e = d.next();
                    return e.done || 4 != e.value[0].x || "t" != e.value[1] ||
                        !d.next().done ? !1 : !0
                } catch (W) {
                    return !1
                }
            }()) return a;
        ca();
        ea();
        var f = new WeakMap;
        e.prototype.set = function(a, b) {
            var c = d(this, a);
            c.list || (c.list = this.b[c.id] = []);
            c.T ? c.T.value = b : (c.T = {
                next: this.a,
                ka: this.a.ka,
                head: this.a,
                key: a,
                value: b
            }, c.list.push(c.T), this.a.ka.next = c.T, this.a.ka = c.T, this.size++);
            return this
        };
        e.prototype.delete = function(a) {
            a = d(this, a);
            return a.T && a.list ? (a.list.splice(a.index, 1), a.list.length || delete this.b[a.id], a.T.ka.next = a.T.next, a.T.next.ka = a.T.ka, a.T.head = null, this.size--, !0) :
                !1
        };
        e.prototype.clear = function() {
            this.b = {};
            this.a = this.a.ka = b();
            this.size = 0
        };
        e.prototype.has = function(a) {
            return !!d(this, a).T
        };
        e.prototype.get = function(a) {
            return (a = d(this, a).T) && a.value
        };
        e.prototype.entries = function() {
            return c(this, function(a) {
                return [a.key, a.value]
            })
        };
        e.prototype.keys = function() {
            return c(this, function(a) {
                return a.key
            })
        };
        e.prototype.values = function() {
            return c(this, function(a) {
                return a.value
            })
        };
        e.prototype.forEach = function(a, b) {
            for (var c = this.entries(), d; !(d = c.next()).done;) d = d.value,
                a.call(b, d[1], d[0], this)
        };
        e.prototype[Symbol.iterator] = e.prototype.entries;
        var h = 0;
        return e
    });
    ra("Set", function(a) {
        function b(a) {
            this.a = new Map;
            if (a) {
                a = k(a);
                for (var b; !(b = a.next()).done;) this.add(b.value)
            }
            this.size = this.a.size
        }
        if (function() {
                if (!a || !a.prototype.entries || "function" != typeof Object.seal) return !1;
                try {
                    var b = Object.seal({
                            x: 4
                        }),
                        d = new a(k([b]));
                    if (!d.has(b) || 1 != d.size || d.add(b) != d || 1 != d.size || d.add({
                            x: 4
                        }) != d || 2 != d.size) return !1;
                    var e = d.entries(),
                        f = e.next();
                    if (f.done || f.value[0] != b || f.value[1] != b) return !1;
                    f = e.next();
                    return f.done || f.value[0] == b || 4 != f.value[0].x || f.value[1] != f.value[0] ?
                        !1 : e.next().done
                } catch (h) {
                    return !1
                }
            }()) return a;
        ca();
        ea();
        b.prototype.add = function(a) {
            this.a.set(a, a);
            this.size = this.a.size;
            return this
        };
        b.prototype.delete = function(a) {
            a = this.a.delete(a);
            this.size = this.a.size;
            return a
        };
        b.prototype.clear = function() {
            this.a.clear();
            this.size = 0
        };
        b.prototype.has = function(a) {
            return this.a.has(a)
        };
        b.prototype.entries = function() {
            return this.a.entries()
        };
        b.prototype.values = function() {
            return this.a.values()
        };
        b.prototype.keys = b.prototype.values;
        b.prototype[Symbol.iterator] =
            b.prototype.values;
        b.prototype.forEach = function(a, b) {
            var c = this;
            this.a.forEach(function(d) {
                return a.call(b, d, d, c)
            })
        };
        return b
    });
    ra("Object.assign", function(a) {
        return a ? a : function(a, c) {
            for (var b = 1; b < arguments.length; b++) {
                var e = arguments[b];
                if (e)
                    for (var f in e) ta(e, f) && (a[f] = e[f])
            }
            return a
        }
    });
    ra("Array.from", function(a) {
        return a ? a : function(a, c, d) {
            ea();
            c = null != c ? c : function(a) {
                return a
            };
            var b = [],
                f = a[Symbol.iterator];
            if ("function" == typeof f)
                for (a = f.call(a); !(f = a.next()).done;) b.push(c.call(d, f.value));
            else {
                f = a.length;
                for (var h = 0; h < f; h++) b.push(c.call(d, a[h]))
            }
            return b
        }
    });
    var n = this;

    function p(a) {
        return void 0 !== a
    }

    function ua(a) {
        return "string" == typeof a
    }

    function q(a) {
        return "number" == typeof a
    }

    function va(a) {
        a = a.split(".");
        for (var b = n, c = 0; c < a.length; c++)
            if (b = b[a[c]], null == b) return null;
        return b
    }

    function r() {}

    function wa(a) {
        a.zb = void 0;
        a.ga = function() {
            return a.zb ? a.zb : a.zb = new a
        }
    }

    function xa(a) {
        var b = typeof a;
        if ("object" == b)
            if (a) {
                if (a instanceof Array) return "array";
                if (a instanceof Object) return b;
                var c = Object.prototype.toString.call(a);
                if ("[object Window]" == c) return "object";
                if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) return "array";
                if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) return "function"
            } else return "null";
        else if ("function" == b && "undefined" == typeof a.call) return "object";
        return b
    }

    function ya(a) {
        return "array" == xa(a)
    }

    function t(a) {
        return "function" == xa(a)
    }

    function Aa(a) {
        var b = typeof a;
        return "object" == b && null != a || "function" == b
    }

    function Ba(a, b, c) {
        return a.call.apply(a.bind, arguments)
    }

    function Ca(a, b, c) {
        if (!a) throw Error();
        if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function() {
                var c = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(c, d);
                return a.apply(b, c)
            }
        }
        return function() {
            return a.apply(b, arguments)
        }
    }

    function Da(a, b, c) {
        Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? Da = Ba : Da = Ca;
        return Da.apply(null, arguments)
    }

    function Ea(a, b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return function() {
            var b = c.slice();
            b.push.apply(b, arguments);
            return a.apply(this, b)
        }
    }
    var Fa = Date.now || function() {
        return +new Date
    };

    function u(a, b) {
        a = a.split(".");
        var c = n;
        a[0] in c || !c.execScript || c.execScript("var " + a[0]);
        for (var d; a.length && (d = a.shift());) !a.length && p(b) ? c[d] = b : c[d] && c[d] !== Object.prototype[d] ? c = c[d] : c = c[d] = {}
    }

    function Ga(a, b) {
        function c() {}
        c.prototype = b.prototype;
        a.Xb = b.prototype;
        a.prototype = new c;
        a.prototype.constructor = a;
        a.Eh = function(a, c, f) {
            for (var d = Array(arguments.length - 2), e = 2; e < arguments.length; e++) d[e - 2] = arguments[e];
            return b.prototype[c].apply(a, d)
        }
    };
    n.cast = n.cast || {};
    var cast = n.cast;
    cast.Lc = !1;
    cast.platform = {};
    cast.platform.metrics = {};
    cast.platform.metrics.Na = function() {
        return !(!cast.__platform__ || !cast.__platform__.metrics)
    };
    cast.platform.metrics.logBoolToUma = function(a, b) {
        cast.platform.metrics.Na() && cast.__platform__.metrics.logBoolToUma(a, b)
    };
    cast.platform.metrics.logEventToUma = function(a) {
        cast.platform.metrics.Na() && cast.__platform__.metrics.logEventToUma(a)
    };
    cast.platform.metrics.logHistogramValueToUma = function(a, b, c, d, e) {
        cast.platform.metrics.Na() && cast.__platform__.metrics.logHistogramValueToUma(a, b, c, d, e)
    };
    cast.platform.metrics.logIntToUma = function(a, b) {
        cast.platform.metrics.Na() && cast.__platform__.metrics.logIntToUma(a, b)
    };
    cast.platform.metrics.setMplVersion = function(a) {
        cast.platform.metrics.Na() && cast.__platform__.metrics.setMplVersion(a)
    };

    function Ha(a) {
        if (Error.captureStackTrace) Error.captureStackTrace(this, Ha);
        else {
            var b = Error().stack;
            b && (this.stack = b)
        }
        a && (this.message = String(a))
    }
    Ga(Ha, Error);
    Ha.prototype.name = "CustomError";

    function Ia(a, b) {
        return 0 == Ja(b, a.substr(0, b.length))
    }

    function Ka(a, b) {
        for (var c = a.split("%s"), d = "", e = Array.prototype.slice.call(arguments, 1); e.length && 1 < c.length;) d += c.shift() + e.shift();
        return d + c.join("%s")
    }
    var La = String.prototype.trim ? function(a) {
        return a.trim()
    } : function(a) {
        return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
    };

    function Ja(a, b) {
        a = String(a).toLowerCase();
        b = String(b).toLowerCase();
        return a < b ? -1 : a == b ? 0 : 1
    }
    var Ma = String.prototype.repeat ? function(a, b) {
        return a.repeat(b)
    } : function(a, b) {
        return Array(b + 1).join(a)
    };

    function Na(a) {
        a = p(void 0) ? a.toFixed(void 0) : String(a);
        var b = a.indexOf("."); - 1 == b && (b = a.length);
        return Ma("0", Math.max(0, 2 - b)) + a
    }

    function Oa(a, b) {
        var c = 0;
        a = La(String(a)).split(".");
        b = La(String(b)).split(".");
        for (var d = Math.max(a.length, b.length), e = 0; 0 == c && e < d; e++) {
            var f = a[e] || "",
                h = b[e] || "";
            do {
                f = /(\d*)(\D*)(.*)/.exec(f) || ["", "", "", ""];
                h = /(\d*)(\D*)(.*)/.exec(h) || ["", "", "", ""];
                if (0 == f[0].length && 0 == h[0].length) break;
                c = Pa(0 == f[1].length ? 0 : parseInt(f[1], 10), 0 == h[1].length ? 0 : parseInt(h[1], 10)) || Pa(0 == f[2].length, 0 == h[2].length) || Pa(f[2], h[2]);
                f = f[3];
                h = h[3]
            } while (0 == c)
        }
        return c
    }

    function Pa(a, b) {
        return a < b ? -1 : a > b ? 1 : 0
    };

    function Qa(a, b) {
        b.unshift(a);
        Ha.call(this, Ka.apply(null, b));
        b.shift()
    }
    Ga(Qa, Ha);
    Qa.prototype.name = "AssertionError";

    function Sa(a, b) {
        throw new Qa("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1));
    };
    var Ta = Array.prototype.indexOf ? function(a, b, c) {
        return Array.prototype.indexOf.call(a, b, c)
    } : function(a, b, c) {
        c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
        if (ua(a)) return ua(b) && 1 == b.length ? a.indexOf(b, c) : -1;
        for (; c < a.length; c++)
            if (c in a && a[c] === b) return c;
        return -1
    };

    function Ua(a, b, c, d) {
        return Array.prototype.splice.apply(a, Va(arguments, 1))
    }

    function Va(a, b, c) {
        return 2 >= arguments.length ? Array.prototype.slice.call(a, b) : Array.prototype.slice.call(a, b, c)
    };

    function Wa(a, b, c) {
        this.g = c;
        this.c = a;
        this.h = b;
        this.b = 0;
        this.a = null
    }
    Wa.prototype.get = function() {
        if (0 < this.b) {
            this.b--;
            var a = this.a;
            this.a = a.next;
            a.next = null
        } else a = this.c();
        return a
    };

    function Xa(a, b) {
        a.h(b);
        a.b < a.g && (a.b++, b.next = a.a, a.a = b)
    };
    var Za;
    a: {
        var $a = n.navigator;
        if ($a) {
            var ab = $a.userAgent;
            if (ab) {
                Za = ab;
                break a
            }
        }
        Za = ""
    }

    function bb(a) {
        return -1 != Za.indexOf(a)
    };

    function cb(a, b) {
        for (var c in a) b.call(void 0, a[c], c, a)
    }

    function db(a) {
        var b = [],
            c = 0,
            d;
        for (d in a) b[c++] = d;
        return b
    }

    function eb(a, b) {
        return null !== a && b in a
    }

    function fb(a, b) {
        for (var c in a)
            if (a[c] == b) return !0;
        return !1
    }

    function gb(a) {
        var b = {},
            c;
        for (c in a) b[c] = a[c];
        return b
    }

    function hb(a) {
        var b = xa(a);
        if ("object" == b || "array" == b) {
            if (t(a.clone)) return a.clone();
            b = "array" == b ? [] : {};
            for (var c in a) b[c] = hb(a[c]);
            return b
        }
        return a
    }
    var ib = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");

    function jb(a, b) {
        for (var c, d, e = 1; e < arguments.length; e++) {
            d = arguments[e];
            for (c in d) a[c] = d[c];
            for (var f = 0; f < ib.length; f++) c = ib[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
        }
    };

    function kb(a) {
        n.setTimeout(function() {
            throw a;
        }, 0)
    }
    var lb;

    function mb() {
        var a = n.MessageChannel;
        "undefined" === typeof a && "undefined" !== typeof window && window.postMessage && window.addEventListener && !bb("Presto") && (a = function() {
            var a = document.createElement("IFRAME");
            a.style.display = "none";
            a.src = "";
            document.documentElement.appendChild(a);
            var b = a.contentWindow;
            a = b.document;
            a.open();
            a.write("");
            a.close();
            var c = "callImmediate" + Math.random(),
                d = "file:" == b.location.protocol ? "*" : b.location.protocol + "//" + b.location.host;
            a = Da(function(a) {
                if (("*" == d || a.origin == d) && a.data ==
                    c) this.port1.onmessage()
            }, this);
            b.addEventListener("message", a, !1);
            this.port1 = {};
            this.port2 = {
                postMessage: function() {
                    b.postMessage(c, d)
                }
            }
        });
        if ("undefined" !== typeof a && !bb("Trident") && !bb("MSIE")) {
            var b = new a,
                c = {},
                d = c;
            b.port1.onmessage = function() {
                if (p(c.next)) {
                    c = c.next;
                    var a = c.ed;
                    c.ed = null;
                    a()
                }
            };
            return function(a) {
                d.next = {
                    ed: a
                };
                d = d.next;
                b.port2.postMessage(0)
            }
        }
        return "undefined" !== typeof document && "onreadystatechange" in document.createElement("SCRIPT") ? function(a) {
            var b = document.createElement("SCRIPT");
            b.onreadystatechange = function() {
                b.onreadystatechange = null;
                b.parentNode.removeChild(b);
                b = null;
                a();
                a = null
            };
            document.documentElement.appendChild(b)
        } : function(a) {
            n.setTimeout(a, 0)
        }
    };

    function nb() {
        this.b = this.a = null
    }
    var pb = new Wa(function() {
        return new ob
    }, function(a) {
        a.reset()
    }, 100);
    nb.prototype.add = function(a, b) {
        var c = pb.get();
        c.set(a, b);
        this.b ? this.b.next = c : this.a = c;
        this.b = c
    };

    function qb() {
        var a = rb,
            b = null;
        a.a && (b = a.a, a.a = a.a.next, a.a || (a.b = null), b.next = null);
        return b
    }

    function ob() {
        this.next = this.b = this.a = null
    }
    ob.prototype.set = function(a, b) {
        this.a = a;
        this.b = b;
        this.next = null
    };
    ob.prototype.reset = function() {
        this.next = this.b = this.a = null
    };

    function sb(a, b) {
        tb || ub();
        vb || (tb(), vb = !0);
        rb.add(a, b)
    }
    var tb;

    function ub() {
        if (-1 != String(n.Promise).indexOf("[native code]")) {
            var a = n.Promise.resolve(void 0);
            tb = function() {
                a.then(wb)
            }
        } else tb = function() {
            var a = wb;
            !t(n.setImmediate) || n.Window && n.Window.prototype && !bb("Edge") && n.Window.prototype.setImmediate == n.setImmediate ? (lb || (lb = mb()), lb(a)) : n.setImmediate(a)
        }
    }
    var vb = !1,
        rb = new nb;

    function wb() {
        for (var a; a = qb();) {
            try {
                a.a.call(a.b)
            } catch (b) {
                kb(b)
            }
            Xa(pb, a)
        }
        vb = !1
    };

    function xb(a) {
        xb[" "](a);
        return a
    }
    xb[" "] = r;

    function yb(a, b) {
        var c = zb;
        return Object.prototype.hasOwnProperty.call(c, a) ? c[a] : c[a] = b(a)
    };
    var Ab = bb("Opera"),
        Bb = bb("Trident") || bb("MSIE"),
        Cb = bb("Edge"),
        Db = bb("Gecko") && !(-1 != Za.toLowerCase().indexOf("webkit") && !bb("Edge")) && !(bb("Trident") || bb("MSIE")) && !bb("Edge"),
        Eb = -1 != Za.toLowerCase().indexOf("webkit") && !bb("Edge");

    function Fb() {
        var a = n.document;
        return a ? a.documentMode : void 0
    }
    var Gb;
    a: {
        var Hb = "",
            Ib = function() {
                var a = Za;
                if (Db) return /rv:([^\);]+)(\)|;)/.exec(a);
                if (Cb) return /Edge\/([\d\.]+)/.exec(a);
                if (Bb) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
                if (Eb) return /WebKit\/(\S+)/.exec(a);
                if (Ab) return /(?:Version)[ \/]?(\S+)/.exec(a)
            }();Ib && (Hb = Ib ? Ib[1] : "");
        if (Bb) {
            var Jb = Fb();
            if (null != Jb && Jb > parseFloat(Hb)) {
                Gb = String(Jb);
                break a
            }
        }
        Gb = Hb
    }
    var Kb = Gb,
        zb = {};

    function Lb(a) {
        return yb(a, function() {
            return 0 <= Oa(Kb, a)
        })
    }
    var Mb;
    var Nb = n.document;
    Mb = Nb && Bb ? Fb() || ("CSS1Compat" == Nb.compatMode ? parseInt(Kb, 10) : 5) : void 0;
    var Ob = Object.freeze || function(a) {
        return a
    };

    function Pb(a, b, c, d, e) {
        this.reset(a, b, c, d, e)
    }
    Pb.prototype.a = null;
    var Qb = 0;
    Pb.prototype.reset = function(a, b, c, d, e) {
        "number" == typeof e || Qb++;
        this.c = d || Fa();
        this.g = a;
        this.h = b;
        this.b = c;
        delete this.a
    };

    function Rb(a) {
        this.h = a;
        this.a = this.c = this.xb = this.b = null
    }

    function Sb(a, b) {
        this.name = a;
        this.value = b
    }
    Sb.prototype.toString = function() {
        return this.name
    };
    var Tb = new Sb("SHOUT", 1200),
        Ub = new Sb("SEVERE", 1E3),
        Vb = new Sb("WARNING", 900),
        Wb = new Sb("INFO", 800),
        Xb = new Sb("CONFIG", 700),
        Yb = new Sb("FINE", 500),
        Zb = new Sb("FINER", 400),
        $b = [new Sb("OFF", Infinity), Tb, Ub, Vb, Wb, Xb, Yb, Zb, new Sb("FINEST", 300), new Sb("ALL", 0)],
        ac = null;

    function bc(a) {
        if (a.xb) return a.xb;
        if (a.b) return bc(a.b);
        Sa("Root logger has no level set.");
        return null
    }
    Rb.prototype.log = function(a, b, c) {
        if (a.value >= bc(this).value)
            for (t(b) && (b = b()), a = new Pb(a, String(b), this.h), c && (a.a = c), c = this; c;) {
                var d = c,
                    e = a;
                if (d.a)
                    for (var f = 0; b = d.a[f]; f++) b(e);
                c = c.b
            }
    };
    var cc = {},
        dc = null;

    function ec() {
        dc || (dc = new Rb(""), cc[""] = dc, dc.xb = Xb)
    }

    function w(a) {
        ec();
        var b;
        if (!(b = cc[a])) {
            b = new Rb(a);
            var c = a.lastIndexOf("."),
                d = a.substr(c + 1);
            c = w(a.substr(0, c));
            c.c || (c.c = {});
            c.c[d] = b;
            b.b = c;
            cc[a] = b
        }
        return b
    };

    function y() {
        this.g = this.g;
        this.j = this.j
    }
    y.prototype.g = !1;
    y.prototype.$ = function() {
        this.g || (this.g = !0, this.V())
    };

    function fc(a, b) {
        a.g ? p(void 0) ? b.call(void 0) : b() : (a.j || (a.j = []), a.j.push(p(void 0) ? Da(b, void 0) : b))
    }
    y.prototype.V = function() {
        if (this.j)
            for (; this.j.length;) this.j.shift()()
    };

    function gc(a) {
        a && "function" == typeof a.$ && a.$()
    };
    var hc;
    (hc = !Bb) || (hc = 9 <= Number(Mb));
    var ic = hc,
        jc = Bb && !Lb("9");
    !Eb || Lb("528");
    Db && Lb("1.9b") || Bb && Lb("8") || Ab && Lb("9.5") || Eb && Lb("528");
    Db && !Lb("8") || Bb && Lb("9");
    var kc = function() {
        if (!n.addEventListener || !Object.defineProperty) return !1;
        var a = !1,
            b = Object.defineProperty({}, "passive", {
                get: function() {
                    a = !0
                }
            });
        n.addEventListener("test", r, b);
        n.removeEventListener("test", r, b);
        return a
    }();

    function z(a, b) {
        this.type = a;
        this.a = this.target = b;
        this.Kd = !0
    }
    z.prototype.b = function() {
        this.Kd = !1
    };

    function lc(a, b) {
        z.call(this, a ? a.type : "");
        this.relatedTarget = this.a = this.target = null;
        this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0;
        this.key = "";
        this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
        this.state = null;
        this.pointerId = 0;
        this.pointerType = "";
        this.c = null;
        if (a) {
            var c = this.type = a.type,
                d = a.changedTouches ? a.changedTouches[0] : null;
            this.target = a.target || a.srcElement;
            this.a = b;
            if (b = a.relatedTarget) {
                if (Db) {
                    a: {
                        try {
                            xb(b.nodeName);
                            var e = !0;
                            break a
                        } catch (f) {}
                        e = !1
                    }
                    e || (b = null)
                }
            } else "mouseover" ==
                c ? b = a.fromElement : "mouseout" == c && (b = a.toElement);
            this.relatedTarget = b;
            null === d ? (this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX, this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY, this.screenX = a.screenX || 0, this.screenY = a.screenY || 0) : (this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX, this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY, this.screenX = d.screenX || 0, this.screenY = d.screenY || 0);
            this.button = a.button;
            this.key = a.key || "";
            this.ctrlKey = a.ctrlKey;
            this.altKey = a.altKey;
            this.shiftKey = a.shiftKey;
            this.metaKey =
                a.metaKey;
            this.pointerId = a.pointerId || 0;
            this.pointerType = ua(a.pointerType) ? a.pointerType : mc[a.pointerType] || "";
            this.state = a.state;
            this.c = a;
            a.defaultPrevented && this.b()
        }
    }
    Ga(lc, z);
    var mc = Ob({
        2: "touch",
        3: "pen",
        4: "mouse"
    });
    lc.prototype.b = function() {
        lc.Xb.b.call(this);
        var a = this.c;
        if (a.preventDefault) a.preventDefault();
        else if (a.returnValue = !1, jc) try {
            if (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode) a.keyCode = -1
        } catch (b) {}
    };
    var nc = "closure_listenable_" + (1E6 * Math.random() | 0),
        oc = 0;

    function pc(a, b, c, d, e) {
        this.listener = a;
        this.a = null;
        this.src = b;
        this.type = c;
        this.capture = !!d;
        this.yb = e;
        this.key = ++oc;
        this.Da = this.hb = !1
    }

    function qc(a) {
        a.Da = !0;
        a.listener = null;
        a.a = null;
        a.src = null;
        a.yb = null
    };

    function rc(a) {
        this.src = a;
        this.a = {};
        this.b = 0
    }
    rc.prototype.add = function(a, b, c, d, e) {
        var f = a.toString();
        a = this.a[f];
        a || (a = this.a[f] = [], this.b++);
        var h = sc(a, b, d, e); - 1 < h ? (b = a[h], c || (b.hb = !1)) : (b = new pc(b, this.src, f, !!d, e), b.hb = c, a.push(b));
        return b
    };

    function tc(a, b, c, d, e) {
        b = b.toString();
        if (b in a.a) {
            var f = a.a[b];
            c = sc(f, c, d, e); - 1 < c && (qc(f[c]), Array.prototype.splice.call(f, c, 1), 0 == f.length && (delete a.a[b], a.b--))
        }
    }

    function uc(a, b) {
        var c = b.type;
        if (c in a.a) {
            var d = a.a[c],
                e = Ta(d, b),
                f;
            (f = 0 <= e) && Array.prototype.splice.call(d, e, 1);
            f && (qc(b), 0 == a.a[c].length && (delete a.a[c], a.b--))
        }
    }

    function sc(a, b, c, d) {
        for (var e = 0; e < a.length; ++e) {
            var f = a[e];
            if (!f.Da && f.listener == b && f.capture == !!c && f.yb == d) return e
        }
        return -1
    };
    var vc = "closure_lm_" + (1E6 * Math.random() | 0),
        wc = {},
        xc = 0;

    function yc(a, b, c, d, e) {
        if (d && d.once) zc(a, b, c, d, e);
        else if (ya(b))
            for (var f = 0; f < b.length; f++) yc(a, b[f], c, d, e);
        else c = Ac(c), a && a[nc] ? a.aa.add(String(b), c, !1, Aa(d) ? !!d.capture : !!d, e) : Bc(a, b, c, !1, d, e)
    }

    function Bc(a, b, c, d, e, f) {
        if (!b) throw Error("Invalid event type");
        var h = Aa(e) ? !!e.capture : !!e,
            l = Cc(a);
        l || (a[vc] = l = new rc(a));
        c = l.add(b, c, d, h, f);
        if (!c.a) {
            d = Dc();
            c.a = d;
            d.src = a;
            d.listener = c;
            if (a.addEventListener) kc || (e = h), void 0 === e && (e = !1), a.addEventListener(b.toString(), d, e);
            else if (a.attachEvent) a.attachEvent(Ec(b.toString()), d);
            else if (a.addListener && a.removeListener) a.addListener(d);
            else throw Error("addEventListener and attachEvent are unavailable.");
            xc++
        }
    }

    function Dc() {
        var a = Fc,
            b = ic ? function(c) {
                return a.call(b.src, b.listener, c)
            } : function(c) {
                c = a.call(b.src, b.listener, c);
                if (!c) return c
            };
        return b
    }

    function zc(a, b, c, d, e) {
        if (ya(b))
            for (var f = 0; f < b.length; f++) zc(a, b[f], c, d, e);
        else c = Ac(c), a && a[nc] ? a.aa.add(String(b), c, !0, Aa(d) ? !!d.capture : !!d, e) : Bc(a, b, c, !0, d, e)
    }

    function Gc(a, b, c, d, e) {
        if (ya(b))
            for (var f = 0; f < b.length; f++) Gc(a, b[f], c, d, e);
        else(d = Aa(d) ? !!d.capture : !!d, c = Ac(c), a && a[nc]) ? tc(a.aa, String(b), c, d, e) : a && (a = Cc(a)) && (b = a.a[b.toString()], a = -1, b && (a = sc(b, c, d, e)), (c = -1 < a ? b[a] : null) && Hc(c))
    }

    function Hc(a) {
        if (!q(a) && a && !a.Da) {
            var b = a.src;
            if (b && b[nc]) uc(b.aa, a);
            else {
                var c = a.type,
                    d = a.a;
                b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent ? b.detachEvent(Ec(c), d) : b.addListener && b.removeListener && b.removeListener(d);
                xc--;
                (c = Cc(b)) ? (uc(c, a), 0 == c.b && (c.src = null, b[vc] = null)) : qc(a)
            }
        }
    }

    function Ec(a) {
        return a in wc ? wc[a] : wc[a] = "on" + a
    }

    function Ic(a, b, c, d) {
        var e = !0;
        if (a = Cc(a))
            if (b = a.a[b.toString()])
                for (b = b.concat(), a = 0; a < b.length; a++) {
                    var f = b[a];
                    f && f.capture == c && !f.Da && (f = Jc(f, d), e = e && !1 !== f)
                }
        return e
    }

    function Jc(a, b) {
        var c = a.listener,
            d = a.yb || a.src;
        a.hb && Hc(a);
        return c.call(d, b)
    }

    function Fc(a, b) {
        if (a.Da) return !0;
        if (!ic) {
            var c = b || va("window.event");
            b = new lc(c, this);
            var d = !0;
            if (!(0 > c.keyCode || void 0 != c.returnValue)) {
                a: {
                    var e = !1;
                    if (0 == c.keyCode) try {
                        c.keyCode = -1;
                        break a
                    } catch (h) {
                        e = !0
                    }
                    if (e || void 0 == c.returnValue) c.returnValue = !0
                }
                c = [];
                for (e = b.a; e; e = e.parentNode) c.push(e);a = a.type;
                for (e = c.length - 1; 0 <= e; e--) {
                    b.a = c[e];
                    var f = Ic(c[e], a, !0, b);
                    d = d && f
                }
                for (e = 0; e < c.length; e++) b.a = c[e],
                f = Ic(c[e], a, !1, b),
                d = d && f
            }
            return d
        }
        return Jc(a, new lc(b, this))
    }

    function Cc(a) {
        a = a[vc];
        return a instanceof rc ? a : null
    }
    var Kc = "__closure_events_fn_" + (1E9 * Math.random() >>> 0);

    function Ac(a) {
        if (t(a)) return a;
        a[Kc] || (a[Kc] = function(b) {
            return a.handleEvent(b)
        });
        return a[Kc]
    };

    function Lc() {
        y.call(this);
        this.aa = new rc(this);
        this.h = this;
        this.a = null
    }
    Ga(Lc, y);
    Lc.prototype[nc] = !0;
    g = Lc.prototype;
    g.Bc = function(a) {
        this.a = a
    };
    g.addEventListener = function(a, b, c, d) {
        yc(this, a, b, c, d)
    };
    g.removeEventListener = function(a, b, c, d) {
        Gc(this, a, b, c, d)
    };
    g.dispatchEvent = function(a) {
        var b, c = this.a;
        if (c)
            for (b = []; c; c = c.a) b.push(c);
        c = this.h;
        var d = a.type || a;
        if (ua(a)) a = new z(a, c);
        else if (a instanceof z) a.target = a.target || c;
        else {
            var e = a;
            a = new z(d, c);
            jb(a, e)
        }
        e = !0;
        if (b)
            for (var f = b.length - 1; 0 <= f; f--) {
                var h = a.a = b[f];
                e = Mc(h, d, !0, a) && e
            }
        h = a.a = c;
        e = Mc(h, d, !0, a) && e;
        e = Mc(h, d, !1, a) && e;
        if (b)
            for (f = 0; f < b.length; f++) h = a.a = b[f], e = Mc(h, d, !1, a) && e;
        return e
    };
    g.V = function() {
        Lc.Xb.V.call(this);
        if (this.aa) {
            var a = this.aa,
                b = 0,
                c;
            for (c in a.a) {
                for (var d = a.a[c], e = 0; e < d.length; e++) ++b, qc(d[e]);
                delete a.a[c];
                a.b--
            }
        }
        this.a = null
    };

    function Mc(a, b, c, d) {
        b = a.aa.a[String(b)];
        if (!b) return !0;
        b = b.concat();
        for (var e = !0, f = 0; f < b.length; ++f) {
            var h = b[f];
            if (h && !h.Da && h.capture == c) {
                var l = h.listener,
                    v = h.yb || h.src;
                h.hb && uc(a.aa, h);
                e = !1 !== l.call(v, d) && e
            }
        }
        return e && 0 != d.Kd
    };
    var Nc = "StopIteration" in n ? n.StopIteration : {
        message: "StopIteration",
        stack: ""
    };

    function Oc() {}
    Oc.prototype.next = function() {
        throw Nc;
    };
    Oc.prototype.ve = function() {
        return this
    };

    function Pc(a, b, c) {
        a && a.log(b, c, void 0)
    }

    function A(a, b) {
        a && a.log(Ub, b, void 0)
    }

    function B(a, b) {
        a && a.log(Vb, b, void 0)
    }

    function C(a, b) {
        a && a.log(Wb, b, void 0)
    }

    function Qc(a, b) {
        a && a.log(Yb, b, void 0)
    };

    function Rc(a, b) {
        this.b = {};
        this.a = [];
        this.g = this.c = 0;
        var c = arguments.length;
        if (1 < c) {
            if (c % 2) throw Error("Uneven number of arguments");
            for (var d = 0; d < c; d += 2) this.set(arguments[d], arguments[d + 1])
        } else if (a) {
            if (a instanceof Rc) c = a.qd(), d = a.sd();
            else {
                c = db(a);
                var e = [],
                    f = 0;
                for (d in a) e[f++] = a[d];
                d = e
            }
            for (e = 0; e < c.length; e++) this.set(c[e], d[e])
        }
    }
    g = Rc.prototype;
    g.sd = function() {
        Sc(this);
        for (var a = [], b = 0; b < this.a.length; b++) a.push(this.b[this.a[b]]);
        return a
    };
    g.qd = function() {
        Sc(this);
        return this.a.concat()
    };

    function Tc(a, b) {
        Uc(a.b, b) && (delete a.b[b], a.c--, a.g++, a.a.length > 2 * a.c && Sc(a))
    }

    function Sc(a) {
        if (a.c != a.a.length) {
            for (var b = 0, c = 0; b < a.a.length;) {
                var d = a.a[b];
                Uc(a.b, d) && (a.a[c++] = d);
                b++
            }
            a.a.length = c
        }
        if (a.c != a.a.length) {
            var e = {};
            for (c = b = 0; b < a.a.length;) d = a.a[b], Uc(e, d) || (a.a[c++] = d, e[d] = 1), b++;
            a.a.length = c
        }
    }
    g.get = function(a, b) {
        return Uc(this.b, a) ? this.b[a] : b
    };
    g.set = function(a, b) {
        Uc(this.b, a) || (this.c++, this.a.push(a), this.g++);
        this.b[a] = b
    };
    g.forEach = function(a, b) {
        for (var c = this.qd(), d = 0; d < c.length; d++) {
            var e = c[d],
                f = this.get(e);
            a.call(b, f, e, this)
        }
    };
    g.clone = function() {
        return new Rc(this)
    };
    g.ve = function(a) {
        Sc(this);
        var b = 0,
            c = this.g,
            d = this,
            e = new Oc;
        e.next = function() {
            if (c != d.g) throw Error("The map has changed since the iterator was created");
            if (b >= d.a.length) throw Nc;
            var e = d.a[b++];
            return a ? e : d.b[e]
        };
        return e
    };

    function Uc(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    };

    function Vc(a, b) {
        this.a = 0;
        this.i = void 0;
        this.g = this.b = this.c = null;
        this.h = this.j = !1;
        if (a != r) try {
            var c = this;
            a.call(b, function(a) {
                Wc(c, 2, a)
            }, function(a) {
                if (!(a instanceof Xc)) try {
                    if (a instanceof Error) throw a;
                    throw Error("Promise rejected.");
                } catch (e) {}
                Wc(c, 3, a)
            })
        } catch (d) {
            Wc(this, 3, d)
        }
    }

    function Yc() {
        this.next = this.c = this.b = this.g = this.a = null;
        this.h = !1
    }
    Yc.prototype.reset = function() {
        this.c = this.b = this.g = this.a = null;
        this.h = !1
    };
    var Zc = new Wa(function() {
        return new Yc
    }, function(a) {
        a.reset()
    }, 100);

    function $c(a, b, c) {
        var d = Zc.get();
        d.g = a;
        d.b = b;
        d.c = c;
        return d
    }

    function ad(a) {
        if (a instanceof Vc) return a;
        var b = new Vc(r);
        Wc(b, 2, a);
        return b
    }

    function bd(a) {
        return new Vc(function(b, c) {
            c(a)
        })
    }

    function cd(a, b, c) {
        dd(a, b, c, null) || sb(Ea(b, a))
    }

    function ed(a) {
        return new Vc(function(b, c) {
            var d = a.length,
                e = [];
            if (d)
                for (var f = function(a, c) {
                        d--;
                        e[a] = c;
                        0 == d && b(e)
                    }, h = function(a) {
                        c(a)
                    }, l = 0, v; l < a.length; l++) v = a[l], cd(v, Ea(f, l), h);
            else b(e)
        })
    }

    function fd() {
        var a, b, c = new Vc(function(c, e) {
            a = c;
            b = e
        });
        return new gd(c, a, b)
    }
    Vc.prototype.then = function(a, b, c) {
        return hd(this, t(a) ? a : null, t(b) ? b : null, c)
    };
    Vc.prototype.then = Vc.prototype.then;
    Vc.prototype.$goog_Thenable = !0;

    function id(a, b) {
        return hd(a, null, b, void 0)
    }
    Vc.prototype.cancel = function(a) {
        0 == this.a && sb(function() {
            var b = new Xc(a);
            jd(this, b)
        }, this)
    };

    function jd(a, b) {
        if (0 == a.a)
            if (a.c) {
                var c = a.c;
                if (c.b) {
                    for (var d = 0, e = null, f = null, h = c.b; h && (h.h || (d++, h.a == a && (e = h), !(e && 1 < d))); h = h.next) e || (f = h);
                    e && (0 == c.a && 1 == d ? jd(c, b) : (f ? (d = f, d.next == c.g && (c.g = d), d.next = d.next.next) : kd(c), ld(c, e, 3, b)))
                }
                a.c = null
            } else Wc(a, 3, b)
    }

    function md(a, b) {
        a.b || 2 != a.a && 3 != a.a || nd(a);
        a.g ? a.g.next = b : a.b = b;
        a.g = b
    }

    function hd(a, b, c, d) {
        var e = $c(null, null, null);
        e.a = new Vc(function(a, h) {
            e.g = b ? function(c) {
                try {
                    var e = b.call(d, c);
                    a(e)
                } catch (x) {
                    h(x)
                }
            } : a;
            e.b = c ? function(b) {
                try {
                    var e = c.call(d, b);
                    !p(e) && b instanceof Xc ? h(b) : a(e)
                } catch (x) {
                    h(x)
                }
            } : h
        });
        e.a.c = a;
        md(a, e);
        return e.a
    }
    Vc.prototype.m = function(a) {
        this.a = 0;
        Wc(this, 2, a)
    };
    Vc.prototype.s = function(a) {
        this.a = 0;
        Wc(this, 3, a)
    };

    function Wc(a, b, c) {
        0 == a.a && (a === c && (b = 3, c = new TypeError("Promise cannot resolve to itself")), a.a = 1, dd(c, a.m, a.s, a) || (a.i = c, a.a = b, a.c = null, nd(a), 3 != b || c instanceof Xc || od(a, c)))
    }

    function dd(a, b, c, d) {
        if (a instanceof Vc) return md(a, $c(b || r, c || null, d)), !0;
        if (a) try {
            var e = !!a.$goog_Thenable
        } catch (h) {
            e = !1
        } else e = !1;
        if (e) return a.then(b, c, d), !0;
        if (Aa(a)) try {
            var f = a.then;
            if (t(f)) return pd(a, f, b, c, d), !0
        } catch (h) {
            return c.call(d, h), !0
        }
        return !1
    }

    function pd(a, b, c, d, e) {
        function f(a) {
            l || (l = !0, d.call(e, a))
        }

        function h(a) {
            l || (l = !0, c.call(e, a))
        }
        var l = !1;
        try {
            b.call(a, h, f)
        } catch (v) {
            f(v)
        }
    }

    function nd(a) {
        a.j || (a.j = !0, sb(a.l, a))
    }

    function kd(a) {
        var b = null;
        a.b && (b = a.b, a.b = b.next, b.next = null);
        a.b || (a.g = null);
        return b
    }
    Vc.prototype.l = function() {
        for (var a; a = kd(this);) ld(this, a, this.a, this.i);
        this.j = !1
    };

    function ld(a, b, c, d) {
        if (3 == c && b.b && !b.h)
            for (; a && a.h; a = a.c) a.h = !1;
        if (b.a) b.a.c = null, qd(b, c, d);
        else try {
            b.h ? b.g.call(b.c) : qd(b, c, d)
        } catch (e) {
            rd.call(null, e)
        }
        Xa(Zc, b)
    }

    function qd(a, b, c) {
        2 == b ? a.g.call(a.c, c) : a.b && a.b.call(a.c, c)
    }

    function od(a, b) {
        a.h = !0;
        sb(function() {
            a.h && rd.call(null, b)
        })
    }
    var rd = kb;

    function Xc(a) {
        Ha.call(this, a)
    }
    Ga(Xc, Ha);
    Xc.prototype.name = "cancel";

    function gd(a, b, c) {
        this.a = a;
        this.resolve = b;
        this.reject = c
    };

    function sd(a, b, c) {
        if (t(a)) c && (a = Da(a, c));
        else if (a && "function" == typeof a.handleEvent) a = Da(a.handleEvent, a);
        else throw Error("Invalid listener argument");
        return 2147483647 < Number(b) ? -1 : n.setTimeout(a, b || 0)
    }

    function td(a) {
        var b = null;
        return id(new Vc(function(c, d) {
            b = sd(function() {
                c(void 0)
            }, a); - 1 == b && d(Error("Failed to schedule timer."))
        }), function(a) {
            n.clearTimeout(b);
            throw a;
        })
    };
    w("goog.net.XhrIo");

    function ud(a) {
        return Ia(a, "text/") || "application/ttml+xml" === a
    }
    var vd = /dv(he|av).[s|d|p][e|t|w][n|r|h|b][a|h]?[e|t|w]?/;

    function wd(a) {
        if (!a) return 100;
        switch (a.code) {
            case MediaError.MEDIA_ERR_ABORTED:
                return 101;
            case MediaError.MEDIA_ERR_NETWORK:
                return 103;
            case MediaError.MEDIA_ERR_DECODE:
                return 102;
            case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
                return 104;
            default:
                return 100
        }
    };
    var xd = /#(.)(.)(.)(.)/;

    function yd(a) {
        if (!zd.test(a)) throw Error("'" + a + "' is not a valid alpha hex color");
        5 == a.length && (a = a.replace(xd, "#$1$1$2$2$3$3$4$4"));
        a = a.toLowerCase();
        return [parseInt(a.substr(1, 2), 16), parseInt(a.substr(3, 2), 16), parseInt(a.substr(5, 2), 16), parseInt(a.substr(7, 2), 16) / 255]
    }
    var zd = /^#(?:[0-9a-f]{4}){1,2}$/i;

    function Ad(a) {
        var b = a.slice(0);
        b[3] = Math.round(1E3 * a[3]) / 1E3;
        return "rgba(" + b.join(",") + ")"
    };

    function Bd() {
        this.a = Fa()
    }
    var Cd = null;
    Bd.prototype.set = function(a) {
        this.a = a
    };
    Bd.prototype.reset = function() {
        this.set(Fa())
    };
    Bd.prototype.get = function() {
        return this.a
    };

    function Dd(a) {
        this.g = a || "";
        Cd || (Cd = new Bd);
        this.h = Cd
    }
    Dd.prototype.a = !0;
    Dd.prototype.b = !0;
    Dd.prototype.c = !1;

    function Ed(a) {
        return 10 > a ? "0" + a : String(a)
    }

    function Fd(a, b) {
        a = (a.c - b) / 1E3;
        b = a.toFixed(3);
        var c = 0;
        if (1 > a) c = 2;
        else
            for (; 100 > a;) c++, a *= 10;
        for (; 0 < c--;) b = " " + b;
        return b
    }

    function Gd(a) {
        Dd.call(this, a)
    }
    Ga(Gd, Dd);

    function Hd() {
        this.h = Da(this.c, this);
        this.a = new Gd;
        this.a.b = !1;
        this.a.c = !1;
        this.b = this.a.a = !1;
        this.g = {}
    }

    function Id() {
        var a = Jd;
        if (1 != a.b) {
            ec();
            var b = dc;
            var c = a.h;
            b.a || (b.a = []);
            b.a.push(c);
            a.b = !0
        }
    }
    Hd.prototype.c = function(a) {
        if (!this.g[a.b]) {
            var b = this.a;
            var c = [];
            c.push(b.g, " ");
            if (b.b) {
                var d = new Date(a.c);
                c.push("[", Ed(d.getFullYear() - 2E3) + Ed(d.getMonth() + 1) + Ed(d.getDate()) + " " + Ed(d.getHours()) + ":" + Ed(d.getMinutes()) + ":" + Ed(d.getSeconds()) + "." + Ed(Math.floor(d.getMilliseconds() / 10)), "] ")
            }
            c.push("[", Fd(a, b.h.get()), "s] ");
            c.push("[", a.b, "] ");
            c.push(a.h);
            b.c && (d = a.a) && c.push("\n", d instanceof Error ? d.message : d.toString());
            b.a && c.push("\n");
            b = c.join("");
            if (c = Kd) switch (a.g) {
                case Tb:
                    Ld(c, "info",
                        b);
                    break;
                case Ub:
                    Ld(c, "error", b);
                    break;
                case Vb:
                    Ld(c, "warn", b);
                    break;
                default:
                    Ld(c, "log", b)
            }
        }
    };
    var Jd = null,
        Kd = n.console;

    function Ld(a, b, c) {
        if (a[b]) a[b](c);
        else a.log(c)
    };

    function Md(a, b) {
        Lc.call(this);
        "object" != typeof a && (a = {
            a: a,
            b: b
        });
        this.i = 0 != a.a;
        this.c = a.b || Nd;
        this.l = a.c || "blob";
        this.b = this.c(this.Wa)
    }
    Ga(Md, Lc);
    g = Md.prototype;
    g.ca = null;
    g.ma = null;
    g.Ca = void 0;
    g.hc = !1;
    g.Wa = 0;
    g.va = null;
    g.D = w("goog.net.WebSocket");

    function Nd(a) {
        return Math.min(1E3 * Math.pow(2, a), 6E4)
    }
    g.open = function(a, b) {
        null != this.va && n.clearTimeout(this.va);
        this.va = null;
        this.ma = a;
        (this.Ca = b) ? (C(this.D, "Opening the WebSocket on " + this.ma + " with protocol " + this.Ca), this.ca = new WebSocket(this.ma, this.Ca)) : (C(this.D, "Opening the WebSocket on " + this.ma), this.ca = new WebSocket(this.ma));
        this.ca.binaryType = this.l;
        this.ca.onopen = Da(this.Hg, this);
        this.ca.onclose = Da(this.qg, this);
        this.ca.onmessage = Da(this.eg, this);
        this.ca.onerror = Da(this.dg, this)
    };
    g.close = function() {
        null != this.va && n.clearTimeout(this.va);
        this.va = null;
        this.ca && (C(this.D, "Closing the WebSocket."), this.hc = !0, this.ca.close(), this.ca = null)
    };
    g.send = function(a) {
        this.ca.send(a)
    };
    g.Hg = function() {
        C(this.D, "WebSocket opened on " + this.ma);
        this.dispatchEvent("d");
        this.Wa = 0;
        this.b = this.c(this.Wa)
    };
    g.qg = function(a) {
        C(this.D, "The WebSocket on " + this.ma + " closed.");
        this.dispatchEvent("a");
        this.ca = null;
        this.hc ? (C(this.D, "The WebSocket closed normally."), this.ma = null, this.Ca = void 0) : (A(this.D, "The WebSocket disconnected unexpectedly: " + a.data), this.i && (C(this.D, "Seconds until next reconnect attempt: " + Math.floor(this.b / 1E3)), this.va = sd(Da(this.open, this, this.ma, this.Ca), this.b, this), this.Wa++, this.b = this.c(this.Wa)));
        this.hc = !1
    };
    g.eg = function(a) {
        this.dispatchEvent(new Od(a.data))
    };
    g.dg = function(a) {
        a = a.data;
        A(this.D, "An error occurred: " + a);
        this.dispatchEvent(new Pd(a))
    };
    g.V = function() {
        Md.Xb.V.call(this);
        this.close()
    };

    function Od(a) {
        z.call(this, "c");
        this.message = a
    }
    Ga(Od, z);

    function Pd(a) {
        z.call(this, "b");
        this.data = a
    }
    Ga(Pd, z);

    function Qd() {
        this.a = [];
        this.b = []
    }

    function Rd(a) {
        0 == a.a.length && (a.a = a.b, a.a.reverse(), a.b = []);
        return a.a.pop()
    }

    function Sd(a) {
        return 0 == a.a.length && 0 == a.b.length
    }
    Qd.prototype.contains = function(a) {
        return 0 <= Ta(this.a, a) || 0 <= Ta(this.b, a)
    };
    Qd.prototype.sd = function() {
        for (var a = [], b = this.a.length - 1; 0 <= b; --b) a.push(this.a[b]);
        var c = this.b.length;
        for (b = 0; b < c; ++b) a.push(this.b[b]);
        return a
    };
    cast.receiver = {};
    cast.receiver.K = {};
    cast.receiver.K.Ih = cast.platform.metrics.logEventToUma;
    cast.receiver.K.Hh = cast.platform.metrics.logBoolToUma;
    cast.receiver.K.mg = cast.platform.metrics.logIntToUma;
    cast.receiver.K.Jh = cast.platform.metrics.logHistogramValueToUma;
    cast.receiver.VERSION = "2.0.0";
    cast.receiver.he = "0055";
    cast.receiver.Aa = function(a, b) {
        a = a.toLowerCase();
        b = b.toLowerCase();
        return 0 == a.indexOf(b) || 0 == b.indexOf(a)
    };
    w("cast.receiver.CastChannel");
    cast.receiver.platform = {};
    cast.receiver.platform.Ic = {
        "port-for-web-server": "8008"
    };
    cast.receiver.platform.wd = function() {
        return !(!cast.__platform__ || !cast.__platform__.canDisplayType)
    };
    cast.receiver.platform.canDisplayType = function(a) {
        return cast.__platform__.canDisplayType(a)
    };
    cast.__platform__ && cast.__platform__.canDisplayType || delete window.cast.receiver.platform.canDisplayType;
    cast.receiver.platform.rd = function(a) {
        if (cast.__platform__ && cast.__platform__.queryPlatformValue) return cast.__platform__.queryPlatformValue(a);
        if (a in cast.receiver.platform.Ic) return cast.receiver.platform.Ic[a]
    };
    cast.receiver.platform.getHdcpVersion = function() {
        return cast.__platform__ && cast.__platform__.display && cast.__platform__.display.getHdcpVersion ? cast.__platform__.display.getHdcpVersion() : Promise.reject(Error("getHdcpVersion is not available"))
    };

    function Td() {
        this.b = new Lc;
        this.a = !1
    }
    g = Td.prototype;
    g.open = function() {
        this.a ? A(Ud, "PlatformChannel Already open") : cast.__platform__.channel.open(Da(this.Pe, this), Da(this.Oe, this))
    };
    g.close = function() {
        this.a ? cast.__platform__.channel.close(Da(this.Ne, this)) : A(Ud, "PlatformChannel Cannot close unopened channel")
    };
    g.send = function(a) {
        cast.__platform__.channel.send(a)
    };
    g.Pe = function(a) {
        this.a = a;
        Vd(this, a ? "d" : "b")
    };
    g.Ne = function() {
        this.a && (this.a = !1, Vd(this, "a"))
    };
    g.Oe = function(a) {
        Vd(this, new Od(a))
    };
    g.addEventListener = function(a, b) {
        this.b.aa.add(String(a), b, !1, void 0, void 0)
    };
    g.removeEventListener = function(a, b) {
        tc(this.b.aa, String(a), b, void 0, void 0)
    };

    function Vd(a, b) {
        b = ua(b) ? new z(b) : b;
        b.target = a;
        a.b.dispatchEvent(b)
    }
    var Ud = w("cast.receiver.platform.WebSocket");
    cast.receiver.I = {};
    cast.receiver.I.Ga = "urn:x-cast:";
    cast.receiver.I.fb = cast.receiver.I.Ga + "com.google.cast.system";
    cast.receiver.I.fe = "1.0";
    cast.receiver.I.oa = "SystemSender";

    function Wd() {
        this.a = null;
        cast.__platform__ && cast.__platform__.channel ? (C(Xd, "Opening platform websocket"), Yd(this, new Td)) : (C(Xd, "Opening net websocket"), Yd(this, new Md(!0)));
        this.b = new Lc
    }

    function Yd(a, b) {
        a.a && a.a.$();
        a.a = b;
        a.a.addEventListener("d", a.Je.bind(a));
        a.a.addEventListener("a", a.Ge.bind(a));
        a.a.addEventListener("b", a.He.bind(a));
        a.a.addEventListener("c", a.Ie.bind(a))
    }

    function Zd(a, b) {
        Qc(Xd, "IpcChannel " + b);
        b = new $d(cast.receiver.I.fb, cast.receiver.I.oa, JSON.stringify({
            type: b
        }));
        b.target = a;
        a.b.dispatchEvent(b)
    }
    g = Wd.prototype;
    g.Je = function() {
        Zd(this, "opened")
    };
    g.Ge = function() {
        Zd(this, "closed")
    };
    g.He = function() {
        Zd(this, "error")
    };
    g.Ie = function(a) {
        Qc(Xd, "Received message: " + a.message);
        var b = (a = JSON.parse(a.message)) && a.namespace;
        a && b && a.senderId && a.data ? (a = new $d(b, a.senderId, a.data), a.target = this, this.b.dispatchEvent(a)) : A(Xd, "IpcChannel Message received is invalid")
    };
    g.open = function() {
        C(Xd, "Opening message bus websocket");
        this.a.open("ws://localhost:" + cast.receiver.platform.rd("port-for-web-server") + "/v2/ipc")
    };
    g.close = function() {
        C(Xd, "Closing message bus websocket");
        this.a.close()
    };
    g.send = function(a, b, c) {
        a = JSON.stringify({
            namespace: a,
            senderId: b,
            data: c
        });
        Qc(Xd, "IPC message sent: " + a);
        this.a.send(a)
    };
    g.addEventListener = function(a, b) {
        this.b.aa.add(String(a), b, !1, void 0, void 0)
    };
    g.removeEventListener = function(a, b) {
        tc(this.b.aa, String(a), b, void 0, void 0)
    };
    var Xd = w("cast.receiver.IpcChannel");

    function $d(a, b, c) {
        z.call(this, a);
        this.senderId = b;
        this.data = c
    }
    m($d, z);
    cast.receiver.media = {};
    cast.receiver.media.na = cast.receiver.I.Ga + "com.google.cast.media";
    var ae = {
        INVALID_PLAYER_STATE: "INVALID_PLAYER_STATE",
        LOAD_FAILED: "LOAD_FAILED",
        LOAD_CANCELLED: "LOAD_CANCELLED",
        INVALID_REQUEST: "INVALID_REQUEST",
        ERROR: "ERROR"
    };

    function be() {
        this.contentId = "";
        this.contentUrl = void 0;
        this.streamType = "NONE";
        this.contentType = "";
        this.hlsSegmentFormat = this.breakClips = this.breaks = this.customData = this.textTrackStyle = this.tracks = this.duration = this.entity = this.metadata = void 0
    }

    function ce() {
        this.startTime = this.startIndex = this.items = this.repeatMode = this.description = this.name = this.queueType = this.entity = this.id = void 0
    }

    function de() {
        this.muted = this.level = void 0
    }

    function ee(a, b, c) {
        this.width = a;
        this.height = b;
        this.hdrType = c
    }

    function fe(a) {
        this.playerState = "PLAYING";
        this.media = a
    }

    function ge(a, b) {
        this.trackId = a;
        this.trackContentType = this.trackContentId = void 0;
        this.type = b;
        this.customData = this.subtype = this.language = this.name = void 0
    }

    function he() {
        this.textTrackStyle = this.language = this.activeTrackIds = this.tracks = void 0
    }

    function ie() {
        this.type = "QUEUE_CHANGE";
        this.sequenceNumber = this.insertBefore = this.itemIds = this.changeType = this.requestId = void 0
    }

    function je() {
        this.type = "QUEUE_ITEMS";
        this.items = this.requestId = void 0
    }

    function ke() {
        this.type = "QUEUE_ITEM_IDS";
        this.itemIds = this.requestId = void 0
    }
    u("cast.receiver.media.repeatMode", {
        REPEAT_OFF: "REPEAT_OFF",
        REPEAT_ALL: "REPEAT_ALL",
        REPEAT_SINGLE: "REPEAT_SINGLE",
        REPEAT_ALL_AND_SHUFFLE: "REPEAT_ALL_AND_SHUFFLE"
    });
    cast.receiver.media.zd = function(a) {
        return "REPEAT_OFF" == a || "REPEAT_ALL" == a || "REPEAT_SINGLE" == a || "REPEAT_ALL_AND_SHUFFLE" == a
    };

    function le(a, b) {
        this.currentBreakTime = a;
        this.currentBreakClipTime = b;
        this.whenSkippable = this.breakClipId = this.breakId = void 0
    };

    function me(a, b, c, d) {
        y.call(this);
        this.b = a;
        this.l = b;
        this.m = !1;
        this.h = d || "STRING";
        this.i = new Lc;
        this.s = this.c = null;
        this.w = this.tf;
        this.v = this.Te;
        this.a = {};
        a = k(c);
        for (b = a.next(); !b.done; b = a.next()) this.a[b.value] = null;
        this.u = this.ad.bind(this);
        this.l.addEventListener(this.b, this.u)
    }
    m(me, y);

    function ne(a, b, c, d) {
        a.ad(new $d(b, c, d))
    }
    g = me.prototype;
    g.ad = function(a) {
        Pc(oe, Zb, "Dispatching CastMessageBus message");
        var b = "STRING" == this.h ? a.data : this.v(a.data);
        pe(this, new qe(a.senderId, a.senderId, b));
        a = new qe("message", a.senderId, b);
        this.c && this.c(a);
        pe(this, a)
    };
    g.send = function(a, b) {
        this.m || this.b == cast.receiver.I.fb || B(oe, "Application should not send requests before the system is ready (they will be ignored)");
        if (!this.s || !this.s(a, this.b, b))
            if ("STRING" == this.h) {
                if (!ua(b)) throw Error("Wrong argument, CastMessageBus type is STRING");
                this.l.send(this.b, a, b)
            } else this.l.send(this.b, a, this.w(b))
    };
    g.tf = function(a) {
        if ("JSON" != this.h) throw Error("Unexpected message type for JSON serialization");
        return this.b === cast.receiver.media.na ? JSON.stringify(a, function(a, c) {
            return null === c ? void 0 : c
        }) : JSON.stringify(a)
    };
    g.Te = function(a) {
        if ("JSON" != this.h) throw Error("Unexpected message type for JSON serialization");
        return JSON.parse(a)
    };
    g.V = function() {
        y.prototype.V.call(this);
        this.l.removeEventListener(this.b, this.u);
        this.i.$();
        for (var a in this.a) this.a[a] && this.a[a].close();
        this.a = {};
        Pc(oe, Zb, "Disposed " + ("CastMessageBus[" + this.b + "]"))
    };
    g.addEventListener = function(a, b) {
        yc(this.i, a, b)
    };
    g.removeEventListener = function(a, b) {
        Gc(this.i, a, b)
    };

    function pe(a, b) {
        b.target = a;
        return a.i.dispatchEvent(b)
    }
    g.dispatchEvent = function(a) {
        return pe(this, a)
    };
    var oe = w("cast.receiver.CastMessageBus");

    function qe(a, b, c) {
        z.call(this, a);
        this.senderId = b;
        this.data = c
    }
    m(qe, z);
    cast.receiver.Ia = {};
    cast.receiver.Ia.cb = cast.receiver.I.Ga + "com.google.cast.cac";
    cast.receiver.za = {};
    cast.receiver.za.ee = cast.receiver.I.Ga + "com.google.cast.inject";
    cast.receiver.za.bc = "__inject__";

    function re() {
        this.c = se.ga();
        this.h = 0;
        this.b = null;
        this.a = new Rc;
        this.i = this.l.bind(this);
        this.g = te(this.c, cast.receiver.za.ee, "JSON");
        this.g.c = this.j.bind(this);
        for (var a = k([cast.receiver.Ia.cb, cast.receiver.media.na]), b = a.next(); !b.done; b = a.next())
            if (b = this.c.a[b.value] || null) b.s = this.i
    }
    re.prototype.j = function(a) {
        var b = this,
            c = a.data,
            d = c.requestId,
            e = a.senderId;
        if ("WRAPPED" != c.type) ue(this, "Unsupported message type " + c.type, e, d);
        else {
            a = JSON.parse(c.data);
            c = a.namespace;
            var f = this.c.a[c] || null;
            if (f) {
                var h = !1;
                if (c == cast.receiver.Ia.cb) a.data.requestId = d, h = !0;
                else if (c == cast.receiver.media.na) {
                    var l = a.data;
                    l.requestId = d;
                    l.mediaSessionId = this.h
                } else {
                    ue(this, "Unsupported namespace " + c, e, d);
                    return
                }
                this.a.set(d, e);
                try {
                    this.b = null, ne(f, c, cast.receiver.za.bc, JSON.stringify(a.data))
                } catch (x) {
                    throw Tc(this.a,
                        d), ue(this, "Injecting " + a.data + " failed with " + x, e, d), x;
                }
                if (!h) {
                    var v = function() {
                        return b.b ? (Tc(b.a, d), ue(b, "Error " + JSON.stringify(b.b), e, d, "WRAPPED_ERROR", b.b), !0) : !1
                    };
                    v() || setTimeout(function() {
                        v() || (Tc(b.a, d), ve(b, e, d))
                    }, 5)
                }
            } else ue(this, "Unregistered namespace " + c, e, d, "WRAPPED_ERROR", {
                type: "ERROR",
                code: "UNREGISTERED_NAMESPACE"
            })
        }
    };
    re.prototype.l = function(a, b, c) {
        if (b == cast.receiver.media.na && "STRING" == (this.c.a[b] || null).h) try {
            c = JSON.parse(c)
        } catch (e) {
            return A(we, "Parse failed: " + c), !1
        }
        var d = c.type;
        b == cast.receiver.media.na && "MEDIA_STATUS" == d && c.status && c.status[0] && (this.h = c.status[0].mediaSessionId);
        if (a != cast.receiver.za.bc) return !1;
        a = c.requestId;
        if (!p(a)) return B(we, "No requestId in " + c), !0;
        if (b == cast.receiver.media.na) {
            switch (d) {
                case "INVALID_REQUEST":
                case "INVALID_PLAYER_STATE":
                    b = c.reason, this.b = {
                        type: "ERROR",
                        code: b ? b : d
                    }
            }
            return !0
        }
        d = this.a.get(a);
        if (!d) return A(we, "Request not found " + a), !0;
        Tc(this.a, a);
        if (b != cast.receiver.Ia.cb) return A(we, "Unsupported namespace " + b), !0;
        b = c;
        switch (b.type) {
            case "SUCCESS":
                ve(this, d, a, Object.getOwnPropertyNames(c).some(function(a) {
                    return "type" != a && "requestId" != a && p(c[a])
                }) ? JSON.stringify(c) : void 0);
                break;
            case "ERROR":
                ue(this, "Wrapped error", d, a, "WRAPPED_ERROR", b);
                break;
            default:
                ue(this, "Unknown message type " + c, d, a)
        }
        return !0
    };

    function ue(a, b, c, d, e, f) {
        A(we, b);
        a.g.send(c, new xe(d, e || "INJECT_ERROR", p(f) ? JSON.stringify(f) : void 0))
    }

    function ve(a, b, c, d) {
        a.g.send(b, new ye(c, d))
    }
    wa(re);
    var we = w("cast.receiver.InjectManager");

    function ze(a, b, c) {
        this.type = a;
        this.requestId = b;
        this.data = c
    }

    function ye(a, b) {
        ze.call(this, "SUCCESS", a, b)
    }
    m(ye, ze);

    function xe(a, b, c) {
        ze.call(this, "ERROR", a, c);
        this.code = b
    }
    m(xe, ze);

    function se() {
        y.call(this);
        Jd || (Jd = new Hd);
        Jd && Id();
        this.b = gb(Ae);
        this.G = !1;
        this.v = new Wd;
        this.c = {};
        this.u = new Lc;
        this.h = new me(cast.receiver.I.fb, this.v, db(this.c), "JSON");
        fc(this, Ea(gc, this.h));
        this.l = this.F = null;
        this.P = !1;
        this.m = this.s = null;
        this.w = !0;
        this.i = "notstarted";
        this.R = null;
        this.a = {};
        this.J = this.N = this.M = this.L = null;
        this.h.addEventListener(cast.receiver.I.oa, this.Qg.bind(this));
        yc(window, "unload", this.tc, !1, this);
        yc(document, "visibilitychange", this.Dd, !1, this);
        Pc(D, Tb, "Version: " + cast.receiver.VERSION +
            "." + cast.receiver.he);
        Be && Be(this)
    }
    m(se, y);

    function Ce(a) {
        var b = a.toLocaleLowerCase();
        return ["com.vizio.vue", "com.vizio.smartcast"].some(function(a) {
            return b.includes(a)
        })
    }
    g = se.prototype;
    g.start = function(a) {
        if (a) {
            if (!a) throw Error("Cannot validate undefined config.");
            if (void 0 != a.maxInactivity && 5 > a.maxInactivity) throw Error("config.maxInactivity must be greater than or equal to 5 seconds.");
            jb(this.b, a || {})
        }
        this.b.versionCode && 0 <= this.b.versionCode && (Number.isInteger(this.b.versionCode) ? (cast.receiver.K.mg("Cast.Receiver.VersionCode", this.b.versionCode), C(D, "App Version " + this.b.versionCode)) : A(D, "Receiver versionCode needs to be an integer"));
        re.ga();
        this.P = !0;
        this.v.open()
    };
    g.stop = function() {
        this.$();
        window.close()
    };
    g.Ma = function() {
        return "ready" == this.i
    };
    g.getSenders = function() {
        return db(this.c)
    };
    g.vb = function(a) {
        return this.c[a] ? gb(this.c[a]) : null
    };
    g.nc = function() {
        return null == this.s ? this.m ? "notvisible" : "unknown" : this.s ? "visible" : "notvisible"
    };
    g.kc = function() {
        return null == this.m ? this.s ? "notstandby" : "unknown" : this.m ? "standby" : "notstandby"
    };
    g.wb = function() {
        "notstarted" == this.i && (this.i = /[&?]google_cast_bg=true(&|$)/.test(window.location.search) ? "startinginbackground" : "starting");
        return this.i
    };
    g.nb = function() {
        return this.F
    };
    g.Ja = function() {
        return this.l
    };
    g.Ya = function(a) {
        this.Ma() ? De(this, a) : this.b.statusText != a && (this.b.statusText = a, this.G = !0)
    };
    g.Dc = function(a) {
        if (0 > a || 1 < a) throw Error("Invalid level value");
        this.h.send(cast.receiver.I.oa, {
            type: "setvolume",
            level: a
        })
    };
    g.Ec = function(a) {
        this.h.send(cast.receiver.I.oa, {
            type: "setvolume",
            muted: a
        })
    };
    g.lc = function() {
        return this.R
    };

    function De(a, b, c) {
        var d = {
            type: "setappstate"
        };
        void 0 != b && (d.statusText = b);
        void 0 != c && (d.dialData = c);
        a.h.send(cast.receiver.I.oa, d)
    }
    g.Ub = function(a) {
        this.h.send(cast.receiver.I.oa, {
            type: "startheartbeat",
            maxInactivity: a
        })
    };

    function te(a, b, c) {
        if (b == cast.receiver.I.fb) throw Error("Protected namespace");
        if (0 != b.lastIndexOf(cast.receiver.I.Ga, 0)) throw Error("Invalid namespace prefix");
        if (!a.a[b]) {
            if (a.P) throw Error("New namespaces can not be requested after start has been called");
            a.a[b] = new me(b, a.v, db(a.c), c);
            fc(a, Ea(gc, a.a[b]))
        }
        if (c && a.a[b].h != c) throw Error("Invalid messageType for the namespace");
        return a.a[b]
    }
    g.Sb = function(a) {
        this.h.send(cast.receiver.I.oa, {
            type: "sendfeedbackmessage",
            message: a
        })
    };
    g.Qg = function(a) {
        a = a.data;
        switch (a.type) {
            case "opened":
                C(D, "Underlying message bus is open");
                var b = db(this.a),
                    c = this.b.statusText;
                a = this.b.uf;
                var d = {
                    type: "ready"
                };
                c && (d.statusText = c);
                a && (d.dialData = a);
                d.activeNamespaces = b;
                d.version = cast.receiver.VERSION;
                d.messagesVersion = cast.receiver.I.fe;
                this.h.send(cast.receiver.I.oa, d);
                this.b.maxInactivity && this.Ub(this.b.maxInactivity);
                break;
            case "closed":
                this.tc();
                break;
            case "error":
                Ee(this, new E("error", null));
                break;
            case "ready":
                b = a.launchingSenderId;
                c = db(this.a);
                this.C = a.version;
                this.w = !Fe(this);
                var e = a.deviceCapabilities;
                this.l = e ? gb(e) : {};
                cast.receiver.platform.wd() && (this.l.hasOwnProperty("is_hdr_supported") || (this.l.is_hdr_supported = cast.receiver.platform.canDisplayType("video/mp4; codecs=hev1.2.4.L153.B0; eotf=smpte2084")), this.l.hasOwnProperty("is_dv_supported") || (this.l.is_dv_supported = cast.receiver.platform.canDisplayType("video/mp4; codecs=dvhe.04.06")));
                this.F = {
                    id: a.applicationId,
                    name: a.applicationName,
                    sessionId: a.sessionId,
                    namespaces: c,
                    launchingSenderId: b
                };
                this.i = "ready";
                for (d in this.a) this.a[d].m = !0;
                this.G && (this.G = !1, De(this, this.b.statusText, this.b.uf));
                C(D, "Dispatching CastReceiverManager system ready event");
                b = new Ge(this.F);
                this.L && this.L(b);
                Ee(this, b);
                break;
            case "senderconnected":
                b = {
                    id: a.senderId,
                    userAgent: a.userAgent
                };
                if (Ce(b.id)) C(D, "Ignored connection from " + b.id);
                else {
                    C(D, "Dispatching CastReceiverManager sender connected event [" + b.id + "]");
                    eb(this.c, b.id) && A(D, "Unexpected connected message for already connected sender: " + b.id);
                    this.c[b.id] =
                        b;
                    a = new He(b.id, b.userAgent);
                    for (c in this.a) d = this.a[c], e = b.id, eb(d.a, e) ? A(oe, "Unexpected sender already registered [" + d.b + ", " + e + "]") : (C(oe, "Registering sender [" + d.b + ", " + e + "]"), d.a[e] = null);
                    Ee(this, a)
                }
                break;
            case "senderdisconnected":
                c = a.senderId;
                a = a.reason;
                if (Ce(c)) C(D, "Ignored disconnection from " + c);
                else {
                    switch (a) {
                        case "closed_by_peer":
                            a = "requested_by_sender";
                            break;
                        case "transport_invalid_message":
                            a = "error";
                            break;
                        default:
                            a = "unknown"
                    }
                    C(D, "Dispatching sender disconnected event [" + c + "] Reason: " +
                        a);
                    if (eb(this.c, c)) {
                        d = this.c[c].userAgent;
                        delete this.c[c];
                        a = new Ie(c, d, a);
                        for (b in this.a) d = this.a[b], e = c, eb(d.a, e) && (C(oe, "Unregistering sender [" + d.b + ", " + e + "]"), d.a[e] && d.a[e].close(), delete d.a[e]);
                        this.M && this.M(a);
                        Ee(this, a)
                    } else A(D, "Unknown sender disconnected: " + c)
                }
                break;
            case "volumechanged":
                this.R = b = {
                    level: a.level,
                    muted: a.muted
                };
                C(D, "Dispatching system volume changed event [" + b.level + ", " + b.muted + "]");
                Ee(this, new Je(b));
                break;
            case "visibilitychanged":
                this.w || (b = a.visible, Ke(this, p(b) ? b :
                    null));
                break;
            case "standbychanged":
                this.w || (b = a.standby, b = p(b) ? b : null, b != this.m && (C(D, "Dispatching standby changed event " + b), this.m = b, Ee(this, new Le(1 == b))));
                break;
            case "maxvideoresolutionchanged":
                b = a.height;
                C(D, "Dispatching maxvideoresolutionchanged " + b);
                Ee(this, new Me(b));
                break;
            case "hdroutputtypechanged":
                this.J && this.J(a.hdrType);
                break;
            case "screenresolutionchanged":
                break;
            case "feedbackstarted":
                C(D, "Dispatching feedback started event");
                this.Sb("");
                break;
            default:
                throw Error("Unexpected message type: " +
                    a.type);
        }
    };
    g.canDisplayType = function(a, b, c, d, e) {
        if (!cast.receiver.platform.wd()) return !0;
        if (!Ia(a, "video/") && !Ia(a, "audio/")) throw Error("Not video or audio types.");
        b && (a += "; codecs=" + b);
        c && d && (a += "; width=" + c + "; height=" + d);
        e && (a += "; framerate=" + e);
        if (c = b) a: for (c = !1, b = b.split(","), d = 0; d < b.length; d++) {
            if (b[d].match(vd)) {
                c = !1;
                break a
            }
            0 === b[d].indexOf("hev1.2") && (c = !0)
        }
        c && (a += "; eotf=smpte2084");
        return cast.receiver.platform.canDisplayType(a)
    };

    function Ke(a, b) {
        b == a.s ? C(D, "Ignoring visibility changed event, state is already " + b) : (C(D, "Dispatching visibility changed event " + b), a.s = b, b = new Ne(0 != b), a.N && a.N(b), Ee(a, b))
    }
    g.Dd = function() {
        this.w && Ke(this, "visible" == document.visibilityState)
    };
    g.tc = function() {
        C(D, "Dispatching shutdown event");
        this.wb();
        this.i = "startinginbackground" == this.i ? "stoppinginbackground" : "stopping";
        for (var a in this.a) this.a[a].m = !1;
        Ee(this, new Oe)
    };

    function Fe(a) {
        if (!a.C) return A(D, "No System Version"), !1;
        var b = ["1", "11"];
        if (!b.length) return A(D, "Version provided is not valid: 1.11"), !1;
        var c = a.C.split(".");
        if (!c.length) return A(D, "System Version format is not valid " + a.C), !1;
        for (var d = 0; d < b.length; d++) {
            var e = parseInt(b[d], 10);
            if (isNaN(e)) return A(D, "Version is not numeric: 1.11"), !1;
            var f = c.length > d ? parseInt(c[d], 10) : 0;
            if (isNaN(f)) return A(D, "System Version is not numeric: " + a.C), !1;
            if (e > f) return !1
        }
        return !0
    }
    g.V = function() {
        this.u.$();
        this.v.close();
        y.prototype.V.call(this);
        window && Gc(window, "unload", this.tc, !1, this);
        document && Gc(document, "visibilitychange", this.Dd, !1, this);
        delete se.zb;
        Qc(D, "Disposed CastReceiverManager")
    };
    g.addEventListener = function(a, b) {
        yc(this.u, a, b)
    };
    g.removeEventListener = function(a, b) {
        Gc(this.u, a, b)
    };

    function Ee(a, b) {
        b.target = a;
        return a.u.dispatchEvent(b)
    }
    g.dispatchEvent = function(a) {
        return Ee(this, a)
    };
    wa(se);
    se.getInstance = se.ga;
    var Be = null,
        D = w("cast.receiver.CastReceiverManager");

    function E(a, b) {
        z.call(this, a);
        this.data = b
    }
    m(E, z);

    function Ie(a, b, c) {
        E.call(this, "senderdisconnected", a);
        this.senderId = a;
        this.userAgent = b;
        this.reason = c
    }
    m(Ie, E);

    function He(a, b) {
        E.call(this, "senderconnected", a);
        this.senderId = a;
        this.userAgent = b
    }
    m(He, E);

    function Ne(a) {
        E.call(this, "visibilitychanged", a);
        this.isVisible = a
    }
    m(Ne, E);

    function Le(a) {
        E.call(this, "standbychanged", null);
        this.isStandby = a
    }
    m(Le, E);

    function Je(a) {
        E.call(this, "systemvolumechanged", a);
        this.data = a
    }
    m(Je, E);

    function Ge(a) {
        E.call(this, "ready", a);
        this.data = a
    }
    m(Ge, E);

    function Oe() {
        E.call(this, "shutdown", null)
    }
    m(Oe, E);

    function Me(a) {
        E.call(this, "maxvideoresolutionchanged", null);
        this.height = a
    }
    m(Me, E);
    var Ae = {
        maxInactivity: 10
    };

    function Pe() {
        this.a = se.ga();
        this.b = te(this.a, "urn:x-cast:com.google.cast.broadcast", "JSON");
        this.b.c = this.c.bind(this)
    }
    Pe.prototype.c = function(a) {
        if (this.a.Ma()) B(Qe, "Ignoring broadcast request, system is ready.");
        else {
            a = a.data;
            var b = a.type;
            if ("APPLICATION_BROADCAST" != b) A(Qe, "Ignoring message type: " + b);
            else if (b = a.a) {
                var c = this.a.a[b] || null;
                if (c) switch (b) {
                    case cast.receiver.media.na:
                        var d = JSON.parse(a.message);
                        if ("PRECACHE" != d.type) {
                            A(Qe, "Unsupported type for media namespace: " + d.type);
                            break
                        }
                        ne(c, b, "__broadcast__", a.message);
                        break;
                    default:
                        A(Qe, "Unsupported namespace: " + a.a)
                } else A(Qe, "Invalid message bus for namespace: " +
                    b)
            } else A(Qe, "Missing namespace: " + b)
        }
    };
    wa(Pe);
    var Qe = w("cast.receiver.BroadcastManager");

    function Re() {
        this.b = this.m = this.i = this.l = this.s = this.g = this.h = null;
        this.j = se.ga();
        this.a = te(this.j, Se, "JSON");
        this.a.c = this.u.bind(this);
        this.c = new Rc
    }
    Re.prototype.u = function(a) {
        var b = a.data,
            c = b.type;
        a = a.senderId;
        switch (c) {
            case "SET_CREDENTIALS":
                Te(this, b.forRequestId, b);
                var d = this.h;
                break;
            case "LOAD_BY_ENTITY":
                d = this.g;
                break;
            case "USER_ACTION":
                d = this.s;
                break;
            case "DISPLAY_STATUS":
                d = this.l;
                break;
            case "CUSTOM_COMMAND":
                d = this.i;
                break;
            case "FOCUS_STATE":
                (d = this.m) && this.j.Ja().focus_state_supported && d(b);
                return;
            case "SUCCESS":
            case "ERROR":
                Te(this, b.requestId, b);
                return;
            default:
                Ue(this, "Unsupported event " + c, a, b, "INVALID_REQUEST");
                return
        }
        d ? Ve(this, a,
            b, d) : Ue(this, "Handler for " + c + " not implemented", a, b, "INVALID_COMMAND")
    };

    function Ve(a, b, c, d) {
        ad().then(function() {
            return d(c)
        }).then(function(d) {
            a: if (d) {
                switch (d.type) {
                    case "SUCCESS":
                    case "ERROR":
                        d.requestId = c.requestId;
                        break a
                }
                d = We("Invalid response data " + JSON.stringify(d), c, "APP_ERROR")
            } else d = We("No response data", c, "APP_ERROR");
            "ERROR" === d.type && a.b && a.b(d);a.a.send(b, d)
        }, function(d) {
            Ue(a, "Got a rejected promise " + JSON.stringify(d), b, c, "APP_ERROR")
        })
    }

    function We(a, b, c) {
        A(Xe, a);
        a = new Ye(c);
        a.requestId = b.requestId;
        return a
    }

    function Ue(a, b, c, d, e) {
        var f = We(b, d, e);
        a.b && a.b(f);
        a.a.send(c, We(b, d, e))
    }
    Re.prototype.uc = function(a, b) {
        var c = this;
        if ((a = this.j.Ja()) && !0 === a.display_supported) return Promise.resolve(new Ye("NOT_SUPPORTED"));
        a = Fa();
        if (Uc(this.c.b, a)) return Promise.reject(Error("Duplicate request"));
        var d = new Ze(0, b);
        d.requestId = a;
        return new Promise(function(a) {
            c.c.set(d.requestId, a);
            c.a.send("system-0", d)
        })
    };
    Re.prototype.vc = function() {
        var a = this,
            b = Fa(),
            c = new $e;
        c.requestId = b;
        return new Promise(function(b) {
            a.c.set(c.requestId, b);
            a.a.send("system-0", c)
        })
    };

    function Te(a, b, c) {
        if (b) {
            var d = a.c.get(b);
            d ? (Tc(a.c, b), d(c)) : B(Xe, "No matching request for response " + JSON.stringify(c))
        }
    }
    wa(Re);
    Re.getInstance = Re.ga;
    var Se = cast.receiver.Ia.cb,
        Xe = w("cast.receiver.CommandAndControlManager");

    function af(a) {
        this.type = a
    }

    function $e() {
        this.type = "REFRESH_CREDENTIALS"
    }
    m($e, af);

    function Ze(a, b) {
        this.type = "PLAY_STRING";
        this.arguments = b
    }
    m(Ze, af);

    function bf(a) {
        this.type = a
    }
    m(bf, af);

    function cf(a) {
        this.type = "SUCCESS";
        this.status = a
    }
    m(cf, bf);

    function Ye(a, b) {
        this.type = "ERROR";
        this.code = a;
        this.reason = b
    }
    m(Ye, bf);
    cast.receiver.crypto = {};
    cast.receiver.cryptokeys = {};
    cast.receiver.crypto.mh = !(!cast.__platform__ || !cast.__platform__.cryptokeys);
    cast.receiver.crypto.Fa = !(!cast.__platform__ || !cast.__platform__.crypto);
    cast.receiver.cryptokeys.getKeyByName = cast.receiver.crypto.mh ? cast.__platform__.cryptokeys.getKeyByName : window.cryptokeys && window.cryptokeys.getKeyByName;
    cast.receiver.crypto.decrypt = cast.receiver.crypto.Fa ? cast.__platform__.crypto.decrypt : window.crypto.subtle.decrypt;
    cast.receiver.crypto.encrypt = cast.receiver.crypto.Fa ? cast.__platform__.crypto.encrypt : window.crypto.subtle.encrypt;
    cast.receiver.crypto.sign = cast.receiver.crypto.Fa ? cast.__platform__.crypto.sign : window.crypto.subtle.sign;
    cast.receiver.crypto.unwrapKey = cast.receiver.crypto.Fa ? cast.__platform__.crypto.unwrapKey : window.crypto.subtle.unwrapKey;
    cast.receiver.crypto.verify = cast.receiver.crypto.Fa ? cast.__platform__.crypto.verify : window.crypto.subtle.verify;
    cast.receiver.crypto.wrapKey = cast.receiver.crypto.Fa ? cast.__platform__.crypto.wrapKey : window.crypto.subtle.wrapKey;

    function df(a) {
        this.u = te(a, "urn:x-cast:com.google.cast.debugoverlay", "JSON");
        this.u.c = this.s.bind(this);
        this.b = this.a = this.j = this.h = null;
        this.c = [];
        this.g = []
    }
    df.prototype.s = function(a) {
        C(ef, "DebugOverlay: " + JSON.stringify(a.data));
        switch (a.data.type) {
            case "SHOW":
                ff(this);
                break;
            case "HIDE":
                gf(this)
        }
    };

    function ff(a) {
        a.a || a.b || (a.c.length = 0, a.g.length = 0, a.m(), a.a || (a.b = window.setInterval(a.m.bind(a), 1E3)))
    }

    function gf(a) {
        if (a.a || a.b) a.h && (document.body.removeChild(a.h.parentElement), a.h = null), a.j && (window.clearInterval(a.j), a.j = null), a.a && (Gc(a.a, "seeking", a.l, !1, a), a.a = null), a.b && (window.clearInterval(a.b), a.b = null)
    }

    function hf(a, b) {
        C(ef, "found active video");
        a.a = b;
        b = document.createElement("div");
        b.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;z-index:9001;-webkit-text-fill-color:black;-webkit-text-stroke-color:red;-webkit-text-stroke-width:1px;padding-left:5vw;padding-top:5vh;margin:0;font-size:24pt";
        var c = document.createTextNode("");
        b.appendChild(c);
        b.id = "__CAST_DEBUG_OVERLAY__";
        document.body.appendChild(b);
        a.h = c;
        a.i();
        a.j = window.setInterval(a.i.bind(a), 1E3);
        yc(a.a, "seeking", a.l, !1, a);
        a.b && (window.clearInterval(a.b), a.b = null)
    }
    df.prototype.i = function() {
        var a = this.a;
        if (a && a.src && !a.error && !a.ended && 1 <= a.readyState) {
            var b = a.videoWidth,
                c = a.videoHeight;
            if (0 >= b || 0 >= c) Qc(ef, "canceling draw because video not initialized");
            else {
                var d = 0;
                if (a.paused || a.seeking) Qc(ef, "not calculating fps because paused or seeking");
                else {
                    d = a.webkitDecodedFrameCount;
                    a = a.currentTime;
                    var e = 0;
                    if (0 < this.c.length && 0 < this.g.length) {
                        var f = this.c[0],
                            h = this.g[0];
                        a > f && d > h && (e = (d - h) / (a - f))
                    }
                    this.c.push(a);
                    this.g.push(d);
                    5 <= this.c.length && 5 <= this.g.length && (this.c.splice(0,
                        this.c.length - 5), this.g.splice(0, this.g.length - 5));
                    d = e
                }
                b = b + "x" + c + "(" + (0 < d ? Math.round(d).toString() : "?") + ")";
                Qc(ef, "video is " + b);
                this.h.textContent = b
            }
        } else if (Qc(ef, "video is no longer active, restarting search procedure"), this.a || this.b) gf(this), ff(this)
    };
    df.prototype.l = function() {
        C(ef, "onSeeking");
        this.c = [this.a.currentTime];
        this.g = [this.a.webkitDecodedFrameCount]
    };
    df.prototype.m = function() {
        function a(b) {
            for (var c = k(b.document.getElementsByTagName("video")), e = c.next(); !e.done; e = c.next())
                if (e = e.value, e.src && !e.error && !e.ended && 1 <= e.readyState) return e;
            for (c = 0; c < b.frames.length; ++c) try {
                var f = a(b.frames[c]);
                if (f) return f
            } catch (h) {}
            return null
        }
        var b = a(window);
        b && hf(this, b)
    };
    var ef = w("cast.receiver.DebugOverlay");
    Be = function(a) {
        new df(a)
    };

    function jf(a, b, c, d) {
        y.call(this);
        this.a = a;
        this.c = this.h = null;
        for (a = this.a; a.parentNode;) a = a.parentNode;
        this.m = 0 > a.toString().toLowerCase().indexOf("shadow") ? document.head : a;
        this.b = [];
        this.l = !1;
        this.i = "cast-captions-" + Math.floor(1E6 * Math.random()).toString();
        this.u = "[" + this.i + '="true"]::cue ';
        this.v = new RegExp(/^[\.'":%,;\s\-0-9a-z]+$/i);
        this.s = void 0;
        kf(this, b);
        lf(this);
        d && mf(this, d);
        nf(this, c)
    }
    m(jf, y);

    function of (a, b) {
        a = k(a.b);
        for (var c = a.next(); !c.done; c = a.next()) {
            c = c.value;
            var d = c.track;
            b(c) ? d.mode = "showing" : (d.mode = "showing", d.mode = "disabled")
        }
    }

    function pf(a) {
        return a.b.map(function(a) {
            return parseInt(a.id, 10)
        })
    }

    function nf(a, b) { of (a, function(a) {
            return 0 <= Ta(b, parseInt(a.id, 10))
        })
    }

    function qf(a, b) { of (a, function(a) {
            return cast.receiver.Aa(b, a.srclang)
        })
    }

    function rf(a) {
        var b = [];
        a = k(a.b);
        for (var c = a.next(); !c.done; c = a.next()) c = c.value, "showing" == c.track.mode && b.push(parseInt(c.id, 10));
        return b
    }

    function kf(a, b) {
        b = k(b);
        for (var c = b.next(); !c.done; c = b.next()) {
            c = c.value;
            var d = c.trackContentId;
            if ("TEXT" == c.type && d) {
                var e = c.trackContentType;
                if (0 == Ja("vtt", d.substr(d.length - 3, 3)) || p(e) && 0 == Ja(e, "text/vtt")) d = document.createElement("track"), d.src = c.trackContentId, d.id = c.trackId, d.label = c.name, d.srclang = c.language, d.kind = (c.subtype || "CAPTIONS").toLowerCase(), a.b.push(d), a.a.appendChild(d)
            }
        }
    }

    function sf(a) {
        a.c && (a.a.removeAttribute(a.i), a.m.removeChild(a.c), a.h = null)
    }

    function tf(a) {
        a.l && (a.a.removeAttribute("crossorigin"), a.l = !1)
    }

    function uf(a, b, c) {
        1 == c || a.v.test(b) ? a.h.insertRule(a.u + "{ " + b + " }", a.h.cssRules.length) : B(vf, "Invalid css cue: " + b)
    }

    function lf(a) {
        sf(a);
        tf(a);
        var b = document.createElement("style");
        b.type = "text/css";
        a.m.appendChild(b);
        b.appendChild(document.createTextNode(""));
        a.c = b;
        a.h = a.c.sheet;
        uf(a, "font-size: 4.1vh;");
        uf(a, "font-family: monospace;");
        uf(a, "font-style: normal;");
        uf(a, "font-weight: normal;");
        uf(a, "background-color: black;");
        uf(a, "color: white;");
        a.a.setAttribute(a.i, !0);
        0 < a.b.length && !a.a.getAttribute("crossorigin") && (a.a.setAttribute("crossorigin", "anonymous"), a.l = !0)
    }

    function wf(a, b) {
        try {
            var c = Ad(yd(a))
        } catch (d) {
            B(vf, "Invalid color: " + a)
        }
        if (c) switch (a = "rgba(204, 204, 204, " + parseInt(a.substring(7, 9), 16) + ")", b) {
            case "OUTLINE":
                return "text-shadow: 0 0 4px " + c + ", 0 0 4px " + c + ", 0 0 4px " + c + ", 0 0 4px " + c + ";";
            case "DROP_SHADOW":
                return "text-shadow: 0px 2px 3px " + c + ", 0px 2px 4px " + c + ", 0px 2px 5px " + c + ";";
            case "RAISED":
                return "text-shadow: 1px 1px " + c + ", 2px 2px " + c + ", 3px 3px " + c + ";";
            case "DEPRESSED":
                return "text-shadow: 1px 1px " + a + ", 0 1px " + a + ", -1px -1px " + c + ", 0 -1px " +
                    c + ";"
        }
        return ""
    }

    function xf(a) {
        switch (a) {
            case "BOLD":
                return "font-weight: bold;";
            case "BOLD_ITALIC":
                return "font-style: italic; font-weight: bold;";
            case "ITALIC":
                return "font-style: italic;"
        }
        return "font-style: normal;"
    }

    function mf(a, b) {
        a.s = b;
        if (p(b.foregroundColor)) try {
            var c = Ad(yd(b.foregroundColor));
            uf(a, "color: " + c + ";", !0)
        } catch (l) {
            B(vf, "Invalid color: " + b.foregroundColor)
        }
        if (p(b.backgroundColor)) try {
            var d = Ad(yd(b.backgroundColor));
            uf(a, "background-color: " + d + ";", !0)
        } catch (l) {
            B(vf, "Invalid color: " + b.backgroundColor)
        }
        p(b.fontScale) && uf(a, "font-size: " + 100 * b.fontScale + "%;");
        if (p(b.fontFamily) || p(b.fontGenericFamily)) {
            c = b.fontFamily;
            d = b.fontGenericFamily;
            var e = "font-family: ",
                f = "";
            p(c) && (e += '"' + c + '"', f = ", ");
            if (p(d)) {
                switch (d) {
                    case "SANS_SERIF":
                        var h =
                            '"Droid Sans", sans-serif';
                        break;
                    case "MONOSPACED_SANS_SERIF":
                        h = '"Droid Sans Mono", monospace';
                        break;
                    case "SERIF":
                        h = '"Droid Serif", serif';
                        break;
                    case "MONOSPACED_SERIF":
                        h = '"Cutive Mono"';
                        break;
                    case "CASUAL":
                        h = '"Short Stack"';
                        break;
                    case "CURSIVE":
                        h = "Quintessential";
                        break;
                    case "SMALL_CAPITALS":
                        h = '"Alegreya Sans SC"'
                }
                e += f + h
            }
            uf(a, e + ";")
        }
        p(b.fontStyle) && uf(a, xf(b.fontStyle));
        p(b.edgeType) && (h = p(b.foregroundColor) ? b.foregroundColor : "#FFFFFFFF", b = p(b.edgeColor) ? wf(b.edgeColor, b.edgeType) : wf(h, b.edgeType),
            uf(a, b, !0))
    }
    jf.prototype.ya = function() {
        return this.s
    };
    jf.prototype.qa = function(a) {
        lf(this);
        mf(this, a)
    };
    jf.prototype.V = function() {
        y.prototype.V.call(this);
        for (var a = k(this.b), b = a.next(); !b.done; b = a.next()) this.a.removeChild(b.value);
        this.b.length = 0;
        sf(this);
        tf(this);
        Pc(vf, Zb, "Disposed TextTracksManager")
    };
    var vf = w("cast.receiver.TextTracksManager");

    function yf(a, b) {
        this.D = a;
        this.a = b;
        this.u = this.m = this.s = r;
        this.h = 0;
        this.g = this.j = null;
        this.v = 0;
        this.c = this.b = null;
        this.i = !1;
        this.l = !0;
        yc(this.a, "error", this.Ee, !1, this);
        yc(this.a, "ended", this.bd, !1, this);
        yc(this.a, "loadedmetadata", this.Fe, !1, this);
        C(this.D, "Using default Player")
    }
    g = yf.prototype;
    g.cd = function(a, b, c, d) {
        zf(this);
        this.l = a;
        this.h = b;
        this.v = d || 0;
        this.g = c || null
    };
    g.Ee = function(a) {
        zf(this);
        this.s(a)
    };
    g.bd = function() {
        zf(this);
        this.m()
    };
    g.Fe = function() {
        this.b && this.c && nf(this.b, this.c);
        this.u()
    };
    g.registerErrorCallback = function(a) {
        this.s = a
    };
    g.registerEndedCallback = function(a) {
        this.m = a
    };
    g.registerLoadCallback = function(a) {
        this.u = a
    };
    g.unregisterErrorCallback = function() {
        this.s = r
    };
    g.unregisterEndedCallback = function() {
        this.m = r
    };
    g.unregisterLoadCallback = function() {
        this.u = r
    };

    function Af(a) {
        var b = a.a.duration;
        if (isNaN(b) || null == a.g) return b;
        if (null != a.j) return a.j;
        a.j = 0 <= a.g ? Math.min(a.v + a.g, b) : Math.max(b + a.g, a.h);
        return a.j
    }

    function zf(a) {
        null != a.g && (Gc(a.a, "timeupdate", a.Ed, !1, a), a.j = null, a.g = null)
    }
    g.Ed = function() {
        Bf(this)
    };

    function Bf(a) {
        if (null == a.g) return !1;
        var b = Af(a);
        return isNaN(b) ? !1 : a.a.currentTime >= b ? (a.bd(), !0) : !1
    }
    g.load = function(a, b, c, d, e, f) {
        this.b && (this.b.$(), this.b = null);
        this.i = !1;
        d && d.tracks && this.a && (this.b && this.b.$(), this.b = new jf(this.a, d.tracks, d.activeTrackIds || [], d.textTrackStyle || null), d.language && qf(this.b, d.language));
        null != this.g && yc(this.a, "timeupdate", this.Ed, !1, this);
        e || (this.h = c && 0 < c ? c : 0, C(this.D, "Load - contentId: " + a + " autoplay: " + b + " time: " + this.h), this.a.autoplay = !1, a && (this.a.src = a), this.a.autoplay = b, this.a.load(), p(f) && (this.a.playbackRate = f))
    };
    g.reset = function() {
        this.i = !1;
        this.b && (this.b.$(), this.b = null);
        this.c = null;
        this.a.removeAttribute("src");
        this.h = 0;
        this.a.load();
        zf(this)
    };
    g.play = function() {
        this.i = !1;
        this.a.play()
    };
    g.seek = function(a, b) {
        this.a.currentTime != a && (this.a.currentTime = a);
        Bf(this) || ("PLAYBACK_START" == b && this.a.paused ? this.a.play() : "PLAYBACK_PAUSE" != b || this.a.paused || this.a.pause())
    };
    g.Vb = function(a) {
        return this.a.playbackRate = a
    };
    g.pause = function() {
        this.i = !0;
        this.a.pause()
    };
    g.getState = function() {
        null == this.l && (this.l = this.a.autoplay);
        return this.a.paused || isNaN(this.a.duration) ? this.a.duration && (this.a.currentTime || 0 == this.a.currentTime) && this.a.currentTime < Af(this) ? this.a.currentTime == this.h && this.l && !this.i ? "PLAYING" : "PAUSED" : "PLAYING" : "PLAYING"
    };
    g.getCurrentTimeSec = function() {
        var a = Af(this);
        return isNaN(a) ? this.a.currentTime : this.a.currentTime < a ? this.a.currentTime : a
    };
    g.getDurationSec = function() {
        return Af(this)
    };
    g.getVolume = function() {
        return {
            level: this.a.volume,
            muted: this.a.muted
        }
    };
    g.setVolume = function(a) {
        p(a.level) && (this.a.volume = a.level);
        p(a.muted) && (this.a.muted = a.muted)
    };
    g.editTracksInfo = function(a) {
        this.b && (a.textTrackStyle && this.b.qa(a.textTrackStyle), a.language ? qf(this.b, a.language) : a.activeTrackIds && nf(this.b, a.activeTrackIds));
        Cf(this, a.activeTrackIds);
        return this.c
    };

    function Cf(a, b) {
        a.c = b ? b.slice(0) : a.c;
        a.c = a.c || [];
        if (a.b) {
            var c = pf(a.b);
            a.c = a.c.filter(function(a) {
                return !c.includes(a)
            }).concat(rf(a.b))
        }
        0 == a.c.length && (a.c = null)
    };
    cast.receiver.eme = {};
    cast.receiver.eme.qh = new Uint8Array([43, 248, 102, 128, 198, 229, 78, 36, 190, 35, 15, 129, 90, 96, 110, 178]);
    cast.receiver.eme.vh = 2;
    cast.receiver.ta = w("cast");
    cast.receiver.ta.g = function(a) {
        if (cast.receiver.ta) {
            var b = cast.receiver.ta;
            a: {
                if (!ac) {
                    ac = {};
                    for (var c = 0, d; d = $b[c]; c++) ac[d.value] = d, ac[d.name] = d
                }
                if (a in ac) a = ac[a];
                else {
                    for (c = 0; c < $b.length; ++c)
                        if (d = $b[c], d.value <= a) {
                            a = d;
                            break a
                        }
                    a = null
                }
            }
            b.xb = a
        }
    };
    if (cast.receiver.ta) {
        var Df = cast.Lc ? 800 : 1E3,
            Ef = parseInt(cast.receiver.platform.rd("log-level-cast-receiver"), 10);
        cast.receiver.ta.g(Ef || Df)
    };

    function Ff(a) {
        this.itemId = a;
        this.customData = this.activeTrackIds = this.preloadTime = this.playbackDuration = this.startTime = this.autoplay = this.media = void 0
    }

    function Gf(a, b) {
        var c = new Ff(a.itemId);
        c.autoplay = a.autoplay;
        c.startTime = a.startTime;
        c.playbackDuration = a.playbackDuration;
        c.preloadTime = a.preloadTime;
        c.activeTrackIds = a.activeTrackIds;
        c.customData = a.customData;
        if (void 0 === b || b) c.media = a.media;
        return c
    }

    function Hf(a) {
        this.a = void 0;
        this.g = "REPEAT_OFF";
        this.j = this.b = 0;
        this.l = this.c = void 0;
        this.i = a;
        this.h = 1
    }
    g = Hf.prototype;
    g.Cc = function(a) {
        this.c = a
    };

    function If(a, b) {
        if (a.c) return Promise.resolve(a.c.initialize(b)).then(function(c) {
            c ? Jf(a, c, !0, !0) : Kf(a, b)
        });
        Kf(a, b)
    }

    function Kf(a, b) {
        var c = b.queueData;
        c && c.items ? Jf(a, c) : (c = new Ff(a.i()), c.media = b.media, c.autoplay = b.autoplay, c.activeTrackIds = b.activeTrackIds, c.customData = b.customData, a.a = [c])
    }

    function Jf(a, b, c, d) {
        d = void 0 === d ? !1 : d;
        Lf(a, b, void 0 === c ? !1 : c) || B(Mf, "The passed in queueData is not completely valid: " + b);
        a.l = b;
        d && b.items && Nf(b.items);
        a.a = b.items;
        a.g = b.repeatMode || a.g;
        a.b = b.startIndex || 0;
        a.j = b.startTime || 0
    }

    function Nf(a) {
        a = k(a);
        for (var b = a.next(); !b.done; b = a.next()) b = b.value, b.preloadTime = null != b.preloadTime ? b.preloadTime : 0
    }
    g.fetchItems = function(a, b, c, d) {
        var e = this,
            f = void 0,
            h = Of(this, b);
        this.c ? 0 < c && 0 < d ? f = "Queue operations only support expanding the front or back." : 0 > h && (f = "Reference item id is not in current queue.") : f = "Fetch items is only supported with an external queue.";
        if (f) return B(Mf, f), Promise.reject(f);
        0 < c ? (f = this.a.length - 1, c -= f - h, b = this.a[f].itemId) : 0 < d && (d -= h, b = this.a[0].itemId);
        var l = new ie;
        l.requestId = a;
        return 0 >= c && 0 >= d ? (l.changeType = "NO_CHANGE", l.sequenceNumber = this.h - 1, Promise.resolve(l)) : Promise.resolve(this.c.fetchItems(b,
            c, d)).then(function(a) {
            if (a && 0 != a.length) {
                var d = 0 < c ? void 0 : b;
                Pf(e, a, d);
                l.changeType = "INSERT";
                l.itemIds = a.map(function(a) {
                    return a.itemId
                });
                l.insertBefore = d;
                l.sequenceNumber = e.h++
            } else l.changeType = "NO_CHANGE", l.sequenceNumber = e.h - 1;
            return l
        })
    };

    function Qf(a, b, c) {
        var d = new je;
        d.requestId = b;
        d.items = [];
        if (a.a)
            for (b = k(c), c = b.next(); !c.done; c = b.next()) {
                c = c.value;
                for (var e = k(a.a), f = e.next(); !f.done; f = e.next())
                    if (f = f.value, f.itemId == c) {
                        d.items.push(f);
                        break
                    }
                B(Mf, "Unknown item id: " + c)
            }
        return d
    }

    function Rf(a, b) {
        var c = new ke;
        c.requestId = b;
        c.itemIds = a.Ka().map(function(a) {
            return a.itemId
        });
        return c
    }

    function Sf(a, b) {
        return new Promise(function(c, d) {
            var e = void 0,
                f = a.b + b;
            0 <= f && f < a.a.length ? (e = new ie, e.changeType = "NO_CHANGE", c(e)) : (f = 0 > a.b ? void 0 : a.a[a.b].itemId, 1 == b ? e = a.c.nextItems.bind(a.c, f) : -1 == b ? e = a.c.prevItems.bind(a.c, f) : 1 < b ? e = a.c.fetchItems.bind(a.c, f, b, 0) : -1 > b ? e = a.c.fetchItems.bind(a.c, f, 0, -b) : d("Should not be requesting more items on the current item"), Promise.resolve(e()).then(function(d) {
                Nf(d);
                var e = new ie;
                if (0 < d.length) {
                    C(Mf, "Fetched more items " + d);
                    var f = 0 <= b ? void 0 : a.a[0].itemId;
                    Pf(a, d, f);
                    e.changeType = "INSERT";
                    e.itemIds = d.map(function(a) {
                        return a.itemId
                    });
                    e.insertBefore = f;
                    e.sequenceNumber = a.h++
                } else e.changeType = "NO_CHANGE", e.sequenceNumber = a.h - 1;
                c(e)
            }, function() {
                return d("Failed to get more items from the queue.")
            }))
        })
    }

    function Tf(a) {
        a.a = void 0;
        a.g = "REPEAT_OFF";
        a.b = 0;
        a.j = 0
    }
    g.Ka = function(a, b) {
        a = void 0 === a ? !0 : a;
        b = void 0 === b ? !1 : b;
        var c = [],
            d = this.a.length;
        d = b && this.b < d - 1 ? this.b + 1 : d - 1;
        for (b = b && 0 < this.b ? this.b - 1 : 0; b <= d; b++) c.push(a ? this.a[b] : Gf(this.a[b], a));
        return c
    };
    g.pa = function() {
        return !this.a || 0 > this.b ? null : this.a[this.b]
    };
    g.qb = function() {
        return this.b
    };
    g.Gc = function(a) {
        for (var b = 0; b < a.length; b++)
            for (var c = 0; c < this.a.length; c++) a[b].itemId == this.a[c].itemId && (this.a[c] = a[b])
    };

    function Uf(a, b) {
        for (var c = [], d = 0; d < b.length; d++)
            for (var e = 0; e < a.a.length; e++)
                if (b[d] == a.a[e].itemId) {
                    c.push(b[d]);
                    break
                }
        return c
    }

    function Vf(a) {
        return "REPEAT_ALL_AND_SHUFFLE" == a.g
    }

    function Of(a, b) {
        for (var c = 0; c < a.a.length; c++)
            if (b == a.a[c].itemId) return c;
        return -1
    }

    function Wf(a) {
        return "REPEAT_ALL_AND_SHUFFLE" == a.g || "REPEAT_ALL" == a.g
    }
    g.reset = function() {
        this.b = -1
    };

    function Xf(a, b) {
        b = Of(a, b);
        if (-1 == b || a.b == b) return !1;
        Yf(a, b);
        return !0
    }
    g.oc = function(a, b, c) {
        Pf(this, a, b, c)
    };

    function Pf(a, b, c, d) {
        for (var e = k(b), f = e.next(); !f.done; f = e.next()) f = f.value, q(f.itemId) || (f.itemId = a.i());
        e = q(c) ? Of(a, c) : a.a.length;
        e = -1 == e ? a.a.length : e;
        Ea(Ua, a.a, e, 0).apply(null, b);
        p(d) ? a.b = e + d : a.b >= e && (a.b += b.length);
        if (a.c) a.c.onItemsInserted(b, c)
    }
    g.wc = function(a) {
        for (var b = !1, c = 0; c < a.length; c++)
            for (var d = 0; d < this.a.length; d++)
                if (a[c] == this.a[d].itemId) {
                    this.a.splice(d, 1);
                    this.b == d ? b = !0 : this.b > d && this.b--;
                    break
                }
        this.b >= this.a.length && (this.b = Wf(this) ? 0 : -1, Vf(this) && 0 == this.b && Zf(this));
        if (this.c) this.c.onItemsRemoved(a);
        return b
    };

    function $f(a, b) {
        return a.c ? (b && B(Mf, b + " not supported when external queue is provided."), !0) : !1
    }

    function ag(a, b, c) {
        if (0 > a.b) return "QUEUE_ENDED";
        b = a.b + b;
        var d = !1;
        b >= a.a.length ? (b = Wf(a) ? b % a.a.length : -1, d = !0) : 0 > b && (b = Wf(a) ? a.a.length + (b + 1) % a.a.length - 1 : 0, d = !0);
        c && Yf(a, b);
        return -1 == b ? "QUEUE_ENDED" : d ? Vf(a) ? (Zf(a), "QUEUE_SHUFFLED") : "QUEUE_LOOP" : "QUEUE_ACTIVE"
    }
    g.shuffle = function() {
        var a = this;
        if (this.c) return Promise.resolve(this.c.shuffle()).then(function(b) {
            b && (a.a = b)
        });
        Zf(this);
        return Promise.resolve()
    };

    function Zf(a) {
        var b = a.a.length;
        if (!(3 > a.a.length))
            for (; 0 < b;) {
                var c = Math.floor(Math.random() * b);
                --b;
                var d = a.a[c];
                a.a[c] = a.a[b];
                a.a[b] = d
            }
    }

    function Lf(a, b, c) {
        c = void 0 === c ? !1 : c;
        if (p(b.startIndex) && (!q(b.startIndex) || 0 > b.startIndex)) return A(Mf, "Invalid startIndex " + b.startIndex), !1;
        var d = (b.startIndex || 0) + 1;
        if (!b.items || b.items.length < d) return A(Mf, "Invalid number of items"), !1;
        if (b.repeatMode && !cast.receiver.media.zd(b.repeatMode)) return A(Mf, "Invalid repeatMode"), !1;
        for (d = 0; d < b.items.length; d++)
            if (b.items[d].media) {
                if (!c && p(b.items[d].itemId)) return A(Mf, "ItemId should not be defined, element at index: " + d), !1;
                b.items[d].itemId = q(b.items[d].itemId) ?
                    b.items[d].itemId : a.i()
            } else return A(Mf, "Media is mandatory, missing in element at index: " + d), !1;
        return !0
    }

    function Yf(a, b) {
        a.b = b;
        if (a.c && 0 <= b && b < a.a.length) a.c.onCurrentItemIdChanged(a.a[b].itemId)
    }

    function bg(a) {
        return a.c && a.a && 0 < a.a.length && a.b == a.a.length - 1 ? Sf(a, 1) : Promise.reject("No need to prefetch more for now.")
    }
    var Mf = w("cast.receiver.MediaQueue");

    function cg(a) {
        var b = this;
        this.c = a;
        this.a = null;
        this.b = "sdr";
        this.g = function() {
            b.c()
        }
    }

    function dg(a) {
        return a.a ? a.a.videoWidth : 0
    }

    function eg(a) {
        return a.a ? a.a.videoHeight : 0
    };

    function fg(a, b, c) {
        var d = this,
            e = se.ga();
        Pe.ga();
        this.N = c || "local";
        this.h = te(e, cast.receiver.media.na, "JSON");
        this.l = 0;
        this.L = this.s = null;
        this.u = 1;
        this.xf = b || 15;
        this.fd = this.Pc = this.C = this.m = this.b = this.c = null;
        this.i = !1;
        this.j = this.g = null;
        this.R = !0;
        this.J = null;
        this.Ha = this.Ke.bind(this);
        this.a = new Hf(this.md.bind(this));
        this.G = !1;
        this.v = null;
        this.wf = 1;
        this.wa = -1;
        this.W = new Qd;
        this.F = !1;
        this.w = [];
        this.ic = this.Se;
        this.ac = null;
        this.Pa = this.cf;
        this.Gb = this.gf;
        this.Wc = this.ff;
        this.Mb = this.nf;
        this.Va = null;
        this.Nb = this.pf;
        this.Fb = this.ef;
        this.Pb = this.sf;
        this.Ob = this.qf;
        this.Db = this.Ve;
        this.Cb = this.Ue;
        this.Jb = this.kf;
        this.Ib = this.jf;
        this.Ua = this.gd;
        this.Kb = this.lf;
        this.Lb = this.mf;
        this.rc = this.df;
        this.Uc = this.bf;
        this.cc = this.We;
        this.ja = this.hf;
        this.Qc = r;
        this.Nc = this.Xe;
        this.ea = this.Qa = r;
        this.Ta = this.Sa = null;
        this.Rc = this.Ye;
        this.Sc = this.Ze;
        this.Hc = this.$e;
        this.Xc = this.rf;
        this.gc = this.Oa = null;
        this.Eb = this.af;
        this.P = new cg(this.B.bind(this, !1));
        e.J = function(a) {
            var b = d.P;
            b.b = a;
            b.c()
        };
        this.$b = new Lc;
        this.Oc =
            this.Rd = this.M = !1;
        this.$a(a);
        this.h.c = this.qc.bind(this);
        this.J = sd(this.Ha, 1E3)
    }
    g = fg.prototype;
    g.md = function() {
        return this.wf++
    };
    g.ub = function() {
        return this.b ? this.b.media || null : null
    };

    function gg(a) {
        return p(a.a.a) ? a.a : null
    }
    g.Ac = function(a, b, c) {
        b = !p(b) || b;
        if (c && !b) throw Error("No broadcast call but status customData has been provided");
        this.b && (this.b.media = a);
        b && this.B(!0, null, c)
    };

    function hg(a) {
        for (var b = 0; b < a.length; b++)
            if (!p(a[b].trackId) || !p(a[b].type)) return !1;
        return !0
    }

    function ig(a, b) {
        if (!b) return !0;
        if (!a) return !1;
        a = k(a);
        for (var c = a.next(); !c.done; c = a.next())
            if (c = c.value, "TEXT" == c.type && p(c.language) && cast.receiver.Aa(c.language, b)) return !0;
        return !1
    }

    function jg(a, b) {
        if (!b) return !0;
        if (!a) return !1;
        a = k(a);
        for (var c = a.next(); !c.done; c = a.next())
            if (c = c.value, "AUDIO" == c.type && p(c.language) && cast.receiver.Aa(c.language, b)) return !0;
        return !1
    }

    function kg(a, b) {
        if (!b || 0 == b.length) return !0;
        if (!a || b.length > a.length) return A(F, "Too many track IDs"), !1;
        for (var c = 0, d = 0, e = 0; e < b.length; e++) {
            for (var f = !1, h = 0; h < a.length; h++)
                if (b[e] == a[h].trackId) {
                    f = !0;
                    break
                }
            if (!f) return A(F, "Track ID does not exist: " + b[e]), !1;
            "AUDIO" == a[h].type ? d++ : "VIDEO" == a[h].type && c++;
            if (1 < d || 1 < c) return A(F, "Maximum one active video and one active audio track supported"), !1
        }
        return !0
    }
    g.ia = function(a) {
        lg(this, this.N, a)
    };

    function lg(a, b, c) {
        c.mediaSessionId = a.l;
        a.qc(new qe("message", b, c))
    }
    g.qc = function(a) {
        var b = a.data,
            c = b.type;
        if (!this.F || Sd(this.W) && "LOAD" == c) {
            a = a.senderId;
            var d = b.type;
            var e = b.requestId;
            if (q(e) && e == Math.floor(e)) {
                var f = !1;
                void 0 != b.mediaSessionId && b.mediaSessionId != this.l ? (A(F, "Invalid media session ID: " + b.mediaSessionId + "  does not match the expected ID: " + this.l), f = !0) : "LOAD" != d && "PLAY_AGAIN" != d && "GET_STATUS" != d && "QUEUE_LOAD" != d && "PRECACHE" != d && (p(b.mediaSessionId) ? "PLAYING" == mg(this) && (A(F, "Unexpected command, player is in PLAYING state so the media session ID is not valid yet"), f = !0) : (A(F, "Invalid media session ID, it is undefined"), f = !0));
                f ? (this.Z(a, e, "INVALID_REQUEST", "INVALID_MEDIA_SESSION_ID"), d = !1) : (Pc(F, Zb, "MediaManager message received"), d = !0)
            } else A(F, "Ignoring request, requestId is not an integer: " + e), d = !1;
            if (d) {
                d = b.requestId;
                delete b.type;
                e = null;
                switch (c) {
                    case "LOAD":
                        this.G = !1;
                        e = ng(this, a, b, !0);
                        break;
                    case "GET_STATUS":
                        C(F, "Dispatching MediaManager getStatus event");
                        b = new G("getstatus", b, a);
                        this.Eb && this.Eb(b);
                        H(this, b);
                        e = null;
                        break;
                    case "PLAY":
                        C(F, "Dispatching MediaManager play event");
                        b = new G("play", b, a);
                        this.Gb && this.Gb(b);
                        H(this, b);
                        e = null;
                        break;
                    case "PLAY_AGAIN":
                        C(F, "Dispatching MediaManager play again event");
                        b = new G("playagain", b, a);
                        this.Wc && this.Wc(b);
                        H(this, b);
                        e = null;
                        break;
                    case "SEEK":
                        p(b.currentTime) || p(b.relativeTime) ? (C(F, "Dispatching MediaManager seek event"), b = new G("seek", b, a), this.Mb && this.Mb(b), H(this, b), e = null) : (A(F, "currentTime or relativeTime is required"), e = {
                            type: "INVALID_REQUEST",
                            reason: "INVALID_PARAMS"
                        });
                        break;
                    case "SET_PLAYBACK_RATE":
                        (e = b.playbackRate) || (e =
                            b.relativePlaybackRate * this.u);
                        !q(e) || .5 > e || 2 < e ? (A(F, "Bad value for playback rate " + e), e = {
                            type: "INVALID_REQUEST",
                            reason: "INVALID_PARAMS"
                        }) : (C(F, "Dispatching MediaManager playback rate event"), b = new G("setplaybackrate", b, a), this.Nb && this.Nb(b), H(this, b), e = null);
                        break;
                    case "STOP":
                        C(F, "Dispatching MediaManager stop event");
                        b = new G("stop", b, a);
                        this.Pb && this.Pb(b);
                        H(this, b);
                        e = null;
                        break;
                    case "PAUSE":
                        C(F, "Dispatching MediaManager pause event");
                        b = new G("pause", b, a);
                        this.Fb && this.Fb(b);
                        H(this, b);
                        e = null;
                        break;
                    case "SKIP_AD":
                        C(F, "Dispatching MediaManager skip ad event");
                        e = new G("skipad", b, a);
                        this.Va ? this.Va(e) : this.Z(a, b.requestId, "INVALID_REQUEST", "NOT_SUPPORTED");
                        H(this, e);
                        e = null;
                        break;
                    case "SET_VOLUME":
                        b.volume && (p(b.volume.level) || p(b.volume.muted)) ? void 0 != b.volume.level && 0 > b.volume.level || 1 < b.volume.level ? (A(F, "volume level is invalid"), e = {
                                type: "INVALID_REQUEST",
                                reason: "INVALID_PARAMS"
                            }) : (C(F, "Dispatching MediaManager setvolume event"), b = new G("setvolume", b, a), this.Ob && this.Ob(b), H(this, b), e = null) :
                            (A(F, "volume is invalid"), e = {
                                type: "INVALID_REQUEST",
                                reason: "INVALID_PARAMS"
                            });
                        break;
                    case "EDIT_TRACKS_INFO":
                        C(F, "Dispatching MediaManager editTracksInfo event");
                        kg(this.b.media.tracks, b.activeTrackIds) ? (e = new G("edittracksinfo", b, a), b.textTrackStyle && (this.b.media.textTrackStyle = b.textTrackStyle), b.activeTrackIds && (this.b.activeTrackIds = b.activeTrackIds), this.Db && this.Db(e), H(this, e), e = null) : (A(F, "Invalid track info"), e = {
                            type: "INVALID_REQUEST",
                            reason: "INVALID_PARAMS"
                        });
                        break;
                    case "EDIT_AUDIO_TRACKS":
                        C(F,
                            "Dispatching MediaManager editAudioTracks event");
                        b = new G("editaudiotracks", b, a);
                        this.Cb && this.Cb(b);
                        H(this, b);
                        e = null;
                        break;
                    case "QUEUE_LOAD":
                        this.G = !0;
                        C(F, "Dispatching MediaManager queueLoad event");
                        Lf(this.a, b) ? (b.items = og(b.items), b = new G("queueload", b, a), this.Jb && this.Jb(b), H(this, b), e = null) : e = {
                            type: "INVALID_REQUEST",
                            reason: "INVALID_PARAMS"
                        };
                        break;
                    case "QUEUE_INSERT":
                        this.G = !0;
                        C(F, "Dispatching MediaManager queueInsert event");
                        e = !1;
                        if (p(this.a.a))
                            if (b.items && 0 != b.items.length)
                                if (p(b.currentItemId) &&
                                    p(b.currentItemIndex)) A(F, "Maximum one currentItem must be provided"), e = !0;
                                else if (p(b.currentItemIndex) && (!q(b.currentItemIndex) || 0 > b.currentItemIndex || b.currentItemIndex >= b.items.length)) A(F, "Invalid currentItemIndex"), e = !0;
                        else if (p(b.currentItemId) && (!q(b.currentItemId) || 0 > b.currentItemId)) A(F, "Invalid currentItemId"), e = !0;
                        else
                            for (c = 0; c < b.items.length; c++)
                                if (q(b.items[c].itemId)) {
                                    A(F, "Item contains an itemId at index: " + c);
                                    e = !0;
                                    break
                                } else b.items[c].itemId = this.md();
                        else A(F, "No items to insert"),
                            e = !0;
                        else A(F, "Queue does not exist"), e = !0;
                        e ? e = {
                            type: "INVALID_REQUEST",
                            reason: "INVALID_PARAMS"
                        } : (b.items = og(b.items), b = new G("queueinsert", b, a), this.Ib && this.Ib(b), H(this, b), e = null);
                        break;
                    case "QUEUE_UPDATE":
                        e = pg(this, a, b);
                        break;
                    case "QUEUE_REMOVE":
                        C(F, "Dispatching MediaManager queueRemove event");
                        e = !1;
                        p(this.a.a) ? b.itemIds && 0 != b.itemIds.length ? qg(b.itemIds) || (e = !0) : (A(F, "No itemIds to remove"), e = !0) : (A(F, "Queue does not exist"), e = !0);
                        e ? e = {
                            type: "INVALID_REQUEST",
                            reason: "INVALID_PARAMS"
                        } : (b.itemIds &&
                            (b.itemIds = Uf(this.a, b.itemIds)), b = new G("queueremove", b, a), this.Kb && this.Kb(b), H(this, b), e = null);
                        break;
                    case "QUEUE_REORDER":
                        C(F, "Dispatching MediaManager queueReorder event");
                        e = !1;
                        p(this.a.a) ? b.itemIds && 0 != b.itemIds.length ? qg(b.itemIds) ? p(b.insertBefore) && 0 <= Ta(b.itemIds, b.insertBefore) && (A(F, "insertBefore can not be one of the reordered items"), e = !0) : e = !0 : (A(F, "No itemIds to reorder"), e = !0) : (A(F, "Queue does not exist"), e = !0);
                        e ? e = {
                            type: "INVALID_REQUEST",
                            reason: "INVALID_PARAMS"
                        } : (b.itemIds && (b.itemIds =
                            Uf(this.a, b.itemIds)), b = new G("queuereorder", b, a), this.Lb && this.Lb(b), H(this, b), e = null);
                        break;
                    case "PRECACHE":
                        b = new G("precache", b, "__broadcast__");
                        this.Sa && this.Sa(b);
                        H(this, b);
                        break;
                    case "QUEUE_NEXT":
                        c = new rg;
                        c.jump = 1;
                        c.requestId = b.requestId;
                        pg(this, a, c);
                        break;
                    case "QUEUE_PREV":
                        c = new rg;
                        c.jump = -1;
                        c.requestId = b.requestId;
                        pg(this, a, c);
                        break;
                    case "QUEUE_GET_ITEM_RANGE":
                        b = new G("getitemsrange", b, a);
                        this.Rc && this.Rc(b);
                        H(this, b);
                        break;
                    case "QUEUE_GET_ITEMS":
                        b = new G("getitemsinfo", b, a);
                        this.Sc && this.Sc(b);
                        H(this, b);
                        break;
                    case "QUEUE_GET_ITEM_IDS":
                        b = new G("getqueueids", b, a);
                        this.Hc && this.Hc(b);
                        H(this, b);
                        break;
                    case "QUEUE_SHUFFLE":
                        b = new G("shuffle", b, a);
                        this.Xc && this.Xc(b);
                        H(this, b);
                        break;
                    default:
                        A(F, "Unexpected message type: " + c), e = {
                            type: "INVALID_REQUEST",
                            reason: "INVALID_COMMAND"
                        }
                }
                sg(this, e, a, d)
            }
        } else this.W.b.push(a)
    };

    function sg(a, b, c, d) {
        b && (A(F, "Sending error: " + b.type + " " + b.reason), a.Qa && c == a.N ? (b.requestId = d, a.Qa(b)) : a.Z(c, d, b.type, b.reason))
    }

    function mg(a) {
        if (!a.b) return "PLAYING";
        var b = a.c.getState();
        return "PLAYING" == b && a.i ? "PLAYING" : b
    }

    function tg(a, b, c, d) {
        var e = {
                type: "MEDIA_STATUS"
            },
            f = a.g && a.g.message.media || null;
        if (!a.b && !a.m && !f) return e.status = [], e;
        var h = {
            mediaSessionId: a.l,
            playbackRate: a.u,
            playerState: mg(a),
            currentTime: a.c.getCurrentTimeSec(),
            supportedMediaCommands: a.xf,
            volume: a.c.getVolume()
        };
        a.v && (h.preloadedItemId = a.v);
        var l = dg(a.P),
            v = eg(a.P);
        0 < l && 0 < v && (h.videoInfo = new ee(l, v, a.P.b));
        if (a.b) h.activeTrackIds = a.b.activeTrackIds, b && (h.media = a.ub() || void 0, l = a.a.l) && (h.queueData = gb(l), h.queueData.items = void 0), h.currentItemId =
            a.b.itemId;
        else if (a.m && (b && (h.media = a.m.media || void 0), h.currentItemId = a.m.itemId, a.m = null), p(a.a.a) && (l = a.a.pa())) h.loadingItemId = l.itemId;
        "PLAYING" == h.playerState ? (a.j && (h.idleReason = a.j), f && (h.extendedStatus = new fe(f))) : a.j = null;
        void 0 != c && (h.customData = c);
        p(a.a.a) && (d && (h.items = a.a.Ka(b, a.M)), h.repeatMode = a.a.g);
        if (a.ic) return b = function(a) {
            a ? e.status = [a] : e = null;
            return e
        }, c = a.ic(h), a.Oc = !!h.breakStatus, ug(c) ? c.then(b) : b(c);
        e.status = [h];
        return e
    }

    function vg(a) {
        null != a.L && (n.clearTimeout(a.L), a.L = null)
    }

    function wg(a) {
        var b = a.c.getCurrentTimeSec();
        a.C = b;
        a.Pc = b;
        a.fd = Date.now();
        null != a.J && n.clearTimeout(a.J);
        a.J = sd(a.Ha, 1E3)
    }
    g.Ke = function() {
        this.J = sd(this.Ha, 1E3);
        var a = mg(this);
        if ("PLAYING" != a && "PAUSED" != a) {
            this.F && "PLAYING" == a && this.dd();
            a = this.C;
            this.C = this.c.getCurrentTimeSec();
            var b = this.i;
            this.i = this.Rd ? "PLAYING" === this.c.getState() : 100 > 1E3 * (this.C - a);
            b != this.i ? (Pc(F, Zb, "Buffering state changed, isPlayerBuffering: " + this.i + " old time: " + a + " current time: " + this.C), this.B(!1)) : this.i || this.Oc || (a = 1E3 * (this.C - this.Pc) - this.u * (Date.now() - this.fd), 1E3 < a || -1E3 > a ? (Pc(F, Zb, "Time drifted: " + a), this.B(!1)) : this.b && p(this.a.a) &&
                (a = this.a, (a = 0 > a.b ? null : "REPEAT_SINGLE" == a.g ? a.a[a.b] : a.b + 1 >= a.a.length && (Vf(a) || "REPEAT_OFF" == a.g) ? null : a.a[(a.b + 1) % a.a.length]) && q(a.preloadTime) && this.b.media && !this.g && xg(this, a.preloadTime) && this.v != a.itemId && (this.Ta ? (b = new yg(a.itemId), b.requestId = 0, b.mediaSessionId = this.l, b.autoplay = a.autoplay, b.currentTime = a.startTime, b.customData = a.customData || void 0, b.activeTrackIds = a.activeTrackIds, b.media = a.media, b = new G("preload", b, ""), this.v = a.itemId, C(F, "Sending preload event: " + JSON.stringify(b)),
                    this.Ta(b) && this.B(!1)) : C(F, "Not sending preload event"))))
        }
    };
    g.B = function(a, b, c, d) {
        var e = this;
        if (this.c) {
            Pc(F, Zb, "Sending broadcast status message");
            var f = function(a) {
                null != a && (e.ea && a.status && e.ea(a.status[0] || null), a.requestId = b || 0, e.h.send("*:*", a), wg(e), zg(e, a))
            };
            a = tg(this, a, c, d);
            ug(a) ? a.then(f) : f(a)
        } else A(F, "Not sending broadcast status message, state is invalid")
    };
    g.zc = function(a) {
        Pc(F, Zb, "Setting PLAYING reason: " + a);
        this.j = a
    };
    g.Z = function(a, b, c, d, e) {
        C(F, "Sending error message to " + a);
        var f = {};
        f.requestId = b;
        f.type = c;
        d && (f.reason = d);
        e && (f.customData = e);
        this.gc && this.gc(f);
        this.h.send(a, f)
    };
    g.Tb = function(a, b, c, d, e) {
        var f = this;
        if (this.c) {
            Pc(F, Zb, "Sending status message to " + a);
            var h = function(c) {
                null != c && (f.ea && c.status && f.ea(c.status[0] || null), c.requestId = b, f.h.send(a, c), wg(f))
            };
            c = tg(this, c, d, e);
            ug(c) ? c.then(h) : h(c)
        } else A(F, "State is invalid"), this.Z(a, b, "INVALID_PLAYER_STATE", null, d)
    };

    function zg(a, b) {
        if (a.ac) {
            b = hb(b);
            b.type = "CLOUD_STATUS";
            try {
                b = a.ac(b)
            } catch (c) {
                A(F, "Cloud status handler failed. " + c);
                return
            }
            ug(b) ? b.then(function(b) {
                a.h.send("__cloud__", b)
            }) : a.h.send("__cloud__", b)
        }
    }
    g.Se = function(a) {
        return a
    };

    function Ag(a) {
        a.g = null;
        if (a.F)
            for (a.F = !1; !Sd(a.W) && !a.F;) a.qc(Rd(a.W))
    }
    g.load = function(a) {
        a.type = "LOAD";
        lg(this, this.N, a)
    };

    function ng(a, b, c, d, e) {
        C(F, "Dispatching MediaManager load event");
        C(F, "Load message received:" + JSON.stringify(c));
        var f = !1,
            h = e;
        c.media ? c.media.tracks && !hg(c.media.tracks) ? (A(F, "Invalid tracks information"), f = !0) : c.activeTrackIds && !kg(c.media.tracks, c.activeTrackIds) && (f = !0) : (A(F, "Media is mandatory"), f = !0);
        e = c.playbackRate;
        if (p(e) && (!q(e) || .5 > e || 2 < e)) return A(F, "Bad value for playback rate " + e), {
            type: "INVALID_REQUEST",
            reason: "INVALID_PARAMS"
        };
        if (f) return h && h(), {
            type: "INVALID_REQUEST",
            reason: "INVALID_PARAMS"
        };
        a.g ? Bg(a, "LOAD_CANCELLED") : a.b && (Cg(a, "INTERRUPTED", !1), h = a.B.bind(a, !0));
        a.g = {
            senderId: b,
            message: c
        };
        h && h();
        a.F = !0;
        if (d && (a.l++, a.j = null, a.G = p(c.queueData), d = If(a.a, c), ug(d))) return d.then(function() {
            a.G = !0;
            var d = a.a.pa();
            d && d.media && d.media.contentId != c.media.contentId && (C(F, "Implementation of queueing has provided " + d.media.contentId + " as the first item whilethe original media portion of the LOAD provided " + c.media.contentId), c.media = d.media, c.autoplay = c.autoplay || d.autoplay, c.currentTime = c.currentTime ||
                d.startTime || a.a.j);
            Dg(a, b, c, h)
        }, function() {
            Bg(a, "LOAD_FAILED")
        }), null;
        Dg(a, b, c, h);
        return null
    }

    function Dg(a, b, c, d) {
        a.b = hb(a.a.pa());
        a.w = [];
        c.media = a.b.media || c.media;
        a.b.activeTrackIds = c.activeTrackIds;
        vg(a);
        a.s = c;
        if (a.R && a.c.cd) {
            var e = a.a.j;
            a.c.cd(p(c.autoplay) ? c.autoplay : !0, 0 < c.currentTime ? c.currentTime : 0 < e ? e : 0, a.b.playbackDuration, a.b.startTime)
        }
        e = new G("load", c, b);
        a.Pa && (a.u = c.playbackRate ? c.playbackRate : 1, a.Pa(e));
        H(a, e);
        d || a.B(!0);
        a.v = null;
        bg(a.a).then(function(d) {
            Eg(a, d, b, c)
        }, function(a) {
            C(F, a)
        })
    }
    g.cf = function(a) {
        a = a.data;
        if (a.media && (a.media.contentUrl || a.media.contentId)) {
            var b = p(a.autoplay) ? a.autoplay : !0,
                c = a.media.contentUrl || a.media.contentId;
            a.media.tracks ? this.c.load(c, b, a.currentTime, {
                tracks: a.media.tracks,
                activeTrackIds: a.activeTrackIds,
                textTrackStyle: a.media.textTrackStyle
            }, void 0, a.playbackRate) : this.c.load(c, b, a.currentTime, void 0, void 0, a.playbackRate)
        }
    };

    function Fg(a, b, c) {
        c = void 0 === c ? !0 : c;
        a.b && a.b.media && (a.b.activeTrackIds = b.activeTrackIds, c && (a.b.media.tracks = b.tracks, a.b.media.textTrackStyle = b.textTrackStyle), a.g || a.B(c))
    }
    g.$a = function(a) {
        if (a != this.c) {
            this.c && (this.c.unregisterErrorCallback(), this.c.unregisterEndedCallback(), this.c.unregisterLoadCallback());
            (this.R = a.getState ? !1 : !0) ? this.c = new yf(F, a): this.c = a;
            this.c.registerErrorCallback(this.Me.bind(this));
            this.c.registerEndedCallback(this.Le.bind(this));
            this.c.registerLoadCallback(this.dd.bind(this));
            var b = this.P;
            b.a && b.a.removeEventListener("resize", b.g);
            var c = null;
            a.tagName && "video" == a.tagName.toLowerCase() ? c = a : (a = document.getElementsByTagName("video"), 1 == a.length &&
                (c = a[0]));
            b.a = c;
            b.a && b.a.addEventListener("resize", b.g)
        }
    };
    g.Cc = function(a) {
        this.a.Cc(a)
    };
    g.dd = function() {
        if (this.g) {
            C(F, "Metadata loaded");
            if (this.b && this.b.media) {
                var a = this.c.getDurationSec();
                this.b.media.duration = a;
                this.a.pa().media.duration = a
            }
            this.i = !0;
            this.rc ? this.rc(this.g) : Ag(this)
        }
    };
    g.df = function(a) {
        this.R && a.message && void 0 != a.message.currentTime && a.message.currentTime != this.c.getCurrentTimeSec() && this.c.seek(a.message.currentTime);
        Gg(this)
    };
    g.Me = function(a) {
        this.g ? (A(F, "Load metadata error: " + a), this.Uc ? this.Uc(this.g) : Ag(this)) : this.Nc && this.Nc(a)
    };

    function Bg(a, b) {
        a.g ? (b = b || "LOAD_FAILED", a.g.senderId == a.N ? a.Qa && a.Qa({
            type: b
        }) : a.Z(a.g.senderId, a.g.message.requestId, b, null, void 0), Ag(a)) : A(F, "Not sending LOAD error as there is no on going LOAD request")
    }

    function Gg(a) {
        if (a.g) {
            var b = a.g.message.requestId;
            a.B(!0, b, void 0, 0 != b || a.M);
            Ag(a)
        } else A(F, "Not sending status as there is no on going LOAD request")
    }
    g.Xe = function() {
        Hg(this)
    };

    function Hg(a, b, c) {
        b = void 0 === b ? !1 : b;
        c = void 0 === c ? !1 : c;
        var d = a.a.qb();
        p(a.a.a) && -1 != d && d < a.a.a.length - 1 ? a.cc("ERROR") : (Cg(a, "ERROR", b), c && Bg(a, "LOAD_FAILED"))
    }
    g.bf = function() {
        this.g && "" == this.g.senderId && this.g.message && 0 == this.g.message.requestId ? Hg(this, !0) : Hg(this, !1, !0)
    };
    g.Le = function() {
        this.cc && this.cc()
    };
    g.We = function(a) {
        if (p(this.a.a)) {
            var b = -1 != this.wa ? this.wa : void 0;
            this.wa = -1;
            Ig(this, "REPEAT_SINGLE" == this.a.g ? 0 : 1, !1, b, void 0, void 0, void 0, void 0 === a ? "FINISHED" : a)
        }
    };
    g.hf = function(a, b) {
        Cg(this, a, !0, b)
    };

    function Ig(a, b, c, d, e, f, h, l) {
        c = a.kg.bind(a, b, c, d, e, f, h, l);
        $f(a.a) ? Sf(a.a, b).then(c, c) : c()
    }
    g.kg = function(a, b, c, d, e, f, h) {
        h = h || "INTERRUPTED";
        if (p(this.a.a) && "QUEUE_ENDED" != ag(this.a, a, !1)) {
            var l = ag(this.a, a, !0);
            C(F, "After " + a + " jump, transition is: " + l);
            (a = Jg(this, this.a.pa(), void 0, f)) ? (this.b && (this.j = h, this.m = this.b, this.b = null, this.w = [], "QUEUE_SHUFFLED" == l && (e = !0), "INTERRUPTED" == this.j && this.Qc()), ng(this, "", a, !1, this.B.bind(this, b, c, d, e))) : this.ja && this.ja(h, c)
        } else this.ja && this.ja(h, c)
    };
    g.af = function(a) {
        Pc(F, Zb, "onGetStatus");
        var b = a.data;
        Pc(F, Zb, "onGetStatus: " + JSON.stringify(b));
        var c = !0,
            d = !0;
        b.options && (b.options & 1 && (c = !1), b.options & 1 && (d = !1));
        this.Tb(a.senderId, a.data.requestId, c, null, d)
    };
    g.gf = function(a) {
        Pc(F, Zb, "onPlay");
        this.c.play();
        this.B(!1, a.data.requestId)
    };
    g.ff = function(a) {
        Pc(F, Zb, "onPlayAgain");
        this.b ? (this.c.seek(0), this.c.play(), this.B(!1, a.data.requestId)) : this.s && (this.s.type = "LOAD", this.s.autoplay = !0, lg(this, this.N, this.s))
    };
    g.nf = function(a) {
        a = a.data;
        Pc(F, Zb, "onSeek: " + JSON.stringify(a));
        var b = p(a.relativeTime) ? this.c.getCurrentTimeSec() + a.relativeTime : a.currentTime;
        this.c.seek(b, a.resumeState);
        "PAUSED" != this.c.getState() && (this.i = !0);
        this.c.getCurrentTimeSec() < this.c.getDurationSec() ? this.B(!1, a.requestId) : this.wa = a.requestId
    };
    g.pf = function(a) {
        a = a.data;
        Pc(F, Zb, "onSetPlaybackRate: " + JSON.stringify(a));
        this.c.Vb ? this.u = this.c.Vb(Number(a.playbackRate ? a.playbackRate : this.u * a.relativePlaybackRate)) : B(F, "setPlaybackRate is not supported");
        this.B(!1, a.requestId)
    };
    g.getPlaybackRate = function() {
        return this.u
    };
    g.sf = function(a) {
        Cg(this, "CANCELLED", !0, a.data.requestId)
    };

    function Cg(a, b, c, d) {
        c = !p(c) || c;
        if (d && !c) throw Error("customData and requestId should only be provided in broadcast mode");
        a.b ? (Tf(a.a), a.c.reset(), b && (a.j = b), a.m = a.b, a.b = null, a.w = [], c && a.B(!1, d, void 0, void 0)) : C(F, "Nothing to reset, Media is already null");
        a.s && (vg(a), a.L = sd(function() {
            a.s = null;
            a.L = null
        }, 9E5));
        b && "INTERRUPTED" == b && a.Qc()
    }
    g.ef = function(a) {
        this.c.pause();
        this.B(!1, a.data.requestId)
    };
    g.qf = function(a) {
        a = a.data;
        this.c.setVolume(a.volume);
        this.B(!1, a.requestId)
    };
    g.Ve = function(a) {
        var b = a.data;
        if (ig(this.b.media.tracks, b.language)) {
            if (!b.activeTrackIds && !b.language && p(b.enableTextTracks)) {
                var c = Kg(this, b);
                if (c) b.activeTrackIds = c;
                else {
                    this.Z(a.senderId, b.requestId, "INVALID_REQUEST", "INVALID_PARAMS");
                    return
                }
            }
            a = {
                activeTrackIds: b.activeTrackIds,
                language: b.language,
                textTrackStyle: b.textTrackStyle
            };
            this.c.editTracksInfo && (this.b.activeTrackIds = this.c.editTracksInfo(a) || void 0);
            this.B(b.textTrackStyle ? !0 : !1, b.requestId)
        } else A(F, "Invalid track language"), this.Z(a.senderId,
            b.requestId, "INVALID_REQUEST", "LANGUAGE_NOT_SUPPORTED")
    };

    function Kg(a, b) {
        var c = a.b && a.b.media && a.b.media.tracks;
        if (!c || 0 == c.length) return A(F, "No tracks available"), null;
        c = c.filter(function(a) {
            return "TEXT" == a.type
        }).map(function(a) {
            return a.trackId
        });
        if (0 == c.length) return A(F, "No text tracks available"), null;
        var d = a.b.activeTrackIds || [],
            e = c.filter(function(a) {
                return 0 <= d.indexOf(a)
            });
        if (!b.enableTextTracks) {
            if (0 < e.length) return a.w = e, d.filter(function(a) {
                return 0 > e.indexOf(a)
            })
        } else if (0 == e.length) return b = d.concat(0 < a.w.length ? a.w : [c[0]]), a.w = [], b;
        return d
    }
    g.Ue = function(a) {
        var b = a.data;
        jg(this.b.media.tracks, b.language) ? (this.c.dc && (this.b.activeTrackIds = this.c.dc(b)), this.B(!1, b.requestId)) : (A(F, "Invalid audio track language"), this.Z(a.senderId, b.requestId, "INVALID_REQUEST", "LANGUAGE_NOT_SUPPORTED"))
    };

    function qg(a) {
        if (2 > a.length) return !0;
        for (var b = 0; b < a.length; b++)
            for (var c = b + 1; c < a.length; c++)
                if (a[b] == a[c]) return A(F, "Duplicate itemId: " + a[b] + "at positions:" + b + " " + c), !1;
        return !0
    }

    function Lg(a) {
        for (var b = 0; b < a.length; b++) {
            if (!q(a[b].itemId)) return A(F, "Invalid itemId at position: " + b), !1;
            for (var c = b + 1; c < a.length; c++) {
                if (!q(a[c].itemId)) return A(F, "Invalid itemId at position: " + c), !1;
                if (a[b].itemId == a[c].itemId) return A(F, "Duplicate itemId: " + a[b].itemId + "at positions:" + b + " " + c), !1
            }
        }
        return !0
    }

    function og(a) {
        for (var b = [], c = 0; c < a.length; c++) {
            var d = new Ff(a[c].itemId);
            d.media = a[c].media;
            d.autoplay = a[c].autoplay;
            d.startTime = a[c].startTime;
            d.playbackDuration = a[c].playbackDuration;
            d.preloadTime = a[c].preloadTime;
            d.activeTrackIds = a[c].activeTrackIds;
            d.customData = a[c].customData;
            b.push(d)
        }
        return b
    }

    function Jg(a, b, c, d) {
        if (!b) return null;
        var e = new Mg;
        e.requestId = c || 0;
        e.mediaSessionId = a.l;
        e.type = "LOAD";
        e.autoplay = b.autoplay;
        e.currentTime = p(d) ? d : b.startTime;
        e.activeTrackIds = b.activeTrackIds;
        e.customData = b.customData || void 0;
        e.media = b.media;
        return e
    }

    function xg(a, b) {
        if (a.b.media.duration - a.c.getCurrentTimeSec() <= b || 0 == b && a.c.Ab && a.c.Ab()) return !0;
        if (null == a.v) return !1;
        a.v = null;
        if (!a.Oa) return !1;
        b = new Ng("CANCEL_PRELOAD");
        b.requestId = 0;
        b.mediaSessionId = a.l;
        b = new G("cancelpreload", b, "");
        C(F, "Sending cancel preload event: " + JSON.stringify(b));
        a.Oa(b) && a.B(!1);
        return !1
    }
    g.kf = function(a) {
        var b = a.data,
            c = Jg(this, b.items ? b.items[b.startIndex || 0] : null, b.requestId, b.currentTime),
            d = new ce;
        d.items = b.items;
        d.startIndex = b.startIndex || 0;
        d.startTime = b.currentTime;
        d.repeatMode = b.repeatMode || "REPEAT_OFF";
        c.queueData = d;
        c ? ng(this, a.senderId, c, !0) : A(F, "Queue Load request is invalid")
    };
    g.jf = function(a) {
        a = a.data;
        C(F, "Queue insert data: " + JSON.stringify(a));
        var b = !1;
        p(a.currentItemId) && (b = Xf(this.a, a.currentItemId));
        p(a.currentItemIndex) && (b = !0);
        this.a.oc(a.items, a.insertBefore, a.currentItemIndex);
        b ? Ig(this, 0, !0, a.requestId, a.customData, !0, a.currentTime) : this.B(!0, a.requestId, a.customData, !0)
    };

    function pg(a, b, c) {
        C(F, "Dispatching MediaManager queueUpdate event");
        var d = !1;
        p(a.a.a) ? c.items && !Lg(c.items) ? d = !0 : c.repeatMode && !cast.receiver.media.zd(c.repeatMode) && (A(F, "Invalid repeatMode"), d = !0) : (A(F, "Queue does not exist"), d = !0);
        if (d) return {
            type: "INVALID_REQUEST",
            reason: "INVALID_PARAMS"
        };
        if (c.items && 0 < c.items.length) {
            d = a.a;
            for (var e = c.items, f = [], h = 0; h < e.length; h++)
                for (var l = 0; l < d.a.length; l++)
                    if (e[h].itemId == d.a[l].itemId) {
                        f.push(e[h]);
                        break
                    }
            c.items = og(f)
        }
        b = new G("queueupdate", c, b);
        a.Ua && a.Ua(b);
        H(a, b);
        return null
    }
    g.Ye = function(a) {
        var b = this,
            c = a.data;
        this.a.fetchItems(c.requestId, c.itemId, c.nextCount, c.prevCount).then(function(d) {
            Eg(b, d, a.senderId, c)
        }, function() {
            sg(b, {
                type: "INVALID_REQUEST",
                reason: "INVALID_COMMAND"
            }, a.senderId, c.requestId)
        })
    };

    function Eg(a, b, c, d) {
        "NO_CHANGE" == b.changeType && p(c) ? a.h.send(c, b) : (a.h.send("*:*", b), a.M && a.B(!0, d.requestId, d.customData, !0))
    }
    g.Ze = function(a) {
        var b = a.data;
        this.h.send(a.senderId, Qf(this.a, b.requestId, b.itemIds))
    };
    g.$e = function(a) {
        this.h.send(a.senderId, Rf(this.a, a.data.requestId))
    };
    g.rf = function(a) {
        var b = this,
            c = a.data;
        this.a.shuffle().then(function() {
            b.B(!1, c.requestId, c.customData, !0)
        })
    };
    g.gd = function(a) {
        var b = a.data;
        if (this.G) {
            C(F, "Queue update data: " + JSON.stringify(b));
            var c = a = !1;
            q(b.currentItemId) && (c = Xf(this.a, b.currentItemId));
            q(b.jump) && (c = !0, this.M && (a = !0));
            b.repeatMode && (this.a.g = b.repeatMode);
            b.items && 0 < b.items.length && (this.a.Gc(b.items), a = !0);
            b.shuffle && (Zf(this.a), c = !0);
            c ? Ig(this, b.jump || 0, a, b.requestId, b.customData, a, b.currentTime) : this.B(a, b.requestId, b.customData, a)
        } else a = a.senderId, a == cast.receiver.za.bc && this.Ua == this.gd ? this.Z(a, b.requestId, "INVALID_REQUEST", "INVALID_COMMAND") :
            (C(F, "QUEUE_UPDATE request ignored"), this.B(!1, b.requestId))
    };
    g.lf = function(a) {
        a = a.data;
        C(F, "Queue remove data: " + JSON.stringify(a));
        var b = !1;
        q(a.currentItemId) && (b = Xf(this.a, a.currentItemId));
        a.itemIds && 0 != a.itemIds.length ? (b = b || this.a.wc(a.itemIds)) ? Ig(this, 0, !1, a.requestId, a.customData, !0, a.currentTime) : this.B(!1, a.requestId, a.customData, !0) : A(F, "No itemIds to remove")
    };
    g.mf = function(a) {
        a = a.data;
        C(F, "Queue reorder data: " + JSON.stringify(a));
        var b = !1,
            c = !1;
        q(a.currentItemId) && (c = Xf(this.a, a.currentItemId));
        if (a.itemIds && 0 < a.itemIds.length) {
            b = this.a;
            var d = a.itemIds,
                e = a.insertBefore;
            if (!$f(b, "reorderItems") && d && 0 != d.length) {
                var f = b.a[b.b].itemId,
                    h = p(e) ? e : -1;
                e = b.a.length - d.length;
                for (var l = [], v = -1 == h ? !0 : !1, x = 0; x < b.a.length; x++) 0 <= Ta(d, b.a[x].itemId) ? v || b.a[x].itemId != d[0] || (e = l.length) : (l.push(b.a[x]), h == b.a[x].itemId && (e = l.length - 1, v = !0));
                h = [];
                for (v = 0; v < d.length; v++) {
                    a: {
                        for (x =
                            0; x < b.a.length; x++)
                            if (d[v] == b.a[x].itemId) {
                                x = b.a[x];
                                break a
                            }
                        x = null
                    }
                    h.push(x)
                }
                Ea(Ua, l, e, 0).apply(null, h);
                b.a = l;
                p(f) && Xf(b, f)
            }
            b = !0
        }
        c ? Ig(this, 0, !1, a.requestId, a.customData, b, a.currentTime) : this.B(!1, a.requestId, a.customData, b)
    };
    g.addEventListener = function(a, b) {
        yc(this.$b, a, b)
    };
    g.removeEventListener = function(a, b) {
        Gc(this.$b, a, b)
    };

    function H(a, b) {
        b.target = a;
        return a.$b.dispatchEvent(b)
    }
    g.dispatchEvent = function(a) {
        return H(this, a)
    };

    function ug(a) {
        return !!a && Aa(a) && "function" === typeof a.then
    }
    var F = w("cast.receiver.MediaManager");

    function G(a, b, c) {
        z.call(this, a);
        this.data = b;
        this.senderId = c
    }
    m(G, z);

    function Ng(a) {
        this.type = a;
        this.requestId = 0;
        this.customData = this.mediaSessionId = void 0
    }

    function Mg() {
        Ng.call(this, "LOAD");
        this.media = new be;
        this.autoplay = !1;
        this.currentTime = 0;
        this.playbackRate = 1;
        this.credentialsType = this.credentials = this.queueData = this.activeTrackIds = void 0
    }
    m(Mg, Ng);

    function yg(a) {
        Mg.call(this);
        this.type = "PRELOAD";
        this.itemId = a
    }
    m(yg, Mg);

    function Og(a) {
        Ng.call(this, "QUEUE_INSERT");
        this.currentTime = this.currentItemId = this.currentItemIndex = this.insertBefore = void 0;
        this.items = a
    }
    m(Og, Ng);

    function rg() {
        Ng.call(this, "QUEUE_UPDATE");
        this.shuffle = this.repeatMode = this.items = this.jump = this.currentTime = this.currentItemId = void 0
    }
    m(rg, Ng);

    function Pg(a) {
        Ng.call(this, "QUEUE_REMOVE");
        this.currentTime = this.currentItemId = void 0;
        this.itemIds = a
    }
    m(Pg, Ng);

    function Qg(a) {
        switch (a) {
            case "mp4a.a6":
                return 1;
            case "ec-3":
                return 2;
            case "mp4a.40.2":
                return 3;
            case "mp4a.40.5":
                return 4;
            case "mp4a.67":
                return 5;
            case "avc1.4D40":
                return 6;
            case "avc1.4D401E":
                return 7;
            case "mp4a.a5":
                return 8;
            case "ac-3":
                return 9;
            case "vorbis":
                return 10;
            case "opus":
                return 11;
            case "vp8":
                return 12;
            case "vp9":
                return 13
        }
        return 0 == a.lastIndexOf("avc1", 0) ? 11 : 0 == a.lastIndexOf("mp4a.40", 0) ? 12 : 0
    }

    function Rg(a) {
        switch (a) {
            case "application/ttml+xml":
                return 1;
            case "text/vtt":
                return 2;
            case "text/mp4":
                return 3;
            case "audio/mp4":
                return 4;
            case "video/mp4":
                return 5;
            case "video/mp2t":
                return 6;
            case "audio/webm":
                return 7;
            case "video/webm":
                return 8
        }
        return 0
    }

    function Sg(a, b) {
        a: {
            if (b) {
                if (Ia(b, "video/")) {
                    b = "Video";
                    break a
                }
                if (Ia(b, "audio/")) {
                    b = "Audio";
                    break a
                }
            }
            b = void 0
        }
        if (p(b)) {
            Tg("Cast.Shaka.Available" + b + "Bitrates", a.length);
            for (var c = 0; c < a.length; c++) Tg("Cast.Shaka.Available" + b + "Bitrate" + c, a[c])
        }
    }

    function Ug(a, b) {
        cast.platform.metrics.logBoolToUma(a, b)
    }

    function Vg(a) {
        a.split(",").forEach(function(a) {
            Tg("Cast.Shaka.Codec", Qg(a))
        })
    }

    function Tg(a, b) {
        cast.platform.metrics.logIntToUma(a, b)
    };
    var Wg = {
            sh: {
                1E3: {
                    other: "0K"
                },
                1E4: {
                    other: "00K"
                },
                1E5: {
                    other: "000K"
                },
                1E6: {
                    other: "0M"
                },
                1E7: {
                    other: "00M"
                },
                1E8: {
                    other: "000M"
                },
                1E9: {
                    other: "0B"
                },
                1E10: {
                    other: "00B"
                },
                1E11: {
                    other: "000B"
                },
                1E12: {
                    other: "0T"
                },
                1E13: {
                    other: "00T"
                },
                1E14: {
                    other: "000T"
                }
            },
            rh: {
                1E3: {
                    other: "0 thousand"
                },
                1E4: {
                    other: "00 thousand"
                },
                1E5: {
                    other: "000 thousand"
                },
                1E6: {
                    other: "0 million"
                },
                1E7: {
                    other: "00 million"
                },
                1E8: {
                    other: "000 million"
                },
                1E9: {
                    other: "0 billion"
                },
                1E10: {
                    other: "00 billion"
                },
                1E11: {
                    other: "000 billion"
                },
                1E12: {
                    other: "0 trillion"
                },
                1E13: {
                    other: "00 trillion"
                },
                1E14: {
                    other: "000 trillion"
                }
            }
        },
        Xg = Wg;
    Xg = Wg;
    var Yg = {
        AED: [2, "dh", "\u062f.\u0625.", "DH"],
        ALL: [0, "Lek", "Lek"],
        AUD: [2, "$", "AU$"],
        BDT: [2, "\u09f3", "Tk"],
        BGN: [2, "lev", "lev"],
        BRL: [2, "R$", "R$"],
        CAD: [2, "$", "C$"],
        CDF: [2, "FrCD", "CDF"],
        CHF: [2, "CHF", "CHF"],
        CLP: [0, "$", "CL$"],
        CNY: [2, "\u00a5", "RMB\u00a5"],
        COP: [32, "$", "COL$"],
        CRC: [0, "\u20a1", "CR\u20a1"],
        CZK: [50, "K\u010d", "K\u010d"],
        DKK: [50, "kr.", "kr."],
        DOP: [2, "RD$", "RD$"],
        EGP: [2, "\u00a3", "LE"],
        ETB: [2, "Birr", "Birr"],
        EUR: [2, "\u20ac", "\u20ac"],
        GBP: [2, "\u00a3", "GB\u00a3"],
        HKD: [2, "$", "HK$"],
        HRK: [2, "kn", "kn"],
        HUF: [34,
            "Ft", "Ft"
        ],
        IDR: [0, "Rp", "Rp"],
        ILS: [34, "\u20aa", "IL\u20aa"],
        INR: [2, "\u20b9", "Rs"],
        IRR: [0, "Rial", "IRR"],
        ISK: [0, "kr", "kr"],
        JMD: [2, "$", "JA$"],
        JPY: [0, "\u00a5", "JP\u00a5"],
        KRW: [0, "\u20a9", "KR\u20a9"],
        LKR: [2, "Rs", "SLRs"],
        LTL: [2, "Lt", "Lt"],
        MNT: [0, "\u20ae", "MN\u20ae"],
        MVR: [2, "Rf", "MVR"],
        MXN: [2, "$", "Mex$"],
        MYR: [2, "RM", "RM"],
        NOK: [50, "kr", "NOkr"],
        PAB: [2, "B/.", "B/."],
        PEN: [2, "S/.", "S/."],
        PHP: [2, "\u20b1", "PHP"],
        PKR: [0, "Rs", "PKRs."],
        PLN: [50, "z\u0142", "z\u0142"],
        RON: [2, "RON", "RON"],
        RSD: [0, "din", "RSD"],
        RUB: [50, "\u20bd",
            "RUB"
        ],
        SAR: [2, "Rial", "Rial"],
        SEK: [50, "kr", "kr"],
        SGD: [2, "$", "S$"],
        THB: [2, "\u0e3f", "THB"],
        TRY: [2, "\u20ba", "TRY"],
        TWD: [2, "NT$", "NT$"],
        TZS: [0, "TSh", "TSh"],
        UAH: [2, "\u0433\u0440\u043d.", "UAH"],
        USD: [2, "$", "US$"],
        UYU: [2, "$", "$U"],
        VND: [48, "\u20ab", "VN\u20ab"],
        YER: [0, "Rial", "Rial"],
        ZAR: [2, "R", "ZAR"]
    };
    var Zg = {
            Zd: ".",
            Kc: ",",
            me: "%",
            Tc: "0",
            pe: "+",
            Mc: "-",
            $d: "E",
            ne: "\u2030",
            de: "\u221e",
            le: "NaN",
            Yd: "#,##0.###",
            zh: "#E0",
            yh: "#,##0%",
            th: "\u00a4#,##0.00",
            Jc: "USD"
        },
        I = Zg;
    I = Zg;

    function $g() {
        this.i = 40;
        this.a = 1;
        this.j = 3;
        this.l = this.g = 0;
        this.F = !1;
        this.w = this.v = "";
        this.m = I.Mc;
        this.s = "";
        this.b = 1;
        this.h = !1;
        this.c = [];
        this.u = this.C = !1;
        var a = I.Yd;
        a.replace(/ /g, "\u00a0");
        var b = [0];
        this.v = ah(this, a, b);
        for (var c = b[0], d = -1, e = 0, f = 0, h = 0, l = -1, v = a.length, x = !0; b[0] < v && x; b[0]++) switch (a.charAt(b[0])) {
            case "#":
                0 < f ? h++ : e++;
                0 <= l && 0 > d && l++;
                break;
            case "0":
                if (0 < h) throw Error('Unexpected "0" in pattern "' + a + '"');
                f++;
                0 <= l && 0 > d && l++;
                break;
            case ",":
                0 < l && this.c.push(l);
                l = 0;
                break;
            case ".":
                if (0 <= d) throw Error('Multiple decimal separators in pattern "' +
                    a + '"');
                d = e + f + h;
                break;
            case "E":
                if (this.u) throw Error('Multiple exponential symbols in pattern "' + a + '"');
                this.u = !0;
                this.l = 0;
                b[0] + 1 < v && "+" == a.charAt(b[0] + 1) && (b[0]++, this.F = !0);
                for (; b[0] + 1 < v && "0" == a.charAt(b[0] + 1);) b[0]++, this.l++;
                if (1 > e + f || 1 > this.l) throw Error('Malformed exponential pattern "' + a + '"');
                x = !1;
                break;
            default:
                b[0]--, x = !1
        }
        0 == f && 0 < e && 0 <= d && (f = d, 0 == f && f++, h = e - f, e = f - 1, f = 1);
        if (0 > d && 0 < h || 0 <= d && (d < e || d > e + f) || 0 == l) throw Error('Malformed pattern "' + a + '"');
        h = e + f + h;
        this.j = 0 <= d ? h - d : 0;
        0 <= d && (this.g = e +
            f - d, 0 > this.g && (this.g = 0));
        this.a = (0 <= d ? d : h) - e;
        this.u && (this.i = e + this.a, 0 == this.j && 0 == this.a && (this.a = 1));
        this.c.push(Math.max(0, l));
        this.C = 0 == d || d == h;
        c = b[0] - c;
        this.w = ah(this, a, b);
        b[0] < a.length && ";" == a.charAt(b[0]) ? (b[0]++, 1 != this.b && (this.h = !0), this.m = ah(this, a, b), b[0] += c, this.s = ah(this, a, b)) : (this.m += this.v, this.s += this.w)
    }

    function bh(a, b, c, d) {
        if (a.g > a.j) throw Error("Min value must be less than max value");
        d || (d = []);
        var e = Math.pow(10, a.j);
        var f = Math.round(b * e);
        isFinite(f) ? (b = Math.floor(f / e), f = Math.floor(f - b * e)) : f = 0;
        var h = e = b;
        b = f;
        var l = 0 < a.g || 0 < b || !1;
        e = a.g;
        l && (e = a.g);
        var v = "";
        for (f = h; 1E20 < f;) v = "0" + v, f = Math.round(f / 10);
        v = f + v;
        var x = I.Zd;
        f = I.Tc.charCodeAt(0);
        var oa = v.length,
            W = 0;
        if (0 < h || 0 < c) {
            for (h = oa; h < c; h++) d.push(String.fromCharCode(f));
            if (2 <= a.c.length)
                for (c = 1; c < a.c.length; c++) W += a.c[c];
            c = oa - W;
            if (0 < c) {
                h = a.c;
                W = oa = 0;
                for (var S,
                        Ra = I.Kc, Ya = v.length, za = 0; za < Ya; za++)
                    if (d.push(String.fromCharCode(f + 1 * Number(v.charAt(za)))), 1 < Ya - za)
                        if (S = h[W], za < c) {
                            var jl = c - za;
                            (1 === S || 0 < S && 1 === jl % S) && d.push(Ra)
                        } else W < h.length && (za === c ? W += 1 : S === za - c - oa + 1 && (d.push(Ra), oa += S, W += 1))
            } else {
                c = v;
                v = a.c;
                h = I.Kc;
                S = c.length;
                Ra = [];
                for (oa = v.length - 1; 0 <= oa && 0 < S; oa--) {
                    W = v[oa];
                    for (Ya = 0; Ya < W && 0 <= S - Ya - 1; Ya++) Ra.push(String.fromCharCode(f + 1 * Number(c.charAt(S - Ya - 1))));
                    S -= W;
                    0 < S && Ra.push(h)
                }
                d.push.apply(d, Ra.reverse())
            }
        } else l || d.push(String.fromCharCode(f));
        (a.C ||
            l) && d.push(x);
        l = String(b);
        b = l.split("e+");
        if (2 == b.length) {
            if (l = parseFloat(b[0])) {
                x = l;
                if (isFinite(x)) {
                    for (c = 0; 1 <= (x /= 10);) c++;
                    x = c
                } else x = 0 < x ? x : 0;
                x = 0 - x - 1; - 1 > x ? (x = Math.pow(10, 1), l = Math.round(l / x) * x) : (x = Math.pow(10, x), l = Math.round(l * x) / x)
            }
            l = String(l);
            l = l.replace(".", "");
            l += Ma("0", parseInt(b[1], 10) - l.length + 1)
        }
        a.j + 1 > l.length && (l = "1" + Ma("0", a.j - l.length) + l);
        for (a = l.length;
            "0" == l.charAt(a - 1) && a > e + 1;) a--;
        for (h = 1; h < a; h++) d.push(String.fromCharCode(f + 1 * Number(l.charAt(h))))
    }

    function ch(a, b, c) {
        c.push(I.$d);
        0 > b ? (b = -b, c.push(I.Mc)) : a.F && c.push(I.pe);
        b = "" + b;
        for (var d = I.Tc, e = b.length; e < a.l; e++) c.push(d);
        c.push(b)
    }

    function ah(a, b, c) {
        for (var d = "", e = !1, f = b.length; c[0] < f; c[0]++) {
            var h = b.charAt(c[0]);
            if ("'" == h) c[0] + 1 < f && "'" == b.charAt(c[0] + 1) ? (c[0]++, d += "'") : e = !e;
            else if (e) d += h;
            else switch (h) {
                case "#":
                case "0":
                case ",":
                case ".":
                case ";":
                    return d;
                case "\u00a4":
                    c[0] + 1 < f && "\u00a4" == b.charAt(c[0] + 1) ? (c[0]++, d += I.Jc) : d += Yg[I.Jc][1];
                    break;
                case "%":
                    if (!a.h && 1 != a.b) throw Error("Too many percent/permill");
                    if (a.h && 100 != a.b) throw Error("Inconsistent use of percent/permill characters");
                    a.b = 100;
                    a.h = !1;
                    d += I.me;
                    break;
                case "\u2030":
                    if (!a.h &&
                        1 != a.b) throw Error("Too many percent/permill");
                    if (a.h && 1E3 != a.b) throw Error("Inconsistent use of percent/permill characters");
                    a.b = 1E3;
                    a.h = !1;
                    d += I.ne;
                    break;
                default:
                    d += h
            }
        }
        return d
    }
    var dh = {
        prefix: "",
        ah: "",
        vf: 0
    };

    function eh(a) {
        return 1 == a % 10 && 11 != a % 100 ? "one" : 2 == a % 10 && 12 != a % 100 ? "two" : 3 == a % 10 && 13 != a % 100 ? "few" : "other"
    }
    var fh = eh;
    fh = eh;

    function gh(a, b) {
        if (void 0 === b) {
            b = a + "";
            var c = b.indexOf(".");
            b = Math.min(-1 == c ? 0 : b.length - c - 1, 3)
        }
        return 1 == (a | 0) && 0 == b ? "one" : "other"
    }
    var hh = gh;
    hh = gh;

    function ih(a) {
        this.g = a;
        this.b = this.a = this.h = null;
        a = I;
        var b = Xg;
        if (jh !== a || kh !== b) jh = a, kh = b, lh = new $g;
        this.j = lh
    }
    var jh = null,
        kh = null,
        lh = null,
        mh = /'([{}#].*?)'/g,
        nh = /''/g;

    function oh(a, b, c, d, e) {
        for (var f = 0; f < b.length; f++) switch (b[f].type) {
            case 4:
                e.push(b[f].value);
                break;
            case 3:
                var h = b[f].value,
                    l = a,
                    v = e,
                    x = c[h];
                p(x) ? (l.a.push(x), v.push(l.c(l.a))) : v.push("Undefined parameter - " + h);
                break;
            case 2:
                h = b[f].value;
                l = e;
                v = h.gb;
                p(c[v]) ? (v = h[c[v]], p(v) || (v = h.other), oh(a, v, c, d, l)) : l.push("Undefined parameter - " + v);
                break;
            case 0:
                h = b[f].value;
                ph(a, h, c, hh, d, e);
                break;
            case 1:
                h = b[f].value;
                ph(a, h, c, fh, d, e);
                break;
            default:
                Sa("Unrecognized block type: " + b[f].type)
        }
    }

    function ph(a, b, c, d, e, f) {
        var h = b.gb,
            l = b.Vc,
            v = +c[h];
        if (isNaN(v)) f.push("Undefined or invalid parameter - " + h);
        else if (l = v - l, h = b[c[h]], p(h) || (d = a.j.G ? d(l, a.j.G()) : d(l), h = b[d], p(h) || (h = b.other)), b = [], oh(a, h, c, e, b), c = b.join(""), e) f.push(c);
        else {
            a = a.j;
            b = l;
            if (isNaN(b)) a = I.le;
            else {
                e = [];
                b /= Math.pow(10, dh.vf);
                e.push(dh.prefix);
                l = 0 > b || 0 == b && 0 > 1 / b;
                e.push(l ? a.m : a.v);
                if (isFinite(b))
                    if (b = b * (l ? -1 : 1) * a.b, a.u)
                        if (d = b, 0 == d) bh(a, d, a.a, e), ch(a, 0, e);
                        else {
                            b = Math.floor(Math.log(d) / Math.log(10) + 2E-15);
                            h = Math.pow(10, b);
                            isFinite(h) &&
                                0 !== h ? d /= h : (h = Math.pow(10, Math.floor(b / 2)), d = d / h / h, 1 == b % 2 && (d = 0 < b ? d / 10 : 10 * d));
                            h = a.a;
                            if (1 < a.i && a.i > a.a) {
                                for (; 0 != b % a.i;) d *= 10, b--;
                                h = 1
                            } else 1 > a.a ? (b++, d /= 10) : (b -= a.a - 1, d *= Math.pow(10, a.a - 1));
                            bh(a, d, h, e);
                            ch(a, b, e)
                        }
                else bh(a, b, a.a, e);
                else e.push(I.de);
                e.push(l ? a.s : a.w);
                e.push(dh.ah);
                a = e.join("")
            }
            f.push(c.replace(/#/g, a))
        }
    }

    function qh(a, b) {
        var c = a.h,
            d = Da(a.c, a);
        b = b.replace(nh, function() {
            c.push("'");
            return d(c)
        });
        return b = b.replace(mh, function(a, b) {
            c.push(b);
            return d(c)
        })
    }

    function rh(a) {
        var b = 0,
            c = [],
            d = [],
            e = /[{}]/g;
        e.lastIndex = 0;
        for (var f; f = e.exec(a);) {
            var h = f.index;
            "}" == f[0] ? (c.pop(), 0 == c.length && (f = {
                type: 1
            }, f.value = a.substring(b, h), d.push(f), b = h + 1)) : (0 == c.length && (b = a.substring(b, h), "" != b && d.push({
                type: 0,
                value: b
            }), b = h + 1), c.push("{"))
        }
        b = a.substring(b);
        "" != b && d.push({
            type: 0,
            value: b
        });
        return d
    }
    var sh = /^\s*(\w+)\s*,\s*plural\s*,(?:\s*offset:(\d+))?/,
        th = /^\s*(\w+)\s*,\s*selectordinal\s*,/,
        uh = /^\s*(\w+)\s*,\s*select\s*,/;

    function vh(a, b) {
        var c = [];
        b = rh(b);
        for (var d = 0; d < b.length; d++) {
            var e = {};
            if (0 == b[d].type) e.type = 4, e.value = b[d].value;
            else if (1 == b[d].type) {
                var f = b[d].value;
                switch (sh.test(f) ? 0 : th.test(f) ? 1 : uh.test(f) ? 2 : /^\s*\w+\s*/.test(f) ? 3 : 5) {
                    case 2:
                        e.type = 2;
                        e.value = wh(a, b[d].value);
                        break;
                    case 0:
                        e.type = 0;
                        e.value = xh(a, b[d].value);
                        break;
                    case 1:
                        e.type = 1;
                        e.value = yh(a, b[d].value);
                        break;
                    case 3:
                        e.type = 3;
                        e.value = b[d].value;
                        break;
                    default:
                        Sa("Unknown block type for pattern: " + b[d].value)
                }
            } else Sa("Unknown part of the pattern.");
            c.push(e)
        }
        return c
    }

    function wh(a, b) {
        var c = "";
        b = b.replace(uh, function(a, b) {
            c = b;
            return ""
        });
        var d = {};
        d.gb = c;
        b = rh(b);
        for (var e = 0; e < b.length;) {
            var f = b[e].value;
            e++;
            if (1 == b[e].type) var h = vh(a, b[e].value);
            else Sa("Expected block type.");
            d[f.replace(/\s/g, "")] = h;
            e++
        }
        return d
    }

    function xh(a, b) {
        var c = "",
            d = 0;
        b = b.replace(sh, function(a, b, e) {
            c = b;
            e && (d = parseInt(e, 10));
            return ""
        });
        var e = {};
        e.gb = c;
        e.Vc = d;
        b = rh(b);
        for (var f = 0; f < b.length;) {
            var h = b[f].value;
            f++;
            if (1 == b[f].type) var l = vh(a, b[f].value);
            else Sa("Expected block type.");
            e[h.replace(/\s*(?:=)?(\w+)\s*/, "$1")] = l;
            f++
        }
        return e
    }

    function yh(a, b) {
        var c = "";
        b = b.replace(th, function(a, b) {
            c = b;
            return ""
        });
        var d = {};
        d.gb = c;
        d.Vc = 0;
        b = rh(b);
        for (var e = 0; e < b.length;) {
            var f = b[e].value;
            e++;
            if (1 == b[e].type) var h = vh(a, b[e].value);
            else Sa("Expected block type.");
            d[f.replace(/\s*(?:=)?(\w+)\s*/, "$1")] = h;
            e++
        }
        return d
    }
    ih.prototype.c = function(a) {
        return "\ufddf_" + (a.length - 1).toString(10) + "_"
    };
    cast.f = {};
    cast.f.Xd = '<style>@import url(//fonts.googleapis.com/css?family=Open+Sans:300,400);@-webkit-keyframes spin{0%{-webkit-transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg)}}@-webkit-keyframes loading{0%{margin-left:-100%}100%{margin-left:100%}}.background{background:var(--background, url("data:image/svg+xml,%3Csvg%20width=%271280%27%20height=%27720%27%20xmlns=%27http://www.w3.org/2000/svg%27%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id=%27background%27%20x1=%270%25%27%20y1=%270%25%27%20x2=%270%25%27%20y2=%27100%25%27%3E%0A%20%20%20%20%20%20%3Cstop%20offset=%2710%25%27%20stop-color=%27black%27/%3E%0A%20%20%20%20%20%20%3Cstop%20offset=%27100%25%27%20style=%27stop-color:rgb%2830%2C30%2C30%29%27/%3E%0A%20%20%20%20%3C/linearGradient%3E%0A%20%20%3C/defs%3E%0A%20%20%3Crect%20fill=%27url%28%23background%29%27%20x=%270%27%20y=%270%27%20width=%271280%27%20height=%27720%27/%3E%0A%3C/svg%3E%0A"));background-image:var(--background-image);background-size:var(--background-size);background-color:var(--background-color);background-repeat:var(--background-repeat)}.breakIcon{border-radius:2px;color:#fff;padding:2px 4px;font-weight:bold;display:block}.breakIcon:after{content:var(--ad-title, attr(data-ad-label))}.breakSkip{background-color:rgba(0,0,0,0.7);border:1px solid rgba(255,255,255,0.5);color:#fff;padding:5px 10px;font-size:16px;font-weight:400;display:block;visibility:hidden;float:right;line-height:24px}.breakSkip:after{content:var(--skip-ad-title, attr(data-skip-ad-label))}.breakMarker{height:100%;background-color:#fff;width:2px;opacity:.8;position:absolute;bottom:0}.splash{background:var(--splash-background);background-image:var(--splash-image);background-size:var(--splash-size);background-color:var(--splash-color);background-repeat:var(--logo-repeat)}.logo{background:var(--logo-background);background-image:var(--logo-image);background-size:var(--logo-size);background-color:var(--logo-color);background-repeat:var(--logo-repeat)}.watermark{background:var(--watermark-background);background-image:var(--watermark-image);background-position:var(--watermark-position);background-size:var(--watermark-size);background-color:var(--watermark-color);background-repeat:var(--watermark-repeat)}.player{background:#111;color:#f1f1f1;font-family:var(--font-family, \'\'),\'Open Sans\',sans-serif;font-weight:300}.player,.player .background,.player .foreground,.player .gradient,.player .slideshow,.player .logo,.player .splash{position:absolute;bottom:0;left:0;right:0;top:0}.player .overlay,.player .watermark{position:absolute;top:64px;left:64px;bottom:64px;right:64px}.player .breakOverlay{position:absolute;top:64px;left:64px;bottom:64px;right:64px}.player .background{background-position:center;background-repeat:no-repeat;background-size:cover}.player .logo,.player .splash{background-position:center;background-repeat:no-repeat;color:rgba(221,221,221,0.8);display:none;font-size:44px;padding-top:25%;position:absolute;text-align:center}.player .watermark{display:none;background-position:bottom right;background-repeat:no-repeat}.player video{display:none;background-color:#000;background-position:center;background-repeat:no-repeat;background-size:contain;height:100%;width:100%}.player .overlay{top:auto}.player[displayStatus=false] .gradient,.player[displayStatus=false] .metadata,.player[displayStatus=false] .controlsProgress,.player[displayStatus=false] .controlsCurTime,.player[displayStatus=false][state="playing"] .controlsPlayPause,.player[displayStatus=false] .controlsTotalTime{opacity:0;-webkit-transition:opacity 1s linear}.player .breakOverlay{display:none;top:auto}.player .gradient{display:block;opacity:.9;background:linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0) 72%, rgba(0,0,0,0) 100%)}.player .metadataPlaceholder{min-width:0;width:100%}.player .metadata{padding-bottom:54px}.player .metadataTitle{color:rgba(255,255,255,0.8);font-size:44px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.player .metadataSubtitle{color:rgba(203,203,203,0.8);font-size:22px;line-height:33px;max-height:66px;overflow:hidden}.player .metadataSubtitle span:not(:first-child):before{content:\'\\00B7\';padding-left:10px;padding-right:10px;font-weight:bold}.player .controls{bottom:0;height:30px;left:0;position:absolute;right:0}.player .controlsPlayPause{background-size:cover;border:0;float:left;height:32px;margin-left:-4px;margin-top:-3px;width:32px}.player .controlsProgress{background-color:rgba(255,255,255,0.2);height:8px;margin-top:11px;margin-bottom:11px;overflow:hidden;position:relative}.player .controlsProgressInner{height:100%;opacity:.8}.player .controlsProgressThumb{height:100%;width:3px;background-color:rgba(255,255,255,0.5);position:absolute;top:0;margin-left:-3px}.player .controlsCurTime,.player .controlsTotalTime{color:rgba(255,255,255,0.8);font-size:16px;font-weight:400}.player .controlsCurTime{float:left;line-height:30px;margin-left:15px;margin-right:15px}.player .controlsTotalTime{float:right;line-height:30px;margin-left:15px}.player .watermark{margin-bottom:54px}.player[state="buffering"][isLive="true"] .controlsCurTime,.player[state="paused"][isLive="true"] .controlsCurTime,.player[state="playing"][isLive="true"] .controlsCurTime,.player[state="buffering"][isLive="true"] .controlsTotalTime,.player[state="paused"][isLive="true"] .controlsTotalTime,.player[state="playing"][isLive="true"] .controlsTotalTime,.player[state="buffering"][isLive="true"] .controlsProgress,.player[state="paused"][isLive="true"] .controlsProgress,.player[state="playing"][isLive="true"] .controlsProgress{display:none !important}.player[state="launching"] .logo{display:block}.player[state="launching"] .spinner{-webkit-animation:spin 1s infinite linear;height:32px;width:32px;display:block;position:absolute;background-image:var(--spinner-image, url("data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20x=%270px%27%20y=%270px%27%20width=%2724px%27%20height=%2724px%27%20viewBox=%270%200%2024%2024%27%20enable-background=%27new%200%200%2024%2024%27%20xml:space=%27preserve%27%20fill=%27%23FFFFFF%27%3E%0A%20%20%20%20%3Cpath%20d=%27M12%2C22C6.49%2C22%2C2%2C17.51%2C2%2C12C2%2C6.49%2C6.49%2C2%2C12%2C2c0.55%2C0%2C1%2C0.45%2C1%2C1s-0.45%2C1-1%2C1c-4.41%2C0-8%2C3.59-8%2C8s3.59%2C8%2C8%2C8s8-3.59%2C8-8c0-0.55%2C0.45-1%2C1-1s1%2C0.45%2C1%2C1C22%2C17.51%2C17.51%2C22%2C12%2C22z%27/%3E%0A%20%20%20%20%3Crect%20fill=%27none%27%20width=%2724%27%20height=%2724%27/%3E%0A%3C/svg%3E%0A"));background-size:cover;bottom:64px;left:50%;margin-left:-16px}.player[state="loading"] .controlsCurTime,.player[state="loading"] .controlsTotalTime,.player[state="loading"] .controlsProgressThumb,.player[state="loading"] .controlsPlayPause{display:none}.player[state="loading"] .controlsProgressInner{width:90% !important;-webkit-animation:loading 2s infinite linear}.player[state="buffering"] .controlsPlayPause{background-image:var(--buffering-image, url("data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20x=%270px%27%20y=%270px%27%20width=%2724px%27%20height=%2724px%27%20viewBox=%270%200%2024%2024%27%20enable-background=%27new%200%200%2024%2024%27%20xml:space=%27preserve%27%20fill=%27%23FFFFFF%27%3E%0A%20%20%20%20%3Cpath%20d=%27M12%2C22C6.49%2C22%2C2%2C17.51%2C2%2C12C2%2C6.49%2C6.49%2C2%2C12%2C2c0.55%2C0%2C1%2C0.45%2C1%2C1s-0.45%2C1-1%2C1c-4.41%2C0-8%2C3.59-8%2C8s3.59%2C8%2C8%2C8s8-3.59%2C8-8c0-0.55%2C0.45-1%2C1-1s1%2C0.45%2C1%2C1C22%2C17.51%2C17.51%2C22%2C12%2C22z%27/%3E%0A%20%20%20%20%3Crect%20fill=%27none%27%20width=%2724%27%20height=%2724%27/%3E%0A%3C/svg%3E%0A"));-webkit-animation:spin 1s infinite linear}.player[state="paused"] .controlsPlayPause{background-image:var(--pause-image, url("data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%2724px%27%20height=%2724px%27%20viewBox=%270%200%2024%2024%27%20fill=%27%23FFFFFF%27%3E%0A%20%20%20%20%3Cpath%20d=%27M6%2019h4V5H6v14zm8-14v14h4V5h-4z%27/%3E%0A%20%20%20%20%3Cpath%20d=%27M0%200h24v24H0z%27%20fill=%27none%27/%3E%0A%3C/svg%3E%0A"))}.player[state="playing"] .controlsPlayPause{background-image:var(--play-image, none)}.player[state="idle"] .slideshow,.player[state="idle"] .splash{display:block}.player[contentType="image"] video{display:block}.player[contentType="image"] .background{background-color:#111;background-image:none}.player[contentType="audio"] .metadataTitle,.player[contentType="audio"] .metadataTitle{font-size:22px;font-weight:400}.player[contentType="audio"] .metadataImage,.player[contentType="audio"] .metadataImage{max-height:384px;box-shadow:0 0 10px 5px rgba(0,0,0,0.3);max-width:384px}.player[contentType="audio"] .metadataPlaceholder{margin-top:15px}.player[contentType="audio"][isLive="true"] .metadataPlaceholder{margin-top:15px !important}.player[contentType="audio"][state="loading"] .overlay,.player[contentType="audio"][state="paused"] .overlay{margin:0 !important}.player[contentType="audio"][state="loading"] .watermark,.player[contentType="audio"][state="paused"] .watermark{display:block;margin:0 !important;margin-bottom:54px !important}.player[contentType="audio"][state="buffering"] .metadata,.player[contentType="audio"][state="playing"] .metadata{padding-bottom:0}.player[contentType="audio"][state="buffering"] .metadataPlaceholder,.player[contentType="audio"][state="playing"] .metadataPlaceholder{float:left;margin-top:19px}.player[contentType="audio"][state="buffering"] .controls,.player[contentType="audio"][state="playing"] .controls{height:4px;position:absolute;width:384px;bottom:auto;left:auto;right:auto;top:auto}.player[contentType="audio"][state="buffering"] .controlsProgress,.player[contentType="audio"][state="playing"] .controlsProgress{height:4px;margin-top:0;margin-bottom:0}.player[contentType="audio"][state="buffering"] .controlsCurTime,.player[contentType="audio"][state="buffering"] .controlsTotalTime,.player[contentType="audio"][state="buffering"] .controlsPlayPause,.player[contentType="audio"][state="playing"] .controlsCurTime,.player[contentType="audio"][state="playing"] .controlsTotalTime,.player[contentType="audio"][state="playing"] .controlsPlayPause{display:none}.player[contentType="audio"][state="buffering"] .watermark,.player[contentType="audio"][state="playing"] .watermark{display:block;margin-bottom:0}.player[contentType="video"] .metadata{display:flex}.player[contentType="video"] .metadataImage{align-self:flex-end;height:143px;margin-right:32px;width:auto}.player[contentType="video"] .metadataPlaceholder{align-self:flex-end}.player[contentType="video"][state="loading"] .watermark{display:block}.player[contentType="video"][state="buffering"] video{display:block}.player[contentType="video"][state="buffering"] .gradient{opacity:.1}.player[contentType="video"][state="buffering"] .metadata,.player[contentType="video"][state="buffering"][isSeeking=false] .controlsCurTime,.player[contentType="video"][state="buffering"][isSeeking=false] .controlsTotalTime,.player[contentType="video"][state="buffering"][isSeeking=false] .controlsProgress{display:none}.player[contentType="video"][state="paused"] video{display:block}.player[contentType="video"][state="paused"][isSeeking="true"] .metadata{display:none}.player[contentType="video"][state="paused"] .watermark{display:block;visibility:visible}.player[contentType="video"][state="paused"][displayStatus=false] .gradient{opacity:.1}.player[contentType="video"][state="playing"] video{display:block}.player[contentType="video"][state="playing"] .watermark{display:block;visibility:hidden}.player[contentType="video"][state="playing"][isSeeking=true] .metadata{display:none}.breakMetadata{display:none;padding-bottom:54px;overflow:auto}.breakInfo{float:left}.breakPosition{margin-left:5px}.player[isBreakSkippable=true] .breakSkip{visibility:visible}.player[isPlayingBreak=true] .breakMetadata{display:block}.player[isPlayingBreak=true] .breakTime{display:block}.player[isPlayingBreak=true] .breakIcon{display:inline-block}.player[contentType="video"][isPlayingBreak=true] .breakOverlay{display:block;visibility:visible}.player[contentType="video"][isPlayingBreak=true] .metadata,.player[contentType="video"][isPlayingBreak=true] .watermark{display:none}.player .slideshow{display:none;--interval-duration:var(--slideshow-interval, 10s);--animation-duration:var(--slideshow-animation, 2s)}.player .slideshow .slide{background-repeat:no-repeat;background-size:contain;background-color:#000;background-position:center center;position:absolute;opacity:0;width:100%;height:100%}.player .slideshow .slide.visible{opacity:1;-webkit-transition-property:opacity;-webkit-transition-duration:var(--slideshow-animation, 2s)}.player .slideshow .slide.top{z-index:100}.player .slideshow .slideshow-image-1{background-image:var(--slideshow-image-1)}.player .slideshow .slideshow-image-2{background-image:var(--slideshow-image-2)}.player .slideshow .slideshow-image-3{background-image:var(--slideshow-image-3)}.player .slideshow .slideshow-image-4{background-image:var(--slideshow-image-4)}.player .slideshow .slideshow-image-5{background-image:var(--slideshow-image-5)}.player .slideshow .slideshow-image-6{background-image:var(--slideshow-image-6)}.player .slideshow .slideshow-image-7{background-image:var(--slideshow-image-7)}.player .slideshow .slideshow-image-8{background-image:var(--slideshow-image-8)}.player .slideshow .slideshow-image-9{background-image:var(--slideshow-image-9)}.player .slideshow .slideshow-image-10{background-image:var(--slideshow-image-10)}.progressBar {  background-color: var(--progress-color, hsl(var(--theme-hue, 42), 95%, 60%));}.breakIcon {  background-color: var(--break-color, hsl(var(--theme-hue, 42), 100%, 50%));}</style><div class=player id=castPlayer live=false state=launching><div class=background></div><div class=foreground><video class=mediaElement crossorigin=anonymous id=castMediaElement style=height:100%;width:100%></video><div class=logo></div><div class=spinner></div><div class=splash></div><div class=slideshow id=castSlideshowElement><div class="slide slideshow-image-1"></div><div class="slide slideshow-image-2"></div><div class="slide slideshow-image-3"></div><div class="slide slideshow-image-4"></div><div class="slide slideshow-image-5"></div><div class="slide slideshow-image-6"></div><div class="slide slideshow-image-7"></div><div class="slide slideshow-image-8"></div><div class="slide slideshow-image-9"></div><div class="slide slideshow-image-10"></div></div><div class=gradient></div><div class=watermark></div><div class=breakOverlay><div class=breakMetadata id=castBreakMetadata><div class=breakInfo><span class=breakIcon></span><span class=breakPosition id=castBreakPosition></span><div class=breakTime id=castBreakTime></div></div><div class=breakSkip></div></div></div><div class=overlay><div class=metadata><div class=metadataImage id=castMetadataImage></div><div class=metadataPlaceHolder><div class=metadataTitle id=castMetadataTitle></div><div class=metadataSubtitle id=castMetadataSubtitle></div></div></div><div class=controls><span class=controlsPlayPause></span><span class=controlsCurTime id=castControlsCurTime></span><span class=controlsTotalTime id=castControlsTotalTime></span><div class=controlsProgress id=castControlsProgress><div class="controlsProgressInner progressBar" id=castControlsProgressInner></div><div class=controlsProgressThumb id=castControlsProgressThumb></div></div></div></div></div></div>';
    cast.f.Lh = {};
    var zh = {
        MEDIA_STATUS: "MEDIA_STATUS",
        CLOUD_STATUS: "CLOUD_STATUS",
        QUEUE_CHANGE: "QUEUE_CHANGE",
        QUEUE_ITEMS: "QUEUE_ITEMS",
        QUEUE_ITEM_IDS: "QUEUE_ITEM_IDS",
        GET_STATUS: "GET_STATUS",
        LOAD: "LOAD",
        PAUSE: "PAUSE",
        STOP: "STOP",
        PLAY: "PLAY",
        SKIP_AD: "SKIP_AD",
        PLAY_AGAIN: "PLAY_AGAIN",
        SEEK: "SEEK",
        SET_PLAYBACK_RATE: "SET_PLAYBACK_RATE",
        SET_VOLUME: "SET_VOLUME",
        EDIT_TRACKS_INFO: "EDIT_TRACKS_INFO",
        EDIT_AUDIO_TRACKS: "EDIT_AUDIO_TRACKS",
        PRECACHE: "PRECACHE",
        PRELOAD: "PRELOAD",
        QUEUE_LOAD: "QUEUE_LOAD",
        QUEUE_INSERT: "QUEUE_INSERT",
        QUEUE_UPDATE: "QUEUE_UPDATE",
        QUEUE_REMOVE: "QUEUE_REMOVE",
        QUEUE_REORDER: "QUEUE_REORDER",
        QUEUE_NEXT: "QUEUE_NEXT",
        QUEUE_PREV: "QUEUE_PREV",
        QUEUE_GET_ITEM_RANGE: "QUEUE_GET_ITEM_RANGE",
        QUEUE_GET_ITEMS: "QUEUE_GET_ITEMS",
        QUEUE_GET_ITEM_IDS: "QUEUE_GET_ITEM_IDS",
        QUEUE_SHUFFLE: "QUEUE_SHUFFLE",
        SET_CREDENTIALS: "SET_CREDENTIALS",
        LOAD_BY_ENTITY: "LOAD_BY_ENTITY",
        USER_ACTION: "USER_ACTION",
        DISPLAY_STATUS: "DISPLAY_STATUS",
        FOCUS_STATE: "FOCUS_STATE",
        CUSTOM_COMMAND: "CUSTOM_COMMAND"
    };
    u("cast.framework.messages.MessageType", zh);
    u("cast.framework.messages.ErrorReason", {
        INVALID_COMMAND: "INVALID_COMMAND",
        INVALID_PARAMS: "INVALID_PARAMS",
        INVALID_MEDIA_SESSION_ID: "INVALID_MEDIA_SESSION_ID",
        SKIP_LIMIT_REACHED: "SKIP_LIMIT_REACHED",
        NOT_SUPPORTED: "NOT_SUPPORTED",
        LANGUAGE_NOT_SUPPORTED: "LANGUAGE_NOT_SUPPORTED",
        END_OF_QUEUE: "END_OF_QUEUE",
        DUPLICATE_REQUEST_ID: "DUPLICATE_REQUEST_ID",
        APP_ERROR: "APP_ERROR",
        AUTHENTICATION_EXPIRED: "AUTHENTICATION_EXPIRED",
        PREMIUM_ACCOUNT_REQUIRED: "PREMIUM_ACCOUNT_REQUIRED",
        CONCURRENT_STREAM_LIMIT: "CONCURRENT_STREAM_LIMIT",
        PARENTAL_CONTROL_RESTRICTED: "PARENTAL_CONTROL_RESTRICTED",
        NOT_AVAILABLE_IN_REGION: "NOT_AVAILABLE_IN_REGION",
        CONTENT_ALREADY_PLAYING: "CONTENT_ALREADY_PLAYING",
        INVALID_REQUEST: "INVALID_REQUEST",
        GENERIC_LOAD_ERROR: "GENERIC_LOAD_ERROR"
    });

    function Ah(a) {
        this.type = a;
        this.reason = void 0;
        this.requestId = 0;
        this.customData = void 0
    }
    u("cast.framework.messages.ErrorData", Ah);

    function Bh(a, b) {
        this.start = a;
        this.end = b
    }
    u("cast.framework.messages.Range", Bh);

    function J(a) {
        this.type = a;
        this.requestId = 0;
        this.customData = this.mediaSessionId = void 0
    }
    u("cast.framework.messages.RequestData", J);

    function Ch() {
        J.call(this, "LOAD");
        this.media = new Dh;
        this.autoplay = !1;
        this.currentTime = 0;
        this.playbackRate = 1;
        this.credentialsType = this.credentials = this.queueData = this.activeTrackIds = void 0
    }
    m(Ch, J);
    u("cast.framework.messages.LoadRequestData", Ch);

    function Eh(a) {
        Ch.call(this);
        this.type = "PRELOAD";
        this.itemId = a
    }
    m(Eh, Ch);
    u("cast.framework.messages.PreloadRequestData", Eh);

    function Fh(a, b) {
        J.call(this, "PRECACHE");
        this.precacheData = a;
        this.requestItems = b
    }
    m(Fh, J);
    u("cast.framework.messages.PrecacheRequestData", Fh);

    function Gh() {
        J.call(this, "SET_VOLUME");
        this.volume = new Hh
    }
    m(Gh, J);
    u("cast.framework.messages.VolumeRequestData", Gh);

    function Ih() {
        J.call(this, "EDIT_TRACKS_INFO");
        this.enableTextTracks = this.isSuggestedLanguage = this.textTrackStyle = this.language = this.activeTrackIds = void 0
    }
    m(Ih, J);
    u("cast.framework.messages.EditTracksInfoRequestData", Ih);

    function Jh() {
        J.call(this, "EDIT_AUDIO_TRACKS");
        this.isSuggestedLanguage = this.language = void 0
    }
    m(Jh, J);
    u("cast.framework.messages.EditAudioTracksRequestData", Jh);

    function Kh() {
        J.call(this, "SEEK");
        this.resumeState = void 0;
        this.currentTime = 0;
        this.relativeTime = void 0
    }
    m(Kh, J);
    u("cast.framework.messages.SeekRequestData", Kh);

    function Lh() {
        J.call(this, "SET_PLAYBACK_RATE");
        this.relativePlaybackRate = this.playbackRate = void 0
    }
    m(Lh, J);
    u("cast.framework.messages.SetPlaybackRateRequestData", Lh);

    function Mh() {
        J.call(this, "GET_STATUS");
        this.options = void 0
    }
    m(Mh, J);
    u("cast.framework.messages.GetStatusRequestData", Mh);

    function Nh(a) {
        J.call(this, "QUEUE_LOAD");
        this.repeatMode = void 0;
        this.items = a;
        this.currentTime = this.startIndex = void 0
    }
    m(Nh, J);
    u("cast.framework.messages.QueueLoadRequestData", Nh);

    function Oh(a) {
        J.call(this, "QUEUE_INSERT");
        this.currentTime = this.currentItemId = this.currentItemIndex = this.insertBefore = void 0;
        this.items = a
    }
    m(Oh, J);
    u("cast.framework.messages.QueueInsertRequestData", Oh);

    function Ph() {
        J.call(this, "QUEUE_UPDATE");
        this.shuffle = this.repeatMode = this.items = this.jump = this.currentTime = this.currentItemId = void 0
    }
    m(Ph, J);
    u("cast.framework.messages.QueueUpdateRequestData", Ph);

    function Qh(a) {
        J.call(this, "QUEUE_REMOVE");
        this.currentTime = this.currentItemId = void 0;
        this.itemIds = a
    }
    m(Qh, J);
    u("cast.framework.messages.QueueRemoveRequestData", Qh);

    function Rh(a) {
        J.call(this, "QUEUE_REORDER");
        this.insertBefore = this.currentTime = this.currentItemId = void 0;
        this.itemIds = a
    }
    m(Rh, J);
    u("cast.framework.messages.QueueReorderRequestData", Rh);

    function Sh(a, b, c) {
        J.call(this, "QUEUE_GET_ITEM_RANGE");
        this.itemId = a;
        this.nextCount = b;
        this.prevCount = c
    }
    m(Sh, J);
    u("cast.framework.messages.FetchItemsRequestData", Sh);

    function Th(a) {
        J.call(this, "QUEUE_GET_ITEMS");
        this.itemIds = a
    }
    m(Th, J);
    u("cast.framework.messages.GetItemsInfoRequestData", Th);
    u("cast.framework.messages.HlsSegmentFormat", {
        AAC: "aac",
        AC3: "ac3",
        MP3: "mp3",
        TS: "ts",
        TS_AAC: "ts_aac"
    });
    u("cast.framework.messages.StreamType", {
        BUFFERED: "BUFFERED",
        LIVE: "LIVE",
        NONE: "NONE"
    });
    u("cast.framework.messages.HdrType", {
        SDR: "sdr",
        HDR: "hdr",
        DV: "dv"
    });
    var Uh = {
        INVALID_PLAYER_STATE: "INVALID_PLAYER_STATE",
        LOAD_FAILED: "LOAD_FAILED",
        LOAD_CANCELLED: "LOAD_CANCELLED",
        INVALID_REQUEST: "INVALID_REQUEST",
        ERROR: "ERROR"
    };
    u("cast.framework.messages.ErrorType", Uh);
    u("cast.framework.messages.IdleReason", {
        CANCELLED: "CANCELLED",
        INTERRUPTED: "INTERRUPTED",
        FINISHED: "FINISHED",
        ERROR: "ERROR"
    });
    u("cast.framework.messages.SeekResumeState", {
        PLAYBACK_START: "PLAYBACK_START",
        PLAYBACK_PAUSE: "PLAYBACK_PAUSE"
    });
    u("cast.framework.messages.PlayerState", {
        PLAYING: "PLAYING",
        PLAYING: "PLAYING",
        PAUSED: "PAUSED",
        PLAYING: "PLAYING"
    });
    u("cast.framework.messages.ExtendedPlayerState", {
        PLAYING: "PLAYING"
    });

    function Dh() {
        this.contentId = "";
        this.contentUrl = void 0;
        this.streamType = "NONE";
        this.contentType = "";
        this.hlsSegmentFormat = this.breakClips = this.breaks = this.customData = this.textTrackStyle = this.tracks = this.duration = this.entity = this.metadata = void 0
    }
    u("cast.framework.messages.MediaInformation", Dh);

    function Vh(a, b, c, d, e, f, h) {
        this.id = a;
        this.queueType = this.entity = void 0;
        this.name = b;
        this.description = c;
        this.repeatMode = d;
        this.items = e;
        this.startIndex = f;
        this.startTime = h
    }
    u("cast.framework.messages.QueueData", Vh);
    u("cast.framework.messages.QueueType", {
        ALBUM: "ALBUM",
        PLAYLIST: "PLAYLIST",
        AUDIOBOOK: "AUDIOBOOK",
        RADIO_STATION: "RADIO_STATION",
        PODCAST_SERIES: "PODCAST_SERIES",
        TV_SERIES: "TV_SERIES",
        VIDEO_PLAYLIST: "VIDEO_PLAYLIST",
        LIVE_TV: "LIVE_TV",
        MOVIE: "MOVIE"
    });
    u("cast.framework.messages.StreamingProtocolType", {
        UNKNOWN: 0,
        MPEG_DASH: 1,
        HLS: 2,
        SMOOTH_STREAMING: 3
    });
    u("cast.framework.messages.RequestItem", function() {
        this.url = "";
        this.hlsSegmentFormat = this.initialTime = this.protocolType = void 0
    });
    u("cast.framework.messages.MetadataType", {
        GENERIC: 0,
        MOVIE: 1,
        TV_SHOW: 2,
        MUSIC_TRACK: 3,
        PHOTO: 4
    });

    function Wh(a) {
        this.metadataType = a
    }
    u("cast.framework.messages.MediaMetadata", Wh);

    function Xh() {
        this.metadataType = 0;
        this.releaseDate = this.releaseYear = this.images = this.subtitle = this.title = void 0
    }
    m(Xh, Wh);
    u("cast.framework.messages.GenericMediaMetadata", Xh);

    function Yh() {
        this.metadataType = 1;
        this.releaseDate = this.releaseYear = this.images = this.subtitle = this.studio = this.title = void 0
    }
    m(Yh, Wh);
    u("cast.framework.messages.MovieMediaMetadata", Yh);

    function Zh() {
        this.metadataType = 2;
        this.originalAirdate = this.releaseYear = this.images = this.episode = this.episodeNumber = this.season = this.seasonNumber = this.episodeTitle = this.title = this.seriesTitle = void 0
    }
    m(Zh, Wh);
    u("cast.framework.messages.TvShowMediaMetadata", Zh);

    function $h() {
        this.metadataType = 3;
        this.releaseDate = this.releaseYear = this.images = this.discNumber = this.trackNumber = this.artistName = this.songName = this.composer = this.artist = this.albumArtist = this.title = this.albumName = void 0
    }
    m($h, Wh);
    u("cast.framework.messages.MusicTrackMediaMetadata", $h);

    function ai() {
        this.metadataType = 4;
        this.creationDateTime = this.height = this.width = this.longitude = this.latitude = this.images = this.location = this.artist = this.title = void 0
    }
    m(ai, Wh);
    u("cast.framework.messages.PhotoMediaMetadata", ai);
    u("cast.framework.messages.Image", function(a) {
        this.url = a;
        this.width = this.height = void 0
    });

    function Hh() {
        this.muted = this.level = void 0
    }
    u("cast.framework.messages.Volume", Hh);
    u("cast.framework.messages.VideoInformation", function(a, b, c) {
        this.width = a;
        this.height = b;
        this.hdrType = c
    });

    function bi() {
        this.type = "MEDIA_STATUS";
        this.mediaSessionId = 0;
        this.videoInfo = this.queueData = this.media = void 0;
        this.playbackRate = 1;
        this.playerState = "PLAYING";
        this.idleReason = void 0;
        this.supportedMediaCommands = this.currentTime = 0;
        this.volume = new Hh;
        this.extendedStatus = this.breakStatus = this.repeatMode = this.items = this.customData = this.preloadedItemId = this.loadingItemId = this.currentItemId = this.activeTrackIds = void 0
    }
    u("cast.framework.messages.MediaStatus", bi);
    u("cast.framework.messages.ExtendedMediaStatus", function(a, b) {
        this.playerState = a;
        this.media = b
    });

    function ci() {
        bi.call(this)
    }
    m(ci, bi);
    u("cast.framework.messages.CloudMediaStatus", ci);
    u("cast.framework.messages.Command", {
        PAUSE: 1,
        SEEK: 2,
        STREAM_VOLUME: 4,
        STREAM_MUTE: 8,
        ALL_BASIC_MEDIA: 15,
        QUEUE_NEXT: 64,
        QUEUE_PREV: 128,
        QUEUE_SHUFFLE: 256
    });
    u("cast.framework.messages.TrackType", {
        TEXT: "TEXT",
        AUDIO: "AUDIO",
        VIDEO: "VIDEO"
    });
    u("cast.framework.messages.TextTrackType", {
        SUBTITLES: "SUBTITLES",
        CAPTIONS: "CAPTIONS",
        DESCRIPTIONS: "DESCRIPTIONS",
        CHAPTERS: "CHAPTERS",
        METADATA: "METADATA"
    });
    u("cast.framework.messages.TextTrackEdgeType", {
        NONE: "NONE",
        OUTLINE: "OUTLINE",
        DROP_SHADOW: "DROP_SHADOW",
        RAISED: "RAISED",
        DEPRESSED: "DEPRESSED"
    });
    u("cast.framework.messages.TextTrackWindowType", {
        NONE: "NONE",
        NORMAL: "NORMAL",
        ROUNDED_CORNERS: "ROUNDED_CORNERS"
    });
    u("cast.framework.messages.TextTrackFontGenericFamily", {
        SANS_SERIF: "SANS_SERIF",
        MONOSPACED_SANS_SERIF: "MONOSPACED_SANS_SERIF",
        SERIF: "SERIF",
        MONOSPACED_SERIF: "MONOSPACED_SERIF",
        CASUAL: "CASUAL",
        CURSIVE: "CURSIVE",
        SMALL_CAPITALS: "SMALL_CAPITALS"
    });
    u("cast.framework.messages.TextTrackFontStyle", {
        NORMAL: "NORMAL",
        BOLD: "BOLD",
        BOLD_ITALIC: "BOLD_ITALIC",
        ITALIC: "ITALIC"
    });
    u("cast.framework.messages.Track", function(a, b) {
        this.trackId = a;
        this.trackContentType = this.trackContentId = void 0;
        this.type = b;
        this.customData = this.subtype = this.language = this.name = void 0
    });
    u("cast.framework.messages.TextTrackStyle", function() {
        this.customData = this.fontStyle = this.fontGenericFamily = this.fontFamily = this.windowRoundedCornerRadius = this.windowColor = this.windowType = this.edgeColor = this.edgeType = this.backgroundColor = this.foregroundColor = this.fontScale = void 0
    });
    u("cast.framework.messages.RepeatMode", {
        REPEAT_OFF: "REPEAT_OFF",
        REPEAT_ALL: "REPEAT_ALL",
        REPEAT_SINGLE: "REPEAT_SINGLE",
        REPEAT_ALL_AND_SHUFFLE: "REPEAT_ALL_AND_SHUFFLE"
    });
    u("cast.framework.messages.QueueChangeType", {
        INSERT: "INSERT",
        REMOVE: "REMOVE",
        ITEMS_CHANGE: "ITEMS_CHANGE",
        UPDATE: "UPDATE",
        NO_CHANGE: "NO_CHANGE"
    });
    u("cast.framework.messages.QueueChange", function() {
        this.type = "QUEUE_CHANGE";
        this.sequenceNumber = this.insertBefore = this.itemIds = this.changeType = this.requestId = void 0
    });
    u("cast.framework.messages.ItemsInfo", function() {
        this.type = "QUEUE_ITEMS";
        this.items = this.requestId = void 0
    });
    u("cast.framework.messages.QueueIds", function() {
        this.type = "QUEUE_ITEM_IDS";
        this.itemIds = this.requestId = void 0
    });
    u("cast.framework.messages.GetStatusOptions", {
        NO_METADATA: 1,
        NO_QUEUE_ITEMS: 2
    });

    function di(a, b, c) {
        this.id = a;
        this.breakClipIds = b;
        this.position = c;
        this.duration = void 0;
        this.isWatched = !1;
        this.isEmbedded = void 0
    }
    u("cast.framework.messages.Break", di);
    u("cast.framework.messages.BreakClip", function(a) {
        this.id = a;
        this.customData = this.hlsSegmentFormat = this.clickThroughUrl = this.posterUrl = this.whenSkippable = this.duration = this.title = this.contentType = this.contentUrl = this.contentId = void 0
    });
    u("cast.framework.messages.BreakStatus", function(a, b) {
        this.currentBreakTime = a;
        this.currentBreakClipTime = b;
        this.whenSkippable = this.breakClipId = this.breakId = void 0
    });
    u("cast.framework.messages.PlayStringId", {
        FREE_TRIAL_ABOUT_TO_EXPIRE: "FREE_TRIAL_ABOUT_TO_EXPIRE",
        SUBSCRIPTION_ABOUT_TO_EXPIRE: "SUBSCRIPTION_ABOUT_TO_EXPIRE",
        STREAM_HIJACKED: "STREAM_HIJACKED"
    });

    function ei() {
        J.call(this, "SET_CREDENTIALS")
    }
    m(ei, J);
    u("cast.framework.messages.SetCredentialsRequestData", ei);

    function fi() {
        J.call(this, "LOAD_BY_ENTITY")
    }
    m(fi, J);
    u("cast.framework.messages.LoadByEntityRequestData", fi);

    function gi() {
        J.call(this, "CUSTOM_COMMAND")
    }
    m(gi, J);
    u("cast.framework.messages.CustomCommandRequestData", gi);
    u("cast.framework.messages.ScriptAction", function(a, b) {
        this.app_id = a;
        this.action = b;
        this.custom_data = void 0
    });
    u("cast.framework.messages.UserAction", {
        LIKE: "LIKE",
        DISLIKE: "DISLIKE",
        FOLLOW: "FOLLOW",
        UNFOLLOW: "UNFOLLOW",
        FLAG: "FLAG",
        SKIP_AD: "SKIP_AD"
    });
    u("cast.framework.messages.UserActionContext", {
        UNKNOWN_CONTEXT: "UNKNOWN_CONTEXT",
        TRACK: "TRACK",
        ALBUM: "ALBUM",
        ARTIST: "ARTIST",
        PLAYLIST: "PLAYLIST",
        EPISODE: "EPISODE",
        SERIES: "SERIES",
        MOVIE: "MOVIE",
        CHANNEL: "CHANNEL",
        TEAM: "TEAM",
        PLAYER: "PLAYER",
        COACH: "COACH"
    });

    function hi() {
        J.call(this, "USER_ACTION")
    }
    m(hi, J);
    u("cast.framework.messages.UserActionRequestData", hi);

    function ii() {
        J.call(this, "DISPLAY_STATUS")
    }
    m(ii, J);
    u("cast.framework.messages.DisplayStatusRequestData", ii);

    function ji() {
        J.call(this, "FOCUS_STATE")
    }
    m(ji, J);
    u("cast.framework.messages.FocusStateRequestData", ji);
    u("cast.framework.messages.FocusState", {
        IN_FOCUS: "IN_FOCUS",
        NOT_IN_FOCUS: "NOT_IN_FOCUS"
    });
    u("cast.framework.messages.QueueItem", function(a) {
        this.itemId = a;
        this.customData = this.activeTrackIds = this.preloadTime = this.playbackDuration = this.startTime = this.autoplay = this.media = void 0
    });
    cast.f.I = {};

    function ki(a) {
        this.type = a
    }
    u("cast.framework.system.Event", ki);
    u("cast.framework.system.MessageType", {
        STRING: "STRING",
        JSON: "JSON"
    });
    u("cast.framework.system.ApplicationData", function() {
        this.name = this.id = "";
        this.sessionId = 0;
        this.namespaces = [];
        this.launchingSenderId = ""
    });
    u("cast.framework.system.SystemVolumeData", function() {
        this.level = 1;
        this.muted = !1
    });
    u("cast.framework.system.Sender", function() {
        this.userAgent = this.id = ""
    });
    u("cast.framework.system.VisibilityState", {
        VISIBLE: "visible",
        NOT_VISIBLE: "notvisible",
        UNKNOWN: "unknown"
    });
    u("cast.framework.system.StandbyState", {
        STANDBY: "standby",
        NOT_STANDBY: "notstandby",
        UNKNOWN: "unknown"
    });
    u("cast.framework.system.SystemState", {
        NOT_STARTED: "notstarted",
        STARTING_IN_BACKGROUND: "startinginbackground",
        STARTING: "starting",
        READY: "ready",
        STOPPING_IN_BACKGROUND: "stoppinginbackground",
        STOPPING: "stopping"
    });
    u("cast.framework.system.DeviceCapabilities", {
        ASSISTANT_SUPPORTED: "assistant_supported",
        BLUETOOTH_SUPPORTED: "bluetooth_supported",
        DISPLAY_SUPPORTED: "display_supported",
        HI_RES_AUDIO_SUPPORTED: "hi_res_audio_supported",
        IS_DV_SUPPORTED: "is_dv_supported",
        IS_HDR_SUPPORTED: "is_hdr_supported"
    });
    u("cast.framework.system.EventType", {
        READY: "ready",
        SHUTDOWN: "shutdown",
        SENDER_CONNECTED: "senderconnected",
        SENDER_DISCONNECTED: "senderdisconnected",
        ERROR: "error",
        SYSTEM_VOLUME_CHANGED: "systemvolumechanged",
        VISIBILITY_CHANGED: "visibilitychanged",
        STANDBY_CHANGED: "standbychanged",
        MAX_VIDEO_RESOLUTION_CHANGED: "maxvideoresolutionchanged",
        FEEDBACK_STARTED: "feedbackstarted"
    });
    u("cast.framework.system.DisconnectReason", {
        REQUESTED_BY_SENDER: "requested_by_sender",
        ERROR: "error",
        UNKNOWN: "unknown"
    });

    function li(a, b, c) {
        this.type = "senderdisconnected";
        this.senderId = a;
        this.userAgent = b;
        this.reason = c
    }
    m(li, ki);
    u("cast.framework.system.SenderDisconnectedEvent", li);

    function mi(a, b) {
        this.type = "senderconnected";
        this.senderId = a;
        this.userAgent = b
    }
    m(mi, ki);
    u("cast.framework.system.SenderConnectedEvent", mi);

    function ni(a) {
        this.type = "visibilitychanged";
        this.isVisible = a
    }
    m(ni, ki);
    u("cast.framework.system.VisibilityChangedEvent", ni);

    function oi(a) {
        this.type = "standbychanged";
        this.isStandby = a
    }
    m(oi, ki);
    u("cast.framework.system.StandbyChangedEvent", oi);

    function pi(a) {
        this.type = "systemvolumechanged";
        this.data = a
    }
    m(pi, ki);
    u("cast.framework.system.SystemVolumeChangedEvent", pi);

    function qi(a) {
        this.type = "ready";
        this.data = a
    }
    m(qi, ki);
    u("cast.framework.system.ReadyEvent", qi);

    function ri() {
        this.type = "shutdown"
    }
    m(ri, ki);
    u("cast.framework.system.ShutdownEvent", ri);

    function si() {
        this.type = "feedbackstarted"
    }
    m(si, ki);
    u("cast.framework.system.FeedbackStartedEvent", si);

    function ti(a) {
        this.type = "maxvideoresolutionchanged";
        this.height = a
    }
    m(ti, ki);
    u("cast.framework.system.MaxVideoResolutionChangedEvent", ti);
    cast.f.VERSION = "3.0.0007";
    u("cast.framework.VERSION", cast.f.VERSION);
    var ui = {
            CEA608: "text/cea608",
            TTML: "application/ttml+xml",
            Dh: "text/vtt",
            Ch: "application/mp4"
        },
        vi = {
            HLS: "application/x-mpegurl",
            xh: "application/vnd.apple.mpegurl",
            uh: "application/dash+xml",
            Ah: "application/vnd.ms-sstr+xml"
        },
        wi = {
            ph: "audio_video",
            oh: "audio_only",
            IMAGE: "image"
        };
    cast.f.da = {};
    cast.f.da.je = "Skippable after {SECONDS} sec(s)";
    cast.f.da.Vd = new ih(cast.f.da.je);
    cast.f.da.Mf = function(a) {
        var b = {
            SECONDS: a
        };
        a = cast.f.da.Vd;
        if (a.g) {
            a.h = [];
            var c = qh(a, a.g);
            a.b = vh(a, c);
            a.g = null
        }
        if (a.b && 0 != a.b.length) {
            c = a.h;
            var d = c.length;
            if (0 < d) {
                for (var e = Array(d), f = 0; f < d; f++) e[f] = c[f];
                c = e
            } else c = [];
            a.a = c;
            c = [];
            oh(a, a.b, b, !1, c);
            for (b = c.join(""); 0 < a.a.length;) b = b.replace(a.c(a.a), a.a.pop());
            a = b
        } else a = "";
        return a
    };
    cast.f.da.ie = "Ad";
    cast.f.da.ke = "Skip Ad";
    cast.f.o = {};
    cast.f.o.jd = function(a) {
        return a
    };
    cast.f.o.Lf = function(a) {
        return a
    };
    cast.f.o.Hf = function(a) {
        return a
    };
    cast.f.o.If = function(a) {
        return a
    };
    cast.f.o.yf = function(a) {
        return a
    };
    cast.f.o.Jf = function(a) {
        return a
    };
    cast.f.o.Od = function(a) {
        return a
    };
    cast.f.o.fh = function(a) {
        return a
    };
    cast.f.o.eh = function(a) {
        return a
    };
    cast.f.o.gh = function(a) {
        return a
    };
    cast.f.o.dh = function(a) {
        return a
    };
    cast.f.o.Bf = function(a) {
        return a
    };
    cast.f.o.zf = function(a) {
        return a
    };
    cast.f.o.ih = function(a) {
        return a
    };
    cast.f.o.Cf = function(a) {
        return a
    };
    cast.f.o.jh = function(a) {
        return a
    };
    cast.f.o.hh = function(a) {
        return a
    };
    cast.f.o.Fh = function(a) {
        return a
    };
    cast.f.o.Af = function(a) {
        return a
    };
    cast.f.o.Df = function(a) {
        return a
    };
    cast.f.o.Gf = function(a) {
        return a
    };
    cast.f.o.kh = function(a) {
        return a
    };
    cast.f.o.kd = function(a) {
        return a
    };
    cast.f.o.Nh = function(a) {
        return a
    };
    cast.f.o.ld = function(a) {
        return a
    };
    cast.f.o.Qd = function(a) {
        return a
    };
    cast.f.o.Kf = function(a) {
        return a
    };
    cast.f.o.Pd = function(a) {
        return a
    };
    cast.f.o.bh = function(a) {
        return a
    };
    cast.f.o.Mh = function(a) {
        return a
    };
    cast.f.o.Ef = function(a) {
        return a
    };
    cast.f.o.Ff = function(a) {
        return a
    };
    cast.f.o.Nd = function(a) {
        return a
    };
    cast.f.media = {};
    cast.f.media.U = {};
    cast.f.media.U.getTrackById = function(a, b) {
        return b.find(function(b) {
            return b.trackId == a
        }) || null
    };
    cast.f.media.U.jc = function(a, b) {
        return b.filter(function(b) {
            return b.language && cast.receiver.Aa(b.language, a)
        })
    };
    cast.f.media.U.xd = function(a, b) {
        return 0 !== cast.f.media.U.jc(a, b).length
    };
    cast.f.media.U.nh = function(a) {
        if (a.find(function(a) {
                return "TEXT" != a.type
            })) throw Error("Type is not matching.");
    };
    cast.f.media.U.Ud = function(a, b) {
        if (b.filter(function(b) {
                return a.includes(b.trackId)
            }).length !== a.length) throw Error("Invalid id.");
    };

    function xi() {}

    function K(a) {
        if (!(a instanceof xi)) throw A(yi, "Proper AudioTracksManager object can be acquried by calling cast.framework.PlayerManager.getAudioTracksManager()"), Error("AudioTracksManager is not created properly.");
        this.a = this.b = null
    }
    u("cast.framework.AudioTracksManager", K);
    K.prototype.reset = function() {
        this.a = null
    };

    function zi(a) {
        if (!a.a || !L(a.a)) throw Error("Tracks info is not available.");
    }
    K.prototype.getTracks = function() {
        zi(this);
        var a = L(this.a).getTracks("AUDIO");
        return cast.f.o.ld(a)
    };
    K.prototype.getTracks = K.prototype.getTracks;
    K.prototype.getTrackById = function(a) {
        zi(this);
        if (0 > a) throw Error("Invalid track id.");
        return cast.f.media.U.getTrackById(a, this.getTracks())
    };
    K.prototype.getTrackById = K.prototype.getTrackById;
    K.prototype.mc = function(a) {
        if (!a) throw Error("Need language as input.");
        return cast.f.media.U.jc(a, this.getTracks())
    };
    K.prototype.getTracksByLanguage = K.prototype.mc;
    K.prototype.Pf = function() {
        zi(this);
        var a = L(this.a).b;
        return null === a ? null : this.getTrackById(a)
    };
    K.prototype.getActiveTrack = K.prototype.Pf;
    K.prototype.Nf = function() {
        zi(this);
        return L(this.a).b
    };
    K.prototype.getActiveId = K.prototype.Nf;
    K.prototype.Vg = function(a) {
        zi(this);
        if (null === a) B(yi, "No valid id, persist the current behavior.");
        else {
            cast.f.media.U.Ud([a], this.getTracks());
            var b = L(this.a).c;
            b = b.concat(a);
            Ai(L(this.a), b);
            this.b && Fg(this.b, L(this.a).S(), !1)
        }
    };
    K.prototype.setActiveById = K.prototype.Vg;
    K.prototype.yc = function(a) {
        zi(this);
        if (!cast.f.media.U.xd(a, this.getTracks())) throw Error("No matching track.");
        Bi(L(this.a), a);
        this.b && Fg(this.b, L(this.a).S(), !1)
    };
    K.prototype.setActiveByLanguage = K.prototype.yc;
    K.prototype.S = function() {
        zi(this);
        return L(this.a).S()
    };
    var yi = w("cast.framework.AudioTracksManager");
    u("cast.framework.NetworkRequestInfo", function() {
        this.headers = this.url = null;
        this.withCredentials = !1;
        this.content = null
    });

    function Ci(a, b, c) {
        this.seekFrom = a;
        this.seekTo = b;
        this.breaks = c
    }
    u("cast.framework.BreakSeekData", Ci);

    function M() {
        this.a = [];
        this.b = [];
        this.c = this.g.bind(this)
    }
    u("cast.framework.BreakManager", M);

    function Di(a, b) {
        return a.c(b)
    }
    M.prototype.reset = function() {
        this.a = [];
        this.b = []
    };
    M.prototype.pb = function() {
        return this.a
    };
    M.prototype.getBreaks = M.prototype.pb;
    M.prototype.Sf = function(a) {
        return this.a.find(function(b) {
            return a == b.id
        }) || null
    };
    M.prototype.getBreakById = M.prototype.Sf;
    M.prototype.Tf = function() {
        return this.b
    };
    M.prototype.getBreakClips = M.prototype.Tf;
    M.prototype.nd = function(a) {
        return this.b.find(function(b) {
            return a == b.id
        }) || null
    };
    M.prototype.getBreakClipById = M.prototype.nd;
    M.prototype.Xg = function(a) {
        this.c = a || this.g.bind(this)
    };
    M.prototype.setBreakSeekHandler = M.prototype.Xg;
    M.prototype.g = function(a) {
        var b = a.seekFrom > a.seekTo,
            c = a.breaks.length;
        1 < c && (a.breaks = [a.breaks[b ? 0 : c - 1]]);
        return a
    };

    function Ei() {}
    u("cast.framework.CastReceiverOptions", Ei);

    function Fi() {}
    u("cast.framework.PlaybackConfig", Fi);

    function Gi() {}

    function N(a) {
        if (!(a instanceof Gi)) throw A(N.D, "Proper QueueManager object can be acquried by calling cast.framework.PlayerManager.getQueueManager()"), Error("QueueManager is not created properly.");
        this.a = null
    }
    u("cast.framework.QueueManager", N);
    N.prototype.Ka = function() {
        return cast.f.o.Ff(gg(this.a).Ka(!0))
    };
    N.prototype.getItems = N.prototype.Ka;
    N.prototype.pa = function() {
        return cast.f.o.Ef(gg(this.a).pa())
    };
    N.prototype.getCurrentItem = N.prototype.pa;
    N.prototype.qb = function() {
        return gg(this.a).qb()
    };
    N.prototype.getCurrentItemIndex = N.prototype.qb;
    N.prototype.oc = function(a, b) {
        a = new Og(cast.f.o.Nd(a));
        a.insertBefore = b;
        this.a.ia(a)
    };
    N.prototype.insertItems = N.prototype.oc;
    N.prototype.wc = function(a) {
        this.a.ia(new Pg(a))
    };
    N.prototype.removeItems = N.prototype.wc;
    N.prototype.Gc = function(a) {
        var b = new rg;
        b.items = cast.f.o.Nd(a);
        this.a.ia(b)
    };
    N.prototype.updateItems = N.prototype.Gc;

    function Hi() {}

    function O(a) {
        if (!(a instanceof Hi)) throw A(O.D, "Proper TextTracksManager object can be acquried by calling cast.framework.PlayerManager.getTextTracksManager()"), Error("TextTracksManager is not created properly.");
        this.a = this.b = null
    }
    u("cast.framework.TextTracksManager", O);
    O.prototype.reset = function() {
        this.a = null
    };

    function Ii(a) {
        if (!a.a || !L(a.a)) throw Error("Tracks info is not available.");
    }
    O.prototype.getTracks = function() {
        Ii(this);
        var a = L(this.a).getTracks("TEXT");
        return cast.f.o.ld(a)
    };
    O.prototype.getTracks = O.prototype.getTracks;
    O.prototype.getTrackById = function(a) {
        Ii(this);
        if (0 > a) throw Error("Invalid input.");
        return cast.f.media.U.getTrackById(a, this.getTracks())
    };
    O.prototype.getTrackById = O.prototype.getTrackById;
    O.prototype.mc = function(a) {
        if (!a) throw Error("Need language as input.");
        return cast.f.media.U.jc(a, this.getTracks())
    };
    O.prototype.getTracksByLanguage = O.prototype.mc;
    O.prototype.Qf = function() {
        var a = this.getTracks(),
            b = L(this.a).c,
            c = [];
        a = k(a);
        for (var d = a.next(); !d.done; d = a.next()) d = d.value, b.includes(d.trackId) && c.push(d);
        return c
    };
    O.prototype.getActiveTracks = O.prototype.Qf;
    O.prototype.Of = function() {
        Ii(this);
        return L(this.a).c
    };
    O.prototype.getActiveIds = O.prototype.Of;
    O.prototype.ra = function() {
        Ii(this);
        return cast.f.o.kd(L(this.a).ra("TEXT"))
    };
    O.prototype.createTrack = O.prototype.ra;
    O.prototype.ye = function(a) {
        Ii(this);
        cast.f.media.U.nh(a);
        Ji(L(this.a), cast.f.o.Qd(a));
        this.b && Fg(this.b, L(this.a).S())
    };
    O.prototype.addTracks = O.prototype.ye;
    O.prototype.Wg = function(a) {
        Ii(this);
        null === a || 0 === a.length ? Ai(L(this.a), []) : (cast.f.media.U.Ud(a, this.getTracks()), Ai(L(this.a), a), this.b && Fg(this.b, L(this.a).S(), !1))
    };
    O.prototype.setActiveByIds = O.prototype.Wg;
    O.prototype.yc = function(a) {
        Ii(this);
        if (!cast.f.media.U.xd(a, this.getTracks())) throw Error("No matching track.");
        Ki(L(this.a), a);
        this.b && Fg(this.b, L(this.a).S(), !1)
    };
    O.prototype.setActiveByLanguage = O.prototype.yc;
    O.prototype.qa = function(a) {
        Ii(this);
        L(this.a).qa(cast.f.o.Pd(a));
        this.b && Fg(this.b, L(this.a).S())
    };
    O.prototype.setTextTrackStyle = O.prototype.qa;
    O.prototype.ya = function() {
        Ii(this);
        var a = L(this.a).ya();
        if (p(a)) return cast.f.o.Kf(a)
    };
    O.prototype.getTextTracksStyle = O.prototype.ya;
    O.prototype.S = function() {
        Ii(this);
        return L(this.a).S()
    };
    cast.f.common = {};

    function Li() {
        this.b = {};
        this.c = {};
        this.g = {};
        this.a = this.h.bind(this)
    }

    function P(a, b, c) {
        a.g[b] = c || r
    }
    Li.prototype.ab = function(a, b) {
        this.b[a] = b || r
    };
    Li.prototype.h = function(a) {
        var b = a.type;
        C(Mi, "onEvent for " + b);
        var c = this.b[b],
            d = this.c[b],
            e = this.g[b];
        d && d(a);
        c && (a = c(a));
        return Promise.resolve(a).then(function(a) {
            return a && a.type == b && e ? e(a) : a
        })
    };

    function Ni(a, b) {
        cb(b, function(b, d) {
            a.c[d] = b || r
        })
    }
    var Mi = w("cast.framework.common.EventHandler");
    cast.f.fa = {};
    var Oi = w("cast.framework.events.EventTarget");

    function Pi(a, b) {
        this.handleEvent = a;
        this.a = b
    }

    function Qi() {
        y.call(this);
        this.a = {};
        this.b = this.c = null
    }
    m(Qi, y);
    g = Qi.prototype;
    g.addEventListener = function(a, b, c) {
        if (this.g) A(Oi, "Trying to add an event listener for " + a + " to a disposed EventTarget");
        else {
            this.a[a] || (this.a[a] = []);
            for (var d = k(this.a[a]), e = d.next(); !e.done; e = d.next())
                if (e.value.handleEvent === b) return;
            this.a[a].push(new Pi(b, c))
        }
    };
    g.removeEventListener = function(a, b) {
        if (this.g) A(Oi, "Trying to remove an event listener for " + a + " from a disposed EventTarget");
        else if (a = this.a[a]) {
            var c = a.findIndex(function(a) {
                return a.handleEvent === b
            });
            0 <= c && a.splice(c, 1)
        }
    };
    g.Bc = function(a) {
        this.g ? A(Oi, "Trying to set a parent EventTarget for a disposed EventTarget") : this.c = a
    };

    function Ri(a, b, c) {
        var d = a.a[b];
        d && d.slice().forEach(function(d) {
            try {
                d.handleEvent.call(d.a, c)
            } catch (f) {
                A(Oi, "Handler for " + b + " encountered an error."), a.b && a.b(b, f), window.setTimeout(function() {
                    throw f;
                }, 0)
            }
        })
    }
    g.dispatchEvent = function(a) {
        var b = a.type;
        this.g ? A(Oi, "Trying to dispatch an event (" + a.type + ") on a disposed EventTarget") : (this.c && this.c.dispatchEvent(a), Ri(this, b, a), Ri(this, "*", a))
    };

    function Si(a, b) {
        a.b = b
    }
    g.V = function() {
        this.a = {};
        this.b = this.c = null
    };
    var Ti = {
        ALL: "*",
        ABORT: "ABORT",
        CAN_PLAY: "CAN_PLAY",
        CAN_PLAY_THROUGH: "CAN_PLAY_THROUGH",
        DURATION_CHANGE: "DURATION_CHANGE",
        EMPTIED: "EMPTIED",
        ENDED: "ENDED",
        LOADED_DATA: "LOADED_DATA",
        LOADED_METADATA: "LOADED_METADATA",
        LOAD_START: "LOAD_START",
        PAUSE: "PAUSE",
        PLAY: "PLAY",
        PLAYING: "PLAYING",
        PROGRESS: "PROGRESS",
        RATE_CHANGE: "RATE_CHANGE",
        SEEKED: "SEEKED",
        SEEKING: "SEEKING",
        STALLED: "STALLED",
        TIME_UPDATE: "TIME_UPDATE",
        SUSPEND: "SUSPEND",
        WAITING: "WAITING",
        BITRATE_CHANGED: "BITRATE_CHANGED",
        BREAK_STARTED: "BREAK_STARTED",
        BREAK_ENDED: "BREAK_ENDED",
        BREAK_CLIP_PLAYING: "BREAK_CLIP_PLAYING",
        BREAK_CLIP_STARTED: "BREAK_CLIP_STARTED",
        BREAK_CLIP_ENDED: "BREAK_CLIP_ENDED",
        PLAYING: "PLAYING",
        CACHE_LOADED: "CACHE_LOADED",
        CACHE_HIT: "CACHE_HIT",
        CACHE_INSERTED: "CACHE_INSERTED",
        CLIP_STARTED: "CLIP_STARTED",
        CLIP_ENDED: "CLIP_ENDED",
        EMSG: "EMSG",
        ERROR: "ERROR",
        ID3: "ID3",
        MEDIA_STATUS: "MEDIA_STATUS",
        MEDIA_FINISHED: "MEDIA_FINISHED",
        PLAYER_PREPLAYING: "PLAYER_PREPLAYING",
        PLAYER_PREPLAYING_CANCELLED: "PLAYER_PREPLAYING_CANCELLED",
        PLAYER_LOAD_COMPLETE: "PLAYER_LOAD_COMPLETE",
        PLAYER_PLAYING: "PLAYER_PLAYING",
        SEGMENT_DOWNLOADED: "SEGMENT_DOWNLOADED",
        REQUEST_SEEK: "REQUEST_SEEK",
        REQUEST_LOAD: "REQUEST_LOAD",
        REQUEST_STOP: "REQUEST_STOP",
        REQUEST_PAUSE: "REQUEST_PAUSE",
        REQUEST_PLAY: "REQUEST_PLAY",
        REQUEST_SKIP_AD: "REQUEST_SKIP_AD",
        REQUEST_PLAY_AGAIN: "REQUEST_PLAY_AGAIN",
        REQUEST_PLAYBACK_RATE_CHANGE: "REQUEST_PLAYBACK_RATE_CHANGE",
        REQUEST_VOLUME_CHANGE: "REQUEST_VOLUME_CHANGE",
        REQUEST_EDIT_TRACKS_INFO: "REQUEST_EDIT_TRACKS_INFO",
        REQUEST_EDIT_AUDIO_TRACKS: "REQUEST_EDIT_AUDIO_TRACKS",
        REQUEST_SET_CREDENTIALS: "REQUEST_SET_CREDENTIALS",
        REQUEST_LOAD_BY_ENTITY: "REQUEST_LOAD_BY_ENTITY",
        REQUEST_USER_ACTION: "REQUEST_USER_ACTION",
        REQUEST_DISPLAY_STATUS: "REQUEST_DISPLAY_STATUS",
        REQUEST_CUSTOM_COMMAND: "REQUEST_CUSTOM_COMMAND",
        REQUEST_FOCUS_STATE: "REQUEST_FOCUS_STATE",
        REQUEST_QUEUE_LOAD: "REQUEST_QUEUE_LOAD",
        REQUEST_QUEUE_INSERT: "REQUEST_QUEUE_INSERT",
        REQUEST_QUEUE_UPDATE: "REQUEST_QUEUE_UPDATE",
        REQUEST_QUEUE_REMOVE: "REQUEST_QUEUE_REMOVE",
        REQUEST_QUEUE_REORDER: "REQUEST_QUEUE_REORDER",
        REQUEST_QUEUE_GET_ITEM_RANGE: "REQUEST_QUEUE_GET_ITEM_RANGE",
        REQUEST_QUEUE_GET_ITEMS: "REQUEST_QUEUE_GET_ITEMS",
        REQUEST_QUEUE_GET_ITEM_IDS: "REQUEST_QUEUE_GET_ITEM_IDS",
        INBAND_TRACK_ADDED: "INBAND_TRACK_ADDED"
    };
    u("cast.framework.events.EventType", Ti);
    cast.f.common.K = {};
    var Q = {},
        Ui = (Q["*"] = 1, Q.ABORT = 2, Q.CAN_PLAY = 3, Q.CAN_PLAY_THROUGH = 4, Q.DURATION_CHANGE = 5, Q.EMPTIED = 6, Q.ENDED = 7, Q.LOADED_DATA = 8, Q.LOADED_METADATA = 9, Q.LOAD_START = 10, Q.PAUSE = 11, Q.PLAY = 12, Q.PLAYING = 13, Q.PROGRESS = 14, Q.RATE_CHANGE = 15, Q.SEEKED = 16, Q.SEEKING = 17, Q.STALLED = 18, Q.TIME_UPDATE = 19, Q.SUSPEND = 20, Q.WAITING = 21, Q.BITRATE_CHANGED = 22, Q.BREAK_STARTED = 23, Q.BREAK_ENDED = 24, Q.BREAK_CLIP_PLAYING = 25, Q.BREAK_CLIP_STARTED = 26, Q.BREAK_CLIP_ENDED = 27, Q.PLAYING = 28, Q.CACHE_LOADED = 29, Q.CACHE_HIT = 30, Q.CACHE_INSERTED = 31,
            Q.CLIP_STARTED = 32, Q.CLIP_ENDED = 33, Q.EMSG = 34, Q.ERROR = 35, Q.ID3 = 36, Q.MEDIA_STATUS = 37, Q.MEDIA_FINISHED = 38, Q.PLAYER_PREPLAYING = 39, Q.PLAYER_PREPLAYING_CANCELLED = 40, Q.PLAYER_LOAD_COMPLETE = 41, Q.PLAYER_PLAYING = 42, Q.SEGMENT_DOWNLOADED = 43, Q.REQUEST_SEEK = 44, Q.REQUEST_LOAD = 45, Q.REQUEST_STOP = 46, Q.REQUEST_PAUSE = 47, Q.REQUEST_PLAY = 48, Q.REQUEST_SKIP_AD = 49, Q.REQUEST_PLAY_AGAIN = 50, Q.REQUEST_PLAYBACK_RATE_CHANGE = 51, Q.REQUEST_VOLUME_CHANGE = 52, Q.REQUEST_EDIT_TRACKS_INFO = 53, Q.REQUEST_EDIT_AUDIO_TRACKS = 54, Q.REQUEST_SET_CREDENTIALS =
            55, Q.REQUEST_LOAD_BY_ENTITY = 56, Q.REQUEST_USER_ACTION = 57, Q.REQUEST_DISPLAY_STATUS = 58, Q.REQUEST_CUSTOM_COMMAND = 59, Q.REQUEST_FOCUS_STATE = 60, Q.REQUEST_QUEUE_LOAD = 61, Q.REQUEST_QUEUE_INSERT = 62, Q.REQUEST_QUEUE_UPDATE = 63, Q.REQUEST_QUEUE_REMOVE = 64, Q.REQUEST_QUEUE_REORDER = 65, Q.REQUEST_QUEUE_GET_ITEM_RANGE = 66, Q.REQUEST_QUEUE_GET_ITEMS = 67, Q.REQUEST_QUEUE_GET_ITEM_IDS = 68, Q.INBAND_TRACK_ADDED = 69, Q),
        R = {},
        Vi = (R.MEDIA_STATUS = 1, R.CLOUD_STATUS = 2, R.QUEUE_CHANGE = 3, R.QUEUE_ITEMS = 4, R.QUEUE_ITEM_IDS = 5, R.GET_STATUS = 6, R.LOAD =
            7, R.PAUSE = 8, R.STOP = 9, R.PLAY = 10, R.SKIP_AD = 11, R.PLAY_AGAIN = 12, R.SEEK = 13, R.SET_PLAYBACK_RATE = 14, R.SET_VOLUME = 15, R.EDIT_TRACKS_INFO = 16, R.EDIT_AUDIO_TRACKS = 17, R.PRECACHE = 18, R.PRELOAD = 19, R.QUEUE_LOAD = 20, R.QUEUE_INSERT = 21, R.QUEUE_UPDATE = 22, R.QUEUE_REMOVE = 23, R.QUEUE_REORDER = 24, R.QUEUE_NEXT = 25, R.QUEUE_PREV = 26, R.QUEUE_GET_ITEM_RANGE = 27, R.QUEUE_GET_ITEMS = 28, R.QUEUE_GET_ITEM_IDS = 29, R.QUEUE_SHUFFLE = 30, R.SET_CREDENTIALS = 31, R.LOAD_BY_ENTITY = 32, R.USER_ACTION = 33, R.DISPLAY_STATUS = 34, R.FOCUS_STATE = 35, R.CUSTOM_COMMAND =
            36, R);
    cast.f.common.K.eb = {
        ce: 1,
        re: 2,
        te: 3,
        ue: 4
    };
    cast.f.common.K.od = function(a) {
        return Ui[a]
    };
    cast.f.common.K.Xf = function(a) {
        return Vi[a]
    };
    cast.f.common.K.lg = function() {
        Tg("Cast.CAF.Version", Number(cast.f.VERSION.split(".")[2]))
    };
    cast.f.common.K.Cd = function(a) {
        Tg("Cast.CAF.PlayerStarted", a.La())
    };
    cast.f.common.A = {};
    cast.f.common.A.D = w("cast.framework.common.libraryloader");
    cast.f.common.A.oe = "//www.gstatic.com/cast/sdk/libs/mediaplayer/1.0.0/media_player.js";
    cast.f.common.A.se = "//ajax.googleapis.com/ajax/libs/shaka-player/2.2.1/shaka-player.compiled.js";
    cast.f.common.A.Rb = fd();
    cast.f.common.A.Wb = fd();
    cast.f.common.A.Qb = cast.f.common.A.Rb.a;
    cast.f.common.A.Md = cast.f.common.A.Wb.a;
    cast.f.common.A.Bd = function(a, b) {
        var c = document.createElement("script"),
            d = cast.f.common.A.D;
        c.type = "text/javascript";
        c.src = a;
        c.onload = function() {
            C(d, "library(" + a + ") is loaded");
            b.resolve()
        };
        c.onerror = function() {
            A(d, "library(" + a + ") cannot be loaded");
            b.reject()
        };
        document.head.appendChild(c)
    };
    cast.f.common.A.load = function(a) {
        a = void 0 === a ? !1 : a;
        cast.f.common.A.Bd(cast.f.common.A.oe, cast.f.common.A.Rb);
        a || (cast.f.common.A.Bd(cast.f.common.A.se, cast.f.common.A.Wb), cast.f.common.A.Sd = !0)
    };
    cast.f.common.A.reset = function() {
        cast.f.common.A.Rb = fd();
        cast.f.common.A.Wb = fd();
        cast.f.common.A.Qb = cast.f.common.A.Rb.a;
        cast.f.common.A.Md = cast.f.common.A.Wb.a
    };
    cast.f.common.A.Sd = !1;
    cast.f.common.$g = function(a, b) {
        (new Wi(a, b)).start()
    };
    cast.f.common.be = {
        no_media: 5,
        loading: 5,
        paused: 20
    };

    function Wi(a, b) {
        this.c = a;
        this.g = b;
        this.b = this.a = null
    }
    g = Wi.prototype;
    g.start = function() {
        var a = this.c;
        a.addEventListener("ERROR", this.Hd.bind(this));
        a.addEventListener("ENDED", this.Hd.bind(this));
        a.addEventListener("PAUSE", this.Kg.bind(this));
        a.addEventListener("PLAYER_PLAYING", this.Jg.bind(this));
        a.addEventListener("TIME_UPDATE", this.Lg.bind(this));
        Xi(this, "no_media")
    };

    function Yi(a) {
        clearTimeout(a.a);
        a.a = null
    }

    function Xi(a, b) {
        b == a.b ? Qc(Zi, "state is already set to idle due to " + b) : (a.b = b, b = cast.f.common.be[b], Yi(a), a.a = setTimeout(function() {
            C(Zi, "timer expired");
            this.g()
        }.bind(a), 6E4 * b))
    }
    g.Hd = function() {
        Qc(Zi, "onPlayerIdle");
        Xi(this, "no_media")
    };
    g.Kg = function() {
        Qc(Zi, "onPlayerPaused");
        Xi(this, "paused")
    };
    g.Jg = function() {
        Qc(Zi, "onPlayerLoading");
        Xi(this, "loading")
    };
    g.Lg = function() {
        this.b = null;
        Yi(this)
    };
    var Zi = w("cast.framework.common.IdleTimeoutManager");
    u("cast.framework.events.DetailedErrorCode", {
        MEDIA_UNKNOWN: 100,
        MEDIA_ABORTED: 101,
        MEDIA_DECODE: 102,
        MEDIA_NETWORK: 103,
        MEDIA_SRC_NOT_SUPPORTED: 104,
        SOURCE_BUFFER_FAILURE: 110,
        MEDIAKEYS_UNKNOWN: 200,
        MEDIAKEYS_NETWORK: 201,
        MEDIAKEYS_UNSUPPORTED: 202,
        MEDIAKEYS_WEBCRYPTO: 203,
        NETWORK_UNKNOWN: 300,
        SEGMENT_NETWORK: 301,
        HLS_NETWORK_MASTER_PLAYLIST: 311,
        HLS_NETWORK_PLAYLIST: 312,
        HLS_NETWORK_NO_KEY_RESPONSE: 313,
        HLS_NETWORK_KEY_LOAD: 314,
        HLS_NETWORK_INVALID_SEGMENT: 315,
        HLS_SEGMENT_PARSING: 316,
        DASH_NETWORK: 321,
        DASH_NO_INIT: 322,
        SMOOTH_NETWORK: 331,
        SMOOTH_NO_MEDIA_DATA: 332,
        MANIFEST_UNKNOWN: 400,
        HLS_MANIFEST_MASTER: 411,
        HLS_MANIFEST_PLAYLIST: 412,
        DASH_MANIFEST_UNKNOWN: 420,
        DASH_MANIFEST_NO_PERIODS: 421,
        DASH_MANIFEST_NO_MIMETYPE: 422,
        DASH_INVALID_SEGMENT_INFO: 423,
        SMOOTH_MANIFEST: 431,
        SEGMENT_UNKNOWN: 500,
        APP: 900,
        GENERIC: 999
    });
    cast.f.fa.wh = {};

    function $i(a) {
        this.type = a
    }
    u("cast.framework.events.Event", $i);

    function aj(a) {
        this.type = "BITRATE_CHANGED";
        this.totalBitrate = a
    }
    m(aj, $i);
    u("cast.framework.events.BitrateChangedEvent", aj);

    function bj(a) {
        this.type = "EMSG";
        this.messageData = a.messageData;
        this.schemeIdUri = a.schemeIdUri;
        this.value = a.value;
        this.startTime = a.startTime;
        this.endTime = a.endTime;
        this.timescale = a.timescale;
        this.presentationTimeDelta = a.presentationTimeDelta;
        this.eventDuration = a.eventDuration;
        this.id = a.id;
        this.segmentData = a.segmentData
    }
    m(bj, $i);
    u("cast.framework.events.EmsgEvent", bj);

    function cj(a, b) {
        this.type = "ERROR";
        this.detailedErrorCode = a;
        this.error = b
    }
    m(cj, $i);
    u("cast.framework.events.ErrorEvent", cj);

    function dj(a) {
        this.type = "ID3";
        this.segmentData = a
    }
    m(dj, $i);
    u("cast.framework.events.Id3Event", dj);

    function ej(a, b) {
        this.type = a;
        this.currentMediaTime = b
    }
    m(ej, $i);
    u("cast.framework.events.MediaElementEvent", ej);

    function fj(a, b) {
        b = void 0 === b ? !1 : b;
        ej.call(this, "PAUSE", a);
        this.ended = b
    }
    m(fj, ej);
    u("cast.framework.events.MediaPauseEvent", fj);

    function gj(a) {
        this.type = "MEDIA_STATUS";
        this.mediaStatus = a
    }
    m(gj, $i);
    u("cast.framework.events.MediaStatusEvent", gj);

    function hj(a, b) {
        this.type = "MEDIA_FINISHED";
        this.currentMediaTime = a;
        this.endedReason = b
    }
    m(hj, $i);
    u("cast.framework.events.MediaFinishedEvent", hj);

    function ij(a, b) {
        this.type = a;
        this.requestData = b
    }
    m(ij, $i);
    u("cast.framework.events.RequestEvent", ij);

    function jj(a, b) {
        this.type = a;
        this.media = b
    }
    m(jj, $i);
    u("cast.framework.events.LoadEvent", jj);

    function kj(a, b, c, d, e, f) {
        this.type = a;
        this.currentMediaTime = b;
        this.index = c;
        this.total = d;
        this.whenSkippable = q(e) ? e : void 0;
        this.endedReason = f
    }
    m(kj, $i);
    u("cast.framework.events.BreaksEvent", kj);

    function lj(a) {
        this.type = "PLAYING";
        this.isBuffering = a
    }
    m(lj, $i);
    u("cast.framework.events.BufferingEvent", lj);

    function mj(a, b) {
        this.type = "CLIP_ENDED";
        this.currentMediaTime = a;
        this.endedReason = b
    }
    m(mj, $i);
    u("cast.framework.events.ClipEndedEvent", mj);

    function nj(a, b) {
        this.type = "SEGMENT_DOWNLOADED";
        this.downloadTime = a;
        this.size = b
    }
    m(nj, $i);
    u("cast.framework.events.SegmentDownloadedEvent", nj);

    function oj(a) {
        this.type = "CACHE_LOADED";
        this.requestItems = a
    }
    m(oj, $i);
    u("cast.framework.events.CacheLoadedEvent", oj);

    function pj(a) {
        this.type = "INBAND_TRACK_ADDED";
        this.track = a
    }
    m(pj, $i);
    u("cast.framework.events.InbandTrackAddedEvent", pj);

    function qj(a, b) {
        this.type = a;
        this.url = b
    }
    m(qj, $i);
    u("cast.framework.events.CacheItemEvent", qj);
    u("cast.framework.events.EndedReason", {
        END_OF_STREAM: "END_OF_STREAM",
        ERROR: "ERROR",
        STOPPED: "STOPPED",
        INTERRUPTED: "INTERRUPTED",
        SKIPPED: "SKIPPED"
    });

    function rj(a, b) {
        y.call(this);
        this.player = a;
        this.tracks = [];
        this.l = [];
        this.b = null;
        this.c = [];
        this.s = -1;
        this.u = 1;
        this.h = new jf(b, [], [], null);
        fc(this, Ea(gc, this.h))
    }
    m(rj, y);

    function sj(a, b, c, d, e, f) {
        return 0 == a.tracks.length ? null : "VIDEO" == b ? a.tracks.find(function(a) {
            return a.type == b
        }) || null : a.tracks.find(function(a) {
            return b == a.type && (c ? c == a.name : !0) && (d ? d == a.language : !0) && (e ? e == a.trackContentType : !0) && (f ? f == a.subtype : !0)
        }) || null
    }
    g = rj.prototype;
    g.ra = function(a) {
        return new ge(this.u++, a)
    };

    function Ji(a, b) {
        if (0 !== b.length) {
            b.sort(function(a, b) {
                return a.trackId - b.trackId
            });
            if (b[0].trackId <= a.s) throw Error("track id conflicts");
            for (var c = 1; c < b.length; c++)
                if (b[c].trackId == b[c - 1].trackId) throw Error("track id conflicts");
            a.tracks = a.tracks.concat(b);
            a.s = b[b.length - 1].trackId;
            a.u = Math.max(a.u, a.s + 1);
            kf(a.h, b)
        }
    }
    g.getTracks = function(a) {
        return p(a) ? this.tracks.filter(function(b) {
            return b.type == a
        }) : this.tracks
    };
    g.S = function() {
        var a = new he;
        a.tracks = this.tracks;
        a.activeTrackIds = this.l;
        a.textTrackStyle = this.h.ya();
        return a
    };
    g.Ea = function() {};
    g.fc = function() {
        Ai(this, this.l);
        this.b = this.rb()
    };
    g.mb = function() {};
    g.Yb = function() {};
    g.rb = function() {
        return null
    };

    function Ki(a, b) {
        qf(a.h, b);
        for (var c = [], d = [], e = k(a.tracks), f = e.next(); !f.done; f = e.next()) f = f.value, "TEXT" == f.type && f.language && cast.receiver.Aa(f.language, b) && (c.push(f.trackId), f.trackContentId || d.push(f.trackId));
        0 !== d.length && (a.mb(d), tj(a, null, c))
    }

    function Bi(a, b) {
        for (var c = null, d = null, e = k(a.tracks), f = e.next(); !f.done; f = e.next()) f = f.value, "AUDIO" == f.type && (null == c && f.language && b && cast.receiver.Aa(f.language, b) && !f.trackContentId && (c = f.trackId), null != a.b && (d = a.b));
        null === c && (c = a.rb());
        tj(a, c, a.c);
        a.Yb(d, c)
    }

    function Ai(a, b) {
        for (var c = null, d = null, e = [], f = [], h = k(a.tracks), l = h.next(); !l.done; l = h.next()) l = l.value, b.includes(l.trackId) && ("TEXT" == l.type ? l.trackContentId ? f.push(l.trackId) : e.push(l.trackId) : "AUDIO" != l.type || l.trackContentId || (c = l.trackId)), null != a.b && (d = a.b);
        tj(a, c, e.concat(f));
        a.mb(e);
        nf(a.h, f);
        null != c && a.Yb(d, c)
    }

    function tj(a, b, c) {
        if (null != b || c) null != b && (a.b = b), a.c = c, null != a.b ? a.l = a.c.concat(a.b) : a.l = a.c
    }
    g.qa = function(a) {
        this.h.qa(a)
    };
    g.ya = function() {
        return this.h.ya()
    };

    function uj(a, b, c, d) {
        this.c = null;
        this.R = b;
        this.Ha = c;
        this.F = a;
        this.X = new Qi;
        this.g = 1;
        this.L = this.G = null;
        this.ja = !1;
        this.ea = d || vj;
        this.a = null;
        this.M = [];
        this.v = !1;
        this.m = fd();
        this.i = fd();
        this.j = fd();
        this.u = !1;
        this.P = null;
        this.wa = this.Ae.bind(this);
        this.s = null
    }

    function wj(a, b) {
        Object.keys(xj).forEach(function(c) {
            yj(a, b, c, function() {
                var b = new ej(xj[c], a.getCurrentTimeSec());
                zj(a, b)
            })
        });
        yj(a, b, "playing", a.yg.bind(a));
        yj(a, b, "ended", a.end.bind(a, "END_OF_STREAM"));
        yj(a, b, "timeupdate", a.zg.bind(a));
        yj(a, b, "pause", function() {
            var c = new fj(a.getCurrentTimeSec(), b.ended);
            zj(a, c)
        })
    }
    g = uj.prototype;
    g.La = function() {
        return 0
    };

    function Aj(a, b) {
        6 !== a.g && (a.g = 5, zj(a, new cj(b)), a.end("ERROR"))
    }
    g.yg = function() {
        4 > this.g && (this.g = 4, zj(this, new $i("CLIP_STARTED")))
    };
    g.Fd = function() {};
    g.zg = function() {
        this.getCurrentTimeSec() > this.Ha && this.end("END_OF_STREAM")
    };

    function Bj(a) {
        Cj(a).then(function(a) {
            a.fc()
        });
        a.ja || (a.v = !0, a.g = 3)
    }
    g.pause = function() {
        this.c && (this.v = !0, Dj(this), this.Za(!1), this.c.pause())
    };
    g.play = function() {
        this.v = !1;
        this.c && this.c.play();
        Ej(this)
    };
    g.seek = function(a, b) {
        var c = this.c;
        c ? (1 > Math.abs(c.currentTime - a) ? C(Fj, "ignore seek which tries to jump to too close time") : c.currentTime = a, p(b) && (c.paused && "PLAYBACK_START" == b ? this.play() : c.paused || "PLAYBACK_PAUSE" != b || this.pause())) : B(Fj, "could not seek while media was not loaded yet")
    };
    g.Yc = function() {
        return this.v ? "PAUSED" : this.isBuffering() ? "PLAYING" : "PLAYING"
    };
    g.sa = function() {
        return null
    };
    g.getCurrentTimeSec = function() {
        return this.G ? this.G : this.c ? this.c.currentTime : 0
    };
    g.getDurationSec = function() {
        return this.i.a
    };

    function Gj(a, b) {
        if (!a.a) return null;
        b.textTrackStyle && a.a.qa(b.textTrackStyle);
        b.language ? Ki(a.a, b.language) : b.activeTrackIds && Ai(a.a, b.activeTrackIds);
        return a.a.S().activeTrackIds
    }

    function Hj(a, b) {
        if (!a.a) return null;
        Bi(a.a, b.language);
        return a.a.S().activeTrackIds
    }
    g.kb = function(a, b, c) {
        this.c = a;
        this.ja = b;
        wj(this, a);
        this.Bb(a, b, this.R);
        a = this.a = this.ea(this, a);
        c && (c.activeTrackIds && (a.l = c.activeTrackIds), c.textTrackStyle && a.h.qa(c.textTrackStyle), c.tracks && Ji(a, c.tracks));
        b && Ej(this)
    };
    g.Bb = function() {
        throw Error("loadContentInternal must be implemented");
    };
    g.Ba = function() {
        this.Id(this.R)
    };
    g.Id = function() {};
    g.end = function(a) {
        var b = this;
        Dj(this);
        this.Za(!1);
        if (6 == this.g) return this.j.a;
        this.g = 6;
        this.Fd();
        var c = this.getCurrentTimeSec();
        this.G = c;
        this.jb();
        this.c && Ij(this, this.c);
        this.c = null;
        this.L = this.a && this.a.S();
        this.a && this.a.$();
        this.a = null;
        return this.j.a.then(function() {
            zj(b, new mj(c, a));
            b.X.$()
        })
    };
    g.isBuffering = function() {
        return this.u
    };

    function Cj(a) {
        return a.m.a.then(function() {
            return a.a
        })
    }

    function zj(a, b) {
        a.X.dispatchEvent(b)
    }

    function vj(a, b) {
        return new rj(a, b)
    }

    function yj(a, b, c, d) {
        yc(b, c, d);
        a.M.push({
            type: c,
            listener: d
        })
    }

    function Ij(a, b) {
        for (var c = k(a.M), d = c.next(); !d.done; d = c.next()) d = d.value, Gc(b, d.type, d.listener);
        a.M.length = 0
    }
    g.jb = function() {
        var a = this.c;
        a && (a.removeAttribute("src"), a.load());
        this.j.resolve()
    };
    g.Za = function(a) {
        a !== this.u && (this.u = a, zj(this, new lj(this.u)))
    };

    function Ej(a) {
        Dj(a);
        a.P = a.getCurrentTimeSec();
        a.s = setTimeout(a.wa, 500)
    }

    function Dj(a) {
        null != a.s && (clearTimeout(a.s), a.s = null)
    }
    g.Ae = function() {
        this.Za(1E3 * (this.getCurrentTimeSec() - this.P) < 100 * this.c.playbackRate);
        Ej(this)
    };
    var Fj = w("cast.framework.media.BasePlayer"),
        xj = {
            abort: "ABORT",
            canplay: "CAN_PLAY",
            canplaythrough: "CAN_PLAY_THROUGH",
            durationchange: "DURATION_CHANGE",
            ended: "ENDED",
            emptied: "EMPTIED",
            loadeddata: "LOADED_DATA",
            loadedmetadata: "LOADED_METADATA",
            loadstart: "LOAD_START",
            play: "PLAY",
            playing: "PLAYING",
            progress: "PROGRESS",
            ratechange: "RATE_CHANGE",
            seeked: "SEEKED",
            seeking: "SEEKING",
            stalled: "STALLED",
            suspend: "SUSPEND",
            timeupdate: "TIME_UPDATE",
            waiting: "WAITING"
        };

    function Jj(a) {
        uj.call(this, a, 0, 0);
        this.b = null
    }
    m(Jj, uj);

    function Kj(a) {
        return new Vc(function(b, c) {
            var d = new Image;
            d.onerror = c;
            d.onload = b;
            d.src = a
        })
    }
    g = Jj.prototype;
    g.kb = function(a) {
        var b = this;
        C(Lj, "loadContent");
        var c = this.F.url;
        Kj(c).then(function() {
            a.style.backgroundImage = 'url("' + c.replace(/"/g, '\\"') + '")';
            b.b = a;
            C(Lj, "image is set");
            b.i.resolve(0);
            b.a = b.ea(b, a);
            b.m.resolve([]);
            b.i.a.then(function() {
                Bj(b)
            })
        }, function() {
            Aj(b, 999)
        })
    };
    g.La = function() {
        return cast.f.common.K.eb.ce
    };
    g.Yc = function() {
        return "PAUSED"
    };
    g.Ba = function() {
        C(Lj, "ImagePlayer does not handle preload")
    };
    g.play = function() {
        C(Lj, "ImagePlayer does not support PLAY")
    };
    g.pause = function() {
        C(Lj, "ImagePlayer does not support PAUSE")
    };
    g.seek = function() {
        C(Lj, "ImagePlayer does not support SEEK")
    };
    g.jb = function() {
        this.b && (this.b.style.backgroundImage = "none");
        this.j.resolve()
    };
    var Lj = w("cast.framework.media.ImagePlayer");
    cast.f.ba = {};

    function Mj(a, b) {
        this.c = a;
        this.a = b;
        this.b = b.whenSkippable
    }

    function Nj(a) {
        return q(a.a.duration) ? a.a.duration : null
    }

    function Oj(a) {
        return a.map(function(a) {
            return a.a.id
        })
    };

    function Pj(a, b) {
        this.b = a;
        this.c = b;
        this.a = 0 > b || b >= a.a.length ? null : a.a[b]
    }

    function Qj(a, b) {
        b.breakId = a.b.b.id;
        b.breakClipId = a.a.a.id;
        a = a.a.b;
        q(a) && (b.whenSkippable = a)
    };

    function Rj(a, b) {
        this.a = [];
        var c = "break:" + Sj++;
        this.b = new di(c, [], b);
        Tj(this, a)
    }

    function Tj(a, b) {
        a.a.push.apply(a.a, [].concat(pa(b)));
        a.b.breakClipIds.push.apply(a.b.breakClipIds, [].concat(pa(Oj(b))))
    }

    function Uj(a) {
        return a.b.position
    }

    function Vj(a, b) {
        return a.a.reduce(function(a, d, e) {
            return a + (e < b ? Nj(d) : 0)
        }, 0)
    }

    function Wj(a, b) {
        for (var c = 0; c < a.a.length; c++)
            if (b && a.a[c].a.id == b.a.id) return new Pj(a, c);
        return null
    }
    var Sj = 0;

    function Xj() {
        this.a = [];
        this.i = new Set;
        this.l = []
    }

    function Yj(a, b) {
        a.a.forEach(function(a) {
            -1 != Uj(a) && Uj(a) >= b && (a.b.position = -1)
        });
        Zj(a)
    }

    function Zj(a) {
        a = a.a;
        var b = a.filter(function(a) {
            return -1 == Uj(a)
        });
        if (!(1 > b.length)) {
            var c = b[0];
            a.splice(a.indexOf(c) + 1, a.length).map(function(a) {
                Tj(c, a.a)
            })
        }
    }

    function ak(a) {
        return a.a.map(function(a) {
            return a.b
        })
    }

    function bk(a, b) {
        b = b.a;
        a.i.has(b.id) || (a.l.push(b), a.i.add(b.id))
    }
    Xj.prototype.h = function() {
        Sa("Should be implemented")
    };
    Xj.prototype.c = function() {
        Sa("Should be implemented")
    };
    Xj.prototype.j = function() {
        Sa("Should be implemented")
    };

    function ck() {
        Xj.call(this);
        this.b = [];
        this.g = new dk
    }
    m(ck, Xj);
    ck.prototype.c = function(a) {
        var b = this.b.slice(0).reverse().find(function(b) {
            return b.Y <= a
        });
        return b ? b.lb + Math.max(0, a - b.la) : a
    };

    function ek(a, b) {
        return (a = a.b.slice(0).reverse().find(function(a) {
            return a.lb < b
        })) ? a.la + (b - a.lb) : b
    }

    function fk(a, b) {
        return a.b.find(function(a) {
            return a.Y <= b && (0 > a.la || b <= a.la)
        }) || null
    }
    ck.prototype.h = function(a, b) {
        var c = fk(this, b);
        b = new le(b - c.c, b - c.Y);
        Qj(a, b);
        return b
    };
    ck.prototype.j = function(a) {
        var b = fk(this, a);
        return b ? a - b.Y : null
    };

    function gk(a, b) {
        if (hk(a.g, b)) return a.g.a;
        var c = null,
            d = fk(a, b);
        if (d) {
            c = a.a.find(function(a) {
                return a == d.b
            });
            var e = d.Y;
            var f = d.la;
            c = Wj(c, d.a)
        } else f = a.b.find(function(a) {
            return a.Y > b
        }), e = b, f = f ? f.Y : Infinity, c = null;
        a.g.cache(c, e, f);
        return c
    }

    function ik(a, b, c) {
        var d = c[0].Y,
            e = c[c.length - 1].la - b;
        b = c.map(function(a) {
            return a.a
        });
        var f = new Rj(b, e);
        a.a.push(f);
        a.b.push.apply(a.b, [].concat(pa(c.map(function(a) {
            a.b = f;
            a.lb = e;
            a.c = d;
            return a
        }))))
    }

    function jk(a) {
        a.sort(function(a, b) {
            return a.Y - b.Y
        });
        var b = new ck,
            c = 0,
            d = [];
        a.forEach(function(a) {
            bk(b, a.a);
            0 < d.length && .5 < Math.abs(a.Y - d[d.length - 1].la) && (ik(b, c, d), d.length = 0);
            0 < d.length && (a.Y = d[d.length - 1].la);
            c += a.la - a.Y;
            d.push(a)
        });
        0 < d.length && ik(b, c, d);
        return b
    }

    function kk(a, b, c) {
        c.a.duration = b - a;
        this.la = b;
        this.a = c;
        this.Y = a;
        this.b = this.c = this.lb = null
    }

    function dk() {
        this.b = this.c = this.a = null
    }

    function hk(a, b) {
        return a.c < b && b < a.b
    }
    dk.prototype.cache = function(a, b, c) {
        this.a = a;
        this.c = b;
        this.b = c
    };

    function lk(a, b, c, d) {
        d = void 0 === d ? Infinity : d;
        this.a = a;
        this.breakStatus = b;
        this.startTime = c;
        this.endTime = d
    }
    lk.prototype.isPlayingBreak = function() {
        return null != this.breakStatus
    };

    function mk(a) {
        return new lk(a.a.c, a, 0)
    };

    function nk() {
        Xj.call(this)
    }
    m(nk, Xj);

    function ok(a, b, c) {
        c.forEach(function(b) {
            bk(a, b)
        });
        if (q(b)) {
            var d = a.a.find(function(a) {
                return Uj(a) == b
            });
            if (d) Tj(d, c);
            else {
                var e = a.a.length;
                a.a.some(function(a, c) {
                    if (-1 == Uj(a) || b < Uj(a)) return e = c, !0
                });
                c = new Rj(c, b);
                a.a.splice(e, 0, c)
            }
        } else(d = a.a[a.a.length - 1]) && -1 == Uj(d) ? Tj(d, c) : a.a.push(new Rj(c, -1))
    }
    nk.prototype.h = function(a, b) {
        var c = Vj(a.b, a.c) + b;
        b = new le(c, b);
        Qj(a, b);
        return b
    };
    nk.prototype.j = function(a) {
        return a
    };
    nk.prototype.c = function(a) {
        return a
    };

    function pk(a, b, c) {
        var d = a.a.find(function(a) {
            return Uj(a) == b
        });
        if (d) return mk(new Pj(d, 0));
        a = a.a.find(function(a) {
            return Uj(a) > b
        });
        return new lk(c, null, b, a ? Uj(a) : Infinity)
    }

    function qk(a, b, c) {
        if (b.isPlayingBreak()) {
            b = b.breakStatus;
            var d = b.b,
                e = b.c + 1;
            if (0 > e || e >= d.a.length ? 0 : d.a[e]) return mk(new Pj(d, e));
            var f = Uj(b.b);
            if (0 > f) return null;
            a = a.a.find(function(a) {
                return Uj(a) > f
            });
            return new lk(c, null, f, a && -1 != Uj(a) ? Uj(a) : Infinity)
        }
        var h = b.startTime;
        return (c = a.a.find(function(a) {
            return -1 == Uj(a) || Uj(a) > h
        })) ? mk(new Pj(c, 0)) : null
    }

    function rk(a, b, c) {
        var d = b > c,
            e = d ? c : b,
            f = d ? b : c;
        return a.a.filter(function(a) {
            return Uj(a) > e && Uj(a) <= f
        })
    };

    function sk(a, b, c, d) {
        b = b.toLowerCase();
        var e = null;
        if (ua(a))
            if (ua(b)) {
                var f;
                if (f = d) f = !fb(wi, d);
                f && (e = "content type(" + d + ") is not valid")
            } else e = "mimeType(" + b + ") should be string";
        else e = "Url(" + a + ") should be string";
        if (e) throw A(tk, e), Error(e);
        this.b = d || "audio_video";
        this.mimeType = b;
        this.url = a;
        this.playbackConfig = c || new Fi;
        this.hlsSegmentFormat = null;
        this.a = new ck
    }
    var tk = w("cast.framework.ContentConfig");
    var uk = {
        NONE: "none",
        CLEARKEY: "clearkey",
        PLAYREADY: "playready",
        WIDEVINE: "widevine",
        AES_128: "aes_128",
        AES_128_CKP: "aes_128_ckp"
    };
    u("cast.framework.ContentProtection", uk);
    cast.f.media.bb = {};

    function vk(a) {
        switch (a) {
            case shaka.util.Error.Code.CAST_CONNECTION_TIMED_OUT:
            case shaka.util.Error.Code.TIMEOUT:
                return 8;
            case shaka.util.Error.Code.UNSUPPORTED_SCHEME:
            case shaka.util.Error.Code.HTTP_ERROR:
            case shaka.util.Error.Code.MALFORMED_DATA_URI:
            case shaka.util.Error.Code.UNKNOWN_DATA_URI_ENCODING:
                return 5;
            case shaka.util.Error.Code.BAD_HTTP_STATUS:
                return 6;
            default:
                return null
        }
    }
    cast.f.media.bb.sb = function(a) {
        switch (a) {
            case shaka.util.Error.Code.BUFFER_READ_OUT_OF_BOUNDS:
            case shaka.util.Error.Code.JS_INTEGER_OVERFLOW:
            case shaka.util.Error.Code.EBML_OVERFLOW:
            case shaka.util.Error.Code.EBML_BAD_FLOATING_POINT_SIZE:
            case shaka.util.Error.Code.INVALID_STREAMS_CHOSEN:
            case shaka.util.Error.Code.LOAD_INTERRUPTED:
            case shaka.util.Error.Code.CAST_API_UNAVAILABLE:
            case shaka.util.Error.Code.NO_CAST_RECEIVERS:
            case shaka.util.Error.Code.ALREADY_CASTING:
            case shaka.util.Error.Code.UNEXPECTED_CAST_ERROR:
            case shaka.util.Error.Code.CAST_CANCELED_BY_USER:
            case shaka.util.Error.Code.CAST_RECEIVER_APP_UNAVAILABLE:
            case shaka.util.Error.Code.STORAGE_NOT_SUPPORTED:
            case shaka.util.Error.Code.INDEXED_DB_ERROR:
            case shaka.util.Error.Code.OPERATION_ABORTED:
            case shaka.util.Error.Code.REQUESTED_ITEM_NOT_FOUND:
            case shaka.util.Error.Code.MALFORMED_OFFLINE_URI:
            case shaka.util.Error.Code.CANNOT_STORE_LIVE_OFFLINE:
            case shaka.util.Error.Code.STORE_ALREADY_IN_PROGRESS:
                return 999;
            case shaka.util.Error.Code.MEDIA_SOURCE_OPERATION_FAILED:
            case shaka.util.Error.Code.MEDIA_SOURCE_OPERATION_THREW:
            case shaka.util.Error.Code.VIDEO_ERROR:
            case shaka.util.Error.Code.QUOTA_EXCEEDED_ERROR:
                return 100;
            case shaka.util.Error.Code.FAILED_TO_CREATE_CDM:
            case shaka.util.Error.Code.FAILED_TO_ATTACH_TO_VIDEO:
            case shaka.util.Error.Code.INVALID_SERVER_CERTIFICATE:
            case shaka.util.Error.Code.FAILED_TO_CREATE_SESSION:
            case shaka.util.Error.Code.FAILED_TO_GENERATE_LICENSE_REQUEST:
            case shaka.util.Error.Code.LICENSE_RESPONSE_REJECTED:
            case shaka.util.Error.Code.ENCRYPTED_CONTENT_WITHOUT_DRM_INFO:
            case shaka.util.Error.Code.NO_LICENSE_SERVER_GIVEN:
            case shaka.util.Error.Code.OFFLINE_SESSION_REMOVED:
            case shaka.util.Error.Code.EXPIRED:
                return 200;
            case shaka.util.Error.Code.LICENSE_REQUEST_FAILED:
                return 201;
            case shaka.util.Error.Code.NO_RECOGNIZED_KEY_SYSTEMS:
            case shaka.util.Error.Code.REQUESTED_KEY_SYSTEM_CONFIG_UNAVAILABLE:
                return 202;
            case shaka.util.Error.Code.CAST_CONNECTION_TIMED_OUT:
                return 300;
            case shaka.util.Error.Code.UNSUPPORTED_SCHEME:
            case shaka.util.Error.Code.BAD_HTTP_STATUS:
            case shaka.util.Error.Code.HTTP_ERROR:
            case shaka.util.Error.Code.TIMEOUT:
            case shaka.util.Error.Code.MALFORMED_DATA_URI:
            case shaka.util.Error.Code.UNKNOWN_DATA_URI_ENCODING:
                return 321;
            case shaka.util.Error.Code.NO_INIT_DATA_FOR_OFFLINE:
                return 322;
            case shaka.util.Error.Code.INVALID_TEXT_HEADER:
            case shaka.util.Error.Code.INVALID_TEXT_CUE:
            case shaka.util.Error.Code.UNABLE_TO_DETECT_ENCODING:
            case shaka.util.Error.Code.INVALID_XML:
            case shaka.util.Error.Code.UNABLE_TO_GUESS_MANIFEST_TYPE:
            case shaka.util.Error.Code.DASH_INVALID_XML:
            case shaka.util.Error.Code.DASH_NO_SEGMENT_INFO:
            case shaka.util.Error.Code.DASH_EMPTY_ADAPTATION_SET:
            case shaka.util.Error.Code.DASH_EMPTY_PERIOD:
            case shaka.util.Error.Code.DASH_WEBM_MISSING_INIT:
            case shaka.util.Error.Code.DASH_PSSH_BAD_ENCODING:
            case shaka.util.Error.Code.DASH_NO_COMMON_KEY_SYSTEM:
            case shaka.util.Error.Code.DASH_MULTIPLE_KEY_IDS_NOT_SUPPORTED:
            case shaka.util.Error.Code.DASH_CONFLICTING_KEY_IDS:
            case shaka.util.Error.Code.UNPLAYABLE_PERIOD:
            case shaka.util.Error.Code.RESTRICTIONS_CANNOT_BE_MET:
            case shaka.util.Error.Code.DASH_DUPLICATE_REPRESENTATION_ID:
                return 420;
            case shaka.util.Error.Code.NO_PERIODS:
                return 421;
            case shaka.util.Error.Code.MP4_SIDX_WRONG_BOX_TYPE:
            case shaka.util.Error.Code.MP4_SIDX_INVALID_TIMESCALE:
            case shaka.util.Error.Code.MP4_SIDX_TYPE_NOT_SUPPORTED:
            case shaka.util.Error.Code.WEBM_CUES_ELEMENT_MISSING:
            case shaka.util.Error.Code.WEBM_EBML_HEADER_ELEMENT_MISSING:
            case shaka.util.Error.Code.WEBM_SEGMENT_ELEMENT_MISSING:
            case shaka.util.Error.Code.WEBM_INFO_ELEMENT_MISSING:
            case shaka.util.Error.Code.WEBM_DURATION_ELEMENT_MISSING:
            case shaka.util.Error.Code.WEBM_CUE_TRACK_POSITIONS_ELEMENT_MISSING:
            case shaka.util.Error.Code.WEBM_CUE_TIME_ELEMENT_MISSING:
            case shaka.util.Error.Code.BAD_ENCODING:
            case shaka.util.Error.Code.INVALID_MP4_TTML:
            case shaka.util.Error.Code.INVALID_MP4_VTT:
            case shaka.util.Error.Code.DASH_UNSUPPORTED_CONTAINER:
                return 500;
            default:
                return 999
        }
    };
    cast.f.media.bb.Vf = function(a) {
        var b = a.code,
            c = cast.f.media.bb.sb(b);
        b = vk(b);
        a = a.code === shaka.util.Error.Code.BAD_HTTP_STATUS ? a.data[1] : null;
        null != b && (c = 10 * c + b % 10, null != a && (c = 1E3 * c + a % 1E3));
        return c
    };

    function wk(a, b, c, d, e) {
        uj.call(this, a, c, d, e);
        this.W = a;
        this.l = b;
        this.b = null;
        this.N = !1;
        this.h = this.C = this.w = null
    }
    m(wk, uj);
    g = wk.prototype;
    g.La = function() {
        return cast.f.common.K.eb.re
    };
    g.sa = function() {
        var a = this.b.seekRange();
        return new Bh(a.start, a.end)
    };
    g.Bb = function(a, b, c) {
        var d = this;
        C(xk, "load: " + c);
        a.autoplay = b;
        this.b = new this.l.Player(a);
        this.b.addEventListener("error", function(a) {
            d.$c(a.detail)
        });
        this.b.addEventListener("adaptation", this.hd.bind(this));
        this.b.addEventListener("emsg", function(a) {
            zj(d, new bj(a.detail))
        });
        yk(this);
        this.b.load(this.W.url, c).then(this.xg.bind(this)).catch(this.$c.bind(this));
        zk(this, a)
    };

    function yk(a) {
        for (var b = a.W.playbackConfig, c = k(["autoResumeDuration", "autoResumeNumberOfSegments", "autoPauseDuration", "licenseCustomData", "captionsRequestHandler"]), d = c.next(); !d.done; d = c.next()) d = d.value, void 0 !== b[d] && B(xk, d + " is not supported for Shakaplayer. Its value will be ignored.");
        Ak(a, b);
        Bk(a, b);
        c = gb(Ck);
        q(b.segmentRequestRetryLimit) && (c.maxAttempts = b.segmentRequestRetryLimit + 1);
        a.b.configure({
            abr: {
                defaultBandwidthEstimate: b.initialBandwidth || 2E6
            },
            drm: {
                retryParameters: Ck,
                servers: Dk(b),
                advanced: {
                    "com.widevine.alpha": {
                        audioRobustness: "HW_SECURE_CRYPTO",
                        videoRobustness: "HW_SECURE_ALL"
                    }
                }
            },
            manifest: {
                retryParameters: Ck
            },
            streaming: {
                retryParameters: c
            }
        })
    }

    function Dk(a) {
        var b = {},
            c = a.licenseUrl;
        a = a.protectionSystem;
        if (!c) return {};
        if (a) {
            if (!fb(uk, a)) return B(xk, a + " is not a supported protection system by Shaka player."), {};
            var d = Ek[a];
            if (!d) return {};
            b[d] = c;
            return b
        }
        for (d in Ek) b[Ek[d]] = c;
        return b
    }

    function Ak(a, b) {
        (b.manifestRequestHandler || b.segmentRequestHandler || b.licenseRequestHandler) && a.b.getNetworkingEngine().registerRequestFilter(function(c, d) {
            var e = {
                url: d.uris[0],
                headers: d.headers,
                content: d.body,
                withCredentials: d.allowCrossSiteCredentials
            };
            switch (c) {
                case a.l.net.NetworkingEngine.RequestType.MANIFEST:
                    t(b.manifestRequestHandler) && b.manifestRequestHandler(e);
                    break;
                case a.l.net.NetworkingEngine.RequestType.SEGMENT:
                    t(b.segmentRequestHandler) && b.segmentRequestHandler(e);
                    break;
                case a.l.net.NetworkingEngine.RequestType.LICENSE:
                    t(b.licenseRequestHandler) &&
                        b.licenseRequestHandler(e)
            }
            d.uris[0] = e.url;
            d.headers = e.headers;
            d.body = e.content;
            d.allowCrossSiteCredentials = e.withCredentials
        })
    }

    function Bk(a, b) {
        var c = a.b.getNetworkingEngine(),
            d = a.l.net.NetworkingEngine.RequestType;
        c.registerResponseFilter(function(c, f) {
            var e = f.data,
                l;
            switch (c) {
                case d.MANIFEST:
                    t(b.manifestHandler) && e && (l = Promise.resolve(b.manifestHandler(String.fromCharCode.apply(String, [].concat(pa(new Uint16Array(e)))))).then(function(a) {
                        for (var b = new ArrayBuffer(2 * a.length), c = new Uint16Array(b), d = 0; d < a.length; d++) c[d] = a.charCodeAt(d);
                        f.data = b
                    }));
                    break;
                case d.SEGMENT:
                    Tg("Cast.Shaka.Bandwidth", a.b.getStats().estimatedBandwidth);
                    t(b.segmentHandler) && (l = Promise.resolve(b.segmentHandler(new Uint8Array(e))).then(function(a) {
                        f.data = a.buffer
                    }));
                    zj(a, new nj(f.timeMs, e.byteLength));
                    break;
                case d.LICENSE:
                    t(b.licenseHandler) && e && (l = Promise.resolve(b.licenseHandler(new Uint8Array(e))).then(function(a) {
                        f.data = a.buffer
                    }))
            }
            return l
        })
    }
    g.$c = function(a) {
        a && a.code ? (A(xk, "category: " + a.category + " code: " + a.code), Aj(this, cast.f.media.bb.sb(a.code)), Tg("Cast.Shaka.Error", cast.f.media.bb.Vf(a))) : A(xk, JSON.stringify(a))
    };
    g.hd = function() {
        var a = this.J;
        this.J = this.b.getVariantTracks().reduce(function(a, c) {
            return c.active ? a + c.bandwidth : a
        }, 0);
        a !== this.J && zj(this, new aj(this.J))
    };
    g.Za = function(a) {
        uj.prototype.Za.call(this, a);
        this.isBuffering() && this.h && (this.Gd(), Tg("Cast.Shaka.PlayTimeBeforeAutoPause", Fa() - this.h), this.h = null)
    };

    function zk(a, b) {
        yj(a, b, "loadedmetadata", a.Ce.bind(a, b));
        yj(a, b, "pause", a.Gd.bind(a));
        yj(a, b, "play", a.Ig.bind(a));
        yj(a, b, "playing", a.Mg.bind(a))
    }
    g.Ce = function(a) {
        this.m.resolve(this.a.Ea());
        this.a.m = this.hd.bind(this);
        a = a.duration;
        this.i.resolve(a);
        Tg("Cast.Shaka.MediaDuration", a);
        Bj(this)
    };

    function Fk(a) {
        var b = {};
        a = k(a.b.getVariantTracks());
        for (var c = a.next(); !c.done; c = a.next()) {
            c = c.value;
            var d = void 0;
            c.videoId ? d = "video" : c.audioId && (d = "audio");
            b[d] || (b[d] = []);
            b[d].push(c.bandwidth)
        }
        return b
    }
    g.xg = function() {
        cast.platform.metrics.logEventToUma("Cast.Shaka.Load");
        Ug("Cast.Shaka.Live", this.b.isLive());
        this.b.getVariantTracks().forEach(function(a) {
            a.codecs && Vg(a.codecs);
            a.mimeType && Tg("Cast.Shaka.MimeType", Rg(a.mimeType))
        });
        for (var a = Fk(this), b = k(["audio", "video"]), c = b.next(); !c.done; c = b.next()) c = c.value, a[c] && Sg(a[c], c + "/*")
    };
    g.Gd = function() {
        this.w = Fa();
        cast.platform.metrics.logEventToUma("Cast.Shaka.Pause")
    };
    g.Ig = function() {
        this.C = Fa()
    };
    g.Mg = function() {
        this.h = Fa();
        this.w && (Tg("Cast.Shaka.PauseTime", this.h - this.w), this.w = null);
        if (this.C) {
            var a = this.h - this.C;
            this.N ? Tg("Cast.Shaka.PlayLatency", a) : (Tg("Cast.Shaka.AutoplayStartupLatency", a), this.N = !0);
            this.C = null
        }
    };
    g.Fd = function() {
        cast.platform.metrics.logEventToUma("Cast.Shaka.Ended")
    };
    g.jb = function() {
        var a = this;
        this.b ? this.b.destroy().then(function() {
            a.j.resolve()
        }) : this.j.resolve()
    };

    function Gk(a, b, c, d) {
        return cast.f.common.A.Md.then(function() {
            return new wk(a, shaka, b, c, d)
        })
    }
    var xk = w("cast.framework.media.ShakaPlayer"),
        Ck = {
            maxAttempts: 4,
            baseDelay: 400,
            backoffFactor: 2
        },
        Hk = {},
        Ek = (Hk.clearkey = "org.w3.clearkey", Hk.playready = "com.chromecast.playready", Hk.widevine = "com.widevine.alpha", Hk);

    function Ik(a, b) {
        rj.call(this, a, b);
        this.a = a.b;
        this.i = new Map;
        this.m = null
    }
    m(Ik, rj);

    function Jk(a, b) {
        return new Ik(a, b)
    }
    g = Ik.prototype;
    g.Ea = function() {
        var a = Kk(this.a.getVariantTracks()),
            b = this.a.getTextTracks(),
            c = [];
        c = c.concat(a);
        c = c.concat(b);
        a = k(c);
        for (b = a.next(); !b.done; b = a.next()) {
            b = b.value;
            var d = "variant" === b.type ? "AUDIO" : b.type.toUpperCase();
            c = "variant" === b.type ? null === b.audioCodec ? void 0 : b.audioCodec : null === b.mimeType ? void 0 : b.mimeType;
            var e = null === b.kind ? void 0 : b.kind.toUpperCase(),
                f = sj(this, d, void 0, b.language, c, e);
            f ? d = f : (d = this.ra(d), d.language = b.language, d.trackContentType = c, d.subtype = e, Ji(this, [d]));
            "AUDIO" == d.type ?
                this.i.set(d.trackId, b.audioId) : this.i.set(d.trackId, b.id)
        }
    };

    function Kk(a) {
        for (var b = {}, c = 0; c < a.length; c++) b[a[c].audioId] || (b[a[c].audioId] = a[c].id);
        var d = [],
            e;
        for (e in b) b.hasOwnProperty(e) && d.push(b[e]);
        return a.filter(function(a) {
            return d.includes(a.id)
        })
    }
    g.mb = function(a) {
        var b = this;
        if (a && 0 !== a.length) {
            a = a.map(function(a) {
                return b.i.get(a)
            });
            for (var c = k(this.a.getTextTracks()), d = c.next(); !d.done; d = c.next()) d = d.value, a.includes(d.id) && this.a.selectTextTrack(d);
            this.a.setTextTrackVisibility(!0)
        } else this.a.setTextTrackVisibility(!1)
    };
    g.Yb = function(a, b) {
        if (null !== b) {
            var c = null;
            null === a || (c = this.i.get(a));
            var d = this.i.get(b);
            if (c !== d) {
                a = this.a.getVariantTracks();
                var e = a.find(function(a) {
                    return a.active
                }).videoId;
                (a = a.find(function(a) {
                    return a.audioId === d && a.videoId === e
                })) ? (a.language ? this.a.selectAudioLanguage(a.language) : (this.a.configure({
                    abr: {
                        enabled: !1
                    }
                }), this.a.selectVariantTrack(a, !0)), this.m && this.m()) : A(Lk, "cannot find matching shaka variant track")
            }
        }
    };
    g.rb = function() {
        for (var a = -1, b = k(Kk(this.a.getVariantTracks())), c = b.next(); !c.done; c = b.next())
            if (c = c.value, c.primary) {
                a = c.audioId;
                break
            }
        b = null;
        c = k(this.i);
        for (var d = c.next(); !d.done; d = c.next()) {
            d = k(d.value);
            var e = d.next().value;
            if (d.next().value === a) {
                b = e;
                break
            }
        }
        0 > b && A(Lk, "cannot find default shaka audio track");
        return b
    };
    g.V = function() {
        this.m = null;
        rj.prototype.V.call(this)
    };
    var Lk = w("cast.framework.media.ShakaTracksManager");

    function Mk(a, b, c, d) {
        uj.call(this, a, b, c, d)
    }
    m(Mk, uj);
    Mk.prototype.Bb = function(a, b, c) {
        C(Nk, "loadContent: autoplay = " + b + ", initial_time = " + c);
        Ok(this, a);
        a.src = this.F.url;
        a.currentTime = c;
        a.autoplay = b
    };

    function Ok(a, b) {
        yj(a, b, "loadedmetadata", a.b.bind(a, b));
        yj(a, b, "error", function() {
            Aj(a, wd(b.error))
        })
    }
    Mk.prototype.b = function(a) {
        this.m.resolve(this.a.Ea(this.F));
        Bj(this);
        this.i.resolve(a.duration)
    };
    Mk.prototype.La = function() {
        return cast.f.common.K.eb.te
    };
    var Nk = w("cast.framework.media.SimplePlayer");

    function Pk(a) {
        rj.apply(this, arguments)
    }
    m(Pk, rj);

    function Qk(a, b) {
        return new Pk(a, b)
    }
    Pk.prototype.Ea = function(a) {
        a = "audio_only" == a.b ? "AUDIO" : "VIDEO";
        sj(this, a) || (a = this.ra(a), Ji(this, [a]))
    };
    cast.f.media.ua = {};
    cast.f.media.ua.Re = function(a) {
        var b = a.getStreamCount(),
            c = 0;
        ca();
        ea();
        var d = {};
        return d[Symbol.iterator] = function() {
            return {
                next: function() {
                    return c < b ? {
                        done: !1,
                        value: a.getStreamInfo(c++)
                    } : {
                        done: !0
                    }
                }
            }
        }, d
    };
    cast.f.media.ua.sb = function(a) {
        switch (a) {
            case cast.player.api.ErrorCode.PLAYBACK:
                return 100;
            case cast.player.api.ErrorCode.MEDIAKEYS:
                return 200;
            case cast.player.api.ErrorCode.NETWORK:
                return 300;
            case cast.player.api.ErrorCode.MANIFEST:
                return 400;
            default:
                return Sa("Cannot reach"), 999
        }
    };
    cast.f.media.ua.pd = function(a) {
        switch (a) {
            case "aac":
                return cast.player.api.HlsSegmentFormat.MPEG_AUDIO_ES;
            case "ac3":
                return cast.player.api.HlsSegmentFormat.PACKED_AUDIO_AC3;
            case "mp3":
                return cast.player.api.HlsSegmentFormat.MPEG_LAYER_3;
            case "ts":
                return cast.player.api.HlsSegmentFormat.MPEG2_TS;
            case "ts_aac":
                return cast.player.api.HlsSegmentFormat.TS_AAC
        }
    };

    function Rk() {
        this.a = Sk;
        this.c = Tk;
        this.b = Uk
    }

    function Sk(a) {
        return new cast.player.api.Host({
            mediaElement: null,
            url: a
        })
    }

    function Tk(a, b, c) {
        switch (a) {
            case "application/x-mpegurl":
            case "application/vnd.apple.mpegurl":
                return cast.player.api.CreateHlsStreamingProtocol(c, cast.f.media.ua.pd(b));
            case "application/vnd.ms-sstr+xml":
                return cast.player.api.CreateSmoothStreamingProtocol(c);
            case "application/dash+xml":
                return cast.player.api.CreateDashStreamingProtocol(c);
            default:
                return Sa("Unsupported mimetype: " + a), cast.player.api.CreateHlsStreamingProtocol(c)
        }
    }

    function Uk(a) {
        return new cast.player.api.Player(a)
    };

    function Vk(a, b, c, d, e) {
        uj.call(this, a, c, d, e);
        var f = this;
        c = b.a(a.url);
        Wk(c, a.playbackConfig);
        c.onCue = this.rg.bind(this);
        c.onError = this.Bg.bind(this);
        c.onManifestReady = this.ug.bind(this);
        c.processMetadata = function(a, b) {
            "EMSG" === a ? zj(f, new bj({
                segmentData: b
            })) : "ID3" === a ? zj(f, new dj(b)) : B(Xk, "MPL metadata event of type " + a + " was ignored.")
        };
        this.h = b.c(a.mimeType, a.hlsSegmentFormat, c);
        this.b = b.b(c);
        this.l = c;
        this.l.trackBandwidth = this.lh.bind(this);
        this.l.getQualityLevel = this.ag.bind(this)
    }
    m(Vk, uj);
    g = Vk.prototype;
    g.La = function() {
        return cast.f.common.K.eb.ue
    };
    g.Bb = function(a, b, c) {
        C(Xk, "load: " + c);
        this.l.mediaElement = a;
        a.autoplay = b;
        2 == this.g ? this.b.load() : this.b.load(this.h, c);
        yj(this, a, "loadedmetadata", this.De.bind(this, a))
    };
    g.Id = function(a) {
        this.b.preload(this.h, a);
        this.g = 2
    };
    g.rg = function() {
        this.l.onCue = null;
        if (this.a.c.length) {
            var a = this.a.S().activeTrackIds || [];
            this.b.enableCaptions(!1, cast.player.api.CaptionsType.CEA608);
            Ai(this.a, a)
        } else this.b.enableCaptions(!1, cast.player.api.CaptionsType.CEA608), a = this.a.ra("TEXT"), a.trackContentType = cast.player.api.CaptionsType.CEA608, Ji(this.a, [a]), zj(this, new pj(cast.f.o.kd(a)))
    };
    g.Bg = function(a) {
        a = cast.f.media.ua.sb(a);
        Aj(this, a)
    };
    g.ug = function() {};
    g.lh = function(a, b, c) {
        zj(this, new nj(b, c))
    };
    g.ag = function(a, b) {
        for (var c = this.w, d = 0, e = 0; e < this.h.getStreamCount(); e++)
            if (this.h.isStreamEnabled(e) && !ud(this.h.getStreamInfo(e).mimeType)) {
                var f = e === a ? b : this.h.getQualityLevel(e);
                if (0 > f) return b;
                d += this.h.getStreamInfo(e).bitrates[f]
            }
        this.w = d;
        c !== this.w && zj(this, new aj(this.w));
        return b
    };
    g.sa = function() {
        var a = this.b.getState(cast.player.api.Player.State.SEEKABLE);
        return a && a.seekable ? new Bh(a.seekable.start, a.seekable.end) : null
    };
    g.De = function() {
        this.i.resolve(this.b.getStreamingProtocol().getDuration());
        this.m.resolve(this.a.Ea());
        Bj(this)
    };
    g.jb = function() {
        this.b.unload();
        this.j.resolve()
    };

    function Wk(a, b) {
        null != b.initialBandwidth && (a.initialBandwidth = b.initialBandwidth);
        null != b.autoResumeDuration && (a.autoResumeDuration = b.autoResumeDuration);
        null != b.autoResumeNumberOfSegments && (a.autoResumeNumberOfSegments = b.autoResumeNumberOfSegments);
        null != b.autoPauseDuration && (a.autoPauseDuration = b.autoPauseDuration);
        null != b.segmentRequestRetryLimit && (a.segmentRequestRetryLimit = b.segmentRequestRetryLimit);
        null != b.licenseUrl && (a.licenseUrl = b.licenseUrl);
        null != b.protectionSystem && (a.protectionSystem =
            b.protectionSystem);
        null != b.licenseCustomData && (a.licenseCustomData = b.licenseCustomData);
        null != b.manifestRequestHandler && (a.updateManifestRequestInfo = b.manifestRequestHandler);
        null != b.segmentRequestHandler && (a.updateSegmentRequestInfo = function(a) {
            b.segmentRequestHandler(a)
        });
        null != b.licenseRequestHandler && (a.updateLicenseRequestInfo = b.licenseRequestHandler);
        null != b.captionsRequestHandler && (a.updateCaptionsRequestInfo = b.captionsRequestHandler);
        null != b.manifestHandler && (a.processManifest = b.manifestHandler);
        null != b.segmentHandler && (a.processSegment = function(a, d) {
            b.segmentHandler(d)
        });
        null != b.licenseHandler && (a.processLicense = b.licenseHandler)
    }

    function Yk(a, b, c, d) {
        return cast.f.common.A.Qb.then(function() {
            return new Vk(a, new Rk, b, c, d)
        })
    }
    var Xk = w("cast.framework.media.StreamingPlayer");

    function Zk(a, b) {
        rj.call(this, a, b);
        this.i = a.b;
        this.m = a.h;
        this.a = new Map
    }
    m(Zk, rj);

    function $k(a, b) {
        return new Zk(a, b)
    }
    g = Zk.prototype;
    g.Ea = function() {
        var a = cast.f.media.ua.Re(this.m),
            b = 0;
        a = k(a);
        for (var c = a.next(); !c.done; c = a.next()) {
            c = c.value;
            var d = c.mimeType;
            if (d) {
                var e = al(d, c.codecs);
                if (e) {
                    "TEXT" == e && (d = bl(d, c.codecs));
                    var f = sj(this, e, c.name, c.language, d);
                    f ? e = f : (e = this.ra(e), e.name = c.name, e.language = c.language, e.trackContentType = d, Ji(this, [e]));
                    this.a.set(e.trackId, b);
                    b++
                }
            }
        }
    };
    g.fc = function() {
        rj.prototype.fc.call(this);
        this.i.enableCaptions(!0, cast.player.api.CaptionsType.CEA608)
    };

    function al(a, b) {
        a = a.toLowerCase();
        if (ud(a) || "application/mp4" == a && "stpp" == b) return "TEXT";
        switch (a.split("/")[0]) {
            case "video":
                return "VIDEO";
            case "audio":
                return "AUDIO";
            default:
                return null
        }
    }

    function bl(a, b) {
        a = a.toLowerCase();
        if (fb(ui, a)) return a;
        b = b ? b.toLowerCase() : null;
        switch (b) {
            case "ttml":
                return "application/ttml+xml";
            case "webvtt":
                return "text/vtt"
        }
        B(cl, "cannot guess text mime type. Defaults to VTT");
        return "text/vtt"
    }
    g.Yb = function(a, b) {
        var c = -1,
            d = -1,
            e = this.m;
        null != a ? -1 < a && (c = this.a.get(a)) : c = e.getDefaultAudioStreamIndex();
        null != b ? -1 < b && (d = this.a.get(b)) : d = e.getDefaultAudioStreamIndex();
        c != d && (e.enableStream(c, !1), e.enableStream(d, !0), this.i.reload())
    };
    g.rb = function() {
        for (var a = this.m.getDefaultAudioStreamIndex(), b = null, c = k(this.a), d = c.next(); !d.done; d = c.next()) {
            d = k(d.value);
            var e = d.next().value;
            if (d.next().value === a) {
                b = e;
                break
            }
        }
        return b
    };
    g.mb = function(a) {
        for (var b = this, c = !1, d = a.map(function(a) {
                return b.a.get(a)
            }), e = this.m, f = e.getStreamCount(), h = 0; h < f; h++) {
            var l = e.getStreamInfo(h).mimeType;
            l && ud(l) && (d.includes(h) && !e.isStreamEnabled(h) ? (e.enableStream(h, !0), c = !0) : !d.includes(h) && e.isStreamEnabled(h) && (e.enableStream(h, !1), c = !0))
        }
        c && this.i.enableCaptions(!0);
        var v = d.findIndex(function(a) {
            return !p(a)
        });
        if (0 <= v && (c = this.tracks.find(function(b) {
                return b.trackId == a[v]
            })) && c.trackContentType == cast.player.api.CaptionsType.CEA608) {
            this.i.enableCaptions(!0,
                cast.player.api.CaptionsType.CEA608);
            return
        }
        this.i.enableCaptions(!1, cast.player.api.CaptionsType.CEA608)
    };
    var cl = w("cast.framework.media.StreamingTracksManager");

    function dl(a, b, c) {
        c = p(c) ? c : Infinity;
        var d = a.mimeType.toLowerCase();
        switch (d) {
            case "application/x-mpegurl":
            case "application/vnd.apple.mpegurl":
            case "application/vnd.ms-sstr+xml":
            case "application/dash+xml":
                var e = Yk,
                    f = $k;
                cast.f.common.A.Sd && "application/dash+xml" == d && (e = Gk, f = Jk);
                return e(a, b, c, f)
        }
        return d.startsWith("image/") ? ad(new Jj(a)) : ad(new Mk(a, b, c, Qk))
    };

    function el(a, b, c, d) {
        this.ea = a;
        this.ja = b.contentUrl || b.contentId;
        this.u = c;
        this.J = d;
        this.X = new Qi;
        this.a = this.mediaElement = null;
        this.ba = c.a;
        this.b = null;
        this.C = this.isPlayingBreak = !1;
        this.L = this.F = this.M = r;
        this.c = 1;
        this.P = fd();
        this.P.a.then(this.tg.bind(this));
        this.W = fd();
        this.m = NaN;
        a = new he;
        b.tracks && (a.tracks = cast.f.o.Qd(b.tracks));
        b.textTrackStyle && (a.textTrackStyle = cast.f.o.Pd(b.textTrackStyle));
        this.g = a;
        this.v = fd()
    }
    g = el.prototype;
    g.load = function() {};
    g.reset = function() {
        C(fl, "reset()");
        this.end("STOPPED")
    };
    g.getVolume = function() {
        var a = new de;
        a.level = this.mediaElement.volume;
        a.muted = this.mediaElement.muted;
        return a
    };
    g.setVolume = function(a) {
        p(a.level) && (this.mediaElement.volume = a.level);
        p(a.muted) && (this.mediaElement.muted = a.muted)
    };
    g.getDurationSec = function() {
        return q(this.m) ? this.m : Infinity
    };
    g.getCurrentTimeSec = function() {
        return this.tb()
    };
    g.editTracksInfo = function(a) {
        return Gj(this.a, a)
    };
    g.registerErrorCallback = function(a) {
        this.F = a
    };
    g.registerEndedCallback = function(a) {
        this.L = a
    };
    g.registerLoadCallback = function(a) {
        this.M = a
    };
    g.unregisterErrorCallback = function() {
        this.F = r
    };
    g.unregisterEndedCallback = function() {
        this.L = r
    };
    g.unregisterLoadCallback = function() {
        this.M = r
    };
    g.pause = function() {
        C(fl, "pause");
        this.a.pause()
    };
    g.play = function() {
        C(fl, "play");
        this.a.play()
    };

    function gl(a) {
        if (!a.b) return !1;
        var b = a.b.a.b;
        a = a.xa();
        return q(b) && b <= a
    }
    g.Fc = function() {
        Sa("Not implemented")
    };
    g.xc = function() {
        Sa("Not implemented")
    };
    g.seek = function(a, b) {
        this.isPlayingBreak ? B(fl, "seek request during break was ignored.") : 0 > a ? B(fl, "Invalid seek value - " + a) : this.xc(a, b)
    };
    g.getState = function() {
        switch (this.c) {
            case 1:
            case 2:
            case 3:
                return "PLAYING";
            case 4:
                return this.a ? cast.f.o.jh(this.a.Yc()) : "PLAYING";
            case 5:
            case 6:
                return "PLAYING";
            default:
                return Sa(), "PLAYING"
        }
    };
    g.sa = function() {
        return this.a ? this.a.sa() : null
    };

    function hl(a, b, c, d, e, f) {
        a.mediaElement = b;
        a.g.activeTrackIds = e || a.g.activeTrackIds;
        return a.pc(c, d).then(function() {
            a.Vb(f);
            return a.W.a
        })
    }
    g.Ba = function(a) {
        this.Jd(a)
    };
    g.ob = function() {
        return this.b ? Nj(this.b.a) || null : null
    };
    g.xa = function() {
        return this.b ? this.ba.j(this.ha()) : null
    };
    g.ha = function() {
        return this.a ? this.a.getCurrentTimeSec() : 0
    };
    g.tb = function() {
        var a = this.ha();
        return this.ba.c(a)
    };
    g.Ab = function() {
        if (!this.mediaElement) return !1;
        var a = this.mediaElement.buffered;
        if (1 > a.length) return !1;
        var b = a.length - 1,
            c = a.start(b);
        a = a.end(b);
        return c <= this.ha() && a >= this.mediaElement.duration
    };
    g.end = function(a) {
        var b = this;
        if (6 == this.c) return this.v.a;
        p(this.l) || (this.l = this.getCurrentTimeSec());
        var c = this.c;
        this.c = 6;
        this.F = r;
        this.Zc(a);
        return this.v.a.then(function() {
            "END_OF_STREAM" === a && b.L();
            b.isPlayingBreak && il(b, "BREAK_ENDED");
            5 > c && b.X.dispatchEvent(new hj(b.l, a));
            b.X.$()
        })
    };
    g.Zc = function(a) {
        var b = this;
        C(fl, "endInternal()");
        this.a ? (this.a.end(a).then(function() {
            b.v.resolve()
        }), this.a = null) : this.v.resolve()
    };
    g.pc = function() {
        Sa("This should be implemented");
        return bd()
    };
    g.Jd = function() {};

    function kl(a, b, c, d) {
        var e = b.b,
            f = b.a;
        b = e.a.indexOf(f) + 1;
        e = e.a.length;
        f = f.b;
        var h = a.xa() || 0;
        "BREAK_CLIP_ENDED" == c && (h = p(a.l) ? a.l : h);
        a.X.dispatchEvent(new kj(c, h, b, e, f, d))
    }

    function ll(a) {
        a.c = 4;
        "PAUSED" == a.getState() && a.J(!1)
    }

    function il(a, b, c, d) {
        c = void 0 === c ? null : c;
        var e = c != a.b,
            f = !1;
        a.b && e && kl(a, a.b, "BREAK_CLIP_ENDED", d);
        a.b && "BREAK_ENDED" == b && (kl(a, a.b, b), f = !0, a.isPlayingBreak = !1, a.C = !1);
        if (a.b = c) a.isPlayingBreak || (kl(a, c, "BREAK_STARTED"), a.isPlayingBreak = !0, a.C = gl(a)), e && "BREAK_CLIP_STARTED" == b && kl(a, c, "BREAK_CLIP_PLAYING"), kl(a, c, b), f = !0;
        f && a.J(!1)
    }

    function ml(a, b, c) {
        a.a.X.addEventListener(b, c, a)
    }

    function nl(a) {
        a.a.X.Bc(a.X);
        ml(a, "ERROR", a.Hb);
        ml(a, "TIME_UPDATE", a.Ra)
    }
    g.Hb = function() {
        C(fl, "player event: error");
        this.F(Error())
    };
    g.Ra = function() {
        var a = gl(this);
        a != this.C && (this.C = a, this.J(!1))
    };
    g.tg = function(a) {
        this.m = a;
        Yj(this.ba, a);
        this.M()
    };
    g.dc = function(a) {
        return Hj(this.a, a)
    };
    g.Vb = function(a) {
        this.mediaElement.playbackRate = a ? a : 1;
        return a
    };

    function L(a) {
        return a.a && a.a.a
    }
    var fl = w("cast.framework.media.Player");

    function ol(a, b, c, d) {
        el.call(this, a, b, c, d);
        this.h = null
    }
    m(ol, el);

    function pl(a, b) {
        b = ek(a.ba, b || 0);
        return dl(a.u, b)
    }
    g = ol.prototype;
    g.pc = function(a, b) {
        var c = this;
        return (this.h || pl(this, b)).then(function(b) {
            cast.f.common.K.Cd(b);
            b.getDurationSec().then(function(a) {
                a = c.ba.c(a);
                c.P.resolve(a)
            });
            Cj(b).then(function(a) {
                c.W.resolve(a)
            });
            c.a = b;
            nl(c);
            ml(c, "CLIP_STARTED", c.Pg);
            ml(c, "CLIP_ENDED", c.Be);
            b.kb(c.mediaElement, a, c.g)
        })
    };
    g.Jd = function(a) {
        var b = this;
        this.h = pl(this, a).then(function(a) {
            a.Ba(b.g);
            return a
        })
    };
    g.xc = function(a, b) {
        C(ql, "seek: " + a);
        this.a.seek(ek(this.ba, a), b)
    };
    g.Fc = function() {
        var a = this.ha(),
            b = gk(this.ba, a);
        this.a.seek(a + Nj(b.a) - (Vj(b.b, b.c) + a))
    };
    g.Ra = function(a) {
        var b = this.ha();
        if (b = gk(this.ba, b)) {
            var c;
            if (c = this.b) {
                c = this.b;
                var d;
                if (d = null !== b && c.b == b.b) d = (d = b.a) ? c.a.a.id == d.a.id : !1;
                c = d
            }
            c || il(this, "BREAK_CLIP_STARTED", b)
        } else this.b && il(this, "BREAK_ENDED");
        el.prototype.Ra.call(this, a)
    };
    g.Pg = function() {
        C(ql, "started");
        ll(this)
    };
    g.Be = function(a) {
        C(ql, "ended");
        5 > this.c && (il(this, "BREAK_ENDED", null, a.endedReason), this.a = null, this.l = a.currentMediaTime, this.end(a.endedReason))
    };
    var ql = w("cast.framework.media.EmbeddedPlayer");
    cast.f.media.util = {};
    cast.f.media.util.D = w("cast.framework.media.util");
    cast.f.media.util.Zb = {
        m3u8: "application/x-mpegurl",
        manifest: "application/vnd.ms-sstr+xml",
        mpd: "application/dash+xml",
        ism: "application/vnd.ms-sstr+xml",
        m4v: "video/mp4",
        mp4: "video/mp4",
        ogv: "video/ogg",
        aac: "audio/aac",
        m4a: "audio/mp4",
        mp3: "audio/mp3",
        oga: "audio/ogg",
        wav: "audio/wav",
        jpg: "image/jpg",
        gif: "image/gif",
        png: "image/png"
    };
    cast.f.media.util.ge = {
        video: "audio_video",
        audio: "audio_only",
        image: "image"
    };
    cast.f.media.util.Gh = function(a) {
        return fb(vi, a)
    };
    cast.f.media.util.gg = function(a) {
        return (a = cast.f.media.util.ge[a.split("/")[0]]) ? a : "audio_video"
    };
    cast.f.media.util.Wf = function(a) {
        a = a.split("/").pop() || "";
        a = a.split("?")[0] || "";
        return a.split(".").pop() || ""
    };
    cast.f.media.util.hg = function(a) {
        if (a = cast.f.media.util.Zb[a]) return a;
        B(cast.f.media.util.D, "cannot guess mime type from given contenId/Type. Assume that this is video/mp4");
        return "video/mp4"
    };
    cast.f.media.util.fg = function(a, b, c) {
        b = cast.f.media.util.ud(c || a.contentUrl || a.contentId, a.contentType, b, a.hlsSegmentFormat);
        if (a = cast.f.media.util.Qe(a, b)) b.a = a;
        return b
    };
    cast.f.media.util.td = function(a, b) {
        return cast.f.media.util.ud(String(a.contentUrl || a.contentId), a.contentType, b, a.hlsSegmentFormat)
    };
    cast.f.media.util.ud = function(a, b, c, d) {
        var e = cast.f.media.util.Wf(a.toLowerCase());
        b = (b || "").toLowerCase();
        !fb(vi, b) && cast.f.media.util.Zb[e] && (b = cast.f.media.util.Zb[e]);
        b = b || cast.f.media.util.hg(e);
        a = new sk(a, b, c, cast.f.media.util.gg(b));
        p(d) && (a.hlsSegmentFormat = d);
        return a
    };
    cast.f.media.util.Qe = function(a, b) {
        if (!a.breaks || !a.breakClips || 0 == a.breaks.length) return null;
        var c = new Map(a.breakClips.map(function(a) {
                return [a.id, a]
            })),
            d = a.breaks[0].isEmbedded,
            e = null;
        d || (e = new nk);
        var f = [];
        a = k(a.breaks);
        for (var h = a.next(); !h.done; h = a.next()) {
            var l = h.value;
            if (p(l.position))
                if (l.breakClipIds)
                    if (l.isEmbedded != d) A(cast.f.media.util.D, "Break with wrong type is ignored");
                    else if (h = l.position, 0 > h) A(cast.f.media.util.D, "Break with negative position is ignored");
            else if (q(h) || !d && null ===
                h) {
                l = k(l.breakClipIds);
                for (var v = l.next(); !v.done; v = l.next()) {
                    var x = v.value;
                    (v = c.get(x)) ? (x = void 0, d ? v.duration ? q(v.duration) ? 0 >= v.duration ? A(cast.f.media.util.D, "Embedded break with negative or zero duration is ignored") : (x = new Mj(b, v), f.push(new kk(h, h + v.duration, x)), h += v.duration) : A(cast.f.media.util.D, "Embedded break with non-numeric duration is ignored") : A(cast.f.media.util.D, "Embedded break clip with no duration is ignored") : v.contentUrl || v.contentId ? (x = cast.f.media.util.td(v, b.playbackConfig),
                        x = new Mj(x, v), ok(e, h, [x])) : A(cast.f.media.util.D, "Client side break clip with no url is ignored")) : A(cast.f.media.util.D, "Missing break clip " + x)
                }
            } else A(cast.f.media.util.D, "Break with non-numeric position is ignored");
            else A(cast.f.media.util.D, "Break with no break clips is ignored");
            else A(cast.f.media.util.D, "Break with no position is ignored")
        }
        d && (e = jk(f));
        return e
    };

    function rl(a, b, c, d) {
        el.call(this, a, b, c, d);
        this.i = null;
        this.R = this.ba;
        this.s = this.h = this.j = null;
        this.G = [];
        this.w = void 0;
        this.N = fd()
    }
    m(rl, el);
    g = rl.prototype;
    g.Zc = function(a) {
        var b = this;
        C(sl, "endInternal()");
        var c = [];
        this.a && (il(this, "BREAK_ENDED", null, a), this.a.X.removeEventListener("CLIP_ENDED", this.ec), c.push(this.a.end(a)), this.a = null);
        this.i && (c.push(this.i.end(a)), this.i = null);
        ed(c).then(function() {
            b.v.resolve()
        })
    };
    g.xc = function(a, b) {
        var c = this;
        C(sl, "seek: " + a);
        var d = this.getCurrentTimeSec(),
            e = rk(this.R, d, a),
            f = [];
        0 < e.length && (d = Di(this.ea, new Ci(d, a, e.map(function(a) {
            return a.b
        }))), f = ad(d).then(function(b) {
            if (b) {
                a = b.seekTo;
                for (var d = c.ea, e = c.u, f = [], h = k(b.breaks), W = h.next(); !W.done; W = h.next()) {
                    W = k(W.value.breakClipIds);
                    for (var S = W.next(); !S.done; S = W.next())
                        if (S = d.nd(S.value)) {
                            var Ra = cast.f.media.util.td(S, e.playbackConfig);
                            f.push(new Mj(Ra, S))
                        }
                }
                b = new Rj(f, b.seekTo);
                d = [];
                for (e = 0; e < b.a.length; e++) d.push(mk(new Pj(b,
                    e)));
                return d
            }
            return []
        }));
        ad(f).then(function(d) {
            if (0 == d.length) c.a.seek(a, b);
            else {
                c.G = d;
                var e = c.G.shift();
                tl(e).then(function(d) {
                    c.i = d;
                    var f = p(b) ? "PLAYBACK_START" == b : !c.mediaElement.paused;
                    if (c.a) {
                        c.a.X.removeEventListener("CLIP_ENDED", c.ec);
                        var h = c.a.end("STOPPED")
                    } else h = ad();
                    c.s = a;
                    h.then(function() {
                        ul(c, d, e, f)
                    })
                })
            }
        })
    };
    g.Fc = function() {
        this.a.end("SKIPPED")
    };

    function vl(a, b) {
        a.h = 0 < a.G.length ? a.G.shift() : qk(a.R, b, a.u);
        return a.h ? tl(a.h).then(function(b) {
            var c = null;
            a.h.breakStatus || (wl(a, b), c = a.g);
            b && a.N.a.then(function() {
                C(sl, "Preloading Next Clip");
                b.Ba(c)
            });
            a.i = b
        }) : (C(sl, "No more player afterwards"), ad())
    }

    function ul(a, b, c, d) {
        C(sl, "loadCurrentPlayerAndCreateNext_: " + c.startTime);
        cast.f.common.K.Cd(b);
        a.a = b;
        a.j = c;
        nl(a);
        ml(a, "CLIP_STARTED", a.pg);
        ml(a, "CLIP_ENDED", a.ec);
        a.j.breakStatus && il(a, "BREAK_CLIP_PLAYING", a.j.breakStatus, a.w);
        a.w = void 0;
        b.kb(a.mediaElement, d, c.breakStatus ? null : a.g);
        a.N = fd();
        return vl(a, c)
    }

    function tl(a) {
        return dl(a.a, a.startTime, a.endTime)
    }
    g.pc = function(a, b) {
        var c = this,
            d = pk(this.R, b || 0, this.u);
        if (d.breakStatus) {
            b = xl(this);
            var e, f = tl(d).then(function(a) {
                e = a;
                a.Ba(null)
            });
            return ed([b, f]).then(function() {
                return ul(c, e, d, a)
            })
        }
        return tl(d).then(function(b) {
            wl(c, b);
            return ul(c, b, d, a)
        })
    };

    function xl(a) {
        return dl(a.u, 0).then(function(b) {
            b.X.addEventListener("ERROR", function(b) {
                return el.prototype.Hb.call(a, b)
            });
            var c = wl(a, b);
            b.kb(a.mediaElement, !1, a.g);
            return c.then(function() {
                return b.end("STOPPED")
            })
        })
    }

    function wl(a, b) {
        var c = b.getDurationSec().then(function(b) {
            a.P.resolve(b)
        });
        b = Cj(b).then(function(b) {
            a.W.resolve(b)
        });
        return ed([c, b])
    }
    g.editTracksInfo = function(a) {
        return this.b || !this.a ? null : Gj(this.a, a)
    };
    g.dc = function(a) {
        if (!this.b && this.a) return Hj(this.a, a)
    };
    g.ha = function() {
        return el.prototype.ha.call(this)
    };
    g.tb = function() {
        return null === this.s ? this.ha() : this.s
    };
    g.Ab = function() {
        return this.h ? !1 : el.prototype.Ab.call(this)
    };
    g.pg = function() {
        var a = this;
        C(sl, "clip started");
        4 > this.c && ll(this);
        var b = this.j.breakStatus;
        b ? this.a.getDurationSec().then(function(c) {
            b.a.a.duration = c;
            il(a, "BREAK_CLIP_STARTED", b)
        }) : this.s = null
    };
    g.ec = function(a) {
        C(sl, "clip ended");
        this.w = a.endedReason;
        this.j.breakStatus ? this.h.breakStatus || (il(this, "BREAK_ENDED", null, this.w), this.w = void 0) : (this.s = this.a.getCurrentTimeSec(), this.a.L && (this.g = this.a.L));
        var b;
        if (b = 5 > this.c) {
            C(sl, "switchPlayerAndCip");
            if (b = this.i) {
                var c = this.h;
                this.h = this.i = null;
                ul(this, b, c, !0);
                b = !0
            } else C(sl, "breakList player ends since there is no more player to switch to"), b = !1;
            b = !b
        }
        b && (this.a = null, this.l = a.currentMediaTime, this.end(a.endedReason))
    };
    g.Hb = function(a) {
        this.j.breakStatus ? C(sl, "player event: break clip error") : el.prototype.Hb.call(this, a)
    };
    g.Ra = function(a) {
        el.prototype.Ra.call(this, a);
        var b = this.mediaElement.buffered;
        if (1 <= b.length) {
            var c = b.length - 1;
            a = b.start(c);
            b = b.end(c);
            c = this.ha();
            var d = Math.min(this.j.endTime, this.mediaElement.duration);
            a <= c && b >= d && this.N.resolve()
        }
    };
    var sl = w("cast.framework.media.StitchingPlayer");

    function yl(a) {
        this.a = a
    };

    function zl() {}

    function T(a) {
        if (!(a instanceof zl)) throw A(U, "Proper Player object can be acquried by calling getPlayer() of cast.framework.Application object"), Error("player is not created properly.");
        this.j = new Qi;
        this.P = new yl(this.B.bind(this));
        this.a = new Li;
        this.h = new Li;
        this.c = null;
        this.g = Re.ga();
        this.J = this.l = this.b = this.F = this.L = this.G = this.C = null;
        this.s = new K(new xi);
        this.m = new O(new Hi);
        this.M = new N(new Gi);
        this.v = new M;
        this.N = 1;
        this.u = new Map;
        this.i = 0;
        this.w = null;
        Al(this)
    }
    u("cast.framework.PlayerManager", T);

    function Al(a) {
        Si(a.j, function(b, d) {
            "ERROR" !== b && Bl(a, new cj(900, d))
        });
        a.j.addEventListener("MEDIA_FINISHED", a.Ag, a);
        a.j.addEventListener("INBAND_TRACK_ADDED", a.vg, a);
        a.j.addEventListener("ERROR", a.ze, a);
        a.g.h = a.Ng.bind(a);
        a.g.g = a.wg.bind(a);
        P(a.h, "LOAD_BY_ENTITY", a.g.g.bind(a.g));
        a.g.g = a.h.a;
        P(a.h, "SET_CREDENTIALS", a.g.h.bind(a.g));
        a.g.h = a.h.a;
        a.g.s = a.h.a;
        a.g.l = a.h.a;
        a.g.i = a.h.a;
        a.g.m = a.h.a;
        a.g.b = a.sc.bind(a);
        var b = Object.keys(Cl).reduce(function(b, d) {
            b[d] = a.vd.bind(a);
            return b
        }, {});
        Ni(a.a, b);
        b =
            Object.keys(Dl).reduce(function(b, d) {
                b[d] = a.vd.bind(a);
                return b
            }, {});
        Ni(a.h, b);
        cast.f.common.A.Qb.then(function() {
            va("cast.player.api.ContentCache.setCacheInsertCallback") && (cast.player.api.ContentCache.setCacheInsertCallback(a.og.bind(a)), cast.player.api.ContentCache.setCacheHitCallback(a.ng.bind(a)))
        })
    }
    T.prototype.Ld = function(a) {
        this.J = a
    };
    T.prototype.setPlaybackConfig = T.prototype.Ld;
    T.prototype.Yf = function() {
        return this.J
    };
    T.prototype.getPlaybackConfig = T.prototype.Yf;
    T.prototype.Rf = function() {
        return this.s
    };
    T.prototype.getAudioTracksManager = T.prototype.Rf;
    T.prototype.cg = function() {
        return this.m
    };
    T.prototype.getTextTracksManager = T.prototype.cg;
    T.prototype.bg = function() {
        return this.M
    };
    T.prototype.getQueueManager = T.prototype.bg;
    T.prototype.Uf = function() {
        return this.v
    };
    T.prototype.getBreakManager = T.prototype.Uf;
    g = T.prototype;
    g.Ag = function() {
        this.b = null;
        this.s.reset();
        this.m.reset();
        this.v.reset()
    };
    g.vg = function() {
        Fg(this.c, this.m.S(), !0)
    };
    g.Ng = function(a) {
        this.w = a.credentials;
        return new cf
    };
    g.wg = function(a) {
        var b = new Ch;
        b.media = new Dh;
        b.autoplay = !0;
        b.media.entity = a.entity;
        this.w && (b.credentials = this.w, b.credentialsType = "cloud");
        a.shuffle && (a = new Vh, a.repeatMode = "REPEAT_ALL_AND_SHUFFLE", b.queueData = a);
        return this.load(b).then(function() {
            return new cf
        })
    };
    g.ze = function(a) {
        Tg("Cast.CAF.Error", a.detailedErrorCode || 0)
    };
    g.addEventListener = function(a, b) {
        var c = this;
        if (!t(b)) throw A(U, "addEventListener failed since handler is not a function"), Error("addEventListener failed since handler is not a function");
        ya(a) ? a.forEach(function(a) {
            El(c, a, b)
        }) : El(this, a, b)
    };
    T.prototype.addEventListener = T.prototype.addEventListener;

    function El(a, b, c) {
        Tg("Cast.CAF.EventListenerAdded", cast.f.common.K.od(b));
        if (!fb(Ti, b)) throw a = "addEventListener(" + b + ") failed due to invalid event type", A(U, a), Error(a);
        a.j.addEventListener(b, c)
    }
    T.prototype.removeEventListener = function(a, b) {
        var c = this;
        ya(a) ? a.forEach(function(a) {
            Fl(c, a, b)
        }) : Fl(this, a, b)
    };
    T.prototype.removeEventListener = T.prototype.removeEventListener;

    function Fl(a, b, c) {
        Tg("Cast.CAF.EventListenerRemoved", cast.f.common.K.od(b));
        a.j.removeEventListener(b, c)
    }
    T.prototype.ab = function(a, b) {
        var c = null;
        fb(zh, a) ? null == b || t(b) || (c = "setMessageInterceptor(" + a + ") failed since handler is not a function") : c = "setMessageInterceptor(" + a + ") failed due to invalid request type";
        if (c) throw A(U, c), Error(c);
        Tg("Cast.CAF.MessageInterceptorSet", cast.f.common.K.Xf(a));
        switch (a) {
            case "MEDIA_STATUS":
                this.F = b;
                break;
            case "CLOUD_STATUS":
                this.c.ac = b;
                break;
            case "GET_STATUS":
            case "LOAD":
            case "PAUSE":
            case "STOP":
            case "PLAY":
            case "PLAY_AGAIN":
            case "SEEK":
            case "SET_PLAYBACK_RATE":
            case "SET_VOLUME":
            case "SKIP_AD":
            case "EDIT_TRACKS_INFO":
            case "EDIT_AUDIO_TRACKS":
            case "PRECACHE":
            case "PRELOAD":
            case "QUEUE_LOAD":
            case "QUEUE_INSERT":
            case "QUEUE_UPDATE":
            case "QUEUE_REMOVE":
            case "QUEUE_REORDER":
            case "QUEUE_GET_ITEM_RANGE":
            case "QUEUE_GET_ITEMS":
            case "QUEUE_GET_ITEM_IDS":
                b =
                    this.W.bind(this, a, b);
                this.a.ab(Gl[a], b);
                (a = "LOAD" != a) || (a = this.a.b[Gl.PRELOAD], a = a == r ? null : a);
                a || this.a.ab(Gl.PRELOAD, b);
                break;
            case "SET_CREDENTIALS":
            case "LOAD_BY_ENTITY":
            case "USER_ACTION":
            case "DISPLAY_STATUS":
            case "FOCUS_STATE":
            case "CUSTOM_COMMAND":
                this.h.ab(a, this.R.bind(this, a, b));
                break;
            default:
                throw c = "Unknown message type - " + a, A(U, c), Error(c);
        }
    };
    T.prototype.setMessageInterceptor = T.prototype.ab;

    function Hl(a, b, c, d, e) {
        a.c.Z(b.senderId, b.data.requestId, c || ("LOAD" == b.data.type ? "LOAD_FAILED" : "ERROR"), void 0 === d ? "APP_ERROR" : d, e)
    }
    T.prototype.W = function(a, b, c) {
        var d = this,
            e = null;
        try {
            e = b(cast.f.o.Gf(c.data))
        } catch (f) {
            throw Hl(this, c), f;
        }
        return Promise.resolve(e).then(function(a) {
            if (!a) return Il(d, c.data.requestId), null;
            if (fb(Uh, a.type)) return Hl(d, c, a.type, a.reason, a.customData), Jl(d, c.data.requestId, a), null;
            c.data = a;
            return c
        }).catch(function(b) {
            A(U, a + " Interceptor Error " + b);
            Hl(d, c);
            Jl(d, c.data.requestId);
            if (b instanceof Error) throw b;
            return null
        })
    };
    T.prototype.R = function(a, b, c) {
        a = b(c);
        return Promise.resolve(a).then(function(a) {
            return a ? fb(ae, a.type) ? new Ye(a.reason || "APP_ERROR") : a : new cf
        })
    };
    T.prototype.Yg = function(a) {
        null == a || t(a) ? this.C = a : A(U, "setMediaPlaybackInfoHandler() cannot set handler since it's not a function")
    };
    T.prototype.setMediaPlaybackInfoHandler = T.prototype.Yg;
    T.prototype.Zg = function(a) {
        null == a || t(a) ? this.G = a : A(U, "setMediaUrlHandler() cannot set handler since it's not a function")
    };
    T.prototype.setMediaUrlResolver = T.prototype.Zg;
    T.prototype.uc = function(a, b) {
        return this.g.uc(a, b).then(function(a) {
            var b = null;
            "ERROR" == a.type && (b = new Ah("ERROR"), b.reason = a.code);
            return b
        })
    };
    T.prototype.playString = T.prototype.uc;
    T.prototype.vc = function() {
        return this.g.vc().then(function(a) {
            if ("ERROR" == a.type) {
                var b = new Ah("ERROR");
                b.reason = a.code;
                return Promise.reject(b)
            }
        })
    };
    T.prototype.refreshCredentials = T.prototype.vc;
    T.prototype.$a = function(a) {
        this.L = ad(a)
    };
    T.prototype.setMediaElement = T.prototype.$a;
    T.prototype.ub = function() {
        return this.c ? cast.f.o.Bf(this.c.ub()) : null
    };
    T.prototype.getMediaInformation = T.prototype.ub;
    T.prototype.Ac = function(a, b) {
        this.c && this.c.Ac(cast.f.o.ih(a), b)
    };
    T.prototype.setMediaInformation = T.prototype.Ac;
    T.prototype.B = function(a, b, c, d) {
        this.c && this.c.B(void 0 === a ? !1 : a, b, c, d)
    };
    T.prototype.broadcastStatus = T.prototype.B;
    T.prototype.Tb = function(a, b, c, d, e) {
        this.c && this.c.Tb(a, b, void 0 === c ? !1 : c, d, e)
    };
    T.prototype.sendStatus = T.prototype.Tb;
    T.prototype.zc = function(a) {
        this.c && this.c.zc(cast.f.o.gh(a))
    };
    T.prototype.setIdleReason = T.prototype.zc;
    T.prototype.Z = function(a, b, c, d, e) {
        this.c && this.c.Z(a, b, cast.f.o.fh(c), cast.f.o.eh(void 0 === d ? null : d), void 0 === e ? null : e)
    };
    T.prototype.sendError = T.prototype.Z;
    T.prototype.getCurrentTimeSec = function() {
        return this.b ? this.b.tb() : 0
    };
    T.prototype.getCurrentTimeSec = T.prototype.getCurrentTimeSec;
    T.prototype.$f = function() {
        return this.b ? cast.f.o.Cf(this.b.getState()) : "PLAYING"
    };
    T.prototype.getPlayerState = T.prototype.$f;
    T.prototype.getDurationSec = function() {
        return this.b ? this.b.m : NaN
    };
    T.prototype.getDurationSec = T.prototype.getDurationSec;
    T.prototype.xa = function() {
        return this.b ? this.b.xa() : null
    };
    T.prototype.getBreakClipCurrentTimeSec = T.prototype.xa;
    T.prototype.getPlaybackRate = function() {
        return this.c.getPlaybackRate()
    };
    T.prototype.getPlaybackRate = T.prototype.getPlaybackRate;
    T.prototype.ob = function() {
        return this.b ? this.b.ob() : null
    };
    T.prototype.getBreakClipDurationSec = T.prototype.ob;
    T.prototype.pb = function() {
        return this.b ? ak(this.b.ba) : []
    };
    T.prototype.getBreaks = T.prototype.pb;
    T.prototype.sa = function() {
        return this.b ? this.b.sa() : null
    };
    T.prototype.getRawSeekableRange = T.prototype.sa;

    function Il(a, b) {
        if (b) {
            a.i = 0;
            var c = a.u.get(b);
            c && (c.resolve(), a.u.delete(b))
        }
    }

    function Jl(a, b, c) {
        if (b) {
            a.i = 0;
            var d = a.u.get(b);
            d && (d.reject(c), a.u.delete(b))
        }
    }
    T.prototype.load = function(a) {
        a.requestId = this.N++;
        var b = fd();
        this.u.set(a.requestId, b);
        b = Promise.resolve(b.a);
        this.c.load(cast.f.o.hh(a));
        return b
    };
    T.prototype.load = T.prototype.load;
    T.prototype.pause = function() {
        this.ia(new J("PAUSE"))
    };
    T.prototype.pause = T.prototype.pause;
    T.prototype.play = function() {
        this.ia(new J("PLAY"))
    };
    T.prototype.play = T.prototype.play;
    T.prototype.seek = function(a) {
        var b = new Kh;
        b.currentTime = a;
        this.ia(b)
    };
    T.prototype.seek = T.prototype.seek;
    T.prototype.stop = function() {
        this.ia(new J("STOP"))
    };
    T.prototype.stop = T.prototype.stop;
    T.prototype.ia = function(a) {
        this.c.ia(cast.f.o.kh(a))
    };
    T.prototype.sendLocalMediaRequest = T.prototype.ia;
    g = T.prototype;
    g.Dg = function(a) {
        var b = this;
        C(U, "MediaManagerLoad");
        var c = cast.f.o.Af(a.data),
            d = c.media,
            e;
        this.b ? (a = this.b.end("STOPPED"), this.b = null) : a = ad();
        var f = this.c;
        id(a.then(function() {
            b.s.reset();
            b.m.reset();
            b.i && Jl(b, b.i, void 0);
            b.i = c.requestId;
            d && (d.contentUrl || d.contentId) ? b.l && b.l.ja == (d.contentUrl || d.contentId) ? (e = ad(b.l), b.l = null) : e = Kl(b, c) : (A(U, "LoadRequest data was corrupted"), e = bd());
            return e
        }).then(function(a) {
            f.$a(a);
            a.X.Bc(b.j);
            b.b = a;
            return b.L
        }).then(function(a) {
            if (!a) return bd(Error("No media element"));
            var e =
                p(c.autoplay) ? c.autoplay : !0,
                f = c.currentTime || void 0,
                h = c.activeTrackIds || void 0,
                oa = c.playbackRate || void 0;
            b.j.dispatchEvent(new jj("PLAYER_PLAYING", d));
            return hl(b.b, a, e, f, h, oa)
        }).then(function(a) {
            b.i == c.requestId && (b.s.a = b.b, b.m.a = b.b, a = a.S(), f.g && (a.tracks = a.tracks || void 0, a.tracks && !hg(a.tracks) ? A(F, "Invalid tracks information") : a.activeTrackIds && !kg(a.tracks, a.activeTrackIds) ? A(F, "Invalid active tracks") : (f.b && f.b.media && (f.b.activeTrackIds = a.activeTrackIds, f.b.media.tracks = a.tracks, f.b.media.textTrackStyle =
                a.textTrackStyle), f.c.load("", !1, void 0, a, !0))), Il(b, b.i), b.j.dispatchEvent(new jj("PLAYER_LOAD_COMPLETE", d)), Gg(f))
        }), function(a) {
            a && a.message && A(U, "Load failed: " + a.message);
            Bg(f, "LOAD_FAILED");
            Bl(b, new cj(999));
            Bl(b, new hj(void 0, "ERROR"))
        })
    };
    g.Gg = function(a) {
        var b = this,
            c = cast.f.o.Df(a.data),
            d = c.media;
        if (!d || !d.contentUrl && !d.contentId) return A(U, "PreloadRequest data was corrupted"), !1;
        this.l ? (a = this.l.end("STOPPED"), this.l = null) : a = ad();
        a.then(function() {
            return Kl(b, c)
        }).then(function(a) {
            Bl(b, new jj("PLAYER_PREPLAYING", d));
            b.l = a;
            a.Ba(c.currentTime || void 0, c.activeTrackIds || void 0)
        }, function() {
            A(U, "Cannot create player on preload")
        });
        return !0
    };
    g.Fg = function(a) {
        var b = this,
            c = a.data.requestItems;
        cast.f.common.A.Qb.then(function() {
            if (c)
                if (va("cast.player.api.ContentCache")) {
                    for (var d = [], e = k(c), f = e.next(); !f.done; f = e.next())
                        if (f = f.value, f.url) {
                            var h = {
                                url: f.url,
                                protocolType: f.protocolType || 0,
                                initialTime: f.initialTime || 0,
                                hlsSegmentFormat: cast.f.media.ua.pd(cast.f.o.zf(f.hlsSegmentFormat))
                            };
                            2 === f.protocolType || 3 === f.protocolType || 1 === f.protocolType && Ei.useLegacyDashSupport ? d.push(new cast.player.api.ContentCacheHost(h)) : B(U, "Precache is unsupported for DASH contents unless MPL is in use")
                        } else B(U,
                            "requestItem has undefined url");
                    0 < d.length ? (new cast.player.api.ContentCache).load(d).then(function() {
                        Bl(b, new oj(c))
                    }) : (A(U, "requestItems contains unsupported protocols or is empty"), Hl(b, a, "ERROR", "NOT_SUPPORTED"))
                } else A(U, "precache is not supported"), Hl(b, a, "ERROR", "NOT_SUPPORTED");
            else A(U, "null requestItems"), Hl(b, a, "ERROR", "INVALID_PARAMS")
        })
    };
    g.Cg = function() {
        Bl(this, new jj("PLAYER_PREPLAYING_CANCELLED"));
        return !0
    };

    function Kl(a, b) {
        var c = b.media,
            d = Object.assign(new Fi, a.J);
        a.C && (d = a.C(b, d));
        var e = a.G ? a.G(b) : c.contentUrl || c.contentId;
        return ad(d).then(function(b) {
            return b ? ad(e).then(function(d) {
                if (!d) return A(U, "Load failed, missing content url."), bd();
                d = cast.f.media.util.fg(c, b, d);
                c.contentType = d.mimeType;
                var e = a.P,
                    f = a.v,
                    h, oa = c.breakClips || [];
                f.a = c.breaks || [];
                f.b = oa;
                d.a instanceof nk ? h = new rl(f, c, d, e.a) : h = new ol(f, c, d, e.a);
                return ad(h)
            }) : (A(U, "Load failed, missing playback config."), bd())
        })
    }
    g.sg = function(a) {
        if (this.b) {
            var b = this.b;
            a.media && !isNaN(b.m) && (a.media.duration = b.m);
            a.currentTime = b.tb();
            b.b && (a.playbackRate = 0, a.supportedMediaCommands &= -3, b = b.ba.h(b.b, b.ha()), a.breakStatus = b)
        }
        Bl(this, new gj(gb(a)));
        return this.F ? this.F(a) : a
    };
    g.Og = function(a) {
        var b;
        if (b = this.b) b = this.b, b.b ? gl(b) ? (C(fl, "skipAd"), b.Fc(), b = !0) : (C(fl, "skipAd - ad cannot be skipped"), b = !1) : (C(fl, "skipAd - not playing ad"), b = !1);
        b || Hl(this, a, "INVALID_REQUEST", "INVALID_REQUEST")
    };
    g.sc = function(a) {
        Bl(this, new cj(900, gb(a)))
    };
    g.Eg = function(a) {
        this.sc(a);
        Jl(this, this.i, a)
    };
    g.og = function(a) {
        Bl(this, new qj("CACHE_INSERTED", a))
    };
    g.ng = function(a) {
        Bl(this, new qj("CACHE_HIT", a))
    };

    function Bl(a, b) {
        a.j.dispatchEvent(b)
    }
    g.vd = function(a) {
        var b = a.type;
        Bl(this, new ij(Cl[a.type] || Dl[b], gb(a.data)))
    };
    var U = w("cast.framework.PlayerManager"),
        V = {},
        Gl = (V.GET_STATUS = "getstatus", V.LOAD = "load", V.PAUSE = "pause", V.STOP = "stop", V.PLAY = "play", V.SKIP_AD = "skipad", V.PLAY_AGAIN = "playagain", V.SEEK = "seek", V.SET_PLAYBACK_RATE = "setplaybackrate", V.SET_VOLUME = "setvolume", V.EDIT_TRACKS_INFO = "edittracksinfo", V.EDIT_AUDIO_TRACKS = "editaudiotracks", V.PRECACHE = "precache", V.PRELOAD = "preload", V.QUEUE_LOAD = "queueload", V.QUEUE_INSERT = "queueinsert", V.QUEUE_UPDATE = "queueupdate", V.QUEUE_REMOVE = "queueremove", V.QUEUE_REORDER = "queuereorder",
            V.QUEUE_GET_ITEM_RANGE = "getitemsrange", V.QUEUE_GET_ITEMS = "getitemsinfo", V.QUEUE_GET_ITEM_IDS = "getqueueids", V),
        X = {},
        Cl = (X.load = "REQUEST_LOAD", X.stop = "REQUEST_STOP", X.pause = "REQUEST_PAUSE", X.play = "REQUEST_PLAY", X.skipad = "REQUEST_SKIP_AD", X.playagain = "REQUEST_PLAY_AGAIN", X.seek = "REQUEST_SEEK", X.setplaybackrate = "REQUEST_PLAYBACK_RATE_CHANGE", X.setvolume = "REQUEST_VOLUME_CHANGE", X.edittracksinfo = "REQUEST_EDIT_TRACKS_INFO", X.editaudiotracks = "REQUEST_EDIT_AUDIO_TRACKS", X.queueload = "REQUEST_QUEUE_LOAD", X.queueinsert =
            "REQUEST_QUEUE_INSERT", X.queueupdate = "REQUEST_QUEUE_UPDATE", X.queueremove = "REQUEST_QUEUE_REMOVE", X.queuereorder = "REQUEST_QUEUE_REORDER", X.getitemsrange = "REQUEST_QUEUE_GET_ITEM_RANGE", X.getitemsinfo = "REQUEST_QUEUE_GET_ITEMS", X.getqueueids = "REQUEST_QUEUE_GET_ITEM_IDS", X),
        Ll = {},
        Dl = (Ll.SET_CREDENTIALS = "REQUEST_SET_CREDENTIALS", Ll.LOAD_BY_ENTITY = "REQUEST_LOAD_BY_ENTITY", Ll.USER_ACTION = "REQUEST_USER_ACTION", Ll.DISPLAY_STATUS = "REQUEST_DISPLAY_STATUS", Ll.CUSTOM_COMMAND = "REQUEST_CUSTOM_COMMAND", Ll.FOCUS_STATE =
            "REQUEST_FOCUS_STATE", Ll);
    cast.f.H = {};
    u("cast.framework.ui.State", {
        LAUNCHING: "launching",
        PLAYING: "idle",
        PLAYING: "loading",
        PLAYING: "buffering",
        PAUSED: "paused",
        PLAYING: "playing"
    });
    u("cast.framework.ui.ContentType", {
        VIDEO: "video",
        AUDIO: "audio",
        IMAGE: "image"
    });

    function Ml() {
        this.state = "launching";
        this.isSeeking = !1;
        this.currentTime = this.duration = 0;
        this.thumbnailUrl = this.subtitle = this.title = "";
        this.contentType = null;
        this.isLive = !1;
        this.breakPercentagePositions = [];
        this.isBreakSkippable = this.isPlayingBreak = !1;
        this.whenSkippable = void 0;
        this.currentBreakClipNumber = this.numberBreakClips = 0;
        this.displayStatus = !1
    }
    u("cast.framework.ui.PlayerData", Ml);
    cast.f.H.O = "Changed";
    var Nl = "isSeeking" + cast.f.H.O,
        Ol = "duration" + cast.f.H.O,
        Pl = "currentTime" + cast.f.H.O,
        Ql = "title" + cast.f.H.O,
        Rl = "subtitle" + cast.f.H.O,
        Sl = "thumbnailUrl" + cast.f.H.O,
        Tl = "breakPercentagePositions" + cast.f.H.O,
        Ul = "isBreakSkippable" + cast.f.H.O,
        Vl = "whenSkippable" + cast.f.H.O,
        Wl = "numberBreakClips" + cast.f.H.O,
        Xl = "currentBreakClipNumber" + cast.f.H.O;
    u("cast.framework.ui.PlayerDataEventType", {
        ANY_CHANGE: "*",
        STATE_CHANGED: "state" + cast.f.H.O,
        IS_SEEKING_CHANGED: Nl,
        DURATION_CHANGED: Ol,
        CURRENT_TIME_CHANGED: Pl,
        TITLE_CHANGED: Ql,
        Bh: Rl,
        THUMBNAIL_URL_CHANGED: Sl,
        CONTENT_TYPE_CHANGED: "contentType" + cast.f.H.O,
        IS_LIVE_CHANGED: "isLive" + cast.f.H.O,
        BREAK_PERCENTAGE_POSITIONS_CHANGED: Tl,
        IS_PLAYING_BREAK_CHANGED: "isPlayingBreak" + cast.f.H.O,
        IS_BREAK_SKIPPABLE_CHANGED: Ul,
        WHEN_SKIPPABLE_CHANGED: Vl,
        NUMBER_BREAK_CLIPS_CHANGED: Wl,
        CURRENT_BREAK_CLIP_NUMBER_CHANGED: Xl,
        DISPLAY_STATUS_CHANGED: "displayStatus" + cast.f.H.O
    });

    function Yl(a, b, c) {
        this.type = a;
        this.field = b;
        this.value = c
    }
    u("cast.framework.ui.PlayerDataChangedEvent", Yl);

    function Zl(a) {
        this.b = $l().c;
        this.j = new Qi;
        this.c = null;
        this.h = 0;
        this.a = am(this, a);
        bm(this);
        this.g = null;
        cm(this)
    }
    u("cast.framework.ui.PlayerDataBinder", Zl);

    function am(a, b) {
        return new window.Proxy(b, {
            set: function(b, d, e) {
                if (e === b[d]) return !0;
                b[d] = e;
                a.j.dispatchEvent(new Yl(d + cast.f.H.O, d, e));
                return !0
            }
        })
    }
    Zl.prototype.addEventListener = function(a, b) {
        this.j.addEventListener(a, b)
    };
    Zl.prototype.addEventListener = Zl.prototype.addEventListener;
    Zl.prototype.removeEventListener = function(a, b) {
        this.j.removeEventListener(a, b)
    };
    Zl.prototype.removeEventListener = Zl.prototype.removeEventListener;

    function dm(a, b) {
        return a && q(b) && !isNaN(b) && 0 != b ? a.map(function(a) {
            return 0 > a.position ? 100 : Math.min(100, a.position / b * 100)
        }) : []
    }

    function cm(a) {
        a.b.addEventListener("MEDIA_FINISHED", function() {
            return em(a, "idle")
        });
        a.b.addEventListener("PLAYER_PLAYING", function(b) {
            b = (b = b.media) || new Dh;
            a: {
                switch ((b.contentType || "").toLowerCase().split("/")[0]) {
                    case "image":
                        var c = "image";
                        break a;
                    case "audio":
                        c = "audio";
                        break a
                }
                c = "video"
            }
            a.a.contentType = c;
            a.a.isLive = "LIVE" == b.streamType;
            b = b.metadata || {};
            a.a.title = b.title || "";
            a.a.subtitle = b.subtitle || "";
            b = b.images;
            a.a.thumbnailUrl = b && b[0] && b[0].url || "";
            a.h = 0;
            fm(a);
            "image" === a.a.contentType ? em(a,
                "playing") : em(a, "loading")
        });
        a.b.addEventListener("PLAYING", function() {
            return em(a, "playing")
        });
        a.b.addEventListener("PAUSE", function(b) {
            b.ended || em(a, "paused")
        });
        a.b.addEventListener("PLAYING", function(b) {
            b.isBuffering ? em(a, "buffering") : "buffering" === a.a.state && em(a, "playing")
        });
        a.b.addEventListener("SEEKING", function() {
            a.a.isSeeking = !0;
            gm(a, hm(a));
            im(a)
        });
        a.b.addEventListener("SEEKED", function() {
            a.a.isSeeking = !1;
            gm(a, hm(a));
            im(a)
        });
        a.b.addEventListener("BREAK_STARTED", function(b) {
            return jm(a,
                b)
        });
        a.b.addEventListener("BREAK_ENDED", function(b) {
            return jm(a, b)
        });
        a.b.addEventListener("BREAK_CLIP_PLAYING", function(b) {
            return jm(a, b)
        });
        a.b.addEventListener("BREAK_CLIP_STARTED", function(b) {
            return jm(a, b)
        });
        a.b.addEventListener("BREAK_CLIP_ENDED", function(b) {
            return jm(a, b)
        });
        a.b.addEventListener("DURATION_CHANGE", function() {
            return im(a)
        });
        a.b.addEventListener("TIME_UPDATE", function() {
            return im(a)
        });
        a.b.addEventListener("REQUEST_DISPLAY_STATUS", function() {
            "video" === a.a.contentType && km(a)
        });
        a.b.addEventListener("REQUEST_PLAY",
            function() {
                "video" === a.a.contentType && "playing" === a.a.state && km(a)
            })
    }

    function hm(a) {
        if ("audio" === a.a.contentType) switch (a.a.state) {
            case "playing":
            case "loading":
            case "buffering":
            case "paused":
                return !0;
            default:
                return !1
        }
        if ("video" === a.a.contentType) switch (a.a.state) {
            case "loading":
            case "buffering":
                return !0;
            case "playing":
            case "paused":
                return a.a.isSeeking
        }
        return !1
    }

    function em(a, b) {
        a.a.state != b && (a.a.state = b, "video" === a.a.contentType && "paused" === b ? km(a) : gm(a, hm(a)))
    }

    function jm(a, b) {
        "BREAK_STARTED" == b.type ? a.a.isPlayingBreak = !0 : "BREAK_ENDED" == b.type && (a.a.isPlayingBreak = !1);
        a.a.isPlayingBreak ? (a.a.numberBreakClips = b.total || 0, a.a.currentBreakClipNumber = b.index || 0, a.c = b) : a.c = null
    }

    function im(a) {
        a.a.isPlayingBreak ? (a.a.duration = a.b.ob() || 0, a.a.currentTime = a.b.xa() || 0) : (a.a.duration = a.b.getDurationSec() || 0, a.a.currentTime = a.b.getCurrentTimeSec() || 0);
        fm(a);
        if (a.c && q(a.c.whenSkippable)) {
            var b = a.c.whenSkippable - a.a.currentTime;
            0 < b ? (a.a.isBreakSkippable = !1, a.a.whenSkippable = b) : (a.a.whenSkippable = 0, a.a.isBreakSkippable = !0)
        } else a.a.whenSkippable = void 0, a.a.isBreakSkippable = !1
    }

    function fm(a) {
        a.a.isPlayingBreak ? (a.a.breakPercentagePositions = [], a.h = 0) : a.h != a.a.duration && (a.a.breakPercentagePositions = dm(a.b.pb(), a.a.duration), a.h = a.a.duration)
    }

    function gm(a, b) {
        null !== a.g && (clearTimeout(a.g), a.g = null);
        a.a.displayStatus = b
    }

    function km(a) {
        gm(a, !0);
        a.g = setTimeout(function() {
            a.a.displayStatus = hm(a);
            a.g = null
        }, 5E3)
    }

    function bm(a) {
        var b = $l().g;
        b || (b = new Ml);
        var c = a.a;
        Object.keys(b).forEach(function(a) {
            return c[a] = b[a]
        })
    };
    cast.f.H.D = w("cast.framework.ui");
    cast.f.H.ig = function(a) {
        var b = document.getElementsByTagName("cast-media-player")[0];
        b && cast.f.H.jg(b, a)
    };
    cast.f.H.jg = function(a, b) {
        var c = document.getElementsByClassName("castSplashScreen")[0],
            d = cast.f.H.D;
        c && (C(d, "remove splash screen"), c.remove());
        a.b.setAttribute("state", "idle");
        d = a.b.querySelector(".logo");
        c = window.getComputedStyle(d, null);
        "none" == c.backgroundImage && (d.textContent = b);
        d = a.b.querySelector(".splash");
        "none" == window.getComputedStyle(d, null).backgroundImage && ("none" == c.backgroundImage ? d.textContent = b : d.classList.add("logo"));
        a.g = new lm(a.shadowRoot.getElementById("castSlideshowElement"));
        a.g.start()
    };

    function mm() {}

    function Y(a) {
        if (!(a instanceof mm)) throw A(nm, "CastReceiverContext is a singleton.Please call CastReceiverContext.getInstance() instead."), Error("CastReceiverContext is not created properly.");
        Jd || (Jd = new Hd);
        Jd && Id();
        cast.receiver.ta.g(cast.Lc ? 0 : 1E3);
        C(nm, "Version: " + cast.f.VERSION);
        cast.f.common.K.lg();
        this.a = se.ga();
        this.c = new T(new zl);
        this.b = null;
        this.h = !1;
        this.g = null
    }
    u("cast.framework.CastReceiverContext", Y);
    Y.prototype.reset = function() {
        this.b = null;
        this.h = !1
    };
    Y.prototype.Ad = function(a) {
        a = void 0 === a ? !1 : a;
        this.h || (Ug("Cast.CAF.UseLegacy", a), cast.f.common.A.load(a), this.h = !0)
    };
    Y.prototype.loadPlayerLibraries = Y.prototype.Ad;
    Y.prototype.initialize = function() {
        this.b.Sg && (this.a = this.b.Sg);
        this.b.Rg && (this.c = this.b.Rg);
        this.b.playbackConfig && this.c.Ld(this.b.playbackConfig);
        if (this.b.customNamespaces)
            for (var a in this.b.customNamespaces) this.b.customNamespaces.hasOwnProperty(a) && te(this.a, a, cast.f.o.Od(this.b.customNamespaces[a]));
        a = this.a;
        a.M = this.i.bind(this);
        a.N = this.l.bind(this);
        a.L = this.j.bind(this);
        this.Ad(this.b.useLegacyDashSupport)
    };

    function om() {
        var a = document.getElementsByTagName("video"),
            b = document.getElementsByTagName("audio"),
            c = document.getElementsByTagName("cast-media-player");
        if (0 == a.length && 0 == b.length && 0 == c.length) return B(nm, "MediaElement is not created yet"), null;
        for (var d = k(a), e = d.next(); !e.done; e = d.next())
            if (e = e.value, e.classList && e.classList.contains("castMediaElement")) return e;
        d = k(b);
        for (e = d.next(); !e.done; e = d.next())
            if (e = e.value, e.classList && e.classList.contains("castMediaElement")) return e;
        return 0 < a.length ?
            a[0] : 0 < c.length ? c[0].getMediaElement() : b[0]
    }
    Y.prototype.Zf = function() {
        return this.c
    };
    Y.prototype.getPlayerManager = Y.prototype.Zf;
    Y.prototype.getSenders = function() {
        var a = this;
        return this.a.getSenders().map(function(b) {
            return cast.f.o.jd(a.a.vb(b))
        })
    };
    Y.prototype.getSenders = Y.prototype.getSenders;
    Y.prototype.vb = function(a) {
        return cast.f.o.jd(this.a.vb(a))
    };
    Y.prototype.getSender = Y.prototype.vb;
    Y.prototype.start = function(a) {
        C(nm, "start");
        this.g = new Ml;
        new Zl(this.g);
        a || (a = new Ei);
        if (this.b) throw Error("Cast receiver options already provided");
        this.b = a;
        this.initialize();
        var b = {
            addEventListener: r
        };
        a = a.Kh || new fg(this.b.mediaElement || b, this.b.supportedCommands || void 0, this.b.localSenderId || void 0);
        p(this.b.queue) && a.Cc(cast.f.o.bh(this.b.queue));
        b = this.c;
        b.c = a;
        b.s.b = a;
        b.m.b = a;
        a.Sa = b.Fg.bind(b);
        a.Pa = b.Dg.bind(b);
        a.Ta = b.Gg.bind(b);
        a.Oa = b.Cg.bind(b);
        a.ic = b.sg.bind(b);
        a.rc = r;
        a.Qa = b.Eg.bind(b);
        a.Va = b.Og.bind(b);
        a.gc = b.sc.bind(b);
        P(b.a, "load", a.Pa.bind(a));
        a.Pa = b.a.a;
        P(b.a, "preload", a.Ta.bind(a));
        a.Ta = b.a.a;
        P(b.a, "precache", a.Sa.bind(a));
        a.Sa = b.a.a;
        P(b.a, "cancelpreload", a.Oa.bind(a));
        a.Oa = b.a.a;
        P(b.a, "stop", a.Pb.bind(a));
        a.Pb = b.a.a;
        P(b.a, "pause", a.Fb.bind(a));
        a.Fb = b.a.a;
        P(b.a, "play", a.Gb.bind(a));
        a.Gb = b.a.a;
        P(b.a, "skipad", a.Va.bind(a));
        a.Va = b.a.a;
        P(b.a, "seek", a.Mb.bind(a));
        a.Mb = b.a.a;
        P(b.a, "setplaybackrate", a.Nb.bind(a));
        a.Nb = b.a.a;
        P(b.a, "setvolume", a.Ob.bind(a));
        a.Ob = b.a.a;
        P(b.a, "getstatus",
            a.Eb.bind(a));
        a.Eb = b.a.a;
        P(b.a, "editaudiotracks", a.Cb.bind(a));
        a.Cb = b.a.a;
        P(b.a, "edittracksinfo", a.Db.bind(a));
        a.Db = b.a.a;
        P(b.a, "queueload", a.Jb.bind(a));
        a.Jb = b.a.a;
        P(b.a, "queueinsert", a.Ib.bind(a));
        a.Ib = b.a.a;
        P(b.a, "queueupdate", a.Ua.bind(a));
        a.Ua = b.a.a;
        P(b.a, "queueremove", a.Kb.bind(a));
        a.Kb = b.a.a;
        P(b.a, "queuereorder", a.Lb.bind(a));
        a.Lb = b.a.a;
        a.Rd = !0;
        b = b.M;
        b.a = a;
        b.a.M = !0;
        (a = this.b.mediaElement || om()) && this.c.$a(a);
        this.a.start(cast.f.o.dh(this.b));
        return this
    };
    Y.prototype.start = Y.prototype.start;
    Y.prototype.stop = function() {
        this.a.stop()
    };
    Y.prototype.stop = Y.prototype.stop;
    Y.prototype.Ma = function() {
        return this.a.Ma()
    };
    Y.prototype.isSystemReady = Y.prototype.Ma;
    Y.prototype.nc = function() {
        return cast.f.o.Lf(this.a.nc())
    };
    Y.prototype.getVisibilityState = Y.prototype.nc;
    Y.prototype.kc = function() {
        return cast.f.o.Hf(this.a.kc())
    };
    Y.prototype.getStandbyState = Y.prototype.kc;
    Y.prototype.wb = function() {
        return cast.f.o.If(this.a.wb())
    };
    Y.prototype.getSystemState = Y.prototype.wb;
    Y.prototype.nb = function() {
        return cast.f.o.yf(this.a.nb())
    };
    Y.prototype.getApplicationData = Y.prototype.nb;
    Y.prototype.Ya = function(a) {
        this.a.Ya(a)
    };
    Y.prototype.setApplicationState = Y.prototype.Ya;
    Y.prototype.Dc = function(a) {
        this.a.Dc(a)
    };
    Y.prototype.setSystemVolumeLevel = Y.prototype.Dc;
    Y.prototype.Ec = function(a) {
        this.a.Ec(a)
    };
    Y.prototype.setSystemVolumeMuted = Y.prototype.Ec;
    Y.prototype.lc = function() {
        return cast.f.o.Jf(this.a.lc())
    };
    Y.prototype.getSystemVolume = Y.prototype.lc;
    Y.prototype.Ub = function(a) {
        this.a.Ub(a)
    };
    Y.prototype.setInactivityTimeout = Y.prototype.Ub;
    Y.prototype.Sb = function(a) {
        this.a.Sb(a)
    };
    Y.prototype.sendFeedbackMessage = Y.prototype.Sb;

    function pm(a, b) {
        return te(a.a, b, cast.f.o.Od(a.b && a.b.customNamespaces && a.b.customNamespaces[b] || "JSON"))
    }
    Y.prototype.xe = function(a, b) {
        a = pm(this, a);
        if (!t(b)) throw Error("listener on custom channel should be a function");
        a.c = b
    };
    Y.prototype.addCustomMessageListener = Y.prototype.xe;
    Y.prototype.Tg = function(a) {
        pm(this, a).c = null
    };
    Y.prototype.removeCustomMessageListener = Y.prototype.Tg;
    Y.prototype.Ug = function(a, b, c) {
        p(b) || (b = "*:*");
        pm(this, a).send(b, c)
    };
    Y.prototype.sendCustomMessage = Y.prototype.Ug;
    Y.prototype.i = function(a) {
        C(nm, "onSenderDisconnected");
        if (p(a.senderId) && p(a.reason)) {
            var b = a.userAgent.split(","),
                c = 0 == this.a.getSenders().length;
            a = "requested_by_sender" == a.reason;
            var d = b[1];
            b = "iOS CastSDK" == b[0] && 0 >= Oa(d, "2.2.0") && "0.0.0" != d;
            c && a && !b && this.stop()
        } else C(nm, "SenderDisconnectedEvent is corrupted")
    };
    Y.prototype.l = function(a) {
        C(nm, "onVisibilityChanged");
        p(a.isVisible) ? a.isVisible || this.c.pause() : C(nm, "VisibilityChangedEvent is corrupted")
    };
    Y.prototype.j = function() {
        C(nm, "onReady");
        cast.f.common.$g(this.c, this.stop.bind(this));
        var a = this.c;
        a.addEventListener("PLAYER_PLAYING", this.s.bind(this));
        a.addEventListener("MEDIA_FINISHED", this.m.bind(this));
        cast.f.H.ig(this.a.nb().name)
    };
    Y.prototype.addEventListener = function(a, b) {
        this.a.addEventListener(a, b)
    };
    Y.prototype.addEventListener = Y.prototype.addEventListener;
    Y.prototype.removeEventListener = function(a, b) {
        this.a.removeEventListener(a, b)
    };
    Y.prototype.removeEventListener = Y.prototype.removeEventListener;
    Y.prototype.m = function() {
        this.a.Ya("")
    };
    Y.prototype.s = function(a) {
        (a = a.media.metadata) && a.title && this.a.Ya("Casting: " + a.title)
    };
    Y.prototype.Ja = function() {
        return this.a.Ja()
    };
    Y.prototype.getDeviceCapabilities = Y.prototype.Ja;
    Y.prototype.canDisplayType = function(a, b, c, d, e) {
        return this.a.canDisplayType(a, b, c, d, e)
    };
    Y.prototype.canDisplayType = Y.prototype.canDisplayType;
    Y.prototype.setLoggerLevel = function(a) {
        cast.receiver.ta.g(a)
    };
    Y.prototype.setLoggerLevel = Y.prototype.setLoggerLevel;

    function $l() {
        qm || (qm = new Y(new mm));
        return qm
    }
    Y.getInstance = $l;
    var qm = null,
        nm = w("cast.framework.Application");

    function rm(a) {
        this.a = fd();
        this.b = ed([td(a), this.a.a])
    }
    rm.prototype.then = function(a) {
        this.b.then(a)
    };
    rm.prototype.resolve = function() {
        this.a.resolve()
    };
    cast.f.fa.category = {};
    cast.f.fa.category.qe = "REQUEST_SEEK REQUEST_LOAD REQUEST_STOP REQUEST_PAUSE REQUEST_PLAY REQUEST_PLAY_AGAIN REQUEST_PLAYBACK_RATE_CHANGE REQUEST_VOLUME_CHANGE REQUEST_EDIT_TRACKS_INFO REQUEST_EDIT_AUDIO_TRACKS REQUEST_SET_CREDENTIALS REQUEST_SKIP_AD REQUEST_LOAD_BY_ENTITY REQUEST_USER_ACTION REQUEST_DISPLAY_STATUS REQUEST_CUSTOM_COMMAND REQUEST_FOCUS_STATE REQUEST_QUEUE_LOAD REQUEST_QUEUE_INSERT REQUEST_QUEUE_UPDATE REQUEST_QUEUE_REMOVE REQUEST_QUEUE_REORDER REQUEST_QUEUE_GET_ITEM_RANGE REQUEST_QUEUE_GET_ITEMS REQUEST_QUEUE_GET_ITEM_IDS".split(" ");
    u("cast.framework.events.category.REQUEST", cast.f.fa.category.qe);
    cast.f.fa.category.Wd = "REQUEST_SEEK REQUEST_LOAD REQUEST_STOP REQUEST_PAUSE REQUEST_PLAY REQUEST_PLAY_AGAIN REQUEST_PLAYBACK_RATE_CHANGE REQUEST_SKIP_AD REQUEST_VOLUME_CHANGE REQUEST_EDIT_TRACKS_INFO REQUEST_EDIT_AUDIO_TRACKS REQUEST_SET_CREDENTIALS REQUEST_LOAD_BY_ENTITY REQUEST_USER_ACTION REQUEST_DISPLAY_STATUS REQUEST_CUSTOM_COMMAND REQUEST_FOCUS_STATE REQUEST_QUEUE_LOAD REQUEST_QUEUE_INSERT REQUEST_QUEUE_UPDATE REQUEST_QUEUE_REMOVE REQUEST_QUEUE_REORDER REQUEST_QUEUE_GET_ITEM_RANGE REQUEST_QUEUE_GET_ITEMS REQUEST_QUEUE_GET_ITEM_IDS BREAK_ENDED BREAK_STARTED BREAK_CLIP_ENDED BREAK_CLIP_PLAYING BREAK_CLIP_STARTED PLAYING ERROR MEDIA_FINISHED MEDIA_STATUS PAUSE PLAYER_PLAYING PLAYER_LOAD_COMPLETE PLAYER_PREPLAYING PLAYER_PREPLAYING_CANCELLED PLAYING RATE_CHANGE SEEKED SEEKING".split(" ");
    u("cast.framework.events.category.CORE", cast.f.fa.category.Wd);
    cast.f.fa.category.DEBUG = "ABORT BITRATE_CHANGED CAN_PLAY CAN_PLAY_THROUGH CLIP_STARTED CLIP_ENDED CACHE_LOADED CACHE_HIT CACHE_INSERTED DURATION_CHANGE EMPTIED EMSG ENDED ID3 LOADED_DATA LOADED_METADATA LOAD_START PLAY STALLED INBAND_TRACK_ADDED WAITING".split(" ");
    u("cast.framework.events.category.DEBUG", cast.f.fa.category.DEBUG);
    cast.f.fa.category.ae = ["SEGMENT_DOWNLOADED", "PROGRESS", "SUSPEND", "TIME_UPDATE"];
    u("cast.framework.events.category.FINE", cast.f.fa.category.ae);

    function lm(a) {
        this.g = a;
        this.m = window.getComputedStyle(this.g)
    }
    lm.prototype.start = function() {
        var a = this;
        this.a = sm(this);
        2 > this.a.length || (this.h = tm(this, "--animation-duration"), this.j = Math.max(tm(this, "--interval-duration"), this.h), 0 < this.j && (this.i = setInterval(function() {
            return a.next()
        }, this.j)))
    };
    lm.prototype.stop = function() {
        clearInterval(this.i);
        this.i = void 0;
        clearInterval(this.l);
        this.l = void 0;
        for (var a = k(this.a), b = a.next(); !b.done; b = a.next()) b.value.classList.remove("visible", "top");
        this.b = void 0
    };
    lm.prototype.next = function() {
        this.c = this.b;
        this.b = void 0 === this.b ? 0 : (this.b + 1) % this.a.length;
        this.a[this.b].classList.add("top", "visible");
        void 0 !== this.c && this.a[this.c].classList.remove("top");
        um(this)
    };

    function um(a) {
        a.l = setTimeout(function() {
            void 0 !== a.c && a.a[a.c].classList.remove("visible")
        }, a.h)
    }

    function sm(a) {
        return a.g && a.g.children ? Array.from(a.g.children).filter(function(a) {
            var b = window.getComputedStyle(a).backgroundImage;
            if (b && "none" !== b) return a
        }) : []
    }

    function tm(a, b) {
        a = a.m.getPropertyValue(b) || "";
        a = a.toLocaleLowerCase().trim();
        var c = parseFloat(a);
        switch (a.replace(/[-+.0-9]/g, "").trim()) {
            case "ms":
                return c;
            case "s":
                return 1E3 * c;
            default:
                return A(vm, "Cannot parse value " + a + " of CSS style " + b), 0
        }
    }
    var vm = w("cast.framework.ui.SlideshowManager");

    function wm() {
        var a = HTMLElement.call(this) || this;
        a.Xa = null;
        return a
    }
    m(wm, HTMLElement);
    wm.prototype.getMediaElement = function() {
        return this.i
    };
    wm.prototype.getMediaElement = wm.prototype.getMediaElement;

    function xm(a) {
        var b = Math.floor(a);
        a = Na(b % 60);
        b = Math.floor(b / 60);
        a = Na(b % 60) + ":" + a;
        b = Math.floor(b / 60);
        0 < b && (a = Na(b) + ":" + a);
        return a
    }

    function ym(a) {
        var b = "";
        a.a.isBreakSkippable ? b = xm(a.a.duration - a.a.currentTime) : a.a.whenSkippable && (b = cast.f.da.Mf(a.a.whenSkippable.toFixed(0)));
        a.c.innerText = b
    }

    function zm(a, b) {
        for (var c = k(a.j.querySelectorAll(".breakMarker")), d = c.next(); !d.done; d = c.next()) d.value.remove();
        b && b.forEach(function(b) {
            var c = document.createElement("div");
            c.classList.add("breakMarker");
            c.style.left = b + "%";
            a.j.appendChild(c)
        })
    }
    wm.prototype.createdCallback = function() {
        this.createShadowRoot().innerHTML = cast.f.Xd
    };
    wm.prototype.attachedCallback = function() {
        this.b = this.shadowRoot.getElementById("castPlayer");
        this.i = this.shadowRoot.getElementById("castMediaElement");
        this.F = this.shadowRoot.getElementById("castMetadataTitle");
        this.w = this.shadowRoot.getElementById("castMetadataSubtitle");
        this.C = this.shadowRoot.getElementById("castMetadataImage");
        this.j = this.shadowRoot.getElementById("castControlsProgress");
        this.u = this.shadowRoot.getElementById("castControlsProgressInner");
        this.v = this.shadowRoot.getElementById("castControlsProgressThumb");
        this.G = this.shadowRoot.getElementById("castControlsTotalTime");
        this.l = this.shadowRoot.getElementById("castControlsCurTime");
        this.h = this.shadowRoot.getElementById("castBreakPosition");
        this.c = this.shadowRoot.getElementById("castBreakTime");
        "" === this.getAttribute("crossorigin") && this.getMediaElement().removeAttribute("crossorigin");
        this.a = new Ml;
        this.s = new Zl(this.a);
        this.s.addEventListener("*", this.m.bind(this));
        var a = this.a,
            b;
        for (b in a) this.b.setAttribute(b, a[b]);
        Am(this)
    };

    function Am(a) {
        Array.prototype.forEach.call(a.b.getElementsByClassName("breakIcon"), function(a) {
            return a.dataset.adLabel = cast.f.da.ie
        });
        Array.prototype.forEach.call(a.b.getElementsByClassName("breakSkip"), function(a) {
            return a.dataset.skipAdLabel = cast.f.da.ke
        })
    }

    function Bm(a, b) {
        b ? (a.b.setAttribute("isSeeking", !0), a.Xa = new rm(3E3), a.Xa.then(function() {
            a.b.setAttribute("isSeeking", !1)
        })) : a.Xa && (a.Xa.resolve(), a.Xa = null)
    }
    wm.prototype.m = function(a) {
        if (this.g) {
            var b = this.g;
            b.stop();
            "idle" === a.value && b.start()
        }
        a.type != Nl && this.b.setAttribute(a.field, a.value);
        switch (a.type) {
            case Nl:
                Bm(this, !!a.value);
                break;
            case Sl:
                a = String(a.value);
                b = this.C;
                a ? b.style.content = 'url("' + a.replace(/"/g, '\\"') + '")' : b.style.removeProperty("content");
                break;
            case Ql:
                this.F.innerText = String(a.value);
                break;
            case Rl:
                this.w.innerText = String(a.value);
                break;
            case Ol:
                a = Number(a.value);
                this.G.innerText = 0 < a ? xm(a) : "";
                break;
            case Pl:
                a = this.a.currentTime;
                b = this.a.duration;
                var c = 0 < b ? 100 * a / b : 100;
                this.l.innerText = 0 < b ? xm(a) : "";
                0 <= c && (this.u.style.width = c + "%", this.v.style.left = c + "%");
                this.a.isPlayingBreak && ym(this);
                break;
            case Wl:
            case Xl:
                a = this.a.numberBreakClips;
                0 < a ? (this.h.innerText = 1 < a ? this.a.currentBreakClipNumber + "/" + a : "", this.c.innerText = this.c.innerText || " ") : (this.h.innerText = "", this.c.innerText = "");
                break;
            case Tl:
                zm(this, a.value);
                break;
            case Vl:
            case Ul:
                ym(this)
        }
    };
    w("cast.framework.ui.CustomPlayerElement");
    document.registerElement("cast-media-player", {
        prototype: wm.prototype
    });
    u("cast.framework.LoggerLevel", {
        DEBUG: 0,
        VERBOSE: 500,
        INFO: 800,
        WARNING: 900,
        ERROR: 1E3,
        NONE: 1500
    });

    function Z() {}
    u("cast.framework.QueueBase", Z);
    Z.prototype.initialize = function() {
        return null
    };
    Z.prototype.initialize = Z.prototype.initialize;
    Z.prototype.onCurrentItemIdChanged = function() {};
    Z.prototype.onCurrentItemIdChanged = Z.prototype.onCurrentItemIdChanged;
    Z.prototype.nextItems = function() {
        return []
    };
    Z.prototype.nextItems = Z.prototype.nextItems;
    Z.prototype.prevItems = function() {
        return []
    };
    Z.prototype.prevItems = Z.prototype.prevItems;
    Z.prototype.fetchItems = function() {
        return []
    };
    Z.prototype.fetchItems = Z.prototype.fetchItems;
    Z.prototype.onItemsInserted = function() {};
    Z.prototype.onItemsInserted = Z.prototype.onItemsInserted;
    Z.prototype.onItemsRemoved = function() {};
    Z.prototype.onItemsRemoved = Z.prototype.onItemsRemoved;
    Z.prototype.shuffle = function() {
        return null
    };
    Z.prototype.shuffle = Z.prototype.shuffle;
}).call(window);
