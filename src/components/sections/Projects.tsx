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

        if (project.status === 'production') {
            return (
                <span className="badge badge-green text-xs">
                    <Rocket size={10} className="mr-1" />
                    {locale === 'en' ? 'Live' : 'Produção'}
                </span>
            );
        }

        if (project.status === 'development') {
            return (
                <span className="badge badge-yellow text-xs">
                    <Code size={10} className="mr-1" />
                    {locale === 'en' ? 'In Dev' : 'Em Dev'}
                </span>
            );
        }

        return null;
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="glass-card overflow-hidden group flex flex-col h-full"
        >
            {/* Header */}
            <div className="p-7 pb-5 flex-grow">
                <div className="flex items-start justify-between gap-3 mb-4">
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] transition-colors leading-tight">
                        {project.name}
                    </h3>
                    <div className="flex items-center gap-2 flex-shrink-0">
                        {project.stars > 0 && (
                            <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                                <Star size={12} className="fill-yellow-500 text-yellow-500" />
                                {project.stars}
                            </span>
                        )}
                        {project.isPrivate ? (
                            <span className="badge-purple text-xs flex items-center">
                                <Lock size={10} className="mr-1" />
                                {locale === 'en' ? 'Private' : 'Privado'}
                            </span>
                        ) : (
                            getStatusBadge()
                        )}
                    </div>
                </div>

                <p className="text-sm text-[var(--text-secondary)] mb-5 leading-relaxed line-clamp-3">
                    {description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                        <span key={tech} className="badge text-xs">
                            {tech}
                        </span>
                    ))}
                    {project.technologies.length > 4 && (
                        <span className="text-xs text-[var(--text-muted)]">
                            +{project.technologies.length - 4}
                        </span>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="px-7 py-5 border-t border-[var(--border-subtle)] bg-[var(--bg-tertiary)]/50 flex items-center gap-4">
                {project.githubUrl ? (
                    <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors"
                    >
                        <Github size={18} />
                        <span>{locale === 'en' ? 'View Code' : 'Ver Código'}</span>
                    </a>
                ) : project.liveUrl ? (
                    <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors"
                    >
                        <ExternalLink size={18} />
                        <span>{locale === 'en' ? 'Live Demo' : 'Demo'}</span>
                    </a>
                ) : (
                    <span className="text-sm text-[var(--text-muted)] italic flex items-center gap-2">
                        <Lock size={14} />
                        {project.status === 'development'
                            ? (locale === 'en' ? 'Under development' : 'Em desenvolvimento')
                            : (locale === 'en' ? 'Private repository' : 'Repositório privado')}
                    </span>
                )}

                {project.githubUrl && project.liveUrl && (
                    <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors"
                    >
                        <ExternalLink size={18} />
                        <span>{locale === 'en' ? 'Demo' : 'Demo'}</span>
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

    // Ordenar: featured primeiro, depois públicos
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
                        {locale === 'en' ? 'Featured Projects' : 'Projetos em Destaque'}
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
                    className="flex justify-center gap-3 mb-14"
                >
                    {filters.map((f) => (
                        <button
                            key={f.value}
                            onClick={() => setFilter(f.value)}
                            className={`px-6 py-3 rounded-full text-sm font-semibold transition-all ${filter === f.value
                                    ? 'bg-[var(--accent-cyan)] text-[var(--bg-primary)] shadow-lg'
                                    : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:bg-[var(--bg-card)]'
                                }`}
                            style={filter === f.value ? { boxShadow: '0 0 20px rgba(0, 240, 255, 0.4)' } : {}}
                        >
                            {locale === 'en' ? f.labelEn : f.labelPt}
                        </button>
                    ))}
                </motion.div>

                {/* Projects Grid */}
                <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
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

                {/* GitHub Link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="text-center mt-16"
                >
                    <a
                        href="https://github.com/davidassef"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary inline-flex"
                    >
                        <Github size={20} />
                        <span>{locale === 'en' ? 'View all on GitHub' : 'Ver todos no GitHub'}</span>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
