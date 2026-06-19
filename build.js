const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const templatePath = 'template.html';
const slidesDir = 'slides';
const outputPath = 'index.html';
const secretRobotFaqPath = path.join(slidesDir, '_robot-faq.md');
const vendorDir = path.join('assets', 'vendor');
const gsapSource = path.join('node_modules', 'gsap', 'dist', 'gsap.min.js');
const gsapTarget = path.join(vendorDir, 'gsap.min.js');

const template = fs.readFileSync(templatePath, 'utf-8');

const slideFiles = fs.readdirSync(slidesDir)
  .filter((file) => file.endsWith('.md') && !file.startsWith('_'))
  .sort();

console.log(`Found ${slideFiles.length} slides`);

const slides = slideFiles.map((file, index) => {
  const content = fs.readFileSync(path.join(slidesDir, file), 'utf-8');
  const html = marked(content);

  return `<section class="slide" data-slide="${index + 1}">
    <div class="slide-content">
      ${html}
    </div>
  </section>`;
});

const secretRobotFaqHtml = fs.existsSync(secretRobotFaqPath)
  ? marked(fs.readFileSync(secretRobotFaqPath, 'utf-8'))
  : '';

fs.mkdirSync(vendorDir, { recursive: true });
fs.copyFileSync(gsapSource, gsapTarget);

const html = template
  .replace(
    '<!-- Slides will be injected here by build.js -->',
    slides.join('\n')
  )
  .replace(
    '<!-- Secret robot Q&A will be injected here by build.js -->',
    secretRobotFaqHtml
  );

fs.writeFileSync(outputPath, html);

console.log(`OK Generated ${outputPath}`);
console.log(`OK Total HTML file size: ${(html.length / 1024).toFixed(2)}KB`);
console.log(`OK Copied local GSAP runtime to ${gsapTarget}`);

console.log('\nOK External source assets:');
console.log('  - assets/css/main.css');
console.log('  - assets/css/enhancements.css');
console.log('  - assets/css/gsap-defaults.css');
console.log('  - assets/css/prism-theme.css');
console.log('  - assets/js/renderer.js');
console.log('  - assets/js/keyboard.js');
console.log('  - assets/js/animations.js');
console.log('  - assets/js/robot.js');
console.log('  - assets/js/presenter-effects.js');
console.log('  - assets/vendor/gsap.min.js');

console.log('\nOK Image assets (referenced, not inlined):');
console.log('  - assets/img/background.png (5.9MB)');
console.log('  - assets/img/robot.png (2.2MB)');
console.log('  - assets/img/meme-2.jpg (49KB)');
console.log('  - assets/img/meme-3.png (6.1MB)');
console.log('  - assets/img/one_card-logo.png (17KB)');
console.log('  - assets/img/icono-one-card.png (5.1K)');
console.log('\nNote: CSS and JS stay in external files; index.html only contains generated slide markup.');
