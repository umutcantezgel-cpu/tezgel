// Reine Logik des Reglers vorher-nachher (KERN v3 K-007, E3-GRAF-07): Teilung in Prozent der Bühnenbreite von links.
// 0 = ganz nachher (Lot am linken Rand), 100 = ganz vorher (Lot am rechten Rand). Test: test/vorher-nachher.test.mjs.
export const START = 50;
export const SCHRITT_TASTE = 5;

export function begrenze(wert: number): number {
  if (!Number.isFinite(wert)) return START;
  return Math.min(100, Math.max(0, Math.round(wert)));
}

export function wertAusZeiger(x: number, links: number, breite: number): number {
  if (!(breite > 0)) return START;
  return begrenze(((x - links) / breite) * 100);
}

export function schrittFuerTaste(taste: string): number {
  if (taste === 'ArrowLeft' || taste === 'ArrowDown') return -SCHRITT_TASTE;
  if (taste === 'ArrowRight' || taste === 'ArrowUp') return SCHRITT_TASTE;
  return 0;
}

export function wertText(wert: number): string {
  const v = begrenze(wert);
  return `${v} Prozent vorher, ${100 - v} Prozent nachher`;
}
