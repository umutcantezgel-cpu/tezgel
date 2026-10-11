// /leistungen · Ablauf (P4-08b, KERN v1.2 K-003 Nr. 5, K-009, K-011): „Ihr verlässlicher Weg zum neuen Traumbelag“.
// Bestand: „3-Schritte Ablauf“ (zentrierter Kopf, drei Kacheln). Kern: Vorlage `Ablauf` der Fachseite – Abfolge an einer
// 1-px-Linie in Strich statt Kachelraster, je Schritt ein statischer Prüfhaken als Kreuzpunkt (K-009: Ablaufabschnitte außerhalb
// von `/bad` ohne Signaturmoment, mit `auftritt`). Fläche Fliese mit Fugen oben und unten: Nach vier Planblättern auf Kalk wechselt
// der Abschnitt Fläche, Richtung (waagrecht statt Spalten) und Dichte (luftig statt dicht).
// Wortlaut wörtlich: Eyebrow und H2 aus `src/app/(bestand)/leistungen/page.jsx`, Schritte aus `processSteps` (`@/config/company`);
// Schrittnummer `aria-hidden` wie im Bestand, Unterzeile über dem H3-Titel wie im Bestand (Lesefolge Nummer → Unterzeile → Titel → Text).
import { processSteps } from '@/config/company';
import { Ablauf as Vorlage } from '@/components/kern/vorlagen/fachseite';

export default function Ablauf() {
  return (
    <Vorlage
      etikett="Ausführungs-Standards"
      titel="Ihr verlässlicher Weg zum neuen Traumbelag"
      flaeche="fliese"
      schritte={processSteps.map((schritt) => ({
        nummer: schritt.step,
        unterzeile: schritt.subtitle,
        titel: schritt.title,
        text: schritt.description,
      }))}
    />
  );
}
