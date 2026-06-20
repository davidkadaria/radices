import fs from "node:fs/promises";

export async function clean({ DIST_DIR }) {
  await fs.rm(DIST_DIR, { recursive: true, force: true });
}
