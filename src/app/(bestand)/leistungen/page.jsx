// /leistungen (S-01, KERN v2, Erzählansicht nach dem Vorbild der Startseite): Einstieg an der Laserachse mit Sprungindex der
// Fachgewerke · vier Plan-Felder mit gezeichneter Vignette, Seiten im Wechsel (#gewerke, je Leistung #<id>) · Ablauf als
// Schrittfolge · Projektanfrage (Preisrechner) · Express-Anfrage (#express-anfrage) · Abschluss.
// Flächen: Einstieg und Gewerke auf Kalk (Felder Fliese) · Ablauf Fliese · Projektanfrage Kalk · Express-Anfrage Fliese · Abschluss Tinte.
// Kein großer Moment in S-01 (SIG-3 folgt in S-11 auf den Plan-Feldern). Server-Komponente; Client-Inseln sind nur die
// Formulare. Überschriften, Texte, Links, Anker und JSON-LD wortgleich wie im Bestand; Metadaten im `layout.tsx` der Route.
import { SERVICES } from '@/config/services';
import { COMPANY_DATA, processSteps } from '@/config/company';
import { buildGraph, buildBreadcrumbNode, buildWebPageNode, SITE_URL } from '@/lib/schema';
import JsonLd from '@/components/seo/JsonLd';
import TezgelAnfrageFunnel from '@/components/funnels/TezgelAnfrageFunnel';
import PricingCalculator from '@/components/pricing/PricingCalculator';
import FinalCTA from '@/components/ui/FinalCTA';
import WhatsAppLogo from '@/components/ui/WhatsAppLogo';
import Einstieg from '@/components/kern/Einstieg';
import Abschnitt from '@/components/kern/Abschnitt';
import Knopf from '@/components/kern/Knopf';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Schrittfolge from '@/components/kern/Schrittfolge';
import Sprungindex from '@/components/leistungen/Sprungindex';
import Gewerke from '@/components/leistungen/Gewerke';

const pageUrl = `${SITE_URL}/leistungen`;
const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Leistungen', path: '/leistungen' },
];

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

export default function ServiceHubPage() {
  const { authority, contact } = COMPANY_DATA;

  return (
    <>
      <JsonLd schema={leistungenSchema} />

      {/* 1. EINSTIEG an der Laserachse: beide Bestands-Etiketten in einer Mono-Zeile, H1, Vorspann, drei Wege; rechts der
          Sprungindex der vier Fachgewerke */}
      <Einstieg
        etikett={
          <>
            <span className="mr-4 inline-flex items-center gap-2 text-tinte">
              <Fugenkreuz className="size-3 text-strich" />
              {authority.shortName} Fachbetrieb
            </span>
            <span className="inline-flex items-center gap-2">
              <Fugenkreuz className="size-3 text-strich" />
              Aßlar &middot; Wetzlar &middot; Mittelhessen
            </span>
          </>
        }
        titel={
          <>
            Fliesenleger Leistungen &amp;{' '}
            <span>Fachgewerke Wetzlar</span>
          </>
        }
        vorspann={
          <p className="text-fs-3">
            Als eingetragener Fliesenleger-Fachbetrieb für Wetzlar, Aßlar und Mittelhessen bieten wir hochwertige Handwerksleistungen: Unsere Fachgewerke umfassen fugenarme XXL-Großformate im Badezimmer, repräsentatives Feinsteinzeug im Neubau sowie witterungsbeständige Außenbeläge auf Stelzlagern – mit millimetergenauer Präzision, normgerechter Verbundabdichtung nach{' '}
            <span className="whitespace-nowrap font-mono text-fs-2">DIN 18534</span> und konsequentem Staubschutz.
          </p>
        }
        aktionen={
          <>
            <Knopf href="#express-anfrage" icon="pfeil-rechts">
              Vor-Ort-Aufmaß vereinbaren
            </Knopf>
            <Knopf href={contact.whatsappLink} extern variante="neben" vorne={<WhatsAppLogo className="size-5 shrink-0" />}>
              WhatsApp Schnellkontakt
            </Knopf>
            <Knopf href={`tel:${contact.phoneLink}`} variante="neben" iconLinks="telefon">
              <span className="font-mono font-normal">{contact.phone}</span>
            </Knopf>
          </>
        }
        rand={<Sprungindex />}
      />

      {/* 2. FACHGEWERKE: vier Plan-Felder, Vignette und Text im Wechsel */}
      <Gewerke />

      {/* 3. ABLAUF als Schrittfolge (waagrecht ab lg) */}
      <Abschnitt id="ablauf" flaeche="fliese" etikett="Ausführungs-Standards" titel="Ihr verlässlicher Weg zum neuen Traumbelag">
        <Schrittfolge
          ausrichtung="waagrecht"
          untertitelOben
          schritte={processSteps.map((step) => ({
            nummer: step.step,
            untertitel: step.subtitle,
            titel: step.title,
            text: step.description,
          }))}
        />
      </Abschnitt>

      {/* 4. PROJEKTANFRAGE & SITUATIONSSCHILDERUNG (wie Abschnitt 4 der Startseite) */}
      <Abschnitt
        id="kosten-rechner"
        titelId="rechner-heading"
        etikett="Projekt & Ausgangslage"
        titel="Projekt anfragen & Situation schildern"
        einleitung={
          <p>
            Geben Sie uns einen ersten Einblick in Ihr Vorhaben vor Ort für eine fundierte Einschätzung durch Fachbetriebsleiter Deniz Tezgel.
          </p>
        }
      >
        <PricingCalculator />
      </Abschnitt>

      {/* 5. EXPRESS-ANFRAGE: Kopf links, Assistent rechts (wie auf der Startseite) */}
      <Abschnitt
        id="express-anfrage"
        titelId="anfrage-heading"
        flaeche="fliese"
        kopf="seitlich"
        etikett="Online-Bedarfsabfrage"
        titel="Fordern Sie Ihr persönliches Angebot an"
        einleitung={<p>Wählen Sie Ihr Vorhaben in Aßlar, Wetzlar oder Hessen für ein kostenfreies Vor-Ort-Aufmaß.</p>}
      >
        <TezgelAnfrageFunnel />
      </Abschnitt>

      {/* 6. ABSCHLUSS */}
      <FinalCTA />
    </>
  );
}
