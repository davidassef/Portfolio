'use client';

import { motion } from 'framer-motion';
import { Code, Lightbulb, Coffee } from 'lucide-react';
import { personalInfo, stats } from '@/lib/data';

interface AboutProps {
    locale: string;
}

export default function About({ locale }: AboutProps) {
    const statItems = [
        {
            value: stats.projects,
            labelEn: 'Projects',
            labelPt: 'Projetos',
            icon: Code
        },
        {
            value: stats.technologies,
            labelEn: 'Technologies',
            labelPt: 'Tecnologias',
            icon: Lightbulb
        },
        {
            value: `${stats.yearsExp}+`,
            labelEn: 'Year Coding',
            labelPt: 'Ano Programando',
            icon: Coffee
        },
    ];

    return (
        <section id="about" className="section bg-[var(--bg-secondary)]">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-20"
                >
                    <h2 className="section-title text-gradient">
                        {locale === 'en' ? 'About Me' : 'Sobre Mim'}
                    </h2>
                    <p className="section-subtitle">
                        {locale === 'en'
                            ? 'Turning complex problems into elegant solutions'
                            : 'Transformando problemas complexos em soluções elegantes'}
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    {/* Description - 3 colunas */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="lg:col-span-7 space-y-5"
                    >
                        <p className="text-lg text-[var(--text-primary)] leading-relaxed font-normal">
                            {locale === 'en' ? personalInfo.bio.en : personalInfo.bio.ptBR}
                        </p>

                        <p className="text-[var(--text-secondary)] leading-relaxed text-lg">
                            {locale === 'en'
                                ? "I specialize in building full-stack applications with modern technologies like React, Next.js, and Go. My passion lies in integrating AI capabilities into practical solutions that solve real-world problems."
                                : "Sou especializado em construir aplicações full-stack com tecnologias modernas como React, Next.js e Go. Minha paixão está em integrar capacidades de IA em soluções práticas que resolvem problemas do mundo real."}
                        </p>

                        <p className="text-[var(--text-secondary)] leading-relaxed text-lg">
                            {locale === 'en'
                                ? "When I'm not coding, you'll find me exploring new AI models, contributing to open source, or diving deep into system architecture challenges."
                                : "Quando não estou programando, você me encontra explorando novos modelos de IA, contribuindo para open source, ou mergulhando em desafios de arquitetura de sistemas."}
                        </p>

                        {/* Tags - Mais espaçamento */}
                        <div className="flex flex-wrap gap-3">
                            {['Clean Code', 'SOLID', 'TDD', 'AI/ML', 'Open Source'].map((tag) => (
                                <span key={tag} className="badge text-sm">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Stats - 2 colunas */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="lg:col-span-5 flex flex-col gap-4"
                    >
                        {statItems.map((stat, index) => (
                            <motion.div
                                key={stat.labelEn}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                                className="glass-card text-center"
                            >
                                <stat.icon className="w-10 h-10 mx-auto mb-3 text-[var(--accent-cyan)]" />
                                <div className="text-3xl font-bold text-gradient mb-3">{stat.value}</div>
                                <div className="text-sm text-[var(--text-muted)]">
                                    {locale === 'en' ? stat.labelEn : stat.labelPt}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
