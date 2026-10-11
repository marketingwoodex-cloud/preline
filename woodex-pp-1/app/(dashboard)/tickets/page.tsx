import { PageBody, PageHeader } from "@/components/ui/PageHeader";

export const metadata = { title: "Support Tickets" };

const KPIS = [
  { label: "Open tickets", value: "6", note: "2 high priority" },
  { label: "Median first reply", value: "3h", note: "target ≤ 4h" },
  { label: "Resolved (7d)", value: "14", note: "93% satisfied" },
  { label: "Breached SLA", value: "1", note: "T-311 · post-mortem done" },
];

const TICKETS = [
  { id: "T-318", subject: "Hinge adjustment after refit", by: "Hina Raza", ch: "WhatsApp", prio: "Normal", status: "Open", due: "Oct 13", owner: "Workshop" },
  { id: "T-317", subject: "Invoice PDF not opening on phone", by: "Usman Siddiqui", ch: "Email", prio: "Normal", status: "Pending", due: "Oct 13", owner: "You" },
  { id: "T-316", subject: "Wardrobe sliding door off track", by: "Fatima Noor", ch: "Call", prio: "High", status: "Open", due: "Oct 12", owner: "Workshop" },
  { id: "T-314", subject: "Change of kitchen handle finish", by: "Ayesha Khan", ch: "WhatsApp", prio: "Normal", status: "Pending", due: "Oct 14", owner: "Sana R." },
  { id: "T-311", subject: "Delay complaint — DHA-6 refit", by: "Omar Sheikh", ch: "Email", prio: "High", status: "Resolved", due: "Oct 09", owner: "Owner" },
  { id: "T-309", subject: "Care guide re-send", by: "Bilal Chaudhry", ch: "Telegram", prio: "Low", status: "Resolved", due: "Oct 08", owner: "Editor" },
];

const P_PILL: Record<string, string> = {
  High: "bg-destructive/10 text-destructive ring-destructive/25",
  Normal: "bg-secondary/10 text-secondary ring-secondary/25",
  Low: "bg-muted text-muted-foreground ring-border",
};
const S_PILL: Record<string, string> = {
  Open: "bg-amber-500/10 text-amber-500 ring-amber-500/25",
  Pending: "bg-sky-500/10 text-sky-500 ring-sky-500/25",
  Resolved: "bg-teal-500/10 text-teal-500 ring-teal-500/25",
};

export default function TicketsPage() {
  return (
    <>
      <PageHeader
        title="Support Tickets"
        description="After-sales care is the brand. Every ticket gets a first reply inside 4 business hours; high priority inside 1."
        actions={
          <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg bg-primary border border-primary-line text-primary-foreground hover:bg-primary-hover focus:outline-hidden focus:bg-primary-focus">
            New ticket
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
            <h2 className="text-sm font-semibold text-foreground">Queue</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-card-divider">
              <thead className="bg-surface">
                <tr>
                  {["Ticket", "Subject", "Channel", "Priority", "Status", "Due", "Owner"].map((h) => (
                    <th key={h} scope="col" className="px-4 py-2.5 text-start text-xs font-medium uppercase tracking-wide text-muted-foreground-1">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-card-divider">
                {TICKETS.map((t) => (
                  <tr key={t.id} className="transition-colors hover:bg-muted/40">
                    <td className="px-4 py-2.5 text-xs font-semibold text-primary whitespace-nowrap">{t.id}</td>
                    <td className="px-4 py-2.5">
                      <p className="font-medium text-foreground">{t.subject}</p>
                      <p className="text-[11px] text-muted-foreground-1">{t.by}</p>
                    </td>
                    <td className="px-4 py-2.5 text-muted-foreground whitespace-nowrap">{t.ch}</td>
                    <td className="px-4 py-2.5"><span className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${P_PILL[t.prio]}`}>{t.prio}</span></td>
                    <td className="px-4 py-2.5"><span className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${S_PILL[t.status]}`}>{t.status}</span></td>
                    <td className="wx-num px-4 py-2.5 text-muted-foreground whitespace-nowrap">{t.due}</td>
                    <td className="px-4 py-2.5 text-muted-foreground whitespace-nowrap">{t.owner}</td>
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
