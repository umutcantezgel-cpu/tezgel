// Weiterlesen (P4-02): Querverweise am Ende eines Hubs – seit P4-10a der gemeinsame `Verweisblock` (`teile/Verweise.tsx`)
// in der Form `liste` (Überschrift ab lg Sp. 1–4, Pfeillinks ab Behälter 36rem zweispaltig, Nachsatz). Als eigener Abschnitt:
// `Querverweise form="liste"`.
import { Verweisblock, type VerweisblockProps } from '@/components/kern/vorlagen/teile/Verweise';

export type WeiterlesenProps = Omit<VerweisblockProps, 'form'>;

export default function Weiterlesen(props: WeiterlesenProps) {
  return <Verweisblock form="liste" {...props} />;
}
