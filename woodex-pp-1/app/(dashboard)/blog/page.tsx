"use client";

import { Newspaper, PenLine } from "lucide-react";
import { PageBody, PageHeader } from "@/components/ui/PageHeader";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { Badge } from "@/components/ui/StatusBadge";
import { POSTS } from "@/lib/fixture";
import { formatNumber, relativeDay, type Post } from "@/lib/domain";


const columns: Column<Post>[] = [
  {
    key: "title",
    header: "Post",
    text: (p) => `${p.title} ${p.slug}`,
    sortValue: (p) => p.title,
    render: (p) => (
      <div className="min-w-0">
        <p className="truncate font-medium text-foreground">{p.title}</p>
        <p className="wx-num truncate text-xs text-muted-foreground">/insights/{p.slug}/</p>
      </div>
    ),
  },
  {
    key: "category",
    header: "Category",
    text: (p) => p.category,
    sortValue: (p) => p.category,
    render: (p) => <span className="rounded-md bg-muted px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground">{p.category}</span>,
  },
  {
    key: "status",
    header: "Status",
    text: (p) => p.status,
    sortValue: (p) => p.status,
    render: (p) => <Badge tone={p.status === "published" ? "green" : "neutral"}>{p.status}</Badge>,
  },
  { key: "author", header: "Author", text: (p) => p.author, sortValue: (p) => p.author, render: (p) => <span className="text-muted-foreground">{p.author}</span> },
  {
    key: "read",
    header: "Read",
    align: "right",
    text: (p) => String(p.read_minutes),
    sortValue: (p) => p.read_minutes,
    render: (p) => <span className="wx-num text-xs text-muted-foreground">{p.read_minutes} min</span>,
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
    key: "published",
    header: "Published",
    align: "right",
    text: (p) => p.published_at,
    sortValue: (p) => p.published_at,
    render: (p) => <span className="text-xs text-muted-foreground">{relativeDay(p.published_at)}</span>,
  },
];

export default function BlogPage() {
  const count = (test: (p: Post) => boolean) => POSTS.filter(test).length;
  const totalViews = POSTS.reduce((s, p) => s + p.views_30d, 0);

  return (
    <>
      <PageHeader
        title="Blog"
        description="Insights and cost guides. Each post renders from the article template and picks up FAQ schema when assigned to a group."
        actions={
          <>
            <button type="button" className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background-1 px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted">
              <Newspaper className="size-4" />
              Import existing
            </button>
            <button type="button" className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover">
              <PenLine className="size-4" />
              Write post
            </button>
          </>
        }
      />
      <PageBody className="space-y-5">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { label: "Posts", value: POSTS.length },
            { label: "Published", value: count((p) => p.status === "published") },
            { label: "Drafts", value: count((p) => p.status === "draft") },
            { label: "Views (30d)", value: formatNumber(totalViews) },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-card-line bg-card px-4 py-3">
              <p className="text-[13px] text-muted-foreground">{s.label}</p>
              <p className="wx-num mt-1 text-2xl font-bold text-foreground">{s.value}</p>
            </div>
          ))}
        </div>

        <DataTable
          rows={POSTS}
          columns={columns}
          rowKey={(p) => p.id}
          searchPlaceholder="Search title or slug…"
          emptyTitle="No posts match"
          filters={[
            { id: "published", label: "Published", count: count((p) => p.status === "published"), test: (p) => p.status === "published" },
            { id: "draft", label: "Draft", count: count((p) => p.status === "draft"), test: (p) => p.status === "draft" },
          ]}
        />
      </PageBody>
    </>
  );
}
