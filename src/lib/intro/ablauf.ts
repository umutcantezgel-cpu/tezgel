// Ersatz-Intro „Der erste Boden“ (B-02, E-018): Ablauf als Anteile von --intro-gesamt, reine Logik ohne DOM.
// Auf einem Kalkblatt mit Fugenraster legt sich in der Mitte eine kleine Fläche im Drittelverband (Logik von B-01), darauf
// erscheint das Logo; dann gleitet es an den Platz des Kopf-Logos, während das Blatt Reihe für Reihe nach links abzieht.
// Alle Zeiten sind Anteile der Gesamtdauer, damit das Token allein den Takt bestimmt (K-005).
import {
  ANTEIL_LEGEN,
  ANTEIL_ZIEHEN,
  belegeFlaeche,
  versatzStufe,
  zeitplan,
  type Mass,
  type Verband,
} from '@/lib/verlegen/raster';

/** Speicher für „schon gesehen“ (localStorage, ein Eintrag je Browser) */
export const SPEICHER_INTRO = 'tezgel-intro';

/** Logo-Datei (UNANTASTBAR, dieselbe wie im Kopf). */
export const INTRO_LOGO_DATEI = '/images/logo/tezgel-logo.webp';
/** Das Logo auf der Fläche über den Bildoptimierer in 640 px (wie das Kopf-Logo, AVIF etwa 9,5 KB statt 19,5 KB als WebP):
 *  Form und Proportion bleiben, die frühe Anfrage konkurriert weniger mit dem Startbild (E-034). Feste Adresse, damit das
 *  Kopfskript beim ersten Besuch genau die Datei holt, die das Bild danach aus dem Speicher nimmt. 640 und 75 sind in Next
 *  Standard (deviceSizes, qualities). */
export const INTRO_LOGO = `/_next/image?url=${encodeURIComponent(INTRO_LOGO_DATEI)}&w=640&q=75`;

/** Obergrenze des Intros in ms ab dem Kopfskript (KERN K-007: Ziel 1.600 ms über --intro-gesamt, Grenze 2.200 ms). */
export const INTRO_GRENZE = 2200;

/** Die Fläche: drei Fliesen breit, drei Reihen hoch. */
export const SPALTEN = 3;
export const REIHEN = 3;
/** Reihen des Blatts über und unter der Fläche: decken bis 1.440 px Höhe auch bei der kleinsten Fliese (96 px). */
export const REIHEN_AUSSEN = 14;

/** Phasen: Beginn und Länge als Anteile der Gesamtdauer (1.600 ms: legen 80–624 ms, Logo 448–752 ms, deckend bis 800 ms). */
export const PHASEN = {
  legen: { beginn: 0.05, anteil: 0.34 },
  logo: { beginn: 0.28, anteil: 0.19 },
  gleiten: { beginn: 0.5, anteil: 0.375 },
  ziehen: { beginn: 0.5, anteil: 0.44 },
} as const;

/** Rechenmaß der Fliesenlänge, durch 3 teilbar, damit jeder Versatz ganzzahlig bleibt; ausgegeben wird in Fliesenlängen. */
const RECHENMASS = 6;

export interface Phase {
  beginn: number;
  dauer: number;
}

export interface IntroFliese extends Phase {
  /** linke Kante ab der linken Flächenkante, in Fliesenlängen (negativ: ragt links über) */
  links: number;
  reihe: number;
  /** Stapelreihenfolge: früher gelegt liegt oben (wie B-01) */
  ebene: number;
}

export interface IntroReihe extends Phase {
  /** Reihe ab der ersten Flächenreihe (negativ: darüber) */
  k: number;
  /** Versatz der Fugen nach links, in Fliesenlängen */
  versatz: number;
}

export interface IntroAblauf {
  fliesen: IntroFliese[];
  reihen: IntroReihe[];
  logo: Phase;
  gleiten: Phase;
  /** Ende der deckenden Phase: ab hier wird die Seite sichtbar */
  decken: number;
}

export function introAblauf(verband: Verband = 'drittel'): IntroAblauf {
  const mass: Mass = { laenge: RECHENMASS, hoehe: RECHENMASS / 2, fuge: 0 };
  const breite = SPALTEN * RECHENMASS;
  const roh = belegeFlaeche(breite, REIHEN * mass.hoehe, mass, verband);
  const takte = zeitplan(roh, mass, breite, 1, 'vor', verband);
  const legen = PHASEN.legen.anteil / ANTEIL_LEGEN;
  const ziehen = PHASEN.ziehen.anteil / ANTEIL_ZIEHEN;

  const fliesen = roh.map((f, i) => ({
    links: f.x / RECHENMASS,
    reihe: f.reihe,
    beginn: PHASEN.legen.beginn + takte[i].legenBeginn * legen,
    dauer: takte[i].legenDauer * legen,
    ebene: takte[i].ebene,
  }));

  // Weiterziehen wie B-01: jede Reihe starr, Einsatz nach ihrer Versatzstufe; die Stufen stammen aus den Flächenreihen.
  const nachStufe = new Map<number, Phase>();
  roh.forEach((f, i) => {
    const s = versatzStufe(f.reihe, verband);
    if (!nachStufe.has(s)) {
      nachStufe.set(s, {
        beginn: PHASEN.ziehen.beginn + takte[i].ziehenBeginn * ziehen,
        dauer: takte[i].ziehenDauer * ziehen,
      });
    }
  });
  const stufen = verband === 'halb' ? 2 : 3;
  const reihen: IntroReihe[] = [];
  for (let k = -REIHEN_AUSSEN; k < REIHEN + REIHEN_AUSSEN; k++) {
    const s = versatzStufe(k, verband);
    reihen.push({ k, versatz: s / stufen, ...(nachStufe.get(s) as Phase) });
  }

  return {
    fliesen,
    reihen,
    logo: { beginn: PHASEN.logo.beginn, dauer: PHASEN.logo.anteil },
    gleiten: { beginn: PHASEN.gleiten.beginn, dauer: PHASEN.gleiten.anteil },
    decken: Math.min(...reihen.map((r) => r.beginn)),
  };
}
