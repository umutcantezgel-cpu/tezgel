// Geometrie der Einsatzkarte (großer Moment `karte`, KERN v3.4 K-007 und K-008, E3-GRAF-09). Reine Funktionen, getestet in
// test/karte.test.mjs. Zeichenfläche viewBox -200 -200 400 400, Aßlar im Ursprung, Norden oben. Die Richtung jedes Ortes
// kommt aus seinen Koordinaten (CITY_COORDINATES), der Abstand aus der Entfernung ab Aßlar (CITY_HUB_DATA, gerundete Angaben)
// im Wurzelmaßstab bis 45 km: innen bleibt Platz für die nahen Orte, die Ringe 10 und 25 km stehen im selben Maßstab, jeder
// Ort liegt also im richtigen Band. Kein Kartenmaßstab (wie die Zonen in src/lib/einzugszonen.ts).
import type { CityData } from '@/config/cities';
import type { MapCoordinates } from '@/lib/maps/getMapEmbedUrl';
import type { Zone } from '@/lib/einzugszonen';
import { zoneFuer } from '@/lib/einzugszonen';

/** halbe Kantenlänge der Zeichenfläche (viewBox -200 -200 400 400) */
export const HALB = 200;
/** Abstand des weitesten Ortes vom Mittelpunkt */
export const R_AUSSEN = 180;
/** weitester Ort des Einsatzgebiets (Friedberg, K-015 F-09) */
export const KM_AUSSEN = 45;
/** Ringe um Aßlar in km (Grenzen der Zonen nah und mittel) */
export const RINGE_KM = [10, 25] as const;

/** Lage der Beschriftung am Punkt; je Ort so gewählt, dass bei 360 px nichts überläuft und die Standardnamen sich nicht berühren */
export type Lage = 'oben' | 'unten' | 'links' | 'rechts';
export const LAGE: Readonly<Record<string, Lage>> = {
  asslar: 'oben',
  wetzlar: 'rechts',
  giessen: 'oben',
  herborn: 'unten',
  solms: 'links',
  braunfels: 'unten',
  dillenburg: 'oben',
  haiger: 'oben',
  marburg: 'links',
  limburg: 'rechts',
  butzbach: 'links',
  'bad-nauheim': 'links',
  friedberg: 'links',
};

export interface Kartenort {
  slug: string;
  name: string;
  km: number;
  zone: Zone['id'];
  x: number;
  y: number;
}

/** auf eine Nachkommastelle, ohne -0 */
function runde(n: number): number {
  const w = Math.round(n * 10) / 10;
  return w === 0 ? 0 : w;
}

/** Abstand vom Mittelpunkt in Zeichnungseinheiten (Wurzelmaßstab, 0 bis R_AUSSEN) */
export function radius(km: number): number {
  const k = Math.min(Math.max(km, 0), KM_AUSSEN);
  return runde(R_AUSSEN * Math.sqrt(k / KM_AUSSEN));
}

/** Richtung von `von` nach `nach` im Bogenmaß: 0 = Osten, π/2 = Norden (Länge mit cos der Breite gestaucht) */
export function richtung(von: MapCoordinates, nach: MapCoordinates): number {
  const dx = (nach.lng - von.lng) * Math.cos((von.lat * Math.PI) / 180);
  const dy = nach.lat - von.lat;
  return Math.atan2(dy, dx);
}

/** Punkt in der Zeichnung; SVG zählt y nach unten, Norden liegt also bei negativem y */
export function punkt(km: number, winkel: number): { x: number; y: number } {
  const r = radius(km);
  return { x: runde(r * Math.cos(winkel)), y: runde(-r * Math.sin(winkel)) };
}

/** Lage in Prozent der quadratischen Zeichenfläche, für Beschriftungen in HTML (--x, --y) */
export function prozent(wert: number): string {
  return `${runde(((wert + HALB) / (2 * HALB)) * 100)}%`;
}

/** Fugenraster im Drittelverband als Pfad: Fliese 80 × 40, jede Reihe um ein Drittel versetzt, deckt die ganze Fläche */
export function fugenraster(): string {
  const laenge = 80;
  const hoehe = 40;
  const teile: string[] = [];
  for (let y = -HALB + hoehe; y < HALB; y += hoehe) teile.push(`M${-HALB} ${y}H${HALB}`);
  for (let reihe = 0; reihe < (2 * HALB) / hoehe; reihe++) {
    const oben = -HALB + reihe * hoehe;
    const versatz = ((reihe % 3) * laenge) / 3;
    for (let x = -HALB + versatz; x < HALB; x += laenge) {
      if (x > -HALB) teile.push(`M${runde(x)} ${oben}v${hoehe}`);
    }
  }
  return teile.join('');
}

/** Orte mit Lage in der Zeichnung; der Firmensitz (0 km) liegt im Ursprung, Orte ohne Koordinaten fallen aus der Zeichnung */
export function kartenorte(
  orte: readonly Pick<CityData, 'slug' | 'name' | 'distanceKm'>[],
  koordinaten: Readonly<Record<string, MapCoordinates | undefined>>,
  sitz: MapCoordinates,
): Kartenort[] {
  return orte.flatMap((o) => {
    const k = koordinaten[o.slug];
    if (!k) return [];
    const { x, y } = punkt(o.distanceKm, richtung(sitz, k));
    return [{ slug: o.slug, name: o.name, km: o.distanceKm, zone: zoneFuer(o.distanceKm).id, x, y }];
  });
}
