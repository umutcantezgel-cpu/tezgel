import React from 'react';
import Link from 'next/link';
import {
    Gauge,
    FlaskConical,
    Microscope,
    Thermometer,
    Droplets,
    TriangleAlert,
    Info,
    CircleCheck,
    ArrowRight,
    Phone,
    MessageCircle,
    ChevronDown,
    Search,
    Timer
} from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import { createMetadata } from '@/lib/metadata';
import QualityPromise from '@/components/sections/QualityPromise';

export const metadata = createMetadata({
    title: 'Estrich-Belegreife prüfen: CM-Messung vor dem Fliesen',
    description:
        'Wann ist der Estrich belegreif? CM-Messung, Darr-Methode und KRL im Vergleich, Richtwerte je Estrichart – und warum zu früh verlegte Fliesen reißen.',
    path: '/untergrund-abdichtung/estrich-belegreife'
});

const SCREED_TYPES = [
    {
        title: 'Zementestrich (CT)',
        points: [
            'Bindet mit Wasser ab und schwindet beim Austrocknen – daher Schein- und Bewegungsfugen.',
            'Kann sich an den Rändern aufwölben („schüsseln“), solange er ungleichmäßig trocknet.',
            'Nach dem Erhärten unempfindlich gegen Feuchte, deshalb auch in Nassräumen üblich.',
            'Trocknet vergleichsweise langsam; die zulässige Restfeuchte ist höher als bei Calciumsulfat.'
        ]
    },
    {
        title: 'Calciumsulfatestrich (CA / CAF)',
        points: [
            'Schwindet kaum, dadurch große Felder ohne Scheinfugen möglich; oft als Fließestrich eingebaut.',
            'Feuchteempfindlich: Durchfeuchtung mindert die Festigkeit, im Nassbereich ist eine Abdichtung zwingend.',
            'Bildet an der Oberfläche eine Sinterschicht, die vor dem Belegen abgeschliffen und abgesaugt wird.',
            'Verlangt eine deutlich niedrigere Restfeuchte und eine passende Grundierung.'
        ]
    }
];

const METHODS = [
    {
        title: 'CM-Methode',
        icon: FlaskConical,
        how: 'Eine Probe wird aus dem Estrichquerschnitt entnommen, zerkleinert, gewogen und in einer Druckflasche mit Calciumcarbid geschüttelt. Der entstehende Gasdruck ergibt den Feuchtegehalt in CM-%.',
        pro: 'Direkt auf der Baustelle, in Deutschland das etablierte Verfahren; die gängigen Richtwerte beziehen sich darauf.',
        contra: 'Zerstörend (kleine Entnahmestelle), das Ergebnis hängt stark von fachgerechter Probenahme und Einwaage ab.'
    },
    {
        title: 'Darr-Methode',
        icon: Microscope,
        how: 'Die Probe wird gewogen, in einem Trockenofen bei festgelegter Temperatur bis zur Massekonstanz getrocknet und erneut gewogen. Der Gewichtsverlust ergibt den Feuchtegehalt.',
        pro: 'Sehr genaues, gravimetrisches Referenzverfahren, etwa zur Klärung strittiger Fälle.',
        contra: 'Laborverfahren mit Zeitverzug; die Werte sind nicht direkt mit CM-Richtwerten vergleichbar.'
    },
    {
        title: 'KRL-Messung',
        icon: Gauge,
        how: 'Gemessen wird die korrespondierende relative Luftfeuchte: ein Sensor ermittelt im Bohrloch oder unter einer Messhaube die Luftfeuchte, die sich im Gleichgewicht mit dem Estrich einstellt.',
        pro: 'Wenig oder nicht zerstörend, international verbreitet, gut für Verlaufsmessungen.',
        contra: 'Braucht Zeit bis zum Feuchtegleichgewicht und ist temperaturabhängig; eigene Bewertungsmaßstäbe statt CM-Werte.'
    }
];

const FURTHER_CHECKS = [
    { title: 'Oberflächenfestigkeit', desc: 'Gitterritzprüfung und Klopfprobe zeigen, ob die Oberfläche fest genug für Kleber und Belag ist oder ob sie absandet.', icon: Search },
    { title: 'Sinterschicht und Verunreinigungen', desc: 'Sinterschichten, Zementschlämme, Farbe oder Gips werden entfernt, damit Grundierung und Kleber haften.', icon: Droplets },
    { title: 'Risse und Fugen', desc: 'Risse werden bewertet und ruhende Risse ggf. verharzt. Bewegungsfugen des Estrichs müssen im Fliesenbelag an gleicher Stelle übernommen werden.', icon: TriangleAlert },
    { title: 'Randdämmstreifen und Ebenheit', desc: 'Der Estrich darf keinen starren Kontakt zu Wänden haben; die Ebenheit wird nach DIN 18202 gemessen.', icon: Gauge }
];

const FAQ = [
    {
        q: 'Gibt es eine Faustregel, wie lange Estrich trocknen muss?',
        a: 'Faustregeln nach Dicke und Wochen sind nur grobe Anhaltspunkte. Raumklima, Estrichart, Zusätze, Einbaudicke und Luftaustausch verändern die Trocknungszeit erheblich. Verlässlich ist nur die Messung.'
    },
    {
        q: 'Reicht ein elektronisches Feuchtemessgerät?',
        a: 'Elektronische Geräte eignen sich, um Unterschiede auf der Fläche zu finden und geeignete Messstellen zu wählen. Als Nachweis der Belegreife ersetzen sie die CM-Messung nicht.'
    },
    {
        q: 'Heizen Sie den Estrich auf?',
        a: 'Nein. Estricheinbau sowie Funktions- und Belegreifheizen gehören nicht zu unseren Leistungen, sondern zum Estrichleger bzw. Heizungsbauer. Wir prüfen das Aufheizprotokoll und messen vor Verlegebeginn die Restfeuchte.'
    }
];

const READ_MORE = [
    { label: 'Leistung: Untergrund & DIN 18534 Abdichtung', href: '/leistungen/untergrund' },
    { label: 'Fliesen auf Fußbodenheizung', href: '/fliesen/auf-fussbodenheizung' },
    { label: 'Fliesen im Wohnbereich', href: '/leistungen/wohnen' },
    { label: 'Fliesen im Neubau', href: '/fliesen/neubau' }
];

export default function EstrichBelegreifePage() {
    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            <div className="ambient-glow-warm -top-32 -left-32 opacity-70" />
            <div className="ambient-glow-orange top-96 -right-24 opacity-60" />

            {/* Hero */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10" aria-labelledby="estrich-heading">
                <div className="ceramic-hero rounded-tile-2xl p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow">
                        <Gauge className="w-3.5 h-3.5 text-orange-600" />
                        Estrich &middot; Restfeuchte &middot; CM-Messung
                    </span>
                    <h1 id="estrich-heading" className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                        Estrich prüfen:{' '}
                        <span className="text-ceramic-gradient">Belegreife und Restfeuchte</span> vor dem Fliesen
                    </h1>
                    <p className="text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
                        Der Bauzeitenplan drängt, der Estrich sieht trocken aus – und trotzdem kann er noch zu viel Wasser enthalten.
                        Bevor wir fliesen, messen wir die Restfeuchte. Hier erfahren Sie, wie das funktioniert und warum es sich lohnt,
                        auf das Ergebnis zu warten.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
                        <Link href="/kontakt" className="btn-primary px-7 py-3.5 text-xs group">
                            Messtermin anfragen
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <Link href="/fliesen/auf-fussbodenheizung" className="btn-ghost px-7 py-3.5 text-xs">
                            Fliesen auf Fußbodenheizung
                        </Link>
                    </div>
                </div>
            </section>

            {/* Why */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10" aria-labelledby="warum-heading">
                <div className="glass-bezel-outer">
                    <div className="glass-bezel-inner p-7 sm:p-10">
                        <span className="eyebrow eyebrow-amber mb-4">
                            <TriangleAlert className="w-3.5 h-3.5" />
                            Belegreife ist Voraussetzung
                        </span>
                        <h2 id="warum-heading" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-4">
                            Warum Restfeuchte über die Haltbarkeit entscheidet
                        </h2>
                        <div className="space-y-3 text-base text-slate-700 leading-relaxed">
                            <p>
                                Fliese und Kleber bremsen die Austrocknung nach oben stark. Ein zu feuchter Zementestrich schwindet unter
                                dem Belag weiter – die Spannungen führen zu Rissen, Hohlstellen und abgerissenen Randfugen. Ein zu
                                feuchter Calciumsulfatestrich verliert an der Oberfläche Festigkeit, der Kleber findet keinen Halt mehr.
                            </p>
                            <p>
                                Belegreife ist deshalb keine Formalie, sondern die Voraussetzung für einen dauerhaften Belag. Die
                                Restfeuchtemessung vor Beginn der Verlegung gehört bei uns zur Untergrundprüfung dazu.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Screed types */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10" aria-labelledby="estricharten-heading">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="eyebrow eyebrow-orange mb-4">Estricharten</span>
                    <h2 id="estricharten-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        Zementestrich oder Calciumsulfatestrich: die Unterschiede
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {SCREED_TYPES.map((type) => (
                        <article key={type.title} className="glass-surface rounded-tile-xl p-7 sm:p-8">
                            <h3 className="text-xl font-black text-slate-900 mb-4">{type.title}</h3>
                            <ul className="space-y-3">
                                {type.points.map((point) => (
                                    <li key={point} className="flex gap-3 text-sm text-slate-700 leading-relaxed">
                                        <CircleCheck className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>

                <div className="mt-10 max-w-4xl mx-auto">
                    <h3 className="text-lg font-black text-slate-900 mb-3 text-center">Häufig genannte Richtwerte für Fliesen und Platten</h3>
                    <div className="overflow-x-auto rounded-tile-xl border border-slate-200">
                        <table className="w-full text-left text-sm min-w-[520px]">
                            <caption className="sr-only">Häufig genannte CM-Richtwerte für die Belegreife mit Fliesen</caption>
                            <thead className="bg-slate-100 text-slate-900">
                                <tr>
                                    <th scope="col" className="px-5 py-4 font-black border-b border-slate-200">Estrichart</th>
                                    <th scope="col" className="px-5 py-4 font-black border-b border-slate-200">unbeheizt</th>
                                    <th scope="col" className="px-5 py-4 font-black border-b border-slate-200">beheizt</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 bg-white">
                                <tr>
                                    <th scope="row" className="px-5 py-4 font-bold text-slate-900">Zementestrich (CT)</th>
                                    <td className="px-5 py-4 text-slate-700 tabular-nums">≤ 2,0 CM-%</td>
                                    <td className="px-5 py-4 text-slate-700 tabular-nums">≤ 2,0 CM-%</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="px-5 py-4 font-bold text-slate-900">Calciumsulfatestrich (CA / CAF)</th>
                                    <td className="px-5 py-4 text-slate-700 tabular-nums">≤ 0,5 CM-%</td>
                                    <td className="px-5 py-4 text-slate-700 tabular-nums">≤ 0,3 CM-%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="mt-4 text-sm text-slate-600 leading-relaxed flex gap-2">
                        <Info className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                        <span>
                            Orientierungswerte für die Verlegung im Dünnbett, wie sie in Fachmerkblättern und in der Schnittstellenkoordination
                            bei beheizten und unbeheizten Fußbodenkonstruktionen genannt werden. Maßgeblich sind die aktuelle Ausgabe dieser
                            Regelwerke und die Angaben der Estrich- und Kleberhersteller – bei Schnellestrichen oder Estrichen mit Zusatzmitteln
                            gelten häufig eigene Werte.
                        </span>
                    </p>
                </div>
            </section>

            {/* Methods */}
            <section className="py-20 bg-white border-y border-slate-200 relative z-10" aria-labelledby="methoden-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="eyebrow eyebrow-orange mb-4">Messverfahren</span>
                        <h2 id="methoden-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Drei Prüfmethoden im Vergleich: CM, Darr, KRL
                        </h2>
                        <p className="mt-3 text-base text-slate-700 leading-relaxed">
                            Alle drei messen Feuchte, aber auf unterschiedliche Weise. Wichtig: Ihre Ergebnisse sind nicht
                            untereinander austauschbar – jeder Wert muss mit den Richtwerten seines eigenen Verfahrens verglichen werden.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {METHODS.map((m) => {
                            const Icon = m.icon;
                            return (
                                <article key={m.title} className="group p-7 rounded-tile-lg bg-slate-50 border border-slate-200 flex flex-col hover:bg-white hover:-translate-y-0.5 hover:border-orange-500/80 transition-all duration-300">
                                    <span className="icon-chip w-12 h-12 mb-5">
                                        <Icon className="w-6 h-6 text-orange-600" />
                                    </span>
                                    <h3 className="text-lg font-black text-slate-900 mb-2">{m.title}</h3>
                                    <p className="text-sm text-slate-700 leading-relaxed mb-4">{m.how}</p>
                                    <dl className="mt-auto space-y-3 text-sm">
                                        <div className="rounded-tile-md bg-orange-50/50 border border-orange-200/60 p-4">
                                            <dt className="font-black text-orange-700 mb-1">Stärke</dt>
                                            <dd className="text-slate-700 leading-relaxed">{m.pro}</dd>
                                        </div>
                                        <div className="rounded-tile-md bg-white border border-slate-200 p-4">
                                            <dt className="font-black text-slate-900 mb-1">Grenze</dt>
                                            <dd className="text-slate-700 leading-relaxed">{m.contra}</dd>
                                        </div>
                                    </dl>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Heated screeds */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10" aria-labelledby="beheizt-heading">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    <div className="space-y-4">
                        <span className="eyebrow eyebrow-orange">
                            <Thermometer className="w-3.5 h-3.5 text-orange-600" />
                            Fußbodenheizung
                        </span>
                        <h2 id="beheizt-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Beheizte Estriche: Funktions- und Belegreifheizen mit Protokoll
                        </h2>
                        <p className="text-base text-slate-700 leading-relaxed">
                            Bei Heizestrichen werden zwei Vorgänge oft verwechselt. Das <strong className="text-slate-900">Funktionsheizen</strong>{' '}
                            weist nach, dass die Heizung funktioniert – es trocknet den Estrich nicht automatisch belegreif. Das{' '}
                            <strong className="text-slate-900">Belegreifheizen</strong> dient gezielt der Trocknung und wird separat
                            vereinbart. Beides wird protokolliert.
                        </p>
                        <p className="text-base text-slate-700 leading-relaxed">
                            Für die CM-Messung sollten Messstellen im Estrich markiert sein, damit beim Entnehmen der Probe keine
                            Heizrohre getroffen werden.
                        </p>
                    </div>
                    <div className="glass-surface rounded-tile-2xl p-7 sm:p-8">
                        <h3 className="text-lg font-black text-slate-900 mb-4">Was wir vor dem Verlegen sehen möchten</h3>
                        <ul className="space-y-3">
                            {[
                                'Aufheizprotokoll mit Datum, Vorlauftemperaturen und Dauer',
                                'Markierte Messstellen für die CM-Probe',
                                'Angabe der Estrichart und ggf. verwendeter Zusatzmittel',
                                'Bewegungs- und Randfugen, abgestimmt auf die Heizkreise'
                            ].map((text) => (
                                <li key={text} className="flex gap-3 text-sm text-slate-700 leading-relaxed">
                                    <CircleCheck className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                                    <span>{text}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="mt-5 text-sm text-slate-600 leading-relaxed">
                            Estricheinbau und Aufheizen übernehmen Estrichleger und Heizungsbauer. Details zu Aufbau, Fugen und
                            Kleberwahl finden Sie unter{' '}
                            <Link href="/fliesen/auf-fussbodenheizung" className="font-bold text-orange-700 hover:text-orange-600 hover:underline underline-offset-2">
                                Fliesen auf Fußbodenheizung
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </section>

            {/* Further checks */}
            <section className="py-20 bg-white border-y border-slate-200 relative z-10" aria-labelledby="pruefungen-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="eyebrow eyebrow-orange mb-4">Mehr als Feuchte</span>
                        <h2 id="pruefungen-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Weitere Prüfungen: Oberflächenfestigkeit, Sinterschicht, Risse
                        </h2>
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {FURTHER_CHECKS.map((item) => {
                            const Icon = item.icon;
                            return (
                                <li key={item.title} className="group p-6 rounded-tile-xl bg-slate-50 border border-slate-200 hover:bg-white hover:-translate-y-0.5 hover:border-orange-500/80 transition-all duration-300">
                                    <span className="icon-chip w-11 h-11 mb-4 text-orange-600">
                                        <Icon className="w-5 h-5" />
                                    </span>
                                    <h3 className="font-black text-base text-slate-900 mb-2">{item.title}</h3>
                                    <p className="text-sm text-slate-700 leading-relaxed">{item.desc}</p>
                                </li>
                            );
                        })}
                    </ul>
                    <p className="mt-6 text-sm text-slate-700 text-center">
                        Mehr zu Rissen und Entkopplung:{' '}
                        <Link href="/untergrund-abdichtung/entkopplung" className="font-bold text-orange-700 hover:text-orange-600 hover:underline underline-offset-2">
                            Entkopplung &amp; Holzuntergründe
                        </Link>
                        {' '}&middot; zur Ebenheit:{' '}
                        <Link href="/untergrund-abdichtung/ausgleich-gefaelle" className="font-bold text-orange-700 hover:text-orange-600 hover:underline underline-offset-2">
                            Ausgleich &amp; Gefälle
                        </Link>
                    </p>
                </div>
            </section>

            {/* Too wet */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10" aria-labelledby="zufeucht-heading">
                <div className="text-center mb-10">
                    <span className="eyebrow eyebrow-orange mb-4">
                        <Timer className="w-3.5 h-3.5 text-orange-600" />
                        Wenn es noch nicht passt
                    </span>
                    <h2 id="zufeucht-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        Was tun, wenn der Estrich noch zu feucht ist?
                    </h2>
                </div>
                <ol className="space-y-4">
                    {[
                        { t: 'Ursache klären', d: 'Liegt es an der Jahreszeit, an zu seltenem Lüften, an zu früh geschlossenen Räumen oder an einem Feuchteeintrag von außen? Davon hängt ab, was hilft.' },
                        { t: 'Trocknung verbessern', d: 'Regelmäßiges Stoßlüften und gleichmäßige Raumtemperatur beschleunigen die Trocknung. Technische Bautrocknung und Belegreifheizen übernehmen Fachfirmen bzw. der Heizungsbauer – gleichmäßig und nicht überstürzt, damit der Estrich keinen Schaden nimmt.' },
                        { t: 'Erneut messen', d: 'Erst wenn eine neue CM-Messung den Richtwert einhält, geben wir den Untergrund für die Verlegung frei.' },
                        { t: 'Alternativen prüfen', d: 'Einzelne Entkopplungs- oder Abdichtungssysteme erlauben laut Hersteller auf Zementestrich eine frühere Belegung. Das gilt nur im Rahmen der jeweiligen Herstellerangaben und nicht für Calciumsulfatestrich.' }
                    ].map((step, idx) => (
                        <li key={step.t} className="glass-surface rounded-tile-xl p-6 flex gap-5">
                            <span className="font-display text-3xl font-black tabular-nums text-orange-500/40 shrink-0" aria-hidden="true">
                                {String(idx + 1).padStart(2, '0')}
                            </span>
                            <div>
                                <h3 className="font-black text-base text-slate-900 mb-1">{step.t}</h3>
                                <p className="text-sm text-slate-700 leading-relaxed">{step.d}</p>
                            </div>
                        </li>
                    ))}
                </ol>
            </section>

            {/* FAQ */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 relative z-10" aria-labelledby="faq-heading">
                <h2 id="faq-heading" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-6 text-center">
                    Häufige Fragen zur Belegreife
                </h2>
                <div className="space-y-3">
                    {FAQ.map((item) => (
                        <details key={item.q} className="group glass-surface rounded-tile-lg px-6 py-4">
                            <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-bold text-slate-900">
                                {item.q}
                                <ChevronDown className="w-5 h-5 text-orange-600 shrink-0 transition-transform group-open:rotate-180" />
                            </summary>
                            <p className="mt-3 text-sm text-slate-700 leading-relaxed">{item.a}</p>
                        </details>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 relative z-10" aria-labelledby="cta-heading">
                <div className="ceramic-hero rounded-tile-2xl p-8 sm:p-12 text-center space-y-4">
                    <h2 id="cta-heading" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                        Estrich liegt, Fliesen sind ausgesucht?
                    </h2>
                    <p className="text-sm sm:text-base text-slate-700 max-w-2xl mx-auto leading-relaxed">
                        Beim Vor-Ort-Termin prüft {COMPANY_DATA.owner.fullName} den Untergrund und misst die Restfeuchte. So wissen Sie,
                        ob verlegt werden kann – oder wie lange es voraussichtlich noch dauert.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
                        <Link href="/kontakt" className="btn-primary px-7 py-3.5 text-xs">
                            Termin anfragen
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className="btn-ghost px-7 py-3.5 text-xs">
                            <Phone className="w-4 h-4 text-orange-600" />
                            {COMPANY_DATA.contact.phone}
                        </a>
                        <a href={COMPANY_DATA.contact.whatsappLink} target="_blank" rel="noopener noreferrer" className="glass-button-whatsapp px-7 py-3.5 text-xs">
                            <MessageCircle className="w-4 h-4 text-green-700" />
                            WhatsApp
                        </a>
                    </div>
                </div>
            </section>

            {/* Weiterlesen */}
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 relative z-10" aria-labelledby="weiterlesen-heading">
                <h2 id="weiterlesen-heading" className="text-xl font-black text-slate-900 mb-4">Weiterlesen</h2>
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
