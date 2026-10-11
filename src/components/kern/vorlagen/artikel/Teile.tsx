// Artikel-Teile (P4-02, KERN v1.2): Vorspann, Schlagworte, Rückmeldeleiste (Abstimmung + Teilen), Verfasser.
// Ersetzen im Bestand den Auszug mit orangem Rand, Tag-Pillen, `BlogVoteButton`, den Orange-Kasten um Abstimmung und
// Teilen sowie `BlogAuthorCard` (runder Avatar mit Schatten). Wortlaut als Props, Ebenen wie im Bestand.
// Abstimmung: nur Darstellung (Bestand: useState in `BlogVoteButton.jsx`, Hook nötig, OFFENE FRAGE G9). Zustände:
// Ruhe, Hover, Fokus, aktiv; abgestimmt = gesperrt (aria-disabled) mit Haken und Dank-Text (nicht nur Farbe).
import type { ReactNode } from 'react';
import { Etikett, Knopf, verbinde } from '@/components/kern/basis';
import Icon from '@/components/kern/icons/Icon';
import { Pfeillink } from '@/components/kern/vorlagen/uebersicht/Abschnitt';

/** Vorspann über dem Lesetext (Bestand: „Praxis-Leitfaden von …: {Auszug}“), Fuge in Tinte links. */
export function Vorspann({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={verbinde('mb-k-7 max-w-(--k-mass) border-l-2 border-k-tinte pl-k-5 k-text text-k-4 font-semibold text-k-tinte', className)}>{children}</p>;
}

/** Schlagworte als Mono-Etiketten mit Rahmen (Bestand: Tag-Pillen), je Wort ein Element. */
export function Schlagworte({ worte, className }: { worte: ReactNode[]; className?: string }) {
  if (worte.length === 0) return null;
  return (
    <ul className={verbinde('flex flex-wrap gap-k-2 border-t border-k-fuge pt-k-5', className)}>
      {worte.map((w, i) => (
        <li key={i} className="min-w-0">
          <Etikett rahmen kreuz>
            {w}
          </Etikett>
        </li>
      ))}
    </ul>
  );
}

export type RueckmeldungProps = {
  /** Frage (Bestand: „War dieser Leitfaden hilfreich?“) */
  frage: ReactNode;
  /** Knopf vor bzw. nach der Abstimmung (Bestand: „Ja, sehr hilfreich“ · „Danke für Ihr Feedback!“) */
  knopf: ReactNode;
  dank: ReactNode;
  abgestimmt?: boolean;
  onAbstimmen?: () => void;
  /** rechter Teil der Leiste, z. B. `<Teilen …/>` */
  teilen?: ReactNode;
  className?: string;
};

export function Rueckmeldung({ frage, knopf, dank, abgestimmt = false, onAbstimmen, teilen, className }: RueckmeldungProps) {
  return (
    <div className={verbinde('mt-k-6 flex flex-col gap-k-4 border-y border-k-fuge py-k-4 sm:flex-row sm:items-center sm:justify-between', className)}>
      <div className="flex flex-wrap items-center gap-k-3">
        <span className="k-text text-k-2 font-semibold text-k-tinte">{frage}</span>
        <Knopf
          type="button"
          art="neben"
          groesse="normal"
          deaktiviert={abgestimmt}
          onClick={onAbstimmen}
          vorne={abgestimmt ? <Icon name="haken" groesse={20} /> : undefined}
        >
          {abgestimmt ? dank : knopf}
        </Knopf>
      </div>
      {teilen}
    </div>
  );
}

export type VerfasserProps = {
  /** Kopfzeile (Bestand: „Verfasst von“) */
  kopf: ReactNode;
  name: ReactNode;
  /** Funktion (Bestand: „Deniz Tezgel · Inhaber & Fachbetriebsleiter“) */
  rolle?: ReactNode;
  text?: ReactNode;
  /** Initiale (Bestand: Avatar-Ersatz, aria-hidden) */
  initiale?: string;
  verweis?: { label: ReactNode; href: string };
  className?: string;
};

export function Verfasser({ kopf, name, rolle, text, initiale, verweis, className }: VerfasserProps) {
  return (
    <div className={verbinde('flex flex-col gap-k-5 border border-k-fuge border-t-k-tinte bg-k-fliese p-k-5 md:flex-row lg:p-k-6', className)}>
      {initiale ? (
        <span aria-hidden="true" className="flex size-k-9 shrink-0 items-center justify-center bg-k-tinte k-anzeige text-k-6 text-k-kalk">
          {initiale}
        </span>
      ) : null}
      <div className="flex min-w-0 flex-col gap-k-2">
        <p className="k-mono text-k-1 text-k-tinte-2">{kopf}</p>
        <h3 className="k-anzeige text-k-5 text-k-tinte wrap-break-word hyphens-auto">{name}</h3>
        {rolle ? <p className="k-mono text-k-1 text-k-tinte">{rolle}</p> : null}
        {text ? <p className="max-w-(--k-mass) k-text text-k-3 text-k-tinte-2">{text}</p> : null}
        {verweis ? (
          <div>
            <Pfeillink href={verweis.href}>{verweis.label}</Pfeillink>
          </div>
        ) : null}
      </div>
    </div>
  );
}
