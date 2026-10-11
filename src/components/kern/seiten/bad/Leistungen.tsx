// Bad-Leistungen im Überblick (P4-08a, KERN v1.2 K-002 Aufgabe 1, K-003 „Fuge statt Karte“): das Leistungsverzeichnis
// von /bad als eigener Abschnitt im Planblatt des Einstiegs. Ab lg steht es rechts neben der H1 (Sp. 9–12) über zwei
// Zeilen des Einstiegsrasters (Subgrid): Kopf unten bündig auf der Waage, die Liste hängt an der Waage. So liegt der Weg zur
// passenden Leistung (Probelauf Aufgabe 1) am Desktop im ersten Bildschirm; mobil folgt er direkt nach den Zusagen.
// Statt Icon-Kacheln (Bestand, S-03) eine Zeile je Leistung zwischen 1-px-Fugen: Name (unterstrichen), Beschreibung,
// Pfeil. Jede Zeile ist genau ein Link (ein Tab-Halt), Trefferfläche ≥ 64 px.
// Zustände: Ruhe · Hover (feiner Zeiger: Fliese, Unterstreichung 2 px Tinte) · aktiv/Touch (Fuge) · Fokus 2 px Tinte mit
// Abstand, über den Nachbarzeilen (`relative z-10`, Lehre 4). Kein Rot (das Rot trägt die Waage).
// Name und Beschreibung stehen wie im Bestand als Spans im selben Link (ein Texteintrag „Name Beschreibung“).
// Spalte schmal (ab lg ≈ 19–25 rem): Überschrift nach dem längsten Wort im Randfeld (`rand`, höchstens k-5).
import Link from 'next/link';
import { Etikett, fokus, verbinde } from '@/components/kern/basis';
import Icon from '@/components/kern/icons/Icon';
import { UMBRUCH, stufeNachWort } from '@/components/kern/vorlagen/teile';
import { BAD_LEISTUNGEN } from '@/components/kern/seiten/bad/daten';
import MitNorm from '@/components/kern/seiten/bad/Norm';

const TITEL = 'Alles für Ihr neues Bad aus einer Hand';

const ZEILE = verbinde(
  'group flex min-h-k-8 items-center gap-k-3 px-k-3 py-k-3 text-k-tinte',
  'pointer-fine:hover:bg-k-fliese active:bg-k-fuge focus-visible:relative focus-visible:z-10',
  fokus(),
);
const NAME = verbinde(
  'k-text text-k-3 font-semibold',
  'underline decoration-1 underline-offset-4 decoration-k-strich pointer-fine:group-hover:decoration-2 pointer-fine:group-hover:decoration-k-tinte group-active:decoration-2 group-active:decoration-k-tinte',
  UMBRUCH,
);

export default function Leistungen({ className }: { className?: string }) {
  return (
    <section aria-labelledby="bad-services-heading" className={verbinde('min-w-0', className)}>
      <header className="min-w-0 lg:self-end lg:pb-k-5">
        <Etikett kreuz>Bad-Leistungen im Überblick</Etikett>
        <h2 id="bad-services-heading" className={verbinde('mt-k-4 k-anzeige text-k-tinte', stufeNachWort(TITEL, 'rand', 'text-k-5'), UMBRUCH)}>
          {TITEL}
        </h2>
      </header>
      <ul className="mt-k-5 min-w-0 border-t border-k-tinte lg:mt-0 lg:border-t-0">
        {BAD_LEISTUNGEN.map((leistung) => (
          <li key={leistung.path} className="border-b border-k-fuge">
            <Link href={leistung.path} data-motion="zustand" className={ZEILE}>
              <span className="flex min-w-0 flex-1 flex-col gap-k-1">
                <span className={NAME}>{leistung.title}</span>
                <span className={verbinde('k-text text-k-2 text-k-tinte-2', UMBRUCH)}>
                  <MitNorm text={leistung.desc} />
                </span>
              </span>
              <span aria-hidden="true" className="flex shrink-0 text-k-strich pointer-fine:group-hover:text-k-tinte">
                <Icon name="pfeil" groesse={20} />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
