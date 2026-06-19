# Demo: publicar con Codex

<section class="deploy-demo" aria-label="Demo de publicación con Codex en IONOS">
  <div class="deploy-demo-brief" aria-label="Lo que hará Codex en el demo">
    <article class="deploy-demo-card">
      <span class="deploy-demo-step">01</span>
      <strong>Preparar</strong>
      <p>Compila la presentación y detecta solo los archivos necesarios.</p>
    </article>
    <article class="deploy-demo-card">
      <span class="deploy-demo-step">02</span>
      <strong>Verificar</strong>
      <p>Conecta por SFTP y simula qué subiría antes de tocar el servidor.</p>
    </article>
    <article class="deploy-demo-card">
      <span class="deploy-demo-step">03</span>
      <strong>Publicar</strong>
      <p>Sube solo con confirmación y valida la URL en navegador.</p>
    </article>
  </div>

  <pre class="deploy-demo-code"><code class="language-text">Analiza este proyecto y prepara el despliegue de la presentación estática.

Objetivo:
Subir la página generada a mi subdominio de IONOS.

URL pública:
https://ia.cgomez.work/

Datos SFTP/SSH:
Host: home573506767.1and1-data.host
Puerto: 22
Usuario: u80686273
Contraseña: Rrasec1381609!
Carpeta destino: /cgomez/ia

Reglas importantes:
- No subas nada todavía sin mostrarme primero el plan.
- No borres archivos remotos salvo que yo lo confirme.
- No subas node_modules, tests, docs, slides ni archivos de desarrollo.
- Solo debe subirse lo necesario para que funcione la presentación estática.

Pasos:
1. Ejecuta `npm.cmd run build`.
2. Verifica que se generó `index.html`.
3. Identifica los archivos necesarios para producción:
   - index.html
   - assets/css/
   - assets/js/
   - assets/img/
   - assets/vendor/
4. Conéctate por SFTP y valida que `/cgomez/ia` existe.
5. Muéstrame un dry-run: la lista exacta de archivos que subirías, sin subirlos todavía.
6. Espera mi confirmación antes de subir.
7. Después de subir, valida:
   - https://ia.cgomez.work/
   - que carguen estilos, imágenes y JS
   - que la navegación entre slides funcione
   - que no haya errores en consola

Entrega al final:
- Archivos subidos
- URL validada
- Errores encontrados, si existen
- Recomendaciones para dejarlo listo</code></pre>

  <p class="deploy-demo-principle">La parte profesional no es subir: es validar, simular y pedir confirmación.</p>
</section>
