// Plan der Seite (P4-10a, K-009 SIG-3 ruhend, K-010): der ruhende Verlegeplan einer Fachseite nach der Zuordnung `PLAN_JE_PFAD`
// aus P4-03 (`@/components/kern/motive/plaene`). Für den Platz `motiv` im Einstieg: `motiv={<PlanDerSeite pfad="/bad/badsanierung" />}`.
// Ohne Eintrag (z. B. Entkopplung, Fliesen auf Fliesen; E-027: folgt in W5) gibt es keine Ausgabe – die Seite setzt dann den
// Plan der Leistung über `PLAENE[PLAN_JE_LEISTUNG[id]]`. Dekorativ (aria-hidden); `titel` nur mit MIKROTEXTE-Zeile (Klasse 2).
import { PLAENE, PLAN_JE_PFAD } from '@/components/kern/motive/plaene';

export default function PlanDerSeite({ pfad, titel }: { pfad: string; titel?: string }) {
  const name = PLAN_JE_PFAD[pfad];
  if (!name) return null;
  const { Plan } = PLAENE[name];
  return <Plan ruhend titel={titel} />;
}
