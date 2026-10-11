import { PageBody, PageHeader } from "@/components/ui/PageHeader";

export const metadata = { title: "System Health" };

const SERVICES = [
  { name: "woodex.pk (web)", uptime: "99.98%", lat: "180ms", status: "Operational" },
  { name: "Admin (this app)", uptime: "99.95%", lat: "40ms", status: "Operational" },
  { name: "API (copied v2.1)", uptime: "99.90%", lat: "95ms", status: "Operational" },
  { name: "Database", uptime: "99.99%", lat: "8ms", status: "Operational" },
  { name: "WhatsApp session", uptime: "99.20%", lat: "—", status: "Operational" },
  { name: "Telegram bot", uptime: "99.80%", lat: "240ms", status: "Operational" },
  { name: "Scheduler (broadcasts)", uptime: "99.70%", lat: "—", status: "Degraded" },
  { name: "Transactional mail", uptime: "99.60%", lat: "1.2s", status: "Operational" },
];

const PILL: Record<string, string> = {
  Operational: "bg-teal-500/10 text-teal-500 ring-teal-500/25",
  Degraded: "bg-amber-500/10 text-amber-500 ring-amber-500/25",
  Down: "bg-destructive/10 text-destructive ring-destructive/25",
};

const INCIDENTS = [
  { when: "Oct 11 22:14", what: "Scheduler backlog: 2 campaigns delayed 18m", state: "monitoring", note: "queue drained; root cause: worker restart" },
  { when: "Oct 07 03:40", what: "Web latency spike (LCP 4.1s) for 25m", state: "resolved", note: "image origin throttled; CDN failover applied" },
  { when: "Sep 29 14:02", what: "WhatsApp session unlink", state: "resolved", note: "auto re-link in 41s; alert sent to owner" },
];

export default function HealthPage() {
  return (
    <>
      <PageHeader
        title="System Health"
        description="Live status of every service the business runs on. Checks every 60s; alerts to owner WhatsApp on any Degraded/Down."
        actions={
          <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-amber-500/10 text-amber-500 ring-1 ring-inset ring-amber-500/25">
            <span className="size-1.5 rounded-full bg-amber-500" />
            1 degraded
          </span>
        }
      />
      <PageBody>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          <div className="xl:col-span-2 bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-card-line">
              <h2 className="text-sm font-semibold text-foreground">Services</h2>
            </div>
            <ul className="divide-y divide-card-divider">
              {SERVICES.map((s) => (
                <li key={s.name} className="px-5 py-3 flex items-center gap-x-4">
                  <span className={`size-2 rounded-full shrink-0 ${s.status === "Operational" ? "bg-teal-500" : s.status === "Degraded" ? "bg-amber-500" : "bg-destructive"}`} />
                  <p className="min-w-0 grow text-sm font-medium text-foreground">{s.name}</p>
                  <span className="hidden sm:block text-xs text-muted-foreground-1 wx-num w-16 text-right">{s.uptime}</span>
                  <span className="hidden sm:block text-xs text-muted-foreground-1 wx-num w-14 text-right">{s.lat}</span>
                  <span className={`shrink-0 inline-flex items-center rounded-md px-1.5 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${PILL[s.status]}`}>{s.status}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-card-line">
              <h2 className="text-sm font-semibold text-foreground">Incidents (30d)</h2>
            </div>
            <ul className="divide-y divide-card-divider">
              {INCIDENTS.map((i) => (
                <li key={i.when} className="px-5 py-3.5">
                  <p className="text-[11px] text-muted-foreground-1 wx-num">{i.when}</p>
                  <p className="mt-1 text-sm text-foreground">{i.what}</p>
                  <p className="mt-1 flex items-center gap-2 text-[11px] text-muted-foreground-1">
                    <span className={`inline-flex items-center rounded-md px-1.5 py-0.5 font-semibold ${i.state === "resolved" ? "bg-teal-500/10 text-teal-500" : "bg-amber-500/10 text-amber-500"}`}>{i.state}</span>
                    {i.note}
                  </p>
                </li>
              ))}
            </ul>
            <div className="px-5 py-3 border-t border-card-line bg-surface">
              <p className="text-[11px] text-muted-foreground-1">Next maintenance window: Oct 19, 02:00–03:00 PKT.</p>
            </div>
          </div>
        </div>
      </PageBody>
    </>
  );
}
