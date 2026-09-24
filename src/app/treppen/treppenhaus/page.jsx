import React from 'react';
import Link from 'next/link';
import {
    Building2,
    ArrowRight,
    Phone,
    Users,
    CalendarCheck,
    Footprints,
    Layers,
    DoorOpen,
    Sparkles,
    ShieldCheck,
    CheckCircle2,
    ClipboardList
} from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import { createMetadata } from '@/lib/metadata';
import QualityPromise from '@/components/sections/QualityPromise';

export const metadata = createMetadata({
    title: 'Treppenhaus sanieren: Fliesen & Naturstein im MFH',
    description:
        'Treppenhaus im Mehrfamilienhaus neu belegen: Planung mit Eigentümern oder Hausverwaltung, abschnittsweise Arbeiten im bewohnten Haus, trittsichere Beläge.',
    path: '/treppen/treppenhaus'
});

const REQUIREMENTS = [
    {
        icon: Footprints,
        title: 'Hohe Belastung',
        desc: 'Im Treppenhaus laufen alle Bewohner, Besucher und Lieferdienste über dieselben Stufen – oft mit Straßenschmutz und Splitt an den Sohlen. Gefragt sind abriebfeste, durchgefärbte Materialien.'
    },
    {
        icon: ShieldCheck,
        title: 'Trittsicherheit',
        desc: 'Matte, rutschhemmende Oberflächen und gut erkennbare Stufenkanten sind im Gemeinschaftsbereich besonders wichtig. Die Rutschhemmung wird nach DIN EN 16165 geprüft und in R-Klassen angegeben.'
    },
    {
        icon: Sparkles,
        title: 'Reinigung',
        desc: 'Treppenhäuser werden häufig und oft von Reinigungsdiensten gepflegt. Dichte Oberflächen, gut gefüllte Fugen und ein Sockel, der das Wischwasser von der Wand fernhält, erleichtern die Pflege.'
    },
    {
        icon: Building2,
        title: 'Baustoffanforderungen',
        desc: 'Für Treppenräume können bauordnungsrechtliche Anforderungen an die Baustoffe gelten. Keramik und Naturstein sind nicht brennbar. Ob im konkreten Gebäude weitere Vorgaben bestehen, klären Eigentümer bzw. Verwaltung mit ihrem Planer.'
    }
];

const PROCESS = [
    {
        icon: ClipboardList,
        title: 'Bestandsaufnahme und Angebot',
        desc: 'Beim Vor-Ort-Termin prüfen wir Stufen, Podeste und Altbelag, messen auf und klären, was erhalten werden kann. Das Angebot ist so gegliedert, dass es sich in der Eigentümerversammlung bzw. gegenüber der Verwaltung gut vorstellen lässt.'
    },
    {
        icon: Users,
        title: 'Abstimmung mit Eigentümern oder Hausverwaltung',
        desc: 'Ein fester Ansprechpartner stimmt Material, Ablauf und Termine mit der Person ab, die die Gemeinschaft vertritt. Musterplatten helfen bei der Entscheidung. Fragen des Wohnungseigentumsrechts klären Sie bitte mit Ihrer Verwaltung.'
    },
    {
        icon: CalendarCheck,
        title: 'Abschnittsweise im bewohnten Haus',
        desc: 'Damit das Haus erreichbar bleibt, arbeiten wir nach Absprache abschnittsweise – etwa geschossweise oder Stufe um Stufe im Wechsel, sodass immer ein begehbarer Weg bleibt. Wann frisch verlegte Flächen wieder belastbar sind, hängt vom verwendeten Kleber und Fugenmörtel ab.'
    },
    {
        icon: CheckCircle2,
        title: 'Gemeinsame Abnahme',
        desc: 'Am Ende gehen wir die Treppe gemeinsam mit Ihnen bzw. der Verwaltung ab. Sie erhalten Hinweise zur Pflege des gewählten Belags.'
    }
];

const MATERIALS = [
    {
        title: 'Feinsteinzeug',
        text: 'Dicht, frostunempfindlich und sehr abriebfest; in Stein- und Betonoptiken mit rutschhemmenden Oberflächen erhältlich. Durchgefärbte Qualitäten lassen Abnutzung an der Kante kaum sichtbar werden.'
    },
    {
        title: 'Granit',
        text: 'Hart, verschleißfest und im Treppenhaus seit Jahrzehnten bewährt. Geflammte oder gebürstete Oberflächen sind griffiger als polierte. Stufenplatten werden nach Aufmaß vom Steinlieferanten gefertigt.'
    },
    {
        title: 'Weitere Natursteine',
        text: 'Quarzit, Schiefer oder Kalkstein bieten eigene Farbwelten. Weichere und säureempfindliche Sorten verlangen mehr Pflege und eignen sich nicht für jede Belastung – wir beraten ehrlich, was zu Ihrem Haus passt.'
    }
];

const WEITERLESEN = [
    { title: 'Treppen im Überblick', path: '/treppen', desc: 'Voraussetzungen, Belagsarten und Steigungen' },
    { title: 'Naturstein & Granit', path: '/naturstein/granit', desc: 'Silikatische Natursteine im Porträt' },
    { title: 'Wohnbereiche fliesen', path: '/leistungen/wohnen', desc: 'Böden für Flur, Diele und Wohnen' },
    { title: 'Unser Betrieb', path: '/unternehmen', desc: 'Meisterbetrieb aus Aßlar, HWK Wiesbaden' }
];

export default function TreppenhausPage() {
    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            <div className="ambient-glow-mint -top-32 -left-32 opacity-70" />
            <div className="ambient-glow-sky top-96 -right-24 opacity-60" />

            {/* Hero */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10" aria-labelledby="treppenhaus-heading">
                <div className="ceramic-hero rounded-[3rem] p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow">
                        <Building2 className="w-3.5 h-3.5" />
                        Treppen &middot; Mehrfamilienhaus
                    </span>
                    <h1 id="treppenhaus-heading" className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                        Treppenhaus sanieren:{' '}
                        <span className="text-ceramic-gradient">neue Beläge im Mehrfamilienhaus</span>
                    </h1>
                    <p className="text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
                        Ausgetretene Stufen, gesprungene Platten, unpassend geflickte Podeste: Das Treppenhaus ist die
                        Visitenkarte eines Hauses. Für Vermieter, Hausverwaltungen und Eigentümergemeinschaften belegen wir
                        Stufen, Podeste und Eingangsbereiche neu – geplant in Abstimmung mit Ihnen und ausgeführt im
                        bewohnten Haus.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
                        <Link href="/kontakt" className="btn-primary px-7 py-3.5 text-xs group">
                            Besichtigung anfragen
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className="btn-ghost px-7 py-3.5 text-xs">
                            <Phone className="w-4 h-4 text-emerald-700" />
                            {COMPANY_DATA.contact.phone}
                        </a>
                    </div>
                </div>
            </section>

            {/* Anforderungen */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10" aria-labelledby="anforderungen-heading">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="eyebrow eyebrow-sky mb-4">Anforderungen</span>
                    <h2 id="anforderungen-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        Belastung, Sicherheit, Reinigung
                    </h2>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {REQUIREMENTS.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li
                                key={item.title}
                                className="group glass-surface p-7 rounded-[2rem] hover:-translate-y-0.5 hover:border-emerald-500/80 hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.14)] transition-all duration-300"
                            >
                                <span className="icon-chip w-11 h-11 mb-4">
                                    <Icon className="w-5 h-5" />
                                </span>
                                <h3 className="font-black text-base text-slate-900 mb-2 group-hover:text-emerald-800 transition-colors">{item.title}</h3>
                                <p className="text-sm text-slate-700 leading-relaxed">{item.desc}</p>
                            </li>
                        );
                    })}
                </ul>
            </section>

            {/* Planung & Ablauf */}
            <section className="py-20 bg-white border-y border-slate-200 relative z-10" aria-labelledby="planung-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="eyebrow mb-4">Planung &amp; Ablauf</span>
                        <h2 id="planung-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Von der Eigentümerentscheidung bis zur Abnahme
                        </h2>
                    </div>
                    <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {PROCESS.map((step, idx) => {
                            const Icon = step.icon;
                            return (
                                <li
                                    key={step.title}
                                    className="group p-7 rounded-3xl bg-slate-50 border border-slate-200 hover:bg-white hover:-translate-y-0.5 hover:border-emerald-500/80 transition-all duration-300"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="icon-chip w-11 h-11">
                                            <Icon className="w-5 h-5" />
                                        </span>
                                        <span className="font-display text-4xl font-black tabular-nums text-emerald-600/25" aria-hidden="true">
                                            {String(idx + 1).padStart(2, '0')}
                                        </span>
                                    </div>
                                    <h3 className="text-base font-black text-slate-900 mb-2">{step.title}</h3>
                                    <p className="text-sm text-slate-700 leading-relaxed">{step.desc}</p>
                                </li>
                            );
                        })}
                    </ol>
                </div>
            </section>

            {/* Beläge */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10" aria-labelledby="belaege-heading">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="eyebrow eyebrow-sky mb-4">
                        <Layers className="w-3.5 h-3.5" />
                        Beläge
                    </span>
                    <h2 id="belaege-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        Feinsteinzeug, Granit und andere Natursteine
                    </h2>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {MATERIALS.map((item) => (
                        <li key={item.title} className="glass-surface p-7 rounded-[2rem]">
                            <h3 className="font-black text-base text-slate-900 mb-2">{item.title}</h3>
                            <p className="text-sm text-slate-700 leading-relaxed">{item.text}</p>
                        </li>
                    ))}
                </ul>
                <p className="mt-8 text-sm text-slate-700 leading-relaxed max-w-4xl mx-auto text-center">
                    Kantenlösungen wie Gehrung, Stufenprofil oder Stufenplatte vergleichen wir auf der Seite{' '}
                    <Link href="/treppen/innentreppe" className="font-bold text-emerald-800 hover:text-emerald-700 hover:underline underline-offset-2">
                        Innentreppe fliesen
                    </Link>
                    ; für stark frequentierte Treppenhäuser sind Profile oder robuste Stufenplatten oft die praktischere Wahl.
                </p>
            </section>

            {/* Podeste & Staubschutz */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 relative z-10" aria-label="Podeste und Staubschutz">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="ceramic-hero rounded-[2.5rem] p-8 space-y-3">
                        <span className="icon-chip w-11 h-11">
                            <DoorOpen className="w-5 h-5" />
                        </span>
                        <h2 className="text-xl font-black text-slate-900">Podeste, Sockel und Übergänge zu Wohnungstüren</h2>
                        <p className="text-sm text-slate-700 leading-relaxed">
                            Podeste erhalten dasselbe Fugenraster wie die Stufen. Sockel werden – gestuft an der Treppe,
                            gerade am Podest – umlaufend gesetzt. Vor Wohnungstüren achten wir auf die Aufbauhöhe: Die Tür
                            muss weiterhin frei aufgehen, und der Übergang zur Schwelle wird sauber mit einem Profil oder
                            einer Anschlussfuge ausgebildet.
                        </p>
                    </div>
                    <div className="ceramic-hero rounded-[2.5rem] p-8 space-y-3">
                        <span className="icon-chip w-11 h-11">
                            <Sparkles className="w-5 h-5" />
                        </span>
                        <h2 className="text-xl font-black text-slate-900">Staubschutz und Sauberkeit im Gemeinschaftsbereich</h2>
                        <p className="text-sm text-slate-700 leading-relaxed">
                            Das Entfernen alter Beläge und das Zuschneiden verursachen Staub. Wir schützen angrenzende
                            Flächen und Türen mit Abdeckungen und Staubschutzwänden, arbeiten mit Absaugung und hinterlassen
                            den Arbeitsbereich besenrein – damit Bewohner so wenig wie möglich beeinträchtigt werden.
                        </p>
                    </div>
                </div>
            </section>

            {/* Weiterlesen */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 relative z-10" aria-labelledby="treppenhaus-weiterlesen-heading">
                <h2 id="treppenhaus-weiterlesen-heading" className="text-2xl font-black text-slate-900 tracking-tight mb-6">
                    Weiterlesen
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {WEITERLESEN.map((link) => (
                        <li key={link.path}>
                            <Link
                                href={link.path}
                                className="group glass-surface rounded-2xl p-5 h-full block hover:-translate-y-0.5 hover:border-emerald-500/80 transition-all duration-300"
                            >
                                <span className="font-black text-slate-900 group-hover:text-emerald-800 transition-colors flex items-center gap-1">
                                    {link.title}
                                    <ArrowRight className="w-4 h-4" />
                                </span>
                                <span className="block mt-1 text-sm text-slate-700">{link.desc}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="mt-8">
                    <Link href="/beratung" className="btn-ghost px-6 py-3 text-xs">
                        Beratungstermin vereinbaren
                    </Link>
                </div>
            </section>

            <QualityPromise />
        </div>
    );
}
