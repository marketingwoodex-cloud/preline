import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { cx } from "@/lib/cx";
import { deltaPct } from "@/lib/domain";

type Props = {
  label: string;
  value: string;
  icon: LucideIcon;
  /** Previous-period value; renders a delta chip when supplied. */
  previous?: number;
  current?: number;
  /** "up" means growth is good. Invoices unpaid is the opposite. */
  invert?: boolean;
  hint?: string;
  /** Compact area chart under the number. */
  spark?: number[];
};

export function KpiCard({ label, value, icon: Icon, previous, current, invert, hint, spark }: Props) {
  const pct = current !== undefined && previous !== undefined ? deltaPct(current, previous) : null;
  const flat = pct === null || Math.abs(pct) < 0.05;
  const good = pct !== null && (invert ? pct < 0 : pct > 0);

  return (
    <div className="rounded-xl border border-card-line bg-card p-4 transition-colors hover:border-primary/40">
      <div className="flex items-start justify-between gap-3">
        <span className="text-[13px] font-medium text-muted-foreground">{label}</span>
        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-4" />
        </span>
      </div>

      <div className="mt-2 flex items-end justify-between gap-3">
        <p className="wx-num text-2xl font-bold tracking-tight text-foreground">{value}</p>
        {spark && spark.length > 1 && <Spark data={spark} />}
      </div>

      <div className="mt-2 flex items-center gap-2">
        {pct !== null && (
          <span
            className={cx(
              "inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[11px] font-semibold",
              flat
                ? "bg-muted text-muted-foreground"
                : good
                  ? "bg-primary/10 text-primary"
                  : "bg-destructive/10 text-destructive",
            )}
          >
            {flat ? <Minus className="size-3" /> : good ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
            <span className="wx-num">{Math.abs(pct).toFixed(pct >= 100 ? 0 : 1)}%</span>
          </span>
        )}
        {hint && <span className="truncate text-[11px] text-muted-foreground">{hint}</span>}
      </div>
    </div>
  );
}

/** Dependency-free inline sparkline. Uses currentColor so it inherits the theme. */
function Spark({ data }: { data: number[] }) {
  const w = 72;
  const h = 24;
  const max = Math.max(...data, 1);
  const min = Math.min(...data, 0);
  const span = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / span) * (h - 2) - 1;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="shrink-0 text-primary" aria-hidden="true">
      <polyline points={pts.join(" ")} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}
