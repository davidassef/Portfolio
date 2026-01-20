import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { personalInfo } from '@/lib/data';
import { VisitCounter } from './VisitCounter';

interface FooterProps {
    locale: string;
}

export default function Footer({ locale }: FooterProps) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-primary)]">
            {/* Linha decorativa gradiente */}
            <div className="h-px bg-gradient-to-r from-transparent via-[var(--accent-cyan)] to-transparent opacity-30" />

            <div className="container py-16">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Logo & Copyright */}
                    <div className="flex flex-col items-center md:items-start gap-3">
                        <span className="text-2xl font-bold">
                            <span className="text-gradient">{personalInfo.name.split(' ')[0]}</span>
                            <span className="text-[var(--text-muted)]">.dev</span>
                        </span>
                        <p className="text-sm text-[var(--text-muted)]">
                            © {currentYear} Assef Digital. {locale === 'en' ? 'Operated by' : 'Operado por'} David Assef Carneiro.{' '}
                            {locale === 'en' ? 'All rights reserved.' : 'Todos os direitos reservados.'}
                        </p>
                        <VisitCounter locale={locale} />
                        <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
                            <a
                                href="https://www.recibofast.com.br"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-[var(--accent-cyan)] transition-colors"
                            >
                                Privacy Policy
                            </a>
                            <span>|</span>
                            <a
                                href="https://www.recibofast.com.br"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-[var(--accent-cyan)] transition-colors"
                            >
                                Terms of Use
                            </a>
                        </div>
                    </div>

                    {/* Social Links - Maiores */}
                    <div className="flex items-center gap-5">
                        <a
                            href={personalInfo.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-4 rounded-full bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:bg-[var(--bg-tertiary)] transition-all hover:shadow-lg"
                            style={{ boxShadow: 'none' }}
                            onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 240, 255, 0.3)'}
                            onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
                            aria-label="GitHub"
                        >
                            <Github size={22} />
                        </a>
                        <a
                            href={personalInfo.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-4 rounded-full bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:bg-[var(--bg-tertiary)] transition-all"
                            onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 240, 255, 0.3)'}
                            onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
                            aria-label="LinkedIn"
                        >
                            <Linkedin size={22} />
                        </a>
                        <a
                            href={`mailto:${personalInfo.email}`}
                            className="p-4 rounded-full bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:bg-[var(--bg-tertiary)] transition-all"
                            onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 240, 255, 0.3)'}
                            onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
                            aria-label="Email"
                        >
                            <Mail size={22} />
                        </a>
                    </div>

                    {/* Made with love */}
                    <p className="text-sm text-[var(--text-muted)] flex items-center gap-2">
                        {locale === 'en' ? 'Made with' : 'Feito com'}
                        <Heart size={16} className="text-[var(--accent-pink)] fill-current animate-pulse" />
                        {locale === 'en' ? 'and Next.js' : 'e Next.js'}
                    </p>
                </div>
            </div>
        </footer>
    );
}
