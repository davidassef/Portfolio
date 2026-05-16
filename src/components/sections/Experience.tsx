'use client';

import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, GraduationCap } from 'lucide-react';
import { experiences, education } from '@/lib/data';

interface ExperienceProps {
    locale: string;
}

export default function Experience({ locale }: ExperienceProps) {
    return (
        <section id="experience" className="section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="section-title text-gradient">
                        {locale === 'en' ? 'Experience' : 'Experiência'}
                    </h2>
                    <p className="section-subtitle">
                        {locale === 'en' ? 'My professional journey' : 'Minha jornada profissional'}
                    </p>
                </motion.div>

                <div className="flex justify-center">
                    <div className="w-full max-w-3xl">
                        <div className="timeline">
                            {/* Experiências profissionais */}
                            {experiences.map((exp, index) => {
                                const role = locale === 'en' ? exp.role.en : exp.role.ptBR;
                                const description = locale === 'en' ? exp.description.en : exp.description.ptBR;
                                const endDate = exp.endDate
                                    ? exp.endDate
                                    : locale === 'en' ? 'Present' : 'Presente';

                                return (
                                    <motion.div
                                        key={exp.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="timeline-item"
                                    >
                                        <div className="glass-card border-l-2 border-l-[var(--accent-cyan)]">
                                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h3 className="text-base font-semibold text-[var(--text-primary)] font-mono">
                                                            {role}
                                                        </h3>
                                                        {exp.isCurrent && (
                                                            <span className="badge badge-green text-[10px]">
                                                                {locale === 'en' ? 'Current' : 'Atual'}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-[var(--accent-cyan)]">
                                                        <Briefcase size={14} />
                                                        <span className="text-sm font-medium">{exp.company}</span>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col gap-1 sm:text-right">
                                                    <div className="flex items-center gap-2 sm:justify-end text-[var(--text-muted)]">
                                                        <Calendar size={13} />
                                                        <span className="text-xs font-mono">
                                                            {exp.startDate} — {endDate}
                                                        </span>
                                                    </div>
                                                    {exp.location && (
                                                        <div className="flex items-center gap-2 sm:justify-end text-[var(--text-muted)]">
                                                            <MapPin size={13} />
                                                            <span className="text-xs">{exp.location}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
                                                {description}
                                            </p>

                                            <div className="flex flex-wrap gap-2">
                                                {exp.technologies.map((tech) => (
                                                    <span key={tech} className="badge text-xs">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}

                            {/* Formação acadêmica */}
                            {education.map((edu, index) => {
                                const course = locale === 'en' ? edu.course.en : edu.course.ptBR;
                                const statusLabel = edu.status === 'in-progress'
                                    ? (locale === 'en' ? 'In Progress' : 'Em Andamento')
                                    : (locale === 'en' ? 'Completed' : 'Concluído');

                                return (
                                    <motion.div
                                        key={edu.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: (experiences.length + index) * 0.1 }}
                                        className="timeline-item education"
                                    >
                                        <div className="glass-card border-l-2 border-l-[var(--accent-amber)]">
                                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h3 className="text-base font-semibold text-[var(--text-primary)] font-mono">
                                                            {course}
                                                        </h3>
                                                        <span className="badge badge-yellow text-[10px]">
                                                            {statusLabel}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-[var(--accent-amber)]">
                                                        <GraduationCap size={14} />
                                                        <span className="text-sm font-medium">{edu.institution}</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2 text-[var(--text-muted)]">
                                                    <Calendar size={13} />
                                                    <span className="text-xs font-mono">
                                                        {edu.startDate} — {edu.endDate || (locale === 'en' ? 'Present' : 'Presente')}
                                                    </span>
                                                </div>
                                            </div>

                                            {edu.modality && (
                                                <span className="text-xs text-[var(--text-muted)]">
                                                    {edu.modality}
                                                </span>
                                            )}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
