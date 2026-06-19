# La IA trabaja con contexto

<section class="context-lab" aria-label="Comparacion de prompts con y sin contexto">
  <div class="context-equation">
    <span>Prompt</span>
    <span>Conversaci&oacute;n</span>
    <span>Archivos</span>
    <span>Documentaci&oacute;n</span>
    <span>Reglas</span>
    <span>Errores/logs</span>
    <strong>Contexto &uacute;til</strong>
  </div>
  <div class="context-comparison">
    <article class="context-example context-example-bad">
      <div class="context-example-header">
        <span class="context-example-kicker">Malo</span>
        <span class="context-example-signal">petici&oacute;n ciega</span>
      </div>
      <p class="context-prompt context-prompt-bad">"Arregla este m&oacute;dulo"</p>
      <div class="context-tags" aria-label="Problemas del prompt malo">
        <span>sin alcance</span>
        <span>sin archivos</span>
        <span>sin criterio</span>
      </div>
    </article>
    <article class="context-example context-example-good">
      <div class="context-example-header">
        <span class="context-example-kicker">Mejor</span>
        <span class="context-example-signal">trabajo dirigido</span>
      </div>
      <p class="context-prompt context-prompt-good">
        "Analiza m&oacute;dulo de usuarios <span>(controlador, modelo, vistas, rutas)</span>.
        No modifiques todav&iacute;a. Primero dime c&oacute;mo funciona y qu&eacute; riesgos ves."
      </p>
      <div class="context-tags context-tags-good" aria-label="Senales del prompt mejorado">
        <span>objetivo claro</span>
        <span>l&iacute;mites</span>
        <span>riesgos primero</span>
      </div>
    </article>
  </div>
</section>

**Más contexto no siempre es mejor. Contexto útil sí ayuda; ruido estorba.**
