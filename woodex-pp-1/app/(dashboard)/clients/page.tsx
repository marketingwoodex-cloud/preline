"use client";

import { PageBody, PageHeader } from "@/components/ui/PageHeader";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { CLIENTS } from "@/lib/fixture";
import { formatPkr, relativeDay, type Client } from "@/lib/domain";
import { Plus } from "lucide-react";


const columns: Column<Client>[] = [
  {
    key: "name",
    header: "Client",
    text: (c) => `${c.name} ${c.email} ${c.phone}`,
    sortValue: (c) => c.name,
    render: (c) => (
      <div className="flex items-center gap-2.5">
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary/15 text-[11px] font-bold text-primary">
          {c.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
        </span>
        <div className="min-w-0">
          <p className="truncate font-medium text-foreground">{c.name}</p>
          <p className="truncate text-xs text-muted-foreground">{c.email}</p>
        </div>
      </div>
    ),
  },
  { key: "city", header: "City", text: (c) => c.city, sortValue: (c) => c.city, render: (c) => <span className="text-muted-foreground">{c.city}</span> },
  {
    key: "value",
    header: "Lifetime value",
    align: "right",
    text: (c) => String(c.value),
    sortValue: (c) => c.value,
    render: (c) => <span className="wx-num font-semibold text-foreground">{formatPkr(c.value)}</span>,
  },
  {
    key: "open",
    header: "Open quotes",
    align: "right",
    text: (c) => String(c.open_quotes),
    sortValue: (c) => c.open_quotes,
    render: (c) => <span className="wx-num text-muted-foreground">{c.open_quotes}</span>,
  },
  {
    key: "unpaid",
    header: "Unpaid",
    align: "right",
    text: (c) => String(c.unpaid),
    sortValue: (c) => c.unpaid,
    render: (c) =>
      c.unpaid ? <span className="wx-num font-medium text-destructive">{formatPkr(c.unpaid)}</span> : <span className="text-muted-foreground/60">—</span>,
  },
  {
    key: "leads",
    header: "Enquiries",
    align: "right",
    text: (c) => String(c.leads.length),
    sortValue: (c) => c.leads.length,
    render: (c) => <span className="wx-num text-muted-foreground">{c.leads.length}</span>,
  },
  {
    key: "last",
    header: "Last activity",
    align: "right",
    text: (c) => c.last_activity,
    sortValue: (c) => c.last_activity,
    render: (c) => <span className="text-xs text-muted-foreground">{relativeDay(c.last_activity)}</span>,
  },
];

export default function ClientsPage() {
  return (
    <>
      <PageHeader
        title="Clients"
        description="One record per client. Enquiries, chats, quotations, invoices and payments all hang off this — matched on phone and email."
        actions={
          <button type="button" className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover">
            <Plus className="size-4" />
            New client
          </button>
        }
      />
      <PageBody>
        <DataTable
          rows={CLIENTS}
          columns={columns}
          rowKey={(c) => c.id}
          searchPlaceholder="Search name, email, phone…"
          emptyTitle="No clients match"
          filters={[
            { id: "unpaid", label: "Has unpaid", count: CLIENTS.filter((c) => c.unpaid > 0).length, test: (c) => c.unpaid > 0 },
            { id: "active", label: "Open quotes", count: CLIENTS.filter((c) => c.open_quotes > 0).length, test: (c) => c.open_quotes > 0 },
          ]}
        />
      </PageBody>
    </>
  );
}
