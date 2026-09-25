import React from 'react';
import Link from 'next/link';
import {
    ArrowRight,
    Phone,
    Ruler,
    Scissors,
    Layers,
    Footprints,
    Sparkles,
    Home,
    CheckCircle2,
    Star,
    Quote
} from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import { REVIEWS } from '@/config/reviews';
import { createMetadata } from '@/lib/metadata';
import QualityPromise from '@/components/sections/QualityPromise';

export const metadata = createMetadata({
    title: 'Innentreppe fliesen lassen: Stufen, Kanten, Sockel',
    description:
        'Betontreppe im Haus fliesen: Tritt- und Setzstufen aus Feinsteinzeug oder Naturstein, Gehrungskanten oder Stufenprofile im Vergleich, Treppensockel und Podeste.',
    path: '/treppen/innentreppe'
});

const STEP_FACTS = [
    {
        icon: Ruler,
        title: 'Jede Stufe einzeln aufmessen',
        desc: 'Auch Betonfertigteiltreppen haben Maßabweichungen. Wir messen Breite, Auftritt und Steigung jeder Stufe und schneiden Tritt- und Setzstufen individuell zu – bei gewendelten Treppen mit Schablone.'
    },
    {
        icon: Layers,
        title: 'Formate passend zur Stufe',
        desc: 'Ideal ist ein Format, das die Stufenbreite ohne oder mit nur einer mittigen Fuge überbrückt. Die Fugen der Setzstufe laufen dann in einer Achse mit denen der Trittstufe.'
    },
    {
        icon: Home,
        title: 'Keramik oder Naturstein',
        desc: 'Feinsteinzeug ist dicht, abriebfest und pflegeleicht. Naturstein wirkt massiv und warm, braucht je nach Sorte aber Imprägnierung und schonende Pflege. Natursteinstufen lässt man meist vom Steinlieferanten nach Aufmaß zuschneiden.'
    },
    {
        icon: CheckCircle2,
        title: 'Vollflächig verklebt',
        desc: 'Trittstufen werden hohlraumarm im Buttering-Floating-Verfahren mit flexiblem Fliesenkleber (z. B. Klasse C2 nach DIN EN 12004) verlegt. Hohlstellen unter der Vorderkante sind die häufigste Ursache für gebrochene Stufenkanten.'
    }
];

const EDGES = [
    {
        title: 'Gehrungskante',
        how: 'Tritt- und Setzstufe werden an der Kante im 45°-Winkel geschnitten und passgenau gestoßen; die Kante wird leicht gefast.',
        pros: 'Durchgehende Materialoptik ohne sichtbares Metall; wirkt wie aus dem Vollen gearbeitet.',
        cons: 'Hoher Schneidaufwand, nur mit dichtem, durchgefärbtem Material wirklich schön; die Kante ist stoßempfindlicher als mit Profil.'
    },
    {
        title: 'Stufenprofil',
        how: 'Ein Treppenkantenprofil – etwa aus Edelstahl – wird beim Verlegen mit eingebettet und schließt die Vorderkante ab.',
        pros: 'Schützt die Fliesenkante vor Abplatzungen, deutlich sichtbare Stufenkante; manche Profile haben eine rutschhemmende Einlage.',
        cons: 'Metall bleibt sichtbar und prägt die Optik; das Profil muss zur Belagdicke passen.'
    },
    {
        title: 'Stufenplatte',
        how: 'Fertige Stufenfliesen oder Natursteinplatten mit werkseitig bearbeiteter Vorderkante (gerundet oder gefast).',
        pros: 'Robuste, ab Werk saubere Kante; beim Naturstein massiver Eindruck.',
        cons: 'Abmessungen durch das Sortiment bzw. den Zuschnitt vorgegeben; passende Bodenfliesen im gleichen Dekor sind nicht immer verfügbar.'
    }
];

const MORE = [
    {
        icon: Scissors,
        title: 'Treppensockel: gestufte Sockel sauber schneiden',
        text: 'An der Wand entlang folgt der Sockel dem Treppenverlauf. Als gestufter Sockel (Sägezahnsockel) wird er aus Fliesenstreifen passend zu jeder Stufe geschnitten, sodass Sockelfugen auf die Stufenfugen treffen. Alternativ läuft ein schräger Wandsockel parallel zur Lauflinie. Die Anschlussfuge zwischen Sockel und Stufe wird elastisch geschlossen.'
    },
    {
        icon: Layers,
        title: 'Podeste und Anschluss an den angrenzenden Boden',
        text: 'Podeste und Austritte werden im selben Fugenraster wie die Stufen geplant. Wo Treppe und Flurboden aneinanderstoßen, entscheiden Belagdicke und Aufbauhöhe, ob die letzte Steigung passt. Deshalb planen wir Treppe und Boden idealerweise gemeinsam.'
    },
    {
        icon: Home,
        title: 'Durchgängige Optik mit dem Wohnbereich',
        text: 'Wer Flur, Diele und Treppe mit derselben Fliese belegt, erhält eine ruhige, großzügige Wirkung. Bei großformatigen Bodenfliesen schneiden wir Tritt- und Setzstufen aus demselben Material – so bleibt die Farbwirkung einheitlich.'
    },
    {
        icon: Footprints,
        title: 'Trittsicherheit und Pflege im Alltag',
        text: 'Auf Innentreppen empfehlen sich matte bzw. leicht strukturierte Oberflächen; hochglanzpolierte Stufen werden mit Socken oder nassen Sohlen rutschig. Eine kontrastreiche Stufenkante erleichtert die Orientierung. Feinsteinzeug reinigen Sie mit pH-neutralem Reiniger, Naturstein mit einem auf die Sorte abgestimmten Pflegemittel.'
    }
];

const WEITERLESEN = [
    { title: 'Treppen im Überblick', path: '/treppen', desc: 'Voraussetzungen, Belagsarten und Steigungen' },
    { title: 'Wohnbereiche fliesen', path: '/leistungen/wohnen', desc: 'Flur, Wohnraum und Treppe aus einem Guss' },
    { title: 'Verlegemuster & Abschlüsse', path: '/fliesen/verlegemuster', desc: 'Fugenbild, Kanten und Sockel' },
    { title: 'Rutschhemmung', path: '/blog/rutschfeste-fliesen-r-klassen', desc: 'R-Klassen nach DIN EN 16165 erklärt' }
];

export default function InnentreppePage() {
    const review = REVIEWS.find((r) => r.id === 'sara-j');

    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            <div className="ambient-glow-orange -top-32 -left-32 opacity-70" />
            <div className="ambient-glow-warm top-96 -right-24 opacity-60" />

            {/* Hero */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10" aria-labelledby="innentreppe-heading">
                <div className="ceramic-hero rounded-tile-2xl p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow eyebrow-orange">
                        <Home className="w-3.5 h-3.5 text-orange-600" />
                        Treppen &middot; Innenbereich
                    </span>
                    <h1 id="innentreppe-heading" className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                        Innentreppe fliesen:{' '}
                        <span className="text-ceramic-gradient">Stufen, Setzstufen und Sockel aus einem Guss</span>
                    </h1>
                    <p className="text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
                        Ob Neubau oder Renovierung: Eine massive Betontreppe im Haus lässt sich mit Feinsteinzeug oder
                        Naturstein passend zum Wohnbereich belegen. Entscheidend sind exaktes Aufmaß, die richtige
                        Kantenlösung und eine vollflächige Verlegung.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
                        <Link href="/kontakt" className="btn-primary px-7 py-3.5 text-xs group">
                            Aufmaß für Ihre Treppe anfragen
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <Link href="/treppen" className="btn-ghost px-7 py-3.5 text-xs">
                            Alle Treppentypen
                        </Link>
                    </div>
                    <p className="text-xs text-slate-600 pt-2">
                        Voraussetzung ist eine tragfähige Massivtreppe – Holz- und Stahltreppen sind für starre Beläge nicht
                        ohne Weiteres geeignet.{' '}
                        <Link href="/treppen" className="font-bold text-orange-700 hover:text-orange-600 hover:underline underline-offset-2">
                            Was sich belegen lässt
                        </Link>
                    </p>
                </div>
            </section>

            {/* Tritt- und Setzstufen */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10" aria-labelledby="stufen-heading">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="eyebrow eyebrow-orange mb-4">Tritt- und Setzstufen</span>
                    <h2 id="stufen-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        Aufmaß, Formate und Material
                    </h2>
                    <p className="mt-3 text-base text-slate-700 leading-relaxed">
                        Eine Treppe mit n Steigungen hat n Setzstufen und meist n−1 Trittstufen. Belegt wird jeweils der
                        Auftritt einschließlich Überstand an der Vorderkante sowie die senkrechte Setzstufe.
                    </p>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {STEP_FACTS.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li
                                key={item.title}
                                className="group glass-surface p-7 rounded-tile-2xl hover:-translate-y-0.5 hover:border-orange-500/80 hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.14)] transition-all duration-300"
                            >
                                <span className="icon-chip w-11 h-11 mb-4 text-orange-600">
                                    <Icon className="w-5 h-5" />
                                </span>
                                <h3 className="font-black text-base text-slate-900 mb-2 group-hover:text-orange-700 transition-colors">{item.title}</h3>
                                <p className="text-sm text-slate-700 leading-relaxed">{item.desc}</p>
                            </li>
                        );
                    })}
                </ul>
            </section>

            {/* Kantenlösungen */}
            <section className="py-20 bg-white border-y border-slate-200 relative z-10" aria-labelledby="kanten-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="eyebrow eyebrow-orange mb-4">Kantenlösungen im Vergleich</span>
                        <h2 id="kanten-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Gehrung, Profil oder Stufenplatte?
                        </h2>
                        <p className="mt-3 text-base text-slate-700 leading-relaxed">
                            Die Vorderkante ist die am stärksten beanspruchte Stelle jeder Stufe – und prägt die Optik der
                            ganzen Treppe. Welche Lösung passt, hängt von Material, Nutzung und Geschmack ab.
                        </p>
                    </div>

                    <div className="overflow-x-auto rounded-tile-xl border border-slate-200">
                        <table className="w-full min-w-[720px] text-left text-sm">
                            <thead className="bg-slate-100 text-slate-900">
                                <tr>
                                    <th scope="col" className="p-4 font-black border-b border-slate-200">Lösung</th>
                                    <th scope="col" className="p-4 font-black border-b border-slate-200">Ausführung</th>
                                    <th scope="col" className="p-4 font-black border-b border-slate-200">Vorteile</th>
                                    <th scope="col" className="p-4 font-black border-b border-slate-200">Zu beachten</th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-700">
                                {EDGES.map((edge) => (
                                    <tr key={edge.title} className="border-b border-slate-200 last:border-b-0 align-top">
                                        <th scope="row" className="p-4 font-black text-slate-900">{edge.title}</th>
                                        <td className="p-4 leading-relaxed">{edge.how}</td>
                                        <td className="p-4 leading-relaxed">{edge.pros}</td>
                                        <td className="p-4 leading-relaxed">{edge.cons}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Sockel, Podeste, Optik, Pflege */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10" aria-labelledby="details-heading">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="eyebrow eyebrow-orange mb-4">
                        <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                        Details, die man sieht
                    </span>
                    <h2 id="details-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        Sockel, Podeste und ein stimmiges Gesamtbild
                    </h2>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {MORE.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li key={item.title} className="glass-surface p-7 rounded-tile-2xl">
                                <span className="icon-chip w-11 h-11 mb-4 text-orange-600">
                                    <Icon className="w-5 h-5" />
                                </span>
                                <h3 className="font-black text-base text-slate-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-slate-700 leading-relaxed">{item.text}</p>
                            </li>
                        );
                    })}
                </ul>
                <p className="mt-8 text-sm text-slate-700 leading-relaxed max-w-4xl mx-auto text-center">
                    Welche Rutschhemmungsklasse für Ihre Stufen sinnvoll ist, lesen Sie in unserem Beitrag zu den{' '}
                    <Link href="/blog/rutschfeste-fliesen-r-klassen" className="font-bold text-orange-700 hover:text-orange-600 hover:underline underline-offset-2">
                        R-Klassen nach DIN EN 16165
                    </Link>
                    .
                </p>
            </section>

            {/* Review */}
            {review && (
                <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 relative z-10" aria-label="Kundenstimme">
                    <figure className="glass-surface rounded-tile-2xl p-7 sm:p-10 text-center">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <span className="flex items-center gap-0.5 text-amber-500" aria-label={`${review.rating} von 5 Sternen`}>
                                {Array.from({ length: review.rating }, (_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-current" aria-hidden="true" />
                                ))}
                            </span>
                            <Quote className="w-6 h-6 text-orange-500/30" aria-hidden="true" />
                        </div>
                        <blockquote className="text-base sm:text-lg text-slate-800 leading-relaxed">„{review.text}“</blockquote>
                        <figcaption className="mt-4 text-sm">
                            <span className="font-bold text-slate-900">{review.author}</span>
                            <span className="text-slate-600"> &middot; {review.source}-Rezension &middot; {review.topic}</span>
                        </figcaption>
                    </figure>
                </section>
            )}

            {/* Weiterlesen */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 relative z-10" aria-labelledby="innentreppe-weiterlesen-heading">
                <h2 id="innentreppe-weiterlesen-heading" className="text-2xl font-black text-slate-900 tracking-tight mb-6">
                    Weiterlesen
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {WEITERLESEN.map((link) => (
                        <li key={link.path}>
                            <Link
                                href={link.path}
                                className="group glass-surface rounded-tile-lg p-5 h-full block hover:-translate-y-0.5 hover:border-orange-500/80 transition-all duration-300"
                            >
                                <span className="font-black text-slate-900 group-hover:text-orange-700 transition-colors flex items-center gap-1">
                                    {link.title}
                                    <ArrowRight className="w-4 h-4" />
                                </span>
                                <span className="block mt-1 text-sm text-slate-700">{link.desc}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3.5">
                    <Link href="/beratung" className="btn-ghost px-6 py-3 text-xs">
                        Beratung zu Material und Kanten
                    </Link>
                    <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className="btn-ghost px-6 py-3 text-xs">
                        <Phone className="w-4 h-4 text-orange-600" />
                        {COMPANY_DATA.contact.phone}
                    </a>
                </div>
            </section>

            <QualityPromise />
        </div>
    );
}
