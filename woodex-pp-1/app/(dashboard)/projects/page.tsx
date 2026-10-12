import { PageBody, PageHeader } from "@/components/ui/PageHeader";

export const metadata = { title: "Projects" };

const KPIS = [
  { label: "In production", value: "7", note: "workshop + site" },
  { label: "In measurement", value: "3", note: "this week" },
  { label: "On hold", value: "1", note: "awaiting material" },
  { label: "On-time rate", value: "92%", note: "last 90 days" },
];

const PROJECTS = [
  { name: "DHA-6 refit", client: "Ayesha Khan", phase: "Installation", prog: 78, due: "2026-10-20", status: "On track" },
  { name: "Gulberg office fit-out", client: "Bilal Chaudhry", phase: "Production", prog: 54, due: "2027-01-15", status: "On track" },
  { name: "Bahria kitchen + island", client: "Usman Bhatti", phase: "Measurement", prog: 12, due: "2026-12-05", status: "On track" },
  { name: "Model Town wardrobes", client: "Hina Raza", phase: "Design", prog: 30, due: "2026-11-22", status: "At risk" },
  { name: "Askari bathrooms ×3", client: "Fatima Noor", phase: "Production", prog: 61, due: "2026-11-10", status: "On track" },
  { name: "Cantt kitchen", client: "Omar Sheikh", phase: "On hold", prog: 45, due: "TBD", status: "Blocked" },
  { name: "Lake City wardrobe", client: "S. Ahmed", phase: "Measurement", prog: 8, due: "2026-12-18", status: "On track" },
];

const PILL: Record<string, string> = {
  "On track": "bg-teal-500/10 text-teal-500 ring-teal-500/25",
  "At risk": "bg-amber-500/10 text-amber-500 ring-amber-500/25",
  Blocked: "bg-destructive/10 text-destructive ring-destructive/25",
};

const barTone: Record<string, string> = {
  "On track": "bg-teal-500",
  "At risk": "bg-amber-500",
  Blocked: "bg-destructive",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        title="Projects"
        description="Every job from measurement to handover. Phases: Design → Measurement → Production → Installation → Handover."
        actions={
          <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg bg-primary border border-primary-line text-primary-foreground hover:bg-primary-hover focus:outline-hidden focus:bg-primary-focus">
            New project
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

        <div className="mt-5 bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-card-line">
            <h2 className="text-sm font-semibold text-foreground">Delivery board</h2>
          </div>
          <ul className="divide-y divide-card-divider">
            {PROJECTS.map((p) => (
              <li key={p.name} className="px-5 py-4">
                <div className="flex items-center gap-x-4">
                  <div className="min-w-0 grow">
                    <p className="flex flex-wrap items-center gap-2 text-sm font-medium text-foreground">
                      {p.name}
                      <span className="text-[11px] font-normal text-muted-foreground-1">· {p.client}</span>
                    </p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground-1">phase: {p.phase} · due {p.due}</p>
                  </div>
                  <span className={`hidden sm:inline-flex shrink-0 items-center rounded-md px-1.5 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${PILL[p.status]}`}>{p.status}</span>
                  <span className="shrink-0 text-xs font-bold text-foreground wx-num w-10 text-right">{p.prog}%</span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-muted">
                  <div className={`h-1.5 rounded-full ${barTone[p.status]}`} style={{ width: `${p.prog}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* AI BOQ estimator (Batch 3 · fixture — wiring pending) */}
        <div className="mt-5 bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-card-line flex flex-wrap items-center gap-x-3 gap-y-1">
            <h2 className="text-sm font-semibold text-foreground">AI BOQ estimator</h2>
            <span className="inline-flex items-center rounded-md px-1.5 py-0.5 text-[11px] font-semibold bg-primary/10 text-primary ring-1 ring-inset ring-primary/25">Gulberg Villa · 1,850 sq ft</span>
            <span className="ms-auto text-[11px] text-muted-foreground-1">confidence <span className="wx-num font-semibold text-teal-500">87%</span> · from 3 similar projects</span>
            <button type="button" className="py-1.5 px-2.5 inline-flex items-center text-xs font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary-hover focus:outline-hidden">
              Generate BOQ
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-table-line">
              <thead className="bg-surface">
                <tr>
                  {["Item", "Qty", "Rate (PKR)", "Amount (PKR)"].map((h) => (
                    <th key={h} scope="col" className="px-5 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-muted-foreground-1">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-table-line">
                {[
                  ["Kitchen cabinets — MDF lacquer", "145 sq ft", "4,200", "609,000"],
                  ["Sliding wardrobes", "3 units", "185,000", "555,000"],
                  ["TV / feature unit", "1 unit", "95,000", "95,000"],
                  ["Paint & polish (interior)", "1,850 sq ft", "85", "157,250"],
                  ["Electrical & fixtures", "lump sum", "—", "120,000"],
                ].map((r) => (
                  <tr key={r[0]} className="hover:bg-surface">
                    <td className="px-5 py-2.5 text-xs font-medium text-foreground whitespace-nowrap">{r[0]}</td>
                    <td className="px-5 py-2.5 text-xs text-muted-foreground-1 wx-num whitespace-nowrap">{r[1]}</td>
                    <td className="px-5 py-2.5 text-xs text-muted-foreground-1 wx-num whitespace-nowrap">{r[2]}</td>
                    <td className="px-5 py-2.5 text-xs font-semibold text-foreground wx-num whitespace-nowrap">{r[3]}</td>
                  </tr>
                ))}
                <tr className="bg-surface">
                  <td className="px-5 py-2.5 text-xs font-bold text-foreground" colSpan={3}>Estimated total</td>
                  <td className="px-5 py-2.5 text-sm font-bold text-primary wx-num whitespace-nowrap">1,536,250</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 border-t border-card-line flex flex-wrap items-center gap-x-2 gap-y-1.5">
            <button type="button" className="py-1.5 px-2.5 inline-flex items-center text-xs font-medium rounded-lg border border-border bg-layer text-layer-foreground hover:bg-layer-hover focus:outline-hidden">
              Adjust rates
            </button>
            <button type="button" className="py-1.5 px-2.5 inline-flex items-center text-xs font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary-hover focus:outline-hidden">
              Send to quote
            </button>
            <span className="ms-auto text-[11px] text-muted-foreground-1">Engine drafts quantities from the floor plan; rates come from the rate library. Fixture data until API wiring.</span>
          </div>
        </div>
      </PageBody>
    </>
  );
}
