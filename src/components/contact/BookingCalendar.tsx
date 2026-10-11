'use client';

// Terminkalender (E2-ORCH-09, Arbeitsansicht): Tage und Zeitfenster als Auswahlfelder an der Fuge, Formular mit
// verknüpften Labels. Logik aus useTerminKalender (F-07, gemeinsam mit der Kern-Ansicht): Tage erst im Browser und je
// Kalender festgehalten (V-02, P4-05d). Nutzlast, Texte und getestete Namen unverändert.
import React from 'react';
import Link from 'next/link';
import Icon from '@/components/icons/Icon';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Knopf from '@/components/kern/Knopf';
import { etikettKlassen, feldKlassen, labelKlassen, linkKlassen, pflichtKlassen, wahlKlassen } from '@/components/kern/stile';
import { COMPANY_DATA } from '@/config/company';
import { AVAILABLE_SLOTS, useTerminKalender } from '@/lib/formulare/useTerminKalender';

export interface BookingCalendarProps {
  className?: string;
  initialServiceType?: string;
  onBookingConfirmed?: (data: { date: string; timeSlot: string; name: string; phone: string }) => void;
}

/**
 * 2-Step Self-Hosted Appointment Booking Calendar
 * Step 1: Select Date & Time Slot (Next 14 days, excluding Sundays)
 * Step 2: Customer Contact Information & Instant Confirmation via /api/anfrage
 */
export function BookingCalendar({
  className = '',
  initialServiceType = 'Kostenfreies Vor-Ort-Aufmaß & Schadensanalyse',
  onBookingConfirmed,
}: BookingCalendarProps) {
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
  } = useTerminKalender({ initialServiceType, onBookingConfirmed });

  if (isConfirmed) {
    return (
      <div className={`border border-strich bg-fliese p-6 sm:p-8 lg:p-12 ${className}`} role="status">
        <span className={etikettKlassen}>
          <Icon name="haken" groesse={4} className="text-abnahme" />
          <span>Kostenloses Vor-Ort-Aufmaß</span>
        </span>
        <h3 className="mt-6 text-fs-5 text-tinte">Terminanfrage bestätigt!</h3>
        <p className="mt-3 max-w-mass text-fs-3 text-tinte-2">
          Vielen Dank, <strong className="font-semibold text-tinte">{contactData.name}</strong>. Wir haben Ihren Wunschtermin für den{' '}
          <strong className="font-semibold text-tinte">{formattedDate} um {selectedTime} Uhr</strong> eingetragen.
        </p>
        <div className="mt-6 border-t border-fuge pt-6 font-mono text-fs-2 text-tinte">
          <div className="font-text font-semibold">Termindetails:</div>
          <div className="mt-2">&bull; Leistung: {initialServiceType}</div>
          <div>&bull; Datum &amp; Zeit: {formattedDate}, ca. {selectedTime} Uhr</div>
          {contactData.zipCity && <div>&bull; Ort: {contactData.zipCity}</div>}
          {referenceId && <div>&bull; Vorgangsnummer: <span className="border border-fuge bg-kalk px-2 py-1">{referenceId}</span></div>}
        </div>
        <p className="mt-6 text-fs-2 text-tinte-2">
          Inhaber Deniz Tezgel setzt sich vorab kurz telefonisch mit Ihnen in Verbindung, um eventuelle Besonderheiten abzustimmen.
        </p>
      </div>
    );
  }

  return (
    <div className={`border border-strich bg-fliese p-6 sm:p-8 lg:p-12 ${className}`}>
      {/* Kopf */}
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4 border-b border-fuge pb-6">
        <div>
          <span className={etikettKlassen}>
            <Fugenkreuz className="size-3 text-strich" />
            <span>Kostenloses Vor-Ort-Aufmaß</span>
          </span>
          <h3 className="mt-3 text-fs-5 text-tinte">
            {initialServiceType}
          </h3>
          <p className="mt-2 text-fs-2 text-tinte-2">
            Persönliche Beratung &amp; Messung vor Ort durch Inhaber Deniz Tezgel
          </p>
        </div>

        {step === 2 && (
          <Knopf variante="text" onClick={() => setStep(1)} iconLinks="pfeil-links">
            Anderen Tag/Slot wählen
          </Knopf>
        )}
      </div>

      {step === 1 ? (
        /* SCHRITT 1: Tag und Zeitfenster */
        <div>
          <p className="mb-4 flex items-center gap-2 font-mono text-fs-1 text-tinte">
            <Icon name="kalender" groesse={4} />
            <span>Schritt 1: Verfügbaren Tag &amp; Uhrzeit wählen</span>
          </p>

          {/* Höhe = ganze Tageszeilen (Zeile 237 px auf dem Handy, 181 px ab 640, 125 px ab 768; +1 px Rahmen oben):
              die Liste endet an einer Tagesfuge, kein Terminknopf wird angeschnitten (E3-NACH-05). */}
          <div className="max-h-119 overflow-y-auto border-t border-fuge sm:max-h-91 md:max-h-94" tabIndex={0} role="region" aria-label="Verfügbare Termine">
            {availableDays.length === 0 && (
              <p className="py-6 text-fs-2 text-tinte-2">
                Die freien Termine erscheinen, sobald die Seite vollständig geladen ist. Telefonisch erreichen Sie uns unter{' '}
                <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className={linkKlassen}>{COMPANY_DATA.contact.phone}</a>.
              </p>
            )}
            {availableDays.map((day) => (
              <div key={day.dateStr} role="group" aria-label={`${day.weekday}, ${day.displayDate}`} className="border-b border-fuge py-4">
                <div className="mb-3 flex min-h-8 items-center justify-between gap-2">
                  <span className="font-mono text-fs-2 text-tinte">
                    {day.weekday}, {day.displayDate}
                  </span>
                  {day.isSaturday && (
                    <span className={etikettKlassen}>
                      Samstag (Aufmaßtermin)
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
                  {AVAILABLE_SLOTS.map((slot) => {
                    const isTaken = bookedSlots.includes(`${day.dateStr}_${slot.time}`);
                    return (
                      <button
                        key={slot.time}
                        type="button"
                        disabled={isTaken}
                        onClick={() => handleSelectSlot(day.dateStr, slot.time)}
                        className={`${wahlKlassen} h-12 last:odd:col-span-2 md:last:odd:col-span-1 disabled:border-fuge disabled:bg-kalk disabled:text-tinte-2`}
                        data-motion="zustand"
                      >
                        {slot.time} Uhr
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* SCHRITT 2: Kontaktdaten */
        <div>
          <p className="mb-6 flex items-center gap-2 font-mono text-fs-1 text-tinte">
            <Icon name="uhr" groesse={4} />
            <span>
              Schritt 2: Kontaktdaten für {selectedDate.split('-').reverse().join('.')} um {selectedTime} Uhr
            </span>
          </p>

          <form onSubmit={handleConfirmBooking} className="flex flex-col gap-6">
            {/* Honeypot */}
            <div className="hidden" aria-hidden="true">
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={contactData.websiteUrl}
                onChange={(e) => setContactData({ ...contactData, websiteUrl: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-4">
              <div>
                <label htmlFor="booking-name" className={labelKlassen}>
                  Ihr Name <span className={pflichtKlassen}>*</span>
                </label>
                <input
                  id="booking-name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Vor- und Nachname"
                  value={contactData.name}
                  onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                  className={feldKlassen}
                />
              </div>

              <div>
                <label htmlFor="booking-phone" className={labelKlassen}>
                  Telefonnummer <span className={pflichtKlassen}>*</span>
                </label>
                <input
                  id="booking-phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder="0172 / 1234567"
                  value={contactData.phone}
                  onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                  className={feldKlassen}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-4">
              <div>
                <label htmlFor="booking-email" className={labelKlassen}>
                  E-Mail Adresse <span className="font-normal text-tinte-2">(optional)</span>
                </label>
                <input
                  id="booking-email"
                  type="email"
                  autoComplete="email"
                  placeholder="ihre-adresse@beispiel.de"
                  value={contactData.email}
                  onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                  className={feldKlassen}
                />
              </div>

              <div>
                <label htmlFor="booking-zip" className={labelKlassen}>
                  Einsatzort / PLZ <span className="font-normal text-tinte-2">(optional)</span>
                </label>
                <input
                  id="booking-zip"
                  type="text"
                  autoComplete="address-level2"
                  placeholder="z. B. 35578 Wetzlar"
                  value={contactData.zipCity}
                  onChange={(e) => setContactData({ ...contactData, zipCity: e.target.value })}
                  className={feldKlassen}
                />
              </div>
            </div>

            <div>
              <label htmlFor="booking-notes" className={labelKlassen}>
                Projekt-Kurzbeschreibung <span className="font-normal text-tinte-2">(optional)</span>
              </label>
              <textarea
                id="booking-notes"
                rows={2}
                placeholder="z. B. Bad ca. 10 qm, Altbausanierung, ebenerdige Dusche gewünscht..."
                value={contactData.notes}
                onChange={(e) => setContactData({ ...contactData, notes: e.target.value })}
                className={`${feldKlassen} resize-none`}
              />
            </div>

            {/* Datenschutz */}
            <div className="flex items-start gap-3">
              <input
                id="booking-consent"
                type="checkbox"
                required
                checked={contactData.privacyConsent}
                onChange={(e) => setContactData({ ...contactData, privacyConsent: e.target.checked })}
                className="mt-1 size-5 shrink-0 cursor-pointer rounded-r1 border border-strich accent-tinte"
              />
              <label htmlFor="booking-consent" className="cursor-pointer text-fs-2 text-tinte-2">
                Ich stimme der Kontaktaufnahme zur Terminabstimmung gemäß{' '}
                <Link href="/datenschutz" className={linkKlassen}>
                  Datenschutzerklärung
                </Link>{' '}
                zu.
              </label>
            </div>

            {errorMessage && (
              <p className="flex items-start gap-2 border-l-2 border-laser bg-kalk p-3 text-fs-2 text-laser-tief" role="alert">
                <Icon name="fehler" groesse={4} className="mt-1 shrink-0" />
                <span>{errorMessage}</span>
              </p>
            )}

            <Knopf type="submit" laedt={loading} ladeText="Termin wird reserviert..." iconLinks="haken" className="w-full">
              Verbindlichen Vor-Ort-Termin anfragen
            </Knopf>

            <div className="flex flex-wrap items-center justify-center gap-4 font-mono text-fs-1 text-tinte-2">
              <span className="flex items-center gap-2">
                <Icon name="schloss" groesse={4} />
                100% kostenfrei &amp; unverbindlich
              </span>
              <span>&middot;</span>
              <span className="flex items-center gap-2">
                <Fugenkreuz className="size-3 text-tinte" />
                Aufmaß &amp; Festpreisberatung
              </span>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default BookingCalendar;
