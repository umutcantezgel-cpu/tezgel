// Service-Knoten der Leistung eines Ordners für alle seine Unterseiten (UM-E4-EP4, E-068): wie in E0 steht er im Layout des
// Ordners, jetzt aber allein (keine WebPage und keine BreadcrumbList; die tragen die Seiten selbst, E3-SEO-JSONLD) und nicht
// auf der Ordnerseite, die ihren Service-Knoten selbst setzt (NurUnterseiten). Daten: ORDNER_DIENSTE in lib/schema.ts.
// Prüfung: `_werkstatt/werkzeuge/jsonld.mjs`; Test: test/meta.test.mjs. Serverkomponente.
import JsonLd from './JsonLd';
import NurUnterseiten from './NurUnterseiten';
import { buildGraph, buildOrdnerServiceNode, type DienstOrdner } from '@/lib/schema';

export default function OrdnerService({ ordner }: { ordner: DienstOrdner }) {
  return (
    <NurUnterseiten ordner={ordner}>
      <JsonLd schema={buildGraph([buildOrdnerServiceNode(ordner)])} />
    </NurUnterseiten>
  );
}
