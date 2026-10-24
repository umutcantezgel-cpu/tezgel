# formatregler

## kennung

formatregler

## seite

/leistungen (Erzählseite, Abschnitt 3 „Was wir tun“, nach den vier Bereichen; Seitentext _werkstatt/texte/leistungen.md Zeile 38)

## schlitz

momente.tun

## wiederverwendung

Bestandsprüfung: Ich habe in src/ und _werkstatt/archiv/ nach formatregler, Formatvergleich, Fugenmeter, Regler, type="range" und role="slider" gesucht. Im Code gibt es noch nichts dazu, auch kein src/components/momente/ und kein _werkstatt/register/. Die Kennung steht bisher nur in PLAN, KERN K-007, LAGEBILD, bildplaetze.md („Zeichnung“) und im Seitentext. Genutzt wird:
1. Die Geometrie des alten Formatvergleichs aus v2 (git 27639b6^:src/components/start/Grossformat.tsx, E3-NACH-01): dieselbe Wand 24 × 26 Rastereinheiten, hier 240 × 260 cm mit 1 Einheit = 1 cm. Die kleine Fliese misst 60 × 60 im Kreuzverband, die große 120 × 260, also „eine einzige Fuge“. Verlegeplan.tsx selbst wird NICHT genutzt (Striche 1 px und 2 px, Draufsicht, Bemaßung). Verlangt ist der Strich der Vignetten.
2. Die Zeichenmittel aus src/components/kern/vignetten/zeichnen.tsx: Planrahmen (SVG mit currentColor, 1,5 px, Enden square, Ecken miter, aria-hidden, block h-auto w-full), Linie (non-scaling-stroke) und schraffur(x, y, b, h, 6) für den zugeschnittenen Randstreifen. Fugen und Schraffur liegen in einer Gruppe mit class text-strich. Die Wandkante ist currentColor, also Tinte von der figure.
3. Icon aus src/components/icons/Icon.tsx mit pfeil-links und pfeil-rechts, groesse 4. Beide sind schon im Sprite.
4. Das Muster des nativen Reglers aus src/components/funnels/BadProjektCheck/Schritt1.jsx: input type=range mit „block h-11 w-full cursor-pointer accent-tinte“ und aria-valuetext in Worten.
5. Den Hydrierungsmerker ohne setState im Effekt aus src/components/common/FussGruppe.tsx: useSyncExternalStore(ohneAbo, () => true, () => false).
6. Das Vorbild VerbandUmschalter.tsx mit seinem bewegung.css-Block „verband“: data-motion nur an der Wurzel, CSS im Register-CSS, eigene Regel für forced-colors. Der Registereintrag folgt dem Muster verband: { ausloeser: 'interaktion' }.
7. Den vorhandenen Schlitz: ErzaehlSeite.tsx übergibt momente.tun an teile/Tun.tsx, das es als letztes Kind mit „mt-16“ setzt. Die Vorlage bleibt unverändert.
Neu im Paket: drei kleine Dateien. Nichts aus kern/ wird kopiert oder geändert.

## aufbau

VORHER LESEN (AGENTS.md): node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md und node_modules/next/dist/docs/01-app/03-api-reference/01-directives/use-client.md.

IDEE: Vergleichsregler mit demselben Vertrag wie vorher-nachher (K-007: Regler, direkt, reduziert gleich). EINE Wand von 240 × 260 cm. Links von einer senkrechten Trennlinie liegt sie mit kleinen Fliesen (4 Spalten, 4 volle Reihen und unten ein schraffierter Passstreifen von 20 cm), rechts mit großen Fliesen (2 Fliesen, eine Fuge). Der Regler schiebt die Trennlinie von 0 % (ganze Wand groß) bis 100 % (ganze Wand klein). Startwert ist 50 %: Ohne JavaScript ist das ein fertiger Vergleich. Über der Wand stehen beide Fugenlängen fest, nicht live, weil K-003 hochzählende Zahlen verbietet.

DOM (Reihenfolge = Lesereihenfolge):
div.@container
  figure[data-motion=formatregler].formatregler (Grid; die figcaption ist letztes Kind)
    dl (2 Gruppen: dt Name mit Pfeil, dd Fugenlänge)
    div Bildblock
      div.formatregler-bild[role=img][aria-label] mit style --formatregler-teil (einziger Inline-Stil, CSS-Variable nach K-004), Zeiger-Handler
        Wand klein (SVG im Fluss, gibt die Höhe vor)
        div.formatregler-gross[aria-hidden] > div > Wand groß (deckungsgleiche zweite Ebene)
        div.formatregler-trenner[aria-hidden] > span.formatregler-griff (Quadrat size-11, Pfeile links und rechts)
      div.formatregler-regler (label und input range; unsichtbar, bis die Hydrierung fertig ist)
    figcaption

RASTER UND BREITEN:
- mobil (m390, Container 358 px): eine Spalte. dl ab @xs (20rem) zweispaltig, links „Kleine Fliese“, rechts bündig „Große Fliese …“. Darunter die Wand in voller Breite (358 × etwa 387 px), darunter der Regler (h-11), darunter die Unterschrift. figure „w-full max-w-md“, damit die Beschriftungen nicht über die Wand hinausstehen.
- ab Container @2xl (42rem: md und lg, Inhaltsspalte etwa 700 bis 740 px): zwei Spalten mit gap-x-12. Wand und Regler links über zwei Zeilen (je etwa 340 px breit, 370 px hoch). Rechts oben die dl (einspaltig, self-end), rechts darunter die Unterschrift (self-start). Die figure heißt dann @2xl:max-w-full.
- 200 % Systemschrift: @xs wird 640 px breit, also steht die dl einspaltig. Die Wand behält die Spaltenbreite. Griff und Regler werden mit der Schrift größer (size-11 = 2,75rem). Kein seitliches Scrollen, nichts wird abgeschnitten. Das Maß bricht dank geschützter Leerzeichen nie zwischen den Zahlen.
- Flächen: Die Wand ist weiß (formatregler-flaeche = fliese) auf dem Kalk des Abschnitts. Fugen und Schraffur in Strich 1,5 px, Wandkante Tinte 1,5 px, Trennlinie Tinte 2 px. Kein Laser: Das eine Rot je Bildschirm trägt die Leitachse des Abschnitts. Kein Schatten, kein Radius.

DATEI 1: src/components/momente/formatregler/geometrie.ts (rein, ohne Importe, damit der Test sie laden kann)
// Geometrie des Formatreglers (KERN v3.4 K-007 formatregler, K-008 Formatvergleich; E3-GRAF-05): dieselbe Wand mit kleinen
// Fliesen (Kreuzfuge) und mit großen Fliesen 120 × 260 cm (F-20). Zeichnungseinheit 1 cm. Das Maß der kleinen Fliese steht nie
// als Text auf der Seite (ENTSCHEIDUNGEN: „60 × 60 cm bleiben draußen“), es bestimmt nur Zeichnung und Fugenlänge.
export type Format = 'klein' | 'gross';
export const WAND = { b: 240, h: 260 } as const;
export const FORMATE: Record<Format, { b: number; h: number }> = { klein: { b: 60, h: 60 }, gross: { b: 120, h: 260 } };
/** Startwert und Stand ohne JavaScript: Trennlinie in der Mitte */
export const START = 50;
export interface Wandbild { senkrecht: number[]; waagrecht: number[]; passstuecke: Array<[number, number, number, number]>; meter: number }
export function wandbild(format: Format): Wandbild {
  const f = FORMATE[format];
  const senkrecht: number[] = [];
  for (let x = f.b; x < WAND.b; x += f.b) senkrecht.push(x);
  const waagrecht: number[] = [];
  for (let y = f.h; y < WAND.h; y += f.h) waagrecht.push(y);
  const passstuecke: Wandbild['passstuecke'] = [];
  const restB = WAND.b % f.b;
  const restH = WAND.h % f.h;
  if (restB > 0) passstuecke.push([WAND.b - restB, 0, restB, WAND.h]);
  if (restH > 0) passstuecke.push([0, WAND.h - restH, WAND.b, restH]);
  const meter = Math.round((senkrecht.length * WAND.h + waagrecht.length * WAND.b) / 10) / 10;
  return { senkrecht, waagrecht, passstuecke, meter };
}
const NBSP = String.fromCharCode(160);
/** „17,4 m“ mit geschütztem Leerzeichen; ohne toLocaleString, damit Server und Gerät dasselbe liefern */
export function meterText(meter: number): string { return meter.toFixed(1).replace('.', ',') + NBSP + 'm'; }
/** Anteil der Wand mit kleinen Fliesen (0 bis 100, ganzzahlig) aus der Zeigerlage; null ohne Breite */
export function wertAusZeiger(x: number, links: number, breite: number): number | null {
  if (!(breite > 0)) return null;
  return Math.min(100, Math.max(0, Math.round(((x - links) / breite) * 100)));
}
/** Ansage des Reglers (aria-valuetext) */
export function wertText(wert: number): string {
  if (wert <= 0) return 'Ganze Wand mit großen Fliesen';
  if (wert >= 100) return 'Ganze Wand mit kleinen Fliesen';
  return `Links ${wert} Prozent kleine Fliesen, rechts große Fliesen`;
}

DATEI 2: src/components/momente/formatregler/Wand.tsx (ohne 'use client'; wird von Formatregler importiert)
// Eine Wand des Formatreglers (K-008): Fliesenfläche, Fugen und Schraffur des Passstreifens in Strich, Wandkante in Tinte,
// Linien 1,5 px wie die Plan-Vignetten. Dekorativ (Planrahmen ist aria-hidden); den Namen trägt das Bildfeld des Reglers.
// Keine IDs, keine Muster: beide Ebenen dürfen mehrfach auf einer Seite stehen.
import { Linie, Planrahmen, schraffur } from '@/components/kern/vignetten/zeichnen';
import { WAND, wandbild, type Format } from './geometrie';
const VIEWBOX = `-2 -2 ${WAND.b + 4} ${WAND.h + 4}`; // 2 Einheiten Rand: die Kante wird nicht angeschnitten
export default function Wand({ format }: { format: Format }) {
  const bild = wandbild(format);
  const fugen = [...bild.senkrecht.map((x) => `M${x} 0V${WAND.h}`), ...bild.waagrecht.map((y) => `M0 ${y}H${WAND.b}`)].join('');
  const schraffen = bild.passstuecke.map(([x, y, b, h]) => schraffur(x, y, b, h, 6)).join('');
  return (
    <Planrahmen viewBox={VIEWBOX}>
      <rect className="formatregler-flaeche" x={0} y={0} width={WAND.b} height={WAND.h} />
      <g className="text-strich">
        {schraffen && <Linie d={schraffen} />}
        <Linie d={fugen} />
      </g>
      <Linie d={`M0 0H${WAND.b}V${WAND.h}H0Z`} />
    </Planrahmen>
  );
}

DATEI 3: src/components/momente/formatregler/Formatregler.tsx
'use client';
// Großer Moment „formatregler“ (KERN v3.4 K-007, K-008; E3-GRAF-05; /leistungen Abschnitt 3, Schlitz momente.tun): dieselbe
// Wand links mit kleinen, rechts mit großen Fliesen (bis 120 × 260 cm, F-20), dazu die Fugenlänge je Format. Der Regler schiebt
// die Trennlinie direkt, ohne Übergang (Rückmeldung; reduziert gleich). Bedienung: nativer Schieberegler (Pfeile, Bild auf/ab,
// Pos1, Ende; Screenreader mit Ansage) und Zeiger auf der Wand (Maus klicken und ziehen; Finger waagrecht ziehen oder tippen,
// senkrecht scrollt die Seite weiter). Bewegt wird nur translate über --formatregler-teil (CSS in bewegung.css).
// Ohne JavaScript steht die Linie in der Mitte, beide Formate und Fugenlängen sind zu sehen; der Regler ist unsichtbar,
// sein Platz bleibt (kein Layoutsprung). Texte aus _werkstatt/texte/leistungen.md.
import { useId, useRef, useState, useSyncExternalStore, type CSSProperties, type PointerEvent as Zeigerereignis } from 'react';
import clsx from 'clsx';
import Icon from '@/components/icons/Icon';
import Wand from './Wand';
import { START, meterText, wandbild, wertAusZeiger, wertText } from './geometrie';
const ohneAbo = () => () => {};
const FUGEN_KLEIN = meterText(wandbild('klein').meter);
const FUGEN_GROSS = meterText(wandbild('gross').meter);
const NBSP = String.fromCharCode(160);
const GROSS_NAME = `Große Fliese, bis 120${NBSP}×${NBSP}260${NBSP}cm`;
export default function Formatregler() {
  const [wert, setWert] = useState(START);
  // true nach der Hydrierung, auf dem Server und ohne JavaScript false (Muster aus common/FussGruppe.tsx)
  const bereit = useSyncExternalStore(ohneAbo, () => true, () => false);
  const zeiger = useRef<number | null>(null);
  const reglerId = `formatregler-${useId().replace(/[^a-zA-Z0-9-]/g, '')}`;
  const ausZeiger = (e: Zeigerereignis<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const neu = wertAusZeiger(e.clientX, r.left, r.width);
    if (neu !== null) setWert(neu);
  };
  return (
    <div className="@container">
      <figure data-motion="formatregler" className="formatregler grid w-full max-w-md grid-cols-1 gap-6 text-tinte @2xl:max-w-full @2xl:grid-cols-2 @2xl:gap-x-12">
        <dl className="grid grid-cols-1 gap-4 @xs:grid-cols-2 @2xl:col-start-2 @2xl:row-start-1 @2xl:grid-cols-1 @2xl:self-end">
          <div>
            <dt className="flex items-center gap-2 font-text text-fs-3 font-semibold"><Icon name="pfeil-links" groesse={4} /><span className="min-w-0">Kleine Fliese</span></dt>
            <dd className="mt-1 font-text text-fs-2 text-tinte-2"><span className="font-mono text-tinte">{FUGEN_KLEIN}</span> Fugen</dd>
          </div>
          <div className="@xs:text-right @2xl:text-left">
            <dt className="flex items-center gap-2 font-text text-fs-3 font-semibold @xs:justify-end @2xl:justify-start"><span className="min-w-0 text-pretty">{GROSS_NAME}</span><Icon name="pfeil-rechts" groesse={4} /></dt>
            <dd className="mt-1 font-text text-fs-2 text-tinte-2"><span className="font-mono text-tinte">{FUGEN_GROSS}</span> Fugen</dd>
          </div>
        </dl>
        <div className="@2xl:col-start-1 @2xl:row-span-2 @2xl:row-start-1">
          <div
            role="img"
            aria-label="Dieselbe Wand, links mit kleinen Fliesen, rechts mit großen Fliesen."
            className={clsx('formatregler-bild touch-pan-y select-none', bereit && 'cursor-ew-resize')}
            style={{ '--formatregler-teil': `${wert}%` } as CSSProperties}
            onPointerDown={(e) => {
              if (e.button !== 0) return;
              zeiger.current = e.pointerId;
              e.currentTarget.setPointerCapture(e.pointerId);
              // Maus springt sofort; Finger erst beim Ziehen oder Tippen, damit Scrollen die Linie nicht versetzt
              if (e.pointerType === 'mouse') ausZeiger(e);
            }}
            onPointerMove={(e) => { if (zeiger.current === e.pointerId) ausZeiger(e); }}
            onPointerUp={(e) => { if (zeiger.current !== e.pointerId) return; ausZeiger(e); zeiger.current = null; }}
            onPointerCancel={() => { zeiger.current = null; }}
          >
            <Wand format="klein" />
            <div className="formatregler-gross" aria-hidden="true"><div><Wand format="gross" /></div></div>
            <div className="formatregler-trenner" aria-hidden="true">
              <span className="formatregler-griff flex size-11 items-center justify-center border border-tinte bg-fliese"><Icon name="pfeil-links" groesse={4} /><Icon name="pfeil-rechts" groesse={4} /></span>
            </div>
          </div>
          <div className={clsx('formatregler-regler mt-6', !bereit && 'invisible')}>
            <label htmlFor={reglerId} className="block font-text text-fs-2 text-tinte-2">Schieben Sie den Punkt nach links oder rechts.</label>
            <input id={reglerId} type="range" min={0} max={100} step={1} value={wert} aria-valuetext={wertText(wert)} onChange={(e) => setWert(Number(e.target.value))} className="mt-2 block h-11 w-full cursor-pointer accent-tinte" />
          </div>
        </div>
        <figcaption className="font-text text-fs-4 font-semibold text-pretty @2xl:col-start-2 @2xl:row-start-2 @2xl:self-start">Große Fliesen haben weniger Fugen.</figcaption>
      </figure>
    </div>
  );
}

DATEI 4: _werkstatt/register/formatregler.json
{"kennung":"formatregler","paket":"E3-GRAF-05","kern":"3.4","zweck":"Rückmeldung: dieselbe Wand mit kleinen Fliesen gegen große Fliesen bis 120 × 260 cm, Fugenlänge je Format","ausloeser":"interaktion","bedienung":"Schieberegler (input type=range, Zeiger und Tastatur) und Zeiger auf der Wand (Maus ziehen, Finger waagrecht ziehen oder tippen)","dauer":"direkt, ohne Übergang","kurve":"keine","eigenschaften":["translate"],"reduziert":"gleich: keine Animation, die Trennlinie folgt der Eingabe","ohne_js":"Trennlinie bei 50 %, beide Formate und beide Fugenlängen sichtbar; Regler unsichtbar, Platz reserviert","wo":["/leistungen"],"schlitz":"momente.tun","data_motion":"nur figure.formatregler; die bewegten Ebenen tragen kein data-motion (sonst setzt die Druck- und forced-colors-Regel in bewegung.css ihr translate zurück)","register_ts":"formatregler: { ausloeser: 'interaktion' }","css":"bewegung.css Block formatregler (formatregler-bild, -gross, -trenner, -griff, -flaeche, -regler)","budget":{"js_gzip_kb":2.5,"css_gzip_kb":0.5,"svg_kb":1},"dateien":["src/components/momente/formatregler/geometrie.ts","src/components/momente/formatregler/Wand.tsx","src/components/momente/formatregler/Formatregler.tsx","test/formatregler.test.mjs"]}

VERBOTE FÜR DEN BAU: keine Änderung an kern/, vorlagen/, bewegung.css, register.ts, package.json. Kein Inline-Stil außer --formatregler-teil, keine Hex-Werte, keine Klassen mit eckigen Klammern oder (--var). Kein transition und keine animation in den Paketdateien. data-motion nur an der figure. Ohne den CSS-Block (Orchestrator) stehen die beiden Wände untereinander: Das ist erwartet und wird nicht durch eigene Stile „repariert“.

## texte

[
 "wörtlich (Seitentext Abschnitt 3, Moment): „Kleine Fliese“, als dt links mit Icon pfeil-links davor",
 "wörtlich (Seitentext Abschnitt 3, Moment): „Große Fliese, bis 120 × 260 cm“, als dt rechts mit Icon pfeil-rechts dahinter; zwischen 120, ×, 260 und cm stehen geschützte Leerzeichen (U+00A0)",
 "wörtlich (Seitentext, Unterschrift): „Große Fliesen haben weniger Fugen.“ als figcaption in text-fs-4 halbfett",
 "NEU (Freigabe Orchestrator nötig, Zahlen außerhalb K-015): „17,4 m Fugen“ und „2,6 m Fugen“ als dd unter den beiden Namen; die Zahl mit „m“ in font-mono und Tinte, „Fugen“ im Textschnitt tinte-2; beide Werte rechnet geometrie.ts (meterText), sie sind nie fest eingetippt",
 "NEU (Name der Zeichnung, aria-label an role=img): „Dieselbe Wand, links mit kleinen Fliesen, rechts mit großen Fliesen.“",
 "NEU (sichtbare Beschriftung des Reglers, label for): „Schieben Sie den Punkt nach links oder rechts.“",
 "NEU (aria-valuetext, nicht sichtbar): bei 0 „Ganze Wand mit großen Fliesen“, bei 100 „Ganze Wand mit kleinen Fliesen“, sonst „Links {n} Prozent kleine Fliesen, rechts große Fliesen“",
 "nicht verwenden: „60 × 60 cm“ (ENTSCHEIDUNGEN: nicht belegt, bleibt draußen), „leichter zu putzen“ (nicht in K-015), „Großformat“ (sonst wäre die Glossarmarke Pflicht), Gedankenstriche, „Fugen-Meter“ (Bindestrichwort außerhalb K-010-B)"
]

## bewegung

Auslöser: Eingabe am Regler (input/change des type=range: Ziehen, Tippen auf die Spur, Tasten) und Zeiger auf der Wand (pointerdown/move/up mit Zeigerfang). Mit der Maus springt die Linie schon beim Drücken. Mit dem Finger springt sie erst beim waagrechten Ziehen oder beim Loslassen nach einem Tipp. touch-action pan-y lässt senkrechtes Scrollen durch, ein Scroll endet als pointercancel und versetzt nichts.
Keyframes: keine. Übergänge: keine. KERN K-007 verlangt „direkt, ohne Verzögerung“, darum gibt es keine Dauer und keine Kurve aus den Tokens.
Bewegt wird nur translate: Die Ebene .formatregler-gross rückt um var(--formatregler-teil) nach rechts, ihr Kind um denselben Betrag zurück. So liegt die große Wand deckungsgleich und ist nur rechts der Linie zu sehen. Die Prozente beziehen sich auf die eigene Breite, und die ist gleich der Bildbreite. Die Trennlinie .formatregler-trenner rückt mit (volle Breite, Linie an ihrer linken Kante, Griff mittig darauf). Kein Clip-Pfad, keine Breitenänderung.
Kein Startzustand und keine Bindung an html.k-bewegung oder k-notaus: Der gerenderte Stand bei 50 % ist schon der Endzustand.
Ersatzpfad (ohne JavaScript, Druck, ohne Unterstützung): Die Linie steht in der Mitte, links kleine, rechts große Fliesen, beide Fugenlängen und die Unterschrift sind sichtbar. Der Regler ist ohne JavaScript unsichtbar (visibility hidden), sein Platz bleibt, im Druck wird er ausgeblendet.
Keine lebende Fugenzahl: K-003 Nr. 6 lässt keine hochzählenden Zahlen zu.

## reduziert

Gleich (K-007: „gleich“). Es gibt keine Animation. Die Trennlinie folgt der Eingabe bei jeder Einstellung sofort, darum braucht es keine Regel unter prefers-reduced-motion. Das Paket enthält kein transition und keine animation, die globale Regel für reduzierte Bewegung (0,01 ms) ändert also nichts.

## zugang

Rollen und Namen:
- figure: Ihr Name kommt aus der figcaption „Große Fliesen haben weniger Fugen.“
- dl: die zwei Gruppen Name und Fugenlänge.
- Bildfeld: role="img" mit aria-label „Dieselbe Wand, links mit kleinen Fliesen, rechts mit großen Fliesen.“ Die SVGs sind über Planrahmen aria-hidden und focusable=false, die Ebenen gross und trenner tragen aria-hidden. Keine IDs in den SVGs, beide Wände dürfen mehrfach vorkommen.
- Regler: input type=range, also nativ role slider, mit sichtbarem label for={reglerId} („Schieben Sie den Punkt nach links oder rechts.“), dazu aria-valuetext mit dem Stand in Worten und aria-valuenow 0 bis 100 vom Browser.
Tastatur, nativ und ohne eigene Tastenbehandlung: Tab erreicht den Regler. Pfeile ändern um 1, Bild auf und ab um etwa 10 (Browser), Pos1 ergibt 0 (ganze Wand groß), Ende ergibt 100 (ganze Wand klein). Das Bildfeld ist nicht fokussierbar, der Regler ist sein Gegenstück.
Fokus: der globale :focus-visible-Ring, 2 px Tinte mit 2 px Abstand (globals.css), in forced-colors Highlight.
Trefferflächen: Regler h-11 über die volle Breite (44 px). Zum Ziehen und Tippen dient die ganze Wand. Der Griff ist size-11 und nur Anzeige.
Zeiger ohne Ziehen (WCAG 2.5.7): Maus klickt, Finger tippt auf die Wand, beides setzt die Linie.
Screenreader: Die Reihenfolge ist Namen und Fugenlängen, Bild, Regler, Unterschrift. Ohne JavaScript ist der Regler unsichtbar, also auch nicht erreichbar (kein toter Regler).
forced-colors: Die Fliesenfläche wird Canvas (eigene Regel, weil fill sonst weiß bliebe). Fugen, Schraffur und Kante sind currentColor, also CanvasText. Die Trennlinie ist ein border und wird CanvasText. Der Griff bekommt Rand CanvasText und Fläche Canvas. Der Regler nutzt Systemfarben. Bedeutung hängt nie an Farbe: Pfeile, Namen und Zahlen tragen sie.
200 % Schrift: dl einspaltig, nichts abgeschnitten, kein seitliches Scrollen.

## budget

JS ohne React: Formatregler.tsx etwa 3 KB roh (etwa 1,2 KB gzip), geometrie.ts etwa 0,4 KB gzip, Wand.tsx etwa 0,3 KB gzip; zeichnen.tsx und Icon sind geteilt (etwa 0,5 KB). Zusammen etwa 2 bis 2,5 KB gzip und damit tief unter dem Bewegungsbudget von 60 KB (K-013). CSS: der Block in bewegung.css hat etwa 1,2 KB roh, etwa 0,4 KB gzip. SVG: zwei Wände mit je einem rect und zwei bis drei Pfaden, unter 1 KB, Grenze 40 KB. Client-Komponente: ja, und zwar nur Formatregler.tsx. Gründe: Sie hält den Zustand des Reglers (useState), setzt die CSS-Variable bei jeder Eingabe und verarbeitet Zeigerereignisse auf der Wand. CSS allein kann den Wert eines Range-Felds nicht lesen. Wand und geometrie enthalten keine Hooks und keine Ereignisse.

## dateien

[
 "src/components/momente/formatregler/geometrie.ts",
 "src/components/momente/formatregler/Wand.tsx",
 "src/components/momente/formatregler/Formatregler.tsx",
 "_werkstatt/register/formatregler.json",
 "test/formatregler.test.mjs"
]

## gemeinsam

[
 "src/app/bewegung.css: neuen Block direkt nach dem verband-Block einfügen (nach der Regel @media (forced-colors: active) { .verband-wahl:has(input:checked) {…} }, vor dem Kommentar „/* aufklappen – Höhe über grid-template-rows …“). Block: /* formatregler (K-007, /leistungen, E3-GRAF-05): dieselbe Wand links mit kleinen, rechts mit großen Fliesen. Der Regler setzt --formatregler-teil (0 % bis 100 %, Anteil der kleinen Fliesen von links) am Bildfeld; Ebene und Trennlinie rücken direkt dorthin, ohne Übergang (direkt, reduziert gleich). Nur translate: die Ebene rückt um den Anteil nach rechts, ihr Inhalt um denselben Betrag zurück. Kein Startzustand: ohne JavaScript und im Druck steht die Linie in der Mitte. */ .formatregler-bild { --formatregler-teil: 50%; position: relative; overflow: hidden; } .formatregler-gross, .formatregler-trenner { position: absolute; inset: 0; translate: var(--formatregler-teil) 0; } .formatregler-gross { overflow: hidden; } .formatregler-gross > * { translate: calc(var(--formatregler-teil) * -1) 0; } .formatregler-trenner { pointer-events: none; } .formatregler-trenner::before { content: \"\"; position: absolute; inset-block: 0; inset-inline-start: -1px; border-inline-start: 2px solid var(--color-tinte); } .formatregler-griff { position: absolute; top: 50%; left: 0; translate: -50% -50%; } .formatregler-flaeche { fill: var(--color-fliese); stroke: none; } @media (forced-colors: active) { .formatregler-flaeche { fill: Canvas; } } @media print { .formatregler-regler { display: none; } }",
 "src/lib/motion/register.ts: in REGISTER am Ende (nach fugenband) zwei Zeilen ergänzen: `// große Momente (K-007, E3-ORCH-02a): Regler ohne Animation, die Lage folgt der Eingabe` und `formatregler: { ausloeser: 'interaktion' },`. Nicht in SELBST, kein Beobachter, kein Ladeeintrag.",
 "_werkstatt/register.json: \"formatregler\" in die Listen \"kennungen\" und \"v3\" aufnehmen; im \"hinweis\" formatregler aus der Aufzählung „kommen mit E3-ORCH-02a dazu“ streichen.",
 "test/bewegung.test.mjs: `const GROSSE_MOMENTE = ['formatregler'];` anlegen; in Bewegung 1 die Vergleichsliste auf [...KERN_V3, ...V2_SVG_E037, ...GROSSE_MOMENTE, ...ENTFALLEN_E009] und die Schleife auf [...KERN_V3, ...V2_SVG_E037, ...GROSSE_MOMENTE] erweitern. Bewegung 3 (ladeKennungen) bleibt unverändert.",
 "package.json scripts.test: am Ende ` test/formatregler.test.mjs` anhängen (Testkonfiguration; die Testdatei selbst gehört dem Paket).",
 "_werkstatt/werkzeuge/bewegung.mjs: in AUSLOESER `formatregler: 'regler'` ergänzen, in NICHT_AUSLOESBAR `regler: 'Regler ohne Animation (K-007 direkt): die Trennlinie folgt der Eingabe, keine Bildfolge'` (register- und reduziert-Modus prüfen weiter).",
 "Vorlagen: keine Änderung. Der Schlitz besteht: ErzaehlSeite.tsx reicht momente?.tun an teile/Tun.tsx, das ihn als `<div className=\"mt-16\">` hinter dem Absatz setzt.",
 "Seite (Paket E3-BAU-04, nicht dieses Paket): `import Formatregler from '@/components/momente/formatregler/Formatregler';` und `<ErzaehlSeite inhalt={…} momente={{ tun: <Formatregler /> }} … />`.",
 "Freiwillig zur Bildprüfung vor E3-BAU-04: src/app/(bestand)/werkstatt-schaufenster/momente/page.dev.tsx mit `<Abschnitt id=\"sf-formatregler\" kopf=\"seitlich\" titel=\"Formatregler\"><Formatregler /></Abschnitt>` (nur next dev, wie szene/page.dev.tsx).",
 "Entscheidung (ENTSCHEIDUNGEN, E-Eintrag): „17,4 m“ und „2,6 m“ sind Rechenwerte der Beispielwand (240 × 260 cm, kleine Fliese als Zeichnungsmaß) und keine Fakten über den Betrieb. Entweder als zulässig nach E-027 festhalten, oder im Bau beide dd-Zeilen weglassen (die Geometrie und der Test bleiben)."
]

## bildbedarf

[]

## pruefung

1. Test anlegen: test/formatregler.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { WAND, FORMATE, START, wandbild, meterText, wertAusZeiger, wertText } from '../src/components/momente/formatregler/geometrie.ts';
const NBSP = String.fromCharCode(160);
test('Formatregler 1: kleine Fliesen im Kreuzverband mit einem Passstreifen unten', () => { const k = wandbild('klein'); assert.deepEqual(k.senkrecht, [60, 120, 180]); assert.deepEqual(k.waagrecht, [60, 120, 180, 240]); assert.deepEqual(k.passstuecke, [[0, 240, 240, 20]]); assert.equal(k.meter, 17.4); });
test('Formatregler 2: zwei große Fliesen füllen die Wand mit einer einzigen Fuge', () => { const g = wandbild('gross'); assert.deepEqual(g.senkrecht, [120]); assert.deepEqual(g.waagrecht, []); assert.deepEqual(g.passstuecke, []); assert.equal(g.meter, 2.6); assert.equal(FORMATE.gross.h, WAND.h); });
test('Formatregler 3: große Fliesen haben weniger Fugen', () => { assert.ok(wandbild('klein').meter > 5 * wandbild('gross').meter); });
test('Formatregler 4: Meter mit Komma und geschütztem Leerzeichen', () => { assert.equal(meterText(17.4), '17,4' + NBSP + 'm'); assert.equal(meterText(2.6), '2,6' + NBSP + 'm'); });
test('Formatregler 5: Zeigerlage begrenzt und gerundet', () => { assert.equal(wertAusZeiger(150, 100, 200), 25); assert.equal(wertAusZeiger(160, 100, 200), 30); assert.equal(wertAusZeiger(50, 100, 200), 0); assert.equal(wertAusZeiger(400, 100, 200), 100); assert.equal(wertAusZeiger(150, 100, 0), null); });
test('Formatregler 6: Start in der Mitte, Ansage ohne Gedankenstrich', () => { assert.equal(START, 50); assert.equal(wertText(0), 'Ganze Wand mit großen Fliesen'); assert.equal(wertText(100), 'Ganze Wand mit kleinen Fliesen'); assert.equal(wertText(50), 'Links 50 Prozent kleine Fliesen, rechts große Fliesen'); for (const w of [0, 1, 50, 99, 100]) assert.ok(!/[–—]| - /.test(wertText(w))); });
Lauf: `node --experimental-strip-types --loader ./test/resolver.mjs --test test/formatregler.test.mjs` aus /home/user/tezgel. Erwartet sind 6 von 6 grün.
2. `npx tsc --noEmit` ohne Fehler in den Paketdateien. `npx eslint src/components/momente/formatregler test/formatregler.test.mjs` ohne Befund.
3. Werte: `node _werkstatt/werkzeuge/werte.mjs --dateien src/components/momente/formatregler/Formatregler.tsx,src/components/momente/formatregler/Wand.tsx,src/components/momente/formatregler/geometrie.ts` ergibt Exit 0. Gegenprobe per grep: in den Paketdateien kein „#“ als Farbe, keine Klasse mit „[“ oder „(--“, kein „transition“, kein „animation“, data-motion genau einmal.
4. Nach dem Einbau durch den Orchestrator (CSS-Block und Register), entweder im Schaufenster oder nach E3-BAU-04 auf /leistungen#was-wir-tun, mit einzelbild.mjs in m390 und d1440:
- Die Linie steht in der Mitte. Links zwei Spalten kleiner Fliesen mit schraffiertem Streifen unten, rechts eine große Fliese bis an die Kante. Der Griff sitzt mittig.
- m390: eine Spalte in der Reihenfolge Namen, Wand, Regler, Unterschrift. d1440: Wand links, Namen und Unterschrift rechts.
5. Zeiger:
- Klick bei 25 % der Wand setzt die Linie dorthin, Ziehen folgt ohne Verzug.
- Touch-Emulation: senkrechtes Wischen scrollt und versetzt nichts, waagrechtes Ziehen verschiebt die Linie, Tippen setzt sie.
6. Tastatur: Tab erreicht den Regler mit sichtbarem Ring. Pos1 zeigt die ganze Wand groß (Ansage „Ganze Wand mit großen Fliesen“), Ende die ganze Wand klein, Pfeile ändern um 1.
7. Weitere Zustände:
- Reduzierte Bewegung (emuliert): Verhalten gleich.
- Ohne JavaScript (javaScriptEnabled false): Linie in der Mitte, beide Fugenlängen sichtbar, Regler unsichtbar, kein Layoutsprung beim Hydrieren (CLS 0 im Abschnitt).
- forced-colors (emuliert): Wand in Canvas, Linien und Trennlinie sichtbar.
- 200 % Schrift auf m390: dl einspaltig, kein seitliches Scrollen.
8. Werkzeuge: `bewegung.mjs --modus register --seite /leistungen` und `--modus reduziert` ohne Befund. `svg.mjs --seiten /leistungen` ohne doppelte IDs. axe ohne Befund am Regler (Name vorhanden).

## risiken

[
 "Zahlen: „17,4 m“ und „2,6 m“ stehen nicht in K-015 (K-010: Zahlen nur aus dem Faktenblatt). Zudem bleibt 60 × 60 laut ENTSCHEIDUNGEN als Text draußen; es bestimmt hier nur unsichtbar die Zeichnung. Vor dem Bau braucht es einen E-Eintrag („Rechenwert der Beispielwand“) oder den Wegfall der beiden dd-Zeilen.",
 "M-06 offen (260 oder 278 cm): Bei 278 müssen WAND.h und FORMATE.gross.h auf 278 gesetzt werden. Dann hat der Passstreifen 38 cm, die Werte werden 17,9 m und 2,8 m, Tests und Seitentext müssen mit.",
 "Gleicher Vertrag wie vorher-nachher (E3-GRAF-07): Beide Regler sollten gleich aussehen und gleich bedient werden (Trennlinie Tinte 2 px, Griff size-11 mit pfeil-links und pfeil-rechts, nativer Regler darunter). Sonst lernt P1 zwei Bedienungen. Später kann der Orchestrator daraus einen Baustein kern/Vergleichsregler machen.",
 "Richtungsverständnis: Schiebt man den Punkt nach rechts, wächst die linke Fläche mit den kleinen Fliesen. Das rechte Etikett heißt aber „Große Fliese“. Die Etiketten bezeichnen Flächen der Wand, nicht Enden des Reglers. Der Punkt steht unter der Linie, das sollte reichen. Prüfen im Probelauf P1 (m390, 200 %).",
 "Der Daumen des nativen Reglers sitzt an den Enden etwa eine halbe Daumenbreite (etwa 8 bis 10 px) innerhalb der Spur. Die Trennlinie geht dagegen bis 0 % und 100 %. Die kleine Abweichung ist hingenommen.",
 "Touch: Beim Druck mit dem Finger springt die Linie bewusst nicht, sondern erst beim Ziehen oder Tippen. Ein schräges Wischen kann der Browser als waagrecht deuten. Auf echtem Gerät und in der Touch-Emulation prüfen.",
 "Ohne den CSS-Block in bewegung.css (gemeinsame Datei) stehen die beiden Wände untereinander. Haiku darf das nicht mit Inline-Stilen, Beliebigwerten oder CSS-Modulen umgehen. Die Bildprüfung geht erst nach dem Einbau durch den Orchestrator.",
 "Die Druck- und forced-colors-Regel in bewegung.css (html.k-bewegung [data-motion] { translate: none !important }) würde bewegte Ebenen zurücksetzen. Darum steht data-motion nur an der figure. Niemand darf es an .formatregler-gross oder .formatregler-trenner setzen.",
 "Kein Laser in der Trennlinie: K-003 Nr. 5 kennt die Laserlinie als Trenner, aber das eine Rot je Bildschirm trägt im Abschnitt die Leitachse (Befund 26, VerbandUmschalter, SzeneAblauf). Will der Orchestrator Rot, verstößt das gegen diese Regel.",
 "Container-Abfragen: Die Zweispaltigkeit hängt an @2xl der Hülle (42rem). Liegt die Inhaltsspalte knapp darunter (etwa t768 bei sehr großen Rändern), bleibt es einspaltig mit max-w-md, rechts entsteht Weißraum.",
 "Hydrierung: Der Regler wird erst nach dem Hydrieren sichtbar (useSyncExternalStore). Hydriert der Suspense-Bereich spät, ist der Platz kurz leer. Das verursacht keinen Sprung, aber ein frühes Tippen auf die Wand wirkt erst nach dem Hydrieren."
]

