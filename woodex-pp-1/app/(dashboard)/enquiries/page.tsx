"use client";

import { Plus, Download } from "lucide-react";
import { PageBody, PageHeader } from "@/components/ui/PageHeader";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { StageBadge } from "@/components/ui/StatusBadge";
import { LEADS } from "@/lib/fixture";
import { CRM_SOURCES, formatPkr, relativeDay, type Lead } from "@/lib/domain";


const columns: Column<Lead>[] = [
  {
    key: "name",
    header: "Client",
    text: (r) => `${r.name} ${r.phone} ${r.email}`,
    sortValue: (r) => r.name,
    render: (r) => (
      <div className="min-w-0">
        <p className="flex items-center gap-2 font-medium text-foreground">
          {!r.is_read && <span className="size-1.5 shrink-0 rounded-full bg-primary" aria-label="Unread" />}
          {r.name}
        </p>
        <p className="wx-num text-xs text-muted-foreground">{r.phone}</p>
      </div>
    ),
  },
  { key: "service", header: "Service", text: (r) => r.service, sortValue: (r) => r.service, render: (r) => <span className="text-muted-foreground">{r.service || "—"}</span> },
  {
    key: "source",
    header: "Source",
    text: (r) => CRM_SOURCES[r.source] ?? r.source,
    sortValue: (r) => r.source,
    render: (r) => <span className="text-muted-foreground">{CRM_SOURCES[r.source] ?? r.source}</span>,
  },
  { key: "stage", header: "Stage", text: (r) => r.stage, sortValue: (r) => r.stage, render: (r) => <StageBadge stage={r.stage} /> },
  {
    key: "value",
    header: "Value",
    align: "right",
    text: (r) => String(r.value),
    sortValue: (r) => r.value,
    render: (r) => <span className="wx-num font-medium text-foreground">{r.value ? formatPkr(r.value) : "—"}</span>,
  },
  {
    key: "owner",
    header: "Owner",
    text: (r) => r.assigned_name,
    sortValue: (r) => r.assigned_name,
    render: (r) => <span className="text-muted-foreground">{r.assigned_name || "Unassigned"}</span>,
  },
  {
    key: "followup",
    header: "Follow-up",
    align: "right",
    text: (r) => r.followup ?? "",
    sortValue: (r) => r.followup ?? "9999",
    render: (r) =>
      r.followup ? (
        <span className="wx-num text-xs text-muted-foreground">{r.followup}</span>
      ) : (
        <span className="text-xs text-muted-foreground/60">—</span>
      ),
  },
  {
    key: "created",
    header: "Received",
    align: "right",
    text: (r) => r.created_at,
    sortValue: (r) => r.created_at,
    render: (r) => <span className="text-xs text-muted-foreground">{relativeDay(r.created_at)}</span>,
  },
];

export default function EnquiriesPage() {
  const count = (test: (l: Lead) => boolean) => LEADS.filter(test).length;

  return (
    <>
      <PageHeader
        title="Enquiries"
        description="Every lead from every source — contact form, WhatsApp, estimator, 3D brief, live chat, referrals and walk-ins — in one inbox."
        actions={
          <>
            <button type="button" className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background-1 px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted">
              <Download className="size-4" />
              Export CSV
            </button>
            <button type="button" className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover">
              <Plus className="size-4" />
              Add lead
            </button>
          </>
        }
      />
      <PageBody>
        <DataTable
          rows={LEADS}
          columns={columns}
          rowKey={(r) => r.id}
          searchPlaceholder="Search name, phone, service…"
          emptyTitle="No enquiries match"
          emptyHint="Try clearing the search or switching back to All."
          filters={[
            { id: "new", label: "New", count: count((l) => l.stage === "new"), test: (l) => l.stage === "new" },
            { id: "unread", label: "Unread", count: count((l) => !l.is_read), test: (l) => !l.is_read },
            { id: "quoted", label: "Quoted", count: count((l) => l.stage === "quote"), test: (l) => l.stage === "quote" },
            { id: "won", label: "Won", count: count((l) => l.stage === "won"), test: (l) => l.stage === "won" },
            { id: "lost", label: "Lost", count: count((l) => l.stage === "lost"), test: (l) => l.stage === "lost" },
          ]}
        />
      </PageBody>
    </>
  );
}
