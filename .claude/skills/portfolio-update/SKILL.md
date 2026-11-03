---
name: portfolio-update
description: Update the portfolio one-pager content: intro/hero text, about section, project cards, contact links and site SEO metadata. Use when the user wants to change bio text, add or remove a project, or update headline/description.
---

# Portfolio content updates

## Where the content lives
| Section | File |
|---|---|
| Intro / hero | `src/@lekoarts/gatsby-theme-cara/sections/intro.mdx` |
| About | `src/@lekoarts/gatsby-theme-cara/sections/about.mdx` |
| Projects | `src/@lekoarts/gatsby-theme-cara/sections/projects.mdx` |
| Contact | `src/@lekoarts/gatsby-theme-cara/sections/contact.mdx` |
| SEO title, description, headline | `gatsby-config.ts` → `siteMetadata` **and** `gatsby-plugin-manifest` options |
| Social icons / footer | `src/@lekoarts/gatsby-theme-cara/components/footer.tsx` |

These are MDX files. The components available inside them come from cara's `mdx-components`.

## Project cards
```mdx
<ProjectCard
  title="Name"
  link="https://example.com"
  rel="nofollow noopener noreferrer"   // optional; default is "noreferrer noopener"
>
  One or two sentences: what it does and who it's for.
</ProjectCard>
```
- Keep descriptions short (about 2 lines) and in the same tone as the existing cards.
- Use `rel="follow"` only for projects you want to pass SEO weight to.
- **Known gap:** the shadowed `components/project-card.tsx` renders an `image` prop (a React node), but `projects.mdx` passes `imageSrc` (a string), so logos currently don't render. Tell the user about this when touching project images. Don't silently switch props.

## Changing the headline or role
If the role or specialisation changes, update every place that repeats it:
- `intro.mdx`
- `siteMetadata.siteTitleAlt`, `siteHeadline`, `siteDescription`
- the manifest `name` and `description`

## Verify
Run `npm run build`, then `npm run serve`, and check the section renders and the parallax offsets still look right. Long text can overflow the cara parallax sections. If it does, the offsets are in `templates/cara.tsx`.
