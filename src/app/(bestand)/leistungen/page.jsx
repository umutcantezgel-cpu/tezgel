// Leistungen (E3-BAU-02, KERN v2): Erzählansicht nach dem Muster der Startseite. Einstieg mit Laserachse, H1 links,
// Vorspann und Knöpfe, rechts ein gezeichneter Verlegeplan ohne Achse. Danach die Leitachse über die Abschnitte:
// Fachgewerke als Feldraster (je Leistung ihr Verlegeplan mit SIG-3 und Seitenwechsel, Name, Text, Merkmale, zwei Wege), Ablauf als
// Schrittfolge, Projekt mit Rechner, Express-Anfrage mit Funnel. Wortlaut, Überschriften, Links und IDs wie im Bestand
// (#gewerke, #express-anfrage, Leistungs-IDs). Kein Auftritt und kein großer Moment (setzt der Orchestrator).
import { ViewTransition } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import clsx from 'clsx';
import { SERVICES } from '@/config/services';
import { COMPANY_DATA, processSteps } from '@/config/company';
import { buildGraph, buildBreadcrumbNode, buildWebPageNode, SITE_URL } from '@/lib/schema';
import JsonLd from '@/components/seo/JsonLd';
import { PricingCalculator } from '@/components/pricing/PricingCalculator';
import { FinalCTA } from '@/components/ui/FinalCTA';
import WhatsAppLogo from '@/components/ui/WhatsAppLogo';
import Einstieg from '@/components/kern/Einstieg';
import Abschnitt from '@/components/kern/Abschnitt';
import Leitachse from '@/components/kern/Leitachse';
import { Feld, Feldraster } from '@/components/kern/Feldraster';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Knopf from '@/components/kern/Knopf';
import Schrittfolge from '@/components/kern/Schrittfolge';
import Verlegeplan from '@/components/kern/Verlegeplan';
import Planblatt, { planfelder } from '@/components/kern/Planblatt';
import { etikettKlassen, linkKlassen } from '@/components/kern/stile';

const pageUrl = `${SITE_URL}/leistungen`;
const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Leistungen', path: '/leistungen' },
];

// Express-Anfrage nachladen (Tempo, wie auf der Startseite)
const TezgelAnfrageFunnel = dynamic(() => import('@/components/funnels/TezgelAnfrageFunnel'), {
  loading: () => <p className="py-12 font-mono text-fs-1 text-tinte-2">Anfrageformular wird geladen...</p>,
});

const leistungenSchema = buildGraph([
  buildWebPageNode({
    url: pageUrl,
    name: 'Fliesenleger Leistungen Wetzlar | Fachbetrieb Tezgel',
    description:
      'Alle Fliesenleger-Leistungen von Tezgel in Wetzlar & Aßlar: Badsanierung, XXL-Großformate, Terrassen, Naturstein & Abdichtung.',
    breadcrumbItems: breadcrumbs,
  }),
  buildBreadcrumbNode(breadcrumbs, pageUrl),
  {
    '@type': 'OfferCatalog',
    '@id': `${pageUrl}#catalog`,
    name: 'Leistungen von Fliesenverlegung Tezgel',
    itemListElement: SERVICES.map((service) => ({
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'EUR',
      priceValidUntil: '2026-12-31',
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}/termin`,
      itemOffered: {
        '@type': 'Service',
        name: service.name,
        description: service.shortDescription,
        url: `${SITE_URL}/leistungen/${service.id}`,
      },
    })),
  },
]);

// Schritte des Ablaufs aus dem Bestand (processSteps): Nummer, Untertitel, Titel, Text
const schritte = processSteps.map((schritt) => ({
  nummer: schritt.step,
  untertitel: schritt.subtitle,
  titel: schritt.title,
  text: schritt.description,
}));

export default function ServiceHubPage() {
  return (
    <>
      <JsonLd schema={leistungenSchema} />

      {/* 1. EINSTIEG: Etikett, H1 an der Laserachse, Vorspann, Knöpfe; rechts der Verlegeplan Großformat ohne Achse */}
      <Einstieg
        art="erzaehl"
        etikett={
          <>
            <span>{COMPANY_DATA.authority.shortName} Fachbetrieb</span>
            <Fugenkreuz className="size-3 shrink-0 text-strich" />
            <span>Aßlar &middot; Wetzlar &middot; Mittelhessen</span>
          </>
        }
        titel="Fliesenleger Leistungen & Fachgewerke Wetzlar"
        vorspann={
          <p>
            Als eingetragener Fliesenleger-Fachbetrieb für Wetzlar, Aßlar und Mittelhessen bieten wir hochwertige
            Handwerksleistungen: Unsere Fachgewerke umfassen fugenarme XXL-Großformate im Badezimmer, repräsentatives
            Feinsteinzeug im Neubau sowie witterungsbeständige Außenbeläge auf Stelzlagern – mit millimetergenauer
            Präzision, normgerechter Verbundabdichtung nach DIN 18534 und konsequentem Staubschutz.
          </p>
        }
        aktionen={
          <>
            <Knopf href="#express-anfrage" icon="pfeil-rechts">
              Vor-Ort-Aufmaß vereinbaren
            </Knopf>
            <Knopf
              href={COMPANY_DATA.contact.whatsappLink}
              extern
              variante="neben"
              vorne={<WhatsAppLogo className="size-5 shrink-0" />}
            >
              WhatsApp Schnellkontakt
            </Knopf>
            <Knopf href={`tel:${COMPANY_DATA.contact.phoneLink}`} variante="neben" iconLinks="telefon">
              <span className="font-mono font-normal">{COMPANY_DATA.contact.phone}</span>
            </Knopf>
          </>
        }
        rand={
          <Planblatt felder={planfelder('Leistungen', 'grossformat')}>
            <Verlegeplan plan="grossformat" ohneAchse bemassung={false} />
          </Planblatt>
        }
      />

      <Leitachse>
        {/* 2. FACHGEWERKE als Feldraster: je Leistung ihr Verlegeplan (SIG-3), Name, Text, Merkmale und zwei Wege */}
        <Abschnitt id="gewerke" art="erzaehl" leitachse spaet>
          <Feldraster spalten={2} als="div">
            {SERVICES.map((srv) => {
              return (
                // SIG-3 (E3-ORCH-02): Verlegeplan je Leistung – das Fugenbild rückt beim Zeigen auf das Feld bzw. beim
                // Fokus auf einen seiner Links in die Flucht, mobil beim Eintritt; derselbe Plan gleitet beim Weg zu den
                // Fachdetails in den Einstieg der Leistungsseite (ViewTransition, nur vorwärts, ab lg, nicht reduziert)
                <div key={srv.id} id={srv.id} className="sig-plan-ziel flex" data-motion="sig-plan">
                  <Feld als="article" className="flex-1">
                    <ViewTransition name={`plan-${srv.id}`} share={{ 'plan-vor': 'plan-morph', default: 'none' }} default="none">
                      <div className="border border-fuge bg-kalk p-6">
                        <Verlegeplan plan={srv.id} ohneAchse bemassung={false} />
                      </div>
                    </ViewTransition>

                    <p className={clsx(etikettKlassen, 'mt-6')}>Geprüfte Fachkompetenz</p>
                    <h2 className="mt-3 text-fs-5 text-tinte">{srv.name}</h2>
                    <p className="mt-3 max-w-mass font-text text-fs-3 text-tinte-2">{srv.detailText}</p>

                    <ul className="mt-6 grid gap-2">
                      {srv.subcategories.map((sub) => (
                        <li key={sub.id} className="flex items-center gap-3 font-text text-fs-2 text-tinte">
                          <Fugenkreuz className="size-3 shrink-0 text-strich" />
                          {sub.name}
                        </li>
                      ))}
                    </ul>

                    <p className={clsx(etikettKlassen, 'mt-8')}>Ausstattungsmerkmale &amp; Vorteile:</p>
                    <ul className="mb-8 mt-3 grid gap-3">
                      {srv.features.map((merkmal) => (
                        <li key={merkmal} className="flex gap-3 font-text text-fs-2 text-tinte">
                          <span aria-hidden="true" className="flex h-6 shrink-0 items-center text-strich">
                            <Fugenkreuz className="size-3" />
                          </span>
                          <span className="min-w-0">{merkmal}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-fuge pt-6">
                      <Knopf href={`/leistungen/${srv.id}`} variante="neben" icon="pfeil-rechts" transitionTypes={['plan-vor']} className="min-w-0 sm:flex-1">
                        Fachdetails &amp; Ratgeber: {srv.name}
                      </Knopf>
                      <Link href="#express-anfrage" className={clsx(linkKlassen, 'inline-flex min-h-11 items-center font-text text-fs-2')}>
                        Aufmaß anfragen
                      </Link>
                    </div>
                  </Feld>
                </div>
              );
            })}
          </Feldraster>
        </Abschnitt>

        {/* 3. ABLAUF als Schrittfolge: Nummer, Untertitel, Titel und Text je Schritt, waagrecht ab lg */}
        <Abschnitt
          art="erzaehl"
          titelId="ablauf-heading"
          leitachse
          spaet
          etikett="Ausführungs-Standards"
          titel="Ihr verlässlicher Weg zum neuen Traumbelag"
        >
          <Schrittfolge ausrichtung="waagrecht" untertitelOben schritte={schritte} />
        </Abschnitt>

        {/* 4. PROJEKT: Vorhaben und Ausgangslage schildern, danach der Rechner */}
        <Abschnitt
          art="erzaehl"
          titelId="projekt-heading"
          leitachse
          spaet
          etikett="Projekt & Ausgangslage"
          titel="Projekt anfragen & Situation schildern"
          einleitung={
            <p>
              Geben Sie uns einen ersten Einblick in Ihr Vorhaben vor Ort für eine fundierte Einschätzung durch
              Fachbetriebsleiter Deniz Tezgel.
            </p>
          }
        >
          <PricingCalculator />
        </Abschnitt>

        {/* 5. EXPRESS-ANFRAGE: Kopf links, Assistent rechts; Anker #express-anfrage */}
        <Abschnitt
          id="express-anfrage"
          art="erzaehl"
          titelId="anfrage-heading"
          flaeche="fliese"
          kopf="seitlich"
          leitachse
          spaet
          etikett="Online-Bedarfsabfrage"
          titel="Fordern Sie Ihr persönliches Angebot an"
          einleitung={
            <p>Wählen Sie Ihr Vorhaben in Aßlar, Wetzlar oder Hessen für ein kostenfreies Vor-Ort-Aufmaß.</p>
          }
        >
          <TezgelAnfrageFunnel />
        </Abschnitt>
      </Leitachse>

      {/* 6. ABSCHLUSS */}
      <FinalCTA />
    </>
  );
}
