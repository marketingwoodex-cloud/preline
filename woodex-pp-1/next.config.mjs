import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  // Block partials and the Preline runtime must NEVER be served stale: the
  // preview proxy/browser previously cached them and kept resurrecting old
  // shells (including an invisible click-swallowing overlay).
  async headers() {
    const noStore = [
      { key: "Cache-Control", value: "no-store, no-cache, must-revalidate, proxy-revalidate" },
      { key: "Pragma", value: "no-cache" },
      { key: "Expires", value: "0" },
    ];
    return [
      { source: "/blocks/:path*", headers: noStore },
      { source: "/preline.js", headers: noStore },
    ];
  },
  // This app lives in a subfolder of the preline repo, which has its own
  // package-lock.json. Pin the tracing root so Next doesn't infer the repo
  // root and trace the whole library into the standalone output.
  outputFileTracingRoot: here,
  webpack(config) {
    // Declared explicitly rather than relying on tsconfig `paths`: with
    // TypeScript 7 installed, Next's tsconfig path pickup is unreliable here.
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": resolve(here, "src"),
    };
    return config;
  },
};

export default nextConfig;
