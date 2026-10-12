# Woodex Admin PP-1 — Developer Master Document

**Version:** FE v1.1 + Batch 3 fixture UI · **Date:** 2026-10-12 · **Branch:** `arena/5ac37dcf-preline`
**Audience:** any developer continuing this project. This is the single entry point —
every module, every route, every API action, and exactly what is pending.

---

## 1. What this is

Complete admin dashboard for Woodex (interior design/construction business):
**57 screens**, 6-role access model, Preline v5 block patterns, Woodex
Obsidian/Cyan theme. Next.js 15 App Router, React 19, TypeScript, Tailwind v4.

**Architecture decisions (binding):**
- **SSR shell:** sidebar/header are literal Preline Pro HTML partials in
  `public/blocks/`, read at build/request time and injected via `BlockShell`.
  They render with zero JavaScript; client code only enhances (Preline plugins,
  role highlighting). Do NOT convert them to JSX or re-mount them via fetch.
- **Fixtures, not API:** every screen renders from `src/lib/fixture.ts`. The PHP
  API contract is copied verbatim in `api/_v2.1-source/` and is the wiring
  target — the original v2.1 API/DB must never be modified.
- **Production-mode serving:** the dashboard is only fast via the standalone
  build (`node .next/standalone/server.js`). `next start` is incompatible with
  `output: standalone`.
- **Design law:** Preline block families + Obsidian/Cyan tokens only. No other
  themes/design systems/animations.

## 2. Run & verify

```bash
npm install
npm run build                                   # output: standalone
cp -r public .next/standalone/public
mkdir -p .next/standalone/.next && cp -r .next/static .next/standalone/.next/static
HOSTNAME=0.0.0.0 PORT=3000 node .next/standalone/server.js
```

After **every** build re-copy `public/` + `.next/static/` (the standalone folder
does not include them). Verify: `npm run typecheck && npm run lint`, then sweep
all 57 routes expecting HTTP 200 and zero placeholder strings. Unknown routes
intentionally render the branded "screen is planned" catch-all (200 by design,
see `app/(dashboard)/[...rest]/page.tsx`).

Role switching: `localStorage.wx_role` (dev-grade; production auth is pending — §8).

## 3. Repo layout

```
woodex-pp-1/
├── app/(dashboard)/          # 57 screens + [...rest] catch-all
│   └── layout.tsx            # reads block partials (readFileSync) → BlockShell
├── public/blocks/            # sidebar (55 unique routes), header, 5 content partials
├── src/components/           # BlockShell, BlockPartial, PageHeader/PageBody,
│   └── ui/                   # DataTable, KPI cards, chart wrappers
├── src/lib/
│   ├── fixture.ts            # ALL demo data (single source)
│   ├── nav.ts                # NAV_FLAT (used by catch-all labels)
│   └── roles.ts              # 6 roles + ROLE_ROUTES guard map
├── api/_v2.1-source/         # PHP contract: 7 files, 124 actions (read-only!)
├── docs/                     # plans/audits/reports — see docs/README.md
├── scripts/build-theme.mjs   # Obsidian/Cyan token build
└── next.config.mjs           # output: standalone; no-store headers for /blocks
```

Shared conventions used on every screen: `PageHeader`/`PageBody`; card
`bg-card border border-card-line shadow-2xs rounded-xl`; KPI card adds `p-4` +
`wx-num` for figures; pills `bg-*-500/10 ring-1 ring-inset ring-*-500/25`;
tables `divide-y divide-card-divider`, thead `bg-surface` uppercase;
WhatsApp = emerald, Telegram = sky; tone thresholds ≥80 teal / ≥60 amber / else destructive.

## 4. Roles & access

`src/lib/roles.ts` — 6 roles: **owner, admin, editor, sales, support, automation**.
`ROLE_ROUTES: Record<RoleId, string[] | "*">` gates the sidebar and routes;
`localStorage.wx_role` selects the active role (dev-grade guard).
Production replacement (pending): SSO + HMAC sessions — the seam is this one file.

## 5. Data layer (fixtures)

`src/lib/fixture.ts` exports (deterministic, generated once):

| Export | Rows | Feeds |
| --- | --- | --- |
| `LEADS` | 46 | dashboard, enquiries, pipeline, analytics, sales-tracking, reports |
| `QUOTES` | 24 | quotations, pipeline, clients, financial |
| `INVOICES` | 21 | invoices, payments, financial, clients |
| `PROJECTS` | 9 | projects (+ BOQ fixture panel), dashboard |
| `CLIENTS` | 18 | clients (360 + milestones + portal fixture), contacts |
| `PAGES` | 34 | pages, seo, city-pages, builder |
| `BLOCKS` | — | builder, library, blocks |
| `POSTS` | 14 | blog, blog/editor, content screens |
| `SERVICE_PAGES` | — | services |

Batch 1–3 feature panels (SEO agent, BOQ, gateways, Sheets, portal, WebSocket,
WA training, etc.) carry small inline fixture arrays in their page files —
each panel states its fixture status in-copy.

## 6. Module reference — all 57 screens

Sidebar (`public/blocks/classic-dashboard-sidebar.html`) exposes 55 unique
`data-wx-route` links. `/library`, `/blog`, `/blog/editor` are reachable via
in-page links; `/logs` (linked) currently resolves to the planned-screen
catch-all. Wiring target = PHP lib + actions from §7.

### 6.1 Overview & analytics
| Route | Purpose | Wiring target |
| --- | --- | --- |
| `/` | Dashboard: KPIs, revenue chart, funnel, recent leads | dash-lib: `dash_data`, `dashboard`, `stats`, `sales` |
| `/analytics` | Traffic/conversion analytics | `dash_data`, `stats`, `sales` |
| `/insights` | Business insights, trends | `dash_data`, `sales` |
| `/financial` | Revenue, receivables, P&L snapshot | `invs_list`, `payments`, `wallets` |
| `/sales-tracking` | Rep/stage tracking board | `sales`, `leads_list`, `quotes_list` |
| `/activity` | Activity feed + **Live collaboration (WS beta, U14)** | `activity` |
| `/tasks` | Task board | `leads_list` (task tags), `activity` |

### 6.2 Sales (CRM)
| Route | Purpose | Wiring target |
| --- | --- | --- |
| `/sales` | Sales overview | `sales` |
| `/enquiries` | Lead inbox (badged) | `leads_list`, `lead_save`, `lead_note`, `lead_convert`, `lead_delete`, `leads_import`, `leads_count` |
| `/pipeline` | Kanban + stage sums + **card v2: days-in-stage, follow-up, WA/Call/Quote (U9)** | `leads_list`, `status`, `lead_save` |
| `/clients` | Client list + **Client 360 + EN/UR milestones (U3)** + **self-service portal fixture (U13)** | `clients_list`, `client_save`, `client_delete` |
| `/contacts` | Contact book | `clients_list`, `leads_list` |
| `/deals` | Deal table | `quotes_list`, `lead_convert` |
| `/quotations` | Quote table + 8 starter templates + **dual-bank routing Alfalah/Meezan (U5)** | `quotes_list`, `quote_get`, `quote_save`, `quote_send`, `quote_invoice`, `quote_link`, `quote_status`, `quote_copy`, `quote_delete` |
| `/invoices` | Invoice ledger | `invs_list`, `inv_get`, `inv_save` |
| `/payments` | Payment records + **gateway adapters JazzCash/Easypaisa/Raast (U12)** | `pay_add`, `pay_delete`, `payment`, `payments`, `wallets` |
| `/bookings` | Site-visit bookings | `booking` |
| `/contracts` | Contract tracker | `quotes_list` (+ contract fields) |
| `/approvals` | Master-approval queue (discounts/publish) | `appr_list`, `appr_get`, `appr_count`, `appr_cancel`, `appr_reject`, `appr_cfg_get`, `appr_cfg_save` |
| `/projects` | Project list + progress + **AI BOQ estimator (U15)** | `projs_list`, `proj_save`, `proj_update`, `proj_delete`, `proj_photo`, `proj_photo_delete` |

### 6.3 Conversations
| Route | Purpose | Wiring target |
| --- | --- | --- |
| `/chat` | Inbox + KPIs + **AI status & handoff queue (U4)** | `chat`, `status` (chat-lib contract in P29) |
| `/threads` | Thread list | `chat` |
| `/whatsapp` | WA hub + **agent training: Q&A, tone, must-not-answer (U8)** | `crm_wa_connect`, `crm_wa_disconnect`, `crm_wa_status`, `crm_settings`, `crm_settings_save`, `crm_test` |
| `/telegram` | TG bot hub (`@WoodexInteriorBot`) | `crm_settings(_save)`, `crm_wa_status` (channel field) |
| `/calls` | Call log | `activity` (call events) |

### 6.4 Marketing
| Route | Purpose | Wiring target |
| --- | --- | --- |
| `/campaigns` | Campaign tracker | `sales`, `leads_list` (source attribution) |
| `/templates` | Message/content templates | `tpl_list`, `tpl_save`, `tpl_delete`, `tpl_import` |
| `/segments` | Audience segments | `leads_list`, `clients_list` |
| `/schedules` | Scheduled sends/scans | `schedule` |
| `/offer-engine` | Offer builder | `crm_offers`, `crm_offer_save`, `crm_offer_send`, `crm_offer_delete` |

### 6.5 Website
| Route | Purpose | Wiring target |
| --- | --- | --- |
| `/pages` | Page inventory | `pages_list`, `page_delete`, `page_meta_save` |
| `/builder` | Palette/canvas/settings + **12-category section library + filters + Import/Export JSON (U2/U7)** | `sections`, `cms_save`, `cms_get`, builder token (HMAC, `builder_token`) |
| `/library` | Section library gallery | `sections`, `tpl_list` |
| `/blocks` | Block inventory | `sections` |
| `/media` | Media manager | `cms_biz_assets` |
| `/city-pages` | City landing pages | `city` (+ `cms_list` kind=city) |
| `/blog` + `/blog/editor` | Blog list + editor | `cms_list`, `cms_save`, `cms_get`, `cms_delete`, `article`, `excerpt`, `outline`, `editor` |
| `/services` | Service pages | `service` (+ `cms_list`) |

### 6.6 SEO & AI
| Route | Purpose | Wiring target |
| --- | --- | --- |
| `/seo` | **Agent panel (U1): engine picker, issue queue, AI drafts** + **per-page checklist (U6)** + keyword table | `seo_list`, `seo_page`, `seo_save`, `seo_ai`, `seo_scores`, `seo_sitemap`, `seo_robots_save`, `scan`, `kw`, `meta`, `alt`, `schema` |
| `/speed` | Page-speed checks | `sys_check`, `status` |
| `/redirects` | 301 manager | `publish_rules` (plan json), `seo_robots_save` |
| `/ai` | AI center: engines, test console | `ai_run`, `ai_test`, `cms_ai_get`, `cms_ai_save`, `cms_ai_models` |
| `/prompts` | Prompt library | `ai_prompt`, `cms_ai_save` |
| `/training-data` | Training corpus manager | `cms_ai_save`, `ai_run` |
| `/automations` | Automation rules | `schedule`, `appr_cfg_get` |
| `/mcp-server` | MCP integration status | `sys_check`, `status` |

### 6.7 Reports & ops
| Route | Purpose | Wiring target |
| --- | --- | --- |
| `/reports` | Report runner + schedules + CSV/XLSX actions (U10) + **Google Sheets sync (U11)** | `sales`, `stats`, `reports` (cron via server) |
| `/reports/sales`, `/reports/site` | Saved report views | `sales`, `stats` |
| `/print-center` | Branded print/PDF center | `quote_get`, `inv_get` (print render) |
| `/notifications` | Notification center | `status`, `activity` |
| `/tickets` | Support tickets | `support` |
| `/changelog` | Release log | static |
| `/health` | System health | `sys_check`, `status`, `server`, `db_reconnect` |
| `/security` | Security checks & sessions | `sys_check`, `fix`, `sec` (sessions) |
| `/logs` | Server logs (planned-screen catch-all today) | `sys_check` (log tail) |

### 6.8 Settings
| Route | Purpose | Wiring target |
| --- | --- | --- |
| `/settings` | Company, branding, users, global chrome | `company_get`, `company_save`, `users`, `user_save`, `profile`, `password`, `pw_forgot`, `pw_reset`, `global_chrome`, `global_menu`, `global_replace`, `chrome_save`, `chrome_versions`, `backup_get`, `meta`, `owner`, `me`, `login`, `logout` |

## 7. API contract (`api/_v2.1-source/` — read-only reference)

Envelope: every action returns JSON `{ ok: true, … }` via `out()`; errors
`{ ok: false, error }` via `fail()` (HTTP 400/401/404/…). Auth: `login` →
HMAC token `uid.exp.sid.hmac` (12h), verified by `current_user()`; `need(roles)`
enforces role gates; `throttle()` rate-limits auth. Storage: JSON files
(`jread`/`jwrite`, chmod 600) + PDO MySQL (`db()`, `migrate()`). Page edits
back up first (`backup_page`, `cms_file_backup`).

| File | Actions | Domain |
| --- | --- | --- |
| `admin.php` | 31 | bootstrap, auth, users, roles, pages, meta, backups, sys checks |
| `content-lib.php` | 33 | CMS: blog/services/city pages, templates, AI content, sitemap |
| `crm-lib.php` | 20 | WhatsApp/Telegram hub, offers, CRM settings |
| `dash-lib.php` | 2 | dashboard aggregates |
| `roles-lib.php` | 5 | permissions |
| `sales-lib.php` | 26 | leads, quotes, invoices, payments, projects, approvals |
| `seo-lib.php` | 7 | SEO scan/save/scores |

Full action list (124): `activity, admin, ai_run, ai_test, alt, appr_cancel,
appr_cfg_get, appr_cfg_save, appr_count, appr_get, appr_list, appr_reject,
article, backup_get, chrome_save, chrome_versions, city, client_delete,
client_save, clients_list, cms_ai_get, cms_ai_models, cms_ai_save,
cms_announce_get, cms_announce_save, cms_biz_assets, cms_biz_get,
cms_biz_save, cms_delete, cms_get, cms_list, cms_page_kinds, cms_placements,
cms_placements_save, cms_published, cms_reorder, cms_save, cms_sitemap_add,
cms_status, cms_tpl_delete, cms_tpl_list, cms_tpl_save, company_get,
company_save, crm_offer_delete, crm_offer_save, crm_offer_send, crm_offers,
crm_settings, crm_settings_save, crm_test, crm_wa_connect, crm_wa_disconnect,
crm_wa_status, dash_data, dash_target_save, dashboard, db_reconnect, editor,
excerpt, faqs, fix, global_chrome, global_menu, global_replace, improve,
inv_get, inv_save, invs_list, lead_convert, lead_delete, lead_note, lead_save,
leads_count, leads_import, leads_list, login, logout, me, meta, outline, owner,
page_delete, page_meta_save, pages_list, password, pay_add, pay_delete,
profile, proj_delete, proj_photo, proj_photo_delete, proj_save, proj_update,
projs_list, pw_forgot, pw_reset, quote_copy, quote_delete, quote_get,
quote_invoice, quote_link, quote_save, quote_send, quote_status, quotes_list,
sales, seo_ai, seo_list, seo_page, seo_robots_save, seo_save, seo_scores,
seo_sitemap, setup, status, support, sys_check, tpl_delete, tpl_import,
tpl_list, tpl_save, user_save, users`

## 8. Status & pending (authoritative: `MASTER-TASK-PLAN.md`)

**Shipped:** 57 screens + Batches 1–3 (U1–U15) — P29 feature parity at UI level;
all verified on the production server (57/57 routes 200).

**Pending:**
- **D1–D4 (Hostinger deploy, next up):** dual-mode config (`WX_EXPORT` → static
  export, `WX_BASE_PATH=/admin`, `trailingSlash`), export-compat edits
  (gate `force-dynamic` + `headers()`, `generateStaticParams` for the
  catch-all), `scripts/export-hostinger.mjs`, `deploy/hostinger/` folder.
  Full pipeline: `HOSTINGER-DEPLOY-PLAN.md` (shared hosting has no Node —
  static export Track A; VPS Track B later).
- **D5–D8:** upload, SSL/.htaccess, live smoke, DB import — need hPanel access.
- **Phase A:** fixture → API adapter layer over §7, screen-by-screen.
- **Phase S:** real auth at the `roles.ts` seam (SSO + HMAC), credential
  rotation, endpoint hardening.
- **B-wiring:** activate the Batch 3 fixture panels (Sheets keys, merchant
  accounts, portal auth, WS server/VPS, BOQ engine + rate library, SEO cron).
- **Phase T:** deploy script, `npm run verify` smoke, CI gate, optional true-404.

## 9. Golden rules (from the client, binding)

1. Never modify the original v2.1 API/DB — copy & modify only.
2. Preline is the design source of truth; no other themes/design systems.
3. Block partials ship as literal HTML; never fetch-mount the shell.
4. Production standalone serving only; re-copy assets after every build.
5. Verify per page with content-unique markers (the shared header contains
   many common strings and will false-positive greps).
