"use client";

import { Receipt } from "lucide-react";
import { PageBody, PageHeader } from "@/components/ui/PageHeader";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { InvoiceBadge } from "@/components/ui/StatusBadge";
import { KpiCard } from "@/components/ui/KpiCard";
import { INVOICES } from "@/lib/fixture";
import { formatPkr, type Invoice } from "@/lib/domain";


const columns: Column<Invoice>[] = [
  {
    key: "no",
    header: "Invoice",
    text: (i) => `${i.no} ${i.client.name}`,
    sortValue: (i) => i.no,
    render: (i) => (
      <div className="min-w-0">
        <p className="wx-num font-medium text-foreground">{i.no}</p>
        <p className="truncate text-xs text-muted-foreground">{i.client.name}</p>
      </div>
    ),
  },
  { key: "issue", header: "Issued", text: (i) => i.issue_date, sortValue: (i) => i.issue_date, render: (i) => <span className="wx-num text-xs text-muted-foreground">{i.issue_date}</span> },
  {
    key: "due",
    header: "Due",
    text: (i) => i.due_date,
    sortValue: (i) => i.due_date,
    render: (i) => <span className={`wx-num text-xs ${i.overdue ? "font-semibold text-destructive" : "text-muted-foreground"}`}>{i.due_date}</span>,
  },
  {
    key: "total",
    header: "Total",
    align: "right",
    text: (i) => String(i.total),
    sortValue: (i) => i.total,
    render: (i) => <span className="wx-num font-semibold text-foreground">{formatPkr(i.total)}</span>,
  },
  {
    key: "balance",
    header: "Balance",
    align: "right",
    text: (i) => String(i.balance),
    sortValue: (i) => i.balance,
    render: (i) =>
      i.balance ? <span className="wx-num font-medium text-destructive">{formatPkr(i.balance)}</span> : <span className="text-muted-foreground/60">Settled</span>,
  },
  {
    key: "paid",
    header: "Payments",
    align: "right",
    text: (i) => i.payments.map((p) => p.method).join(" "),
    render: (i) => (
      <div className="text-right">
        {i.payments.length === 0 ? (
          <span className="text-xs text-muted-foreground/60">None</span>
        ) : (
          <>
            <p className="wx-num text-xs font-medium text-foreground">{formatPkr(i.payments.reduce((s, p) => s + p.amount, 0))}</p>
            <p className="text-[10px] text-muted-foreground">{i.payments.map((p) => p.method).join(", ")}</p>
          </>
        )}
      </div>
    ),
  },
  { key: "status", header: "Status", text: (i) => i.status, sortValue: (i) => i.status, render: (i) => <InvoiceBadge status={i.status} /> },
];

export default function InvoicesPage() {
  const sum = (test: (i: Invoice) => boolean) => INVOICES.filter(test).reduce((s, i) => s + i.balance, 0);
  const count = (test: (i: Invoice) => boolean) => INVOICES.filter(test).length;
  const collected = INVOICES.flatMap((i) => i.payments).reduce((s, p) => s + p.amount, 0);

  return (
    <>
      <PageHeader
        title="Invoices"
        description="Generated from approved quotations. Milestone and advance payments recorded against each; balances feed the dashboard outstanding figure."
        actions={
          <button type="button" className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover">
            <Receipt className="size-4" />
            New invoice
          </button>
        }
      />
      <PageBody className="space-y-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard label="Outstanding" value={formatPkr(sum(() => true))} icon={Receipt} hint={`${count((i) => i.balance > 0)} with a balance`} />
          <KpiCard label="Overdue" value={formatPkr(sum((i) => i.overdue))} icon={Receipt} invert hint={`${count((i) => i.overdue)} invoices`} />
          <KpiCard label="Collected" value={formatPkr(collected)} icon={Receipt} hint={`${INVOICES.flatMap((i) => i.payments).length} payments recorded`} />
          <KpiCard label="Settled" value={String(count((i) => i.balance === 0))} icon={Receipt} hint="Fully paid" />
        </div>

        <DataTable
          rows={INVOICES}
          columns={columns}
          rowKey={(i) => i.id}
          searchPlaceholder="Search invoice no, client…"
          emptyTitle="No invoices match"
          filters={[
            { id: "overdue", label: "Overdue", count: count((i) => i.overdue), test: (i) => i.overdue },
            { id: "part", label: "Part paid", count: count((i) => i.status === "part_paid"), test: (i) => i.status === "part_paid" },
            { id: "unpaid", label: "Unpaid", count: count((i) => i.balance > 0 && !i.overdue), test: (i) => i.balance > 0 && !i.overdue },
            { id: "paid", label: "Settled", count: count((i) => i.balance === 0), test: (i) => i.balance === 0 },
          ]}
        />
      </PageBody>
    </>
  );
}
