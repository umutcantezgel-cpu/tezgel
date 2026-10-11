// Vorschau P4-03 (ruhender Entwurf, wird nie freigeschaltet): alle Verlegepläne je Leistung, je zweimal – links als
// SIG-3 in Ruhe (Belag versetzt; Hover mit feinem Zeiger, Tastaturfokus oder Antippen richtet ihn aus), rechts ruhend
// wie auf Fachseiten (Endzustand in der Flucht, hier bedeutungstragend mit Titel). Erst auf hellem Grund (Fliese),
// dann auf Tinte. Auslöser ist der Link um den Plan (Klasse SIG_PLAN_AUSLOESER), der Fokusring sitzt an ihm.
// Nur Klassen, die auch in gescannten Kern-Dateien vorkommen (`_entwurf` ist von @source ausgenommen).
// P4-10a: Etikett „Name · Zuordnung“ in einem Element mit Trenner (vorher zwei Etiketten ohne Abstand: „badbad“); dazu der
// Zustand „Leistungskarte“: die gemeinsame Feldliste der Vorlagen mit dem Plan als Motiv – das Feld trägt SIG_PLAN_AUSLOESER,
// Hover oder Fokus auf dem Titel-Link richtet den Plan aus (Wortlaut aus `SERVICES`, `src/config/services.js`).
import type { Metadata } from 'next';
import Etikett from '@/components/kern/basis/Etikett';
import { Feldraster, Rasterfeld } from '@/components/kern/basis/Feldraster';
import { fokus, verbinde, type Grund } from '@/components/kern/basis/klassen';
import { PLAENE, PLAN_JE_LEISTUNG, PLAN_JE_UNTERLEISTUNG, SIG_PLAN_AUSLOESER, type PlanName } from '@/components/kern/motive/plaene';
import { SERVICES } from '@/config/services';
import { Abschnitt, Feldliste, Trenner } from '@/components/kern/vorlagen/teile';

export const metadata: Metadata = {
  title: 'Vorschau P4-03 Verlegepläne',
  robots: { index: false, follow: false },
};

const NAMEN = Object.keys(PLAENE) as PlanName[];

/** Leistungen und Unterleistungen, die auf den Plan zeigen (nur Vorschau-Etikett). */
function zuordnung(name: PlanName): string {
  const ids = [
    ...Object.entries(PLAN_JE_LEISTUNG).filter(([, p]) => p === name).map(([id]) => id),
    ...Object.entries(PLAN_JE_UNTERLEISTUNG).filter(([, p]) => p === name).map(([id]) => id),
  ];
  return ids.length ? ids.join(' · ') : 'Fachseite';
}

function Tafel({ auf }: { auf: Grund }) {
  const tinte = auf === 'tinte';
  return (
    <Feldraster auf={auf} className="mt-k-5">
      {NAMEN.map((name) => {
        const { Plan, beschreibung } = PLAENE[name];
        const anker = `p4-03-${name}-${auf}`;
        return (
          <Rasterfeld key={name} auf={auf} breite={{ mobil: 4, tablett: 8, desktop: 6 }} flaeche={tinte ? 'keine' : 'fliese'}>
            <Etikett auf={auf} als="p" ton="tinte" kreuz>
              <span>{name}</span>
              <Trenner />
              <span>{zuordnung(name)}</span>
            </Etikett>
            <div className="mt-k-4 grid grid-cols-2 gap-k-4">
              <a id={anker} href={`#${anker}`} className={verbinde(SIG_PLAN_AUSLOESER, 'block min-w-0 rounded-k-0', fokus(auf))}>
                <Plan />
                <Etikett auf={auf} className="mt-k-2">
                  Ruhe · Hover oder Fokus richtet aus
                </Etikett>
              </a>
              <div className="min-w-0">
                <Plan ruhend titel={tinte ? undefined : beschreibung} />
                <Etikett auf={auf} className="mt-k-2">
                  ruhend · Flucht
                </Etikett>
              </div>
            </div>
          </Rasterfeld>
        );
      })}
    </Feldraster>
  );
}

export default function VorschauP403() {
  return (
    <>
      <section aria-labelledby="p4-03-hell" className="py-k-9 text-k-tinte">
        <div className="mx-auto max-w-(--k-seite) px-(--k-rand)">
          <Etikett als="p" id="p4-03-hell" kreuz>
            Vorschau P4-03 · Verlegepläne je Leistung · heller Grund
          </Etikett>
          <Tafel auf="hell" />
        </div>
      </section>
      <Abschnitt titelId="p4-03-karten" dichte="normal">
        <Etikett als="p" id="p4-03-karten" kreuz>
          Vorschau P4-03 · Zustand Leistungskarte (Vorlage Felder, SIG-3)
        </Etikett>
        <Feldliste
          className="mt-k-5"
          spalten={2}
          titelGroesse="gross"
          labelledBy="p4-03-karten"
          eintraege={SERVICES.map((leistung) => {
            const { Plan } = PLAENE[PLAN_JE_LEISTUNG[leistung.id]];
            return { motiv: <Plan />, titel: leistung.name, titelHref: `/leistungen/${leistung.id}`, inhalt: leistung.shortDescription };
          })}
        />
      </Abschnitt>
      <section aria-labelledby="p4-03-tinte" className="bg-k-tinte py-k-9 text-k-kalk">
        <div className="mx-auto max-w-(--k-seite) px-(--k-rand)">
          <Etikett als="p" id="p4-03-tinte" auf="tinte" kreuz>
            Vorschau P4-03 · Verlegepläne je Leistung · auf Tinte
          </Etikett>
          <Tafel auf="tinte" />
        </div>
      </section>
    </>
  );
}
