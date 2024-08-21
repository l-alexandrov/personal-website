import type { GatsbyConfig, PluginRef } from "gatsby";
import "dotenv/config";

const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE;

const config: GatsbyConfig = {
  siteMetadata: {
    // You can overwrite values here that are used for the SEO component
    // You can also add new values here to query them like usual
    // See all options: https://github.com/LekoArts/gatsby-themes/blob/main/themes/gatsby-theme-cara/gatsby-config.mjs
    siteTitle: `Lyuboslav Alexandrov`,
    siteTitleAlt: `Lyuboslav Alexandrov | Back-End Developer`,
    siteHeadline: `Lyuboslav Alexandrov - Back-End developer, Laravel and PHP expert`,
    siteUrl: `https://lyuboo.com`,
    siteDescription: `Lyuboslav Alexandrov is a back-end developer specializing in Laravel and PHP, with experience in CI/CD, WebSockets, and project management. Located in Ruse, Bulgaria.`,
    siteImage: `/ogImage.jpg`,
    siteLanguage: `en`,
    author: `@l_alexandroff`,
  },
  trailingSlash: `always`,
  plugins: [
    {
      resolve: `@lekoarts/gatsby-theme-cara`,
      // See the theme's README for all available options
      options: {},
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Lyuboslav Alexandrov | Back-End Developer`,
        short_name: `Lyuboslav Alexandrov`,
        description: `Lyuboslav Alexandrov is a back-end developer specializing in Laravel and PHP, with experience in CI/CD, WebSockets, and project management. Located in Ruse, Bulgaria.`,
        start_url: `/`,
        background_color: `#141821`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#f6ad55`,
        display: `standalone`,
        icons: [
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/android-chrome-384x384.png",
            sizes: "384x384",
            type: "image/png",
          },
        ],
      },
    },
    // You can remove this plugin if you don't need it
    shouldAnalyseBundle && {
      resolve: `gatsby-plugin-webpack-statoscope`,
      options: {
        saveReportTo: `${__dirname}/public/.statoscope/_bundle.html`,
        saveStatsTo: `${__dirname}/public/.statoscope/_stats.json`,
        open: false,
      },
    },
    `gatsby-plugin-perf-budgets`,
    `gatsby-plugin-webpack-bundle-analyser-v2`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ["G-2XYKVWN08T"],
        pluginConfig: {
          head: true,
        },
      },
    },
    `gatsby-plugin-sitemap`, // Implement blog posts crawling using https://www.gatsbyjs.com/plugins/gatsby-plugin-sitemap#example
  ].filter(Boolean) as Array<PluginRef>,
};

export default config;
