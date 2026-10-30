// Schriftdateien als Adresse: Import mit `with { turbopackModuleType: 'asset' }` (src/app/(bestand)/_dokument.tsx,
// UM-E4-LEISTUNG); Turbopack legt die Datei unter /_next/static/media ab und liefert ihre Adresse.
declare module '*.woff2' {
  const adresse: string;
  export default adresse;
}
