import React from 'react';
import Link from 'next/link';
import {
    ArrowRight,
    CheckCircle2,
    Droplets,
    MessageCircle,
    Phone,
    Ruler,
    ShieldCheck,
    Snowflake,
    Sparkles,
    Thermometer,
    Trees
} from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import { createMetadata } from '@/lib/metadata';
import FliesenKonfigurator from '@/components/funnels/FliesenKonfigurator';
import QualityPromise from '@/components/sections/QualityPromise';

export const metadata = createMetadata({
    title: 'Fliesen in Holzoptik: Formate, Wirkung & Einsatz',
    description:
        'Holzoptik-Fliesen aus Feinsteinzeug: Dielenformate, Farbvariation und Oberflächen, Einsatz auf Fußbodenheizung und draußen, Pflege im Vergleich zu Echtholz.',
    path: '/fliesen/holzoptik'
});

const ADVANTAGES = [
    {
        title: 'Unempfindlich gegen Wasser',
        desc: 'Feinsteinzeug nimmt kaum Wasser auf. Holzoptik-Dielen können deshalb auch in Küche, Flur oder Bad liegen, wo Echtholz bei Nässe quellen würde.',
        icon: Droplets
    },
    {
        title: 'Kratz- und abriebfest',
        desc: 'Stuhlbeine, Straßenschuhe und Haustierkrallen hinterlassen auf einer keramischen Oberfläche deutlich weniger Spuren als auf Parkett oder Dielen.',
        icon: ShieldCheck
    },
    {
        title: 'Geeignet für Fußbodenheizung',
        desc: 'Keramik leitet Wärme gut und arbeitet bei Temperaturwechseln nicht wie Holz. Voraussetzung sind ein belegreifer Estrich und ein verformbarer Kleber.',
        icon: Thermometer
    },
    {
        title: 'Auch draußen möglich',
        desc: 'In frostbeständiger Qualität lässt sich der Dielenlook bis auf Balkon oder Terrasse fortsetzen – mit der passenden Verlegeart für den jeweiligen Aufbau.',
        icon: Snowflake
    },
    {
        title: 'Pflegeleicht',
        desc: 'Kein Schleifen, Ölen oder Versiegeln: Feucht wischen genügt im Alltag. Gepflegt werden vor allem die Fugen.',
        icon: Sparkles
    }
];

const WEITERLESEN = [
    { label: 'Verlegemuster: Verband, Fischgrät & Co.', href: '/fliesen/verlegemuster' },
    { label: 'Leistung: Balkon, Terrasse & Außenbereiche', href: '/leistungen/aussen' },
    { label: 'Fliesen richtig reinigen und pflegen', href: '/blog/fliesen-reinigen-pflegen' },
    { label: 'Musterbäder ansehen', href: '/bad/musterbaeder' }
];

export default function HolzoptikPage() {
    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            <div className="ambient-glow-mint -top-32 -left-32 opacity-70" />
            <div className="ambient-glow-sky top-96 -right-24 opacity-60" />

            {/* Hero */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10" aria-labelledby="holzoptik-heading">
                <div className="ceramic-hero rounded-[3rem] p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow">
                        <Trees className="w-3.5 h-3.5" />
                        Material &amp; Gestaltung
                    </span>
                    <h1 id="holzoptik-heading" className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                        Fliesen in Holzoptik:{' '}
                        <span className="text-ceramic-gradient">Dielenlook mit keramischer Robustheit</span>
                    </h1>
                    <p className="text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
                        Holzoptik-Fliesen aus Feinsteinzeug bringen die Anmutung von Dielen in Wohnraum, Küche und Flur – mit den
                        Eigenschaften eines keramischen Belags. Hier lesen Sie, worauf es bei Oberfläche, Format und Einsatzort ankommt.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
                        <Link href="/kontakt" className="btn-primary px-7 py-3.5 text-xs group">
                            Beratung &amp; Aufmaß anfragen
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <Link href="/leistungen/wohnen" className="btn-ghost px-7 py-3.5 text-xs">
                            Leistung: Wohnbereiche
                        </Link>
                    </div>
                </div>
            </section>

            {/* Advantages */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10" aria-labelledby="ho-vorteile-heading">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="eyebrow eyebrow-sky mb-4">Eigenschaften</span>
                    <h2 id="ho-vorteile-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        Holzcharakter, <span className="text-ceramic-gradient">keramische Eigenschaften</span>
                    </h2>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ADVANTAGES.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li
                                key={item.title}
                                className="group glass-surface p-7 rounded-[2rem] hover:-translate-y-0.5 hover:border-emerald-500/80 hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.14)] transition-all duration-300"
                            >
                                <span className="icon-chip w-12 h-12 mb-5">
                                    <Icon className="w-6 h-6" />
                                </span>
                                <h3 className="font-black text-base text-slate-900 mb-2 group-hover:text-emerald-800 transition-colors">{item.title}</h3>
                                <p className="text-sm text-slate-700 leading-relaxed">{item.desc}</p>
                            </li>
                        );
                    })}
                </ul>
            </section>

            {/* Material & Formate */}
            <section className="py-20 bg-white border-y border-slate-200 relative z-10" aria-labelledby="ho-material-heading">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="eyebrow mb-4">Material &amp; Format</span>
                        <h2 id="ho-material-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Was eine gute Holzoptik ausmacht
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <article className="p-7 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200" aria-labelledby="ho-oberflaeche">
                            <h3 id="ho-oberflaeche" className="text-xl font-black text-slate-900 mb-3">
                                Oberfläche, Struktur und Farbvariation
                            </h3>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                Die Holzzeichnung wird digital auf das Feinsteinzeug gedruckt; eine fühlbare Struktur aus Maserung
                                und Astbild macht den Eindruck glaubwürdig. Je mehr unterschiedliche Motive eine Serie hat, desto
                                seltener wiederholt sich das Bild auf der Fläche. Viele Hersteller geben außerdem an, wie stark die
                                Farbe von Diele zu Diele variiert – eine lebhafte Variation wirkt natürlicher, verlangt beim
                                Verlegen aber das Mischen aus mehreren Kartons.
                            </p>
                            <p className="mt-3 text-sm text-slate-700 leading-relaxed">
                                Für Böden empfehlen sich matte oder leicht strukturierte Oberflächen. Die Rutschhemmung wird nach
                                DIN EN 16165 ermittelt und als R-Klasse angegeben.{' '}
                                <Link href="/blog/rutschfeste-fliesen-r-klassen" className="font-bold text-emerald-800 hover:text-emerald-700 hover:underline underline-offset-2">
                                    R-Klassen erklärt
                                </Link>
                            </p>
                        </article>
                        <article className="p-7 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200" aria-labelledby="ho-formate">
                            <h3 id="ho-formate" className="text-xl font-black text-slate-900 mb-3 flex items-center gap-2">
                                <Ruler className="w-5 h-5 text-emerald-600" aria-hidden="true" />
                                Dielenformate und Untergrund
                            </h3>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                Holzoptik gibt es als schmale Riemen bis hin zu langen, breiten Dielen, zum Beispiel 20 × 120 cm.
                                Lange Formate wirken am natürlichsten, stellen aber höhere Anforderungen: Keramische Dielen sind
                                herstellungsbedingt nie ganz plan, und auf einem unebenen Untergrund entstehen schnell Überzähne an
                                den Stirnseiten. Deshalb prüfen wir die Ebenheit vorab, gleichen bei Bedarf aus und verlegen mit
                                Nivelliersystem.
                            </p>
                            <p className="mt-3 text-sm text-slate-700 leading-relaxed">
                                Zum Verband: Die meisten Dielen werden im wilden Verband oder mit begrenztem Versatz verlegt, damit
                                keine Überzähne entstehen. Fischgrät und Chevron sind mit passenden Formaten ebenfalls möglich.
                                Details dazu, zu Fugenbreite und Fugenfarbe finden Sie unter{' '}
                                <Link href="/fliesen/verlegemuster" className="font-bold text-emerald-800 hover:text-emerald-700 hover:underline underline-offset-2">
                                    Verlegemuster &amp; Abschlüsse
                                </Link>
                                .
                            </p>
                        </article>
                        <article className="p-7 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200" aria-labelledby="ho-fbh">
                            <h3 id="ho-fbh" className="text-xl font-black text-slate-900 mb-3">Holzoptik auf Fußbodenheizung</h3>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                Anders als Parkett quillt oder schwindet eine keramische Diele bei Temperaturwechseln nicht, und sie
                                gibt Wärme gut an den Raum ab. Wichtig sind ein belegreifer Estrich, ein verformbarer Kleber,
                                vollflächige Bettung und übernommene Bewegungsfugen.{' '}
                                <Link href="/fliesen/auf-fussbodenheizung" className="font-bold text-emerald-800 hover:text-emerald-700 hover:underline underline-offset-2">
                                    Fliesen auf Fußbodenheizung
                                </Link>
                            </p>
                        </article>
                        <article className="p-7 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200" aria-labelledby="ho-aussen">
                            <h3 id="ho-aussen" className="text-xl font-black text-slate-900 mb-3">Holzoptik draußen: frostbeständig und passend verlegt</h3>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                Im Außenbereich muss das Material frostbeständig sein – bei Feinsteinzeug in der Regel gegeben, aber
                                immer anhand der Herstellerangabe zu prüfen. Welche Plattenstärke nötig ist, hängt von der
                                Verlegeart ab: Auf Stelzlagern oder im Splittbett braucht es 2 cm starke Terrassenplatten. Im
                                Verbund auf einem geeigneten, abgedichteten Untergrund mit Gefälle lässt sich frostbeständiges
                                Feinsteinzeug in normaler Stärke verlegen.
                            </p>
                            <p className="mt-3 text-sm text-slate-700 leading-relaxed">
                                Welcher Aufbau zu Ihrem Balkon oder Ihrer Terrasse passt, lesen Sie unter{' '}
                                <Link href="/balkon-terrasse" className="font-bold text-emerald-800 hover:text-emerald-700 hover:underline underline-offset-2">
                                    Balkon &amp; Terrasse
                                </Link>{' '}
                                und{' '}
                                <Link href="/balkon-terrasse/terrassenplatten" className="font-bold text-emerald-800 hover:text-emerald-700 hover:underline underline-offset-2">
                                    Terrassenplatten
                                </Link>
                                .
                            </p>
                        </article>
                    </div>
                </div>
            </section>

            {/* Pflege */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10" aria-labelledby="ho-pflege-heading">
                <div className="text-center max-w-3xl mx-auto mb-10">
                    <span className="eyebrow eyebrow-sky mb-4">Pflege</span>
                    <h2 id="ho-pflege-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        Pflege im Vergleich zu Echtholz
                    </h2>
                </div>
                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-100 text-slate-900">
                            <tr>
                                <th scope="col" className="px-5 py-3 font-black border-b border-slate-200">Thema</th>
                                <th scope="col" className="px-5 py-3 font-black border-b border-slate-200">Holzoptik-Fliese</th>
                                <th scope="col" className="px-5 py-3 font-black border-b border-slate-200">Echtholz (Parkett, Dielen)</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {[
                                ['Tägliche Reinigung', 'Feucht wischen mit mildem Reiniger', 'Nebelfeucht wischen, stehendes Wasser vermeiden'],
                                ['Oberflächenschutz', 'Kein Ölen oder Versiegeln der Fliese nötig', 'Regelmäßiges Ölen bzw. Auffrischen der Versiegelung'],
                                ['Abnutzung', 'Keramische Oberfläche, sehr abriebfest', 'Kann abgeschliffen und neu behandelt werden'],
                                ['Schwachstelle', 'Fugen: gelegentlich gründlich reinigen', 'Kratzer, Druckstellen, Feuchtigkeit']
                            ].map(([topic, tile, wood]) => (
                                <tr key={topic} className="border-b border-slate-200 last:border-b-0">
                                    <th scope="row" className="px-5 py-4 font-bold text-slate-900 align-top">{topic}</th>
                                    <td className="px-5 py-4 text-slate-700 align-top">{tile}</td>
                                    <td className="px-5 py-4 text-slate-700 align-top">{wood}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="mt-6 text-sm text-slate-700 leading-relaxed text-center">
                    Ausführliche Reinigungstipps finden Sie im Beitrag{' '}
                    <Link href="/blog/fliesen-reinigen-pflegen" className="font-bold text-emerald-800 hover:text-emerald-700 hover:underline underline-offset-2">
                        Fliesen richtig reinigen und pflegen
                    </Link>
                    .
                </p>
            </section>

            {/* Weiterlesen */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 relative z-10" aria-labelledby="ho-weiterlesen-heading">
                <div className="glass-surface-subtle rounded-3xl p-6 sm:p-8">
                    <h2 id="ho-weiterlesen-heading" className="text-lg font-black text-slate-900 mb-4">Weiterlesen</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {WEITERLESEN.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-800 hover:text-emerald-700 hover:underline underline-offset-2"
                                >
                                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-4 text-sm text-slate-700">
                        Holzoptik im Bad?{' '}
                        <Link href="/bad/fliesen" className="font-bold text-emerald-800 hover:text-emerald-700 hover:underline underline-offset-2">
                            Fliesen im Bad
                        </Link>
                    </p>
                </div>
            </section>

            {/* Konfigurator */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10 scroll-mt-28" id="konfigurator" aria-label="Fliesen-Konfigurator">
                <FliesenKonfigurator material="holzoptik" />
            </section>

            <QualityPromise />

            {/* Closing CTA */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 relative z-10" aria-labelledby="ho-cta-heading">
                <div className="ceramic-hero rounded-[3rem] p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Kostenfreies Vor-Ort-Aufmaß
                    </span>
                    <h2 id="ho-cta-heading" className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight">
                        Dielenlook für Ihren Boden planen
                    </h2>
                    <p className="text-sm sm:text-base text-slate-700 max-w-2xl mx-auto leading-relaxed">
                        Wir prüfen Untergrund und Ebenheit, besprechen Format und Verband und erstellen danach ein verbindliches
                        Festpreisangebot.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
                        <Link href="/kontakt" className="btn-primary px-7 py-3.5 text-xs">Aufmaß anfragen</Link>
                        <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className="btn-ghost px-7 py-3.5 text-xs">
                            <Phone className="w-4 h-4 text-emerald-700" />
                            {COMPANY_DATA.contact.phone}
                        </a>
                        <a href={COMPANY_DATA.contact.whatsappLink} target="_blank" rel="noopener noreferrer" className="glass-button-whatsapp px-7 py-3.5 text-xs">
                            <MessageCircle className="w-4 h-4" />
                            WhatsApp
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
