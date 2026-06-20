import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

export async function generateSocialImages({ ICONS_DIR, DIST_DIR }) {
  const input = path.join(ICONS_DIR, "base_social-2400x1260.png");
  const outDir = path.join(DIST_DIR, "social");
  await fs.mkdir(outDir, { recursive: true });

  await Promise.all([
    sharp(input).resize(1200, 630).png().toFile(path.join(outDir, "og-1200x630.png")),
    sharp(input).resize(600, 315).png().toFile(path.join(outDir, "og-600x315.png")),
    sharp(input).resize(1200, 630).png().toFile(path.join(outDir, "twitter-1200x630.png")),
  ]);
}
