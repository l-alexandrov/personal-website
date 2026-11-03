---
name: portfolio-update
description: Update the portfolio one-pager content: intro/hero text, about section, project cards, contact links and site SEO metadata. Use when the user wants to change bio text, add or remove a project, or update headline/description.
---

# Portfolio content updates

## Where the content lives
| Section | File |
|---|---|
| Hero: headline, intro line, photo, buttons | `src/content/home/intro.md` |
| About: quote and paragraphs | `src/content/home/about.md` |
| Projects | `src/content/projects/<name>.md`, one file per project |
| Contact: location, intro line, social links | `src/content/home/contact.md` |
| SEO title, description, job title, share image | `src/site.ts` |
| Logos and photo | `src/assets/` |

The schemas are in `src/content.config.ts`. Read it before editing: the build fails on a missing or mistyped field, which is the point.

## Projects
```markdown
---
title: Name
url: https://example.com
rel: nofollow noopener noreferrer   # optional; default "noopener noreferrer"
order: 6                            # position in the list
current: true                       # optional; shows the "Current" badge
lang: bg                            # optional; when the name isn't English
logo: ../../assets/projects/<name>.png
logoBg: "#ffffff"                   # plate colour behind the logo
---

One or two sentences: what it does and who it's for.
```
- A logo is required. Store it in `src/assets/projects/` (don't hotlink) and pick a `logoBg` that the logo reads on in both themes.
- Keep descriptions short (about 2 lines) and in the same tone as the existing ones.
- Use a `rel` without `noreferrer`/`nofollow` only for projects that should get referrer data and SEO weight (Bimbala uses `noopener`).
- Renumber `order` when inserting a project between others.

## Changing the headline, role or location
Update every place that repeats it:
- `intro.md` (headline and intro line)
- `src/site.ts`: `title`, `jobTitle`, and the summary sentence used by `siteDescription()`
- The location lives only in `contact.md`; the meta description, manifest and schema.org address are built from it.
- The share image `public/ogImage.png` shows the headline too. Mention it if the headline changes.

## Verify
Run `npm run build` (0 errors, 0 warnings), then look at the page with `npm run dev` in both themes at phone and desktop widths. Check `dist/index.html` for the updated meta description when SEO text changed.
