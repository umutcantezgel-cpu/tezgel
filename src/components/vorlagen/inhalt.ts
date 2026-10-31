// Inhaltsmodell der Seitenvorlagen (KERN v3 K-009 Seitenformel, E-025): Jede Erzähl-, Wissens- und Ortsseite liefert
// ihre Texte als Daten in `src/inhalte/<seite>.ts`; die Vorlage setzt daraus die sechs Abschnitte in fester Folge mit den
// Bausteinen der Startseite. Texte tragen die Auszeichnungen der Seitentexte (`[[id|Wort]]`, siehe `src/lib/textmarken.ts`)
// und werden wörtlich aus `_werkstatt/texte/<seite>.md` übernommen. Bilder nur über Kennungen aus `ARBEITEN`.
import type { ArbeitId } from '@/config/arbeiten';
import type { GlossarId } from '@/config/glossar';
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
  /** Mittiger Einstieg, nur Startseite (UM-E3-FIX F1): H1 im Maß von „Quadratmeter.“ und Quadratmeter (titel-spalte). Die
   *  übrigen Figur-Einstiege stehen in fs-7 im Maß ihrer längsten Zeile (UM-E4-SICHT-FIX M-A1 Nr. 2, EinstiegMitte ZEILEN_EM) */
  titelGross?: boolean;
  /** Mittiger Einstieg: Strichzeichnung eines Quadratmeters mit Bemaßung an der Schnur, nur auf der Startseite (UM-E3-FIX2
   *  N5; belegt die H1 „Perfektion auf jedem Quadratmeter.“) */
  quadratmeter?: boolean;
  firmensitz?: string;
  bildGross?: ArbeitId;
  /** Bewertungszeile als Kennzeile über dem Plan (mittig: unter den Knöpfen) */
  bewertung?: boolean;
  /** Mittiger Einstieg, nur Startseite (UM-E4-START): Zuschnitt des Fotos ab lg (Kennung aus ARBEITEN, Bildauswahl je Breite
   *  im Bildplatz der Seite); sein Seitenverhältnis bemisst das Foto ab lg */
  bildQuer?: ArbeitId;
  /** Mittiger Einstieg (UM-E4-START, Sicht Anlauf 3): die Figur „An der Schnur“ geschlossen. Die Grundlinie der letzten H1-Zeile
   *  steht auf der Schnur, das rote Lot reicht bis zum Foto, das an einer Fuge hängt; mobil folgt das Foto direkt auf Hauptknopf
   *  und Telefon, erster Schritt und Bewertung darunter. Seit UM-E4-SICHT-FIX M-A1 Standard für jeden Einstieg `mitte`
   *  (ErzaehlSeite); `false` schaltet sie ab */
  schnurFigur?: boolean;
  /** Mittiger Einstieg mit Figur (UM-E4-SICHT-FIX M-A1 Nr. 3): Plan-Vignette der Seite am rechten Ende der Schnur, ab `ab`
   *  (darunter reicht die Spalte neben der H1 nicht); ihre Breite rechnet EinstiegMitte in das Maß der H1 ein */
  schnurZeichen?: { vignette: VignettenName; ab: 'lg' | 'xl' };
  /** Form des Einstiegs: `mitte` = ruhig und mittig, H1 in `titelZeilen`, darunter `ort` als eine Zeile, dann das Foto
   *  vollständig (K-016 „Ruhe“, E-047); ohne Angabe Planblatt (mit `plan`) bzw. der einfache Einstieg */
  einstieg?: 'planblatt' | 'mitte';
}

/** 2 · Ihre Lage: Absätze in der Stimme der Kundschaft, wahlweise Fliesen mit Link (wie auf der Startseite) */
export interface LageInhalt {
  titel: string;
  /** Abschnitt auf Fliese (weiß) statt Kalk, mit Fuge und Kantenkreuz an Ober- und Unterkante (Startseite, UM-E3-FIX2 N8):
   *  Die Grenze zum Einstieg wird sichtbar, und die Flächen wechseln ab da Abschnitt für Abschnitt */
  aufFliese?: boolean;
  einleitung?: Markentext;
  absaetze?: Markentext[];
  /** Auswahl je Lage; `vignette` (Startseite, UM-E4-START): die Plan-Zeichnung der Lage links in der Zeile (eine Auswahlebene
   *  statt Lagen und Leistungskarten nacheinander) */
  fliesen?: ({ satz: string; href: string; vignette?: VignettenName } & BildOderMotiv)[];
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
  /** Kopf linksbündig an der Laserlinie statt mittig (Startseite, UM-E3-FIX2 N9) */
  anDerLinie?: boolean;
  einleitung?: Markentext;
  /** Bereiche oder Unterseiten als Zeilen mit Verlegemuster und Link */
  bereiche?: Zeile[];
  /** Bereiche als Fliesen mit Zeichnung (statt Zeilen); mit Plan-Vignetten als ungleiches Raster im Drittelverband, der erste
   *  Bereich groß (UM-E3-FIX2 N9) */
  bereichsfliesen?: BereichFliese[];
  /** Leistungen als eine ruhige Zeile mit Links unter dem Kopf (Startseite, UM-E4-START: die Zeichnungen stehen in den Zeilen
   *  der Lage, hier bleiben nur die Wege) */
  leistungen?: Verweis[];
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
  /** Satz unter der Überschrift (z. B. der feste Ansprechpartner), vor den Schritten oder dem großen Moment (E3-GRAF-02) */
  einleitung?: Markentext;
  schritte: { titel: string; text: Markentext }[];
  /** Belege aus dem Faktenblatt unter den Schritten, je mit Fugenkreuz (E-040) */
  belege?: Markentext[];
  hinweis?: { text: Markentext; verweis?: Verweis };
  /** Die rote Stufenlinie der Treppe reißt beim Eintritt einmal Stufe für Stufe an (Startseite, UM-E4-START; Kennung anriss) */
  anriss?: boolean;
}

/** 5 · Beleg */
export interface BelegInhalt {
  titel: string;
  /** Fotos vollständig; ab zwei Fotos als Reihe zum Wischen, ohne Unterschrift darunter: `unterschrift` steht als Name auf
   *  der Glasfläche, `href` führt zur passenden Leistungsseite (K-016, E-047) */
  fotos: { bild: ArbeitId; unterschrift: string; href?: string }[];
  /** Reihe der Fotos im Drittelverband (K-003 Nr. 4): ab md steht jedes zweite, ab lg jedes dritte Foto (das mittlere der
   *  ersten drei) um 16 Stufen tiefer, so trägt jeder Bildschirm der Reihe genau einen Versatz (Startseite, UM-E3-FIX F4) */
  fotosVersatz?: boolean;
  /** Namen der Fotos ohne Maus auf jeder Breite auf dem kurzen Verlauf wie mobil, nicht als Tintenblock unter dem Foto (nur
   *  Startseite, UM-E4-START; der Block bleibt bei großer Systemschrift) */
  fotosVerlauf?: boolean;
  /** zwei Bilder desselben Vorgangs nebeneinander (kein Regler, wenn die Blickwinkel verschieden sind) */
  zweierbild?: { titel: string; bilder: [{ bild: ArbeitId; unterschrift: string }, { bild: ArbeitId; unterschrift: string }] };
  /** Kennungen aus REVIEWS, Wortlaut unverändert (G8) */
  stimmen?: string[];
  /** Kundenstimmen groß (Startseite, Über uns, Unsere Arbeiten: drei Karten ab lg); sonst das kleine Karussell jeder Seite
   *  (vier Karten ab lg, eine Stufe kleinere Schrift; K-016, E-047) */
  stimmenGross?: boolean;
  /** eine große Stimme je Schritt (Startseite, UM-E3-FIX F4): das langsame Karussell zeigt auf jeder Breite eine Stimme, ab md
   *  Sterne und Name im ersten Drittel, der Wortlaut in den zwei Dritteln dahinter an der Fuge; geht `stimmenGross` vor */
  stimmenEinzeln?: boolean;
  /** Kundenstimmen auf Kalk statt auf Fliese, nur die Fläche (UM-E4-CHOR-FIX): wenn danach nächster Schritt und Werkzeug auf
   *  Fliese folgen und sonst drei gleiche Flächen in Folge stünden (K-003 Nr. 4). Das Werkzeug mit Formular bleibt auf
   *  Fliese: Auf Kalk stünde die Abschnittsmarke neben dem Formular */
  stimmenAufKalk?: boolean;
  /** Überschrift und Satz über den Kundenstimmen, wenn der Seitentext eigene hat (Standard „Das sagen unsere Kunden.“) */
  stimmenTitel?: string;
  stimmenEinleitung?: Markentext;
  /** Form „einzeln“ (Startseite, UM-E4-START): die Karte steht ab lg um ein Drittel der Spalte versetzt (der bewusste Bruch
   *  dieses Bildschirms), und jede Stimme zeigt ihren Wortlaut bis zum letzten ganzen Satz (Wortlaut Zeichen für Zeichen
   *  gleich, nur kürzer; der ganze Text steht beim Anbieter) */
  stimmenVersatz?: boolean;
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
  /** Hilfen mit wahlweise einem Satz darunter (manche Seitentexte nennen nur den Namen) */
  hilfen?: (Verweis & { satz?: Markentext })[];
  /** verwandte Seiten (Wissensseiten), Namen dürfen Textmarken tragen */
  verwandte?: Verweis[];
}

/** Schnitt einer Bauweise im Vergleich (Zeichnung im Stil der Plan-Vignetten, `teile/Vergleich.tsx`) */
export type VergleichSchnitt = 'stelzlager' | 'splittbett' | 'gebunden';

/** Vergleich als eigener Abschnitt nach „Was wir tun“ (UM-E4-EP1, `/balkon-terrasse`): die Bauweisen als Spalten mit Schnitt,
 *  die Kriterien als Zeilen, die ab lg über alle Spalten fluchten; darunter wahlweise ein Hinweis. Gehört zu „Was wir tun“ */
export interface VergleichInhalt {
  titel: string;
  einleitung?: Markentext;
  /** Zeilen in fester Folge: Kennung (Schlüssel in `werte`) und Name des Kriteriums */
  kriterien: { id: string; name: string }[];
  /** Spalten: Name der Bauweise, ihr Schnitt und je Kriterium der Wert (Fachtext mit Textmarken: Ein Fachwort, das hier zum
   *  ersten Mal auf der Seite steht, trägt seine Erklärung in der Zelle, K-011) */
  spalten: { name: string; schnitt: VergleichSchnitt; werte: Record<string, Markentext> }[];
  /** Hinweis unter dem Vergleich: Stichwort in Fett, dann der Satz */
  hinweis?: { stichwort: string; text: Markentext };
}

/** Qualitätsversprechen (UM-E4-EP3): die acht Punkte aus `COMPANY_DATA.qualityPromises` als eigener Abschnitt nach dem
 *  Beleg, vor dem nächsten Schritt (`teile/Versprechen.tsx`). Fachwörter, die der Inhalt der Seite davor schon erklärt,
 *  findet die Vorlage selbst; `erklaert` nennt dazu, was ein Abschnitt außerhalb des Inhalts erklärt (z. B. die Werte auf
 *  /ueber-uns), damit kein Wort zweimal erklärt wird */
export interface VersprechenInhalt {
  erklaert?: GlossarId[];
}

export interface ErzaehlInhalt {
  /** Adresse der Seite, z. B. `/bad` */
  pfad: string;
  /** Leitfaden mit Präsenz (Startseite, UM-E4-START): Das Lot steht unter md auf der Satzkante (16 px) statt im Rand */
  lotAnDerSatzkante?: boolean;
  meta: { titel: string; beschreibung: string };
  worum: WorumInhalt;
  lage: LageInhalt;
  tun: TunInhalt;
  /** Vergleich nach „Was wir tun“ (z. B. die Aufbauten auf /balkon-terrasse) */
  vergleich?: VergleichInhalt;
  ablauf: AblaufInhalt;
  beleg: BelegInhalt;
  /** Qualitätsversprechen vor dem nächsten Schritt */
  versprechen?: VersprechenInhalt;
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
  /** Zeilen mit Link nach der Zeichnung (z. B. „Formate und Technik“ auf /fliesen), wie die Wege in „Ihre Lage“ */
  wege?: Zeile[];
}

export interface WissenInhalt {
  pfad: string;
  meta: { titel: string; beschreibung: string };
  worum: WorumInhalt;
  lage: LageInhalt;
  wissen: Wissensblock[];
  ablauf: AblaufInhalt;
  beleg: BelegInhalt;
  /** Qualitätsversprechen vor dem nächsten Schritt */
  versprechen?: VersprechenInhalt;
  schritt: SchrittInhalt;
}
