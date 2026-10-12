import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Hammer } from "lucide-react";
import { NAV_FLAT } from "@/lib/nav";

/**
 * Placeholder for screens that are in the IA but not built in this phase.
 *
 * Without this, the "Soon" links in the sidebar 404 — which is worse than an
 * honest placeholder, because it hides the fact that the screen is planned
 * rather than missing. Paths that are NOT in the IA get a real 404.
 *
 * In export mode every planned route must be enumerable, hence
 * generateStaticParams below.
 */
export function generateStaticParams() {
  return NAV_FLAT.filter((i) => i.planned).map((i) => ({
    rest: i.href.split("/").filter(Boolean),
  }));
}

export default async function PlannedPage({ params }: { params: Promise<{ rest: string[] }> }) {
  const { rest } = await params;
  const href = `/${rest.join("/")}`;
  const item = NAV_FLAT.find((i) => i.href === href);
  if (!item) notFound();

  return (
    <div className="flex min-h-full items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-xl border border-card-line bg-card p-8 text-center">
        <span className="mx-auto grid size-12 place-items-center rounded-xl bg-primary/10 text-primary">
          <Hammer className="size-6" />
        </span>
        <h2 className="mt-4 text-lg font-bold text-foreground">{item?.label ?? "Screen"} is planned</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This screen is in the Woodex PP-1 information architecture but is not part of the current phase. It maps to an
          existing v2.1 module, so the port is scoped — not a redesign.
        </p>

        {item && (
          <dl className="mt-5 rounded-lg border border-border bg-background-1 px-3 py-2.5 text-left text-xs">
            <div className="flex justify-between gap-3">
              <dt className="text-muted-foreground">Route</dt>
              <dd className="wx-num font-medium text-foreground">{item.href}</dd>
            </div>
          </dl>
        )}

        <Link
          href="/"
          className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
        >
          <ArrowLeft className="size-4" />
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
