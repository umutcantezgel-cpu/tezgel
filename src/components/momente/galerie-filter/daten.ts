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
