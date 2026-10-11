// Gemeinsame Teile der Vorlage Übersicht (P4-02) – seit P4-10a in `../teile`; hier unter altem Namen.
// Abschnitt: früher `seitenart` + `abstand` → jetzt `dichte` (erzaehl = weit, arbeit/eng = eng, keiner = keine); `kopf={…}`
// → Kopf-Props direkt (`titel`, `etikett`, `einleitung`, `kopfLage="geteilt"`, `kopfGroesse`, `kopfEbene`).
// Aktionen → `Knopfreihe` (`knoepfe`, `anordnung="spalte"` statt `gestapelt`); Merkmale → `Punkte` (`groesse="dicht"`).
// Lot und ACHSE_SPALTE gehören jetzt zum gemeinsamen `Einstieg` (Variante `achse="lot"`).
export { default as Abschnitt, Abschnittskopf, Nachsatz, type AbschnittProps, type AbschnittKopfProps as AbschnittskopfProps } from '@/components/kern/vorlagen/teile/Abschnitt';
export { default as Aktionen } from '@/components/kern/vorlagen/teile/Knopfreihe';
export { Punkte as Merkmale } from '@/components/kern/vorlagen/teile/Punkte';
export { Pfeillink, Ruecklink } from '@/components/kern/vorlagen/teile/Pfeillink';
export type { Aktion, Verweis, Seitenart } from '@/components/kern/vorlagen/teile/typen';
