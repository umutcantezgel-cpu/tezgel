// Logik des Terminkalenders (F-07, BookingCalendar) – wörtlich aus der Komponente verschoben (P4-05c, Vorbild P4-05a).
// Ohne Markup; Bestand und Kern-Ansicht nutzen denselben Hook. Keine Logikänderung (G9): auch die bekannten Lücken
// (Tage aus `new Date()` beim Rendern in der Zeitzone des Rechners, `_t` als feste Vergangenheit, `preferredDate` und
// `serviceType` verwirft die Prüfung der API; intern I-12, I-18) bleiben, wie sie sind.
import React, { useState, useMemo } from 'react';

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

export function useTerminKalender({ initialServiceType, onBookingConfirmed }: TerminKalenderEingaben) {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [contactData, setContactData] = useState({
    name: '',
    phone: '',
    email: '',
    zipCity: '',
    notes: '',
    privacyConsent: false,
    websiteUrl: '', // Honeypot
  });

  // Generate 12 available workdays starting tomorrow (skipping Sundays)
  const availableDays = useMemo(() => {
    const days: Array<{ dateStr: string; displayDate: string; weekday: string; isSaturday: boolean }> = [];
    const date = new Date();

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
  }, []);

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
        body: JSON.stringify({
          inquiryType: 'termin',
          projectType: 'termin',
          projectTitle: `Vor-Ort-Termin: ${initialServiceType}`,
          terminDetails: {
            preferredDate: selectedDate,
            timeSlot: selectedTime,
            serviceType: initialServiceType,
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
          _t: Date.now() - 3000,
        }),
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
