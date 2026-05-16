'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Globe, Download } from 'lucide-react';
import { personalInfo } from '@/lib/data';

interface HeaderProps {
    locale: string;
    onLocaleChange: (locale: string) => void;
}

const navItems = [
    { id: 'about', labelEn: 'About', labelPt: 'Sobre' },
    { id: 'skills', labelEn: 'Skills', labelPt: 'Skills' },
    { id: 'projects', labelEn: 'Projects', labelPt: 'Projetos' },
    { id: 'experience', labelEn: 'Experience', labelPt: 'Experiência' },
    { id: 'contact', labelEn: 'Contact', labelPt: 'Contato' },
];

export default function Header({ locale, onLocaleChange }: HeaderProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'backdrop-blur-lg border-b border-[var(--border-subtle)]'
                : 'bg-transparent'
                }`}
            style={isScrolled ? { backgroundColor: 'rgba(6, 6, 16, 0.95)' } : undefined}
        >
            <div className="container flex items-center justify-between h-16 lg:h-20">
                {/* Logo */}
                <Link
                    href="/"
                    className="font-mono text-lg font-bold tracking-tight hover:text-[var(--accent-cyan)] transition-colors group"
                >
                    <span className="text-gradient">{personalInfo.name.split(' ')[0].toLowerCase()}</span>
                    <span className="text-[var(--text-muted)]">.dev</span>
                    <span className="inline-block w-[2px] h-4 bg-[var(--accent-cyan)] ml-0.5 align-middle animate-blink" />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors relative group"
                        >
                            {locale === 'en' ? item.labelEn : item.labelPt}
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-[var(--accent-cyan)] group-hover:w-full transition-all duration-300" />
                        </button>
                    ))}
                </nav>

                {/* Actions */}
                <div className="hidden md:flex items-center gap-3">
                    <button
                        onClick={() => onLocaleChange(locale === 'en' ? 'pt-BR' : 'en')}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono font-medium text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:bg-[var(--bg-tertiary)] transition-all border border-transparent hover:border-[var(--border-glow)]"
                    >
                        <Globe size={14} />
                        <span>{locale === 'en' ? 'PT' : 'EN'}</span>
                    </button>

                    <Link
                        href={`/cv?lang=${locale}`}
                        className="btn-primary text-xs py-2.5 px-5 flex items-center gap-2"
                    >
                        <Download size={14} />
                        <span className="hidden sm:inline">CV</span>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 right-0 backdrop-blur-lg border-b border-[var(--border-subtle)]" style={{ backgroundColor: 'rgba(11, 11, 26, 0.98)' }}>
                    <nav className="container py-6 flex flex-col gap-1">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className="text-left py-3 px-4 rounded-lg text-base text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:bg-[var(--bg-tertiary)] transition-all font-medium"
                            >
                                {locale === 'en' ? item.labelEn : item.labelPt}
                            </button>
                        ))}
                        <hr className="border-[var(--border-subtle)] my-3" />
                        <div className="flex items-center justify-between px-4 pt-1">
                            <button
                                onClick={() => {
                                    onLocaleChange(locale === 'en' ? 'pt-BR' : 'en');
                                    setIsMobileMenuOpen(false);
                                }}
                                className="flex items-center gap-2 text-[var(--text-secondary)] text-sm font-mono"
                            >
                                <Globe size={16} />
                                <span>{locale === 'en' ? 'Português' : 'English'}</span>
                            </button>
                            <Link
                                href={`/cv?lang=${locale}`}
                                className="btn-primary text-xs py-2.5 px-5"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <Download size={14} />
                                <span>CV</span>
                            </Link>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
