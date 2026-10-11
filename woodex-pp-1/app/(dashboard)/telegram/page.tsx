import { PageBody, PageHeader } from "@/components/ui/PageHeader";

export const metadata = { title: "Telegram Bot" };

const STATS = [
  { label: "Subscribers", value: "1,864", note: "+142 this month" },
  { label: "Messages (30d)", value: "9,420", note: "bot + broadcasts" },
  { label: "Lead captures", value: "37", note: "via /quote command" },
  { label: "Webhook latency", value: "240ms", note: "p95, last 24h" },
];

const COMMANDS = [
  { cmd: "/start", desc: "Welcome + opt-in consent (PKT language)", uses: 142 },
  { cmd: "/quote", desc: "Start a quote request → creates CRM lead", uses: 37 },
  { cmd: "/visit", desc: "Book a free site visit slot", uses: 29 },
  { cmd: "/gallery", desc: "Latest project photos by room", uses: 210 },
  { cmd: "/support", desc: "Hand over to human inbox", uses: 18 },
];

const EVENTS = [
  { when: "11:02", text: "Broadcast “Eid collection teaser” delivered to 1,812 subscribers" },
  { when: "10:31", text: "New /quote lead: S. Ahmed (Bahria Town) → routed to sales" },
  { when: "09:44", text: "Webhook certificate auto-renewed" },
  { when: "Yesterday", text: "Bot token rotated; old token revoked" },
];

export default function TelegramPage() {
  return (
    <>
      <PageHeader
        title="Telegram Bot"
        description="@WoodexInteriorBot console — commands, broadcasts and webhook health. Bot credentials are stored masked and rotated monthly."
        actions={
          <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-teal-500/10 text-teal-500 ring-1 ring-inset ring-teal-500/25">
            <span className="size-1.5 rounded-full bg-teal-500" />
            Connected
          </span>
        }
      />
      <PageBody>
        <div className="grid grid-cols-2 gap-5 xl:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-card border border-card-line shadow-2xs rounded-xl p-4">
              <p className="text-xs text-muted-foreground-1">{s.label}</p>
              <p className="mt-1 text-2xl font-bold text-foreground wx-num">{s.value}</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground-1">{s.note}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-1 xl:grid-cols-2 gap-5">
          <div className="bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-card-line flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">Commands</h2>
              <button type="button" className="py-1.5 px-2.5 inline-flex items-center text-xs font-medium rounded-lg border border-border bg-layer text-layer-foreground hover:bg-layer-hover focus:outline-hidden focus:bg-layer-focus">
                Add command
              </button>
            </div>
            <ul className="divide-y divide-card-divider">
              {COMMANDS.map((c) => (
                <li key={c.cmd} className="px-5 py-3 flex items-center gap-x-3">
                  <code className="shrink-0 text-xs font-semibold text-primary w-20">{c.cmd}</code>
                  <p className="min-w-0 grow truncate text-xs text-muted-foreground-1">{c.desc}</p>
                  <span className="shrink-0 text-[11px] text-muted-foreground-1 wx-num">{c.uses}×/mo</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-card-line">
              <h2 className="text-sm font-semibold text-foreground">Bot events</h2>
            </div>
            <ul className="divide-y divide-card-divider">
              {EVENTS.map((e, i) => (
                <li key={i} className="px-5 py-3 flex items-center gap-x-3">
                  <span className="size-2 rounded-full shrink-0 bg-sky-500" />
                  <p className="min-w-0 grow text-sm text-foreground">{e.text}</p>
                  <span className="shrink-0 text-[11px] text-muted-foreground-1 wx-num">{e.when}</span>
                </li>
              ))}
            </ul>
            <div className="px-5 py-3 border-t border-card-line bg-surface">
              <p className="text-[11px] text-muted-foreground-1">
                Webhook: <code className="text-primary">https://api.woodex.pk/tg/hook</code> · secret masked · retries exponential
              </p>
            </div>
          </div>
        </div>
      </PageBody>
    </>
  );
}
