#!/usr/bin/env node
/**
 * D3 — Hostinger shared-hosting export: static build + zip of out/ contents.
 *
 *   node scripts/export-hostinger.mjs              # basePath /admin (default)
 *   WX_BASE_PATH="" node scripts/export-hostinger.mjs   # domain root
 *
 * Output: deploy/hostinger/dist/admin.zip — upload to public_html/admin/
 * in hPanel File Manager and Extract (see deploy/hostinger/README.md).
 */
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const basePath = process.env.WX_BASE_PATH ?? "/admin";
const dist = join(root, "deploy", "hostinger", "dist");

rmSync(join(root, ".next"), { recursive: true, force: true });
rmSync(join(root, "out"), { recursive: true, force: true });
const build = spawnSync("npx", ["next", "build"], {
  cwd: root,
  stdio: "inherit",
  env: { ...process.env, WX_EXPORT: "1", WX_BASE_PATH: basePath },
  shell: process.platform === "win32",
});
if (build.status !== 0) process.exit(build.status ?? 1);
if (!existsSync(join(root, "out", "index.html"))) {
  console.error("out/index.html missing — export did not run");
  process.exit(1);
}

mkdirSync(dist, { recursive: true });
const zip = join(dist, "admin.zip");
rmSync(zip, { force: true });
// zip the CONTENTS of out/ (not the folder) so Extract lands index.html directly
const z = spawnSync("zip", ["-qr", zip, "."], { cwd: join(root, "out"), stdio: "inherit" });
if (z.status !== 0) {
  console.error("zip failed — is `zip` installed? (apt install zip / brew install zip)");
  process.exit(z.status ?? 1);
}
console.log(`✓ static export ready: out/ (basePath "${basePath}")`);
console.log(`✓ upload package:      ${zip.replace(root + "/", "")}`);
console.log("  next: hPanel → File Manager → public_html/admin → upload zip → Extract");
