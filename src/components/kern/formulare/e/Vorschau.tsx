'use client';

// Vorschau-Hüllen P4-05c (nur für `src/app/(kern)/_entwurf/p4-05c`, wird nie freigeschaltet; liegt hier, weil Tailwind
// `_entwurf` nicht liest). Sie rufen die echten Hooks auf und setzen den gezeigten Zustand darüber – ohne Anfrage (G5):
// Absenden ist durch eine leere Handlung ersetzt (der WhatsApp-Weg liegt im Absende-Handler von F-08 und entfällt mit ihm),
// die Vorschau sendet nie und öffnet nichts.
// Feste Uhrzeit: Die Tage sind die Ausgabe von `useTerminKalender` am 12.10.2026, 10:00 Uhr (Europe/Berlin), so wie
// `_relaunch/werkzeuge/lib.mjs` FESTE_ZEIT sie für Fotos setzt (geprüft im Scratchpad P4-05c, `tage.cjs`). Damit sind
// Vorschau-HTML und Fotos unabhängig vom Tag des Builds, und das Hydrieren findet dieselben Tage vor.
// Fehlertexte wörtlich aus den Hooks; Name, Telefon, E-Mail und Referenz sind erkennbare Vorschau-Werte.
import { useState, type FormEvent } from 'react';
import { useTerminKalender } from '@/lib/formulare/useTerminKalender';
import { useTerminAnfrage } from '@/lib/formulare/useTerminAnfrage';
import TerminKalenderAnsicht, { type TerminKalenderDaten } from '@/components/kern/formulare/e/TerminKalenderAnsicht';
import TerminAnfrageAnsicht, { type TerminAnfrageDaten } from '@/components/kern/formulare/e/TerminAnfrageAnsicht';

const nichtSenden = async (e: FormEvent) => {
  e.preventDefault();
};

export const FESTE_TAGE: TerminKalenderDaten['availableDays'] = [
  { dateStr: '2026-10-13', displayDate: '13.10.2026', weekday: 'Di', isSaturday: false },
  { dateStr: '2026-10-14', displayDate: '14.10.2026', weekday: 'Mi', isSaturday: false },
  { dateStr: '2026-10-15', displayDate: '15.10.2026', weekday: 'Do', isSaturday: false },
  { dateStr: '2026-10-16', displayDate: '16.10.2026', weekday: 'Fr', isSaturday: false },
  { dateStr: '2026-10-17', displayDate: '17.10.2026', weekday: 'Sa', isSaturday: true },
  { dateStr: '2026-10-19', displayDate: '19.10.2026', weekday: 'Mo', isSaturday: false },
  { dateStr: '2026-10-20', displayDate: '20.10.2026', weekday: 'Di', isSaturday: false },
  { dateStr: '2026-10-21', displayDate: '21.10.2026', weekday: 'Mi', isSaturday: false },
  { dateStr: '2026-10-22', displayDate: '22.10.2026', weekday: 'Do', isSaturday: false },
  { dateStr: '2026-10-23', displayDate: '23.10.2026', weekday: 'Fr', isSaturday: false },
];

const VORSCHAU_KONTAKT = { name: 'Vorschau Person', phone: '0170 0000000', email: 'ihre-adresse@beispiel.de', zipCity: '35614 Aßlar' };
const VORSCHAU_WAHL = { selectedDate: '2026-10-17', selectedTime: '10:30', formattedDate: '17.10.2026' };

export type TerminKalenderZustand = 'ruhe' | 'formular' | 'belegt' | 'fehler' | 'netzfehler' | 'laedt' | 'erfolg';

export function TerminKalenderVorschau({
  zustand = 'ruhe',
  initialServiceType = 'Kostenfreies Vor-Ort-Aufmaß & Beratung',
}: {
  zustand?: TerminKalenderZustand;
  initialServiceType?: string;
}) {
  const echt = useTerminKalender({ initialServiceType });
  const daten: TerminKalenderDaten = { ...echt, availableDays: FESTE_TAGE, handleConfirmBooking: nichtSenden };
  if (zustand === 'belegt') daten.bookedSlots = ['2026-10-13_10:30', '2026-10-13_15:00'];
  if (zustand !== 'ruhe' && zustand !== 'belegt') Object.assign(daten, VORSCHAU_WAHL, { step: 2 as const });
  if (zustand === 'fehler') daten.errorMessage = 'Bitte füllen Sie Name und Telefonnummer aus und willigen Sie in den Datenschutz ein.';
  if (zustand === 'netzfehler') daten.errorMessage = 'Termin konnte nicht online bestätigt werden. Bitte rufen Sie uns direkt an: 06441 / 44 83 567.';
  if (zustand === 'laedt') daten.loading = true;
  if (zustand === 'erfolg') {
    daten.isConfirmed = true;
    daten.contactData = { ...daten.contactData, ...VORSCHAU_KONTAKT };
    daten.referenceId = 'TEZ-26-VORSCHAU';
  }
  return <TerminKalenderAnsicht kalender={daten} initialServiceType={initialServiceType} />;
}

export type TerminAnfrageZustand = 'ruhe' | 'formular' | 'fehler' | 'laedt' | 'erfolg' | 'whatsapp';

export function TerminAnfrageVorschau({ zustand = 'ruhe' }: { zustand?: TerminAnfrageZustand }) {
  const echt = useTerminAnfrage();
  // Umschalter bleibt bedienbar: Modus als eigener Zustand der Hülle, Startwert je Vorschau.
  const [bookingMode, setBookingMode] = useState<TerminAnfrageDaten['bookingMode']>(zustand === 'ruhe' ? 'calendar' : 'form');
  const daten: TerminAnfrageDaten = { ...echt, bookingMode, setBookingMode, handleSubmit: nichtSenden };
  if (zustand === 'fehler') daten.errorMessage = 'Verbindungsfehler beim Absenden.';
  if (zustand === 'laedt') daten.isSubmitting = true;
  if (zustand === 'erfolg' || zustand === 'whatsapp') {
    daten.sentVia = zustand === 'erfolg' ? 'online' : 'whatsapp';
    daten.formData = { ...daten.formData, ...VORSCHAU_KONTAKT, date: '2026-10-19', timeSlot: 'nachmittags' };
    if (zustand === 'erfolg') daten.referenceId = 'TEZ-26-VORSCHAU';
  }
  return <TerminAnfrageAnsicht anfrage={daten} kalender={<TerminKalenderVorschau />} />;
}
