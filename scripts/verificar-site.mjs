// Verifica o site gerado em dist/: links internos, arquivos de download
// e requisitos básicos de SEO e acessibilidade em cada página.
// Uso: npm test (gera o site e executa esta verificação).
import { readFile, readdir, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;
const BASE = (process.env.BASE_PATH ?? (process.env.VERCEL ? '/' : '/site')).replace(/\/$/, '');
const PAGINAS_ESPERADAS = ['index.html', 'materiais/index.html', 'materiais/app-inventor/index.html', 'materiais/tinyml/index.html', '404.html'];

const erros = [];

async function listarHtml(dir) {
  const saida = [];
  for (const item of await readdir(dir, { withFileTypes: true })) {
    const caminho = join(dir, item.name);
    if (item.isDirectory()) saida.push(...(await listarHtml(caminho)));
    else if (item.name.endsWith('.html')) saida.push(caminho);
  }
  return saida;
}

async function existe(caminho) {
  try {
    return await stat(caminho);
  } catch {
    return null;
  }
}

async function resolverInterno(href) {
  const semAncora = decodeURI(href.split('#')[0].split('?')[0]);
  if (!semAncora.startsWith(`${BASE}/`) && semAncora !== BASE) return { fora: true };
  let alvo = join(DIST, semAncora.slice(BASE.length));
  const info = await existe(alvo);
  if (info?.isDirectory()) alvo = join(alvo, 'index.html');
  return { ok: Boolean(await existe(alvo)) };
}

for (const pagina of PAGINAS_ESPERADAS) {
  if (!(await existe(join(DIST, pagina)))) erros.push(`Página esperada não gerada: ${pagina}`);
}

const paginas = await listarHtml(DIST);
let totalLinks = 0;
for (const arquivo of paginas) {
  const nome = relative(DIST, arquivo);
  const html = await readFile(arquivo, 'utf8');

  if (!/<html lang="pt-BR"/.test(html)) erros.push(`${nome}: falta lang="pt-BR"`);
  if (!/<title>[^<]+<\/title>/.test(html)) erros.push(`${nome}: falta <title>`);
  if (!/<meta name="description" content="[^"]+"/.test(html)) erros.push(`${nome}: falta meta description`);
  if (!/<meta name="viewport"/.test(html)) erros.push(`${nome}: falta meta viewport`);
  const h1 = (html.match(/<h1[\s>]/g) ?? []).length;
  if (h1 !== 1) erros.push(`${nome}: deveria ter exatamente um <h1> (tem ${h1})`);

  for (const [, href] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|#|data:)/.test(href)) continue;
    totalLinks++;
    if (!href.startsWith('/')) {
      erros.push(`${nome}: link relativo inesperado "${href}"`);
      continue;
    }
    const r = await resolverInterno(href);
    if (r.fora) erros.push(`${nome}: link fora do caminho base "${href}"`);
    else if (!r.ok) erros.push(`${nome}: link quebrado "${href}"`);
  }

  for (const [, ancora] of html.matchAll(/href="#([^"]+)"/g)) {
    if (!html.includes(`id="${ancora}"`)) erros.push(`${nome}: âncora inexistente "#${ancora}"`);
  }
}

if (erros.length) {
  console.error(`✗ ${erros.length} problema(s) encontrado(s):`);
  for (const e of erros) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`✓ ${paginas.length} páginas verificadas, ${totalLinks} links internos válidos.`);
