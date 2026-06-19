class PresentationRenderer {
  constructor() {
    this.currentSlide = 0;
    this.totalSlides = 0;
    this.slides = [];
    this.slideCounterButton = null;
    this.slideJumpPanel = null;
    this.slideJumpInput = null;
    this.slideJumpTotal = null;
    this.init();
  }

  init() {
    this.slides = Array.from(document.querySelectorAll('.slide'));
    this.totalSlides = this.slides.length;
    this.bindSlideJumpControls();

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
    const counter = this.slideCounterButton || document.getElementById('slide-counter');
    if (counter) {
      const current = this.currentSlide + 1;
      counter.textContent = `${current} / ${this.totalSlides}`;
      counter.setAttribute?.('aria-label', `Slide ${current} de ${this.totalSlides}. Click para cambiar de slide`);
    }

    if (this.slideJumpInput) {
      this.slideJumpInput.max = String(this.totalSlides);

      if (!this.isSlideJumpOpen()) {
        this.slideJumpInput.value = String(this.currentSlide + 1);
      }
    }

    if (this.slideJumpTotal) {
      this.slideJumpTotal.textContent = `/ ${this.totalSlides}`;
    }
  }

  bindSlideJumpControls() {
    this.slideCounterButton = document.getElementById('slide-counter');
    this.slideJumpPanel = document.getElementById('slide-jump-panel');
    this.slideJumpInput = document.getElementById('slide-jump-input');
    this.slideJumpTotal = document.getElementById('slide-jump-total');

    if (!this.slideCounterButton || !this.slideJumpPanel || !this.slideJumpInput) {
      return;
    }

    this.slideCounterButton.addEventListener('click', (event) => {
      event.stopPropagation();
      this.toggleSlideJump();
    });

    this.slideJumpPanel.addEventListener('click', (event) => {
      event.stopPropagation();
    });

    this.slideJumpPanel.addEventListener('submit', (event) => {
      event.preventDefault();
      this.commitSlideJump();
    });

    this.slideJumpInput.addEventListener('input', () => {
      this.slideJumpPanel.classList.remove('has-error');
    });

    this.slideJumpInput.addEventListener('keydown', (event) => {
      event.stopPropagation();

      if (event.key === 'Escape') {
        event.preventDefault();
        this.closeSlideJump(true);
      }
    });

    document.addEventListener('click', (event) => {
      if (event.target?.closest?.('#slide-jump')) {
        return;
      }

      this.closeSlideJump();
    });
  }

  isSlideJumpOpen() {
    return Boolean(this.slideJumpPanel && !this.slideJumpPanel.classList.contains('hidden'));
  }

  openSlideJump() {
    if (!this.slideJumpPanel || !this.slideJumpInput || this.totalSlides === 0) {
      return;
    }

    this.slideJumpPanel.classList.remove('hidden');
    this.slideJumpPanel.classList.remove('has-error');
    this.slideCounterButton?.setAttribute?.('aria-expanded', 'true');
    this.slideJumpInput.value = String(this.currentSlide + 1);
    this.slideJumpInput.max = String(this.totalSlides);
    this.slideJumpInput.focus?.();
    this.slideJumpInput.select?.();
  }

  closeSlideJump(restoreFocus = false) {
    if (!this.slideJumpPanel) {
      return;
    }

    this.slideJumpPanel.classList.add('hidden');
    this.slideJumpPanel.classList.remove('has-error');
    this.slideCounterButton?.setAttribute?.('aria-expanded', 'false');

    if (restoreFocus) {
      this.slideCounterButton?.focus?.();
    }
  }

  toggleSlideJump() {
    if (this.isSlideJumpOpen()) {
      this.closeSlideJump(true);
      return;
    }

    this.openSlideJump();
  }

  commitSlideJump() {
    if (!this.slideJumpInput) {
      return;
    }

    const requestedSlide = Number.parseInt(this.slideJumpInput.value, 10);

    if (!Number.isFinite(requestedSlide)) {
      this.slideJumpPanel?.classList.add('has-error');
      this.slideJumpInput.focus?.();
      return;
    }

    const boundedSlide = Math.min(Math.max(requestedSlide, 1), this.totalSlides);
    this.goToSlide(boundedSlide - 1);
    this.closeSlideJump(true);
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
