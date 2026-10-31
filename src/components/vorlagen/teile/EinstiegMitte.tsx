// Vorlagen · 1 Worum es geht, mittig (KERN v3.6 K-016 „Ruhe“, E-047): ruhiger Einstieg ohne zweiten Strang daneben. Mittig
// die H1 (fs-6, auf der Startseite größer: titelGross, unter sm und ab lg fs-7; ihre Zeilen rücken in die Flucht:
// sig-flucht), darunter die Schnur, dann in einer Zeile, was der Betrieb macht und wo (zugleich der Ort des ersten
// Bildschirms), ab lg daneben der Link zu den Orten, darunter Hauptknopf, Anruf und ab xl WhatsApp, der erste Schritt und
// die Bewertungszeile. Danach das Foto vollständig in seinem eigenen Seitenverhältnis, nie angeschnitten (Startseite: das
// Startbild), ab lg zwei Drittel der Spalte breit, aber nie höher als ein Bildschirm unter dem Kopf (einstieg-foto). Das
// Foto ist das LCP-Element der Seite und lädt darum sofort mit hoher Priorität (E-061). Die fünf Pflichtelemente des ersten
// Bildschirms tragen data-erstes-bild (Logo im Kopf).
// Erster Bildschirm ab lg (UM-E3-FIX2 N4, Sichtabnahme E3 Anlauf 2: am Desktop zeigte das Foto im ersten Bildschirm nur die
// Zimmerdecke): Ort und Orte-Link stehen in einer Zeile, der erste Schritt und die Bewertung folgen ab lg unter dem Foto
// (Reihenfolge per order, der Quelltext und damit Vorlese- und Tabfolge bleiben wie mobil: Ort, Knöpfe, erster Schritt,
// Bewertung, Foto; zwischen Knöpfen und Bewertung liegt nichts Fokussierbares). So beginnt das Foto auf d1440 rund 160 px
// höher, und im ersten Bildschirm steht die Fliesenarbeit. Unter dem Einstieg bleibt eine Fliesenstufe (24 = F) bis zur
// nächsten Überschrift (vorher rund 200 px Leere unter dem Foto); folgt ein Abschnitt auf Fliese (fugeUnten, Startseite,
// UM-E3-FIX2 N8), eine Stufe 16 bis zur Fuge und eine Stufe 16 dahinter. Mobil und Tablet hochkant bleibt alles, wie es war.
// Schnur und Lot (UM-E3-FIX F1, KERN K-007 „An der Schnur“ und Laserlinie): Unter der H1 liegt als Grundlinie eine rote
// 1-px-Schnur von der Achse bis zur gespiegelten Stelle rechts. An ihrem linken Ende beginnt das Lot der Leitachse und läuft
// im Seitenrand am Einstieg hinunter, ohne Lücke in die Leitachse der Seite (ErzaehlSeite). Das Lot ist der Leitfaden
// selbst: Grundschicht Fuge, rot gezogen bis zur Leselinie (bewegung.css „Leitfaden“). Von der Schnur bis unter die
// Knopfreihe steht es rot als Teil der Figur (lot-stueck, UM-E3-FIX2 N3: vorher am Desktop nur rund 26 px, Schnur und Lot
// lasen sich nicht als Paar): Ort und Hauptknopf stehen sichtbar an der Linie, und darunter übernimmt das gezogene Lot.
// Schnur und Lotstück stehen in jedem Zustand rot, auch ruhig, reduziert und ohne JavaScript; nur ihr Ziehen ist Bewegung.
// Zierebene unter dem Inhalt, schneidet nie Text (data-leitachse für die Prüfung).
// Quadratmeter (UM-E3-FIX2 N5, nur Startseite): rechts am Ende der Schnur steht ein gezeichneter Quadratmeter mit Bemaßung
// (vorlagen/teile/Quadratmeter); die Schnur ist seine Waage. Erst ab lg, dort endet die Schnur wie er bei right-8 und die H1
// steht in fs-7 (darunter stand er bis 1023 px 16 px vor dem Ende der Schnur und mit der Zahl dicht unter dem Kopf der
// Seite); nicht flach, dort ist der Block der H1 nur eine Zeile hoch und der Kopf der Seite deckte die Zeichnung.
// Eingang ohne Vorhang (E-067-4, bewegung.css „eingang“): Der Abschnitt ist der Behälter (data-motion="eingang"). Beim
// ersten Aufruf ziehen zuerst Schnur und Lotstück aus dem Kreuzpunkt (data-eingang="schnur", "lot"); ist die Schnur halb
// gezogen, steigen die Zeilen der H1 hinter Zeilenmasken auf ihr auf (data-motion="zeilenmaske", --zeile ist ihre Nummer
// für den Abstand), der Quadratmeter zeichnet sich, der Ort setzt sich, danach in einem Zug alles darunter
// (data-eingang="knoepfe": Orte-Link, Knopfzeile, erster Schritt, Bewertung), über die Oberkante des Fotos zieht ein
// Fugenriss. Vor der H1 steht so am Desktop nichts allein im Bild. Unter sm (Handy) steht alles unter der Schnur ab dem
// ersten Bild (max-sm:animate-none, UM-E3-FIX2 N6: vorher stand der erste Schritt allein, und der Hauptknopf kam zuletzt);
// dort kommen nur Schnur und Zeilen (sichtbar bis 0,86 s), ohne Fugenriss. Das Foto selbst bewegt sich nie. Flach fließen die
// Zeilen als ein Satz (inline): dort keine Maske (flach:animate-none), wie die Flucht dort ohnehin nicht wirkt.
// Figur „An der Schnur“ geschlossen (schnurFigur, nur Startseite; UM-E4-START nach Sicht Anlauf 3: die Grundlinie stand rund
// 44 px über der Schnur, das Maß 250 px rechts am Rand, das Lot endete an den Knöpfen, mobil lag das Foto unter dem Falz):
// - Die Grundlinie der letzten H1-Zeile steht genau auf der Schnur (schnur-grundlinie, globals.css: die Zeile rückt um ihren
//   Abstand von der Grundlinie zur Unterkante nach unten), die Unterlängen kreuzen sie und liegen über ihr.
// - Der Quadratmeter steht direkt hinter „Quadratmeter.“ auf der Schnur, ab lg so hoch wie die H1 (Versalhöhe der ersten bis
//   Grundlinie der zweiten Zeile, rund zwei Zeilen), darunter eine Zeilenhöhe
//   (Quadratmeter); H1 und Maß stehen zusammen mittig. Die Zeilen werden nur so groß, dass beide in die Spalte
//   passen (titel-spalte). Ab md steht die H1 eine Stufe größer (fs-7 wie mobil und ab lg).
// - Unter der Schnur Ort und Orte-Link, dann Hauptknopf und Telefon in derselben Fugenstufe (12 px), dann sofort das Foto, auf
//   jeder Breite; Vorspann und Bewertung folgen unter dem Foto (vorher mobil davor). Das rote Lotstück reicht von der Schnur
//   bis an die Oberkante des Fotos; dort kreuzt es eine Fuge, auf der das Foto hängt (ab sm, Fugenkreuz am Lot).
// - Das Foto wählt je Breite seinen Zuschnitt (Startbild), ab lg so groß, dass es ganz im ersten Bildschirm steht, zwischen
//   der Hälfte und zwei Dritteln der Spalte (einstieg-foto-start, --bild-format aus dem Zuschnitt ab lg).
// Figur auf allen mittigen Einstiegen (UM-E4-SICHT-FIX M-A1, Sicht E4 Anlauf 1: auf den Unterseiten schwebte die H1 15 bis
// 25 px über der Schnur, war so groß wie die H2, und mobil stand das Foto unter dem Falz): ErzaehlSeite setzt `schnurFigur` für
// jeden Aufruf mit `einstieg: 'mitte'` (die Angabe bleibt Abschalter). Schnur, Lot und Lotstück kommen aus der Schnurebene
// (M-A3 Nr. 1, gemeinsam mit dem einfachen Einstieg).
// - H1 außer auf / in fs-7 (E-104 Nr. 2, KERN K-003), eine Stufe über den H2. Unter md brechen die Zeilen an Wortgrenzen um,
//   ab md bricht die längste Zeile nicht um: Ihr Maß kommt aus der Tabelle ZEILEN_EM gemessener em-Breiten (nicht aus der
//   Zeichenzahl) und steht als --titel-em am Container (globals.css „titel-zeile“); nie kleiner als 1,15 × fs-6 (die H2).
// - Schnurzeichen (WorumInhalt.schnurZeichen, /bad ab xl, /balkon-terrasse ab lg): die Plan-Vignette der Seite am rechten
//   Ende der Schnur, unten auf ihr, in der Größe einer H1-Zeile; ihre Breite ist im Maß der H1 ab ihrer Stufe eingerechnet
//   (--titel-em-lg, --titel-em-xl). Setzt sich im Eingang mit den Knöpfen (`eingang`, data-eingang="knoepfe").
// - Hochformat ohne bildQuer: ab lg höchstens 80svh hoch, Breite aus dem Format, höchstens zwei Drittel der Spalte
//   (einstieg-foto-hoch, EINSTIEG_HOCH_SIZES).
// - Unter sm stehen Brotkrumen und H1 näher am Kopf (Nacharbeit SF-A): 16 statt 32 px Luft unter dem Kopf (pt-16 und mt-4
//   statt pt-24), 16 statt 24 px bis zur H1. In fs-7 brechen lange Titel dort in vier Zeilen um (/leistungen, /referenzen,
//   /ueber-uns), und im Erstbesuch rückte der Hauptknopf bei m390 unter den Rand des Einwilligungsbanners (erstesbild.mjs
//   4 → 3). Die gewonnenen 24 px gehen an Knöpfe und Foto. / (ohne Brotkrumen) bleibt bei pt-24.
// Serverkomponente.
import type { CSSProperties, ReactNode } from 'react';
import clsx from 'clsx';
import Icon from '@/components/icons/Icon';
import WhatsAppLogo from '@/components/ui/WhatsAppLogo';
import Bewertungszeile from '@/components/kern/Bewertungszeile';
import Bildfeld from '@/components/kern/Bildfeld';
import Brotkrumen, { type Krume } from '@/components/kern/Brotkrumen';
import Hauptknopf from '@/components/kern/Hauptknopf';
import { VIGNETTEN, type VignettenName } from '@/components/kern/vignetten';
import Quadratmeter from './Quadratmeter';
import Schnurebene, { Aufhaengung, Lotstueck } from './Schnurebene';
import Rufnummer from '@/components/kern/Rufnummer';
import WeiterLink from '@/components/kern/WeiterLink';
import { knopfKlassen, seitenKlassen } from '@/components/kern/stile';
import { COMPANY_DATA } from '@/config/company';
import { ARBEITEN, type ArbeitId } from '@/config/arbeiten';
import { buildWhatsAppUrl, kontextNachricht } from '@/lib/whatsapp';

export interface EinstiegMitteProps {
  pfad: string;
  brotkrumen?: Krume[];
  /** H1 in festen Zeilen (sig-flucht); bei großer Schrift fließen sie als ein Satz */
  titelZeilen: string[];
  /** H1 größer (nur Startseite, WorumInhalt.titelGross): unter sm fs-7, „jedem Quadratmeter.“ füllt die Spalte zu rund 90 %
   *  (UM-E3-FIX2 N7; sm bis lg wie die übrigen Einstiege fs-6), ab lg fs-7. Bei großer Systemschrift wächst sie mit; die
   *  Zeilen werden erst dort kleiner als ihre Stufe, wo das längste Wort sonst mehr als 90 % der Spalte füllte (titel-spalte,
   *  globals.css). Vorher sprang sie ab 20rem Spalte auf fs-5 und war bei 110 bis 150 % kleiner als bei 100 % */
  titelGross?: boolean;
  /** gezeichneter Quadratmeter an der Schnur (nur Startseite, WorumInhalt.quadratmeter) */
  quadratmeter?: boolean;
  /** eine Zeile unter der H1: was und wo (Ort des ersten Bildschirms) */
  ort: string;
  hauptziel: string;
  /** Foto vollständig (Kennung) oder eigener Bildplatz (Startbild mit Moment) */
  bild: ArbeitId | ReactNode;
  bewertung?: boolean;
  /** Anker der Einsatzorte auf derselben Seite (Startseite): Link unter der Ortszeile, „arbeitet er in meinem Ort?“ (A6) */
  orteAnker?: string;
  /** Der nächste Abschnitt steht auf Fliese (Startseite, LageInhalt.aufFliese, UM-E3-FIX2 N8): ab lg bleibt unter der
   *  Bewertungszeile eine Stufe 16 Kalk bis zur Fuge. Innen gesetzt, damit das Lot des Einstiegs bis an die Fuge reicht (ein
   *  Außenabstand am Abschnitt danach fiele aus der Leitachse heraus, dort stünde eine Lücke im Lot) */
  fugeUnten?: boolean;
  /** Figur „An der Schnur“ geschlossen (nur Startseite, WorumInhalt.schnurFigur, UM-E4-START; siehe oben) */
  schnurFigur?: boolean;
  /** Zuschnitt des Fotos ab lg (WorumInhalt.bildQuer): sein Seitenverhältnis bemisst das Foto ab lg */
  bildQuer?: ArbeitId;
  /** Plan-Vignette am rechten Ende der Schnur ab lg bzw. xl (WorumInhalt.schnurZeichen, nur in der Figur) */
  schnurZeichen?: Schnurzeichen;
}

export interface Schnurzeichen {
  vignette: VignettenName;
  /** ab dieser Breite; darunter reicht die Spalte neben der H1 nicht (Maß der H1 ≥ 1,15 × H2) */
  ab: 'lg' | 'xl';
}

/** Breite der H1-Zeilen in em (Archivo wdth 74, wght 760, Laufweite −0,015 em, Wortabstand 0,06 em wie font-anzeige;
 *  gemessen im Browser bei d1440 mit nowrap, UM-E4-SICHT-FIX M-A1 Nr. 2). Ab md bemisst die längste Zeile die H1
 *  (--titel-em, globals.css „titel-zeile“). Eine Zeile, die hier fehlt, nimmt das Maß der breitesten (13,3). Ändert sich der
 *  Wortlaut einer Zeile, wird sie neu gemessen (Messweise in der Paketnotiz UM-E4-SICHT-FIX-a). */
const ZEILEN_EM: Record<string, number> = {
  'Aus Ihrem alten Bad wird ein neues,': 13.3,
  'das Sie gern nutzen.': 7.49,
  'Ihr neues Traumbad': 7.38,
  'zum Festpreis.': 5.41,
  'Ein barrierefreies Bad': 8.07,
  'mit Dusche ohne Stufe': 8.39,
  'Alle Leistungen vom Fliesenleger': 12.25,
  'aus Aßlar, Fliese für Fliese.': 9.94,
  'Ein neuer Belag für': 7.02,
  'Balkon und Terrasse': 7.58,
  'Das sagen unsere Kunden,': 9.89,
  'und so sieht unsere Arbeit aus.': 11.43,
  'Ihr Fliesenleger aus Aßlar': 9.44,
  'kommt persönlich zu Ihnen.': 10.22,
};
const ZEILE_EM_GROESST = 13.3;
/** Seitenverhältnis der Vignetten (viewBox in kern/vignetten) */
const ZEICHEN_FORMAT: Record<VignettenName, number> = { bad: 240 / 184, wohnen: 240 / 128, aussen: 240 / 128, untergrund: 240 / 128, reparatur: 240 / 128, treppe: 240 / 128 };
/** Höhe des Schnurzeichens (eine Zeilenhöhe der H1) und Luft zur H1, in em der H1 */
const ZEICHEN_HOEHE = 1.1;
const ZEICHEN_LUFT = 0.5;

/** Erster Schritt und Kosten in einem Satz unter den Knöpfen (Aufgabe A5, Probeläufe E3: Ablauf und kostenfreier Termin erst
 *  nach vielem Scrollen; E-062). Termin kostenfrei: K-015 F-12; Angebot mit festem Preis wie im Ablauf jeder Seite. */
const ERSTER_SCHRITT = 'Deniz Tezgel kommt kostenfrei zu Ihnen und schaut sich alles an. Danach bekommen Sie ein Angebot mit festem Preis.';

/** Bildplatz Einstieg: Hochformat 4 : 5 (_werkstatt/bildplaetze.md), auch das Startbild (start-dusche); für ein eigenes
 *  Bild (ReactNode) gilt dieses Format, für eine Kennung das der Datei */
const EINSTIEG_FORMAT = 4 / 5;
/** Bildbreiten zum Foto: unter sm volle Breite, bis lg höchstens 28 rem, ab lg wie einstieg-foto (globals.css) das Kleinste
 *  aus zwei Dritteln der Spalte (Seite 82 rem, Rand je 3 rem: 66,67vw − 4 rem, höchstens 51 rem) und der Breite, bei der
 *  das 4 : 5-Foto unter Kopf und Rand (6 rem) in den Bildschirm passt: (100vh − 6 rem) · 0,8 = 80vh − 4,8 rem. Vorher
 *  wuchs 66vw über die Seitenbreite hinaus (d1920 und d2560 luden w=1920 für 809 px). Eine Quelle für Vorlage und page.tsx.
 *  Ab 1440 px wächst die Grundschrift (--grundschrift, UM-E3-FIX F8), `sizes` misst aber in der Ausgangsgröße: dort dieselbe
 *  Rechnung mit der Grundschrift 1rem + (100vw − 90rem) / 240, höchstens 1,25rem (zwei Drittel der Spalte 50,67 Grundschrift
 *  = 31,67rem + 21,11vw, höchstens 63,33rem; Höhe 80vh − 4,8 Grundschrift = 80vh − 3rem − 2vw). */
export const EINSTIEG_MITTE_SIZES =
  '(min-width: 1440px) min(calc(31.67rem + 21.11vw), 63.33rem, calc(80vh - 3rem - 2vw)), (min-width: 1024px) min(calc(66.67vw - 4rem), 51rem, calc(80vh - 4.8rem)), (min-width: 640px) 28rem, 100vw';
/** Bildbreiten zum Hochformat in der Figur (einstieg-foto-hoch, UM-E4-SICHT-FIX M-A1 Nr. 4): dieselbe Rechnung wie oben, aber
 *  die Höhe höchstens 80vh, beim 4 : 5-Foto (alle Einstiegsquellen, _werkstatt/bildplaetze.md) also die Breite 80vh · 0,8 =
 *  64vh; die Höhe hängt nicht an der Grundschrift. d1440: 576 px, d1920: 691 px. */
export const EINSTIEG_HOCH_SIZES =
  '(min-width: 1440px) min(calc(31.67rem + 21.11vw), 63.33rem, 64vh), (min-width: 1024px) min(calc(66.67vw - 4rem), 51rem, 64vh), (min-width: 640px) 28rem, 100vw';

export default function EinstiegMitte({ pfad, brotkrumen, titelZeilen, titelGross = false, quadratmeter = false, ort, hauptziel, bild, bewertung = false, orteAnker, fugeUnten = false, schnurFigur = false, bildQuer, schnurZeichen }: EinstiegMitteProps) {
  const { contact } = COMPANY_DATA;
  const format = bildQuer
    ? ARBEITEN[bildQuer].breite / ARBEITEN[bildQuer].hoehe
    : typeof bild === 'string'
      ? ARBEITEN[bild as ArbeitId].breite / ARBEITEN[bild as ArbeitId].hoehe
      : EINSTIEG_FORMAT;
  const figur = schnurFigur;
  // Hochformat in der Figur: kein eigener Zuschnitt ab lg (bildQuer) und das Foto steht hochkant (M-A1 Nr. 4)
  const hochformat = figur && !bildQuer && format < 1;
  // Größe der H1: Startseite unter sm und ab md fs-7 (Figur: ab md eine Stufe größer als vorher, UM-E4-START), sonst fs-6;
  // die übrigen Figuren fs-7 auf allen Breiten, ab md im Maß der längsten Zeile (titel-zeile, UM-E4-SICHT-FIX M-A1 Nr. 2)
  const zeileGemessen = !titelGross && figur;
  const titelStufe = titelGross ? (figur ? 'titel-spalte max-sm:text-fs-7 md:text-fs-7' : 'titel-spalte max-sm:text-fs-7 lg:text-fs-7') : zeileGemessen ? 'titel-zeile' : undefined;
  const titelGrundstufe = zeileGemessen ? 'text-fs-7' : 'text-fs-6';
  const mitKrumen = brotkrumen !== undefined && brotkrumen.length > 1;
  // unter sm Brotkrumen und H1 näher am Kopf (16 statt 32 px Luft unter dem Kopf, 16 statt 24 px bis zur H1), nur in der Figur
  // der Unterseiten und nur mit Brotkrumen (ohne sie bliebe unter dem Kopf keine Luft)
  const engKopf = zeileGemessen && mitKrumen;
  const zeichen = figur && schnurZeichen ? schnurZeichen : undefined;
  const Zeichen = zeichen ? VIGNETTEN[zeichen.vignette] : null;
  const titelMass = zeileGemessen ? Math.max(...titelZeilen.map((z) => ZEILEN_EM[z] ?? ZEILE_EM_GROESST)) : undefined;
  // mit Zeichen: zweimal (die H1 steht mittig) Zeichen und Luft, ab der Stufe des Zeichens
  const mitZeichen = titelMass !== undefined && zeichen ? titelMass + 2 * (ZEICHEN_HOEHE * ZEICHEN_FORMAT[zeichen.vignette] + ZEICHEN_LUFT) : undefined;
  const titelVariablen = titelMass === undefined
    ? undefined
    : ({ '--titel-em': titelMass, ...(mitZeichen && { [zeichen?.ab === 'lg' ? '--titel-em-lg' : '--titel-em-xl']: +mitZeichen.toFixed(2) }) } as CSSProperties);
  const zeilen = titelZeilen.map((zeile, i) => (
    <span key={zeile} data-motion="zeilenmaske" style={{ '--zeile': i } as CSSProperties} className="block flach:inline flach:animate-none">
      {zeile}
      {i < titelZeilen.length - 1 && ' '}
    </span>
  ));
  return (
    <section aria-labelledby="seite-titel" data-formel="worum" data-motion="eingang" className="relative">
      {/* H1; schnur-abstand (0,25em) hält die Schnur von den Unterlängen und von der Zeilenmaske fern (globals.css). Der
          Container ist das Maß der Zeilen der Startseite (titel-spalte, cqi) und trägt den Quadratmeter */}
      <div style={titelVariablen} className={clsx(seitenKlassen, '@container relative flex flex-col items-center pt-24 text-center flach:pt-16', figur && 'z-10', engKopf && 'max-sm:pt-16')}>
        {mitKrumen && brotkrumen && <Brotkrumen wege={brotkrumen} className={clsx('mb-6 flach:hidden', engKopf && 'max-sm:mt-4 max-sm:mb-4')} />}
        {figur ? (
          // H1 und Quadratmeter als eine Gruppe; die Unterkante der Gruppe ist die Grundlinie der letzten Zeile, also die
          // Schnur. Der Quadratmeter steht außerhalb der H1 (ihr Text bleibt der Wortlaut, A-1) in derselben Schriftgröße wie
          // die Zeilen (gleiche Stufe und titel-spalte am Platz), ohne Höhe im Fluss: Er ragt über der Schnur auf. Ab md hängt
          // er rechts außen an der H1 (absolut), die H1 selbst steht mittig auf der Achse von Ort, Knöpfen und Foto
          // (Nacharbeit UM-E4-START, Prüfung A: als mittige Gruppe stand die H1 auf d1440 111 px, auf t1024 85 px links der
          // Achse); unter md reicht die Spalte dafür nicht, dort steht die Gruppe mittig. Flach (Handy quer) steht er klein ohne
          // Zahl hinter der einzeiligen H1 (globals.css „quadratmeter“)
          <div className="relative flex max-w-full">
            <h1 id="seite-titel" data-erstes-bild="ueberschrift" data-motion="sig-flucht" className={clsx('schnur-grundlinie min-w-0 text-balance text-tinte flach:text-fs-5', titelGrundstufe, titelStufe)}>
              {zeilen}
            </h1>
            {quadratmeter && (
              <div aria-hidden="true" className={clsx('flex shrink-0 items-end text-fs-6 md:absolute md:bottom-0 md:left-full flach:text-fs-5', titelStufe)}>
                <Quadratmeter />
              </div>
            )}
          </div>
        ) : (
          <>
            <h1 id="seite-titel" data-erstes-bild="ueberschrift" data-motion="sig-flucht" className={clsx('schnur-abstand text-fs-6 text-balance text-tinte flach:text-fs-5', titelStufe)}>
              {zeilen}
            </h1>
          </>
        )}
        {/* Schnurzeichen: rechts am Ende der Schnur (right-8 wie SCHNUR_LAGE ab lg), unten auf ihr; in der Schrift der H1-Zeilen
            (titel-zeile am Platz), ohne Höhe im Fluss. Entfällt in schmaler Spalte (große Systemschrift, globals.css) */}
        {Zeichen && zeichen && (
          <span
            aria-hidden="true"
            data-eingang="knoepfe"
            style={{ '--zeichen-format': ZEICHEN_FORMAT[zeichen.vignette] } as CSSProperties}
            className={clsx('titel-zeile absolute right-8 bottom-0 hidden text-fs-7 text-tinte flach:hidden', zeichen.ab === 'lg' ? 'lg:block' : 'xl:block')}
          >
            <span className="schnur-zeichen">
              <Zeichen />
            </span>
          </span>
        )}
      </div>
      {/* Ab der Schnur: Zierebene (Schnur an der Oberkante, Lot im Seitenrand bis zum Fuß des Einstiegs), darüber der Inhalt in
          einer positionierten Hülle ohne eigenen Stapelkontext (wie in kern/Leitachse) */}
      <div className="relative">
        {/* Figur: mobil und bei DPR 1 zwei Pixel stark (schnur-linie, globals.css) */}
        <Schnurebene stark={figur} />
        {/* Spalte: Ort und Knöpfe, erster Schritt mit Bewertung, Foto; ab lg rücken erster Schritt und Bewertung unter das Foto */}
        <div className={clsx('relative flex flex-col', fugeUnten && 'lg:pb-16')}>
          <div className={`${seitenKlassen} relative flex flex-col items-center pt-6 text-center flach:pt-3`}>
            {/* rotes Lot von der Schnur bis unter die Knopfreihe (UM-E3-FIX2 N3), auf derselben Achse wie das Lot der Zierebene */}
            {/* in der Figur bis an die Oberkante des Fotos (Abstand des Fotos, pt-8, ab lg pt-6) */}
            <Lotstueck className={figur ? '-bottom-8 flach:-bottom-4 lg:-bottom-6' : '-bottom-4'} />
            {/* Ort, ab lg mit dem Orte-Link in einer Zeile (auf der Grundlinie) */}
            <div className="flex w-full flex-col items-center lg:flex-row lg:flex-wrap lg:items-baseline lg:justify-center lg:gap-x-6">
              <p data-erstes-bild="ort" className="max-w-mass font-text text-fs-4 text-balance text-tinte-2 max-sm:animate-none">
                {ort}
              </p>
              {/* Alles unter dem Ort setzt sich im Eingang in einem Zug nach dem Ort (data-eingang="knoepfe", eine Regel für
                  alle Teile): Orte-Link, Knopfzeile, erster Schritt, Bewertung. Unter sm steht es ab dem ersten Bild: Dort
                  kann der erste Schritt das LCP-Element sein (m360, das Foto liegt unter dem Falz), und das LCP-Element
                  startet nie unsichtbar (E-067-4); Hauptknopf und Anruf stehen sofort (UM-E3-FIX2 N6). */}
              {orteAnker && (
                <p data-eingang="knoepfe" className="mt-3 flach:hidden max-sm:animate-none lg:mt-0">
                  <WeiterLink href={`#${orteAnker}`}>Alle Orte, in denen wir arbeiten</WeiterLink>
                </p>
              )}
            </div>
            {/* Figur: dieselbe Fugenstufe wie zwischen Ortszeile und Link (12 px) statt 48 px, ab lg 16 statt 24 px (UM-E4-START:
                die gewonnene Höhe geht ans Foto) */}
            <div data-eingang="knoepfe" className={clsx('@container flex w-full flex-col items-center gap-3 max-sm:animate-none sm:flex-row sm:flex-wrap sm:justify-center', figur ? 'mt-3 lg:mt-4' : 'mt-12 flach:mt-6 lg:mt-6')}>
              <Hauptknopf href={hauptziel} erstesBild breit />
              <a href={`tel:${contact.phoneLink}`} data-erstes-bild="kontakt" data-motion="druck" className={knopfKlassen('neben', 'w-full px-4 sm:w-auto @max-3xs:flex-col @max-3xs:gap-1')}>
                <Icon name="telefon" groesse={5} className="shrink-0" />
                <span className="min-w-0">
                  Anrufen: <Rufnummer nummer={contact.phone} className="inline-block" />
                </span>
              </a>
              <a
                href={buildWhatsAppUrl(contact.whatsappNumber, kontextNachricht(pfad))}
                target="_blank"
                rel="noopener noreferrer"
                data-motion="druck"
                className={knopfKlassen('neben', 'px-4 max-xl:hidden')}
              >
                <WhatsAppLogo className="size-5 shrink-0" />
                <span>Nachricht per WhatsApp</span>
              </a>
            </div>
          </div>
          {/* erster Schritt und Bewertung: mobil unter den Knöpfen, ab lg unter dem Foto (order); in der Figur auf jeder Breite
              unter dem Foto (order, wie bisher ab lg: zwischen Knöpfen und Bewertung liegt nichts Fokussierbares) */}
          <div className={clsx(seitenKlassen, 'flex flex-col items-center text-center', figur ? 'order-last pt-8 pb-16 lg:pb-0' : 'lg:order-last lg:pt-8')}>
            <p data-eingang="knoepfe" className={clsx('max-w-mass font-text text-fs-3 text-pretty text-tinte-2 flach:hidden max-sm:animate-none', !figur && 'mt-8 lg:mt-0')}>
              {ERSTER_SCHRITT}
            </p>
            {bewertung && (
              <div data-eingang="knoepfe" className={clsx('max-sm:animate-none', figur ? 'mt-6 lg:mt-3' : 'mt-8 lg:mt-3')}>
                <Bewertungszeile className="font-text text-fs-2 text-tinte-2 hyphens-none" />
              </div>
            )}
          </div>
          {/* Foto vollständig, mittig; ab lg zwei Drittel der Spalte, höchstens bildschirmhoch (einstieg-foto, --bild-format;
              UM-E3-FIX F1: vorher zwei Fünftel, auf 1920 px ein Viertel der Breite). relative: Halt für den Fugenriss an der
              Oberkante im Eingang (nur ein Pseudoelement, das Foto bleibt unberührt; unter sm entfällt er, max-sm:after:hidden).
              Figur: direkt nach den Knöpfen (pt-8, ab lg pt-6), ab lg so groß, dass es im ersten Bildschirm steht (einstieg-foto-start); ab sm
              hängt es an einer Fuge, die das Lot an seinem Ende kreuzt (Fugenkreuz in Tinte wie an den Abschnittskanten) */}
          {/* Flach (Handy quer, q844) stehen Knöpfe und Foto in der kleineren Fugenstufe (12 und 16 px statt 24 und 32 px): Das
              Foto beginnt so rund 28 px höher im ersten Bildschirm (Nacharbeit UM-E4-START, Prüfung A) */}
          <div className={clsx(seitenKlassen, figur ? 'relative pt-8 flach:pt-4 lg:pt-6' : 'pt-12 pb-16 lg:pt-8 lg:pb-0')}>
            {figur && <Aufhaengung lage="top-8 flach:top-4 lg:top-6" />}
            <div
              data-eingang="bild"
              style={{ '--bild-format': format } as CSSProperties}
              className={clsx('relative mx-auto w-full max-w-md max-sm:after:hidden lg:max-w-full', figur ? (hochformat ? 'lg:einstieg-foto-hoch' : 'lg:einstieg-foto-start') : 'lg:einstieg-foto')}
            >
              {typeof bild === 'string' ? <Bildfeld arbeit={bild as ArbeitId} lcp sizes={hochformat ? EINSTIEG_HOCH_SIZES : EINSTIEG_MITTE_SIZES} /> : bild}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
