// SIG-1 Kreuzlinie (KERN K-007, nur Startseite): Waage und Lot wachsen beim Laden aus dem Kreuzpunkt, mobil nur
// das Lot. Rein dekorativ; ohne Bewegung (reduziert, ohne JavaScript, Druck) stehen beide Linien voll.
// Lage über className: linke Kante = Lot, obere Kante = Waage (z. B. „-top-8“ mit ACHSE_LAGE); das Kreuz mobil 8 px.
import clsx from 'clsx';
import Fugenkreuz from './Fugenkreuz';
import { KREUZ_GROESSE } from './Leitachse';

export default function Kreuzlinie({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" data-motion="sig-kreuzlinie" className={clsx('kreuzlinie', className)}>
      <span className="kreuzlinie-lot" />
      <span className="kreuzlinie-waage max-lg:hidden" />
      <Fugenkreuz className={clsx('kreuzlinie-punkt text-laser', KREUZ_GROESSE)} />
    </div>
  );
}
