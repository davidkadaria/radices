import fs from "node:fs/promises";
import path from "node:path";
import { minify as minifyHtml } from "html-minifier-terser";
import CleanCSS from "clean-css";
import { minify as minifyJs } from "terser";

const cssCleaner = new CleanCSS({ level: 2 });

async function minifyInPlace(filePath, transform) {
  let content;
  try {
    content = await fs.readFile(filePath, "utf-8");
  } catch (err) {
    if (err.code === "ENOENT") return; // nothing to minify
    throw err;
  }
  const result = await transform(content);
  if (result != null) await fs.writeFile(filePath, result);
}

export async function minify({ DIST_DIR }) {
  // HTML
  await minifyInPlace(path.join(DIST_DIR, "index.html"), (html) =>
    minifyHtml(html, {
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: true,
      minifyCSS: true,
      minifyJS: true,
    }),
  );

  // CSS
  const stylesDir = path.join(DIST_DIR, "styles");
  for (const file of ["default.css", "styles.css"]) {
    await minifyInPlace(path.join(stylesDir, file), (css) =>
      cssCleaner.minify(css).styles,
    );
  }

  // Client-side JS
  const scriptsDir = path.join(DIST_DIR, "scripts");
  for (const file of ["theme.js"]) {
    await minifyInPlace(path.join(scriptsDir, file), async (js) => {
      const { code } = await minifyJs(js, {
        compress: { drop_console: true, passes: 2 },
        mangle: true,
      });
      return code;
    });
  }
}
