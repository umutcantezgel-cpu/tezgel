// SEO-Runde (T12): welche Adressen Sitemap und IndexNow nennen. Entscheidung Umut (02.11.2026): Orts- und Leistungsseiten
// bleiben im Index und bekommen nach und nach eigenen Inhalt; kein noindex für sie. Ausgenommen sind nur die Rechtstexte,
// die in ihrem Layout noindex tragen (eine Seite mit noindex gehört nicht in die Sitemap).

/** Rechtstexte mit noindex in ihrem Layout; Sitemap und IndexNow nennen sie nicht */
export const RECHTSTEXTE_OHNE_INDEX: readonly string[] = ['/impressum', '/datenschutz', '/agb', '/widerruf', '/cookie-richtlinie'];

/** Gehört die Adresse (Pfad ohne Domain) in Sitemap und IndexNow? */
export function pfadIndexiert(pfad: string): boolean {
  return !RECHTSTEXTE_OHNE_INDEX.includes(pfad.replace(/\/$/, '') || '/');
}

/** Wie pfadIndexiert, für eine volle Adresse (https://www.tezgel.de/...) */
export function adresseIndexiert(adresse: string): boolean {
  return pfadIndexiert(new URL(adresse).pathname);
}
