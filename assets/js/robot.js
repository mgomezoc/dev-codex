// Clippy-style robot assistant animation with GSAP

const robotAssistant = {
  slideMessages: {
    1: ["¡Bienvenido a la charla! 🚀"],
    2: ["Esto es lo importante de hoy"],
    3: ["La IA no es magia, pero se acerca 😄"],
    4: ["Codex y Claude son más que chats"],
    5: ["Mi flujo de trabajo diario"],
    6: ["Primero prepara, luego pide"],
    7: ["El contexto es todo en IA"],
    8: ["Los tokens son la moneda de la IA"],
    9: ["Un prompt flojo = resultado flojo"],
    10: ["La fórmula del prompt ganador"],
    11: ["Mi secreto para mejores resultados"],
    12: ["Entiende primero, luego modifica"],
    13: ["No todo va en el prompt"],
    14: ["AGENTS.md: el director de orquesta"],
    15: ["CLAUDE.md: memoria del proyecto"],
    16: ["Permisos: controla qué puede hacer"],
    17: ["Skills: instrucciones reutilizables"],
    18: ["Divide el trabajo entre agentes"],
    19: ["Los subagentes tienen límites"],
    20: ["Opus no siempre es la respuesta"],
    21: ["Debugging requiere paciencia"],
    22: ["Las herramientas realmente actúan"],
    23: ["Git salva vidas (y código)"],
    24: ["Seguridad: lo que NO compartir"],
    25: ["Los errores que sí pasan"],
    26: ["Lo que realmente funciona"],
    27: ["Construyendo AGENTS.md en vivo"],
    28: ["Auditando repos como pro"],
    29: ["Debugging sin romper todo"],
    30: ["La IA refuerza tu proceso"],
    31: ["Empieza aquí mañana"],
    32: ["El final: usa esto con cabeza"],
    33: ["¿Preguntas? ¡Fuego a los cuestionamientos!"]
  },

  currentSlide: 1,
  isMoving: false,
  pendingMessageTimer: null,
  isSpeechVisible: false,

  init() {
    this.createRobot();
    this.startAnimation();
    this.setupEventListeners();
  },

  createRobot() {
    const robot = document.createElement('div');
    robot.id = 'robot-assistant';
    robot.innerHTML = '<img src="assets/img/robot-completo.png" alt="Robot Assistant">';
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
      this.element.addEventListener('click', () => {
        this.showMessage(this.getMessageForSlide(this.currentSlide));
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
