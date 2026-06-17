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
const enhancementsCss = fs.readFileSync('assets/css/enhancements.css', 'utf-8');
const prismThemeCss = fs.readFileSync('assets/css/prism-theme.css', 'utf-8');
const allCss = mainCss + '\n' + enhancementsCss + '\n' + gsapCss + '\n' + prismThemeCss;

// Read JS files
const rendererJs = fs.readFileSync('assets/js/renderer.js', 'utf-8');
const keyboardJs = fs.readFileSync('assets/js/keyboard.js', 'utf-8');
const animationsJs = fs.readFileSync('assets/js/animations.js', 'utf-8');
const robotJs = fs.readFileSync('assets/js/robot.js', 'utf-8');
const presenterEffectsJs = fs.readFileSync('assets/js/presenter-effects.js', 'utf-8');

// Include GSAP from node_modules
const gsapJs = fs.readFileSync('node_modules/gsap/dist/gsap.min.js', 'utf-8');

const allJs = gsapJs + '\n' + rendererJs + '\n' + keyboardJs + '\n' + animationsJs + '\n' + robotJs + '\n' + presenterEffectsJs;

// Build final HTML
let html = template;

// Inject CSS
html = html.replace(
  '<!-- CSS will be injected here by build.js -->',
  allCss
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

// Report image assets
console.log('\n✓ Image assets (referenced, not inlined):');
console.log('  - assets/img/background.png (5.9MB)');
console.log('  - assets/img/robot.png (2.2MB)');
console.log('  - assets/img/one_card-logo.png (17KB)');
console.log('  - assets/img/icono-one-card.png (5.1K)');
console.log('\nNote: Images are used via CSS/HTML references for optimal performance.');
