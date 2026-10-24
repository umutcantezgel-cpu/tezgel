// Vorlagen · 1 Worum es geht (KERN v3 K-006, K-009; E-025): erster Bildschirm jeder Erzähl-, Wissens- und Ortsseite,
// gebaut wie der Einstieg der Startseite. Links an der Laserlinie Brotkrumen, H1, Ort, Hauptknopf, Anruf (WhatsApp erst ab
// lg, darunter trägt die untere Leiste ihn) und Vorspann; mobil folgt der Vorspann nach Knopf und Anruf (große Systemschrift,
// Sichtprüfung E2). Rechts (ab lg) bzw. darunter das Einstiegsbild als einziges preload der Seite, auf md rechtsbündig
// eingerückt. Die Pflichtelemente des ersten Bildschirms tragen data-erstes-bild (Logo im Kopf). Serverkomponente.
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
      <div className={clsx(seitenKlassen, 'grid grid-cols-4 gap-y-12 pt-24 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-12', kompakt ? 'pb-12 lg:pt-32 lg:pb-16' : 'pb-16 lg:pt-32 lg:pb-24')}>
        <div className="col-span-4 md:col-span-8 lg:col-span-7 lg:self-center">
          {brotkrumen && brotkrumen.length > 1 && <Brotkrumen wege={brotkrumen} className="mb-6" />}
          <h1
            id={titelId}
            tabIndex={-1}
            data-erstes-bild="ueberschrift"
            className={clsx(kompakt || titel.length > LANGER_TITEL ? 'text-fs-6' : 'text-fs-7', 'text-balance text-tinte outline-none')}
          >
            {titel}
          </h1>
          <p data-erstes-bild="ort" className="mt-6 font-text text-fs-4 text-tinte">
            {ort}
          </p>
          <div className="flex flex-col">
            <p className="mt-4 max-w-mass font-text text-fs-3 text-pretty text-tinte-2 max-sm:order-1 max-sm:mt-8">
              <Textmarken text={vorspann} />
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Hauptknopf href={hauptziel} erstesBild breit />
              <div className="flex flex-col gap-3 sm:flex-row">
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
            </div>
          </div>
        </div>
        {bild && !kompakt && (
          <div className="col-span-4 md:col-span-6 md:col-start-3 lg:col-span-5 lg:col-start-8">
            {typeof bild === 'string' ? <Bildfeld arbeit={bild as ArbeitId} lcp sizes="(min-width: 1024px) 40vw, (min-width: 768px) 75vw, 100vw" /> : bild}
            {unterBild}
          </div>
        )}
      </div>
    </section>
  );
}
