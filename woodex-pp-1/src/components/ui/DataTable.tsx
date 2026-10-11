"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { cx } from "@/lib/cx";
import { EmptyState } from "@/components/ui/SectionCard";

export type Column<T> = {
  key: string;
  header: string;
  /** Cell renderer. */
  render: (row: T) => React.ReactNode;
  /** Plain-text value used by search and sorting. */
  text: (row: T) => string;
  align?: "left" | "right" | "center";
  /** Sort comparator source. */
  sortValue?: (row: T) => string | number;
  className?: string;
};

type Props<T> = {
  rows: T[];
  columns: Column<T>[];
  rowKey: (row: T) => string | number;
  /** Chips that filter the rows. `all` is added automatically. */
  filters?: { id: string; label: string; test: (row: T) => boolean; count?: number }[];
  searchPlaceholder?: string;
  emptyTitle?: string;
  emptyHint?: string;
  toolbar?: React.ReactNode;
  onRowClick?: (row: T) => void;
};

export function DataTable<T>({
  rows,
  columns,
  rowKey,
  filters,
  searchPlaceholder = "Search…",
  emptyTitle = "Nothing here yet",
  emptyHint,
  toolbar,
  onRowClick,
}: Props<T>) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("all");
  const [sort, setSort] = useState<{ key: string; dir: "asc" | "desc" } | null>(null);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    let out = rows;

    if (active !== "all" && filters) {
      const f = filters.find((x) => x.id === active);
      if (f) out = out.filter(f.test);
    }

    if (q) {
      out = out.filter((r) => columns.some((c) => c.text(r).toLowerCase().includes(q)));
    }

    if (sort) {
      const col = columns.find((c) => c.key === sort.key);
      if (col?.sortValue) {
        out = [...out].sort((a, b) => {
          const av = col.sortValue!(a);
          const bv = col.sortValue!(b);
          const cmp = typeof av === "number" && typeof bv === "number" ? av - bv : String(av).localeCompare(String(bv));
          return sort.dir === "asc" ? cmp : -cmp;
        });
      }
    }

    return out;
  }, [rows, columns, query, active, filters, sort]);

  const toggleSort = (key: string) => {
    const col = columns.find((c) => c.key === key);
    if (!col?.sortValue) return;
    setSort((s) => (s?.key === key ? { key, dir: s.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" }));
  };

  return (
    <div className="rounded-xl border border-card-line bg-card">
      <div className="flex flex-wrap items-center gap-3 border-b border-card-divider px-4 py-3">
        {/* Filter chips */}
        {filters && filters.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setActive("all")}
              className={cx(
                "rounded-lg px-2.5 py-1 text-xs font-medium transition-colors",
                active === "all" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              All
              <span className="wx-num ml-1.5 text-[10px] opacity-70">{rows.length}</span>
            </button>
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setActive(f.id)}
                className={cx(
                  "rounded-lg px-2.5 py-1 text-xs font-medium transition-colors",
                  active === f.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {f.label}
                {f.count !== undefined && <span className="wx-num ml-1.5 text-[10px] opacity-70">{f.count}</span>}
              </button>
            ))}
          </div>
        )}

        <div className="ml-auto flex items-center gap-2">
          {toolbar}
          <label className="relative block">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
              className="h-9 w-44 rounded-lg border border-border bg-background-1 pl-8 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-hidden sm:w-60"
            />
          </label>
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="p-6">
          <EmptyState title={emptyTitle} hint={emptyHint} />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-card-divider bg-muted/40 text-[11px] uppercase tracking-wide text-muted-foreground">
              <tr>
                {columns.map((c) => (
                  <th
                    key={c.key}
                    scope="col"
                    className={cx(
                      "px-4 py-2.5 font-semibold",
                      c.align === "right" && "text-right",
                      c.align === "center" && "text-center",
                      c.sortValue && "cursor-pointer select-none hover:text-foreground",
                    )}
                    aria-sort={sort?.key === c.key ? (sort.dir === "asc" ? "ascending" : "descending") : undefined}
                    onClick={() => toggleSort(c.key)}
                  >
                    {c.header}
                    {sort?.key === c.key && <span className="ml-1 text-primary">{sort.dir === "asc" ? "↑" : "↓"}</span>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-card-divider">
              {visible.map((row) => (
                <tr
                  key={rowKey(row)}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  className={cx("transition-colors hover:bg-muted/40", onRowClick && "cursor-pointer")}
                >
                  {columns.map((c) => (
                    <td
                      key={c.key}
                      className={cx(
                        "px-4 py-2.5 align-middle",
                        c.align === "right" && "text-right",
                        c.align === "center" && "text-center",
                        c.className,
                      )}
                    >
                      {c.render(row)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex items-center justify-between border-t border-card-divider px-4 py-2.5 text-xs text-muted-foreground">
        <span className="wx-num">
          {visible.length} of {rows.length}
        </span>
        <span>Woodex PP-1</span>
      </div>
    </div>
  );
}
