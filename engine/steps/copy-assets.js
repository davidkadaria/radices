import fs from "node:fs/promises";
import path from "node:path";
import { existsSync } from "node:fs";

// Shared client-side assets, copied verbatim into each project's dist/.
// `scripts/` holds browser runtime scripts only (build code lives in engine/).
const CLIENT_ASSETS = ["styles", "fonts", "scripts"];

export async function copyAssets({ REPO_ROOT, DIST_DIR }) {
  for (const asset of CLIENT_ASSETS) {
    const src = path.join(REPO_ROOT, asset);
    if (existsSync(src)) {
      await fs.cp(src, path.join(DIST_DIR, asset), { recursive: true });
    }
  }
}
