// Rufnummer (KERN v3 K-006: Mono für Telefonnummern): die Nummer in Mono, umbrechen darf sie nur nach dem Schrägstrich
// („06441 /“ und „44 83 567“). Ganz ohne Umbruch liefe sie bei großer Systemschrift über den Rand, mit freiem Umbruch
// zerfiele sie in Ziffernpaare. Serverkomponente.
// Ist ein umgebender Block als Container markiert (`@container`, die ganze Spalte: Knopfreihe, Schriftfeld) und schmaler als
// 18rem, also nur bei großer Systemschrift (bei 200 % misst die Nummer in fs-2 rund 306 px, ein Feld am Handy innen rund
// 292 px; bei 100 % sind auch 320 px breite Geräte breiter), steht die Vorwahl als eigene Zeile über der Nummer, ohne
// Schrägstrich; vorher hing „06441 /“ am Zeilenende (E2-SICHT-2 Befund 10, E3-START-05). Einzelne schmale Felder nicht als
// Container markieren: am Desktop sind sie schmaler als 18rem, obwohl die Nummer hineinpasst.
// Ohne Container ändert sich nichts. Der Textinhalt bleibt „06441 / 44 83 567“ (Vorleser, Prüfungen).
import clsx from 'clsx';
import { COMPANY_DATA } from '@/config/company';

export function rufnummerTeile(nummer: string): [string, string] {
  const schnitt = nummer.indexOf('/');
  return schnitt < 0 ? [nummer, ''] : [nummer.slice(0, schnitt + 1), nummer.slice(schnitt + 1).trim()];
}

export default function Rufnummer({ nummer = COMPANY_DATA.contact.phone, className }: { nummer?: string; className?: string }) {
  const [vorwahl, rest] = rufnummerTeile(nummer);
  const strich = rest && vorwahl.endsWith('/');
  return (
    <span className={clsx('font-mono', className)}>
      <span className="whitespace-nowrap @max-2xs:block">
        {strich ? vorwahl.slice(0, -1).trimEnd() : vorwahl}
        {strich && <span className="@max-2xs:hidden"> /</span>}
      </span>
      {rest && (
        <>
          {' '}
          <span className="whitespace-nowrap @max-2xs:block">{rest}</span>
        </>
      )}
    </span>
  );
}
