// Das einzige gefüllte Zeichen des Formsystems (KERN K-008): Kreuzpunkt, Markierung, Aufzählung.
// Dekorativ; die Größe folgt der Schriftgröße (1em) oder size-*.
import clsx from 'clsx';

export default function Fugenkreuz({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true" focusable="false" className={clsx('inline-block shrink-0 fill-current', className)}>
      <path d="M5 0h2v5h5v2H7v5H5V7H0V5h5z" />
    </svg>
  );
}
