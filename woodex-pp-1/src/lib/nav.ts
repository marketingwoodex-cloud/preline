import {
  Archive,
  ArrowLeftRight,
  Bell,
  Building2,
  CircleDollarSign,
  FileText,
  FolderKanban,
  HardHat,
  HelpCircle,
  Image as ImageIcon,
  LayoutDashboard,
  Layers,
  Library,
  ListChecks,
  MessageSquare,
  Newspaper,
  PanelsTopLeft,
  Receipt,
  Search,
  Settings,
  Sparkles,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Shown as a count pill on the right of the row. */
  badge?: number;
  /** Screen is specified but not built in this phase. */
  planned?: boolean;
};

export type NavGroup = {
  label: string;
  items: NavItem[];
};

/**
 * Information architecture for Woodex PP-1.
 *
 * Woodex Admin v2.1 ships 60 `admin-*.js` modules rendered as a flat 34-item
 * menu. Its own audit (ADMIN-DEEP-AUDIT-AND-PLAN.md, "Q2. Menu hierarchy")
 * concluded that menu needed collapsing into 7 groups. PP-1 starts from that
 * conclusion rather than re-deriving it, and keeps the same group names so an
 * operator moving across finds things where the audit said they would be.
 */
export const NAV: NavGroup[] = [
  {
    label: "Overview",
    items: [{ label: "Dashboard", href: "/", icon: LayoutDashboard }],
  },
  {
    label: "Sales",
    items: [
      { label: "Enquiries", href: "/enquiries", icon: ListChecks, badge: 7 },
      { label: "Pipeline", href: "/pipeline", icon: FolderKanban },
      { label: "Clients", href: "/clients", icon: Users },
      { label: "Quotations", href: "/quotations", icon: FileText, badge: 3 },
      { label: "Invoices", href: "/invoices", icon: Receipt, badge: 2 },
      { label: "Projects", href: "/projects", icon: HardHat },
      { label: "Client updates", href: "/client-updates", icon: Bell, planned: true },
    ],
  },
  {
    label: "Conversations",
    items: [
      { label: "Live chat", href: "/chat", icon: MessageSquare, planned: true },
      { label: "Train AI", href: "/ai", icon: Sparkles, planned: true },
    ],
  },
  {
    label: "Website",
    items: [
      { label: "Pages", href: "/pages", icon: PanelsTopLeft },
      { label: "Page builder", href: "/builder", icon: Layers, planned: true },
      { label: "Section library", href: "/library", icon: Library },
      { label: "Header & footer", href: "/chrome", icon: PanelsTopLeft, planned: true },
      { label: "Media", href: "/media", icon: ImageIcon, planned: true },
    ],
  },
  {
    label: "Content",
    items: [
      { label: "Blog", href: "/blog", icon: Newspaper },
      { label: "Services", href: "/services", icon: Building2 },
      { label: "FAQs", href: "/faqs", icon: HelpCircle, planned: true },
      { label: "Testimonials", href: "/testimonials", icon: Star, planned: true },
    ],
  },
  {
    label: "Marketing & SEO",
    items: [
      { label: "SEO", href: "/seo", icon: Search },
      { label: "Redirects", href: "/redirects", icon: ArrowLeftRight, planned: true },
    ],
  },
  {
    label: "Settings",
    items: [
      { label: "Settings", href: "/settings", icon: Settings },
      { label: "Activity log", href: "/activity", icon: TrendingUp, planned: true },
      { label: "Backups", href: "/backups", icon: Archive, planned: true },
    ],
  },
];

export const NAV_FLAT: NavItem[] = NAV.flatMap((g) => g.items);

export function titleFor(href: string): string {
  const hit = NAV_FLAT.find((i) => i.href === href);
  return hit?.label ?? "Woodex";
}

export function groupFor(href: string): string {
  return NAV.find((g) => g.items.some((i) => i.href === href))?.label ?? "";
}
