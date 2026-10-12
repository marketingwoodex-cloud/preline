import Link from "next/link";
import { PageBody, PageHeader } from "@/components/ui/PageHeader";

export const metadata = { title: "Threads" };

/**
 * Threads — unified conversation inbox (WhatsApp, Telegram, web chat).
 * Two-pane: thread list + active thread with message bubbles and inline
 * timeline events ("Lead created from WhatsApp"), composer at the bottom.
 * Mirrors the v2.1 chat stores (_private/chat-*.json); API wire-up is scoped.
 */

const THREADS = [
  { who: "Ayesha Khan", last: "Can you send the walnut veneer sample?", when: "10:42", unread: 2, active: true },
  { who: "Usman Bhatti", last: "Quote looks good — one change please", when: "09:58", unread: 1, active: false },
  { who: "Hina Raza", last: "Showroom visit tomorrow still on?", when: "09:12", unread: 0, active: false },
  { who: "Bilal Chaudhry", last: "Advance sent via bank transfer ✔", when: "Yesterday", unread: 0, active: false },
  { who: "Fatima Noor", last: "Need wardrobe quote for 3 rooms", when: "Yesterday", unread: 0, active: false },
  { who: "Omar Sheikh", last: "Thanks, will confirm on Friday", when: "Mon", unread: 0, active: false },
];

const MESSAGES: Array<
  | { kind: "in" | "out"; text: string; when: string }
  | { kind: "event"; text: string; when: string }
> = [
  { kind: "event", text: "Lead created from WhatsApp · +92 300 ••• •214", when: "Mon 14:02" },
  { kind: "in", text: "Assalam o alaikum! I saw your kitchen work on Instagram. Do you take DHA projects?", when: "Mon 14:03" },
  { kind: "out", text: "Walaikum assalam Ayesha — yes, DHA is our main area. Site measure is free this month.", when: "Mon 14:07" },
  { kind: "in", text: "Great. Can you send the walnut veneer sample?", when: "Today 10:42" },
  { kind: "event", text: "AI suggested 2 replies · automation lead-scoring set to 8/10", when: "Today 10:42" },
  { kind: "out", text: "Sample couriered today — tracking TCS-118842. Quote Q-124 follows after Thursday's measure.", when: "Today 10:51" },
];

export default function ThreadsPage() {
  return (
    <>
      <PageHeader
        title="Threads"
        description="Every conversation across WhatsApp, Telegram and web chat — one inbox, with the CRM timeline inside each thread."
      />
      <PageBody>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Thread list */}
          <div className="bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-card-line">
              <h2 className="text-sm font-semibold text-foreground">Inbox</h2>
            </div>
            <ul className="divide-y divide-card-divider">
              {THREADS.map((t) => (
                <li key={t.who}>
                  <Link
                    href="/threads"
                    className={`flex items-center gap-x-3 px-5 py-3 hover:bg-muted-hover focus:outline-hidden focus:bg-muted-focus ${t.active ? "bg-muted" : ""}`}
                    aria-current={t.active ? "true" : undefined}
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface-5 border border-line-3 text-xs font-semibold text-foreground">
                      {t.who.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                    </span>
                    <span className="min-w-0 grow">
                      <span className="flex items-center justify-between gap-2">
                        <span className="truncate text-sm font-medium text-foreground">{t.who}</span>
                        <span className="shrink-0 text-[10px] text-muted-foreground-1">{t.when}</span>
                      </span>
                      <span className="block truncate text-xs text-muted-foreground-1">{t.last}</span>
                    </span>
                    {t.unread > 0 && (
                      <span className="shrink-0 inline-flex items-center justify-center size-5 rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                        {t.unread}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Active thread */}
          <div className="lg:col-span-2 bg-card border border-card-line shadow-2xs rounded-xl flex flex-col">
            <div className="px-5 py-3 border-b border-card-line flex items-center gap-x-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface-5 border border-line-3 text-xs font-semibold text-foreground">AK</span>
              <div className="min-w-0 grow">
                <p className="text-sm font-semibold text-foreground">Ayesha Khan</p>
                <p className="text-xs text-muted-foreground-1">WhatsApp · lead L-1042 · quote Q-124 drafting</p>
              </div>
              <span className="inline-flex items-center gap-x-1.5 py-1 px-2.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800 dark:bg-teal-500/10 dark:text-teal-500">
                <span className="size-1.5 rounded-full bg-teal-500" />
                Online
              </span>
            </div>

            {/* Messages */}
            <div className="p-5 space-y-4">
              {MESSAGES.map((m, i) =>
                m.kind === "event" ? (
                  <p key={i} className="text-center text-[11px] text-muted-foreground-1">
                    <span className="inline-flex items-center gap-x-1.5 py-1 px-2.5 rounded-full bg-surface text-surface-foreground">
                      {m.text} · {m.when}
                    </span>
                  </p>
                ) : (
                  <div key={i} className={`flex ${m.kind === "out" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-xl px-4 py-2.5 text-sm shadow-2xs ${
                        m.kind === "out"
                          ? "bg-primary text-primary-foreground rounded-ee-none"
                          : "bg-layer border border-layer-line text-layer-foreground rounded-ss-none"
                      }`}
                    >
                      <p>{m.text}</p>
                      <p className={`mt-1 text-[10px] ${m.kind === "out" ? "text-primary-foreground/70" : "text-muted-foreground-1"}`}>{m.when}</p>
                    </div>
                  </div>
                ),
              )}
            </div>

            {/* Composer */}
            <div className="px-5 py-3 border-t border-card-line flex items-center gap-x-2">
              <input
                className="py-2 px-3 block w-full bg-layer border border-layer-line text-sm rounded-lg placeholder:text-muted-foreground-1 focus:border-border focus:ring-border disabled:opacity-50 disabled:pointer-events-none"
                placeholder="Write a reply…"
                aria-label="Write a reply"
              />
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg bg-primary border border-primary-line text-primary-foreground hover:bg-primary-hover focus:outline-hidden focus:bg-primary-focus"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </PageBody>
    </>
  );
}
