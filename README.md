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
