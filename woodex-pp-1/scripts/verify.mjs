#!/usr/bin/env node
/**
 * T2 — smoke test: sweep every route on the running server.
 *   node scripts/verify.mjs [baseUrl]      (default http://localhost:3000)
 * Checks: HTTP 200 on all 57 screens + /logs planned screen, zero placeholder
 * strings, unknown paths return a real 404. Exits non-zero on any failure.
 */
const BASE = process.argv[2] ?? "http://localhost:3000";

const ROUTES = [
  "/", "/analytics", "/activity", "/tasks", "/sales", "/enquiries", "/pipeline",
  "/quotations", "/bookings", "/invoices", "/payments", "/clients", "/contacts",
  "/deals", "/contracts", "/approvals", "/chat", "/threads", "/whatsapp",
  "/telegram", "/calls", "/campaigns", "/templates", "/segments", "/schedules",
  "/pages", "/builder", "/projects", "/services", "/city-pages", "/insights",
  "/media", "/blocks", "/seo", "/speed", "/redirects", "/ai", "/offer-engine",
  "/prompts", "/automations", "/training-data", "/mcp-server", "/reports",
  "/reports/sales", "/reports/site", "/print-center", "/settings", "/tickets",
  "/health", "/logs", "/changelog", "/security", "/notifications", "/financial",
  "/sales-tracking", "/library", "/blog", "/blog/editor",
];
const PLACEHOLDER = /COMING SOON|TODO:|Not Implemented|Lorem ipsum/;

let fail = 0;
for (const r of ROUTES) {
  const res = await fetch(BASE + r);
  const html = await res.text();
  if (res.status !== 200) { console.error(`BAD ${res.status} ${r}`); fail++; }
  else if (PLACEHOLDER.test(html)) { console.error(`PLACEHOLDER ${r}`); fail++; }
}
const probe = await fetch(BASE + "/definitely-not-a-screen");
if (probe.status !== 404) { console.error(`404 probe returned ${probe.status}`); fail++; }

console.log(fail === 0
  ? `✓ ${ROUTES.length} routes 200 + zero placeholders + 404 probe OK (${BASE})`
  : `✗ ${fail} failure(s)`);
process.exit(fail === 0 ? 0 : 1);
