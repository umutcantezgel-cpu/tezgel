// Startbild der Startseite: das echte Foto, im mittigen Einstieg das LCP-Element und darum mit hoher Ladepriorität (`lcp`,
// E-061). Seit dem Eingang ohne Vorhang (E-067-4, UM-E3-EIN) liegt kein Belag mehr darüber: Das Foto ist ab dem ersten Bild
// sichtbar, auch beim ersten Aufruf, nie verdeckt und nie mit Deckkraft 0. Begleitet wird es im Eingang nur vom Fugenriss an
// der Oberkante (Bildplatz in vorlagen/teile/EinstiegMitte.tsx, bewegung.css „eingang“). Die Kennung `startbild` bleibt als
// Alias von `eingang` im Register.
// UM-E4-START (Sicht Anlauf 3: am Desktop zeigte das hohe Foto im ersten Bildschirm Decke und Regenbrause, die Fliesen erst
// darunter; mobil lag es ganz unter dem Falz): ein echtes Querformat aus dem Bestand, das Bad im Dachgeschoss (IMG_2569), auf
// dem Boden und Wand ganz zu sehen sind. Unter lg im eigenen Seitenverhältnis 3 : 2 (mobil steht es so ganz im ersten
// Bildschirm), ab lg derselbe Raum oben um die Dachschräge gekürzt auf 16 : 9 (Bildauswahl je Breite, eine Datei lädt). Die
// Dusche ohne Stufe (start-dusche) bleibt auf /fliesen und in der Galerie. Serverkomponente.
import Bildfeld from '@/components/kern/Bildfeld';
import type { ArbeitId } from '@/config/arbeiten';

/** Bildbreiten des Zuschnitts ab lg (EinstiegMitte: Foto ab lg zwischen der halben und zwei Dritteln der Spalte, so hoch, dass
 *  es im ersten Bildschirm steht; hier die Obergrenze zwei Drittel, bis 1440 px in der Ausgangsgröße, darüber mit der
 *  wachsenden Grundschrift wie EINSTIEG_MITTE_SIZES) */
export const STARTBILD_GROSS_SIZES = '(min-width: 1440px) min(calc(31.67rem + 21.11vw), 63.33rem), min(calc(66.67vw - 4rem), 51rem)';

/** `gross`: Zuschnitt ab lg (START.worum.bildQuer) */
export default function Startbild({ sizes, lcp = false, gross }: { sizes: string; lcp?: boolean; gross?: ArbeitId }) {
  return <Bildfeld arbeit="start-bad" lcp={lcp} sizes={sizes} gross={gross ? { arbeit: gross, media: '(min-width: 1024px)', sizes: STARTBILD_GROSS_SIZES } : undefined} />;
}
