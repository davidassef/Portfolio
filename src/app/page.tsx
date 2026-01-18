'use client';

import { useState, useCallback } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import Contact from '@/components/sections/Contact';
import { generateCV } from '@/lib/generatePDF';

export default function Home() {
  const [locale, setLocale] = useState<'en' | 'pt-BR'>('en');
  const [isGeneratingCV, setIsGeneratingCV] = useState(false);

  const handleLocaleChange = useCallback((newLocale: string) => {
    setLocale(newLocale as 'en' | 'pt-BR');
  }, []);

  const handleDownloadCV = useCallback(async () => {
    if (isGeneratingCV) return;

    setIsGeneratingCV(true);
    try {
      await generateCV({ locale });
    } catch (error) {
      console.error('Error generating CV:', error);
    } finally {
      setIsGeneratingCV(false);
    }
  }, [locale, isGeneratingCV]);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <Header
        locale={locale}
        onLocaleChange={handleLocaleChange}
        onDownloadCV={handleDownloadCV}
      />

      <main>
        <Hero locale={locale} />
        <About locale={locale} />
        <Skills locale={locale} />
        <Projects locale={locale} />
        <Experience locale={locale} />
        <Contact locale={locale} />
      </main>

      <Footer locale={locale} />

      {/* CV Generation Loading Overlay */}
      {isGeneratingCV && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center">
          <div className="glass-card p-8 flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-[var(--accent-cyan)] border-t-transparent rounded-full animate-spin" />
            <p className="text-[var(--text-primary)]">
              {locale === 'en' ? 'Generating CV...' : 'Gerando CV...'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
