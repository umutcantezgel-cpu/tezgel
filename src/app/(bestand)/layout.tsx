import type { Metadata, Viewport } from 'next';
import BestandDokument, { BESTAND_METADATA, BESTAND_VIEWPORT } from './_dokument';

export const metadata: Metadata = BESTAND_METADATA;
export const viewport: Viewport = BESTAND_VIEWPORT;

export default function BestandLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <BestandDokument>{children}</BestandDokument>;
}
