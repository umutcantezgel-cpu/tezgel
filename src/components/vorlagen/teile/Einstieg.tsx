// Vorlagen · 1 Worum es geht (KERN v3 K-006, K-009; E-025; K-016 „Ruhe“, E-047): erster Bildschirm jeder Wissens-, Orts- und
// Arbeitsseite (und der Erzählseiten ohne Planblatt oder mittigen Einstieg). Ruhig und mittig wie der Einstieg der
// Startseite, kein zweiter Strang daneben: Brotkrumen, H1, Ort, Hauptknopf, Anruf (WhatsApp erst ab lg, darunter trägt die
// untere Leiste ihn), dann der Vorspann (nach den Knöpfen, damit sie auch bei großer Systemschrift im ersten Bildschirm
// stehen); darunter das Einstiegsbild vollständig als einziges preload der Seite (bzw. der Schlitz, z. B. das Einzugsband
// der Ortsseite). Die Pflichtelemente des ersten Bildschirms tragen data-erstes-bild (Logo im Kopf). Serverkomponente.
import type { ReactNode } from 'react';
import clsx from 'clsx';
import Icon from '@/components/icons/Icon';
import WhatsAppLogo from '@/components/ui/WhatsAppLogo';
import Bildfeld from '@/components/kern/Bildfeld';
import Brotkrumen, { type Krume } from '@/components/kern/Brotkrumen';
import Hauptknopf from '@/components/kern/Hauptknopf';
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
}

export default function Einstieg({ pfad, brotkrumen, titel, ort, vorspann, bild, unterBild, hauptziel = '/kontakt', kompakt = false }: EinstiegProps) {
  const { contact } = COMPANY_DATA;
  const titelId = 'seite-titel';
  return (
    <section aria-labelledby={titelId} data-formel="worum" className="relative">
      {/* oben Platz für den festen Kopf (64 px) */}
      <div className={clsx(seitenKlassen, 'flex flex-col items-center pt-24 text-center lg:pt-32', kompakt ? 'pb-12 lg:pb-16' : 'pb-16 lg:pb-24')}>
        {brotkrumen && brotkrumen.length > 1 && <Brotkrumen wege={brotkrumen} className="mb-6" />}
        <h1
          id={titelId}
          tabIndex={-1}
          data-erstes-bild="ueberschrift"
          className={clsx(!kompakt && titel.length > LANGER_TITEL ? 'text-fs-5' : 'text-fs-6', 'max-w-mass text-balance text-tinte outline-none')}
        >
          {titel}
        </h1>
        <p data-erstes-bild="ort" className="mt-6 max-w-mass font-text text-fs-4 text-balance text-tinte-2">
          {ort}
        </p>
        <div className="mt-8 flex w-full flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
          <Hauptknopf href={hauptziel} erstesBild breit />
          <a href={`tel:${contact.phoneLink}`} data-erstes-bild="kontakt" data-motion="druck" className={knopfKlassen('neben', 'w-full px-4 sm:w-auto')}>
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
        <p className="mt-8 max-w-mass font-text text-fs-3 text-pretty text-tinte-2">
          <Textmarken text={vorspann} />
        </p>
      </div>
      {bild && !kompakt && (
        <div className={clsx(seitenKlassen, 'pb-16 lg:pb-24')}>
          {/* vollständig, mittig; am Desktop so groß, dass es wirkt, ohne die Seite zu sprengen (wie auf der Startseite) */}
          <div className="mx-auto w-full max-w-md lg:w-1/2 lg:max-w-full">
            {typeof bild === 'string' ? <Bildfeld arbeit={bild as ArbeitId} lcp sizes="(min-width: 1024px) 50vw, (min-width: 640px) 28rem, 100vw" /> : bild}
            {unterBild}
          </div>
        </div>
      )}
    </section>
  );
}
