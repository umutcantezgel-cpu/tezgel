import { Linie, Planrahmen, gleich, pfeil, schraffur, type VignetteProps } from '@/components/kern/vignetten/zeichnen';

// Vignette „bad“ (P3-10, K-010): Draufsicht Duschfeld. Wand im Schnitt (schraffiert) an drei Seiten, Duschrinne direkt
// am Wandanschluss, Gefälle-Pfeile zur Rinne, Fugenraster mit gleich breiten Passstücken links und rechts (schraffiert),
// Bemaßung nur mit „=“. Ohne Laserachse, also ohne Rot. Dekorativ (aria-hidden über den Rahmen).
const WAND = schraffur(12, 12, 216, 8) + schraffur(12, 20, 8, 142) + schraffur(220, 20, 8, 142);
const PASSSTUECKE = schraffur(20, 36, 28, 126) + schraffur(192, 36, 28, 126);
const FUGEN = 'M48 36V162M96 36V162M144 36V162M192 36V162M20 36H220M20 78H220M20 120H220M20 162H220';
const GEFAELLE = pfeil(72, 150, 44) + pfeil(120, 150, 44) + pfeil(168, 150, 44);
const MASS = `M20 176H220M20 172v8M48 172v8M192 172v8M220 172v8${gleich(34, 168)}${gleich(206, 168)}`;

export default function VignetteBad({ className, fuellen }: VignetteProps) {
  return (
    <Planrahmen viewBox="0 0 240 184" className={className} fuellen={fuellen}>
      <g className="text-strich">
        <Linie d={WAND + PASSSTUECKE} />
        <Linie d={FUGEN} />
      </g>
      {/* Wand: Außen- und Innenkante, Schnittkanten unten */}
      <Linie d="M12 162V12H228V162M20 162V20H220V162M12 162H20M220 162H228" />
      {/* Duschrinne am Wandanschluss mit Schlitz */}
      <Linie d="M32 24H208V32H32ZM40 28H200" />
      <Linie d={GEFAELLE} />
      <Linie d={MASS} />
    </Planrahmen>
  );
}
