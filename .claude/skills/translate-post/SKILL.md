---
name: translate-post
description: Create the Bulgarian or English counterpart of an existing blog post in src/content/blog. Use when the user asks to translate a post, or to make a bg/en version of one.
---

# Translate a blog post (en ↔ bg)

## How translations are linked
A translation is the file with the **same name** in the other language's folder: `src/content/blog/en/<slug>.md` ↔ `src/content/blog/bg/<slug>.md`. The site links them by that name (the "Read in English" / "Прочетете на български" switch and the hreflang tags), and Sveltia CMS stores them the same way. There is no separate linking field.

## Steps
1. Read the source post and the `blog` schema in `src/content.config.ts`. The source language is the folder it is in.
2. Create the target file with the same file name in the other folder. If it already exists, stop and ask; don't overwrite a translation.
3. **Frontmatter:**
   - `title`, `description`, `imageAlt`: translated, natural rather than literal
   - `tags`: what people actually search for in that language. English tech terms are often what Bulgarian readers search for.
   - `date`, `updated`, `image`, `draft`: copied unchanged (set `draft: true` if the author hasn't reviewed the translation yet)
4. **Body:**
   - Translate meaning and tone, not word for word. Follow `.claude/skills/new-blog-post/references/style-guide.md`.
   - Do **not** translate code blocks, inline code, commands, URLs, product names or proper nouns.
   - Comments inside code blocks may be translated if they are explanatory.
   - Keep the heading structure, links and images the same as the source. Translate image alt text.
   - Mark idioms or claims that may not carry over with `<!-- TODO: check translation -->`.
5. Run `npm run build`, then report what was created, plus any wording you were unsure of.
