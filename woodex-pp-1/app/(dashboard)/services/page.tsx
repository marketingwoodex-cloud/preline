import { Building2, Plus } from "lucide-react";
import { PageBody, PageHeader } from "@/components/ui/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { Badge } from "@/components/ui/StatusBadge";
import { SERVICE_PAGES } from "@/lib/fixture";
import { formatNumber } from "@/lib/domain";

export const metadata = { title: "Services" };

export default function ServicesPage() {
  const totalPages = SERVICE_PAGES.reduce((s, x) => s + x.pages, 0);
  const totalLeads = SERVICE_PAGES.reduce((s, x) => s + x.leads_30d, 0);

  return (
    <>
      <PageHeader
        title="Services"
        description="Service lines and the pages generated from them. Each service can spawn city variants (Service × City) from a template."
        actions={
          <button type="button" className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover">
            <Plus className="size-4" />
            New service
          </button>
        }
      />
      <PageBody className="space-y-5">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {[
            { label: "Service lines", value: SERVICE_PAGES.length },
            { label: "Generated pages", value: totalPages },
            { label: "Leads (30d)", value: formatNumber(totalLeads) },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-card-line bg-card px-4 py-3">
              <p className="text-[13px] text-muted-foreground">{s.label}</p>
              <p className="wx-num mt-1 text-2xl font-bold text-foreground">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {SERVICE_PAGES.map((s) => (
            <SectionCard key={s.id} className="flex flex-col">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Building2 className="size-4" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-foreground">{s.name}</h3>
                    <p className="wx-num truncate text-xs text-muted-foreground">/{s.slug}/</p>
                  </div>
                </div>
                <Badge tone={s.status === "live" ? "green" : "neutral"}>{s.status}</Badge>
              </div>

              <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-card-divider pt-3 text-center">
                <div>
                  <dt className="text-[10px] uppercase tracking-wide text-muted-foreground">Pages</dt>
                  <dd className="wx-num text-lg font-bold text-foreground">{s.pages}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-wide text-muted-foreground">Leads 30d</dt>
                  <dd className="wx-num text-lg font-bold text-primary">{s.leads_30d}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-wide text-muted-foreground">Enquiries</dt>
                  <dd className="wx-num text-lg font-bold text-foreground">{s.enquiries}</dd>
                </div>
              </dl>
            </SectionCard>
          ))}
        </div>
      </PageBody>
    </>
  );
}
