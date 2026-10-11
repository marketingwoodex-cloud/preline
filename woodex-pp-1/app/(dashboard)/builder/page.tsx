import { PageBody, PageHeader } from "@/components/ui/PageHeader";

export const metadata = { title: "Page Builder" };

const PALETTE = [
  { name: "Hero", desc: "Headline + CTA + image", icon: "M3 3h18v8H3z" },
  { name: "Services grid", desc: "3–6 service cards", icon: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" },
  { name: "Gallery", desc: "Masonry project photos", icon: "M3 5h18v14H3zM3 15l5-5 4 4 3-3 6 6" },
  { name: "Testimonials", desc: "Client quote carousel", icon: "M8 10h8M8 14h5M21 12a9 9 0 1 1-4-7.5" },
  { name: "CTA band", desc: "Free site-visit banner", icon: "M4 9h16v6H4z" },
  { name: "FAQ", desc: "Accordion questions", icon: "M9 9a3 3 0 1 1 5 2.2c-.8.7-2 1.3-2 2.8M12 17h.01" },
];

const CANVAS = [
  { name: "Hero", note: "“Kitchens that earn compliments” · CTA → Book free site visit", state: "edited" },
  { name: "Services grid", note: "Kitchens · Wardrobes · Bathrooms · Fit-outs (4 cards)", state: "default" },
  { name: "Gallery", note: "12 photos · filter: DHA projects", state: "edited" },
  { name: "CTA band", note: "Monsoon offer · links /bookings", state: "scheduled" },
];

export default function BuilderPage() {
  return (
    <>
      <PageHeader
        title="Page Builder"
        description="Compose woodex.pk pages from pre-approved blocks. Draft: /kitchens-lahore — autosaved 2 min ago."
        actions={
          <>
            <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-border bg-layer text-layer-foreground hover:bg-layer-hover focus:outline-hidden focus:bg-layer-focus">
              Preview
            </button>
            <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg bg-primary border border-primary-line text-primary-foreground hover:bg-primary-hover focus:outline-hidden focus:bg-primary-focus">
              Publish
            </button>
          </>
        }
      />
      <PageBody>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          {/* Palette */}
          <div className="bg-card border border-card-line shadow-2xs rounded-xl p-4">
            <h2 className="text-sm font-semibold text-foreground">Blocks</h2>
            <p className="mt-1 text-xs text-muted-foreground-1">Click to append to the canvas.</p>
            <ul className="mt-4 space-y-2">
              {PALETTE.map((p) => (
                <li key={p.name}>
                  <button type="button" className="w-full flex items-center gap-x-3 rounded-lg border border-layer-line bg-layer px-3 py-2.5 text-start hover:bg-layer-hover focus:outline-hidden focus:bg-layer-focus transition-transform hover:translate-x-0.5">
                    <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                      <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={p.icon} /></svg>
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold text-foreground">{p.name}</span>
                      <span className="block truncate text-[11px] text-muted-foreground-1">{p.desc}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Canvas */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-card-line shadow-2xs rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-foreground">Canvas</h2>
                <code className="text-[11px] text-primary">woodex.pk/kitchens-lahore</code>
              </div>
              {CANVAS.map((b, i) => (
                <div key={i} className="group rounded-xl border border-layer-line bg-layer p-4 transition-shadow hover:shadow-md">
                  <div className="flex items-center gap-x-3">
                    <svg className="shrink-0 size-4 text-muted-foreground-1 cursor-grab" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><circle cx="9" cy="6" r="1.5" /><circle cx="15" cy="6" r="1.5" /><circle cx="9" cy="12" r="1.5" /><circle cx="15" cy="12" r="1.5" /><circle cx="9" cy="18" r="1.5" /><circle cx="15" cy="18" r="1.5" /></svg>
                    <p className="grow text-sm font-semibold text-foreground">{i + 1}. {b.name}</p>
                    <span className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${b.state === "edited" ? "bg-primary/10 text-primary" : b.state === "scheduled" ? "bg-amber-500/10 text-amber-500" : "bg-muted text-muted-foreground"}`}>{b.state}</span>
                    <button type="button" className="py-1 px-2 text-[11px] font-medium rounded-md border border-border bg-card text-foreground hover:bg-layer-hover focus:outline-hidden opacity-60 group-hover:opacity-100">Edit</button>
                  </div>
                  <p className="mt-2 ps-7 text-xs text-muted-foreground-1">{b.note}</p>
                </div>
              ))}
              <button type="button" className="w-full rounded-xl border border-dashed border-border px-4 py-3 text-xs font-medium text-muted-foreground-1 hover:bg-muted-hover focus:outline-hidden">
                + Drop a block here
              </button>
            </div>
          </div>

          {/* Page settings */}
          <div className="bg-card border border-card-line shadow-2xs rounded-xl p-5">
            <h2 className="text-sm font-semibold text-foreground">Page settings</h2>
            <dl className="mt-4 space-y-3 text-xs">
              <div>
                <dt className="text-muted-foreground-1">Slug</dt>
                <dd className="mt-1"><code className="rounded-md bg-layer border border-layer-line px-2 py-1 text-primary">/kitchens-lahore</code></dd>
              </div>
              <div>
                <dt className="text-muted-foreground-1">SEO title</dt>
                <dd className="mt-1 text-foreground">Modular Kitchens in Lahore — Designs, Prices & Free Site Visit</dd>
              </div>
              <div>
                <dt className="text-muted-foreground-1">Status</dt>
                <dd className="mt-1"><span className="inline-flex items-center rounded-md px-1.5 py-0.5 font-semibold bg-amber-500/10 text-amber-500 ring-1 ring-inset ring-amber-500/25">Draft — review passed</span></dd>
              </div>
              <div>
                <dt className="text-muted-foreground-1">Template</dt>
                <dd className="mt-1 text-foreground">City landing (v3)</dd>
              </div>
            </dl>
          </div>
        </div>
      </PageBody>
    </>
  );
}
