// Geometrie des großen Moments `gefaelle-balkon` (KERN v3.4 K-007, K-008; E3-GRAF-04): Schnitt durch einen Balkon in
// Zeichnungseinheiten (viewBox 0 16 240 112). Reine Rechnung ohne React, damit test/gefaelle-balkon.test.mjs sie prüfen kann.
// Von links: Hauswand im Schnitt, daran die Betonplatte des Balkons (schraffiert), darauf der Gefälleestrich (keilförmig,
// am Haus dicker), die Abdichtung mit Hochzug an der Wand, das Kleberbett und die Platten mit Fugen; vorn das Tropfblech
// mit Tropfnase und darunter die Rinne. Das Gefälle ist in der Zeichnung überhöht (7 % statt 1,5 bis 2 %), damit es am
// Handy zu sehen ist; die Zeichnung nennt keine Zahl.

export const VIEWBOX = '0 16 240 112';
export const GEFAELLE = 0.07;
export const TROPFEN_RADIUS = 4.5;
/** Mittelpunkt des Tropfens am Ende: er liegt in der Rinne (gezeichneter Endzustand) */
export const ENDE = { x: 209, y: 116 } as const;

export const r = (n: number) => Math.round(n * 100) / 100;

/** Oberkante des Gefälleestrichs; die Schichten darüber liegen parallel dazu */
export const estrich = (x: number) => 80 + (x - 28) * GEFAELLE;
export const abdichtung = (x: number) => estrich(x) - 3;
export const blech = (x: number) => estrich(x) - 4.5;
export const plattenUnten = (x: number) => estrich(x) - 6;
export const plattenOben = (x: number) => estrich(x) - 13;

/** Hauswand: Kanten und Schnittenden (die Wandfläche ist dort offen, wo die Betonplatte anschließt) */
export const WAND = 'M8 20H28M8 120H28M8 20V120M28 20V96M28 112V120';
/** Betonplatte des Balkons: Oberseite, Stirn, Unterseite */
export const BETON = 'M28 96H200V112H28';
export const ESTRICH = `M28 80L200 ${r(estrich(200))}V96`;
export const ABDICHTUNG = `M31 56V${r(abdichtung(31))}L200 ${r(abdichtung(200))}`;
export const PLATTEN =
  `M34 ${r(plattenOben(34))}L200 ${r(plattenOben(200))}` +
  `M34 ${r(plattenUnten(34))}L200 ${r(plattenUnten(200))}` +
  `M34 ${r(plattenOben(34))}V${r(plattenUnten(34))}` +
  `M200 ${r(plattenOben(200))}V${r(plattenUnten(200))}`;
export const FUGEN = [76, 118, 160].map((x) => `M${x} ${r(plattenOben(x))}V${r(plattenUnten(x))}`).join('');
/** Tropfblech: Schenkel im Kleberbett, senkrecht vor der Stirn, Tropfnase unter 45° nach außen */
export const TROPFKANTE = `M188 ${r(blech(188))}L204 ${r(blech(204))}V100L208 104`;
/** Rinne an der Stirn der Betonplatte, oben offen; die Tropfnase endet über ihr */
export const RINNE = 'M200 106V122H228V106';

/** Pfeil parallel über den Platten von x1 nach x2 (Spitze bei x2, Schenkel unter 45° zur Laufrichtung) */
export function pfeilEntlang(x1: number, x2: number, ueber = 18, spitze = 5): string {
  const ax = x1, ay = plattenOben(x1) - ueber, bx = x2, by = plattenOben(x2) - ueber;
  const l = Math.hypot(bx - ax, by - ay), ux = (bx - ax) / l, uy = (by - ay) / l;
  const c = Math.SQRT1_2 * spitze;
  return `M${r(ax)} ${r(ay)}L${r(bx)} ${r(by)}M${r(bx - c * (ux - uy))} ${r(by - c * (uy + ux))}L${r(bx)} ${r(by)}L${r(bx - c * (ux + uy))} ${r(by - c * (uy - ux))}`;
}

/** Pfeile des Wasserwegs; `ab` = Beginn des Einblendens als Anteil von dauer-5 (wenn der Tropfen den Pfeil erreicht) */
export const PFEILE: { d: string; ab: number; von?: number }[] = [
  { d: pfeilEntlang(64, 88), ab: 0.22, von: 64 },
  { d: pfeilEntlang(108, 132), ab: 0.41, von: 108 },
  { d: pfeilEntlang(152, 176), ab: 0.6, von: 152 },
  // senkrecht in die Rinne, gleich pfeil(220, 94, 114) aus kern/vignetten/zeichnen
  { d: 'M220 94V114M215 109L220 114L225 109', ab: 0.87 },
];

/** Tropfen mit Spitze nach oben (Schenkel unter 45°), Bauch um (cx, cy) */
export function tropfen(cx: number, cy: number, rr = TROPFEN_RADIUS): string {
  const t = rr * Math.SQRT1_2;
  return `M${r(cx)} ${r(cy - rr * Math.SQRT2)}L${r(cx + t)} ${r(cy - t)}A${rr} ${rr} 0 1 1 ${r(cx - t)} ${r(cy - t)}Z`;
}
export const TROPFEN = tropfen(ENDE.x, ENDE.y);

/** Stationen des Tropfens (Mittelpunkt) mit Anteil an dauer-5, gleichmäßig schnell (linear). Die Keyframes
 *  `gefaelle-balkon-tropfen` in bewegung.css verschieben den gezeichneten Tropfen um (x − ENDE.x, y − ENDE.y). */
export const WEG = [
  { name: 'regen', x: 48, y: 30, anteil: 0 },
  { name: 'landet', x: 48, y: 63.9, anteil: 0.15 },
  { name: 'kante', x: 196, y: 74.26, anteil: 0.79 },
  { name: 'ueber-kante', x: 209, y: 86, anteil: 0.87 },
  { name: 'rinne', x: 209, y: 116, anteil: 1 },
] as const;
