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
      </PageBody>
    </>
  );
}
