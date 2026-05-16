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

const categoryColors: Record<string, string> = {
    frontend: 'var(--accent-cyan)',
    backend: 'var(--accent-purple)',
    ai: 'var(--accent-pink)',
    tools: 'var(--accent-green)',
};

function SkillChip({ skill, index }: { skill: Skill; index: number }) {
    const color = categoryColors[skill.category];
    const dots = Array.from({ length: 5 }, (_, i) => i < skill.level);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.03 }}
            className="skill-chip group"
            style={{ '--chip-color': color } as React.CSSProperties}
        >
            <span className="text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] transition-colors">
                {skill.name}
            </span>
            <div className="flex gap-1 ml-1">
                {dots.map((filled, i) => (
                    <span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                        style={{
                            background: filled ? color : 'var(--bg-tertiary)',
                            boxShadow: filled ? `0 0 4px ${color}` : 'none',
                        }}
                    />
                ))}
            </div>
            <span
                className="absolute bottom-0 left-0 h-[2px]"
                style={{ background: color, width: '0%' }}
            />
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
                    className="text-center mb-16"
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

                <div className="flex flex-col gap-10">
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
                            >
                                <h3
                                    className="text-sm font-mono font-semibold mb-4 flex items-center gap-3 uppercase tracking-wider"
                                    style={{ color }}
                                >
                                    <span
                                        className="w-2.5 h-2.5 rounded-sm"
                                        style={{
                                            background: color,
                                            boxShadow: `0 0 10px ${color}`
                                        }}
                                    />
                                    {locale === 'en'
                                        ? categoryLabels[category].en
                                        : categoryLabels[category].pt}
                                </h3>

                                <div className="flex flex-wrap gap-3">
                                    {categorySkills.map((skill, idx) => (
                                        <SkillChip key={skill.name} skill={skill} index={idx} />
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
