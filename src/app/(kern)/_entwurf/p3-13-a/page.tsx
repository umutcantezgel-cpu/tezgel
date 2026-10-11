import Einstieg from '@/components/kern/start/einstieg-b/Einstieg';
import { AbschlussAnsicht } from '@/components/kern/start/Abschluss';
import { HeroVorschau, SchnellVorschau, VorschauRaster, VorschauZelle } from '@/components/kern/formulare/a/Vorschau';

// Vorschau P3-13a (wird nie freigeschaltet): Hero-Formular, Abschluss und Kurzformular in allen Zuständen nebeneinander.
// Die Vorschau sendet nie (G5): Alle Formulare laufen über Vorschau-Hüllen, die den Absende-Handler der Hooks nicht verdrahten.
// „Probe“ zeigt den Ablauf Absenden → lädt → Erfolg (mit Fokuswechsel) ohne Anfrage. Kein eigenes IconSprite (Kern-Layout).
export default function VorschauP313a() {
  return (
    <>
      {/* 1 · Hero-Formular im Einstieg (P3-09a), so wie auf `/` */}
      <Einstieg formular={<HeroVorschau zustand="probe" />} />

      <VorschauRaster titel="Hero-Formular · Zustände">
        <VorschauZelle titel="Ruhe">
          <HeroVorschau zustand="ruhe" />
        </VorschauZelle>
        <VorschauZelle titel="Fehler (Meldung aus dem Hook)">
          <HeroVorschau zustand="fehler" />
        </VorschauZelle>
        <VorschauZelle titel="Lädt (Anzeige ab 300 ms)">
          <HeroVorschau zustand="laedt" />
        </VorschauZelle>
        <VorschauZelle titel="Erfolg (Notiert., Referenz in Mono)">
          <HeroVorschau zustand="erfolg" />
        </VorschauZelle>
      </VorschauRaster>

      {/* 2 · Abschluss wie auf `/` aufgerufen (FinalCTA-Props aus der Startseite), ohne Kurzformular */}
      <AbschlussAnsicht
        headline="Bereit für Ihr Fliesen- oder Badprojekt? Sprechen Sie direkt mit Fachbetriebsleiter Deniz Tezgel."
        subtitle="Kostenfreies Vor-Ort-Aufmaß • Verbindlicher Festpreis • Über 15 Jahre Erfahrung"
        buttonText="Jetzt Vor-Ort-Aufmaß anfragen"
      />

      {/* 3 · Abschluss mit Standardwerten, Leistungskontext und Kurzformular (spätere Seiten, showQuickForm) */}
      <AbschlussAnsicht serviceContext="Badsanierung" kurzformular={<SchnellVorschau zustand="probe" sourceTag="vorschau-abschluss" />} />

      <VorschauRaster titel="Kurzformular · Zustände">
        <VorschauZelle titel="Ruhe">
          <SchnellVorschau zustand="ruhe" sourceTag="vorschau-ruhe" />
        </VorschauZelle>
        <VorschauZelle titel="Fehler (Meldung aus dem Hook)">
          <SchnellVorschau zustand="fehler" sourceTag="vorschau-fehler" />
        </VorschauZelle>
        <VorschauZelle titel="Lädt (Anzeige ab 300 ms)">
          <SchnellVorschau zustand="laedt" sourceTag="vorschau-laedt" />
        </VorschauZelle>
        <VorschauZelle titel="Erfolg (Notiert., Vorgangsnummer in Mono)">
          <SchnellVorschau zustand="erfolg" sourceTag="vorschau-erfolg" />
        </VorschauZelle>
        <VorschauZelle titel="Ohne Kopf (heading leer)">
          <SchnellVorschau zustand="ruhe" sourceTag="vorschau-ohne-kopf" kopf={false} />
        </VorschauZelle>
      </VorschauRaster>
    </>
  );
}
