"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { BlockPartial } from "@/components/BlockPartial";
import { RoleSwitcher } from "@/components/RoleSwitcher";
import { canAccessRoute, ROLE_LABEL, ROLE_STORAGE_KEY, roleOf, type RoleId } from "@/lib/roles";

/**
 * App shell assembled from Preline blocks:
 *   - Classic Dashboard Sidebar Layout (navigation-layout/dashboard-sidebars)
 *   - Classic Dashboard Header        (navigation-layout/dashboard-headers)
 *
 * The sidebar partial carries `data-wx-route` markers; this component marks the
 * row for the current route active (same `bg-sidebar-nav-active` treatment the
 * block ships), opens its parent accordion, and hides rows the active role
 * cannot access (see src/lib/roles.ts). Inaccessible routes render a guard card.
 */
export function BlockShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [role, setRole] = useState<RoleId>("owner");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setRole(roleOf(localStorage.getItem(ROLE_STORAGE_KEY) ?? "owner"));
    setReady(true);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const links = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-wx-route]"));
      if (!links.length) return;
      links.forEach((a) => {
        const route = a.dataset.wxRoute!;
        const allowed = canAccessRoute(role, route);
        a.closest("li")?.classList.toggle("hidden", !allowed);
        const active = pathname === route || (route !== "/" && pathname.startsWith(route + "/"));
        a.classList.toggle("bg-sidebar-nav-active", active);
        if (active && allowed) {
          const acc = a.closest(".hs-accordion");
          if (acc && !acc.classList.contains("active")) {
            acc.classList.add("active");
            acc.querySelector<HTMLElement>(".hs-accordion-content")?.classList.remove("hidden");
          }
        }
      });
      // Hide accordion groups whose every child row is now hidden.
      document.querySelectorAll<HTMLElement>(".hs-accordion").forEach((acc) => {
        const rows = Array.from(acc.querySelectorAll("li"));
        if (rows.length && rows.every((li) => li.classList.contains("hidden"))) {
          acc.classList.add("hidden");
        } else {
          acc.classList.remove("hidden");
        }
      });
      clearInterval(timer);
    }, 50);
    const stop = setTimeout(() => clearInterval(timer), 5000);
    return () => {
      clearInterval(timer);
      clearTimeout(stop);
    };
  }, [pathname, role]);

  // Vanilla fallback: if the Preline runtime never lands (blocked/slow script),
  // sidebar accordions must still open. Only active when HSStaticMethods is
  // absent, so we never double-toggle against the real plugin.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (window.HSStaticMethods) return; // real plugin owns the toggle
      const toggle = (e.target as HTMLElement).closest?.(".hs-accordion-toggle");
      if (!toggle) return;
      const acc = toggle.closest(".hs-accordion");
      if (!acc) return;
      e.preventDefault();
      const content = acc.querySelector<HTMLElement>(".hs-accordion-content");
      const open = acc.classList.toggle("active");
      content?.classList.toggle("hidden", !open);
      toggle.setAttribute("aria-expanded", String(open));
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const allowed = !ready || canAccessRoute(role, pathname);

  return (
    <>
      {/* Sidebar block (includes its own mobile navbar) */}
      <BlockPartial src="/blocks/classic-dashboard-sidebar.html" />
      {/* Header block (includes the search overlay modal) */}
      <BlockPartial src="/blocks/classic-dashboard-header.html" />

      <main id="content" className="lg:ps-65 pt-15 min-h-screen bg-background">
        {allowed ? (
          children
        ) : (
          <div className="max-w-lg mx-auto mt-24 px-4">
            <div className="bg-card border border-card-line shadow-2xs rounded-xl p-8 text-center">
              <span className="grid size-12 mx-auto place-items-center rounded-full bg-destructive/10 text-destructive">
                <svg className="shrink-0 size-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
              </span>
              <h1 className="mt-4 text-lg font-semibold text-foreground">Access restricted</h1>
              <p className="mt-1 text-sm text-muted-foreground-1">
                The <span className="font-medium text-foreground">{ROLE_LABEL[role]}</span> role cannot open{" "}
                <span className="font-medium text-foreground">{pathname}</span>. Switch role with the control at the
                bottom-right, or ask an owner for access.
              </p>
            </div>
          </div>
        )}
      </main>

      <RoleSwitcher />
    </>
  );
}
