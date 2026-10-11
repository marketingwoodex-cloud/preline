import { PageBody, PageHeader } from "@/components/ui/PageHeader";
import { Chart } from "@/components/ui/Chart";
import { dashData } from "@/lib/fixture";
import { CRM_SOURCES, OPEN_STAGES, STAGE_LABEL } from "@/lib/domain";

export const metadata = { title: "Analytics" };

/**
 * Analytics — deep-dive version of the dashboard charts: revenue vs collected,
 * pipeline funnel, lead sources and conversion table. Same v2.1 `dash_data`
 * shape, 90-day window.
 */
export default function AnalyticsPage() {
  const d = dashData(90);
  const crm = d.crm;
  if (!crm) return null;

  const axis = d.axis.map((iso) =>
    new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
  );

  const funnelStages = OPEN_STAGES.concat(["won", "lost"] as const);
  const funnelTotal = funnelStages.reduce((s, st) => s + crm.funnel[st], 0) || 1;

  return (
    <>
      <PageHeader
        title="Analytics"
        description="90-day trends: revenue, pipeline, sources and conversion. Same data the dashboard summarises."
      />
      <PageBody className="space-y-5">
        <div className="grid grid-cols-2 md:grid-cols-4 bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden">
          {[
            { label: "Leads (90d)", value: String(crm.funnel.new + crm.funnel.contacted + crm.funnel.visit + crm.funnel.quote + crm.funnel.hold + crm.funnel.won + crm.funnel.lost) },
            { label: "Won deals", value: String(crm.funnel.won) },
            { label: "Lost deals", value: String(crm.funnel.lost) },
            { label: "Win rate", value: `${Math.round((crm.funnel.won / Math.max(1, crm.funnel.won + crm.funnel.lost)) * 100)}%` },
          ].map((c, i) => (
            <div key={c.label} className={`p-4 sm:p-6 text-center border-card-divider ${i < 3 ? "border-e" : ""} ${i < 2 ? "border-b md:border-b-0" : ""}`}>
              <div className="text-xl sm:text-2xl font-semibold text-primary">{c.value}</div>
              <div className="mt-1 text-sm text-muted-foreground-1">{c.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          <div className="xl:col-span-2 bg-card border border-card-line shadow-2xs rounded-xl p-4 sm:p-6">
            <h2 className="text-sm font-semibold text-foreground">Invoiced vs. collected</h2>
            <p className="text-sm text-muted-foreground-2">Daily, last 90 days</p>
            <Chart
              type="area"
              series={[
                { name: "Invoiced", data: crm.series.invoiced },
                { name: "Collected", data: crm.series.paid },
              ]}
              categories={axis}
              height={320}
              valuePrefix="PKR "
            />
          </div>
          <div className="bg-card border border-card-line shadow-2xs rounded-xl p-4 sm:p-6">
            <h2 className="text-sm font-semibold text-foreground">Leads by source</h2>
            <p className="text-sm text-muted-foreground-2">Top channels, 90 days</p>
            <Chart
              type="donut"
              series={[{ name: "Leads", data: crm.sources.map((s) => s.n) }]}
              categories={crm.sources.map((s) => CRM_SOURCES[s.name] ?? s.name)}
              height={320}
            />
          </div>
        </div>

        <div className="bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-card-line">
            <h2 className="text-sm font-semibold text-foreground">Pipeline conversion</h2>
            <p className="text-sm text-muted-foreground-2">Where leads currently sit</p>
          </div>
          <ul className="divide-y divide-card-divider">
            {funnelStages.map((st) => (
              <li key={st} className="px-6 py-3 flex items-center gap-x-4">
                <span className="w-28 shrink-0 text-sm text-foreground">{STAGE_LABEL[st]}</span>
                <div className="h-2 grow overflow-hidden rounded-full bg-muted">
                  <div className={`h-full rounded-full ${st === "won" ? "bg-teal-500" : st === "lost" ? "bg-red-500" : "bg-primary"}`} style={{ width: `${(crm.funnel[st] / funnelTotal) * 100}%` }} />
                </div>
                <span className="wx-num w-10 text-end text-sm font-semibold text-foreground">{crm.funnel[st]}</span>
              </li>
            ))}
          </ul>
        </div>
      </PageBody>
    </>
  );
}
