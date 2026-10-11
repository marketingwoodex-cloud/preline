import { PageBody, PageHeader } from "@/components/ui/PageHeader";

export const metadata = { title: "SEO" };

const KPIS = [
  { label: "Avg. position", value: "11.4", note: "−3.2 in 60 days" },
  { label: "Keywords top-3", value: "24", note: "of 96 tracked" },
  { label: "Indexed pages", value: "41", note: "1 pending discovery" },
  { label: "Agent last scan", value: "74/100", note: "21 issues · Oct 12 04:00" },
];

const KEYWORDS = [
  { kw: "modular kitchen lahore", intent: "Money", pos: 2, vol: "2,900", page: "/ (home)" },
  { kw: "kitchen design dha", intent: "Money", pos: 1, vol: "1,100", page: "/kitchens-dha" },
  { kw: "wardrobe designers gulberg", intent: "Money", pos: 3, vol: "720", page: "/wardrobes-gulberg" },
  { kw: "kitchen price in lahore 2026", intent: "Info", pos: 4, vol: "880", page: "/blog/kitchen-costs" },
  { kw: "bathroom renovation lahore", intent: "Money", pos: 7, vol: "1,600", page: "/bathrooms-model-town" },
  { kw: "office fit out lahore", intent: "Money", pos: 9, vol: "390", page: "/fitouts-johar-town" },
];

const ISSUES = [
  { page: "/gallery", kind: "heavy images", sev: "high", msg: "13 images > 300 KB — run pipeline (est −1.8 MB)", fix: "auto-fix ready" },
  { page: "/bathrooms-model-town", kind: "meta description", sev: "med", msg: "118 chars, missing price hook — AI rewrite drafted", fix: "approve draft" },
  { page: "/blog/eid-collection-2026", kind: "alt text", sev: "med", msg: "6 images without alt — AI drafts ready for review", fix: "approve drafts" },
  { page: "/kitchens-cantt", kind: "title tag", sev: "low", msg: "duplicate of /kitchens-lahore title — uniquify", fix: "auto-fix ready" },
  { page: "/franchise", kind: "noindex", sev: "low", msg: "draft page indexed — add noindex until published", fix: "auto-fix ready" },
];

const SEV: Record<string, string> = {
  high: "bg-destructive/10 text-destructive ring-destructive/25",
  med: "bg-amber-500/10 text-amber-500 ring-amber-500/25",
  low: "bg-muted text-muted-foreground ring-border",
};

const posTone = (n: number) => (n <= 3 ? "text-teal-500" : n <= 10 ? "text-amber-500" : "text-destructive");

export default function SeoPage() {
  return (
    <>
      <PageHeader
        title="SEO"
        description="Rank tracker plus the on-page SEO agent: it scans every page, ranks the problems, drafts fixes for titles, meta and alt text — humans approve, always."
        actions={
          <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg bg-primary border border-primary-line text-primary-foreground hover:bg-primary-hover focus:outline-hidden focus:bg-primary-focus">
            Run scan now
          </button>
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
          {/* Agent */}
          <div className="bg-card border border-card-line shadow-2xs rounded-xl p-5 self-start">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">SEO agent</h2>
              <span className="inline-flex items-center gap-x-1.5 rounded-full bg-teal-500/10 px-2.5 py-1 text-[11px] font-medium text-teal-500 ring-1 ring-inset ring-teal-500/25">
                <span className="size-1.5 rounded-full bg-teal-500" /> weekly scan on
              </span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground-1">
              Edits titles, meta descriptions and alt text only — never page body. Every apply backs the page up first; owner approves.
            </p>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground-1">Engine</p>
            <div className="mt-2 flex flex-wrap gap-x-1.5 gap-y-1.5">
              {["Claude", "OpenAI", "Hermes (OpenRouter)", "Local model"].map((e, i) => (
                <button key={e} type="button" className={`py-1.5 px-3 inline-flex items-center text-xs font-medium rounded-lg focus:outline-hidden ${i === 0 ? "bg-primary/10 text-primary ring-1 ring-inset ring-primary/25" : "text-muted-foreground-1 hover:bg-muted-hover"}`}>
                  {e}
                </button>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 border-t border-card-divider pt-3 text-center">
              <div><p className="text-lg font-bold text-foreground wx-num">147</p><p className="text-[10px] text-muted-foreground-1">pages scanned</p></div>
              <div><p className="text-lg font-bold text-amber-500 wx-num">21</p><p className="text-[10px] text-muted-foreground-1">open issues</p></div>
              <div><p className="text-lg font-bold text-teal-500 wx-num">9</p><p className="text-[10px] text-muted-foreground-1">fixes applied</p></div>
            </div>
          </div>

          {/* Issue queue */}
          <div className="xl:col-span-2 bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-card-line">
              <h2 className="text-sm font-semibold text-foreground">Issue queue — approve to apply</h2>
            </div>
            <ul className="divide-y divide-card-divider">
              {ISSUES.map((i) => (
                <li key={i.page + i.kind} className="px-5 py-3.5 flex items-center gap-x-4">
                  <span className={`shrink-0 inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold ring-1 ring-inset ${SEV[i.sev]}`}>{i.sev}</span>
                  <div className="min-w-0 grow">
                    <p className="text-sm text-foreground"><code className="text-xs text-primary">{i.page}</code> · {i.kind}</p>
                    <p className="truncate text-xs text-muted-foreground-1">{i.msg}</p>
                  </div>
                  <span className="hidden md:block shrink-0 text-[11px] text-teal-500">{i.fix}</span>
                  <div className="flex shrink-0 gap-x-1.5">
                    <button type="button" className="py-1.5 px-2.5 text-xs font-medium rounded-lg bg-teal-500/10 text-teal-500 hover:bg-teal-500/20 focus:outline-hidden">Approve</button>
                    <button type="button" className="py-1.5 px-2.5 text-xs font-medium rounded-lg border border-border bg-layer text-layer-foreground hover:bg-layer-hover focus:outline-hidden">Skip</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Per-page checklist (reuses agent issue data) */}
        <div className="mt-5 bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-card-line flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">Page check — <code className="text-primary">/kitchens-dha</code></h2>
            <span className="text-xs font-bold text-teal-500 wx-num">92/100</span>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 divide-card-divider">
            {[
              ["Title tag", "58 chars · keyword first", true],
              ["Meta description", "142 chars · price hook", true],
              ["Single H1", "“Modular kitchens in DHA”", true],
              ["Image alt text", "12/12 present", true],
              ["Schema", "LocalBusiness + FAQ", true],
              ["Canonical + OG image", "canonical set · OG missing", false],
            ].map(([k, v, ok]) => (
              <li key={String(k)} className="flex items-center gap-x-3 px-5 py-3">
                <span className={`grid size-6 shrink-0 place-items-center rounded-full ${ok ? "bg-teal-500/10 text-teal-500" : "bg-amber-500/10 text-amber-500"}`}>
                  <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">{ok ? <path d="M20 6 9 17l-5-5" /> : <path d="M12 8v5M12 16h.01" />}</svg>
                </span>
                <p className="text-sm text-foreground">{k}</p>
                <p className="ms-auto text-[11px] text-muted-foreground-1">{v}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Keywords */}
        <div className="mt-5 bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-card-line flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">Tracked keywords</h2>
            <span className="text-xs text-muted-foreground-1">updated 2026-10-12 05:00</span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-card-divider">
              <thead className="bg-surface">
                <tr>
                  {["Keyword", "Intent", "Position", "Volume/mo", "Landing page"].map((h) => (
                    <th key={h} scope="col" className="px-4 py-2.5 text-start text-xs font-medium uppercase tracking-wide text-muted-foreground-1">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-card-divider">
                {KEYWORDS.map((k) => (
                  <tr key={k.kw} className="transition-colors hover:bg-muted/40">
                    <td className="px-4 py-2.5 font-medium text-foreground">{k.kw}</td>
                    <td className="px-4 py-2.5">
                      <span className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[11px] font-semibold ${k.intent === "Money" ? "bg-teal-500/10 text-teal-500" : k.intent === "Brand" ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"}`}>{k.intent}</span>
                    </td>
                    <td className={`px-4 py-2.5 font-bold wx-num ${posTone(k.pos)}`}>#{k.pos}</td>
                    <td className="wx-num px-4 py-2.5 text-muted-foreground">{k.vol}</td>
                    <td className="px-4 py-2.5"><code className="text-xs text-primary">{k.page}</code></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </PageBody>
    </>
  );
}
