'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { personalInfo } from '@/lib/data';

interface HeroProps {
    locale: string;
}

// Partículas flutuantes para efeito sci-fi
function Particles() {
    const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number; size: number }>>([]);

    useEffect(() => {
        const generated = Array.from({ length: 25 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            delay: Math.random() * 5,
            size: 2 + Math.random() * 3,
        }));
        setParticles(generated);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="particle"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        animationDelay: `${p.delay}s`,
                        opacity: 0.2 + Math.random() * 0.3,
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                    }}
                />
            ))}
        </div>
    );
}

export default function Hero({ locale }: HeroProps) {
    const [typedText, setTypedText] = useState('');
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
        }, 80);
        return () => clearInterval(interval);
    }, [fullText]);

    const scrollToProjects = () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToContact = () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center bg-grid">
            {/* Background Effects */}
            <div className="bg-gradient-radial absolute inset-0" />
            <Particles />

            <div className="container relative z-10 py-20 pb-32">
                <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24">
                    {/* Avatar - Maior e mais destacado */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="avatar-glow flex-shrink-0"
                    >
                        <Image
                            src={personalInfo.avatarUrl}
                            alt={personalInfo.name}
                            width={320}
                            height={320}
                            className="rounded-full"
                            priority
                        />
                    </motion.div>

                    {/* Content */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl">
                        {/* Greeting - Maior */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-[var(--accent-cyan)] text-xl font-medium mb-3"
                        >
                            {locale === 'en' ? "Hi, I'm" : 'Olá, sou'}
                        </motion.p>

                        {/* Name with typing effect */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-5"
                        >
                            <span className="text-gradient">{typedText}</span>
                            <span className="animate-pulse text-[var(--accent-cyan)]">|</span>
                        </motion.h1>

                        {/* Role - Mais destaque */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-2xl sm:text-3xl text-[var(--text-secondary)] mb-8 font-light"
                        >
                            {locale === 'en' ? personalInfo.title.en : personalInfo.title.ptBR}
                        </motion.p>

                        {/* Bio */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-lg text-[var(--text-secondary)] mb-10 max-w-xl leading-relaxed"
                        >
                            {locale === 'en' ? personalInfo.bio.en : personalInfo.bio.ptBR}
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-wrap items-center justify-center lg:justify-start gap-5"
                        >
                            <button onClick={scrollToProjects} className="btn-primary">
                                {locale === 'en' ? 'View Projects' : 'Ver Projetos'}
                            </button>
                            <button onClick={scrollToContact} className="btn-secondary">
                                {locale === 'en' ? 'Get in Touch' : 'Entre em Contato'}
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator - Reposicionado com mais distância */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2"
            >
                <button
                    onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex flex-col items-center gap-2 text-[var(--text-muted)] hover:text-[var(--accent-cyan)] transition-colors"
                >
                    <span className="text-sm font-medium">{locale === 'en' ? 'Scroll Down' : 'Role para Baixo'}</span>
                    <ArrowDown size={22} className="animate-bounce" />
                </button>
            </motion.div>
        </section>
    );
}
