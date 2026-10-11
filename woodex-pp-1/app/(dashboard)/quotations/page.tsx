"use client";

import { FileText, Plus } from "lucide-react";
import { PageBody, PageHeader } from "@/components/ui/PageHeader";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { QuoteBadge } from "@/components/ui/StatusBadge";
import { KpiCard } from "@/components/ui/KpiCard";
import { SectionCard } from "@/components/ui/SectionCard";
import { QUOTES } from "@/lib/fixture";
import { formatPkr, type Quote } from "@/lib/domain";


const TEMPLATE_LABEL = { single: "Single", project: "Project", boq: "BOQ" } as const;

const columns: Column<Quote>[] = [
  {
    key: "no",
    header: "Quote",
    text: (q) => `${q.no} ${q.title}`,
    sortValue: (q) => q.no,
    render: (q) => (
      <div className="min-w-0">
        <p className="wx-num font-medium text-foreground">{q.no}</p>
        <p className="truncate text-xs text-muted-foreground">{q.title}</p>
      </div>
    ),
  },
  { key: "client", header: "Client", text: (q) => q.client.name, sortValue: (q) => q.client.name, render: (q) => <span className="text-muted-foreground">{q.client.name}</span> },
  {
    key: "template",
    header: "Template",
    text: (q) => q.template,
    sortValue: (q) => q.template,
    render: (q) => <span className="rounded-md bg-muted px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground">{TEMPLATE_LABEL[q.template]}</span>,
  },
  { key: "status", header: "Status", text: (q) => q.status, sortValue: (q) => q.status, render: (q) => <QuoteBadge status={q.status} /> },
  {
    key: "total",
    header: "Total",
    align: "right",
    text: (q) => String(q.total),
    sortValue: (q) => q.total,
    render: (q) => <span className="wx-num font-semibold text-foreground">{formatPkr(q.total)}</span>,
  },
  {
    key: "sent",
    header: "Sent",
    align: "right",
    text: (q) => q.sent_at ?? "",
    sortValue: (q) => q.sent_at ?? "9999",
    render: (q) => <span className="wx-num text-xs text-muted-foreground">{q.sent_at ?? "—"}</span>,
  },
  {
    key: "expires",
    header: "Valid to",
    align: "right",
    text: (q) => q.expires ?? "",
    sortValue: (q) => q.expires ?? "9999",
    render: (q) =>
      q.expires ? (
        <span className="wx-num text-xs text-muted-foreground">{q.expires}</span>
      ) : (
        <span className="text-xs text-muted-foreground/60">—</span>
      ),
  },
];

export default function QuotationsPage() {
  const sum = (test: (q: Quote) => boolean) => QUOTES.filter(test).reduce((s, q) => s + q.total, 0);
  const count = (test: (q: Quote) => boolean) => QUOTES.filter(test).length;

  return (
    <>
      <PageHeader
        title="Quotations"
        description="Single, Project and BOQ templates. Approve a quote to turn it into an invoice in one click; dual-bank details (Bank Alfalah, Meezan) print on the PDF."
        actions={
          <>
            <button type="button" className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background-1 px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted">
              <FileText className="size-4" />
              Starter templates
            </button>
            <button type="button" className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover">
              <Plus className="size-4" />
              New quotation
            </button>
          </>
        }
      />
      <PageBody className="space-y-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard label="Awaiting reply" value={String(count((q) => q.status === "sent"))} icon={FileText} hint={formatPkr(sum((q) => q.status === "sent"))} />
          <KpiCard label="Approved" value={String(count((q) => q.status === "approved"))} icon={FileText} hint={formatPkr(sum((q) => q.status === "approved"))} />
          <KpiCard label="Drafts" value={String(count((q) => q.status === "draft"))} icon={FileText} hint="Not yet sent" />
          <KpiCard label="Expired" value={String(count((q) => q.status === "expired"))} icon={FileText} hint="Past valid-to date" />
        </div>

        <SectionCard title="8 starter templates" subtitle="One-click import — Renovation, Civil, Interior Designing, Interior, Fit-out, Architecture, 3D, Furniture">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {["Renovation", "Civil work", "Interior design", "Interior", "Fit-out", "Architecture", "3D visualisation", "Furniture"].map((t) => (
              <button
                key={t}
                type="button"
                className="rounded-lg border border-border bg-background-1 px-3 py-2.5 text-left text-[13px] font-medium text-foreground transition-colors hover:border-primary/50 hover:bg-muted"
              >
                {t}
              </button>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Dual-bank routing" subtitle="Approved quotes pick the account by client region; IBAN + Swift print on the PDF footer">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-background-1 p-4">
              <p className="flex items-center justify-between text-sm font-semibold text-foreground">
                Bank Alfalah
                <span className="inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold bg-teal-500/10 text-teal-500 ring-1 ring-inset ring-teal-500/25">DHA · Gulberg · Model Town</span>
              </p>
              <p className="wx-num mt-1 text-xs text-muted-foreground">PK00 ALFH 0000 1234 5678 9012 · SWIFT ALFHPLKX</p>
            </div>
            <div className="rounded-lg border border-border bg-background-1 p-4">
              <p className="flex items-center justify-between text-sm font-semibold text-foreground">
                Meezan Bank
                <span className="inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold bg-teal-500/10 text-teal-500 ring-1 ring-inset ring-teal-500/25">Bahria · Cantt · Askari</span>
              </p>
              <p className="wx-num mt-1 text-xs text-muted-foreground">PK00 MEZN 0009 8765 4321 0987 · SWIFT MEZNPLKX</p>
            </div>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Approved quotes carry a 1-click <b className="text-foreground">Create invoice</b> action — milestones + advance ledger open prefilled.</p>
        </SectionCard>

        <DataTable
          rows={QUOTES}
          columns={columns}
          rowKey={(q) => q.id}
          searchPlaceholder="Search quote no, client…"
          emptyTitle="No quotations match"
          filters={[
            { id: "sent", label: "Awaiting reply", count: count((q) => q.status === "sent"), test: (q) => q.status === "sent" },
            { id: "approved", label: "Approved", count: count((q) => q.status === "approved"), test: (q) => q.status === "approved" },
            { id: "draft", label: "Draft", count: count((q) => q.status === "draft"), test: (q) => q.status === "draft" },
            { id: "boq", label: "BOQ", count: count((q) => q.template === "boq"), test: (q) => q.template === "boq" },
          ]}
        />
      </PageBody>
    </>
  );
}
