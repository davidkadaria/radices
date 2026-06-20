import sharp from "sharp";
import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { ICONS_DIR, DIST_DIR } from "../engine/paths.js";

const baseIcon = path.join(ICONS_DIR, "base_icon-2048x2048.png");
const outputDir = path.join(DIST_DIR, "icons");

const sizes = [16, 32, 48, 72, 96, 144, 192, 512];

async function generateIcons() {
  if (!existsSync(outputDir)) {
    await fs.mkdir(outputDir, { recursive: true });
  }

  // Generate all PNG icons inside a Promise.all
  await Promise.all(
    sizes.map(async (size) => {
      await sharp(baseIcon)
        .resize(size, size)
        .toFile(path.join(outputDir, `icon-${size}x${size}.png`));
      console.log(`✓ Generated icon-${size}x${size}.png`);
    })
  );

  // Generate favicon.ico
  await sharp(baseIcon)
    .resize(32, 32)
    .toFile(path.join(outputDir, "favicon.ico"));
  console.log("✓ Generated favicon.ico");
}

generateIcons().catch((err) => {
  console.error("Failed to generate icons:", err);
  process.exit(1);
});
