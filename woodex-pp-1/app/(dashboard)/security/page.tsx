import { PageBody, PageHeader } from "@/components/ui/PageHeader";

export const metadata = { title: "Security" };

const KEYS = [
  { name: "agent:arena", scope: "crm:read sales:read", last: "11:04 today", rotated: "2026-10-01", status: "Active" },
  { name: "bot:telegram", scope: "crm:write", last: "10:31 today", rotated: "2026-10-01", status: "Active" },
  { name: "agent:editor", scope: "web:read web:write", last: "09:12 today", rotated: "2026-10-01", status: "Active" },
  { name: "legacy-import", scope: "full", last: "2026-08-30", rotated: "2026-06-01", status: "Revoked" },
];

const SESSIONS = [
  { who: "owner@woodex.pk", where: "Lahore · Chrome · macOS", when: "active now", current: true },
  { who: "sana.r@woodex.pk", where: "Lahore · Safari · iPhone", when: "12m ago", current: false },
  { who: "omar.m@woodex.pk", where: "Karachi · Chrome · Android", when: "3h ago", current: false },
];

const POLICIES = [
  { name: "Two-factor auth", state: "required for owner+admin" },
  { name: "Password policy", state: "12+ chars · rotated 90d" },
  { name: "Session lifetime", state: "12h · single-device for money ops" },
  { name: "Key rotation", state: "monthly · next 2026-11-01" },
  { name: "Export watermarking", state: "on · actor + timestamp" },
];

const PILL: Record<string, string> = {
  Active: "bg-teal-500/10 text-teal-500 ring-teal-500/25",
  Revoked: "bg-muted text-muted-foreground ring-border",
};

export default function SecurityPage() {
  return (
    <>
      <PageHeader
        title="Security"
        description="Keys, sessions and policies. Anything that can spend money or export data is scoped, watermarked and logged."
        actions={
          <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg bg-primary border border-primary-line text-primary-foreground hover:bg-primary-hover focus:outline-hidden focus:bg-primary-focus">
            Issue key
          </button>
        }
      />
      <PageBody>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          {/* API keys */}
          <div className="xl:col-span-2 bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-card-line">
              <h2 className="text-sm font-semibold text-foreground">API keys</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-card-divider">
                <thead className="bg-surface">
                  <tr>
                    {["Key", "Scopes", "Last used", "Rotated", "Status"].map((h) => (
                      <th key={h} scope="col" className="px-4 py-2.5 text-start text-xs font-medium uppercase tracking-wide text-muted-foreground-1">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-card-divider">
                  {KEYS.map((k) => (
                    <tr key={k.name} className="transition-colors hover:bg-muted/40">
                      <td className="px-4 py-2.5">
                        <code className="text-xs font-semibold text-foreground">{k.name}</code>
                        <p className="text-[10px] text-muted-foreground-1">wxk_••••••••••••</p>
                      </td>
                      <td className="px-4 py-2.5"><code className="text-[11px] text-primary">{k.scope}</code></td>
                      <td className="wx-num px-4 py-2.5 text-muted-foreground whitespace-nowrap">{k.last}</td>
                      <td className="wx-num px-4 py-2.5 text-muted-foreground whitespace-nowrap">{k.rotated}</td>
                      <td className="px-4 py-2.5"><span className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${PILL[k.status]}`}>{k.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-5 py-3 border-t border-card-line">
              <h2 className="text-sm font-semibold text-foreground">Active sessions</h2>
            </div>
            <ul className="divide-y divide-card-divider">
              {SESSIONS.map((s) => (
                <li key={s.who} className="px-5 py-3 flex items-center gap-x-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-surface-5 border border-line-3 text-[10px] font-semibold text-foreground">
                    {s.who.slice(0, 2).toUpperCase()}
                  </span>
                  <div className="min-w-0 grow">
                    <p className="text-sm font-medium text-foreground">{s.who}{s.current && <span className="ms-2 inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold bg-teal-500/10 text-teal-500 ring-1 ring-inset ring-teal-500/25">this device</span>}</p>
                    <p className="text-[11px] text-muted-foreground-1">{s.where}</p>
                  </div>
                  <span className="text-[11px] text-muted-foreground-1">{s.when}</span>
                  {!s.current && (
                    <button type="button" className="py-1 px-2 text-[11px] font-medium rounded-md border border-border bg-layer text-destructive hover:bg-destructive/10 focus:outline-hidden">Revoke</button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div className="bg-card border border-card-line shadow-2xs rounded-xl p-5 self-start">
            <h2 className="text-sm font-semibold text-foreground">Policies</h2>
            <ul className="mt-4 space-y-2">
              {POLICIES.map((p) => (
                <li key={p.name} className="rounded-lg border border-layer-line bg-layer px-3 py-2">
                  <p className="text-xs font-semibold text-foreground">{p.name}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground-1">{p.state}</p>
                </li>
              ))}
            </ul>
            <div className="mt-4 rounded-lg border border-amber-500/25 bg-amber-500/10 p-3">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-amber-500">Housekeeping</p>
              <p className="mt-1 text-xs text-foreground">Two legacy plaintext credentials found in the old v2.1 config were rotated and moved to masked storage on Oct 1.</p>
            </div>
          </div>
        </div>
      </PageBody>
    </>
  );
}
