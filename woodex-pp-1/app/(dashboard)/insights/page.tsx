import { PageBody, PageHeader } from "@/components/ui/PageHeader";

export const metadata = { title: "Website Insights" };

const KPIS = [
  { label: "Visits (30d)", value: "18,240", note: "+9% vs prior 30d" },
  { label: "Leads from web", value: "112", note: "forms + WhatsApp clicks" },
  { label: "Visit → lead", value: "0.61%", note: "target ≥ 0.75%" },
  { label: "Avg. time on page", value: "2m 48s", note: "content pages" },
];

const SOURCES = [
  { name: "Google organic", pct: 62, cls: "bg-teal-500" },
  { name: "Direct", pct: 18, cls: "bg-primary" },
  { name: "Instagram", pct: 12, cls: "bg-secondary" },
  { name: "Referral", pct: 8, cls: "bg-sky-500" },
];

const TOP = [
  { page: "/kitchens-dha", visits: 1840, leads: 21, conv: "1.14%" },
  { page: "/ (home)", visits: 3120, leads: 26, conv: "0.83%" },
  { page: "/kitchens-bahria", visits: 1210, leads: 13, conv: "1.07%" },
  { page: "/gallery", visits: 980, leads: 9, conv: "0.92%" },
  { page: "/wardrobes-gulberg", visits: 860, leads: 6, conv: "0.70%" },
];

/* 14 daily-visit bars (relative heights), purely illustrative */
const BARS = [42, 48, 45, 61, 58, 39, 35, 52, 66, 71, 64, 59, 74, 80];

export default function InsightsPage() {
  const max = Math.max(...BARS);
  return (
    <>
      <PageHeader
        title="Website Insights"
        description="woodex.pk performance for the last 30 days — traffic, sources and the pages that actually produce leads."
      />
      <PageBody>
        <div className="grid grid-cols-2 gap-5 xl:grid-cols-4">
          {KPIS.map((k) => (
            <div key={k.label} className="bg-card border border-card-line shadow-2xs rounded-xl p-4">
              <p className="text-xs text-muted-foreground-1">{k.label}</p>
              <p className="mt-1 text-2xl font-bold text-foreground wx-num">{k.value}</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground-1">{k.note}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-1 xl:grid-cols-3 gap-5">
          {/* Daily visits */}
          <div className="xl:col-span-2 bg-card border border-card-line shadow-2xs rounded-xl p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">Daily visits</h2>
              <span className="text-xs text-muted-foreground-1">last 14 days</span>
            </div>
            <div className="mt-4 flex h-40 items-end gap-1.5">
              {BARS.map((b, i) => (
                <div key={i} className="group relative flex-1">
                  <div
                    className="w-full rounded-t-md bg-primary/70 transition-colors group-hover:bg-primary"
                    style={{ height: `${(b / max) * 160}px` }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-2 flex justify-between text-[10px] text-muted-foreground-1">
              <span>Sep 29</span>
              <span>Oct 5</span>
              <span>Oct 12</span>
            </div>
          </div>

          {/* Sources */}
          <div className="bg-card border border-card-line shadow-2xs rounded-xl p-5">
            <h2 className="text-sm font-semibold text-foreground">Traffic sources</h2>
            <ul className="mt-4 space-y-3">
              {SOURCES.map((s) => (
                <li key={s.name}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-foreground">{s.name}</span>
                    <span className="font-semibold text-foreground wx-num">{s.pct}%</span>
                  </div>
                  <div className="mt-1 h-1.5 rounded-full bg-muted">
                    <div className={`h-1.5 rounded-full ${s.cls}`} style={{ width: `${s.pct}%` }} />
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-4 border-t border-card-divider pt-3 text-[11px] text-muted-foreground-1">
              Organic share up 3pts after the DHA page refresh.
            </p>
          </div>
        </div>

        {/* Top pages */}
        <div className="mt-5 bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-card-line">
            <h2 className="text-sm font-semibold text-foreground">Pages that produce leads</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-card-divider">
              <thead className="bg-surface">
                <tr>
                  {["Page", "Visits", "Leads", "Conversion"].map((h) => (
                    <th key={h} scope="col" className="px-4 py-2.5 text-start text-xs font-medium uppercase tracking-wide text-muted-foreground-1">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-card-divider">
                {TOP.map((t) => (
                  <tr key={t.page} className="transition-colors hover:bg-muted/40">
                    <td className="px-4 py-2.5"><code className="text-xs text-primary">{t.page}</code></td>
                    <td className="wx-num px-4 py-2.5 text-muted-foreground">{t.visits.toLocaleString()}</td>
                    <td className="wx-num px-4 py-2.5 text-foreground font-semibold">{t.leads}</td>
                    <td className="wx-num px-4 py-2.5 text-teal-500 font-semibold">{t.conv}</td>
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
