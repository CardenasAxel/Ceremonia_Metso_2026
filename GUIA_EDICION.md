# Guía de edición — Invitación "Ceremonia de Años de Servicio Metso 2026"

Esta guía es para cualquier persona o asistente de IA (ChatGPT, Claude, Copilot, etc.) que deba editar la invitación **sin conocer el proyecto**. Si usas una IA, copia esta guía completa junto con tu pedido.

## Qué es este proyecto

Una página web estática (HTML + CSS + JavaScript, sin instalar nada) que funciona como invitación digital. Se publica en GitHub Pages. Las confirmaciones se guardan en una hoja de Google Sheets a través de Google Apps Script.

```
index.html          Estructura y textos fijos de la página
css/styles.css      Diseño (colores, tipografías, tamaños)
js/config.js        ← DATOS EDITABLES (lo único que se toca normalmente)
js/main.js          Lógica (cuenta regresiva, formulario, itinerario)
apps-script/Code.gs Backend que guarda las respuestas en Google Sheets
assets/img/         Imágenes optimizadas (WebP + PNG)
assets/fonts/       Tipografías autoalojadas
```

## Reglas (no se negocian)

1. Los cambios normales se hacen **solo en `js/config.js`**.
2. **"¿Cómo llegar?" y "Código de vestimenta" son textos fijos** en `index.html`. No se modifican salvo que el pedido lo diga explícitamente. Tampoco se mueven a `config.js`.
3. **Nunca usar `innerHTML`** para mostrar datos. Usar `textContent`.
4. **No agregar librerías, fuentes ni scripts desde Internet (CDN).** No escribir JavaScript ni estilos dentro del HTML (`<script>` en línea, `onclick`, `style="…"`): la política de seguridad (CSP) los bloquea y la página se rompe.
5. **No subir respuestas de invitados** (CSV, Excel, capturas) al repositorio.
6. **Respetar la identidad visual** (Key Visual): fondo negro; dorado `#EBC789`, bronce `#B68660` y champán `#C8B398`; títulos en *Cormorant Garamond* itálica; texto en *Montserrat*.
7. En `config.js` mantener las comillas `"…"`, las comas y las llaves. Un error de sintaxis deja la página sin cuenta regresiva ni itinerario.

## El archivo `js/config.js`

```js
const CONFIG = Object.freeze({
  fechaEvento: "2026-12-09T19:00:00-05:00",
  fechaLimiteFormulario: "2026-12-06T23:59:59-05:00",
  titulo: "Noche de Gala",
  subtitulo: "Ceremonia de Años de Servicio",
  mensajeDiaEvento: {
    titulo: "¡Llegó el gran día!",
    texto: "Esta noche reconocemos los años de dedicación, esfuerzo y logros compartidos."
  },
  lugar: {
    nombre: "Restaurante La Rosa Náutica",
    direccion: "Circuito de Playas, Miraflores 15074",
    mapsUrl: "https://maps.app.goo.gl/eHSjA9HLxhH4Ji5S8"
  },
  itinerario: [
    { hora: "7:00 p. m.", titulo: "Recepción", descripcion: "Bienvenida y registro de invitados." },
    // …más bloques…
  ],
  APPS_SCRIPT_URL: ""
});
```

- Las fechas van en formato `AAAA-MM-DDTHH:MM:SS-05:00`. El `-05:00` es la hora de Lima: **no lo quites**.
- La fecha y la hora que se ven en la página ("Miércoles 9 de diciembre de 2026", "7:00 p. m.") y el texto del plazo ("domingo 6 de diciembre") se calculan solos a partir de estas fechas.

## Ejemplos de pedidos y el fragmento exacto que cambia

### 1. "Cambia el bloque de las 8:00 p. m. del itinerario por 'Show artístico: presentación de danza'"

Antes:
```js
    // EJEMPLO — reemplazar
    { hora: "8:00 p. m.", titulo: "Reconocimientos", descripcion: "Entrega de distinciones por 5, 10, 15, 20, 25 y 30 años." },
```
Después:
```js
    { hora: "8:00 p. m.", titulo: "Show artístico", descripcion: "Presentación de danza." },
```
(Al reemplazar un bloque de ejemplo, borra la línea `// EJEMPLO — reemplazar` que tiene encima.)

### 2. "Agrega al itinerario un bloque a las 11:00 p. m.: 'Cierre'"

Agrega una línea **dentro** de los corchetes de `itinerario`, en orden de hora, con una coma al final de la línea anterior:
```js
    { hora: "10:00 p. m.", titulo: "Brindis y celebración", descripcion: "Música y cierre de la noche." },
    { hora: "11:00 p. m.", titulo: "Cierre", descripcion: "Gracias por acompañarnos." }
  ],
```

### 3. "Quita el bloque de 'Palabras de apertura'"

Borra la línea completa (y su comentario `// EJEMPLO` si lo tiene):
```js
    { hora: "7:30 p. m.", titulo: "Palabras de apertura", descripcion: "Mensaje de la gerencia." },
```

### 4. "El evento ahora empieza a las 7:30 p. m."

```js
  fechaEvento: "2026-12-09T19:30:00-05:00",
```
La cuenta regresiva y la hora mostrada se actualizan solas. Revisa también que el itinerario sea coherente.

### 5. "Amplía el plazo de confirmación hasta el lunes 7 de diciembre"

En `js/config.js`:
```js
  fechaLimiteFormulario: "2026-12-07T23:59:59-05:00",
```
**Y también** en `apps-script/Code.gs`. Después hay que volver a implementar el script (ver README, "Actualizar el script"):
```js
var FECHA_LIMITE = new Date('2026-12-07T23:59:59-05:00');
```

### 6. "Cambia el título de la portada a 'Gala de Reconocimiento'"

```js
  titulo: "Gala de Reconocimiento",
```
Opcional: cambia también el mismo texto dentro de `<h1 … data-cfg="titulo">` en `index.html` (es el texto de respaldo cuando JavaScript está desactivado).

### 7. "Conecta el formulario con la hoja de Google"

Pega la URL de la aplicación web de Apps Script (termina en `/exec`):
```js
  APPS_SCRIPT_URL: "https://script.google.com/macros/s/XXXXXXXX/exec"
```
Mientras esté vacío (`""`), el formulario funciona en **modo demo**: simula el envío y no guarda nada.

### 8. "Cambia el mensaje del día del evento"

```js
  mensajeDiaEvento: {
    titulo: "¡Hoy celebramos juntos!",
    texto: "Gracias por tantos años de compromiso con Metso."
  },
```

### 9. Pedidos sobre "¿Cómo llegar?" o "Código de vestimenta"

Solo si el pedido lo dice de forma explícita (por ejemplo: "cambia el código de vestimenta a 'Formal'"). Se editan en `index.html`, dentro de las secciones marcadas con el comentario `TEXTO FIJO`:
```html
    <p class="dress">Elegante formal</p>
```
```html
        <p>Salida a las <strong>17:00 h</strong> desde Cronos, El Polo.</p>
```

## Cómo verificar después de editar

1. Abre una terminal en la carpeta del proyecto y ejecuta `python -m http.server 8080`. Luego abre `http://localhost:8080`.
2. Comprueba que se ven la cuenta regresiva, la fecha y el itinerario. Si desaparecieron, hay un error de sintaxis en `config.js`: revisa las comillas y las comas, y mira la consola del navegador (tecla F12).
3. Revisa la página en el celular o con el modo responsive del navegador (360 px de ancho). No debe haber scroll horizontal.
4. Sube los cambios a GitHub (ver README). La página publicada se actualiza en 1 o 2 minutos.
