import { PageBody, PageHeader } from "@/components/ui/PageHeader";

export const metadata = { title: "Approvals" };

const KPIS = [
  { label: "Pending", value: "5", note: "2 older than 48h" },
  { label: "Median decision", value: "7h", note: "target ≤ 24h" },
  { label: "Approved (7d)", value: "11", note: "PKR 6.1L committed" },
  { label: "Rejected (7d)", value: "3", note: "policy reasons" },
];

const PENDING = [
  { type: "Quote discount", what: "Q-124 · Ayesha Khan — 8% off kitchen package", requester: "Sana R.", amount: "PKR 2.3L", waited: "6h", urgent: false },
  { type: "Refund", what: "INV-0097 · advance refund after cancellation", requester: "Omar M.", amount: "PKR 50,000", waited: "26h", urgent: false },
  { type: "Purchase", what: "Walnut veneer restock — 40 sheets, supplier AA Woods", requester: "Workshop", amount: "PKR 4.8L", waited: "51h", urgent: true },
  { type: "Content publish", what: "City page “DHA Phase 8 kitchens” — SEO review passed", requester: "Editor", amount: "—", waited: "9h", urgent: false },
  { type: "Quote discount", what: "Q-119 · Bilal Chaudhry — fit-out 5% + free island top", requester: "You", amount: "PKR 2.05L", waited: "70h", urgent: true },
];

const DECIDED = [
  { what: "Q-121 · Hina Raza — wardrobe 6% discount", by: "Owner", call: "Approved", when: "Yesterday" },
  { what: "Overtime pay — delivery crew (Eid week)", by: "Owner", call: "Approved", when: "Yesterday" },
  { what: "Purchase — imported brass inlay sample set", by: "Admin", call: "Rejected", when: "Mon" },
];

export default function ApprovalsPage() {
  return (
    <>
      <PageHeader
        title="Approvals"
        description="Discounts, refunds, purchases and publishes that need a second pair of eyes. Items over 48h are flagged."
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
              <h2 className="text-sm font-semibold text-foreground">Waiting for decision</h2>
            </div>
            <ul className="divide-y divide-card-divider">
              {PENDING.map((p) => (
                <li key={p.what} className="px-5 py-4 flex items-center gap-x-4">
                  <span className={`grid size-9 shrink-0 place-items-center rounded-lg ${p.urgent ? "bg-amber-500/10 text-amber-500" : "bg-primary/10 text-primary"}`}>
                    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></svg>
                  </span>
                  <div className="min-w-0 grow">
                    <p className="flex items-center gap-2 text-sm font-medium text-foreground">
                      {p.type}
                      {p.urgent && <span className="inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold bg-amber-500/10 text-amber-500 ring-1 ring-inset ring-amber-500/25">&gt;48h</span>}
                    </p>
                    <p className="truncate text-xs text-muted-foreground-1">{p.what} · by {p.requester}</p>
                  </div>
                  <span className="hidden sm:block shrink-0 text-xs font-semibold text-foreground wx-num">{p.amount}</span>
                  <span className="shrink-0 text-[11px] text-muted-foreground-1 wx-num w-12 text-right">{p.waited}</span>
                  <div className="flex shrink-0 gap-x-1.5">
                    <button type="button" className="py-1.5 px-2.5 inline-flex items-center text-xs font-medium rounded-lg bg-teal-500/10 text-teal-500 hover:bg-teal-500/20 focus:outline-hidden">Approve</button>
                    <button type="button" className="py-1.5 px-2.5 inline-flex items-center text-xs font-medium rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 focus:outline-hidden">Reject</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-card-line">
              <h2 className="text-sm font-semibold text-foreground">Recently decided</h2>
            </div>
            <ul className="divide-y divide-card-divider">
              {DECIDED.map((d) => (
                <li key={d.what} className="px-5 py-3">
                  <p className="text-xs text-foreground">{d.what}</p>
                  <p className="mt-1 flex items-center gap-2 text-[11px] text-muted-foreground-1">
                    <span className={`inline-flex items-center rounded-md px-1.5 py-0.5 font-semibold ${d.call === "Approved" ? "bg-teal-500/10 text-teal-500" : "bg-destructive/10 text-destructive"}`}>{d.call}</span>
                    by {d.by} · {d.when}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PageBody>
    </>
  );
}
