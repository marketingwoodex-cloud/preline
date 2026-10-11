"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronsLeft, ExternalLink, LogOut, PanelLeft, X } from "lucide-react";
import { NAV } from "@/lib/nav";
import { cx } from "@/lib/cx";

type Props = {
  collapsed: boolean;
  mobileOpen: boolean;
  onToggleCollapsed: () => void;
  onCloseMobile: () => void;
};

export function Sidebar({ collapsed, mobileOpen, onToggleCollapsed, onCloseMobile }: Props) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile scrim */}
      <div
        className={cx(
          "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity lg:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onCloseMobile}
        aria-hidden="true"
      />

      <aside
        className={cx(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-sidebar-line bg-sidebar transition-[width,transform] duration-200 lg:static lg:z-auto lg:translate-x-0",
          collapsed ? "w-[76px]" : "w-[264px]",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
        aria-label="Main navigation"
      >
        {/* Brand */}
        <div className="flex h-16 shrink-0 items-center gap-3 border-b border-sidebar-line px-4">
          <Link href="/" className="flex min-w-0 items-center gap-3" onClick={onCloseMobile}>
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary text-sm font-extrabold text-primary-foreground">
              W
            </span>
            {!collapsed && (
              <span className="min-w-0">
                <b className="block truncate text-sm font-bold text-sidebar-nav-foreground">Woodex</b>
                <small className="block truncate text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
                  PP&#8209;1
                </small>
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={onToggleCollapsed}
            className="ml-auto hidden size-8 place-items-center rounded-md text-sidebar-nav-foreground/60 hover:bg-sidebar-nav-hover hover:text-sidebar-nav-foreground lg:grid"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronsLeft className={cx("size-4 transition-transform", collapsed && "rotate-180")} />
          </button>
          <button
            type="button"
            onClick={onCloseMobile}
            className="ml-auto grid size-8 place-items-center rounded-md text-sidebar-nav-foreground/60 hover:bg-sidebar-nav-hover lg:hidden"
            aria-label="Close navigation"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Groups */}
        <nav className="wx-scroll flex-1 overflow-y-auto px-3 py-4">
          {NAV.map((group) => (
            <div key={group.label} className="mb-5 last:mb-0">
              {!collapsed && (
                <p className="mb-1.5 px-2 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                  {group.label}
                </p>
              )}
              {collapsed && <div className="mx-2 mb-2 border-t border-sidebar-divider" aria-hidden="true" />}

              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                  const Icon = item.icon;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onCloseMobile}
                        aria-current={active ? "page" : undefined}
                        title={collapsed ? item.label : undefined}
                        className={cx(
                          "group flex items-center gap-3 rounded-lg px-2 py-2 text-sm transition-colors",
                          active
                            ? "bg-primary/10 font-semibold text-primary"
                            : "text-sidebar-nav-foreground/80 hover:bg-sidebar-nav-hover hover:text-sidebar-nav-foreground",
                          collapsed && "justify-center px-0",
                        )}
                      >
                        <Icon className={cx("size-[18px] shrink-0", active ? "text-primary" : "text-muted-foreground group-hover:text-sidebar-nav-foreground")} />
                        {!collapsed && <span className="min-w-0 flex-1 truncate">{item.label}</span>}

                        {!collapsed && item.badge ? (
                          <span className="wx-num rounded-full bg-primary/15 px-1.5 py-0.5 text-[10px] font-bold text-primary">
                            {item.badge}
                          </span>
                        ) : null}
                        {!collapsed && item.planned ? (
                          <span className="rounded-full border border-border px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-muted-foreground">
                            Soon
                          </span>
                        ) : null}
                        {collapsed && item.badge ? (
                          <span className="absolute ml-8 mt-[-14px] size-1.5 rounded-full bg-primary" aria-hidden="true" />
                        ) : null}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Operator */}
        <div className="shrink-0 border-t border-sidebar-line p-3">
          <div className={cx("flex items-center gap-2.5", collapsed && "justify-center")}>
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary/15 text-xs font-bold text-primary">
              KT
            </span>
            {!collapsed && (
              <span className="min-w-0 flex-1">
                <b className="block truncate text-[13px] font-semibold text-sidebar-nav-foreground">Kamran Tariq</b>
                <small className="block truncate text-[11px] text-muted-foreground">Owner</small>
              </span>
            )}
            {!collapsed && (
              <>
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid size-8 place-items-center rounded-md text-muted-foreground hover:bg-sidebar-nav-hover hover:text-sidebar-nav-foreground"
                  aria-label="View public website"
                  title="View public website"
                >
                  <ExternalLink className="size-4" />
                </a>
                <button
                  type="button"
                  className="grid size-8 place-items-center rounded-md text-muted-foreground hover:bg-sidebar-nav-hover hover:text-sidebar-nav-foreground"
                  aria-label="Sign out"
                  title="Sign out"
                >
                  <LogOut className="size-4" />
                </button>
              </>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

export function MobileMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="grid size-9 place-items-center rounded-lg text-muted-foreground-1 hover:bg-muted lg:hidden"
      aria-label="Open navigation"
    >
      <PanelLeft className="size-[18px]" />
    </button>
  );
}
