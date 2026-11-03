---
name: new-blog-post
description: Scaffold or draft a new blog post in content/blog with frontmatter that matches the Static CMS schema. Use when the user wants to start, write or draft a blog post, or turn notes or an outline into a post.
---

# New blog post

> **Status:** the blog is not on master yet. It moves to Astro in part B of the migration (posts in `content/blog/{en,bg}/`, Sveltia CMS config in `public/admin/config.yml`), and this file will be updated then. Until then the schema referred to below, `src/pages/admin/config.ts`, exists only on branch `Feature/Blog-wip` (`git show Feature/Blog-wip:src/pages/admin/config.ts`).

## 1. Gather inputs
Ask only for what is missing:
- **Topic / outline / notes.** If the user only wants a stub, write frontmatter and a TODO body.
- **Language:** `en` (default) or `bg`.
- **Featured image:** an existing file in `images/uploads/`, or leave it empty and tell the user one is needed.
- **Keywords:** 3–7. Propose them yourself if none are given.

## 2. Check the schema
Read `src/pages/admin/config.ts` first. It is the source of truth, and if it has changed since this skill was written, follow the file. The current fields are:

```yaml
---
layout: blog                 # hidden, always "blog"
title: <string>
date: YYYY-MM-DDTHH:mm:ss    # local time, no timezone, like the existing post
image: ../../images/uploads/<file>   # relative to the .md file
language: en                 # en | bg
keywords:
  - <keyword>
---
<markdown body>
```

## 3. File name / slug
- `content/blog/<slug>.md`, where the slug is kebab-case, ASCII and derived from the title (transliterate Bulgarian titles).
- If this post will have a translation, give the language its own suffix, e.g. `<slug>-en.md` and `<slug>-bg.md` (see the `translate-post` skill).
- Don't overwrite an existing file.

## 4. Draft the body
- Follow `references/style-guide.md` for voice.
- Use plain Markdown only, no MDX components.
- Start with a hook paragraph, because the first ~140 characters become the listing excerpt.
- Use `##` for headings (the title is the page's h1). Put code in fenced blocks with a language tag.
- Images in the body go in `images/uploads/` and are referenced relatively.
- Mark anything you made up or are unsure of with `<!-- TODO: verify -->` so the author checks it. Never invent personal anecdotes, client names or numbers.

## 5. Verify
- Run `npm run build`. Until the blog collection exists (see "Blog: current state" in CLAUDE.md), the build ignores posts. Say so instead of adding the collection without being asked.
- Suggest running the `blog-editor` agent for a review.
