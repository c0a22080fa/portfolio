// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// ▼ 公開先に合わせて変更してください
//   GitHub Pages（https://<user>.github.io/portfolio/）の場合:
//     site: 'https://<user>.github.io', base: '/portfolio'
//   独自ドメインや Vercel / Cloudflare Pages の場合:
//     site: 'https://example.com', base は削除
export default defineConfig({
  site: 'https://c0a22080fa.github.io',
  base: '/portfolio',
  integrations: [mdx()],
});
