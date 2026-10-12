#!/usr/bin/env node
/**
 * T1 — standalone preview deploy: build + copy assets into .next/standalone.
 * The standalone output never includes public/ or .next/static; forgetting
 * the copy is the classic "old shell keeps resurrecting" trap.
 *
 *   node scripts/deploy.mjs            # build + copy
 *   node scripts/deploy.mjs --start    # ...then run the server on :3000
 */
import { spawnSync } from "node:child_process";
import { cpSync, mkdirSync, rmSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const run = (cmd, args) => {
  const r = spawnSync(cmd, args, { cwd: root, stdio: "inherit", shell: process.platform === "win32" });
  if (r.status !== 0) process.exit(r.status ?? 1);
};

rmSync(join(root, ".next"), { recursive: true, force: true });
run("npx", ["next", "build"]);

const sa = join(root, ".next", "standalone");
if (!existsSync(join(sa, "server.js"))) {
  console.error("standalone/server.js missing — is output:'standalone' active?");
  process.exit(1);
}
cpSync(join(root, "public"), join(sa, "public"), { recursive: true });
mkdirSync(join(sa, ".next"), { recursive: true });
cpSync(join(root, ".next", "static"), join(sa, ".next", "static"), { recursive: true });
console.log("✓ standalone ready: .next/standalone");

if (process.argv.includes("--start")) {
  run("node", [join(sa, "server.js")]);
} else {
  console.log("  start with: HOSTNAME=0.0.0.0 PORT=3000 node .next/standalone/server.js");
}
