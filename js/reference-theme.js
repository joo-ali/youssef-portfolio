(() => {
  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  function setupReferenceParticles() {
    const host = document.querySelector(".ambient-background");
    if (!host || host.querySelector(".ambient-particles")) return;

    const canvas = document.createElement("canvas");
    canvas.className = "ambient-particles";
    canvas.setAttribute("aria-hidden", "true");
    host.prepend(canvas);

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let animationFrame = 0;
    let particles = [];
    let last = performance.now();
    let paused = document.hidden;

    const random = (min, max) => Math.random() * (max - min) + min;

    function targetCount() {
      const area = Math.max(1, width * height);
      return Math.max(45, Math.min(145, Math.round(area / 11500)));
    }

    function makeParticle(x = random(0, width), y = random(0, height)) {
      return {
        x,
        y,
        radius: random(.45, 1.35),
        speed: random(1.5, 6.5),
        alpha: random(.14, .72),
        pulse: random(.25, .85),
        phase: random(0, Math.PI * 2),
        tint: Math.random() > .78 ? 1 : 0
      };
    }

    function syncPopulation() {
      const count = targetCount();
      while (particles.length < count) particles.push(makeParticle());
      if (particles.length > count) particles.length = count;
    }

    function resize() {
      const rect = host.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      syncPopulation();
      draw(performance.now(), 0);
    }

    function draw(now, delta) {
      ctx.clearRect(0, 0, width, height);
      const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#8095ff";

      for (const particle of particles) {
        if (!reducedMotion) {
          particle.x += particle.speed * delta;
          if (particle.x > width + 4) {
            particle.x = -4;
            particle.y = random(0, height);
          }
        }

        const twinkle = particle.alpha * (.72 + Math.sin(now * .001 * particle.pulse + particle.phase) * .28);
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        if (particle.tint) {
          ctx.fillStyle = accent;
          ctx.globalAlpha = Math.max(.08, twinkle * .55);
        } else {
          ctx.fillStyle = "#ffffff";
          ctx.globalAlpha = Math.max(.05, twinkle);
        }
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    function tick(now) {
      if (paused) return;
      const delta = Math.min(.05, Math.max(0, (now - last) / 1000));
      last = now;
      draw(now, delta);
      animationFrame = requestAnimationFrame(tick);
    }

    function start() {
      if (paused) return;
      cancelAnimationFrame(animationFrame);
      last = performance.now();
      animationFrame = requestAnimationFrame(tick);
    }

    document.addEventListener("visibilitychange", () => {
      paused = document.hidden;
      if (paused) cancelAnimationFrame(animationFrame);
      else start();
    });

    window.addEventListener("resize", resize, { passive: true });

    // Mirrors the reference portfolio's tiny "push a particle" interaction,
    // without introducing tsparticles as another production dependency.
    window.addEventListener("pointerdown", event => {
      if (reducedMotion || event.pointerType === "touch") return;
      if (particles.length >= 165) return;
      particles.push(makeParticle(event.clientX, event.clientY));
    }, { passive: true });

    resize();
    if (!reducedMotion) start();
  }

  document.addEventListener("DOMContentLoaded", setupReferenceParticles);
})();
