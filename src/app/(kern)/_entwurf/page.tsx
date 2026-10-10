import type { Metadata } from 'next';
import { createMetadata } from '@/lib/metadata';
import Einstieg from '@/components/kern/start/einstieg-b/Einstieg';
import HeroKontakt from '@/components/kern/formulare/HeroKontakt';
import Vertrauen from '@/components/kern/start/Vertrauen';
import Fachbereiche from '@/components/kern/start/Fachbereiche';
import { Projektanfrage, ExpressAnfrage } from '@/components/kern/start/Anfrage';
import Fachgewerke from '@/components/kern/start/Fachgewerke';
import Ablauf from '@/components/kern/start/Ablauf';
import Grossformat from '@/components/kern/start/Grossformat';
import Stimmen from '@/components/kern/start/Stimmen';
import Servicegebiet from '@/components/kern/start/Servicegebiet';
import Fragen from '@/components/kern/start/Fragen';
import Abschluss from '@/components/kern/start/Abschluss';

// Startseite „/“ in Kern-Erscheinung (P3-15, ruhender Entwurf; Freischaltung in P3-16 mit freischalten.sh).
// Reihenfolge der Abschnitte wie im Bestand `(bestand)/page.tsx`; Titel und Pfad der Metadaten gleich, die Beschreibung
// mit den Wahrheitskorrekturen aus MIKROTEXTE (Klasse 4: „Abdichtung nach DIN 18534“, „fugenarme“ Großformate).
export const metadata: Metadata = createMetadata({
  title: 'Fliesenleger Wetzlar & Aßlar | Fliesenverlegung Tezgel',
  description: 'Ihr Fliesenleger für Wetzlar & Aßlar: Badsanierung, fugenarme Großformate & Terrassen. Abdichtung nach DIN 18534. Jetzt kostenfreies Vor-Ort-Aufmaß anfragen!',
  path: '/',
});

export default function Startseite() {
  return (
    <>
      <Einstieg formular={<HeroKontakt />} />
      <Vertrauen />
      <Fachbereiche />
      <Projektanfrage />
      <Fachgewerke />
      <Ablauf />
      <Grossformat />
      <Stimmen />
      <Servicegebiet />
      <Fragen />
      <ExpressAnfrage />
      <Abschluss
        headline="Bereit für Ihr Fliesen- oder Badprojekt? Sprechen Sie direkt mit Fachbetriebsleiter Deniz Tezgel."
        subtitle="Kostenfreies Vor-Ort-Aufmaß • Verbindlicher Festpreis • Über 15 Jahre Erfahrung"
        buttonText="Jetzt Vor-Ort-Aufmaß anfragen"
      />
    </>
  );
}
