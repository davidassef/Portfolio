'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { personalInfo } from '@/lib/data';

interface HeroProps {
    locale: string;
}

function GridLines() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Linhas horizontais animadas */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={`h-${i}`}
                    className="absolute left-0 right-0 h-px"
                    style={{
                        top: `${20 + i * 15}%`,
                        background: `linear-gradient(90deg, transparent, rgba(14, 246, 204, 0.08), transparent)`,
                    }}
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 + i * 0.2 }}
                />
            ))}
            {/* Linhas verticais animadas */}
            {[...Array(4)].map((_, i) => (
                <motion.div
                    key={`v-${i}`}
                    className="absolute top-0 bottom-0 w-px"
                    style={{
                        left: `${25 + i * 18}%`,
                        background: `linear-gradient(180deg, transparent, rgba(168, 85, 247, 0.05), transparent)`,
                    }}
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    transition={{ duration: 1.5, delay: 0.8 + i * 0.15 }}
                />
            ))}
        </div>
    );
}

export default function Hero({ locale }: HeroProps) {
    const [typedText, setTypedText] = useState('');
    const [cursorVisible, setCursorVisible] = useState(true);
    const fullText = personalInfo.name;

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            if (index <= fullText.length) {
                setTypedText(fullText.slice(0, index));
                index++;
            } else {
                clearInterval(interval);
            }
        }, 70);
        return () => clearInterval(interval);
    }, [fullText]);

    useEffect(() => {
        const blinkInterval = setInterval(() => {
            setCursorVisible(v => !v);
        }, 530);
        return () => clearInterval(blinkInterval);
    }, []);

    const scrollToProjects = () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToContact = () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center bg-grid">
            <div className="bg-gradient-radial absolute inset-0" />
            <GridLines />

            <div className="container relative z-10 py-20 pb-28">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
                    {/* Content — lado esquerdo */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl w-full order-2 lg:order-1">
                        {/* Terminal greeting */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1, duration: 0.5 }}
                            className="mb-6"
                        >
                            <span className="font-mono text-sm text-[var(--text-muted)] tracking-wide">
                                <span className="text-[var(--accent-cyan)]">{'>'}</span> whoami
                            </span>
                        </motion.div>

                        {/* Name */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 font-mono tracking-tighter"
                        >
                            <span className="text-gradient">{typedText}</span>
                            <span
                                className="inline-block w-[3px] h-[0.85em] bg-[var(--accent-cyan)] ml-1 align-middle"
                                style={{ opacity: cursorVisible ? 1 : 0 }}
                            />
                        </motion.h1>

                        {/* Role */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.45 }}
                            className="text-xl sm:text-2xl lg:text-3xl text-[var(--text-secondary)] mb-6 font-light tracking-tight"
                        >
                            {locale === 'en' ? personalInfo.title.en : personalInfo.title.ptBR}
                        </motion.p>

                        {/* Bio */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.55 }}
                            className="text-base lg:text-lg text-[var(--text-muted)] mb-10 max-w-lg leading-relaxed"
                        >
                            {locale === 'en' ? personalInfo.bio.en : personalInfo.bio.ptBR}
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.65 }}
                            className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
                        >
                            <button onClick={scrollToProjects} className="btn-primary">
                                {locale === 'en' ? 'View Projects' : 'Ver Projetos'}
                            </button>
                            <button onClick={scrollToContact} className="btn-secondary">
                                {locale === 'en' ? 'Get in Touch' : 'Entre em Contato'}
                            </button>
                            <Link
                                href={`/cv?lang=${locale}`}
                                className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent-cyan)] transition-colors font-mono"
                            >
                                <FileText size={15} />
                                <span>{locale === 'en' ? 'Download CV' : 'Baixar CV'}</span>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Avatar — lado direito */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                        className="avatar-glow flex-shrink-0 order-1 lg:order-2"
                    >
                        <Image
                            src={personalInfo.avatarUrl}
                            alt={personalInfo.name}
                            width={320}
                            height={320}
                            className="rounded-full w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-64 lg:h-64 xl:w-72 xl:h-72"
                            priority
                        />
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <button
                    onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex flex-col items-center gap-2 text-[var(--text-muted)] hover:text-[var(--accent-cyan)] transition-colors"
                >
                    <span className="text-xs font-mono tracking-wider uppercase">
                        {locale === 'en' ? 'Scroll' : 'Role'}
                    </span>
                    <ArrowDown size={18} className="animate-bounce" />
                </button>
            </motion.div>
        </section>
    );
}
