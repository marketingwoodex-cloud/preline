"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { BlockPartial } from "@/components/BlockPartial";

/**
 * App shell assembled from Preline blocks:
 *   - Classic Dashboard Sidebar Layout (navigation-layout/dashboard-sidebars)
 *   - Classic Dashboard Header        (navigation-layout/dashboard-headers)
 *
 * The sidebar partial carries `data-wx-route` markers; this component marks the
 * row for the current route active (same `bg-sidebar-nav-active` treatment the
 * block ships) and opens its parent accordion.
 */
export function BlockShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const timer = setInterval(() => {
      const links = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-wx-route]"));
      if (!links.length) return;
      links.forEach((a) => {
        const route = a.dataset.wxRoute!;
        const active = pathname === route || (route !== "/" && pathname.startsWith(route + "/"));
        a.classList.toggle("bg-sidebar-nav-active", active);
        if (active) {
          const acc = a.closest(".hs-accordion");
          if (acc && !acc.classList.contains("active")) {
            acc.classList.add("active");
            acc.querySelector<HTMLElement>(".hs-accordion-content")?.classList.remove("hidden");
          }
        }
      });
      clearInterval(timer);
    }, 50);
    const stop = setTimeout(() => clearInterval(timer), 5000);
    return () => {
      clearInterval(timer);
      clearTimeout(stop);
    };
  }, [pathname]);

  return (
    <>
      {/* Sidebar block (includes its own mobile navbar) */}
      <BlockPartial src="/blocks/classic-dashboard-sidebar.html" />
      {/* Header block (includes the search overlay modal) */}
      <BlockPartial src="/blocks/classic-dashboard-header.html" />

      <main id="content" className="lg:ps-65 pt-15 min-h-screen bg-background">
        {children}
      </main>
    </>
  );
}
