import type { Metadata } from 'next';
import { VorschauRaster, VorschauZustand } from '@/components/kern/formulare/b/Vorschau';
import { VorschauBreiten } from '@/components/kern/formulare/c/Vorschau';
import { TerminAnfrageVorschau, TerminKalenderVorschau } from '@/components/kern/formulare/e/Vorschau';

export const metadata: Metadata = {
  title: 'Vorschau P4-05c Terminkalender und Terminanfrage',
  robots: { index: false, follow: false },
};

// Vorschau P4-05c (wird nie freigeschaltet): Terminkalender (F-07) und Terminanfrage auf /termin (F-08) zuerst in Ruhe
// (bedienbar), darunter alle Zustände. Die Formulare laufen über Vorschau-Hüllen mit fester Uhrzeit (Tage ab 13.10.2026),
// die nie senden (G5). Kein eigenes IconSprite (steht im Kern-Layout). Nur Klassen aus gescannten Kern-Dateien
// (`_entwurf` ist von @source ausgenommen).
// P4-10b: Am Ende dieselben Ansichten in drei Behälterbreiten (18, 28, 48 rem) nebeneinander.
export default function VorschauTerminFormulare() {
  return (
    <>
      <VorschauRaster titel="Terminanfrage /termin · Ruhe mit Kalender (bedienbar, sendet nicht)" breit>
        <TerminAnfrageVorschau />
      </VorschauRaster>
      <VorschauRaster titel="Terminkalender · Zustände">
        <VorschauZustand kennung="/kontakt · Ruhe (bedienbar, sendet nicht)">
          <TerminKalenderVorschau initialServiceType="Kostenfreies Vor-Ort-Aufmaß & Schadensanalyse" />
        </VorschauZustand>
        <VorschauZustand kennung="Uhrzeiten belegt (gesperrt, durchgestrichen)">
          <TerminKalenderVorschau zustand="belegt" />
        </VorschauZustand>
        <VorschauZustand kennung="Schritt 2 · Kontaktdaten (Ruhe)">
          <TerminKalenderVorschau zustand="formular" />
        </VorschauZustand>
        <VorschauZustand kennung="Schritt 2 · Fehler (Pflichtangaben)">
          <TerminKalenderVorschau zustand="fehler" />
        </VorschauZustand>
        <VorschauZustand kennung="Schritt 2 · Fehler (Übertragung)">
          <TerminKalenderVorschau zustand="netzfehler" />
        </VorschauZustand>
        <VorschauZustand kennung="Schritt 2 · lädt (Anzeige nach 300 ms)">
          <TerminKalenderVorschau zustand="laedt" />
        </VorschauZustand>
        <VorschauZustand kennung="Erfolg">
          <TerminKalenderVorschau zustand="erfolg" />
        </VorschauZustand>
      </VorschauRaster>
      <VorschauRaster titel="Terminanfrage /termin · Formular und Zustände">
        <VorschauZustand kennung="Individuelles Formular (Ruhe, bedienbar)">
          <TerminAnfrageVorschau zustand="formular" />
        </VorschauZustand>
        <VorschauZustand kennung="Fehler">
          <TerminAnfrageVorschau zustand="fehler" />
        </VorschauZustand>
        <VorschauZustand kennung="lädt (Anzeige nach 300 ms)">
          <TerminAnfrageVorschau zustand="laedt" />
        </VorschauZustand>
        <VorschauZustand kennung="Erfolg (online)">
          <TerminAnfrageVorschau zustand="erfolg" />
        </VorschauZustand>
        <VorschauZustand kennung="WhatsApp geöffnet">
          <TerminAnfrageVorschau zustand="whatsapp" />
        </VorschauZustand>
      </VorschauRaster>

      <VorschauRaster titel="Behälterbreiten · Terminkalender Schritt 2 (Tage, Uhrzeiten, Kontakt)" breit>
        <VorschauBreiten>
          <TerminKalenderVorschau zustand="formular" />
        </VorschauBreiten>
      </VorschauRaster>
      <VorschauRaster titel="Behälterbreiten · Terminanfrage /termin (Individuelles Formular)" breit>
        <VorschauBreiten>
          <TerminAnfrageVorschau zustand="formular" />
        </VorschauBreiten>
      </VorschauRaster>
    </>
  );
}
