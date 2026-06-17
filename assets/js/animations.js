class PresentationAnimations {
  constructor(renderer) {
    this.renderer = renderer;
    this.timeline = null;
    this.mouseX = 0;
    this.mouseY = 0;
    this.typewriterDelay = 34;
    this.lastAnimatedSlide = null;
    this.lastAnimationToken = null;
    this.activeTitleElement = null;
    this.observerFrame = null;
    this.initMouseTracking();
  }

  initMouseTracking() {
    // Track mouse movement for parallax effects
    if (typeof window !== 'undefined') {
      document.addEventListener('mousemove', (e) => {
        this.mouseX = e.clientX / window.innerWidth;
        this.mouseY = e.clientY / window.innerHeight;
        this.updateParallaxElements();
      });
    }
  }

  updateParallaxElements() {
    const parallaxElements = document.querySelectorAll('.parallax-layer');
    parallaxElements.forEach((el) => {
      const depth = el.dataset.depth || 1;
      const offsetX = (this.mouseX - 0.5) * 50 * depth;
      const offsetY = (this.mouseY - 0.5) * 50 * depth;
      gsap.to(el, {
        x: offsetX,
        y: offsetY,
        duration: 0.5,
        overwrite: 'auto'
      });
    });
  }

  initSlideAnimation(slideElement) {
    if (!slideElement) {
      return;
    }

    const animationToken = slideElement.dataset?.animationToken || String(Date.now());
    if (this.lastAnimatedSlide === slideElement && this.lastAnimationToken === animationToken) {
      return;
    }

    if (this.activeTitleElement && this.activeTitleElement.typewriterTimer) {
      clearTimeout(this.activeTitleElement.typewriterTimer);
      this.activeTitleElement.typewriterTimer = null;
    }

    this.lastAnimatedSlide = slideElement;
    this.lastAnimationToken = animationToken;
    this.initTitleTypewriter(slideElement);

    // Check if it's a hero slide
    const isHero = slideElement.classList.contains('hero');

    if (isHero) {
      this.initHeroSlideAnimation(slideElement);
    } else {
      this.initStandardSlideAnimation(slideElement);
    }
  }

  initTitleTypewriter(slideElement) {
    const title = slideElement.querySelector(
      '.slide-content > h1, .slide-content > h2, .slide-content > h3, .hero h1, .hero h2, .hero h3'
    );

    if (!title) return;

    const activeToken = slideElement.dataset?.animationToken || '';
    if (title.dataset.typewriterToken === activeToken) {
      return;
    }

    const fullText = title.dataset.typewriterText || title.textContent.trim();
    if (!fullText) return;

    if (title.typewriterTimer) {
      clearTimeout(title.typewriterTimer);
      title.typewriterTimer = null;
    }

    title.dataset.typewriterText = fullText;
    title.dataset.typewriterToken = activeToken;
    title.setAttribute('aria-label', fullText);
    title.classList.remove('typewriter-complete');
    title.classList.add('typewriter-title');
    this.activeTitleElement = title;

    if (this.prefersReducedMotion()) {
      title.textContent = fullText;
      title.classList.add('typewriter-complete');
      return;
    }

    title.textContent = '';

    let characterIndex = 0;
    const typeNextCharacter = () => {
      characterIndex += 1;
      title.textContent = fullText.slice(0, characterIndex);

      if (characterIndex < fullText.length) {
        const currentCharacter = fullText.charAt(characterIndex - 1);
        const pause = currentCharacter === ' ' ? this.typewriterDelay * 1.8 : this.typewriterDelay;
        title.typewriterTimer = setTimeout(typeNextCharacter, pause);
      } else {
        title.classList.add('typewriter-complete');
        title.typewriterTimer = null;
      }
    };

    title.typewriterTimer = setTimeout(typeNextCharacter, 120);
  }

  initHeroSlideAnimation(slideElement) {
    // Hero slide with zoom effect
    gsap.set(slideElement, { opacity: 0, scale: 0.98 });
    gsap.to(slideElement, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: 'power2.inOut'
    });

    // Animate hero title with floating effect
    const title = slideElement.querySelector('h1');
    if (title) {
      gsap.set(title, { opacity: 0, y: -30 });
      gsap.to(title, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        delay: 0.1
      });

      // Add subtle floating animation
      gsap.to(title, {
        y: -10,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        delay: 0.9
      });
    }

    // Animate hero subtitle
    const subtitle = slideElement.querySelector('p');
    if (subtitle) {
      gsap.set(subtitle, { opacity: 0, y: 30 });
      gsap.to(subtitle, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        delay: 0.3
      });
    }

    // Animate blockquotes with fade
    const blockquotes = slideElement.querySelectorAll('blockquote');
    if (blockquotes.length > 0) {
      gsap.set(blockquotes, { opacity: 0, y: 20 });
      gsap.to(blockquotes, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.inOut',
        stagger: 0.1,
        delay: 0.5
      });
    }
  }

  initStandardSlideAnimation(slideElement) {
    // Standard slide animation
    gsap.set(slideElement, { opacity: 0, y: 20 });
    gsap.to(slideElement, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power2.inOut'
    });

    // Stagger list items if present
    const listItems = slideElement.querySelectorAll('li, .stagger-item');
    if (listItems.length > 0) {
      gsap.set(listItems, { opacity: 0, x: -20 });
      gsap.to(listItems, {
        opacity: 1,
        x: 0,
        duration: 0.4,
        ease: 'power2.inOut',
        stagger: 0.08,
        delay: 0.1
      });
    }

    // Animate code blocks with scale and glow
    const codeBlocks = slideElement.querySelectorAll('pre');
    if (codeBlocks.length > 0) {
      gsap.set(codeBlocks, { opacity: 0, scale: 0.95, filter: 'blur(5px)' });
      gsap.to(codeBlocks, {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.6,
        ease: 'power2.inOut',
        stagger: 0.12,
        delay: 0.2
      });
    }

    // Animate blockquotes with color transition
    const blockquotes = slideElement.querySelectorAll('blockquote');
    if (blockquotes.length > 0) {
      gsap.set(blockquotes, { opacity: 0, y: 20 });
      gsap.to(blockquotes, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.inOut',
        stagger: 0.1,
        delay: 0.1
      });
    }
  }

  // Initialize parallax for a specific layer
  initParallaxLayer(element, depth = 1) {
    element.dataset.depth = depth;
    element.classList.add('parallax-layer');
  }

  // Check for screen motion preferences
  prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
}

// Initialize animations when renderer is ready
document.addEventListener('DOMContentLoaded', () => {
  if (window.renderer) {
    window.animations = new PresentationAnimations(window.renderer);
    window.animations.lastAnimatedSlide = null;

    // Animate current slide on load
    if (window.renderer.slides[window.renderer.currentSlide]) {
      window.animations.initSlideAnimation(window.renderer.slides[window.renderer.currentSlide]);
    }

    // Re-animate on slide change
    const observer = new MutationObserver(() => {
      if (window.animations.observerFrame) {
        cancelAnimationFrame(window.animations.observerFrame);
        window.animations.observerFrame = null;
      }

      window.animations.observerFrame = requestAnimationFrame(() => {
        const activeSlide = document.querySelector('.slide.active');
        if (activeSlide) {
          window.animations.initSlideAnimation(activeSlide);
        }
      });
    });

    observer.observe(document.getElementById('presentation'), {
      attributes: true,
      subtree: true,
      attributeFilter: ['class']
    });
  }
});
