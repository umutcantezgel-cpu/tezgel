// Vorlagen · 1 Worum es geht, mittig (KERN v3.6 K-016 „Ruhe“, E-047): ruhiger Einstieg ohne zweiten Strang daneben. Mittig
// die H1 eine Stufe kleiner als im Planblatt (fs-6, ihre Zeilen rücken in die Flucht: sig-flucht), darunter in einer Zeile,
// was der Betrieb macht und wo (zugleich der Ort des ersten Bildschirms), der Hauptknopf, Anruf und ab xl WhatsApp, die
// Bewertungszeile. Danach das Foto vollständig in seinem eigenen Seitenverhältnis, nie angeschnitten (Startseite: das
// Startbild mit seinem großen Moment). Die fünf Pflichtelemente des ersten Bildschirms tragen data-erstes-bild (Logo im
// Kopf). Die Oberkante der H1 (pt-24, ab lg pt-32) braucht das Intro der Startseite (bewegung.css, html.k-intro-start).
// Serverkomponente.
import type { ReactNode } from 'react';
import Icon from '@/components/icons/Icon';
import WhatsAppLogo from '@/components/ui/WhatsAppLogo';
import Bewertungszeile from '@/components/kern/Bewertungszeile';
import Bildfeld from '@/components/kern/Bildfeld';
import Brotkrumen, { type Krume } from '@/components/kern/Brotkrumen';
import Hauptknopf from '@/components/kern/Hauptknopf';
import Rufnummer from '@/components/kern/Rufnummer';
import { knopfKlassen, seitenKlassen } from '@/components/kern/stile';
import { COMPANY_DATA } from '@/config/company';
import type { ArbeitId } from '@/config/arbeiten';
import { buildWhatsAppUrl, kontextNachricht } from '@/lib/whatsapp';

export interface EinstiegMitteProps {
  pfad: string;
  brotkrumen?: Krume[];
  /** H1 in festen Zeilen (sig-flucht); bei großer Schrift fließen sie als ein Satz */
  titelZeilen: string[];
  /** eine Zeile unter der H1: was und wo (Ort des ersten Bildschirms) */
  ort: string;
  hauptziel: string;
  /** Foto vollständig (Kennung) oder eigener Bildplatz (Startbild mit Moment) */
  bild: ArbeitId | ReactNode;
  bewertung?: boolean;
}

export default function EinstiegMitte({ pfad, brotkrumen, titelZeilen, ort, hauptziel, bild, bewertung = false }: EinstiegMitteProps) {
  const { contact } = COMPANY_DATA;
  return (
    <section aria-labelledby="seite-titel" data-formel="worum" className="relative">
      <div className={`${seitenKlassen} flex flex-col items-center pt-24 text-center flach:pt-16 lg:pt-32`}>
        {brotkrumen && brotkrumen.length > 1 && <Brotkrumen wege={brotkrumen} className="mb-6 flach:hidden" />}
        <h1 id="seite-titel" data-erstes-bild="ueberschrift" data-motion="sig-flucht" className="text-fs-6 text-balance text-tinte flach:text-fs-5">
          {titelZeilen.map((zeile, i) => (
            <span key={zeile} className="block flach:inline">
              {zeile}
              {i < titelZeilen.length - 1 && ' '}
            </span>
          ))}
        </h1>
        <p data-erstes-bild="ort" className="mt-6 max-w-mass font-text text-fs-4 text-balance text-tinte-2 flach:mt-3">
          {ort}
        </p>
        <div className="@container mt-12 flex w-full flex-col items-center gap-3 flach:mt-6 sm:flex-row sm:flex-wrap sm:justify-center">
          <Hauptknopf href={hauptziel} erstesBild breit />
          <a href={`tel:${contact.phoneLink}`} data-erstes-bild="kontakt" data-motion="druck" className={knopfKlassen('neben', 'w-full px-4 sm:w-auto')}>
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
        {bewertung && <Bewertungszeile className="mt-8 font-text text-fs-2 text-tinte-2 hyphens-none" />}
      </div>
      {/* Foto vollständig, mittig; am Desktop so groß, dass es wirkt, ohne die Seite zu sprengen */}
      <div className={`${seitenKlassen} pt-12 pb-16 lg:pt-16 lg:pb-24`}>
        <div className="mx-auto w-full max-w-md lg:w-2/5 lg:max-w-full">
          {typeof bild === 'string' ? <Bildfeld arbeit={bild as ArbeitId} sizes="(min-width: 1024px) 40vw, (min-width: 640px) 28rem, 100vw" /> : bild}
        </div>
      </div>
    </section>
  );
}
