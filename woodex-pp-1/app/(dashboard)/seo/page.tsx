import { AlertTriangle, Gauge, Globe, Link2Off, Search } from "lucide-react";
import { PageBody, PageHeader } from "@/components/ui/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { Chart } from "@/components/ui/Chart";
import { ScoreBadge, Badge } from "@/components/ui/StatusBadge";
import { PAGES, dashData } from "@/lib/fixture";

export const metadata = { title: "SEO" };

export default function SeoPage() {
  const d = dashData(28);
  const withIssues = PAGES.filter((p) => p.seo_issues.length > 0);

  const bands = [
    { label: "90–100", min: 90, max: 101 },
    { label: "75–89", min: 75, max: 90 },
    { label: "60–74", min: 60, max: 75 },
    { label: "Below 60", min: 0, max: 60 },
  ];
  const bandCounts = bands.map((b) => PAGES.filter((p) => p.seo_score >= b.min && p.seo_score < b.max).length);

  return (
    <>
      <PageHeader
        title="SEO"
        description="Site-wide SEO position: per-page scores, structural issues, Core Web Vitals and the redirect rules currently in the managed .htaccess block."
        actions={
          <button type="button" className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover">
            <Search className="size-4" />
            Run full audit
          </button>
        }
      />
      <PageBody className="space-y-5">
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          <SectionCard title="Score distribution" subtitle={`Across ${PAGES.length} pages`} className="xl:col-span-2">
            <Chart
              type="bar"
              series={[{ name: "Pages", data: bandCounts }]}
              categories={bands.map((b) => b.label)}
              height={240}
            />
          </SectionCard>

          <SectionCard title="Site vitals" subtitle="Latest scan">
            <dl className="space-y-3">
              {[
                { label: "Speed score", value: d.website.speed, icon: Gauge, tone: "cyan" as const },
                { label: "Health score", value: d.website.health, icon: Globe, tone: "gold" as const },
                { label: "Average SEO", value: d.website.avg_seo, icon: Search, tone: "cyan" as const },
              ].map((row) => (
                <div key={row.label} className="flex items-center gap-3">
                  <row.icon className="size-4 shrink-0 text-muted-foreground" />
                  <dt className="flex-1 text-[13px] text-muted-foreground">{row.label}</dt>
                  <dd>
                    <ScoreBadge score={row.value} />
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-4 space-y-2 border-t border-card-divider pt-3">
              <div className="flex items-center gap-2 text-xs">
                <Link2Off className="size-3.5 text-destructive" />
                <span className="flex-1 text-muted-foreground">Broken links</span>
                <b className="wx-num font-semibold text-foreground">{d.website.broken_links}</b>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <AlertTriangle className="size-3.5 text-secondary" />
                <span className="flex-1 text-muted-foreground">Images over 200 KB</span>
                <b className="wx-num font-semibold text-foreground">{d.website.heavy_images}</b>
              </div>
            </div>
          </SectionCard>
        </div>

        <SectionCard
          title="Pages with issues"
          subtitle={`${withIssues.length} pages need attention before the next crawl`}
          bodyClassName="p-0"
        >
          <ul className="divide-y divide-card-divider">
            {withIssues.length === 0 && <li className="px-4 py-8 text-center text-sm text-muted-foreground">Every page passes. Nothing to fix.</li>}
            {withIssues.map((p) => (
              <li key={p.id} className="flex flex-wrap items-center gap-3 px-4 py-3">
                <div className="min-w-0 flex-1">
                  <p className="wx-num truncate text-[13px] font-medium text-foreground">{p.path}</p>
                  <p className="truncate text-xs text-muted-foreground">{p.title}</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {p.seo_issues.map((i) => (
                    <Badge key={i} tone="red">
                      {i}
                    </Badge>
                  ))}
                </div>
                <ScoreBadge score={p.seo_score} />
              </li>
            ))}
          </ul>
        </SectionCard>
      </PageBody>
    </>
  );
}
