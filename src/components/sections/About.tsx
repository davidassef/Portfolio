'use client';

import { motion } from 'framer-motion';
import { personalInfo, stats, languages } from '@/lib/data';

interface AboutProps {
    locale: string;
}

export default function About({ locale }: AboutProps) {
    return (
        <section id="about" className="section bg-[var(--bg-secondary)]">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="section-title text-gradient">
                        {locale === 'en' ? 'About' : 'Sobre'}
                    </h2>
                    <p className="section-subtitle">
                        {locale === 'en'
                            ? 'Turning complex problems into elegant solutions'
                            : 'Transformando problemas complexos em soluções elegantes'}
                    </p>
                </motion.div>

                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <p className="text-lg text-[var(--text-primary)] leading-relaxed">
                            {locale === 'en' ? personalInfo.bio.en : personalInfo.bio.ptBR}
                        </p>

                        <p className="text-[var(--text-secondary)] leading-relaxed text-base">
                            {locale === 'en'
                                ? `With ${stats.projects} projects delivered using ${stats.technologies}+ technologies and ${stats.yearsExp}+ years of hands-on experience, I take AI-powered products from idea to production: LLM integrations, agents and automations, APIs, databases and cloud infrastructure.`
                                : `Com ${stats.projects} projetos entregues usando ${stats.technologies}+ tecnologias e ${stats.yearsExp}+ anos de experiência prática, levo produtos com IA da ideia à produção: integrações com LLMs, agentes e automações, APIs, bancos de dados e infraestrutura cloud.`}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 pt-2">
                            {['LLMs', 'Prompt Engineering', 'AI Agents', 'MCP', 'Automação com IA', 'REST APIs', 'Cloud'].map((tag) => (
                                <span key={tag} className="badge text-xs">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Idiomas */}
                        <p className="font-mono text-sm text-[var(--text-secondary)]">
                            {locale === 'en' ? 'Languages: ' : 'Idiomas: '}
                            {languages
                                .map((idioma) => locale === 'en'
                                    ? `${idioma.name.en} (${idioma.level.en})`
                                    : `${idioma.name.ptBR} (${idioma.level.ptBR})`)
                                .join(' • ')}
                        </p>

                        {/* Status bar */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="pt-4"
                        >
                            <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-subtle)]">
                                <span className="w-2 h-2 rounded-full bg-[var(--accent-green)] animate-pulse" />
                                <span className="font-mono text-sm text-[var(--text-secondary)]">
                                    {locale === 'en'
                                        ? 'Open to AI internship and residency programs'
                                        : 'Disponível para estágio e residência em IA'}
                                </span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
