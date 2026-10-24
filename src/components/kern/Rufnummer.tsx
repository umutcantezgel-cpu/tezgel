// Rufnummer (KERN v3 K-006: Mono für Telefonnummern): die Nummer in Mono, umbrechen darf sie nur nach dem Schrägstrich
// („06441 /“ und „44 83 567“). Ganz ohne Umbruch liefe sie bei großer Systemschrift über den Rand, mit freiem Umbruch
// zerfiele sie in Ziffernpaare. Serverkomponente.
import clsx from 'clsx';
import { COMPANY_DATA } from '@/config/company';

export function rufnummerTeile(nummer: string): [string, string] {
  const schnitt = nummer.indexOf('/');
  return schnitt < 0 ? [nummer, ''] : [nummer.slice(0, schnitt + 1), nummer.slice(schnitt + 1).trim()];
}

export default function Rufnummer({ nummer = COMPANY_DATA.contact.phone, className }: { nummer?: string; className?: string }) {
  const [vorwahl, rest] = rufnummerTeile(nummer);
  return (
    <span className={clsx('font-mono', className)}>
      <span className="whitespace-nowrap">{vorwahl}</span>
      {rest && (
        <>
          {' '}
          <span className="whitespace-nowrap">{rest}</span>
        </>
      )}
    </span>
  );
}
