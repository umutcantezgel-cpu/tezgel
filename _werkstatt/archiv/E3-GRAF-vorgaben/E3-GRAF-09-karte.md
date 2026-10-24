# karte

## kennung

karte

## seite

/ueber-uns (Abschnitt 5 „Beleg“). Auf /standorte und /standorte/[stadt] später wiederverwendbar (Props `aktuell`, `liste={false}`). Darüber entscheidet der Orchestrator bei E3-BAU-10 und E4-BAU-14.

## schlitz

momente.beleg (ErzaehlSeite → teile/Beleg.tsx setzt den Moment nach Fotos und Satz in `<div className="mt-16">` und vor `inhalt.verweis`). Wahlweise später auch im Schlitz `karte` der OrtsSeite, dort mit `aktuell={slug}` und `liste={false}`.

## wiederverwendung

BESTANDSPRÜFUNG: In src/ gibt es noch keinen Moment `karte`. `register.ts` hat keinen Eintrag `karte`. `_werkstatt/register.json` nennt `karte` nur im Hinweis für E3-ORCH-02a. In `_werkstatt/archiv/` gibt es keine Einsatzkarte. Vorhanden sind: (a) der Schlitz `karte` in src/components/vorlagen/OrtsSeite.tsx, heute für das Einzugsband; (b) `InteractiveRadarCanvas` in src/components/maps/InteractiveServiceMap.tsx mit den Ringen 10/25/45 km und einem roten Fadenkreuz. Diese Komponente ist ein Client-Baustein hinter dem Einwilligungs-Tor, zeigt keine Orte und hat rote Vollachsen. Darum wird nur die Idee der Ringe übernommen, kein Code. NUTZEN WIR WEITER: Planrahmen, Linie und Punkt aus src/components/kern/vignetten/zeichnen.tsx (1,5 px, non-scaling, currentColor, aria-hidden). Fugenkreuz aus src/components/kern/Fugenkreuz.tsx. WeiterLink aus src/components/kern/WeiterLink.tsx. `zusammen` aus src/components/kern/zusammen.tsx. `linkKlassen` aus src/components/kern/stile.ts. `gruppiereNachZone`, `mitEntfernungAbSitz`, `zoneFuer` und der Typ `Zone` aus src/lib/einzugszonen.ts. `CITY_COORDINATES`, `CITY_HUB_DATA`, `TEZGEL_HQ_COORDS` und der Typ `MapCoordinates` aus src/lib/maps/getMapEmbedUrl.ts: Entfernungen ab Aßlar, dieselbe Quelle wie Einzugsband und Einsatzorte. `CITIES` und der Typ `CityData` aus src/config/cities.ts. WORTLAUT AUS DEM BESTAND: Gruppennamen „Bis 10 km ab Aßlar / Bis 25 km ab Aßlar / Mehr als 25 km ab Aßlar“ aus vorlagen/teile/Einsatzorte.tsx (GRUPPE_NAME; ohne 50 km nach K-015), Zeilenform Ortslink plus Entfernung in Mono wie dort, „Firmensitz“ und „ca. N km“ sowie „Firmensitz Aßlar“ mit rotem Fugenkreuz aus kern/Einzugsband.tsx. MUSTER: style nur mit CSS-Variable und dazu eine Klasse in globals.css wie Zeitband (`--jahre`, `.zeitband-stueck`) und Verlegeplan (`--plan-versatz`). Bewegung über Sichtbarkeit (`data-motion-stand="an"` aus src/lib/motion/bewegung.ts) mit CSS-Übergängen wie `auftritt` in bewegung.css. Staffel in Stufen von `--staffel` wie beim `einzugsband`. NICHT GEEIGNET: Verlegeplan, Fliesenkomposition, Einzugsband, SzeneAblauf, VerbandUmschalter, Zeitband, Feldraster, Bildfeld. Es gibt kein Foto, nach K-003 Nr. 3 ist die Zeichnung erlaubt.

## aufbau

GEPRÜFTE VORLAGEN (wörtlich übernehmen): /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/karte/final/geometrie.ts → src/components/momente/karte/geometrie.ts · …/final/Einsatzkarte.tsx → src/components/momente/karte/Einsatzkarte.tsx · …/final/karte.test.mjs → test/karte.test.mjs · …/final/karte.json → _werkstatt/register/karte.json. Prüfstand der Entwürfe: tsc 0 Fehler, eslint 0, werte.mjs 0 Befunde, 7 von 7 Tests grün, textpruefung GRÜN. Fehlt die Datei im Scratchpad, gilt der Wortlaut unten.

STRUKTUR (Serverkomponente, kein 'use client'):
figure.border.border-fuge.bg-fliese
├ figcaption (nur mit Prop `unterschrift`): border-b border-fuge p-4 font-text text-fs-4 text-pretty text-tinte lg:px-8 lg:py-6
└ div.grid md:grid-cols-8 lg:grid-cols-12 (mit `liste`; ohne `liste` steht die Zeichnung allein in der figure)
  ├ Zeichnungsspalte: border-b border-fuge md:col-span-5 md:border-r md:border-b-0 lg:col-span-7
  │ └ div role="img" aria-label=BILDNAME data-motion="karte" class="@container relative aspect-square w-full overflow-hidden max-md:max-w-md"
  │   ├ Planrahmen viewBox="-200 -200 400 400" fuellen className="absolute inset-0" (SVG aria-hidden, Strich 1,5 px)
  │   │ ├ g.text-fuge > Linie d=fugenraster(): Fugenraster im Drittelverband, Fliese 80 × 40
  │   │ ├ g.text-strich > Linie: Waage und Lot durch Aßlar über die ganze Fläche
  │   │ ├ g.text-tinte-2 > Punkt.karte-ring data-zone="nah" r=radius(10)=84.9 und data-zone="mittel" r=radius(25)=134.2
  │   │ ├ g.text-tinte > je Zone g.karte-orte data-zone="nah|mittel|weit" > Punkt je Ort (ohne Aßlar). Beschriftete Orte r=5 fill-current, andere r=3.5 fill-fliese.
  │   │ └ path ASSLAR (Fugenkreuz 15 Einheiten) stroke="none" class="fill-current text-laser" im Ursprung
  │   ├ span.karte-marke (aria-hidden) „Aßlar“ über dem Kreuz: -translate-x-1/2 -translate-y-full pb-4 text-center lg:pb-6. Innen: block bg-fliese px-1 font-text text-fs-2 font-semibold whitespace-nowrap text-tinte.
  │   ├ je Ring span.karte-marke -translate-1/2 an (0, r) auf dem Lot unter Aßlar: „10 km“, „25 km“ (bg-fliese px-1 font-mono text-fs-1 text-tinte-2)
  │   └ je beschrifteter Ort span.karte-marke @max-3xs:hidden plus LAGE_KLASSEN[LAGE[slug]]. Innen ein Kasten bg-fliese px-1 whitespace-nowrap mit Name (font-text text-fs-2 font-semibold text-tinte) und Entfernung (font-mono text-fs-1 text-tinte-2).
  └ Listenspalte: flex flex-col gap-6 p-4 md:col-span-3 lg:col-span-5 lg:p-8
    ├ Legende ul (font-text text-fs-2 text-tinte): [Fugenkreuz size-3 text-laser] „Firmensitz Aßlar“ · [Kreis-SVG 12 px text-tinte-2] „Die Ringe zeigen 10 und 25 km ab Aßlar.“
    ├ je Zone: h3 (font-text text-fs-2 font-semibold text-tinte-2) und ul (mt-2 border-t border-fuge). Je Ort ein li (flex flex-wrap items-center justify-between gap-x-3 border-b border-fuge) mit Link /standorte/<slug>. Link: linkKlassen, flex min-h-11 flex-1 items-center gap-2 font-text text-fs-3 hyphens-none, data-motion="zustand", aria-current bei `aktuell`. Daneben die Entfernung (shrink-0 font-mono text-fs-1 text-tinte-2).
    ├ p (font-text text-fs-2 text-tinte-2): „Entfernungen sind ungefähre Angaben ab Aßlar.“
    └ p > WeiterLink (nur mit Prop `verweis`)

GEOMETRIE (geometrie.ts): Aßlar liegt im Ursprung, Norden ist oben. Die Richtung kommt aus den Koordinaten, `atan2(dLat, dLng·cos(lat Aßlar))`. Der Abstand wird radius(km) = runde(180·√(min(km,45)/45)). Die Ringe stehen im selben Maßstab, so liegt jeder Ort im richtigen Band. Gießen liegt auf dem 25-km-Ring, Braunfels auf dem 10-km-Ring. Lage der Orte in Zeichnungseinheiten: wetzlar 41.7/43.1 · giessen 134.2/2.6 · herborn -88.4/-81.2 · solms -42.7/62.7 · braunfels -43.5/72.9 · dillenburg -79.5/-108.1 · haiger -107.1/-100.7 · marburg 114.8/-125 · limburg -123.4/99.8 · butzbach 103.5/120.3 · bad-nauheim 106.2/132.4 · friedberg 106.9/144.8. Die Beschriftungen stehen in HTML. Sie sitzen über die Klasse `.karte-marke` (globals.css, left: var(--x); top: var(--y)), die Werte kommen per style als CSS-Variable aus prozent(). Die Fläche ist quadratisch, darum treffen die Prozent genau.

BREITEN: m360 Zeichnung 326 px · m390 356 px · md (t768) 5 von 8 Spalten ≈ 440 px, Liste daneben · lg 7 von 12 Spalten (t1024 ≈ 540 px, d1440 ≈ 700 px), Liste 5 von 12. Unter md ist die Zeichnung höchstens 28rem breit (max-md:max-w-md).

200 % SCHRIFT: Die Beschriftungen wachsen mit, weil sie HTML sind. Ist die Zeichenfläche schmaler als 16rem (mobil ab etwa 150 % Schrift), blendet `@max-3xs:hidden` die Ortsnamen aus. Aßlar und die Ringmarken bleiben. Die Liste trägt alle Orte mit Entfernung und bricht um (flex-wrap: die Entfernung rutscht unter den Namen). md und lg greifen bei großer Schrift später, die Spalten stapeln sich dann. `overflow-hidden` an der Zeichnung verhindert seitliches Scrollen.

WORTLAUT geometrie.ts:
// Geometrie der Einsatzkarte (großer Moment `karte`, KERN v3.4 K-007 und K-008, E3-GRAF-09). Reine Funktionen, getestet in
// test/karte.test.mjs. Zeichenfläche viewBox -200 -200 400 400, Aßlar im Ursprung, Norden oben. Die Richtung jedes Ortes
// kommt aus seinen Koordinaten (CITY_COORDINATES), der Abstand aus der Entfernung ab Aßlar (CITY_HUB_DATA, gerundete Angaben)
// im Wurzelmaßstab bis 45 km: innen bleibt Platz für die nahen Orte, die Ringe 10 und 25 km stehen im selben Maßstab, jeder
// Ort liegt also im richtigen Band. Kein Kartenmaßstab (wie die Zonen in src/lib/einzugszonen.ts).
import type { CityData } from '@/config/cities';
import type { MapCoordinates } from '@/lib/maps/getMapEmbedUrl';
import type { Zone } from '@/lib/einzugszonen';
import { zoneFuer } from '@/lib/einzugszonen';

/** halbe Kantenlänge der Zeichenfläche (viewBox -200 -200 400 400) */
export const HALB = 200;
/** Abstand des weitesten Ortes vom Mittelpunkt */
export const R_AUSSEN = 180;
/** weitester Ort des Einsatzgebiets (Friedberg, K-015 F-09) */
export const KM_AUSSEN = 45;
/** Ringe um Aßlar in km (Grenzen der Zonen nah und mittel) */
export const RINGE_KM = [10, 25] as const;

/** Lage der Beschriftung am Punkt; je Ort so gewählt, dass bei 360 px nichts überläuft und die Standardnamen sich nicht berühren */
export type Lage = 'oben' | 'unten' | 'links' | 'rechts';
export const LAGE: Readonly<Record<string, Lage>> = {
  asslar: 'oben',
  wetzlar: 'rechts',
  giessen: 'oben',
  herborn: 'unten',
  solms: 'links',
  braunfels: 'unten',
  dillenburg: 'oben',
  haiger: 'oben',
  marburg: 'links',
  limburg: 'rechts',
  butzbach: 'links',
  'bad-nauheim': 'links',
  friedberg: 'links',
};

export interface Kartenort {
  slug: string;
  name: string;
  km: number;
  zone: Zone['id'];
  x: number;
  y: number;
}

/** auf eine Nachkommastelle, ohne -0 */
function runde(n: number): number {
  const w = Math.round(n * 10) / 10;
  return w === 0 ? 0 : w;
}

/** Abstand vom Mittelpunkt in Zeichnungseinheiten (Wurzelmaßstab, 0 bis R_AUSSEN) */
export function radius(km: number): number {
  const k = Math.min(Math.max(km, 0), KM_AUSSEN);
  return runde(R_AUSSEN * Math.sqrt(k / KM_AUSSEN));
}

/** Richtung von `von` nach `nach` im Bogenmaß: 0 = Osten, π/2 = Norden (Länge mit cos der Breite gestaucht) */
export function richtung(von: MapCoordinates, nach: MapCoordinates): number {
  const dx = (nach.lng - von.lng) * Math.cos((von.lat * Math.PI) / 180);
  const dy = nach.lat - von.lat;
  return Math.atan2(dy, dx);
}

/** Punkt in der Zeichnung; SVG zählt y nach unten, Norden liegt also bei negativem y */
export function punkt(km: number, winkel: number): { x: number; y: number } {
  const r = radius(km);
  return { x: runde(r * Math.cos(winkel)), y: runde(-r * Math.sin(winkel)) };
}

/** Lage in Prozent der quadratischen Zeichenfläche, für Beschriftungen in HTML (--x, --y) */
export function prozent(wert: number): string {
  return `${runde(((wert + HALB) / (2 * HALB)) * 100)}%`;
}

/** Fugenraster im Drittelverband als Pfad: Fliese 80 × 40, jede Reihe um ein Drittel versetzt, deckt die ganze Fläche */
export function fugenraster(): string {
  const laenge = 80;
  const hoehe = 40;
  const teile: string[] = [];
  for (let y = -HALB + hoehe; y < HALB; y += hoehe) teile.push(`M${-HALB} ${y}H${HALB}`);
  for (let reihe = 0; reihe < (2 * HALB) / hoehe; reihe++) {
    const oben = -HALB + reihe * hoehe;
    const versatz = ((reihe % 3) * laenge) / 3;
    for (let x = -HALB + versatz; x < HALB; x += laenge) {
      if (x > -HALB) teile.push(`M${runde(x)} ${oben}v${hoehe}`);
    }
  }
  return teile.join('');
}

/** Orte mit Lage in der Zeichnung; der Firmensitz (0 km) liegt im Ursprung, Orte ohne Koordinaten fallen aus der Zeichnung */
export function kartenorte(
  orte: readonly Pick<CityData, 'slug' | 'name' | 'distanceKm'>[],
  koordinaten: Readonly<Record<string, MapCoordinates | undefined>>,
  sitz: MapCoordinates,
): Kartenort[] {
  return orte.flatMap((o) => {
    const k = koordinaten[o.slug];
    if (!k) return [];
    const { x, y } = punkt(o.distanceKm, richtung(sitz, k));
    return [{ slug: o.slug, name: o.name, km: o.distanceKm, zone: zoneFuer(o.distanceKm).id, x, y }];
  });
}

WORTLAUT Einsatzkarte.tsx:
// Großer Moment `karte` (KERN v3.4 K-007, K-008, K-012; E3-GRAF-09): gezeichnete Einsatzkarte, Aßlar in der Mitte, Ringe bei
// 10 und 25 km, die Orte aus CITIES in ihrer Himmelsrichtung, Abstand nach der Entfernung ab Aßlar (geometrie.ts, kein
// Kartenmaßstab). Zeichnung statt Foto, keine Kartenkacheln, keine Anfrage an fremde Server, kein Skript. Daneben die Orte als
// Liste mit Link und Entfernung: Sie trägt den Inhalt der Zeichnung als Text (Aufgabe A6) und bleibt bei großer Schrift lesbar.
// Bewegung (bewegung.css, Block „karte“): beim Eintritt (Sicht 0,4) legen sich die Ringe von innen nach außen an ihren Platz, die
// Punkte jeder Zone erscheinen mit ihrem Ring. Aßlar, Achsen, Raster und alle Beschriftungen stehen ab dem ersten Bild;
// reduziert, ohne JavaScript und im Druck steht die Karte fertig. Beschriftungen in HTML (wachsen mit der Systemschrift), Lage
// über --x und --y (Klasse karte-marke, globals.css); unter 16rem Flächenbreite (große Schrift) bleiben nur Aßlar und die Ringe.
// Serverkomponente.
import type { CSSProperties } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import WeiterLink from '@/components/kern/WeiterLink';
import { linkKlassen } from '@/components/kern/stile';
import { zusammen } from '@/components/kern/zusammen';
import { Linie, Planrahmen, Punkt } from '@/components/kern/vignetten/zeichnen';
import { CITIES } from '@/config/cities';
import { CITY_COORDINATES, CITY_HUB_DATA, TEZGEL_HQ_COORDS } from '@/lib/maps/getMapEmbedUrl';
import { gruppiereNachZone, mitEntfernungAbSitz, type Zone } from '@/lib/einzugszonen';
import { HALB, LAGE, RINGE_KM, fugenraster, kartenorte, prozent, radius, type Lage } from './geometrie';

const ORTE = mitEntfernungAbSitz(CITIES, CITY_HUB_DATA);
const PUNKTE = kartenorte(ORTE, CITY_COORDINATES, TEZGEL_HQ_COORDS);
const GRUPPEN = gruppiereNachZone(ORTE);
const RASTER = fugenraster();
const ACHSEN = `M${-HALB} 0H${HALB}M0 ${-HALB}V${HALB}`;
const ASSLAR = 'M-1.25 -7.5h2.5v6.25h6.25v2.5h-6.25v6.25h-2.5v-6.25h-6.25v-2.5h6.25z';
const ZONEN: readonly Zone['id'][] = ['nah', 'mittel', 'weit'];
const RING_ZONE: readonly Zone['id'][] = ['nah', 'mittel'];
const GRUPPE_NAME: Record<Zone['id'], string> = { nah: 'Bis 10 km ab Aßlar', mittel: 'Bis 25 km ab Aßlar', weit: 'Mehr als 25 km ab Aßlar' };
const STANDARD_BESCHRIFTET: readonly string[] = ['wetzlar', 'giessen', 'herborn'];
const LAGE_KLASSEN: Record<Lage, string> = {
  oben: '-translate-x-1/2 -translate-y-full pb-4 text-center',
  unten: '-translate-x-1/2 pt-4 text-center',
  links: '-translate-x-full -translate-y-1/2 pr-4 text-right',
  rechts: '-translate-y-1/2 pl-4 text-left',
};
const BILDNAME = 'Gezeichnete Karte des Einsatzgebiets. Aßlar liegt in der Mitte. Zwei Ringe zeigen 10 und 25 Kilometer Entfernung.';

const entfernung = (km: number) => (km === 0 ? 'Firmensitz' : `ca. ${km} km`);
const lage = (x: number, y: number) => ({ '--x': prozent(x), '--y': prozent(y) }) as CSSProperties;

export interface EinsatzkarteProps {
  /** Satz zur Karte, wörtlich aus dem Seitentext (figcaption) */
  unterschrift?: string;
  /** Orte mit Namen in der Zeichnung (Slugs aus CITIES); Standard: Wetzlar, Gießen, Herborn (ohne `aktuell`) */
  beschriftet?: readonly string[];
  /** Ort der aktuellen Stadtseite: Punkt gefüllt und beschriftet, in der Liste mit Fugenkreuz und aria-current */
  aktuell?: string;
  /** Liste der Orte neben der Zeichnung (Standard: an) */
  liste?: boolean;
  /** Weg unter der Liste, z. B. „Alle Orte ansehen“ nach /standorte */
  verweis?: { name: string; href: string };
  className?: string;
}

export default function Einsatzkarte({ unterschrift, beschriftet, aktuell, liste = true, verweis, className }: EinsatzkarteProps) {
  const namen = new Set<string>([...(beschriftet ?? (aktuell ? [] : STANDARD_BESCHRIFTET)), ...(aktuell ? [aktuell] : [])]);
  const zeichnung = (
    <div role="img" aria-label={BILDNAME} data-motion="karte" className="@container relative aspect-square w-full overflow-hidden max-md:max-w-md">
      <Planrahmen viewBox={`${-HALB} ${-HALB} ${2 * HALB} ${2 * HALB}`} fuellen className="absolute inset-0">
        <g className="text-fuge">
          <Linie d={RASTER} />
        </g>
        <g className="text-strich">
          <Linie d={ACHSEN} />
        </g>
        <g className="text-tinte-2">
          {RINGE_KM.map((km, i) => (
            <Punkt key={km} className="karte-ring" data-zone={RING_ZONE[i]} cx={0} cy={0} r={radius(km)} />
          ))}
        </g>
        <g className="text-tinte">
          {ZONEN.map((zone) => (
            <g key={zone} className="karte-orte" data-zone={zone}>
              {PUNKTE.filter((p) => p.zone === zone && p.km > 0).map((p) => (
                <Punkt key={p.slug} cx={p.x} cy={p.y} r={namen.has(p.slug) ? 5 : 3.5} className={namen.has(p.slug) ? 'fill-current' : 'fill-fliese'} />
              ))}
            </g>
          ))}
        </g>
        {/* Firmensitz: Fugenkreuz im Kreuzpunkt der Achsen, das einzige Rot der Zeichnung */}
        <path d={ASSLAR} stroke="none" className="fill-current text-laser" />
      </Planrahmen>
      <span aria-hidden="true" className="karte-marke -translate-x-1/2 -translate-y-full pb-4 text-center lg:pb-6" style={lage(0, 0)}>
        <span className="block bg-fliese px-1 font-text text-fs-2 font-semibold whitespace-nowrap text-tinte">Aßlar</span>
      </span>
      {RINGE_KM.map((km) => (
        <span key={km} aria-hidden="true" className="karte-marke -translate-1/2" style={lage(0, radius(km))}>
          <span className="block bg-fliese px-1 font-mono text-fs-1 whitespace-nowrap text-tinte-2">{`${km} km`}</span>
        </span>
      ))}
      {PUNKTE.filter((p) => p.km > 0 && namen.has(p.slug)).map((p) => (
        <span key={p.slug} aria-hidden="true" className={clsx('karte-marke @max-3xs:hidden', LAGE_KLASSEN[LAGE[p.slug] ?? 'oben'])} style={lage(p.x, p.y)}>
          <span className="block bg-fliese px-1 whitespace-nowrap">
            <span className="block font-text text-fs-2 font-semibold text-tinte">{p.name}</span>
            <span className="block font-mono text-fs-1 text-tinte-2">{entfernung(p.km)}</span>
          </span>
        </span>
      ))}
    </div>
  );
  return (
    <figure className={clsx('border border-fuge bg-fliese', className)}>
      {unterschrift && <figcaption className="border-b border-fuge p-4 font-text text-fs-4 text-pretty text-tinte lg:px-8 lg:py-6">{unterschrift}</figcaption>}
      {liste ? (
        <div className="grid md:grid-cols-8 lg:grid-cols-12">
          <div className="border-b border-fuge md:col-span-5 md:border-r md:border-b-0 lg:col-span-7">{zeichnung}</div>
          <div className="flex flex-col gap-6 p-4 md:col-span-3 lg:col-span-5 lg:p-8">
            <ul className="flex flex-col gap-2 font-text text-fs-2 text-tinte">
              <li className="flex items-center gap-2">
                <Fugenkreuz className="size-3 text-laser" />
                <span>Firmensitz Aßlar</span>
              </li>
              <li className="flex items-center gap-2">
                <svg viewBox="0 0 12 12" aria-hidden="true" focusable="false" className="size-3 shrink-0 text-tinte-2" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="6" cy="6" r="5" vectorEffect="non-scaling-stroke" />
                </svg>
                <span>Die Ringe zeigen 10 und 25 km ab Aßlar.</span>
              </li>
            </ul>
            {GRUPPEN.filter((g) => g.orte.length > 0).map(({ zone, orte }) => (
              <div key={zone.id}>
                <h3 className="font-text text-fs-2 font-semibold text-tinte-2">{zusammen(GRUPPE_NAME[zone.id])}</h3>
                <ul className="mt-2 flex flex-col border-t border-fuge">
                  {orte.map((o) => {
                    const ist = o.slug === aktuell;
                    return (
                      <li key={o.slug} className="flex flex-wrap items-center justify-between gap-x-3 border-b border-fuge">
                        <Link
                          href={`/standorte/${o.slug}`}
                          aria-current={ist ? 'page' : undefined}
                          data-motion="zustand"
                          className={clsx(linkKlassen, 'flex min-h-11 flex-1 items-center gap-2 font-text text-fs-3 hyphens-none', ist && 'font-semibold')}
                        >
                          {ist && <Fugenkreuz className="size-3 text-tinte" />}
                          <span>{o.name}</span>
                        </Link>
                        <span className="shrink-0 font-mono text-fs-1 text-tinte-2">{zusammen(entfernung(o.distanceKm))}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
            <p className="font-text text-fs-2 text-tinte-2">Entfernungen sind ungefähre Angaben ab Aßlar.</p>
            {verweis && (
              <p>
                <WeiterLink href={verweis.href}>{verweis.name}</WeiterLink>
              </p>
            )}
          </div>
        </div>
      ) : (
        zeichnung
      )}
    </figure>
  );
}

## texte

[
 "WÖRTLICH aus _werkstatt/texte/ueber-uns.md, Abschnitt 5 (die Seite reicht ihn als Prop `unterschrift` weiter): „Von Aßlar aus arbeiten wir in Wetzlar, Gießen und Herborn.“",
 "WÖRTLICH aus ueber-uns.md, Abschnitt 5 (Prop `verweis`, Ziel /standorte): „Alle Orte ansehen“",
 "BESTAND (Einzugsband.tsx), Legende mit rotem Fugenkreuz: „Firmensitz Aßlar“",
 "BESTAND (Einsatzorte.tsx GRUPPE_NAME), Überschriften der Liste: „Bis 10 km ab Aßlar“ · „Bis 25 km ab Aßlar“ · „Mehr als 25 km ab Aßlar“",
 "BESTAND (Einzugsband und Einsatzorte), Entfernung je Ort: „Firmensitz“ (Aßlar) und „ca. N km“ aus CITY_HUB_DATA (Wetzlar 5, Solms 8, Braunfels 10, Herborn 20, Gießen 25, Dillenburg 25, Haiger 30, Limburg 35, Butzbach 35, Marburg 40, Bad Nauheim 40, Friedberg 45)",
 "BESTAND (Einsatzorte-Kette), Ringmarken in der Zeichnung: „10 km“ · „25 km“; Ortsmarken: „Aßlar“ und Name plus Entfernung für Wetzlar, Gießen und Herborn",
 "NEU (Bildname, aria-label der Zeichnung): „Gezeichnete Karte des Einsatzgebiets. Aßlar liegt in der Mitte. Zwei Ringe zeigen 10 und 25 Kilometer Entfernung.“",
 "NEU (Legende): „Die Ringe zeigen 10 und 25 km ab Aßlar.“",
 "NEU (angelehnt an den Bestand von /standorte „Entfernungen sind ungefähre Angaben ab Wetzlar.“): „Entfernungen sind ungefähre Angaben ab Aßlar.“",
 "Prüfstand der neuen Texte: textpruefung.mjs GRÜN (Flesch 72,5; Satzlänge im Mittel 6; keine Gedankenstriche, keine Bindestrichwörter, keine Floskeln; Zahlen 10 und 25 wie in einzugszonen.ts). Kein Glossarwort nötig."
]

## bewegung

AUSLÖSER: Sichtbarkeit. Der IntersectionObserver aus src/lib/motion/bewegung.ts greift bei 40 % am Element `div[role=img][data-motion="karte"]` (Registereintrag `karte: { ausloeser: 'sicht', schwelle: 0.4 }`). Es setzt `data-motion-stand="an"`. Bewusst hängt das an der quadratischen Zeichnung und nicht an der ganzen figure: Die Zeichnung ist nie höher als breit, 40 % werden also auch bei großer Schrift und quer gehaltenem Handy erreicht. CSS-Übergänge statt Keyframes, wie bei `auftritt`, es gibt keine neuen @keyframes. Bewegt werden nur scale und opacity. ABLAUF: (1) `.karte-ring[data-zone="nah"]` (10 km) mit scale 0.6 → 1 und opacity 0 → 1, `--dauer-3` (600 ms), `--ease-setzen`, Verzögerung 0. (2) `.karte-orte[data-zone="nah"]` (Wetzlar, Solms, Braunfels) mit opacity 0 → 1, `--dauer-2`, ease-setzen, Verzögerung `--staffel`×4 (240 ms). (3) `.karte-ring[data-zone="mittel"]` (25 km) wie (1) mit Verzögerung `--staffel`×5 (300 ms). (4) `.karte-orte[data-zone="mittel"]` mit Verzögerung `--staffel`×9 (540 ms). (5) `.karte-orte[data-zone="weit"]` mit Verzögerung `--staffel`×13 (780 ms). Alles fertig nach 1100 ms, große Momente dürfen höchstens 1,6 s dauern. Der Ring wächst aus Aßlar heraus und kommt mit ease-setzen ohne Überschwingen an. Das ist „legen, nie federn“. `transform-box: fill-box; transform-origin: center` an `.karte-ring`. Wegen non-scaling-stroke bleibt der Strich 1,5 px. RUHIG BLEIBEN: Aßlar-Kreuz, Achsen, Fugenraster, alle HTML-Beschriftungen und die Liste stehen ab dem ersten Bild. Text wird nie verdeckt, denn beim Einzugsband war das ein Befund. STARTZUSTAND: nur `html.k-bewegung:not(.k-notaus) [data-motion="karte"]:not([data-motion-stand="an"])`. ERSATZPFAD = Endzustand: ohne JavaScript, bei reduzierter Bewegung, nach dem Notaus nach 2 s, im Druck und in erzwungenen Farben (eigene !important-Regel für die Kinder). Den Wortlaut des CSS-Blocks führt die Liste „gemeinsam“. Er liegt auch unter …/scratchpad/karte/final/gemeinsam-bewegung.css.

## reduziert

Endzustand sofort. Bei prefers-reduced-motion: reduce setzt das Kopfskript kein `html.k-bewegung`. Damit gilt kein Startzustand: Ringe, Punkte und Beschriftungen stehen ab dem ersten Bild fertig, und keine Übergangsregel greift, weil alle unter html.k-bewegung hängen. Das Bewegungsmodul setzt `data-motion-stand="an"` dann sofort (Zweig `!aktiv()` in beobachte()). Ohne JavaScript und nach dem Notaus (html.k-notaus) gilt dasselbe. Im Druck und bei forced-colors setzt eine eigene Regel `opacity: 1; scale: none; transition: none` mit !important an `.karte-ring` und `.karte-orte`. Keine Überblendung nötig, K-007 erlaubt den Sofortzustand.

## zugang

ROLLE UND NAME: Die Zeichnung ist `div role="img"` mit aria-label „Gezeichnete Karte des Einsatzgebiets. Aßlar liegt in der Mitte. Zwei Ringe zeigen 10 und 25 Kilometer Entfernung.“ Das SVG ist über Planrahmen `aria-hidden` und `focusable=false`. Die HTML-Beschriftungen tragen `aria-hidden`. In der Zeichnung gibt es nichts Fokussierbares und keine IDs, also auch keine doppelten Kennungen. `figure` mit `figcaption` (Satz der Seite). Der Inhalt der Zeichnung steht vollständig als Text in der Liste: h3 je Entfernungsbereich (Hierarchie unter der H2 des Beleg-Abschnitts), ul mit 13 Links /standorte/<slug> und der Entfernung. TASTATUR: Tab läuft durch die Ortslinks und den WeiterLink in Lesereihenfolge. Fokus sichtbar über die globale Fokusregel. Trefffläche min-h-11 (44 px). `aria-current="page"` beim Ort aus `aktuell`. SCREENREADER: Abbildung, Satz, Bildname, Legende, drei Listen mit Ortsname und „ca. N km“. Die Wortgruppen „25 km“ hält `zusammen` per nowrap zusammen, der Wortlaut bleibt unverändert. NIE NUR FARBE: Aßlar erkennt man an der Kreuzform und der Beschriftung. Benannte Orte sind gefüllt, größer und beschriftet, die anderen hohl. Die Ringe tragen Textmarken. FORCED-COLORS: Alle Linien und das Kreuz nutzen currentColor (Töne über `color` an Gruppen, wie bei den Vignetten). Sie werden zu CanvasText. Hohle Punkte bleiben durch ihre Kontur sichtbar. Die Beschriftungskästen bekommen Canvas. Die Bewegung steht auf Endzustand. KONTRAST: Ringe tinte-2, Achsen strich (≥ 3:1), Raster fuge (nur Deko), Text tinte und tinte-2 auf Fliese (9:1 und mehr). Rot nur am Firmensitz-Kreuz und in der Legende. GROSSE SCHRIFT: siehe Aufbau. Ortsnamen in der Zeichnung blenden sich unter 16rem Flächenbreite aus, die Liste bleibt.

## budget

Client-Komponente: nein. Serverkomponente ohne Zustand und ohne Ereignisse. Die Bewegung macht das vorhandene Modul (IntersectionObserver) mit reinem CSS, also 0 KB zusätzliches JavaScript (`next/link` ist schon im Bündel). HTML des Moments etwa 9 KB roh und etwa 2,5 KB gzip. Davon ist das SVG etwa 3 KB roh (Fugenraster-Pfad 673 Zeichen, 2 Ringe, 12 Punkte, Achsen, Kreuz), deutlich unter 2 KB gzip. Grenze für eine Zeichnung: 40 KB gzip. CSS: Block in bewegung.css 1977 Byte roh und 803 Byte gzip, dazu 0,3 KB in globals.css. Keine Bilder, keine Schriften, keine Anfragen an fremde Server (keine Kartenkacheln, kein iframe). Die Geometrie wird einmal je Modul beim Rendern auf dem Server gerechnet. Kein Layoutsprung: aspect-square reserviert die Fläche, Beschriftungen liegen absolut.

## dateien

[
 "src/components/momente/karte/geometrie.ts",
 "src/components/momente/karte/Einsatzkarte.tsx",
 "_werkstatt/register/karte.json",
 "test/karte.test.mjs"
]

## gemeinsam

[
 "src/app/bewegung.css: direkt nach dem einzugsband-Block (nach `@media print { .einzugsband .einzugsband-kante { animation: none !important; } }`, vor `/* sig-kreuzlinie …`) diesen Block einfügen (Datei: /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/karte/final/gemeinsam-bewegung.css, werte.mjs 0 Befunde): /* karte (K-007, /ueber-uns und /standorte; E3-GRAF-09) – Einsatzkarte: beim Eintritt (Sicht 0,4) legen sich die Ringe von innen nach außen an ihren Platz (scale 0,6 → 1 mit Deckkraft, dauer-3 · setzen; 25 km fünf Staffelstufen nach 10 km); die Punkte jeder Zone erscheinen mit ihrem Ring (Deckkraft dauer-2), die Orte über 25 km zuletzt; gesamt 1,1 s. Aßlar, Achsen, Raster und Beschriftungen stehen ab dem ersten Bild; reduziert, ohne JS, nach dem Notaus, im Druck und in erzwungenen Farben fertig. Nur scale und opacity. */ .karte-ring { transform-box: fill-box; transform-origin: center; } html.k-bewegung [data-motion=\"karte\"] .karte-ring { transition: scale var(--dauer-3) var(--ease-setzen), opacity var(--dauer-3) var(--ease-setzen); } html.k-bewegung [data-motion=\"karte\"] .karte-orte { transition: opacity var(--dauer-2) var(--ease-setzen); } html.k-bewegung [data-motion=\"karte\"] .karte-orte[data-zone=\"nah\"] { transition-delay: calc(var(--staffel) * 4); } html.k-bewegung [data-motion=\"karte\"] .karte-ring[data-zone=\"mittel\"] { transition-delay: calc(var(--staffel) * 5); } html.k-bewegung [data-motion=\"karte\"] .karte-orte[data-zone=\"mittel\"] { transition-delay: calc(var(--staffel) * 9); } html.k-bewegung [data-motion=\"karte\"] .karte-orte[data-zone=\"weit\"] { transition-delay: calc(var(--staffel) * 13); } html.k-bewegung:not(.k-notaus) [data-motion=\"karte\"]:not([data-motion-stand=\"an\"]) .karte-ring { opacity: 0; scale: 0.6; } html.k-bewegung:not(.k-notaus) [data-motion=\"karte\"]:not([data-motion-stand=\"an\"]) .karte-orte { opacity: 0; } @media print, (forced-colors: active) { [data-motion=\"karte\"] .karte-ring, [data-motion=\"karte\"] .karte-orte { opacity: 1 !important; scale: none !important; transition: none !important; } }",
 "src/app/globals.css: in `@layer utilities` direkt nach `.zeitband-stueck { flex: var(--jahre, 1) 1 0%; }` einfügen (Datei …/scratchpad/karte/final/gemeinsam-globals.css): /* Einsatzkarte (großer Moment karte, E3-GRAF-09): Beschriftung an einem Punkt der Zeichnung; Lage in Prozent der quadratischen Zeichenfläche (--x, --y am Element, aus src/components/momente/karte/geometrie.ts) */ .karte-marke { position: absolute; left: var(--x); top: var(--y); }",
 "src/lib/motion/register.ts: in REGISTER nach `fugenband: { ausloeser: 'scroll' },` einfügen: `// große Momente (E3-ORCH-02a): Einsatzkarte ab Aßlar, Ringe legen sich beim Eintritt (Sicht 0,4; E3-GRAF-09)` und `karte: { ausloeser: 'sicht', schwelle: 0.4 },`",
 "WICHTIG: Die drei Einträge oben (bewegung.css, globals.css, register.ts) gehören in denselben Commit. Ohne Registereintrag setzt niemand `data-motion-stand`, und Ringe und Punkte blieben unsichtbar. Ohne `.karte-marke` lägen alle Beschriftungen oben links.",
 "test/bewegung.test.mjs: nach `const V2_SVG_E037 = […];` die Zeile `const GROSSE_MOMENTE = ['karte'];` einfügen. In Test 1 `[...KERN_V3, ...V2_SVG_E037, ...GROSSE_MOMENTE, ...ENTFALLEN_E009]` vergleichen und GROSSE_MOMENTE in die for-Schleife über die Systemeinträge aufnehmen. Neuer Test: `test('Bewegung 6: karte legt sich beim Eintritt (Sicht 0,4) auf allen Zeigegeräten, kein Ladeeintrag (E3-GRAF-09)', () => { assert.equal(schwelleFuer('karte'), 0.4); assert.ok(beobachteteKennungen(true).includes('karte') && beobachteteKennungen(false).includes('karte')); assert.ok(!ladeKennungen().includes('karte')); });`",
 "_werkstatt/register.json: \"karte\" an die Arrays \"kennungen\" und \"v3\" anhängen. Im \"hinweis\" `karte` als übertragen vermerken (E3-ORCH-02a).",
 "package.json, Skript \"test\": ` test/karte.test.mjs` ans Ende der Dateiliste anhängen.",
 "_werkstatt/werkzeuge/bewegung.mjs, Objekt AUSLOESER: `karte: 'scroll',` ergänzen (Sicht 0,4 wie startbild, beim Durchscrollen auslösen; ohne Eintrag gilt ohnehin scroll).",
 "Schaufenster für die Bildprüfung vor dem Seitenumbau: neue Datei `src/app/(bestand)/werkstatt-schaufenster/karte/page.dev.tsx`, Wortlaut in …/scratchpad/karte/final/gemeinsam-schaufenster-page.dev.tsx. Inhalt: Leitachse, ein Abschnitt Vorlauf mit min-h-dvh, Abschnitt id=\"unsere-arbeiten\" formel=\"beleg\" leitachse mit `<Einsatzkarte unterschrift=\"Von Aßlar aus arbeiten wir in Wetzlar, Gießen und Herborn.\" verweis={{ name: 'Alle Orte ansehen', href: '/standorte' }} />`, darunter `<Einsatzkarte aktuell=\"limburg\" liste={false} />` in einem div max-w-md.",
 "Vorlagen-Schlitz, keine Änderung an der Vorlage. E3-BAU-08 setzt in src/app/(bestand)/ueber-uns/page.jsx: `import Einsatzkarte from '@/components/momente/karte/Einsatzkarte';` und `<ErzaehlSeite inhalt={UEBER_UNS} momente={{ beleg: <Einsatzkarte unterschrift=\"Von Aßlar aus arbeiten wir in Wetzlar, Gießen und Herborn.\" verweis={{ name: 'Alle Orte ansehen', href: '/standorte' }} /> }} />`. Dazu in src/inhalte/ueber-uns.ts `beleg.verweis = { name: 'Alle Arbeiten ansehen', href: '/referenzen' }`, denn Beleg.tsx setzt diesen Verweis nach dem Moment. Den Abschnitt `beleg.orte` (Einsatzorte) auf /ueber-uns nicht zusätzlich setzen, sonst stehen die Orte doppelt.",
 "KERN.md K-007, Zeile `karte` (wahlweise genauer): Spalte Dauer und Kurve = „Ringe `dauer-3` · `ease-setzen` von innen nach außen (25 km fünf Staffeln später), Punkte `dauer-2` mit ihrem Ring, über 25 km zuletzt; gesamt 1,1 s“."
]

## bildbedarf

[]

## pruefung

A · DAS PAKET PRÜFT SELBST (ohne Server):
1) `npx tsc --noEmit -p .`: keine Fehler in src/components/momente/karte/*.
2) `npx eslint src/components/momente/karte test/karte.test.mjs`: 0 Fehler.
3) `node --experimental-strip-types --loader ./test/resolver.mjs --test test/karte.test.mjs` aus /home/user/tezgel: 7 von 7 grün.
4) `node _werkstatt/werkzeuge/werte.mjs --dateien src/components/momente/karte/Einsatzkarte.tsx,src/components/momente/karte/geometrie.ts --ziel $SCRATCH/E3-GRAF-09/werte`: 0 Befunde.
5) `git -C /home/user/tezgel status --porcelain`: neu sind nur die vier Paketdateien. Kein Commit.

WORTLAUT test/karte.test.mjs (auch unter …/scratchpad/karte/final/karte.test.mjs):
import test from 'node:test';
import assert from 'node:assert/strict';
import { HALB, R_AUSSEN, RINGE_KM, LAGE, radius, richtung, punkt, prozent, fugenraster, kartenorte } from '../src/components/momente/karte/geometrie.ts';
import { CITIES } from '../src/config/cities.ts';
import { CITY_COORDINATES, CITY_HUB_DATA, TEZGEL_HQ_COORDS } from '../src/lib/maps/getMapEmbedUrl.ts';
import { mitEntfernungAbSitz } from '../src/lib/einzugszonen.ts';

// Großer Moment `karte` (E3-GRAF-09): Geometrie der Einsatzkarte, Aßlar in der Mitte, Wurzelmaßstab bis 45 km.
const ORTE = kartenorte(mitEntfernungAbSitz(CITIES, CITY_HUB_DATA), CITY_COORDINATES, TEZGEL_HQ_COORDS);
const ort = (slug) => ORTE.find((o) => o.slug === slug);

test('Karte 1: Radius im Wurzelmaßstab, gekappt bei 45 km', () => {
  assert.equal(radius(0), 0);
  assert.equal(radius(10), 84.9);
  assert.equal(radius(25), 134.2);
  assert.equal(radius(45), R_AUSSEN);
  assert.equal(radius(60), R_AUSSEN);
  assert.equal(radius(-5), 0);
  assert.deepEqual([...RINGE_KM], [10, 25]);
});

test('Karte 2: Norden oben, Osten rechts, ohne -0', () => {
  assert.deepEqual(punkt(25, 0), { x: 134.2, y: 0 });
  assert.deepEqual(punkt(10, Math.PI / 2), { x: 0, y: -84.9 });
  assert.ok(Math.abs(richtung(TEZGEL_HQ_COORDS, CITY_COORDINATES.giessen)) < 0.05, 'Gießen liegt östlich');
  const w = richtung(TEZGEL_HQ_COORDS, CITY_COORDINATES.herborn);
  assert.ok(w > Math.PI / 2 && w < Math.PI, 'Herborn liegt nordwestlich');
});

test('Karte 3: Prozent der Zeichenfläche', () => {
  assert.equal(prozent(0), '50%');
  assert.equal(prozent(-HALB), '0%');
  assert.equal(prozent(HALB), '100%');
  assert.equal(prozent(100), '75%');
});

test('Karte 4: jeder Ort aus CITIES steht genau einmal in der Zeichnung, in seiner Zone und im Bild', () => {
  assert.equal(ORTE.length, CITIES.length);
  assert.equal(new Set(ORTE.map((o) => o.slug)).size, CITIES.length);
  assert.deepEqual({ x: ort('asslar').x, y: ort('asslar').y, km: ort('asslar').km }, { x: 0, y: 0, km: 0 });
  assert.deepEqual(ort('wetzlar'), { slug: 'wetzlar', name: 'Wetzlar', km: 5, zone: 'nah', x: 41.7, y: 43.1 });
  assert.deepEqual(ort('giessen'), { slug: 'giessen', name: 'Gießen', km: 25, zone: 'mittel', x: 134.2, y: 2.6 });
  assert.deepEqual(ort('herborn'), { slug: 'herborn', name: 'Herborn', km: 20, zone: 'mittel', x: -88.4, y: -81.2 });
  assert.equal(ort('friedberg').zone, 'weit');
  for (const o of ORTE) {
    assert.ok(Math.abs(o.x) <= R_AUSSEN && Math.abs(o.y) <= R_AUSSEN, `${o.slug} liegt in der Fläche`);
    assert.ok(Math.abs(Math.hypot(o.x, o.y) - radius(o.km)) <= 0.2, `${o.slug}: Abstand passt zur Entfernung`);
  }
});

test('Karte 5: Orte ohne Koordinaten fallen aus der Zeichnung', () => {
  assert.deepEqual(kartenorte([{ slug: 'x', name: 'X', distanceKm: 12 }], {}, TEZGEL_HQ_COORDS), []);
});

test('Karte 6: jede Beschriftung hat eine Lage', () => {
  for (const c of CITIES) assert.ok(['oben', 'unten', 'links', 'rechts'].includes(LAGE[c.slug]), `Lage fehlt: ${c.slug}`);
});

test('Karte 7: Fugenraster im Drittelverband (9 Lagerfugen, 46 Stoßfugen)', () => {
  const d = fugenraster();
  assert.equal((d.match(/H200/g) ?? []).length, 9);
  assert.equal((d.match(/v40/g) ?? []).length, 46);
  assert.ok(!d.includes('NaN'));
});

B · NACH DEM EINBAU (Orchestrator oder Prüfer; Server nur nutzen, nie starten; Schaufenster /werkstatt-schaufenster/karte auf dem Entwicklungsserver, BASE aus lib.mjs):
6) Bild mobil und Desktop, Endzustand: `node _werkstatt/werkzeuge/einzelbild.mjs --seite /werkstatt-schaufenster/karte --geraete m360,m390,t768,d1440 --scroll '#unsere-arbeiten' --bewegung reduce`. Sichtprüfung: Aßlar-Kreuz genau im Kreuzpunkt. Zwei Ringe, Gießen auf dem 25-km-Ring, Braunfels auf dem 10-km-Ring. 12 Punkte. Beschriftungen Aßlar, Wetzlar, Gießen, Herborn und „10 km“, „25 km“ ohne Überlappung und ohne Überlauf. Liste daneben ab md, darunter mobil. Konsole 0, Überlauf 0.
7) Große Schrift: dasselbe mit `--schrift 200` bei m390 und d1440. Ortsnamen in der Zeichnung mobil ausgeblendet, Aßlar und Ringmarken lesbar, Liste vollständig, kein seitliches Scrollen. Danach `ueberlappung.mjs` für die Seite.
8) Bewegung: `node _werkstatt/werkzeuge/bewegung.mjs --modus einzelbilder --seite /werkstatt-schaufenster/karte --kennung karte --ansicht m390`. In 5 Bildern wächst erst der innere Ring, dann der äußere, dann erscheinen die Punkte. Fertig nach etwa 1,1 s. Kein Überschwingen.
9) `--modus reduziert`: keine Animation, alles sichtbar. `--modus register`: `karte` registriert, keine Animation ohne data-motion.
10) `node _werkstatt/werkzeuge/svg.mjs --seiten /werkstatt-schaufenster/karte`: keine doppelten IDs, Inline-SVG zugänglich. `axe.mjs` für die Seite ohne Befund.
11) Tastatur: Tab durch alle 13 Ortslinks und „Alle Orte ansehen“, Fokus jeweils sichtbar. In der Zeichnung gibt es keinen Tabstopp.
12) Wahlweise forced-colors per Playwright (`forcedColors: 'active'`): Linien, Kreuz und Punktkonturen sichtbar, Endzustand.
13) Nach E3-BAU-08 dieselben Schritte 6 bis 9 auf /ueber-uns mit `--scroll '#unsere-arbeiten'` und `lesbarkeit.mjs` GRÜN.

## risiken

[
 "Reihenfolge beim Einbau: Kommt der CSS-Block aus bewegung.css ohne den Eintrag `karte` in register.ts, setzt niemand `data-motion-stand`. Ringe und Punkte blieben dann bei erlaubter Bewegung dauerhaft unsichtbar. Darum bewegung.css, globals.css (.karte-marke) und register.ts in einem Commit, mit test/bewegung.test.mjs.",
 "Ohne `.karte-marke` in globals.css liegen alle HTML-Beschriftungen oben links in der Zeichnung. Das Paket allein (ohne gemeinsame Dateien) zeigt also eine fertige Zeichnung mit falsch sitzenden Beschriftungen. Die Bildprüfung erst nach dem Einbau.",
 "Maßstab: Die Entfernungen aus CITY_HUB_DATA sind gerundete Angaben, die Annahme M-04 und M-17 zu Bezugspunkt und Radius ist offen. Der Wurzelmaßstab ist schematisch. Die Karte darf nicht als maßstäbliche Landkarte gelten. Der sichtbare Hinweis „Entfernungen sind ungefähre Angaben ab Aßlar.“ und das Wort „ca.“ tragen das. Ändert der Auftraggeber Entfernungen oder Koordinaten, wandern die Punkte von selbst. Die Testwerte in Karte 4 müssen dann neu gerechnet werden.",
 "Solms (8 km) und Braunfels (10 km) liegen fast in derselben Richtung: Ihre Punkte stehen nur etwa 2 Zeichnungseinheiten auseinander. Bei 360 px sind das rund 2 px. Beide sind unbeschriftet und in der Liste eindeutig.",
 "Fassung für Stadtseiten (`aktuell=\"limburg\"`): Die Beschriftung „Limburg an der Lahn“ rechts vom Punkt deckt bei 360 px den unteren Rand des Braunfels-Punkts um etwa 2 px ab. Bei anderen Orten berührt sich nichts (Lagen in LAGE für 360 px durchgerechnet). Beschriftet man mehrere ferne Orte gleichzeitig (etwa Butzbach, Bad Nauheim, Friedberg), überlappen ihre Namen. Darum standardmäßig nur Wetzlar, Gießen und Herborn.",
 "Rot: Das Firmensitz-Kreuz in der Zeichnung und das Kreuz der Legende sind beide laser, dazu kommt die Spitze der Leitachse. Das ist gewollt als Paar aus Zeichen und Erklärung, wie beim Einzugsband. Fällt die Sichtabnahme anders aus, wird das Legendenkreuz `text-tinte`.",
 "Hydrierung: `data-motion-stand` setzt das Modul außerhalb von React, an einem Element hinter der Suspense-Grenze der Vorlage. Das ist dasselbe Muster wie bei auftritt und startbild. Im Entwicklungsmodus ist eine Hydrierungswarnung möglich, wenn der Beobachter vor der Hydrierung des Abschnitts auslöst (bekannt aus E4-N2-01).",
 "content-visibility (Abschnitt `spaet`): Der Beobachter greift wie bei `auftritt` erst, wenn der Abschnitt in Sichtnähe gezeichnet ist. Das ist geprüft am Muster, nicht an dieser Karte; Schritt 8 bestätigt es.",
 "Handy quer (q844): Die Zeichnung (5 von 8 Spalten, etwa 500 px) ist höher als der Bildschirm (390 px). Der Moment löst trotzdem aus (40 % von 500 px liegen im Bild), man scrollt aber durch die Zeichnung.",
 "Die Seite /ueber-uns steht erst mit E3-BAU-08 (Welle E3-W3) auf der Vorlage. Bis dahin ist der Moment nur im Schaufenster sichtbar. Das Paket kann ohne den Orchestrator kein eigenes Bild machen."
]

