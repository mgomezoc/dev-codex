# Un subagente puede tener limites

```markdown
---
name: safe-researcher
description: Analiza sin modificar
tools: Read, Grep, Glob
---

Tu trabajo es investigar, encontrar archivos,
explicar riesgos y proponer plan.
No edites archivos.
```

**Aplicacion correcta:**

Read-only -> auditoria y riesgos
Permisos controlados -> implementacion o qa
No usar subagente para cambios triviales.
