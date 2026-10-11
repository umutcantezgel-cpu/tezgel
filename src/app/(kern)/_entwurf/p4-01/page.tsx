import type { Metadata } from 'next';
import Badsanierung from './Badsanierung';
import Din18534 from './Din18534';
import Zustaende from './Zustaende';
import { VorschauTrenner } from '@/components/kern/vorlagen/fachseite/Vorschau';

// Vorschau P4-01 · Vorlage Fachseite (wird nie freigeschaltet). Zwei echte Seiten wortgetreu aus den Vorlagen-Teilen
// zusammengesetzt – /bad/badsanierung und /untergrund-abdichtung/din-18534 –, danach alle Zustände mit Wortlaut weiterer
// Bestandsseiten. Kopf, Fuß, untere Leiste, Kanal, Banner und IconSprite rendert das Kern-Layout.
// Mehrere H1 und wiederholte Abschnittsnamen sind der Vorschau geschuldet (mehrere Seiten auf einem Blatt); die IDs bleiben
// eindeutig (zweites Qualitätsversprechen mit eigener Titel-ID). Klassen nur in gescannten Kern-Dateien.
export const metadata: Metadata = { title: 'Entwurf P4-01 · Vorlage Fachseite', robots: { index: false, follow: false } };

export default function VorschauFachseite() {
  return (
    <>
      <VorschauTrenner hinweis="Wortlaut, Ziele, IDs und Reihenfolge wie src/app/(bestand)/bad/badsanierung/page.jsx">
        Vorschau P4-01 · Seite /bad/badsanierung
      </VorschauTrenner>
      <Badsanierung />
      <VorschauTrenner hinweis="Wortlaut, Ziele, IDs und Reihenfolge wie src/app/(bestand)/untergrund-abdichtung/din-18534/page.jsx">
        Vorschau P4-01 · Seite /untergrund-abdichtung/din-18534
      </VorschauTrenner>
      <Din18534 qualitaetId="quality-promise-heading-din" />
      <Zustaende />
    </>
  );
}
