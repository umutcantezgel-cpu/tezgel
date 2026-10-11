import type { Metadata } from 'next';
import { VorschauRaster, VorschauZustand } from '@/components/kern/formulare/b/Vorschau';
import { BadanfrageVorschau, ProjektCheckVorschau } from '@/components/kern/formulare/c/Vorschau';

export const metadata: Metadata = {
  title: 'Vorschau P4-05a Badanfrage und Projektcheck',
  robots: { index: false, follow: false },
};

// Vorschau P4-05a (wird nie freigeschaltet): Badanfrage (F-04) und Bad-Projektcheck (F-05) zuerst in Ruhe (bedienbar),
// darunter alle Schritte und Zustände. Die Formulare laufen über Vorschau-Hüllen, die nie senden (G5). Kein eigenes
// IconSprite (steht im Kern-Layout). Nur Klassen aus gescannten Kern-Dateien (`_entwurf` ist von @source ausgenommen).
export default function VorschauBadFormulare() {
  return (
    <>
      <VorschauRaster titel="Badanfrage · Ruhe (bedienbar, sendet nicht)" breit>
        <BadanfrageVorschau />
      </VorschauRaster>
      <VorschauRaster titel="Badanfrage · Schritte">
        <VorschauZustand kennung="Schritt 2 · Sanierungsumfang">
          <BadanfrageVorschau schritt={2} />
        </VorschauZustand>
        <VorschauZustand kennung="Schritt 3 · Raummaße">
          <BadanfrageVorschau schritt={3} />
        </VorschauZustand>
        <VorschauZustand kennung="Schritt 4 · Qualität & Ausstattung">
          <BadanfrageVorschau schritt={4} />
        </VorschauZustand>
        <VorschauZustand kennung="Schritt 5 · Kontakt (Ruhe)">
          <BadanfrageVorschau schritt={5} />
        </VorschauZustand>
      </VorschauRaster>
      <VorschauRaster titel="Badanfrage · Zustände">
        <VorschauZustand kennung="Schritt 5 · Fehler (Senden)">
          <BadanfrageVorschau schritt={5} zustand="fehler" />
        </VorschauZustand>
        <VorschauZustand kennung="Schritt 5 · Fehler (WhatsApp ohne Name/Telefon)">
          <BadanfrageVorschau schritt={5} zustand="whatsapp-fehler" />
        </VorschauZustand>
        <VorschauZustand kennung="Schritt 5 · lädt (Anzeige nach 300 ms)">
          <BadanfrageVorschau schritt={5} zustand="laedt" />
        </VorschauZustand>
        <VorschauZustand kennung="Erfolg">
          <BadanfrageVorschau schritt={5} zustand="erfolg" />
        </VorschauZustand>
        <VorschauZustand kennung="WhatsApp geöffnet">
          <BadanfrageVorschau schritt={5} zustand="whatsapp" />
        </VorschauZustand>
      </VorschauRaster>

      <VorschauRaster titel="Bad-Projektcheck · Ruhe (bedienbar, sendet nicht)" breit>
        <ProjektCheckVorschau />
      </VorschauRaster>
      <VorschauRaster titel="Bad-Projektcheck · Zustände" breit>
        <VorschauZustand kennung="Kontaktformular offen">
          <ProjektCheckVorschau zustand="formular" />
        </VorschauZustand>
        <VorschauZustand kennung="Fehler">
          <ProjektCheckVorschau zustand="fehler" />
        </VorschauZustand>
        <VorschauZustand kennung="lädt (Anzeige nach 300 ms)">
          <ProjektCheckVorschau zustand="laedt" />
        </VorschauZustand>
        <VorschauZustand kennung="Erfolg (online)">
          <ProjektCheckVorschau zustand="erfolg" />
        </VorschauZustand>
        <VorschauZustand kennung="WhatsApp geöffnet">
          <ProjektCheckVorschau zustand="whatsapp" />
        </VorschauZustand>
      </VorschauRaster>
    </>
  );
}
