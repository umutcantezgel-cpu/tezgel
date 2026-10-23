// Seitenwechsel B-01 „Verlegen“ (KERN K-007): Fliesenraster und Zeitplan, reine Logik ohne DOM.
// Fliese 2:1 quer im Drittelverband (Halbverband als Alternative), Fuge 1 % der kurzen Seite, mindestens 2 px.
// Etwa 3 Fliesen je Reihe bei 390 px, 8 bei 1440 px, höchstens 80 gleichzeitig.

export type Verband = 'drittel' | 'halb';
/** vor: Verlegekante von rechts nach links (Klick) · zurueck: gespiegelt (Zurück und Vor im Browser). */
export type Richtung = 'vor' | 'zurueck';

export interface Mass {
  laenge: number;
  hoehe: number;
  fuge: number;
}

export interface Fliese {
  x: number;
  y: number;
  breite: number;
  hoehe: number;
  reihe: number;
}

export interface Takt {
  /** Beginn des Verlegens ab Phasenbeginn (ms) */
  legenBeginn: number;
  legenDauer: number;
  /** Beginn des Weiterziehens ab Phasenbeginn (ms) */
  ziehenBeginn: number;
  ziehenDauer: number;
  /** Stapelreihenfolge: früher gelegt liegt oben, so kommt jede neue Fliese unter der gelegten Kante hervor */
  ebene: number;
}

export const HOECHSTZAHL = 80;
export const FUGE_ANTEIL = 0.01;
export const FUGE_MIN = 2;
/** Anteile der Gesamtdauer (Auftrag Abschnitt 9): Verlegen rund 45 %, Weiterziehen rund 40 %. */
export const ANTEIL_LEGEN = 0.45;
export const ANTEIL_ZIEHEN = 0.4;
/** Zurück und Vor: gespiegelt mit 70 % der Dauer. */
export const ANTEIL_ZURUECK = 0.7;
/** Flug beim Verlegen höchstens ¼ der Fliesenlänge. */
export const FLUG_ANTEIL = 0.25;
export const GROESSE_FLUG = 1.06;

/** Fliesen je Reihe: 3 bei 390 px, 8 bei 1440 px, dazwischen linear, außerhalb begrenzt. */
export function fliesenJeReihe(breite: number): number {
  const n = 3 + ((breite - 390) * 5) / 1050;
  return Math.min(8, Math.max(2.5, n));
}

/** Stufe des Versatzes einer Reihe: 0, 1, 2 im Drittelverband, 0, 1 im Halbverband (auch für Reihen über der ersten). */
export function versatzStufe(reihe: number, verband: Verband): number {
  const n = verband === 'halb' ? 2 : 3;
  return ((reihe % n) + n) % n;
}
const stufe = versatzStufe;

/** Versatz in ganzen Pixeln, damit keine Haarlinien zwischen den Fliesen entstehen. */
function versatz(reihe: number, laenge: number, verband: Verband): number {
  return Math.round((stufe(reihe, verband) * laenge) / (verband === 'halb' ? 2 : 3));
}

function zaehle(breite: number, hoehe: number, laenge: number, verband: Verband): number {
  const reihen = Math.ceil(hoehe / (laenge / 2));
  let summe = 0;
  for (let r = 0; r < reihen; r++) summe += Math.ceil((breite + versatz(r, laenge, verband)) / laenge);
  return summe;
}

/** Fliesenmaß für eine Ansicht in ganzen Pixeln (Länge gerade, Höhe = halbe Länge); wächst, bis höchstens 80 Fliesen decken. */
export function fliesenmass(breite: number, hoehe: number, verband: Verband = 'drittel'): Mass {
  let laenge = 2 * Math.round(breite / fliesenJeReihe(breite) / 2);
  while (zaehle(breite, hoehe, laenge, verband) > HOECHSTZAHL) laenge += 2;
  const kurz = laenge / 2;
  return { laenge, hoehe: kurz, fuge: Math.max(FUGE_MIN, kurz * FUGE_ANTEIL) };
}

/** Fliesen eines festen Maßes, die eine Fläche ganz decken (Ränder dürfen überstehen); auch für das Intro (E-018). */
export function belegeFlaeche(breite: number, hoehe: number, mass: Mass, verband: Verband = 'drittel'): Fliese[] {
  const fliesen: Fliese[] = [];
  const reihen = Math.ceil(hoehe / mass.hoehe);
  for (let r = 0; r < reihen; r++) {
    for (let x = -versatz(r, mass.laenge, verband); x < breite; x += mass.laenge) {
      fliesen.push({ x, y: r * mass.hoehe, breite: mass.laenge - mass.fuge, hoehe: mass.hoehe - mass.fuge, reihe: r });
    }
  }
  return fliesen;
}

/** Alle Fliesen, die die Ansicht ganz decken (Ränder dürfen überstehen). */
export function verlegeRaster(breite: number, hoehe: number, verband: Verband = 'drittel'): { mass: Mass; fliesen: Fliese[] } {
  const mass = fliesenmass(breite, hoehe, verband);
  return { mass, fliesen: belegeFlaeche(breite, hoehe, mass, verband) };
}

/** Rang einer Fliese ab der Startkante, gemessen an der Kante, die zuerst gelegt wird. */
function abstandStartkante(f: Fliese, breite: number, laenge: number, richtung: Richtung): number {
  return richtung === 'vor' ? breite - (f.x + laenge) : f.x;
}

/** Spaltentakt: ganze Spalten im Abstand s, innerhalb der Spalte nach dem Versatz mit höchstens ¼ s gestaffelt. */
function taktwert(abstand: number, laenge: number): number {
  const a = Math.max(0, abstand);
  return Math.floor(a / laenge) + 0.25 * ((a % laenge) / laenge);
}

/** Anteil der Verlege-Phase, den eine einzelne Fliese braucht (der Rest ist Versatz zwischen den Spalten). */
export const ANTEIL_FLIESE = 0.45;
/** Anteil der Weiterzieh-Phase, über den die Reihen nach ihrer Versatzstufe nacheinander einsetzen (E-017). */
export const ANTEIL_REIHENVERSATZ = 0.15;
const ANTEIL_REIHE = 1 - ANTEIL_REIHENVERSATZ;

/**
 * Zeitplan je Fliese für eine Gesamtdauer (E-017).
 * Verlegen: von der Startkante her Spalte für Spalte, innerhalb der Spalte nach dem Versatz gestaffelt; jede neue Fliese
 * liegt unter den schon gelegten (Stapelreihenfolge), so überfliegt keine eine gelegte.
 * Weiterziehen: Jede Reihe zieht starr ab (gleiche Strecke, Kurve und Dauer für alle ihre Fliesen, also kein Überholen und
 * keine Schlitze); die Reihen setzen nach ihrer Versatzstufe nacheinander ein. Die Freigabekante folgt dem Verband und
 * wandert von rechts nach links, die Spalten verlassen das Bild nacheinander (Auftrag Abschnitt 9).
 */
export function zeitplan(
  fliesen: Fliese[],
  mass: Mass,
  breite: number,
  gesamt: number,
  richtung: Richtung,
  verband: Verband = 'drittel',
): Takt[] {
  const legenPhase = gesamt * ANTEIL_LEGEN;
  const ziehenPhase = gesamt * ANTEIL_ZIEHEN;
  const legenDauer = legenPhase * ANTEIL_FLIESE;
  const ziehenDauer = ziehenPhase * ANTEIL_REIHE;
  const stufen = verband === 'halb' ? 2 : 3;
  const legenWerte = fliesen.map((f) => taktwert(abstandStartkante(f, breite, mass.laenge, richtung), mass.laenge));
  const legenMax = Math.max(1, ...legenWerte);
  const reihenfolge = legenWerte.map((w, i) => [w, i] as const).sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const ebene = new Array<number>(fliesen.length);
  reihenfolge.forEach(([, i], rang) => {
    ebene[i] = fliesen.length - rang;
  });
  return fliesen.map((_, i) => ({
    legenBeginn: (legenWerte[i] / legenMax) * (legenPhase - legenDauer),
    legenDauer,
    ziehenBeginn: (stufe(fliesen[i].reihe, verband) / (stufen - 1)) * (ziehenPhase - ziehenDauer),
    ziehenDauer,
    ebene: ebene[i],
  }));
}

/** Strecke des Weiterziehens: für alle Fliesen gleich, damit keine eine andere überholt. */
export function ziehStrecke(mass: Mass, breite: number): number {
  return breite + mass.laenge;
}

/** Dauer eines Wechsels: erster einer Sitzung, folgende, Zurück und Vor mit 70 %. */
export function wechselDauer(erster: number, folge: number, schonGewechselt: boolean, richtung: Richtung): number {
  const basis = schonGewechselt ? folge : erster;
  return richtung === 'zurueck' ? basis * ANTEIL_ZURUECK : basis;
}
