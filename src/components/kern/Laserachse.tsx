// Leitelement der Erzählansichten (KERN K-007): Lot im Seitenfluss, Grundschicht Fuge, das rote Stück
// wächst mit dem Scrollfortschritt (CSS animation-timeline). Ohne Unterstützung oder bei reduzierter
// Bewegung steht das rote Stück voll und statisch. Rein dekorativ, schneidet nie Text.
import clsx from 'clsx';

export default function Laserachse({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" data-leitachse="" data-motion="leitachse" className={clsx('leitachse', className)}>
      <span className="leitachse-rot" />
    </div>
  );
}
