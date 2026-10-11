import type { Metadata } from 'next';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { CITIES, type CityData } from '@/config/cities';
import { SERVICES } from '@/config/services';
import { COMPANY_DATA } from '@/config/company';
import { notFound } from 'next/navigation';
import { buildGraph, buildCityLocalBusinessNode, buildBreadcrumbNode, buildWebPageNode, SITE_URL } from '@/lib/schema';
import { findCityConfig, getCityLandingPageSchema } from '@/lib/schemaPyramid';
import { createMetadata } from '@/lib/metadata';
import JsonLd from '@/components/seo/JsonLd';
import KernIcon from '@/components/icons/Icon';
import { Droplets, Sparkles, Sun, ShieldCheck, MapPin, Award } from '@/components/icons/ersatz';
type LucideIcon = import('react').ComponentType<{ className?: string; 'aria-label'?: string }>;
import QualityPromise from '@/components/sections/QualityPromise';
import RouteVisualization from '@/components/locations/RouteVisualization';
import LocationContact from '@/components/locations/LocationContact';
import LocalDominanceMap from '@/components/maps/LocalDominanceMap';
import FinalCTA from '@/components/ui/FinalCTA';

const SERVICE_ICONS: Record<string, LucideIcon> = {
  bad: Droplets,
  wohnen: Sparkles,
  aussen: Sun,
  untergrund: ShieldCheck,
};

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

  const stats = [
    {
      value: isHeadquartersCity(city) ? city.name : city.distanceKm === 0 ? 'Nachbarstadt' : `ca. ${city.distanceKm} km`,
      label: isHeadquartersCity(city)
        ? 'Unser Firmensitz'
        : city.distanceKm === 0
          ? `Direkt neben unserem Firmensitz in ${COMPANY_DATA.headquarters.city}`
          : 'Entfernung ab Wetzlar',
      icon: MapPin,
    },
    { value: 'DIN 18534', label: 'Normgerechte Verbundabdichtung', icon: ShieldCheck },
    { value: authority.shortName, label: 'Eingetragener Fachbetrieb', icon: Award },
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
      <JsonLd schema={cityGraph} />

      {/* Ambient Glow */}

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="max-w-seite mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10">
        <div className="border border-fuge bg-fliese p-8 sm:p-16 text-center space-y-6 relative overflow-hidden">
          <span className="inline-flex items-center gap-2 font-mono text-fs-1 text-tinte-2">
            <KernIcon name="ort" groesse={4} />
            <span>
              {city.region} &middot; {distanceLabel(city)}
            </span>
          </span>

          <h1 className="text-fs-7 text-tinte">
            Fliesenverlegung &amp; Badsanierung in{' '}
            <span>{city.name}</span>
          </h1>

          <p className="text-fs-3 text-tinte-2 max-w-mass mx-auto">
            Fliesenverlegung &amp; Badsanierung in {city.name}: {COMPANY_DATA.legalName} – Ihr Fachbetrieb für moderne Bäder, fugenarme Großformate, Wohnbereiche,
            Balkone &amp; Terrassen sowie DIN 18534 Verbundabdichtung in {city.name} und Umgebung.{' '}
            {distanceSentence(city)}
          </p>

          <div className="flex flex-wrap gap-4 justify-center pt-2">
            <Link href="/kontakt" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-none px-6 py-3 font-text text-fs-2 font-semibold no-underline transition-colors dauer-1 ease-setzen motion-safe:active:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 border border-tinte bg-tinte text-kalk hover:border-tinte-2 hover:bg-tinte-2">
              Aufmaß in {city.name} anfragen
              <KernIcon name="pfeil-rechts" groesse={4} />
            </Link>
            <a href={`tel:${contact.phoneLink}`} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-none px-6 py-3 font-text text-fs-2 font-semibold no-underline transition-colors dauer-1 ease-setzen motion-safe:active:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 border border-strich bg-fliese text-tinte hover:border-tinte">
              <KernIcon name="telefon" groesse={4} className="text-laser-tief" />
              {contact.phone}
            </a>
          </div>
        </div>
      </div>

      {/* ── About this city - Double Bezel Console ───────────────────────── */}
      <div className="max-w-seite mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="max-w-seite mx-auto">
          <div className="p-8 sm:p-12 space-y-8">
            <div>
              <span className="inline-flex items-center gap-2 font-mono text-fs-1 text-tinte-2 mb-3">Regionaler Fachservice</span>
              <h2 className="text-fs-6 text-tinte">
                Ihr Fliesen-Fachbetrieb für {city.name}
              </h2>
            </div>

            <p className="text-fs-3 text-tinte-2">
              {city.description}
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {stats.map(({ value, label, icon: Icon }) => (
                <li
                  key={label}
                  className="bg-fliese border border-fuge p-6 text-center flex flex-col items-center gap-1"
                >
                  <Icon className="w-5 h-5 text-laser-tief mb-2" aria-hidden="true" />
                  <span className="font-anzeige text-fs-5 font-semibold text-tinte tabular-nums">{value}</span>
                  <span className="text-fs-1 text-tinte-2 font-semibold">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Route Visualization from Aßlar to this city ────────────────────── */}
      <RouteVisualization city={city} />

      {/* ── Regional Dominance & Service Radius Radar ──────────────────── */}
      <section className="max-w-seite mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10" aria-label={`Einsatzgebiet und Marktabdeckung ${city.name}`}>
        <div className="max-w-seite mx-auto space-y-4">
          <div className="text-center sm:text-left">
            <span className="inline-flex items-center gap-2 font-mono text-fs-1 text-tinte-2 mb-2">Regionale Marktabdeckung</span>
            <p className="text-fs-5 font-semibold text-tinte">
              Einsatzgebiet {city.name} &amp; Mittelhessen
            </p>
            <p className="text-fs-2 text-tinte-2 mt-1">
              Feste Anfahrtsrouten ab Aßlar im gesamten Lahn-Dill-Kreis &amp; Umgebung.
            </p>
          </div>
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
        </div>
      </section>

      {/* ── Services in this city ────────────────────────────────────────── */}
      <section className="max-w-seite mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10" aria-labelledby="stadt-leistungen">
        <div className="text-center max-w-mass mx-auto mb-12">
          <span className="inline-flex items-center gap-2 font-mono text-fs-1 text-tinte-2 mb-4">Unsere Fachgewerke</span>
          <h2 id="stadt-leistungen" className="text-fs-6 text-tinte">
            Unsere Leistungen in {city.name}
          </h2>
          <p className="text-tinte-2 text-fs-3 mt-2">
            Vom Vor-Ort-Aufmaß bis zur fertigen Fuge – alle Fliesengewerke aus einer Hand.
          </p>
        </div>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((srv) => {
            const Icon = SERVICE_ICONS[srv.id] || Sparkles;
            return (
              <li key={srv.id}>
                <Link
                  href={`/leistungen/${srv.id}/${city.slug}`}
                  aria-label={`${srv.name} in ${city.name} ansehen`}
                  className="group border border-fuge bg-fliese p-6 h-full flex flex-col justify-between hover:border-strich transition-colors dauer-1"
                >
                  <div>
                    <p className="text-fs-3 font-semibold text-tinte mb-2 group-hover:text-laser-tief transition-colors">
                      {srv.name}
                    </p>
                    <p className="text-fs-2 text-tinte-2">{srv.shortDescription}</p>
                  </div>
                  <span className="mt-6 pt-4 border-t border-fuge text-fs-2 font-semibold text-laser-tief flex items-center gap-2">
                    In {city.name}
                    <KernIcon name="pfeil-rechts" groesse={4} />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ── Nearby Cities ────────────────────────────────────────────────── */}
      <section className="max-w-seite mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10" aria-labelledby="weitere-orte">
        <div className="text-center max-w-mass mx-auto mb-12">
          <h2 id="weitere-orte" className="text-fs-6 text-tinte">
            Weitere Einsatzgebiete in der Region
          </h2>
          <p className="text-tinte-2 text-fs-3 mt-2">
            Neben {city.name} betreuen wir auch die angrenzenden Gemeinden im {city.region} sowie im gesamten Lahn-Dill- und Gießener Umland.
          </p>
        </div>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {nearbyCities.map((nearbyCity) => (
            <li key={nearbyCity.slug}>
              <Link
                href={`/standorte/${nearbyCity.slug}`}
                className="group border border-fuge bg-fliese p-6 h-full block hover:border-strich transition-colors dauer-1"
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <p className="text-fs-3 font-semibold text-tinte group-hover:text-laser-tief transition-colors">
                    {nearbyCity.name}
                  </p>
                  <span className="text-fs-1 text-tinte-2 bg-fliese px-3 py-1 font-semibold border border-fuge whitespace-nowrap tabular-nums">
                    {distanceLabel(nearbyCity)}
                  </span>
                </div>
                <p className="text-fs-1 text-tinte-2 mb-3 font-medium">{nearbyCity.region}</p>
                <span className="text-fs-1 text-laser-tief font-semibold flex items-center gap-1">
                  <span>Fliesenleger für {nearbyCity.name} ansehen</span>
                  <KernIcon name="pfeil-rechts" groesse={4} />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12 text-center">
          <Link href="/standorte" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-none px-6 py-3 font-text text-fs-2 font-semibold no-underline transition-colors dauer-1 ease-setzen motion-safe:active:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 border border-strich bg-fliese text-tinte hover:border-tinte">
            Alle Standorte ansehen
            <KernIcon name="pfeil-rechts" groesse={4} />
          </Link>
        </div>
      </section>

      {/* Direct Contact Box for this City */}
      <LocationContact cityName={city.name} className="bg-kalk" />

      <QualityPromise />

      {/* Final Conversion Anchor for this City */}
      <FinalCTA
        headline={`Ihr Fliesenleger für ${city.name}: Jetzt kostenfreies Vor-Ort-Aufmaß vereinbaren.`}
        subtitle={`Schnelle Anfahrt nach ${city.name} • Festpreisangebot • HWK-Fachbetrieb`}
        buttonText={`Jetzt Aufmaß in ${city.name} anfragen`}
        serviceContext={`Einsatzgebiet ${city.name}`}
        showQuickForm={true}
        quickFormSource={`standort-${city.slug}`}
      />
    </div>
  );
}
