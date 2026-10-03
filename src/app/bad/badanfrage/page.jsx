import React from 'react';
import { Send } from 'lucide-react';
import BadanfrageFunnel from '@/components/funnels/BadanfrageFunnel';
import QualityPromise from '@/components/sections/QualityPromise';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
    title: 'Badsanierung Angebot anfordern | Tezgel Wetzlar',
    description: 'Unverbindliche Badanfrage an Fliesenverlegung Tezgel: Beschreiben Sie Ihr Projekt für ein individuelles Festpreisangebot in Wetzlar & Aßlar. Jetzt anfragen!',
    path: '/bad/badanfrage'
});

export default function BadanfragePage() {
    return (
        <div className="pt-32 pb-20 min-h-screen relative overflow-hidden">
            <div className="ambient-glow-mint -top-32 -left-32 opacity-70" />
            <div className="ambient-glow-sky top-96 -right-24 opacity-60" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <header className="text-center max-w-3xl mx-auto mb-10 space-y-4">
                    <span className="eyebrow">
                        <Send className="w-3.5 h-3.5" />
                        Kostenfrei &amp; unverbindlich
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                        Badsanierung Angebot anfordern bei{' '}
                        <span className="text-ceramic-gradient">Tezgel Wetzlar</span>
                    </h1>
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                        Jetzt unverbindlich Ihr Badsanierung Angebot anfordern: In 5 Schritten Raummaße und Wunschausstattung angeben – Tezgel Wetzlar erstellt Ihr maßgeschneidertes Festpreisangebot.
                    </p>
                </header>

                <BadanfrageFunnel />
            </div>
            <QualityPromise />
        </div>
    );
}
