'use client';

import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { experiences } from '@/lib/data';

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
                    className="text-center mb-20"
                >
                    <h2 className="section-title text-gradient">
                        {locale === 'en' ? 'Experience' : 'Experiência'}
                    </h2>
                    <p className="section-subtitle">
                        {locale === 'en' ? 'My professional journey' : 'Minha jornada profissional'}
                    </p>
                </motion.div>

                {/* Container centralizado */}
                <div className="flex justify-center">
                    <div className="w-full max-w-3xl">
                        <div className="timeline">
                            {experiences.map((exp, index) => {
                                const role = locale === 'en' ? exp.role.en : exp.role.ptBR;
                                const description = locale === 'en' ? exp.description.en : exp.description.ptBR;
                                const endDate = exp.endDate
                                    ? exp.endDate
                                    : locale === 'en' ? 'Present' : 'Presente';
                                const location = exp.location || 'Remote';

                                return (
                                    <motion.div
                                        key={exp.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="timeline-item"
                                    >
                                        <div className="glass-card p-8">
                                            {/* Header com grid para melhor layout */}
                                            <div className="grid sm:grid-cols-2 gap-4 mb-6">
                                                {/* Left: Role & Company */}
                                                <div>
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                                                            {role}
                                                        </h3>
                                                        {exp.isCurrent && (
                                                            <span className="badge badge-green text-xs">
                                                                {locale === 'en' ? 'Current' : 'Atual'}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-3 text-[var(--accent-cyan)]">
                                                        <Briefcase size={18} />
                                                        <span className="text-base font-medium">{exp.company}</span>
                                                    </div>
                                                </div>

                                                {/* Right: Date & Location */}
                                                <div className="sm:text-right space-y-2">
                                                    <div className="flex items-center gap-3 sm:justify-end text-[var(--text-muted)]">
                                                        <Calendar size={16} />
                                                        <span className="text-sm font-medium">
                                                            {exp.startDate} — {endDate}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-3 sm:justify-end text-[var(--text-muted)]">
                                                        <MapPin size={16} />
                                                        <span className="text-sm">{location}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Description */}
                                            <p className="text-[var(--text-secondary)] mb-6 leading-relaxed text-base">
                                                {description}
                                            </p>

                                            {/* Technologies */}
                                            <div className="flex flex-wrap gap-3">
                                                {exp.technologies.map((tech) => (
                                                    <span key={tech} className="badge">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
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
