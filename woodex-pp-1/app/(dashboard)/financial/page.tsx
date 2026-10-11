import { PageBody, PageHeader } from "@/components/ui/PageHeader";

export const metadata = { title: "Financial Accounts" };

/**
 * Financial Accounts board — one screen for the five financial views:
 *   1. Monthly Income Board   (live cash-flow tracking)
 *   2. Due Payments Tracker   (outstanding / late invoices)
 *   3. Receipts Vault         (auto-generated paid receipts + logs)
 *   4. Expense Log            (supplier + admin operational costs)
 *   5. Financial Reports      (exportable P&L statements)
 *
 * Data shape mirrors the v2.1 finance JSON stores (_private/), so wiring each
 * block to its `admin.php?action=…` counterpart is the only change to go live.
 */

const INCOME = [
  { label: "Income this month", value: "PKR 12,480,000", trend: "+37.3%", up: true },
  { label: "Expenses this month", value: "PKR 4,210,000", trend: "+8.1%", up: true },
  { label: "Net cash flow", value: "PKR 8,270,000", trend: "+41.2%", up: true },
  { label: "Collection rate", value: "86%", trend: "-2.4%", up: false },
];

const DUE = [
  { no: "INV-1042", client: "DHA Phase 6 — Kitchen refit", due: "08 Oct 2026", days: 4, balance: 480000, state: "overdue" },
  { no: "INV-1039", client: "Bahria Orchard — Villa woodwork", due: "14 Oct 2026", days: -2, balance: 1250000, state: "due" },
  { no: "INV-1036", client: "Gulberg III — Office fitout", due: "18 Oct 2026", days: -6, balance: 960000, state: "due" },
  { no: "INV-1031", client: "Model Town — Duplex doors", due: "02 Oct 2026", days: 10, balance: 320000, state: "overdue" },
];

const RECEIPTS = [
  { no: "RCPT-0471", client: "Ayesha Khan", amount: 650000, via: "Bank Alfalah IBFT", date: "11 Oct 2026, 16:02", auto: true },
  { no: "RCPT-0470", client: "Bilal Chaudhry", amount: 180000, via: "JazzCash", date: "10 Oct 2026, 11:40", auto: true },
  { no: "RCPT-0469", client: "Sana Malik", amount: 420000, via: "Meezan Bank IBFT", date: "09 Oct 2026, 14:18", auto: true },
  { no: "RCPT-0468", client: "Hina Raza", amount: 95000, via: "Cash — head office", date: "08 Oct 2026, 10:05", auto: false },
];

const EXPENSES = [
  { category: "Supplier — timber", detail: "Ash + MDF sheets, Lahore stock", amount: 1840000, date: "10 Oct 2026", vendor: "Chenab Timber Co." },
  { category: "Supplier — hardware", detail: "Hinges, slides, handles (Hettich)", amount: 610000, date: "08 Oct 2026", vendor: "Hardware bazaar" },
  { category: "Labour — installation", detail: "DHA 6 site crew, 12 days", amount: 480000, date: "07 Oct 2026", vendor: "Contract crew A" },
  { category: "Admin — utilities", detail: "Workshop electricity + internet", amount: 96000, date: "05 Oct 2026", vendor: "LESCO / PTCL" },
  { category: "Admin — software", detail: "Hosting, Claude API, WhatsApp Cloud", amount: 74000, date: "01 Oct 2026", vendor: "Various" },
];

const PL = [
  { line: "Gross revenue (invoiced)", value: 12480000, kind: "pos" },
  { line: "Collections received", value: 9100000, kind: "pos" },
  { line: "Cost of materials", value: -2450000, kind: "neg" },
  { line: "Labour & installation", value: -1280000, kind: "neg" },
  { line: "Operating & admin", value: -480000, kind: "neg" },
  { line: "Net profit (month-to-date)", value: 8270000, kind: "net" },
];

const pkr = (n: number) =>
  "PKR " + Math.abs(n).toLocaleString("en-US") + (n < 0 ? " (−)" : "");

export default function FinancialPage() {
  return (
    <>
      <PageHeader
        title="Financial Accounts"
        description="Monthly income, due payments, receipts, expenses and exportable reports — the money side of Woodex PP-1 in one board."
      />
      <PageBody className="space-y-5">
        {/* 1. Monthly Income Board */}
        <div className="grid grid-cols-2 md:grid-cols-4 bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden">
          {INCOME.map((c, i) => (
            <div key={c.label} className={`p-4 sm:p-6 text-center border-card-divider ${i < 3 ? "border-e" : ""} ${i < 2 ? "border-b md:border-b-0" : ""}`}>
              <div className="text-xl sm:text-2xl font-semibold text-primary">{c.value}</div>
              <div className="mt-1 flex justify-center items-center gap-x-2">
                <span className="text-sm text-muted-foreground-1">{c.label}</span>
                <span className="inline-flex items-center gap-x-1 py-0.5 px-1.5 rounded-md bg-surface text-surface-foreground text-xs font-medium">
                  <svg className={`shrink-0 size-3 ${c.up ? "" : "rotate-180"}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>
                  {c.trend}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          {/* 2. Due Payments Tracker */}
          <div className="xl:col-span-2 bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-card-line flex items-center justify-between gap-2">
              <div>
                <h2 className="text-sm font-semibold text-foreground">Due Payments Tracker</h2>
                <p className="text-sm text-muted-foreground-2">Outstanding and late invoices</p>
              </div>
              <button type="button" className="py-1.5 px-2.5 inline-flex items-center gap-x-1.5 text-xs font-medium rounded-lg border border-layer-line bg-layer text-layer-foreground shadow-2xs hover:bg-layer-hover focus:outline-hidden focus:bg-layer-focus">
                Send reminders
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-table-line">
                <thead className="bg-muted">
                  <tr>
                    {["Invoice", "Client", "Due", "Status", "Balance"].map((h) => (
                      <th key={h} scope="col" className="px-6 py-3 text-start text-xs font-semibold uppercase text-foreground whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-table-line">
                  {DUE.map((d) => (
                    <tr key={d.no} className="bg-layer hover:bg-layer-hover">
                      <td className="px-6 py-3 text-sm text-primary decoration-2 hover:underline whitespace-nowrap">{d.no}</td>
                      <td className="px-6 py-3 text-sm text-foreground whitespace-nowrap">{d.client}</td>
                      <td className="px-6 py-3 text-sm text-muted-foreground-1 whitespace-nowrap">{d.due}</td>
                      <td className="px-6 py-3 whitespace-nowrap">
                        {d.state === "overdue" ? (
                          <span className="inline-flex items-center gap-x-1.5 py-1 px-2.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">{d.days}d overdue</span>
                        ) : (
                          <span className="inline-flex items-center gap-x-1.5 py-1 px-2.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">Due in {Math.abs(d.days)}d</span>
                        )}
                      </td>
                      <td className="px-6 py-3 text-sm font-semibold text-foreground whitespace-nowrap">{pkr(d.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 3. Receipts Vault */}
          <div className="bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-card-line">
              <h2 className="text-sm font-semibold text-foreground">Receipts Vault</h2>
              <p className="text-sm text-muted-foreground-2">Auto-generated on every recorded payment</p>
            </div>
            <ul className="divide-y divide-card-divider">
              {RECEIPTS.map((r) => (
                <li key={r.no} className="px-6 py-3 flex items-center gap-x-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                    <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" /><path d="M8 7h8" /><path d="M8 11h8" /><path d="M8 15h5" /></svg>
                  </span>
                  <div className="min-w-0 grow">
                    <p className="text-sm font-medium text-foreground truncate">{r.no} · {r.client}</p>
                    <p className="text-xs text-muted-foreground-1 truncate">{r.via} · {r.date}{r.auto ? " · auto" : ""}</p>
                  </div>
                  <span className="wx-num text-sm font-semibold text-foreground shrink-0">{pkr(r.amount)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          {/* 4. Expense Log */}
          <div className="xl:col-span-2 bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-card-line flex items-center justify-between gap-2">
              <div>
                <h2 className="text-sm font-semibold text-foreground">Expense Log</h2>
                <p className="text-sm text-muted-foreground-2">Supplier and administrative operational costs</p>
              </div>
              <button type="button" className="py-1.5 px-2.5 inline-flex items-center gap-x-1.5 text-xs font-medium rounded-lg bg-primary border border-primary-line text-primary-foreground hover:bg-primary-hover focus:outline-hidden focus:bg-primary-focus">
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                Log expense
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-table-line">
                <thead className="bg-muted">
                  <tr>
                    {["Category", "Detail", "Vendor", "Date", "Amount"].map((h) => (
                      <th key={h} scope="col" className="px-6 py-3 text-start text-xs font-semibold uppercase text-foreground whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-table-line">
                  {EXPENSES.map((e, i) => (
                    <tr key={i} className="bg-layer hover:bg-layer-hover">
                      <td className="px-6 py-3 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 py-1 px-2 rounded-lg text-xs font-medium bg-surface text-surface-foreground">{e.category}</span>
                      </td>
                      <td className="px-6 py-3 text-sm text-muted-foreground-1 whitespace-nowrap">{e.detail}</td>
                      <td className="px-6 py-3 text-sm text-foreground whitespace-nowrap">{e.vendor}</td>
                      <td className="px-6 py-3 text-sm text-muted-foreground-1 whitespace-nowrap">{e.date}</td>
                      <td className="px-6 py-3 text-sm font-semibold text-foreground whitespace-nowrap">{pkr(-e.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 5. Financial Reports */}
          <div className="bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-card-line">
              <h2 className="text-sm font-semibold text-foreground">Financial Reports</h2>
              <p className="text-sm text-muted-foreground-2">Profit &amp; loss — October 2026 MTD</p>
            </div>
            <ul className="divide-y divide-card-divider">
              {PL.map((l) => (
                <li key={l.line} className="px-6 py-2.5 flex items-center justify-between gap-x-3">
                  <span className={`text-sm ${l.kind === "net" ? "font-semibold text-foreground" : "text-muted-foreground-1"}`}>{l.line}</span>
                  <span className={`wx-num text-sm font-semibold whitespace-nowrap ${l.kind === "neg" ? "text-destructive" : "text-foreground"}`}>{pkr(l.value)}</span>
                </li>
              ))}
            </ul>
            <div className="px-6 py-4 border-t border-card-line flex gap-x-2">
              <button type="button" className="flex-1 py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-layer-line bg-layer text-layer-foreground shadow-2xs hover:bg-layer-hover focus:outline-hidden focus:bg-layer-focus">
                Export CSV
              </button>
              <button type="button" className="flex-1 py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg bg-primary border border-primary-line text-primary-foreground hover:bg-primary-hover focus:outline-hidden focus:bg-primary-focus">
                Export PDF
              </button>
            </div>
          </div>
        </div>
      </PageBody>
    </>
  );
}
