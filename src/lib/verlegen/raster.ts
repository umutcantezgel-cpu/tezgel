// Seitenwechsel B-01 „Verlegen“ (KERN K-007, E-043): Fliesenraster und Zeitpläne, reine Logik ohne DOM.
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
  return richtung === 'zurueck' ? Math.round(basis * ANTEIL_ZURUECK) : basis;
}

// B-01 Fliese für Fliese (E-043, Auftraggeber) --------------------------------------------------------------------------
// Seit E-043 legt B-01 die ganze Ansicht Fliese für Fliese und nimmt die Fliesen einzeln wieder ab (stueckplan). Der
// zeitplan oben (Verlegen und reihenweises Weiterziehen, E-017) bleibt die Grundlage von Intro (B-02) und Startbild.

/** Anteile der Gesamtdauer: Belegen die erste Hälfte, Abnehmen die zweite; das Warten auf die neue Seite kommt dazu. */
export const STUECK_ANTEIL_LEGEN = 0.5;
export const STUECK_ANTEIL_ABNEHMEN = 0.5;
/** Legen: Die Fliese schwebt etwas größer über ihrem Platz, ein kurzes Stück zur Startkante hin, und setzt hart auf (tak). */
export const AUFSETZEN_FLUG = 0.12;
export const AUFSETZEN_GROESSE = 1.12;
/** Abnehmen: Die Fliese weicht in den Hintergrund zurück (wird kleiner und verschwindet). */
export const GROESSE_HINTERGRUND = 0.6;

export interface Stuecktakt {
  /** Beginn des Legens ab Phasenbeginn (ms) */
  legenBeginn: number;
  legenDauer: number;
  /** Beginn des Abnehmens ab Phasenbeginn (ms) */
  abnehmenBeginn: number;
  abnehmenDauer: number;
  /** Stapelreihenfolge: später gelegt liegt oben (die Fliese im Flug wirft ihren Schatten auf die gelegten) */
  ebene: number;
}

/** Abstand einer Fliese von der Startkante in Fliesenlängen (vor: rechte Kante, zurueck: linke Kante; überstehende < 0). */
function abstandStueck(f: Fliese, breite: number, laenge: number, richtung: Richtung): number {
  return (richtung === 'vor' ? breite - (f.x + laenge) : f.x) / laenge;
}

/**
 * Spalten ab der Startkante (0 = an der Startkante): je Reihe eine Fliese, deren Abstand in dasselbe Band von einer
 * Fliesenlänge fällt; im Drittelverband ist jede Spalte eine Treppe, die Spalten zusammen ergeben das Zickzack.
 */
export function stueckSpalten(fliesen: Fliese[], mass: Mass, breite: number, richtung: Richtung): number[] {
  const abstand = fliesen.map((f) => abstandStueck(f, breite, mass.laenge, richtung));
  const kleinster = Math.min(...abstand);
  return abstand.map((a) => Math.floor(a - kleinster + 1e-6));
}

/** Kaskade in einer Spalte: Die Fliesen setzen von oben nach unten nacheinander auf, verteilt über diesen Anteil des Schlags. */
export const KASKADE_ANTEIL = 0.5;
/** Flugdauer je Fliese beim Legen in Schlägen: Eine Spalte ist gelandet, wenn die übernächste beginnt (tak, tak, tak). */
export const FLUG_SCHLAEGE = 1;
/** Dauer des Zurückweichens je Fliese beim Abnehmen in Schlägen. */
export const WEICHEN_SCHLAEGE = 1.5;

/**
 * Stückplan je Fliese für eine Gesamtdauer (E-043, Auftraggeber): Die ganze Ansicht wird Fliese für Fliese belegt, von der
 * Startkante her (vor: rechts, zurueck: links), Spalte für Spalte im gleichen Schlag; in jeder Spalte setzen die Fliesen
 * von oben nach unten nacheinander auf. Bei bis zu 80 Fliesen in der halben Gesamtdauer kann nicht jede Fliese einen
 * eigenen hörbaren Schlag haben (das wären 5 bis 10 ms je Fliese, eine Welle); so bekommt jede Spalte ihren Schlag und
 * jede Fliese ihr eigenes Aufsetzen. Liegt alles, wechselt darunter die Seite; dann werden die Fliesen in derselben
 * Reihenfolge einzeln abgenommen und weichen in den Hintergrund zurück. Später gelegte Fliesen liegen oben: Im Flug werfen
 * sie ihren Schatten auf die schon gelegten.
 */
export function stueckplan(fliesen: Fliese[], mass: Mass, breite: number, gesamt: number, richtung: Richtung): Stuecktakt[] {
  const legenPhase = gesamt * STUECK_ANTEIL_LEGEN;
  const abnehmenPhase = gesamt * STUECK_ANTEIL_ABNEHMEN;
  const spalten = stueckSpalten(fliesen, mass, breite, richtung);
  const letzteSpalte = Math.max(0, ...spalten);
  const letzteReihe = Math.max(1, ...fliesen.map((f) => f.reihe));
  // Phase = letzte Spalte · Schlag + Kaskade + Flug der letzten Fliese, alles in Schlägen
  const legenSchlag = legenPhase / (letzteSpalte + KASKADE_ANTEIL + FLUG_SCHLAEGE);
  const abnehmenSchlag = abnehmenPhase / (letzteSpalte + KASKADE_ANTEIL + WEICHEN_SCHLAEGE);
  const versatz = (i: number) => spalten[i] + (KASKADE_ANTEIL * fliesen[i].reihe) / letzteReihe;
  const reihenfolge = fliesen.map((_, i) => i).sort((a, b) => versatz(a) - versatz(b) || a - b);
  const ebene = new Array<number>(fliesen.length);
  reihenfolge.forEach((i, rang) => {
    ebene[i] = rang + 1;
  });
  return fliesen.map((_, i) => ({
    legenBeginn: versatz(i) * legenSchlag,
    legenDauer: FLUG_SCHLAEGE * legenSchlag,
    abnehmenBeginn: versatz(i) * abnehmenSchlag,
    abnehmenDauer: WEICHEN_SCHLAEGE * abnehmenSchlag,
    ebene: ebene[i],
  }));
}
