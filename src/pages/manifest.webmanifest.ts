import type { APIRoute } from "astro";
import { site, siteDescription } from "../site";

// Same web app manifest as gatsby-plugin-manifest produced, at the same URL.
export const GET: APIRoute = async () => {
  const manifest = {
    name: site.title,
    short_name: site.name,
    description: await siteDescription(),
    start_url: "/",
    background_color: site.backgroundColor,
    display: "standalone",
    icons: [
      { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/android-chrome-384x384.png", sizes: "384x384", type: "image/png" },
    ],
  };

  return new Response(JSON.stringify(manifest), {
    headers: { "Content-Type": "application/manifest+json" },
  });
};
