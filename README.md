# SemanticQA — Project Page

A simple, paper-styled GitHub Pages site for the
[SemanticQA](https://github.com/jacklanda/SemanticQA) benchmark.

```
blog/
├── index.html        # overview + abstract + taxonomy + findings
├── tasks.html        # 12 standalone tasks + 6 sequential, with examples
├── results.html      # leaderboard, scaling effects, cascade table
├── .nojekyll         # serve files as-is, no Jekyll processing
└── assets/
    ├── css/site.css       # design tokens, layout, hero, cards
    ├── css/site2.css      # tables, examples, KPI strip, TOC, charts
    └── js/site.js         # nav active state, citation copy, chip filter
```

## Design

- **Palette.** Warm paper (`#faf7f2`), oxblood accent (`#7a1f2b`), muted gold (`#b8954a`),
  soft rule lines. Dark mode auto-switches via `prefers-color-scheme`.
- **Typography.** Source Serif 4 for body and headings, Inter for nav / labels / tables,
  JetBrains Mono for code and citations.
- **No build step.** Pure HTML / CSS / a few KB of JS. Drops straight into GitHub Pages.

## Deploy

```bash
# from the repo root
git add blog
git commit -m "Add project page"
git push
```

In GitHub → Settings → Pages, choose **Deploy from a branch**, branch `main`, folder
`/blog`. The site will be available at `https://<user>.github.io/<repo>/`.

## Local preview

```bash
cd blog
python3 -m http.server 8000
# open http://localhost:8000
```
