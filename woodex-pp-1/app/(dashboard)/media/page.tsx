import { PageBody, PageHeader } from "@/components/ui/PageHeader";

export const metadata = { title: "Media Library" };

const FILES = [
  { name: "kitchen-elevation-DHA6.jpg", kind: "Image", size: "35 KB", tag: "DHA-6 refit", when: "2026-10-11", tone: "bg-primary/10 text-primary" },
  { name: "site-measure-Q118.pdf", kind: "PDF", size: "30 KB", tag: "Q-118", when: "2026-10-10", tone: "bg-destructive/10 text-destructive" },
  { name: "walnut-veneer-swatch.jpg", kind: "Image", size: "22 KB", tag: "samples", when: "2026-10-09", tone: "bg-primary/10 text-primary" },
  { name: "eid-collection-hero.jpg", kind: "Image", size: "48 KB", tag: "broadcast", when: "2026-10-08", tone: "bg-primary/10 text-primary" },
  { name: "contract-CT2094.pdf", kind: "PDF", size: "61 KB", tag: "CT-2094", when: "2026-09-14", tone: "bg-destructive/10 text-destructive" },
  { name: "showroom-walkthrough.mp4", kind: "Video", size: "18 MB", tag: "gallery", when: "2026-09-30", tone: "bg-sky-500/10 text-sky-500" },
  { name: "bahria-gallery-01.jpg", kind: "Image", size: "41 KB", tag: "city page", when: "2026-10-11", tone: "bg-primary/10 text-primary" },
  { name: "care-guide-wardrobes.pdf", kind: "PDF", size: "27 KB", tag: "after-care", when: "2026-08-22", tone: "bg-destructive/10 text-destructive" },
];

const ICON: Record<string, string> = {
  Image: "M3 5h18v14H3zM3 15l5-5 4 4 3-3 6 6",
  PDF: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6",
  Video: "m10 8 6 4-6 4zM2 6h14v12H2zM18 9l4-2v10l-4-2",
};

export default function MediaPage() {
  return (
    <>
      <PageHeader
        title="Media Library"
        description="Every asset served through the image pipeline — compressed, lazy-loaded and watermarked on request."
        actions={
          <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg bg-primary border border-primary-line text-primary-foreground hover:bg-primary-hover focus:outline-hidden focus:bg-primary-focus">
            Upload
          </button>
        }
      />
      <PageBody>
        {/* Dropzone + storage */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          <div className="xl:col-span-2 rounded-xl border border-dashed border-border bg-card px-6 py-8 text-center">
            <span className="mx-auto grid size-12 place-items-center rounded-full bg-primary/10 text-primary">
              <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 13v8M8 17l4-4 4 4M4 6h16" /></svg>
            </span>
            <p className="mt-3 text-sm font-medium text-foreground">Drag files here or click Upload</p>
            <p className="mt-1 text-xs text-muted-foreground-1">JPG · PNG · WEBP · PDF · MP4 — auto-optimized on ingest</p>
          </div>
          <div className="bg-card border border-card-line shadow-2xs rounded-xl p-5">
            <h2 className="text-sm font-semibold text-foreground">Storage</h2>
            <p className="mt-2 text-2xl font-bold text-foreground wx-num">1.9 GB <span className="text-sm font-medium text-muted-foreground-1">/ 5 GB</span></p>
            <div className="mt-2 h-1.5 rounded-full bg-muted">
              <div className="h-1.5 rounded-full bg-primary" style={{ width: "38%" }} />
            </div>
            <p className="mt-2 text-[11px] text-muted-foreground-1">312 images · 41 PDFs · 6 videos · pipeline saved 62% avg</p>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-5 flex flex-wrap items-center gap-x-2">
          {["All", "Images", "PDFs", "Videos"].map((f, i) => (
            <button key={f} type="button" className={`py-1.5 px-3 inline-flex items-center text-xs font-medium rounded-lg focus:outline-hidden ${i === 0 ? "bg-primary/10 text-primary" : "text-muted-foreground-1 hover:bg-muted-hover"}`}>
              {f}
            </button>
          ))}
          <span className="ms-auto text-xs text-muted-foreground-1">sorted by newest</span>
        </div>

        {/* Grid */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
          {FILES.map((f) => (
            <div key={f.name} className="group bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden transition-shadow hover:shadow-md">
              <div className={`grid h-24 place-items-center ${f.tone}`}>
                <svg className="shrink-0 size-8" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={ICON[f.kind]} /></svg>
              </div>
              <div className="p-3">
                <p className="truncate text-xs font-semibold text-foreground">{f.name}</p>
                <p className="mt-1 flex items-center justify-between text-[11px] text-muted-foreground-1">
                  <span>{f.kind} · {f.size}</span>
                  <span className="wx-num">{f.when}</span>
                </p>
                <p className="mt-1.5"><span className="inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold bg-muted text-muted-foreground">{f.tag}</span></p>
              </div>
            </div>
          ))}
        </div>
      </PageBody>
    </>
  );
}
