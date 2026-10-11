'use client';

// Terminkalender in zwei Schritten (F-07, P4-05c, KERN v1.2): Tag und Uhrzeit wählen, dann Kontaktdaten und Absenden.
// Logik unverändert aus `useTerminKalender` (G9), dieselbe wie im Bestand `src/components/contact/BookingCalendar.tsx`;
// die Ansicht liegt in `formulare/e/`. Client-Insel für `/termin` (über `TerminAnfrage`) und `/kontakt#termin-buchen`.
// `initialServiceType` gibt der Aufrufer wie im Bestand an („… & Beratung“ auf /termin, „… & Schadensanalyse“ auf /kontakt).
import { useTerminKalender } from '@/lib/formulare/useTerminKalender';
import TerminKalenderAnsicht from '@/components/kern/formulare/e/TerminKalenderAnsicht';

export default function TerminKalender({ initialServiceType }: { initialServiceType: string }) {
  const kalender = useTerminKalender({ initialServiceType });
  return <TerminKalenderAnsicht kalender={kalender} initialServiceType={initialServiceType} />;
}
