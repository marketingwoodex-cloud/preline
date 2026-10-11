import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
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
