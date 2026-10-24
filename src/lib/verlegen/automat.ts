// Seitenwechsel B-01: Zustandsautomat, rein und ohne Zeitgeber (die Komponente liefert Ereignisse).
// ruhe → legen → bedeckt → (warten mit Laserlinie) → abnehmen → ruhe; nach 3 s Warten Abbruch ohne Fliesen (E-043:
// die Fliesen werden einzeln abgenommen statt reihenweise abgezogen).
// Ein zweiter Start während eines Wechsels wird verworfen (Doppelklick).
import type { Richtung } from './raster';

export type Zustand = 'ruhe' | 'legen' | 'bedeckt' | 'warten' | 'abnehmen' | 'abbruch';

export type Ereignis =
  | { typ: 'start'; ziel: string; richtung: Richtung }
  /** Zurück und Vor: Boden liegt sofort, die Navigation läuft schon */
  | { typ: 'start-liegend'; richtung: Richtung }
  | { typ: 'gelegt' }
  | { typ: 'bereit' }
  | { typ: 'zeit-laser' }
  | { typ: 'zeit-ende' }
  | { typ: 'abgenommen' }
  | { typ: 'ausgeblendet' };

export type Aktion = 'lege' | 'liege' | 'navigiere' | 'zeige-laser' | 'verberge-laser' | 'nimm-ab' | 'blende-aus' | 'freigeben';

export interface Lage {
  zustand: Zustand;
  ziel: string | null;
  richtung: Richtung;
  /** Seite meldete sich bereit, bevor der Boden geschlossen war */
  bereitFrueh: boolean;
}

export const RUHE: Lage = { zustand: 'ruhe', ziel: null, richtung: 'vor', bereitFrueh: false };

/** Laserlinie, sobald der Boden liegt: Sie zeigt das Warten, bis das Abnehmen sichtbar läuft (die neue Seite wird unter dem
 *  Boden erst gerastert; ohne Linie lag der Boden 0,4 bis 0,7 s still, Sichtabnahme E2, Befund 1; E-036). Gegen Aufblitzen
 *  blendet die Komponente sie über dauer-1 ein und aus. */
export const LASER_NACH = 0;
/** Höchste Wartezeit unter dem Boden (Auftrag Abschnitt 9). */
export const WARTEN_HOECHSTENS = 3000;

export function schritt(lage: Lage, e: Ereignis): { lage: Lage; aktionen: Aktion[] } {
  const bleib = { lage, aktionen: [] as Aktion[] };
  switch (lage.zustand) {
    case 'ruhe':
      if (e.typ === 'start') {
        return { lage: { zustand: 'legen', ziel: e.ziel, richtung: e.richtung, bereitFrueh: false }, aktionen: ['lege'] };
      }
      if (e.typ === 'start-liegend') {
        return { lage: { zustand: 'bedeckt', ziel: null, richtung: e.richtung, bereitFrueh: false }, aktionen: ['liege'] };
      }
      return bleib;
    case 'legen':
      if (e.typ === 'bereit') return { lage: { ...lage, bereitFrueh: true }, aktionen: [] };
      if (e.typ === 'gelegt') {
        if (lage.bereitFrueh) return { lage: { ...lage, zustand: 'abnehmen' }, aktionen: ['nimm-ab'] };
        return { lage: { ...lage, zustand: 'bedeckt' }, aktionen: lage.ziel ? ['navigiere'] : [] };
      }
      return bleib;
    case 'bedeckt':
      if (e.typ === 'bereit') return { lage: { ...lage, zustand: 'abnehmen' }, aktionen: ['nimm-ab'] };
      if (e.typ === 'zeit-laser') return { lage: { ...lage, zustand: 'warten' }, aktionen: ['zeige-laser'] };
      if (e.typ === 'zeit-ende') return { lage: { ...lage, zustand: 'abbruch' }, aktionen: ['blende-aus'] };
      return bleib;
    case 'warten':
      if (e.typ === 'bereit') return { lage: { ...lage, zustand: 'abnehmen' }, aktionen: ['verberge-laser', 'nimm-ab'] };
      if (e.typ === 'zeit-ende') return { lage: { ...lage, zustand: 'abbruch' }, aktionen: ['verberge-laser', 'blende-aus'] };
      return bleib;
    case 'abnehmen':
      if (e.typ === 'abgenommen') return { lage: RUHE, aktionen: ['freigeben'] };
      return bleib;
    case 'abbruch':
      if (e.typ === 'ausgeblendet') return { lage: RUHE, aktionen: ['freigeben'] };
      return bleib;
  }
}
