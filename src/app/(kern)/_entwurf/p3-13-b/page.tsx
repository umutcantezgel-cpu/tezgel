import { ExpressAnfrage, Projektanfrage } from '@/components/kern/start/Anfrage';
import { FunnelVorschau, PreisrechnerVorschau, VorschauRaster, VorschauZustand } from '@/components/kern/formulare/b/Vorschau';

// Vorschau P3-13b (wird nie freigeschaltet): Abschnitte #kosten-rechner und #express-anfrage in Ruhe (bedienbar),
// darunter alle Zustände. Die Formulare laufen über Vorschau-Hüllen, die nie senden (G5). Kein eigenes IconSprite
// (steht im Kern-Layout). Nur Klassen aus gescannten Kern-Dateien (`_entwurf` ist von @source ausgenommen).
export default function VorschauAnfrage() {
  return (
    <>
      <Projektanfrage formular={<PreisrechnerVorschau />} />
      <VorschauRaster titel="Preisrechner · Zustände" breit>
        <VorschauZustand kennung="Fehler (Einwilligung fehlt)">
          <PreisrechnerVorschau zustand="fehler" />
        </VorschauZustand>
        <VorschauZustand kennung="lädt (Anzeige nach 300 ms)">
          <PreisrechnerVorschau zustand="laedt" />
        </VorschauZustand>
        <VorschauZustand kennung="Erfolg">
          <PreisrechnerVorschau zustand="erfolg" />
        </VorschauZustand>
      </VorschauRaster>

      <ExpressAnfrage formular={<FunnelVorschau />} />
      <VorschauRaster titel="Express-Anfrage · Schritte und Zustände">
        <VorschauZustand kennung="Schritt 2">
          <FunnelVorschau schritt={2} />
        </VorschauZustand>
        <VorschauZustand kennung="Schritt 3 · Ruhe">
          <FunnelVorschau schritt={3} />
        </VorschauZustand>
        <VorschauZustand kennung="Schritt 3 · Fehler">
          <FunnelVorschau schritt={3} zustand="fehler" />
        </VorschauZustand>
        <VorschauZustand kennung="Schritt 3 · lädt (Anzeige nach 300 ms)">
          <FunnelVorschau schritt={3} zustand="laedt" />
        </VorschauZustand>
        <VorschauZustand kennung="Erfolg">
          <FunnelVorschau schritt={3} zustand="erfolg" />
        </VorschauZustand>
        <VorschauZustand kennung="WhatsApp geöffnet">
          <FunnelVorschau schritt={3} zustand="whatsapp" />
        </VorschauZustand>
      </VorschauRaster>
    </>
  );
}
