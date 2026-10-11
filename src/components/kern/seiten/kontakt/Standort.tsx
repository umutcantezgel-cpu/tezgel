// Standort & Anfahrt auf `/kontakt` (P4-08f, KERN v1.2 K-002 Aufgabe 4, K-003, E-021): Kern-Fassung des Abschnitts
// `#standort-anfahrt` mit `@/components/maps/ContactPremiumMap`.
// Struktur: Kopf geteilt (Etikett und h2 Sp. 1–7, Satz Sp. 8–12), darunter ein Feldraster:
//   links (Sp. 1–5)  Feldkopf „Mittelhessen vor Ort“ · Städteregister (Links zu den Standortseiten, Entfernung in Mono) ·
//                    Firmensitz mit Fahrzeit, Satz, „Route“ und „Anrufen“
//   rechts (Sp. 6–12) Planfläche mit der Karte erst nach Einwilligung (F-12, `karte` von der Seite)
// Nach E-021 (Servicegebiet auf `/`): Register statt Stadtwahl auf der Karte. Jede Stadt ist ohne Karte und ohne JavaScript
// erreichbar; Suchfeld und Entfernungsfilter des Bestands entfallen (MIKROTEXTE-Vorschläge in der Rückgabe), ebenso die
// Kamerafahrt der Google-Karte. Der Firmensitz-Kasten zeigt fest Aßlar – die Voreinstellung des Bestands.
// Entfernungen und Wortlaut wie im Bestand (`CITIES.distanceKm`, „Firmensitz“ bei 0); die Korrektur „ab Aßlar“ wie auf `/`
// (P3-12b) ist als Klasse-4-Zeile vorgeschlagen und hier noch nicht umgesetzt (Vorschau zeigt den Bestandswortlaut).
// Server-Komponente.
import type { ReactNode } from 'react';
import { CITIES } from '@/config/cities';
import { COMPANY_DATA } from '@/config/company';
import { siteConfig } from '@/lib/config';
import { CITY_HUB_DATA, getDirectionsUrl } from '@/lib/maps/getMapEmbedUrl';
import { Etikett, Feldraster, Knopf, Rasterfeld, Textlink, verbinde } from '@/components/kern/basis';
import Icon from '@/components/kern/icons/Icon';
import { UMBRUCH, stufeNachWort } from '@/components/kern/vorlagen/teile';

const TITEL = 'Unser Fachbetrieb & Einsatzgebiet Mittelhessen';
const FIRMENSITZ = CITY_HUB_DATA.asslar;

/** Entfernungsangabe wie im Bestand (ContactPremiumMap): 0 = „Firmensitz“, sonst „ca. … km“ aus `CITIES`. */
function entfernung(km: number): string {
  return km === 0 ? 'Firmensitz' : `ca. ${km} km`;
}

export default function Standort({ karte }: { karte: ReactNode }) {
  const { contact } = COMPANY_DATA;
  const route = getDirectionsUrl(siteConfig.company.fullAddress);
  return (
    <section id="standort-anfahrt" aria-labelledby="standort-anfahrt-heading" className="bg-k-kalk py-k-7 lg:py-k-8">
      <div className="mx-auto max-w-(--k-seite) px-(--k-rand)">
        <header className="grid grid-cols-1 gap-k-4 lg:grid-cols-12 lg:items-end lg:gap-0">
          <div className="min-w-0 lg:col-span-7 lg:pr-k-7">
            <Etikett kreuz>Interaktive Karte &amp; Standorte</Etikett>
            <h2 id="standort-anfahrt-heading" className={verbinde('mt-k-4 k-anzeige text-k-tinte', stufeNachWort(TITEL, 'abschnitt', 'text-k-6'), UMBRUCH)}>
              {TITEL}
            </h2>
          </div>
          <p className="min-w-0 k-text text-k-3 text-k-tinte-2 lg:col-span-5">
            Zentrale in der Hohwardstraße 14, 35614 Aßlar – wählen Sie Ihre Stadt für Fahrtzeiten und Infos.
          </p>
        </header>

        <Feldraster className="mt-k-6">
          <Rasterfeld breite={{ mobil: 4, tablett: 8, desktop: 5 }} innen="keiner" flaeche="fliese" className="@container flex flex-col">
            <div className="p-k-5">
              <Etikett kreuz>Standort &amp; Einsatzradius</Etikett>
              <h3 id="k-kontakt-orte" className={verbinde('mt-k-3 k-anzeige text-k-5 text-k-tinte', UMBRUCH)}>
                Mittelhessen vor Ort
              </h3>
              <p className="mt-k-2 k-text text-k-2 text-k-tinte-2">Firmensitz Aßlar – täglicher Einsatz in Wetzlar, Gießen &amp; Lahn-Dill.</p>
            </div>

            {/* Städteregister: eine Zeile je Stadt, Name als Link, Entfernung daneben in Mono */}
            <ul aria-labelledby="k-kontakt-orte" className="grid grid-cols-1 border-t border-k-fuge @sm:grid-cols-2">
              {CITIES.map((stadt) => (
                <li key={stadt.slug} className="flex min-w-0 items-center justify-between gap-k-3 border-b border-k-fuge px-k-5 @sm:odd:border-r">
                  <Textlink href={`/standorte/${stadt.slug}`} className={verbinde('flex min-h-k-7 min-w-0 items-center k-text text-k-2 font-semibold', UMBRUCH)}>
                    {stadt.name}
                  </Textlink>
                  <div className="shrink-0 k-mono text-k-1 text-k-tinte-2">{entfernung(stadt.distanceKm)}</div>
                </li>
              ))}
            </ul>

            {/* Firmensitz (Bestand: Kasten der gewählten Stadt, Voreinstellung Aßlar) */}
            <div className="mt-auto flex flex-col gap-k-3 p-k-5">
              <div className="flex flex-wrap items-center justify-between gap-k-2">
                <span className="k-text text-k-3 font-semibold text-k-tinte">{FIRMENSITZ.name}</span>
                <span className="flex items-center gap-k-2 k-mono text-k-1 text-k-tinte">
                  <Icon name="uhr" groesse={16} />
                  <span>{FIRMENSITZ.driveTimeText}</span>
                </span>
              </div>
              <p className="k-text text-k-2 text-k-tinte-2">{FIRMENSITZ.tagline}</p>
              <div className="flex flex-wrap gap-k-3">
                <Knopf
                  href={route}
                  target="_blank"
                  rel="noopener noreferrer"
                  art="neben"
                  groesse="klein"
                  vorne={<Icon name="ort" groesse={16} />}
                  hinten={<Icon name="extern" groesse={16} />}
                >
                  Route
                </Knopf>
                <Knopf
                  href={`tel:${contact.phoneLink}`}
                  aria-label={`Fliesenverlegung Tezgel anrufen: ${contact.phone}`}
                  art="neben"
                  groesse="klein"
                  vorne={<Icon name="telefon" groesse={16} />}
                >
                  Anrufen
                </Knopf>
              </div>
            </div>
          </Rasterfeld>

          {/* Planfläche: ab lg klebt die Karte unter dem Kopf, solange das längere Register daneben läuft */}
          <Rasterfeld breite={{ mobil: 4, tablett: 8, desktop: 7 }} innen="eng">
            <div className="lg:sticky lg:top-(--k-kopf-hoehe)">{karte}</div>
          </Rasterfeld>
        </Feldraster>
      </div>
    </section>
  );
}
