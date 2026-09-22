# IA no processo — registro para a apresentação

Formato: **o que a IA fez → o que a supervisão humana decidiu**. Cronológico. Cada item pode virar um slide.

## 1. Entendimento (22/09)
- **IA:** leu o briefing (34 seções) e o site atual — home, `/aws.html` e `portfolio.html` (renderizado via JS; usou browser para capturar). Identificou: links "Ver detalhes" mortos, 3 taxonomias sobrepostas (11 chips × 6 especialidades × 9 serviços AWS), cores `#1565AD/#2196F3` que não pertencem à marca, copy genérica proibida pelo próprio briefing.
- **IA:** listou riscos (prazo de 48h, cases sem métricas, tipografia ambígua) e fez 20 perguntas agrupadas por tema, marcando 6 como bloqueantes.
- **Humanos:** responderam todas; definiram posicionamento (SENAI-SC/FIESC), estrutura híbrida, Vercel, formulário mailto, dark mode, Syne.

## 2. Materiais
- **IA:** leu 16 arquivos `conteudo-textual-da-revista.md`, catalogou ~190 assets (dimensões, transparência), extraiu texto e miniaturas dos 43 slides do manual de marca.
- **IA:** descobriu que o manual define Bahnschrift (proprietária, sem licença web) e 10 azuis nomeados — e que o site atual ignorava tudo isso.
- **Humanos:** confirmaram logo atualizado (SVGs da pasta), adicionaram branco e laranja SENAI, escolheram Syne + Space Grotesk.
- **IA:** extraiu o laranja `#E84910` do PNG do logo SENAI e propôs uso restrito a detalhes.

## 3. Referências
- **IA:** montou folhas de contato das 45 referências, extraiu padrões convergentes com o conceito (índices numerados, hairlines, números+legenda, um acento) e descartou conflitos com o briefing (blobs, neon, ilustrações flat, stock).

## 4. Estratégia e direção
- **IA:** propôs conceito "Ficha técnica", taxonomia única de 6 capacidades, hierarquia de cases baseada no conteúdo disponível (editorial/padrão/resumido), integração AWS como capacidade 06 com redirect.
- **IA:** avaliou HeroUI (v3 beta, estética imposta) e shadcn (tema reconhecível) e recomendou Base UI headless.
- **Humanos:** aprovaram conceito, estrutura e kit.

## 5. Implementação
- **IA:** scaffold Next.js 16 (leu docs locais do framework para breaking changes), tokens em `@theme`, modelo de conteúdo tipado, 20 cases, 6 capacidades, componentes, rotas, sitemap/robots/redirects, script reproduzível de assets.
- **IA:** verificou no browser em 3 larguras; detectou e corrigiu bug real: elementos ficavam invisíveis após scroll rápido/âncora (IntersectionObserver não observa elementos que "pulam" a viewport) — solução: `rootMargin` superior grande.
- **IA:** ajustou escala tipográfica após ver Syne renderizada (largura da fonte tornava o h1 desproporcional).
- **Humanos:** direção visual, revisão, decisões de conteúdo.

## 6. Guardrails que a IA seguiu
- Nenhuma métrica, cliente, data ou funcionalidade fora dos materiais. Lacunas viram `[pendente]` visível.
- Trocou "soma de pessoas" por "presença de papéis nos cases" ao perceber que a soma parecia headcount.
- Removeu vínculo case↔AWS não confirmado.
- Não nomeou Vale/Samarco (decisão humana) nem líderes técnicos.
