// SEO-Runde K01 (docs/seo/KONTEXT.md, Abschnitt 5): Die Zeitsperre gegen schnelle Bots misst die Ausfülldauer im Browser
// mit performance.now(). Diese Uhr läuft gleichmäßig vom Laden der Seite an und hängt nicht an der Uhrzeit des Geräts.
// Bisher verglich der Server den Zeitstempel des Geräts (`_t`) mit seiner eigenen Uhr: Ging die Geräteuhr vor oder stand
// der Tab länger als einen Tag offen, galt die Anfrage als Bot, die Person sah einen Erfolg, und keine Mail ging raus.

/** Startwert für die Messung; im Formular-Hook einmal festhalten: `useState(() => messbeginn())`. */
export function messbeginn(): number {
  return typeof performance !== 'undefined' && typeof performance.now === 'function' ? performance.now() : Date.now();
}

/**
 * Ausfülldauer in Millisekunden seit `beginn` (ganzzahlig); wird als `_d` an /api/anfrage gesendet. Mit performance.now()
 * ist sie nie negativ. Nur im Ersatzweg über Date.now() könnte eine zurückgestellte Uhr sie negativ machen; einen
 * negativen Wert wertet der Server nicht (security.ts), statt ihn wie 0 als Bot zu zählen.
 */
export function ausfuelldauer(beginn: number): number {
  return Math.round(messbeginn() - beginn);
}
