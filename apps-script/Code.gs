/**
 * Confirmaciones · Ceremonia de Años de Servicio Metso
 * ----------------------------------------------------
 * Script VINCULADO a una hoja de cálculo (Extensiones → Apps Script).
 * No necesita el ID de la hoja ni ninguna clave.
 *
 * Implementar como aplicación web:
 *   - Ejecutar como: Yo
 *   - Quién tiene acceso: Cualquier usuario
 *
 * Responde siempre JSON: { ok: true } o { ok: false, error: "<código>" }.
 */

// Debe coincidir con fechaLimiteFormulario en js/config.js (hora de Lima).
var FECHA_LIMITE = new Date('2026-12-06T23:59:59-05:00');
var ZONA = 'America/Lima';
var HOJA = 'Respuestas';
var COLUMNAS = [
  'Fecha y hora (Lima)',
  'Nombres y Apellidos',
  'Asistirá',
  'Vehículo propio',
  'Alergia',
  'Detalle alergia',
  'Posible duplicado'
];

// Mismas reglas que js/main.js
var NOMBRE_RE = /^[\p{L}\p{M}' ’-]+$/u;
var LETRA_RE = /\p{L}/u;
var SI_NO = ['Sí', 'No'];

function doPost(e) {
  try {
    var p = (e && e.parameter) || {};

    // Campo trampa: si viene lleno es un bot. Respondemos "ok" sin guardar nada.
    if (p.website) return responder({ ok: true });

    if (new Date() > FECHA_LIMITE) return responder({ ok: false, error: 'plazo_cerrado' });

    var datos = validar(p);
    if (!datos) return responder({ ok: false, error: 'datos_invalidos' });

    // Evita choques entre envíos simultáneos.
    var lock = LockService.getScriptLock();
    if (!lock.tryLock(15000)) return responder({ ok: false, error: 'ocupado' });
    try {
      var hoja = obtenerHoja();
      var duplicado = esDuplicado(hoja, datos.nombre);
      hoja.appendRow([
        Utilities.formatDate(new Date(), ZONA, 'yyyy-MM-dd HH:mm:ss'),
        datos.nombre,
        datos.asistencia,
        datos.vehiculo,
        datos.alergia,
        datos.alergiaDetalle,
        duplicado ? 'Sí' : ''
      ].map(seguro));
    } finally {
      lock.releaseLock();
    }
    return responder({ ok: true });
  } catch (err) {
    console.error(err); // Visible solo en Apps Script → Ejecuciones. No se envía al navegador.
    return responder({ ok: false, error: 'error_interno' });
  }
}

// Permite comprobar en el navegador que la URL de la aplicación web funciona.
function doGet() {
  return responder({ ok: true, servicio: 'activo' });
}

/** Devuelve los datos limpios o null si algo no cumple las reglas. */
function validar(p) {
  var nombre = texto(p.nombre).replace(/\s+/g, ' ').trim();
  var asistencia = texto(p.asistencia);
  var vehiculo = texto(p.vehiculo);
  var alergia = texto(p.alergia);
  var detalle = texto(p.alergiaDetalle).trim();

  if (nombre.length < 3 || nombre.length > 100) return null;
  if (!NOMBRE_RE.test(nombre) || !LETRA_RE.test(nombre)) return null;
  if (SI_NO.indexOf(asistencia) === -1) return null;
  if (texto(p.acepta) !== 'Sí') return null;

  if (asistencia === 'No') {
    vehiculo = ''; alergia = ''; detalle = '';
  } else {
    if (SI_NO.indexOf(vehiculo) === -1) return null;
    if (SI_NO.indexOf(alergia) === -1) return null;
    if (alergia === 'Sí') {
      if (!detalle || detalle.length > 300) return null;
    } else {
      detalle = '';
    }
  }
  return { nombre: nombre, asistencia: asistencia, vehiculo: vehiculo, alergia: alergia, alergiaDetalle: detalle };
}

function obtenerHoja() {
  var libro = SpreadsheetApp.getActiveSpreadsheet();
  var hoja = libro.getSheetByName(HOJA) || libro.insertSheet(HOJA);
  if (hoja.getLastRow() === 0) {
    hoja.appendRow(COLUMNAS);
    hoja.setFrozenRows(1);
  }
  return hoja;
}

/** Compara el nombre normalizado (sin tildes, minúsculas, sin espacios extra) con los ya guardados. */
function esDuplicado(hoja, nombre) {
  var filas = hoja.getLastRow() - 1;
  if (filas < 1) return false;
  var buscado = normalizar(nombre);
  var nombres = hoja.getRange(2, 2, filas, 1).getValues();
  for (var i = 0; i < nombres.length; i++) {
    if (normalizar(String(nombres[i][0]).replace(/^'/, '')) === buscado) return true;
  }
  return false;
}

function normalizar(s) {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/\s+/g, ' ').trim();
}

/** Protección contra inyección de fórmulas: si empieza con = + - @ se antepone un apóstrofo. */
function seguro(v) {
  v = String(v);
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

function texto(v) {
  return typeof v === 'string' ? v : '';
}

function responder(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Prueba manual desde el editor (botón Ejecutar): agrega una fila de ejemplo.
 * Bórrala de la hoja después de comprobar que funciona.
 */
function probar() {
  var r = doPost({ parameter: {
    nombre: 'Prueba Organizador', asistencia: 'Sí', vehiculo: 'No',
    alergia: 'Sí', alergiaDetalle: '=maní (prueba de fórmula)', acepta: 'Sí', website: ''
  } });
  console.log(r.getContent());
}
