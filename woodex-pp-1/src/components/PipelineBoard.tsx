"use client";

import { useMemo, useState } from "react";
import { GripVertical } from "lucide-react";
import { cx } from "@/lib/cx";
import { OPEN_STAGES, STAGE_LABEL, formatPkr, relativeDay, type CrmStage, type Lead } from "@/lib/domain";

/**
 * Drag-and-drop stage progression.
 *
 * v2.1's own P19 plan calls for "drag + won/lost reason", "stage totals" and
 * "fit-to-screen (no long scroll bar)" on this screen. Stage totals and
 * drag are here; won/lost reason is a modal that still needs wiring to
 * `lead_save` with `{stage, lost_reason}`.
 */
export function PipelineBoard({ leads }: { leads: Lead[] }) {
  const [stage, setStage] = useState<Record<number, CrmStage>>(
    Object.fromEntries(leads.filter((l) => OPEN_STAGES.includes(l.stage)).map((l) => [l.id, l.stage])),
  );
  const [dragId, setDragId] = useState<number | null>(null);
  const [overCol, setOverCol] = useState<CrmStage | null>(null);

  const columns = useMemo(
    () =>
      OPEN_STAGES.map((s) => ({
        stage: s,
        items: leads.filter((l) => (stage[l.id] ?? l.stage) === s),
      })),
    [leads, stage],
  );

  const drop = (target: CrmStage) => {
    if (dragId === null) return;
    setStage((prev) => ({ ...prev, [dragId]: target }));
    setDragId(null);
    setOverCol(null);
  };

  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {columns.map(({ stage: s, items }) => {
        const total = items.reduce((sum, l) => sum + l.value, 0);
        return (
          <section
            key={s}
            onDragOver={(e) => {
              e.preventDefault();
              setOverCol(s);
            }}
            onDragLeave={() => setOverCol((c) => (c === s ? null : c))}
            onDrop={() => drop(s)}
            className={cx(
              "flex w-72 shrink-0 flex-col rounded-xl border border-card-line bg-card transition-colors",
              overCol === s && "wx-drop-active",
            )}
            aria-label={`${STAGE_LABEL[s]} column`}
          >
            <header className="flex items-center justify-between gap-2 border-b border-card-divider px-3 py-2.5">
              <h3 className="text-[13px] font-semibold text-foreground">{STAGE_LABEL[s]}</h3>
              <span className="wx-num rounded-md bg-muted px-1.5 py-0.5 text-[11px] font-semibold text-muted-foreground">{items.length}</span>
            </header>

            <p className="wx-num border-b border-card-divider px-3 py-1.5 text-[11px] text-muted-foreground">
              {items.length ? formatPkr(total) : "No value yet"}
            </p>

            <div className="wx-scroll flex max-h-[calc(100dvh-19rem)] min-h-24 flex-1 flex-col gap-2 overflow-y-auto p-2">
              {items.length === 0 && (
                <p className="rounded-lg border border-dashed border-border px-3 py-6 text-center text-xs text-muted-foreground">Drop a lead here</p>
              )}

              {items.map((l) => (
                <article
                  key={l.id}
                  draggable
                  onDragStart={() => setDragId(l.id)}
                  onDragEnd={() => {
                    setDragId(null);
                    setOverCol(null);
                  }}
                  className={cx(
                    "wx-kanban-card rounded-lg border border-card-line bg-background-1 p-2.5 transition-shadow hover:shadow-md",
                    dragId === l.id && "opacity-50",
                  )}
                >
                  <div className="flex items-start gap-1.5">
                    <GripVertical className="mt-0.5 size-3.5 shrink-0 text-muted-foreground/60" aria-hidden="true" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] font-semibold text-foreground">{l.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{l.service || "Service not set"}</p>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center justify-between gap-2">
                    <span className="wx-num text-xs font-semibold text-primary">{l.value ? formatPkr(l.value) : "—"}</span>
                    <span className="truncate text-[10px] text-muted-foreground">{relativeDay(l.created_at)}</span>
                  </div>

                  <div className="mt-1.5 flex items-center gap-1.5">
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-primary/15 text-[9px] font-bold text-primary">
                      {l.assigned_name
                        .split(" ")
                        .map((p) => p[0])
                        .slice(0, 2)
                        .join("")}
                    </span>
                    <span className="truncate text-[10px] text-muted-foreground">{l.assigned_name || "Unassigned"}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
