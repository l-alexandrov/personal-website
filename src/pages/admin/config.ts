import { Config } from "@staticcms/core";

const config: Config = {
  backend: {
    name: "github",
    repo: "l-alexandrov/personal-website",
    branch: "Feature/Blog",
  },
  publish_mode: "editorial_workflow",
  media_folder: "images/uploads",
  collections: [
    {
      name: "blog",
      label: "Blog Post",
      folder: "content/blog",
      create: true,
      slug: "{{slug}}",
      fields: [
        { label: "Layout", name: "layout", widget: "hidden", default: "blog" },
        { label: "Title", name: "title", widget: "string" },
        { label: "Publish Date", name: "date", widget: "datetime"},
        { label: "Featured Image", name: "image", widget: "image" },
        { label: "Body", name: "body", widget: "markdown" },
        {
          label: "Language",
          name: "language",
          widget: "select",
          options: ["en", "bg"],
          default: "en",
        },
        {
          label: "Keywords",
          name: "keywords",
          widget: "list",
          fields: [{ label: "Keyword", name: "keyword", widget: "string" }],
        }
      ],
    },
  ],
};

export default config;
