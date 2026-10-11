import { PageBody, PageHeader } from "@/components/ui/PageHeader";

export const metadata = { title: "Notifications" };

const MATRIX: Array<{ event: string; inapp: boolean; email: boolean; wa: boolean }> = [
  { event: "New lead created", inapp: true, email: true, wa: true },
  { event: "Quote approved / declined", inapp: true, email: true, wa: true },
  { event: "Payment received", inapp: true, email: true, wa: true },
  { event: "Invoice overdue", inapp: true, email: true, wa: false },
  { event: "SLA about to breach (tickets)", inapp: true, email: false, wa: true },
  { event: "Broadcast finished / paused", inapp: true, email: true, wa: false },
  { event: "Service degraded or down", inapp: true, email: true, wa: true },
  { event: "Failed logins / security", inapp: true, email: true, wa: true },
  { event: "Weekly owner digest", inapp: false, email: true, wa: true },
];

const RECENT = [
  { what: "Payment received — INV-0097 (PKR 23.0L)", via: "WhatsApp + in-app", when: "Yesterday 18:20", read: true },
  { what: "Scheduler degraded: 2 campaigns delayed", via: "WhatsApp + email", when: "Oct 11 22:14", read: true },
  { what: "3 failed logins for admin@woodex.pk", via: "email + in-app", when: "Oct 11 23:47", read: false },
  { what: "Quote Q-121 approved by owner", via: "in-app", when: "Yesterday 17:05", read: false },
  { what: "New lead L-1044 via Telegram /quote", via: "in-app", when: "Yesterday 10:31", read: true },
];

function Dot({ on }: { on: boolean }) {
  return on ? (
    <span className="inline-flex items-center justify-center size-6 rounded-md bg-primary/10 text-primary">
      <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
    </span>
  ) : (
    <span className="inline-flex items-center justify-center size-6 rounded-md bg-muted text-muted-foreground-1">—</span>
  );
}

export default function NotificationsPage() {
  return (
    <>
      <PageHeader
        title="Notifications"
        description="Who hears about what, and on which channel. Security and money events can never be muted."
      />
      <PageBody>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          <div className="xl:col-span-2 bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-card-line">
              <h2 className="text-sm font-semibold text-foreground">Routing matrix</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-card-divider">
                <thead className="bg-surface">
                  <tr>
                    <th scope="col" className="px-4 py-2.5 text-start text-xs font-medium uppercase tracking-wide text-muted-foreground-1">Event</th>
                    <th scope="col" className="px-4 py-2.5 text-center text-xs font-medium uppercase tracking-wide text-muted-foreground-1">In-app</th>
                    <th scope="col" className="px-4 py-2.5 text-center text-xs font-medium uppercase tracking-wide text-muted-foreground-1">Email</th>
                    <th scope="col" className="px-4 py-2.5 text-center text-xs font-medium uppercase tracking-wide text-muted-foreground-1">WhatsApp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-card-divider">
                  {MATRIX.map((m) => (
                    <tr key={m.event} className="transition-colors hover:bg-muted/40">
                      <td className="px-4 py-2.5 text-sm text-foreground">{m.event}</td>
                      <td className="px-4 py-2.5 text-center"><Dot on={m.inapp} /></td>
                      <td className="px-4 py-2.5 text-center"><Dot on={m.email} /></td>
                      <td className="px-4 py-2.5 text-center"><Dot on={m.wa} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden self-start">
            <div className="px-5 py-3 border-b border-card-line flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">Recent</h2>
              <button type="button" className="text-xs font-medium text-primary hover:text-primary-hover focus:outline-hidden">Mark all read</button>
            </div>
            <ul className="divide-y divide-card-divider">
              {RECENT.map((r, i) => (
                <li key={i} className={`px-5 py-3 ${r.read ? "" : "bg-primary/5"}`}>
                  <p className="flex items-start gap-x-2 text-sm text-foreground">
                    {!r.read && <span className="mt-1.5 size-1.5 rounded-full bg-primary shrink-0" />}
                    {r.what}
                  </p>
                  <p className="mt-1 text-[11px] text-muted-foreground-1">{r.via} · {r.when}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PageBody>
    </>
  );
}
