# AGENTS.md

## Objetivo del Proyecto

Este repositorio contiene una presentacion web interactiva sobre el uso de Codex y Claude en desarrollo diario. El contenido vive en Markdown y se compila a un `index.html` estatico con estilos, animaciones GSAP y JavaScript vanilla.

## Stack

- Node.js
- `marked` para convertir Markdown a HTML
- GSAP para animaciones
- HTML/CSS/JavaScript vanilla
- Assets locales en `assets/`

## Estructura Importante

- `slides/*.md`: fuente editable de cada slide.
- `template.html`: plantilla base del HTML generado.
- `build.js`: compila slides, CSS y JS en `index.html`.
- `assets/css/main.css`: layout base, tema, controles y robot.
- `assets/css/enhancements.css`: efectos visuales, typewriter y animaciones extra.
- `assets/css/gsap-defaults.css`: utilidades CSS de animacion.
- `assets/js/renderer.js`: estado de slides, contador y navegacion.
- `assets/js/keyboard.js`: atajos de teclado y controles.
- `assets/js/animations.js`: animaciones GSAP por slide.
- `assets/js/robot.js`: asistente visual fijo y mensajes por slide.
- `assets/img/`: imagenes usadas por la presentacion.
- `index.html`: archivo generado. No editar directamente.

## Comandos

En PowerShell de Windows usa `npm.cmd` para evitar bloqueos de `npm.ps1` por execution policy:

```powershell
npm.cmd install
npm.cmd run build
npm.cmd audit --audit-level=moderate
```

En otros shells:

```bash
npm install
npm run build
npm audit --audit-level=moderate
```

Para servir localmente si se necesita validar en navegador:

```powershell
python -m http.server 8000
```

Abrir: `http://localhost:8000/index.html`

## Reglas de Trabajo

- Antes de modificar, ejecutar `git status --short --branch` y distinguir cambios propios de cambios existentes.
- No revertir cambios del usuario sin instruccion explicita.
- No editar `index.html`; editar las fuentes y correr build.
- Para cambios de contenido, editar solo `slides/*.md` salvo que el layout lo requiera.
- Para cambios visuales, preferir CSS existente antes de agregar dependencias.
- Para cambios de navegacion o animacion, revisar `renderer.js`, `keyboard.js`, `animations.js` y `robot.js` juntos.
- Ejecutar `npm.cmd run build` despues de cambios que afecten slides, CSS, JS o template.
- Ejecutar `npm.cmd audit --audit-level=moderate` si se tocan dependencias.
- No agregar librerias nuevas sin justificar el beneficio y el costo de mantenimiento.
- Mantener el proyecto usable offline; evitar CDNs para recursos criticos.
- Mantener textos de la presentacion en espanol.

## Archivos Generados o Locales

- `index.html` se genera y esta ignorado por git.
- `node_modules/` no se versiona.
- `screenshot-*.png` son artefactos de validacion visual y no deben ensuciar commits.
- `.claude/settings.local.json` es configuracion local de permisos; no debe tratarse como politica del equipo.

## Riesgos Conocidos a Revisar Antes de Continuar

- `renderer.js` y `keyboard.js` tienen listeners de click para los mismos botones. Validar que los botones no avancen dos slides por click.
- `renderer.js` llama `window.robotAssistant`, pero `robot.js` declara `const robotAssistant`; en scripts clasicos `const` no se expone automaticamente en `window`. Si los mensajes por cambio de slide no aparecen, exponer explicitamente `window.robotAssistant = robotAssistant`.
- El typewriter usa `white-space: nowrap`; titulos largos pueden desbordarse en pantallas pequenas.
- `marked(content)` permite HTML crudo desde los Markdown. Esta bien solo si `slides/*.md` es contenido confiable.

## Criterios de Salida

Al terminar una tarea, reportar:

- Archivos modificados.
- Comandos ejecutados y resultado.
- Riesgos pendientes.
- Si se valido visualmente en navegador o solo por build.
