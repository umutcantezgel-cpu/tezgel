// Übersicht · Verzeichnis der Unterseiten (P4-02) – seit P4-10a die gemeinsame `Verweisliste` (`teile/Verweise.tsx`) in den
// Formen `zeilen` (Register) und `felder` (Verweisfelder auf Kalk, Titel in Archivo-Anzeige, höchstens drei je Reihe).
// Früher `text` → `beschreibung`.
import { Verweisliste } from '@/components/kern/vorlagen/teile/Verweise';
import type { Verweis } from '@/components/kern/vorlagen/teile/typen';

export type VerzeichnisEintrag = Verweis;

export type VerzeichnisProps = {
  eintraege: readonly Verweis[];
  form?: 'zeilen' | 'felder';
  /** Name der Liste für Screenreader (id einer sichtbaren Überschrift) */
  labelledBy?: string;
  className?: string;
};

export default function Verzeichnis({ eintraege, form = 'zeilen', labelledBy, className }: VerzeichnisProps) {
  return <Verweisliste verweise={eintraege} form={form} spalten={3} titelForm="anzeige" flaeche="kalk" labelledBy={labelledBy} className={className} />;
}
