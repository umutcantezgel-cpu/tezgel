import localFont from 'next/font/local';

// Schriften des Gestaltungskerns (KERN K-005). Wörtliche Pfade, damit next/font sie zur Build-Zeit einbindet.
export const archivo = localFont({
  src: './archivo-latin-variabel.woff2',
  weight: '100 900',
  style: 'normal',
  display: 'swap',
  variable: '--k-font-text',
  adjustFontFallback: 'Arial',
  declarations: [{ prop: 'font-stretch', value: '62% 125%' }],
});

export const plexMono = localFont({
  src: './ibm-plex-mono-latin-400.woff2',
  weight: '400',
  style: 'normal',
  display: 'swap',
  variable: '--k-font-mono',
  // Courier New hat dieselbe Zeichenbreite (0,6 em) wie Plex Mono – kein Zeilenumbruch-Sprung beim Tausch
  adjustFontFallback: false,
  fallback: ['Courier New', 'ui-monospace', 'monospace'],
});
