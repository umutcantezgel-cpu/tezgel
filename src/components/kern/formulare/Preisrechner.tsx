'use client';

// Preisrechner der Startseite (F-02, P3-13b, KERN v1.2): Projektanfrage mit Situationsschilderung, ohne Preise.
// Logik unverändert aus `usePreisrechner` (G9, Einwilligung startet leer – E-014); die Ansicht liegt in `formulare/b/`.
// Client-Insel im Abschnitt `#kosten-rechner` (`@/components/kern/start/Anfrage`).
import { usePreisrechner } from '@/lib/formulare/usePreisrechner';
import PreisrechnerAnsicht from '@/components/kern/formulare/b/PreisrechnerAnsicht';

export default function Preisrechner() {
  const rechner = usePreisrechner();
  return <PreisrechnerAnsicht rechner={rechner} />;
}
