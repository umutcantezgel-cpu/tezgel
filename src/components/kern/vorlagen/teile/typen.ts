// Gemeinsame Typen und Klassen der Vorlagen Fachseite, Übersicht, Liste, Artikel und Detail (P4-10a, KERN v1.2).
// Vorher doppelt in `fachseite/typen.ts` und `uebersicht/Abschnitt.tsx` (P4-01, P4-02).
// Die Vorlagen enthalten keinen Seitentext: Jeder Wortlaut kommt als Prop von der Seite (wörtlich aus dem Bestand).
import { Fragment, isValidElement, type ReactNode } from 'react';
import type { KnopfArt } from '@/components/kern/basis/Knopf';
import type { IconName } from '@/components/kern/icons/geometrie';

/** Seitenart nach GRUNDMENGE.json (`seitenart`): Erzählseite oder Arbeitsseite (K-002, K-011). */
export type Seitenart = 'erzaehl' | 'arbeit';

/** Fläche eines Abschnitts: Kalk (Seitengrund, Standard) oder Fliese (weiß). */
export type Flaeche = 'kalk' | 'fliese';

/** Senkrechter Abstand eines Abschnitts (K-007). weit = 96/128 px (Erzählseite) · normal = 64/96 px · eng = 48/64 px
 *  (Arbeitsseite) · keine = ohne Abstand. */
export type Dichte = 'weit' | 'normal' | 'eng' | 'keine';

/** Überschriftenebene innerhalb eines Abschnitts (die Seite hält die Gliederung des Bestands). */
export type Ebene = 'h2' | 'h3' | 'h4';

/** Ein Weg als Knopf oder Textlink. Wortlaut, Ziel und zugänglicher Name wörtlich aus dem Bestand. */
export type KnopfAngabe = {
  /** sichtbare Beschriftung (wörtlich) */
  text: ReactNode;
  href: string;
  /** haupt (Tinte) · neben (Rahmen) · text (Unterstreichung). Standard: haupt beim ersten Knopf einer Reihe, sonst neben. */
  art?: KnopfArt;
  /** Zeichen aus der Icon-Familie: `pfeil` steht hinter der Beschriftung, alle anderen davor. Dekorativ. */
  zeichen?: IconName;
  /** zugänglicher Name, falls der Bestand einen eigenen trägt (`aria-label`) */
  ariaLabel?: string;
  /** öffnet in neuem Fenster (WhatsApp, Google) – setzt target und rel wie im Bestand */
  extern?: boolean;
  /** Beschriftung in Mono (Telefonnummer, K-005) */
  mono?: boolean;
};

/** Alter Name aus P4-02 (`uebersicht/Abschnitt`), gleiche Angabe. */
export type Aktion = KnopfAngabe;

/** Verweis auf eine andere Seite (Querverweise, Verzeichnis, Weiterlesen, Feld-Fuß). Wortlaut wörtlich. */
export type Verweis = {
  titel: ReactNode;
  href: string;
  /** Satz unter dem Titel (Bestand: Beschreibung der Zielseite) */
  beschreibung?: ReactNode;
  /** Kopfzeile links (z. B. Region) */
  etikett?: ReactNode;
  /** Maß in Mono (z. B. „3 Seiten“, „ca. 12 km ab Wetzlar“) */
  zusatz?: ReactNode;
  /** Fußzeile mit Pfeil (z. B. „Fliesenleger in Wetzlar“) */
  fuss?: ReactNode;
  ariaLabel?: string;
};

/** Innenfläche der Felder: immer die Gegenfläche des Abschnitts, damit die Felder sich abheben. */
export function feldFlaeche(flaeche: Flaeche): Flaeche {
  return flaeche === 'fliese' ? 'kalk' : 'fliese';
}

/** Netz für 400 % Zoom (WCAG 1.4.10): ein Wort, das trotz passender Stufe breiter ist als seine Spalte, bricht um, statt
 *  die Seite zu verbreitern. Kein Normalfall – die Stufe kommt aus `stufeNachWort`, die Spalten aus Container-Abfragen. */
export const UMBRUCH = 'min-w-0 wrap-break-word hyphens-auto';

const INLINE = new Set(['a', 'abbr', 'b', 'br', 'code', 'em', 'i', 'kbd', 'mark', 'q', 's', 'small', 'span', 'strong', 'sub', 'sup', 'time', 'u', 'wbr']);

/**
 * Text oder Absätze: Ist der Inhalt Fließtext (Zeichenkette, Zahl oder ein Fragment mit Text und Textlinks), setzt die Vorlage
 * ihn in einen Absatz; Absätze, Listen und Bausteine (Komponenten) bleiben, wie die Seite sie setzt. Vorher (P4-01) zählte nur
 * eine Zeichenkette als Text – ein Satz aus Text und `<Textlink>` zerfiel in einer Flex-Spalte in einzelne Zeilen.
 */
export function istText(inhalt: ReactNode): boolean {
  if (inhalt === null || inhalt === undefined || typeof inhalt === 'boolean') return false;
  if (typeof inhalt === 'string') return inhalt.trim().length > 0;
  if (typeof inhalt === 'number' || typeof inhalt === 'bigint') return true;
  if (Array.isArray(inhalt)) return inhalt.some((kind) => istText(kind as ReactNode));
  if (isValidElement<{ children?: ReactNode }>(inhalt)) {
    if (inhalt.type === Fragment) return istText(inhalt.props.children);
    return typeof inhalt.type === 'string' && INLINE.has(inhalt.type);
  }
  return false;
}
