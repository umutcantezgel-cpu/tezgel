// Vorlagen · 6 Nächster Schritt (KERN v3 K-004, K-009, E-012; E-025): die eine Hauptaktion der Seite. Kopf seitlich:
// links Überschrift und Satz, rechts der Hauptknopf „Termin vor Ort anfragen“ (→ /kontakt, dasselbe Ziel wie im Einstieg),
// darunter die Rufnummer groß wie im Termin-Abschnitt der Startseite und WhatsApp. Hilfen (Werkzeuge der Seite) folgen
// als ruhige Liste und konkurrieren nicht mit dem Hauptknopf; Wissensseiten nennen verwandte Seiten („Mehr zum Thema“).
// Fläche Fliese als Abschluss vor dem Fuß. Variante mit Formular (Startseite #termin, Ortsseite #anfrage; E-044, E-047): Kopf
// mittig, darunter die Anfrage mit vorhandener Logik (Slot, Pflichtfelder und Empfänger unverändert, G8), dann Anruf,
// WhatsApp und ein Zusatz (Öffnungszeiten oder Nachbarorte) in einer ruhigen Zeile. Die Rufnummer steht groß wie auf einem
// Bauschild (P1). Serverkomponente.
import type { ReactNode } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import Icon from '@/components/icons/Icon';
import WhatsAppLogo from '@/components/ui/WhatsAppLogo';
import Abschnitt from '@/components/kern/Abschnitt';
import Hauptknopf from '@/components/kern/Hauptknopf';
import Rufnummer from '@/components/kern/Rufnummer';
import Textmarken from '@/components/kern/Textmarken';
import { linkKlassen } from '@/components/kern/stile';
import { zusammen } from '@/components/kern/zusammen';
import { COMPANY_DATA } from '@/config/company';
import { oeffnungszeilen } from '@/lib/oeffnungszeiten';
import { buildWhatsAppUrl, kontextNachricht } from '@/lib/whatsapp';
import type { SchrittInhalt, Verweis } from '../inhalt';

/** Zusatz im Formular-Schritt: Öffnungszeiten aus COMPANY_DATA (Zeilen nach den Schreibregeln) */
export function Oeffnungszeiten() {
  return (
    <div>
      <h3 className="font-text text-fs-3 font-semibold text-tinte">Wann Sie uns erreichen</h3>
      <ul className="mt-2 font-text text-fs-2 text-tinte-2">
        {oeffnungszeilen().map((z) => (
          <li key={z}>{z}</li>
        ))}
      </ul>
    </div>
  );
}

/** Zusatz im Formular-Schritt der Ortsseite: die nächstgelegenen Orte */
export function Nachbarorte({ nachbarn }: { nachbarn: Verweis[] }) {
  if (!nachbarn.length) return null;
  return (
    <div>
      <h3 className="font-text text-fs-3 font-semibold text-tinte">Wir arbeiten auch in:</h3>
      <ul className="mt-2 flex flex-wrap gap-x-4">
        {nachbarn.map((n) => (
          <li key={n.href}>
            <Link href={n.href} data-motion="zustand" className={clsx(linkKlassen, 'inline-flex min-h-11 items-center font-text text-fs-3 hyphens-none')}>
              {n.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FormularSchritt({ inhalt, pfad, formular, titelId, zusatz }: { inhalt: SchrittInhalt; pfad: string; formular: ReactNode; titelId: string; zusatz?: ReactNode }) {
  const { contact } = COMPANY_DATA;
  // ruhig (K-016, E-047): Kopf mittig, darunter das Formular mittig und dann Anruf, WhatsApp und Zusatz in einer Zeile,
  // statt links und rechts zugleich (vorher Kopfspalte mit Anruf neben dem Formular)
  return (
    <Abschnitt
      titelId={titelId}
      formel="schritt"
      leitachse
      flaeche="fliese"
      mitte
      titel={zusammen(inhalt.titel)}
      einleitung={
        <p>
          <Textmarken text={inhalt.satz} />
        </p>
      }
    >
      <div className="mx-auto w-full max-w-mass">{formular}</div>
      {/* Container-Abfrage: unter 20 rem steht der Hörer über der großen Nummer, damit sie nicht über den Rand läuft (Runde 4) */}
      <div className="@container mx-auto mt-12 grid max-w-mass gap-8 border-t border-fuge pt-8 text-center md:grid-cols-2 md:text-left">
        <div>
          <p className="font-text text-fs-3 text-tinte">Lieber anrufen?</p>
          <a
            href={`tel:${contact.phoneLink}`}
            data-motion="zustand"
            aria-label={`Anrufen: ${contact.phone}`}
            className={`${linkKlassen} mt-2 inline-flex min-h-11 items-center gap-3 text-fs-4 text-tinte @max-xs:flex-col @max-xs:gap-1`}
          >
            <Icon name="telefon" groesse={6} className="shrink-0" />
            <Rufnummer nummer={contact.phone} />
          </a>
        </div>
        <div>
          <p className="font-text text-fs-3 text-tinte">Lieber schreiben?</p>
          <a
            href={buildWhatsAppUrl(contact.whatsappNumber, kontextNachricht(pfad))}
            target="_blank"
            rel="noopener noreferrer"
            data-motion="zustand"
            className={`${linkKlassen} mt-2 inline-flex min-h-11 items-center gap-2 font-text text-fs-3`}
          >
            <WhatsAppLogo className="size-5" />
            Nachricht per WhatsApp
          </a>
        </div>
        {zusatz && <div className="md:col-span-2">{zusatz}</div>}
      </div>
    </Abschnitt>
  );
}

export interface SchrittProps {
  inhalt: SchrittInhalt;
  pfad: string;
  /** Anfrageformular der Seite (Startseite, Ortsseite): dann steht es rechts, Anruf und WhatsApp in der Kopfspalte */
  formular?: ReactNode;
  /** id der H2 (Ziel aller Hauptknöpfe der Seite, `hauptziel` in navigation.js), nur mit Formular */
  titelId?: string;
  /** dritter Block unter Anruf und WhatsApp, nur mit Formular (z. B. Öffnungszeiten, Nachbarorte) */
  zusatz?: ReactNode;
}

export default function Schritt({ inhalt, pfad, formular, titelId = 'anfrage', zusatz }: SchrittProps) {
  if (formular) return <FormularSchritt inhalt={inhalt} pfad={pfad} formular={formular} titelId={titelId} zusatz={zusatz} />;
  const { contact } = COMPANY_DATA;
  return (
    <Abschnitt
      id="naechster-schritt"
      formel="schritt"
      leitachse
      flaeche="fliese"
      kopf="seitlich"
      ziel
      titel={inhalt.titel}
      einleitung={<p><Textmarken text={inhalt.satz} /></p>}
    >
      <div className="flex flex-col items-start gap-8">
        <Hauptknopf breit />
        {/* Container-Abfrage: unter 20 rem Hörer über der großen Nummer (Runde 4) */}
        <div className="@container grid w-full gap-6 border-t border-fuge pt-6 md:grid-cols-2">
          <div>
            <p className="font-text text-fs-3 text-tinte">Lieber anrufen?</p>
            <a
              href={`tel:${contact.phoneLink}`}
              data-motion="zustand"
              aria-label={`Anrufen: ${contact.phone}`}
              className={`${linkKlassen} mt-2 inline-flex min-h-11 items-center gap-3 text-fs-5 text-tinte lg:text-fs-4 @max-xs:flex-col @max-xs:items-start @max-xs:gap-1`}
            >
              <Icon name="telefon" groesse={6} className="shrink-0" />
              <Rufnummer nummer={contact.phone} />
            </a>
          </div>
          <div>
            <p className="font-text text-fs-3 text-tinte">Lieber schreiben?</p>
            <a
              href={buildWhatsAppUrl(contact.whatsappNumber, kontextNachricht(pfad))}
              target="_blank"
              rel="noopener noreferrer"
              data-motion="zustand"
              className={`${linkKlassen} mt-2 inline-flex min-h-11 items-center gap-2 font-text text-fs-3`}
            >
              <WhatsAppLogo className="size-5 shrink-0" />
              Nachricht per WhatsApp
            </a>
          </div>
        </div>
        {inhalt.verwandte && inhalt.verwandte.length > 0 && (
          <div className="w-full border-t border-fuge pt-6">
            <h3 className="font-text text-fs-3 font-semibold text-tinte">Mehr zum Thema</h3>
            <ul className="mt-2">
              {inhalt.verwandte.map((v) => (
                <li key={v.href} className="border-b border-fuge last:border-b-0">
                  <Link href={v.href} data-motion="zustand" className={clsx(linkKlassen, 'inline-flex min-h-11 items-center gap-2 py-2 font-text text-fs-3')}>
                    <span>
                      <Textmarken text={v.name} />
                    </span>
                    <Icon name="pfeil-rechts" groesse={4} className="shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        {inhalt.hilfen && inhalt.hilfen.length > 0 && (
          <div className="w-full border-t border-fuge pt-6">
            <h3 className="font-text text-fs-3 font-semibold text-tinte">Hilfen</h3>
            <ul className="mt-2">
              {inhalt.hilfen.map((h) => (
                <li key={h.href} className="border-b border-fuge last:border-b-0">
                  <Link href={h.href} data-motion="zustand" className={clsx(linkKlassen, 'flex min-h-11 flex-col items-start py-3 no-underline')}>
                    <span className="inline-flex items-center gap-2 font-semibold text-fs-3 underline decoration-fuge underline-offset-4">
                      {h.name}
                      <Icon name="pfeil-rechts" groesse={4} />
                    </span>
                    <span className="mt-1 font-text text-fs-2 text-tinte-2">
                      <Textmarken text={h.satz} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Abschnitt>
  );
}
