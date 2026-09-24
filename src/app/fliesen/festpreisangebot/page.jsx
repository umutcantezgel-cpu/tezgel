import React from 'react';
import Link from 'next/link';
import {
    Receipt,
    ArrowRight,
    Phone,
    Ruler,
    ShieldCheck,
    ListChecks,
    CalendarCheck,
    UserCheck,
    Maximize2,
    Grid,
    Layers,
    Scissors,
    Hammer,
    Scale,
    CheckCircle2,
    BookOpen
} from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import { createMetadata } from '@/lib/metadata';
import QualityPromise from '@/components/sections/QualityPromise';
import FliesenKonfigurator from '@/components/funnels/FliesenKonfigurator';

export const metadata = createMetadata({
    title: 'Fliesenleger-Angebot: Kostenfaktoren & Festpreis',
    description:
        'Wie ein Festpreisangebot für Fliesenarbeiten entsteht: Aufmaß, Positionen, Format, Untergrund und Rückbau transparent erklärt, damit Sie Angebote vergleichen.',
    path: '/fliesen/festpreisangebot'
});

const PROMISES = [
    { icon: Ruler, title: 'Kostenfreies Aufmaß vor Ort', desc: 'Flächen, Untergrund und Details werden vor Ort aufgenommen – die Grundlage für ein belastbares Angebot.' },
    { icon: ShieldCheck, title: 'Verbindlicher Festpreis', desc: 'Für den im Angebot beschriebenen Leistungsumfang gilt der vereinbarte Preis – ohne versteckte Zusatzkosten.' },
    { icon: ListChecks, title: 'Transparente Positionen', desc: 'Jede Leistung steht als eigene Position mit Menge und Einheit im Angebot – nachvollziehbar und vergleichbar.' },
    { icon: CalendarCheck, title: 'Bauzeitenplan & Termintreue', desc: 'Feste Zusagen für Start und Fertigstellung, damit Sie Ihren Alltag und andere Gewerke planen können.' },
    { icon: UserCheck, title: 'Ein Ansprechpartner', desc: `${COMPANY_DATA.owner.fullName} begleitet Ihr Projekt persönlich – vom Aufmaß bis zur Abnahme.` }
];

const COST_FACTORS = [
    { icon: Maximize2, title: 'Fläche', desc: 'Die Quadratmeterzahl bestimmt Material- und Arbeitsmenge. Kleine Flächen mit vielen Ecken, Nischen und Aussparungen verursachen pro Quadratmeter mehr Aufwand als große, offene Flächen.' },
    { icon: Grid, title: 'Format', desc: 'Großformate brauchen einen besonders ebenen Untergrund, vollflächige Bettung und Hebetechnik. Mosaik und kleine Formate bedeuten viele Fugen und viel Handarbeit. Standardformate liegen dazwischen.' },
    { icon: Scissors, title: 'Muster & Details', desc: 'Diagonal-, Fischgrät- oder wilder Verband erzeugen mehr Zuschnitte als eine gerade Verlegung. Gehrungskanten, Nischen, Sockel und Profile kommen als eigene Positionen hinzu.' },
    { icon: Layers, title: 'Untergrund', desc: 'Ob ausgeglichen, grundiert, entkoppelt oder abgedichtet werden muss, entscheidet sich beim Aufmaß. Ein guter Untergrund spart Aufwand, ein schwieriger erfordert Vorarbeiten.' }
];

const POSITIONS = [
    { unit: 'm²', label: 'Flächenleistungen', desc: 'Boden- und Wandfliesen verlegen, Untergrund ausgleichen, grundieren, Verbundabdichtung auftragen.' },
    { unit: 'lfm', label: 'Laufende Meter', desc: 'Sockel, Gehrungskanten, Abschlussprofile, elastische Anschlussfugen, Dichtbänder.' },
    { unit: 'Stk', label: 'Stückpositionen', desc: 'Aussparungen für Rohre und Abläufe, Dichtmanschetten, Treppenstufen, Nischen.' },
    { unit: 'Zulage', label: 'Zulagen', desc: 'Mehraufwand für Diagonal- oder Fischgrätverlegung, Großformate oder schwer zugängliche Bereiche.' }
];

const COMPARE = [
    'Ist der Leistungsumfang gleich – gleiche Flächen, gleiche Details, gleiche Vorarbeiten?',
    'Ist das Fliesenmaterial enthalten, oder wird es von Ihnen gestellt?',
    'Sind Untergrundvorbereitung und Abdichtung ausgeschrieben – und nach welcher Norm?',
    'Welche Kleber- und Fugenmörtelklassen sind vorgesehen?',
    'Sind Rückbau, Entsorgung und Schutzmaßnahmen enthalten oder separat?',
    'Gibt es Bedarfs- oder Eventualpositionen, und wie wahrscheinlich sind sie?',
    'Sind Termine für Beginn und Fertigstellung genannt?'
];

const CROSS_LINKS = [
    { href: '/bad/budgetkalkulator', label: 'Budgetkalkulator Bad', desc: 'Erste Orientierung für Ihr Badprojekt' },
    { href: '/beratung', label: 'Beratung', desc: 'Ihr Projekt persönlich besprechen' },
    { href: '/unternehmen', label: 'Über unseren Betrieb', desc: 'Meisterbetrieb aus Aßlar' },
    { href: '/agb', label: 'AGB', desc: 'Unsere Vertragsbedingungen' }
];

export default function FestpreisangebotPage() {
    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            <div className="ambient-glow-mint -top-32 -left-32 opacity-70" />
            <div className="ambient-glow-sky top-96 -right-24 opacity-60" />

            {/* Hero */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10" aria-labelledby="festpreis-heading">
                <div className="ceramic-hero rounded-[3rem] p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow">
                        <Receipt className="w-3.5 h-3.5" />
                        Transparente Kalkulation
                    </span>
                    <h1 id="festpreis-heading" className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                        Festpreisangebot für Fliesenarbeiten:{' '}
                        <span className="text-ceramic-gradient">was den Aufwand bestimmt</span>
                    </h1>
                    <p className="text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
                        Was eine Fliesenarbeit kostet, lässt sich seriös erst nach einem Blick auf Fläche, Untergrund und
                        Details sagen. Diese Seite erklärt, welche Faktoren den Aufwand bestimmen, wie ein Angebot aufgebaut
                        ist und wie Sie Angebote fair vergleichen.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
                        <Link href="/kontakt" className="btn-primary px-7 py-3.5 text-xs group">
                            Kostenfreies Aufmaß anfragen
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className="btn-ghost px-7 py-3.5 text-xs">
                            <Phone className="w-4 h-4 text-emerald-700" />
                            {COMPANY_DATA.contact.phone}
                        </a>
                    </div>
                </div>
            </section>

            {/* Vom Aufmaß zum Festpreis */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10" aria-labelledby="aufmass-heading">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="eyebrow eyebrow-sky mb-4">Unser Weg zum Angebot</span>
                    <h2 id="aufmass-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        Vom kostenfreien Aufmaß zum Festpreisangebot
                    </h2>
                    <p className="mt-3 text-base text-slate-700 leading-relaxed">
                        Beim Termin vor Ort nehmen wir die Flächen auf, prüfen Untergrund und Restfeuchte und besprechen Format,
                        Verlegemuster und Details mit Ihnen. Auf dieser Grundlage erstellen wir das schriftliche Angebot mit
                        einem Festpreis für den darin beschriebenen Leistungsumfang.
                    </p>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
                    {PROMISES.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li
                                key={item.title}
                                className="group glass-surface p-6 rounded-[2rem] hover:-translate-y-0.5 hover:border-emerald-500/80 hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.14)] transition-all duration-300"
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

            {/* Kostenfaktoren */}
            <section className="py-20 bg-white border-y border-slate-200 relative z-10" aria-labelledby="faktoren-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="eyebrow mb-4">Aufwand</span>
                        <h2 id="faktoren-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Die wichtigsten Kostenfaktoren: Fläche, Format, Muster, Untergrund
                        </h2>
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {COST_FACTORS.map((item) => {
                            const Icon = item.icon;
                            return (
                                <li key={item.title} className="p-7 rounded-3xl bg-slate-50 border border-slate-200">
                                    <span className="icon-chip w-11 h-11 mb-4">
                                        <Icon className="w-5 h-5" />
                                    </span>
                                    <h3 className="font-black text-lg text-slate-900 mb-2">{item.title}</h3>
                                    <p className="text-sm text-slate-700 leading-relaxed">{item.desc}</p>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </section>

            {/* Positionen */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10" aria-labelledby="positionen-heading">
                <div className="text-center max-w-3xl mx-auto mb-10">
                    <span className="eyebrow eyebrow-sky mb-4">Angebot lesen</span>
                    <h2 id="positionen-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        Positionen im Angebot lesen: m², laufende Meter, Stück, Zulagen
                    </h2>
                    <p className="mt-3 text-base text-slate-700 leading-relaxed">
                        Ein gutes Angebot trennt die Leistungen nach ihrer Abrechnungseinheit. So sehen Sie genau, wofür Sie
                        bezahlen, und können Mengen mit dem Aufmaß abgleichen.
                    </p>
                </div>
                <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white">
                    <table className="w-full min-w-[560px] text-left text-sm">
                        <caption className="sr-only">Typische Abrechnungseinheiten in einem Angebot für Fliesenarbeiten</caption>
                        <thead className="bg-slate-100 text-slate-900">
                            <tr>
                                <th scope="col" className="p-4 font-black border-b border-slate-200">Einheit</th>
                                <th scope="col" className="p-4 font-black border-b border-slate-200">Art</th>
                                <th scope="col" className="p-4 font-black border-b border-slate-200">Typische Beispiele</th>
                            </tr>
                        </thead>
                        <tbody>
                            {POSITIONS.map((row) => (
                                <tr key={row.unit} className="border-b border-slate-200 last:border-b-0">
                                    <th scope="row" className="p-4 font-black text-emerald-800 tabular-nums">{row.unit}</th>
                                    <td className="p-4 font-bold text-slate-900">{row.label}</td>
                                    <td className="p-4 text-slate-700">{row.desc}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Rückbau + Vergleich */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <article className="glass-surface rounded-[2rem] p-8" aria-labelledby="rueckbau-heading">
                        <span className="icon-chip w-12 h-12 mb-5">
                            <Hammer className="w-6 h-6" />
                        </span>
                        <h2 id="rueckbau-heading" className="text-2xl font-black text-slate-900 mb-3">Rückbau, Entsorgung und Staubschutz</h2>
                        <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                            <p>
                                Muss ein alter Belag entfernt werden, hängt der Aufwand davon ab, wie fest er haftet, was darunter
                                liegt und wie viel Material abtransportiert wird. Rückbau und Entsorgung stehen deshalb als eigene
                                Positionen im Angebot.
                            </p>
                            <p>
                                Schutzmaßnahmen für bewohnte Räume – Abdeckungen, Staubschutzwände, geschützte Laufwege – gehören
                                bei Sanierungen dazu und werden ebenfalls ausgewiesen. Ob ein Überfliesen statt Rückbau möglich
                                ist, klären wir beim Aufmaß.
                            </p>
                        </div>
                        <Link href="/untergrund-abdichtung/fliesen-auf-fliesen" className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-emerald-800 hover:text-emerald-700">
                            Überfliesen oder Rückbau?
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </article>
                    <article className="glass-surface rounded-[2rem] p-8" aria-labelledby="vergleich-heading">
                        <span className="icon-chip w-12 h-12 mb-5">
                            <Scale className="w-6 h-6" />
                        </span>
                        <h2 id="vergleich-heading" className="text-2xl font-black text-slate-900 mb-3">Angebote fair vergleichen: worauf Sie achten sollten</h2>
                        <ul className="space-y-2.5 text-sm text-slate-700">
                            {COMPARE.map((item) => (
                                <li key={item} className="flex gap-2.5">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </article>
                </div>
                <p className="mt-6 text-sm text-slate-600 text-center max-w-3xl mx-auto">
                    Der Festpreis gilt für den im Angebot beschriebenen Leistungsumfang. Wie mit zusätzlichen Wünschen oder
                    Änderungen umgegangen wird, besprechen wir mit Ihnen vor der Ausführung; es gelten unsere{' '}
                    <Link href="/agb" className="font-semibold text-emerald-800 hover:text-emerald-700 hover:underline underline-offset-2">
                        AGB
                    </Link>
                    .
                </p>
            </section>

            {/* Steuerbonus */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 relative z-10" aria-labelledby="steuer-heading">
                <div className="rounded-[2rem] bg-sky-50 border border-sky-200 p-8 sm:p-10">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="icon-chip w-11 h-11">
                            <BookOpen className="w-5 h-5" />
                        </span>
                        <h2 id="steuer-heading" className="text-2xl font-black text-slate-900">Steuerbonus für Handwerkerleistungen im Kurzüberblick</h2>
                    </div>
                    <div className="space-y-3 text-base text-slate-700 leading-relaxed">
                        <p>
                            Für Renovierungs-, Erhaltungs- und Modernisierungsarbeiten im selbst genutzten Haushalt können
                            Privatpersonen nach § 35a Abs. 3 EStG eine Steuerermäßigung von 20 % der Arbeitskosten geltend
                            machen, begrenzt auf einen gesetzlichen Jahreshöchstbetrag. Begünstigt sind Arbeits-, Maschinen- und
                            Fahrtkosten, nicht das Material. Arbeiten im Neubau sind nicht begünstigt. Voraussetzung sind eine
                            Rechnung mit ausgewiesenem Arbeitsanteil und die unbare Zahlung, etwa per Überweisung.
                        </p>
                        <p className="text-sm text-slate-600">
                            Allgemeine Information, keine Steuerberatung. Ob und in welcher Höhe die Ermäßigung in Ihrem Fall
                            greift, klären Sie bitte mit Ihrer Steuerberatung.
                        </p>
                    </div>
                    <Link href="/blog/handwerkerbonus-fliesenarbeiten" className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-emerald-800 hover:text-emerald-700">
                        Handwerkerbonus für Fliesenarbeiten im Ratgeber
                        <ArrowRight className="w-4 h-4" />
                    </Link>
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
                                className="group block h-full glass-surface rounded-2xl p-5 hover:-translate-y-0.5 hover:border-emerald-500/80 transition-all duration-300"
                            >
                                <span className="flex items-center justify-between gap-2 font-black text-slate-900 group-hover:text-emerald-800 transition-colors">
                                    {link.label}
                                    <ArrowRight className="w-4 h-4 shrink-0 text-emerald-600" />
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
