import { PageBody, PageHeader } from "@/components/ui/PageHeader";

export const metadata = { title: "Print Center" };

const QUEUE = [
  { doc: "Quote Q-124 (PDF)", kind: "Quote", to: "Ayesha Khan · WhatsApp", status: "Rendered", when: "10:52" },
  { doc: "Invoice INV-0099 receipt", kind: "Invoice", to: "Usman Siddiqui · email", status: "Sent", when: "09:40" },
  { doc: "Contract CT-2091 signature pack", kind: "Contract", to: "Usman Bhatti · email", status: "Queued", when: "09:12" },
  { doc: "Delivery challan — DHA-6 refit", kind: "Challan", to: "Workshop printer", status: "Queued", when: "08:55" },
  { doc: "October owner digest", kind: "Report", to: "owner@woodex.pk", status: "Sent", when: "08:00" },
];

const PILL: Record<string, string> = {
  Sent: "bg-teal-500/10 text-teal-500 ring-teal-500/25",
  Rendered: "bg-primary/10 text-primary ring-primary/25",
  Queued: "bg-amber-500/10 text-amber-500 ring-amber-500/25",
};

const TEMPLATES = [
  { name: "Quote — branded A4", vars: "logo · price book · terms", v: "v6" },
  { name: "Invoice + receipt", vars: "tax no. · payment link", v: "v4" },
  { name: "Contract pack", vars: "scope · milestones · sign blocks", v: "v3" },
  { name: "Delivery challan", vars: "items · vehicle · signatures", v: "v2" },
];

export default function PrintCenterPage() {
  return (
    <>
      <PageHeader
        title="Print Center"
        description="One queue for every branded document — rendered headless, delivered digitally or to the workshop printer."
        actions={
          <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg bg-primary border border-primary-line text-primary-foreground hover:bg-primary-hover focus:outline-hidden focus:bg-primary-focus">
            Render document
          </button>
        }
      />
      <PageBody>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          <div className="xl:col-span-2 bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-card-line flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">Queue</h2>
              <span className="text-xs text-muted-foreground-1">2 queued · avg render 4s</span>
            </div>
            <ul className="divide-y divide-card-divider">
              {QUEUE.map((q) => (
                <li key={q.doc} className="px-5 py-3.5 flex items-center gap-x-4">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-destructive/10 text-destructive">
                    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>
                  </span>
                  <div className="min-w-0 grow">
                    <p className="truncate text-sm font-medium text-foreground">{q.doc}</p>
                    <p className="truncate text-xs text-muted-foreground-1">{q.kind} → {q.to}</p>
                  </div>
                  <span className={`shrink-0 inline-flex items-center rounded-md px-1.5 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${PILL[q.status]}`}>{q.status}</span>
                  <span className="shrink-0 text-[11px] text-muted-foreground-1 wx-num w-12 text-right">{q.when}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-5">
            <div className="bg-card border border-card-line shadow-2xs rounded-xl p-5">
              <h2 className="text-sm font-semibold text-foreground">Output settings</h2>
              <ul className="mt-3 space-y-2 text-xs">
                <li className="flex justify-between rounded-lg border border-layer-line bg-layer px-3 py-2"><span className="text-muted-foreground-1">Paper</span><span className="font-semibold text-foreground">A4</span></li>
                <li className="flex justify-between rounded-lg border border-layer-line bg-layer px-3 py-2"><span className="text-muted-foreground-1">Letterhead</span><span className="font-semibold text-foreground">on</span></li>
                <li className="flex justify-between rounded-lg border border-layer-line bg-layer px-3 py-2"><span className="text-muted-foreground-1">QR verification</span><span className="font-semibold text-foreground">on</span></li>
                <li className="flex justify-between rounded-lg border border-layer-line bg-layer px-3 py-2"><span className="text-muted-foreground-1">Workshop printer</span><span className="font-semibold text-teal-500">online</span></li>
              </ul>
            </div>
            <div className="bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden">
              <div className="px-5 py-3 border-b border-card-line">
                <h2 className="text-sm font-semibold text-foreground">Templates</h2>
              </div>
              <ul className="divide-y divide-card-divider">
                {TEMPLATES.map((t) => (
                  <li key={t.name} className="px-5 py-3">
                    <p className="flex items-center justify-between text-sm font-medium text-foreground">
                      {t.name}
                      <code className="text-[11px] text-primary">{t.v}</code>
                    </p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground-1">{t.vars}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </PageBody>
    </>
  );
}
