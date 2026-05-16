'use client';

import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, MapPin, MessageCircle, Send } from 'lucide-react';
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
            color: 'var(--text-muted)',
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
                    className="text-center mb-12"
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

                <div className="max-w-2xl mx-auto">
                    {/* Contact links — lista compacta */}
                    <div className="flex flex-col gap-3 mb-10">
                        {contactLinks.map((link, index) => (
                            <motion.div
                                key={link.label}
                                initial={{ opacity: 0, x: -15 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: index * 0.08 }}
                            >
                                {link.href ? (
                                    <a
                                        href={link.href}
                                        target={link.href.startsWith('mailto') ? undefined : '_blank'}
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-4 px-5 py-4 rounded-xl border border-[var(--border-subtle)] hover:border-[var(--border-glow)] transition-all group"
                                        style={{ backgroundColor: 'rgba(17, 17, 40, 0.5)' }}
                                    >
                                        <link.icon size={20} style={{ color: link.color }} className="flex-shrink-0 group-hover:scale-110 transition-transform" />
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 flex-grow">
                                            <span className="text-sm font-medium text-[var(--text-primary)]">{link.label}</span>
                                            <span className="text-xs text-[var(--text-muted)] font-mono group-hover:text-[var(--accent-cyan)] transition-colors">{link.value}</span>
                                        </div>
                                    </a>
                                ) : (
                                    <div className="flex items-center gap-4 px-5 py-4 rounded-xl border border-[var(--border-subtle)]" style={{ backgroundColor: 'rgba(17, 17, 40, 0.5)' }}>
                                        <link.icon size={20} style={{ color: link.color }} className="flex-shrink-0" />
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                                            <span className="text-sm font-medium text-[var(--text-primary)]">{link.label}</span>
                                            <span className="text-xs text-[var(--text-muted)] font-mono">{link.value}</span>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="text-center"
                    >
                        <a
                            href={`mailto:${personalInfo.email}`}
                            className="btn-primary inline-flex text-base px-8 py-4"
                        >
                            <Send size={18} />
                            <span>{locale === 'en' ? 'Send me an email' : 'Me envie um email'}</span>
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
