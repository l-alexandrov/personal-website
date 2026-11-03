# CLAUDE.md

Personal website of Lyuboslav Alexandrov (https://lyuboo.com): a one-page portfolio plus a blog that is still being built. It is statically generated with Astro and hosted on GitHub Pages.

## Stack
- Astro 7, TypeScript (strict), static output, no UI framework
- Styling: plain CSS with custom properties. Tokens in `src/styles/tokens.css`, base styles in `src/styles/global.css`, everything else in each component's scoped `<style>`
- Content: Astro content collections (Markdown + zod schemas)
- Fonts: Geologica and JetBrains Mono, self-hosted from `@fontsource-variable/*` through Astro's fonts API (Latin and Cyrillic)
- Analytics: GA4 through `@astrojs/partytown`, plus the CookieYes banner, both in production builds only (`src/components/Analytics.astro`)
- Sitemap: `@astrojs/sitemap`

## Commands
Use **npm**, not yarn. Use Node 24 (`nvm use`); Astro 7 does not run on older versions.

| Task | Command |
|---|---|
| Dev server (http://localhost:4321) | `npm run dev` |
| Type check + production build | `npm run build` |
| Serve the build | `npm run preview` |
| Type check only | `npm run check` |
| Clear `dist`/`.astro` | `npm run clean` |

There are no tests and no linter. **`npm run build` is the verification step**: it runs `astro check` first, and both have to finish with 0 errors and 0 warnings.

## Dependencies
- TypeScript stays on 6, because `@astrojs/check` supports TypeScript 5 and 6 only. Dependabot ignores TypeScript majors for this reason.
- Fonts come from the installed Fontsource packages through the `local` font provider in `astro.config.ts`, whose Unicode ranges are copied from the packages' `wght.css`. Re-check them when a font package changes its subsets. (The npm provider's offline mode emits `file://` URLs that Astro 7.4 cannot read.)

## Where things live
- `astro.config.ts`: site URL, `trailingSlash: "always"`, integrations, fonts.
- `src/site.ts`: SEO values (titles, share image, Twitter handle), the GA4 ID and the CookieYes script. `siteDescription()` builds the meta description and takes the location from `contact.md`.
- `src/content.config.ts`: content collection schemas.
- `src/content/home/{intro,about,contact}.md`: home page copy. `src/content/projects/*.md`: one file per project, the body is the description.
- `src/assets/`: images processed by `astro:assets` (photo, project logos).
- `src/layouts/BaseLayout.astro`: page shell (head, theme script, fonts, header, footer). Pages add extra head tags through `<Fragment slot="head">` or a component with `slot="head"`.
- `src/components/`: `Seo`, `Analytics`, `Header`, `Footer`, `ThemeToggle`/`ThemeScript`, `Sprite` + `Icon` (inline SVG sprite), `Section`; home sections in `components/home/`.
- `src/pages/`: `index.astro`, `404.astro`, and the `manifest.webmanifest` and `robots.txt` endpoints.
- `public/`: files copied verbatim (favicons, `ogImage.png`).

## Blog: current state
The blog is not on master yet. It moves to Astro in part B of the migration:
- Posts in `content/blog/{en,bg}/*.md`, English at `/blog/<slug>/` and Bulgarian at `/bg/blog/<slug>/`, linked by a `translationKey` field.
- Sveltia CMS at `/admin/` (`public/admin/`), GitHub backend with the editorial workflow.
- The earlier Gatsby/Static CMS work is kept on branch `Feature/Blog-wip`, including the original frontmatter schema in `src/pages/admin/config.ts`.

## Conventions
- Use the tokens from `tokens.css` (`--primary`, `--fg`, `--heading`, `--muted`, `--surface`, `--line`, `--s-*` shape colours), not hard-coded colours. Check both light and dark themes, at phone and desktop widths.
- Light/dark: `ThemeScript` sets `data-theme` on `<html>` before first paint; style light mode through the tokens, not per component.
- Decorative icons and shapes use `<Icon name="…" />`; add new symbols to `Sprite.astro` and the `IconName` type together.
- Images go through `astro:assets` (`<Image>` or `image()` in a schema), with real `alt` text, or `alt=""` when the image is decorative.
- `trailingSlash: "always"`, so internal links end with `/`.
- Content languages: `en` (default) and `bg`.

## Deploy
Pushing to `master` runs `.github/workflows/cd.yml`, which builds and deploys `dist/` to GitHub Pages. Pull requests to `master` run `.github/workflows/ci.yml` (check and build). CI takes its Node version from `.nvmrc` (24), and sets `ASTRO_TELEMETRY_DISABLED`. Actions are pinned to commit SHAs. Dependabot (`.github/dependabot.yml`) opens weekly grouped PRs for npm and Actions.

## Git
- Branches: `Feature/<Name>`, `Chore/<name>`. PRs target `master`.
- Never commit, push or open PRs unless explicitly asked.
- The last Gatsby version is tagged `gatsby-final`.

## Claude tooling in this repo
Skills (`.claude/skills/`):
- `new-blog-post`: scaffold or draft a post with correct frontmatter
- `translate-post`: create the en↔bg counterpart of a post
- `theme-component`: add or change an Astro component, section or page in the site's style
- `portfolio-update`: edit intro, about, projects and contact copy

Agents (`.claude/agents/`):
- `blog-editor`: proofread posts and review their SEO and frontmatter
- `site-auditor`: build the site and audit SEO, performance and accessibility before a PR

For general code review, use the built-in `/code-review`.
