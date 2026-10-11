import { PageBody, PageHeader } from "@/components/ui/PageHeader";

export const metadata = { title: "Segments" };

const SEGMENTS = [
  { name: "Past clients — DHA", rule: "job status = won AND area = DHA", size: 412, growth: "+6%", synced: "2026-10-12 06:00" },
  { name: "Hot leads (score ≥ 8)", rule: "AI lead score ≥ 8 AND stage ≠ won/lost", size: 96, growth: "+22%", synced: "2026-10-12 06:00" },
  { name: "Site visits last 30d", rule: "last site visit within 30 days", size: 58, growth: "+9%", synced: "2026-10-12 06:00" },
  { name: "Kitchen interest", rule: "tag = kitchen OR enquiry service = kitchen", size: 233, growth: "+4%", synced: "2026-10-12 06:00" },
  { name: "Inactive 6m+", rule: "no touchpoint in 180 days AND not lost", size: 903, growth: "−2%", synced: "2026-10-11 06:00" },
  { name: "Architect partners", rule: "type = partner AND trade = architect", size: 41, growth: "+1", synced: "2026-10-11 06:00" },
];

export default function SegmentsPage() {
  return (
    <>
      <PageHeader
        title="Segments"
        description="Live audience slices computed nightly from the CRM. Sizes re-sync at 06:00 PKT; broadcasts always use the freshest sync."
        actions={
          <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg bg-primary border border-primary-line text-primary-foreground hover:bg-primary-hover focus:outline-hidden focus:bg-primary-focus">
            New segment
          </button>
        }
      />
      <PageBody>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {SEGMENTS.map((s) => (
            <div key={s.name} className="bg-card border border-card-line shadow-2xs rounded-xl p-5">
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-sm font-semibold text-foreground">{s.name}</h2>
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                </span>
              </div>
              <p className="mt-2 text-[11px] text-muted-foreground-1 rounded-md bg-layer border border-layer-line px-2.5 py-1.5 font-mono">{s.rule}</p>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="text-2xl font-bold text-foreground wx-num">{s.size}</p>
                  <p className="text-[11px] text-muted-foreground-1">contacts</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-semibold wx-num ${s.growth.startsWith("−") ? "text-destructive" : "text-teal-500"}`}>{s.growth}</p>
                  <p className="text-[11px] text-muted-foreground-1">30d</p>
                </div>
              </div>
              <p className="mt-3 border-t border-card-divider pt-2 text-[11px] text-muted-foreground-1">synced {s.synced}</p>
            </div>
          ))}
        </div>
      </PageBody>
    </>
  );
}
