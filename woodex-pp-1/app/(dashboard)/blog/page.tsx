import Link from "next/link";
import { PageBody, PageHeader } from "@/components/ui/PageHeader";

export const metadata = { title: "Blog" };

const POSTS = [
  { title: "Eid Collection 2026: walnut, brass inlay & marquetry", status: "Published", views: 2140, leads: 18, updated: "2026-10-08" },
  { title: "What a modular kitchen costs in Lahore (2026 prices)", status: "Published", views: 4820, leads: 41, updated: "2026-09-30" },
  { title: "DHA Phase 6 kitchen refit — before & after", status: "Published", views: 1690, leads: 12, updated: "2026-09-22" },
  { title: "Wardrobe care: monsoon edition", status: "Review", views: 0, leads: 0, updated: "2026-10-11" },
  { title: "Five bathroom mistakes we fix every week", status: "Published", views: 980, leads: 7, updated: "2026-09-14" },
  { title: "How site visits work (and why they're free)", status: "Draft", views: 0, leads: 0, updated: "2026-10-12" },
];

const PILL: Record<string, string> = {
  Published: "bg-teal-500/10 text-teal-500 ring-teal-500/25",
  Review: "bg-amber-500/10 text-amber-500 ring-amber-500/25",
  Draft: "bg-muted text-muted-foreground ring-border",
};

export default function BlogPage() {
  return (
    <>
      <PageHeader
        title="Blog"
        description="Stories that sell: real projects, real prices, real care. Every post links to a booking CTA."
        actions={
          <Link href="/blog/editor" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg bg-primary border border-primary-line text-primary-foreground hover:bg-primary-hover focus:outline-hidden focus:bg-primary-focus">
            New post
          </Link>
        }
      />
      <PageBody>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          {/* Post list */}
          <div className="xl:col-span-2 bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-card-line">
              <h2 className="text-sm font-semibold text-foreground">Posts</h2>
            </div>
            <ul className="divide-y divide-card-divider">
              {POSTS.map((p) => (
                <li key={p.title}>
                  <Link href="/blog/editor" className="px-5 py-4 flex items-center gap-x-4 hover:bg-muted-hover focus:outline-hidden focus:bg-muted-focus">
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                      <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>
                    </span>
                    <div className="min-w-0 grow">
                      <p className="truncate text-sm font-medium text-foreground">{p.title}</p>
                      <p className="mt-0.5 text-[11px] text-muted-foreground-1 wx-num">{p.views.toLocaleString()} views · {p.leads} leads · upd {p.updated}</p>
                    </div>
                    <span className={`shrink-0 inline-flex items-center rounded-md px-1.5 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${PILL[p.status]}`}>{p.status}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Analytics rail */}
          <div className="space-y-5">
            <div className="bg-card border border-card-line shadow-2xs rounded-xl p-5">
              <h2 className="text-sm font-semibold text-foreground">Content performance</h2>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xl font-bold text-foreground wx-num">11.4k</p>
                  <p className="text-[11px] text-muted-foreground-1">views / 30d</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-teal-500 wx-num">86</p>
                  <p className="text-[11px] text-muted-foreground-1">leads / 30d</p>
                </div>
              </div>
              <div className="mt-4 border-t border-card-divider pt-3">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground-1">Top post</p>
                <p className="mt-1 text-xs text-foreground">“What a modular kitchen costs in Lahore” — 0.85% visit→lead</p>
              </div>
            </div>
            <div className="bg-card border border-card-line shadow-2xs rounded-xl p-5">
              <h2 className="text-sm font-semibold text-foreground">Editorial queue</h2>
              <ul className="mt-3 space-y-2 text-xs">
                <li className="flex justify-between rounded-lg border border-layer-line bg-layer px-3 py-2"><span className="text-foreground">1 in review</span><span className="text-amber-500 font-semibold">editor sign-off</span></li>
                <li className="flex justify-between rounded-lg border border-layer-line bg-layer px-3 py-2"><span className="text-foreground">2 drafts</span><span className="text-muted-foreground-1">AI first-pass</span></li>
                <li className="flex justify-between rounded-lg border border-layer-line bg-layer px-3 py-2"><span className="text-foreground">Next publish</span><span className="text-foreground font-semibold wx-num">Oct 15</span></li>
              </ul>
            </div>
          </div>
        </div>
      </PageBody>
    </>
  );
}
