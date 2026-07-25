# Portfolio Dashboard Site — V5

This version keeps the phone demo frame visible for every project. When a **Live Demo URL** is saved in the private dashboard, that URL loads as an interactive application inside the phone frame. When no URL is available, the frame remains visible with a small coming-soon state.

# Youssef Portfolio + Private Dashboard — Version 3

Responsive bilingual portfolio based on the supplied Figma direction.

## Included

- Responsive Home, Projects, Skills, and Project Details pages
- Mobile-first layout tested at 320px, 390px, 768px, 944px, 1366px, and 1440px widths
- Light and dark themes with saved preference
- English and Arabic with RTL support and saved preference
- Localized project fields editable from the private dashboard
- Supabase-powered projects, authentication, database, and image storage
- Private `/admin` dashboard restricted to `yo231415@gmail.com`
- Add, edit, delete, publish, hide, feature, and reorder projects
- Project cover and gallery uploads
- GitHub, live-demo, and Flutter Web/emulator live demo URLs

## Run locally on Windows

1. Close any older portfolio server window using `Ctrl+C`.
2. Double-click `run-local.bat`.
3. Keep the terminal window open.
4. Open:

```text
http://127.0.0.1:5500
```

Private dashboard:

```text
http://127.0.0.1:5500/admin/login.html
```

## Supabase update for Version 3

The existing database already has Version 1 and Version 2. Open:

**Supabase → SQL Editor → New query**

Run the complete contents of:

```text
sql/migration-v3.sql
```

This adds Arabic project fields:

- `title_ar`
- `short_description_ar`
- `description_ar`
- `role_ar`
- `challenge_ar`
- `result_ar`
- `technologies_ar`

The dashboard then shows an **Arabic project content** section for every project.

## Fresh Supabase setup

For a completely new Supabase project, run `sql/schema.sql` instead. It creates all tables, policies, storage rules, English fields, Arabic fields, and starter projects.

## Security

- There is no public registration page.
- Dashboard authentication uses Supabase email/password.
- Row Level Security only allows `yo231415@gmail.com` to insert, update, or delete.
- Visitors can only read published projects.
- Use only the browser-safe publishable/anon key in `js/config.js`.
- Never add the Supabase `service_role` or secret key to browser code.

## Publishing online

Upload the folder contents to a GitHub repository, enable GitHub Pages from the main branch and root folder, then connect a custom domain later from repository **Settings → Pages**.

## Interactive app demo

A normal webpage cannot run an Android APK directly. Build and deploy the application as Flutter Web, then save its deployed URL in the dashboard under **Live demo URL (also used in the phone emulator)**. It will appear inside the phone frame on the project-details page.


## Splash V7
The splash appears on every full load of the home page. Add `?intro=0` to skip it temporarily.


## V8 theme update
The public dark theme now uses the navy color family from the home hero instead of pure black.


## V10 typography test
- Space Grotesk for English display headings.
- Inter for English body text.
- IBM Plex Sans Arabic for Arabic text.
- Reduced oversized headings and improved mobile type scale.


## V11 hero contrast
Added a navy fade behind the hero typography plus a subtle dark stroke/shadow so the white title stays readable over the white shirt.

## V13 additions
- Downloadable CV at `assets/Youssef_Ali_Kamal_CV.pdf`.
- Original animated signal-field background using the existing navy/blue palette.
- Contact location: Giza, Egypt / الجيزة، مصر.

## V14 visual update

The animated ambient field is visible across all public pages. Each content section, project card, skill card, case-study card, contact item, and live-demo area uses a high-contrast translucent panel for readability in both light and navy-dark themes.


## V15 CV upload
Run `sql/migration-v4-cv.sql` once in Supabase SQL Editor, then use the Portfolio CV panel in `/admin/`.

## V16 design update
The hero summary is now a compact editorial rail aligned to the content edge and is hidden on narrow phones to keep the portrait uncluttered.
