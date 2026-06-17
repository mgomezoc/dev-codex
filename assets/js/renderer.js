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
    if (this.totalSlides === 0) {
      return;
    }

    // Bounds check
    if (index < 0) {
      this.currentSlide = 0;
    } else if (index >= this.totalSlides) {
      this.currentSlide = this.totalSlides - 1;
    } else {
      this.currentSlide = index;
    }

    const targetSlide = this.slides[this.currentSlide];

    if (!targetSlide) {
      return;
    }

    if (targetSlide.classList.contains('active')) {
      return;
    }

    // Hide all slides
    this.slides.forEach(slide => {
      slide.classList.remove('active');
    });

    // Show current slide
    targetSlide.classList.add('active');
    targetSlide.dataset.animationToken = String(Date.now());

    // Update counter
    this.updateCounter();

    // Notify robot assistant of slide change
    if (window.robotAssistant) {
      window.robotAssistant.onSlideChange(this.currentSlide + 1);
    }
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
const initRenderer = () => {
  if (window.renderer) {
    return;
  }

  window.renderer = new PresentationRenderer();

  // Connect buttons to renderer
  const nextBtn = document.getElementById('next-btn');
  const prevBtn = document.getElementById('prev-btn');

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      window.renderer.nextSlide();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      window.renderer.prevSlide();
    });
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRenderer);
} else {
  initRenderer();
}
