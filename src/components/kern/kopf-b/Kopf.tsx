// Kern-Kopf Variante B „Achse“ (P3-06, E-022, KERN v1.2 K-011): ruhig und hell, als Zeile von Feldern wie ein
// Schriftfeld (P3-06c): Marke | Navigation | Telefon + Hauptknopf, getrennt durch volle 1-px-Fugen (`border-k-fuge`).
// Die äußeren Kanten liegen auf der Inhaltsflucht (`max-w-(--k-seite)` + `px-(--k-rand)`); das Markenfeld nimmt den
// freien Raum, so entsteht kein leeres Feld. Fest am oberen Rand (sticky, im Fluss: kein Platzhalter, kein
// Layoutsprung), feste Höhe, 1-px-Fuge unten (`shadow-k-1`), kein Schrumpfen, kein Farbwechsel beim Scrollen.
//
// Felder je Breite (gemessen mit Archivo/Plex Mono, Rückgabe P3-06b Nachtrag):
//   < md    Marke | Menü                                   (320 px: 201 von 288 px Inhalt)
//   md–xl   Marke | Telefon + Aufmaß anfragen | Menü       (Nummer in Mono ab lg; 1024 px: 762 von 928)
//   ≥ xl    Marke | Hauptnavigation | Telefon + Aufmaß anfragen   (1280 px: 1101 von 1184)
//
// Kopfhöhe: --k-kopf-hoehe = var(--spacing-k-8) = 64 px in jeder Breite, definiert auf :root in `src/styles/kern.css`;
// `scroll-padding-top` = Kopfhöhe + --spacing-k-4 (80 px) in `kern-global.css`.
//
// Server-Komponente: Logo, Telefon und Hauptknopf kommen als HTML; nur Hauptnavigation und Mobilmenü sind Client-Teile
// und lesen den Pfad selbst (usePathname). Einbau: `<Kopf />` ohne Props als direktes Kind von <body> vor <main>
// (Kern-Layout); sticky braucht einen seitenhohen Elternblock.
import { Knopf, fokus, verbinde } from '@/components/kern/basis';
import Icon from '@/components/kern/icons/Icon';
import { kopfAnfrage, kopfEintraege, kopfKontakt } from '@/components/kern/kopf-b/daten';
import Hauptnavigation from '@/components/kern/kopf-b/Hauptnavigation';
import Marke from '@/components/kern/kopf-b/Marke';
import Mobilmenue from '@/components/kern/kopf-b/Mobilmenue';
import { TEXT, telefonName } from '@/components/kern/kopf-b/modell';

export type KopfRahmenProps = {
  /** Nur Vorschau-Tafel: Pfad vorgeben (Aktivzustand) und ohne Verhalten, im Fluss statt sticky. */
  vorschauPfad?: string;
  /** Nur Vorschau-Tafel: Index des Hauptpunkts, der als geöffnet gezeichnet wird (Linie, Winkel oben). */
  vorschauOffen?: number;
};

export function KopfRahmen({ vorschauPfad, vorschauOffen }: KopfRahmenProps) {
  const eintraege = kopfEintraege();
  const kontakt = kopfKontakt();
  const anfrage = kopfAnfrage();
  const tafel = vorschauPfad !== undefined;
  return (
    <header
      data-kopf="b"
      className={verbinde(
        'z-40 h-(--k-kopf-hoehe) shrink-0 bg-k-kalk text-k-tinte shadow-k-1',
        tafel ? 'relative' : 'sticky top-0',
      )}
    >
      <div className="mx-auto flex h-full max-w-(--k-seite) px-(--k-rand)">
        {/* Feld 1: Marke (nimmt den freien Raum) */}
        <div className="flex min-w-0 flex-1 items-center pr-k-4">
          <Marke />
        </div>

        {/* Feld 2: Hauptnavigation ab xl */}
        <div className="hidden h-full border-l border-k-fuge xl:flex">
          <Hauptnavigation eintraege={eintraege} pfad={vorschauPfad} statisch={tafel} vorschauOffen={vorschauOffen} />
        </div>

        {/* Feld 3: Telefon + Hauptknopf ab md; unter md liegen beide im Mobilblatt und in der unteren Leiste */}
        <div className="hidden shrink-0 items-center gap-k-3 border-l border-k-fuge px-k-4 md:flex xl:pr-0">
          <a
            href={`tel:${kontakt.telefonLink}`}
            aria-label={telefonName(kontakt.telefon)}
            data-motion="zustand"
            className={verbinde(
              'group/tel flex h-k-7 min-w-k-7 items-center justify-center gap-k-2 rounded-k-1 text-k-tinte',
              fokus('hell'),
            )}
          >
            <Icon name="telefon" groesse={20} />
            <span className="hidden k-mono text-k-2 whitespace-nowrap underline-offset-4 pointer-fine:group-hover/tel:underline lg:inline xl:hidden">
              {kontakt.telefon}
            </span>
          </a>
          <Knopf href={anfrage.pfad} className="whitespace-nowrap">
            {TEXT.hauptknopf}
          </Knopf>
        </div>

        {/* Feld 4: Menü-Schalter unter xl */}
        {tafel ? null : <Mobilmenue eintraege={eintraege} kontakt={kontakt} anfrage={anfrage} />}
      </div>
    </header>
  );
}

/** Kopf ohne Props; den Pfad lesen die Client-Teile selbst. */
export default function Kopf() {
  return <KopfRahmen />;
}
