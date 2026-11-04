import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Home page sections: one Markdown file each in src/content/home.
const homeSection = (name: string) => glob({ pattern: `${name}.md`, base: "./src/content/home" });

const intro = defineCollection({
  loader: homeSection("intro"),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      photo: image(),
      photoAlt: z.string(),
      actions: z.array(z.object({ label: z.string(), href: z.string() })).min(1),
    }),
});

const about = defineCollection({
  loader: homeSection("about"),
  schema: z.object({
    title: z.string(),
    quote: z.string(),
  }),
});

const contact = defineCollection({
  loader: homeSection("contact"),
  schema: z.object({
    title: z.string(),
    // Shown in the Contact section; also used in the SEO description.
    location: z.string(),
    socials: z.array(
      z.object({
        network: z.enum(["linkedin", "github", "x", "mail"]),
        label: z.string(),
        handle: z.string(),
        url: z.string(),
      }),
    ),
  }),
});

// One Markdown file per project; the body is the description.
const projects = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      url: z.url(),
      rel: z.string().default("noopener noreferrer"),
      order: z.number().int(),
      current: z.boolean().default(false),
      // Language of the title when it is not English, e.g. "bg".
      lang: z.string().optional(),
      logo: image(),
      // Plate colour behind the logo, so it reads in both themes.
      logoBg: z.string().optional(),
    }),
});

// Blog posts: src/content/blog/<lang>/<slug>.md. A translation has the same file name in the other
// language's folder. Sveltia CMS (public/admin/config.yml) writes the same fields; keep the two in sync.
const blog = defineCollection({
  loader: glob({ pattern: "{en,bg}/*.md", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        // Meta description and the summary in the post list and RSS feed.
        description: z.string(),
        date: z.coerce.date(),
        updated: z.coerce.date().optional(),
        // Cover image from src/content/blog/_images, written as "@blog-images/<file>" (alias in tsconfig.json).
        image: image().optional(),
        imageAlt: z.string().optional(),
        tags: z.array(z.string()).default([]),
        // Drafts show in `npm run dev` only.
        draft: z.boolean().default(false),
      })
      .refine((post) => !post.image || post.imageAlt, {
        message: "imageAlt is required when image is set",
        path: ["imageAlt"],
      }),
});

export const collections = { intro, about, contact, projects, blog };
