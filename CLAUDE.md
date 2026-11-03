# CLAUDE.md

Personal website of Lyuboslav Alexandrov (https://lyuboo.com): a one-page portfolio plus a blog that is still being built. It is statically generated with Gatsby and hosted on GitHub Pages.

## Stack
- Gatsby 5, React 18, TypeScript
- Base theme: `@lekoarts/gatsby-theme-cara` (parallax one-pager), customised through **component shadowing**
- Styling: Theme UI (`sx` prop) on top of `@theme-ui/preset-tailwind`
- Blog CMS: Static CMS (`@staticcms/core`) at `/admin`, GitHub backend, editorial workflow
- Analytics: GA4 loaded through Partytown (`@qwik.dev/partytown`, the successor to `@builder.io/partytown`) only, in `gatsby-ssr.tsx`, with page views sent from `gatsby-browser.tsx`. Partytown lib files are copied to `static/~partytown` in `onPreBuild`. Don't re-add `gatsby-plugin-google-gtag`, because it would load gtag a second time.

## Commands
Use **npm**, not yarn. CI chooses the package manager by checking for `package-lock.json`.

| Task | Command |
|---|---|
| Dev server (http://localhost:8000) | `npm run develop` |
| Production build | `npm run build` |
| Serve the build | `npm run serve` |
| Clear `.cache`/`public` | `npm run clean` |
| Bundle analysis | `ANALYSE_BUNDLE=1 npm run build` → `public/.statoscope/` |

There are no tests and no linter. **`npm run build` is the verification step.** It has to succeed, and you should read the perf-budget warnings it prints.

## Dependencies
- `.npmrc` sets `legacy-peer-deps=true`, so peer dependencies are not installed. The root devDependency `ajv@^8` exists so that the hoisted `ajv-keywords@5`, which `schema-utils@4` and `terser-webpack-plugin` need, can find `ajv/dist/compile/codegen`. Don't remove it, or the build fails.
- `overrides` in `package.json` force patched transitive versions, including `sharp@^0.35` (Gatsby pins 0.32) and `ejs@^3` (pulled in by `gatsby-plugin-perf-budgets`). Re-check `npm audit` and the build after bumping Gatsby, and drop an override once upstream catches up.
- React stays on 18, because the cara theme peers on `react ^18`.

## Where things live
- `gatsby-config.ts`: `siteMetadata` (SEO title, description, URL), manifest, plugins. Loads `.env` through `dotenv`.
- `gatsby-node.ts`: `onPreBuild` (Partytown) and a `remoteImage(url)` GraphQL resolver.
- `src/@lekoarts/gatsby-theme-cara/`: **shadowed theme files**. A file here replaces the file at the same relative path in `node_modules/@lekoarts/gatsby-theme-cara/src/`.
  - `sections/*.mdx`: portfolio copy (intro, about, projects, contact)
  - `components/`, `templates/cara.tsx`: overridden components and the page template
- `src/gatsby-plugin-theme-ui/index.ts`: theme tokens (colors, light/dark modes). Dark is the default.
- `src/components/`: custom components (`navigation`, `breadcrumb`, `colormode-toggle`).
- `src/pages/`: `404.tsx`, `blog/index.tsx`, `admin/` (Static CMS).
- `content/blog/*.md`: blog posts. `images/uploads/`: CMS media.
- `static/`: files copied verbatim (favicons, `ogImage.jpg`).

## Blog: current state
The blog is **work in progress** on branch `Feature/Blog`:
- `src/pages/blog/index.tsx` queries `allMarkdownRemark` (including `fields.slug`). However, `gatsby-config.ts` does not yet register `gatsby-transformer-remark` or a `gatsby-source-filesystem` entry for `content/blog`, and nothing creates the `slug` field or individual post pages.
- `@staticcms/core` and `dotenv` are imported but missing from `package.json`.
- The frontmatter schema is defined by `src/pages/admin/config.ts`. Keep posts and that file in sync.

## Conventions
- Style with the `sx` prop and theme tokens (`primary`, `text`, `heading`, `background`, spacing scale), not hard-coded colours. Check both light and dark modes.
- Components that use `sx` start with the `/** @jsx jsx */` pragma and `import { jsx } from "theme-ui"`.
- New pages reuse the cara building blocks: `Layout`, `Seo`, `Inner` and `Svg` from `@lekoarts/gatsby-theme-cara/src/...`, plus `Navigation`. See `src/pages/blog/index.tsx`.
- `trailingSlash: "always"`, so internal links end with `/`.
- SEO text exists in two places, `siteMetadata` and the `gatsby-plugin-manifest` options. Update both together.
- Content languages: `en` (default) and `bg`.

## Deploy
Pushing to `master` runs `.github/workflows/cd.yml`, which builds on Node 20 with `PREFIX_PATHS=true` and deploys to GitHub Pages. `.nvmrc` says 18, which doesn't match CI.

## Git
- Branches: `Feature/<Name>`, `Chore/<name>`. PRs target `master`.
- Never commit, push or open PRs unless explicitly asked.

## Claude tooling in this repo
Skills (`.claude/skills/`):
- `new-blog-post`: scaffold or draft a post with correct frontmatter
- `translate-post`: create the en↔bg counterpart of a post
- `theme-component`: shadow a cara component or add a themed page
- `portfolio-update`: edit intro, about, projects and contact copy

Agents (`.claude/agents/`):
- `blog-editor`: proofread posts and review their SEO and frontmatter
- `site-auditor`: build the site and audit SEO, performance and accessibility before a PR

For general code review, use the built-in `/code-review`.
