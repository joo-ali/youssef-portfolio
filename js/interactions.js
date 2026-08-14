(() => {
  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia?.("(hover: hover) and (pointer: fine)").matches;

  // No custom pointer effects for touch devices or when the person has
  // asked the system for reduced motion — these are all decorative.
  if (reducedMotion || !finePointer) return;

  const spotlightSelector = ".project-card-link, .skill-card, .case-card, .contact-details > div";
  const interactiveSelector = "a, button, input, textarea, select, [role='button'], .project-card, .skill-card, .contact-orbit";

  function setupCustomCursor() {
    const dot = document.createElement("div");
    dot.className = "cursor-dot";
    const ring = document.createElement("div");
    ring.className = "cursor-ring";
    document.body.append(dot, ring);
    document.documentElement.classList.add("has-custom-cursor", "cursor-hidden");

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let ringX = targetX;
    let ringY = targetY;
    let raf = null;

    function loop() {
      // Ease the ring toward the pointer for a soft trailing feel; the
      // dot itself tracks the pointer exactly for precision.
      ringX += (targetX - ringX) * 0.2;
      ringY += (targetY - ringY) * 0.2;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    window.addEventListener("pointermove", event => {
      targetX = event.clientX;
      targetY = event.clientY;
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      document.documentElement.classList.remove("cursor-hidden");
    }, { passive: true });

    document.addEventListener("pointerover", event => {
      const target = event.target instanceof Element ? event.target.closest(interactiveSelector) : null;
      document.documentElement.classList.toggle("cursor-hover", Boolean(target));
    });

    window.addEventListener("pointerdown", () => document.documentElement.classList.add("cursor-down"));
    window.addEventListener("pointerup", () => document.documentElement.classList.remove("cursor-down"));
    document.addEventListener("mouseleave", () => document.documentElement.classList.add("cursor-hidden"));
    document.addEventListener("visibilitychange", () => {
      if (document.hidden && raf) { cancelAnimationFrame(raf); raf = null; }
      else if (!raf) { raf = requestAnimationFrame(loop); }
    });
  }

  function setupClickRipple() {
    window.addEventListener("pointerdown", event => {
      if (event.pointerType && event.pointerType !== "mouse") return;
      const ripple = document.createElement("span");
      ripple.className = "click-ripple";
      ripple.style.left = `${event.clientX}px`;
      ripple.style.top = `${event.clientY}px`;
      document.body.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove(), { once: true });
    });
  }

  function setupSpotlight() {
    // Delegated at the document level so it automatically covers cards
    // rendered later by public.js / project-detail.js without needing
    // a MutationObserver registration pass.
    document.addEventListener("pointermove", event => {
      const target = event.target instanceof Element ? event.target.closest(spotlightSelector) : null;
      if (!target) return;
      const rect = target.getBoundingClientRect();
      target.style.setProperty("--spot-x", `${((event.clientX - rect.left) / rect.width) * 100}%`);
      target.style.setProperty("--spot-y", `${((event.clientY - rect.top) / rect.height) * 100}%`);
    }, { passive: true });
  }

  function setupAmbientParallax() {
    const layer = document.querySelector(".ambient-background");
    if (!layer) return;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    window.addEventListener("pointermove", event => {
      targetX = (event.clientX / window.innerWidth - 0.5) * 22;
      targetY = (event.clientY / window.innerHeight - 0.5) * 14;
    }, { passive: true });

    function loop() {
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;
      layer.style.setProperty("--parallax-x", `${currentX.toFixed(2)}px`);
      layer.style.setProperty("--parallax-y", `${currentY.toFixed(2)}px`);
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  document.addEventListener("DOMContentLoaded", () => {
    setupCustomCursor();
    setupClickRipple();
    setupSpotlight();
    setupAmbientParallax();
  });
})();
