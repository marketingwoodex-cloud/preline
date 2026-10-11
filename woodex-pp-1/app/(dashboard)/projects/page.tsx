import { HardHat } from "lucide-react";
import { PageBody, PageHeader } from "@/components/ui/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { PROJECTS } from "@/lib/fixture";
import { PROJECT_STAGES, formatPkr, type ProjectStage } from "@/lib/domain";
import { cx } from "@/lib/cx";

export const metadata = { title: "Projects" };

export default function ProjectsPage() {
  const byStage = (s: ProjectStage) => PROJECTS.filter((p) => p.stage === s);
  const totalValue = PROJECTS.reduce((s, p) => s + p.value, 0);

  return (
    <>
      <PageHeader
        title="Projects"
        description="Live sites by build stage. The 5-step workflow is the same one clients see in their bilingual progress updates."
        actions={
          <div className="rounded-lg border border-border bg-background-1 px-3 py-2 text-xs text-muted-foreground">
            Active value <b className="wx-num ml-1 font-semibold text-foreground">{formatPkr(totalValue)}</b>
          </div>
        }
      />
      <PageBody className="space-y-5">
        {/* Stage stepper */}
        <ol className="flex flex-wrap items-center gap-2">
          {PROJECT_STAGES.map((s, i) => {
            const n = byStage(s.id).length;
            return (
              <li key={s.id} className="flex items-center gap-2">
                <div className={cx("flex items-center gap-2 rounded-lg border px-3 py-2", n ? "border-primary/40 bg-primary/10" : "border-border bg-background-1")}>
                  <span className={cx("grid size-6 place-items-center rounded-full text-[11px] font-bold", n ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
                    {i + 1}
                  </span>
                  <span>
                    <b className={cx("block text-[13px] font-semibold leading-tight", n ? "text-primary" : "text-foreground")}>{s.label}</b>
                    <small className="block text-[10px] leading-tight text-muted-foreground">{s.ur}</small>
                  </span>
                  <span className="wx-num ml-1 text-[11px] font-semibold text-muted-foreground">{n}</span>
                </div>
                {i < PROJECT_STAGES.length - 1 && <span className="hidden h-px w-4 bg-border sm:block" aria-hidden="true" />}
              </li>
            );
          })}
        </ol>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {PROJECTS.map((p) => {
            const stage = PROJECT_STAGES.find((s) => s.id === p.stage);
            const idx = PROJECT_STAGES.findIndex((s) => s.id === p.stage);
            return (
              <SectionCard key={p.id} className="flex flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-foreground">{p.name}</h3>
                    <p className="truncate text-xs text-muted-foreground">
                      {p.client} · {p.city}
                    </p>
                  </div>
                  <span className="wx-num shrink-0 text-sm font-bold text-primary">{formatPkr(p.value)}</span>
                </div>

                <div className="mt-3">
                  <div className="mb-1 flex items-center justify-between text-[11px]">
                    <span className="font-medium text-foreground">
                      {stage?.label} <span className="text-muted-foreground">({stage?.ur})</span>
                    </span>
                    <span className="wx-num text-muted-foreground">{p.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuenow={p.progress} aria-valuemin={0} aria-valuemax={100}>
                    <div className="h-full rounded-full bg-primary transition-[width] duration-500" style={{ width: `${p.progress}%` }} />
                  </div>
                </div>

                {/* Mini stage track */}
                <div className="mt-3 flex gap-1" aria-hidden="true">
                  {PROJECT_STAGES.map((s, i) => (
                    <span key={s.id} className={cx("h-1 flex-1 rounded-full", i <= idx ? "bg-primary" : "bg-muted")} />
                  ))}
                </div>

                <dl className="mt-3 grid grid-cols-2 gap-2 border-t border-card-divider pt-3 text-xs">
                  <div>
                    <dt className="text-muted-foreground">Started</dt>
                    <dd className="wx-num font-medium text-foreground">{p.start}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Target</dt>
                    <dd className="wx-num font-medium text-foreground">{p.eta}</dd>
                  </div>
                </dl>

                <div className="mt-3 flex items-center gap-2 border-t border-card-divider pt-3">
                  <HardHat className="size-3.5 text-muted-foreground" />
                  <span className="truncate text-xs text-muted-foreground">Lead: {p.lead}</span>
                </div>
              </SectionCard>
            );
          })}
        </div>
      </PageBody>
    </>
  );
}
