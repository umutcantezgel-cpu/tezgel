// Inhaltsmodell der Seitenvorlagen (KERN v3 K-009 Seitenformel, E-025): Jede Erzähl-, Wissens- und Ortsseite liefert
// ihre Texte als Daten in `src/inhalte/<seite>.ts`; die Vorlage setzt daraus die sechs Abschnitte in fester Folge mit den
// Bausteinen der Startseite. Texte tragen die Auszeichnungen der Seitentexte (`[[id|Wort]]`, siehe `src/lib/textmarken.ts`)
// und werden wörtlich aus `_werkstatt/texte/<seite>.md` übernommen. Bilder nur über Kennungen aus `ARBEITEN`.
import type { ArbeitId } from '@/config/arbeiten';
import type { Kompositionsmotiv } from '@/components/kern/Fliesenkomposition';
import type { Krume } from '@/components/kern/Brotkrumen';

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
}

/** 2 · Ihre Lage: Absätze in der Stimme der Kundschaft, wahlweise Fliesen mit Link (wie auf der Startseite) */
export interface LageInhalt {
  titel: string;
  absaetze?: Markentext[];
  fliesen?: ({ satz: string; href: string } & BildOderMotiv)[];
}

/** 3 · Was wir tun */
export interface TunInhalt {
  titel: string;
  einleitung?: Markentext;
  /** Bereiche oder Unterseiten als Zeilen mit Verlegemuster und Link */
  bereiche?: { name: string; satz?: Markentext; href: string; motiv: Kompositionsmotiv }[];
  /** Aussagen als Fliesen an der Fuge (eine Aussage je Fliese) */
  punkte?: Markentext[];
  /** Absatz nach den Punkten (z. B. Norm, Zuschuss) */
  absatz?: Markentext;
}

/** 4 · So läuft es ab */
export interface AblaufInhalt {
  titel: string;
  schritte: { titel: string; text: Markentext }[];
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
  verweis?: Verweis;
}

/** 6 · Nächster Schritt: die eine Hauptaktion (K-004), darunter Hilfen, die nicht konkurrieren (E-012) */
export interface SchrittInhalt {
  titel: string;
  satz: Markentext;
  hilfen?: (Verweis & { satz: Markentext })[];
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
