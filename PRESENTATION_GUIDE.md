# 🎯 Guía de Presentación - Developer Edition

Presentación mejorada para impresionar a desarrolladores con features técnicas reales.

## 🚀 Nuevas Features

### 1. **Syntax Highlighting Real**
- Prism.js integrado con tema Dracula
- Detecta automáticamente lenguaje (JavaScript, PHP, SQL, Bash, etc.)
- Line numbers en bloques de código
- Colores consistentes con IDEs populares

**Ubicación:** Todos los bloques `<code>` en slides

### 2. **Animaciones Inteligentes**
- **List Stagger:** Items de listas aparecen uno a uno (50ms entre cada)
- **Blur-up:** Imágenes cargan con blur → nitidez
- **Counter Animations:** Números animan desde 0 al valor final
- **Hover Effects:** Memes y código tienen efectos mejorados

**Trigger:** Automático cuando slide se activa

### 3. **Pro Tips & Warnings**
Blockquotes (>) ahora tienen estilos diferenciados:
```markdown
> Esto aparecerá como pro tip con 💡
```

**Ubicación:** Slides 6, 8, 13 y otros puntos importantes

### 4. **Memes Estratégicos**
Memes posicionados en momentos clave:
- **Slide 3:** Realidad vs Expectativa (meme-1.jpg)
- **Slide 9:** Me vs The AI (meme-2.jpg)

Hover: escala, glow, y efecto de inclinación sutil

### 5. **Demo Ready**
Dos nuevos slides:
- **Slide 24:** Demo Tips - cómo ejecutar demos sin fracasar
- **Slide 32:** Checklist Pre-Presentación

## 📱 Controles

```
→ / ← : Siguiente / Anterior slide
Espacio : Siguiente
Home / End : Primera / Última slide
Enter : Fullscreen
? : Ayuda
```

## 🎬 Cómo Usar para Máximo Impacto

### Antes de Presentar

```bash
# 1. Build final
npm run build

# 2. Verifica en navegador
python -m http.server 8000
# Abre: http://localhost:8000/index.html

# 3. Ensaya 3 veces
# - Navega slides rápido
# - Verifica que Prism highlighting funciona
# - Prueba animaciones (list stagger, etc)

# 4. Prepara demos en otra ventana
# - Terminal limpia
# - IDE con archivos abiertos
# - Prompts en clipboard
```

### Durante la Presentación

**Pacing recomendado:**

| Slide | Duración | Notas |
|-------|----------|-------|
| 1-5 | 5 min | Intro + contexto. Rápido. |
| 6-12 | 8 min | Conceptos. **DEMO 1 aquí** si entra |
| 13-20 | 7 min | Deep dive en reglas. **DEMO 2 después** |
| 21-23 | 5 min | Workflow + práctica |
| 24-32 | 3 min | Tips + checklist + cierre |
| Q&A | 5-10 min | Preguntas, **DEMO 3 en vivo** si piden |

**Técnicas de Presentación:**

1. **Antes de cada slide importante:**
   - "Mirá esto..." (pause 1s)
   - Lee el título en voz alta
   - Explain por qué importa

2. **En slides con código:**
   - Señala con cursor el patrón clave
   - Prism highlighting te ayuda a ver diferencias
   - Los devs notan: "Estos prompts están hechos con cuidado"

3. **En memes:**
   - NO comentes hasta después de que la risa se disuelva
   - Usa como transición: "Esto no es broma, mirá..."

4. **En animaciones:**
   - Pausa 1-2s para que items de lista aparezcan todos
   - Menciona números reales mientras counters animan
   - Beneficio: narrativa en tiempo real

### Demos en Vivo

#### **Demo 1: Prompt Pésimo → Maestro** (5 min)

```
1. Mostrar prompt de 1 línea en pantalla compartida
2. "¿Ven? Vago. Pedir a Codex que lo critique"
3. Mostrar resultado: genérico, sin validaciones
4. Ahora pedir a Codex con prompt maestro (slide 10)
5. Resultado: preciso, listo para copiar
6. "50% menos tokens, 10x mejor resultado"
```

**Prompts pre-copiados:**

```
# PÉSIMO
Haz un dashboard de ventas.

# MAESTRO
Crea un dashboard de resumen de ventas.

Requisitos técnicos:
- Stack: PHP 8.1, Bootstrap 5.3, MySQL
- Datos vienen de tabla ventas (id, producto, monto, fecha)
- Dashboard debe mostrar: total ventas hoy, top 5 productos, gráfico tendencia
- No modificar BD ni permisos actuales
- Usar componentes Bootstrap existentes
- Sin librerías nuevas

Entrega: componente Blade listo para copiar, sin tests (agregaré después)
Riesgos a mencionar: sin cache, sin paginación si muchas rows
```

#### **Demo 2: Auditoría Real** (4 min)

```
1. Abrir repo real en GitHub (no sensible)
2. Pedir a Codex: "Auditoría técnica de este repo. No modifiques."
3. Mientras Codex trabaja (30s), explicar qué busca
4. Mostrar reporte: hallazgos, riesgos, plan
5. "Esto literalmente te ahorra 2 horas de análisis"
```

#### **Demo 3: Generar Reglas** (3 min)

Mejor si lo hacen en Q&A:
```
1. Preguntan: "¿Cómo empiezo con esto en mi proyecto?"
2. Tú: "Perfecto, te muestro. Abre Codex."
3. Pedir: "Proponga CLAUDE.md y AGENTS.md para este repo"
   (señalas un repo público que tengas listo)
4. Codex genera rules contextualizadas
5. "En 2 min tienes la estructura. Después refinas."
```

## 🎨 Customization

### Cambiar colores

Archivo: `assets/css/main.css` (variables CSS):

```css
:root {
  --accent: #33c4ff;      /* Cyan principal */
  --accent-2: #7dd3fc;    /* Cyan claro */
  --success: #22c55e;
  --warning: #f59e0b;
  --danger: #ef4444;
}
```

### Cambiar timing de animaciones

Archivo: `assets/css/enhancements.css`:

```css
/* List stagger - cambiar 0.1s para más/menos velocidad */
.slide-content > ul li:nth-child(1) { animation-delay: 0.1s; }
```

### Agregar más memes

1. Guardar imagen en `assets/img/meme-X.jpg`
2. En slide markdown:
```markdown
![Descripción](assets/img/meme-X.jpg)
```
3. Rebuild: `npm run build`

## 🐛 Troubleshooting

**Prism highlighting no funciona:**
- Verifica que CDN está accesible (sin VPN bloqueada)
- F12 → Console, busca errores de red
- Fallback: syntax highlighting desaparece, pero código sigue legible

**Animaciones lentas:**
- Verifica que no tienes 100 tabs abiertos
- Reduce número de slides (pero no lo hagas 😅)
- Las animaciones usan CSS puro (no JS), muy optimizadas

**Memes no aparecen:**
- Verifica rutas en slides: `assets/img/meme-X.jpg`
- Asegúrate que archivo existe en carpeta
- Rebuild: `npm run build`

## 📊 Métricas

- **File size:** 145KB (index.html completo)
- **Slides:** 36 totales
- **Duración estimada:** 35-45 minutos
- **Demos:** 3 (5+4+3 min = 12 min)
- **Q&A Buffer:** 5-10 min

## 🎯 Objetivos Cumplidos

✅ Syntax highlighting profesional (Prism.js)
✅ Animaciones sutiles pero visibles
✅ Memes en momentos estratégicos
✅ Pro tips destacados
✅ Demos ready-to-go
✅ Checklist para no olvidar nada
✅ Tema visual tech/developer
✅ Performance optimizado

## 🚀 Siguientes Pasos (Opcional)

- [ ] Grabar demos como backup MP4
- [ ] Crear QR a repo GitHub
- [ ] Configurar polling/quiz interactivo
- [ ] Agregar contador de tiempo en slides
- [ ] Versión imprimible (PDF con speaker notes)

---

**¿Listo para impresionar?** 🎬

Ejecuta:
```bash
python -m http.server 8000
```

Abre: `http://localhost:8000/index.html`

¡Y a presentar! 🚀
