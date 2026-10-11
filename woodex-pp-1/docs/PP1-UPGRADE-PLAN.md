# PP-1 Upgrade Plan (FE v1 → v1.1, informed by P29 v2.1 pro)
**Date:** 2026-10-12 · Rule: copy the *capability*, keep the PP-1 block grammar + tokens.

## Batch 1 — shipped this pass ✅
| # | Area | Upgrade | Screen |
|---|------|---------|--------|
| U1 | SEO | **SEO Agent panel** — engine picker (Claude/OpenAI/OpenRouter/local), severity-ranked issue queue with Approve/Skip, weekly-scan toggle, last-scan score; titles/meta/alt-only rule stated | /seo |
| U2 | Website | **Section library** in builder — categorized template grid (147-section concept), "Save page as template", template gallery counts | /builder |
| U3 | CRM | **Client 360** — unified timeline (chats, WA, quotes, invoices, payments, notes) + 4-stage milestone strip with EN/UR labels, stage photos, review-request link | /clients |
| U4 | Conversations | **AI agent status + handoff queue** on inbox — engine, rules count, answered vs handed-over, handoff list with take-over action | /chat |

## Batch 2 — next (recommended order)
| # | Area | Upgrade |
|---|------|---------|
| U5 | Quotations | 8 starter-template gallery + dual-bank routing cards (Alfalah/Meezan, IBAN/Swift) + 1-click quote→invoice action |
| U6 | SEO | per-page SEO checklist drawer (title length, meta, alts, schema, canonical, noindex) reusing agent issue data |
| U7 | Website | builder: import/export section JSON + category filters (parity with P29 L3) |
| U8 | Conversations | WhatsApp agent training mini-screen (Q&A pairs, tone, forbidden topics) under /whatsapp |
| U9 | CRM | pipeline card v2 (days-in-stage, next follow-up, owner avatar, stage totals) |
| U10 | Ops | CSV/XLSX export buttons wired to fixtures on tables (reports, contacts, leads) |

## Batch 3 — later (needs real API; out of current scope)
- Google Sheets sync, payment gateway adapters, client self-service portal,
  WebSocket collaboration, AI BOQ estimator (v2.5-Pro roadmap items).

## Guardrails (unchanged)
- Original v2.1 API/DB untouched; fixtures until wiring.
- Preline block families + Obsidian/Cyan tokens only; no new design systems.
