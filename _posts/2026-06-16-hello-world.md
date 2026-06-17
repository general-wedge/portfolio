---
title: "Hello, world"
date: 2026-06-16 09:00:00 -0500
tags: [meta, jekyll]
description: A first post, and a quick tour of how this site is put together.
---

This is the first post on the new site. It exists mostly to prove that the
posting workflow works: write a Markdown file, commit it, push it, and it
becomes a page.

## Why this site exists

I wanted something minimal and fast — a place to write that feels like
*just files on a server*. No database, no heavy framework, no build I have to
babysit. Jekyll turns Markdown into plain HTML, which is exactly the right
amount of machinery.

## Adding a post

Drop a file in `_posts/` named `YYYY-MM-DD-title.md` with front matter:

```yaml
---
title: "Your title here"
date: 2026-06-17 09:00:00 -0500
tags: [optional, tags]
---
```

…then write the body in Markdown. Things like `inline code`, lists, and
blockquotes all render cleanly:

> Keep it simple. Write the file, push it, move on.

That's the whole workflow. More to come.
