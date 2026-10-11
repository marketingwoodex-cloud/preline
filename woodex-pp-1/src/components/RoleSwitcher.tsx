"use client";

import { useEffect, useState } from "react";
import { MEMBERS, ROLE_LABEL, ROLE_STORAGE_KEY, roleOf, type RoleId } from "@/lib/roles";

/**
 * "View as role" switcher — floating control (Preline dropdown classes) that
 * sets the demo role in localStorage and reloads so the shell re-filters the
 * sidebar and route guards. Real auth stays server-side in the copied v2.1 api.
 */
export function RoleSwitcher() {
  const [role, setRole] = useState<RoleId>("owner");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setRole(roleOf(localStorage.getItem(ROLE_STORAGE_KEY) ?? "owner"));
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const member = MEMBERS.find((m) => m.id === role)!;

  return (
    <div className="fixed bottom-4 end-4 z-70">
      <div className="hs-dropdown [--placement:top-right] relative inline-block">
        <button
          id="wx-role-switcher"
          type="button"
          className="hs-dropdown-toggle py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-full bg-card border border-card-line text-foreground shadow-xl hover:bg-card-hover focus:outline-hidden focus:bg-card-focus"
          aria-haspopup="menu"
          aria-expanded="false"
          aria-label="View as role"
        >
          <span className="grid size-6 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
            {member.initials}
          </span>
          Viewing as <span className="font-semibold">{member.name}</span>
          <svg className="shrink-0 size-4 text-muted-foreground-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6" /></svg>
        </button>
        <div
          className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-72 transition-[opacity,margin] duration opacity-0 hidden z-20 bg-dropdown border border-dropdown-line rounded-xl shadow-xl"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="wx-role-switcher"
        >
          <div className="p-1">
            <span className="block py-2 px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              View as role
            </span>
            {MEMBERS.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => {
                  localStorage.setItem(ROLE_STORAGE_KEY, m.id);
                  window.location.reload();
                }}
                className={`w-full text-start py-2 px-3 flex items-center gap-x-3 rounded-lg text-sm hover:bg-dropdown-item-hover focus:outline-hidden focus:bg-dropdown-item-focus ${
                  m.id === role ? "bg-dropdown-item-active" : ""
                }`}
              >
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-surface-5 border border-line-3 text-xs font-semibold text-foreground">
                  {m.initials}
                </span>
                <span className="min-w-0 grow">
                  <span className="block text-sm font-medium text-dropdown-item-foreground truncate">{m.name}</span>
                  <span className="block text-xs text-muted-foreground-1 truncate">{ROLE_LABEL[m.role]}</span>
                </span>
                {m.id === role && (
                  <svg className="shrink-0 size-4 text-primary" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
