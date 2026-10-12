import { LEADS, QUOTES, INVOICES, PROJECTS, CLIENTS, PAGES } from "./fixture";

/**
 * API adapter layer (Phase A seam).
 *
 * One typed door to the backend. While no live API is attached the adapter
 * resolves from fixtures; set NEXT_PUBLIC_WX_USE_API=1 (+ NEXT_PUBLIC_WX_API)
 * and the same calls hit the PHP contract in api/_v2.1-source (124 actions,
 * see docs/DEVELOPER-MASTER-DOCUMENT.md §7). Pages migrate screen-by-screen
 * by swapping `import { X } from "@/lib/fixture"` for `api.x.list()`.
 *
 * Envelope: every action answers JSON { ok: true, ... } or
 * { ok: false, error } (HTTP 4xx). Auth token + role enforcement arrive with
 * Phase S; until then the adapter is unauthenticated like the fixtures.
 */

const USE_API = process.env.NEXT_PUBLIC_WX_USE_API === "1";
const API_BASE = process.env.NEXT_PUBLIC_WX_API ?? "/api";

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

/** POST an action to the PHP endpoint and unwrap the { ok, ... } envelope. */
export async function apiCall<T = unknown>(
  action: string,
  payload: Record<string, unknown> = {},
): Promise<T> {
  const res = await fetch(`${API_BASE}/admin.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action, ...payload }),
  });
  const body = (await res.json()) as { ok?: boolean; error?: string } & T;
  if (!res.ok || body.ok === false) {
    throw new ApiError(res.status, body.error ?? `action ${action} failed`);
  }
  return body;
}

/**
 * Domain clients. Each method returns live data when USE_API, else the
 * fixture the screens already render — so swapping is invisible to callers.
 * Action names mirror the PHP contract exactly.
 */
export const api = {
  dash: {
    data: () => (USE_API ? apiCall("dash_data") : Promise.resolve({ leads: LEADS.length, quotes: QUOTES.length })),
  },
  leads: {
    list: () => (USE_API ? apiCall("leads_list") : Promise.resolve(LEADS)),
    count: () => (USE_API ? apiCall("leads_count") : Promise.resolve(LEADS.length)),
    save: (lead: Record<string, unknown>) => apiCall("lead_save", lead),
    note: (id: number, text: string) => apiCall("lead_note", { id, text }),
    convert: (id: number) => apiCall("lead_convert", { id }),
    remove: (id: number) => apiCall("lead_delete", { id }),
    import: (rows: unknown[]) => apiCall("leads_import", { rows }),
  },
  quotes: {
    list: () => (USE_API ? apiCall("quotes_list") : Promise.resolve(QUOTES)),
    get: (id: number) => apiCall("quote_get", { id }),
    save: (q: Record<string, unknown>) => apiCall("quote_save", q),
    send: (id: number) => apiCall("quote_send", { id }),
    toInvoice: (id: number) => apiCall("quote_invoice", { id }),
  },
  invoices: {
    list: () => (USE_API ? apiCall("invs_list") : Promise.resolve(INVOICES)),
    get: (id: number) => apiCall("inv_get", { id }),
    save: (inv: Record<string, unknown>) => apiCall("inv_save", inv),
  },
  clients: {
    list: () => (USE_API ? apiCall("clients_list") : Promise.resolve(CLIENTS)),
    save: (c: Record<string, unknown>) => apiCall("client_save", c),
    remove: (id: number) => apiCall("client_delete", { id }),
  },
  projects: {
    list: () => (USE_API ? apiCall("projs_list") : Promise.resolve(PROJECTS)),
    save: (p: Record<string, unknown>) => apiCall("proj_save", p),
    update: (p: Record<string, unknown>) => apiCall("proj_update", p),
  },
  pages: {
    list: () => (USE_API ? apiCall("pages_list") : Promise.resolve(PAGES)),
  },
  seo: {
    list: () => apiCall("seo_list"),
    scan: () => apiCall("scan"),
  },
} as const;
