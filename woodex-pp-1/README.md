# Woodex PP-1 — Admin Dashboard (Frontend v1.1)

Complete admin for **woodex-pp-1**: 57 real screens on Preline v5 block patterns with
the Woodex Obsidian/Cyan theme. Next.js 15 App Router, server-rendered shell
(literal HTML partials), production standalone runtime. All data is fixture —
API wiring is explicitly out of scope for this phase.

## Layout

| Path | What lives there |
| --- | --- |
| `app/(dashboard)/` | 57 screens + `[...rest]` planned-screen catch-all + layout that reads the block partials |
| `public/blocks/` | Sidebar / header / 5 content block partials (copied Preline Pro HTML, served as-is) |
| `src/components/` | `BlockShell`, `BlockPartial`, `PageHeader`/`PageBody`, chart + table primitives |
| `src/lib/` | `fixture.ts` (all demo data), `nav.ts` (IA), `roles.ts` (6 roles + route guards) |
| `api/_v2.1-source/` | Verbatim PHP endpoints from Woodex v2.1 — the contract this UI is written against (not called) |
| `docs/` | Plans, audits, breakdowns — see `docs/README.md` |
| `scripts/build-theme.mjs` | Obsidian/Cyan token build |

## Run (production mode — the dashboard is only fast this way)

```bash
npm install
npm run build
cp -r public .next/standalone/public
mkdir -p .next/standalone/.next && cp -r .next/static .next/standalone/.next/static
HOSTNAME=0.0.0.0 PORT=3000 node .next/standalone/server.js
```

`npm run dev` works but is slow for page transitions — use it only when editing.
`next start` is incompatible with `output: standalone`; always run `server.js`.
After every build, re-copy `public/` and `.next/static/` into `.next/standalone/`.

## Verify

```bash
npm run typecheck && npm run lint
# then sweep every route: expect 200 + zero placeholders
```

Role switching: `localStorage.wx_role` (6 roles; route guards in `src/lib/roles.ts`).

## Status

See `docs/PROJECT-STATUS-REPORT.md` for what is shipped, what is pending
(Batch 3 / API wiring) and known gaps.
