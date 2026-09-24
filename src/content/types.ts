/**
 * Modelo de conteúdo do site.
 * Fonte de verdade: materiais em "Hackathon Duda e Lucas/Páginas dos projetos - produtos"
 * e manual de marca. Nada aqui pode ser inventado — ver CLAUDE.md > Conteúdo.
 */

export type CapabilitySlug =
  | "plataformas"
  | "mobile"
  | "ia"
  | "dados"
  | "imersivo"
  | "cloud";

export type Segment = "educacao" | "industria" | "gestao" | "sst";

/** Nível de profundidade editorial — derivado da quantidade de conteúdo real disponível. */
export type CaseTier = "editorial" | "standard" | "brief";

export interface Metric {
  value: string;
  label: string;
  /** Contexto curto (ex.: "último mês") — só quando o material informa. */
  note?: string;
}

export interface TeamRole {
  role: string;
  count: number;
}

export interface CaseImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface Case {
  slug: string;
  name: string;
  /** Uma linha: o que é. */
  tagline: string;
  tier: CaseTier;
  segment: Segment;
  capabilities: CapabilitySlug[];
  /** Parágrafos de contexto (do material). */
  context: string[];
  /** Desafio/objetivo — só quando o material o declara. */
  challenge?: string;
  /** Principais entregas (do material). */
  deliverables: string[];
  metrics?: Metric[];
  /** Nota qualitativa de resultado, quando não há número (do material). */
  outcomeNote?: string;
  team?: TeamRole[];
  startDate?: string; // ISO yyyy-mm-dd
  status?: "piloto" | "em-desenvolvimento";
  cover?: CaseImage;
  /** Mosaico do design do detalhe do AVA (tem proporção própria). Os outros cases usam `caseDetailImage`. */
  hero?: CaseImage;
  gallery?: CaseImage[];
  logo?: { src: string; width: number; height: number };
  /** Origem do conteúdo, para rastreabilidade. */
  source: "revista" | "site-atual";
}

export interface Capability {
  slug: CapabilitySlug;
  index: string; // "01".."06"
  name: string;
  /** Descrição curta do serviço, montada só a partir de `offer`. */
  description: string;
  /** O que a SSD faz (do material). */
  offer: string[];
  /** Evidência: slugs de cases. */
  cases: string[];
  /** Conteúdo extra (AWS). */
  aws?: {
    badge: string;
    intro: string;
    services: { name: string; description: string }[];
  };
}
