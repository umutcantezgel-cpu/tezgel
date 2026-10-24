// Seitenwechsel B-01 „Verlegen“ (KERN K-007, E-043, Fassung v3 nach E-047): Fliesenraster, Zeitpläne und Logo auf der
// Wand, reine Logik ohne DOM. Fliese 2:1 quer im Drittelverband (Halbverband als Alternative), Fuge 1 % der kurzen Seite,
// mindestens 2 px. Große, ruhige Fliesen (Auftraggeber: „nicht so verpixelt“): sichtbar 3 je Reihe bei 390 px, 6 bis 7 bei
// 1440 px, höchstens 80 gleichzeitig.

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

/** Fliesenlängen je Reihe (Breite durch Länge) bei 390 px und bei 1440 px (E-047: größere Fliesen, ruhigere Fugen). Im
 *  Drittelverband ragen die Reihen über den Rand; sichtbar sind damit 3 Fliesen je Reihe bei 390 px und 6 bis 7 bei 1440 px
 *  (vorher 3 bis 4 und 8 bis 9). */
export const JE_REIHE_SCHMAL = 2.25;
export const JE_REIHE_BREIT = 6;

/** Fliesenlängen je Reihe: 2,25 bei 390 px, 6 bei 1440 px, dazwischen linear, außerhalb begrenzt (2 bis 6). */
export function fliesenJeReihe(breite: number): number {
  const n = JE_REIHE_SCHMAL + ((breite - 390) * (JE_REIHE_BREIT - JE_REIHE_SCHMAL)) / 1050;
  return Math.min(JE_REIHE_BREIT, Math.max(2, n));
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

/** Gesamtdauer eines Wechsels (Belegen plus Abnehmen; Warten und Logo-Halt kommen dazu): 2400 ms beim ersten Wechsel einer
 *  Sitzung, 1800 ms ab dem zweiten (E-047, Auftraggeber: „die Animation muss nicht so schnell gehen“; vorher 1800/1400 ms).
 *  Laufzeitquelle sind die Tokens --verlegen-gesamt und --verlegen-gesamt-folge (K-005); die Tests halten beide gleich. */
export const GESAMT_ERSTER = 2400;
export const GESAMT_FOLGE = 1800;

/** Dauer eines Wechsels: erster einer Sitzung, folgende, Zurück und Vor mit 70 %. */
export function wechselDauer(erster: number, folge: number, schonGewechselt: boolean, richtung: Richtung): number {
  const basis = schonGewechselt ? folge : erster;
  return richtung === 'zurueck' ? Math.round(basis * ANTEIL_ZURUECK) : basis;
}

// B-01 Fliese für Fliese (E-043, Auftraggeber; Fassung v3 nach E-047) ----------------------------------------------------
// Seit E-043 legt B-01 die ganze Ansicht Fliese für Fliese und nimmt die Fliesen einzeln wieder ab (stueckplan). Der
// zeitplan oben (Verlegen und reihenweises Weiterziehen, E-017) bleibt die Grundlage von Intro (B-02) und Startbild.
// v3 (E-047): größere Fliesen, längere Dauer, jede Fliese beginnt allein im gleichen Takt (keine Welle), und sobald der
// Boden liegt, klatscht das Logo auf die Wand (unten).

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

/** Kaskade in einer Spalte: Die Fliesen setzen von oben nach unten nacheinander auf, verteilt über den ganzen Schlag; die
 *  erste Fliese der nächsten Spalte folgt im selben Abstand auf die letzte. So beginnt jede Fliese allein und alle im gleichen
 *  Takt von der Startkante her (v3, E-047: „wirklich Stück für Stück“; vorher über den halben Schlag, die Spalte las sich als
 *  Welle). */
export const KASKADE_ANTEIL = 1;
/** Flugdauer je Fliese beim Legen in Schlägen: Eine Fliese ist gelandet, wenn die nächste Spalte zur Hälfte begonnen hat; in
 *  der Luft sind so höchstens etwa halb so viele Fliesen, wie eine Spalte hat (v3; vorher ein ganzer Schlag, bis zu 13). */
export const FLUG_SCHLAEGE = 0.5;
/** Dauer des Zurückweichens je Fliese beim Abnehmen in Schlägen. */
export const WEICHEN_SCHLAEGE = 1.5;

/**
 * Stückplan je Fliese für eine Gesamtdauer (E-043, Auftraggeber; v3 E-047): Die ganze Ansicht wird Fliese für Fliese belegt,
 * von der Startkante her (vor: rechts, zurueck: links), Spalte für Spalte im gleichen Schlag; in jeder Spalte setzen die
 * Fliesen von oben nach unten nacheinander auf, gleichmäßig über den ganzen Schlag verteilt, so dass zwischen zwei Fliesen
 * immer derselbe Abstand liegt und keine zwei zugleich beginnen. Liegt alles, wechselt darunter die Seite (und das Logo
 * klatscht auf die Wand); dann werden die Fliesen in derselben Reihenfolge einzeln abgenommen und weichen in den
 * Hintergrund zurück. Später gelegte Fliesen liegen oben: Im Flug werfen sie ihren Schatten auf die schon gelegten.
 */
export function stueckplan(fliesen: Fliese[], mass: Mass, breite: number, gesamt: number, richtung: Richtung): Stuecktakt[] {
  const legenPhase = gesamt * STUECK_ANTEIL_LEGEN;
  const abnehmenPhase = gesamt * STUECK_ANTEIL_ABNEHMEN;
  const spalten = stueckSpalten(fliesen, mass, breite, richtung);
  const reihen = Math.max(0, ...fliesen.map((f) => f.reihe)) + 1;
  // Versatz in Schlägen: Spalte plus Platz in der Kaskade (Reihe r von R beginnt bei r/R des Schlags)
  const versatz = fliesen.map((f, i) => spalten[i] + (KASKADE_ANTEIL * f.reihe) / reihen);
  const letzter = Math.max(0, ...versatz);
  // Phase = Versatz der letzten Fliese + ihr Flug (bzw. ihr Zurückweichen), alles in Schlägen
  const legenSchlag = legenPhase / (letzter + FLUG_SCHLAEGE);
  const abnehmenSchlag = abnehmenPhase / (letzter + WEICHEN_SCHLAEGE);
  const reihenfolge = fliesen.map((_, i) => i).sort((a, b) => versatz[a] - versatz[b] || a - b);
  const ebene = new Array<number>(fliesen.length);
  reihenfolge.forEach((i, rang) => {
    ebene[i] = rang + 1;
  });
  return fliesen.map((_, i) => ({
    legenBeginn: versatz[i] * legenSchlag,
    legenDauer: FLUG_SCHLAEGE * legenSchlag,
    abnehmenBeginn: versatz[i] * abnehmenSchlag,
    abnehmenDauer: WEICHEN_SCHLAEGE * abnehmenSchlag,
    ebene: ebene[i],
  }));
}

// Logo auf der Wand (v3, E-047; Auftraggeber: „Fliesenleger Tezgel mit dem Logo auf die Wand geklatscht“) ---------------
// Sobald der Boden liegt, klatscht mittig das Logo der Firma auf die Wand, dieselbe Datei wie im Kopf (Form, Farbe und
// Proportion unverändert, G8; nur skaliert). Die Farbe des Seitenwechsels kommt allein aus dem Logo, die Fliesen bleiben
// neutral. Beim Abnehmen geht es mit den ersten Fliesen.

/** Aufklatschen: etwas größer und durchsichtig, nach 220 ms deckend in voller Größe auf der Wand (ease-aufsetzen, ohne
 *  Nachfedern; nur transform und opacity). */
export const LOGO_GROESSE_START = 1.15;
export const LOGO_AUFKLATSCHEN = 220;
/** Danach steht das Logo mindestens so lange, auch wenn die neue Seite früher bereit ist (nur nach einem Klick; Zurück und
 *  Vor ohne Mindestzeit). */
export const LOGO_STEHEN = 450;
/** Beim Abnehmen blendet das Logo mit den ersten Fliesen aus. */
export const LOGO_WEG = 200;
/** Seitenverhältnis der Logo-Datei (640 × 200 px). */
export const LOGO_SEITENVERHAELTNIS = 3.2;
/** Logobreite: 76 % der Ansicht (mobil), auf breiten Ansichten ein Drittel, mindestens 480 px; höchstens die Dateibreite
 *  (640 px, nie hochgerechnet bei einfacher Pixeldichte) und so, dass es höchstens 30 % der Höhe einnimmt (Telefon quer). */
export const LOGO_ANTEIL_BREITE = 0.76;
export const LOGO_BREITE_GROSS = 480;
export const LOGO_BREITE_HOECHSTENS = 640;
export const LOGO_ANTEIL_HOEHE = 0.3;
/** Raster der Logogröße: je 32 px Breite 10 px Höhe (3,2 : 1), so sind Breite und Höhe ganze Pixel (scharf, unverzerrt). */
const LOGO_SCHRITT_BREITE = 32;
const LOGO_SCHRITT_HOEHE = 10;

export interface Logomass {
  x: number;
  y: number;
  breite: number;
  hoehe: number;
}

/** Lage und Größe des Logos in einer Ansicht: mittig, ganze Pixel, Seitenverhältnis genau 3,2. */
export function logoMass(breite: number, hoehe: number): Logomass {
  const ziel = Math.min(
    breite * LOGO_ANTEIL_BREITE,
    Math.max(breite / 3, LOGO_BREITE_GROSS),
    LOGO_BREITE_HOECHSTENS,
    hoehe * LOGO_ANTEIL_HOEHE * LOGO_SEITENVERHAELTNIS,
  );
  const schritte = Math.max(1, Math.floor(ziel / LOGO_SCHRITT_BREITE));
  const b = schritte * LOGO_SCHRITT_BREITE;
  const h = schritte * LOGO_SCHRITT_HOEHE;
  return { x: Math.round((breite - b) / 2), y: Math.round((hoehe - h) / 2), breite: b, hoehe: h };
}

/** Mindestzeit vom Liegen des Bodens bis zum Abnehmen nach einem Klick (ms): Aufklatschen plus Stehen. Bei reduzierter
 *  Bewegung ist das Logo schon mit der Blende eingeblendet und steht nur. */
export function logoHalt(ruhig: boolean): number {
  return (ruhig ? 0 : LOGO_AUFKLATSCHEN) + LOGO_STEHEN;
}
