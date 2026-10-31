// Leistungen als Pläne (KERN v3.6 K-016 „Ruhe“, E-048; Plan-Morph und sig-plan nach E-037): die vier Bereiche der Seite
// /leistungen als eine verlegte Fläche an 1-px-Fugen (UM-E4-SICHT-FIX M-C2 Nr. 1, K-003 Nr. 4): keine Kartenrahmen, kein
// Abstand; die Fugen sind der Grund (bg-fuge) zwischen den Fliesen. Ab lg ist die zweite Reihe ungleich geteilt (ein Drittel
// und zwei Drittel, Raster aus sechs Spalten): Ihre Fuge steht nicht unter der Fuge der ersten Reihe, sondern um ein Sechstel
// versetzt, wie ein Verband. Je Fliese ein kleines Planfeld 4 : 3 (in allen Fliesen gleich: 8rem breit, oben), darunter Name,
// Satz und direkt darunter der Weg zur Leistungsseite
// (keine Bodenausrichtung mehr: In der Karte „Balkon und Terrasse“ stand sonst eine Lücke von rund 200 px über dem Link).
// Vorher vier gleiche Kartenkästen mit großen Plänen (Sichtabnahme E4 Anlauf 1, a2/b1). Der Link trägt den Plan-Morph wie
// bisher (data-uebergang="plan-vor", das Feld data-plan-uebergang, beides im Träger von sig-plan): ab lg gleitet der Plan in
// den Einstieg der Leistungsseite; die Fugen rücken bei Maus und Fokus in die Flucht (sig-plan-ziel). Kennungen wie im
// Bestand (#bad, #wohnen, #aussen, #untergrund), dazu #gewerke. Neben dem Raster tritt der Kopf der Leitachse zurück
// (data-kopf-pause="ganz", bewegung.css „Leitfaden mit Abschnittsmarke“). Auf Touch ist die Reihe ein Auftritt
// (data-plan-reihe, bewegung.css sig-plan; UM-E4-CHOR-FIX). Serverkomponente.
import Link from 'next/link';
import clsx from 'clsx';
import Icon from '@/components/icons/Icon';
import Textmarken from '@/components/kern/Textmarken';
import Verlegeplan from '@/components/kern/Verlegeplan';
import type { PlanName } from '@/lib/plaene/vorgaben';

export interface Leistungsplan {
  /** Kennung der Leistung (SERVICES) und zugleich Name ihres Plans */
  id: PlanName;
  name: string;
  satz: string;
  /** Wortlaut des Links, z. B. „Mehr zum Bad“; Ziel ist /leistungen/<id> */
  link: string;
}

/** Spalten ab lg im Raster aus sechs: erste Reihe halb und halb, zweite Reihe ein Drittel (kurzer Satz) und zwei Drittel (langer
 *  Satz); Reihenfolge wie LEISTUNGSPLAENE */
const SPANNE = ['lg:col-span-3', 'lg:col-span-3', 'lg:col-span-2', 'lg:col-span-4'];

export default function Leistungsplaene({ bereiche }: { bereiche: Leistungsplan[] }) {
  return (
    <ul id="gewerke" data-kopf-pause="ganz" data-plan-reihe="" className="grid grid-cols-1 gap-px border border-fuge bg-fuge text-left md:grid-cols-2 lg:grid-cols-6">
      {bereiche.map((b, i) => (
        <li key={b.id} className={clsx('bg-fliese', SPANNE[i])}>
          <article id={b.id} aria-labelledby={`${b.id}-titel`} data-motion="sig-plan" className="sig-plan-ziel flex h-full flex-col gap-6 p-6 lg:p-8">
            {/* Planfeld 4 : 3, klein: feste Fläche, damit Pläne mit eigenem Seitenverhältnis gleich hoch stehen (E-065). In jeder
                Fliese gleich: oben über dem Namen, 8rem breit (Nacharbeit SF-C2: vorher stand er in der schmalen Drittelfliese oben
                und kleiner, in den übrigen links daneben) */}
            <div className="flex aspect-4/3 w-32 shrink-0 items-center border border-fuge bg-kalk p-3" data-plan-uebergang={b.id}>
              <Verlegeplan plan={b.id} ohneAchse bemassung={false} />
            </div>
            <div className="min-w-0 flex-1">
              <h3 id={`${b.id}-titel`} className="font-anzeige text-fs-5 font-extrabold text-tinte">
                {b.name}
              </h3>
              <p className="mt-3 max-w-mass font-text text-fs-3 text-pretty text-tinte-2">
                <Textmarken text={b.satz} />
              </p>
              <Link
                href={`/leistungen/${b.id}`}
                data-uebergang="plan-vor"
                data-uebergang-plan={b.id}
                data-motion="zustand"
                className="group mt-2 inline-flex min-h-12 items-center gap-2 font-text text-fs-3 font-semibold text-tinte"
              >
                {/* letztes Wort und Pfeil ungeteilt: bricht der Linktext um, folgt der Pfeil dem Wort (E-065) */}
                <span className="min-w-0 underline decoration-strich decoration-1 underline-offset-4 pointer-fine:group-hover:decoration-tinte pointer-fine:group-hover:decoration-2">
                  {b.link.slice(0, b.link.lastIndexOf(' ') + 1)}
                  <span className="whitespace-nowrap">
                    {b.link.slice(b.link.lastIndexOf(' ') + 1)}
                    <Icon name="pfeil-rechts" groesse={5} className="ml-2 inline-block align-text-bottom" />
                  </span>
                </span>
              </Link>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
