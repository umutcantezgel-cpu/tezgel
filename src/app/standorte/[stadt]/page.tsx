import type { Metadata } from 'next';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { CITIES, type CityData } from '@/config/cities';
import { SERVICES } from '@/config/services';
import { COMPANY_DATA } from '@/config/company';
import { notFound } from 'next/navigation';
import { buildGraph, buildCityLocalBusinessNode, buildBreadcrumbNode, buildWebPageNode, SITE_URL } from '@/lib/schema';
import JsonLd from '@/components/seo/JsonLd';
import { MapPin, Phone, ArrowRight, ShieldCheck, Sparkles, Award, Droplets, Sun } from 'lucide-react';
import QualityPromise from '@/components/sections/QualityPromise';

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

  const path = `/standorte/${city.slug}`;
  const title = `Fliesenverlegung & Badsanierung in ${city.name}`;
  const description = `Fliesenleger-Meisterbetrieb für ${city.name}: Badsanierung, Walk-In-Duschen, XXL-Großformate, Terrassen & DIN 18534 Abdichtung. ${distanceSentence(city)} Kostenfreies Vor-Ort-Aufmaß.`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        'de': path,
        'x-default': path,
      },
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: 'Fliesenverlegung Tezgel',
      locale: 'de_DE',
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
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

  const cityGraph = buildGraph([
    buildWebPageNode({
      url: pageUrl,
      name: `Fliesenverlegung & Badsanierung in ${city.name} | Fliesenverlegung Tezgel`,
      description: `Meisterbetrieb für Fliesenverlegung, Badsanierung und DIN 18534 Verbundabdichtung in ${city.name}. Kostenfreies Vor-Ort-Aufmaß & Festpreisangebot.`,
      breadcrumbItems: breadcrumbs,
    }),
    buildBreadcrumbNode(breadcrumbs, pageUrl),
    buildCityLocalBusinessNode({
      cityName: city.name,
      citySlug: city.slug,
      distanceKm: city.distanceKm,
      description: `Meisterbetrieb für Fliesen-, Platten- und Mosaikverlegung, Badsanierung und DIN 18534 Verbundabdichtung in ${city.name}.`,
    }),
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
    { value: authority.shortName, label: 'Eingetragener Meisterbetrieb', icon: Award },
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
      <JsonLd schema={cityGraph} />

      {/* Ambient Glow */}
      <div className="ambient-glow-sky -top-20 -left-20" />
      <div className="ambient-glow-mint top-96 -right-20" />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10">
        <div className="ceramic-hero rounded-[3rem] p-8 sm:p-14 text-center space-y-5 relative overflow-hidden">
          <span className="eyebrow">
            <MapPin className="w-3.5 h-3.5" />
            <span>
              {city.region} &middot; {distanceLabel(city)}
            </span>
          </span>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-tight">
            Fliesenverlegung &amp; Badsanierung in{' '}
            <span className="text-ceramic-gradient">{city.name}</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
            {COMPANY_DATA.legalName} – Ihr Meisterbetrieb für Badsanierung, fugenarme Großformate, Wohnbereiche,
            Balkone &amp; Terrassen sowie DIN 18534 Verbundabdichtung in {city.name} und Umgebung.{' '}
            {distanceSentence(city)}
          </p>

          <div className="flex flex-wrap gap-3.5 justify-center pt-2">
            <Link href="/kontakt" className="btn-primary px-7 py-3.5 text-xs">
              Aufmaß in {city.name} anfragen
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a href={`tel:${contact.phoneLink}`} className="btn-ghost px-7 py-3.5 text-xs">
              <Phone className="w-4 h-4 text-emerald-700" />
              {contact.phone}
            </a>
          </div>
        </div>
      </div>

      {/* ── About this city - Double Bezel Console ───────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="glass-bezel-outer shadow-2xl max-w-5xl mx-auto">
          <div className="glass-bezel-inner p-8 sm:p-12 space-y-8">
            <div>
              <span className="eyebrow mb-3">Regionaler Meister-Service</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Ihr Fliesen-Meisterbetrieb für {city.name}
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {city.description}
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {stats.map(({ value, label, icon: Icon }) => (
                <li
                  key={label}
                  className="rounded-[2rem] bg-white border border-slate-200 p-6 text-center flex flex-col items-center gap-1"
                >
                  <Icon className="w-5 h-5 text-emerald-600 mb-2" aria-hidden="true" />
                  <span className="font-display text-2xl font-black text-slate-900 tabular-nums">{value}</span>
                  <span className="text-xs text-slate-600 font-semibold">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Services in this city ────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10" aria-labelledby="stadt-leistungen">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="eyebrow eyebrow-sky mb-4">Meister-Fachgewerke</span>
          <h2 id="stadt-leistungen" className="text-2xl sm:text-3xl font-black text-slate-900">
            Unsere Leistungen in {city.name}
          </h2>
          <p className="text-slate-700 text-sm sm:text-base mt-2">
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
                  className="group glass-surface rounded-3xl p-6 h-full flex flex-col justify-between hover:-translate-y-0.5 hover:border-emerald-500/80 hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.14)] transition-all duration-300"
                >
                  <div>
                    <span className="icon-chip w-11 h-11 mb-4">
                      <Icon className="w-5 h-5" />
                    </span>
                    <h3 className="text-base font-black text-slate-900 mb-2 group-hover:text-emerald-800 transition-colors">
                      {srv.name}
                    </h3>
                    <p className="text-sm text-slate-700 leading-relaxed">{srv.shortDescription}</p>
                  </div>
                  <span className="mt-5 pt-4 border-t border-slate-200 text-sm font-bold text-emerald-800 flex items-center gap-1.5">
                    In {city.name}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ── Nearby Cities ────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10" aria-labelledby="weitere-orte">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 id="weitere-orte" className="text-2xl sm:text-3xl font-black text-slate-900">
            Weitere Einsatzgebiete in der Region
          </h2>
          <p className="text-slate-700 text-sm sm:text-base mt-2">
            Wir verlegen Fliesen in Städten und Gemeinden im Lahn-Dill-Kreis, im Landkreis Gießen und in ganz Mittelhessen.
          </p>
        </div>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {nearbyCities.map((nearbyCity) => (
            <li key={nearbyCity.slug}>
              <Link
                href={`/standorte/${nearbyCity.slug}`}
                className="group glass-surface p-6 rounded-[2rem] h-full block hover:-translate-y-0.5 hover:border-emerald-500/80 hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.14)] transition-all duration-300"
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <h3 className="text-base font-black text-slate-900 group-hover:text-emerald-800 transition-colors">
                    {nearbyCity.name}
                  </h3>
                  <span className="text-[11px] text-slate-700 bg-white px-3 py-1 rounded-full font-bold border border-slate-200 whitespace-nowrap tabular-nums">
                    {distanceLabel(nearbyCity)}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mb-3 font-medium">{nearbyCity.region}</p>
                <span className="text-xs text-emerald-800 font-black flex items-center gap-1">
                  <span>Details ansehen</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <Link href="/standorte" className="btn-ghost px-7 py-3.5 text-xs">
            Alle Standorte ansehen
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <QualityPromise />
    </div>
  );
}
