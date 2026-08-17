(() => {
  const config = window.PORTFOLIO_CONFIG || {};
  const root = document.getElementById("content-admin-root");
  if (!root || !window.supabase || !config.supabaseUrl || !config.supabaseAnonKey) return;

  const client = window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey);
  const message = document.getElementById("content-admin-message");
  const aboutForm = document.getElementById("about-form");
  const skillsList = document.getElementById("skills-admin-list");
  const skillForm = document.getElementById("skill-form");
  const skillId = document.getElementById("skill-id");
  let skills = [];

  function show(text, type = "info") {
    if (!message) return;
    message.textContent = text;
    message.className = `content-notice${type === "error" ? " error" : ""}`;
    message.hidden = false;
    window.clearTimeout(show.timer);
    show.timer = window.setTimeout(() => { message.hidden = true; }, type === "error" ? 9000 : 4500);
  }

  function value(id) { return document.getElementById(id)?.value?.trim() || ""; }
  function escapeHtml(value = "") { return String(value).replace(/[&<>'"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c])); }
  function lines(id) { return value(id).split(/\r?\n/).map(v => v.trim()).filter(Boolean); }

  function fillAbout(content = {}) {
    const en = content.en || {};
    const ar = content.ar || {};
    const values = {
      "about-lead-en": en.lead, "about-p1-en": en.p1, "about-p2-en": en.p2,
      "about-interests-en": Array.isArray(en.interests) ? en.interests.join("\n") : "",
      "about-quote-en": en.quote, "about-author-en": en.quoteAuthor,
      "about-lead-ar": ar.lead, "about-p1-ar": ar.p1, "about-p2-ar": ar.p2,
      "about-interests-ar": Array.isArray(ar.interests) ? ar.interests.join("\n") : "",
      "about-quote-ar": ar.quote, "about-author-ar": ar.quoteAuthor
    };
    Object.entries(values).forEach(([id, val]) => { const el = document.getElementById(id); if (el) el.value = val || ""; });
  }

  async function loadAbout() {
    const { data, error } = await client.from("site_content").select("section,content").eq("section", "about").maybeSingle();
    if (error) throw new Error(`${error.message} — run sql/migration-v5-content-skills.sql first.`);
    fillAbout(data?.content || {});
  }

  async function saveAbout(event) {
    event.preventDefault();
    const button = document.getElementById("save-about-button");
    button.disabled = true;
    button.textContent = "Saving…";
    const content = {
      en: {
        lead: value("about-lead-en"), p1: value("about-p1-en"), p2: value("about-p2-en"),
        interests: lines("about-interests-en"), quote: value("about-quote-en"), quoteAuthor: value("about-author-en")
      },
      ar: {
        lead: value("about-lead-ar"), p1: value("about-p1-ar"), p2: value("about-p2-ar"),
        interests: lines("about-interests-ar"), quote: value("about-quote-ar"), quoteAuthor: value("about-author-ar")
      }
    };
    try {
      const { error } = await client.from("site_content").upsert({ section: "about", content }, { onConflict: "section" });
      if (error) throw error;
      show("About section updated successfully.");
    } catch (error) {
      show(`${error.message || "Unable to save About."} Run sql/migration-v5-content-skills.sql if the table is missing.`, "error");
    } finally {
      button.disabled = false;
      button.textContent = "Save About";
    }
  }

  function resetSkillForm() {
    skillForm.reset();
    skillId.value = "";
    document.getElementById("skill-category").value = "skill";
    document.getElementById("skill-order").value = skills.length + 1;
    document.getElementById("skill-published").checked = true;
    document.getElementById("skill-save-button").textContent = "Add skill";
    document.getElementById("skill-cancel-button").classList.add("hidden");
  }

  function fillSkill(skill) {
    skillId.value = skill.id;
    document.getElementById("skill-name").value = skill.name || "";
    document.getElementById("skill-name-ar").value = skill.name_ar || "";
    document.getElementById("skill-category").value = skill.category || "skill";
    document.getElementById("skill-icon-url").value = skill.icon_url || "";
    document.getElementById("skill-order").value = skill.sort_order ?? 0;
    document.getElementById("skill-published").checked = skill.published !== false;
    document.getElementById("skill-save-button").textContent = "Save changes";
    document.getElementById("skill-cancel-button").classList.remove("hidden");
  }

  function renderSkills() {
    if (!skills.length) {
      skillsList.innerHTML = '<div class="content-empty">No skills yet. Add the first one below.</div>';
      return;
    }
    skillsList.innerHTML = skills.map(skill => `
      <article class="skill-admin-row${skill.published ? "" : " hidden-skill"}" data-id="${escapeHtml(skill.id)}">
        <div class="skill-admin-main">
          <strong>${escapeHtml(skill.name)}</strong>
          <span>${escapeHtml(skill.name_ar || "No Arabic label")}</span>
          <span class="skill-category-badge">${escapeHtml(skill.category)} · ${skill.published ? "visible" : "hidden"} · #${Number(skill.sort_order || 0)}</span>
        </div>
        <div class="skill-admin-actions">
          <button type="button" class="skill-mini-btn" data-toggle="${escapeHtml(skill.id)}">${skill.published ? "Hide" : "Publish"}</button>
          <button type="button" class="skill-mini-btn" data-edit="${escapeHtml(skill.id)}">Edit</button>
          <button type="button" class="skill-mini-btn danger" data-delete="${escapeHtml(skill.id)}">Delete</button>
        </div>
      </article>`).join("");

    skillsList.querySelectorAll("[data-edit]").forEach(btn => btn.addEventListener("click", () => {
      const item = skills.find(skill => skill.id === btn.dataset.edit);
      if (item) fillSkill(item);
    }));
    skillsList.querySelectorAll("[data-toggle]").forEach(btn => btn.addEventListener("click", () => toggleSkill(btn.dataset.toggle)));
    skillsList.querySelectorAll("[data-delete]").forEach(btn => btn.addEventListener("click", () => deleteSkill(btn.dataset.delete)));
  }

  async function loadSkills() {
    const { data, error } = await client.from("skills").select("*").order("category", { ascending: true }).order("sort_order", { ascending: true });
    if (error) throw new Error(`${error.message} — run sql/migration-v5-content-skills.sql first.`);
    skills = data || [];
    renderSkills();
  }

  async function saveSkill(event) {
    event.preventDefault();
    const id = skillId.value;
    const payload = {
      name: value("skill-name"),
      name_ar: value("skill-name-ar") || null,
      category: document.getElementById("skill-category").value,
      icon_url: value("skill-icon-url") || null,
      sort_order: Number(document.getElementById("skill-order").value) || 0,
      published: document.getElementById("skill-published").checked
    };
    if (!payload.name) return show("Skill name is required.", "error");
    const button = document.getElementById("skill-save-button");
    button.disabled = true;
    try {
      const query = id ? client.from("skills").update(payload).eq("id", id) : client.from("skills").insert(payload);
      const { error } = await query;
      if (error) throw error;
      await loadSkills();
      resetSkillForm();
      show(id ? "Skill updated." : "Skill added.");
    } catch (error) {
      show(`${error.message || "Unable to save skill."} Run sql/migration-v5-content-skills.sql if needed.`, "error");
    } finally {
      button.disabled = false;
    }
  }

  async function toggleSkill(id) {
    const skill = skills.find(item => item.id === id);
    if (!skill) return;
    const { error } = await client.from("skills").update({ published: !skill.published }).eq("id", id);
    if (error) return show(error.message, "error");
    await loadSkills();
    show(skill.published ? "Skill hidden from the public site." : "Skill published.");
  }

  async function deleteSkill(id) {
    const skill = skills.find(item => item.id === id);
    if (!skill || !window.confirm(`Delete “${skill.name}”?`)) return;
    const { error } = await client.from("skills").delete().eq("id", id);
    if (error) return show(error.message, "error");
    await loadSkills();
    if (skillId.value === id) resetSkillForm();
    show("Skill deleted.");
  }

  async function init() {
    const { data: { session } } = await client.auth.getSession();
    const email = session?.user?.email?.toLowerCase();
    if (!session || !email || email !== String(config.adminEmail || "").toLowerCase()) return;
    try {
      await Promise.all([loadAbout(), loadSkills()]);
      resetSkillForm();
    } catch (error) {
      show(error.message, "error");
    }
  }

  aboutForm?.addEventListener("submit", saveAbout);
  skillForm?.addEventListener("submit", saveSkill);
  document.getElementById("skill-cancel-button")?.addEventListener("click", resetSkillForm);
  document.getElementById("skills-refresh-button")?.addEventListener("click", () => loadSkills().catch(error => show(error.message, "error")));

  init().catch(error => show(error.message, "error"));
})();
