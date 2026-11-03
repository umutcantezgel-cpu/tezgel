// Standorte (E3-BAU-04, KERN v2): Erzählansicht nach dem Muster der Startseite und von /leistungen. Einstieg mit
// Laserachse, H1 links, Vorspann und Knöpfe, rechts das Planblatt mit dem Einzugsband (E4-NACH-01). Danach die Leitachse über die
// Abschnitte: Gebietskarte (Einzugsband als Vorschau vor der Einwilligung, Karte dahinter unverändert), Städte als Feldraster mit
// je einem Link, Leistungen als Merkliste, Anfahrt mit der Standortkarte, Anfrage (Orte auf Anfrage und regionaler Ansprechpartner
// in einem Abschnitt; E4-N2-07). Der Abschluss steht außerhalb der Leitachse. Links und IDs wie im Bestand (#karte-ueberschrift,
// #leistungen-ueberall, #hauptsitz-heading, #weitere-orte-titel); Vorspann, Knopf, Kartenüberschrift, Leistungsliste und
// Ortsbeschreibungen seit der SEO-Runde b4 nur mit belegten Angaben.
// Großer Moment: das Einzugsband im Planblatt des Einstiegs (E3-ORCH-03, E4-NACH-01).
import Link from 'next/link';
import clsx from 'clsx';
import { CITIES, type CityData } from '@/config/cities';
import { COMPANY_DATA } from '@/config/company';
import { siteConfig } from '@/lib/config';
import { createMetadata } from '@/lib/metadata';
import { buildGraph, buildBreadcrumbNode, buildWebPageNode, SITE_URL, ORG_ID } from '@/lib/schema';
import JsonLd from '@/components/seo/JsonLd';
import ServiceMapWrapper from '@/components/maps/ServiceMapWrapper';
import dynamic from 'next/dynamic';

// Standortkarte nachgeladen (E4-NACH-17: Google-Maps-Bibliothek nicht in der Erstladung); Platzhalter serverseitig
const InteractiveMap = dynamic(() => import('@/components/maps/InteractiveMap'));
import LocationContact from '@/components/locations/LocationContact';
import FinalCTA from '@/components/ui/FinalCTA';
import Icon from '@/components/icons/Icon';
import Einstieg from '@/components/kern/Einstieg';
import Abschnitt from '@/components/kern/Abschnitt';
import Leitachse from '@/components/kern/Leitachse';
import { Feld } from '@/components/kern/Feldraster';
import Knopf from '@/components/kern/Knopf';
import Merkliste from '@/components/kern/Merkliste';
import Planblatt, { planfelder } from '@/components/kern/Planblatt';
import Einzugsband from '@/components/kern/Einzugsband';
import Schriftfeld from '@/components/kern/Schriftfeld';
import { linkKlassen } from '@/components/kern/stile';
import { seitenBeschreibung } from '@/lib/beschreibung';
import { seitenTitel } from '@/lib/seo/seitentitel';

export const metadata = createMetadata({
  // SEO-Runde (Plan, Abschnitt 4): Friedberg, Bad Nauheim und Butzbach liegen im Wetteraukreis, nicht in Mittelhessen
  title: 'Einsatzgebiet in Mittelhessen und der Wetterau · Tezgel',
  // die Description steht in src/inhalte/meta/seiten.ts und gewinnt dort (lib/beschreibung.ts)
  description: seitenBeschreibung('/standorte', 'Übersicht aller Städte und Gemeinden, in denen Fliesenverlegung Tezgel aus Aßlar Fliesen verlegt und Bäder saniert.'),
  path: '/standorte',
});

const pageUrl = `${SITE_URL}/standorte`;
const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Standorte', path: '/standorte' },
];

const standorteGraph = buildGraph([
  buildWebPageNode({
    url: pageUrl,
    name: 'Einsatzgebiet in Mittelhessen und der Wetterau · Tezgel',
    description: 'Übersicht aller Städte und Gemeinden, in denen Fliesenverlegung Tezgel aus Aßlar Fliesen verlegt und Bäder saniert.',
    breadcrumbItems: breadcrumbs,
  }),
  buildBreadcrumbNode(breadcrumbs, pageUrl),
  {
    '@type': 'CollectionPage',
    '@id': `${pageUrl}#collection`,
    // derselbe Titel wie Metadaten und WebPage (src/inhalte/meta/titel.ts)
    name: seitenTitel('/standorte', 'Einsatzgebiet in Mittelhessen und der Wetterau'),
    // dieselbe Beschreibung wie Metadaten und WebPage (lib/beschreibung.ts, E-054)
    description: seitenBeschreibung('/standorte', 'Übersicht aller Städte und Gemeinden, in denen Fliesenverlegung Tezgel aus Aßlar Fliesen verlegt und Bäder saniert.'),
    publisher: { '@id': ORG_ID },
  },
]);

const REGIONS = Array.from(new Set(CITIES.map((city) => city.region)));

/** Leistungen vor Ort (SEO-Runde b4): eigene Liste nach dem Faktenblatt (F-08), ohne Fachwörter und ohne „XXL“; vorher die Liste
 *  business.primaryServices aus company.js (Firmendaten, unverändert), deren Fachwörter hier ohne Erklärung standen */
const LEISTUNGEN_VOR_ORT = [
  'Badsanierung und Duschen ohne Stufe',
  'Bäder ohne Barrieren',
  'Große Fliesen mit wenigen Fugen',
  'Böden und Wände in Wohnräumen, Küchen und Fluren',
  'Treppen innen und außen',
  'Balkon und Terrasse',
  'Naturstein',
  'Vorarbeiten vor dem Fliesen',
];

// Stadtfeld: das ganze Feld ist der Link (Fuge statt Karte); der Name unterstreicht sich bei feinem Zeiger
const STADT_LINK = 'group flex flex-1 flex-col justify-between after:absolute after:inset-0';
const STADT_NAME =
  'font-anzeige text-fs-4 font-semibold text-tinte decoration-1 underline-offset-4 decoration-tinte pointer-fine:group-hover:underline group-active:underline';

function distanceLabel(city: CityData) {
  if (city.name === COMPANY_DATA.headquarters.city) return 'Unser Firmensitz';
  if (city.distanceKm === 0) return 'Direkt neben unserem Firmensitz';
  return `ca. ${city.distanceKm} km ab Wetzlar`;
}

export default function StandorteOverviewPage() {
  const { headquarters, contact } = COMPANY_DATA;

  return (
    <>
      <JsonLd schema={standorteGraph} />

      {/* 1. EINSTIEG: Etikett, H1 an der Laserachse, Vorspann, Knöpfe; rechts das Planblatt mit dem Einzugsband */}
      <Einstieg
        art="erzaehl"
        etikett={<>Mittelhessen &amp; Lahn-Dill-Kreis</>}
        titel="Standorte & Einsatzgebiete in Mittelhessen"
        vorspann={
          <p>
            {/* SEO-Runde b4: kein Satz über 25 Wörter, kein Gedankenstrich (vorher 32 Wörter) */}
            Unser Firmensitz ist in der {headquarters.street} in {headquarters.postalCode} {headquarters.city}. Von hier
            kommen wir zu Ihnen nach Wetzlar, Gießen, Herborn und in ganz Mittelhessen. Deniz Tezgel berät Sie persönlich
            bei Ihnen vor Ort.
          </p>
        }
        aktionen={
          <>
            <Knopf href="/kontakt" icon="pfeil-rechts">
              Termin vor Ort anfragen
            </Knopf>
            <Knopf href={`tel:${contact.phoneLink}`} variante="neben" iconLinks="telefon">
              <span className="font-mono font-normal">{contact.phone}</span>
            </Knopf>
          </>
        }
        rand={
          // Planblatt (E4-NACH-01, E3-SICHT-ERZ Befund 6): statt eines Badplans ohne Ortsbezug zeigt das Blatt das
          // Einzugsband ab Aßlar – großer Moment der Seite; die Orte bleiben als Links die Hauptform
          <Planblatt felder={planfelder('Einsatzgebiet')}>
            <Einzugsband form="stapel" />
          </Planblatt>
        }
      />

      <Leitachse>
        {/* 2. GEBIETSKARTE: das Einsatzgebiet; vor der Einwilligung zeigt der Platzhalter das gezeichnete Einzugsband
              als Vorschau (E4-N2-07, Befund 16), die Karte liegt dahinter (unverändert). Stadtleiste und Kurzprofil wie im Bestand. */}
        <Abschnitt
          titelId="karte-ueberschrift"
          leitachse
          spaet
          etikett="Interaktive Gebietskarte"
          titel="Unser Einsatzgebiet in Mittelhessen und der Wetterau"
          einleitung={<p>Klicken Sie auf eine Stadt, dann sehen Sie Entfernung und Anfahrt.</p>}
        >
          <ServiceMapWrapper />
        </Abschnitt>

        {/* 3. STÄDTE: je Stadt ein Feld, das ganze Feld ist der Link */}
        <Abschnitt
          leitachse
          spaet
          etikett={<>{CITIES.length} Städte &amp; Gemeinden</>}
          titel="Wählen Sie Ihre Stadt oder Gemeinde"
          einleitung={
            <p>
              Klicken Sie auf Ihren Wohnort, um mehr über unsere Fliesen- und Badleistungen und den Ablauf vor Ort zu
              erfahren. Entfernungen sind ungefähre Angaben ab Wetzlar.
            </p>
          }
        >
          {/* Stadtfelder (Entfernungen laut Einleitung ab Wetzlar – Angleichung als Textvorschlag, M-17); das Einzugsband
              ab Aßlar steht seit E4-NACH-01 im Planblatt des Einstiegs. Fugen als Linien an Zelle rechts und unten; die
              leeren Restzellen der letzten Reihe bleiben Fliese statt Grau (E4-NACH-09, Befund 24). */}
          <ul className="grid grid-cols-1 border-l border-t border-fuge bg-fliese md:grid-cols-2 lg:grid-cols-3">
            {CITIES.map((city) => (
              <Feld key={city.slug} className="relative border-b border-r border-fuge">
                <Link href={`/standorte/${city.slug}`} className={STADT_LINK}>
                  <div>
                    <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                      <span className="whitespace-nowrap font-mono text-fs-1 text-tinte-2">{city.region}</span>
                      <span className="whitespace-nowrap font-mono text-fs-1 text-tinte-2 tabular-nums">
                        {distanceLabel(city)}
                      </span>
                    </div>
                    <p className={STADT_NAME}>{city.name}</p>
                    {city.description && <p className="mt-3 max-w-mass font-text text-fs-2 text-tinte-2">{city.description}</p>}
                  </div>
                  <span className="mt-6 flex items-center justify-between gap-3 border-t border-fuge pt-4 font-text text-fs-2 font-semibold text-tinte">
                    <span>Fliesenleger in {city.name}</span>
                    <Icon name="pfeil-rechts" groesse={5} />
                  </span>
                </Link>
              </Feld>
            ))}
          </ul>
        </Abschnitt>

        {/* 4. LEISTUNGEN VOR ORT: Merkliste aus den Leistungen des Betriebs, Fläche Fliese */}
        <Abschnitt
          titelId="leistungen-ueberall"
          flaeche="fliese"
          leitachse
          spaet
          etikett="In allen Einsatzgebieten"
          titel="Unsere Leistungen vor Ort"
        >
          <Merkliste spalten={2} eintraege={LEISTUNGEN_VOR_ORT.map((titel) => ({ titel }))} />
          <div className="mt-8">
            <Knopf href="/leistungen" variante="text" icon="pfeil-rechts">
              Alle Leistungen im Überblick
            </Knopf>
          </div>
        </Abschnitt>

        {/* 5. ANFAHRT: Firmensitz. Die Karte bleibt hinter der Einwilligung (unverändert, ohne eigenen Infokasten); daneben
              Anschrift, Telefon, Zeiten und der Weg als Schriftfeld, damit keine leere Fläche neben der Karte bleibt
              (E4-NACH-09, Befund 23). Name, Routenlink und Wortlaut des Infokastens bleiben erhalten. */}
        {/* ohne spaet: der Kartenbereich zeichnet sich sofort, damit die Standortkarte (lazy) beim Anspringen mitlädt */}
        <Abschnitt
          titelId="hauptsitz-heading"
          leitachse
          etikett="Firmensitz & Anfahrt"
          titel="Unser Hauptstandort in Aßlar"
          einleitung={
            <p>
              Von der Hohwardstraße 14 in Aßlar starten wir täglich zu unseren Projekten in Wetzlar, Gießen und ganz
              Hessen.
            </p>
          }
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-12">
            <div className="md:col-span-8 lg:col-span-7">
              <InteractiveMap height="400px" showInfoBox={false} />
            </div>
            <div className="flex flex-col justify-between gap-6 md:col-span-8 lg:col-span-5">
              <div className="flex flex-col gap-4">
                <h4 className="font-text text-fs-3 font-semibold text-tinte">{COMPANY_DATA.legalName}</h4>
                <Schriftfeld
                  spalten={1}
                  felder={[
                    {
                      etikett: 'Anschrift',
                      wert: (
                        <>
                          {headquarters.street}, <span className="font-mono">{headquarters.postalCode}</span> {headquarters.city}
                        </>
                      ),
                    },
                    {
                      etikett: 'Telefon',
                      wert: (
                        <a href={`tel:${contact.phoneLink}`} className={clsx(linkKlassen, 'font-mono')}>
                          {contact.phone}
                        </a>
                      ),
                    },
                    { etikett: 'Zeiten', wert: <span className="font-mono">{siteConfig.openingHours.store}</span> },
                  ]}
                />
              </div>
              <Knopf href={headquarters.mapsUrl} extern variante="neben" icon="pfeil-rechts">
                Route planen
              </Knopf>
            </div>
          </div>
        </Abschnitt>

        {/* 6. ANFRAGE (ein Abschnitt vor dem Abschluss, E4-N2-07 Befund 15): Kopf seitlich „Ihre Stadt ist nicht aufgeführt?“,
              rechts Telefon und Beratung, darunter der regionale Ansprechpartner (LocationContact eingebettet: Etikett,
              Überschrift, Zusagen, Wege unverändert) – keine leere Hälfte, kein doppelter Einzug */}
        <Abschnitt
          titelId="weitere-orte-titel"
          kopf="seitlich"
          leitachse
          etikett="Weitere Orte auf Anfrage"
          titel="Ihre Stadt ist nicht aufgeführt?"
          einleitung={
            <p>
              Wir sind unter anderem im {REGIONS.join(', ')} unterwegs. Rufen Sie uns an. Wir klären gern, ob wir Ihr
              Vorhaben an Ihrem Wohnort übernehmen können.
            </p>
          }
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Knopf href={`tel:${contact.phoneLink}`} iconLinks="telefon">
              <span className="font-mono font-normal">{contact.phone}</span>
            </Knopf>
            <Knopf href="/kontakt" variante="neben">
              Kostenlose Beratung anfragen
            </Knopf>
          </div>
          <div className="mt-8">
            <LocationContact cityName="Mittelhessen & Lahn-Dill-Kreis" eingebettet />
          </div>
        </Abschnitt>
      </Leitachse>

      {/* 8. ABSCHLUSS */}
      <FinalCTA
        headline="Planen Sie ein Fliesen- oder Badprojekt in Mittelhessen? Sprechen Sie direkt mit Fachbetriebsleiter Deniz Tezgel."
        subtitle="Termin vor Ort kostenfrei • Termine nach Absprache • Fachbetrieb der Handwerkskammer"
        buttonText="Termin vor Ort anfragen"
      />
    </>
  );
}
