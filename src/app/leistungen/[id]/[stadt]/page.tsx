import type { Metadata } from 'next';
import Link from 'next/link';
import { CITIES, type CityData } from '@/config/cities';
import { SERVICES } from '@/config/services';
import { COMPANY_DATA, processSteps } from '@/config/company';
import { notFound } from 'next/navigation';
import { buildGraph, buildServiceNode, buildBreadcrumbNode, buildWebPageNode, SITE_URL } from '@/lib/schema';
import JsonLd from '@/components/seo/JsonLd';
import { MapPin, Phone, ArrowRight, ShieldCheck, CheckCircle2, Award } from 'lucide-react';
import QualityPromise from '@/components/sections/QualityPromise';

// ---------------------------------------------------------------------------
// Location helpers – CITIES distances are measured from Wetzlar city centre,
// our head office is in Aßlar (COMPANY_DATA.headquarters).
// ---------------------------------------------------------------------------
function isHeadquartersCity(city: CityData) {
  return city.name === COMPANY_DATA.headquarters.city;
}

function distanceLabel(city: CityData) {
  if (isHeadquartersCity(city)) return 'Unser Firmensitz';
  if (city.distanceKm === 0) return 'Direkt neben unserem Firmensitz';
  return `ca. ${city.distanceKm} km ab Wetzlar`;
}

function distanceSentence(city: CityData) {
  const { headquarters } = COMPANY_DATA;
  if (isHeadquartersCity(city)) return `Unser Firmensitz liegt in der ${headquarters.street} in ${headquarters.city}.`;
  if (city.distanceKm === 0) return `Direkt neben unserem Firmensitz in ${headquarters.city}.`;
  return `Ca. ${city.distanceKm} km ab Wetzlar – betreut von unserem Firmensitz in ${headquarters.city}.`;
}

// ---------------------------------------------------------------------------
// Static Params – generates a page for every service × city combination
// ---------------------------------------------------------------------------
export function generateStaticParams() {
  const params: { id: string; stadt: string }[] = [];
  for (const service of SERVICES) {
    for (const city of CITIES) {
      params.push({ id: service.id, stadt: city.slug });
    }
  }
  return params;
}

// ---------------------------------------------------------------------------
// Dynamic Metadata – unique title, description & OG tags per combination
// ---------------------------------------------------------------------------
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; stadt: string }>;
}): Promise<Metadata> {
  const { id, stadt } = await params;
  const service = SERVICES.find((s) => s.id === id);
  const city = CITIES.find((c) => c.slug === stadt);
  if (!service || !city) return {};

  const title = `${service.name} in ${city.name} – Fliesen-Meisterbetrieb`;
  const description = `${service.name} in ${city.name}: ${service.shortDescription}. ${distanceSentence(city)} Kostenfreies Vor-Ort-Aufmaß & verbindliches Festpreisangebot.`;

  const path = `/leistungen/${service.id}/${city.slug}`;

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

export default async function ServiceCityPage({
  params,
}: {
  params: Promise<{ id: string; stadt: string }>;
}) {
  const { id, stadt } = await params;
  const service = SERVICES.find((s) => s.id === id);
  const city = CITIES.find((c) => c.slug === stadt);
  if (!service || !city) notFound();

  const pageUrl = `${SITE_URL}/leistungen/${service.id}/${city.slug}`;
  const { contact, authority } = COMPANY_DATA;

  const subcategoryNames = (service.subcategories ?? [])
    .map((s) => s.name)
    .join(', ');
  const otherServices = SERVICES.filter((s) => s.id !== service.id);

  // ── JSON-LD: Service + Breadcrumbs @graph ─────────────────────────────
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Leistungen', path: '/leistungen' },
    { name: service.name, path: `/leistungen/${service.id}` },
    { name: city.name, path: pageUrl },
  ];

  const serviceCityGraph = buildGraph([
    buildWebPageNode({
      url: pageUrl,
      name: `${service.name} in ${city.name} | Fliesenverlegung Tezgel`,
      description: `${service.shortDescription} – fachgerecht ausgeführt in ${city.name} und Umgebung.`,
      breadcrumbItems: breadcrumbs,
    }),
    buildBreadcrumbNode(breadcrumbs, pageUrl),
    buildServiceNode({
      name: `${service.name} in ${city.name}`,
      serviceType: service.name,
      description: `${service.shortDescription} – fachgerecht ausgeführt in ${city.name} und Umgebung.`,
      url: pageUrl,
      areaServedCity: city.name,
      offers: (service.features || []).map((feat: string) => ({ name: feat })),
      image: service.heroImage ?? undefined,
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
      <JsonLd schema={serviceCityGraph} />

      {/* Ambient Glow */}
      <div className="ambient-glow-sky -top-20 -left-20" />
      <div className="ambient-glow-mint top-96 -right-20" />

      {/* ── Hero Section ─────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10">
        <div className="ceramic-hero rounded-[3rem] p-8 sm:p-14 text-center space-y-5 relative overflow-hidden">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="mb-2 text-xs text-slate-600 flex flex-wrap items-center justify-center gap-1.5 font-medium"
          >
            <Link href="/" className="hover:text-emerald-800 transition-colors">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              href="/leistungen"
              className="hover:text-emerald-800 transition-colors"
            >
              Leistungen
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              href={`/leistungen/${service.id}`}
              className="hover:text-emerald-800 transition-colors"
            >
              {service.name}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-slate-900 font-bold" aria-current="page">{city.name}</span>
          </nav>

          <span className="eyebrow">
            <MapPin className="w-3.5 h-3.5" />
            <span>
              {city.region} &middot; {distanceLabel(city)}
            </span>
          </span>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-tight">
            {service.name} in{' '}
            <span className="text-ceramic-gradient">{city.name}</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
            {COMPANY_DATA.legalName} ist Ihr Meisterbetrieb für {service.name} in{' '}
            {city.name} und im {city.region}. {service.shortDescription}.{' '}
            {distanceSentence(city)}
          </p>

          <div className="flex flex-wrap gap-3.5 justify-center pt-2">
            <Link href="/kontakt" className="btn-primary px-7 py-3.5 text-xs">
              Kostenloses Aufmaß in {city.name} anfragen
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a href={`tel:${contact.phoneLink}`} className="btn-ghost px-7 py-3.5 text-xs">
              <Phone className="w-4 h-4 text-emerald-700" />
              {contact.phone}
            </a>
          </div>
        </div>
      </div>

      {/* ── Rich Intro - Double Bezel Console ────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="glass-bezel-outer shadow-2xl max-w-5xl mx-auto">
          <div className="glass-bezel-inner p-8 sm:p-12 space-y-6">
            <div>
              <span className="eyebrow mb-3">
                <Award className="w-3.5 h-3.5" />
                Meisterbetrieb &middot; {authority.shortName}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Fachkompetenz &amp; Meisterqualität für {city.name}
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              Ob Neubau oder Sanierung im bewohnten Bestand: Als eingetragener Meisterbetrieb der {authority.name} übernehmen
              wir Projekte im Bereich {service.name} für Privatkunden, Architekten und Bauherren in {city.name} sowie im
              gesamten {city.region}. {city.description}
            </p>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              Im Mittelpunkt stehen Langlebigkeit, Dichtigkeit und eine saubere, millimetergenaue Ausführung – mit
              normgerechter Verbundabdichtung nach DIN 18534 überall dort, wo Wasser im Spiel ist.{' '}
              {subcategoryNames ? `Unsere Schwerpunkte: ${subcategoryNames}.` : ''} Nach dem kostenfreien Vor-Ort-Aufmaß
              erhalten Sie ein verbindliches Festpreisangebot.
            </p>

            {/* Stats row */}
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
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

      {/* ── Service Features Grid ────────────────────────────────────────── */}
      {service.features && service.features.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10" aria-labelledby="leistungsspektrum">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 id="leistungsspektrum" className="text-2xl sm:text-3xl font-black text-slate-900">
              Detailliertes Leistungsspektrum in {city.name}
            </h2>
            <p className="text-slate-700 text-sm sm:text-base mt-2">
              Handwerkliche Präzision für dauerhaft schöne, dichte und pflegeleichte Beläge.
            </p>
          </div>

          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {service.features.map((feature: string) => (
              <li
                key={feature}
                className="group glass-surface p-5 rounded-2xl flex items-center gap-3.5 hover:-translate-y-0.5 hover:border-emerald-500/80 hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.14)] transition-all duration-300"
              >
                <span className="icon-chip w-9 h-9 rounded-xl">
                  <CheckCircle2 className="w-5 h-5" />
                </span>
                <span className="text-sm font-bold text-slate-800">{feature}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ── Process Steps ────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10" aria-labelledby="ablauf">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="eyebrow eyebrow-sky mb-4">Transparenter Ablauf</span>
          <h2 id="ablauf" className="text-2xl sm:text-3xl font-black text-slate-900">
            Schritt für Schritt zu Ihrem Projekterfolg in {city.name}
          </h2>
          <p className="text-slate-700 text-sm sm:text-base mt-2">
            Von der ersten Kontaktaufnahme bis zur Endabnahme transparent und strukturiert.
          </p>
        </div>

        <ol className="grid md:grid-cols-3 gap-6">
          {processSteps.map((step) => (
            <li
              key={step.step}
              className="glass-surface p-6 rounded-[2rem] hover:-translate-y-0.5 hover:border-emerald-500/80 transition-all duration-300"
            >
              <span className="font-display text-2xl sm:text-3xl font-black text-emerald-700 tabular-nums mb-2 block" aria-hidden="true">
                {step.step}
              </span>
              <span className="text-[11px] font-black uppercase tracking-widest text-emerald-800 block mb-1">
                {step.subtitle}
              </span>
              <h3 className="text-base font-black text-slate-900 mb-2">{step.title}</h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── More in this city ────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 relative z-10" aria-labelledby="mehr-in-stadt">
        <div className="glass-surface rounded-[2rem] p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h2 id="mehr-in-stadt" className="text-lg font-black text-slate-900 mb-1">
              Weitere Leistungen in {city.name}
            </h2>
            <p className="text-sm text-slate-700">Alle Fliesengewerke aus einer Hand – vom Bad bis zur Terrasse.</p>
          </div>
          <ul className="flex flex-wrap gap-2">
            {otherServices.map((other) => (
              <li key={other.id}>
                <Link
                  href={`/leistungen/${other.id}/${city.slug}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-800 hover:border-emerald-500/80 hover:text-emerald-800 transition-colors"
                >
                  {other.name}
                  <ArrowRight className="w-3 h-3 text-emerald-600" />
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={`/standorte/${city.slug}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 hover:border-emerald-500/80 transition-colors"
              >
                <MapPin className="w-3 h-3" />
                Standort {city.name}
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <QualityPromise />
    </div>
  );
}
