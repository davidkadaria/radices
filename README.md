# radices

A monorepo of single-document essays/projects that all share **one** build engine.
Each project lives in `projects/<name>/` and is deployed as its own site; the engine,
build scripts, styles, fonts and default template are shared at the repo root, so a
change to the shared configuration affects every project at once.

## Layout

```
radices/
├── engine/            # shared build engine (build.js, parseMarkdown.js, paths.js)
├── scripts/           # shared build steps (clean, icons, social, manifest, assets, minify)
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

Every build script resolves two roots:

- `REPO_ROOT` — derived from the script's own location; holds everything shared.
- `PROJECT_DIR` — `projects/<name>`, chosen via the **`PROJECT`** environment variable;
  holds `content/`, `icons/`, optional `templates/`, and the `dist/` output.

This lives in [`engine/paths.js`](engine/paths.js).

## Building locally

```bash
npm install
PROJECT=projects/hacker-manifesto npm run build
# output -> projects/hacker-manifesto/dist/
```

There is also a convenience script:

```bash
npm run build:hacker-manifesto
```

## Adding a new project

1. `mkdir -p projects/<name>/content projects/<name>/icons`
2. Add `content/essay.md` and `content/site.json`.
3. Add `icons/base_icon-2048x2048.png` and `icons/base_social-2400x1260.png`.
4. (Optional) Add `templates/base.html` to override the shared default for this project only.
5. Build: `PROJECT=projects/<name> npm run build`.

## Deploying on Vercel

Import this same repository once per project. For each Vercel project set:

| Setting           | Value                                            |
| ----------------- | ------------------------------------------------ |
| Root Directory    | repo root (default — needed to see `engine/`)    |
| Build Command     | `PROJECT=projects/<name> npm run build`          |
| Output Directory  | `projects/<name>/dist`                           |

Pushing to the repo rebuilds every project that imports it, so a shared engine fix
lands everywhere at once.

## Future: a root landing site

A central landing page (linking to each sub-project) can be added later as just
another project — e.g. `projects/home/` deployed at the apex domain. The literal
repo-root `dist/` namespace is intentionally left unused to keep that option open.
