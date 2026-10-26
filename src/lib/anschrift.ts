// Anschrift für die Anzeige (reine Textfunktion ohne JSX, auch für Inhaltsdateien). Die Firmendaten in SITE_CONFIG und
// COMPANY_DATA bleiben unverändert (G8).

/** Straße mit Hausnummer: Die Nummer bleibt bei der Straße („Hohwardstraße 14“), und der Name darf vor „straße“ trennen,
 *  damit die gebundene Einheit bei großer Schrift nicht mitten in der Zahl umbricht (Browserprüfung E4-W1, Runden 3 und 4). */
export function strasse(text: string): string {
  return text.replace(/(\S)(straße)(?=\s|$)/, '$1­$2').replace(/ (\d+\s*\w?)$/, ' $1');
}
