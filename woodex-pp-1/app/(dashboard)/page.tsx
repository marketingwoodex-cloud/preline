import Link from "next/link";
import {
  AlertTriangle,
  ArrowUpRight,
  CalendarClock,
  CircleDollarSign,
  FileText,
  FolderKanban,
  Gauge,
  Globe,
  Receipt,
  TrendingUp,
  Users,
} from "lucide-react";

import { PageBody, PageHeader } from "@/components/ui/PageHeader";
import { KpiCard } from "@/components/ui/KpiCard";
import { SectionCard } from "@/components/ui/SectionCard";
import { Chart } from "@/components/ui/Chart";
import { StageBadge, ScoreBadge, Badge } from "@/components/ui/StatusBadge";
import { dashData } from "@/lib/fixture";
import { CRM_SOURCES, OPEN_STAGES, STAGE_LABEL, formatNumber, formatPkr } from "@/lib/domain";

export const metadata = { title: "Dashboard" };

/**
 * Dashboard overview.
 *
 * Data shape is the v2.1 `dash_data` response, so swapping `dashData()` for a
 * fetch against `/api/admin.php?action=dash_data` is the only change needed to
 * go live. The v2.1 audit's complaint about its own dashboard — "It shows
 * website numbers only. No leads pipeline, quotes, invoices, chats or projects"
 * (ADMIN-DEEP-AUDIT-AND-PLAN.md §1, point 6) — is what this layout answers:
 * business numbers first, website demoted to a single panel at the bottom.
 */
export default function DashboardPage() {
  const d = dashData(28);
  const crm = d.crm;
  if (!crm) return null;

  const { kpi } = crm;
  const targetPct = crm.target.target > 0 ? Math.min(100, (crm.target.month / crm.target.target) * 100) : 0;

  const axisLabels = d.axis.map((iso) => {
    const dt = new Date(iso);
    return dt.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  });
  const bucket = (n: number) => axisLabels.filter((_, i) => i % Math.ceil(axisLabels.length / n) === 0);

  const revenueSeries = [
    { name: "Invoiced", data: crm.series.invoiced },
    { name: "Collected", data: crm.series.paid },
  ];

  const funnelSeries = [{ name: "Leads", data: OPEN_STAGES.concat(["won", "lost"]).map((s) => crm.funnel[s]) }];

  return (
    <>
      <PageHeader
        title="Business overview"
        description={`Last ${d.days} days · ${crm.target.monthLabel}. Figures cover enquiries, quotes, invoices and live projects across all branches.`}
        actions={
          <>
            <div className="inline-flex rounded-lg border border-border bg-background-1 p-0.5" role="group" aria-label="Date range">
              {[7, 28, 90].map((n) => (
                <Link
                  key={n}
                  href={`/?days=${n}`}
                  className={
                    n === d.days
                      ? "rounded-md bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground"
                      : "rounded-md px-2.5 py-1 text-xs font-medium text-muted-foreground hover:text-foreground"
                  }
                  aria-current={n === d.days ? "true" : undefined}
                >
                  {n}d
                </Link>
              ))}
            </div>
            <Link
              href="/quotations"
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              New quotation
              <ArrowUpRight className="size-4" />
            </Link>
          </>
        }
      />

      <PageBody className="space-y-5">
        {/* KPI strip */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
          <KpiCard label="New enquiries" value={formatNumber(kpi.leads[0])} icon={Users} current={kpi.leads[0]} previous={kpi.leads[1]} spark={crm.series.leads} hint={`${crm.chips.new} unread`} />
          <KpiCard label="Open pipeline" value={formatPkr(kpi.pipeline)} icon={FolderKanban} hint={`${OPEN_STAGES.reduce((s, st) => s + crm.funnel[st], 0)} live leads`} spark={crm.series.sent} />
          <KpiCard label="Quotes sent" value={formatNumber(kpi.quotesSent[0])} icon={FileText} current={kpi.quotesSent[0]} previous={kpi.quotesSent[1]} hint={`${kpi.openQuotes[0]} awaiting reply`} spark={crm.series.won} />
          <KpiCard label="Collected" value={formatPkr(kpi.paid[0])} icon={CircleDollarSign} current={kpi.paid[0]} previous={kpi.paid[1]} spark={crm.series.paid} hint={`${kpi.won} deals won`} />
          <KpiCard label="Outstanding" value={formatPkr(kpi.unpaid)} icon={Receipt} invert hint={`${crm.overdueN} invoices overdue`} />
          <KpiCard label="Website" value={`${d.website.pages}`} icon={Globe} hint={`${d.website.published} live · ${d.website.drafts} drafts`} />
        </div>

        {/* Target + attention */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          <SectionCard
            title={`${crm.target.monthLabel} collection target`}
            subtitle="Rolling month-to-date against the owner-set target"
            className="xl:col-span-1"
          >
            <div className="flex items-end justify-between gap-3">
              <p className="wx-num text-2xl font-bold text-foreground">{formatPkr(crm.target.month)}</p>
              <span className="wx-num text-sm font-semibold text-primary">{targetPct.toFixed(0)}%</span>
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuenow={Math.round(targetPct)} aria-valuemin={0} aria-valuemax={100}>
              <div className="h-full rounded-full bg-primary transition-[width] duration-500" style={{ width: `${targetPct}%` }} />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Target <span className="wx-num font-medium text-foreground">{formatPkr(crm.target.target)}</span> · gap{" "}
              <span className="wx-num font-medium text-foreground">{formatPkr(Math.max(0, crm.target.target - crm.target.month))}</span>
            </p>

            <div className="mt-4 grid grid-cols-3 gap-2 border-t border-card-divider pt-3">
              {[
                { label: "Unread", n: crm.chips.new },
                { label: "Overdue", n: crm.chips.overdue },
                { label: "Follow-ups", n: crm.chips.follow },
              ].map((c) => (
                <div key={c.label} className="rounded-lg bg-muted/60 px-2 py-2 text-center">
                  <p className="wx-num text-lg font-bold text-foreground">{c.n}</p>
                  <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{c.label}</p>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard
            title="Needs attention"
            subtitle="Ordered by how long it has been waiting"
            className="xl:col-span-2"
            actions={<Link href="/enquiries" className="text-xs font-semibold text-primary hover:underline">Open enquiries</Link>}
          >
            <ul className="divide-y divide-card-divider">
              {crm.followups.slice(0, 3).map((f) => (
                <li key={`fu-${f.id}`} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-secondary/10 text-secondary">
                    <CalendarClock className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-medium text-foreground">{f.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {f.service} · follow-up {f.followup}
                    </p>
                  </div>
                  <StageBadge stage={f.stage} />
                  {f.late && <Badge tone="red">late</Badge>}
                </li>
              ))}

              {crm.overdue.slice(0, 3).map((o) => (
                <li key={`ov-${o.id}`} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-destructive/10 text-destructive">
                    <AlertTriangle className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-medium text-foreground">
                      {o.no} · {o.client}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">Due {o.due}</p>
                  </div>
                  <span className="wx-num text-[13px] font-semibold text-destructive">{formatPkr(o.balance)}</span>
                </li>
              ))}

              {crm.followups.length === 0 && crm.overdue.length === 0 && (
                <li className="py-6 text-center text-sm text-muted-foreground">Nothing overdue. Enjoy it.</li>
              )}
            </ul>
          </SectionCard>
        </div>

        {/* Revenue + funnel */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          <SectionCard
            title="Invoiced vs. collected"
            subtitle={`Daily, last ${d.days} days`}
            className="xl:col-span-2"
            actions={
              <span className="hidden items-center gap-3 text-[11px] text-muted-foreground sm:flex">
                <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-[var(--chart-1)]" />Invoiced</span>
                <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-[var(--chart-2)]" />Collected</span>
              </span>
            }
          >
            <Chart type="area" series={revenueSeries} categories={axisLabels} height={290} valuePrefix="PKR " />
          </SectionCard>

          <SectionCard title="Pipeline by stage" subtitle="Open stages plus terminal outcomes">
            <Chart
              type="bar"
              series={funnelSeries}
              categories={OPEN_STAGES.concat(["won", "lost"]).map((s) => STAGE_LABEL[s])}
              height={290}
              horizontal
            />
          </SectionCard>
        </div>

        {/* Enquiries + sources + website */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          <SectionCard
            title="Recent enquiries"
            subtitle="Newest first, all sources"
            className="xl:col-span-2"
            bodyClassName="p-0"
            actions={<Link href="/enquiries" className="text-xs font-semibold text-primary hover:underline">View all</Link>}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-card-divider bg-muted/40 text-[11px] uppercase tracking-wide text-muted-foreground">
                  <tr>
                    <th className="px-4 py-2.5 font-semibold">Client</th>
                    <th className="px-4 py-2.5 font-semibold">Service</th>
                    <th className="px-4 py-2.5 font-semibold">Source</th>
                    <th className="px-4 py-2.5 font-semibold">Stage</th>
                    <th className="px-4 py-2.5 text-right font-semibold">When</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-card-divider">
                  {crm.recent.map((r) => (
                    <tr key={r.id} className="transition-colors hover:bg-muted/40">
                      <td className="px-4 py-2.5">
                        <span className="flex items-center gap-2">
                          {!r.is_read && <span className="size-1.5 rounded-full bg-primary" aria-label="Unread" />}
                          <span className="font-medium text-foreground">{r.name}</span>
                        </span>
                      </td>
                      <td className="max-w-52 truncate px-4 py-2.5 text-muted-foreground">{r.service || "—"}</td>
                      <td className="px-4 py-2.5 text-muted-foreground">{CRM_SOURCES[r.source] ?? r.source}</td>
                      <td className="px-4 py-2.5"><StageBadge stage={r.stage} /></td>
                      <td className="wx-num px-4 py-2.5 text-right text-muted-foreground">{r.created_at.slice(0, 10)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>

          <div className="space-y-5">
            <SectionCard title="Leads by source" subtitle={`Top ${crm.sources.length}, last ${d.days} days`}>
              <Chart
                type="donut"
                series={[{ name: "Leads", data: crm.sources.map((s) => s.n) }]}
                categories={crm.sources.map((s) => CRM_SOURCES[s.name] ?? s.name)}
                height={248}
              />
            </SectionCard>

            <SectionCard
              title="Website health"
              subtitle="Small panel by design — business first"
              actions={<Link href="/seo" className="text-xs font-semibold text-primary hover:underline">SEO</Link>}
            >
              <dl className="space-y-2.5">
                {[
                  { label: "Speed score", value: d.website.speed, icon: Gauge, suffix: "/100" },
                  { label: "Health score", value: d.website.health, icon: TrendingUp, suffix: "/100" },
                  { label: "Average SEO", value: d.website.avg_seo, icon: Globe, suffix: "/100" },
                ].map((row) => (
                  <div key={row.label} className="flex items-center gap-3">
                    <row.icon className="size-4 shrink-0 text-muted-foreground" />
                    <dt className="flex-1 text-[13px] text-muted-foreground">{row.label}</dt>
                    <dd className="wx-num text-[13px] font-semibold text-foreground">
                      {row.value}
                      <span className="text-muted-foreground">{row.suffix}</span>
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-3 flex flex-wrap gap-2 border-t border-card-divider pt-3 text-xs">
                <Badge tone={d.website.broken_links ? "red" : "green"}>{d.website.broken_links} broken links</Badge>
                <Badge tone={d.website.heavy_images ? "gold" : "green"}>{d.website.heavy_images} heavy images</Badge>
                <Badge tone="neutral">{d.website.published} published</Badge>
              </div>
            </SectionCard>
          </div>
        </div>
      </PageBody>
    </>
  );
}
