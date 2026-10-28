import type { Metadata, Viewport } from 'next';
import BestandDokument, { BESTAND_METADATA, BESTAND_VIEWPORT } from './_dokument';
import Cursor from '@/components/cursor/Cursor';

export const metadata: Metadata = BESTAND_METADATA;
export const viewport: Viewport = BESTAND_VIEWPORT;

export default function BestandLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <BestandDokument>
      {children}
      {/* Fugenkreuz-Cursor (KERN K-007, UM-E3-CURSOR): rendert nichts; lädt sein Modul erst bei der ersten Mausbewegung
          nach der Hydrierung und nur bei feinem Zeiger, das Schild hängt das Modul an body (außerhalb von main) */}
      <Cursor />
    </BestandDokument>
  );
}
