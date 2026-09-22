# Handoff — SENAI Soluções Digitais (redesign)

Snapshot do estado do projeto em **22/09/2026, ~14h20**, para retomada por outra pessoa ou outra sessão de IA. Não substitui o `CLAUDE.md` (documentação viva e completa) — é o resumo de "por onde continuar agora".

---

## 1. Onde as coisas estão

| O quê | Onde |
|---|---|
| Código | `/Users/future/Design Engineer/FIESC/Hackathon Duda e Lucas/Site SD` |
| Materiais-fonte (16 cases, manual de marca, logos) | `../Páginas dos projetos - produtos`, `../Slides logo SD`, `../Logo SENAI Soluções Digitais` |
| Referências visuais (45 imagens) | `../Referências visuais` |
| Documentação técnica/estratégica completa | [`CLAUDE.md`](CLAUDE.md) — ler primeiro ao retomar |
| Registro de uso de IA (para a apresentação) | [`docs/IA-NO-PROCESSO.md`](docs/IA-NO-PROCESSO.md) |
| Espelho visual da home | [Figma — Duda e Lucas Hackathon](https://www.figma.com/design/zDCI4bFpUmYC1fFFfcu9Yj/Duda-e-Lucas-Hackathon?node-id=6-58), frame "Home — 1440" |
| Git | 3 commits em `main`, **sem remote configurado ainda** (aguardando o repositório que vocês vão criar) |

## 2. Como rodar

```bash
cd "Site SD"
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção — já testado e passando
```

## 3. O que está pronto (funcional, buildando, sem erros de lint/tipo)

- **Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · Motion · Base UI (headless).
- **Home completa** (`/`): Hero com 4 números reais → 4 cases editoriais (AVA SENAI, E-commerce, SEIF, SAEP IA) + índice dos outros 16 → Capacidades (accordion, 6 categorias, AWS integrada) → Sobre → Trabalhe conosco → Contato (form via `mailto:`).
- **`/cases`**: 20 produtos com filtros por capacidade e segmento.
- **`/cases/[slug]`**: 20 páginas de case com ficha técnica, indicadores, galeria.
- **Conteúdo:** 100% extraído dos materiais reais (16 `.md` da revista + 4 do site atual), zero dado inventado. Modelo tipado em `src/content/`.
- **Design tokens** do manual de marca oficial (2022) em `src/app/globals.css` — cores, tipografia (Syne + Space Grotesk), espaçamento, movimento.
- **SEO básico:** metadata por rota, sitemap, robots, redirects do site antigo (`/aws`, `/aws.html`, `/portfolio.html`).
- **Acessibilidade:** `prefers-reduced-motion` respeitado, navegação por teclado no menu/accordion (Base UI cuida disso), semântica de headings.
- **Home replicada no Figma** com variáveis e text styles vinculados (não é print) — ver link acima. Só a home; `/cases` e `/cases/[slug]` ainda não foram.

## 4. O que falta (nada disso bloqueia o build — está tudo marcado como `[pendente]` na própria UI)

### Conteúdo (depende da equipe)
- E-mail, telefone e endereço de contato reais
- Confirmar quais dos 20 cases rodam em AWS (a capacidade "Cloud e DevOps" está sem evidências vinculadas)
- Indicadores/métricas para: SEIF, Itinerários Nacionais, Habilita, Data Warehouse, Lab Digital, NR-10, AudioXP, e os 4 cases só descritos no site atual (SGN, Chatbot SGN, Hub IA, Predição de Evasão)
- Confirmar hex oficial do laranja SENAI (usei `#E84910`, extraído de um PNG que vocês enviaram)

### Assets
- Badge oficial "AWS Partner"
- Prints em resolução maior para Itinerários Nacionais, SEIF, NR-10 e AudioXP (os originais são de revista A5 e ficam pequenos ampliados)
- Qualquer material visual para os 4 cases sem pasta própria
- Favicon / imagem OG padrão

### Desenvolvimento
- **Repositório remoto + deploy na Vercel** — maior pendência prática; sem isso não há link para apresentar
- Revisão visual comparando com o Figma (ajustes finos de espaçamento que só aparecem olhando lado a lado)
- Lighthouse / Core Web Vitals no build de produção
- JSON-LD `Organization` para SEO

## 5. Decisões já tomadas — não reabrir sem motivo novo

Todas com justificativa completa em `CLAUDE.md > Decisões`. Resumo:

- Estrutura **híbrida**: home longa + `/cases` + `/cases/[slug]` (não single-page, não multipage puro)
- **Base UI** como kit de acessibilidade (headless) — tudo visível é autoral, para não parecer "template de IA"
- **Dark mode** com a paleta de azuis nomeados do manual de marca 2022 + branco + laranja SENAI em detalhes
- **Syne + Space Grotesk** (não Bahnschrift, que o manual cita mas não pode ser usada na web)
- AWS **não é página isolada** — vira a capacidade "06 Cloud e DevOps" com redirect de `/aws`
- Formulário de contato = `mailto:` por enquanto (decisão da equipe, não limitação técnica)
- Sem nomes de líderes técnicos nas fichas dos cases; SEIF não nomeia Vale/Samarco

## 6. Prazo

**Commit final: quinta-feira 24/09/2026, 18h.** Faltam ~2 dias úteis. Site precisa estar hospedado antes da apresentação (10 min, banca avalia Design/UX, Apresentação, Proposta de valor, Uso de IA e Funcionalidade — pesos iguais).

## 7. Próximo passo recomendado

Nesta ordem de impacto:
1. Resolver o **repositório Git remoto** e fazer o primeiro deploy na Vercel (mesmo incompleto) — ter um link ativo cedo reduz risco.
2. Preencher os `[pendente]` de contato (e-mail real muda a percepção de "site funcional" imediatamente).
3. Revisão visual comparando site ↔ Figma.
4. Só depois: métricas adicionais, badge AWS, prints em alta.
