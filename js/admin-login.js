(() => {
  const config = window.PORTFOLIO_CONFIG || {};
  const form = document.getElementById("login-form");
  const message = document.getElementById("login-message");
  const setupNotice = document.getElementById("setup-notice");
  const button = document.getElementById("login-button");
  const configured = Boolean(config.supabaseUrl && config.supabaseAnonKey && !config.supabaseUrl.startsWith("YOUR_") && !config.supabaseAnonKey.startsWith("YOUR_"));

  function show(node, text, type = "error") {
    node.textContent = text;
    node.className = `notice ${type}`;
  }

  if (!configured || !window.supabase) {
    show(setupNotice, "Dashboard setup is not finished yet. Add your Supabase Project URL and anon key to js/config.js, then run sql/schema.sql in Supabase.", "error");
    form.querySelectorAll("input,button").forEach(element => element.disabled = true);
    return;
  }

  const client = window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey);

  client.auth.getSession().then(({ data }) => {
    const email = data.session?.user?.email?.toLowerCase();
    if (email === config.adminEmail.toLowerCase()) window.location.replace("index.html");
  });

  form.addEventListener("submit", async event => {
    event.preventDefault();
    message.classList.add("hidden");
    button.disabled = true;
    button.textContent = "Signing in…";
    try {
      const email = document.getElementById("email").value.trim().toLowerCase();
      const password = document.getElementById("password").value;
      if (email !== config.adminEmail.toLowerCase()) throw new Error("This account is not authorized.");
      const { data, error } = await client.auth.signInWithPassword({ email, password });
      if (error) throw error;
      if (data.user?.email?.toLowerCase() !== config.adminEmail.toLowerCase()) {
        await client.auth.signOut();
        throw new Error("This account is not authorized.");
      }
      window.location.replace("index.html");
    } catch (error) {
      show(message, error.message || "Unable to sign in.");
    } finally {
      button.disabled = false;
      button.textContent = "Sign in securely";
    }
  });
})();
