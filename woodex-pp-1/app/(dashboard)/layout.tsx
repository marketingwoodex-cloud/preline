import { readFileSync } from "node:fs";
import { join } from "node:path";
import { BlockShell } from "@/components/BlockShell";

/**
 * The shell partials are read on the SERVER and shipped inside the HTML.
 * They previously mounted via a client-side fetch (BlockPartial), which left
 * the sidebar/header absent whenever the browser-side fetch or hydration
 * misbehaved in the preview environment. Server-side include makes the shell
 * present with zero JavaScript; client code only enhances (plugins, roles).
 *
 * Standalone mode stays force-dynamic so edited partials are picked up per
 * request. Export mode (WX_EXPORT=1, Hostinger) bakes the shell in at build
 * time, where force-dynamic is not allowed — hence the gate.
 */
export const dynamic = process.env.WX_EXPORT ? "auto" : "force-dynamic";

const block = (file: string) =>
  readFileSync(join(process.cwd(), "public", "blocks", file), "utf8");

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <BlockShell
      sidebarHtml={block("classic-dashboard-sidebar.html")}
      headerHtml={block("classic-dashboard-header.html")}
    >
      {children}
    </BlockShell>
  );
}
