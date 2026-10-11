import { PageBody, PageHeader } from "@/components/ui/PageHeader";

export const metadata = { title: "Prompt Library" };

const PROMPTS = [
  { name: "Lead scoring", ver: "v4.2", use: "Scores every new lead 1–10 with a reason line", pass: "94%", tested: "2026-10-10", status: "Live" },
  { name: "Reply assistant — warm lead", ver: "v3.1", use: "Drafts WhatsApp replies for score ≥ 8 leads", pass: "91%", tested: "2026-10-08", status: "Live" },
  { name: "Reply assistant — complaint", ver: "v2.4", use: "De-escalation drafts; always routes to human", pass: "97%", tested: "2026-09-30", status: "Live" },
  { name: "City page first draft", ver: "v1.8", use: "Price/process/proof structure per area brief", pass: "88%", tested: "2026-10-05", status: "Live" },
  { name: "Blog intro writer", ver: "v1.3", use: "Hooks from real project stories, no fluff", pass: "82%", tested: "2026-09-22", status: "Review" },
  { name: "Quote follow-up nudge", ver: "v2.0", use: "3-touch sequence for silent quotes", pass: "90%", tested: "2026-10-11", status: "Live" },
];

const PILL: Record<string, string> = {
  Live: "bg-teal-500/10 text-teal-500 ring-teal-500/25",
  Review: "bg-amber-500/10 text-amber-500 ring-amber-500/25",
};

export default function PromptsPage() {
  return (
    <>
      <PageHeader
        title="Prompt Library"
        description="Versioned, tested prompts behind every AI feature. Nothing goes live without an eval pass ≥ 80% and an owner sign-off."
        actions={
          <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg bg-primary border border-primary-line text-primary-foreground hover:bg-primary-hover focus:outline-hidden focus:bg-primary-focus">
            New prompt
          </button>
        }
      />
      <PageBody>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PROMPTS.map((p) => (
            <div key={p.name} className="bg-card border border-card-line shadow-2xs rounded-xl p-5 transition-shadow hover:shadow-md">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-x-2.5">
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 18 6-6-6-6M8 6l-6 6 6 6" /></svg>
                  </span>
                  <div>
                    <h2 className="text-sm font-semibold text-foreground">{p.name}</h2>
                    <code className="text-[11px] text-primary">{p.ver}</code>
                  </div>
                </div>
                <span className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${PILL[p.status]}`}>{p.status}</span>
              </div>
              <p className="mt-3 text-xs text-muted-foreground-1">{p.use}</p>
              <div className="mt-4 flex items-center justify-between border-t border-card-divider pt-3 text-[11px] text-muted-foreground-1">
                <span>eval pass <span className="font-bold text-teal-500 wx-num">{p.pass}</span></span>
                <span className="wx-num">tested {p.tested}</span>
              </div>
            </div>
          ))}
        </div>
      </PageBody>
    </>
  );
}
