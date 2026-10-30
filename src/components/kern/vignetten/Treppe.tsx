import { Linie, Planrahmen, gleich, schraffur, type VignetteProps } from '@/components/kern/vignetten/zeichnen';

// Vignette „treppe“ (UM-E4-START, NEU in der Zeichensprache der alten Vignetten wie „reparatur“, kein Original aus P3-10):
// Schnitt durch eine Außentreppe mit drei Stufen und Podest vor der Hauswand. Unterbau im Schnitt (schraffiert), darauf der
// Belag als zweite Linie mit Fugen auf Tritt- und Setzstufen, an jeder Stufenkante ein Kantenprofil; Bemaßung nur mit „=“
// (gleiche Auftritte). Für die Lage „Die Treppe vor dem Haus ist kaputt.“ auf der Startseite. Ohne Laserachse, also ohne Rot.
// Unterbau in Rechtecken je Stufe (Schnittfläche), Hauswand rechts
const UNTERBAU = schraffur(16, 92, 208, 20) + schraffur(64, 68, 160, 24) + schraffur(112, 44, 112, 24) + schraffur(160, 20, 64, 24);
const WAND = schraffur(224, 4, 12, 108);
// Fugen im Belag: auf den Trittstufen und am Podest kurze Stöße quer durch die Belagschicht, an den Setzstufen waagrecht
const FUGEN = 'M36 88v4M84 64v4M132 40v4M188 16v4M60 78h4M108 54h4M156 30h4';
// Kantenprofil an jeder Stufenkante (Winkel um die vordere Kante des Belags)
const PROFILE = 'M12 92V88H16M60 68V64H64M108 44V40H112M156 20V16H160';
const MASS = `M12 120H156M12 116v8M60 116v8M108 116v8M156 116v8${gleich(36, 120)}${gleich(84, 120)}${gleich(132, 120)}`;

export default function VignetteTreppe({ className, fuellen }: VignetteProps) {
  return (
    <Planrahmen viewBox="0 0 240 128" className={className} fuellen={fuellen}>
      <g className="text-strich">
        <Linie d={UNTERBAU + WAND} />
        <Linie d={FUGEN} />
        <Linie d={MASS} />
      </g>
      {/* Unterbau: Kanten der Stufen, Gelände und Hauswand */}
      <Linie d="M16 112V92H64V68H112V44H160V20H224M4 112H236M224 4V112M236 4V112" />
      {/* Belag: Oberkante der Fliesen auf Tritt- und Setzstufen */}
      <Linie d="M12 112V88H60V64H108V40H156V16H224" />
      <Linie d={PROFILE} />
    </Planrahmen>
  );
}
