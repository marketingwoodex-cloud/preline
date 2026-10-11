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
      </PageBody>
    </>
  );
}
