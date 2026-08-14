(() => {
  const fallbackProjects = [
    {
      id: "weddwish",
      slug: "weddwish",
      title: "WeddWish",
      title_ar: "ويد ويش",
      short_description: "A Flutter and web platform that helps couples organize gifts and share a personalized public profile.",
      short_description_ar: "منصة Flutter وويب تساعد المقبلين على الزواج في تنظيم الهدايا ومشاركة ملف شخصي مخصص.",
      description: "A graduation platform combining a Flutter application, responsive web experience, authentication, storage, API integration, and shareable profiles.",
      description_ar: "منصة تخرج تجمع بين تطبيق Flutter وموقع ويب متجاوب، مع المصادقة والتخزين وربط الـ API والملفات الشخصية القابلة للمشاركة.",
      role: "Flutter developer working across authentication, backend integration, storage, user flows, and mobile UI.",
      role_ar: "مطور Flutter مسؤول عن المصادقة وربط الـ backend والتخزين وتدفقات المستخدم وواجهة الموبايل.",
      challenge: "The product needed to connect mobile and web users through one clear profile and gift flow while keeping authentication and data consistent.",
      challenge_ar: "كان المطلوب ربط مستخدمي الموبايل والويب من خلال ملف شخصي وتدفق هدايا واضح، مع الحفاظ على اتساق المصادقة والبيانات.",
      result: "A connected mobile and web experience with shareable profiles, secure authentication, and backend-driven content.",
      result_ar: "تجربة مترابطة بين الموبايل والويب تشمل ملفات قابلة للمشاركة ومصادقة آمنة ومحتوى يعتمد على الـ backend.",
      technologies: ["Flutter", "Dart", "Strapi", "Supabase", "JWT", "REST API"],
      technologies_ar: ["Flutter", "Dart", "Strapi", "Supabase", "JWT", "REST API"],
      cover_url: "assets/project-covers/weddwish.svg",
      gallery_urls: [], live_url: "", github_url: "", featured: true, published: true, sort_order: 1
    },
    {
      id: "lift-log",
      slug: "lift-log",
      title: "Lift Log",
      title_ar: "ليفت لوج",
      short_description: "A fitness application where I handled authentication, routing, user data flow, and core project foundations.",
      short_description_ar: "تطبيق لياقة توليت فيه المصادقة والتنقل وتدفق بيانات المستخدم وبناء أساس المشروع.",
      description: "A collaborative Flutter fitness project designed around organized workout tracking and maintainable application flows.",
      description_ar: "مشروع Flutter جماعي لتتبع التمارين بصورة منظمة مع تدفقات تطبيق سهلة الصيانة والتطوير.",
      role: "Responsible for login, registration, routing, user model preparation, and base project structure.",
      role_ar: "مسؤول عن تسجيل الدخول وإنشاء الحساب والتنقل وتجهيز نموذج المستخدم وهيكل المشروع الأساسي.",
      challenge: "The team needed a reliable base architecture so authentication, routing, and user data could grow without creating tightly coupled screens.",
      challenge_ar: "احتاج الفريق إلى معمارية أساسية موثوقة تسمح بتوسعة المصادقة والتنقل وبيانات المستخدم دون ربط الشاشات ببعضها بقوة.",
      result: "A clean starting structure with working account flows and reusable project foundations for the rest of the team.",
      result_ar: "هيكل بداية منظم مع تدفقات حسابات تعمل وأساس قابل لإعادة الاستخدام لبقية أعضاء الفريق.",
      technologies: ["Flutter", "Dart", "Firebase", "Cubit"],
      technologies_ar: ["Flutter", "Dart", "Firebase", "Cubit"],
      cover_url: "assets/project-covers/lift-log.svg",
      gallery_urls: [], live_url: "", github_url: "", featured: true, published: true, sort_order: 2
    },
    {
      id: "meals-app",
      slug: "meals-app",
      title: "Meals App",
      title_ar: "تطبيق الوجبات",
      short_description: "A Firebase-connected mobile application with authentication, profiles, favorites, and cloud data.",
      short_description_ar: "تطبيق موبايل متصل بـ Firebase ويشمل المصادقة والملفات الشخصية والمفضلة والبيانات السحابية.",
      description: "A practical Flutter project demonstrating cloud authentication, Firestore document mapping, favorites, and UI state handling.",
      description_ar: "مشروع Flutter عملي يوضح المصادقة السحابية وتحويل مستندات Firestore وإدارة المفضلة وحالات الواجهة.",
      role: "Flutter developer.",
      role_ar: "مطور Flutter.",
      challenge: "User data and favorites needed to stay synchronized with Firestore while the interface remained responsive to loading and error states.",
      challenge_ar: "كان يجب مزامنة بيانات المستخدم والمفضلة مع Firestore مع إبقاء الواجهة متجاوبة مع حالات التحميل والأخطاء.",
      result: "A working cloud-backed app flow with authentication, profile data, and persistent favorites.",
      result_ar: "تدفق تطبيق يعمل ببيانات سحابية، ويشمل المصادقة وبيانات الملف الشخصي والمفضلة المحفوظة.",
      technologies: ["Flutter", "Firebase Authentication", "Cloud Firestore"],
      technologies_ar: ["Flutter", "Firebase Authentication", "Cloud Firestore"],
      cover_url: "assets/project-covers/meals-app.svg",
      gallery_urls: [], live_url: "", github_url: "", featured: true, published: true, sort_order: 3
    }
  ];

  const config = window.PORTFOLIO_CONFIG || {};
  const configured = Boolean(config.supabaseUrl && config.supabaseAnonKey && !config.supabaseUrl.startsWith("YOUR_") && !config.supabaseAnonKey.startsWith("YOUR_"));
  const fallbackCoverMap = { weddwish: "assets/project-covers/weddwish.svg", "lift-log": "assets/project-covers/lift-log.svg", "meals-app": "assets/project-covers/meals-app.svg" };
  let cachedProjects = null;
  const liveShowcases = [];

  function escapeHtml(value = "") {
    return String(value).replace(/[&<>'"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[char]));
  }

  function slugify(value = "") { return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }
  function getProjectSlug(project) { return project.slug || slugify(project.title) || project.id; }
  function getCover(project) { const slug = getProjectSlug(project); return project.cover_url || fallbackCoverMap[slug] || "assets/project-covers/meals-app.svg"; }
  function language() { return window.PORTFOLIO_SITE?.getLanguage?.() || "en"; }
  function reducedMotion() { return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches; }

  function localized(project, field) {
    const arabicValue = project?.[`${field}_ar`];
    if (language() === "ar" && arabicValue && (Array.isArray(arabicValue) ? arabicValue.length : String(arabicValue).trim())) return arabicValue;
    return project?.[field];
  }

  /* ------------------------------------------------------------------
     Interactive project showcase — a numbered nav list drives a large
     stage (image crossfade + animated title/copy), with an autoplay
     progress bar per item. Inspired by the "Lumina" slider pattern,
     rebuilt in plain CSS/JS (no WebGL/GSAP) to stay light on mobile.
     ------------------------------------------------------------------ */
  const AUTOPLAY_MS = 5200;
  const PROGRESS_TICK_MS = 60;

  function showcaseMarkup(projects, viewLabel, aria) {
    const stageImages = projects.map((project, index) => {
      const title = localized(project, "title") || project.title || "Project";
      return `<img class="showcase-media-img${index === 0 ? " active" : ""}" src="${escapeHtml(getCover(project))}" alt="${escapeHtml(title)}" loading="${index === 0 ? "eager" : "lazy"}" data-index="${index}">`;
    }).join("");

    const navItems = projects.map((project, index) => {
      const title = localized(project, "title") || project.title || "Project";
      return `
        <button type="button" class="showcase-nav-item${index === 0 ? " active" : ""}" data-index="${index}" aria-current="${index === 0 ? "true" : "false"}">
          <span class="showcase-nav-progress"><span class="showcase-nav-progress-fill"></span></span>
          <span class="showcase-nav-num">${String(index + 1).padStart(2, "0")}</span>
          <span class="showcase-nav-title">${escapeHtml(title)}</span>
        </button>`;
    }).join("");

    return `
      <div class="showcase">
        <div class="showcase-stage">
          <div class="showcase-media">${stageImages}</div>
          <div class="showcase-overlay">
            <div class="showcase-count"><span class="showcase-count-current">01</span><span class="showcase-count-sep">/</span><span class="showcase-count-total">${String(projects.length).padStart(2, "0")}</span></div>
            <div class="showcase-copy">
              <div class="showcase-tags"></div>
              <h3 class="showcase-title"></h3>
              <p class="showcase-summary"></p>
              <a class="pill-btn solid showcase-cta" href="#">${escapeHtml(viewLabel)} ↗</a>
            </div>
          </div>
        </div>
        <nav class="showcase-nav" aria-label="${escapeHtml(aria)}">${navItems}</nav>
      </div>`;
  }

  function createShowcase(root, projects) {
    const showcase = root.querySelector(".showcase");
    if (!showcase) return null;

    const navItems = [...showcase.querySelectorAll(".showcase-nav-item")];
    const mediaImgs = [...showcase.querySelectorAll(".showcase-media-img")];
    const countCurrent = showcase.querySelector(".showcase-count-current");
    const tagsEl = showcase.querySelector(".showcase-tags");
    const titleEl = showcase.querySelector(".showcase-title");
    const summaryEl = showcase.querySelector(".showcase-summary");
    const ctaEl = showcase.querySelector(".showcase-cta");

    let activeIndex = 0;
    let timer = null;
    let progress = 0;
    let paused = false;

    function applyCopy(index) {
      const project = projects[index];
      const title = localized(project, "title") || project.title || "Project";
      const summary = localized(project, "short_description") || (language() === "ar" ? "افتح المشروع لعرض التفاصيل." : "Open the project to view details.");
      const tech = localized(project, "technologies");
      const technologies = Array.isArray(tech) ? tech.slice(0, 4) : [];
      const slug = getProjectSlug(project);

      titleEl.textContent = title;
      summaryEl.textContent = summary;
      tagsEl.innerHTML = technologies.map(item => `<span>${escapeHtml(item)}</span>`).join("");
      ctaEl.href = `project.html?slug=${encodeURIComponent(slug)}`;
      ctaEl.setAttribute("aria-label", `${language() === "ar" ? "عرض تفاصيل مشروع" : "View"} ${title}`);
      countCurrent.textContent = String(index + 1).padStart(2, "0");

      if (!reducedMotion()) {
        const copyEl = showcase.querySelector(".showcase-copy");
        copyEl.classList.remove("is-entering");
        // Force reflow so the enter animation replays on every switch.
        void copyEl.offsetWidth;
        copyEl.classList.add("is-entering");
      }
    }

    function setActive(index, options) {
      const userInitiated = Boolean(options && options.userInitiated);
      if (index === activeIndex && !userInitiated) return;
      activeIndex = index;
      navItems.forEach((item, i) => {
        item.classList.toggle("active", i === index);
        item.setAttribute("aria-current", i === index ? "true" : "false");
        const fill = item.querySelector(".showcase-nav-progress-fill");
        if (fill) { fill.style.transition = "none"; fill.style.width = "0%"; }
      });
      mediaImgs.forEach((img, i) => img.classList.toggle("active", i === index));
      applyCopy(index);
      progress = 0;
    }

    function tick() {
      if (paused || reducedMotion() || projects.length < 2) return;
      progress += (100 / AUTOPLAY_MS) * PROGRESS_TICK_MS;
      const fill = navItems[activeIndex] && navItems[activeIndex].querySelector(".showcase-nav-progress-fill");
      if (fill) { fill.style.transition = `width ${PROGRESS_TICK_MS}ms linear`; fill.style.width = `${Math.min(progress, 100)}%`; }
      if (progress >= 100) {
        setActive((activeIndex + 1) % projects.length);
      }
    }

    function start() {
      stop();
      if (reducedMotion() || projects.length < 2) return;
      timer = window.setInterval(tick, PROGRESS_TICK_MS);
    }
    function stop() {
      if (timer) { window.clearInterval(timer); timer = null; }
    }

    navItems.forEach(item => {
      item.addEventListener("click", () => {
        const index = Number(item.dataset.index);
        if (Number.isNaN(index) || index === activeIndex) return;
        setActive(index, { userInitiated: true });
        start();
      });
    });

    showcase.addEventListener("mouseenter", () => { paused = true; });
    showcase.addEventListener("mouseleave", () => { paused = false; });
    showcase.addEventListener("focusin", () => { paused = true; });
    showcase.addEventListener("focusout", () => { paused = false; });
    document.addEventListener("visibilitychange", () => { paused = document.hidden || paused; });

    applyCopy(0);
    start();

    return {
      root,
      destroy() { stop(); }
    };
  }

  function destroyLiveShowcases() {
    while (liveShowcases.length) {
      const instance = liveShowcases.pop();
      if (instance) instance.destroy();
    }
  }

  async function fetchProjects(force = false) {
    if (cachedProjects && !force) return cachedProjects;
    if (!configured || !window.supabase) {
      cachedProjects = fallbackProjects;
      return cachedProjects;
    }
    try {
      const client = window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey);
      const { data, error } = await client.from("projects").select("*").eq("published", true).order("sort_order", { ascending: true });
      if (error) throw error;
      cachedProjects = (data || []).map(project => ({ ...project, cover_url: getCover(project) }));
      return cachedProjects;
    } catch (error) {
      console.warn("Using local project content:", error.message);
      cachedProjects = fallbackProjects;
      return cachedProjects;
    }
  }

  function renderInto(root, projects) {
    if (!root) return;
    const isAr = language() === "ar";
    if (!projects.length) {
      root.innerHTML = `<div class="empty-state">${isAr ? "لا توجد مشاريع منشورة حاليًا." : "No published projects yet."}</div>`;
      return;
    }
    const viewLabel = isAr ? "عرض المشروع" : "View case study";
    const aria = isAr ? "قائمة المشاريع" : "Projects";
    root.innerHTML = showcaseMarkup(projects, viewLabel, aria);
    const instance = createShowcase(root, projects);
    if (instance) liveShowcases.push(instance);
  }

  async function renderProjects() {
    const featuredRoot = document.getElementById("featured-projects");
    const allRoot = document.getElementById("all-projects");
    if (!featuredRoot && !allRoot) return;
    destroyLiveShowcases();
    const projects = await fetchProjects();
    if (featuredRoot) {
      const selected = projects.filter(item => item.featured).slice(0, 4);
      renderInto(featuredRoot, selected.length ? selected : projects.slice(0, 4));
    }
    if (allRoot) {
      renderInto(allRoot, projects);
    }
    window.PORTFOLIO_SITE?.observeReveals?.();
  }

  document.addEventListener("DOMContentLoaded", renderProjects);
  window.addEventListener("portfolio:languagechange", renderProjects);

  window.PORTFOLIO_PROJECTS = { fallbackProjects, getCover, getProjectSlug, escapeHtml, localized, fetchProjects };
})();
