# gefaelle-dusche

## kennung

gefaelle-dusche

## seite

/bad/barrierefreies-bad (Erzählseite, Abschnitt 3 „Was wir tun“; Seitentext _werkstatt/texte/REF-bereich-barrierefreies-bad.md, Inhalt src/inhalte/barrierefreies-bad.ts; die Seite selbst stellt E3-BAU-03 auf die Vorlage ErzaehlSeite um, bis dahin Vorschau im Dev-Schaufenster /werkstatt-schaufenster/erzaehlseite)

## schlitz

momente.tun

## wiederverwendung

BESTANDSPRÜFUNG (grep nach gefaelle-dusche, gefaelle, Gefälle, tropfen in src/ und _werkstatt/archiv/): Den Moment gibt es noch nicht. Es gibt keine Komponente, keine CSS-Regel und keinen Eintrag in register.ts. Treffer nur in KERN K-007 (Tabellenzeile), _werkstatt/register.json (Hinweis „kommt mit E3-ORCH-02a“), plan-generator.py, bildplaetze.md („Großer Moment gefaelle-dusche: Zeichnung“) und im Archiv-KERN v2 (Formregel „45° nur bei Pfeilspitzen und Tropfen“). Verwandt vorhanden: Vignette „bad“ (src/components/kern/vignetten/Bad.tsx, Draufsicht Duschfeld mit drei senkrechten Gefälle-Pfeilen zur Rinne) und das Planelement 'gefaelle' im Verlegeplan (src/components/kern/Verlegeplan.tsx, Pfeil in Draufsicht).

GENUTZT (nichts davon wird geändert):
- Zeichenmittel aus src/components/kern/vignetten/zeichnen.tsx: Planrahmen (SVG-Rahmen: currentColor, 1,5 px, square/miter, aria-hidden, focusable=false, h-auto w-full), Linie (non-scaling-stroke), schraffur (Schnittflächen). Die Spitze des neuen Pfeils folgt pfeil() (Schenkel unter 45°, Spitze 5) und die Rundung folgt r(). Weil pfeil() nur senkrecht zeichnen kann, kommt pfeilEntlang() als neue Funktion in die paketeigene Datei geometrie.ts.
- Rahmen der Zeichnung als Fliese wie .szene-plan in src/components/kern/SzeneAblauf.tsx (border border-fuge bg-fliese p-4).
- figure/figcaption wie die Funktion Zeichnung in src/components/vorlagen/teile/Tun.tsx (max-w-mass text-tinte, Unterschrift darunter).
- Auslöser ohne eigenes JavaScript: src/lib/motion/bewegung.ts setzt per IntersectionObserver data-motion-stand="an" für alle Register-Kennungen mit ausloeser 'sicht'. Dafür reicht der Eintrag in register.ts (Orchestrator). BewegungsWaechter sucht nach jedem Seitenwechsel neu.
- CSS-Muster aus src/app/bewegung.css: startbild (Zustand am Elternteil [data-motion-stand="an"], Kinder animieren, Startzustand nur unter html.k-bewegung:not(.k-notaus)), sig-flucht (Staffel über :nth-child), k-verlauf-Endzustand wie bei SIG-1 (Zeile 922 ff.), Druck und erzwungene Farben ohne Bewegung.
- Vorlage: der Schlitz momente.tun in src/components/vorlagen/ErzaehlSeite.tsx → teile/Tun.tsx setzt den Baustein nach Punkten und Absatz in <div className="mt-16">. Die Vorlage braucht keine Änderung.

NICHT genutzt (Begründung): Die Vignette „bad“ taugt nicht als Grundlage. In der Draufsicht läuft das Wasser auf dem Bildschirm „nach oben“ zur Rinne, und dass es bergab geht, sieht man nicht. Ein Schnitt von der Seite zeigt P1 auf einen Blick beides: Der Badboden geht ohne Stufe in die Dusche über, und der Duschboden neigt sich zum Ablauf.

## aufbau

STRUKTUR (Serverkomponente, kein 'use client'):
figure[data-motion="gefaelle-dusche"].max-w-mass.text-tinte
  div[role="img"][aria-label=ZEICHNUNG_NAME].border.border-fuge.bg-fliese.p-4.lg:p-6
    svg (Planrahmen, viewBox "0 0 320 120", aria-hidden, focusable=false, fill none, stroke currentColor 1,5 px)
      g.text-strich: Schraffur der Schnittflächen (Rohdecke links und rechts vom Abflussrohr, Wand) · Fugen · Waagrechte gestrichelt (strokeDasharray "4 4")
      path.gefaelle-tropfen (fill currentColor, stroke none). Er steht VOR den Kanten, so liegen die Linien der Rinne über ihm, wenn er in den Ablauf sinkt.
      Linie Kanten (Wand, Rohdecke) · Linie Rinne mit Rost (drei Stäbe) und Abflussrohr · Linie Belag (Ober- und Unterkante der Fliesen: Badboden waagrecht, Duschboden im Gefälle, Reststück an der Wand) · Linie Brause an der Wand
      g > 3 × Linie.gefaelle-pfeil (Pfeile parallel zum Gefälle, 24 Einheiten über der Fliese; die g enthält NUR diese drei Pfade, wegen :nth-child)
  figcaption.mt-4.font-text.text-fs-3.text-pretty.text-tinte-2 > p (zwei Sätze)
Bild: links der Badboden (zwei Fliesen, waagrecht), ab x 88 ohne Kante der Duschboden, der bis zur Rinne an der Wand 16 Einheiten fällt (übertrieben, sonst unsichtbar; die gestrichelte Waagrechte zeigt die Neigung). Darunter ein keilförmiger Estrich (bleibt leer), die schraffierte Rohdecke und das Rohr aus der Rinne nach unten. Rechts die schraffierte Wand mit Brause. Farben nur über Klassen: Tinte (Kanten, Belag, Pfeile, Tropfen), Strich (Fugen, Schraffur, Waagrechte). Kein Rot (das eine Rot je Bildschirm trägt die Leitachse), keine Hex-Werte, keine Beliebigwerte, keine IDs, kein Text im SVG.

BREITEN: mobil m390: Spalte 358 px → Zeichnung 324 × 122 px (Maßstab 1,01; Tropfen etwa 12 px, Pfeil 32 px). md: Inhaltsspalte 8 von 8. ab lg: Inhaltsspalte 8 von 12, die figure endet bei max-w-mass (66ch, etwa 650 bis 700 px) → Zeichnung etwa 640 × 240 px, Rand lg:p-6. Die Höhe folgt aus der viewBox (h-auto w-full), also kein Layoutsprung (CLS 0). Bei 200 % Systemschrift: Die Zeichnung skaliert mit der Breite und nicht mit der Schrift. Die Unterschrift bricht um. Kein seitliches Scrollen. Die Unterschrift steht bewusst in text-fs-3 (mindestens 16 px mobil, K-006) statt fs-2 wie bei Tun/Zeichnung, wegen P1.

=== Datei 1: src/components/momente/gefaelle-dusche/geometrie.ts (wörtlich) ===
// Geometrie des großen Moments `gefaelle-dusche` (KERN v3.4 K-007, K-008; E3-GRAF-03): Schnitt durch eine Dusche ohne
// Stufe in Zeichnungseinheiten der viewBox. Reine Daten und Rechnungen ohne JSX, damit der Test sie direkt laden kann.
// Gekoppelt an bewegung.css (@keyframes gefaelle-tropfen, Beginn der Pfeile): Werte nur gemeinsam ändern, der Test
// test/gefaelle-dusche.test.mjs prüft beides.

const r = (n: number) => Math.round(n * 100) / 100;

export const VIEWBOX = '0 0 320 120';

/** Oberkante der Fliesen im Duschbereich: vom Badboden (links, waagrecht) im Gefälle bis zur Kante des Ablaufs.
 *  Die Neigung ist übertrieben gezeichnet (16 auf 168 Einheiten), damit man sie sieht. */
export const GEFAELLE = { x0: 88, y0: 52, x1: 256, y1: 68 } as const;

/** y der Fliesenoberkante an der Stelle x (links waagrecht, dazwischen im Gefälle, rechts waagrecht) */
export function oberkante(x: number): number {
  const { x0, y0, x1, y1 } = GEFAELLE;
  if (x <= x0) return y0;
  if (x >= x1) return y1;
  return y0 + ((x - x0) * (y1 - y0)) / (x1 - x0);
}

/** Ablauf (Rinne im Schnitt): Innenraum unter dem Rost */
export const RINNE = { links: 256, rechts: 280, oben: 68, boden: 84 } as const;

/** Tropfen: Mitte und Radius am Start (oben im Gefälle), Luft zwischen Tropfen und Fliese */
export const TROPFEN = { cx: 109, cy: 47.5, r: 6 } as const;
export const LUFT = 0.5;

/** Weg des Tropfens als Verschiebung (CSS translate in px = Einheiten der viewBox): bis zur Kante des Ablaufs, dann hinein.
 *  `anteilHang`: Anteil von dauer-5, zu dem der Tropfen die Kante erreicht. */
export const WEG = { hang: { x: 147, y: 14 }, ablauf: { x: 159, y: 29.5 }, anteilHang: 0.85 } as const;

/** Gefälle-Pfeile: Anfang und Spitze (x) entlang des Gefälles, Abstand über der Fliese */
export const PFEIL_ABSTAND = 24;
export const PFEILE = [
  [118, 150],
  [164, 196],
  [210, 242],
] as const;
/** Beginn je Pfeil als Anteil von dauer-5: sobald die Mitte des Tropfens den Anfang des Pfeils erreicht */
export const PFEIL_BEGINN = [0.05, 0.32, 0.58] as const;

/** Schnittflächen (schraffiert): Rohdecke links und rechts vom Abflussrohr, Wand. [x, y, b, h, Abstand] */
export const SCHNITT_FLAECHEN = [
  [8, 88, 256, 28, 4],
  [272, 88, 16, 28, 4],
  [288, 0, 16, 116, 6],
] as const;

export const PFADE = {
  /** Fugen zwischen den Fliesen (Strich) */
  fugen: 'M48 52v6M88 52v6M130 56v6M172 60v6M214 64v6',
  /** die Waagrechte über dem Duschboden, gestrichelt (Strich): zeigt, wie weit sich der Boden neigt */
  waage: 'M88 52H256',
  /** Wand (innen, außen), Rohdecke (oben mit Lücke für das Rohr, unten) */
  kanten: 'M288 0V116M304 0V116M8 88H264M272 88H288M8 116H304',
  /** Rinne mit Abflussrohr, Rost als drei Stäbe */
  rinne: 'M256 68V84H264V116M272 116V84H280V68M258 68h4M266 68h4M274 68h4',
  /** Fliesen: Ober- und Unterkante, Badboden waagrecht, Duschboden im Gefälle; Reststück zwischen Rinne und Wand */
  belag: 'M8 52H88L256 68M8 58H88L256 74M280 68H288M280 74H288',
  /** Brause an der Wand */
  brause: 'M288 6H272V14M260 14H284V18H260Z',
} as const;

/** Pfeil von xa nach xb parallel zum Gefälle, `abstand` über der Fliese; Spitze mit Schenkeln unter 45° (wie `pfeil`). */
export function pfeilEntlang(xa: number, xb: number, abstand: number = PFEIL_ABSTAND, spitze = 5): string {
  const ya = oberkante(xa) - abstand;
  const yb = oberkante(xb) - abstand;
  const l = Math.hypot(xb - xa, yb - ya);
  const ux = (xb - xa) / l;
  const uy = (yb - ya) / l;
  const bx = xb - spitze * ux;
  const by = yb - spitze * uy;
  return `M${r(xa)} ${r(ya)}L${r(xb)} ${r(yb)}M${r(bx - spitze * uy)} ${r(by + spitze * ux)}L${r(xb)} ${r(yb)}L${r(bx + spitze * uy)} ${r(by - spitze * ux)}`;
}

/** Tropfen mit Spitze nach oben: Kreis mit Radius r, Schenkel der Spitze unter 45° tangential an den Kreis. */
export function tropfenPfad(t: { cx: number; cy: number; r: number } = TROPFEN): string {
  const s = t.r * Math.SQRT1_2;
  return `M${r(t.cx)} ${r(t.cy - t.r * Math.SQRT2)}L${r(t.cx + s)} ${r(t.cy - s)}A${t.r} ${t.r} 0 1 1 ${r(t.cx - s)} ${r(t.cy - s)}Z`;
}

=== Datei 2: src/components/momente/gefaelle-dusche/GefaelleDusche.tsx (wörtlich) ===
// Großer Moment `gefaelle-dusche` (KERN v3.4 K-007, K-008; E3-GRAF-03; Schlitz `momente.tun` der ErzaehlSeite auf
// /bad/barrierefreies-bad): Schnitt durch eine Dusche ohne Stufe. Der Badboden geht ohne Kante in den Duschboden über, der
// sich zum Ablauf an der Wand neigt (Neigung übertrieben, gestrichelt die Waagrechte). Beim Eintritt (Sicht 0,4) läuft ein
// Tropfen über das Gefälle in den Ablauf, die drei Pfeile legen sich hinter ihm hin (CSS in bewegung.css, Auslöser im
// Bewegungsmodul). Ohne JavaScript, reduziert, im Notaus, im Druck und bei erzwungenen Farben: Pfeile stehen, kein Tropfen.
// Zeichenmittel aus kern/vignetten/zeichnen (1,5 px, currentColor, Fugen und Schnitt in Strich, kein Rot).
// Serverkomponente ohne Client-Code.
import { Linie, Planrahmen, schraffur } from '@/components/kern/vignetten/zeichnen';
import { PFADE, PFEILE, SCHNITT_FLAECHEN, VIEWBOX, pfeilEntlang, tropfenPfad } from './geometrie';

const SCHNITT = SCHNITT_FLAECHEN.map(([x, y, b, h, abstand]) => schraffur(x, y, b, h, abstand)).join('');

/** Name der Zeichnung für Screenreader (role="img") */
export const ZEICHNUNG_NAME =
  'Zeichnung einer Dusche ohne Stufe, von der Seite gesehen. Der Boden neigt sich zum Ablauf an der Wand. Pfeile zeigen, wohin das Wasser fließt.';

export default function GefaelleDusche() {
  return (
    <figure data-motion="gefaelle-dusche" className="max-w-mass text-tinte">
      <div role="img" aria-label={ZEICHNUNG_NAME} className="border border-fuge bg-fliese p-4 lg:p-6">
        <Planrahmen viewBox={VIEWBOX}>
          <g className="text-strich">
            <Linie d={SCHNITT} />
            <Linie d={PFADE.fugen} />
            <Linie d={PFADE.waage} strokeDasharray="4 4" />
          </g>
          {/* der Tropfen liegt unter den Kanten der Rinne: er sinkt in den Ablauf */}
          <path className="gefaelle-tropfen" d={tropfenPfad()} fill="currentColor" stroke="none" />
          <Linie d={PFADE.kanten} />
          <Linie d={PFADE.rinne} />
          <Linie d={PFADE.belag} />
          <Linie d={PFADE.brause} />
          <g>
            {PFEILE.map(([xa, xb]) => (
              <Linie key={xa} className="gefaelle-pfeil" d={pfeilEntlang(xa, xb)} />
            ))}
          </g>
        </Planrahmen>
      </div>
      <figcaption className="mt-4 font-text text-fs-3 text-pretty text-tinte-2">
        <p>Das Wasser läuft von selbst zum Ablauf. In echt ist die Neigung so klein, dass man sie kaum sieht.</p>
      </figcaption>
    </figure>
  );
}

=== Datei 3: _werkstatt/register/gefaelle-dusche.json (wörtlich; Verzeichnis neu anlegen) ===
{
  "kennung": "gefaelle-dusche",
  "paket": "E3-GRAF-03",
  "kern": "3.4",
  "zweck": "Zusammenhang: Wasser läuft zum Ablauf",
  "ausloeser": "sicht",
  "schwelle": 0.4,
  "dauer": "Tropfen dauer-5 (1200 ms) linear, einmal; Pfeile je dauer-2 · ease-setzen, Beginn bei 0,05 / 0,32 / 0,58 von dauer-5; gesamt 1200 ms",
  "eigenschaften": ["translate", "opacity"],
  "reduziert": "Pfeile statisch, kein Tropfen (Endzustand sofort)",
  "ersatzpfad": "ohne JavaScript, reduziert, Notaus, Druck, erzwungene Farben, Zurück und Vor (html.k-verlauf): Pfeile stehen, kein Tropfen",
  "wo": ["/bad/barrierefreies-bad"],
  "schlitz": "momente.tun (ErzaehlSeite)",
  "baustein": "src/components/momente/gefaelle-dusche/GefaelleDusche.tsx",
  "data_motion": "figure[data-motion=\"gefaelle-dusche\"]",
  "animiert": [".gefaelle-tropfen", ".gefaelle-pfeil"],
  "keyframes": ["gefaelle-tropfen", "gefaelle-pfeil"],
  "register_ts": "'gefaelle-dusche': { ausloeser: 'sicht', schwelle: 0.4 },",
  "bewegung_mjs": "'gefaelle-dusche': 'scroll'",
  "test": "test/gefaelle-dusche.test.mjs",
  "budget": { "js_gzip_kb": 0, "css_gzip_kb": 1.0, "svg_html_gzip_kb": 1.0 }
}

Die vierte Datei (Test) steht wörtlich im Feld pruefung. Diese Dateien wurden im Entwurf außerhalb des Repos mit tsc (strict, gegen die Typen des Repos) geprüft und liefen fehlerfrei. Der Test lief mit eingesetztem CSS-Block 6 von 6 grün, ohne den Block 5 grün und 1 übersprungen. Die Bildfolge mit sharp ergab bei 0/25/50/75/90/100 %: Der Tropfen liegt auf der Fliese, läuft das Gefälle hinab und versinkt in der Rinne; die Pfeile erscheinen hinter ihm.

## texte

[
 "Unterschrift, Satz 1 (wörtlich aus dem Seitentext, Abschnitt 3, großer Moment): „Das Wasser läuft von selbst zum Ablauf.“",
 "Unterschrift, Satz 2 (NEU, Alltagssprache, 12 Wörter): „In echt ist die Neigung so klein, dass man sie kaum sieht.“ Der Satz ist ehrlich zur übertriebenen Zeichnung (K-003 „Echt zeigen“) und nimmt P1 die Sorge vor einem schiefen Boden, auf dem man stolpert.",
 "Name der Zeichnung, aria-label an role=\"img\" (NEU): „Zeichnung einer Dusche ohne Stufe, von der Seite gesehen. Der Boden neigt sich zum Ablauf an der Wand. Pfeile zeigen, wohin das Wasser fließt.“ (ohne Gedankenstrich, Bezug Glossar „Gefälle“: „Der Boden neigt sich leicht, damit Wasser von selbst zum Ablauf fließt.“)",
 "Fachwörter: Der Moment nennt kein Glossarwort sichtbar. „Gefälle“ ist im selben Abschnitt schon beim ersten Vorkommen (Punkt 2: [[gefaelle|Gefälle]]) über Textmarken/Fachwort erklärt. „Ablauf“ und „Neigung“ sind Alltagswörter. „Duschrinne“ und „Punktablauf“ (Glossar) werden bewusst nicht benutzt.",
 "Kein Text im SVG (keine Beschriftungen; die Schrift würde bei 200 % nicht mitwachsen)."
]

## bewegung

AUSLÖSER: Sichtbarkeit IO 40 % der figure (Register 'sicht', schwelle 0.4). src/lib/motion/bewegung.ts setzt data-motion-stand="an" an figure[data-motion="gefaelle-dusche"], einmal (unobserve). Die Unterschrift gehört bewusst zur beobachteten figure. Damit zeigt die Schwelle mobil etwa 60 bis 65 % der Zeichnung, und der Tropfen (33 bis 46 % der Höhe) ist beim Start sicher im Bild.

ABLAUF (gesamt 1200 ms = dauer-5, einmal, keine Wiederholung, kein Federn):
- Vorher (nur unter html.k-bewegung:not(.k-notaus), noch nicht „an“): Der Tropfen liegt oben im Gefälle (opacity 1). Die Pfeile sind noch nicht gelegt (opacity 0).
- Tropfen .gefaelle-tropfen: @keyframes gefaelle-tropfen, var(--dauer-5) linear both. 0 % translate 0 0, opacity 1 → 85 % translate 147px 14px, opacity 1 (Kante des Ablaufs, genau parallel zur Fliese) → 100 % translate 159px 29.5px, opacity 0 (ganz in der Rinne unter dem Rost). px auf SVG-Elementen = Einheiten der viewBox, wie beim Verband in bewegung.css.
- Pfeile .gefaelle-pfeil: @keyframes gefaelle-pfeil (opacity 0 → 1), var(--dauer-2) var(--ease-setzen) both. Beginn je Pfeil calc(var(--dauer-5) * 0.05 / 0.32 / 0.58): genau wenn die Mitte des Tropfens den Anfang des Pfeils erreicht. Der dritte Pfeil steht bei 0,85, wenn der Tropfen die Kante erreicht.
- Danach (Endzustand, fill both): drei Pfeile stehen, der Tropfen ist im Ablauf verschwunden.
Nur translate und opacity. Kurven und Dauern nur aus Tokens (linear für die Fahrt wie verlangt, ease-setzen ohne Überschwingen für die Pfeile).

CSS-BLOCK für src/app/bewegung.css (setzt der Orchestrator ein, wörtlich, Stelle siehe gemeinsam):

/* gefaelle-dusche (K-007, großer Moment /bad/barrierefreies-bad, E3-GRAF-03) – Schnitt durch eine Dusche ohne Stufe: Beim
   Eintritt (Sicht 0,4, data-motion-stand="an" vom Bewegungsmodul) läuft ein Tropfen über das Gefälle in den Ablauf
   (dauer-5 linear, einmal) und verschwindet darin; die drei Pfeile legen sich hinter ihm hin, je Pfeil sobald der Tropfen
   seinen Anfang erreicht (dauer-2 · setzen). Weg in Einheiten der viewBox (px auf SVG-Elementen), Anteile von dauer-5;
   gekoppelt an src/components/momente/gefaelle-dusche/geometrie.ts (Test test/gefaelle-dusche.test.mjs). Ersatzpfad =
   Endzustand: Pfeile stehen, kein Tropfen (ohne JavaScript, reduziert, Notaus, Druck, erzwungene Farben, Zurück und
   Vor). Nur translate und opacity. */
.gefaelle-tropfen {
  opacity: 0;
}
@media screen and (prefers-reduced-motion: no-preference) and (forced-colors: none) {
  html.k-bewegung:not(.k-notaus) [data-motion="gefaelle-dusche"]:not([data-motion-stand="an"]) .gefaelle-tropfen {
    opacity: 1;
  }
  html.k-bewegung:not(.k-notaus) [data-motion="gefaelle-dusche"]:not([data-motion-stand="an"]) .gefaelle-pfeil {
    opacity: 0;
  }
  html.k-bewegung:not(.k-notaus) [data-motion="gefaelle-dusche"][data-motion-stand="an"] .gefaelle-tropfen {
    animation: gefaelle-tropfen var(--dauer-5) linear both;
  }
  html.k-bewegung:not(.k-notaus) [data-motion="gefaelle-dusche"][data-motion-stand="an"] .gefaelle-pfeil {
    animation: gefaelle-pfeil var(--dauer-2) var(--ease-setzen) both;
  }
  html.k-bewegung:not(.k-notaus) [data-motion="gefaelle-dusche"][data-motion-stand="an"] .gefaelle-pfeil:nth-child(1) { animation-delay: calc(var(--dauer-5) * 0.05); }
  html.k-bewegung:not(.k-notaus) [data-motion="gefaelle-dusche"][data-motion-stand="an"] .gefaelle-pfeil:nth-child(2) { animation-delay: calc(var(--dauer-5) * 0.32); }
  html.k-bewegung:not(.k-notaus) [data-motion="gefaelle-dusche"][data-motion-stand="an"] .gefaelle-pfeil:nth-child(3) { animation-delay: calc(var(--dauer-5) * 0.58); }
}
@keyframes gefaelle-tropfen {
  0% { translate: 0 0; opacity: 1; }
  85% { translate: 147px 14px; opacity: 1; }
  100% { translate: 159px 29.5px; opacity: 0; }
}
@keyframes gefaelle-pfeil {
  from { opacity: 0; }
  to { opacity: 1; }
}
/* Zurück und Vor (html.k-verlauf aus B-01, wie SIG-1): sofort der Endzustand, der Tropfen läuft nicht noch einmal */
html.k-verlauf [data-motion="gefaelle-dusche"] .gefaelle-tropfen {
  animation: none !important;
  opacity: 0 !important;
}
html.k-verlauf [data-motion="gefaelle-dusche"] .gefaelle-pfeil {
  animation: none !important;
  opacity: 1 !important;
}

ERSATZPFAD = ENDZUSTAND: In der Grundregel ist nur der Tropfen verborgen (opacity 0), die Pfeile stehen. Alle Start- und Laufregeln hängen an html.k-bewegung:not(.k-notaus) in @media screen and (prefers-reduced-motion: no-preference) and (forced-colors: none). Ohne JavaScript, bei reduzierter Bewegung, im Notaus, im Druck und bei erzwungenen Farben greift keine davon. Kein @supports nötig, weil keine view-timeline benutzt wird. Die Zeiten hängen an Sichtbarkeit, nicht an der Scrollposition.

## reduziert

Pfeile statisch, kein Tropfen: Das ist der Endzustand, ohne jede Überblendung. Die drei Gefälle-Pfeile, die Rinne und die Unterschrift „Das Wasser läuft von selbst zum Ablauf.“ tragen die Aussage allein. Technisch: Das Kopfskript setzt html.k-bewegung bei prefers-reduced-motion nicht. Zusätzlich steht der Block in @media (prefers-reduced-motion: no-preference), falls sich die Einstellung während des Besuchs ändert. Der Endzustand gilt genauso ohne JavaScript, im Notaus (k-notaus nach 2 s ohne Modul), im Druck, bei forced-colors und nach Zurück oder Vor (html.k-verlauf).

## zugang

ROLLE und NAME: Die Fliese um die Zeichnung ist div role="img" mit aria-label = ZEICHNUNG_NAME (bedeutungstragend nach K-008). Das svg darin bleibt aria-hidden="true" focusable="false" (Planrahmen). Danach liest der Screenreader die sichtbare figcaption (zwei kurze Sätze). Keine IDs, also auch keine doppelten.
TASTATUR und FOKUS: Nichts ist fokussierbar und nichts ist bedienbar. Es gibt keinen Tabstopp und keinen Hover. Die Bewegung braucht keine Eingabe und blockiert nichts.
LAYOUT: Die Größe steht fest über die viewBox (h-auto w-full). Die Bewegung verschiebt nur SVG-Inhalt mit translate und opacity, ohne Layoutänderung (CLS 0).
SEHEN: Linien 1,5 px in Tinte, Fugen und Schraffur in Strich (mindestens 3:1 auf Fliese). Die Bedeutung hängt nicht an Farbe (Form der Pfeile, Rinne, Text). Kein Rot. Die Unterschrift steht in text-fs-3 (mobil mindestens 16 px) in tinte-2 (9,01:1 auf Fliese, 8,19:1 auf Kalk).
FORCED-COLORS: Alles in currentColor → CanvasText, Fliese → Canvas. Die Bewegungsregeln greifen nicht (forced-colors: none in der Media-Abfrage). Die Pfeile stehen, der Tropfen ist verborgen.
REDUZIERTE BEWEGUNG, NOTAUS, OHNE JS: Endzustand, siehe Feld reduziert.
200 % SCHRIFT: Kein Text im SVG. Die Unterschrift bricht in max-w-mass um, ohne seitliches Scrollen.

## budget

JS: 0 KB. Es ist eine Serverkomponente ohne 'use client'. geometrie.ts läuft nur auf dem Server, der Auslöser ist das vorhandene Bewegungsmodul. CSS: Block 2,5 KB roh, etwa 0,95 KB gzip (gemessen). SVG im HTML: alle Pfade zusammen etwa 1,9 KB roh (die Schraffur 1,4 KB), mit dem Markup etwa 2,5 KB roh und etwa 1 KB gzip, im RSC-Payload noch einmal so viel. Weit unter den Grenzen „Zeichnung ≤ 40 KB gzip“ und „Bewegungscode ≤ 60 KB gzip“ (K-013). Keine Bilder, keine Schriften, keine Abhängigkeiten. Eine Client-Komponente ist nicht nötig, weil der Zustand über data-motion-stand aus bewegung.ts kommt und alles Weitere CSS ist.

## dateien

[
 "src/components/momente/gefaelle-dusche/geometrie.ts",
 "src/components/momente/gefaelle-dusche/GefaelleDusche.tsx",
 "_werkstatt/register/gefaelle-dusche.json",
 "test/gefaelle-dusche.test.mjs"
]

## gemeinsam

[
 "1) src/app/bewegung.css: den CSS-BLOCK aus dem Feld bewegung wörtlich direkt nach Zeile 771 einsetzen (nach `@keyframes szene-setzen { from { opacity: 0; scale: 0.6; } to { opacity: 1; scale: 1; } }`, Ende des Blocks szene-ablauf) und vor den Kommentar `/* einzugsband (K-007, /standorte und [stadt]; …`. Danach zeigt test/gefaelle-dusche.test.mjs 6 von 6 grün (Test 6 prüft die Kopplung an geometrie.ts).",
 "2) src/lib/motion/register.ts: nach der Zeile `fugenband: { ausloeser: 'scroll' },` einfügen:\n  // große Momente (K-007, E3-ORCH-02a): Sichtbarkeit 0,4, CSS in bewegung.css\n  'gefaelle-dusche': { ausloeser: 'sicht', schwelle: 0.4 },",
 "3) _werkstatt/register.json: \"gefaelle-dusche\" als letzten Eintrag in die Listen \"kennungen\" und \"v3\" aufnehmen.",
 "4) test/bewegung.test.mjs (im selben Commit wie 2, sonst wird Bewegung 1 rot): nach `const V2_SVG_E037 = [...]` einfügen `const GROSSE_MOMENTE = ['gefaelle-dusche']; // E3-ORCH-02a, K-007`. In Test „Bewegung 1“ beide Listen erweitern: `[...KERN_V3, ...V2_SVG_E037, ...GROSSE_MOMENTE, ...ENTFALLEN_E009]` und `for (const k of [...KERN_V3, ...V2_SVG_E037, ...GROSSE_MOMENTE])`. Neuen Test anhängen:\ntest('Bewegung 6: gefaelle-dusche löst über Sichtbarkeit 0,4 aus, auf allen Zeigegeräten (K-007)', () => {\n  assert.equal(schwelleFuer('gefaelle-dusche'), 0.4);\n  assert.ok(beobachteteKennungen(true).includes('gefaelle-dusche') && beobachteteKennungen(false).includes('gefaelle-dusche'));\n  assert.ok(!ladeKennungen().includes('gefaelle-dusche'));\n});\n(Bewegung 3 bleibt unverändert, weil der Moment kein Ladeeintrag ist.)",
 "5) package.json, Skript \"test\": ` test/gefaelle-dusche.test.mjs` an die Liste der Testdateien anhängen.",
 "6) _werkstatt/werkzeuge/bewegung.mjs, Objekt AUSLOESER: nach `startbild: 'scroll',` einfügen `// große Momente über Sichtbarkeit 0,4 (K-007): beim Durchscrollen auslösen, dann Zeitmodus\n  'gefaelle-dusche': 'scroll',` (sonst steht im Ergebnis „Annahme“).",
 "7) Vorschau zur Prüfung, src/app/(bestand)/werkstatt-schaufenster/erzaehlseite/page.dev.tsx: Import `import GefaelleDusche from '@/components/momente/gefaelle-dusche/GefaelleDusche';` ergänzen und die Rückgabe ändern zu `return <ErzaehlSeite inhalt={BARRIEREFREIES_BAD} momente={{ tun: <GefaelleDusche /> }} />;`.",
 "8) Vorlagen (ErzaehlSeite.tsx, teile/Tun.tsx): KEINE Änderung. Der Schlitz momente.tun trägt den Baustein schon (mt-16 nach Punkten und Absatz). Für den späteren Seitenbau E3-BAU-03 (nicht dieses Paket): in src/app/(bestand)/bad/barrierefreies-bad/page.jsx `import GefaelleDusche from '@/components/momente/gefaelle-dusche/GefaelleDusche';` und `<ErzaehlSeite inhalt={BARRIEREFREIES_BAD} momente={{ tun: <GefaelleDusche /> }} … />`.",
 "9) _werkstatt/texte/REF-bereich-barrierefreies-bad.md, Abschnitt 3, Zeile „Großer Moment gefaelle-dusche“: die Unterschrift ergänzen zu `Das Wasser läuft von selbst zum Ablauf. In echt ist die Neigung so klein, dass man sie kaum sieht.` (Textquelle im Gleichstand; texte-vergleich meldet nur entfernten Text, kein Pflichtpunkt).",
 "10) Wahlweise KERN K-007, Zeile gefaelle-dusche, Spalte „Dauer · Kurve“ präzisieren: `Tropfen dauer-5 linear, einmal; Pfeile legen sich hinter ihm hin (je dauer-2 · ease-setzen)`, Spalte „Reduziert“: `Pfeile statisch, kein Tropfen`."
]

## bildbedarf

[]

## pruefung

PAKET (Haiku, ohne Server):
1. Die vier Dateien wörtlich anlegen (Inhalte im Feld aufbau, Test unten). Keine andere Datei anfassen.
2. `cd /home/user/tezgel && npx tsc --noEmit`: keine Fehler in src/components/momente/gefaelle-dusche/*.
3. `npx eslint src/components/momente/gefaelle-dusche test/gefaelle-dusche.test.mjs`: sauber.
4. `node --experimental-strip-types --loader ./test/resolver.mjs --test test/gefaelle-dusche.test.mjs`: 5 bestanden, 1 übersprungen („bewegung.css noch ohne Block“), bis der Orchestrator gemeinsam 1 einsetzt; danach 6 von 6.
5. `grep -nE "#[0-9A-Fa-f]{6}|className=\"[^\"]*\[|style=" src/components/momente/gefaelle-dusche/*` liefert nichts (keine Hex-Werte, keine Beliebigwerte, kein Inline-style). `grep -n "–\|—" src/components/momente/gefaelle-dusche/GefaelleDusche.tsx` trifft nur Kommentare, keinen sichtbaren Text und kein aria-label.

=== Datei 4: test/gefaelle-dusche.test.mjs (wörtlich) ===
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { GEFAELLE, LUFT, PFEILE, PFEIL_ABSTAND, PFEIL_BEGINN, RINNE, TROPFEN, VIEWBOX, WEG, oberkante, pfeilEntlang, tropfenPfad } from '../src/components/momente/gefaelle-dusche/geometrie.ts';

// Großer Moment `gefaelle-dusche` (E3-GRAF-03): Der Tropfen liegt auf dem Gefälle, sein Weg endet im Ablauf, die Pfeile liegen
// parallel zum Gefälle und erscheinen, wenn der Tropfen sie erreicht. Die Werte in bewegung.css müssen zur Geometrie passen.
const nah = (a, b, eps = 0.01) => Math.abs(a - b) <= eps;
const [, , vbB, vbH] = VIEWBOX.split(' ').map(Number);

test('Gefälle 1: der Tropfen liegt am Start auf der Fliese, oben im Gefälle', () => {
  assert.ok(TROPFEN.cx > GEFAELLE.x0 && TROPFEN.cx < GEFAELLE.x1, 'Start im Gefälle');
  assert.ok(nah(TROPFEN.cy + TROPFEN.r + LUFT, oberkante(TROPFEN.cx)), 'Unterkante des Tropfens eine halbe Einheit über der Fliese');
});

test('Gefälle 2: der Weg bergab endet an der Kante des Ablaufs, parallel zur Fliese', () => {
  const x = TROPFEN.cx + WEG.hang.x;
  const y = TROPFEN.cy + WEG.hang.y;
  assert.equal(x, GEFAELLE.x1);
  assert.ok(nah(y + TROPFEN.r + LUFT, oberkante(x)));
  assert.ok(WEG.anteilHang > 0.5 && WEG.anteilHang < 1);
});

test('Gefälle 3: am Ende liegt der Tropfen ganz im Ablauf, unter dem Rost', () => {
  const cx = TROPFEN.cx + WEG.ablauf.x;
  const cy = TROPFEN.cy + WEG.ablauf.y;
  assert.ok(cx - TROPFEN.r > RINNE.links && cx + TROPFEN.r < RINNE.rechts, 'waagrecht in der Rinne');
  assert.ok(cy - TROPFEN.r * Math.SQRT2 > RINNE.oben, 'Spitze unter dem Rost');
  assert.ok(cy + TROPFEN.r < RINNE.boden, 'über dem Boden der Rinne');
});

test('Gefälle 4: Pfeile parallel zum Gefälle, über dem Tropfen, in Reihenfolge, Beginn passt zum Tropfen', () => {
  const spitzeTropfen = TROPFEN.r * Math.SQRT2 + TROPFEN.r + LUFT; // Abstand Fliese bis Spitze des Tropfens
  let vorher = GEFAELLE.x0;
  PFEILE.forEach(([xa, xb], i) => {
    assert.ok(xa > vorher && xb > xa && xb <= GEFAELLE.x1, `Pfeil ${i + 1} im Gefälle, nach dem vorigen`);
    vorher = xb;
    assert.ok(PFEIL_ABSTAND - 5 > spitzeTropfen, 'Schenkel der Spitze bleiben über dem Tropfen');
    const t = ((xa - TROPFEN.cx) / WEG.hang.x) * WEG.anteilHang;
    assert.ok(nah(PFEIL_BEGINN[i], Math.round(t * 100) / 100), `Beginn Pfeil ${i + 1} = ${t.toFixed(3)}`);
    const zahlen = pfeilEntlang(xa, xb).match(/-?\d+(\.\d+)?/g).map(Number);
    for (let k = 0; k < zahlen.length; k += 2) assert.ok(zahlen[k] >= 0 && zahlen[k] <= vbB && zahlen[k + 1] >= 0 && zahlen[k + 1] <= vbH, 'in der viewBox');
  });
});

test('Gefälle 5: Tropfenpfad ist geschlossen und liegt in der viewBox', () => {
  const d = tropfenPfad();
  assert.match(d, /^M[\d. ]+L[\d. ]+A6 6 0 1 1 [\d. ]+Z$/);
});

const css = fs.readFileSync(new URL('../src/app/bewegung.css', import.meta.url), 'utf8');
test('Gefälle 6: bewegung.css passt zur Geometrie (Weg, Anteil, Beginn der Pfeile)', { skip: !css.includes('@keyframes gefaelle-tropfen') && 'bewegung.css noch ohne Block gefaelle-dusche (E3-ORCH-02a)' }, () => {
  const block = css.slice(css.indexOf('@keyframes gefaelle-tropfen'));
  assert.ok(block.includes(`${Math.round(WEG.anteilHang * 100)}% { translate: ${WEG.hang.x}px ${WEG.hang.y}px; opacity: 1; }`));
  assert.ok(block.includes(`100% { translate: ${WEG.ablauf.x}px ${WEG.ablauf.y}px; opacity: 0; }`));
  PFEIL_BEGINN.forEach((a, i) => assert.ok(css.includes(`.gefaelle-pfeil:nth-child(${i + 1}) { animation-delay: calc(var(--dauer-5) * ${a}); }`), `Beginn Pfeil ${i + 1}`));
});

NACH DER EINBINDUNG (Orchestrator: gemeinsam 1 bis 7; danach Stufe A mit Dev-Server nach werkzeuge/EINRICHTUNG.md):
6. Bild m390 und d1440 von /werkstatt-schaufenster/erzaehlseite#was-wir-tun. Erwartung: Zeichnung als weiße Fliese mit Fugenrand unter Punkten und Absatz; Endzustand mit drei Pfeilen, kein Tropfen. Mobil etwa 324 px breit, ab lg höchstens max-w-mass.
7. `node _werkstatt/werkzeuge/bewegung.mjs --modus einzelbilder --seite /werkstatt-schaufenster/erzaehlseite --kennung gefaelle-dusche --ansicht m390` (und d1440). Erwartung im Zeitmodus mit längster Dauer 1200 ms: 0 % Tropfen oben im Gefälle, keine Pfeile · 25 % Tropfen im ersten Drittel, Pfeil 1 halb · 50 % Tropfen in der Mitte, Pfeil 1 ganz, Pfeil 2 halb · 75 % Tropfen kurz vor der Rinne, drei Pfeile (Pfeil 3 halb) · 100 % kein Tropfen, drei Pfeile. Bei 90 % sitzt der Tropfen halb durchsichtig über dem Rost: Das prüft, dass px auf SVG den Einheiten der viewBox entspricht.
8. `--modus reduziert`: keine Animation, figure sichtbar, .gefaelle-tropfen mit opacity 0, drei Pfeile sichtbar.
9. `--modus register`: keine Animation ohne data-motion; gefaelle-dusche registriert.
10. axe.mjs auf der Vorschau: role img mit Namen, keine neuen Verstöße. Tastatur: kein Tabstopp in der Zeichnung. Emulation forced-colors: Linien sichtbar, kein Tropfen, keine Bewegung. m390 mit 200 % Systemschrift: Unterschrift bricht um, kein seitliches Scrollen.
11. lesbarkeit.mjs auf der Vorschau (später /bad/barrierefreies-bad): Unterschrift mit 7 und 12 Wörtern, kein Gedankenstrich in Text und aria-label, kein Glossarwort offen.

## risiken

[
 "Schwelle 40 % auf der figure: Der Weg des Tropfens liegt bei 33 bis 70 % der Zeichnungshöhe. Weil die Unterschrift zur beobachteten figure gehört, sind beim Auslösen mobil etwa 60 bis 65 % der Zeichnung im Bild, der Start also sicher. Am Desktop sind es nur etwa 50 %. Wer genau an der Schwelle stehen bleibt, sieht das letzte Stück (das Versinken in der Rinne) erst beim Weiterscrollen. Prüfen in einzelbilder d1440; falls störend: Schwelle im Register nicht ändern (K-007), sondern die Unterschrift mit in die Höhe rechnen lassen.",
 "Die Verschiebung in px auf SVG-Pfaden gilt als Einheiten der viewBox (so arbeitet auch der Verband in bewegung.css). Hält sich ein Browser nicht daran, verfehlt der Tropfen die Rinne. Das Bild bei 90 % in einzelbilder zeigt es.",
 "(forced-colors: none) kennt Safari erst ab 16. Ältere Safari zeigen den Ersatzpfad: Pfeile stehen, keine Bewegung. Das ist hinnehmbar und gewollt robust.",
 "Kopplung CSS ↔ geometrie.ts: Weg (147/14, 159/29.5), 85 % und Beginn der Pfeile (0.05/0.32/0.58) nur gemeinsam ändern. Test 6 wacht darüber, ist aber übersprungen, bis der Block in bewegung.css steht.",
 "Sobald register.ts den Eintrag hat, wird test/bewegung.test.mjs „Bewegung 1“ rot, wenn gemeinsam 4 nicht im selben Commit kommt.",
 "Das Gefälle ist etwa viermal steiler gezeichnet als in echt (etwa 9,5 % statt etwa 2 %). Die neue zweite Unterschrift sagt das offen. Fällt sie weg, wirkt die Zeichnung unehrlich und macht P1 Sorge, dass der Boden schief ist.",
 "Die Seite /bad/barrierefreies-bad steht noch nicht auf der ErzaehlSeite (E3-BAU-03). Bis dahin ist der Moment nur im Dev-Schaufenster zu sehen (gemeinsam 7).",
 "Nach Zurück und Vor (html.k-verlauf) läuft der Tropfen absichtlich nicht noch einmal, wie bei SIG-1. Wer das anders will, streicht die zwei k-verlauf-Regeln.",
 "Der Abschnitt zeichnet spät (content-visibility, spaet-zeichnen). IntersectionObserver löst dort wie bei auftritt aus. Sollte der Tropfen im Schaufenster nie laufen, zuerst prüfen, ob data-motion-stand an der figure gesetzt wird."
]

