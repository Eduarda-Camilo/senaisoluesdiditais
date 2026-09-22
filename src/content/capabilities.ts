import type { Capability } from "./types";

/**
 * Taxonomia única de capacidades. Consolida os 11 chips + 6 especialidades do site atual
 * e os 9 serviços da página /aws.html. Cada capacidade aponta para os cases que a comprovam.
 */
export const capabilities: Capability[] = [
  {
    slug: "plataformas",
    index: "01",
    name: "Plataformas e sistemas",
    problem: "Preciso de um sistema que sustente uma operação inteira — com milhares de usuários, integrações e continuidade.",
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
    problem: "Tenho um processo repetitivo e especializado que consome tempo de gente qualificada.",
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
    problem: "Meus usuários estão em campo, na escola ou na fábrica — não na frente de um computador.",
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
    problem: "Os dados existem, mas estão espalhados em fontes que não conversam.",
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
    problem: "O treinamento é perigoso, caro ou impossível de reproduzir em sala de aula.",
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
    problem: "Preciso migrar, modernizar ou escalar uma aplicação com segurança e sem parar a operação.",
    offer: [
      "Arquitetura de soluções escaláveis, seguras e resilientes",
      "Migração e modernização de aplicações para a nuvem",
      "Pipelines de CI/CD e práticas DevOps",
      "Containers, bancos gerenciados e observabilidade",
    ],
    // PENDENTE: confirmar quais cases rodam em AWS antes de listar evidências aqui.
    cases: [],
    aws: {
      badge: "AWS Partner — Select Tier Services",
      intro:
        "A SENAI Soluções Digitais integra o AWS Partner Network (APN), a rede global de parceiros da Amazon Web Services. Combinamos a experiência em soluções industriais desde 2007 com as práticas AWS para modernizar aplicações, migrar cargas de trabalho e construir produtos digitais escaláveis, seguros e resilientes.",
      services: [
        { name: "Modernização de aplicações", description: "Refatoração e evolução de aplicações legadas para arquiteturas modernas, cloud-native e escaláveis." },
        { name: "Migração para AWS", description: "Assessment, planejamento e execução da migração de aplicações e infraestrutura on-premises." },
        { name: "Desenvolvimento cloud native", description: "Aplicações web, APIs, microsserviços e integrações com boas práticas para execução na AWS." },
        { name: "DevOps e CI/CD", description: "Pipelines de integração e entrega contínua, automação de deploys e práticas DevOps." },
        { name: "IA generativa", description: "Soluções com Amazon Bedrock para automatizar processos, criar assistentes inteligentes e transformar dados." },
        { name: "Arquitetura de soluções", description: "Definição de arquiteturas escaláveis, seguras e resilientes." },
        { name: "Containers e orquestração", description: "Implantação com Amazon ECS." },
        { name: "Bancos de dados gerenciados", description: "Amazon RDS." },
        { name: "Observabilidade", description: "Monitoramento com Amazon CloudWatch." },
      ],
    },
  },
];

export function getCapability(slug: string) {
  return capabilities.find((c) => c.slug === slug);
}
