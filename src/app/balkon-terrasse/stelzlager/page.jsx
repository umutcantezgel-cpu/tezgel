import React from 'react';
import Link from 'next/link';
import {
    ArrowRight,
    Phone,
    MessageCircle,
    Layers,
    Droplets,
    ShieldCheck,
    Ruler,
    Wrench,
    Sparkles,
    Gauge,
    Wind,
    Weight,
    TriangleAlert,
    BookOpen,
    CheckCircle2
} from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import { createMetadata } from '@/lib/metadata';
import QualityPromise from '@/components/sections/QualityPromise';

export const metadata = createMetadata({
    title: 'Terrassenplatten auf Stelzlagern verlegen lassen',
    description:
        'Stelzlager für Balkon und Dachterrasse: 2-cm-Feinsteinzeug auf höhenverstellbaren Lagern, offene Fugen, Höhenausgleich und abnehmbare Platten zur Kontrolle.',
    path: '/balkon-terrasse/stelzlager'
});

const CROSS_SECTION = [
    { label: '2-cm-Feinsteinzeugplatte', note: 'frostbeständig, liegt nur an den Ecken auf', className: 'bg-slate-200 border-slate-300 text-slate-900 h-9' },
    { label: 'Stelzlager mit Fugensteg', note: 'höhenverstellbar, gibt die offene Fuge vor', className: 'bg-orange-50 border-orange-200 text-orange-900 h-14' },
    { label: 'Schutzlage / Lagerpad', note: 'verteilt die Last, schont die Abdichtung', className: 'bg-stone-100 border-stone-200 text-slate-900 h-8' },
    { label: 'Abdichtung im Gefälle', note: 'führt das Wasser zu Ablauf oder Rinne', className: 'bg-slate-800 border-slate-900 text-white h-8' },
    { label: 'Tragender Untergrund', note: 'Balkonplatte, Dachdecke oder Betonplatte', className: 'bg-slate-100 border-slate-300 text-slate-900 h-10' }
];

const FEATURES = [
    {
        title: 'Punktförmige Auflage',
        desc: 'Jedes Lager trägt die Ecken von bis zu vier Platten. Die Platte überspannt den Raum dazwischen – deshalb kommen hier 2-cm-Platten mit hoher Bruchlast zum Einsatz, keine dünnen Innenfliesen.',
        icon: Layers
    },
    {
        title: 'Offene Fugen',
        desc: 'Der Fugensteg am Lagerkopf hält einen gleichmäßigen Abstand von wenigen Millimetern. Regenwasser läuft sofort durch die Fugen nach unten ab, statt auf dem Belag zu stehen.',
        icon: Droplets
    },
    {
        title: 'Kein Mörtelbett',
        desc: 'Ohne Mörtel unter dem Belag gibt es auch keine Quelle für Kalkausblühungen an Fugen und Stirnkanten. Das ist ein Vorteil des Systems, der einen fachgerechten Aufbau voraussetzt.',
        icon: Sparkles
    },
    {
        title: 'Zugängliche Abdichtung',
        desc: 'Die Abdichtung liegt geschützt unter dem Belag und bleibt erreichbar. Abläufe, Rinnen und Anschlüsse lassen sich kontrollieren, ohne einen Belag zu zerstören.',
        icon: ShieldCheck
    },
    {
        title: 'Stufenloser Höhenausgleich',
        desc: 'Über ein Gewinde lassen sich die Lager in der Höhe einstellen. So entsteht auf einem Untergrund mit Gefälle und kleinen Unebenheiten eine ebene, trittsichere Oberfläche.',
        icon: Ruler
    },
    {
        title: 'Sofort begehbar',
        desc: 'Da nichts abbinden oder trocknen muss, ist die Fläche direkt nach der Verlegung nutzbar. Das ist besonders bei bewohnten Häusern und Dachterrassen ein Plus.',
        icon: Gauge
    }
];

const REQUIREMENTS = [
    'Die Abdichtung ist dicht, funktionsfähig und liegt im Gefälle – Stelzlager ersetzen keine Abdichtung.',
    'Der Untergrund ist tragfähig. Bei Zweifeln an der Balkonplatte oder bei schweren Lasten beurteilt ein Tragwerksplaner die Statik.',
    'Die verfügbare Höhe bis zur Türschwelle reicht für Lager und Platte aus.',
    'Abläufe, Speier oder Rinnen sind vorhanden und bleiben frei zugänglich.',
    'Die Oberfläche der Abdichtung ist so beschaffen, dass Lagerpads flächig aufliegen können.'
];

const LIMITS = [
    {
        title: 'Windsog',
        desc: 'Auf hohen Gebäuden, an Gebäudeecken und auf frei liegenden Dachterrassen können Windkräfte lose aufliegende Platten anheben. Ob und wie der Belag gesichert werden muss, richtet sich nach Gebäude, Lage und den Angaben des Systemherstellers.',
        icon: Wind
    },
    {
        title: 'Punktlasten',
        desc: 'Schwere Pflanzkübel, Außenküchen oder Wasserbecken erzeugen hohe Einzellasten. Sie werden vor der Verlegung eingeplant, etwa mit zusätzlichen Lagern unter den betroffenen Platten.',
        icon: Weight
    },
    {
        title: 'Absturzsicherung',
        desc: 'Jeder zusätzliche Zentimeter Belagshöhe verringert die wirksame Höhe von Geländer oder Brüstung. Das ist bei der Planung zu prüfen; Arbeiten am Geländer gehören nicht zu unseren Leistungen.',
        icon: TriangleAlert
    }
];

const FURTHER_READING = [
    { label: 'Aufbauten im Vergleich: Balkon & Terrasse', href: '/balkon-terrasse' },
    { label: 'Balkonsanierung: Gefälle, Abdichtung, Randabschluss', href: '/balkon-terrasse/balkonsanierung' },
    { label: 'Barrierefreier Balkonaustritt', href: '/blog/barrierefreier-balkonaustritt' },
    { label: 'Leistung: Außenbereiche & Balkone', href: '/leistungen/aussen' }
];

export default function StelzlagerPage() {
    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            <div className="ambient-glow-orange -top-32 -left-32 opacity-70" />
            <div className="ambient-glow-red top-96 -right-24 opacity-60" />

            {/* Hero */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10" aria-labelledby="stelzlager-heading">
                <div className="ceramic-hero rounded-tile-2xl p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow">
                        <Layers className="w-3.5 h-3.5" />
                        Balkon- &amp; Terrassensanierung auf Stelzlagern
                    </span>
                    <h1 id="stelzlager-heading" className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                        Terrassenplatten auf Stelzlagern:{' '}
                        <span className="text-ceramic-gradient">frostsicher, eben, reparaturfreundlich</span>
                    </h1>
                    <p className="text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
                        2-cm-Feinsteinzeug auf höhenverstellbaren Lagern: Wasser läuft durch offene Fugen ab, die Abdichtung darunter
                        bleibt geschützt und zugänglich. Die bewährte Lösung für Balkon, Loggia und Dachterrasse ohne Mörtelbett.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
                        <Link href="/kontakt" className="btn-primary px-7 py-3.5 text-xs group">
                            Terrassensanierung anfragen
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <Link href="/balkon-terrasse" className="btn-ghost px-7 py-3.5 text-xs">
                            Aufbauten vergleichen
                        </Link>
                    </div>
                </div>
            </section>

            {/* Principle + cross-section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10" aria-labelledby="stelzlager-prinzip-heading">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    <div>
                        <span className="eyebrow mb-4">Das Prinzip</span>
                        <h2 id="stelzlager-prinzip-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            So funktioniert die Stelzlager-Verlegung
                        </h2>
                        <div className="mt-5 space-y-4 text-base text-slate-700 leading-relaxed">
                            <p>
                                Statt die Platten in ein Mörtelbett zu legen, stehen sie auf einzelnen, höhenverstellbaren Lagern. Das
                                Wasser fließt durch die offenen Fugen auf die Abdichtungsebene und wird dort im Gefälle zu Ablauf oder
                                Rinne geführt. Der Belag selbst bleibt trocken aufgelegt – Frost findet keine nasse Mörtelschicht, die er
                                aufsprengen könnte.
                            </p>
                            <p>
                                Wir setzen dafür 2-cm-Feinsteinzeug ein: dicht, frostbeständig und in dieser Stärke für die
                                punktförmige Auflage ausgelegt. Das Gefälle bleibt in der Abdichtung, die Lager gleichen es aus – die
                                Oberfläche liegt eben oder mit leichtem Restgefälle.
                            </p>
                        </div>
                    </div>

                    <figure className="glass-surface rounded-tile-lg p-6 sm:p-8">
                        <div className="space-y-2" aria-hidden="true">
                            {CROSS_SECTION.map((layer) => (
                                <div key={layer.label} className={`rounded-tile-sm border flex items-center px-4 ${layer.className}`}>
                                    <span className="text-xs font-black">{layer.label}</span>
                                </div>
                            ))}
                        </div>
                        <figcaption className="mt-5">
                            <p className="text-sm font-black text-slate-900 mb-2">Schematischer Aufbau von oben nach unten</p>
                            <ol className="space-y-1.5 text-sm text-slate-700 list-decimal list-inside marker:text-orange-600">
                                {CROSS_SECTION.map((layer) => (
                                    <li key={layer.label}>
                                        <span className="font-bold text-slate-900">{layer.label}</span> – {layer.note}
                                    </li>
                                ))}
                            </ol>
                        </figcaption>
                    </figure>
                </div>
            </section>

            {/* Features */}
            <section className="py-20 bg-white border-y border-slate-200 relative z-10" aria-labelledby="stelzlager-vorteile-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="eyebrow mb-4">Vorteile</span>
                        <h2 id="stelzlager-vorteile-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Freier Wasserablauf, kein Mörtel,{' '}
                            <span className="text-ceramic-gradient">zugängliche Abdichtung</span>
                        </h2>
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {FEATURES.map((item) => {
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
                </div>
            </section>

            {/* Requirements, height, revision */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <article className="glass-surface rounded-tile-lg p-7 lg:col-span-1" aria-labelledby="stelzlager-voraussetzungen-heading">
                        <span className="icon-chip w-11 h-11 mb-4">
                            <ShieldCheck className="w-5 h-5" />
                        </span>
                        <h2 id="stelzlager-voraussetzungen-heading" className="text-xl font-black text-slate-900 mb-4">
                            Voraussetzungen: tragfähig und abgedichtet
                        </h2>
                        <ul className="space-y-3">
                            {REQUIREMENTS.map((req) => (
                                <li key={req} className="flex gap-2.5 text-sm text-slate-700 leading-relaxed">
                                    <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" aria-hidden="true" />
                                    {req}
                                </li>
                            ))}
                        </ul>
                        <p className="mt-4 text-sm text-slate-700 leading-relaxed">
                            Ist die vorhandene Abdichtung schadhaft, wird sie vor dem neuen Belag erneuert – mehr dazu unter{' '}
                            <Link href="/balkon-terrasse/balkonsanierung" className="font-bold text-orange-800 hover:text-orange-700 hover:underline underline-offset-2">
                                Balkonsanierung
                            </Link>
                            .
                        </p>
                    </article>

                    <article className="glass-surface rounded-tile-lg p-7" aria-labelledby="stelzlager-hoehe-heading">
                        <span className="icon-chip w-11 h-11 mb-4">
                            <Ruler className="w-5 h-5" />
                        </span>
                        <h2 id="stelzlager-hoehe-heading" className="text-xl font-black text-slate-900 mb-4">
                            Höhenausgleich: Gefälle und Unebenheiten auffangen
                        </h2>
                        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                            <p>
                                Die Abdichtung muss Gefälle haben, damit Wasser abläuft – der Belag soll trotzdem eben sein. Die Lager
                                werden deshalb einzeln eingestellt: am Hochpunkt niedriger, zum Ablauf hin höher.
                            </p>
                            <p>
                                Für geneigte Untergründe gibt es Lagerköpfe, die sich der Neigung anpassen, damit die Platte satt
                                aufliegt. Kleinere Unebenheiten werden über Ausgleichsscheiben oder die Gewindeverstellung aufgefangen.
                            </p>
                            <p>
                                Die Gesamthöhe aus Lager und Platte muss zur Türschwelle passen. Wie niedrig der Übergang sein darf, erklärt
                                unser Beitrag zum{' '}
                                <Link href="/blog/barrierefreier-balkonaustritt" className="font-bold text-orange-800 hover:text-orange-700 hover:underline underline-offset-2">
                                    barrierefreien Balkonaustritt
                                </Link>
                                .
                            </p>
                        </div>
                    </article>

                    <article className="glass-surface rounded-tile-lg p-7" aria-labelledby="stelzlager-revision-heading">
                        <span className="icon-chip w-11 h-11 mb-4">
                            <Wrench className="w-5 h-5" />
                        </span>
                        <h2 id="stelzlager-revision-heading" className="text-xl font-black text-slate-900 mb-4">
                            Revision und Pflege
                        </h2>
                        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                            <p>
                                Einzelne Platten lassen sich mit einem Saugheber anheben. So erreichen Sie Abläufe und Rinnen, ohne den
                                Belag zu beschädigen, und eine beschädigte Platte wird einfach getauscht.
                            </p>
                            <p>
                                Halten Sie Abläufe und Fugen frei von Laub und Schmutz, damit das Wasser ungehindert abfließt. Einmal im
                                Jahr – am besten nach dem Laubfall – lohnt ein Blick unter die Platten vor dem Ablauf.
                            </p>
                            <p>
                                Die Oberfläche des Feinsteinzeugs reinigen Sie mit Wasser und einem milden Reiniger; Tipps dazu im
                                Beitrag{' '}
                                <Link href="/blog/fliesen-reinigen-pflegen" className="font-bold text-orange-800 hover:text-orange-700 hover:underline underline-offset-2">
                                    Fliesen richtig reinigen
                                </Link>
                                .
                            </p>
                        </div>
                    </article>
                </div>
            </section>

            {/* Limits */}
            <section className="py-20 bg-white border-y border-slate-200 relative z-10" aria-labelledby="stelzlager-grenzen-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="eyebrow mb-4">Ehrlich geplant</span>
                        <h2 id="stelzlager-grenzen-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Grenzen: Wind, Möblierung, Punktlasten
                        </h2>
                        <p className="mt-3 text-base text-slate-700 leading-relaxed">
                            Stelzlager sind kein Universalsystem. Diese Punkte klären wir vor der Verlegung – und ziehen, wo nötig,
                            Fachplaner hinzu.
                        </p>
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {LIMITS.map((item) => {
                            const Icon = item.icon;
                            return (
                                <li key={item.title} className="rounded-tile-lg bg-slate-50 border border-slate-200 p-7">
                                    <Icon className="w-7 h-7 text-amber-500 mb-4" aria-hidden="true" />
                                    <h3 className="font-black text-base text-slate-900 mb-2">{item.title}</h3>
                                    <p className="text-sm text-slate-700 leading-relaxed">{item.desc}</p>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </section>

            {/* CTA + further reading */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 relative z-10" aria-labelledby="stelzlager-cta-heading">
                <div className="ceramic-hero rounded-tile-2xl p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow">Kostenfreies Aufmaß</span>
                    <h2 id="stelzlager-cta-heading" className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight">
                        Passt ein Stelzlager-Belag auf Ihren Balkon?
                    </h2>
                    <p className="text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
                        Wir messen Aufbauhöhe und Gefälle, prüfen die Abdichtung und sagen Ihnen offen, ob das System passt oder
                        vorher saniert werden muss.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
                        <Link href="/kontakt" className="btn-primary px-7 py-3.5 text-xs group">
                            Terrassensanierung anfragen
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

                <nav className="mt-10 glass-surface rounded-tile-xl p-7" aria-labelledby="stelzlager-weiterlesen-heading">
                    <h2 id="stelzlager-weiterlesen-heading" className="flex items-center gap-2 font-black text-base text-slate-900 mb-4">
                        <BookOpen className="w-5 h-5 text-orange-600" aria-hidden="true" />
                        Weiterlesen
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
