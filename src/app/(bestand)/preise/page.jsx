// Preise (S-26, KERN v2, Arbeitsansicht nach /kontakt): kompakter Einstieg (zwei Etiketten mit Fugenkreuz, H1 text-fs-6,
// Vorspann, drei Wege), danach die Leistungspakete als Feldraster (PriceCard: Preis in Mono, Zeilen fluchten über die Felder),
// die Projektanfrage (#anfrage, Rechner nachgeladen mit Platzhalter), die drei Zusagen als Feldraster, die Kostenfragen
// (FAQAccordion unverändert, Kopf seitlich) und der Abschluss ohne Achse. Kein großer Moment, kein Rot, Flächen
// Kalk · Kalk · Fliese · Kalk · Fliese · Kalk. Überschriften, Texte, Links, IDs (#anfrage), Metadaten und Lesefolge wie im
// Bestand; Sprungziel #anfrage nur über scroll-padding-top (kein eigenes scroll-mt).
// E4-W1-FORMULARE (F5): Texte in Alltagssprache (kurze Sätze, keine Gedankenstriche, Bindestrichwörter aufgelöst, Floskeln
// raus); Fachwörter mit Baustein Fachwort beim ersten Vorkommen; Bereiche mit Fließtext in hyphens-auto, damit lange Wörter
// bei 200 % Schrift trennen. Firmendaten, Preise, Versprechen und rechtliche Angaben bleiben inhaltlich gleich (G8, M-07).
import dynamic from 'next/dynamic';
import { siteConfig } from '@/lib/config';
import { createMetadata } from '@/lib/metadata';
import { RATING_SUMMARY } from '@/config/reviews';
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
import { Schritte } from '@/components/vorlagen/teile/Ablauf';
import Fachwort from '@/components/kern/Fachwort';

// Rechner nachgeladen wie auf der Startseite (Tempo, E4-NACH-17); ohne JavaScript bleibt der Platzhalter mit Anruf,
// WhatsApp und E-Mail stehen (R-01b)
const PricingCalculator = dynamic(() => import('@/components/pricing/PricingCalculator'), {
  loading: () => <FormularPlatzhalter />,
});

export const metadata = createMetadata({
  title: "Fliesenleger Preise auf Anfrage | Festpreisangebote · Tezgel",
  description:
    "Preise für Fliesenverlegung, große Fliesen & Badsanierung in Wetzlar & Aßlar auf Anfrage. Schildern Sie Ihr Vorhaben für ein verbindliches Festpreisangebot!",
  path: "/preise"
});

// Die drei Schritte wie auf den Orts- und Hauptansichten (Termin kostenfrei: K-015 F-12)
const ABLAUF = [
  { titel: 'Termin bei Ihnen vor Ort', text: 'Deniz Tezgel kommt zu Ihnen. Er schaut sich den Raum genau an und prüft Boden und Wände. Dieser Termin ist für Sie kostenfrei.' },
  { titel: 'Planen und auswählen', text: 'Sie suchen mit uns Fliesen, ihre Größe und die Farbe der Fugen aus. Danach bekommen Sie ein Angebot mit festem Preis.' },
  { titel: 'Verlegen und übergeben', text: 'Wir verlegen sauber und übergeben den Raum besenrein. Zum Schluss gehen wir alles gemeinsam durch.' },
];

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
        titel={<>Kosten &amp; Preise auf Anfrage. Verbindliche Festpreise.</>}
        vorspann={
          <p className="hyphens-auto">
            Jedes Fliesen- und Badprojekt ist ein Unikat. Es hat eigene <Fachwort id="untergrund">Untergründe</Fachwort>, Raummaße und Gestaltungswünsche. Nach einem kostenfreien Aufmaß vor Ort erhalten Sie bei {siteConfig.company.name} ein detailliertes und verbindliches Festpreisangebot. Das Angebot kommt garantiert ohne versteckte Nebenkosten.
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

      {/* 1b. ABLAUF direkt unter dem Einstieg (E4-W0-WEGE, E-062): Das Menü „Ablauf und Kosten“ führt hierher; Ablauf und
          kostenfreier Termin standen bisher erst weit unten (Probeläufe E3, Aufgabe A5). Treppe wie auf den Hauptansichten. */}
      <Abschnitt art="arbeit" id="ablauf" titel="So läuft es ab.">
        <Schritte schritte={ABLAUF} />
      </Abschnitt>

      {/* 2. LEISTUNGSPAKETE als Feldraster: vier Felder, ab lg in einer Reihe; Preise in Mono */}
      <Abschnitt
        art="arbeit"
        id="leistungspakete"
        titelId="leistungspakete-heading"
        etikett="Leistungspakete im Überblick"
        titel="Unsere Fachgewerke"
        einleitung={
          <p className="max-w-mass">
            Fachmännische Ausführung von der Vorbereitung der Flächen bis zur sauberen Fuge. Verbindliches Angebot nach dem Aufmaß.
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
              "Flexibler Fliesenkleber, Klasse C2 TE",
              "Fugenbild nach Absprache",
              "Fachgerechte Randsockel",
              "Besenreine Übergabe"
            ]}
            ctaText="Angebot anfragen"
            ctaHref="#anfrage"
          />

          <PriceCard
            als="li"
            title="Große Fliesen ab 120 cm"
            price="Auf Anfrage"
            priceSubtitle="Individuelles Angebot"
            description="Fugenarme Luxusbeläge als [[grossformat|Großformate]] von 120x60 cm bis 120x260 cm, mit Spezialhebetechnik."
            features={[
              "Formate bis 120x260 cm",
              "[[vakuumhebetechnik|Vakuumhebetechnik]] für schwere Platten",
              "[[nivelliersystem|Nivelliersystem]] ohne überstehende Kanten",
              "Hochflexibler S1/S2 Kleber",
              "Millimetergenaue Gehrungsschnitte"
            ]}
            isPopular={true}
            ctaText="Großformat anfragen"
            ctaHref="#anfrage"
          />

          <PriceCard
            als="li"
            title="Badsanierung"
            price="Auf Anfrage"
            priceSubtitle="Individuelles Angebot"
            description="Komplettes Badezimmer, abgedichtet nach [[din-18534|DIN 18534]], mit Duschgefälle."
            features={[
              "Normgerechte [[abdichtung|Abdichtung]]",
              "Dusche ohne Stufe, mit richtig geneigtem Boden",
              "[[dichtband|Dichtmanschetten]] für Armaturen",
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
            description="Witterungsbeständige Keramikplatten, 2 cm dick, auf höhenverstellbaren [[stelzlager|Stelzlagern]]."
            features={[
              "2 cm dicke Platten aus [[feinsteinzeug|Feinsteinzeug]]",
              "Höhenverstellbare Stelzlager",
              "Gute Unterlüftung und Wasserablauf",
              "Frost- & tausalzbeständig",
              "[[rutschhemmung|Rutschhemmung]] R11"
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
            <h3 className="text-fs-4 text-tinte">Kostenfreies Aufmaß vor Ort</h3>
            <p className="mt-2 text-fs-2 text-tinte-2">
              Vor jedem Angebot begutachtet Inhaber {siteConfig.company.owner.fullName} Ihre Räume persönlich, prüft Boden und Wände und nimmt exakte Maße.
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
              Volle 5 Jahre Gewährleistung nach VOB auf alle Verlege- und Abdichtungsarbeiten nach den strengen Richtlinien der Handwerkskammer Wiesbaden.
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
        {/* hyphens-auto: lange Wörter in Fragen und Antworten trennen sich bei 200 % Schrift, statt unter das Plus zu laufen */}
        <div className="hyphens-auto">
          <FAQAccordion
            question="Wie setzen sich die Gesamtkosten einer Fliesenverlegung zusammen?"
            answer="Die Kosten setzen sich aus fünf Teilen zusammen. Erstens die Vorbereitung der Flächen mit Prüfen, Schleifen, Grundieren und Ausgleichen. Zweitens die Abdichtung im Bad nach DIN 18534, drittens Verlegung und Kleber je nach Format. Viertens das Verfugen mit Anschlussfugen aus Silikon und fünftens, wenn nötig, Zulagen für Zuschnitt und Profile."
          />
          <FAQAccordion
            question="Warum sind Großformate teurer in der Verlegung?"
            answer="Großformate (z. B. 120x120 cm oder 120x260 cm) wiegen oft 30 bis 50 kg pro Fliese. Sie brauchen zwei Handwerker pro Platte, einen Vakuumheber, millimetergenau geebnete Flächen mit Toleranzen unter 1 mm und aufwändige Schnitttechnik."
          />
          <FAQAccordion
            question="Ist der Termin vor Ort wirklich unverbindlich und kostenfrei?"
            answer="Ja! Im Umkreis von 45 km rund um Aßlar und Wetzlar kommen wir kostenfrei zu Ihnen. Wir vermessen die Räume und beraten Sie fundiert vor Ort. Danach bekommen Sie ein schriftliches Angebot."
          />
          <FAQAccordion
            question="Gibt es staatliche Fördermöglichkeiten oder Steuererleichterungen?"
            answer="Ja! 20 % der reinen Arbeitskosten des Handwerks (bis zu 1.200 € pro Jahr) können Sie direkt von der Einkommensteuer absetzen. Bei Umbauten im Bad für mehr Barrierefreiheit gewährt die Pflegekasse zudem bis zu 4.180 € Zuschuss pro pflegebedürftiger Person."
          />
        </div>
      </Abschnitt>

      {/* 6. ABSCHLUSS (Arbeitsansicht: ohne Achse). Titel und Wege wie im Bestand; Texte ohne Bindestrichwörter (K-010) */}
      {/* Überschrift trennt lange Wörter (Fachbetriebsleiter) bei 200 %: die Schrift der Überschrift setzt hyphens: manual, daher hier ausdrücklich */}
      <FinalCTA
        achse={false}
        className="[&_h2]:hyphens-auto [&_h2]:[hyphenate-limit-chars:10_4_4]"
        benefits={[
          "Kostenfreies Aufmaß vor Ort in Aßlar, Wetzlar und Hessen",
          "Verbindlicher Festpreis ohne versteckte Kosten",
          "Saubere Baustelle mit garantiertem Staubschutz",
        ]}
        subtitle="Schnelle Reaktionszeit • Persönliche Betreuung vor Ort • Fachbetrieb der Handwerkskammer"
        socialProof={`${RATING_SUMMARY.google.displayRating} Bewertung bei Google von ${RATING_SUMMARY.google.count} echten Kundenstimmen`}
      />
    </>
  );
}
