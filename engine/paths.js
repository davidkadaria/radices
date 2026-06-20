import path from "node:path";
import { fileURLToPath } from "node:url";

// This file lives at <repo>/engine/paths.js, so the repo root is one level up.
// REPO_ROOT holds everything shared across projects (engine, scripts, styles,
// fonts, the default template). Each project lives under PROJECTS_DIR and is
// selected by name (e.g. `npm run build-project --name hacker-manifesto`).
export const REPO_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
export const PROJECTS_DIR = path.join(REPO_ROOT, "projects");

// Per-project directory layout for a given project name.
export function projectPaths(name) {
  const PROJECT_DIR = path.join(PROJECTS_DIR, name);
  return {
    name,
    REPO_ROOT,
    PROJECT_DIR,
    CONTENT_DIR: path.join(PROJECT_DIR, "content"),
    ICONS_DIR: path.join(PROJECT_DIR, "icons"),
    DIST_DIR: path.join(PROJECT_DIR, "dist"),
  };
}

// Resolve the target project name from the CLI or environment, supporting:
//   npm run build-project --name foo     (npm forwards `foo` as a positional)
//   npm run build-project --name=foo     (npm sets npm_config_name)
//   node engine/build.js foo             (plain positional)
//   PROJECT_NAME=foo ...                 (env, handy for CI/Vercel)
export function resolveProjectName() {
  const cfg = process.env.npm_config_name;
  if (cfg && cfg !== "true") return cfg;

  const positional = process.argv.slice(2).find((arg) => !arg.startsWith("-"));
  if (positional) return positional;

  return process.env.PROJECT_NAME || null;
}
