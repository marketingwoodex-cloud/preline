/**
 * Deterministic fixture data shaped exactly like the v2.1 `dash_data` response.
 *
 * Used for local development and for the Hostinger build until the copied PHP
 * layer (`api/*.php`) is wired in. Seeded, so screenshots and QA runs are
 * reproducible — no `Math.random()`.
 */
import {
  CRM_STAGES,
  type Client,
  type DashData,
  type Invoice,
  type Lead,
  type Post,
  type Project,
  type Quote,
  type Role,
  type SectionBlock,
  type Service,
  type SitePage,
} from "@/lib/domain";

/* --- tiny seeded PRNG (mulberry32) ---------------------------------- */
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = rng(20261012);
const pick = <T,>(arr: readonly T[]): T => arr[Math.floor(rand() * arr.length)];
const int = (min: number, max: number) => min + Math.floor(rand() * (max - min + 1));

/* --- calendar -------------------------------------------------------- */
/** Anchored to today so "needs attention" always has live-looking data. */
const TODAY = new Date();
function iso(offsetDays: number): string {
  const d = new Date(TODAY);
  d.setDate(d.getDate() - offsetDays);
  return d.toISOString().slice(0, 10);
}
function axis(days: number): string[] {
  return Array.from({ length: days }, (_, i) => iso(days - 1 - i));
}

/* --- reference data -------------------------------------------------- */
const CITIES = ["Lahore", "Karachi", "Islamabad", "Faisalabad", "Multan", "Rawalpindi", "Gujranwala"];
const AREAS = [
  "DHA Phase 6",
  "Gulberg III",
  "Bahria Town",
  "Model Town",
  "Clifton Block 4",
  "E-11",
  "Johar Town",
  "Cantt",
  "Askari 11",
  "Faisal Town",
];
const SERVICES = [
  "Complete interior design",
  "Kitchen renovation",
  "Wardrobe & carpentry",
  "Office fit-out",
  "False ceiling",
  "3D visualisation",
  "Architecture & structural",
  "Commercial renovation",
  "Bathroom redesign",
  "Furniture (loose + fixed)",
];
const FIRST = ["Ahmed", "Fatima", "Bilal", "Ayesha", "Usman", "Hina", "Hassan", "Zara", "Omar", "Mahnoor", "Kamran", "Sana", "Faisal", "Iqra", "Tariq"];
const LAST = ["Butt", "Chaudhry", "Malik", "Sheikh", "Qureshi", "Siddiqui", "Raza", "Khan", "Iqbal", "Gill", "Nadeem", "Farooq"];
const SOURCES = ["contact", "whatsapp", "google", "estimator", "referral", "instagram", "booking", "architect", "walkin", "phone"];
const TEAM = ["Kamran Tariq", "Sana Malik", "Bilal Ahmed", "Hina Raza", "Omar Sheikh"];

const name = () => `${pick(FIRST)} ${pick(LAST)}`;

/* --- leads ----------------------------------------------------------- */
export const LEADS: Lead[] = Array.from({ length: 46 }, (_, i) => {
  const stage = pick(CRM_STAGES);
  const created = iso(int(0, 55));
  const value = int(2, 96) * 50_000;
  return {
    id: 1000 + i,
    created_at: `${created} 0${int(9, 9)}:${int(10, 59)}:00`,
    source: pick(SOURCES),
    name: name(),
    phone: `+92 3${int(0, 4)}${int(10000000, 99999999)}`,
    email: `client${1000 + i}@example.pk`,
    service: pick(SERVICES),
    message: `Looking for ${pick(SERVICES).toLowerCase()} in ${pick(AREAS)}, ${pick(CITIES)}.`,
    stage,
    assigned_to: int(1, 5),
    assigned_name: pick(TEAM),
    followup: stage === "won" || stage === "lost" ? null : iso(-int(1, 9)),
    value: stage === "new" ? 0 : value,
    lost_reason: stage === "lost" ? pick(["Budget", "Went with competitor", "Project paused", "No response"]) : null,
    client_id: stage === "won" ? int(1, 18) : null,
    is_read: i > 6,
    notes: [],
  };
});

/* --- quotes / invoices / projects / clients --------------------------- */
export const QUOTES: Quote[] = Array.from({ length: 24 }, (_, i) => {
  const status = pick(["draft", "sent", "sent", "approved", "declined", "expired"] as const);
  const total = int(4, 220) * 25_000;
  return {
    id: 14 + i,
    no: `WX-Q-2610-${String(1 + i).padStart(3, "0")}`,
    client: { name: name() },
    title: `${pick(AREAS)} — ${pick(SERVICES)}`,
    template: pick(["single", "project", "boq"] as const),
    status,
    total,
    sent_at: status === "draft" ? null : iso(int(0, 40)),
    approved_at: status === "approved" ? iso(int(0, 25)) : null,
    expires: status === "sent" ? iso(-int(3, 20)) : null,
  };
});

export const INVOICES: Invoice[] = Array.from({ length: 21 }, (_, i) => {
  const total = int(6, 260) * 25_000;
  const paidPart = rand() < 0.45 ? Math.round(total * (0.2 + rand() * 0.5)) : rand() < 0.4 ? total : 0;
  const balance = total - paidPart;
  const due = iso(-int(-20, 30));
  const overdue = balance > 0 && new Date(due) < TODAY;
  return {
    id: 91 + i,
    no: `WX-INV-${String(91 + i).padStart(4, "0")}`,
    client: { name: name() },
    issue_date: iso(int(5, 90)),
    due_date: due,
    total,
    balance,
    overdue,
    status: balance === 0 ? "paid" : overdue ? "overdue" : paidPart > 0 ? "part_paid" : "sent",
    payments: paidPart > 0 ? [{ date: iso(int(1, 30)), amount: paidPart, method: pick(["Bank Alfalah", "Meezan Bank", "Cash", "Cheque"]), ref: `TRX-${int(100000, 999999)}` }] : [],
  };
});

export const PROJECTS: Project[] = Array.from({ length: 9 }, (_, i) => ({
  id: 7 + i,
  name: `${pick(AREAS)} ${pick(["Residence", "Office", "Retail", "Farmhouse"])}`,
  client: name(),
  city: pick(CITIES),
  stage: pick(["design", "civil", "carpentry", "finishing", "handover"] as const),
  progress: int(8, 96),
  value: int(30, 480) * 25_000,
  start: iso(int(20, 200)),
  eta: iso(-int(10, 120)),
  lead: pick(TEAM),
}));

export const CLIENTS: Client[] = Array.from({ length: 18 }, (_, i) => ({
  id: 1 + i,
  name: name(),
  phone: `+92 3${int(0, 4)}${int(10000000, 99999999)}`,
  email: `client${i + 1}@example.pk`,
  city: pick(CITIES),
  created_at: iso(int(20, 400)),
  last_activity: iso(int(0, 40)),
  value: int(2, 60) * 100_000,
  open_quotes: int(0, 3),
  unpaid: rand() < 0.4 ? int(1, 18) * 50_000 : 0,
  leads: LEADS.filter((l) => l.client_id === i + 1).map((l) => ({ id: l.id, stage: l.stage, service: l.service, value: l.value })),
}));

/* --- website --------------------------------------------------------- */
const PAGE_TYPES = ["service", "location", "project", "blog", "static"] as const;
export const PAGES: SitePage[] = Array.from({ length: 34 }, (_, i) => ({
  id: 1 + i,
  path: i === 0 ? "/" : `/${pick(["interior-design", "kitchen-design", "lahore", "karachi", "projects", "insights", "office-fit-out", "false-ceiling-design"])}${i > 8 ? `-${i}` : ""}/`,
  title: `${pick(SERVICES)} in ${pick(CITIES)}`,
  type: i === 0 ? "home" : pick(PAGE_TYPES),
  status: rand() < 0.82 ? "published" : rand() < 0.5 ? "hidden" : "draft",
  seo_score: int(41, 100),
  seo_issues: rand() < 0.4 ? [pick(["Missing meta description", "H1 duplicated", "Image without alt text", "Canonical missing", "Title over 60 characters"])] : [],
  updated_at: iso(int(0, 60)),
  updated_by: pick(TEAM),
  views_30d: int(12, 4200),
}));

export const BLOCKS: SectionBlock[] = [
  { id: "blk-hero-luxury", name: "Luxury Interior Hero", kind: "hero", cat: "Hero & Banners", tags: ["hero", "luxury"], global: true, used_on: 14, updated: iso(3) },
  { id: "blk-hero-kitchen", name: "Kitchen Master Showcase", kind: "hero", cat: "Hero & Banners", tags: ["hero", "kitchen"], global: false, used_on: 6, updated: iso(9) },
  { id: "blk-kitchen-acrylic", name: "German Acrylic Island", kind: "gallery", cat: "Kitchens & Cabinetry", tags: ["kitchen", "acrylic"], global: false, used_on: 8, updated: iso(1) },
  { id: "blk-wardrobe-matte", name: "Matte Charcoal Wardrobe", kind: "gallery", cat: "Kitchens & Cabinetry", tags: ["wardrobe"], global: true, used_on: 11, updated: iso(5) },
  { id: "blk-cta-quote", name: "Get a Free Quote CTA", kind: "cta", cat: "CTA", tags: ["cta", "conversion"], global: true, used_on: 47, updated: iso(0) },
  { id: "blk-faq-service", name: "Service FAQ (schema)", kind: "faq", cat: "FAQ", tags: ["faq", "seo"], global: true, used_on: 23, updated: iso(2) },
  { id: "blk-testimonials-grid", name: "Client Testimonials Grid", kind: "testimonials", cat: "Trust", tags: ["reviews"], global: false, used_on: 9, updated: iso(7) },
  { id: "blk-process-5step", name: "5-Step Process Timeline", kind: "process", cat: "Content", tags: ["process"], global: true, used_on: 19, updated: iso(4) },
  { id: "blk-office-fitout", name: "Office Fit-out Split", kind: "split", cat: "Commercial", tags: ["office", "fitout"], global: false, used_on: 5, updated: iso(12) },
  { id: "blk-city-intro", name: "City Intro + Areas Served", kind: "intro", cat: "Location", tags: ["city", "seo"], global: true, used_on: 31, updated: iso(6) },
];

export const POSTS: Post[] = Array.from({ length: 14 }, (_, i) => ({
  id: 1 + i,
  slug: `interior-design-cost-pakistan-${i + 1}`,
  title: pick([
    "Interior design cost in Pakistan: 2026 rate guide",
    "German acrylic vs. laminate kitchens: what actually lasts",
    "How long does a 10 marla interior take?",
    "Office fit-out in Lahore: a realistic timeline",
    "False ceiling designs that survive Lahore summers",
    "Wardrobe internals: planning for Pakistani clothing",
    "BOQ explained: reading your contractor's quote",
    "Marble vs. tile vs. engineered wood in 2026",
  ]),
  excerpt: "A practical, rate-backed walkthrough written for homeowners and facilities teams budgeting in PKR.",
  status: rand() < 0.75 ? "published" : "draft",
  category: pick(["Cost guides", "Materials", "Process", "City guides"]),
  author: pick(TEAM),
  published_at: iso(int(0, 120)),
  views_30d: int(40, 6800),
  read_minutes: int(4, 14),
}));

export const SERVICE_PAGES: Service[] = [
  { id: 1, slug: "interior-design", name: "Interior Design", pages: 18, status: "live", leads_30d: 34, enquiries: 128 },
  { id: 2, slug: "kitchen-design", name: "Kitchen Design", pages: 12, status: "live", leads_30d: 27, enquiries: 96 },
  { id: 3, slug: "office-fit-out", name: "Office Fit-out", pages: 9, status: "live", leads_30d: 14, enquiries: 51 },
  { id: 4, slug: "false-ceiling-design", name: "False Ceiling", pages: 7, status: "live", leads_30d: 11, enquiries: 40 },
  { id: 5, slug: "3d-visualization", name: "3D Visualisation", pages: 6, status: "live", leads_30d: 9, enquiries: 33 },
  { id: 6, slug: "wardrobe-design", name: "Wardrobe Design", pages: 5, status: "draft", leads_30d: 4, enquiries: 12 },
];

/* --- dashboard ------------------------------------------------------- */
function seriesFor(days: number, base: number, spread: number): number[] {
  return axis(days).map((_, i) => {
    // gentle upward drift + weekday dip on Friday/Saturday
    const dow = new Date(iso(days - 1 - i)).getDay();
    const weekend = dow === 5 || dow === 6 ? 0.55 : 1;
    const drift = 1 + (i / days) * 0.45;
    return Math.max(0, Math.round(base * drift * weekend + (rand() - 0.5) * spread));
  });
}

export function dashData(days: 7 | 28 | 90 = 28, role: Role = "owner"): DashData {
  const ax = axis(days);
  const visitors = ax.map(() => int(320, 2400));

  const funnel = Object.fromEntries(
    CRM_STAGES.map((s) => [s, LEADS.filter((l) => l.stage === s).length]),
  ) as DashData["crm"] extends null ? never : Record<(typeof CRM_STAGES)[number], number>;

  const open = LEADS.filter((l) => l.stage !== "won" && l.stage !== "lost");
  const overdue = INVOICES.filter((i) => i.overdue);
  const todayStr = iso(0);

  const recent = [...LEADS]
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
    .slice(0, 7)
    .map(({ id, name: n, service, stage, source, created_at, is_read }) => ({ id, name: n, service, stage, source, created_at, is_read }));

  const followups = open
    .filter((l) => l.followup && l.followup <= todayStr)
    .slice(0, 6)
    .map((l) => ({ id: l.id, name: l.name, service: l.service, stage: l.stage, followup: l.followup as string, late: (l.followup as string) < todayStr }));

  const sourceCounts = SOURCES.map((s) => ({
    name: s,
    n: LEADS.filter((l) => l.source === s).length,
  }))
    .filter((s) => s.n > 0)
    .sort((a, b) => b.n - a.n)
    .slice(0, 6);

  const monthPaid = INVOICES.flatMap((i) => i.payments).reduce((s, p) => s + p.amount, 0);

  return {
    ok: true,
    days,
    role,
    axis: ax,
    visitors,
    crm: {
      kpi: {
        leads: [LEADS.filter((l) => l.created_at >= iso(days)).length, Math.round(LEADS.length * 0.42)],
        pipeline: open.reduce((s, l) => s + l.value, 0),
        quotesSent: [QUOTES.filter((q) => q.sent_at).length, 14],
        openQuotes: [QUOTES.filter((q) => q.status === "sent").length, QUOTES.filter((q) => q.status === "sent").reduce((s, q) => s + q.total, 0)],
        paid: [monthPaid, Math.round(monthPaid * 0.72)],
        unpaid: INVOICES.reduce((s, i) => s + i.balance, 0),
        won: LEADS.filter((l) => l.stage === "won").length,
      },
      series: {
        leads: seriesFor(days, 2.4, 2),
        sent: seriesFor(days, 1.5, 1.6),
        won: seriesFor(days, 0.7, 1.1),
        invoiced: seriesFor(days, 420_000, 260_000),
        paid: seriesFor(days, 330_000, 210_000),
      },
      funnel,
      recent,
      followups,
      overdue: overdue.slice(0, 6).map((i) => ({ id: i.id, no: i.no, client: i.client.name, balance: i.balance, due: i.due_date })),
      overdueN: overdue.length,
      sources: sourceCounts,
      chips: { new: LEADS.filter((l) => !l.is_read).length, overdue: overdue.length, follow: followups.length },
      target: { target: 18_000_000, month: monthPaid, monthLabel: TODAY.toLocaleDateString("en-GB", { month: "long", year: "numeric" }) },
    },
    website: {
      pages: PAGES.length,
      published: PAGES.filter((p) => p.status === "published").length,
      drafts: PAGES.filter((p) => p.status === "draft").length,
      avg_seo: Math.round(PAGES.reduce((s, p) => s + p.seo_score, 0) / PAGES.length),
      speed: 87,
      health: 74,
      broken_links: 6,
      heavy_images: 13,
      recent_edits: PAGES.slice(0, 5).map((p) => ({ page: p.path, by: p.updated_by, when: p.updated_at })),
    },
  };
}
