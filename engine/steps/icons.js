import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const SIZES = [16, 32, 48, 72, 96, 144, 192, 512];

export async function generateIcons({ ICONS_DIR, DIST_DIR }) {
  const baseIcon = path.join(ICONS_DIR, "base_icon-2048x2048.png");
  const outputDir = path.join(DIST_DIR, "icons");
  await fs.mkdir(outputDir, { recursive: true });

  await Promise.all(
    SIZES.map((size) =>
      sharp(baseIcon)
        .resize(size, size)
        .toFile(path.join(outputDir, `icon-${size}x${size}.png`)),
    ),
  );

  await sharp(baseIcon)
    .resize(32, 32)
    .toFile(path.join(outputDir, "favicon.ico"));
}
