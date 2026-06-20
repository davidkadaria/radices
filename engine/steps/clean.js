import fs from "node:fs/promises";
import { DIST_DIR } from "../paths.js";

export async function clean() {
  await fs.rm(DIST_DIR, { recursive: true, force: true });
}
