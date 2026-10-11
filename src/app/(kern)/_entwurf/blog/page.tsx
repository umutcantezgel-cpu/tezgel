import type { Metadata } from 'next';
import { createMetadata } from '@/lib/metadata';
import { buildGraph, buildBreadcrumbNode, buildWebPageNode, SITE_URL, ORG_ID } from '@/lib/schema';
import JsonLd from '@/components/seo/JsonLd';
import { COMPANY_DATA } from '@/config/company';
import Kopf from '@/components/kern/vorlagen/liste/Kopf';
import Randfeld from '@/components/kern/vorlagen/detail/Randfeld';
import Qualitaetsversprechen from '@/components/kern/vorlagen/fachseite/Qualitaetsversprechen';
import BlogListe from '@/components/kern/seiten/blog/BlogListe';

// Ratgeber-Liste „/blog“ in Kern-Erscheinung (P4-08d, ruhender Entwurf; Freischaltung in Welle W6 mit freischalten.sh).
// Arbeitsseite laut GRUNDMENGE.json: kompakter Kopf ohne Achse, Liste im ersten Bildschirm, kein Signaturmoment.
// Wortlaut aus `(bestand)/blog/page.jsx`, `BlogCard.jsx`, `BlogSidebar.jsx` und `QualityPromise.jsx`; Metadaten und JSON-LD
// wörtlich aus `(bestand)/blog/layout.tsx` (das Bestands-Layout gilt für die Kern-Route nicht).
// Abschnitte: Kopf (Server) · Liste mit Suche, Kategorien, Hervorhebung, Raster, Leerzustand und Randfeld (Client-Insel,
// Hook F-16 `useBlogListe`) · Qualitätsversprechen (Server, auf Fliese).
export const metadata: Metadata = createMetadata({
  title: 'Fliesen-Ratgeber & Badsanierung Tipps | Tezgel',
  description: 'Praxiswissen & Ratgeber zu Badsanierung, Fliesenverlegung & DIN 18534 Abdichtung vom Fliesenleger-Fachbetrieb Tezgel aus Aßlar. Jetzt informieren!',
  path: '/blog',
});

const pageUrl = `${SITE_URL}/blog`;
const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Ratgeber & Blog', path: '/blog' },
];

const blogSchema = buildGraph([
  buildWebPageNode({
    url: pageUrl,
    name: 'Ratgeber & Blog | Fliesenverlegung Tezgel',
    description:
      'Fachartikel rund um Badsanierung, Fliesen und Abdichtung vom Fliesenleger-Fachbetrieb in Aßlar.',
    breadcrumbItems: breadcrumbs,
  }),
  buildBreadcrumbNode(breadcrumbs, pageUrl),
  {
    '@type': 'Blog',
    '@id': `${pageUrl}#blog`,
    name: 'Fliesenverlegung Tezgel Ratgeber',
    description: 'Fachwissen und Ratgeber rund um Badsanierung, Fliesen und barrierefreie Bäder.',
    publisher: { '@id': ORG_ID },
    url: pageUrl,
  },
]);

export default function Blogseite() {
  const { legalName, headquarters, owner, contact } = COMPANY_DATA;
  return (
    <>
      <JsonLd schema={blogSchema} />
      <Kopf
        etikett="Ratgeber & Fachwissen"
        titel="Fliesen-Ratgeber & Badsanierung Tipps"
        vorspann={`Praxisnaher Fliesen-Ratgeber mit wertvollen Tipps rund um Badsanierung, Fliesenverlegung und DIN 18534 Verbundabdichtung – von Ihrem Fachbetrieb ${legalName} aus ${headquarters.city}.`}
        knoepfe={[
          { text: 'Projekt unverbindlich anfragen', href: '/kontakt', art: 'haupt', zeichen: 'pfeil' },
          { text: 'Häufige Fragen', href: '/faq' },
        ]}
      />
      <BlogListe
        beratung={
          <Randfeld
            klebend
            titelEbene="p"
            titel="Beratung gewünscht?"
            text={`Fragen zu Badsanierung, Fliesen oder Abdichtung? ${owner.fullName} berät Sie persönlich – inklusive kostenfreiem Vor-Ort-Aufmaß.`}
            aktionen={[
              { text: 'Kontakt aufnehmen', href: '/kontakt', art: 'haupt', zeichen: 'pfeil' },
              { text: contact.phone, href: `tel:${contact.phoneLink}`, zeichen: 'telefon', mono: true },
            ]}
          />
        }
      />
      <Qualitaetsversprechen flaeche="fliese" dichte="eng" />
    </>
  );
}
