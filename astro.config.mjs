// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
// Deploying to user page: https://kim-hwayeon.github.io
// (repo name must be exactly "kim-hwayeon.github.io")
export default defineConfig({
  site: 'https://kim-hwayeon.github.io',
  base: '/',
  output: 'static',
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
