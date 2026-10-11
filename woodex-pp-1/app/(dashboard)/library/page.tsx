import { PageBody, PageHeader } from "@/components/ui/PageHeader";

export const metadata = { title: "Design Library" };

const FINISHES = [
  { name: "Walnut veneer (matte)", type: "Veneer", stock: "42 sheets", tone: "bg-[#5b4632]", pop: "most specified in 2026" },
  { name: "Ash blonde (satin)", type: "Veneer", stock: "18 sheets", tone: "bg-[#c9b28c]", pop: "scandi kitchens" },
  { name: "Matte black lacquer", type: "Lacquer", stock: "30 sheets", tone: "bg-[#17181c]", pop: "TV walls" },
  { name: "Ivory matte lacquer", type: "Lacquer", stock: "26 sheets", tone: "bg-[#ece7dd]", pop: "wardrobes" },
  { name: "Brass inlay strip", type: "Inlay", stock: "120 m", tone: "bg-[#b98a3d]", pop: "Eid collection" },
  { name: "Fluted oak panel", type: "Panel", stock: "14 sheets", tone: "bg-[#8a6a48]", pop: "receptions" },
  { name: "Emerald gloss acrylic", type: "Acrylic", stock: "9 sheets", tone: "bg-[#14532d]", pop: "statement islands" },
  { name: "Terrazzo-look laminate", type: "Laminate", stock: "22 sheets", tone: "bg-[#d8d3ca]", pop: "bathroom vanities" },
];

export default function LibraryPage() {
  return (
    <>
      <PageHeader
        title="Design Library"
        description="Finishes and materials the showroom quotes from. Swatches sync to the sample-kit courier list."
        actions={
          <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg bg-primary border border-primary-line text-primary-foreground hover:bg-primary-hover focus:outline-hidden focus:bg-primary-focus">
            Add finish
          </button>
        }
      />
      <PageBody>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
          {FINISHES.map((f) => (
            <div key={f.name} className="group bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden transition-shadow hover:shadow-md">
              <div className={`h-24 ${f.tone} transition-transform duration-200 group-hover:scale-[1.02]`} />
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="text-sm font-semibold text-foreground">{f.name}</h2>
                  <span className="shrink-0 inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold bg-muted text-muted-foreground">{f.type}</span>
                </div>
                <p className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground-1">
                  <span className="wx-num">{f.stock}</span>
                  <span>{f.pop}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-5 text-xs text-muted-foreground-1">
          Low-stock rule: under 10 sheets auto-raises a purchase suggestion in /approvals.
        </p>
      </PageBody>
    </>
  );
}
