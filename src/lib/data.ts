export interface Project {
    id: string;
    name: string;
    description: {
        en: string;
        ptBR: string;
    };
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
    imageUrl?: string;
    isPrivate: boolean;
    stars: number;
    featured: boolean;
    status?: 'production' | 'staging' | 'development' | 'challenge' | 'discontinued';
    versions?: {
        name: string;
        description: { en: string; ptBR: string };
        technologies: string[];
    }[];
}

export interface Skill {
    name: string;
    icon: string;
    category: 'frontend' | 'backend' | 'ai' | 'tools';
    level: number; // 1-5
}

export interface Experience {
    id: string;
    company: string;
    role: {
        en: string;
        ptBR: string;
    };
    description: {
        en: string;
        ptBR: string;
    };
    startDate: string;
    endDate?: string;
    technologies: string[];
    location?: string;
    isCurrent?: boolean;
}

export interface Education {
    id: string;
    institution: string;
    course: {
        en: string;
        ptBR: string;
    };
    status: 'in-progress' | 'completed' | 'paused';
    startDate: string;
    endDate?: string;
    modality?: string;
}

export interface PersonalInfo {
    name: string;
    title: {
        en: string;
        ptBR: string;
    };
    email: string;
    github: string;
    linkedin: string;
    whatsapp: string;
    location: string;
    avatarUrl: string;
    bio: {
        en: string;
        ptBR: string;
    };
}

// ============================================
// DADOS PESSOAIS
// ============================================
export const personalInfo: PersonalInfo = {
    name: "David Assef Carneiro",
    title: {
        en: "AI Engineer & Full-Stack Developer",
        ptBR: "Engenheiro de IA & Desenvolvedor Full-Stack"
    },
    email: "davidassef@gmail.com",
    github: "https://github.com/davidassef",
    linkedin: "https://www.linkedin.com/in/david-assef-carneiro-2a2891b9/",
    whatsapp: "+5585996642441",
    location: "Fortaleza, CE - Brazil",
    avatarUrl: "https://avatars.githubusercontent.com/u/161294012?v=4",
    bio: {
        en: "Software engineer who builds and ships AI products end to end. I put AI agents into production (OpenAI-powered assistant and attendant agents in an omnichannel CRM, AI-assisted ops monitoring), integrate LLM APIs (OpenAI, Claude, Gemini) and generative audio models into real products, write advanced prompts, and build MCP tooling for coding agents. I work with AI agents (Claude Code, Codex, Cursor) every day to take ideas from zero to production in days, with React, Next.js, NestJS, Go and Python, Docker deployment and observability, always owning the technical decisions.",
        ptBR: "Engenheiro de software que constrói e publica produtos de IA de ponta a ponta. Coloco agentes de IA em produção (assistente e atendente com OpenAI em um CRM omnichannel, monitoramento operacional assistido por IA), integro APIs de LLMs (OpenAI, Claude, Gemini) e modelos generativos de áudio em produtos reais, escrevo prompts avançados e construo ferramentas MCP para agentes de código. Trabalho no dia a dia com agentes de IA (Claude Code, Codex, Cursor) para levar ideias do zero à produção em poucos dias, com React, Next.js, NestJS, Go e Python, deploy com Docker e observabilidade, sempre no comando das decisões técnicas."
    }
};

// ============================================
// IDIOMAS
// ============================================
export interface Language {
    name: { en: string; ptBR: string };
    level: { en: string; ptBR: string };
}

export const languages: Language[] = [
    { name: { en: "Portuguese", ptBR: "Português" }, level: { en: "Native", ptBR: "Nativo" } },
    { name: { en: "English", ptBR: "Inglês" }, level: { en: "Upper-intermediate (B2)", ptBR: "Intermediário avançado (B2)" } }
];

// ============================================
// PROJETOS
// ============================================
export const projects: Project[] = [
    // IA — PRODUTOS EM PRODUÇÃO
    {
        id: "myinst",
        name: "MyInst (MCP)",
        description: {
            en: "Open-source vault that versions and syncs agentic context (skills, instructions, agents, hooks, memory) across projects, machines and MCP clients such as Claude Code, Codex, Cursor and Gemini CLI. Web UI, API, CLI and local MCP server, with diff, restore and an encrypted .env vault.",
            ptBR: "Cofre open source que versiona e sincroniza contexto agentic (skills, instruções, agentes, hooks, memória) entre projetos, máquinas e clientes MCP como Claude Code, Codex, Cursor e Gemini CLI. Interface web, API, CLI e servidor MCP local, com diff, restauração e cofre criptografado de .env."
        },
        technologies: ["TypeScript", "MCP", "AI Agents", "Node.js", "PostgreSQL", "Docker"],
        githubUrl: "https://github.com/davidassef/MyInst-mcp",
        isPrivate: false,
        stars: 0,
        featured: true,
        status: 'production'
    },
    {
        id: "jinglemagico",
        name: "Jingle Mágico",
        description: {
            en: "AI jingle generator built from scratch: the customer describes the jingle, gets an initial lyric, pays and receives two final audio versions generated through the Suno API. Payment webhooks, async generation via callbacks and a Telegram support bot, in production.",
            ptBR: "Gerador de jingles com IA construído do zero: o cliente descreve o jingle, recebe uma letra inicial, paga e recebe duas versões finais em áudio geradas pela API do Suno. Webhooks de pagamento, geração assíncrona por callbacks e bot de suporte no Telegram, em produção."
        },
        technologies: ["TypeScript", "React", "Node.js", "Suno API", "Stripe", "PostgreSQL"],
        liveUrl: "https://www.jinglemagico.com.br",
        isPrivate: true,
        stars: 0,
        featured: true,
        status: 'production'
    },

    // PRODUTOS EM PRODUÇÃO E PROJETOS PÚBLICOS
    {
        id: "lotoscore",
        name: "LotoScore",
        description: {
            en: "Lottery analytics platform with statistical analysis, number frequency tracking and data visualization dashboards for Brazilian lotteries.",
            ptBR: "Plataforma de análise de loterias com análise estatística, frequência de dezenas e dashboards de visualização de dados para as loterias brasileiras."
        },
        technologies: ["TypeScript", "React", "Next.js", "PostgreSQL"],
        liveUrl: "https://www.lotoscore.com.br",
        isPrivate: true,
        stars: 0,
        featured: true,
        status: 'production'
    },
    {
        id: "pokeapi",
        name: "PokeAPI Pokédex",
        description: {
            en: "A modern Pokédex built with TypeScript and the PokeAPI, with search, filters and detailed Pokémon information.",
            ptBR: "Uma Pokédex moderna construída com TypeScript e PokeAPI, com busca, filtros e informações detalhadas dos Pokémon."
        },
        technologies: ["TypeScript", "React", "REST API", "CSS"],
        githubUrl: "https://github.com/davidassef/PokeAPI",
        isPrivate: false,
        stars: 2,
        featured: false,
        status: 'production'
    },
    {
        id: "schedule-shutdown",
        name: "Schedule Shutdown",
        description: {
            en: "Windows automation tool for scheduling system shutdown/restart. Two versions available: v1 with Tkinter and v2 with modern PyQt6 interface.",
            ptBR: "Ferramenta de automação Windows para agendar desligamento/reinicialização. Duas versões disponíveis: v1 com Tkinter e v2 com interface moderna PyQt6."
        },
        technologies: ["Python", "Tkinter", "PyQt6", "Windows API"],
        githubUrl: "https://github.com/davidassef/schedule_shutdown",
        isPrivate: false,
        stars: 1,
        featured: true,
        status: 'production',
        versions: [
            {
                name: "v1 - Classic",
                description: {
                    en: "Original version with simple Tkinter interface. Lightweight and portable.",
                    ptBR: "Versão original com interface Tkinter simples. Leve e portátil."
                },
                technologies: ["Python", "Tkinter", "Windows API"]
            },
            {
                name: "v2 - Modern",
                description: {
                    en: "Modern version with PyQt6 interface. Enhanced UI with themes, system tray, and scheduled tasks.",
                    ptBR: "Versão moderna com interface PyQt6. UI aprimorada com temas, system tray e tarefas agendadas."
                },
                technologies: ["Python", "PyQt6", "Qt Designer", "Windows API"]
            }
        ]
    },
    {
        id: "amazon-search",
        name: "Amazon Search Scraper",
        description: {
            en: "Web scraper for extracting Amazon product listings from search results, with rate limiting.",
            ptBR: "Web scraper para extrair listagens de produtos da Amazon a partir da busca, com rate limiting."
        },
        technologies: ["JavaScript", "Node.js", "Puppeteer"],
        githubUrl: "https://github.com/davidassef/Amazon-Search",
        isPrivate: false,
        stars: 1,
        featured: false,
        status: 'production'
    },
    {
        id: "omentalista",
        name: "O Mentalista",
        description: {
            en: "Interactive web app that guesses the symbol you thought of, combining a mathematical trick with a paginated interface.",
            ptBR: "Aplicação web interativa que adivinha o símbolo que você pensou, combinando um truque matemático com uma interface paginada."
        },
        technologies: ["HTML", "CSS", "JavaScript"],
        githubUrl: "https://github.com/davidassef/OMentalista",
        liveUrl: "https://davidassef.github.io/OMentalista",
        isPrivate: false,
        stars: 0,
        featured: false,
        status: 'production'
    }
];

// ============================================
// HABILIDADES
// ============================================
export const skills: Skill[] = [
    // Frontend
    { name: "React", icon: "react", category: "frontend", level: 5 },
    { name: "Next.js", icon: "nextjs", category: "frontend", level: 5 },
    { name: "TypeScript", icon: "typescript", category: "frontend", level: 5 },
    { name: "Angular", icon: "angular", category: "frontend", level: 3 },
    { name: "Tailwind CSS", icon: "tailwind", category: "frontend", level: 5 },
    { name: "Vite", icon: "vite", category: "frontend", level: 4 },
    { name: "HTML/CSS", icon: "html", category: "frontend", level: 5 },

    // Backend
    { name: "Python", icon: "python", category: "backend", level: 5 },
    { name: "FastAPI", icon: "fastapi", category: "backend", level: 4 },
    { name: "Node.js", icon: "nodejs", category: "backend", level: 5 },
    { name: "NestJS", icon: "nestjs", category: "backend", level: 4 },
    { name: "Go", icon: "go", category: "backend", level: 4 },
    { name: "Django", icon: "django", category: "backend", level: 4 },
    { name: "PostgreSQL", icon: "postgresql", category: "backend", level: 4 },
    { name: "Redis & RabbitMQ", icon: "redis", category: "backend", level: 4 },
    { name: "SQL Server", icon: "sqlserver", category: "backend", level: 4 },

    // IA & ML
    { name: "LLM APIs (OpenAI, Claude, Gemini)", icon: "openai", category: "ai", level: 5 },
    { name: "Prompt Engineering", icon: "prompt", category: "ai", level: 5 },
    { name: "AI Agents & MCP", icon: "agents", category: "ai", level: 5 },
    { name: "RAG (Dify, LangChain)", icon: "dify", category: "ai", level: 4 },
    { name: "n8n Automation", icon: "n8n", category: "ai", level: 4 },
    { name: "PyTorch", icon: "pytorch", category: "ai", level: 3 },
    { name: "Hugging Face Transformers", icon: "huggingface", category: "ai", level: 3 },
    { name: "vLLM & GPU Inference", icon: "gpu", category: "ai", level: 3 },
    { name: "Voice & Audio AI", icon: "voice", category: "ai", level: 4 },
    { name: "Claude Code, Codex & Cursor", icon: "code-agents", category: "ai", level: 5 },

    // Ferramentas & DevOps
    { name: "Git", icon: "git", category: "tools", level: 5 },
    { name: "Docker", icon: "docker", category: "tools", level: 5 },
    { name: "Linux/VPS", icon: "linux", category: "tools", level: 4 },
    { name: "RunPod", icon: "runpod", category: "tools", level: 4 },
    { name: "AWS", icon: "aws", category: "tools", level: 4 },
    { name: "Vercel", icon: "vercel", category: "tools", level: 5 },
    { name: "Traefik & Nginx", icon: "traefik", category: "tools", level: 4 },
    { name: "Meta Cloud API", icon: "meta", category: "tools", level: 4 },
];

// ============================================
// EXPERIÊNCIA
// ============================================
export const experiences: Experience[] = [
    {
        id: "intra-solucoes",
        company: "Intra Soluções",
        role: {
            en: "Full-Stack Developer & AI Engineer",
            ptBR: "Desenvolvedor Full-Stack & Engenheiro de IA"
        },
        description: {
            en: "IntraSign: built from scratch a digital signature platform that cut the company's signature costs (previously WeSign) to zero and became a new revenue stream, selling signatures to partners through API integrations. Law-firm management platform for Aldairton Carvalho Advogados, built from scratch: contract management, automatic contract generation, delivery to clients and e-signature integration. IntraConnect (intraconnect.com.br): full refactor of the omnichannel WhatsApp CRM, adding Meta Cloud API, Instagram and Telegram channels, AI assistant and AI attendant agents (OpenAI), audio transcription, kanban, service funnel with automations, template-based bulk messaging, a new visual identity and UX improvements, plus Hermes, an AI-assisted production monitoring agent with Telegram alerts.",
            ptBR: "IntraSign: desenvolvi do zero uma plataforma de assinatura digital que zerou o custo da empresa com assinaturas (antes no WeSign) e passou a gerar receita, oferecendo assinaturas a parceiros por meio de integrações via API. Plataforma de gestão para o escritório Aldairton Carvalho Advogados, desenvolvida do zero: gestão de contratos, geração automática de contratos, envio aos clientes e integração com assinatura eletrônica. IntraConnect (intraconnect.com.br): refatoração completa do CRM omnichannel de WhatsApp, com Meta Cloud API, Instagram e Telegram, agentes de IA assistente e atendente (OpenAI), transcrição de áudio, kanban, funil de atendimento com automações, disparos com templates, nova identidade visual e melhorias de UX, além do Hermes, agente de monitoramento de produção assistido por IA com alertas no Telegram."
        },
        startDate: "Nov 2025",
        technologies: ["Node.js", "React", "OpenAI API", "Meta Cloud API", "PostgreSQL", "Redis", "BullMQ", "Docker"],
        location: "Fortaleza, CE",
        isCurrent: true
    },
    {
        id: "supernosso-crm",
        company: "Supernosso",
        role: {
            en: "Full-Stack Engineer (Contract)",
            ptBR: "Engenheiro Full-Stack (Contrato)"
        },
        description: {
            en: "Built from scratch a CRM platform for a supermarket chain to replace Salesforce, cutting the annual cost by almost 50x. Customer, offer and marketing-journey management with omnichannel messaging: WhatsApp rollout via Gupshup and Meta Cloud API, push, SMS and email. Event-driven NestJS/Fastify backend with RabbitMQ and Redis, Prisma with read replicas, Oracle integration and S3 storage; React/Vite frontend. Around 700 commits of my own, with automated tests.",
            ptBR: "Desenvolvi do zero uma plataforma de CRM para uma rede de supermercados, substituindo o Salesforce e reduzindo o custo anual em quase 50 vezes. Gestão de clientes, ofertas e jornadas de marketing com mensageria omnichannel: implantação do WhatsApp via Gupshup e Meta Cloud API, push, SMS e e-mail. Backend orientado a eventos com NestJS/Fastify, RabbitMQ e Redis, Prisma com réplicas de leitura, integração com Oracle e armazenamento S3; frontend React/Vite. Cerca de 700 commits próprios, com testes automatizados."
        },
        startDate: "Fev 2026",
        endDate: "Jul 2026",
        technologies: ["NestJS", "React", "RabbitMQ", "Redis", "Prisma", "Gupshup", "Meta Cloud API"],
        location: "Remoto"
    },
    {
        id: "freelance",
        company: "Freelance",
        role: {
            en: "AI Engineer & Full-Stack Developer",
            ptBR: "Engenheiro de IA & Desenvolvedor Full-Stack"
        },
        description: {
            en: "Building and shipping my own products from scratch with AI as the main lever: Jingle Mágico (AI jingle generation sold online, in production), LotoScore (lottery analytics dashboards) and MyInst (open-source MCP vault that keeps coding-agent context in sync). Full cycle: discovery, architecture, AI-assisted coding, Docker deployment on VPS, AWS and Vercel, payments and operation.",
            ptBR: "Construção e publicação de produtos próprios do zero, com IA como principal alavanca: Jingle Mágico (geração de jingles com IA vendida online, em produção), LotoScore (dashboards de análise de loterias) e MyInst (cofre MCP open source que mantém sincronizado o contexto dos agentes de código). Ciclo completo: descoberta, arquitetura, desenvolvimento assistido por IA, deploy com Docker em VPS, AWS e Vercel, pagamentos e operação."
        },
        startDate: "2024",
        technologies: ["TypeScript", "Python", "LLM APIs", "MCP", "Suno API", "Docker"],
        location: "Remoto",
        isCurrent: true
    }
];

// ============================================
// FORMAÇÃO ACADÊMICA
// ============================================
export const education: Education[] = [
    {
        id: "ads-descomplica",
        institution: "Faculdade Descomplica",
        course: {
            en: "Associate Degree in Systems Analysis and Development",
            ptBR: "Tecnólogo em Análise e Desenvolvimento de Sistemas"
        },
        status: "in-progress",
        startDate: "2024",
        endDate: "Dez 2026",
        modality: "EAD"
    }
];

// ============================================
// ESTATÍSTICAS
// ============================================
export const stats = {
    projects: projects.length,
    technologies: new Set(skills.map(s => s.name)).size,
    yearsExp: 2
};
