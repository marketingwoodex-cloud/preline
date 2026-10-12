import Link from "next/link";
import { PageBody, PageHeader } from "@/components/ui/PageHeader";

export const metadata = { title: "Inbox" };

const KPIS = [
  { label: "Open conversations", value: "14", note: "3 waiting > 1h", tone: "text-foreground" },
  { label: "Median first response", value: "6m", note: "target ≤ 15m", tone: "text-teal-500" },
  { label: "AI answered (30d)", value: "214", note: "68% without human touch", tone: "text-foreground" },
  { label: "Handed to humans", value: "17", note: "complaints + refunds", tone: "text-foreground" },
];

const QUEUE = [
  { who: "Ayesha Khan", channel: "WhatsApp", msg: "Can you send the walnut veneer sample?", wait: "12m", agent: "You", sla: "ok" },
  { who: "Usman Bhatti", channel: "Web chat", msg: "Quote looks good — one change please", wait: "26m", agent: "Sana R.", sla: "ok" },
  { who: "Bilal Chaudhry", channel: "Telegram", msg: "Advance sent via bank transfer ✔", wait: "1h 04m", agent: "Unassigned", sla: "late" },
  { who: "Hina Raza", channel: "WhatsApp", msg: "Showroom visit tomorrow still on?", wait: "1h 31m", agent: "Unassigned", sla: "late" },
  { who: "Fatima Noor", channel: "Web chat", msg: "Need wardrobe quote for 3 rooms", wait: "2h 10m", agent: "You", sla: "late" },
];

const HANDOFFS = [
  { who: "Omar Sheikh", why: "refund request — policy says human", when: "10:22", chats: 6 },
  { who: "R. Qureshi", why: "complaint tone detected · 2nd escalation", when: "09:47", chats: 4 },
  { who: "M. Tariq", why: "asks for price without visit (guardrail)", when: "09:15", chats: 3 },
];

const CH_ICON: Record<string, { cls: string; d: string }> = {
  WhatsApp: { cls: "bg-emerald-500/10 text-emerald-500", d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z" },
  Telegram: { cls: "bg-sky-500/10 text-sky-500", d: "m22 2-7 20-4-9-9-4Z" },
  "Web chat": { cls: "bg-primary/10 text-primary", d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" },
};

export default function ChatPage() {
  return (
    <>
      <PageHeader
        title="Inbox"
        description="Every channel in one queue. The AI agent answers what it can, hands over what it must — and shows its status right here."
        actions={
          <Link href="/threads" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg bg-primary border border-primary-line text-primary-foreground hover:bg-primary-hover focus:outline-hidden focus:bg-primary-focus">
            Open active thread
          </Link>
        }
      />
      <PageBody>
        <div className="grid grid-cols-2 gap-5 xl:grid-cols-4">
          {KPIS.map((k) => (
            <div key={k.label} className="bg-card border border-card-line shadow-2xs rounded-xl p-4">
              <p className="text-xs text-muted-foreground-1">{k.label}</p>
              <p className={`mt-1 text-2xl font-bold wx-num ${k.tone}`}>{k.value}</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground-1">{k.note}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-1 xl:grid-cols-3 gap-5">
          {/* Queue */}
          <div className="xl:col-span-2 bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-card-line flex items-center gap-x-2">
              {["All", "WhatsApp", "Telegram", "Web chat"].map((t, i) => (
                <button key={t} type="button" className={`py-1.5 px-3 inline-flex items-center text-xs font-medium rounded-lg focus:outline-hidden ${i === 0 ? "bg-primary/10 text-primary" : "text-muted-foreground-1 hover:bg-muted-hover"}`}>
                  {t}
                </button>
              ))}
              <span className="ms-auto text-xs text-muted-foreground-1">SLA ≤ 15m</span>
            </div>
            <ul className="divide-y divide-card-divider">
              {QUEUE.map((q) => (
                <li key={q.who}>
                  <Link href="/threads" className="flex items-center gap-x-3 px-5 py-3.5 hover:bg-muted-hover focus:outline-hidden focus:bg-muted-focus">
                    <span className={`grid size-9 shrink-0 place-items-center rounded-lg ${CH_ICON[q.channel].cls}`}>
                      <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={CH_ICON[q.channel].d} /></svg>
                    </span>
                    <span className="min-w-0 grow">
                      <span className="flex items-center gap-2">
                        <span className="truncate text-sm font-medium text-foreground">{q.who}</span>
                        <span className="text-[11px] text-muted-foreground-1">{q.channel}</span>
                      </span>
                      <span className="block truncate text-xs text-muted-foreground-1">{q.msg}</span>
                    </span>
                    <span className="hidden sm:block text-xs text-muted-foreground-1 w-24 truncate">{q.agent}</span>
                    <span className={`shrink-0 inline-flex items-center rounded-md px-1.5 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${q.sla === "late" ? "bg-amber-500/10 text-amber-500 ring-amber-500/25" : "bg-teal-500/10 text-teal-500 ring-teal-500/25"}`}>
                      {q.wait}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* AI agent status + handoffs */}
          <div className="space-y-5">
            <div className="bg-card border border-card-line shadow-2xs rounded-xl p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-foreground">AI agent</h2>
                <span className="inline-flex items-center gap-x-1.5 rounded-full bg-teal-500/10 px-2.5 py-1 text-[11px] font-medium text-teal-500 ring-1 ring-inset ring-teal-500/25">
                  <span className="size-1.5 rounded-full bg-teal-500" /> live
                </span>
              </div>
              <dl className="mt-3 space-y-2 text-xs">
                <div className="flex justify-between rounded-lg border border-layer-line bg-layer px-3 py-2"><dt className="text-muted-foreground-1">Engine</dt><dd className="font-semibold text-foreground">Claude · temp 0.4</dd></div>
                <div className="flex justify-between rounded-lg border border-layer-line bg-layer px-3 py-2"><dt className="text-muted-foreground-1">Chat rules</dt><dd className="font-semibold text-foreground wx-num">42 active</dd></div>
                <div className="flex justify-between rounded-lg border border-layer-line bg-layer px-3 py-2"><dt className="text-muted-foreground-1">Knowledge</dt><dd className="font-semibold text-foreground">site + prices + FAQs</dd></div>
              </dl>
              <p className="mt-3 text-[11px] text-muted-foreground-1">Fallback auto-reply on if the engine is down; status also shows in Threads.</p>
            </div>

            <div className="bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden">
              <div className="px-5 py-3 border-b border-card-line">
                <h2 className="text-sm font-semibold text-foreground">Handoff queue</h2>
              </div>
              <ul className="divide-y divide-card-divider">
                {HANDOFFS.map((h) => (
                  <li key={h.who} className="px-5 py-3">
                    <p className="flex items-center justify-between text-sm font-medium text-foreground">
                      {h.who}
                      <span className="text-[11px] font-normal text-muted-foreground-1 wx-num">{h.when}</span>
                    </p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground-1">{h.why} · {h.chats} messages</p>
                    <button type="button" className="mt-2 py-1.5 px-2.5 text-xs font-medium rounded-lg bg-primary/10 text-primary hover:bg-primary/20 focus:outline-hidden">
                      Take over
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </PageBody>
    </>
  );
}
