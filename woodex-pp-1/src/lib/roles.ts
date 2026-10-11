/**
 * Woodex PP-1 role model — the five team accounts shown in Settings → Users & roles.
 *
 * Demo-level enforcement: the active role is kept in localStorage (`wx_role`) and
 * the shell filters the sidebar + guards routes client-side. The copied v2.1 PHP
 * api is the source of truth for real server-side checks (see api/README.md);
 * this matrix mirrors its role hierarchy (owner > admin > editor/sales/support).
 */

export type RoleId = "owner" | "admin" | "editor" | "sales" | "support" | "automation";

export interface Member {
  id: RoleId;
  name: string;
  role: RoleId;
  roleLabel: string;
  email: string;
  initials: string;
  status: "Active";
  bio: string;
}

export const MEMBERS: Member[] = [
  {
    id: "owner",
    name: "Preview Owner",
    role: "owner",
    roleLabel: "owner",
    email: "preview@example.com",
    initials: "PO",
    status: "Active",
    bio: "Team member at Woodex Interior Studio.",
  },
  {
    id: "admin",
    name: "Manager",
    role: "admin",
    roleLabel: "admin",
    email: "manager@woodex.pk",
    initials: "M",
    status: "Active",
    bio: "Team member at Woodex Interior Studio.",
  },
  {
    id: "editor",
    name: "Developer",
    role: "editor",
    roleLabel: "editor",
    email: "developer@woodex.pk",
    initials: "D",
    status: "Active",
    bio: "Team member at Woodex Interior Studio.",
  },
  {
    id: "sales",
    name: "Sales",
    role: "sales",
    roleLabel: "sales",
    email: "sales@woodex.pk",
    initials: "S",
    status: "Active",
    bio: "Team member at Woodex Interior Studio.",
  },
  {
    id: "support",
    name: "Support",
    role: "support",
    roleLabel: "support",
    email: "support@woodex.pk",
    initials: "S",
    status: "Active",
    bio: "Team member at Woodex Interior Studio.",
  },
  {
    id: "automation",
    name: "Automation",
    role: "automation",
    roleLabel: "automation",
    email: "automation@woodex.pk",
    initials: "A",
    status: "Active",
    bio: "Automation account at Woodex Interior Studio.",
  },
];

export const ROLE_LABEL: Record<RoleId, string> = {
  owner: "Owner",
  admin: "Manager (admin)",
  editor: "Developer (editor)",
  sales: "Sales",
  support: "Support",
  automation: "Automation (bot)",
};

/** Route prefixes each role may open. `*` = everything. */
export const ROLE_ROUTES: Record<RoleId, string[] | "*"> = {
  owner: "*",
  admin: [
    "/", "/analytics", "/activity", "/tasks", "/sales", "/enquiries", "/pipeline",
    "/quotations", "/bookings", "/invoices", "/payments", "/clients", "/contacts",
    "/deals", "/contracts", "/approvals", "/chat", "/threads", "/whatsapp",
    "/telegram", "/calls", "/campaigns", "/templates", "/segments", "/schedules",
    "/pages", "/builder", "/projects", "/services", "/city-pages", "/insights",
    "/media", "/blocks", "/seo", "/speed", "/redirects", "/ai", "/offer-engine",
    "/prompts", "/automations", "/training-data", "/mcp-server", "/reports",
    "/print-center", "/settings", "/tickets", "/health", "/logs", "/changelog",
    "/notifications", "/security", "/financial", "/sales-tracking",
  ],
  editor: [
    "/", "/pages", "/builder", "/projects", "/services", "/city-pages",
    "/insights", "/media", "/blocks", "/seo", "/speed", "/redirects",
    "/reports/site", "/activity", "/changelog", "/blog",
  ],
  sales: [
    "/", "/analytics", "/tasks", "/sales", "/enquiries", "/pipeline",
    "/quotations", "/bookings", "/invoices", "/payments", "/clients",
    "/contacts", "/deals", "/contracts", "/approvals", "/chat", "/threads",
    "/calls", "/reports/sales", "/activity", "/financial", "/sales-tracking",
  ],
  support: [
    "/", "/chat", "/threads", "/whatsapp", "/telegram", "/calls", "/clients",
    "/contacts", "/tickets", "/activity", "/tasks",
  ],
  automation: [
    "/", "/automations", "/ai", "/offer-engine", "/prompts", "/training-data",
    "/mcp-server", "/logs", "/health", "/activity", "/notifications",
  ],
};

export interface FeatureAccess {
  key: string;
  label: string;
  hint: string;
}

export const FEATURES: FeatureAccess[] = [
  { key: "crm", label: "CRM & pipeline", hint: "Enquiries, pipeline board, clients, client updates" },
  { key: "money", label: "Quotes & invoices", hint: "Create quotes, send invoices, record payments" },
  { key: "conversations", label: "Conversations", hint: "Live chat inbox and AI training" },
  { key: "website", label: "Website & builder", hint: "Pages, page builder, sections, header/footer, media" },
  { key: "content", label: "Content", hint: "Blog, services, FAQs, testimonials" },
  { key: "seo", label: "Marketing & SEO", hint: "SEO audits, redirects" },
  { key: "settings", label: "Settings", hint: "General, business info, integrations, system check" },
  { key: "apikeys", label: "API keys & security", hint: "Generate/regenerate keys, security baseline" },
  { key: "backups", label: "Backups", hint: "Restore points and bulk-change safety nets" },
  { key: "roles", label: "Users & roles", hint: "Invite members, change roles" },
  { key: "automations", label: "AI & Automations", hint: "Automations master dashboard, AI studio, MCP server, training data" },
];

export const ROLE_FEATURES: Record<RoleId, string[]> = {
  owner: ["crm", "money", "conversations", "website", "content", "seo", "settings", "apikeys", "backups", "roles", "automations"],
  admin: ["crm", "money", "conversations", "website", "content", "seo", "settings", "roles", "automations"],
  editor: ["website", "content", "seo", "conversations"],
  sales: ["crm", "money", "conversations"],
  support: ["crm", "conversations"],
  automation: ["automations"],
};

export function roleOf(id: string): RoleId {
  return (["owner", "admin", "editor", "sales", "support", "automation"] as const).includes(id as RoleId)
    ? (id as RoleId)
    : "owner";
}

export function canAccessRoute(role: RoleId, pathname: string): boolean {
  const routes = ROLE_ROUTES[role];
  if (routes === "*") return true;
  return routes.some((r) => pathname === r || (r !== "/" && pathname.startsWith(r + "/")));
}

export const ROLE_STORAGE_KEY = "wx_role";
