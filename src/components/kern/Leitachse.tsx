// Leitachse der Erzählansichten (KERN K-007 leitachse): ein Lot im Seitenfluss über alle Abschnitte nach dem
// Einstieg, an derselben Stelle wie Lot bzw. Kreuzlinie des Einstiegs (im Seitenrand vor der Inhaltskante, mobil
// ≥ 8 px Abstand zum Text). Grundschicht Fuge, rot nur das gezogene Stück (K-003 Nr. 2): es wächst mit dem
// Lesefortschritt, nur bei erlaubter Bewegung; reduziert und ohne JavaScript bleibt die Achse grau (globals.css, R-01a).
// Abschnitte mit `leitachse` setzen an ihrer Oberkante ein Fugenkreuz auf das Lot. Schneidet nie Text.
//
// Ebenen (K-005, R-01a): Die Zierebene liegt unter dem Inhalt – ohne z-index vor dem Inhalt; der Inhalt steht in einer
// positionierten Hülle ohne eigenen Stapelkontext und malt in Baumreihenfolge darüber. Flächen (Fliese, Tinte, Bänder)
// decken das Lot, es läuft unter ihnen weiter wie im Anfahrtsband (Gutachten u8). Über dem Text liegt keine Ebene mehr
// (axe „bgOverlap“), und Ebenen im Inhalt (z-30 … z-50) bleiben im Stapel der Seite.
//
// `gezogen={false}` (R-02a): nur die Grundschicht, kein rotes Stück – für Strecken der Seite, in denen ein anderes Rot
// der Blickfang ist (z. B. die Anfahrt der Stadtseiten). Die Seite teilt ihre Leitachse dann in Abschnittsfolgen; die Lote
// stehen an derselben Stelle und laufen ohne Lücke ineinander. Keine Bewegung, kein Registereintrag (data-leitachse bleibt
// für die Überlappungsprüfung).
import type { ReactNode } from 'react';
import clsx from 'clsx';
import Laserachse from './Laserachse';
import { seitenKlassen } from './stile';

/** Lage des Lots im Seitenrahmen – gemeinsam für Einstieg, Leitachse und Abschnittsmarken */
// mobil 8 px vom Rand: das Fugenkreuz der Abschnittsmarke (12 px) steht ganz im Bild, 2 px vor der Textkante (Sichtprüfung E2)
export const ACHSE_LAGE = 'left-2 md:left-4 lg:left-8';

export default function Leitachse({ children, gezogen = true, className }: { children: ReactNode; gezogen?: boolean; className?: string }) {
  return (
    <div className={clsx('relative', className)}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className={clsx(seitenKlassen, 'relative h-full')}>
          {gezogen ? <Laserachse className={ACHSE_LAGE} /> : <div data-leitachse="" className={clsx('leitachse', ACHSE_LAGE)} />}
        </div>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
