// Schriftfeld (P4-01, gemeinsam seit P4-10a; KERN v1.2 K-008, K-015): Stempelfeld eines Plans – Felder ohne Zwischenraum,
// getrennt durch 1-px-Fugen, Feldköpfe in Mono, optional ein Kopf auf Tinte. Platz im Einstieg (Prop `schriftfeld`), auf
// Erzählseiten einmal. Zwei Spalten erst ab Behälterbreite 28rem (Container-Abfrage): Im Einstieg steht das Schriftfeld ab lg
// in Sp. 9–12, bei 1024 px sind das 309 px, bei 1440 px 405 px – zwei Spalten hätten „Handwerkskammer“ mitten im Wort
// gebrochen bzw. die Bewertung zerrissen.
// Ein ungerader letzter Eintrag läuft über beide Spalten. Kein Bedienelement, keine Zustände; Leerzustand: keine Ausgabe.
//
// SchriftfeldBetrieb (E-027, Antwort auf P4-01 F1): das Schriftfeld der Fachseiten aus vorhandenem Kern-Wortlaut, Werte aus der
// Datenquelle (K-008 Single Source):
// - Kopf: Kennzeile von `/` („Handwerkskammer-eingetragener Fachbetrieb {Inhaber}“, `start/einstieg-b/Einstieg`)
// - Feldkopf „Kammer“ → `authority.name` wie im Fuß (`fuss/Fuss`)
// - Bewertung wie auf `/`: Stern + „{displayRating} ({count} Bewertungen)“ aus `RATING_SUMMARY.google`
// Neuer Ort, Wortlaut gleich (K-012 Klasse 3): Die MIKROTEXTE-Zeilen trägt der Orchestrator ein, wenn eine Welle es nutzt.
import type { ReactNode } from 'react';
import { COMPANY_DATA } from '@/config/company';
import { RATING_SUMMARY } from '@/config/reviews';
import { verbinde } from '@/components/kern/basis';
import Icon from '@/components/kern/icons/Icon';
import type { IconName } from '@/components/kern/icons/geometrie';
import { UMBRUCH } from '@/components/kern/vorlagen/teile/typen';

export type SchriftfeldEintrag = {
  /** Feldkopf (Mono, Tinte-2); fehlt er, trägt `zeichen` das Feld (z. B. Stern vor der Bewertung, wie auf `/`) */
  kopf?: ReactNode;
  /** Wert; `mono` für Messbares (Jahreszahl, PLZ, Bewertung) */
  wert: ReactNode;
  mono?: boolean;
  /** dekoratives Zeichen vor dem Wert */
  zeichen?: IconName;
};

export type SchriftfeldProps = {
  eintraege: readonly SchriftfeldEintrag[];
  /** Kopfzeile auf Tinte (optional) */
  titel?: ReactNode;
  className?: string;
};

export default function Schriftfeld({ eintraege, titel, className }: SchriftfeldProps) {
  if (eintraege.length === 0) return null;
  // Beschreibungsliste nur, wenn jedes Feld einen Feldkopf hat (dt/dd-Paare); sonst eine Liste mit Absätzen.
  const paare = eintraege.every((e) => Boolean(e.kopf));
  const Liste = paare ? 'dl' : 'ul';
  const Zelle = paare ? 'div' : 'li';
  const Kopf = paare ? 'dt' : 'p';
  const Wert = paare ? 'dd' : 'p';
  return (
    <div className={verbinde('@container border border-k-strich bg-k-fliese', className)}>
      {titel ? <p className={verbinde('bg-k-tinte px-k-4 py-k-2 k-mono text-k-1 text-k-kalk', UMBRUCH)}>{titel}</p> : null}
      <Liste className="grid grid-cols-1 gap-px bg-k-fuge @md:grid-cols-2">
        {eintraege.map((e, i) => (
          <Zelle key={i} className="flex min-w-0 flex-col gap-k-1 bg-k-fliese p-k-3 @md:odd:last:col-span-2">
            {e.kopf ? <Kopf className={verbinde('k-mono text-k-1 text-k-tinte-2', UMBRUCH)}>{e.kopf}</Kopf> : null}
            <Wert className={verbinde('flex items-start gap-k-2 text-k-tinte', e.mono ? 'k-mono text-k-2' : 'k-text text-k-2 font-semibold')}>
              {e.zeichen ? (
                <span aria-hidden="true" className="flex h-lh shrink-0 items-center">
                  <Icon name={e.zeichen} groesse={16} />
                </span>
              ) : null}
              <span className={UMBRUCH}>{e.wert}</span>
            </Wert>
          </Zelle>
        ))}
      </Liste>
    </div>
  );
}

/** Schriftfeld der Fachseiten (E-027): Kennzeile, Kammer, Bewertung – alles aus vorhandenem Wortlaut und den Daten. */
export function SchriftfeldBetrieb({ className }: { className?: string }) {
  const { authority, owner } = COMPANY_DATA;
  const google = RATING_SUMMARY.google;
  return (
    <Schriftfeld
      className={className}
      titel={`Handwerkskammer-eingetragener Fachbetrieb ${owner.fullName}`}
      eintraege={[
        { kopf: 'Kammer', wert: authority.name },
        { zeichen: 'stern-voll', wert: `${google.displayRating} (${google.count} Bewertungen)`, mono: true },
      ]}
    />
  );
}
