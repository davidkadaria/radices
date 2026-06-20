# Radices

**Radices** is a collection of long-form essays and translations, each published
as its own fast, minimal, single-page website. Every site is generated from a
single Markdown file by a small shared engine that lives in this repository.

The first project is a Georgian translation of *The Hacker Manifesto*.

## How it works

Each project is a folder under `projects/<name>/` holding just its content
(`essay.md`), some metadata (`site.json`) and a couple of source images. The
shared engine turns that into a complete static site — HTML, favicons, social
cards, a web app manifest, and minified assets.

Because the engine, styles, fonts and default template are shared at the repo
root, an improvement to any of them benefits every project at once. A project
can still override the shared template when it needs to.

## Layout

```
radices/
├── engine/            # shared build engine (one Node process)
│   ├── build.js       # ordered build pipeline
│   ├── add-project.js # scaffolds a new project from engine/scaffold/
│   ├── paths.js       # repo-root / project-path resolution
│   ├── parseMarkdown.js
│   ├── scaffold/      # template copied by add-project (content + placeholder icons)
│   └── steps/         # one module per build step (clean, icons, html, minify, …)
├── scripts/           # shared client-side runtime scripts (e.g. theme.js)
├── styles/            # shared CSS
├── fonts/             # shared fonts
├── templates/
│   └── base.html      # shared default template (a project may override it)
├── package.json       # one shared dependency set
└── projects/
    └── hacker-manifesto/
        ├── content/   # essay.md + site.json   (per project)
        ├── icons/     # base icon + social image (per project)
        ├── templates/ # optional base.html override for just this project
        └── dist/      # build output (gitignored)
```

## Adding a new project

```bash
npm run add-project --name my-essay
```

This scaffolds `projects/my-essay/` with starter content and placeholder icons,
so it builds immediately. Then:

1. Edit `projects/my-essay/content/site.json` — titles, URL, colors, etc.
2. Write `projects/my-essay/content/essay.md`.
3. Replace the placeholder `projects/my-essay/icons/*.png`.
4. (Optional) Add `projects/my-essay/templates/base.html` to override the shared template.

## Building a project

```bash
npm install
npm run build-project --name my-essay
# output -> projects/my-essay/dist/
```

The project name comes from `--name` (or a `PROJECT_NAME` environment variable).
The resulting `dist/` folder is a self-contained static site that can be served
by any static host.

## Roadmap

A central landing page linking to each sub-project can be added later as just
another project — e.g. `projects/home/`. The repo-root `dist/` namespace is
intentionally left unused to keep that option open.

## License

Licensed under the [PolyForm Noncommercial License 1.0.0](LICENSE) — free to
use, modify and share for any noncommercial purpose.
