# Master QA & System Audit — Woodex Admin PP-1

**Date:** 2026-10-12 · **Build:** FE v1.1 + Batch 3 · **Branch:** `arena/5ac37dcf-preline`
**Scope:** routes, speed, features, code quality, bugs, risks, pending tasks.
**Verdict: ✅ PASS** — 58/58 URLs 200 · zero placeholders · lint 0 errors/0 warnings ·
typecheck 0 errors · build clean · 16/16 feature markers · avg route 12ms.

---

## 1. Environment & method

- Node v22.22.3 · Next.js 15.5.27 · React 19 · TypeScript · Tailwind v4.
- Served via **production standalone** (`node .next/standalone/server.js`), fresh
  restart for cold-start measurement; timed sweep with `curl -w` after one warm-up
  pass; placeholder scan for `COMING SOON|TODO:|Not Implemented|Lorem ipsum`;
  feature panels verified by content-unique markers (the shared shell contains many
  common strings — page-unique markers only).

## 2. Route audit — 58 URLs, all pass

57 real screens + `/logs` (sidebar-linked, resolves to the planned-screen
catch-all by design). **Result: 58/58 HTTP 200, zero placeholder strings.**

| Metric | Value |
| --- | --- |
| Cold first hit after restart | 40ms (`/`) |
| Warm avg / min / max | **12ms** / 8ms / 31ms |
| Slowest routes | /payments 31ms · /pipeline 22ms · /clients 19ms · /sales 17ms · /tasks 16ms |
| Heaviest HTML | /pipeline 324KB · /payments 254KB · /sales 252KB · /clients 210KB |
| Total served (58 routes) | ~12.9MB (all SSR HTML incl. shell) |
| Server ready after boot | 146–370ms |
| Production build time | ~11s |

## 3. Feature audit — 16/16 markers present

Batch 1: /seo agent issue queue · /seo per-page checklist · /builder section
library · /chat handoff queue · /clients Client 360.
Batch 2: /builder Export JSON · /quotations dual-bank + 8 templates · /pipeline
days-in-stage cards · /whatsapp agent training · /reports XLSX/CSV.
Batch 3: /reports Sheets sync · /payments gateway adapters · /clients portal ·
/activity live collaboration · /projects AI BOQ.

## 4. Code audit

| Check | Result |
| --- | --- |
| `tsc --noEmit` | ✅ 0 errors |
| ESLint (`next/core-web-vitals`) | ✅ 0 errors / 0 warnings (after fixes below) |
| Production build | ✅ clean, ~11s |
| Size | 82 TS/TSX files · 8,027 LOC |
| `console.log` left in src/app | 0 |
| Real `any` types | 0 (one grep hit is a word inside a JSDoc comment) |
| Secrets in fixtures | none (the "apikeys" hit is a settings section label) |

## 5. Bugs found & fixed in this audit

| # | Finding | Severity | Fix |
| --- | --- | --- | --- |
| 1 | **`npm run lint` was non-functional** — ESLint never configured; it dropped into an interactive setup prompt, so linting had never run | High (process gap) | Installed `eslint@8.57` + `eslint-config-next@15.5.27`, added `.eslintrc.json` (`next/core-web-vitals`) |
| 2 | **9 raw `<a>` internal links** (blog ×2, chat ×2, pages ×1, sales-tracking ×4→(97,150,173,198), threads ×1) caused full page reloads instead of client-side navigation | Medium | Converted to `next/link` `<Link>` + imports; lint now 0 |
| 3 | ESLint v16 (flat-config) incompatible with Next 15 → "circular structure" error | Medium | Pinned eslint 8 + config-next 15.5.27 |
| 4 | JSX closing-tag mismatch introduced by the batch conversion script (threads) | Caught by tsc before ship | Fixed opening tag; tsc clean |
| 5 | `no-page-custom-font` warning is a pages-router false positive in an App Router project | Cosmetic | Rule disabled in `.eslintrc.json` with reason |

Earlier this session (already fixed & shipped): mixed-type array React-key type
error on /reports (`String(when)`); two sandbox git rollbacks recovered from the
intact remote branch — **no work lost**.

## 6. Known risks & limitations (open, by design or pending)

| Risk | Status |
| --- | --- |
| Role guard is client-side only (`localStorage.wx_role`) — no server enforcement | Pending Phase S (auth at the `roles.ts` seam) |
| Catch-all returns 200 (not 404) for unknown routes | Intentional (branded "planned" screen); revisit via `notFound()` if true-404 needed |
| Sidebar/header partials use literal `<a data-wx-route>` | By design (block grammar); enhanced by client JS |
| Heaviest pages ship 250–325KB HTML | Acceptable; trim fixture rows if bandwidth-constrained |
| No automated test runner | Verification = sweep + lint + tsc + build; smoke script pending (Phase T) |
| Sandbox recycling wipes `node_modules`/`.next` | Rebuild restores in ~60s; deploy script pending (Phase T) |
| `headers()` no-store applies in standalone only | Export mode moves cache rules to `.htaccess` (Phase D) |
| All data is fixture | By scope; adapter layer pending (Phase A) |

## 7. Pending tasks (authoritative: `MASTER-TASK-PLAN.md`)

- **D1–D4 (next):** Hostinger static-export dual-mode config, export-compat
  edits, `scripts/export-hostinger.mjs`, `deploy/hostinger/` folder.
- **D5–D8:** hPanel upload, SSL + `.htaccess`, live smoke, DB import (needs access).
- **Phase A:** fixture→API adapter over the 124-action contract.
- **Phase S:** SSO/HMAC auth, credential rotation, endpoint hardening.
- **B-wiring:** activate Batch 3 panels (Sheets keys, merchants, portal auth,
  WS/VPS, BOQ engine, SEO cron).
- **Phase T:** deploy script, `npm run verify` smoke, CI gate.

## 8. Sign-off

System state is consistent and healthy: every route serves, every planned
feature panel renders, static analysis is fully clean for the first time
(lint was never configured before this audit), and the two process bugs found
(dead lint script, reload-causing links) are fixed and verified on the
production server. Safe to proceed to Phase D.
