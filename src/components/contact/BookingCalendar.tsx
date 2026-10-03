'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  User,
  Phone,
  Mail,
  MapPin,
  Lock,
} from 'lucide-react';

export interface BookingCalendarProps {
  className?: string;
  initialServiceType?: string;
  onBookingConfirmed?: (data: { date: string; timeSlot: string; name: string; phone: string }) => void;
}

const AVAILABLE_SLOTS = [
  { time: '08:30', label: '08:30 – 10:00 Uhr (Morgens)' },
  { time: '10:30', label: '10:30 – 12:00 Uhr (Vormittags)' },
  { time: '13:00', label: '13:00 – 14:30 Uhr (Mittags)' },
  { time: '15:00', label: '15:00 – 16:30 Uhr (Nachmittags)' },
  { time: '16:30', label: '16:30 – 18:00 Uhr (Spätnachmittag)' },
];

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

  if (isConfirmed) {
    const formattedDate = selectedDate.split('-').reverse().join('.');

    return (
      <div
        className={`p-6 sm:p-10 rounded-2xl bg-white border border-orange-200 shadow-xl text-center relative overflow-hidden ${className}`}
      >
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-500 via-amber-500 to-green-500" />
        <div className="inline-flex p-3 rounded-full bg-green-500/10 text-green-600 mb-4 ring-8 ring-green-500/5">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-black text-neutral-900 tracking-tight">Terminanfrage bestätigt!</h3>
        <p className="mt-2 text-sm text-neutral-700 max-w-md mx-auto leading-relaxed">
          Vielen Dank, <strong>{contactData.name}</strong>. Wir haben Ihren Wunschtermin für den{' '}
          <strong>{formattedDate} um {selectedTime} Uhr</strong> eingetragen.
        </p>
        <div className="mt-4 p-4 rounded-xl bg-orange-50/70 border border-orange-200/80 max-w-sm mx-auto text-xs text-neutral-700 space-y-1 text-left">
          <div className="font-bold text-orange-900">Termindetails:</div>
          <div>&bull; Leistung: {initialServiceType}</div>
          <div>&bull; Datum &amp; Zeit: {formattedDate}, ca. {selectedTime} Uhr</div>
          {contactData.zipCity && <div>&bull; Ort: {contactData.zipCity}</div>}
          {referenceId && <div>&bull; Vorgangsnummer: <span className="font-mono font-bold text-orange-950">{referenceId}</span></div>}
        </div>
        <p className="mt-4 text-xs text-neutral-500">
          Inhaber Deniz Tezgel setzt sich vorab kurz telefonisch mit Ihnen in Verbindung, um eventuelle Besonderheiten abzustimmen.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`p-6 sm:p-8 rounded-2xl bg-white border border-neutral-200 shadow-xl relative overflow-hidden ${className}`}
    >
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-500 via-amber-500 to-red-500" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between pb-5 border-b border-neutral-100 gap-3 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-700 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            <span>Kostenloses Vor-Ort-Aufmaß</span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-neutral-900 tracking-tight mt-0.5">
            {initialServiceType}
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            Persönliche Beratung &amp; Messung vor Ort durch Inhaber Deniz Tezgel
          </p>
        </div>

        {step === 2 && (
          <button
            type="button"
            onClick={() => setStep(1)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Anderen Tag/Slot wählen</span>
          </button>
        )}
      </div>

      {step === 1 ? (
        /* STEP 1: DATE & TIME SELECTION */
        <div>
          <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-wider text-neutral-600">
            <Calendar className="w-4 h-4 text-orange-600" />
            <span>Schritt 1: Verfügbaren Tag &amp; Uhrzeit wählen</span>
          </div>

          <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
            {availableDays.map((day) => (
              <div key={day.dateStr} className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-neutral-900">
                    {day.weekday}, {day.displayDate}
                  </span>
                  {day.isSaturday && (
                    <span className="text-[10px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                      Samstag (Aufmaßtermin)
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                  {AVAILABLE_SLOTS.map((slot) => {
                    const isTaken = bookedSlots.includes(`${day.dateStr}_${slot.time}`);
                    return (
                      <button
                        key={slot.time}
                        type="button"
                        disabled={isTaken}
                        onClick={() => handleSelectSlot(day.dateStr, slot.time)}
                        className={`px-2.5 py-2 rounded-lg text-xs font-bold text-center border transition-all cursor-pointer ${
                          isTaken
                            ? 'bg-neutral-200 border-neutral-300 text-neutral-400 cursor-not-allowed'
                            : 'bg-white hover:bg-orange-50 border-neutral-200 hover:border-orange-500 text-neutral-800 hover:text-orange-700 shadow-xs'
                        }`}
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
        /* STEP 2: CONTACT DETAILS */
        <div>
          <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-wider text-neutral-600">
            <Clock className="w-4 h-4 text-orange-600" />
            <span>
              Schritt 2: Kontaktdaten für {selectedDate.split('-').reverse().join('.')} um {selectedTime} Uhr
            </span>
          </div>

          <form onSubmit={handleConfirmBooking} className="space-y-4">
            {/* Honeypot */}
            <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={contactData.websiteUrl}
                onChange={(e) => setContactData({ ...contactData, websiteUrl: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Ihr Name <span className="text-orange-600">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Vor- und Nachname"
                    value={contactData.name}
                    onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all placeholder:text-neutral-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Telefonnummer <span className="text-orange-600">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    placeholder="0172 / 1234567"
                    value={contactData.phone}
                    onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all placeholder:text-neutral-400"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  E-Mail Adresse <span className="text-xs text-neutral-400 font-normal">(optional)</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    placeholder="ihre-adresse@beispiel.de"
                    value={contactData.email}
                    onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all placeholder:text-neutral-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Einsatzort / PLZ <span className="text-xs text-neutral-400 font-normal">(optional)</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="z. B. 35578 Wetzlar"
                    value={contactData.zipCity}
                    onChange={(e) => setContactData({ ...contactData, zipCity: e.target.value })}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all placeholder:text-neutral-400"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                Projekt-Kurzbeschreibung <span className="text-xs text-neutral-400 font-normal">(optional)</span>
              </label>
              <textarea
                rows={2}
                placeholder="z. B. Bad ca. 10 qm, Altbausanierung, ebenerdige Dusche gewünscht..."
                value={contactData.notes}
                onChange={(e) => setContactData({ ...contactData, notes: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all placeholder:text-neutral-400 resize-none"
              />
            </div>

            {/* Privacy Checkbox */}
            <div className="flex items-start gap-2.5 pt-1">
              <input
                id="booking-consent"
                type="checkbox"
                required
                checked={contactData.privacyConsent}
                onChange={(e) => setContactData({ ...contactData, privacyConsent: e.target.checked })}
                className="mt-0.5 w-4 h-4 rounded border-neutral-300 text-orange-600 focus:ring-orange-500 cursor-pointer accent-orange-600"
              />
              <label htmlFor="booking-consent" className="text-xs text-neutral-600 leading-tight cursor-pointer">
                Ich stimme der Kontaktaufnahme zur Terminabstimmung gemäß{' '}
                <Link href="/datenschutz" className="text-orange-700 underline hover:text-orange-900 font-medium">
                  Datenschutzerklärung
                </Link>{' '}
                zu.
              </label>
            </div>

            {errorMessage && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-medium text-red-700">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-bold text-sm shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/35 transition-all disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Termin wird reserviert...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verbindlichen Vor-Ort-Termin anfragen</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-4 pt-1 text-[11px] text-neutral-500">
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3 text-neutral-400" />
                100% kostenfrei &amp; unverbindlich
              </span>
              <span>&middot;</span>
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-neutral-400" />
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
