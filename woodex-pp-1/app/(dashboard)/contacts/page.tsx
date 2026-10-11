"use client";

import { PageBody, PageHeader } from "@/components/ui/PageHeader";
import { BlockPartial } from "@/components/BlockPartial";

/**
 * Contacts — reuses the User Management Table with Filters block
 * (data-display/user-and-contact-tables): tabs, search, filters, offcanvas
 * details and import/export modals all come from the block partial.
 */
export default function ContactsPage() {
  return (
    <>
      <PageHeader
        title="Contacts"
        description="Every person who has ever reached Woodex — matched across WhatsApp, web forms, calls and email."
      />
      <PageBody>
        <BlockPartial src="/blocks/user-management-table.html" />
      </PageBody>
    </>
  );
}
