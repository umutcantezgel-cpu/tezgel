'use client';

// Ansicht des Terminkalenders (F-07, P4-05c, KERN v1.2) ohne eigene Logik: bekommt das Ergebnis von `useTerminKalender`
// (Bestand und Kern nutzen denselben Hook, G9). So kann die Vorschau einen Zustand setzen, ohne zu senden.
// Arbeitsseiten-Formular (K-003 Prinzip 6): ein Feld (Fliese, 1-px-Fuge) mit Kopf, Schritt 1 (Tag und Uhrzeit), Schritt 2
// (Kontaktdaten) und Erfolgsmeldung.
// - Kalender: die Tage des Hooks als Raster echter Knöpfe (aria-pressed, Fugenkreuz am gewählten Tag), Bedienung über die
//   Tab-Folge (der Bestand hat keine Pfeiltasten im Raster). Welcher Tag gezeigt wird, ist reiner Ansichtszustand.
// - Uhrzeiten des gezeigten Tags als Radiogruppe (Auswahlknopf, Pfeiltasten nativ). Die Wahl ruft `handleSelectSlot`
//   wie der Klick im Bestand; belegte Uhrzeiten sind gesperrt, gestrichelt und durchgestrichen (nicht nur Farbe).
// - Schritt 2 erscheint unter der Auswahl statt an ihrer Stelle: Pfeiltasten in der Radiogruppe wählen sofort, darum
//   bleibt der Fokus dort; die Zeile „Schritt 2: …“ ist eine Live-Region und sagt die Wahl an. „Anderen Tag/Slot wählen“
//   ruft wie im Bestand `setStep(1)` und setzt den Fokus auf „Schritt 1: …“. Nach dem Absenden liegt er auf der Meldung.
// Wortlaut, ID `booking-consent`, Platzhalter und Honeypot wie `src/components/contact/BookingCalendar.tsx`; für /termin
// und /kontakt gibt es keine Zeile in MIKROTEXTE.md, darum bleiben Ladetext und Erfolgstext wörtlich (Vorschläge in der
// Rückgabe P4-05c). Die Beschriftungen sind mit den Feldern verknüpft, `autocomplete` ergänzt (WCAG 1.3.1, 1.3.5).
import { useId, useRef, useState } from 'react';
import type { useTerminKalender } from '@/lib/formulare/useTerminKalender';
import { AVAILABLE_SLOTS } from '@/lib/formulare/useTerminKalender';
import Ankreuzfeld from '@/components/kern/basis/Ankreuzfeld';
import Auswahlknopf from '@/components/kern/basis/Auswahlknopf';
import Etikett from '@/components/kern/basis/Etikett';
import Feld from '@/components/kern/basis/Feld';
import Feldgruppe from '@/components/kern/basis/Feldgruppe';
import Hinweis from '@/components/kern/basis/Hinweis';
import Knopf from '@/components/kern/basis/Knopf';
import Mehrzeilig from '@/components/kern/basis/Mehrzeilig';
import SendeKnopf from '@/components/kern/basis/SendeKnopf';
import Textlink from '@/components/kern/basis/Textlink';
import { Fugenkreuz } from '@/components/kern/basis/Zeichen';
import { fokus, verbinde } from '@/components/kern/basis/klassen';
import Icon from '@/components/kern/icons/Icon';
import { useFokusBeiWechsel } from '@/components/kern/formulare/b/useFokusBeiWechsel';
import { BEHAELTER, INNEN, KONTAKT, KOPF_INNEN, ZELLE_RAND } from '@/components/kern/formulare/c/raster';

export type TerminKalenderDaten = ReturnType<typeof useTerminKalender>;

const FELD = 'border border-k-fuge bg-k-fliese';
const ABSCHNITT = verbinde('flex min-w-0 flex-col gap-k-5', INNEN);
// Spalten nach Behälterbreite (P4-10b): Tage eine Spalte unter 24 rem, zwei ab 24 rem, fünf ab 56 rem (die Zelle muss
// „(Aufmaßtermin)“ in Mono 14 px, 118 px, fassen); Uhrzeiten („10:30 Uhr“ in Mono 19 px) zwei ab 28 rem, drei ab 36 rem.
const TAGE = 'm-0 grid list-none grid-cols-1 border-l border-t border-k-strich p-0 @sm:grid-cols-2 @4xl:grid-cols-5';
const UHRZEITEN = 'grid grid-cols-1 border-l border-t border-k-strich @md:grid-cols-2 @xl:grid-cols-3';
const SCHRITT = 'flex items-center gap-k-2 k-text text-k-2 font-semibold text-k-tinte';
const TEXT = 'min-w-0 wrap-break-word hyphens-auto';
const TAG = verbinde(
  'flex size-full min-h-k-8 flex-col items-start gap-k-1 p-k-3 text-left k-mono text-k-2',
  'focus-visible:relative focus-visible:z-10',
  fokus('hell'),
);
const TAG_RUHE = 'cursor-pointer bg-k-fliese text-k-tinte pointer-fine:hover:bg-k-kalk active:bg-k-fuge';
const TAG_GEWAEHLT = 'cursor-pointer bg-k-tinte text-k-kalk';

export default function TerminKalenderAnsicht({ kalender, initialServiceType }: { kalender: TerminKalenderDaten; initialServiceType: string }) {
  const {
    step,
    setStep,
    selectedDate,
    selectedTime,
    bookedSlots,
    loading,
    isConfirmed,
    referenceId,
    errorMessage,
    contactData,
    setContactData,
    availableDays,
    handleSelectSlot,
    handleConfirmBooking,
    formattedDate,
  } = kalender;

  // Eindeutige Namen und IDs je Instanz (die Vorschau zeigt mehrere Kalender).
  const id = useId();
  const schritt1Id = `${id}-schritt1`;
  // Gezeigter Tag (nur Ansicht): gewählter Tag, sonst der zuletzt angeklickte, sonst der erste.
  const [tagWahl, setTagWahl] = useState('');
  const gezeigt = availableDays.find((d) => d.dateStr === (tagWahl || selectedDate)) ?? availableDays[0];

  const ansicht = isConfirmed ? 'erfolg' : step === 2 ? 'formular' : 'auswahl';
  const fokusZiel = useRef<HTMLElement | null>(null);
  const setzeZiel = (el: HTMLElement | null) => {
    fokusZiel.current = el;
  };
  useFokusBeiWechsel(ansicht, fokusZiel);

  if (isConfirmed) {
    return (
      <div className={BEHAELTER}>
        <div ref={setzeZiel} tabIndex={-1} role="status" className={verbinde(FELD, 'flex flex-col gap-k-5', INNEN, fokus('hell'))}>
          <span data-motion="notiert" className="flex text-k-abnahme">
            <Icon name="haken" groesse={32} inline />
          </span>
          <h3 className="k-anzeige text-k-5 text-k-tinte">Terminanfrage bestätigt!</h3>
          <p className="max-w-(--k-mass) k-text text-k-3 text-k-tinte">
            Vielen Dank, <strong>{contactData.name}</strong>. Wir haben Ihren Wunschtermin für den{' '}
            <strong>{formattedDate} um {selectedTime} Uhr</strong> eingetragen.
          </p>
          <div className="flex flex-col gap-k-1 border border-k-fuge p-k-4 k-text text-k-2 text-k-tinte-2">
            <p className="flex items-center gap-k-2 font-semibold text-k-tinte">
              <Fugenkreuz className="size-k-3 shrink-0" />
              Termindetails:
            </p>
            <p className={TEXT}>&bull; Leistung: {initialServiceType}</p>
            <p>&bull; Datum &amp; Zeit: {formattedDate}, ca. {selectedTime} Uhr</p>
            {contactData.zipCity && <p className={TEXT}>&bull; Ort: {contactData.zipCity}</p>}
            {referenceId && (
              <p>
                &bull; Vorgangsnummer: <span className="k-mono font-semibold text-k-tinte">{referenceId}</span>
              </p>
            )}
          </div>
          <p className="max-w-(--k-mass) k-text text-k-2 text-k-tinte-2">
            Inhaber Deniz Tezgel setzt sich vorab kurz telefonisch mit Ihnen in Verbindung, um eventuelle Besonderheiten abzustimmen.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={BEHAELTER}>
      <div className={verbinde(FELD, 'flex flex-col')}>
        {/* Kopf */}
        <div className={verbinde('flex flex-col gap-k-3 border-b border-k-fuge', KOPF_INNEN)}>
          <Etikett kreuz ton="tinte">
            Kostenloses Vor-Ort-Aufmaß
          </Etikett>
          <h3 className={verbinde('k-anzeige text-k-5 text-k-tinte', TEXT)}>{initialServiceType}</h3>
          <p className="k-text text-k-2 text-k-tinte-2">Persönliche Beratung &amp; Messung vor Ort durch Inhaber Deniz Tezgel</p>
        </div>

        {/* Schritt 1: Tag und Uhrzeit */}
        <div className={ABSCHNITT}>
          <p
            id={schritt1Id}
            ref={ansicht === 'auswahl' ? setzeZiel : undefined}
            tabIndex={-1}
            className={verbinde(SCHRITT, 'rounded-k-1', fokus('hell'))}
          >
            <span className="flex shrink-0">
              <Icon name="kalender" groesse={20} />
            </span>
            <span>Schritt 1: Verfügbaren Tag &amp; Uhrzeit wählen</span>
          </p>

          <ul role="list" aria-labelledby={schritt1Id} className={TAGE}>
            {availableDays.map((day) => {
              const gewaehlt = day.dateStr === gezeigt?.dateStr;
              return (
                <li key={day.dateStr} className="min-w-0 border-r border-b border-k-strich">
                  <button
                    type="button"
                    aria-pressed={gewaehlt}
                    onClick={() => setTagWahl(day.dateStr)}
                    data-motion="zustand"
                    className={verbinde(TAG, gewaehlt ? TAG_GEWAEHLT : TAG_RUHE)}
                  >
                    {/* Wochentag und Datum je eine Zeile (Datum passt bei 320 px in die Zelle); Leerzeichen dazwischen hält den
                        Text als „Di, 13.10.2026“ zusammen. Gewählt: Fugenkreuz neben dem Wochentag. */}
                    <span className="flex w-full items-start justify-between gap-k-2">
                      <span>{day.weekday},</span>
                      {gewaehlt ? (
                        <span aria-hidden="true" className="flex h-lh shrink-0 items-center">
                          <Fugenkreuz className="size-k-3" />
                        </span>
                      ) : null}
                    </span>{' '}
                    <span className="whitespace-nowrap">{day.displayDate}</span>
                    {day.isSaturday && (
                      <span className={verbinde('text-k-1', gewaehlt ? 'text-k-nacht-2' : 'text-k-tinte-2', TEXT)}>
                        Samstag (Aufmaßtermin)
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {gezeigt ? (
            <Feldgruppe legende={`${gezeigt.weekday}, ${gezeigt.displayDate}`}>
              <div className={UHRZEITEN}>
                {AVAILABLE_SLOTS.map((slot) => {
                  const isTaken = bookedSlots.includes(`${gezeigt.dateStr}_${slot.time}`);
                  return (
                    <Auswahlknopf
                      key={slot.time}
                      art="kachel"
                      className={ZELLE_RAND}
                      name={`${id}-uhrzeit`}
                      value={slot.time}
                      disabled={isTaken}
                      checked={step === 2 && selectedDate === gezeigt.dateStr && selectedTime === slot.time}
                      onChange={() => handleSelectSlot(gezeigt.dateStr, slot.time)}
                    >
                      <span className={verbinde('k-mono font-normal whitespace-nowrap', isTaken && 'line-through')}>{slot.time} Uhr</span>
                    </Auswahlknopf>
                  );
                })}
              </div>
            </Feldgruppe>
          ) : null}
        </div>

        {/* Schritt 2: Kontaktdaten (erscheint nach der Wahl) */}
        <div className={step === 2 ? verbinde(ABSCHNITT, 'border-t border-k-fuge') : undefined}>
          <div className="flex flex-wrap items-center justify-between gap-x-k-4 gap-y-k-2">
            <p aria-live="polite" className={SCHRITT}>
              {step === 2 ? (
                <>
                  <span className="flex shrink-0">
                    <Icon name="uhr" groesse={20} />
                  </span>
                  <span>
                    Schritt 2: Kontaktdaten für <span className="k-mono">{formattedDate}</span> um <span className="k-mono">{selectedTime}</span> Uhr
                  </span>
                </>
              ) : null}
            </p>
            {step === 2 && (
              <Knopf art="text" groesse="klein" onClick={() => setStep(1)} vorne={<Icon name="pfeil" richtung="links" groesse={16} />}>
                Anderen Tag/Slot wählen
              </Knopf>
            )}
          </div>

          {step === 2 && (
            <form onSubmit={handleConfirmBooking} className="flex flex-col gap-k-5">
              {/* Honeypot */}
              <div hidden aria-hidden="true">
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={contactData.websiteUrl}
                  onChange={(e) => setContactData({ ...contactData, websiteUrl: e.target.value })}
                />
              </div>

              <div className={KONTAKT}>
                <Feld
                  beschriftung="Ihr Name"
                  zusatz="*"
                  required
                  autoComplete="name"
                  placeholder="Vor- und Nachname"
                  value={contactData.name}
                  onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                />
                <Feld
                  art="tel"
                  beschriftung="Telefonnummer"
                  zusatz="*"
                  required
                  placeholder="0172 / 1234567"
                  value={contactData.phone}
                  onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                />
                <Feld
                  art="email"
                  beschriftung="E-Mail Adresse"
                  zusatz="(optional)"
                  placeholder="ihre-adresse@beispiel.de"
                  value={contactData.email}
                  onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                />
                <Feld
                  beschriftung="Einsatzort / PLZ"
                  zusatz="(optional)"
                  placeholder="z. B. 35578 Wetzlar"
                  value={contactData.zipCity}
                  onChange={(e) => setContactData({ ...contactData, zipCity: e.target.value })}
                />
              </div>

              <Mehrzeilig
                beschriftung="Projekt-Kurzbeschreibung"
                zusatz="(optional)"
                rows={2}
                placeholder="z. B. Bad ca. 10 qm, Altbausanierung, ebenerdige Dusche gewünscht..."
                value={contactData.notes}
                onChange={(e) => setContactData({ ...contactData, notes: e.target.value })}
              />

              <Ankreuzfeld
                id="booking-consent"
                required
                checked={contactData.privacyConsent}
                onChange={(e) => setContactData({ ...contactData, privacyConsent: e.target.checked })}
              >
                Ich stimme der Kontaktaufnahme zur Terminabstimmung gemäß{' '}
                <Textlink href="/datenschutz">Datenschutzerklärung</Textlink>{' '}
                zu.
              </Ankreuzfeld>

              {/* Fehler direkt über dem Knopf: Versatz-Zeichen + Text, role="alert" */}
              {errorMessage && <Hinweis art="fehler">{errorMessage}</Hinweis>}

              <div className="flex flex-col gap-k-3 border-t border-k-fuge pt-k-5">
                <SendeKnopf sendet={loading} ladetext="Termin wird reserviert..." breit hinten={<Icon name="pfeil" groesse={20} />}>
                  Verbindlichen Vor-Ort-Termin anfragen
                </SendeKnopf>
                <div className="flex flex-wrap items-center justify-center gap-x-k-3 gap-y-k-1 k-mono text-k-1 text-k-tinte-2">
                  <span className="flex items-center gap-k-1">
                    <Icon name="schloss" groesse={16} />
                    100% kostenfrei &amp; unverbindlich
                  </span>
                  <span aria-hidden="true">&middot;</span>
                  <span className="flex items-center gap-k-1">
                    <Fugenkreuz className="size-k-3 shrink-0" />
                    Aufmaß &amp; Festpreisberatung
                  </span>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
