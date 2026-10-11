# Woodex PP-1 — Remaining Work in 3 Phases

Ground truth: sidebar IA = 53 routes. Real pages today = 24
(`/, analytics, automations, blog, bookings, clients, contacts, deals,
enquiries, financial, invoices, library, pages, payments, pipeline, projects,
quotations, sales, sales-tracking, seo, services, settings, tasks, threads`).
Pending (currently the `[...rest]` placeholder) = 32:

```
/activity /contracts /approvals
/chat /whatsapp /telegram /calls
/campaigns /templates /segments /schedules
/builder /city-pages /insights /media /blocks
/speed /redirects
/ai /offer-engine /prompts /training-data /mcp-server
/reports /reports/sales /reports/site /print-center
/tickets /health /logs /changelog /security /notifications
```

Plus block-library showcase upgrades (img 5–9): blog list + post editor,
integrations grid, member cards, API-key/team/export tables.

---

## Phase 1 — Front-office operations (daily-use screens) · 11 screens

| # | Route | Screen | Block family |
|---|-------|--------|--------------|
| 1 | `/campaigns` | Broadcast campaign list + KPIs | Tables & Records / Analytics & KPIs |
| 2 | `/templates` | Message template gallery | Blog & Articles (card grid) |
| 3 | `/segments` | Audience segments | Tables & Records |
| 4 | `/schedules` | Send schedule + guardrails | Planning Boards / list |
| 5 | `/chat` | Live inbox (channel tabs + queue) | Communication → Chat & Inbox |
| 6 | `/whatsapp` | WhatsApp hub (sessions, broadcasts) | Communication |
| 7 | `/telegram` | Telegram bot console | Communication |
| 8 | `/calls` | Call log | Tables & Records |
| 9 | `/contracts` | Contract ledger | Tables & Records |
| 10 | `/approvals` | Approval queue | Tables & Records |
| 11 | `/activity` | Full activity feed | Communication → feeds |

## Phase 2 — Growth tooling (Website / SEO / Intelligence) · 12 screens

| # | Route | Screen |
|---|-------|--------|
| 1 | `/builder` | Page builder (block canvas) |
| 2 | `/city-pages` | City pages matrix |
| 3 | `/insights` | Website insights |
| 4 | `/media` | Media library (file views) |
| 5 | `/blocks` | Block library gallery (img 10 reference) |
| 6 | `/speed` | Speed score lab |
| 7 | `/redirects` | Redirect manager |
| 8 | `/ai` | AI console |
| 9 | `/offer-engine` | Offer engine rules |
| 10 | `/prompts` | Prompt library |
| 11 | `/training-data` | Training data sets |
| 12 | `/mcp-server` | MCP server panel |

## Phase 3 — System, reports & showcase · 10 screens + polish

| # | Route | Screen |
|---|-------|--------|
| 1 | `/reports` | Report hub |
| 2 | `/reports/sales` | Sales report |
| 3 | `/reports/site` | Site report |
| 4 | `/print-center` | Print center |
| 5 | `/tickets` | Support tickets |
| 6 | `/health` | System health |
| 7 | `/logs` | Audit logs |
| 8 | `/changelog` | Changelog |
| 9 | `/security` | Security + API keys (img 9 table set) |
| 10 | `/notifications` | Notification center |
| + | showcase | integrations grid (img 7), member cards (img 8), blog list + editor (img 5/6) into existing routes |
| + | polish | role matrix QA pass, docs update, final build |

Rules: Preline block library is the source of truth for markup; Woodex
Obsidian+Cyan tokens only; fixtures until API wiring (out of scope); every
screen verified via build + HTTP 200 before commit.
