import { PageBody, PageHeader } from "@/components/ui/PageHeader";

export const metadata = { title: "Offer Engine" };

const RULES = [
  { when: "IF lead score ≥ 8 AND service = kitchen", then: "Free 3D walkthrough with site visit", prio: 1, hits: 34, conv: "41%", on: true },
  { when: "IF source = Instagram AND area = DHA", then: "DHA portfolio PDF + past-client referral", prio: 2, hits: 51, conv: "22%", on: true },
  { when: "IF inactive ≥ 180d AND past job = wardrobe", then: "Free hinge/runner service visit", prio: 3, hits: 88, conv: "17%", on: true },
  { when: "IF quote stage ≥ 14d with no reply", then: "5% early-bird unlock (needs approval)", prio: 4, hits: 19, conv: "26%", on: true },
  { when: "IF budget < PKR 5L", then: "Modular-lite package suggestion", prio: 5, hits: 0, conv: "—", on: false },
];

export default function OfferEnginePage() {
  return (
    <>
      <PageHeader
        title="Offer Engine"
        description="Rule-based offers matched to each visitor and lead. Rules fire top-down; the first match wins and every fire is logged."
        actions={
          <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg bg-primary border border-primary-line text-primary-foreground hover:bg-primary-hover focus:outline-hidden focus:bg-primary-focus">
            New rule
          </button>
        }
      />
      <PageBody>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          <div className="xl:col-span-2 space-y-4">
            {RULES.map((r) => (
              <div key={r.prio} className={`bg-card border border-card-line shadow-2xs rounded-xl p-5 transition-opacity ${r.on ? "" : "opacity-60"}`}>
                <div className="flex items-center gap-x-3">
                  <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary text-xs font-bold wx-num">{r.prio}</span>
                  <p className="min-w-0 grow text-xs text-muted-foreground-1 font-mono truncate">{r.when}</p>
                  <span className={`relative inline-flex shrink-0 h-5 w-9 items-center rounded-full transition-colors ${r.on ? "bg-primary" : "bg-muted"}`}>
                    <span className={`inline-block size-3.5 rounded-full bg-card transform transition-transform ${r.on ? "translate-x-4.5" : "translate-x-1"}`} />
                  </span>
                </div>
                <p className="mt-3 text-sm font-medium text-foreground">→ {r.then}</p>
                <div className="mt-3 flex items-center gap-x-4 border-t border-card-divider pt-2.5 text-[11px] text-muted-foreground-1">
                  <span className="wx-num">{r.hits} fires / 30d</span>
                  <span className="wx-num text-teal-500 font-semibold">{r.conv} conversion</span>
                  <span className="ms-auto">{r.on ? "enabled" : "disabled"}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Simulator */}
          <div className="bg-card border border-card-line shadow-2xs rounded-xl p-5 self-start">
            <h2 className="text-sm font-semibold text-foreground">Simulate a visitor</h2>
            <p className="mt-1 text-xs text-muted-foreground-1">Dry-run the rule stack without firing anything.</p>
            <dl className="mt-4 space-y-3 text-xs">
              <div>
                <dt className="text-muted-foreground-1">Area</dt>
                <dd className="mt-1"><span className="inline-flex items-center rounded-lg border border-layer-line bg-layer px-3 py-1.5 text-foreground">DHA</span></dd>
              </div>
              <div>
                <dt className="text-muted-foreground-1">Service</dt>
                <dd className="mt-1"><span className="inline-flex items-center rounded-lg border border-layer-line bg-layer px-3 py-1.5 text-foreground">Kitchen</span></dd>
              </div>
              <div>
                <dt className="text-muted-foreground-1">Lead score</dt>
                <dd className="mt-1"><span className="inline-flex items-center rounded-lg border border-layer-line bg-layer px-3 py-1.5 text-foreground wx-num">9</span></dd>
              </div>
            </dl>
            <div className="mt-4 rounded-lg border border-teal-500/25 bg-teal-500/10 p-3">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-teal-500">Rule 1 matches</p>
              <p className="mt-1 text-xs text-foreground">Free 3D walkthrough with site visit</p>
            </div>
            <button type="button" className="mt-4 w-full py-2 px-3 inline-flex justify-center items-center text-sm font-medium rounded-lg border border-border bg-layer text-layer-foreground hover:bg-layer-hover focus:outline-hidden focus:bg-layer-focus">
              Run simulation
            </button>
          </div>
        </div>
      </PageBody>
    </>
  );
}
