import { PageBody, PageHeader } from "@/components/ui/PageHeader";

export const metadata = { title: "Automations" };

const KPIS = [
  { label: "Active automations", value: "9", note: "2 paused for review" },
  { label: "Runs (30d)", value: "1,240", note: "99.1% success" },
  { label: "Human hours saved", value: "38h", note: "est. this month" },
  { label: "Escalations", value: "17", note: "handed to humans correctly" },
];

const RULES = [
  { when: "New lead from WhatsApp", then: "score with AI + assign to sales", runs: 342, ok: "99%", on: true },
  { when: "Quote approved", then: "create contract draft + booking slot", runs: 96, ok: "100%", on: true },
  { when: "Invoice overdue 3d", then: "reminder sequence (2 touches, then owner)", runs: 61, ok: "98%", on: true },
  { when: "Missed call", then: "callback task within 2 business hours", runs: 88, ok: "100%", on: true },
  { when: "Ticket idle 24h", then: "nudge owner + bump priority", runs: 24, ok: "100%", on: true },
  { when: "Site visit confirmed", then: "WhatsApp reminder 18h before", runs: 132, ok: "99%", on: true },
  { when: "Blog published", then: "broadcast teaser to Kitchen interest", runs: 6, ok: "100%", on: false },
];

const RUNS = [
  { when: "11:02", rule: "New lead from WhatsApp", out: "L-1046 scored 7 → sales", ok: true },
  { when: "10:47", rule: "Site visit confirmed", out: "reminder queued for Hina R.", ok: true },
  { when: "09:30", rule: "Invoice overdue 3d", out: "INV-0094 touch 2 sent", ok: true },
  { when: "08:12", rule: "Missed call", out: "escalated — no agent free", ok: false },
];

export default function AutomationsPage() {
  return (
    <>
      <PageHeader
        title="Automations"
        description="The quiet workforce: trigger → action rules with hard escalation paths. Every run is logged in /logs."
        actions={
          <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg bg-primary border border-primary-line text-primary-foreground hover:bg-primary-hover focus:outline-hidden focus:bg-primary-focus">
            New automation
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
          <div className="xl:col-span-2 space-y-4">
            {RULES.map((r, i) => (
              <div key={i} className={`bg-card border border-card-line shadow-2xs rounded-xl p-5 transition-opacity ${r.on ? "" : "opacity-60"}`}>
                <div className="flex items-center gap-x-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" /></svg>
                  </span>
                  <div className="min-w-0 grow">
                    <p className="text-xs text-muted-foreground-1 font-mono truncate">WHEN {r.when}</p>
                    <p className="text-sm font-medium text-foreground">→ {r.then}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-xs font-semibold text-foreground wx-num">{r.runs} runs</p>
                    <p className="text-[11px] text-teal-500 wx-num">{r.ok} ok</p>
                  </div>
                  <span className={`relative inline-flex shrink-0 h-5 w-9 items-center rounded-full ${r.on ? "bg-primary" : "bg-muted"}`}>
                    <span className={`inline-block size-3.5 rounded-full bg-card transform transition-transform ${r.on ? "translate-x-4.5" : "translate-x-1"}`} />
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden self-start">
            <div className="px-5 py-3 border-b border-card-line">
              <h2 className="text-sm font-semibold text-foreground">Recent runs</h2>
            </div>
            <ul className="divide-y divide-card-divider">
              {RUNS.map((x, i) => (
                <li key={i} className="px-5 py-3 flex items-start gap-x-3">
                  <span className={`mt-1 size-2 rounded-full shrink-0 ${x.ok ? "bg-teal-500" : "bg-amber-500"}`} />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-foreground">{x.rule}</p>
                    <p className="text-[11px] text-muted-foreground-1">{x.out}</p>
                  </div>
                  <span className="ms-auto shrink-0 text-[11px] text-muted-foreground-1 wx-num">{x.when}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PageBody>
    </>
  );
}
