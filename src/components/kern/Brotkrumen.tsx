// Brotkrumen (KERN v3 K-009, Auftrag Abschnitt 6 „Orientierung“): Weg zur aktuellen Seite auf tieferen Seiten.
// Nur die sichtbare Navigation; die strukturierten Daten (BreadcrumbList) setzt die Seite wie bisher selbst.
import Link from 'next/link';
import clsx from 'clsx';

export interface Krume {
  name: string;
  /** ohne href: die aktuelle Seite */
  href?: string;
}

export default function Brotkrumen({ wege, className }: { wege: Krume[]; className?: string }) {
  return (
    <nav aria-label="Sie sind hier" className={clsx('font-text text-fs-2 text-tinte-2', className)}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {wege.map((k, i) => (
          <li key={`${k.name}-${i}`} className="flex items-center gap-2">
            {i > 0 && (
              <span aria-hidden="true" className="text-strich">
                ›
              </span>
            )}
            {k.href ? (
              <Link href={k.href} className="underline decoration-fuge underline-offset-4 hover:text-tinte hover:decoration-tinte">
                {k.name}
              </Link>
            ) : (
              <span aria-current="page" className="text-tinte">
                {k.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
