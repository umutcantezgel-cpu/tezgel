// Startseite · Servicegebiet (P3-12, KERN v1.2): „In ganz Mittelhessen schnell auf Ihrer Baustelle“, Anker #servicegebiet.
// Struktur: Planfläche (Kreuzfuge, Zwei-Klick-Platzhalter P3-08, F-12) neben dem Städteregister in Mono-Spalten, darunter
// das Feld zum Firmensitz. Das Einsatzgebiet ist ohne Karte lesbar (Register mit Links, auch ohne JavaScript).
// Der 45-km-Radius erscheint als gezeichnete Maßlinie, weil der Text ihn nennt; Wert aus `TEZGEL_SERVICE_RADIUS_KM`.
// Karte: erst nach Marketing-Einwilligung; dann der Kartenrahmen des Bestands ohne API-Schlüssel – OpenStreetMap-Ansicht
// des Firmensitzes (`getOsmEmbedUrl`, Zoom 11, Titel „OpenStreetMap Ansicht Aßlar“). Kein Auftritt.
// Inhalt wörtlich aus dem Bestand (Abschnitt „8. INTERAKTIVE KARTE & SERVICEGEBIET“, `ServiceMapWrapper`,
// `InteractiveServiceMap` mit der Voreinstellung Aßlar), Städte aus `@/config/cities`, Kartendaten aus `@/lib/maps/*`.
import type { ReactNode } from 'react';
import { COMPANY_DATA } from '@/config/company';
import { CITIES } from '@/config/cities';
import {
  CITY_COORDINATES,
  CITY_HUB_DATA,
  TEZGEL_SERVICE_RADIUS_KM,
  getDirectionsUrl,
  getOsmEmbedUrl,
} from '@/lib/maps/getMapEmbedUrl';
import { Etikett, Feldraster, Fugenkreuz, Knopf, Rasterfeld, Textlink } from '@/components/kern/basis';
import Icon from '@/components/kern/icons/Icon';
import KarteImBlick from '@/components/kern/start/vertrauen/KarteImBlick';

const FIRMENSITZ = CITY_HUB_DATA.asslar;

/** Kartenrahmen nach Einwilligung (Bestand: InteractiveRadarCanvas → Straßenkarte, Firmensitz). */
function Strassenkarte() {
  const { lat, lng } = CITY_COORDINATES.asslar;
  return (
    <iframe
      title={`OpenStreetMap Ansicht ${FIRMENSITZ.name}`}
      src={getOsmEmbedUrl(lat, lng, 11)}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className="block border-0"
    />
  );
}

/**
 * Entfernung ab dem Firmensitz Aßlar (P3-12b): `CITY_HUB_DATA[slug].distanceKm`, nicht `CITIES.distanceKm` (misst ab
 * Wetzlar). Format wie im Bestand („5 km“), der Sitz selbst mit dem Bestandswortlaut „Firmensitz“ (InfoWindow).
 * Ohne Wert keine Angabe. Außerhalb des Links, damit dessen Name der Stadtname bleibt.
 */
function Entfernung({ slug }: { slug: string }) {
  const km = CITY_HUB_DATA[slug]?.distanceKm;
  if (km === undefined) return null;
  return <span className="shrink-0 k-mono text-k-1 text-k-tinte-2">{km === 0 ? 'Firmensitz' : `${km} km`}</span>;
}

/** Maßlinie für den Einsatzradius: Text in Mono, darunter die bemaßte Strecke (dekorativ). */
function Masslinie() {
  return (
    <div className="mt-k-4 flex flex-col gap-k-1">
      <span className="k-mono text-k-1 text-k-tinte">Einsatzgebiet {TEZGEL_SERVICE_RADIUS_KM} km Mittelhessen</span>
      <span aria-hidden="true" className="relative block h-k-3 border-x border-k-tinte">
        <span className="absolute inset-x-0 top-1/2 h-px bg-k-tinte" />
      </span>
    </div>
  );
}

/** Rahmen des Abschnitts; `karte` ist die Planfläche (live: Platzhalter mit Straßenkarte, Vorschau: ohne Kartenaufruf). */
export function ServicegebietRahmen({ karte }: { karte: ReactNode }) {
  const route = getDirectionsUrl(COMPANY_DATA.address.fullAddress);
  return (
    <section id="servicegebiet" aria-labelledby="map-heading" className="py-k-9 lg:py-k-10">
      <div className="mx-auto max-w-(--k-seite) px-(--k-rand)">
        <div className="max-w-(--k-mass)">
          <h2 id="map-heading" className="k-anzeige text-k-6 text-k-tinte">
            In ganz Mittelhessen schnell auf Ihrer Baustelle
          </h2>
          <p className="mt-k-5 k-text text-k-4 text-k-tinte-2">
            Firmensitz in Aßlar – im 45-km-Einsatzradius für Wetzlar, Gießen, Marburg, Limburg, Braunfels, Herborn und ganz Hessen.
          </p>
        </div>

        <Feldraster className="mt-k-8">
          {/* Planfläche */}
          <Rasterfeld breite={{ mobil: 4, tablett: 8, desktop: 8 }} innen="eng">
            {karte}
          </Rasterfeld>

          {/* Städteregister */}
          <Rasterfeld breite={{ mobil: 4, tablett: 8, desktop: 4 }} flaeche="fliese">
            <Etikett kreuz als="p" id="einsatzgebiete-titel" ton="tinte">
              Regionale Einsatzgebiete
            </Etikett>
            <Masslinie />
            <ul aria-labelledby="einsatzgebiete-titel" className="mt-k-5 grid grid-cols-2 border-t border-l border-k-fuge md:grid-cols-4 lg:grid-cols-2">
              {CITIES.map((stadt) => (
                <li key={stadt.slug} className="flex items-center justify-between gap-k-2 border-r border-b border-k-fuge pr-k-2">
                  <Textlink href={`/standorte/${stadt.slug}`} className="flex min-h-k-7 min-w-0 flex-1 items-center px-k-2 py-k-1 k-mono text-k-1">
                    {stadt.name}
                  </Textlink>
                  <Entfernung slug={stadt.slug} />
                </li>
              ))}
            </ul>
          </Rasterfeld>

          {/* Firmensitz (Bestand: Info-Feld der Karte, Voreinstellung Aßlar) */}
          <Rasterfeld breite={{ mobil: 4, tablett: 8, desktop: 12 }} className="grid grid-cols-1 gap-k-5 lg:grid-cols-12 lg:gap-0">
            <div className="lg:col-span-5 lg:pr-k-7">
              <div className="flex flex-wrap gap-k-2">
                <Etikett rahmen>Firmensitz &amp; Meister-Erfahrung</Etikett>
                <Etikett rahmen>{FIRMENSITZ.driveTimeText}</Etikett>
              </div>
              <h3 className="mt-k-4 k-anzeige text-k-5 text-k-tinte">Fliesenverlegung &amp; Badsanierung in {FIRMENSITZ.name}</h3>
              <p className="mt-k-3 max-w-(--k-mass) k-text text-k-3 text-k-tinte-2">{FIRMENSITZ.tagline}</p>
            </div>
            <ul className="flex flex-col gap-k-2 lg:col-span-4 lg:pr-k-6">
              {FIRMENSITZ.services.map((leistung) => (
                <li key={leistung} className="flex items-start gap-k-2 k-text text-k-2 text-k-tinte">
                  <span className="flex h-lh shrink-0 items-center text-k-strich">
                    <Fugenkreuz className="size-k-3" />
                  </span>
                  {leistung}
                </li>
              ))}
            </ul>
            <div className="flex flex-col items-start gap-k-4 lg:col-span-3">
              <Knopf art="neben" href="/kontakt#express-anfrage" hinten={<Icon name="pfeil" groesse={20} />}>
                Kostenloses Vor-Ort-Aufmaß
              </Knopf>
              <Textlink href={route} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-k-7 items-center gap-k-2 k-text text-k-2">
                <Icon name="ort" groesse={20} />
                Route in Google Maps
              </Textlink>
            </div>
          </Rasterfeld>
        </Feldraster>
      </div>
    </section>
  );
}

export default function Servicegebiet() {
  return (
    <ServicegebietRahmen
      karte={
        <KarteImBlick>
          <Strassenkarte />
        </KarteImBlick>
      }
    />
  );
}
