const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const rootDir = path.resolve(__dirname, '..');

function readAsset(relativePath) {
  return fs.readFileSync(path.join(rootDir, relativePath), 'utf8');
}

function createElement(id = '') {
  const listeners = {};
  const classes = new Set();

  return {
    id,
    children: [],
    listeners,
    dataset: {},
    style: {},
    textContent: '',
    classList: {
      add(className) {
        classes.add(className);
      },
      remove(className) {
        classes.delete(className);
      },
      toggle(className) {
        if (classes.has(className)) {
          classes.delete(className);
        } else {
          classes.add(className);
        }
      },
      contains(className) {
        return classes.has(className);
      },
    },
    addEventListener(type, handler) {
      listeners[type] ||= [];
      listeners[type].push(handler);
    },
    appendChild(child) {
      this.children.push(child);
      return child;
    },
    querySelector() {
      return null;
    },
    querySelectorAll() {
      return [];
    },
    getBoundingClientRect() {
      return { left: 0, top: 0, width: 100, height: 100 };
    },
  };
}

test('robot assistant is exposed globally for slide-change notifications', () => {
  const callbacks = {};
  const sandbox = {
    console,
    setTimeout,
    window: {},
    document: {
      readyState: 'loading',
      body: createElement('body'),
      addEventListener(type, handler) {
        callbacks[type] = handler;
      },
      createElement,
    },
    gsap: {
      delayedCall() {},
      timeline() {
        return { to() { return this; } };
      },
      to() {},
    },
  };

  vm.runInNewContext(readAsset('assets/js/robot.js'), sandbox);

  assert.equal(typeof sandbox.window.robotAssistant, 'object');
  assert.equal(typeof sandbox.window.robotAssistant.onSlideChange, 'function');
});

test('navigation buttons have one click handler each after initialization', () => {
  const domContentLoadedHandlers = [];
  const elements = {
    'next-btn': createElement('next-btn'),
    'prev-btn': createElement('prev-btn'),
    'slide-counter': createElement('slide-counter'),
    'slide-jump-panel': createElement('slide-jump-panel'),
    'slide-jump-input': createElement('slide-jump-input'),
    'slide-jump-total': createElement('slide-jump-total'),
    'help-overlay': createElement('help-overlay'),
    presentation: createElement('presentation'),
  };
  elements['slide-jump-panel'].classList.add('hidden');
  const slides = [createElement('slide-1'), createElement('slide-2')];

  const sandbox = {
    console,
    window: {},
    document: {
      fullscreenElement: null,
      documentElement: {
        requestFullscreen() {
          return Promise.resolve();
        },
      },
      exitFullscreen() {
        return Promise.resolve();
      },
      addEventListener(type, handler) {
        if (type === 'DOMContentLoaded') {
          domContentLoadedHandlers.push(handler);
        }
      },
      getElementById(id) {
        return elements[id] || null;
      },
      querySelectorAll(selector) {
        return selector === '.slide' ? slides : [];
      },
    },
  };

  vm.runInNewContext(readAsset('assets/js/renderer.js'), sandbox);
  vm.runInNewContext(readAsset('assets/js/keyboard.js'), sandbox);

  for (const handler of domContentLoadedHandlers) {
    handler();
  }

  assert.equal(elements['next-btn'].listeners.click.length, 1);
  assert.equal(elements['prev-btn'].listeners.click.length, 1);
  assert.equal(elements['slide-counter'].listeners.click.length, 1);
});

test('slide counter opens numeric jump and changes the active slide', () => {
  const elements = {
    'next-btn': createElement('next-btn'),
    'prev-btn': createElement('prev-btn'),
    'slide-counter': createElement('slide-counter'),
    'slide-jump-panel': createElement('slide-jump-panel'),
    'slide-jump-input': createElement('slide-jump-input'),
    'slide-jump-total': createElement('slide-jump-total'),
  };
  elements['slide-jump-panel'].classList.add('hidden');

  const slides = [
    createElement('slide-1'),
    createElement('slide-2'),
    createElement('slide-3'),
    createElement('slide-4'),
  ];

  const sandbox = {
    console,
    window: {},
    document: {
      addEventListener() {},
      getElementById(id) {
        return elements[id] || null;
      },
      querySelectorAll(selector) {
        return selector === '.slide' ? slides : [];
      },
    },
  };

  vm.runInNewContext(readAsset('assets/js/renderer.js'), sandbox);

  elements['slide-counter'].listeners.click[0]({
    stopPropagation() {},
  });

  assert.equal(elements['slide-jump-panel'].classList.contains('hidden'), false);
  assert.equal(elements['slide-jump-input'].value, '1');

  elements['slide-jump-input'].value = '3';
  elements['slide-jump-panel'].listeners.submit[0]({
    preventDefault() {},
  });

  assert.equal(slides[2].classList.contains('active'), true);
  assert.equal(elements['slide-counter'].textContent, '3 / 4');
  assert.equal(elements['slide-jump-panel'].classList.contains('hidden'), true);
});

test('slide animations prepare the active title for a replayable typewriter effect', () => {
  const title = createElement('title');
  title.textContent = 'La IA no es magia';
  title.dataset = {};
  title.attributes = {};
  title.setAttribute = function setAttribute(name, value) {
    this.attributes[name] = value;
  };

  const slide = createElement('slide');
  slide.querySelector = (selector) => (
    selector === '.slide-content > h1, .slide-content > h2, .slide-content > h3, .hero h1, .hero h2, .hero h3'
      ? title
      : null
  );
  slide.querySelectorAll = () => [];

  const sandbox = {
    console,
    window: {
      matchMedia() {
        return { matches: false };
      },
    },
    document: {
      addEventListener() {},
      querySelector() {
        return null;
      },
      querySelectorAll() {
        return [];
      },
      getElementById() {
        return null;
      },
    },
    MutationObserver: function MutationObserver() {
      return { observe() {} };
    },
    setTimeout() {
      return 1;
    },
    clearTimeout() {},
    gsap: {
      set() {},
      to() {},
    },
  };

  vm.runInNewContext(`${readAsset('assets/js/animations.js')}\nthis.PresentationAnimationsForTest = PresentationAnimations;`, sandbox);

  const animations = new sandbox.PresentationAnimationsForTest({});
  animations.initSlideAnimation(slide);

  assert.equal(title.dataset.typewriterText, 'La IA no es magia');
  assert.equal(title.attributes['aria-label'], 'La IA no es magia');
  assert.equal(title.textContent, '');
  assert.equal(title.classList.contains('typewriter-title'), true);
});

test('presentation surfaces use wide layouts without character-based title caps', () => {
  const mainCss = readAsset('assets/css/main.css');
  const enhancementsCss = readAsset('assets/css/enhancements.css');

  assert.equal(enhancementsCss.includes('36ch'), false);
  assert.match(mainCss, /\.slide-content\s*{[\s\S]*?align-items:\s*stretch;/);
  assert.match(mainCss, /\.slide-content > ul,[\s\S]*?width:\s*100%;/);
  assert.match(mainCss, /\.slide pre\s*{[\s\S]*?width:\s*100%;/);
});

test('template keeps CSS and JavaScript in external files', () => {
  const template = readAsset('template.html');

  assert.equal(/<style\b/i.test(template), false);
  assert.equal(/<script\b(?![^>]*\bsrc=)[^>]*>/i.test(template), false);
  assert.match(template, /<link rel="stylesheet" href="assets\/css\/main\.css">/);
  assert.match(template, /<script src="assets\/js\/renderer\.js" defer><\/script>/);
});

test('runtime JavaScript avoids inline visual styles and HTML string injection', () => {
  const runtimeFiles = [
    'assets/js/renderer.js',
    'assets/js/keyboard.js',
    'assets/js/animations.js',
    'assets/js/robot.js',
    'assets/js/presenter-effects.js',
  ];

  for (const file of runtimeFiles) {
    const source = readAsset(file);
    assert.equal(source.includes('.style.'), false, `${file} should not mutate inline styles`);
    assert.equal(source.includes('innerHTML'), false, `${file} should avoid HTML string injection`);
    assert.equal(source.includes('insertAdjacentHTML'), false, `${file} should avoid HTML string injection`);
  }
});

test('presenter effects add one copy button per code block', () => {
  const addedListeners = {};
  const classes = new Set();
  const button = {
    type: '',
    className: '',
    textContent: '',
    dataset: {},
    classList: {
      add(className) {
        classes.add(className);
      },
      remove(className) {
        classes.delete(className);
      },
      contains(className) {
        return classes.has(className);
      },
    },
    setAttribute(name, value) {
      this[name] = value;
    },
    addEventListener(type, handler) {
      addedListeners[type] = handler;
    },
  };
  const pre = createElement('pre');
  const code = createElement('code');
  code.textContent = 'npm.cmd run build';
  code.parentElement = pre;
  pre.appendChild = function appendChild(child) {
    child.parentElement = this;
    this.children.push(child);
    return child;
  };
  const slide = {
    querySelectorAll(selector) {
      return selector === 'pre > code' ? [code] : [];
    },
  };
  const sandbox = {
    console,
    window: {},
    document: {
      readyState: 'loading',
      addEventListener() {},
      querySelectorAll() {
        return [];
      },
      createElement(tagName) {
        assert.equal(tagName, 'button');
        return button;
      },
    },
    NodeFilter: { SHOW_TEXT: 4 },
    setTimeout() {},
  };

  vm.runInNewContext(`${readAsset('assets/js/presenter-effects.js')}\nthis.PresenterEffectsForTest = PresenterEffects;`, sandbox);

  const effects = new sandbox.PresenterEffectsForTest();
  effects.setupCodeCopyButtons(slide);
  effects.setupCodeCopyButtons(slide);

  assert.equal(pre.children.length, 1);
  assert.equal(pre.dataset.copyReady, 'true');
  assert.equal(pre.classList.contains('copyable-code'), true);
  assert.equal(button.className, 'code-copy-button');
  assert.equal(button.textContent, 'Copiar');
  assert.equal(typeof addedListeners.click, 'function');
});

test('robot keeps message visible after 2s delay and until slide changes', () => {
  const domContentLoadedCallbacks = [];
  const queuedTimeouts = [];
  const findSpeech = (node) => {
    if (!node || !node.children) {
      return null;
    }

    for (const child of node.children) {
      if (child.className === 'robot-speech') {
        return child;
      }

      const deepMatch = findSpeech(child);
      if (deepMatch) {
        return deepMatch;
      }
    }

    return null;
  };

  const body = {
    children: [],
    appendChild(child) {
      this.children.push(child);
    },
    querySelector(selector) {
      if (selector === '.robot-speech') {
        return findSpeech(this);
      }
      return null;
    },
    querySelectorAll() {
      return this.children;
    },
    addEventListener() {},
  };

  const sandbox = {
    console,
    window: {},
    document: {
      body,
      readyState: 'loading',
      createElement(tagName) {
        if (tagName !== 'div') {
          return createElement(tagName);
        }

        return {
          id: '',
          tagName,
          children: [],
          className: '',
          innerHTML: '',
          classList: {
            add(className) {
              this._classes ||= new Set();
              this._classes.add(className);
            },
            remove(className) {
              if (!this._classes) {
                return;
              }
              this._classes.delete(className);
            },
            contains(className) {
              return this._classes?.has(className) || false;
              },
          },
          addEventListener() {},
          querySelector(selector) {
            if (selector === '.robot-speech') {
              return this.children.find((item) => item.className === 'robot-speech') || null;
            }
            return null;
          },
          appendChild(child) {
            this.children.push(child);
            return child;
          },
        };
      },
      addEventListener(type, handler) {
        if (type === 'DOMContentLoaded') {
          domContentLoadedCallbacks.push(handler);
        }
      },
    },
    gsap: {
      timeline() {
        return { to() { return this; } };
      },
      to() {},
      killTweensOf() {},
    },
    setTimeout(fn, delay) {
      queuedTimeouts.push({ fn, delay });
      return queuedTimeouts.length;
    },
    clearTimeout() {},
  };

  vm.runInNewContext(readAsset('assets/js/robot.js'), sandbox);
  for (const handler of domContentLoadedCallbacks) {
    handler();
  }

  assert.equal(queuedTimeouts.length, 0);

  sandbox.window.robotAssistant.onSlideChange(1);
  assert.equal(queuedTimeouts.length, 1);
  assert.equal(queuedTimeouts[0].delay, 2000);
  assert.equal(body.querySelector('.robot-speech'), null);

  queuedTimeouts.shift().fn();
  const speech = body.querySelector('.robot-speech');
  assert.ok(!!speech);
  assert.equal(speech.classList.contains('show'), true);
  assert.equal(speech.textContent.includes('charla'), true);

  sandbox.window.robotAssistant.onSlideChange(2);
  assert.equal(queuedTimeouts.length, 1);
});
