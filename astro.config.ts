import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://lyuboo.com",
  // Keep the URL shape of the Gatsby site: every page is a folder with a trailing slash.
  trailingSlash: "always",
  build: {
    format: "directory",
  },
});
