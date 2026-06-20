import fs from "node:fs/promises";
import path from "node:path";
import { minify as minifyHtml } from "html-minifier-terser";
import CleanCSS from "clean-css";
import { minify as minifyJs } from "terser";
import { DIST_DIR } from "../engine/paths.js";

async function minifyFiles() {
  console.log("Starting minification...");

  try {
    // 1. Minify HTML
    const htmlPath = path.join(DIST_DIR, "index.html");
    const htmlContent = await fs.readFile(htmlPath, "utf-8");
    const minifiedHtml = await minifyHtml(htmlContent, {
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: true,
      minifyCSS: true,
      minifyJS: true,
    });
    await fs.writeFile(htmlPath, minifiedHtml);
    console.log("✓ index.html minified");

    // 2. Minify CSS
    const stylesDir = path.join(DIST_DIR, "styles");
    const cssFiles = ["default.css", "styles.css"];
    const cssCleaner = new CleanCSS({ level: 2 }); // Level 2 enables aggressive optimizations

    for (const file of cssFiles) {
      const filePath = path.join(stylesDir, file);
      try {
        const cssContent = await fs.readFile(filePath, "utf-8");
        const minifiedCss = cssCleaner.minify(cssContent).styles;
        await fs.writeFile(filePath, minifiedCss);
        console.log(`✓ ${file} minified`);
      } catch (err) {
        if (err.code !== 'ENOENT') {
          console.warn(`Could not minify ${file}:`, err);
        }
      }
    }

    // 3. Minify JS
    const scriptsDir = path.join(DIST_DIR, "scripts");
    const jsFiles = ["theme.js"];
    
    for (const file of jsFiles) {
      const filePath = path.join(scriptsDir, file);
      try {
        const jsContent = await fs.readFile(filePath, "utf-8");
        const minifiedJs = await minifyJs(jsContent, {
          compress: {
            drop_console: true,
            passes: 2
          },
          mangle: true
        });
        if (minifiedJs.code) {
          await fs.writeFile(filePath, minifiedJs.code);
          console.log(`✓ ${file} minified`);
        }
      } catch (err) {
        if (err.code !== 'ENOENT') {
          console.warn(`Could not minify ${file}:`, err);
        }
      }
    }

    console.log("Minification complete.");
  } catch (error) {
    console.error("Minification failed:", error);
    process.exit(1);
  }
}

minifyFiles();
