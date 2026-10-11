import { PageBody, PageHeader } from "@/components/ui/PageHeader";

export const metadata = { title: "Pages" };

const KPIS = [
  { label: "Live pages", value: "34", note: "8 city + 6 blog + core" },
  { label: "In review", value: "2", note: "editor sign-off" },
  { label: "Drafts", value: "4", note: "incl. AI first-passes" },
  { label: "Avg. page speed", value: "87", note: "see /speed" },
];

const PAGES = [
  { page: "Home", path: "/", tpl: "Landing v3", status: "Published", owner: "Editor", updated: "2026-10-04" },
  { page: "Kitchens Lahore", path: "/kitchens-lahore", tpl: "City landing v3", status: "Review", owner: "Editor", updated: "2026-10-12" },
  { page: "Gallery", path: "/gallery", tpl: "Masonry v2", status: "Published", owner: "Editor", updated: "2026-09-30" },
  { page: "Book a site visit", path: "/bookings", tpl: "Form v4", status: "Published", owner: "Sales", updated: "2026-09-18" },
  { page: "About & karigars", path: "/about", tpl: "Story v1", status: "Published", owner: "Owner", updated: "2026-08-11" },
  { page: "Care guides", path: "/care", tpl: "Article v2", status: "Published", owner: "Editor", updated: "2026-08-22" },
  { page: "Contact", path: "/contact", tpl: "Form v4", status: "Published", owner: "Editor", updated: "2026-07-19" },
  { page: "Franchise", path: "/franchise", tpl: "Landing v3", status: "Draft", owner: "Owner", updated: "2026-10-10" },
];

const PILL: Record<string, string> = {
  Published: "bg-teal-500/10 text-teal-500 ring-teal-500/25",
  Review: "bg-amber-500/10 text-amber-500 ring-amber-500/25",
  Draft: "bg-muted text-muted-foreground ring-border",
};

export default function PagesPage() {
  return (
    <>
      <PageHeader
        title="Pages"
        description="The full woodex.pk inventory — core, city and article pages with template, owner and status."
        actions={
          <a href="/builder" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg bg-primary border border-primary-line text-primary-foreground hover:bg-primary-hover focus:outline-hidden focus:bg-primary-focus">
            Open builder
          </a>
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
            <h2 className="text-sm font-semibold text-foreground">Inventory</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-card-divider">
              <thead className="bg-surface">
                <tr>
                  {["Page", "Path", "Template", "Status", "Owner", "Updated"].map((h) => (
                    <th key={h} scope="col" className="px-4 py-2.5 text-start text-xs font-medium uppercase tracking-wide text-muted-foreground-1">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-card-divider">
                {PAGES.map((p) => (
                  <tr key={p.path} className="transition-colors hover:bg-muted/40">
                    <td className="px-4 py-2.5 font-medium text-foreground whitespace-nowrap">{p.page}</td>
                    <td className="px-4 py-2.5"><code className="text-xs text-primary">{p.path}</code></td>
                    <td className="px-4 py-2.5 text-muted-foreground whitespace-nowrap">{p.tpl}</td>
                    <td className="px-4 py-2.5">
                      <span className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${PILL[p.status]}`}>{p.status}</span>
                    </td>
                    <td className="px-4 py-2.5 text-muted-foreground whitespace-nowrap">{p.owner}</td>
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
