# Invitación digital · Ceremonia de Años de Servicio Metso 2026

Página web estática para invitar a la ceremonia. La confirmación de asistencia se hace en un formulario externo de la empresa; la página solo tiene el botón que lo abre (link en `formularioUrl` de `js/config.js`).

- **Para editar contenido** (itinerario, fechas, textos): lee [GUIA_EDICION.md](GUIA_EDICION.md).
- **Para trabajar con Claude Code**: el proyecto incluye [CLAUDE.md](CLAUDE.md).

Esta guía está pensada para alguien sin experiencia técnica. Sigue los pasos en orden.

---

## 0. Probar en tu computadora (opcional)

1. Instala [Python](https://www.python.org/downloads/) si no lo tienes.
2. Abre una terminal en la carpeta del proyecto y ejecuta:
   ```bash
   python -m http.server 8080
   ```
3. Abre `http://localhost:8080` en el navegador.

Mientras `formularioUrl` esté vacío en `js/config.js`, el botón "Confirmar asistencia" no se muestra.

---

## 1. Publicar en GitHub Pages

1. Crea una cuenta en [github.com](https://github.com) si no tienes, y **activa la verificación en dos pasos** (ver checklist de seguridad).
2. Pulsa **New repository**.
   - Nombre: por ejemplo `anios-servicio-2026`. Este nombre aparecerá en la URL.
   - Visibilidad: **Public** (GitHub Pages gratuito lo requiere).
   - No marques "Add a README".
   - Pulsa **Create repository**.
3. Sube los archivos de una de estas dos formas.
   - **Opción A, recomendada: [GitHub Desktop](https://desktop.github.com/).** Respeta el archivo `.gitignore`, así que no sube los originales pesados ni archivos sensibles. Usa *File → Add local repository*, elige la carpeta, haz *Publish repository* y desmarca "Keep this code private".
   - **Opción B: por la web** (*Add file → Upload files*). La web **no** respeta `.gitignore`. Sube **solo** esto:
     ```
     index.html  robots.txt  .gitignore  CLAUDE.md  GUIA_EDICION.md  README.md
     css/   js/   assets/img/   assets/icons/   assets/fonts/
     ```
     **No subas** el PDF del Key Visual, el HTML anterior, el SVG original del logo, las carpetas `assets/00-…` a `assets/10-…` ni ninguna exportación de respuestas.
4. En el repositorio ve a **Settings → Pages**.
   1. En *Build and deployment → Source*, elige **Deploy from a branch**.
   2. En *Branch*, elige **main** y la carpeta **/ (root)**, y pulsa **Save**.
   3. Espera 1 o 2 minutos y recarga. Aparecerá la URL final, del tipo `https://TU-USUARIO.github.io/anios-servicio-2026/`.
   4. Marca **Enforce HTTPS**. Si está gris, espera unos minutos y recarga.
5. **Vista previa al compartir el link.** En `index.html`, reemplaza la ruta relativa de `og:image` por la URL absoluta y vuelve a subir el archivo:
   ```html
   <meta property="og:image" content="https://TU-USUARIO.github.io/anios-servicio-2026/assets/img/og-image.jpg">
   ```
6. Abre la URL final en el celular y comprueba que el botón "Confirmar asistencia" abre el formulario.

---

## 2. Generar el código QR para el afiche de Outlook

Usa un generador **estático**: el QR contiene directamente tu URL, sin redirecciones de terceros que puedan caducar o rastrear.

- **Chrome o Edge (sin instalar nada):** abre la URL final y haz clic derecho en la página → **Crear código QR para esta página** (o el ícono de compartir en la barra de direcciones). Descarga el PNG.
- **Alternativa:** la app de QR dentro de Canva, si el afiche se diseña allí.

Prueba el QR con 2 o 3 celulares distintos antes de enviar el afiche. Incluye también el link en texto, debajo del QR.

---

## 3. Checklist de seguridad

- [ ] **Verificación en dos pasos (2FA)** activada en la cuenta de GitHub (*Settings → Password and authentication*).
- [ ] **Nunca** se suben al repositorio exportaciones del formulario (CSV/Excel), capturas de respuestas, claves ni tokens.
- [ ] `formularioUrl` es el link público del formulario, no el link de edición ni el de resultados.
- [ ] Antes de enviar el afiche, revisa que la página publicada no tenga datos personales.

**Si se sube algo sensible por error:**
1. Bórralo del repositorio. Ojo: **eliminar el archivo no lo borra del historial**. La forma más simple para alguien no técnico es **borrar el repositorio completo** (*Settings → Danger Zone → Delete this repository*) y crearlo de nuevo sin ese archivo. Si se necesita conservar el historial, usa [git filter-repo](https://github.com/newren/git-filter-repo) o BFG.
2. Si era una exportación de respuestas, avisa a los responsables de privacidad.
3. Si se expuso algo que da acceso (una contraseña o un token), **cámbialo de inmediato**.

---

## 4. Después del evento

1. Las respuestas viven en el formulario de la empresa: su manejo y borrado siguen las políticas de la empresa.
2. En GitHub: desactiva Pages (*Settings → Pages → Unpublish site*) y **archiva** el repositorio (*Settings → Archive this repository*) o bórralo.

---

## Imágenes pendientes de original en alta resolución

Las imágenes actuales vienen del Key Visual (PDF) y de los assets entregados. Se ven bien en celular, pero son de baja resolución para pantallas grandes. No se han ampliado artificialmente. Si consigues los originales, reemplaza el archivo en `assets/img/` con el **mismo nombre**, en versiones `.webp` y `.png`, sin metadatos EXIF:

| Archivo en `assets/img/` | Tamaño actual | Ideal |
|---|---|---|
| `crystal` (gema de la portada) | 340 × 375 px | ≥ 800 px de ancho, fondo transparente |
| `rock-bottom-left` (roca de la esquina final, del Key Visual) | 440 × 415 px | ≥ 1000 px, fondo transparente |
| `rock-side-280` / `rock-side-560` (roca lateral de Código de vestimenta) | 913 × 1644 px original ✅ | Ya está en buena resolución |
| `crystal-gold` (decoración de Itinerario) | 368 × 354 px | ≥ 600 px, fondo transparente |
| `gem-rock-a`, `gem-rock-b`, `crystal-cluster`, `rocks-cluster`, `gold-flecks` (decoraciones de sección) | 120–203 px | ≥ 400 px, fondo transparente |

Para convertir y comprimir sin instalar nada puedes usar [squoosh.app](https://squoosh.app), que funciona en tu navegador sin subir archivos. Exporta en WebP (calidad 80) y en PNG.

## Créditos técnicos

- Tipografías: Cormorant Garamond y Montserrat (SIL Open Font License; ver `assets/fonts/OFL-*.txt`).
- Logo: SVG oficial de Metso.
- Sin librerías externas ni CDNs.
