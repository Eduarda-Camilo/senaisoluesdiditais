import { cases } from "./cases";

/**
 * Cenas da seção de cases — a faixa laranja logo depois do Hero.
 *
 * Cada cena é: rótulo → logotipo do projeto → número grande → resumo curto → CTA.
 * Só entram projetos que têm logotipo próprio e um indicador já declarado em
 * `cases.ts`. Nada aqui é conteúdo novo; `metric` sempre aponta para uma métrica
 * existente, pelo rótulo.
 *
 * `scene` é o mosaico de telas fornecido pela equipe (23/09/2026; AVA e Espaço
 * do Estudante trocados no mesmo dia à noite) — já vem inclinado e recortado,
 * com fundo transparente. É desenhado no tamanho natural e sangra pelas bordas
 * da seção, por isso as dimensões reais importam.
 */
export interface CaseScene {
  slug: string;
  /** Nome curto, usado como alt do logotipo e na navegação vertical. */
  short: string;
  /** Resumo em uma linha — mais curto que a tagline completa do case. */
  summary: string;
  metric: { value: string; label: string };
  wordmark: { src: string; width: number; height: number };
  /**
   * `zoom` é a altura do mosaico em relação à tela. Fica por cena porque as
   * proporções são muito diferentes.
   *
   * `left` e `top` substituem a posição padrão (46% da largura, centralizado na
   * altura) quando o recorte da imagem pede. Os cortes retos do mosaico — onde a
   * equipe cortou as telas — precisam cair fora da tela; as bordas arredondadas
   * dos aparelhos podem aparecer.
   */
  scene: {
    src: string;
    alt: string;
    width: number;
    height: number;
    zoom: number;
    left?: string;
    top?: string;
  };
}

function scene(
  slug: string,
  short: string,
  metricLabel: string,
  summary: string,
  wordmark: { src: string; width: number; height: number },
  image: CaseScene["scene"],
): CaseScene {
  const c = cases.find((x) => x.slug === slug);
  if (!c) throw new Error(`Case não encontrado: ${slug}`);
  const m = c.metrics?.find((x) => x.label === metricLabel);
  if (!m) throw new Error(`Métrica não encontrada em ${slug}: ${metricLabel}`);
  return {
    slug: c.slug,
    short,
    summary,
    metric: { value: m.value, label: m.label },
    wordmark,
    scene: image,
  };
}

export const caseScenes: CaseScene[] = [
  scene(
    "ava-senai",
    "AVA",
    "usuários ativos",
    "Ambiente Virtual de Aprendizagem do SENAI.",
    { src: "/cases/ava-senai/wordmark.png", width: 402, height: 189 },
    {
      src: "/cases/ava-senai/scene.webp",
      alt: "Telas do AVA SENAI",
      width: 1810,
      height: 1452,
      // Cortes retos na direita e embaixo; o topo e a esquerda são bordas de
      // tela. Ancorado a 3% do topo para mostrar as bordas; com zoom 1 a base
      // ainda passa da tela (a caixa tem 2rem a mais em cada ponta).
      zoom: 1,
      top: "3%",
    },
  ),
  scene(
    "espaco-do-estudante",
    "Espaço do Estudante",
    "usuários",
    "App que conecta escolas, alunos e responsáveis.",
    { src: "/cases/espaco-do-estudante/wordmark.png", width: 998, height: 260 },
    {
      src: "/cases/espaco-do-estudante/scene.webp",
      alt: "Celulares com o app Espaço do Estudante",
      width: 2000,
      height: 1161,
      // Os primeiros 24% da largura são transparentes e os aparelhos encostam
      // em cima, embaixo e à direita — com zoom 1,05 a imagem ainda passa da
      // tela nas duas pontas. `left` desconta a faixa transparente
      // (0,2375 × largura ≈ 0,43 × altura da caixa, que é 100svh + 4rem) para
      // os celulares começarem em ~44% da largura.
      zoom: 1.05,
      left: "calc(44% - 43svh - 1.75rem)",
    },
  ),
  scene(
    "e-commerce",
    "E-commerce",
    "matrículas efetivadas",
    "Loja de cursos integrada aos sistemas corporativos.",
    { src: "/cases/e-commerce/wordmark.png", width: 976, height: 81 },
    {
      src: "/cases/e-commerce/scene.webp",
      alt: "Telas do e-commerce de cursos",
      width: 2000,
      height: 1511,
      zoom: 1.3,
    },
  ),
];
