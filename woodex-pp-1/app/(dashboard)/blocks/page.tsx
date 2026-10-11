import { PageBody, PageHeader } from "@/components/ui/PageHeader";

export const metadata = { title: "Block Library" };

const FAMILIES = [
  { name: "Dashboard Sidebars", cat: "Navigation Layouts", used: "Shell", count: 1, note: "Classic Dashboard Sidebar — full 10-group IA" },
  { name: "Dashboard Headers", cat: "Navigation Layouts", used: "Shell", count: 1, note: "Classic header with search overlay + notifications" },
  { name: "Analytics & KPIs", cat: "Data Display", used: "/ /analytics", count: 4, note: "KPI grids, ranking cards, progress cards" },
  { name: "Tables & Records", cat: "Data Display", used: "9 screens", count: 6, note: "User/contact/admin tables with filters + pagination" },
  { name: "Planning Boards", cat: "Productivity", used: "/pipeline", count: 1, note: "Kanban board with drag-between-columns" },
  { name: "Chat & Inbox", cat: "Communication", used: "/threads /chat", count: 2, note: "Thread list + message bubbles + timeline events" },
  { name: "Activity Feeds", cat: "Communication", used: "/ /activity", count: 2, note: "Collapsible feed with file chips" },
  { name: "Blog & Articles", cat: "Content", used: "/blog", count: 2, note: "Post list + analytics rail" },
  { name: "Creation Forms", cat: "Forms", used: "/blog editor", count: 2, note: "Content/Settings/SEO tabs, dropzone, WYSIWYG" },
  { name: "Workspaces & Admin", cat: "Application Pages", used: "Phase 3", count: 2, note: "Integrations grid + horizontal tabs" },
  { name: "Profiles & Accounts", cat: "Application Pages", used: "Phase 3", count: 2, note: "Member cards with PRO badges + project stat cards" },
  { name: "Admin Utility Tables", cat: "Data Display", used: "Phase 3", count: 3, note: "API keys, team management, export history" },
];

export default function BlocksPage() {
  return (
    <>
      <PageHeader
        title="Block Library"
        description="The Preline block families this admin is assembled from — every screen maps to a family, no custom design system. Pro block HTML is copied verbatim and themed."
      />
      <PageBody>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {FAMILIES.map((f) => (
            <div key={f.name} className="group bg-card border border-card-line shadow-2xs rounded-xl p-5 transition-shadow hover:shadow-md">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground-1">{f.cat}</p>
                  <h2 className="mt-1 text-sm font-semibold text-foreground">{f.name}</h2>
                </div>
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" /></svg>
                </span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground-1">{f.note}</p>
              <div className="mt-4 flex items-center justify-between border-t border-card-divider pt-3">
                <span className="inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold bg-primary/10 text-primary">{f.used}</span>
                <span className="text-[11px] text-muted-foreground-1 wx-num">{f.count} block{f.count > 1 ? "s" : ""}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-5 text-xs text-muted-foreground-1">
          Rule: new screens must reuse a family above before any new markup is written. Theme tokens live in the Woodex Obsidian + Cyan palette only.
        </p>
      </PageBody>
    </>
  );
}
