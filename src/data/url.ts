/** Monta um endereço interno respeitando o caminho base do site (GitHub Pages). */
export function url(caminho = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${caminho.replace(/^\//, '')}`;
}

/** Endereço público de um arquivo em public/arquivos/. */
export function arquivo(caminho: string): string {
  return url(`arquivos/${caminho.replace(/^\//, '')}`);
}
