import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://woodex.pk"),
  title: {
    default: "Woodex PP-1 — Admin",
    template: "%s · Woodex PP-1",
  },
  description:
    "Woodex PP-1 administration suite. Built on the Preline UI v5 design system with the Woodex Obsidian + Cyan theme.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f9fafb" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0d13" },
  ],
};

/**
 * Applied before first paint so the shell never flashes light-on-dark.
 *
 * Uses Preline's own `hs_theme` key and the same class names its theme-switch
 * plugin writes (`light` / `dark` / `auto`+computed), so the toggle in the top
 * bar and this bootstrap can never disagree. Woodex Admin v2.1 used a separate
 * `wxaTheme` key; that value is migrated once so operators keep their choice.
 */
const themeBootstrap = `(function(){
  var h=document.documentElement;
  try{
    var t=localStorage.getItem("hs_theme");
    if(!t){var legacy=localStorage.getItem("wxaTheme");if(legacy==="dark"||legacy==="light"){t=legacy;localStorage.setItem("hs_theme",t);}}
    if(!t){h.classList.add("auto");t="auto";}
    if(t==="auto"){h.classList.add("auto");h.classList.add(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");}
    else{h.classList.add(t);}
  }catch(e){h.classList.add("dark");}
})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        {/* Preline auto-init: wires every data-hs-* component after hydration. */}
        <script src="/preline.js" defer />
      </body>
    </html>
  );
}
