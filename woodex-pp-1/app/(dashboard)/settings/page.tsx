import { PageBody, PageHeader } from "@/components/ui/PageHeader";

export const metadata = { title: "Settings" };

const TABS = ["General", "Team", "Integrations", "Preferences"];

const MEMBERS = [
  { name: "Preview Owner", role: "Owner", badge: "PRO", since: "2019", note: "final approvals · finance" },
  { name: "Sana Rehman", role: "Sales lead", badge: "PRO", since: "2021", note: "quotes · showroom" },
  { name: "Omar Malik", role: "Projects", badge: "PRO", since: "2022", note: "site visits · delivery" },
  { name: "Aiden Craft", role: "Editor", badge: "", since: "2024", note: "content · SEO" },
  { name: "Workshop Bot", role: "Automation", badge: "", since: "2025", note: "challans · stock" },
  { name: "Hina Butt", role: "Support", badge: "", since: "2023", note: "tickets · after-care" },
];

const APPS = [
  { name: "WhatsApp Business", desc: "session + broadcasts", state: "Connected" },
  { name: "Telegram", desc: "@WoodexInteriorBot", state: "Connected" },
  { name: "Google Search Console", desc: "SEO + sitemaps", state: "Connected" },
  { name: "Meta Pixel", desc: "ad attribution", state: "Connected" },
  { name: "Stripe / PayFast", desc: "advance payments", state: "Review" },
  { name: "Zoho Books", desc: "accounting sync", state: "Off" },
  { name: "Cal.com", desc: "visit scheduling", state: "Off" },
  { name: "Slack", desc: "ops alerts", state: "Off" },
];

const S_PILL: Record<string, string> = {
  Connected: "bg-teal-500/10 text-teal-500 ring-teal-500/25",
  Review: "bg-amber-500/10 text-amber-500 ring-amber-500/25",
  Off: "bg-muted text-muted-foreground ring-border",
};

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        title="Settings"
        description="Workspace, team, integrations and preferences for the whole PP-1 admin."
      />
      <PageBody>
        {/* Horizontal tabs */}
        <div className="flex items-center gap-x-1 border-b border-border overflow-x-auto">
          {TABS.map((t, i) => (
            <button key={t} type="button" className={`-mb-px py-2.5 px-4 inline-flex items-center whitespace-nowrap text-sm font-medium border-b-2 focus:outline-hidden ${i === 1 ? "border-primary text-primary" : "border-transparent text-muted-foreground-1 hover:text-foreground"}`}>
              {t}
            </button>
          ))}
        </div>

        {/* Team tab (default shown) */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {MEMBERS.map((m) => (
            <div key={m.name} className="bg-card border border-card-line shadow-2xs rounded-xl p-5 transition-shadow hover:shadow-md">
              <div className="flex items-start gap-x-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-surface-5 border border-line-3 text-sm font-semibold text-foreground">
                  {m.name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase()}
                </span>
                <div className="min-w-0">
                  <p className="flex items-center gap-x-2 text-sm font-semibold text-foreground">
                    {m.name}
                    {m.badge && <span className="inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-bold bg-primary/10 text-primary ring-1 ring-inset ring-primary/25">{m.badge}</span>}
                  </p>
                  <p className="text-xs text-muted-foreground-1">{m.role} · since {m.since}</p>
                </div>
              </div>
              <p className="mt-3 text-xs text-muted-foreground-1">{m.note}</p>
              <div className="mt-4 flex items-center gap-x-2 border-t border-card-divider pt-3">
                <button type="button" className="py-1.5 px-2.5 inline-flex items-center text-xs font-medium rounded-lg border border-border bg-layer text-layer-foreground hover:bg-layer-hover focus:outline-hidden">Profile</button>
                <button type="button" className="py-1.5 px-2.5 inline-flex items-center text-xs font-medium rounded-lg border border-border bg-layer text-layer-foreground hover:bg-layer-hover focus:outline-hidden">Permissions</button>
              </div>
            </div>
          ))}
        </div>

        {/* Integrations grid */}
        <h2 className="mt-8 text-sm font-semibold text-foreground">Integrations</h2>
        <p className="mt-1 text-xs text-muted-foreground-1">Everything the admin talks to. Off apps can be connected without a redeploy.</p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {APPS.map((a) => (
            <div key={a.name} className="bg-card border border-card-line shadow-2xs rounded-xl p-4">
              <div className="flex items-start justify-between gap-2">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 17H7A5 5 0 0 1 7 7h2M15 7h2a5 5 0 1 1 0 10h-2M8 12h8" /></svg>
                </span>
                <span className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold ring-1 ring-inset ${S_PILL[a.state]}`}>{a.state}</span>
              </div>
              <p className="mt-3 text-sm font-semibold text-foreground">{a.name}</p>
              <p className="text-[11px] text-muted-foreground-1">{a.desc}</p>
            </div>
          ))}
        </div>
      </PageBody>
    </>
  );
}
