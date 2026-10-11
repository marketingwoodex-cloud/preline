import { PageBody, PageHeader } from "@/components/ui/PageHeader";

export const metadata = { title: "Post Editor" };

const TOOLBAR = ["B", "I", "U", "S", "H2", "H3", "“ ”", "•", "1.", "🔗", "IMG", "—"];

export default function EditorPage() {
  return (
    <>
      <PageHeader
        title="Edit post"
        description="How site visits work (and why they're free) — draft · autosaved 1 min ago"
        actions={
          <>
            <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-border bg-layer text-layer-foreground hover:bg-layer-hover focus:outline-hidden focus:bg-layer-focus">
              Preview
            </button>
            <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg bg-primary border border-primary-line text-primary-foreground hover:bg-primary-hover focus:outline-hidden focus:bg-primary-focus">
              Submit for review
            </button>
          </>
        }
      />
      <PageBody>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          <div className="xl:col-span-2">
            {/* Tabs */}
            <div className="flex items-center gap-x-1 border-b border-border">
              {["Content", "Settings", "SEO"].map((t, i) => (
                <button key={t} type="button" className={`-mb-px py-2.5 px-4 inline-flex items-center text-sm font-medium border-b-2 focus:outline-hidden ${i === 0 ? "border-primary text-primary" : "border-transparent text-muted-foreground-1 hover:text-foreground"}`}>
                  {t}
                </button>
              ))}
            </div>

            <div className="mt-5 bg-card border border-card-line shadow-2xs rounded-xl">
              {/* Dropzone */}
              <div className="m-4 rounded-xl border border-dashed border-border px-5 py-6 text-center">
                <span className="mx-auto grid size-10 place-items-center rounded-full bg-primary/10 text-primary">
                  <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 5h18v14H3z" /><path d="M3 15l5-5 4 4 3-3 6 6" /></svg>
                </span>
                <p className="mt-2 text-xs font-medium text-foreground">Cover image — drag or click</p>
                <p className="mt-0.5 text-[11px] text-muted-foreground-1">pipeline compresses to WEBP · 1600×900</p>
              </div>

              {/* Toolbar */}
              <div className="mx-4 flex flex-wrap items-center gap-x-1 rounded-t-lg border border-b-0 border-layer-line bg-surface px-2 py-1.5">
                {TOOLBAR.map((b) => (
                  <button key={b} type="button" className="min-w-7 h-7 px-1.5 inline-flex items-center justify-center rounded-md text-xs font-semibold text-muted-foreground-1 hover:bg-muted-hover hover:text-foreground focus:outline-hidden">
                    {b}
                  </button>
                ))}
              </div>

              {/* Writing surface */}
              <div className="mx-4 mb-4 rounded-b-lg border border-layer-line bg-layer p-5 min-h-72">
                <h2 className="text-lg font-bold text-foreground">How site visits work (and why they&apos;re free)</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  A site visit is 45 minutes: we measure, we listen, we look at how light moves through your
                  space, and we leave a rough range — not a promise, a range. It&apos;s free because the visit
                  is how we do our homework…
                </p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground-1">
                  <span className="text-primary">|</span> cursor · 612 words · AI assist on
                </p>
              </div>
            </div>
          </div>

          {/* Right rail */}
          <div className="space-y-5">
            <div className="bg-card border border-card-line shadow-2xs rounded-xl p-5">
              <h2 className="text-sm font-semibold text-foreground">Publish</h2>
              <dl className="mt-3 space-y-2 text-xs">
                <div className="flex justify-between rounded-lg border border-layer-line bg-layer px-3 py-2"><dt className="text-muted-foreground-1">Status</dt><dd className="font-semibold text-amber-500">Draft</dd></div>
                <div className="flex justify-between rounded-lg border border-layer-line bg-layer px-3 py-2"><dt className="text-muted-foreground-1">Author</dt><dd className="font-semibold text-foreground">Editor</dd></div>
                <div className="flex justify-between rounded-lg border border-layer-line bg-layer px-3 py-2"><dt className="text-muted-foreground-1">Category</dt><dd className="font-semibold text-foreground">Process</dd></div>
              </dl>
              <button type="button" className="mt-4 w-full py-2 px-3 inline-flex justify-center items-center text-sm font-medium rounded-lg border border-border bg-layer text-layer-foreground hover:bg-layer-hover focus:outline-hidden">
                Save draft
              </button>
            </div>

            <div className="bg-card border border-card-line shadow-2xs rounded-xl p-5">
              <h2 className="text-sm font-semibold text-foreground">SEO</h2>
              <label className="mt-3 block text-xs text-muted-foreground-1" htmlFor="seo-title">Title tag</label>
              <input id="seo-title" className="mt-1 py-2 px-3 block w-full bg-layer border border-layer-line text-sm rounded-lg placeholder:text-muted-foreground-1 focus:border-border focus:ring-border" defaultValue="Free Site Visit Lahore — How It Works | Woodex" />
              <p className="mt-1 text-[11px] text-muted-foreground-1 wx-num">52/60 chars</p>
              <label className="mt-3 block text-xs text-muted-foreground-1" htmlFor="seo-slug">Slug</label>
              <input id="seo-slug" className="mt-1 py-2 px-3 block w-full bg-layer border border-layer-line text-sm rounded-lg text-primary" defaultValue="/blog/how-site-visits-work" />
              <label className="mt-3 block text-xs text-muted-foreground-1" htmlFor="seo-desc">Meta description</label>
              <textarea id="seo-desc" rows={3} className="mt-1 py-2 px-3 block w-full bg-layer border border-layer-line text-sm rounded-lg placeholder:text-muted-foreground-1 focus:border-border focus:ring-border" defaultValue="What happens in a free Woodex site visit: measure, listen, rough range. 45 minutes, no obligation, Lahore-wide." />
              <p className="mt-1 text-[11px] text-muted-foreground-1 wx-num">118/160 chars</p>
            </div>
          </div>
        </div>
      </PageBody>
    </>
  );
}
