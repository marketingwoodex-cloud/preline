import { PageBody, PageHeader } from "@/components/ui/PageHeader";

export const metadata = { title: "Sales & Tracking" };

/**
 * Sales & Tracking board — the five tracking views from the P19 directive:
 *   1. Leads & Pipeline        (visual stage tracker)
 *   2. Bookings & Calendar     (appointments + statuses)
 *   3. Clients & Accounts      (CRM profile roll-up)
 *   4. Activity & Follow-ups   (interaction history)
 *   5. Lost / Won Analytics    (close-rate performance)
 */

const KPIS = [
  { label: "Leads this month", value: "214", trend: "+12.4%", up: true },
  { label: "Win rate", value: "38%", trend: "+4.1%", up: true },
  { label: "Avg deal size", value: "PKR 845k", trend: "+6.8%", up: true },
  { label: "Lost deals", value: "23", trend: "-9.2%", up: false },
];

const STAGES = [
  { name: "New lead", n: 64, color: "bg-primary" },
  { name: "Qualified", n: 41, color: "bg-primary/80" },
  { name: "Site visit", n: 27, color: "bg-primary/60" },
  { name: "Quoted", n: 33, color: "bg-primary/50" },
  { name: "Negotiation", n: 18, color: "bg-primary/40" },
  { name: "Won", n: 19, color: "bg-teal-500" },
  { name: "Lost", n: 23, color: "bg-red-500" },
];
const maxStage = Math.max(...STAGES.map((s) => s.n));

const BOOKINGS = [
  { when: "Today · 15:30", what: "Site measure — DHA 6 kitchen", who: "Ayesha Khan", state: "confirmed" },
  { when: "Today · 17:00", what: "Design review — Bahria Orchard villa", who: "Usman Bhatti", state: "confirmed" },
  { when: "Tomorrow · 11:00", what: "Showroom walkthrough", who: "Hina Raza", state: "pending" },
  { when: "14 Oct · 16:00", what: "Handover inspection — Model Town", who: "Bilal Chaudhry", state: "confirmed" },
  { when: "15 Oct · 12:30", what: "Quote presentation — Gulberg office", who: "Sana Malik", state: "pending" },
  { when: "16 Oct · 10:00", what: "Annual maintenance visit", who: "Lahore Gymkhana", state: "confirmed" },
];

const FOLLOWUPS = [
  { who: "Ayesha Khan", note: "Called — asked for walnut veneer sample; courier sent", when: "2 h ago" },
  { who: "Bilal Chaudhry", note: "WhatsApp — approved elevation, awaiting advance", when: "5 h ago" },
  { who: "Usman Bhatti", note: "Site visit done — quote to be revised (+12 sq ft)", when: "Yesterday" },
  { who: "Hina Raza", note: "Email — comparing two vendors; follow up Friday", when: "2 d ago" },
  { who: "Sana Malik", note: "Meeting rescheduled to 15 Oct", when: "3 d ago" },
];

const WONLOST = [
  { month: "Jul", won: 12, lost: 27 },
  { month: "Aug", won: 15, lost: 25 },
  { month: "Sep", won: 17, lost: 24 },
  { month: "Oct", won: 19, lost: 23 },
];
const maxWl = Math.max(...WONLOST.map((m) => m.won + m.lost));

function StatePill({ state }: { state: string }) {
  return state === "confirmed" ? (
    <span className="inline-flex items-center gap-x-1.5 py-1 px-2.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800 dark:bg-teal-500/10 dark:text-teal-500">Confirmed</span>
  ) : (
    <span className="inline-flex items-center gap-x-1.5 py-1 px-2.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">Pending</span>
  );
}

export default function SalesTrackingPage() {
  return (
    <>
      <PageHeader
        title="Sales & Tracking"
        description="Pipeline tracker, bookings, client roll-up, follow-up history and lost/won close-rate analytics."
      />
      <PageBody className="space-y-5">
        {/* KPI strip — joined cells, KPI-grid block pattern */}
        <div className="grid grid-cols-2 md:grid-cols-4 bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden">
          {KPIS.map((c, i) => (
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
          {/* 1. Leads & Pipeline — visual stage tracker */}
          <div className="xl:col-span-2 bg-card border border-card-line shadow-2xs rounded-xl p-4 sm:p-6">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h2 className="text-sm font-semibold text-foreground">Leads &amp; Pipeline</h2>
                <p className="text-sm text-muted-foreground-2">Live stage distribution — full board on Pipeline</p>
              </div>
              <a href="/pipeline" className="text-xs font-semibold text-primary hover:underline">Open pipeline</a>
            </div>
            <div className="mt-4 space-y-3">
              {STAGES.map((s) => (
                <div key={s.name} className="flex items-center gap-x-3">
                  <span className="w-24 shrink-0 text-sm text-muted-foreground-1 truncate">{s.name}</span>
                  <div className="h-5 grow overflow-hidden rounded-md bg-muted">
                    <div className={`h-full rounded-md ${s.color} transition-[width] duration-500`} style={{ width: `${(s.n / maxStage) * 100}%` }} />
                  </div>
                  <span className="wx-num w-8 text-end text-sm font-semibold text-foreground">{s.n}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Lost / Won Analytics */}
          <div className="bg-card border border-card-line shadow-2xs rounded-xl p-4 sm:p-6">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h2 className="text-sm font-semibold text-foreground">Lost / Won Analytics</h2>
                <p className="text-sm text-muted-foreground-2">Close-rate trend, last 4 months</p>
              </div>
            </div>
            <div className="mt-4 flex items-end gap-x-3 h-40">
              {WONLOST.map((m) => {
                const total = m.won + m.lost;
                return (
                  <div key={m.month} className="flex-1 flex flex-col items-center gap-y-1">
                    <div className="w-full flex flex-col-reverse" style={{ height: `${(total / maxWl) * 100}%` }}>
                      <div className="w-full rounded-t-md bg-teal-500" style={{ height: `${(m.won / total) * 100}%` }} title={`Won ${m.won}`} />
                      <div className="w-full rounded-b-md bg-red-500/80" style={{ height: `${(m.lost / total) * 100}%` }} title={`Lost ${m.lost}`} />
                    </div>
                    <span className="text-xs text-muted-foreground-1">{m.month}</span>
                    <span className="wx-num text-xs font-semibold text-foreground">{Math.round((m.won / total) * 100)}%</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 flex items-center gap-x-4 text-xs text-muted-foreground-1">
              <span className="flex items-center gap-x-1.5"><span className="size-2 rounded-full bg-teal-500" />Won</span>
              <span className="flex items-center gap-x-1.5"><span className="size-2 rounded-full bg-red-500/80" />Lost</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          {/* 2. Bookings & Calendar */}
          <div className="bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-card-line flex items-center justify-between gap-2">
              <div>
                <h2 className="text-sm font-semibold text-foreground">Bookings &amp; Calendar</h2>
                <p className="text-sm text-muted-foreground-2">Appointments and statuses</p>
              </div>
              <a href="/bookings" className="text-xs font-semibold text-primary hover:underline">Calendar</a>
            </div>
            <ul className="divide-y divide-card-divider">
              {BOOKINGS.map((b, i) => (
                <li key={i} className="px-6 py-3 flex items-center gap-x-3">
                  <span className="wx-num w-32 shrink-0 text-xs text-muted-foreground-1">{b.when}</span>
                  <div className="min-w-0 grow">
                    <p className="text-sm font-medium text-foreground truncate">{b.what}</p>
                    <p className="text-xs text-muted-foreground-1 truncate">{b.who}</p>
                  </div>
                  <StatePill state={b.state} />
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Activity & Follow-ups */}
          <div className="bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-card-line flex items-center justify-between gap-2">
              <div>
                <h2 className="text-sm font-semibold text-foreground">Activity &amp; Follow-ups</h2>
                <p className="text-sm text-muted-foreground-2">Interaction history with leads</p>
              </div>
              <a href="/activity" className="text-xs font-semibold text-primary hover:underline">Full log</a>
            </div>
            <ul className="divide-y divide-card-divider">
              {FOLLOWUPS.map((f, i) => (
                <li key={i} className="px-6 py-3 flex items-start gap-x-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-surface-5 border border-line-3 text-xs font-semibold text-foreground">
                    {f.who.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                  </span>
                  <div className="min-w-0 grow">
                    <p className="text-sm font-medium text-foreground truncate">{f.who}</p>
                    <p className="text-xs text-muted-foreground-1">{f.note}</p>
                  </div>
                  <span className="text-xs text-muted-foreground-1 shrink-0">{f.when}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 3. Clients & Accounts roll-up */}
        <div className="bg-card border border-card-line shadow-2xs rounded-xl px-6 py-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-foreground">Clients &amp; Accounts</h2>
            <p className="text-sm text-muted-foreground-2">128 client records · enquiries, chats, quotes, invoices and payments matched on phone + email</p>
          </div>
          <a href="/clients" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg bg-primary border border-primary-line text-primary-foreground hover:bg-primary-hover focus:outline-hidden focus:bg-primary-focus">
            Open Clients
            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </a>
        </div>
      </PageBody>
    </>
  );
}
