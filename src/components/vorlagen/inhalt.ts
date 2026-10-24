// Inhaltsmodell der Seitenvorlagen (KERN v3 K-009 Seitenformel, E-025): Jede Erzähl-, Wissens- und Ortsseite liefert
// ihre Texte als Daten in `src/inhalte/<seite>.ts`; die Vorlage setzt daraus die sechs Abschnitte in fester Folge mit den
// Bausteinen der Startseite. Texte tragen die Auszeichnungen der Seitentexte (`[[id|Wort]]`, siehe `src/lib/textmarken.ts`)
// und werden wörtlich aus `_werkstatt/texte/<seite>.md` übernommen. Bilder nur über Kennungen aus `ARBEITEN`.
import type { ArbeitId } from '@/config/arbeiten';
import type { Kompositionsmotiv } from '@/components/kern/Fliesenkomposition';
import type { Krume } from '@/components/kern/Brotkrumen';
import type { VignettenName } from '@/components/kern/vignetten';
import type { PlanName } from '@/lib/plaene/vorgaben';

/** Text mit Textmarken (`[[id|Wort]]` = Fachwort mit Glossarerklärung beim ersten Vorkommen der Seite) */
export type Markentext = string;

export interface Verweis {
  name: string;
  href: string;
}

export type BildOderMotiv = { bild: ArbeitId; motiv?: never } | { motiv: Kompositionsmotiv; bild?: never };

/** 1 · Worum es geht */
export interface WorumInhalt {
  /** Weg ab der Startseite, die aktuelle Seite zuletzt ohne href */
  brotkrumen: Krume[];
  /** H1 in Alltagssprache */
  titel: string;
  /** Satz zum Ort (Pflichtelement des ersten Bildschirms, K-009) */
  ort: string;
  vorspann: Markentext;
  /** Einstiegsbild (das einzige preload der Seite) */
  bild?: ArbeitId;
  /** Planblatt (E-044): mit Plan steht der Einstieg wie auf der Startseite, mit Waage und Lot (sig-kreuzlinie), der H1 in
   *  festen Zeilen (sig-flucht) und dem Plan (sig-plan); `bild` ist dann das hohe Foto unter lg, `bildGross` das Querformat */
  plan?: PlanName;
  titelZeilen?: string[];
  firmensitz?: string;
  bildGross?: ArbeitId;
  /** Bewertungszeile als Kennzeile über dem Plan */
  bewertung?: boolean;
}

/** 2 · Ihre Lage: Absätze in der Stimme der Kundschaft, wahlweise Fliesen mit Link (wie auf der Startseite) */
export interface LageInhalt {
  titel: string;
  einleitung?: Markentext;
  absaetze?: Markentext[];
  fliesen?: ({ satz: string; href: string } & BildOderMotiv)[];
  /** Wege als Zeilen mit Link und Satz (z. B. die Unterseiten eines Bereichs), Muster optional */
  wege?: Zeile[];
}

/** Zeile mit Link: Name, Satz und wahlweise ein Verlegemuster als Bildzeichen */
export interface Zeile {
  name: string;
  satz?: Markentext;
  href: string;
  motiv?: Kompositionsmotiv;
}

/** Bereich als Fliese mit Zeichnung: Plan-Vignette oder Verlegemuster (Startseite, E-037) */
export type BereichFliese = { name: string; href: string } & ({ motiv: Kompositionsmotiv; vignette?: never } | { vignette: VignettenName; motiv?: never });

/** 3 · Was wir tun */
export interface TunInhalt {
  titel: string;
  einleitung?: Markentext;
  /** Bereiche oder Unterseiten als Zeilen mit Verlegemuster und Link */
  bereiche?: Zeile[];
  /** Bereiche als Fliesen mit Zeichnung (statt Zeilen) */
  bereichsfliesen?: BereichFliese[];
  /** erklärende Zeichnung unter dem Kopf (ab lg in der Kopfspalte, mobil nach dem Inhalt) mit Bildunterschrift */
  unterKopf?: { vignette: VignettenName; unterschrift: Markentext };
  /** Aussagen als Fliesen an der Fuge (eine Aussage je Fliese) */
  punkte?: Markentext[];
  /** Absatz nach den Punkten (z. B. Norm, Zuschuss) */
  absatz?: Markentext;
}

/** 4 · So läuft es ab */
export interface AblaufInhalt {
  titel: string;
  schritte: { titel: string; text: Markentext }[];
  /** Belege aus dem Faktenblatt unter den Schritten, je mit Fugenkreuz (E-040) */
  belege?: Markentext[];
  hinweis?: { text: Markentext; verweis?: Verweis };
}

/** 5 · Beleg */
export interface BelegInhalt {
  titel: string;
  fotos: { bild: ArbeitId; unterschrift: string }[];
  /** zwei Bilder desselben Vorgangs nebeneinander (kein Regler, wenn die Blickwinkel verschieden sind) */
  zweierbild?: { titel: string; bilder: [{ bild: ArbeitId; unterschrift: string }, { bild: ArbeitId; unterschrift: string }] };
  /** Kennungen aus REVIEWS, Wortlaut unverändert (G8) */
  stimmen?: string[];
  /** Satz unter den Fotos (z. B. seit wann etwas Standard ist) */
  satz?: Markentext;
  verweis?: Verweis;
  /** Orte nach Entfernung ab Aßlar mit Maßkette (Startseite, Über uns) */
  orte?: { titel: string; einleitung: Markentext };
}

/** 6 · Nächster Schritt: die eine Hauptaktion (K-004), darunter Hilfen, die nicht konkurrieren (E-012) */
export interface SchrittInhalt {
  titel: string;
  satz: Markentext;
  hilfen?: (Verweis & { satz: Markentext })[];
  /** verwandte Seiten (Wissensseiten), Namen dürfen Textmarken tragen */
  verwandte?: Verweis[];
}

export interface ErzaehlInhalt {
  /** Adresse der Seite, z. B. `/bad` */
  pfad: string;
  meta: { titel: string; beschreibung: string };
  worum: WorumInhalt;
  lage: LageInhalt;
  tun: TunInhalt;
  ablauf: AblaufInhalt;
  beleg: BelegInhalt;
  schritt: SchrittInhalt;
}

/** Ein Block der Wissensseite in „Was wir tun“: Überschrift und wahlweise Absatz, Karten, Liste, Tabelle, Zeichnung */
export interface Wissensblock {
  titel: string;
  absatz?: Markentext;
  /** Arten oder Möglichkeiten nebeneinander (Kopfzeile ohne Doppelpunkt, ein Satz) */
  karten?: { kopf: string; satz: Markentext }[];
  /** Punkte als Fliesen an der Fuge */
  liste?: Markentext[];
  tabelle?: { name: string; kopf: string[]; zeilen: string[][] };
  /** Kennung einer ruhigen Zeichnung, die die Seite über `zeichnungen` liefert */
  zeichnung?: string;
}

export interface WissenInhalt {
  pfad: string;
  meta: { titel: string; beschreibung: string };
  worum: WorumInhalt;
  lage: LageInhalt;
  wissen: Wissensblock[];
  ablauf: AblaufInhalt;
  beleg: BelegInhalt;
  schritt: SchrittInhalt;
}
