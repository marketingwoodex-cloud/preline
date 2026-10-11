/**
 * Next.js does not ship a module declaration for global stylesheet imports
 * (it types `*.module.css` only), so `import "./globals.css"` fails typecheck
 * without this. Side-effect imports carry no runtime value.
 */
declare module "*.css";
declare module "*.scss";
