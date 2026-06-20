# radices

A monorepo of single-document essays/projects that all share **one** build engine.
Each project lives in `projects/<name>/` and is deployed as its own site; the engine,
build scripts, styles, fonts and default template are shared at the repo root, so a
change to the shared configuration affects every project at once.

## Layout

```
radices/
├── engine/            # shared build engine (one Node process)
│   ├── build.js       # ordered build pipeline
│   ├── add-project.js # scaffolds a new project from engine/scaffold/
│   ├── paths.js       # REPO_ROOT / project-path resolution
│   ├── parseMarkdown.js
│   ├── scaffold/      # template copied by add-project (content + placeholder icons)
│   └── steps/         # one module per build step (clean, icons, html, minify, …)
├── scripts/           # shared CLIENT-side runtime scripts (e.g. theme.js)
├── styles/            # shared CSS
├── fonts/             # shared fonts
├── templates/
│   └── base.html      # shared DEFAULT template (a project may override it)
├── package.json       # one shared dependency set
└── projects/
    └── hacker-manifesto/
        ├── content/   # essay.md + site.json   (per project)
        ├── icons/     # base icon + social image (per project)
        ├── templates/ # OPTIONAL base.html override for just this project
        └── dist/      # build output (gitignored)
```

## How a project is selected

The engine resolves two roots ([`engine/paths.js`](engine/paths.js)):

- `REPO_ROOT` — derived from the script's own location; holds everything shared.
- `PROJECT_DIR` — `projects/<name>`, where `<name>` comes from `--name` (or the
  `PROJECT_NAME` env var); holds `content/`, `icons/`, optional `templates/`, and `dist/`.

## Adding a new project

```bash
npm run add-project --name my-essay
```

This scaffolds `projects/my-essay/` (content + placeholder icons) so it builds
immediately. Then:

1. Edit `projects/my-essay/content/site.json` — titles, URL, colors, etc.
2. Write `projects/my-essay/content/essay.md`.
3. Replace the placeholder `projects/my-essay/icons/*.png`.
4. (Optional) Add `projects/my-essay/templates/base.html` to override the shared template.

## Building locally

```bash
npm install
npm run build-project --name hacker-manifesto
# output -> projects/hacker-manifesto/dist/
```

## Deploying on Vercel

Import this same repository once per project. For each Vercel project set:

| Setting           | Value                                            |
| ----------------- | ------------------------------------------------ |
| Root Directory    | repo root (default — needed to see `engine/`)    |
| Build Command     | `npm run build-project --name <name>`            |
| Output Directory  | `projects/<name>/dist`                           |

(Or set a `PROJECT_NAME=<name>` env var and use `npm run build-project`.)
Pushing to the repo rebuilds every project that imports it, so a shared engine fix
lands everywhere at once.

## Future: a root landing site

A central landing page (linking to each sub-project) can be added later as just
another project — e.g. `projects/home/` deployed at the apex domain. The literal
repo-root `dist/` namespace is intentionally left unused to keep that option open.
