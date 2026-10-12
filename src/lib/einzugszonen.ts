// Einzugszonen (KERN K-007 einzugsband, E3-ORCH-03): ordnet die Orte aus `src/config/cities.ts` drei Zonen zu.
// Die Entfernungen sind gerundete Angaben der Konfiguration („ca.“); die Zonen sind Bänder, kein Maßstab.
import type { CityData } from '@/config/cities';

export interface Zone {
  id: 'nah' | 'mittel' | 'weit';
  /** obere Grenze in km (einschließlich) */
  bis: number;
  etikett: string;
}

export const ZONEN: readonly Zone[] = [
  { id: 'nah', bis: 10, etikett: '≤ 10 km' },
  { id: 'mittel', bis: 25, etikett: '≤ 25 km' },
  { id: 'weit', bis: 50, etikett: '≤ 50 km' },
];

/** Zone eines Ortes; Orte jenseits der letzten Grenze fallen in die letzte Zone (keine Ortsdaten gehen verloren). */
export function zoneFuer(km: number): Zone {
  return ZONEN.find((z) => km <= z.bis) ?? ZONEN[ZONEN.length - 1];
}

export interface Zonengruppe<T> {
  zone: Zone;
  orte: T[];
}

/** Gruppiert Orte nach Zone, innerhalb der Zone nach Entfernung, dann alphabetisch (deutsch). */
export function gruppiereNachZone<T extends Pick<CityData, 'name' | 'distanceKm'>>(orte: readonly T[]): Zonengruppe<T>[] {
  return ZONEN.map((zone) => ({
    zone,
    orte: orte
      .filter((o) => zoneFuer(o.distanceKm).id === zone.id)
      .slice()
      .sort((a, b) => a.distanceKm - b.distanceKm || a.name.localeCompare(b.name, 'de')),
  }));
}
