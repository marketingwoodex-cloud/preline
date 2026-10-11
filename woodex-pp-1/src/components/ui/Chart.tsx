"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import type { ApexOptions } from "apexcharts";

/** ApexCharts touches `window`, so it must never render during SSR. */
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

type Palette = {
  series: string[];
  foreground: string;
  muted: string;
  grid: string;
  card: string;
  border: string;
};

/**
 * Read the live Woodex token values off the document.
 *
 * The tokens are set by styles/woodex-theme.css, which resolves differently in
 * light and dark mode. Reading them at runtime means the chart follows the
 * theme instead of hard-coding two palettes.
 */
function readPalette(): Palette {
  const css = getComputedStyle(document.documentElement);
  const get = (v: string, fallback: string) => css.getPropertyValue(v).trim() || fallback;
  return {
    series: [1, 2, 3, 4, 5].map((i) => get(`--chart-${i}`, "#00b8db")),
    foreground: get("--foreground", "#f2f5f9"),
    muted: get("--muted-foreground", "#8a93a6"),
    grid: get("--table-line", "#20242f"),
    card: get("--card", "#111318"),
    border: get("--border", "#20242f"),
  };
}

/** ApexCharts types tooltip values as possibly null — coerce before formatting. */
const fmtValue = (prefix: string) => (v: number | string | undefined | null) =>
  `${prefix}${Number(v ?? 0).toLocaleString("en-PK")}`;

const baseTooltip = (p: Palette): ApexOptions["tooltip"] => ({
  theme: "dark",
  style: { fontSize: "12px", fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" },
});

export function Chart({
  type,
  series,
  categories,
  height = 280,
  valuePrefix = "",
  stacked = false,
  horizontal = false,
}: {
  type: "area" | "bar" | "donut" | "line";
  series: { name: string; data: number[] }[];
  categories?: string[];
  height?: number;
  valuePrefix?: string;
  stacked?: boolean;
  horizontal?: boolean;
}) {
  const [palette, setPalette] = useState<Palette | null>(null);

  // Re-read on theme change: Preline dispatches this from its theme-switch.
  useEffect(() => {
    const sync = () => setPalette(readPalette());
    sync();
    window.addEventListener("on-hs-appearance-change", sync);
    return () => window.removeEventListener("on-hs-appearance-change", sync);
  }, []);

  const options = useMemo<ApexOptions | null>(() => {
    if (!palette) return null;
    const p = palette;

    if (type === "donut") {
      return {
        chart: { type: "donut", fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif", foreColor: p.muted },
        colors: p.series,
        labels: categories ?? series.map((s) => s.name),
        stroke: { colors: [p.card], width: 2 },
        legend: { position: "bottom", labels: { colors: p.muted }, itemMargin: { horizontal: 8, vertical: 4 } },
        dataLabels: { enabled: false },
        plotOptions: { pie: { donut: { size: "72%", labels: { show: true, name: { color: p.foreground }, value: { color: p.foreground, formatter: (v) => `${valuePrefix}${Number(v).toLocaleString("en-PK")}` }, total: { show: true, label: "Total", color: p.muted } } } } },
        tooltip: { y: { formatter: fmtValue(valuePrefix) } },
      };
    }

    return {
      chart: {
        type: type === "area" ? "area" : type === "bar" ? "bar" : "line",
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
        foreColor: p.muted,
        stacked,
        toolbar: { show: false },
        zoom: { enabled: false },
        animations: { enabled: true, speed: 400 },
      },
      colors: p.series,
      series,
      stroke: { curve: "smooth", width: type === "bar" ? 0 : 2 },
      fill: type === "area" ? { type: "gradient", gradient: { shadeIntensity: 1, opacityFrom: 0.32, opacityTo: 0.02, stops: [0, 95] } } : undefined,
      grid: { borderColor: p.grid, strokeDashArray: 3, xaxis: { lines: { show: false } }, padding: { left: 8, right: 8 } },
      dataLabels: { enabled: false },
      xaxis: {
        categories,
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: { style: { colors: p.muted, fontSize: "11px" }, hideOverlappingLabels: true, maxTicksLimit: 10 },
      },
      yaxis: {
        labels: {
          style: { colors: p.muted, fontSize: "11px" },
          formatter: (v: number) => (v >= 1_000_000 ? `${(v / 1_000_000).toFixed(1)}M` : v >= 1000 ? `${(v / 1000).toFixed(0)}k` : `${v}`),
        },
      },
      plotOptions: type === "bar" ? { bar: { horizontal, columnWidth: "42%", borderRadius: 4, borderRadiusApplication: "end" } } : undefined,
      legend: { position: "top", horizontalAlign: "right", labels: { colors: p.muted }, itemMargin: { horizontal: 10 } },
      tooltip: {
        ...baseTooltip(p),
        y: { formatter: fmtValue(valuePrefix) },
      },
    };
  }, [palette, type, series, categories, stacked, horizontal, valuePrefix]);

  if (!options) return <div style={{ height }} className="animate-pulse rounded-lg bg-muted" />;

  return (
    // key forces a clean re-init when the theme palette changes
    <ApexChart key={palette?.foreground ?? "init"} type={options.chart?.type as "area"} options={options} series={series} height={height} width="100%" />
  );
}
