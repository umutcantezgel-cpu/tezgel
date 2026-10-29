import React from 'react';

interface JsonLdProps {
  schema: object | null | undefined;
}

/**
 * Server Component that safely injects Schema.org JSON-LD structured data into HTML.
 * „<“ wird als < geschrieben, damit kein Wert das Skript-Element schließen kann (Next-Leitfaden json-ld.md).
 */
export default function JsonLd({ schema }: JsonLdProps) {
  if (!schema) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
    />
  );
}
