/*
 * CONFIGURACIÓN EDITABLE DE LA INVITACIÓN
 * ---------------------------------------
 * Este es el único archivo que normalmente se edita.
 * - Mantén las comillas y las comas tal como están.
 * - Las fechas usan formato ISO con la zona horaria de Lima (-05:00).
 *
 * OJO: "¿Cómo llegar?" y "Código de vestimenta" NO están aquí a propósito.
 * Son textos fijos dentro de index.html y solo se cambian con un pedido explícito.
 */
const CONFIG = Object.freeze({
  // Fecha y hora del evento (hora de Lima). La cuenta regresiva apunta aquí.
  fechaEvento: "2026-12-01T18:00:00-05:00",

  // Último momento para confirmar asistencia (hora de Lima).
  // Debe coincidir con la fecha de la condición del flujo de Power Automate (ver GUIA_POWER_AUTOMATE.md, paso 3.3).
  fechaLimiteFormulario: "2026-11-26T23:59:59-05:00",

  // Textos de la portada.
  titulo: "Noche de Gala",
  subtitulo: "Ceremonia de Años de Servicio",

  // Mensaje que reemplaza a la cuenta regresiva cuando llega el día.
  mensajeDiaEvento: {
    titulo: "¡Llegó el gran día!",
    texto: "Esta noche reconocemos los años de dedicación, esfuerzo y logros compartidos."
  },

  // Lugar del evento y botón "Ver ubicación".
  lugar: {
    nombre: "Restaurante La Rosa Náutica",
    direccion: "Circuito de Playas, Miraflores 15074",
    mapsUrl: "https://maps.app.goo.gl/eHSjA9HLxhH4Ji5S8"
  },

  // Itinerario de la noche: cada bloque tiene hora, título y descripción breve.
  itinerario: [
    // EJEMPLO — reemplazar
    { hora: "6:00 p. m.", titulo: "Recepción", descripcion: "Bienvenida y registro de invitados." },
    // EJEMPLO — reemplazar
    { hora: "6:30 p. m.", titulo: "Palabras de apertura", descripcion: "Mensaje de la gerencia." },
    // EJEMPLO — reemplazar
    { hora: "7:00 p. m.", titulo: "Reconocimientos", descripcion: "Entrega de distinciones por 5, 10, 15, 20, 25 y 30 años." },
    // EJEMPLO — reemplazar
    { hora: "8:00 p. m.", titulo: "Cena", descripcion: "Cena de gala para todos los asistentes." },
    // EJEMPLO — reemplazar
    { hora: "9:00 p. m.", titulo: "Brindis y celebración", descripcion: "Música y cierre de la noche." }
  ],

  // URL "HTTP POST" del flujo de Power Automate que guarda las respuestas en Excel (ver GUIA_POWER_AUTOMATE.md).
  // Vacío = MODO DEMO: el formulario simula un envío exitoso y no guarda nada.
  FLUJO_URL: ""
});
