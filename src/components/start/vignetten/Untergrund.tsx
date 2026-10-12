import { Linie, Planrahmen, schraffur, type VignetteProps } from '@/components/start/vignetten/zeichnen';

// Vignette „untergrund“ (P3-10, K-010): Schichtenschnitt am Wandanschluss. Von unten: Rohdecke und Mauerwerk im Schnitt
// (schraffiert), Estrich mit Randfuge, Verbundabdichtung über Boden und Wand, Dichtband in der Ecke mit Dehnschlaufe,
// darauf Wand- und Bodenfliesen mit Fugen. Ohne Laserachse, ohne Bemaßung, also ohne Rot.
const SCHNITT = schraffur(8, 8, 20, 84) + schraffur(8, 92, 224, 28, 4);
const FLIESEN = 'M38 8V40M44 8V40M38 40H44M38 24h6M48 46H232M48 52H232M48 46V52M88 46v6M128 46v6M168 46v6M208 46v6';

export default function VignetteUntergrund({ className }: VignetteProps) {
  return (
    <Planrahmen viewBox="0 0 240 128" className={className}>
      <g className="text-strich">
        <Linie d={SCHNITT} />
      </g>
      {/* Mauerwerk und Rohdecke: Kanten */}
      <Linie d="M8 8V120M28 8V92M8 92H232M8 120H232" />
      {/* Estrich mit Randfuge zur Wand */}
      <Linie d="M34 92V64H232" />
      {/* Verbundabdichtung über Wand und Boden */}
      <Linie d="M31 16V61H232" />
      {/* Dichtband in der Ecke, Dehnschlaufe im Boden */}
      <Linie d="M34 44V58H40V54H44V58H60" />
      <g className="text-strich">
        <Linie d={FLIESEN} />
      </g>
    </Planrahmen>
  );
}
