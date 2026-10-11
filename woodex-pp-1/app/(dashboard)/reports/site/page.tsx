import { PageBody, PageHeader } from "@/components/ui/PageHeader";

export const metadata = { title: "Site Report" };

const KPIS = [
  { label: "Visits (30d)", value: "18,240", note: "+9% vs prior" },
  { label: "Web leads", value: "112", note: "0.61% conversion" },
  { label: "Avg. SEO", value: "71/100", note: "8 published city pages" },
  { label: "Open issues", value: "3", note: "links · images · alt text" },
];

const ISSUES = [
  { what: "6 broken internal links", where: "/bathroom-packages target + gallery", prio: "high", fix: "repoint redirect, republish gallery" },
  { what: "13 heavy images", where: "/gallery", prio: "high", fix: "run pipeline (est −1.8 MB)" },
  { what: "11 images missing alt text", where: "blog posts 2025", prio: "med", fix: "AI draft alts + editor review" },
];

const PAGES = [
  { page: "/ (home)", visits: 3120, leads: 26, seo: 88 },
  { page: "/kitchens-dha", visits: 1840, leads: 21, seo: 84 },
  { page: "/kitchens-bahria", visits: 1210, leads: 13, seo: 79 },
  { page: "/gallery", visits: 980, leads: 9, seo: 71 },
  { page: "/wardrobes-gulberg", visits: 860, leads: 6, seo: 74 },
];

const tone = (n: number) => (n >= 80 ? "text-teal-500" : n >= 60 ? "text-amber-500" : "text-destructive");

export default function SiteReportPage() {
  return (
    <>
      <PageHeader
        title="Site Report"
        description="woodex.pk for the last 30 days — what the site did for the business, and the three things blocking more."
        actions={
          <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-border bg-layer text-layer-foreground hover:bg-layer-hover focus:outline-hidden focus:bg-layer-focus">
            Export PDF
          </button>
        }
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
          <div className="xl:col-span-2 bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-card-line">
              <h2 className="text-sm font-semibold text-foreground">Pages by contribution</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-card-divider">
                <thead className="bg-surface">
                  <tr>
                    {["Page", "Visits", "Leads", "SEO"].map((h) => (
                      <th key={h} scope="col" className="px-4 py-2.5 text-start text-xs font-medium uppercase tracking-wide text-muted-foreground-1">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-card-divider">
                  {PAGES.map((p) => (
                    <tr key={p.page} className="transition-colors hover:bg-muted/40">
                      <td className="px-4 py-2.5"><code className="text-xs text-primary">{p.page}</code></td>
                      <td className="wx-num px-4 py-2.5 text-muted-foreground">{p.visits.toLocaleString()}</td>
                      <td className="wx-num px-4 py-2.5 font-semibold text-foreground">{p.leads}</td>
                      <td className={`px-4 py-2.5 font-bold wx-num ${tone(p.seo)}`}>{p.seo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-card-line">
              <h2 className="text-sm font-semibold text-foreground">Blocking more leads</h2>
            </div>
            <ul className="divide-y divide-card-divider">
              {ISSUES.map((i) => (
                <li key={i.what} className="px-5 py-3.5">
                  <p className="flex items-center gap-2 text-sm font-medium text-foreground">
                    {i.what}
                    <span className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${i.prio === "high" ? "bg-amber-500/10 text-amber-500 ring-1 ring-inset ring-amber-500/25" : "bg-muted text-muted-foreground"}`}>{i.prio}</span>
                  </p>
                  <p className="mt-1 text-[11px] text-muted-foreground-1">{i.where}</p>
                  <p className="mt-1 text-xs text-teal-500">fix: {i.fix}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PageBody>
    </>
  );
}
