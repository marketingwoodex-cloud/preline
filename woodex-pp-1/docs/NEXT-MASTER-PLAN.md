# Next Master Plan — Completion Pass (2026-10-12)

Phases 1–3 are DONE (57 routes live, production server, QA sweep green).
This plan closes everything that remains so the admin is complete and
internally consistent.

## Remaining tasks (analysis)

Six screens still carry the first-pass phase-1 markup instead of the
block-library patterns every other screen now uses ("DO NOT USE OLD" is a
standing instruction), and two housekeeping items were never closed:

| # | Task | Why |
|---|------|-----|
| 1 | Rebuild `/seo` — keyword workspace | old style; SEO group must match block patterns |
| 2 | Rebuild `/automations` — rules + run feed | old style; Intelligence group consistency |
| 3 | Rebuild `/pages` — page inventory | old style; Website group consistency |
| 4 | Rebuild `/projects` — delivery board list | old style; Website group consistency |
| 5 | Rebuild `/services` — service catalog | old style; Website group consistency |
| 6 | Rebuild `/library` — finishes & materials library | old style; distinct from /media (assets) |
| 7 | Role matrix QA | verify all 53 routes resolve for all 6 roles (no dead sidebar) |
| 8 | Production rebuild + 57-route sweep + docs status | close the loop |

## Execution order
1→6 in one pass (same tokens, same KPI/table/card grammar as Phases 1–3),
then 7 (code-level check of `src/lib/roles.ts` coverage + fix gaps),
then 8 (build, standalone restart, sweep, push).

## Out of scope (by standing decisions)
- Live API/DB wiring (fixtures remain; original v2.1 API/DB untouched).
- New design systems, colors, or animations beyond the existing theme.

## Status — 2026-10-12 (completed this pass)
- [x] 1–6: /seo, /automations, /pages, /projects, /services, /library rebuilt
      on the block-style grammar (KPIs, tables, cards, pills).
- [x] 7: role matrix QA — added /security to admin and /blog to editor
      (the only coverage gaps across 53 routes × 6 roles).
- [x] 8: production rebuild + 57-route sweep + push.
