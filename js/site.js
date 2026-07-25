(() => {
  const translations = {
    en: {
      "nav.home": "Home",
      "nav.projects": "Projects",
      "nav.skills": "Skills",
      "nav.contact": "Contact",
      "actions.themeDark": "Switch to dark theme",
      "actions.themeLight": "Switch to light theme",
      "actions.language": "Switch language",
      "actions.menuOpen": "Open navigation",
      "actions.menuClose": "Close navigation",
      "home.heroCopy": "Flutter developer focused on responsive, user-friendly mobile applications and dependable product experiences.",
      "home.heroKicker": "Creative mobile developer",
      "home.heroTitle": "Flutter Developer",
      "home.heroName": "Youssef Ali Kamal",
      "home.scroll": "Scroll to explore",
      "home.aboutLead": "I turn ideas into responsive mobile experiences that feel clear, useful, and polished.",
      "home.aboutP1": "I am a Computer Science graduate and Flutter developer with hands-on experience in Flutter, Dart, Firebase Authentication, Cloud Firestore, REST APIs, Dio, Retrofit, Bloc/Cubit, Hive, and Git/GitHub.",
      "home.aboutP2": "I enjoy solving technical problems, connecting applications to real backends, and continuously improving architecture and user experience.",
      "home.moreSkills": "More about my skills",
      "home.downloadCV": "Download CV",
      "home.selectedWork": "Selected work",
      "home.worksTitle": "Impressive Works",
      "home.worksIntro": "A selection of projects that reflect my experience with mobile development, backend integration, authentication, storage, and scalable application flows.",
      "home.exploreProjects": "Explore all projects",
      "projects.eyebrow": "Projects archive",
      "projects.title": "Useful products and thoughtful mobile experiences",
      "projects.intro": "Mobile applications and systems shaped by real requirements, technical challenges, and a strong focus on usability.",
      "skills.title": "Skills that fuel my passion",
      "skills.mobileTitle": "Mobile App Development",
      "skills.mobileText": "Building cross-platform mobile applications with clean flows, reusable components, and responsive layouts.",
      "skills.firebaseTitle": "Firebase Integration",
      "skills.firebaseText": "Authentication, cloud data, user profiles, storage, and application state connected to Firebase services.",
      "skills.apiTitle": "API Integration",
      "skills.apiText": "Connecting apps to remote services with structured networking, error handling, and model serialization.",
      "skills.stateTitle": "State Management",
      "skills.stateText": "Organizing application logic into predictable states for maintainable screens and user interactions.",
      "skills.localTitle": "Local Data",
      "skills.localText": "Fast local persistence for user preferences, offline flows, and app data.",
      "skills.versionTitle": "Version Control",
      "skills.versionText": "Structured commits and effective collaboration.",
      "skills.qualityTitle": "Testing & Quality",
      "skills.qualityText": "Finding issues, debugging flows, and improving reliability.",
      "skills.coreTitle": "Core Computer Science",
      "skills.coreText": "A solid foundation in programming principles, system thinking, networking fundamentals, and practical problem solving.",
      "contact.eyebrow": "Available for opportunities",
      "contact.title": "Have a project or opportunity? Let’s talk.",
      "contact.whatsapp": "Chat on WhatsApp",
      "contact.email": "Email",
      "contact.phone": "WhatsApp",
      "contact.linkedin": "LinkedIn",
      "contact.location": "Location",
      "contact.locationValue": "Giza, Egypt",
      "footer.description": "Flutter developer building responsive mobile products, clean interfaces, and reliable backend-connected experiences.",
      "footer.navigation": "Navigation",
      "footer.contact": "Get in touch",
      "footer.home": "Home",
      "footer.projects": "Projects",
      "footer.skills": "Skills",
      "footer.backTop": "Back to top",
      "footer.rights": "All rights reserved.",
      "footer.downloadCV": "Download CV ↓",
      "project.loading": "Loading project details…",
      "projects.loading": "Loading projects…"
    },
    ar: {
      "nav.home": "الرئيسية",
      "nav.projects": "المشاريع",
      "nav.skills": "المهارات",
      "nav.contact": "تواصل",
      "actions.themeDark": "التبديل إلى الوضع الداكن",
      "actions.themeLight": "التبديل إلى الوضع الفاتح",
      "actions.language": "تغيير اللغة",
      "actions.menuOpen": "فتح القائمة",
      "actions.menuClose": "إغلاق القائمة",
      "home.heroCopy": "مطور Flutter أركز على بناء تطبيقات موبايل متجاوبة وسهلة الاستخدام وتجارب رقمية موثوقة.",
      "home.heroKicker": "مطور تطبيقات موبايل",
      "home.heroTitle": "مطور Flutter",
      "home.heroName": "يوسف علي كمال",
      "home.scroll": "مرّر لاستكشاف الموقع",
      "home.aboutLead": "أحوّل الأفكار إلى تطبيقات موبايل متجاوبة، واضحة، عملية، ومصممة بعناية.",
      "home.aboutP1": "أنا خريج علوم حاسب ومطور Flutter، لدي خبرة عملية في Flutter وDart وFirebase Authentication وCloud Firestore وREST APIs وDio وRetrofit وBloc/Cubit وHive وGit/GitHub.",
      "home.aboutP2": "أستمتع بحل المشكلات التقنية، وربط التطبيقات بخدمات خلفية حقيقية، وتحسين معمارية المشروع وتجربة المستخدم باستمرار.",
      "home.moreSkills": "اعرف المزيد عن مهاراتي",
      "home.downloadCV": "تنزيل السيرة الذاتية",
      "home.selectedWork": "أعمال مختارة",
      "home.worksTitle": "مشاريع مميزة",
      "home.worksIntro": "مجموعة من المشاريع التي توضح خبرتي في تطوير تطبيقات الموبايل، وربط الأنظمة الخلفية، والمصادقة، والتخزين، وتدفقات التطبيقات القابلة للتوسع.",
      "home.exploreProjects": "استعرض كل المشاريع",
      "projects.eyebrow": "أرشيف المشاريع",
      "projects.title": "منتجات عملية وتجارب موبايل مصممة بعناية",
      "projects.intro": "تطبيقات وأنظمة مبنية على متطلبات حقيقية وتحديات تقنية، مع اهتمام قوي بسهولة الاستخدام.",
      "skills.title": "مهارات تدعم شغفي",
      "skills.mobileTitle": "تطوير تطبيقات الموبايل",
      "skills.mobileText": "بناء تطبيقات متعددة المنصات بتدفقات واضحة ومكونات قابلة لإعادة الاستخدام وواجهات متجاوبة.",
      "skills.firebaseTitle": "التكامل مع Firebase",
      "skills.firebaseText": "المصادقة والبيانات السحابية وملفات المستخدمين والتخزين وربط حالة التطبيق بخدمات Firebase.",
      "skills.apiTitle": "ربط واجهات API",
      "skills.apiText": "ربط التطبيقات بالخدمات الخارجية مع تنظيم الشبكات ومعالجة الأخطاء وتحويل البيانات إلى Models.",
      "skills.stateTitle": "إدارة الحالة",
      "skills.stateText": "تنظيم منطق التطبيق في حالات واضحة لتسهيل صيانة الشاشات وتفاعلات المستخدم.",
      "skills.localTitle": "البيانات المحلية",
      "skills.localText": "تخزين محلي سريع لتفضيلات المستخدم والعمل دون اتصال وبيانات التطبيق.",
      "skills.versionTitle": "إدارة الإصدارات",
      "skills.versionText": "تنظيم الـ commits والتعاون الفعال على المشاريع.",
      "skills.qualityTitle": "الاختبار والجودة",
      "skills.qualityText": "اكتشاف المشكلات وتتبع الأخطاء وتحسين موثوقية التطبيق.",
      "skills.coreTitle": "أساسيات علوم الحاسب",
      "skills.coreText": "أساس قوي في مبادئ البرمجة والتفكير المنظومي وأساسيات الشبكات وحل المشكلات عمليًا.",
      "contact.eyebrow": "متاح لفرص العمل والتعاون",
      "contact.title": "لديك مشروع أو فرصة؟ دعنا نتحدث.",
      "contact.whatsapp": "تواصل عبر واتساب",
      "contact.email": "البريد الإلكتروني",
      "contact.phone": "واتساب",
      "contact.linkedin": "لينكدإن",
      "contact.location": "الموقع",
      "contact.locationValue": "الجيزة، مصر",
      "footer.description": "مطور Flutter أبني منتجات موبايل متجاوبة وواجهات واضحة وتجارب موثوقة مرتبطة بالـ backend.",
      "footer.navigation": "التنقل",
      "footer.contact": "تواصل معي",
      "footer.home": "الرئيسية",
      "footer.projects": "المشاريع",
      "footer.skills": "المهارات",
      "footer.backTop": "العودة للأعلى",
      "footer.rights": "جميع الحقوق محفوظة.",
      "footer.downloadCV": "تنزيل السيرة الذاتية ↓",
      "project.loading": "جارٍ تحميل تفاصيل المشروع…",
      "projects.loading": "جارٍ تحميل المشاريع…"
    }
  };

  const pageTitles = {
    home: { en: "Youssef Ali Kamal — Flutter Developer", ar: "يوسف علي كمال — مطور Flutter" },
    projects: { en: "Projects — Youssef Ali Kamal", ar: "المشاريع — يوسف علي كمال" },
    skills: { en: "Skills — Youssef Ali Kamal", ar: "المهارات — يوسف علي كمال" },
    project: { en: "Project — Youssef Ali Kamal", ar: "مشروع — يوسف علي كمال" }
  };

  function getLanguage() {
    return localStorage.getItem("portfolio-language") === "ar" ? "ar" : "en";
  }

  function t(key, fallback = "") {
    const lang = getLanguage();
    return translations[lang]?.[key] ?? translations.en[key] ?? fallback;
  }

  function setLanguage(language, notify = true) {
    const lang = language === "ar" ? "ar" : "en";
    localStorage.setItem("portfolio-language", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.body?.classList.toggle("rtl", lang === "ar");

    document.querySelectorAll("[data-i18n]").forEach(node => {
      node.textContent = t(node.dataset.i18n, node.textContent);
    });
    document.querySelectorAll("[data-i18n-html]").forEach(node => {
      node.innerHTML = t(node.dataset.i18nHtml, node.innerHTML);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(node => {
      node.setAttribute("placeholder", t(node.dataset.i18nPlaceholder, node.getAttribute("placeholder") || ""));
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(node => {
      node.setAttribute("aria-label", t(node.dataset.i18nAria, node.getAttribute("aria-label") || ""));
    });

    const page = document.body?.dataset.page;
    if (page && pageTitles[page]) document.title = pageTitles[page][lang];

    document.querySelectorAll(".language-toggle").forEach(button => {
      button.textContent = lang === "ar" ? "EN" : "AR";
      button.setAttribute("aria-label", t("actions.language"));
      button.setAttribute("title", t("actions.language"));
    });

    if (notify) window.dispatchEvent(new CustomEvent("portfolio:languagechange", { detail: { language: lang } }));
  }

  function preferredTheme() {
    const saved = localStorage.getItem("portfolio-theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function setTheme(theme) {
    const next = theme === "dark" ? "dark" : "light";
    localStorage.setItem("portfolio-theme", next);
    document.documentElement.dataset.theme = next;
    document.querySelectorAll(".theme-toggle").forEach(button => {
      const isDark = next === "dark";
      button.innerHTML = isDark ? '<span aria-hidden="true">☀</span>' : '<span aria-hidden="true">☾</span>';
      button.setAttribute("aria-label", t(isDark ? "actions.themeLight" : "actions.themeDark"));
      button.setAttribute("title", t(isDark ? "actions.themeLight" : "actions.themeDark"));
    });
  }


  function setupAmbientBackground() {
    if (document.querySelector(".ambient-background")) return;
    const layer = document.createElement("div");
    layer.className = "ambient-background";
    layer.setAttribute("aria-hidden", "true");
    layer.innerHTML = `
      <div class="ambient-grid"></div>
      <span class="ambient-orb ambient-orb-one"></span>
      <span class="ambient-orb ambient-orb-two"></span>
      <span class="ambient-orb ambient-orb-three"></span>
      <span class="ambient-path ambient-path-one"><i></i></span>
      <span class="ambient-path ambient-path-two"><i></i></span>
      <span class="ambient-path ambient-path-three"><i></i></span>
    `;
    document.body.prepend(layer);
  }

  function setupControls() {
    document.querySelectorAll(".language-toggle").forEach(button => {
      button.addEventListener("click", () => setLanguage(getLanguage() === "ar" ? "en" : "ar"));
    });
    document.querySelectorAll(".theme-toggle").forEach(button => {
      button.addEventListener("click", () => setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark"));
    });
  }


  async function setupCvLinks() {
    const links = [...document.querySelectorAll("[data-cv-link]")];
    if (!links.length) return;
    const fallback = "assets/Youssef_Ali_Kamal_CV.pdf";
    links.forEach(link => { if (!link.getAttribute("href")) link.href = fallback; });
    const cfg = window.PORTFOLIO_CONFIG || {};
    if (!window.supabase || !cfg.supabaseUrl || !cfg.supabaseAnonKey || cfg.supabaseUrl.startsWith("YOUR_")) return;
    try {
      const cvClient = window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey);
      const { data } = cvClient.storage.from("portfolio-media").getPublicUrl("site/cv/Youssef_Ali_Kamal_CV.pdf");
      const remoteUrl = data?.publicUrl;
      if (!remoteUrl) return;
      const response = await fetch(`${remoteUrl}?check=${Date.now()}`, { method: "HEAD", cache: "no-store" });
      if (!response.ok) return;
      links.forEach(link => {
        link.href = remoteUrl;
        link.setAttribute("download", "Youssef_Ali_Kamal_CV.pdf");
      });
    } catch (_) {
      // Keep the bundled CV as a reliable fallback.
    }
  }

  function setupMenu() {
    const button = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav");
    if (!button || !nav) return;
    const close = () => {
      nav.classList.remove("open");
      document.body.classList.remove("nav-open");
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", t("actions.menuOpen"));
      button.textContent = "☰";
    };
    button.addEventListener("click", () => {
      const open = !nav.classList.contains("open");
      nav.classList.toggle("open", open);
      document.body.classList.toggle("nav-open", open);
      button.setAttribute("aria-expanded", String(open));
      button.setAttribute("aria-label", t(open ? "actions.menuClose" : "actions.menuOpen"));
      button.textContent = open ? "×" : "☰";
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", close));
    document.addEventListener("pointerdown", event => {
      if (!nav.classList.contains("open")) return;
      if (nav.contains(event.target) || button.contains(event.target)) return;
      close();
    });
    document.addEventListener("keydown", event => { if (event.key === "Escape") close(); });
    window.addEventListener("resize", () => { if (window.innerWidth > 760) close(); });
  }

  function observeReveals() {
    const items = document.querySelectorAll(".reveal:not(.visible)");
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach(item => item.classList.add("visible"));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -30px" });
    items.forEach(item => observer.observe(item));
  }

  function setupHeroMotion() {
    const image = document.querySelector(".hero-portrait");
    const hero = document.querySelector(".hero");
    if (!image || !hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    hero.addEventListener("pointermove", event => {
      if (window.innerWidth < 981) return;
      const x = (event.clientX / window.innerWidth - 0.5) * 10;
      const y = (event.clientY / window.innerHeight - 0.5) * 6;
      image.style.setProperty("--motion-x", `${x}px`);
      image.style.setProperty("--motion-y", `${y}px`);
    });
    hero.addEventListener("pointerleave", () => {
      image.style.setProperty("--motion-x", "0px");
      image.style.setProperty("--motion-y", "0px");
    });
  }

  document.documentElement.dataset.theme = preferredTheme();
  document.documentElement.lang = getLanguage();
  document.documentElement.dir = getLanguage() === "ar" ? "rtl" : "ltr";

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-year]").forEach(node => { node.textContent = new Date().getFullYear(); });
    setLanguage(getLanguage(), false);
    setTheme(preferredTheme());
    setupAmbientBackground();
    setupControls();
    setupMenu();
  setupCvLinks();
    setupHeroMotion();
    observeReveals();
  });

  window.PORTFOLIO_SITE = { t, getLanguage, setLanguage, setTheme, observeReveals };
})();
