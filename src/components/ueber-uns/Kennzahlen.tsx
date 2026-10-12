// Über uns · Kennzahlen des Betriebs (KERN K-009 Kennwerte, K-003 „Maß statt Behauptung“): die vier Werte des Bestands
// als Beschreibungsliste an der Fuge – in der Randspalte des Einstiegs wie das Schriftfeld unten rechts auf einem Plan.
// Gleichwertig zu `@/components/kern/Kennwerte` (Etikett in Mono über dem Wert, Wert im Anzeigeschnitt), aber mit zwei
// Spalten ab sm: In der schmalen Randspalte trügen vier Spalten weder „(Handwerkskammer“ noch „Bis zu 12“.
// Ab lg sitzt das Feld unten in der Randspalte (bündig mit den Aktionen), darüber bleibt die H1 frei.
// Sterne rein dekorativ neben dem Wert (der Wert steht als Text), kein Hochzählen, kein Hover-Heben.
// Wortlaut und Reihenfolge wie `stats` im Bestand; Daten aus `@/config/company` und `@/config/reviews`.
import { COMPANY_DATA } from '@/config/company';
import { RATING_SUMMARY } from '@/config/reviews';
import Icon from '@/components/icons/Icon';

type Kennzahl = { wert: string; etikett: string; sterne?: boolean };

export default function Kennzahlen() {
  const { authority, headquarters, business } = COMPANY_DATA;
  const google = RATING_SUMMARY.google;

  const kennzahlen: Kennzahl[] = [
    { wert: String(business.establishmentYear), etikett: `Betriebsgründung in ${headquarters.city}` },
    { wert: 'HWK', etikett: `Eingetragener Fachbetrieb (${authority.name})` },
    { wert: 'Bis zu 12', etikett: 'Fachkräfte im Einsatz vor Ort' },
    { wert: google.displayRating, etikett: `${google.count} ${google.label}`, sterne: true },
  ];

  return (
    <div className="flex h-full flex-col justify-end">
      <dl className="grid grid-cols-1 gap-px border border-fuge bg-fuge sm:grid-cols-2">
        {kennzahlen.map((k) => (
          <div key={k.etikett} className="flex flex-col gap-2 bg-fliese p-4 lg:p-6">
            <dt className="font-mono text-fs-1 text-tinte-2">{k.etikett}</dt>
            <dd className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2 font-anzeige text-fs-5 font-semibold text-tinte">
              {k.wert}
              {k.sterne && (
                <span aria-hidden="true" className="flex gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Icon key={i} name="stern" groesse={4} />
                  ))}
                </span>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
