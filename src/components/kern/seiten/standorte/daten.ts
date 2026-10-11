// Daten der Seite `/standorte` (P4-08c, KERN v1.2): Wortlaut und Ableitungen wörtlich aus `src/app/(bestand)/standorte/page.tsx`.
// Keine Bestandslogik außer diesen zwei reinen Ableitungen; Quelle bleibt `@/config/cities` und `@/config/company`.
import { CITIES, type CityData } from '@/config/cities';
import { COMPANY_DATA } from '@/config/company';

/** Regionen in der Reihenfolge ihres ersten Auftretens in `CITIES` (Bestand `REGIONS`). */
export const REGIONEN: readonly string[] = Array.from(new Set(CITIES.map((stadt) => stadt.region)));

/**
 * Entfernungsangabe je Stadt, wörtlich wie Bestand `distanceLabel`. `CITIES.distanceKm` misst ab Wetzlar (Kommentar in
 * `cities.ts`), die Seite sagt das selbst („Entfernungen sind ungefähre Angaben ab Wetzlar“). Widersprüche zu Radius und
 * Firmensitz (intern I-16) bleiben unaufgelöst: offene Frage in der Rückgabe P4-08c. Geschütztes Leerzeichen vor „km“
 * (K-005, nur Darstellung; texte2 setzt U+00A0 einem Leerzeichen gleich).
 */
export function entfernung(stadt: CityData): string {
  if (stadt.name === COMPANY_DATA.headquarters.city) return 'Unser Firmensitz';
  if (stadt.distanceKm === 0) return 'Direkt neben unserem Firmensitz';
  return `ca. ${stadt.distanceKm} km ab Wetzlar`;
}
