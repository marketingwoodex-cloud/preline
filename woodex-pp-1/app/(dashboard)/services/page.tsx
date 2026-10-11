import { PageBody, PageHeader } from "@/components/ui/PageHeader";

export const metadata = { title: "Services" };

const SERVICES = [
  { name: "Modular kitchens", from: "PKR 8.5L", cycle: "4–6 weeks", leads: 46, margin: "A", desc: "Design → install, imported + local hardware" },
  { name: "Wardrobes & walk-ins", from: "PKR 4.2L", cycle: "3–4 weeks", leads: 28, margin: "A", desc: "Sliding, hinged, walk-in dressing rooms" },
  { name: "Bathroom redesign", from: "PKR 2.8L", cycle: "2–3 weeks", leads: 17, margin: "B", desc: "Vanity units, tiling supervision, fittings" },
  { name: "Office fit-outs", from: "PKR 15L", cycle: "6–10 weeks", leads: 6, margin: "S", desc: "Stations, cabins, reception, acoustic panels" },
  { name: "TV walls & media units", from: "PKR 1.9L", cycle: "2 weeks", leads: 12, margin: "B", desc: "Back panels, cabling, lighting integration" },
  { name: "Refit & after-care", from: "PKR 60k", cycle: "1 week", leads: 9, margin: "B", desc: "Hinges, runners, polish, door realignment" },
];

const MARGIN: Record<string, string> = {
  S: "bg-primary/10 text-primary ring-primary/25",
  A: "bg-teal-500/10 text-teal-500 ring-teal-500/25",
  B: "bg-secondary/10 text-secondary ring-secondary/25",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Services"
        description="The catalogue the site, quotes and broadcasts all pull from. Prices are ‘from’ ranges — never fixed without a visit."
        actions={
          <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg bg-primary border border-primary-line text-primary-foreground hover:bg-primary-hover focus:outline-hidden focus:bg-primary-focus">
            New service
          </button>
        }
      />
      <PageBody>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {SERVICES.map((s) => (
            <div key={s.name} className="bg-card border border-card-line shadow-2xs rounded-xl p-5 transition-shadow hover:shadow-md">
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-sm font-semibold text-foreground">{s.name}</h2>
                <span className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-bold ring-1 ring-inset ${MARGIN[s.margin]}`}>margin {s.margin}</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground-1">{s.desc}</p>
              <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-card-divider pt-3 text-center">
                <div>
                  <dt className="text-[10px] uppercase tracking-wide text-muted-foreground-1">From</dt>
                  <dd className="mt-0.5 text-xs font-bold text-foreground wx-num">{s.from}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-wide text-muted-foreground-1">Cycle</dt>
                  <dd className="mt-0.5 text-xs font-bold text-foreground">{s.cycle}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-wide text-muted-foreground-1">Open leads</dt>
                  <dd className="mt-0.5 text-xs font-bold text-primary wx-num">{s.leads}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      </PageBody>
    </>
  );
}
