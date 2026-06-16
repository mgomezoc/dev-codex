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
    // Bounds check
    if (index < 0) {
      this.currentSlide = 0;
    } else if (index >= this.totalSlides) {
      this.currentSlide = this.totalSlides - 1;
    } else {
      this.currentSlide = index;
    }

    // Hide all slides
    this.slides.forEach(slide => {
      slide.classList.remove('active');
    });

    // Show current slide
    if (this.slides[this.currentSlide]) {
      this.slides[this.currentSlide].classList.add('active');
    }

    // Update counter
    this.updateCounter();
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
document.addEventListener('DOMContentLoaded', () => {
  window.renderer = new PresentationRenderer();
});
