// Einstieg Variante B „Planblatt“ (P3-09b/P3-09c): der Verlegeplan Bad als Zeichnung des Planblatts.
// Geometrie aus `VerlegeplanBad` (viewBox 0 −20 480 380): Kreuzpunkt der Achse bei (240 | 170) = genau die Mitte der
// Zeichnung (50 % | 50 %).
// Ab lg: an der Achse geschnitten – die Hülle ist die obere Hälfte (480 : 190 = 48/19), die Zeichnung steht oben bündig,
//   der Rest ist gekappt. Der Kreuzpunkt liegt so auf der Mitte der Schnittkante, die im Einstieg die Waage ist (Grundlinie
//   der H1, Oberkante des Formularfelds). Sichtbar: Bemaßung „=“, Passstücke oben und an beiden Seiten, Rinne, Fugen.
//   Das Lot (Laser) steht auf der Mittelfuge x = 240, symmetrisch um den Kreuzpunkt gelegt (oben 0, unten −100 %) und
//   oberhalb der Schnittkante sichtbar.
// Unter lg: vollständig (480 : 380 = 24/19), Breite setzt der Einstieg; kein Laser in der Zeichnung (mobil steht nur das
//   Lot am linken Rand, K-007/K-009).
// Die Achse des Plans selbst bleibt aus (achse={false}): Die Laserlinien zeichnet der Einstieg, damit die Waage aus dem
// Plan in die Textspalte laufen kann. Dekorativ (aria-hidden über VerlegeplanBad und die Hülle).
import VerlegeplanBad from '@/components/kern/motive/VerlegeplanBad';
import { LaserLot } from '@/components/kern/start/einstieg-b/Laser';

export default function Plan({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none relative aspect-24/19 overflow-hidden lg:aspect-48/19 ${className}`}>
      <VerlegeplanBad achse={false} className="absolute inset-x-0 top-0" />
      <div className="absolute top-0 -bottom-full left-1/2 hidden w-(--k-linie-2) -translate-x-1/2 lg:block">
        <LaserLot className="h-full w-full" />
      </div>
    </div>
  );
}
