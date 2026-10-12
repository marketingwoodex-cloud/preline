import { PageBody, PageHeader } from "@/components/ui/PageHeader";

export const metadata = { title: "Activity" };

type Item = { who: string; action: string; entity?: string; tag: string; when: string };
type Day = { day: string; items: Item[] };

const DAYS: Day[] = [
  {
    day: "Today · Mon 12 Oct",
    items: [
      { who: "Ayesha Khan", action: "replied on WhatsApp thread", entity: "T-1042", tag: "conversations", when: "10:42" },
      { who: "You", action: "drafted quote", entity: "Q-124", tag: "sales", when: "10:51" },
      { who: "Broadcast", action: "sent “Walnut veneer restock” to 233 contacts", tag: "broadcast", when: "10:52" },
      { who: "Sana R.", action: "moved lead to Site visit", entity: "L-1038", tag: "crm", when: "09:58" },
      { who: "System", action: "nightly segment sync completed (6 segments)", tag: "system", when: "06:00" },
    ],
  },
  {
    day: "Yesterday · Sun 11 Oct",
    items: [
      { who: "Bilal Chaudhry", action: "paid invoice", entity: "INV-0097", tag: "sales", when: "18:20" },
      { who: "Owner", action: "approved discount on", entity: "Q-121", tag: "approvals", when: "17:05" },
      { who: "Editor", action: "published city page “Bahria Town kitchens”", entity: "web", tag: "website", when: "15:40" },
      { who: "Omar M.", action: "marked task Completed", entity: "Q-118 site measure", tag: "tasks", when: "13:12" },
      { who: "Telegram bot", action: "captured lead via /quote", entity: "L-1044", tag: "conversations", when: "10:31" },
    ],
  },
  {
    day: "Sat 10 Oct",
    items: [
      { who: "Hina Raza", action: "booked showroom visit for Fri 5pm", tag: "crm", when: "19:22" },
      { who: "System", action: "speed score improved 84 → 87 after image compression", tag: "website", when: "04:10" },
      { who: "You", action: "added 2 files to task", entity: "DHA-6 refit", tag: "tasks", when: "12:44" },
    ],
  },
];

const TAG_CLS: Record<string, string> = {
  sales: "bg-primary/10 text-primary",
  crm: "bg-teal-500/10 text-teal-500",
  conversations: "bg-sky-500/10 text-sky-500",
  broadcast: "bg-secondary/10 text-secondary",
  website: "bg-emerald-500/10 text-emerald-500",
  tasks: "bg-amber-500/10 text-amber-500",
  approvals: "bg-amber-500/10 text-amber-500",
  system: "bg-muted text-muted-foreground",
};

const FILTERS = ["All", "Sales", "CRM", "Conversations", "Broadcast", "Website", "System"];

export default function ActivityPage() {
  return (
    <>
      <PageHeader
        title="Activity"
        description="The full company timeline — every touchpoint across sales, CRM, conversations, broadcasts, website and system jobs."
      />
      <PageBody>
        <div className="flex flex-wrap items-center gap-x-2">
          {FILTERS.map((f, i) => (
            <button key={f} type="button" className={`py-1.5 px-3 inline-flex items-center text-xs font-medium rounded-lg focus:outline-hidden ${i === 0 ? "bg-primary/10 text-primary" : "text-muted-foreground-1 hover:bg-muted-hover"}`}>
              {f}
            </button>
          ))}
          <span className="ms-auto text-xs text-muted-foreground-1">Showing last 3 days · 13 events</span>
        </div>

        <div className="mt-5 space-y-6">
          {DAYS.map((d) => (
            <section key={d.day}>
              <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground-1">{d.day}</h2>
              <div className="mt-3 bg-card border border-card-line shadow-2xs rounded-xl">
                <ul className="divide-y divide-card-divider">
                  {d.items.map((it, i) => (
                    <li key={i} className="px-5 py-3.5 flex items-center gap-x-3">
                      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-surface-5 border border-line-3 text-[10px] font-semibold text-foreground">
                        {it.who.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase()}
                      </span>
                      <p className="min-w-0 grow text-sm text-foreground">
                        <span className="font-medium">{it.who}</span> {it.action}{" "}
                        {it.entity && <span className="font-semibold text-primary">{it.entity}</span>}
                      </p>
                      <span className={`shrink-0 inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${TAG_CLS[it.tag]}`}>{it.tag}</span>
                      <span className="shrink-0 text-[11px] text-muted-foreground-1 wx-num w-14 text-right">{it.when}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ))}
        </div>

        {/* Live collaboration — WebSocket (Batch 3 · fixture — wiring pending) */}
        <div className="mt-5 bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-card-line flex flex-wrap items-center gap-x-3 gap-y-1">
            <h2 className="text-sm font-semibold text-foreground">Live collaboration</h2>
            <span className="inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-[11px] font-semibold bg-teal-500/10 text-teal-500 ring-1 ring-inset ring-teal-500/25">
              <span className="size-1.5 rounded-full bg-teal-500 animate-pulse" /> Connected
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-wide text-primary">Beta</span>
            <span className="ms-auto text-[11px] text-muted-foreground-1">2 teammates online</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-card-divider">
            <div className="p-5">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground-1">Presence</h3>
              <ul className="mt-3 space-y-2">
                {[
                  ["HM", "Hassan Mehmood", "viewing /pipeline", true],
                  ["AK", "Ayesha Khan", "editing Q-2611 on /quotations", true],
                  ["You", "You", "here — /activity", false],
                ].map(([ini, who, what, other]) => (
                  <li key={String(who)} className="flex items-center gap-x-3">
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-surface-5 border border-line-3 text-[10px] font-semibold text-foreground">{ini}</span>
                    <p className="min-w-0 grow text-xs text-foreground"><span className="font-medium">{who}</span> <span className="text-muted-foreground-1">· {what}</span></p>
                    {other && <span className="shrink-0 size-1.5 rounded-full bg-teal-500" />}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-5">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground-1">Live events</h3>
              <ul className="mt-3 space-y-1.5 text-xs">
                {[["11:42", "Ayesha moved “Gulberg Villa” to Negotiation"], ["11:40", "Hassan joined the pipeline board"], ["11:36", "Comment added on Q-2611: “advance 50%”"]].map(([t, e]) => (
                  <li key={t} className="flex items-start gap-x-2.5">
                    <span className="wx-num shrink-0 text-muted-foreground-1">{t}</span>
                    <span className="min-w-0 grow text-foreground">{e}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[11px] text-muted-foreground-1">Socket transport activates with API wiring; presence + events run on fixtures.</p>
            </div>
          </div>
        </div>
      </PageBody>
    </>
  );
}
