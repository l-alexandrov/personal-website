# 🌐 My Personal Website

Welcome to the repository for my personal website! This site is statically generated with [Astro](https://astro.build/), a fast framework for content-driven websites that ships zero JavaScript by default. 🚀

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: Plain CSS with custom properties
- **Content**: [Markdown](https://www.markdownguide.org/) in Astro content collections
- **Hosting**: [GitHub pages](https://www.github.com/)

## 🚀 Features

- **Blazing Fast** ⚡️
- **SEO Optimized** 🔍
- **Responsive Design** 📱💻🖥️
- **Easy to Customize** ✨
- **Blog** in English and Bulgarian, with RSS feeds and [Sveltia CMS](https://github.com/sveltia/sveltia-cms) at `/admin/` 📝

## 📚 Getting Started

1. **Clone the repository**:

   ```bash
   git clone https://github.com/l-alexandrov/personal-website.git
   cd personal-website
   ```

2. **Install dependencies** (Node 24, see `.nvmrc`):

   ```bash
   nvm use
   npm install
   ```

3. **Run the development server**:

   ```bash
   npm run dev
   ```

4. **Open your browser** and visit `http://localhost:4321` to see your website in action!

5. **Building and Deployment**:

   To create a production build, run:

   ```bash
   npm run build
   ```

   This type-checks the project and writes the site to `dist/`. Preview it with `npm run preview`. Pushing to `master` deploys it to GitHub Pages.

6. **Writing posts**:

   Add Markdown files to `src/content/blog/en/` or `src/content/blog/bg/`, or use the CMS at `/admin/` (sign in with a GitHub personal access token). Posts with `draft: true` show only in the development server.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/l-alexandrov/personal-website/issues) if you want to contribute.

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for more details.

## 🙏 Acknowledgements

- Thanks to the [Astro](https://github.com/withastro/astro) team for the awesome framework
- [LekoArts](https://github.com/LekoArts), whose Cara theme powered the earlier Gatsby version of this site
- Shoutout to the creators of the plugins and dependencies used in this project

## Made with ❤️ by Lyuboslav Alexandrov
