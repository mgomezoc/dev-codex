# Permisos: no todo debe estar abierto

Configurar limites:

- Que archivos puede leer
- Que puede editar
- Que comandos puede correr
- Que rutas estan prohibidas
- Cuando debe pedir aprobacion

Ejemplo de Claude Code:

```json
{
  "permissions": {
    "deny": [
      "Read(./.env)",
      "Read(./secrets/**)",
      "Read(./config/credentials.json)"
    ],
    "ask": [
      "Write(./*.*)",
      "Write(./docs/**)"
    ]
  }
}
```

En Codex revisar:
- sandbox y scope del workspace
- approvals (`require_escalated` o `use_default`)
- reglas del CLI local

**Permisos controlados = menos riesgo de accidente.**
