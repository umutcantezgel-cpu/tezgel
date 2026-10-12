// /leistungen/[id] · Spezialisierungen (S-04, KERN v2 K-003 „Fuge statt Karte“): Bestand „Subcategories Bento“ – zentrierte
// H2 über Glas-Kacheln mit Icon-Chip. Jetzt ein Band auf Fliese (wie „Fachbereiche“ auf der Startseite) mit einem
// Feldraster: Felder auf Kalk, getrennt nur durch 1-px-Fugen, je Feld oben die laufende Nummer in Mono, unten der Name;
// unter md (eine Spalte) als dichte Zeilen, Nummer und Name nebeneinander. Die Spaltenzahl folgt der Zahl der Felder (3 oder
// 4), damit keine leere Rasterzelle stehen bleibt.
// Wortlaut: H2 „Spezialisierungen in {Leistung}“ und die Namen aus `SERVICES[].subcategories` – wie im Bestand ohne Link und
// ohne Beschreibung (die Daten führen keine). Ein `auftritt` am Raster (dieser Abschnitt ist der einzige mit Auftritt).
// Namen mit `wrap-break-word`: Bei 320–1920 px passen alle Wörter (wortbruch 0); erst bei 200 % Zoom (a11y-zusatz, CSS-Zoom)
// bricht ein zu langes Wort im Feld um, statt über die Fuge zu ragen.
// Server-Komponente; ohne Unterkategorien entfällt der Abschnitt wie im Bestand.
import clsx from 'clsx';
import Abschnitt from '@/components/kern/Abschnitt';
import type { Leistung } from '@/components/leistungen/Gewerk';

// Raster je Feldzahl (wörtliche Klassen, damit Tailwind sie findet)
const RASTER: Record<number, string> = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-2 lg:grid-cols-4',
};

export default function Unterkategorien({ leistung }: { leistung: Leistung }) {
  const unter = leistung.subcategories ?? [];
  if (unter.length === 0) return null;

  return (
    <Abschnitt
      id="spezialisierungen"
      titel={`Spezialisierungen in ${leistung.name}`}
      auftritt
      // Fläche Fliese von Hand: nur die Unterkante, die Oberkante zieht schon der Einstieg (keine doppelte Fuge)
      className="border-b border-fuge bg-fliese"
    >
      <ul className={clsx('grid grid-cols-1 gap-px border border-fuge bg-fuge', RASTER[unter.length] ?? RASTER[4])}>
        {unter.map((u, i) => (
          <li key={u.id} className="flex items-baseline gap-4 bg-kalk p-6 md:min-h-32 md:flex-col md:items-stretch md:justify-between md:gap-8 lg:p-8">
            <span className="font-mono text-fs-1 text-tinte-2">{String(i + 1).padStart(2, '0')}</span>
            <p className="min-w-0 font-anzeige text-fs-4 font-semibold wrap-break-word text-tinte">{u.name}</p>
          </li>
        ))}
      </ul>
    </Abschnitt>
  );
}
