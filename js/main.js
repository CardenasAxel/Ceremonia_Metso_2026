/*
 * Lógica de la invitación. Los datos editables están en js/config.js.
 * Regla de seguridad: el contenido dinámico se inserta SOLO con textContent
 * o creando nodos. Nunca usar innerHTML con datos.
 */
(function () {
  "use strict";

  var doc = document.documentElement;
  doc.classList.add("js");

  var TZ = "America/Lima";
  var EVENT = new Date(CONFIG.fechaEvento).getTime();
  var DEADLINE = new Date(CONFIG.fechaLimiteFormulario).getTime();
  var $ = function (sel) { return document.querySelector(sel); };

  /* ---------- Textos desde config.js ---------- */
  function pick(path) {
    return path.split(".").reduce(function (o, k) { return o == null ? o : o[k]; }, CONFIG);
  }
  document.querySelectorAll("[data-cfg]").forEach(function (el) {
    var v = pick(el.getAttribute("data-cfg"));
    if (typeof v === "string") el.textContent = v;
  });

  var maps = $("#maps-link");
  if (/^https:\/\//.test(CONFIG.lugar.mapsUrl)) maps.href = CONFIG.lugar.mapsUrl;

  /* Fechas legibles en español, siempre en hora de Lima */
  function parts(ms, opts) {
    var out = {};
    new Intl.DateTimeFormat("es-PE", Object.assign({ timeZone: TZ }, opts))
      .formatToParts(new Date(ms)).forEach(function (p) { out[p.type] = p.value; });
    return out;
  }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  var ev = parts(EVENT, { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  var dl = parts(DEADLINE, { weekday: "long", day: "numeric", month: "long" });
  var hora = new Intl.DateTimeFormat("es-PE", { timeZone: TZ, hour: "numeric", minute: "2-digit", hour12: true })
    .format(new Date(EVENT)).replace(/\s+/g, " ");
  var limite = dl.weekday + " " + dl.day + " de " + dl.month;
  var fmt = {
    fecha: cap(ev.weekday) + " " + ev.day + " de " + ev.month + " de " + ev.year,
    hora: hora,
    limite: limite,
    cerrado: "El plazo de confirmación cerró el " + limite + "."
  };
  document.querySelectorAll("[data-fmt]").forEach(function (el) {
    el.textContent = fmt[el.getAttribute("data-fmt")];
  });

  /* ---------- Cuenta regresiva ---------- */
  var cd = $("#countdown");
  var units = { d: 86400000, h: 3600000, m: 60000, s: 1000 };
  var cells = {};
  cd.querySelectorAll("[data-unit]").forEach(function (el) { cells[el.getAttribute("data-unit")] = el; });
  var timer;

  function tick() {
    var left = EVENT - Date.now();
    if (left <= 0) {
      clearInterval(timer);
      cd.hidden = true;
      $("#countdown-sr").textContent = "";
      $("#event-day").hidden = false;
      return;
    }
    Object.keys(units).forEach(function (k) {
      var n = Math.floor(left / units[k]);
      left -= n * units[k];
      cells[k].textContent = k === "d" ? String(n) : String(n).padStart(2, "0");
    });
  }
  tick();
  if (EVENT > Date.now()) {
    timer = setInterval(tick, 1000);
    // Texto para lectores de pantalla: se escribe una sola vez, no cada segundo.
    var days = Math.ceil((EVENT - Date.now()) / units.d);
    $("#countdown-sr").textContent = days === 1
      ? "Falta 1 día para la ceremonia."
      : "Faltan " + days + " días para la ceremonia.";
  }

  /* ---------- Itinerario ---------- */
  var list = $("#itinerary");
  (CONFIG.itinerario || []).forEach(function (item) {
    var li = document.createElement("li");
    var t = document.createElement("span");
    t.className = "t-hora";
    t.textContent = item.hora;
    var h = document.createElement("h3");
    h.textContent = item.titulo;
    li.append(t, h);
    if (item.descripcion) {
      var p = document.createElement("p");
      p.textContent = item.descripcion;
      li.append(p);
    }
    list.append(li);
  });

  /* ---------- Aparición de secciones ---------- */
  var reveals = document.querySelectorAll(".reveal");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Confirmación (formulario externo) ---------- */
  var formLink = $("#form-link");
  if (Date.now() > DEADLINE) {
    formLink.hidden = true;
    $("#rsvp-closed").hidden = false;
  } else if (/^https:\/\//.test(CONFIG.formularioUrl)) {
    formLink.href = CONFIG.formularioUrl;
  } else {
    formLink.hidden = true;
    console.warn("[Invitación] Falta formularioUrl en js/config.js: el botón de confirmación está oculto.");
  }
})();
