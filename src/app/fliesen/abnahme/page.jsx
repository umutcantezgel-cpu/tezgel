import React from 'react';
import Link from 'next/link';
import {
    ClipboardCheck,
    ArrowRight,
    Phone,
    Ruler,
    Grid,
    Ear,
    Droplets,
    FileText,
    Users,
    Printer
} from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import { createMetadata } from '@/lib/metadata';
import QualityPromise from '@/components/sections/QualityPromise';

export const metadata = createMetadata({
    title: 'Fliesenarbeiten abnehmen: Checkliste & Toleranzen',
    description:
        'Worauf Sie bei der Abnahme von Fliesenarbeiten achten: Ebenheit, Winkel, Überzähne, Fugenbild, Hohlstellen, Silikonfugen und Unterlagen – mit Checkliste.',
    path: '/fliesen/abnahme'
});

const CHECKPOINTS = [
    {
        icon: Ruler,
        title: 'Ebenheit & Winkel',
        desc: 'Mit Richtscheit und Messkeil wird geprüft, ob Boden und Wand innerhalb der vereinbarten Toleranzen liegen. Maßstab ist in der Regel DIN 18202.'
    },
    {
        icon: Grid,
        title: 'Überzähne & Fugenbild',
        desc: 'Stehen benachbarte Fliesenkanten spürbar über? Sind Fugen gleichmäßig breit, geradlinig und vollständig gefüllt? Laufen die Achsen wie geplant?'
    },
    {
        icon: Ear,
        title: 'Hohlstellen',
        desc: 'Die Klopfprobe gibt Hinweise auf nicht vollflächig gebettete Fliesen. Ein hohler Klang allein ist aber noch kein Urteil – es kommt auf Lage, Größe und Beanspruchung an.'
    },
    {
        icon: Droplets,
        title: 'Anschlüsse & Silikon',
        desc: 'Elastische Fugen an Wanne, Dusche, Wandanschlüssen und Übergängen müssen an beiden Flanken haften, glatt abgezogen und frei von Fehlstellen sein.'
    },
    {
        icon: FileText,
        title: 'Unterlagen & Restmaterial',
        desc: 'Pflegehinweise, Angaben zu verwendetem Kleber, Fugenmörtel und Silikon sowie einige Restfliesen für spätere Reparaturen gehören zur Übergabe.'
    }
];

const TOLERANCES = [
    { row: 'Zeile 3', area: 'Flächenfertige Böden, z. B. Fliesenbeläge', v01: '2', v1: '4', v4: '10' },
    { row: 'Zeile 4', area: 'wie Zeile 3, mit erhöhten Anforderungen', v01: '1', v1: '3', v4: '9' },
    { row: 'Zeile 6', area: 'Flächenfertige Wände, z. B. Wandbekleidungen', v01: '3', v1: '5', v4: '10' },
    { row: 'Zeile 7', area: 'wie Zeile 6, mit erhöhten Anforderungen', v01: '2', v1: '3', v4: '8' }
];

const CHECKLIST = [
    {
        group: 'Fläche & Geometrie',
        items: [
            'Boden mit Richtscheit an mehreren Stellen geprüft, keine auffälligen Mulden oder Buckel',
            'Wandflächen lotrecht, Ecken und Kanten im Winkel',
            'Keine störenden Überzähne zwischen benachbarten Fliesen',
            'Zuschnitte an Rändern, Türen und Aussparungen sauber und wie besprochen verteilt'
        ]
    },
    {
        group: 'Fugen',
        items: [
            'Fugenbreite gleichmäßig, Fugen vollständig gefüllt und ohne Löcher',
            'Fugenfarbe entspricht der Bemusterung',
            'Bewegungs- und Randfugen an den geplanten Stellen ausgebildet',
            'Silikonfugen an beiden Flanken haftend, glatt, ohne Blasen'
        ]
    },
    {
        group: 'Details',
        items: [
            'Klopfprobe stichprobenartig durchgeführt, Auffälligkeiten gemeinsam bewertet',
            'Profile, Sockel und Gehrungskanten sauber gestoßen',
            'Abläufe, Rinnen und Rohrdurchführungen sauber eingefasst',
            'Keine Kleber- oder Fugenmörtelreste auf der Oberfläche'
        ]
    },
    {
        group: 'Übergabe',
        items: [
            'Pflegehinweise für Fliesen, Fugen und ggf. Naturstein erhalten',
            'Materialangaben notiert: Fliese (Serie, Farbe, Charge), Kleber, Fugenmörtel, Silikon',
            'Restfliesen für spätere Reparaturen übergeben',
            'Offene Punkte schriftlich festgehalten, Termin zur Erledigung vereinbart'
        ]
    }
];

const CROSS_LINKS = [
    { href: '/unternehmen', label: 'Über unseren Betrieb', desc: 'Fachbetrieb aus Aßlar' },
    { href: '/fliesen/verlegetechnik', label: 'Verlegetechnik & Werkstoffe', desc: 'Kleber, Bettung und Fugenmörtel' },
    { href: '/fliesen/fugensanierung', label: 'Fugensanierung', desc: 'Silikon- und Zementfugen erneuern' },
    { href: '/faq', label: 'Häufige Fragen', desc: 'Antworten rund um Fliesenarbeiten' }
];

export default function AbnahmePage() {
    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            <div className="ambient-glow-orange -top-32 -left-32 opacity-70" />
            <div className="ambient-glow-warm top-96 -right-24 opacity-60" />

            {/* Hero */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10" aria-labelledby="abnahme-heading">
                <div className="ceramic-hero rounded-tile-2xl p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow">
                        <ClipboardCheck className="w-3.5 h-3.5" />
                        Abnahme &middot; DIN 18202
                    </span>
                    <h1 id="abnahme-heading" className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                        Abnahme von Fliesenarbeiten:{' '}
                        <span className="text-ceramic-gradient">Qualität erkennen und prüfen</span>
                    </h1>
                    <p className="text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
                        Gute Fliesenarbeit erkennt man nicht nur am ersten Eindruck. Diese Seite zeigt Ihnen, worauf Sie bei der
                        Abnahme achten können, welche Toleranzen als Orientierung dienen und welche Unterlagen Sie bei der
                        Übergabe erhalten sollten – inklusive Checkliste zum Ausdrucken.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
                        <Link href="/kontakt" className="btn-primary px-7 py-3.5 text-xs group">
                            Projekt besprechen
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <a href="#checkliste" className="btn-ghost px-7 py-3.5 text-xs">
                            <Printer className="w-4 h-4 text-slate-700" />
                            Zur Checkliste
                        </a>
                    </div>
                </div>
            </section>

            {/* Warum gemeinsam */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10" aria-labelledby="gemeinsam-heading">
                <div className="glass-surface rounded-tile-xl p-8 sm:p-10 flex flex-col sm:flex-row gap-6 items-start">
                    <span className="icon-chip w-12 h-12 shrink-0">
                        <Users className="w-6 h-6" />
                    </span>
                    <div>
                        <h2 id="gemeinsam-heading" className="text-2xl font-black text-slate-900 mb-3">Warum eine gemeinsame Abnahme sinnvoll ist</h2>
                        <p className="text-base text-slate-700 leading-relaxed">
                            Bei einer gemeinsamen Begehung sehen Sie die Flächen mit dem Handwerker zusammen an, klären Fragen
                            direkt am Objekt und halten offene Punkte fest. Das schafft Klarheit für beide Seiten. Bei
                            Fliesenverlegung Tezgel schließt {COMPANY_DATA.owner.fullName} Projekte persönlich mit einer
                            gemeinsamen Abnahme ab. Rechtliche Fragen zu Abnahme und Gewährleistung beantwortet im Zweifel eine
                            fachkundige Rechtsberatung – diese Seite ist eine technische Orientierung.
                        </p>
                    </div>
                </div>
            </section>

            {/* 5 Prüfpunkte */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10" aria-labelledby="pruefpunkte-heading">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="eyebrow eyebrow-orange mb-4">Prüfpunkte</span>
                    <h2 id="pruefpunkte-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        Fünf Punkte, die bei jeder Abnahme dazugehören
                    </h2>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
                    {CHECKPOINTS.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li
                                key={item.title}
                                className="group glass-surface p-6 rounded-tile-lg hover:-translate-y-0.5 hover:border-orange-500/80 hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.14)] transition-all duration-300"
                            >
                                <span className="icon-chip w-11 h-11 mb-4">
                                    <Icon className="w-5 h-5" />
                                </span>
                                <h3 className="font-black text-base text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">{item.title}</h3>
                                <p className="text-sm text-slate-700 leading-relaxed">{item.desc}</p>
                            </li>
                        );
                    })}
                </ul>
            </section>

            {/* Toleranzen */}
            <section className="py-20 bg-white border-y border-slate-200 relative z-10" aria-labelledby="toleranzen-heading">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-10">
                        <span className="eyebrow mb-4">
                            <Ruler className="w-3.5 h-3.5" />
                            Toleranzen
                        </span>
                        <h2 id="toleranzen-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Ebenheit und Winkel: Toleranzen nach DIN 18202 für Boden und Wand
                        </h2>
                        <p className="mt-3 text-base text-slate-700 leading-relaxed">
                            DIN 18202 legt Grenzwerte für Ebenheitsabweichungen als sogenannte Stichmaße fest: Ein Richtscheit
                            wird auf zwei Hochpunkte gelegt, gemessen wird der Abstand zur Fläche dazwischen. Je größer der
                            Abstand der Auflagepunkte, desto größer die zulässige Abweichung. Winkeltoleranzen regelt Tabelle 2
                            der Norm.
                        </p>
                    </div>
                    <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white">
                        <table className="w-full min-w-[620px] text-left text-sm">
                            <caption className="sr-only">Grenzwerte für Ebenheitsabweichungen nach DIN 18202, Tabelle 3 (Auszug)</caption>
                            <thead className="bg-slate-100 text-slate-900">
                                <tr>
                                    <th scope="col" className="p-4 font-black border-b border-slate-200">Tabelle 3</th>
                                    <th scope="col" className="p-4 font-black border-b border-slate-200">Bezug</th>
                                    <th scope="col" className="p-4 font-black border-b border-slate-200 text-right">0,1 m</th>
                                    <th scope="col" className="p-4 font-black border-b border-slate-200 text-right">1 m</th>
                                    <th scope="col" className="p-4 font-black border-b border-slate-200 text-right">4 m</th>
                                </tr>
                            </thead>
                            <tbody>
                                {TOLERANCES.map((row) => (
                                    <tr key={row.row} className="border-b border-slate-200 last:border-b-0">
                                        <th scope="row" className="p-4 font-bold text-slate-900">{row.row}</th>
                                        <td className="p-4 text-slate-700">{row.area}</td>
                                        <td className="p-4 text-slate-900 text-right tabular-nums">{row.v01} mm</td>
                                        <td className="p-4 text-slate-900 text-right tabular-nums">{row.v1} mm</td>
                                        <td className="p-4 text-slate-900 text-right tabular-nums">{row.v4} mm</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                        Stichmaße als Grenzwerte bei den genannten Messpunktabständen, Auszug nach DIN 18202:2019-07. Die Werte
                        dienen der Orientierung. Erhöhte Anforderungen (Zeilen 4 und 7) gelten nur, wenn sie ausdrücklich
                        vereinbart wurden – etwa bei Großformaten. Maßgeblich ist immer der konkrete Vertrag.
                    </p>
                </div>
            </section>

            {/* Überzähne, Hohlstellen, Silikon, Unterlagen */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <article className="glass-surface rounded-[2rem] p-8" aria-labelledby="ueberzaehne-heading">
                        <h2 id="ueberzaehne-heading" className="text-xl sm:text-2xl font-black text-slate-900 mb-3">Überzähne, Fugenbreite und Fugenbild</h2>
                        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                            Beurteilt wird aus der normalen Gebrauchsperspektive und bei üblicher Beleuchtung – nicht mit der
                            Taschenlampe im Streiflicht, das jede Kante überzeichnet. Kalibrierte und rektifizierte Fliesen
                            ermöglichen schmalere und gleichmäßigere Fugen als Fliesen mit größeren Maßtoleranzen. Wichtig ist,
                            dass das Fugenbild dem entspricht, was vorher vereinbart wurde.
                        </p>
                    </article>
                    <article className="glass-surface rounded-[2rem] p-8" aria-labelledby="hohlstellen-heading">
                        <h2 id="hohlstellen-heading" className="text-xl sm:text-2xl font-black text-slate-900 mb-3">Hohlstellen: die Klopfprobe richtig einordnen</h2>
                        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                            Ein Kugelkopf- oder Klopfhammer macht nicht vollflächig gebettete Bereiche hörbar. Einzelne,
                            kleinflächige Hohlstellen – etwa an einer Fliesenecke – sind nicht automatisch ein Mangel. Kritischer
                            sind größere Hohllagen an stark belasteten Stellen, in Nassbereichen und im Außenbereich. Die
                            Bewertung hängt immer vom Einzelfall ab.
                        </p>
                    </article>
                    <article className="glass-surface rounded-tile-xl p-8" aria-labelledby="anschluesse-heading">
                        <h2 id="anschluesse-heading" className="text-xl sm:text-2xl font-black text-slate-900 mb-3">Anschlüsse, Silikonfugen und Abdichtungsdetails</h2>
                        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                            Elastische Fugen sind Wartungsfugen: Sie müssen bei der Übergabe einwandfrei sein, werden später aber
                            regelmäßig kontrolliert und bei Bedarf erneuert. Die Abdichtung nach DIN 18534 selbst ist nach dem
                            Fliesen nicht mehr sichtbar – fragen Sie deshalb schon während der Ausführung nach, wie sie
                            dokumentiert wird. Details zur Norm finden Sie unter{' '}
                            <Link href="/untergrund-abdichtung/din-18534" className="font-semibold text-orange-600 hover:text-orange-700 hover:underline underline-offset-2">
                                Abdichtung nach DIN 18534
                            </Link>
                            .
                        </p>
                    </article>
                    <article className="glass-surface rounded-tile-xl p-8" aria-labelledby="unterlagen-heading">
                        <h2 id="unterlagen-heading" className="text-xl sm:text-2xl font-black text-slate-900 mb-3">Unterlagen: Pflegehinweise, Restfliesen, Materialliste</h2>
                        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                            Notieren Sie sich Serie, Farbe und Chargennummer der Fliesen sowie die Bezeichnungen von Kleber,
                            Fugenmörtel und Silikon. Mit einigen Restfliesen aus derselben Charge lassen sich spätere Schäden
                            passend reparieren. Pflegehinweise helfen, Fugen und Oberflächen richtig zu behandeln –
                            Grundlagen dazu im Ratgeber{' '}
                            <Link href="/blog/fliesen-reinigen-pflegen" className="font-semibold text-orange-600 hover:text-orange-700 hover:underline underline-offset-2">
                                Fliesen reinigen und pflegen
                            </Link>
                            .
                        </p>
                    </article>
                </div>
            </section>

            {/* Checkliste */}
            <section id="checkliste" className="py-20 bg-white border-y border-slate-200 relative z-10 scroll-mt-28" aria-labelledby="checkliste-heading">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-10">
                        <span className="eyebrow eyebrow-orange mb-4">
                            <Printer className="w-3.5 h-3.5" />
                            Zum Ausdrucken
                        </span>
                        <h2 id="checkliste-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Checkliste zum Ausdrucken
                        </h2>
                        <p className="mt-3 text-base text-slate-700 leading-relaxed">
                            Drucken Sie diese Seite über die Druckfunktion Ihres Browsers aus und nehmen Sie die Liste zur
                            Abnahme mit.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {CHECKLIST.map((block) => (
                            <div key={block.group} className="rounded-tile-lg bg-slate-50 border border-slate-200 p-6 break-inside-avoid">
                                <h3 className="font-black text-slate-900 mb-4">{block.group}</h3>
                                <ul className="space-y-3">
                                    {block.items.map((item) => (
                                        <li key={item} className="flex gap-3 text-sm text-slate-700 leading-relaxed">
                                            <span className="mt-0.5 w-4 h-4 shrink-0 rounded border-2 border-orange-600 bg-white" aria-hidden="true" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Konfigurator-CTA + Weiterführende Ratgeber */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-6 relative z-10" aria-labelledby="ratgeber-heading">
                <div className="ceramic-hero rounded-tile-xl p-8 sm:p-10 mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900">Neues Fliesenprojekt geplant?</h2>
                        <p className="mt-2 text-base text-slate-700 max-w-2xl">
                            Mit dem Fliesen-Konfigurator bereiten Sie Raum, Untergrund, Format und Fläche in vier Schritten vor.
                            Das verbindliche Festpreisangebot folgt nach dem kostenfreien Aufmaß vor Ort.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Link href="/fliesen/konfigurator" className="btn-primary px-7 py-3.5 text-xs">
                            Zum Konfigurator
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className="btn-ghost px-7 py-3.5 text-xs">
                            <Phone className="w-4 h-4 text-slate-700" />
                            {COMPANY_DATA.contact.phone}
                        </a>
                    </div>
                </div>

                <h2 id="ratgeber-heading" className="text-xl font-black text-slate-900 mb-5">Weiterführende Ratgeber zur Fliesenverlegung &amp; Bauabnahme</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {CROSS_LINKS.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className="group block h-full glass-surface rounded-tile-md p-5 hover:-translate-y-0.5 hover:border-orange-500/80 transition-all duration-300"
                            >
                                <span className="flex items-center justify-between gap-2 font-black text-slate-900 group-hover:text-orange-600 transition-colors">
                                    {link.label}
                                    <ArrowRight className="w-4 h-4 shrink-0 text-orange-600" />
                                </span>
                                <span className="mt-1 block text-sm text-slate-600">{link.desc}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>

            <QualityPromise />
        </div>
    );
}
