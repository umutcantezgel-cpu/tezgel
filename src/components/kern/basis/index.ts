// Kern-Grundbausteine (P3-03, KERN v1.2). Import: `import { Knopf, Feld } from '@/components/kern/basis'`.
export { default as Knopf, LADETEXT, type KnopfProps, type KnopfAlsLink, type KnopfAlsButton, type KnopfArt, type KnopfGroesse } from '@/components/kern/basis/Knopf';
export { default as SendeKnopf, type SendeKnopfProps } from '@/components/kern/basis/SendeKnopf';
// useLadeanzeige steht bewusst nicht im Sammelexport: Die Datei importiert React-Hooks ohne 'use client'; über den Sammelexport
// würde jede Server-Komponente sie mitziehen (Turbopack-Fehler). Client-Komponenten importieren sie direkt aus ./useLadeanzeige.
export { default as Textlink, type TextlinkProps } from '@/components/kern/basis/Textlink';
export { default as Feld, type FeldProps, type FeldArt } from '@/components/kern/basis/Feld';
export { default as Mehrzeilig, type MehrzeiligProps } from '@/components/kern/basis/Mehrzeilig';
export { default as Auswahl, type AuswahlProps } from '@/components/kern/basis/Auswahl';
export { default as Ankreuzfeld, type AnkreuzfeldProps } from '@/components/kern/basis/Ankreuzfeld';
export { default as Auswahlknopf, type AuswahlknopfProps } from '@/components/kern/basis/Auswahlknopf';
export { default as Feldgruppe, type FeldgruppeProps } from '@/components/kern/basis/Feldgruppe';
export { FeldMeldung, type FeldAngaben } from '@/components/kern/basis/Feldrahmen';
export { Akkordeon, AkkordeonEintrag, type AkkordeonEintragProps } from '@/components/kern/basis/Akkordeon';
export { default as Hinweis, type HinweisProps, type HinweisArt } from '@/components/kern/basis/Hinweis';
export { default as Etikett, type EtikettProps } from '@/components/kern/basis/Etikett';
export { Feldraster, Rasterfeld, type FeldrasterProps, type RasterfeldProps, type Breite } from '@/components/kern/basis/Feldraster';
export { default as Fugenlinie, type FugenlinieProps } from '@/components/kern/basis/Fugenlinie';
export { Fugenkreuz } from '@/components/kern/basis/Zeichen';
export { verbinde, fokus, type Grund } from '@/components/kern/basis/klassen';
