# Woodex PP-1 — API layer

The dashboard in this folder runs on **local fixture data** (`src/lib/fixture.ts`) so it
builds and previews with no server, no database and no API keys.

`_v2.1-source/` holds a verbatim copy of the PHP endpoints from **Woodex Admin v2.1**
(`marketingwoodex-cloud/-marketingwoodex`, branch `arena/8a776c65-marketingwoodex`, path
`woodex live p29-v2.1/api/`). They are the contract this UI is written against.

## Why the PHP is copied rather than called

The brief was: copy the project, **do not touch the original** API or database, and modify
the copy. So:

- the originals on the live site are **never** written to or migrated by this app;
- the copies here are the starting point for a PP-1-specific layer;
- `src/lib/domain.ts` mirrors the copied response shapes field-for-field, so pointing a
  screen at PHP instead of fixtures is a data-source swap, not a rewrite.

## What was copied

| File | Size | Provides |
|---|---|---|
| `admin.php` | 52 KB | Single router: token auth, CSRF, role checks, action dispatch |
| `dash-lib.php` | 6 KB | `dash_data`, `dash_target_save` — the whole dashboard payload in one call |
| `crm-lib.php` | 29 KB | `CRM_STAGES`, `CRM_SOURCES`, `wx_leads`, lead notes, alerts |
| `sales-lib.php` | 34 KB | Quotations, invoices, payments, projects |
| `content-lib.php` | 36 KB | Posts, services, pages, blocks |
| `roles-lib.php` | 7 KB | Owner / Admin / Editor / Sales permissions |
| `seo-lib.php` | 12 KB | Per-page SEO scoring, redirects, sitemap |

Not copied in this phase (out of the Core-7 scope): `chat-lib.php`, `tg-lib.php`,
`wahub-lib.php`, `ai-center-lib.php`, `approvals-lib.php`, `booking-lib.php`,
`media-lib.php`, `builder.php`, `mcp.php`, `security-lib.php`, `notify-lib.php`,
`social-lib.php`, `sheets-lib.php`, and the `p18*` / `p19*` phase modules.

## Required modifications before this runs on Hostinger

1. **Strip the hardcoded credentials.** `admin.php` in v2.1 accepts a default
   `admin@woodex.pk` / `Woodex@2026` pair and a builder password of the same value. Remove
   both; force the setup wizard to create the owner.
2. **Move secrets out of source.** The v2.1 Telegram bot token is committed in plaintext
   in `V2.1-VS-V2.5-PRO-BREAKDOWN.md`. Nothing secret may land in this repo — read
   `.env` server-side only.
3. **New table prefix.** v2.1 uses `wx_*`. PP-1 should use `wxp_*` so it can share a
   database host without colliding.
4. **Keep the bundled CA list.** v2.1 ships `cacert.pem` (217 KB) because Hostinger PHP has
   no certificate store — without it every outbound call to Google, OpenAI and Meta fails
   with `unable to get local issuer certificate`. This was root cause B in the v2.1 audit.
5. **Session fallback for the builder API.** Root cause A in the v2.1 audit was the builder
   rejecting the admin session, which blanked six screens. Accept the normal admin session
   as a fallback, not only the `exp.uid.hmac` token.

## Swapping a screen onto PHP

```ts
// before
import { dashData } from "@/lib/fixture";
const d = dashData(28);

// after
const res = await fetch("/api/admin.php", {
  method: "POST",
  body: new URLSearchParams({ action: "dash_data", days: "28", token }),
});
const d: DashData = await res.json();
```

`DashData`, `Lead`, `Quote`, `Invoice`, `Project`, `Client`, `SitePage`, `Post` and
`Service` in `src/lib/domain.ts` are the contract. Do not rename their fields — the
`camelCase`-inside-`snake_case` mix is exactly what the PHP emits.
