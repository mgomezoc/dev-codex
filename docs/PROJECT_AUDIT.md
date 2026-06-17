# Auditoria del Proyecto

## Resumen Ejecutivo

El proyecto es una presentacion web estatica generada desde Markdown. La base es simple y mantenible: pocas dependencias, build rapido, contenido separado por slide y assets locales. La verificacion automatica disponible pasa: `npm.cmd run build` genera 33 slides y `npm.cmd audit --audit-level=moderate` reporta 0 vulnerabilidades.

Los riesgos principales no son de dependencias, sino de estado operativo y comportamiento frontend: el working tree tiene cambios pendientes, los botones pueden tener listeners duplicados, el robot no necesariamente esta conectado al cambio de slide por el uso de `window.robotAssistant`, y el typewriter puede romper titulos largos.

## Verificacion Ejecutada

```powershell
npm.cmd audit --audit-level=moderate
```

Resultado: 0 vulnerabilidades.

```powershell
npm.cmd run build
```

Resultado: build exitoso, 33 slides, `index.html` generado.

Nota: `npm` muestra warnings por configuracion de usuario `python` y `python2`; no vienen del proyecto.

## Hallazgos

### Criticos

No se encontraron vulnerabilidades criticas en dependencias ni fallas de build.

### Altos

1. **Botones con listeners duplicados**

   Archivos:
   - `assets/js/renderer.js:82`
   - `assets/js/renderer.js:86`
   - `assets/js/keyboard.js:73`
   - `assets/js/keyboard.js:81`

   Impacto: un click en siguiente/anterior puede ejecutar dos handlers y avanzar o retroceder dos slides. Esto degrada la experiencia durante una presentacion.

   Recomendacion: dejar los listeners de botones en un solo archivo. Lo mas limpio es que `renderer.js` solo inicialice el renderer y que `keyboard.js` conecte entradas de usuario, o crear un `controls.js`.

2. **El robot puede no recibir cambios de slide**

   Archivos:
   - `assets/js/renderer.js:42`
   - `assets/js/robot.js:3`
   - `assets/js/robot.js:154`

   Impacto: `renderer.js` llama `window.robotAssistant.onSlideChange(...)`, pero `robot.js` declara `const robotAssistant`. En scripts clasicos, una declaracion `const` de nivel superior no se expone automaticamente como propiedad de `window`. Esto explica que el robot exista, pero no muestre mensaje al cambiar de slide.

   Recomendacion: al final de `robot.js`, antes de inicializar, asignar explicitamente `window.robotAssistant = robotAssistant;` o cambiar el modulo para que el renderer reciba una referencia por evento custom.

3. **Working tree con cambios pendientes y artefactos sueltos**

   Archivos detectados:
   - Cambios en `assets/css/enhancements.css`, `assets/js/animations.js`, `assets/js/keyboard.js`, `assets/js/robot.js`, `slides/32-cierre.md`, `slides/33-preguntas.md`, `template.html`.
   - Untracked: `assets/img/robot-completo.png`, `docs/claude.txt`, `screenshot-*.png`, `test-buttons.js`.

   Impacto: es dificil saber que esta listo, que es prueba local y que debe entrar a versionamiento. Tambien aumenta el riesgo de perder trabajo o mezclar cambios no relacionados.

   Recomendacion: separar en commits pequenos: primero estabilizar robot/typewriter, luego mover o eliminar pruebas sueltas, y mantener screenshots fuera de git salvo que sean evidencia intencional.

### Medios

4. **Markdown renderiza HTML crudo**

   Archivo: `build.js:19`

   Impacto: `marked(content)` permite HTML dentro de `slides/*.md`. Si el contenido se mantiene confiable, el riesgo es bajo. Si se pega contenido externo o colaboran terceros, puede introducir HTML/script no deseado en el build.

   Recomendacion: documentar que `slides/*.md` es fuente confiable o sanitizar HTML durante build. Si se necesita HTML custom para layout, usar una lista limitada de tags permitidos.

5. **Typewriter puede desbordar titulos largos**

   Archivo: `assets/css/enhancements.css:285`

   Impacto: `white-space: nowrap` evita saltos de linea. En titulos largos o pantallas angostas puede cortar texto o superponer UI.

   Recomendacion: limitar ancho con `max-width`, usar `ch`, `text-wrap: balance` cuando aplique, o aplicar typewriter solo a titulos cortos mediante clase.

6. **Assets de imagen grandes para despliegue web**

   Archivos:
   - `assets/img/background.png` pesa aproximadamente 6.18 MB.
   - `assets/img/robot-completo.png` pesa aproximadamente 4.25 MB.
   - `assets/img/robot.png` pesa aproximadamente 2.26 MB.

   Impacto: para uso local en presentacion no bloquea. Para publicar en web, afecta LCP y tiempo de carga.

   Recomendacion: generar versiones WebP/AVIF y conservar PNG solo si se necesita transparencia o maxima calidad.

7. **CSP estricta no es viable con el build actual**

   Archivos:
   - `template.html:7`
   - `template.html:36`
   - `build.js:49`
   - `build.js:61`

   Impacto: el build inyecta CSS y JS inline. Esto simplifica el uso offline, pero dificulta una politica CSP fuerte sin hashes/nonces.

   Recomendacion: mantener este modo para uso offline. Si se publica, considerar modo alterno que emita `dist/index.html`, `dist/app.css` y `dist/app.js`.

### Bajos

8. **Prueba suelta no integrada**

   Archivo: `test-buttons.js`

   Impacto: requiere `puppeteer`, pero `puppeteer` no esta en `package.json`. Tambien consulta `[data-slide-number]`, mientras los slides usan `data-slide`. La prueba no es reproducible como parte del proyecto.

   Recomendacion: convertirla en una prueba formal con dependencia declarada o eliminarla si fue diagnostico temporal.

9. **Documentacion historica desactualizada**

   Archivos:
   - `README.md`
   - `docs/superpowers/specs/2026-06-16-presentation-architecture-design.md`
   - `docs/superpowers/plans/2026-06-16-presentation-implementation.md`

   Impacto: la documentacion inicial no refleja completamente `enhancements.css`, `robot.js`, `robot-completo.png` y los cambios visuales recientes.

   Recomendacion: actualizar README cuando se estabilice el robot/typewriter.

## Recomendaciones Prioritarias

1. Corregir la conexion del robot con `window.robotAssistant` y verificar mensajes al cambiar slide.
2. Eliminar la duplicacion de listeners de botones.
3. Decidir que cambios pendientes entran a commit y que artefactos quedan ignorados.
4. Ajustar typewriter para titulos largos y pantallas pequenas.
5. Formalizar validacion visual: script reproducible o checklist manual en README.
6. Optimizar imagenes si la presentacion se publicara fuera de uso local.

## Baseline Profesional Agregado

- `AGENTS.md`: contrato operativo para Codex y otros agentes.
- `CLAUDE.md`: memoria equivalente para Claude Code.
- `.editorconfig`: formato consistente.
- `.gitattributes`: normalizacion de texto y binarios.
- `.gitignore`: reglas adicionales para artefactos visuales generados.
