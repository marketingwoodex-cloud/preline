/**
 * Woodex PP-1 domain contract.
 *
 * This is a faithful mirror of the Woodex Admin v2.1 PHP layer, not a new
 * invention — so the screens can be pointed at either backend without a
 * rewrite. Source of truth on the v2.1 side:
 *
 *   woodex live p29-v2.1/api/dash-lib.php   → DashData  (action `dash_data`)
 *   woodex live p29-v2.1/api/crm-lib.php    → CRM_STAGES, CRM_SOURCES, wx_leads
 *   woodex live p29-v2.1/api/sales-lib.php  → wx_quotes, wx_invoices
 *   woodex live p29-v2.1/api/content-lib.php→ posts, services, pages
 *
 * Field names are kept exactly as the PHP returns them (including the
 * `camelCase`-inside-`snake_case` mix) on purpose: any renaming here would
 * silently break when the real endpoint is connected.
 */

/* ------------------------------------------------------------------ *
 * Roles & access
 * ------------------------------------------------------------------ */

export type Role = "owner" | "admin" | "editor" | "sales";

/**
 * v2.1 gates CRM and money data with `$crm = in_array($u['role'],
 * ['owner','admin','sales'], true)`. An editor sees the website panels only.
 */
export function canSeeCrm(role: Role): boolean {
  return role === "owner" || role === "admin" || role === "sales";
}

/* ------------------------------------------------------------------ *
 * CRM
 * ------------------------------------------------------------------ */

/** `const CRM_STAGES = ['new','contacted','visit','quote','hold','won','lost']` */
export const CRM_STAGES = ["new", "contacted", "visit", "quote", "hold", "won", "lost"] as const;
export type CrmStage = (typeof CRM_STAGES)[number];

/** The open (pipeline) stages — `won` and `lost` are terminal. */
export const OPEN_STAGES: CrmStage[] = ["new", "contacted", "visit", "quote", "hold"];

export const STAGE_LABEL: Record<CrmStage, string> = {
  new: "New",
  contacted: "Contacted",
  visit: "Site visit",
  quote: "Quoted",
  hold: "On hold",
  won: "Won",
  lost: "Lost",
};

/** `const CRM_SOURCES = [...]` — 24 entries, reproduced verbatim. */
export const CRM_SOURCES: Record<string, string> = {
  contact: "Contact form",
  booking: "Online booking",
  estimator: "Cost estimator",
  brief: "3D brief",
  "fitout-hub": "Fit-out quote",
  "office-fitout": "Office fit-out quote",
  whatsapp: "WhatsApp",
  chat: "Live chat",
  client: "Existing client (repeat)",
  referral: "Referral / word of mouth",
  walkin: "Walk-in / office visit",
  phone: "Phone call",
  facebook: "Facebook",
  instagram: "Instagram",
  google: "Google search / Maps",
  tiktok: "TikTok / YouTube",
  portal: "Zameen / OLX / portals",
  architect: "Architect / consultant",
  builder: "Builder / developer",
  event: "Exhibition / event",
  outreach: "Cold call / outreach",
  other: "Other",
  manual: "Added by team",
  import: "CSV import",
};

export type LeadNote = {
  t: string;
  user: string;
  text: string;
  sys: boolean;
  kind: string;
  outcome: string;
};

/** `wx_leads` row as returned by `lead_row()`. */
export type Lead = {
  id: number;
  created_at: string;
  source: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  stage: CrmStage;
  assigned_to: number | null;
  assigned_name: string;
  followup: string | null;
  /** PKR. BIGINT in MySQL — kept as number here; see `formatPkr`. */
  value: number;
  lost_reason: string | null;
  client_id: number | null;
  is_read: boolean;
  notes: LeadNote[];
};

/* ------------------------------------------------------------------ *
 * Sales documents
 * ------------------------------------------------------------------ */

export type QuoteStatus = "draft" | "sent" | "approved" | "declined" | "expired";

export type Quote = {
  id: number;
  no: string;
  client: { name: string };
  title: string;
  /** v2.1 templates: Single / Project / BOQ */
  template: "single" | "project" | "boq";
  status: QuoteStatus;
  total: number;
  sent_at: string | null;
  approved_at: string | null;
  expires: string | null;
};

export type InvoiceStatus = "draft" | "sent" | "part_paid" | "paid" | "overdue";

export type InvoicePayment = { date: string; amount: number; method: string; ref: string };

export type Invoice = {
  id: number;
  no: string;
  client: { name: string };
  issue_date: string;
  due_date: string;
  total: number;
  balance: number;
  overdue: boolean;
  status: InvoiceStatus;
  payments: InvoicePayment[];
};

export type ProjectStage = "design" | "civil" | "carpentry" | "finishing" | "handover";

export const PROJECT_STAGES: { id: ProjectStage; label: string; ur: string }[] = [
  { id: "design", label: "Design", ur: "ڈیزائن" },
  { id: "civil", label: "Civil work", ur: "سول ورک" },
  { id: "carpentry", label: "Carpentry", ur: "ترکیب" },
  { id: "finishing", label: "Finishing", ur: "فنشنگ" },
  { id: "handover", label: "Handover", ur: "حوالگی" },
];

export type Project = {
  id: number;
  name: string;
  client: string;
  city: string;
  stage: ProjectStage;
  progress: number;
  value: number;
  start: string;
  eta: string;
  lead: string;
};

export type Client = {
  id: number;
  name: string;
  phone: string;
  email: string;
  city: string;
  created_at: string;
  last_activity: string;
  value: number;
  open_quotes: number;
  unpaid: number;
  leads: { id: number; stage: CrmStage; service: string; value: number }[];
};

/* ------------------------------------------------------------------ *
 * Website & content
 * ------------------------------------------------------------------ */

export type PageStatus = "published" | "hidden" | "draft";

export type SitePage = {
  id: number;
  path: string;
  title: string;
  type: "home" | "service" | "location" | "project" | "blog" | "static";
  status: PageStatus;
  seo_score: number;
  seo_issues: string[];
  updated_at: string;
  updated_by: string;
  views_30d: number;
};

export type SectionBlock = {
  id: string;
  name: string;
  kind: string;
  cat: string;
  tags: string[];
  /** Global blocks are edited once and pushed to every page using them. */
  global: boolean;
  used_on: number;
  updated: string;
};

export type Post = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  status: "published" | "draft";
  category: string;
  author: string;
  published_at: string;
  views_30d: number;
  read_minutes: number;
};

export type Service = {
  id: number;
  slug: string;
  name: string;
  pages: number;
  status: "live" | "draft";
  leads_30d: number;
  enquiries: number;
};

/* ------------------------------------------------------------------ *
 * Dashboard payload — `dash_data`
 * ------------------------------------------------------------------ */

/**
 * `dash_data` with `{days: 7|28|90}`. `crm` is null for roles outside
 * owner/admin/sales.
 */
export type DashData = {
  ok: true;
  days: 7 | 28 | 90;
  role: Role;
  axis: string[];
  /** Null where the GA4 cache has no data for that day. */
  visitors: (number | null)[];
  crm: {
    kpi: {
      /** [current, previous period] */
      leads: [number, number];
      pipeline: number;
      quotesSent: [number, number];
      openQuotes: [number, number];
      paid: [number, number];
      unpaid: number;
      won: number;
    };
    series: {
      leads: number[];
      sent: number[];
      won: number[];
      invoiced: number[];
      paid: number[];
    };
    funnel: Record<CrmStage, number>;
    recent: Pick<Lead, "id" | "name" | "service" | "stage" | "source" | "created_at" | "is_read">[];
    followups: { id: number; name: string; service: string; stage: CrmStage; followup: string; late: boolean }[];
    overdue: { id: number; no: string; client: string; balance: number; due: string }[];
    overdueN: number;
    sources: { name: string; n: number }[];
    chips: { new: number; overdue: number; follow: number };
    target: { target: number; month: number; monthLabel: string };
  } | null;
  website: {
    pages: number;
    published: number;
    drafts: number;
    avg_seo: number;
    speed: number;
    health: number;
    broken_links: number;
    heavy_images: number;
    recent_edits: { page: string; by: string; when: string }[];
  };
};

/* ------------------------------------------------------------------ *
 * Formatting
 * ------------------------------------------------------------------ */

/**
 * Pakistani Rupee, compact above 100k.
 *
 * v2.1 stores money as a BIGINT of whole rupees and renders it raw; the
 * dashboard reads better with lakh/crore grouping, which is what Pakistani
 * quoting actually uses (PKR 4.5M = 45 lakh).
 */
export function formatPkr(n: number, opts: { compact?: boolean } = {}): string {
  const { compact = true } = opts;
  if (!Number.isFinite(n)) return "—";
  const abs = Math.abs(n);
  if (compact && abs >= 10_000_000) return `PKR ${(n / 10_000_000).toFixed(2)}Cr`;
  if (compact && abs >= 100_000) return `PKR ${(n / 100_000).toFixed(abs >= 1_000_000 ? 1 : 2)}L`;
  if (compact && abs >= 1_000) return `PKR ${(n / 1_000).toFixed(0)}k`;
  return `PKR ${n.toLocaleString("en-PK")}`;
}

export function formatNumber(n: number): string {
  return n.toLocaleString("en-PK");
}

/** Signed delta between the current and previous period. */
export function deltaPct(current: number, previous: number): number | null {
  if (previous === 0) return current === 0 ? 0 : null;
  return ((current - previous) / previous) * 100;
}

export function relativeDay(iso: string, today = new Date()): string {
  const then = new Date(iso.slice(0, 10));
  const days = Math.round((today.setHours(0, 0, 0, 0) - then.getTime()) / 86_400_000);
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}
