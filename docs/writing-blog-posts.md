# Writing a blog post

Each post is one Markdown file in `content/blog/`. Save it, commit, push, and
the blog list, the post page, the sitemap and the RSS feed all update on their
own. No code changes.

## New post

1. Copy the template below into `content/blog/<short-slug>.md`. The file name
   becomes the address: `choosing-nuxt-3.md` is `/blog/choosing-nuxt-3`.
2. Fill in the front matter and write the post.
3. Remove `draft: true` when it is ready. Until then the post shows in the
   list as "coming soon", stays out of the sitemap and RSS, and its page is
   marked noindex and says it is still a draft. The title in the list links to
   the post page either way.

```md
---
title: "Plain title, no clickbait"
description: "One or two sentences that say what the post is about. This is the excerpt in the list and the snippet in search results."
date: "2026-09-01"
tags: [technology, web-development]
draft: true
---

Write here. Normal Markdown: ## headings, lists, links, code blocks, images.
```

## Fields

| Field | Required | Notes |
| --- | --- | --- |
| `title` | yes | Shown in the list, the page and the browser tab. |
| `description` | yes | Keep it under about 160 characters so search results don't cut it. |
| `date` | yes | Quoted `"YYYY-MM-DD"`. The list is sorted by it, newest first. |
| `tags` | no | Lowercase words. A tag becomes a filter chip once it is on at least two posts but not on all of them. |
| `draft` | no | `true` hides it from search, the sitemap and RSS. Delete the line to publish. |
| `image` | no | The thumbnail in the list. A path under `public/`, for example `/img/blog/my-post.webp` (5:3 works best). Posts start with `/img/blog/placeholder.svg`: change that one line when you have a picture. Delete the line for a row with no picture. |

## Writing

- Run the draft through the humanize skill before publishing (see
  `docs/writing-project-pages.md` for where it lives).
- Put an image in `public/img/blog/` and reference it as `![alt text](/img/blog/name.webp)`.
- Part 3 of the website series has its outline in an HTML comment at the top
  of the file. Delete the comment once the post is written.

## Skeletons

Every draft in `content/blog/` has a skeleton inside the HTML comment at the top
of the file: section headings with a prompt under each. Copy it below the
comment, replace the prompts with your own writing, then delete the comment.
For a new post, start from the same shape: what happened, what I tried, what
actually worked, what I'd do differently.
