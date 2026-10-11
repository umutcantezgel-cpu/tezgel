import type { Metadata } from 'next';
import { createMetadata } from '@/lib/metadata';
import { buildGraph, buildBreadcrumbNode, buildWebPageNode, SITE_URL, ORG_ID } from '@/lib/schema';
import JsonLd from '@/components/seo/JsonLd';
import Kopfblatt from '@/components/kern/seiten/standorte/Kopfblatt';
import Register from '@/components/kern/seiten/standorte/Register';
import { Ansprechpartner, Hauptstandort, LeistungenVorOrt, WeitereOrte } from '@/components/kern/seiten/standorte/Abschnitte';
import { EinsatzgebietKarte, StandortKarte } from '@/components/kern/seiten/standorte/Karten';
import Abschluss from '@/components/kern/start/Abschluss';

// `/standorte` in Kern-Erscheinung (P4-08c, ruhender Entwurf für das P4-Tor; Freischaltung in W3 mit freischalten.sh).
// Erzählseite (GRUNDMENGE.json). Abschnitte in der Reihenfolge des Bestands `(bestand)/standorte/page.tsx`:
// Hero + Gebietskarte (Kopfblatt) · Städte · Leistungen vor Ort · Weitere Orte · Hauptstandort · Ansprechpartner · Abschluss.
// Metadaten und JSON-LD wörtlich wie im Bestand (gleiche Bausteine, gleiche Werte → gleicher Hash).
// Keine Klassen in dieser Datei: Tailwind liest `_entwurf` nicht (kern-global.css), die Teile liegen in `kern/seiten/standorte`.
export const metadata: Metadata = createMetadata({
  title: 'Fliesenleger Standorte & Einsatzgebiete | Tezgel',
  description: 'Fliesenleger-Fachbetrieb Tezgel aus Aßlar: Fliesenverlegung & Badsanierung in Wetzlar, Gießen, Herborn & Lahn-Dill-Kreis. Jetzt Vor-Ort-Aufmaß anfragen!',
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
    name: 'Standorte & Einsatzgebiete in Mittelhessen | Fliesenverlegung Tezgel',
    description: 'Übersicht aller Städte und Gemeinden, in denen Fliesenverlegung Tezgel aus Aßlar Fliesen verlegt und Bäder saniert.',
    breadcrumbItems: breadcrumbs,
  }),
  buildBreadcrumbNode(breadcrumbs, pageUrl),
  {
    '@type': 'CollectionPage',
    '@id': `${pageUrl}#collection`,
    name: 'Fliesenverlegung Tezgel – Standorte & Einsatzgebiete',
    description: 'Fachbetrieb für Fliesen-, Platten- und Mosaikverlegung, Badsanierung und Verbundabdichtung in Mittelhessen.',
    publisher: { '@id': ORG_ID },
  },
]);

export default function StandorteSeite() {
  return (
    <>
      <JsonLd schema={standorteGraph} />
      <Kopfblatt karte={<EinsatzgebietKarte />} />
      <Register />
      <LeistungenVorOrt />
      <WeitereOrte />
      <Hauptstandort karte={<StandortKarte />} />
      <Ansprechpartner ort="Mittelhessen & Lahn-Dill-Kreis" />
      <Abschluss
        headline="Planen Sie ein Fliesen- oder Badprojekt in Mittelhessen? Sprechen Sie direkt mit Fachbetriebsleiter Deniz Tezgel."
        subtitle="Kostenfreies Vor-Ort-Aufmaß • Feste Terminabsprachen • HWK-Fachbetrieb"
        buttonText="Jetzt Vor-Ort-Termin anfragen"
      />
    </>
  );
}
