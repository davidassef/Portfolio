import { Github, Linkedin, Mail } from 'lucide-react';
import { personalInfo } from '@/lib/data';

interface FooterProps {
    locale: string;
}

export default function Footer({ locale }: FooterProps) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-primary)]">
            <div className="h-px bg-gradient-to-r from-transparent via-[var(--accent-cyan)] to-transparent opacity-20" />

            <div className="container py-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Logo & Copyright */}
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <span className="text-lg font-mono font-bold">
                            <span className="text-gradient">{personalInfo.name.split(' ')[0].toLowerCase()}</span>
                            <span className="text-[var(--text-muted)]">.dev</span>
                        </span>
                        <p className="text-xs text-[var(--text-muted)]">
                            © {currentYear} {personalInfo.name}.{' '}
                            {locale === 'en' ? 'All rights reserved.' : 'Todos os direitos reservados.'}
                        </p>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-3">
                        <a
                            href={personalInfo.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link p-3 rounded-lg bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:bg-[var(--bg-tertiary)] transition-all"
                            aria-label="GitHub"
                        >
                            <Github size={18} />
                        </a>
                        <a
                            href={personalInfo.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link p-3 rounded-lg bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:bg-[var(--bg-tertiary)] transition-all"
                            aria-label="LinkedIn"
                        >
                            <Linkedin size={18} />
                        </a>
                        <a
                            href={`mailto:${personalInfo.email}`}
                            className="social-link p-3 rounded-lg bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:bg-[var(--bg-tertiary)] transition-all"
                            aria-label="Email"
                        >
                            <Mail size={18} />
                        </a>
                    </div>

                    {/* Built with */}
                    <p className="text-xs text-[var(--text-muted)] font-mono">
                        {locale === 'en' ? 'Built with' : 'Feito com'} Next.js + Tailwind
                    </p>
                </div>
            </div>
        </footer>
    );
}
