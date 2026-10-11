import { Check, Database, KeyRound, Plug, Shield, Users } from "lucide-react";
import { PageBody, PageHeader } from "@/components/ui/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { Badge } from "@/components/ui/StatusBadge";

export const metadata = { title: "Settings" };

/**
 * One Settings page with tabs, per the P19 directive: "Settings = one page with
 * tabs… Sidebar shows only 'Settings'." v2.1 had these spread across separate
 * `admin-settings.js`, `admin-users.js`, `admin-security.js`, `admin-integ.js`
 * and `admin-conn.js` screens.
 */
const TABS = [
  { id: "general", label: "General" },
  { id: "business", label: "Business info" },
  { id: "integrations", label: "Integrations & APIs" },
  { id: "team", label: "Users & roles" },
  { id: "security", label: "Security" },
  { id: "system", label: "System check" },
];

const INTEGRATIONS = [
  { name: "WhatsApp Cloud API", group: "Messaging", status: "connected", detail: "1 verified number · template approved" },
  { name: "Telegram bot", group: "Messaging", status: "connected", detail: "@WoodexInteriorBot · polling" },
  { name: "Claude", group: "AI", status: "connected", detail: "Monthly spend limit PKR 25,000" },
  { name: "Google Analytics 4", group: "Google", status: "connected", detail: "Data cached 14 min ago" },
  { name: "Search Console", group: "Google", status: "not set", detail: "Connect to pull query data" },
  { name: "Cloudflare Turnstile", group: "Security", status: "connected", detail: "Protecting 6 forms" },
  { name: "Hostinger SMTP", group: "Email", status: "connected", detail: "Alerts to 4 addresses" },
  { name: "Stripe / JazzCash", group: "Payments", status: "not set", detail: "Planned for v2.5" },
];

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        title="Settings"
        description="Everything in one place with tabs. API keys are stored server-side only and never sent to the browser."
      />
      <PageBody>
        <div className="hs-tabs flex flex-col gap-5 lg:flex-row">
          {/* Tab list */}
          <div
            className="hs-tabs-list flex shrink-0 gap-1 overflow-x-auto rounded-xl border border-card-line bg-card p-1 lg:w-56 lg:flex-col lg:overflow-visible"
            role="tablist"
            aria-orientation="vertical"
          >
            {TABS.map((t, i) => (
              <button
                key={t.id}
                type="button"
                className="hs-tabs-toggle flex items-center gap-2.5 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground hs-tab-active:bg-primary/10 hs-tab-active:text-primary focus:outline-hidden"
                id={`tab-${t.id}`}
                data-hs-tab={`#${t.id}-panel`}
                aria-controls={`${t.id}-panel`}
                role="tab"
                aria-selected={i === 0}
              >
                {t.id === "integrations" && <Plug className="size-4" />}
                {t.id === "team" && <Users className="size-4" />}
                {t.id === "security" && <Shield className="size-4" />}
                {t.id === "system" && <Database className="size-4" />}
                {t.label}
              </button>
            ))}
          </div>

          {/* Panels */}
          <div className="min-w-0 flex-1">
            <div className="hidden hs-tabs-active:block" id="general-panel" role="tabpanel" aria-labelledby="tab-general">
              <SectionCard title="General" subtitle="Site identity and defaults">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {[
                    { label: "Business name", value: "Woodex Interiors" },
                    { label: "Default currency", value: "PKR" },
                    { label: "Default language", value: "English (Urdu secondary)" },
                    { label: "Timezone", value: "Asia/Karachi" },
                  ].map((f) => (
                    <label key={f.label} className="block">
                      <span className="mb-1.5 block text-[13px] font-medium text-foreground">{f.label}</span>
                      <input
                        defaultValue={f.value}
                        className="h-9 w-full rounded-lg border border-border bg-background-1 px-3 text-sm text-foreground focus:border-primary focus:outline-hidden"
                      />
                    </label>
                  ))}
                </div>
              </SectionCard>
            </div>

            <div className="hidden hs-tabs-active:block" id="business-panel" role="tabpanel" aria-labelledby="tab-business">
              <SectionCard title="Business info" subtitle="Single source of truth — fixes the WhatsApp number that was hardcoded in 230 places">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {[
                    { label: "WhatsApp number", value: "+92 300 0000000" },
                    { label: "Office phone", value: "+92 42 0000000" },
                    { label: "Email", value: "info@woodex.pk" },
                    { label: "Head office", value: "Gulberg III, Lahore" },
                    { label: "Bank Alfalah IBAN", value: "PK00ALFH0000000000000000" },
                    { label: "Meezan Bank IBAN", value: "PK00MEZN0000000000000000" },
                  ].map((f) => (
                    <label key={f.label} className="block">
                      <span className="mb-1.5 block text-[13px] font-medium text-foreground">{f.label}</span>
                      <input
                        defaultValue={f.value}
                        className="wx-num h-9 w-full rounded-lg border border-border bg-background-1 px-3 text-sm text-foreground focus:border-primary focus:outline-hidden"
                      />
                    </label>
                  ))}
                </div>
              </SectionCard>
            </div>

            <div className="hidden hs-tabs-active:block" id="integrations-panel" role="tabpanel" aria-labelledby="tab-integrations">
              <SectionCard title="Integrations & APIs" subtitle="Grouped by category, each with a status badge and a test button">
                <div className="space-y-6">
                  {["Messaging", "AI", "Google", "Security", "Email", "Payments"].map((group) => {
                    const items = INTEGRATIONS.filter((i) => i.group === group);
                    if (!items.length) return null;
                    return (
                      <div key={group}>
                        <h4 className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">{group}</h4>
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                          {items.map((i) => (
                            <div key={i.name} className="flex items-center gap-3 rounded-lg border border-border bg-background-1 p-3">
                              <KeyRound className="size-4 shrink-0 text-muted-foreground" />
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-[13px] font-medium text-foreground">{i.name}</p>
                                <p className="truncate text-xs text-muted-foreground">{i.detail}</p>
                              </div>
                              <Badge tone={i.status === "connected" ? "green" : "neutral"}>{i.status}</Badge>
                              <button
                                type="button"
                                className="shrink-0 rounded-md border border-border px-2 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                              >
                                Test
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </SectionCard>
            </div>

            <div className="hidden hs-tabs-active:block" id="team-panel" role="tabpanel" aria-labelledby="tab-team">
              <SectionCard title="Users & roles" subtitle="Owner, Admin, Editor and Sales. CRM and money screens are hidden from Editor.">
                <ul className="divide-y divide-card-divider">
                  {[
                    { name: "Kamran Tariq", email: "owner@woodex.pk", role: "Owner" },
                    { name: "Sana Malik", email: "sana@woodex.pk", role: "Admin" },
                    { name: "Bilal Ahmed", email: "bilal@woodex.pk", role: "Sales" },
                    { name: "Hina Raza", email: "hina@woodex.pk", role: "Editor" },
                  ].map((u) => (
                    <li key={u.email} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
                      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary/15 text-[11px] font-bold text-primary">
                        {u.name.split(" ").map((p) => p[0]).join("")}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[13px] font-medium text-foreground">{u.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{u.email}</p>
                      </div>
                      <Badge tone={u.role === "Owner" ? "gold" : "neutral"}>{u.role}</Badge>
                    </li>
                  ))}
                </ul>
              </SectionCard>
            </div>

            <div className="hidden hs-tabs-active:block" id="security-panel" role="tabpanel" aria-labelledby="tab-security">
              <SectionCard title="Security" subtitle="Baseline checks applied on every action">
                <ul className="space-y-2">
                  {[
                    "Password hashing with bcrypt",
                    "Login rate limiting (5 attempts / 15 min)",
                    "CSRF token on every mutating action",
                    "Role check on every API action",
                    "Prepared statements on all SQL",
                    "Upload MIME and extension validation",
                    "_private/ blocked by .htaccess",
                    "Automatic backup before bulk changes",
                  ].map((s) => (
                    <li key={s} className="flex items-center gap-2.5 rounded-lg border border-border bg-background-1 px-3 py-2 text-[13px] text-foreground">
                      <Check className="size-4 shrink-0 text-primary" />
                      {s}
                    </li>
                  ))}
                </ul>
              </SectionCard>
            </div>

            <div className="hidden hs-tabs-active:block" id="system-panel" role="tabpanel" aria-labelledby="tab-system">
              <SectionCard title="System check" subtitle="Runs against the live server — this is what caught the Hostinger SSL and builder-token failures">
                <ul className="space-y-2">
                  {[
                    { label: "PHP version & extensions", state: "pass", detail: "PHP 8.2 · curl, mbstring, openssl" },
                    { label: "Database connection", state: "pass", detail: "MySQL · 14 tables" },
                    { label: "_private/ writable", state: "pass", detail: "Backups and JSON stores reachable" },
                    { label: "Builder sign-in", state: "pass", detail: "Session fallback accepted" },
                    { label: "SSL to Google / OpenAI / Meta", state: "pass", detail: "Bundled CA list in use" },
                    { label: "Admin headers received", state: "warn", detail: "X-Forwarded-Proto stripped by proxy" },
                  ].map((c) => (
                    <li key={c.label} className="flex items-center gap-3 rounded-lg border border-border bg-background-1 px-3 py-2.5">
                      <Badge tone={c.state === "pass" ? "green" : "gold"}>{c.state === "pass" ? "pass" : "warning"}</Badge>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[13px] font-medium text-foreground">{c.label}</p>
                        <p className="truncate text-xs text-muted-foreground">{c.detail}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </SectionCard>
            </div>
          </div>
        </div>
      </PageBody>
    </>
  );
}
