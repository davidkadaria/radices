import { clean } from "./steps/clean.js";
import { generateIcons } from "./steps/icons.js";
import { generateSocialImages } from "./steps/social-images.js";
import { generateManifest } from "./steps/manifest.js";
import { copyAssets } from "./steps/copy-assets.js";
import { renderHtml } from "./steps/render-html.js";
import { minify } from "./steps/minify.js";

// Ordered build pipeline. `clean` runs first; `minify` must run last (it
// rewrites the HTML/CSS/JS produced by the earlier steps). The steps in
// between only need to precede minify.
const STEPS = [
  ["Clean dist", clean],
  ["Generate icons", generateIcons],
  ["Generate social images", generateSocialImages],
  ["Generate manifest", generateManifest],
  ["Copy assets", copyAssets],
  ["Render HTML", renderHtml],
  ["Minify", minify],
];

async function build() {
  console.log(`Building ${process.env.PROJECT}`);
  for (const [label, run] of STEPS) {
    await run();
    console.log(`✓ ${label}`);
  }
  console.log("Build complete.");
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
