// Vorlagen · 1 Worum es geht, mittig (KERN v3.6 K-016 „Ruhe“, E-047): ruhiger Einstieg ohne zweiten Strang daneben. Mittig
// die H1 eine Stufe kleiner als im Planblatt (fs-6, ihre Zeilen rücken in die Flucht: sig-flucht), darunter in einer Zeile,
// was der Betrieb macht und wo (zugleich der Ort des ersten Bildschirms), der Hauptknopf, Anruf und ab xl WhatsApp, die
// Bewertungszeile. Danach das Foto vollständig in seinem eigenen Seitenverhältnis, nie angeschnitten (Startseite: das
// Startbild). Das Foto ist das LCP-Element der Seite und lädt darum sofort mit hoher Priorität (E-061). Die fünf
// Pflichtelemente des ersten Bildschirms tragen data-erstes-bild (Logo im Kopf).
// Eingang ohne Vorhang (E-067-4, bewegung.css „eingang“): Der Abschnitt ist der Behälter (data-motion="eingang"). Die Zeilen
// der H1 steigen hinter Zeilenmasken auf (data-motion="zeilenmaske", --zeile ist ihre Nummer für den Abstand), Ort und
// Knopfzeile setzen sich, über die Oberkante des Fotos zieht ein Fugenriss. Das Foto selbst bewegt sich nie. Flach fließen
// die Zeilen als ein Satz (inline): dort keine Maske (flach:animate-none), wie die Flucht dort ohnehin nicht wirkt.
// Serverkomponente.
import type { CSSProperties, ReactNode } from 'react';
import Icon from '@/components/icons/Icon';
import WhatsAppLogo from '@/components/ui/WhatsAppLogo';
import Bewertungszeile from '@/components/kern/Bewertungszeile';
import Bildfeld from '@/components/kern/Bildfeld';
import Brotkrumen, { type Krume } from '@/components/kern/Brotkrumen';
import Hauptknopf from '@/components/kern/Hauptknopf';
import Rufnummer from '@/components/kern/Rufnummer';
import WeiterLink from '@/components/kern/WeiterLink';
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
  /** Anker der Einsatzorte auf derselben Seite (Startseite): Link unter der Ortszeile, „arbeitet er in meinem Ort?“ (A6) */
  orteAnker?: string;
}

/** Erster Schritt und Kosten in einem Satz unter den Knöpfen (Aufgabe A5, Probeläufe E3: Ablauf und kostenfreier Termin erst
 *  nach vielem Scrollen; E-062). Termin kostenfrei: K-015 F-12; Angebot mit festem Preis wie im Ablauf jeder Seite. */
const ERSTER_SCHRITT = 'Deniz Tezgel kommt kostenfrei zu Ihnen und schaut sich alles an. Danach bekommen Sie ein Angebot mit festem Preis.';

export default function EinstiegMitte({ pfad, brotkrumen, titelZeilen, ort, hauptziel, bild, bewertung = false, orteAnker }: EinstiegMitteProps) {
  const { contact } = COMPANY_DATA;
  return (
    <section aria-labelledby="seite-titel" data-formel="worum" data-motion="eingang" className="relative">
      <div className={`${seitenKlassen} flex flex-col items-center pt-24 text-center flach:pt-16 lg:pt-32`}>
        {brotkrumen && brotkrumen.length > 1 && <Brotkrumen wege={brotkrumen} className="mb-6 flach:hidden" />}
        <h1 id="seite-titel" data-erstes-bild="ueberschrift" data-motion="sig-flucht" className="text-fs-6 text-balance text-tinte flach:text-fs-5">
          {titelZeilen.map((zeile, i) => (
            <span key={zeile} data-motion="zeilenmaske" style={{ '--zeile': i } as CSSProperties} className="block flach:inline flach:animate-none">
              {zeile}
              {i < titelZeilen.length - 1 && ' '}
            </span>
          ))}
        </h1>
        <p data-erstes-bild="ort" className="mt-6 max-w-mass font-text text-fs-4 text-balance text-tinte-2 flach:mt-3">
          {ort}
        </p>
        {orteAnker && (
          <p className="mt-3 flach:hidden">
            <WeiterLink href={`#${orteAnker}`}>Alle Orte, in denen wir arbeiten</WeiterLink>
          </p>
        )}
        <div data-eingang="knoepfe" className="@container mt-12 flex w-full flex-col items-center gap-3 flach:mt-6 sm:flex-row sm:flex-wrap sm:justify-center">
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
        <p className="mt-8 max-w-mass font-text text-fs-3 text-pretty text-tinte-2 flach:hidden">{ERSTER_SCHRITT}</p>
        {bewertung && <Bewertungszeile className="mt-8 font-text text-fs-2 text-tinte-2 hyphens-none" />}
      </div>
      {/* Foto vollständig, mittig; am Desktop so groß, dass es wirkt, ohne die Seite zu sprengen. relative: Halt für den
          Fugenriss an der Oberkante im Eingang (nur ein Pseudoelement, das Foto bleibt unberührt) */}
      <div className={`${seitenKlassen} pt-12 pb-16 lg:pt-16 lg:pb-24`}>
        <div data-eingang="bild" className="relative mx-auto w-full max-w-md lg:w-2/5 lg:max-w-full">
          {typeof bild === 'string' ? <Bildfeld arbeit={bild as ArbeitId} lcp sizes="(min-width: 1024px) 40vw, (min-width: 640px) 28rem, 100vw" /> : bild}
        </div>
      </div>
    </section>
  );
}
