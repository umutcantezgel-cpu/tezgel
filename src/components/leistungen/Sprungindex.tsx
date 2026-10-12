// /leistungen · Sprungindex (S-01, KERN v2 K-009 Schriftfeld): Randspalte des Einstiegs. Die vier Fachgewerke als Zeilen
// an der Fuge – Nummer in Mono (dieselbe wie im Feldkopf des Gewerks), Name aus `SERVICES`, Ziel `#<id>` auf derselben
// Seite. Die Liste trägt ihren Namen „Fachgewerke“ nur per aria-label (keine neue sichtbare Überschrift).
// Ab lg sitzt das Feld unten in der Randspalte, auf Höhe der Aktionen – wie das Schriftfeld eines Plans rechts unten.
// Farbwechsel bei Hover/Fokus nach Register (`zustand`); Server-Komponente, keine weitere Bewegung.
// Fokus (Tor S-01/03, a11y-zusatz): Die Zeile mit dem fokussierten Link liegt über ihren Nachbarn (`focus-within:z-10`),
// sonst überdecken die Nachbarfelder im Fugenraster einen Teil des 2-px-Fokusrings.
import { SERVICES } from '@/config/services';
import Icon from '@/components/icons/Icon';

export const gewerkNummer = (nr: number) => String(nr + 1).padStart(2, '0');

export default function Sprungindex() {
  return (
    <div className="flex h-full flex-col justify-end">
      <ol aria-label="Fachgewerke" className="grid gap-px border border-fuge bg-fuge">
        {SERVICES.map((leistung, nr) => (
          <li key={leistung.id} className="relative bg-fliese focus-within:z-10">
            <a
              href={`#${leistung.id}`}
              data-motion="zustand"
              className="group flex min-h-12 items-center gap-4 px-4 py-3 text-tinte hover:bg-kalk"
            >
              <span className="w-6 shrink-0 font-mono text-fs-1 text-tinte-2">{gewerkNummer(nr)}</span>
              <span className="min-w-0 flex-1 font-text text-fs-2 font-semibold underline decoration-transparent underline-offset-4 group-hover:decoration-tinte">
                {leistung.name}
              </span>
              <Icon name="winkel-unten" groesse={5} className="text-strich group-hover:text-tinte" />
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}
