# Hwayeon Kim — Personal Academic Site

Personal academic portfolio + blog for Hwayeon Kim (김화연), built with Astro and Tailwind CSS, designed for static deployment to GitHub Pages.

Layout follows the sidebar structure of [heesoojang.com](https://www.heesoojang.com/) with the minimal, artistic aesthetic of [anthropologistminlee.com](https://anthropologistminlee.com/).

## Tech stack

- **Astro 6** with TypeScript (static output)
- **Tailwind CSS 4** (CSS-first `@theme` configuration)
- **MDX** for blog posts (markdown + components)
- **GitHub Pages** deployment via GitHub Actions

## Local development

```bash
npm install        # install dependencies
npm run dev        # start dev server at http://localhost:4321
npm run build      # build static site to ./dist/
npm run preview    # preview the production build locally
```

## Project structure

```
src/
├── components/         # Nav, Sidebar, Footer, PublicationCard, PresentationCard
├── content/blog/       # Markdown blog posts (frontmatter + content)
├── content.config.ts   # Blog post schema (Zod validation)
├── data/               # Profile, publications, presentations, navigation
├── layouts/            # BaseLayout, SidebarLayout, BlogPostLayout
├── pages/              # index.astro, research, presentations, blog/, cv
└── styles/global.css   # Tailwind v4 + @theme design tokens

public/
├── images/profile.jpg  # Profile portrait
└── files/              # CV PDF goes here
```

## Editing content

| What to edit            | Where                                                |
| ----------------------- | ---------------------------------------------------- |
| Bio, education, links   | `src/data/profile.ts`                                |
| Publications, WIP       | `src/data/publications.ts`                           |
| Talks, conferences      | `src/data/presentations.ts`                          |
| Nav menu items          | `src/data/navigation.ts`                             |
| Add a new blog post     | Create `src/content/blog/<slug>.md` with frontmatter |
| Profile photo           | Replace `public/images/profile.jpg`                  |
| CV PDF                  | Place at `public/files/cv-hwayeon-kim.pdf`           |
| Colors / fonts          | `src/styles/global.css` (`@theme` block)             |

### Blog post frontmatter

```yaml
---
title: "Post title"
description: "One-sentence summary shown on the listing page."
pubDate: 2026-05-03
updatedDate: 2026-05-10   # optional
tags: ["research", "method"]
draft: false              # set true to hide
---
```

## Deployment to GitHub Pages

The site is configured for `https://kim-hwayeon.github.io` (a GitHub **user page**, served at the root).

### 1. Create the GitHub repository

The repo name **must be exactly** `kim-hwayeon.github.io` for user-page hosting:

1. On GitHub, create a new public repo named `kim-hwayeon.github.io` (no README, no `.gitignore`, no license — leave empty).

### 2. Push the project

```bash
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/kim-hwayeon/kim-hwayeon.github.io.git
git push -u origin main
```

### 3. Enable GitHub Pages with Actions

In the repo on GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

### 4. Push to deploy

The workflow at `.github/workflows/deploy.yml` runs on every push to `main`, builds the static site, and publishes it. After the **Actions** tab shows a green check, the site is live at:

> **https://kim-hwayeon.github.io**

## Switching to a custom domain later

You can attach a custom domain (e.g. `hwayeon-kim.com`) without rebuilding or redeploying — just three steps:

1. **Update `astro.config.mjs`** — change `site` to the new domain:
   ```js
   site: 'https://hwayeon-kim.com',
   base: '/',
   ```

2. **Add `public/CNAME`** — a single-line file containing just the domain (no protocol, no trailing slash):
   ```
   hwayeon-kim.com
   ```
   (Astro will copy this to `dist/CNAME` on every build, which GitHub Pages reads to bind the domain.)

3. **DNS at your registrar**:
   - **Apex (`hwayeon-kim.com`)** — four `A` records pointing to GitHub:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - **`www` subdomain** — one `CNAME` record → `kim-hwayeon.github.io`

4. In the repo: **Settings → Pages → Custom domain** → enter `hwayeon-kim.com` → wait for the DNS check to pass → tick **Enforce HTTPS**.

Recommended registrars: **Cloudflare Registrar** (at-cost, no markup) or **Namecheap**. `.com` domains run roughly $10–15/year.

## Notes on internal links

All internal `href` and asset `src` attributes are prefixed with `import.meta.env.BASE_URL` (see `Nav.astro`, `Sidebar.astro`, etc.). With `base: '/'` this resolves to root-relative paths. If you ever migrate to a project-page repo (e.g. `username.github.io/blog`), only `astro.config.mjs` needs to change — every link will adapt automatically.
