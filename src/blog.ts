import { getCollection, type CollectionEntry } from "astro:content";

// Blog languages. English lives at /blog/, every other language at /<lang>/blog/.
export const locales = ["en", "bg"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export type Post = CollectionEntry<"blog">;

// Entry ids look like "en/my-first-post": the folder is the language, the file name the slug.
export function postLocale(post: Post): Locale {
  return post.id.split("/")[0] as Locale;
}

export function postSlug(post: Post): string {
  return post.id.split("/").slice(1).join("/");
}

export function blogPath(locale: Locale): string {
  return locale === defaultLocale ? "/blog/" : `/${locale}/blog/`;
}

export function postPath(post: Post): string {
  return `${blogPath(postLocale(post))}${postSlug(post)}/`;
}

// The [...locale] route param: empty for English, the language code otherwise.
export function localeParam(locale: Locale): string | undefined {
  return locale === defaultLocale ? undefined : locale;
}

// Posts newest first, in one language or all of them. Drafts are included only in `astro dev`.
export async function getPosts(locale?: Locale): Promise<Post[]> {
  const posts = await getCollection(
    "blog",
    (post) => (import.meta.env.DEV || !post.data.draft) && (!locale || postLocale(post) === locale),
  );
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

// Languages with at least one post. Only these get a post list and a feed, so no empty pages are published.
export async function localesWithPosts(): Promise<Locale[]> {
  const posts = await getPosts();
  return locales.filter((locale) => posts.some((post) => postLocale(post) === locale));
}

// The same post in the other languages: translations share the file name.
export async function getTranslations(post: Post): Promise<Post[]> {
  const slug = postSlug(post);
  return (await getPosts()).filter((other) => other.id !== post.id && postSlug(other) === slug);
}

export function formatDate(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(ui[locale].dateLocale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Sofia",
  }).format(date);
}

// Interface text for the blog pages, per language.
export const ui = {
  en: {
    blog: "Blog",
    description: "Notes on back-end development, Laravel, PHP and the work around them.",
    allPosts: "All posts",
    updated: "Updated",
    tags: "Tags",
    rss: "RSS feed",
    // Links to this language, written in this language.
    readIn: "Read in English",
    postsIn: "Posts in English",
    dateLocale: "en-GB",
    ogLocale: "en_US",
  },
  bg: {
    blog: "Блог",
    description: "Бележки за бекенд разработката, Laravel, PHP и работата около тях.",
    allPosts: "Всички публикации",
    updated: "Обновено",
    tags: "Етикети",
    rss: "RSS абонамент",
    readIn: "Прочетете на български",
    postsIn: "Публикации на български",
    dateLocale: "bg-BG",
    ogLocale: "bg_BG",
  },
} satisfies Record<Locale, Record<string, string>>;
