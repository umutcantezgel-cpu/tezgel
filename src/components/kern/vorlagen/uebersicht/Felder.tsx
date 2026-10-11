// Felder der Übersicht (P4-02) – seit P4-10a die gemeinsame `Feldliste` (`teile/Felder.tsx`) mit den Vorgaben der Übersicht:
// höchstens zwei Felder je Reihe, Titel höchstens k-5, Text k-2. Früher `felder` → `eintraege`, `titelEbene` → `ebene`,
// `text` → `inhalt`.
import { Feldliste, type Feld, type FeldlisteProps } from '@/components/kern/vorlagen/teile/Felder';

export type { Feld };
export type FelderProps = FeldlisteProps;

export default function Felder(props: FeldlisteProps) {
  return <Feldliste spalten={2} titelGroesse="gross" textGroesse="klein" {...props} />;
}
