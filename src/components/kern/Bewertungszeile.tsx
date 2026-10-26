// Bewertungszeile (KERN v3 K-003 Nr. 4, G8): Sterne, Durchschnitt und Zahl der Google-Bewertungen aus RATING_SUMMARY, wahlweise
// mit Stand. Kennzeile über dem Plan im Einstieg (Planblatt) und unter der großen Kundenstimme (vormals in StartEinstieg,
// E-044). Serverkomponente.
import clsx from 'clsx';
import Icon from '@/components/icons/Icon';
import { zusammen } from '@/components/kern/zusammen';
import { RATING_SUMMARY } from '@/config/reviews';

/** `geteilt`: Ist die Zeile schmaler als 28rem, steht die Zahl der Bewertungen in einer eigenen Zeile ohne Mittelpunkt (oben
 *  rechts im Planblatt, E-037), statt dass der Mittelpunkt eine neue Zeile beginnt. */
export default function Bewertungszeile({ stand = false, geteilt = false, className }: { stand?: boolean; geteilt?: boolean; className?: string }) {
  const g = RATING_SUMMARY.google;
  return (
    <p className={clsx(geteilt && '@container', className)}>
      <span className="inline-flex items-center gap-1 align-middle text-tinte" aria-hidden="true">
        {Array.from({ length: g.maxRating }, (_, i) => (
          <Icon key={i} name="stern-voll" groesse={4} />
        ))}
      </span>{' '}
      <span className="font-semibold text-tinte">{zusammen(`${g.displayRating} von ${g.maxRating} Sternen`)}</span>
      {/* der Mittelpunkt hängt per geschütztem Leerzeichen am Wort davor, umbrechen darf die Zeile nur danach: keine Zeile
          beginnt mit „·“ (Browserprüfung E4-W0, E-065), und allein am Zeilenende steht er nie (Sichtabnahme E2, Befund 14) */}
      <span aria-hidden="true" className={clsx(geteilt && '@max-md:hidden')}>{' · '}</span>
      <span className="sr-only">, </span>
      {/* Zahl und Nomen bleiben beisammen (Runde 4) */}
      <span className={clsx(geteilt && '@max-md:block')}>{zusammen(`${g.count} Bewertungen bei Google`)}</span>
      {stand && (
        <>
          <span aria-hidden="true">{' · '}</span>
          <span className="sr-only">, </span>
          <span>Stand {RATING_SUMMARY.asOf}</span>
        </>
      )}
    </p>
  );
}
