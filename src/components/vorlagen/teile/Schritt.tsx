// Vorlagen · 6 Nächster Schritt (KERN v3 K-004, K-009, E-012; E-025; K-016, E-047): die eine Hauptaktion der Seite. Mittig
// untereinander: Überschrift und Satz, der Hauptknopf „Termin vor Ort anfragen“ (→ /kontakt, dasselbe Ziel wie im Einstieg),
// darunter die Rufnummer groß wie im Termin-Abschnitt der Startseite und WhatsApp. Hilfen (Werkzeuge der Seite) folgen
// als ruhige Liste und konkurrieren nicht mit dem Hauptknopf; Wissensseiten nennen verwandte Seiten („Mehr zum Thema“).
// Fläche Fliese als Abschluss vor dem Fuß. Variante mit Formular (Startseite #termin, Ortsseite #anfrage; E-044, E-047): Kopf
// mittig, darunter die Anfrage mit vorhandener Logik (Slot, Pflichtfelder und Empfänger unverändert, G8), dann Anruf,
// WhatsApp und ein Zusatz (Öffnungszeiten oder Nachbarorte) in einer ruhigen Zeile. Die Rufnummer steht groß wie auf einem
// Bauschild (P1).
// Ein Abschluss je Seite (UM-E4-SICHT-FIX M-B3): Werkzeuge mit `imSchritt` stehen hier unter Anruf und WhatsApp (Slot
// `werkzeuge`, je Werkzeug offen oder im geschlossenen Aufklapper), darunter Hilfen und „Mehr zum Thema“ als eine ruhige
// Linkzeile: beide Gruppen ab md nebeneinander, eine Gruppe allein mit ihren Links in zwei Spalten. Stehen Werkzeuge im Schritt,
// folgen die Hilfen als weitere Zeilen ihrer Liste, die Linkzeile trägt dann nur „Mehr zum Thema“. Der Hauptknopf bleibt der
// einzige dunkle Knopf des Blocks, solange die Werkzeuge geschlossen sind. Serverkomponente.
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
import { mitFugen, zusammen } from '@/components/kern/zusammen';
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
      {/* Container-Abfrage: unter 20 rem steht der Hörer über der großen Nummer, damit sie nicht über den Rand läuft (Runde 4);
          das WhatsApp-Zeichen steht dann ebenso mittig über seinem Text (Browserprüfung E4-W0, E-065) */}
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
            className={`${linkKlassen} mt-2 inline-flex min-h-11 items-center gap-2 font-text text-fs-3 @max-xs:flex-col @max-xs:gap-1`}
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
  /** Werkzeuge der Seite im Schritt (M-B3), ohne Formular: unter Anruf und WhatsApp, über Hilfen und „Mehr zum Thema“ */
  werkzeuge?: ReactNode;
}

/** Linkname mit Pfeil am letzten Wort: bricht der Name bei großer Schrift um, folgt der Pfeil dem letzten Wort, statt am
 *  rechten Rand zu stehen (Browserprüfung E4-W1, Runde 3). Namen mit Textmarken bleiben ungeteilt. */
function MitPfeil({ text }: { text: string }) {
  const pfeil = <Icon name="pfeil-rechts" groesse={4} className="ml-2 inline-block align-text-bottom" />;
  const ende = text.lastIndexOf(' ');
  if (text.includes('[[')) {
    return (
      <>
        <Textmarken text={text} />
        {pfeil}
      </>
    );
  }
  if (ende < 0) return <span className="whitespace-nowrap">{mitFugen(text)}{pfeil}</span>;
  // das Leerzeichen gehört in denselben Text wie das Wort davor: als eigener Knoten `{' '}` hinter einem Textknoten fehlte es im
  // zugänglichen Namen („… auf Fußbodenheizunggehört“, Chrome lässt reinen Leerraum hinter Text weg)
  return (
    <>
      {mitFugen(text.slice(0, ende + 1))}
      <span className="whitespace-nowrap">
        {text.slice(ende + 1)}
        {pfeil}
      </span>
    </>
  );
}

/** Hilfen und „Mehr zum Thema“ als eine ruhige Linkzeile (M-B3): zwei Gruppen ab md nebeneinander, eine Gruppe allein mit ihren
 *  Links in zwei Spalten; in zwei Spalten ohne Fuge unter jedem Link (sie stünde sonst nur unter dem linken der letzten Reihe) */
function Linkzeile({ verwandte = [], hilfen = [] }: { verwandte?: SchrittInhalt['verwandte']; hilfen?: SchrittInhalt['hilfen'] }) {
  const mitVerwandten = verwandte.length > 0;
  const mitHilfen = hilfen.length > 0;
  if (!mitVerwandten && !mitHilfen) return null;
  const beide = mitVerwandten && mitHilfen;
  const liste = clsx('mt-2', !beide && 'md:grid md:grid-cols-2 md:gap-x-8');
  const eintrag = clsx('border-b border-fuge last:border-b-0', !beide && 'md:border-b-0');
  return (
    <div className={clsx('grid w-full gap-6 border-t border-fuge pt-6', beide && 'md:grid-cols-2 md:gap-8')}>
      {mitVerwandten && (
        <div>
          <h3 className="font-text text-fs-3 font-semibold text-tinte">Mehr zum Thema</h3>
          <ul className={liste}>
            {verwandte.map((v) => (
              <li key={v.href} className={eintrag}>
                <Link href={v.href} data-motion="zustand" className={clsx(linkKlassen, 'inline-block min-h-11 py-2 font-text text-fs-3')}>
                  <MitPfeil text={v.name} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {mitHilfen && (
        <div>
          <h3 className="font-text text-fs-3 font-semibold text-tinte">Hilfen</h3>
          <ul className={liste}>
            {hilfen.map((h) => (
              <li key={h.href} className={eintrag}>
                <Link href={h.href} data-motion="zustand" className={clsx(linkKlassen, 'flex min-h-11 flex-col items-start py-3 no-underline')}>
                  {/* Pfeil am letzten Wort wie bei „Mehr zum Thema“ (Browserprüfung E4-W1, Runde 4) */}
                  <span className="font-semibold text-fs-3 underline decoration-fuge underline-offset-4">
                    <MitPfeil text={h.name} />
                  </span>
                  {h.satz && (
                    <span className="mt-1 font-text text-fs-2 text-tinte-2">
                      <Textmarken text={h.satz} />
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/** Hilfen unter den Werkzeugen im Schritt (M-B3): als weitere Zeilen derselben Liste an der Fuge, Name mit Pfeil wie die Zeile
 *  eines Aufklappers mit Plus, der Satz darunter. Vorher standen sie als eigene Gruppe „Hilfen“ darunter; auf /bad blieb dort nur
 *  ein einzelner Link ohne Satz und las sich wie ein Rest (Prüfung SF-B, Nacharbeit) */
function Hilfezeilen({ hilfen = [] }: { hilfen?: SchrittInhalt['hilfen'] }) {
  if (!hilfen.length) return null;
  return (
    <ul>
      {hilfen.map((h) => (
        <li key={h.href} className="border-t border-fuge">
          <Link href={h.href} data-motion="zustand" className={clsx(linkKlassen, 'flex min-h-12 flex-col items-start py-3 no-underline')}>
            <span className="font-text text-fs-3 font-semibold text-tinte underline decoration-fuge underline-offset-4">
              <MitPfeil text={h.name} />
            </span>
            {h.satz && (
              <span className="mt-1 font-text text-fs-2 text-tinte-2">
                <Textmarken text={h.satz} />
              </span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Schritt({ inhalt, pfad, formular, titelId = 'anfrage', zusatz, werkzeuge }: SchrittProps) {
  if (formular) return <FormularSchritt inhalt={inhalt} pfad={pfad} formular={formular} titelId={titelId} zusatz={zusatz} />;
  const { contact } = COMPANY_DATA;
  return (
    <Abschnitt
      id="naechster-schritt"
      formel="schritt"
      leitachse
      flaeche="fliese"
      mitte
      // Wörter aus FUGEN trennen an ihrer Fuge: „Badsanierung.“ in der dritten Zeile ragte bei 200 % über die Spalte (FS-K Nr. 5)
      titel={mitFugen(inhalt.titel)}
      einleitung={<p><Textmarken text={inhalt.satz} /></p>}
    >
      {/* ruhig (K-016, E-047): alles mittig untereinander statt Kopf links und Knöpfe rechts zugleich */}
      <div className="mx-auto flex max-w-mass flex-col items-center gap-8">
        <Hauptknopf breit />
        {/* Container-Abfrage: unter 20 rem Hörer über der großen Nummer (Runde 4), mittig wie die Nummer; ebenso das
            WhatsApp-Zeichen über seinem Text, sobald der umbricht (Browserprüfung E4-W0, E-065) */}
        <div className="@container grid w-full gap-6 border-t border-fuge pt-6 text-center md:grid-cols-2 md:text-left">
          <div>
            <p className="font-text text-fs-3 text-tinte">Lieber anrufen?</p>
            <a
              href={`tel:${contact.phoneLink}`}
              data-motion="zustand"
              aria-label={`Anrufen: ${contact.phone}`}
              className={`${linkKlassen} mt-2 inline-flex min-h-11 items-center gap-3 text-fs-5 text-tinte lg:text-fs-4 @max-xs:flex-col @max-xs:gap-1`}
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
              className={`${linkKlassen} mt-2 inline-flex min-h-11 items-center gap-2 font-text text-fs-3 @max-xs:flex-col @max-xs:gap-1`}
            >
              <WhatsAppLogo className="size-5 shrink-0" />
              Nachricht per WhatsApp
            </a>
          </div>
        </div>
        {werkzeuge && (
          <div className="w-full">
            {werkzeuge}
            <Hilfezeilen hilfen={inhalt.hilfen} />
          </div>
        )}
        <Linkzeile verwandte={inhalt.verwandte} hilfen={werkzeuge ? undefined : inhalt.hilfen} />
      </div>
    </Abschnitt>
  );
}
