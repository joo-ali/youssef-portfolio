(() => {
  const root = document.getElementById("project-detail-root");
  if (!root) return;

  const config = window.PORTFOLIO_CONFIG || {};
  const helpers = window.PORTFOLIO_PROJECTS || {};
  const configured = Boolean(config.supabaseUrl && config.supabaseAnonKey && window.supabase);
  let currentProject = null;

  function lang() { return window.PORTFOLIO_SITE?.getLanguage?.() || "en"; }
  function isArabic() { return lang() === "ar"; }
  function escapeHtml(value = "") { return helpers.escapeHtml ? helpers.escapeHtml(value) : String(value); }
  function localized(project, field) { return helpers.localized ? helpers.localized(project, field) : project?.[field]; }
  function getSlug() { return new URLSearchParams(window.location.search).get("slug") || ""; }

  function safeUrl(value = "") {
    try {
      const url = new URL(value);
      return ["http:", "https:"].includes(url.protocol) ? url.href : "";
    } catch (_) { return ""; }
  }

  async function loadProject(slug) {
    if (configured) {
      try {
        const client = window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey);
        const { data, error } = await client.from("projects").select("*").eq("slug", slug).eq("published", true).maybeSingle();
        if (error) throw error;
        return data || null;
      } catch (error) {
        console.warn("Unable to load project from Supabase:", error.message);
      }
    }
    return (helpers.fallbackProjects || []).find(item => (item.slug || item.id) === slug) || null;
  }

  function labels() {
    return isArabic() ? {
      notFound: "المشروع غير موجود",
      notFoundText: "قد يكون المشروع مخفيًا أو أن الرابط غير صحيح.",
      backProjects: "العودة إلى المشاريع",
      allProjects: "كل المشاريع",
      caseStudy: "دراسة حالة للمشروع",
      liveDemo: "فتح النسخة التجريبية",
      github: "عرض GitHub",
      overview: "نظرة عامة",
      built: "ما الذي بنيته وكيف ساهمت فيه",
      fallbackDescription: "ستتم إضافة تفاصيل المشروع قريبًا.",
      role: "دوري",
      challenge: "التحدي والحل",
      result: "النتيجة والتأثير",
      technologies: "التقنيات",
      visuals: "الصور",
      gallery: "معرض المشروع",
      galleryText: "تظهر هنا تلقائيًا الصور التي ترفعها من لوحة التحكم الخاصة.",
      interactive: "تجربة تفاعلية",
      tryApp: "جرّب التطبيق",
      demoConnected: "يمكنك تشغيل وتجربة نسخة الـ Live Demo مباشرة داخل شاشة الهاتف.",
      demoMissing: "ستظل شاشة التجربة ظاهرة، وعند إضافة رابط Live Demo من لوحة التحكم سيعمل التطبيق داخلها تلقائيًا.",
      demoWaiting: "Live Demo قريبًا",
      demoWaitingText: "لم تتم إضافة رابط النسخة التجريبية لهذا المشروع بعد.",
      openNewTab: "فتح النسخة في صفحة جديدة",
      tapToStart: "اضغط لتشغيل التطبيق",
      loadingDemo: "جارٍ تشغيل التطبيق…"
    } : {
      notFound: "Project not found",
      notFoundText: "The project may be hidden or the link may be incorrect.",
      backProjects: "Back to projects",
      allProjects: "All projects",
      caseStudy: "Project case study",
      liveDemo: "Open live demo",
      github: "View GitHub",
      overview: "Overview",
      built: "What I built and how I contributed",
      fallbackDescription: "Project details will be added soon.",
      role: "My role",
      challenge: "Challenge & solution",
      result: "Result & impact",
      technologies: "Technologies",
      visuals: "Visuals",
      gallery: "Project gallery",
      galleryText: "Screenshots uploaded from the private dashboard appear here automatically.",
      interactive: "Interactive experience",
      tryApp: "Try the application",
      demoConnected: "Run and test the Live Demo directly inside the phone screen.",
      demoMissing: "The demo screen stays visible. Once a Live Demo URL is added in the dashboard, the application will run here automatically.",
      demoWaiting: "Live demo coming soon",
      demoWaitingText: "A live demo URL has not been added for this project yet.",
      openNewTab: "Open demo in a new tab",
      tapToStart: "Tap to start the application",
      loadingDemo: "Starting application…"
    };
  }

  function detailBlock(label, text) {
    if (!text) return "";
    return `<article class="case-card"><div class="eyebrow">${escapeHtml(label)}</div><p>${escapeHtml(text)}</p></article>`;
  }

  function render(project) {
    const copy = labels();
    if (!project) {
      document.title = `${copy.notFound} — Youssef Ali Kamal`;
      root.innerHTML = `<section class="project-not-found"><div class="container"><div class="eyebrow">404</div><h1>${escapeHtml(copy.notFound)}</h1><p>${escapeHtml(copy.notFoundText)}</p><a class="pill-btn" href="projects.html">${escapeHtml(copy.backProjects)} →</a></div></section>`;
      return;
    }

    const title = localized(project, "title") || project.title;
    const shortDescription = localized(project, "short_description") || localized(project, "description") || "";
    const description = localized(project, "description") || shortDescription || copy.fallbackDescription;
    const role = localized(project, "role");
    const challenge = localized(project, "challenge");
    const result = localized(project, "result");
    const techValue = localized(project, "technologies");
    const technologies = Array.isArray(techValue) ? techValue : [];
    const cover = helpers.getCover ? helpers.getCover(project) : project.cover_url;
    const gallery = Array.isArray(project.gallery_urls) ? project.gallery_urls.filter(Boolean) : [];
    const liveUrl = safeUrl(project.live_url);
    const githubUrl = safeUrl(project.github_url);

    document.title = `${title} — Youssef Ali Kamal`;
    root.innerHTML = `
      <section class="case-hero">
        <div class="container">
          <a class="case-back" href="projects.html">← ${escapeHtml(copy.allProjects)}</a>
          <div class="case-hero-grid">
            <div><div class="eyebrow">${escapeHtml(copy.caseStudy)}</div><h1>${escapeHtml(title)}</h1></div>
            <p>${escapeHtml(shortDescription)}</p>
          </div>
          <div class="case-cover"><img src="${escapeHtml(cover)}" alt="${escapeHtml(title)}"></div>
          <div class="case-actions">
            ${liveUrl ? `<a class="pill-btn solid" href="${escapeHtml(liveUrl)}" target="_blank" rel="noreferrer">${escapeHtml(copy.liveDemo)} ↗</a>` : ""}
            ${githubUrl ? `<a class="pill-btn" href="${escapeHtml(githubUrl)}" target="_blank" rel="noreferrer">${escapeHtml(copy.github)} ↗</a>` : ""}
          </div>
        </div>
      </section>

      <section class="section white case-content-section">
        <div class="container">
          <div class="case-overview-grid">
            <div><div class="eyebrow">${escapeHtml(copy.overview)}</div><h2>${escapeHtml(copy.built)}</h2></div>
            <p>${escapeHtml(description)}</p>
          </div>
          <div class="case-card-grid">
            ${detailBlock(copy.role, role)}
            ${detailBlock(copy.challenge, challenge)}
            ${detailBlock(copy.result, result)}
          </div>
          ${technologies.length ? `<div class="case-tech"><div class="eyebrow">${escapeHtml(copy.technologies)}</div><div class="case-tech-list">${technologies.map(item => `<span>${escapeHtml(item)}</span>`).join("")}</div></div>` : ""}
        </div>
      </section>

      ${gallery.length ? `<section class="section project-gallery-section">
        <div class="container">
          <div class="section-head"><div><div class="eyebrow">${escapeHtml(copy.visuals)}</div><h2 class="section-title">${escapeHtml(copy.gallery)}</h2></div><p class="section-intro">${escapeHtml(copy.galleryText)}</p></div>
          <div class="project-gallery">${gallery.map((url, index) => `<figure><img src="${escapeHtml(url)}" alt="${escapeHtml(title)} screenshot ${index + 1}" loading="lazy"></figure>`).join("")}</div>
        </div>
      </section>` : ""}

      <section class="section emulator-section">
        <div class="container emulator-grid">
          <div>
            <div class="eyebrow">${escapeHtml(copy.interactive)}</div>
            <h2>${escapeHtml(copy.tryApp)}</h2>
            <p>${escapeHtml(liveUrl ? copy.demoConnected : copy.demoMissing)}</p>
            ${liveUrl ? `<a class="pill-btn" href="${escapeHtml(liveUrl)}" target="_blank" rel="noreferrer">${escapeHtml(copy.openNewTab)} ↗</a>` : ""}
          </div>
          <div class="device-stage">
            <div class="device-frame">
              <div class="device-speaker"></div>
              ${liveUrl
                ? `<iframe class="device-demo-frame" data-src="${escapeHtml(liveUrl)}" title="${escapeHtml(title)} live demo" allow="clipboard-read; clipboard-write; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>
                   <button class="device-launch" type="button" aria-label="${escapeHtml(copy.tapToStart)}">
                     <span class="device-launch-icon" aria-hidden="true">▶</span>
                     <strong>${escapeHtml(copy.tapToStart)}</strong>
                     <small>Live Demo</small>
                   </button>`
                : `<div class="device-empty"><span>APP DEMO</span><strong>${escapeHtml(copy.demoWaiting)}</strong><small>${escapeHtml(copy.demoWaitingText)}</small></div>`}
            </div>
          </div>
        </div>
      </section>`;

    const launchButton = root.querySelector(".device-launch");
    const demoFrame = root.querySelector(".device-demo-frame");
    if (launchButton && demoFrame) {
      launchButton.addEventListener("click", () => {
        const source = demoFrame.dataset.src || "";
        if (!source) return;
        launchButton.classList.add("loading");
        launchButton.querySelector("strong").textContent = copy.loadingDemo;
        demoFrame.src = source;
        demoFrame.addEventListener("load", () => {
          launchButton.classList.add("hidden");
          demoFrame.classList.add("active");
        }, { once: true });
        window.setTimeout(() => {
          launchButton.classList.add("hidden");
          demoFrame.classList.add("active");
        }, 7000);
      });
    }
  }

  document.addEventListener("DOMContentLoaded", async () => {
    currentProject = await loadProject(getSlug());
    render(currentProject);
  });
  window.addEventListener("portfolio:languagechange", () => render(currentProject));
})();
