import { readFileSync } from "node:fs";
import { join } from "node:path";
import { BlockShell } from "@/components/BlockShell";

/**
 * The shell partials are read on the SERVER and shipped inside the HTML.
 * They previously mounted via a client-side fetch (BlockPartial), which left
 * the sidebar/header absent whenever the browser-side fetch or hydration
 * misbehaved in the preview environment. Server-side include makes the shell
 * present with zero JavaScript; client code only enhances (plugins, roles).
 */
export const dynamic = "force-dynamic";

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
