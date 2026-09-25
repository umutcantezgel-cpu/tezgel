import React from 'react';
import Link from 'next/link';
import {
    HardHat,
    ArrowRight,
    Phone,
    Ruler,
    Split,
    Gauge,
    Palette,
    CalendarCheck,
    ClipboardCheck,
    CheckCircle2
} from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import { createMetadata } from '@/lib/metadata';
import QualityPromise from '@/components/sections/QualityPromise';
import FliesenKonfigurator from '@/components/funnels/FliesenKonfigurator';

export const metadata = createMetadata({
    title: 'Fliesenleger für den Neubau: Ablauf & Terminplanung',
    description:
        'Fliesen im Neubau: wann der Fliesenleger im Bauablauf dran ist und wie Belegreife, Bemusterung und Schnittstellen zu Estrich und Installation geklärt werden.',
    path: '/fliesen/neubau'
});

const SEQUENCE = [
    { phase: 'Rohbau & Fenster', desc: 'Gebäudehülle geschlossen, Fenster eingebaut – Voraussetzung für einen geschützten Innenausbau.' },
    { phase: 'Rohinstallation', desc: 'Leitungen, Vorwandelemente und Bodenabläufe liegen in der richtigen Lage und Höhe.' },
    { phase: 'Innenputz & Estrich', desc: 'Wände verputzt bzw. beplankt, Estrich eingebaut und in der Trocknungsphase.' },
    { phase: 'Fliesenarbeiten', desc: 'Nach Freigabe der Belegreife: Abdichtung in Nassräumen, Wand- und Bodenfliesen, Sockel, Fugen.' },
    { phase: 'Fertigmontage', desc: 'Danach folgen Sanitärobjekte, Armaturen und die übrigen Ausbaugewerke.' }
];

const BUILDING_BLOCKS = [
    {
        icon: Ruler,
        title: 'Aufmaß & Planprüfung',
        desc: 'Wir prüfen Pläne und Rohbaumaße, messen vor Ort auf und klären Fliesenflächen, Formate und Aufbauhöhen frühzeitig.'
    },
    {
        icon: Split,
        title: 'Schnittstellen klären',
        desc: 'Höhen von Estrich und Bodenabläufen, Einbautiefen von Unterputzkörpern, Randdämmstreifen und Estrichfugen – was andere Gewerke vorbereiten, stimmen wir vorab ab.'
    },
    {
        icon: Gauge,
        title: 'Belegreife prüfen',
        desc: 'Vor dem ersten Kleberauftrag messen wir die Restfeuchte des Estrichs mit dem CM-Verfahren. Erst wenn der Estrich belegreif ist, wird gefliest.'
    },
    {
        icon: Palette,
        title: 'Bemusterung & Bestellung',
        desc: 'Formate, Farben, Fugenfarbe und Details werden rechtzeitig festgelegt, damit das Material zum Termin auf der Baustelle ist.'
    },
    {
        icon: CalendarCheck,
        title: 'Bauzeitenplan & Festpreis',
        desc: 'Verbindlicher Festpreis nach Aufmaß und feste Zusagen für Start und Fertigstellung unserer Arbeiten – abgestimmt auf Ihren Bauablauf.'
    },
    {
        icon: ClipboardCheck,
        title: 'Abnahme & Übergabe',
        desc: 'Gemeinsame Abnahme mit Deniz Tezgel, Übergabe von Pflegehinweisen, Materialangaben und Restfliesen.'
    }
];

const PRECONDITIONS = [
    'Estrich eingebaut, Randdämmstreifen noch vorhanden, Estrichfugen dokumentiert',
    'Wände verputzt oder beplankt, lot- und fluchtgerecht',
    'Rohinstallation abgeschlossen und geprüft, Vorwandelemente montiert',
    'Bodenabläufe und Duschrinnen in der geplanten Höhe gesetzt',
    'Fenster eingebaut, Innenräume vor Witterung geschützt',
    'Höhenbezugspunkt (Meterriss) im Gebäude angezeichnet'
];

const CROSS_LINKS = [
    { href: '/leistungen/wohnen', label: 'Fliesen im Wohnbereich', desc: 'Wohnen, Küche und Flur' },
    { href: '/leistungen/untergrund', label: 'Untergrundvorbereitung', desc: 'Estrich, Ausgleich und Abdichtung' },
    { href: '/untergrund-abdichtung/estrich-belegreife', label: 'Estrich & Belegreife', desc: 'Restfeuchte prüfen vor dem Fliesen' },
    { href: '/beratung', label: 'Beratung', desc: 'Neubauprojekt frühzeitig besprechen' }
];

export default function NeubauPage() {
    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            <div className="ambient-glow-orange -top-32 -left-32 opacity-70" />
            <div className="ambient-glow-warm top-96 -right-24 opacity-60" />

            {/* Hero */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10" aria-labelledby="neubau-heading">
                <div className="ceramic-hero rounded-tile-2xl p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow">
                        <HardHat className="w-3.5 h-3.5" />
                        Neubau &middot; Bauherren
                    </span>
                    <h1 id="neubau-heading" className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                        Fliesenarbeiten im Neubau:{' '}
                        <span className="text-ceramic-gradient">sauber eingeplant im Bauablauf</span>
                    </h1>
                    <p className="text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
                        Im Neubau hängen die Fliesenarbeiten an den Vorleistungen anderer Gewerke. Wer früh klärt, wann der
                        Estrich belegreif ist, wie hoch die Abläufe sitzen und welche Fliesen bestellt werden, vermeidet
                        Wartezeiten und Nacharbeiten. Wir planen unseren Teil verbindlich und stimmen die Termine mit Ihrer
                        Bauleitung ab.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
                        <Link href="/kontakt" className="btn-primary px-7 py-3.5 text-xs group">
                            Neubauprojekt anfragen
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <Link href="/termin" className="btn-ghost px-7 py-3.5 text-xs">
                            Beratungstermin vereinbaren
                        </Link>
                    </div>
                </div>
            </section>

            {/* Bauablauf */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10" aria-labelledby="bauablauf-heading">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="eyebrow eyebrow-orange mb-4">Bauablauf</span>
                    <h2 id="bauablauf-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        Wann der Fliesenleger im Bauablauf an der Reihe ist
                    </h2>
                    <p className="mt-3 text-base text-slate-700 leading-relaxed">
                        Die genaue Reihenfolge legt Ihre Bauleitung fest. Typisch für ein Wohnhaus ist dieser Ablauf:
                    </p>
                </div>
                <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {SEQUENCE.map((item, idx) => {
                        const isTile = item.phase === 'Fliesenarbeiten';
                        return (
                            <li
                                key={item.phase}
                                className={`p-6 rounded-tile-xl border ${isTile ? 'bg-orange-50/70 border-orange-500 ring-2 ring-orange-500/20' : 'bg-slate-50 border-slate-200'}`}
                            >
                                <span className="font-display block text-3xl font-black tabular-nums text-orange-500/40 mb-3" aria-hidden="true">
                                    {String(idx + 1).padStart(2, '0')}
                                </span>
                                <h3 className={`font-black text-base mb-2 ${isTile ? 'text-orange-600' : 'text-slate-900'}`}>{item.phase}</h3>
                                <p className="text-sm text-slate-700 leading-relaxed">{item.desc}</p>
                            </li>
                        );
                    })}
                </ol>
            </section>

            {/* Vorleistungen */}
            <section className="py-20 bg-white border-y border-slate-200 relative z-10" aria-labelledby="vorleistungen-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                    <div>
                        <span className="eyebrow mb-4">Schnittstellen</span>
                        <h2 id="vorleistungen-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Vorleistungen anderer Gewerke: Estrich, Putz, Installation, Fenster
                        </h2>
                        <p className="mt-4 text-base text-slate-700 leading-relaxed">
                            Estrich, Putz, Installation und Fenster liefern andere Gewerke. Wir übernehmen die Fliesenarbeiten
                            und koordinieren unsere Termine mit Bauleitung und beteiligten Firmen. Vor Arbeitsbeginn prüfen wir,
                            ob der Untergrund für die Verlegung geeignet ist, und melden Bedenken rechtzeitig.
                        </p>
                        <p className="mt-4 text-base text-slate-700 leading-relaxed">
                            Wichtig: Der Randdämmstreifen des Estrichs bleibt bis nach dem Verfugen stehen und wird erst dann
                            bündig abgeschnitten – so bleibt die Randfuge zwischen Belag und Wand erhalten.
                        </p>
                    </div>
                    <div className="glass-surface rounded-tile-xl p-7">
                        <h3 className="font-black text-slate-900 mb-4">Was vor Beginn der Fliesenarbeiten erledigt sein sollte</h3>
                        <ul className="space-y-3">
                            {PRECONDITIONS.map((item) => (
                                <li key={item} className="flex gap-3 text-sm text-slate-700 leading-relaxed">
                                    <CheckCircle2 className="w-5 h-5 text-orange-600 shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* 6 Bausteine */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10" aria-labelledby="bausteine-heading">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="eyebrow eyebrow-orange mb-4">Unsere Leistung</span>
                    <h2 id="bausteine-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        Sechs Bausteine für Fliesen im Neubau
                    </h2>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {BUILDING_BLOCKS.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li
                                key={item.title}
                                className="group glass-surface p-7 rounded-tile-xl hover:-translate-y-0.5 hover:border-orange-500/80 hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.14)] transition-all duration-300"
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

            {/* Belegreife, Bemusterung, Festpreis, Abnahme */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <article className="glass-surface rounded-tile-xl p-8" aria-labelledby="belegreife-heading">
                        <h2 id="belegreife-heading" className="text-xl sm:text-2xl font-black text-slate-900 mb-3">Belegreife-Freigabe vor dem Verlegen im Kurzüberblick</h2>
                        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                            Frischer Estrich gibt über Wochen Feuchtigkeit ab. Wird zu früh gefliest, drohen Risse, Hohlstellen
                            und Verfärbungen. Deshalb messen wir vor Beginn die Restfeuchte mit dem CM-Verfahren. Die
                            maßgeblichen Richtwerte hängen von Estrichart und Aufbau ab und richten sich nach den einschlägigen
                            Merkblättern und Herstellerangaben. Bei temperierten Estrichen gehört das entsprechende Protokoll
                            dazu.
                        </p>
                        <Link href="/untergrund-abdichtung/estrich-belegreife" className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-orange-600 hover:text-orange-700">
                            Estrich &amp; Belegreife im Detail
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </article>
                    <article className="glass-surface rounded-tile-xl p-8" aria-labelledby="bemusterung-heading">
                        <h2 id="bemusterung-heading" className="text-xl sm:text-2xl font-black text-slate-900 mb-3">Bemusterung und Materialbestellung rechtzeitig planen</h2>
                        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                            Lieferzeiten für Fliesen – besonders für Großformate und besondere Oberflächen – sind sehr
                            unterschiedlich. Legen Sie Formate, Farben und Fugenfarbe deshalb fest, bevor der Estrich eingebaut
                            wird. Die gesamte Menge sollte aus einer Charge stammen, inklusive Reserve für Verschnitt und spätere
                            Reparaturen.
                        </p>
                        <Link href="/fliesen/fliesenarten" className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-orange-600 hover:text-orange-700">
                            Fliesenarten im Vergleich
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </article>
                    <article className="glass-surface rounded-tile-xl p-8" aria-labelledby="festpreis-heading">
                        <h2 id="festpreis-heading" className="text-xl sm:text-2xl font-black text-slate-900 mb-3">Festpreis und verbindlicher Bauzeitenplan</h2>
                        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                            Nach dem Aufmaß erhalten Sie ein Festpreisangebot für den beschriebenen Leistungsumfang. Start und
                            Fertigstellung unserer Arbeiten sagen wir verbindlich zu und stimmen sie mit Ihrem Bauzeitenplan ab.
                            Verschieben sich Vorleistungen, passen wir den Termin gemeinsam mit Ihnen an.
                        </p>
                        <Link href="/fliesen/festpreisangebot" className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-orange-600 hover:text-orange-700">
                            So entsteht das Festpreisangebot
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </article>
                    <article className="glass-surface rounded-tile-xl p-8" aria-labelledby="uebergabe-heading">
                        <h2 id="uebergabe-heading" className="text-xl sm:text-2xl font-black text-slate-900 mb-3">Abnahme und Übergabe</h2>
                        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                            Zum Abschluss gehen Sie mit {COMPANY_DATA.owner.fullName} gemeinsam über alle Flächen. Sie erhalten
                            Pflegehinweise, Angaben zu den verwendeten Materialien und Restfliesen für spätere Reparaturen.
                            Worauf Sie bei der Abnahme achten können, haben wir in einer Checkliste zusammengefasst.
                        </p>
                        <Link href="/fliesen/abnahme" className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-orange-600 hover:text-orange-700">
                            Checkliste zur Abnahme
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </article>
                </div>
            </section>

            {/* Weiterlesen */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 relative z-10" aria-labelledby="weiterlesen-heading">
                <h2 id="weiterlesen-heading" className="text-xl font-black text-slate-900 mb-5">Weiterlesen</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {CROSS_LINKS.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className="group block h-full glass-surface rounded-tile-md p-5 hover:-translate-y-0.5 hover:border-orange-500/80 transition-all duration-300"
                            >
                                <span className="flex items-center justify-between gap-2 font-black text-slate-900 group-hover:text-orange-600 transition-colors">
                                    {link.label}
                                    <ArrowRight className="w-4 h-4 shrink-0 text-orange-500" />
                                </span>
                                <span className="mt-1 block text-sm text-slate-600">{link.desc}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
                <p className="mt-6 text-sm text-slate-700">
                    Direkt sprechen:{' '}
                    <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className="inline-flex items-center gap-1 font-bold text-orange-600 hover:text-orange-700">
                        <Phone className="w-3.5 h-3.5" />
                        {COMPANY_DATA.contact.phone}
                    </a>
                </p>
            </section>

            <QualityPromise />

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10" aria-label="Fliesen-Konfigurator">
                <FliesenKonfigurator />
            </section>
        </div>
    );
}
