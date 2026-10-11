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
/**
 * Belt-and-braces shell insurance, independent of the app bundle (so it still
 * runs if the browser ever executes a cached old bundle):
 *  1) The search overlay #hs-pro-dnsm must stay `hidden` until Preline opens it
 *     (it is fixed size-full z-80; without `hidden` it invisibly swallows all
 *     clicks on the page).
 *  2) If the Preline runtime never arrives, a vanilla handler keeps the sidebar
 *     accordion groups working. It steps back the moment HSStaticMethods exists.
 */
const shellInsurance = `(function(){
  var guard=setInterval(function(){
    var ov=document.getElementById("hs-pro-dnsm");
    if(ov&&!ov.classList.contains("open")&&!ov.classList.contains("hidden")){ov.classList.add("hidden");}
  },300);
  setTimeout(function(){clearInterval(guard);},8000);
  setTimeout(function(){
    if(window.HSStaticMethods)return;
    document.addEventListener("click",function(e){
      if(window.HSStaticMethods)return;
      var t=e.target&&e.target.closest?e.target.closest(".hs-accordion-toggle"):null;
      if(!t)return;
      var acc=t.closest(".hs-accordion");if(!acc)return;
      e.preventDefault();
      var c=acc.querySelector(".hs-accordion-content");
      var open=acc.classList.toggle("active");
      if(c)c.classList.toggle("hidden",!open);
      t.setAttribute("aria-expanded",String(open));
    });
  },2500);
})();`;

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
        {/* Shell insurance: overlay guard + accordion fallback (see above). */}
        <script dangerouslySetInnerHTML={{ __html: shellInsurance }} />
      </body>
    </html>
  );
}
