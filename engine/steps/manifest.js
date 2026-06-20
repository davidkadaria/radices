import fs from "node:fs/promises";
import path from "node:path";
import { CONTENT_DIR, DIST_DIR } from "../paths.js";

export async function generateManifest() {
  const site = JSON.parse(
    await fs.readFile(path.join(CONTENT_DIR, "site.json"), "utf-8"),
  );

  const manifest = {
    name: site.title,
    short_name: site.title_short,
    start_url: ".",
    display: "fullscreen",
    background_color: site.background,
    theme_color: site.theme,
    icons: [48, 72, 96, 144, 192, 512].map((size) => ({
      src: `./icons/icon-${size}x${size}.png`,
      sizes: `${size}x${size}`,
      type: "image/png",
    })),
  };

  await fs.mkdir(DIST_DIR, { recursive: true });
  await fs.writeFile(
    path.join(DIST_DIR, "manifest.json"),
    JSON.stringify(manifest, null, 2),
  );
}
