import VorschauUebersicht from './Uebersicht';
import VorschauListe from './Liste';
import VorschauArtikel from './Artikel';
import VorschauDetail from './Detail';

// Vorschau P4-02 (wird nie freigeschaltet): die vier Vorlagen Übersicht, Liste, Artikel und Detail, je mit einer echten
// Seite wortgetreu aus dem Bestand, dazu die Zustände leere Liste, Filter aktiv, langer Titel; 320 px über die Ansicht.
// Gemeinsame Abschnitte anderer Pakete stehen als markierte Platzflächen. Kein eigenes IconSprite (rendert das Kern-Layout).
// Nur Klassen, die auch in gescannten Kern-Dateien vorkommen (`_entwurf` ist von @source ausgenommen).
export default function VorschauP402() {
  return (
    <>
      <VorschauUebersicht />
      <VorschauListe />
      <VorschauArtikel />
      <VorschauDetail />
    </>
  );
}
