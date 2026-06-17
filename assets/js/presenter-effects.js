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

  setupListAnimations(slide) {
    const lists = slide.querySelectorAll('ul, ol');
    lists.forEach(list => {
      list.classList.add('animated-list');
      const items = list.querySelectorAll('li');
      items.forEach((item, index) => {
        // Reset animation
        item.style.animation = 'none';
        setTimeout(() => {
          item.style.animation = `listItemEnter 0.5s ease-out forwards`;
          item.style.animationDelay = `${index * 0.1}s`;
        }, 10);
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
      const span = document.createElement('span');
      span.innerHTML = node.textContent.replace(
        /(\d+)(?=M|K|M-row|\s*rows?|%)/gi,
        '<span class="counter-number">$1</span>'
      );

      node.parentNode.replaceChild(span, node);

      // Animate counters
      setTimeout(() => {
        span.querySelectorAll('.counter-number').forEach(counter => {
          this.animateCounter(counter);
        });
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
