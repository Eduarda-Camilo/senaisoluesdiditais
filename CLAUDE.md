@AGENTS.md

# SENAI Soluções Digitais — Redesign do site

Memória técnica e estratégica do projeto. Documento objetivo do estado atual, não histórico da conversa.
Idioma: PT-BR. Código em inglês quando for o padrão da tecnologia.

## Contexto

- **Desafio:** redesenhar o site institucional (https://senaisolucoesdigitais.com.br) usando IA como principal ferramenta. Entrega: site real, responsivo, hospedado, apresentado a uma banca (10 min). Critérios com peso igual: Design/UX, Apresentação, Proposta de valor, Uso de IA, Funcionalidade.
- **Prazo:** código commitado até **quinta 24/09/2026, 18h**. Deploy na Vercel antes da apresentação.
- **Quem é a SSD:** área do SENAI-SC e braço tecnológico da FIESC. Desenvolve tecnologia, software, IA e plataformas educacionais para os negócios e a gestão do SESI e do SENAI. Desde 2007. Parceiro AWS (APN Select Tier Services).
- **Públicos:** visitante, cliente potencial, parceiro, candidato. Uma arquitetura única atende os quatro; ver "Conteúdo".
- **Restrições obrigatórias:** logo, cores e tipografia da marca; seções Hero, Portfólio, Serviços, Sobre, Contato, Trabalhe Conosco; responsivo; funcional; hospedado.
- **Regra inviolável:** não inventar métricas, clientes, resultados, depoimentos, funcionalidades, datas ou parceiros. Lacunas viram placeholders identificados `[... pendente]`.

## Fontes de verdade (ordem)

1. Briefing do desafio → 2. respostas da equipe (Duda e Lucas) → 3. materiais oficiais em `../Páginas dos projetos - produtos` (16 `conteudo-textual-da-revista.md`) e manual de marca em `../Slides logo SD` → 4. site atual → 5. este arquivo → 6. referências em `../Referências visuais` (só repertório).

## Arquitetura

**Stack:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4 · Motion 13 · Base UI (`@base-ui/react`, headless) · `next/font/google` (Syne + Space Grotesk, self-hosted no build).

**Estrutura**
```
src/app/            rotas: / · /cases · /cases/[slug] · sitemap.ts · robots.ts
src/content/        conteúdo como dados tipados: types.ts · cases.ts (20) · capabilities.ts (6) · site.ts
src/components/
  ui/               Typography (TagMark, Stat) · Button · Reveal · Counter
  layout/           Nav (Base UI Dialog no mobile) · Footer · Section
  home/             Hero · FeaturedCases · Capabilities(+Section) · About · Careers · Contact
  cases/            CasesExplorer (filtros com Base UI ToggleGroup) · CapabilityChips · StatusLabel
public/brand/       logos SVG oficiais (pasta "Logo SENAI Soluções Digitais")
public/cases/<slug>/ cover + galeria + logo por case
scripts/copy-assets.sh  seleção reproduzível de assets a partir dos materiais
```

**Rotas e redirects:** `/aws`, `/aws.html` → `/#cap-cloud`; `/portfolio.html` → `/cases`; `/index.html` → `/`.

**Decisões técnicas**
- Conteúdo em `src/content/*.ts` — páginas nascem dos dados; adicionar case = editar um arquivo.
- `Reveal`/`Counter` usam `rootMargin` superior enorme: elementos já ultrapassados (scroll rápido, âncora) contam como visíveis — nada fica preso em opacity 0. Com `prefers-reduced-motion`, render estático.
- Imagens via `next/image` (AVIF/WebP), PNGs transparentes dos materiais. `sizes` definido em todo uso.
- Formulário de contato = `mailto:` preenchido (decisão da equipe). Pronto para trocar por API.
- Sem CMS, sem i18n, sem OG dinâmico — fora do prazo.

## Design

**Conceito: "Ficha técnica".** O site lê como um dossiê de produtos construídos, não como landing page. Índices numerados (01–20 / 01–06), hairlines, fichas com equipe/início/indicadores, mockups reais como protagonistas.

**Tokens (`src/app/globals.css`, `@theme`)**
- Cores da marca (manual 2022): Azul Fibra `#004E95`, Inteligente `#0096CC`, **Solução `#0574D9` (ação)**, **Digital `#00BCFF` (acento/foco)**, Cibernético `#2A99FF`, Futurista `#39CBFF`, Sistêmico `#6AB8FF`, Robótico `#73DAFF`, Virtual `#AAD6FF`, Conectado `#ACE9FF`. Neutros `#000 / #3E4144 / #515257 / #6E7278` + branco (adicionado). **Laranja SENAI `#E84910`** (extraído do logo SENAI) só em detalhes: marcadores `< />`, índices, ponto de status.
- Fundo `#000` (dark por decisão). Superfícies `#0B0C0E` / `#141518`. Linhas `rgba(255,255,255,.12/.24)`.
- Tipografia: **Syne** (display, 700) + **Space Grotesk** (texto/UI). Escala fluida `display-xl/lg/md/sm`, `lead`, `eyebrow`. Nota: o manual cita Bahnschrift, proprietária da Microsoft e sem licença web — decisão da equipe: Syne + Space Grotesk.
- Radius quase zero (2px). Easing `out-quart`/`out-expo`. Durações 150/300/600ms.
- Grid 12 col, container 1440, gutters 24/48.

**Padrões gráficos:** marcador `<tag />` derivado do `</>` do logo; hairline-grid no hero; listas em tabela com hairlines (nunca grids de cards com ícone); números grandes com legenda pequena.

**Movimento:** revelação sequencial no scroll, contadores de indicadores, hover de imagens (scale sutil), accordion com altura animada, menu mobile deslizante. Tudo com fallback `prefers-reduced-motion`.

**O que não existe por decisão:** glow, partículas, blobs, glassmorphism, gradientes decorativos (o gradiente fica só no logo Modelo 1), ícones decorativos, frases-slogan, fotos stock, depoimentos.

## Conteúdo

**Estrutura**
- `/` — Hero (statement + 4 números reais com fonte) → Cases (4 editoriais + índice dos 16 restantes) → Capacidades (6, accordion Problema → O que fazemos → Evidência; AWS integrada em 06 Cloud) → Sobre (missão/valores do manual + papéis derivados das equipes dos cases) → Trabalhe conosco (→ Pandapé) → Contato (form mailto + placeholders).
- `/cases` — 20 produtos com filtros por capacidade e segmento; escala visual por tier.
- `/cases/[slug]` — cabeçalho, imagem, indicadores, contexto, desafio (quando declarado), entregas, resultado (quando declarado), ficha técnica, telas, prev/next.

**Hierarquia dos cases (por conteúdo disponível):**
- Editoriais: AVA SENAI, E-commerce, SEIF, SAEP IA.
- Padrão: DEVstart, CRM+SGN, Orbie, SENAI Space, Eleva, Espaço do Estudante, Itinerários Nacionais, Habilita, Data Warehouse.
- Resumidos: Lab Digital (piloto), NR-10 (em desenvolvimento), AudioXP; e 4 do site atual sem material visual: SGN, Chatbot SGN, Hub IA, Predição de Evasão.

**Taxonomia de capacidades (única):** 01 Plataformas e sistemas · 02 IA aplicada · 03 Apps móveis · 04 Dados e analytics · 05 VR/AR/simulação · 06 Cloud e DevOps na AWS.

**Copy:** voz do manual (profissional, educativa, informativa). Sem nomes de líderes técnicos. SEIF cita "grandes empresas nacionais" sem nomear. Tribos internas não aparecem na UI.

## Decisões

| Decisão | Motivo | Alternativas |
|---|---|---|
| Híbrido: home longa + `/cases` + `/cases/[slug]` | Visitante resolve na home; cliente/parceiro aprofundam; SEO por case | Single page (sem profundidade); multipage (dilui narrativa, custa prazo) |
| Base UI como primitivos, componentes visíveis autorais | Acessibilidade pronta sem herdar estética de biblioteca ("cara de IA") | shadcn (tema reconhecível), HeroUI (v3 beta, visual imposto), Radix puro |
| Dark mode com neutros do manual | Pedido da equipe; ar tech sem genérico | — |
| Syne + Space Grotesk via `next/font/google` | Bahnschrift não é embutível; next/font self-hosta no build | fontes locais manuais (sem ganho) |
| Laranja SENAI só em detalhes | Vínculo com a marca-mãe sem competir com os azuis | — |
| AWS dentro de Capacidades (06) com redirect de `/aws` | Deixa de ser página isolada; parceria vira evidência de capacidade | Página própria; seção "parceiros" |
| Números do hero com fonte (case) | Rastreabilidade; nada agregado ou inventado | somar usuários entre sistemas (inválido) |
| "Como trabalhamos" = presença de papéis nos cases | Derivado dos dados; evita parecer headcount | somar pessoas (enganoso) |

**Figma:** https://www.figma.com/design/zDCI4bFpUmYC1fFFfcu9Yj — página "Construção do site", frame "Home — 1440" (espelho do código; variáveis e text styles locais). O código continua sendo a fonte de verdade; alterações feitas no Figma precisam ser trazidas de volta manualmente.

## Pendências

**Conteúdo**
- [ ] E-mail, telefone e endereço de contato (placeholders na UI; e-mail via `NEXT_PUBLIC_CONTACT_EMAIL`).
- [ ] Quais cases rodam em AWS (capacidade 06 sem evidências listadas).
- [ ] Indicadores para SEIF, IN, Habilita, DW (só qualitativos), Lab Digital, NR-10, AudioXP e os 4 cases do site atual.
- [ ] Confirmar hex oficial do laranja SENAI (`#E84910` extraído de PNG).
- [ ] Texto "Sobre": dimensão da equipe/tribos, se quiserem publicar.

**Assets**
- [ ] Badge oficial AWS Partner.
- [ ] Prints em alta dos cases com mockups pequenos (IN 415px, SEIF 288px, NR-10 412px, AudioXP 218px).
- [ ] Material visual para SGN, Chatbot SGN, Hub IA, Predição de Evasão.
- [ ] Favicon / OG image padrão.

**Desenvolvimento**
- [ ] Deploy Vercel + domínio.
- [ ] Revisão final de acessibilidade (teclado no accordion/filtros, contraste dos placeholders).
- [ ] Lighthouse / Core Web Vitals no build de produção.
- [ ] JSON-LD `Organization`.

## IA no processo

Registro para a apresentação — onde a IA atuou e onde a supervisão humana decidiu. Detalhes em `docs/IA-NO-PROCESSO.md`.

1. **Leitura crítica do briefing e do site atual** — IA extraiu conteúdo (inclusive o portfólio renderizado via JS), identificou links mortos, três taxonomias conflitantes, copy genérica e cores fora da marca. Humanos responderam 20 perguntas estratégicas.
2. **Descoberta do manual de marca** — IA leu 43 slides e apontou que o site atual não usava as cores oficiais; humanos decidiram logo atualizado, adição de branco e laranja SENAI, e tipografia Syne.
3. **Análise de 45 referências visuais** — IA sintetizou padrões (índices numerados, hairlines, números com legenda, acento único) e descartou o que conflitava com o briefing.
4. **Arquitetura de informação e taxonomia** — IA propôs híbrido + 6 capacidades; humanos aprovaram.
5. **Modelo de conteúdo** — IA estruturou 16 `.md` da revista + site atual em dados tipados, sem inventar nada; marcou pendências.
6. **Seleção de UI kit** — IA recomendou Base UI contra shadcn/HeroUI com justificativa; humanos escolheram.
7. **Implementação** — tokens, componentes, rotas, motion, SEO, redirects. IA verificou no browser (desktop e mobile) e corrigiu bug real de reveal em scroll rápido.
8. **Code → Figma** — IA replicou a home (1440px) no arquivo Figma "Duda e Lucas Hackathon" via Figma MCP: mediu os valores computados no site (tamanhos de fonte, larguras de coluna, alturas de seção), criou a coleção de variáveis "SSD / Cores" (16 primitivos do manual + 12 semânticos com alias), 21 text styles (Syne/Space Grotesk) e montou 8 seções em auto-layout com imagens reais enviadas por upload. Altura final 10 856px vs 10 920px no site. Componente "Accordion/Item (fechado)" com instâncias.
