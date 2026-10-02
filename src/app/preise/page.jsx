import React from "react";
import Link from "next/link";
import {
  Calculator,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Phone,
  MessageSquare,
  Sparkles,
  Layers,
  Droplets,
  Sun,
  Ruler
} from "lucide-react";
import { siteConfig } from "@/lib/config";
import { createMetadata } from "@/lib/metadata";
import PriceCard from "@/components/pricing/PriceCard";
import { PricingCalculator } from "@/components/pricing/PricingCalculator";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { FinalCTA } from "@/components/ui/FinalCTA";

export const metadata = createMetadata({
  title: "Preise & Kostenkalkulator – Fliesenverlegung & Badsanierung",
  description:
    "Transparente Preise für Fliesenverlegung, XXL-Großformate, Badsanierung und Terrassenbeläge in Aßlar, Wetzlar und Mittelhessen. Berechnen Sie Ihre Kosten online.",
  path: "/preise"
});

export default function PreisePage() {
  return (
    <div className="pt-36 pb-24 min-h-screen relative overflow-hidden">
      {/* Ambient Lighting Orbs */}
      <div className="ambient-glow-orange -top-24 -left-24 opacity-70" />
      <div className="ambient-glow-red top-96 -right-24 opacity-60" />

      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10">
        <div className="ceramic-hero rounded-2xl p-8 sm:p-14 text-center space-y-5 relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="eyebrow">
              <Calculator className="w-3.5 h-3.5" />
              100% Preistransparenz
            </span>
            <span className="eyebrow eyebrow-red">
              Verbindliche Festpreisangebote
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-neutral-900 tracking-tight leading-tight">
            Transparente Preise &amp;{" "}
            <span className="text-ceramic-gradient">Kostenrechner</span>
          </h1>

          <p className="text-sm sm:text-base text-neutral-700 max-w-3xl mx-auto leading-relaxed">
            Keine versteckten Nebenkosten, keine bösen Überraschungen: Bei {siteConfig.company.name} erhalten Sie nach einem kostenfreien Vor-Ort-Aufmaß ein verbindliches Festpreisangebot mit detaillierter Leistungsaufstellung. Nutzen Sie unseren interaktiven Rechner für eine erste Orientierung.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a href="#kalkulator" className="btn-primary">
              <span>Online-Rechner starten</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={siteConfig.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-button-whatsapp text-sm"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>WhatsApp Schnellkontakt</span>
            </a>
            <a href={siteConfig.contact.phone.link} className="btn-ghost">
              <Phone className="w-4 h-4 text-orange-700" />
              <span>{siteConfig.contact.phone.formatted}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Price Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="eyebrow mb-3">Leistungspakete im Überblick</span>
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
            Richtpreise unserer Fachgewerke
          </h2>
          <p className="text-sm text-neutral-700 mt-2">
            Verlässliche Orientierungswerte für Arbeitsleistung und Standard-Verlegematerialien.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <PriceCard
            title="Boden & Wand Standard"
            price={48}
            description="Fliesenverlegung in Standardformaten bis 60x60 cm in Küche, Flur oder Keller."
            features={[
              "Formate bis 60x60 cm",
              "Flexibler C2-TE Fliesenkleber",
              "Fugenbild nach Absprache",
              "Fachgerechte Randsockel",
              "Besenreine Übergabe"
            ]}
            ctaText="Angebot anfragen"
            ctaHref="/kontakt"
          />

          <PriceCard
            title="XXL-Großformate"
            price={85}
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
            ctaHref="/kontakt"
          />

          <PriceCard
            title="Bad-Sanierung"
            price={75}
            description="Komplettes Badezimmer inkl. normgerechter DIN 18534 Abdichtung und Duschgefälle."
            features={[
              "Norm-Abdichtung DIN 18534",
              "Gefälleausbildung Walk-In Dusche",
              "Dichtmanschetten für Armaturen",
              "Schimmelresistente Premiumfugen",
              "Staubschutz im Wohnbereich"
            ]}
            ctaText="Badsanierung anfragen"
            ctaHref="/bad/badanfrage"
          />

          <PriceCard
            title="Balkon & Terrasse"
            price={65}
            description="Witterungsbeständige 2-cm-Keramikplatten auf höhenverstellbaren Stelzlagern."
            features={[
              "2 cm Feinsteinzeug-Platten",
              "Höhenverstellbare Stelzlager",
              "Perfekte Unterlüftung & Drainage",
              "Frost- & tausalzbeständig",
              "Rutschhemmung R11"
            ]}
            ctaText="Terrasse anfragen"
            ctaHref="/balkon-terrasse"
          />
        </div>
      </div>

      {/* Interactive Pricing Calculator */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 relative z-10 scroll-mt-28" id="kalkulator">
        <PricingCalculator />
      </div>

      {/* Trust & Guarantee Highlights */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 relative z-10">
        <div className="glass-surface rounded-2xl p-8 sm:p-12 border border-neutral-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center mx-auto md:mx-0">
                <Ruler className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900">Kostenfreies Vor-Ort-Aufmaß</h3>
              <p className="text-sm text-neutral-700 leading-relaxed">
                Vor jedem Angebot begutachtet Meister {siteConfig.company.owner.fullName} Ihre Räume persönlich, prüft den Untergrund und nimmt exakte Maße.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center mx-auto md:mx-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900">Verbindliche Festpreisgarantie</h3>
              <p className="text-sm text-neutral-700 leading-relaxed">
                Der vereinbarte Preis ist garantiert. Es gibt bei uns keine nachträglichen Überraschungen oder unklare Stundenlohnabrechnungen.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center mx-auto md:mx-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900">DIN &amp; Gewährleistung</h3>
              <p className="text-sm text-neutral-700 leading-relaxed">
                Volle 5 Jahre VOB-Gewährleistung auf alle Verlege- und Abdichtungsarbeiten nach den strengen Richtlinien der Handwerkskammer Wiesbaden.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing FAQs */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="eyebrow mb-3">Häufige Fragen zu den Kosten</span>
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
            Transparente Antworten zur Kalkulation
          </h2>
        </div>

        <div className="space-y-4">
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
      </div>

      {/* Final Conversion CTA */}
      <FinalCTA />
    </div>
  );
}
