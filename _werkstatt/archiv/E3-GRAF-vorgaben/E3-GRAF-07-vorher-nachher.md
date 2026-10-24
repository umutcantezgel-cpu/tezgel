# vorher-nachher

## kennung

vorher-nachher

## seite

/referenzen (Erzählseite). Abschnitt 5 „Beleg“: steht nach der Galerie mit Filter (E3-GRAF-08) und vor den Kundenstimmen. Der Text kommt aus _werkstatt/texte/referenzen.md, Zeilen 50 bis 52.

## schlitz

momente.beleg

## wiederverwendung

BESTANDSAUFNAHME (Suche nach vorher-nachher, VorherNachher, Regler, IMG_2527, IMG_2525, ref-vorher und ref-nachher in src/, _werkstatt/ und _werkstatt/archiv/):
- Eine Komponente gibt es noch nicht. Ordner src/components/momente/ und _werkstatt/register/ fehlen. Im Archiv steht nur die Dokumentar-Galerie C-DOK-01, die hat nichts mit diesem Regler zu tun. type="range" kommt nur in den Funnels vor (Formularregler, nicht übertragbar).
- Vorhanden und passend sind:
  - die Registerzeile in KERN K-007 („Regler (Zeiger und Tastatur) · direkt · gleich · /referenzen“),
  - die Bildplätze ref-vorher und ref-nachher in _werkstatt/bildplaetze.md:56-57 (4:5, sizes „(min-width: 1024px) 40vw, 100vw“, mit Alt-Texten),
  - die Seitentexte.
- In src/config/arbeiten.ts fehlen ref-vorher und ref-nachher. Die Kennung start-galerie-5 (public/images/arbeiten/treppe/aussentreppe-terrakotta-hochformat.jpg, 800 × 1000) stammt zwar aus IMG_2525, ist aber nicht auf das Vorher-Foto ausgerichtet und taugt deshalb nicht als Nachher-Hälfte. Das Vorher-Foto gibt es nur als Social-Zuschnitt _werkstatt/bilder/referenzen/04_baustelle-vorher/fliesenleger-tezgel-asslar-vorher-aussentreppe-beton-ausgebessert.jpg (mit EXIF und mehr Kontrast, keine Webfassung). Das Original liegt in _eingang/entpackt/IMG_2527.PNG.

GENUTZT (nur lesen, nichts daran ändern):
- src/components/kern/Bildfeld.tsx: beide Fotos mit `flaeche`, `sizes` und `className`; next/image, Platzhalter, verzögertes Laden (K-004, K-012).
- src/components/vorlagen/teile/Fotos.tsx: Paar „Vorher | Nachher“ in voller Größe im <noscript> (Fall ohne JavaScript).
- src/components/icons/Icon.tsx mit den Sprite-Namen „pfeil-links“ und „pfeil-rechts“ (src/components/icons/namen.ts): Pfeile im Griff, 1,5-px-Familie.
- useId mit Bereinigung wie in src/components/kern/VerbandUmschalter.tsx (Serverkomponente mit useId).
- Idiom „im Browser?“ über useSyncExternalStore wie in src/components/common/FussGruppe.tsx; kein setState im Effekt.
- Rasterklassen wie in src/components/kern/Abschnitt.tsx (grid-cols-4 / md:grid-cols-8 / lg:grid-cols-12, lg:gap-x-12).
- H3-Klassen wie in src/components/vorlagen/teile/Ablauf.tsx („font-anzeige text-fs-5 font-extrabold text-tinte“).
- Muster „Interaktion ohne Animation, data-motion am Behälter“ wie bei `verband` (VerbandUmschalter, bewegung.css).
- Slot momente.beleg aus src/components/vorlagen/ErzaehlSeite.tsx und teile/Beleg.tsx: unverändert, nimmt ein Fragment aus Galerie und Regler auf.
- Testmuster node:test mit Import von .ts wie test/bewegung.test.mjs (Loader test/resolver.mjs).
- Vor dem Schreiben lesen: node_modules/next/dist/docs/01-app/03-api-reference/01-directives/use-client.md und node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md.

## aufbau

ÜBERSICHT
Eine Serverkomponente mit einer kleinen Client-Insel:
- VorherNachher.tsx (Server): Überschrift, Bühne mit beiden Fotos und rotem Lot, Zeile „Vorher | Nachher“, Unterschrift, noscript-Paar.
- Regler.tsx ('use client'): unsichtbare Zeigerfläche, Griff, natives Schiebefeld (sr-only). Er schreibt nur die CSS-Variable --teilung an die Bühne; React rendert beim Ziehen nichts neu.
- teilung.ts: reine Rechenlogik, getestet.

Die Bühne ist so groß wie das Nachher-Foto im Fluss (feste Maße aus arbeiten.ts, also kein CLS). Das Vorher-Foto liegt absolut darüber in einem Fenster.
- Teilung p (0 bis 100) = Lage des Lots in Prozent von links. Links vom Lot steht vorher, rechts nachher. p = 100 heißt ganz vorher, p = 0 ganz nachher, Start ist 50.
- Bewegt wird nur translate: das Fenster um (p − 100) %, das Vorher-Foto darin um (100 − p) % zurück, das Lot um p %. Alle drei sind so breit wie die Bühne.
- DOM-Reihenfolge Fenster (Vorher), dann Nachher: Der Screenreader liest „Vorher…“ vor „Nachher…“. Absolut positioniert liegt das Vorher-Foto trotzdem oben.

BREITEN
- mobil: 4 von 4 Spalten. Bei m390 ist das Bild 358 px breit und 448 px hoch, Lot, Zeile und Unterschrift passen in einen Bildschirm.
- md: Überschrift 8 Spalten, Figur 6 von 8 Spalten.
- ab lg: Überschrift Spalten 1 bis 4, Figur Spalten 6 bis 10 (lg:col-span-5 lg:col-start-6, eine Spalte Versatz). Bei d1440 und darüber ist das Bild rund 479 px breit und 598 px hoch, bei d1280 rund 465 × 581, bei 1024 rund 359 × 448. Das ganze Bild steht immer in einem Bildschirm.

200 % SCHRIFT
- Überschrift und Unterschrift umbrechen (text-balance, text-pretty, max-w-mass). Die Bildgröße bleibt.
- Die Zeile „Vorher | Nachher“ passt bei 360 px (2 × fs-2 bei 200 %, rund 250 px).
- Nichts überläuft. Der Griff ist 44 px groß, die Zeigerfläche ist das ganze Bild.

DATEI 1 · src/components/momente/vorher-nachher/teilung.ts (wörtlich)
// Reine Logik des Reglers vorher-nachher (KERN v3 K-007, E3-GRAF-07): Teilung in Prozent der Bühnenbreite von links.
// 0 = ganz nachher (Lot am linken Rand), 100 = ganz vorher (Lot am rechten Rand). Test: test/vorher-nachher.test.mjs.
export const START = 50;
export const SCHRITT_TASTE = 5;

export function begrenze(wert: number): number {
  if (!Number.isFinite(wert)) return START;
  return Math.min(100, Math.max(0, Math.round(wert)));
}

export function wertAusZeiger(x: number, links: number, breite: number): number {
  if (!(breite > 0)) return START;
  return begrenze(((x - links) / breite) * 100);
}

export function schrittFuerTaste(taste: string): number {
  if (taste === 'ArrowLeft' || taste === 'ArrowDown') return -SCHRITT_TASTE;
  if (taste === 'ArrowRight' || taste === 'ArrowUp') return SCHRITT_TASTE;
  return 0;
}

export function wertText(wert: number): string {
  const v = begrenze(wert);
  return `${v} Prozent vorher, ${100 - v} Prozent nachher`;
}

DATEI 2 · src/components/momente/vorher-nachher/Regler.tsx (wörtlich; 'use client' ist die erste Zeile)
'use client';

// Regler des großen Moments vorher-nachher (KERN v3 K-007, E3-GRAF-07): Zeiger und Tastatur, direkt. Schreibt --teilung
// (0 bis 100) an die Bühne .vn-buehne; React rendert dabei nichts neu. Tastatur und Screenreader nutzen ein natives
// Schiebefeld (unsichtbar, Fokusrahmen am Griff über bewegung.css). Maus setzt beim Drücken, Finger erst nach 8 px
// waagrecht oder beim Antippen, damit Scrollen über dem Bild das Lot nicht verschiebt (Scrollen und Zoomen bleiben
// erlaubt). Auf dem Server und vor dem Hydrieren rendert der Regler nichts: ohne JavaScript gibt es keinen toten Griff.
import { useRef, useSyncExternalStore, type PointerEvent as ZeigerEreignis } from 'react';
import Icon from '@/components/icons/Icon';
import { START, begrenze, schrittFuerTaste, wertAusZeiger, wertText } from './teilung';

const SCHWELLE_FINGER = 8;

const abonniereNichts = () => () => {};
function useImBrowser(): boolean {
  return useSyncExternalStore(abonniereNichts, () => true, () => false);
}

interface Zug {
  id: number;
  x: number;
  gezogen: boolean;
}

export default function Regler({ titelId, hinweisId }: { titelId: string; hinweisId: string }) {
  const imBrowser = useImBrowser();
  const feld = useRef<HTMLInputElement>(null);
  const zug = useRef<Zug | null>(null);
  if (!imBrowser) return null;

  const setze = (wert: number) => {
    const el = feld.current;
    if (!el) return;
    const v = begrenze(wert);
    el.value = String(v);
    el.setAttribute('aria-valuetext', wertText(v));
    el.closest<HTMLElement>('.vn-buehne')?.style.setProperty('--teilung', String(v));
  };
  const vonZeiger = (e: ZeigerEreignis<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setze(wertAusZeiger(e.clientX, r.left, r.width));
  };

  return (
    <>
      <div
        aria-hidden="true"
        className="vn-zone absolute inset-0 z-10 cursor-ew-resize touch-pan-y touch-pinch-zoom select-none"
        onPointerDown={(e) => {
          if (!e.isPrimary || e.button !== 0) return;
          e.currentTarget.setPointerCapture(e.pointerId);
          zug.current = { id: e.pointerId, x: e.clientX, gezogen: e.pointerType === 'mouse' };
          if (e.pointerType === 'mouse') vonZeiger(e);
        }}
        onPointerMove={(e) => {
          const z = zug.current;
          if (!z || z.id !== e.pointerId) return;
          if (!z.gezogen && Math.abs(e.clientX - z.x) >= SCHWELLE_FINGER) z.gezogen = true;
          if (z.gezogen) vonZeiger(e);
        }}
        onPointerUp={(e) => {
          if (zug.current?.id !== e.pointerId) return;
          vonZeiger(e);
          zug.current = null;
        }}
        onPointerCancel={() => {
          zug.current = null;
        }}
      />
      <div aria-hidden="true" className="vn-teiler pointer-events-none absolute inset-0 z-10">
        <span className="vn-griff absolute top-1/2 left-0 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-strich bg-fliese text-tinte">
          <Icon name="pfeil-links" groesse={4} />
          <Icon name="pfeil-rechts" groesse={4} />
        </span>
      </div>
      <input
        ref={feld}
        type="range"
        min={0}
        max={100}
        step={1}
        defaultValue={START}
        aria-labelledby={titelId}
        aria-describedby={hinweisId}
        aria-valuetext={wertText(START)}
        className="vn-regler sr-only"
        onChange={(e) => setze(Number(e.currentTarget.value))}
        onKeyDown={(e) => {
          const schritt = schrittFuerTaste(e.key);
          if (schritt === 0) return;
          e.preventDefault();
          setze(Number(e.currentTarget.value) + schritt);
        }}
      />
    </>
  );
}

DATEI 3 · src/components/momente/vorher-nachher/VorherNachher.tsx (wörtlich; KEIN 'use client')
// Großer Moment vorher-nachher (KERN v3 K-007, E3-GRAF-07, Seite /referenzen, Slot momente.beleg): dieselbe Treppe vorher
// und nachher in einem Bild, getrennt von einem roten Lot mit Griff. Links vom Lot das Vorher-Foto, rechts das
// Nachher-Foto; der Regler (Zeiger und Tastatur, direkt) verschiebt das Lot. Beide Fotos über Bildfeld (K-012) mit gleichen
// Maßen (Bildplätze ref-vorher und ref-nachher). Bewegt wird nur translate über --teilung (bewegung.css, Abschnitt
// vorher-nachher), ohne Übergang; reduziert gleich. Ohne JavaScript steht das Lot in der Mitte, beide Fotos stehen dann
// ganz darunter (noscript). Abstand: mt-16, als erstes Kind im Slot ohne. Serverkomponente; nur der Regler ist eine Insel.
import { useId } from 'react';
import Bildfeld from '@/components/kern/Bildfeld';
import Fotos from '@/components/vorlagen/teile/Fotos';
import type { ArbeitId } from '@/config/arbeiten';
import Regler from './Regler';

/** sizes laut _werkstatt/bildplaetze.md (ref-vorher, ref-nachher) */
const GROESSEN = '(min-width: 1024px) 40vw, 100vw';

export interface VorherNachherProps {
  /** Foto vorher, gleiche Maße wie nachher (ref-vorher) */
  vorher: ArbeitId;
  /** Foto nachher (ref-nachher) */
  nachher: ArbeitId;
  /** Überschrift aus dem Seitentext */
  titel: string;
  /** Unterschrift unter dem Regler aus dem Seitentext */
  unterschrift: string;
}

export default function VorherNachher({ vorher, nachher, titel, unterschrift }: VorherNachherProps) {
  const uid = useId().replace(/[^a-zA-Z0-9-]/g, '');
  const titelId = `vn-${uid}-titel`;
  const hinweisId = `vn-${uid}-hinweis`;
  return (
    <div className="mt-16 first:mt-0">
      <div className="grid grid-cols-4 gap-y-8 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-12">
        <h3 id={titelId} className="col-span-4 font-anzeige text-fs-5 font-extrabold text-tinte md:col-span-8 lg:col-span-4">
          {titel}
        </h3>
        <div className="col-span-4 md:col-span-6 lg:col-span-5 lg:col-start-6">
          <figure>
            <div className="vn-buehne relative overflow-hidden border border-fuge bg-fliese" data-motion="vorher-nachher">
              <div className="vn-fenster absolute inset-0 overflow-hidden">
                <Bildfeld arbeit={vorher} sizes={GROESSEN} flaeche className="vn-gegen" />
              </div>
              <Bildfeld arbeit={nachher} sizes={GROESSEN} flaeche />
              <div aria-hidden="true" className="vn-teiler pointer-events-none absolute inset-0">
                <span className="absolute inset-y-0 left-0 w-1 -translate-x-1/2 border-x border-fliese bg-laser" />
              </div>
              <Regler titelId={titelId} hinweisId={hinweisId} />
            </div>
            <p aria-hidden="true" className="mt-3 flex justify-between gap-4 font-text text-fs-2 font-semibold text-tinte">
              <span>Vorher</span>
              <span>Nachher</span>
            </p>
            <figcaption id={hinweisId} className="mt-4 max-w-mass font-text text-fs-3 text-pretty text-tinte-2">
              {unterschrift}
            </figcaption>
          </figure>
          <noscript>
            <div className="mt-8">
              <Fotos fotos={[{ bild: vorher, unterschrift: 'Vorher' }, { bild: nachher, unterschrift: 'Nachher' }]} spalten={2} />
            </div>
          </noscript>
        </div>
      </div>
    </div>
  );
}

HINWEISE FÜR DEN BAU
- Das Lot sind 2 px Laser mit je 1 px Fliese an beiden Seiten (w-1 = 4 px, border-x border-fliese, bg-laser). So steht es auf Terrakotta und auf Beton. Unter forced-colors werden die Ränder zu CanvasText.
- Der Griff ist eine Fliese 44 × 44 (bg-fliese, border-strich), ohne Schatten (K-003: keine schwebenden Karten) und ohne Text auf dem Foto.
- figcaption muss das letzte Kind der figure sein, deshalb steht das noscript-Paar außerhalb der figure.
- Keine eigenen Klassen außer den oben genannten. vn-buehne, vn-fenster, vn-gegen, vn-teiler, vn-griff und vn-regler sind Haken für bewegung.css (Orchestrator), vn-zone ist nur ein Name.
- Bis E3-ORCH-02d gibt es ref-vorher und ref-nachher nicht in arbeiten.ts. Zum Ausprobieren nur im Schaufenster die Platzhalter vorher="kontakt-eingang" und nachher="start-galerie-5" verwenden (beide 800 × 1000), nie auf /referenzen.

## texte

[
 "Überschrift (wörtlich, Text verlangt H2, gesetzt als h3, siehe Risiken): „Eine Außentreppe, vorher und nachher.“",
 "Beschriftung unter dem Bild, links und rechts (wörtlich): „Vorher“ · „Nachher“",
 "Unterschrift (wörtlich): „Schieben Sie den Regler hin und her. So sehen Sie den Unterschied.“",
 "Alt-Text ref-vorher (wörtlich aus bildplaetze.md, kommt über arbeiten.ts): „Vorher: Außentreppe aus ausgebessertem Beton“",
 "Alt-Text ref-nachher (wörtlich aus bildplaetze.md, kommt über arbeiten.ts): „Nachher: Außentreppe mit terrakottafarbenen Fliesen“",
 "NEU, Ansage des Schiebefelds für Screenreader (aria-valuetext, Alltagssprache, ohne Striche): „{v} Prozent vorher, {100 − v} Prozent nachher“, zum Beispiel „50 Prozent vorher, 50 Prozent nachher“",
 "Name des Schiebefelds = Überschrift (aria-labelledby), Beschreibung = Unterschrift (aria-describedby): kein weiterer Text",
 "noscript-Paar, Unterschriften (wörtlich wie die Beschriftung): „Vorher“ · „Nachher“",
 "Fachwörter: keine; Fachwort oder Textmarken sind nicht nötig"
]

## bewegung

- Auslöser: Regler (Registerart „interaktion“), mit Zeiger und Tastatur.
  - Maus: Drücken setzt das Lot an die Zeigerstelle, Ziehen führt es.
  - Finger oder Stift: Antippen setzt es, waagrecht ziehen führt es ab 8 px. Senkrechtes Wischen scrollt die Seite und ändert nichts (touch-pan-y; touch-pinch-zoom lässt das Zoomen zu).
  - Tastatur: Pfeile ±5. Bild auf und Bild ab ±10, Pos1 0 und Ende 100 kommen vom nativen Feld.
- Dauer und Kurve: direkt. Keine Keyframes, kein transition, keine Dauer- oder Kurven-Token, nichts federt. Das Lot steht in jedem Bild genau unter dem Zeiger.
- Eigenschaften: nur translate, an drei Elementen über die eine Variable --teilung (ohne Einheit, Standard 50 in CSS):
  - .vn-fenster: translate calc((var(--teilung) − 100) · 1%) 0
  - .vn-gegen (Figure des Vorher-Fotos im Fenster): translate calc((100 − var(--teilung)) · 1%) 0
  - .vn-teiler (Lot und Griff): translate calc(var(--teilung) · 1%) 0
  Kein clip-path, keine Breite, kein left.
- Bewusst keine Startzustände: nichts hängt an html.k-bewegung, nichts ist versteckt, das Bewegungsmodul (IntersectionObserver) wird nicht gebraucht. data-motion="vorher-nachher" sitzt am Behälter der bewegten Teile (.vn-buehne), wie bei verband und sig-plan.
- Ersatzpfad (ohne JavaScript, vor dem Hydrieren, Druck): Das Lot steht durch den CSS-Standard bei 50, links halb vorher, rechts halb nachher, ohne Griff und ohne Schiebefeld. Ohne JavaScript stehen beide Fotos außerdem ganz im noscript-Paar darunter.
- Leistung: Schreiben der CSS-Variable heißt Stil neu rechnen, aber kein Layout, translate läuft im Compositor. Chrome bündelt pointermove pro Bild. Kein requestAnimationFrame nötig.

## reduziert

Gleich (K-007, Registerspalte „Reduziert: gleich“). Es gibt keine Animation und keinen Übergang, also keine Regel unter prefers-reduced-motion. Das Lot folgt nur der Hand oder der Taste, wie ohne Wunsch nach reduzierter Bewegung. Nichts ist versteckt, auch nicht bei html.k-notaus, im Druck oder unter forced-colors. Die Druck- und forced-colors-Regel in bewegung.css, `html.k-bewegung [data-motion] { translate: none !important }`, trifft nur die Bühne selbst. Die Bühne hat kein translate, deshalb ist die Regel hier harmlos, und der Regler funktioniert weiter.

## zugang

- Rolle: natives <input type="range"> (role slider, waagrecht), Werte 0 bis 100, Schritt 1, Start 50.
  - Name kommt von der Überschrift (aria-labelledby → h3), die Beschreibung von der Unterschrift (aria-describedby → figcaption).
  - aria-valuetext: „50 Prozent vorher, 50 Prozent nachher“, bei jeder Änderung neu gesetzt.
- Tastatur: Tab erreicht das Feld (sr-only, in der Tabfolge nach den Galerie-Filtern). Pfeile ±5, Bild auf und ab ±10, Pos1 0, Ende 100. Shift+Tab geht zurück.
- Fokus: 2 px Tinte mit 2 px Abstand am Griff über `.vn-buehne:has(.vn-regler:focus-visible) .vn-griff` (bewegung.css), unter forced-colors in Highlight.
- Zeiger: Die ganze Bildfläche ist das Ziel (über 44 × 44), der Griff selbst ist 44 × 44. Kein Hover-Effekt, nur cursor-ew-resize. Kein Wischen, das die Seite festhält: senkrechtes Scrollen und Zoomen bleiben erlaubt.
- Screenreader:
  - Beide Fotos haben einen Alt-Text und werden in der Reihenfolge Vorher, Nachher gelesen.
  - Zeigerfläche, Lot und Griff sind aria-hidden. Die Zeile „Vorher | Nachher“ ist aria-hidden, weil sie nur die Bildseiten zeigt und Alt-Text und Ansage dasselbe sagen.
  - Kein eigener Landmark: ein div statt section, gegliedert durch h3.
  - VoiceOver und TalkBack können das native Feld per Wischen verstellen.
- forced-colors: Fotos bleiben unverändert. Das Lot wird über border-x zu einer Doppellinie in CanvasText (die Hintergrundfarbe fällt weg). Griffrand und Pfeile (currentColor) werden CanvasText, der Grund Canvas, der Fokus Highlight.
- Kein Text auf Fotos (K-003), Bedeutung nie nur über Farbe: Seiten sind beschriftet, die Ansage ist Text.
- Ohne JavaScript gibt es keinen toten Griff und kein Feld, das nichts tut.

## budget

- JS: Regler.tsx plus teilung.ts, gzip etwa 1 bis 1,5 KB. Icon und Sprite sind schon im Kopf geladen, keine neue Abhängigkeit.
- CSS: etwa 0,4 KB gzip (sieben Regeln in bewegung.css).
- SVG: 0 KB (Pfeile aus dem vorhandenen Sprite).
- Bilder: zwei Webfassungen 800 × 1000 JPEG q82, ausgeliefert von next/image als AVIF oder WebP bei 384 bis 828 w, je etwa 40 bis 70 KB, verzögert geladen und nie LCP. noscript lädt nur ohne JavaScript.
- Summe Bewegungscode des Moments ≤ 2 KB gzip, weit unter den 60 KB für Bewegung (K-013). Keine Zeichnung, also keine 40-KB-Grenze berührt.
- Client-Komponente: ja, nur Regler.tsx. Sie liest Zeiger und Tasten und schreibt eine CSS-Variable. Zeiger und Tasten brauchen JavaScript, weil CSS den Wert eines Schiebefelds nicht lesen kann.
- Hülle und Fotos bleiben Serverkomponente: Die Fotos hydrieren nicht, und React rendert beim Ziehen nichts neu (gut für INP).

## dateien

[
 "src/components/momente/vorher-nachher/VorherNachher.tsx",
 "src/components/momente/vorher-nachher/Regler.tsx",
 "src/components/momente/vorher-nachher/teilung.ts",
 "_werkstatt/register/vorher-nachher.json",
 "test/vorher-nachher.test.mjs"
]

## gemeinsam

[
 "src/app/bewegung.css (Orchestrator): direkt nach dem fugenband-Block, vor dem Kommentar `/* verband (K-007 …`, wörtlich einfügen:\n/* vorher-nachher (K-007, großer Moment /referenzen, E3-GRAF-07) – Regler (Zeiger und Tastatur), direkt: links vom roten\n   Lot das Vorher-Foto, rechts das Nachher-Foto. Der Regler setzt --teilung (0 bis 100, ohne Einheit) an .vn-buehne;\n   Standard 50, so auch ohne JavaScript. Bewegt wird nur translate: das Fenster rückt um (Teilung − 100) %, das Vorher-Foto\n   darin um denselben Betrag zurück, das Lot steht bei Teilung %; alle drei sind so breit wie die Bühne. Kein Übergang:\n   reduziert gleich. */\n.vn-buehne {\n  --teilung: 50;\n}\n.vn-fenster {\n  translate: calc((var(--teilung) - 100) * 1%) 0;\n}\n.vn-gegen {\n  translate: calc((100 - var(--teilung)) * 1%) 0;\n}\n.vn-teiler {\n  translate: calc(var(--teilung) * 1%) 0;\n}\n.vn-buehne:has(.vn-regler:focus-visible) .vn-griff {\n  outline: 2px solid var(--color-tinte);\n  outline-offset: 2px;\n}\n@media (forced-colors: active) {\n  .vn-buehne:has(.vn-regler:focus-visible) .vn-griff {\n    outline-color: Highlight;\n  }\n}",
 "src/lib/motion/register.ts (E3-ORCH-02a): in REGISTER nach `fugenband: { ausloeser: 'scroll' },` die zwei Zeilen `  // große Momente (K-007, E3-ORCH-02a)` und `  'vorher-nachher': { ausloeser: 'interaktion' },` einfügen. Nicht in SELBST aufnehmen (interaktion steht weder in ladeKennungen noch in beobachteteKennungen).",
 "_werkstatt/register.json (E3-ORCH-02a): \"vorher-nachher\" an die Listen \"kennungen\" und \"v3\" anhängen; den Satz im \"hinweis\" bei Bedarf auf „kommt mit E3-ORCH-02a dazu (vorher-nachher übertragen)“ anpassen.",
 "test/bewegung.test.mjs (E3-ORCH-02a): `const MOMENTE_E3 = ['vorher-nachher'];` anlegen. In „Bewegung 1“ die erwartete Liste auf `[...KERN_V3, ...V2_SVG_E037, ...MOMENTE_E3, ...ENTFALLEN_E009]` erweitern und MOMENTE_E3 in die Schleife „gehört zum System“ aufnehmen.",
 "package.json scripts.test (Testkonfiguration): an die Liste der Testdateien ` test/vorher-nachher.test.mjs` anhängen.",
 "src/config/arbeiten.ts (E3-ORCH-02d, Werte aus _werkstatt/bilder/arbeiten-e3.json): zwei Einträge `\"ref-vorher\": { src: \"/images/arbeiten/treppe/aussentreppe-vorher-beton.jpg\", breite: 800, hoehe: 1000, alt: \"Vorher: Außentreppe aus ausgebessertem Beton\", raum: \"treppe\", blur: <aus Datei> }` und `\"ref-nachher\": { src: \"/images/arbeiten/treppe/aussentreppe-nachher-terrakotta.jpg\", breite: 800, hoehe: 1000, alt: \"Nachher: Außentreppe mit terrakottafarbenen Fliesen\", raum: \"treppe\", blur: <aus Datei> }`. Maße beider Einträge müssen gleich sein.",
 "Vorlagen (ErzaehlSeite.tsx, teile/Beleg.tsx): keine Änderung nötig. momente.beleg nimmt ein Fragment; der Abstand zum Vorgänger kommt aus `mt-16 first:mt-0` am Moment.",
 "E3-BAU-07 (src/inhalte/referenzen.ts und src/app/(bestand)/referenzen/page.jsx), nach E3-ORCH-02d: in referenzen.ts `export const REFERENZEN_VORHER_NACHHER = { vorher: 'ref-vorher', nachher: 'ref-nachher', titel: 'Eine Außentreppe, vorher und nachher.', unterschrift: 'Schieben Sie den Regler hin und her. So sehen Sie den Unterschied.' } as const satisfies VorherNachherProps;` (Typ aus '@/components/momente/vorher-nachher/VorherNachher'). In page.jsx `momente={{ beleg: <>{/* Galerie mit Filter (E3-GRAF-08) */}<VorherNachher {...REFERENZEN_VORHER_NACHHER} /></> }}`. Reihenfolge: Galerie zuerst, dann der Regler.",
 "Schaufenster für Stufe A (Orchestrator, Route nur in der Entwicklung): neue Datei src/app/(bestand)/werkstatt-schaufenster/momente/page.dev.tsx mit Einstieg (art=\"arbeit\", etikett=\"Schaufenster · nur Entwicklung\", titel=\"Große Momente\") und `<Abschnitt id=\"sf-vorher-nachher\" titel=\"vorher-nachher\"><VorherNachher vorher=\"kontakt-eingang\" nachher=\"start-galerie-5\" titel=\"Eine Außentreppe, vorher und nachher.\" unterschrift=\"Schieben Sie den Regler hin und her. So sehen Sie den Unterschied.\" /></Abschnitt>`. Nach E3-ORCH-02d die Platzhalter durch ref-vorher und ref-nachher ersetzen.",
 "Optional: _werkstatt/werkzeuge/bewegung.mjs AUSLOESER kennt keine Art „regler“. vorher-nachher hat keine Animation, die Einzelbildfolge entfällt. Registerabgleich und Lauf mit reduzierter Bewegung gelten unverändert. Wahlweise ein Eintrag `'vorher-nachher': 'wahl'` nicht setzen, sondern im Ergebnis als „Interaktion ohne Animation“ vermerken.",
 "KERN K-007, Registerzeile vorher-nachher: inhaltlich unverändert. Wahlweise in die Spalte Reduziert ergänzen: „gleich; ohne JavaScript Lot bei 50 und beide Fotos ganz“."
]

## bildbedarf

[
 "E3-BILD-01, Bildplatz ref-vorher: Quelle _eingang/entpackt/IMG_2527.PNG (1320 × 2868, Bildschirmfoto mit schwarzen Rändern; Startausschnitt wie der Social-Zuschnitt x 0 bis 1320, y 662 bis 2312). Webfassung public/images/arbeiten/treppe/aussentreppe-vorher-beton.jpg, genau 800 × 1000 (4:5), JPEG q82, ohne Metadaten, plus die üblichen Breitenstufen des Werkzeugs bilder.mjs. Alt „Vorher: Außentreppe aus ausgebessertem Beton“, raum treppe, Platzhalter blur. Nicht den Social-Zuschnitt aus _werkstatt/bilder/referenzen/04_baustelle-vorher/ nehmen (EXIF, mehr Kontrast).",
 "E3-BILD-01, Bildplatz ref-nachher: Quelle _eingang/entpackt/IMG_2525.PNG (gleicher Startausschnitt). Webfassung public/images/arbeiten/treppe/aussentreppe-nachher-terrakotta.jpg, genau 800 × 1000, q82, ohne Metadaten. Alt „Nachher: Außentreppe mit terrakottafarbenen Fliesen“, raum treppe. Das vorhandene aussentreppe-terrakotta-hochformat.jpg (start-galerie-5, lage-treppe) bleibt unverändert und wird hier nicht verwendet, weil es nicht auf das Vorher-Foto ausgerichtet ist.",
 "Ausrichtung (Pflicht für den Regler, „gleicher Blick, Geraderichten und Zuschnitt erlaubt“ laut bildplaetze.md):\n- Befund im Rohausschnitt (50-%-Überblendung, Entwurf): Die oberen drei Stufenkanten decken sich fast. Die unteren liegen beim Vorher-Foto etwa 4 % der Höhe höher. Die rechte Treppenwange liegt beim Vorher-Foto rund 8 bis 12 % der Breite weiter rechts und steht senkrecht; beim Nachher-Foto läuft sie schräg (Kamera weiter rechts).\n- Vorgehen: das Vorher-Foto auf das Nachher-Foto einpassen, mit mindestens vier Passpunkten (linkes und rechtes Ende von zwei Stufenvorderkanten, oben und unten; vorher graue Kantenbänder, nachher helle Kantenprofile). Am besten projektiv (Pillow Image.transform PERSPECTIVE in einem Skript im Scratchpad), sonst affin (sharp affine).\n- Danach beide Fotos auf die gemeinsame Fläche ohne leere Ränder zuschneiden. Nie hochskalieren: Die gemeinsame Fläche muss in Quellpixeln mindestens 800 px breit sein.\n- Grenzwerte: Stufenvorderkanten auf der senkrechten Bildmitte ≤ 2 % der Höhe auseinander, rechte Wange ≤ 3 % der Breite.\n- Beleg: 50-%-Überblendung beider Webfassungen als $SCRATCH/E3-BILD-01/ref-ueberblendung.jpg.\n- Wegschneiden, wenn es im gemeinsamen Ausschnitt geht: graues Tuch an der Wand rechts und Blätter unten rechts (IMG_2525), Pflanze am unteren Rand und Fensterrahmen links (IMG_2527). Keine Personen, Hausnummern, Kennzeichen, Logos.",
 "Wenn die Grenzwerte nicht erreichbar sind: als OFFENE FRAGE melden und nicht erzwingen. Der Orchestrator entscheidet dann über den Ersatz Zweierbild (teile/Beleg zweierbild) statt Regler.",
 "Übertrag in den Code: E3-ORCH-02d schreibt aus _werkstatt/bilder/arbeiten-e3.json die Kennungen ref-vorher und ref-nachher in src/config/arbeiten.ts. Bis dahin ist der Moment nur mit den Platzhaltern kontakt-eingang und start-galerie-5 im Schaufenster prüfbar."
]

## pruefung

PAKET (Haiku, ohne Server-Neustart)
1. Typen: `npx tsc --noEmit -p .` ohne Fehler in den drei Moment-Dateien.
2. Lint: `npx eslint src/components/momente/vorher-nachher test/vorher-nachher.test.mjs` mit 0 Fehlern (react-hooks: alle Hooks vor dem frühen return, Refs nur in Handlern).
3. Werte: `node _werkstatt/werkzeuge/werte.mjs --dateien src/components/momente/vorher-nachher/VorherNachher.tsx src/components/momente/vorher-nachher/Regler.tsx src/components/momente/vorher-nachher/teilung.ts --ziel $SCRATCH/E3-GRAF-07/werte` mit 0 Befunden.
4. Eigener Test: `node --experimental-strip-types --loader ./test/resolver.mjs --test test/vorher-nachher.test.mjs` im Repo-Stamm, alle grün. Danach `npm test` weiter grün.
   Inhalt von test/vorher-nachher.test.mjs, sechs Tests mit node:test und assert/strict, Import aus '../src/components/momente/vorher-nachher/teilung.ts':
   (1) START 50, SCHRITT_TASTE 5.
   (2) begrenze(-5)=0, begrenze(104)=100, begrenze(49.6)=50, begrenze(NaN)=50.
   (3) wertAusZeiger(150,100,200)=25, wertAusZeiger(50,100,200)=0, wertAusZeiger(400,100,200)=100, wertAusZeiger(150,100,0)=50.
   (4) Pfeil links und unten −5, rechts und oben +5; Home, End, PageUp, PageDown, Tab und 'a' geben 0.
   (5) wertText(50)='50 Prozent vorher, 50 Prozent nachher', wertText(0)='0 Prozent vorher, 100 Prozent nachher', wertText(130)='100 Prozent vorher, 0 Prozent nachher'.
   (6) Mit fs.readFileSync(new URL(…, import.meta.url)): VorherNachher.tsx enthält 'data-motion="vorher-nachher"' und kein 'use client'; Regler.tsx beginnt mit "'use client'". In beiden kein /#[0-9a-fA-F]{3,8}\b/, kein /className="[^"]*\[/ und kein /\b(transition|animate|duration|dauer)-/.
5. Registerdatei: _werkstatt/register/vorher-nachher.json ist gültiges JSON (`node -e "JSON.parse(require('fs').readFileSync('_werkstatt/register/vorher-nachher.json','utf8'))"`), mit genau diesen Schlüsseln:
   - kennung „vorher-nachher“
   - paket „E3-GRAF-07“
   - kern „v3.4 K-007“
   - zweck „Rückmeldung: Vorher gegen Nachher“
   - ausloeser „interaktion“
   - ausloeser_text „Regler: Zeiger (Maus beim Drücken, Finger nach 8 px waagrecht oder beim Antippen) und Tastatur (Pfeile ±5, Bild auf und ab ±10, Pos1, Ende)“
   - dauer „direkt (kein Übergang)“
   - kurve „keine“
   - eigenschaften [„translate“]
   - reduziert „gleich (keine Animation, nichts versteckt)“
   - ohne_js „Lot bei 50, beide Fotos ganz im noscript-Paar, kein Griff“
   - wo [„/referenzen“]
   - schlitz „momente.beleg (ErzaehlSeite)“
   - element „.vn-buehne mit data-motion; bewegt: .vn-fenster, .vn-gegen, .vn-teiler“
   - register_ts „'vorher-nachher': { ausloeser: 'interaktion' },“
   - css „bewegung.css, Block vorher-nachher (Orchestrator)“
   - budget { js_gzip_kb: 1.5, css_gzip_kb: 0.4, svg_kb: 0, bilder: „2 × 800 × 1000, verzögert“ }
6. `git -C /home/user/tezgel status --porcelain`: neu sind nur die fünf Paketdateien.

NACH DEM EINBAU DURCH DEN ORCHESTRATOR (CSS, Register, Schaufenster; Entwicklungsserver 4320 nur nutzen)
7. Bild: `einzelbild.mjs` für /werkstatt-schaufenster/momente bei m390 und d1440 mit Konsole 0, Überlauf 0, Überlappung 0. Sichtbar: Lot in der Mitte, Griff mittig, links Beton, rechts Fliesen, darunter „Vorher | Nachher“ und die Unterschrift. Bei 200 % Systemschrift auf m390 kein Überlauf.
8. Tastatur (Playwright mit installSperre):
   - Tab bis zum Schiebefeld: Fokusrahmen am Griff sichtbar.
   - 2 × ArrowRight: --teilung an .vn-buehne = 60, aria-valuetext „60 Prozent vorher, 40 Prozent nachher“, Lot bei 60 % der Breite.
   - Home: 0, das ganze Bild nachher. End: 100, das ganze Bild vorher. PageDown: 90.
9. Zeiger:
   - Mausklick bei 25 % der Bildbreite: Wert 25. Ziehen nach 75 %: Wert 75.
   - Touch-Emulation (hasTouch): senkrechtes Wischen über dem Bild scrollt und ändert den Wert nicht; waagrechtes Ziehen ändert ihn; Antippen setzt ihn.
10. Reduziert: emulateMedia reducedMotion 'reduce'. Dasselbe Verhalten, `document.getAnimations().length` ändert sich beim Ziehen nicht (0 neue Animationen). `bewegung.mjs --modus reduziert` und `--modus register`: vorher-nachher registriert, keine Animation ohne data-motion.
11. Ohne JavaScript (javaScriptEnabled false): Lot bei 50 ohne Griff, darunter das noscript-Paar mit „Vorher“ und „Nachher“ in voller Größe.
12. forced-colors (emulateMedia forcedColors 'active'): Lot als Doppellinie sichtbar, Fokus am Griff in Highlight.
13. axe: 0 Verstöße im Moment.
14. Nach E3-BILD-01 und E3-ORCH-02d: Überblendungsbeleg ansehen; bei Teilung 30, 50 und 70 dürfen die Stufenkanten am Lot nicht springen.

## risiken

[
 "Die Fotos passen nur ungefähr zusammen: IMG_2527 und IMG_2525 haben nicht genau denselben Blick (Kamera beim Nachher-Foto weiter rechts, die Wange läuft schräg). Ohne projektive Einpassung springen die Stufenkanten am Lot sichtbar. Gegenmittel: Grenzwerte und Überblendungsbeleg in E3-BILD-01. Werden sie verfehlt, entscheidet der Orchestrator über das Zweierbild statt Regler (teile/Beleg zweierbild ist vorhanden).",
 "Überschriftenebene: Der Seitentext verlangt H2. Der Moment sitzt im Slot innerhalb des Abschnitts „Unsere Arbeiten in Bildern.“ (H2), deshalb ist er als h3 gesetzt. Eine echte H2 bräuchte einen eigenen Abschnitt, also eine Vorlagenänderung (Orchestrator).",
 "Zweites Rot im Bildschirm: Das Lot ist Laser (Achse nach K-003 Nr. 5), daneben läuft die rote Spitze der Leitachse am Rand. Will der Orchestrator genau ein Rot je Bildschirm, im Lot bg-laser durch bg-tinte ersetzen. Sonst muss nichts geändert werden.",
 "Abhängigkeit von gemeinsamen Dateien: Ohne den CSS-Block in bewegung.css liegt das Vorher-Foto ganz über dem Nachher-Foto (kein translate), und der Regler wirkt nicht. Das Paket ist deshalb erst nach dem Einbau durch den Orchestrator sichtbar prüfbar (Schaufenster).",
 "ref-vorher und ref-nachher gibt es erst nach E3-BILD-01 und E3-ORCH-02d in arbeiten.ts. Bis dahin scheitert der Typ ArbeitId auf /referenzen. Im Paket und im Schaufenster nur die Platzhalter kontakt-eingang und start-galerie-5 verwenden.",
 "Beide Fotos müssen gleiche Maße haben. Sonst wird das Vorher-Foto im Fenster beschnitten oder es bleibt eine Lücke. Das ist im Code nur als Kommentar festgehalten, eine Konsolenwarnung würde gegen „Konsole 0“ verstoßen.",
 "Griff erst nach dem Hydrieren: Vorher stehen Lot und beide Bildhälften ohne Griff da. Alles ist absolut positioniert, es gibt keine Layoutverschiebung, und der Moment liegt unter dem ersten Bildschirm (spaet-zeichnen).",
 "noscript: React behandelt die Kinder von noscript als Textinhalt (shouldSetTextContent) und hydriert sie nicht. Mit JavaScript lädt dort kein Bild. Ohne JavaScript ist das einmal mit javaScriptEnabled false zu prüfen (Schritt 11), weil noscript im Bestand bisher nicht vorkommt.",
 "Touch: touch-pan-y mit touch-pinch-zoom schaltet auf der Bildfläche den Doppeltipp-Zoom ab, Pinch-Zoom und Scrollen bleiben. iOS-Safari braucht für das Ziehen über pointer capture keine Sonderbehandlung, das muss aber auf einem echten Gerät oder mit Emulation geprüft werden.",
 "Weiche Vorlage: Das Vorher-Foto ist laut Inventar weich (Note B). Bei etwa 480 px Anzeigebreite am Desktop mit doppelter Pixeldichte reichen 800 px knapp. Eine größere Webfassung geht nur, wenn die gemeinsame Fläche nach der Einpassung breiter als 800 Quellpixel ist (nie hochskalieren).",
 "aria-valuetext wird imperativ gesetzt: Rendert React die Insel durch einen router.refresh() neu, steht die Ansage kurz wieder auf 50, während der Wert bleibt. Das ist geringfügig und korrigiert sich bei der nächsten Bewegung.",
 "Zwei Momente in einem Slot (Galerie mit Filter und dieser Regler): Die Seite muss beide in ein Fragment legen. Der Abstand kommt über `mt-16 first:mt-0`; ändert E3-GRAF-08 seinen Außenabstand, kann ein doppelter Abstand entstehen."
]

