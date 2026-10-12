import type { Metadata } from 'next';
import Link from 'next/link';
import { CITIES, type CityData } from '@/config/cities';
import { SERVICES } from '@/config/services';
import { COMPANY_DATA } from '@/config/company';
import { notFound } from 'next/navigation';
import { buildGraph, buildCityLocalBusinessNode, buildBreadcrumbNode, buildWebPageNode, SITE_URL } from '@/lib/schema';
import { findCityConfig, getCityLandingPageSchema } from '@/lib/schemaPyramid';
import { createMetadata } from '@/lib/metadata';
import JsonLd from '@/components/seo/JsonLd';
import Icon from '@/components/icons/Icon';
import Einstieg from '@/components/kern/Einstieg';
import Abschnitt from '@/components/kern/Abschnitt';
import Leitachse from '@/components/kern/Leitachse';
import { Feld, Feldraster } from '@/components/kern/Feldraster';
import Knopf from '@/components/kern/Knopf';
import Planblatt, { planfelder } from '@/components/kern/Planblatt';
import QualityPromise from '@/components/sections/QualityPromise';
import RouteVisualization from '@/components/locations/RouteVisualization';
import LocationContact from '@/components/locations/LocationContact';
import LocalDominanceMap from '@/components/maps/LocalDominanceMap';
import FinalCTA from '@/components/ui/FinalCTA';
import Einzugsband from '@/components/kern/Einzugsband';

// Standortseite (E3-BAU-05, KERN v2): Erzählansicht nach dem Muster der Standorte-Übersicht (E3-BAU-04) und von
// /leistungen/[id]. Einstieg mit Laserachse, H1 links, Vorspann und Knöpfe; rechts das Planblatt mit dem Einzugsband. Danach
// die Leitachse über die Abschnitte: Kennzahlen, Anfahrt, Einsatzgebiet mit Karte, Leistungen vor Ort als Felder, Orte
// der Region, regionaler Kontakt und Qualitätsversprechen. Der Abschluss steht außerhalb der Leitachse. Wortlaut,
// Überschriften, Links, IDs und Lesefolge wie im Bestand. Großer Moment: das Einzugsband (E3-ORCH-03) im Planblatt des
// Einstiegs (E4-NACH-01), die eigene Stadt mit Fugenkreuz.

// Stadtfeld: das ganze Feld ist der Link (Fuge statt Karte); der Name unterstreicht sich bei feinem Zeiger
const STADT_LINK = 'group flex flex-1 flex-col justify-between after:absolute after:inset-0';
const STADT_NAME =
  'font-anzeige text-fs-4 font-semibold text-tinte decoration-1 underline-offset-4 decoration-tinte pointer-fine:group-hover:underline group-active:underline';

function isHeadquartersCity(city: CityData) {
  return city.name === COMPANY_DATA.headquarters.city;
}

/** Short distance label – CITIES distances are measured from Wetzlar city centre. */
function distanceLabel(city: CityData) {
  if (isHeadquartersCity(city)) return 'Unser Firmensitz';
  if (city.distanceKm === 0) return 'Direkt neben unserem Firmensitz';
  return `ca. ${city.distanceKm} km ab Wetzlar`;
}

/** Full sentence about the location of the city relative to our head office. */
function distanceSentence(city: CityData) {
  const { headquarters } = COMPANY_DATA;
  if (isHeadquartersCity(city)) return `Unser Firmensitz liegt in der ${headquarters.street} in ${headquarters.city}.`;
  if (city.distanceKm === 0) return `Direkt neben unserem Firmensitz in ${headquarters.city}.`;
  return `Ca. ${city.distanceKm} km ab Wetzlar – betreut von unserem Firmensitz in ${headquarters.city}.`;
}

export function generateStaticParams() {
  return CITIES.map((city) => ({ stadt: city.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ stadt: string }>;
}): Promise<Metadata> {
  const { stadt } = await params;
  const city = CITIES.find((c) => c.slug === stadt);
  if (!city) return {};

  const title =
    city.slug === 'bad-nauheim'
      ? 'Fliesenleger in Bad Nauheim | Badsanierung Tezgel'
      : `Fliesenleger & Bad in ${city.name} | Tezgel Fachbetrieb`;
  const description = `Ihr Fliesenleger in ${city.name}: Badsanierung, XXL-Fliesen & DIN 18534 Abdichtung. Fachbetrieb Tezgel – Jetzt Vor-Ort-Aufmaß & Festpreisangebot anfragen!`;

  return createMetadata({
    title,
    description,
    path: `/standorte/${stadt}`,
  });
}

function getNearbyCities(currentSlug: string, count: number = 5) {
  const current = CITIES.find((c) => c.slug === currentSlug);
  if (!current) return [];

  return CITIES
    .filter((c) => c.slug !== currentSlug)
    .sort((a, b) => {
      const distA = Math.abs(a.distanceKm - current.distanceKm);
      const distB = Math.abs(b.distanceKm - current.distanceKm);
      if (distA === distB) return a.distanceKm - b.distanceKm;
      return distA - distB;
    })
    .slice(0, count);
}

export default async function StandortPage({
  params,
}: {
  params: Promise<{ stadt: string }>;
}) {
  const { stadt } = await params;
  const city = CITIES.find((c) => c.slug === stadt);
  if (!city) notFound();

  const nearbyCities = getNearbyCities(city.slug, 6);
  const { contact, authority } = COMPANY_DATA;

  const pageUrl = `${SITE_URL}/standorte/${city.slug}`;
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Standorte', path: '/standorte' },
    { name: city.name, path: pageUrl },
  ];

  const cityConfig = findCityConfig(city.slug);
  const cityTierNodes = cityConfig
    ? getCityLandingPageSchema(cityConfig)['@graph']
    : [
        buildCityLocalBusinessNode({
          cityName: city.name,
          citySlug: city.slug,
          distanceKm: city.distanceKm,
          description: `Fachbetrieb für Fliesen-, Platten- und Mosaikverlegung, Badsanierung und DIN 18534 Verbundabdichtung in ${city.name}. Kostenfreies Vor-Ort-Aufmaß & Festpreisangebot.`,
        }),
      ];

  const cityGraph = buildGraph([
    buildWebPageNode({
      url: pageUrl,
      name: `Fliesenverlegung & Badsanierung in ${city.name} | Fliesenverlegung Tezgel`,
      description: `Fachbetrieb für Fliesenverlegung, Badsanierung und DIN 18534 Verbundabdichtung in ${city.name}. Kostenfreies Vor-Ort-Aufmaß & Festpreisangebot.`,
      breadcrumbItems: breadcrumbs,
    }),
    buildBreadcrumbNode(breadcrumbs, pageUrl),
    ...cityTierNodes,
  ]);

  // Kennzahlen mit dem Wert vor dem Etikett: die Lesefolge des Bestands bleibt erhalten (das Kennwerte-Raster stellt das Etikett voran)
  const kennzahlen = [
    {
      wert: isHeadquartersCity(city) ? city.name : city.distanceKm === 0 ? 'Nachbarstadt' : `ca. ${city.distanceKm} km`,
      etikett: isHeadquartersCity(city)
        ? 'Unser Firmensitz'
        : city.distanceKm === 0
          ? `Direkt neben unserem Firmensitz in ${COMPANY_DATA.headquarters.city}`
          : 'Entfernung ab Wetzlar',
    },
    { wert: 'DIN 18534', etikett: 'Normgerechte Verbundabdichtung' },
    { wert: authority.shortName, etikett: 'Eingetragener Fachbetrieb' },
  ];

  return (
    <>
      <JsonLd schema={cityGraph} />

      {/* 1. EINSTIEG: Etikett, H1 an der Laserachse, Vorspann, Knöpfe; rechts der Verlegeplan ohne Achse */}
      <Einstieg
        art="erzaehl"
        etikett={<>{city.region} &middot; {distanceLabel(city)}</>}
        titel={<>Fliesenverlegung &amp; Badsanierung in {city.name}</>}
        vorspann={
          <p>
            Fliesenverlegung &amp; Badsanierung in {city.name}: {COMPANY_DATA.legalName} – Ihr Fachbetrieb für moderne Bäder,
            fugenarme Großformate, Wohnbereiche, Balkone &amp; Terrassen sowie DIN 18534 Verbundabdichtung in {city.name} und
            Umgebung.{' '}
            {distanceSentence(city)}
          </p>
        }
        aktionen={
          <>
            <Knopf href="/kontakt" icon="pfeil-rechts">
              Aufmaß in {city.name} anfragen
            </Knopf>
            <Knopf href={`tel:${contact.phoneLink}`} variante="neben" iconLinks="telefon">
              <span className="font-mono font-normal">{contact.phone}</span>
            </Knopf>
          </>
        }
        rand={
          // Planblatt (E4-NACH-01, E3-SICHT-ERZ Befund 6): das Einzugsband mit Fugenkreuz am eigenen Ort statt eines Badplans
          <Planblatt felder={planfelder(city.name)}>
            <Einzugsband aktuell={city.slug} form="stapel" />
          </Planblatt>
        }
      />

      <Leitachse>
        {/* 2. ÜBER DIE STADT: Etikett und H2 an der Achse, Vorspann, drei Kennzahlen im Feldraster */}
        <Abschnitt
          leitachse
          spaet
          etikett="Regionaler Fachservice"
          titel={<>Ihr Fliesen-Fachbetrieb für {city.name}</>}
          einleitung={<p>{city.description}</p>}
        >
          <ul className="grid grid-cols-1 gap-px border border-fuge bg-fuge md:grid-cols-3">
            {kennzahlen.map(({ wert, etikett }) => (
              <li key={etikett} className="flex flex-col gap-2 bg-fliese p-6 lg:p-8">
                <span className="font-anzeige text-fs-4 font-semibold tabular-nums text-tinte">{wert}</span>
                <span className="font-mono text-fs-1 text-tinte-2">{etikett}</span>
              </li>
            ))}
          </ul>
        </Abschnitt>

        {/* 3. ANFAHRT: Bestandsbaustein, unverändert eingebunden */}
        <RouteVisualization city={city} />

        {/* 4. EINSATZGEBIET: Titelzeile und Anfahrtshinweis, darunter die Karte des Einsatzgebiets (Bestandsbaustein) */}
        <Abschnitt
          aria-label={`Einsatzgebiet und Marktabdeckung ${city.name}`}
          leitachse
          spaet
          etikett="Regionale Marktabdeckung"
          einleitung={
            <>
              <p className="font-anzeige text-fs-4 font-semibold text-tinte">Einsatzgebiet {city.name} &amp; Mittelhessen</p>
              <p className="mt-2 text-fs-2 text-tinte-2">Feste Anfahrtsrouten ab Aßlar im gesamten Lahn-Dill-Kreis &amp; Umgebung.</p>
            </>
          }
        >
          <LocalDominanceMap
            centerCity={`${city.name} (${city.region})`}
            citySlug={city.slug}
            radiusKm={Math.max(25, city.distanceKm + 10)}
            topRankings={[
              `#1 Fachbetrieb in ${city.name} & Region`,
              '5,0★ Google-Bewertung (27 Rezensionen)',
              'Eingetragener HWK-Betrieb',
            ]}
          />
        </Abschnitt>

        {/* 5. LEISTUNGEN IN DER STADT: je Fachgewerk ein Feld, das ganze Feld ist der Link */}
        <Abschnitt
          titelId="stadt-leistungen"
          leitachse
          spaet
          etikett="Unsere Fachgewerke"
          titel={<>Unsere Leistungen in {city.name}</>}
          einleitung={<p>Vom Vor-Ort-Aufmaß bis zur fertigen Fuge – alle Fliesengewerke aus einer Hand.</p>}
        >
          <Feldraster spalten={4}>
            {SERVICES.map((srv) => (
              <Feld key={srv.id} className="relative">
                <Link
                  href={`/leistungen/${srv.id}/${city.slug}`}
                  aria-label={`${srv.name} in ${city.name} ansehen`}
                  className={STADT_LINK}
                >
                  <div>
                    <p className={STADT_NAME}>{srv.name}</p>
                    <p className="mt-3 max-w-mass font-text text-fs-2 text-tinte-2">{srv.shortDescription}</p>
                  </div>
                  <span className="mt-6 flex items-center justify-between gap-3 border-t border-fuge pt-4 font-text text-fs-2 font-semibold text-tinte">
                    <span>In {city.name}</span>
                    <Icon name="pfeil-rechts" groesse={5} />
                  </span>
                </Link>
              </Feld>
            ))}
          </Feldraster>
        </Abschnitt>

        {/* 6. WEITERE ORTE DER REGION: je Ort ein Feld mit Link */}
        <Abschnitt
          titelId="weitere-orte"
          leitachse
          spaet
          titel="Weitere Einsatzgebiete in der Region"
          einleitung={
            <p>
              Neben {city.name} betreuen wir auch die angrenzenden Gemeinden im {city.region} sowie im gesamten Lahn-Dill- und
              Gießener Umland.
            </p>
          }
        >
          <Feldraster spalten={3}>
            {nearbyCities.map((nearbyCity) => (
              <Feld key={nearbyCity.slug} className="relative">
                <Link href={`/standorte/${nearbyCity.slug}`} className={STADT_LINK}>
                  <div>
                    <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                      <p className={STADT_NAME}>{nearbyCity.name}</p>
                      <span className="font-mono text-fs-1 text-tinte-2 tabular-nums">{distanceLabel(nearbyCity)}</span>
                    </div>
                    <p className="font-mono text-fs-1 text-tinte-2">{nearbyCity.region}</p>
                  </div>
                  <span className="mt-6 flex items-center justify-between gap-3 border-t border-fuge pt-4 font-text text-fs-2 font-semibold text-tinte">
                    <span>Fliesenleger für {nearbyCity.name} ansehen</span>
                    <Icon name="pfeil-rechts" groesse={5} />
                  </span>
                </Link>
              </Feld>
            ))}
          </Feldraster>
          <div className="mt-12">
            <Knopf href="/standorte" variante="neben" icon="pfeil-rechts">
              Alle Standorte ansehen
            </Knopf>
          </div>
        </Abschnitt>

        {/* 7. REGIONALER KONTAKT: Bestandsbaustein, unverändert eingebunden (Hintergrundklasse entfällt wie in E3-BAU-04) */}
        <LocationContact cityName={city.name} />

        {/* 8. QUALITÄT: Bestandsbaustein (Merkliste), unverändert eingebunden */}
        <QualityPromise />
      </Leitachse>

      {/* 9. ABSCHLUSS: Bestandsbaustein, unverändert eingebunden, außerhalb der Leitachse */}
      <FinalCTA
        headline={`Ihr Fliesenleger für ${city.name}: Jetzt kostenfreies Vor-Ort-Aufmaß vereinbaren.`}
        subtitle={`Schnelle Anfahrt nach ${city.name} • Festpreisangebot • HWK-Fachbetrieb`}
        buttonText={`Jetzt Aufmaß in ${city.name} anfragen`}
        serviceContext={`Einsatzgebiet ${city.name}`}
        showQuickForm={true}
        quickFormSource={`standort-${city.slug}`}
      />
    </>
  );
}
