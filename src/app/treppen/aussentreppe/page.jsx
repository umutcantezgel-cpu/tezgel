import React from 'react';
import Link from 'next/link';
import {
    Trees,
    ArrowRight,
    Phone,
    Snowflake,
    Droplets,
    Footprints,
    Ruler,
    Hammer,
    AlertTriangle,
    Layers,
    Mountain,
    CheckCircle2
} from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import { createMetadata } from '@/lib/metadata';
import QualityPromise from '@/components/sections/QualityPromise';

export const metadata = createMetadata({
    title: 'Außentreppe fliesen & sanieren: frostsicher, rutschfest',
    description:
        'Außentreppen und Eingangspodeste dauerhaft belegen: frostbeständige Platten, Rutschhemmung, Gefälle, Abdichtung und Stufenkanten – plus typische Schäden.',
    path: '/treppen/aussentreppe'
});

const STRESS = [
    {
        icon: Droplets,
        title: 'Wasser',
        desc: 'Regen, Schnee und Tauwasser treffen jede Stufe direkt. Dringt Wasser über Fugen oder Hohlstellen unter den Belag, fehlt ihm oft der Weg nach draußen.'
    },
    {
        icon: Snowflake,
        title: 'Frost-Tau-Wechsel',
        desc: 'Gefriert eingedrungenes Wasser, dehnt es sich aus und sprengt Platten, Kanten und Mörtelbett. Gerade Winter mit häufigem Wechsel von Frost und Tauwetter setzen Außentreppen zu.'
    },
    {
        icon: Ruler,
        title: 'Temperatur und Sonne',
        desc: 'Belag und Untergrund dehnen sich bei Sonneneinstrahlung unterschiedlich stark. Ohne flexiblen Kleber und fachgerechte Fugen entstehen Spannungen und Ablösungen.'
    },
    {
        icon: Footprints,
        title: 'Nässe und Schmutz',
        desc: 'Nasses Laub, Moos und Eis machen Stufen rutschig. Die Oberfläche muss auch nass griffig sein und die Stufenkante gut erkennbar bleiben.'
    }
];

const DAMAGE = [
    { title: 'Frostabplatzungen', desc: 'Abgesprengte Kanten und Oberflächen – meist über Hohlstellen, in die Wasser eindringen konnte, oder bei nicht frostbeständigem Material.' },
    { title: 'Lose Platten', desc: 'Hohl klingende oder wackelnde Platten zeigen, dass der Verbund zum Untergrund verloren ist. Unter ihnen steht oft Wasser.' },
    { title: 'Ausblühungen', desc: 'Weiße Kalkschleier an Fugen und Setzstufen entstehen, wenn Wasser durch Mörtelbett oder Beton wandert und Kalk an die Oberfläche transportiert.' },
    { title: 'Ausgewaschene Fugen', desc: 'Offene oder bröselnde Fugen lassen noch mehr Wasser unter den Belag – der Schaden beschleunigt sich von Winter zu Winter.' }
];

const BUILDUP = [
    'Tragfähiger, frostsicher gegründeter Unterbau – Beton- oder Fundamentarbeiten sowie die Statik gehören nicht zu unseren Leistungen und werden bei Bedarf vorab von einem Fachbetrieb ausgeführt',
    'Leichtes Gefälle auf Podest und Trittstufen nach vorn bzw. zur Seite, damit Wasser nicht stehen bleibt',
    'Abdichtung im Verbund unter dem Belag, wo der Untergrund vor eindringendem Wasser geschützt werden muss – etwa bei Podesten über Kellerräumen',
    'Vollflächige, hohlraumarme Verlegung mit flexiblem, für außen geeignetem Kleber (z. B. C2 nach DIN EN 12004) und frostbeständigem Fugenmörtel',
    'Überstand der Trittstufe mit ausgebildeter Tropfkante oder passendem Profil, damit Wasser an der Vorderkante abtropft und nicht in die Setzstufe läuft'
];

const RENOVATION = [
    { t: 'Schadensbild aufnehmen', d: 'Klopfprobe, Zustand von Fugen, Kanten und Unterbau, Wasserwege und Anschlüsse an Haus und Tür.' },
    { t: 'Altbelag zurückbauen', d: 'Lose und hohle Platten sowie mürbes Mörtelbett werden entfernt, bis ein tragfähiger Untergrund vorliegt.' },
    { t: 'Untergrund vorbereiten', d: 'Ausbrüche schließen, Gefälle herstellen und – wo nötig – eine Verbundabdichtung aufbringen.' },
    { t: 'Neu belegen und verfugen', d: 'Stufen einzeln zuschneiden, vollflächig verlegen, frostbeständig verfugen und Anschlüsse elastisch schließen.' }
];

const WEITERLESEN = [
    { title: 'Außenbereiche', path: '/leistungen/aussen', desc: 'Balkon, Terrasse und Eingang' },
    { title: 'Untergrund & Abdichtung', path: '/leistungen/untergrund', desc: 'Das Fundament jedes dauerhaften Belags' },
    { title: 'Kantenlösungen im Vergleich', path: '/treppen/innentreppe', desc: 'Gehrung, Profil oder Stufenplatte' },
    { title: 'Häufige Fragen', path: '/faq', desc: 'Antworten rund um Fliesen und Ablauf' }
];

export default function AussentreppePage() {
    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            <div className="ambient-glow-orange -top-32 -left-32 opacity-70" />
            <div className="ambient-glow-red top-96 -right-24 opacity-60" />

            {/* Hero */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10" aria-labelledby="aussentreppe-heading">
                <div className="ceramic-hero rounded-tile-2xl p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow">
                        <Trees className="w-3.5 h-3.5" />
                        Treppen &middot; Außenbereich
                    </span>
                    <h1 id="aussentreppe-heading" className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                        Außentreppe und Hauseingang:{' '}
                        <span className="text-ceramic-gradient">frostsicher und trittsicher belegt</span>
                    </h1>
                    <p className="text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
                        Eingangsstufen, Podeste und Gartentreppen müssen Regen, Frost und Streusalz aushalten. Ob ein Belag
                        viele Winter übersteht, entscheidet sich weniger an der Platte als am Aufbau darunter: Gefälle,
                        Abdichtung, hohlraumarme Verlegung und eine Stufenkante, an der Wasser abtropfen kann.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
                        <Link href="/kontakt" className="btn-primary px-7 py-3.5 text-xs group">
                            Außentreppe begutachten lassen
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <Link href="/treppen" className="btn-ghost px-7 py-3.5 text-xs">
                            Alle Treppentypen
                        </Link>
                    </div>
                </div>
            </section>

            {/* Beanspruchung */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10" aria-labelledby="beanspruchung-heading">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="eyebrow mb-4">Besondere Beanspruchung</span>
                    <h2 id="beanspruchung-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        Warum Außentreppen mehr aushalten müssen
                    </h2>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {STRESS.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li
                                key={item.title}
                                className="group glass-surface p-7 rounded-tile-lg hover:-translate-y-0.5 hover:border-orange-500/80 hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.14)] transition-all duration-300"
                            >
                                <span className="icon-chip w-11 h-11 mb-4">
                                    <Icon className="w-5 h-5" />
                                </span>
                                <h3 className="font-black text-base text-slate-900 mb-2 group-hover:text-orange-950 transition-colors">{item.title}</h3>
                                <p className="text-sm text-slate-700 leading-relaxed">{item.desc}</p>
                            </li>
                        );
                    })}
                </ul>
            </section>

            {/* Typische Schäden */}
            <section className="py-20 bg-white border-y border-slate-200 relative z-10" aria-labelledby="schaeden-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="eyebrow mb-4">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            Typische Schäden
                        </span>
                        <h2 id="schaeden-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Frostabplatzungen, lose Platten, Ausblühungen
                        </h2>
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {DAMAGE.map((item) => (
                            <li key={item.title} className="p-7 rounded-tile-lg bg-slate-50 border border-slate-200">
                                <h3 className="font-black text-base text-slate-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-slate-700 leading-relaxed">{item.desc}</p>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-8 text-sm text-slate-700 leading-relaxed max-w-4xl mx-auto text-center">
                        Die Ursache eines Schadens klären wir vor Ort, bevor wir eine Lösung vorschlagen – mehr dazu unter{' '}
                        <Link href="/schadensanalyse" className="font-bold text-orange-800 hover:text-orange-700 hover:underline underline-offset-2">
                            Schadensanalyse
                        </Link>
                        .
                    </p>
                </div>
            </section>

            {/* Aufbau */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10" aria-labelledby="aufbau-heading">
                <div className="text-center max-w-3xl mx-auto mb-10">
                    <span className="eyebrow mb-4">
                        <Layers className="w-3.5 h-3.5" />
                        Aufbau
                    </span>
                    <h2 id="aufbau-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        Gefälle, Abdichtung, Entwässerung
                    </h2>
                </div>
                <ul className="glass-surface rounded-tile-xl p-7 sm:p-10 space-y-4">
                    {BUILDUP.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed">
                            <CheckCircle2 className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
                <p className="mt-6 text-sm text-slate-700 leading-relaxed text-center">
                    Auch außen gilt: Die Steigungen sollen gleichmäßig bleiben. Wie Belagdicken und Ausgleich geplant
                    werden, lesen Sie im{' '}
                    <Link href="/treppen" className="font-bold text-orange-800 hover:text-orange-700 hover:underline underline-offset-2">
                        Treppen-Überblick
                    </Link>
                    .
                </p>
            </section>

            {/* Material & Trittsicherheit */}
            <section className="py-20 bg-white border-y border-slate-200 relative z-10" aria-labelledby="material-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="eyebrow mb-4">Material &amp; Trittsicherheit</span>
                        <h2 id="material-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Frostfeste Keramik, Naturstein oder Blockstufe
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="glass-surface p-7 rounded-tile-lg">
                            <span className="icon-chip w-11 h-11 mb-4">
                                <Snowflake className="w-5 h-5" />
                            </span>
                            <h3 className="font-black text-base text-slate-900 mb-2">Frostbeständiges Feinsteinzeug</h3>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                Feinsteinzeug nimmt kaum Wasser auf und ist deshalb in der Regel frostbeständig – maßgeblich
                                ist die Herstellerangabe zur Frostbeständigkeit. Für Stufen im Freien empfiehlt sich als
                                Richtwert eine Rutschhemmung von R11 (Prüfung nach DIN EN 16165).
                            </p>
                        </div>
                        <div className="glass-surface p-7 rounded-tile-lg">
                            <span className="icon-chip w-11 h-11 mb-4">
                                <Mountain className="w-5 h-5" />
                            </span>
                            <h3 className="font-black text-base text-slate-900 mb-2">Naturstein</h3>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                Ob ein Naturstein frostbeständig ist, hängt von der Sorte und ihrer Wasseraufnahme ab – Granit
                                und viele Quarzite sind gut geeignet, manche Kalksteine nicht. Geflammte oder gestockte
                                Oberflächen sind außen deutlich griffiger als polierte.
                            </p>
                        </div>
                        <div className="glass-surface p-7 rounded-tile-lg">
                            <span className="icon-chip w-11 h-11 mb-4">
                                <Hammer className="w-5 h-5" />
                            </span>
                            <h3 className="font-black text-base text-slate-900 mb-2">Blockstufen als Konstruktion</h3>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                Blockstufen sind massive Stufen aus Naturstein oder Beton, die als eigene Treppenkonstruktion
                                auf ein Fundament bzw. in ein Mörtelbett gesetzt werden – kein Belag auf einer bestehenden
                                Treppe. Sie eignen sich besonders für Hauseingänge und Gartentreppen.
                            </p>
                        </div>
                    </div>
                    <p className="mt-8 text-sm text-slate-700 leading-relaxed max-w-4xl mx-auto text-center">
                        Für die Stufenkante gelten außen zusätzlich Frost und Wasserablauf: Gehrungskanten brauchen
                        besonders dichtes Material und einen vollflächigen Verbund, Profile müssen für außen geeignet sein.
                        Den allgemeinen Vergleich der Kantenlösungen finden Sie unter{' '}
                        <Link href="/treppen/innentreppe" className="font-bold text-orange-800 hover:text-orange-700 hover:underline underline-offset-2">
                            Innentreppe fliesen
                        </Link>
                        .
                    </p>
                </div>
            </section>

            {/* Sanierung Schritt für Schritt */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10" aria-labelledby="sanierung-heading">
                <div className="ceramic-hero rounded-tile-xl p-8 sm:p-12 space-y-5">
                    <span className="eyebrow eyebrow-neutral">Sanierung</span>
                    <h2 id="sanierung-heading" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                        Außentreppe sanieren – Schritt für Schritt
                    </h2>
                    <ol className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {RENOVATION.map((step, idx) => (
                            <li key={step.t} className="rounded-tile-md bg-white/80 border border-slate-200 p-5">
                                <span className="font-display block text-3xl font-black tabular-nums text-orange-600/40 mb-2" aria-hidden="true">
                                    {String(idx + 1).padStart(2, '0')}
                                </span>
                                <h3 className="font-black text-slate-900 mb-1">{step.t}</h3>
                                <p className="text-sm text-slate-700 leading-relaxed">{step.d}</p>
                            </li>
                        ))}
                    </ol>
                    <div className="flex flex-wrap gap-3.5 pt-2">
                        <Link href="/kontakt" className="btn-primary px-7 py-3.5 text-xs">
                            Vor-Ort-Termin anfragen
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className="btn-ghost px-7 py-3.5 text-xs">
                            <Phone className="w-4 h-4 text-orange-700" />
                            {COMPANY_DATA.contact.phone}
                        </a>
                    </div>
                </div>
            </section>

            {/* Weiterlesen */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 relative z-10" aria-labelledby="aussentreppe-weiterlesen-heading">
                <h2 id="aussentreppe-weiterlesen-heading" className="text-2xl font-black text-slate-900 tracking-tight mb-6">
                    Weiterlesen
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {WEITERLESEN.map((link) => (
                        <li key={link.path}>
                            <Link
                                href={link.path}
                                className="group glass-surface rounded-tile-md p-5 h-full block hover:-translate-y-0.5 hover:border-orange-500/80 transition-all duration-300"
                            >
                                <span className="font-black text-slate-900 group-hover:text-orange-950 transition-colors flex items-center gap-1">
                                    {link.title}
                                    <ArrowRight className="w-4 h-4" />
                                </span>
                                <span className="block mt-1 text-sm text-slate-700">{link.desc}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>

            <QualityPromise />
        </div>
    );
}
