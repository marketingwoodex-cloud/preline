import { cx } from "@/lib/cx";
import { STAGE_LABEL, type CrmStage, type InvoiceStatus, type PageStatus, type QuoteStatus } from "@/lib/domain";

type Tone = "cyan" | "gold" | "green" | "red" | "neutral" | "blue";

const TONE: Record<Tone, string> = {
  cyan: "bg-primary/10 text-primary ring-primary/25",
  gold: "bg-secondary/10 text-secondary ring-secondary/25",
  green: "bg-emerald-500/10 text-emerald-500 ring-emerald-500/25",
  red: "bg-destructive/10 text-destructive ring-destructive/25",
  blue: "bg-sky-500/10 text-sky-500 ring-sky-500/25",
  neutral: "bg-muted text-muted-foreground ring-border",
};

export function Badge({ tone = "neutral", children }: { tone?: Tone; children: React.ReactNode }) {
  return (
    <span className={cx("inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-semibold ring-1 ring-inset", TONE[tone])}>
      {children}
    </span>
  );
}

const STAGE_TONE: Record<CrmStage, Tone> = {
  new: "cyan",
  contacted: "blue",
  visit: "gold",
  quote: "gold",
  hold: "neutral",
  won: "green",
  lost: "red",
};

export function StageBadge({ stage }: { stage: CrmStage }) {
  return <Badge tone={STAGE_TONE[stage]}>{STAGE_LABEL[stage]}</Badge>;
}

const QUOTE_TONE: Record<QuoteStatus, Tone> = {
  draft: "neutral",
  sent: "cyan",
  approved: "green",
  declined: "red",
  expired: "neutral",
};

export function QuoteBadge({ status }: { status: QuoteStatus }) {
  return <Badge tone={QUOTE_TONE[status]}>{status}</Badge>;
}

const INVOICE_TONE: Record<InvoiceStatus, Tone> = {
  draft: "neutral",
  sent: "cyan",
  part_paid: "gold",
  paid: "green",
  overdue: "red",
};

export function InvoiceBadge({ status }: { status: InvoiceStatus }) {
  return <Badge tone={INVOICE_TONE[status]}>{status === "part_paid" ? "Part paid" : status.replace("_", " ")}</Badge>;
}

const PAGE_TONE: Record<PageStatus, Tone> = {
  published: "green",
  hidden: "gold",
  draft: "neutral",
};

export function PageBadge({ status }: { status: PageStatus }) {
  return <Badge tone={PAGE_TONE[status]}>{status}</Badge>;
}

/** 0–100 score with a colour that matches how Woodex reports it. */
export function ScoreBadge({ score }: { score: number }) {
  const tone: Tone = score >= 85 ? "green" : score >= 65 ? "gold" : "red";
  return <Badge tone={tone}>{score}</Badge>;
}
