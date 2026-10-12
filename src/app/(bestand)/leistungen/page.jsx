// Leistungen (F-01, Fusion II E-039, KERN v2): Erzählansicht nach dem Muster der Startseite, Grundgerüst A mit den Teilen
// aus B nach Gutachten u1 (`_relaunch/belege/e039-gutachten/u1-leistungen.md`). Einstieg mit Laserachse: Etiketten mit
// Fugenkreuz, H1 in text-fs-7, Vorspann mit Norm in Mono, drei Knöpfe; Randspalte ab lg Planblatt (Verlegeplan Großformat mit
// Schriftfeld) über dem Sprungindex, mobil zuerst der Index, dann das Planblatt. Danach die Leitachse über die Abschnitte:
// Fachgewerke als 2×2-Feldraster (Gewerke: je Leistung ihr Verlegeplan mit SIG-3, Nummer, Name, Text, Merkmale im Aufklapper,
// zwei Wege), Ablauf mit den Planständen der Szene (SzeneAblauf, ruhig), Projekt mit Rechner, Express-Anfrage mit Funnel.
// Wortlaut, Überschriften, Links und IDs wie im Bestand (#gewerke, #express-anfrage, Leistungs-IDs), dazu aus B die Anker
// #ablauf und #kosten-rechner und benannte Bereiche. Sprungziele einheitlich nur über scroll-padding-top (96 px); kein
// content-visibility (Gutachten Rezept 9). Kein Auftritt und kein weiterer großer Moment (SIG-3 trägt der Plan je Leistung).
import dynamic from 'next/dynamic';
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
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Knopf from '@/components/kern/Knopf';
import SzeneAblauf from '@/components/kern/SzeneAblauf';
import Verlegeplan from '@/components/kern/Verlegeplan';
import Planblatt, { planfelder } from '@/components/kern/Planblatt';
import Sprungindex from '@/components/leistungen/Sprungindex';
import Gewerke from '@/components/leistungen/Gewerke';

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

// Schritte des Ablaufs aus dem Bestand (processSteps): Nummer, Untertitel, Titel, Text – wortgleich, Text als Absatz wie auf der Startseite
const schritte = processSteps.map((schritt) => ({
  nummer: schritt.step,
  // ab lg steht die Unterzeile zwei Zeilen hoch, damit die Titel der drei Stände auf einer Grundlinie liegen
  untertitel: <span className="block lg:min-h-16">{schritt.subtitle}</span>,
  titel: schritt.title,
  text: <p className="max-w-mass">{schritt.description}</p>,
}));

export default function ServiceHubPage() {
  return (
    <>
      <JsonLd schema={leistungenSchema} />

      {/* 1. EINSTIEG: zwei Etiketten mit Fugenkreuz, H1 (fs-7) an der Laserachse, Vorspann (Norm in Mono), drei Knöpfe.
          Randspalte: ab lg oben das Planblatt (Verlegeplan Großformat mit roter Achse, Schriftfeld), darunter der Sprungindex;
          mobil folgt der Index direkt auf die Knöpfe, das Planblatt danach (Gutachten u1, Kopfbereich m390).
          H1 in zwei festen Zeilen (Umbruch nach „&“): Erzählansicht in fs-7 nach K-006 und Gutachten. */}
      <Einstieg
        art="erzaehl"
        etikett={
          <>
            <span className="mr-4 inline-flex items-center gap-2 text-tinte">
              <Fugenkreuz className="size-3 shrink-0 text-strich" />
              {COMPANY_DATA.authority.shortName} Fachbetrieb
            </span>
            <span className="inline-flex items-center gap-2">
              <Fugenkreuz className="size-3 shrink-0 text-strich" />
              Aßlar &middot; Wetzlar &middot; Mittelhessen
            </span>
          </>
        }
        titel="Fliesenleger Leistungen & Fachgewerke Wetzlar"
        titelZeilen={['Fliesenleger Leistungen &', 'Fachgewerke Wetzlar']}
        vorspann={
          <p>
            Als eingetragener Fliesenleger-Fachbetrieb für Wetzlar, Aßlar und Mittelhessen bieten wir hochwertige
            Handwerksleistungen: Unsere Fachgewerke umfassen fugenarme XXL-Großformate im Badezimmer, repräsentatives
            Feinsteinzeug im Neubau sowie witterungsbeständige Außenbeläge auf Stelzlagern – mit millimetergenauer
            Präzision, normgerechter Verbundabdichtung nach{' '}
            <span className="whitespace-nowrap font-mono text-fs-2">DIN 18534</span> und konsequentem Staubschutz.
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
          <div className="flex flex-1 flex-col gap-6">
            <Sprungindex />
            <Planblatt felder={planfelder('Leistungen', 'grossformat')} className="flex-1 lg:order-first">
              <Verlegeplan plan="grossformat" ohneAchse bemassung={false} />
            </Planblatt>
          </div>
        }
      />

      <Leitachse>
        {/* 2. FACHGEWERKE als 2×2-Feldraster (#gewerke, je Leistung #<id>) */}
        <Gewerke />

        {/* 3. ABLAUF (#ablauf) mit den Planständen der Szene „Verlegeplan entsteht“ (SzeneAblauf, ruhig, ohne Scrollbindung): je
            Schritt der Plan im passenden Stand. Motiv „fugen“, damit der Plan des Einstiegs (Großformat) und die Fachgewerk-Pläne
            nicht doppelt stehen */}
        <Abschnitt
          id="ablauf"
          art="erzaehl"
          titelId="ablauf-heading"
          leitachse
          className="scroll-mt-0!"
          etikett="Ausführungs-Standards"
          titel="Ihr verlässlicher Weg zum neuen Traumbelag"
        >
          <SzeneAblauf plan="fugen" bewegt={false} untertitelOben schritte={schritte} />
        </Abschnitt>

        {/* 4. PROJEKT (#kosten-rechner wie auf der Startseite): Vorhaben und Ausgangslage schildern, danach der Rechner */}
        <Abschnitt
          id="kosten-rechner"
          art="erzaehl"
          titelId="rechner-heading"
          leitachse
          className="scroll-mt-0!"
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
          className="scroll-mt-0!"
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
