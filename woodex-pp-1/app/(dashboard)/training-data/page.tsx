import { PageBody, PageHeader } from "@/components/ui/PageHeader";

export const metadata = { title: "Training Data" };

const KPIS = [
  { label: "Records in use", value: "18,420", note: "across 6 datasets" },
  { label: "Consent-filtered", value: "100%", note: "opt-out contacts excluded" },
  { label: "PII masked", value: "phones · CNIC · margins", note: "before any training run" },
  { label: "Last retrain", value: "2026-10-09", note: "next window Oct 23" },
];

const SETS = [
  { name: "Closed conversations", records: "9,240", source: "WhatsApp + web chat exports", quality: 96, status: "In use" },
  { name: "Won/lost quotes", records: "3,180", source: "CRM quote ledger", quality: 98, status: "In use" },
  { name: "Site-visit outcomes", records: "1,460", source: "Task notes + call logs", quality: 91, status: "In use" },
  { name: "Published content", records: "310", source: "woodex.pk pages + blog", quality: 97, status: "In use" },
  { name: "Complaint resolutions", records: "220", source: "Tickets + threads (anonymized)", quality: 93, status: "Queued" },
  { name: "Vendor price book (old)", records: "4,010", source: "2024 purchases", quality: 61, status: "Archived" },
];

const PILL: Record<string, string> = {
  "In use": "bg-teal-500/10 text-teal-500 ring-teal-500/25",
  Queued: "bg-amber-500/10 text-amber-500 ring-amber-500/25",
  Archived: "bg-muted text-muted-foreground ring-border",
};

const tone = (n: number) => (n >= 90 ? "text-teal-500" : n >= 70 ? "text-amber-500" : "text-destructive");

export default function TrainingDataPage() {
  return (
    <>
      <PageHeader
        title="Training Data"
        description="What the models learn from — consented, anonymized and quality-graded. Archived sets never reach a training run."
      />
      <PageBody>
        <div className="grid grid-cols-2 gap-5 xl:grid-cols-4">
          {KPIS.map((k) => (
            <div key={k.label} className="bg-card border border-card-line shadow-2xs rounded-xl p-4">
              <p className="text-xs text-muted-foreground-1">{k.label}</p>
              <p className="mt-1 text-xl font-bold text-foreground wx-num">{k.value}</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground-1">{k.note}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-card-line">
            <h2 className="text-sm font-semibold text-foreground">Datasets</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-card-divider">
              <thead className="bg-surface">
                <tr>
                  {["Dataset", "Records", "Source", "Quality", "Status"].map((h) => (
                    <th key={h} scope="col" className="px-4 py-2.5 text-start text-xs font-medium uppercase tracking-wide text-muted-foreground-1">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-card-divider">
                {SETS.map((s) => (
                  <tr key={s.name} className="transition-colors hover:bg-muted/40">
                    <td className="px-4 py-2.5 font-medium text-foreground whitespace-nowrap">{s.name}</td>
                    <td className="wx-num px-4 py-2.5 text-muted-foreground">{s.records}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">{s.source}</td>
                    <td className={`px-4 py-2.5 font-bold wx-num ${tone(s.quality)}`}>{s.quality}</td>
                    <td className="px-4 py-2.5">
                      <span className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${PILL[s.status]}`}>{s.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 border-t border-card-line bg-surface">
            <p className="text-[11px] text-muted-foreground-1">
              Pipeline: export → consent filter → PII mask → dedupe → quality grade → training window (bi-weekly, owner-approved).
            </p>
          </div>
        </div>
      </PageBody>
    </>
  );
}
