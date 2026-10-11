import { PageBody, PageHeader } from "@/components/ui/PageHeader";

export const metadata = { title: "Broadcast Templates" };

const TEMPLATES = [
  { name: "Quote follow-up (warm)", channel: "WhatsApp", status: "Approved", used: 46, updated: "2026-10-09", preview: "Salam {first_name}! Your quote {quote_no} for {project} is ready — want me to walk you through it on a 5-min call?" },
  { name: "Site visit reminder", channel: "SMS", status: "Approved", used: 31, updated: "2026-10-05", preview: "Woodex: reminder — site visit tomorrow {time}. Team arrives with sample kit. Reply 1 to confirm." },
  { name: "Monthly kitchen gallery", channel: "Email", status: "Approved", used: 12, updated: "2026-09-28", preview: "Five kitchens we finished this month in DHA & Bahria — plus the veneers clients chose most." },
  { name: "Inactive client win-back", channel: "WhatsApp", status: "Draft", used: 0, updated: "2026-10-11", preview: "It's been a while {first_name}! We're holding a free refit assessment slot this month — shall we book you in?" },
  { name: "Payment receipt + review", channel: "WhatsApp", status: "Approved", used: 58, updated: "2026-09-20", preview: "Payment received — shukriya {first_name}! If the finish made you smile, a Google review helps our karigars a lot." },
  { name: "Eid collection teaser", channel: "Email", status: "Approved", used: 8, updated: "2026-09-15", preview: "The Eid collection drops Friday: walnut, brass inlay and hand-matched marquetry. First look for past clients." },
];

const PILL: Record<string, string> = {
  Approved: "bg-teal-500/10 text-teal-500 ring-teal-500/25",
  Draft: "bg-muted text-muted-foreground ring-border",
};

const CHANNEL: Record<string, string> = {
  WhatsApp: "bg-emerald-500/10 text-emerald-500",
  Email: "bg-primary/10 text-primary",
  SMS: "bg-secondary/10 text-secondary",
};

export default function TemplatesPage() {
  return (
    <>
      <PageHeader
        title="Templates"
        description="Reusable broadcast messages. Approved templates can be queued from Campaigns or Schedules; drafts stay private."
        actions={
          <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg bg-primary border border-primary-line text-primary-foreground hover:bg-primary-hover focus:outline-hidden focus:bg-primary-focus">
            New template
          </button>
        }
      />
      <PageBody>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {TEMPLATES.map((t) => (
            <div key={t.name} className="bg-card border border-card-line shadow-2xs rounded-xl p-5 flex flex-col gap-3 transition-shadow hover:shadow-md">
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-sm font-semibold text-foreground">{t.name}</h2>
                <span className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${PILL[t.status]}`}>{t.status}</span>
              </div>
              <p className="text-xs text-muted-foreground-1 line-clamp-3 rounded-lg bg-layer border border-layer-line p-3">{t.preview}</p>
              <div className="mt-auto flex items-center justify-between text-[11px] text-muted-foreground-1">
                <span className={`inline-flex items-center rounded-md px-1.5 py-0.5 font-semibold ${CHANNEL[t.channel]}`}>{t.channel}</span>
                <span>used {t.used}× · upd {t.updated}</span>
              </div>
            </div>
          ))}
        </div>
      </PageBody>
    </>
  );
}
