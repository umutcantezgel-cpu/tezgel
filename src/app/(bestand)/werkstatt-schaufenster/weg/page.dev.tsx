// Dev-Schaufenster (nur next dev, pageExtensions „dev.tsx“): großer Moment „weg“ (E3-GRAF-02) im Schlitz momente.ablauf wie auf
// /bad/badsanierung, Stationen, Einleitung und Unterschriften wörtlich aus _werkstatt/texte/bad-badsanierung.md; Vorlage
// ErzaehlSeite mit dem Inhalt von /bad/barrierefreies-bad als Rahmen (Prüfstufe A, E-045).
import ErzaehlSeite from '@/components/vorlagen/ErzaehlSeite';
import type { Foto } from '@/components/vorlagen/teile/Fotos';
import Weg from '@/components/momente/weg/Weg';
import { BARRIEREFREIES_BAD } from '@/inhalte/barrierefreies-bad';

export const metadata = { title: 'Schaufenster · weg', robots: { index: false, follow: false } };

const STATIONEN = [
  { titel: 'Anruf und Rückruf', text: 'Sie rufen an oder schicken uns Ihre Anfrage. Deniz Tezgel ruft Sie zurück.' },
  { titel: 'Termin bei Ihnen', text: 'Deniz Tezgel kommt zu Ihnen, sieht sich Ihr Bad genau an, und dieser Termin ist kostenfrei.' },
  { titel: 'Planen und auswählen', text: 'Gemeinsam wählen Sie Fliesen und Dusche aus, danach bekommen Sie ein Festpreisangebot, also ein Angebot mit festem Preis.' },
  { titel: 'Ausbau mit Staubschutz', text: 'Wenn Sie während des Umbaus zu Hause wohnen, schützen wir Ihre Räume mit Staubschutzwänden und Luftreinigern.' },
  { titel: 'Fliesen verlegen', text: 'Wir verlegen den neuen Boden und die Wände, bis die letzte Fuge fertig ist.' },
  { titel: 'Übergabe an Sie', text: 'Zum Schluss ist der Raum gefegt und sauber, und wir gehen alles gemeinsam mit Ihnen durch.' },
];

const BILDER: Foto[] = [
  { bild: 'sanierung-weg-2', unterschrift: 'Bad während der Arbeit: offene Decke und dunkle Holzoptik am Boden.' },
  { bild: 'sanierung-weg-1', unterschrift: 'Bad während der Arbeit: beige Wandfliesen bis halbhoch.' },
  { bild: 'sanierung-weg-3', unterschrift: 'Bad während der Arbeit: brauner Boden im Duschbereich, Decke im Ausbau.' },
];

const INHALT = {
  ...BARRIEREFREIES_BAD,
  ablauf: {
    ...BARRIEREFREIES_BAD.ablauf,
    titel: 'So kommen Sie zu Ihrem neuen Bad.',
    einleitung: 'Deniz Tezgel ist Ihr fester Ansprechpartner, von der ersten Skizze bis zum Schluss.',
    schritte: STATIONEN,
  },
};

export default function SchaufensterWeg() {
  return <ErzaehlSeite inhalt={INHALT} momente={{ ablauf: <Weg stationen={STATIONEN} bilder={BILDER} /> }} />;
}
