# Hostinger Shared-Hosting Deployment Plan

**Goal:** deploy the PP-1 admin (57 screens) + the copied PHP API to Hostinger **shared
hosting** (hPanel, `public_html`), with a folder organization that mirrors the server
layout in the repo.

**Hard constraint (verified 2026-10-12):** Hostinger shared hosting has **no Node.js
runtime** — only PHP + MySQL + Apache. The current `output: "standalone"` build
(`node .next/standalone/server.js`) cannot run there. Two tracks:

- **Track A — shared hosting (this plan):** convert to **static export** (`output: "export"`).
  Works today because every screen runs on fixture data and role switching is client-side
  (`localStorage.wx_role`); no `next/image`, no route handlers, no cookies/headers usage.
  The PHP API deploys alongside natively.
- **Track B — VPS (later):** when API wiring/real-time features start (Batch 3), move the
  Node standalone server to a Hostinger VPS and keep the PHP API on shared hosting or
  move both. Track A's export stays valid as a fallback.

---

## 1. Target server layout (Hostinger `public_html`)

```
public_html/
├── index.html              # landing/redirect → /admin/ (or the future marketing site)
├── .htaccess               # HTTPS force + cache headers (below)
├── admin/                  # ← Next static export (the 57 screens)
│   ├── index.html
│   ├── quotations/index.html … (trailingSlash: true → folder/index.html per route)
│   ├── _next/static/…      # hashed JS/CSS
│   └── blocks/…            # shell partials (static files, no runtime read needed)
└── api/                    # ← PHP endpoints (copied + modified v2.1)
    ├── admin.php
    ├── content-lib.php  crm-lib.php  dash-lib.php
    ├── roles-lib.php    sales-lib.php  seo-lib.php
    ├── config.php          # DB creds — created ON the server, NEVER committed
    ├── .htaccess           # deny config.php, CORS for the admin origin
    └── _v2.1-source/       # do NOT upload; reference copy stays in repo only
```

Notes:
- `trailingSlash: true` makes every route a real folder → deep links
  (`/admin/quotations/`) resolve on Apache with **zero rewrite rules**.
- The export bakes the sidebar/header shell into every HTML file (the layout's
  `readFileSync` runs at build time), so `blocks/` is just static assets then.
- `api/config.php` is the only file that differs server↔repo; ship
  `config.sample.php` and create the real one in hPanel (File Manager), chmod 600.

## 2. Repo reorganization (mirrors the server)

```
woodex-pp-1/
├── deploy/hostinger/            # NEW — everything deploy-related
│   ├── README.md                # upload checklist (steps 1–9 below)
│   ├── htaccess/root.htaccess   # HTTPS force + static cache
│   ├── htaccess/api.htaccess    # protect config.php
│   └── api/config.sample.php    # template for the server-side config
├── scripts/
│   └── export-hostinger.mjs     # NEW — build:export + zip → deploy/hostinger/dist/admin.zip
├── out/                         # export output (add to .gitignore)
└── (everything else unchanged)
```

## 3. Code changes required for static export (small, dual-mode)

Keep the standalone build working for local preview — switch by env flag:

1. **`next.config.mjs`** — `output: process.env.WX_EXPORT ? "export" : "standalone"`,
   `trailingSlash: true` when exporting, `basePath: process.env.WX_BASE_PATH ?? ""`
   (set `WX_BASE_PATH=/admin` for Hostinger).
2. **`app/(dashboard)/layout.tsx`** — drop `export const dynamic = "force-dynamic"`
   (it blocks export; `readFileSync` still runs at build time and bakes the shell in).
   Keep it behind `!process.env.WX_EXPORT` if the standalone path needs it.
3. **`next.config.mjs headers()`** — not supported in export mode; gate it the same way
   and move the cache rules into `.htaccess` (`_next/static` → immutable 1y, HTML → no-cache).
4. **`app/(dashboard)/[...rest]/page.tsx`** — add `generateStaticParams()` from
   `NAV_FLAT` (the planned-screen routes) so the catch-all exports as real folders.
5. No other blockers verified: no `next/image`, no route handlers, no
   cookies/headers/searchParams anywhere.

## 4. Export + upload pipeline

1. `WX_EXPORT=1 WX_BASE_PATH=/admin node scripts/export-hostinger.mjs`
   → builds with `output: export`, zips `out/` **contents** → `deploy/hostinger/dist/admin.zip`.
2. hPanel → File Manager → `public_html/` → delete `default.php` if present.
3. Create `public_html/admin/`, upload `admin.zip` there, right-click → **Extract**
   (zip contains `index.html` at its root — the contents, not the folder).
4. Upload the 7 PHP files to `public_html/api/` (from `api/_v2.1-source/`).
5. Create `config.php` on the server from `config.sample.php` (MySQL creds from
   hPanel → Databases). chmod 600.
6. Upload the two `.htaccess` files (root + api).
7. hPanel → SSL → install free Let's Encrypt; root `.htaccess` forces HTTPS.
8. Smoke test: `https://<domain>/admin/` + 57-route sweep from the live URL +
   one PHP endpoint ping (`/api/admin.php?health`).
9. Re-deploy = rebuild zip → replace `admin/` contents (API untouched).

## 5. `.htaccess` contents (planned)

- **root:** HTTPS redirect; `Cache-Control: public, max-age=31536000, immutable` for
  `/admin/_next/static/`; `no-cache` for `/admin/**.html` and `/admin/blocks/`;
  `DirectoryIndex index.html`; optional `/` → `/admin/` redirect.
- **api:** `<Files config.php> Require all denied </Files>`; CORS
  `Access-Control-Allow-Origin: https://<domain>`.

## 6. What shared hosting can NOT do (plan around it)

| Needs Node/long-running | Where it goes |
| --- | --- |
| The Next server itself | Not needed — static export (Track A) |
| SEO agent scan cron, TG polling/webhooks | PHP cron via hPanel (hPanel → Cron Jobs) or Track B VPS |
| WebSockets, real-time collaboration | Track B VPS only (Batch 3) |
| Anything in Batch 3 | Track B VPS or third-party services |

## 7. Acceptance criteria

- [ ] `out/` export builds clean with zero `force-dynamic`/headers errors.
- [ ] All 57 routes return 200 on the live domain via the route-sweep script.
- [ ] Sidebar/header render with JS disabled (they are baked into HTML).
- [ ] `config.php` never appears in git history (sample only).
- [ ] HTTPS-only; mixed-content check clean.
- [ ] Re-deploy is a single scripted zip+extract (documented in `deploy/hostinger/README.md`).
