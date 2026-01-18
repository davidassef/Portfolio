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
        en: "Full-Stack Developer & AI Engineer",
        ptBR: "Desenvolvedor Full-Stack & Engenheiro de IA"
    },
    email: "davidassef@email.com", // TODO: Atualizar com email real
    github: "https://github.com/davidassef",
    linkedin: "https://linkedin.com/in/davidassef", // TODO: Atualizar
    whatsapp: "+5585996642441",
    location: "Fortaleza, CE - Brazil",
    avatarUrl: "https://avatars.githubusercontent.com/u/161294012?v=4",
    bio: {
        en: "AI-driven developer building smart tools with ML, voice cloning & music generation. Clean code advocate with a passion for automated testing and comprehensive documentation.",
        ptBR: "Desenvolvedor orientado por IA construindo ferramentas inteligentes com ML, clonagem de voz e geração de música. Defensor do código limpo com paixão por testes automatizados e documentação abrangente."
    }
};

// ============================================
// PROJETOS
// ============================================
export const projects: Project[] = [
    // PROJETOS PÚBLICOS
    {
        id: "omentalista",
        name: "O Mentalista",
        description: {
            en: "Challenge the Mentalist! An interactive web application that guesses the symbol you thought of. Combines a mathematical trick with a paginated user interface, creating a perfect illusion.",
            ptBR: "Desafie o Mentalista! Uma aplicação web interativa que adivinha o símbolo que você pensou. Combina um truque matemático com uma interface de utilizador com paginação, criando uma ilusão perfeita."
        },
        technologies: ["HTML", "CSS", "JavaScript"],
        githubUrl: "https://github.com/davidassef/OMentalista",
        liveUrl: "https://davidassef.github.io/OMentalista",
        isPrivate: false,
        stars: 0,
        featured: true,
        status: 'production'
    },
    {
        id: "pokeapi",
        name: "PokeAPI Pokédex",
        description: {
            en: "A modern Pokédex built with TypeScript and the PokeAPI. Features include search, filtering, and detailed Pokémon information with a sleek UI.",
            ptBR: "Uma Pokédex moderna construída com TypeScript e PokeAPI. Inclui busca, filtros e informações detalhadas dos Pokémon com uma interface elegante."
        },
        technologies: ["TypeScript", "React", "REST API", "CSS"],
        githubUrl: "https://github.com/davidassef/PokeAPI",
        isPrivate: false,
        stars: 2,
        featured: true,
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
            en: "Web scraper for extracting Amazon product listings from search results. Demonstrates modern data extraction techniques with rate limiting.",
            ptBR: "Web scraper para extrair listagens de produtos da Amazon. Demonstra técnicas modernas de extração de dados com rate limiting."
        },
        technologies: ["JavaScript", "Node.js", "Puppeteer"],
        githubUrl: "https://github.com/davidassef/Amazon-Search",
        isPrivate: false,
        stars: 1,
        featured: false,
        status: 'production'
    },
    {
        id: "desafio-2025",
        name: "Animal Adoption System",
        description: {
            en: "Technical challenge implementing smart matching algorithms to assist animal adoption processes. Connects pets with ideal adopters.",
            ptBR: "Desafio técnico implementando algoritmos de matching inteligente para auxiliar processos de adoção de animais. Conecta pets com adotantes ideais."
        },
        technologies: ["JavaScript", "Algorithms", "Logic"],
        githubUrl: "https://github.com/davidassef/desafio-davidassef-2025",
        isPrivate: false,
        stars: 0,
        featured: false,
        status: 'challenge'
    },

    // PROJETOS PRIVADOS (Em Homologação/Desenvolvimento)
    {
        id: "recibofast",
        name: "ReciboFast",
        description: {
            en: "Complete receipt management solution for rent and other income types. Features user authentication, database management, and maximum data protection with encryption.",
            ptBR: "Solução completa de gerenciamento de recibos para aluguéis e outras receitas. Inclui autenticação de usuários, gerenciamento de banco de dados e máxima proteção de dados com criptografia."
        },
        technologies: ["TypeScript", "React", "Next.js", "PostgreSQL", "Go"],
        isPrivate: true,
        stars: 0,
        featured: true,
        status: 'staging'
    },
    {
        id: "jinglemagico",
        name: "Jingle Mágico",
        description: {
            en: "AI-powered jingle generator that creates custom audio content using advanced music generation technology. Enables users to create unique audio for their projects.",
            ptBR: "Gerador de jingles com IA que cria conteúdo de áudio personalizado usando tecnologia avançada de geração de música. Permite que usuários criem áudio único para seus projetos."
        },
        technologies: ["TypeScript", "React", "AI/ML", "Audio API"],
        isPrivate: true,
        stars: 0,
        featured: true,
        status: 'staging'
    },
    {
        id: "lotoscore",
        name: "LotoScore",
        description: {
            en: "Lottery analytics platform with statistical analysis, number frequency tracking, and pattern recognition for Brazilian lotteries. Advanced data visualization.",
            ptBR: "Plataforma de análise de loteria com análise estatística, rastreamento de frequência e reconhecimento de padrões para loterias brasileiras. Visualização avançada de dados."
        },
        technologies: ["TypeScript", "React", "Next.js", "PostgreSQL"],
        isPrivate: true,
        stars: 0,
        featured: true,
        status: 'staging'
    },
    {
        id: "central-ia",
        name: "Central IA Infrastructure",
        description: {
            en: "AI infrastructure management system for orchestrating multiple AI services, models, and APIs. Centralized dashboard for monitoring and deployment.",
            ptBR: "Sistema de gerenciamento de infraestrutura de IA para orquestrar múltiplos serviços, modelos e APIs. Dashboard centralizado para monitoramento e deploy."
        },
        technologies: ["Python", "Docker", "FastAPI", "Redis"],
        isPrivate: true,
        stars: 0,
        featured: true,
        status: 'staging'
    }
];

// ============================================
// HABILIDADES (Atualizado com novas skills)
// ============================================
export const skills: Skill[] = [
    // Frontend
    { name: "React", icon: "react", category: "frontend", level: 5 },
    { name: "Next.js", icon: "nextjs", category: "frontend", level: 5 },
    { name: "TypeScript", icon: "typescript", category: "frontend", level: 5 },
    { name: "Tailwind CSS", icon: "tailwind", category: "frontend", level: 5 },
    { name: "HTML/CSS", icon: "html", category: "frontend", level: 5 },

    // Backend
    { name: "Node.js", icon: "nodejs", category: "backend", level: 4 },
    { name: "Go", icon: "go", category: "backend", level: 4 },
    { name: "Python", icon: "python", category: "backend", level: 5 },
    { name: "Django", icon: "django", category: "backend", level: 4 },
    { name: "PostgreSQL", icon: "postgresql", category: "backend", level: 4 },
    { name: "SQL Server", icon: "sqlserver", category: "backend", level: 4 },

    // AI & ML
    { name: "Machine Learning", icon: "ml", category: "ai", level: 4 },
    { name: "OpenAI API", icon: "openai", category: "ai", level: 5 },
    { name: "LangChain", icon: "langchain", category: "ai", level: 4 },
    { name: "Dify & RAG", icon: "dify", category: "ai", level: 4 },
    { name: "Voice Cloning", icon: "voice", category: "ai", level: 4 },

    // Tools & DevOps
    { name: "Git", icon: "git", category: "tools", level: 5 },
    { name: "Docker", icon: "docker", category: "tools", level: 4 },
    { name: "AWS (Lightsail/S3)", icon: "aws", category: "tools", level: 4 },
    { name: "Vercel", icon: "vercel", category: "tools", level: 5 },
    { name: "Render", icon: "render", category: "tools", level: 4 },
    { name: "Linux/VPS", icon: "linux", category: "tools", level: 4 },
];

// ============================================
// EXPERIÊNCIA (Atualizado: 2025+)
// ============================================
export const experiences: Experience[] = [
    {
        id: "intra-solucoes",
        company: "Intra Soluções",
        role: {
            en: "Junior Full-Stack Developer",
            ptBR: "Desenvolvedor Full-Stack Júnior"
        },
        description: {
            en: "Working on enterprise web applications, developing frontend and backend features, integrating APIs, and collaborating with the team to deliver high-quality software solutions.",
            ptBR: "Trabalhando em aplicações web empresariais, desenvolvendo funcionalidades frontend e backend, integrando APIs e colaborando com a equipe para entregar soluções de software de alta qualidade."
        },
        startDate: "2025",
        technologies: ["React", "Next.js", "Node.js", "PostgreSQL"],
        location: "Fortaleza, CE",
        isCurrent: true
    },
    {
        id: "freelance",
        company: "Freelance",
        role: {
            en: "Full-Stack Developer & AI Consultant",
            ptBR: "Desenvolvedor Full-Stack & Consultor de IA"
        },
        description: {
            en: "Building custom software solutions for clients, specializing in AI integration, web applications, and automation tools. Delivering end-to-end solutions from architecture to deployment.",
            ptBR: "Construindo soluções de software personalizadas para clientes, especializado em integração de IA, aplicações web e ferramentas de automação. Entregando soluções completas da arquitetura ao deploy."
        },
        startDate: "2025",
        technologies: ["React", "Next.js", "Python", "Go", "AI/ML"],
        location: "Remote"
    }
];

// ============================================
// ESTATÍSTICAS
// ============================================
export const stats = {
    projects: projects.length,
    technologies: new Set(skills.map(s => s.name)).size,
    yearsExp: 1
};
