# Presentation Architecture Design
**Date:** 2026-06-16  
**Project:** Codex + Claude Work Presentation  
**Audience:** Developers, technical teams  
**Duration:** 45-60 minutes (33 slides)

---

## Overview

Interactive HTML presentation showcasing practical use of Codex and Claude in daily development. Built with modular Markdown content, compiled to a single HTML file with GSAP animations, keyboard-first navigation, and dark theme design.

---

## Architecture

### Directory Structure
```
dev-codex/
├─ slides/                         # Markdown slide content (1 file per slide)
│  ├─ 01-portada.md               # Slide 1: Cover
│  ├─ 02-qué-llevar.md            # Slide 2: Takeaways
│  ├─ 03-ia-no-magia.md           # Slide 3: AI isn't magic
│  └─ ... (through 33-preguntas.md)
├─ assets/
│  ├─ css/
│  │  ├─ main.css                 # Base styles + dark theme variables
│  │  └─ gsap-defaults.css        # GSAP animation utilities
│  └─ js/
│     ├─ renderer.js              # Slide rendering logic
│     ├─ keyboard.js              # Keyboard navigation handler
│     └─ animations.js            # GSAP timeline definitions
├─ build.js                        # Markdown-to-HTML compiler
├─ package.json                    # Node.js dependencies (marked, gsap)
├─ index.html                      # Generated output (do not edit)
├─ .gitignore                      # Excludes index.html, node_modules
└─ README.md                       # Build instructions
```

### Tech Stack

**Build-time:**
- Node.js 18+
- `marked` (Markdown parser)
- No bundler needed (simple concatenation)

**Runtime:**
- Vanilla HTML5 + CSS3
- GSAP (animations)
- Vanilla JavaScript (no framework)
- Single-file output (all CSS/JS inlined)

**Styling:**
- CSS custom properties (variables)
- Dark theme (per spec): `--bg: #0f172a`, `--accent: #38bdf8`, etc.
- Responsive baseline (120% zoom-safe)
- No external font CDNs (system fonts + optional local)

---

## Build Process

### Compilation Flow

1. **Read phase:** `build.js` scans `slides/` directory in alphabetical order
2. **Parse phase:** Each `.md` file parsed with `marked`
3. **Inject phase:** HTML output wrapped in shared template with CSS/JS
4. **Write phase:** Single `index.html` generated with all assets inlined

### Build Command
```bash
npm install                  # Install marked, gsap once
node build.js               # Generates index.html
# Open index.html in browser
```

Build is deterministic and takes <1 second.

---

## Navigation & Interaction

### Keyboard (Primary)
```
Right Arrow  →  Next slide
Left Arrow   ←  Previous slide
Enter        ↵  Toggle fullscreen
?            ?  Show controls overlay
Space        ⎵  Next slide (alt)
Home         ⌖  First slide
End          ⌖  Last slide
```

### Mouse/Scroll (Secondary)
- Scroll wheel advances slide (one per wheel event)
- Touch swipe on mobile (left/right)

### UI Controls (Tertiary)
- Next/Previous buttons visible at bottom (low opacity)
- Slide counter (e.g., "Slide 15 of 33")
- Minimal visual footprint

### State Management
- Single source of truth: `currentSlide` (0-indexed integer)
- Renderer updates DOM based on state
- Keyboard/scroll both update state
- No re-renders; only visibility toggle (CSS `display`)

---

## Animations

### Framework: GSAP

**Slide Transitions:**
- Outgoing slide: fade out (300ms)
- Incoming slide: fade in (300ms)
- Easing: `power2.inOut` (smooth, not bouncy)

**Content Animations:**
- Lists: stagger children 50ms apart (cascade effect)
- Code blocks: slight scale-up + fade (200ms)
- Emphasis boxes: pulse or scale (if used)

**Performance:**
- No parallax or heavy transforms
- GPU-accelerated (will-change hints in CSS)
- Smoothness target: 60fps on mid-range devices

### Timeline Structure
```javascript
// Per-slide approach: animations.js defines templates
// Slide transition timeline:
gsap.timeline()
  .to(currentSlideEl, { opacity: 0, duration: 0.3 })
  .to(nextSlideEl, { opacity: 1, duration: 0.3 }, 0.3)
  .fromTo(nextSlideEl, 
    { y: 20 }, 
    { y: 0, duration: 0.3 }, 
    0.3)
```

---

## Content Structure

### Markdown Slide Format

```markdown
# Title (H1 auto-becomes slide title)

Subtitle or intro text goes here.

## Section

Body content with **bold**, *italic*, `code`.

- Bullet point
- Another point
  - Nested

### Code block
\`\`\`javascript
// Code example
console.log("hello");
\`\`\`

---
notes:
Speaker notes go here. Visible in presenter mode (future enhancement).
```

### Constraints
- One H1 per slide (becomes visible title)
- No nested H2+ hierarchy (flatten to H2 or list)
- Code blocks preserved as-is (syntax highlighting via CSS)
- YAML front-matter optional (for metadata: timing, speaker notes)

---

## Styling Approach

### Color Scheme (per spec)
```css
:root {
  --bg:           #0f172a;      /* Main background */
  --panel:        #111827;      /* Card/section background */
  --panel-soft:   #1f2937;      /* Lighter alternative */
  --text:         #f8fafc;      /* Primary text */
  --muted:        #94a3b8;      /* Secondary text */
  --accent:       #38bdf8;      /* Primary highlight (cyan) */
  --accent-2:     #a78bfa;      /* Secondary highlight (purple) */
  --success:      #22c55e;      /* Success/checkmark green */
  --warning:      #f59e0b;      /* Warning orange */
  --danger:       #ef4444;      /* Error red */
}
```

### Layout
- Slide container: 100vh (full viewport height)
- Content area: flex/grid (centered horizontally, vertically varied per slide)
- Code blocks: monospace, darker background (`--panel`)
- Lists: generous line-height, left padding

### Responsive
- Base: desktop (16:9 or 4:3 aspect ratio assumed)
- Minimum: 1024px width (will not scale below)
- Zoom-safe: respects browser zoom without breaking

---

## Data Flow

### Initialization
```
index.html loads
  ↓ (DOMContentLoaded)
renderer.js initializes state: currentSlide = 0
  ↓
renderer renders slide 0 (makes visible)
  ↓
keyboard.js registers listeners
  ↓
Ready for input
```

### State Update (User presses Right Arrow)
```
keyboard.js detects keydown event
  ↓
currentSlide++ (bounds check: max 32)
  ↓
renderer.js method called with new currentSlide
  ↓
renderer hides old slide element (opacity: 0)
  ↓
renderer shows new slide element (opacity: 1)
  ↓
animations.js runs GSAP timeline (fade transitions)
  ↓
Update slide counter display
```

### No Complex State
- No Redux, Vuex, or context managers
- No prop drilling or lifecycle hooks
- Pure functions for rendering logic

---

## Future Editing Workflow

### Add/Edit a Slide
1. Open `slides/15-claude-md.md`
2. Edit Markdown content
3. Run `node build.js` (< 1 second)
4. Reload browser — changes live

**Token cost:** Minimal. Only that one .md file needs attention; surrounding files untouched.

### Change Theme
1. Edit CSS variables in `assets/css/main.css`
2. Run `node build.js`
3. Reload

### Adjust Animations
1. Edit GSAP timelines in `assets/js/animations.js`
2. Run `node build.js`
3. Reload

### Add New Dependency
- Avoid. Inlining is intentional (no runtime imports).
- If needed: update `build.js` to include new asset, rebuild.

---

## Performance Targets

- **First paint:** < 500ms (single HTML load)
- **Slide transition:** 60fps (300ms fade)
- **Memory:** < 50MB (slides are lightweight HTML)
- **File size:** < 2MB total (33 slides + assets)

---

## Accessibility

- Semantic HTML (`<section>`, `<h1>`, etc.)
- Keyboard-only navigation fully supported
- Color contrast: WCAG AA minimum (dark theme + light text)
- No auto-play media
- Alt text for code examples (if images used)

---

## Deployment

### Local (presenter machine)
- Open `index.html` directly in browser
- No server needed
- Full control, no internet required

### Web (optional future)
- Host on GitHub Pages, Vercel, or static host
- One-click share with audience
- No runtime dependencies

---

## Known Limitations & Future Enhancements

### Out of Scope (v1)
- Presenter notes sidebar (can add post-launch)
- Slide thumbnails/overview (can add)
- Animations on individual elements (only slide-level)
- Syntax highlighting for code (CSS classes suffice for now)
- Multi-slide layouts (each slide is full-width)

### Nice-to-have (post-launch)
- Speaker mode (separate window for notes + timer)
- Slide thumbnails (grid view of all slides)
- Print stylesheet (optimized for PDF export)
- Dark/light theme toggle
- Export to PDF / video

---

## Testing Checklist

- [ ] All 33 slides render correctly
- [ ] Keyboard navigation works (arrows, enter, home/end)
- [ ] Scroll navigation works
- [ ] GSAP animations smooth (no jank)
- [ ] Colors match spec
- [ ] Text readable at presentation distance (try 120% zoom)
- [ ] No console errors
- [ ] Works in Chrome, Firefox, Safari
- [ ] Mobile responsive (touch swipe)

---

## Success Criteria

1. ✅ Presentation builds to single HTML file
2. ✅ Keyboard-first navigation (arrows primary)
3. ✅ Smooth GSAP transitions (no stuttering)
4. ✅ Dark theme matches color spec
5. ✅ Modular content (easy to edit slides without full recompile)
6. ✅ No runtime dependencies (viewers only need browser)
7. ✅ All 33 slides render clearly, readable on projector

---

## Summary

Modular Markdown-based presentation compiled to single interactive HTML. Keyboard-primary navigation, GSAP animations, dark modern theme. Build step is simple and fast. Future edits are token-efficient (edit one .md, rebuild, done).
