import { getEntry } from "astro:content";

// Site-wide SEO values, carried over from the Gatsby siteMetadata and manifest.
export const site = {
  name: "Lyuboslav Alexandrov",
  // Home page title; other pages use "<page> | <name>".
  title: "Lyuboslav Alexandrov | Back-End Developer",
  jobTitle: "Back-End Developer",
  twitter: "@l_alexandroff",
  image: {
    src: "/ogImage.png",
    width: 1200,
    height: 630,
    alt: "Lyuboslav Alexandrov's site: his photo next to \"Hi, I'm Lyuboslav!\" on a dark background with outline shapes",
  },
  backgroundColor: "#141821",
  // Analytics and consent banner, loaded in production builds only.
  gaMeasurementId: "G-2XYKVWN08T",
  cookieYesScript: "https://cdn-cookieyes.com/client_data/406ed30202f70e7c0c8ae9c0/script.js",
};

const summary =
  "Lyuboslav Alexandrov is a back-end developer specializing in Laravel and PHP, with experience in CI/CD, WebSockets, and project management.";

// The default meta description. The location comes from the Contact section, so it is edited in one place.
export async function siteDescription(): Promise<string> {
  const contact = await getEntry("contact", "contact");
  if (!contact) throw new Error("Missing src/content/home/contact.md");
  return `${summary} Located in ${contact.data.location}.`;
}
