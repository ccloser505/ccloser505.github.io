# Paper PDFs

Drop full-text PDFs of papers here. Then reference them from
`src/data/publications.ts` via the `pdf` field:

```ts
{
  slug: 'childcare-arrangement-trends',
  // ...other fields,
  pdf: 'papers/childcare-trends.pdf',
}
```

The download button appears automatically on the publication card
(homepage Research section) and on the publication detail page
(`/research/<slug>/`) only when `pdf` is set.

Naming convention: keep the filename close to the slug for clarity, e.g.
`<slug>.pdf` or `<slug>-preprint.pdf`.

Files in this folder are served as static assets at
`https://kim-hwayeon.github.io/papers/<filename>`.
