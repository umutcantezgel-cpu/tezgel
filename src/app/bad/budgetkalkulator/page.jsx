import React from 'react';
import { Calculator } from 'lucide-react';
import BudgetKalkulator from '@/components/funnels/BudgetKalkulator';
import QualityPromise from '@/components/sections/QualityPromise';

export const metadata = {
    title: 'Budgetkalkulator Bad | Sofortige Kostenkalkulation',
    description: 'Kalkulieren Sie online in 2 Minuten die Sanierungskosten für Ihr Badezimmer in Aßlar, Wetzlar & Lahn-Dill. Transparente Festpreis-Orientierung.',
    alternates: { canonical: '/bad/budgetkalkulator' }
};

export default function BudgetkalkulatorPage() {
    return (
        <div className="pt-32 pb-20 min-h-screen relative overflow-hidden">
            <div className="ambient-glow-mint -top-32 -left-32 opacity-70" />
            <div className="ambient-glow-sky top-96 -right-24 opacity-60" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <header className="text-center max-w-3xl mx-auto mb-10 space-y-4">
                    <span className="eyebrow">
                        <Calculator className="w-3.5 h-3.5" />
                        Bad-Budgetkalkulator
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                        Was kostet{' '}
                        <span className="text-ceramic-gradient">Ihr neues Bad?</span>
                    </h1>
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                        Größe, Umfang, Qualitätsstufe und Wunschausstattung wählen – der Rechner zeigt Ihnen sofort eine realistische
                        Kostenspanne als Orientierung für Ihre Planung.
                    </p>
                </header>

                <BudgetKalkulator />
            </div>
            <QualityPromise />
        </div>
    );
}
