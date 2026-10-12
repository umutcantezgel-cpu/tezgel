// Preise (S-26, KERN v2, Arbeitsansicht nach /kontakt): kompakter Einstieg (zwei Etiketten mit Fugenkreuz, H1 text-fs-6,
// Vorspann, drei Wege), danach die Leistungspakete als Feldraster (PriceCard: Preis in Mono, Zeilen fluchten über die Felder),
// die Projektanfrage (#anfrage, Rechner nachgeladen mit Platzhalter), die drei Zusagen als Feldraster, die Kostenfragen
// (FAQAccordion unverändert, Kopf seitlich) und der Abschluss ohne Achse. Kein großer Moment, kein Rot, Flächen
// Kalk · Kalk · Fliese · Kalk · Fliese · Kalk. Überschriften, Texte, Links, IDs (#anfrage), Metadaten und Lesefolge wie im
// Bestand; Sprungziel #anfrage nur über scroll-padding-top (kein eigenes scroll-mt).
import dynamic from 'next/dynamic';
import { siteConfig } from '@/lib/config';
import { createMetadata } from '@/lib/metadata';
import FormularPlatzhalter from '@/components/funnels/TezgelAnfrageFunnel/Platzhalter';
import PriceCard from '@/components/pricing/PriceCard';
import FAQAccordion from '@/components/ui/FAQAccordion';
import { FinalCTA } from '@/components/ui/FinalCTA';
import WhatsAppLogo from '@/components/ui/WhatsAppLogo';
import Einstieg from '@/components/kern/Einstieg';
import Abschnitt from '@/components/kern/Abschnitt';
import Knopf from '@/components/kern/Knopf';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import { Feldraster, Feld } from '@/components/kern/Feldraster';

// Rechner nachgeladen wie auf der Startseite (Tempo, E4-NACH-17); ohne JavaScript bleibt der Platzhalter mit Anruf,
// WhatsApp und E-Mail stehen (R-01b)
const PricingCalculator = dynamic(() => import('@/components/pricing/PricingCalculator'), {
  loading: () => <FormularPlatzhalter />,
});

export const metadata = createMetadata({
  title: "Fliesenleger Preise auf Anfrage | Festpreisangebote · Tezgel",
  description:
    "Preise für Fliesenverlegung, XXL-Fliesen & Badsanierung in Wetzlar & Aßlar auf Anfrage. Schildern Sie Ihr Vorhaben für ein verbindliches Festpreisangebot!",
  path: "/preise"
});

export default function PreisePage() {
  return (
    <>
      {/* 1. EINSTIEG: Etiketten (vormals Badges) in Mono mit Fugenkreuz, H1, Vorspann, Hauptknopf zur Anfrage, WhatsApp und Telefon */}
      <Einstieg
        art="arbeit"
        etikett={
          <>
            <span className="mr-4 inline-flex items-center gap-2 text-tinte">
              <Fugenkreuz className="size-3 shrink-0 text-strich" />
              Preise auf Anfrage
            </span>
            <span className="inline-flex items-center gap-2">
              <Fugenkreuz className="size-3 shrink-0 text-strich" />
              Verbindliche Festpreisgarantie
            </span>
          </>
        }
        titel={<>Kosten &amp; Preise auf Anfrage – Verbindliche Festpreise</>}
        vorspann={
          <p>
            Jedes Fliesen- und Badprojekt ist ein Unikat mit individuellen Untergründen, Raummaßen und Gestaltungswünschen. Bei {siteConfig.company.name} erhalten Sie nach einem kostenfreien Vor-Ort-Aufmaß ein detailliertes und verbindliches Festpreisangebot – garantiert ohne versteckte Nebenkosten.
          </p>
        }
        aktionen={
          <>
            <Knopf href="#anfrage" icon="pfeil-rechts">
              Projektanfrage starten
            </Knopf>
            <Knopf
              href={siteConfig.contact.whatsappLink}
              extern
              variante="neben"
              vorne={<WhatsAppLogo className="size-5 shrink-0" />}
            >
              WhatsApp Schnellkontakt
            </Knopf>
            <Knopf href={siteConfig.contact.phone.link} variante="neben" iconLinks="telefon">
              <span className="font-mono font-normal">{siteConfig.contact.phone.formatted}</span>
            </Knopf>
          </>
        }
      />

      {/* 2. LEISTUNGSPAKETE als Feldraster: vier Felder, ab lg in einer Reihe; Preise in Mono */}
      <Abschnitt
        art="arbeit"
        id="leistungspakete"
        titelId="leistungspakete-heading"
        etikett="Leistungspakete im Überblick"
        titel="Unsere Fachgewerke"
        einleitung={
          <p className="max-w-mass">
            Fachmännische Ausführung von der Untergrundvorbereitung bis zur perfekten Fuge – verbindliches Angebot nach Aufmaß.
          </p>
        }
      >
        <Feldraster spalten={4}>
          <PriceCard
            als="li"
            title="Boden & Wand Standard"
            price="Auf Anfrage"
            priceSubtitle="Individuelles Angebot"
            description="Fliesenverlegung in Standardformaten bis 60x60 cm in Küche, Flur oder Keller."
            features={[
              "Formate bis 60x60 cm",
              "Flexibler C2-TE Fliesenkleber",
              "Fugenbild nach Absprache",
              "Fachgerechte Randsockel",
              "Besenreine Übergabe"
            ]}
            ctaText="Angebot anfragen"
            ctaHref="#anfrage"
          />

          <PriceCard
            als="li"
            title="XXL-Großformate"
            price="Auf Anfrage"
            priceSubtitle="Individuelles Angebot"
            description="Fugenarme Luxusbeläge von 120x60 cm bis 120x260 cm mit Spezialhebetechnik."
            features={[
              "Formate bis 120x260 cm",
              "Spezial-Vakuumhebetechnik",
              "Nivelliersystem ohne Überzähne",
              "Hochflexibler S1/S2 Kleber",
              "Milimetergenaue Gehrungsschnitte"
            ]}
            isPopular={true}
            ctaText="Großformat anfragen"
            ctaHref="#anfrage"
          />

          <PriceCard
            als="li"
            title="Bad-Sanierung"
            price="Auf Anfrage"
            priceSubtitle="Individuelles Angebot"
            description="Komplettes Badezimmer inkl. normgerechter DIN 18534 Abdichtung und Duschgefälle."
            features={[
              "Norm-Abdichtung DIN 18534",
              "Gefälleausbildung Walk-In Dusche",
              "Dichtmanschetten für Armaturen",
              "Schimmelresistente Premiumfugen",
              "Staubschutz im Wohnbereich"
            ]}
            ctaText="Badsanierung anfragen"
            ctaHref="#anfrage"
          />

          <PriceCard
            als="li"
            title="Balkon & Terrasse"
            price="Auf Anfrage"
            priceSubtitle="Individuelles Angebot"
            description="Witterungsbeständige 2-cm-Keramikplatten auf höhenverstellbaren Stelzlagern."
            features={[
              "2 cm Feinsteinzeug-Platten",
              "Höhenverstellbare Stelzlager",
              "Perfekte Unterlüftung & Drainage",
              "Frost- & tausalzbeständig",
              "Rutschhemmung R11"
            ]}
            ctaText="Terrasse anfragen"
            ctaHref="#anfrage"
          />
        </Feldraster>
      </Abschnitt>

      {/* 3. PROJEKTANFRAGE (#anfrage, Sprungziel aus Einstieg und Paketen): Rechner unverändert; ohne spaet (Formular) */}
      <Abschnitt art="arbeit" id="anfrage" flaeche="fliese">
        <PricingCalculator />
      </Abschnitt>

      {/* 4. ZUSAGEN als Feldraster: drei Felder (ab lg eine Reihe; md zwei Spalten, das dritte Feld über beide) */}
      <Abschnitt art="arbeit" spaet>
        <Feldraster spalten={3}>
          <Feld>
            <h3 className="text-fs-4 text-tinte">Kostenfreies Vor-Ort-Aufmaß</h3>
            <p className="mt-2 text-fs-2 text-tinte-2">
              Vor jedem Angebot begutachtet Inhaber {siteConfig.company.owner.fullName} Ihre Räume persönlich, prüft den Untergrund und nimmt exakte Maße.
            </p>
          </Feld>

          <Feld>
            <h3 className="text-fs-4 text-tinte">Verbindliche Festpreisgarantie</h3>
            <p className="mt-2 text-fs-2 text-tinte-2">
              Der vereinbarte Preis ist garantiert. Es gibt bei uns keine nachträglichen Überraschungen oder unklare Stundenlohnabrechnungen.
            </p>
          </Feld>

          <Feld spanne={2} className="lg:col-span-1">
            <h3 className="text-fs-4 text-tinte">DIN &amp; Gewährleistung</h3>
            <p className="mt-2 text-fs-2 text-tinte-2">
              Volle 5 Jahre VOB-Gewährleistung auf alle Verlege- und Abdichtungsarbeiten nach den strengen Richtlinien der Handwerkskammer Wiesbaden.
            </p>
          </Feld>
        </Feldraster>
      </Abschnitt>

      {/* 5. KOSTENFRAGEN: Kopf seitlich, Fragen rechts (FAQAccordion unverändert) */}
      <Abschnitt
        art="arbeit"
        id="kostenfragen"
        titelId="kostenfragen-heading"
        flaeche="fliese"
        kopf="seitlich"
        etikett="Häufige Fragen zu den Kosten"
        titel="Transparente Antworten zur Kalkulation"
      >
        <div>
          <FAQAccordion
            question="Wie setzen sich die Gesamtkosten einer Fliesenverlegung zusammen?"
            answer="Die Kosten bestehen aus: 1. Untergrundvorbereitung (Prüfen, Schleifen, Grundieren, Ausgleichen), 2. Verbundabdichtung (besonders im Bad nach DIN 18534), 3. Verlegearbeit & Kleber (Formatabhängig), 4. Verfugung & Silikonanschlussfugen sowie 5. ggf. Zuschnitt- und Profilzulagen."
          />
          <FAQAccordion
            question="Warum sind XXL-Großformate teurer in der Verlegung?"
            answer="Großformate (z. B. 120x120 cm oder 120x260 cm) wiegen oft 30–50 kg pro Fliese und erfordern 2 Handwerker pro Platte, Spezial-Vakuumheber, millimetergenau geebnete Untergründe (Toleranzen unter 1 mm) und aufwändige Schnitttechnik."
          />
          <FAQAccordion
            question="Ist das Vor-Ort-Aufmaß wirklich unverbindlich und kostenfrei?"
            answer="Ja! Im Umkreis von 45 km rund um Aßlar und Wetzlar kommen wir kostenfrei zu Ihnen, vermessen die Räume und beraten Sie fundiert vor Ort, bevor ein schriftliches Angebot erstellt wird."
          />
          <FAQAccordion
            question="Gibt es staatliche Fördermöglichkeiten oder Steuererleichterungen?"
            answer="Ja! 20 % der reinen Handwerker-Arbeitskosten (bis zu 1.200 € pro Jahr) können Sie direkt von der Einkommensteuer absetzen. Bei barrierefreien Bädern gewährt die Pflegekasse zudem bis zu 4.180 € Zuschuss pro pflegebedürftiger Person."
          />
        </div>
      </Abschnitt>

      {/* 6. ABSCHLUSS (Arbeitsansicht: ohne Achse) */}
      <FinalCTA achse={false} />
    </>
  );
}
