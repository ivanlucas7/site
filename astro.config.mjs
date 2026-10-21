// @ts-check
import { defineConfig } from 'astro/config';

// Endereço público do site. Ajuste SITE e BASE se publicar em outro domínio
// (por exemplo, um domínio próprio usaria base: '/').
const SITE = process.env.SITE_URL ?? 'https://ivanlucas7.github.io';
const BASE = process.env.BASE_PATH ?? '/site';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'always',
  build: { format: 'directory' },
});
