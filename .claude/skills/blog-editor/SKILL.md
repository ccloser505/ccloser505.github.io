---
name: blog-editor
description: Project-specific rules for editing this Astro academic blog (Hwayeon Kim's site). Use this skill whenever working in this repository — adding or revising blog posts, updating CV/publications/presentations data, changing colors/fonts/layout, troubleshooting builds, deploying, or refactoring components. The blog uses Astro 6 + Tailwind CSS v4 + GitHub Pages with specific conventions for data files, BASE_URL handling, and content collections that must be respected to avoid breaking the build or deployed site.
---

# Blog Editing — Project Rules

This is Hwayeon Kim's (김화연) personal academic site. It's a static-output Astro project deployed to GitHub Pages at `https://ccloser505.github.io`. The conventions below exist because this project has been carefully tuned — deviating without reason will either break the build, break the deployed paths, or undermine the design coherence.

Communicate with the user in **Korean** (그 사용자는 한국어 사용자임). Code, comments, and identifiers stay in English.

---

## 1. Stack constraints (do not change without strong reason)

| Tool | Version | Why it matters |
| --- | --- | --- |
| Astro | 6.x | Content collections use `glob` loader from `astro/loaders`, NOT the legacy `src/content/` magic dir. |
| Tailwind CSS | 4.x | CSS-first via `@theme {}` in `src/styles/global.css`. **Never** add a `tailwind.config.js` or use v3 directives like `@tailwind base`. |
| `@tailwindcss/vite` | 4.x | Tailwind plugin lives in `astro.config.mjs` `vite.plugins`, NOT in `integrations`. The `@astrojs/tailwind` package is v3-only — don't install it. |
| Node | ≥22.12 | Pinned to `22` in `.github/workflows/deploy.yml`. Astro 6 will not run on Node 20. |
| Output | `static` | `output: 'static'` in `astro.config.mjs`. Don't switch to SSR — GitHub Pages can't host it. |

Run `npm run build` locally before pushing — catches type errors, content schema violations, and broken image refs.

---

## 2. Where content lives

Editing the right file matters. The site reads from `src/data/*.ts` and `src/content/blog/`, **never** inline in components/pages. If you find yourself hardcoding profile or publication info into an `.astro` file, stop and put it in the data file.

| What to change | File to edit |
| --- | --- |
| Bio paragraphs, title, affiliation, email, research interests, skills | `src/data/profile.ts` |
| Peer-reviewed papers, research reports, works in progress | `src/data/publications.ts` |
| Invited talks, conference presentations | `src/data/presentations.ts` |
| Top nav menu items | `src/data/navigation.ts` |
| New blog post | `src/content/blog/<slug>.md` (or `.mdx`) |
| CV PDF | `public/files/cv-hwayeon-kim.pdf` (overwrite the file) |
| Profile image | `public/images/profile.jpg` (overwrite the file) |
| Color tokens | `src/styles/global.css` `@theme {}` block |
| Fonts | `src/styles/global.css` top-of-file `@import url(...)` line |
| Site URL / base | `astro.config.mjs` (`site` and `base`) |

The data files are typed with `as const` and explicit interfaces — TypeScript will catch shape errors at build time. When adding a new publication, copy an existing entry's structure rather than improvising.

---

## 3. Blog post frontmatter (Zod-validated)

Schema is defined in `src/content.config.ts`. The build will fail loudly if a post is malformed.

```yaml
---
title: "Required string"
description: "Required string — shown on the listing page"
pubDate: 2026-05-10        # required, parsed as a date
updatedDate: 2026-05-15    # optional
tags: ["research", "method"] # optional, defaults to []
draft: false               # optional, defaults to false; true hides the post
---
```

- `pubDate` accepts `2026-05-10` (no quotes), `"2026-05-10"`, or any other ISO-parseable form via `z.coerce.date()`.
- `tags` must always be a list, even with one tag.
- File slug = filename without extension. `welcome.md` → `/blog/welcome/`.

When adding a post:
1. Pick a slug that's URL-safe and stable (no spaces, lowercase, hyphens). It's part of the permanent URL.
2. Add the file, write content, run `npm run dev`, navigate to `/blog/<slug>/` and skim the rendering before committing.
3. Posts auto-appear in `/blog/` listing sorted by `pubDate` descending. The sitemap regenerates on next build, so Google can find new posts within ~1–2 build cycles.

---

## 4. Path & URL conventions

The site is deployed at the root of `ccloser505.github.io` (GitHub user page), so `base: '/'`. **However**, code uses `import.meta.env.BASE_URL` everywhere — this is critical for two reasons:

1. **Future-proofing**: If the site ever moves to a project page (`username.github.io/something`) or a custom domain with a base path, only `astro.config.mjs` needs to change. All links adapt automatically.
2. **Consistency**: Mixing `/blog/` and `${baseUrl}blog/` would produce mysterious bugs only on certain deployments.

### Rules

- For any internal link in a component/page: `${baseUrl}blog/` (note: no leading slash on the appended path because `baseUrl` already ends with `/`).
- For any asset reference (`<img src>`, `<link rel="icon" href>`, file downloads): same pattern.
- For sitemap/canonical/OG image URLs in `BaseLayout.astro`: use `Astro.site` or `siteOrigin`, which is already wired up.
- **Never hardcode** `/blog/`, `/images/profile.jpg`, etc., as `href` or `src` values.

The `BaseLayout.astro` already constructs canonical and OG URLs correctly. Don't bypass it by inlining `<head>` tags in pages — extend `BaseLayout` (or `SidebarLayout` / `BlogPostLayout`) instead.

---

## 5. Design system

The aesthetic is intentional: minimal, scholarly, lots of whitespace, low-contrast accents. Inspired by `anthropologistminlee.com` (typography + spacing) wrapped around `heesoojang.com`'s sidebar structure.

### Color tokens (`src/styles/global.css` `@theme`)

Use the named tokens via Tailwind's bracket syntax (`bg-[var(--color-bg)]`) or via the auto-generated utility classes (`bg-bg`, `text-text-secondary`, etc.). **Don't** introduce hex literals in components — if you need a new shade, add a new token to `@theme {}` first.

| Token | Use for |
| --- | --- |
| `--color-bg` | Page background |
| `--color-bg-sidebar` | Sidebar (slightly warmer) |
| `--color-text` | Primary text |
| `--color-text-secondary` | Body paragraphs (slightly lighter) |
| `--color-text-muted` | Captions, metadata, dates |
| `--color-border` | Hairline dividers |

### Typography

- Headings: `font-serif` → EB Garamond
- Body / UI: default → Inter
- Section labels (small uppercase): `.section-label` class — use this rather than reinventing.

### Layout primitives

- Top nav: fixed, 56px tall, `bg-bg/90 backdrop-blur-sm`. Already in `Nav.astro`.
- Sidebar: `lg:sticky lg:top-14 lg:self-start lg:w-[320px]` — sticks to top on desktop, flows above content on mobile. **Do not** reintroduce `lg:fixed` with `max-h` + `overflow-y-auto` — this caused content to be invisible past the viewport.
- Main content: max-width `max-w-3xl`, padding `px-8 lg:px-16 py-12 lg:py-16`.
- Card patterns: see `PublicationCard.astro` and `PresentationCard.astro`. Reuse these. Don't reinvent for a new section — instead, generalize the card component.

---

## 6. Component & file structure

```
src/
├── layouts/
│   ├── BaseLayout.astro       # html/head/body shell — owns ALL meta tags, JSON-LD, sitemap link
│   ├── SidebarLayout.astro    # nav + sticky sidebar + main slot
│   └── BlogPostLayout.astro   # nav + centered article (no sidebar) for reading focus
├── components/
│   ├── Nav.astro              # top bar + mobile hamburger
│   ├── Sidebar.astro          # profile card (image, name, title, research, methods, contact)
│   ├── Footer.astro
│   ├── PublicationCard.astro
│   └── PresentationCard.astro
└── pages/
    ├── index.astro            # About (Home)
    ├── research.astro
    ├── presentations.astro
    ├── cv.astro
    └── blog/
        ├── index.astro        # listing
        └── [...slug].astro    # dynamic post route
```

### Decision rules

- **Adding a new top-level page** (e.g., `/teaching/`): create `src/pages/teaching.astro`, wrap with `<SidebarLayout>`, add to `src/data/navigation.ts`.
- **New section that's part of the About page**: extend `src/data/profile.ts` and `src/pages/index.astro` — don't proliferate one-off files.
- **New card type** (e.g., a "Course" card): copy `PublicationCard.astro` as the starting point. Match its visual rhythm (border-bottom dividers, section-label headers).
- **Reusable bit of UI used in 2+ places**: extract to `src/components/`. Used once: keep inline.

---

## 7. SEO is wired up — don't fight it

`BaseLayout.astro` automatically emits, on every page:
- `<title>`, `<meta description>`, canonical link
- OpenGraph (6 tags) + Twitter Card (4 tags)
- `<link rel="sitemap">` to `/sitemap-index.xml`
- Inline JSON-LD `Person` schema with name, Korean name, affiliation, knowsAbout, alumniOf

Sitemap auto-regenerates on every build via `@astrojs/sitemap`. Adding a new page → automatically in sitemap.

When creating a new page, you can pass these props to `BaseLayout` (via `SidebarLayout` etc.):

```astro
<SidebarLayout
  title="Teaching"
  description="Custom description for this page only"
  ogImage="/images/teaching-og.png"  // optional, defaults to profile.jpg
/>
```

Don't add `<meta>` tags manually inside pages — they'll duplicate or conflict with `BaseLayout`'s.

---

## 8. Deployment workflow

```bash
# normal cycle
npm run dev                 # local check
git add .
git commit -m "..."         # see commit conventions below
git push                    # main branch → triggers .github/workflows/deploy.yml
gh run watch                # optional: watch the deploy live
```

### Commit message conventions

Use conventional-commit prefixes — they read well in `git log`:

| Prefix | Use |
| --- | --- |
| `blog:` | Adding/editing a blog post |
| `feat:` | New page, new component, new feature |
| `fix:` | Bug fix |
| `style:` | Visual changes only (color, spacing, typography) |
| `docs:` | README, DEPLOYMENT.md, this skill |
| `ci:` | Workflow/build config changes |
| `cv:` | Updating CV PDF or CV data |
| `chore:` | Dependency bumps, gitignore tweaks |

Keep subject under 70 chars. Body is optional — explain *why*, not *what*.

### When the deploy fails

1. `gh run list --limit 3` to see the latest run status
2. `gh run view <id> --log-failed` for the error
3. Common failures:
   - **Node version**: `withastro/action` step needs `node-version: 22` (already set, don't remove)
   - **Content schema**: a blog post's frontmatter is malformed → check `src/content.config.ts` schema
   - **Broken import**: a TS file references a missing export → run `npm run build` locally to see the same error

---

## 9. Switching to a custom domain (when the user buys one)

The migration is non-disruptive. Three changes:

1. `astro.config.mjs`: change `site: 'https://hwayeon-kim.com'` (or whatever the new domain is)
2. Create `public/CNAME` containing **only** the bare domain (no protocol, no slash). Astro copies it to `dist/CNAME` and GitHub Pages binds it.
3. DNS at registrar:
   - Apex: 4 A records to `185.199.108.153`, `.109.153`, `.110.153`, `.111.153`
   - `www`: CNAME → `ccloser505.github.io`
4. GitHub repo Settings → Pages → Custom domain → enter the domain, wait for DNS check, tick "Enforce HTTPS".

GitHub will 301-redirect `ccloser505.github.io` to the new domain automatically — SEO is preserved.

---

## 10. Things to never do (and why)

- **Hardcode internal paths** (`/blog/`, `/images/...`). Will break on any base-path change. Always `${import.meta.env.BASE_URL}...`.
- **Add Tailwind config file** (`tailwind.config.js`). v4 uses CSS-first config. Adding a JS config will cause silent style mismatches.
- **Use `@astrojs/tailwind` integration**. v3-only. We use `@tailwindcss/vite` instead.
- **Inline content data into `.astro` files**. Breaks the data → presentation separation; future edits will scatter across many files.
- **Skip blog post frontmatter or use the wrong shape**. Build will fail. Refer to schema in `src/content.config.ts`.
- **Make the sidebar `lg:fixed` again with internal scroll**. We already debugged this — content past viewport becomes invisible. `lg:sticky` is intentional.
- **Add `<meta>` tags inside individual pages**. `BaseLayout` already handles SEO; duplication breaks canonical/OG semantics.
- **Commit `node_modules/`, `dist/`, `.astro/`, `.claude/`, `.omc/`, `.cwf/`**. All gitignored. If `git status` shows any of them, fix the `.gitignore` rather than committing.
- **Push without a local `npm run build`** for non-trivial changes. The deploy will fail and waste cycles.
- **Bypass the data files and edit text directly in components**. Breaks the convention; future edits will be hard to locate.

---

## 11. Things to do reflexively

- Update `DEPLOYMENT.md` if you make any operational/structural change worth documenting (new page type, new dependency, new convention).
- When adding a new field to `profile.ts` / `publications.ts` / etc., update the matching `interface` or `as const` typing first, then the data, then the consumer component.
- When the user reports a deploy issue, first run `gh run view <latest-id> --log-failed` — don't guess.
- Korean responses for user-facing text in conversation. English in code.
- For UI changes, take a quick screenshot via the dev server before claiming "looks good." The conversation history shows several iterations where this caught regressions.

---

## 12. Quick command reference

```bash
# Dev
npm run dev                                    # localhost:4321
npm run build                                  # produces dist/
npm run preview                                # serves dist/ for preview

# Git / deploy
git status                                     # before any commit
git commit -m "<prefix>: <subject>"            # see prefix table
git push                                       # auto-deploys

# GitHub
gh run list --limit 5                          # recent workflows
gh run watch                                   # live tail of in-progress run
gh run view <id> --log-failed                  # debug failed deploy
gh api repos/ccloser505/ccloser505.github.io/pages   # Pages config

# Sanity checks
/usr/bin/curl -s -o /dev/null -w "%{http_code}" https://ccloser505.github.io/   # is it live?
```

---

## Reference: see also

- `README.md` — quick start (stack, structure, setup)
- `DEPLOYMENT.md` — runbook (URL, daily ops, SEO, troubleshooting, custom domain, future ideas)
- `.github/workflows/deploy.yml` — CI/CD definition
- `astro.config.mjs` — site / base / integrations
- `src/content.config.ts` — blog frontmatter schema
- `src/styles/global.css` — design tokens
