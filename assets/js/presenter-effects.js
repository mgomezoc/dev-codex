/**
 * Presenter Effects: Advanced animations and interactivity for presentation
 */

class PresenterEffects {
  constructor() {
    this.init();
  }

  init() {
    // Initialize all effects when slides load
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupEffects());
    } else {
      this.setupEffects();
    }

    // Re-initialize when slide changes
    if (window.renderer) {
      const originalShowSlide = window.renderer.constructor.prototype.showSlide;
      window.renderer.constructor.prototype.showSlide = function(index) {
        originalShowSlide.call(this, index);
        presenterEffects?.applyEffectsToSlide(this.slides[this.currentSlide]);
      };
    }
  }

  setupEffects() {
    document.querySelectorAll('.slide').forEach(slide => {
      this.applyEffectsToSlide(slide);
    });
  }

  applyEffectsToSlide(slide) {
    if (!slide) return;

    // Add copy actions to reusable code snippets
    this.setupCodeCopyButtons(slide);

    // Apply list stagger animations
    this.setupListAnimations(slide);

    // Apply number counter animations
    this.setupNumberCounters(slide);

    // Ensure Prism highlights code
    setTimeout(() => {
      if (window.Prism) {
        Prism.highlightAllUnder(slide);
      }
    }, 50);
  }

  setupCodeCopyButtons(slide) {
    const codeBlocks = slide.querySelectorAll('pre > code');

    codeBlocks.forEach((codeBlock) => {
      const pre = codeBlock.parentElement;

      if (!pre || pre.dataset.copyReady === 'true') {
        return;
      }

      pre.dataset.copyReady = 'true';
      pre.classList.add('copyable-code');

      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'code-copy-button';
      button.textContent = 'Copiar';
      button.setAttribute('aria-label', 'Copiar código al portapapeles');

      button.addEventListener('click', () => {
        this.copyCodeToClipboard(codeBlock.textContent, button);
      });

      pre.appendChild(button);
    });
  }

  async copyCodeToClipboard(text, button) {
    const originalLabel = button.textContent;

    try {
      await navigator.clipboard.writeText(text.trim());
      button.textContent = 'Copiado';
      button.classList.add('is-copied');
    } catch (error) {
      button.textContent = 'Error';
      button.classList.add('has-error');
    }

    setTimeout(() => {
      button.textContent = originalLabel;
      button.classList.remove('is-copied');
      button.classList.remove('has-error');
    }, 1400);
  }

  setupListAnimations(slide) {
    const lists = slide.querySelectorAll('ul, ol');
    lists.forEach(list => {
      list.classList.add('animated-list');
      const items = list.querySelectorAll('li');
      items.forEach((item) => {
        item.classList.add('animated-list-item');
      });
    });
  }

  setupNumberCounters(slide) {
    // Find numbers in text and animate them
    const walker = document.createTreeWalker(
      slide,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    const nodesToReplace = [];
    let node;

    while ((node = walker.nextNode())) {
      const numberRegex = /\d+(?:M|K|M-row|\s*rows?|%)/gi;
      if (numberRegex.test(node.textContent)) {
        nodesToReplace.push(node);
      }
    }

    nodesToReplace.forEach(node => {
      const fragment = document.createDocumentFragment();
      const counters = [];
      const text = node.textContent;
      const numberRegex = /(\d+)(?=M|K|M-row|\s*rows?|%)/gi;
      let lastIndex = 0;
      let match;

      while ((match = numberRegex.exec(text)) !== null) {
        if (match.index > lastIndex) {
          fragment.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
        }

        const counter = document.createElement('span');
        counter.className = 'counter-number';
        counter.textContent = match[1];
        counters.push(counter);
        fragment.appendChild(counter);
        lastIndex = match.index + match[1].length;
      }

      if (lastIndex < text.length) {
        fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
      }

      node.parentNode.replaceChild(fragment, node);

      setTimeout(() => {
        counters.forEach(counter => this.animateCounter(counter));
      }, 200);
    });
  }

  animateCounter(element) {
    const finalValue = parseInt(element.textContent);
    const duration = 1000; // ms
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function: easeOutQuad
      const eased = 1 - Math.pow(1 - progress, 2);
      const currentValue = Math.floor(finalValue * eased);

      element.textContent = currentValue;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        element.textContent = finalValue;
      }
    };

    animate();
  }
}

// Create global instance
let presenterEffects;
if (typeof window !== 'undefined') {
  presenterEffects = new PresenterEffects();
}
