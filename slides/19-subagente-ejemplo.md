# Un subagente puede tener límites

```markdown
---
name: safe-researcher
description: Analiza sin modificar
tools: Read, Grep, Glob, Bash
---

Tu trabajo es investigar, encontrar archivos,
explicar riesgos y proponer plan.
No edites archivos.
```

**Auditoría:** read-only  
**Implementación:** permisos controlados  
**QA:** permisos para tests  
**Documentación:** solo docs
