import { PageBody, PageHeader } from "@/components/ui/PageHeader";

export const metadata = { title: "Bookings" };

/** Bookings & Calendar — appointment scheduling and statuses (badge 6 = upcoming). */

const BOOKINGS = [
  { when: "Today · 15:30", what: "Site measure — DHA 6 kitchen", who: "Ayesha Khan", crew: "Measure team A", state: "confirmed" },
  { when: "Today · 17:00", what: "Design review — Bahria Orchard villa", who: "Usman Bhatti", crew: "Design studio", state: "confirmed" },
  { when: "Tomorrow · 11:00", what: "Showroom walkthrough", who: "Hina Raza", crew: "Sales floor", state: "pending" },
  { when: "14 Oct · 16:00", what: "Handover inspection — Model Town", who: "Bilal Chaudhry", crew: "Install crew B", state: "confirmed" },
  { when: "15 Oct · 12:30", what: "Quote presentation — Gulberg office", who: "Sana Malik", crew: "Sales floor", state: "pending" },
  { when: "16 Oct · 10:00", what: "Annual maintenance visit", who: "Lahore Gymkhana", crew: "Maintenance", state: "confirmed" },
  { when: "17 Oct · 14:00", what: "Veneer selection — DHA 5 beds", who: "Omar Sheikh", crew: "Design studio", state: "pending" },
  { when: "18 Oct · 11:30", what: "Site measure — Johar Town wardrobe", who: "Fatima Noor", crew: "Measure team B", state: "pending" },
];

function StatePill({ state }: { state: string }) {
  return state === "confirmed" ? (
    <span className="inline-flex items-center gap-x-1.5 py-1 px-2.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800 dark:bg-teal-500/10 dark:text-teal-500">Confirmed</span>
  ) : (
    <span className="inline-flex items-center gap-x-1.5 py-1 px-2.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">Pending</span>
  );
}

export default function BookingsPage() {
  return (
    <>
      <PageHeader
        title="Bookings & Calendar"
        description="Site measures, design reviews, presentations and handovers — who is going where, and is it confirmed."
        actions={
          <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg bg-primary border border-primary-line text-primary-foreground hover:bg-primary-hover focus:outline-hidden focus:bg-primary-focus">
            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
            New booking
          </button>
        }
      />
      <PageBody>
        <div className="bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-card-line">
            <h2 className="text-sm font-semibold text-foreground">Upcoming appointments</h2>
            <p className="text-sm text-muted-foreground-2">{BOOKINGS.length} bookings this week</p>
          </div>
          <ul className="divide-y divide-card-divider">
            {BOOKINGS.map((b, i) => (
              <li key={i} className="px-6 py-3 flex items-center gap-x-4">
                <span className="wx-num w-32 shrink-0 text-xs text-muted-foreground-1">{b.when}</span>
                <div className="min-w-0 grow">
                  <p className="text-sm font-medium text-foreground truncate">{b.what}</p>
                  <p className="text-xs text-muted-foreground-1 truncate">{b.who} · {b.crew}</p>
                </div>
                <StatePill state={b.state} />
              </li>
            ))}
          </ul>
        </div>
      </PageBody>
    </>
  );
}
