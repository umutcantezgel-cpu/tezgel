// SIG-1 Kreuzlinie (KERN K-007, nur Startseite): Waage und Lot wachsen beim Laden aus dem Kreuzpunkt, mobil nur
// das Lot. Rein dekorativ; ohne Bewegung (reduziert, ohne JavaScript, Druck) stehen beide Linien voll.
// Lage über className: linke Kante = Lot, obere Kante = Waage (z. B. „left-2 -top-8 md:left-4 lg:left-8“).
import clsx from 'clsx';
import Fugenkreuz from './Fugenkreuz';

export default function Kreuzlinie({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" data-motion="sig-kreuzlinie" className={clsx('kreuzlinie', className)}>
      <span className="kreuzlinie-lot" />
      <span className="kreuzlinie-waage max-lg:hidden" />
      <Fugenkreuz className="kreuzlinie-punkt size-3 text-laser" />
    </div>
  );
}
