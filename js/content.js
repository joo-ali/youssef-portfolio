(() => {
  const config = window.PORTFOLIO_CONFIG || {};
  const configured = Boolean(config.supabaseUrl && config.supabaseAnonKey && !String(config.supabaseUrl).startsWith("YOUR_") && !String(config.supabaseAnonKey).startsWith("YOUR_"));
  let client = null;
  let aboutContent = null;
  let skills = null;

  const fallbackAbout = {
    en: {
      lead: "I turn ideas into responsive mobile experiences that feel clear, useful, and polished.",
      p1: "I am a Computer Science graduate and Flutter developer with hands-on experience in Flutter, Dart, Firebase Authentication, Cloud Firestore, REST APIs, Dio, Retrofit, Bloc/Cubit, Hive, and Git/GitHub.",
      p2: "I enjoy solving technical problems, connecting applications to real backends, and continuously improving architecture and user experience.",
      interests: [
        "Exploring new Flutter packages and tools",
        "Writing about what I learn while building",
        "Contributing to and reading open-source code"
      ],
      quote: "Strive to build things that make a difference.",
      quoteAuthor: "— Youssef Ali Kamal"
    },
    ar: {
      lead: "أحوّل الأفكار إلى تطبيقات موبايل متجاوبة، واضحة، عملية، ومصممة بعناية.",
      p1: "أنا خريج علوم حاسب ومطور Flutter، لدي خبرة عملية في Flutter وDart وFirebase Authentication وCloud Firestore وREST APIs وDio وRetrofit وBloc/Cubit وHive وGit/GitHub.",
      p2: "أستمتع بحل المشكلات التقنية، وربط التطبيقات بخدمات خلفية حقيقية، وتحسين معمارية المشروع وتجربة المستخدم باستمرار.",
      interests: [
        "استكشاف حزم وأدوات Flutter الجديدة",
        "الكتابة عمّا أتعلمه أثناء البناء",
        "المساهمة في المشاريع مفتوحة المصدر وقراءة أكوادها"
      ],
      quote: "اسعَ لبناء أشياء تُحدث فرقًا حقيقيًا.",
      quoteAuthor: "— يوسف علي كمال"
    }
  };

  const fallbackSkills = [
    ["Flutter", "skill", 1], ["Dart", "skill", 2], ["Firebase Auth", "skill", 3],
    ["Cloud Firestore", "skill", 4], ["REST APIs", "skill", 5], ["Dio", "skill", 6],
    ["Retrofit", "skill", 7], ["Bloc / Cubit", "skill", 8], ["Hive", "skill", 9],
    ["Git & GitHub", "skill", 10], ["VS Code", "tool", 1], ["Android Studio", "tool", 2],
    ["Postman", "tool", 3], ["Figma", "tool", 4]
  ].map(([name, category, sort_order], index) => ({ id: `fallback-${index}`, name, name_ar: name, category, sort_order, published: true, icon_url: null }));

  function language() {
    return window.PORTFOLIO_SITE?.getLanguage?.() || (document.documentElement.lang === "ar" ? "ar" : "en");
  }

  function escapeHtml(value = "") {
    return String(value).replace(/[&<>'"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[char]));
  }

  function currentAbout() {
    const lang = language();
    return aboutContent?.[lang] || aboutContent?.en || fallbackAbout[lang] || fallbackAbout.en;
  }

  function renderAbout() {
    const data = currentAbout();
    document.querySelectorAll("[data-about-key]").forEach(node => {
      const key = node.dataset.aboutKey;
      if (data?.[key] != null) node.textContent = data[key];
    });
    const interestsRoot = document.querySelector("[data-about-interests]");
    if (interestsRoot && Array.isArray(data?.interests)) {
      interestsRoot.innerHTML = data.interests.filter(Boolean).map(item => `<li>${escapeHtml(item)}</li>`).join("");
    }
  }

  function skillLabel(skill) {
    const lang = language();
    return lang === "ar" && skill.name_ar ? skill.name_ar : skill.name;
  }

  const automaticSkillIcons = {
    "flutter": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg",
    "dart": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg",
    "firebase auth": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg",
    "cloud firestore": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg",
    "bloc / cubit": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg",
    "git & github": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
    "vs code": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg",
    "android studio": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/androidstudio/androidstudio-original.svg",
    "postman": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg",
    "figma": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg"
  };

  function automaticIconFor(skill) {
    return automaticSkillIcons[String(skill?.name || "").trim().toLowerCase()] || null;
  }

  function skillFallbackMark(label) {
    const words = String(label || "").replace(/[^A-Za-z0-9 ]/g, " ").trim().split(/\s+/).filter(Boolean);
    if (!words.length) return "◇";
    return (words.length > 1 ? words.slice(0, 2).map(word => word[0]).join("") : words[0].slice(0, 2)).toUpperCase();
  }

  function skillMarkup(skill) {
    const rawLabel = skillLabel(skill) || "Skill";
    const label = escapeHtml(rawLabel);
    const fallback = escapeHtml(skillFallbackMark(skill.name || rawLabel));
    const iconUrl = skill.icon_url || automaticIconFor(skill);
    const image = iconUrl ? `<img src="${escapeHtml(iconUrl)}" alt="" loading="lazy" onerror="this.remove()">` : "";
    return `<span class="chip skill-tile" data-skill-id="${escapeHtml(skill.id || "")}"><span class="skill-logo" data-fallback="${fallback}" aria-hidden="true">${image}</span><span class="skill-name">${label}</span></span>`;
  }

  function renderSkills() {
    const list = (skills || fallbackSkills).filter(item => item.published !== false).sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
    document.querySelectorAll("[data-skills-category]").forEach(root => {
      const category = root.dataset.skillsCategory;
      const selected = list.filter(item => item.category === category);
      root.innerHTML = selected.map(skillMarkup).join("") || `<span class="chip">${category === "tool" ? "Tools" : "Skills"}</span>`;
    });
  }

  async function loadContent() {
    renderAbout();
    renderSkills();
    if (!configured || !window.supabase) return;

    client = window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey);
    const [aboutResponse, skillsResponse] = await Promise.all([
      client.from("site_content").select("section,content").eq("section", "about").maybeSingle(),
      client.from("skills").select("*").eq("published", true).order("sort_order", { ascending: true })
    ]);

    if (!aboutResponse.error && aboutResponse.data?.content) aboutContent = aboutResponse.data.content;
    else if (aboutResponse.error) console.info("About content is using bundled fallback:", aboutResponse.error.message);

    if (!skillsResponse.error && Array.isArray(skillsResponse.data)) skills = skillsResponse.data;
    else if (skillsResponse.error) console.info("Skills are using bundled fallback:", skillsResponse.error.message);

    renderAbout();
    renderSkills();
  }

  window.addEventListener("portfolio:languagechange", () => {
    renderAbout();
    renderSkills();
  });

  document.addEventListener("DOMContentLoaded", () => {
    loadContent().catch(error => console.info("Dynamic portfolio content fallback active:", error.message));
  });
})();
