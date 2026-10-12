import { PageBody, PageHeader } from "@/components/ui/PageHeader";
import { INVOICES } from "@/lib/fixture";
import { formatPkr } from "@/lib/domain";

export const metadata = { title: "Payments" };

/** Payments — recorded collections against invoices (paid + partially paid). */
export default function PaymentsPage() {
  const rows = INVOICES.filter((i) => i.status !== "draft");
  const collected = rows.reduce((s, i) => s + (i.total - i.balance), 0);

  return (
    <>
      <PageHeader
        title="Payments"
        description="Every recorded collection — bank transfers, JazzCash and cash — matched to invoices and receipts."
      />
      <PageBody>
        <div className="bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-card-line flex flex-wrap items-center gap-x-2">
            <h2 className="text-sm font-semibold text-foreground">Collections</h2>
            <span className="inline-flex items-center py-0.5 px-1.5 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-500/10 dark:text-teal-500 text-[11px] font-medium">
              Collected {formatPkr(collected)}
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-table-line">
              <thead className="bg-muted">
                <tr>
                  {["Invoice", "Client", "Total", "Balance", "Status"].map((h) => (
                    <th key={h} scope="col" className="px-6 py-3 text-start text-xs font-semibold uppercase text-foreground whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-table-line">
                {rows.map((i) => (
                  <tr key={i.id} className="bg-layer hover:bg-layer-hover">
                    <td className="px-6 py-3 text-sm text-primary decoration-2 hover:underline whitespace-nowrap">{i.no}</td>
                    <td className="px-6 py-3 text-sm font-medium text-foreground whitespace-nowrap">{i.client.name}</td>
                    <td className="px-6 py-3 text-sm text-muted-foreground-1 whitespace-nowrap">{formatPkr(i.total)}</td>
                    <td className="px-6 py-3 text-sm font-semibold whitespace-nowrap">
                      {i.balance > 0 ? <span className="text-destructive">{formatPkr(i.balance)}</span> : <span className="text-muted-foreground-1">—</span>}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      {i.balance === 0 ? (
                        <span className="inline-flex items-center py-1 px-2.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800 dark:bg-teal-500/10 dark:text-teal-500">Paid</span>
                      ) : i.status === "overdue" ? (
                        <span className="inline-flex items-center py-1 px-2.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Overdue</span>
                      ) : i.status === "part_paid" ? (
                        <span className="inline-flex items-center py-1 px-2.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">Part paid</span>
                      ) : (
                        <span className="inline-flex items-center py-1 px-2.5 rounded-full text-xs font-medium bg-surface text-surface-foreground">Awaiting payment</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-table-line">
            <p className="text-sm text-muted-foreground-2"><span className="font-semibold text-foreground">{rows.length}</span> results</p>
          </div>
        </div>

        {/* Payment gateway adapters (Batch 3 · fixture — wiring pending) */}
        <div className="mt-5 bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-card-line flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">Payment gateways</h2>
            <button type="button" className="py-1.5 px-2.5 inline-flex items-center text-xs font-medium rounded-lg border border-border bg-layer text-layer-foreground hover:bg-layer-hover focus:outline-hidden">
              Add gateway
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-card-divider">
            {[
              { name: "JazzCash", state: "Live", tone: "bg-teal-500/10 text-teal-500 ring-teal-500/25", creds: [["Merchant ID MC41207", true], ["Integrity salt", true], ["Return URL", true]], note: "MC · MPay · Visa cards" },
              { name: "Easypaisa", state: "Sandbox", tone: "bg-amber-500/10 text-amber-500 ring-amber-500/25", creds: [["Store ID 99213", true], ["Hash key", true], ["Production creds", false]], note: "awaiting production credentials" },
              { name: "Raast", state: "Active", tone: "bg-teal-500/10 text-teal-500 ring-teal-500/25", creds: [["IBAN linked (Meezan)", true], ["Instant settlement", true], ["Webhook verified", true]], note: "IBAN-to-IBAN, zero fee" },
            ].map((g) => (
              <div key={g.name} className="p-5">
                <div className="flex items-center justify-between gap-x-2">
                  <h3 className="text-sm font-semibold text-foreground">{g.name}</h3>
                  <span className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${g.tone}`}>{g.state}</span>
                </div>
                <ul className="mt-3 space-y-1.5">
                  {g.creds.map(([c, ok]) => (
                    <li key={String(c)} className="flex items-center gap-x-2 text-xs text-foreground">
                      <span className={`grid size-4 shrink-0 place-items-center rounded-full ${ok ? "bg-teal-500/10 text-teal-500" : "bg-amber-500/10 text-amber-500"}`}>
                        <svg className="size-2.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">{ok ? <path d="M20 6 9 17l-5-5" /> : <path d="M12 8v5M12 16h.01" />}</svg>
                      </span>
                      {c}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-[11px] text-muted-foreground-1">{g.note}</p>
              </div>
            ))}
          </div>
          <div className="px-5 py-3 border-t border-card-line bg-surface">
            <p className="text-[11px] text-muted-foreground-1">
              <span className="font-semibold text-foreground">Webhook log</span> · payment.received PKR 75,000 → INV-2607 (JazzCash, verified) · payment.received PKR 40,000 → Q-2611 advance (Raast) — reconciled against invoices automatically.
            </p>
          </div>
        </div>
      </PageBody>
    </>
  );
}
