import type { Case, CaseImage } from "./types";

/**
 * 16 cases da revista de projetos + 4 do site atual (resumidos).
 * Textos reorganizados para web; fatos, números e entregas preservados
 * exatamente como no material. Nomes de líderes técnicos omitidos por decisão.
 */
export const cases: Case[] = [
  // ───────────────────────── EDITORIAIS ─────────────────────────
  {
    slug: "ava-senai",
    name: "AVA SENAI",
    tagline: "Ambiente Virtual de Aprendizagem do SENAI, redesenhado em 2025.",
    tier: "editorial",
    segment: "educacao",
    capabilities: ["plataformas"],
    context: [
      "O Ambiente Virtual de Aprendizagem (AVA) é a plataforma digital de ensino do SENAI. Reúne cursos, avaliações, conteúdos e ferramentas de interação, conectando estudantes e docentes em um único ambiente.",
      "Em 2025 foi ao ar o redesign completo da interface, com foco em experiência do usuário, acessibilidade, usabilidade e desempenho.",
    ],
    challenge:
      "Modernizar uma plataforma de ensino em operação, com centenas de milhares de usuários ativos, sem interromper o serviço.",
    deliverables: [
      "Navegação mais intuitiva",
      "Novas funcionalidades de acompanhamento da aprendizagem",
      "Design responsivo adaptado a diferentes dispositivos",
      "Melhorias de acessibilidade e desempenho",
    ],
    metrics: [
      { value: "+230 mil", label: "usuários ativos" },
      { value: "+32 mil", label: "salas de aula criadas" },
    ],
    team: [
      { role: "Tech lead", count: 1 },
      { role: "Gerente de projetos", count: 1 },
      { role: "Analista de sistemas", count: 1 },
      { role: "Desenvolvedores", count: 4 },
      { role: "QA", count: 1 },
      { role: "Designer", count: 1 },
    ],
    cover: { src: "/cases/ava-senai/cover.png", width: 2388, height: 2787, alt: "Mosaico de telas do AVA SENAI: painel do aluno, cursos e atividades" },
    hero: { src: "/cases/ava-senai/detalhe.webp", width: 2304, height: 2547, alt: "Mosaico de telas do AVA SENAI: login, avaliações, cursos e perfil do aluno" },
    gallery: [
      { src: "/cases/ava-senai/g1.png", width: 493, height: 522, alt: "AVA SENAI em celulares" },
      { src: "/cases/ava-senai/g2.png", width: 540, height: 275, alt: "Tela Meus Cursos do AVA SENAI" },
    ],
    logo: { src: "/cases/ava-senai/logo.svg", width: 308, height: 55 },
    source: "revista",
  },
  {
    slug: "e-commerce",
    name: "E-commerce SENAI/SESI",
    tagline: "Loja de cursos integrada aos sistemas corporativos, com matrícula online em todo o estado.",
    tier: "editorial",
    segment: "educacao",
    capabilities: ["plataformas", "ia"],
    context: [
      "O E-commerce do SENAI/SESI é a plataforma responsável pela divulgação e comercialização dos cursos da instituição.",
      "Integrado aos sistemas corporativos — SGN, AVA e Espaço do Estudante — permite compra, inscrição e matrícula online de estudantes em todo o estado, para cursos presenciais e a distância.",
    ],
    challenge:
      "Aprimorar continuamente a experiência de compra, oferecendo um ambiente moderno, acessível e seguro, integrado aos processos internos da instituição.",
    deliverables: [
      "Reformulação do fluxo de compra e matrícula, com login unificado e processo mais intuitivo e responsivo",
      "Reestruturação da área nobre do site, com destaque aos principais produtos e campanhas",
      "Recursos de acessibilidade digital: VLibras e modo de alto contraste",
      "Recomendação de cursos com Inteligência Artificial",
      "Jornada única simplificada para cursos gratuitos",
    ],
    metrics: [
      { value: "120 mil", label: "usuários ativos", note: "média no último mês" },
      { value: "+40 mil", label: "acessos semanais", note: "via pesquisa orgânica" },
      { value: "+150 mil", label: "matrículas efetivadas" },
    ],
    team: [
      { role: "Desenvolvedores", count: 10 },
      { role: "Tech lead", count: 1 },
      { role: "Designer", count: 1 },
      { role: "QA", count: 3 },
      { role: "Analista de sistemas", count: 1 },
      { role: "Analista de suporte", count: 1 },
      { role: "Gestor de projetos", count: 1 },
    ],
    cover: { src: "/cases/e-commerce/cover.png", width: 791, height: 690, alt: "Catálogo de cursos do e-commerce SENAI/SESI" },
    gallery: [
      { src: "/cases/e-commerce/g1.png", width: 758, height: 662, alt: "Tela de entrar ou criar conta" },
      { src: "/cases/e-commerce/g2.png", width: 629, height: 552, alt: "Página de curso de manutenção de computadores" },
      { src: "/cases/e-commerce/g3.png", width: 624, height: 548, alt: "Página inicial com promoção" },
    ],
    source: "revista",
  },
  {
    slug: "seif",
    name: "SEIF",
    tagline: "Segurança, Informação e Formação: gestão de segurança do trabalho em tempo real, hoje em escala nacional.",
    tier: "editorial",
    segment: "sst",
    capabilities: ["plataformas", "mobile"],
    context: [
      "Plataforma de monitoramento e gestão de segurança no trabalho. Gestores, equipes e responsáveis pela segurança acompanham em tempo real o status dos trabalhadores em campo e verificam o cumprimento da legislação de SST vigente — prevenindo acidentes, multas e reclamações trabalhistas.",
      "Iniciou a operação apenas em Santa Catarina, na área de engenharia civil. Em 2024 tornou-se nacional e foi ampliado para várias áreas de atuação. A evolução seguinte leva o sistema à gestão de terceiros em grandes empresas nacionais.",
    ],
    deliverables: [
      "Aplicação web",
      "Aplicativo móvel para Android e iOS",
      "Nacionalização da plataforma",
      "Evolução para gestão de terceiros em grandes empresas",
    ],
    outcomeNote: "De uma operação estadual para uma plataforma nacional, com ampliação da equipe em função da relevância adquirida.",
    team: [
      { role: "Tech lead", count: 1 },
      { role: "Desenvolvedores", count: 13 },
      { role: "QA", count: 4 },
      { role: "Designers", count: 4 },
      { role: "Analistas", count: 3 },
      { role: "DBA", count: 2 },
      { role: "DevOps", count: 1 },
      { role: "Gerente de projetos", count: 1 },
    ],
    startDate: "2017-02-15",
    cover: { src: "/cases/seif/cover.png", width: 903, height: 850, alt: "Três celulares com o app SEIF: apresentação, portal e login" },
    gallery: [
      { src: "/cases/seif/g1.png", width: 548, height: 410, alt: "Painel de indicadores de trabalhadores no SEIF" },
    ],
    logo: { src: "/cases/seif/logo.svg", width: 476, height: 169 },
    source: "revista",
  },
  {
    slug: "saep-ia",
    name: "SAEP IA",
    tagline: "IA generativa para criar e revisar itens de avaliação da educação profissional.",
    tier: "editorial",
    segment: "educacao",
    capabilities: ["ia", "plataformas"],
    context: [
      "Aplicação que utiliza Inteligência Artificial Generativa para a criação e o aprimoramento de itens de avaliação do Sistema de Avaliação da Educação Profissional e Tecnológica (SAEP).",
      "Desenvolvida com base nos guias oficiais de referência do método de ensino e nos padrões de qualidade definidos por especialistas em avaliação educacional, alcançando alinhamento pedagógico, unicidade e aderência aos critérios técnicos do SAEP.",
      "O elaborador seleciona parâmetros — área tecnológica, curso, capacidade avaliada, subfunção, conhecimentos associados, nível de dificuldade e quantidade de alternativas — e a IA gera itens com contexto, comando, alternativas, justificativas técnicas e metadados estruturados, considerando a taxonomia de Bloom.",
    ],
    challenge:
      "Reduzir o tempo de produção de itens de avaliação e ampliar a escalabilidade do processo avaliativo sem abrir mão do rigor pedagógico.",
    deliverables: [
      "Geração automática de itens a partir de parâmetros pedagógicos",
      "Revisão assistida por IA: análise de itens existentes com sugestões de melhoria técnica, pedagógica e linguística (em evolução)",
      "Duas vertentes: versão para docentes (acesso via Meu SENAI) e versão da Prova SAEP, com acesso restrito controlado pelo Departamento Nacional",
    ],
    metrics: [
      { value: "90%", label: "dos docentes utilizando IA", note: "nas oficinas do SAEP" },
      { value: "50%", label: "de redução no tempo de elaboração de itens" },
    ],
    team: [
      { role: "Tech lead", count: 1 },
      { role: "Gerente de projetos", count: 1 },
      { role: "Programador", count: 1 },
      { role: "Analista", count: 1 },
    ],
    startDate: "2024-08-12",
    cover: { src: "/cases/saep-ia/cover.png", width: 1272, height: 1055, alt: "Conjunto de telas do SAEP IA" },
    gallery: [
      { src: "/cases/saep-ia/g1.png", width: 1002, height: 709, alt: "Gerador de itens do SAEP IA" },
      { src: "/cases/saep-ia/g2.png", width: 967, height: 673, alt: "Revisão técnica assistida por IA" },
      { src: "/cases/saep-ia/g3.png", width: 999, height: 703, alt: "Seleção de questões para revisão" },
    ],
    logo: { src: "/cases/saep-ia/logo.svg", width: 159, height: 65 },
    source: "revista",
  },

  // ───────────────────────── PADRÃO ─────────────────────────
  {
    slug: "devstart",
    name: "DEVstart",
    tagline: "Formação inicial em desenvolvimento front-end, flexível e no ritmo de cada estudante.",
    tier: "standard",
    segment: "educacao",
    capabilities: ["plataformas"],
    context: [
      "Programa de formação inicial para quem quer ingressar ou se recolocar na área de desenvolvimento de software, especialmente como desenvolvedor front-end. Voltado a jovens e adultos, profissionais em transição de carreira e quem busca a primeira oportunidade em tecnologia.",
      "Ensina HTML, CSS e JavaScript, além de frameworks como React, e permite estudar de forma flexível, em casa e no próprio ritmo.",
    ],
    deliverables: [
      "Plataforma de estudo flexível e autoinstrucional",
      "Pré-cadastro, teste de nivelamento e jornada do desenvolvedor",
    ],
    metrics: [
      { value: "+70 mil", label: "estudantes impactados" },
      { value: "+10", label: "municípios catarinenses investindo em educação tecnológica" },
      { value: "8", label: "departamentos regionais utilizando o DEVstart nacional" },
    ],
    team: [
      { role: "Tech lead", count: 1 },
      { role: "Designer", count: 1 },
      { role: "Desenvolvedores", count: 4 },
      { role: "Suporte técnico", count: 1 },
    ],
    cover: { src: "/cases/devstart/cover.png", width: 1091, height: 482, alt: "Mosaico de telas do DEVstart" },
    gallery: [
      { src: "/cases/devstart/g1.png", width: 574, height: 408, alt: "Tela de pré-cadastro do DEVstart" },
      { src: "/cases/devstart/g2.png", width: 366, height: 242, alt: "Teste de nivelamento" },
    ],
    logo: { src: "/cases/devstart/logo.svg", width: 358, height: 74 },
    source: "revista",
  },
  {
    slug: "crm",
    name: "CRM + SGN",
    tagline: "Gestão de contratos integrada ao Dynamics 365, com faturamento centralizado.",
    tier: "standard",
    segment: "gestao",
    capabilities: ["plataformas", "dados"],
    context: [
      "Projeto de transformação digital: desenvolvimento de um novo módulo de gestão de contratos no SGN, integrado ao novo CRM Dynamics 365.",
    ],
    challenge: "Modernizar e automatizar os processos de contratos e faturamento, tornando-os mais ágeis e centralizados.",
    deliverables: [
      "Módulo de gestão de contratos no SGN",
      "Integração com o CRM Dynamics 365",
      "Cotações integradas ao SGN",
    ],
    metrics: [
      { value: "+R$ 1,25 mi", label: "em faturamento" },
      { value: "463", label: "contratos finalizados" },
      { value: "492", label: "cotações integradas ao SGN" },
    ],
    team: [
      { role: "Tech leads", count: 2 },
      { role: "Gerente de projetos", count: 1 },
      { role: "Analista de sistemas", count: 1 },
      { role: "Desenvolvedores", count: 5 },
      { role: "Suporte", count: 1 },
      { role: "QA", count: 2 },
      { role: "DBA", count: 1 },
    ],
    cover: { src: "/cases/crm/cover.png", width: 1376, height: 1316, alt: "Telas do módulo de contratos do SGN integrado ao CRM" },
    logo: { src: "/cases/crm/logo.svg", width: 119, height: 46 },
    source: "revista",
  },
  {
    slug: "orbie",
    name: "Orbie",
    tagline: "Plataforma educacional gamificada com trilhas personalizadas e questões geradas por IA.",
    tier: "standard",
    segment: "educacao",
    capabilities: ["plataformas", "mobile", "ia"],
    context: [
      "Plataforma educacional gamificada para aprimorar o processo de aprendizagem de forma interativa. Baseada em desafios, pontuações e rankings, estimula o engajamento e o desenvolvimento contínuo dos estudantes.",
      "Também é um recurso para profissionais da educação, pais e alunos: permite planejar e criar trilhas de aprendizado personalizadas com atividades gamificadas.",
    ],
    deliverables: [
      "Geração automática de questões por IA",
      "Inclusão e acessibilidade por leitor de telas",
      "Sistema de métricas de desempenho dos jogadores",
      "Sistema de atendimento e FAQ",
      "Implementação das matrizes BNCC e SESI",
    ],
    metrics: [
      { value: "+100", label: "escolas" },
      { value: "+10 mil", label: "alunos" },
    ],
    team: [
      { role: "Tech lead", count: 1 },
      { role: "Analista de sistemas", count: 1 },
      { role: "Desenvolvedores", count: 4 },
      { role: "Designer", count: 1 },
      { role: "Gerente de projetos", count: 1 },
    ],
    cover: { src: "/cases/orbie/cover.png", width: 1265, height: 918, alt: "Conjunto de celulares com o app Orbie" },
    gallery: [
      { src: "/cases/orbie/g1.png", width: 932, height: 789, alt: "Perfil e conquistas no Orbie" },
      { src: "/cases/orbie/g2.png", width: 804, height: 602, alt: "Classificação de jogadores" },
    ],
    logo: { src: "/cases/orbie/logo.svg", width: 307, height: 90 },
    source: "revista",
  },
  {
    slug: "senai-space",
    name: "SENAI Space",
    tagline: "Mais de 600 objetos interativos em realidade aumentada para o ensino técnico.",
    tier: "standard",
    segment: "educacao",
    capabilities: ["imersivo", "mobile"],
    context: [
      "Aplicativo de realidade aumentada com mais de 600 objetos didáticos interativos, distribuídos em 21 áreas de interesse — Automação, Construção Civil, Eletrônica, Metalmecânica, Telecomunicações e outras.",
      "Desenvolvido com a tecnologia de código aberto ARCore, não exige licenças externas para operação.",
    ],
    deliverables: [
      "Objetos 3D interativos que apoiam docentes no desenvolvimento de conteúdos",
      "Todo o material dos cursos reunido em uma única plataforma",
    ],
    metrics: [
      { value: "+10 mil", label: "downloads" },
      { value: "+6 mil", label: "usuários ativos" },
      { value: "+600", label: "objetos interativos", note: "em 21 áreas" },
    ],
    team: [
      { role: "Tech lead", count: 1 },
      { role: "QA", count: 1 },
      { role: "Programadores", count: 2 },
      { role: "Artistas 3D", count: 4 },
      { role: "Designer", count: 1 },
      { role: "Gerente de projetos", count: 1 },
    ],
    startDate: "2021-03-01",
    cover: { src: "/cases/senai-space/cover.png", width: 512, height: 668, alt: "Celular com o SENAI Space e cartões de objetos 3D" },
    gallery: [
      { src: "/cases/senai-space/g1.png", width: 361, height: 577, alt: "Carro em realidade aumentada no SENAI Space" },
      { src: "/cases/senai-space/g2.png", width: 750, height: 466, alt: "Mosaico de cartões de modelos 3D" },
    ],
    source: "revista",
  },
  {
    slug: "eleva",
    name: "Eleva",
    tagline: "Educação corporativa do Sistema FIESC: capacitação contínua para colaboradores.",
    tier: "standard",
    segment: "educacao",
    capabilities: ["plataformas"],
    context: [
      "Iniciativa de Educação Corporativa do Sistema FIESC, criada para estimular o aprendizado contínuo e o desenvolvimento dos colaboradores, facilitando o acesso a oportunidades de capacitação.",
    ],
    deliverables: [
      "Acesso a cursos em educação, saúde, liderança e competências digitais",
      "Liberdade para o colaborador escolher os temas do próprio desenvolvimento",
      "Calendário com cursos e prazos para acompanhar o progresso",
      "Dashboards de evolução e engajamento para gestão do aprendizado",
    ],
    metrics: [
      { value: "1.218", label: "estudantes cadastrados" },
      { value: "95,9%", label: "taxa de ativação" },
    ],
    team: [
      { role: "Tech lead", count: 1 },
      { role: "Gerente de projetos", count: 1 },
      { role: "Analista de sistemas", count: 1 },
      { role: "Desenvolvedores", count: 4 },
      { role: "Designer", count: 1 },
      { role: "QA", count: 1 },
    ],
    cover: { src: "/cases/eleva/cover.png", width: 1422, height: 1196, alt: "Mosaico de telas do Eleva" },
    gallery: [{ src: "/cases/eleva/g1.png", width: 589, height: 694, alt: "Eleva em celulares" }],
    logo: { src: "/cases/eleva/logo.svg", width: 219, height: 154 },
    source: "revista",
  },
  {
    slug: "espaco-do-estudante",
    name: "Espaço do Estudante",
    tagline: "App que conecta escolas, alunos e responsáveis: notas, frequência, agenda e rematrícula.",
    tier: "standard",
    segment: "educacao",
    capabilities: ["mobile", "plataformas", "ia"],
    context: [
      "Plataforma que conecta escolas, alunos e responsáveis. Reúne acompanhamento de desempenho, gestão de documentos, agenda digital, rematrículas e comunicação integrada.",
      "Conta com recomendações personalizadas de cursos e recursos de inteligência artificial para aprimorar a experiência, com foco em organização e segurança das informações.",
    ],
    deliverables: ["Acesso a notas", "Agenda digital", "Frequência", "Informações sobre os cursos"],
    metrics: [{ value: "+45 mil", label: "usuários" }],
    team: [
      { role: "Tech lead", count: 1 },
      { role: "Gerente de projetos", count: 1 },
      { role: "Analista de sistemas", count: 1 },
      { role: "Desenvolvedores", count: 4 },
      { role: "QA", count: 1 },
    ],
    startDate: "2024-01-01",
    cover: { src: "/cases/espaco-do-estudante/cover.png", width: 2157, height: 1253, alt: "Mosaico de telas do Espaço do Estudante" },
    gallery: [
      { src: "/cases/espaco-do-estudante/g1.png", width: 770, height: 554, alt: "Tela de login do Espaço do Estudante" },
      { src: "/cases/espaco-do-estudante/g2.png", width: 359, height: 475, alt: "Agenda e notas em celulares" },
    ],
    logo: { src: "/cases/espaco-do-estudante/logo.svg", width: 499, height: 239 },
    source: "revista",
  },
  {
    slug: "itinerarios-nacionais",
    name: "Itinerários Nacionais",
    tagline: "Ferramenta para construir itinerários formativos da educação profissional em escala nacional.",
    tier: "standard",
    segment: "educacao",
    capabilities: ["plataformas", "dados"],
    context: [
      "O IN é a ferramenta responsável por criar o Itinerário Formativo — o conjunto de etapas, trajetórias, possibilidades e arranjos que compõem a organização curricular da Educação Profissional e Tecnológica para uma Área Tecnológica.",
    ],
    challenge: "Otimizar a gestão de comitês e a construção de itinerários formativos, com dados consistentes e sem duplicidade.",
    deliverables: [
      "Interface para criação e validação de itinerários pelos comitês",
      "Infográfico de aproveitamento de estudos",
      "Banco de dados otimizado, sem duplicidades",
      "Perfis de usuário configuráveis com regras por funcionalidade",
      "Autenticação única (SSO) integrada ao IDP SENAI",
      "Exportação de dados em PDF",
    ],
    outcomeNote: "Todos os Departamentos Regionais poderão inserir seus cursos no sistema para se tornarem nacionais.",
    team: [
      { role: "Tech lead", count: 1 },
      { role: "Analista de sistemas", count: 1 },
      { role: "Desenvolvedores", count: 5 },
      { role: "Designer", count: 1 },
      { role: "QA", count: 1 },
      { role: "Gestor de projetos", count: 1 },
      { role: "DevOps", count: 1 },
      { role: "DBA", count: 1 },
    ],
    startDate: "2024-01-01",
    cover: { src: "/cases/itinerarios-nacionais/cover.png", width: 1018, height: 1033, alt: "Mosaico de telas dos Itinerários Nacionais" },
    gallery: [{ src: "/cases/itinerarios-nacionais/g1.png", width: 543, height: 506, alt: "Painel de gráficos e tabela" }],
    logo: { src: "/cases/itinerarios-nacionais/logo.svg", width: 424, height: 109 },
    source: "revista",
  },
  {
    slug: "habilita",
    name: "Plataforma Habilita",
    tagline: "Diagnóstico de lacunas e trilhas de aprendizagem para a indústria, geradas com IA.",
    tier: "standard",
    segment: "industria",
    capabilities: ["ia", "plataformas"],
    context: [
      "O Habilita é um programa da FIESC voltado à resolução de gaps nas funções de trabalhadores da indústria. A plataforma apoia o diagnóstico e a geração de trilhas de aprendizagem, oferecendo uma visão estruturada das necessidades de desenvolvimento.",
    ],
    deliverables: [
      "Geração de cards: IA cria automaticamente os cards aplicados nos diagnósticos de lacunas, reduzindo drasticamente o tempo de produção",
      "Geração de trilhas: IA sugere trilha personalizada com matriz curricular, número de módulos e carga horária por curso",
      "Conteúdo customizável conforme a realidade da empresa e atualizado dinamicamente com apoio da IA",
    ],
    outcomeNote: "Grande diminuição no tempo de criação de cards e trilhas.",
    team: [
      { role: "Tech lead", count: 1 },
      { role: "QA", count: 1 },
      { role: "Programadores", count: 3 },
      { role: "Designer", count: 1 },
      { role: "Gerente de projetos", count: 1 },
    ],
    startDate: "2024-07-17",
    cover: { src: "/cases/habilita/cover.png", width: 977, height: 694, alt: "Listagem de empresas na Plataforma Habilita" },
    gallery: [
      { src: "/cases/habilita/g1.png", width: 790, height: 639, alt: "Geração de cards de diagnóstico" },
      { src: "/cases/habilita/g2.png", width: 839, height: 677, alt: "Opções de geração de trilhas" },
    ],
    logo: { src: "/cases/habilita/logo.svg", width: 499, height: 63 },
    source: "revista",
  },
  {
    slug: "dw",
    name: "Data Warehouse",
    tagline: "Plataforma de dados que integra fontes dos Departamentos Regionais para análise estratégica.",
    tier: "standard",
    segment: "gestao",
    capabilities: ["dados"],
    context: [
      "Construção de um ambiente de data warehouse para promover a maturidade da gestão dos Departamentos Regionais (SESI/SENAI) por meio da estruturação e integração de dados.",
      "Um repositório central que integra dados de diversas fontes, acessível por ferramentas de BI e SQL para analistas, engenheiros de dados e tomadores de decisão.",
    ],
    deliverables: [
      "Estruturação do Data Warehouse e integração com o Data Lake do Departamento Nacional",
      "Pipelines de dados automatizados e ambiente de processamento de Big Data",
      "Camadas Delta Lake (landing, bronze, silver, gold) com Apache Spark e Python",
      "Versionamento de modelos de machine learning",
      "Painéis de BI e monitoramento; documentação, repasse e treinamento",
    ],
    team: [
      { role: "Tech lead", count: 1 },
      { role: "Gerente de projetos", count: 1 },
      { role: "Analista de sistemas", count: 1 },
      { role: "Desenvolvedores", count: 4 },
      { role: "Designer", count: 1 },
      { role: "QA", count: 1 },
    ],
    cover: { src: "/cases/dw/cover.svg", width: 1187, height: 842, alt: "Diagrama de arquitetura da plataforma de dados" },
    logo: { src: "/cases/dw/logo.svg", width: 197, height: 100 },
    source: "revista",
  },

  // ───────────────────────── RESUMIDOS (piloto / não lançados) ─────────────────────────
  {
    slug: "lab-digital",
    name: "Laboratório Digital",
    tagline: "Bancada de instalações elétricas simulada — e conectada a uma bancada real.",
    tier: "brief",
    segment: "educacao",
    capabilities: ["imersivo", "ia"],
    context: [
      "Simulação do funcionamento de uma bancada didática de instalações elétricas, com diversos exercícios. Além da simulação virtual, permite interagir remotamente com uma bancada real: o aluno aciona motores e dispositivos relacionados aos exercícios.",
      "Disponível em versões desktop, mobile e realidade virtual, sem exigir instalação, com tutor virtual baseado em IA.",
    ],
    deliverables: [
      "Conexão entre bancada virtual e bancada real",
      "Três versões do mesmo aplicativo: desktop, mobile e VR",
      "Tutor virtual baseado em IA",
    ],
    team: [
      { role: "Tech lead", count: 1 },
      { role: "Programadores Unity", count: 3 },
      { role: "Modeladores/animadores 3D", count: 2 },
      { role: "QA", count: 1 },
    ],
    startDate: "2024-05-01",
    status: "piloto",
    cover: { src: "/cases/lab-digital/cover.png", width: 1053, height: 759, alt: "Tablet com o simulador de bancada elétrica" },
    gallery: [
      { src: "/cases/lab-digital/g1.png", width: 745, height: 554, alt: "Painel de atividades" },
      { src: "/cases/lab-digital/g2.png", width: 579, height: 364, alt: "Tela de login do Laboratório Digital" },
    ],
    source: "revista",
  },
  {
    slug: "nr-10",
    name: "NR-10 SESI",
    tagline: "Trilhas de alta e baixa tensão em realidade virtual para treinamento de segurança.",
    tier: "brief",
    segment: "sst",
    capabilities: ["imersivo"],
    context: [
      "Aplicativo em realidade virtual que permite testar, de forma prática, os conhecimentos de sala de aula sobre a troca de disjuntores em baixa tensão e de isoladores em alta tensão em uma subestação elétrica industrial.",
      "Terá também uma versão via navegador, para quem não tem acesso a óculos VR.",
    ],
    deliverables: [
      "Simulação das trilhas completas de alta e baixa tensão",
      "Tablet virtual para consultar os passos em tempo real",
      "Ambiente realista e funcional, com seleção de equipamentos de proteção",
    ],
    team: [
      { role: "Tech lead", count: 1 },
      { role: "Programadores Unity", count: 2 },
      { role: "Modeladores/animadores 3D", count: 3 },
      { role: "QA", count: 1 },
    ],
    startDate: "2024-06-01",
    status: "em-desenvolvimento",
    cover: { src: "/cases/nr-10/cover.png", width: 412, height: 421, alt: "Subestação elétrica no simulador NR-10" },
    gallery: [
      { src: "/cases/nr-10/g1.png", width: 412, height: 421, alt: "Transformador elétrico no simulador" },
      { src: "/cases/nr-10/g2.png", width: 412, height: 421, alt: "Seleção de equipamentos no exterior" },
      { src: "/cases/nr-10/g3.png", width: 339, height: 606, alt: "Modelo 3D de painel elétrico de baixa tensão" },
    ],
    source: "revista",
  },
  {
    slug: "audioxp",
    name: "AudioXP",
    tagline: "Realidade virtual e mista para estudar o aparelho auditivo humano.",
    tier: "brief",
    segment: "educacao",
    capabilities: ["imersivo"],
    context: [
      "Aplicativo em realidade virtual e mista (VR/MR) para estudar a composição e o funcionamento do aparelho auditivo humano, com simulação de dano auditivo e identificação de componentes.",
    ],
    deliverables: [
      "Duas trilhas imersivas que simulam, de forma sonora e visual, a propagação do som e a progressão dos danos auditivos",
      "Alternância entre realidade mista e realidade virtual com um toque",
      "Tutorial interativo desde a ambientação até as principais funcionalidades",
      "Publicado na loja da Meta, com gestão de acesso de usuários pelo administrador",
    ],
    team: [
      { role: "Tech lead", count: 1 },
      { role: "Designer", count: 1 },
      { role: "Programador Unity", count: 1 },
      { role: "Modelador/animador 3D", count: 1 },
      { role: "QA", count: 1 },
    ],
    cover: { src: "/cases/audioxp/cover.png", width: 570, height: 401, alt: "Ouvido com ondas sonoras no AudioXP" },
    gallery: [
      { src: "/cases/audioxp/g1.png", width: 218, height: 288, alt: "Menu de anatomia do ouvido" },
      { src: "/cases/audioxp/g2.png", width: 218, height: 289, alt: "Aparelho auditivo" },
      { src: "/cases/audioxp/g3.png", width: 218, height: 289, alt: "Exposição a ruído" },
    ],
    logo: { src: "/cases/audioxp/logo.svg", width: 213, height: 200 },
    source: "revista",
  },

  // ───────────────────────── DO SITE ATUAL (sem material visual) ─────────────────────────
  {
    slug: "sgn",
    name: "SGN",
    tagline: "Plataforma de Gestão do Negócio que gere toda a educação do SENAI e do SESI em Santa Catarina.",
    tier: "brief",
    segment: "gestao",
    capabilities: ["plataformas"],
    context: ["Plataforma de Gestão do Negócio, responsável por gerir toda a educação do SENAI e do SESI de Santa Catarina."],
    deliverables: [],
    source: "site-atual",
  },
  {
    slug: "chatbot-sgn",
    name: "Chatbot SGN",
    tagline: "Chatbots personalizados a partir dos documentos de cada cliente.",
    tier: "brief",
    segment: "gestao",
    capabilities: ["ia"],
    context: [
      "Plataforma para criação de chatbots personalizados, baseados nos documentos fornecidos pelo cliente, oferecendo interações automatizadas e adaptadas às necessidades de cada negócio.",
    ],
    deliverables: [],
    source: "site-atual",
  },
  {
    slug: "hub-ia",
    name: "Hub IA",
    tagline: "Uma única API para integrar chatbots, tradução e análise de sentimentos em qualquer aplicação.",
    tier: "brief",
    segment: "gestao",
    capabilities: ["ia"],
    context: [
      "Plataforma centralizada que permite a qualquer aplicação integrar funcionalidades de IA — chatbots, tradução, análise de sentimentos — por meio de uma única API, eliminando a necessidade de construir infraestrutura própria de IA.",
    ],
    deliverables: [],
    source: "site-atual",
  },
  {
    slug: "predicao-evasao",
    name: "Predição de Evasão",
    tagline: "Análise preditiva que identifica antecipadamente alunos com maior risco de abandono.",
    tier: "brief",
    segment: "educacao",
    capabilities: ["ia", "dados"],
    context: [
      "Sistema de análise preditiva de evasão escolar da FIESC, desenvolvido para identificar de forma antecipada os alunos com maior risco de abandono nos cursos oferecidos pela instituição.",
    ],
    deliverables: [],
    source: "site-atual",
  },
];

/**
 * Ordem da página /cases e do anterior/próximo do detalhe — a do design V3
 * (Figma "V3 do site" › "Portfólio (/cases) — 1442", node 125:317): os cases
 * com material visual primeiro, os sem imagem no fim.
 */
const designOrder = [
  "ava-senai",
  "espaco-do-estudante",
  "e-commerce",
  "orbie",
  "nr-10",
  "habilita",
  "seif",
  "saep-ia",
  "devstart",
  "crm",
  "senai-space",
  "eleva",
  "itinerarios-nacionais",
  "lab-digital",
  "audioxp",
  "dw",
  "sgn",
  "chatbot-sgn",
  "hub-ia",
  "predicao-evasao",
];

export const casesInOrder: Case[] = designOrder.map((slug) => cases.find((c) => c.slug === slug)!);

/**
 * Imagem do card de cada case, exportada do design V3 (mesmo frame acima).
 *
 * `card.webp` é a faixa direita do card de 283px de altura, recortada do começo
 * da composição de telas até a borda do card (@2x). Foi exportada sobre o
 * surface-2, então é opaca e só funciona sobre esse fundo. O número é a largura
 * do recorte em px @1x: é ela que cola a imagem à direita na mesma posição do
 * design.
 *
 * Os cases sem material visual usam o símbolo 3D (`sem-foto.webp`), como no design.
 */
const cardWidths: Record<string, number> = {
  "ava-senai": 509,
  "espaco-do-estudante": 342,
  "e-commerce": 498,
  orbie: 410,
  "nr-10": 394,
  habilita: 487,
  seif: 485,
  "saep-ia": 539,
  devstart: 442,
  crm: 474,
  "senai-space": 317,
  eleva: 472,
  "itinerarios-nacionais": 430,
  "lab-digital": 400,
  audioxp: 360,
};

export const CARD_HEIGHT = 283;

export function caseCard(c: Case): CaseImage & { placeholder: boolean } {
  const width = cardWidths[c.slug];
  if (!width) {
    return { src: "/cases/sem-foto.webp", width: 410, height: CARD_HEIGHT, alt: "", placeholder: true };
  }
  return { src: `/cases/${c.slug}/card.webp`, width, height: CARD_HEIGHT, alt: `Telas do ${c.name}`, placeholder: false };
}

/**
 * Imagem grande do detalhe (quadro de 1344 × 620). Vem da seção "Images Case
 * detail" do Figma (node 168:10796), exportada a 2× com o recorte do design;
 * o AVA usa o mosaico do próprio design do detalhe (`hero`). Cases sem material
 * visual não têm imagem — o detalhe some com o quadro.
 */
export function caseDetailImage(c: Case): CaseImage | null {
  if (c.hero) return c.hero;
  if (!cardWidths[c.slug]) return null;
  return { src: `/cases/${c.slug}/detalhe.webp`, width: 2688, height: 1240, alt: `Telas do ${c.name}` };
}

export const featuredCases = cases.filter((c) => c.tier === "editorial");

export function getCase(slug: string) {
  return cases.find((c) => c.slug === slug);
}

export function casesByCapability(slug: string) {
  return cases.filter((c) => c.capabilities.includes(slug as Case["capabilities"][number]));
}
