// Vorlage Artikel (P4-02): `/blog/[slug]`. Kopf aus `../liste`, Raster aus `../detail`.
export { default as Inhaltsverzeichnis, type Verzeichniseintrag, type InhaltsverzeichnisProps } from '@/components/kern/vorlagen/artikel/Inhaltsverzeichnis';
export { lesesatz, Lesetext, type Anker } from '@/components/kern/vorlagen/artikel/Satz';
export { default as Teilen, type TeilenZiel, type TeilenProps } from '@/components/kern/vorlagen/artikel/Teilen';
export { Vorspann, Schlagworte, Rueckmeldung, Verfasser, type RueckmeldungProps, type VerfasserProps } from '@/components/kern/vorlagen/artikel/Teile';
export { default as Verwandte, type VerwandterArtikel, type VerwandteProps } from '@/components/kern/vorlagen/artikel/Verwandte';
