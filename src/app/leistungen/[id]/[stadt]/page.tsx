import type { Metadata } from 'next';
import Link from 'next/link';
import { CITIES, type CityData } from '@/config/cities';
import { SERVICES } from '@/config/services';
import { COMPANY_DATA } from '@/config/company';
import { notFound } from 'next/navigation';
import { buildGraph, buildServiceNode, buildBreadcrumbNode, buildWebPageNode, SITE_URL } from '@/lib/schema';
import { createMetadata } from '@/lib/metadata';
import JsonLd from '@/components/seo/JsonLd';
import { MapPin, Phone, ArrowRight, ShieldCheck, CheckCircle2, Award } from 'lucide-react';
import QualityPromise from '@/components/sections/QualityPromise';
import FinalCTA from '@/components/ui/FinalCTA';

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

const SERVICE_CITY_INTROS: Record<
  string,
  (cityName: string, region: string, authorityName: string, subcategories: string) => { p1: string; p2: string }
> = {
  bad: (city, reg, auth, subs) => ({
    p1: `Ob vollständige Badsanierung oder barrierefreier Umbau im bewohnten Bestand: Als eingetragener Fachbetrieb der ${auth} realisieren wir moderne Bäder, begehbare Walk-In-Duschen und großformatige Fliesenbeläge für Privatkunden, Architekten und Bauherren in ${city} sowie im gesamten ${reg}.`,
    p2: `Im Mittelpunkt stehen kompromisslose Langlebigkeit, absolute Dichtigkeit und saubere Ausführung mit normgerechter Verbundabdichtung nach DIN 18534 überall dort, wo Wasser einwirkt.${subs ? ` Unsere Schwerpunkte in ${city}: ${subs}.` : ''} Nach einem kostenfreien Vor-Ort-Aufmaß erhalten Sie ein transparentes, verbindliches Festpreisangebot.`
  }),
  wohnen: (city, reg, auth, subs) => ({
    p1: `Für repräsentative Wohnräume, offene Küchen und Flure in ${city} und der Region ${reg} verlegen wir erstklassiges Feinsteinzeug und Natursteinbeläge. Als geprüfter Fachbetrieb der ${auth} schaffen wir schwellenlose Übergänge zwischen Wohnbereichen und ein vollkommen symmetrisches Fugenbild.`,
    p2: `Wir stimmen den Belagsaufbau exakt auf Ihre Fußbodenheizung und Estrich-Belegreife ab, um optimale Wärmeleitung und rissfreie Beständigkeit zu sichern.${subs ? ` Unsere Fachleistungen für ${city}: ${subs}.` : ''} Nach dem Vor-Ort-Aufmaß in ${city} planen wir Fugenachsen und Verlegemuster im Detail mit Festpreisgarantie.`
  }),
  aussen: (city, reg, auth, subs) => ({
    p1: `Balkone, Terrassen und Eingangsbereiche in ${city} erfordern höchste Witterungsbeständigkeit. Als Fachbetrieb der ${auth} verlegen wir frostsichere 2-cm-Keramikplatten auf Stelzlagern oder im drainierten Kiesbett für Immobilienbesitzer im gesamten ${reg}.`,
    p2: `Dank durchdachtem Gefälle- und Entwässerungskonzept bleibt Ihr Außenbelag in ${city} auch bei starken Frostwechseln rissfrei, trittsicher und dauerhaft wasserableitend.${subs ? ` Unsere Leistungen in ${city}: ${subs}.` : ''} Bei der Vor-Ort-Besichtigung prüfen wir Untergrund und Entwässerungswege persönlich.`
  }),
  untergrund: (city, reg, auth, subs) => ({
    p1: `Ein solider Untergrund ist die unverzichtbare Basis für jeden dauerhaften Fliesenbelag. Als Fachbetrieb der ${auth} analysieren und sanieren wir Estriche, Altbeläge und Wandflächen für Bauherren und Renovierer in ${city} und Umgebung (${reg}).`,
    p2: `Mit CM-Restfeuchtemessung, Rissverharzung, Ausgleichsspachtelungen und zugelassenen Entkopplungssystemen schaffen wir die perfekte Grundlage.${subs ? ` Unsere Schwerpunkte in ${city}: ${subs}.` : ''} Im Feuchtbereich dichten wir strikt nach DIN 18534 ab – verlässlich geprüft vor Ort in ${city}.`
  })
};

const SERVICE_CITY_STEPS: Record<
  string,
  (cityName: string) => Array<{ step: string; subtitle: string; title: string; description: string }>
> = {
  bad: (city) => [
    { step: '01', subtitle: 'Bedarf & Beratung', title: 'Vor-Ort-Aufmaß im Bad', description: `Deniz Tezgel prüft Ihr Bad in ${city} persönlich: Raummaße, Wandaufbau, Gefälle zur Entwässerung und Leitungsanschlüsse.` },
    { step: '02', subtitle: 'Design & Fliesen', title: 'Fliesenformat & Verlegeplan', description: `Gemeinsame Auswahl von Großformaten, rutschhemmenden Bodenbelägen und Fugenrastern, abgestimmt auf Ihr Badkonzept in ${city}.` },
    { step: '03', subtitle: 'Handwerksqualität', title: 'Abdichtung & Verlegung', description: `DIN 18534 Verbundabdichtung, millimetergenaue Verlegung mit Nivelliersystem und staubgeschützte Übergabe in ${city}.` }
  ],
  wohnen: (city) => [
    { step: '01', subtitle: 'Vor-Ort-Check', title: 'Aufmaß & Estrichprüfung', description: `Wir begutachten Estrich, Raummaße und Fugenachsen vor Ort in ${city} und prüfen die Belegreife für Fußbodenheizungen.` },
    { step: '02', subtitle: 'Materialauswahl', title: 'Feinsteinzeug & Fugenbild', description: `Auswahl der gewünschten Großformate und Abstimmung des Fugenverlaufs für ein harmonisches Raumgefühl in ${city}.` },
    { step: '03', subtitle: 'Verlegearbeit', title: 'Präzisionsverlegung', description: `Planschliff und Verlegung im Dünnbettverfahren mit sauberen Sockelabschlüssen und besenreiner Übergabe in ${city}.` }
  ],
  aussen: (city) => [
    { step: '01', subtitle: 'Planung Außen', title: 'Bestandsaufnahme Außen', description: `Begutachtung Ihres Balkons oder Ihrer Terrasse in ${city}: Gefälle, Wasserableitung und Untergrundaufbau.` },
    { step: '02', subtitle: 'Belagskonzept', title: 'Stelzlager & Plattenwahl', description: `Auswahl robuster, frostsicherer 2-cm-Keramikplatten und Festlegung des Entwässerungs- bzw. Stelzlagersystems für ${city}.` },
    { step: '03', subtitle: 'Ausführung', title: 'Wetterfeste Montage', description: `Fachgerechter Aufbau mit sauberem Gefälle, rissfreier Plattenausrichtung und dauerhafter Witterungsbeständigkeit in ${city}.` }
  ],
  untergrund: (city) => [
    { step: '01', subtitle: 'Diagnose', title: 'CM-Restfeuchte & Ebenheit', description: `Messung der Estrichfeuchte mit dem CM-Gerät, Klopfprobe und Überprüfung der Ebenheitstoleranzen vor Ort in ${city}.` },
    { step: '02', subtitle: 'Vorbereitung', title: 'Ausgleich & Entkopplung', description: `Fräsen, Grundieren, Ausgleichsspachtelung und Verlegung von Entkopplungsmatten für schadensfreie Beläge in ${city}.` },
    { step: '03', subtitle: 'Abdichtung', title: 'DIN 18534 Norm-Abdichtung', description: `Einbau zugelassener Dichtmanschetten, Dichtbänder und Verbundabdichtungen vor dem Fliesenauftrag in ${city}.` }
  ]
};

export function generateStaticParams() {
  const params: { id: string; stadt: string }[] = [];
  for (const service of SERVICES) {
    for (const city of CITIES) {
      params.push({ id: service.id, stadt: city.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; stadt: string }>;
}): Promise<Metadata> {
  const { id, stadt } = await params;
  const service = SERVICES.find((s) => s.id === id);
  const city = CITIES.find((c) => c.slug === stadt);
  if (!service || !city) return {};

  const path = `/leistungen/${service.id}/${city.slug}`;
  const serviceDisplayNames: Record<string, string> = {
    untergrund: 'Untergrund & Abdichtung',
    bad: 'Badsanierung & Bäder',
    wohnen: 'Fliesenverlegung & Wohnen',
    aussen: 'Balkon- & Terrassensanierung',
  };
  const displayName = serviceDisplayNames[service.id] || service.name;
  const title = service.id === 'aussen'
    ? `${displayName} in ${city.name} | Tezgel`
    : `${displayName} in ${city.name} | Fliesen Tezgel`;
  
  const description = `${displayName} in ${city.name}: Fachgerechte Verlegung & Sanierung. ${distanceLabel(city)}. Jetzt Vor-Ort-Aufmaß & Festpreisangebot anfragen!`;

  return createMetadata({
    title,
    description,
    path
  });
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

  const serviceDisplayNames: Record<string, string> = {
    untergrund: 'Untergrund & Abdichtung',
    bad: 'Badsanierung & Bäder',
    wohnen: 'Fliesenverlegung & Wohnen',
    aussen: 'Balkon- & Terrassensanierung',
  };
  const displayName = serviceDisplayNames[service.id] || service.name;

  const pageUrl = `${SITE_URL}/leistungen/${service.id}/${city.slug}`;
  const { contact, authority } = COMPANY_DATA;

  const subcategoryNames = (service.subcategories ?? [])
    .map((s) => s.name)
    .join(', ');
  const otherServices = SERVICES.filter((s) => s.id !== service.id);

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Leistungen', path: '/leistungen' },
    { name: service.name, path: `/leistungen/${service.id}` },
    { name: city.name, path: pageUrl },
  ];

  const serviceCityGraph = buildGraph([
    buildWebPageNode({
      url: pageUrl,
      name: `${displayName} in ${city.name} | Fliesenverlegung Tezgel`,
      description: `${service.shortDescription} – fachgerecht ausgeführt in ${city.name} und Umgebung.`,
      breadcrumbItems: breadcrumbs,
    }),
    buildBreadcrumbNode(breadcrumbs, pageUrl),
    buildServiceNode({
      name: `${displayName} in ${city.name}`,
      serviceType: displayName,
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
    { value: authority.shortName, label: 'Eingetragener Fachbetrieb', icon: Award },
  ];

  const currentIntro = (SERVICE_CITY_INTROS[service.id] || SERVICE_CITY_INTROS.bad)(
    city.name,
    city.region,
    authority.name,
    subcategoryNames
  );
  const currentSteps = (SERVICE_CITY_STEPS[service.id] || SERVICE_CITY_STEPS.bad)(city.name);

  return (
    <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
      <JsonLd schema={serviceCityGraph} />

      {/* Ambient Glow */}
      <div className="ambient-glow-orange -top-20 -left-20" />
      <div className="ambient-glow-red top-96 -right-20" />

      {/* ── Hero Section ─────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10">
        <div className="ceramic-hero rounded-2xl p-8 sm:p-14 text-center space-y-5 relative overflow-hidden">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="mb-2 text-xs text-neutral-600 flex flex-wrap items-center justify-center gap-1.5 font-medium"
          >
            <Link href="/" className="hover:text-orange-800 transition-colors">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              href="/leistungen"
              className="hover:text-orange-800 transition-colors"
            >
              Leistungen
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              href={`/leistungen/${service.id}`}
              className="hover:text-orange-800 transition-colors"
            >
              {service.name}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-neutral-900 font-bold" aria-current="page">{city.name}</span>
          </nav>

          <span className="eyebrow">
            <MapPin className="w-3.5 h-3.5" />
            <span>
              {city.region} &middot; {distanceLabel(city)}
            </span>
          </span>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-neutral-900 leading-tight">
            {displayName} in{' '}
            <span className="text-ceramic-gradient">{city.name}</span>
          </h1>

          <p className="text-sm sm:text-base text-neutral-700 max-w-3xl mx-auto leading-relaxed">
            {COMPANY_DATA.legalName} ist Ihr Fachbetrieb für {displayName} in{' '}
            {city.name} und im {city.region}. {service.shortDescription}.{' '}
            {distanceSentence(city)}
          </p>

          <div className="flex flex-wrap gap-3.5 justify-center pt-2">
            <Link href="/kontakt" className="btn-primary px-7 py-3.5 text-xs">
              Kostenloses Aufmaß in {city.name} anfragen
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a href={`tel:${contact.phoneLink}`} className="btn-ghost px-7 py-3.5 text-xs">
              <Phone className="w-4 h-4 text-orange-700" />
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
                HWK Fachbetrieb &middot; {authority.shortName}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-neutral-900">
                Fachkompetenz &amp; Präzision für {city.name}
              </h2>
            </div>

            <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
              {currentIntro.p1} {city.description}
            </p>

            <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
              {currentIntro.p2}
            </p>

            {/* Stats row */}
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {stats.map(({ value, label, icon: Icon }) => (
                <li
                  key={label}
                  className="rounded-xl bg-white border border-neutral-200 p-6 text-center flex flex-col items-center gap-1"
                >
                  <Icon className="w-5 h-5 text-orange-600 mb-2" aria-hidden="true" />
                  <span className="font-display text-2xl font-black text-neutral-900 tabular-nums">{value}</span>
                  <span className="text-xs text-neutral-600 font-semibold">{label}</span>
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
            <h2 id="leistungsspektrum" className="text-2xl sm:text-3xl font-black text-neutral-900">
              Detailliertes Leistungsspektrum in {city.name}
            </h2>
            <p className="text-neutral-700 text-sm sm:text-base mt-2">
              Handwerkliche Präzision für dauerhaft schöne, dichte und pflegeleichte Beläge.
            </p>
          </div>

          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {service.features.map((feature: string) => (
              <li
                key={feature}
                className="group glass-surface p-5 rounded-xl flex items-center gap-3.5 hover:-translate-y-0.5 hover:border-orange-500/80 hover:shadow-[0_20px_40px_-12px_rgba(23,23,23,0.14)] transition-all duration-200"
              >
                <span className="icon-chip w-9 h-9 rounded-lg">
                  <CheckCircle2 className="w-5 h-5" />
                </span>
                <span className="text-sm font-bold text-neutral-800">{feature}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ── Process Steps ────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10" aria-labelledby="ablauf">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="eyebrow eyebrow-red mb-4">Transparenter Ablauf</span>
          <h2 id="ablauf" className="text-2xl sm:text-3xl font-black text-neutral-900">
            Schritt für Schritt zu Ihrem Projekterfolg in {city.name}
          </h2>
          <p className="text-neutral-700 text-sm sm:text-base mt-2">
            Von der ersten Kontaktaufnahme bis zur Endabnahme transparent und strukturiert.
          </p>
        </div>

        <ol className="grid md:grid-cols-3 gap-6">
          {currentSteps.map((step) => (
            <li
              key={step.step}
              className="glass-surface p-6 rounded-2xl hover:-translate-y-0.5 hover:border-orange-500/80 transition-all duration-200"
            >
              <span className="font-display text-2xl sm:text-3xl font-black text-orange-700 tabular-nums mb-2 block" aria-hidden="true">
                {step.step}
              </span>
              <span className="text-[11px] font-black uppercase tracking-widest text-orange-800 block mb-1">
                {step.subtitle}
              </span>
              <p className="text-base font-black text-neutral-900 mb-2">{step.title}</p>
              <p className="text-sm text-neutral-700 leading-relaxed">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── More in this city ────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 relative z-10" aria-labelledby="mehr-in-stadt">
        <div className="glass-surface rounded-2xl p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h2 id="mehr-in-stadt" className="text-lg font-black text-neutral-900 mb-1">
              Weitere Leistungen in {city.name}
            </h2>
            <p className="text-sm text-neutral-700">Alle Fliesengewerke aus einer Hand – vom Bad bis zur Terrasse.</p>
          </div>
          <ul className="flex flex-wrap gap-2">
            {otherServices.map((other) => (
              <li key={other.id}>
                <Link
                  href={`/leistungen/${other.id}/${city.slug}`}
                  aria-label={`${other.name} in ${city.name} ansehen`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-neutral-200 text-xs font-semibold text-neutral-800 hover:border-orange-500/80 hover:text-orange-800 transition-colors"
                >
                  {other.name} in {city.name}
                  <ArrowRight className="w-3 h-3 text-orange-600" />
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={`/standorte/${city.slug}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-orange-50 border border-orange-200 text-xs font-bold text-orange-800 hover:border-orange-500/80 transition-colors"
              >
                <MapPin className="w-3 h-3" />
                Standort {city.name}
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <QualityPromise />

      {/* Final Conversion CTA with Quick Form */}
      <FinalCTA
        headline={`${displayName} in ${city.name}: Jetzt unverbindlich beraten lassen.`}
        subtitle={`Kostenfreies Vor-Ort-Aufmaß in ${city.name} • Festpreisangebot • HWK-Fachbetrieb`}
        buttonText={`Jetzt Beratung für ${city.name} anfordern`}
        serviceContext={`${displayName} · ${city.name}`}
        showQuickForm={true}
        quickFormSource={`leistung-${service.id}-${city.slug}`}
      />
    </div>
  );
}
