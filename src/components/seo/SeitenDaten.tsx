// Strukturierte Daten je Seite (E3-SEO-JSONLD, E-049): WebPage und BreadcrumbList für genau diese Adresse, die Brotkrumen
// mit den Namen, die auf der Seite sichtbar stehen (Krume ohne href = die Seite selbst). Weitere Knoten (z. B. Service der
// Leistung) hängt die Seite über `weitere` an. Ersetzt die JSON-LD-Blöcke der Ordner-Layouts, die an alle Unterseiten
// vererbt wurden (z. B. meldete /bad/badsanierung die WebPage von /bad). Prüfung: `_werkstatt/werkzeuge/jsonld.mjs`.
// Serverkomponente.
import JsonLd from './JsonLd';
import type { Krume } from '@/components/kern/Brotkrumen';
import { buildBreadcrumbNode, buildGraph, buildWebPageNode, SITE_URL, type SchemaNode } from '@/lib/schema';

export interface SeitenDatenProps {
  /** Adresse der Seite, z. B. `/bad/badsanierung` */
  pfad: string;
  /** wie der Titel der Metadaten */
  titel: string;
  /** wie die Beschreibung der Metadaten */
  beschreibung: string;
  /** wie die sichtbaren Brotkrumen; die letzte ohne href ist die Seite selbst */
  brotkrumen: Krume[];
  /** weitere Knoten derselben Seite (Service, FAQPage …) */
  weitere?: SchemaNode[];
}

/** Absolute Adresse zu einem Pfad (Startseite ohne Schrägstrich am Ende, wie in schema.ts) */
export function seitenUrl(pfad: string): string {
  return `${SITE_URL}${pfad === '/' ? '' : pfad}`;
}

export default function SeitenDaten({ pfad, titel, beschreibung, brotkrumen, weitere = [] }: SeitenDatenProps) {
  const url = seitenUrl(pfad);
  const items = brotkrumen.map((k) => ({ name: k.name, path: k.href ?? pfad }));
  return (
    <JsonLd
      schema={buildGraph([
        buildWebPageNode({ url, name: titel, description: beschreibung, breadcrumbItems: items }),
        buildBreadcrumbNode(items, url),
        ...weitere,
      ])}
    />
  );
}
