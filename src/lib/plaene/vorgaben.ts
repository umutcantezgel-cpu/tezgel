// Planvorgaben je Leistung und Thema (KERN K-008). Draufsichten ohne echte Maße.
import type { Planvorgabe } from './typen';

export const PLAENE = {
  bad: {
    name: 'bad', beschreibung: 'Verlegeplan eines Bades: Achse mittig, gleich breite Passstücke, Wanne und Duschrinne eingezeichnet.',
    raum: { b: 30, h: 20 }, platte: { b: 6, h: 3 }, verband: 'halb', achse: 'lot',
    elemente: [{ art: 'wanne', x: 1.5, y: 1.5, b: 11, h: 6 }, { art: 'rinne', x: 19, y: 18, laenge: 9, richtung: 'waagrecht' }, { art: 'tuer', seite: 'unten', von: 4, breite: 6 }],
  },
  wohnen: {
    name: 'wohnen', beschreibung: 'Verlegeplan eines Wohnbereichs mit Großformat im Halbverband, Achse mittig.',
    raum: { b: 36, h: 20 }, platte: { b: 8, h: 4 }, verband: 'halb', achse: 'kreuz',
    elemente: [{ art: 'tuer', seite: 'links', von: 6, breite: 6 }],
  },
  aussen: {
    name: 'aussen', beschreibung: 'Verlegeplan einer Terrasse mit Platten auf Stelzlagern und Gefälle zur Kante.',
    raum: { b: 32, h: 18 }, platte: { b: 6, h: 6 }, verband: 'kreuz', achse: 'kreuz',
    elemente: [{ art: 'stelzlager' }, { art: 'gefaelle', x: 16, y: 5, laenge: 8, richtung: 'unten' }],
  },
  untergrund: {
    name: 'untergrund', beschreibung: 'Verlegeplan mit umlaufendem Dichtband und Abdichtung vor dem Verlegen.',
    raum: { b: 30, h: 20 }, platte: { b: 5, h: 5 }, verband: 'kreuz', achse: 'kreuz',
    elemente: [{ art: 'dichtband' }, { art: 'rinne', x: 10.5, y: 17.5, laenge: 9, richtung: 'waagrecht' }],
  },
  grossformat: {
    name: 'grossformat', beschreibung: 'Großformat-Platten mit wenigen Fugen, Achse mittig auf der Fuge.',
    raum: { b: 36, h: 18 }, platte: { b: 12, h: 6 }, verband: 'drittel', achse: 'lot',
  },
  treppe: {
    name: 'treppe', beschreibung: 'Draufsicht einer Treppe mit gleich breiten Stufenbelägen.',
    raum: { b: 16, h: 24 }, platte: { b: 4, h: 3 }, verband: 'halb', achse: 'lot',
    elemente: [{ art: 'stufen', x: 0, y: 0, b: 16, h: 24, anzahl: 8 }],
  },
  balkon: {
    name: 'balkon', beschreibung: 'Balkon mit Gefälle zur Kante und Entwässerungsrinne.',
    raum: { b: 32, h: 14 }, platte: { b: 6, h: 6 }, verband: 'kreuz', achse: 'lot',
    elemente: [{ art: 'gefaelle', x: 16, y: 3, laenge: 7, richtung: 'unten' }, { art: 'rinne', x: 1, y: 12.5, laenge: 30, richtung: 'waagrecht' }],
  },
  naturstein: {
    name: 'naturstein', beschreibung: 'Naturstein im Drittelverband, Achse mittig.',
    raum: { b: 30, h: 20 }, platte: { b: 9, h: 4 }, verband: 'drittel', achse: 'kreuz',
  },
  reparatur: {
    name: 'reparatur', beschreibung: 'Verlegeplan mit einer markierten Fliese, die ersetzt wird.',
    raum: { b: 30, h: 20 }, platte: { b: 5, h: 5 }, verband: 'kreuz', achse: 'kreuz',
    elemente: [{ art: 'fehlstelle', spalte: 3, zeile: 1 }],
  },
  fussbodenheizung: {
    name: 'fussbodenheizung', beschreibung: 'Fliesen auf Fußbodenheizung: Heizschleifen unter dem Belag.',
    raum: { b: 30, h: 20 }, platte: { b: 6, h: 6 }, verband: 'kreuz', achse: 'kreuz',
    elemente: [{ art: 'heizung', x: 2, y: 2, b: 26, h: 16, schleifen: 5 }],
  },
  fugen: {
    name: 'fugen', beschreibung: 'Fugenbild im Kreuzverband – jede Fuge durchgehend.',
    raum: { b: 30, h: 20 }, platte: { b: 4, h: 4 }, verband: 'kreuz', achse: 'kreuz',
  },
  abdichtung: {
    name: 'abdichtung', beschreibung: 'Bodengleiche Dusche: Abdichtung mit Dichtband, Gefälle zur Rinne.',
    raum: { b: 24, h: 24 }, platte: { b: 6, h: 6 }, verband: 'kreuz', achse: 'lot',
    elemente: [{ art: 'dichtband' }, { art: 'gefaelle', x: 12, y: 6, laenge: 9, richtung: 'unten' }, { art: 'rinne', x: 3, y: 21, laenge: 18, richtung: 'waagrecht' }],
  },
} satisfies Record<string, Planvorgabe>;

export type PlanName = keyof typeof PLAENE;
