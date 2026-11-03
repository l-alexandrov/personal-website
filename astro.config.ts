import { defineConfig, fontProviders } from "astro/config";

// Unicode ranges of the Fontsource subsets we ship: Latin, and Cyrillic for the
// Bulgarian posts and project names. Copied from the packages' wght.css.
const subsets = {
  latin: [
    "U+0000-00FF",
    "U+0131",
    "U+0152-0153",
    "U+02BB-02BC",
    "U+02C6",
    "U+02DA",
    "U+02DC",
    "U+0304",
    "U+0308",
    "U+0329",
    "U+2000-206F",
    "U+20AC",
    "U+2122",
    "U+2191",
    "U+2193",
    "U+2212",
    "U+2215",
    "U+FEFF",
    "U+FFFD",
  ],
  cyrillic: ["U+0301", "U+0400-045F", "U+0490-0491", "U+04B0-04B1", "U+2116"],
} satisfies Record<string, [string, ...string[]]>;

// One @font-face for a subset, read from the installed @fontsource-variable package,
// so builds need no network and Dependabot tracks the font versions.
function fontsource(pkg: string, subset: keyof typeof subsets, weight: string) {
  return {
    src: [`@fontsource-variable/${pkg}/files/${pkg}-${subset}-wght-normal.woff2`] as [string],
    weight,
    style: "normal" as const,
    unicodeRange: subsets[subset],
  };
}

export default defineConfig({
  site: "https://lyuboo.com",
  // Keep the URL shape of the Gatsby site: every page is a folder with a trailing slash.
  trailingSlash: "always",
  build: {
    format: "directory",
  },
  fonts: [
    {
      name: "Geologica",
      cssVariable: "--font-geologica",
      provider: fontProviders.local(),
      options: {
        variants: [fontsource("geologica", "latin", "100 900"), fontsource("geologica", "cyrillic", "100 900")],
      },
      fallbacks: ["system-ui", "sans-serif"],
    },
    {
      name: "JetBrains Mono",
      cssVariable: "--font-jetbrains-mono",
      provider: fontProviders.local(),
      options: {
        variants: [
          fontsource("jetbrains-mono", "latin", "100 800"),
          fontsource("jetbrains-mono", "cyrillic", "100 800"),
        ],
      },
      fallbacks: ["ui-monospace", "monospace"],
    },
  ],
});
