// Strukturierte Daten stehen je Seite (Baustein SeitenDaten, E3-SEO-JSONLD-1), nicht mehr im Layout: es vererbt keine mehr.
import React from 'react';

export default function BadLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
