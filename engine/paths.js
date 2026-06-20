import path from "node:path";
import { fileURLToPath } from "node:url";

// This file lives at <repo>/engine/paths.js, so the repo root is one level up.
// REPO_ROOT holds everything shared across projects (engine, scripts, styles,
// fonts, the default template). PROJECT_DIR holds the per-project content,
// icons and build output. Selecting a project is done with the PROJECT env var,
// e.g. `PROJECT=projects/hacker-manifesto npm run build`.
export const REPO_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

if (!process.env.PROJECT) {
  console.error(
    "Error: PROJECT env var is required, e.g. PROJECT=projects/hacker-manifesto",
  );
  process.exit(1);
}

export const PROJECT_DIR = path.resolve(REPO_ROOT, process.env.PROJECT);
export const CONTENT_DIR = path.join(PROJECT_DIR, "content");
export const ICONS_DIR = path.join(PROJECT_DIR, "icons");
export const DIST_DIR = path.join(PROJECT_DIR, "dist");
