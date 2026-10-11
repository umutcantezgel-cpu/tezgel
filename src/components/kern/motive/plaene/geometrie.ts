// Geometrie der Verlegepläne je Leistung (P4-03, K-010 SVG-Formsystem, K-009 SIG-3).
// Alle Werte in Einheiten des viewBox. Jeder Plan wird im Zustand „in der Flucht“ gezeichnet: Achse auf der Mitte,
// Passstücke an beiden Rändern gleich (Bemaßung nur „=“, keine Maßzahlen). Der Rohzustand von SIG-3 entsteht allein
// durch einen Versatz des Belags (CSS translate, siehe Planblatt) – darum wird der Belag über die Feldgrenze hinaus um
// den Versatz verlängert und vom Feld beschnitten.
// Schraffur, Bemaßung „=“, Pfeile und Fugenkreuz sind Linien bzw. ein Pfad: keine Muster, keine Texte.

export type Feld = { x0: number; y0: number; x1: number; y1: number };
/** Versatz des Belags im Rohzustand (SIG-3 Ruhe); 0 | 0 = Belag steht schon in der Flucht. */
export type Versatz = { x: number; y: number };
export type Raender = { links?: boolean; rechts?: boolean; oben?: boolean; unten?: boolean };
export type Belag = { fugen: string; passstuecke: string };

/** Auf zwei Nachkommastellen runden (kurze Pfade). */
export const r = (n: number) => Math.round(n * 100) / 100;

const EPS = 0.01;

/** Bauregel prüfen: wirft beim Laden des Moduls, also spätestens im Build, nie erst im Browser. */
function pruefe(bedingung: boolean, text: string): void {
  if (!bedingung) throw new Error(`Verlegeplan: ${text}`);
}

/** Fugenlagen im Abstand `modul`, eine davon auf `mitte`; nur Lagen echt innerhalb (a0, a1). */
export function teilung(a0: number, a1: number, modul: number, mitte = (a0 + a1) / 2): number[] {
  const lagen: number[] = [];
  for (let k = Math.ceil((a0 - mitte) / modul); mitte + k * modul < a1 - EPS; k++) {
    const lage = mitte + k * modul;
    if (lage > a0 + EPS) lagen.push(r(lage));
  }
  return lagen;
}

/** Fugenlagen einer Reihe ab dem ersten Stoß bis vor das Feldende. */
export function reihe(erster: number, ende: number, modul: number): number[] {
  const lagen: number[] = [];
  for (let lage = erster; lage < ende - EPS; lage += modul) lagen.push(r(lage));
  return lagen;
}

/** Bereich, den der Belag in Ruhe und in der Flucht zusammen belegt (Feld um den Versatz verlängert). */
export function ausdehnung(feld: Feld, v: Versatz): Feld {
  return {
    x0: feld.x0 - Math.max(v.x, 0),
    x1: feld.x1 - Math.min(v.x, 0),
    y0: feld.y0 - Math.max(v.y, 0),
    y1: feld.y1 - Math.min(v.y, 0),
  };
}

/**
 * Versatz gegen eine Fugenteilung prüfen: In Ruhe darf keine Fuge über den Rand in das Feld treten (sonst stünde ein
 * unschraffiertes Randstück da) und keine Fuge das Feld verlassen (sonst fiele ein Passstück weg).
 */
function pruefeVersatz(lagen: number[], a0: number, a1: number, v: number, achse: string): void {
  if (v === 0) return;
  pruefe(lagen.length >= 2, `${achse}: mindestens zwei Fugen nötig`);
  const erste = lagen[0];
  const letzte = lagen[lagen.length - 1];
  const vorher = erste - (lagen[1] - erste);
  const nachher = letzte + (letzte - lagen[lagen.length - 2]);
  if (v > 0) pruefe(vorher < a0 - v && letzte + v < a1, `${achse}: Versatz ${v} zu groß`);
  else pruefe(nachher > a1 - v && erste + v > a0, `${achse}: Versatz ${v} zu groß`);
}

/** Rechteck als Pfad. */
export function rechteck(f: Feld): string {
  return `M${f.x0} ${f.y0}H${f.x1}V${f.y1}H${f.x0}Z`;
}

/**
 * Schraffur unter 45° auf dem Rechteck f. Die Linien liegen auf einem festen Gitter (x + y = Vielfaches des Abstands),
 * darum decken sich die Linien überlappender Flächen genau (z. B. Eckstücke, die zu zwei Rändern gehören).
 */
export function schraffur(f: Feld, abstand = 6): string {
  let d = '';
  for (let k = Math.floor((f.x0 + f.y0) / abstand) * abstand + abstand; k < f.x1 + f.y1 - EPS; k += abstand) {
    const xa = Math.max(f.x0, k - f.y1);
    const xb = Math.min(f.x1, k - f.y0);
    if (xb - xa > EPS) d += `M${r(xa)} ${r(k - xa)}L${r(xb)} ${r(k - xb)}`;
  }
  return d;
}

/** Wand im Schnitt: dichte Schraffur (Abstand 3), deutlich von Passstücken (Abstand 6) unterschieden. */
export function wandschnitt(...teile: Feld[]): string {
  return teile.map((t) => schraffur(t, 3)).join('');
}

/**
 * Kreuzfuge (auch Rechteckformat): durchgehende Fugen. Passstücke an den gewählten Rändern schraffiert, jeweils vom
 * verlängerten Rand bis zur ersten bzw. letzten Fuge.
 */
export function kreuzfuge(feld: Feld, v: Versatz, spalten: number[], zeilen: number[], raender: Raender): Belag {
  pruefeVersatz(spalten, feld.x0, feld.x1, v.x, 'Spalten');
  pruefeVersatz(zeilen, feld.y0, feld.y1, v.y, 'Zeilen');
  const g = ausdehnung(feld, v);
  const fugen = spalten.map((x) => `M${x} ${g.y0}V${g.y1}`).join('') + zeilen.map((y) => `M${g.x0} ${y}H${g.x1}`).join('');
  return { fugen, passstuecke: raenderSchraffur(g, spalten, zeilen, raender) };
}

/**
 * Verband in waagrechten Reihen (Halb-, Drittel-, wilder Verband): je Reihe eigene Stöße. Reihen zählen vom oberen
 * verlängerten Rand; `stoesse[i]` gehört zur Reihe zwischen Grenze i und i + 1. Reihenenden sind immer Passstücke.
 */
export function verband(feld: Feld, v: Versatz, zeilen: number[], stoesse: number[][], raender: Pick<Raender, 'oben' | 'unten'>): Belag {
  pruefe(stoesse.length === zeilen.length + 1, 'je Reihe eine Stoßliste');
  pruefeVersatz(zeilen, feld.y0, feld.y1, v.y, 'Reihen');
  stoesse.forEach((s, i) => pruefeVersatz(s, feld.x0, feld.x1, v.x, `Reihe ${i + 1}`));
  const g = ausdehnung(feld, v);
  const grenzen = [g.y0, ...zeilen, g.y1];
  let fugen = zeilen.map((y) => `M${g.x0} ${y}H${g.x1}`).join('');
  let passstuecke = raenderSchraffur(g, [], zeilen, raender);
  stoesse.forEach((s, i) => {
    const ya = grenzen[i];
    const yb = grenzen[i + 1];
    fugen += s.map((x) => `M${x} ${ya}V${yb}`).join('');
    passstuecke += schraffur({ x0: g.x0, x1: s[0], y0: ya, y1: yb }) + schraffur({ x0: s[s.length - 1], x1: g.x1, y0: ya, y1: yb });
  });
  return { fugen, passstuecke };
}

function raenderSchraffur(g: Feld, spalten: number[], zeilen: number[], raender: Raender): string {
  let d = '';
  if (raender.links) d += schraffur({ ...g, x1: spalten[0] });
  if (raender.rechts) d += schraffur({ ...g, x0: spalten[spalten.length - 1] });
  if (raender.oben) d += schraffur({ ...g, y1: zeilen[0] });
  if (raender.unten) d += schraffur({ ...g, y0: zeilen[zeilen.length - 1] });
  return d;
}

/** Waagrechte Maßkette bei y: Maßlinie vom ersten bis zum letzten Punkt, Maßstriche an allen Punkten. */
export function ketteWaagrecht(y: number, xs: number[]): string {
  return `M${xs[0]} ${y}H${xs[xs.length - 1]}` + stricheWaagrecht(y, xs);
}
/** Nur die Maßstriche einer waagrechten Kette (für die Striche, die mit dem Belag wandern). */
export function stricheWaagrecht(y: number, xs: number[]): string {
  return xs.map((x) => `M${x} ${y - 4}v8`).join('');
}
/** Senkrechte Maßkette bei x. */
export function ketteSenkrecht(x: number, ys: number[]): string {
  return `M${x} ${ys[0]}V${ys[ys.length - 1]}` + stricheSenkrecht(x, ys);
}
export function stricheSenkrecht(x: number, ys: number[]): string {
  return ys.map((y) => `M${x - 4} ${y}h8`).join('');
}

/** Bemaßung „=“ als zwei waagrechte Striche, mittig auf (cx | cy). */
export function gleich(cx: number, cy: number): string {
  return `M${r(cx - 3)} ${r(cy - 1.5)}h6M${r(cx - 3)} ${r(cy + 1.5)}h6`;
}

/** Pfeil auf einer Waagrechten oder Senkrechten von (xa | ya) nach (xb | yb); Spitze unter 45°. */
export function pfeil(xa: number, ya: number, xb: number, yb: number, spitze = 5): string {
  const sx = Math.sign(xb - xa);
  const sy = Math.sign(yb - ya);
  const kopf = sy !== 0
    ? `M${xb - spitze} ${yb - sy * spitze}L${xb} ${yb}L${xb + spitze} ${yb - sy * spitze}`
    : `M${xb - sx * spitze} ${yb - spitze}L${xb} ${yb}L${xb - sx * spitze} ${yb + spitze}`;
  return `M${xa} ${ya}L${xb} ${yb}${kopf}`;
}

/** Fugenkreuz (das einzige gefüllte Zeichen, K-010) mit halber Spannweite s und halber Armbreite a. */
export function fugenkreuz(cx: number, cy: number, s = 6, a = 1.5): string {
  const l = s - a;
  return `M${cx - a} ${cy - s}h${2 * a}v${l}h${l}v${2 * a}h${-l}v${l}h${-2 * a}v${-l}h${-l}v${-2 * a}h${l}z`;
}

/** Lot (senkrechte Achse) bzw. Waage (waagrechte Achse). */
export const lot = (x: number, ya: number, yb: number) => `M${x} ${ya}V${yb}`;
export const waage = (y: number, xa: number, xb: number) => `M${xa} ${y}H${xb}`;
