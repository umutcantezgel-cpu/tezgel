# galerie-filter

## kennung

galerie-filter

## seite

/referenzen

## schlitz

momente.beleg (ErzaehlSeite → teile/Beleg.tsx, Abschnitt 5 id="unsere-arbeiten", direkt unter der H2 „Unsere Arbeiten in Bildern.“; danach folgt im selben Schlitz der Regler vorher-nachher aus E3-GRAF-07)

## wiederverwendung

Bestandsaufnahme: Den Moment gibt es noch nicht. grep nach galerie-filter, GalerieFilter und galerie in src/ und _werkstatt/archiv/ findet nur die Planzeile (PLAN.md E3-GRAF-08), die Registerzeile in KERN K-007, den Hinweis in _werkstatt/register.json und die Filternamen in referenzen.md und den Paketen E3-TEXT-06 und E3-LEKT-06. src/components/momente/ und _werkstatt/register/ gibt es noch nicht. Genutzt wird:
1. src/components/kern/Bildfeld.tsx mit `arbeit` und `flaeche`: next/image, feste Maße, unscharfer Platzhalter, Beschriftung mit Innenabstand. Unverändert.
2. src/components/vorlagen/teile/Fotos.tsx als Vorbild für das Raster: @container mit 1 Spalte, @xs (20rem) 2 Spalten, @5xl (64rem) 3 Spalten, Hintergrund der Felder bg-kalk. sizes wie start-galerie in _werkstatt/bildplaetze.md: '(min-width: 1024px) 30vw, 50vw'.
3. wahlKlassen aus src/components/kern/stile.ts für die Knöpfe mit aria-pressed. Gewählt heißt: Rand in Tinte, Ring innen, halbfett, keine Tinte-Fläche.
4. Muster der vorhandenen Filter: src/components/sections/ReviewsSection.jsx (Themenfilter der Bewertungen auf derselben Seite: role="group", Knöpfe mit aria-pressed, flex-wrap gap-2) und src/components/blog/BlogFilter.jsx (genau ein Zeichen im Knopf: gedrückt das Fugenkreuz, sonst das Icon; Statusregion role="status").
5. Icon (src/components/icons/Icon.tsx) mit den vorhandenen Namen fliese, bad, dusche-rinne, balkon, treppe, reparatur. Dazu Fugenkreuz (src/components/kern/Fugenkreuz.tsx).
6. Sechs Unterschriften wörtlich aus GALERIE_START (src/inhalte/galerie.ts): start-galerie-1 bis start-galerie-6.
7. Bildkennungen nur aus ARBEITEN (src/config/arbeiten.ts). 25 vorhandene Webfassungen im Format 4 : 5, jede Bilddatei nur einmal.
8. Rahmen als Treppe statt Fugen-Hintergrund: ul mit border-t border-l, jedes li mit border-r border-b. So ist es schon bei den Kennzahlen in ReviewsSection gelöst. Nach dem Filtern stehen damit keine grauen Restfelder.
9. CSS-Variable als Inline-Stil wie in Verlegeplan.tsx ('--richtung' … as CSSProperties).
10. Aufbau der Registerblöcke in src/app/bewegung.css wie bei `verband`: Startzustand nur unter html.k-bewegung:not(.k-notaus), dazu ein Block für Druck und forced-colors.
Bewusst nicht übernommen: die reine CSS-Radiogruppe aus VerbandUmschalter (:has()). Dort startet die Einblend-Animation bei jedem Wechsel von display:none, also auch beim ersten Zeichnen und beim späten Zeichnen durch content-visibility. Das wäre ein Startzustand beim Laden, nicht bei der Auswahl. Außerdem gäbe es keine Ansage, wie viele Fotos zu sehen sind. Stattdessen eine kleine Insel wie der Bewertungsfilter auf derselben Seite. Die Fotos bleiben Serverknoten.

## aufbau

DOM (Server: GalerieFilter → Insel: GalerieWahl)
div
  div.noscript:hidden   (Bedienung; ohne JavaScript ganz verborgen)
    p#satzId.max-w-mass.font-text.text-fs-3.text-pretty.text-tinte   → SATZ
    div[role=group][aria-labelledby=satzId].mt-6.flex.flex-wrap.gap-2
      6 × button[type=button][aria-pressed][data-galerie-wahl=<id>] class = wahlKlassen + gap-2
          Inhalt: Fugenkreuz size-3, wenn gedrückt, sonst Icon groesse 4; dann der Name
    p[role=status].mt-6.font-text.text-fs-2.text-tinte-2   → ansage()
  div.@container.mt-6
    ul.grid.grid-cols-1.border-t.border-l.border-fuge.@xs:grid-cols-2.@5xl:grid-cols-3
      25 × li[data-motion=galerie-filter][data-galerie-gruppe][hidden?][data-galerie-neu?][style --galerie-stufe?].border-r.border-b.border-fuge.bg-kalk
          → Bildfeld flaeche (figure > div.bg-fliese > img; figcaption mit der Unterschrift)

Breiten:
- m390: Inhalt 358 px, also 2 Spalten zu etwa 179 px. Die Knöpfe brechen auf 3 bis 4 Zeilen um.
- t768: 2 Spalten.
- ab lg (d1440, max-w-seite 82rem, px-12, also etwa 1216 px): 3 Spalten zu etwa 405 px; die Knöpfe stehen in 1 bis 2 Zeilen.
- 200 % Systemschrift auf 390 px: 20rem sind 640 px, also 1 Spalte. Jeder Knopf steht in einer eigenen Zeile; lange Namen brechen im Knopf um (Flex-Element schrumpft, min-h-11). Kein seitliches Scrollen. Unterschriften ohne Silbentrennung (Bildfeld flaeche).
- Ohne JavaScript: nur die Liste mit allen 25 Fotos.

Keine SVG-Zeichnung, keine neuen Tokens. Farben: tinte, tinte-2, fuge, kalk, fliese, strich (über wahlKlassen). Kein Rot.

=== DATEI src/components/momente/galerie-filter/daten.ts ===
// Galerie „Unsere Arbeiten“ auf /referenzen (KERN v3.4 K-007 `galerie-filter`, K-012; E3-GRAF-08): Daten und reine Logik
// des großen Moments, ohne JSX und nur mit Typ-Importen (test/galerie-filter.test.mjs lädt die Datei direkt). Filter und Satz
// wörtlich aus _werkstatt/texte/referenzen.md (Abschnitt 5), „Alle Fotos“ und die Statuszeile neu. Je Foto eine Gruppe nach
// dem, was zu sehen ist (nicht nach `raum` in arbeiten.ts: bad-beleg-4 ist eine Dusche, Baustellenbilder sind „So arbeiten
// wir“), und eine kurze Unterschrift aus dem Alt-Text, ohne Orte (K-015) und ohne Fachwort. Nur Fotos im Format 4 : 5, jede
// Bilddatei einmal, das Einstiegsbild der Seite (bad-einstieg) nicht. Reihenfolge abwechselnd nach Gruppe, damit „Alle Fotos“
// gemischt beginnt. Neue Bildplätze aus E3-BILD-01 hier ergänzen.
import type { ArbeitId } from '@/config/arbeiten';
import type { IconName } from '@/components/icons/namen';

export type GruppeId = 'bad' | 'dusche' | 'balkon-und-terrasse' | 'treppe-und-eingang' | 'so-arbeiten-wir';
export type Wahl = 'alle' | GruppeId;

export interface Gruppe {
  id: Wahl;
  /** Beschriftung des Knopfs */
  name: string;
  /** Zeichen im Knopf (eigene Icon-Familie); gedrückt steht dort das Fugenkreuz */
  icon: IconName;
  /** Satzende der Statuszeile („Sie sehen 7 Fotos aus dem Bad.“); leer bei „Alle Fotos“ */
  zusatz: string;
}

export interface GalerieFoto {
  bild: ArbeitId;
  gruppe: GruppeId;
  unterschrift: string;
}

/** Satz über den Knöpfen (wörtlich aus dem Seitentext), zugleich Name der Knopfgruppe */
export const SATZ = 'Wählen Sie einen Raum. Dann sehen Sie nur die Fotos aus diesem Raum.';

export const GRUPPEN: Gruppe[] = [
  { id: 'alle', name: 'Alle Fotos', icon: 'fliese', zusatz: '' },
  { id: 'bad', name: 'Bad', icon: 'bad', zusatz: 'aus dem Bad' },
  { id: 'dusche', name: 'Dusche', icon: 'dusche-rinne', zusatz: 'von Duschen' },
  { id: 'balkon-und-terrasse', name: 'Balkon und Terrasse', icon: 'balkon', zusatz: 'von Balkon und Terrasse' },
  { id: 'treppe-und-eingang', name: 'Treppe und Eingang', icon: 'treppe', zusatz: 'von Treppe und Eingang' },
  { id: 'so-arbeiten-wir', name: 'So arbeiten wir', icon: 'reparatur', zusatz: 'von unserer Arbeit auf der Baustelle' },
];

export const GALERIE: GalerieFoto[] = [
  { bild: 'start-dusche', gruppe: 'dusche', unterschrift: 'Dusche ohne Stufe mit großen grauen Fliesen' },
  { bild: 'start-galerie-2', gruppe: 'bad', unterschrift: 'Badewanne mit dunklen Mosaikfliesen' },
  { bild: 'start-galerie-3', gruppe: 'balkon-und-terrasse', unterschrift: 'Balkon mit dunklen Fliesen, jede Reihe um ein Stück versetzt' },
  { bild: 'start-galerie-5', gruppe: 'treppe-und-eingang', unterschrift: 'Außentreppe mit Fliesen in Terrakotta' },
  { bild: 'entstehung-dusche-2', gruppe: 'so-arbeiten-wir', unterschrift: 'Die Fliesen sind schräg zum Ablauf geschnitten, so läuft das Wasser gut ab' },
  { bild: 'bereich-wanne-mit-tuer', gruppe: 'bad', unterschrift: 'Badewanne mit Tür, so steigt man leichter ein' },
  { bild: 'start-galerie-1', gruppe: 'dusche', unterschrift: 'Dusche ohne Stufe mit Sitzbank und Mosaik' },
  { bild: 'start-galerie-4', gruppe: 'balkon-und-terrasse', unterschrift: 'Terrasse mit großen hellgrauen Platten' },
  { bild: 'sanierung-weg-1', gruppe: 'so-arbeiten-wir', unterschrift: 'Bad während der Arbeit, die Wand ist halb gefliest' },
  { bild: 'bad-beleg-3', gruppe: 'bad', unterschrift: 'Doppelwaschtisch aus dunklem Holz mit goldenem Spiegel' },
  { bild: 'bereich-dusche-streifen-sitzbank', gruppe: 'dusche', unterschrift: 'Dusche mit dunklem Streifen und gefliester Sitzbank' },
  { bild: 'balkon-beleg-2', gruppe: 'balkon-und-terrasse', unterschrift: 'Balkon mit rosébraunen Fliesen und Geländer' },
  { bild: 'kontakt-eingang', gruppe: 'treppe-und-eingang', unterschrift: 'Stufen am Eingang mit beigen Fliesen und hellen Kanten' },
  { bild: 'start-galerie-6', gruppe: 'so-arbeiten-wir', unterschrift: 'Balkonboden vor dem Verlegen: ein blaues Band dichtet die Ränder ab' },
  { bild: 'fliesen-fischgraet', gruppe: 'bad', unterschrift: 'Grüne Fliesen im Fischgrätmuster mit großer Nische' },
  { bild: 'bad-beleg-4', gruppe: 'dusche', unterschrift: 'Dusche mit Mosaikstreifen an der Wand' },
  { bild: 'balkon-beleg-3', gruppe: 'balkon-und-terrasse', unterschrift: 'Terrasse in Erdtönen mit einem Gitter für das Regenwasser' },
  { bild: 'entstehung-dusche-1', gruppe: 'so-arbeiten-wir', unterschrift: 'Kleine Klemmen bringen große Fliesen genau auf eine Höhe' },
  { bild: 'sanierung-einstieg', gruppe: 'bad', unterschrift: 'Freistehende Badewanne vor beigen Fliesen' },
  { bild: 'balkon-einstieg', gruppe: 'balkon-und-terrasse', unterschrift: 'Graue Terrassenplatten mit heller Kante aus Metall' },
  { bild: 'sanierung-weg-2', gruppe: 'so-arbeiten-wir', unterschrift: 'Bad während der Arbeit, die Decke ist noch offen' },
  { bild: 'bad-beleg-1', gruppe: 'bad', unterschrift: 'Badewanne mit Lichtlinie und gemustertem Boden' },
  { bild: 'balkon-stelzlager', gruppe: 'so-arbeiten-wir', unterschrift: 'Große Platten liegen auf kleinen Füßen, darunter läuft Regen ab' },
  { bild: 'bad-beleg-2', gruppe: 'bad', unterschrift: 'Bad im Landhausstil mit Wanne und Holzregal' },
  { bild: 'sanierung-weg-3', gruppe: 'so-arbeiten-wir', unterschrift: 'Bad während der Arbeit, brauner Boden in der Dusche' },
];

/** höchste Staffelstufe: K-005 erlaubt eine Staffel über höchstens 8 Elemente (Stufen 0 bis 7) */
export const STAFFEL_MAX = 7;

export function istSichtbar(gruppe: GruppeId, wahl: Wahl): boolean {
  return wahl === 'alle' || gruppe === wahl;
}

export function anzahl(wahl: Wahl, fotos: readonly { gruppe: GruppeId }[]): number {
  return fotos.filter((f) => istSichtbar(f.gruppe, wahl)).length;
}

/** Blendet ein Foto nach einem Wechsel ein? Beim Laden nie (vorher null); bei einem Raum alle seine Fotos (sie legen sich
 *  neu); bei „Alle Fotos“ nur die, die vorher verborgen waren (die stehenden bleiben ruhig). */
export function blendetEin(gruppe: GruppeId, wahl: Wahl, vorher: Wahl | null): boolean {
  if (vorher === null || !istSichtbar(gruppe, wahl)) return false;
  return wahl !== 'alle' || !istSichtbar(gruppe, vorher);
}

/** Staffelstufe je Foto in Lesefolge: 0, 1, 2 … höchstens STAFFEL_MAX für einblendende Fotos, sonst null */
export function stufen(fotos: readonly { gruppe: GruppeId }[], wahl: Wahl, vorher: Wahl | null): (number | null)[] {
  let n = 0;
  return fotos.map((f) => (blendetEin(f.gruppe, wahl, vorher) ? Math.min(n++, STAFFEL_MAX) : null));
}

/** Text der Statuszeile (role="status"), z. B. „Sie sehen 7 Fotos aus dem Bad.“ */
export function ansage(wahl: Wahl, n: number): string {
  if (wahl === 'alle') return `Sie sehen alle ${n} Fotos.`;
  const zusatz = GRUPPEN.find((g) => g.id === wahl)?.zusatz ?? '';
  return `Sie sehen ${n === 1 ? '1 Foto' : `${n} Fotos`} ${zusatz}.`;
}

=== DATEI src/components/momente/galerie-filter/GalerieWahl.tsx ===
'use client';
// Galerie „Unsere Arbeiten“ · Auswahl (KERN v3.4 K-007 `galerie-filter`, E3-GRAF-08): Insel mit Zustand. Knöpfe mit
// aria-pressed wie der Themenfilter der Bewertungen (wahlKlassen; genau ein Zeichen: gedrückt das Fugenkreuz, sonst das
// Raumzeichen), darunter die Statuszeile (role="status") und die Fotos als verlegte Fläche. Die Fotos kommen fertig vom
// Server (Bildfeld als Knoten); die Insel setzt nur hidden und die Marke data-galerie-neu mit der Staffelstufe. Neue Fotos
// blenden in dauer-2 ein, Stück für Stück (CSS in bewegung.css), wegfallende gehen sofort. Ohne JavaScript stehen alle
// Fotos; Satz, Knöpfe und Statuszeile sind dann verborgen (noscript:hidden). Rand je Foto statt Fugen-Hintergrund: Nach dem
// Filtern stehen keine grauen Restfelder, die Fläche endet wie ein Boden mitten im Verlegen.
import { useId, useState, type CSSProperties, type ReactNode } from 'react';
import clsx from 'clsx';
import Icon from '@/components/icons/Icon';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import { wahlKlassen } from '@/components/kern/stile';
import type { ArbeitId } from '@/config/arbeiten';
import { GRUPPEN, ansage, anzahl, istSichtbar, stufen, type GruppeId, type Wahl } from './daten';

export interface GalerieWahlFoto {
  bild: ArbeitId;
  gruppe: GruppeId;
  /** fertiges Bildfeld vom Server */
  knoten: ReactNode;
}

interface Stand {
  wahl: Wahl;
  /** Auswahl vor dem letzten Wechsel; null bis zum ersten Wechsel (beim Laden blendet nichts ein) */
  vorher: Wahl | null;
}

export default function GalerieWahl({ fotos, satz }: { fotos: GalerieWahlFoto[]; satz: string }) {
  const satzId = useId();
  const [stand, setStand] = useState<Stand>({ wahl: 'alle', vorher: null });
  const waehlen = (wahl: Wahl) => setStand((s) => (s.wahl === wahl ? s : { wahl, vorher: s.wahl }));
  const gruppen = GRUPPEN.filter((g) => anzahl(g.id, fotos) > 0);
  const stufe = stufen(fotos, stand.wahl, stand.vorher);

  return (
    <div>
      {/* Bedienung: ohne JavaScript verborgen (die Knöpfe täten nichts), dann stehen alle Fotos */}
      <div className="noscript:hidden">
        <p id={satzId} className="max-w-mass font-text text-fs-3 text-pretty text-tinte">
          {satz}
        </p>
        <div role="group" aria-labelledby={satzId} className="mt-6 flex flex-wrap gap-2">
          {gruppen.map((g) => {
            const gedrueckt = g.id === stand.wahl;
            return (
              <button
                key={g.id}
                type="button"
                aria-pressed={gedrueckt}
                data-galerie-wahl={g.id}
                onClick={() => waehlen(g.id)}
                className={clsx(wahlKlassen, 'gap-2')}
              >
                {gedrueckt ? <Fugenkreuz className="size-3 shrink-0" /> : <Icon name={g.icon} groesse={4} />}
                {g.name}
              </button>
            );
          })}
        </div>
        <p role="status" className="mt-6 font-text text-fs-2 text-tinte-2">
          {ansage(stand.wahl, anzahl(stand.wahl, fotos))}
        </p>
      </div>
      {/* 1 Spalte, ab 20 rem 2, ab 64 rem 3 (wie teile/Fotos; große Systemschrift: eine Spalte) */}
      <div className="@container mt-6">
        <ul className="grid grid-cols-1 border-t border-l border-fuge @xs:grid-cols-2 @5xl:grid-cols-3">
          {fotos.map((f, i) => {
            const s = stufe[i];
            const neu = typeof s === 'number';
            return (
              <li
                key={f.bild}
                hidden={!istSichtbar(f.gruppe, stand.wahl)}
                data-motion="galerie-filter"
                data-galerie-gruppe={f.gruppe}
                data-galerie-neu={neu ? '' : undefined}
                style={neu ? ({ '--galerie-stufe': s } as CSSProperties) : undefined}
                className="border-r border-b border-fuge bg-kalk"
              >
                {f.knoten}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

=== DATEI src/components/momente/galerie-filter/GalerieFilter.tsx ===
// Großer Moment `galerie-filter` (KERN v3.4 K-007, /referenzen, E3-GRAF-08): Galerie „Unsere Arbeiten“ mit Filter nach Raum.
// Serverkomponente: baut je Foto das Bildfeld (next/image mit festen Maßen, Platzhalter, verzögertes Laden; verborgene Fotos
// laden erst, wenn sie gezeigt werden) und gibt die fertigen Knoten an die Insel GalerieWahl, die nur auswählt. Platz:
// Schlitz momente.beleg der ErzaehlSeite, direkt unter der H2 „Unsere Arbeiten in Bildern.“ (#unsere-arbeiten).
import Bildfeld from '@/components/kern/Bildfeld';
import GalerieWahl from './GalerieWahl';
import { GALERIE, SATZ } from './daten';

/** sizes wie die Galerie der Startseite (_werkstatt/bildplaetze.md, start-galerie): drei Spalten ab lg, sonst zwei */
const GROESSEN = '(min-width: 1024px) 30vw, 50vw';

export default function GalerieFilter({ satz = SATZ }: { satz?: string }) {
  return (
    <GalerieWahl
      satz={satz}
      fotos={GALERIE.map((f) => ({
        bild: f.bild,
        gruppe: f.gruppe,
        knoten: <Bildfeld arbeit={f.bild} sizes={GROESSEN} beschriftung={f.unterschrift} flaeche />,
      }))}
    />
  );
}

Einbau später (nicht in diesem Paket): import GalerieFilter from '@/components/momente/galerie-filter/GalerieFilter'; dann <ErzaehlSeite … momente={{ beleg: <GalerieFilter /> }} /> (zusammen mit vorher-nachher, siehe gemeinsam).

## texte

[
 "Wörtlich aus referenzen.md: Satz über den Knöpfen und Name der Knopfgruppe: „Wählen Sie einen Raum. Dann sehen Sie nur die Fotos aus diesem Raum.“",
 "Wörtlich aus referenzen.md: Knöpfe „Bad“ · „Dusche“ · „Balkon und Terrasse“ · „Treppe und Eingang“ · „So arbeiten wir“",
 "Wörtlich aus referenzen.md, gesetzt von Beleg.tsx und nicht vom Moment: H2 „Unsere Arbeiten in Bildern.“",
 "NEU: erster Knopf „Alle Fotos“ (zurück zu allen Bildern; Muster „Alle Bewertungen“ und „Alle Themen“)",
 "NEU: Statuszeile „Sie sehen alle 25 Fotos.“ · „Sie sehen 7 Fotos aus dem Bad.“ · „Sie sehen 4 Fotos von Duschen.“ · „Sie sehen 5 Fotos von Balkon und Terrasse.“ · „Sie sehen 2 Fotos von Treppe und Eingang.“ · „Sie sehen 7 Fotos von unserer Arbeit auf der Baustelle.“ (Zahl aus den Daten; bei einem Foto: „1 Foto“)",
 "Wörtlich aus src/inhalte/galerie.ts (GALERIE_START): „Dusche ohne Stufe mit Sitzbank und Mosaik“ · „Badewanne mit dunklen Mosaikfliesen“ · „Balkon mit dunklen Fliesen, jede Reihe um ein Stück versetzt“ · „Terrasse mit großen hellgrauen Platten“ · „Außentreppe mit Fliesen in Terrakotta“ · „Balkonboden vor dem Verlegen: ein blaues Band dichtet die Ränder ab“",
 "NEU, Unterschriften aus den Alt-Texten (ohne Fachwort, ohne Ort), Gruppe Bad: „Badewanne mit Tür, so steigt man leichter ein“ · „Doppelwaschtisch aus dunklem Holz mit goldenem Spiegel“ · „Grüne Fliesen im Fischgrätmuster mit großer Nische“ · „Freistehende Badewanne vor beigen Fliesen“ · „Badewanne mit Lichtlinie und gemustertem Boden“ · „Bad im Landhausstil mit Wanne und Holzregal“",
 "NEU, Gruppe Dusche: „Dusche ohne Stufe mit großen grauen Fliesen“ · „Dusche mit dunklem Streifen und gefliester Sitzbank“ · „Dusche mit Mosaikstreifen an der Wand“",
 "NEU, Gruppe Balkon und Terrasse: „Balkon mit rosébraunen Fliesen und Geländer“ · „Terrasse in Erdtönen mit einem Gitter für das Regenwasser“ · „Graue Terrassenplatten mit heller Kante aus Metall“",
 "NEU, Gruppe Treppe und Eingang: „Stufen am Eingang mit beigen Fliesen und hellen Kanten“",
 "NEU, Gruppe So arbeiten wir: „Die Fliesen sind schräg zum Ablauf geschnitten, so läuft das Wasser gut ab“ · „Bad während der Arbeit, die Wand ist halb gefliest“ · „Kleine Klemmen bringen große Fliesen genau auf eine Höhe“ · „Bad während der Arbeit, die Decke ist noch offen“ · „Große Platten liegen auf kleinen Füßen, darunter läuft Regen ab“ · „Bad während der Arbeit, brauner Boden in der Dusche“",
 "Alt-Texte unverändert aus ARBEITEN (Bildfeld). Fachwörter (Nivelliersystem, Kuvertschnitt, Stelzlager, Bodenrost, bodengleiche Dusche) sind bewusst umschrieben; deshalb ist kein Fachwort-Baustein nötig."
]

## bewegung

Auslöser: Auswahl, also ein Klick oder Enter/Leertaste auf einen Knopf (button[data-galerie-wahl]). Der Zustand { wahl, vorher } wechselt. Ein erneuter Klick auf den schon gewählten Knopf ändert nichts.

Was passiert: Fotos, die nicht zur Auswahl gehören, bekommen `hidden` und verschwinden sofort (Tailwind-Preflight: display none). Fotos mit blendetEin() bekommen data-galerie-neu und --galerie-stufe = 0 … 7 in Lesefolge. Sie blenden nacheinander ein, Fliese für Fliese:
- Bei einem Raum blenden alle Fotos dieses Raums neu ein; sie legen sich neu.
- Bei „Alle Fotos“ blenden nur die vorher verborgenen ein; die stehenden bleiben ruhig.
- Beim Laden blendet nichts ein (vorher = null).
Die Animation startet, weil das Element aus display:none kommt oder weil der Name der Animation neu gesetzt wird.

Keyframes (nur opacity): @keyframes galerie-zeigen { from { opacity: 0; } }

Regel (Orchestrator trägt sie in bewegung.css ein, siehe gemeinsam):
html.k-bewegung:not(.k-notaus) [data-motion="galerie-filter"][data-galerie-neu] { animation: galerie-zeigen var(--dauer-2) var(--ease-setzen) calc(var(--staffel) * var(--galerie-stufe, 0)) both; }

Dauer und Kurve: dauer-2 (320 ms) · ease-setzen, ohne Überschwingen. Staffel --staffel (60 ms), höchstens 8 Stufen. Das letzte Foto ist nach 320 + 7 · 60 = 740 ms da (große Momente höchstens 1,6 s). Nur opacity, kein transform nötig; kein Federn, keine Schleife.

Ersatzpfad: ohne html.k-bewegung (reduziert, kein JavaScript), mit html.k-notaus, im Druck und bei forced-colors keine Animation. Endzustand ist Deckkraft 1. Die Fotos stehen oder wechseln sofort.

Registereintrag als Datei _werkstatt/register/galerie-filter.json (Paket schreibt sie genau so):
{
  "kennung": "galerie-filter",
  "paket": "E3-GRAF-08",
  "kern": "3.4",
  "zweck": "Rückmeldung: Bilder nach Raum",
  "wo": ["/referenzen"],
  "schlitz": "momente.beleg (ErzaehlSeite, Abschnitt 5 #unsere-arbeiten, unter der H2 „Unsere Arbeiten in Bildern.“)",
  "registerTs": { "ausloeser": "interaktion" },
  "ausloeser": "Auswahl: Knopf mit aria-pressed (button[data-galerie-wahl])",
  "elemente": "li[data-motion=\"galerie-filter\"][data-galerie-neu]",
  "keyframes": ["galerie-zeigen"],
  "eigenschaften": ["opacity"],
  "dauer": "--dauer-2 (320 ms)",
  "kurve": "--ease-setzen",
  "staffel": "calc(var(--staffel) * var(--galerie-stufe, 0)), Stufen 0 bis 7",
  "laengsteMs": 740,
  "einblenden": "bei einem Raum alle seine Fotos, bei „Alle Fotos“ nur die vorher verborgenen; wegfallende sofort (hidden); beim Laden nichts",
  "reduziert": "Sofortzustand (ohne html.k-bewegung keine Animation)",
  "notaus": "Sofortzustand (html.k-notaus)",
  "ohneJs": "alle Fotos sichtbar; Satz, Knöpfe und Statuszeile verborgen (noscript:hidden)",
  "druckForcedColors": "keine Animation, Deckkraft 1",
  "budget": { "jsGzipKb": 2, "cssGzipKb": 0.4, "clientKomponente": "GalerieWahl (Zustand der Auswahl, Statuszeile)" },
  "dateien": ["src/components/momente/galerie-filter/daten.ts", "src/components/momente/galerie-filter/GalerieWahl.tsx", "src/components/momente/galerie-filter/GalerieFilter.tsx", "test/galerie-filter.test.mjs"],
  "gemeinsam": ["src/app/bewegung.css", "src/lib/motion/register.ts", "_werkstatt/register.json", "test/bewegung.test.mjs", "package.json (Testliste)", "src/components/vorlagen/teile/Beleg.tsx (Abstand)"]
}

## reduziert

Sofortzustand. Bei prefers-reduced-motion: reduce setzt das Kopfskript kein html.k-bewegung, also greift die Regel nicht. Die Auswahl verbirgt und zeigt die Fotos ohne Übergang. Knöpfe, Statuszeile und Ansage funktionieren unverändert. Dasselbe gilt nach html.k-notaus, im Druck und bei forced-colors (zusätzlicher Block mit animation: none !important). Die vorhandene Regel für Druck und forced-colors in bewegung.css (html.k-bewegung [data-motion] { opacity: 1 !important }) deckt die Deckkraft schon ab. Ohne JavaScript stehen alle 25 Fotos; die Bedienung ist per noscript:hidden verborgen.

## zugang

- Knopfgruppe: div role="group" mit aria-labelledby auf den sichtbaren Satz („Wählen Sie einen Raum. …“).
- Knöpfe: echte button type="button" mit aria-pressed="true|false". Der Name ist der sichtbare Text; Icon und Fugenkreuz sind aria-hidden. Touchziel mindestens 44 px (min-h-11 in wahlKlassen).
- Tastatur: Tab erreicht die Knöpfe nacheinander in DOM-Reihenfolge (Satz, Knöpfe, Fotos). Enter oder Leertaste wählt. Der Fokus bleibt auf dem gedrückten Knopf. Fokusring global 2 px Tinte (in forced-colors Highlight). Kein tabindex.
- Screenreader: Die Statuszeile hat role="status" (höflich). Sie sagt nach jedem Wechsel „Sie sehen 4 Fotos von Duschen.“; beim Laden kündigt sie nichts an. Verborgene Fotos sind per hidden aus dem Barrierebaum; die Liste nennt die richtige Zahl. Jedes Foto hat seinen Alt-Text aus ARBEITEN und eine sichtbare Unterschrift (figcaption).
- Bedeutung nie nur über Farbe: Gedrückt zeigt das Fugenkreuz statt des Raumzeichens, dazu halbfett und Ring. In forced-colors bleiben Form und Gewicht sichtbar. Ränder werden zu CanvasText, Icons nutzen currentColor, die Animation ist aus.
- 200 % Systemschrift: Knöpfe einzeln je Zeile, Fotos einspaltig (Containerstufen in rem), kein seitliches Scrollen.
- Ohne JavaScript: keine toten Knöpfe (noscript:hidden), alle Fotos sichtbar.
- Kontraste: text-tinte und text-tinte-2 auf Kalk oder Fliese, Werte aus K-005.

## budget

Client-Komponente: ja, nur GalerieWahl. Gründe: Zustand der Auswahl, aria-pressed und eine Statusansage, die mitzählt. Eine reine CSS-Radiogruppe kann das Einblenden beim Laden nicht sicher unterdrücken und nichts ansagen.
- JavaScript: GalerieWahl samt den Hilfen aus daten.ts (GRUPPEN, istSichtbar, anzahl, blendetEin, stufen, ansage) etwa 1,5 bis 2 KB gzip. Icon, Fugenkreuz, clsx und stile sind gemeinsame Bausteine. GALERIE mit den Unterschriften wird von der Insel nicht verwendet und fällt beim Bau heraus. anzahl() hat deshalb absichtlich keinen Standardwert GALERIE.
- CSS: etwa 0,3 bis 0,4 KB (ein Keyframe, zwei Regeln).
- SVG: keine neue Zeichnung; Icons aus dem Sprite.
- RSC: 25 Bildfeld-Knoten, so viele wie ohnehin gerenderte Bilder.
- Bilder: lazy; verborgene li laden ihre Bilder erst beim Zeigen. Kein Einfluss auf LCP (Abschnitt 5, spaet).
- INP: Ein Wechsel rendert 25 li neu, die Bildknoten sind dieselben Referenzen (React bricht dort ab).
- CLS: Layoutwechsel nur nach eigener Eingabe, also ausgenommen.
Gesamtbeitrag zum Bewegungsbudget (K-013, 60 KB gzip): unter 3 KB.

## dateien

[
 "src/components/momente/galerie-filter/daten.ts",
 "src/components/momente/galerie-filter/GalerieWahl.tsx",
 "src/components/momente/galerie-filter/GalerieFilter.tsx",
 "_werkstatt/register/galerie-filter.json",
 "test/galerie-filter.test.mjs"
]

## gemeinsam

[
 "src/app/bewegung.css: direkt nach dem Block `verband` (vor dem Kommentar `/* aufklappen – Höhe über grid-template-rows …`) einfügen:\n/* galerie-filter (K-007, /referenzen, E3-GRAF-08) – Galerie „Unsere Arbeiten“ mit Filter nach Raum: Die Auswahl (Knöpfe mit\n   aria-pressed, Insel momente/galerie-filter/GalerieWahl) verbirgt Fotos per hidden; Fotos mit data-galerie-neu blenden in\n   dauer-2 · setzen ein, Stück für Stück in Lesefolge (Staffel, Stufe 0 bis 7 in --galerie-stufe), wegfallende gehen sofort.\n   Nur opacity. Startzustand nur unter html.k-bewegung ohne Notaus; reduziert, ohne JavaScript, im Druck und bei erzwungenen\n   Farben wechseln die Fotos sofort. */\n@keyframes galerie-zeigen {\n  from { opacity: 0; }\n}\nhtml.k-bewegung:not(.k-notaus) [data-motion=\"galerie-filter\"][data-galerie-neu] {\n  animation: galerie-zeigen var(--dauer-2) var(--ease-setzen) calc(var(--staffel) * var(--galerie-stufe, 0)) both;\n}\n@media print, (forced-colors: active) {\n  [data-motion=\"galerie-filter\"] {\n    animation: none !important;\n  }\n}",
 "src/lib/motion/register.ts: in REGISTER direkt nach `verband: { ausloeser: 'interaktion' },` die Zeile `'galerie-filter': { ausloeser: 'interaktion' },` (mit Kommentar `// große Momente v3 (E3-ORCH-02a)`). Kein Beobachter; bewegung.ts fasst sie nicht an.",
 "_werkstatt/register.json: \"galerie-filter\" in `kennungen` und `v3` aufnehmen; `quelle` auf KERN v3.4 heben, im `hinweis` galerie-filter aus der Liste der ausstehenden Momente streichen.",
 "test/bewegung.test.mjs: 'galerie-filter' in KERN_V3 (oder einer neuen Liste GROSSE_MOMENTE) aufnehmen, sonst schlägt „Bewegung 1“ fehl (E3-ORCH-02a).",
 "package.json scripts.test: ` test/galerie-filter.test.mjs` an die Liste der Testdateien anhängen.",
 "src/components/vorlagen/teile/Beleg.tsx (Vorlagen-Schlitz): Abstand des Moments nur, wenn davor etwas steht: `{moment && <div className={inhalt.fotos.length > 0 || inhalt.satz || inhalt.zweierbild ? 'mt-16' : undefined}>{moment}</div>}`. Sonst stehen zwischen H2 und Satz der Galerie 48 + 64 = 112 px.",
 "E3-BAU-07 (/referenzen, src/inhalte/referenzen.ts und page.jsx): `beleg.titel: 'Unsere Arbeiten in Bildern.'`, `beleg.fotos: []`, kein `beleg.satz` (der Satz steht im Moment). `momente={{ beleg: <><GalerieFilter /><div className=\"mt-24\">{/* vorher-nachher aus E3-GRAF-07 mit eigener Überschrift */}</div></> }}`.",
 "_werkstatt/werkzeuge/bewegung.mjs (nach Wahl des Orchestrators): AUSLOESER `'galerie-filter': 'galerie'` mit einem Ablauf wie wahlFolgen. Er klickt `[data-galerie-wahl=\"dusche\"]`, dann `[data-galerie-wahl=\"alle\"]`, je Folge fünf Bilder über 740 ms. Ohne diesen Eintrag meldet `einzelbilder` „keine Animation“, weil die data-motion-Elemente die Fotos sind und keine Knöpfe.",
 "KERN K-007, Zeile galerie-filter (Doku): Auslöser „Auswahl (Knöpfe mit aria-pressed)“, Dauer „dauer-2 Überblendung · setzen, neue Fotos Stück für Stück (Staffel ≤ 8, ≤ 740 ms), wegfallende sofort“, Reduziert „Sofortzustand“.",
 "Wahlfrei, zur Sichtprüfung vor E3-BAU-07: Schaufenster src/app/(bestand)/werkstatt-schaufenster/momente/page.dev.tsx mit `<Abschnitt id=\"unsere-arbeiten\" titel=\"Unsere Arbeiten in Bildern.\" leitachse><GalerieFilter /></Abschnitt>`."
]

## bildbedarf

[
 "Für den Bau keiner: 25 vorhandene Webfassungen aus ARBEITEN, alle 4 : 5, jede Datei einmal (Bad 7, Dusche 4, Balkon und Terrasse 5, Treppe und Eingang 2, So arbeiten wir 7).",
 "Später aus E3-BILD-01 nach bildplaetze.md `/referenzen` (Format 4 : 5): weitere Fotos vor allem für „Treppe und Eingang“ (bisher nur 2) und Vorher-Bilder für „So arbeiten wir“ (laut bildplaetze „Während und Vorher“, z. B. IMG_2522 Eingangspodest vorher). Nach E3-ORCH-02d als neue Einträge in GALERIE (daten.ts) ergänzen; der Test prüft Format, Doppel und Vorhandensein."
]

## pruefung

Tests: test/galerie-filter.test.mjs (Paket schreibt genau so). Ausführen bis zum Eintrag in package.json mit:
node --experimental-strip-types --loader ./test/resolver.mjs --test test/galerie-filter.test.mjs
---
import test from 'node:test';
import assert from 'node:assert/strict';
import { ARBEITEN } from '../src/config/arbeiten.ts';
import { GLOSSAR } from '../src/config/glossar.ts';
import { GALERIE, GRUPPEN, SATZ, STAFFEL_MAX, anzahl, ansage, blendetEin, istSichtbar, stufen } from '../src/components/momente/galerie-filter/daten.ts';

// Großer Moment galerie-filter (KERN v3.4 K-007, E3-GRAF-08): Daten und Logik der Galerie „Unsere Arbeiten“ auf /referenzen.
const FILTER = ['Bad', 'Dusche', 'Balkon und Terrasse', 'Treppe und Eingang', 'So arbeiten wir']; // referenzen.md, Abschnitt 5
const STRICH = /[‒-―]|\s-\s/;
const FACHWOERTER = Object.values(GLOSSAR).flatMap((e) => e.begriffe.map((b) => b.toLowerCase()));

test('Galerie 1: Filter und Satz wörtlich aus dem Seitentext, „Alle Fotos“ zuerst', () => {
  assert.deepEqual(GRUPPEN.map((g) => g.name), ['Alle Fotos', ...FILTER]);
  assert.equal(GRUPPEN[0].id, 'alle');
  assert.equal(SATZ, 'Wählen Sie einen Raum. Dann sehen Sie nur die Fotos aus diesem Raum.');
});

test('Galerie 2: jedes Foto aus ARBEITEN, Format 4 : 5, jede Bilddatei einmal, ohne Einstiegsbild', () => {
  const ids = GALERIE.map((f) => f.bild);
  assert.equal(new Set(ids).size, ids.length, 'Kennung doppelt');
  for (const id of ids) {
    const a = ARBEITEN[id];
    assert.ok(a, `${id} fehlt in ARBEITEN`);
    assert.equal(a.breite * 5, a.hoehe * 4, `${id} ist nicht 4 : 5`);
  }
  const dateien = ids.map((id) => ARBEITEN[id].src);
  assert.equal(new Set(dateien).size, dateien.length, 'Bilddatei doppelt');
  assert.ok(!dateien.includes(ARBEITEN['bad-einstieg'].src), 'Einstiegsbild der Seite steht nicht in der Galerie');
});

test('Galerie 3: jede Gruppe hat Fotos, die Zahlen gehen auf', () => {
  for (const g of GRUPPEN) assert.ok(anzahl(g.id, GALERIE) > 0, `${g.name} ohne Foto`);
  assert.equal(anzahl('alle', GALERIE), GALERIE.length);
  const summe = GRUPPEN.filter((g) => g.id !== 'alle').reduce((s, g) => s + anzahl(g.id, GALERIE), 0);
  assert.equal(summe, GALERIE.length);
});

test('Galerie 4: Unterschriften kurz, ohne Gedankenstrich und ohne Fachwort', () => {
  for (const f of GALERIE) {
    assert.ok(f.unterschrift.length > 0 && f.unterschrift.length <= 80, `${f.bild}: Länge`);
    assert.ok(!STRICH.test(f.unterschrift), `${f.bild}: Strich`);
    const klein = f.unterschrift.toLowerCase();
    for (const w of FACHWOERTER) assert.ok(!klein.includes(w), `${f.bild}: Fachwort „${w}“`);
  }
});

test('Galerie 5: sichtbar und einblenden', () => {
  assert.equal(istSichtbar('bad', 'alle'), true);
  assert.equal(istSichtbar('bad', 'dusche'), false);
  assert.equal(blendetEin('bad', 'alle', null), false, 'beim Laden blendet nichts ein');
  assert.equal(blendetEin('bad', 'bad', 'alle'), true, 'ein Raum legt seine Fotos neu');
  assert.equal(blendetEin('bad', 'alle', 'bad'), false, 'bei „Alle Fotos“ bleiben stehende Fotos ruhig');
  assert.equal(blendetEin('dusche', 'alle', 'bad'), true, 'bei „Alle Fotos“ blenden die vorher verborgenen ein');
  assert.equal(blendetEin('bad', 'dusche', 'bad'), false, 'verborgene Fotos blenden nicht ein');
});

test('Galerie 6: Staffel in Lesefolge, höchstens 8 Stufen', () => {
  assert.ok(stufen(GALERIE, 'alle', null).every((s) => s === null));
  const s = stufen(GALERIE, 'alle', 'treppe-und-eingang').filter((x) => x !== null);
  assert.equal(s.length, GALERIE.length - anzahl('treppe-und-eingang', GALERIE));
  assert.deepEqual(s.slice(0, 8), [0, 1, 2, 3, 4, 5, 6, 7]);
  assert.ok(s.every((x) => x <= STAFFEL_MAX));
  assert.equal(STAFFEL_MAX, 7);
});

test('Galerie 7: Statuszeile', () => {
  assert.equal(ansage('alle', 25), 'Sie sehen alle 25 Fotos.');
  assert.equal(ansage('bad', 7), 'Sie sehen 7 Fotos aus dem Bad.');
  assert.equal(ansage('treppe-und-eingang', 1), 'Sie sehen 1 Foto von Treppe und Eingang.');
  for (const g of GRUPPEN) assert.ok(!STRICH.test(ansage(g.id, 2)));
});
---
Weiter (Bauender):
- npx tsc --noEmit
- npx eslint src/components/momente/galerie-filter
- Werte-Scan: keine Hex-Werte, keine Beliebigwerte in eckigen Klammern, kein style außer --galerie-stufe.
- Schreibregeln der neuen Texte: keine Gedankenstriche (der Test prüft das).

Sichtprüfung (Orchestrator oder Prüfer, im Schaufenster oder nach E3-BAU-07 auf /referenzen):
- m390: 2 Spalten, Knöpfe umgebrochen, Satz direkt unter der H2.
- m390 bei 200 % Schrift: 1 Spalte, ein Knopf je Zeile, kein seitliches Scrollen.
- d1440: 3 Spalten, Treppe aus Rändern am Ende ohne graue Restfelder.
- „Dusche“: 4 Fotos blenden nacheinander ein (bis 740 ms); Status „Sie sehen 4 Fotos von Duschen.“; Fugenkreuz am gedrückten Knopf.
- Danach „Alle Fotos“: nur die 21 dazukommenden blenden ein, die 4 bleiben ruhig.
- Beim Laden blendet nichts.
- prefers-reduced-motion: Wechsel sofort.
- JavaScript aus: alle 25 Fotos, keine Knöpfe, kein Satz.
- Tastatur: Tab, Enter, Leertaste; Fokusring sichtbar.
- Screenreader (VoiceOver oder NVDA): „gedrückt“ und die Statusansage.
- forced-colors: gedrückter Knopf an der Form erkennbar.

Werkzeuge:
- bewegung.mjs --modus register --seite /referenzen: data-motion galerie-filter registriert, sobald register.json ergänzt ist.
- bewegung.mjs --modus reduziert.
- axe.mjs auf /referenzen.

## risiken

[
 "Satz doppelt: Setzt E3-BAU-07 zusätzlich `beleg.satz`, steht „Wählen Sie einen Raum …“ zweimal. Deshalb kein beleg.satz und beleg.fotos: []; das steht in gemeinsam.",
 "Abstand: Ohne die Änderung an Beleg.tsx stehen 112 px zwischen H2 und Galerie. Das ist eine Änderung an der Vorlage, nur durch den Orchestrator.",
 "Dasselbe Foto zweimal auf der Seite: start-galerie-5 (IMG_2525, Außentreppe) ist auch das Nachher-Bild des Reglers ref-nachher. Entweder bewusst so lassen (die Galerie ist die volle Übersicht) oder start-galerie-5 aus GALERIE nehmen; dann hat „Treppe und Eingang“ nur noch 1 Foto. Entscheidung des Orchestrators.",
 "E3-BILD-01 ist noch offen. Die Galerie startet mit 25 vorhandenen Fotos; neue ref-Bilder kommen erst nach E3-ORCH-02d in GALERIE. Sonst bleibt „Treppe und Eingang“ dünn.",
 "Bewusster Unterschied zu einer echten Kreuzblende: Wegfallende Fotos gehen sofort, nur neue blenden ein. Ein Ausblenden mit Verzögerung hieße zwei Layoutsprünge und Zeitgeber.",
 "Bei „Alle Fotos“ → Raum blenden auch die stehenden Fotos des Raums neu ein (sie legen sich neu). Das ist gewollt; der Test hält es fest.",
 "Lädt JavaScript nicht, obwohl der Browser es kann (Ladefehler), bleiben die Knöpfe sichtbar und tun nichts. noscript:hidden greift nur bei scripting: none. Das ist derselbe Stand wie beim Bewertungsfilter; die Fotos stehen trotzdem alle.",
 "Zwei Wechsel innerhalb eines Bildes (praktisch nicht durch Klicks) können das Neustarten der Animation verschlucken. Ergebnis: die Fotos stehen sofort, kein Schaden.",
 "React-Compiler und Hook-Lint: keine Veränderung von Variablen im Render der Komponente. Die Staffel rechnet deshalb die reine Funktion stufen() in daten.ts. Nicht in die Komponente verlegen.",
 "daten.ts darf nur Typ-Importe haben (`import type`), sonst lädt der Node-Test die Datei nicht. anzahl() bekommt keinen Standardwert GALERIE, sonst landen alle Unterschriften im Client-Bündel.",
 "Werkzeuglücke: bewegung.mjs kennt keinen Auslöser für diesen Moment. Einzelbilder brauchen den Eintrag aus gemeinsam, sonst meldet das Werkzeug „keine Animation erfasst“.",
 "Lange Liste mobil: 25 Fotos in 2 Spalten ergeben etwa 13 Reihen. Der Filter ist der Weg zur eigenen Lage (A4); die Bilder laden lazy, verborgene gar nicht.",
 "Sollte jsx-key das Bildfeld im Objekt der map in GalerieFilter.tsx melden: key={f.bild} am Bildfeld ergänzen. Das ist unschädlich und ändert nichts sonst."
]

