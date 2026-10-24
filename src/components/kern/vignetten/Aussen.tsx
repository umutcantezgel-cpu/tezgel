import { Linie, Planrahmen, Punkt, gleich, schraffur, type VignetteProps } from '@/components/kern/vignetten/zeichnen';

// Vignette „aussen“ (P3-10, K-010): Draufsicht Terrasse vor der Hauswand (Wand im Schnitt, schraffiert). Platten im
// Raster mit offenen Fugen, an jedem Fugenkreuz ein Stelzlager als Lagerpunkt (Kreis, die Fugen laufen als Distanzkreuz hindurch). Passstücke links und rechts gleich breit
// (schraffiert), Bemaßung nur mit „=“. Ohne Laserachse, also ohne Rot.
const SPALTEN = [20, 40, 80, 120, 160, 200, 220];
const ZEILEN = [20, 60, 100];
const WAND = schraffur(8, 4, 224, 8);
const PASSSTUECKE = schraffur(20, 20, 20, 80) + schraffur(200, 20, 20, 80);
const FUGEN = SPALTEN.map((x) => `M${x} 20V100`).join('') + ZEILEN.map((y) => `M20 ${y}H220`).join('');
const LAGER = SPALTEN.flatMap((x) => ZEILEN.map((y) => [x, y] as const));
const MASS = `M20 120H220M20 116v8M40 116v8M200 116v8M220 116v8${gleich(30, 110)}${gleich(210, 110)}`;

export default function VignetteAussen({ className, fuellen }: VignetteProps) {
  return (
    <Planrahmen viewBox="0 0 240 128" className={className} fuellen={fuellen}>
      <g className="text-strich">
        <Linie d={WAND + PASSSTUECKE} />
        <Linie d={FUGEN} />
      </g>
      {/* Hauswand: Kanten und Schnittenden */}
      <Linie d="M8 4H232M8 12H232M8 4V12M232 4V12" />
      {/* Stelzlager an jedem Fugenkreuz */}
      {LAGER.map(([x, y]) => (
        <Punkt key={`${x}-${y}`} cx={x} cy={y} r="4" />
      ))}
      <Linie d={MASS} />
    </Planrahmen>
  );
}
