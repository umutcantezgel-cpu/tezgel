import React from 'react';
import { ClipboardCheck } from 'lucide-react';
import BadProjektCheck from '@/components/funnels/BadProjektCheck';
import QualityPromise from '@/components/sections/QualityPromise';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
    title: 'Bad-Projektcheck: Badsanierung prüfen | Tezgel Wetzlar',
    description: 'Bad-Projektcheck in 2 Minuten: Kostenfreie Machbarkeitsprüfung & Festpreisangebot für Ihre Badsanierung in Wetzlar & Aßlar. Jetzt online starten!',
    path: '/bad/projekt-check'
});

export default function BadProjektCheckPage() {
    return (
        <div className="pt-32 pb-20 min-h-screen relative overflow-hidden">
            <div className="ambient-glow-mint -top-32 -left-32 opacity-70" />
            <div className="ambient-glow-sky top-96 -right-24 opacity-60" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <header className="text-center max-w-3xl mx-auto mb-10 space-y-4">
                    <span className="eyebrow">
                        <ClipboardCheck className="w-3.5 h-3.5" />
                        Bad-Projektcheck
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                        Bad-Projektcheck: Badsanierung online prüfen bei{' '}
                        <span className="text-ceramic-gradient">Tezgel Wetzlar</span>
                    </h1>
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                        Nutzen Sie den Bad-Projektcheck von Tezgel Wetzlar: Badsanierung in 2 Minuten prüfen, Größe, Umfang und
                        Ausstattung auswählen – den verbindlichen Festpreis erhalten Sie nach dem kostenfreien Vor-Ort-Aufmaß.
                    </p>
                </header>

                <BadProjektCheck />
            </div>
            <QualityPromise />
        </div>
    );
}
