import React from 'react';
import Link from 'next/link';
import {
    ShieldCheck,
    Droplets,
    Ruler,
    Layers,
    Hammer,
    Gauge,
    ArrowRight,
    Phone,
    MessageCircle,
    CircleCheck,
    TriangleAlert,
    SquareStack,
    Search
} from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import { TOPIC_HUBS } from '@/config/topics';
import { createMetadata } from '@/lib/metadata';
import QualityPromise from '@/components/sections/QualityPromise';

export const metadata = createMetadata({
    title: 'Untergrund & Abdichtung für Fliesen: Fachwissen',
    description:
        'Tragfähig, eben, trocken, dicht: Wie der HWK-Fachbetrieb Untergründe für Fliesen prüft und vorbereitet – von der DIN-18534-Abdichtung bis zur Entkopplung.',
    path: '/untergrund-abdichtung'
});

const HUB = TOPIC_HUBS.find((hub) => hub.id === 'untergrund-abdichtung');
const SUBPAGES = HUB ? HUB.pages.filter((page) => page.path !== HUB.path) : [];

const SUBPAGE_ICONS = {
    '/untergrund-abdichtung/din-18534': ShieldCheck,
    '/untergrund-abdichtung/estrich-belegreife': Gauge,
    '/untergrund-abdichtung/fliesen-auf-fliesen': Hammer,
    '/untergrund-abdichtung/entkopplung': SquareStack,
    '/untergrund-abdichtung/ausgleich-gefaelle': Ruler
};

const DAMAGE_PATTERNS = [
    {
        title: 'Risse im Fliesenbelag',
        desc: 'Bewegt sich der Untergrund – weil der Estrich noch schwindet, Holzdielen federn oder Bewegungsfugen überfliest wurden –, überträgt sich die Spannung auf die starre Keramik. Die Folge sind Risse quer durch Fliesen und Fugen.',
        icon: TriangleAlert
    },
    {
        title: 'Hohlstellen und lose Fliesen',
        desc: 'Staub, Sinterschichten, Trennmittel oder ein zu saugfähiger Untergrund ohne Grundierung verhindern die Haftung des Klebers. Die Fliese klingt beim Abklopfen hohl und kann sich später lösen oder unter Last brechen.',
        icon: Layers
    },
    {
        title: 'Feuchte hinter der Fliese',
        desc: 'Fliesen und Fugen sind nicht wasserdicht. Fehlt im Nassbereich die Abdichtung oder ist sie an Ecken und Durchdringungen unterbrochen, zieht Wasser in Estrich und Mauerwerk – oft lange unbemerkt.',
        icon: Droplets
    }
];

const CRITERIA = [
    {
        title: 'Tragfähig',
        desc: 'Der Untergrund muss die Lasten aufnehmen, ohne sich spürbar zu verformen. Wir prüfen Oberflächenfestigkeit (z. B. per Gitterritzprüfung), Haftung von Altbelägen und das Verhalten von Holzkonstruktionen.'
    },
    {
        title: 'Eben',
        desc: 'Maßgeblich sind die Ebenheitstoleranzen nach DIN 18202. Für das Dünnbettverfahren und für Großformate braucht es eine entsprechend ebene Fläche – sonst wird vorher gespachtelt oder nivelliert.'
    },
    {
        title: 'Trocken',
        desc: 'Estriche müssen belegreif sein. Die Restfeuchte wird vor Beginn der Verlegung gemessen, bei Estrichen mit der CM-Methode.'
    },
    {
        title: 'Sauber',
        desc: 'Frei von Staub, Öl, Wachs, Farb- und Kleberresten, Trennmitteln und losen Teilen. Sinterschichten auf Calciumsulfatestrich werden abgeschliffen und abgesaugt.'
    },
    {
        title: 'Dicht',
        desc: 'In Duschen, an Badewannen und auf Böden mit Ablauf gehört unter die Fliese eine Verbundabdichtung nach DIN 18534 – einschließlich Dichtbändern und Manschetten an allen Anschlüssen.'
    }
];

const SUBSTRATES = [
    {
        title: 'Zement- und Calciumsulfatestrich',
        desc: 'Der häufigste Untergrund im Neubau. Entscheidend sind Belegreife, Oberflächenfestigkeit und der Umgang mit Rand-, Schein- und Bewegungsfugen.',
        href: '/untergrund-abdichtung/estrich-belegreife'
    },
    {
        title: 'Alte Fliesen und Altbeläge',
        desc: 'Fest haftende Altfliesen können unter Umständen überfliest werden. Lose Bereiche, Hohlstellen oder zu geringe Raumhöhen sprechen für den Rückbau.',
        href: '/untergrund-abdichtung/fliesen-auf-fliesen'
    },
    {
        title: 'Holzdielen und Holzwerkstoffplatten',
        desc: 'Holz arbeitet und kann federn. Fliesen sind hier nur auf einer ausreichend steifen Konstruktion und mit geeigneter Zwischenschicht sinnvoll.',
        href: '/untergrund-abdichtung/entkopplung'
    },
    {
        title: 'Putz, Mauerwerk und Bauplatten',
        desc: 'Wände werden auf Ebenheit, Festigkeit und Saugverhalten geprüft, bei Bedarf begradigt und grundiert. Feuchteempfindliche Untergründe brauchen im Spritzwasserbereich besonderen Schutz.',
        href: '/untergrund-abdichtung/ausgleich-gefaelle'
    }
];

const READ_MORE = [
    { label: 'Leistung: Untergrund & DIN 18534 Abdichtung', href: '/leistungen/untergrund' },
    { label: 'Badsanierung vom Fachbetrieb', href: '/bad/badsanierung' },
    { label: 'Barrierefreies Bad mit bodengleicher Dusche', href: '/bad/barrierefreies-bad' },
    { label: 'Balkon, Terrasse und Außenbeläge', href: '/leistungen/aussen' }
];

export default function UntergrundAbdichtungPage() {
    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            <div className="ambient-glow-warm -top-32 -left-32 opacity-70" />
            <div className="ambient-glow-orange top-96 -right-24 opacity-60" />

            {/* Hero */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10" aria-labelledby="untergrund-heading">
                <div className="ceramic-hero rounded-tile-2xl p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow">
                        <Layers className="w-3.5 h-3.5 text-orange-600" />
                        Fachwissen &middot; Untergrund &amp; Abdichtung
                    </span>
                    <h1 id="untergrund-heading" className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                        Untergrund und Abdichtung:{' '}
                        <span className="text-ceramic-gradient">das Fundament jedes Fliesenbelags</span>
                    </h1>
                    <p className="text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
                        Eine Fliese ist nur so gut wie das, worauf sie liegt. Bevor wir verlegen, prüfen wir den Untergrund auf
                        Tragfähigkeit, Ebenheit, Restfeuchte und Sauberkeit und planen im Nassbereich die Verbundabdichtung nach
                        DIN 18534. Hier finden Sie, worauf es dabei ankommt.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
                        <Link href="/kontakt" className="btn-primary px-7 py-3.5 text-xs group">
                            Untergrund prüfen lassen
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <Link href="/leistungen/untergrund" className="btn-ghost px-7 py-3.5 text-xs">
                            Zur Leistungsseite
                        </Link>
                    </div>
                </div>
            </section>

            {/* Subpage navigation */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10" aria-labelledby="themen-heading">
                <h2 id="themen-heading" className="sr-only">Themen rund um Untergrund und Abdichtung</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {SUBPAGES.map((page) => {
                        const Icon = SUBPAGE_ICONS[page.path] || Layers;
                        return (
                            <li key={page.path}>
                                <Link
                                    href={page.path}
                                    className="group glass-surface p-6 rounded-tile-xl h-full flex flex-col hover:-translate-y-0.5 hover:border-orange-500/80 hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.14)] transition-all duration-300"
                                >
                                    <span className="icon-chip w-11 h-11 mb-4">
                                        <Icon className="w-5 h-5 text-orange-600" />
                                    </span>
                                    <span className="font-black text-base text-slate-900 group-hover:text-orange-700 transition-colors mb-1">
                                        {page.name}
                                    </span>
                                    <span className="text-sm text-slate-700 leading-relaxed flex-1">{page.desc}</span>
                                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-orange-700">
                                        Mehr zu {page.name} erfahren
                                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </section>

            {/* Damage patterns */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10" aria-labelledby="schaeden-heading">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="eyebrow eyebrow-orange mb-4">Ursachen</span>
                    <h2 id="schaeden-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        Warum viele Fliesenschäden{' '}
                        <span className="text-ceramic-gradient">im Untergrund beginnen</span>
                    </h2>
                    <p className="mt-3 text-base text-slate-700 leading-relaxed">
                        Die sichtbare Oberfläche verzeiht wenig. Was darunter nicht stimmt, zeigt sich oft erst Monate nach der
                        Verlegung – typischerweise in einem dieser drei Schadensbilder.
                    </p>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {DAMAGE_PATTERNS.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li key={item.title} className="group glass-surface p-7 rounded-tile-xl hover:-translate-y-0.5 hover:border-orange-500/80 transition-all duration-300">
                                <span className="icon-chip w-12 h-12 mb-5">
                                    <Icon className="w-6 h-6 text-orange-600" />
                                </span>
                                <h3 className="font-black text-base text-slate-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-slate-700 leading-relaxed">{item.desc}</p>
                            </li>
                        );
                    })}
                </ul>
                <p className="mt-6 text-sm text-slate-700 text-center">
                    Sie haben bereits einen Schaden?{' '}
                    <Link href="/schadensanalyse" className="font-bold text-orange-700 hover:text-orange-800 hover:underline underline-offset-2">
                        So klären wir die Ursache vor Ort
                    </Link>
                    .
                </p>
            </section>

            {/* Criteria */}
            <section className="py-20 bg-white border-y border-slate-200 relative z-10" aria-labelledby="kriterien-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="eyebrow mb-4">
                            <Search className="w-3.5 h-3.5 text-orange-600" />
                            Untergrundprüfung
                        </span>
                        <h2 id="kriterien-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Die Prüfkriterien: tragfähig, eben, trocken, sauber, dicht
                        </h2>
                        <p className="mt-3 text-base text-slate-700 leading-relaxed">
                            Diese fünf Punkte klären wir, bevor der erste Kleber aufgezogen wird. Erfüllt der Untergrund sie nicht,
                            wird er zuerst vorbereitet – oder wir sprechen offen an, warum eine Verlegung so nicht sinnvoll ist.
                        </p>
                    </div>
                    <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
                        {CRITERIA.map((item, idx) => (
                            <li key={item.title} className="p-6 rounded-tile-lg bg-slate-50 border border-slate-200">
                                <span className="font-display block text-4xl font-black tabular-nums text-orange-600/30 mb-3" aria-hidden="true">
                                    {String(idx + 1).padStart(2, '0')}
                                </span>
                                <h3 className="text-lg font-black text-slate-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-slate-700 leading-relaxed">{item.desc}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* Overviews with jump anchors */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10" aria-label="Themen im Überblick">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <article id="din18534" className="glass-surface rounded-tile-xl p-7 sm:p-9 scroll-mt-28">
                        <span className="icon-chip w-11 h-11 mb-4">
                            <ShieldCheck className="w-5 h-5 text-orange-600" />
                        </span>
                        <h2 className="text-2xl font-black text-slate-900 mb-3">Abdichtung im Verbund nach DIN 18534 im Überblick</h2>
                        <p className="text-sm text-slate-700 leading-relaxed">
                            Im Bad liegt die Abdichtung direkt unter Fliese und Kleber – als flüssig aufgetragene Schicht, Bahn oder
                            Platte. Welcher Aufwand nötig ist, richtet sich nach der Wassereinwirkungsklasse der jeweiligen Fläche.
                        </p>
                        <Link href="/untergrund-abdichtung/din-18534" className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-orange-700 hover:text-orange-800">
                            DIN 18534 im Detail
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </article>

                    <article id="abbruch" className="glass-surface rounded-tile-xl p-7 sm:p-9 scroll-mt-28">
                        <span className="icon-chip w-11 h-11 mb-4">
                            <Hammer className="w-5 h-5 text-orange-600" />
                        </span>
                        <h2 className="text-2xl font-black text-slate-900 mb-3">Rückbau oder Überfliesen im Überblick</h2>
                        <p className="text-sm text-slate-700 leading-relaxed">
                            Überfliesen spart Rückbau, setzt aber einen fest haftenden, ebenen Altbelag und genügend Aufbauhöhe voraus.
                            Ob das zutrifft, entscheidet erst die Prüfung vor Ort.
                        </p>
                        <Link href="/untergrund-abdichtung/fliesen-auf-fliesen" className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-orange-700 hover:text-orange-800">
                            Fliesen auf Fliesen oder Rückbau?
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </article>

                    <article id="ausgleich" className="glass-surface rounded-tile-xl p-7 sm:p-9 scroll-mt-28">
                        <span className="icon-chip w-11 h-11 mb-4">
                            <Ruler className="w-5 h-5 text-orange-600" />
                        </span>
                        <h2 className="text-2xl font-black text-slate-900 mb-3">Ausgleich und Gefälle im Überblick</h2>
                        <p className="text-sm text-slate-700 leading-relaxed">
                            Unebenheiten werden gemessen und mit Spachtel- oder Nivelliermassen ausgeglichen. Vor Bodenabläufen und
                            Duschrinnen sorgt ein sauber ausgebildetes Gefälle dafür, dass Wasser gezielt abläuft.
                        </p>
                        <Link href="/untergrund-abdichtung/ausgleich-gefaelle" className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-orange-700 hover:text-orange-800">
                            Ausgleich &amp; Gefälle im Detail
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </article>

                    <article id="rissverharzung" className="glass-surface rounded-tile-xl p-7 sm:p-9 scroll-mt-28">
                        <span className="icon-chip w-11 h-11 mb-4">
                            <SquareStack className="w-5 h-5 text-orange-600" />
                        </span>
                        <h2 className="text-2xl font-black text-slate-900 mb-3">Risse und Entkopplung im Überblick</h2>
                        <p className="text-sm text-slate-700 leading-relaxed">
                            Ruhende Risse im Estrich lassen sich kraftschlüssig verharzen. Entkopplungsmatten bauen Spannungen
                            zwischen Untergrund und Belag ab – ersetzen aber keine fehlende Tragfähigkeit.
                        </p>
                        <Link href="/untergrund-abdichtung/entkopplung" className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-orange-700 hover:text-orange-800">
                            Entkopplung &amp; Holzuntergründe
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </article>
                </div>
            </section>

            {/* Typical substrates */}
            <section className="py-20 bg-white border-y border-slate-200 relative z-10" aria-labelledby="untergruende-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="eyebrow eyebrow-orange mb-4">Typische Untergründe</span>
                        <h2 id="untergruende-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Estrich, Altbelag, Holz: was jeder Untergrund braucht
                        </h2>
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {SUBSTRATES.map((item) => (
                            <li key={item.title}>
                                <Link
                                    href={item.href}
                                    className="group flex gap-4 p-6 rounded-tile-lg bg-slate-50 border border-slate-200 h-full hover:bg-white hover:-translate-y-0.5 hover:border-orange-500/80 transition-all duration-300"
                                >
                                    <CircleCheck className="w-6 h-6 text-orange-600 shrink-0 mt-0.5" />
                                    <span>
                                        <span className="block font-black text-base text-slate-900 mb-1 group-hover:text-orange-700 transition-colors">
                                            {item.title}
                                        </span>
                                        <span className="block text-sm text-slate-700 leading-relaxed">{item.desc}</span>
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Survey CTA */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 relative z-10" aria-labelledby="aufmass-heading">
                <div className="ceramic-hero rounded-tile-2xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
                    <div className="lg:col-span-3 space-y-3">
                        <span className="eyebrow">Vor-Ort-Termin</span>
                        <h2 id="aufmass-heading" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                            Untergrundprüfung beim kostenfreien Vor-Ort-Aufmaß
                        </h2>
                        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                            {COMPANY_DATA.owner.fullName} sieht sich Ihren Untergrund persönlich an: Ebenheit, Haftung des Altbelags,
                            Restfeuchte und die Situation an Abläufen und Anschlüssen. Danach wissen Sie, welche Vorarbeiten nötig
                            sind – bevor sie im Angebot auftauchen.
                        </p>
                    </div>
                    <div className="lg:col-span-2 flex flex-col sm:flex-row lg:flex-col gap-3">
                        <Link href="/kontakt" className="btn-primary px-7 py-3.5 text-xs w-full justify-center">
                            Aufmaß anfragen
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className="btn-ghost px-7 py-3.5 text-xs w-full justify-center">
                            <Phone className="w-4 h-4 text-orange-600" />
                            {COMPANY_DATA.contact.phone}
                        </a>
                        <a
                            href={COMPANY_DATA.contact.whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass-button-whatsapp px-7 py-3.5 text-xs w-full justify-center"
                        >
                            <MessageCircle className="w-4 h-4" />
                            Fotos per WhatsApp senden
                        </a>
                    </div>
                </div>
            </section>

            {/* Weiterführende Ratgeber */}
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 relative z-10" aria-labelledby="ratgeber-heading">
                <h2 id="ratgeber-heading" className="text-xl font-black text-slate-900 mb-4">Weiterführende Ratgeber zu Untergrund &amp; Abdichtung</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {READ_MORE.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className="group flex items-center justify-between gap-3 h-full rounded-tile-lg bg-white border border-slate-200 px-5 py-4 text-sm font-bold text-slate-800 hover:border-orange-500/80 hover:text-orange-700 transition-all duration-300"
                            >
                                {link.label}
                                <ArrowRight className="w-4 h-4 text-orange-600 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <QualityPromise />
        </div>
    );
}
