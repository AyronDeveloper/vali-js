var l = Object.defineProperty;
var a = (f, t, r) => t in f ? l(f, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : f[t] = r;
var c = (f, t, r) => a(f, typeof t != "symbol" ? t + "" : t, r);
class y {
  static required(t) {
    return t == null ? !1 : typeof t == "string" ? t.trim().length > 0 : !0;
  }
  static isString(t) {
    return typeof t == "string";
  }
  static isAlpha(t) {
    return typeof t != "string" ? !1 : new RegExp("^\\p{L}+(?: \\p{L}+)*$", "u").test(t);
  }
  static selectRadio(t) {
    return Array.from(t).some((r) => r.checked);
  }
  static selectCheckBox(t, r) {
    const e = Array.from(t).filter((s) => s.checked).length, i = (r == null ? void 0 : r.min) ?? 1, n = r == null ? void 0 : r.max;
    if (i < 0 || !Number.isInteger(i))
      throw new Error("min debe ser un entero mayor o igual a 0");
    if (n !== void 0 && (n < 0 || !Number.isInteger(n)))
      throw new Error("max debe ser un entero mayor o igual a 0");
    if (n !== void 0 && i > n)
      throw new Error("min no puede ser mayor que max");
    return !(e < i || n !== void 0 && e > n);
  }
  static isNumber(t) {
    if (typeof t == "number")
      return Number.isFinite(t);
    if (typeof t != "string")
      return !1;
    const r = t.trim();
    return r === "" ? !1 : Number.isFinite(Number(r));
  }
  static isInteger(t) {
    if (typeof t != "number" && typeof t != "string" || typeof t == "string" && t.trim() === "")
      return !1;
    const r = Number(t);
    return Number.isFinite(r) && Number.isInteger(r);
  }
  static isDecimal(t) {
    if (typeof t != "number" && typeof t != "string" || typeof t == "string" && t.trim() === "")
      return !1;
    const r = Number(t);
    return Number.isFinite(r) && !Number.isInteger(r);
  }
  static isBoolean(t) {
    if (typeof t == "boolean")
      return !0;
    if (typeof t != "string")
      return !1;
    const r = t.trim().toLowerCase();
    return r === "true" || r === "false";
  }
  static lenMin(t, r) {
    return typeof t == "string" ? t.trim().length >= r.min : t.length >= r.min;
  }
  static lenMax(t, r) {
    return typeof t == "string" ? t.trim().length <= r.max : t.length <= r.max;
  }
  static isArray(t) {
    return Array.isArray(t);
  }
  static differentTo(t, r) {
    return t != r.to;
  }
  static equalTo(t, r) {
    return t == r.to;
  }
  static isEmail(t) {
    if (typeof t != "string")
      return !1;
    const r = t.trim();
    return r === "" ? !1 : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r);
  }
  static valitedDate(t) {
    if (typeof t != "string")
      return !1;
    const r = /^(\d{4})-(\d{2})-(\d{2})$/.exec(t);
    if (!r)
      return !1;
    const e = Number(r[1]), i = Number(r[2]), n = Number(r[3]), s = new Date(Date.UTC(e, i - 1, n));
    return s.getUTCFullYear() === e && s.getUTCMonth() === i - 1 && s.getUTCDate() === n;
  }
  static uploadFile(t) {
    return typeof File > "u" ? !1 : t instanceof File ? !0 : typeof FileList < "u" && t instanceof FileList ? t.length > 0 : Array.isArray(t) ? t.length > 0 && t.every((r) => r instanceof File) : !1;
  }
  static sizeFile(t, r) {
    const e = typeof File < "u" && t instanceof File ? [t] : typeof FileList < "u" && t instanceof FileList ? Array.from(t) : Array.isArray(t) && typeof File < "u" && t.every((u) => u instanceof File) ? t : [];
    if (e.length === 0)
      return !1;
    const i = r.unit ?? "B", n = {
      B: 1,
      KB: 1024,
      MB: 1024 * 1024
    }[i], s = r.min === void 0 ? void 0 : r.min * n, o = r.max === void 0 ? void 0 : r.max * n;
    if (s !== void 0 && (!Number.isFinite(s) || s < 0) || o !== void 0 && (!Number.isFinite(o) || o < 0) || s !== void 0 && o !== void 0 && s > o)
      throw new Error("Los límites de tamaño no son válidos");
    return e.every(
      (u) => (s === void 0 || u.size >= s) && (o === void 0 || u.size <= o)
    );
  }
  static typeFile(t, r) {
    if (!Array.isArray(r.types) || r.types.length === 0)
      throw new Error("types debe ser un array no vacío");
    let e;
    if (typeof File < "u" && t instanceof File)
      e = [t];
    else if (typeof FileList < "u" && t instanceof FileList)
      e = Array.from(t);
    else if (Array.isArray(t) && typeof File < "u" && t.every((i) => i instanceof File))
      e = t;
    else
      return !1;
    return e.length === 0 ? !1 : e.every((i) => r.types.includes(i.type));
  }
  static isURL(t) {
    if (typeof t != "string" || t.trim() === "")
      return !1;
    try {
      const r = new URL(t);
      return (r.protocol === "http:" || r.protocol === "https:") && r.hostname !== "";
    } catch {
      return !1;
    }
  }
  static notUse(t, r) {
    if (typeof t != "string")
      return !1;
    const e = r.not ?? [];
    if (!Array.isArray(e))
      throw new Error("not debe ser un array");
    return !e.some((i) => typeof i != "string" || i === "" ? !1 : t.toLowerCase().includes(i.toLowerCase()));
  }
  static isColor(t) {
    return !(typeof t != "string" || t.trim() === "" || typeof CSS > "u" || !CSS.supports("color", t.trim()));
  }
}
class d {
  constructor() {
    c(this, "started", !1);
    c(this, "count", 0);
    c(this, "result", !0);
    c(this, "error", "");
  }
  start() {
    this.started = !0, this.count = 0, this.result = !0, this.error = "";
  }
  validation(t, r) {
    if (!this.started)
      throw new Error("Debes iniciar la validacion");
    this.result = !0, this.error = "";
    for (const [e, i] of Object.entries(r)) {
      if (!this.result) break;
      if (!i) continue;
      const n = y[e];
      if (typeof n != "function")
        throw new Error(`La validacion ${e} no existe`);
      const s = "params" in i ? i.params : {}, o = i.error ?? "";
      n(t, s) || (this.result = !1, this.count++, this.error = o);
    }
    return this;
  }
  custom(t, r = !0, e = "") {
    return this.result = !0, this.error = "", t !== r && (this.result = !1, this.count++, this.error = e), this;
  }
  getValiError() {
    return this.result;
  }
  getMsgError() {
    return this.error;
  }
  resultVali() {
    return !(this.count > 0);
  }
}
const h = new d();
export {
  y as Rules,
  d as Vali,
  h as jsVali
};
//# sourceMappingURL=js-vali.es.js.map
