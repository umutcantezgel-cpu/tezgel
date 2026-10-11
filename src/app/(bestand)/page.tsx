// Startseite (Fusion E-020): Komposition aus dem blinden Abschnittsvergleich der beiden Fassungen – Einstieg
// „Planblatt“, Fachbereiche-Index, Fachgewerke-Raster, Ablauf-Zeitleiste, Großformat, Stimmen und Servicegebiet nach
// der Kern-Startseite der Relaunch-Sitzung, im KERN v2 nachgebaut (src/components/start/*); Rechner, Express-Anfrage,
// Rahmen und gemeinsame Bausteine aus dem Werkstatt-Stand. Überschriften, Fließtexte, Links und Formulare wortgleich.
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { COMPANY_DATA } from '@/config/company';
import HeroContactForm from '@/components/forms/HeroContactForm';
import TrustStrip from '@/components/trust/TrustStrip';
import GoogleReviewsBadge from '@/components/reviews/GoogleReviewsBadge';
import PricingCalculator from '@/components/pricing/PricingCalculator';
import FAQAccordion from '@/components/ui/FAQAccordion';
import FinalCTA from '@/components/ui/FinalCTA';
import Abschnitt from '@/components/kern/Abschnitt';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Einstieg from '@/components/start/Einstieg';
import Fachbereiche from '@/components/start/Fachbereiche';
import Fachgewerke from '@/components/start/Fachgewerke';
import Ablauf from '@/components/start/Ablauf';
import Grossformat from '@/components/start/Grossformat';
import Stimmen from '@/components/start/Stimmen';
import Servicegebiet from '@/components/start/Servicegebiet';
import { etikettKlassen, seitenKlassen } from '@/components/kern/stile';
import { createMetadata } from '@/lib/metadata';

const TezgelAnfrageFunnel = dynamic(() => import('@/components/funnels/TezgelAnfrageFunnel'), {
    loading: () => <p className="py-12 font-mono text-fs-1 text-tinte-2">Anfrageformular wird geladen...</p>,
});

export const metadata: Metadata = createMetadata({
    title: 'Fliesenleger Wetzlar & Aßlar | Fliesenverlegung Tezgel',
    description: 'Ihr Fliesenleger für Wetzlar & Aßlar: Badsanierung, fugenarme Großformate & Terrassen. Abdichtung DIN 18534. Jetzt kostenfreies Vor-Ort-Aufmaß anfragen!',
    path: '/',
});

const PILLAR_EYEBROWS = ['Normgerechte Sicherheit', 'Fachgerechte Ausführung', 'Wohnkomfort bei Sanierung'];

export default function HomePage() {
    const { owner } = COMPANY_DATA;

    return (
        <>
            {/* 1. EINSTIEG „Planblatt“: Verlegeplan an der Achse geschnitten, die Waage trägt H1 und Formular */}
            <Einstieg formular={<HeroContactForm />} />

            {/* VERTRAUENSZEILE: sechs Zusagen und der Google-Kennwert über zwei Felder im selben Raster */}
            <div className="border-b border-fuge bg-kalk">
                <div className={`${seitenKlassen} py-8`}>
                    <TrustStrip ende={<GoogleReviewsBadge imRaster />} />
                </div>
            </div>

            {/* 2. GARANTIEN als Zeilen an der Fuge: Etikett, Zusage, Text – oben bündig */}
            <Abschnitt id="vertrauen" aria-label="Garantien &amp; Qualitätsversprechen von Fliesenverlegung Tezgel">
                <ul className="border-t border-strich">
                    {COMPANY_DATA.trustPillars.map((pillar: { title: string; description: string }, idx: number) => (
                        <li key={pillar.title} className="grid grid-cols-4 items-start gap-x-6 gap-y-3 border-b border-fuge py-12 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-8">
                            <span className={`${etikettKlassen} col-span-4 pt-1 md:col-span-3 lg:col-span-3`}>
                                <Fugenkreuz className="size-3 text-strich" />
                                {PILLAR_EYEBROWS[idx]}
                            </span>
                            <p className="col-span-4 font-anzeige text-fs-5 font-extrabold text-tinte md:col-span-5 lg:col-span-4">{pillar.title}</p>
                            <p className="col-span-4 max-w-mass text-fs-3 text-tinte-2 md:col-span-5 md:col-start-4 lg:col-span-5 lg:col-start-auto">{pillar.description}</p>
                        </li>
                    ))}
                </ul>
            </Abschnitt>

            {/* 3. FACHBEREICHE & PLANUNGSHILFEN */}
            <Fachbereiche />

            {/* 4. PROJEKTANFRAGE & SITUATIONSSCHILDERUNG */}
            <Abschnitt
                id="kosten-rechner"
                titelId="rechner-heading"
                etikett="Umfassende Projektanfrage"
                titel="Projekt anfragen & Situation schildern"
                einleitung={
                    <p>
                        Wählen Sie Ihr geplantes Vorhaben und beschreiben Sie kurz Ihre Ausgangslage vor Ort.
                        Fachbetriebsleiter Deniz Tezgel prüft Ihre Angaben und meldet sich zeitnah für eine persönliche Abstimmung und das kostenfreie Vor-Ort-Aufmaß.
                    </p>
                }
            >
                <PricingCalculator />
            </Abschnitt>

            {/* 5. FACHGEWERKE als Feldraster mit Plan-Vignetten */}
            <Fachgewerke />

            {/* 6. ABLAUF als Zeitleiste */}
            <Ablauf />

            {/* 7. XXL-GROSSFORMATE */}
            <Grossformat />

            {/* 8. KUNDENSTIMMEN */}
            <Stimmen />

            {/* 9. EINSATZGEBIET: Orte mit Entfernung ab Aßlar neben der Karte */}
            <Servicegebiet />

            {/* 10. HÄUFIGE FRAGEN */}
            <Abschnitt
                id="faq"
                titelId="home-faq-heading"
                kopf="seitlich"
                etikett="Transparente Antworten"
                titel="Häufig gestellte Fragen zu Fliesen & Badsanierung"
                einleitung={<p>Wichtige Fragen zu Kosten, DIN 18534 Abdichtung, Staubschutz und dem Ablauf vor Ort.</p>}
            >
                <div>
                    <FAQAccordion
                        question="Was kostet eine professionelle Fliesenverlegung oder Badsanierung?"
                        answer="Die Kosten richten sich nach Format, Material und Zustand des Untergrunds. Nach dem kostenfreien Vor-Ort-Aufmaß in Aßlar, Wetzlar oder Hessen erhalten Sie eine transparente Kostenaufstellung nach Quadratmetern und Arbeitsaufwand – als verbindliches Festpreisangebot."
                    />
                    <FAQAccordion
                        question="Wie garantieren Sie den Staubschutz bei bewohnten Sanierungen?"
                        answer="Wir setzen moderne Staubschutztüren, Unterdruck-Luftreiniger und saugfähige Schutzvliese ein. So bleibt der Feinstaub im Arbeitsbereich und Ihre übrigen Wohnräume bleiben sauber und bewohnbar."
                    />
                    <FAQAccordion
                        question="Warum ist die Verbundabdichtung nach DIN 18534 im Bad unverzichtbar?"
                        answer="Normgerechte Verbundabdichtung nach DIN 18534 mit Dichtbändern und Dichtmanschetten schützt das Mauerwerk und den Estrich dauerhaft vor Feuchteschäden, Wassereintritt und Schimmelbildung – besonders in bodengleichen Walk-In-Duschen."
                    />
                    <FAQAccordion
                        question="Verlegen Sie auch XXL-Großformate planeben ohne Überzähne?"
                        answer="Ja! Wir nutzen modernste Nivelliersysteme und Vakuum-Hebetechnik für millimetergenaue Großformatverlegung (z. B. 120x120 cm oder 120x260 cm) mit minimalen, harmonischen Fugenachsen."
                    />
                    <FAQAccordion
                        question="Wie schnell erhalten wir einen Termin zum Aufmaß vor Ort?"
                        answer="In der Regel vereinbaren wir binnen 24 bis 48 Stunden einen passenden Termin direkt bei Ihnen vor Ort in Aßlar, Wetzlar, Gießen oder Mittelhessen."
                    />
                </div>
            </Abschnitt>

            {/* 11. EXPRESS-ANFRAGE: Kopf links, Assistent rechts */}
            <Abschnitt
                id="express-anfrage"
                titelId="anfrage-heading"
                flaeche="fliese"
                kopf="seitlich"
                etikett="Kostenfrei & unverbindlich"
                titel="Ihre Express-Anfrage in 3 Klicks"
                einleitung={
                    <p>
                        Vorhaben wählen, Eckdaten eintragen und die Anfrage direkt per WhatsApp an {owner.fullName} oder per
                        E-Mail senden.
                    </p>
                }
            >
                <TezgelAnfrageFunnel />
            </Abschnitt>

            {/* 12. ABSCHLUSS */}
            <FinalCTA
                headline="Bereit für Ihr Fliesen- oder Badprojekt? Sprechen Sie direkt mit Fachbetriebsleiter Deniz Tezgel."
                subtitle="Kostenfreies Vor-Ort-Aufmaß • Verbindlicher Festpreis • Über 15 Jahre Erfahrung"
                buttonText="Jetzt Vor-Ort-Aufmaß anfragen"
            />
        </>
    );
}
