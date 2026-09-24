import React from 'react';
import Link from 'next/link';
import { ArrowRight, Phone, MessageCircle, Star, Bath, House, Layers, Sun, LayoutGrid, CheckCircle2, Camera } from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import { PORTFOLIO_PROJECTS, categories, isPlaceholderProject } from '@/config/projects';
import { RATING_SUMMARY } from '@/config/reviews';
import ReviewsSection from '@/components/sections/ReviewsSection';

const { google, trustlocal } = RATING_SUMMARY;

export const metadata = {
    title: 'Referenzen & Kundenbewertungen',
    description: `Echte Kundenbewertungen von Fliesenverlegung Tezgel aus Aßlar: ${google.displayRating} von ${google.maxRating} Sternen aus ${google.count} Google-Rezensionen und ${trustlocal.displayRating} bei Trustlocal – dazu typische Leistungsbeispiele.`,
    alternates: { canonical: '/referenzen' }
};

const CATEGORY_ICONS = {
    bad: Bath,
    wohnen: House,
    treppen: Layers,
    aussen: Sun
};

// Keramik-Fliesenraster als Platzhalter-Visual (statt Fotos)
const TILE_PATTERN_STYLE = {
    backgroundImage:
        'linear-gradient(rgba(100,116,139,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(100,116,139,0.18) 1px, transparent 1px)',
    backgroundSize: '28px 28px'
};

const getCategoryName = (categoryId) =>
    categories.find((category) => category.id === categoryId)?.name || categoryId;

export default function ReferenzenPage() {
    const { contact, owner, motto } = COMPANY_DATA;

    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            {/* Ambient Glow */}
            <div className="ambient-glow-sky -top-20 -left-20" />
            <div className="ambient-glow-mint top-96 -right-20" />

            {/* Hero */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 relative z-10">
                <div className="ceramic-hero rounded-[3rem] p-8 sm:p-14 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow eyebrow-amber">
                        <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
                        {google.displayRating} &middot; {google.count} {google.label}
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                        Referenzen &amp; <span className="text-ceramic-gradient">Kundenbewertungen</span>
                    </h1>
                    <p className="text-sm sm:text-base text-slate-700 max-w-2xl mx-auto leading-relaxed">
                        Was unsere Kunden in Aßlar, Wetzlar und Mittelhessen über Bäder, Balkone, Treppen und komplette
                        Häuser sagen – wörtlich zitiert aus öffentlichen Rezensionen.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
                        <a href="#bewertungen" className="btn-primary px-7 py-3.5 text-xs">
                            Bewertungen lesen
                            <ArrowRight className="w-4 h-4" />
                        </a>
                        <Link href="/kontakt" className="btn-ghost px-7 py-3.5 text-xs">
                            Vor-Ort-Aufmaß anfragen
                        </Link>
                    </div>
                </div>
            </div>

            <ReviewsSection />

            {/* Leistungsbeispiele (reservierte Referenzplätze) */}
            {PORTFOLIO_PROJECTS.length > 0 && (
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10" aria-labelledby="projekte-heading">
                    <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
                        <span className="eyebrow eyebrow-sky">Projektdokumentationen folgen</span>
                        <h2 id="projekte-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Leistungsbeispiele
                        </h2>
                        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                            Diese Beispiele zeigen, was zu typischen Projekten gehört. Fotos und Details realer Projekte
                            veröffentlichen wir erst, wenn unsere Kunden zugestimmt haben.
                        </p>
                    </div>

                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {PORTFOLIO_PROJECTS.map((project) => {
                            const Icon = CATEGORY_ICONS[project.category] || LayoutGrid;
                            const placeholder = isPlaceholderProject(project);

                            return (
                                <li key={project.id}>
                                    <article className="group glass-surface p-5 rounded-[2rem] h-full flex flex-col hover:-translate-y-0.5 hover:border-emerald-500/80 hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.14)] transition-all duration-300">
                                        {/* Keramik-Panel statt Foto */}
                                        <div
                                            className="relative h-40 rounded-3xl border border-slate-200 bg-gradient-to-br from-emerald-50 via-white to-sky-50 overflow-hidden flex items-center justify-center"
                                            style={TILE_PATTERN_STYLE}
                                            aria-hidden="true"
                                        >
                                            <div className="w-16 h-16 rounded-2xl bg-white/90 border border-white/80 shadow-sm flex items-center justify-center">
                                                <Icon className="w-8 h-8 text-emerald-600" />
                                            </div>
                                        </div>

                                        <div className="px-3 pt-5 space-y-3 flex-1">
                                            <div>
                                                <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                                                    {getCategoryName(project.category)}
                                                </span>
                                            </div>
                                            <p className="text-xs font-bold text-sky-800 flex items-start gap-1.5">
                                                <Camera className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-px" aria-hidden="true" />
                                                {placeholder ? 'Referenzprojekt – Projektdokumentation in Vorbereitung' : 'Referenzprojekt'}
                                            </p>
                                            <h3 className="font-black text-lg text-slate-900 leading-snug">
                                                <Link
                                                    href={`/referenzen/${project.id}`}
                                                    className="hover:text-emerald-800 transition-colors"
                                                >
                                                    {project.title}
                                                </Link>
                                            </h3>
                                            {Array.isArray(project.scopeItems) && project.scopeItems.length > 0 && (
                                                <ul className="space-y-1.5">
                                                    {project.scopeItems.slice(0, 3).map((item) => (
                                                        <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                                                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                                                            <span>{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>

                                        <div className="px-3 pt-4 mt-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs font-black">
                                            <Link
                                                href={`/referenzen/${project.id}`}
                                                className="text-emerald-800 hover:text-emerald-700 flex items-center gap-1"
                                                aria-label={`Leistungsumfang ansehen: ${project.title}`}
                                            >
                                                Leistungsumfang
                                                <ArrowRight className="w-3.5 h-3.5" />
                                            </Link>
                                            {project.serviceLink && (
                                                <Link
                                                    href={project.serviceLink}
                                                    className="text-sky-800 hover:text-emerald-700 hover:underline underline-offset-2"
                                                    aria-label={`Mehr zur Leistung: ${project.title}`}
                                                >
                                                    Mehr zur Leistung
                                                </Link>
                                            )}
                                        </div>
                                    </article>
                                </li>
                            );
                        })}
                    </ul>
                </section>
            )}

            {/* CTA */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 relative z-10" aria-labelledby="referenzen-cta">
                <div className="ceramic-hero rounded-[3rem] p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow">Kostenfrei &amp; unverbindlich</span>
                    <h2 id="referenzen-cta" className="text-2xl sm:text-3xl font-black text-slate-900">
                        Überzeugen Sie sich selbst von unserer Meisterqualität
                    </h2>
                    <p className="text-sm sm:text-base text-slate-700 max-w-2xl mx-auto leading-relaxed">
                        Kostenfreies Vor-Ort-Aufmaß durch {owner.fullName} – in Aßlar, Wetzlar, Gießen und Umgebung.
                    </p>
                    <p className="text-sm italic text-slate-700">„{motto}“</p>
                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
                        <Link href="/kontakt" className="btn-primary px-7 py-3.5 text-xs">
                            Aufmaß anfragen
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <a
                            href={contact.whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass-button-whatsapp px-7 py-3.5 text-xs"
                        >
                            <MessageCircle className="w-4 h-4" />
                            WhatsApp
                        </a>
                        <a href={`tel:${contact.phoneLink}`} className="btn-ghost px-7 py-3.5 text-xs">
                            <Phone className="w-4 h-4 text-emerald-700" />
                            {contact.phone}
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
