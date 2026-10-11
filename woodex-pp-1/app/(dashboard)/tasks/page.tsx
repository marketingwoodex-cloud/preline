import { PageBody, PageHeader } from "@/components/ui/PageHeader";

export const metadata = { title: "Tasks & Reminders" };

/**
 * Tasks & Reminders — the follow-up worklist (badge 4 in the sidebar = overdue
 * count). Ports the v2.1 reminder rows (leads.followup + invoice reminders).
 */

const TASKS = [
  { id: 1, title: "Call Ayesha Khan — walnut veneer sample feedback", owner: "Bilal Ahmed", due: "Today", state: "overdue" },
  { id: 2, title: "Send revised quote Q-121 (Bahria Orchard, +12 sq ft)", owner: "Bilal Ahmed", due: "Today", state: "overdue" },
  { id: 3, title: "Chase INV-1042 payment (PKR 480,000, 4d late)", owner: "Sana Malik", due: "Today", state: "overdue" },
  { id: 4, title: "Book site measure — Gulberg office fitout", owner: "Support", due: "Tomorrow", state: "overdue" },
  { id: 5, title: "Prepare handover checklist — Model Town duplex", owner: "Hina Raza", due: "14 Oct", state: "open" },
  { id: 6, title: "Upload October site photos to Media Library", owner: "Hina Raza", due: "15 Oct", state: "open" },
  { id: 7, title: "Review GA4 reconnection (automation failing)", owner: "Developer", due: "16 Oct", state: "open" },
  { id: 8, title: "Publish ‘Kitchen trends 2026’ blog post", owner: "Hina Raza", due: "18 Oct", state: "open" },
  { id: 9, title: "Renew SSL wildcard for woodex.pk", owner: "Developer", due: "22 Oct", state: "open" },
  { id: 10, title: "Archive completed DHA 5 project files", owner: "Sana Malik", due: "08 Oct", state: "done" },
];

function Pill({ state }: { state: string }) {
  if (state === "overdue")
    return <span className="inline-flex items-center py-1 px-2.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Overdue</span>;
  if (state === "done")
    return <span className="inline-flex items-center py-1 px-2.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800 dark:bg-teal-500/10 dark:text-teal-500">Done</span>;
  return <span className="inline-flex items-center py-1 px-2.5 rounded-full text-xs font-medium bg-surface text-surface-foreground">Open</span>;
}

export default function TasksPage() {
  const overdue = TASKS.filter((t) => t.state === "overdue").length;
  const open = TASKS.filter((t) => t.state === "open").length;
  const done = TASKS.filter((t) => t.state === "done").length;

  return (
    <>
      <PageHeader
        title="Tasks & Reminders"
        description="Follow-ups, chases and internal to-dos. Overdue items also surface in the header notification inbox."
      />
      <PageBody>
        <div className="bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-card-line flex items-center gap-x-2">
            <h2 className="text-sm font-semibold text-foreground">All tasks</h2>
            <span className="inline-flex items-center py-0.5 px-1.5 rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 text-[11px] font-medium">{overdue} overdue</span>
            <span className="inline-flex items-center py-0.5 px-1.5 rounded-full bg-surface text-surface-foreground text-[11px] font-medium">{open} open</span>
            <span className="inline-flex items-center py-0.5 px-1.5 rounded-full bg-surface text-surface-foreground text-[11px] font-medium">{done} done</span>
          </div>
          <ul className="divide-y divide-card-divider">
            {TASKS.map((t) => (
              <li key={t.id} className="px-6 py-3 flex items-center gap-x-4">
                <input
                  type="checkbox"
                  defaultChecked={t.state === "done"}
                  className="shrink-0 size-4 bg-transparent border-line-3 rounded-sm shadow-2xs text-primary focus:ring-0 focus:ring-offset-0 checked:bg-primary-checked checked:border-primary-checked"
                  aria-label={`Mark “${t.title}” done`}
                />
                <div className="min-w-0 grow">
                  <p className={`text-sm truncate ${t.state === "done" ? "text-muted-foreground-1 line-through" : "font-medium text-foreground"}`}>{t.title}</p>
                  <p className="text-xs text-muted-foreground-1">{t.owner}</p>
                </div>
                <span className="wx-num text-xs text-muted-foreground-1 shrink-0">{t.due}</span>
                <Pill state={t.state} />
              </li>
            ))}
          </ul>
        </div>
      </PageBody>
    </>
  );
}
