# gefaelle-balkon

## kennung

gefaelle-balkon

## seite

/balkon-terrasse (Erzählseite, Seitentext _werkstatt/texte/balkon-terrasse.md, Abschnitt 3 „Was wir tun“: „Großer Moment `gefaelle-balkon`: Zeichnung eines Balkons, ein Regentropfen läuft über das Gefälle ab. Unterschrift: `Der Regen läuft vom Balkon ab.`“). Gebaut gegen KERN v3.4 (K-003, K-005, K-007, K-008, K-010, K-012, K-013).

## schlitz

momente.tun: ErzaehlSeite reicht es an teile/Tun.tsx weiter und setzt es nach den vier Punktfliesen in `<div className="mt-16">{moment}</div>` (rechte Inhaltsspalte, ab lg 8 von 12 Spalten, mobil volle Breite). Einbau später durch E3-BAU-06 in src/app/(bestand)/balkon-terrasse/page.jsx: `import GefaelleBalkon from '@/components/momente/gefaelle-balkon/GefaelleBalkon';` und `<ErzaehlSeite inhalt={…} momente={{ tun: <GefaelleBalkon /> }} />`. An Vorlagen und Tun.tsx ändert sich nichts.

## wiederverwendung

Bestand geprüft (grep in src/ und _werkstatt/archiv/ nach gefaelle, Gefälle, Tropf, Rinne, Regen): Den Moment gibt es noch nicht. Es gibt nur die Zeile in K-007, die PLAN-Zeile E3-GRAF-04, den Hinweis in _werkstatt/bildplaetze.md:51 („Großer Moment `gefaelle-balkon`: Zeichnung“) und den Hinweis in _werkstatt/register.json. Das Archiv enthält keinen Code dazu, nur die alte Regel aus KERN v2: „45° nur bei Pfeilspitzen und Tropfen“. Diese Regel übernehmen wir für Tropfen und Pfeilspitzen. Wiederverwendet wird Folgendes.
(1) src/components/kern/vignetten/zeichnen.tsx: `Planrahmen` (svg mit viewBox, aria-hidden, focusable=false, fill none, stroke currentColor, strokeWidth 1.5, Enden square, Ecken miter), `Linie` (path mit vector-effect non-scaling-stroke) und `schraffur()` für Wand und Betonplatte im Schnitt. Der senkrechte Pfeil ist wörtlich `pfeil(220, 94, 114)`. Er steht als fester Text in geometrie.ts, denn der Test kann keine .tsx-Datei laden.
(2) Bildsprache wie vignetten/Untergrund.tsx (Schichtenschnitt mit Abdichtung und Hochzug, Schraffur in Strich, Kanten in Tinte, kein Rot) und vignetten/Bad.tsx (Pfeile für das Gefälle).
(3) Feld der Zeichnung wie `szene-plan` in kern/SzeneAblauf.tsx: `border border-fuge bg-fliese p-4`.
(4) src/components/kern/Fugenkreuz.tsx als Aufzählungszeichen der Legende, wie Punktfliesen in teile/Tun.tsx.
(5) Auslösung über das vorhandene Bewegungsmodul src/lib/motion/bewegung.ts. Es setzt `data-motion-stand="an"` bei Sicht 0,4. Das Muster stammt von `startbild` (CSS-Startzustand nur unter `html.k-bewegung:not(.k-notaus)`, Animation erst an `[data-motion-stand="an"]`). Am Modul ändert sich nichts.
(6) Typ `Stil = CSSProperties & Record<\`--${string}\`, number>` wie in src/components/start/Startbild.tsx für die CSS-Variable je Pfeil.
Bewusst nicht genutzt wird das Element `gefaelle` aus Verlegeplan.tsx. Es zeigt die Draufsicht, hier brauchen wir einen Schnitt. Auch kein Rot: Rot führt nur als Laserlinie (K-003/5), und die Leitachse trägt das eine Rot je Bildschirm (wie in SzeneAblauf).

## aufbau

Neue Serverkomponente ohne 'use client' und ohne Next-API. Zwei Dateien. Den Inhalt WÖRTLICH übernehmen.

=== Datei 1: src/components/momente/gefaelle-balkon/geometrie.ts (reine Rechnung, kein React, kein Import) ===
// Geometrie des großen Moments `gefaelle-balkon` (KERN v3.4 K-007, K-008; E3-GRAF-04): Schnitt durch einen Balkon in
// Zeichnungseinheiten (viewBox 0 16 240 112). Reine Rechnung ohne React, damit test/gefaelle-balkon.test.mjs sie prüfen kann.
// Von links: Hauswand im Schnitt, daran die Betonplatte des Balkons (schraffiert), darauf der Gefälleestrich (keilförmig,
// am Haus dicker), die Abdichtung mit Hochzug an der Wand, das Kleberbett und die Platten mit Fugen; vorn das Tropfblech
// mit Tropfnase und darunter die Rinne. Das Gefälle ist in der Zeichnung überhöht (7 % statt 1,5 bis 2 %), damit es am
// Handy zu sehen ist; die Zeichnung nennt keine Zahl.

export const VIEWBOX = '0 16 240 112';
export const GEFAELLE = 0.07;
export const TROPFEN_RADIUS = 4.5;
/** Mittelpunkt des Tropfens am Ende: er liegt in der Rinne (gezeichneter Endzustand) */
export const ENDE = { x: 209, y: 116 } as const;

export const r = (n: number) => Math.round(n * 100) / 100;

/** Oberkante des Gefälleestrichs; die Schichten darüber liegen parallel dazu */
export const estrich = (x: number) => 80 + (x - 28) * GEFAELLE;
export const abdichtung = (x: number) => estrich(x) - 3;
export const blech = (x: number) => estrich(x) - 4.5;
export const plattenUnten = (x: number) => estrich(x) - 6;
export const plattenOben = (x: number) => estrich(x) - 13;

/** Hauswand: Kanten und Schnittenden (die Wandfläche ist dort offen, wo die Betonplatte anschließt) */
export const WAND = 'M8 20H28M8 120H28M8 20V120M28 20V96M28 112V120';
/** Betonplatte des Balkons: Oberseite, Stirn, Unterseite */
export const BETON = 'M28 96H200V112H28';
export const ESTRICH = `M28 80L200 ${r(estrich(200))}V96`;
export const ABDICHTUNG = `M31 56V${r(abdichtung(31))}L200 ${r(abdichtung(200))}`;
export const PLATTEN =
  `M34 ${r(plattenOben(34))}L200 ${r(plattenOben(200))}` +
  `M34 ${r(plattenUnten(34))}L200 ${r(plattenUnten(200))}` +
  `M34 ${r(plattenOben(34))}V${r(plattenUnten(34))}` +
  `M200 ${r(plattenOben(200))}V${r(plattenUnten(200))}`;
export const FUGEN = [76, 118, 160].map((x) => `M${x} ${r(plattenOben(x))}V${r(plattenUnten(x))}`).join('');
/** Tropfblech: Schenkel im Kleberbett, senkrecht vor der Stirn, Tropfnase unter 45° nach außen */
export const TROPFKANTE = `M188 ${r(blech(188))}L204 ${r(blech(204))}V100L208 104`;
/** Rinne an der Stirn der Betonplatte, oben offen; die Tropfnase endet über ihr */
export const RINNE = 'M200 106V122H228V106';

/** Pfeil parallel über den Platten von x1 nach x2 (Spitze bei x2, Schenkel unter 45° zur Laufrichtung) */
export function pfeilEntlang(x1: number, x2: number, ueber = 18, spitze = 5): string {
  const ax = x1, ay = plattenOben(x1) - ueber, bx = x2, by = plattenOben(x2) - ueber;
  const l = Math.hypot(bx - ax, by - ay), ux = (bx - ax) / l, uy = (by - ay) / l;
  const c = Math.SQRT1_2 * spitze;
  return `M${r(ax)} ${r(ay)}L${r(bx)} ${r(by)}M${r(bx - c * (ux - uy))} ${r(by - c * (uy + ux))}L${r(bx)} ${r(by)}L${r(bx - c * (ux + uy))} ${r(by - c * (uy - ux))}`;
}

/** Pfeile des Wasserwegs; `ab` = Beginn des Einblendens als Anteil von dauer-5 (wenn der Tropfen den Pfeil erreicht) */
export const PFEILE: { d: string; ab: number; von?: number }[] = [
  { d: pfeilEntlang(64, 88), ab: 0.22, von: 64 },
  { d: pfeilEntlang(108, 132), ab: 0.41, von: 108 },
  { d: pfeilEntlang(152, 176), ab: 0.6, von: 152 },
  // senkrecht in die Rinne, gleich pfeil(220, 94, 114) aus kern/vignetten/zeichnen
  { d: 'M220 94V114M215 109L220 114L225 109', ab: 0.87 },
];

/** Tropfen mit Spitze nach oben (Schenkel unter 45°), Bauch um (cx, cy) */
export function tropfen(cx: number, cy: number, rr = TROPFEN_RADIUS): string {
  const t = rr * Math.SQRT1_2;
  return `M${r(cx)} ${r(cy - rr * Math.SQRT2)}L${r(cx + t)} ${r(cy - t)}A${rr} ${rr} 0 1 1 ${r(cx - t)} ${r(cy - t)}Z`;
}
export const TROPFEN = tropfen(ENDE.x, ENDE.y);

/** Stationen des Tropfens (Mittelpunkt) mit Anteil an dauer-5, gleichmäßig schnell (linear). Die Keyframes
 *  `gefaelle-balkon-tropfen` in bewegung.css verschieben den gezeichneten Tropfen um (x − ENDE.x, y − ENDE.y). */
export const WEG = [
  { name: 'regen', x: 48, y: 30, anteil: 0 },
  { name: 'landet', x: 48, y: 63.9, anteil: 0.15 },
  { name: 'kante', x: 196, y: 74.26, anteil: 0.79 },
  { name: 'ueber-kante', x: 209, y: 86, anteil: 0.87 },
  { name: 'rinne', x: 209, y: 116, anteil: 1 },
] as const;

(Kontrollwerte, nachgerechnet: ESTRICH „M28 80L200 92.04V96“, ABDICHTUNG „M31 56V77.21L200 89.04“, PLATTEN „M34 67.42L200 79.04M34 74.42L200 86.04M34 67.42V74.42M200 79.04V86.04“, FUGEN „M76 70.36V77.36M118 73.3V80.3M160 76.24V83.24“, TROPFKANTE „M188 86.7L204 87.82V100L208 104“, TROPFEN „M209 109.64L212.18 112.82A4.5 4.5 0 1 1 205.82 112.82Z“, Pfeil 1 „M64 51.52L88 53.2M84.72 49.43L88 53.2L84.23 56.48“.)

=== Datei 2: src/components/momente/gefaelle-balkon/GefaelleBalkon.tsx ===
// Großer Moment `gefaelle-balkon` (KERN v3.4 K-007, K-008; E3-GRAF-04) für /balkon-terrasse, Schlitz momente.tun der
// ErzaehlSeite: Schnitt durch einen Balkon. Ein Regentropfen fällt auf die Platten, läuft über das Gefälle zur Kante, über
// das Tropfblech in die Rinne und bleibt dort liegen; hinter ihm erscheinen die Pfeile des Wasserwegs. Auslöser Sicht 0,4
// (Register), dauer-5 linear, einmal; CSS in src/app/bewegung.css. Gezeichnet ist der Endzustand (Tropfen in der Rinne, alle
// Pfeile): ohne JavaScript, bei reduzierter Bewegung, nach dem Notaus, im Druck und bei erzwungenen Farben stehen die Pfeile
// still. Die Zeichnung ist dekorativ (aria-hidden über Planrahmen); was sie zeigt, sagen Unterschrift und Liste darunter.
// Linien 1,5 px wie die Plan-Vignetten, Töne über `color` (Strich für Schraffur und Fugen, Tinte für Bauteile und Wasser),
// kein Rot, keine IDs, kein Text im SVG. Serverkomponente ohne JavaScript.
import type { CSSProperties } from 'react';
import clsx from 'clsx';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import { Linie, Planrahmen, schraffur } from '@/components/kern/vignetten/zeichnen';
import { ABDICHTUNG, BETON, ESTRICH, FUGEN, PFEILE, PLATTEN, RINNE, TROPFEN, TROPFKANTE, VIEWBOX, WAND } from './geometrie';

/** Hauswand und Betonplatte im Schnitt */
const SCHNITT = schraffur(8, 20, 20, 100) + schraffur(28, 96, 172, 16, 4);

const LEGENDE = [
  'Die Platten liegen leicht schräg, weg vom Haus. So läuft der Regen zum Rand.',
  'Darunter liegt eine wasserdichte Schicht, die Abdichtung. Sie schützt den Beton.',
  'Am Rand tropft das Wasser über eine Blechkante in die Rinne.',
];

type Stil = CSSProperties & Record<`--${string}`, number>;

export default function GefaelleBalkon({ className }: { className?: string }) {
  return (
    <figure className={clsx('max-w-mass text-tinte', className)}>
      <div data-motion="gefaelle-balkon" className="border border-fuge bg-fliese p-4 lg:p-6">
        <Planrahmen viewBox={VIEWBOX}>
          <g className="text-strich">
            <Linie d={SCHNITT} />
            <Linie d={FUGEN} />
          </g>
          <Linie d={WAND + BETON + ESTRICH} />
          <Linie d={ABDICHTUNG} />
          <Linie d={PLATTEN} />
          <Linie d={TROPFKANTE + RINNE} />
          {PFEILE.map((p) => (
            <Linie key={p.d} d={p.d} className="gefaelle-balkon-pfeil" style={{ '--ab': p.ab } as Stil} />
          ))}
          <Linie d={TROPFEN} fill="currentColor" className="gefaelle-balkon-tropfen" />
        </Planrahmen>
      </div>
      <figcaption className="mt-4 font-text text-fs-3">
        <p className="font-semibold text-pretty text-tinte">Der Regen läuft vom Balkon ab.</p>
        <ul className="mt-3 grid gap-2 text-tinte-2">
          {LEGENDE.map((satz) => (
            <li key={satz} className="flex gap-3">
              <Fugenkreuz className="mt-2 size-3 text-strich" />
              <span className="min-w-0 flex-1 text-pretty hyphens-auto">{satz}</span>
            </li>
          ))}
        </ul>
      </figcaption>
    </figure>
  );
}

Raster und Breiten: Die Figur steht in der Inhaltsspalte von Tun. Mobil sind das 4 von 4 Spalten bei 16 px Rand, ab md 8 von 8, ab lg 8 von 12 rechts neben dem Kopf. Begrenzt ist sie auf `max-w-mass`. Die Zeichnung füllt die Breite, die Höhe folgt der viewBox (Seitenverhältnis 240 : 112). Bei m390 sind das etwa 324 × 151 px Zeichenfläche, bei d1440 etwa 640 × 300 px. Kein Layoutsprung, denn die Höhe ergibt sich aus der viewBox. Bei 200 % Systemschrift bricht nur die Legende um. Fugenkreuz ist shrink-0, und lange Wörter trennen über hyphens-auto. Die Zeichnung behält ihre Größe, die Linien bleiben 1,5 px (non-scaling). Kein seitliches Scrollen.
Farben nur über Tokens: text-tinte (Bauteile, Pfeile, gefüllter Tropfen über currentColor), text-strich (Schraffur, Fugen, Fugenkreuz), bg-fliese, border-fuge, text-tinte-2 (Legende). Keine Hex-Werte, keine Beliebigwerte, kein Inline-style außer der CSS-Variable --ab.

## texte

[
 "wörtlich aus dem Seitentext (Abschnitt 3): \"Der Regen läuft vom Balkon ab.\" (Bildunterschrift, erste Zeile der figcaption)",
 "NEU (Legende 1): \"Die Platten liegen leicht schräg, weg vom Haus. So läuft der Regen zum Rand.\"",
 "NEU (Legende 2): \"Darunter liegt eine wasserdichte Schicht, die Abdichtung. Sie schützt den Beton.\" Das Fachwort erklärt sich im Satz selbst. Ausgezeichnet ist es schon beim ersten Vorkommen in Punkt 4 von Tun über [[abdichtung|Abdichtung]], das im DOM davor steht. Darum hier keine Textmarke.",
 "NEU (Legende 3): \"Am Rand tropft das Wasser über eine Blechkante in die Rinne.\" Das Fachwort „Tropfkante“ bleibt bewusst weg, „Gefälle“ ebenso (in Punkt 1 schon erklärt).",
 "Hinweis zu den Regeln: 6 Sätze mit 4 bis 11 Wörtern, kein Gedankenstrich, kein Bindestrich, keine Floskel, keine Zahl. Das Gefälle bleibt ohne Zahl, F-21 nennt die Zahl schon in Punkt 1. Die Zeichnung zeigt allgemeines Fachwissen ohne Zusage (E-027). Im SVG steht kein Text, aria-label gibt es keines (dekorativ)."
]

## bewegung

Auslöser: Sichtbarkeit 0,4 auf dem Feld `div[data-motion="gefaelle-balkon"]`. Das vorhandene Bewegungsmodul setzt `data-motion-stand="an"` und beobachtet danach nicht weiter, die Bewegung läuft also einmal. Vor dem Auslösen gilt der Startzustand nur unter `html.k-bewegung:not(.k-notaus)`: Tropfen (.gefaelle-balkon-tropfen) und die vier Pfeile (.gefaelle-balkon-pfeil) haben opacity 0. Ablauf nach dem Auslösen:
(1) Keyframes `gefaelle-balkon-tropfen`, var(--dauer-5) = 1200 ms, linear, both. Der gezeichnete Tropfen liegt in der Rinne (209/116) und wird nur per `translate` (Zeichnungseinheiten) über seinen Weg geschoben, gleichmäßig schnell. Stationen nach WEG minus ENDE: 0 % fällt er als Regen über den Platten (−161/−86, opacity 0), bei 6 % ist er sichtbar (−161/−72.44, opacity 1), bei 15 % landet er auf der Platte (−161/−52.1), bei 79 % erreicht er die Kante (−13/−41.74), bei 87 % ist er über die Kante vor dem Tropfblech (0/−30), bei 100 % liegt er in der Rinne (0/0). Kein Nachfedern, kein Überschwingen: Er kommt an seinem Platz an und bleibt dort.
(2) Keyframes `gefaelle-balkon-pfeil` (opacity 0 → 1), var(--dauer-2) = 320 ms, linear, both, Verzögerung calc(var(--dauer-5) * var(--ab)) mit --ab = 0.22 / 0.41 / 0.6 / 0.87 je Pfeil. Jeder Pfeil erscheint, wenn der Tropfen ihn erreicht, der Weg zeichnet sich also hinter ihm. Gesamtdauer 0,87 · 1200 + 320 = 1364 ms, unter der Grenze von 1,6 s für große Momente.
Es werden nur translate und opacity animiert. Tokens: --dauer-5 und --dauer-2, Kurve linear (K-005 `ease-linear`). Das genaue CSS steht unter „gemeinsam“ Punkt 1. Ersatzpfad = Endzustand: Ohne html.k-bewegung (kein JS, reduziert), mit k-notaus, ohne Modul, im Druck und bei forced-colors gilt kein Startzustand. Der Tropfen liegt in der Rinne, alle Pfeile stehen. Keine Endlosschleife, kein Hover, keine Interaktion.

## reduziert

prefers-reduced-motion: reduce: Das Kopfskript setzt html.k-bewegung nicht. Damit greifen weder Startzustand noch Animation (K-007, Sofortzustand). Zu sehen ist der gezeichnete Endzustand: drei Pfeile über den Platten, ein Pfeil senkrecht in die Rinne, der Tropfen liegt in der Rinne. Das heißt „Pfeile statisch“. Gleiches gilt ohne JavaScript, nach dem Notaus (k-notaus nach 2 s ohne Modul), im Druck und bei forced-colors (dort zusätzlich `animation: none; opacity: 1; translate: none` mit !important). Der Prüfmodus `bewegung.mjs --modus reduziert` findet keine Animation mit translate und alle data-motion-Elemente sichtbar.

## zugang

Rolle: `<figure>` mit `<figcaption>`. Die Zeichnung ist dekorativ (Planrahmen setzt aria-hidden="true" focusable="false"), denn ihr Inhalt steht vollständig als Text in der Unterschrift und der Liste darunter (K-008: dekorativ, wenn der Text daneben alles sagt). Darum kein role="img", kein Name im SVG und keine IDs. Name und Beschreibung: Screenreader lesen „Der Regen läuft vom Balkon ab.“ und danach die Liste mit drei Punkten. Die Legende benennt die Lage („weg vom Haus“, „darunter“, „am Rand“), damit P1 die Teile der Zeichnung ohne Nummern findet. Tastatur und Fokus: nichts Bedienbares, kein Fokusziel, keine Tabstopps. Bewegung ist rein dekorativ, Bedeutung nie nur über Bewegung oder Farbe. Forced-colors: Alle Linien und der Tropfen nutzen currentColor und werden zu CanvasText, bg-fliese wird zu Canvas, die Animation entfällt (Endzustand). Kontrast: Strich #818698 auf Fliese ≥ 3:1 für Grafik, Tinte für Bauteile und Wasser. Text: fs-3 (mindestens 17 px), tinte bzw. tinte-2 (9,01:1 auf Fliese, 8,19:1 auf Kalk). Bei 200 % Schrift lesbar, Touchziele nicht betroffen.

## budget

JS 0 KB: Serverkomponente, die Geometrie wird beim Bauen auf dem Server gerechnet, kein 'use client', keine neue Insel. Im Budget „Bewegung ≤ 60 KB gzip“ zählt sie mit 0. CSS etwa 1,3 KB roh, etwa 0,5 KB gzip, in bewegung.css. SVG im HTML etwa 2,5 KB roh (davon Schraffur etwa 0,9 KB) und etwa 1 KB gzip, im RSC-Payload noch einmal etwa so viel. Weit unter „Zeichnung ≤ 40 KB gzip“ (K-008, K-013). Kein Bild, kein Font, keine Abhängigkeit. CLS 0, weil die Höhe aus der viewBox folgt. Laufzeit: eine einzige CSS-Animation mit 5 Elementen, nur Compositor-Eigenschaften.

## dateien

[
 "src/components/momente/gefaelle-balkon/geometrie.ts",
 "src/components/momente/gefaelle-balkon/GefaelleBalkon.tsx",
 "_werkstatt/register/gefaelle-balkon.json",
 "test/gefaelle-balkon.test.mjs"
]

## gemeinsam

[
 "1) src/app/bewegung.css: direkt nach der Zeile `@keyframes szene-setzen { from { opacity: 0; scale: 0.6; } to { opacity: 1; scale: 1; } }` (heute Zeile 771) und vor dem Kommentar `/* einzugsband (K-007, …` diesen Block wörtlich einfügen:\n/* gefaelle-balkon (großer Moment /balkon-terrasse, K-007, E3-GRAF-04): Schnitt durch einen Balkon. Ein Regentropfen fällt\n   auf die Platten, läuft gleichmäßig über das Gefälle zur Kante, über das Tropfblech in die Rinne und bleibt dort liegen;\n   hinter ihm erscheinen die Pfeile des Wasserwegs (je Pfeil --ab = Anteil von dauer-5, wenn der Tropfen ihn erreicht).\n   Auslöser Sicht 0,4 (data-motion-stand=\"an\" vom Bewegungsmodul), dauer-5 linear, einmal; gesamt 1,36 s. Gezeichnet ist\n   der Endzustand: ohne JavaScript, reduziert, nach dem Notaus, im Druck und bei erzwungenen Farben liegt der Tropfen in der\n   Rinne und die Pfeile stehen still. Nur translate und opacity, Verschiebung in Zeichnungseinheiten aus\n   momente/gefaelle-balkon/geometrie.ts (WEG minus ENDE; test/gefaelle-balkon.test.mjs vergleicht). */\nhtml.k-bewegung:not(.k-notaus) [data-motion=\"gefaelle-balkon\"]:not([data-motion-stand=\"an\"]) .gefaelle-balkon-tropfen,\nhtml.k-bewegung:not(.k-notaus) [data-motion=\"gefaelle-balkon\"]:not([data-motion-stand=\"an\"]) .gefaelle-balkon-pfeil {\n  opacity: 0;\n}\nhtml.k-bewegung:not(.k-notaus) [data-motion=\"gefaelle-balkon\"][data-motion-stand=\"an\"] .gefaelle-balkon-tropfen {\n  animation: gefaelle-balkon-tropfen var(--dauer-5) linear both;\n}\nhtml.k-bewegung:not(.k-notaus) [data-motion=\"gefaelle-balkon\"][data-motion-stand=\"an\"] .gefaelle-balkon-pfeil {\n  animation: gefaelle-balkon-pfeil var(--dauer-2) linear calc(var(--dauer-5) * var(--ab, 0)) both;\n}\n@keyframes gefaelle-balkon-tropfen {\n  0% { opacity: 0; translate: -161px -86px; }\n  6% { opacity: 1; translate: -161px -72.44px; }\n  15% { translate: -161px -52.1px; }\n  79% { translate: -13px -41.74px; }\n  87% { translate: 0 -30px; }\n  100% { translate: 0 0; }\n}\n@keyframes gefaelle-balkon-pfeil {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}\n@media print, (forced-colors: active) {\n  .gefaelle-balkon-tropfen,\n  .gefaelle-balkon-pfeil {\n    animation: none !important;\n    opacity: 1 !important;\n    translate: none !important;\n  }\n}\n(Am besten vor dem Bau durch Haiku einfügen, damit Stufe A die Bewegung sieht. Der Block hängt nur an Klassen des neuen Pakets und wirkt sonst nirgends.)",
 "2) src/lib/motion/register.ts: in `REGISTER` nach `fugenband: { ausloeser: 'scroll' },` einfügen: `  // große Momente E3 (K-007, E3-ORCH-02a)` und `  'gefaelle-balkon': { ausloeser: 'sicht', schwelle: 0.4 },`. Sonst nichts ändern: SELBST, ladeKennungen und Modul bleiben, wie sie sind.",
 "3) _werkstatt/register.json: \"gefaelle-balkon\" an die Arrays \"kennungen\" und \"v3\" anhängen, \"quelle\" auf KERN v3.4 heben, im \"hinweis\" gefaelle-balkon als übertragen vermerken.",
 "4) test/bewegung.test.mjs (E3-ORCH-02a): in „Bewegung 1“ die erwartete Liste um eine Konstante `const GROSSE_MOMENTE_E3 = ['gefaelle-balkon' /* und die übrigen E3-GRAF */];` erweitern (`[...KERN_V3, ...V2_SVG_E037, ...GROSSE_MOMENTE_E3, ...ENTFALLEN_E009]`). Dazu eine Prüfung: `assert.equal(schwelleFuer('gefaelle-balkon'), 0.4); assert.ok(beobachteteKennungen(true).includes('gefaelle-balkon') && beobachteteKennungen(false).includes('gefaelle-balkon')); assert.ok(!ladeKennungen().includes('gefaelle-balkon'));`. „Bewegung 3“ bleibt unverändert, denn ladeKennungen ändert sich nicht.",
 "5) package.json, Skript \"test\": `test/gefaelle-balkon.test.mjs` anhängen, erst NACH Punkt 1. Test 5 liest die Keyframes aus src/app/bewegung.css.",
 "6) _werkstatt/werkzeuge/bewegung.mjs, Objekt AUSLOESER: `'gefaelle-balkon': 'scroll',` ergänzen (beim Durchscrollen auslösen, wie startbild). Ohne den Eintrag gilt dort ohnehin „scroll“ als Annahme, die Ergänzung entfernt nur den Vermerk.",
 "7) Keine Änderung an globals.css (alle Tokens vorhanden: dauer-2, dauer-5, Farben), navigation.js, ErzaehlSeite.tsx, teile/Tun.tsx, glossar.ts (kein neues Fachwort) und KERN (die Zeile in K-007 stimmt so). Den Einbau in die Seite macht E3-BAU-06: `momente={{ tun: <GefaelleBalkon /> }}`."
]

## bildbedarf

[]

## pruefung

Paketeigene Prüfung (Haiku): (a) `npx tsc --noEmit` und `npx eslint src/components/momente/gefaelle-balkon test/gefaelle-balkon.test.mjs` ohne Befund. (b) Test: `node --experimental-strip-types --loader ./test/resolver.mjs --test test/gefaelle-balkon.test.mjs`. Vor der Übertragung des CSS (gemeinsam Punkt 1) mit `--test-name-pattern=\"Gefälle Balkon [1-4]\"`, danach alle 5. Test 5 schlägt ohne die Keyframes in bewegung.css absichtlich fehl. (c) Kontrollwerte aus „aufbau“ mit `node --experimental-strip-types -e \"import('./src/components/momente/gefaelle-balkon/geometrie.ts').then(m=>console.log(m.ESTRICH,m.TROPFEN,m.PFEILE[0].d))\"` vergleichen. (d) _werkstatt/register/gefaelle-balkon.json ist gültiges JSON (`node -e \"JSON.parse(require('fs').readFileSync('_werkstatt/register/gefaelle-balkon.json','utf8'))\"`). Inhalt: {\"kennung\":\"gefaelle-balkon\",\"paket\":\"E3-GRAF-04\",\"kern\":\"3.4\",\"zweck\":\"Zusammenhang: Regen läuft vom Balkon ab\",\"ausloeser\":\"sicht\",\"schwelle\":0.4,\"dauer\":\"dauer-5\",\"kurve\":\"linear\",\"einmal\":true,\"reduziert\":\"Pfeile statisch, Tropfen liegt in der Rinne (gezeichneter Endzustand)\",\"wo\":[\"/balkon-terrasse\"],\"schlitz\":\"momente.tun\",\"baustein\":\"src/components/momente/gefaelle-balkon/GefaelleBalkon.tsx\",\"animiert\":[\".gefaelle-balkon-tropfen\",\".gefaelle-balkon-pfeil\"],\"eigenschaften\":[\"translate\",\"opacity\"],\"keyframes\":[\"gefaelle-balkon-tropfen\",\"gefaelle-balkon-pfeil\"],\"register_ts\":\"'gefaelle-balkon': { ausloeser: 'sicht', schwelle: 0.4 },\",\"werkzeug_ausloeser\":\"scroll\",\"test\":\"test/gefaelle-balkon.test.mjs\",\"budget\":{\"js_gzip_kb\":0,\"css_gzip_kb\":0.5,\"svg_gzip_kb\":1}}. (e) Zeichen und Lesbarkeit der Texte: kein Gedankenstrich, kein Bindestrich, keine Hex-Werte und keine Beliebigwerte (`grep -nE \"#[0-9a-fA-F]{3,6}|\\[[0-9]\" src/components/momente/gefaelle-balkon/*` leer).\nNach Einbau der Seite (E3-BAU-06, Stufe A): Bild m390 (auch mit 200 % Systemschrift) und d1440 vom Abschnitt „Was wir tun“. Erwartet werden die Zeichnung im weißen Feld mit Fugenrand, das sichtbare Gefälle der Platten, ein Tropfen in der Rinne, vier Pfeile, die Unterschrift fett und drei Legendenzeilen mit Fugenkreuz, kein seitliches Scrollen. Mit `node _werkstatt/werkzeuge/bewegung.mjs --modus einzelbilder --seite /balkon-terrasse --kennung gefaelle-balkon` müssen die fünf Bilder Regen über den Platten, Gleiten, Kante und Rinne zeigen, mit Pfeilen, die nacheinander erscheinen. `--modus reduziert`: keine Animation, alles sichtbar. `--modus register`: data-motion=\"gefaelle-balkon\" ist registriert, keine Animation ohne data-motion. Tastatur: Tab überspringt die Figur. Lesbarkeit der Seite mit `werkzeuge/lesbarkeit.mjs`: glossar-offen 0 (Abdichtung und Gefälle sind in den Punktfliesen davor erklärt).

## risiken

[
 "Test 5 liest src/app/bewegung.css. Bevor der Orchestrator den Block aus „gemeinsam“ Punkt 1 einfügt, schlägt er fehl. Darum kommt er erst danach ins Skript „test“ der package.json, und Haiku prüft vorher nur 1 bis 4.",
 "Bei der Übertragung dürfen die Keyframe-Werte und --ab nicht von WEG und PFEILE abweichen. Test 5 vergleicht die Stopps 0/15/79/87/100 %. Den Zwischenstopp 6 % (−161/−72.44, nur für das Einblenden) prüft er nicht. Liegt er nicht auf der Linie zwischen 0 % und 15 %, macht der Tropfen dort einen kleinen Knick.",
 "Tun zeichnet spät (content-visibility: auto über `spaet`). Der Beobachter meldet die 40 % erst, wenn der Abschnitt gezeichnet ist. Das ist gewollt, wie bei `auftritt`. Bei sehr schnellem Scrollen kann der Moment schon laufen, während er den Bildschirm verlässt. Das ist harmlos, denn der Endzustand stimmt.",
 "Bei Zurück und Vor (B-01, html.k-verlauf) läuft der Moment noch einmal, sobald er zu 40 % im Blick ist (wie alle Sicht-Einträge). Wer stattdessen den Endzustand will, ergänzt eine Regel unter `html.k-verlauf` mit animation: none (gemeinsame Datei).",
 "Das Gefälle ist in der Zeichnung auf 7 % überhöht (Kommentar in geometrie.ts). Punkt 1 der Seite nennt richtig „mindestens 1,5 bis 2 %“. Die Zeichnung nennt keine Zahl, damit niemand 7 % abliest.",
 "Paralleles Paket E3-GRAF-03 (`gefaelle-dusche`) zeichnet vermutlich auch einen Tropfen. Klassen und Keyframes heißen hier durchgehend `gefaelle-balkon-*`, also gibt es keinen Namenskonflikt. Eine gemeinsame Hilfsfunktion `tropfen()` in kern/vignetten/zeichnen.tsx kann der Orchestrator später herausziehen. Das Paket darf zeichnen.tsx nicht ändern.",
 "Die CSS-Eigenschaft `translate` auf SVG-Pfaden rechnet in Zeichnungseinheiten. Das trägt schon die Bewegung `verband` (bewegung.css: translate 40px auf .verband-reihe). Browser ohne die Eigenschaft (Safari < 14.1) zeigen den Endzustand ohne Bewegung.",
 "Die Legende fügt der Seite drei kurze, neue Sätze hinzu. Sie sind nicht im lektorierten Seitentext. Darum sollte E3-LEKT-05 oder der Orchestrator sie abnehmen, ehe die Seite gebaut wird.",
 "Ich habe keinen Server oder Browser gestartet. Die Zeichnung habe ich nur als statisches SVG mit sharp gerastert (Endzustand und Zwischenstand) und dabei Lage, Gefälle, Rinne und Abstände der Pfeile geprüft. Die Werte aus geometrie.ts und der Test liefen im Scratchpad grün (5 von 5)."
]

