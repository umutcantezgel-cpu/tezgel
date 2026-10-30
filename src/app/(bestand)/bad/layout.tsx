// Strukturierte Daten stehen je Seite (Baustein SeitenDaten, E3-SEO-JSONLD); das Layout vererbt keine Seitenknoten. Allein der
// Service-Knoten der Leistung steht hier und geht an alle Unterseiten (UM-E4-EP4, E-068, wie in E0); die Ordnerseite /bad
// trägt ihren Knoten selbst und bekommt keinen zweiten (OrdnerService, NurUnterseiten).
import React from 'react';
import OrdnerService from '@/components/seo/OrdnerService';

export default function BadLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <OrdnerService ordner="/bad" />
      {children}
    </>
  );
}
