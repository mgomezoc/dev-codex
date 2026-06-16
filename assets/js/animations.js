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
