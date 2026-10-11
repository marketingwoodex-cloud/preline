import { PageBody, PageHeader } from "@/components/ui/PageHeader";

export const metadata = { title: "Contracts" };

const KPIS = [
  { label: "Active contracts", value: "12", note: "9 residential · 3 commercial" },
  { label: "Awaiting signature", value: "4", note: "oldest 6 days" },
  { label: "Contracted value", value: "PKR 4.62Cr", note: "active + awaiting" },
  { label: "Expiring 30d", value: "2", note: "renewal talks started" },
];

const CONTRACTS = [
  { no: "CT-2094", client: "Ayesha Khan", project: "DHA Phase 6 — full kitchen", value: "PKR 28.5L", status: "Active", start: "2026-09-14", end: "2026-12-20", sig: "2/2" },
  { no: "CT-2091", client: "Usman Bhatti", project: "Bahria Town — kitchen + island", value: "PKR 19.2L", status: "Awaiting signature", start: "—", end: "—", sig: "1/2" },
  { no: "CT-2088", client: "Hina Raza", project: "Model Town — wardrobe suite", value: "PKR 12.8L", status: "Awaiting signature", start: "—", end: "—", sig: "0/2" },
  { no: "CT-2085", client: "Bilal Chaudhry", project: "Gulberg III — office fit-out", value: "PKR 41.0L", status: "Active", start: "2026-08-30", end: "2027-01-15", sig: "2/2" },
  { no: "CT-2079", client: "Fatima Noor", project: "Askari 11 — kitchen refit", value: "PKR 16.4L", status: "Completed", start: "2026-05-02", end: "2026-08-11", sig: "2/2" },
  { no: "CT-2074", client: "Omar Sheikh", project: "Cantt — bathroom ×3", value: "PKR 9.6L", status: "Expired", start: "—", end: "—", sig: "1/2" },
];

const PILL: Record<string, string> = {
  Active: "bg-teal-500/10 text-teal-500 ring-teal-500/25",
  "Awaiting signature": "bg-amber-500/10 text-amber-500 ring-amber-500/25",
  Completed: "bg-primary/10 text-primary ring-primary/25",
  Expired: "bg-muted text-muted-foreground ring-border",
};

export default function ContractsPage() {
  return (
    <>
      <PageHeader
        title="Contracts"
        description="Signed agreements tied to quotes and projects. Signature progress tracks client + Woodex countersign."
        actions={
          <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg bg-primary border border-primary-line text-primary-foreground hover:bg-primary-hover focus:outline-hidden focus:bg-primary-focus">
            New contract
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
            <h2 className="text-sm font-semibold text-foreground">Contract ledger</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-card-divider">
              <thead className="bg-surface">
                <tr>
                  {["Contract", "Client / Project", "Value", "Status", "Start", "End", "Signed"].map((h) => (
                    <th key={h} scope="col" className="px-4 py-2.5 text-start text-xs font-medium uppercase tracking-wide text-muted-foreground-1">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-card-divider">
                {CONTRACTS.map((c) => (
                  <tr key={c.no} className="transition-colors hover:bg-muted/40">
                    <td className="px-4 py-2.5 text-xs font-semibold text-primary whitespace-nowrap">{c.no}</td>
                    <td className="px-4 py-2.5">
                      <p className="font-medium text-foreground whitespace-nowrap">{c.client}</p>
                      <p className="text-[11px] text-muted-foreground-1">{c.project}</p>
                    </td>
                    <td className="wx-num px-4 py-2.5 text-foreground whitespace-nowrap">{c.value}</td>
                    <td className="px-4 py-2.5">
                      <span className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[11px] font-semibold ring-1 ring-inset whitespace-nowrap ${PILL[c.status]}`}>{c.status}</span>
                    </td>
                    <td className="wx-num px-4 py-2.5 text-muted-foreground whitespace-nowrap">{c.start}</td>
                    <td className="wx-num px-4 py-2.5 text-muted-foreground whitespace-nowrap">{c.end}</td>
                    <td className="px-4 py-2.5">
                      <span className={`wx-num text-xs font-semibold ${c.sig === "2/2" ? "text-teal-500" : "text-amber-500"}`}>{c.sig}</span>
                    </td>
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
