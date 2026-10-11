"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Check, ChevronDown, CircleDot, Command, Monitor, Moon, Search, Sun, User } from "lucide-react";
import { groupFor, titleFor } from "@/lib/nav";
import { cx } from "@/lib/cx";
import { MobileMenuButton } from "@/components/Sidebar";

/**
 * Appearance menu.
 *
 * Preline's theme-switch plugin (`data-hs-theme-switch` +
 * `data-hs-theme-click-value`) owns the change itself: it writes the
 * `hs_theme` localStorage key, swaps `light` / `dark` / `auto` classes on
 * <html>, and dispatches `on-hs-appearance-change`. It never marks a trigger as
 * selected, so the check state is tracked here off that event.
 */
const THEMES = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
  { value: "auto", label: "System", Icon: Monitor },
] as const;

function currentTheme(): string {
  if (typeof window === "undefined") return "dark";
  return localStorage.getItem("hs_theme") || "auto";
}

function ThemeMenu() {
  const [active, setActive] = useState("dark");

  useEffect(() => {
    const sync = () => setActive(currentTheme());
    sync();
    window.addEventListener("on-hs-appearance-change", sync);
    return () => window.removeEventListener("on-hs-appearance-change", sync);
  }, []);

  return (
    <div className="hs-dropdown relative inline-flex [--placement:bottom-right]">
      <button
        type="button"
        className="hs-dropdown-toggle grid size-9 place-items-center rounded-lg text-muted-foreground-1 transition-colors hover:bg-muted hover:text-foreground"
        aria-haspopup="menu"
        aria-expanded="false"
        aria-label="Appearance"
      >
        <Sun className="size-[18px] dark:hidden" />
        <Moon className="hidden size-[18px] dark:block" />
      </button>
      <div
        className="hs-dropdown-menu hs-dropdown-open:opacity-100 mt-2 hidden w-44 origin-top-right rounded-xl border border-dropdown-line bg-dropdown p-1 opacity-0 shadow-xl transition-[opacity,margin] duration-150 z-50"
        role="menu"
        aria-orientation="vertical"
      >
        {THEMES.map(({ value, label, Icon }) => (
          <button
            key={value}
            type="button"
            data-hs-theme-switch
            data-hs-theme-click-value={value}
            aria-checked={active === value}
            className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-dropdown-item-foreground transition-colors hover:bg-dropdown-item-hover focus:bg-dropdown-item-focus focus:outline-hidden"
            role="menuitemradio"
          >
            <Icon className="size-4 text-muted-foreground" />
            {label}
            {active === value && <Check className="ml-auto size-4 text-primary" aria-hidden="true" />}
          </button>
        ))}
      </div>
    </div>
  );
}

const NOTIFICATIONS = [
  { id: 1, title: "New enquiry from DHA Phase 6", body: "10 marla interior — budget PKR 4.5M", when: "4m", unread: true },
  { id: 2, title: "Quote WX-Q-2610-014 accepted", body: "Gulberg III office fit-out", when: "38m", unread: true },
  { id: 3, title: "Invoice WX-INV-0091 overdue", body: "PKR 780,000 · 12 days past due", when: "2h", unread: true },
  { id: 4, title: "Milestone photo uploaded", body: "Bahria Town — carpentry stage", when: "5h", unread: false },
];

export function Topbar({ onOpenMobile }: { onOpenMobile: () => void }) {
  const pathname = usePathname();
  const group = groupFor(pathname);
  const unread = NOTIFICATIONS.filter((n) => n.unread).length;

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 border-b border-navbar-line bg-navbar/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-navbar/80 lg:px-6">
      <MobileMenuButton onClick={onOpenMobile} />

      {/* Title + breadcrumb */}
      <div className="min-w-0">
        <h1 className="truncate text-[15px] font-semibold text-foreground">{titleFor(pathname)}</h1>
        {group && (
          <nav aria-label="Breadcrumb" className="hidden items-center gap-1 text-xs text-muted-foreground sm:flex">
            <span>Woodex</span>
            <span aria-hidden="true">/</span>
            <span className="text-foreground/70">{group}</span>
          </nav>
        )}
      </div>

      {/* Command palette trigger */}
      <button
        type="button"
        className="ml-auto hidden h-9 min-w-64 items-center gap-2 rounded-lg border border-border bg-background-1 px-3 text-sm text-muted-foreground transition-colors hover:bg-muted md:flex"
        aria-label="Search all screens"
      >
        <Search className="size-4 shrink-0" />
        <span className="flex-1 text-left">Go to screen…</span>
        <kbd className="flex items-center gap-0.5 rounded border border-border px-1.5 py-0.5 font-sans text-[10px] font-semibold text-muted-foreground">
          <Command className="size-2.5" />K
        </kbd>
      </button>

      <div className="ml-auto flex items-center gap-1 md:ml-0">
        <ThemeMenu />

        {/* Notifications */}
        <div className="hs-dropdown relative inline-flex [--placement:bottom-right]">
          <button
            type="button"
            className="hs-dropdown-toggle relative grid size-9 place-items-center rounded-lg text-muted-foreground-1 transition-colors hover:bg-muted hover:text-foreground"
            aria-haspopup="menu"
            aria-expanded="false"
            aria-label={`Notifications, ${unread} unread`}
          >
            <Bell className="size-[18px]" />
            {unread > 0 && (
              <span className="wx-num absolute right-1 top-1 grid size-4 place-items-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
                {unread}
              </span>
            )}
          </button>
          <div
            className="hs-dropdown-menu hs-dropdown-open:opacity-100 mt-2 hidden w-[min(22rem,calc(100vw-2rem))] origin-top-right rounded-xl border border-dropdown-line bg-dropdown opacity-0 shadow-xl transition-[opacity,margin] duration-150 z-50"
            role="menu"
            aria-orientation="vertical"
          >
            <div className="flex items-center justify-between border-b border-dropdown-divider px-3.5 py-2.5">
              <b className="text-sm font-semibold text-foreground">Notifications</b>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">{unread} new</span>
            </div>
            <ul className="max-h-80 overflow-y-auto p-1.5">
              {NOTIFICATIONS.map((n) => (
                <li key={n.id}>
                  <button
                    type="button"
                    className="flex w-full gap-3 rounded-lg px-2 py-2.5 text-left transition-colors hover:bg-dropdown-item-hover"
                    role="menuitem"
                  >
                    <span
                      className={cx(
                        "mt-1.5 size-1.5 shrink-0 rounded-full",
                        n.unread ? "bg-primary" : "bg-border",
                      )}
                      aria-hidden="true"
                    />
                    <span className="min-w-0 flex-1">
                      <b className="block truncate text-[13px] font-medium text-foreground">{n.title}</b>
                      <small className="block truncate text-xs text-muted-foreground">{n.body}</small>
                    </span>
                    <small className="shrink-0 text-[11px] text-muted-foreground">{n.when}</small>
                  </button>
                </li>
              ))}
            </ul>
            <div className="border-t border-dropdown-divider p-1.5">
              <Link
                href="/activity"
                className="flex items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-[13px] font-medium text-primary transition-colors hover:bg-dropdown-item-hover"
              >
                View activity log
                <ChevronDown className="size-3.5 -rotate-90" />
              </Link>
            </div>
          </div>
        </div>

        {/* Operator menu */}
        <div className="hs-dropdown relative inline-flex [--placement:bottom-right]">
          <button
            type="button"
            className="hs-dropdown-toggle flex items-center gap-2 rounded-lg py-1 pl-1 pr-2 transition-colors hover:bg-muted"
            aria-haspopup="menu"
            aria-expanded="false"
            aria-label="Account menu"
          >
            <span className="grid size-8 place-items-center rounded-full bg-primary/15 text-xs font-bold text-primary">KT</span>
            <span className="hidden text-left sm:block">
              <b className="block text-[13px] font-semibold leading-tight text-foreground">Kamran Tariq</b>
              <small className="block text-[11px] leading-tight text-muted-foreground">Owner</small>
            </span>
            <ChevronDown className="hidden size-4 text-muted-foreground sm:block" />
          </button>
          <div
            className="hs-dropdown-menu hs-dropdown-open:opacity-100 mt-2 hidden w-56 origin-top-right rounded-xl border border-dropdown-line bg-dropdown p-1.5 opacity-0 shadow-xl transition-[opacity,margin] duration-150 z-50"
            role="menu"
            aria-orientation="vertical"
          >
            <div className="flex items-center gap-2.5 rounded-lg px-2.5 py-2">
              <span className="grid size-9 place-items-center rounded-full bg-primary/15 text-xs font-bold text-primary">KT</span>
              <span className="min-w-0">
                <b className="block truncate text-[13px] font-semibold text-foreground">Kamran Tariq</b>
                <small className="block truncate text-xs text-muted-foreground">admin@woodex.pk</small>
              </span>
            </div>
            <div className="my-1 border-t border-dropdown-divider" />
            {[
              { label: "My profile", href: "/settings" },
              { label: "Team & roles", href: "/settings" },
              { label: "Activity log", href: "/activity" },
            ].map((i) => (
              <Link
                key={i.label}
                href={i.href}
                className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-dropdown-item-foreground transition-colors hover:bg-dropdown-item-hover"
                role="menuitem"
              >
                {i.label === "My profile" ? <User className="size-4 text-muted-foreground" /> : <CircleDot className="size-4 text-muted-foreground" />}
                {i.label}
              </Link>
            ))}
            <div className="my-1 border-t border-dropdown-divider" />
            <button
              type="button"
              className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-destructive transition-colors hover:bg-dropdown-item-hover"
              role="menuitem"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
