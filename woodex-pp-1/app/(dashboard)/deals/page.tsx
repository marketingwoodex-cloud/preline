import { PageBody, PageHeader } from "@/components/ui/PageHeader";
import { LEADS } from "@/lib/fixture";
import { STAGE_LABEL, formatPkr } from "@/lib/domain";

export const metadata = { title: "Deals" };

/** Deals — won/lost ledger from the CRM stages, with values and close dates. */
export default function DealsPage() {
  const closed = LEADS.filter((l) => l.stage === "won" || l.stage === "lost");
  const won = closed.filter((l) => l.stage === "won");
  const wonValue = won.reduce((s, l) => s + l.value, 0);

  return (
    <>
      <PageHeader
        title="Deals"
        description="Closed ledger — every won and lost deal with its value. Feeds the Lost / Won analytics board."
      />
      <PageBody>
        <div className="bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-card-line flex flex-wrap items-center gap-x-2">
            <h2 className="text-sm font-semibold text-foreground">Closed deals</h2>
            <span className="inline-flex items-center py-0.5 px-1.5 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-500/10 dark:text-teal-500 text-[11px] font-medium">{won.length} won · {formatPkr(wonValue)}</span>
            <span className="inline-flex items-center py-0.5 px-1.5 rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 text-[11px] font-medium">{closed.length - won.length} lost</span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-table-line">
              <thead className="bg-muted">
                <tr>
                  {["Client", "Service", "Outcome", "Value", "Closed"].map((h) => (
                    <th key={h} scope="col" className="px-6 py-3 text-start text-xs font-semibold uppercase text-foreground whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-table-line">
                {closed.map((l) => (
                  <tr key={l.id} className="bg-layer hover:bg-layer-hover">
                    <td className="px-6 py-3 text-sm font-medium text-foreground whitespace-nowrap">{l.name}</td>
                    <td className="px-6 py-3 text-sm text-muted-foreground-1 whitespace-nowrap">{l.service || "General enquiry"}</td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      {l.stage === "won" ? (
                        <span className="inline-flex items-center py-1 px-2.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800 dark:bg-teal-500/10 dark:text-teal-500">Won</span>
                      ) : (
                        <span className="inline-flex items-center py-1 px-2.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Lost</span>
                      )}
                    </td>
                    <td className="px-6 py-3 text-sm font-semibold text-foreground whitespace-nowrap">{formatPkr(l.value)}</td>
                    <td className="px-6 py-3 text-sm text-muted-foreground-1 whitespace-nowrap">{l.created_at.slice(0, 10)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-table-line">
            <p className="text-sm text-muted-foreground-2"><span className="font-semibold text-foreground">{closed.length}</span> results</p>
          </div>
        </div>
      </PageBody>
    </>
  );
}
