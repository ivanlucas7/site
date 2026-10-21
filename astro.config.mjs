// @ts-check
import { defineConfig } from 'astro/config';

// O mesmo código publica no GitHub Pages (em /site/) e na Vercel (na raiz).
// A Vercel define a variável VERCEL durante a compilação.
// Para outro endereço, defina SITE_URL e BASE_PATH na compilação.
const naVercel = Boolean(process.env.VERCEL);
const dominioVercel = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;

const SITE =
  process.env.SITE_URL ?? (naVercel && dominioVercel ? `https://${dominioVercel}` : 'https://ivanlucas7.github.io');
const BASE = process.env.BASE_PATH ?? (naVercel ? '/' : '/site');

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'always',
  build: { format: 'directory' },
});
