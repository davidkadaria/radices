import fs from "node:fs/promises";
import { DIST_DIR } from "../engine/paths.js";

async function clean() {
  try {
    await fs.rm(DIST_DIR, { recursive: true, force: true });
    console.log("✓ Cleaned dist directory");
  } catch (error) {
    console.error("Failed to clean dist directory:", error);
    process.exit(1);
  }
}

clean();
