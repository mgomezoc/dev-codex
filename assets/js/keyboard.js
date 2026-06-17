class KeyboardController {
  constructor(renderer) {
    this.renderer = renderer;
    this.init();
  }

  init() {
    document.addEventListener('keydown', (e) => this.handleKeydown(e));
  }

  handleKeydown(event) {
    if (event.repeat) {
      return;
    }

    switch (event.key) {
      case 'ArrowRight':
      case ' ':
        event.preventDefault();
        this.renderer.nextSlide();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        this.renderer.prevSlide();
        break;
      case 'Home':
        event.preventDefault();
        this.renderer.goToSlide(0);
        break;
      case 'End':
        event.preventDefault();
        this.renderer.goToSlide(this.renderer.totalSlides - 1);
        break;
      case 'Enter':
        event.preventDefault();
        this.renderer.toggleFullscreen();
        break;
      case '?':
        event.preventDefault();
        this.toggleHelp();
        break;
    }
  }

  toggleHelp() {
    const overlay = document.getElementById('help-overlay');
    if (overlay) {
      overlay.classList.toggle('hidden');
    }
  }
}

// Initialize keyboard controller when renderer is ready
document.addEventListener('DOMContentLoaded', () => {
  if (window.renderer) {
    new KeyboardController(window.renderer);
  }
});

// Close help overlay on click
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('help-overlay');
  if (overlay) {
    overlay.addEventListener('click', () => {
      overlay.classList.add('hidden');
    });
  }
});
