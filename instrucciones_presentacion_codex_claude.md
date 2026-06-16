# Instrucciones para construir presentación HTML

**Tema:** Cómo uso Codex y Claude para programar en mi día a día  
**Audiencia:** desarrolladores, equipo técnico y personas que trabajan con proyectos de software  
**Tono:** natural, relajado, claro, práctico. No sonar académico ni como vendedor de IA.  
**Objetivo:** que la audiencia entienda cómo usar IA en desarrollo de forma útil, segura y profesional.

---

## Instrucciones generales para Claude

Este documento debe usarse como guía para construir una presentación en HTML.

### Estilo de presentación

- Usar lenguaje simple, directo y natural.
- Evitar frases demasiado formales como “en el presente documento” o “a continuación se expondrá”.
- El tono debe sentirse como una plática técnica entre compañeros de trabajo.
- No saturar las diapositivas. El contenido más largo debe ir en notas del expositor.
- Usar mucho contenido visual:
  - diagramas de flujo
  - tarjetas comparativas
  - bloques de código
  - listas cortas
  - ejemplos de prompt
  - checklists
- Cada slide debe tener una idea principal.
- Usar animaciones sutiles si la presentación HTML lo permite, pero sin exagerar.
- Evitar emojis en exceso. Si se usan, máximo 1 por slide y solo cuando aporte claridad.

### Estilo visual sugerido

Crear una presentación moderna, tipo developer talk.

Sugerencia de diseño:

```css
:root {
  --bg: #0f172a;
  --panel: #111827;
  --panel-soft: #1f2937;
  --text: #f8fafc;
  --muted: #94a3b8;
  --accent: #38bdf8;
  --accent-2: #a78bfa;
  --success: #22c55e;
  --warning: #f59e0b;
  --danger: #ef4444;
}
```

Usar:

- Fondo oscuro.
- Tarjetas con bordes suaves.
- Tipografía limpia.
- Código con fondo diferenciado.
- Íconos simples para representar: contexto, seguridad, tokens, agentes, debugging, Git.

### Estructura técnica sugerida

Cada diapositiva puede ser un `<section class="slide">`.

Dentro de cada slide usar:

```html
<section class="slide" data-slide="01">
  <h1>Título</h1>
  <p class="subtitle">Subtítulo</p>
  <div class="content">...</div>
  <aside class="notes">Notas del expositor...</aside>
</section>
```

Las notas del expositor no necesariamente deben mostrarse en pantalla. Pueden quedar en el HTML como comentarios o dentro de un bloque oculto.

### Duración sugerida

Presentación pensada para **45 a 60 minutos**.

- Introducción: 5 min
- Conceptos base: 15 min
- Uso práctico: 20 min
- Demo en vivo: 10 a 15 min
- Cierre y preguntas: 5 min

---

# Estructura secuencial de la presentación

---

## Slide 01 — Portada

### Título visible

**IA para programar en el día a día**

### Subtítulo visible

Cómo uso Codex y Claude sin que hagan cosas locas

### Texto visible

```text
Codex + Claude + buenas prácticas + criterio técnico
```

### Notas del expositor

Abrir con algo natural:

> La idea de esta plática no es venderles humo ni decir que la IA ya programa sola. La idea es enseñarles cómo la uso de forma práctica, dónde sí ayuda, dónde puede meter la pata y cómo podemos controlarla mejor en un ambiente de trabajo real.

Mencionar que la presentación será práctica, con ejemplos y una demo en vivo.

### Diseño sugerido

- Fondo oscuro.
- Título grande.
- Debajo, una línea tipo terminal:

```bash
$ codex analyze project
$ claude debug issue
```

- Mostrar dos tarjetas: `Codex` y `Claude`.

---

## Slide 02 — Qué se van a llevar

### Título visible

**Qué quiero que se lleven de esta plática**

### Texto visible

- Cómo usar IA sin depender ciegamente de ella.
- Cómo darle buen contexto.
- Cómo escribir mejores prompts.
- Cómo configurar reglas por proyecto.
- Cómo usarla para análisis, debugging y documentación.
- Qué cosas evitar en el trabajo.

### Notas del expositor

Explicar que no se trata de memorizar comandos, sino de entender una forma de trabajo.

Mensaje clave:

> Si al final de la presentación alguien puede abrir un proyecto, crear reglas, pedir una auditoría y revisar cambios con más seguridad, ya cumplimos.

### Diseño sugerido

Usar checklist en dos columnas.

---

## Slide 03 — Primero: bajemos la expectativa mágica

### Título visible

**La IA no es magia**

### Texto visible

```text
No reemplaza criterio.
No entiende tu negocio si no se lo explicas.
No siempre tiene razón.
No debería tocar todo sin límites.
```

### Notas del expositor

Decirlo de forma relajada:

> La IA sí ayuda bastante, pero hay que tratarla como un compañero muy rápido que a veces se emociona de más. Si no le das límites, puede hacer cambios que compilan, pero rompen reglas del negocio.

Idea principal:

- La IA acelera.
- Pero el responsable sigue siendo el desarrollador.

### Diseño sugerido

Usar una tarjeta grande con la frase:

> La IA acelera el trabajo, pero no absorbe la responsabilidad.

---

## Slide 04 — Qué son Codex y Claude Code en la práctica

### Título visible

**No son solo chats para pedir código**

### Texto visible

Codex y Claude Code pueden:

- Leer archivos del proyecto.
- Entender estructura del repo.
- Editar código.
- Ejecutar comandos.
- Revisar errores.
- Generar documentación.
- Trabajar con herramientas externas.

### Notas del expositor

Explicar con palabras simples:

> Antes usábamos la IA copiando y pegando pedazos de código. Ahora estas herramientas pueden entrar al proyecto, revisar carpetas, abrir archivos, correr comandos y proponer cambios. Eso cambia mucho el flujo de trabajo.

Aclarar:

- Codex CLI corre localmente desde terminal y puede leer, cambiar y ejecutar código en el directorio seleccionado.
- Claude Code también trabaja con el codebase, edita archivos, corre comandos y se integra con herramientas de desarrollo.

### Diseño sugerido

Crear diagrama:

```text
Chat suelto  ->  Copiar / pegar
Agente de código -> Lee repo / Edita / Ejecuta / Valida
```

### Fuente base

- OpenAI Codex CLI: https://developers.openai.com/codex/cli
- Claude Code Overview: https://code.claude.com/docs/en/overview

---

## Slide 05 — Mi flujo real de trabajo

### Título visible

**Cómo lo uso normalmente**

### Texto visible

```text
1. Entender el proyecto
2. Documentar lo importante
3. Crear reglas
4. Planear cambios
5. Implementar por partes
6. Revisar diff
7. Probar
8. Documentar lo cambiado
```

### Notas del expositor

Comentar:

> Casi nunca empiezo con “hazme esta pantalla”. Normalmente empiezo con “analiza el proyecto y dime qué encontraste”. Si la IA no entiende el sistema, cualquier código que genere es una apuesta.

Explicar que el flujo correcto no es:

```text
Prompt -> Código -> Producción
```

Sino:

```text
Contexto -> Plan -> Cambio pequeño -> Validación -> Revisión humana
```

### Diseño sugerido

Diagrama horizontal con 8 pasos. Resaltar con color el paso 1: “Entender”.

---

## Slide 06 — Antes de pedir código: preparar el terreno

### Título visible

**Antes de soltarle una tarea a la IA**

### Texto visible

Revisar:

- Rama de Git limpia.
- Proyecto en carpeta correcta.
- Dependencias instaladas.
- Comandos de build/test conocidos.
- Reglas del proyecto disponibles.
- Archivos sensibles protegidos.

### Notas del expositor

Explicar:

> Muchos errores que parecen de la IA realmente son de configuración: estaba en la carpeta incorrecta, no sabía correr el proyecto, no conocía las reglas, o tenía acceso a archivos que no debía tocar.

Consejo:

- Trabajar siempre en una rama separada.
- No correr agentes directo en producción.
- Tener claro cómo regresar atrás.

### Diseño sugerido

Checklist tipo “pre-flight check”.

---

## Slide 07 — El contexto es el combustible

### Título visible

**La IA trabaja con contexto**

### Texto visible

```text
Prompt
+ conversación
+ archivos
+ documentación
+ reglas
+ errores/logs
= contexto útil
```

### Notas del expositor

Explicar de forma simple:

> La IA no sabe automáticamente cómo funciona nuestro negocio, nuestras validaciones o nuestras decisiones técnicas. Hay que darle contexto. Mientras más claro y relevante sea el contexto, mejor trabaja.

Ejemplo:

Malo:

```text
Arregla este módulo.
```

Mejor:

```text
Analiza el módulo de usuarios.
Revisa controlador, modelo, vistas y rutas.
No modifiques nada todavía.
Primero dime cómo funciona y qué riesgos ves.
```

### Diseño sugerido

Usar gráfico tipo embudo:

```text
Archivos + reglas + logs + objetivo -> IA -> respuesta útil
```

### Fuente base

- OpenAI Prompt Engineering, sección de contexto: https://developers.openai.com/api/docs/guides/prompt-engineering
- Claude Context Windows: https://platform.claude.com/docs/en/build-with-claude/context-windows

---

## Slide 08 — Tokens: la memoria temporal

### Título visible

**Tokens: la memoria que se va llenando**

### Texto visible

Todo consume tokens:

- Prompt
- Código
- Logs
- Respuestas anteriores
- Archivos leídos
- Instrucciones del proyecto

### Notas del expositor

Explicar:

> Los tokens son como pedacitos de texto que la IA procesa. Si le metemos demasiada información, llenamos la ventana de contexto. Cuando eso pasa, empieza a resumir, compactar o perder detalles.

Puntos importantes:

- Más contexto no siempre significa mejor.
- Contexto relevante sí ayuda.
- Contexto innecesario estorba y cuesta.
- Dividir tareas grandes mejora resultados.

Ejemplo práctico:

> En vez de pedirle “analiza todo el sistema y reescríbelo”, conviene pedir “analiza primero el módulo de clientes, documenta lo que hace y propón mejoras”.

### Diseño sugerido

Mostrar una barra de memoria:

```text
[ Prompt ][ Archivos ][ Logs ][ Historia ][ Respuesta ]  85%
```

### Fuente base

- Claude Context Windows: https://platform.claude.com/docs/en/build-with-claude/context-windows
- Claude Code Costs: https://code.claude.com/docs/en/costs
- OpenAI Prompt Engineering: https://developers.openai.com/api/docs/guides/prompt-engineering

---

## Slide 09 — Cómo se ve un prompt flojo

### Título visible

**Prompt flojo = resultado flojo**

### Texto visible

```text
Haz un dashboard para ventas.
```

Problemas:

- No dice de dónde salen los datos.
- No dice diseño.
- No dice validaciones.
- No dice permisos.
- No dice si puede modificar archivos.
- No dice cómo probar.

### Notas del expositor

Explicar:

> Este tipo de prompt obliga a la IA a rellenar huecos. Y cuando rellena huecos, inventa. A veces inventa bien, pero en sistemas reales eso es peligroso.

Idea clave:

> Si tú no defines el alcance, la IA lo define por ti.

### Diseño sugerido

Mostrar prompt en bloque de código con una etiqueta roja: “demasiado abierto”.

---

## Slide 10 — Cómo se ve un prompt útil

### Título visible

**Prompt útil = contexto + límites + resultado esperado**

### Texto visible

```text
Analiza el módulo de ventas.

Objetivo:
Crear un dashboard de resumen.

Antes de modificar:
1. Identifica archivos relacionados.
2. Explica de dónde salen los datos.
3. Propón diseño y métricas.
4. Lista riesgos.

Restricciones:
- No agregar librerías nuevas.
- Usar Bootstrap 5.3.
- No tocar base de datos todavía.
- No modificar permisos.

Resultado esperado:
Un plan de implementación por fases.
```

### Notas del expositor

Comentar:

> Este prompt no es más largo por capricho. Es más claro. Le dice qué hacer, qué no hacer y cómo quiero recibir el resultado.

Fórmula sencilla:

```text
Contexto + objetivo + restricciones + salida esperada
```

### Diseño sugerido

Dividir el prompt en cuatro colores:

- Contexto
- Objetivo
- Restricciones
- Resultado esperado

---

## Slide 11 — La fórmula que más uso

### Título visible

**Mi fórmula para pedirle trabajo a la IA**

### Texto visible

```text
1. Rol
2. Contexto
3. Objetivo
4. Alcance
5. Restricciones
6. Criterios de éxito
7. Formato de respuesta
```

### Notas del expositor

Explicar cada punto con lenguaje simple:

- **Rol:** qué tipo de ayuda necesito. Ejemplo: “Actúa como auditor técnico”.
- **Contexto:** qué proyecto, módulo o problema estamos viendo.
- **Objetivo:** qué quiero lograr.
- **Alcance:** qué sí puede tocar.
- **Restricciones:** qué no debe hacer.
- **Criterios de éxito:** cómo sé que terminó bien.
- **Formato:** plan, tabla, checklist, diff, reporte, etc.

Frase para decir:

> Mientras más específica sea la tarea, menos espacio le dejamos a la IA para inventar.

### Diseño sugerido

Tarjeta central con la fórmula. Debajo, un ejemplo pequeño.

### Fuente base

- OpenAI Prompt Engineering recomienda estructurar identidad, instrucciones, ejemplos y contexto.
- Anthropic Prompt Engineering recomienda claridad, ejemplos, estructuración y técnicas para sistemas agénticos.

---

## Slide 12 — Prompt maestro para empezar un proyecto

### Título visible

**Prompt maestro: primero entender, luego tocar**

### Texto visible

```text
Analiza este proyecto antes de modificar cualquier archivo.

Quiero que identifiques:
- Qué hace el sistema.
- Tecnologías usadas.
- Estructura de carpetas.
- Módulos principales.
- Flujo de negocio.
- Comandos para correr, probar y construir.
- Riesgos técnicos.
- Archivos que no deberían tocarse sin autorización.

No hagas cambios todavía.
Primero entrega un reporte claro y un plan por fases.
```

### Notas del expositor

Explicar:

> Este es de los prompts que más conviene tener guardado. Sirve para proyectos nuevos, migraciones, auditorías y cuando vamos a meter a la IA en un repo que no conoce.

Recomendación:

- Usarlo antes de pedir features.
- Pedir evidencia: nombres de archivos, rutas y comandos reales.
- No aceptar recomendaciones que no estén sustentadas en el repo.

### Diseño sugerido

Bloque grande de código con botón visual “copiar prompt”.

---

## Slide 13 — Reglas permanentes del proyecto

### Título visible

**No todo debe ir en el prompt**

### Texto visible

Usar archivos de reglas:

- `AGENTS.md` para Codex.
- `CLAUDE.md` para Claude Code.
- `.claude/settings.json` para permisos y configuración.
- `.claude/agents/` para subagentes.
- `.claude/skills/` para skills.

### Notas del expositor

Explicar:

> Si tengo que repetir lo mismo en cada prompt, algo estoy haciendo mal. Mejor lo dejo escrito en archivos del proyecto para que la IA lo cargue cada vez.

Ejemplos de reglas:

- Framework usado.
- Estándares de código.
- Comandos de test.
- Convenciones de carpetas.
- Cosas prohibidas.
- Proceso para revisar cambios.

### Diseño sugerido

Mostrar estructura tipo árbol:

```text
project/
├─ AGENTS.md
├─ CLAUDE.md
├─ .claude/
│  ├─ settings.json
│  ├─ agents/
│  └─ skills/
```

### Fuente base

- Codex AGENTS.md: https://developers.openai.com/codex/guides/agents-md
- Claude Code settings y CLAUDE.md: https://code.claude.com/docs/en/settings

---

## Slide 14 — AGENTS.md: reglas para Codex

### Título visible

**AGENTS.md: instrucciones que Codex lee antes de trabajar**

### Texto visible

```markdown
# Reglas del proyecto

## Stack
- PHP 8.1
- CodeIgniter 4
- Bootstrap 5.3
- MySQL

## Reglas
- No tocar producción.
- No agregar dependencias sin justificar.
- No eliminar código sin explicar impacto.
- Antes de modificar, analizar archivos relacionados.
- Después de modificar, ejecutar pruebas relevantes.

## Comandos
- php spark serve
- php spark test
- composer test
```

### Notas del expositor

Explicar:

> Codex puede leer `AGENTS.md` antes de hacer trabajo. Lo bueno es que podemos tener reglas globales, reglas del repo y reglas más específicas por carpeta.

Puntos importantes:

- No debe ser enorme.
- Debe ser práctico.
- Debe decir cómo correr, probar y revisar.
- Debe incluir “do-not rules”.
- Si Codex se equivoca varias veces en algo, se actualiza el `AGENTS.md`.

### Diseño sugerido

Mostrar archivo markdown en estilo editor de código.

### Fuente base

- OpenAI indica que Codex lee `AGENTS.md` antes de trabajar y permite capas globales/proyecto/subcarpeta.
- OpenAI recomienda mantener `AGENTS.md` corto, práctico y actualizado con errores recurrentes.

---

## Slide 15 — CLAUDE.md: memoria de proyecto para Claude

### Título visible

**CLAUDE.md: instrucciones que Claude carga al iniciar**

### Texto visible

```markdown
# CLAUDE.md

## Cómo trabajar en este proyecto

- Primero analiza, después modifica.
- No tocar `.env`, credenciales ni dumps.
- Usar los patrones existentes.
- Mantener nombres en español si el módulo ya está en español.
- No dejar placeholders ni mensajes de migración.
- Al final, resumir archivos modificados y pruebas ejecutadas.
```

### Notas del expositor

Explicar:

> Claude Code puede cargar instrucciones desde `CLAUDE.md`. Ahí podemos poner contexto estable: arquitectura, decisiones técnicas, comandos, reglas de negocio y checklists.

No meter:

- contraseñas
- tokens
- credenciales
- secretos
- dumps sensibles

Recomendación:

> `CLAUDE.md` debe explicar cómo trabajar, no convertirse en una novela interminable.

### Diseño sugerido

Editor dividido:

- Izquierda: `CLAUDE.md`
- Derecha: “Claude inicia sesión con estas reglas cargadas”.

### Fuente base

- Claude Code documenta que `CLAUDE.md` contiene instrucciones y contexto cargados al inicio.

---

## Slide 16 — Configuración y permisos

### Título visible

**Permisos: no todo debe estar abierto**

### Texto visible

Configurar límites:

- Qué puede leer.
- Qué puede editar.
- Qué comandos puede correr.
- Qué archivos están prohibidos.
- Cuándo debe pedir aprobación.

### Notas del expositor

Explicar:

> En proyectos personales a veces abrimos todo porque queremos avanzar rápido. En trabajo, eso no siempre es buena idea. La IA debe tener permisos proporcionales a la tarea.

Ejemplo de Claude:

```json
{
  "permissions": {
    "deny": [
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./secrets/**)",
      "Read(./config/credentials.json)"
    ]
  }
}
```

Ejemplo de Codex:

- Usar sandbox y approvals al inicio.
- No usar modo sin sandbox salvo ambiente aislado.
- Configurar `model`, `approval_policy`, `sandbox_mode` y `model_reasoning_effort` según necesidad.

### Diseño sugerido

Tarjetas:

- Seguro
- Cuidado
- Peligroso

### Fuente base

- Claude Code permite negar lectura de archivos sensibles con `permissions.deny`.
- Codex documenta aprobación y sandbox como controles clave.

---

## Slide 17 — Skills: mencionarlo sin clavarnos

### Título visible

**Skills: instrucciones reutilizables**

### Texto visible

Una skill sirve para guardar un flujo repetible.

Ejemplos:

- Revisar código.
- Debuggear.
- Generar documentación.
- Preparar deploy.
- Validar UI.

### Notas del expositor

Explicar sin profundizar demasiado:

> Una skill es como decir: “cuando te pida esta tarea, sigue este procedimiento”. Sirve cuando ya copias y pegas el mismo checklist muchas veces.

Ejemplo:

```text
/review-pr
/debug
/run
/verify
```

Aclarar:

- No hay que empezar creando skills para todo.
- Primero detectar tareas repetidas.
- Luego convertirlas en skill.

### Diseño sugerido

Mostrar una tarjeta tipo:

```text
Skill = instrucciones + recursos + scripts opcionales
```

### Fuente base

- Codex skills empaquetan instrucciones, recursos y scripts opcionales.
- Claude Code skills se crean con `SKILL.md` y se cargan cuando son relevantes.

---

## Slide 18 — Agentes y subagentes

### Título visible

**Agentes: dividir el trabajo por rol**

### Texto visible

Un agente puede tener:

- Objetivo propio.
- Reglas propias.
- Herramientas permitidas.
- Modelo específico.
- Memoria o contexto especializado.

### Notas del expositor

Explicar:

> En vez de pedirle todo a una sola IA, podemos dividir el trabajo. Un agente analiza, otro implementa, otro revisa y otro documenta.

Ejemplo mental:

```text
Arquitecto -> planea
Desarrollador -> implementa
QA -> prueba
Auditor -> revisa riesgos
Documentador -> actualiza docs
```

Aclarar:

- No siempre necesitamos agentes.
- Para tareas simples, un buen prompt basta.
- Para tareas grandes, ayudan a separar responsabilidades.

### Diseño sugerido

Diagrama de equipo alrededor del proyecto.

### Fuente base

- Codex permite subagents y gestión con `/agent`.
- Claude Code permite subagentes como archivos Markdown con YAML frontmatter.

---

## Slide 19 — Ejemplo simple de subagente

### Título visible

**Un subagente puede tener límites**

### Texto visible

```markdown
---
name: safe-researcher
description: Analiza el código sin modificar archivos
tools: Read, Grep, Glob, Bash
---

Tu trabajo es investigar el proyecto, encontrar archivos relevantes,
explicar riesgos y proponer un plan. No edites archivos.
```

### Notas del expositor

Explicar:

> Este agente puede investigar, pero no escribir. Esto es útil cuando queremos análisis sin riesgo de que toque archivos.

Punto clave:

- Para auditoría: read-only.
- Para implementación: permisos controlados.
- Para QA: permisos para correr tests.
- Para documentación: permisos de edición solo en docs.

### Diseño sugerido

Mostrar el bloque YAML con etiquetas visuales:

- `name`
- `description`
- `tools`
- `prompt`

### Fuente base

- Claude Code permite restringir herramientas con `tools` o `disallowedTools`.

---

## Slide 20 — Elegir el modelo correcto

### Título visible

**No siempre necesitas el modelo más pesado**

### Texto visible

| Tarea | Modelo sugerido |
|---|---|
| Auditoría compleja | Opus / modelo fuerte |
| Arquitectura | Opus / modelo fuerte |
| Debug difícil | Opus / razonamiento alto |
| Código repetitivo | Sonnet / modelo medio |
| Búsqueda rápida | Haiku / modelo ligero |
| Documentación | Sonnet o GPT |
| Revisión sencilla | Sonnet |

### Notas del expositor

Explicar:

> Si la tarea requiere mucho razonamiento, uso un modelo más fuerte. Si es algo repetitivo o pequeño, no necesito gastar lo más caro o lento.

Regla simple:

```text
Más incertidumbre -> modelo más fuerte
Más repetición -> modelo más rápido
Más riesgo -> más razonamiento y más revisión
```

Mencionar:

- Codex permite configurar modelo y esfuerzo de razonamiento.
- Claude Code permite cambiar modelo y configurar modelos/fallbacks.
- Los subagentes también pueden tener modelo propio.

### Diseño sugerido

Tabla clara, sin demasiada explicación.

### Fuente base

- Codex permite ajustar `model_reasoning_effort`.
- Claude Code permite configurar `model`, `fallbackModel` y `effortLevel`.

---

## Slide 21 — Debugging con IA

### Título visible

**Debugging: no le pidas “arréglalo” de golpe**

### Texto visible

Flujo recomendado:

```text
Error
↓
Hipótesis
↓
Validación
↓
Cambio mínimo
↓
Prueba
↓
Resumen
```

### Notas del expositor

Explicar:

> Cuando hay un error, la tentación es decirle “arréglalo”. Pero eso puede hacer que cambie cosas sin entender. Primero conviene pedir diagnóstico.

Prompt recomendado:

```text
Analiza este error.
No modifiques archivos todavía.
Dame:
1. Posibles causas ordenadas por probabilidad.
2. Archivos que revisarías.
3. Comandos para validar.
4. Cambio mínimo recomendado.
```

Después:

```text
Implementa únicamente la solución más probable.
No hagas refactor general.
Ejecuta la prueba relevante y resume el diff.
```

### Diseño sugerido

Diagrama vertical con iconos de bug, lupa, llave inglesa y check.

---

## Slide 22 — Herramientas que ya tienen las IAs

### Título visible

**Ya no solo responden: también operan**

### Texto visible

Pueden usar herramientas como:

- Lectura de archivos.
- Búsqueda en el repo.
- Edición de archivos.
- Terminal/Bash/PowerShell.
- Git.
- MCP.
- Navegador o herramientas externas.
- Skills y comandos.

### Notas del expositor

Explicar:

> La diferencia fuerte es que ya no estamos en modo “te pego código y me respondes”. Ahora la IA puede operar sobre el entorno. Eso es poderoso, pero también necesita reglas.

Aclarar:

- Herramientas con permisos amplios = más capacidad y más riesgo.
- Herramientas read-only = menor riesgo, útiles para auditorías.
- MCP permite conectar herramientas externas, pero debe configurarse con cuidado.

### Diseño sugerido

Mostrar un mapa:

```text
IA -> Repo
IA -> Terminal
IA -> Git
IA -> Browser
IA -> Docs
IA -> Tickets
```

### Fuente base

- Claude Code menciona integración con herramientas y MCP.
- Codex CLI puede inspeccionar repos, editar y correr comandos.

---

## Slide 23 — Git es el cinturón de seguridad

### Título visible

**Nunca sin Git**

### Texto visible

Buenas prácticas:

- Rama nueva por tarea.
- Commits pequeños.
- Revisar diff.
- No mezclar cambios.
- Probar antes de merge.
- Documentar decisiones.

### Notas del expositor

Explicar:

> La IA puede hacer muchos cambios rápido. Justamente por eso Git se vuelve más importante, no menos.

Frase sugerida:

> Si no puedes revisar el diff, no deberías aceptar el cambio.

Recomendación:

- Pedirle a la IA resumen por archivo.
- Pedir riesgos introducidos.
- Pedir comandos ejecutados.
- Pedir pendientes.

Prompt útil:

```text
Revisa el diff actual.
Explícame archivo por archivo qué cambió,
por qué cambió,
qué riesgo tiene
y cómo lo puedo probar.
```

### Diseño sugerido

Mostrar un diff ficticio y un checklist.

---

## Slide 24 — Seguridad en ambiente laboral

### Título visible

**Qué no debemos compartir ni permitir**

### Texto visible

No compartir:

- Contraseñas.
- Tokens.
- Llaves privadas.
- `.env`.
- Datos personales innecesarios.
- Dumps completos sin anonimizar.
- Acceso directo a producción.

### Notas del expositor

Explicar:

> En el trabajo, el problema no es solo si la IA responde bien. También importa qué información le estamos dando y qué permisos le estamos dejando.

Recomendaciones:

- Usar datos fake para pruebas.
- Bloquear archivos sensibles.
- Revisar configuración de permisos.
- Separar ambiente local, staging y producción.
- No dejar que haga deploy automático sin revisión.

### Diseño sugerido

Tarjeta roja de “No pasar” y lista corta.

---

## Slide 25 — Errores comunes al usar IA para programar

### Título visible

**Errores que sí pasan**

### Texto visible

- Pedir cambios demasiado grandes.
- No darle contexto.
- No revisar el diff.
- Aceptar código que no entiendes.
- No correr pruebas.
- Dejar placeholders.
- Permitir que toque archivos sensibles.
- Creer que “compila” significa “está bien”.

### Notas del expositor

Explicar con naturalidad:

> Estos errores son normales al principio. La IA se siente rápida y uno se emociona. Pero en sistemas reales, lo importante no es que haga mucho, sino que haga lo correcto.

Frase clave:

> La IA puede producir errores más rápido que un humano si nadie la supervisa.

### Diseño sugerido

Grid de errores con pequeños iconos.

---

## Slide 26 — Buenas prácticas que sí funcionan

### Título visible

**Lo que sí recomiendo hacer**

### Texto visible

- Primero análisis, luego cambios.
- Cambios pequeños.
- Reglas en Markdown.
- Prompts claros.
- Tests o validación manual.
- Revisión de diff.
- Seguridad por defecto.
- Documentar aprendizajes.

### Notas del expositor

Explicar:

> La IA funciona mucho mejor cuando la tratamos como parte del proceso de desarrollo, no como atajo para saltarnos el proceso.

Regla de oro:

```text
Plan -> Cambio -> Prueba -> Revisión
```

### Diseño sugerido

Checklist verde.

---

## Slide 27 — Demo en vivo 1: crear reglas del proyecto

### Título visible

**Demo 1: crear AGENTS.md / CLAUDE.md**

### Texto visible

Objetivo de la demo:

- Tomar un proyecto real.
- Pedirle a la IA que lo analice.
- Generar reglas iniciales.
- Revisarlas antes de usarlas.

### Notas del expositor

Demo recomendada, porque es segura y no depende de que compile algo en vivo.

Prompt para usar:

```text
Analiza este proyecto y genera una propuesta de AGENTS.md y CLAUDE.md.

Antes de escribir archivos:
1. Identifica stack, estructura, comandos y reglas aparentes.
2. Detecta archivos sensibles que deberían protegerse.
3. Propón reglas prácticas para trabajar en este repo.
4. No inventes comandos: si no puedes verificarlos, márcalos como pendientes.

Después dame el contenido sugerido para ambos archivos.
```

Si se quiere permitir escritura:

```text
Crea los archivos AGENTS.md y CLAUDE.md con las reglas propuestas.
No modifiques otros archivos.
```

### Diseño sugerido

Slide con dos pasos:

1. Analizar.
2. Generar reglas.

Mostrar screenshot o mock de terminal.

---

## Slide 28 — Demo en vivo 2: auditoría de proyecto

### Título visible

**Demo 2: auditoría rápida de un repo**

### Texto visible

Pedirle a la IA:

- Qué hace el sistema.
- Cómo está organizado.
- Riesgos.
- Deuda técnica.
- Plan de mejora.

### Notas del expositor

Esta es la demo principal. Es segura porque no necesita modificar código.

Prompt recomendado:

```text
Haz una auditoría técnica de este proyecto.

No modifiques archivos.

Entrega:
1. Resumen de qué hace el sistema.
2. Stack detectado.
3. Módulos principales.
4. Comandos disponibles.
5. Riesgos técnicos.
6. Posibles problemas de seguridad.
7. Deuda técnica.
8. Plan priorizado de mejora.

Cita archivos reales cuando hagas afirmaciones.
Si algo no puedes comprobar, dilo claramente.
```

Qué mostrar durante la demo:

- Cómo navega el proyecto.
- Qué archivos detecta.
- Cómo arma el resumen.
- Cómo prioriza riesgos.

### Diseño sugerido

Mostrar checklist de auditoría y un resultado esperado tipo reporte.

---

## Slide 29 — Demo alternativa: debugging controlado

### Título visible

**Demo alternativa: debug sin modificar de golpe**

### Texto visible

Usar cuando haya un error real disponible.

```text
Error -> diagnóstico -> hipótesis -> cambio mínimo -> prueba
```

### Notas del expositor

Esta demo es más riesgosa porque depende del error y del entorno, pero puede ser muy buena si ya se prepara antes.

Prompt:

```text
Analiza este error.
No modifiques archivos todavía.

Quiero:
1. Explicación simple del error.
2. Causas probables ordenadas.
3. Archivos relacionados.
4. Comandos para validar.
5. Solución mínima sugerida.
```

Después:

```text
Aplica solo la solución mínima.
No hagas refactor.
Ejecuta la validación más relevante.
Resume el cambio y riesgos.
```

Plan B si falla la demo:

- Mostrar una salida preparada.
- Explicar el método, no depender del resultado perfecto.

### Diseño sugerido

Mostrar flujo de debugging en forma de pipeline.

---

## Slide 30 — Cómo debería cambiar nuestro flujo de trabajo

### Título visible

**La IA no reemplaza el proceso: lo refuerza**

### Texto visible

Antes:

```text
Desarrollador -> Código -> Revisión
```

Ahora:

```text
Desarrollador
+ IA para analizar
+ IA para proponer
+ IA para probar
+ humano para decidir
```

### Notas del expositor

Explicar:

> El punto no es que la IA tome el control. El punto es que nos ayude a pensar, revisar, documentar y avanzar más rápido sin saltarnos las buenas prácticas.

Mensaje:

- La IA sirve como copiloto.
- La decisión técnica sigue siendo humana.
- El criterio del dev vale más, no menos.

### Diseño sugerido

Comparativa antes/después.

---

## Slide 31 — Qué deberían empezar a hacer mañana

### Título visible

**Primeros pasos recomendados**

### Texto visible

1. Crear `AGENTS.md` o `CLAUDE.md` en un proyecto.
2. Pedir una auditoría sin modificar archivos.
3. Guardar prompts útiles.
4. Usar ramas separadas.
5. Revisar cada diff.
6. Bloquear archivos sensibles.
7. Convertir tareas repetidas en skills.

### Notas del expositor

Explicar:

> No hace falta empezar con agentes complejos ni automatizaciones grandes. Con solo tener reglas del proyecto y buenos prompts, ya mejora bastante.

Recomendación:

- Empezar con un proyecto no crítico.
- Hacer una auditoría.
- Ver qué entiende bien y qué entiende mal.
- Ajustar reglas.

### Diseño sugerido

Checklist numerado.

---

## Slide 32 — Frase de cierre

### Título visible

**Idea final**

### Texto visible

```text
La IA no debe tener el volante completo.
Debe ser copiloto, no conductor.
```

### Notas del expositor

Cerrar con:

> La IA puede acelerar muchísimo el desarrollo, pero solo cuando le damos contexto, límites y revisión. Un buen desarrollador con IA puede producir más y mejor. Pero si se usa sin criterio, también puede generar problemas más rápido.

Remate opcional:

> No se trata de preguntarle todo a la IA. Se trata de aprender a dirigirla.

### Diseño sugerido

Slide minimalista, solo frase grande.

---

## Slide 33 — Preguntas

### Título visible

**Preguntas / comentarios**

### Texto visible

```text
¿Qué parte de su flujo diario creen que podría mejorar más con IA?
```

### Notas del expositor

Usar esta pregunta para abrir conversación.

Si nadie pregunta, lanzar ejemplos:

- ¿Auditorías?
- ¿Debugging?
- ¿Documentación?
- ¿Migraciones?
- ¿Revisión de código?

### Diseño sugerido

Fondo limpio, pregunta grande.

---

# Apéndice A — Prompts listos para usar

Estos prompts pueden agregarse al final de la presentación o dejarse como material adicional.

---

## Prompt: auditoría inicial

```text
Actúa como un ingeniero senior y auditor técnico.
Analiza este proyecto antes de modificar cualquier archivo.

Identifica:
- Qué hace el sistema.
- Stack tecnológico.
- Estructura de carpetas.
- Módulos principales.
- Flujo de negocio.
- Comandos para correr, probar y construir.
- Riesgos técnicos.
- Riesgos de seguridad.
- Deuda técnica.

No modifiques archivos.
Cita archivos reales cuando hagas afirmaciones.
Si algo no puedes comprobar, dilo claramente.
Entrega un reporte y un plan priorizado.
```

---

## Prompt: crear reglas del proyecto

```text
Analiza este proyecto y genera una propuesta de AGENTS.md y CLAUDE.md.

Incluye:
- Stack detectado.
- Comandos reales.
- Convenciones de código.
- Reglas de seguridad.
- Archivos que no deben tocarse.
- Proceso recomendado antes de modificar.
- Proceso recomendado después de modificar.

No inventes información.
Si no puedes verificar un comando, márcalo como pendiente.
Primero muéstrame la propuesta antes de crear archivos.
```

---

## Prompt: revisión de cambios

```text
Revisa el diff actual.

Dame:
1. Resumen general.
2. Cambios archivo por archivo.
3. Riesgos introducidos.
4. Posibles bugs.
5. Pruebas que debo correr.
6. Cosas pendientes antes de hacer merge.

No modifiques archivos durante esta revisión.
```

---

## Prompt: debugging seguro

```text
Analiza este error.
No modifiques archivos todavía.

Quiero:
1. Explicación simple del error.
2. Causas probables ordenadas por probabilidad.
3. Archivos relacionados.
4. Comandos para validar cada hipótesis.
5. Solución mínima recomendada.

No hagas refactor general.
No cambies reglas de negocio sin avisar.
```

---

## Prompt: implementación controlada

```text
Implementa únicamente el cambio descrito en el plan.

Restricciones:
- No tocar archivos fuera del alcance.
- No agregar dependencias.
- No cambiar base de datos.
- No modificar permisos.
- No dejar placeholders.

Después de modificar:
1. Resume archivos cambiados.
2. Explica por qué cambió cada uno.
3. Ejecuta o sugiere pruebas.
4. Lista riesgos pendientes.
```

---

# Apéndice B — Ejemplo base de AGENTS.md

```markdown
# AGENTS.md

## Proyecto

Describe aquí qué hace el sistema en 3 a 5 líneas.

## Stack

- Lenguaje:
- Framework:
- Base de datos:
- Frontend:
- Herramientas:

## Comandos

- Instalar dependencias: `...`
- Ejecutar local: `...`
- Tests: `...`
- Lint: `...`
- Build: `...`

## Reglas de trabajo

- Antes de modificar, analizar archivos relacionados.
- No inventar arquitectura ni comandos.
- No agregar dependencias sin justificar.
- No eliminar código sin explicar impacto.
- Mantener estilo y patrones existentes.
- No dejar placeholders, TODOs innecesarios ni mensajes temporales.

## Seguridad

- No leer ni modificar `.env`.
- No tocar credenciales.
- No usar datos reales sensibles en ejemplos.
- No ejecutar comandos destructivos sin autorización.

## Validación

Antes de terminar una tarea:

- Resumir archivos modificados.
- Ejecutar pruebas relevantes si existen.
- Informar comandos ejecutados.
- Informar riesgos o pendientes.
```

---

# Apéndice C — Ejemplo base de CLAUDE.md

```markdown
# CLAUDE.md

## Cómo debe trabajar Claude en este proyecto

Primero analiza y después modifica.
No hagas cambios grandes sin plan.
No inventes información del sistema.
Cuando afirmes algo, intenta basarlo en archivos reales.

## Reglas técnicas

- Respetar estructura actual del proyecto.
- Usar patrones existentes.
- Mantener nombres y estilo usados por el equipo.
- No agregar librerías sin explicar por qué.
- No cambiar reglas de negocio sin advertirlo.

## Seguridad

- No leer `.env` ni archivos de secretos.
- No modificar configuraciones de producción.
- No exponer tokens, contraseñas ni datos sensibles.

## Al terminar cada tarea

Entregar:

1. Resumen de cambios.
2. Archivos modificados.
3. Pruebas ejecutadas.
4. Riesgos pendientes.
5. Recomendaciones siguientes.
```

---

# Apéndice D — Ejemplo de subagente de solo lectura para Claude

```markdown
---
name: safe-researcher
description: Analiza el proyecto sin modificar archivos. Úsalo para auditorías, investigación y planeación.
tools: Read, Grep, Glob, Bash
model: sonnet
---

Eres un agente de investigación técnica.

Tu trabajo:

- Leer estructura del proyecto.
- Encontrar archivos relevantes.
- Explicar cómo funciona el sistema.
- Detectar riesgos.
- Proponer un plan.

Reglas:

- No edites archivos.
- No escribas archivos nuevos.
- No ejecutes comandos destructivos.
- Si no puedes comprobar algo, dilo claramente.
```

---

# Apéndice E — Fuentes oficiales revisadas

Estas fuentes se revisaron para alinear la presentación con el funcionamiento actual de Codex y Claude Code.

## OpenAI / Codex

- Codex CLI: https://developers.openai.com/codex/cli
- AGENTS.md en Codex: https://developers.openai.com/codex/guides/agents-md
- Mejores prácticas de Codex: https://developers.openai.com/codex/learn/best-practices
- Skills en Codex: https://developers.openai.com/codex/skills
- Subagents en Codex: https://developers.openai.com/codex/subagents
- Configuración básica de Codex: https://developers.openai.com/codex/config-basic
- Referencia de configuración de Codex: https://developers.openai.com/codex/config-reference
- Prompt engineering OpenAI: https://developers.openai.com/api/docs/guides/prompt-engineering
- Estado de conversación OpenAI: https://developers.openai.com/api/docs/guides/conversation-state

## Anthropic / Claude

- Claude Code Overview: https://code.claude.com/docs/en/overview
- Claude Code Settings: https://code.claude.com/docs/en/settings
- Claude Code Skills: https://code.claude.com/docs/en/skills
- Claude Code Subagents: https://code.claude.com/docs/en/sub-agents
- Claude Code Costs: https://code.claude.com/docs/en/costs
- Claude Context Windows: https://platform.claude.com/docs/en/build-with-claude/context-windows
- Prompting Best Practices: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/multishot-prompting

---

# Nota final para Claude

Construye la presentación en HTML con estas prioridades:

1. Que se vea moderna y clara.
2. Que no esté saturada de texto.
3. Que cada slide tenga una idea principal.
4. Que los ejemplos de prompt sean fáciles de copiar.
5. Que el tono suene natural, como una plática técnica relajada.
6. Que las notas del expositor tengan suficiente información para explicar cada punto.
7. Que la demo en vivo tenga un plan B por si algo falla.
8. Que la presentación no venda humo: debe mostrar beneficios, riesgos y límites reales.
