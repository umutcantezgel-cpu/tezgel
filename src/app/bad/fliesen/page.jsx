import React from 'react';
import Link from 'next/link';
import {
    ShieldCheck,
    Phone,
    ArrowRight,
    Sparkles,
    Maximize2,
    Footprints,
    Layers,
    Wrench,
    Grid,
    Star,
    Quote
} from 'lucide-react';
import { COMPANY_DATA, processSteps } from '@/config/company';
import { REVIEWS } from '@/config/reviews';
import BadanfrageFunnel from '@/components/funnels/BadanfrageFunnel';

export const metadata = {
    title: 'Fliesen im Bad | XXL-Großformate & Mosaik in Aßlar & Wetzlar',
    description: 'Fachgerechte Fliesenverlegung im Badezimmer: Großformatige Fliesen, Feinsteinzeug, Mosaike und Naturstein in Aßlar, Wetzlar & Lahn-Dill.',
    alternates: { canonical: '/bad/fliesen' }
};

const TILE_FEATURES = [
    { title: 'XXL-Großformatfliesen', desc: 'Fliesen bis 120 x 278 cm für moderne, fugenarme Wandflächen mit minimalem Pflegeaufwand und großzügiger Raumwirkung.', icon: Maximize2 },
    { title: 'Verbundabdichtung nach DIN 18534', desc: 'Normgerechte Abdichtung im Dusch- und Wannenbereich schützt Mauerwerk und Bausubstanz dauerhaft vor Durchfeuchtung.', icon: ShieldCheck },
    { title: 'Rutschhemmung R10 / R11', desc: 'Sichere Bodenfliesen im Nassbereich für barrierefreie Bäder nach DIN 18040-2 zur Vermeidung von Ausrutschunfällen.', icon: Footprints },
    { title: 'Feinsteinzeug & Naturstein', desc: 'Robuste, kratzfeste und pflegeleichte Materialien in edler Beton-, Holz-, Marmor- oder Schieferoptik.', icon: Layers },
    { title: 'Filigrane Mosaike & Nischen', desc: 'Individuell beleuchtete Shampoonischen, Wandablagen und akzentuierte Duschbereiche mit Mosaikfliesen.', icon: Sparkles },
    { title: 'Abgestimmte Gewerke', desc: 'Keine Fugenabrisse oder Schnittstellenprobleme: Fliesenarbeiten und Sanitärinstallation werden eng aufeinander abgestimmt.', icon: Wrench }
];

export default function FliesenPage() {
    const review = REVIEWS.find((r) => r.id === 'elke-s');

    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            {/* Ambient Glow */}
            <div className="ambient-glow-orange -top-32 -left-32 opacity-70" />
            <div className="ambient-glow-red top-96 -right-24 opacity-60" />

            {/* Hero */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10" aria-labelledby="fliesen-heading">
                <div className="ceramic-hero rounded-tile-lg border border-neutral-200/80 shadow-tile p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow">
                        <Grid className="w-3.5 h-3.5" />
                        Fliesen- &amp; Natursteinhandwerk &middot; Aßlar &amp; Wetzlar
                    </span>
                    <h1 id="fliesen-heading" className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                        Perfekte Fliesenverlegung{' '}
                        <span className="text-ceramic-gradient">für Ihr neues Badezimmer</span>
                    </h1>
                    <p className="text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
                        Großformatige Fliesen (XXL), fugenarme Wandkonzepte, edler Naturstein und rutschhemmende Mosaike –
                        millimetergenau verlegt und fachgerecht abgedichtet nach DIN 18534.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
                        <Link href="/kontakt" className="btn-primary px-7 py-3.5 text-xs group">
                            Beratung &amp; Aufmaß anfragen
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className="btn-ghost px-7 py-3.5 text-xs">
                            <Phone className="w-4 h-4 text-orange-600" />
                            {COMPANY_DATA.contact.phone}
                        </a>
                    </div>
                </div>
            </section>

            {/* Content Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10" aria-labelledby="fliesen-features-heading">
                <div className="text-center max-w-3xl mx-auto mb-14">
                    <span className="eyebrow eyebrow-sky mb-4">Fliesen im Bad</span>
                    <h2 id="fliesen-features-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        Formate, Materialien &amp; Details{' '}
                        <span className="text-ceramic-gradient">in Fachqualität</span>
                    </h2>
                </div>

                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {TILE_FEATURES.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li
                                key={item.title}
                                className="group glass-surface p-7 rounded-tile-md hover:-translate-y-0.5 hover:border-orange-500 hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.14)] transition-all duration-300"
                            >
                                <span className="icon-chip w-12 h-12 mb-5">
                                    <Icon className="w-6 h-6" />
                                </span>
                                <h3 className="font-black text-base text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">{item.title}</h3>
                                <p className="text-sm text-slate-700 leading-relaxed">{item.desc}</p>
                            </li>
                        );
                    })}
                </ul>
            </section>

            {/* Process */}
            <section className="py-20 bg-white border-y border-slate-200 relative z-10" aria-labelledby="fliesen-ablauf-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <span className="eyebrow mb-4">Transparenter Ablauf</span>
                        <h2 id="fliesen-ablauf-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            In 3 Schritten zum neuen Fliesenbelag
                        </h2>
                        <p className="mt-3 text-base text-slate-700 leading-relaxed">
                            Von der ersten Begutachtung bis zur sauberen Abnahme durch {COMPANY_DATA.owner.fullName} persönlich.
                        </p>
                    </div>

                    <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {processSteps.map((stepItem) => (
                            <li
                                key={stepItem.step}
                                className="group p-8 rounded-tile-md bg-slate-50 border border-slate-200 hover:bg-white hover:-translate-y-0.5 hover:border-orange-500 transition-all duration-300"
                            >
                                <span className="font-display block text-5xl font-black tabular-nums text-orange-600/25 group-hover:text-orange-600/40 transition-colors mb-4" aria-hidden="true">
                                    {stepItem.step}
                                </span>
                                <span className="block text-[11px] font-black uppercase tracking-widest text-orange-950 mb-1">
                                    {stepItem.subtitle}
                                </span>
                                <h3 className="text-lg font-black text-slate-900 mb-3">{stepItem.title}</h3>
                                <p className="text-sm text-slate-700 leading-relaxed">{stepItem.description}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* Review */}
            {review && (
                <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-6 relative z-10" aria-label="Kundenstimme">
                    <figure className="glass-surface rounded-tile-md p-7 sm:p-10 text-center">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <span className="flex items-center gap-0.5 text-amber-500" aria-label={`${review.rating} von 5 Sternen`}>
                                {Array.from({ length: review.rating }, (_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-current" aria-hidden="true" />
                                ))}
                            </span>
                            <Quote className="w-6 h-6 text-orange-600/40" aria-hidden="true" />
                        </div>
                        <blockquote className="text-base sm:text-lg text-slate-800 leading-relaxed">„{review.text}“</blockquote>
                        <figcaption className="mt-4 text-sm">
                            <span className="font-bold text-slate-900">{review.author}</span>
                            <span className="text-slate-600"> &middot; {review.source}-Rezension &middot; {review.topic}</span>
                        </figcaption>
                        <Link
                            href="/referenzen"
                            className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-orange-600 hover:text-orange-700"
                        >
                            Alle Kundenbewertungen ansehen
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </figure>
                </section>
            )}

            {/* Funnel */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10 scroll-mt-28" id="anfrage" aria-label="Badanfrage">
                <BadanfrageFunnel />
            </section>
        </div>
    );
}
