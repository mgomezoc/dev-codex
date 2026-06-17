# 🎨 Visual Features Checklist

Guía rápida de qué verás en navegador que antes NO estaba.

## 🎯 Abre http://localhost:8000/index.html

### Slide 1 (Portada)
- [ ] H1 "IA para programar" con glow text más intenso
- [ ] Logo de One Card
- [ ] Robot en bottom-right

### Slide 3 (La IA no es magia)
- [ ] **NUEVO:** Meme visible con hover effect
- [ ] Lista con items que aparecen UNO A UNO (stagger animation)
- [ ] Cada item tiene:
  - Borde LEFT cyan
  - Fondo sutil cyan
  - Hover: se corre a la derecha + glow
- [ ] Robot posicionado en bottom-right corner (no arriba)

### Slide 6 (Antes de pedir)
- [ ] **NUEVO:** Blockquote rojo "Nunca, NUNCA..." con warning style
- [ ] Pro tip con 💡 emoji al inicio

### Slide 8 (Tokens)
- [ ] **NUEVO:** Blockquote con pro tip "Si no lo usarías tú..."
- [ ] 💡 emoji al inicio

### Slide 9 (Prompt flojo)
- [ ] **NUEVO:** Meme grande
- [ ] Meme tiene hover: scale + glow + inclinación

### Slide 10 (Prompt útil)
- [ ] Bloque de código CON HIGHLIGHTING REAL
- [ ] Colores: keywords azul, strings verde, comments gris
- [ ] NO es gris mono como antes
- [ ] Código se ve como VSCode

### Slide 13 (Reglas permanentes)
- [ ] **NUEVO:** Blockquote pro tip "Esta estructura te ahorra 40%..."
- [ ] 💡 emoji

### Slides 15+ (Código blocks)
- [ ] **HEADER VSCode STYLE:** "▮ ● ● ●" en la parte superior
- [ ] Borde LEFT azul INTENSO
- [ ] Sombra profunda con glow azul
- [ ] Hover: border cambia a cyan claro + sombra se expande
- [ ] Syntax highlighting REAL en cada bloque

### Slide 24 (NUEVO: Demo Tips)
- [ ] Slide completamente nuevo
- [ ] Lista con checkboxes
- [ ] Última línea es blockquote con pro tip

### Slide 32 (NUEVO: Checklist)
- [ ] Slide completamente nuevo
- [ ] Checklist visual con [ ] items
- [ ] Última línea: aviso importante en bold

## 🎬 Animaciones que verás

### Cuando ENTRAS a un slide:
```
1. Listas: items aparecen uno a uno (50ms cada uno)
   Efecto: slide.active → animation-delay escalonado
   
2. Números: si hay "50M" o similar, cuenta desde 0
   Efecto: counter-number class → animateCounter()
   
3. Imágenes: aparecen con blur → nitidez
   Efecto: imageBlurUp animation
   
4. Código: Prism highlighting se aplica automáticamente
```

### Cuando haces HOVER:
```
- Listas: item → traslación derecha + glow azul
- Código inline: border brilla + sombra se expande
- Memes: scale 1.02 + rotación -0.5deg + glow
- Tablas: filas resaltan con cyan accent
```

### Cuando NAVEGAS entre slides:
```
- Fade smooth de slide anterior
- Nuevos efectos se aplican automáticamente
- Transiciones CSS (0.3s ease)
```

## 🔍 Detalles pequeños pero visibles

**Scrollbar en código:**
- Oscuro con accent cyan al hover

**Terminal $ prompt:**
- Si es bash/shell, aparece `$ ` en cyan

**Prism Theme Colors:**
```
Keyword:     cyan (#7dd3fc)
String:      verde (#86efac)
Comment:     gris (#6b7280)
Function:    amarillo (#fbbf24)
Number:      rojo (#f87171)
Operator:    púrpura (#a78bfa)
```

**Box Shadows:**
- Código: `0 25px 70px rgba(0,0,0,0.6), 0 0 40px rgba(51,196,255,0.15)`
- Pro tips: similar pero con menos intensidad

## 📱 Responsive (aunque es presentation)

- En móvil (390px): elementos se ajustan
- Memes escalan
- Código scrollea horizontalmente
- Animaciones mantienen timing

## ✨ Easter Eggs

Si miras bien verás:
- Memes con efecto de rotación sutil
- Números que cuentan en tiempo real
- Blockquotes con estilos diferenciados por contexto
- Code blocks con "header de IDE" simulado

## 🎥 Cómo Capturar Esto en Screenshots

Si quieres grabar para demos:

```bash
# Opción 1: Recording manual
# Open DevTools, emulate device, screen record

# Opción 2: Script de capture por slide
# (No implementado aún, pero posible)

# Mejor: Ensaya en vivo 1-2 veces
```

## 🚨 Si algo NO se ve:

Verifica:
1. **Internet:** Prism.js viene de CDN
   → Sin CDN: syntax highlighting desaparece (pero código sigue)
   
2. **Browser:** Firefox/Chrome últimas versiones OK
   → IE11: animations probablemente no funcionen
   
3. **Cache:** Ctrl+Shift+R para limpiar cache
   → Especialmente si editaste CSS
   
4. **Build:** Verificar que ejecutaste `npm run build`
   → Sin build: HTML viejo sin cambios

## 🎬 Demo de Features (Para enseñar a otros)

Script de 2 minutos:

```
1. "Mirá, antes el código era gris monotono"
   → Mostrar Slide 10 (Prompt útil)
   → "Ahora tiene colores reales, como VSCode"
   
2. "Las listas aparecen una por una"
   → Ir a Slide 3
   → "Ves? Momentum. Mantiene atención"
   
3. "Y si pasas mouse sobre un meme..."
   → Hover sobre meme slide 9
   → "Sutil, profesional, no distrae"
   
4. "Pro tips destacados en cada punto importante"
   → Mostrar slides 6, 8, 13
   → "El audience nota: esto está hecho con cuidado"
```

---

**¡Listo para ver tu presentación transformada!** 🚀

Abre el navegador y navega rápido a Slide 3 para ver la diferencia inmediatamente.
