import { PageBody, PageHeader } from "@/components/ui/PageHeader";

export const metadata = { title: "Call Log" };

const KPIS = [
  { label: "Calls today", value: "18", note: "11 outbound" },
  { label: "Missed", value: "3", note: "2 in callback queue" },
  { label: "Avg. duration", value: "4m 20s", note: "outbound, 7d" },
  { label: "Contact rate", value: "64%", note: "dials reaching a human" },
];

const CALLS = [
  { who: "Ayesha Khan", no: "+92 300 ••• •214", dir: "Out", dur: "6m 12s", lead: "L-1042", agent: "You", note: "Confirmed Thursday measure; asked for walnut samples", when: "10:48" },
  { who: "Usman Bhatti", no: "+92 321 ••• •887", dir: "In", dur: "3m 05s", lead: "L-1038", agent: "Sana R.", note: "Wants quote revision: island 8ft instead of 10ft", when: "09:57" },
  { who: "Unknown", no: "+92 333 ••• •410", dir: "Missed", dur: "—", lead: "—", agent: "—", note: "Callback queued → sales", when: "09:12" },
  { who: "Hina Raza", no: "+92 301 ••• •552", dir: "Out", dur: "2m 41s", lead: "L-1029", agent: "You", note: "Rescheduled showroom visit to Friday 5pm", when: "Yesterday" },
  { who: "Bilal Chaudhry", no: "+92 345 ••• •230", dir: "In", dur: "8m 03s", lead: "L-0997", agent: "Omar M.", note: "Advance payment confirmed; invoice issued", when: "Yesterday" },
  { who: "Fatima Noor", no: "+92 322 ••• •664", dir: "Missed", dur: "—", lead: "L-1044", agent: "—", note: "New enquiry from web form; second attempt 16:00", when: "Yesterday" },
];

const DIR: Record<string, string> = {
  Out: "bg-primary/10 text-primary",
  In: "bg-teal-500/10 text-teal-500",
  Missed: "bg-destructive/10 text-destructive",
};

export default function CallsPage() {
  return (
    <>
      <PageHeader
        title="Call Log"
        description="Every inbound, outbound and missed call tied to its lead. Missed calls auto-queue a callback within 2 business hours."
      />
      <PageBody>
        <div className="grid grid-cols-2 gap-5 xl:grid-cols-4">
          {KPIS.map((k) => (
            <div key={k.label} className="bg-card border border-card-line shadow-2xs rounded-xl p-4">
              <p className="text-xs text-muted-foreground-1">{k.label}</p>
              <p className="mt-1 text-2xl font-bold text-foreground wx-num">{k.value}</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground-1">{k.note}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 bg-card border border-card-line shadow-2xs rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-card-line flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">Recent calls</h2>
            <button type="button" className="py-1.5 px-2.5 inline-flex items-center text-xs font-medium rounded-lg border border-border bg-layer text-layer-foreground hover:bg-layer-hover focus:outline-hidden focus:bg-layer-focus">
              Log a call
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-card-divider">
              <thead className="bg-surface">
                <tr>
                  {["Caller", "Direction", "Duration", "Lead", "Agent", "Outcome note", "When"].map((h) => (
                    <th key={h} scope="col" className="px-4 py-2.5 text-start text-xs font-medium uppercase tracking-wide text-muted-foreground-1">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-card-divider">
                {CALLS.map((c, i) => (
                  <tr key={i} className="transition-colors hover:bg-muted/40 align-top">
                    <td className="px-4 py-2.5 whitespace-nowrap">
                      <p className="font-medium text-foreground">{c.who}</p>
                      <p className="text-[11px] text-muted-foreground-1 wx-num">{c.no}</p>
                    </td>
                    <td className="px-4 py-2.5">
                      <span className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[11px] font-semibold ${DIR[c.dir]}`}>{c.dir}</span>
                    </td>
                    <td className="wx-num px-4 py-2.5 text-muted-foreground whitespace-nowrap">{c.dur}</td>
                    <td className="px-4 py-2.5 text-primary text-xs font-semibold whitespace-nowrap">{c.lead}</td>
                    <td className="px-4 py-2.5 text-muted-foreground whitespace-nowrap">{c.agent}</td>
                    <td className="max-w-72 px-4 py-2.5 text-muted-foreground">{c.note}</td>
                    <td className="wx-num px-4 py-2.5 text-right text-muted-foreground whitespace-nowrap">{c.when}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </PageBody>
    </>
  );
}
