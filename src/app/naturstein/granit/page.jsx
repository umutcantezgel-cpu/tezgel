import React from 'react';
import Link from 'next/link';
import {
    ArrowRight,
    Phone,
    MessageCircle,
    Mountain,
    Layers,
    Gem,
    Hexagon,
    Grid3x3,
    Footprints,
    Ruler,
    Tag,
    TriangleAlert,
    Info,
    BookOpen
} from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import { createMetadata } from '@/lib/metadata';
import QualityPromise from '@/components/sections/QualityPromise';

export const metadata = createMetadata({
    title: 'Granit & Schiefer verlegen: Boden, Treppe, Außen',
    description:
        'Granit, Schiefer, Quarzit und andere silikatische Natursteine: Eigenschaften, Oberflächen, Rutschhemmung, kalibrierte oder spaltraue Platten und Pflege.',
    path: '/naturstein/granit'
});

const STONES = [
    {
        title: 'Granit & granitähnliche Tiefengesteine',
        desc: 'Grobkörnig, sehr hart und dicht. Klassiker für stark begangene Böden, Eingangsbereiche und Treppen; viele Sorten sind frostbeständig und damit auch für außen geeignet.',
        icon: Mountain
    },
    {
        title: 'Gneis',
        desc: 'Metamorphes, unter Druck und Hitze umgewandeltes Gestein mit oft streifiger, bewegter Zeichnung. Ähnlich robust wie Granit, im Handel häufig ebenfalls unter „Granit“ geführt.',
        icon: Layers
    },
    {
        title: 'Quarzit',
        desc: 'Besteht fast vollständig aus Quarz und ist entsprechend hart und abriebfest. Häufig spaltrau oder mit feiner Oberfläche erhältlich, innen wie außen beliebt.',
        icon: Gem
    },
    {
        title: 'Schiefer',
        desc: 'Feinschichtig, meist dunkel, spaltrau oder geschliffen. Vergleichsweise weich und kratzempfindlicher als Granit, aber überwiegend silikatisch aufgebaut.',
        icon: Hexagon
    },
    {
        title: 'Silikatische Sandsteine',
        desc: 'Körnige Steine mit warmer, natürlicher Oberfläche. Entscheidend ist das Bindemittel zwischen den Körnern: Nur bei kieseligem Bindemittel ist der Stein weitgehend säureunempfindlich.',
        icon: Grid3x3
    }
];

const SURFACES = [
    { name: 'Poliert', text: 'Glänzend, farbintensiv, pflegeleicht – bei Nässe aber glatt. Für trockene Wohnbereiche und Wandflächen.' },
    { name: 'Geschliffen / gehont', text: 'Seidenmatt, ruhige Optik, trittsicherer als poliert. Vielseitig für Böden innen.' },
    { name: 'Geflammt', text: 'Durch Hitze aufgeraute, griffige Oberfläche. Typisch für Granit im Außenbereich und auf Außentreppen.' },
    { name: 'Gebürstet / sandgestrahlt', text: 'Leicht strukturiert, samtige Haptik. Verbindet Rutschhemmung mit angenehmem Gehgefühl.' },
    { name: 'Spaltrau', text: 'Natürliche Spaltfläche, besonders bei Schiefer und Quarzit. Lebendige Optik, gute Trittsicherheit.' }
];

const FURTHER_READING = [
    { label: 'Naturstein-Ratgeber: Imprägnierung & Pflege', href: '/naturstein' },
    { label: 'Marmor, Travertin & Kalkstein', href: '/naturstein/marmor-kalkstein' },
    { label: 'Treppen neu belegen', href: '/treppen' },
    { label: 'Leistung: Außenbereiche & Balkone', href: '/leistungen/aussen' }
];

export default function GranitPage() {
    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            <div className="ambient-glow-orange -top-32 -left-32 opacity-70" />
            <div className="ambient-glow-warm top-96 -right-24 opacity-60" />

            {/* Hero */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10" aria-labelledby="granit-heading">
                <div className="ceramic-hero rounded-tile-2xl p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow eyebrow-orange">
                        <Mountain className="w-3.5 h-3.5 text-orange-600" />
                        Silikatische Natursteine
                    </span>
                    <h1 id="granit-heading" className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                        Granit, Schiefer und Quarzit:{' '}
                        <span className="text-ceramic-gradient">silikatische Natursteine richtig verlegen</span>
                    </h1>
                    <p className="text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
                        Hart im Nehmen und deutlich unempfindlicher gegen Säure als Marmor: Silikatische Steine eignen sich für stark
                        genutzte Böden, Treppen und – in frostbeständigen Sorten – auch für draußen. Worauf es bei Auswahl und
                        Verlegung ankommt.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
                        <Link href="/kontakt" className="btn-primary px-7 py-3.5 text-xs group">
                            Granitverlegung anfragen
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <Link href="/naturstein" className="btn-ghost px-7 py-3.5 text-xs">
                            Naturstein-Ratgeber
                        </Link>
                    </div>
                </div>
            </section>

            {/* Silicate meaning */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10" aria-labelledby="granit-silikat-heading">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <span className="eyebrow eyebrow-orange mb-4">Grundlagen</span>
                        <h2 id="granit-silikat-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Silikatisch statt kalkhaltig: was das für Säure, Flecken und Pflege bedeutet
                        </h2>
                        <div className="mt-5 space-y-4 text-base text-slate-700 leading-relaxed">
                            <p>
                                Silikatische Gesteine bestehen überwiegend aus Quarz, Feldspat und Glimmer. Diese Minerale werden von
                                haushaltsüblichen Säuren wie Essig oder Zitronensaft praktisch nicht angegriffen – anders als der Kalk in
                                Marmor oder Travertin.
                            </p>
                            <p>
                                Unempfindlich gegen Flecken sind sie deshalb nicht automatisch: Auch Granit hat Poren, in die Öl oder
                                Rotwein eindringen können. Eine Imprägnierung und eine pH-neutrale Pflege halten die Oberfläche
                                dauerhaft schön – Einzelheiten dazu im{' '}
                                <Link href="/naturstein" className="font-bold text-orange-700 hover:text-orange-600 hover:underline underline-offset-2">
                                    Naturstein-Ratgeber
                                </Link>
                                .
                            </p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex gap-3 rounded-tile-lg bg-amber-50 border border-amber-200 p-5 text-sm text-slate-700 leading-relaxed">
                            <TriangleAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" aria-hidden="true" />
                            <p>
                                <strong className="text-amber-800">Ausnahmen kennen:</strong> Sandsteine mit kalkhaltigem Bindemittel
                                reagieren auf Säure wie Kalkstein. Schiefer kann Kalk oder Pyrit enthalten; Pyrit oxidiert an der Luft
                                und hinterlässt Rostflecken. Fragen Sie beim Kauf nach den Prüfwerten der Sorte.
                            </p>
                        </div>
                        <div className="flex gap-3 rounded-tile-lg bg-orange-50/60 border border-orange-200/80 p-5 text-sm text-slate-700 leading-relaxed">
                            <Tag className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" aria-hidden="true" />
                            <div>
                                <h3 className="font-black text-slate-900 mb-1">„Granit“ im Handel: Handelsname und Gesteinsart</h3>
                                <p>
                                    Im Natursteinhandel steht „Granit“ oft für eine ganze Gruppe harter, polierfähiger Gesteine. Unter diesem Namen
                                    werden auch Gneis, Gabbro oder andere Tiefengesteine verkauft. Für die Verlegung zählen deshalb nicht der
                                    Handelsname, sondern Gesteinsart und Prüfwerte: Wasseraufnahme, Frostbeständigkeit und Biegefestigkeit.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stone cards */}
            <section className="py-20 bg-white border-y border-slate-200 relative z-10" aria-labelledby="granit-sorten-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="eyebrow eyebrow-orange mb-4">Gesteine</span>
                        <h2 id="granit-sorten-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Die silikatischen Natursteine{' '}
                            <span className="text-ceramic-gradient">im Überblick</span>
                        </h2>
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {STONES.map((item) => {
                            const Icon = item.icon;
                            return (
                                <li
                                    key={item.title}
                                    className="group glass-surface p-7 rounded-tile-2xl hover:-translate-y-0.5 hover:border-orange-500/80 hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.14)] transition-all duration-300"
                                >
                                    <span className="icon-chip w-12 h-12 mb-5 text-orange-600">
                                        <Icon className="w-6 h-6" />
                                    </span>
                                    <h3 className="font-black text-base text-slate-900 mb-2 group-hover:text-orange-700 transition-colors">{item.title}</h3>
                                    <p className="text-sm text-slate-700 leading-relaxed">{item.desc}</p>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </section>

            {/* Slate + surfaces */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    <article className="lg:col-span-2 glass-surface rounded-tile-2xl p-7" aria-labelledby="granit-schiefer-heading">
                        <span className="icon-chip w-11 h-11 mb-4 text-orange-600">
                            <Hexagon className="w-5 h-5" />
                        </span>
                        <h2 id="granit-schiefer-heading" className="text-xl font-black text-slate-900 mb-4">
                            Schiefer: spaltrau oder geschliffen, kalibriert oder unkalibriert
                        </h2>
                        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                            <p>
                                <strong className="text-slate-900">Spaltrau</strong> zeigt die natürliche Schichtfläche mit lebendigem
                                Relief. <strong className="text-slate-900">Geschliffen</strong> wirkt ruhiger und lässt sich leichter
                                reinigen.
                            </p>
                            <p>
                                <strong className="text-slate-900">Kalibrierte</strong> Platten sind auf eine einheitliche Stärke
                                gebracht und lassen sich im Dünnbett verlegen. <strong className="text-slate-900">Unkalibrierte</strong>{' '}
                                Platten schwanken in der Stärke; sie werden im Mittelbett verlegt, damit die Oberfläche trotzdem eben wird.
                            </p>
                            <p>
                                Weil Schiefer weicher ist als Granit, zeigt er Kratzer durch Sand schneller. Eine Sauberlaufzone am
                                Eingang schont den Belag.
                            </p>
                        </div>
                    </article>

                    <div className="lg:col-span-3">
                        <span className="eyebrow eyebrow-orange mb-4">
                            <Footprints className="w-3.5 h-3.5 text-orange-600" />
                            Oberflächen
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-3">
                            Oberflächen und Rutschhemmung
                        </h2>
                        <p className="text-sm text-slate-700 leading-relaxed mb-6">
                            Derselbe Stein kann je nach Bearbeitung spiegelglatt oder griffig sein. Die Rutschhemmung wird nach
                            DIN EN 16165 bestimmt (R9 bis R13 für das Begehen mit Schuhen, A bis C für Barfußbereiche). Welche Klasse
                            wo sinnvoll ist, erklärt unser Beitrag{' '}
                            <Link href="/blog/rutschfeste-fliesen-r-klassen" className="font-bold text-orange-700 hover:text-orange-600 hover:underline underline-offset-2">
                                Rutschfeste Fliesen
                            </Link>
                            .
                        </p>
                        <ul className="space-y-3">
                            {SURFACES.map((surface) => (
                                <li key={surface.name} className="rounded-tile-lg bg-white border border-slate-200 p-4 sm:flex sm:gap-4">
                                    <span className="block sm:w-44 shrink-0 font-black text-sm text-slate-900">{surface.name}</span>
                                    <span className="block text-sm text-slate-700 leading-relaxed">{surface.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Laying + use */}
            <section className="py-20 bg-white border-y border-slate-200 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <article className="rounded-tile-2xl bg-slate-50 border border-slate-200 p-7" aria-labelledby="granit-verlegung-heading">
                        <span className="icon-chip w-11 h-11 mb-4 text-orange-600">
                            <Ruler className="w-5 h-5" />
                        </span>
                        <h2 id="granit-verlegung-heading" className="text-xl font-black text-slate-900 mb-4">
                            Verlegung: Dünnbett oder Mittelbett, immer mit natursteingeeignetem Kleber
                        </h2>
                        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                            <p>
                                Kalibrierte Platten verlegen wir im Dünnbett, unkalibrierte im Mittelbett. In beiden Fällen wird die Platte
                                hohlraumarm eingebettet, damit sie unter Last nicht bricht.
                            </p>
                            <p>
                                Auch silikatische Steine können sich verfärben: Helle Granite und Quarzite nehmen Feuchtigkeit aus dem
                                Mörtelbett auf, was zu dunklen Flecken oder Rändern führen kann. Deshalb verwenden wir weiße, schnell
                                abbindende Kleber, die für Naturstein geeignet sind.
                            </p>
                        </div>
                    </article>
                    <article className="rounded-tile-2xl bg-slate-50 border border-slate-200 p-7" aria-labelledby="granit-einsatz-heading">
                        <span className="icon-chip w-11 h-11 mb-4 text-orange-600">
                            <Mountain className="w-5 h-5" />
                        </span>
                        <h2 id="granit-einsatz-heading" className="text-xl font-black text-slate-900 mb-4">
                            Einsatz innen und außen, Pflege und Imprägnierung
                        </h2>
                        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                            <p>
                                Innen eignen sich silikatische Steine für Flur, Küche, Wohnbereich und Bad. Draußen entscheidet die
                                Frostbeständigkeit der jeweiligen Sorte; eine griffige Oberfläche ist Pflicht. Passende Aufbauten zeigt
                                unser Ratgeber{' '}
                                <Link href="/balkon-terrasse/terrassenplatten" className="font-bold text-orange-700 hover:text-orange-600 hover:underline underline-offset-2">
                                    Terrassenplatten
                                </Link>
                                ; für Stufen aus Naturstein lohnt ein Blick in den{' '}
                                <Link href="/treppen" className="font-bold text-orange-700 hover:text-orange-600 hover:underline underline-offset-2">
                                    Treppen-Ratgeber
                                </Link>
                                .
                            </p>
                            <p>
                                Gepflegt wird mit Wasser und pH-neutralem Steinreiniger. Ob und wann eine Imprägnierung sinnvoll ist,
                                erklärt der{' '}
                                <Link href="/naturstein" className="font-bold text-orange-700 hover:text-orange-600 hover:underline underline-offset-2">
                                    Naturstein-Ratgeber
                                </Link>
                                .
                            </p>
                        </div>
                    </article>
                </div>
            </section>

            {/* CTA + further reading */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 relative z-10" aria-labelledby="granit-cta-heading">
                <div className="mb-10 flex gap-3 rounded-tile-lg bg-orange-50/60 border border-orange-200/80 p-5 text-sm text-slate-700 leading-relaxed">
                    <Info className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" aria-hidden="true" />
                    <p>
                        Naturstein variiert von Platte zu Platte in Farbe und Zeichnung. Das ist Teil seines Charakters – wir sortieren
                        größere Flächen vor dem Verlegen, damit das Gesamtbild stimmig wirkt.
                    </p>
                </div>

                <div className="ceramic-hero rounded-tile-2xl p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow eyebrow-orange">Beratung &amp; Aufmaß</span>
                    <h2 id="granit-cta-heading" className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight">
                        Granit, Schiefer oder Quarzit für Ihr Projekt?
                    </h2>
                    <p className="text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
                        Wir prüfen Untergrund und Einsatzbereich, besprechen Oberfläche und Plattenstärke und verlegen Ihren Stein mit
                        dem passenden Mörtelbett.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
                        <Link href="/kontakt" className="btn-primary px-7 py-3.5 text-xs group">
                            Granitverlegung anfragen
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className="btn-ghost px-7 py-3.5 text-xs">
                            <Phone className="w-4 h-4 text-orange-600" />
                            {COMPANY_DATA.contact.phone}
                        </a>
                        <a
                            href={COMPANY_DATA.contact.whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass-button-whatsapp px-7 py-3.5 text-xs"
                        >
                            <MessageCircle className="w-4 h-4" />
                            WhatsApp
                        </a>
                    </div>
                </div>

                <nav className="mt-10 glass-surface rounded-tile-2xl p-7" aria-labelledby="granit-weiterlesen-heading">
                    <h2 id="granit-weiterlesen-heading" className="flex items-center gap-2 font-black text-base text-slate-900 mb-4">
                        <BookOpen className="w-5 h-5 text-orange-600" aria-hidden="true" />
                        Weiterlesen
                    </h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {FURTHER_READING.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="inline-flex items-center gap-1.5 text-sm font-bold text-orange-700 hover:text-orange-600 hover:underline underline-offset-2"
                                >
                                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </section>

            <QualityPromise />
        </div>
    );
}
