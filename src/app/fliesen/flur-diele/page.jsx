import React from 'react';
import Link from 'next/link';
import {
    DoorOpen,
    ArrowRight,
    Phone,
    ShieldCheck,
    MoveHorizontal,
    Footprints,
    Blend,
    Square,
    CheckCircle2
} from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import { createMetadata } from '@/lib/metadata';
import QualityPromise from '@/components/sections/QualityPromise';
import FliesenKonfigurator from '@/components/funnels/FliesenKonfigurator';

export const metadata = createMetadata({
    title: 'Flur und Diele fliesen lassen: Tipps vom Fachbetrieb',
    description:
        'Flur und Eingangsbereich fliesen: strapazierfähige Formate, Verlegerichtung im schmalen Flur, Schmutzfangzone, Rutschhemmung und Übergänge zu anderen Belägen.',
    path: '/fliesen/flur-diele'
});

const SOLUTIONS = [
    {
        icon: ShieldCheck,
        title: 'Belag mit Reserven',
        desc: 'Im Eingang treffen Straßenschmutz, Sand und Nässe auf den Boden. Durchgefärbtes oder glasiertes Feinsteinzeug ist dicht und kratzfest; bei glasierten Fliesen empfehlen wir für Flur und Eingang eine hohe Abriebklasse (Prüfung nach DIN EN ISO 10545-7).'
    },
    {
        icon: MoveHorizontal,
        title: 'Verlegerichtung mit Wirkung',
        desc: 'Längs verlegte Rechteckformate führen den Blick in die Tiefe, quer verlegte lassen einen schmalen Flur breiter wirken. Bei Rechteckformaten ab etwa 60 cm Kantenlänge begrenzen wir den Versatz meist auf ein Drittel, weil große Fliesen produktionsbedingt leicht gewölbt sein können.'
    },
    {
        icon: Square,
        title: 'Schmutzfangzone einplanen',
        desc: 'Eine eingelassene Sauberlaufzone direkt hinter der Tür hält einen Großteil des Schmutzes vom übrigen Boden fern. Die Aussparung für Mattenrahmen und Matte muss vor dem Verlegen feststehen – Maße und Aufbauhöhe stimmen wir mit Ihnen ab.'
    },
    {
        icon: Blend,
        title: 'Saubere Übergänge',
        desc: 'Zu Parkett, Vinyl oder Teppich braucht es ein passendes Profil und eine Fuge, die unterschiedliche Bewegungen der Beläge aufnimmt. Idealerweise sind die Aufbauhöhen so geplant, dass beide Beläge ohne Stufe aneinanderstoßen.'
    },
    {
        icon: Footprints,
        title: 'Trittsicher bei Nässe',
        desc: 'Nasse Schuhsohlen machen glatte Oberflächen rutschig. Eine leicht rutschhemmende Oberfläche ist im Eingangsbereich sinnvoll – im Privathaus als Empfehlung, nicht als gesetzliche Pflicht.'
    }
];

const TRANSITIONS = [
    { title: 'Fliese an Parkett', desc: 'Parkett arbeitet mit der Luftfeuchte. Zwischen den Belägen bleibt deshalb eine Bewegungsfuge, abgedeckt durch ein Übergangsprofil oder elastisch geschlossen.' },
    { title: 'Fliese an Vinyl oder Designbelag', desc: 'Vinyl ist deutlich dünner als ein Fliesenaufbau. Den Höhenunterschied gleichen wir vorab im Untergrund aus oder planen ein Anpassungsprofil ein.' },
    { title: 'Fliese an Teppich', desc: 'Ein Abschlussprofil schützt die Fliesenkante und gibt dem Teppich einen festen Anschlag. Die Lage des Profils legen wir meist mittig unter das geschlossene Türblatt.' }
];

const CROSS_LINKS = [
    { href: '/leistungen/wohnen', label: 'Fliesen im Wohnbereich', desc: 'Wohnen, Essen, Küche und Flur' },
    { href: '/fliesen/verlegemuster', label: 'Verlegemuster & Abschlüsse', desc: 'Fugenachsen, Verband und Sockel' },
    { href: '/blog/rutschfeste-fliesen-r-klassen', label: 'Rutschfeste Fliesen', desc: 'Welche R-Klasse wo sinnvoll ist' },
    { href: '/beratung', label: 'Beratung', desc: 'Formate und Materialien persönlich besprechen' }
];

export default function FlurDielePage() {
    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            <div className="ambient-glow-orange -top-32 -left-32 opacity-70" />
            <div className="ambient-glow-warm top-96 -right-24 opacity-60" />

            {/* Hero */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10" aria-labelledby="flur-heading">
                <div className="ceramic-hero rounded-tile-2xl p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow">
                        <DoorOpen className="w-3.5 h-3.5" />
                        Küchen, Dielen &amp; Flure
                    </span>
                    <h1 id="flur-heading" className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                        Flur und Diele fliesen:{' '}
                        <span className="text-ceramic-gradient">robust vom Eingang bis in den Wohnbereich</span>
                    </h1>
                    <p className="text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
                        Der Flur ist die am stärksten beanspruchte Fläche im Haus: Straßenschuhe, Nässe, Einkaufstaschen und
                        oft der Übergang in offene Wohnräume. Mit dem richtigen Format, einer durchdachten Verlegerichtung und
                        sauber geplanten Übergängen wird aus dem Durchgangsraum ein Boden, der jahrzehntelang gut aussieht.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
                        <Link href="/kontakt" className="btn-primary px-7 py-3.5 text-xs group">
                            Kostenfreies Aufmaß anfragen
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <Link href="/leistungen/wohnen" className="btn-ghost px-7 py-3.5 text-xs">
                            Fliesen im Wohnbereich
                        </Link>
                    </div>
                </div>
            </section>

            {/* Lösungen */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10" aria-labelledby="anforderungen-heading">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="eyebrow eyebrow-orange mb-4">Planung</span>
                    <h2 id="anforderungen-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        Anforderungen im Eingangsbereich: Abrieb, Schmutz, Nässe
                    </h2>
                    <p className="mt-3 text-base text-slate-700 leading-relaxed">
                        Fünf Punkte, die wir bei jedem Flur vor dem ersten Schnitt mit Ihnen klären.
                    </p>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {SOLUTIONS.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li
                                key={item.title}
                                className="group glass-surface p-7 rounded-tile-lg hover:-translate-y-0.5 hover:border-orange-500/80 hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.14)] transition-all duration-300"
                            >
                                <span className="icon-chip w-12 h-12 mb-5">
                                    <Icon className="w-6 h-6" />
                                </span>
                                <h3 className="font-black text-base text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">{item.title}</h3>
                                <p className="text-sm text-slate-700 leading-relaxed">{item.desc}</p>
                            </li>
                        );
                    })}
                </ul>
            </section>

            {/* Format & Schmutzfang */}
            <section className="py-20 bg-white border-y border-slate-200 relative z-10" aria-labelledby="format-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div>
                        <span className="eyebrow mb-4">Format &amp; Richtung</span>
                        <h2 id="format-heading" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-4">
                            Format und Verlegerichtung im schmalen Flur
                        </h2>
                        <div className="space-y-4 text-base text-slate-700 leading-relaxed">
                            <p>
                                In schmalen Fluren entscheiden die Randstreifen über das Gesamtbild. Wir teilen die Fläche so ein,
                                dass an beiden Längsseiten möglichst gleich breite Zuschnitte entstehen – schmale Reststreifen an
                                einer Wand wirken unruhig und brechen leichter.
                            </p>
                            <p>
                                Großformate reduzieren die Fugenanteile und lassen den Raum ruhiger wirken. Sie verlangen aber einen
                                besonders ebenen Untergrund und eine vollflächige Bettung. Wie Fugenachsen durch Türen weiterlaufen
                                und welcher Sockel passt, zeigen wir auf der Seite{' '}
                                <Link href="/fliesen/verlegemuster" className="font-semibold text-orange-600 hover:text-orange-700 hover:underline underline-offset-2">
                                    Verlegemuster &amp; Abschlüsse
                                </Link>
                                .
                            </p>
                        </div>
                    </div>
                    <div>
                        <span className="eyebrow eyebrow-orange mb-4">Sauberlaufzone</span>
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-4">
                            Schmutzfangzone von Anfang an einplanen
                        </h2>
                        <ul className="space-y-3 text-base text-slate-700">
                            <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />Größe und Lage festlegen, bevor der Belag geplant wird – idealerweise über die volle Türbreite und mindestens eine Schrittlänge tief.</li>
                            <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />Aufbauhöhe von Rahmen und Matte beachten, damit die Matte bündig mit den Fliesen abschließt.</li>
                            <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />Rahmen und Matte besorgen Sie über den Fachhandel; wir planen die Aussparung und schließen den Fliesenbelag sauber an.</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Übergänge */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10" aria-labelledby="uebergaenge-heading">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="eyebrow mb-4">Anschlüsse</span>
                    <h2 id="uebergaenge-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        Übergänge zu Parkett, Vinyl und Teppich
                    </h2>
                    <p className="mt-3 text-base text-slate-700 leading-relaxed">
                        Wo der Flur auf andere Beläge trifft, entstehen die meisten Stolperkanten. Entscheidend ist, die
                        Aufbauhöhen aller Beläge schon bei der Estrich- oder Untergrundplanung zu berücksichtigen.
                    </p>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {TRANSITIONS.map((item) => (
                        <li key={item.title} className="p-7 rounded-tile-lg bg-slate-50 border border-slate-200 hover:bg-white hover:border-orange-500/80 transition-all duration-300">
                            <h3 className="font-black text-base text-slate-900 mb-2">{item.title}</h3>
                            <p className="text-sm text-slate-700 leading-relaxed">{item.desc}</p>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Rutschhemmung & offener Wohnbereich */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <article className="glass-surface rounded-tile-xl p-8" aria-labelledby="rutsch-heading">
                        <span className="icon-chip w-12 h-12 mb-5">
                            <Footprints className="w-6 h-6" />
                        </span>
                        <h2 id="rutsch-heading" className="text-2xl font-black text-slate-900 mb-3">Nasse Schuhe: Rutschhemmung im Eingangsbereich</h2>
                        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                            Die Rutschhemmung von Bodenbelägen wird heute nach DIN EN 16165 ermittelt; die bekannten
                            Bewertungsgruppen R9 bis R13 bleiben erhalten. Für private Flure gibt es keine gesetzliche Vorgabe.
                            Im Eingangsbereich empfehlen wir dennoch eine Oberfläche mit leichter Rutschhemmung, zum Beispiel
                            R9 oder R10 – sie bleibt im Alltag gut zu reinigen und bietet bei Nässe mehr Halt als eine polierte
                            Fliese.
                        </p>
                        <Link href="/blog/rutschfeste-fliesen-r-klassen" className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-orange-600 hover:text-orange-700">
                            R-Klassen verständlich erklärt
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </article>
                    <article className="glass-surface rounded-tile-xl p-8" aria-labelledby="offen-heading">
                        <span className="icon-chip w-12 h-12 mb-5">
                            <MoveHorizontal className="w-6 h-6" />
                        </span>
                        <h2 id="offen-heading" className="text-2xl font-black text-slate-900 mb-3">Offen in den Wohnbereich: ein Belag über mehrere Räume</h2>
                        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                            Läuft der Flur ohne Tür in Küche oder Wohnraum über, wirkt ein durchgehender Belag besonders
                            großzügig. Dafür müssen Fugenachsen über alle Räume geplant und Bewegungsfugen des Estrichs – etwa in
                            Türdurchgängen – deckungsgleich in den Belag übernommen werden. Liegt eine Flächentemperierung im
                            Boden, gelten zusätzliche Regeln.
                        </p>
                        <Link href="/fliesen/auf-fussbodenheizung" className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-orange-600 hover:text-orange-700">
                            Fliesen auf beheiztem Estrich
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </article>
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
                                className="group block h-full glass-surface rounded-tile-md p-5 hover:-translate-y-0.5 hover:border-orange-500/80 transition-all duration-300"
                            >
                                <span className="flex items-center justify-between gap-2 font-black text-slate-900 group-hover:text-orange-600 transition-colors">
                                    {link.label}
                                    <ArrowRight className="w-4 h-4 shrink-0 text-orange-600" />
                                </span>
                                <span className="mt-1 block text-sm text-slate-600">{link.desc}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
                <p className="mt-6 text-sm text-slate-700">
                    Fragen zum Projekt? Rufen Sie an unter{' '}
                    <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className="inline-flex items-center gap-1 font-bold text-slate-800 hover:text-orange-600">
                        <Phone className="w-3.5 h-3.5" />
                        {COMPANY_DATA.contact.phone}
                    </a>{' '}
                    oder senden Sie Fotos per{' '}
                    <a href={COMPANY_DATA.contact.whatsappLink} target="_blank" rel="noopener noreferrer" className="font-bold text-green-700 hover:text-green-800 hover:underline underline-offset-2">
                        WhatsApp
                    </a>
                    .
                </p>
            </section>

            <QualityPromise />

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10" aria-label="Fliesen-Konfigurator">
                <FliesenKonfigurator area="flur" />
            </section>
        </div>
    );
}
