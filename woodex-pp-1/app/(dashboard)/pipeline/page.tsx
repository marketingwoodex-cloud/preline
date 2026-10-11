import { PageBody, PageHeader } from "@/components/ui/PageHeader";
import { LEADS } from "@/lib/fixture";
import { OPEN_STAGES, STAGE_LABEL, formatPkr } from "@/lib/domain";

export const metadata = { title: "Pipeline" };

/**
 * Pipeline — block-style kanban (Preline Planning-Board pattern): one column
 * per open stage, cards with client, service, value, source tag and follow-up
 * date; column headers show count + stage total. Data from the v2.1-shaped
 * LEADS fixture; drag-to-move lands with the interactive pass.
 */

const TAG: Record<string, string> = {
  whatsapp: "WhatsApp",
  web: "Website",
  phone: "Phone",
  referral: "Referral",
  instagram: "Instagram",
  facebook: "Facebook",
};

export default function PipelinePage() {
  const open = LEADS.filter((l) => OPEN_STAGES.includes(l.stage));
  const total = open.reduce((s, l) => s + l.value, 0);

  return (
    <>
      <PageHeader
        title="Pipeline"
        description="Every open lead, stage by stage. Cards carry value, source and follow-up so sales never asks 'where are we?'"
        actions={
          <div className="flex items-center gap-4 rounded-lg border border-border bg-background-1 px-3 py-2 text-xs">
            <span className="text-muted-foreground">
              Open value <b className="wx-num ml-1 font-semibold text-foreground">{formatPkr(total)}</b>
            </span>
          </div>
        }
      />
      <PageBody>
        <div className="flex gap-4 overflow-x-auto pb-4 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-none [&::-webkit-scrollbar-track]:bg-scrollbar-track [&::-webkit-scrollbar-thumb]:bg-scrollbar-thumb">
          {OPEN_STAGES.map((stage) => {
            const cards = open.filter((l) => l.stage === stage);
            const sum = cards.reduce((s, l) => s + l.value, 0);
            return (
              <div key={stage} className="w-80 shrink-0 flex flex-col rounded-xl bg-muted/50 border border-card-line">
                {/* Column header */}
                <div className="px-4 py-3 flex items-center justify-between gap-2 border-b border-card-line">
                  <div className="flex items-center gap-x-2">
                    <span className="size-2 rounded-full bg-primary" />
                    <h3 className="text-sm font-semibold text-foreground">{STAGE_LABEL[stage]}</h3>
                    <span className="inline-flex items-center py-0.5 px-1.5 rounded-full bg-surface text-surface-foreground text-[11px] font-medium">{cards.length}</span>
                  </div>
                  <span className="wx-num text-xs text-muted-foreground-1">{formatPkr(sum)}</span>
                </div>
                {/* Cards */}
                <div className="p-3 space-y-3 min-h-32">
                  {cards.map((l) => (
                    <div key={l.id} className="bg-card border border-card-line shadow-2xs rounded-xl p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium text-foreground leading-tight">{l.name}</p>
                        <span className="wx-num shrink-0 text-xs font-semibold text-primary">{formatPkr(l.value)}</span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground-1 line-clamp-2">{l.service || "General enquiry"}</p>
                      <div className="mt-3 flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 py-0.5 px-1.5 rounded-md bg-surface text-surface-foreground text-[10px] font-medium">
                          <span className="grid size-4 place-items-center rounded-full bg-primary/10 text-primary text-[8px] font-bold">
                            {l.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                          </span>
                          {TAG[l.source] ?? l.source}
                        </span>
                        <span className="wx-num text-[10px] text-muted-foreground-1">{l.created_at.slice(0, 10)}</span>
                      </div>
                      {/* v2 card: days in stage + next follow-up + quick actions */}
                      <div className="mt-2 flex items-center justify-between gap-2 border-t border-card-divider pt-2">
                        <span className="wx-num text-[10px] text-muted-foreground-1">
                          {Math.max(0, Math.round((Date.now() - new Date(l.created_at).getTime()) / 86400000))}d in stage · follow-up {l.created_at.slice(5, 10)}
                        </span>
                        <span className="flex gap-x-1">
                          {["WA", "Call", "Quote"].map((a) => (
                            <button key={a} type="button" className="rounded-md bg-primary/10 px-1.5 py-0.5 text-[9px] font-semibold text-primary hover:bg-primary/20 focus:outline-hidden">
                              {a}
                            </button>
                          ))}
                        </span>
                      </div>
                    </div>
                  ))}
                  {cards.length === 0 && (
                    <p className="py-8 text-center text-xs text-muted-foreground-1">No leads in this stage</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </PageBody>
    </>
  );
}
