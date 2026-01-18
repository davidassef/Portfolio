'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { skills, type Skill } from '@/lib/data';

interface SkillsProps {
    locale: string;
}

const categoryLabels = {
    frontend: { en: 'Frontend', pt: 'Frontend' },
    backend: { en: 'Backend', pt: 'Backend' },
    ai: { en: 'AI & ML', pt: 'IA & ML' },
    tools: { en: 'Tools & DevOps', pt: 'Ferramentas & DevOps' },
};

const categoryColors = {
    frontend: 'var(--accent-cyan)',
    backend: 'var(--accent-purple)',
    ai: 'var(--accent-pink)',
    tools: 'var(--accent-green)',
};

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
    const barWidth = (skill.level / 5) * 100;
    const color = categoryColors[skill.category];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="glass-card p-5"
        >
            <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-[var(--text-primary)] text-base">{skill.name}</span>
                <span className="text-sm text-[var(--text-muted)] font-medium">{skill.level}/5</span>
            </div>
            <div className="skill-bar">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${barWidth}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="skill-bar-fill"
                    style={{ background: `linear-gradient(90deg, ${color}, var(--accent-cyan))` }}
                />
            </div>
        </motion.div>
    );
}

export default function Skills({ locale }: SkillsProps) {
    const categories = ['frontend', 'backend', 'ai', 'tools'] as const;

    return (
        <section id="skills" className="section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-20"
                >
                    <h2 className="section-title text-gradient">
                        {locale === 'en' ? 'Tech Stack' : 'Stack Tecnológico'}
                    </h2>
                    <p className="section-subtitle">
                        {locale === 'en'
                            ? 'Technologies I work with daily'
                            : 'Tecnologias que uso diariamente'}
                    </p>
                </motion.div>

                <div className="space-y-28">
                    {categories.map((category) => {
                        const categorySkills = skills.filter((s) => s.category === category);
                        const color = categoryColors[category];

                        return (
                            <motion.div
                                key={category}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="pb-12 border-b border-[var(--border-subtle)] last:border-b-0 last:pb-0"
                            >
                                <h3
                                    className="text-xl font-semibold mb-8 flex items-center gap-4"
                                    style={{ color }}
                                >
                                    <span
                                        className="w-4 h-4 rounded-full"
                                        style={{
                                            background: color,
                                            boxShadow: `0 0 15px ${color}`
                                        }}
                                    />
                                    {locale === 'en'
                                        ? categoryLabels[category].en
                                        : categoryLabels[category].pt}
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                                    {categorySkills.map((skill, idx) => (
                                        <SkillCard key={skill.name} skill={skill} index={idx} />
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
