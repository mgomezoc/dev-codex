// Clippy-style robot assistant animation with GSAP

const robotAssistant = {
  slideMessages: {
    1: ["¡Bienvenido a la charla! 🚀"],
    2: ["La IA acelera, no decide sola"],
    3: ["Ahora sí pueden operar sobre el repo"],
    4: ["Plan pequeño, validación clara"],
    5: ["Prepara antes de pedir cambios"],
    6: ["El contexto útil manda"],
    7: ["Prompt flojo, resultado flojo"],
    8: ["La fórmula evita inventos"],
    9: ["Primero entiende el repo"],
    10: ["Reglas permanentes ahorran contexto"],
    11: ["Permisos: controla qué puede tocar"],
    12: ["Skills y agentes ordenan el trabajo"],
    13: ["Debugging requiere método"],
    14: ["Seguridad con alcance y evidencia"],
    15: ["Demo controlado: plan antes de deploy"],
    16: ["Revisa evidencia antes de aceptar"],
    17: ["Empieza pequeño y verificable"],
    18: ["Cierre: dirige la herramienta"]
  },

  currentSlide: 1,
  isMoving: false,
  pendingMessageTimer: null,
  isSpeechVisible: false,
  secretModal: null,
  secretPanel: null,
  secretCloseTimer: null,
  lastFocusedElement: null,

  init() {
    this.createRobot();
    this.setupSecretModal();
    this.startAnimation();
    this.setupEventListeners();
  },

  createRobot() {
    const robot = document.createElement('div');
    const robotImage = document.createElement('img');

    robot.id = 'robot-assistant';
    robot.tabIndex = 0;
    this.setElementAttribute(robot, 'role', 'button');
    this.setElementAttribute(robot, 'aria-label', 'Abrir preguntas secretas de la presentación');
    this.setElementAttribute(robot, 'aria-haspopup', 'dialog');
    this.setElementAttribute(robot, 'aria-controls', 'secret-qa-modal');
    robotImage.src = 'assets/img/robot-completo.png';
    robotImage.alt = '';
    this.setElementAttribute(robotImage, 'aria-hidden', 'true');
    robot.appendChild(robotImage);
    document.body.appendChild(robot);
    this.element = robot;
  },

  setElementAttribute(element, name, value) {
    if (!element) return;

    if (typeof element.setAttribute === 'function') {
      element.setAttribute(name, value);
      return;
    }

    element[name] = value;
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

    // Subtle mouse follow behavior - robot looks at cursor without escaping
    document.addEventListener('mousemove', (e) => {
      const robot = this.element;
      const rect = robot.getBoundingClientRect();
      const distX = e.clientX - (rect.left + rect.width / 2);
      const distY = e.clientY - (rect.top + rect.height / 2);

      const distance = Math.sqrt(distX * distX + distY * distY);

      // Subtle tilt based on mouse position (only if very close)
      if (distance < 400 && distance > 50) {
        const angle = Math.atan2(distY, distX);
        const tilt = (angle / Math.PI) * 3; // Max 3 degrees rotation

        gsap.to(robot, {
          rotation: tilt,
          duration: 0.3,
          overwrite: 'auto',
          ease: "power1.out"
        });
      } else {
        gsap.to(robot, {
          rotation: 0,
          duration: 0.4,
          overwrite: 'auto',
          ease: "power1.out"
        });
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
    this.isSpeechVisible = true;

    gsap.to(speech, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: "back.out"
    });
  },

  hideMessage() {
    if (!this.element) return;

    const speech = this.element.querySelector('.robot-speech');
    if (!speech) return;

    gsap.killTweensOf(speech);
    this.isSpeechVisible = false;

    gsap.to(speech, {
      opacity: 0,
      y: 10,
      duration: 0.25,
      ease: "back.in",
      onComplete: () => {
        speech.classList.remove('show');
      }
    });
  },

  setupSecretModal() {
    if (!document.getElementById) return;

    this.secretModal = document.getElementById('secret-qa-modal');
    this.secretPanel = document.getElementById('secret-qa-panel');

    if (!this.secretModal || !this.secretPanel) {
      return;
    }

    const closeTriggers = this.secretModal.querySelectorAll
      ? Array.from(this.secretModal.querySelectorAll('[data-secret-qa-close]'))
      : [];

    closeTriggers.forEach((trigger) => {
      trigger.addEventListener('click', () => {
        this.closeSecretModal(true);
      });
    });

    document.addEventListener('keydown', (event) => {
      this.handleSecretModalKeydown(event);
    });
  },

  isSecretModalOpen() {
    return Boolean(this.secretModal?.classList?.contains('is-visible'));
  },

  openSecretModal() {
    if (!this.secretModal || !this.secretPanel) {
      return false;
    }

    if (this.secretCloseTimer) {
      clearTimeout(this.secretCloseTimer);
      this.secretCloseTimer = null;
    }

    this.lastFocusedElement = document.activeElement;
    this.hideMessage();
    this.secretModal.classList.remove('hidden');
    this.secretModal.classList.remove('is-closing');
    this.secretModal.classList.add('is-visible');
    document.body?.classList?.add('secret-qa-open');
    this.setElementAttribute(this.secretModal, 'aria-hidden', 'false');

    const focusPanel = () => {
      this.secretPanel?.focus?.();
    };

    if (typeof requestAnimationFrame === 'function') {
      requestAnimationFrame(focusPanel);
    } else {
      setTimeout(focusPanel, 0);
    }

    return true;
  },

  closeSecretModal(restoreFocus = false) {
    if (!this.secretModal) {
      return;
    }

    this.secretModal.classList.remove('is-visible');
    this.secretModal.classList.add('is-closing');
    document.body?.classList?.remove('secret-qa-open');
    this.setElementAttribute(this.secretModal, 'aria-hidden', 'true');

    this.secretCloseTimer = setTimeout(() => {
      if (!this.secretModal?.classList?.contains('is-visible')) {
        this.secretModal?.classList?.add('hidden');
        this.secretModal?.classList?.remove('is-closing');
      }
      this.secretCloseTimer = null;
    }, 260);

    if (restoreFocus) {
      this.lastFocusedElement?.focus?.();
    }
  },

  getSecretModalFocusableElements() {
    if (!this.secretPanel?.querySelectorAll) {
      return [];
    }

    return Array.from(this.secretPanel.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'))
      .filter((element) => !element.disabled);
  },

  handleSecretModalKeydown(event) {
    if (!this.isSecretModalOpen()) {
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      this.closeSecretModal(true);
      return;
    }

    if (event.key !== 'Tab') {
      return;
    }

    const focusableElements = this.getSecretModalFocusableElements();
    if (focusableElements.length === 0) {
      event.preventDefault();
      this.secretPanel?.focus?.();
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus?.();
      return;
    }

    if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus?.();
    }
  },

  getMessageForSlide(slideNum) {
    const messages = this.slideMessages[slideNum];
    if (messages) {
      return messages[Math.floor(Math.random() * messages.length)];
    }
    return "¡Sigue adelante! 💪";
  },

  onSlideChange(slideNum) {
    this.currentSlide = slideNum;
    this.hideMessage();
    if (this.pendingMessageTimer) {
      clearTimeout(this.pendingMessageTimer);
    }

    const nextMessage = this.getMessageForSlide(slideNum);
    this.pendingMessageTimer = setTimeout(() => {
      this.showMessage(nextMessage);
      this.pendingMessageTimer = null;
    }, 2000);
  },

  setupEventListeners() {
    if (this.element) {
      this.element.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (!this.openSecretModal()) {
          this.showMessage(this.getMessageForSlide(this.currentSlide));
        }
      });

      this.element.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') {
          return;
        }

        event.preventDefault();
        this.openSecretModal();
      });
    }
  }
};

if (typeof window !== 'undefined') {
  window.robotAssistant = robotAssistant;
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    robotAssistant.init();
  });
} else {
  robotAssistant.init();
}
