'use client';

// Ansicht der Terminanfrage auf /termin (F-08, P4-05c, KERN v1.2) ohne eigene Logik: bekommt das Ergebnis von
// `useTerminAnfrage` (Bestand und Kern nutzen denselben Hook, G9) und den Kalender (F-07) als fertiges Element, damit die
// Vorschau ihn mit fester Uhrzeit einsetzen kann.
// Aufbau wie im Bestand `src/app/(bestand)/termin/page.jsx` (Inhalt unter dem Seitenkopf): Umschalter Kalender/Formular,
// darunter Kalender oder Formular; nach dem Absenden die Meldung online bzw. WhatsApp an derselben Stelle.
// - Umschalter: zwei Knöpfe mit aria-pressed (gewählt: Tinte + Fugenkreuz, nicht nur Farbe); Emojis bleiben im Wortlaut,
//   stehen aber aria-hidden, damit der Name des Knopfs der Text ist.
// - WhatsApp-Weg wie im Bestand als zweiter Absende-Knopf (name="channel" value="whatsapp"): Der Hook liest den
//   auslösenden Knopf (submitter), die Pflichtfelder sperren beide Wege über die Formularprüfung des Browsers.
// - Fokus: nach dem Absenden auf die Meldung; zurück („Weiteren Termin anfragen“, „Anfrage bearbeiten“) auf das erste
//   Feld bzw. den gewählten Umschalter. Der Wechsel des Umschalters lässt den Fokus am Knopf.
// Wortlaut, IDs, name, type und autocomplete wie im Bestand; für /termin gibt es keine Zeile in MIKROTEXTE.md, darum
// bleiben Ladetext, Erfolgstext, Emojis und „Per WhatsApp senden“ wörtlich (Vorschläge in der Rückgabe P4-05c).
import { useRef, type ReactNode } from 'react';
import { COMPANY_DATA } from '@/config/company';
import { TIME_SLOTS, TOPICS, formatDate, labelOf, type useTerminAnfrage } from '@/lib/formulare/useTerminAnfrage';
import Ankreuzfeld from '@/components/kern/basis/Ankreuzfeld';
import Auswahl from '@/components/kern/basis/Auswahl';
import Etikett from '@/components/kern/basis/Etikett';
import Feld from '@/components/kern/basis/Feld';
import { Feldrahmen, feldKlassen, useFeldIds } from '@/components/kern/basis/Feldrahmen';
import Hinweis from '@/components/kern/basis/Hinweis';
import Knopf from '@/components/kern/basis/Knopf';
import Mehrzeilig from '@/components/kern/basis/Mehrzeilig';
import SendeKnopf from '@/components/kern/basis/SendeKnopf';
import Textlink from '@/components/kern/basis/Textlink';
import { Fugenkreuz } from '@/components/kern/basis/Zeichen';
import { fokus, verbinde } from '@/components/kern/basis/klassen';
import Icon from '@/components/kern/icons/Icon';
import { useFokusBeiWechsel } from '@/components/kern/formulare/b/useFokusBeiWechsel';
import { BEHAELTER, INNEN, KNOPFREIHE, KONTAKT, PAAR_LANG, PLATZHALTER_TEXT } from '@/components/kern/formulare/c/raster';

export type TerminAnfrageDaten = ReturnType<typeof useTerminAnfrage>;

const FELD = 'border border-k-fuge bg-k-fliese';
const MELDUNG = verbinde(FELD, 'flex flex-col gap-k-5', INNEN, fokus('hell'));
const UMSCHALTER = verbinde(
  'flex min-h-k-7 min-w-0 flex-1 items-center justify-center gap-k-2 border-r border-b border-k-strich px-k-4 py-k-2 text-center k-text text-k-2 font-semibold',
  'focus-visible:relative focus-visible:z-10',
  fokus('hell'),
);
const UMSCHALTER_RUHE = 'cursor-pointer bg-k-fliese text-k-tinte pointer-fine:hover:bg-k-kalk active:bg-k-fuge';
const UMSCHALTER_GEWAEHLT = 'cursor-pointer bg-k-tinte text-k-kalk';

export default function TerminAnfrageAnsicht({ anfrage, kalender }: { anfrage: TerminAnfrageDaten; kalender: ReactNode }) {
  const {
    bookingMode,
    setBookingMode,
    sentVia,
    setSentVia,
    referenceId,
    isSubmitting,
    errorMessage,
    formData,
    update,
    handleSubmit,
    handleNewRequest,
  } = anfrage;
  const { contact, owner } = COMPANY_DATA;
  const datum = useFeldIds('termin-date');

  const ansicht = sentVia ?? 'eingabe';
  const fokusZiel = useRef<HTMLElement | null>(null);
  const setzeZiel = (el: HTMLElement | null) => {
    fokusZiel.current = el;
  };
  useFokusBeiWechsel(ansicht, fokusZiel);

  const anrufen = (
    <Knopf href={`tel:${contact.phoneLink}`} vorne={<Icon name="telefon" groesse={20} />}>
      Direkt anrufen: <span className="k-mono">{contact.phone}</span>
    </Knopf>
  );

  if (sentVia === 'online') {
    return (
      <div className={BEHAELTER}>
        <div ref={setzeZiel} tabIndex={-1} role="status" className={MELDUNG}>
          <span data-motion="notiert" className="flex text-k-abnahme">
            <Icon name="haken" groesse={32} inline />
          </span>
          <div className="flex flex-wrap items-baseline gap-x-k-4 gap-y-k-2">
            <Etikett ton="tinte">Terminanfrage erfolgreich übermittelt</Etikett>
            {referenceId && <Etikett rahmen ton="tinte">Vorgangs-Nr.: {referenceId}</Etikett>}
          </div>
          <h2 className="k-anzeige text-k-5 text-k-tinte">Vielen Dank, {formData.name}!</h2>
          <p className="max-w-(--k-mass) k-text text-k-3 text-k-tinte">
            Ihre Terminanfrage für <strong>{labelOf(TOPICS, formData.topic)}</strong> am <strong>{formatDate(formData.date)}</strong> ({labelOf(TIME_SLOTS, formData.timeSlot)}) ist erfolgreich eingegangen.
            {formData.email && (
              <span className="mt-k-3 block border border-k-fuge p-k-3 text-k-2 text-k-tinte-2">
                ✉️ Eine Bestätigung mit allen Termindaten wurde an <em className="wrap-break-word">{formData.email}</em> gesendet.
              </span>
            )}
          </p>

          <div className="flex flex-col gap-k-2 border border-k-fuge p-k-4 k-text text-k-2 text-k-tinte-2">
            <p className="flex items-center gap-k-2 font-semibold text-k-tinte">
              <Fugenkreuz className="size-k-3 shrink-0" />
              Nächste Schritte:
            </p>
            <p>1. Inhaber Deniz Tezgel gleicht Ihren Wunschtermin mit dem aktuellen Einsatzplan ab.</p>
            <p>
              2. Wir bestätigen Ihnen das Zeitfenster telefonisch unter <strong className="k-mono text-k-tinte">{formData.phone}</strong>.
            </p>
            <p>3. Pünktlicher Termin bei Ihnen vor Ort für das kostenfreie Aufmaß und die persönliche Beratung.</p>
          </div>

          <div className={KNOPFREIHE}>
            {anrufen}
            <Knopf art="neben" onClick={handleNewRequest}>
              Weiteren Termin anfragen
            </Knopf>
          </div>
        </div>
      </div>
    );
  }

  if (sentVia === 'whatsapp') {
    return (
      <div className={BEHAELTER}>
        <div ref={setzeZiel} tabIndex={-1} role="status" className={MELDUNG}>
          <span className="flex text-k-tinte">
            <Icon name="whatsapp" groesse={32} />
          </span>
          <Etikett ton="tinte">WhatsApp wurde geöffnet</Etikett>
          <h2 className="k-anzeige text-k-5 text-k-tinte">Fast geschafft – bitte jetzt absenden</h2>
          <p className="max-w-(--k-mass) k-text text-k-3 text-k-tinte">
            Vielen Dank, {formData.name}. Ihre Terminanfrage (<span className="k-mono">{formatDate(formData.date)}</span> &middot; {labelOf(TIME_SLOTS, formData.timeSlot)}) ist vorbereitet. Senden Sie die Nachricht in WhatsApp ab – {owner.fullName} meldet sich dann persönlich bei Ihnen, um den Termin abzustimmen.
          </p>
          <div className={KNOPFREIHE}>
            {anrufen}
            <Knopf art="neben" onClick={() => setSentVia(null)}>
              Anfrage bearbeiten
            </Knopf>
          </div>
        </div>
      </div>
    );
  }

  const umschalter = (modus: 'calendar' | 'form', zeichen: string, text: string) => {
    const gewaehlt = bookingMode === modus;
    return (
      <button
        type="button"
        aria-pressed={gewaehlt}
        ref={gewaehlt && modus === 'calendar' ? setzeZiel : undefined}
        onClick={() => setBookingMode(modus)}
        data-motion="zustand"
        className={verbinde(UMSCHALTER, gewaehlt ? UMSCHALTER_GEWAEHLT : UMSCHALTER_RUHE)}
      >
        {gewaehlt ? (
          <span aria-hidden="true" className="flex shrink-0">
            <Fugenkreuz className="size-k-3" />
          </span>
        ) : null}
        <span className={verbinde('min-w-0', 'wrap-break-word hyphens-auto')}>
          <span aria-hidden="true">{zeichen}</span> {text}
        </span>
      </button>
    );
  };

  return (
    <div className={BEHAELTER}>
      <div className="flex flex-col gap-k-6">
        {/* Umschalter Kalender / Formular: nebeneinander ab 36 rem */}
        <div className="flex flex-col border-l border-t border-k-strich @xl:flex-row">
          {umschalter('calendar', '📅', '2-Schritt Schnellauswahl')}
          {umschalter('form', '📝', 'Individuelles Formular')}
        </div>

        {bookingMode === 'calendar' ? (
          kalender
        ) : (
          <form onSubmit={handleSubmit} className={verbinde(FELD, 'flex flex-col gap-k-5', INNEN)}>
            <Auswahl
              ref={setzeZiel}
              id="termin-topic"
              beschriftung="1. Welches Thema möchten Sie besprechen?"
              zusatz="*"
              required
              value={formData.topic}
              onChange={update('topic')}
            >
              {TOPICS.map((topic) => (
                <option key={topic.value} value={topic.value}>{topic.label}</option>
              ))}
            </Auswahl>

            {/* Datum und Zeitfenster nebeneinander ab 56 rem: „Vormittags (08:00 – 12:00 Uhr)“ passt dann ganz in die Auswahl */}
            <div className="grid grid-cols-1 gap-k-5 @4xl:grid-cols-2">
              <Feldrahmen beschriftung="2. Wunschdatum" ids={datum}>
                <input
                  id={datum.id}
                  type="date"
                  value={formData.date}
                  onChange={update('date')}
                  data-motion="zustand"
                  className={feldKlassen({ mono: true })}
                />
              </Feldrahmen>
              <Auswahl id="termin-slot" beschriftung="Bevorzugtes Zeitfenster" value={formData.timeSlot} onChange={update('timeSlot')}>
                {TIME_SLOTS.map((slot) => (
                  <option key={slot.value} value={slot.value}>{slot.label}</option>
                ))}
              </Auswahl>
            </div>

            <div className={verbinde(KONTAKT, 'border-t border-k-fuge pt-k-5')}>
              <Feld
                id="termin-name"
                className={PAAR_LANG}
                beschriftung="Name, Vorname"
                zusatz="*"
                required
                autoComplete="name"
                placeholder="Max Mustermann"
                value={formData.name}
                onChange={update('name')}
              />
              <Feld
                id="termin-phone"
                className={verbinde(PAAR_LANG, PLATZHALTER_TEXT)}
                art="tel"
                beschriftung="Telefonnummer"
                zusatz="*"
                required
                minLength={6}
                autoComplete="tel"
                placeholder="Für die Rücksprache zum Termin"
                value={formData.phone}
                onChange={update('phone')}
              />
              <Feld
                id="termin-email"
                art="email"
                beschriftung="E-Mail-Adresse"
                zusatz="(optional)"
                autoComplete="email"
                placeholder="ihre-adresse@beispiel.de"
                value={formData.email}
                onChange={update('email')}
              />
              <Feld
                id="termin-zip"
                beschriftung="PLZ & Ort"
                autoComplete="postal-code"
                placeholder="z. B. 35614 Aßlar"
                value={formData.zipCity}
                onChange={update('zipCity')}
              />
            </div>

            <Mehrzeilig
              id="termin-notes"
              beschriftung="Ihre Notizen / Anliegen"
              rows={3}
              placeholder="z. B. Bad-Grundriss vorhanden, bodengleiche Dusche gewünscht, Fliesenformat ca. 60 x 120 cm …"
              value={formData.notes}
              onChange={update('notes')}
            />

            <Ankreuzfeld required checked={formData.privacyConsent} onChange={update('privacyConsent')}>
              Ich stimme zu, dass meine Angaben zur Bearbeitung der Terminanfrage gemäß der{' '}
              <Textlink href="/datenschutz" target="_blank">
                Datenschutzerklärung
              </Textlink>{' '}
              verarbeitet werden. Beim Versand per WhatsApp gelten zusätzlich die Datenschutzbestimmungen von WhatsApp.
            </Ankreuzfeld>

            {/* Fehler direkt über den Knöpfen: Versatz-Zeichen + Text, role="alert" */}
            {errorMessage && <Hinweis art="fehler">{errorMessage}</Hinweis>}

            <div className="flex flex-col gap-k-3 border-t border-k-fuge pt-k-5">
              {/* nebeneinander erst ab 56 rem: „Termin online anfragen (mit E-Mail-Bestätigung)“ bleibt einzeilig */}
              <div className="flex flex-col gap-k-3 @4xl:flex-row">
                <SendeKnopf
                  name="channel"
                  value="online"
                  sendet={isSubmitting}
                  ladetext="Wird übertragen …"
                  breit
                  className="@4xl:flex-1"
                  hinten={<Icon name="pfeil" groesse={20} />}
                >
                  Termin online anfragen (mit E-Mail-Bestätigung)
                </SendeKnopf>
                <Knopf
                  type="submit"
                  name="channel"
                  value="whatsapp"
                  art="neben"
                  beschaeftigt={isSubmitting}
                  className="w-full @4xl:w-auto"
                  vorne={<Icon name="whatsapp" groesse={20} />}
                >
                  Per WhatsApp senden
                </Knopf>
              </div>
              <p className="flex items-start gap-k-2 k-text text-k-2 text-k-tinte-2">
                <span className="flex h-lh shrink-0 items-center">
                  <Icon name="schloss" groesse={16} />
                </span>
                <span>
                  Bei Online-Absendung erhalten Sie unmittelbar eine schriftliche Bestätigung per E-Mail. Bei WhatsApp öffnet sich WhatsApp mit Ihren vorbereiteten Angaben. Der Termin gilt nach persönlicher Abstimmung als fest vereinbart.
                </span>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
