import { PageBody, PageHeader } from "@/components/ui/PageHeader";

export const metadata = { title: "MCP Server" };

const TOOLS = [
  { name: "read_leads", scope: "crm:read", desc: "List leads with stage, score and source", calls: 412 },
  { name: "get_quote", scope: "sales:read", desc: "Fetch a quote by number (margins masked)", calls: 268 },
  { name: "create_quote", scope: "sales:write", desc: "Draft quote from template + line items", calls: 41 },
  { name: "book_visit", scope: "crm:write", desc: "Reserve a site-visit slot", calls: 37 },
  { name: "send_broadcast", scope: "broadcast:write", desc: "Queue a campaign (guardrails enforced)", calls: 12 },
  { name: "search_content", scope: "web:read", desc: "Search pages, posts and media", calls: 190 },
];

const LOG = [
  { when: "11:04", tool: "read_leads", by: "agent:arena", ok: true, ms: 84 },
  { when: "10:57", tool: "get_quote", by: "agent:arena", ok: true, ms: 61 },
  { when: "10:31", tool: "book_visit", by: "bot:telegram", ok: true, ms: 143 },
  { when: "09:58", tool: "send_broadcast", by: "agent:arena", ok: false, ms: 12, note: "scope denied — needs owner" },
  { when: "09:12", tool: "search_content", by: "agent:editor", ok: true, ms: 47 },
];

export default function McpServerPage() {
  return (
    <>
      <PageHeader
        title="MCP Server"
        description="The Model-Context-Protocol endpoint that lets approved agents act on Woodex data — scoped keys, full audit log, keys rotated monthly."
        actions={
          <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-teal-500/10 text-teal-500 ring-1 ring-inset ring-teal-500/25">
            <span className="size-1.5 rounded-full bg-teal-500" />
            endpoint live
          </span>
        }
      />
      <PageBody>
        {/* Endpoint + keys */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          <div className="xl:col-span-2 bg-card border border-card-line shadow-2xs rounded-xl p-5">
            <h2 className="text-sm font-semibold text-foreground">Endpoint</h2>
            <code className="mt-2 block rounded-lg border border-layer-line bg-layer px-3 py-2.5 text-xs text-primary">https://api.woodex.pk/mcp/v1</code>
            <div className="mt-4 grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-muted-foreground-1">Active keys</p>
                <p className="mt-1 font-semibold text-foreground wx-num">3 · agent:arena · bot:telegram · agent:editor</p>
              </div>
              <div>
                <p className="text-muted-foreground-1">Next rotation</p>
                <p className="mt-1 font-semibold text-foreground wx-num">2026-11-01</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-card-line shadow-2xs rounded-xl p-5">
            <h2 className="text-sm font-semibold text-foreground">Rate limits</h2>
            <ul className="mt-3 space-y-2 text-xs">
              <li className="flex justify-between rounded-lg border border-layer-line bg-layer px-3 py-2"><span className="text-muted-foreground-1">Per key / minute</span><span className="font-bold text-foreground wx-num">60</span></li>
              <li className="flex justify-between rounded-lg border border-layer-line bg-layer px-3 py-2"><span className="text-muted-foreground-1">Write ops / day</span><span className="font-bold text-foreground wx-num">500</span></li>
              <li className="flex justify-between rounded-lg border border-layer-line bg-layer px-3 py-2"><span className="text-muted-foreground-1">Broadcast queue / day</span><span className="font-bold text-foreground wx-num">5</span></li>
            </ul>
          </div>
        </div>

        {/* Tools */}
        <div className="mt-5 bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-card-line">
            <h2 className="text-sm font-semibold text-foreground">Exposed tools</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-card-divider">
              <thead className="bg-surface">
                <tr>
                  {["Tool", "Scope", "Description", "Calls 30d"].map((h) => (
                    <th key={h} scope="col" className="px-4 py-2.5 text-start text-xs font-medium uppercase tracking-wide text-muted-foreground-1">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-card-divider">
                {TOOLS.map((t) => (
                  <tr key={t.name} className="transition-colors hover:bg-muted/40">
                    <td className="px-4 py-2.5"><code className="text-xs font-semibold text-primary">{t.name}</code></td>
                    <td className="px-4 py-2.5"><span className="inline-flex items-center rounded-md px-1.5 py-0.5 text-[11px] font-semibold bg-secondary/10 text-secondary">{t.scope}</span></td>
                    <td className="px-4 py-2.5 text-muted-foreground">{t.desc}</td>
                    <td className="wx-num px-4 py-2.5 text-right text-muted-foreground">{t.calls}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Audit log */}
        <div className="mt-5 bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-card-line">
            <h2 className="text-sm font-semibold text-foreground">Audit log</h2>
          </div>
          <ul className="divide-y divide-card-divider">
            {LOG.map((l, i) => (
              <li key={i} className="px-5 py-2.5 flex items-center gap-x-3">
                <span className={`size-2 rounded-full shrink-0 ${l.ok ? "bg-teal-500" : "bg-destructive"}`} />
                <code className="shrink-0 text-xs font-semibold text-foreground w-32">{l.tool}</code>
                <span className="min-w-0 grow truncate text-xs text-muted-foreground-1">{l.by}{l.note ? ` — ${l.note}` : ""}</span>
                <span className="shrink-0 text-[11px] text-muted-foreground-1 wx-num">{l.ms}ms</span>
                <span className="shrink-0 text-[11px] text-muted-foreground-1 wx-num w-12 text-right">{l.when}</span>
              </li>
            ))}
          </ul>
        </div>
      </PageBody>
    </>
  );
}
