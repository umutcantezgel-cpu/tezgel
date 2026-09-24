import React from 'react';
import Link from 'next/link';
import {
    ArrowRight,
    CheckCircle2,
    Layers,
    MessageCircle,
    Phone,
    Plug,
    SplitSquareHorizontal,
    Thermometer,
    Timer,
    Users
} from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import { createMetadata } from '@/lib/metadata';
import FliesenKonfigurator from '@/components/funnels/FliesenKonfigurator';
import QualityPromise from '@/components/sections/QualityPromise';

export const metadata = createMetadata({
    title: 'Fliesen auf Fußbodenheizung richtig verlegen',
    description:
        'Warum Fliesen und Fußbodenheizung gut zusammenpassen und worauf es ankommt: Belegreife des Heizestrichs, verformbarer Kleber, Rand- und Bewegungsfugen.',
    path: '/fliesen/auf-fussbodenheizung'
});

const TOPICS = [
    {
        id: 'waerme',
        title: 'Keramik und Naturstein leiten Wärme gut',
        icon: Thermometer,
        text: 'Fliesen und Naturstein sind dicht und haben einen geringen Wärmedurchlasswiderstand. Die Wärme aus dem Estrich gelangt deshalb zügig an die Oberfläche, und der Belag reagiert auf Temperaturänderungen weder mit Quellen noch mit Schwinden. Deshalb gelten keramische Beläge als besonders gut geeignet für Flächenheizungen.'
    },
    {
        id: 'aufheizen',
        title: 'Vor dem Verlegen: Funktions- und Belegreifheizen',
        icon: Timer,
        text: 'Ein Heizestrich wird vor dem Belegen aufgeheizt. Das Funktionsheizen prüft die Anlage und ist im Normenwerk der Flächenheizung (DIN EN 1264-4) beschrieben. Das Belegreifheizen dient dazu, die Restfeuchte auf den für Fliesen zulässigen Wert zu senken. Beides übernimmt der Heizungsbauer bzw. die Bauherrschaft und dokumentiert es in einem Aufheizprotokoll. Vor dem Verlegen prüfen wir die Belegreife.',
        link: { label: 'Estrich & Belegreife', href: '/untergrund-abdichtung/estrich-belegreife' }
    },
    {
        id: 'kleber',
        title: 'Verformbarer Kleber und vollflächige Bettung',
        icon: Layers,
        text: 'Ein beheizter Estrich dehnt sich beim Aufheizen aus und zieht sich beim Abkühlen zusammen. Der Kleber muss diese Bewegungen aufnehmen können. Wir verlegen auf Heizestrich mit flexiblen C2-Klebern der Verformbarkeitsklasse S1 bzw. S2 und achten auf eine vollflächige, hohlraumarme Bettung – Hohlstellen würden Wärmeübertragung und Belastbarkeit verschlechtern.',
        link: { label: 'Kleberklassen C2, S1, S2 erklärt', href: '/fliesen/verlegetechnik' }
    },
    {
        id: 'fugen',
        title: 'Rand-, Bewegungs- und Feldbegrenzungsfugen',
        icon: SplitSquareHorizontal,
        text: 'Randfugen trennen den Belag von Wänden, Stützen und Einbauten. Bewegungsfugen im Estrich werden deckungsgleich im Fliesenbelag übernommen, ebenso Fugen zwischen getrennt geregelten Heizkreisen. Die Lage der Fugen ergibt sich aus dem Fugenplan der Estrich- bzw. Heizungsplanung. Diese Fugen werden elastisch geschlossen und nicht überfliest.'
    },
    {
        id: 'duennbett',
        title: 'Elektrische Dünnbett-Heizsysteme im Bestand',
        icon: Plug,
        text: 'Bei Renovierungen kommen oft elektrische Heizmatten oder -kabel zum Einsatz, die mit geringer Aufbauhöhe direkt unter dem Belag liegen – eingebettet in Ausgleichsmasse oder Kleberschicht. Wir bereiten den Untergrund vor, betten das System nach Herstellerangabe ein und verlegen die Fliesen darauf. Den elektrischen Anschluss und die Regelung übernimmt ein Elektrofachbetrieb.'
    }
];

const ROLES = [
    { trade: 'Heizungsbauer', task: 'Plant und installiert die Flächenheizung, führt Funktions- und ggf. Belegreifheizen durch und protokolliert es.' },
    { trade: 'Estrichleger', task: 'Stellt den Heizestrich her und legt Bewegungsfugen nach Fugenplan an.' },
    { trade: 'Elektriker', task: 'Schließt elektrische Heizsysteme an, setzt Fühler und Regelung und prüft die Anlage.' },
    { trade: 'Fliesenleger', task: 'Prüft Belegreife und Untergrund, übernimmt Fugenplan und Randfugen und verlegt den Belag mit verformbarem Kleber.' }
];

const WEITERLESEN = [
    { label: 'Estrich & Belegreife prüfen', href: '/untergrund-abdichtung/estrich-belegreife' },
    { label: 'Leistung: Untergrund & Abdichtung', href: '/leistungen/untergrund' },
    { label: 'Fliesen im Bad', href: '/bad/fliesen' },
    { label: 'Persönliche Beratung', href: '/beratung' }
];

export default function FliesenAufFussbodenheizungPage() {
    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            <div className="ambient-glow-mint -top-32 -left-32 opacity-70" />
            <div className="ambient-glow-sky top-96 -right-24 opacity-60" />

            {/* Hero */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10" aria-labelledby="fbh-heading">
                <div className="ceramic-hero rounded-[3rem] p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow">
                        <Thermometer className="w-3.5 h-3.5" />
                        Verlegetechnik &middot; Neubau &amp; Bestand
                    </span>
                    <h1 id="fbh-heading" className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                        Fliesen auf Fußbodenheizung:{' '}
                        <span className="text-ceramic-gradient">Aufbau, Fugen und Kleberwahl</span>
                    </h1>
                    <p className="text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
                        Fliesen und Naturstein sind ein idealer Belag für Flächenheizungen – vorausgesetzt, Estrich, Kleber und
                        Fugen sind auf die Temperaturwechsel abgestimmt. Wir verlegen auf Warmwasser-Fußbodenheizung und auf
                        elektrischen Dünnbett-Systemen und stimmen uns dabei mit den anderen Gewerken ab.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
                        <Link href="/kontakt" className="btn-primary px-7 py-3.5 text-xs group">
                            Aufmaß anfragen
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <Link href="/untergrund-abdichtung/estrich-belegreife" className="btn-ghost px-7 py-3.5 text-xs">
                            Estrich &amp; Belegreife
                        </Link>
                    </div>
                </div>
            </section>

            {/* Topics */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10" aria-labelledby="fbh-themen-heading">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="eyebrow eyebrow-sky mb-4">Worauf es ankommt</span>
                    <h2 id="fbh-themen-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        Fünf Punkte für einen <span className="text-ceramic-gradient">dauerhaften Belag</span>
                    </h2>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {TOPICS.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li
                                key={item.id}
                                className="group glass-surface p-7 rounded-[2rem] flex flex-col hover:-translate-y-0.5 hover:border-emerald-500/80 hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.14)] transition-all duration-300"
                            >
                                <span className="icon-chip w-12 h-12 mb-5">
                                    <Icon className="w-6 h-6" />
                                </span>
                                <h3 className="font-black text-base text-slate-900 mb-2 group-hover:text-emerald-800 transition-colors">{item.title}</h3>
                                <p className="text-sm text-slate-700 leading-relaxed flex-1">{item.text}</p>
                                {item.link && (
                                    <Link
                                        href={item.link.href}
                                        className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-emerald-800 hover:text-emerald-700 hover:underline underline-offset-2"
                                    >
                                        {item.link.label}
                                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                                    </Link>
                                )}
                            </li>
                        );
                    })}
                </ul>
                <p className="mt-8 text-sm text-slate-700 leading-relaxed max-w-3xl mx-auto text-center">
                    Während des Verlegens und in der Erhärtungsphase von Kleber und Fugenmörtel bleibt die Heizung nach
                    Absprache abgesenkt oder ausgeschaltet. Danach wird sie schrittweise wieder hochgefahren – maßgeblich sind
                    die Angaben der Werkstoffhersteller.
                </p>
            </section>

            {/* Wer macht was */}
            <section className="py-20 bg-white border-y border-slate-200 relative z-10" aria-labelledby="fbh-gewerke-heading">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-10">
                        <span className="eyebrow mb-4">
                            <Users className="w-3.5 h-3.5" />
                            Schnittstellen
                        </span>
                        <h2 id="fbh-gewerke-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Wer macht was?
                        </h2>
                        <p className="mt-3 text-base text-slate-700 leading-relaxed">
                            Eine Fußbodenheizung ist Teamarbeit mehrerer Gewerke. {COMPANY_DATA.legalName} ist
                            Fliesenlegerbetrieb: Heizung, Estrich und Elektroanschluss sind nicht unsere Leistungen – wir stimmen
                            die Übergabe aber so ab, dass der Belag passt.
                        </p>
                    </div>
                    <div className="overflow-x-auto rounded-2xl border border-slate-200">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-100 text-slate-900">
                                <tr>
                                    <th scope="col" className="px-5 py-3 font-black border-b border-slate-200">Gewerk</th>
                                    <th scope="col" className="px-5 py-3 font-black border-b border-slate-200">Aufgabe rund um den Fliesenbelag</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ROLES.map((row) => (
                                    <tr key={row.trade} className="border-b border-slate-200 last:border-b-0 bg-white">
                                        <th scope="row" className="px-5 py-4 font-bold text-slate-900 align-top whitespace-nowrap">{row.trade}</th>
                                        <td className="px-5 py-4 text-slate-700 leading-relaxed">{row.task}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Weiterlesen */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10" aria-labelledby="fbh-weiterlesen-heading">
                <div className="glass-surface-subtle rounded-3xl p-6 sm:p-8">
                    <h2 id="fbh-weiterlesen-heading" className="text-lg font-black text-slate-900 mb-4">Weiterlesen</h2>
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
                </div>
            </section>

            {/* Konfigurator */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10 scroll-mt-28" id="konfigurator" aria-label="Fliesen-Konfigurator">
                <FliesenKonfigurator floorHeating />
            </section>

            <QualityPromise />

            {/* Closing CTA */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 relative z-10" aria-labelledby="fbh-cta-heading">
                <div className="ceramic-hero rounded-[3rem] p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Belegreife prüfen, sauber verlegen
                    </span>
                    <h2 id="fbh-cta-heading" className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight">
                        Fliesen für Ihren Heizestrich planen
                    </h2>
                    <p className="text-sm sm:text-base text-slate-700 max-w-2xl mx-auto leading-relaxed">
                        Beim kostenfreien Vor-Ort-Aufmaß prüfen wir Estrich, Fugenplan und Aufheizprotokoll und klären die
                        Abstimmung mit den anderen Gewerken.
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
