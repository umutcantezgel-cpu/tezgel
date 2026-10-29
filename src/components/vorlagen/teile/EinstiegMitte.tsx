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
// nächsten Überschrift (vorher rund 200 px Leere unter dem Foto). Mobil und Tablet hochkant bleibt alles, wie es war.
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
// Serverkomponente.
import type { CSSProperties, ReactNode } from 'react';
import clsx from 'clsx';
import Icon from '@/components/icons/Icon';
import WhatsAppLogo from '@/components/ui/WhatsAppLogo';
import Bewertungszeile from '@/components/kern/Bewertungszeile';
import Bildfeld from '@/components/kern/Bildfeld';
import Brotkrumen, { type Krume } from '@/components/kern/Brotkrumen';
import Hauptknopf from '@/components/kern/Hauptknopf';
import Laserachse from '@/components/kern/Laserachse';
import { ACHSE_LAGE, SCHNUR_LAGE } from '@/components/kern/Leitachse';
import Quadratmeter from './Quadratmeter';
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
}

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

export default function EinstiegMitte({ pfad, brotkrumen, titelZeilen, titelGross = false, quadratmeter = false, ort, hauptziel, bild, bewertung = false, orteAnker }: EinstiegMitteProps) {
  const { contact } = COMPANY_DATA;
  const format = typeof bild === 'string' ? ARBEITEN[bild as ArbeitId].breite / ARBEITEN[bild as ArbeitId].hoehe : EINSTIEG_FORMAT;
  return (
    <section aria-labelledby="seite-titel" data-formel="worum" data-motion="eingang" className="relative">
      {/* H1; schnur-abstand (0,25em) hält die Schnur von den Unterlängen und von der Zeilenmaske fern (globals.css). Der
          Container ist das Maß der Zeilen der Startseite (titel-spalte, cqi) und trägt den Quadratmeter */}
      <div className={`${seitenKlassen} @container relative flex flex-col items-center pt-24 text-center flach:pt-16`}>
        {brotkrumen && brotkrumen.length > 1 && <Brotkrumen wege={brotkrumen} className="mb-6 flach:hidden" />}
        <h1 id="seite-titel" data-erstes-bild="ueberschrift" data-motion="sig-flucht" className={clsx('schnur-abstand text-fs-6 text-balance text-tinte flach:text-fs-5', titelGross && 'titel-spalte max-sm:text-fs-7 lg:text-fs-7')}>
          {titelZeilen.map((zeile, i) => (
            <span key={zeile} data-motion="zeilenmaske" style={{ '--zeile': i } as CSSProperties} className="block flach:inline flach:animate-none">
              {zeile}
              {i < titelZeilen.length - 1 && ' '}
            </span>
          ))}
        </h1>
        {quadratmeter && <Quadratmeter className="absolute right-8 bottom-0 hidden flach:hidden lg:block" />}
      </div>
      {/* Ab der Schnur: Zierebene (Schnur an der Oberkante, Lot im Seitenrand bis zum Fuß des Einstiegs), darüber der Inhalt in
          einer positionierten Hülle ohne eigenen Stapelkontext (wie in kern/Leitachse) */}
      <div className="relative">
        <div aria-hidden="true" className="einstieg-lot pointer-events-none absolute inset-0">
          <div className={clsx(seitenKlassen, 'relative h-full')}>
            <Laserachse className={ACHSE_LAGE} />
            <span data-eingang="schnur" data-leitachse="" className={clsx('absolute top-0 h-px origin-left bg-laser', SCHNUR_LAGE)} />
          </div>
        </div>
        {/* Spalte: Ort und Knöpfe, erster Schritt mit Bewertung, Foto; ab lg rücken erster Schritt und Bewertung unter das Foto */}
        <div className="relative flex flex-col">
          <div className={`${seitenKlassen} relative flex flex-col items-center pt-6 text-center flach:pt-3`}>
            {/* rotes Lot von der Schnur bis unter die Knopfreihe (UM-E3-FIX2 N3), auf derselben Achse wie das Lot der Zierebene */}
            <span aria-hidden="true" data-eingang="lot" data-leitachse="" className={clsx('lot-stueck -bottom-4 origin-top max-sm:animate-none', ACHSE_LAGE)} />
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
            <div data-eingang="knoepfe" className="@container mt-12 flex w-full flex-col items-center gap-3 flach:mt-6 max-sm:animate-none sm:flex-row sm:flex-wrap sm:justify-center lg:mt-6">
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
          {/* erster Schritt und Bewertung: mobil unter den Knöpfen, ab lg unter dem Foto (order) */}
          <div className={`${seitenKlassen} flex flex-col items-center text-center lg:order-last lg:pt-8`}>
            <p data-eingang="knoepfe" className="mt-8 max-w-mass font-text text-fs-3 text-pretty text-tinte-2 flach:hidden max-sm:animate-none lg:mt-0">
              {ERSTER_SCHRITT}
            </p>
            {bewertung && (
              <div data-eingang="knoepfe" className="mt-8 max-sm:animate-none lg:mt-3">
                <Bewertungszeile className="font-text text-fs-2 text-tinte-2 hyphens-none" />
              </div>
            )}
          </div>
          {/* Foto vollständig, mittig; ab lg zwei Drittel der Spalte, höchstens bildschirmhoch (einstieg-foto, --bild-format;
              UM-E3-FIX F1: vorher zwei Fünftel, auf 1920 px ein Viertel der Breite). relative: Halt für den Fugenriss an der
              Oberkante im Eingang (nur ein Pseudoelement, das Foto bleibt unberührt; unter sm entfällt er, max-sm:after:hidden) */}
          <div className={`${seitenKlassen} pt-12 pb-16 lg:pt-8 lg:pb-0`}>
            <div data-eingang="bild" style={{ '--bild-format': format } as CSSProperties} className="relative mx-auto w-full max-w-md max-sm:after:hidden lg:einstieg-foto lg:max-w-full">
              {typeof bild === 'string' ? <Bildfeld arbeit={bild as ArbeitId} lcp sizes={EINSTIEG_MITTE_SIZES} /> : bild}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
