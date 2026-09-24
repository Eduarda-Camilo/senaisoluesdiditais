/**
 * Ícones do sistema — Phosphor.
 *
 * Duas regras, ver docs/DIRECAO-V2.md §4.3:
 *  1. Import sempre de `@phosphor-icons/react/dist/ssr`. O barrel principal é enorme
 *     e briga com RSC no Next 16.
 *  2. Ícone é chrome de interface. Conteúdo categorizado (as 6 capacidades) usa
 *     numeral mono, nunca ícone — seis ícones genéricos enfileirados é o que mais
 *     denuncia "template". Exceção: os quatro cartões de "Como é trabalhar no SD",
 *     que têm ícone no mockup da equipe (24/09) — cada um escolhido pelo conteúdo
 *     do cartão, não pelo título.
 *
 * Tamanhos permitidos: 16 / 20 / 24. Nada fora disso.
 */
export {
  ArrowRight,
  ArrowUpRight,
  CaretDown,
  Copy,
  CaretRight,
  X,
  List,
  FunnelSimple,
  SquaresFour,
  Rows,
  Plus,
  Minus,
  Pause,
  Play,
  GlobeHemisphereWest,
  RocketLaunch,
  Compass,
  TrendUp,
} from "@phosphor-icons/react/dist/ssr";

export const ICON_SIZE = { sm: 16, md: 20, lg: 24 } as const;
