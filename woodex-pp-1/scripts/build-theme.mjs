#!/usr/bin/env node
/**
 * Woodex PP-1 theme generator.
 *
 * Reads the upstream Preline v5 token sheet (styles/preline-theme.css) and emits
 * styles/woodex-theme.css with every semantic token re-pointed at the Woodex
 * "Obsidian + Cyan" palette.
 *
 * Why a generator: the Preline sheet defines 246 semantic tokens, and its own
 * `.dark` block only overrides 153 of them. Hand-writing the override would
 * silently leave ~90 tokens (card, dropdown, overlay, popover, select, footer,
 * tooltip, switch, table, scrollbar, chart, map) on the light scale inside dark
 * mode. Deriving the file from the real token list makes that impossible.
 *
 * Usage: node scripts/build-theme.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Preline's theme-switch plugin adds `.dark` for explicit dark mode, but adds
 * BOTH `.auto` and `.dark` when the user picks "auto". A bare `.dark` selector
 * would therefore match auto-dark too — but a bare `.light`-style override
 * would not. Listing both keeps the override unambiguous and lets a future
 * `[data-theme]` strategy slot in without touching the token values.
 */
const DARK_SEL = ":is(.dark, .auto.dark)";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(root, "styles", "preline-theme.css");
const OUT = join(root, "styles", "woodex-theme.css");

/* ------------------------------------------------------------------ *
 * Woodex raw palette (oklch, derived from the approved v2.1 hex spec:
 * #0b0d13 obsidian · #111318 card · #181c24 elevated · #20242f border ·
 * #00b8db / #00d3f2 cyan · #c59b27 gold)
 * ------------------------------------------------------------------ */

const OBS = {
  50: "oklch(96.9% 0.006 255.5)",
  100: "oklch(91.1% 0.012 259.8)",
  200: "oklch(80.6% 0.02 263)",
  300: "oklch(66.2% 0.03 265.3)",
  400: "oklch(50.3% 0.034 266.1)",
  500: "oklch(37.6% 0.031 267.4)",
  600: "oklch(31.4% 0.028 267.8)",
  700: "oklch(26.1% 0.022 269.3)", // #20242f  — border / line
  800: "oklch(22.6% 0.017 264.2)", // #181c24  — elevated surface
  850: "oklch(21.4% 0.019 266.1)", // #151922
  900: "oklch(18.7% 0.011 268.1)", // #111318  — card
  950: "oklch(16% 0.013 270.5)", //   #0b0d13  — canvas
};

const CYAN = {
  50: "oklch(97% 0.012 213)",
  100: "oklch(93.5% 0.028 213)",
  200: "oklch(88% 0.055 214)",
  300: "oklch(83.5% 0.085 214)",
  400: "oklch(79.7% 0.14 213.2)", // #00d3f2 — glow / hover
  500: "oklch(72.2% 0.13 218)", //   #00b8db — brand
  600: "oklch(52.3% 0.099 225.3)", // #007595 — light-mode primary
  700: "oklch(43.8% 0.082 223.7)", // #005b73
  800: "oklch(35.5% 0.062 226)",
  900: "oklch(29% 0.045 228)",
  950: "oklch(20% 0.032 230)",
};

const GOLD = {
  400: "oklch(81% 0.115 90)",
  500: "oklch(71% 0.134 87.2)", // #c59b27
  600: "oklch(66.7% 0.098 78.7)", // #b58d4a
  700: "oklch(56% 0.082 76)",
};

const SLATE = {
  50: "oklch(98.5% 0.002 247.8)", // #f9fafb — light canvas
  100: "oklch(96.8% 0.007 252)", // #f1f5f9
  200: "oklch(92.9% 0.013 255.5)", // #e2e8f0 — light line
  300: "oklch(87.2% 0.019 257)", // #cbd5e1
  400: "oklch(71.1% 0.035 256.8)", // #94a3b8 — muted (dark)
  500: "oklch(55.4% 0.041 257.4)", // #64748b — muted (light)
  600: "oklch(44.6% 0.038 258)", // #475569
  700: "oklch(37.2% 0.035 259)", // #334155
  800: "oklch(20.8% 0.04 265.8)", // #0f172a — light foreground
  900: "oklch(17% 0.03 266)",
};

/* Role map: Preline neutral scale -> Woodex scale, per color mode.
 *
 * Surfaces and text need OPPOSITE ramps in dark mode, so they are separate maps.
 * A single map makes sidebar/nav text resolve to #111318 on a #151922 sidebar —
 * i.e. invisible. `resolve()` picks the map from the token name. */
const LIGHT_SURFACE = {
  50: SLATE[50],
  100: SLATE[100],
  200: SLATE[200],
  300: SLATE[300],
  400: SLATE[400],
  500: SLATE[500],
  600: SLATE[600],
  700: SLATE[700],
  800: SLATE[800],
  900: SLATE[900],
  950: OBS[950],
};
const LIGHT_TEXT = LIGHT_SURFACE;

/* Dark surfaces descend toward the #0b0d13 canvas.
 *
 * Verified anchors (must not drift — checked in styles/woodex-theme.css):
 *   --background   neutral-800 -> obsidian-950  #0b0d13  canvas / sidebar / top bar
 *   --background-1 neutral-900 -> obsidian-900  #111318  card
 *   --card         neutral-900 -> obsidian-900  #111318  card
 *   --border       neutral-700 -> obsidian-700  #20242f  line
 *   --layer        neutral-800 -> obsidian-900  #111318  raised control on canvas
 *   --surface      neutral-700 -> obsidian-700  #20242f  filled chip / input
 */
const DARK_SURFACE = {
  50: OBS[50],
  100: OBS[100],
  200: OBS[200],
  300: OBS[400],
  400: OBS[500],
  500: OBS[600],
  600: OBS[600],
  700: OBS[700], // #20242f — borders, dividers, hover fills, inputs
  800: OBS[950], // #0b0d13 — canvas, top bar, sidebar
  900: OBS[900], // #111318 — card
  950: OBS[900], // #111318 — card
};

/* Dark text ascends toward near-white, mirroring the light ramp's contrast. */
const DARK_TEXT = {
  50: OBS[950], // text sitting on a light/inverse chip
  100: OBS[50], // #f2f5f9 — nav foreground, primary text
  200: OBS[50],
  300: OBS[100], // #dde2ea — secondary text
  400: OBS[200], // #b9c0cd — muted-foreground-1
  500: OBS[300], // #8a93a6 — muted-foreground
  600: OBS[300],
  700: OBS[400],
  800: OBS[500],
  900: OBS[50],
  950: OBS[50],
};

const WHITE = "oklch(100% 0 0)";
const BLACK = "oklch(0% 0 0)";

/* Accent / status families. Kept close to Tailwind's defaults for semantics
 * (red = destructive, amber = warning, emerald = success) but re-chromed so
 * they sit inside the cyan/obsidian system instead of clashing with it. */
const ACCENT = {
  light: {
    red: { 400: "oklch(70% 0.18 22)", 500: "oklch(62% 0.21 25)", 600: "oklch(55% 0.22 26)" },
    amber: { 400: "oklch(82% 0.15 85)", 500: GOLD[500], 600: GOLD[600] },
    emerald: { 400: "oklch(75% 0.15 160)", 500: "oklch(66% 0.15 162)", 600: "oklch(58% 0.14 163)" },
  },
  dark: {
    red: { 400: "oklch(72% 0.17 22)", 500: "oklch(66% 0.19 24)", 600: "oklch(58% 0.2 25)" },
    amber: { 400: GOLD[400], 500: GOLD[500], 600: GOLD[600] },
    emerald: { 400: "oklch(80% 0.15 160)", 500: "oklch(72% 0.15 161)", 600: "oklch(64% 0.14 162)" },
  },
};

/* Chart series ramp. Replaces upstream's blue/red/amber/green/purple/orange mix
 * with a cyan-led family plus the gold/emerald accents, so charts read as part
 * of the same system instead of a rainbow. */
const CHART = {
  light: { 1: CYAN[600], 2: CYAN[500], 3: GOLD[500], 4: ACCENT.light.emerald[500], 5: CYAN[700], 6: GOLD[600], 7: SLATE[500], 8: CYAN[300], 9: ACCENT.light.amber[500], 10: SLATE[700] },
  dark: { 1: CYAN[500], 2: CYAN[400], 3: GOLD[500], 4: ACCENT.dark.emerald[500], 5: CYAN[700], 6: GOLD[400], 7: OBS[300], 8: CYAN[300], 9: ACCENT.dark.amber[400], 10: OBS[200] },
};

/**
 * True when a token paints *text* rather than a surface. In dark mode these two
 * groups ramp in opposite directions, so they must be mapped separately.
 */
function isTextToken(name) {
  if (name.startsWith("--chart-colors-")) return false;
  if (/(^|-)foreground(-|$)/.test(name)) return true;
  if (/(^|-)inverse$/.test(name)) return true;
  return (
    name === "--foreground" ||
    name.startsWith("--muted-foreground") ||
    /-nav-(foreground|active|focus|hover)$/.test(name) ||
    /-(labels|xaxis-labels|yaxis-labels)$/.test(name)
  );
}

/** Resolve a `var(--color-x-n)` reference against the Woodex palette. */
function resolve(ref, mode, tokenName) {
  /* Chart series slots. The base tokens are --chart-1..10; the *-inverse /
   * *-hex / -colors- variants track the same slot so ApexCharts, legends and
   * datamaps all agree. */
  const slot = /^--chart(-colors-)?-chart-(\d{1,2})(?:-hex)?(?:-inverse)?$/.exec(tokenName);
  if (slot) return CHART[mode][Number(slot[2])] ?? null;

  const m = /^--color-([a-z]+)-(\d{2,3})$/.exec(ref);
  if (!m) return null;
  const [, family, stepRaw] = m;
  const step = Number(stepRaw);

  if (family === "white") return WHITE;
  if (family === "black") return BLACK;

  /* The brand family. `primary` is the semantic alias that @theme inline maps
   * onto the scale, so resolving it directly would be circular. */
  if (family === "primary") {
    if (mode === "dark") return step >= 400 && step <= 600 ? CYAN[500] : (CYAN[step] ?? CYAN[500]);
    return CYAN[step] ?? CYAN[600];
  }

  if (family === "gray" || family === "neutral" || family === "slate" || family === "stone") {
    if (mode === "light") return (isTextToken(tokenName) ? LIGHT_TEXT : LIGHT_SURFACE)[step] ?? LIGHT_SURFACE[500];
    return (isTextToken(tokenName) ? DARK_TEXT : DARK_SURFACE)[step] ?? DARK_SURFACE[500];
  }
  if (family === "blue") return CYAN[step] ?? CYAN[500];
  if (family === "cyan" || family === "sky") return CYAN[step] ?? CYAN[500];
  if (family === "amber" || family === "yellow") return ACCENT[mode].amber[step] ?? GOLD[500];
  if (family === "red" || family === "rose") return ACCENT[mode].red[step] ?? ACCENT[mode].red[500];
  if (family === "emerald" || family === "green" || family === "teal")
    return ACCENT[mode].emerald[step] ?? ACCENT[mode].emerald[500];
  if (family === "purple" || family === "violet" || family === "orange") return GOLD[step] ?? GOLD[500];
  return null;
}

function transformBlock(body, mode) {
  const unresolved = [];
  const out = body.replace(/^(\s*)(--[a-z0-9-]+):(\s*)var\((--color-[a-z]+-\d{2,3})\);/gm, (whole, pad, name, sp, ref) => {
    const hit = resolve(ref, mode, name);
    if (hit) return `${pad}${name}:${sp}${hit};`;
    unresolved.push(`${name} -> ${ref}`);
    return whole;
  });
  return { out, unresolved };
}

function extract(css, selector) {
  const start = css.indexOf(`${selector} {`);
  if (start === -1) throw new Error(`selector not found: ${selector}`);
  const end = css.indexOf("\n}", start);
  if (end === -1) throw new Error(`unterminated block: ${selector}`);
  return css.slice(start + selector.length + 3, end);
}

/* Authoritative Woodex surface stack, emitted LAST so it wins the cascade
 * regardless of how upstream ordered its own blocks.
 *
 * Upstream dark mode sets --background, --card, --layer, --overlay and --footer
 * ALL to neutral-800 — cards are flat against the canvas. Woodex is a layered
 * stack instead:
 *
 *   L0 canvas / sidebar / top bar  #0b0d13  obsidian-950
 *   L1 card, dropdown, popover     #111318  obsidian-900
 *   L2 raised control, hover row   #181c24  obsidian-800
 *   L3 line, border, divider       #20242f  obsidian-700
 */
const WOODOX_DARK_STACK = `
/* --- Woodex surface stack (authoritative) --- */
${DARK_SEL} {
  /* L0 — canvas */
  --background: ${OBS[950]};
  --background-plain: ${OBS[950]};
  --sidebar: ${OBS[950]};
  --sidebar-1: ${OBS[950]};
  --navbar: ${OBS[950]};
  --navbar-1: ${OBS[950]};
  --footer: ${OBS[950]};

  /* L1 — card and floating surfaces */
  --background-1: ${OBS[900]};
  --background-2: ${OBS[900]};
  --card: ${OBS[900]};
  --dropdown: ${OBS[900]};
  --dropdown-1: ${OBS[900]};
  --select: ${OBS[900]};
  --select-1: ${OBS[900]};
  --popover: ${OBS[900]};
  --overlay: ${OBS[900]};

  /* L2 — raised controls and hover rows */
  --layer: ${OBS[900]};
  --layer-hover: ${OBS[800]};
  --layer-focus: ${OBS[800]};
  --layer-active: ${OBS[800]};
  --surface: ${OBS[800]};
  --surface-hover: ${OBS[800]};
  --surface-focus: ${OBS[800]};
  --surface-active: ${OBS[800]};
  --muted: ${OBS[800]};
  --muted-hover: ${OBS[700]};
  --muted-focus: ${OBS[700]};
  --muted-active: ${OBS[700]};
  --dropdown-item-hover: ${OBS[800]};
  --dropdown-item-focus: ${OBS[800]};
  --dropdown-item-active: ${OBS[800]};
  --select-item-hover: ${OBS[800]};
  --select-item-focus: ${OBS[800]};
  --select-item-active: ${OBS[800]};
  --sidebar-nav-hover: ${OBS[800]};
  --sidebar-nav-focus: ${OBS[800]};
  --sidebar-nav-active: ${OBS[800]};
  --navbar-nav-hover: ${OBS[800]};
  --navbar-nav-focus: ${OBS[800]};
  --navbar-nav-active: ${OBS[800]};

  /* L3 — lines */
  --border: ${OBS[700]};
  --border-line-1: ${OBS[700]};
  --border-line-2: ${OBS[700]};
  --border-line-3: ${OBS[600]};
  --layer-line: ${OBS[700]};
  --card-line: ${OBS[700]};
  --card-divider: ${OBS[700]};
  --card-header: ${OBS[700]};
  --card-footer: ${OBS[700]};
  --dropdown-divider: ${OBS[700]};
  --dropdown-header: ${OBS[700]};
  --dropdown-footer: ${OBS[700]};
  --overlay-divider: ${OBS[700]};
  --overlay-header: ${OBS[700]};
  --overlay-footer: ${OBS[700]};
  --popover-line: ${OBS[700]};
  --sidebar-line: ${OBS[700]};
  --sidebar-divider: ${OBS[700]};
  --navbar-line: ${OBS[700]};
  --navbar-divider: ${OBS[700]};
  --footer-line: ${OBS[700]};
  --table-line: ${OBS[700]};

  /* Text on obsidian */
  --foreground: ${OBS[50]};
  --layer-foreground: ${OBS[50]};
  --surface-foreground: ${OBS[50]};
  --dropdown-item-foreground: ${OBS[50]};
  --select-item-foreground: ${OBS[50]};
  --sidebar-nav-foreground: ${OBS[100]};
  --navbar-nav-foreground: ${OBS[100]};
  --muted-foreground: ${OBS[300]};
  --muted-foreground-1: ${OBS[200]};
  --muted-foreground-2: ${OBS[100]};

  /* Tooltip inverts: light chip, obsidian text */
  --tooltip: ${OBS[50]};
  --tooltip-foreground: ${OBS[950]};

  /* Inverse chips are near-black on obsidian, not near-white */
  --inverse: ${OBS[950]};
  --card-inverse: ${OBS[950]};
  --dropdown-inverse: ${OBS[950]};
  --select-inverse: ${OBS[950]};
  --overlay-inverse: ${OBS[950]};
  --footer-inverse: ${OBS[950]};
  --sidebar-inverse: ${CYAN[950]};
  --navbar-inverse: ${CYAN[950]};
}
`;

/* Upstream `.dark` overrides only 153 of the 246 semantic tokens. The other 93
 * (card, dropdown, overlay, popover, select, footer, tooltip, switch, table,
 * scrollbar, chart, map, chart-colors-*) would inherit the LIGHT :root values
 * inside dark mode. Emit them explicitly so dark mode is complete. */
const DARK_TOKEN_OVERRIDES = {};

function tokenNames(body) {
  return new Set([...body.matchAll(/^\s*(--[a-z0-9-]+):/gm)].map((m) => m[1]));
}

const src = readFileSync(SRC, "utf8");

const lightBody = extract(src, ":root");
const darkBody = extract(src, ".dark");

const lightRaw = transformBlock(lightBody, "light");
const darkRaw = transformBlock(darkBody, "dark");

/* Fill the gap: every :root token that upstream forgot to override in .dark. */
const lightNames = tokenNames(lightBody);
const darkNames = tokenNames(darkBody);
const missing = [...lightNames].filter((n) => !darkNames.has(n));

const darkFillLines = [];
for (const name of missing) {
  const decl = new RegExp(`^\\s*${name}:\\s*var\\((--color-[a-z]+-\\d{2,3})\\);`, "m").exec(lightBody);
  if (!decl) continue;
  if (DARK_TOKEN_OVERRIDES[name]) {
    darkFillLines.push(`  ${name}: ${DARK_TOKEN_OVERRIDES[name]};`);
    continue;
  }
  const hit = resolve(decl[1], "dark", name);
  darkFillLines.push(`  ${name}: ${hit ?? decl[1]};`);
}
const darkFill = darkFillLines.length
  ? `\n/* --- Dark-mode coverage for the ${darkFillLines.length} tokens upstream leaves on the light scale --- */\n.dark {\n${darkFillLines.join("\n")}\n}\n`
  : "";

const unresolved = [...new Set([...lightRaw.unresolved, ...darkRaw.unresolved])];
if (unresolved.length) {
  console.warn(`[woodex-theme] ${unresolved.length} reference(s) left on upstream scale:`, unresolved.join(", "));
}

const banner = `/* ============================================================================
 * Woodex PP-1 — "Obsidian + Cyan" theme for Preline UI v5
 * GENERATED FILE — do not edit by hand.
 * Source of truth: styles/preline-theme.css  +  scripts/build-theme.mjs
 * Regenerate:      node scripts/build-theme.mjs
 *
 * Palette spec (from Woodex Admin v2.1 "Preline Ocean Pure"):
 *   canvas #0b0d13 · card #111318 · elevated #181c24 · line #20242f
 *   brand  #00b8db · glow  #00d3f2 · gold #c59b27
 * ========================================================================== */
`;

const rawPalette = `
/* --- Woodex raw palette (available as bg-wx-*, text-wx-*, border-wx-*) --- */
@theme inline {
${Object.entries(OBS)
  .map(([s, v]) => `  --color-wx-obsidian-${s}: ${v};`)
  .join("\n")}
${Object.entries(CYAN)
  .map(([s, v]) => `  --color-wx-cyan-${s}: ${v};`)
  .join("\n")}
${Object.entries(GOLD)
  .map(([s, v]) => `  --color-wx-gold-${s}: ${v};`)
  .join("\n")}
  --color-wx-gold: ${GOLD[500]};
  --color-wx-brand: ${CYAN[500]};
  --color-wx-brand-glow: ${CYAN[400]};
  --color-wx-obsidian: ${OBS[950]};
  --color-wx-card: ${OBS[900]};
  --color-wx-elev: ${OBS[800]};
  --color-wx-line: ${OBS[700]};
}
`;

const darkPrimary = `
/* Dark mode: the brand button is #00b8db with near-black text (v2.1 signature).
   Upstream sets --primary-foreground to white, which fails WCAG on cyan. */
${DARK_SEL} {
  --primary: ${CYAN[500]};
  --primary-foreground: ${OBS[950]};
  --primary-hover: ${CYAN[400]};
  --primary-focus: ${CYAN[400]};
  --primary-active: ${CYAN[400]};
  --primary-checked: ${CYAN[500]};
  --primary-line: transparent;

  /* Gold is the secondary accent (auth card, "premium"/gold badge states). */
  --secondary: ${GOLD[500]};
  --secondary-foreground: ${OBS[950]};
  --secondary-hover: ${GOLD[400]};
  --secondary-focus: ${GOLD[400]};
  --secondary-active: ${GOLD[400]};

  /* Chart series. The :root block derives these from the primary scale, which
     is near-white at the low steps — unusable as a series colour on obsidian. */
  --chart-1: ${CYAN[500]};
  --chart-2: ${CYAN[400]};
  --chart-3: ${GOLD[500]};
  --chart-4: ${ACCENT.dark.emerald[500]};
  --chart-5: ${CYAN[700]};
  --chart-primary: ${CYAN[500]};
  --chart-colors-primary: ${CYAN[500]};
  --chart-colors-primary-hex: ${CYAN[500]};
  --chart-colors-primary-inverse: ${CYAN[400]};
  --chart-colors-chart-1: ${CYAN[500]};
  --chart-colors-chart-2: ${CYAN[400]};
  --chart-colors-chart-3: ${GOLD[500]};
  --chart-colors-chart-4: ${ACCENT.dark.emerald[500]};
  --chart-colors-chart-5: ${CYAN[700]};
}
`;

const lightPrimary = `
/* Light mode: cyan-600 carries enough contrast for white text. */
:root {
  --primary: ${CYAN[600]};
  --primary-foreground: ${WHITE};
  --primary-hover: ${CYAN[700]};
  --primary-focus: ${CYAN[700]};
  --primary-active: ${CYAN[700]};
  --primary-checked: ${CYAN[600]};

  --secondary: ${SLATE[800]};
  --secondary-foreground: ${WHITE};
}
`;

const css = [
  banner,
  rawPalette,
  "/* --- Light mode: Woodex Ocean --- */",
  ":root {" + lightRaw.out + "\n}",
  lightPrimary,
  "/* --- Dark mode: Woodex Obsidian --- */",
  `${DARK_SEL} {` + darkRaw.out + "\n}",
  darkFill,
  darkPrimary,
  WOODOX_DARK_STACK,
  "",
].join("\n");

writeFileSync(OUT, css);

/* --- Self-check: the anchors that the whole admin shell is built on. --- */
const EXPECT = {
  "--background": OBS[950],
  "--background-1": OBS[900],
  "--card": OBS[900],
  "--card-line": OBS[700],
  "--layer": OBS[900],
  "--layer-hover": OBS[800],
  "--surface": OBS[800],
  "--dropdown": OBS[900],
  "--dropdown-item-hover": OBS[800],
  "--overlay": OBS[900],
  "--popover": OBS[900],
  "--sidebar": OBS[950],
  "--sidebar-nav-foreground": OBS[100],
  "--sidebar-nav-active": OBS[800],
  "--navbar": OBS[950],
  "--border": OBS[700],
  "--table-line": OBS[700],
  "--primary": CYAN[500],
  "--primary-foreground": OBS[950],
  "--foreground": OBS[50],
  "--muted-foreground": OBS[300],
  "--tooltip": OBS[50],
  "--tooltip-foreground": OBS[950],
  "--chart-1": CYAN[500],
};

/** Read the effective value of a token as the cascade would resolve it. */
function effective(token) {
  const blocks = [...css.matchAll(/(^:root|:is\(\.dark, \.auto\.dark\))\s*\{([\s\S]*?)\n\}/gm)].filter(
    (b) => b[1] !== ":root",
  );
  let value = null;
  for (const b of blocks) {
    const hit = new RegExp(`^\\s*${token}:\\s*([^;]+);`, "m").exec(b[2]);
    if (hit) value = hit[1].trim();
  }
  return value;
}

let failed = 0;
for (const [token, want] of Object.entries(EXPECT)) {
  const got = effective(token);
  if (got !== want) {
    console.error(`[woodex-theme] FAIL dark ${token}: got ${got}, want ${want}`);
    failed++;
  }
}

const tokenCount = (css.match(/^\s*--[a-z0-9-]+:/gm) || []).length;
console.log(`[woodex-theme] wrote ${OUT}`);
console.log(`[woodex-theme] ${tokenCount} token declarations, ${darkFillLines.length} dark-coverage tokens added`);
console.log(`[woodex-theme] unresolved upstream refs: ${unresolved.length}`);
console.log(`[woodex-theme] dark anchor check: ${failed === 0 ? "PASS" : failed + " FAILED"}`);
if (failed) process.exit(1);
