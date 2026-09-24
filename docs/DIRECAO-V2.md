# Direção V2 — guia de implementação

Documento de direção para a segunda passada do site da SENAI Soluções Digitais.
Nasce dos **13 post-its de feedback** no Figma ([Duda e Lucas Hackathon](https://www.figma.com/design/zDCI4bFpUmYC1fFFfcu9Yj/Duda-e-Lucas-Hackathon?node-id=6-58)) e de **7 referências em vídeo** em `../Refs de vídeo`.

Não substitui o `CLAUDE.md` (documentação viva) nem o `HANDOFF.md` (estado do projeto). Este aqui responde a **"como a V2 deve ficar e por quê"**.

Data: 22/09/2026 · Prazo do commit final: **24/09/2026, 18h**

> **Status em 23/09/2026:** implementado no código **e espelhado no Figma**.
> Home de 10.856px → **7.314px** (−33%) a 1440; o espelho no Figma fecha em 7.249px (1% de diferença).
> Build e lint limpos. Falta o deploy e a revisão visual do 3D.
> O que foi implementado diferente do previsto está marcado com **[ajuste]** ao longo do texto.
>
> **Figma — página "V2 do site":** `Home — 1440 (V2)` (36:44) · `Case — AVA SENAI · 1440 (V2)` (36:45) ·
> `Detalhes — o que mudou da V1 para a V2` (54:37), que documenta as mudanças, as micro-interações e os tokens novos.

---

## 1. O diagnóstico em uma frase

O site V1 está **correto e verboso**. Os 13 post-its se agrupam em 5 temas, e 5 deles (quase metade) dizem a mesma coisa: **corta texto, ocupa menos altura vertical**.

| Tema | Post-its | Gravidade |
|---|---|---|
| "Capacidades" não se explica | #2, #9, #10 | **Alta** — 3 post-its, é o mais repetido |
| Verbosidade / densidade | #5, #7, #8, #11, #12 | **Alta** — 5 post-its |
| Números sem escopo honesto | #6 | Média |
| Acabamento (logo, contraste, forma do form) | #1, #3, #13 | Média |
| **Preservar** | #4 — Hero maximalista aprovado | — |

A home V1 tem **10.856px**. A meta da V2 é **≤ 7.000px** sem perder conteúdo — o conteúdo migra para `/cases` e para painéis sob demanda.

---

## 2. Decisões travadas nesta sessão

Estas não se reabrem sem motivo novo.

1. **Variar os componentes entre seções.** Não reaproveitar o mesmo padrão "lista + painel" em Capacidades *e* Trabalhe Conosco. Cada seção tem uma forma própria. (Custa mais tempo; aceito conscientemente.)
2. **Bloco de números = full-bleed laranja SENAI**, no modelo Pinnacl — não a grade hairline escura do Axiom. Mais memorável numa banca de 10 minutos.
3. **Interações são click/tap-first**, não hover-first. Todo componente com painel abre o **primeiro item por padrão** e responde a clique. Hover é enriquecimento, nunca requisito. Motivo: o site será visto em projetor e em celular.
4. **Ícones: Phosphor Icons**, restritos ao chrome da interface. Conteúdo categorizado usa numerais mono. (Detalhe na §4.)
5. **Símbolo 3D no Hero**, gerado por extrusão do SVG em runtime — não pelo GLB exportado. (Detalhe na §5.)

---

## 3. As 7 referências

| Ref | Arquivo | Site | Linguagem |
|---|---|---|---|
| v2 | `13.36.16.mov` | **WeEvolveIT** | dark + magenta, display maximalista + mono |
| v3 | `13.45.01.mov` | **Identient** | claro/institucional, editorial, sticky |
| v4 | `13.45.54.mov` | **Pinnacl** | brutalista, lima + roxo, hairlines diagonais |
| v5 | `13.46.21.mov` | **Axiom Power** | dark + laranja, técnico |
| v6 | `13.48.01.mov` | **Checkpoint Research** | claro + azul, numerado |
| v7 | `13.50.39.mov` | **DAQ** | dark, mono, HUD / ficha técnica |
| v8 | `13.54.31.mov` | **Aspen Search** | claro + verde menta, grid rígido |

`13.29.32.mov` são 1,5s de gravação acidental de devtools — ignorar.

Padrão comum às 7: fundo escuro ou branco duro, **uma única cor de acento**, mono para rótulos/meta, display grande para headline de 2–5 palavras. É a tese de "ficha técnica" que já está no `CLAUDE.md`. v5 (dark + laranja) e v7 (dark + mono) são quase a paleta do SD.

---

## 4. Sistema — o que muda nos fundamentos

### 4.1 Adicionar uma fonte mono

Hoje os tokens têm só Syne (display) + Space Grotesk (texto). Todas as 7 referências usam mono para rótulos, e é o que sustenta a leitura de "ficha técnica".

**Escolha: JetBrains Mono**, via `next/font/google`, pesos 400 e 500. Neutra e legível em 10–11px, que é onde ela vai viver.

> Alternativa de mais personalidade: **Space Mono** — é a mono desenhada como par do Space Grotesk pelo mesmo estúdio. Mais larga e mais quirky; ótima em rótulo curto, arriscada em tag longa.

```css
--font-mono: var(--font-jetbrains-mono), ui-monospace, monospace;

--text-meta: 0.6875rem;              /* 11px */
--text-meta--line-height: 1.2;
--text-meta--letter-spacing: 0.08em;
--text-meta-sm: 0.625rem;            /* 10px */
--text-meta-sm--line-height: 1.2;
--text-meta-sm--letter-spacing: 0.1em;
```

Onde a mono entra: rails laterais, kickers de seção (`+ 04 / CAPACIDADES`), numerais `01`–`06`, tags de evidência, unidades dos números (`GW`, `%`, `anos`), labels de campo de formulário, metadados de ficha de case.

### 4.2 Corrigir o contraste do parágrafo (post-it #3)

`--color-fg-muted: #a3a8ae` sobre `#000` dá contraste alto. O problema relatado é de **peso e tamanho**, não de cor: parágrafo em Space Grotesk 400 em corpo grande, sobre preto, "apaga".

Ações:
- corpo de texto do Hero e dos leads: peso **500**, não 400;
- `--color-fg-muted` só em meta e legenda; parágrafo de leitura usa `--color-fg` a 88% de opacidade ou um token novo `--color-fg-body: #d4d7db`;
- nunca usar `--color-fg-faint` (`#6e7278`) em texto corrido — só em rótulo mono, onde o tamanho compensa.

Verificar com o `/accessibility-review` depois.

### 4.3 Ícones — Phosphor

**Pacote:** `@phosphor-icons/react`, importando sempre de `@phosphor-icons/react/dist/ssr` (o barrel principal é enorme e atrapalha RSC no Next 16).

**Por quê:** ~9.000 ícones, desenho geométrico de terminais retos (conversa com os 45° do símbolo) e — o motivo decisivo — **6 pesos**, o que deixa o ícone seguir a mesma hierarquia que a tipografia já segue:

[ajuste] `duotone` no hover não foi usado: nenhum ícone sobrou em posição de hover
relevante depois que as capacidades passaram a usar numeral. Os pesos em uso são
`regular` e `bold`.

| Peso | Uso |
|---|---|
| `thin` | rails laterais, meta de 10–11px |
| `regular` | padrão de interface |
| `bold` | CTAs e botões primários |
| `fill` | item **ativo** na lista de Capacidades |
| `duotone` | hover — a segunda camada recebe `--color-laranja-senai` |

**[ajuste] Não há `IconContext.Provider`.** Um provider global forçaria toda a árvore para
client component — os ícones são usados dentro de Server Components. Ficou um
re-export único em `src/components/ui/icons.tsx`, com os pesos e tamanhos passados
explicitamente em cada uso. Mesmo efeito de padronização, sem custo de RSC.

Tamanhos permitidos: **16 / 20 / 24**. Nada fora disso.

**Regra mais importante — onde NÃO usar ícone:**
as 6 Capacidades usam **numerais `01`–`06` em mono**, como DAQ (v7) e Checkpoint (v6). Seis ícones genéricos enfileirados é o que mais denuncia "template de IA", e fugir disso é decisão registrada no `CLAUDE.md`. Ícone fica restrito ao chrome: `ArrowRight`, `ArrowUpRight`, `CaretDown`, `X`, `FunnelSimple`, `SquaresFour`, `Rows`, `Plus`, `Minus`.

Alternativas descartadas: **Lucide** (default do shadcn — máximo risco de cara de template, e peso único); **Tabler** (bom, mas sem eixo de peso); **Material Symbols Sharp** (o mais angular, porém lê "Google").

### 4.4 Movimento — tokens que já existem, e o que falta

Já existem `--ease-out-quart`, `--ease-out-expo`, `--duration-fast|base|slow`. Adicionar:

```css
--ease-spring: linear(0, 0.4 12%, 0.9 25%, 1.06 40%, 0.99 64%, 1);
--duration-micro: 90ms;   /* feedback de toque */
```

**Regra de ouro:** troca de estado em painel usa `--duration-base` (300ms) + `--ease-out-expo`. Entrada de seção usa `--duration-slow` (600ms) + `--ease-out-quart`, com stagger de 60ms. Nada acima de 700ms.

---

## 5. O símbolo 3D no Hero

### 5.1 Não usar o GLB

O modelo gerado tem **159.748 faces / 169.485 vértices**. É pesado demais para o LCP do Hero e desperdiça a maior vantagem do nosso caso: **o símbolo é um único path vetorial**.

`public/brand/sd-simbolo-branco.svg` é um `<path>` com `fill-rule="evenodd"`, viewBox `0 0 122 145`, composto de **2 formas + 2 furos**. Extrudando em runtime, sai geometria limpa de **~3k triângulos** a partir de alguns KB de SVG — e as duas metades ficam separadas em meshes independentes, o que dá a interação de graça.

### 5.2 Stack

```
three  +  @react-three/fiber
```

Sem `drei` a princípio (entra só se precisarmos de `AdaptiveDpr`). Sem HDRI — se a iluminação ficar chapada, usar um **matcap** de ~30KB em vez de um `.hdr` de 1–2MB.

Carregar por `next/dynamic` com `ssr: false`, **depois** do LCP, com o SVG estático como poster embaixo.

### 5.3 Geometria

```ts
const shapes = SVGLoader.createShapes(path);          // → 2 shapes, furos já resolvidos por evenodd
const geo = new THREE.ExtrudeGeometry(shape, {
  depth: 18,
  bevelEnabled: true,
  bevelThickness: 1.2,
  bevelSize: 0.8,
  bevelSegments: 2,
});
geo.center();
```

Atenção: o eixo Y do SVG aponta para baixo e o do three.js para cima — aplicar `scale(1, -1, 1)` na geometria ou `rotation.x = Math.PI` no grupo. Escala final em torno de `0.02`.

As 2 shapes viram 2 meshes dentro de um `<group>`, para poderem se separar.

### 5.4 Material e luz — a marca entra como luz, não como tinta

Superfície branca/metálica, e as cores da marca chegam pelas luzes. Fica sofisticado e evita o "logo colorido girando", que é cafona.

| | |
|---|---|
| Material | `MeshStandardMaterial` · `color #ffffff` · `metalness 0.9` · `roughness 0.35` |
| Ambiente | `ambientLight` 0.4 |
| Key | `directionalLight` branca, frente-superior-direita |
| Rim | `pointLight` em `--color-laranja-senai` (#E84910), atrás e à direita |
| Fill | `pointLight` em `--color-azul-digital` (#00BCFF), à esquerda, intensidade baixa |

### 5.5 As interações

| # | Gatilho | Comportamento |
|---|---|---|
| **a** | Repouso | Rotação lenta contínua em Y, ~0.15 rad/s. Para ao entrar o ponteiro. |
| **b** | Ponteiro | Parallax: rotação do grupo faz `lerp` na direção do cursor, damping 0.06, limitado a ±0.35 rad em X e Y. |
| **c** | **Clique / tap** | As duas metades **se afastam** ao longo do eixo diagonal (~14 unidades) e giram ±12°, revelando o vão entre elas. Volta em mola (`stiffness 120`, `damping 14`) após 900ms. **Esta é a interação assinatura do site.** |
| **d** | Scroll | Ao sair do Hero, o grupo escala 1 → 0.12 e translada em direção à posição do símbolo na Nav. Aos 90% do progresso, faz o *hand-off* para o SVG estático da Nav — ilusão de elemento compartilhado. |

Por que o clique (c) é a assinatura: o símbolo do SD **é** duas formas que se encaixam. Separá-las e reencaixá-las conta a ideia de "soluções que se integram" sem escrever uma frase — e é a única micro-interação do site que nenhuma das 7 referências tem, porque depende desta marca.

### 5.6 Degradação

| Cenário | Comportamento |
|---|---|
| `prefers-reduced-motion` | Sem 3D. Renderiza o SVG estático. |
| Mobile | 3D sim, DPR limitado a 1.5, **sem** rotação de repouso (a); tap dispara (c). |
| Falha do import dinâmico / sem WebGL | Poster `sd-simbolo-branco.svg` no mesmo tamanho e posição. |
| Orçamento estourado | **Corte seco quarta 23/09 às 14h**: se (c) e (d) não estiverem funcionando, sobe só (a) + (b). Se nem isso, sobe o poster. O site não pode depender disso para existir. |

**[ajuste] O que ficou de pé:** (a) rotação de repouso — desativada em ponteiro grosso,
(b) parallax no ponteiro e (c) a separação das metades no clique/tap. **(d) o hand-off
para a Nav no scroll não foi implementado** — é a peça mais cara das quatro e a que menos
aparece numa apresentação de 10 minutos. Fica como melhoria se sobrar tempo.

**[ajuste] Material:** `metalness` caiu de 0.9 para 0.15. Metal alto sem environment map
reflete o vazio e a peça fica cinza-escura; sem HDRI (peso), a superfície virou quase
dielétrica e o brilho vem só das luzes.

---

## 6. Seção a seção

### 6.1 Nav — post-it #1

Símbolo sem o lettering. A nav passa a ser: símbolo · âncoras · CTA em pílula.

Do Pinnacl (v4): o CTA pode ser **pílula com dropdown** (`NOSSAS CAPACIDADES ⌄`), que responde "o que são capacidades" antes mesmo da seção.

Rail lateral em mono (DAQ/Axiom) mostrando a seção corrente — `+ 04 / CAPACIDADES` — e servindo de indicador de progresso de scroll.

### 6.2 Hero — post-its #3, #4, #5

**Preservar** a tipografia maximalista (#4). Reduzir o texto:

- headline de **2 a 5 palavras**, com uma palavra-chave em `--color-azul-digital` (padrão de WeEvolveIT e Pinnacl);
- lead de no máximo 2 linhas, peso 500 (#3);
- os 4 números **saem do Hero** e viram seção própria (§6.3);
- o símbolo 3D ocupa a direita no desktop, e fica atrás do texto no mobile com opacidade baixa.

### 6.3 Números — post-it #6 · full-bleed laranja (decisão travada)

Bloco **full-bleed `--color-laranja-senai`**, texto preto, no modelo Pinnacl (v4, 1–4s):

- cada número **é** a headline da faixa, em Syne, ocupando quase a largura toda;
- alinhamento **alterna** — o primeiro à esquerda, o segundo à direita;
- cada um acompanhado de uma **imagem-chip pequena**, flutuando fora de grid;
- **hairlines diagonais** atravessando o bloco (Pinnacl) — textura sem glow, coerente com a decisão anti-"template";
- legenda em mono abaixo de cada número, **explicando a metodologia** — é isso que impede o número de parecer inflado, que é o cerne do post-it #6;
- contagem animada no scroll, disparada uma vez, respeitando `prefers-reduced-motion`. O componente `Counter.tsx` já existe.

**Conteúdo:** as métricas precisam refletir *status geral da empresa*, não contagem de projetos. **Decisão de conteúdo pendente — ver §9.**

> **[ajuste] Contraste medido:** preto sobre `#E84910` dá **5,37:1** — passa AA para texto
> normal, não só para texto grande. A preocupação era maior do que o problema. A legenda
> ficou mesmo em 14px/500, com folga.

### 6.4 Capacidades — post-its #2, #9, #10 · o padrão DAQ

Referência: **DAQ (v7, 33–39s)** — "The Core".

```
┌─────────────────────┬──────────────────────────────────┐
│ 01  Dados & IA    › │  ┌────────────────────────────┐  │
│ 02  Software        │  │ Dados & IA                 │  │
│ 03  Experiência     │  │ Uma frase explicando.      │  │
│ 04  Automação       │  │ · tag · tag · tag ·        │  │
│ 05  Cloud & DevOps  │  │ Ver 7 projetos  ↗          │  │
│ 06  Educação        │  └────────────────────────────┘  │
└─────────────────────┴──────────────────────────────────┘
```

Resolve os três post-its de uma vez:

- **#9** — cada capacidade se explica **uma por vez**, com frase própria, em vez de um nome abstrato para o conjunto;
- **#10** — a "evidência" vira **tag pequena**, não lista de soluções;
- **#10** — `Ver N projetos ↗` é literalmente o **CTA para o portfólio com filtro aplicado** que o post-it pede. Link: `/cases?capacidade=<slug>`;
- **#2** — o nome da seção passa a ser secundário, porque o conteúdo responde antes.

**Comportamento:** primeiro item aberto por padrão; clique/tap troca; hover só pré-destaca. Tudo em uma tela — nada empurra a página (era o problema do accordion da V1). Numerais mono, **sem ícone** (§4.3).

> **[ajuste] Decisão tomada:** o rótulo visível virou **"O que fazemos"** — na nav, no
> marcador e no título da seção. O slug, a âncora `#capacidades` e o parâmetro
> `?capacidade=` continuam como estavam, então nada quebra e a volta atrás é trivial.
> Se preferirem outro nome, é um `find` em três strings.

### 6.5 Cases — post-its #7, #8 · o padrão WeEvolveIT

Referência: **WeEvolveIT (v2, 60–68s)**.

O índice dos 16 **sai da home**. No lugar:

1. headline curta;
2. **um case em destaque**, card à direita com thumb + título + uma métrica;
3. abaixo: `Escolha um setor — veja o portfólio completo` com uma **linha de chips de setor**;
4. grid compacto com 3–4 cards, com **toggle de densidade** (grid ↔ lista);
5. faixa de **logos de clientes** em cinza.

Isso é o post-it #8 quase palavra por palavra: *"pode indicar mais projetos além dos principais destacados, mas sem listar todos"*. Os 20 continuam existindo — em `/cases`. `CapabilityChips.tsx` e `CasesExplorer.tsx` já existem e devem ser reaproveitados.

Alternativa mais enxuta ainda, se faltar tempo: **lista de nomes em texto grande com preview no hover** (Aspen, v8, 9–13s) — ocupa ¼ de um grid de cards.

### 6.6 Sobre — post-it #11 · o padrão DAQ "Mission & Vision"

Referência: **DAQ (v7, 32s)**. Três linhas de tabela substituem três parágrafos:

```
Clareza arquitetural    │  Uma frase.
Operação enxuta         │  Uma frase.
Visão absoluta          │  Uma frase.
```

Rótulo à esquerda, frase à direita, hairline entre as linhas. Entrada com stagger de 60ms. O peso fica na tipografia, não no volume de texto (Aspen, v8, 15s: `Small team. High Signal.`).

### 6.7 Trabalhe conosco — post-it #12 · **forma diferente** (decisão 1)

A decisão de variar proíbe reusar "lista + painel" aqui. Então: **padrão Aspen (v8, 17–22s)**.

- `JOIN THE ARCHITECTS`-equivalente em display gigante (DAQ, v7, 41s);
- grid de fotos em preto e branco com **barra de nome em `--color-accent`** sobre cada uma e seta `→`;
- hover coloriza a foto;
- lista curta de áreas com uma frase cada — **zero menção a projetos**, 100% sobre o SD, que é o pedido do post-it;
- CTA para o Pandapé.

> **[ajuste] Não há fotos da equipe** em nenhuma pasta de materiais, então valeu o fallback:
> 5 áreas em texto grande, numeradas em mono, com realce de linha no hover. A lista de
> cases-exemplo da V1 saiu, que era o pedido do feedback #12.

### 6.8 Contato — post-it #13

Referência: **DAQ (v7, 23s)** + **WeEvolveIT (v2, 58s)**.

- headline direta;
- **campos como linhas de tabela**, sem caixa, com label em mono acima — parece formulário, ocupa metade da altura;
- e-mail e telefone diretos ao lado, como alternativa ao formulário;
- opcionalmente o formulário inteiro vive num **modal** disparado por um botão único, no modelo `Start the diagnosis →` (v2, 58s). Base UI já tem o `Dialog` acessível.

Continua `mailto:` (decisão registrada).

---

## 7. Catálogo de micro-interações

Todas observadas diretamente nos frames das referências, exceto onde marcado.

| # | Interação | Origem | Onde no SD | Custo |
|---|---|---|---|---|
| 1 | **Mark 3D: metades se separam no tap** | autoral | Hero | Alto |
| 2 | Parallax do mark seguindo o ponteiro | autoral | Hero | Médio |
| 3 | Hand-off do mark para a Nav no scroll | autoral | Hero → Nav | Alto |
| 4 | **Painel que troca no clique** (lista ← → detalhe) | DAQ 33–39s | Capacidades | Médio |
| 5 | Transição por **bloco de cor full-bleed** | Pinnacl 1–4s | Números | Baixo |
| 6 | **Imagem-chip** flutuando fora de grid | Pinnacl 3–4s | Números | Baixo |
| 7 | **Hairlines diagonais** atravessando a seção | Pinnacl | Números, Sobre | Baixo |
| 8 | Contagem animada no scroll | comum | Números | Baixo (existe) |
| 9 | **Chips de filtro** + "ver portfólio completo" | WeEvolveIT 64s | Cases | Baixo (existe) |
| 10 | **Toggle de densidade** grid ↔ lista | WeEvolveIT 66s | Cases, `/cases` | Médio |
| 11 | Lista de nomes + preview no hover | Aspen 9–13s | Clientes | Médio |
| 12 | Foto P&B que coloriza no hover, com barra de nome | Aspen 17–22s | Trabalhe conosco | Baixo |
| 13 | **Rail lateral mono** com progresso de scroll | DAQ, Axiom | Global | Médio |
| 14 | Título de seção **sticky** enquanto o conteúdo rola | Identient, Checkpoint | Sobre, Cases | Baixo |
| 15 | Palavra-chave colorida dentro da headline | WeEvolveIT, Pinnacl | Hero, seções | Baixo |
| 16 | **CTA em pílula com dropdown** | Pinnacl 0–2s | Nav | Médio |
| 17 | Stagger de entrada de linhas (60ms) | DAQ 32s | Sobre | Baixo (existe `Reveal.tsx`) |
| 18 | Numeral gigante em marca d'água no card | DAQ 10–15s | Cards de case | Baixo |

Inferido a partir de frames consecutivos, não confirmável pela amostragem: a curva exata do fade+slide do painel do DAQ e da colorização do Aspen. Usar os tokens de movimento da §4.4.

**Regra de acessibilidade:** toda interação das linhas 1–3, 5, 8, 11, 12 tem estado estático sob `prefers-reduced-motion`. As de 4, 9, 10, 16 são funcionais e continuam existindo — só perdem a transição.

---

## 8. Ordem de execução

Restam **~2 dias úteis**. A ordem é por risco, não por prazer.

### Quarta 23/09 — manhã
1. **Repositório remoto + primeiro deploy na Vercel**, mesmo com a V1 no ar. Continua sendo a maior pendência do `HANDOFF.md`: sem link, não há apresentação.
2. Tokens: fonte mono, `--color-fg-body`, `--ease-spring`, `--duration-micro`.
3. Instalar e travar o Phosphor no `IconProvider`.

### Quarta 23/09 — tarde
4. **Capacidades** (§6.4) — é o post-it mais repetido, maior retorno por hora.
5. **Números full-bleed laranja** (§6.3) — alto impacto visual, custo baixo.
6. **Corte seco às 14h** para o 3D: o que não estiver de pé, degrada conforme §5.6.

### Quinta 24/09 — manhã
7. **Cases** (§6.5) — tirar o índice dos 16 da home.
8. **Sobre** (§6.6) e **Trabalhe conosco** (§6.7) — são os mais baratos.
9. **Contato** (§6.8).

### Quinta 24/09 — tarde, até 18h
10. Nav, rail lateral, contraste, ícones no chrome.
11. Revisão visual contra o Figma.
12. Lighthouse no build de produção + JSON-LD `Organization`.
13. **Congelar às 17h.** A última hora é para deploy e verificação, não para código novo.

---

## 9. Decisões em aberto

Bloqueiam implementação. Precisam de resposta até **quarta de manhã**.

| # | Decisão | Impacto se atrasar |
|---|---|---|
| 1 | **Quais métricas entram no bloco de números.** Implementado com as 3 de uso real (AVA, e-commerce, DEVstart) e "20 produtos" removido. Falta a equipe confirmar se representam o SD como um todo | Conteúdo no ar, sujeito a troca |
| 2 | ~~"Capacidades" permanece ou vira "O que fazemos"~~ — resolvido: rótulo visível trocado, slugs preservados | — |
| 3 | ~~Há fotos da equipe?~~ — não há; §6.7 usa o fallback | — |
| 4 | E-mail, telefone e endereço reais | `[pendente]` na UI de §6.8 |
| 5 | Hex oficial do laranja SENAI — hoje `#E84910`, extraído de PNG | Agora é **cor de seção inteira**, não mais detalhe. Errar é mais caro do que era |

Pendências de asset herdadas do `HANDOFF.md` que continuam valendo: badge "AWS Partner", prints em alta de Itinerários Nacionais / SEIF / NR-10 / AudioXP, favicon e imagem OG.

---

## 10. V2.1 — reestruturação de 23/09 (tarde)

Segunda rodada de feedback, depois de ver a V2 rodando. Três mudanças estruturais.

### 10.1 Cases e Escala viraram uma seção só

O problema: os números grandes **já eram dos cases**, então as duas seções contavam
a mesma história duas vezes — e empilhar vários números full-bleed um abaixo do outro
fez as imagens-chip colidirem com a tipografia.

A seção agora é **a segunda da home, logo depois do Hero**, e funciona como cena presa
na tela (`position: sticky`, altura de N telas):

| | |
|---|---|
| Esquerda | nome do projeto (display-xl) · `ver o case ↗` · descrição curta |
| Direita | o número que aquele projeto produziu, alinhado à direita |
| Fundo | laranja SENAI + grade ortogonal fina em branco 25% |
| Scroll | troca o projeto — **não** empilha números |
| Hover no texto | revela as telas daquele case no vão central (ref Axiom Power, lista "Latest news") |
| Rodapé da cena | indicador de passo + CTA `ver todos os 20 cases` |

Conteúdo em `src/content/scenes.ts`. Só entram cases com um indicador **já declarado**
em `cases.ts` — por isso o SEIF, que não tem métrica, fica de fora. Quatro cenas:
AVA SENAI, E-commerce, DEVstart, SAEP IA.

**[ajuste] `AnimatePresence mode="wait"` foi removido** do nome e do número: a saída e a
entrada somavam 800ms e a troca ficava visivelmente atrasada em relação ao scroll. Agora
a `key` remonta o bloco e ele entra direto, em 350ms.

**[ajuste] O hover usa listeners nativos**, não `onPointerEnter` do React: `pointerenter`
e `pointerleave` não borbulham, e o React os sintetiza a partir de `pointerover`/`pointerout`.
Nativo é exatamente o que um mouse real dispara — e é testável.

### 10.2 "O que fazemos" virou "Nossos serviços" — terceira seção

Título literal, sem frase inventada. O par lista + painel saiu; ficou uma lista simples
em que **o scroll destaca um serviço por vez**: o ativo em branco com a pergunta do cliente
e o CTA para o portfólio filtrado, os demais em `fg-faint` com o detalhe recolhido.
Título e contador `01 / 06` ficam sticky à esquerda. Âncora: `#servicos`.

### 10.3 Sobre — quarta seção, cards que fecham no scroll

Resumo do Soluções Digitais à esquerda; **Missão › Visão › Valores** à direita em três
cards que se comportam como o bloco "principles" do Pinnacl: um aberto por vez, e o
scroll fecha o anterior para abrir o próximo. O card aberto é `--color-accent`.

> **Pendência de conteúdo:** missão, visão e valores vêm do Branding Guide da **SENAI
> Soluções Digitais (2022)**, que é o material que existe. O pedido foi pelos da **FIESC** —
> esse texto precisa vir da equipe, não dá para deduzir.

### 10.4 O que ficou desatualizado

O espelho no Figma (página "V2 do site") ainda mostra a estrutura anterior: Cases e Escala
separados, "O que fazemos" como lista + painel, e Sobre como três linhas de tabela.
Precisa ser refeito nessas três seções.

---

## 11. V2.2 — a cena de cases redesenhada (23/09, fim de tarde)

### 11.1 Estrutura fixa de cada projeto

Sempre nesta ordem, à esquerda: **logotipo do projeto → número grande → resumo curto →
CTA para o case**. As telas do produto sangram pela direita, ocupando 58% da largura.
Abaixo, constante entre os projetos, o CTA `ver outros cases`.

Três projetos, os que têm logotipo próprio e indicador declarado:

| # | Projeto | Número |
|---|---|---|
| 01 | AVA | +230 mil usuários ativos |
| 02 | E-commerce | +150 mil matrículas efetivadas |
| 03 | Espaço do Estudante | +45 mil usuários |

Logotipos em `public/cases/<slug>/wordmark.png`. São servidos com `unoptimized`: o
otimizador do Next travava ao ampliar o do AVA (402px de origem para 640) e, em
logotipo desse tamanho, otimizar não ganha nada.

### 11.2 Transição contínua, não corte

O progresso do scroll dentro da seção vira um número fracionário (`0 → n`), e a
opacidade e o deslocamento de cada slide saem dele a cada quadro. Os últimos 30% do
scroll de cada projeto são a dissolvência para o próximo, com `smoothstep`. Medido:
a meio caminho da transição os dois slides coexistem em 0,66 / 0,34.

Nada disso passa por `setState` — os estilos são escritos direto no DOM dentro de um
`requestAnimationFrame`. O React só re-renderiza quando o projeto dominante muda, para
a navegação vertical acompanhar.

O último projeto **não** desbota no fim da seção: fica em cheio até sair da tela.

### 11.3 Número grande limitado a 3 linhas

`BigNumber` mede o elemento depois do layout e reduz a fonte em passos de 14% (até 10
passos) enquanto passar de 3 linhas. Com o conteúdo atual nunca chega a agir; num teste
com um rótulo de 12 palavras a 375px, a fonte caiu de 40px para 13,9px e coube em 3.

### 11.4 Navegação vertical escopada

A barra de passos no canto inferior saiu. No lugar, à esquerda, a mesma linguagem do
rail de seções — traço + rótulo mono — mas listando os projetos, e **só dentro desta
seção**. O rail global da página foi removido (`SectionRail` deletado).

## 12. V2.3 — Serviços enxuto e Sobre invertido (23/09)

### 12.1 Serviços

Saíram o kicker `serviços`, o contador `01 / 06` e o numeral à esquerda de cada linha.
O título da seção é literal: **"Serviços"**. A lista deixou de ser uma coluna de 7 e
passou a ocupar a largura do container, com o nome do serviço em `display-md` — é ele o
elemento tipográfico da seção (ref studiors). O destaque por scroll continua igual.

Os numerais `01`–`06` continuam em `capabilities.ts` e aparecem em /cases; aqui saíram
porque disputavam atenção com o título, que agora é o protagonista.

### 12.2 Sobre nós

Título literal **"Sobre nós"**, sem kicker. Texto institucional novo, entregue pronto
pela equipe (dois parágrafos, em `src/content/site.ts` → `about.paragraphs`). Saiu a
frase "Software que precisa funcionar todo dia…". Saiu também o accordion de
missão/visão/valores (ref Pinnacl): os textos continuam, em faixa fixa de três colunas,
para não competir com os números.

Quatro números entraram, todos vindos da equipe:

| Número | Rótulo | Nota |
|---|---|---|
| 2007 | Ano de fundação | Quase duas décadas de mercado. |
| 20+ | Grandes projetos | Ativos simultaneamente. |
| 100% | Foco no cliente | No sucesso e na experiência de quem usa. |
| Nacional | Atuação | Nasceu em Santa Catarina e hoje atende todo o Brasil. |

O primeiro abre a seção numa faixa cheia em Azul Solução, com a nota à esquerda e o
número à direita; os outros três formam a linha abaixo dela. É a leitura do bloco
"Our Track Record" da referência (Checkpoint Research), traduzida para a paleta do
manual — sem gradiente, sem glow.

### 12.3 A transição entre Serviços e Sobre

A referência muda o fundo da seção inteira enquanto ela sobe a tela, e inverte o texto
junto. Interpolar preto → branco direto não funciona: no meio do caminho fundo e texto
passam os dois por volta de `rgb(128)` e nada tem contraste. Medido no navegador antes
de descartar: aos 50% da entrada, fundo `rgb(127)` e texto `rgb(128)`.

A solução é uma **varredura**, não um crossfade. A mesma composição é desenhada duas
vezes — a escura em fluxo normal, a clara por cima em `absolute inset-0`, recortada por
`clip-path: inset(Ypx 0 0 0)`. Y sai do progresso de entrada da seção:

```
t = clamp((vh - topo) / vh, 0, 1)
Y = vh * 4 * LAG * t * (1 - t)     // LAG = 0.3
```

A parábola zera nas duas pontas e chega a 0,3 de uma tela no meio: a borda branca fica
atrás do topo da seção, então dá para ver uma faixa escura de Sobre antes de o branco
subir por ela. O texto que cruza a linha aparece metade branco, metade preto — a borda
dura da referência.

Verificado no navegador: as duas camadas coincidem em todos os 28 nós de texto (nenhum
deslocamento), o pico do atraso bate em 230,3px com `vh` de 768 exatamente quando o topo
da seção está a meia tela, e a seção fica branca e estável depois da entrada. Sem
horizontal overflow a 375px.

A camada clara é `aria-hidden` e `pointer-events-none`: quem usa leitor de tela lê a
escura, uma vez só. Com `prefers-reduced-motion`, só a camada clara é renderizada.

## 13. V2.4 — Fale conosco (23/09)

Layout entregue pronto pela equipe, em mockup. Reproduzido como veio, sem acrescentar
nada: seção clara, sem título visível, símbolo do SD em contorno ao fundo, cartão
escuro à esquerda e formulário à direita.

| Peça | Como ficou |
|---|---|
| Fundo | Branco, `overflow-hidden` |
| Marca d'água | Mesmo `d` de `sd-simbolo-branco.svg`, só contorno, `vector-effect: non-scaling-stroke` (1px em qualquer escala), preto a 10%, sangrando à direita |
| Cartão | `surface-2` (#141518), raio 16px, com símbolo, contato e redes |
| Campos | `surface-2`, raio 8px, sem rótulo visível (rótulos `sr-only`) |
| Botão | Azul Solução, raio 8px, "Enviar mensagem" + seta |

O título da seção saiu — o mockup não tem um. O `h2` continua existindo como `sr-only`
para a seção manter nome acessível e o link do menu continuar fazendo sentido.

Os cantos arredondados contrariam o token de raio do resto do site (2px). Ficaram porque
são do mockup.

### 13.1 O que não foi publicado

- **Telefone.** O mockup traz `+55 (48) 91111-1111`. O DDD é de Florianópolis, mas o
  assinante é `1111-1111`: é número de preenchimento. Publicar um telefone falso é pior
  que assumir a lacuna, então a UI mostra `[telefone pendente]` no mesmo lugar.
- **YouTube.** O mockup lista LinkedIn, Instagram e YouTube. Temos URL de LinkedIn,
  Instagram e Facebook, e não dá para deduzir a do YouTube. As redes saem de
  `site.social`, então hoje aparecem as três que existem.

O e-mail `solucoesdigitais@sc.senai.br` foi adotado: é um endereço plausível no domínio
do SENAI-SC e veio do material da própria equipe. Fica marcado para confirmação, e
`NEXT_PUBLIC_CONTACT_EMAIL` tem precedência para corrigir sem novo build.

## 14. V2.5 — Nossos cases revisado (23/09)

| Pedido | Como ficou |
|---|---|
| Título menor "Nossos cases" | Rótulo mono acima do logotipo, dentro de cada projeto. O `h2` da seção segue `sr-only` com o mesmo texto |
| Texto em branco | Toda a seção passou de preto para branco sobre o laranja |
| Imagens sangrando | Mosaicos no tamanho natural, ancorados a 46% da largura e com 130% da altura da tela |
| Mosaicos por case | 1 AVA · 2 Espaço do Estudante · 3 E-commerce, na ordem em que vieram |
| Logo do e-commerce | Substituída pela versão em branco (976×81) |
| Malha menor | 6rem, era 8,75rem |

A ordem da cena passou a seguir a numeração das imagens: AVA → Espaço do Estudante →
E-commerce. Antes o E-commerce era o segundo.

### 14.1 Por que a imagem não é mais `object-cover`

Os mosaicos vêm inclinados e com fundo transparente. Esticá-los até a largura do quadro
(`w-[58%]` + `object-cover` + `scale-125`, como estava) recortava por cima da inclinação
e o resultado parecia uma faixa reta. Agora a imagem é desenhada pela **altura** — 130%
da tela — mantém a proporção original e o que passa do quadro é cortado pelo
`overflow-hidden` da seção. É isso que produz o corte diagonal em cima, embaixo e à
direita.

Três consequências práticas:

- **`max-w-none`.** O preflight do Tailwind aplica `max-width: 100%` em `img`; sem
  desfazer isso a imagem nunca passa da borda.
- **`sizes` sai da proporção da imagem, não da largura da tela.** A largura renderizada
  depende da altura da janela, então `sizes="90vw"` fazia o Next servir uma variante
  pequena e o mosaico saía borrado. Agora é `120 × (largura/altura) vw`.
- **Carregamento antecipado.** Os slides inativos ficam em `visibility: hidden`; com
  carregamento preguiçoso o mosaico podia aparecer só depois da transição. Abaixo de
  `lg` a imagem é `display: none`, então o celular continua sem baixar nada.

Medido a 1440×900: folga de 144px entre a coluna de texto e o mosaico, imagens
terminando em 1794 / 2820 / 2204 (tela de 1440), nenhum overflow horizontal, números em
3 linhas no tamanho cheio. A 1024 a folga é de 41px.

### 14.2 O custo do texto branco

Branco sobre `#E84910` dá **3,91:1**. Passa AA para texto grande (logotipo e número
grande), mas fica abaixo do mínimo de 4,5:1 para o resumo e para os rótulos mono
(`nossos cases`, `ver o case`, `ver outros cases`). Em preto eram 5,37:1 e tudo passava.
Registrado aqui e no componente; é decisão de design, não descuido.

## 15. V2.6 — correções de 23/09 (noite)

### 15.1 Fale conosco

- **Volta ao preto.** O mockup foi exportado sobre branco, mas a seção fica no fundo
  da página. Cartão e campos seguem em `surface-2`, que é a mesma relação de tom do
  mockup; a marca d'água passou a ser branca a 10%.
- **Cartão alinhado à esquerda.** O símbolo estava esticado pelo `align-items: stretch`
  do flex e parecia centralizado. `items-start` resolve.
- **Sem linha de apoio em repouso.** O aviso "abre o seu app de e-mail" saiu do estado
  parado, como no mockup. A região `aria-live` continua existindo e só fica visível
  depois do envio.
- **Hairline no cartão e nos campos** — acréscimo meu, não do mockup: `surface-2` sobre
  preto dá 1,35:1 e desaparece em projetor, que é onde o site vai ser apresentado.
  Remover é tirar `border border-line` dos dois lugares.

### 15.2 Nossos cases

- **Rótulo em 16px.** Novo utilitário `meta-lg`, para não sobrescrever `meta` com
  arbitrária.
- **O número não vaza mais por baixo do mosaico.** A causa não era a posição da imagem:
  `max-w` limita a caixa, mas palavra não quebra no meio, e "matrículas" em 61px mede
  ~640px numa coluna de 416px — o texto saía da caixa e passava por baixo da imagem.
  `BigNumber` agora também compara `scrollWidth` com `clientWidth` e reduz até caber.
  Consequência visível: o número do e-commerce fica em 45px enquanto os outros ficam em
  61px. É o preço de manter as 3 linhas e a coluna estreita.
- **AVA maior.** `zoom` virou dado por cena em `scenes.ts`: 1,6 para o AVA (quase
  quadrado, precisava de mais altura para preencher a tela) e 1,3 para os deitados.
  `sizes` acompanha o `zoom`, senão o Next serviria variante pequena demais.

Medido a 1440×900: folga de 144px entre texto e mosaico nos três projetos, nenhum
`scrollWidth` excedendo a caixa, AVA com 1440px de altura contra 1170px dos outros.
A 1024×768 a folga é de 41px e o AVA fica com 1229px.
