import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://danminshew.com',
  integrations: [mdx(), sitemap()],
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 4321,
  },
});
