// Pflichthinweis (Tor E3, Probeläufe P1 bis P4): erklärt das Sternchen der Pflichtfelder in einem Satz, einmal je Formular
// vor dem ersten Pflichtfeld. Das Sternchen selbst bleibt für Vorleser stumm (aria-hidden oder pflichtKlassen); Vorleser
// hören „erforderlich“ über das required-Attribut des Feldes. Pflichtfelder, Namen und IDs der Formulare bleiben, wie sie
// sind (G8). Serverkomponente.
import clsx from 'clsx';

export default function PflichtHinweis({ className, dunkel = false }: { className?: string; dunkel?: boolean }) {
  return (
    <p className={clsx('font-text text-fs-2', dunkel ? 'text-nacht-2' : 'text-tinte-2', className)}>
      Felder mit <span aria-hidden="true">*</span>
      <span className="sr-only">Sternchen</span> müssen Sie ausfüllen.
    </p>
  );
}
