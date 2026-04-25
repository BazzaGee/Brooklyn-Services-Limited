import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';

export default defineConfig({
  site: 'https://brooklynservices.co.nz',
  output: 'static',
  integrations: [
    tailwind({
      configFile: './tailwind.config.mjs',
    }),
    // sitemap temporarily disabled due to build issue
    // sitemap({
    //   changefreq: 'weekly',
    //   priority: 0.7,
    //   lastmod: new Date(),
    // }),
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),
  ],
  vite: {
    build: {
      minify: true,
    },
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
