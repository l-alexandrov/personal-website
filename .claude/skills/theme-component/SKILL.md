---
name: theme-component
description: Customise the @lekoarts/gatsby-theme-cara theme by shadowing a component, section or template, or add a new page that uses the site's layout and Theme UI tokens. Use for UI, styling, layout, navigation or new-page work.
---

# Theme components & pages

## Shadowing a cara file
Gatsby theme shadowing: a file at `src/@lekoarts/gatsby-theme-cara/<path>` replaces `node_modules/@lekoarts/gatsby-theme-cara/src/<path>`.

1. Check whether it is already shadowed: `ls src/@lekoarts/gatsby-theme-cara/{components,sections,templates}`. If so, edit the existing file.
2. Otherwise, copy the original from `node_modules/@lekoarts/gatsby-theme-cara/src/<path>` to the same relative path and change only what's needed.
3. Keep the same **default export** and props interface, because other theme files import it.
4. Files you can shadow include `components/{layout,seo,hero,about,projects,contact,footer,project-card,svg,mdx-components}.tsx`, `elements/{inner,content,divider}.tsx`, `templates/cara.tsx` and `sections/*.mdx`.
5. The dev server sometimes misses a newly created shadow file. Restart `npm run develop` (or run `npm run clean`) if the change doesn't show up.

## New page
Use `src/pages/blog/index.tsx` as the template:
- `/** @jsx jsx */` pragma with `import { jsx } from "theme-ui"`
- Wrap the page in `Layout` (from `@lekoarts/gatsby-theme-cara/src/components/layout`) and render `<Navigation />` (`src/components/navigation.tsx`)
- Export a `Head` that returns `<Seo title="…" />` (cara `seo` component)
- Add a `Breadcrumb` (`src/components/breadcrumb.tsx`) for sub-pages
- Add a link in `navigation.tsx` if the page should appear in the menu

## Styling rules
- Use `sx` with tokens from `src/gatsby-plugin-theme-ui/index.ts`: `primary`, `secondary`, `text`, `heading`, `textMuted`, `background`, `divider`, and `icon_*`. The Tailwind preset supplies the spacing, font and radius scales.
- Don't hard-code hex colours in components. Add a token to the theme instead, with a value under `modes.light` if the colour has to change in light mode.
- Use responsive arrays for breakpoints (`fontSize: [1, 2, 3]`).
- Check both colour modes (the toggle is in `colormode-toggle.tsx`) and widths down to about 360px.
- Use `gatsby-plugin-image` (`StaticImage` / `GatsbyImage`) rather than raw `<img>`, and give images meaningful `alt` text.

## Verify
Run `npm run build`. Watch for TypeScript/GraphQL errors and the perf-budget output.
