'use client';

// Terminanfrage auf /termin (F-08, P4-05c, KERN v1.2): Umschalter zwischen Kalender (F-07) und Formular, Absenden online
// oder per WhatsApp. Logik unverändert aus `useTerminAnfrage` (G9), dieselbe wie im Bestand `src/app/(bestand)/termin/page.jsx`;
// die Ansicht liegt in `formulare/e/`. Client-Insel für den Inhalt unter dem Seitenkopf von /termin.
import { useTerminAnfrage } from '@/lib/formulare/useTerminAnfrage';
import TerminKalender from '@/components/kern/formulare/TerminKalender';
import TerminAnfrageAnsicht from '@/components/kern/formulare/e/TerminAnfrageAnsicht';

export default function TerminAnfrage() {
  const anfrage = useTerminAnfrage();
  return <TerminAnfrageAnsicht anfrage={anfrage} kalender={<TerminKalender initialServiceType="Kostenfreies Vor-Ort-Aufmaß & Beratung" />} />;
}
