import React from 'react';
import Link from 'next/link';
import {
    ArrowRight,
    CalendarClock,
    ChefHat,
    CheckCircle2,
    Droplets,
    Footprints,
    LayoutGrid,
    MessageCircle,
    Phone,
    ShieldCheck,
    Sparkles
} from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import { REVIEWS } from '@/config/reviews';
import { createMetadata } from '@/lib/metadata';
import FliesenKonfigurator from '@/components/funnels/FliesenKonfigurator';
import QualityPromise from '@/components/sections/QualityPromise';

export const metadata = createMetadata({
    title: 'Küche fliesen: Küchenboden & Küchenrückwand',
    description:
        'Fliesen für die Küche vom Meisterbetrieb: fleckunempfindliche Böden, Küchenrückwand als Fliesenspiegel oder Großformat und fettbeständige Fugen.',
    path: '/fliesen/kueche'
});

const REQUIREMENTS = [
    {
        title: 'Fett- und fleckbeständig',
        desc: 'Dichtes Feinsteinzeug nimmt Öl, Rotwein oder Kaffee kaum auf. Hochglanzpolierte Oberflächen sind empfindlicher – hier lohnt ein Blick auf die Herstellerangabe zur Fleckbeständigkeit.',
        icon: Droplets
    },
    {
        title: 'Stoßfest',
        desc: 'Ein heruntergefallener Topf ist in der Küche Alltag. Eine vollflächige Bettung ohne Hohlstellen macht den Belag belastbar; Reservefliesen erleichtern eine spätere Reparatur.',
        icon: ShieldCheck
    },
    {
        title: 'Pflegeleicht',
        desc: 'Matte bis seidenmatte Oberflächen, gut abgestimmte Fugenfarben und wenig Relief lassen sich im Alltag schnell feucht reinigen.',
        icon: Sparkles
    },
    {
        title: 'Wenig Fugen',
        desc: 'Großformate am Boden und an der Rückwand reduzieren die Zahl der Fugen – und damit die Stellen, an denen sich Schmutz festsetzen kann.',
        icon: LayoutGrid
    },
    {
        title: 'Trittsicher',
        desc: 'Wasser, Öl und Mehl machen glatte Oberflächen rutschig. Eine leicht rutschhemmende Oberfläche ist in der Küche eine sinnvolle Empfehlung.',
        icon: Footprints
    }
];

const WEITERLESEN = [
    { label: 'Fugenmörtel: zementär oder Reaktionsharz', href: '/fliesen/verlegetechnik' },
    { label: 'XXL-Großformate für Boden und Rückwand', href: '/fliesen/grossformat' },
    { label: 'Übergänge zu Parkett, Vinyl und Teppich', href: '/fliesen/flur-diele' },
    { label: 'Referenzen ansehen', href: '/referenzen' }
];

export default function KuechePage() {
    const review = REVIEWS.find((r) => r.id === 'k-d');

    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            <div className="ambient-glow-mint -top-32 -left-32 opacity-70" />
            <div className="ambient-glow-sky top-96 -right-24 opacity-60" />

            {/* Hero */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10" aria-labelledby="kueche-heading">
                <div className="ceramic-hero rounded-[3rem] p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow">
                        <ChefHat className="w-3.5 h-3.5" />
                        Räume &middot; Küche
                    </span>
                    <h1 id="kueche-heading" className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                        Küchenboden und Küchenrückwand fliesen:{' '}
                        <span className="text-ceramic-gradient">robust, hygienisch, fleckunempfindlich</span>
                    </h1>
                    <p className="text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
                        In der Küche treffen Fett, Wasser, Hitze und Stöße auf den Belag. Fliesen halten das aus – wenn Material,
                        Fugen und Zeitpunkt der Verlegung stimmen. Ob im Neubau, bei der Renovierung oder beim Küchentausch:
                        So planen Sie Boden und Rückwand.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
                        <Link href="/kontakt" className="btn-primary px-7 py-3.5 text-xs group">
                            Aufmaß anfragen
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <Link href="/leistungen/wohnen" className="btn-ghost px-7 py-3.5 text-xs">
                            Leistung: Wohnbereiche &amp; Küchen
                        </Link>
                    </div>
                </div>
            </section>

            {/* Requirements */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10" aria-labelledby="ku-anforderungen-heading">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="eyebrow eyebrow-sky mb-4">Anforderungen an den Küchenboden</span>
                    <h2 id="ku-anforderungen-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        Fett, Wasser, Stöße: <span className="text-ceramic-gradient">was der Belag aushalten muss</span>
                    </h2>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {REQUIREMENTS.map((item) => {
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

            {/* Timing & Rückwand */}
            <section className="py-20 bg-white border-y border-slate-200 relative z-10" aria-labelledby="ku-planung-heading">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="eyebrow mb-4">
                            <CalendarClock className="w-3.5 h-3.5" />
                            Planung
                        </span>
                        <h2 id="ku-planung-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Reihenfolge, Rückwand und Fugen
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <article className="p-7 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200" aria-labelledby="ku-reihenfolge">
                            <h3 id="ku-reihenfolge" className="text-xl font-black text-slate-900 mb-3">Vor oder nach der Küchenmontage fliesen?</h3>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                <strong className="text-slate-900">Boden:</strong> Wird er vor der Montage durchgehend gefliest,
                                bleibt die Küche später frei umbaubar, und unter den Schränken gibt es keine Kanten. Wird nur bis zum
                                Sockel gefliest, spart das Material, legt aber den Grundriss fest. Die Höhe des fertigen Belags muss
                                der Küchenplanung bekannt sein.
                            </p>
                            <p className="mt-3 text-sm text-slate-700 leading-relaxed">
                                <strong className="text-slate-900">Rückwand:</strong> Sie wird meist nach dem Einbau von
                                Unterschränken und Arbeitsplatte gefliest, damit die Fliesen exakt an die Platte anschließen.
                                Ausschnitte für Steckdosen stimmen wir auf die Planung ab. Küchenmontage, Arbeitsplatten sowie
                                Elektro- und Wasseranschlüsse übernehmen Küchenlieferant und Fachbetriebe – wir koordinieren
                                lediglich die Termine.
                            </p>
                        </article>
                        <article className="p-7 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200" aria-labelledby="ku-rueckwand">
                            <h3 id="ku-rueckwand" className="text-xl font-black text-slate-900 mb-3">Küchenrückwand: Fliesenspiegel, Großformat oder Mosaik</h3>
                            <ul className="space-y-3 text-sm text-slate-700 leading-relaxed">
                                <li>
                                    <strong className="text-slate-900">Klassischer Fliesenspiegel:</strong> Wandfliesen im
                                    gewünschten Format zwischen Arbeitsplatte und Oberschränken – flexibel in Farbe und Muster.
                                </li>
                                <li>
                                    <strong className="text-slate-900">Großformat:</strong> Wenige große Platten mit nur einzelnen
                                    Stößen wirken ruhig und sind besonders leicht zu reinigen. Zuschnitt und Ausschnitte werden
                                    vorab geplant.
                                </li>
                                <li>
                                    <strong className="text-slate-900">Mosaik:</strong> Setzt Akzente, bringt aber viele Fugen mit –
                                    in Herdnähe spricht das für ein besonders widerstandsfähiges Fugenmaterial.
                                </li>
                            </ul>
                        </article>
                        <article className="p-7 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200" aria-labelledby="ku-fugen">
                            <h3 id="ku-fugen" className="text-xl font-black text-slate-900 mb-3">Fugen, die Fett und Reinigern standhalten</h3>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                Zementäre Fugenmörtel der Klasse CG2 mit reduzierter Wasseraufnahme sind für die meisten
                                Küchenböden gut geeignet. Wo Fett, Säuren oder intensive Reinigung dauerhaft einwirken, kann
                                Reaktionsharz-Fugenmörtel (RG) die bessere Wahl sein – er ist dicht und chemisch beständiger,
                                aber aufwendiger zu verarbeiten.{' '}
                                <Link href="/fliesen/verlegetechnik" className="font-bold text-emerald-800 hover:text-emerald-700 hover:underline underline-offset-2">
                                    Fugenmörtel im Vergleich
                                </Link>
                            </p>
                            <p className="mt-3 text-sm text-slate-700 leading-relaxed">
                                Die Silikonfuge zwischen Arbeitsplatte und Rückwand ist eine Wartungsfuge und sollte bei Bedarf
                                erneuert werden.{' '}
                                <Link href="/fliesen/fugensanierung" className="font-bold text-emerald-800 hover:text-emerald-700 hover:underline underline-offset-2">
                                    Fugensanierung
                                </Link>
                            </p>
                        </article>
                        <article className="p-7 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200" aria-labelledby="ku-uebergang">
                            <h3 id="ku-uebergang" className="text-xl font-black text-slate-900 mb-3">Übergänge zu offenen Wohnbereichen</h3>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                In offenen Grundrissen wirkt ein durchgehender Belag von der Küche bis ins Wohnzimmer besonders
                                großzügig. Dafür planen wir Fugenachsen und Verlegerichtung über beide Bereiche hinweg.{' '}
                                <Link href="/fliesen/verlegemuster" className="font-bold text-emerald-800 hover:text-emerald-700 hover:underline underline-offset-2">
                                    Verlegemuster &amp; Fugenachsen
                                </Link>
                            </p>
                            <p className="mt-3 text-sm text-slate-700 leading-relaxed">
                                Trifft die Fliese auf Parkett, Vinyl oder Teppich, entscheiden Aufbauhöhe und Profil über einen
                                sauberen Übergang.{' '}
                                <Link href="/fliesen/flur-diele" className="font-bold text-emerald-800 hover:text-emerald-700 hover:underline underline-offset-2">
                                    Übergänge zu anderen Belägen
                                </Link>
                            </p>
                        </article>
                    </div>
                </div>
            </section>

            {/* Rutschhemmung & Pflege */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10" aria-labelledby="ku-pflege-heading">
                <div className="rounded-[2rem] bg-sky-50 border border-sky-200 text-slate-700 p-7 sm:p-10">
                    <h2 id="ku-pflege-heading" className="text-2xl sm:text-3xl font-black text-slate-900 mb-4">
                        Rutschhemmung und Pflege im Küchenalltag
                    </h2>
                    <p className="text-sm leading-relaxed">
                        Für private Küchen gibt es keine vorgeschriebene Rutschhemmungsklasse. Eine leicht rutschhemmende
                        Oberfläche, etwa R9 oder R10, ist eine sinnvolle Empfehlung, weil sie trittsicher und trotzdem gut zu
                        reinigen ist. Ermittelt wird die Rutschhemmung heute nach DIN EN 16165. Für gewerbliche Küchen gelten
                        eigene Anforderungen des Arbeitsschutzes.
                    </p>
                    <p className="mt-3 text-sm leading-relaxed">
                        Im Alltag reicht feuchtes Wischen mit einem milden Reiniger. Aggressive oder säurehaltige Mittel können
                        zementäre Fugen angreifen.{' '}
                        <Link href="/blog/rutschfeste-fliesen-r-klassen" className="font-bold text-emerald-800 hover:text-emerald-700 hover:underline underline-offset-2">
                            R-Klassen erklärt
                        </Link>{' '}
                        &middot;{' '}
                        <Link href="/blog/fliesen-reinigen-pflegen" className="font-bold text-emerald-800 hover:text-emerald-700 hover:underline underline-offset-2">
                            Fliesen reinigen und pflegen
                        </Link>
                    </p>
                </div>
            </section>

            {/* Review */}
            {review && (
                <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 relative z-10" aria-label="Kundenstimme">
                    <figure className="glass-surface rounded-[2rem] p-7 sm:p-10 text-center">
                        <blockquote className="text-base sm:text-lg text-slate-800 leading-relaxed">„{review.text}“</blockquote>
                        <figcaption className="mt-4 text-sm">
                            <span className="font-bold text-slate-900">{review.author}</span>
                            <span className="text-slate-600"> &middot; {review.source}-Rezension &middot; {review.topic}</span>
                        </figcaption>
                    </figure>
                </section>
            )}

            {/* Weiterlesen */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10" aria-labelledby="ku-weiterlesen-heading">
                <div className="glass-surface-subtle rounded-3xl p-6 sm:p-8">
                    <h2 id="ku-weiterlesen-heading" className="text-lg font-black text-slate-900 mb-4">Weiterlesen</h2>
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
                        Auch das Bad steht an?{' '}
                        <Link href="/bad/fliesen" className="font-bold text-emerald-800 hover:text-emerald-700 hover:underline underline-offset-2">
                            Fliesen im Bad
                        </Link>{' '}
                        &middot;{' '}
                        <Link href="/beratung" className="font-bold text-emerald-800 hover:text-emerald-700 hover:underline underline-offset-2">
                            Beratung anfragen
                        </Link>
                    </p>
                </div>
            </section>

            {/* Konfigurator */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10 scroll-mt-28" id="konfigurator" aria-label="Fliesen-Konfigurator">
                <FliesenKonfigurator area="kueche" />
            </section>

            <QualityPromise />

            {/* Closing CTA */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 relative z-10" aria-labelledby="ku-cta-heading">
                <div className="ceramic-hero rounded-[3rem] p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Kostenfreies Vor-Ort-Aufmaß
                    </span>
                    <h2 id="ku-cta-heading" className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight">
                        Neue Küche geplant?
                    </h2>
                    <p className="text-sm sm:text-base text-slate-700 max-w-2xl mx-auto leading-relaxed">
                        Sprechen Sie uns früh an – dann passen Belagshöhe, Rückwand und Termine zur Küchenmontage. Nach dem
                        Aufmaß erhalten Sie ein verbindliches Festpreisangebot.
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
