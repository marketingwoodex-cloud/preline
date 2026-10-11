# -marketingwoodex — Consolidated Master Pending-Task List
**Compiled:** 2026-10-12 · **Source audit of:** `LIVE-AUDIT-AND-MASTER-PLAN.md` (Sep 30),
`MASTER-PLAN-P19.md` (Oct 5), `P22-AUDIT-VERIFICATION-REPORT.md` (Oct 8), repo tree at
`arena/8a776c65-marketingwoodex`. P15 (responsive/PageSpeed) confirmed DONE; phases 1–5
of the Sep-30 plan (go-live tooling, v26 theme, motion pass, header/footer editor,
50-template library) shipped in P16–P22 rounds unless re-listed below as open.

> Session note: this Arena session is pinned to `arena/5ac37dcf-preline` (preline repo).
> The list is authored here; executing it needs a session tied to
> `arena/8a776c65-marketingwoodex`.

---

## Phase A — Security & release blockers (P22 audit §7) — DO FIRST
| # | Task | Source |
|---|------|--------|
| A1 | Remove seeded `admin/admin` bcrypt INSERT from `_database/woodex-v20.sql`; generate only in installer; force first-login change | P22 §5 HIGH |
| A2 | Drop `wx-demo.php` from prod zip (or gate behind installer-created token) | P22 §5 MED |
| A3 | Rename package identity: `woodex-v20.sql` → `woodex-schema.sql`; "V20 installer" → "Woodex installer"; add build tag to `admin/index.html` | P22 §7.3 |
| A4 | Regenerate P22 deep-check report against the shipped hash; restate claims 16/17 | P22 §7.4 |
| A5 | Add `/favicon.ico` (or repoint admin to the svg); fix JazzCash/Easypaisa default numbers in `api/sales-lib.php:55` | P22 §7.5 |
| A6 | Delete the two stale v20 zips on branch (`woodex-vlive-P20/`, `deploy/p20/`) | P22 §7.6 |
| A7 | Post-deploy: delete `wx-install.php`/`wx-check.php`/`wx-demo.php`; add `wa-cron.php` cron; purge LiteSpeed cache; add CSP | P22 §7.7 |

## Phase B — Go-live completion (Sep-30 P0)
B1 install admin at `/admin/` + 2FA · B2 SMTP `info@woodex.com.pk` + test · B3 15-min cron ·
B4 Turnstile keys · B5 Search Console sitemap submit · B6 phone smoke test → CRM lead + alert ·
B7 remove old WordPress folder/DBs after stable weeks.

## Phase C — Bug fixes (merge of Sep-30 P1 + P19 Priority-1)
C1 contact map embed blocked → official `/maps/embed?pb=` + static fallback (B1) ·
C2 WhatsApp floating button icon shrunk by global CSS (B2) ·
C3 contact info cards overlap/dark hover (B3) ·
C4 renovation service menu native scrollbar (B4) ·
C5 "Talk to Woodex" duplicated address/hours on all service pages (B5) ·
C6 live chat not replying — trace AI path, fallback auto-reply, AI status in Inbox (P19 B1) ·
C7 dashboard "Live chat" button always visible — hide by default, top-bar icon, × (P19 B2) ·
C8 coming-soon mode not working — no-store guard, admin bypass, new countdown design (P19 B3) ·
C9 Enquiries → Add lead fails to save; make note optional, clear error, local draft restore (P19 B4) ·
C10 Quotation PDF blocks switches/reorder not in preview; switch styling; preview footer (P19 B5) ·
C11 Clients page stale 2025 dates — fix date source + refresh (P19 B6) ·
C12 replaced images not refreshing — cache-bust `?v=` site-wide + admin (P19 B7).

## Phase D — Theme & motion (Sep-30 P3 + P2)
D1 v26 palette/buttons/radius/shadows site-wide · D2 v26 header pill-nav + mega menu ·
D3 v26 footer · D4 spacing rhythm polish ·
D5 scroll-reveal system (fade/rise, stagger, clip reveal, counters, reduce-motion) ·
D6 renovation scroll-driven sticky service list · D7 "Built around occupancy" auto-sliding 10-step with left image swap ·
D8 redesigned "Talk to Woodex" 2-col section (all service pages, CRM form + WA button) ·
D9 "Featured 3D Work" auto carousel (pause/hover, swipe) · D10 home hero 5s + more slides + progress ·
D11 home FAQ dark accordion redesign · D12 "Selected studies" filter tabs with animated filtering ·
D13 home 6-services staggered reveal · D14 same treatment on other service pages.

## Phase E — Admin re-org, starter data & data tools (P19 P2–P4, Sep-30 P5–P7)
E1 one central client record (lead/chat/WA/quote/invoice/project linked by phone/email; full timeline) ·
E2 Settings = one tabbed page (General…System check); sidebar shows only "Settings" ·
E3 WhatsApp = one tabbed page (Inbox/Contacts · Offers · Automation · Templates · Connection) ·
E4 menu groups: Dashboard · Sales · Support · Website · Content · Marketing · Settings ·
E5 Pipeline cards v2 (value, days-in-stage, next follow-up, avatar, totals, filters, quick actions, drag, won/lost reason, fit-to-screen) ·
E6 Quotation design: approved footer, Summary on/off, Single/Project/BOQ templates end-to-end ·
E7 Team real profiles (role, socials, order, featured, show-on-site) ·
E8 Testimonials (page picker, preview, Google-review paste import, star/photo) ·
E9 FAQ groups per page + auto FAQ schema · E10 Services import + template pages ·
E11 Form builder (fields, required, per-form alerts, entries → Enquiries; fix "no email set" default) ·
E12 Estimator templates (rates per room/sector, duplicate, assign) ·
E13 Full-page templates (Service/Project/City/Landing/About/Contact) + "save page as template" ·
E14 Settings & APIs card design with status badges + test buttons ·
E15 Header/Footer/Mega-menu editor: 3 tabs, live preview, undo + backup (H1–H2) ·
E16 Starter templates: FAQ groups, team profiles, 3–4 quotation templates, invoice templates, sample project (S1–S5) ·
E17 Backups import/restore + export · E18 DB import/export (full or per-area) ·
E19 Clients monthly report + CSV/Excel import/export · E20 PageSpeed API key field + retry (D5).

## Phase F — Agents, integrations, SEO & content (Sep-30 P8–P14)
F1 WhatsApp: per-page templates, click tracking in CRM, post-form open-chat (I1) ·
F2 Sign in with Google (allow-list, 2FA respected) (I2) ·
F3 MCP connector for the AI agent — scoped tokens, no code exec/raw SQL, drafts, activity log (I3) ·
F4 Quotation v2: multi-page PDF with repeating header/footer; scope-of-work templates per service; decoration-item suggestions; send via email/WhatsApp (P9) ·
F5 Live chat agent on every page (site knowledge base; quote answers with phone+quote check; human handover; chats saved as leads) (P10) ·
F6 WhatsApp agent training screen (Q&A pairs, tone, forbidden topics) (P11) ·
F7 Client stage updates (WhatsApp/email at quote/visit/start/handover) (P12) ·
F8 Yoast-style per-page SEO system (focus keyword, score, readability, preview, schema, OG, canonical, noindex + sitemap/redirects/broken-link checks) (P13) ·
F9 Insights blog templates + AI SEO writer (before/after compare, gallery, quote, table, FAQ, CTA blocks) (P14).

## Suggested execution order
A → B → C → D → E → F (security and lead capture before cosmetics; cosmetics before
editor tooling; agents/SEO last). Each phase: questions → build in `frontend-v1/` →
automated desktop+mobile checks → owner review → new `deploy/woodex-live-vX.zip`.

## Totals
A:7 · B:7 · C:12 · D:14 · E:20 · F:9 = **69 pending tasks** (P15 already done).
