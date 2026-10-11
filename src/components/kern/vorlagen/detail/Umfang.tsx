// Umfang, Vermerk, Musterfeld (P4-02, KERN v1.2) – Teile der Detailseiten `/referenzen/[id]` und `/bad/musterbaeder/[slug]`.
// - Umfang: „Was ein solches Projekt umfasst“ bzw. „Projekt-Überblick: …“ mit Satz und Gruppen (h3 + Haken-Liste,
//   z. B. „Typischer Leistungsumfang“, „Unser Qualitätsstandard“). Ebenen wie im Bestand (h2, h3).
// - Vermerk: ehrlicher Hinweis auf fehlende Dokumentation („Fotos und Details folgen“) mit Hinweis-Zeichen, Satz und
//   Verweis; Rahmen Strich, kein Orange-Kasten. Nichts wird ergänzt, was der Bestand nicht belegt.
// - Musterfeld: dekorative Fläche im Muster Kreuzfuge (K-010) mit optionalem Fachzeichen – ersetzt das Keramik-Panel
//   mit Verlauf und Icon-Chip der Platzhalter-Referenzen; aria-hidden wie im Bestand, kein Foto vorgetäuscht.
import type { ReactNode } from 'react';
import { verbinde } from '@/components/kern/basis';
import Icon from '@/components/kern/icons/Icon';
import type { IconName } from '@/components/kern/icons/geometrie';
import { Merkmale, Pfeillink, type Verweis } from '@/components/kern/vorlagen/uebersicht/Abschnitt';

export type UmfangProps = {
  titel: ReactNode;
  titelId?: string;
  text?: ReactNode;
  gruppen?: { titel: ReactNode; punkte: ReactNode[]; spalten?: 1 | 2 }[];
  className?: string;
};

export function Umfang({ titel, titelId, text, gruppen = [], className }: UmfangProps) {
  return (
    <div className={verbinde('flex flex-col gap-k-6', className)}>
      <div className="flex flex-col gap-k-4">
        <h2 id={titelId} className="k-anzeige text-k-5 text-k-tinte wrap-break-word hyphens-auto">
          {titel}
        </h2>
        {text ? <div className="max-w-(--k-mass) k-text text-k-3 text-k-tinte-2">{text}</div> : null}
      </div>
      {gruppen.map((g, i) => (
        <div key={i} className="flex flex-col gap-k-3">
          <h3 className="k-anzeige text-k-4 text-k-tinte wrap-break-word hyphens-auto">{g.titel}</h3>
          <Merkmale punkte={g.punkte} spalten={g.spalten ?? 1} dicht />
        </div>
      ))}
    </div>
  );
}

export function Vermerk({ titel, text, verweis, className }: { titel: ReactNode; text?: ReactNode; verweis?: Verweis; className?: string }) {
  return (
    <div className={verbinde('flex flex-col gap-k-3 border border-k-strich bg-k-fliese p-k-5 lg:p-k-6', className)}>
      <h2 className="flex items-start gap-k-3 k-anzeige text-k-4 text-k-tinte">
        <span aria-hidden="true" className="flex h-lh shrink-0 items-center">
          <Icon name="hinweis" groesse={24} />
        </span>
        <span className="min-w-0 wrap-break-word hyphens-auto">{titel}</span>
      </h2>
      {text ? <div className="max-w-(--k-mass) k-text text-k-2 text-k-tinte-2">{text}</div> : null}
      {verweis ? (
        <div>
          <Pfeillink href={verweis.href} ariaLabel={verweis.ariaLabel}>
            {verweis.label}
          </Pfeillink>
        </div>
      ) : null}
    </div>
  );
}

export function Musterfeld({ zeichen, rahmen = true, className }: { zeichen?: IconName; rahmen?: boolean; className?: string }) {
  return (
    <div aria-hidden="true" className={verbinde('k-muster-kreuzfuge flex aspect-2/1 w-full items-center justify-center bg-k-kalk text-k-strich', rahmen && 'border border-k-fuge', className)}>
      {zeichen ? (
        <span className="flex border border-k-fuge bg-k-fliese p-k-3 text-k-tinte-2">
          <Icon name={zeichen} groesse={32} />
        </span>
      ) : null}
    </div>
  );
}
