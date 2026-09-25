/**
 * Parcerias — seção da home e página /aws (pedido de 25/09: "Cloud e DevOps na
 * AWS" não pode ser só mais uma linha de Serviços).
 *
 * Fonte: página atual https://senaisolucoesdigitais.com.br/aws.html (lida em
 * 25/09). O nível da parceria é o do selo publicado lá: Select Tier Services —
 * não "Premier", que a sugestão de layout usava e não é o nosso nível.
 * Os textos dos serviços e as etiquetas são os da página; só o agrupamento em
 * três frentes (migrar, construir, operar) é novo.
 *
 * PENDENTE: não há case confirmado rodando em AWS (ver capabilities.ts), então
 * nenhuma das duas telas cita projeto.
 */

export interface AwsService {
  name: string;
  description: string;
  tags: string[];
}

export interface AwsGroup {
  id: string;
  title: string;
  /** Resumo da frente, usado no cartão da home. */
  summary: string;
  services: AwsService[];
}

export const aws = {
  tier: "AWS Partner",
  tierLevel: "Select Tier Services",
  network: "AWS Partner Network (APN)",
  intro:
    "O SENAI Soluções Digitais integra o AWS Partner Network (APN), a rede global de parceiros da Amazon Web Services. Unimos a experiência de quem desenvolve soluções para a indústria desde 2007 às melhores práticas de nuvem da AWS para modernizar aplicações, migrar cargas de trabalho e construir produtos digitais escaláveis, seguros e resilientes.",
  groups: [
    {
      id: "migrar",
      title: "Migrar e modernizar",
      summary: "Assessment e migração de aplicações on-premises e evolução de legados para arquiteturas cloud-native.",
      services: [
        {
          name: "Migração para AWS",
          description:
            "Assessment, planejamento e execução de migração de aplicações e infraestrutura on-premises para AWS.",
          tags: ["Assessment", "Cloud Migration"],
        },
        {
          name: "Modernização de aplicações",
          description:
            "Refatoração e evolução de aplicações legadas para arquiteturas modernas, cloud-native e escaláveis na AWS.",
          tags: ["Cloud Native", "Refatoração"],
        },
      ],
    },
    {
      id: "construir",
      title: "Construir na nuvem",
      summary: "Arquitetura Well-Architected, APIs e microsserviços, e IA generativa com Amazon Bedrock.",
      services: [
        {
          name: "Arquitetura de soluções AWS",
          description: "Definição de arquiteturas escaláveis, seguras e resilientes seguindo boas práticas da AWS.",
          tags: ["Well-Architected", "Segurança"],
        },
        {
          name: "Desenvolvimento cloud native",
          description:
            "Desenvolvimento de aplicações web, APIs, microsserviços e integrações utilizando boas práticas para execução em AWS.",
          tags: ["APIs", "Microsserviços"],
        },
        {
          name: "Inteligência artificial generativa",
          description:
            "Soluções de IA generativa com o Amazon Bedrock e outros serviços da AWS para automatizar processos, criar assistentes inteligentes, potencializar a produtividade e transformar dados em conhecimento, com segurança, escalabilidade e integração aos sistemas corporativos.",
          tags: ["Amazon Bedrock", "IA Generativa"],
        },
      ],
    },
    {
      id: "operar",
      title: "Operar com DevOps",
      summary: "Pipelines de CI/CD, containers no Amazon ECS, bancos no Amazon RDS e observabilidade no CloudWatch.",
      services: [
        {
          name: "DevOps e CI/CD",
          description:
            "Implantação de pipelines de integração e entrega contínua, automação de deploys e práticas DevOps.",
          tags: ["Pipelines", "Automação"],
        },
        {
          name: "Containers e orquestração",
          description: "Implantação e operação de aplicações em containers utilizando Amazon ECS.",
          tags: ["Amazon ECS", "Containers"],
        },
        {
          name: "Bancos de dados gerenciados",
          description: "Implantação e administração de bancos de dados gerenciados utilizando Amazon RDS.",
          tags: ["Amazon RDS", "Alta Disponibilidade"],
        },
        {
          name: "Observabilidade",
          description:
            "Monitoramento de aplicações e infraestrutura utilizando Amazon CloudWatch e ferramentas complementares.",
          tags: ["CloudWatch", "Monitoramento"],
        },
      ],
    },
  ] satisfies AwsGroup[],
} as const;

/**
 * Texto da seção Parcerias na home (layout da equipe, Figma V4 · 1441, 25/09).
 */
export const partnersHome = {
  intro:
    "Fazemos parte da AWS Partner Network (APN), combinando nossa experiência em software com serviços AWS para migrar, construir, evoluir e operar soluções modernas, escaláveis, seguras e resilientes.",
} as const;

/**
 * Ilustração da seção Parcerias (Figma 204:569, 25/09): três planos empilhados,
 * de cima para baixo — as mesmas três frentes da página /aws. O de cima leva o
 * selo AWS Partner. `line` é a cor da linha que liga o plano ao título.
 */
export const awsJourney = [
  { id: "migrar", title: "Migrar e modernizar", line: "#ffffff" },
  { id: "construir", title: "Construir na nuvem", line: "#e84910" },
  { id: "operar", title: "Operar com DevOps", line: "#73daff" },
] as const;

/**
 * Faixa "Seja nosso parceiro": o SD não fecha a porta em uma nuvem só. Texto
 * novo (não há material de origem), escrito sem prometer programa, nível ou
 * benefício que a equipe não tenha definido.
 */
export const openPartnership = {
  title: "Seja nosso parceiro",
  text: "Estamos abertos a novas parcerias com empresas de tecnologia, fornecedores de plataforma e instituições de ensino e pesquisa. Se a sua solução soma ao que entregamos para a indústria e a educação, conte para a gente.",
} as const;
