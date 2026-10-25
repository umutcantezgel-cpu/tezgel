// Leistung vor Ort (E5-BAU-10, KERN v2): Vorlage der 52 Seiten /leistungen/[id]/[stadt] als Erzählansicht nach dem
// Muster der Leistungsseite (/leistungen/[id]). Einstieg mit Pfad (Brotkrumen), Etikett Region und Entfernung, H1,
// Vorspann und Knöpfen; rechts das Planblatt der Leistung. Danach die Leitachse über Fachkompetenz (Text und drei
// Kennzahlen an der Fuge), Leistungsspektrum (Liste mit Fugenkreuz), Ablauf (Schrittfolge) und weitere Leistungen vor
// Ort (Feldraster mit Plänen). Wortlaut, Überschriften, Links, IDs und Lesefolge wie im Bestand; Daten, Metadaten und
// strukturierte Daten unverändert. Keine Icon-Kacheln, kein Auftritt, kein großer Moment.
import type { Metadata } from 'next';
import Link from 'next/link';
import clsx from 'clsx';
import { CITIES, type CityData } from '@/config/cities';
import { SERVICES } from '@/config/services';
import { COMPANY_DATA } from '@/config/company';
import { notFound } from 'next/navigation';
import { buildGraph, buildServiceNode, buildBreadcrumbNode, buildWebPageNode, SITE_URL } from '@/lib/schema';
import { createMetadata } from '@/lib/metadata';
import JsonLd from '@/components/seo/JsonLd';
import QualityPromise from '@/components/sections/QualityPromise';
import FinalCTA from '@/components/ui/FinalCTA';
import Icon from '@/components/icons/Icon';
import Einstieg from '@/components/kern/Einstieg';
import Abschnitt from '@/components/kern/Abschnitt';
import Leitachse from '@/components/kern/Leitachse';
import { Feld, Feldraster } from '@/components/kern/Feldraster';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Knopf from '@/components/kern/Knopf';
import Schrittfolge from '@/components/kern/Schrittfolge';
import Verlegeplan from '@/components/kern/Verlegeplan';
import Planblatt, { planfelder } from '@/components/kern/Planblatt';
import { linkKlassen } from '@/components/kern/stile';
import type { PlanName } from '@/lib/plaene/vorgaben';

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
  
  const kurznamen: Record<string, string> = {
    bad: 'Badsanierung',
    wohnen: 'Fliesen im Wohnbereich',
    aussen: 'Balkon und Terrasse',
    untergrund: 'Untergrund und Abdichtung',
  };
  const description = `${kurznamen[service.id] ?? displayName} in ${city.name}: Leistungen, Ablauf und Festpreis vom Fachbetrieb Tezgel. Der Termin bei Ihnen vor Ort ist kostenfrei.`;

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
    },
    { value: 'DIN 18534', label: 'Normgerechte Verbundabdichtung' },
    { value: authority.shortName, label: 'Eingetragener Fachbetrieb' },
  ];

  const currentIntro = (SERVICE_CITY_INTROS[service.id] || SERVICE_CITY_INTROS.bad)(
    city.name,
    city.region,
    authority.name,
    subcategoryNames
  );
  const currentSteps = (SERVICE_CITY_STEPS[service.id] || SERVICE_CITY_STEPS.bad)(city.name);

  return (
    <>
      <JsonLd schema={serviceCityGraph} />

      {/* 1. EINSTIEG: Pfad, Etikett mit Region und Entfernung, H1 an der Laserachse, Vorspann, Knöpfe; rechts das Planblatt */}
      <Einstieg
        art="erzaehl"
        pfad={
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-fs-1 text-tinte-2">
              <li>
                <Link href="/" className={linkKlassen}>
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/leistungen" className={linkKlassen}>
                  Leistungen
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href={`/leistungen/${service.id}`} className={linkKlassen}>
                  {service.name}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <span className="text-tinte" aria-current="page">
                  {city.name}
                </span>
              </li>
            </ol>
          </nav>
        }
        etikett={
          <>
            <Icon name="ort" groesse={4} />
            <span>
              {city.region} &middot; {distanceLabel(city)}
            </span>
          </>
        }
        titel={
          <>
            {displayName} in {city.name}
          </>
        }
        vorspann={
          <p>
            {COMPANY_DATA.legalName} ist Ihr Fachbetrieb für {displayName} in {city.name} und im {city.region}.{' '}
            {service.shortDescription}. {distanceSentence(city)}
          </p>
        }
        aktionen={
          <>
            <Knopf href="/kontakt" icon="pfeil-rechts">
              Kostenloses Aufmaß in {city.name} anfragen
            </Knopf>
            <Knopf href={`tel:${contact.phoneLink}`} variante="neben" iconLinks="telefon">
              <span className="font-mono font-normal">{contact.phone}</span>
            </Knopf>
          </>
        }
        rand={
          <Planblatt felder={planfelder(displayName, service.id as PlanName)}>
            <Verlegeplan plan={service.id as PlanName} ohneAchse bemassung={false} interaktiv />
          </Planblatt>
        }
      />

      <Leitachse>
        {/* 2. FACHKOMPETENZ: die zwei Absätze nebeneinander (volle Breite statt langer Spalte), darunter drei Kennzahlen
            an der Fuge (Wert vor Bezeichnung wie im Bestand) */}
        <Abschnitt
          leitachse
          spaet
          flaeche="fliese"
          etikett={<>HWK Fachbetrieb &middot; {authority.shortName}</>}
          titel={<>Fachkompetenz &amp; Präzision für {city.name}</>}
        >
          <div className="grid gap-6 font-text text-fs-3 text-tinte-2 lg:grid-cols-2 lg:gap-x-12">
            <p>
              {currentIntro.p1} {city.description}
            </p>
            <p>{currentIntro.p2}</p>
          </div>
          <Feldraster spalten={3} className="mt-12">
            {stats.map(({ value, label }) => (
              <Feld key={label} className="gap-2">
                <span className="font-anzeige text-fs-5 text-tinte">{value}</span>
                <span className="font-mono text-fs-1 text-tinte-2">{label}</span>
              </Feld>
            ))}
          </Feldraster>
        </Abschnitt>

        {/* 3. LEISTUNGSSPEKTRUM: Kopf seitlich, rechts die Liste an der Fuge (Fugenkreuz als Marke) */}
        {service.features && service.features.length > 0 && (
          <Abschnitt
            titelId="leistungsspektrum"
            leitachse
            spaet
            kopf="seitlich"
            titel={<>Detailliertes Leistungsspektrum in {city.name}</>}
            einleitung={<p>Handwerkliche Präzision für dauerhaft schöne, dichte und pflegeleichte Beläge.</p>}
          >
            <ul className="border-b border-fuge">
              {service.features.map((feature: string) => (
                <li key={feature} className="flex gap-3 border-t border-fuge py-4 font-text text-fs-3 text-tinte">
                  <span aria-hidden="true" className="flex h-6 shrink-0 items-center text-strich">
                    <Fugenkreuz className="size-3" />
                  </span>
                  <span className="min-w-0">{feature}</span>
                </li>
              ))}
            </ul>
          </Abschnitt>
        )}

        {/* 4. ABLAUF: drei Schritte nebeneinander (Nummer, Phase, Titel, Text) */}
        <Abschnitt
          titelId="ablauf"
          leitachse
          spaet
          flaeche="fliese"
          etikett="Transparenter Ablauf"
          titel={<>Schritt für Schritt zu Ihrem Projekterfolg in {city.name}</>}
          einleitung={<p>Von der ersten Kontaktaufnahme bis zur Endabnahme transparent und strukturiert.</p>}
        >
          <Schrittfolge
            ausrichtung="waagrecht"
            untertitelOben
            nummerStumm
            titelEbene="div"
            schritte={currentSteps.map((step) => ({
              nummer: step.step,
              untertitel: step.subtitle,
              titel: step.title,
              text: step.description,
            }))}
          />
        </Abschnitt>

        {/* 5. WEITERE LEISTUNGEN VOR ORT: je Gewerk ein Feld mit kleinem Plan, dazu der Standort */}
        <Abschnitt
          titelId="mehr-in-stadt"
          leitachse
          spaet
          titel={<>Weitere Leistungen in {city.name}</>}
          einleitung={<p>Alle Fliesengewerke aus einer Hand – vom Bad bis zur Terrasse.</p>}
        >
          <Feldraster spalten={otherServices.length + 1 === 4 ? 4 : 3}>
            {otherServices.map((other) => (
              <Feld key={other.id} className="gap-6">
                <div className="w-24">
                  <Verlegeplan plan={other.id as PlanName} ohneAchse bemassung={false} />
                </div>
                <Link
                  href={`/leistungen/${other.id}/${city.slug}`}
                  aria-label={`${other.name} in ${city.name} ansehen`}
                  className={clsx(linkKlassen, 'mt-auto inline-flex items-center gap-2 font-text text-fs-3 text-tinte')}
                >
                  {other.name} in {city.name}
                  <Icon name="pfeil-rechts" groesse={4} />
                </Link>
              </Feld>
            ))}
            <Feld className="gap-6">
              <Icon name="ort" groesse={6} className="text-tinte-2" />
              <Link href={`/standorte/${city.slug}`} className={clsx(linkKlassen, 'mt-auto inline-flex items-center gap-2 font-text text-fs-3 text-tinte')}>
                Standort {city.name}
                <Icon name="pfeil-rechts" groesse={4} />
              </Link>
            </Feld>
          </Feldraster>
        </Abschnitt>
      </Leitachse>

      <QualityPromise />

      {/* Abschluss mit Schnellanfrage (Quelle je Leistung und Ort unverändert) */}
      <FinalCTA
        headline={`${displayName} in ${city.name}: Jetzt unverbindlich beraten lassen.`}
        subtitle={`Kostenfreies Vor-Ort-Aufmaß in ${city.name} • Festpreisangebot • HWK-Fachbetrieb`}
        buttonText={`Jetzt Beratung für ${city.name} anfordern`}
        serviceContext={`${displayName} · ${city.name}`}
        showQuickForm={true}
        quickFormSource={`leistung-${service.id}-${city.slug}`}
      />
    </>
  );
}
