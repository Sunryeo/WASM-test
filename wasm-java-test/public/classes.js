"use strict";
(function (module) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], function (exports) {
      module(exports);
    });
  } else if (
    typeof exports === "object" &&
    exports !== null &&
    typeof exports.nodeName !== "string"
  ) {
    module(exports);
  } else {
    module(typeof self !== "undefined" ? self : this);
  }
})(function (B) {
  let B_ = 2463534242,
    BR = () => {
      let x = B_;
      x ^= x << 13;
      x ^= x >>> 17;
      x ^= x << 5;
      B_ = x;
      return x;
    },
    Cy = (f) => (args, callback) => {
      if (!args) {
        args = [];
      }
      let javaArgs = Bg(J(), args.length);
      for (let i = 0; i < args.length; ++i) {
        javaArgs.data[i] = U(args[i]);
      }
      CK(() => {
        f.call(null, javaArgs);
      }, callback);
    },
    C1 = (target) => (target.$clinit = () => {}),
    CR = (obj) => {
      let cls = obj.constructor;
      let arrayDegree = 0;
      while (cls.$meta && cls.$meta.item) {
        ++arrayDegree;
        cls = cls.$meta.item;
      }
      let clsName = "";
      if (cls.$meta.primitive) {
        clsName = cls.$meta.name;
      } else {
        clsName = cls.$meta
          ? cls.$meta.name || "a/" + cls.name
          : "@" + cls.name;
      }
      while (arrayDegree-- > 0) {
        clsName += "[]";
      }
      return clsName;
    },
    D = (superclass) => {
      if (superclass === 0) {
        return function () {};
      }
      if (superclass === void 0) {
        superclass = J();
      }
      return function () {
        superclass.call(this);
      };
    },
    Bm = (cls) => Cx(cls),
    J = () => E,
    CV = () => {
      return {
        $array: null,
        classObject: null,
        $meta: { supertypes: [], superclass: null },
      };
    },
    Bf = (name, binaryName) => {
      let cls = CV();
      cls.$meta.primitive = true;
      cls.$meta.name = name;
      cls.$meta.binaryName = binaryName;
      cls.$meta.enum = false;
      cls.$meta.item = null;
      cls.$meta.simpleName = null;
      cls.$meta.declaringClass = null;
      cls.$meta.enclosingClass = null;
      return cls;
    },
    BV = Bf("char", "C"),
    Cr = Bf("byte", "B"),
    C7 = Bf("int", "I"),
    CS = Bf("long", "J");
  if (typeof BigInt !== "function") {
  } else if (typeof BigInt64Array !== "function") {
  } else {
  }
  let Da = (a, b) => {
    a >>>= 0;
    b >>>= 0;
    return a < b ? -1 : a > b ? 1 : 0;
  };
  function F(lo, hi) {
    this.lo = lo | 0;
    this.hi = hi | 0;
  }
  F.prototype.__teavm_class__ = () => {
    return "long";
  };
  let Dm = (a) => (a.hi & 0x80000000) === 0,
    K = (a) => (a.hi & 0x80000000) !== 0,
    Bd = 1 << 18,
    BD,
    H,
    Ba,
    P,
    BB,
    BU;
  if (typeof BigInt !== "function") {
    F.prototype.toString = function () {
      let result = [];
      let n = this;
      let positive = Dm(n);
      if (!positive) {
        n = G(n);
      }
      let radix = new F(10, 0);
      do {
        let divRem = BU(n, radix);
        result.push(String.fromCharCode(48 + divRem[1].lo));
        n = divRem[0];
      } while (n.lo !== 0 || n.hi !== 0);
      result = result.reverse().join("");
      return positive ? result : "-" + result;
    };
    F.prototype.valueOf = function () {
      return P(this);
    };
    BD = new F(0, 0);
    H = (val) => new F(val, -(val < 0) | 0);
    Ba = (val) =>
      val >= 0
        ? new F(val | 0, (val / 0x100000000) | 0)
        : G(new F(-val | 0, (-val / 0x100000000) | 0));
    P = (val) => 0x100000000 * val.hi + (val.lo >>> 0);
    BB = (val) => val.lo;
  } else {
    BD = BigInt(0);
    H = (val) => BigInt.asIntN(64, BigInt(val | 0));
    Ba = (val) =>
      BigInt.asIntN(64, BigInt(val >= 0 ? Math.floor(val) : Math.ceil(val)));
    P = (val) => Number(val);
    BB = (val) => Number(BigInt.asIntN(32, val)) | 0;
  }
  let Bt, Bp, Bj, By, Bu, Bq, G;
  if (typeof BigInt !== "function") {
    Bt = (a, b) => a.hi === b.hi && a.lo === b.lo;
    Bj = (a) => {
      let lo = (a.lo + 1) | 0;
      let hi = a.hi;
      if (lo === 0) {
        hi = (hi + 1) | 0;
      }
      return new F(lo, hi);
    };
    G = (a) => Bj(new F(a.lo ^ 0xffffffff, a.hi ^ 0xffffffff));
    Bp = (a, b) => {
      let r = Da(a.hi, b.hi);
      if (r !== 0) {
        return r;
      }
      r = (a.lo >>> 1) - (b.lo >>> 1);
      if (r !== 0) {
        return r;
      }
      return (a.lo & 1) - (b.lo & 1);
    };
    By = (a, b) => {
      let positive = K(a) === K(b);
      if (K(a)) {
        a = G(a);
      }
      if (K(b)) {
        b = G(b);
      }
      let a_lolo = a.lo & 0xffff;
      let a_lohi = a.lo >>> 16;
      let a_hilo = a.hi & 0xffff;
      let a_hihi = a.hi >>> 16;
      let b_lolo = b.lo & 0xffff;
      let b_lohi = b.lo >>> 16;
      let b_hilo = b.hi & 0xffff;
      let b_hihi = b.hi >>> 16;
      let lolo = 0;
      let lohi = 0;
      let hilo = 0;
      let hihi = 0;
      lolo = (a_lolo * b_lolo) | 0;
      lohi = lolo >>> 16;
      lohi = ((lohi & 0xffff) + a_lohi * b_lolo) | 0;
      hilo = (hilo + (lohi >>> 16)) | 0;
      lohi = ((lohi & 0xffff) + a_lolo * b_lohi) | 0;
      hilo = (hilo + (lohi >>> 16)) | 0;
      hihi = hilo >>> 16;
      hilo = ((hilo & 0xffff) + a_hilo * b_lolo) | 0;
      hihi = (hihi + (hilo >>> 16)) | 0;
      hilo = ((hilo & 0xffff) + a_lohi * b_lohi) | 0;
      hihi = (hihi + (hilo >>> 16)) | 0;
      hilo = ((hilo & 0xffff) + a_lolo * b_hilo) | 0;
      hihi = (hihi + (hilo >>> 16)) | 0;
      hihi =
        (hihi +
          a_hihi * b_lolo +
          a_hilo * b_lohi +
          a_lohi * b_hilo +
          a_lolo * b_hihi) |
        0;
      let result = new F(
        (lolo & 0xffff) | (lohi << 16),
        (hilo & 0xffff) | (hihi << 16)
      );
      return positive ? result : G(result);
    };
    Bu = (a, b) => {
      if (a.hi >= 0 && a.hi < Bd && b.hi >= 0 && b.hi < Bd) {
        return Ba(P(a) / P(b));
      }
      return Long_udivRem(a, b)[0];
    };
    Bq = (a, b) => {
      if (a.hi >= 0 && a.hi < Bd && b.hi >= 0 && b.hi < Bd) {
        return Ba(P(a) / P(b));
      }
      return Long_udivRem(a, b)[1];
    };
    BU = (a, b) => {
      if (b.lo === 0 && b.hi === 0) {
        throw new Error("Division by zero");
      }
      let positive = K(a) === K(b);
      if (K(a)) {
        a = G(a);
      }
      if (K(b)) {
        b = G(b);
      }
      a = new T(a.lo, a.hi, 0);
      b = new T(b.lo, b.hi, 0);
      let q = LongInt_div(a, b);
      a = new F(a.lo, a.hi);
      q = new F(q.lo, q.hi);
      return positive ? [q, a] : [G(q), G(a)];
    };
    let Long_udivRem = (a, b) => {
      if (b.lo === 0 && b.hi === 0) {
        throw new Error("Division by zero");
      }
      a = new T(a.lo, a.hi, 0);
      b = new T(b.lo, b.hi, 0);
      let q = LongInt_div(a, b);
      a = new F(a.lo, a.hi);
      q = new F(q.lo, q.hi);
      return [q, a];
    };
    function T(lo, hi, sup) {
      this.lo = lo;
      this.hi = hi;
      this.sup = sup;
    }
    let LongInt_mul = (a, b) => {
      let a_lolo = ((a.lo & 0xffff) * b) | 0;
      let a_lohi = ((a.lo >>> 16) * b) | 0;
      let a_hilo = ((a.hi & 0xffff) * b) | 0;
      let a_hihi = ((a.hi >>> 16) * b) | 0;
      let sup = (a.sup * b) | 0;
      a_lohi = (a_lohi + (a_lolo >>> 16)) | 0;
      a_hilo = (a_hilo + (a_lohi >>> 16)) | 0;
      a_hihi = (a_hihi + (a_hilo >>> 16)) | 0;
      sup = (sup + (a_hihi >>> 16)) | 0;
      a.lo = (a_lolo & 0xffff) | (a_lohi << 16);
      a.hi = (a_hilo & 0xffff) | (a_hihi << 16);
      a.sup = sup & 0xffff;
    };
    let LongInt_sub = (a, b) => {
      let a_lolo = a.lo & 0xffff;
      let a_lohi = a.lo >>> 16;
      let a_hilo = a.hi & 0xffff;
      let a_hihi = a.hi >>> 16;
      let b_lolo = b.lo & 0xffff;
      let b_lohi = b.lo >>> 16;
      let b_hilo = b.hi & 0xffff;
      let b_hihi = b.hi >>> 16;
      a_lolo = (a_lolo - b_lolo) | 0;
      a_lohi = (a_lohi - b_lohi + (a_lolo >> 16)) | 0;
      a_hilo = (a_hilo - b_hilo + (a_lohi >> 16)) | 0;
      a_hihi = (a_hihi - b_hihi + (a_hilo >> 16)) | 0;
      let sup = (a.sup - b.sup + (a_hihi >> 16)) | 0;
      a.lo = (a_lolo & 0xffff) | (a_lohi << 16);
      a.hi = (a_hilo & 0xffff) | (a_hihi << 16);
      a.sup = sup;
    };
    let LongInt_add = (a, b) => {
      let a_lolo = a.lo & 0xffff;
      let a_lohi = a.lo >>> 16;
      let a_hilo = a.hi & 0xffff;
      let a_hihi = a.hi >>> 16;
      let b_lolo = b.lo & 0xffff;
      let b_lohi = b.lo >>> 16;
      let b_hilo = b.hi & 0xffff;
      let b_hihi = b.hi >>> 16;
      a_lolo = (a_lolo + b_lolo) | 0;
      a_lohi = (a_lohi + b_lohi + (a_lolo >> 16)) | 0;
      a_hilo = (a_hilo + b_hilo + (a_lohi >> 16)) | 0;
      a_hihi = (a_hihi + b_hihi + (a_hilo >> 16)) | 0;
      let sup = (a.sup + b.sup + (a_hihi >> 16)) | 0;
      a.lo = (a_lolo & 0xffff) | (a_lohi << 16);
      a.hi = (a_hilo & 0xffff) | (a_hihi << 16);
      a.sup = sup;
    };
    let LongInt_ucompare = (a, b) => {
      let r = a.sup - b.sup;
      if (r !== 0) {
        return r;
      }
      r = (a.hi >>> 1) - (b.hi >>> 1);
      if (r !== 0) {
        return r;
      }
      r = (a.hi & 1) - (b.hi & 1);
      if (r !== 0) {
        return r;
      }
      r = (a.lo >>> 1) - (b.lo >>> 1);
      if (r !== 0) {
        return r;
      }
      return (a.lo & 1) - (b.lo & 1);
    };
    let LongInt_numOfLeadingZeroBits = (a) => {
      let n = 0;
      let d = 16;
      while (d > 0) {
        if (a >>> d !== 0) {
          a >>>= d;
          n = (n + d) | 0;
        }
        d = (d / 2) | 0;
      }
      return 31 - n;
    };
    let LongInt_shl = (a, b) => {
      if (b === 0) {
        return;
      }
      if (b < 32) {
        a.sup = ((a.hi >>> (32 - b)) | (a.sup << b)) & 0xffff;
        a.hi = (a.lo >>> (32 - b)) | (a.hi << b);
        a.lo <<= b;
      } else if (b === 32) {
        a.sup = a.hi & 0xffff;
        a.hi = a.lo;
        a.lo = 0;
      } else if (b < 64) {
        a.sup = ((a.lo >>> (64 - b)) | (a.hi << (b - 32))) & 0xffff;
        a.hi = a.lo << b;
        a.lo = 0;
      } else if (b === 64) {
        a.sup = a.lo & 0xffff;
        a.hi = 0;
        a.lo = 0;
      } else {
        a.sup = (a.lo << (b - 64)) & 0xffff;
        a.hi = 0;
        a.lo = 0;
      }
    };
    let LongInt_shr = (a, b) => {
      if (b === 0) {
        return;
      }
      if (b === 32) {
        a.lo = a.hi;
        a.hi = a.sup;
        a.sup = 0;
      } else if (b < 32) {
        a.lo = (a.lo >>> b) | (a.hi << (32 - b));
        a.hi = (a.hi >>> b) | (a.sup << (32 - b));
        a.sup >>>= b;
      } else if (b === 64) {
        a.lo = a.sup;
        a.hi = 0;
        a.sup = 0;
      } else if (b < 64) {
        a.lo = (a.hi >>> (b - 32)) | (a.sup << (64 - b));
        a.hi = a.sup >>> (b - 32);
        a.sup = 0;
      } else {
        a.lo = a.sup >>> (b - 64);
        a.hi = 0;
        a.sup = 0;
      }
    };
    let LongInt_copy = (a) => new T(a.lo, a.hi, a.sup);
    let LongInt_div = (a, b) => {
      let bits =
        b.hi !== 0
          ? LongInt_numOfLeadingZeroBits(b.hi)
          : LongInt_numOfLeadingZeroBits(b.lo) + 32;
      let sz = 1 + ((bits / 16) | 0);
      let dividentBits = bits % 16;
      LongInt_shl(b, bits);
      LongInt_shl(a, dividentBits);
      let q = new T(0, 0, 0);
      while (sz-- > 0) {
        LongInt_shl(q, 16);
        let digitA = (a.hi >>> 16) + 0x10000 * a.sup;
        let digitB = b.hi >>> 16;
        let digit = (digitA / digitB) | 0;
        let t = LongInt_copy(b);
        LongInt_mul(t, digit);
        if (LongInt_ucompare(t, a) >= 0) {
          while (LongInt_ucompare(t, a) > 0) {
            LongInt_sub(t, b);
            --digit;
          }
        } else {
          while (true) {
            let nextT = LongInt_copy(t);
            LongInt_add(nextT, b);
            if (LongInt_ucompare(nextT, a) > 0) {
              break;
            }
            t = nextT;
            ++digit;
          }
        }
        LongInt_sub(a, t);
        q.lo |= digit;
        LongInt_shl(a, 16);
      }
      LongInt_shr(a, bits + 16);
      return q;
    };
  } else {
    Bt = (a, b) => a === b;
    Bj = (a) => BigInt.asIntN(64, a + 1);
    G = (a) => BigInt.asIntN(64, -a);
    Bp = (a, b) => {
      a = BigInt.asUintN(64, a);
      b = BigInt.asUintN(64, b);
      return a < b ? -1 : a > b ? 1 : 0;
    };
    By = (a, b) => BigInt.asIntN(64, a * b);
    Bu = (a, b) =>
      BigInt.asIntN(64, BigInt.asUintN(64, a) / BigInt.asUintN(64, b));
    Bq = (a, b) =>
      BigInt.asIntN(64, BigInt.asUintN(64, a) % BigInt.asUintN(64, b));
  }
  let Bg = (cls, sz) => {
    let data = new Array(sz);
    data.fill(null);
    return new (Z(cls))(data);
  };
  if (typeof BigInt64Array !== "function") {
  } else {
  }
  let W = (sz) => new CO(new Uint16Array(sz)),
    C0 = (sz) => new CG(new Int8Array(sz)),
    Z = (cls) => {
      let result = cls.$array;
      if (result === null) {
        function JavaArray(data) {
          J().call(this);
          this.data = data;
        }
        JavaArray.prototype = Object.create(J().prototype);
        JavaArray.prototype.type = cls;
        JavaArray.prototype.constructor = JavaArray;
        JavaArray.prototype.toString = function () {
          let str = "[";
          for (let i = 0; i < this.data.length; ++i) {
            if (i > 0) {
              str += ", ";
            }
            str += this.data[i].toString();
          }
          str += "]";
          return str;
        };
        JavaArray.prototype.t = function () {
          let dataCopy;
          if ("slice" in this.data) {
            dataCopy = this.data.slice();
          } else {
            dataCopy = new this.data.constructor(this.data.length);
            for (let i = 0; i < dataCopy.length; ++i) {
              dataCopy[i] = this.data[i];
            }
          }
          return new (Z(this.type))(dataCopy);
        };
        let name = "[" + cls.$meta.binaryName;
        JavaArray.$meta = {
          item: cls,
          supertypes: [J()],
          primitive: false,
          superclass: J(),
          name: name,
          binaryName: name,
          enum: false,
          simpleName: null,
          declaringClass: null,
          enclosingClass: null,
        };
        JavaArray.classObject = null;
        JavaArray.$array = null;
        result = JavaArray;
        cls.$array = JavaArray;
      }
      return result;
    },
    Bw,
    CH = (strings) => {
      Di();
      Bw = new Array(strings.length);
      for (let i = 0; i < strings.length; ++i) {
        Bw[i] = B0(U(strings[i]));
      }
    },
    N = (index) => Bw[index],
    BY = (array, offset, count) => {
      let result = "";
      let limit = offset + count;
      for (let i = offset; i < limit; i = (i + 1024) | 0) {
        let next = Math.min(limit, (i + 1024) | 0);
        result += String.fromCharCode.apply(null, array.subarray(i, next));
      }
      return result;
    },
    U = (str) => (str === null ? null : Dc(str)),
    BI = (str) => (str === null ? null : str.u),
    Di = () => (() => {})(),
    B0;
  {
    B0 = (str) => str;
  }
  let Dn = (obj, cls) =>
      obj instanceof J() && !!obj.constructor.$meta && Bs(obj.constructor, cls),
    Bs = (from, to) => {
      if (from === to) {
        return true;
      }
      let map = from.$meta.assignableCache;
      if (typeof map === "undefined") {
        map = new Map();
        from.$meta.assignableCache = map;
      }
      let cachedResult = map.get(to);
      if (typeof cachedResult !== "undefined") {
        return cachedResult;
      }
      if (to.$meta.item !== null) {
        let result =
          from.$meta.item !== null && Bs(from.$meta.item, to.$meta.item);
        map.set(to, result);
        return result;
      }
      let supertypes = from.$meta.supertypes;
      for (let i = 0; i < supertypes.length; i = (i + 1) | 0) {
        if (Bs(supertypes[i], to)) {
          map.set(to, true);
          return true;
        }
      }
      map.set(to, false);
      return false;
    },
    O = (ex) => {
      throw Dj(ex);
    },
    Bh = Symbol("javaException"),
    Dj = (ex) => {
      let err = ex.$jsException;
      if (!err) {
        let javaCause = Dd(ex);
        let jsCause = javaCause !== null ? javaCause.$jsException : void 0;
        let cause = typeof jsCause === "object" ? { cause: jsCause } : void 0;
        err = new L("Java exception thrown", cause);
        if (typeof Error.captureStackTrace === "function") {
          Error.captureStackTrace(err);
        }
        err[Bh] = ex;
        ex.$jsException = err;
        Dg(err, ex);
      }
      return err;
    },
    Dg = (err, ex) => {
      if (typeof C4 === "function" && err.stack) {
        let stack = C4(err.stack);
        let javaStack = Bg(CA(), stack.length);
        let elem;
        let noStack = false;
        for (let i = 0; i < stack.length; ++i) {
          let element = stack[i];
          elem = CL(
            U(element.className),
            U(element.methodName),
            U(element.fileName),
            element.lineNumber
          );
          if (elem == null) {
            noStack = true;
            break;
          }
          javaStack.data[i] = elem;
        }
        if (!noStack) {
          C5(ex, javaStack);
        }
      }
    },
    L;
  if (typeof Reflect === "object") {
    let defaultMessage = Symbol("defaultMessage");
    L = function L(message, cause) {
      let self = Reflect.construct(Error, [void 0, cause], L);
      Object.setPrototypeOf(self, L.prototype);
      self[defaultMessage] = message;
      return self;
    };
    L.prototype = Object.create(Error.prototype, {
      constructor: { configurable: true, writable: true, value: L },
      message: {
        get() {
          try {
            let javaException = this[Bh];
            if (typeof javaException === "object") {
              let javaMessage = Cm(javaException);
              if (typeof javaMessage === "object") {
                return javaMessage !== null ? javaMessage.toString() : null;
              }
            }
            return this[defaultMessage];
          } catch (e) {
            return (
              "Exception occurred trying to extract Java exception message: " +
              e
            );
          }
        },
      },
    });
  } else {
    L = Error;
  }
  let CF = (e) =>
      e instanceof Error && typeof e[Bh] === "object" ? e[Bh] : null,
    Cm = (t) => C8(t),
    Dd = (t) => Dh(t),
    CA = () => J(),
    CL = (className, methodName, fileName, lineNumber) => {
      {
        return null;
      }
    },
    C5 = (e, stack) => {},
    CQ = (outputFunction) => {
      let buffer = "";
      return (msg) => {
        let index = 0;
        while (true) {
          let next = msg.indexOf("\n", index);
          if (next < 0) {
            break;
          }
          outputFunction(buffer + msg.substring(index, next));
          buffer = "";
          index = next + 1;
        }
        buffer += msg.substring(index);
      };
    },
    C_ =
      typeof $rt_putStdoutCustom === "function"
        ? $rt_putStdoutCustom
        : typeof console === "object"
        ? CQ((msg) => console.info(msg))
        : () => {},
    Ce = null,
    Cp = (data) => {
      let i = 0;
      let packages = new Array(data.length);
      for (let j = 0; j < data.length; ++j) {
        let prefixIndex = data[i++];
        let prefix = prefixIndex >= 0 ? packages[prefixIndex] : "";
        packages[j] = prefix + data[i++] + ".";
      }
      Ce = packages;
    },
    Ch = (data) => {
      let packages = Ce;
      let i = 0;
      while (i < data.length) {
        let cls = data[i++];
        cls.$meta = {};
        let m = cls.$meta;
        let className = data[i++];
        m.name = className !== 0 ? className : null;
        if (m.name !== null) {
          let packageIndex = data[i++];
          if (packageIndex >= 0) {
            m.name = packages[packageIndex] + m.name;
          }
        }
        m.binaryName = "L" + m.name + ";";
        let superclass = data[i++];
        m.superclass = superclass !== 0 ? superclass : null;
        m.supertypes = data[i++];
        if (m.superclass) {
          m.supertypes.push(m.superclass);
          cls.prototype = Object.create(m.superclass.prototype);
        } else {
          cls.prototype = {};
        }
        let flags = data[i++];
        m.enum = (flags & 8) !== 0;
        m.flags = flags;
        m.primitive = false;
        m.item = null;
        cls.prototype.constructor = cls;
        cls.classObject = null;
        m.accessLevel = data[i++];
        let innerClassInfo = data[i++];
        if (innerClassInfo === 0) {
          m.simpleName = null;
          m.declaringClass = null;
          m.enclosingClass = null;
        } else {
          let enclosingClass = innerClassInfo[0];
          m.enclosingClass = enclosingClass !== 0 ? enclosingClass : null;
          let declaringClass = innerClassInfo[1];
          m.declaringClass = declaringClass !== 0 ? declaringClass : null;
          let simpleName = innerClassInfo[2];
          m.simpleName = simpleName !== 0 ? simpleName : null;
        }
        let clinit = data[i++];
        cls.$clinit = clinit !== 0 ? clinit : function () {};
        let virtualMethods = data[i++];
        if (virtualMethods !== 0) {
          for (let j = 0; j < virtualMethods.length; j += 2) {
            let name = virtualMethods[j];
            let func = virtualMethods[j + 1];
            if (typeof name === "string") {
              name = [name];
            }
            for (let k = 0; k < name.length; ++k) {
              cls.prototype[name[k]] = func;
            }
          }
        }
        cls.$array = null;
      }
    },
    CK = (runner, callback) => {
      let result;
      try {
        result = runner();
      } catch (e) {
        result = e;
      }
      if (typeof callback !== "undefined") {
        callback(result);
      } else if (result instanceof Error) {
        throw result;
      }
    };
  function E() {
    this.$id$ = 0;
  }
  let CY = (a) => {
      let b, c, d, e, f, g, h, i, j, k;
      b = a;
      if (!b.$id$) b.$id$ = BR();
      c = a.$id$;
      if (!c) d = N(0);
      else {
        if (!c) e = 32;
        else {
          f = 0;
          e = (c >>> 16) | 0;
          if (e) f = 16;
          else e = c;
          g = (e >>> 8) | 0;
          if (!g) g = e;
          else f = f | 8;
          h = (g >>> 4) | 0;
          if (!h) h = g;
          else f = f | 4;
          e = (h >>> 2) | 0;
          if (!e) e = h;
          else f = f | 2;
          if ((e >>> 1) | 0) f = f | 1;
          e = (((32 - f) | 0) - 1) | 0;
        }
        i = (((((((32 - e) | 0) + 4) | 0) - 1) | 0) / 4) | 0;
        j = W(i);
        k = j.data;
        i = (((i - 1) | 0) * 4) | 0;
        e = 0;
        while (i >= 0) {
          h = (e + 1) | 0;
          k[e] = BE(((c >>> i) | 0) & 15, 16);
          i = (i - 4) | 0;
          e = h;
        }
        d = CZ(j);
      }
      b = Bc();
      Be(Be(b, N(1)), d);
      return Br(b);
    },
    Dp = (a) => {
      let b, c, d;
      if (!Dn(a, B4) && a.constructor.$meta.item === null) {
        b = new B8();
        R(b);
        O(b);
      }
      b = Cs(a);
      c = b;
      d = BR();
      c.$id$ = d;
      return b;
    },
    Cg = D(),
    BA = () => {
      BA = C1(Cg);
      CU();
    },
    Do = (b) => {
      let c, d, e, f, g, h, i, j, k;
      BA();
      c = window.document;
      d = c.createElement("div");
      d.appendChild(c.createTextNode("TeaVM generated element"));
      c.body.appendChild(d);
      if (BC === null) {
        e = new Cc();
        d = new BZ();
        d.J = C0(32);
        e.G = d;
        e.D = Bc();
        e.I = W(32);
        e.B = 0;
        e.A = B2;
        BC = e;
      }
      a: {
        f = BC;
        e = Bc();
        g = e.w;
        if (BK(H(10), H(10)) < 0) {
          Cl(e, g, (g + 1) | 0);
          e.v.data[g] = BE(10, 10);
        } else {
          h = 1;
          i = H(1);
          j = BJ(H(-1), H(10));
          b: {
            while (true) {
              k = By(i, H(10));
              if (BK(k, H(10)) > 0) {
                k = i;
                break b;
              }
              h = (h + 1) | 0;
              if (BK(k, j) > 0) break;
              i = k;
            }
          }
          Cl(e, g, (g + h) | 0);
          i = H(10);
          while (true) {
            if (Bt(k, BD)) break a;
            b = e.v.data;
            h = (g + 1) | 0;
            b[g] = BE(BB(BJ(i, k)), 10);
            i = Df(i, k);
            k = BJ(k, H(10));
            g = h;
          }
        }
      }
      c = Br(e);
      e = Bc();
      Be(Be(e, N(2)), c);
      Ck(f, Br(e));
      Ck(f, N(3));
    },
    CU = () => {
      CC();
      Cq();
      C$();
      Cn();
      CW();
    },
    BN = D(0),
    Cb = D(0);
  function Ca() {
    E.call(this);
    this.K = null;
  }
  let Cx = (b) => {
      let c;
      if (b === null) return null;
      c = b.classObject;
      if (c === null) {
        c = new Ca();
        c.K = b;
        b.classObject = c;
      }
      return c;
    },
    Dl = D(),
    CT = D(),
    Cs = (b) => {
      let copy = new b.constructor();
      for (let field in b) {
        if (b.hasOwnProperty(field)) {
          copy[field] = b[field];
        }
      }
      return copy;
    };
  function Bn() {
    let a = this;
    E.call(a);
    a.z = null;
    a.F = null;
    a.y = 0;
    a.x = 0;
  }
  let Dt = (a) => {
      return a;
    },
    C8 = (a) => {
      return a.z;
    },
    Dh = (a) => {
      let b;
      b = a.F;
      if (b === a) b = null;
      return b;
    },
    S = D(Bn),
    R = (a) => {
      a.y = 1;
      a.x = 1;
    },
    Ds = () => {
      let a = new S();
      R(a);
      return a;
    },
    M = D(S),
    CN = (a, b) => {
      a.y = 1;
      a.x = 1;
      a.z = b;
    },
    Dq = (a) => {
      let b = new M();
      CN(b, a);
      return b;
    },
    De = D(M),
    Bb = D(0),
    Q = D(0),
    Bi = D(0),
    I = D(),
    CD = null,
    CP = null,
    Ct = null,
    CB = (a, b) => {
      a.u = BY(b.data, 0, b.data.length);
    },
    CZ = (a) => {
      let b = new I();
      CB(b, a);
      return b;
    },
    Co = (a, b) => {
      a.u = b;
    },
    Dc = (a) => {
      let b = new I();
      Co(b, a);
      return b;
    },
    BF = (a, b) => {
      let c;
      if (b >= 0 && b < a.u.length) return a.u.charCodeAt(b);
      c = new Bz();
      R(c);
      O(c);
    },
    BO = (a) => {
      return a.u.length ? 0 : 1;
    },
    CC = () => {
      let b;
      CD = W(0);
      b = new I();
      b.u = "";
      CP = b;
      Ct = new BT();
    },
    V = D(),
    CE = D(V),
    CJ = null,
    Cq = () => {
      CJ = Bm(C7);
    };
  function Bv() {
    let a = this;
    E.call(a);
    a.v = null;
    a.w = 0;
  }
  let Cl = (a, b, c) => {
      let d, e, f, g;
      d = a.w;
      e = (d - b) | 0;
      BQ(a, (((d + c) | 0) - b) | 0);
      f = (e - 1) | 0;
      while (f >= 0) {
        g = a.v.data;
        g[(c + f) | 0] = g[(b + f) | 0];
        f = (f + -1) | 0;
      }
      a.w = (a.w + ((c - b) | 0)) | 0;
    },
    BL = D(0),
    BP = D(Bv),
    CX = (a) => {
      a.v = W(16);
    },
    Bc = () => {
      let a = new BP();
      CX(a);
      return a;
    },
    Be = (a, b) => {
      let c, d, e, f, g;
      c = a.w;
      if (b === null) b = N(4);
      if (c >= 0 && c <= c) {
        if (!BO(b)) {
          BQ(a, (a.w + b.u.length) | 0);
          d = (a.w - 1) | 0;
          while (d >= c) {
            a.v.data[(d + b.u.length) | 0] = a.v.data[d];
            d = (d + -1) | 0;
          }
          a.w = (a.w + b.u.length) | 0;
          e = 0;
          while (e < b.u.length) {
            f = a.v.data;
            g = (c + 1) | 0;
            f[c] = BF(b, e);
            e = (e + 1) | 0;
            c = g;
          }
        }
        return a;
      }
      b = new Bz();
      Ci(b);
      O(b);
    },
    Br = (a) => {
      let b, c, d, e, f;
      b = new I();
      c = a.v;
      d = c.data;
      e = a.w;
      f = d.length;
      if (e >= 0 && e <= ((f - 0) | 0)) {
        b.u = BY(c.data, 0, e);
        return b;
      }
      b = new Y();
      R(b);
      O(b);
    },
    BQ = (a, b) => {
      let c, d, e, f, g;
      c = a.v.data.length;
      if (c < b) {
        b = c >= 1073741823 ? 2147483647 : BW(b, BW((c * 2) | 0, 5));
        d = a.v.data;
        e = W(b);
        f = d.length;
        if (b < f) f = b;
        g = e.data;
        c = 0;
        while (c < f) {
          g[c] = d[c];
          c = (c + 1) | 0;
        }
        a.v = e;
      }
    },
    Bl = D(0),
    BX = D(0),
    B7 = D(0),
    B$ = D(0),
    Cv = D(),
    Db = D(),
    BC = null,
    C9 = D(),
    C6 = D(),
    B6 = D(0),
    B5 = D(0),
    Cj = D(0),
    X = D();
  function BM() {
    X.call(this);
    this.G = null;
  }
  function BG() {
    let a = this;
    BM.call(a);
    a.B = 0;
    a.D = null;
    a.I = null;
    a.A = null;
  }
  let BH = D(BG),
    Cc = D(BH),
    Ck = (a, b) => {
      if (b === null) b = N(4);
      C_(BI(b));
    },
    B9 = D(0),
    BT = D(),
    Cd = D(),
    CI = null,
    C2 = null,
    BE = (b, c) => {
      if (c >= 2 && c <= 36 && b >= 0 && b < c)
        return b < 10
          ? ((48 + b) | 0) & 65535
          : ((((97 + b) | 0) - 10) | 0) & 65535;
      return 0;
    },
    C$ = () => {
      CI = Bm(BV);
      C2 = Bg(Cd, 128);
    },
    Cw = D();
  function BZ() {
    X.call(this);
    this.J = null;
  }
  let Y = D(M),
    Ci = (a) => {
      R(a);
    },
    Dr = () => {
      let a = new Y();
      Ci(a);
      return a;
    };
  function Bo() {
    let a = this;
    E.call(a);
    a.H = null;
    a.E = null;
  }
  let B1 = (b) => {
      let c, d;
      if (BO(b)) O(Bx(b));
      if (!B3(BF(b, 0))) O(Bx(b));
      c = 1;
      while (c < b.u.length) {
        a: {
          d = BF(b, c);
          switch (d) {
            case 43:
            case 45:
            case 46:
            case 58:
            case 95:
              break;
            default:
              if (B3(d)) break a;
              else O(Bx(b));
          }
        }
        c = (c + 1) | 0;
      }
    },
    B3 = (b) => {
      a: {
        b: {
          if (!(b >= 48 && b <= 57) && !(b >= 97 && b <= 122)) {
            if (b < 65) break b;
            if (b > 90) break b;
          }
          b = 1;
          break a;
        }
        b = 0;
      }
      return b;
    },
    BS = D(Bo),
    B2 = null,
    Cn = () => {
      let b, c, d, e, f;
      b = new BS();
      c = Bg(I, 0);
      d = c.data;
      B1(N(5));
      e = d.length;
      f = 0;
      while (f < e) {
        B1(d[f]);
        f = (f + 1) | 0;
      }
      b.H = N(5);
      b.E = c.t();
      B2 = b;
    },
    Bk = D(M);
  function Cf() {
    Bk.call(this);
    this.C = null;
  }
  let Cz = (a, b) => {
      R(a);
      a.C = b;
    },
    Bx = (a) => {
      let b = new Cf();
      Cz(b, a);
      return b;
    },
    B4 = D(0),
    B8 = D(S),
    Bz = D(Y),
    Cu = D(V),
    CM = null,
    BJ = (b, c) => {
      return Bu(b, c);
    },
    Df = (b, c) => {
      return Bq(b, c);
    },
    BK = (b, c) => {
      return Bp(b, c);
    },
    CW = () => {
      CM = Bm(CS);
    },
    C3 = D(),
    BW = (b, c) => {
      if (b > c) c = b;
      return c;
    },
    Dk = D();
  Cp([]);
  Ch([
    E,
    0,
    0,
    [],
    0,
    3,
    0,
    0,
    0,
    Cg,
    0,
    E,
    [],
    0,
    3,
    0,
    BA,
    0,
    BN,
    0,
    E,
    [],
    3,
    3,
    0,
    0,
    0,
    Cb,
    0,
    E,
    [],
    3,
    3,
    0,
    0,
    0,
    Ca,
    0,
    E,
    [BN, Cb],
    0,
    3,
    0,
    0,
    0,
    Dl,
    0,
    E,
    [],
    4,
    0,
    0,
    0,
    0,
    CT,
    0,
    E,
    [],
    4,
    3,
    0,
    0,
    0,
    Bn,
    0,
    E,
    [],
    0,
    3,
    0,
    0,
    0,
    S,
    0,
    Bn,
    [],
    0,
    3,
    0,
    0,
    0,
    M,
    0,
    S,
    [],
    0,
    3,
    0,
    0,
    0,
    De,
    0,
    M,
    [],
    0,
    3,
    0,
    0,
    0,
    Bb,
    0,
    E,
    [],
    3,
    3,
    0,
    0,
    0,
    Q,
    0,
    E,
    [],
    3,
    3,
    0,
    0,
    0,
    Bi,
    0,
    E,
    [],
    3,
    3,
    0,
    0,
    0,
    I,
    0,
    E,
    [Bb, Q, Bi],
    0,
    3,
    0,
    0,
    0,
    V,
    0,
    E,
    [Bb],
    1,
    3,
    0,
    0,
    0,
    CE,
    0,
    V,
    [Q],
    0,
    3,
    0,
    0,
    0,
    Bv,
    0,
    E,
    [Bb, Bi],
    0,
    0,
    0,
    0,
    0,
    BL,
    0,
    E,
    [],
    3,
    3,
    0,
    0,
    0,
    BP,
    0,
    Bv,
    [BL],
    0,
    3,
    0,
    0,
    0,
    Bl,
    0,
    E,
    [],
    3,
    3,
    0,
    0,
    0,
    BX,
    0,
    E,
    [Bl],
    3,
    3,
    0,
    0,
    0,
    B7,
    0,
    E,
    [BX],
    3,
    3,
    0,
    0,
    0,
    B$,
    0,
    E,
    [Bl],
    3,
    3,
    0,
    0,
    0,
    Cv,
    0,
    E,
    [B7, B$],
    1,
    3,
    0,
    0,
    0,
    Db,
    0,
    E,
    [],
    4,
    3,
    0,
    0,
    0,
    C9,
    0,
    E,
    [],
    0,
    3,
    0,
    0,
    0,
    C6,
    0,
    E,
    [],
    4,
    3,
    0,
    0,
    0,
    B6,
    0,
    E,
    [],
    3,
    3,
    0,
    0,
    0,
    B5,
    0,
    E,
    [B6],
    3,
    3,
    0,
    0,
    0,
    Cj,
    0,
    E,
    [],
    3,
    3,
    0,
    0,
    0,
    X,
    0,
    E,
    [B5, Cj],
    1,
    3,
    0,
    0,
    0,
    BM,
    0,
    X,
    [],
    0,
    3,
    0,
    0,
    0,
    BG,
    0,
    BM,
    [BL],
    0,
    3,
    0,
    0,
    0,
    BH,
    0,
    BG,
    [],
    1,
    3,
    0,
    0,
    0,
    Cc,
    0,
    BH,
    [],
    0,
    3,
    0,
    0,
    0,
    B9,
    0,
    E,
    [],
    3,
    3,
    0,
    0,
    0,
    BT,
    0,
    E,
    [B9],
    0,
    3,
    0,
    0,
    0,
    Cd,
    0,
    E,
    [Q],
    0,
    3,
    0,
    0,
    0,
    Cw,
    0,
    E,
    [],
    4,
    3,
    0,
    0,
    0,
    BZ,
    0,
    X,
    [],
    0,
    3,
    0,
    0,
    0,
    Y,
    0,
    M,
    [],
    0,
    3,
    0,
    0,
    0,
    Bo,
    0,
    E,
    [Q],
    1,
    3,
    0,
    0,
    0,
    BS,
    0,
    Bo,
    [],
    0,
    3,
    0,
    0,
    0,
    Bk,
    0,
    M,
    [],
    0,
    3,
    0,
    0,
    0,
    Cf,
    0,
    Bk,
    [],
    0,
    3,
    0,
    0,
    0,
    B4,
    0,
    E,
    [],
    3,
    3,
    0,
    0,
    0,
    B8,
    0,
    S,
    [],
    0,
    3,
    0,
    0,
    0,
    Bz,
    0,
    Y,
    [],
    0,
    3,
    0,
    0,
    0,
    Cu,
    0,
    V,
    [Q],
    0,
    3,
    0,
    0,
    0,
  ]);
  Ch([C3, 0, E, [], 4, 3, 0, 0, 0, Dk, 0, E, [], 0, 3, 0, 0, 0]);
  let CO = Z(BV),
    CG = Z(Cr);
  CH(["0", "<java_object>@", "longValue: ", "\n", "null", "UTF-8"]);
  I.prototype.toString = function () {
    return BI(this);
  };
  I.prototype.valueOf = I.prototype.toString;
  E.prototype.toString = function () {
    return BI(CY(this));
  };
  E.prototype.__teavm_class__ = function () {
    return CR(this);
  };
  let C = Cy(Do);
  C.javaException = CF;
  B.main = C;
  window.B = B;
});

//# sourceMappingURL=classes.js.map
