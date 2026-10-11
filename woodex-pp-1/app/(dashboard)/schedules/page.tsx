import { PageBody, PageHeader } from "@/components/ui/PageHeader";

export const metadata = { title: "Send Schedules" };

const QUEUE = [
  { day: "Today · Mon 12 Oct", time: "18:00", campaign: "Referral bonus reminder", channel: "WhatsApp", segment: "Hot leads (score ≥ 8)", status: "Queued" },
  { day: "Thu 16 Oct", time: "10:00", campaign: "Kitchen gallery drop", channel: "Email", segment: "Kitchen interest", status: "Queued" },
  { day: "Fri 17 Oct", time: "20:30", campaign: "Monsoon bathroom offer", channel: "SMS", segment: "Inactive 6m+", status: "Paused" },
  { day: "Mon 20 Oct", time: "09:30", campaign: "Site-visit feedback pulse", channel: "WhatsApp", segment: "Site visits last 30d", status: "Queued" },
];

const PILL: Record<string, string> = {
  Queued: "bg-teal-500/10 text-teal-500 ring-teal-500/25",
  Paused: "bg-amber-500/10 text-amber-500 ring-amber-500/25",
};

const GUARDS = [
  { name: "Quiet hours", value: "21:00 – 09:00 PKT", note: "no sends outside window" },
  { name: "Frequency cap", value: "3 / week / segment", note: "hard stop, owner override only" },
  { name: "Opt-out spike", value: "auto-pause at 1%", note: "pauses channel + alerts owner" },
  { name: "Friday window", value: "12:00 – 17:00", note: "respects local norms" },
];

export default function SchedulesPage() {
  return (
    <>
      <PageHeader
        title="Schedules"
        description="Queued broadcasts with the guardrails that keep Woodex welcome in every inbox. Paused items need a human to resume."
      />
      <PageBody>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          <div className="xl:col-span-2 bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-card-line">
              <h2 className="text-sm font-semibold text-foreground">Upcoming sends</h2>
            </div>
            <ul className="divide-y divide-card-divider">
              {QUEUE.map((q) => (
                <li key={q.campaign} className="px-5 py-4 flex items-center gap-x-4">
                  <div className="w-28 shrink-0">
                    <p className="text-xs font-semibold text-foreground">{q.day}</p>
                    <p className="text-[11px] text-muted-foreground-1 wx-num">{q.time} PKT</p>
                  </div>
                  <div className="min-w-0 grow">
                    <p className="truncate text-sm font-medium text-foreground">{q.campaign}</p>
                    <p className="truncate text-xs text-muted-foreground-1">{q.channel} → {q.segment}</p>
                  </div>
                  <span className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${PILL[q.status]}`}>{q.status}</span>
                  <button type="button" className="py-1.5 px-2.5 inline-flex items-center gap-x-1.5 text-xs font-medium rounded-lg border border-border bg-layer text-layer-foreground hover:bg-layer-hover focus:outline-hidden focus:bg-layer-focus">
                    {q.status === "Paused" ? "Resume" : "Hold"}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-card border border-card-line shadow-2xs rounded-xl p-5">
            <h2 className="text-sm font-semibold text-foreground">Guardrails</h2>
            <p className="mt-1 text-xs text-muted-foreground-1">Enforced by the scheduler before every send.</p>
            <ul className="mt-4 space-y-3">
              {GUARDS.map((g) => (
                <li key={g.name} className="rounded-lg border border-layer-line bg-layer p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold text-foreground">{g.name}</p>
                    <span className="grid size-6 place-items-center rounded-md bg-primary/10 text-primary">
                      <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /></svg>
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-bold text-primary wx-num">{g.value}</p>
                  <p className="text-[11px] text-muted-foreground-1">{g.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PageBody>
    </>
  );
}
