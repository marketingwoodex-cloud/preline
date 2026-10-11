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

        {/* Client 360 — one record, full timeline (P29 parity: central client DB) */}
        <div className="mt-6 grid grid-cols-1 xl:grid-cols-3 gap-5">
          <div className="xl:col-span-2 bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-card-line flex items-center gap-x-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface-5 border border-line-3 text-xs font-semibold text-foreground">AK</span>
              <div className="min-w-0 grow">
                <h2 className="text-sm font-semibold text-foreground">Client 360 — Ayesha Khan</h2>
                <p className="text-[11px] text-muted-foreground-1">+92 300 ••• •214 · ayesha@… · DHA Phase 6 · matched on phone + email</p>
              </div>
              <span className="inline-flex items-center rounded-md px-1.5 py-0.5 text-[11px] font-semibold bg-teal-500/10 text-teal-500 ring-1 ring-inset ring-teal-500/25">LTV PKR 46L</span>
            </div>
            <ul className="divide-y divide-card-divider">
              {[
                { when: "Today 10:51", what: "Quote Q-124 drafted", tag: "sales", tone: "text-primary" },
                { when: "Today 10:42", what: "WhatsApp reply on T-1042 (walnut sample)", tag: "chat", tone: "text-sky-500" },
                { when: "Oct 10", what: "Site visit completed · measure sheet attached", tag: "crm", tone: "text-teal-500" },
                { when: "Oct 08", what: "Advance PKR 2.0L recorded · receipt sent", tag: "money", tone: "text-teal-500" },
                { when: "Oct 04", what: "Note: prefers evening calls; referred by Hina R.", tag: "note", tone: "text-muted-foreground" },
              ].map((e, i) => (
                <li key={i} className="px-5 py-3 flex items-center gap-x-3">
                  <span className={`size-2 rounded-full shrink-0 bg-current ${e.tone}`} />
                  <p className="min-w-0 grow text-sm text-foreground">{e.what}</p>
                  <span className={`shrink-0 text-[10px] font-semibold uppercase tracking-wide ${e.tone}`}>{e.tag}</span>
                  <span className="shrink-0 text-[11px] text-muted-foreground-1 wx-num">{e.when}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Milestone engine — 4 stages, bilingual */}
          <div className="bg-card border border-card-line shadow-2xs rounded-xl p-5 self-start">
            <h2 className="text-sm font-semibold text-foreground">Project milestones</h2>
            <p className="mt-1 text-[11px] text-muted-foreground-1">Client sees these in EN/UR with stage photos + review link.</p>
            <ul className="mt-4 space-y-3">
              {[
                { en: "Design approved", ur: "ڈیزائن منظور", state: "done" },
                { en: "In production", ur: "تیاری جاری", state: "now" },
                { en: "Installation", ur: "تنصیب", state: "next" },
                { en: "Handover", ur: "حوالی", state: "next" },
              ].map((m) => (
                <li key={m.en} className="flex items-center gap-x-3">
                  <span className={`grid size-7 shrink-0 place-items-center rounded-full text-[10px] font-bold ${m.state === "done" ? "bg-teal-500/10 text-teal-500" : m.state === "now" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                    {m.state === "done" ? "✓" : "•"}
                  </span>
                  <div className="min-w-0 grow">
                    <p className="text-sm font-medium text-foreground">{m.en}</p>
                    <p className="text-[11px] text-muted-foreground-1">{m.ur}</p>
                  </div>
                  {m.state === "now" && <span className="shrink-0 text-[10px] font-semibold text-primary">2 photos shared</span>}
                </li>
              ))}
            </ul>
            <button type="button" className="mt-4 w-full py-2 px-3 inline-flex justify-center items-center text-xs font-medium rounded-lg border border-border bg-layer text-layer-foreground hover:bg-layer-hover focus:outline-hidden">
              Send update + review link
            </button>
          </div>
        </div>
      </PageBody>
    </>
  );
}
