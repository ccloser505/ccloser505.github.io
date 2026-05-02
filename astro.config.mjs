// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
// Deploying to user page: https://ccloser505.github.io
// (repo name must be exactly "ccloser505.github.io")
export default defineConfig({
  site: 'https://ccloser505.github.io',
  base: '/',
  output: 'static',
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
