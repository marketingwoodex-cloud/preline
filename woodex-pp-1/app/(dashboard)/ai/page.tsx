import { PageBody, PageHeader } from "@/components/ui/PageHeader";

export const metadata = { title: "AI Console" };

const KPIS = [
  { label: "Leads scored (30d)", value: "146", note: "model v4.2" },
  { label: "Replies suggested", value: "312", note: "68% accepted by agents" },
  { label: "False-positive rate", value: "3.1%", note: "score ≥ 8 but lost" },
  { label: "Model spend", value: "PKR 18.4k", note: "month to date" },
];

const SCORED = [
  { lead: "L-1044 · S. Ahmed (Bahria)", score: 9, why: "budget stated · timeline 3 weeks · visited gallery twice" },
  { lead: "L-1042 · Ayesha Khan (DHA)", score: 8, why: "measure booked · sample requested · replies < 1h" },
  { lead: "L-1040 · M. Tariq (Johar Town)", score: 6, why: "price-sensitive · comparing 3 vendors" },
  { lead: "L-1039 · R. Qureshi (Cantt)", score: 4, why: "no reply in 6 days · source: cold list" },
];

const scoreTone = (n: number) => (n >= 8 ? "bg-teal-500/10 text-teal-500 ring-teal-500/25" : n >= 6 ? "bg-amber-500/10 text-amber-500 ring-amber-500/25" : "bg-muted text-muted-foreground ring-border");

const GUARDS = [
  "Never quotes a price without a site visit",
  "No competitor comparisons in replies",
  "Urdu/English mix allowed; honorifics required",
  "Escalates refunds & complaints to a human",
];

export default function AiPage() {
  return (
    <>
      <PageHeader
        title="AI Console"
        description="The assistant that scores leads, drafts replies and drafts first-pass content — always with a human approve step."
        actions={
          <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-teal-500/10 text-teal-500 ring-1 ring-inset ring-teal-500/25">
            <span className="size-1.5 rounded-full bg-teal-500" />
            model v4.2 live
          </span>
        }
      />
      <PageBody>
        <div className="grid grid-cols-2 gap-5 xl:grid-cols-4">
          {KPIS.map((k) => (
            <div key={k.label} className="bg-card border border-card-line shadow-2xs rounded-xl p-4">
              <p className="text-xs text-muted-foreground-1">{k.label}</p>
              <p className="mt-1 text-2xl font-bold text-foreground wx-num">{k.value}</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground-1">{k.note}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-1 xl:grid-cols-3 gap-5">
          <div className="xl:col-span-2 bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-card-line flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">Fresh lead scores</h2>
              <span className="text-xs text-muted-foreground-1">re-scored hourly</span>
            </div>
            <ul className="divide-y divide-card-divider">
              {SCORED.map((s) => (
                <li key={s.lead} className="px-5 py-3.5 flex items-center gap-x-4">
                  <span className={`grid size-9 shrink-0 place-items-center rounded-lg text-sm font-bold ring-1 ring-inset ${scoreTone(s.score)}`}>{s.score}</span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">{s.lead}</p>
                    <p className="truncate text-xs text-muted-foreground-1">{s.why}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-card border border-card-line shadow-2xs rounded-xl p-5">
            <h2 className="text-sm font-semibold text-foreground">Guardrails</h2>
            <p className="mt-1 text-xs text-muted-foreground-1">Hard rules baked into every generation.</p>
            <ul className="mt-4 space-y-2">
              {GUARDS.map((g) => (
                <li key={g} className="flex items-start gap-x-2.5 rounded-lg border border-layer-line bg-layer px-3 py-2">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
                    <svg className="shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /></svg>
                  </span>
                  <span className="text-xs text-foreground">{g}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 border-t border-card-divider pt-3">
              <p className="text-[11px] text-muted-foreground-1">Temperature 0.4 · context: CRM + price book (masked margins) · logs kept 90d</p>
            </div>
          </div>
        </div>
      </PageBody>
    </>
  );
}
