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

**Stack:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4 · Motion 13 · Base UI (`@base-ui/react`, headless) · Phosphor Icons (chrome de interface) · three + @react-three/fiber (símbolo 3D do Hero) · `next/font/google` (Syne + Space Grotesk + JetBrains Mono, self-hosted no build).

**Estrutura**
```
src/app/            rotas: / · /cases · /cases/[slug] · /vagas · sitemap.ts · robots.ts
src/content/        conteúdo como dados tipados: types.ts · cases.ts (20) · capabilities.ts (6) · scenes.ts (4) · segments.ts · site.ts · jobs.ts (vagas)
src/components/
  ui/               Typography (legado, sem uso) · Button · Reveal · Counter · icons (Phosphor)
  layout/           Nav (Base UI Dialog no mobile) · Footer · Section
  home/             Hero · LogoMark3D(+Scene) · CasesScene · GlobeTrack(+GlobeScene) · Services · About · Careers · Contact
  cases/            CasesExplorer (filtros com Base UI ToggleGroup + cards) · StatusLabel
  careers/          JobsExplorer (busca + filtro por área + cards de vaga)
public/brand/       logos SVG oficiais (pasta "Logo SENAI Soluções Digitais")
public/cases/<slug>/ cover + galeria + logo por case; card.webp e detalhe.webp (design V3) — ver abaixo
scripts/copy-assets.sh  seleção reproduzível de assets a partir dos materiais
```

**Rotas e redirects:** `/aws`, `/aws.html` → `/cases?capacidade=cloud`; `/portfolio.html` → `/cases`; `/index.html` → `/`.
`/cases` aceita `?capacidade=<slug>` e `?segmento=<slug>` (pré-filtro vindo da home) — por isso é rota dinâmica, não estática.

**Decisões técnicas**
- Conteúdo em `src/content/*.ts` — páginas nascem dos dados; adicionar case = editar um arquivo.
- `Reveal`/`Counter` usam `rootMargin` superior enorme: elementos já ultrapassados (scroll rápido, âncora) contam como visíveis — nada fica preso em opacity 0. Com `prefers-reduced-motion`, render estático.
- Imagens via `next/image` (AVIF/WebP), PNGs transparentes dos materiais. `sizes` definido em todo uso.
- Formulário de contato = `mailto:` preenchido (decisão da equipe). Pronto para trocar por API.
- Sem CMS, sem i18n, sem OG dinâmico — fora do prazo.

## Design

**Conceito: "Ficha técnica".** O site lê como um dossiê de produtos construídos, não como landing page. Índices numerados (01–20 / 01–06), hairlines, fichas com equipe/início/indicadores, mockups reais como protagonistas.

**Tokens (`src/app/globals.css`, `@theme`)**
- Cores da marca (manual 2022): Azul Fibra `#004E95`, Inteligente `#0096CC`, **Solução `#0574D9` (ação)**, **Digital `#00BCFF` (acento/foco)**, Cibernético `#2A99FF`, Futurista `#39CBFF`, Sistêmico `#6AB8FF`, Robótico `#73DAFF`, Virtual `#AAD6FF`, Conectado `#ACE9FF`. Neutros `#000 / #3E4144 / #515257 / #6E7278` + branco (adicionado). **Laranja SENAI `#E84910`** (extraído do logo SENAI): detalhes (índices, marcadores) **e** a seção de escala inteira, full-bleed com texto preto. Contraste preto/laranja medido: 5,37:1 — passa AA para texto normal.
- Fundo `#000` (dark por decisão). Única exceção: a seção Sobre, que inverte para branco — ver Conteúdo. Superfícies `#0B0C0E` / `#141518`. Linhas `rgba(255,255,255,.12/.24)`.
- Texto: `--color-fg-body #D4D7DB` para corpo de leitura; `fg-muted`/`fg-faint` só em meta e legenda (feedback #3).
- Tipografia: **Syne** (display, 700) + **Space Grotesk** (texto/UI) + **JetBrains Mono** (rótulos, índices, unidades, metadados — utilitários `meta` e `meta-sm`). Escala fluida `display-xl/lg/md/sm`, `lead`, `eyebrow`, `meta`, `meta-sm`. Nota: o manual cita Bahnschrift, proprietária da Microsoft e sem licença web — decisão da equipe: Syne + Space Grotesk.
- Radius quase zero (2px); exceção é Fale conosco, cujo layout veio arredondado do mockup da equipe (cartão e campos 8px; botão 2px). Easing `out-quart`/`out-expo`. Durações 150/300/600ms.
- Grid 12 col, container 1440, gutters 24/48.

**Padrões gráficos:** rótulos mono; numerais `01`–`06` no lugar de ícones em conteúdo categorizado (exceto na lista de Serviços, onde disputavam atenção com o título; continuam em /cases); hairline-grid no hero, malha de 6rem no bloco laranja e no Sobre, hairlines diagonais; listas em tabela com hairlines; números grandes com legenda de metodologia; rail lateral mono com a seção corrente (≥xl).

**Movimento:** símbolo 3D do Hero (parallax no ponteiro + as duas metades se separam no clique/tap); troca de painel nas capacidades; revelação sequencial no scroll; contadores; hover de imagens (scale sutil); menu mobile deslizante. Tudo com fallback `prefers-reduced-motion` — o 3D degrada para o SVG estático.

**Interações são click/tap-first**, nunca hover-first: o site é visto em projetor e em celular. Todo componente com painel abre o primeiro item por padrão.

**O que não existe por decisão:** glow, partículas, blobs, glassmorphism, gradientes decorativos (exceções vindas dos mockups da equipe: o preto→laranja do Hero/cases e o fundo do Fale conosco), ícones decorativos, frases-slogan, fotos stock, depoimentos. **Ícone é só chrome** (seta, chevron, fechar, filtro) — conteúdo categorizado usa numeral mono. Exceção: os quatro cartões do Trabalhe conosco, que têm ícone no mockup da equipe (Phosphor, escolhidos pelo texto de cada cartão).

## Conteúdo

**Estrutura**
- `/` — **Hero** (nome da marca + símbolo 3D + proposta e CTAs, sobre o gradiente preto→laranja — ver abaixo) → **Nossos cases** (cena laranja presa na tela; cada projeto ocupa uma tela com rótulo → logotipo → número → resumo → CTA à esquerda e o mosaico de telas sangrando pelas bordas à direita; o scroll dissolve de um projeto para o outro; navegação vertical própria da seção; CTA para o portfólio) → **Serviços** (6 serviços em lista de largura cheia, sem índice numérico e sem hairlines entre eles, o scroll destaca um por vez e mostra a descrição curta do serviço, CTA para o portfólio filtrado) → **Sobre nós** (título, globo 3D e três cartões que encolhem no scroll — ver abaixo) → **Trabalhe conosco** (carrossel de fotos da equipe + quatro cartões laranja — ver abaixo) → **Entre em contato** (era "Fale conosco"; contato direto + formulário — ver abaixo).

Cases e Escala eram duas seções contando a mesma coisa — os números grandes já eram dos cases. Viraram uma só. A cena usa `src/content/scenes.ts`, que só aceita projetos com logotipo próprio e um indicador já declarado em `cases.ts`. Hoje são três, nesta ordem: AVA, Espaço do Estudante e E-commerce.

**Regras da cena:** texto branco sobre o laranja (decisão da equipe, 23/09 — contraste 3,91:1, passa AA só para texto grande; em preto era 5,37:1). O número grande nunca passa de 3 linhas **nem da largura da coluna** — `BigNumber` reduz a fonte em passos até as duas condições valerem (por isso o do e-commerce fica menor: "matrículas" no tamanho cheio é mais largo que a coluna). A transição entre projetos é contínua, calculada a partir do progresso do scroll quadro a quadro, não um corte. A navegação vertical (`CaseRail`) existe só dentro dessa seção; não há mais rail global na página.

**Cena de cases — ajustes de 23/09 (noite).** "Nossos cases" virou o `h2` visível, fixo no alto do quadro (`top-24`, abaixo da nav flutuante) e fora dos slides; o conteúdo de cada slide centraliza entre ele e o botão (`pt-36 pb-32`). Malha a 12% (era 25%) — no Hero também, para a continuidade. O rail lateral mostra só os traços (o nome do projeto encostava no número grande). O CTA da seção virou "Ver todos os N cases ↗" (N = `cases.length`), sólido branco com texto preto (21:1). Mosaicos do AVA e do Espaço do Estudante trocados pelos novos da equipe; os anteriores foram movidos para `../Mosaicos anteriores/`. `scenes.ts` aceita `left`/`top` por cena para os cortes retos da imagem caírem fora da tela: AVA `zoom 1, top 3%`; Espaço do Estudante (celulares) `zoom 1.05, left calc(44% - 43svh - 1.75rem)`, que desconta a faixa transparente de 24% à esquerda da imagem.

**Mosaicos (`scene.webp`).** Fornecidos pela equipe, já inclinados e com fundo transparente. São desenhados pela **altura** no tamanho natural — a proporção de cada um é diferente demais para um valor único, então `zoom` vive em `scenes.ts` (AVA 1,6; os deitados 1,3) — e sangram pelas bordas — `object-cover` esticava a imagem na largura do quadro e matava a inclinação. Por isso `sizes` sai da proporção da imagem, não da largura da tela, e `max-w-none` desfaz o preflight do Tailwind. Abaixo de `lg` ficam em `display: none`, então o celular não baixa nada. A caixa do mosaico passa 2rem da tela em cima e embaixo (`-inset-y-8`): o slide desliza até 24px na transição, e com `inset-0` o mosaico subia junto e deixava uma faixa laranja na base — agora quem corta é sempre a borda da tela. A coluna de texto é estreita (26rem) de propósito, para não encostar no mosaico.
- `/cases` — design V3 da equipe (Figma `125:317`; filtrado em `108:2446`, 24/09). "Nossos cases" + filtros à esquerda (Serviços empilhados, Segmento em linha; ativo em Azul Digital com texto preto; "Limpar filtros" só com filtro ativo) e 20 cards de 283px (surface-2, borda 2px line-strong, nome Syne 800 32px, resumo, até 3 indicadores e as capacidades em etiquetas). Ordem do design em `casesInOrder` (com imagem primeiro), usada também no anterior/próximo.
- `/cases/[slug]` — design V3 (Figma `108:414`, só existe o do AVA; os outros seguem o molde): trilha, nome + resumo e, embaixo deles, os indicadores em azul lado a lado (pedido de 24/09: o título fica com a largura toda e não quebra em nomes longos), quadro de 1344 × 620 com a imagem (só quando o case tem material visual), Contexto / Desafio / O que foi entregue / Resultado (títulos Syne azuis; desafio e resultado não estão no design do AVA e seguem o mesmo padrão), Ficha técnica em cartão com Equipe, anterior/próximo. A galeria de telas saiu (não está no design; os arquivos continuam em `public/cases`).

**Imagens dos cards (V3).** Exportadas do Figma: a faixa direita de cada card, do começo da composição de telas até a borda, com 283px de altura — `card.webp` a 2× para /cases. Foram exportadas sobre o surface-2, então são opacas e só funcionam sobre esse fundo. **Imagem do detalhe:** `detalhe.webp` (2688 × 1240) vem da seção "Images Case detail" do Figma (node `168:10796`), um quadro por case, exportado com o recorte do design; o AVA usa o mosaico do próprio design do detalhe (`hero`). `caseDetailImage` escolhe; os cinco sem material visual não têm quadro. A largura do recorte fica em `cardWidths` (`cases.ts`) e cola a imagem à direita como no design; abaixo de 1440 a imagem ocupa no máximo metade do card, cortando pela esquerda. Os cinco sem material visual (DW, SGN, Chatbot SGN, Hub IA, Predição) usam no card o símbolo 3D do design (`sem-foto.webp`). A borda do card é um `::after` por cima da imagem, como o stroke interno do Figma.

- `/vagas` — "Nossas vagas", mockup da equipe (24/09); é para onde vai o "Ver vagas abertas" do Trabalhe conosco (antes ia direto ao Pandapé). Mesmo esqueleto do /cases: à esquerda "Carreiras", busca (título e área, sem diferenciar acento) e filtro de área de escolha única ("Ver todos" ativo em Azul Digital); à direita cards de vaga (surface-2, borda 2px line-strong): título Syne 800 28px, modalidade e contrato, salário em Azul Solução + "+benefícios", "Inscrições até dd/mm" e "Ver oportunidade ↗". **As 8 vagas são as do mockup, de exemplo** (`src/content/jobs.ts`); o formato é plano, uma coluna por campo, porque o plano é ligar a lista a uma planilha que a equipe preenche e a IA transforma em vagas. "Ver oportunidade" aponta para o Pandapé até existir link por vaga.

**Nav — mockup da equipe (23/09).** No topo da página, largura do container: símbolo à esquerda, links no centro (cinza), "Fale conosco" em contorno à direita. Ao rolar (compacta acima de 40px, volta abaixo de 8px — histerese), o símbolo e o botão deslizam para junto dos links (animação de layout do Motion, mola) e o conjunto vira uma barra preta compacta flutuando a 8px do topo, centralizada (~600 × 58, cantos retos), links em branco e botão sólido branco com texto Neutra 200. O fundo preto entra com 200ms de atraso, depois que os itens se juntaram. O `header` segue `sticky` com 4rem no fluxo, mas é `pointer-events-none` — só a barra recebe cliques. Abaixo de `md` não compacta: é a faixa de largura cheia com menu lateral, que ganha fundo ao rolar. **Z-index:** `z-nav`/`z-overlay`/`z-dialog` não geram CSS no Tailwind v4 (não existe namespace de z-index no `@theme`); use `z-(--z-nav)` etc. Antes da correção o cabeçalho ficava por baixo das seções ao rolar.

**Hero — mockup da equipe (23/09).** Três colunas `[1fr | 27rem | 1fr]`, então o símbolo 3D fica no centro exato: à esquerda "SENAI" (Syne 800, 85px a 1440) e "Soluções / Digitais" (52px), que juntos são o `h1`; à direita "Produtos digitais que transformam a indústria, educação e negócios" (31px, alinhado à direita) e os CTAs "Ver os cases" (sólido) e "O que fazemos" (contorno), sem seta. Tamanhos calibrados pela largura medida no mockup. As duas luzes coloridas do 3D agora são laranja (o mockup não tem azul) e a dica "clique no símbolo" saiu. Na Nav, "Carreiras" virou "Trabalhe conosco" e os links subiram para 16px. **Arco contínuo com a cena de cases (pedido de 23/09: "formando um arco para a outra seção"):** o fundo do Hero é uma elipse (`bg-arc`, globals.css) centrada na borda de baixo — laranja no centro, `--color-ember` a 35% do raio, preto no fim; raios `--arc-rx: max(130vw, 42rem)` e `--arc-ry: 62svh`. A cena de cases começa com `bg-arc-tail`: a mesma elipse lida na linha do centro (degradê horizontal com as mesmas paradas), com máscara que desbota para o laranja chapado em 60svh. Como a borda entre as seções é a linha do centro da elipse, as cores batem exatamente na junção. Raio horizontal maior = arco mais suave. A malha é a mesma `grid-lines` da cena (6rem), ancorada embaixo à esquerda, com máscara que a apaga no preto — as linhas continuam de uma seção para a outra.

**Sobre nós — mockup da equipe + referência em vídeo (23/09).** Fundo preto (a varredura para branco da versão anterior saiu). "Sobre nós" (Syne 800, 74px — o mesmo estilo agora usado em "Serviços") e o globo à esquerda, no lugar da foto (referência de 24/09), três cartões brancos à direita: Origem 01, Ecossistema 02 (era "Solidez" até 24/09), Propósito 03 (título Syne 800 36px, número 30px, texto Syne 500 21/28px, hairline Neutra 300 entre eles). Texto em `about.pillars` (`site.ts`), da equipe. **Comportamento (ref. Pinnacl, "principles"):** o quadro fica `sticky` por uma altura de tela (espaçador `TRAVEL`); nesse trecho o primeiro cartão encolhe até o cabeçalho, depois o segundo; o terceiro fica aberto; aí a seção solta. Alturas escritas direto no DOM por quadro; a coluna guarda a altura aberta (`minHeight`), então a página não muda de altura. `top` do quadro = `min(0, tela − quadro)` para telas baixas. Abaixo de `lg` e com `prefers-reduced-motion`, cartões abertos e rolagem normal. Os números (2007, 20+, 100%, Nacional) e missão/visão/valores saíram da seção — não estão no mockup.

**Globo 3D — Serviços → Sobre nós → Trabalhe conosco (24/09).** `GlobeTrack` envolve as três seções e desenha um único globo de arame (`GlobeScene`, three.js: 36 meridianos + 17 paralelos, eixo inclinado como em `public/home/globo.svg`, linhas em blending aditivo — os polos brilham sozinhos) numa camada `fixed` atrás do conteúdo (`isolate` + `-z-10`; por isso o About e a faixa preta do Trabalhe conosco não têm fundo próprio). A posição sai de três marcadores: `GlobeAnchor` à direita de Serviços (sangrando 5% pela borda), `GlobeSlot` no Sobre nós e `GlobeEnd` no fim da faixa preta do Trabalhe conosco. O globo entra colado ao marcador, para na tela na altura de pouso enquanto a lista rola, e quando o Sobre entra desliza para a esquerda, na mesma altura, pousando no slot no instante em que ele chega; prende com o quadro do Sobre. Quando o Sobre solta, espera na mesma altura e, em ~0,8 tela de scroll, desce para a direita crescendo (648 → 757px a 1440) até virar a cúpula centrada embaixo do carrossel, cortada pela faixa branca, com "VEM SER FIESC" (Syne 800, 56px, caixa alta) por cima — pouso quando o fim da faixa preta encosta na base da tela. A faixa branca cobre o globo porque tem fundo; o texto é cortado por `overflow-hidden` da área. A altura de pouso é a do slot com o quadro preso (`data-globe-frame`, mesmo `top` do About), então não há salto vertical. A camada é recortada pela caixa das três seções (`clip-path`) — não aparece nos cases nem no Entre em contato. O scroll também gira o globo; posição e giro são amortecidos. Tamanho `--globe: min(45vw, 40,5rem)`. Abaixo de `lg`, com `prefers-reduced-motion` ou sem WebGL, sem travessia: o slot do Sobre e a cúpula do Trabalhe conosco mostram o SVG parado.

**Trabalhe conosco — mockup da equipe (24/09).** Duas faixas. **Preta:** "Trabalhe / conosco" (Syne 800, 74px; mínimo 40px no celular, porque "Trabalhe" a 48px não cabe em 312px), texto de `careers.intro` e botão Azul Solução "Ver vagas abertas →" para o Pandapé; à direita, o carrossel de fotos da equipe (`CareersCarousel`) sangrando até a borda da tela (utilitário `bleed-right`). O carrossel troca a cada 6s: a foto nova entra por cima com fade de 1,2s enquanto a anterior fica opaca embaixo, e a ativa desliza de 106% para 100%. Os indicadores são traços; o ativo é mais largo e se enche de laranja — a própria animação de preenchimento (`carousel-fill`) é o temporizador, então pausar é pausar a animação. Clicar num indicador (inclusive o ativo) reinicia o preenchimento do zero e a contagem segue correndo — por isso não há pausa por hover nem por foco, que deixavam a barra nova parada no zero. Pausa fora da tela e pelo botão de pausa (WCAG 2.2.2); com `prefers-reduced-motion` não avança sozinho. Fotos em `public/carreiras/equipe-01…05.webp` (da equipe, 1488px). **Branca:** "Como é trabalhar no SD" e quatro cartões laranja com texto preto (5,37:1), ícone Phosphor num quadrado claro: globo (remoto), foguete (alto impacto), bússola (autonomia), tendência de alta (remuneração e evolução); depois "Acompanhe nas redes:" com as três redes. As cinco áreas em texto da versão anterior saíram.

**Entre em contato — mockup da equipe (v3, 23/09; renomeado em 24/09, e o botão da Nav virou "Contato").** Fundo preto com o símbolo do SD em contorno (mesmo `d` do SVG, `non-scaling-stroke`, branco a 10%) que continua por baixo do rodapé: o `Backdrop` desce 80rem abaixo da seção, o `Footer` é transparente e `relative`, e o excesso é cortado pelo wrapper `overflow-clip` em volta de `main` + rodapé no `layout.tsx` (`clip` não cria contêiner de rolagem, então o `sticky` das outras seções segue funcionando). Título "Entre em / contato" em duas linhas, Syne 800 no mesmo corpo do "Sobre nós" (74px), + linha de apoio. À esquerda o contato direto **sem cartão e sem o símbolo do SD em cima**, alinhado ao título e ao topo do formulário: telefone (**fictício** — ver Pendências), e-mail em azul + copiar, localização e redes. À direita o formulário com rótulos visíveis (Nome, E-mail, Mensagem), campos `#181818` com borda cinza que **fica branca no foco**, botão Azul Solução de raio 2px e "Respondemos em até 2 dias úteis." (do mockup; após o envio vira o aviso do mailto). Continua `mailto:` preenchido.

**Rodapé (mockup v3, 23/09).** Símbolo + "SENAI Soluções Digitais — área do SENAI-SC e braço tecnológico da FIESC." e três colunas: Navegar (Cases, O que fazemos, Sobre, Carreiras, Contato), Portfólio ("Todos os N produtos" com N = `cases.length`, Educação, Indústria, Gestão → `/cases?segmento=`), Redes. Rodapé mono "© ano SENAI Soluções Digitais" / "Desde 2007 · Santa Catarina, Brasil". Todo o texto em branco; sem hairline em cima e sem a linha azul (as duas saíram no v3). A linha "AWS Partner" também não está no mockup.

**Hierarquia dos cases (por conteúdo disponível):**
- Editoriais: AVA SENAI, E-commerce, SEIF, SAEP IA.
- Padrão: DEVstart, CRM+SGN, Orbie, SENAI Space, Eleva, Espaço do Estudante, Itinerários Nacionais, Habilita, Data Warehouse.
- Resumidos: Lab Digital (piloto), NR-10 (em desenvolvimento), AudioXP; e 4 do site atual sem material visual: SGN, Chatbot SGN, Hub IA, Predição de Evasão.

**Taxonomia de capacidades (única)** — rotulada na UI como "Serviços"; a âncora é `#servicos` e os slugs continuam: 01 Plataformas e sistemas · 02 IA aplicada · 03 Apps móveis · 04 Dados e analytics · 05 VR/AR/simulação · 06 Cloud e DevOps na AWS.

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

**Figma:** https://www.figma.com/design/zDCI4bFpUmYC1fFFfcu9Yj — duas páginas. **"V1 do site"** (frame `Home — 1440`, node 6:58) com os 13 post-its de feedback. **"V2 do site"** (node 30:37) com o espelho atual:

| Frame | Node | Tamanho |
|---|---|---|
| Home — 1440 (V2) | `36:44` | 1440 × 7249 |
| Case — AVA SENAI · 1440 (V2) | `36:45` | 1440 × 2600 |
| Detalhes — o que mudou da V1 para a V2 | `54:37` | 1280 × 2191 |

A V2 reaproveita a coleção `SSD / Cores` e os text styles da V1, e acrescentou `Semântico/fg-body` + 6 estilos (`Mono/Meta`, `Mono/Meta SM`, `Display/XL Extrabold`, `Lead Medium`, `Heading/MD`, `Body/SM Relaxed Medium`). As imagens dos cases reaproveitam os `imageHash` já enviados na V1; a galeria do AVA foi enviada nova.

**Página "V3 do site"** (node `90:324`, 24/09) — espelho do código atual para a Duda propor melhorias. Copiado do site rodando local a 1440 px, com as medidas computadas de cada elemento (não é screenshot: frames, textos editáveis, cores ligadas a `SSD / Cores`, textos ligados aos estilos existentes quando batem exatamente, ícones e marcas como componentes):

| Frame | Node | Tamanho |
|---|---|---|
| Home — 1440 | `97:37` | 1440 × 6807 |
| Home — estados de scroll (slides 2 e 3 dos cases, nav compacta, Sobre recolhido) | `97:38` | 1440 × 3128 |
| Portfólio (/cases) — 1440 | `104:63` | 1440 × 5375 |
| Case — AVA SENAI — 1440 | `104:354` | 1440 × 3744 |
| Componentes · ícones e marcas | `98:37` | — |

Seções presas no scroll (cases, Sobre) entram como um quadro de 900 px no estado de entrada. O símbolo 3D é imagem do render WebGL. WebP não decodifica no Figma: as imagens foram enviadas como PNG/JPEG.

O código continua sendo a fonte de verdade; alterações feitas no Figma precisam ser trazidas de volta manualmente.

## Pendências

**Conteúdo**
- [ ] Telefone e endereço de contato. **O telefone publicado (`+55 (48) 91111-1111`) é fictício**, a pedido da equipe (24/09) para a apresentação; sai como texto, sem link `tel:`. Trocar pelo real antes de publicar de verdade.
- [ ] Confirmar o e-mail `solucoesdigitais@sc.senai.br`, que veio do mockup da equipe. `NEXT_PUBLIC_CONTACT_EMAIL` tem precedência.
- [ ] URL do YouTube: o mockup do contato pede LinkedIn/Instagram/YouTube; temos LinkedIn/Instagram/Facebook.
- [ ] Quais cases rodam em AWS (capacidade 06 sem evidências listadas).
- [ ] Indicadores para SEIF, IN, Habilita, DW (só qualitativos), Lab Digital, NR-10, AudioXP e os 4 cases do site atual.
- [ ] Confirmar hex oficial do laranja SENAI (`#E84910` extraído de PNG).
- [ ] Vagas reais em `/vagas` (hoje as 8 do mockup, de exemplo) e a integração com a planilha.
- [ ] Confirmar "mais de 550 colaboradores" e "24 estados" (texto do mockup do Trabalhe conosco, sem outra fonte). O botão do mockup dizia "550 Vagas abertas"; publicado como "Ver vagas abertas" porque o número de vagas muda no Pandapé.

**Assets**
- [ ] Badge oficial AWS Partner.
- [ ] Prints em alta dos cases com mockups pequenos (IN 415px, SEIF 288px, NR-10 412px, AudioXP 218px).
- [ ] Material visual para SGN, Chatbot SGN, Hub IA, Predição de Evasão.
- [ ] Favicon / OG image padrão.

**Desenvolvimento**
- [ ] Deploy Vercel + domínio. **Maior pendência prática.**
- [ ] Revisão final de acessibilidade (teclado nos filtros, contraste dos placeholders).
- [ ] Lighthouse / Core Web Vitals no build de produção — medir o custo do bundle do three.
- [ ] JSON-LD `Organization`.
- [ ] `src/components/ui/Typography.tsx` virou código morto com a V2 — remover.

**Direção V2 (22–23/09):** `docs/DIRECAO-V2.md` registra o diagnóstico dos 13 post-its do Figma,
as 7 referências em vídeo e a especificação de cada seção. Ler junto com este arquivo.

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
