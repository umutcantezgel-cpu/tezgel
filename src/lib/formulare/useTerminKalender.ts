// Logik des Terminkalenders (F-07, BookingCalendar) – wörtlich aus der Komponente verschoben (P4-05c, Vorbild P4-05a).
// Ohne Markup; Bestand und Kern-Ansicht nutzen denselben Hook. Bekannte Lücke: Tage aus `new Date()` beim Rendern in der
// Zeitzone des Rechners (intern I-12). SEO-Runde K01 und K02 (docs/seo/KONTEXT.md, Abschnitt 5): Statt `_t` als feste
// Vergangenheit (bei vorgehender Geräteuhr galt die Anfrage als Bot und ging verloren) sendet der Kalender die gemessene
// Ausfülldauer `_d`; Wunschtag, Zeitfenster und Thema gehen in den Feldern, die die Prüfung der API kennt
// (`date`, `formattedDate`, `timeSlot`, `timeSlotLabel`, `topicLabel`), statt verworfen zu werden.
import React, { useState, useMemo, useRef, useSyncExternalStore } from 'react';
import { messbeginn, ausfuelldauer } from './ausfuelldauer';

export const AVAILABLE_SLOTS = [
  { time: '08:30', label: '08:30 – 10:00 Uhr (Morgens)' },
  { time: '10:30', label: '10:30 – 12:00 Uhr (Vormittags)' },
  { time: '13:00', label: '13:00 – 14:30 Uhr (Mittags)' },
  { time: '15:00', label: '15:00 – 16:30 Uhr (Nachmittags)' },
  { time: '16:30', label: '16:30 – 18:00 Uhr (Spätnachmittag)' },
];

export type TerminKalenderEingaben = {
  initialServiceType: string;
  onBookingConfirmed?: (data: { date: string; timeSlot: string; name: string; phone: string }) => void;
};

// Kalendertag des Browsers als stabile Kennung (gleicher Wert über den Tag, `useSyncExternalStore` vergleicht mit Object.is).
function tagesKennung(): string {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}
const keinTag = (): null => null;

// SEO-Runde K02: Wunschtag und Zeitfenster als Text für die Mail („Donnerstag, 05.11.2026“, „08:30 bis 10:00 Uhr (Morgens)“).
export function wunschtagText(dateStr: string): string {
  const [jahr, monat, tag] = dateStr.split('-').map(Number);
  if (!jahr || !monat || !tag) return dateStr;
  return new Date(jahr, monat - 1, tag, 12).toLocaleDateString('de-DE', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}
export function zeitfensterText(time: string): string {
  const slot = AVAILABLE_SLOTS.find((s) => s.time === time);
  return slot ? slot.label.replace(' – ', ' bis ') : time;
}

export type TerminKontakt = { name: string; phone: string; email: string; zipCity: string; notes: string; privacyConsent: boolean; websiteUrl: string };

// SEO-Runde K01 und K02: Nutzlast für POST /api/anfrage als reine Funktion, damit Test 23 die echte Nutzlast prüft.
export function terminNutzlast(eingaben: { selectedDate: string; selectedTime: string; initialServiceType: string; contactData: TerminKontakt; dauer: number }) {
  const { selectedDate, selectedTime, initialServiceType, contactData, dauer } = eingaben;
  return {
    inquiryType: 'termin',
    projectType: 'termin',
    projectTitle: `Vor-Ort-Termin: ${initialServiceType}`,
    terminDetails: {
      date: selectedDate,
      formattedDate: wunschtagText(selectedDate),
      timeSlot: selectedTime,
      timeSlotLabel: zeitfensterText(selectedTime),
      topicLabel: initialServiceType,
    },
    contact: {
      name: contactData.name.trim(),
      phone: contactData.phone.trim(),
      email: contactData.email.trim() || undefined,
      zipCity: contactData.zipCity.trim() || undefined,
    },
    notes: contactData.notes.trim() || undefined,
    privacyConsent: contactData.privacyConsent,
    honeypot: contactData.websiteUrl,
    _d: dauer,
  };
}
const ohneAbo = () => () => {};

export function useTerminKalender({ initialServiceType, onBookingConfirmed }: TerminKalenderEingaben) {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [messStart] = useState<number>(() => messbeginn()); // SEO-Runde K01

  const [contactData, setContactData] = useState({
    name: '',
    phone: '',
    email: '',
    zipCity: '',
    notes: '',
    privacyConsent: false,
    websiteUrl: '', // Honeypot
  });

  // P4-05d (I-19): „heute“ erst im Browser. Das HTML wird am Build-Tag vorgerendert; standen die Tage schon dort, passte es
  // ab dem Folgetag nicht mehr zum Browser (React #418 auf /termin und /kontakt). Server und Hydrieren sehen `null`
  // (Kalender ohne Tage), danach gilt das Datum des Browsers – dieselben Tage wie bisher. Der Tag wird je Kalender beim
  // ersten Lesen festgehalten: Über Mitternacht bleiben die Tage stehen wie vorher (Gegenprüfung P4-05d-GEG, Befund 1).
  const gemerkterTag = useRef<string | null>(null);
  const heute = useSyncExternalStore(ohneAbo, () => (gemerkterTag.current ??= tagesKennung()), keinTag);

  // Generate 12 available workdays starting tomorrow (skipping Sundays)
  const availableDays = useMemo(() => {
    const days: Array<{ dateStr: string; displayDate: string; weekday: string; isSaturday: boolean }> = [];
    if (heute === null) return days;
    const [jahr, monat, tag] = heute.split('-').map(Number);
    const date = new Date(jahr, monat - 1, tag, 12);

    while (days.length < 10) {
      date.setDate(date.getDate() + 1);
      const dayOfWeek = date.getDay();
      if (dayOfWeek === 0) continue; // Skip Sunday

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;

      const weekday = date.toLocaleDateString('de-DE', { weekday: 'short' });
      const displayDate = date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });

      days.push({
        dateStr,
        displayDate,
        weekday,
        isSaturday: dayOfWeek === 6,
      });
    }

    return days;
  }, [heute]);

  const handleSelectSlot = (dateStr: string, time: string) => {
    setSelectedDate(dateStr);
    setSelectedTime(time);
    setErrorMessage('');
    setStep(2);
  };

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot trap
    if (contactData.websiteUrl && contactData.websiteUrl.trim().length > 0) {
      setIsConfirmed(true);
      setReferenceId('TEZ-BOT-IGN');
      return;
    }

    if (!contactData.name.trim() || !contactData.phone.trim() || !contactData.privacyConsent) {
      setErrorMessage('Bitte füllen Sie Name und Telefonnummer aus und willigen Sie in den Datenschutz ein.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/anfrage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          terminNutzlast({ selectedDate, selectedTime, initialServiceType, contactData, dauer: ausfuelldauer(messStart) })
        ),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Fehler bei der Terminübertragung.');
      }

      setReferenceId(data.referenceId || '');
      setBookedSlots((prev) => [...prev, `${selectedDate}_${selectedTime}`]);
      setIsConfirmed(true);
      if (onBookingConfirmed) {
        onBookingConfirmed({
          date: selectedDate,
          timeSlot: selectedTime,
          name: contactData.name,
          phone: contactData.phone,
        });
      }
    } catch {
      setErrorMessage('Termin konnte nicht online bestätigt werden. Bitte rufen Sie uns direkt an: 06441 / 44 83 567.');
    } finally {
      setLoading(false);
    }
  };

  // Bisher am Anfang der Erfolgsansicht (`if (isConfirmed) { const formattedDate = … }`); reine Umformung, ohne Wirkung.
  const formattedDate = selectedDate.split('-').reverse().join('.');

  return {
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
  };
}
