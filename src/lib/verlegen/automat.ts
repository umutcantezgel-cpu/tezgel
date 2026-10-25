// Seitenwechsel B-01: Zustandsautomat, rein und ohne Zeitgeber (die Komponente liefert Ereignisse).
// ruhe → legen → bedeckt → (warten mit Wartelinie) → abnehmen → ruhe; nach 3 s Warten Abbruch ohne Fliesen (E-043:
// die Fliesen werden einzeln abgenommen statt reihenweise abgezogen).
// Ein zweiter Start während eines Wechsels wird verworfen (Doppelklick). Navigiert wird erst, wenn der Boden liegt: Ein
// „bereit“ während des Legens kann nur von einem früheren Wechsel stammen und wird verworfen (Prüfung E-043).
// Logo auf der Wand (v3, E-047): Sobald der Boden liegt, klatscht das Logo auf (zeige-logo). Nach einem Klick muss es danach
// eine Mindestzeit stehen (Halt, die Komponente meldet „logo-gestanden“); ein „bereit“ in dieser Zeit wird gemerkt und erst
// mit dem Ende des Halts eingelöst. Die Wartelinie erscheint erst, wenn der Halt vorbei ist und die Seite noch fehlt (das
// stehende Logo ist kein Warten). Zurück und Vor haben keine Mindestzeit, ihr Halt dauert nur, bis das Aufklatschen zu Ende
// ist (die Komponente wählt die Dauer nach dem Ziel; sonst verblasste das Logo nach 0,2 s halb aufgeklatscht, Gegenprüfung
// E3-B01, Befund 1); eine neue Navigation, während der Boden liegt („neuer-auftrag“), beendet den Halt und verwirft ein
// gemerktes „bereit“ (es gehörte zur alten Navigation).
import type { Richtung } from './raster';

export type Zustand = 'ruhe' | 'legen' | 'bedeckt' | 'warten' | 'abnehmen' | 'abbruch';

/** Logo-Halt: aus · steht (Mindestzeit läuft) · bereit (Mindestzeit läuft, die neue Seite ist schon da). Nur in bedeckt ≠ aus. */
export type Halt = 'aus' | 'steht' | 'bereit';

export type Ereignis =
  /** ziel: Adresse für router.push; '' = Wechsel aus dem Verlauf (das angehaltene popstate wird nachgereicht) */
  | { typ: 'start'; ziel: string; richtung: Richtung }
  /** Zurück und Vor: Boden liegt sofort, die Navigation läuft schon */
  | { typ: 'start-liegend'; richtung: Richtung }
  /** Zurück oder Vor im Browser, während der Boden noch gelegt wird: statt des Ziels wird das popstate nachgereicht */
  | { typ: 'umkehr' }
  | { typ: 'gelegt' }
  | { typ: 'bereit' }
  /** Das Logo hat nach dem Aufklatschen seine Mindestzeit gestanden (aus dem Verlauf: ist fertig aufgeklatscht). */
  | { typ: 'logo-gestanden' }
  /** Zurück oder Vor, während der Boden liegt (bedeckt, warten): Next übernimmt, eine neue Navigation läuft. */
  | { typ: 'neuer-auftrag' }
  | { typ: 'zeit-laser' }
  | { typ: 'zeit-ende' }
  | { typ: 'abgenommen' }
  | { typ: 'ausgeblendet' };

export type Aktion =
  | 'lege'
  | 'liege'
  | 'zeige-logo'
  | 'halte-logo'
  | 'navigiere'
  | 'reiche-nach'
  | 'zeige-laser'
  | 'verberge-laser'
  | 'nimm-ab'
  | 'blende-aus'
  | 'freigeben';

export interface Lage {
  zustand: Zustand;
  /** null: die Navigation läuft schon (liegend); '' : popstate nachreichen; sonst Adresse für router.push */
  ziel: string | null;
  richtung: Richtung;
  halt: Halt;
}

export const RUHE: Lage = { zustand: 'ruhe', ziel: null, richtung: 'vor', halt: 'aus' };

/** Wartelinie, sobald der Boden liegt: Sie zeigt das Warten, bis das Abnehmen sichtbar läuft (die neue Seite wird unter dem
 *  Boden erst gerastert; ohne Linie lag der Boden 0,4 bis 0,7 s still, Sichtabnahme E2, Befund 1; E-036). Gegen Aufblitzen
 *  blendet die Komponente sie über dauer-1 ein und aus. Nach einem Klick steht zuerst das Logo (Halt); die Linie folgt erst,
 *  wenn danach die Seite noch fehlt. */
export const LASER_NACH = 0;
/** Höchste Wartezeit unter dem Boden (Auftrag Abschnitt 9). */
export const WARTEN_HOECHSTENS = 3000;

/** Aktionen, sobald der Boden liegt: das Logo klatscht auf; dann navigieren, das angehaltene popstate nachreichen oder
 *  (liegend) nichts; danach hält das Logo (halte-logo): nach einem Klick (Ziel ist eine Adresse) eine Mindestzeit, aus dem
 *  Verlauf (Ziel leer) bis zum Ende des Aufklatschens. */
function wennGelegt(lage: Lage): Aktion[] {
  if (lage.ziel === null) return ['zeige-logo'];
  return lage.ziel ? ['zeige-logo', 'navigiere', 'halte-logo'] : ['zeige-logo', 'reiche-nach', 'halte-logo'];
}

export function schritt(lage: Lage, e: Ereignis): { lage: Lage; aktionen: Aktion[] } {
  const bleib = { lage, aktionen: [] as Aktion[] };
  switch (lage.zustand) {
    case 'ruhe':
      if (e.typ === 'start') {
        return { lage: { zustand: 'legen', ziel: e.ziel, richtung: e.richtung, halt: 'aus' }, aktionen: ['lege'] };
      }
      if (e.typ === 'start-liegend') {
        return { lage: { zustand: 'bedeckt', ziel: null, richtung: e.richtung, halt: 'aus' }, aktionen: ['liege'] };
      }
      return bleib;
    case 'legen':
      if (e.typ === 'umkehr') return { lage: { ...lage, ziel: '' }, aktionen: [] };
      if (e.typ === 'gelegt') {
        return { lage: { ...lage, zustand: 'bedeckt', halt: lage.ziel !== null ? 'steht' : 'aus' }, aktionen: wennGelegt(lage) };
      }
      return bleib;
    case 'bedeckt':
      if (e.typ === 'bereit') {
        if (lage.halt !== 'aus') return { lage: { ...lage, halt: 'bereit' }, aktionen: [] };
        return { lage: { ...lage, zustand: 'abnehmen' }, aktionen: ['nimm-ab'] };
      }
      if (e.typ === 'logo-gestanden') {
        if (lage.halt === 'bereit') return { lage: { ...lage, zustand: 'abnehmen', halt: 'aus' }, aktionen: ['nimm-ab'] };
        if (lage.halt === 'steht') return { lage: { ...lage, zustand: 'warten', halt: 'aus' }, aktionen: ['zeige-laser'] };
        return bleib;
      }
      if (e.typ === 'neuer-auftrag') {
        if (lage.halt === 'aus') return bleib;
        return { lage: { ...lage, zustand: 'warten', halt: 'aus' }, aktionen: ['zeige-laser'] };
      }
      if (e.typ === 'zeit-laser') {
        if (lage.halt !== 'aus') return bleib;
        return { lage: { ...lage, zustand: 'warten' }, aktionen: ['zeige-laser'] };
      }
      if (e.typ === 'zeit-ende') return { lage: { ...lage, zustand: 'abbruch', halt: 'aus' }, aktionen: ['blende-aus'] };
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
