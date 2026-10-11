import { PageBody, PageHeader } from "@/components/ui/PageHeader";
import { QUOTES } from "@/lib/fixture";
import { formatPkr } from "@/lib/domain";

export const metadata = { title: "Sales" };

/** Sales — quote ledger with status pills; the entry point of the Revenue group. */

const TONE: Record<string, string> = {
  sent: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  approved: "bg-teal-100 text-teal-800 dark:bg-teal-500/10 dark:text-teal-500",
  declined: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  draft: "bg-surface text-surface-foreground",
  expired: "bg-surface text-muted-foreground-1",
};

export default function SalesPage() {
  const approved = QUOTES.filter((q) => q.status === "approved");
  const sent = QUOTES.filter((q) => q.status === "sent");

  return (
    <>
      <PageHeader
        title="Sales"
        description="The quote ledger — every offer made, its status and value. Leads flow in from the pipeline, invoices out to Payments."
      />
      <PageBody className="space-y-5">
        <div className="grid grid-cols-2 md:grid-cols-4 bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden">
          {[
            { label: "Quotes total", value: String(QUOTES.length) },
            { label: "Approved", value: String(approved.length) },
            { label: "Awaiting reply", value: String(sent.length) },
            { label: "Approved value", value: formatPkr(approved.reduce((s, q) => s + q.total, 0)) },
          ].map((c, i) => (
            <div key={c.label} className={`p-4 sm:p-6 text-center border-card-divider ${i < 3 ? "border-e" : ""} ${i < 2 ? "border-b md:border-b-0" : ""}`}>
              <div className="text-xl sm:text-2xl font-semibold text-primary">{c.value}</div>
              <div className="mt-1 text-sm text-muted-foreground-1">{c.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-card-line">
            <h2 className="text-sm font-semibold text-foreground">Quote ledger</h2>
            <p className="text-sm text-muted-foreground-2">Newest first</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-table-line">
              <thead className="bg-muted">
                <tr>
                  {["Quote", "Client", "Scope", "Total", "Status", "Sent"].map((h) => (
                    <th key={h} scope="col" className="px-6 py-3 text-start text-xs font-semibold uppercase text-foreground whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-table-line">
                {QUOTES.map((q) => (
                  <tr key={q.id} className="bg-layer hover:bg-layer-hover">
                    <td className="px-6 py-3 text-sm text-primary decoration-2 hover:underline whitespace-nowrap">{q.no}</td>
                    <td className="px-6 py-3 text-sm font-medium text-foreground whitespace-nowrap">{q.client.name}</td>
                    <td className="px-6 py-3 text-sm text-muted-foreground-1 whitespace-nowrap max-w-64 truncate">{q.title}</td>
                    <td className="px-6 py-3 text-sm font-semibold text-foreground whitespace-nowrap">{formatPkr(q.total)}</td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      <span className={`inline-flex items-center py-1 px-2.5 rounded-full text-xs font-medium ${TONE[q.status] ?? TONE.draft} capitalize`}>{q.status}</span>
                    </td>
                    <td className="px-6 py-3 text-sm text-muted-foreground-1 whitespace-nowrap">{q.sent_at ? q.sent_at.slice(0, 10) : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-table-line">
            <p className="text-sm text-muted-foreground-2"><span className="font-semibold text-foreground">{QUOTES.length}</span> results</p>
          </div>
        </div>
      </PageBody>
    </>
  );
}
