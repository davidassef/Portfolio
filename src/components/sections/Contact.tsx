'use client';

import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, MapPin, Send, MessageCircle } from 'lucide-react';
import { personalInfo } from '@/lib/data';

interface ContactProps {
    locale: string;
}

export default function Contact({ locale }: ContactProps) {
    const contactLinks = [
        {
            icon: Mail,
            label: 'Email',
            value: personalInfo.email,
            href: `mailto:${personalInfo.email}`,
            color: 'var(--accent-cyan)',
        },
        {
            icon: MessageCircle,
            label: 'WhatsApp',
            value: locale === 'en' ? 'Send message' : 'Enviar mensagem',
            href: `https://wa.me/${personalInfo.whatsapp.replace(/\D/g, '')}`,
            color: 'var(--accent-green)',
        },
        {
            icon: Github,
            label: 'GitHub',
            value: '@davidassef',
            href: personalInfo.github,
            color: 'var(--accent-purple)',
        },
        {
            icon: Linkedin,
            label: 'LinkedIn',
            value: '/in/davidassef',
            href: personalInfo.linkedin,
            color: 'var(--accent-blue)',
        },
        {
            icon: MapPin,
            label: locale === 'en' ? 'Location' : 'Localização',
            value: personalInfo.location,
            href: null,
            color: 'var(--accent-cyan)',
        },
    ];

    return (
        <section id="contact" className="section bg-[var(--bg-secondary)]">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-20"
                >
                    <h2 className="section-title text-gradient">
                        {locale === 'en' ? "Let's Connect" : 'Vamos Conectar'}
                    </h2>
                    <p className="section-subtitle">
                        {locale === 'en'
                            ? "Got a project in mind? Let's make it happen."
                            : 'Tem um projeto em mente? Vamos torná-lo realidade.'}
                    </p>
                </motion.div>

                {/* Container centralizado */}
                <div className="flex flex-col items-center">
                    {/* Contact Cards - Grid centralizado com 5 itens */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 mb-28 w-full max-w-6xl mx-auto">
                        {contactLinks.map((link, index) => (
                            <motion.div
                                key={link.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                {link.href ? (
                                    <a
                                        href={link.href}
                                        target={link.href.startsWith('mailto') ? undefined : '_blank'}
                                        rel="noopener noreferrer"
                                        className="glass-card p-6 flex flex-col items-center text-center group cursor-pointer block h-full"
                                    >
                                        <div
                                            className="w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                                            style={{ background: `${link.color}15` }}
                                        >
                                            <link.icon size={24} style={{ color: link.color }} />
                                        </div>
                                        <h3 className="font-semibold text-[var(--text-primary)] mb-1 text-base">
                                            {link.label}
                                        </h3>
                                        <p className="text-xs text-[var(--text-muted)] group-hover:text-[var(--accent-cyan)] transition-colors">
                                            {link.value}
                                        </p>
                                    </a>
                                ) : (
                                    <div className="glass-card p-6 flex flex-col items-center text-center h-full">
                                        <div
                                            className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                                            style={{ background: `${link.color}15` }}
                                        >
                                            <link.icon size={24} style={{ color: link.color }} />
                                        </div>
                                        <h3 className="font-semibold text-[var(--text-primary)] mb-1 text-base">
                                            {link.label}
                                        </h3>
                                        <p className="text-xs text-[var(--text-muted)]">{link.value}</p>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA - Centralizado com espaço */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="text-center"
                    >
                        <a
                            href={`mailto:${personalInfo.email}`}
                            className="btn-primary inline-flex text-lg px-10 py-5"
                        >
                            <Send size={22} />
                            <span>{locale === 'en' ? 'Send me an email' : 'Me envie um email'}</span>
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
