// Schaufenster (nur Entwicklung, pageExtensions „dev.tsx“): Varianten der Vorlage nach K-016 „Ruhe“ (E-047) am Inhalt von
// `/bad/barrierefreies-bad`: mittiger Einstieg, sechs Schritte in zwei Spalten unter mittigem Kopf, kleines Karussell der
// Kundenstimmen. Nur zum Ansehen und Prüfen der Vorlage, bevor die Hauptseiten sie nutzen (E3-BAU).
import ErzaehlSeite from '@/components/vorlagen/ErzaehlSeite';
import { BARRIEREFREIES_BAD } from '@/inhalte/barrierefreies-bad';
import type { ErzaehlInhalt } from '@/components/vorlagen/inhalt';

export const metadata = { title: 'Schaufenster Ruhe', robots: { index: false, follow: false } };

const SECHS: ErzaehlInhalt['ablauf']['schritte'] = [
  { titel: 'Anrufen oder schreiben', text: 'Sie rufen an oder schreiben uns. Wir vereinbaren einen Termin.' },
  { titel: 'Termin bei Ihnen vor Ort', text: 'Deniz Tezgel schaut sich Ihr Bad an. Der Termin ist kostenfrei.' },
  { titel: 'Angebot zum Festpreis', text: 'Sie bekommen ein schriftliches Angebot mit festem Preis.' },
  { titel: 'Fliesen aussuchen', text: 'Sie wählen Fliesen und Farben aus. Wir beraten Sie dabei.' },
  { titel: 'Umbau', text: 'Wir bauen um und schützen Ihre Wohnung vor Staub.' },
  { titel: 'Übergabe', text: 'Zum Schluss gehen wir alles gemeinsam durch.' },
];

const INHALT: ErzaehlInhalt = {
  ...BARRIEREFREIES_BAD,
  worum: { ...BARRIEREFREIES_BAD.worum, einstieg: 'mitte', titelZeilen: ['Ein Bad ohne Stufe', 'für jedes Alter.'] },
  ablauf: { ...BARRIEREFREIES_BAD.ablauf, titel: 'So läuft Ihr neues Bad ab.', einleitung: 'Sechs Schritte, ein fester Ansprechpartner.', schritte: SECHS, hinweis: undefined },
  beleg: { ...BARRIEREFREIES_BAD.beleg, stimmen: ['c-wolf', 'rabia-oe', 'elke-s', 'hasan-oe', 'ute-t', 'peter-p'], stimmenGross: false },
};

export default function SchaufensterRuhe() {
  return <ErzaehlSeite inhalt={INHALT} />;
}
