---
name: new-blog-post
description: Scaffold or draft a new blog post in src/content/blog with frontmatter that matches the blog schema. Use when the user wants to start, write or draft a blog post, or turn notes or an outline into a post.
---

# New blog post

## 1. Gather inputs
Ask only for what is missing:
- **Topic / outline / notes.** If the user only wants a stub, write the frontmatter and a TODO body, and set `draft: true`.
- **Language:** `en` (default) or `bg`.
- **Cover image:** optional. An existing file in `src/content/blog/_images/`, or none. Never hotlink.
- **Tags:** 3–6. Propose them yourself if none are given.

## 2. Check the schema
Read the `blog` collection in `src/content.config.ts` first. It is the source of truth; if it has changed since this skill was written, follow the file. The current fields are:

```yaml
---
title: <string>
description: <one or two sentences; meta description, post list and RSS>
date: YYYY-MM-DDTHH:mm:ss          # local time (Europe/Sofia)
updated: YYYY-MM-DDTHH:mm:ss       # optional, only after a real revision
image: ../_images/<file>           # optional
imageAlt: <what the image shows>   # required when image is set
tags:
  - <tag>
draft: true                        # leave true until the author approves
---
<markdown body>
```

## 3. File name / slug
- `src/content/blog/<lang>/<slug>.md`. The slug is kebab-case ASCII derived from the English title; transliterate if there is only a Bulgarian title. It becomes the URL: `/blog/<slug>/` or `/bg/blog/<slug>/`.
- A translation uses the **same file name** in the other language's folder (see the `translate-post` skill). Pick the slug with that in mind.
- Don't overwrite an existing file, and don't rename a published one (its URL would change).

## 4. Draft the body
- Follow `references/style-guide.md` for voice.
- Plain Markdown only, no MDX components.
- Start with a hook paragraph. `description` is separate, so the first paragraph doesn't have to repeat it.
- Use `##` for headings (the title is the page's h1). Put code in fenced blocks with a language tag.
- Images in the body go in `src/content/blog/_images/` and are referenced as `../_images/<file>`, with alt text.
- Mark anything you made up or are unsure of with `<!-- TODO: verify -->` so the author checks it. Never invent personal anecdotes, client names or numbers.

## 5. Verify
- Run `npm run build` (0 errors, 0 warnings); the schema check catches missing or mistyped fields.
- Drafts only render in `npm run dev`: check the post at `/blog/<slug>/` (or `/bg/blog/<slug>/`) there.
- Suggest running the `blog-editor` agent for a review.
