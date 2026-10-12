import { PageBody, PageHeader } from "@/components/ui/PageHeader";

export const metadata = { title: "Reports" };

const REPORTS = [
  { name: "Sales report", desc: "Collections, quotes, win rate, service mix", last: "2026-10-12 06:00", href: "/reports/sales" },
  { name: "Site report", desc: "Traffic, leads, SEO health per page", last: "2026-10-12 06:00", href: "/reports/site" },
  { name: "Broadcast digest", desc: "Sends, reads, opt-outs vs guardrails", last: "2026-10-11 21:00", href: "/campaigns" },
  { name: "Operations digest", desc: "Tasks, projects, workshop load", last: "2026-10-11 21:00", href: "/tasks" },
];

const SCHEDULES = [
  { what: "Owner digest", to: "owner@woodex.pk", when: "Daily 08:00", via: "Email + WhatsApp" },
  { what: "Sales week", to: "sales team", when: "Mon 09:00", via: "Email" },
  { what: "SEO & site health", to: "editor", when: "1st & 15th", via: "Email" },
];

export default function ReportsPage() {
  return (
    <>
      <PageHeader
        title="Reports"
        description="Run any report on demand or let the schedule deliver it. Exports render as branded PDF, CSV or XLSX."
        actions={
          <>
            <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-border bg-layer text-layer-foreground hover:bg-layer-hover focus:outline-hidden focus:bg-layer-focus">
              Export CSV
            </button>
            <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-border bg-layer text-layer-foreground hover:bg-layer-hover focus:outline-hidden focus:bg-layer-focus">
              Export XLSX
            </button>
          </>
        }
      />
      <PageBody>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {REPORTS.map((r) => (
            <div key={r.name} className="bg-card border border-card-line shadow-2xs rounded-xl p-5 transition-shadow hover:shadow-md">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-x-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v16a2 2 0 0 0 2 2h16" /><path d="M7 13v4M12 9v8M17 5v12" /></svg>
                  </span>
                  <div>
                    <h2 className="text-sm font-semibold text-foreground">{r.name}</h2>
                    <p className="text-xs text-muted-foreground-1">{r.desc}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-card-divider pt-3">
                <span className="text-[11px] text-muted-foreground-1 wx-num">last run {r.last}</span>
                <div className="flex gap-x-1.5">
                  <a href={r.href} className="py-1.5 px-2.5 inline-flex items-center text-xs font-medium rounded-lg bg-primary/10 text-primary hover:bg-primary/20 focus:outline-hidden">Open</a>
                  <button type="button" className="py-1.5 px-2.5 inline-flex items-center text-xs font-medium rounded-lg border border-border bg-layer text-layer-foreground hover:bg-layer-hover focus:outline-hidden">Export</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-card-line">
            <h2 className="text-sm font-semibold text-foreground">Scheduled deliveries</h2>
          </div>
          <ul className="divide-y divide-card-divider">
            {SCHEDULES.map((s) => (
              <li key={s.what} className="px-5 py-3 flex items-center gap-x-4">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-secondary/10 text-secondary">
                  <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                </span>
                <p className="min-w-0 grow text-sm text-foreground">{s.what} <span className="text-xs text-muted-foreground-1">→ {s.to}</span></p>
                <span className="text-xs text-muted-foreground-1">{s.via}</span>
                <span className="shrink-0 inline-flex items-center rounded-md px-1.5 py-0.5 text-[11px] font-semibold bg-teal-500/10 text-teal-500 ring-1 ring-inset ring-teal-500/25 wx-num">{s.when}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Google Sheets sync (Batch 3 · fixture — wiring pending) */}
        <div className="mt-5 bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-card-line flex flex-wrap items-center gap-x-3 gap-y-1">
            <h2 className="text-sm font-semibold text-foreground">Google Sheets sync</h2>
            <span className="inline-flex items-center rounded-md px-1.5 py-0.5 text-[11px] font-semibold bg-teal-500/10 text-teal-500 ring-1 ring-inset ring-teal-500/25">Connected</span>
            <span className="ms-auto inline-flex items-center gap-x-1.5 text-[11px] text-muted-foreground-1">
              <span className="size-1.5 rounded-full bg-teal-500" /> Last sync today 06:00 — 12 rows pushed · 0 errors
            </span>
            <button type="button" className="py-1.5 px-2.5 inline-flex items-center text-xs font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary-hover focus:outline-hidden">
              Sync now
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-card-divider">
            <div className="p-5">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground-1">Mapping — sheet “Woodex CRM · Leads”</h3>
              <ul className="mt-3 divide-y divide-card-divider rounded-lg border border-layer-line">
                {[["Name", "Column B"], ["Phone", "Column C"], ["Source", "Column D"], ["Stage", "Column E"], ["Created", "Column A"]].map(([f, c]) => (
                  <li key={f} className="flex items-center justify-between px-3 py-2 text-xs">
                    <span className="text-foreground">{f}</span>
                    <span className="text-muted-foreground-1 wx-num">{c}</span>
                  </li>
                ))}
              </ul>
              <button type="button" className="mt-3 text-xs font-medium text-primary hover:underline">Edit mapping</button>
            </div>
            <div className="p-5">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground-1">Recent syncs</h3>
              <ul className="mt-3 space-y-2">
                {[
                  ["Today 06:00", "12 rows pushed", true],
                  ["Yesterday 18:00", "7 rows pushed", true],
                  ["Yesterday 06:00", "3 rows pushed · 1 phone rejected (format)", false],
                ].map(([when, what, ok]) => (
                  <li key={String(when)} className="flex items-center gap-x-2.5 text-xs">
                    <span className={`size-1.5 rounded-full shrink-0 ${ok ? "bg-teal-500" : "bg-amber-500"}`} />
                    <span className="wx-num text-muted-foreground-1">{when}</span>
                    <span className="min-w-0 grow truncate text-foreground">{what}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[11px] text-muted-foreground-1">Direction: export leads every 6h. Activates against the live API — UI runs on fixture data.</p>
            </div>
          </div>
        </div>
      </PageBody>
    </>
  );
}
