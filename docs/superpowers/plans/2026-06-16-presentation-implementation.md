# Presentation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build modular, keyboard-first interactive HTML presentation showcasing Codex and Claude use in daily development. Markdown-based content, compiled to single HTML file with GSAP animations.

**Architecture:** Content lives in Markdown files (`slides/*.md`), compiled by Node.js script (`build.js`) into single HTML file. Runtime uses vanilla JS for navigation + GSAP for animations. Dark theme, keyboard-primary controls.

**Tech Stack:** Node.js, marked (Markdown parser), GSAP, vanilla HTML5/CSS3/JS

---

## File Structure

**To Create:**
- `package.json` — Node.js dependencies, scripts
- `build.js` — Markdown compiler entry point
- `.gitignore` — Exclude generated files
- `assets/css/main.css` — Base styles + theme variables
- `assets/css/gsap-defaults.css` — GSAP animation helpers
- `assets/js/renderer.js` — Slide rendering logic
- `assets/js/keyboard.js` — Keyboard event handler
- `assets/js/animations.js` — GSAP timeline definitions
- `template.html` — Base HTML template (pre-build)
- `slides/01-portada.md` through `slides/33-preguntas.md` — Content (33 files)
- `README.md` — Build instructions

**Generated (not committed):**
- `index.html` — Output from build.js

---

## Task 1: Initialize Git and Project Structure

- [ ] **Step 1: Initialize git repo**

```bash
cd "C:\Users\zkar_\OneDrive\Documentos\Dev\One Card\dev-codex"
git init
```

Expected: `.git/` directory created.

- [ ] **Step 2: Create .gitignore**

```
node_modules/
index.html
.DS_Store
*.log
```

File: `.gitignore`

- [ ] **Step 3: Create folder structure**

```bash
mkdir -p assets/css assets/js slides docs/superpowers/specs docs/superpowers/plans
```

Expected: Directories created.

- [ ] **Step 4: Commit**

```bash
git add .gitignore
git commit -m "chore: initialize project structure"
```

---

## Task 2: Create package.json and install dependencies

- [ ] **Step 1: Create package.json**

File: `package.json`

```json
{
  "name": "codex-claude-presentation",
  "version": "1.0.0",
  "description": "Interactive presentation on using Codex and Claude in daily development",
  "main": "build.js",
  "scripts": {
    "build": "node build.js",
    "dev": "node build.js && echo 'Open index.html in browser'"
  },
  "keywords": ["presentation", "codex", "claude"],
  "author": "",
  "license": "MIT",
  "dependencies": {
    "marked": "^11.0.0",
    "gsap": "^3.12.2"
  }
}
```

- [ ] **Step 2: Install dependencies**

```bash
npm install
```

Expected: `node_modules/` created, `package-lock.json` generated.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add dependencies (marked, gsap)"
```

---

## Task 3: Create base HTML template

- [ ] **Step 1: Create template.html (pre-build blueprint)**

File: `template.html`

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>IA para programar en el día a día</title>
  <style>
    /* CSS will be injected here by build.js */
  </style>
</head>
<body>
  <div id="presentation">
    <!-- Slides will be injected here by build.js -->
  </div>
  
  <div id="controls" class="controls">
    <button id="prev-btn" class="nav-btn">← Anterior</button>
    <span id="slide-counter">0 / 0</span>
    <button id="next-btn" class="nav-btn">Siguiente →</button>
  </div>

  <div id="help-overlay" class="help-overlay hidden">
    <div class="help-content">
      <h2>Controles</h2>
      <ul>
        <li><strong>→ / ←</strong> Siguiente / Anterior</li>
        <li><strong>Espacio</strong> Siguiente</li>
        <li><strong>Home / End</strong> Primera / Última</li>
        <li><strong>Enter</strong> Fullscreen</li>
        <li><strong>?</strong> Mostrar esto</li>
      </ul>
      <p>(Click para cerrar)</p>
    </div>
  </div>

  <script>
    // JS will be injected here by build.js
  </script>
</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add template.html
git commit -m "chore: add HTML template"
```

---

## Task 4: Create main.css (dark theme + layout)

- [ ] **Step 1: Create assets/css/main.css**

File: `assets/css/main.css`

```css
:root {
  --bg: #0f172a;
  --panel: #111827;
  --panel-soft: #1f2937;
  --text: #f8fafc;
  --muted: #94a3b8;
  --accent: #38bdf8;
  --accent-2: #a78bfa;
  --success: #22c55e;
  --warning: #f59e0b;
  --danger: #ef4444;
  --transition: 0.3s ease;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  width: 100%;
  height: 100%;
}

body {
  background: var(--bg);
  color: var(--text);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  overflow: hidden;
}

#presentation {
  width: 100%;
  height: 100%;
  position: relative;
}

.slide {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  visibility: hidden;
  transition: opacity var(--transition);
}

.slide.active {
  opacity: 1;
  visibility: visible;
}

.slide-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem;
  text-align: center;
}

.slide h1 {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  color: var(--accent);
  font-weight: 700;
}

.slide h2 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: var(--text);
  font-weight: 600;
}

.slide h3 {
  font-size: 1.75rem;
  margin-bottom: 1rem;
  color: var(--text);
  font-weight: 600;
}

.slide p {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: var(--muted);
}

.slide ul, .slide ol {
  text-align: left;
  display: inline-block;
  margin: 1rem 0;
}

.slide li {
  font-size: 1.15rem;
  margin: 0.75rem 0;
  color: var(--text);
}

.slide code {
  background: var(--panel);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  color: var(--accent);
  font-family: 'Courier New', monospace;
}

.slide pre {
  background: var(--panel);
  padding: 1.5rem;
  border-radius: 0.5rem;
  text-align: left;
  margin: 1.5rem 0;
  overflow-x: auto;
}

.slide pre code {
  background: none;
  padding: 0;
  color: var(--text);
}

.controls {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 2rem;
  align-items: center;
  opacity: 0.5;
  transition: opacity var(--transition);
}

.controls:hover {
  opacity: 1;
}

.nav-btn {
  background: var(--accent);
  color: var(--bg);
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background var(--transition);
  font-weight: 600;
}

.nav-btn:hover {
  background: var(--accent-2);
}

#slide-counter {
  font-size: 0.95rem;
  color: var(--muted);
}

.help-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.help-overlay.hidden {
  display: none;
}

.help-content {
  background: var(--panel);
  padding: 2rem;
  border-radius: 1rem;
  max-width: 500px;
  border: 2px solid var(--accent);
}

.help-content h2 {
  margin-bottom: 1rem;
  text-align: left;
}

.help-content ul {
  text-align: left;
}

.help-content li {
  margin: 0.5rem 0;
}

@media (max-width: 1024px) {
  .slide-content {
    padding: 2rem;
  }
  
  .slide h1 {
    font-size: 2.5rem;
  }
  
  .slide h2 {
    font-size: 2rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .slide {
    transition: none;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add assets/css/main.css
git commit -m "chore: add main CSS with dark theme"
```

---

## Task 5: Create gsap-defaults.css (animation utilities)

- [ ] **Step 1: Create assets/css/gsap-defaults.css**

File: `assets/css/gsap-defaults.css`

```css
/* GSAP animation utility classes */

.fade-in {
  opacity: 0;
}

.fade-in.active {
  animation: fadeIn 0.3s ease forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.slide-up {
  transform: translateY(20px);
  opacity: 0;
}

.slide-up.active {
  animation: slideUp 0.3s ease forwards;
}

@keyframes slideUp {
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.stagger-item {
  opacity: 0;
  transform: translateY(10px);
}

.stagger-item.active {
  animation: staggerItem 0.3s ease forwards;
}

@keyframes staggerItem {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add assets/css/gsap-defaults.css
git commit -m "chore: add GSAP animation utilities"
```

---

## Task 6: Create renderer.js (slide rendering logic)

- [ ] **Step 1: Create assets/js/renderer.js**

File: `assets/js/renderer.js`

```javascript
class PresentationRenderer {
  constructor() {
    this.currentSlide = 0;
    this.totalSlides = 0;
    this.slides = [];
    this.init();
  }

  init() {
    this.slides = Array.from(document.querySelectorAll('.slide'));
    this.totalSlides = this.slides.length;
    
    if (this.totalSlides > 0) {
      this.showSlide(0);
    }
  }

  showSlide(index) {
    // Bounds check
    if (index < 0) {
      this.currentSlide = 0;
    } else if (index >= this.totalSlides) {
      this.currentSlide = this.totalSlides - 1;
    } else {
      this.currentSlide = index;
    }

    // Hide all slides
    this.slides.forEach(slide => {
      slide.classList.remove('active');
    });

    // Show current slide
    if (this.slides[this.currentSlide]) {
      this.slides[this.currentSlide].classList.add('active');
    }

    // Update counter
    this.updateCounter();
  }

  nextSlide() {
    this.showSlide(this.currentSlide + 1);
  }

  prevSlide() {
    this.showSlide(this.currentSlide - 1);
  }

  goToSlide(index) {
    this.showSlide(index);
  }

  updateCounter() {
    const counter = document.getElementById('slide-counter');
    if (counter) {
      counter.textContent = `${this.currentSlide + 1} / ${this.totalSlides}`;
    }
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {
        // Fallback: ignore browsers that don't support fullscreen
      });
    } else {
      document.exitFullscreen();
    }
  }
}

// Initialize renderer when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.renderer = new PresentationRenderer();
});
```

- [ ] **Step 2: Commit**

```bash
git add assets/js/renderer.js
git commit -m "feat: add slide renderer with navigation"
```

---

## Task 7: Create keyboard.js (keyboard navigation)

- [ ] **Step 1: Create assets/js/keyboard.js**

File: `assets/js/keyboard.js`

```javascript
class KeyboardController {
  constructor(renderer) {
    this.renderer = renderer;
    this.init();
  }

  init() {
    document.addEventListener('keydown', (e) => this.handleKeydown(e));
  }

  handleKeydown(event) {
    switch (event.key) {
      case 'ArrowRight':
      case ' ':
        event.preventDefault();
        this.renderer.nextSlide();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        this.renderer.prevSlide();
        break;
      case 'Home':
        event.preventDefault();
        this.renderer.goToSlide(0);
        break;
      case 'End':
        event.preventDefault();
        this.renderer.goToSlide(this.renderer.totalSlides - 1);
        break;
      case 'Enter':
        event.preventDefault();
        this.renderer.toggleFullscreen();
        break;
      case '?':
        event.preventDefault();
        this.toggleHelp();
        break;
    }
  }

  toggleHelp() {
    const overlay = document.getElementById('help-overlay');
    if (overlay) {
      overlay.classList.toggle('hidden');
    }
  }
}

// Initialize keyboard controller when renderer is ready
document.addEventListener('DOMContentLoaded', () => {
  if (window.renderer) {
    new KeyboardController(window.renderer);
  }
});

// Close help overlay on click
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('help-overlay');
  if (overlay) {
    overlay.addEventListener('click', () => {
      overlay.classList.add('hidden');
    });
  }
});
```

- [ ] **Step 2: Commit**

```bash
git add assets/js/keyboard.js
git commit -m "feat: add keyboard navigation controls"
```

---

## Task 8: Create animations.js (GSAP timeline definitions)

- [ ] **Step 1: Create assets/js/animations.js**

File: `assets/js/animations.js`

```javascript
class PresentationAnimations {
  constructor(renderer) {
    this.renderer = renderer;
    this.timeline = null;
  }

  initSlideAnimation(slideElement) {
    // Simple fade in for the slide
    gsap.set(slideElement, { opacity: 0, y: 20 });
    gsap.to(slideElement, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: 'power2.inOut'
    });

    // Stagger list items if present
    const listItems = slideElement.querySelectorAll('li, .stagger-item');
    if (listItems.length > 0) {
      gsap.set(listItems, { opacity: 0, x: -20 });
      gsap.to(listItems, {
        opacity: 1,
        x: 0,
        duration: 0.3,
        ease: 'power2.inOut',
        stagger: 0.05
      });
    }

    // Animate code blocks
    const codeBlocks = slideElement.querySelectorAll('pre');
    if (codeBlocks.length > 0) {
      gsap.set(codeBlocks, { opacity: 0, scale: 0.95 });
      gsap.to(codeBlocks, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: 'power2.inOut',
        stagger: 0.1
      });
    }
  }
}

// Initialize animations when renderer is ready
document.addEventListener('DOMContentLoaded', () => {
  if (window.renderer) {
    window.animations = new PresentationAnimations(window.renderer);
    
    // Animate current slide on load
    if (window.renderer.slides[window.renderer.currentSlide]) {
      window.animations.initSlideAnimation(window.renderer.slides[window.renderer.currentSlide]);
    }

    // Re-animate on slide change
    const observer = new MutationObserver(() => {
      const activeSlide = document.querySelector('.slide.active');
      if (activeSlide && window.animations) {
        window.animations.initSlideAnimation(activeSlide);
      }
    });

    observer.observe(document.getElementById('presentation'), {
      attributes: true,
      subtree: true,
      attributeFilter: ['class']
    });
  }
});
```

- [ ] **Step 2: Commit**

```bash
git add assets/js/animations.js
git commit -m "feat: add GSAP animations for slides and elements"
```

---

## Task 9: Create build.js (Markdown compiler)

- [ ] **Step 1: Create build.js**

File: `build.js`

```javascript
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

// Read template
const template = fs.readFileSync('template.html', 'utf-8');

// Read all slides
const slidesDir = 'slides';
const slideFiles = fs.readdirSync(slidesDir)
  .filter(f => f.endsWith('.md'))
  .sort();

console.log(`Found ${slideFiles.length} slides`);

// Parse and compile slides
const slides = slideFiles.map((file, index) => {
  const content = fs.readFileSync(path.join(slidesDir, file), 'utf-8');
  const html = marked(content);
  
  return `<section class="slide" data-slide="${index + 1}">
    <div class="slide-content">
      ${html}
    </div>
  </section>`;
});

// Read CSS files
const mainCss = fs.readFileSync('assets/css/main.css', 'utf-8');
const gsapCss = fs.readFileSync('assets/css/gsap-defaults.css', 'utf-8');
const allCss = mainCss + '\n' + gsapCss;

// Read JS files
const rendererJs = fs.readFileSync('assets/js/renderer.js', 'utf-8');
const keyboardJs = fs.readFileSync('assets/js/keyboard.js', 'utf-8');
const animationsJs = fs.readFileSync('assets/js/animations.js', 'utf-8');

// Include GSAP from node_modules
const gsapJs = fs.readFileSync('node_modules/gsap/dist/gsap.min.js', 'utf-8');

const allJs = gsapJs + '\n' + rendererJs + '\n' + keyboardJs + '\n' + animationsJs;

// Build final HTML
let html = template;

// Inject CSS
html = html.replace(
  '<!-- CSS will be injected here by build.js -->',
  `<style>\n${allCss}\n</style>`
);

// Inject slides
html = html.replace(
  '<!-- Slides will be injected here by build.js -->',
  slides.join('\n')
);

// Inject JS
html = html.replace(
  '// JS will be injected here by build.js',
  allJs
);

// Write output
fs.writeFileSync('index.html', html);
console.log('✓ Generated index.html');
console.log(`✓ Total file size: ${(html.length / 1024).toFixed(2)}KB`);
```

- [ ] **Step 2: Test build script**

```bash
npm run build
```

Expected: `index.html` generated (will have warnings about missing slides, which is OK for now).

- [ ] **Step 3: Commit**

```bash
git add build.js
git commit -m "feat: add Markdown-to-HTML build script"
```

---

## Task 10: Create README with build instructions

- [ ] **Step 1: Create README.md**

File: `README.md`

```markdown
# Codex + Claude Presentation

Interactive HTML presentation on using Codex and Claude in daily development.

## Build

```bash
npm install
npm run build
```

Output: `index.html` (open in browser)

## Edit

Each slide is a Markdown file in `slides/`:

```bash
# Edit slide 15
nano slides/15-claude-md.md

# Rebuild
npm run build

# Reload browser
```

## Controls

- **Right Arrow** / **Space** — Next slide
- **Left Arrow** — Previous slide
- **Home** / **End** — First / Last slide
- **Enter** — Fullscreen
- **?** — Help overlay

## Content

33 slides covering:
- AI basics (5 min)
- Core concepts (15 min)
- Practical workflow (20 min)
- Live demos (10-15 min)
- Q&A (5 min)

Total runtime: 45-60 minutes

## Structure

```
slides/
├── 01-portada.md
├── 02-qué-llevar.md
├── ... (through 33-preguntas.md)

assets/
├── css/
│   ├── main.css
│   └── gsap-defaults.css
├── js/
│   ├── renderer.js
│   ├── keyboard.js
│   └── animations.js
```

## Customization

- **Colors:** Edit CSS variables in `assets/css/main.css`
- **Animations:** Modify GSAP timelines in `assets/js/animations.js`
- **Layout:** Adjust CSS in `assets/css/main.css`

## Deployment

Copy `index.html` anywhere (no dependencies):

```bash
# GitHub Pages
cp index.html docs/index.html
git push

# Any static host
scp index.html user@host:/var/www/html/
```

## License

MIT
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: add build instructions and documentation"
```

---

## Task 11-43: Create Slide Content (33 Markdown files)

This is the main content task. Create all 33 slide Markdown files based on the specification document.

- [ ] **Step 1: Create slides/01-portada.md**

File: `slides/01-portada.md`

```markdown
# IA para programar en el día a día

Cómo uso Codex y Claude sin que hagan cosas locas

```bash
$ codex analyze project
$ claude debug issue
```

## Codex | Claude

> Codex + Claude + buenas prácticas + criterio técnico
```

- [ ] **Step 2: Create slides/02-qué-llevar.md**

File: `slides/02-qué-llevar.md`

```markdown
# Qué quiero que se lleven de esta plática

- Cómo usar IA sin depender ciegamente de ella
- Cómo darle buen contexto
- Cómo escribir mejores prompts
- Cómo configurar reglas por proyecto
- Cómo usarla para análisis, debugging y documentación
- Qué cosas evitar en el trabajo
```

- [ ] **Step 3: Create slides/03-ia-no-magia.md**

File: `slides/03-ia-no-magia.md`

```markdown
# La IA no es magia

- No reemplaza criterio
- No entiende tu negocio si no se lo explicas
- No siempre tiene razón
- No debería tocar todo sin límites

**La IA acelera el trabajo, pero no absorbe la responsabilidad.**
```

- [ ] **Step 4: Create slides/04-qué-son.md**

File: `slides/04-qué-son.md`

```markdown
# No son solo chats para pedir código

Codex y Claude Code pueden:

- Leer archivos del proyecto
- Entender estructura del repo
- Editar código
- Ejecutar comandos
- Revisar errores
- Generar documentación
- Trabajar con herramientas externas

**Antes:** copiar/pegar  
**Ahora:** lee repo → edita → ejecuta → valida
```

- [ ] **Step 5: Create slides/05-flujo-real.md**

File: `slides/05-flujo-real.md`

```markdown
# Cómo lo uso normalmente

1. Entender el proyecto
2. Documentar lo importante
3. Crear reglas
4. Planear cambios
5. Implementar por partes
6. Revisar diff
7. Probar
8. Documentar lo cambiado

**Primero analiza. Luego toca.**
```

- [ ] **Step 6: Create slides/06-antes-de-pedir.md**

File: `slides/06-antes-de-pedir.md`

```markdown
# Antes de soltarle una tarea a la IA

Revisar:

- Rama de Git limpia
- Proyecto en carpeta correcta
- Dependencias instaladas
- Comandos de build/test conocidos
- Reglas del proyecto disponibles
- Archivos sensibles protegidos

Trabajar siempre en rama separada. No en main.
```

- [ ] **Step 7: Create slides/07-contexto-combustible.md**

File: `slides/07-contexto-combustible.md`

```markdown
# La IA trabaja con contexto

Prompt + conversación + archivos + documentación + reglas + errores/logs = **contexto útil**

### Malo:
"Arregla este módulo"

### Mejor:
"Analiza módulo de usuarios (controlador, modelo, vistas, rutas).
No modifiques todavía. Primero dime cómo funciona y qué riesgos ves."
```

- [ ] **Step 8: Create slides/08-tokens.md**

File: `slides/08-tokens.md`

```markdown
# Tokens: la memoria que se va llenando

Todo consume tokens:

- Prompt
- Código
- Logs
- Respuestas anteriores
- Archivos leídos
- Instrucciones del proyecto

**Más contexto ≠ mejor resultado**

Contexto relevante sí ayuda. Contexto innecesario estorba y cuesta.
```

- [ ] **Step 9: Create slides/09-prompt-flojo.md**

File: `slides/09-prompt-flojo.md`

```markdown
# Prompt flojo = resultado flojo

\`\`\`
Haz un dashboard para ventas.
\`\`\`

Problemas:

- No dice de dónde salen los datos
- No dice diseño
- No dice validaciones
- No dice permisos
- No dice si puede modificar archivos
- No dice cómo probar

Si tú no defines el alcance, la IA lo define por ti.
```

- [ ] **Step 10: Create slides/10-prompt-util.md**

File: `slides/10-prompt-util.md`

```markdown
# Prompt útil = contexto + límites + resultado esperado

\`\`\`
Analiza el módulo de ventas.

Objetivo:
Crear un dashboard de resumen.

Antes de modificar:
1. Identifica archivos relacionados
2. Explica de dónde salen los datos
3. Propón diseño y métricas
4. Lista riesgos

Restricciones:
- No agregar librerías nuevas
- Usar Bootstrap 5.3
- No tocar BD todavía
- No modificar permisos

Resultado esperado:
Un plan de implementación por fases
\`\`\`
```

- [ ] **Step 11: Create slides/11-mi-formula.md**

File: `slides/11-mi-formula.md`

```markdown
# Mi fórmula para pedirle trabajo a la IA

1. **Rol** — qué tipo de ayuda necesito
2. **Contexto** — qué proyecto/módulo estamos viendo
3. **Objetivo** — qué quiero lograr
4. **Alcance** — qué sí puede tocar
5. **Restricciones** — qué no debe hacer
6. **Criterios de éxito** — cómo sé que terminó bien
7. **Formato de respuesta** — plan, tabla, checklist, diff, etc.

**Mientras más específica sea la tarea, menos espacio para inventar.**
```

- [ ] **Step 12: Create slides/12-prompt-maestro.md**

File: `slides/12-prompt-maestro.md`

```markdown
# Prompt maestro: primero entender, luego tocar

\`\`\`
Analiza este proyecto antes de modificar.

Quiero que identifiques:
- Qué hace el sistema
- Tecnologías usadas
- Estructura de carpetas
- Módulos principales
- Flujo de negocio
- Comandos: correr, probar, construir
- Riesgos técnicos
- Archivos que no deben tocarse

No hagas cambios. Primero entrega reporte y plan por fases.
\`\`\`

**Guarda este prompt. Úsalo siempre primero.**
```

- [ ] **Step 13: Create slides/13-reglas-permanentes.md**

File: `slides/13-reglas-permanentes.md`

```markdown
# No todo debe ir en el prompt

Usar archivos de reglas:

- \`AGENTS.md\` para Codex
- \`CLAUDE.md\` para Claude Code
- \`.claude/settings.json\` para permisos
- \`.claude/agents/\` para subagentes
- \`.claude/skills/\` para skills

Si repites algo en cada prompt, debería estar en un archivo.
```

- [ ] **Step 14: Create slides/14-agents-md.md**

File: `slides/14-agents-md.md`

```markdown
# AGENTS.md: instrucciones que Codex lee

\`\`\`markdown
# Reglas del proyecto

## Stack
- PHP 8.1
- CodeIgniter 4
- Bootstrap 5.3
- MySQL

## Comandos
- php spark serve
- php spark test
- composer test

## Reglas
- No tocar producción
- No agregar dependencias sin justificar
- Analizar archivos relacionados antes de modificar
- Ejecutar pruebas después de modificar
\`\`\`

**Práctico, no enorme.**
```

- [ ] **Step 15: Create slides/15-claude-md.md**

File: `slides/15-claude-md.md`

```markdown
# CLAUDE.md: memoria de proyecto para Claude

\`\`\`markdown
# CLAUDE.md

## Cómo trabajar en este proyecto

- Primero analiza, después modifica
- No tocar .env, credenciales, dumps
- Usar los patrones existentes
- Mantener nombres en español si el módulo está en español
- No dejar placeholders
- Al final, resumir archivos modificados y pruebas ejecutadas
\`\`\`

**Contexto estable. No una novela.**
```

- [ ] **Step 16: Create slides/16-permisos.md**

File: `slides/16-permisos.md`

```markdown
# Permisos: no todo debe estar abierto

Configurar límites:

- Qué puede leer
- Qué puede editar
- Qué comandos puede correr
- Qué archivos están prohibidos
- Cuándo debe pedir aprobación

\`\`\`json
{
  "permissions": {
    "deny": [
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./secrets/**)",
      "Read(./config/credentials.json)"
    ]
  }
}
\`\`\`
```

- [ ] **Step 17: Create slides/17-skills.md**

File: `slides/17-skills.md`

```markdown
# Skills: instrucciones reutilizables

Una skill sirve para guardar un flujo repetible:

- Revisar código
- Debuggear
- Generar documentación
- Preparar deploy
- Validar UI

\`\`\`
/review-pr
/debug
/run
/verify
\`\`\`

**Primero detecta tareas repetidas. Luego crea skills.**
```

- [ ] **Step 18: Create slides/18-agentes.md**

File: `slides/18-agentes.md`

```markdown
# Agentes: dividir el trabajo por rol

Un agente puede tener:

- Objetivo propio
- Reglas propias
- Herramientas permitidas
- Modelo específico
- Memoria o contexto especializado

**En vez de pedirle todo a una IA, divide el trabajo:**

Arquitecto → planea  
Desarrollador → implementa  
QA → prueba  
Auditor → revisa riesgos
```

- [ ] **Step 19: Create slides/19-subagente-ejemplo.md**

File: `slides/19-subagente-ejemplo.md`

```markdown
# Un subagente puede tener límites

\`\`\`markdown
---
name: safe-researcher
description: Analiza sin modificar
tools: Read, Grep, Glob, Bash
---

Tu trabajo es investigar, encontrar archivos,
explicar riesgos y proponer plan.
No edites archivos.
\`\`\`

**Auditoría:** read-only  
**Implementación:** permisos controlados  
**QA:** permisos para tests  
**Documentación:** solo docs
```

- [ ] **Step 20: Create slides/20-modelo-correcto.md**

File: `slides/20-modelo-correcto.md`

```markdown
# No siempre necesitas el modelo más pesado

| Tarea | Modelo |
|---|---|
| Auditoría compleja | Opus / fuerte |
| Arquitectura | Opus / fuerte |
| Debug difícil | Opus + razonamiento alto |
| Código repetitivo | Sonnet / medio |
| Búsqueda rápida | Haiku / ligero |
| Documentación | Sonnet |
| Revisión sencilla | Sonnet |

**Más incertidumbre → modelo más fuerte**
```

- [ ] **Step 21: Create slides/21-debugging.md**

File: `slides/21-debugging.md`

```markdown
# Debugging: no le pidas "arréglalo" de golpe

Error → Hipótesis → Validación → Cambio mínimo → Prueba → Resumen

\`\`\`
Analiza este error. No modifiques.

Dame:
1. Posibles causas (ordenadas)
2. Archivos que revisarías
3. Comandos para validar
4. Cambio mínimo recomendado
\`\`\`

Después:

\`\`\`
Implementa la solución más probable.
No hagas refactor general.
Ejecuta prueba y resume diff.
\`\`\`
```

- [ ] **Step 22: Create slides/22-herramientas.md**

File: `slides/22-herramientas.md`

```markdown
# Ya no solo responden: también operan

Pueden usar herramientas como:

- Lectura de archivos
- Búsqueda en el repo
- Edición de archivos
- Terminal/Bash/PowerShell
- Git
- MCP
- Navegador o herramientas externas
- Skills y comandos

IA → Repo → Terminal → Git → Browser → Docs → Tickets
```

- [ ] **Step 23: Create slides/23-git-cinturon.md**

File: `slides/23-git-cinturon.md`

```markdown
# Git es el cinturón de seguridad

Buenas prácticas:

- Rama nueva por tarea
- Commits pequeños
- Revisar diff
- No mezclar cambios
- Probar antes de merge
- Documentar decisiones

Si no puedes revisar el diff, no deberías aceptar el cambio.

Prompt útil:

\`\`\`
Revisa el diff actual.
Archivo por archivo: qué cambió, por qué, riesgo, cómo probar.
\`\`\`
```

- [ ] **Step 24: Create slides/24-seguridad.md**

File: `slides/24-seguridad.md`

```markdown
# Qué no debemos compartir ni permitir

No compartir:

- Contraseñas
- Tokens
- Llaves privadas
- .env
- Datos personales innecesarios
- Dumps completos sin anonimizar
- Acceso directo a producción

**Bloquear archivos sensibles. Revisar permisos. Separar ambientes.**
```

- [ ] **Step 25: Create slides/25-errores-comunes.md**

File: `slides/25-errores-comunes.md`

```markdown
# Errores que sí pasan

- Pedir cambios demasiado grandes
- No darle contexto
- No revisar el diff
- Aceptar código que no entiendes
- No correr pruebas
- Dejar placeholders
- Permitir que toque archivos sensibles
- Creer que "compila" significa "está bien"

**La IA puede producir errores más rápido que un humano.**
```

- [ ] **Step 26: Create slides/26-buenas-practicas.md**

File: `slides/26-buenas-practicas.md`

```markdown
# Lo que sí recomiendo hacer

- Primero análisis, luego cambios
- Cambios pequeños
- Reglas en Markdown
- Prompts claros
- Tests o validación manual
- Revisión de diff
- Seguridad por defecto
- Documentar aprendizajes

**Plan → Cambio → Prueba → Revisión**
```

- [ ] **Step 27: Create slides/27-demo-1.md**

File: `slides/27-demo-1.md`

```markdown
# Demo 1: crear AGENTS.md / CLAUDE.md

Objetivo de la demo:

- Tomar un proyecto real
- Pedirle a la IA que lo analice
- Generar reglas iniciales
- Revisarlas antes de usarlas

**Esta demo es segura. No depende de que compile algo en vivo.**
```

- [ ] **Step 28: Create slides/28-demo-2.md**

File: `slides/28-demo-2.md`

```markdown
# Demo 2: auditoría rápida de un repo

Pedirle a la IA:

- Qué hace el sistema
- Cómo está organizado
- Riesgos
- Deuda técnica
- Plan de mejora

**No modifica archivos. Es segura.**
```

- [ ] **Step 29: Create slides/29-demo-alternativa.md**

File: `slides/29-demo-alternativa.md`

```markdown
# Demo alternativa: debug sin modificar de golpe

Usar cuando haya un error real disponible.

Error → diagnóstico → hipótesis → cambio mínimo → prueba

**Plan B si falla:** mostrar salida preparada. Explicar el método.
```

- [ ] **Step 30: Create slides/30-flujo-trabajo.md**

File: `slides/30-flujo-trabajo.md`

```markdown
# La IA no reemplaza el proceso: lo refuerza

**Antes:**
Desarrollador → Código → Revisión

**Ahora:**
Desarrollador + IA (analizar) + IA (proponer) + IA (probar) + humano (decidir)

**La IA sirve como copiloto, no conductor.**
```

- [ ] **Step 31: Create slides/31-primeros-pasos.md**

File: `slides/31-primeros-pasos.md`

```markdown
# Primeros pasos recomendados

1. Crear \`AGENTS.md\` o \`CLAUDE.md\` en un proyecto
2. Pedir una auditoría sin modificar archivos
3. Guardar prompts útiles
4. Usar ramas separadas
5. Revisar cada diff
6. Bloquear archivos sensibles
7. Convertir tareas repetidas en skills

**Empieza con un proyecto no crítico.**
```

- [ ] **Step 32: Create slides/32-cierre.md**

File: `slides/32-cierre.md`

```markdown
# Idea final

**La IA no debe tener el volante completo.**  
**Debe ser copiloto, no conductor.**

Un buen desarrollador con IA puede producir más y mejor.  
Pero si se usa sin criterio, también genera problemas más rápido.

**Se trata de aprender a dirigirla.**
```

- [ ] **Step 33: Create slides/33-preguntas.md**

File: `slides/33-preguntas.md`

```markdown
# Preguntas / comentarios

¿Qué parte de su flujo diario creen que podría mejorar más con IA?

- ¿Auditorías?
- ¿Debugging?
- ¿Documentación?
- ¿Migraciones?
- ¿Revisión de código?
```

- [ ] **Step 34: Rebuild to include all slides**

```bash
npm run build
```

Expected: `index.html` generated with all 33 slides.

- [ ] **Step 35: Commit all slides**

```bash
git add slides/
git commit -m "content: add all 33 presentation slides"
```

---

## Task 44: Test presentation in browser

- [ ] **Step 1: Open index.html**

Open `index.html` in a web browser (Chrome, Firefox, Safari).

Expected: 
- Slide 1 displays (title slide)
- "1 / 33" counter shows at bottom
- Navigation buttons visible

- [ ] **Step 2: Test keyboard navigation**

Press Right Arrow.

Expected: 
- Slide 2 displays with fade transition
- Counter updates to "2 / 33"

Press Left Arrow.

Expected: 
- Back to Slide 1

Press Home.

Expected: 
- Stays on Slide 1

Press End.

Expected: 
- Jumps to Slide 33

- [ ] **Step 3: Test scroll navigation**

Scroll mouse wheel down.

Expected: 
- Advances one slide per scroll event

- [ ] **Step 4: Test fullscreen**

Press Enter.

Expected: 
- Browser enters fullscreen mode

Press Escape.

Expected: 
- Exits fullscreen

- [ ] **Step 5: Test help overlay**

Press ?.

Expected: 
- Help overlay appears with keyboard shortcuts

Click anywhere on overlay.

Expected: 
- Overlay closes

- [ ] **Step 6: Verify animations**

Navigate between slides.

Expected: 
- Slide fade-in/out smooth (300ms)
- No jank or stuttering
- List items stagger if present

- [ ] **Step 7: Check styling**

Expected: 
- Dark background (#0f172a)
- Text readable
- Cyan accents visible
- Code blocks have darker background
- No layout issues on 1024px+ width

- [ ] **Step 8: Spot-check content**

Verify 5 random slides have correct Markdown content.

Expected: 
- All content renders properly
- Headers, lists, code blocks formatted correctly

---

## Task 45: Final validation and cleanup

- [ ] **Step 1: Verify index.html is in .gitignore**

Check `.gitignore` contains `index.html`.

Expected: Yes.

- [ ] **Step 2: Final build**

```bash
npm run build
```

Expected: 
- No errors
- `index.html` < 2MB
- All 33 slides present

- [ ] **Step 3: Commit final state**

```bash
git status
```

Expected: 
- Only `index.html` is untracked (ignored by gitignore)
- All other files committed

If not clean, add and commit any outstanding changes.

- [ ] **Step 4: Log git history**

```bash
git log --oneline
```

Expected: 
- Clear commit messages
- ~15-20 commits total
- Logical progression (setup → assets → build → content → testing)

- [ ] **Step 5: Verify project structure**

Expected tree:

```
dev-codex/
├── .git/
├── .gitignore
├── package.json
├── package-lock.json
├── build.js
├── template.html
├── README.md
├── index.html (generated, not in git)
├── assets/
│   ├── css/
│   │   ├── main.css
│   │   └── gsap-defaults.css
│   └── js/
│       ├── renderer.js
│       ├── keyboard.js
│       └── animations.js
├── slides/
│   ├── 01-portada.md
│   ├── ... (through 33-preguntas.md)
└── docs/
    └── superpowers/
        ├── specs/
        │   └── 2026-06-16-presentation-architecture-design.md
        └── plans/
            └── 2026-06-16-presentation-implementation.md
```

- [ ] **Step 6: Create quick-start guide**

Run from project root:

```bash
npm install && npm run build && open index.html
```

Expected: Everything works end-to-end.

- [ ] **Step 7: Final commit**

```bash
git add .
git commit -m "chore: finalize presentation project"
```

---

## Summary

All 33 slides compiled into single interactive HTML. Keyboard-first navigation working. GSAP animations smooth. Dark theme applied. Build process verified. Git history clean.

Ready to present.
