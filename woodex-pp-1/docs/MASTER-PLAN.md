# Woodex PP-1 — Master Plan

**Design system:** Preline UI v5.0.0 (MIT) · **Theme:** Woodex Obsidian + Cyan · **Stack:** Next.js 15.5 App Router + Tailwind v4
**Date:** 2026-10-12 · **Branch:** `arena/5ac37dcf-preline` · **Location:** `woodex-pp-1/`

---

## 1. What was analysed

Three sources, read directly rather than assumed.

### 1.1 Preline UI v5 (this repository, `05ca599`)

| Area | Finding |
|---|---|
| Version | `5.0.0`, MIT, published to npm |
| Plugins | 32 in `src/plugins/` — accordion, carousel, collapse, combobox, copy-markup, datatable, datepicker, dropdown, file-upload, input-number, layout-splitter, overlay, pin-input, range-slider, remove-element, scroll-nav, scrollspy, select, stepper, strong-password, tabs, textarea-auto-height, theme-switch, toggle-count, toggle-password, tooltip, tree-view, accessibility-manager |
| Built output | 156 files in `dist/` (`.js` / `.mjs` / `.d.ts`) |
| Theming | `theme.css` — **246 semantic tokens** in `:root`, mapped to Tailwind utilities through `@theme inline` |
| Templates | **5** only: `dashboards/cms-admin`, `ai/ai-chat-interface`, `ecommerce/coffee-shop`, `websites/digital-agency`, `websites/personal-portfolio` |
| Agent assets | `skills/preline-mcp/` (catalog map, composite layouts, MCP tool reference) and `skills/theme-generator/` (token reference, palette guidance, validation checklist) |

The `skills/preline-mcp/references/catalog-map.md` ontology is what a dashboard routes to:

- **Data Display** → Analytics & KPIs · Operational & Activity Views · Tables & Records
- **Navigation & Layout** → Application Headers & Navigation · Sidebars & Shells
- **Application Pages** → Workspaces & Admin
- **Productivity** → Planning Boards (the kanban)
- **Authentication** → Sign In & Account Access

### 1.2 Woodex Admin v2.1 (the thing being rebuilt)

`marketingwoodex-cloud/-marketingwoodex` @ `arena/8a776c65-marketingwoodex`, commit `f86258a`, path `woodex live p29-v2.1/`.

- `admin/` — **60 `admin-*.js` modules**, ~1.06 MB of JavaScript, no framework, no build step
- `api/` — **44 PHP files**, ~800 KB, single router (`admin.php`, 52 KB) + `*-lib.php` modules
- Largest modules: `admin-content.js` 122 KB · `admin-sales17.js` 106 KB · `admin-sales.js` 80 KB · `admin-chrome.js` 53 KB · `admin-media.js` 55 KB
- Theme tokens ("Preline Ocean Pure", `MASTER-PLAN-V2.1.md`): `#0b0d13` canvas · `#111318` card · `#181c24` elevated · `#20242f` border · `#00b8db` / `#00d3f2` cyan · `#c59b27` gold on the auth card

The v2.1 repo already contains the conclusions its own audits reached, and PP-1 adopts them
instead of re-deriving them:

| Source document | Conclusion carried forward |
|---|---|
| `ADMIN-DEEP-AUDIT-AND-PLAN.md` §Q2 | Collapse **34 flat menu items into 7 groups** |
| `ADMIN-DEEP-AUDIT-AND-PLAN.md` §1.6 | The old dashboard "shows website numbers only. No leads pipeline, quotes, invoices, chats or projects" → business numbers first, website demoted to one panel |
| `MASTER-PLAN-P19.md` P3 | **Settings = one page with tabs**; sidebar shows only "Settings" |
| `MASTER-PLAN-P19.md` F1 | Pipeline needs stage totals, owner avatar, drag + won/lost reason, fit-to-screen |
| `ADMIN-DEEP-AUDIT-AND-PLAN.md` root causes A & B | Builder session fallback; bundled CA list for outbound SSL |

### 1.3 TailAdmin

Kept as a **reference only**. It was the fallback option; Preline was chosen, so nothing was
copied from it. It stays useful as a comparison for the v2.5 roadmap (its free tier is MIT).

---

## 2. Decisions

| # | Decision | Rationale |
|---|---|---|
| D1 | **Preline v5 tokens**, not hand-rolled CSS variables | Every Preline block already consumes `bg-card`, `text-muted-foreground`, `border-card-line`. Custom variables would mean restyling each block by hand. |
| D2 | **Generated theme**, not a hand-written one | `theme.css` defines 246 tokens and its own `.dark` block overrides only **153**. A hand-written override silently leaves ~90 tokens (card, dropdown, overlay, popover, select, footer, tooltip, switch, table, scrollbar, chart, map) on the light scale inside dark mode. |
| D3 | **Obsidian + Cyan**, dark-first, light included | Exact v2.1 palette, converted to oklch so it composes with Preline's oklch scales. |
| D4 | **Core 7 groups / 13 screens** in phase 1 | Parity with the v2.1 IA without porting 60 modules blind. |
| D5 | **Fixtures first, PHP copied alongside** | The UI must build and preview with no server, no DB, no keys. The copied PHP is the contract, not a dependency. |
| D6 | **Never touch the original API or database** | PP-1 reads the v2.1 contract shape; it does not write to `wx_*` tables or call the live endpoints. |
| D7 | **Charts read tokens at runtime** | ApexCharts options are built from `getComputedStyle`, so a chart follows the theme instead of shipping two hardcoded palettes. Preline's own `helpers/apexcharts` hardcodes `dark:bg-neutral-800`-style classes, which would ignore the Woodex theme — so it is deliberately not used. |

---

## 3. Design system

### 3.1 Surface stack

Upstream Preline sets dark `--background`, `--card`, `--layer`, `--overlay` and `--footer`
**all** to `neutral-800` — cards are flat against the canvas. Woodex is a layered stack
instead, and `scripts/build-theme.mjs` emits it as an authoritative final block:

| Level | Token(s) | Obsidian | Hex |
|---|---|---|---|
| L0 canvas | `--background`, `--sidebar`, `--navbar`, `--footer` | 950 | `#0b0d13` |
| L1 card | `--card`, `--dropdown`, `--popover`, `--overlay`, `--select` | 900 | `#111318` |
| L2 raised | `--layer-hover`, `--surface`, `--muted`, `*-item-hover`, `*-nav-hover` | 800 | `#181c24` |
| L3 line | `--border`, `--*-line`, `--*-divider`, `--table-line` | 700 | `#20242f` |

### 3.2 Type ramp

| Use | Size / weight |
|---|---|
| Page title | 20 px / 700, tracking-tight |
| Card title | 14 px / 600 |
| Body | 14 px / 400, `text-muted-foreground` for secondary |
| Table header | 11 px / 600, uppercase, tracking-wide |
| KPI value | 24 px / 700, tabular numerals |

Font: **Inter** (the v2.1 icon/typography directive already standardised on Inter).

### 3.3 Chart series

Cyan-led, then gold, then the status families — replaces upstream's
blue/red/amber/green/purple/orange rainbow so charts read as part of the same system:

`--chart-1 #00b8db` · `--chart-2 #00d3f2` · `--chart-3 #c59b27` · `--chart-4` emerald · `--chart-5 #005b73`

### 3.4 Dark-mode contrast fix

Upstream sets `--primary-foreground: white`. On `#00b8db` that is ~2.1:1 — unreadable.
The Woodex override sets it to obsidian-950 (near-black on cyan), matching the v2.1
signature button. Light mode uses cyan-600 (`#007595`) with white text instead, which
clears 4.5:1.

### 3.5 Theme switching

Preline's `theme-switch` plugin owns it: `data-hs-theme-switch` + `data-hs-theme-click-value`,
writing the `hs_theme` key and toggling `light` / `dark` / `auto` classes on `<html>`.
The generated CSS selector is `:is(.dark, .auto.dark)` so auto-dark matches too. An inline
pre-paint script applies the same key and class names, and migrates the legacy v2.1
`wxaTheme` value once.

---

## 4. Information architecture

34 flat items → 7 groups. `src/lib/nav.ts`.

```
Overview          Dashboard
Sales             Enquiries(7) · Pipeline · Clients · Quotations(3) · Invoices(2) · Projects · Client updates*
Conversations     Live chat* · Train AI*
Website           Pages · Page builder* · Section library · Header & footer* · Media*
Content           Blog · Services · FAQs* · Testimonials*
Marketing & SEO   SEO · Redirects*
Settings          Settings · Activity log* · Backups*
```
`*` = in the IA, renders the planned-screen placeholder, port deferred.

---

## 5. Phase 1 scope — built and verified

13 screens, all returning HTTP 200 with correct titles:

| Route | Group | Built from |
|---|---|---|
| `/` | Overview | `dash_data` — KPI strip, target, needs-attention, revenue vs collected, pipeline by stage, recent enquiries, leads by source, website health |
| `/enquiries` | Sales | `wx_leads` — 8 columns, 5 filters, sortable, search |
| `/pipeline` | Sales | Kanban, 5 open stages, drag-and-drop, stage totals + weighted forecast |
| `/clients` | Sales | One record per client, lifetime value, unpaid, linked enquiries |
| `/quotations` | Sales | Single / Project / BOQ, 8 starter templates, status KPIs |
| `/invoices` | Sales | Balances, overdue, payment methods (Bank Alfalah / Meezan) |
| `/projects` | Sales | 5-stage bilingual workflow (Design ڈیزائن → Handover حوالگی) |
| `/pages` | Website | Status, SEO score, issues, views, last editor |
| `/library` | Website | Section cards, global-block markers, category chips |
| `/blog` | Content | Posts, categories, read time, views |
| `/services` | Content | Service lines × generated pages, leads per line |
| `/seo` | Marketing | Score distribution, vitals, broken links, issue list |
| `/settings` | Settings | 6 tabs: General · Business info · Integrations · Users & roles · Security · System check |

Shell: collapsible sidebar (76 px rail / 264 px), mobile drawer, command-palette trigger,
theme menu, notification dropdown, operator menu — all Preline dropdown conventions.

---

## 6. Roadmap

### Phase 2 — port the remaining Sales screens
Client updates (4-stage bilingual workflow + photo attachments), won/lost reason modal on
the kanban, quote → invoice one-click, PDF block editor (v2.1 P19 bug B5: block toggles
must reflect in the preview instantly).

### Phase 3 — Website & builder
Page builder canvas, header & footer editor (structured desktop + mobile menu, applied to
all pages), media manager with WebP conversion and an unused-image finder, redirects →
`.htaccess` managed block, sitemap rebuild.

### Phase 4 — Content
FAQ groups per page with auto FAQ schema, testimonials with page assignment and live
preview, team profiles, city pages with "copy from" + bulk create.

### Phase 5 — Conversations & automation
Live chat with AI fallback (v2.1 P19 bug B1: needs a fallback when the AI is down, and the
AI status shown in the Inbox), train-AI, WhatsApp hub, Telegram bot, approvals.

### Phase 6 — Platform
Activity log, backups + restore, system check on the live server, role-aware dashboards
(Editor sees website only, per `$crm = in_array($u['role'], ['owner','admin','sales'])`).

---

## 7. Open risks

| Risk | Impact | Mitigation |
|---|---|---|
| **Hardcoded credentials in v2.1** — `admin@woodex.pk` / `Woodex@2026` is a default `value=` in `admin/index.html`; the `@WoodexInteriorBot` Telegram token is plaintext in `V2.1-VS-V2.5-PRO-BREAKDOWN.md` | Anyone reading the repo has admin + bot access | Rotate both. Neither is copied into PP-1. See `api/README.md` §2. |
| **93 unoverridden dark tokens** in upstream Preline | Light-coloured cards/dropdowns/tooltips inside dark mode | `scripts/build-theme.mjs` emits them explicitly; a 24-anchor self-check fails the build if any drifts. |
| **Hostinger has no CA store** | Every outbound call to Google / OpenAI / Meta fails | Ship the bundled `cacert.pem` and set `CURLOPT_CAINFO` (v2.1 root cause B). |
| **Builder rejects the admin session** | Six screens blank on "Loading…" | Accept the normal session as fallback, not only `exp.uid.hmac` (v2.1 root cause A). |
| **Fixture data is not real data** | Numbers on screen are illustrative | `src/lib/fixture.ts` is seeded and labelled; the swap to PHP is documented in `api/README.md`. |

---

## 8. Commands

```bash
cd woodex-pp-1
npm install
npm run dev          # http://localhost:3000
npm run build        # production build + typecheck
npm run typecheck    # tsc --noEmit
node scripts/build-theme.mjs   # regenerate the theme (self-checks 24 anchors)
```
