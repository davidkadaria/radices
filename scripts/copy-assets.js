import fs from "node:fs/promises";
import path from "node:path";
import { existsSync } from "node:fs";
import { REPO_ROOT, DIST_DIR } from "../engine/paths.js";

// Shared runtime assets live at the repo root; they are copied into each
// project's dist/ at build time.
const assets = ["styles", "fonts", "scripts"];

async function copyAssets() {
  for (const asset of assets) {
    const srcPath = path.join(REPO_ROOT, asset);
    const destPath = path.join(DIST_DIR, asset);

    if (existsSync(srcPath)) {
      await fs.cp(srcPath, destPath, { recursive: true });
    }
  }
}

copyAssets()
  .then(() => console.log("✓ Assets copied to dist/"))
  .catch((err) => {
    console.error("Error copyings assets:", err);
    process.exit(1);
  });
