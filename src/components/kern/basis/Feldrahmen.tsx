// Gemeinsamer Rahmen der Formularfelder (K-011): sichtbare Beschriftung über dem Feld, Hilfetext in Tinte-2,
// darunter die Meldung – Fehler mit Versatz-Zeichen + Text + role="alert", Erfolg mit Haken + Text.
// Feld, Mehrzeilig und Auswahl nutzen ihn; Ankreuzfeld, Auswahlknopf und Feldgruppe nutzen FeldMeldung.
// Server-tauglich: useId ist in Server-Komponenten erlaubt.
import { useId, type ReactNode } from 'react';
import Icon from '@/components/kern/icons/Icon';
import { beschreibung, fokus, verbinde } from '@/components/kern/basis/klassen';

/** Gemeinsame Angaben aller Felder mit Beschriftung. */
export type FeldAngaben = {
  /** sichtbare Beschriftung (Wortlaut vom Aufrufer, K-012 Klasse 1) */
  beschriftung: ReactNode;
  /** Zusatz hinter der Beschriftung in Mono, z. B. „*“ oder „(für Bestätigung)“ */
  zusatz?: ReactNode;
  /** Hilfetext unter der Beschriftung */
  hilfe?: ReactNode;
  /** Fehlertext; setzt aria-invalid, roten Rahmen und Versatz-Zeichen */
  fehler?: ReactNode;
  /** Erfolgstext (geprüft und passend); Haken + Text. Fehler hat Vorrang. */
  erfolg?: ReactNode;
  /** Klassen am äußeren Rahmen (Platz im Raster) */
  className?: string;
};

export function useFeldIds(eigeneId?: string) {
  const erzeugt = useId();
  const id = eigeneId ?? `k-feld${erzeugt}`;
  return { id, hilfeId: `${id}-hilfe`, meldungId: `${id}-meldung` };
}

/** aria-describedby für das Eingabeelement: Hilfe, Meldung und eigene Verweise des Aufrufers. */
export function feldBeschreibung(
  { hilfe, fehler, erfolg }: Pick<FeldAngaben, 'hilfe' | 'fehler' | 'erfolg'>,
  ids: { hilfeId: string; meldungId: string },
  eigene?: string,
): string | undefined {
  return beschreibung(hilfe ? ids.hilfeId : undefined, fehler || erfolg ? ids.meldungId : undefined, eigene);
}

/** Meldung unter einem Feld. Fehler: role="alert" (wird beim Erscheinen angesagt). */
export function FeldMeldung({ id, fehler, erfolg, className }: { id: string; fehler?: ReactNode; erfolg?: ReactNode; className?: string }) {
  if (fehler) {
    return (
      <p id={id} role="alert" className={verbinde('flex items-start gap-k-2 k-text text-k-2 text-k-laser-tief', className)}>
        <span className="flex h-lh shrink-0 items-center text-k-laser">
          <Icon name="fehler" groesse={16} />
        </span>
        <span className="min-w-0">{fehler}</span>
      </p>
    );
  }
  if (erfolg) {
    return (
      <p id={id} className={verbinde('flex items-start gap-k-2 k-text text-k-2 text-k-abnahme', className)}>
        {/* Haken inline (Pfade mit pathLength=1), damit `notiert` ihn zeichnen kann – CSS erreicht Pfade hinter use nicht */}
        <span className="flex h-lh shrink-0 items-center" data-motion="notiert">
          <Icon name="haken" groesse={16} inline />
        </span>
        <span className="min-w-0">{erfolg}</span>
      </p>
    );
  }
  return null;
}

export function Beschriftung({ htmlFor, zusatz, deaktiviert, children }: { htmlFor: string; zusatz?: ReactNode; deaktiviert?: boolean; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className={verbinde('k-text text-k-2 font-semibold', deaktiviert ? 'text-k-tinte-2' : 'text-k-tinte')}>
      {children}
      {zusatz ? <span className="k-mono text-k-1 text-k-tinte-2"> {zusatz}</span> : null}
    </label>
  );
}

export function Hilfe({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="k-text text-k-2 text-k-tinte-2">
      {children}
    </p>
  );
}

type RahmenProps = Pick<FeldAngaben, 'beschriftung' | 'zusatz' | 'hilfe' | 'fehler' | 'erfolg' | 'className'> & {
  ids: { id: string; hilfeId: string; meldungId: string };
  deaktiviert?: boolean;
  children: ReactNode;
};

export function Feldrahmen({ beschriftung, zusatz, hilfe, fehler, erfolg, className, ids, deaktiviert, children }: RahmenProps) {
  return (
    <div className={verbinde('flex min-w-0 flex-col gap-k-2', className)}>
      <Beschriftung htmlFor={ids.id} zusatz={zusatz} deaktiviert={deaktiviert}>
        {beschriftung}
      </Beschriftung>
      {hilfe ? <Hilfe id={ids.hilfeId}>{hilfe}</Hilfe> : null}
      {children}
      <FeldMeldung id={ids.meldungId} fehler={fehler} erfolg={erfolg} />
    </div>
  );
}

/**
 * Klassen des Eingabeelements (input, textarea, select).
 * Ruhe: Fliese, Rand Strich (3,62 : 1) · Hover (feiner Zeiger): Rand Tinte-2 · Fokus: Rand Tinte + 2 px Fokusrahmen ·
 * Fehler: Rand Laser · Erfolg: Rand Abnahme · deaktiviert: Kalk, gestrichelt, Cursor.
 */
export function feldKlassen({ ungueltig, gueltig, mono }: { ungueltig?: boolean; gueltig?: boolean; mono?: boolean }): string {
  const rand = ungueltig
    ? 'border-k-laser'
    : gueltig
      ? 'border-k-abnahme'
      : 'border-k-strich pointer-fine:enabled:hover:not-focus-visible:border-k-tinte-2 focus-visible:border-k-tinte';
  return verbinde(
    'block w-full min-w-0 min-h-k-7 rounded-k-1 border bg-k-fliese px-k-3 py-k-2 text-k-3 text-k-tinte placeholder:text-k-tinte-2',
    mono ? 'k-mono' : 'k-text',
    rand,
    fokus('hell'),
    'disabled:cursor-not-allowed disabled:border-dashed disabled:border-k-strich disabled:bg-k-kalk disabled:text-k-tinte-2',
  );
}
