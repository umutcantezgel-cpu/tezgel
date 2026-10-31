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
  /** Leistungsseite zu den Fotos dieser Gruppe (Link auf der Glasfläche, K-016, E-047); ohne: nur der Name */
  href?: string;
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
  { id: 'bad', name: 'Bad', icon: 'bad', zusatz: 'aus dem Bad', href: '/bad/badsanierung' },
  { id: 'dusche', name: 'Dusche', icon: 'dusche-rinne', zusatz: 'von Duschen', href: '/bad/barrierefreies-bad' },
  { id: 'balkon-und-terrasse', name: 'Balkon und Terrasse', icon: 'balkon', zusatz: 'von Balkon und Terrasse', href: '/balkon-terrasse' },
  { id: 'treppe-und-eingang', name: 'Treppe und Eingang', icon: 'treppe', zusatz: 'von Treppe und Eingang', href: '/treppen' },
  { id: 'so-arbeiten-wir', name: 'So arbeiten wir', icon: 'reparatur', zusatz: 'von unserer Arbeit auf der Baustelle', href: '/ueber-uns' },
];

// Browserprüfung E4-W1, Runde 2: fertige Räume zuerst (abwechselnd nach Gruppe), die Fotos von der Baustelle als eigener
// Block am Ende, damit „Alle Fotos“ nicht Baustelle und fertige Räume mischt; 24 Fotos, damit Zwei- und Dreierraster
// ohne Loch enden (Gäste-WC dazu). Runde 3: die Dusche mit Sitzbank zeigt noch Rohranschlüsse ohne Armatur und steht
// deshalb als erstes Foto im Block von der Baustelle. UM-E4-SICHT-FIX M-A2: start-dusche ist der Einstieg von /referenzen und
// verlässt die Galerie; das bisherige Einstiegsbild tritt ans Ende der fertigen Räume (Tausch, weiter 24 Fotos). An seine Stelle
// rückt die helle Dusche mit Sitzbank (gleiche Gruppe): Die erste Reihe beginnt wie vorher mit einer Dusche statt mit drei
// dunklen Motiven (Nacharbeit SF-A; die Reihenfolge im Ganzen legt M-C3).
export const GALERIE: GalerieFoto[] = [
  { bild: 'start-galerie-1', gruppe: 'dusche', unterschrift: 'Dusche ohne Stufe mit Sitzbank und Mosaik' },
  { bild: 'start-beleg-bad', gruppe: 'bad', unterschrift: 'Badewanne mit dunklen Mosaikfliesen' },
  { bild: 'start-galerie-3', gruppe: 'balkon-und-terrasse', unterschrift: 'Balkon mit dunklen Fliesen, jede Reihe um ein Stück versetzt' },
  { bild: 'start-beleg-treppe', gruppe: 'treppe-und-eingang', unterschrift: 'Außentreppe mit anthrazitfarbenen Fliesen und Handlauf' },
  { bild: 'bad-beleg-3', gruppe: 'bad', unterschrift: 'Doppelwaschtisch aus dunklem Holz mit goldenem Spiegel' },
  { bild: 'start-galerie-4', gruppe: 'balkon-und-terrasse', unterschrift: 'Terrasse mit großen hellgrauen Platten' },
  { bild: 'kontakt-eingang', gruppe: 'treppe-und-eingang', unterschrift: 'Stufen am Eingang mit beigen Fliesen und hellen Kanten' },
  { bild: 'badsanierung-einstieg', gruppe: 'bad', unterschrift: 'Badewanne mit blauen und beigen Ornamentfliesen' },
  { bild: 'balkon-beleg-2', gruppe: 'balkon-und-terrasse', unterschrift: 'Balkon mit rosébraunen Fliesen und Geländer' },
  { bild: 'bad-beleg-4', gruppe: 'dusche', unterschrift: 'Dusche mit Mosaikstreifen an der Wand' },
  { bild: 'bad-beleg-1', gruppe: 'bad', unterschrift: 'Badewanne mit Lichtlinie und gemustertem Boden' },
  { bild: 'balkon-beleg-3', gruppe: 'balkon-und-terrasse', unterschrift: 'Terrasse in Erdtönen mit einem Gitter für das Regenwasser' },
  { bild: 'ort-gaeste-wc', gruppe: 'bad', unterschrift: 'Gäste-WC mit weißen Metrofliesen' },
  { bild: 'balkon-beleg-aluprofil', gruppe: 'balkon-und-terrasse', unterschrift: 'Graue Terrassenplatten mit heller Kante aus Metall' },
  { bild: 'bad-beleg-2', gruppe: 'bad', unterschrift: 'Bad im Landhausstil mit Wanne und Holzregal' },
  { bild: 'referenzen-einstieg', gruppe: 'bad', unterschrift: 'Bad in Marmoroptik mit Regendusche' },
  { bild: 'bereich-dusche-streifen-sitzbank', gruppe: 'so-arbeiten-wir', unterschrift: 'Dusche fertig gefliest, die Armaturen kommen noch' },
  { bild: 'entstehung-dusche-2', gruppe: 'so-arbeiten-wir', unterschrift: 'Die Fliesen sind schräg zum Ablauf geschnitten, so läuft das Wasser gut ab' },
  { bild: 'sanierung-weg-1', gruppe: 'so-arbeiten-wir', unterschrift: 'Bad während der Arbeit, die Wand ist halb gefliest' },
  { bild: 'start-galerie-6', gruppe: 'so-arbeiten-wir', unterschrift: 'Balkonboden vor dem Verlegen: ein blaues Band dichtet die Ränder ab' },
  { bild: 'entstehung-dusche-1', gruppe: 'so-arbeiten-wir', unterschrift: 'Kleine Klemmen bringen große Fliesen genau auf eine Höhe' },
  { bild: 'sanierung-weg-2', gruppe: 'so-arbeiten-wir', unterschrift: 'Bad während der Arbeit, die Decke ist noch offen' },
  { bild: 'balkon-stelzlager', gruppe: 'so-arbeiten-wir', unterschrift: 'Große Platten liegen auf kleinen Füßen, darunter läuft Regen ab' },
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
