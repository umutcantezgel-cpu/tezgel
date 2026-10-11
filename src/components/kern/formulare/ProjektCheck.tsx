'use client';

// Bad-Projektcheck (F-05, P4-05a, KERN v1.2): Größe, Umfang, Ausstattungsniveau und Extras, dann Anfrage online oder per
// WhatsApp. Logik unverändert aus `useProjektCheck` (G9), dieselbe wie im Bestand `src/components/funnels/BadProjektCheck.jsx`;
// die Ansicht liegt in `formulare/c/`. Client-Insel für `/bad/projekt-check` und den Abschnitt `#projekt-check` auf `/bad`.
import { useProjektCheck } from '@/lib/formulare/useProjektCheck';
import ProjektCheckAnsicht from '@/components/kern/formulare/c/ProjektCheckAnsicht';

export default function ProjektCheck() {
  const check = useProjektCheck();
  return <ProjektCheckAnsicht check={check} />;
}
