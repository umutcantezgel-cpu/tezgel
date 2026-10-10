import type { Metadata, Viewport } from 'next';
import BestandDokument, { BESTAND_METADATA, BESTAND_VIEWPORT } from './(bestand)/_dokument';
import NotFound, { metadata as nichtGefunden } from './(bestand)/not-found';

// Unbekannte Adressen (E-015): eigenes Dokument, da es mehrere Root-Layouts gibt.
// Titel wie bisher über die Vorlage des Root-Layouts gebildet (inhaltsneutraler Umzug; doppelte Marke ist Altbestand, Korrektur in P4-10).
export const metadata: Metadata = { ...BESTAND_METADATA, ...nichtGefunden, title: `${nichtGefunden.title} | Fliesenverlegung Tezgel` };
export const viewport: Viewport = BESTAND_VIEWPORT;

export default function GlobalNotFound() {
  return (
    <BestandDokument>
      <NotFound />
    </BestandDokument>
  );
}
