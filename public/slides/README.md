# Presentation Slides

Drop slide PDFs (or PDF exports of decks) here. Reference from
`src/data/presentations.ts` via the `pdf` field:

```ts
{
  slug: 'buffalo-2026-non-marital-childbearing',
  // ...other fields,
  pdf: 'slides/buffalo-2026.pdf',
}
```

The download button appears automatically on the presentation card
(homepage Presentations section) and on the presentation detail page
(`/presentations/<slug>/`) only when `pdf` is set.

Files here are served at `https://ccloser505.github.io/slides/<filename>`.
