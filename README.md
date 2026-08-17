# Youssef Ali Kamal Portfolio — Reference Redesign V21

Static HTML/CSS/JavaScript portfolio with Supabase-backed projects, CV, About content, and Skills/Tools.

## V21 design direction

This build uses the supplied `soumyajit4419/Portfolio` repository as a visual reference for the overall atmosphere: a continuous dark background, tiny moving particles, a split hero, and subtle accent glows.

It deliberately keeps this portfolio's existing identity and behavior:

- Original floating **Tubelight navbar**
- Existing splash and entrance animations
- Existing reveal / hover / magnetic motion
- Existing custom project-card design and tilt interaction
- Existing project gallery + interactive phone demo
- English / Arabic with RTL support
- Supabase projects, publish/unpublish, Featured, screenshots, and CV controls

## Two themes

The existing theme storage keys are kept for backwards compatibility, but the visible themes are now:

- **Navy** — deep navy / blue surfaces
- **Graphite** — layered near-black / charcoal tones (not pure black)

The theme toggle switches between those two dark themes and remembers the selection.

## New admin controls

The private dashboard now also manages:

- **About** content in English and Arabic
- About lead, paragraphs, interests, quote, and quote author
- **Skills & Tools**
- Add / edit / delete
- Professional Skill vs Tool category
- English + Arabic label
- Optional icon URL
- Display order
- Publish / hide

Existing project and CV controls remain available.

## Required Supabase migration for V21

If this Supabase project already has the earlier portfolio migrations, run this file once:

```text
sql/migration-v5-content-skills.sql
```

Path in Supabase:

```text
Supabase → SQL Editor → New query
```

Paste the complete migration and run it. It creates:

- `public.site_content`
- `public.skills`
- RLS policies for public reading and owner-only editing
- Starter About content and skills/tools

It does **not** replace or delete the existing `projects` data.

For the older CV upload feature, `sql/migration-v4-cv.sql` must also have been run already.

## Run locally on Windows

Double-click:

```text
run-local.bat
```

or run:

```text
node local-server.js
```

Then open:

```text
http://127.0.0.1:5500
```

Private dashboard:

```text
http://127.0.0.1:5500/admin/login.html
```

## Publishing

Upload the **contents** of this folder to the root of the GitHub repository so `index.html`, `css/`, `js/`, `assets/`, `admin/`, and `sql/` sit at repository root.

The browser code uses only the Supabase publishable/anon key. Never add a `service_role` or secret key to frontend files.
