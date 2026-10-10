// RatgeberListe (KERN K-009, Halbverband): Artikelliste als Zeilen an der Fuge statt Karten.
// Je Zeile: Mono-Zeile (Kategorie · Datum · Lesezeit), Titel als Überschrift mit Link, Anriss, Pfeil rechts.
// Der Link dehnt sich über die ganze Zeile; Hover und Fokus wechseln Fuge → Strich und die Fläche auf Fliese.
import clsx from 'clsx';
import Link from 'next/link';
import Icon from '@/components/icons/Icon';
import { linkKlassen } from './stile';

export interface RatgeberArtikel {
  href: string;
  titel: string;
  anriss?: string;
  kategorie?: string;
  datum?: string;
  lesezeit?: string;
}

export interface RatgeberListeProps {
  artikel: RatgeberArtikel[];
  /** Ebene der Titel-Überschriften; Standard h3 */
  ueberschriftEbene?: 'h2' | 'h3' | 'h4';
  className?: string;
}

export default function RatgeberListe({ artikel, ueberschriftEbene = 'h3', className }: RatgeberListeProps) {
  const Ebene = ueberschriftEbene;
  return (
    <ul className={clsx('border-t border-fuge', className)}>
      {artikel.map((a) => {
        const kopfteile = [a.kategorie, a.datum, a.lesezeit].filter(Boolean);
        return (
          <li
            key={a.href}
            data-motion="zustand"
            className="relative border-b border-fuge transition-colors dauer-1 ease-setzen hover:border-strich hover:bg-fliese focus-within:border-strich focus-within:bg-fliese active:bg-fliese"
          >
            <div className="flex items-center gap-6 px-4 py-6 md:px-6 lg:px-8 lg:py-8">
              <div className="min-w-0 flex-1">
                {kopfteile.length > 0 && (
                  <p className="font-mono text-fs-1 text-tinte-2">
                    {kopfteile.map((teil, i) => (
                      <span key={i}>
                        {i > 0 && ' · '}
                        <span className="whitespace-nowrap">{teil}</span>
                      </span>
                    ))}
                  </p>
                )}
                <Ebene className="mt-2 font-text text-fs-4 font-semibold text-tinte">
                  <Link href={a.href} className={clsx(linkKlassen, 'after:absolute after:inset-0')}>
                    {a.titel}
                  </Link>
                </Ebene>
                {a.anriss && <p className="mt-2 max-w-mass font-text text-fs-3 text-tinte-2">{a.anriss}</p>}
              </div>
              <Icon name="pfeil-rechts" groesse={5} className="shrink-0 text-tinte" />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
