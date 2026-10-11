"use client";

import { Globe, Plus, Upload } from "lucide-react";
import { PageBody, PageHeader } from "@/components/ui/PageHeader";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { PageBadge, ScoreBadge } from "@/components/ui/StatusBadge";
import { PAGES } from "@/lib/fixture";
import { formatNumber, relativeDay, type SitePage } from "@/lib/domain";


const columns: Column<SitePage>[] = [
  {
    key: "path",
    header: "Page",
    text: (p) => `${p.path} ${p.title}`,
    sortValue: (p) => p.path,
    render: (p) => (
      <div className="min-w-0">
        <p className="wx-num truncate font-medium text-foreground">{p.path}</p>
        <p className="truncate text-xs text-muted-foreground">{p.title}</p>
      </div>
    ),
  },
  {
    key: "type",
    header: "Type",
    text: (p) => p.type,
    sortValue: (p) => p.type,
    render: (p) => <span className="rounded-md bg-muted px-1.5 py-0.5 text-[11px] font-medium capitalize text-muted-foreground">{p.type}</span>,
  },
  { key: "status", header: "Status", text: (p) => p.status, sortValue: (p) => p.status, render: (p) => <PageBadge status={p.status} /> },
  {
    key: "seo",
    header: "SEO",
    align: "center",
    text: (p) => String(p.seo_score),
    sortValue: (p) => p.seo_score,
    render: (p) => <ScoreBadge score={p.seo_score} />,
  },
  {
    key: "issues",
    header: "Issues",
    text: (p) => p.seo_issues.join(" "),
    render: (p) =>
      p.seo_issues.length ? (
        <span className="text-xs text-destructive">{p.seo_issues[0]}</span>
      ) : (
        <span className="text-xs text-muted-foreground/60">Clean</span>
      ),
  },
  {
    key: "views",
    header: "Views 30d",
    align: "right",
    text: (p) => String(p.views_30d),
    sortValue: (p) => p.views_30d,
    render: (p) => <span className="wx-num text-muted-foreground">{formatNumber(p.views_30d)}</span>,
  },
  {
    key: "updated",
    header: "Last edited",
    align: "right",
    text: (p) => `${p.updated_at} ${p.updated_by}`,
    sortValue: (p) => p.updated_at,
    render: (p) => (
      <div className="text-right">
        <p className="text-xs text-muted-foreground">{relativeDay(p.updated_at)}</p>
        <p className="text-[10px] text-muted-foreground/70">{p.updated_by}</p>
      </div>
    ),
  },
];

export default function PagesPage() {
  const count = (test: (p: SitePage) => boolean) => PAGES.filter(test).length;
  const avg = Math.round(PAGES.reduce((s, p) => s + p.seo_score, 0) / PAGES.length);

  return (
    <>
      <PageHeader
        title="Pages"
        description={`${PAGES.length} pages across services, cities, projects and the blog. Status changes write to the managed .htaccess block and rebuild sitemap.xml.`}
        actions={
          <>
            <button type="button" className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background-1 px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted">
              <Upload className="size-4" />
              Bulk SEO audit
            </button>
            <button type="button" className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover">
              <Plus className="size-4" />
              New page
            </button>
          </>
        }
      />
      <PageBody className="space-y-5">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { label: "Total pages", value: PAGES.length },
            { label: "Published", value: count((p) => p.status === "published") },
            { label: "Drafts", value: count((p) => p.status === "draft") },
            { label: "Average SEO", value: avg },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-card-line bg-card px-4 py-3">
              <p className="text-[13px] text-muted-foreground">{s.label}</p>
              <p className="wx-num mt-1 text-2xl font-bold text-foreground">{s.value}</p>
            </div>
          ))}
        </div>

        <DataTable
          rows={PAGES}
          columns={columns}
          rowKey={(p) => p.id}
          searchPlaceholder="Search path or title…"
          emptyTitle="No pages match"
          toolbar={
            <span className="hidden items-center gap-1.5 text-xs text-muted-foreground sm:flex">
              <Globe className="size-3.5" />
              {count((p) => p.seo_issues.length > 0)} with SEO issues
            </span>
          }
          filters={[
            { id: "published", label: "Published", count: count((p) => p.status === "published"), test: (p) => p.status === "published" },
            { id: "hidden", label: "Hidden", count: count((p) => p.status === "hidden"), test: (p) => p.status === "hidden" },
            { id: "draft", label: "Draft", count: count((p) => p.status === "draft"), test: (p) => p.status === "draft" },
            { id: "issues", label: "Has issues", count: count((p) => p.seo_issues.length > 0), test: (p) => p.seo_issues.length > 0 },
          ]}
        />
      </PageBody>
    </>
  );
}
