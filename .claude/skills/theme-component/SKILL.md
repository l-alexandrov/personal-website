---
name: theme-component
description: Add or change an Astro component, home section or page in the site's Workbench style, using the design tokens and shared layout. Use for UI, styling, layout, navigation or new-page work.
---

# Components, sections and pages

## Building blocks
- `src/layouts/BaseLayout.astro`: every page uses it. Props: `title` (omit on the home page), `description`, `noindex`, `lang`. Extra head tags go in the `head` slot.
- `src/components/Section.astro`: a home section with the Workbench heading (shape glyph, title, optional note). Props: `id`, `title`, `glyph`, `color`, `note`.
- `src/components/Icon.astro` + `Sprite.astro`: decorative icons and shapes from one inline SVG sprite. New icons need a `<symbol id="i-<name>">` in the sprite **and** the name in `IconName`.
- Global utilities in `src/styles/global.css`: `.wrap` (page width and gutters), `.stack` (vertical flex, `--gap`), `.btn`, `.btn-primary`, `.btn-ghost`, `.sr-only`, `.ico`, `.shape`.

## New component or section
1. Put it in `src/components/` (home sections in `src/components/home/`). Read content with `getEntry`/`getCollection` from `astro:content` rather than hard-coding copy.
2. Style it in a scoped `<style>` block. Use `:global(...)` only for elements rendered by `<Content />` or another component that doesn't forward attributes.
3. Child components get the parent's scoped styles only if they spread the rest props onto their root element (as `Icon` does).

## New page
- Add `src/pages/<name>.astro` (or `<name>/index.astro`) and wrap it in `BaseLayout` with a `title`.
- Internal links end with `/` (`trailingSlash: "always"`).
- Add a nav entry in `src/components/Header.astro` if the page belongs in the menu.
- Page-specific structured data goes in the `head` slot (see `PersonSchema.astro`).

## Styling rules
- Use tokens from `src/styles/tokens.css`: `--bg`, `--surface`, `--surface-2`, `--line`, `--fg`, `--heading`, `--muted`, `--primary`, `--primary-strong`, `--on-primary`, `--secondary-text`, the `--s-*` shape colours, `--radius*`, `--font-*`. Don't hard-code colours; add a token (with dark and light values, in both light blocks) instead.
- Mobile first, with `min-width` media queries; the main breakpoint is 860px.
- Motion only inside `@media (prefers-reduced-motion: no-preference)`; the global reduce rule switches transitions off.
- Images through `astro:assets` with real `alt` text (`alt=""` when decorative).
- Client JS only when needed, as a `<script>` in the component (bundled and deferred). Anything that must run before paint uses `is:inline`, like `ThemeScript.astro`.

## Verify
Run `npm run build` (0 errors, 0 warnings). Check the change with `npm run dev` in both themes, at about 375px and at desktop width, with no horizontal scroll, and try it with the keyboard.
