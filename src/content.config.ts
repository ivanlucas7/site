import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Tipos de recurso aceitos em cada material. Cada tipo aparece
 * automaticamente na seção correspondente da página do material.
 */
export const TIPOS_RECURSO = [
  'apostila',
  'apresentacao',
  'tutorial',
  'exemplo',
  'arquivo',
  'codigo',
  'modelo',
  'video',
  'link',
] as const;

const recurso = z
  .object({
    tipo: z.enum(TIPOS_RECURSO),
    titulo: z.string(),
    descricao: z.string().optional(),
    /** Caminho relativo a public/arquivos/ (ex.: "tinyml/aula.pptx"). */
    arquivo: z.string().optional(),
    /** Endereço externo (vídeo, repositório, página etc.). */
    url: z.string().url().optional(),
    formato: z.string().optional(),
  })
  .refine((r) => Boolean(r.arquivo) !== Boolean(r.url), {
    message: 'Informe exatamente um dos campos "arquivo" ou "url".',
  });

const minicursos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/minicursos' }),
  schema: z.object({
    titulo: z.string(),
    subtitulo: z.string().optional(),
    resumo: z.string(),
    evento: z.string().optional(),
    tags: z.array(z.string()).default([]),
    destaque: z.boolean().default(false),
    ordem: z.number().default(100),
    atualizado: z.coerce.date(),
    recursos: z.array(recurso).default([]),
  }),
});

export const collections = { minicursos };
