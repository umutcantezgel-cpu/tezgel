import { Linie, Planrahmen, pfeil, schraffur, type VignetteProps } from '@/components/kern/vignetten/zeichnen';

// Vignette „wanne-dusche“ (UM-E4-SICHT-FIX M-C9, NEU in der Zeichensprache der Plan-Vignetten wie „reparatur“ und „treppe“, kein
// Original aus P3-10): Schnitt durch ein Bad, „Wanne raus, Dusche ohne Stufe“. Rohdecke und Wand im Schnitt (schraffiert); die
// alte Wanne gestrichelt (ausgebaut), ein Pfeil hebt sie heraus; darunter läuft der Fliesenboden ohne Kante vom Bad in die Dusche
// und neigt sich zur Rinne an der Wand, zwei Gefällepfeile parallel zum Boden; Wandfliesen und Brause an der Wand. Statisch (keine
// Bewegung, kein Registereintrag), ohne Laserachse, also ohne Rot; dekorativ (aria-hidden über den Rahmen), was sie zeigt, sagt
// die Unterschrift. Für /bad/badsanierung: unter dem Kopf von „Was wir tun“ (rund 760 px breit) und, mit dem Nachtrag zu
// EinstiegMitte, als Schnurzeichen am Ende der Schnur (eine H1-Zeile hoch, rund 165 px breit).
// Nacharbeit (Prüfung SF-C3): Die Wanne steht groß über der ganzen Dusche (vorher ein Drittel der Breite, links 40 % leer), der
// Badboden ist kurz, die Gefällepfeile stehen 10 statt 6 Einheiten über der Fliese, und die Schraffur hält 6 Einheiten Abstand
// (vorher 4 in der Decke): So verdichtet sich die Zeichnung auch in der Größe des Schnurzeichens nicht zu einer Fläche.
const r = (n: number) => Math.round(n * 100) / 100;

/** Schnittkante links, Beginn des Gefälles, Rinne, Innenseite der Wandfliesen, Oberkante der Rohdecke. Die Ecken der
 *  Schraffurflächen (Decke X0 + YD = 122, Wand XW + 4 + 4 = 212) liegen im Raster der Schraffur (6): Die Striche von Wand und
 *  Decke laufen ohne Versatz ineinander */
const X0 = 14;
const XS = 60;
const XR = 188;
const XW = 204;
const YD = 108;
/** Oberkante der Fliesen: Badboden waagrecht bis XS, dann im Gefälle 6 : 128 bis zur Rinne (Neigung übertrieben) */
const oberkante = (x: number) => (x <= XS ? 86 : 86 + ((x - XS) * 6) / (XR - XS));
const YR = oberkante(XR);

/** Pfeil parallel zum Gefälle von xa nach xb, 10 Einheiten über der Fliese; Spitze mit Schenkeln unter 45° (wie `pfeil`) */
function gefaellePfeil(xa: number, xb: number, spitze = 5): string {
  const ya = oberkante(xa) - 10;
  const yb = oberkante(xb) - 10;
  const l = Math.hypot(xb - xa, yb - ya);
  const ux = (xb - xa) / l;
  const uy = (yb - ya) / l;
  const bx = xb - spitze * ux;
  const by = yb - spitze * uy;
  return `M${xa} ${r(ya)}L${xb} ${r(yb)}M${r(bx - spitze * uy)} ${r(by + spitze * ux)}L${xb} ${r(yb)}L${r(bx + spitze * uy)} ${r(by - spitze * ux)}`;
}

/** Wand rechts und Rohdecke im Schnitt */
const SCHNITT = schraffur(XW + 4, 4, 20, YD - 4) + schraffur(X0, YD, 228 - X0, 12);
/** Fugen im Boden (Bad waagrecht, Dusche im Gefälle) und in den Wandfliesen */
const FUGEN = [28, 44, 92, 124, 156].map((x) => `M${x} ${r(oberkante(x))}v4`).join('') + [24, 40, 56, 72].map((y) => `M${XW} ${y}h4`).join('');
/** die alte Wanne über der Dusche: Rand und Wanne, gestrichelt in Tinte (sie ist ausgebaut) */
const WANNE = 'M64 34H184M70 34L74 60H174L178 34';
/** Kanten in Tinte: Wand, Rohdecke (links die Schnittkante durch Boden und Decke), Fliesen (Bad waagrecht, Dusche im Gefälle,
 *  Wandfliesen), Rinne mit Rost, Brause */
const KANTEN =
  `M228 4V120M${XW + 4} 4V${YD}M${X0} ${YD}H${XW + 4}M${X0} 120H228M${X0} 86V120` +
  `M${X0} 86H${XS}L${XR} ${r(YR)}M${X0} 90H${XS}L${XR} ${r(YR + 4)}M${XW} 8V${r(YR)}M${XW} 8H${XW + 4}` +
  `M${XR} ${r(YR)}V${r(YR + 10)}H${XW}V${r(YR)}M${XR + 3} ${r(YR)}h3M${XR + 8} ${r(YR)}h3` +
  `M${XW} 18H192V24M182 24H198V27H182Z`;
/** Pfeile: die Wanne geht raus (senkrecht nach oben), das Wasser läuft zur Rinne (parallel zum Gefälle) */
const PFEILE = pfeil(124, 54, 14) + gefaellePfeil(96, 132) + gefaellePfeil(146, 182);

export default function VignetteWanneDusche({ className, fuellen }: VignetteProps) {
  return (
    <Planrahmen viewBox="0 0 240 128" className={className} fuellen={fuellen}>
      <g className="text-strich">
        <Linie d={SCHNITT} />
        <Linie d={FUGEN} />
      </g>
      <Linie d={KANTEN} />
      <Linie d={WANNE} strokeDasharray="4 4" />
      <Linie d={PFEILE} />
    </Planrahmen>
  );
}
