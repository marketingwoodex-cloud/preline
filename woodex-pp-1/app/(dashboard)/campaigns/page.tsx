import { PageBody, PageHeader } from "@/components/ui/PageHeader";

export const metadata = { title: "Campaigns" };

const KPIS = [
  { label: "Sent this month", value: "12,480", note: "+18% vs Sept", tone: "text-primary" },
  { label: "Avg. read rate", value: "61%", note: "WhatsApp leads", tone: "text-foreground" },
  { label: "Click-through", value: "18.4%", note: "to woodex.pk", tone: "text-foreground" },
  { label: "Opt-outs", value: "0.8%", note: "under 1% guardrail", tone: "text-teal-500" },
];

const CAMPAIGNS = [
  { name: "Eid collection launch", channel: "WhatsApp", segment: "Past clients — DHA", sent: "1,240", read: "74%", status: "Sent", when: "2026-10-08" },
  { name: "Referral bonus reminder", channel: "WhatsApp", segment: "Hot leads (score ≥ 8)", sent: "96", read: "81%", status: "Sent", when: "2026-10-06" },
  { name: "Walnut veneer restock", channel: "WhatsApp", segment: "Kitchen interest", sent: "233", read: "—", status: "Sending", when: "2026-10-12" },
  { name: "Kitchen gallery drop", channel: "Email", segment: "Kitchen interest", sent: "—", read: "—", status: "Scheduled", when: "2026-10-16" },
  { name: "Monsoon bathroom offer", channel: "SMS", segment: "Inactive 6m+", sent: "—", read: "—", status: "Scheduled", when: "2026-10-17" },
  { name: "Lahore showroom invite", channel: "Email", segment: "Site visits last 30d", sent: "—", read: "—", status: "Draft", when: "—" },
];

const PILL: Record<string, string> = {
  Sent: "bg-teal-500/10 text-teal-500 ring-teal-500/25",
  Sending: "bg-sky-500/10 text-sky-500 ring-sky-500/25",
  Scheduled: "bg-amber-500/10 text-amber-500 ring-amber-500/25",
  Draft: "bg-muted text-muted-foreground ring-border",
};

const CHANNEL: Record<string, string> = {
  WhatsApp: "bg-emerald-500/10 text-emerald-500",
  Email: "bg-primary/10 text-primary",
  SMS: "bg-secondary/10 text-secondary",
};

export default function CampaignsPage() {
  return (
    <>
      <PageHeader
        title="Campaigns"
        description="Broadcast sends across WhatsApp, Email and SMS — measured against the 3-per-week / 1% opt-out guardrails."
        actions={
          <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg bg-primary border border-primary-line text-primary-foreground hover:bg-primary-hover focus:outline-hidden focus:bg-primary-focus">
            New campaign
            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>
          </button>
        }
      />
      <PageBody>
        <div className="grid grid-cols-2 gap-5 xl:grid-cols-4">
          {KPIS.map((k) => (
            <div key={k.label} className="bg-card border border-card-line shadow-2xs rounded-xl p-4">
              <p className="text-xs text-muted-foreground-1">{k.label}</p>
              <p className={`mt-1 text-2xl font-bold ${k.tone}`}>{k.value}</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground-1">{k.note}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-card-line flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">All campaigns</h2>
            <span className="text-xs text-muted-foreground-1">October 2026</span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-card-divider">
              <thead className="bg-surface">
                <tr>
                  {["Campaign", "Channel", "Segment", "Sent", "Read", "Status", "Date"].map((h) => (
                    <th key={h} scope="col" className="px-4 py-2.5 text-start text-xs font-medium uppercase tracking-wide text-muted-foreground-1">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-card-divider">
                {CAMPAIGNS.map((c) => (
                  <tr key={c.name} className="transition-colors hover:bg-muted/40">
                    <td className="px-4 py-2.5 font-medium text-foreground whitespace-nowrap">{c.name}</td>
                    <td className="px-4 py-2.5">
                      <span className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[11px] font-semibold ${CHANNEL[c.channel]}`}>{c.channel}</span>
                    </td>
                    <td className="px-4 py-2.5 text-muted-foreground whitespace-nowrap">{c.segment}</td>
                    <td className="wx-num px-4 py-2.5 text-right text-muted-foreground">{c.sent}</td>
                    <td className="wx-num px-4 py-2.5 text-right text-muted-foreground">{c.read}</td>
                    <td className="px-4 py-2.5">
                      <span className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${PILL[c.status]}`}>{c.status}</span>
                    </td>
                    <td className="wx-num px-4 py-2.5 text-right text-muted-foreground whitespace-nowrap">{c.when}</td>
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
