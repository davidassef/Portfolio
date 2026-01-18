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

export default function Home() {
  const [locale, setLocale] = useState<'en' | 'pt-BR'>('en');

  const handleLocaleChange = useCallback((newLocale: string) => {
    setLocale(newLocale as 'en' | 'pt-BR');
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <Header
        locale={locale}
        onLocaleChange={handleLocaleChange}
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
    </div>
  );
}
