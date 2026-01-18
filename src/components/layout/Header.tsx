'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Globe, Download } from 'lucide-react';
import { personalInfo } from '@/lib/data';

interface HeaderProps {
    locale: string;
    onLocaleChange: (locale: string) => void;
    onDownloadCV: () => void;
}

const navItems = [
    { id: 'about', labelEn: 'About', labelPt: 'Sobre' },
    { id: 'skills', labelEn: 'Skills', labelPt: 'Habilidades' },
    { id: 'projects', labelEn: 'Projects', labelPt: 'Projetos' },
    { id: 'experience', labelEn: 'Experience', labelPt: 'Experiência' },
    { id: 'contact', labelEn: 'Contact', labelPt: 'Contato' },
];

export default function Header({ locale, onLocaleChange, onDownloadCV }: HeaderProps) {
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
                    ? 'bg-[var(--bg-primary)]/95 backdrop-blur-lg border-b border-[var(--border-subtle)] shadow-lg'
                    : 'bg-transparent'
                }`}
        >
            <div className="container flex items-center justify-between h-20">
                {/* Logo com efeito de glow */}
                <Link
                    href="/"
                    className="text-xl font-bold tracking-tight hover:text-[var(--accent-cyan)] transition-colors group"
                >
                    <span className="text-gradient group-hover:animate-logo-pulse">{personalInfo.name.split(' ')[0]}</span>
                    <span className="text-[var(--text-muted)]">.dev</span>
                </Link>

                {/* Desktop Navigation - Textos maiores */}
                <nav className="hidden md:flex items-center gap-10">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className="text-[15px] font-medium text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors relative group"
                        >
                            {locale === 'en' ? item.labelEn : item.labelPt}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--accent-cyan)] group-hover:w-full transition-all duration-300" />
                        </button>
                    ))}
                </nav>

                {/* Actions */}
                <div className="hidden md:flex items-center gap-5">
                    {/* Language Toggle */}
                    <button
                        onClick={() => onLocaleChange(locale === 'en' ? 'pt-BR' : 'en')}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:bg-[var(--bg-tertiary)] transition-all border border-transparent hover:border-[var(--border-glow)]"
                    >
                        <Globe size={18} />
                        <span>{locale === 'en' ? 'PT' : 'EN'}</span>
                    </button>

                    {/* Download CV Button */}
                    <button onClick={onDownloadCV} className="btn-primary text-sm py-3 px-6">
                        <Download size={18} />
                        <span>{locale === 'en' ? 'Download CV' : 'Baixar CV'}</span>
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-3 text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-20 left-0 right-0 bg-[var(--bg-secondary)]/98 backdrop-blur-lg border-b border-[var(--border-subtle)]">
                    <nav className="container py-8 flex flex-col gap-2">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className="text-left py-4 px-4 rounded-lg text-lg text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:bg-[var(--bg-tertiary)] transition-all"
                            >
                                {locale === 'en' ? item.labelEn : item.labelPt}
                            </button>
                        ))}
                        <hr className="border-[var(--border-subtle)] my-4" />
                        <div className="flex items-center justify-between px-4 pt-2">
                            <button
                                onClick={() => {
                                    onLocaleChange(locale === 'en' ? 'pt-BR' : 'en');
                                    setIsMobileMenuOpen(false);
                                }}
                                className="flex items-center gap-3 text-[var(--text-secondary)] text-lg"
                            >
                                <Globe size={20} />
                                <span>{locale === 'en' ? 'Português' : 'English'}</span>
                            </button>
                            <button
                                onClick={() => {
                                    onDownloadCV();
                                    setIsMobileMenuOpen(false);
                                }}
                                className="btn-primary text-sm py-3 px-5"
                            >
                                <Download size={18} />
                                <span>CV</span>
                            </button>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
