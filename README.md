# austinhowlett.me

My personal blog and site. A minimal, fast, low-maintenance Jekyll site —
intentionally "just files on a server."

## Stack

- [Jekyll](https://jekyllrb.com/) (static site generator)
- IBM Plex Sans for reading, IBM Plex Mono for nav, dates, tags and code
- Hand-written CSS ("Dusk" palette: periwinkle on a cool, softened base)
- Light/dark follows the system, with a manual toggle in the header
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

## Tests

Both suites live in `test/` and run in CI before every deploy:

```sh
bundle exec rake test   # writing tools (lib/blog/)
npm test                # palette contrast + theme toggle (Node built-in runner, no installs)
```

`test/palette.test.js` reads the colours straight from `style.css` and checks
contrast in both modes, so run it after any colour change.

## Writing a post

Posts start as drafts, which you preview with the real site styles before
they're published.

```sh
bin/new-post "Your title"   # creates _drafts/your-title.md
bin/serve                   # http://localhost:4000, drafts included, live reload
```

Open the draft in any editor and keep the browser open on the post: it
reloads every time you save. Fill in the front matter as you go:

```yaml
---
title: "Your title"
tags: [optional, tags]
description: One-line summary for SEO and the feed.
---
```

When it's ready:

```sh
bin/publish your-title      # moves it to _posts/YYYY-MM-DD-your-title.md
```

`publish` sets today's date (and adds a `date:` line) in the front matter.
`_drafts/` is gitignored, so drafts stay on your machine until published. Posts are
published at `/blog/:year/:title/`. Commit and push — the site rebuilds and
deploys automatically.

## Structure

```
.
├── _config.yml          # site settings
├── _layouts/            # default, page, post
├── _includes/           # head, header, footer
├── _posts/              # blog posts (Markdown)
├── _drafts/             # unpublished drafts, gitignored (created by bin/new-post)
├── bin/                 # new-post, serve, publish
├── lib/blog/            # code behind bin/
├── test/                # Ruby tests for lib/, JS tests for styles and toggle
├── assets/css/style.css # all styles (palette tokens at the top)
├── assets/js/theme.js   # light/dark toggle
├── index.html           # landing page (post list)
├── about.md             # bio / experience / contact
├── tags.html            # tag index
└── 404.html
```

## Deployment

Pushing to the default branch triggers `.github/workflows/deploy.yml`, which
builds with Jekyll and deploys to GitHub Pages. In the repo settings, set
**Settings → Pages → Build and deployment → Source** to **GitHub Actions**.
