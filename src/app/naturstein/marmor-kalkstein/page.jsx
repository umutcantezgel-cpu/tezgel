import React from 'react';
import Link from 'next/link';
import {
    ArrowRight,
    Phone,
    MessageCircle,
    Gem,
    FlaskConical,
    Palette,
    Home,
    ShowerHead,
    ChefHat,
    Waves,
    Trees,
    CircleDot,
    Droplets,
    LayoutGrid,
    Ban,
    CheckCircle2,
    BookOpen
} from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import { createMetadata } from '@/lib/metadata';
import QualityPromise from '@/components/sections/QualityPromise';

export const metadata = createMetadata({
    title: 'Marmor & Travertin verlegen: Kleber, Schutz, Pflege',
    description:
        'Marmor, Travertin und Kalkstein sind kalkhaltig und damit säureempfindlich. Welche Kleber, Imprägnierungen und Pflegemittel sie dauerhaft schön halten.',
    path: '/naturstein/marmor-kalkstein'
});

const PLACES = [
    {
        title: 'Wohnbereich & Flur',
        verdict: 'Sehr gut geeignet',
        text: 'Im trockenen Wohnbereich entfaltet Marmor seine Wirkung am besten. Eine Sauberlaufzone am Eingang hält Sand fern, der die vergleichsweise weiche Oberfläche zerkratzen würde.',
        icon: Home,
        good: true
    },
    {
        title: 'Badwände',
        verdict: 'Gut geeignet',
        text: 'An Wänden ist Marmor wenig beansprucht. In der Dusche nur mit konsequent säurefreier Reinigung – übliche Kalkreiniger sind tabu.',
        icon: ShowerHead,
        good: true
    },
    {
        title: 'Küchenboden & Arbeitsbereiche',
        verdict: 'Nur mit Einschränkungen',
        text: 'Essig, Zitrusfrüchte, Wein und Obstsäfte hinterlassen matte Stellen. Wer das nicht als Patina akzeptiert, wählt hier besser einen silikatischen Stein oder Feinsteinzeug.',
        icon: ChefHat,
        good: false
    },
    {
        title: 'Duschboden',
        verdict: 'Sorgfältig abwägen',
        text: 'Polierter Marmor ist nass rutschig; geeignet sind nur rutschhemmende Oberflächen. Seifen- und Kalkreste lassen sich ohne säurehaltige Reiniger schwerer entfernen.',
        icon: Waves,
        good: false
    },
    {
        title: 'Außenbereich',
        verdict: 'Meist ungeeignet',
        text: 'Viele Marmor- und Kalksteinsorten sind nicht ausreichend frost- und witterungsbeständig; Regen macht polierte Flächen stumpf. Draußen sind silikatische Steine oder Keramik die sicherere Wahl.',
        icon: Trees,
        good: false
    }
];

const TRAVERTINE = [
    {
        name: 'Offenporig (ungespachtelt)',
        text: 'Die natürlichen Poren und Löcher bleiben sichtbar. Sehr rustikal, aber schmutzfangend – eher für Wände als für Böden.'
    },
    {
        name: 'Gespachtelt oder gefüllt',
        text: 'Die Poren sind werkseitig mit einer Spachtelmasse geschlossen. Die Oberfläche ist glatter und leichter zu reinigen; einzelne Füllungen können sich mit der Zeit lösen und werden dann ausgebessert.'
    },
    {
        name: 'Getrommelt / antik',
        text: 'Gerundete Kanten und eine weich gealterte Oberfläche. Kleine Unregelmäßigkeiten gehören zum Stil.'
    }
];

const FURTHER_READING = [
    { label: 'Naturstein-Ratgeber: Imprägnierung & Pflege', href: '/naturstein' },
    { label: 'Feinsteinzeug oder Naturstein? Der Vergleich', href: '/blog/feinsteinzeug-oder-naturstein-vergleich' },
    { label: 'Musterbäder ansehen', href: '/bad/musterbaeder' },
    { label: 'Leistung: Wohnbereiche & Böden', href: '/leistungen/wohnen' }
];

export default function MarmorKalksteinPage() {
    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            <div className="ambient-glow-orange -top-32 -left-32 opacity-70" />
            <div className="ambient-glow-warm top-96 -right-24 opacity-60" />

            {/* Hero */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10" aria-labelledby="marmor-heading">
                <div className="ceramic-hero rounded-tile-2xl p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow eyebrow-orange">
                        <Gem className="w-3.5 h-3.5 text-orange-600" />
                        Kalkhaltige Natursteine
                    </span>
                    <h1 id="marmor-heading" className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                        Marmor, Travertin und Kalkstein:{' '}
                        <span className="text-ceramic-gradient">edle Natursteine richtig verlegen</span>
                    </h1>
                    <p className="text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
                        Kaum ein Material wirkt so hochwertig wie Marmor. Weil diese Steine aus Kalk bestehen, brauchen sie aber eine
                        durchdachte Verlegung und eine Pflege ohne Säure. Was Sie vor der Entscheidung wissen sollten.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
                        <Link href="/kontakt" className="btn-primary px-7 py-3.5 text-xs group">
                            Marmorverlegung anfragen
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <Link href="/naturstein" className="btn-ghost px-7 py-3.5 text-xs">
                            Naturstein-Ratgeber
                        </Link>
                    </div>
                </div>
            </section>

            {/* Acid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10" aria-labelledby="marmor-saeure-heading">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                    <div className="lg:col-span-3">
                        <span className="eyebrow eyebrow-orange mb-4">
                            <FlaskConical className="w-3.5 h-3.5 text-orange-600" />
                            Grundlagen
                        </span>
                        <h2 id="marmor-saeure-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Kalkhaltig: warum Säure die Oberfläche angreift
                        </h2>
                        <div className="mt-5 space-y-4 text-base text-slate-700 leading-relaxed">
                            <p>
                                Marmor, Travertin und Kalkstein bestehen überwiegend aus Calciumcarbonat (Kalk). Säure löst dieses
                                Mineral an: Schon ein Spritzer Zitronensaft oder Essig hinterlässt eine matte, raue Stelle – eine
                                sogenannte Verätzung. Sie ist kein Fleck, der sich wegwischen lässt, sondern eine Veränderung der
                                Oberfläche selbst.
                            </p>
                            <p>
                                Das hat nichts mit der Härte zu tun. Marmor ist zwar weicher als Granit und deshalb kratzempfindlicher –
                                seine Säureempfindlichkeit kommt aber allein vom Kalkgehalt. Eine Imprägnierung verzögert das Eindringen
                                von Flüssigkeiten, macht den Stein aber nicht säurefest.
                            </p>
                        </div>
                    </div>

                    <aside className="lg:col-span-2 rounded-tile-2xl bg-amber-50 border border-amber-200 p-7" aria-labelledby="marmor-tabu-heading">
                        <div className="flex items-center gap-3 mb-4">
                            <Ban className="w-7 h-7 text-amber-500" aria-hidden="true" />
                            <h3 id="marmor-tabu-heading" className="text-xl font-black text-amber-800">Säure ist tabu</h3>
                        </div>
                        <ul className="space-y-2.5 text-sm text-slate-700 leading-relaxed">
                            {[
                                'Essig- und Zitronenreiniger, Kalk- und Badreiniger',
                                'WC-Reiniger, die auf den Boden tropfen',
                                'Zitrusfrüchte, Wein, Obstsaft, Cola, Tomatensoße',
                                'Scheuermittel, Scheuerschwämme und Schleifpads'
                            ].map((item) => (
                                <li key={item} className="flex gap-2.5">
                                    <Ban className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" aria-hidden="true" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <p className="mt-4 text-sm text-slate-700 leading-relaxed">
                            Stattdessen: klares Wasser und ein pH-neutraler Steinreiniger. Verschüttetes sofort abtupfen.
                        </p>
                    </aside>
                </div>
            </section>

            {/* Discolouration */}
            <section className="py-20 bg-white border-y border-slate-200 relative z-10" aria-labelledby="marmor-kleber-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="eyebrow eyebrow-orange mb-4">
                            <Palette className="w-3.5 h-3.5 text-orange-600" />
                            Verlegung
                        </span>
                        <h2 id="marmor-kleber-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Verfärbungen vermeiden:{' '}
                            <span className="text-ceramic-gradient">weiße, schnell abbindende Natursteinkleber</span>
                        </h2>
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                title: 'Durchscheinender Stein',
                                text: 'Heller Marmor ist leicht durchscheinend. Ein grauer Kleber oder feuchte Stellen im Mörtelbett können sich dauerhaft auf der Oberfläche abzeichnen.'
                            },
                            {
                                title: 'Wasser schnell binden',
                                text: 'Weiße Natursteinkleber, die das Anmachwasser schnell kristallin binden, lassen dem Stein keine Zeit, Feuchtigkeit aufzunehmen – so bleiben Farbe und Zeichnung unverändert.'
                            },
                            {
                                title: 'Sonderfälle erkennen',
                                text: 'Manche grünen, als „Marmor“ gehandelten Steine reagieren auf wasserhaltige Kleber mit Verformung. Für sie kommen Reaktionsharzkleber infrage. Das klären wir vor der Verlegung am Material.'
                            }
                        ].map((item) => (
                            <li key={item.title} className="group glass-surface p-7 rounded-tile-2xl hover:-translate-y-0.5 hover:border-orange-500/80 transition-all duration-300">
                                <span className="icon-chip w-11 h-11 mb-4 text-orange-600">
                                    <CheckCircle2 className="w-5 h-5" />
                                </span>
                                <h3 className="font-black text-base text-slate-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-slate-700 leading-relaxed">{item.text}</p>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-8 max-w-3xl mx-auto text-center text-sm text-slate-700 leading-relaxed">
                        Die Platten werden hohlraumarm verlegt – kalibriert im Dünnbett, unkalibriert im Mittelbett. Im Bad liegt darunter
                        eine Abdichtung nach DIN 18534; die Details dazu erklärt unsere Seite{' '}
                        <Link href="/untergrund-abdichtung/din-18534" className="font-bold text-orange-700 hover:text-orange-600 hover:underline underline-offset-2">
                            Abdichtung nach DIN 18534
                        </Link>
                        .
                    </p>
                </div>
            </section>

            {/* Where marble fits */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10" aria-labelledby="marmor-einsatz-heading">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="eyebrow eyebrow-orange mb-4">Einsatzbereiche</span>
                    <h2 id="marmor-einsatz-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        Wo Marmor passt – und wo besser nicht
                    </h2>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
                    {PLACES.map((place) => {
                        const Icon = place.icon;
                        return (
                            <li key={place.title} className="glass-surface p-6 rounded-tile-2xl flex flex-col">
                                <span className="icon-chip w-11 h-11 mb-4 text-orange-600">
                                    <Icon className="w-5 h-5" />
                                </span>
                                <h3 className="font-black text-base text-slate-900 mb-1">{place.title}</h3>
                                <span className={`mb-3 text-xs font-black uppercase tracking-wider ${place.good ? 'text-orange-700' : 'text-amber-800'}`}>
                                    {place.verdict}
                                </span>
                                <p className="text-sm text-slate-700 leading-relaxed">{place.text}</p>
                            </li>
                        );
                    })}
                </ul>
            </section>

            {/* Travertine + care */}
            <section className="py-20 bg-white border-y border-slate-200 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <article aria-labelledby="marmor-travertin-heading">
                        <span className="icon-chip w-11 h-11 mb-4 text-orange-600">
                            <CircleDot className="w-5 h-5" />
                        </span>
                        <h2 id="marmor-travertin-heading" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-3">
                            Travertin: offenporig, gespachtelt oder gefüllt
                        </h2>
                        <p className="text-sm text-slate-700 leading-relaxed mb-5">
                            Travertin ist ein Kalkstein, der aus Quellwasser ausgefällt wurde. Dabei entstehen die typischen Hohlräume und
                            Poren. Wie sie behandelt sind, bestimmt Optik und Pflegeaufwand.
                        </p>
                        <ul className="space-y-3">
                            {TRAVERTINE.map((type) => (
                                <li key={type.name} className="rounded-tile-lg bg-slate-50 border border-slate-200 p-5">
                                    <h3 className="font-black text-sm text-slate-900 mb-1">{type.name}</h3>
                                    <p className="text-sm text-slate-700 leading-relaxed">{type.text}</p>
                                </li>
                            ))}
                        </ul>
                    </article>

                    <article aria-labelledby="marmor-pflege-heading">
                        <span className="icon-chip w-11 h-11 mb-4 text-orange-600">
                            <Droplets className="w-5 h-5" />
                        </span>
                        <h2 id="marmor-pflege-heading" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-3">
                            Imprägnierung und pH-neutrale Pflege
                        </h2>
                        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                            <p>
                                Bei kalkhaltigen Steinen ist eine Imprägnierung besonders sinnvoll: Sie verschafft Ihnen Zeit, verschüttete
                                Flüssigkeiten aufzunehmen, bevor sie eindringen. Aufgetragen wird sie auf den trockenen, gereinigten Belag
                                und nach einem Test an einem Reststück.
                            </p>
                            <p>
                                Für die tägliche Pflege genügen Wasser und ein pH-neutraler Steinreiniger. Matte Stellen durch Säure
                                lassen sich nicht wegputzen; das Aufarbeiten der Oberfläche ist Sache eines Steinmetzbetriebs.
                            </p>
                            <p>
                                Wie Imprägnierung, Auffrischung und Wirkungskontrolle im Detail funktionieren, lesen Sie im{' '}
                                <Link href="/naturstein" className="font-bold text-orange-700 hover:text-orange-600 hover:underline underline-offset-2">
                                    Naturstein-Ratgeber
                                </Link>
                                .
                            </p>
                        </div>
                    </article>
                </div>
            </section>

            {/* Alternative */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10" aria-labelledby="marmor-alternative-heading">
                <div className="glass-surface rounded-tile-2xl p-7 sm:p-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                    <div className="lg:col-span-2">
                        <span className="eyebrow eyebrow-neutral mb-4">
                            <LayoutGrid className="w-3.5 h-3.5" />
                            Naturstein oder Marmoroptik
                        </span>
                        <h2 id="marmor-alternative-heading" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-3">
                            Alternative: Feinsteinzeug in Marmoroptik
                        </h2>
                        <p className="text-sm text-slate-700 leading-relaxed">
                            Wer die Optik von Marmor liebt, aber mit Säure, Flecken und Kratzern nicht leben möchte, findet in
                            Feinsteinzeug mit Marmordekor eine pflegeleichte Alternative – auch für Küche, Dusche und große Formate. Echter
                            Marmor bleibt dagegen ein Unikat mit Tiefenwirkung, das würdevoll altert. Beide Wege haben ihre Berechtigung;
                            die Unterschiede im Detail zeigt unser Vergleich.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <Link href="/blog/feinsteinzeug-oder-naturstein-vergleich" className="btn-ghost px-6 py-3.5 text-xs justify-center">
                            Feinsteinzeug oder Naturstein?
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link href="/bad/fliesen" className="btn-ghost px-6 py-3.5 text-xs justify-center">
                            Fliesen im Bad
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA + further reading */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" aria-labelledby="marmor-cta-heading">
                <div className="ceramic-hero rounded-tile-2xl p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow eyebrow-orange">Beratung &amp; Aufmaß</span>
                    <h2 id="marmor-cta-heading" className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight">
                        Marmor oder Travertin für Ihr Zuhause?
                    </h2>
                    <p className="text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
                        {COMPANY_DATA.owner.fullName} berät Sie ehrlich, wo der Stein passt, und verlegt ihn mit dem richtigen Kleber
                        und hohlraumarm – die beste Grundlage dafür, dass der Stein lange schön bleibt.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
                        <Link href="/kontakt" className="btn-primary px-7 py-3.5 text-xs group">
                            Marmorverlegung anfragen
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className="btn-ghost px-7 py-3.5 text-xs">
                            <Phone className="w-4 h-4 text-orange-600" />
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

                <nav className="mt-10 glass-surface rounded-tile-2xl p-7" aria-labelledby="marmor-ratgeber-heading">
                    <h2 id="marmor-ratgeber-heading" className="flex items-center gap-2 font-black text-base text-slate-900 mb-4">
                        <BookOpen className="w-5 h-5 text-orange-600" aria-hidden="true" />
                        Weiterführende Ratgeber zu Marmor, Kalkstein &amp; Travertin
                    </h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {FURTHER_READING.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="inline-flex items-center gap-1.5 text-sm font-bold text-orange-700 hover:text-orange-600 hover:underline underline-offset-2"
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
