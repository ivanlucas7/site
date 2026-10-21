/** Informações gerais do portal. Edite aqui para alterar textos globais. */
export const SITE = {
  titulo: 'Portal de Materiais Didáticos',
  autor: 'Prof. Ivan Lucas Arantes',
  instituicao: 'IFSP Campus São José dos Campos',
  descricao:
    'Materiais didáticos e projetos do professor Ivan Lucas Arantes, do IFSP Campus São José dos Campos: automação, computação, sistemas embarcados e inteligência artificial.',
};

/**
 * Seções do portal. Marque `disponivel: true` e crie a página correspondente
 * para que a seção apareça no menu.
 */
export const SECOES = [
  { titulo: 'Materiais', href: 'materiais/', disponivel: true, descricao: 'Minicursos, apostilas, apresentações e arquivos.' },
  { titulo: 'Disciplinas', href: 'disciplinas/', disponivel: false, descricao: 'Conteúdos organizados por disciplina.' },
  { titulo: 'Projetos', href: 'projetos/', disponivel: false, descricao: 'Projetos de ensino, pesquisa e extensão.' },
  { titulo: 'Cursos', href: 'cursos/', disponivel: false, descricao: 'Cursos e minicursos completos.' },
  { titulo: 'Tutoriais', href: 'tutoriais/', disponivel: false, descricao: 'Guias práticos passo a passo.' },
];

/** Rótulos e agrupamento dos tipos de recurso nas páginas de material. */
export const GRUPOS_RECURSO = [
  { id: 'materiais', titulo: 'Materiais', tipos: ['apostila', 'apresentacao', 'tutorial', 'exemplo'] },
  { id: 'downloads', titulo: 'Downloads', tipos: ['arquivo', 'modelo'] },
  { id: 'codigos', titulo: 'Códigos', tipos: ['codigo'] },
  { id: 'videos', titulo: 'Vídeos', tipos: ['video'] },
  { id: 'links', titulo: 'Links externos', tipos: ['link'] },
] as const;

export const ROTULO_TIPO: Record<string, string> = {
  apostila: 'Apostila',
  apresentacao: 'Apresentação',
  tutorial: 'Tutorial',
  exemplo: 'Exemplo',
  arquivo: 'Arquivo',
  codigo: 'Código',
  modelo: 'Modelo de ML',
  video: 'Vídeo',
  link: 'Link',
};
