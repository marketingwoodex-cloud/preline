"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    HSStaticMethods?: { autoInit?: (root?: string) => void };
  }
}

/**
 * Injects a verbatim Preline block partial (public/blocks/*.html) into the DOM
 * at runtime and hands it to Preline's auto-init so every data-hs-* plugin in
 * the block (overlays, dropdowns, tooltips, accordions, tabs) activates.
 *
 * Blocks are the source of truth: they are copied from preline.co/blocks and
 * are never re-authored as JSX, so a block swap is a file replacement.
 */
export function BlockPartial({ src, className }: { src: string; className?: string }) {
  const [html, setHtml] = useState<string>("");
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(src)
      .then((r) => (r.ok ? r.text() : Promise.reject(new Error(`${src}: ${r.status}`))))
      .then((t) => {
        if (!cancelled) setHtml(t);
      })
      .catch((e) => console.error("[BlockPartial]", e));
    return () => {
      cancelled = true;
    };
  }, [src]);

  useEffect(() => {
    if (!html || !ref.current) return;
    // Wire all data-hs-* plugins inside the freshly injected markup.
    window.HSStaticMethods?.autoInit?.();
  }, [html]);

  return <div ref={ref} className={className} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: html }} />;
}
