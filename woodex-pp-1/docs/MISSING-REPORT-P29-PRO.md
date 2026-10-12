# Missing Report — PP-1 vs the documented v2.1-pro system

**Date:** 2026-10-12 · **Comparison base:** `-marketingwoodex` branch
`arena/7f38fddd-marketingwoodex`, folder `woodex-live-p29-v2.1-pro/docs/` —
four documents read in full this pass:

| Doc | Lines (verified on disk) | Documents |
| --- | --- | --- |
| `DEVELOPER-HANDBOOK.md` | 584 | 14 sections: architecture, request lifecycle, two tokens, `_private/` state, screen anatomy, roles, module map, API, conventions, QA harness, Hostinger deployment, known gaps |
| `API-REFERENCE.md` | 640 | **366 actions** across **35 handler files**, roles per action, calling front-end files |
| `MODULE-MAP.md` | 80 | **9 sidebar sections · 59 routes · 11 detail views** → view files + action counts |
| `DATA-MODEL.md` | 88 | **25 MySQL tables** (all columns) + **49 JSON stores** in `_private/` |

PP-1 side = state verified in this session (57 screens, 58 URLs × 200,
`api/_v2.1-source` contract, fixtures, QA-MASTER-AUDIT.md).

---

## 1. API contract — biggest gap

| | Documented system | PP-1 today | Missing |
| --- | --- | --- | --- |
| Handler files | 35 | 7 (copied 2026-10, from the **older** v2.1 path) | **28** |
| Actions | 366 (handbook §12: every action has exactly one handler; 349 executed locally via `php-sweep.mjs`) | 124 | **242** |

The 28 handler files PP-1 has **no copy of**: `ai-agent-lib`, `ai-center-lib`,
`booking-lib`, `logos-lib`, `p19c-lib`, `notify-lib`, `p18g-lib`, `p18j-lib`,
`google-data-lib`, `conn-lib`, `sales17-lib`, `mcp.php`, `media-lib`,
`builder.php`, `phase8-lib`, `p18e-lib`, `chat.php`, `redirects-lib`,
`p18h-lib`, `security-lib`, `arc-feed-lib`, `tg-lib`, `chat-lib`,
`whatsapp.php`, `seo-agent-lib`, `sheets-lib`, `social-lib`, `wahub-lib`.
→ Action: refresh `api/_v2.1-source/` from this branch (copy-only, pending task V5).

## 2. Routes — 59 documented vs 57 PP-1 screens

Mapping every documented route to its PP-1 counterpart (method: MODULE-MAP row
by row; merged screens noted):

- **Covered 1:1 or merged — 33:** dashboard, approvals, enquiries, pipeline,
  bookings, clients, quotes→/quotations, invoices, transactions→/payments,
  templates, projects, chat, wahub→/whatsapp, offers→/offer-engine, telegram,
  aicenter→/ai, train→/training-data, pages, builder, library, redirects, blog,
  services, cities→/city-pages, media, seo + seoagent (merged), speed,
  health + system (merged), business + settings + users (merged into /settings),
  security, activity.
- **Missing / partial — 24:** `gantt` (timeline) · `team-feed` · `wainsights` ·
  `wauto` (partial: /automations) · `settings/connections` · `social` ·
  `updates` (PP-1: planned screen) · `aireport` · `global` header/footer
  (planned) · `heroes` · `portfolio` · `pagetpl` (partial: /templates) ·
  `forms` · `estimator` (partial: AI BOQ panel on /projects) · `faqs`
  (planned) · `testimonials` (planned) · `logos` · `team` · `theme` ·
  `profile` · `backups` (planned) · `database` · `files` · `maintenance`.
- **PP-1 extras not in the documented map — 23:** analytics, insights, sales,
  sales-tracking, contacts, deals, contracts, calls, campaigns, segments,
  schedules, blocks, prompts, mcp-server, print-center, notifications,
  tickets, financial, changelog, reports (+sales/site), tasks.
- **Detail views:** 11 documented (`citydraft, connections, fields, inbox,
  integrations, invoice, post, quote, soon, study, template`) — PP-1 has only
  `/blog/editor` (≈ `post`). **10 missing** (PP-1 shows details in panels, not
  routes — a deliberate pattern difference, but the capability gap is real for
  invoice/quote/template editors).

## 3. Data model — not wired at all (by design, but it is the pending core)

- **25 MySQL tables** (`wx_leads` 33 columns, `wx_chats` 20, `wx_bookings` 18,
  `wx_clients` 15, quotes/invoices/projects/templates JSON-blob tables,
  activity/audit/throttle/session tables) — documented column-by-column.
- **49 JSON stores** in `_private/` (tokens, caches, scans, per-module
  settings, sheets/social/telegram/whatsapp state).
- PP-1 today: `src/lib/fixture.ts` only; the adapter seam `src/lib/api.ts`
  exists (WIP) but zero stores/tables are connected.

## 4. QA harness — 5 of their gates have no PP-1 equivalent

| Their gate (handbook §10.4) | Expected | PP-1 equivalent |
| --- | --- | --- |
| `master-qa.mjs` | 58 routes · stuck 0 · page errors 0 | partial — `scripts/verify.mjs` covers routes; **no stuck-UI / page-error probe** |
| `theme-contrast.mjs` | 8/8 runs, belowAA 0 | **missing** |
| `responsive-sweep.mjs` | 58 screens · 0 overflow | **missing** |
| `phplint.js` | 54/54 parse | **missing** (no PHP in the build loop) |
| `css-check.mjs` | balanced | **missing** |
| PHP execution sweep | 349 actions executed (SQLite driver) | n/a until contract refresh |

## 5. Auth & security

Documented: two HMAC tokens (admin 12h + builder token), `need([...])` role
gates server-side, `throttle()`, login-attempts store, one-time audit-key
pattern (`wx-audit.php`). PP-1: `localStorage.wx_role` client-only — **Phase S
replaces this at the `roles.ts` seam**.

## 6. Deployment tooling

Documented flow (handbook §11): zip → `public_html` root · `wx-install.php`
once (writes `_private/db.json`, imports schema, creates Master) then **delete
it** · `wx-audit.php?k=` one-time audit · `_private/` writable 755 and **never
overwritten on update** · cron `wa-cron.php`.
PP-1: static-export pipeline exists as **uncommitted WIP** (`deploy/hostinger/`,
`scripts/export-hostinger.mjs`) — pending verify + approval. The two deploys
must coexist: v2.1-pro PHP site at root, PP-1 admin at `/admin` (or replace —
owner decision, task O2).

## 7. Their own unverified list (handbook §12) — inherited when wiring

MySQL dialect (local runs used the SQLite driver) · ~50 lesser-used screens on
stub data until the owner's SQL dump · PageSpeed needs outbound HTTP on the
host · owner decisions: invoice print design, section library 51 vs 70 blocks,
template-card actions, dark-mode palette.

---

**Bottom line:** PP-1 is a complete, verified *front end* whose documented
back end is **3× larger** than the contract copy it was written against
(366 vs 124 actions, 35 vs 7 files), with 24 documented screens and all 25
tables / 49 stores still unwired. The execution sequence lives in
`MASTER-PENDING-TASKS.md`.
