import React from 'react';
import Link from 'next/link';
import { Layers, ArrowRight, CheckCircle2 } from 'lucide-react';
import { partnerBrands, COMPANY_DATA } from '@/config/company';
import { createMetadata } from '@/lib/metadata';
import QualityPromise from '@/components/sections/QualityPromise';

export const metadata = createMetadata({
    title: 'Materialien & Systeme, mit denen wir arbeiten',
    description: `Verlegewerkstoffe, Abdichtungssysteme und Fliesen, mit denen ${COMPANY_DATA.legalName} arbeitet: ${partnerBrands.map((brand) => brand.name).join(', ')}.`,
    path: '/partner'
});

// Uses the brand names & categories from COMPANY_DATA only. Partner-status labels are
// intentionally not shown until they are verified.
export default function PartnerPage() {
    const materialPromise = COMPANY_DATA.qualityPromises.find((promise) => promise.title.includes('Verlegewerkstoffe'));

    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            {/* Ambient Glow */}
            <div className="ambient-glow-orange -top-20 -left-20 opacity-70" />
            <div className="ambient-glow-red top-96 -right-20 opacity-60" />

            {/* Hero */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10">
                <div className="ceramic-hero rounded-tile-xl p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow">
                        <Layers className="w-3.5 h-3.5" />
                        Markenqualität ohne Kompromisse
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                        Materialien &amp; Systeme,{' '}
                        <span className="text-ceramic-gradient">mit denen wir arbeiten</span>
                    </h1>
                    {materialPromise && (
                        <p className="text-sm sm:text-base text-slate-700 max-w-2xl mx-auto leading-relaxed">
                            {materialPromise.description}
                        </p>
                    )}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {partnerBrands.map((brand) => (
                        <li
                            key={brand.name}
                            className="group glass-surface p-6 rounded-tile-lg hover:-translate-y-0.5 hover:border-orange-500/80 hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.14)] transition-all duration-300"
                        >
                            <span className="icon-chip w-11 h-11 mb-4">
                                <CheckCircle2 className="w-5 h-5" />
                            </span>
                            <h2 className="text-xl font-black text-slate-900 mb-1 group-hover:text-orange-700 transition-colors">{brand.name}</h2>
                            <p className="text-sm text-slate-700">{brand.category}</p>
                        </li>
                    ))}
                </ul>

                <p className="mt-8 text-center text-xs text-slate-600">
                    Genannte Marken- und Produktnamen sind Eigentum der jeweiligen Hersteller.
                </p>

                <div className="mt-10 text-center">
                    <Link href="/kontakt" className="btn-primary">
                        Material &amp; Fugenbild beraten lassen
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>

            <QualityPromise />
        </div>
    );
}
