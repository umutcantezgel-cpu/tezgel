// Geometrie des großen Moments `gefaelle-dusche` (KERN v3.4 K-007, K-008; E3-GRAF-03): Schnitt durch eine Dusche ohne
// Stufe in Zeichnungseinheiten der viewBox. Reine Daten und Rechnungen ohne JSX, damit der Test sie direkt laden kann.
// Gekoppelt an bewegung.css (@keyframes gefaelle-tropfen, Beginn der Pfeile): Werte nur gemeinsam ändern, der Test
// test/gefaelle-dusche.test.mjs prüft beides.

const r = (n: number) => Math.round(n * 100) / 100;

export const VIEWBOX = '0 0 320 120';

/** Oberkante der Fliesen im Duschbereich: vom Badboden (links, waagrecht) im Gefälle bis zur Kante des Ablaufs.
 *  Die Neigung ist übertrieben gezeichnet (16 auf 168 Einheiten), damit man sie sieht. */
export const GEFAELLE = { x0: 88, y0: 52, x1: 256, y1: 68 } as const;

/** y der Fliesenoberkante an der Stelle x (links waagrecht, dazwischen im Gefälle, rechts waagrecht) */
export function oberkante(x: number): number {
  const { x0, y0, x1, y1 } = GEFAELLE;
  if (x <= x0) return y0;
  if (x >= x1) return y1;
  return y0 + ((x - x0) * (y1 - y0)) / (x1 - x0);
}

/** Ablauf (Rinne im Schnitt): Innenraum unter dem Rost */
export const RINNE = { links: 256, rechts: 280, oben: 68, boden: 84 } as const;

/** Tropfen: Mitte und Radius am Start (oben im Gefälle), Luft zwischen Tropfen und Fliese */
export const TROPFEN = { cx: 109, cy: 47.5, r: 6 } as const;
export const LUFT = 0.5;

/** Weg des Tropfens als Verschiebung (CSS translate in px = Einheiten der viewBox): bis zur Kante des Ablaufs, dann hinein.
 *  `anteilHang`: Anteil von dauer-5, zu dem der Tropfen die Kante erreicht. */
export const WEG = { hang: { x: 147, y: 14 }, ablauf: { x: 159, y: 29.5 }, anteilHang: 0.85 } as const;

/** Gefälle-Pfeile: Anfang und Spitze (x) entlang des Gefälles, Abstand über der Fliese */
export const PFEIL_ABSTAND = 24;
export const PFEILE = [
  [118, 150],
  [164, 196],
  [210, 242],
] as const;
/** Beginn je Pfeil als Anteil von dauer-5: sobald die Mitte des Tropfens den Anfang des Pfeils erreicht */
export const PFEIL_BEGINN = [0.05, 0.32, 0.58] as const;

/** Schnittflächen (schraffiert): Rohdecke links und rechts vom Abflussrohr, Wand. [x, y, b, h, Abstand] */
export const SCHNITT_FLAECHEN = [
  [8, 88, 256, 28, 4],
  [272, 88, 16, 28, 4],
  [288, 0, 16, 116, 6],
] as const;

export const PFADE = {
  /** Fugen zwischen den Fliesen (Strich) */
  fugen: 'M48 52v6M88 52v6M130 56v6M172 60v6M214 64v6',
  /** die Waagrechte über dem Duschboden, gestrichelt (Strich): zeigt, wie weit sich der Boden neigt */
  waage: 'M88 52H256',
  /** Wand (innen, außen), Rohdecke (oben mit Lücke für das Rohr, unten) */
  kanten: 'M288 0V116M304 0V116M8 88H264M272 88H288M8 116H304',
  /** Rinne mit Abflussrohr, Rost als drei Stäbe */
  rinne: 'M256 68V84H264V116M272 116V84H280V68M258 68h4M266 68h4M274 68h4',
  /** Fliesen: Ober- und Unterkante, Badboden waagrecht, Duschboden im Gefälle; Reststück zwischen Rinne und Wand */
  belag: 'M8 52H88L256 68M8 58H88L256 74M280 68H288M280 74H288',
  /** Brause an der Wand */
  brause: 'M288 6H272V14M260 14H284V18H260Z',
} as const;

/** Pfeil von xa nach xb parallel zum Gefälle, `abstand` über der Fliese; Spitze mit Schenkeln unter 45° (wie `pfeil`). */
export function pfeilEntlang(xa: number, xb: number, abstand: number = PFEIL_ABSTAND, spitze = 5): string {
  const ya = oberkante(xa) - abstand;
  const yb = oberkante(xb) - abstand;
  const l = Math.hypot(xb - xa, yb - ya);
  const ux = (xb - xa) / l;
  const uy = (yb - ya) / l;
  const bx = xb - spitze * ux;
  const by = yb - spitze * uy;
  return `M${r(xa)} ${r(ya)}L${r(xb)} ${r(yb)}M${r(bx - spitze * uy)} ${r(by + spitze * ux)}L${r(xb)} ${r(yb)}L${r(bx + spitze * uy)} ${r(by - spitze * ux)}`;
}

/** Tropfen mit Spitze nach oben: Kreis mit Radius r, Schenkel der Spitze unter 45° tangential an den Kreis. */
export function tropfenPfad(t: { cx: number; cy: number; r: number } = TROPFEN): string {
  const s = t.r * Math.SQRT1_2;
  return `M${r(t.cx)} ${r(t.cy - t.r * Math.SQRT2)}L${r(t.cx + s)} ${r(t.cy - s)}A${t.r} ${t.r} 0 1 1 ${r(t.cx - s)} ${r(t.cy - s)}Z`;
}
