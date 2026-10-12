# PP-1 Master Task Plan — everything pending, one page

**Date:** 2026-10-12 · **Branch:** `arena/5ac37dcf-preline` · Baseline: Frontend v1.1
shipped and verified (57 routes × 200). Details per phase live in the linked docs.

**Legend:** ✅ done · ⬜ open (can start now) · 🔒 blocked (needs real API/DB/keys/authorization)

---

## Phase D — Hostinger deployment  → `HOSTINGER-DEPLOY-PLAN.md`  (priority: NOW)

| # | Task | Status |
| --- | --- | --- |
| D1 | Dual-mode `next.config.mjs` (`WX_EXPORT` → `output: "export"`, `trailingSlash`, `WX_BASE_PATH`) | ⬜ |
| D2 | Export-compat edits: drop gated `force-dynamic` in layout; gate `headers()`; `generateStaticParams` for `[...rest]` | ⬜ |
| D3 | `scripts/export-hostinger.mjs` (build + zip) + `.gitignore` `out/`, `deploy/hostinger/dist/` | ⬜ |
| D4 | Repo reorg: `deploy/hostinger/` (htaccess files, `api/config.sample.php`, upload README) | ⬜ |
| D5 | Upload to Hostinger: `public_html/admin/` (extract zip) + `public_html/api/` (7 PHP files + server-side `config.php`) | ⬜ (needs hPanel access) |
| D6 | SSL (hPanel free LE) + root/api `.htaccess` (HTTPS force, cache, config protection) | ⬜ |
| D7 | Live smoke: 57-route sweep on the real domain + PHP health ping | ⬜ |
| D8 | PHP-side: MySQL schema import + endpoint hardening on the live API | 🔒 (DB decision; original v2.1 DB untouched per standing rule) |

## Phase A — API wiring (fixtures → real data)

| # | Task | Status |
| --- | --- | --- |
| A1 | Typed fetch adapter layer over the `api/_v2.1-source` contract (single seam) | ⬜ (design), 🔒 (execution) |
| A2 | Screen-by-screen fixture removal (start: dashboard, clients, quotations) | 🔒 |
| A3 | Real uploads/exports (PDF footers, CSV/XLSX writers) | 🔒 |
| A4 | Env-based API base URL (dev proxy vs same-origin `/api`) | ⬜ (with A1) |

## Phase S — Security & auth  → findings in `MWOODEX-MASTER-LIST.md` (A1)

| # | Task | Status |
| --- | --- | --- |
| S1 | Replace `localStorage.wx_role` demo guard with real sessions (P29-style SSO + HMAC) — seam: `src/lib/roles.ts` | 🔒 |
| S2 | Rotate/remove seeded credentials in the live stack (documented, report-only so far) | 🔒 (mwoodex session) |
| S3 | Rate limiting + input validation on live PHP endpoints | 🔒 |
| S4 | `config.php` handling rule enforced (sample in git, real file server-only, chmod 600) | ⬜ (with D4) |

## Phase B3 — Batch 3 features  → `PP1-UPGRADE-PLAN.md`

| # | Task | Status |
| --- | --- | --- |
| B1 | Google Sheets sync (leads/reports) | 🔒 (Sheets API keys) |
| B2 | Payment gateways: JazzCash / Easypaisa / Raast | 🔒 (merchant accounts) |
| B3 | Client self-service portal (quotes, milestones, review link) | 🔒 (needs auth S1 + API A2) |
| B4 | WebSockets real-time collaboration | 🔒 (needs VPS — Track B) |
| B5 | AI BOQ estimator | 🔒 (engine keys + real pricing data) |
| B6 | SEO agent scan cron / TG webhook on PHP | 🔒 (live server cron, D-phase infra) |

## Phase T — Tooling & quality

| # | Task | Status |
| --- | --- | --- |
| T1 | `scripts/deploy.mjs` for the standalone preview flow (build + asset copy + start) | ⬜ |
| T2 | Smoke-test script (57-route sweep + marker grep) wired as `npm run verify` | ⬜ |
| T3 | CI: `typecheck` + `lint` + export build on push | ⬜ |
| T4 | Optional: true 404 (`notFound()`) for non-IA paths in the catch-all | ⬜ |

## Already done (for context — details in `PROJECT-STATUS-REPORT.md`)

- ✅ 57 screens, 10-group IA, 6 role guards (Frontend v1, QA-audited)
- ✅ Production standalone preview flow (~200ms cold start, ~10–40ms/route)
- ✅ P29 breakdown + upgrade plan; Batch 1 (SEO agent, builder library, chat handoff, Client 360)
- ✅ Batch 2 (dual-bank quotes, per-page SEO checklist, builder JSON, WA training, pipeline v2, exports)
- ✅ Repo organization: README, docs index, status report

## Suggested execution order

**D1–D4 now** (no external dependencies — pure code/repo work) → **D5–D7** the moment
hPanel credentials exist → **T1/T2** alongside → **A1 design** while waiting →
**S1 + A2** once the live DB decision is made → **B1–B6** as keys/merchants arrive.
