import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
import HeroContactForm from '@/components/forms/HeroContactForm';

const SERVICE_IMAGES: Record<string, { src: string; alt: string; tag: string }> = {
    bad: {
        src: '/images/bad/walk-in-dusche.webp',
        alt: 'Bodengleiche Walk-In Dusche und Badgestaltung Tezgel',
        tag: 'Komplettbad & Dusche'
    },
    wohnen: {
        src: '/images/bad/bad-tageslicht.webp',
        alt: 'Wohnbereich und Fliesenverlegung mit Feinsteinzeug',
        tag: 'Wohnbereiche & Neubau'
    },
    aussen: {
        src: '/images/bad/barrierefreies-bad-holz.webp',
        alt: 'Terrassenplatten auf Stelzlagern und Außenbereiche',
        tag: 'Balkon & Terrasse'
    },
    untergrund: {
        src: '/images/bad/wandfliesen-gruen.webp',
        alt: 'Verbundabdichtung DIN 18534 und Estrichausgleich',
        tag: 'DIN 18534 Abdichtung'
    }
};

export const metadata: Metadata = {
    title: {
        absolute: 'Fliesenverlegung Tezgel | Fachbetrieb für Fliesen & Badsanierung in Aßlar & Wetzlar'
    },
    description: 'Ihr Fachbetrieb für fugenarme Großformate, barrierefreie Badsanierung, Terrassen auf Stelzlagern & DIN 18534 Verbundabdichtung in Aßlar, Wetzlar und ganz Hessen.',
    alternates: {
        canonical: '/'
    },
    openGraph: {
        url: '/'
    }
};

const PILLAR_EYEBROWS = ['Normgerechte Sicherheit', 'Fachgerechte Ausführung', 'Wohnkomfort bei Sanierung'];

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
        text: 'Barrierefreie Walk-in-Duschen, fugenarme Großformate und staubgeschützte Komplettsanierung.',
        icon: Droplets,
        links: [
            { label: 'Badsanierung komplett', href: '/bad/badsanierung' },
            { label: 'Fliesen & XXL-Großformat', href: '/bad/fliesen' },
            { label: 'Barrierefreies Bad', href: '/bad/barrierefreies-bad' },
            { label: 'Bad aus einer Hand', href: '/bad/bad-aus-einer-hand' },
            { label: 'Musterbäder', href: '/bad/musterbaeder' }
        ],
        cta: { label: 'Zur Bad-Übersicht', href: '/bad' }
    },
    {
        eyebrow: 'Planungshilfen',
        title: 'Rechner & Planung',
        text: 'Badprojekt in 2 Minuten beschreiben, das Bad Schritt für Schritt planen und Fördermöglichkeiten prüfen.',
        icon: Calculator,
        links: [
            { label: 'Projektcheck', href: '/bad/projekt-check' },
            { label: 'Badplaner', href: '/bad/badplaner' },
            { label: 'Geführte Badanfrage', href: '/bad/badanfrage' },
            { label: 'Beratung vor Ort', href: '/beratung' },
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
            <div className="ambient-glow-orange -top-32 -left-32 opacity-70" />
            <div className="ambient-glow-red top-96 -right-24 opacity-60" />
            <div className="ambient-glow-slate top-[1500px] left-1/4 opacity-40" />

            {/* 1. HERO */}
            <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
                {/* Real Craftsmanship Background Image with Soft Translucent Ceramic Wash */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
                    <Image
                        src="/images/bad/bad-beleuchtete-nischen.webp"
                        alt="Badsanierung mit beleuchteten Wandnischen und Großformatkeramik von Fliesenverlegung Tezgel"
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover object-center scale-105 opacity-[0.20] lg:opacity-[0.25]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FAFAFA] via-[#FAFAFA]/95 to-[#FAFAFA]/85 lg:via-[#FAFAFA]/90 lg:to-[#FAFAFA]/70" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFA] via-transparent to-transparent" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs font-bold text-neutral-700">
                                <span className="inline-flex items-center gap-1.5 text-orange-800">
                                    <Award className="w-4 h-4 text-orange-600 shrink-0" />
                                    Handwerkskammer-eingetragener Fachbetrieb Deniz Tezgel
                                </span>
                                <span className="text-neutral-300 hidden sm:inline">&middot;</span>
                                <span className="flex items-center gap-1 text-neutral-600">
                                    <Star className="w-3.5 h-3.5 fill-current text-amber-500 shrink-0" />
                                    {google.displayRating} ({google.count} Bewertungen)
                                </span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-900 tracking-tight leading-[1.05]">
                                Perfektion auf jedem{' '}
                                <span className="text-ceramic-gradient">Quadratmeter.</span>
                                <span className="block mt-3 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-700">
                                    Fliesenverlegung &amp; Badsanierung aus Aßlar
                                </span>
                            </h1>

                            <p className="text-base sm:text-lg text-neutral-700 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                                Fugenarme XXL-Großformatfliesen, barrierefreie Walk-in-Duschen, repräsentative Wohnbereiche und
                                frostsichere Terrassen – millimetergenau verlegt, normgerecht abgedichtet nach DIN 18534 und
                                mit Staubschutzgarantie im bewohnten Zuhause.
                            </p>

                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 w-full sm:w-auto">
                                <Link href="/kontakt" className="btn-primary w-full sm:w-auto justify-center group shadow-md shadow-orange-900/15 py-3.5">
                                    Aufmaß vor Ort anfragen
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                                <div className="grid grid-cols-2 gap-2.5 w-full sm:w-auto sm:flex sm:items-center">
                                    <a
                                        href={contact.whatsappLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="glass-button-whatsapp w-full sm:w-auto text-xs sm:text-sm justify-center py-3"
                                    >
                                        <MessageCircle className="w-4 h-4" />
                                        WhatsApp
                                    </a>
                                    <a href={`tel:${contact.phoneLink}`} className="btn-ghost w-full sm:w-auto text-xs sm:text-sm justify-center py-3">
                                        <Phone className="w-4 h-4 text-orange-700" />
                                        {contact.phone}
                                    </a>
                                </div>
                            </div>

                            <ul className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-sm font-semibold text-neutral-700">
                                {['Kostenloses Aufmaß vor Ort', 'Staubschutzgarantie', 'Verbindlicher Festpreis'].map((item) => (
                                    <li key={item} className="flex items-center gap-1.5">
                                        <CheckCircle2 className="w-4 h-4 text-orange-600" />
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <figure className="glass-surface rounded-xl px-5 py-3.5 max-w-xl mx-auto lg:mx-0 text-left border border-neutral-200">
                                <blockquote className="text-sm italic text-neutral-800">&bdquo;{motto}&ldquo;</blockquote>
                                <figcaption className="mt-1 text-xs font-bold text-orange-800">
                                    — {owner.fullName}, Inhaber
                                </figcaption>
                            </figure>
                        </div>

                        {/* Hero Right: Direct Contact Form to Deniz Tezgel */}
                        <div className="lg:col-span-5 relative z-10">
                            <HeroContactForm />
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
                                    className="group glass-surface rounded-2xl p-7 hover:-translate-y-0.5 hover:border-orange-500/80 transition-all duration-200"
                                >
                                    <span className="icon-chip w-12 h-12 mb-5">
                                        <Icon className="w-6 h-6" />
                                    </span>
                                    <span className="block text-[11px] font-black uppercase tracking-widest text-orange-800 mb-1">
                                        {PILLAR_EYEBROWS[idx]}
                                    </span>
                                    <h3 className="text-lg font-black text-neutral-900 mb-2">{pillar.title}</h3>
                                    <p className="text-sm text-neutral-700 leading-relaxed">{pillar.description}</p>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </section>

            {/* 3. PORTAL SHOWCASE */}
            <section className="py-20 bg-white border-y border-neutral-200 relative z-10" id="portal-netzwerk" aria-labelledby="portal-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="eyebrow mb-4">Fachbereiche &amp; Planungshilfen</span>
                        <h2 id="portal-heading" className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
                            Alles für Ihr Vorhaben auf über 100 Fachseiten
                        </h2>
                        <p className="mt-3 text-base text-neutral-700">
                            Von der schlüsselfertigen Badsanierung über nützliche Planungshilfen bis zu den Standorten in Hessen –
                            wählen Sie Ihren Themenbereich.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {PORTAL_HUBS.map(({ eyebrow, title, text, icon: Icon, links, cta }) => (
                            <article
                                key={eyebrow}
                                className="group flex flex-col justify-between p-6 rounded-2xl bg-neutral-50 border border-neutral-200 hover:bg-white hover:border-orange-500/80 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-12px_rgba(23,23,23,0.14)] transition-all duration-200"
                            >
                                <div>
                                    <span className="icon-chip w-12 h-12 mb-4">
                                        <Icon className="w-6 h-6" />
                                    </span>
                                    <span className="text-[11px] font-black uppercase tracking-widest text-orange-800">{eyebrow}</span>
                                    <h3 className="text-lg font-black text-neutral-900 mt-1 mb-2">{title}</h3>
                                    <p className="text-sm text-neutral-700 mb-4 leading-relaxed">{text}</p>
                                    <ul
                                        className={`border-t border-neutral-200 pt-3 text-sm font-semibold text-neutral-800 ${
                                            links.length > 6 ? 'flex flex-wrap gap-1.5' : 'space-y-1.5'
                                        }`}
                                    >
                                        {links.map((link) => (
                                            <li key={link.href}>
                                                {links.length > 6 ? (
                                                    <Link
                                                        href={link.href}
                                                        className="inline-block px-2.5 py-1 rounded-xl bg-white border border-neutral-200 text-xs hover:border-orange-500/80 hover:text-orange-800 transition-colors"
                                                    >
                                                        {link.label}
                                                    </Link>
                                                ) : (
                                                    <Link href={link.href} className="flex items-center gap-1.5 hover:text-orange-800 transition-colors">
                                                        <ArrowRight className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                                                        {link.label}
                                                    </Link>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="pt-4 mt-4 border-t border-neutral-200">
                                    <Link href={cta.href} className="text-sm font-bold text-orange-800 hover:text-orange-700 inline-flex items-center gap-1">
                                        {cta.label}
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="mt-10">
                        <p className="text-center text-[11px] font-black uppercase tracking-widest text-neutral-600 mb-4">
                            Fachthemen im Detail
                        </p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {TOPIC_HUBS.map((hub) => (
                                <li key={hub.id}>
                                    <Link
                                        href={hub.path}
                                        className="group flex items-center justify-between gap-3 px-5 py-4 rounded-xl bg-white border border-neutral-200 hover:border-orange-500/80 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-10px_rgba(23,23,23,0.18)] transition-all duration-200"
                                    >
                                        <span>
                                            <span className="block text-sm font-black text-neutral-900 group-hover:text-orange-800 transition-colors">
                                                {hub.name}
                                            </span>
                                            <span className="block text-xs text-neutral-600">
                                                {hub.pages.length} Seiten &middot; {hub.description}
                                            </span>
                                        </span>
                                        <ArrowRight className="w-4 h-4 text-orange-600 shrink-0 group-hover:translate-x-0.5 transition-transform" />
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
                        <span className="eyebrow mb-4">Fachgewerke</span>
                        <h2 id="leistungen-heading" className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
                            Fliesen-, Platten- &amp; Verlegearbeiten{' '}
                            <span className="text-ceramic-gradient">in Fachqualität</span>
                        </h2>
                        <p className="mt-3 text-base text-neutral-700 leading-relaxed">
                            Ob barrierefreie Wellnessoase, offenes Wohnen mit Feinsteinzeug oder die wetterfeste Terrasse:
                            Fachqualität aus Aßlar für den Lahn-Dill-Kreis und Hessen.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {SERVICES.map((srv) => {
                            const Icon = SERVICE_ICONS[srv.id] || Sparkles;
                            const isFeature = srv.id === 'bad';
                            const imgData = SERVICE_IMAGES[srv.id];
                            return (
                                <article
                                    key={srv.id}
                                    className={`group glass-surface rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:-translate-y-0.5 hover:border-orange-500/80 hover:shadow-[0_24px_48px_-16px_rgba(23,23,23,0.18)] transition-all duration-200 ${BENTO_LAYOUT[srv.id] || ''} ${
                                        isFeature ? 'ceramic-hero' : ''
                                    }`}
                                >
                                    <div>
                                        {/* Craftsmanship Photo */}
                                        <div className="relative w-full h-44 sm:h-48 mb-5 rounded-xl overflow-hidden border border-neutral-100 shadow-inner">
                                            <Image
                                                src={imgData?.src || '/images/bad/walk-in-dusche.webp'}
                                                alt={imgData?.alt || srv.name}
                                                fill
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent" />
                                            <span className="absolute bottom-2.5 left-2.5 text-[11px] font-bold text-white bg-neutral-900/70 backdrop-blur-xs px-2.5 py-1 rounded-lg">
                                                {imgData?.tag || srv.name}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between mb-3">
                                            <span className="icon-chip w-10 h-10">
                                                <Icon className="w-5 h-5" />
                                            </span>
                                            <span className="text-[11px] font-black uppercase tracking-wider text-neutral-500">Fachgewerk</span>
                                        </div>
                                        <h3 className={`${isFeature ? 'text-2xl' : 'text-xl'} font-black text-neutral-900 mb-2 group-hover:text-orange-800 transition-colors`}>
                                            {srv.name}
                                        </h3>
                                        <p className="text-sm text-neutral-700 mb-5 leading-relaxed">{srv.shortDescription}</p>
                                        <ul className={`grid gap-2 mb-6 ${isFeature ? 'sm:grid-cols-2' : ''}`}>
                                            {srv.features.slice(0, isFeature ? 6 : 3).map((feat) => (
                                                <li key={feat} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-700">
                                                    <Check className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                                                    <span>{feat}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="pt-5 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3">
                                        <Link
                                            href={`/leistungen/${srv.id}`}
                                            className="text-sm font-bold text-orange-800 hover:text-orange-700 inline-flex items-center gap-1.5"
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
                        <span className="eyebrow eyebrow-red mb-4">Transparenter Ablauf</span>
                        <h2 id="ablauf-heading" className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
                            In 3 Schritten zu Ihrem neuen Belag
                        </h2>
                        <p className="mt-3 text-base text-neutral-700 leading-relaxed">
                            Keine Überraschungen, keine versteckten Kosten – von der ersten Begutachtung bis zur sauberen
                            Abnahme durch {owner.fullName} persönlich.
                        </p>
                    </div>

                    <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {processSteps.map((stepItem) => (
                            <li
                                key={stepItem.step}
                                className="group glass-surface rounded-2xl p-8 relative overflow-hidden hover:-translate-y-0.5 hover:border-orange-500/80 transition-all duration-200"
                            >
                                <span className="font-display block text-5xl font-black tabular-nums text-orange-700/40 group-hover:text-orange-700/60 transition-colors mb-4" aria-hidden="true">
                                    {stepItem.step}
                                </span>
                                <span className="block text-[11px] font-black uppercase tracking-widest text-orange-800 mb-1">
                                    {stepItem.subtitle}
                                </span>
                                <h3 className="text-lg font-black text-neutral-900 mb-3">{stepItem.title}</h3>
                                <p className="text-sm text-neutral-700 leading-relaxed">{stepItem.description}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* 6. XXL SPOTLIGHT */}
            <section className="py-20 relative z-10" aria-labelledby="spotlight-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="ceramic-hero rounded-[2rem] p-8 sm:p-12 lg:p-16">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                            <div className="lg:col-span-7 space-y-6">
                                <span className="eyebrow">
                                    <Award className="w-3.5 h-3.5" />
                                    Fachbetrieb für anspruchsvolle Architektur
                                </span>
                                <h2 id="spotlight-heading" className="text-3xl sm:text-4xl font-black text-neutral-900 leading-tight">
                                    Fugenarme XXL-Großformate{' '}
                                    <span className="text-ceramic-gradient">&amp; fachgerechte Badsanierung</span>
                                </h2>
                                <p className="text-base text-neutral-700 leading-relaxed">
                                    Großformatige Platten verlangen höchste Präzision: Mit Nivelliersystem, Vakuumhebetechnik und
                                    flexiblen C2-Fliesenklebern entstehen planebene Flächen mit ruhigem, monolithischem
                                    Raumgefühl – ohne störende Fugenkreuze.
                                </p>
                                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="rounded-xl bg-white border border-neutral-200 p-5 flex flex-col-reverse justify-end gap-1">
                                        <dt className="text-sm text-neutral-700">Normgerechte Verbundabdichtung</dt>
                                        <dd className="font-display text-2xl font-black text-orange-800">DIN 18534</dd>
                                    </div>
                                    <div className="rounded-xl bg-white border border-neutral-200 p-5 flex flex-col-reverse justify-end gap-1">
                                        <dt className="text-sm text-neutral-700">Großformate für fugenarme Wand- &amp; Bodenflächen</dt>
                                        <dd className="font-display text-2xl font-black text-red-800">XXL</dd>
                                    </div>
                                </dl>
                                <div className="flex flex-wrap items-center gap-3">
                                    <Link href="/bad/fliesen" className="btn-primary">
                                        Großformate im Bad
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                    <a href={`tel:${contact.phoneLink}`} className="btn-ghost">
                                        <Phone className="w-4 h-4 text-orange-700" />
                                        {contact.phone}
                                    </a>
                                </div>
                            </div>

                            {/* Right: XXL Craftsmanship Photo Showcase */}
                            <div className="lg:col-span-5">
                                <div className="glass-surface rounded-2xl p-3 sm:p-4 space-y-4 shadow-xl border border-neutral-200">
                                    <div className="relative w-full h-64 sm:h-72 rounded-xl overflow-hidden group">
                                        <Image
                                            src="/images/bad/bad-freistehende-wanne.webp"
                                            alt="Freistehende Badewanne mit fugenlosem XXL-Fliesenbelag von Fliesenverlegung Tezgel"
                                            fill
                                            sizes="(max-width: 1024px) 100vw, 450px"
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/75 via-transparent to-transparent" />
                                        <div className="absolute bottom-3 left-3 right-3 text-white text-xs">
                                            <span className="font-bold block text-sm">Bad mit freistehender Wanne</span>
                                            <span className="text-orange-300">Millimetergenauer Gehrungsschnitt &amp; C2TE S1 Flexkleber</span>
                                        </div>
                                    </div>
                                    <div className="p-2 space-y-1.5">
                                        <span className="text-[11px] font-black uppercase tracking-widest text-orange-800 block">
                                            Regional verwurzelt in Aßlar &middot; Wetzlar
                                        </span>
                                        <p className="text-xs text-neutral-700 leading-relaxed">
                                            Persönliche Betreuung durch Deniz Tezgel von der 3D-Beratung bis zur makellosen Endabnahme.
                                        </p>
                                    </div>
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
                        <h2 id="bewertungen-heading" className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
                            Was unsere Kunden in Mittelhessen sagen
                        </h2>
                        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                            <div className="glass-surface rounded-xl px-5 py-2.5 flex items-center gap-3">
                                <Stars />
                                <span className="text-sm font-bold text-neutral-900">
                                    {google.displayRating} / {google.maxRating}
                                </span>
                                <span className="text-sm text-neutral-700">{google.count} {google.label}</span>
                            </div>
                            <div className="glass-surface rounded-xl px-5 py-2.5 flex items-center gap-2">
                                <span className="text-sm font-bold text-neutral-900">{trustlocal.displayRating}</span>
                                <span className="text-sm text-neutral-700">{trustlocal.count} {trustlocal.label}</span>
                            </div>
                        </div>
                    </div>

                    <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {featuredReviews.map((review) => (
                            <li key={review.id} className="glass-surface rounded-2xl p-7 flex flex-col justify-between">
                                <figure>
                                    <div className="flex items-center justify-between mb-4">
                                        <Stars count={review.rating} />
                                        <Quote className="w-6 h-6 text-orange-600/40" aria-hidden="true" />
                                    </div>
                                    <blockquote className="text-sm text-neutral-800 leading-relaxed">&bdquo;{review.text}&ldquo;</blockquote>
                                    <figcaption className="mt-5 pt-4 border-t border-neutral-200 flex items-center justify-between gap-2">
                                        <span className="text-sm font-bold text-neutral-900">{review.author}</span>
                                        <span className="text-xs font-semibold text-neutral-600">
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
                        <h2 id="anfrage-heading" className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
                            Ihre Express-Anfrage in 3 Klicks
                        </h2>
                        <p className="mt-3 text-base text-neutral-700">
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
