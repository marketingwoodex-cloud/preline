import { PageBody, PageHeader } from "@/components/ui/PageHeader";

export const metadata = { title: "SEO" };

const KPIS = [
  { label: "Avg. position", value: "11.4", note: "−3.2 in 60 days" },
  { label: "Keywords top-3", value: "24", note: "of 96 tracked" },
  { label: "Indexed pages", value: "41", note: "1 pending discovery" },
  { label: "Open issues", value: "3", note: "links · images · alts" },
];

const KEYWORDS = [
  { kw: "modular kitchen lahore", intent: "Money", pos: 2, vol: "2,900", page: "/ (home)" },
  { kw: "kitchen design dha", intent: "Money", pos: 1, vol: "1,100", page: "/kitchens-dha" },
  { kw: "wardrobe designers gulberg", intent: "Money", pos: 3, vol: "720", page: "/wardrobes-gulberg" },
  { kw: "kitchen price in lahore 2026", intent: "Info", pos: 4, vol: "880", page: "/blog/kitchen-costs" },
  { kw: "bathroom renovation lahore", intent: "Money", pos: 7, vol: "1,600", page: "/bathrooms-model-town" },
  { kw: "office fit out lahore", intent: "Money", pos: 9, vol: "390", page: "/fitouts-johar-town" },
  { kw: "woodex interiors", intent: "Brand", pos: 1, vol: "480", page: "/ (home)" },
];

const posTone = (n: number) => (n <= 3 ? "text-teal-500" : n <= 10 ? "text-amber-500" : "text-destructive");

export default function SeoPage() {
  return (
    <>
      <PageHeader
        title="SEO"
        description="Search Console + rank tracker for woodex.pk. Business-first: money keywords outrank vanity keywords."
        actions={
          <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg bg-primary border border-primary-line text-primary-foreground hover:bg-primary-hover focus:outline-hidden focus:bg-primary-focus">
            Track keyword
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

        <div className="mt-5 bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-card-line flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">Tracked keywords</h2>
            <span className="text-xs text-muted-foreground-1">updated 2026-10-12 05:00</span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-card-divider">
              <thead className="bg-surface">
                <tr>
                  {["Keyword", "Intent", "Position", "Volume/mo", "Landing page"].map((h) => (
                    <th key={h} scope="col" className="px-4 py-2.5 text-start text-xs font-medium uppercase tracking-wide text-muted-foreground-1">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-card-divider">
                {KEYWORDS.map((k) => (
                  <tr key={k.kw} className="transition-colors hover:bg-muted/40">
                    <td className="px-4 py-2.5 font-medium text-foreground">{k.kw}</td>
                    <td className="px-4 py-2.5">
                      <span className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[11px] font-semibold ${k.intent === "Money" ? "bg-teal-500/10 text-teal-500" : k.intent === "Brand" ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"}`}>{k.intent}</span>
                    </td>
                    <td className={`px-4 py-2.5 font-bold wx-num ${posTone(k.pos)}`}>#{k.pos}</td>
                    <td className="wx-num px-4 py-2.5 text-muted-foreground">{k.vol}</td>
                    <td className="px-4 py-2.5"><code className="text-xs text-primary">{k.page}</code></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 border-t border-card-line bg-surface">
            <p className="text-[11px] text-muted-foreground-1">Competitor watch: 2 rivals gained on “bathroom renovation lahore” — content refresh queued in /speed.</p>
          </div>
        </div>
      </PageBody>
    </>
  );
}
