import { PageBody, PageHeader } from "@/components/ui/PageHeader";

export const metadata = { title: "Sales Report" };

const KPIS = [
  { label: "Collected (Oct MTD)", value: "PKR 3.68Cr", note: "100% of target" },
  { label: "Quotes approved", value: "14", note: "of 31 sent · 45%" },
  { label: "Avg. deal size", value: "PKR 18.6L", note: "+12% vs Q3" },
  { label: "Win rate", value: "41%", note: "open stages excluded" },
];

/* Monthly collections, relative bar heights (PKR lakhs) */
const MONTHS = [
  { m: "May", v: 210 }, { m: "Jun", v: 246 }, { m: "Jul", v: 232 }, { m: "Aug", v: 268 },
  { m: "Sep", v: 305 }, { m: "Oct", v: 368 },
];

const SERVICES = [
  { name: "Kitchens", deals: 9, value: "PKR 2.02Cr", share: "55%" },
  { name: "Wardrobes", deals: 6, value: "PKR 84L", share: "23%" },
  { name: "Full fit-outs", deals: 2, value: "PKR 52L", share: "14%" },
  { name: "Bathrooms", deals: 4, value: "PKR 30L", share: "8%" },
];

export default function SalesReportPage() {
  const max = Math.max(...MONTHS.map((x) => x.v));
  return (
    <>
      <PageHeader
        title="Sales Report"
        description="October 2026 month-to-date vs trailing months. Figures from invoices, quotes and the CRM ledger."
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
          <div className="xl:col-span-2 bg-card border border-card-line shadow-2xs rounded-xl p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">Collections by month</h2>
              <span className="text-xs text-muted-foreground-1">PKR lakhs</span>
            </div>
            <div className="mt-4 flex h-44 items-end gap-3">
              {MONTHS.map((x) => (
                <div key={x.m} className="group flex flex-1 flex-col items-center gap-1.5">
                  <span className="text-[10px] font-semibold text-muted-foreground-1 wx-num opacity-0 transition-opacity group-hover:opacity-100">{x.v}</span>
                  <div className={`w-full rounded-t-md transition-colors ${x.m === "Oct" ? "bg-primary" : "bg-primary/40 group-hover:bg-primary/70"}`} style={{ height: `${(x.v / max) * 150}px` }} />
                  <span className="text-[10px] text-muted-foreground-1">{x.m}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-card-line">
              <h2 className="text-sm font-semibold text-foreground">Service mix</h2>
            </div>
            <ul className="divide-y divide-card-divider">
              {SERVICES.map((s) => (
                <li key={s.name} className="px-5 py-3 flex items-center gap-x-3">
                  <p className="min-w-0 grow text-sm text-foreground">{s.name}</p>
                  <span className="text-xs text-muted-foreground-1 wx-num">{s.deals} deals</span>
                  <span className="w-20 text-right text-xs font-semibold text-foreground wx-num">{s.value}</span>
                  <span className="w-10 text-right text-xs font-bold text-primary wx-num">{s.share}</span>
                </li>
              ))}
            </ul>
            <div className="px-5 py-3 border-t border-card-line bg-surface">
              <p className="text-[11px] text-muted-foreground-1">Kitchens keep the lights on; fit-outs carry the margin.</p>
            </div>
          </div>
        </div>
      </PageBody>
    </>
  );
}
