import { PageBody, PageHeader } from "@/components/ui/PageHeader";

export const metadata = { title: "Speed Lab" };

const SUB = [
  { name: "Performance", score: 87 },
  { name: "SEO", score: 74 },
  { name: "Accessibility", score: 92 },
  { name: "Best practices", score: 96 },
];

const DONE = [
  { what: "Image pipeline → WEBP + lazy-load", impact: "+9 perf", when: "Oct 10" },
  { what: "Font subsetting (Inter 5 weights → 3)", impact: "+4 perf", when: "Oct 6" },
  { what: "Critical CSS inlined on landing pages", impact: "+3 perf", when: "Sep 28" },
];

const TODO = [
  { what: "Compress 13 heavy images on /gallery", impact: "+5 perf est", prio: "high" },
  { what: "Fix 6 broken internal links", impact: "+3 SEO est", prio: "high" },
  { what: "Add missing alt text (11 images)", impact: "+4 a11y est", prio: "med" },
  { what: "Preload LCP hero on /kitchens-dha", impact: "+2 perf est", prio: "med" },
];

const PAGES = [
  { page: "/ (home)", perf: 91, seo: 88, lcp: "1.6s" },
  { page: "/kitchens-dha", perf: 87, seo: 84, lcp: "1.9s" },
  { page: "/gallery", perf: 64, seo: 71, lcp: "3.4s" },
  { page: "/bookings", perf: 93, seo: 82, lcp: "1.4s" },
];

const tone = (n: number) => (n >= 80 ? "text-teal-500" : n >= 60 ? "text-amber-500" : "text-destructive");

export default function SpeedPage() {
  return (
    <>
      <PageHeader
        title="Speed Lab"
        description="woodex.pk performance workbench. Overall 87/100 — the October target is 90 with LCP under 2s on every landing page."
        actions={
          <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg bg-primary border border-primary-line text-primary-foreground hover:bg-primary-hover focus:outline-hidden focus:bg-primary-focus">
            Run audit
          </button>
        }
      />
      <PageBody>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          {/* Overall + subscores */}
          <div className="bg-card border border-card-line shadow-2xs rounded-xl p-5">
            <div className="flex items-center gap-4">
              <div className="relative grid size-20 shrink-0 place-items-center rounded-full" style={{ background: "conic-gradient(var(--color-primary-500) 87%, var(--color-muted) 0)" }}>
                <div className="grid size-16 place-items-center rounded-full bg-card">
                  <span className="text-xl font-bold text-foreground wx-num">87</span>
                </div>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-foreground">Overall score</h2>
                <p className="text-[11px] text-muted-foreground-1">lab run · Oct 12 04:00 PKT · Moto G4 / Slow 4G</p>
              </div>
            </div>
            <ul className="mt-5 space-y-3">
              {SUB.map((s) => (
                <li key={s.name}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-foreground">{s.name}</span>
                    <span className={`font-bold wx-num ${tone(s.score)}`}>{s.score}</span>
                  </div>
                  <div className="mt-1 h-1.5 rounded-full bg-muted">
                    <div className={`h-1.5 rounded-full ${s.score >= 80 ? "bg-teal-500" : s.score >= 60 ? "bg-amber-500" : "bg-destructive"}`} style={{ width: `${s.score}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Optimization queue */}
          <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden">
              <div className="px-5 py-3 border-b border-card-line">
                <h2 className="text-sm font-semibold text-foreground">Done this cycle</h2>
              </div>
              <ul className="divide-y divide-card-divider">
                {DONE.map((d) => (
                  <li key={d.what} className="px-5 py-3 flex items-center gap-x-3">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-teal-500/10 text-teal-500">
                      <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                    </span>
                    <p className="min-w-0 grow text-xs text-foreground">{d.what}</p>
                    <span className="shrink-0 text-[11px] font-semibold text-teal-500 wx-num">{d.impact}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden">
              <div className="px-5 py-3 border-b border-card-line">
                <h2 className="text-sm font-semibold text-foreground">Queue</h2>
              </div>
              <ul className="divide-y divide-card-divider">
                {TODO.map((t) => (
                  <li key={t.what} className="px-5 py-3 flex items-center gap-x-3">
                    <span className={`shrink-0 inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${t.prio === "high" ? "bg-amber-500/10 text-amber-500 ring-1 ring-inset ring-amber-500/25" : "bg-muted text-muted-foreground"}`}>{t.prio}</span>
                    <p className="min-w-0 grow text-xs text-foreground">{t.what}</p>
                    <span className="shrink-0 text-[11px] text-muted-foreground-1 wx-num">{t.impact}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Per-page */}
        <div className="mt-5 bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-card-line">
            <h2 className="text-sm font-semibold text-foreground">Landing pages</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-card-divider">
              <thead className="bg-surface">
                <tr>
                  {["Page", "Performance", "SEO", "LCP"].map((h) => (
                    <th key={h} scope="col" className="px-4 py-2.5 text-start text-xs font-medium uppercase tracking-wide text-muted-foreground-1">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-card-divider">
                {PAGES.map((p) => (
                  <tr key={p.page} className="transition-colors hover:bg-muted/40">
                    <td className="px-4 py-2.5"><code className="text-xs text-primary">{p.page}</code></td>
                    <td className={`px-4 py-2.5 font-bold wx-num ${tone(p.perf)}`}>{p.perf}</td>
                    <td className={`px-4 py-2.5 font-bold wx-num ${tone(p.seo)}`}>{p.seo}</td>
                    <td className={`px-4 py-2.5 font-semibold wx-num ${p.lcp.startsWith("3") ? "text-destructive" : "text-teal-500"}`}>{p.lcp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </PageBody>
    </>
  );
}
