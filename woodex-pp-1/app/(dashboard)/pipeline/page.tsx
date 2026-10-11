import { PipelineBoard } from "@/components/PipelineBoard";
import { PageBody, PageHeader } from "@/components/ui/PageHeader";
import { LEADS } from "@/lib/fixture";
import { OPEN_STAGES, formatPkr } from "@/lib/domain";

export const metadata = { title: "Pipeline" };

export default function PipelinePage() {
  const open = LEADS.filter((l) => OPEN_STAGES.includes(l.stage));
  const total = open.reduce((s, l) => s + l.value, 0);
  const weighted = open.reduce((s, l) => {
    const factor = { new: 0.1, contacted: 0.25, visit: 0.45, quote: 0.65, hold: 0.3 } as const;
    return s + l.value * factor[l.stage as keyof typeof factor];
  }, 0);

  return (
    <>
      <PageHeader
        title="Pipeline"
        description="Drag a card to move a lead between stages. Stage totals and the weighted forecast update as you go."
        actions={
          <div className="flex items-center gap-4 rounded-lg border border-border bg-background-1 px-3 py-2 text-xs">
            <span className="text-muted-foreground">
              Open value <b className="wx-num ml-1 font-semibold text-foreground">{formatPkr(total)}</b>
            </span>
            <span className="h-4 w-px bg-border" aria-hidden="true" />
            <span className="text-muted-foreground">
              Weighted <b className="wx-num ml-1 font-semibold text-primary">{formatPkr(Math.round(weighted))}</b>
            </span>
            <span className="h-4 w-px bg-border" aria-hidden="true" />
            <span className="text-muted-foreground">
              Leads <b className="wx-num ml-1 font-semibold text-foreground">{open.length}</b>
            </span>
          </div>
        }
      />
      <PageBody>
        <PipelineBoard leads={LEADS} />
      </PageBody>
    </>
  );
}
