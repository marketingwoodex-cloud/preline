/**
 * Woodex PP-1 role model — the five team accounts shown in Settings → Users & roles.
 *
 * Demo-level enforcement: the active role is kept in localStorage (`wx_role`) and
 * the shell filters the sidebar + guards routes client-side. The copied v2.1 PHP
 * api is the source of truth for real server-side checks (see api/README.md);
 * this matrix mirrors its role hierarchy (owner > admin > editor/sales/support).
 */

export type RoleId = "owner" | "admin" | "editor" | "sales" | "support";

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
];

export const ROLE_LABEL: Record<RoleId, string> = {
  owner: "Owner",
  admin: "Manager (admin)",
  editor: "Developer (editor)",
  sales: "Sales",
  support: "Support",
};

/** Route prefixes each role may open. `*` = everything. */
export const ROLE_ROUTES: Record<RoleId, string[] | "*"> = {
  owner: "*",
  admin: [
    "/", "/enquiries", "/pipeline", "/clients", "/quotations", "/invoices",
    "/projects", "/client-updates", "/chat", "/ai", "/pages", "/builder",
    "/library", "/chrome", "/media", "/blog", "/services", "/faqs",
    "/testimonials", "/seo", "/redirects", "/settings", "/activity",
  ],
  editor: [
    "/", "/pages", "/builder", "/library", "/chrome", "/media", "/blog",
    "/services", "/faqs", "/testimonials", "/seo", "/redirects", "/activity",
  ],
  sales: [
    "/", "/enquiries", "/pipeline", "/clients", "/quotations", "/invoices",
    "/projects", "/client-updates", "/chat", "/activity",
  ],
  support: ["/", "/chat", "/enquiries", "/clients", "/projects", "/activity"],
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
];

export const ROLE_FEATURES: Record<RoleId, string[]> = {
  owner: ["crm", "money", "conversations", "website", "content", "seo", "settings", "apikeys", "backups", "roles"],
  admin: ["crm", "money", "conversations", "website", "content", "seo", "settings", "roles"],
  editor: ["website", "content", "seo", "conversations"],
  sales: ["crm", "money", "conversations"],
  support: ["crm", "conversations"],
};

export function roleOf(id: string): RoleId {
  return (["owner", "admin", "editor", "sales", "support"] as const).includes(id as RoleId)
    ? (id as RoleId)
    : "owner";
}

export function canAccessRoute(role: RoleId, pathname: string): boolean {
  const routes = ROLE_ROUTES[role];
  if (routes === "*") return true;
  return routes.some((r) => pathname === r || (r !== "/" && pathname.startsWith(r + "/")));
}

export const ROLE_STORAGE_KEY = "wx_role";
