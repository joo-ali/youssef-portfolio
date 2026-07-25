(() => {
  const config = window.PORTFOLIO_CONFIG || {};
  const configured = Boolean(config.supabaseUrl && config.supabaseAnonKey && !config.supabaseUrl.startsWith("YOUR_") && !config.supabaseAnonKey.startsWith("YOUR_"));
  const message = document.getElementById("dashboard-message");
  const listRoot = document.getElementById("projects-list");
  const form = document.getElementById("project-form");
  const saveButton = document.getElementById("save-button");
  const deleteButton = document.getElementById("delete-button");
  const galleryInput = document.getElementById("gallery-files");
  const galleryPreview = document.getElementById("gallery-preview");
  const galleryCount = document.getElementById("gallery-count");
  let client;
  let projects = [];
  let currentId = null;
  let currentGalleryUrls = [];
  let pendingGalleryFiles = [];

  function showMessage(text, type = "error") {
    message.textContent = text;
    message.className = `notice ${type}`;
    window.setTimeout(() => message.classList.add("hidden"), type === "success" ? 4500 : 8000);
  }

  function escapeHtml(value = "") {
    return String(value).replace(/[&<>'"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[char]));
  }

  function slugify(value) {
    return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || `project-${Date.now()}`;
  }

  function setBusy(busy) {
    saveButton.disabled = busy;
    deleteButton.disabled = busy;
    saveButton.textContent = busy ? "Saving…" : "Save project";
  }

  function formValue(id) { return document.getElementById(id).value.trim(); }

  function renderGalleryPreview() {
    const existing = currentGalleryUrls.map((url, index) => `
      <figure class="gallery-preview-item">
        <img src="${escapeHtml(url)}" alt="Existing project screenshot">
        <button type="button" data-remove-existing="${index}" aria-label="Remove screenshot">×</button>
        <span>Saved</span>
      </figure>`).join("");
    const pending = pendingGalleryFiles.map((file, index) => `
      <figure class="gallery-preview-item">
        <img src="${escapeHtml(URL.createObjectURL(file))}" alt="New project screenshot preview">
        <button type="button" data-remove-pending="${index}" aria-label="Remove new screenshot">×</button>
        <span>New</span>
      </figure>`).join("");
    galleryPreview.innerHTML = existing + pending;
    galleryPreview.querySelectorAll("[data-remove-existing]").forEach(button => button.addEventListener("click", () => {
      currentGalleryUrls.splice(Number(button.dataset.removeExisting), 1);
      renderGalleryPreview();
    }));
    galleryPreview.querySelectorAll("[data-remove-pending]").forEach(button => button.addEventListener("click", () => {
      pendingGalleryFiles.splice(Number(button.dataset.removePending), 1);
      renderGalleryPreview();
    }));
    document.getElementById("existing-gallery-urls").value = JSON.stringify(currentGalleryUrls);
    if (galleryCount) galleryCount.textContent = `${currentGalleryUrls.length + pendingGalleryFiles.length} / 8`;
  }

  function clearForm() {
    currentId = null;
    currentGalleryUrls = [];
    pendingGalleryFiles = [];
    form.reset();
    document.getElementById("published").checked = true;
    document.getElementById("sort-order").value = projects.length;
    document.getElementById("project-id").value = "";
    document.getElementById("existing-cover-url").value = "";
    document.getElementById("existing-gallery-urls").value = "[]";
    document.getElementById("cover-preview").src = "";
    document.getElementById("cover-preview").classList.add("hidden");
    galleryInput.value = "";
    renderGalleryPreview();
    document.getElementById("form-title").textContent = "Add project";
    document.getElementById("editing-status").textContent = "New";
    deleteButton.classList.add("hidden");
    document.querySelectorAll(".project-row").forEach(row => row.classList.remove("active"));
  }

  function fillForm(project) {
    currentId = project.id;
    pendingGalleryFiles = [];
    currentGalleryUrls = Array.isArray(project.gallery_urls) ? [...project.gallery_urls] : [];
    document.getElementById("cover-file").value = "";
    galleryInput.value = "";
    document.getElementById("project-id").value = project.id;
    document.getElementById("title").value = project.title || "";
    document.getElementById("short-description").value = project.short_description || "";
    document.getElementById("description").value = project.description || "";
    document.getElementById("role").value = project.role || "";
    document.getElementById("challenge").value = project.challenge || "";
    document.getElementById("result").value = project.result || "";
    document.getElementById("technologies").value = Array.isArray(project.technologies) ? project.technologies.join(", ") : "";
    document.getElementById("title-ar").value = project.title_ar || "";
    document.getElementById("short-description-ar").value = project.short_description_ar || "";
    document.getElementById("description-ar").value = project.description_ar || "";
    document.getElementById("role-ar").value = project.role_ar || "";
    document.getElementById("challenge-ar").value = project.challenge_ar || "";
    document.getElementById("result-ar").value = project.result_ar || "";
    document.getElementById("technologies-ar").value = Array.isArray(project.technologies_ar) ? project.technologies_ar.join(", ") : "";
    document.getElementById("github-url").value = project.github_url || "";
    document.getElementById("live-url").value = project.live_url || "";
    document.getElementById("sort-order").value = project.sort_order ?? 0;
    document.getElementById("featured").checked = Boolean(project.featured);
    document.getElementById("published").checked = Boolean(project.published);
    document.getElementById("existing-cover-url").value = project.cover_url || "";
    document.getElementById("existing-gallery-urls").value = JSON.stringify(currentGalleryUrls);
    if (galleryCount) galleryCount.textContent = `${currentGalleryUrls.length + pendingGalleryFiles.length} / 8`;
    const preview = document.getElementById("cover-preview");
    if (project.cover_url) {
      preview.src = project.cover_url;
      preview.classList.remove("hidden");
    } else {
      preview.src = "";
      preview.classList.add("hidden");
    }
    renderGalleryPreview();
    document.getElementById("form-title").textContent = `Edit: ${project.title}`;
    document.getElementById("editing-status").textContent = project.published ? "Published" : "Hidden";
    deleteButton.classList.remove("hidden");
    document.querySelectorAll(".project-row").forEach(row => row.classList.toggle("active", row.dataset.id === project.id));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderProjects() {
    if (!projects.length) {
      listRoot.innerHTML = '<div class="empty">No projects yet. Add your first project.</div>';
      return;
    }
    listRoot.innerHTML = projects.map(project => {
      const cover = project.cover_url ? `<img src="${escapeHtml(project.cover_url)}" alt="">` : escapeHtml(project.title.slice(0, 2).toUpperCase());
      return `<article class="project-row${currentId === project.id ? " active" : ""}" data-id="${project.id}">
        <div class="project-thumb">${cover}</div>
        <div><h3>${escapeHtml(project.title)}</h3><p>${escapeHtml(project.short_description || "No description")}</p></div>
        <span class="status${project.published ? " live" : ""}">${project.published ? "Published" : "Hidden"}</span>
      </article>`;
    }).join("");
    listRoot.querySelectorAll(".project-row").forEach(row => row.addEventListener("click", () => {
      const project = projects.find(item => item.id === row.dataset.id);
      if (project) fillForm(project);
    }));
  }

  async function loadProjects() {
    listRoot.innerHTML = '<div class="spinner"></div>';
    const { data, error } = await client.from("projects").select("*").order("sort_order", { ascending: true }).order("created_at", { ascending: false });
    if (error) {
      listRoot.innerHTML = '<div class="empty">Unable to load projects.</div>';
      throw error;
    }
    projects = data || [];
    renderProjects();
  }

  function validateImage(file) {
    if (!file.type.startsWith("image/")) throw new Error(`${file.name} is not an image.`);
    if (file.size > 5 * 1024 * 1024) throw new Error(`${file.name} must be under 5 MB.`);
  }

  async function uploadImage(file, folder) {
    validateImage(file);
    const extension = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
    const path = `${folder}/${crypto.randomUUID()}.${extension}`;
    const { error } = await client.storage.from("portfolio-media").upload(path, file, { cacheControl: "3600", upsert: false });
    if (error) throw error;
    const { data } = client.storage.from("portfolio-media").getPublicUrl(path);
    return data.publicUrl;
  }

  async function uploadCover(file) {
    if (!file) return formValue("existing-cover-url") || null;
    return uploadImage(file, "projects/covers");
  }

  async function uploadGallery() {
    if (currentGalleryUrls.length + pendingGalleryFiles.length > 8) throw new Error("A project can have up to 8 screenshots.");
    const uploaded = [];
    for (const file of pendingGalleryFiles) uploaded.push(await uploadImage(file, "projects/gallery"));
    return [...currentGalleryUrls, ...uploaded];
  }

  async function initialize() {
    if (!configured || !window.supabase) {
      showMessage("Supabase is not configured. Add the project URL and publishable key to js/config.js.");
      document.querySelectorAll("button,input,textarea").forEach(element => element.disabled = true);
      return;
    }
    client = window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey);
    const { data: { session } } = await client.auth.getSession();
    const email = session?.user?.email?.toLowerCase();
    if (!session || email !== config.adminEmail.toLowerCase()) {
      if (session) await client.auth.signOut();
      window.location.replace("login.html");
      return;
    }
    document.getElementById("admin-email").textContent = session.user.email;
    try {
      await loadProjects();
      clearForm();
    } catch (error) {
      showMessage(error.message);
    }
  }

  form.addEventListener("submit", async event => {
    event.preventDefault();
    setBusy(true);
    try {
      const title = formValue("title");
      const existing = projects.find(item => item.id === currentId);
      const coverUrl = await uploadCover(document.getElementById("cover-file").files[0]);
      const galleryUrls = await uploadGallery();
      const baseSlug = slugify(title);
      const payload = {
        title,
        slug: existing?.slug || `${baseSlug}-${Date.now().toString().slice(-5)}`,
        short_description: formValue("short-description"),
        description: formValue("description") || null,
        role: formValue("role") || null,
        challenge: formValue("challenge") || null,
        result: formValue("result") || null,
        technologies: formValue("technologies").split(",").map(item => item.trim()).filter(Boolean),
        title_ar: formValue("title-ar") || null,
        short_description_ar: formValue("short-description-ar") || null,
        description_ar: formValue("description-ar") || null,
        role_ar: formValue("role-ar") || null,
        challenge_ar: formValue("challenge-ar") || null,
        result_ar: formValue("result-ar") || null,
        technologies_ar: formValue("technologies-ar").split(",").map(item => item.trim()).filter(Boolean),
        github_url: formValue("github-url") || null,
        live_url: formValue("live-url") || null,
        cover_url: coverUrl,
        gallery_urls: galleryUrls,
        sort_order: Number(document.getElementById("sort-order").value) || 0,
        featured: document.getElementById("featured").checked,
        published: document.getElementById("published").checked
      };
      const query = currentId ? client.from("projects").update(payload).eq("id", currentId) : client.from("projects").insert(payload);
      const { error } = await query;
      if (error) throw error;
      showMessage(currentId ? "Project updated successfully." : "Project added successfully.", "success");
      await loadProjects();
      clearForm();
    } catch (error) {
      const hint = /title_ar|short_description_ar|description_ar|role_ar|challenge_ar|result_ar|technologies_ar/i.test(error.message || "")
        ? " Run sql/migration-v3.sql in Supabase SQL Editor first."
        : (/gallery_urls/i.test(error.message || "") ? " Run sql/migration-v2.sql in Supabase SQL Editor first." : "");
      showMessage((error.message || "Unable to save project.") + hint);
    } finally {
      setBusy(false);
    }
  });

  deleteButton.addEventListener("click", async () => {
    if (!currentId) return;
    const project = projects.find(item => item.id === currentId);
    if (!window.confirm(`Delete “${project?.title || "this project"}”? This cannot be undone.`)) return;
    deleteButton.disabled = true;
    try {
      const { error } = await client.from("projects").delete().eq("id", currentId);
      if (error) throw error;
      showMessage("Project deleted.", "success");
      await loadProjects();
      clearForm();
    } catch (error) {
      showMessage(error.message);
    } finally {
      deleteButton.disabled = false;
    }
  });

  document.getElementById("cover-file").addEventListener("change", event => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      validateImage(file);
      const preview = document.getElementById("cover-preview");
      preview.src = URL.createObjectURL(file);
      preview.classList.remove("hidden");
    } catch (error) {
      event.target.value = "";
      showMessage(error.message);
    }
  });

  galleryInput.addEventListener("change", event => {
    try {
      const selected = [...event.target.files];
      selected.forEach(validateImage);
      if (currentGalleryUrls.length + pendingGalleryFiles.length + selected.length > 8) throw new Error("A project can have up to 8 screenshots.");
      pendingGalleryFiles.push(...selected);
      event.target.value = "";
      renderGalleryPreview();
    } catch (error) {
      event.target.value = "";
      showMessage(error.message);
    }
  });

  document.getElementById("new-project-button").addEventListener("click", clearForm);
  document.getElementById("reset-button").addEventListener("click", clearForm);
  document.getElementById("refresh-button").addEventListener("click", () => loadProjects().catch(error => showMessage(error.message)));
  document.getElementById("logout-button").addEventListener("click", async () => {
    await client.auth.signOut();
    window.location.replace("login.html");
  });

  initialize().catch(error => showMessage(error.message));
})();
