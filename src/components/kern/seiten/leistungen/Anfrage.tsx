// /leistungen · Anfrage-Abschnitte (P4-08b, KERN v1.2 K-011): zwei Formulare wie im Bestand, je ein eigener Abschnitt mit eigener
// Anordnung (K-003 Nr. 5, K-011 „ein Formular je Bildschirm“):
// - Projektanfrage (Bestand „Umfassendes Projektanfrage-Formular“, PricingCalculator): Kopf geteilt – H2 links, Vorspann rechts –
//   über dem Preisrechner in voller Breite (Insel `@/components/kern/formulare/Preisrechner`, F-02).
// - Express-Anfrage (Bestand „Express-Anfrage Funnel“, `#express-anfrage`, TezgelAnfrageFunnel): Kopf seitlich (Sp. 1–5), der
//   Funnel daneben (Sp. 6–12), Fuge oben als Grenze zum Preisrechner (Insel `@/components/kern/formulare/AnfrageFunnel`, F-03).
//   Ziel der Wege „Vor-Ort-Aufmaß vereinbaren“ und „Aufmaß anfragen“; der Test `funktion-express-funnel` sucht den Funnel in
//   `#express-anfrage`.
// Keine Auftritte (K-011: Formulare nur mit aufklappen, druck, zustand, laden, notiert). Wortlaut wörtlich aus
// `src/app/(bestand)/leistungen/page.jsx`. `formular` ersetzt die Insel nur in einer Vorschau, die nie sendet.
import type { ReactNode } from 'react';
import Preisrechner from '@/components/kern/formulare/Preisrechner';
import AnfrageFunnel from '@/components/kern/formulare/AnfrageFunnel';
import { Abschnitt } from '@/components/kern/vorlagen/teile';

type AbschnittProps = { formular?: ReactNode };

/** „Projekt anfragen & Situation schildern“ mit dem Preisrechner (ohne Preise). */
export function Projektanfrage({ formular }: AbschnittProps) {
  return (
    <Abschnitt
      etikett="Projekt & Ausgangslage"
      titel="Projekt anfragen & Situation schildern"
      einleitung="Geben Sie uns einen ersten Einblick in Ihr Vorhaben vor Ort für eine fundierte Einschätzung durch Fachbetriebsleiter Deniz Tezgel."
      kopfLage="geteilt"
    >
      {formular ?? <Preisrechner />}
    </Abschnitt>
  );
}

/** „Fordern Sie Ihr persönliches Angebot an“ mit der Express-Anfrage in drei Schritten, Anker `#express-anfrage`. */
export function ExpressAnfrage({ formular }: AbschnittProps) {
  return (
    <Abschnitt
      id="express-anfrage"
      etikett="Online-Bedarfsabfrage"
      titel="Fordern Sie Ihr persönliches Angebot an"
      einleitung="Wählen Sie Ihr Vorhaben in Aßlar, Wetzlar oder Hessen für ein kostenfreies Vor-Ort-Aufmaß."
      kopfLage="seitlich"
      fugen="oben"
    >
      {formular ?? <AnfrageFunnel />}
    </Abschnitt>
  );
}
