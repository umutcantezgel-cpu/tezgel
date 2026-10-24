// /leistungen · Plan-Übergang (F-01, SIG-3 E3-ORCH-02, K-007 seitenwechsel): Hülle um den Verlegeplan eines Fachgewerks.
// Derselbe Plan gleitet beim Weg zu den Fachdetails (Übergangsart „plan-vor“) in den Einstieg der Leistungsseite – nur
// vorwärts, ab lg, nicht bei reduzierter Bewegung (bewegung.css, Abschnitt seitenwechsel). Zurück seit E-037 (Entscheidung
// des Auftraggebers): Der Link trägt data-uebergang="plan-vor"; ist der Morph möglich, lässt B-01 „Verlegen“ den Klick durch,
// sonst verlegt B-01 wie bei jedem Link (src/lib/verlegen/linkfilter.ts, Verlegen.tsx).
// Eigene .jsx-Datei: `ViewTransition` steht in den React-Typen nur im Kanal „canary“, den das Projekt nicht einbindet;
// der Gewerk-Baustein (TypeScript) nutzt die Hülle über diese Datei, wie die Seite vor der Fusion (page.jsx).
import { ViewTransition } from 'react';

export default function PlanUebergang({ id, children }) {
  return (
    <ViewTransition name={`plan-${id}`} share={{ 'plan-vor': 'plan-morph', default: 'none' }} default="none">
      {children}
    </ViewTransition>
  );
}
