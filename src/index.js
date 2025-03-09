let f = 0, r = !0, m = "", t = !1, g = "";
const k = (e) => e == null || e.trim() == "", b = (e) => {
  const o = `${e ? "acegikmoqsuwy" : "bdfhjlnprtvxz"}${e ? "02468" : "13579"}${e ? "BDFHJLNPRTVXZ" : "ACEGIKMOQSUWY"}!@#$%^&*()_-+=?><[]`;
  let i = "", u = Math.floor(Math.random() * 6) + 10;
  for (let c = 0; c < u; c++) {
    const h = Math.floor(Math.random() * o.length);
    i += o[h];
  }
  return i;
}, d = (e) => {
  const s = "bdfhjlnprtvxz13579!@#$%^&*()_-+=?><[]ACEGIKMOQSUWY".split("");
  for (let n = 0; n < e.length; n++) {
    const a = e[n];
    if (!s.includes(a))
      return !1;
  }
  return !0;
}, p = (e) => {
  e.trim() != "" ? (r = !0, t = !1) : (f++, r = !1, t = !0);
}, x = (e) => {
  /^[A-Za-zñÑáéíóúÁÉÍÓÚ]+$/.test(e) ? (r = !0, t = !1) : (f++, r = !1, t = !0);
}, F = (e) => {
  ((s) => {
    var n;
    isNaN(s) ? n = s.length : n = s;
    for (var a = 0; a < n; a++)
      if (s[a].checked)
        return !0;
    return !1;
  })(e) ? (r = !0, t = !1) : (f++, r = !1, t = !0);
}, N = (e, l = null, s = null) => {
  ((a) => {
    var o, i = 0;
    if (isNaN(a) ? o = a.length : o = a, l != null && s != null) {
      for (var u = 0; u < o; u++)
        a[u].checked && i++;
      if (l == "min")
        return i >= s;
      if (l == "max")
        return i <= s;
    } else {
      for (var u = 0; u < o; u++)
        if (a[u].checked)
          return !0;
      return !1;
    }
  })(e) ? (r = !0, t = !1) : (f++, r = !1, t = !0);
}, S = (e) => {
  isNaN(e) ? (f++, r = !1, t = !0) : (r = !0, t = !1);
}, $ = (e) => {
  Number.isInteger(parseInt(e)) && !e.includes(".") ? (r = !0, t = !1) : (f++, r = !1, t = !0);
}, y = (e) => {
  !isNaN(e) && e.includes(".") ? (r = !0, t = !1) : (f++, r = !1, t = !0);
}, E = (e, l = null) => {
  typeof e == "boolean" ? (r = !0, t = !1, l != null && (JSON.parse(l) ? e ? (r = !0, t = !1) : (f++, r = !1, t = !0) : e ? (f++, r = !1, t = !0) : (r = !0, t = !1))) : (f++, r = !1, t = !0);
}, I = (e, l) => {
  e.length >= l ? (r = !0, t = !1) : (f++, r = !1, t = !0);
}, M = (e, l) => {
  e.length <= l ? (r = !0, t = !1) : (f++, r = !1, t = !0);
}, A = (e, l = null, s = null) => {
  Array.isArray(e) ? (r = !0, t = !1, l != null && s != null && (l == "min" ? e.length >= s ? (r = !0, t = !1) : (f++, r = !1, t = !0) : l == "max" && (e.length <= s ? (r = !0, t = !1) : (f++, r = !1, t = !0)))) : (f++, r = !1, t = !0);
}, O = (e, l) => {
  e != l ? (r = !0, t = !1) : (f++, r = !1, t = !0);
}, L = (e, l) => {
  e == l ? (r = !0, t = !1) : (f++, r = !1, t = !0);
}, z = (e) => {
  ((s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s))(e) ? (r = !0, t = !1) : (f++, r = !1, t = !0);
}, j = (e) => {
  if (/^\d{4}-\d{2}-\d{2}$/.test(e)) {
    const s = new Date(e);
    !isNaN(s) || s.toString() != "Invalid Date" ? (r = !0, t = !1) : (f++, r = !1, t = !0);
  } else
    f++, r = !1, t = !0;
}, w = (e) => {
  e instanceof FileList ? e.length > 0 ? (r = !0, t = !1) : (f++, r = !1, t = !0) : e instanceof File ? (r = !0, t = !1) : (f++, r = !1, t = !0);
}, B = (e, l, s, n = null) => {
  let a;
  if (e instanceof FileList)
    a = e[0].size;
  else if (e instanceof File)
    a = e.size;
  else {
    f++, r = !1, t = !0;
    return;
  }
  let o = 1024;
  if (n == "KB") {
    let i = a / o;
    l == "min" ? s <= i ? (r = !0, t = !1) : (f++, r = !1, t = !0) : l == "max" && (s >= i ? (r = !0, t = !1) : (f++, r = !1, t = !0));
  } else
    l == "min" ? s <= a ? (r = !0, t = !1) : (f++, r = !1, t = !0) : l == "max" && (s >= a ? (r = !0, t = !1) : (f++, r = !1, t = !0));
}, C = (e, l) => {
  let s;
  if (e instanceof FileList)
    s = e[0].type;
  else if (e instanceof File)
    s = e.type;
  else {
    f++, r = !1, t = !0;
    return;
  }
  l.includes(s) ? (r = !0, t = !1) : (f++, r = !1, t = !0);
}, D = (e) => {
  try {
    new URL(e), r = !0, t = !1;
  } catch {
    f++, r = !1, t = !0;
  }
}, J = (e, l) => {
  const s = l.map((a) => a === "0-9" ? "0-9" : a === "A-Z" ? "A-Z" : a === "a-z" ? "a-z" : a === "\\s" ? "\\s" : a.replace(/[-\/\\^$.*+?()[\]{}|]/g, "\\$&"));
  new RegExp(`[${s.join("")}]`).test(e) ? (f++, r = !1, t = !0) : (r = !0, t = !1);
}, R = (e) => {
  /^#[0-9A-Fa-f]{6}$/.test(e) ? (r = !0, t = !1) : (f++, r = !1, t = !0);
}, U = () => {
  f = 0;
}, T = (e, l) => {
  r = !0, g = "", t = !1;
  let s = [];
  l.forEach((n) => {
    if (r) {
      if (n.search(/\|/) != -1) {
        let a = n.split(/\|/);
        n = a[0], s = a.slice(1);
      }
      switch (m = n, n) {
        //COMPRUEBA SI UN INPUT ESTA VACIO
        case "required":
          p(e);
          break;
        //VALIDA QUE SOLO SEA CADENAS
        case "isString":
          x(e);
          break;
        //VERIFICA SI SELECCIONO UN INPUT RADIO
        case "selectRadio":
          F(e);
          break;
        case "selectCheckBox":
          N(e, s[0] ? s[0] : null, s[1] ? s[1] : null);
        //VERIFICA SI ES UN NUMERO
        case "isNumber":
          S(e);
          break;
        //VERIFICA QUE SEA UN NUMERO ENTERO
        case "isInteger":
          $(e);
          break;
        //VERIFICA QUE SEA UN DECIMAL
        case "isFloat":
          y(e);
          break;
        //VERIFICA SI ES UN VALOR BOOLEANO
        case "isBoolean":
          E(e, s[0] ? s[0] : null);
          break;
        //MINIMA CANTIDAD DE CARACTERES
        case "lenMin":
          I(e, s[0]);
          break;
        //MAXIMO CANTIDAD DE CARACTERES
        case "lenMax":
          M(e, s[0]);
          break;
        //VERIFICA SI ES UN ARRAY
        case "isArray":
          A(e, s[0] ? s[0] : null, s[1] ? s[1] : null);
          break;
        //VERIFICA QUE SEA DIFERENTE AL VALOR PREDETERMINADO
        case "differentTo":
          O(e, s[0]);
          break;
        //VERIFICA QUE SE IGUAL A VALOR PREDETERMINADO
        case "equalTo":
          L(e, s[0]);
          break;
        //VERIFICA SI ES UN EMAIL Y SE SIGUE SU FORMATO
        case "isEmail":
          z(e);
          break;
        //VALIDA QUE LA FECHA ESTE EN EL FORMATO YYYY-MM-DD
        case "valitedDate":
          j(e);
          break;
        //VALIDA SI SE CARGO UN ARCHIVO
        case "uploadFile":
          w(e);
          break;
        //VALIDA EL PESO DE UN ARCHIVO EN KB O bytes
        case "sizeFile":
          B(e, s[0], s[1], s[2] ? s[2] : null);
          break;
        //VALIDA EL TIPO DE ARCHIVO QUE SE SOLICITA
        case "typeFile":
          C(e, s);
          break;
        //VALIDA SI EL FORMATO DE URL ES CORRECTO
        case "isURL":
          D(e);
          break;
        case "notUse":
          J(e, s[0]);
          break;
        //VALIDA QUE TENGA EL FORMATO DE COLOR #000000
        case "isColor":
          R(e);
          break;
      }
    }
  });
}, q = (e, l, s = !0) => {
  m = e, s ? l ? (s = !0, t = !1) : (f++, s = !1, t = !0) : l ? (f++, s = !1, t = !0) : (s = !0, t = !1);
}, V = (e, l = null) => t ? !r && m == e ? (t = !1, g = k(l) ? `${e} Error` : l) : (g = "", t = !0, g) : g, K = (e = null, l = null) => {
  if (e != null && e != null)
    r ? e() : l();
  else
    return !r;
}, Z = () => f == 0, _ = (e, l) => {
  let s = {};
  l.forEach((n) => {
    s[n] = `${b(!1)}`;
  }), sessionStorage.setItem(e, JSON.stringify(s));
}, G = (e, l) => {
  let s = !1;
  if (e != null || e != "") {
    const n = JSON.parse(sessionStorage.getItem(e));
    f == 0 ? (n[l] = `${b(!0)}`, s = !0) : (n[l] = `${b(!1)}`, s = !1), sessionStorage.setItem(e, JSON.stringify(n));
  }
  return s;
}, Q = (e, l = "") => {
  let s = !1;
  if (e != null && e != "") {
    const a = sessionStorage.getItem(e);
    let o = JSON.parse(a);
    const i = Object.keys(o), u = Object.values(o);
    var n = 0;
    u.forEach((c) => {
      d(c) && n++;
    }), n == 0 && (s = !0, l == "reset" && (i.forEach((c) => {
      o[c] = `${b(!1)}`;
    }), sessionStorage.setItem(e, JSON.stringify(o))));
  }
  return s;
}, W = {
  formStart: U,
  formVali: T,
  customVali: q,
  formError: V,
  resultError: K,
  formFinal: Z,
  globalStart: _,
  globalForm: G,
  globalFinal: Q
};
export {
  W as default
};
