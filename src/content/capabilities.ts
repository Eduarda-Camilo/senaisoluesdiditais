import type { Capability } from "./types";

/**
 * Taxonomia única de capacidades. Consolida os 11 chips + 6 especialidades do site atual
 * e os 9 serviços da página /aws.html. O detalhe da parceria AWS mora em partners.ts
 * (seção Parcerias e página /aws); aqui Cloud continua como serviço e aponta para lá. Cada capacidade aponta para os cases que a comprovam.
 *
 * `description` resume o serviço só com o que está em `offer` (pedido de 24/09: a
 * frase "na voz do cliente" que existia antes era simulada e saiu).
 */
export const capabilities: Capability[] = [
  {
    slug: "plataformas",
    index: "01",
    name: "Plataformas e sistemas",
    description:
      "Plataformas web e sistemas de gestão de ponta a ponta, integrados aos sistemas corporativos, com autenticação única e perfis de acesso — inclusive o redesign e a modernização de produtos em operação.",
    offer: [
      "Plataformas web e sistemas de gestão de ponta a ponta",
      "Integração entre sistemas corporativos (SGN, AVA, CRM, e-commerce)",
      "Autenticação única e perfis de acesso",
      "Redesign e modernização de produtos em operação",
    ],
    cases: ["ava-senai", "e-commerce", "seif", "crm", "espaco-do-estudante", "itinerarios-nacionais", "eleva", "devstart", "sgn"],
  },
  {
    slug: "ia",
    index: "02",
    name: "Inteligência artificial aplicada",
    description:
      "IA generativa para produção de conteúdo técnico e pedagógico, recomendação e personalização, análise preditiva e chatbots e assistentes baseados em documentos.",
    offer: [
      "IA generativa para produção de conteúdo técnico e pedagógico",
      "Recomendação e personalização",
      "Análise preditiva",
      "Chatbots e assistentes baseados em documentos",
    ],
    cases: ["saep-ia", "habilita", "orbie", "predicao-evasao", "chatbot-sgn", "hub-ia", "e-commerce", "lab-digital"],
  },
  {
    slug: "mobile",
    index: "03",
    name: "Aplicativos móveis",
    description:
      "Apps Android e iOS conectados às plataformas web existentes, incluindo experiências de realidade aumentada em dispositivos móveis.",
    offer: [
      "Apps Android e iOS",
      "Experiências conectadas a plataformas web existentes",
      "Realidade aumentada em dispositivos móveis",
    ],
    cases: ["seif", "espaco-do-estudante", "senai-space", "orbie"],
  },
  {
    slug: "dados",
    index: "04",
    name: "Dados e analytics",
    description:
      "Data warehouse e integração de fontes, pipelines automatizados e processamento de big data, painéis de BI e monitoramento e modelos de machine learning versionados.",
    offer: [
      "Data warehouse e integração de fontes",
      "Pipelines automatizados e processamento de big data",
      "Painéis de BI e monitoramento",
      "Modelos de machine learning versionados",
    ],
    cases: ["dw", "crm", "itinerarios-nacionais", "predicao-evasao"],
  },
  {
    slug: "imersivo",
    index: "05",
    name: "Realidade virtual, aumentada e simulação",
    description:
      "Simuladores em realidade virtual e mista, objetos 3D interativos em realidade aumentada, bancadas virtuais conectadas a equipamentos reais e modelagem e animação 3D.",
    offer: [
      "Simuladores em realidade virtual e mista",
      "Objetos 3D interativos em realidade aumentada",
      "Bancadas virtuais conectadas a equipamentos reais",
      "Modelagem e animação 3D",
    ],
    cases: ["senai-space", "lab-digital", "nr-10", "audioxp"],
  },
  {
    slug: "cloud",
    index: "06",
    name: "Cloud e DevOps na AWS",
    description:
      "Arquitetura de soluções escaláveis, seguras e resilientes na AWS, migração e modernização de aplicações para a nuvem, pipelines de CI/CD e práticas DevOps, containers, bancos gerenciados e observabilidade.",
    offer: [
      "Arquitetura de soluções escaláveis, seguras e resilientes",
      "Migração e modernização de aplicações para a nuvem",
      "Pipelines de CI/CD e práticas DevOps",
      "Containers, bancos gerenciados e observabilidade",
    ],
    // PENDENTE: confirmar quais cases rodam em AWS antes de listar evidências aqui.
    cases: [],
  },
];

/**
 * Serviços oferecidos como filtro e como lista (home, rodapé, /cases): todos
 * menos Cloud e DevOps na AWS, que tem seção própria (Parcerias) e a página /aws
 * — decisão de 25/09. Nenhum case está marcado com ela.
 */
export const filterCapabilities = capabilities.filter((c) => c.slug !== "cloud");

export function getCapability(slug: string) {
  return capabilities.find((c) => c.slug === slug);
}
