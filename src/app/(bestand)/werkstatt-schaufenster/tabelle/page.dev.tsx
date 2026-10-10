// Dev-Schaufenster (nur next dev, E2-BAU-03): Tabelle und Bildfeld mit Inhalten aus dem Bestand.
// Tabelle breit: Name und Überschrift aus src/app/fliesen/abnahme/page.jsx (Z. 195, Caption Z. 206), Zeilen wortgleich
//   aus TOLERANCES (Z. 54–59, „{Wert} mm“ wie im Bestand), Legende aus dem Absatz unter der Tabelle (Z. 230, Auszug).
// Tabelle schmal: Überschrift „Welche Fliese für welchen Raum?“ aus src/app/fliesen/fliesenarten/page.jsx (Z. 272),
//   Kopf und Zeilen wortgleich aus der zweiten Tabelle derselben Seite (Z. 279–296, Daten ROOM_TABLE Z. 67–75).
//   Die Bestandstabelle hat keine Caption; der Name ist die Überschrift darüber.
// Bildfelder: Alt-Texte aus src/app/page.tsx (Z. 48 walk-in-dusche.webp, Z. 569 bad-freistehende-wanne.webp);
//   Beschriftungen aus src/config/musterbaeder.js (Z. 72) und src/app/page.tsx (Z. 49, Tag „Komplettbad & Dusche“).
//   Maße aus den Bilddateien (identify).
import Einstieg from '@/components/kern/Einstieg';
import Abschnitt from '@/components/kern/Abschnitt';
import Tabelle from '@/components/kern/Tabelle';
import Bildfeld from '@/components/kern/Bildfeld';

export const metadata = { title: 'Schaufenster · Tabelle und Bildfeld', robots: { index: false, follow: false } };

const TOLERANZEN = [
  ['Zeile 3', 'Flächenfertige Böden, z. B. Fliesenbeläge', '2 mm', '4 mm', '10 mm'],
  ['Zeile 4', 'wie Zeile 3, mit erhöhten Anforderungen', '1 mm', '3 mm', '9 mm'],
  ['Zeile 6', 'Flächenfertige Wände, z. B. Wandbekleidungen', '3 mm', '5 mm', '10 mm'],
  ['Zeile 7', 'wie Zeile 6, mit erhöhten Anforderungen', '2 mm', '3 mm', '8 mm'],
];

const RAEUME = [
  ['Wohn- und Essbereich', 'Feinsteinzeug, gern im Großformat oder als Holzoptik-Diele', 'Ruhige Fläche, auf Fußbodenheizung geeignet'],
  ['Küche', 'Feinsteinzeug am Boden; an der Wand auch Steingut oder Großformat', 'Fleckunempfindliche Oberfläche, belastbare Fugen'],
  ['Flur und Diele', 'Feinsteinzeug mit matter, strukturierter Oberfläche', 'Hohe Abriebfestigkeit, Rutschhemmung bei nassen Schuhen'],
  ['Bad – Wand', 'Steingut oder Feinsteinzeug', 'Im Spritzwasserbereich Abdichtung nach DIN 18534'],
  ['Bad – Boden und Dusche', 'Feinsteinzeug, in der Dusche rutschhemmend', 'Rutschhemmung für nassbelastete Barfußbereiche beachten'],
  ['Balkon und Terrasse', 'Frostbeständiges Feinsteinzeug, je nach Aufbau als 2-cm-Platte', 'Frostbeständigkeit, Gefälle, Entwässerung'],
  ['Treppe', 'Feinsteinzeug oder Naturstein', 'Trittsichere Oberfläche, saubere Stufenkanten'],
];

export default function TabelleUndBildfeld() {
  return (
    <>
      <Einstieg art="arbeit" etikett="Schaufenster · Bausteine" titel="Tabelle und Bildfeld" />
      <Abschnitt id="sf-tabelle-breit" art="arbeit" nummer="01" etikett="Tabelle breit" titel="Ebenheit und Winkel: Toleranzen nach DIN 18202 für Boden und Wand">
        <Tabelle
          name="Grenzwerte für Ebenheitsabweichungen nach DIN 18202, Tabelle 3 (Auszug)"
          kopf={['Tabelle 3', 'Bezug', '0,1 m', '1 m', '4 m']}
          zeilen={TOLERANZEN}
          ausrichtung={['links', 'links', 'rechts', 'rechts', 'rechts']}
          legende="Auszug nach DIN 18202:2019-07"
        />
      </Abschnitt>
      <Abschnitt id="sf-tabelle-schmal" art="arbeit" nummer="02" etikett="Tabelle schmal" titel="Welche Fliese für welchen Raum?">
        <Tabelle name="Welche Fliese für welchen Raum?" kopf={['Raum', 'Geeignete Fliesenart', 'Worauf achten']} zeilen={RAEUME} />
      </Abschnitt>
      <Abschnitt id="sf-bild" art="arbeit" nummer="03" etikett="Bildfeld" titel="Fotos aus dem Bestand">
        <Bildfeld
          src="/images/bad/bad-freistehende-wanne.webp"
          alt="Freistehende Badewanne mit fugenlosem XXL-Fliesenbelag von Fliesenverlegung Tezgel"
          breite={2752}
          hoehe={1536}
          spalten="voll"
          beschriftung="Familienfreundliche Vollausstattung mit Badewanne & Dusche"
        />
        <div className="mt-12 md:w-1/2">
          <Bildfeld
            src="/images/bad/walk-in-dusche.webp"
            alt="Bodengleiche Walk-In Dusche und Badgestaltung Tezgel"
            breite={2528}
            hoehe={1696}
            spalten="halb"
            beschriftung="Komplettbad & Dusche"
          />
        </div>
      </Abschnitt>
    </>
  );
}
