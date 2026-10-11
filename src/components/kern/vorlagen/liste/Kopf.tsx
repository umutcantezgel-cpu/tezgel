// Seitenkopf der Vorlagen Liste, Artikel und Detail (P4-02, KERN v1.2 K-011) – seit P4-10a der gemeinsame `teile/Einstieg`
// als `<header>`: Arbeitsseite (`/blog`, Blogartikel) = `achse="keine"` (kompakt, H1 höchstens k-6, kein Lot); Erzählseite
// (`/bad/musterbaeder`, `/referenzen` und ihre Detailseiten laut GRUNDMENGE.json) = `achse="lot"` (H1 höchstens k-7, Lot).
// Lesefolge: Rücksprung · Etiketten · H1 · Vorspann · Kennzeile (Datum, Lesezeit in Mono) · Hinweis · Wege.
// Früher `text` → `vorspann`, `aktionen` → `knoepfe`, `rand` → `motiv`, `ruecklink.label` → `ruecklink.titel`.
import Einstieg, { type EinstiegProps, type Kennung } from '@/components/kern/vorlagen/teile/Einstieg';
import type { Seitenart } from '@/components/kern/vorlagen/teile/typen';

export type { Kennung };
export type KopfProps = Omit<EinstiegProps, 'achse' | 'als'> & { seitenart?: Seitenart };

export default function Kopf({ seitenart = 'arbeit', ...props }: KopfProps) {
  return <Einstieg als="header" achse={seitenart === 'erzaehl' ? 'lot' : 'keine'} {...props} />;
}
