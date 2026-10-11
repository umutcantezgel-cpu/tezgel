// Gemeinsame Typen und Klassen der Vorlage Fachseite (P4-01, KERN v1.2).
// Die Vorlage enthält keinen Seitentext: Jeder Wortlaut kommt als Prop von der Seite (wörtlich aus dem Bestand).
// Nur Kern-Tokens; Tailwind liest die Klassen als wörtliche Zeichenketten aus diesem Ordner (@source ../components/kern).
import type { ReactNode } from 'react';
import type { KnopfArt } from '@/components/kern/basis/Knopf';
import type { IconName } from '@/components/kern/icons/geometrie';

/** Fläche eines Abschnitts: Kalk (Seitengrund, Standard) oder Fliese (weiß, mit Fugen oben und unten). */
export type Flaeche = 'kalk' | 'fliese';

/** Senkrechter Abstand eines Abschnitts (K-007: Erzählseite --k-s-9/-10). weit = 96/128 px · normal = 64/96 px · eng = 48/64 px. */
export type Dichte = 'weit' | 'normal' | 'eng';

/** Ein Knopf als Angabe der Seite. Wortlaut, Ziel und zugänglicher Name wörtlich aus dem Bestand. */
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

/** Innenfläche der Felder: immer die Gegenfläche des Abschnitts, damit die Felder sich abheben. */
export function feldFlaeche(flaeche: Flaeche): 'fliese' | 'kalk' {
  return flaeche === 'fliese' ? 'kalk' : 'fliese';
}

/** Überschriftenebene innerhalb eines Abschnitts (die Seite hält die Gliederung des Bestands). */
export type Ebene = 'h2' | 'h3' | 'h4';

/** Lange Einzelwörter (Komposita, Mono) brechen in schmalen Zellen um statt die Seite zu verbreitern (Lehre 6). */
export const UMBRUCH = 'min-w-0 wrap-break-word hyphens-auto';

/** Text oder Absätze: Zeichenketten werden zu einem Absatz, alles andere bleibt, wie die Seite es setzt. */
export function istText(inhalt: ReactNode): inhalt is string {
  return typeof inhalt === 'string';
}
