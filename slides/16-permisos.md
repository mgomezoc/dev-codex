# Permisos: no todo debe estar abierto

<div class="permissions-layout">
<div class="permissions-main">
<section class="permissions-panel">
<h2>Configurar límites</h2>
<ul class="permissions-checklist">
<li>Qué archivos puede leer</li>
<li>Qué puede editar</li>
<li>Qué comandos puede correr</li>
<li>Qué rutas están prohibidas</li>
<li>Cuándo debe pedir aprobación</li>
</ul>
<div class="permissions-codex-note">
<strong>En Codex</strong>
<span>Revisa sandbox, scope del workspace y approvals antes de operar.</span>
</div>
</section>
<section class="permissions-code-panel">
<h2>Ejemplo de deny / ask</h2>
<pre class="permissions-code"><code class="language-json">{
  "permissions": {
    "deny": ["Read(./.env)", "Read(./secrets/**)"],
    "ask": ["Write(./*.*)", "Write(./docs/**)"]
  }
}</code></pre>
</section>
</div>
<figure class="permissions-meme">
<img src="assets/img/meme-4.jpg" alt="Meme de programadores en 2026 aceptando permisos Allow sin revisar">
<figcaption>No todo debe recibir <strong>Allow</strong> por reflejo.</figcaption>
</figure>
</div>

<p class="permissions-note">Permisos controlados = menos riesgo de accidente.</p>
