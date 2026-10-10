import type { Metadata } from 'next';
import { archivo, plexMono } from '@/app/fonts/kern';
import { KOPF_SKRIPT } from '@/lib/motion/kopfskript';
import BewegungsRegie from '@/lib/motion/BewegungsRegie';
import '@/styles/kern-global.css';

export const metadata: Metadata = { title: 'Kern-Probe' };

export default function KernLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${archivo.variable} ${plexMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: KOPF_SKRIPT }} />
      </head>
      <body className="bg-k-kalk text-k-tinte k-text">
        <main id="main-content">{children}</main>
        <BewegungsRegie />
      </body>
    </html>
  );
}
