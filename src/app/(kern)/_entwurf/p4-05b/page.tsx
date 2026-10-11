import type { Metadata } from 'next';
import { VorschauRaster, VorschauZustand } from '@/components/kern/formulare/b/Vorschau';
import { KonfiguratorVorschau } from '@/components/kern/formulare/d/Vorschau';

export const metadata: Metadata = {
  title: 'Vorschau P4-05b Fliesen-Konfigurator',
  robots: { index: false, follow: false },
};

// Vorschau P4-05b (wird nie freigeschaltet): Fliesen-Konfigurator (F-06) zuerst in Ruhe (bedienbar), darunter alle
// Schritte und Zustände. Der Konfigurator läuft über eine Vorschau-Hülle, die nie sendet (G5). Kein eigenes IconSprite
// (steht im Kern-Layout). Nur Klassen aus gescannten Kern-Dateien (`_entwurf` ist von @source ausgenommen).
// Die Eingaben-Objekte stehen außerhalb der Seite, damit sie zwischen Renderläufen gleich bleiben.
const TREPPE_MASSE = { stairRises: '14', stairWidth: '100', treadDepth: '30', riserHeight: '18' };
const FLAECHE_UNGUELTIG = { area: 'abc' };
const BLOCKSTUFEN = { ...TREPPE_MASSE, stairType: 'blockstufen' };
const GEWENDELT = { ...TREPPE_MASSE, stairShape: 'gewendelt', stairLocation: 'aussen' };
const GUTFALL = { area: '24,5', pattern: 'kreuzfuge', skirting: '18' };
const GUTFALL_TREPPE = { ...GUTFALL, ...TREPPE_MASSE };

export default function VorschauFliesenKonfigurator() {
  return (
    <>
      <VorschauRaster titel="Fliesen-Konfigurator · Ruhe (bedienbar, sendet nicht)" breit>
        <KonfiguratorVorschau />
      </VorschauRaster>

      <VorschauRaster titel="Schritt 1 · Bereiche">
        <VorschauZustand kennung="Schritt 1 · Bereiche gewählt, Bad-Hinweis">
          <KonfiguratorVorschau vorgaben={{ area: ['kueche', 'bad'] }} />
        </VorschauZustand>
        <VorschauZustand kennung="Schritt 2 · Untergrund (Heizestrich, Fußbodenheizung ja)">
          <KonfiguratorVorschau schritt={2} vorgaben={{ area: 'kueche', substrate: 'heizestrich', floorHeating: true }} />
        </VorschauZustand>
      </VorschauRaster>

      <VorschauRaster titel="Schritt 3 · Format, Material & Menge">
        <VorschauZustand kennung="Schritt 3 · Fläche 20 m² (Vorgabe), XXL, Holzoptik">
          <KonfiguratorVorschau schritt={3} vorgaben={{ area: 'kueche', format: 'xxl', material: 'holzoptik' }} />
        </VorschauZustand>
        <VorschauZustand kennung="Schritt 3 · Fläche ohne gültige Zahl">
          <KonfiguratorVorschau schritt={3} vorgaben={{ area: 'flur' }} eingaben={FLAECHE_UNGUELTIG} />
        </VorschauZustand>
        <VorschauZustand kennung="Schritt 3 · Treppe mit Stufenmaßen (Richtwert 6,42 m²)">
          <KonfiguratorVorschau schritt={3} vorgaben={{ area: 'treppe' }} eingaben={TREPPE_MASSE} />
        </VorschauZustand>
        <VorschauZustand kennung="Schritt 3 · Treppe ohne Maße">
          <KonfiguratorVorschau schritt={3} vorgaben={{ area: 'treppe' }} />
        </VorschauZustand>
        <VorschauZustand kennung="Schritt 3 · Blockstufen (keine m²-Menge)">
          <KonfiguratorVorschau schritt={3} vorgaben={{ area: 'treppe' }} eingaben={BLOCKSTUFEN} />
        </VorschauZustand>
        <VorschauZustand kennung="Schritt 3 · Fläche und Treppe (gewendelt, außen)">
          <KonfiguratorVorschau schritt={3} vorgaben={{ area: ['flur', 'treppe'] }} eingaben={GEWENDELT} />
        </VorschauZustand>
      </VorschauRaster>

      <VorschauRaster titel="Schritt 4 · Zusammenfassung & Kontakt">
        <VorschauZustand kennung="Schritt 4 · Ruhe (Küche, Flur, Treppe; mit Prüfliste)">
          <KonfiguratorVorschau schritt={4} vorgaben={{ area: ['kueche', 'flur', 'treppe'], substrate: 'zement', format: 'gross' }} eingaben={GUTFALL_TREPPE} />
        </VorschauZustand>
        <VorschauZustand kennung="Schritt 4 · Fehler beim Senden">
          <KonfiguratorVorschau schritt={4} zustand="fehler" vorgaben={{ area: 'kueche' }} eingaben={GUTFALL} />
        </VorschauZustand>
        <VorschauZustand kennung="Schritt 4 · lädt (Anzeige nach 300 ms)">
          <KonfiguratorVorschau schritt={4} zustand="laedt" vorgaben={{ area: 'kueche' }} eingaben={GUTFALL} />
        </VorschauZustand>
      </VorschauRaster>

      <VorschauRaster titel="Nach dem Absenden">
        <VorschauZustand kennung="Erfolg (online)">
          <KonfiguratorVorschau schritt={4} zustand="erfolg" vorgaben={{ area: ['kueche', 'flur'], substrate: 'zement', format: 'gross' }} eingaben={GUTFALL} />
        </VorschauZustand>
        <VorschauZustand kennung="WhatsApp geöffnet">
          <KonfiguratorVorschau schritt={4} zustand="whatsapp" vorgaben={{ area: ['kueche', 'flur'], substrate: 'zement', format: 'gross' }} eingaben={GUTFALL} />
        </VorschauZustand>
      </VorschauRaster>
    </>
  );
}
