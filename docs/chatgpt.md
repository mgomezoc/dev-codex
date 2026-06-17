## Auditoría general

**Veredicto:** el contenido está bien planteado. No veo un error grave de concepto. La presentación comunica una idea sana: usar IA como herramienta de desarrollo con contexto, límites, revisión humana, Git y seguridad. Eso aparece de forma consistente en slides como “La IA no es magia”, “Primero analiza. Luego toca”, “Git es el cinturón de seguridad” y “Qué no debemos compartir ni permitir”    .

Lo que sí mejoraría: **más precisión técnica en algunos puntos, más material de apoyo para la demo, menos dependencia de nombres de modelos concretos y más notas de expositor**.

---

## Lo que está fuerte

### 1. La narrativa es clara

La secuencia tiene sentido:

1. Baja expectativa mágica.
2. Explica qué hacen Codex y Claude Code.
3. Habla de contexto, tokens y prompts.
4. Pasa a reglas permanentes.
5. Entra a permisos, agentes, debugging, Git y seguridad.
6. Cierra con demos y próximos pasos.

Ese flujo es bueno para una audiencia técnica. No empieza vendiendo IA; empieza poniendo límites, lo cual da credibilidad. La slide 3 deja claro que la IA no reemplaza criterio ni responsabilidad humana , y la slide 30 remata correctamente con “la IA sirve como copiloto, no conductor” .

### 2. Los ejemplos de prompts están bien enfocados

La comparación entre prompt flojo y prompt útil funciona. El prompt malo muestra bien el problema de alcance abierto, y el prompt útil agrega objetivo, restricciones y resultado esperado  . Además, tu fórmula de rol, contexto, objetivo, alcance, restricciones, criterios de éxito y formato es una buena regla práctica .

### 3. La parte de reglas permanentes es valiosa

La recomendación de usar `AGENTS.md`, `CLAUDE.md`, settings, agentes y skills está alineada con el uso actual de estas herramientas . OpenAI documenta que Codex lee `AGENTS.md` antes de trabajar y permite combinar instrucciones globales y del proyecto ([OpenAI Desarrolladores][1]). Anthropic documenta que `CLAUDE.md` sirve para instrucciones persistentes que Claude Code lee al inicio de sesión ([Claude API Docs][2]).

### 4. Seguridad y Git están bien colocados

La presentación insiste en rama separada, diff, pruebas, no compartir secretos y bloquear archivos sensibles   . Eso es correcto y profesional. También coincide con las prácticas recomendadas de Codex: contexto claro, restricciones, “done when”, revisión y pruebas ([OpenAI Desarrolladores][3]).

---

## Cosas que corregiría o matizaría

### 1. `CLAUDE.md` no es una barrera de seguridad

La slide 15 dice “memoria de proyecto para Claude” y la idea es correcta . Pero conviene agregar una frase importante:

> `CLAUDE.md` guía el comportamiento, pero no bloquea acciones por sí solo.

La documentación de Claude Code dice que `CLAUDE.md` se carga como contexto, no como configuración obligatoria; para bloquear acciones hay que usar permisos o hooks ([Claude API Docs][2]). Esto es importante porque en una charla laboral alguien puede interpretar “lo puse en CLAUDE.md” como equivalente a “ya está protegido”.

**Sugerencia de cambio en slide 15:**

```markdown
**Importante:** CLAUDE.md guía a Claude, pero no sustituye permisos.
Para bloquear acciones, usar settings, permissions o hooks.
```

---

### 2. La slide de permisos debería decir “ejemplo de Claude Code”

La slide 16 muestra un JSON con `permissions.deny` y reglas tipo `Read(./.env*)` . Eso está cerca de la sintaxis documentada por Claude Code: la documentación muestra `permissions.deny` con ejemplos como `Read(./.env)` y `Read(./secrets/**)` ([Claude API Docs][4]).

Pero para evitar confusión, pondría explícitamente:

> Ejemplo para Claude Code.

Y separaría Codex en otra línea:

> En Codex, revisar sandbox, approval policy y configuración del CLI.

OpenAI documenta sandboxing y approvals como controles clave de Codex, con acceso de red desactivado por defecto y sandbox local limitado al workspace ([OpenAI Desarrolladores][5]).

---

### 3. La tabla de modelos puede quedar obsoleta rápido

La slide 20 usa “Opus / Sonnet / Haiku” como categorías . Eso funciona si lo dices como regla general, pero los nombres y capacidades cambian. Claude Code ya documenta aliases como `sonnet`, `opus`, `haiku` y también `fable`, además de niveles de esfuerzo como `low`, `medium`, `high`, `xhigh` y `max` según modelo ([Claude API Docs][6]).

**Recomendación:** cambia la tabla para que no dependa tanto del nombre exacto del modelo.

Mejor:

| Tipo de tarea                   | Qué buscar                         |
| ------------------------------- | ---------------------------------- |
| Auditoría compleja              | modelo fuerte + razonamiento alto  |
| Arquitectura                    | modelo fuerte + revisión humana    |
| Debug difícil                   | razonamiento alto + pruebas        |
| Código repetitivo               | modelo medio/rápido                |
| Búsqueda o clasificación simple | modelo ligero                      |
| Documentación                   | modelo medio, buena estructura     |
| Revisión final                  | modelo fuerte si el riesgo es alto |

Así la slide sigue vigente aunque cambien los modelos.

---

### 4. Las demos están demasiado resumidas

Las slides 27, 28 y 29 explican la demo, pero se quedan en objetivo general   . Para una charla de 45–60 minutos, conviene que estas slides incluyan algo más operativo:

* prompt exacto que vas a usar;
* resultado esperado;
* qué vas a revisar en pantalla;
* plan B si la demo falla;
* criterios para decidir si la IA hizo buen trabajo.

La slide 28 dice “No modifica archivos. Es segura” , lo cual está bien, pero le falta el prompt de auditoría completo. Yo metería una mini versión:

```text
Haz una auditoría técnica de este repo.
No modifiques archivos.

Entrega:
1. Qué hace el sistema
2. Stack detectado
3. Estructura principal
4. Riesgos técnicos
5. Riesgos de seguridad
6. Deuda técnica
7. Plan priorizado

Cita archivos reales.
Si algo no puedes comprobar, dilo.
```

---

### 5. Falta un slide de “cómo revisar la salida de la IA”

Tienes Git, diff, pruebas y seguridad, pero falta una slide dedicada a **cómo evaluar la respuesta de la IA**.

Propuesta de nueva slide entre la 23 y 24:

```markdown
# Cómo revisar lo que propuso la IA

Antes de aceptar:

- ¿Citó archivos reales?
- ¿Cambió solo lo necesario?
- ¿Explicó riesgos?
- ¿Corrió o sugirió pruebas?
- ¿Inventó comandos, tablas o rutas?
- ¿El diff se puede revisar completo?
- ¿Hay impacto en permisos, datos o producción?

**No aceptes cambios que no puedas explicar.**
```

Esto conecta muy bien con tu mensaje de “si no puedes revisar el diff, no deberías aceptar el cambio” .

---

## Posibles errores o detalles de contenido

### 1. “Codex y Claude Code pueden trabajar con navegador o herramientas externas”

La slide 22 dice que pueden usar navegador o herramientas externas . La idea es válida, pero matizaría: **depende de la configuración, permisos, entorno y herramientas disponibles**. Codex CLI puede leer, cambiar y correr código localmente en el directorio seleccionado ([OpenAI Desarrolladores][7]); Claude Code puede leer el codebase, editar archivos, ejecutar comandos e integrarse con herramientas de desarrollo ([Claude API Docs][8]). Para navegador/MCP/herramientas externas, conviene decir “cuando están configuradas”.

Cambio sugerido:

```markdown
Pueden usar herramientas como, según configuración:
```

---

### 2. “Skills” se entiende, pero necesita una frase de diferencia contra comandos

La slide 17 dice que una skill guarda un flujo repetible y muestra `/review-pr`, `/debug`, `/run`, `/verify` . Esto puede confundirse con slash commands.

Codex documenta skills como directorios con `SKILL.md`, scripts y referencias opcionales; las carga cuando decide usar una skill o cuando se invoca explícitamente ([OpenAI Desarrolladores][9]).

Agrega una frase:

```markdown
Skill ≠ comando mágico.
Skill = instrucciones reutilizables + recursos opcionales + criterio de cuándo usarla.
```

---

### 3. Subagentes: correcto, pero mejor decir cuándo NO usarlos

La slide 18 explica agentes por rol  y la 19 muestra un subagente read-only . La idea es buena. Claude Code documenta subagentes como asistentes especializados con contexto propio, prompt propio, herramientas específicas y permisos independientes ([Claude API Docs][10]).

Pero agregaría una advertencia:

```markdown
No uses subagentes para tareas simples.
Primero intenta con buen prompt + buen contexto.
```

Esto evita que parezca que siempre hay que armar una arquitectura multiagente.

---

## Sugerencias de mejora por secciones

| Sección                               |                     Estado | Mejora recomendada                                                        |
| ------------------------------------- | -------------------------: | ------------------------------------------------------------------------- |
| Introducción, slides 1–3              |                      Buena | Agregar una promesa más concreta: “saldrán con 3 prompts y un checklist”. |
| Conceptos base, slides 4–8            |                      Buena | Matizar herramientas según permisos/configuración.                        |
| Prompts, slides 9–12                  |                  Muy buena | Agregar “done when” o criterios de aceptación al prompt útil.             |
| Reglas, slides 13–16                  |                      Buena | Aclarar que reglas guían; permisos bloquean.                              |
| Skills/agentes, slides 17–19          |      Buena pero comprimida | Agregar “cuándo sí/cuándo no”.                                            |
| Modelos, slide 20                     |    Riesgo de obsolescencia | Usar categorías en vez de nombres fijos.                                  |
| Debugging/Git/seguridad, slides 21–26 |                     Fuerte | Agregar slide de revisión de salida IA.                                   |
| Demos, slides 27–29                   | Débil por falta de detalle | Incluir prompts exactos y salida esperada.                                |
| Cierre, slides 30–33                  |                      Bueno | Reducir repetición entre slide 30 y 32.                                   |

---

## Observaciones sobre archivos del proyecto

Tus archivos de reglas dicen que `index.html` es salida generada y no debe editarse directamente; el contenido editable debe vivir en Markdown, con build desde `build.js`, plantilla y assets separados  . Eso está bien como regla de trabajo.

También tienes riesgos técnicos ya identificados en `CLAUDE.md`: posible duplicación de listeners, exposición global de `robotAssistant`, overflow del typewriter y HTML crudo procesado por `marked` . Sobre contenido, el punto más relevante es el último: tus slides usan HTML crudo en varios archivos, por ejemplo la portada usa un `<div class="hero" ...>` con estilo inline . Si solo tú editas los slides, no es grave. Si más gente editará contenido, mejor mover estilos inline a CSS y reducir HTML manual dentro de Markdown.

---

## Cambios concretos que haría primero

### Prioridad alta

1. **Agregar notas de expositor o guion corto** para las slides 4–8, 13–16, 20 y 27–29.
2. **Corregir la precisión de `CLAUDE.md`**: decir que guía, pero no bloquea.
3. **Separar permisos Claude vs sandbox/approvals Codex**.
4. **Expandir las demos** con prompt exacto, resultado esperado y plan B.
5. **Actualizar la slide de modelos** para usar categorías, no nombres fijos.

### Prioridad media

1. Agregar slide “cómo revisar lo que propuso la IA”.
2. Agregar un apéndice de “prompts listos para copiar”.
3. Agregar una slide final de “checklist para mañana”.
4. Reducir repetición entre “La IA no reemplaza el proceso” y “copiloto, no conductor”.
5. Mover HTML inline de slides a clases CSS.

### Prioridad baja

1. Cambiar “debuggear” por “depurar” si quieres tono más formal; si la audiencia es dev, “debuggear” está bien.
2. Reemplazar algunos textos absolutos por “según configuración”.
3. Agregar una slide de fuentes oficiales o poner fuentes en notas.

---

## Evaluación final

**Calificación de contenido:** 8/10.

La base está sólida. No estás en un error grande. La charla ya tiene buen criterio técnico: contexto, límites, pruebas, Git, seguridad y revisión humana. Lo que le falta para sentirse más profesional no es “más slides”, sino **más precisión en los matices y mejor preparación de la demo**.

La mejora más importante sería esta frase guía para toda la presentación:

> La IA puede ayudar a analizar, proponer, editar y validar; pero el proceso debe obligarla a trabajar con contexto, permisos, pruebas y revisión humana.

[1]: https://developers.openai.com/codex/guides/agents-md "Custom instructions with AGENTS.md – Codex | OpenAI Developers"
[2]: https://docs.anthropic.com/en/docs/claude-code/memory "How Claude remembers your project - Claude Code Docs"
[3]: https://developers.openai.com/codex/learn/best-practices "Best practices – Codex | OpenAI Developers"
[4]: https://docs.anthropic.com/en/docs/claude-code/settings?utm_source=chatgpt.com "Claude Code settings - Claude Code Docs"
[5]: https://developers.openai.com/codex/agent-approvals-security?utm_source=chatgpt.com "Agent approvals & security – Codex"
[6]: https://docs.anthropic.com/en/docs/claude-code/cli-reference?utm_source=chatgpt.com "CLI reference - Claude Code Docs"
[7]: https://developers.openai.com/codex/cli "CLI – Codex | OpenAI Developers"
[8]: https://docs.anthropic.com/en/docs/claude-code/overview "Overview - Claude Code Docs"
[9]: https://developers.openai.com/codex/skills "Agent Skills – Codex | OpenAI Developers"
[10]: https://docs.anthropic.com/en/docs/claude-code/sub-agents "Create custom subagents - Claude Code Docs"
