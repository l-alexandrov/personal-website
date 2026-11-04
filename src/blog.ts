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

export type LanguageLink = { lang: Locale; href: string };

// The header's EN/БГ switch: this page in each language, or that language's post list when the page
// has no translation there. Empty when only one language has posts.
export async function languageLinks(locale: Locale, current: string, translations: Post[] = []): Promise<LanguageLink[]> {
  const withPosts = await localesWithPosts();
  const links = locales.flatMap((other) => {
    if (other === locale) return [{ lang: other, href: current }];
    const translation = translations.find((post) => postLocale(post) === other);
    if (translation) return [{ lang: other, href: postPath(translation) }];
    return withPosts.includes(other) ? [{ lang: other, href: blogPath(other) }] : [];
  });
  return links.length > 1 ? links : [];
}

// "14 Sept 2026" / "14 септември 2026". Built from parts, without the "г." after the year; Bulgarian
// spells the month out, because ICU has no short Bulgarian month names and would print "09".
export function formatDate(date: Date, locale: Locale): string {
  const format = new Intl.DateTimeFormat(ui[locale].dateLocale, {
    day: "numeric",
    month: locale === "bg" ? "long" : "short",
    year: "numeric",
    timeZone: "Europe/Sofia",
  });
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    format.formatToParts(date).find((item) => item.type === type)?.value;
  return `${part("day")} ${part("month")} ${part("year")}`;
}

// Minutes to read the body, at 200 words a minute.
export function readingTime(post: Post): number {
  const words = (post.body ?? "").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

// Older and newer posts in the same language, for the links under a post.
export async function getNeighbours(post: Post): Promise<{ older?: Post; newer?: Post }> {
  const posts = await getPosts(postLocale(post));
  const index = posts.findIndex((other) => other.id === post.id);
  return { newer: posts[index - 1], older: posts[index + 1] };
}

// Tags work as categories: each one has a stable slug, and with `tagPages` on, a post list at
// /blog/tags/<slug>/ (or /bg/blog/tags/<slug>/), linked from every tag. Off until there are enough posts.
export const tagPages = false;

export function tagSlug(tag: string): string {
  return tag
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
}

export function tagPath(locale: Locale, tag: string): string {
  return `${blogPath(locale)}tags/${tagSlug(tag)}/`;
}

// The tags used in one language, most used first. Tags that differ only in case or spacing are merged,
// also within one post, so a post is listed once per tag. Tags with no letters or digits are skipped.
export async function getTags(locale: Locale): Promise<{ slug: string; name: string; posts: Post[] }[]> {
  const tags = new Map<string, { slug: string; name: string; posts: Post[] }>();
  for (const post of await getPosts(locale)) {
    const seen = new Set<string>();
    for (const name of post.data.tags) {
      const slug = tagSlug(name);
      if (!slug || seen.has(slug)) continue;
      seen.add(slug);
      const tag = tags.get(slug) ?? { slug, name, posts: [] };
      tag.posts.push(post);
      tags.set(slug, tag);
    }
  }
  return [...tags.values()].sort((a, b) => b.posts.length - a.posts.length || a.name.localeCompare(b.name, locale));
}

// Interface text for the blog pages, per language.
export const ui = {
  en: {
    home: "Home",
    blog: "Blog",
    description: "Notes on back-end development, Laravel, PHP and the work around them.",
    allPosts: "All posts",
    updated: "Updated",
    tags: "Tags",
    taggedWith: "Posts tagged",
    rss: "RSS feed",
    minRead: (minutes: number) => `${minutes} min read`,
    postCount: (count: number) => `${count} ${count === 1 ? "post" : "posts"} in English`,
    onThisPage: "On this page",
    morePosts: "More posts",
    alsoIn: "Also in",
    onlyIn: "English only",
    author: "Back-end developer working with Laravel and PHP.",
    // Links to this language, written in this language.
    languageName: "English",
    readIn: "Read in English",
    postsIn: "Posts in English",
    short: "EN",
    dateLocale: "en-GB",
    ogLocale: "en_US",
  },
  bg: {
    home: "Начало",
    blog: "Блог",
    description: "Бележки за бекенд разработката, Laravel, PHP и работата около тях.",
    allPosts: "Всички публикации",
    updated: "Обновено",
    tags: "Етикети",
    taggedWith: "Публикации с етикет",
    rss: "RSS абонамент",
    minRead: (minutes: number) => `${minutes} мин. четене`,
    postCount: (count: number) => `${count} ${count === 1 ? "публикация" : "публикации"} на български`,
    onThisPage: "В тази публикация",
    morePosts: "Още публикации",
    alsoIn: "Има и на",
    onlyIn: "Само на български",
    author: "Бекенд разработчик, работи с Laravel и PHP.",
    languageName: "български",
    readIn: "Прочетете на български",
    postsIn: "Публикации на български",
    short: "БГ",
    dateLocale: "bg-BG",
    ogLocale: "bg_BG",
  },
} satisfies Record<Locale, Record<string, string | ((n: number) => string)>>;
