import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import type { LucideIcon } from 'lucide-react';
import {
    Phone,
    ShieldCheck,
    Sparkles,
    CheckCircle2,
    ArrowRight,
    Droplets,
    Sun,
    Award,
    Check,
    MapPin,
    MessageCircle,
    Star,
    Calculator,
    BookOpen,
    Quote
} from 'lucide-react';
import { COMPANY_DATA, processSteps } from '@/config/company';
import { SERVICES } from '@/config/services';
import { CITIES } from '@/config/cities';
import { RATING_SUMMARY, getFeaturedReviews } from '@/config/reviews';
import { TOPIC_HUBS } from '@/config/topics';
import TezgelAnfrageFunnel from '@/components/funnels/TezgelAnfrageFunnel';

export const metadata: Metadata = {
    title: {
        absolute: 'Fliesenverlegung Tezgel | Meisterbetrieb für Fliesen & Badsanierung in Aßlar & Wetzlar'
    },
    description: 'Ihr Meisterbetrieb für fugenarme Großformate, barrierefreie Badsanierung, Terrassen auf Stelzlagern & DIN 18534 Verbundabdichtung in Aßlar, Wetzlar und ganz Hessen.',
    alternates: {
        canonical: '/'
    },
    openGraph: {
        url: '/'
    }
};

const QUICK_PICKS: Array<{ title: string; text: string; href: string; icon: LucideIcon }> = [
    { title: 'Bad & Walk-In-Dusche', text: 'Badsanierung, Großformate, barrierefrei', href: '/bad', icon: Droplets },
    { title: 'Wohnbereiche & Neubau', text: 'Feinsteinzeug, Küche, Flure & Treppen', href: '/leistungen/wohnen', icon: Sparkles },
    { title: 'Balkon & Terrasse', text: 'Keramik auf Stelzlagern, Entwässerung', href: '/leistungen/aussen', icon: Sun },
    { title: 'Untergrund & Abdichtung', text: 'Estrichausgleich, DIN 18534', href: '/leistungen/untergrund', icon: ShieldCheck }
];

const PILLAR_EYEBROWS = ['Normgerechte Sicherheit', 'Meisterhafte Ausführung', 'Wohnkomfort bei Sanierung'];

const PORTAL_HUBS: Array<{
    eyebrow: string;
    title: string;
    text: string;
    icon: LucideIcon;
    links: Array<{ label: string; href: string }>;
    cta: { label: string; href: string };
}> = [
    {
        eyebrow: 'Komplettbäder',
        title: 'Badsanierung & Wellness',
        text: 'Barrierefreie Walk-In-Duschen, fugenarme Großformate und staubgeschützte Komplettsanierung.',
        icon: Droplets,
        links: [
            { label: 'Badsanierung komplett', href: '/bad/badsanierung' },
            { label: 'Fliesen & XXL-Großformate', href: '/bad/fliesen' },
            { label: 'Barrierefreies Bad', href: '/bad/barrierefreies-bad' },
            { label: 'Bad aus einer Hand', href: '/bad/bad-aus-einer-hand' },
            { label: 'Musterbäder', href: '/bad/musterbaeder' }
        ],
        cta: { label: 'Zur Bad-Übersicht', href: '/bad' }
    },
    {
        eyebrow: 'Planer-Tools',
        title: 'Rechner & Planung',
        text: 'Badprojekt in 2 Minuten beschreiben, das Bad Schritt für Schritt planen und Fördermöglichkeiten prüfen.',
        icon: Calculator,
        links: [
            { label: 'Bad-Projektcheck', href: '/bad/projekt-check' },
            { label: 'Badplaner', href: '/bad/badplaner' },
            { label: 'Geführte Badanfrage', href: '/bad/badanfrage' },
            { label: 'Vor-Ort-Beratung', href: '/beratung' },
            { label: 'Förderung & Zuschüsse', href: '/foerderung' }
        ],
        cta: { label: 'Projektcheck starten', href: '/bad/projekt-check' }
    },
    {
        eyebrow: 'Standorte Hessen',
        title: `${CITIES.length} Städte & Regionen`,
        text: 'Vom Firmensitz in Aßlar aus im Lahn-Dill-Kreis, im Raum Gießen, in Marburg und der Wetterau im Einsatz.',
        icon: MapPin,
        links: CITIES.map((city) => ({ label: city.name, href: `/standorte/${city.slug}` })),
        cta: { label: 'Alle Standorte', href: '/standorte' }
    },
    {
        eyebrow: 'Referenzen & Wissen',
        title: 'Bewertungen & Ratgeber',
        text: 'Echte Kundenstimmen, Antworten auf häufige Fragen und Ratgeber rund um Bad und Fliesen.',
        icon: BookOpen,
        links: [
            { label: 'Referenzen & Bewertungen', href: '/referenzen' },
            { label: 'Ratgeber & Blog', href: '/blog' },
            { label: 'Häufige Fragen', href: '/faq' },
            { label: 'Über Deniz Tezgel', href: '/ueber-uns' },
            { label: 'Kontakt & Aufmaß', href: '/kontakt' }
        ],
        cta: { label: 'Zu den Bewertungen', href: '/referenzen' }
    }
];

const SERVICE_ICONS: Record<string, LucideIcon> = {
    bad: Droplets,
    wohnen: Sparkles,
    aussen: Sun,
    untergrund: ShieldCheck
};

// Bento placement per service (lg: 3-column grid → 2+1 / 1+2).
const BENTO_LAYOUT: Record<string, string> = {
    bad: 'md:col-span-2',
    wohnen: '',
    aussen: '',
    untergrund: 'md:col-span-2'
};

function Stars({ count = 5, className = 'w-4 h-4' }: { count?: number; className?: string }) {
    return (
        <span className="flex items-center gap-0.5 text-amber-500" aria-hidden="true">
            {Array.from({ length: count }, (_, i) => (
                <Star key={i} className={`${className} fill-current`} />
            ))}
        </span>
    );
}

export default function HomePage() {
    const { contact, motto, owner } = COMPANY_DATA;
    const google = RATING_SUMMARY.google;
    const trustlocal = RATING_SUMMARY.trustlocal;
    const featuredReviews = getFeaturedReviews();

    return (
        <div className="relative overflow-hidden">
            <div className="ambient-glow-mint -top-32 -left-32 opacity-70" />
            <div className="ambient-glow-sky top-96 -right-24 opacity-60" />
            <div className="ambient-glow-slate top-[1500px] left-1/4 opacity-40" />

            {/* 1. HERO */}
            <section className="relative pt-32 pb-16 md:pt-40 md:pb-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                        <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                                <span className="eyebrow">
                                    <Award className="w-3.5 h-3.5" />
                                    Meisterbetrieb &middot; {COMPANY_DATA.authority.shortName}
                                </span>
                                <span className="eyebrow eyebrow-sky">
                                    <ShieldCheck className="w-3.5 h-3.5" />
                                    DIN 18534 Verbundabdichtung
                                </span>
                                <span className="eyebrow eyebrow-amber">
                                    <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
                                    {google.displayRating} &middot; {google.count} {google.label}
                                </span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.05]">
                                Perfektion auf jedem{' '}
                                <span className="text-ceramic-gradient">Quadratmeter.</span>
                                <span className="block mt-3 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-700">
                                    Fliesenverlegung &amp; Badsanierung aus Aßlar
                                </span>
                            </h1>

                            <p className="text-base sm:text-lg text-slate-700 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                                Fugenarme XXL-Großformate, barrierefreie Walk-In-Duschen, repräsentative Wohnbereiche und
                                frostsichere Terrassen – millimetergenau verlegt, normgerecht abgedichtet nach DIN 18534 und
                                mit Staubschutz-Garantie im bewohnten Zuhause.
                            </p>

                            <div className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center lg:justify-start gap-3 [&>*]:whitespace-nowrap">
                                <Link href="/kontakt" className="btn-primary w-full sm:w-auto group">
                                    Vor-Ort-Aufmaß vereinbaren
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                                <a
                                    href={contact.whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="glass-button-whatsapp w-full sm:w-auto text-sm"
                                >
                                    <MessageCircle className="w-4 h-4" />
                                    WhatsApp
                                </a>
                                <a href={`tel:${contact.phoneLink}`} className="btn-ghost w-full sm:w-auto">
                                    <Phone className="w-4 h-4 text-emerald-700" />
                                    {contact.phone}
                                </a>
                            </div>

                            <ul className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-sm font-semibold text-slate-700">
                                {['Kostenfreies Vor-Ort-Aufmaß', 'Staubschutz-Garantie', 'Verbindlicher Festpreis'].map((item) => (
                                    <li key={item} className="flex items-center gap-1.5">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <figure className="glass-surface rounded-2xl px-5 py-4 max-w-xl mx-auto lg:mx-0 text-left">
                                <blockquote className="text-sm italic text-slate-800">„{motto}“</blockquote>
                                <figcaption className="mt-1 text-xs font-bold text-emerald-800">
                                    — {owner.fullName}, Inhaber &amp; Handwerksmeister
                                </figcaption>
                            </figure>
                        </div>

                        {/* Quick picker */}
                        <div className="lg:col-span-5">
                            <div className="glass-surface rounded-[2rem] p-6 sm:p-8">
                                <div className="flex items-center justify-between gap-3 mb-5">
                                    <span className="eyebrow">Gewerke-Schnellwahl</span>
                                    <span className="hidden sm:inline text-xs font-bold text-slate-600">Aßlar &middot; Wetzlar &middot; Hessen</span>
                                </div>
                                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-1">Was möchten Sie verlegen lassen?</h2>
                                <p className="text-sm text-slate-700 mb-5">Wählen Sie Ihr Vorhaben – wir zeigen Ihnen Ausführung, Materialien und Ablauf.</p>

                                <ul className="space-y-3">
                                    {QUICK_PICKS.map(({ title, text, href, icon: Icon }) => (
                                        <li key={href}>
                                            <Link
                                                href={href}
                                                className="group flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500/80 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-10px_rgba(15,23,42,0.18)] transition-all duration-300"
                                            >
                                                <span className="flex items-center gap-3">
                                                    <span className="icon-chip w-11 h-11">
                                                        <Icon className="w-5 h-5" />
                                                    </span>
                                                    <span>
                                                        <span className="block text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">{title}</span>
                                                        <span className="block text-xs text-slate-600">{text}</span>
                                                    </span>
                                                </span>
                                                <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-5 pt-4 border-t border-slate-200 flex items-center justify-between gap-3 text-sm text-slate-700">
                                    <span>Schnellste Rückmeldung:</span>
                                    <a
                                        href={contact.whatsappLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-bold text-emerald-800 hover:underline underline-offset-4 flex items-center gap-1.5"
                                    >
                                        <MessageCircle className="w-4 h-4" />
                                        WhatsApp-Chat
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. TRUST PILLARS */}
            <section className="py-16 relative z-10" id="vertrauen" aria-label="Unsere Garantien">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {COMPANY_DATA.trustPillars.map((pillar: { title: string; description: string; icon: LucideIcon }, idx: number) => {
                            const Icon = pillar.icon;
                            return (
                                <li
                                    key={pillar.title}
                                    className="group glass-surface rounded-3xl p-7 hover:-translate-y-0.5 hover:border-emerald-500/80 transition-all duration-300"
                                >
                                    <span className="icon-chip w-12 h-12 mb-5">
                                        <Icon className="w-6 h-6" />
                                    </span>
                                    <span className="block text-[11px] font-black uppercase tracking-widest text-emerald-800 mb-1">
                                        {PILLAR_EYEBROWS[idx]}
                                    </span>
                                    <h3 className="text-lg font-black text-slate-900 mb-2">{pillar.title}</h3>
                                    <p className="text-sm text-slate-700 leading-relaxed">{pillar.description}</p>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </section>

            {/* 3. PORTAL SHOWCASE */}
            <section className="py-20 bg-white border-y border-slate-200 relative z-10" id="portal-netzwerk" aria-labelledby="portal-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="eyebrow mb-4">Fachbereiche &amp; Tools</span>
                        <h2 id="portal-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Alles für Ihr Vorhaben auf über 100 Fachseiten
                        </h2>
                        <p className="mt-3 text-base text-slate-700">
                            Von der schlüsselfertigen Badsanierung über Planungs-Tools bis zu den Standorten in Hessen –
                            wählen Sie Ihren Themenbereich.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {PORTAL_HUBS.map(({ eyebrow, title, text, icon: Icon, links, cta }) => (
                            <article
                                key={eyebrow}
                                className="group flex flex-col justify-between p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:bg-white hover:border-emerald-500/80 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.14)] transition-all duration-300"
                            >
                                <div>
                                    <span className="icon-chip w-12 h-12 mb-4">
                                        <Icon className="w-6 h-6" />
                                    </span>
                                    <span className="text-[11px] font-black uppercase tracking-widest text-emerald-800">{eyebrow}</span>
                                    <h3 className="text-lg font-black text-slate-900 mt-1 mb-2">{title}</h3>
                                    <p className="text-sm text-slate-700 mb-4 leading-relaxed">{text}</p>
                                    <ul
                                        className={`border-t border-slate-200 pt-3 text-sm font-semibold text-slate-800 ${
                                            links.length > 6 ? 'flex flex-wrap gap-1.5' : 'space-y-1.5'
                                        }`}
                                    >
                                        {links.map((link) => (
                                            <li key={link.href}>
                                                {links.length > 6 ? (
                                                    <Link
                                                        href={link.href}
                                                        className="inline-block px-2.5 py-1 rounded-full bg-white border border-slate-200 text-xs hover:border-emerald-500/80 hover:text-emerald-800 transition-colors"
                                                    >
                                                        {link.label}
                                                    </Link>
                                                ) : (
                                                    <Link href={link.href} className="flex items-center gap-1.5 hover:text-emerald-800 transition-colors">
                                                        <ArrowRight className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                                        {link.label}
                                                    </Link>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="pt-4 mt-4 border-t border-slate-200">
                                    <Link href={cta.href} className="text-sm font-bold text-emerald-800 hover:text-emerald-700 inline-flex items-center gap-1">
                                        {cta.label}
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="mt-10">
                        <p className="text-center text-[11px] font-black uppercase tracking-widest text-slate-600 mb-4">
                            Fachthemen im Detail
                        </p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {TOPIC_HUBS.map((hub) => (
                                <li key={hub.id}>
                                    <Link
                                        href={hub.path}
                                        className="group flex items-center justify-between gap-3 px-5 py-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500/80 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-10px_rgba(15,23,42,0.18)] transition-all duration-300"
                                    >
                                        <span>
                                            <span className="block text-sm font-black text-slate-900 group-hover:text-emerald-800 transition-colors">
                                                {hub.name}
                                            </span>
                                            <span className="block text-xs text-slate-600">
                                                {hub.pages.length} Seiten &middot; {hub.description}
                                            </span>
                                        </span>
                                        <ArrowRight className="w-4 h-4 text-emerald-600 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* 4. BENTO GRID – FACHGEWERKE */}
            <section className="py-20 relative z-10" id="leistungen" aria-labelledby="leistungen-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <span className="eyebrow mb-4">Meister-Fachgewerke</span>
                        <h2 id="leistungen-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Fliesen-, Platten- &amp; Verlegearbeiten{' '}
                            <span className="text-ceramic-gradient">in Meisterqualität</span>
                        </h2>
                        <p className="mt-3 text-base text-slate-700 leading-relaxed">
                            Ob barrierefreie Wellnessoase, offenes Wohnen mit Feinsteinzeug oder die wetterfeste Terrasse:
                            Meisterqualität aus Aßlar für den Lahn-Dill-Kreis und Hessen.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {SERVICES.map((srv) => {
                            const Icon = SERVICE_ICONS[srv.id] || Sparkles;
                            const isFeature = srv.id === 'bad';
                            return (
                                <article
                                    key={srv.id}
                                    className={`group glass-surface rounded-[2rem] p-7 sm:p-8 flex flex-col justify-between hover:-translate-y-0.5 hover:border-emerald-500/80 hover:shadow-[0_24px_48px_-16px_rgba(15,23,42,0.18)] transition-all duration-300 ${BENTO_LAYOUT[srv.id] || ''} ${
                                        isFeature ? 'ceramic-hero' : ''
                                    }`}
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-6">
                                            <span className={`icon-chip ${isFeature ? 'w-16 h-16' : 'w-14 h-14'}`}>
                                                <Icon className={isFeature ? 'w-8 h-8' : 'w-7 h-7'} />
                                            </span>
                                            <span className="eyebrow eyebrow-neutral">Meister-Fachgewerk</span>
                                        </div>
                                        <h3 className={`${isFeature ? 'text-2xl sm:text-3xl' : 'text-xl'} font-black text-slate-900 mb-2 group-hover:text-emerald-800 transition-colors`}>
                                            {srv.name}
                                        </h3>
                                        <p className="text-sm text-slate-700 mb-6 leading-relaxed">{srv.shortDescription}</p>
                                        <ul className={`grid gap-2 mb-6 ${isFeature ? 'sm:grid-cols-2' : ''}`}>
                                            {srv.features.slice(0, isFeature ? 6 : 3).map((feat) => (
                                                <li key={feat} className="flex items-start gap-2 text-sm text-slate-700">
                                                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                                    <span>{feat}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="pt-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                                        <Link
                                            href={`/leistungen/${srv.id}`}
                                            className="text-sm font-bold text-emerald-800 hover:text-emerald-700 inline-flex items-center gap-1.5"
                                        >
                                            Details &amp; Ausführung
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                        {isFeature && (
                                            <Link href="/bad" className="btn-primary px-5 py-2.5 text-xs">
                                                Zur Badsanierung
                                            </Link>
                                        )}
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 5. PROCESS */}
            <section className="py-20 relative z-10" id="ablauf" aria-labelledby="ablauf-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <span className="eyebrow eyebrow-sky mb-4">Transparenter Ablauf</span>
                        <h2 id="ablauf-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            In 3 Schritten zu Ihrem neuen Belag
                        </h2>
                        <p className="mt-3 text-base text-slate-700 leading-relaxed">
                            Keine Überraschungen, keine versteckten Kosten – von der ersten Begutachtung bis zur sauberen
                            Abnahme durch {owner.fullName} persönlich.
                        </p>
                    </div>

                    <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {processSteps.map((stepItem) => (
                            <li
                                key={stepItem.step}
                                className="group glass-surface rounded-3xl p-8 relative overflow-hidden hover:-translate-y-0.5 hover:border-emerald-500/80 transition-all duration-300"
                            >
                                <span className="font-display block text-5xl font-black tabular-nums text-emerald-600/25 group-hover:text-emerald-600/40 transition-colors mb-4" aria-hidden="true">
                                    {stepItem.step}
                                </span>
                                <span className="block text-[11px] font-black uppercase tracking-widest text-emerald-800 mb-1">
                                    {stepItem.subtitle}
                                </span>
                                <h3 className="text-lg font-black text-slate-900 mb-3">{stepItem.title}</h3>
                                <p className="text-sm text-slate-700 leading-relaxed">{stepItem.description}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* 6. XXL SPOTLIGHT */}
            <section className="py-20 relative z-10" aria-labelledby="spotlight-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="ceramic-hero rounded-[3rem] p-8 sm:p-12 lg:p-16">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                            <div className="lg:col-span-7 space-y-6">
                                <span className="eyebrow">
                                    <Award className="w-3.5 h-3.5" />
                                    Meisterbetrieb für anspruchsvolle Architektur
                                </span>
                                <h2 id="spotlight-heading" className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
                                    Fugenarme XXL-Großformate{' '}
                                    <span className="text-ceramic-gradient">&amp; meisterhafte Badsanierung</span>
                                </h2>
                                <p className="text-base text-slate-700 leading-relaxed">
                                    Großformatige Platten verlangen höchste Präzision: Mit Nivelliersystem, Vakuumhebetechnik und
                                    flexiblen C2-Fliesenklebern entstehen planebene Flächen mit ruhigem, monolithischem
                                    Raumgefühl – ohne störende Fugenkreuze.
                                </p>
                                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="rounded-2xl bg-white border border-slate-200 p-5 flex flex-col-reverse justify-end gap-1">
                                        <dt className="text-sm text-slate-700">Normgerechte Verbundabdichtung</dt>
                                        <dd className="font-display text-2xl font-black text-emerald-800">DIN 18534</dd>
                                    </div>
                                    <div className="rounded-2xl bg-white border border-slate-200 p-5 flex flex-col-reverse justify-end gap-1">
                                        <dt className="text-sm text-slate-700">Großformate für fugenarme Wand- &amp; Bodenflächen</dt>
                                        <dd className="font-display text-2xl font-black text-sky-800">XXL</dd>
                                    </div>
                                </dl>
                                <div className="flex flex-wrap items-center gap-3">
                                    <Link href="/bad/fliesen" className="btn-primary">
                                        Großformate im Bad
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                    <a href={`tel:${contact.phoneLink}`} className="btn-ghost">
                                        <Phone className="w-4 h-4 text-emerald-700" />
                                        {contact.phone}
                                    </a>
                                </div>
                            </div>

                            <div className="lg:col-span-5">
                                <div className="glass-surface rounded-3xl p-7 sm:p-8 space-y-4">
                                    <span className="text-[11px] font-black uppercase tracking-widest text-emerald-800 block">
                                        Regional verwurzelt
                                    </span>
                                    <h3 className="text-xl font-black text-slate-900">{COMPANY_DATA.legalName} in Aßlar</h3>
                                    <p className="text-sm text-slate-700 leading-relaxed">
                                        Wir betreuen Privatkunden, Architekten und Bauherren in Aßlar, Wetzlar, Gießen, Herborn und
                                        ganz Hessen.
                                    </p>
                                    <ul className="space-y-3 text-sm text-slate-800">
                                        {[
                                            `Persönliche Betreuung durch ${owner.fullName}`,
                                            'Kostenfreies Vor-Ort-Aufmaß & Begutachtung',
                                            'Festpreisangebot ohne Nachforderungen'
                                        ].map((item) => (
                                            <li key={item} className="flex items-center gap-2.5">
                                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="pt-4 border-t border-slate-200 text-sm italic text-slate-700">„{motto}“</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. SOCIAL PROOF */}
            <section className="py-20 relative z-10" aria-labelledby="bewertungen-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <span className="eyebrow eyebrow-amber mb-4">Echte Kundenstimmen</span>
                        <h2 id="bewertungen-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Was unsere Kunden in Mittelhessen sagen
                        </h2>
                        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                            <div className="glass-surface rounded-full px-5 py-2.5 flex items-center gap-3">
                                <Stars />
                                <span className="text-sm font-bold text-slate-900">
                                    {google.displayRating} / {google.maxRating}
                                </span>
                                <span className="text-sm text-slate-700">{google.count} {google.label}</span>
                            </div>
                            <div className="glass-surface rounded-full px-5 py-2.5 flex items-center gap-2">
                                <span className="text-sm font-bold text-slate-900">{trustlocal.displayRating}</span>
                                <span className="text-sm text-slate-700">{trustlocal.count} {trustlocal.label}</span>
                            </div>
                        </div>
                    </div>

                    <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {featuredReviews.map((review) => (
                            <li key={review.id} className="glass-surface rounded-3xl p-7 flex flex-col justify-between">
                                <figure>
                                    <div className="flex items-center justify-between mb-4">
                                        <Stars count={review.rating} />
                                        <Quote className="w-6 h-6 text-emerald-600/40" aria-hidden="true" />
                                    </div>
                                    <blockquote className="text-sm text-slate-800 leading-relaxed">„{review.text}“</blockquote>
                                    <figcaption className="mt-5 pt-4 border-t border-slate-200 flex items-center justify-between gap-2">
                                        <span className="text-sm font-bold text-slate-900">{review.author}</span>
                                        <span className="text-xs font-semibold text-slate-600">
                                            {review.source}-Rezension &middot; {review.topic}
                                        </span>
                                    </figcaption>
                                </figure>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-10 text-center">
                        <Link href="/referenzen" className="btn-ghost">
                            Alle Kundenbewertungen ansehen
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* 8. EXPRESS FUNNEL */}
            <section className="py-20 relative z-10 scroll-mt-28" id="express-anfrage" aria-labelledby="anfrage-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="eyebrow mb-4">Kostenfrei &amp; unverbindlich</span>
                        <h2 id="anfrage-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Ihre Express-Anfrage in 3 Klicks
                        </h2>
                        <p className="mt-3 text-base text-slate-700">
                            Vorhaben wählen, Eckdaten eintragen und die Anfrage direkt per WhatsApp an {owner.fullName} oder per
                            E-Mail senden.
                        </p>
                    </div>
                    <TezgelAnfrageFunnel />
                </div>
            </section>
        </div>
    );
}
