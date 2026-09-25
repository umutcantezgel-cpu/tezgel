import React from 'react';
import Link from 'next/link';
import {
    ArrowRight,
    CheckCircle2,
    DoorOpen,
    LayoutGrid,
    MessageCircle,
    Palette,
    Phone,
    Ruler,
    Square
} from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import { createMetadata } from '@/lib/metadata';
import FliesenKonfigurator from '@/components/funnels/FliesenKonfigurator';
import QualityPromise from '@/components/sections/QualityPromise';

export const metadata = createMetadata({
    title: 'Fliesen-Verlegemuster: Verband, Fischgrät, Diagonal',
    description:
        'Kreuzfuge, Halb- und Drittelverband, Fischgrät oder Diagonal? Verlegemuster, Fugenbild, Sockel und Kantenprofile im Überblick – mit Richtwerten zum Verschnitt.',
    path: '/fliesen/verlegemuster'
});

// ---------------------------------------------------------------------------
// Schematic pattern sketches (pure SVG, generated once at module level)
// ---------------------------------------------------------------------------
const VIEW_W = 120;
const VIEW_H = 80;

function gridRects() {
    const size = 20;
    const rects = [];
    for (let y = 0; y < VIEW_H; y += size) {
        for (let x = 0; x < VIEW_W; x += size) {
            rects.push({ x, y, w: size, h: size });
        }
    }
    return rects;
}

function bondRects(offsetFraction) {
    const w = 36;
    const h = 12;
    const rects = [];
    for (let row = 0; row * h < VIEW_H; row += 1) {
        const shift = ((row * offsetFraction * w) % w) - w;
        for (let x = shift; x < VIEW_W; x += w) {
            rects.push({ x, y: row * h, w, h });
        }
    }
    return rects;
}

function diagonalRects() {
    const size = 16;
    const rects = [];
    for (let y = -80; y < 160; y += size) {
        for (let x = -80; x < 200; x += size) {
            rects.push({ x, y, w: size, h: size });
        }
    }
    return rects;
}

function herringboneRects() {
    // Planks 3:1, unit 7. Staircase of one horizontal and one vertical plank,
    // repeated with the translation (3, -3) – an exact herringbone tiling.
    const u = 7;
    const len = 3;
    const rects = [];
    for (let m = -12; m <= 12; m += 1) {
        for (let k = -12; k <= 24; k += 1) {
            const x = (k + 3 * m) * u;
            const y = (k - 3 * m) * u;
            if (x > VIEW_W || y > VIEW_H || x + len * u < 0 || y + (len + 1) * u < 0) continue;
            rects.push({ x, y, w: len * u, h: u });
            rects.push({ x, y: y + u, w: u, h: len * u });
        }
    }
    return rects;
}

function wildBondRects() {
    const lengths = [30, 46, 22, 38, 52, 26, 34, 44, 28, 40, 24, 50, 36, 30, 42, 20];
    const h = 12;
    const rects = [];
    let idx = 0;
    for (let row = 0; row * h < VIEW_H; row += 1) {
        let x = -((row * 17) % 30);
        while (x < VIEW_W) {
            const w = lengths[idx % lengths.length];
            rects.push({ x, y: row * h, w, h });
            x += w;
            idx += 1;
        }
    }
    return rects;
}

const SKETCHES = {
    kreuzfuge: { rects: gridRects() },
    halbverband: { rects: bondRects(1 / 2) },
    drittelverband: { rects: bondRects(1 / 3) },
    diagonal: { rects: diagonalRects(), transform: `rotate(45 ${VIEW_W / 2} ${VIEW_H / 2})` },
    fischgraet: { rects: herringboneRects() },
    wild: { rects: wildBondRects() }
};

function PatternSketch({ type, label }) {
    const sketch = SKETCHES[type];
    return (
        <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            className="w-full h-auto rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden"
            role="img"
            aria-label={`Schema: ${label}`}
        >
            <g transform={sketch.transform}>
                {sketch.rects.map((r, i) => (
                    <rect
                        key={i}
                        x={r.x}
                        y={r.y}
                        width={r.w}
                        height={r.h}
                        className={i % 3 === 0 ? 'fill-orange-50/80' : 'fill-white'}
                        stroke="#94A3B8"
                        strokeWidth="1"
                    />
                ))}
            </g>
        </svg>
    );
}

const PATTERNS = [
    {
        type: 'kreuzfuge',
        name: 'Kreuzfuge',
        desc: 'Fliesen in Reihen, alle Fugen laufen durch. Ruhig, klar und für nahezu jedes Format geeignet – besonders bei quadratischen Fliesen und Großformaten.'
    },
    {
        type: 'halbverband',
        name: 'Halbverband',
        desc: 'Jede Reihe um eine halbe Fliese versetzt. Klassisch und lebendig, aber für lange Formate nur eingeschränkt geeignet (siehe Versatzregel).'
    },
    {
        type: 'drittelverband',
        name: 'Drittelverband',
        desc: 'Versatz um ein Drittel der Fliesenlänge. Die übliche Wahl für lange, rechteckige Formate und viele Holzoptik-Dielen.'
    },
    {
        type: 'diagonal',
        name: 'Diagonal',
        desc: 'Fliesen um 45° gedreht. Lässt schmale Räume breiter wirken und kaschiert schiefe Wände – bringt aber deutlich mehr Schnitte und Verschnitt.'
    },
    {
        type: 'fischgraet',
        name: 'Fischgrät',
        desc: 'Rechteckige Riemen im rechten Winkel zueinander. Ausdrucksstark und klassisch, vor allem mit Holzoptik. Verlangt exakte Formate und sorgfältige Planung des Startpunkts.'
    },
    {
        type: 'wild',
        name: 'Wilder Verband',
        desc: 'Unregelmäßige Versätze wie bei echten Dielen. Wirkt natürlich, wenn sich Stoßfugen benachbarter Reihen nicht zu nahe kommen und keine Treppenmuster entstehen.'
    }
];

const WASTE = [
    ['Kreuzfuge', 'ca. 5–10 %'],
    ['Halb- und Drittelverband', 'ca. 5–10 %'],
    ['Wilder Verband', 'ca. 5–10 %'],
    ['Diagonal', 'ca. 10–15 %'],
    ['Fischgrät und Chevron', 'ca. 10–15 %']
];

const WEITERLESEN = [
    { label: 'Übergänge zu Parkett, Vinyl und Teppich', href: '/fliesen/flur-diele' },
    { label: 'Fliesen in Holzoptik', href: '/fliesen/holzoptik' },
    { label: 'Badplaner: Bad gestalten', href: '/bad/badplaner' },
    { label: 'Musterbäder ansehen', href: '/bad/musterbaeder' }
];

export default function VerlegemusterPage() {
    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            <div className="ambient-glow-orange -top-32 -left-32 opacity-70" />
            <div className="ambient-glow-warm top-96 -right-24 opacity-60" />

            {/* Hero */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10" aria-labelledby="verlegemuster-heading">
                <div className="ceramic-hero rounded-tile-2xl p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow">
                        <LayoutGrid className="w-3.5 h-3.5" />
                        Gestaltung &amp; Planung
                    </span>
                    <h1 id="verlegemuster-heading" className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                        Verlegemuster, Fugenbild und Abschlüsse:{' '}
                        <span className="text-ceramic-gradient">so wirkt Ihre Fliesenfläche</span>
                    </h1>
                    <p className="text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
                        Dieselbe Fliese kann ruhig, lebendig oder großzügig wirken – je nach Muster, Fugenbild und Abschluss.
                        Wer das vor der Bestellung festlegt, bestimmt die Raumwirkung und kennt den Materialbedarf.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
                        <Link href="/kontakt" className="btn-primary px-7 py-3.5 text-xs group">
                            Beratung &amp; Aufmaß anfragen
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <Link href="/fliesen/konfigurator" className="btn-ghost px-7 py-3.5 text-xs">
                            Materialbedarf ermitteln
                        </Link>
                    </div>
                </div>
            </section>

            {/* Patterns */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10" aria-labelledby="vm-muster-heading">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="eyebrow eyebrow-orange mb-4">Verlegemuster</span>
                    <h2 id="vm-muster-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        Wie das Muster <span className="text-ceramic-gradient">die Raumwirkung bestimmt</span>
                    </h2>
                    <p className="mt-3 text-base text-slate-700 leading-relaxed">
                        Durchlaufende Fugen betonen Richtung und Ordnung, versetzte Muster wirken lebendiger, diagonale und
                        gewinkelte Muster setzen Akzente. Nicht jedes Muster passt zu jedem Format – das klären wir vorab.
                    </p>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {PATTERNS.map((pattern) => (
                        <li
                            key={pattern.type}
                            className="group glass-surface p-6 rounded-tile-xl hover:-translate-y-0.5 hover:border-orange-500/80 hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.14)] transition-all duration-300"
                        >
                            <PatternSketch type={pattern.type} label={pattern.name} />
                            <h3 className="mt-5 font-black text-base text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">{pattern.name}</h3>
                            <p className="text-sm text-slate-700 leading-relaxed">{pattern.desc}</p>
                        </li>
                    ))}
                </ul>
                <p className="mt-8 text-sm text-slate-700 leading-relaxed max-w-3xl mx-auto text-center">
                    <strong className="text-slate-900">Chevron</strong> ähnelt dem Fischgrät, die Riemen stoßen aber mit
                    schräg geschnittenen Enden aneinander, sodass eine durchgehende Zickzacklinie entsteht. Dafür gibt es
                    eigens gefertigte Formate.
                </p>
            </section>

            {/* Versatz, Fugen, Achsen */}
            <section className="py-20 bg-white border-y border-slate-200 relative z-10" aria-labelledby="vm-fugen-heading">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="eyebrow mb-4">Fugenbild</span>
                        <h2 id="vm-fugen-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Versatz, Fugenbreite und Fugenachsen
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <article className="p-7 rounded-tile-xl bg-slate-50 border border-slate-200" aria-labelledby="vm-versatz">
                            <span className="icon-chip w-11 h-11 mb-5">
                                <Ruler className="w-5 h-5" />
                            </span>
                            <h3 id="vm-versatz" className="text-lg font-black text-slate-900 mb-3">
                                Warum lange Formate nur begrenzt versetzt werden
                            </h3>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                Lange Fliesen sind herstellungsbedingt minimal gewölbt. Im Halbverband trifft die höchste Stelle
                                einer Fliese auf die Ecke der nächsten – es entstehen Überzähne. Fachregeln und Hersteller
                                empfehlen deshalb für lange Formate meist einen Versatz von höchstens einem Drittel der
                                Fliesenlänge. Maßgeblich ist die Angabe des Herstellers.
                            </p>
                        </article>
                        <article className="p-7 rounded-tile-xl bg-slate-50 border border-slate-200" aria-labelledby="vm-fugenbreite">
                            <span className="icon-chip w-11 h-11 mb-5">
                                <Palette className="w-5 h-5" />
                            </span>
                            <h3 id="vm-fugenbreite" className="text-lg font-black text-slate-900 mb-3">Fugenbreite und Fugenfarbe</h3>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                Eine Fuge gleicht Maßtoleranzen aus und ist immer nötig. Rektifizierte Fliesen erlauben schmalere
                                Fugen als kalibrierte; Richtwerte nennt die VOB/C für Fliesenarbeiten (DIN 18352). Eine Fugenfarbe
                                Ton in Ton lässt die Fläche ruhig wirken, ein Kontrast betont das Raster. Sehr helle Fugen am Boden
                                zeigen Verschmutzung schneller.
                            </p>
                        </article>
                        <article className="p-7 rounded-tile-xl bg-slate-50 border border-slate-200" aria-labelledby="vm-achsen">
                            <span className="icon-chip w-11 h-11 mb-5">
                                <DoorOpen className="w-5 h-5" />
                            </span>
                            <h3 id="vm-achsen" className="text-lg font-black text-slate-900 mb-3">Fugenachsen über Türen und Räume</h3>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                Werden mehrere Räume gefliest, laufen die Fugen idealerweise durch die Türöffnungen weiter. Wir
                                legen den Startpunkt so fest, dass an sichtbaren Kanten keine schmalen Reststreifen entstehen und
                                die Achsen zu Türen, Fensterfronten oder Kücheninsel passen.
                            </p>
                        </article>
                    </div>
                </div>
            </section>

            {/* Abschlüsse */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10" aria-labelledby="vm-abschluesse-heading">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="eyebrow eyebrow-orange mb-4">Abschlüsse</span>
                    <h2 id="vm-abschluesse-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        Sockel, Gehrungskanten und Kantenprofile
                    </h2>
                    <p className="mt-3 text-base text-slate-700 leading-relaxed">
                        Die sichtbaren Kanten entscheiden über den fertigen Eindruck. Welche Lösung passt, hängt von Fliese,
                        Beanspruchung und Stil ab.
                    </p>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {
                            title: 'Sockel',
                            text: 'Sockelfliesen aus der Bodenfliese geschnitten oder als passende Sockelserie. Die Fugen des Sockels nehmen die Fugen des Bodens auf; zwischen Boden und Sockel sitzt je nach Situation eine Anschlussfuge.'
                        },
                        {
                            title: 'Gehrungskanten',
                            text: 'An Außenecken, Vorsprüngen und Nischen werden die Fliesen auf Gehrung (45°) geschnitten und leicht gefast. So stoßen sie ohne sichtbare Schnittkante aneinander – aufwendig, aber sehr elegant.'
                        },
                        {
                            title: 'Kantenprofile',
                            text: 'Profile aus Edelstahl oder Aluminium schützen Kanten an stark beanspruchten Stellen, etwa an Stufen, Übergängen oder Außenecken. Sie sind robuster als eine Gehrung und setzen eine feine Linie.'
                        }
                    ].map((item) => (
                        <li key={item.title} className="glass-surface rounded-tile-xl p-7">
                            <h3 className="font-black text-base text-slate-900 mb-2 flex items-center gap-2">
                                <Square className="w-4 h-4 text-orange-600" aria-hidden="true" />
                                {item.title}
                            </h3>
                            <p className="text-sm text-slate-700 leading-relaxed">{item.text}</p>
                        </li>
                    ))}
                </ul>
                <p className="mt-6 text-sm text-slate-700 leading-relaxed text-center">
                    Übergänge zu Parkett, Vinyl oder Teppich behandeln wir unter{' '}
                    <Link href="/fliesen/flur-diele" className="font-bold text-orange-600 hover:text-orange-700 hover:underline underline-offset-2">
                        Flur &amp; Diele fliesen
                    </Link>
                    , Stufenkanten unter{' '}
                    <Link href="/treppen/innentreppe" className="font-bold text-orange-600 hover:text-orange-700 hover:underline underline-offset-2">
                        Innentreppe fliesen
                    </Link>
                    .
                </p>
            </section>

            {/* Verschnitt */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 relative z-10" aria-labelledby="vm-verschnitt-heading">
                <div className="rounded-tile-xl bg-orange-50/60 border border-orange-200/80 text-slate-700 p-7 sm:p-10">
                    <h2 id="vm-verschnitt-heading" className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
                        Verschnitt je Muster: Richtwerte für die Bestellung
                    </h2>
                    <p className="text-sm leading-relaxed mb-6">
                        Der Zuschlag hängt von Muster, Format und Raumzuschnitt ab. Die Werte dienen der Orientierung – die
                        verbindliche Menge ergibt sich aus dem Aufmaß.
                    </p>
                    <div className="overflow-x-auto rounded-tile-md border border-orange-200/80">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-100 text-slate-900">
                                <tr>
                                    <th scope="col" className="px-5 py-3 font-black border-b border-slate-200">Verlegemuster</th>
                                    <th scope="col" className="px-5 py-3 font-black border-b border-slate-200">Verschnitt (Richtwert)</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {WASTE.map(([pattern, value]) => (
                                    <tr key={pattern} className="border-b border-slate-200 last:border-b-0">
                                        <th scope="row" className="px-5 py-3 font-bold text-slate-900">{pattern}</th>
                                        <td className="px-5 py-3 text-slate-700 tabular-nums">{value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="mt-5 text-sm leading-relaxed">
                        Kleine, verwinkelte Räume und sehr große Formate liegen eher am oberen Rand. Planen Sie zusätzlich einige
                        Reservefliesen für spätere Reparaturen ein.
                    </p>
                </div>
            </section>

            {/* Weiterlesen */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10" aria-labelledby="vm-weiterlesen-heading">
                <div className="glass-surface-subtle rounded-tile-xl p-6 sm:p-8">
                    <h2 id="vm-weiterlesen-heading" className="text-lg font-black text-slate-900 mb-4">Weiterlesen</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {WEITERLESEN.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="inline-flex items-center gap-1.5 text-sm font-bold text-orange-600 hover:text-orange-700 hover:underline underline-offset-2"
                                >
                                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-4 text-sm text-slate-700">
                        Muster im Bad?{' '}
                        <Link href="/bad/fliesen" className="font-bold text-orange-600 hover:text-orange-700 hover:underline underline-offset-2">
                            Fliesen im Bad
                        </Link>{' '}
                        &middot; Projekt im Wohnbereich?{' '}
                        <Link href="/leistungen/wohnen" className="font-bold text-orange-600 hover:text-orange-700 hover:underline underline-offset-2">
                            Leistung: Wohnbereiche
                        </Link>
                    </p>
                </div>
            </section>

            {/* Konfigurator */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10 scroll-mt-28" id="konfigurator" aria-label="Fliesen-Konfigurator">
                <FliesenKonfigurator />
            </section>

            <QualityPromise />

            {/* Closing CTA */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 relative z-10" aria-labelledby="vm-cta-heading">
                <div className="ceramic-hero rounded-tile-2xl p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Kostenfreies Vor-Ort-Aufmaß
                    </span>
                    <h2 id="vm-cta-heading" className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight">
                        Muster und Fugenbild gemeinsam festlegen
                    </h2>
                    <p className="text-sm sm:text-base text-slate-700 max-w-2xl mx-auto leading-relaxed">
                        {COMPANY_DATA.owner.fullName} plant Startpunkt, Fugenachsen und Abschlüsse vor Ort – danach erhalten
                        Sie ein verbindliches Festpreisangebot.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
                        <Link href="/kontakt" className="btn-primary px-7 py-3.5 text-xs">Aufmaß anfragen</Link>
                        <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className="btn-ghost px-7 py-3.5 text-xs">
                            <Phone className="w-4 h-4 text-orange-600" />
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
