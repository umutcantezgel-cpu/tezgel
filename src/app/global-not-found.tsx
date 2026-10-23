import type { Metadata, Viewport } from 'next';
import BestandDokument, { BESTAND_METADATA, BESTAND_VIEWPORT } from './(bestand)/_dokument';
import NotFound, { metadata as nichtGefunden } from './(bestand)/not-found';

// Unbekannte Adressen (E-015): eigenes Dokument, da es kein app/layout.tsx gibt (das Root-Layout liegt in der Gruppe (bestand)).
// Titel wie die Vorlage des Root-Layouts: Seitenname aus not-found.tsx plus Marke, einmal (E2-ORCH-07).
export const metadata: Metadata = { ...BESTAND_METADATA, ...nichtGefunden, title: `${nichtGefunden.title} | Fliesenverlegung Tezgel` };
export const viewport: Viewport = BESTAND_VIEWPORT;

export default function GlobalNotFound() {
  return (
    <BestandDokument>
      <NotFound />
    </BestandDokument>
  );
}
