'use client';

import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';

interface VisitCounterProps {
    locale: string;
}

const STORAGE_KEY = 'portfolio-visit-recorded';

export function VisitCounter({ locale }: VisitCounterProps) {
    const [count, setCount] = useState<number | null>(null);

    useEffect(() => {
        const recordVisit = async () => {
            try {
                // Verifica se já registramos a visita neste navegador
                const alreadyRecorded = localStorage.getItem(STORAGE_KEY);

                const response = await fetch('/api/visit', {
                    method: 'GET',
                });

                if (response.ok) {
                    const data = await response.json();
                    setCount(data.count);

                    // Marca como registrado apenas se for uma nova visita
                    if (data.isNewVisitor) {
                        localStorage.setItem(STORAGE_KEY, 'true');
                    }
                }
            } catch (error) {
                console.error('Erro ao registrar visita:', error);
            }
        };

        recordVisit();
    }, []);

    if (count === null) {
        return null;
    }

    return (
        <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
            <Eye size={12} />
            <span>{count.toLocaleString()}</span>
            <span>{locale === 'en' ? 'visits' : 'visitas'}</span>
        </div>
    );
}
