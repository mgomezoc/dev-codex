// Clippy-style robot assistant animation with GSAP

const robotAssistant = {
  messages: {
    default: [
      "¡Hola! Soy tu asistente de IA",
      "Te voy a guiar por esta presentación",
      "Usa las flechas para navegar",
      "¿Necesitas ayuda?",
      "¡Dale que va!",
      "La IA no es magia, es herramienta"
    ],
    slide2: ["Esto es importante para la IA"],
    slide3: ["Mira que loco esto del robot"],
    slide4: ["Codex y Claude son poderosos"],
    slide10: ["Este prompt es útil"],
    slide20: ["Configuración es clave"],
    slide30: ["Ya casi terminamos!"]
  },

  currentSlide: 1,
  lastMessageTime: 0,
  messageDelay: 5000,
  isMoving: false,

  init() {
    this.createRobot();
    this.startAnimation();
    this.setupEventListeners();
  },

  createRobot() {
    const robot = document.createElement('div');
    robot.id = 'robot-assistant';
    robot.innerHTML = '<img src="assets/img/robot.png" alt="Robot Assistant">';
    document.body.appendChild(robot);
    this.element = robot;
  },

  startAnimation() {
    if (!this.element) return;

    const tl = gsap.timeline({ repeat: -1 });

    // Floating animation (up and down) - Clippy style
    tl.to(this.element, {
      y: -15,
      duration: 3,
      ease: "sine.inOut"
    }, 0)
    .to(this.element, {
      y: 15,
      duration: 3,
      ease: "sine.inOut"
    }, 3);

    // Subtle bobbing rotation
    gsap.to(this.element, {
      rotation: 2,
      duration: 2.5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1
    });

    // Mouse follow escape behavior (Clippy style)
    document.addEventListener('mousemove', (e) => {
      if (this.isMoving) return;

      const robot = this.element;
      const rect = robot.getBoundingClientRect();
      const distX = e.clientX - (rect.left + rect.width / 2);
      const distY = e.clientY - (rect.top + rect.height / 2);

      const distance = Math.sqrt(distX * distX + distY * distY);

      // If mouse gets too close, robot runs away
      if (distance < 250) {
        const angle = Math.atan2(distY, distX);
        const escapeX = Math.cos(angle + Math.PI) * 180;
        const escapeY = Math.sin(angle + Math.PI) * 180;

        gsap.to(robot, {
          x: escapeX,
          y: escapeY,
          duration: 0.4,
          overwrite: 'auto',
          ease: "power2.out"
        });

        this.isMoving = true;
        setTimeout(() => {
          this.isMoving = false;
          gsap.to(robot, {
            x: 0,
            y: 0,
            duration: 1.2,
            ease: "elastic.out"
          });
        }, 2500);
      }
    });
  },

  showMessage(text) {
    if (!this.element) return;

    let speech = this.element.querySelector('.robot-speech');
    if (!speech) {
      speech = document.createElement('div');
      speech.className = 'robot-speech';
      this.element.appendChild(speech);
    }

    speech.textContent = text;
    speech.classList.add('show');

    gsap.to(speech, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: "back.out"
    });

    gsap.delayedCall(3, () => {
      gsap.to(speech, {
        opacity: 0,
        y: 10,
        duration: 0.3,
        ease: "back.in",
        onComplete: () => {
          speech.classList.remove('show');
        }
      });
    });
  },

  getMessageForSlide(slideNum) {
    const key = `slide${slideNum}`;
    if (this.messages[key]) {
      return this.messages[key][Math.floor(Math.random() * this.messages[key].length)];
    }
    return this.messages.default[Math.floor(Math.random() * this.messages.default.length)];
  },

  onSlideChange(slideNum) {
    this.currentSlide = slideNum;

    if (slideNum % 5 === 0 && slideNum !== 1) {
      setTimeout(() => {
        this.showMessage(this.getMessageForSlide(slideNum));
      }, 500);
    }
  },

  setupEventListeners() {
    if (this.element) {
      this.element.addEventListener('click', () => {
        this.showMessage(this.getMessageForSlide(this.currentSlide));
      });
    }
  }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    robotAssistant.init();
  });
} else {
  robotAssistant.init();
}
