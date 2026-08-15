(() => {
  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia?.("(hover: hover) and (pointer: fine)").matches;

  // No custom pointer effects for touch devices or when the person has
  // asked the system for reduced motion — these are all decorative.
  if (reducedMotion || !finePointer) return;

  // v2: scoped down to the two places a spotlight actually helps
  // (browsing the project cards and the skills grid), not every tile.
  const spotlightSelector = ".project-card-link, .skill-card";

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

  function setupGalleryWheelScroll() {
    document.addEventListener("wheel", event => {
      const gallery = event.target instanceof Element ? event.target.closest(".project-gallery") : null;
      if (!gallery) return;
      // Only take over when the scroll is mostly vertical and the gallery
      // actually has horizontal room to scroll — avoids hijacking normal
      // page scrolling once the filmstrip is fully scrolled either way.
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      const canScrollMore = (event.deltaY > 0 && gallery.scrollLeft + gallery.clientWidth < gallery.scrollWidth - 1)
        || (event.deltaY < 0 && gallery.scrollLeft > 0);
      if (!canScrollMore) return;
      event.preventDefault();
      gallery.scrollLeft += event.deltaY;
    }, { passive: false });
  }

  document.addEventListener("DOMContentLoaded", () => {
    setupClickRipple();
    setupSpotlight();
    setupGalleryWheelScroll();
  });
})();
