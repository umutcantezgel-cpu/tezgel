// Startseite · Servicegebiet (E020-F-5, KERN v2): „In ganz Mittelhessen schnell auf Ihrer Baustelle“, Anker #servicegebiet.
// Struktur (Vorbild: Kern-Startseite, Abschnitt 12): Ortsliste links mit allen 13 Orten und der Entfernung ab Aßlar,
// je Ort ein Link auf die Standortseite; daneben die Kartenfläche (erst nach Einwilligung), darunter das Kurzprofil des
// Firmensitzes. Die Liste ist so hoch wie die Karte (440 px, siehe `KARTE_HOEHE_NEBEN_LISTE`).
// Karte und Einwilligung sind die bestehenden Bausteine aus `@/components/maps/ServiceMapWrapper`; Städte aus
// `@/config/cities`, Entfernungen und Radius aus `@/lib/maps/getMapEmbedUrl`.
import Link from 'next/link';
import { CITIES } from '@/config/cities';
import { CITY_HUB_DATA, TEZGEL_SERVICE_RADIUS_KM } from '@/lib/maps/getMapEmbedUrl';
import { ServiceKartenflaeche, ServiceKurzprofil } from '@/components/maps/ServiceMapWrapper';
import Abschnitt from '@/components/kern/Abschnitt';
import { linkKlassen } from '@/components/kern/stile';

/**
 * Entfernung ab dem Firmensitz Aßlar (`CITY_HUB_DATA[slug].distanceKm`, nicht `CITIES.distanceKm`, das ab Wetzlar misst).
 * Der Sitz selbst heißt „Firmensitz“; ohne Wert keine Angabe. Außerhalb des Links, damit dessen Name der Stadtname bleibt.
 */
function Entfernung({ slug }: { slug: string }) {
  const km = CITY_HUB_DATA[slug]?.distanceKm;
  if (km === undefined) return null;
  return <span className="shrink-0 font-mono text-fs-1 text-tinte-2">{km === 0 ? 'Firmensitz' : `${km} km`}</span>;
}

/** Maßzeile für den Einsatzradius: Text in Mono, darunter die bemaßte Strecke (dekorativ). */
function Masslinie() {
  return (
    <div className="mb-6 flex flex-col gap-1">
      <span className="font-mono text-fs-1 text-tinte">Einsatzgebiet {TEZGEL_SERVICE_RADIUS_KM} km Mittelhessen</span>
      <span aria-hidden="true" className="flex h-3 items-center border-x border-tinte">
        <span className="block h-px w-full bg-tinte" />
      </span>
    </div>
  );
}

export default function Servicegebiet() {
  return (
    <Abschnitt
      id="servicegebiet"
      titelId="map-heading"
      etikett="Regionale Einsatzgebiete"
      titel="In ganz Mittelhessen schnell auf Ihrer Baustelle"
      einleitung={<p>Firmensitz in Aßlar – im 45-km-Einsatzradius für Wetzlar, Gießen, Marburg, Limburg, Braunfels, Herborn und ganz Hessen.</p>}
    >
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-4 gap-y-8 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-8">
          {/* Städteregister */}
          <div className="col-span-4 min-w-0 md:col-span-8 lg:col-span-5">
            <Masslinie />
            <ul aria-label="Orte im Einsatzgebiet" className="grid grid-cols-2 border-t border-l border-fuge md:grid-cols-4 lg:grid-cols-2">
              {CITIES.map((stadt) => (
                <li key={stadt.slug} className="flex items-center justify-between gap-2 border-r border-b border-fuge pr-2">
                  <Link
                    href={`/standorte/${stadt.slug}`}
                    className={`${linkKlassen} flex min-h-12 min-w-0 flex-1 items-center px-2 py-4 font-mono text-fs-1`}
                  >
                    {stadt.name}
                  </Link>
                  <Entfernung slug={stadt.slug} />
                </li>
              ))}
            </ul>
          </div>

          {/* Planfläche: Einwilligungs-Tor, danach die Karte */}
          <div className="col-span-4 min-w-0 md:col-span-8 lg:col-span-7">
            <ServiceKartenflaeche />
          </div>
        </div>

        {/* Kurzprofil des Firmensitzes */}
        <ServiceKurzprofil selectedSlug="asslar" />
      </div>
    </Abschnitt>
  );
}
