import { PageBody, PageHeader } from "@/components/ui/PageHeader";

export const metadata = { title: "Redirects" };

const KPIS = [
  { label: "Active redirects", value: "23", note: "21 × 301 · 2 × 302" },
  { label: "Hits (30d)", value: "1,140", note: "all sources healthy" },
  { label: "Broken targets", value: "1", note: "destination 404s" },
  { label: "Chains", value: "0", note: "no multi-hop paths" },
];

const ROWS = [
  { from: "/kitchen-design-lahore", to: "/kitchens-lahore", type: "301", hits: 420, status: "Active", since: "2026-03-12" },
  { from: "/wardrobe", to: "/wardrobes-gulberg", type: "301", hits: 260, status: "Active", since: "2026-05-02" },
  { from: "/old-gallery", to: "/gallery", type: "301", hits: 190, status: "Active", since: "2026-01-18" },
  { from: "/eid-offer", to: "/blog/eid-collection-2026", type: "302", hits: 150, status: "Active", since: "2026-09-25" },
  { from: "/bathroom-packages", to: "/bathrooms-model-town", type: "301", hits: 90, status: "Broken", since: "2025-11-30" },
  { from: "/contact-us", to: "/bookings", type: "302", hits: 30, status: "Active", since: "2026-08-14" },
];

const PILL: Record<string, string> = {
  Active: "bg-teal-500/10 text-teal-500 ring-teal-500/25",
  Broken: "bg-destructive/10 text-destructive ring-destructive/25",
};

export default function RedirectsPage() {
  return (
    <>
      <PageHeader
        title="Redirects"
        description="Every URL move is tracked so old links — and Google's index — keep landing on live pages. Nightly crawler checks each target."
        actions={
          <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg bg-primary border border-primary-line text-primary-foreground hover:bg-primary-hover focus:outline-hidden focus:bg-primary-focus">
            Add redirect
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
            <h2 className="text-sm font-semibold text-foreground">Redirect map</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-card-divider">
              <thead className="bg-surface">
                <tr>
                  {["From", "To", "Type", "Hits 30d", "Status", "Since"].map((h) => (
                    <th key={h} scope="col" className="px-4 py-2.5 text-start text-xs font-medium uppercase tracking-wide text-muted-foreground-1">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-card-divider">
                {ROWS.map((r) => (
                  <tr key={r.from} className="transition-colors hover:bg-muted/40">
                    <td className="px-4 py-2.5"><code className="text-xs text-muted-foreground-1">{r.from}</code></td>
                    <td className="px-4 py-2.5">
                      <span className="inline-flex items-center gap-x-1.5">
                        <svg className="shrink-0 size-3.5 text-muted-foreground-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                        <code className="text-xs text-primary">{r.to}</code>
                      </span>
                    </td>
                    <td className="px-4 py-2.5"><span className="inline-flex items-center rounded-md px-1.5 py-0.5 text-[11px] font-semibold bg-secondary/10 text-secondary">{r.type}</span></td>
                    <td className="wx-num px-4 py-2.5 text-muted-foreground">{r.hits}</td>
                    <td className="px-4 py-2.5">
                      <span className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${PILL[r.status]}`}>{r.status}</span>
                    </td>
                    <td className="wx-num px-4 py-2.5 text-right text-muted-foreground whitespace-nowrap">{r.since}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 border-t border-card-line bg-surface">
            <p className="text-[11px] text-muted-foreground-1">
              <span className="font-semibold text-destructive">/bathroom-packages</span> target returns 404 — repoint to /bathrooms-model-town to clear the only broken redirect.
            </p>
          </div>
        </div>
      </PageBody>
    </>
  );
}
