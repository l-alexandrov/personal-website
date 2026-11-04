import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getPosts, localeParam, localesWithPosts, postPath, ui, type Locale } from "../../../blog";
import { site } from "../../../site";

// One feed per language with posts: /blog/rss.xml and /bg/blog/rss.xml.
export async function getStaticPaths() {
  return (await localesWithPosts()).map((locale) => ({ params: { locale: localeParam(locale) }, props: { locale } }));
}

export const GET: APIRoute = async ({ props, site: siteUrl }) => {
  if (!siteUrl) throw new Error("Set `site` in astro.config.ts");
  const { locale } = props as { locale: Locale };
  const t = ui[locale];

  return rss({
    title: `${t.blog} | ${site.name}`,
    description: t.description,
    site: siteUrl,
    items: (await getPosts(locale)).map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: postPath(post),
      categories: post.data.tags,
    })),
    customData: `<language>${locale}</language>`,
  });
};
