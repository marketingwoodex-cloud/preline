# P29 v2.1 Pro vs PP-1 Frontend v1 — Breakdown
**Compared:** `-marketingwoodex` @ `f86258a` (`woodex live p29-v2.1 pro/`) vs PP-1 admin FE v1
(`arena/5ac37dcf-preline`, QA-audited 2026-10-12). Sources: package tree, `api/seo-agent-lib.php`,
`admin-seo*.js`, `admin-aicenter.js`, `V2.1-VS-V2.5-PRO-BREAKDOWN.md`.

## What P29 v2.1 pro actually ships (verified in tree)
- **SEO agent (P41)**: scans ≤400 public pages, rule checks (title/meta/alt/robots/canonical…),
  severity-ranked issue queue, AI-suggested fixes (titles/meta/alt ONLY; long-form → blog),
  backup-before-apply, Master approval for Managers, weekly cron + Telegram summary,
  multi-engine (Claude / OpenAI / OpenRouter-Hermes / local Ollama).
- **AI Center**: engine picker + readiness per provider; chat agent with `chat-rules.json`,
  bot-flow handoff to humans; training screen.
- **CRM**: pipeline kanban with line filters + 4 KPI strip; **client milestone engine** —
  4-stage bilingual EN/UR updates, stage photos, auto review-request links; central client record.
- **Quotations**: 8 starter templates (renovation/civil/interior/fit-out/architecture/3D/
  furniture/consultancy), dual-bank routing (Alfalah + Meezan, IBAN/Swift on PDF),
  1-click quote→invoice, milestones + advance ledger.
- **Bots**: Telegram full polling+webhook engine; WhatsApp hub + WA insights; offers.
- **Builder**: canvas + 147 preloaded sections + block selector + page templates.
- **Ops**: Google Sheets sync, xlsx export, redirects manager + plan json, reports,
  speed, security, users/roles, theme editor, bookings, approvals, print.
- **Auth**: frosted card + Google SSO; HMAC sessions, `hash_equals`.

## PP-1 FE v1 — parity map
| P29 capability | PP-1 screen | State |
|---|---|---|
| pipeline kanban + KPIs | /pipeline | ✅ parity |
| WA hub / WA insights | /whatsapp | ✅ (insights light) |
| Telegram engine | /telegram | ✅ console-level |
| chat inbox + threads | /chat /threads | ✅ |
| approvals | /approvals | ✅ |
| redirects + plan | /redirects | ✅ |
| speed lab | /speed | ✅ |
| reports + print | /reports* /print-center | ✅ |
| roles/users | RoleSwitcher + /settings | ✅ demo-level |
| builder canvas | /builder | ⚠️ 6 blocks, no section library/templates |
| SEO keywords | /seo | ⚠️ tracker only — **no on-page agent/analyzer** |
| client milestone engine / 360 | /clients | ⚠️ table only — **no timeline, no milestones** |
| chat AI status + handoff | /chat | ⚠️ queue only — **no agent status/handoff panel** |
| quote starter templates + dual bank | /quotations | ⚠️ ledger only |
| AI engine picker | /ai | ⚠️ single model card |
| Sheets/xlsx export | — | ❌ absent (acceptable: fixtures phase) |
| Google SSO / HMAC sessions | — | ❌ out of scope (demo roles) |

## Verdict
PP-1 FE v1 already matches P29 on structure and most ops screens; the real gaps are
**depth features**: SEO agent, builder section library, client 360 + milestones,
chat-agent status/handoff, quotation templates + bank routing. Those are the
PP1-UPGRADE-PLAN below.
