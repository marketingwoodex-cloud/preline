import { PageBody, PageHeader } from "@/components/ui/PageHeader";

export const metadata = { title: "Automations" };

/**
 * Automations master dashboard — the control room for every automation in the
 * suite (Intelligence group). Shows what is running, what is paused/failed,
 * per-automation health (last run, success rate, trigger, channel) and a live
 * execution log. Data shape mirrors the v2.1 `automations` JSON store
 * (_private/automations.json), so wiring it to
 * `/api/admin.php?action=automations_list` is the only change needed to go live.
 */

type AutomationStatus = "running" | "paused" | "failed";

interface Automation {
  name: string;
  trigger: string;
  channel: string;
  status: AutomationStatus;
  lastRun: string;
  runsToday: number;
  success: number; // 0..100
  note: string;
}

const AUTOMATIONS: Automation[] = [
  { name: "WhatsApp lead intake", trigger: "New WhatsApp message", channel: "WhatsApp Cloud API", status: "running", lastRun: "2 min ago", runsToday: 214, success: 99.5, note: "Creates lead + assigns source" },
  { name: "Telegram bot sync", trigger: "Bot command / webhook", channel: "Telegram @WoodexInteriorBot", status: "running", lastRun: "6 min ago", runsToday: 96, success: 98.1, note: "Polling fallback active" },
  { name: "Quote follow-up reminder", trigger: "Quote idle 48h", channel: "Email + WhatsApp", status: "running", lastRun: "1 h ago", runsToday: 18, success: 100, note: "Nudges sales owner" },
  { name: "Invoice overdue reminder", trigger: "Invoice past due", channel: "Email", status: "running", lastRun: "3 h ago", runsToday: 7, success: 100, note: "INV-1042 queued tonight" },
  { name: "Receipt generation", trigger: "Payment recorded", channel: "Internal", status: "running", lastRun: "5 h ago", runsToday: 12, success: 100, note: "Receipts Vault entries" },
  { name: "AI reply suggestions", trigger: "Inbox thread opened", channel: "Claude", status: "running", lastRun: "12 min ago", runsToday: 64, success: 96.9, note: "Spend limit PKR 25,000/mo" },
  { name: "Lead scoring", trigger: "Lead created/updated", channel: "Internal", status: "running", lastRun: "2 min ago", runsToday: 187, success: 99.2, note: "Feeds pipeline priority" },
  { name: "SEO audit (weekly)", trigger: "Cron — Monday 06:00", channel: "Internal", status: "running", lastRun: "4 d ago", runsToday: 0, success: 97.4, note: "Writes to SEO Ops" },
  { name: "Media compressor", trigger: "Media upload", channel: "Internal", status: "running", lastRun: "40 min ago", runsToday: 23, success: 99.0, note: "Heavy-image fixer" },
  { name: "Nightly backup", trigger: "Cron — daily 02:00", channel: "Hostinger", status: "running", lastRun: "9 h ago", runsToday: 1, success: 100, note: "_private/ + DB dump" },
  { name: "Client update digest", trigger: "Project milestone", channel: "Email", status: "paused", lastRun: "2 w ago", runsToday: 0, success: 94.2, note: "Paused — template redesign" },
  { name: "Abandoned quote nudge", trigger: "Quote viewed, no reply 7d", channel: "WhatsApp", status: "paused", lastRun: "5 d ago", runsToday: 0, success: 91.0, note: "Paused — awaiting approval copy" },
  { name: "Google Analytics pull", trigger: "Cron — every 15 min", channel: "GA4", status: "failed", lastRun: "14 min ago", runsToday: 41, success: 62.5, note: "OAuth token expired — reconnect" },
  { name: "Search Console sync", trigger: "Cron — daily", channel: "Google", status: "failed", lastRun: "—", runsToday: 0, success: 0, note: "Not connected yet" },
];

const RUNS = [
  { time: "10:42", name: "WhatsApp lead intake", detail: "Lead “Kitchen refit — DHA 6” created from +92 3xx", status: "success", ms: 340 },
  { time: "10:38", name: "AI reply suggestions", detail: "Suggested 2 replies for thread #812", status: "success", ms: 1820 },
  { time: "10:31", name: "Google Analytics pull", detail: "401 unauthorized — token expired", status: "failed", ms: 210 },
  { time: "10:27", name: "Lead scoring", detail: "Re-scored 3 leads (top: Bahria Orchard)", status: "success", ms: 90 },
  { time: "10:15", name: "Media compressor", detail: "Compressed 4 uploads (−1.8 MB)", status: "success", ms: 2400 },
  { time: "10:02", name: "WhatsApp lead intake", detail: "Lead “Office fitout — Gulberg” created", status: "success", ms: 310 },
];

function StatusPill({ status }: { status: AutomationStatus }) {
  if (status === "running")
    return (
      <span className="inline-flex items-center gap-x-1.5 py-1 px-2.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800 dark:bg-teal-500/10 dark:text-teal-500">
        <span className="size-1.5 rounded-full bg-teal-500 animate-pulse" />
        Running
      </span>
    );
  if (status === "paused")
    return (
      <span className="inline-flex items-center gap-x-1.5 py-1 px-2.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
        Paused
      </span>
    );
  return (
    <span className="inline-flex items-center gap-x-1.5 py-1 px-2.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
      Failed
    </span>
  );
}

export default function AutomationsPage() {
  const running = AUTOMATIONS.filter((a) => a.status === "running").length;
  const paused = AUTOMATIONS.filter((a) => a.status === "paused").length;
  const failed = AUTOMATIONS.filter((a) => a.status === "failed").length;
  const runsToday = AUTOMATIONS.reduce((s, a) => s + a.runsToday, 0);

  return (
    <>
      <PageHeader
        title="Automations — master dashboard"
        description="Every automation in the suite: status, trigger, last run and success rate. The Automation role lives here."
      />
      <PageBody className="space-y-5">
        {/* Status strip — joined cells, KPI-grid block pattern */}
        <div className="grid grid-cols-2 md:grid-cols-4 bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden">
          {[
            { label: "Running", value: String(running), tone: "text-teal-600 dark:text-teal-500" },
            { label: "Paused", value: String(paused), tone: "text-orange-600 dark:text-orange-400" },
            { label: "Failed", value: String(failed), tone: "text-red-600 dark:text-red-400" },
            { label: "Executions today", value: runsToday.toLocaleString("en-US"), tone: "text-primary" },
          ].map((c, i) => (
            <div key={c.label} className={`p-4 sm:p-6 text-center border-card-divider ${i < 3 ? "border-e" : ""} ${i < 2 ? "border-b md:border-b-0" : ""}`}>
              <div className={`text-xl sm:text-2xl lg:text-3xl font-semibold ${c.tone}`}>{c.value}</div>
              <div className="mt-1 text-sm text-muted-foreground-1">{c.label}</div>
            </div>
          ))}
        </div>

        {/* Automation registry */}
        <div className="bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-card-line flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-semibold text-foreground">Automation registry</h2>
              <p className="text-sm text-muted-foreground-2">{AUTOMATIONS.length} automations · triggers, channels and health</p>
            </div>
            <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg bg-primary border border-primary-line text-primary-foreground hover:bg-primary-hover focus:outline-hidden focus:bg-primary-focus">
              <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
              New automation
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-table-line">
              <thead className="bg-muted">
                <tr>
                  {["Automation", "Trigger", "Channel", "Status", "Last run", "Today", "Success rate", ""].map((h) => (
                    <th key={h} scope="col" className="px-6 py-3 text-start text-xs font-semibold uppercase text-foreground whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-table-line">
                {AUTOMATIONS.map((a) => (
                  <tr key={a.name} className="bg-layer hover:bg-layer-hover">
                    <td className="px-6 py-3">
                      <p className="text-sm font-medium text-foreground whitespace-nowrap">{a.name}</p>
                      <p className="text-xs text-muted-foreground-1">{a.note}</p>
                    </td>
                    <td className="px-6 py-3 text-sm text-muted-foreground-1 whitespace-nowrap">{a.trigger}</td>
                    <td className="px-6 py-3 text-sm text-muted-foreground-1 whitespace-nowrap">{a.channel}</td>
                    <td className="px-6 py-3"><StatusPill status={a.status} /></td>
                    <td className="px-6 py-3 text-sm text-muted-foreground-1 whitespace-nowrap">{a.lastRun}</td>
                    <td className="px-6 py-3 text-sm text-foreground whitespace-nowrap">{a.runsToday}</td>
                    <td className="px-6 py-3 min-w-40">
                      <div className="flex items-center gap-x-2">
                        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted">
                          <div
                            className={`h-full rounded-full ${a.success >= 95 ? "bg-teal-500" : a.success >= 80 ? "bg-orange-500" : "bg-red-500"}`}
                            style={{ width: `${a.success}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground-1">{a.success.toFixed(1)}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-end whitespace-nowrap">
                      <button type="button" className="py-1 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium rounded-lg border border-layer-line bg-layer text-layer-foreground shadow-2xs hover:bg-layer-hover focus:outline-hidden focus:bg-layer-focus">
                        {a.status === "paused" ? "Resume" : a.status === "failed" ? "Retry" : "Pause"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-table-line">
            <p className="text-sm text-muted-foreground-2"><span className="font-semibold text-foreground">{AUTOMATIONS.length}</span> results</p>
          </div>
        </div>

        {/* Execution tracker */}
        <div className="bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-card-line">
            <h2 className="text-sm font-semibold text-foreground">Execution tracker</h2>
            <p className="text-sm text-muted-foreground-2">Latest runs across all automations</p>
          </div>
          <ul className="divide-y divide-card-divider">
            {RUNS.map((r, i) => (
              <li key={`${r.time}-${i}`} className="px-6 py-3 flex items-center gap-x-4">
                <span className="wx-num text-xs text-muted-foreground-1 w-10 shrink-0">{r.time}</span>
                <span className={`grid size-7 shrink-0 place-items-center rounded-full ${r.status === "success" ? "bg-teal-100 text-teal-800 dark:bg-teal-500/10 dark:text-teal-500" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"}`}>
                  {r.status === "success" ? (
                    <svg className="size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                  ) : (
                    <svg className="size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
                  )}
                </span>
                <div className="min-w-0 grow">
                  <p className="text-sm font-medium text-foreground truncate">{r.name}</p>
                  <p className="text-xs text-muted-foreground-1 truncate">{r.detail}</p>
                </div>
                <span className="wx-num text-xs text-muted-foreground-1 shrink-0">{r.ms} ms</span>
              </li>
            ))}
          </ul>
        </div>
      </PageBody>
    </>
  );
}
