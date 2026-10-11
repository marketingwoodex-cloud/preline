"use client";

import { PageBody, PageHeader } from "@/components/ui/PageHeader";
import { BlockPartial } from "@/components/BlockPartial";
import { Plus } from "lucide-react";

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
        {/* Preline block: User Management Table with Filters
            (data-display/user-and-contact-tables). Verbatim block partial
            injected at runtime — tabs, filters, offcanvas and modals included.
            The fixture DataTable above is replaced by the block per the
            block-library directive. */}
        <BlockPartial src="/blocks/user-management-table.html" />
      </PageBody>
    </>
  );
}
