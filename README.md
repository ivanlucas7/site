# Portal de Materiais Didáticos — Prof. Ivan Lucas Arantes

Portal pessoal de materiais didáticos e projetos do professor Ivan Lucas Arantes, do IFSP Campus São José dos Campos.
Reúne apostilas, apresentações, códigos, vídeos, arquivos para download e links sobre automação, computação,
sistemas embarcados, IoT e inteligência artificial aplicada.

**Site publicado:** https://ivanlucas7.github.io/site/

## Objetivo

Oferecer a estudantes, professores e interessados em tecnologia uma biblioteca digital organizada, de fácil navegação
e preparada para crescer. Nesta primeira etapa o portal tem a página inicial, o catálogo de **Materiais** e as páginas
de dois minicursos da SNCT:

- Desenvolvimento de Aplicativos com MIT App Inventor
- TinyML: Machine Learning para Sistemas Embarcados

## Tecnologias

- [Astro](https://astro.build) 5: gerador de sites estáticos. O site final é HTML e CSS puro, com um pequeno script
  apenas para a busca.
- Coleções de conteúdo do Astro: os materiais ficam em arquivos Markdown separados da interface e são validados
  automaticamente na compilação.
- GitHub Actions e GitHub Pages para testar e publicar a cada envio para a branch `main`.

Não há banco de dados, backend, autenticação nem bibliotecas de interface. A única dependência é o Astro.

## Estrutura de diretórios

```
.
├── .github/workflows/publicar.yml   # Teste e publicação automáticos no GitHub Pages
├── public/
│   ├── arquivos/                    # Arquivos para download (PDF, PPTX, ZIP...), uma pasta por material
│   │   ├── app-inventor/
│   │   └── tinyml/
│   └── favicon.svg
├── scripts/verificar-site.mjs       # Testes do site gerado (links, arquivos, SEO, acessibilidade)
├── src/
│   ├── content/minicursos/          # UM ARQUIVO .md POR MINICURSO (é aqui que o conteúdo é cadastrado)
│   ├── content.config.ts            # Campos aceitos em cada material
│   ├── components/                  # Cabeçalho, rodapé, cartão e lista de recursos
│   ├── data/site.ts                 # Textos globais, seções do menu e grupos de recursos
│   ├── layouts/Base.astro           # Estrutura comum das páginas (SEO, cabeçalho, rodapé)
│   ├── pages/                       # Rotas: /, /materiais/, /materiais/<nome>/ e 404
│   └── styles/global.css            # Cores, tipografia e estilos gerais
├── astro.config.mjs                 # Endereço do site e caminho base
└── package.json
```

## Instalação e execução

Requer [Node.js](https://nodejs.org) 18.20 ou superior (recomendado: 22).

```bash
git clone https://github.com/ivanlucas7/site.git
cd site
npm install
npm run dev        # servidor local em http://localhost:4321/site/
```

Outros comandos:

| Comando           | O que faz                                                |
| ----------------- | -------------------------------------------------------- |
| `npm run build`   | Gera o site estático na pasta `dist/`                    |
| `npm run preview` | Serve a pasta `dist/` localmente para conferência        |
| `npm test`        | Gera o site e executa as verificações automáticas        |

## Testes

`npm test` compila o site (o que também valida os dados de todos os materiais) e executa
`scripts/verificar-site.mjs`, que confere:

- se todas as páginas esperadas foram geradas;
- se todos os links internos e arquivos para download existem;
- se as âncoras usadas no índice das páginas existem;
- se cada página tem `lang="pt-BR"`, título, meta description, viewport e exatamente um `<h1>`.

O mesmo teste roda no GitHub Actions antes de cada publicação. Se falhar, o site publicado não é alterado.

## Como adicionar materiais

### Adicionar um arquivo a um minicurso existente

1. Copie o arquivo para a pasta do minicurso em `public/arquivos/`, por exemplo
   `public/arquivos/tinyml/exemplo-classificador.zip`. Prefira nomes sem espaços e sem acentos.
2. Abra o arquivo do minicurso em `src/content/minicursos/` (por exemplo `tinyml.md`) e acrescente um item em
   `recursos`:

```yaml
  - tipo: codigo
    titulo: "Exemplo de classificador de gestos"
    descricao: "Código para Arduino com o modelo treinado."
    arquivo: "tinyml/exemplo-classificador.zip"
    formato: "ZIP · 120 KB"
```

3. Atualize o campo `atualizado` com a data do dia.

Para um vídeo ou link externo, use `url` no lugar de `arquivo`:

```yaml
  - tipo: video
    titulo: "Gravação do minicurso"
    url: "https://www.youtube.com/watch?v=..."
```

Tipos aceitos e a seção em que aparecem:

| Tipo                                            | Seção da página |
| ----------------------------------------------- | --------------- |
| `apostila`, `apresentacao`, `tutorial`, `exemplo` | Materiais       |
| `arquivo`, `modelo`                             | Downloads       |
| `codigo`                                        | Códigos         |
| `video`                                         | Vídeos          |
| `link`                                          | Links externos  |

Seções sem itens exibem automaticamente a mensagem “Os materiais desta seção serão adicionados posteriormente”.

### Adicionar um novo minicurso

Crie um arquivo em `src/content/minicursos/`, por exemplo `iot-esp32.md`. O nome do arquivo vira o endereço da
página (`/materiais/iot-esp32/`). Ele aparece sozinho no catálogo e, com `destaque: true`, na página inicial.

```markdown
---
titulo: "Internet das Coisas com ESP32"
subtitulo: "Minicurso"
resumo: "Frase curta exibida no cartão do catálogo."
tags: ["IoT", "ESP32"]
destaque: false
ordem: 3
atualizado: 2026-11-10
recursos: []
---

Descrição do minicurso, exibida no topo da página.
```

Se algum campo obrigatório estiver faltando ou errado, `npm run build` informa o problema.

### Novas seções (Disciplinas, Projetos, Cursos, Tutoriais)

As seções futuras já estão listadas em `src/data/site.ts` e aparecem como “Em breve” na página inicial. Para ativar
uma delas: crie a coleção em `src/content.config.ts`, as páginas em `src/pages/<secao>/` (os arquivos de
`src/pages/materiais/` servem de modelo) e marque `disponivel: true` em `site.ts` para que ela entre no menu.

## Atualizar o GitHub

```bash
npm test                         # confira se está tudo certo
git add .
git commit -m "Adiciona exemplo de classificador ao minicurso de TinyML"
git push origin main
```

Também é possível enviar arquivos e editar os `.md` diretamente pela interface web do GitHub
(botão **Add file** ou ícone de lápis). Em ambos os casos, a publicação é automática.

## Publicação

A cada envio para `main`, o workflow `.github/workflows/publicar.yml` instala as dependências, executa os testes,
gera o site e publica o resultado na branch `gh-pages`. O GitHub Pages serve essa branch em
https://ivanlucas7.github.io/site/. O andamento aparece na aba **Actions** do repositório.

Configuração do Pages (feita uma única vez): **Settings → Pages → Build and deployment → Source: Deploy from a
branch**, branch `gh-pages`, pasta `/ (root)`.

Para usar outro endereço (por exemplo, um domínio próprio), ajuste `site` e `base` em `astro.config.mjs` ou defina
as variáveis de ambiente `SITE_URL` e `BASE_PATH` na compilação.

## Arquivos publicados

- `public/arquivos/app-inventor/apostila-app-inventor.pdf`: apostila de MIT App Inventor (95 páginas).
- `public/arquivos/app-inventor/aula-app-inventor-240min.pptx`: apresentação da aula de 4 horas.
- `public/arquivos/tinyml/aula-tinyml.pptx`: apresentação da aula de TinyML.
