'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Lock, Star, Code, Rocket } from 'lucide-react';
import { projects, type Project } from '@/lib/data';

interface ProjectsProps {
    locale: string;
}

type FilterType = 'all' | 'public' | 'private';

function ProjectCard({ project, locale, index }: { project: Project; locale: string; index: number }) {
    const description = locale === 'en' ? project.description.en : project.description.ptBR;

    const getStatusBadge = () => {
        if (!project.status) return null;
        const configs: Record<string, { className: string; icon: typeof Rocket; label: { en: string; pt: string } }> = {
            production: { className: 'badge-green', icon: Rocket, label: { en: 'Live', pt: 'Produção' } },
            staging: { className: 'badge-yellow', icon: Rocket, label: { en: 'Staging', pt: 'Homologação' } },
            development: { className: 'badge-yellow', icon: Code, label: { en: 'In Dev', pt: 'Em Dev' } },
            challenge: { className: 'badge-purple', icon: Star, label: { en: 'Challenge', pt: 'Desafio' } },
        };
        const config = configs[project.status];
        if (!config) return null;
        const Icon = config.icon;
        return (
            <span className={`badge ${config.className} text-xs`}>
                <Icon size={10} className="mr-1" />
                {locale === 'en' ? config.label.en : config.label.pt}
            </span>
        );
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="glass-card overflow-hidden group flex flex-col h-full relative"
        >
            {/* Scan line on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
                <div
                    className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-cyan)] to-transparent"
                    style={{ animation: 'scan-line 2s linear infinite' }}
                />
            </div>

            <div className="p-5 md:p-6 flex-grow relative">
                <div className="flex flex-col gap-3 mb-4">
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] transition-colors leading-tight font-mono">
                        {project.name}
                    </h3>
                    <div className="flex items-center gap-2 flex-wrap">
                        {project.stars > 0 && (
                            <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                                <Star size={12} className="fill-amber-400 text-amber-400" />
                                {project.stars}
                            </span>
                        )}
                        {project.isPrivate && (
                            <span className="badge-purple text-xs flex items-center">
                                <Lock size={10} className="mr-1" />
                                {locale === 'en' ? 'Private' : 'Privado'}
                            </span>
                        )}
                        {getStatusBadge()}
                    </div>
                </div>

                <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed line-clamp-3">
                    {description}
                </p>

                <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                        <span key={tech} className="badge text-xs">
                            {tech}
                        </span>
                    ))}
                    {project.technologies.length > 4 && (
                        <span className="text-xs text-[var(--text-muted)] font-mono">
                            +{project.technologies.length - 4}
                        </span>
                    )}
                </div>
            </div>

            <div className="px-5 py-3 md:px-6 md:py-4 border-t border-[var(--border-subtle)] flex items-center gap-4" style={{ backgroundColor: 'rgba(17, 17, 40, 0.3)' }}>
                {project.githubUrl ? (
                    <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors"
                    >
                        <Github size={16} />
                        <span className="font-mono text-xs">{locale === 'en' ? 'Code' : 'Código'}</span>
                    </a>
                ) : project.liveUrl ? (
                    <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors"
                    >
                        <ExternalLink size={16} />
                        <span className="font-mono text-xs">Demo</span>
                    </a>
                ) : (
                    <span className="text-xs text-[var(--text-muted)] italic flex items-center gap-2 font-mono">
                        <Lock size={12} />
                        {project.status === 'development'
                            ? (locale === 'en' ? 'In development' : 'Em desenvolvimento')
                            : (locale === 'en' ? 'Private repo' : 'Repo privado')}
                    </span>
                )}

                {project.githubUrl && project.liveUrl && (
                    <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors"
                    >
                        <ExternalLink size={16} />
                        <span className="font-mono text-xs">Demo</span>
                    </a>
                )}
            </div>
        </motion.div>
    );
}

export default function Projects({ locale }: ProjectsProps) {
    const [filter, setFilter] = useState<FilterType>('all');

    const filteredProjects = projects.filter((project) => {
        if (filter === 'all') return true;
        if (filter === 'public') return !project.isPrivate;
        if (filter === 'private') return project.isPrivate;
        return true;
    });

    const sortedProjects = [...filteredProjects].sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        if (!a.isPrivate && b.isPrivate) return -1;
        if (a.isPrivate && !b.isPrivate) return 1;
        return 0;
    });

    const filters: { value: FilterType; labelEn: string; labelPt: string }[] = [
        { value: 'all', labelEn: 'All', labelPt: 'Todos' },
        { value: 'public', labelEn: 'Public', labelPt: 'Públicos' },
        { value: 'private', labelEn: 'Private', labelPt: 'Privados' },
    ];

    return (
        <section id="projects" className="section bg-[var(--bg-secondary)]">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="section-title text-gradient">
                        {locale === 'en' ? 'Projects' : 'Projetos'}
                    </h2>
                    <p className="section-subtitle">
                        {locale === 'en'
                            ? 'A selection of my recent work'
                            : 'Uma seleção dos meus trabalhos recentes'}
                    </p>
                </motion.div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="flex justify-center gap-2 mb-12"
                >
                    {filters.map((f) => (
                        <button
                            key={f.value}
                            onClick={() => setFilter(f.value)}
                            className={`px-5 py-2.5 rounded-lg text-sm font-mono font-medium transition-all ${filter === f.value
                                ? 'bg-[var(--accent-cyan)] text-[var(--bg-primary)]'
                                : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:bg-[var(--bg-card)]'
                                }`}
                            style={filter === f.value ? { boxShadow: '0 0 15px rgba(14, 246, 204, 0.3)' } : {}}
                        >
                            {locale === 'en' ? f.labelEn : f.labelPt}
                        </button>
                    ))}
                </motion.div>

                <div className="flex flex-col gap-10">
                    <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                        <AnimatePresence mode="popLayout">
                            {sortedProjects.map((project, index) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    locale={locale}
                                    index={index}
                                />
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-center"
                    >
                        <a
                            href="https://github.com/davidassef"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary inline-flex"
                        >
                            <Github size={18} />
                            <span>{locale === 'en' ? 'View all on GitHub' : 'Ver todos no GitHub'}</span>
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
