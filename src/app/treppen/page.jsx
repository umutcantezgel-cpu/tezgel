import React from 'react';
import Link from 'next/link';
import {
    Home,
    Building2,
    Trees,
    ArrowRight,
    Phone,
    Layers,
    Ruler,
    CheckCircle2,
    AlertTriangle,
    Hammer,
    Mountain,
    Square
} from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import { TOPIC_HUBS } from '@/config/topics';
import { createMetadata } from '@/lib/metadata';
import QualityPromise from '@/components/sections/QualityPromise';

export const metadata = createMetadata({
    title: 'Treppe sanieren: Beläge für innen, außen & Treppenhaus',
    description:
        'Alte Massivtreppe neu belegen statt abreißen: Treppentypen, Belagsarten und gleichmäßige Steigungen im Überblick – mit Detailseiten für jeden Treppentyp.',
    path: '/treppen'
});

const TREPPEN_HUB = TOPIC_HUBS.find((hub) => hub.id === 'treppen');
const SUBPAGES = (TREPPEN_HUB?.pages ?? []).filter((page) => page.path !== '/treppen');

const SUBPAGE_ICONS = {
    '/treppen/innentreppe': Home,
    '/treppen/treppenhaus': Building2,
    '/treppen/aussentreppe': Trees
};

const SUBPAGE_TEXT = {
    '/treppen/innentreppe':
        'Die Betontreppe im Einfamilienhaus: Tritt- und Setzstufen passend zum Wohnbereich, Kantenlösungen im Vergleich, gestufte Sockel und Podeste.',
    '/treppen/treppenhaus':
        'Gemeinschaftstreppen im Mehrfamilienhaus: strapazierfähige Beläge, Planung mit Hausverwaltung oder Eigentümern und abschnittsweises Arbeiten.',
    '/treppen/aussentreppe':
        'Hauseingang, Kellerabgang, Gartentreppe: frostbeständige Beläge, Gefälle und Entwässerung, Blockstufen und die Sanierung typischer Frostschäden.'
};

const SUITABLE = [
    'Treppen aus Stahlbeton, auch Fertigteiltreppen',
    'gemauerte bzw. massiv unterbaute Treppen',
    'bestehende, fest haftende Fliesen- oder Natursteinbeläge (nach Prüfung)',
    'Außentreppen auf tragfähigem, frostsicherem Unterbau'
];

const NOT_SUITABLE = [
    'Holztreppen: Holz arbeitet, ein starrer Fliesenbelag reißt oder löst sich',
    'Stahl- und Wangentreppen mit frei tragenden Stufen',
    'Treppen mit Rissen im Tragwerk oder lockeren Stufen – hier zuerst ein Tragwerksplaner bzw. Rohbaubetrieb',
    'Stufen, bei denen sich durch den Belag die Laufbreite oder Kopfhöhe unzulässig verändern würde'
];

const COVERINGS = [
    {
        icon: Square,
        title: 'Fliesen auf Tritt- und Setzstufen',
        desc: 'Bodenfliesen werden für jede Stufe zugeschnitten; die Kante entsteht per Gehrung oder mit einem Stufenprofil. Das Format kann zum angrenzenden Boden passen, damit Flur und Treppe wie aus einem Guss wirken.'
    },
    {
        icon: Layers,
        title: 'Feinsteinzeug-Stufenplatten',
        desc: 'Stufenplatten mit werkseitig ausgebildeter Kante („Stufenfliese“) bringen eine fertige, abgerundete oder gefaste Vorderkante mit. Sie sind robust, aber an Laufbreite und Stufentiefe gebunden, die das Sortiment vorgibt.'
    },
    {
        icon: Mountain,
        title: 'Naturstein-Stufenbeläge',
        desc: 'Tritt- und Setzstufen aus Granit, Schiefer, Quarzit oder Kalkstein – meist vom Steinlieferanten nach Aufmaß zugeschnitten und an der Vorderkante bearbeitet. Welche Sorte sich für Ihre Treppe eignet, hängt von Nutzung und Standort ab.'
    },
    {
        icon: Hammer,
        title: 'Blockstufen (Außenbereich)',
        desc: 'Blockstufen sind keine Belagsart, sondern eine eigene massive Stufenkonstruktion aus Naturstein oder Beton, die auf Fundament bzw. Mörtelbett gesetzt wird – typisch für Hauseingang und Garten. Mehr dazu auf der Seite zur Außentreppe.'
    }
];

const WEITERLESEN = [
    { title: 'Wohnbereiche fliesen', path: '/leistungen/wohnen', desc: 'Flur, Wohnraum und Treppe in einem Belagskonzept' },
    { title: 'Außenbereiche', path: '/leistungen/aussen', desc: 'Balkon, Terrasse und Eingang dauerhaft belegt' },
    { title: 'Rutschhemmung verstehen', path: '/blog/rutschfeste-fliesen-r-klassen', desc: 'R-Klassen und Bewertungsgruppen nach DIN EN 16165' },
    { title: 'Referenzen', path: '/referenzen', desc: 'Ausgeführte Projekte und Kundenstimmen' }
];

export default function TreppenPage() {
    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            <div className="ambient-glow-orange -top-32 -left-32 opacity-70" />
            <div className="ambient-glow-warm top-96 -right-24 opacity-60" />

            {/* Hero */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10" aria-labelledby="treppen-heading">
                <div className="ceramic-hero rounded-tile-2xl p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow eyebrow-orange">
                        <Layers className="w-3.5 h-3.5 text-orange-600" />
                        Treppenanlagen &middot; Fachbetrieb aus {COMPANY_DATA.headquarters.city}
                    </span>
                    <h1 id="treppen-heading" className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                        Treppen neu belegen:{' '}
                        <span className="text-ceramic-gradient">Welche Lösung passt zu Ihrer Treppe?</span>
                    </h1>
                    <p className="text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
                        Eine abgenutzte Massivtreppe muss nicht abgerissen werden. Solange der Rohbau trägt, bekommt sie mit
                        Fliesen, Feinsteinzeug oder Naturstein einen neuen, dauerhaften Belag – innen, im Treppenhaus und
                        am Hauseingang. Hier finden Sie die Grundlagen und die Detailseiten für jeden Treppentyp.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
                        <Link href="/kontakt" className="btn-primary px-7 py-3.5 text-xs group">
                            Aufmaß vor Ort anfragen
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <Link href="/treppen/innentreppe" className="btn-ghost px-7 py-3.5 text-xs">
                            Innentreppe fliesen
                        </Link>
                    </div>
                </div>
            </section>

            {/* Treppentypen – Subpages */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10" aria-labelledby="treppentypen-heading">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="eyebrow eyebrow-orange mb-4">Welche Treppe haben Sie?</span>
                    <h2 id="treppentypen-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        Innentreppe, Treppenhaus oder Außentreppe
                    </h2>
                    <p className="mt-3 text-base text-slate-700 leading-relaxed">
                        Jeder Treppentyp stellt eigene Anforderungen – an Optik, Belastbarkeit, Trittsicherheit und
                        Witterungsbeständigkeit. Wählen Sie Ihre Situation:
                    </p>
                </div>

                <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {SUBPAGES.map((page) => {
                        const Icon = SUBPAGE_ICONS[page.path] ?? Layers;
                        return (
                            <li key={page.path}>
                                <Link
                                    href={page.path}
                                    className="group glass-surface p-8 rounded-tile-2xl h-full flex flex-col hover:-translate-y-0.5 hover:border-orange-500/80 hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.14)] transition-all duration-300"
                                >
                                    <span className="icon-chip w-12 h-12 mb-5 text-orange-600">
                                        <Icon className="w-6 h-6" />
                                    </span>
                                    <h3 className="font-black text-lg text-slate-900 group-hover:text-orange-700 transition-colors mb-1">
                                        {page.name}
                                    </h3>
                                    <p className="text-xs font-bold uppercase tracking-wider text-orange-700 mb-3">{page.desc}</p>
                                    <p className="text-sm text-slate-700 leading-relaxed mb-5 flex-1">{SUBPAGE_TEXT[page.path]}</p>
                                    <span className="text-sm font-bold text-orange-700 inline-flex items-center gap-1">
                                        Zur Detailseite
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </section>

            {/* Voraussetzung */}
            <section className="py-20 bg-white border-y border-slate-200 relative z-10" aria-labelledby="voraussetzung-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="eyebrow eyebrow-orange mb-4">Voraussetzung</span>
                        <h2 id="voraussetzung-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Tragfähige Massivtreppe: was sich belegen lässt – und was nicht
                        </h2>
                        <p className="mt-3 text-base text-slate-700 leading-relaxed">
                            Fliesen und Naturstein sind starre Beläge. Sie halten dauerhaft nur auf einem Untergrund, der sich
                            nicht bewegt. Rohbau, Geländer und Statik der Treppe sind nicht Teil unserer Leistung – wir
                            prüfen beim Vor-Ort-Termin aber, ob Ihre Treppe als Untergrund geeignet ist.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-8 rounded-tile-xl bg-slate-50 border border-slate-200">
                            <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-orange-600" />
                                In der Regel gut belegbar
                            </h3>
                            <ul className="space-y-3">
                                {SUITABLE.map((item) => (
                                    <li key={item} className="flex items-start gap-2 text-sm text-slate-700 leading-relaxed">
                                        <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="p-8 rounded-tile-xl bg-slate-50 border border-slate-200">
                            <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5 text-amber-500" />
                                Nicht oder nur nach Klärung
                            </h3>
                            <ul className="space-y-3">
                                {NOT_SUITABLE.map((item) => (
                                    <li key={item} className="flex items-start gap-2 text-sm text-slate-700 leading-relaxed">
                                        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Belagsarten */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10" aria-labelledby="belagsarten-heading">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="eyebrow eyebrow-orange mb-4">Belagsarten im Überblick</span>
                    <h2 id="belagsarten-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        Fliese, Stufenplatte, Naturstein – oder Blockstufe
                    </h2>
                </div>

                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {COVERINGS.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li
                                key={item.title}
                                className="group glass-surface p-7 rounded-tile-2xl hover:-translate-y-0.5 hover:border-orange-500/80 hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.14)] transition-all duration-300"
                            >
                                <span className="icon-chip w-11 h-11 mb-4 text-orange-600">
                                    <Icon className="w-5 h-5" />
                                </span>
                                <h3 className="font-black text-base text-slate-900 mb-2 group-hover:text-orange-700 transition-colors">{item.title}</h3>
                                <p className="text-sm text-slate-700 leading-relaxed">{item.desc}</p>
                            </li>
                        );
                    })}
                </ul>

                <p className="mt-8 text-sm text-slate-700 leading-relaxed max-w-4xl mx-auto text-center">
                    Wie die Stufenkante ausgebildet wird – Gehrung, Profil oder Stufenplatte – vergleichen wir ausführlich
                    auf der Seite{' '}
                    <Link href="/treppen/innentreppe" className="font-bold text-orange-700 hover:text-orange-600 hover:underline underline-offset-2">
                        Innentreppe fliesen
                    </Link>
                    . Welche Rutschhemmung auf Stufen sinnvoll ist, erklärt unser Beitrag zu den{' '}
                    <Link href="/blog/rutschfeste-fliesen-r-klassen" className="font-bold text-orange-700 hover:text-orange-600 hover:underline underline-offset-2">
                        R-Klassen nach DIN EN 16165
                    </Link>
                    .
                </p>
            </section>

            {/* Gleichmäßige Steigungen */}
            <section className="py-20 bg-white border-y border-slate-200 relative z-10" aria-labelledby="steigungen-heading">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-10">
                        <span className="eyebrow eyebrow-orange mb-4">
                            <Ruler className="w-3.5 h-3.5 text-orange-600" />
                            Gleichmäßige Steigungen
                        </span>
                        <h2 id="steigungen-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Belagdicken und Ausgleich vorher planen
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-700 leading-relaxed">
                        <div className="glass-surface rounded-tile-2xl p-7 space-y-3">
                            <h3 className="font-black text-base text-slate-900">Warum es auf Millimeter ankommt</h3>
                            <p>
                                Beim Gehen stellt sich der Körper auf eine gleichbleibende Stufenhöhe ein. Weicht eine einzelne
                                Steigung spürbar ab – häufig die erste oder die letzte –, wird die Treppe zur Stolperfalle.
                                Die DIN 18065 dient als Orientierung: Sie lässt innerhalb eines Treppenlaufs nur geringe
                                Abweichungen zwischen den Steigungen zu.
                            </p>
                            <p>
                                Eine Treppe mit n Steigungen hat n Setzstufen, aber in der Regel nur n−1 Trittstufen – die
                                oberste „Stufe“ ist der Boden des Obergeschosses bzw. das Podest. Die Belagsfläche einer
                                Trittstufe ist der Auftritt einschließlich Überstand an der Vorderkante.
                            </p>
                        </div>
                        <div className="glass-surface rounded-tile-2xl p-7 space-y-3">
                            <h3 className="font-black text-base text-slate-900">Was wir beim Aufmaß klären</h3>
                            <ul className="space-y-2">
                                {[
                                    'Höhe jeder einzelnen Steigung und Tiefe jedes Auftritts',
                                    'Aufbauhöhe des neuen Belags unten und oben: Bekommen Flur und Obergeschoss denselben Aufbau, verschieben sich alle Stufen gleichmäßig',
                                    'Wird nur die Treppe belegt, wird die unterste Steigung höher und die oberste niedriger – das gleichen wir über das Kleber- bzw. Mörtelbett und passende Belagdicken aus',
                                    'Ungleichmäßige Rohbaustufen lassen sich nur begrenzt korrigieren; die Maße des Rohbaus bleiben maßgebend'
                                ].map((item) => (
                                    <li key={item} className="flex items-start gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Renovieren statt Abriss */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10" aria-labelledby="renovieren-heading">
                <div className="ceramic-hero rounded-tile-2xl p-8 sm:p-12 space-y-5">
                    <span className="eyebrow eyebrow-neutral">Alte Treppe renovieren</span>
                    <h2 id="renovieren-heading" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                        Neuer Belag statt Abriss
                    </h2>
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                        Viele ältere Treppen tragen Teppich, PVC oder abgenutzte Fliesen, während der Rohbau darunter noch
                        tragfähig ist. Die Renovierung läuft deshalb in klaren Schritten:
                    </p>
                    <ol className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            { t: 'Altbelag prüfen', d: 'Fest haftende Fliesen können unter Umständen bleiben; Teppich, PVC und Kleberreste werden entfernt.' },
                            { t: 'Untergrund vorbereiten', d: 'Stufen reinigen, grundieren, Ausbrüche und Unebenheiten mit geeignetem Mörtel ausgleichen.' },
                            { t: 'Stufen einzeln aufmessen', d: 'Keine Stufe ist exakt gleich – jede Tritt- und Setzstufe wird individuell zugeschnitten.' },
                            { t: 'Vollflächig verlegen', d: 'Hohlraumarm verlegt mit flexiblem Fliesenkleber, damit Kanten unter Last nicht abbrechen.' }
                        ].map((step, idx) => (
                            <li key={step.t} className="rounded-tile-lg bg-white/80 border border-slate-200 p-5">
                                <span className="font-display block text-3xl font-black tabular-nums text-orange-500/30 mb-2" aria-hidden="true">
                                    {String(idx + 1).padStart(2, '0')}
                                </span>
                                <h3 className="font-black text-slate-900 mb-1">{step.t}</h3>
                                <p className="text-sm text-slate-700 leading-relaxed">{step.d}</p>
                            </li>
                        ))}
                    </ol>
                    <div className="flex flex-wrap gap-3.5 pt-2">
                        <Link href="/kontakt" className="btn-primary px-7 py-3.5 text-xs">
                            Treppe begutachten lassen
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className="btn-ghost px-7 py-3.5 text-xs">
                            <Phone className="w-4 h-4 text-orange-600" />
                            {COMPANY_DATA.contact.phone}
                        </a>
                    </div>
                </div>
            </section>

            {/* Weiterführende Ratgeber */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 relative z-10" aria-labelledby="treppen-ratgeber-heading">
                <h2 id="treppen-ratgeber-heading" className="text-2xl font-black text-slate-900 tracking-tight mb-6">
                    Weiterführende Ratgeber zu Treppen &amp; Treppensanierung
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {WEITERLESEN.map((link) => (
                        <li key={link.path}>
                            <Link
                                href={link.path}
                                className="group glass-surface rounded-tile-lg p-5 h-full block hover:-translate-y-0.5 hover:border-orange-500/80 transition-all duration-300"
                            >
                                <span className="font-black text-slate-900 group-hover:text-orange-700 transition-colors flex items-center gap-1">
                                    {link.title}
                                    <ArrowRight className="w-4 h-4" />
                                </span>
                                <span className="block mt-1 text-sm text-slate-700">{link.desc}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>

            <QualityPromise />
        </div>
    );
}
