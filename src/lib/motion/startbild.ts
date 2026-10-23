// Großer Moment `startbild` (KERN v3 K-007): Das Startbild liegt beim Laden unter einem Belag aus Fliesen im
// Drittelverband, der Reihe für Reihe nach links abzieht (Logik des Weiterziehens von B-01, E-017). Nur beim Laden ohne
// Intro (das Intro legt die Seite selbst frei) und nie nach einem Seitenwechsel. Zeiten als Anteile von `dauer-4`.
import { ANTEIL_ZIEHEN, belegeFlaeche, versatzStufe, zeitplan, type Mass, type Verband } from '@/lib/verlegen/raster';

/** drei Fliesen je Reihe über die Bildbreite; Reihen bis unter die Unterkante eines Bilds 4 : 5 */
export const SPALTEN = 3;
export const REIHEN = 8;
/** Anteil von `dauer-4`, über den die Reihen abziehen; der Belag liegt also nur einen Augenblick still */
export const ANTEIL_DECKE = 1;

const RECHENMASS = 6;

export interface StartbildReihe {
  k: number;
  /** Versatz der Fugen nach links, in Fliesenlängen */
  versatz: number;
  beginn: number;
  dauer: number;
}

export function startbildReihen(verband: Verband = 'drittel'): StartbildReihe[] {
  const mass: Mass = { laenge: RECHENMASS, hoehe: RECHENMASS / 2, fuge: 0 };
  const breite = SPALTEN * RECHENMASS;
  const roh = belegeFlaeche(breite, REIHEN * mass.hoehe, mass, verband);
  const takte = zeitplan(roh, mass, breite, 1, 'vor', verband);
  const faktor = ANTEIL_DECKE / ANTEIL_ZIEHEN;
  const stufen = verband === 'halb' ? 2 : 3;
  const reihen: StartbildReihe[] = [];
  for (let k = 0; k < REIHEN; k++) {
    const i = roh.findIndex((f) => f.reihe === k);
    reihen.push({
      k,
      versatz: versatzStufe(k, verband) / stufen,
      beginn: takte[i].ziehenBeginn * faktor,
      dauer: takte[i].ziehenDauer * faktor,
    });
  }
  return reihen;
}
