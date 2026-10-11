import { Copy, Globe2, Layers } from "lucide-react";
import { PageBody, PageHeader } from "@/components/ui/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { Badge } from "@/components/ui/StatusBadge";
import { BLOCKS } from "@/lib/fixture";
import { relativeDay } from "@/lib/domain";

export const metadata = { title: "Section library" };

export default function LibraryPage() {
  const cats = [...new Set(BLOCKS.map((b) => b.cat))];
  const globalCount = BLOCKS.filter((b) => b.global).length;

  return (
    <>
      <PageHeader
        title="Section library"
        description="Saved sections shared between the admin and the page builder. Global blocks are edited once and pushed to every page using them."
        actions={
          <>
            <button type="button" className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background-1 px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted">
              <Copy className="size-4" />
              Import JSON
            </button>
            <button type="button" className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover">
              <Layers className="size-4" />
              New section
            </button>
          </>
        }
      />
      <PageBody className="space-y-5">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          {cats.map((c) => (
            <span key={c} className="rounded-lg border border-border bg-background-1 px-2.5 py-1">
              {c}
              <b className="wx-num ml-1.5 font-semibold text-foreground">{BLOCKS.filter((b) => b.cat === c).length}</b>
            </span>
          ))}
          <span className="ml-auto flex items-center gap-1.5">
            <Globe2 className="size-3.5" />
            {globalCount} global blocks
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {BLOCKS.map((b) => (
            <SectionCard key={b.id} className="flex flex-col" bodyClassName="p-0">
              {/* Scaled preview placeholder — the builder renders the real HTML here */}
              <div className="relative h-32 overflow-hidden rounded-t-xl border-b border-card-divider bg-muted/40">
                <div className="absolute inset-0 grid place-items-center">
                  <div className="w-3/4 space-y-1.5 opacity-60">
                    <div className="h-2 w-2/3 rounded-full bg-primary/40" />
                    <div className="h-1.5 w-full rounded-full bg-border" />
                    <div className="h-1.5 w-5/6 rounded-full bg-border" />
                    <div className="mt-2 flex gap-1.5">
                      <div className="h-4 w-10 rounded bg-primary/30" />
                      <div className="h-4 w-10 rounded bg-border" />
                    </div>
                  </div>
                </div>
                {b.global && (
                  <span className="absolute right-2 top-2">
                    <Badge tone="cyan">global</Badge>
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col p-3.5">
                <h3 className="truncate text-[13px] font-semibold text-foreground">{b.name}</h3>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  {b.cat} · {b.kind}
                </p>

                <div className="mt-2 flex flex-wrap gap-1">
                  {b.tags.map((t) => (
                    <span key={t} className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                      #{t}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex items-center justify-between gap-2 border-t border-card-divider pt-2.5 text-[11px] text-muted-foreground">
                  <span className="wx-num">Used on {b.used_on} pages</span>
                  <span>{relativeDay(b.updated)}</span>
                </div>
              </div>
            </SectionCard>
          ))}
        </div>
      </PageBody>
    </>
  );
}
