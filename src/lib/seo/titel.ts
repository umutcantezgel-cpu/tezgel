// SEO-Runde (Gesamtprobe): Titel der Seiten Leistung × Ort an einer Stelle, damit test/titleLength.test.mjs (Test 7) alle
// Leistungen und Orte schon vor dem Bau prüfen kann. Lange Ortsnamen stehen in der kurzen Form (CityData.kurzname), sonst
// kürzt sanitizeTitle (src/lib/metadata.ts) die Marke weg.
import type { CityData } from '@/config/cities';

/** Anzeigename je Leistung auf den Seiten Leistung × Ort (Titel, Einstieg, Strukturdaten) */
export const LEISTUNG_ANZEIGE: Readonly<Record<string, string>> = {
  untergrund: 'Untergrund & Abdichtung',
  bad: 'Badsanierung & Bäder',
  wohnen: 'Fliesenverlegung & Wohnen',
  aussen: 'Balkon- & Terrassensanierung',
};

export function leistungOrtTitel(service: { id: string; name: string }, city: Pick<CityData, 'name' | 'kurzname'>): string {
  const anzeige = LEISTUNG_ANZEIGE[service.id] ?? service.name;
  const ort = city.kurzname ?? city.name;
  return service.id === 'aussen' ? `${anzeige} in ${ort} | Tezgel` : `${anzeige} in ${ort} | Fliesen Tezgel`;
}
