import React from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin, Phone, Calendar, MessageCircle, Star } from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import { PORTFOLIO_PROJECTS, categories } from '@/config/projects';
import { RATING_SUMMARY } from '@/config/reviews';
import ReviewsSection from '@/components/sections/ReviewsSection';

const { google, trustlocal } = RATING_SUMMARY;

export const metadata = {
    title: 'Referenzen & Kundenbewertungen',
    description: `Referenzen und echte Kundenbewertungen von Fliesenverlegung Tezgel aus Aßlar: ${google.displayRating} von ${google.maxRating} Sternen aus ${google.count} Google-Rezensionen und ${trustlocal.displayRating} bei Trustlocal.`,
    alternates: { canonical: '/referenzen' }
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

            {/* Project examples */}
            {PORTFOLIO_PROJECTS.length > 0 && (
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10" aria-labelledby="projekte-heading">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="eyebrow eyebrow-sky mb-4">Projektbeispiele</span>
                        <h2 id="projekte-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Ausgewählte Projekte
                        </h2>
                    </div>

                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {PORTFOLIO_PROJECTS.map((project) => (
                            <li key={project.id}>
                                <Link
                                    href={`/referenzen/${project.id}`}
                                    className="group glass-surface p-8 rounded-[2rem] h-full flex flex-col justify-between hover:-translate-y-0.5 hover:border-emerald-500/80 hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.14)] transition-all duration-300"
                                >
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between gap-3">
                                            <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                                                {getCategoryName(project.category)}
                                            </span>
                                            <span className="text-xs text-slate-600 font-bold flex items-center gap-1">
                                                <MapPin className="w-3 h-3 text-emerald-600" />
                                                {project.location}
                                            </span>
                                        </div>
                                        <h3 className="font-black text-lg text-slate-900 leading-snug group-hover:text-emerald-800 transition-colors">
                                            {project.title}
                                        </h3>
                                        <p className="text-sm text-slate-700 leading-relaxed">{project.description}</p>
                                    </div>
                                    <div className="pt-4 mt-6 border-t border-slate-200 flex items-center justify-between gap-3 text-xs font-medium">
                                        <span className="text-slate-600 flex items-center gap-1.5">
                                            {project.year && (
                                                <>
                                                    <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                                                    <span className="tabular-nums">{project.year}</span>
                                                </>
                                            )}
                                            {project.duration && (
                                                <span>
                                                    {project.year ? '· ' : ''}Bauzeit: <strong className="text-slate-900 font-bold">{project.duration}</strong>
                                                </span>
                                            )}
                                        </span>
                                        <span className="text-emerald-800 font-black flex items-center gap-1 shrink-0">
                                            Details
                                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                        </span>
                                    </div>
                                </Link>
                            </li>
                        ))}
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
