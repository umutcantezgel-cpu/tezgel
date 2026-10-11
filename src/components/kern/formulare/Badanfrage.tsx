'use client';

// Badanfrage in fünf Schritten (F-04, P4-05a, KERN v1.2): Immobilie → Umfang → Raummaße → Ausstattung → Kontakt und
// Absenden (online oder per WhatsApp). Logik unverändert aus `useBadanfrage` (G9), dieselbe wie im Bestand
// `src/components/funnels/BadanfrageFunnel.jsx`; die Ansicht liegt in `formulare/c/`. Client-Insel für die Kern-Bad-Seiten.
import { useBadanfrage } from '@/lib/formulare/useBadanfrage';
import BadanfrageAnsicht from '@/components/kern/formulare/c/BadanfrageAnsicht';

export default function Badanfrage() {
  const anfrage = useBadanfrage();
  return <BadanfrageAnsicht anfrage={anfrage} />;
}
