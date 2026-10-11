import { PageBody, PageHeader } from "@/components/ui/PageHeader";

export const metadata = { title: "City Pages" };

const KPIS = [
  { label: "Published pages", value: "8", note: "2 more in review" },
  { label: "Average SEO", value: "71/100", note: "+4 this month" },
  { label: "Visits (30d)", value: "6,420", note: "organic only" },
  { label: "Broken links", value: "6", note: "flagged for fix" },
];

const PAGES = [
  { page: "DHA Lahore kitchens", slug: "/kitchens-dha", status: "Published", seo: 84, words: 1450, visits: 1840, updated: "2026-10-04" },
  { page: "Bahria Town kitchens", slug: "/kitchens-bahria", status: "Published", seo: 79, words: 1380, visits: 1210, updated: "2026-10-11" },
  { page: "Gulberg wardrobes", slug: "/wardrobes-gulberg", status: "Published", seo: 74, words: 1120, visits: 860, updated: "2026-09-27" },
  { page: "Model Town bathrooms", slug: "/bathrooms-model-town", status: "Published", seo: 68, words: 990, visits: 640, updated: "2026-09-20" },
  { page: "Johar Town fit-outs", slug: "/fitouts-johar-town", status: "Review", seo: 61, words: 1260, visits: 0, updated: "2026-10-10" },
  { page: "Cantt kitchens", slug: "/kitchens-cantt", status: "Published", seo: 66, words: 1040, visits: 520, updated: "2026-09-14" },
  { page: "Askari wardrobes", slug: "/wardrobes-askari", status: "Published", seo: 63, words: 940, visits: 410, updated: "2026-09-08" },
  { page: "Lake City kitchens", slug: "/kitchens-lake-city", status: "Draft", seo: 42, words: 610, visits: 0, updated: "2026-10-12" },
];

const PILL: Record<string, string> = {
  Published: "bg-teal-500/10 text-teal-500 ring-teal-500/25",
  Review: "bg-amber-500/10 text-amber-500 ring-amber-500/25",
  Draft: "bg-muted text-muted-foreground ring-border",
};

const seoTone = (n: number) => (n >= 80 ? "text-teal-500" : n >= 60 ? "text-amber-500" : "text-destructive");

export default function CityPagesPage() {
  return (
    <>
      <PageHeader
        title="City Pages"
        description="Local landing pages per area of Lahore. Business-first SEO: every page must answer price, process and proof."
        actions={
          <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg bg-primary border border-primary-line text-primary-foreground hover:bg-primary-hover focus:outline-hidden focus:bg-primary-focus">
            New city page
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
          <div className="px-5 py-3 border-b border-card-line">
            <h2 className="text-sm font-semibold text-foreground">Area matrix</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-card-divider">
              <thead className="bg-surface">
                <tr>
                  {["Page", "Status", "SEO", "Words", "Visits 30d", "Updated"].map((h) => (
                    <th key={h} scope="col" className="px-4 py-2.5 text-start text-xs font-medium uppercase tracking-wide text-muted-foreground-1">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-card-divider">
                {PAGES.map((p) => (
                  <tr key={p.slug} className="transition-colors hover:bg-muted/40">
                    <td className="px-4 py-2.5">
                      <p className="font-medium text-foreground whitespace-nowrap">{p.page}</p>
                      <code className="text-[11px] text-primary">{p.slug}</code>
                    </td>
                    <td className="px-4 py-2.5">
                      <span className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${PILL[p.status]}`}>{p.status}</span>
                    </td>
                    <td className={`px-4 py-2.5 font-bold wx-num ${seoTone(p.seo)}`}>{p.seo}</td>
                    <td className="wx-num px-4 py-2.5 text-muted-foreground">{p.words.toLocaleString()}</td>
                    <td className="wx-num px-4 py-2.5 text-muted-foreground">{p.visits.toLocaleString()}</td>
                    <td className="wx-num px-4 py-2.5 text-right text-muted-foreground whitespace-nowrap">{p.updated}</td>
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
