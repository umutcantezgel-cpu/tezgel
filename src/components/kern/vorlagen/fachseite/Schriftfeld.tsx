// Schriftfeld (P4-01, KERN v1.2 K-008, K-015): Stempelfeld eines Plans – Felder ohne Zwischenraum, getrennt durch 1-px-Fugen,
// Feldköpfe in Mono, optional ein Kopf auf Tinte. Platz im Einstieg der Fachseite (Prop `schriftfeld`), auf Erzählseiten einmal.
// Die Vorlage enthält keine Feldköpfe: Wortlaut und Werte kommen von der Seite; Werte aus der Datenquelle
// (`COMPANY_DATA`, `RATING_SUMMARY`, K-008 Single Source). Kein Bedienelement, keine Zustände.
// Mobil zwei Spalten; ein ungerader letzter Eintrag läuft über beide Spalten. Lange Wörter brechen in der Zelle um (Lehre 6).
import type { ReactNode } from 'react';
import { verbinde } from '@/components/kern/basis';
import { UMBRUCH } from '@/components/kern/vorlagen/fachseite/typen';

export type SchriftfeldEintrag = {
  /** Feldkopf (Mono, Tinte-2) */
  kopf: ReactNode;
  /** Wert; `mono` für Messbares (Jahreszahl, PLZ, Bewertung) */
  wert: ReactNode;
  mono?: boolean;
};

export type SchriftfeldProps = {
  eintraege: readonly SchriftfeldEintrag[];
  /** Kopfzeile auf Tinte (optional) */
  titel?: ReactNode;
  className?: string;
};

export default function Schriftfeld({ eintraege, titel, className }: SchriftfeldProps) {
  if (eintraege.length === 0) return null;
  return (
    <div className={verbinde('border border-k-strich bg-k-fliese', className)}>
      {titel ? <p className="bg-k-tinte px-k-4 py-k-2 k-mono text-k-1 text-k-kalk">{titel}</p> : null}
      <dl className="grid grid-cols-2 gap-px bg-k-fuge">
        {eintraege.map((e, i) => (
          <div key={i} className="flex min-w-0 flex-col gap-k-1 bg-k-fliese p-k-3 odd:last:col-span-2">
            <dt className={verbinde('k-mono text-k-1 text-k-tinte-2', UMBRUCH)}>{e.kopf}</dt>
            <dd className={verbinde(e.mono ? 'k-mono text-k-2' : 'k-text text-k-2 font-semibold', 'text-k-tinte', UMBRUCH)}>{e.wert}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
