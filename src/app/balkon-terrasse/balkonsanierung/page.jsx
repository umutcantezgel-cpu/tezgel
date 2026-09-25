import React from 'react';
import Link from 'next/link';
import {
    ArrowRight,
    Phone,
    MessageCircle,
    Wrench,
    Droplets,
    Snowflake,
    Sparkles,
    SquareSplitVertical,
    Grid3x3,
    CloudRain,
    Hammer,
    ScanSearch,
    ShieldCheck,
    LayoutGrid,
    ArrowDownRight,
    Info,
    BookOpen
} from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import { createMetadata } from '@/lib/metadata';
import QualityPromise from '@/components/sections/QualityPromise';

export const metadata = createMetadata({
    title: 'Balkonsanierung: Abdichtung, Gefälle & neuer Belag',
    description:
        'Ausblühungen, Risse, lose Fliesen am Balkon? Ursachen erkennen, Altbelag rückbauen, Abdichtung und Gefälle herstellen, neu belegen – so läuft die Sanierung.',
    path: '/balkon-terrasse/balkonsanierung'
});

const DAMAGE = [
    {
        title: 'Kalkausblühungen',
        desc: 'Weiße Krusten und Kalkfahnen an Fugen, Stirnkanten oder unter dem Balkon zeigen: Wasser wandert durch das Mörtelbett und löst dabei Kalk aus dem Zement.',
        icon: Sparkles
    },
    {
        title: 'Frostschäden',
        desc: 'Abgeplatzte Fliesenkanten, gesprengte Fugen und gebrochene Platten entstehen, wenn Wasser im Belag gefriert. Häufig betroffen: nicht frostbeständige Fliesen und Hohlstellen.',
        icon: Snowflake
    },
    {
        title: 'Hohl liegende und lose Fliesen',
        desc: 'Klingt der Belag beim Abklopfen hohl oder wackeln einzelne Fliesen, hat sich der Verbund zum Untergrund gelöst. Dahinter sammelt sich meist Wasser.',
        icon: Grid3x3
    },
    {
        title: 'Feuchte unter dem Belag',
        desc: 'Dauerhaft dunkle Fugen, Moos, Pfützen nach dem Regen oder Wasser, das an der Unterseite austritt, deuten auf eine fehlende oder undichte Abdichtung hin.',
        icon: Droplets
    },
    {
        title: 'Risse',
        desc: 'Risse durch Fliesen und Fugen folgen oft fehlenden Bewegungsfugen oder Rissen im Untergrund. Sie sind Einfallstore für Wasser und damit für Folgeschäden.',
        icon: SquareSplitVertical
    },
    {
        title: 'Schäden an der Balkonplatte',
        desc: 'Abplatzender Beton, freiliegender oder rostender Stahl und Feuchte an der Decke darunter gehören in die Hand eines Fachplaners für Betoninstandsetzung – bevor ein neuer Belag kommt.',
        icon: CloudRain
    }
];

const CAUSES = [
    {
        title: 'Fehlendes Gefälle',
        text: 'Liegt die Fläche waagerecht oder sogar zum Haus geneigt, bleibt Wasser stehen, dringt in Fugen ein und gefriert im Winter.'
    },
    {
        title: 'Abdichtungsfehler',
        text: 'Keine Abdichtung, eine Abdichtung ohne ausreichend hohe Anschlüsse an Wand und Tür oder eine Abdichtung unter einem Estrich, der sich dann dauerhaft mit Wasser vollsaugt.'
    },
    {
        title: 'Falscher Aufbau',
        text: 'Innenfliesen ohne Frostbeständigkeit, ein Mörtelbett ohne Entwässerung, fehlende Bewegungsfugen oder eine Kante, über die Wasser an der Stirnseite herunterläuft.'
    }
];

const STEPS = [
    {
        step: '01',
        title: 'Rückbau',
        text: 'Alter Belag, Mörtelbett und – wenn nötig – ein durchfeuchteter Estrich werden entfernt, bis ein tragfähiger Untergrund freiliegt.',
        icon: Hammer
    },
    {
        step: '02',
        title: 'Untergrundprüfung',
        text: 'Wir prüfen Tragfähigkeit, Feuchte, Ebenheit und Gefälle. Schäden an der Betonplatte selbst werden vor dem Weiterbau durch einen Fachbetrieb instand gesetzt.',
        icon: ScanSearch
    },
    {
        step: '03',
        title: 'Gefälle & Abdichtung',
        text: 'Ein Gefälle vom Gebäude weg wird hergestellt, darauf folgt die Abdichtung mit sauber ausgebildeten Anschlüssen an Wand, Tür, Brüstung und Durchdringungen.',
        icon: ShieldCheck
    },
    {
        step: '04',
        title: 'Neuer Belag',
        text: 'Je nach Aufbauhöhe und Situation folgt ein Belag auf Stelzlagern, im Splittbett oder in gebundener Verlegung – mit Randabschluss und Tropfkante.',
        icon: LayoutGrid
    }
];

const FURTHER_READING = [
    { label: 'Aufbauten im Vergleich: Balkon & Terrasse', href: '/balkon-terrasse' },
    { label: 'Platten auf Stelzlagern', href: '/balkon-terrasse/stelzlager' },
    { label: 'Leistung: Untergrund & Abdichtung', href: '/leistungen/untergrund' },
    { label: 'Persönliche Beratung', href: '/beratung' }
];

export default function BalkonsanierungPage() {
    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            <div className="ambient-glow-orange -top-32 -left-32 opacity-70" />
            <div className="ambient-glow-red top-96 -right-24 opacity-60" />

            {/* Hero */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10" aria-labelledby="balkonsanierung-heading">
                <div className="ceramic-hero rounded-tile-2xl p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow">
                        <Wrench className="w-3.5 h-3.5" />
                        Sanierung von Bestandsbalkonen
                    </span>
                    <h1 id="balkonsanierung-heading" className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                        Balkon sanieren:{' '}
                        <span className="text-ceramic-gradient">vom undichten Altbelag zur dauerhaften Lösung</span>
                    </h1>
                    <p className="text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
                        Ausblühungen, Frostschäden und lose Fliesen sind fast immer Symptome eines Wasserproblems. Eine neue Fliese
                        darüber hilft nicht – dauerhaft wird es erst, wenn Gefälle, Abdichtung und Randabschluss stimmen.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
                        <Link href="/kontakt" className="btn-primary px-7 py-3.5 text-xs group">
                            Balkon begutachten lassen
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <Link href="/leistungen/aussen" className="btn-ghost px-7 py-3.5 text-xs">
                            Leistung Außenbereiche
                        </Link>
                    </div>
                </div>
            </section>

            {/* Damage patterns */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10" aria-labelledby="balkon-schaden-heading">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="eyebrow mb-4">Schadensbilder</span>
                    <h2 id="balkon-schaden-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        Woran Sie einen sanierungsbedürftigen Balkon erkennen
                    </h2>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {DAMAGE.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li
                                key={item.title}
                                className="group glass-surface p-7 rounded-tile-lg hover:-translate-y-0.5 hover:border-orange-500/80 hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.14)] transition-all duration-300"
                            >
                                <span className="icon-chip w-12 h-12 mb-5">
                                    <Icon className="w-6 h-6" />
                                </span>
                                <h3 className="font-black text-base text-slate-900 mb-2 group-hover:text-orange-950 transition-colors">{item.title}</h3>
                                <p className="text-sm text-slate-700 leading-relaxed">{item.desc}</p>
                            </li>
                        );
                    })}
                </ul>
            </section>

            {/* Causes */}
            <section className="py-20 bg-white border-y border-slate-200 relative z-10" aria-labelledby="balkon-ursachen-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="eyebrow mb-4">Ursachen</span>
                        <h2 id="balkon-ursachen-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Drei Fehler stecken hinter fast jedem Schaden
                        </h2>
                    </div>
                    <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {CAUSES.map((cause, index) => (
                            <li key={cause.title} className="p-8 rounded-tile-lg bg-slate-50 border border-slate-200">
                                <span className="font-display block text-4xl font-black tabular-nums text-orange-600/30 mb-3" aria-hidden="true">
                                    {index + 1}
                                </span>
                                <h3 className="text-lg font-black text-slate-900 mb-2">{cause.title}</h3>
                                <p className="text-sm text-slate-700 leading-relaxed">{cause.text}</p>
                            </li>
                        ))}
                    </ol>
                    <p className="mt-8 max-w-3xl mx-auto text-center text-sm text-slate-700 leading-relaxed">
                        Welche Ursache bei Ihrem Balkon vorliegt, klären wir vor Ort. Wie wir dabei vorgehen, beschreibt die Seite{' '}
                        <Link href="/schadensanalyse" className="font-bold text-orange-800 hover:text-orange-700 hover:underline underline-offset-2">
                            Schadensanalyse
                        </Link>
                        .
                    </p>
                </div>
            </section>

            {/* Process */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10" aria-labelledby="balkon-ablauf-heading">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="eyebrow mb-4">Ablauf</span>
                    <h2 id="balkon-ablauf-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        In vier Schritten zum{' '}
                        <span className="text-ceramic-gradient">sanierten Balkon</span>
                    </h2>
                </div>
                <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {STEPS.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li key={item.step} className="group relative glass-surface rounded-tile-lg p-7 hover:-translate-y-0.5 hover:border-orange-500/80 transition-all duration-300">
                                <div className="flex items-center justify-between mb-5">
                                    <span className="icon-chip w-11 h-11">
                                        <Icon className="w-5 h-5" />
                                    </span>
                                    <span className="font-display text-3xl font-black tabular-nums text-orange-600/25" aria-hidden="true">
                                        {item.step}
                                    </span>
                                </div>
                                <h3 className="font-black text-base text-slate-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-slate-700 leading-relaxed">{item.text}</p>
                            </li>
                        );
                    })}
                </ol>
                <p className="mt-8 max-w-3xl mx-auto text-center text-sm text-slate-700 leading-relaxed">
                    Welcher Belagsaufbau im vierten Schritt passt, vergleichen wir im{' '}
                    <Link href="/balkon-terrasse" className="font-bold text-orange-800 hover:text-orange-700 hover:underline underline-offset-2">
                        Ratgeber Balkon &amp; Terrasse
                    </Link>
                    .
                </p>
            </section>

            {/* Technical detail sections */}
            <section className="py-20 bg-white border-y border-slate-200 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <article className="rounded-tile-lg bg-slate-50 border border-slate-200 p-7" aria-labelledby="balkon-gefaelle-heading">
                        <span className="icon-chip w-11 h-11 mb-4">
                            <ArrowDownRight className="w-5 h-5" />
                        </span>
                        <h2 id="balkon-gefaelle-heading" className="text-xl font-black text-slate-900 mb-4">
                            Gefälle vom Gebäude weg und Entwässerung
                        </h2>
                        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                            <p>
                                Als Richtwert planen wir ein Gefälle von 1,5 bis 2 % vom Gebäude weg – also 1,5 bis 2 cm Höhenunterschied
                                pro Meter. Es gehört in die Abdichtungsebene, damit auch Wasser, das durch den Belag dringt, sicher
                                abläuft.
                            </p>
                            <p>
                                Am Tiefpunkt nimmt eine Rinne, ein Speier oder ein Ablauf das Wasser auf. Bei umschlossenen Balkonen und
                                Loggien gehört ein Notüberlauf dazu, damit bei verstopftem Ablauf kein Wasser zur Tür läuft.
                            </p>
                        </div>
                    </article>

                    <article className="rounded-tile-lg bg-slate-50 border border-slate-200 p-7" aria-labelledby="balkon-abdichtung-heading">
                        <span className="icon-chip w-11 h-11 mb-4">
                            <ShieldCheck className="w-5 h-5" />
                        </span>
                        <h2 id="balkon-abdichtung-heading" className="text-xl font-black text-slate-900 mb-4">
                            Abdichtung und Anschlüsse an Wand und Brüstung
                        </h2>
                        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                            <p>
                                Die Fläche allein dicht zu bekommen ist selten das Problem – undicht werden Balkone an den Rändern. Die
                                Abdichtung wird deshalb an Hauswand und Brüstung ausreichend hoch über die Belagsoberfläche geführt und
                                an Geländerpfosten, Abläufen und anderen Durchdringungen mit passenden Manschetten eingebunden.
                            </p>
                            <p>
                                Maßgeblich sind DIN 18531-5 für Balkone, Loggien und Laubengänge sowie die Fachregeln des
                                Fliesenhandwerks für Außenbeläge. Welche Lösung im Einzelfall gilt, hängt vom Aufbau ab.
                            </p>
                            <p>
                                Der Anschluss an die Balkontür ist ein eigenes Thema: Mehr dazu im Beitrag{' '}
                                <Link href="/blog/barrierefreier-balkonaustritt" className="font-bold text-orange-800 hover:text-orange-700 hover:underline underline-offset-2">
                                    Barrierefreier Balkonaustritt
                                </Link>
                                .
                            </p>
                        </div>
                    </article>

                    <article className="rounded-tile-lg bg-slate-50 border border-slate-200 p-7" aria-labelledby="balkon-rand-heading">
                        <span className="icon-chip w-11 h-11 mb-4">
                            <Droplets className="w-5 h-5" />
                        </span>
                        <h2 id="balkon-rand-heading" className="text-xl font-black text-slate-900 mb-4">
                            Randabschluss und Tropfkante
                        </h2>
                        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                            <p>
                                An der freien Balkonkante muss das Wasser abtropfen, statt an der Stirnseite herunterzulaufen. Sonst
                                entstehen Kalkfahnen, Schmutzstreifen und Frostschäden an der Plattenkante und am Beton darunter.
                            </p>
                            <p>
                                Ein Randprofil mit Tropfkante, zum Beispiel aus pulverbeschichtetem Aluminium, wird fest mit der
                                Abdichtung verbunden und schließt den Belag sauber ab. Bei Stelzlagern übernimmt eine Randblende diese
                                Aufgabe und hält die Lager unsichtbar.
                            </p>
                        </div>
                    </article>
                </div>
            </section>

            {/* Honest scope note + CTA */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 relative z-10" aria-labelledby="balkonsanierung-cta-heading">
                <div className="mb-10 flex gap-3 rounded-tile-md bg-orange-50 border border-orange-200 p-5 text-sm text-slate-700 leading-relaxed">
                    <Info className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" aria-hidden="true" />
                    <p>
                        <strong className="text-slate-900">Was wir übernehmen – und was nicht:</strong> Rückbau, Gefälle, Abdichtung
                        und Belag sind Fliesenlegerarbeit. Betoninstandsetzung, Bewehrungsschäden und die Statik der Balkonplatte
                        gehören zu spezialisierten Fachplanern und -betrieben, ebenso Arbeiten am Geländer. Wenn wir solche Schäden
                        feststellen, sagen wir es Ihnen vor Beginn.
                    </p>
                </div>

                <div className="ceramic-hero rounded-tile-2xl p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow">Begutachtung vor Ort</span>
                    <h2 id="balkonsanierung-cta-heading" className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight">
                        Schicken Sie uns Fotos Ihres Balkons
                    </h2>
                    <p className="text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
                        Aufnahmen von Fläche, Kante, Unterseite und Türanschluss helfen bei der ersten Einschätzung. Den Aufbau prüft{' '}
                        {COMPANY_DATA.owner.fullName} anschließend beim Aufmaß vor Ort.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
                        <Link href="/kontakt" className="btn-primary px-7 py-3.5 text-xs group">
                            Balkonsanierung anfragen
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className="btn-ghost px-7 py-3.5 text-xs">
                            <Phone className="w-4 h-4 text-orange-700" />
                            {COMPANY_DATA.contact.phone}
                        </a>
                        <a
                            href={COMPANY_DATA.contact.whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass-button-whatsapp px-7 py-3.5 text-xs"
                        >
                            <MessageCircle className="w-4 h-4" />
                            Fotos per WhatsApp senden
                        </a>
                    </div>
                </div>

                <nav className="mt-10 glass-surface rounded-tile-xl p-7" aria-labelledby="balkonsanierung-ratgeber-heading">
                    <h2 id="balkonsanierung-ratgeber-heading" className="flex items-center gap-2 font-black text-base text-slate-900 mb-4">
                        <BookOpen className="w-5 h-5 text-orange-600" aria-hidden="true" />
                        Weiterführende Ratgeber zur Balkonsanierung
                    </h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {FURTHER_READING.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="inline-flex items-center gap-1.5 text-sm font-bold text-orange-800 hover:text-orange-700 hover:underline underline-offset-2"
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
