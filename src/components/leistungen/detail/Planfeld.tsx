// /leistungen/[id] · Planfeld (Fusion F-02, KERN v2 K-006 Randspalte, K-008 Verlegeplan, K-009 Schriftfeld): die Randspalte des
// Einstiegs als Planblatt nach Fassung A – Blattfläche mit Eckmarken, darin der Verlegeplan der Leistung (Planvorgabe
// `service.id`, Fugenkreuz am Kreuzpunkt der Achsen), darunter das Schriftfeld (Blatt, Verband, Betrieb, Inhaber, Kammer,
// Betrieb seit) als echter Text in Mono-Etiketten, Werte nur aus `COMPANY_DATA` und der Planvorgabe (`planfelder`). Dazu aus
// Fassung B die „=“-Bemaßung des Plans. Die Nummer „01–04“ im Feldkopf von B entfällt (Gutachten u2, Fusionsrezept 1).
// Das Blatt füllt die Höhe der Textspalte und steht oben bündig mit der Kennzeile (Rückweg, Etikett).
// Achsenlogik wie im Vorbild (Startseite): ab lg trägt nur der Plan das Rot (Lot bzw. Achsenkreuz), das Lot des Einstiegs
// bleibt dort Grundschicht (`planblatt-achse`, globals.css); unter lg steht das rote Lot im Seitenrand und der Plan zeigt
// keine Achse – so steht in jeder Ansicht und in allen vier Instanzen genau ein Rot je Bildschirm (Stolperstein d, g).
// `children` ist die Zeichnung ab lg (die Seite hüllt sie in die ViewTransition des Plan-Morphs von /leistungen); ohne
// `children` zeichnet das Feld den Plan selbst. Beide Pläne rücken beim Laden in die Flucht (`flucht="laden"`, Register
// sig-plan). Zeichnungen dekorativ (aria-hidden), Server-Komponente.
import type { ReactNode } from 'react';
import Planblatt, { planfelder } from '@/components/kern/Planblatt';
import Verlegeplan from '@/components/kern/Verlegeplan';
import type { PlanName } from '@/lib/plaene/vorgaben';
import { fugen } from '@/components/leistungen/detail/satz';

export interface PlanfeldProps {
  /** Planvorgabe = id der Leistung (bad, wohnen, aussen, untergrund) */
  id: PlanName;
  /** Name der Leistung (Wert „Blatt“ im Schriftfeld) */
  name: string;
  /** Zeichnung ab lg (mit roter Achse); Standard: Verlegeplan der Leistung */
  children?: ReactNode;
}

export default function Planfeld({ id, name, children }: PlanfeldProps) {
  return (
    // weiche Trennung im Wert „Blatt“: „Balkon- & Terrassen­sanierung“ berührte sonst den Zellrand (Stolperstein b)
    <Planblatt felder={planfelder(fugen(name), id)} mitAchse>
      {/* unter lg höchstens max-w-md breit (wie das Planfeld von B): bei 768 px stünde der Plan sonst über 450 px hoch */}
      <div className="mx-auto w-full max-w-md lg:hidden">
        <Verlegeplan plan={id} ohneAchse flucht="laden" />
      </div>
      <div className="hidden lg:block">{children ?? <Verlegeplan plan={id} flucht="laden" />}</div>
    </Planblatt>
  );
}
