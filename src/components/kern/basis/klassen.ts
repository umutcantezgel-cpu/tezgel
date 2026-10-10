// Gemeinsame Klassen der Kern-Grundbausteine (KERN v1.2, K-006 Fokus, K-009 Hover nur bei feinem Zeiger).
// Nur Kern-Tokens; Tailwind liest die Klassen als wörtliche Zeichenketten aus diesem Ordner.

/** Fläche, auf der ein Baustein steht: Kalk/Fliese (hell) oder Tinte (Fuß, Schriftfeld-Kopf). */
export type Grund = 'hell' | 'tinte';

/** Klassen zusammenfügen; falsche Werte fallen weg. */
export function verbinde(...teile: Array<string | false | null | undefined>): string {
  return teile.filter(Boolean).join(' ');
}

// K-006: Fokus 2 px Tinte, 2 px Abstand; auf Tinte-Flächen Kalk. Outline übersteht forced-colors.
const FOKUS_HELL = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-k-tinte';
const FOKUS_TINTE = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-k-kalk';

export function fokus(auf: Grund = 'hell'): string {
  return auf === 'tinte' ? FOKUS_TINTE : FOKUS_HELL;
}

/** Interne Adresse → next/link; alles andere (tel:, mailto:, https:, #anker) → schlichtes <a>. */
export function istIntern(href: string): boolean {
  return href.startsWith('/') && !href.startsWith('//');
}

/** IDs der Beschreibungen zu einem Element verbinden (aria-describedby). */
export function beschreibung(...ids: Array<string | false | null | undefined>): string | undefined {
  const liste = ids.filter(Boolean).join(' ');
  return liste || undefined;
}
