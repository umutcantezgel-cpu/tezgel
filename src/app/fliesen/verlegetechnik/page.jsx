import React from 'react';
import Link from 'next/link';
import {
    Layers,
    ArrowRight,
    Phone,
    Gauge,
    Blend,
    Brush,
    Droplets,
    Split,
    Hammer,
    CheckCircle2
} from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import { createMetadata } from '@/lib/metadata';
import QualityPromise from '@/components/sections/QualityPromise';
import FliesenKonfigurator from '@/components/funnels/FliesenKonfigurator';

export const metadata = createMetadata({
    title: 'Fliesen verlegen: Dünnbett, Kleber & Fugenmörtel',
    description:
        'Dünnbett nach DIN 18157, Mittelbett oder Dickbett? Kleberklassen C1, C2, S1, S2 und Fugenmörtel CG2 oder Reaktionsharz erklärt – so entstehen dauerhafte Beläge.',
    path: '/fliesen/verlegetechnik'
});

const METHODS = [
    {
        title: 'Dünnbettverfahren',
        norm: 'DIN 18157',
        desc: 'Der Standard für ebene Untergründe: Der Kleber wird mit der Zahnkelle aufgekämmt, die Fliese eingeschoben und angedrückt. Das Kleberbett ist nur wenige Millimeter dick – deshalb muss der Untergrund vorher eben genug sein.'
    },
    {
        title: 'Mittelbettverfahren',
        norm: 'Mittelbettmörtel',
        desc: 'Ein dickeres, standfestes Kleberbett gleicht Maßtoleranzen der Fliesenrückseite und kleinere Unebenheiten aus. Typisch für großformatige Platten, profilierte Rückseiten und nicht kalibrierten Naturstein.'
    },
    {
        title: 'Dickbettverfahren',
        norm: 'Mörtelbett',
        desc: 'Die traditionelle Verlegung in einem mehrere Zentimeter starken Mörtelbett. Heute nur noch für Sonderfälle, etwa Blockstufen auf einem Fundament im Außenbereich oder das Setzen von Werkstücken auf stark unebenem Untergrund.'
    }
];

const ADHESIVE_CLASSES = [
    { code: 'C1', label: 'Zementärer Kleber, normale Haftung', desc: 'Mindesthaftzugfestigkeit nach DIN EN 12004-1 von 0,5 N/mm². Für einfache Anwendungen im Innenbereich.' },
    { code: 'C2', label: 'Zementärer Kleber, erhöhte Haftung', desc: 'Mindesthaftzugfestigkeit von 1,0 N/mm². Standard für Feinsteinzeug, dichte Fliesen, Großformate und Außenbereiche.' },
    { code: 'F', label: 'Schnell erhärtend', desc: 'Früh belastbar und verfugbar – sinnvoll bei knappen Zeitfenstern, verlangt aber zügiges Arbeiten.' },
    { code: 'T', label: 'Reduziertes Abrutschen', desc: 'Standfester Kleber: Wandfliesen rutschen beim Ansetzen nicht ab, auch bei schweren Formaten.' },
    { code: 'E', label: 'Verlängerte offene Zeit', desc: 'Der aufgekämmte Kleber bleibt länger klebefähig – hilfreich bei großen Platten und größeren Flächen.' }
];

const DEFORMABILITY = [
    { code: 'S1', label: 'verformbar', desc: 'Querverformung ab 2,5 mm, geprüft nach DIN EN 12002. Nimmt Spannungen aus Temperaturwechseln und Restschwinden des Estrichs besser auf.' },
    { code: 'S2', label: 'hochverformbar', desc: 'Querverformung ab 5 mm. Für stärker beanspruchte Konstruktionen, zum Beispiel Balkone und Terrassen oder sehr große Formate.' }
];

const GROUT_ROWS = [
    { label: 'Norm & Klasse', cement: 'DIN EN 13888, CG2 WA (erhöhte Anforderungen, reduzierte Wasseraufnahme, hohe Abriebbeständigkeit)', resin: 'DIN EN 13888, RG (Reaktionsharz-Fugenmörtel)' },
    { label: 'Einsatz', cement: 'Wohnräume, Flur, Küche, Bad, Balkon und Terrasse', resin: 'Stark beanspruchte Flächen, Bereiche mit Säure- oder Reinigungsmittelkontakt, Küchenarbeitsbereiche' },
    { label: 'Wasser & Schmutz', cement: 'Wasserabweisend, aber offenporiger; dunkelt bei Dauerfeuchte eher nach', resin: 'Nahezu dicht, sehr fleckunempfindlich' },
    { label: 'Chemikalien', cement: 'Säureempfindlich – saure Reiniger greifen den Zementstein an', resin: 'Hohe Beständigkeit gegen viele Reinigungs- und Lebensmittelsäuren' },
    { label: 'Verarbeitung', cement: 'Bewährt und gut nacharbeitbar', resin: 'Kurze Verarbeitungszeit, Rückstände müssen sofort entfernt werden; bei offenporigen Oberflächen vorher Probefläche anlegen' }
];

const JOINTS = [
    { title: 'Randfugen', desc: 'Trennen den Belag von aufgehenden Wänden, Stützen und Einbauteilen. Beim schwimmenden Estrich bleibt der Randdämmstreifen dafür bis nach dem Verfugen stehen.' },
    { title: 'Bewegungsfugen', desc: 'Fugen im Estrich werden deckungsgleich in den Fliesenbelag übernommen. Große Flächen erhalten zusätzlich Feldbegrenzungsfugen nach Planung.' },
    { title: 'Anschlussfugen', desc: 'Übergänge zu Badewanne, Duschtasse, Türzarge oder anderen Belägen werden elastisch geschlossen – als Wartungsfuge, die regelmäßig kontrolliert wird.' }
];

const CROSS_LINKS = [
    { href: '/leistungen/untergrund', label: 'Untergrundvorbereitung', desc: 'Tragfähig, eben und trocken – die Basis für jeden Kleber' },
    { href: '/fliesen/verlegemuster', label: 'Verlegemuster & Abschlüsse', desc: 'Fugenbild, Verband, Kanten und Sockel' },
    { href: '/bad/fliesen', label: 'Fliesen im Bad', desc: 'Formate, Abdichtung und Details im Nassraum' },
    { href: '/faq', label: 'Häufige Fragen', desc: 'Antworten rund um Fliesenarbeiten' }
];

export default function VerlegetechnikPage() {
    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            <div className="ambient-glow-orange -top-32 -left-32 opacity-70" />
            <div className="ambient-glow-warm top-96 -right-24 opacity-60" />

            {/* Hero */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10" aria-labelledby="verlegetechnik-heading">
                <div className="ceramic-hero rounded-tile-2xl p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow">
                        <Layers className="w-3.5 h-3.5" />
                        DIN 18157 &middot; DIN EN 12004 &middot; DIN EN 13888
                    </span>
                    <h1 id="verlegetechnik-heading" className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                        Verlegetechnik und Werkstoffe:{' '}
                        <span className="text-ceramic-gradient">Kleber, Bettung und Fugenmörtel</span>
                    </h1>
                    <p className="text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
                        Was unter der Fliese passiert, sieht man nach der Verlegung nicht mehr – und doch entscheidet es über
                        Jahrzehnte Haltbarkeit. Hier erfahren Sie, welches Verlegeverfahren wann passt, was die Kürzel auf dem
                        Klebersack bedeuten und welcher Fugenmörtel zu welcher Fläche gehört. So können Sie Angebote
                        fachlich einordnen.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
                        <Link href="/kontakt" className="btn-primary px-7 py-3.5 text-xs group">
                            Aufmaß &amp; Beratung anfragen
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className="btn-ghost px-7 py-3.5 text-xs">
                            <Phone className="w-4 h-4 text-orange-600" />
                            {COMPANY_DATA.contact.phone}
                        </a>
                    </div>
                </div>
            </section>

            {/* Verfahren */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10" aria-labelledby="verfahren-heading">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="eyebrow eyebrow-orange mb-4">Bettung</span>
                    <h2 id="verfahren-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        Dünnbett, Mittelbett, Dickbett: die Verfahren im Überblick
                    </h2>
                    <p className="mt-3 text-base text-slate-700 leading-relaxed">
                        Welches Verfahren passt, hängt vom Untergrund, vom Format und vom Material ab. Im Wohnungsbau ist das
                        Dünnbett heute die Regel – vorausgesetzt, der Untergrund wurde vorher tragfähig und eben vorbereitet.
                    </p>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {METHODS.map((item) => (
                        <li
                            key={item.title}
                            className="group glass-surface p-7 rounded-tile-xl hover:-translate-y-0.5 hover:border-orange-500/80 hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.14)] transition-all duration-300"
                        >
                            <span className="icon-chip w-12 h-12 mb-5">
                                <Layers className="w-6 h-6" />
                            </span>
                            <span className="block text-[11px] font-black uppercase tracking-widest text-orange-600 mb-1">{item.norm}</span>
                            <h3 className="font-black text-lg text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">{item.title}</h3>
                            <p className="text-sm text-slate-700 leading-relaxed">{item.desc}</p>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Kleberklassen */}
            <section className="py-20 bg-white border-y border-slate-200 relative z-10" aria-labelledby="kleber-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="eyebrow mb-4">Fliesenkleber</span>
                        <h2 id="kleber-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Fliesenkleber nach DIN EN 12004: C1, C2, F, T, E
                        </h2>
                        <p className="mt-3 text-base text-slate-700 leading-relaxed">
                            Die Norm teilt Kleber nach ihrer Basis ein – C für zementär, D für Dispersion, R für Reaktionsharz –
                            und ergänzt Leistungsmerkmale. Eine Bezeichnung wie „C2 TE S1“ lässt sich damit Buchstabe für
                            Buchstabe lesen.
                        </p>
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
                        {ADHESIVE_CLASSES.map((item) => (
                            <li key={item.code} className="p-6 rounded-tile-xl bg-slate-50 border border-slate-200">
                                <span className="font-display block text-4xl font-black tabular-nums text-orange-500/40 mb-3" aria-hidden="true">
                                    {item.code}
                                </span>
                                <h3 className="text-sm font-black text-slate-900 mb-2">
                                    <span className="sr-only">{item.code}: </span>
                                    {item.label}
                                </h3>
                                <p className="text-sm text-slate-700 leading-relaxed">{item.desc}</p>
                            </li>
                        ))}
                    </ul>

                    {/* S1 / S2 */}
                    <div className="mt-16 grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                        <div className="lg:col-span-2">
                            <span className="eyebrow eyebrow-orange mb-4">Verformbarkeit</span>
                            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                                S1 und S2: wann flexibler Kleber nötig ist
                            </h3>
                            <p className="mt-3 text-base text-slate-700 leading-relaxed">
                                Fliesen, Kleber und Untergrund dehnen sich bei Temperaturwechseln unterschiedlich. Ein verformbarer
                                Kleber baut diese Spannungen ab, bevor sie zu Rissen oder Hohlstellen führen. Wir setzen
                                grundsätzlich flexible Kleber der Klasse C2 TE S1 oder S2 ein und wählen die Stufe passend zu
                                Untergrund, Format und Beanspruchung.
                            </p>
                        </div>
                        <ul className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {DEFORMABILITY.map((item) => (
                                <li key={item.code} className="glass-surface rounded-tile-xl p-6">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="icon-chip w-11 h-11">
                                            <Gauge className="w-5 h-5" />
                                        </span>
                                        <h4 className="font-black text-slate-900">
                                             {item.code} <span className="font-semibold text-slate-600">– {item.label}</span>
                                        </h4>
                                    </div>
                                    <p className="text-sm text-slate-700 leading-relaxed">{item.desc}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Grundierung */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10" aria-labelledby="grundierung-heading">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <article className="glass-surface rounded-tile-xl p-8">
                        <span className="icon-chip w-12 h-12 mb-5">
                            <Brush className="w-6 h-6" />
                        </span>
                        <h2 id="grundierung-heading" className="text-2xl font-black text-slate-900 mb-3">
                            Grundierung und Haftbrücke: die unsichtbare Schicht
                        </h2>
                        <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-4">
                            Die Grundierung wird oft unterschätzt. Sie reguliert die Saugfähigkeit des Untergrunds, bindet
                            Reststaub und sorgt dafür, dass der Kleber nicht zu schnell Wasser verliert.
                        </p>
                        <ul className="space-y-2.5 text-sm text-slate-700">
                            <li className="flex gap-2.5"><CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />Saugende Untergründe wie Zementestrich, Putz oder Gipskarton: Tiefengrund bzw. Grundierung nach Herstellerangabe.</li>
                            <li className="flex gap-2.5"><CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />Calciumsulfatestrich: wird angeschliffen, abgesaugt und grundiert, damit der zementäre Kleber keine schädlichen Reaktionen mit dem Gips eingeht.</li>
                            <li className="flex gap-2.5"><CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />Dichte, glatte Flächen wie alte Fliesen: gereinigt und mit einer Haftbrücke vorbereitet.</li>
                        </ul>
                        <Link href="/untergrund-abdichtung" className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-orange-600 hover:text-orange-700">
                            Mehr zu Untergrund &amp; Abdichtung
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </article>

                    <article className="glass-surface rounded-tile-xl p-8">
                        <span className="icon-chip w-12 h-12 mb-5">
                            <Hammer className="w-6 h-6" />
                        </span>
                        <h2 className="text-2xl font-black text-slate-900 mb-3">Hohlstellen vermeiden: vollflächige Bettung</h2>
                        <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-4">
                            Bodenfliesen, Großformate, Nassbereiche und Außenflächen müssen möglichst hohlraumarm im Kleber
                            liegen. Hohlräume unter der Fliese sind Schwachstellen: Bei Punktlast kann die Kante brechen, im
                            Außenbereich sammelt sich Wasser und friert.
                        </p>
                        <ul className="space-y-2.5 text-sm text-slate-700">
                            <li className="flex gap-2.5"><CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />Zahnung der Kelle passend zu Format und Rückseite wählen.</li>
                            <li className="flex gap-2.5"><CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />Kombiniertes Verfahren (Buttering-Floating): Kleber auf Untergrund und Fliesenrückseite.</li>
                            <li className="flex gap-2.5"><CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />Fliese einschieben statt nur aufdrücken, damit die Kleberstege zusammenfließen.</li>
                            <li className="flex gap-2.5"><CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />Stichprobenartig eine frisch verlegte Fliese abheben und die Benetzung kontrollieren.</li>
                        </ul>
                        <Link href="/fliesen/grossformat" className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-orange-600 hover:text-orange-700">
                            Großformate richtig verlegen
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </article>
                </div>
            </section>

            {/* Fugenmörtel */}
            <section className="py-20 bg-white border-y border-slate-200 relative z-10" aria-labelledby="fuge-heading">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-10">
                        <span className="eyebrow mb-4">
                            <Droplets className="w-3.5 h-3.5" />
                            Fugenmörtel
                        </span>
                        <h2 id="fuge-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Fugenmörtel nach DIN EN 13888: zementär oder Reaktionsharz
                        </h2>
                        <p className="mt-3 text-base text-slate-700 leading-relaxed">
                            Für die meisten Wohnflächen ist ein hochwertiger zementärer Fugenmörtel die richtige Wahl.
                            Reaktionsharz spielt seine Stärken dort aus, wo Säuren, Fett oder intensive Reinigung auf die Fuge
                            treffen. Farbe, Breite und Fugenbild behandeln wir auf der Seite{' '}
                            <Link href="/fliesen/verlegemuster" className="font-semibold text-orange-600 hover:text-orange-700 hover:underline underline-offset-2">
                                Verlegemuster &amp; Abschlüsse
                            </Link>
                            .
                        </p>
                    </div>
                    <div className="overflow-x-auto rounded-tile-xl border border-slate-200 bg-white">
                        <table className="w-full min-w-[640px] text-left text-sm">
                            <caption className="sr-only">Vergleich zementärer Fugenmörtel und Reaktionsharz-Fugenmörtel</caption>
                            <thead className="bg-slate-100 text-slate-900">
                                <tr>
                                    <th scope="col" className="p-4 font-black border-b border-slate-200">Kriterium</th>
                                    <th scope="col" className="p-4 font-black border-b border-slate-200">Zementär (CG2)</th>
                                    <th scope="col" className="p-4 font-black border-b border-slate-200">Reaktionsharz (RG)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {GROUT_ROWS.map((row) => (
                                    <tr key={row.label} className="border-b border-slate-200 last:border-b-0">
                                        <th scope="row" className="p-4 font-bold text-slate-900 align-top">{row.label}</th>
                                        <td className="p-4 text-slate-700 align-top">{row.cement}</td>
                                        <td className="p-4 text-slate-700 align-top">{row.resin}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Bewegungsfugen */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10" aria-labelledby="bewegungsfugen-heading">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="eyebrow eyebrow-orange mb-4">
                        <Split className="w-3.5 h-3.5" />
                        Fugenplanung
                    </span>
                    <h2 id="bewegungsfugen-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        Bewegungs-, Rand- und Anschlussfugen
                    </h2>
                    <p className="mt-3 text-base text-slate-700 leading-relaxed">
                        Ein Fliesenbelag ist starr, das Gebäude arbeitet. Fugen an den richtigen Stellen verhindern, dass sich
                        diese Bewegungen als Risse oder abgelöste Fliesen zeigen.
                    </p>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {JOINTS.map((item) => (
                        <li
                            key={item.title}
                            className="group glass-surface p-7 rounded-tile-xl hover:-translate-y-0.5 hover:border-orange-500/80 transition-all duration-300"
                        >
                            <span className="icon-chip w-11 h-11 mb-4">
                                <Blend className="w-5 h-5" />
                            </span>
                            <h3 className="font-black text-base text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">{item.title}</h3>
                            <p className="text-sm text-slate-700 leading-relaxed">{item.desc}</p>
                        </li>
                    ))}
                </ul>
                <p className="mt-6 text-sm text-slate-600 text-center max-w-3xl mx-auto">
                    Wie elastische Fugen im Bestand erneuert werden, erklären wir auf der Seite{' '}
                    <Link href="/fliesen/fugensanierung" className="font-semibold text-orange-600 hover:text-orange-700 hover:underline underline-offset-2">
                        Fugensanierung
                    </Link>
                    .
                </p>
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
            </section>

            <QualityPromise />

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10" aria-label="Fliesen-Konfigurator">
                <FliesenKonfigurator />
            </section>
        </div>
    );
}
