import React from 'react';
import Link from 'next/link';
import {
    ArrowRight,
    Phone,
    MessageCircle,
    LayoutGrid,
    Layers,
    Mountain,
    Snowflake,
    Footprints,
    Weight,
    Trees,
    Grid3x3,
    Palette,
    Info,
    BookOpen
} from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import { createMetadata } from '@/lib/metadata';
import QualityPromise from '@/components/sections/QualityPromise';

export const metadata = createMetadata({
    title: 'Terrassenplatten: Keramik oder Naturstein im Freien',
    description:
        '2-cm-Feinsteinzeug oder Naturstein? Frostbeständigkeit, Rutschhemmung, Formate, Optiken und Pflege von Terrassenplatten für Balkon und Terrasse im Überblick.',
    path: '/balkon-terrasse/terrassenplatten'
});

const MATERIAL_ROWS = [
    {
        label: 'Wasseraufnahme',
        ceramic: 'Sehr gering (Feinsteinzeug: höchstens 0,5 %)',
        stone: 'Je nach Sorte sehr unterschiedlich'
    },
    {
        label: 'Frostbeständigkeit',
        ceramic: 'Geprüft nach DIN EN ISO 10545-12, bei Außenplatten Standard',
        stone: 'Sortenabhängig, geprüft nach DIN EN 12371 – Nachweis anfordern'
    },
    {
        label: 'Flecken',
        ceramic: 'Nimmt Öl, Rotwein und Grillfett kaum auf',
        stone: 'Offenporige Sorten brauchen eine Imprägnierung'
    },
    {
        label: 'Optik',
        ceramic: 'Gleichmäßig; Holz-, Beton- und Steinoptiken',
        stone: 'Jede Platte ein Unikat mit natürlichen Farbschwankungen'
    },
    {
        label: 'Pflege',
        ceramic: 'Wasser und milder Reiniger',
        stone: 'Steingerechte, meist pH-neutrale Pflege'
    }
];

const PROPERTIES = [
    {
        title: '2-cm-Feinsteinzeug',
        desc: 'Durchgesintert, dicht und in 2 cm Stärke tragfähig genug, um auf Stelzlagern oder im Splittbett frei zu spannen. Kratzfest, farbecht unter UV-Licht und unempfindlich gegen die meisten Haushaltsflecken.',
        icon: Layers
    },
    {
        title: 'Naturstein im Freien',
        desc: 'Granit, Quarzit oder Schiefer wirken im Außenbereich besonders natürlich. Ob eine Sorte frost- und tausalzbeständig ist, hängt vom Gestein ab – nicht vom Namen. Details auf unseren Natursteinseiten.',
        icon: Mountain
    },
    {
        title: 'Holzoptik draußen',
        desc: 'Keramik in Holzoptik muss im Freien frostbeständig sein. Die 2-cm-Stärke ist nötig für Stelzlager oder Splittbett; bei gebundener Verlegung ist frostbeständiges Feinsteinzeug in üblicher Stärke möglich.',
        icon: Trees
    },
    {
        title: 'Formate & Gewicht',
        desc: 'Gängig sind quadratische und rechteckige Formate wie 60 × 60 oder 60 × 120 cm. 2-cm-Feinsteinzeug wiegt rund 45 bis 50 kg pro Quadratmeter – relevant für Balkonlasten, Transport und Verlegung.',
        icon: Weight
    },
    {
        title: 'Oberflächen & Optiken',
        desc: 'Strukturierte Oberflächen verbessern die Trittsicherheit bei Nässe. Beton-, Stein- und Holzoptiken lassen sich passend zum Innenbelag wählen, damit Wohnraum und Terrasse ineinander übergehen.',
        icon: Palette
    }
];

const JOINTS = [
    {
        title: 'Offene Fugen',
        text: 'Bei Stelzlagern bleiben die Fugen offen. Der Fugensteg der Lager hält den Abstand, Wasser läuft direkt ab.'
    },
    {
        title: 'Gebundene Fugen im Splittbett',
        text: 'Im Splittbett kommen wasserdurchlässige Fugenmörtel oder ungebundene Fugenfüllungen zum Einsatz. Dichte Zementfugen würden das Wasser auf der Bettung stauen.'
    },
    {
        title: 'Elastische Fugen und Bewegungsfugen',
        text: 'An Hauswand, Brüstung und Einbauteilen sowie zur Feldbegrenzung größerer, gebunden verlegter Flächen nehmen Bewegungsfugen die Temperaturbewegungen des Belags auf.'
    }
];

const FURTHER_READING = [
    { label: 'Aufbauten im Vergleich: Balkon & Terrasse', href: '/balkon-terrasse' },
    { label: 'Feinsteinzeug oder Naturstein? Der Vergleich', href: '/blog/feinsteinzeug-oder-naturstein-vergleich' },
    { label: 'Rutschfeste Fliesen: Welche R-Klasse wo?', href: '/blog/rutschfeste-fliesen-r-klassen' },
    { label: 'Leistung: Außenbereiche & Balkone', href: '/leistungen/aussen' }
];

export default function TerrassenplattenPage() {
    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            <div className="ambient-glow-mint -top-32 -left-32 opacity-70" />
            <div className="ambient-glow-sky top-96 -right-24 opacity-60" />

            {/* Hero */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10" aria-labelledby="terrassenplatten-heading">
                <div className="ceramic-hero rounded-[3rem] p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow">
                        <LayoutGrid className="w-3.5 h-3.5" />
                        Materialratgeber Außenbeläge
                    </span>
                    <h1 id="terrassenplatten-heading" className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                        Terrassenplatten richtig wählen:{' '}
                        <span className="text-ceramic-gradient">Material, Stärke und Oberfläche</span>
                    </h1>
                    <p className="text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
                        Feinsteinzeug oder Naturstein, 2 cm oder übliche Stärke, glatt oder strukturiert: Welche Platte auf Ihren Balkon
                        oder Ihre Terrasse gehört, hängt von Aufbau, Nutzung und Pflegewunsch ab.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
                        <Link href="/kontakt" className="btn-primary px-7 py-3.5 text-xs group">
                            Beratung zu Terrassenplatten
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <Link href="/balkon-terrasse" className="btn-ghost px-7 py-3.5 text-xs">
                            Aufbauten vergleichen
                        </Link>
                    </div>
                </div>
            </section>

            {/* Material cards */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10" aria-labelledby="terrassenplatten-material-heading">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="eyebrow eyebrow-sky mb-4">Materialien</span>
                    <h2 id="terrassenplatten-material-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        Was Terrassenplatten draußen leisten müssen
                    </h2>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {PROPERTIES.map((item) => {
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
                <p className="mt-8 max-w-3xl mx-auto text-center text-sm text-slate-700 leading-relaxed">
                    Mehr zu frostbeständigen Natursteinen:{' '}
                    <Link href="/naturstein/granit" className="font-bold text-emerald-800 hover:text-emerald-700 hover:underline underline-offset-2">
                        Granit, Schiefer &amp; Quarzit
                    </Link>{' '}
                    und{' '}
                    <Link href="/naturstein" className="font-bold text-emerald-800 hover:text-emerald-700 hover:underline underline-offset-2">
                        Naturstein-Ratgeber mit Imprägnierung
                    </Link>
                    .
                </p>
            </section>

            {/* Material table + key values */}
            <section className="py-20 bg-white border-y border-slate-200 relative z-10" aria-labelledby="terrassenplatten-kennwerte-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="eyebrow mb-4">Kennwerte</span>
                        <h2 id="terrassenplatten-kennwerte-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Frostbeständigkeit und Rutschhemmung:{' '}
                            <span className="text-ceramic-gradient">worauf es ankommt</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        <article className="rounded-[2rem] bg-slate-50 border border-slate-200 p-7">
                            <Snowflake className="w-7 h-7 text-emerald-600 mb-4" aria-hidden="true" />
                            <h3 className="font-black text-lg text-slate-900 mb-2">Frostbeständigkeit</h3>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                Keramische Fliesen werden nach DIN EN ISO 10545-12 auf Frostbeständigkeit geprüft; Feinsteinzeug mit
                                seiner sehr geringen Wasseraufnahme besteht diese Prüfung in der Regel. Bei Naturstein entscheidet die
                                Sorte – maßgeblich ist die Frostwiderstandsprüfung nach DIN EN 12371. Lassen Sie sich den Nachweis
                                für die konkrete Platte zeigen.
                            </p>
                        </article>
                        <article className="rounded-[2rem] bg-slate-50 border border-slate-200 p-7">
                            <Footprints className="w-7 h-7 text-emerald-600 mb-4" aria-hidden="true" />
                            <h3 className="font-black text-lg text-slate-900 mb-2">Rutschhemmung</h3>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                Die Rutschhemmung wird nach DIN EN 16165 ermittelt: R9 bis R13 für das Begehen mit Schuhen, A, B und C
                                für barfuß begangene Nassbereiche. Für private Terrassen und Balkone gibt es keine feste Vorgabe; wir
                                empfehlen strukturierte Oberflächen ab R11, an Pool-Rändern zusätzlich eine Barfuß-Klasse. Mehr im
                                Beitrag{' '}
                                <Link href="/blog/rutschfeste-fliesen-r-klassen" className="font-bold text-emerald-800 hover:text-emerald-700 hover:underline underline-offset-2">
                                    Rutschfeste Fliesen
                                </Link>
                                .
                            </p>
                        </article>
                    </div>

                    <div className="overflow-x-auto rounded-3xl border border-slate-200">
                        <table className="w-full min-w-[560px] text-left text-sm">
                            <caption className="sr-only">Feinsteinzeug und Naturstein im Außenbereich</caption>
                            <thead className="bg-slate-100 text-slate-900">
                                <tr>
                                    <th scope="col" className="px-5 py-4 font-black border-b border-slate-200">Eigenschaft</th>
                                    <th scope="col" className="px-5 py-4 font-black border-b border-slate-200">2-cm-Feinsteinzeug</th>
                                    <th scope="col" className="px-5 py-4 font-black border-b border-slate-200">Naturstein</th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-700">
                                {MATERIAL_ROWS.map((row) => (
                                    <tr key={row.label} className="border-b border-slate-200 last:border-b-0 even:bg-slate-50">
                                        <th scope="row" className="px-5 py-4 font-bold text-slate-900 align-top">{row.label}</th>
                                        <td className="px-5 py-4 align-top leading-relaxed">{row.ceramic}</td>
                                        <td className="px-5 py-4 align-top leading-relaxed">{row.stone}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="mt-5 text-sm text-slate-700 leading-relaxed">
                        Den ausführlichen Vergleich beider Materialien – auch für Innenräume – lesen Sie in{' '}
                        <Link href="/blog/feinsteinzeug-oder-naturstein-vergleich" className="font-bold text-emerald-800 hover:text-emerald-700 hover:underline underline-offset-2">
                            Feinsteinzeug oder Naturstein? Der ehrliche Vergleich
                        </Link>
                        .
                    </p>
                </div>
            </section>

            {/* Ground-level terrace + joints */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    <article className="lg:col-span-2 glass-surface rounded-[2rem] p-7" aria-labelledby="terrassenplatten-erdreich-heading">
                        <span className="icon-chip w-11 h-11 mb-4">
                            <Trees className="w-5 h-5" />
                        </span>
                        <h2 id="terrassenplatten-erdreich-heading" className="text-xl font-black text-slate-900 mb-4">
                            Terrasse auf Erdreich: der Unterbau als Voraussetzung
                        </h2>
                        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                            <p>
                                Die beste Platte sackt ab oder kippelt, wenn der Unterbau nachgibt. Eine Terrasse auf Erdreich braucht
                                deshalb eine tragfähige, frostsichere und verdichtete Tragschicht, die Wasser versickern lässt, und ein
                                Gefälle vom Haus weg.
                            </p>
                            <p>
                                Wie dieser Unterbau vorhanden ist oder hergestellt werden muss, klären wir beim Aufmaß. Erdarbeiten und
                                Tragschicht sind die Voraussetzung für unseren Belag – den Belag selbst verlegen wir im Splittbett oder
                                auf Stelzlagern.
                            </p>
                        </div>
                    </article>

                    <div className="lg:col-span-3">
                        <span className="eyebrow eyebrow-sky mb-4">
                            <Grid3x3 className="w-3.5 h-3.5" />
                            Fugen
                        </span>
                        <h2 id="terrassenplatten-fugen-heading" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-6">
                            Fugen außen: offen, gebunden oder elastisch
                        </h2>
                        <ul className="space-y-4">
                            {JOINTS.map((joint) => (
                                <li key={joint.title} className="rounded-2xl bg-white border border-slate-200 p-5">
                                    <h3 className="font-black text-base text-slate-900 mb-1">{joint.title}</h3>
                                    <p className="text-sm text-slate-700 leading-relaxed">{joint.text}</p>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-6 flex gap-3 rounded-2xl bg-sky-50 border border-sky-200 p-5 text-sm text-slate-700 leading-relaxed">
                            <Info className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" aria-hidden="true" />
                            <p>
                                Bei gebundener Verlegung auf einer Verbundabdichtung werden die Fugen geschlossen und mit frostbeständigem
                                Fugenmörtel verfüllt; das Wasser läuft dann über die Belagsoberfläche im Gefälle ab.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA + further reading */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" aria-labelledby="terrassenplatten-cta-heading">
                <div className="ceramic-hero rounded-[3rem] p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow">Beratung &amp; Aufmaß</span>
                    <h2 id="terrassenplatten-cta-heading" className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight">
                        Die passende Platte für Ihren Aufbau
                    </h2>
                    <p className="text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
                        Wir stimmen Material, Stärke, Format und Oberfläche auf Ihre Fläche ab und sagen Ihnen, welche Platte zum
                        gewählten Aufbau passt.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
                        <Link href="/kontakt" className="btn-primary px-7 py-3.5 text-xs group">
                            Terrassenplatten anfragen
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className="btn-ghost px-7 py-3.5 text-xs">
                            <Phone className="w-4 h-4 text-emerald-700" />
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

                <nav className="mt-10 glass-surface rounded-[2rem] p-7" aria-labelledby="terrassenplatten-weiterlesen-heading">
                    <h2 id="terrassenplatten-weiterlesen-heading" className="flex items-center gap-2 font-black text-base text-slate-900 mb-4">
                        <BookOpen className="w-5 h-5 text-emerald-600" aria-hidden="true" />
                        Weiterlesen
                    </h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {FURTHER_READING.map((link) => (
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
                </nav>
            </section>

            <QualityPromise />
        </div>
    );
}
