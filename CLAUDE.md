# CLAUDE.md

## Como Trabajar en Este Proyecto

Primero analiza el repo, luego modifica. Esta es una presentacion estatica generada desde Markdown; el archivo `index.html` es salida de build y no debe editarse a mano.

## Contexto Rapido

- Contenido: `slides/*.md`
- Plantilla: `template.html`
- Build: `build.js`
- Estilos: `assets/css/`
- Interaccion: `assets/js/`
- Imagenes: `assets/img/`
- Salida generada: `index.html`

## Comandos de Validacion

En PowerShell:

```powershell
npm.cmd run build
npm.cmd audit --audit-level=moderate
```

Si necesitas navegador:

```powershell
python -m http.server 8000
```

Luego abrir `http://localhost:8000/index.html`.

## Reglas

- No tocar `index.html` directamente.
- No tocar `.claude/settings.local.json` salvo instruccion explicita del usuario.
- No revertir cambios pendientes del usuario.
- No mezclar refactors amplios con cambios visuales puntuales.
- No agregar dependencias si CSS/JS vanilla resuelve el problema razonablemente.
- Mantener las fuentes en UTF-8.
- Mantener textos visibles en espanol.
- Verificar build despues de cambios en slides, CSS, JS o template.
- Para issues visuales, validar slide por slide cuando sea posible.
- Al finalizar, resumir cambios y pruebas reales, no supuestas.

## Puntos de Atencion Actuales

- Botones de navegacion: revisar duplicacion de listeners entre `assets/js/renderer.js` y `assets/js/keyboard.js`.
- Robot: si no muestra mensajes al cambiar slide, revisar la exposicion global de `robotAssistant`.
- Typewriter: revisar overflow en titulos largos por `white-space: nowrap`.
- Seguridad: `marked` renderiza HTML crudo desde Markdown; tratar `slides/*.md` como fuente confiable.
