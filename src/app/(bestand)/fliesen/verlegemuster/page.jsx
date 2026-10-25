// Verlegemuster (E4-BAU-11, KERN v2): Seitenkörper nach dem Muster der Familienreferenz (/fliesen, /leistungen/[id]).
// Einstieg mit Laserachse, H1 links, Vorspann und zwei Knöpfe; rechts das Planblatt mit dem Verband-Umschalter wie auf
// /fliesen (KÜR-02). Danach die Leitachse über Muster, Fugenbild, Abschlüsse, Verschnitt, Ratgeber
// und Konfigurator mit Rückfrage. Wortlaut, Überschriften, Links, IDs und Lesefolge wie im Bestand. Kein großer Moment
// und keine neue Bewegung. Die Musterskizzen sind gezeichnete Schemata (SVG) in Systemfarben.
import Link from 'next/link';
import dynamic from 'next/dynamic';
import FormularPlatzhalter from '@/components/funnels/TezgelAnfrageFunnel/Platzhalter';
import { COMPANY_DATA } from '@/config/company';
import { createMetadata } from '@/lib/metadata';
import SeitenDaten from '@/components/seo/SeitenDaten';
import QualityPromise from '@/components/sections/QualityPromise';
import WhatsAppLogo from '@/components/ui/WhatsAppLogo';
import Abschnitt from '@/components/kern/Abschnitt';
import Einstieg from '@/components/kern/Einstieg';
import Feldraster, { Feld } from '@/components/kern/Feldraster';
import Knopf from '@/components/kern/Knopf';
import Leitachse from '@/components/kern/Leitachse';
import Merkliste from '@/components/kern/Merkliste';
import Planblatt, { planfelder } from '@/components/kern/Planblatt';
import Rueckfrage from '@/components/kern/Rueckfrage';
import Tabelle from '@/components/kern/Tabelle';
import VerbandUmschalter from '@/components/kern/VerbandUmschalter';
import { linkKlassen } from '@/components/kern/stile';

// Konfigurator nachladen (Tempo, wie auf /fliesen und den Leistungsseiten); ID #konfigurator liegt am Abschnitt
const FliesenKonfigurator = dynamic(() => import('@/components/funnels/FliesenKonfigurator'), {
    loading: () => <FormularPlatzhalter />,
});

export const metadata = createMetadata({
    title: 'Fliesen-Verlegemuster: Fischgrät & Verbände | Tezgel',
    description:
        'Fliesen-Verlegemuster im Überblick: Kreuzfuge, Halbverband, Fischgrät & Diagonalverlegung. Verschnitt, Wirkung & Fachberatung von Fliesenleger Tezgel.',
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
            className="block h-auto w-full overflow-hidden border border-fuge bg-kalk"
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
                        className={i % 3 === 0 ? 'fill-kalk stroke-strich' : 'fill-fliese stroke-strich'}
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

const ABSCHLUESSE = [
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
        <>
            <SeitenDaten
                pfad="/fliesen/verlegemuster"
                titel="Fliesen-Verlegemuster: Fischgrät & Verbände | Tezgel"
                beschreibung="Fliesen-Verlegemuster im Überblick: Kreuzfuge, Halbverband, Fischgrät & Diagonalverlegung. Verschnitt, Wirkung & Fachberatung von Fliesenleger Tezgel."
                brotkrumen={[
                    { name: 'Start', href: '/' },
                    { name: 'Fliesen und Verlegung', href: '/fliesen' },
                    { name: 'Fliesen-Verlegemuster: Fischgrät & Verbände bei Tezgel' },
                ]}
            />
            {/* 1. EINSTIEG: Etikett, H1 an der Laserachse, Vorspann, zwei Knöpfe; rechts das Planblatt mit dem Verband-Umschalter */}
            <Einstieg
                art="erzaehl"
                etikett="Gestaltung & Planung"
                titel={<span id="verlegemuster-heading">Fliesen-Verlegemuster: Fischgrät &amp; Verbände bei Tezgel</span>}
                vorspann={
                    <p>
                        Entdecken Sie beliebte Fliesen-Verlegemuster wie Fischgrät, Kreuzfuge und Verbände: Fachbetrieb Tezgel berät Sie zu
                        Raumwirkung, Verschnitt und harmonischem Fugenbild für Ihr Projekt.
                    </p>
                }
                aktionen={
                    <>
                        <Knopf href="/kontakt" icon="pfeil-rechts">
                            Beratung &amp; Aufmaß anfragen
                        </Knopf>
                        <Knopf href="/fliesen/konfigurator" variante="neben">
                            Materialbedarf ermitteln
                        </Knopf>
                    </>
                }
                rand={
                    // Verband-Umschalter im Planblatt wie auf /fliesen: auf der Musterseite ist er die Zeichnung des Einstiegs
                    // (keine eigene Abschnittszeile mit leerer Spalte daneben); ohne Plan steht der Sitz im Schriftfeld
                    <Planblatt felder={planfelder('Fliesen-Verlegemuster')}>
                        <VerbandUmschalter />
                    </Planblatt>
                }
            />

            <Leitachse>

                {/* 2. MUSTER: sechs Verbände als Merkliste im Zwei-Spalten-Raster, je Muster Skizze, Name und Beschreibung */}
                <Abschnitt
                    titelId="vm-muster-heading"
                    leitachse
                    spaet
                    etikett="Verlegemuster"
                    titel="Wie das Muster die Raumwirkung bestimmt"
                    einleitung={
                        <p>
                            Durchlaufende Fugen betonen Richtung und Ordnung, versetzte Muster wirken lebendiger, diagonale und gewinkelte
                            Muster setzen Akzente. Nicht jedes Muster passt zu jedem Format – das klären wir vorab.
                        </p>
                    }
                >
                    <Merkliste
                        spalten={2}
                        titelAls="h3"
                        eintraege={PATTERNS.map((pattern) => ({
                            titel: pattern.name,
                            text: (
                                <>
                                    <div className="w-1/2 lg:w-1/3">
                                        <PatternSketch type={pattern.type} label={pattern.name} />
                                    </div>
                                    <p className="mt-4">{pattern.desc}</p>
                                </>
                            )
                        }))}
                    />
                    <p className="mt-8 max-w-mass font-text text-fs-3 text-tinte-2">
                        <strong className="font-semibold text-tinte">Chevron</strong> ähnelt dem Fischgrät, die Riemen stoßen aber mit
                        schräg geschnittenen Enden aneinander, sodass eine durchgehende Zickzacklinie entsteht. Dafür gibt es eigens
                        gefertigte Formate.
                    </p>
                </Abschnitt>

                {/* 3. FUGENBILD: drei Felder – Versatz, Fugenbreite, Fugenachsen; Überschriften mit ihren IDs */}
                <Abschnitt
                    titelId="vm-fugen-heading"
                    leitachse
                    spaet
                    etikett="Fugenbild"
                    titel="Versatz, Fugenbreite und Fugenachsen"
                >
                    <Feldraster spalten={3}>
                        <Feld>
                            <article aria-labelledby="vm-versatz" className="flex flex-1 flex-col">
                                <h3 id="vm-versatz" className="font-anzeige text-fs-4 text-tinte">
                                    Warum lange Formate nur begrenzt versetzt werden
                                </h3>
                                <p className="mt-3 max-w-mass font-text text-fs-3 text-tinte-2">
                                    Lange Fliesen sind herstellungsbedingt minimal gewölbt. Im Halbverband trifft die höchste Stelle einer
                                    Fliese auf die Ecke der nächsten – es entstehen Überzähne. Fachregeln und Hersteller empfehlen deshalb für
                                    lange Formate meist einen Versatz von höchstens einem Drittel der Fliesenlänge. Maßgeblich ist die Angabe
                                    des Herstellers.
                                </p>
                            </article>
                        </Feld>
                        <Feld>
                            <article aria-labelledby="vm-fugenbreite" className="flex flex-1 flex-col">
                                <h3 id="vm-fugenbreite" className="font-anzeige text-fs-4 text-tinte">
                                    Fugenbreite und Fugenfarbe
                                </h3>
                                <p className="mt-3 max-w-mass font-text text-fs-3 text-tinte-2">
                                    Eine Fuge gleicht Maßtoleranzen aus und ist immer nötig. Rektifizierte Fliesen erlauben schmalere Fugen als
                                    kalibrierte; Richtwerte nennt die VOB/C für Fliesenarbeiten (DIN 18352). Eine Fugenfarbe Ton in Ton lässt
                                    die Fläche ruhig wirken, ein Kontrast betont das Raster. Sehr helle Fugen am Boden zeigen Verschmutzung
                                    schneller.
                                </p>
                            </article>
                        </Feld>
                        <Feld>
                            <article aria-labelledby="vm-achsen" className="flex flex-1 flex-col">
                                <h3 id="vm-achsen" className="font-anzeige text-fs-4 text-tinte">
                                    Fugenachsen über Türen und Räume
                                </h3>
                                <p className="mt-3 max-w-mass font-text text-fs-3 text-tinte-2">
                                    Werden mehrere Räume gefliest, laufen die Fugen idealerweise durch die Türöffnungen weiter. Wir legen den
                                    Startpunkt so fest, dass an sichtbaren Kanten keine schmalen Reststreifen entstehen und die Achsen zu
                                    Türen, Fensterfronten oder Kücheninsel passen.
                                </p>
                            </article>
                        </Feld>
                    </Feldraster>
                </Abschnitt>

                {/* 4. ABSCHLÜSSE: Merkliste mit Fugenkreuz je Abschluss; darunter die Verweise auf Flur und Innentreppe */}
                <Abschnitt
                    titelId="vm-abschluesse-heading"
                    leitachse
                    spaet
                    etikett="Abschlüsse"
                    titel="Sockel, Gehrungskanten und Kantenprofile"
                    einleitung={
                        <p>
                            Die sichtbaren Kanten entscheiden über den fertigen Eindruck. Welche Lösung passt, hängt von Fliese,
                            Beanspruchung und Stil ab.
                        </p>
                    }
                >
                    <Merkliste
                        spalten={1}
                        titelAls="h3"
                        eintraege={ABSCHLUESSE.map((item) => ({ titel: item.title, text: item.text }))}
                    />
                    <p className="mt-8 max-w-mass font-text text-fs-3 text-tinte-2">
                        Übergänge zu Parkett, Vinyl oder Teppich behandeln wir unter{' '}
                        <Link href="/fliesen/flur-diele" className={linkKlassen}>
                            Flur &amp; Diele fliesen
                        </Link>
                        , Stufenkanten unter{' '}
                        <Link href="/treppen/innentreppe" className={linkKlassen}>
                            Innentreppe fliesen
                        </Link>
                        .
                    </p>
                </Abschnitt>

                {/* 5. VERSCHNITT: Richtwerte als Tabelle (Region mit Name, Zeilenköpfe) auf Fliese; Zahlen in Mono */}
                <Abschnitt
                    titelId="vm-verschnitt-heading"
                    leitachse
                    spaet
                    flaeche="fliese"
                    titel="Verschnitt je Muster: Richtwerte für die Bestellung"
                    einleitung={
                        <p>
                            Der Zuschlag hängt von Muster, Format und Raumzuschnitt ab. Die Werte dienen der Orientierung – die verbindliche
                            Menge ergibt sich aus dem Aufmaß.
                        </p>
                    }
                >
                    <Tabelle
                        name="Verschnitt je Muster: Richtwerte für die Bestellung"
                        kopf={['Verlegemuster', 'Verschnitt (Richtwert)']}
                        zeilen={WASTE.map(([pattern, value]) => [pattern, value])}
                        ausrichtung={['links', 'rechts']}
                    />
                    <p className="mt-6 max-w-mass font-text text-fs-3 text-tinte-2">
                        Kleine, verwinkelte Räume und sehr große Formate liegen eher am oberen Rand. Planen Sie zusätzlich einige
                        Reservefliesen für spätere Reparaturen ein.
                    </p>
                </Abschnitt>

                {/* 6. WEITERFÜHRENDE RATGEBER: vier Verweise als Merkliste, darunter die Verweise auf Bad und Wohnbereich */}
                <Abschnitt titelId="vm-ratgeber-heading" leitachse spaet titel="Weiterführende Ratgeber zu Verlegemustern & Fugenbildern">
                    <Merkliste
                        spalten={2}
                        eintraege={WEITERLESEN.map((link) => ({
                            titel: (
                                <Link href={link.href} className={linkKlassen}>
                                    {link.label}
                                </Link>
                            )
                        }))}
                    />
                    <p className="mt-8 max-w-mass font-text text-fs-3 text-tinte-2">
                        Muster im Bad?{' '}
                        <Link href="/bad/fliesen" className={linkKlassen}>
                            Fliesen im Bad
                        </Link>{' '}
                        &middot; Projekt im Wohnbereich?{' '}
                        <Link href="/leistungen/wohnen" className={linkKlassen}>
                            Leistung: Wohnbereiche
                        </Link>
                    </p>
                </Abschnitt>

                {/* 7. KONFIGURATOR: Anker #konfigurator am Abschnitt; Funnel (nachgeladen) im Raster mit 8 Spalten, Rückfrage in 4 (ab lg) */}
                <Abschnitt id="konfigurator" aria-label="Fliesen-Konfigurator" leitachse spaet>
                    <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-12">
                        <div className="min-w-0 lg:col-span-8">
                            <FliesenKonfigurator />
                        </div>
                        <div className="lg:col-span-4">
                            <Rueckfrage />
                        </div>
                    </div>
                </Abschnitt>
            </Leitachse>

            {/* 8. ABSCHLUSS: Qualitätsversprechen, dann der Abschluss auf Tinte mit drei Wegen; Knöpfe „hell“ auf Tinte */}
            <QualityPromise />
            <Abschnitt
                titelId="vm-cta-heading"
                flaeche="tinte"
                spaet
                etikett="Kostenfreies Vor-Ort-Aufmaß"
                titel="Muster und Fugenbild gemeinsam festlegen"
                einleitung={
                    <p>
                        {COMPANY_DATA.owner.fullName} plant Startpunkt, Fugenachsen und Abschlüsse vor Ort – danach erhalten Sie ein
                        verbindliches Festpreisangebot.
                    </p>
                }
            >
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <Knopf href="/kontakt" variante="hell">
                        Aufmaß anfragen
                    </Knopf>
                    <Knopf href={`tel:${COMPANY_DATA.contact.phoneLink}`} variante="hell" iconLinks="telefon">
                        <span className="font-mono font-normal">{COMPANY_DATA.contact.phone}</span>
                    </Knopf>
                    <Knopf
                        href={COMPANY_DATA.contact.whatsappLink}
                        extern
                        variante="hell"
                        vorne={<WhatsAppLogo className="size-5 shrink-0" />}
                    >
                        WhatsApp
                    </Knopf>
                </div>
            </Abschnitt>
        </>
    );
}
