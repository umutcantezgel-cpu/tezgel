// /leistungen · Sprungindex (F-01, Fusion E-039; Baustein aus Fassung B, KERN v2 K-009): die vier Fachgewerke als Zeilen an
// der Fuge in der Randspalte des Einstiegs – Nummer in Mono (dieselbe wie im Etikett des Gewerks), Name aus `SERVICES`, Ziel
// `#<id>` auf derselben Seite, Pfeil nach unten. Die Liste trägt ihren Namen „Fachgewerke“ nur per aria-label (keine neue
// sichtbare Überschrift). Lage: Gutachten u1 – ab lg unter Plan und Schriftfeld (oben ausgerichtet, nicht an die Unterkante
// geschoben), mobil direkt nach den Aktionen; die Reihenfolge setzt die Seite.
// Fokus: Die Zeile mit dem fokussierten Link liegt über ihren Nachbarn (`focus-within:z-10`), sonst überdecken die
// Nachbarfelder im Fugenraster einen Teil des 2-px-Fokusrings. Breite an die Spalte gebunden (`grid-cols-1`, `min-w-0`,
// Umbruch im Namen), damit die Liste auch bei 200 % CSS-Zoom nicht über den Seitenrand ragt (Gutachten u1, Rezept 2).
// Farbwechsel nur bei feinem Zeiger bzw. beim Antippen (K-007, Register `zustand`); Server-Komponente.
import clsx from 'clsx';
import { SERVICES } from '@/config/services';
import Icon from '@/components/icons/Icon';

export const gewerkNummer = (nr: number) => String(nr + 1).padStart(2, '0');

export default function Sprungindex({ className }: { className?: string }) {
  return (
    <ol aria-label="Fachgewerke" className={clsx('grid min-w-0 grid-cols-1 gap-px border border-fuge bg-fuge', className)}>
      {SERVICES.map((leistung, nr) => (
        <li key={leistung.id} className="relative min-w-0 bg-fliese focus-within:z-10">
          <a
            href={`#${leistung.id}`}
            data-motion="zustand"
            className="group flex min-h-12 items-center gap-4 px-4 py-3 text-tinte pointer-fine:hover:bg-kalk active:bg-kalk"
          >
            <span className="w-6 shrink-0 font-mono text-fs-1 text-tinte-2">{gewerkNummer(nr)}</span>
            <span className="min-w-0 flex-1 font-text text-fs-2 font-semibold wrap-break-word underline decoration-transparent underline-offset-4 pointer-fine:group-hover:decoration-tinte group-active:decoration-tinte">
              {leistung.name}
            </span>
            <Icon name="winkel-unten" groesse={5} className="text-strich pointer-fine:group-hover:text-tinte" />
          </a>
        </li>
      ))}
    </ol>
  );
}
