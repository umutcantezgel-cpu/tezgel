// Planvorgaben für den Verlegeplan (KERN K-008): gezeichnete Draufsichten je Leistung/Thema.
// Maße in Rastereinheiten (keine echten Maße – Bemaßung zeigt nur „=“, Leitplanke Wahrheit).

export type Verband = 'kreuz' | 'halb' | 'drittel';
export type Achse = 'lot' | 'waage' | 'kreuz';

export type Planelement =
  | { art: 'wanne'; x: number; y: number; b: number; h: number }
  | { art: 'rinne'; x: number; y: number; laenge: number; richtung: 'waagrecht' | 'senkrecht' }
  | { art: 'gefaelle'; x: number; y: number; laenge: number; richtung: 'links' | 'rechts' | 'oben' | 'unten' }
  | { art: 'tuer'; seite: 'unten' | 'oben' | 'links' | 'rechts'; von: number; breite: number }
  | { art: 'stufen'; x: number; y: number; b: number; h: number; anzahl: number }
  | { art: 'heizung'; x: number; y: number; b: number; h: number; schleifen: number }
  | { art: 'fehlstelle'; spalte: number; zeile: number }
  | { art: 'dichtband' }
  | { art: 'stelzlager' };

export interface Planvorgabe {
  /** kurze Kennung, z. B. „bad“ */
  name: string;
  /** Beschreibung für Screenreader, wenn der Plan bedeutungstragend eingesetzt wird */
  beschreibung: string;
  raum: { b: number; h: number };
  platte: { b: number; h: number };
  verband: Verband;
  achse: Achse;
  elemente?: Planelement[];
}
