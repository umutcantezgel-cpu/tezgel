// Seitenwechsel B-01: Zustandsautomat, rein und ohne Zeitgeber (die Komponente liefert Ereignisse).
// ruhe → legen → bedeckt → (warten mit Laserlinie) → ziehen → ruhe; nach 3 s Warten Abbruch ohne Fliesen.
// Ein zweiter Start während eines Wechsels wird verworfen (Doppelklick).
import type { Richtung } from './raster';

export type Zustand = 'ruhe' | 'legen' | 'bedeckt' | 'warten' | 'ziehen' | 'abbruch';

export type Ereignis =
  | { typ: 'start'; ziel: string; richtung: Richtung }
  /** Zurück und Vor: Boden liegt sofort, die Navigation läuft schon */
  | { typ: 'start-liegend'; richtung: Richtung }
  | { typ: 'gelegt' }
  | { typ: 'bereit' }
  | { typ: 'zeit-laser' }
  | { typ: 'zeit-ende' }
  | { typ: 'gezogen' }
  | { typ: 'ausgeblendet' };

export type Aktion = 'lege' | 'liege' | 'navigiere' | 'zeige-laser' | 'verberge-laser' | 'ziehe' | 'blende-aus' | 'freigeben';

export interface Lage {
  zustand: Zustand;
  ziel: string | null;
  richtung: Richtung;
  /** Seite meldete sich bereit, bevor der Boden geschlossen war */
  bereitFrueh: boolean;
}

export const RUHE: Lage = { zustand: 'ruhe', ziel: null, richtung: 'vor', bereitFrueh: false };

/** Laserlinie erst nach kurzer Wartezeit, damit sie bei schnellen Seiten nicht aufblitzt. */
export const LASER_NACH = 150;
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
        if (lage.bereitFrueh) return { lage: { ...lage, zustand: 'ziehen' }, aktionen: ['ziehe'] };
        return { lage: { ...lage, zustand: 'bedeckt' }, aktionen: lage.ziel ? ['navigiere'] : [] };
      }
      return bleib;
    case 'bedeckt':
      if (e.typ === 'bereit') return { lage: { ...lage, zustand: 'ziehen' }, aktionen: ['ziehe'] };
      if (e.typ === 'zeit-laser') return { lage: { ...lage, zustand: 'warten' }, aktionen: ['zeige-laser'] };
      if (e.typ === 'zeit-ende') return { lage: { ...lage, zustand: 'abbruch' }, aktionen: ['blende-aus'] };
      return bleib;
    case 'warten':
      if (e.typ === 'bereit') return { lage: { ...lage, zustand: 'ziehen' }, aktionen: ['verberge-laser', 'ziehe'] };
      if (e.typ === 'zeit-ende') return { lage: { ...lage, zustand: 'abbruch' }, aktionen: ['verberge-laser', 'blende-aus'] };
      return bleib;
    case 'ziehen':
      if (e.typ === 'gezogen') return { lage: RUHE, aktionen: ['freigeben'] };
      return bleib;
    case 'abbruch':
      if (e.typ === 'ausgeblendet') return { lage: RUHE, aktionen: ['freigeben'] };
      return bleib;
  }
}
