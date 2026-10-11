import { PageBody, PageHeader } from "@/components/ui/PageHeader";

export const metadata = { title: "WhatsApp Hub" };

const STATS = [
  { label: "Messages (30d)", value: "4,212", note: "+11% vs prior" },
  { label: "Opt-in rate", value: "94%", note: "of collected numbers" },
  { label: "Template approvals", value: "9/10", note: "1 pending Meta review" },
  { label: "Session health", value: "99.2%", note: "last 30 days" },
];

const EVENTS = [
  { when: "10:52", kind: "send", text: "Walnut veneer restock → 233 contacts (batch 2/3)" },
  { when: "10:47", kind: "in", text: "Ayesha Khan replied on thread T-1042" },
  { when: "09:15", kind: "sys", text: "Session re-linked automatically after network blip" },
  { when: "08:02", kind: "sys", text: "Daily opt-out sync: 2 new opt-outs applied to segments" },
  { when: "Yesterday", kind: "send", text: "Referral bonus reminder → 96 contacts, 81% read" },
];

const DOT: Record<string, string> = {
  send: "bg-primary",
  in: "bg-emerald-500",
  sys: "bg-muted-foreground-1",
};

export default function WhatsAppPage() {
  return (
    <>
      <PageHeader
        title="WhatsApp Hub"
        description="Business session on +92 300 ••• •214. Broadcasts, templates and session health for the WhatsApp channel."
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

        <div className="mt-5 grid grid-cols-1 xl:grid-cols-3 gap-5">
          <div className="xl:col-span-2 bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-card-line">
              <h2 className="text-sm font-semibold text-foreground">Channel events</h2>
            </div>
            <ul className="divide-y divide-card-divider">
              {EVENTS.map((e, i) => (
                <li key={i} className="px-5 py-3 flex items-center gap-x-3">
                  <span className={`size-2 rounded-full shrink-0 ${DOT[e.kind]}`} />
                  <p className="min-w-0 grow truncate text-sm text-foreground">{e.text}</p>
                  <span className="shrink-0 text-[11px] text-muted-foreground-1 wx-num">{e.when}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-card border border-card-line shadow-2xs rounded-xl p-5">
            <h2 className="text-sm font-semibold text-foreground">Quick replies</h2>
            <p className="mt-1 text-xs text-muted-foreground-1">Shortcuts agents insert with “/”.</p>
            <ul className="mt-4 space-y-2">
              {[
                ["/quote", "Share current quote link + PDF"],
                ["/visit", "Propose 3 site-visit slots"],
                ["/samples", "Offer the sample-kit courier"],
                ["/receipt", "Confirm payment + receipt PDF"],
              ].map(([k, v]) => (
                <li key={k} className="flex items-center gap-x-3 rounded-lg border border-layer-line bg-layer px-3 py-2">
                  <code className="text-xs font-semibold text-primary">{k}</code>
                  <span className="truncate text-xs text-muted-foreground-1">{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Agent training (P29 parity: Q&A pairs, tone, forbidden topics) */}
        <div className="mt-5 bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-card-line flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">Agent training</h2>
            <button type="button" className="py-1.5 px-2.5 inline-flex items-center text-xs font-medium rounded-lg border border-border bg-layer text-layer-foreground hover:bg-layer-hover focus:outline-hidden">
              Add Q&A pair
            </button>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-3 divide-y xl:divide-y-0 xl:divide-x divide-card-divider">
            <div className="p-5">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground-1">Q&A pairs</h3>
              <ul className="mt-3 space-y-2">
                {[
                  ["Do you take payments in installments?", "50% advance, 40% at production, 10% at handover."],
                  ["How long does a kitchen take?", "4–6 weeks after design approval."],
                  ["Is the site visit really free?", "Yes — Lahore-wide, no obligation."],
                ].map(([q, a]) => (
                  <li key={q} className="rounded-lg border border-layer-line bg-layer px-3 py-2">
                    <p className="text-xs font-semibold text-foreground">Q · {q}</p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground-1">A · {a}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-5">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground-1">Tone</h3>
              <div className="mt-3 flex flex-wrap gap-x-1.5 gap-y-1.5">
                {["Respectful (default)", "Warm", "Concise", "Urdu mix"].map((t, i) => (
                  <button key={t} type="button" className={`py-1.5 px-3 inline-flex items-center text-xs font-medium rounded-lg focus:outline-hidden ${i === 0 ? "bg-primary/10 text-primary ring-1 ring-inset ring-primary/25" : "text-muted-foreground-1 hover:bg-muted-hover"}`}>
                    {t}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-[11px] text-muted-foreground-1">Honorifics always; no competitor comparisons; never a fixed price without a visit.</p>
            </div>
            <div className="p-5">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground-1">Must not answer</h3>
              <ul className="mt-3 space-y-1.5">
                {["Supplier margins & cost sheets", "Other clients' quotes or photos", "Legal/tax advice", "Delivery promises outside SLA"].map((t) => (
                  <li key={t} className="flex items-start gap-x-2 text-xs text-foreground">
                    <span className="mt-0.5 size-1.5 rounded-full bg-destructive shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[11px] text-muted-foreground-1">On these the agent hands over to a human and logs the attempt.</p>
            </div>
          </div>
        </div>
      </PageBody>
    </>
  );
}
