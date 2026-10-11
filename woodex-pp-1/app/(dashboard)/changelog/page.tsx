import { PageBody, PageHeader } from "@/components/ui/PageHeader";

export const metadata = { title: "Changelog" };

const ENTRIES = [
  {
    ver: "2.8.0", when: "2026-10-12", tags: ["Added"],
    items: [
      "Frontend v1 declared: master QA audit passed (57 routes, roles, perf)",
      "Sidebar brand now reads “Admin PP-1 · FE v1”",
      "docs/QA-AUDIT.md + docs/MWOODEX-MASTER-LIST.md (next project plan)",
    ],
  },
  {
    ver: "2.7.0", when: "2026-10-12", tags: ["Added"],
    items: [
      "Reports cluster: sales, site, print center + scheduled deliveries",
      "System screens: tickets, health, audit logs, security, notifications",
      "Production-mode preview: pages open in ~30ms instead of ~1s",
    ],
  },
  {
    ver: "2.6.0", when: "2026-10-11", tags: ["Added", "Fixed"],
    items: [
      "Intelligence suite: AI console, offer engine, prompts, training data, MCP server",
      "Growth tooling: builder, city pages, insights, media, speed lab, redirects",
      "Fixed invisible overlay that swallowed sidebar clicks (search modal)",
    ],
  },
  {
    ver: "2.5.0", when: "2026-10-10", tags: ["Added"],
    items: [
      "Phase 1 ops screens: broadcast, conversations, contracts, approvals, activity",
      "Sidebar served server-side — shell present with zero JavaScript",
      "Hover motion on sidebar rows and icon tiles",
    ],
  },
  {
    ver: "2.4.0", when: "2026-10-08", tags: ["Changed"],
    items: [
      "Block-library rebuild: 8 revenue/CRM screens on Preline blocks",
      "Role switcher with six roles and route-level guards",
    ],
  },
];

const TAG: Record<string, string> = {
  Added: "bg-teal-500/10 text-teal-500 ring-teal-500/25",
  Changed: "bg-primary/10 text-primary ring-primary/25",
  Fixed: "bg-amber-500/10 text-amber-500 ring-amber-500/25",
};

export default function ChangelogPage() {
  return (
    <>
      <PageHeader
        title="Changelog"
        description="What changed in the Woodex PP-1 admin, release by release. Owners get this as the Monday digest."
      />
      <PageBody>
        <div className="relative space-y-8 before:absolute before:inset-y-0 before:start-[15px] before:w-px before:bg-border">
          {ENTRIES.map((e) => (
            <section key={e.ver} className="relative ps-11">
              <span className="absolute start-0 top-1 grid size-8 place-items-center rounded-full bg-primary/10 text-primary ring-4 ring-background">
                <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
              </span>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h2 className="text-sm font-bold text-foreground">v{e.ver}</h2>
                <span className="text-xs text-muted-foreground-1 wx-num">{e.when}</span>
                {e.tags.map((t) => (
                  <span key={t} className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold ring-1 ring-inset ${TAG[t]}`}>{t}</span>
                ))}
              </div>
              <ul className="mt-3 space-y-1.5">
                {e.items.map((it) => (
                  <li key={it} className="flex items-start gap-x-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 size-1.5 rounded-full bg-primary shrink-0" />
                    {it}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </PageBody>
    </>
  );
}
