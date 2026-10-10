// Einstieg Variante B „Planblatt“ (P3-09b): der Verlegeplan Bad als Zeichnung des Planblatts.
// Geometrie aus `VerlegeplanBad` (viewBox 0 −20 480 380): Kreuzpunkt der Achse bei (240 | 170) = genau die Mitte der
// Zeichnung (50 % | 50 %). Die Hülle ist deshalb nur die OBERE HÄLFTE hoch (Seitenverhältnis 480 : 190 = 48/19); die
// Zeichnung steht darin oben bündig und ragt um ihre halbe Höhe nach unten heraus. So liegt der Kreuzpunkt exakt auf der
// Unterkante der Hülle – und die Unterkante ist im Einstieg die Grundlinie der H1 (Rasterzeile, siehe Einstieg.tsx).
// Ab lg: ganzer Plan, das Lot (Laser) steht auf der Mittelfuge x = 240 und reicht über die volle Planhöhe (−20 … 360),
//   symmetrisch um den Kreuzpunkt (oben 0, unten −100 % der Hülle = halbe Planhöhe darunter).
// Unter lg: schmaler Streifen (480 : 130, mittel 480 : 90) – oben die Bemaßung „=“, Wand und die schraffierten Passstücke;
//   kein Laser im Streifen (mobil steht nur das Lot am linken Rand, K-007/K-009).
// Die Achse des Plans selbst bleibt aus (achse={false}): Die Laserlinien zeichnet der Einstieg, damit die Waage aus dem
// Plan in die Textspalte laufen kann. Dekorativ (aria-hidden über VerlegeplanBad und die Laserhüllen).
import VerlegeplanBad from '@/components/kern/motive/VerlegeplanBad';
import { LaserLot } from '@/components/kern/start/einstieg-b/Laser';

export default function Plan({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none relative aspect-48/13 overflow-hidden md:aspect-48/9 lg:aspect-48/19 lg:overflow-visible ${className}`}
    >
      <VerlegeplanBad achse={false} className="absolute inset-x-0 top-0" />
      <div className="absolute top-0 -bottom-full left-1/2 hidden w-(--k-linie-2) -translate-x-1/2 lg:block">
        <LaserLot className="h-full w-full" />
      </div>
    </div>
  );
}
