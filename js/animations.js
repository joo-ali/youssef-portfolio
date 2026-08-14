(() => {
  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia?.("(hover: hover) and (pointer: fine)").matches;
  const SPLASH_SESSION_KEY = "portfolio-splash-seen";

  function finishSplash(splash, immediate = false) {
    if (!splash) {
      document.body.classList.add("splash-complete");
      return;
    }
    document.body.classList.remove("splash-lock");
    document.body.classList.add("splash-complete");
    if (immediate) {
      splash.remove();
      return;
    }
    splash.classList.add("is-leaving");
    window.setTimeout(() => splash.remove(), 760);
  }

  function setupSplash() {
    const splash = document.getElementById("splash-screen");
    if (!splash) return;

    const params = new URLSearchParams(window.location.search);
    const forceSkip = params.get("intro") === "0";
    const forceShow = params.get("intro") === "1";

    // V18: the full intro plays once per browser session instead of on
    // every single load — a returning visitor within the same session
    // (e.g. going back to the homepage from a project page) no longer
    // waits through the animation again. ?intro=1 always replays it,
    // ?intro=0 always skips it.
    let alreadySeen = false;
    try { alreadySeen = sessionStorage.getItem(SPLASH_SESSION_KEY) === "1"; } catch (_) {}

    if (forceSkip || (alreadySeen && !forceShow)) {
      finishSplash(splash, true);
      return;
    }

    try { sessionStorage.setItem(SPLASH_SESSION_KEY, "1"); } catch (_) {}

    document.body.classList.add("splash-lock");

    let completed = false;
    const complete = () => {
      if (completed) return;
      completed = true;
      finishSplash(splash, false);
    };

    const duration = reducedMotion ? 900 : 2450;
    window.setTimeout(complete, duration);
    splash.addEventListener("pointerdown", () => window.setTimeout(complete, 120), { once: true });
    document.addEventListener("keydown", event => {
      if (event.key === "Escape" || event.key === "Enter" || event.key === " ") complete();
    }, { once: true });
  }

  function setupScrollProgress() {
    const bar = document.querySelector(".scroll-progress span");
    if (!bar) return;
    let ticking = false;
    const update = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / max));
      bar.style.transform = `scaleX(${progress})`;
      ticking = false;
    };
    const requestUpdate = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
  }

  const motionSelector = [
    ".showcase",
    ".motion-card",
    ".case-card",
    ".project-gallery figure",
    ".case-cover",
    ".device-stage",
    ".case-tech",
    ".contact-details > div",
    ".footer-main > div"
  ].join(",");

  let motionObserver;
  function createMotionObserver() {
    if (reducedMotion || !("IntersectionObserver" in window)) return null;
    return new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in-view");
        motionObserver?.unobserve(entry.target);
      });
    }, { threshold: 0.09, rootMargin: "0px 0px -25px" });
  }

  function registerMotionItems(scope = document) {
    const items = scope.matches?.(motionSelector)
      ? [scope]
      : Array.from(scope.querySelectorAll?.(motionSelector) || []);

    items.forEach(item => {
      if (item.dataset.motionReady === "true") return;
      item.dataset.motionReady = "true";
      item.classList.add("motion-item");
      const parent = item.parentElement;
      const index = parent ? Array.from(parent.children).indexOf(item) : 0;
      item.style.setProperty("--motion-delay", `${Math.min(index, 7) * 65}ms`);
      if (reducedMotion || !motionObserver) item.classList.add("in-view");
      else motionObserver.observe(item);
    });
  }

  function setupPageEntrance() {
    requestAnimationFrame(() => {
      document.querySelectorAll(".page-enter-group").forEach(group => group.classList.add("page-entered"));
    });
  }

  function attachTilt(element) {
    if (!finePointer || reducedMotion || element.dataset.tiltReady === "true") return;
    element.dataset.tiltReady = "true";
    const target = element;

    const move = event => {
      const rect = element.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      const rotateY = (px - 0.5) * 5.5;
      const rotateX = (0.5 - py) * 5.5;
      target.style.setProperty("--tilt-x", `${rotateX.toFixed(2)}deg`);
      target.style.setProperty("--tilt-y", `${rotateY.toFixed(2)}deg`);
    };
    const reset = () => {
      target.style.setProperty("--tilt-x", "0deg");
      target.style.setProperty("--tilt-y", "0deg");
    };
    element.addEventListener("pointermove", move);
    element.addEventListener("pointerleave", reset);
  }

  function registerTilt(scope = document) {
    if (!finePointer || reducedMotion) return;
    const elements = scope.matches?.(".skill-card")
      ? [scope]
      : Array.from(scope.querySelectorAll?.(".skill-card") || []);
    elements.forEach(attachTilt);
  }

  function setupMagneticButtons() {
    if (!finePointer || reducedMotion) return;
    document.querySelectorAll(".pill-btn, .contact-orbit").forEach(button => {
      if (button.dataset.magneticReady === "true") return;
      button.dataset.magneticReady = "true";
      button.addEventListener("pointermove", event => {
        const rect = button.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) * 0.09;
        const y = (event.clientY - rect.top - rect.height / 2) * 0.09;
        button.style.translate = `${x}px ${y}px`;
      });
      button.addEventListener("pointerleave", () => { button.style.translate = "0 0"; });
    });
  }

  function setupMutationObserver() {
    if (!("MutationObserver" in window)) return;
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => mutation.addedNodes.forEach(node => {
        if (!(node instanceof Element)) return;
        registerMotionItems(node);
        registerTilt(node);
        setupMagneticButtons();
      }));
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  document.addEventListener("DOMContentLoaded", () => {
    motionObserver = createMotionObserver();
    setupSplash();
    setupScrollProgress();
    setupPageEntrance();
    registerMotionItems();
    registerTilt();
    setupMagneticButtons();
    setupMutationObserver();
  });
})();
