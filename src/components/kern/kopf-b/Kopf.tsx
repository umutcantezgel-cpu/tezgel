// Kern-Kopf Variante B „Achse“ (P3-06, KERN v1.2 K-011): ruhig und hell – links das Logo, rechts die Einträge in Archivo,
// Telefon in Mono und der Hauptknopf „Aufmaß anfragen“. Fest am oberen Rand (sticky, im Fluss: kein Platzhalter, kein
// Layoutsprung), feste Höhe, 1-px-Fuge unten (`shadow-k-1`), kein Schrumpfen, kein Farbwechsel beim Scrollen.
// Server-Komponente: Logo, Telefon und Hauptknopf kommen als HTML; nur Hauptnavigation und Mobilmenü sind Client-Teile
// und lesen den Pfad selbst (usePathname).
//
// Kopfhöhe – CSS-Variable, hier am <header> gesetzt (erben Blätter und Mobilmenü, auch im Top-Layer):
//   --k-kopf-hoehe: var(--spacing-k-8)   /* 64 px, alle Breiten */
// Für `scroll-padding-top` gehört dieselbe Definition auf :root (Vorschlag in der Rückgabe P3-06b):
//   html { scroll-padding-top: calc(var(--k-kopf-hoehe) + var(--spacing-k-4)); }   /* 80 px */
//
// Einbau: als direktes Kind von <body> vor <main> (sticky braucht einen seitenhohen Elternblock).
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
};

export function KopfRahmen({ vorschauPfad }: KopfRahmenProps) {
  const eintraege = kopfEintraege();
  const kontakt = kopfKontakt();
  const anfrage = kopfAnfrage();
  const tafel = vorschauPfad !== undefined;
  return (
    <header
      data-kopf="b"
      className={verbinde(
        '[--k-kopf-hoehe:var(--spacing-k-8)] z-40 h-(--k-kopf-hoehe) bg-k-kalk text-k-tinte shadow-k-1',
        tafel ? 'relative' : 'sticky top-0',
      )}
    >
      <div className="mx-auto flex h-full max-w-(--k-seite) items-center gap-k-3 px-(--k-rand)">
        <Marke />
        <div className="ml-auto hidden h-full lg:flex">
          <Hauptnavigation eintraege={eintraege} pfad={vorschauPfad} statisch={tafel} />
        </div>
        <div className="hidden items-center lg:flex">
          <a
            href={`tel:${kontakt.telefonLink}`}
            aria-label={telefonName(kontakt.telefon)}
            data-motion="zustand"
            className={verbinde(
              'group/tel flex h-k-7 min-w-k-7 items-center justify-center gap-k-2 rounded-k-1 text-k-tinte xl:px-k-2',
              fokus('hell'),
            )}
          >
            <Icon name="telefon" groesse={20} />
            <span className="hidden k-mono text-k-2 whitespace-nowrap underline-offset-4 pointer-fine:group-hover/tel:underline xl:inline">
              {kontakt.telefon}
            </span>
          </a>
          <Knopf href={anfrage.pfad} groesse="klein" className="whitespace-nowrap">
            {TEXT.hauptknopf}
          </Knopf>
        </div>
        {tafel ? null : <Mobilmenue eintraege={eintraege} kontakt={kontakt} anfrage={anfrage} />}
      </div>
    </header>
  );
}

/** Kopf ohne Props; Pfad lesen die Client-Teile selbst. */
export default function Kopf() {
  return <KopfRahmen />;
}
