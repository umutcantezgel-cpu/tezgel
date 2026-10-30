// Vorlagen · 1 Worum es geht (KERN v3 K-006, K-009; E-025; K-016 „Ruhe“, E-047): erster Bildschirm jeder Wissens-, Orts- und
// Arbeitsseite (und der Erzählseiten ohne Planblatt oder mittigen Einstieg). Ruhig und mittig wie der Einstieg der
// Startseite, kein zweiter Strang daneben: Brotkrumen, H1, Ort, Hauptknopf, Anruf (WhatsApp erst ab lg, darunter trägt die
// untere Leiste ihn), dann der Vorspann (nach den Knöpfen, damit sie auch bei großer Systemschrift im ersten Bildschirm
// stehen); darunter das Einstiegsbild vollständig als einziges preload der Seite (bzw. der Schlitz, z. B. das Einzugsband
// der Ortsseite). Die Pflichtelemente des ersten Bildschirms tragen data-erstes-bild (Logo im Kopf).
// Eingang ohne Vorhang (E-067-4, bewegung.css „eingang“), nicht in Arbeitsansichten (kompakt: kein Signaturmoment, K-007):
// Der Abschnitt ist der Behälter (data-motion="eingang"). Die H1 hat keine festen Zeilen und steigt als ein Block hinter
// ihrer Maske auf (data-motion="zeilenmaske"), Ort und Knopfzeile setzen sich, über die Oberkante eines Fotos zieht ein
// Fugenriss. Das Bild selbst bewegt sich nie. Unter sm (Handy) kommt nur die H1 herein, wie im mittigen Einstieg (UM-E3-FIX2
// N6, UM-E4-VORL): Ort und Knopfzeile stehen ab dem ersten Bild (max-sm:animate-none), der Fugenriss entfällt; mobil endet
// der Eingang so bei 0,74 s statt 1,22 s. Der Vorspann steht auf jeder Breite ab dem ersten Bild: Er ist auf den Wissens- und
// Ortsseiten das LCP-Element (gemessen m390 bis d1920, UM-E4-VORL), und LCP-Kandidaten starten nie unsichtbar (E-067-4).
// Lot (UM-E4-VORL, Leitfaden wie auf /): Steht der Einstieg in einer Seitenformel vor der Leitachse (Wissens- und
// Ortsseiten, Erzählseite mit einfachem Einstieg), trägt er sein eigenes Lot in Grundschicht an derselben Stelle wie die
// Leitachse danach (`lot`, wie Leitachse mit gezogen={false}, R-02a). Es läuft ohne Lücke in den Leitfaden über; rot wird
// erst das Lot nach dem Einstieg, so steht im ersten Bildschirm kein zweites Rot neben Karte oder Plan (K-003). Die Zierebene
// liegt unter dem Inhalt, der Inhalt in einer positionierten Hülle ohne eigenen Stapelkontext (wie in kern/Leitachse).
// Serverkomponente.
import type { ReactNode } from 'react';
import clsx from 'clsx';
import Icon from '@/components/icons/Icon';
import WhatsAppLogo from '@/components/ui/WhatsAppLogo';
import Bildfeld from '@/components/kern/Bildfeld';
import Brotkrumen, { type Krume } from '@/components/kern/Brotkrumen';
import Hauptknopf from '@/components/kern/Hauptknopf';
import { ACHSE_LAGE } from '@/components/kern/Leitachse';
import Rufnummer from '@/components/kern/Rufnummer';
import Textmarken from '@/components/kern/Textmarken';
import { knopfKlassen, seitenKlassen } from '@/components/kern/stile';
import { COMPANY_DATA } from '@/config/company';
import type { ArbeitId } from '@/config/arbeiten';
import { buildWhatsAppUrl, kontextNachricht } from '@/lib/whatsapp';

/** Ab dieser Zeichenzahl steht die H1 eine Stufe kleiner (höchstens drei Zeilen bei 1440 px) */
const LANGER_TITEL = 44;

export interface EinstiegProps {
  pfad: string;
  brotkrumen?: Krume[];
  titel: string;
  ort: string;
  vorspann: string;
  /** Einstiegsbild aus ARBEITEN (preload) oder eigener Bildplatz (Startseite: Startbild mit Belag) */
  bild?: ArbeitId | ReactNode;
  /** unter dem Bild, z. B. die Kennzeile der Bewertungen */
  unterBild?: ReactNode;
  /** Ziel des Hauptknopfs: `/kontakt`, auf der Startseite das Formular `#termin` */
  hauptziel?: string;
  /** Arbeitsseite (K-009: ruhig, dicht, schnell): weniger Raum, H1 eine Stufe kleiner, ohne Bildspalte */
  kompakt?: boolean;
  /** eigenes Lot in Grundschicht: Der Einstieg steht in der Seitenformel vor der Leitachse (Leitfaden, UM-E4-VORL) */
  lot?: boolean;
  /** Der nächste Abschnitt steht auf Fliese (LageInhalt.aufFliese, wie EinstiegMitte, UM-E4-CHOR-FIX): ab lg bleibt unter dem
   *  letzten Block eine Stufe 16 Kalk bis zur Fuge statt einer Stufe 24 (dahinter eine Stufe 16 bis zum Kopf der Lage). Innen
   *  gesetzt, damit das Lot des Einstiegs bis an die Fuge reicht */
  fugeUnten?: boolean;
}

export default function Einstieg({ pfad, brotkrumen, titel, ort, vorspann, bild, unterBild, hauptziel = '/kontakt', kompakt = false, lot = false, fugeUnten = false }: EinstiegProps) {
  const { contact } = COMPANY_DATA;
  const titelId = 'seite-titel';
  const foto = typeof bild === 'string';
  const mitBild = Boolean(bild) && !kompakt;
  // Abstand unter dem letzten Block: ab lg eine Stufe 24, vor einer Fuge eine Stufe 16 (fugeUnten)
  const unten = clsx('pb-16', fugeUnten ? 'lg:pb-16' : 'lg:pb-24');
  const inhalt = (
    <>
      {/* oben Platz für den festen Kopf (h-16); bei großer Systemschrift am Handy (unter 16 rem Breite) steht die H1 eine Stufe
          kleiner, damit der Hauptknopf über der unteren Leiste steht (E3-SICHT, E-061) */}
      <div className={clsx(seitenKlassen, 'flex flex-col items-center pt-24 text-center lg:pt-32', kompakt ? 'pb-12 lg:pb-16' : mitBild ? 'pb-16 lg:pb-24' : unten)}>
        {brotkrumen && brotkrumen.length > 1 && <Brotkrumen wege={brotkrumen} className="mb-6" />}
        <h1
          id={titelId}
          tabIndex={-1}
          data-erstes-bild="ueberschrift"
          data-motion={kompakt ? undefined : 'zeilenmaske'}
          className={clsx(!kompakt && titel.length > LANGER_TITEL ? 'text-fs-5' : 'text-fs-6', 'max-w-mass text-balance text-tinte outline-none @max-3xs:text-fs-5')}
        >
          {titel}
        </h1>
        <p data-erstes-bild="ort" className="mt-6 max-w-mass font-text text-fs-4 text-balance text-tinte-2 max-sm:animate-none">
          {ort}
        </p>
        <div data-eingang="knoepfe" className="mt-8 flex w-full flex-col items-center gap-3 max-sm:animate-none sm:flex-row sm:flex-wrap sm:justify-center">
          <Hauptknopf href={hauptziel} erstesBild breit />
          <a href={`tel:${contact.phoneLink}`} data-erstes-bild="kontakt" data-motion="druck" className={knopfKlassen('neben', 'w-full px-4 sm:w-auto @max-3xs:flex-col @max-3xs:gap-1')}>
            <Icon name="telefon" groesse={5} className="shrink-0" />
            <span className="min-w-0">
              Anrufen: <Rufnummer nummer={contact.phone} />
            </span>
          </a>
          <a
            href={buildWhatsAppUrl(contact.whatsappNumber, kontextNachricht(pfad))}
            target="_blank"
            rel="noopener noreferrer"
            data-motion="druck"
            className={knopfKlassen('neben', 'px-4 max-lg:hidden')}
          >
            <WhatsAppLogo className="size-5 shrink-0" />
            <span>Nachricht per WhatsApp</span>
          </a>
        </div>
        {/* ohne data-eingang: das LCP-Element der Wissens- und Ortsseiten (E-067-4, siehe oben) */}
        <p className="mt-8 max-w-mass font-text text-fs-3 text-pretty text-tinte-2">
          <Textmarken text={vorspann} />
        </p>
      </div>
      {mitBild && (
        <div className={clsx(seitenKlassen, unten)}>
          {/* vollständig, mittig; am Desktop so groß, dass es wirkt, ohne die Seite zu sprengen (wie auf der Startseite).
              Fugenriss im Eingang nur über einem Foto (Kennung; relative als Halt), nicht über Karte oder Plan im Bildplatz;
              unter sm entfällt er (max-sm:after:hidden, wie im mittigen Einstieg) */}
          <div data-eingang={foto ? 'bild' : undefined} className={clsx(foto && 'relative max-sm:after:hidden', 'mx-auto w-full max-w-md lg:w-1/2 lg:max-w-full')}>
            {foto ? <Bildfeld arbeit={bild as ArbeitId} lcp sizes="(min-width: 1024px) 50vw, (min-width: 640px) 28rem, 100vw" /> : bild}
            {unterBild}
          </div>
        </div>
      )}
    </>
  );
  return (
    <section aria-labelledby={titelId} data-formel="worum" data-motion={kompakt ? undefined : 'eingang'} className="@container relative">
      {lot ? (
        <>
          {/* Zierebene: Lot in Grundschicht an der Stelle der Leitachse (data-leitachse für die Überlappungsprüfung) */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className={clsx(seitenKlassen, 'relative h-full')}>
              <div data-leitachse="" className={clsx('leitachse', ACHSE_LAGE)} />
            </div>
          </div>
          <div className="relative">{inhalt}</div>
        </>
      ) : (
        inhalt
      )}
    </section>
  );
}
