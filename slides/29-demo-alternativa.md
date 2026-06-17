# Demo alternativa: debug sin modificar de golpe

Usar cuando haya un error real:

```text
Analiza este error. No modifiques todavia.

Entregame:
1. Posible causa raiz
2. Archivos a revisar
3. Comandos de reproduccion
4. Hipotesis de cambio minimo

Luego aplica solo el cambio mas acotado.
Ejecuta prueba y resume diff.
```

Esperado:
- Diagnostico acotado
- Un solo cambio minimo
- Resultado de prueba
- Cierre con "por que se corrige"

**Plan B:** si no compila, revertir y mostrar salida preparada de explicacion.
