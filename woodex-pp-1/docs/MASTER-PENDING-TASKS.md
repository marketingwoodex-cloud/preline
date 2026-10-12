# Master Pending Tasks — verify → clean → organize → approve → deploy Hostinger

**Date:** 2026-10-12 · **Rule set by owner:** *nothing starts until verify is
complete, the project is updated, and approval is given.* Phases run in order;
each ends with a gate.

**Verified reference data** (from the four docs on `-marketingwoodex`
`arena/7f38fddd-marketingwoodex` → `woodex-live-p29-v2.1-pro/docs/`, read this
pass): **366 actions / 35 handler files** (API-REFERENCE, 640 lines) ·
**9 sections / 59 routes / 11 detail views** (MODULE-MAP) · **25 MySQL tables +
49 `_private/` JSON stores** (DATA-MODEL) · 14-section handbook incl. QA gates
(master-qa 58 routes/stuck 0 · theme-contrast 8/8 · responsive-sweep 58 ·
phplint 54/54 · css-check) and the Hostinger install flow (wx-install →
wx-audit → `_private/` never overwritten). Gaps quantified in
`MISSING-REPORT-P29-PRO.md`.

**Legend:** ✅ done · ▶ next · ⬜ open · 🔒 needs owner/access

---

## Phase V — Verify project is complete & updated  ▶ (in progress)

| # | Task | Status |
| --- | --- | --- |
| V1 | Preserve in-flight WIP on the branch (dual-mode `next.config.mjs`, export-gated layout, catch-all `generateStaticParams` + true-404, nav `/logs` + stale-flag fix, `src/lib/api.ts` adapter, `scripts/verify|deploy|export-hostinger.mjs`, `deploy/hostinger/` package) | ✅ committed with this doc (static checks only — not yet built) |
| V2 | Static gates: `tsc --noEmit` + `next lint` = 0 errors | ⬜ (part of the approval run) |
| V3 | Build + standalone verify: `npm run deploy` then `npm run verify` → 58 routes 200 + 404 probe | ⬜ |
| V4 | Export proof: `npm run export:hostinger` → `out/` + `dist/admin.zip`, inspect `quotations/index.html` + `/admin` asset prefix | ⬜ |
| V5 | Contract refresh: re-copy `api/` from `woodex-live-p29-v2.1-pro/` (35 files, copy-only per golden rule) replacing the 7-file `_v2.1-source` | ⬜ |
| V6 | Update `DEVELOPER-MASTER-DOCUMENT.md` §7 to the 366-action/25-table reality; align action names in `api.ts` adapter | ⬜ |
| **Gate V** | **Owner reviews verify output → says “updated ✅”** | 🔒 |

## Phase R — Remove old server runs

| # | Task | Status |
| --- | --- | --- |
| R1 | Stop every running `node .next/standalone/server.js` (one is live now — preview `woodex-pp-1-admin-*`, port 3000) | ⬜ (kept alive for preview until Gate V) |
| R2 | Delete stale build dirs (`.next/`, `out/`) so nothing serves an old shell | ⬜ |
| R3 | One canonical way to run: `npm run deploy -- --start` (documented in README; retire ad-hoc commands) | ⬜ |

## Phase U — Run the updated project

| # | Task | Status |
| --- | --- | --- |
| U1 | Fresh install + build from the committed tree (`npm install && npm run deploy`) | ⬜ |
| U2 | Start single server; `npm run verify` green on the NEW build | ⬜ |
| U3 | Spot-check the 16 Batch 1–3 feature markers | ⬜ |
| **Gate U** | **Owner opens the preview → says “approve” before any Hostinger step** | 🔒 |

## Phase C — Clean files

| # | Task | Status |
| --- | --- | --- |
| C1 | Remove `scripts/tmp/` scratch (apikey-*.txt, gen_apikey.py, team-head.html — generator leftovers, unused) | ⬜ |
| C2 | Archive superseded docs → `docs/archive/` (PHASE-PLAN, MASTER-PLAN, NEXT-MASTER-PLAN); keep index current | ⬜ |
| C3 | `.gitignore`: add `out/`, `deploy/hostinger/dist/`, `scripts/tmp/` | ⬜ |
| C4 | Confirm `public/blocks/` has no duplicate/stale partials | ⬜ |

## Phase O — Organize for Hostinger deployment

| # | Task | Status |
| --- | --- | --- |
| O1 | Finalize `deploy/hostinger/` (upload README, root+api `.htaccess`, `config.sample.php`) — drafted in WIP, verify at Gate V | ⬜ |
| O2 | **Owner decision:** PP-1 admin at `public_html/admin/` **alongside** the v2.1-pro PHP site at root (their zip, handbook §11 flow), or standalone | 🔒 |
| O3 | DB on host: phpMyAdmin import `woodex-database.sql`; run `wx-install.php` once, then delete it; `_private/` writable 755, never overwritten on update | 🔒 (hPanel) |
| O4 | Security pass: `config.php` server-only (chmod 600), `wx-audit.php` one-time key then delete, SSL on, cron `wa-cron.php` optional | 🔒 (hPanel) |
| O5 | Live smoke: `node scripts/verify.mjs https://<domain>/admin` | ⬜ after O1–O4 |

## Phase X — Blocked / owner-dependent (from handbook §12 + prior plans)

| # | Item | Unblocked by |
| --- | --- | --- |
| X1 | MySQL-dialect pass (their local runs used SQLite driver) | one pass on real MySQL |
| X2 | ~50 screens on stub data | owner's SQL dump |
| X3 | PageSpeed real measurement | outbound HTTP on host |
| X4 | Owner decisions: invoice print design · section library 51 vs 70 · template-card actions · dark-mode palette | owner |
| X5 | Phase S auth (SSO/HMAC at `roles.ts` seam), credential rotation | API live |
| X6 | B-wiring: Sheets keys, merchant accounts, portal auth, WS/VPS, BOQ engine | keys/accounts |
| X7 | PP-1 screens missing vs MODULE-MAP (24) + detail views (10) — build order after approval | Gate U + priorities |

## Current snapshot (for the record)

- Branch `arena/5ac37dcf-preline` @ `3a72a15` + this commit; tree otherwise clean.
- WIP files (V1 list) are committed but **unverified** — V2–V4 run only after
  this report is acknowledged.
- Old server: still running on port 3000 serving the pre-WIP build (kept for
  preview; removed in R1).
- `mwoodex` workspace: re-cloned sparse (`/home/user/mwoodex`) with the four
  docs + both Hostinger guides for reference.
