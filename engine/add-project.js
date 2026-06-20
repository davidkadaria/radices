import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { REPO_ROOT, projectPaths, resolveProjectName } from "./paths.js";

const SCAFFOLD_DIR = path.join(REPO_ROOT, "engine", "scaffold");
const NAME_PATTERN = /^[a-z0-9][a-z0-9-]*$/;

async function addProject() {
  const name = resolveProjectName();
  if (!name) {
    console.error("Usage: npm run add-project --name <project>");
    process.exit(1);
  }
  if (!NAME_PATTERN.test(name)) {
    console.error(
      `Invalid project name "${name}". Use lowercase letters, digits and hyphens, e.g. my-essay.`,
    );
    process.exit(1);
  }

  const { PROJECT_DIR } = projectPaths(name);
  if (existsSync(PROJECT_DIR)) {
    console.error(`Project "${name}" already exists at ${PROJECT_DIR}`);
    process.exit(1);
  }

  await fs.cp(SCAFFOLD_DIR, PROJECT_DIR, { recursive: true });

  console.log(`✓ Created projects/${name}`);
  console.log("\nNext steps:");
  console.log(`  1. Edit projects/${name}/content/site.json   (titles, URL, colors, …)`);
  console.log(`  2. Write  projects/${name}/content/essay.md`);
  console.log(`  3. Replace projects/${name}/icons/*.png       (placeholder images)`);
  console.log(`  4. Build:  npm run build-project --name ${name}`);
}

addProject().catch((err) => {
  console.error(err);
  process.exit(1);
});
