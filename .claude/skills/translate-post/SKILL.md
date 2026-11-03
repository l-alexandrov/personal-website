---
name: translate-post
description: Create the Bulgarian or English counterpart of an existing blog post in content/blog. Use when the user asks to translate a post, or to make a bg/en version of one.
---

# Translate a blog post (en ↔ bg)

## Steps
1. Read the source post and `src/pages/admin/config.ts`. Note the source language from its `language` field.
2. **File naming:** the pair shares a base slug and differs by suffix: `<slug>-en.md` and `<slug>-bg.md`.
   - If the source has no suffix (e.g. `my-first-post.md`), create only `<slug>-<target>.md`. Ask before renaming the source, because renaming changes its public URL.
   - Use an ASCII slug for both files. Don't use a Cyrillic file name.
3. **Frontmatter:**
   - `language`: the target language
   - `title`: translated, natural rather than literal
   - `keywords`: translated into what people actually search for in that language. English tech terms are often what Bulgarian readers search for.
   - `date`, `image`, `layout`: copied unchanged
4. **Body:**
   - Translate meaning and tone, not word for word. Follow `.claude/skills/new-blog-post/references/style-guide.md`.
   - Do **not** translate code blocks, inline code, commands, URLs, product names or proper nouns.
   - Comments inside code blocks may be translated if they are explanatory.
   - Keep the heading structure, links and images the same as the source.
   - Mark idioms or claims that may not carry over with `<!-- TODO: check translation -->`.
5. Report what was created, plus any wording you were unsure of.

## Known limitation
The CMS schema has no field that links translations to each other, so the pair is matched only by file name. To show language switchers on post pages, a `translation_key` (or similar) field would need to be added to `src/pages/admin/config.ts` and the blog templates. Suggest this, but don't make the change unless asked.
