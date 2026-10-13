# CLAUDE.md — Invitación "Ceremonia de Años de Servicio Metso 2026"

Página estática (sin build, sin dependencias) publicada en GitHub Pages. Mobile-first, solo español.

## Mapa del proyecto: qué archivo tocar

| Quiero cambiar… | Archivo |
|---|---|
| Fecha/hora del evento, fecha límite del formulario | `js/config.js` (`fechaEvento`, `fechaLimiteFormulario`) **y** `apps-script/Code.gs` (`FECHA_LIMITE`) |
| Título, subtítulo, mensaje del día del evento | `js/config.js` (`titulo`, `subtitulo`, `mensajeDiaEvento`) |
| Lugar, dirección, link de Google Maps | `js/config.js` (`lugar`) |
| Itinerario | `js/config.js` (`itinerario`) |
| URL del backend | `js/config.js` (`APPS_SCRIPT_URL`; vacío = modo demo) |
| "¿Cómo llegar?" / "Código de vestimenta" | `index.html` — **solo con pedido explícito** |
| Textos fijos de la portada (intro, botón), pie | `index.html` |
| Colores, tipografía, espaciados, animaciones | `css/styles.css` (variables en `:root`) |
| Lógica: cuenta regresiva, formulario, itinerario | `js/main.js` |
| Validación y guardado en la hoja | `apps-script/Code.gs` |
| Íconos | `<svg class="sprite">` al inicio de `index.html` (símbolos `#i-*`) |
| Imágenes | `assets/img/` (WebP + PNG de respaldo). Los originales en `assets/0*-*/` y `assets/10-*/` no se publican |
| Decoraciones | Portada: gema `.fx-crystal` + roca `.fx-cover-rock` con destellos `.glint`. Cada sección: una `<picture class="deco deco-l|deco-r">` (alternando lados). Código de vestimenta: roca lateral `.side-rock` (`rock-side-*`) pegada al borde izquierdo; en móvil la sección usa `.section-side` para reservarle espacio. Pie: roca + curva del Key Visual en la esquina inferior izquierda. Fondo: brillo sedoso en `body::before`. **Las decoraciones nunca deben verse recortadas ni tapar texto** |
| Fuentes | `assets/fonts/` (Cormorant Garamond + Montserrat, OFL, autoalojadas) |

`index.html` trae los textos por defecto; `main.js` los sobrescribe desde `config.js` (los elementos con `data-cfg` / `data-fmt`). Si cambias un valor en `config.js`, actualiza también el texto estático equivalente de `index.html` para que coincidan sin JS y en la vista previa.

## Reglas que no se pueden romper

1. **No modificar "¿Cómo llegar?" ni "Código de vestimenta"** sin pedido explícito, y no moverlos a `config.js`.
2. **Nunca `innerHTML` (ni `outerHTML`, `insertAdjacentHTML`, `document.write`) con datos.** Usar `textContent` o `createElement`. Nunca mostrar en la página lo que escribe un usuario.
3. **Sin CDNs ni recursos externos.** Todo se sirve desde el repo. Si una librería fuera imprescindible: descargarla con versión fijada dentro del repo.
4. **Sin JS ni CSS inline** (`<script>…</script>`, `onclick=`, `style=`): la CSP lo bloquea. Todo va en `js/*.js` y `css/styles.css`.
5. **No relajar la CSP** del `<meta http-equiv="Content-Security-Policy">`. `connect-src` solo admite `script.google.com` y `script.googleusercontent.com`.
6. **No subir datos de invitados**: ni CSV, ni XLSX, ni exportaciones, ni capturas con respuestas. Ver `.gitignore`.
7. **Respetar el Key Visual**: fondo negro, oro/bronce/champán, Cormorant Garamond itálica para títulos, Montserrat para texto, rocas y gemas doradas, separadores finos con rombo. No inventar colores ni tipografías nuevas.
8. Las reglas de validación del formulario existen **dos veces** (`js/main.js` y `apps-script/Code.gs`). Si cambian, cambiarlas en ambos.
9. Imágenes nuevas: sin EXIF, en WebP + PNG/JPG, en `assets/img/`, con `alt=""` si son decorativas y `alt` descriptivo si informan.
10. No hacer `git push` ni crear repositorios remotos sin permiso.

## Cómo probar después de cada cambio

1. Servir localmente (la CSP y las rutas no funcionan bien con `file://`):
   ```bash
   python -m http.server 8080 --bind 127.0.0.1
   ```
   y abrir `http://localhost:8080`.
2. Revisar en anchos **360, 390, 768 y 1280 px**: sin scroll horizontal (`document.documentElement.scrollWidth <= innerWidth`).
3. Consola del navegador: **sin errores ni violaciones de CSP**. En modo demo solo debe aparecer el aviso `MODO DEMO`.
4. Formulario en modo demo (`APPS_SCRIPT_URL: ""`):
   - "No" a asistencia → se ocultan vehículo y alergias, envío exitoso.
   - "Sí" + alergia "Sí" → aparece "¿A qué alimentos?" y es obligatorio.
   - Enviar vacío → errores en nombre, asistencia y aceptación.
   - Nombre de 200 caracteres, con `<script>` o que empieza con `=` → error de nombre.
5. Estados de fecha: cambiar temporalmente `fechaEvento` / `fechaLimiteFormulario` a una fecha pasada → debe verse "¡Llegó el gran día!" y "El plazo de confirmación cerró…". **Restaurar después.**
6. Si se tocó `Code.gs`: probar con la función `probar()` en el editor de Apps Script y borrar la fila de prueba.
7. Con "Reducir movimiento" activado en el sistema, no debe haber animaciones.
