# Permisos: no todo debe estar abierto

Configurar límites:

- Qué puede leer
- Qué puede editar
- Qué comandos puede correr
- Qué archivos están prohibidos
- Cuándo debe pedir aprobación

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
