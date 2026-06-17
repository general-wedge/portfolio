# austinhowlett.me

My personal blog and site. A minimal, fast, low-maintenance Jekyll site —
intentionally "just files on a server."

## Stack

- [Jekyll](https://jekyllrb.com/) (static site generator)
- One typeface: Roboto Mono
- Hand-written CSS, minimal JS, light/dark aware
- Deployed to GitHub Pages via GitHub Actions

## Local development

```sh
bundle install
bundle exec jekyll serve   # http://localhost:4000
```

`--livereload` is handy while writing:

```sh
bundle exec jekyll serve --livereload
```

## Writing a post

Create a file in `_posts/` named `YYYY-MM-DD-title.md` with front matter:

```yaml
---
title: "Your title"
date: 2026-06-17 09:00:00 -0500
tags: [optional, tags]
description: One-line summary for SEO and the feed.
---
```

Write the body in Markdown below the front matter. Posts are published at
`/blog/:year/:title/`. Commit and push — the site rebuilds and deploys
automatically.

## Structure

```
.
├── _config.yml          # site settings
├── _layouts/            # default, page, post
├── _includes/           # head, header, footer
├── _posts/              # blog posts (Markdown)
├── assets/css/style.css # all styles
├── index.html           # landing page (post list)
├── about.md             # bio / experience / contact
├── tags.html            # tag index
└── 404.html
```

## Deployment

Pushing to the default branch triggers `.github/workflows/deploy.yml`, which
builds with Jekyll and deploys to GitHub Pages. In the repo settings, set
**Settings → Pages → Build and deployment → Source** to **GitHub Actions**.
