// Einzugsband (KERN K-007 einzugsband): das Einzugsgebiet als Fugenband in drei Zonen (≤ 10 / ≤ 25 / ≤ 50 km,
// Breiten 3 : 3 : 4 ab 42 rem Breite des Platzes (K-007: 2 : 3 : 5 – dort wurden Ortsnamen der Zone ≤ 10 km gekürzt,
// E3-NACH-05; nach der Breite des Platzes statt des Bildschirms, damit bei großer Systemschrift die Zonen untereinander
// stehen und Ortsnamen nicht mitten im Wort brechen, Tor E3),
// am linken Rand das rote Lot des Firmensitzes Aßlar; Entfernungen ab Aßlar (E3-ORCH-03). Je Zone die Orte – als Linkliste die
// Hauptform; das Band ordnet nur (kein Maßstab: die Entfernungen der Konfiguration sind gerundete Angaben).
// `kompakt`: ruhige Vorschau ohne Links und ohne Bewegung (z. B. im Kartenplatzhalter vor der Einwilligung).
// Sonst legt sich das Band beim Laden Zone für Zone frei (CSS ab dem ersten Bild, ohne Skript; bewegung.css, E4-NACH-02);
// reduziert, im Druck und nach dem Notaus steht es fertig.
// Serverkomponente.
import Link from 'next/link';
import clsx from 'clsx';
import Fugenkreuz from './Fugenkreuz';
import { etikettKlassen } from './stile';
import { CITIES } from '@/config/cities';
import { CITY_HUB_DATA } from '@/lib/maps/getMapEmbedUrl';
import { gruppiereNachZone, mitEntfernungAbSitz } from '@/lib/einzugszonen';

const BREITE: Record<string, string> = { nah: '@2xl:col-span-3', mittel: '@2xl:col-span-3', weit: '@2xl:col-span-4' };

// Entfernung ab dem Firmensitz (wie die Ortsliste der Karte): der Sitz selbst heißt „Firmensitz“ (Bestandswortlaut)
const entfernung = (km: number) => (km === 0 ? 'Firmensitz' : `ca. ${km} km`);

export interface EinzugsbandProps {
  /** Slug der aktuellen Stadtseite: der Ort bekommt das Fugenkreuz und aria-current */
  aktuell?: string;
  kompakt?: boolean;
  /** stapel: Zonen untereinander, auch ab md (schmale Randspalte, Planblatt des Einstiegs; E4-NACH-01) */
  form?: 'band' | 'stapel';
  className?: string;
}

export default function Einzugsband({ aktuell, kompakt = false, form = 'band', className }: EinzugsbandProps) {
  const stapel = form === 'stapel';
  const gruppen = gruppiereNachZone(mitEntfernungAbSitz(CITIES, CITY_HUB_DATA));
  return (
    <div className={clsx('einzugsband relative @container', className)} data-motion={kompakt ? undefined : 'einzugsband'}>
      <p className={clsx(etikettKlassen, kompakt ? 'mb-1' : 'mb-4')}>
        <Fugenkreuz className="size-3 text-laser" />
        <span className="text-tinte">Firmensitz Aßlar</span>
      </p>
      {/* Lot des Firmensitzes: rot nur, wo es der einzige rote Blickfang ist; im Planblatt neben der Laserachse des
          Einstiegs in Tinte (ein Rot je Bildschirm, E3-SICHT-ERZ Befund 26) – die Firmensitz-Marke bleibt rot */}
      <ol className={clsx('grid grid-cols-1 border-l-2', stapel ? 'border-tinte' : 'border-laser @2xl:grid-cols-10')}>
        {gruppen.map(({ zone, orte }) => (
          <li key={zone.id} className={clsx('einzugsband-zone relative border-b border-r border-fuge bg-fliese', !stapel && BREITE[zone.id])}>
            {/* Kante der Zone: zieht sich beim Laden von links auf, Zone für Zone (bewegung.css); der Text steht ab dem ersten
                Bild (E3-SICHT-2-ERZ Befund 18 – vorher deckte eine Fläche die Orte bis zu 1,2 s ab) */}
            <span className="einzugsband-kante absolute inset-x-0 top-0 h-px bg-tinte" aria-hidden="true" />
            <div className={kompakt ? 'px-3 pt-1 pb-px' : 'p-4 lg:p-6'}>
              <p className={etikettKlassen}>
                <span className="text-tinte">{zone.etikett}</span>
              </p>
              <ul className={clsx('flex flex-col', !kompakt && 'mt-4', stapel && 'sm:grid sm:grid-cols-2 sm:gap-x-6')}>
                {orte.map((o) => {
                  const ist = o.slug === aktuell;
                  const inhalt = (
                    <>
                      {/* Das Fugenkreuz heißt nur „Firmensitz“ (wie in der Kopfzeile); die aktuelle Stadt steht fett mit „Sie sind
                          hier“. Die übrigen Orte sind als Links unterstrichen, auch ohne Maus (Browserprüfung E4-W1, Runde 2) */}
                      <span className="flex min-w-0 flex-wrap items-center gap-x-2">
                        {o.distanceKm === 0 && <Fugenkreuz className="size-3 text-laser" />}
                        <span
                          className={clsx(
                            'min-w-0 wrap-break-word',
                            ist ? 'font-semibold' : !kompakt && 'underline decoration-fuge decoration-1 underline-offset-4 group-hover:decoration-tinte',
                          )}
                        >
                          {o.name}
                        </span>
                        {ist && !kompakt && <span className="font-mono text-fs-1 text-tinte-2">Sie sind hier</span>}
                      </span>
                      <span className="ml-auto shrink-0 font-mono text-fs-1 text-tinte-2 @max-3xs:ml-0">{entfernung(o.distanceKm)}</span>
                    </>
                  );
                  // bei großer Schrift steht die Entfernung in jeder Zeile unter dem Ort, nicht je nach Namenslänge mal daneben
                  // (wie in der Ortsliste der Einsatzkarte, Browserprüfung E4-W1, Runde 3)
                  return (
                    <li key={o.slug} className={clsx(!kompakt && 'border-t border-fuge first:border-t-0', stapel && !kompakt && 'sm:nth-2:border-t-0')}>
                      {kompakt ? (
                        <span className="flex flex-wrap items-center justify-between gap-x-3 font-text text-fs-1 text-tinte @max-3xs:flex-col @max-3xs:items-start">{inhalt}</span>
                      ) : (
                        <Link
                          href={`/standorte/${o.slug}`}
                          aria-current={ist ? 'page' : undefined}
                          className="group flex min-h-11 flex-wrap items-center justify-between gap-x-3 py-2 font-text text-fs-2 text-tinte @max-3xs:flex-col @max-3xs:items-start"
                        >
                          {inhalt}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
