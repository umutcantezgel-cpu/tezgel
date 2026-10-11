import type { Metadata } from 'next';
import { createMetadata } from '@/lib/metadata';
import { buildGraph, buildContactPageNode, buildBreadcrumbNode, SITE_URL } from '@/lib/schema';
import JsonLd from '@/components/seo/JsonLd';
import Kopf from '@/components/kern/seiten/kontakt/Kopf';
import Kontaktblatt from '@/components/kern/seiten/kontakt/Kontaktblatt';
import Qualitaet from '@/components/kern/seiten/kontakt/Qualitaet';
import Standort from '@/components/kern/seiten/kontakt/Standort';
import Karte from '@/components/kern/seiten/kontakt/Karte';
import Ansprechpartner from '@/components/kern/seiten/kontakt/Ansprechpartner';
import { Express, Termin } from '@/components/kern/seiten/kontakt/Anfrage';
import Abschluss from '@/components/kern/start/Abschluss';

// `/kontakt` in Kern-Erscheinung (P4-08f, ruhender Entwurf für das P4-Tor; Freischaltung in W9 mit freischalten.sh).
// Arbeitsseite (GRUNDMENGE.json): kompakter Kopf, alle Wege im ersten Bildschirm, kein Signaturmoment, keine Auftritte.
// Abschnitte in der Lesefolge des Bestands `(bestand)/kontakt/page.jsx`:
// Kopf mit Direktkontakt · Qualitätsversprechen · Standort & Anfahrt (#standort-anfahrt, Karte nach Einwilligung) ·
// Regionaler Ansprechpartner · Termin (#termin-buchen, F-07) · Express-Anfrage (#express-anfrage, F-03) · Abschluss.
// Metadaten und JSON-LD wörtlich aus `(bestand)/kontakt/layout.tsx` (das Bestands-Layout gilt für die Kern-Route nicht).
// Keine Klassen in dieser Datei: Tailwind liest `_entwurf` nicht (kern-global.css), die Teile liegen in `kern/seiten/kontakt`.
export const metadata: Metadata = createMetadata({
  title: 'Kontakt & Vor-Ort-Aufmaß | Fliesenleger Tezgel Aßlar',
  description: 'Kontaktieren Sie Fliesenleger Tezgel in Aßlar: kostenfreies Vor-Ort-Aufmaß, persönliche Beratung & Festpreis für Wetzlar & Hessen. Jetzt anfragen!',
  path: '/kontakt',
});

const pageUrl = `${SITE_URL}/kontakt`;
const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Kontakt', path: '/kontakt' },
];

const contactSchema = buildGraph([
  buildContactPageNode({
    url: pageUrl,
    name: 'Kontakt aufnehmen | Fliesenverlegung Tezgel',
    description:
      'Kontakt zum Fliesenleger-Fachbetrieb Fliesenverlegung Tezgel in Aßlar – für Fliesenverlegung, Badsanierung und Verbundabdichtung in Wetzlar und Mittelhessen.',
  }),
  buildBreadcrumbNode(breadcrumbs, pageUrl),
]);

export default function Kontaktseite() {
  return (
    <>
      <JsonLd schema={contactSchema} />
      <Kopf kontaktblatt={<Kontaktblatt />} />
      <Qualitaet />
      <Standort karte={<Karte />} />
      <Ansprechpartner ort="Aßlar, Wetzlar & Mittelhessen" />
      <Termin />
      <Express />
      <Abschluss
        headline="Sie möchten Ihr Bad oder Ihre Fliesen erneuern? Jetzt unverbindlich beraten lassen."
        subtitle="Kostenfreies Vor-Ort-Aufmaß • Feste Terminabsprachen • HWK-Fachbetrieb"
        buttonText="Jetzt Deniz Tezgel anrufen"
      />
    </>
  );
}
