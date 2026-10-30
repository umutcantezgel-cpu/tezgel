// Leistungen als Pläne (KERN v3.6 K-016 „Ruhe“, E-048; Plan-Morph und sig-plan nach E-037): die vier Bereiche der Seite
// /leistungen als ruhige Karten mit Luft dazwischen, je oben der Verlegeplan der Leistung, darunter Name, ein Satz und der Weg
// zur Leistungsseite. Ersetzt dort die vollen Fachgewerk-Felder (Gewerk.tsx) mit Etikett, Merkmalen und zwei Knöpfen. Der
// Link trägt den Plan-Morph wie bisher (data-uebergang="plan-vor", das Feld data-plan-uebergang, beides im Träger von
// sig-plan): ab lg gleitet der Plan in den Einstieg der Leistungsseite; die Fugen rücken bei Maus und Fokus in die Flucht
// (sig-plan-ziel). Kennungen der Karten wie im Bestand (#bad, #wohnen, #aussen, #untergrund), dazu #gewerke. Neben dem
// Raster tritt der Kopf der Leitachse zurück (data-kopf-pause="ganz", bewegung.css „Leitfaden mit Abschnittsmarke“): Er stand
// sonst neben den H3 der Karten (Nacharbeit UM-E3-FIX2 N1). Auf Touch ist die Reihe ein Auftritt (data-plan-reihe,
// bewegung.css sig-plan; UM-E4-CHOR-FIX): Kommt der erste Plan in Sicht, rücken alle in die Flucht. Je Karte ein Auftritt
// waren mobil zwei in einer Bildschirmhöhe (K-007). Am Desktop rückt weiter jeder Plan bei Maus und Fokus. Serverkomponente.
import Link from 'next/link';
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

export default function Leistungsplaene({ bereiche }: { bereiche: Leistungsplan[] }) {
  return (
    <ul id="gewerke" data-kopf-pause="ganz" data-plan-reihe="" className="grid grid-cols-1 gap-8 text-left md:grid-cols-2 lg:gap-12">
      {bereiche.map((b) => (
        <li key={b.id}>
          <article id={b.id} aria-labelledby={`${b.id}-titel`} data-motion="sig-plan" className="sig-plan-ziel flex h-full flex-col border border-fuge bg-fliese p-6 lg:p-8">
            {/* feste Fläche 4 : 3 für jeden Plan: die Pläne haben eigene Seitenverhältnisse, ohne feste Fläche standen die
                Überschriften nebeneinanderliegender Karten bis zu 50 px versetzt (Browserprüfung E4-W0, E-065) */}
            <div className="flex aspect-4/3 items-center border border-fuge bg-kalk p-6" data-plan-uebergang={b.id}>
              <Verlegeplan plan={b.id} ohneAchse bemassung={false} />
            </div>
            <h3 id={`${b.id}-titel`} className="mt-6 font-anzeige text-fs-5 font-extrabold text-tinte">
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
              className="group mt-auto inline-flex min-h-12 items-center gap-2 pt-6 font-text text-fs-3 font-semibold text-tinte"
            >
              {/* letztes Wort und Pfeil ungeteilt: bricht der Linktext um, folgt der Pfeil dem Wort, statt allein am Kartenrand
                  zu stehen (E-065) */}
              <span className="min-w-0 underline decoration-strich decoration-1 underline-offset-4 pointer-fine:group-hover:decoration-tinte pointer-fine:group-hover:decoration-2">
                {b.link.slice(0, b.link.lastIndexOf(' ') + 1)}
                <span className="whitespace-nowrap">
                  {b.link.slice(b.link.lastIndexOf(' ') + 1)}
                  <Icon name="pfeil-rechts" groesse={5} className="ml-2 inline-block align-text-bottom" />
                </span>
              </span>
            </Link>
          </article>
        </li>
      ))}
    </ul>
  );
}
