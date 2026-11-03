// Snippet-Runde (03.11.2026): eigener Titel zur Adresse (src/inhalte/meta/titel.ts) vor dem übergebenen, an einer Stelle für die
// Metadaten (src/lib/metadata.ts) und die Seitenknoten der strukturierten Daten (src/lib/schema.ts), wie lib/beschreibung.ts bei
// den Descriptions. Ohne Import aus schema.ts oder metadata.ts.
import { META_TITEL } from '@/inhalte/meta/titel';

/** Titel der Seite unter `pfad` (Pfad ohne Domain): eigener Eintrag vor dem übergebenen */
export function seitenTitel(pfad: string, titel: string): string {
  return META_TITEL[pfad] ?? titel;
}
