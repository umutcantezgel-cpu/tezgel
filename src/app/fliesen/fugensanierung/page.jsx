import React from 'react';
import Link from 'next/link';
import {
    Droplets,
    ArrowRight,
    Phone,
    MessageCircle,
    Scissors,
    Sparkles,
    Brush,
    Wrench,
    Layers,
    AlertTriangle,
    Search,
    Star,
    Quote
} from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import { REVIEWS } from '@/config/reviews';
import { createMetadata } from '@/lib/metadata';
import QualityPromise from '@/components/sections/QualityPromise';

export const metadata = createMetadata({
    title: 'Fugen & Silikonfugen erneuern: Fugensanierung',
    description:
        'Schimmelige Silikonfugen oder bröselnde Zementfugen? Warum elastische Fugen Wartungsfugen sind, wie der Austausch abläuft und wann eine Sanierung nicht reicht.',
    path: '/fliesen/fugensanierung'
});

const WARNING_SIGNS = [
    { title: 'Schwarze Punkte im Silikon', desc: 'Schimmel sitzt im elastischen Dichtstoff selbst und lässt sich durch Reinigen meist nicht dauerhaft entfernen.' },
    { title: 'Risse und Flankenabriss', desc: 'Löst sich das Silikon von Fliese oder Wanne, kann Wasser dahinter laufen.' },
    { title: 'Bröselnde Zementfugen', desc: 'Ausgewaschene oder sandende Fugen bieten Schmutz und Feuchtigkeit Angriffsfläche.' },
    { title: 'Dauerhaft dunkle Fugen', desc: 'Bleiben Fugen auch nach dem Trocknen dunkel, kann Feuchtigkeit von hinten kommen – ein Fall für die Ursachenklärung.' }
];

const WORK_STEPS = [
    {
        icon: Scissors,
        title: 'Altes Silikon vollständig entfernen',
        desc: 'Der alte Dichtstoff wird mechanisch herausgeschnitten, ohne Glasur, Wanne oder die darunterliegende Abdichtung zu beschädigen. Auch Silikonfilme an den Flanken müssen restlos weg – neues Silikon haftet nicht auf altem.'
    },
    {
        icon: Sparkles,
        title: 'Reinigen und trocknen',
        desc: 'Die Fugenflanken werden gereinigt und entfettet. Die Fuge muss vor dem Neuverfugen trocken sein, sonst haftet der Dichtstoff schlecht.'
    },
    {
        icon: Layers,
        title: 'Vorbehandeln und hinterfüllen',
        desc: 'Je nach Untergrund wird ein Primer aufgetragen. Tiefe Fugen erhalten ein Hinterfüllmaterial, damit das Silikon nur an den beiden Flanken haftet und nicht am Fugengrund – die sogenannte Dreiflankenhaftung würde die Fuge schneller reißen lassen.'
    },
    {
        icon: Brush,
        title: 'Einbringen und glätten',
        desc: 'Sanitärsilikon wird blasenfrei eingebracht und glatt abgezogen. Bis zur Benutzung von Dusche oder Wanne muss es gemäß Herstellerangabe aushärten.'
    },
    {
        icon: Wrench,
        title: 'Weitere kleine Reparaturen',
        desc: 'Lose Sockelfliesen, eine gesprungene Fliese oder beschädigte Kanten? Kleinere Arbeiten erledigen wir beim selben Termin nach Absprache mit.'
    }
];

const CROSS_LINKS = [
    { href: '/bad/badsanierung', label: 'Badsanierung', desc: 'Wenn eine Sanierung nicht mehr reicht' },
    { href: '/leistungen/untergrund', label: 'Untergrund & Abdichtung', desc: 'Die Basis unter jeder Fuge' },
    { href: '/blog/schimmel-fliesenfugen-vermeiden', label: 'Schimmel in Fugen vermeiden', desc: 'Feuchte, Pflege und Materialwahl' },
    { href: '/faq', label: 'Häufige Fragen', desc: 'Antworten rund um Fliesenarbeiten' }
];

export default function FugensanierungPage() {
    const review = REVIEWS.find((r) => r.id === 'christian-d');

    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            <div className="ambient-glow-orange -top-32 -left-32 opacity-70" />
            <div className="ambient-glow-warm top-96 -right-24 opacity-60" />

            {/* Hero */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10" aria-labelledby="fugen-heading">
                <div className="ceramic-hero rounded-tile-2xl p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow">
                        <Droplets className="w-3.5 h-3.5" />
                        Service &amp; Reparatur
                    </span>
                    <h1 id="fugen-heading" className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                        Fugensanierung:{' '}
                        <span className="text-ceramic-gradient">Silikon- und Zementfugen fachgerecht erneuern</span>
                    </h1>
                    <p className="text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
                        Verfärbte, rissige oder abgelöste Fugen lassen ein gepflegtes Bad schnell alt aussehen – und können
                        Feuchtigkeit hinter den Belag lassen. Oft reicht es, die Fugen zu erneuern, statt neu zu fliesen. Wir
                        prüfen, was nötig ist, und arbeiten so, dass Abdichtung und Nachbarfliesen geschützt bleiben.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
                        <Link href="/kontakt" className="btn-primary px-7 py-3.5 text-xs group">
                            Fugensanierung anfragen
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <a href={COMPANY_DATA.contact.whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-ghost px-7 py-3.5 text-xs">
                            <MessageCircle className="w-4 h-4 text-green-700" />
                            Fotos per WhatsApp senden
                        </a>
                    </div>
                </div>
            </section>

            {/* Wartungsfuge */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10" aria-labelledby="wartungsfuge-heading">
                <div className="glass-surface rounded-tile-xl p-8 sm:p-10">
                    <span className="eyebrow eyebrow-orange mb-4">Grundlagen</span>
                    <h2 id="wartungsfuge-heading" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-4">
                        Wartungsfuge: warum Silikon regelmäßig erneuert werden muss
                    </h2>
                    <div className="space-y-4 text-base text-slate-700 leading-relaxed">
                        <p>
                            Elastische Fugen – etwa an Wanne, Duschtasse, in Raumecken und an Übergängen – nehmen Bewegungen
                            zwischen Bauteilen auf. Sie sind starker Beanspruchung durch Wasser, Reinigungsmittel und
                            Temperaturwechsel ausgesetzt. Fachlich gelten sie deshalb als Wartungsfugen (Begriff nach DIN 52460):
                            Sie müssen in regelmäßigen Abständen geprüft und bei Bedarf erneuert werden.
                        </p>
                        <p>
                            Dass Silikon mit der Zeit altert, verfärbt oder reißt, ist Verschleiß und in der Regel kein
                            Ausführungsfehler. Wie oft ein Austausch nötig ist, hängt von Nutzung, Feuchtebelastung und Pflege ab – einen
                            festen Zeitplan gibt es nicht. Eine Rechtsberatung zu Gewährleistungsfragen ersetzt diese Seite nicht.
                        </p>
                    </div>
                </div>
            </section>

            {/* Warnzeichen */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10" aria-labelledby="warnzeichen-heading">
                <div className="text-center max-w-3xl mx-auto mb-10">
                    <span className="eyebrow eyebrow-amber mb-4">Warnzeichen</span>
                    <h2 id="warnzeichen-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        Warnzeichen: Schimmel, Risse, Flankenabriss, dunkle Zementfugen
                    </h2>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {WARNING_SIGNS.map((item) => (
                        <li key={item.title} className="p-6 rounded-tile-xl bg-slate-50 border border-slate-200">
                            <h3 className="font-black text-base text-slate-900 mb-2">{item.title}</h3>
                            <p className="text-sm text-slate-700 leading-relaxed">{item.desc}</p>
                        </li>
                    ))}
                </ul>
                <p className="mt-6 text-sm text-slate-600 text-center">
                    Ausführlich zu Feuchtigkeitsanzeichen in der Dusche:{' '}
                    <Link href="/blog/undichte-dusche-warnzeichen" className="font-semibold text-orange-600 hover:text-orange-700 hover:underline underline-offset-2">
                        Undichte Dusche – die Warnzeichen
                    </Link>
                </p>
            </section>

            {/* Arbeitsschritte Silikon */}
            <section className="py-20 bg-white border-y border-slate-200 relative z-10" aria-labelledby="silikon-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="eyebrow mb-4">Arbeitsschritte</span>
                        <h2 id="silikon-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Silikonfugen tauschen: entfernen, reinigen, vorbehandeln, hinterfüllen, glätten
                        </h2>
                    </div>
                    <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
                        {WORK_STEPS.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <li
                                    key={item.title}
                                    className="group p-6 rounded-tile-xl bg-slate-50 border border-slate-200 hover:bg-white hover:-translate-y-0.5 hover:border-orange-500/80 transition-all duration-300"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="font-display text-3xl font-black tabular-nums text-orange-600/30" aria-hidden="true">
                                            {String(idx + 1).padStart(2, '0')}
                                        </span>
                                        <span className="icon-chip w-11 h-11">
                                            <Icon className="w-5 h-5" />
                                        </span>
                                    </div>
                                    <h3 className="font-black text-base text-slate-900 mb-2">{item.title}</h3>
                                    <p className="text-sm text-slate-700 leading-relaxed">{item.desc}</p>
                                    {idx === WORK_STEPS.length - 1 && (
                                        <Link href="/fliesenreparatur" className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-orange-600 hover:text-orange-700">
                                            Fliesenreparatur
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    )}
                                </li>
                            );
                        })}
                    </ol>
                </div>
            </section>

            {/* Zementfugen & Material */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <article className="glass-surface rounded-tile-xl p-8" aria-labelledby="zement-heading">
                        <h2 id="zement-heading" className="text-2xl font-black text-slate-900 mb-3">Zementfugen auskratzen und neu verfugen</h2>
                        <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                            <p>
                                Mürbe oder stark verfärbte Zementfugen werden mit geeignetem Werkzeug gleichmäßig tief
                                ausgeräumt. Dabei dürfen weder Fliesenkanten noch – im Nassbereich – die Verbundabdichtung unter
                                dem Belag verletzt werden.
                            </p>
                            <p>
                                Anschließend wird die Fuge entstaubt, vorgenässt und mit neuem Fugenmörtel vollständig gefüllt.
                                Nach dem Abwaschen und Aushärten werden die elastischen Anschlussfugen erneuert. Ein
                                Farbton, der exakt dem alten Bestand entspricht, lässt sich nicht immer treffen – deshalb
                                erneuern wir zusammenhängende Flächen meist vollständig.
                            </p>
                        </div>
                    </article>
                    <article className="glass-surface rounded-tile-xl p-8" aria-labelledby="material-heading">
                        <h2 id="material-heading" className="text-2xl font-black text-slate-900 mb-3">Fugenmaterial bei der Erneuerung: zementär oder Reaktionsharz</h2>
                        <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                            <p>
                                Für die meisten Bäder und Wohnräume ist ein zementärer Fugenmörtel der Klasse CG2 WA nach
                                DIN EN 13888 die passende Wahl: wasserabweisend und abriebfest.
                            </p>
                            <p>
                                Reaktionsharz-Fugenmörtel (RG) ist nahezu dicht und sehr beständig gegen Reinigungsmittel und
                                Säuren, verlangt aber sorgfältige Verarbeitung. Welche Variante zu Ihrer Fläche passt, besprechen
                                wir vor Ort.
                            </p>
                        </div>
                        <Link href="/fliesen/verlegetechnik" className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-orange-600 hover:text-orange-700">
                            Fugenmörtel im Vergleich
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </article>
                </div>
            </section>

            {/* Abdichtungsproblem */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 relative z-10" aria-labelledby="abdichtung-heading">
                <div className="rounded-tile-xl bg-orange-50/60 border border-orange-200/80 p-8 sm:p-10">
                    <div className="flex items-center gap-3 mb-4">
                        <AlertTriangle className="w-6 h-6 text-orange-600" aria-hidden="true" />
                        <h2 id="abdichtung-heading" className="text-2xl font-black text-slate-900">Wenn hinter der Fuge ein Abdichtungsproblem steckt</h2>
                    </div>
                    <div className="space-y-3 text-base text-slate-700 leading-relaxed">
                        <p>
                            Neue Fugen lösen kein Problem, das tiefer liegt. Hohl klingende oder lose Fliesen, Feuchtigkeit in
                            angrenzenden Wänden, Wasserflecken an der Decke darunter oder Fugen, die kurz nach der Erneuerung
                            wieder dunkel werden, deuten auf eine Ursache hinter dem Belag hin. Dann muss zuerst geklärt werden,
                            woher das Wasser kommt.
                        </p>
                        <p>
                            Großflächiger Schimmelbefall an Wänden oder in der Bausubstanz gehört in die Hände eines
                            spezialisierten Fachbetriebs.
                        </p>
                    </div>
                    <Link href="/schadensanalyse" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-orange-600 hover:text-orange-700">
                        <Search className="w-4 h-4" />
                        Ursachen vor Ort klären: Schadensanalyse
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>

            {/* Review */}
            {review && (
                <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 relative z-10" aria-label="Kundenstimme">
                    <figure className="glass-surface rounded-tile-xl p-7 sm:p-10 text-center">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <span className="flex items-center gap-0.5 text-amber-500" aria-label={`${review.rating} von 5 Sternen`}>
                                {Array.from({ length: review.rating }, (_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-current" aria-hidden="true" />
                                ))}
                            </span>
                            <Quote className="w-6 h-6 text-orange-500/40" aria-hidden="true" />
                        </div>
                        <blockquote className="text-base sm:text-lg text-slate-800 leading-relaxed">„{review.text}“</blockquote>
                        <figcaption className="mt-4 text-sm">
                            <span className="font-bold text-slate-900">{review.author}</span>
                            <span className="text-slate-600"> &middot; {review.source}-Rezension &middot; {review.topic}</span>
                        </figcaption>
                    </figure>
                </section>
            )}

            {/* Weiterführende Ratgeber */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 relative z-10" aria-labelledby="ratgeber-heading">
                <h2 id="ratgeber-heading" className="text-xl font-black text-slate-900 mb-5">Weiterführende Ratgeber zur Fugensanierung &amp; Fliesenpflege</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {CROSS_LINKS.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className="group block h-full glass-surface rounded-tile-md p-5 hover:-translate-y-0.5 hover:border-orange-500/50 transition-all duration-300"
                            >
                                <span className="flex items-center justify-between gap-2 font-black text-slate-900 group-hover:text-orange-600 transition-colors">
                                    {link.label}
                                    <ArrowRight className="w-4 h-4 shrink-0 text-orange-500" />
                                </span>
                                <span className="mt-1 block text-sm text-slate-600">{link.desc}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
                <p className="mt-6 text-sm text-slate-700">
                    Für eine erste Einschätzung helfen ein paar Fotos per{' '}
                    <a href={COMPANY_DATA.contact.whatsappLink} target="_blank" rel="noopener noreferrer" className="font-bold text-green-700 hover:text-green-800 hover:underline underline-offset-2">
                        WhatsApp
                    </a>{' '}
                    oder telefonisch unter{' '}
                    <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className="inline-flex items-center gap-1 font-bold text-orange-600 hover:text-orange-700">
                        <Phone className="w-3.5 h-3.5" />
                        {COMPANY_DATA.contact.phone}
                    </a>
                    .
                </p>
            </section>

            <QualityPromise />
        </div>
    );
}
