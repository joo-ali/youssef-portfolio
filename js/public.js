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

  function escapeHtml(value = "") {
    return String(value).replace(/[&<>'"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[char]));
  }

  function slugify(value = "") { return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }
  function getProjectSlug(project) { return project.slug || slugify(project.title) || project.id; }
  function getCover(project) { const slug = getProjectSlug(project); return project.cover_url || fallbackCoverMap[slug] || "assets/project-covers/meals-app.svg"; }
  function language() { return window.PORTFOLIO_SITE?.getLanguage?.() || "en"; }

  function localized(project, field) {
    const arabicValue = project?.[`${field}_ar`];
    if (language() === "ar" && arabicValue && (Array.isArray(arabicValue) ? arabicValue.length : String(arabicValue).trim())) return arabicValue;
    return project?.[field];
  }

  function initials(title = "") {
    const words = title.trim().split(/\s+/).filter(Boolean);
    if (!words.length) return "YK";
    if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  }

  function cardMarkup(project) {
    const title = localized(project, "title") || project.title || "Project";
    const summary = localized(project, "short_description") || (language() === "ar" ? "افتح المشروع لعرض التفاصيل." : "Open the project to view details.");
    const tech = localized(project, "technologies");
    const technologies = Array.isArray(tech) ? tech : [];
    const tag = technologies[0] || (language() === "ar" ? "مشروع Flutter" : "Flutter App");
    const slug = getProjectSlug(project);
    const cover = getCover(project);
    const aria = language() === "ar" ? `عرض تفاصيل مشروع ${title}` : `View ${title} project details`;
    const dotCount = Math.min(Math.max(Array.isArray(project.gallery_urls) ? project.gallery_urls.length : 0, technologies.length, 1), 4);
    const dots = Array.from({ length: dotCount }).map((_, i) => `<span class="${i === 0 ? "active" : ""}"></span>`).join("");

    return `
      <article class="project-card reveal">
        <a class="project-card-link" href="project.html?slug=${encodeURIComponent(slug)}" aria-label="${escapeHtml(aria)}">
          <img class="project-card-bg" src="${escapeHtml(cover)}" alt="" loading="lazy">
          <div class="project-card-scrim"></div>
          <div class="project-card-content">
            <div class="project-card-header">
              <div class="project-card-heading">
                <h3 class="project-card-title">${escapeHtml(title)}</h3>
                <p class="project-card-desc">${escapeHtml(summary)}</p>
              </div>
              <span class="project-card-mark" aria-hidden="true">${escapeHtml(initials(title))}</span>
            </div>
            <div class="project-card-footer">
              <span class="project-card-tag">${escapeHtml(tag)}</span>
              <div class="project-card-dots" aria-hidden="true">${dots}</div>
            </div>
          </div>
        </a>
      </article>`;
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

  async function renderProjects() {
    const featuredRoot = document.getElementById("featured-projects");
    const allRoot = document.getElementById("all-projects");
    if (!featuredRoot && !allRoot) return;
    const projects = await fetchProjects();
    if (featuredRoot) {
      const selected = projects.filter(item => item.featured).slice(0, 4);
      featuredRoot.innerHTML = (selected.length ? selected : projects.slice(0, 4)).map(cardMarkup).join("");
    }
    if (allRoot) {
      allRoot.innerHTML = projects.length ? projects.map(cardMarkup).join("") : `<div class="empty-state">${language() === "ar" ? "لا توجد مشاريع منشورة حاليًا." : "No published projects yet."}</div>`;
    }
    window.PORTFOLIO_SITE?.observeReveals?.();
  }

  document.addEventListener("DOMContentLoaded", renderProjects);
  window.addEventListener("portfolio:languagechange", renderProjects);

  window.PORTFOLIO_PROJECTS = { fallbackProjects, getCover, getProjectSlug, escapeHtml, localized, fetchProjects };
})();
