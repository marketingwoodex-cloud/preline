# Woodex PP-1 — Project Status Report

**Date:** 2026-10-12 · **Branch:** `arena/5ac37dcf-preline` @ `4915207` (pushed, clean tree)
**State:** Frontend v1.1 — complete, verified, production-served. API wiring intentionally not started.

---

## 1. Recent work (this cycle)

### a) P29 v2.1-pro analysis
- Pulled and read the `woodex live p29-v2.1 pro/` release package (SEO agent P41,
  AI center, CRM, WA hub, quote/bank engine, 147-section builder).
- Wrote `P29-BREAKDOWN-VS-PP1.md`: full feature tree, parity table, and the **5 real gaps**
  (SEO on-page agent, builder section library, Client 360 + milestones, chat agent
  status/handoff, quote templates + bank routing). Everything else already had parity.
- Wrote `PP1-UPGRADE-PLAN.md` (3 batches).

### b) Batch 1 — shipped (`df46d1b`)
- `/seo` — agent panel: scan controls, issue queue with approve/discard, AI draft
  titles/meta/alt, backup-first + Master-approval semantics.
- `/builder` — palette/canvas/settings shell + 12-category section library.
- `/chat` — KPIs + AI status banner + human handoff queue.
- `/clients` — Client 360 timeline + bilingual EN/UR milestone engine (4 stages, photos, review link).

### c) Batch 2 — shipped (`4915207`)
- `/quotations` — dual-bank routing (Bank Alfalah / Meezan, IBAN + Swift, region
  mapping, PDF footers) + 1-click quote→invoice; the 8 starter templates shipped earlier.
- `/seo` — per-page checklist panel (title/meta/H1/alts/schema/canonical/OG, scored).
- `/builder` — category filter chips + Export/Import section JSON.
- `/whatsapp` — agent training: Q&A pairs, tone picker, must-not-answer list + handoff rule.
- `/pipeline` — card v2: days-in-stage, follow-up date, WA/Call/Quote quick actions.
- `/reports` — CSV + XLSX export actions.

### d) Verification after every batch (re-run today)
- `npm install` + `next build` → clean compile, `output: standalone`.
- Production server (`node .next/standalone/server.js`, ready ~200ms).
- **All 57 routes: HTTP 200, zero placeholders.** Catch-all serves the intended
  branded "screen is planned" page (200 by design, documented in code).
- Per-page marker checks for all 10 upgraded screens (Batch 1 + 2) — all present.

> Note: today the sandbox environment was reset (local `.git` rolled back, `node_modules`
> and `.next` wiped). Everything was recovered from the intact remote branch — **no work
> lost** — and the build/server were restored from scratch as proof the setup is reproducible.

## 2. What exists now

- **57 screens**, 10-group IA, ~7,800 lines of TS/TSX, 6 roles with route guards.
- Preline v5 block patterns only; Obsidian/Cyan v2.1 tokens; literal HTML partials at runtime.
- Docs set (plans, QA audit, P29 breakdown, upgrade plan, this report) + new top-level
  `README.md` and `docs/README.md` index (organization pass, this cycle).

## 3. What is still missing (by design — needs authorization/real backend)

| # | Missing | Why it's not done |
| --- | --- | --- |
| 1 | **API wiring** — every screen runs on `src/lib/fixture.ts` | Explicitly out of scope; PHP contract copied to `api/_v2.1-source/` unchanged |
| 2 | **Real auth** — roles switch via `localStorage.wx_role` | Demo-grade guard; production needs P29-style SSO + HMAC sessions |
| 3 | **Batch 3 features** — Google Sheets sync, payment gateways (JazzCash/Easypaisa/Raast), client self-service portal, WebSocket collaboration, AI BOQ estimator | Each requires live API/DB or third-party keys |
| 4 | **Automated tests** — verification is route sweep + marker grep + `typecheck`/`lint` | No test runner installed; acceptable for a fixture-only FE phase |
| 5 | **Real uploads/exports** — export buttons and PDF footers are UI-complete but write nothing | Same reason as #1 |

## 4. What needs to change (recommended, when scope opens)

1. **Deploy script** — the post-build copy of `public/` + `.next/static/` into
   `.next/standalone/` is manual and easy to forget; wrap build+copy+start in
   `scripts/deploy.mjs` and a `serve` npm script.
2. **Auth swap point** — `src/lib/roles.ts` is the single seam; replace localStorage
   with session middleware before any real data flows.
3. **Catch-all status** — currently 200 for unknown routes (intentional for "Soon" links).
   If the admin ever needs true 404 semantics, call `notFound()` for non-IA paths.
4. **Fixture → API adapter** — introduce one typed fetch layer over the
   `api/_v2.1-source` contract so pages swap from fixtures screen-by-screen.
5. **Security items** — seeded credentials and hardening notes live in
   `MWOODEX-MASTER-LIST.md` (section A1) and belong to the `-marketingwoodex`
   execution session, not this one.

## 5. Pending queue (next actions, in order)

1. **Batch 3** — only when real API/DB access is authorized (Sheets sync first, then
   gateways, then portal/WebSockets/AI BOQ).
2. **API wiring** — adapter layer per item 4 above; screen-by-screen fixture removal.
3. **Auth hardening** — per item 2 above.
4. **Tooling polish** — deploy script, smoke-test script, CI lint+typecheck gate.

## 6. Commit chain (all pushed to `arena/5ac37dcf-preline`)

`4915207` Batch 2 ← `df46d1b` P29 breakdown + plan + Batch 1 ← `42940d0` QA audit + FE v1 + mwoodex list ← earlier build history (57 screens).
