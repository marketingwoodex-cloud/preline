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
 * The init call WAITS for the deferred /preline.js runtime: partials can mount
 * before window.HSStaticMethods exists, and calling too early leaves every
 * data-hs-* control dead (accordion groups that "cannot click"). We poll until
 * the runtime is up, then re-init.
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
    let attempts = 0;
    const tryInit = () => {
      if (window.HSStaticMethods?.autoInit) {
        // Wire all data-hs-* plugins inside the freshly injected markup.
        window.HSStaticMethods.autoInit();
        return true;
      }
      return false;
    };
    if (tryInit()) return;
    const timer = setInterval(() => {
      attempts += 1;
      if (tryInit() || attempts > 50) clearInterval(timer); // 50 × 100ms
    }, 100);
    return () => clearInterval(timer);
  }, [html]);

  return <div ref={ref} className={className} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: html }} />;
}
