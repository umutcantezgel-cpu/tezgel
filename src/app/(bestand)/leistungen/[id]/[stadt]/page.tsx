// Leistung vor Ort (E5-BAU-10, KERN v2): Vorlage der 52 Seiten /leistungen/[id]/[stadt] als Erzählansicht nach dem
// Muster der Leistungsseite (/leistungen/[id]). Einstieg mit Pfad (Brotkrumen), Etikett Region und Entfernung, H1,
// Vorspann und Knöpfen; rechts das Planblatt der Leistung. Danach die Leitachse über Fachkompetenz (Text und drei
// Kennzahlen an der Fuge), Leistungsspektrum (Liste mit Fugenkreuz), Ablauf (Schrittfolge) und weitere Leistungen vor
// Ort (Feldraster mit Plänen). Links, IDs und Lesefolge wie im Bestand. Keine Icon-Kacheln, kein Auftritt, kein großer Moment.
// SEO-Runde b4 (02.11.2026): Wortlaut aus src/inhalte/leistung-ort.ts (nur Faktenblatt, ohne Floskeln, Gedankenstriche und
// weiche Zusagen, Fachwörter mit Erklärung); die frühere Ortsbeschreibung aus cities.ts entfällt hier, weil sie je Ort
// Schwerpunkte nannte, die nicht belegt sind. Daten und Metadaten (Titel, Description) unverändert.
import type { Metadata } from 'next';
import Link from 'next/link';
import clsx from 'clsx';
import { CITIES, type CityData } from '@/config/cities';
import { SERVICES } from '@/config/services';
import { COMPANY_DATA } from '@/config/company';
import { notFound } from 'next/navigation';
import { buildGraph, buildServiceNode, buildBreadcrumbNode, buildWebPageNode, SITE_URL } from '@/lib/schema';
import { createMetadata } from '@/lib/metadata';
import { LEISTUNG_ANZEIGE, leistungOrtBeschreibung, leistungOrtTitel } from '@/lib/seo/titel';
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
import Textmarken from '@/components/kern/Textmarken';
import { LEISTUNG_ORT, ohneMarken } from '@/inhalte/leistung-ort';
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
  if (city.distanceKm === 0) return `${city.name} liegt direkt neben unserem Firmensitz in ${headquarters.city}.`;
  return `Bis ${city.name} sind es etwa ${city.distanceKm}\u00a0km ab Wetzlar. Wir kommen von unserem Firmensitz in ${headquarters.city} zu Ihnen.`;
}

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
  // SEO-Runde: Titel aus src/lib/seo/titel.ts (lange Ortsnamen kurz, damit die Marke bleibt; Test 7 in titleLength)
  const title = leistungOrtTitel(service, city);
  
  // Snippet-Runde: Description aus der Vorlage der Leistung (src/lib/seo/titel.ts), dieselbe in der WebPage
  const description = leistungOrtBeschreibung(service, city);

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

  const displayName = LEISTUNG_ANZEIGE[service.id] || service.name;

  const pageUrl = `${SITE_URL}/leistungen/${service.id}/${city.slug}`;
  const { contact, authority } = COMPANY_DATA;

  // Texte der Leistung (b4); ohne Eintrag gibt es die Seite nicht (generateStaticParams nimmt nur SERVICES)
  const text = LEISTUNG_ORT[service.id];
  if (!text) notFound();
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
      name: leistungOrtTitel(service, city),
      description: leistungOrtBeschreibung(service, city),
      breadcrumbItems: breadcrumbs,
    }),
    buildBreadcrumbNode(breadcrumbs, pageUrl),
    buildServiceNode({
      name: `${displayName} in ${city.name}`,
      serviceType: displayName,
      description: `${text.vorspann} Für ${city.name} und den ${city.region}.`,
      url: pageUrl,
      areaServedCity: city.name,
      offers: text.liste.map((punkt) => ({ name: ohneMarken(punkt) })),
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
    { value: text.kennzahl.wert, label: text.kennzahl.name },
    { value: authority.shortName, label: 'Eingetragener Fachbetrieb' },
  ];

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
            {COMPANY_DATA.legalName} ist Ihr Fachbetrieb für {text.imSatz} in {city.name} und im {city.region}. {text.vorspann}{' '}
            {distanceSentence(city)}
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
          // Name im Planblatt ohne Fachwort (b4): „Untergrund & Abdichtung“ stand dort als erstes Vorkommen ohne Erklärung
          <Planblatt felder={planfelder(text.link, service.id as PlanName)}>
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
          etikett={<>Fachbetrieb &middot; {authority.shortName}</>}
          titel={text.titel(city.name)}
        >
          {/* zwei oder drei Absätze (b4) ab lg in zwei Spalten: ganze Absätze, der Browser gleicht die Spalten aus, Lesefolge wie im DOM */}
          <div className="space-y-6 font-text text-fs-3 text-tinte-2 lg:columns-2 lg:gap-x-12">
            {text.absaetze(city.name).map((absatz) => (
              <p key={absatz.slice(0, 24)} className="break-inside-avoid">
                <Textmarken text={absatz} />
              </p>
            ))}
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
        {text.liste.length > 0 && (
          <Abschnitt
            titelId="leistungsspektrum"
            leitachse
            spaet
            kopf="seitlich"
            titel={<>Das machen wir in {city.name}</>}
          >
            <ul className="border-b border-fuge">
              {text.liste.map((punkt) => (
                <li key={punkt} className="flex gap-3 border-t border-fuge py-4 font-text text-fs-3 text-tinte">
                  <span aria-hidden="true" className="flex h-6 shrink-0 items-center text-strich">
                    <Fugenkreuz className="size-3" />
                  </span>
                  <span className="min-w-0">
                    <Textmarken text={punkt} />
                  </span>
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
          etikett="Ablauf"
          titel={<>So läuft es in {city.name} ab</>}
          einleitung={<p>Drei Schritte vom Termin bei Ihnen bis zur Abnahme.</p>}
        >
          <Schrittfolge
            ausrichtung="waagrecht"
            untertitelOben
            nummerStumm
            titelEbene="div"
            schritte={text.schritte(city.name).map((schritt, i) => ({
              nummer: String(i + 1).padStart(2, '0'),
              untertitel: schritt.untertitel,
              titel: schritt.titel,
              text: schritt.text,
            }))}
          />
        </Abschnitt>

        {/* 5. WEITERE LEISTUNGEN VOR ORT: je Gewerk ein Feld mit kleinem Plan, dazu der Standort */}
        <Abschnitt
          titelId="mehr-in-stadt"
          leitachse
          spaet
          titel={<>Weitere Leistungen in {city.name}</>}
          einleitung={<p>Wir kommen auch für andere Arbeiten zu Ihnen nach {city.name}.</p>}
        >
          <Feldraster spalten={otherServices.length + 1 === 4 ? 4 : 3}>
            {otherServices.map((other) => (
              <Feld key={other.id} className="gap-6">
                <div className="w-24">
                  <Verlegeplan plan={other.id as PlanName} ohneAchse bemassung={false} />
                </div>
                <Link
                  href={`/leistungen/${other.id}/${city.slug}`}
                  aria-label={`${LEISTUNG_ORT[other.id]?.link ?? other.name} in ${city.name} ansehen`}
                  className={clsx(linkKlassen, 'mt-auto inline-flex items-center gap-2 font-text text-fs-3 text-tinte')}
                >
                  {LEISTUNG_ORT[other.id]?.link ?? other.name} in {city.name}
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
        headline={text.abschluss(city.name)}
        subtitle={`Kostenfreier Termin in ${city.name} • Festpreisangebot • Fachbetrieb der ${authority.shortName}`}
        buttonText={`Jetzt Beratung für ${city.name} anfordern`}
        serviceContext={`${displayName} · ${city.name}`}
        showQuickForm={true}
        quickFormSource={`leistung-${service.id}-${city.slug}`}
      />
    </>
  );
}
