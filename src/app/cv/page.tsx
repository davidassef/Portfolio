'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { personalInfo, skills, experiences, projects } from '@/lib/data';
import { Download, Mail, Github, Linkedin, MapPin, Phone } from 'lucide-react';

function CVContent() {
    const searchParams = useSearchParams();
    const locale = searchParams.get('lang') === 'pt-BR' ? 'pt-BR' : 'en';

    const handleDownload = () => {
        window.print();
    };

    // Agrupa skills por categoria
    const skillsPorCategoria = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) acc[skill.category] = [];
        acc[skill.category].push(skill.name);
        return acc;
    }, {} as Record<string, string[]>);

    const categoriasLabel: Record<string, { en: string; ptBR: string }> = {
        frontend: { en: 'Frontend', ptBR: 'Frontend' },
        backend: { en: 'Backend', ptBR: 'Backend' },
        ai: { en: 'AI & Machine Learning', ptBR: 'IA & Machine Learning' },
        tools: { en: 'Tools & DevOps', ptBR: 'Ferramentas & DevOps' }
    };

    // Projetos destacados
    const projetosDestacados = projects.filter(p => p.featured);

    // Textos localizados
    const t = {
        downloadPdf: locale === 'en' ? 'Download PDF' : 'Baixar PDF',
        summary: locale === 'en' ? 'Professional Summary' : 'Resumo Profissional',
        experience: locale === 'en' ? 'Experience' : 'Experiência',
        skills: locale === 'en' ? 'Technical Skills' : 'Habilidades Técnicas',
        projects: locale === 'en' ? 'Featured Projects' : 'Projetos em Destaque',
        present: locale === 'en' ? 'Present' : 'Atual',
        portfolioAt: locale === 'en' ? 'Full portfolio available at' : 'Portfólio completo em'
    };

    return (
        <div className="cv-page">
            {/* Botão de Download - escondido na impressão */}
            <button
                onClick={handleDownload}
                className="cv-download-btn no-print"
                aria-label="Download CV"
            >
                <Download size={20} />
                <span>{t.downloadPdf}</span>
            </button>

            <div className="cv-container">
                {/* Header */}
                <header className="cv-header">
                    <div className="cv-header-main">
                        <h1>{personalInfo.name}</h1>
                        <p className="cv-title">
                            {locale === 'en' ? personalInfo.title.en : personalInfo.title.ptBR}
                        </p>
                    </div>
                    <div className="cv-contact">
                        <a href={`mailto:${personalInfo.email}`}>
                            <Mail size={14} />
                            {personalInfo.email}
                        </a>
                        <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">
                            <Github size={14} />
                            github.com/davidassef
                        </a>
                        <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
                            <Linkedin size={14} />
                            linkedin.com/in/davidassef
                        </a>
                        <span>
                            <MapPin size={14} />
                            {personalInfo.location}
                        </span>
                        <a href={`https://wa.me/${personalInfo.whatsapp.replace(/\D/g, '')}`}>
                            <Phone size={14} />
                            {personalInfo.whatsapp}
                        </a>
                    </div>
                </header>

                {/* Resumo */}
                <section className="cv-section">
                    <h2>{t.summary}</h2>
                    <p className="cv-bio">
                        {locale === 'en' ? personalInfo.bio.en : personalInfo.bio.ptBR}
                    </p>
                </section>

                {/* Experiência */}
                <section className="cv-section">
                    <h2>{t.experience}</h2>
                    <div className="cv-experiences">
                        {experiences.map((exp) => (
                            <div key={exp.id} className="cv-experience">
                                <div className="cv-exp-header">
                                    <div>
                                        <h3>{locale === 'en' ? exp.role.en : exp.role.ptBR}</h3>
                                        <p className="cv-company">{exp.company} • {exp.location}</p>
                                    </div>
                                    <span className="cv-date">
                                        {exp.startDate} - {exp.endDate || t.present}
                                    </span>
                                </div>
                                <p className="cv-exp-desc">
                                    {locale === 'en' ? exp.description.en : exp.description.ptBR}
                                </p>
                                <div className="cv-tech-list">
                                    {exp.technologies.map((tech) => (
                                        <span key={tech} className="cv-tech">{tech}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Skills */}
                <section className="cv-section">
                    <h2>{t.skills}</h2>
                    <div className="cv-skills-grid">
                        {Object.entries(skillsPorCategoria).map(([categoria, listaSkills]) => (
                            <div key={categoria} className="cv-skill-category">
                                <h3>
                                    {locale === 'en'
                                        ? categoriasLabel[categoria].en
                                        : categoriasLabel[categoria].ptBR}
                                </h3>
                                <p>{listaSkills.join(' • ')}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Projetos */}
                <section className="cv-section">
                    <h2>{t.projects}</h2>
                    <div className="cv-projects">
                        {projetosDestacados.map((projeto) => (
                            <div key={projeto.id} className="cv-project">
                                <div className="cv-project-header">
                                    <h3>{projeto.name}</h3>
                                    {projeto.liveUrl && (
                                        <a href={projeto.liveUrl} target="_blank" rel="noopener noreferrer">
                                            {projeto.liveUrl.replace('https://', '')}
                                        </a>
                                    )}
                                </div>
                                <p>
                                    {locale === 'en' ? projeto.description.en : projeto.description.ptBR}
                                </p>
                                <div className="cv-tech-list">
                                    {projeto.technologies.slice(0, 5).map((tech) => (
                                        <span key={tech} className="cv-tech">{tech}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Footer */}
                <footer className="cv-footer">
                    <p>{t.portfolioAt} <strong>davidassef.me</strong></p>
                </footer>
            </div>
        </div>
    );
}

export default function CVPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
            <CVContent />
        </Suspense>
    );
}
