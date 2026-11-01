// Vorlage „Wissensseite“ (KERN v3 K-009 Seitenformel, E3-ORCH-01b, E-025): erklärt ruhig, Block für Block. Gleiche Folge
// und gleiche Bausteine wie die Erzählseite; „Was wir tun“ besteht aus Wissensblöcken (Absatz, Karten, Liste, Tabelle,
// Zeichnung), der Beleg ist oft ein einzelnes Foto mit Satz, der nächste Schritt nennt verwandte Seiten. Ruhige
// Zeichnungen der Seite kommen über `zeichnungen` (Kennung im Block). Mit Plan steht im Einstieg statt des Fotos der
// Verlegeplan, der sich beim Zeigen in die Flucht rückt (sig-plan „zeigen“, E-044); mit `worum.planFlucht: 'laden'` rückt er beim
// Laden einmal in die Flucht (Registerbewegung sig-plan „laden“, reduziert in der Flucht; UM-E4-SICHT-FIX-2 M2-C4 Nr. 1, E-113
// Nr. 6, Datenschalter mit Abbruchkriterium). Unter dem Plan ab sm eine Bildunterschrift (Mikrotext, Prop `unterBild` des
// Einstiegs): Sie sagt, was die Gleich-Zeichen an der Maßlinie zeigen. Ohne Zeilenmaske der H1 (E-113 Nr. 2). Rahmen wie die Erzählseite: alles nach dem Einstieg ist eine Suspense-Grenze, die Abschnitte zeichnen
// spät, das Hauptziel kommt aus navigation.js. Der Einstieg steht vor der Leitachse und trägt sein Lot in Grundschicht
// (UM-E4-VORL): Danach führt der Leitfaden wie auf / (Spitze auf der Leselinie, Kopf neben dem Inhalt der Abschnitte auf
// Kalk, Einrasten an den Kanten); vorher umfasste die Leitachse den Einstieg, und ihr Rot stand als Stummel unter dem Kopf
// neben dem roten Plan. Steht die Lage auf Fliese (`lage.aufFliese`, wie auf /), setzt der Einstieg ab lg eine Stufe 16
// Kalk bis zur Fuge (`fugeUnten`, wie die Erzählvorlage; UM-E4-CHOR-FIX). Das Qualitätsversprechen aus dem Inhalt
// (`versprechen`, UM-E4-EP3) steht als eigener Abschnitt nach dem Beleg vor dem nächsten Schritt.
// Folge (UM-E4-SICHT-FIX M-B7, `folge.ts`): Standard ist die Seitenformel; `wissenVorLage` im Inhalt setzt die Wissensblöcke direkt
// nach den Einstieg und die Lage dahinter (nur Seiten aus K-009, z. B. Suche und Liste auf /blog). Ein Werkzeug mit `imSchritt`
// steht im nächsten Schritt (M-B3, z. B. der Konfigurator auf /fliesen geschlossen), ein Hilfen-Link auf seine eigene Seite
// entfällt dann. Serverkomponente.
import { Fragment, Suspense, type ReactNode } from 'react';
import Leitachse from '@/components/kern/Leitachse';
import Seitenformel from '@/components/kern/Seitenformel';
import Verlegeplan from '@/components/kern/Verlegeplan';
import { hauptziel } from '@/config/navigation';
import type { WissenInhalt } from './inhalt';
import { wissenFolge, type WissenTeil } from './folge';
import Einstieg from './teile/Einstieg';
import Lage from './teile/Lage';
import Wissen from './teile/Wissen';
import Ablauf from './teile/Ablauf';
import Beleg from './teile/Beleg';
import Versprechen from './teile/Versprechen';
import Schritt from './teile/Schritt';
import { Werkzeug, type Arbeitsabschnitt } from './ArbeitsSeite';

export interface WissensSeiteProps {
  inhalt: WissenInhalt;
  zeichnungen?: Record<string, ReactNode>;
  /** Werkzeug der Seite (z. B. Konfigurator), Kennung wie im Bestand: mit `imSchritt` im nächsten Schritt (M-B3), sonst danach */
  werkzeug?: Arbeitsabschnitt;
}

/** Teile nach dem Einstieg in der Folge des Inhalts (M-B7, `folge.ts`). Mit `wissenVorLage` tauschen Lage und erster
 *  Wissensblock auch die Fläche: Steht die Lage auf Fliese (`lage.aufFliese`), trägt der erste Block nach dem Einstieg die
 *  Fliese (mit derselben kleineren Stufe darüber) und die Lage Kalk. So bleibt die Grenze unter dem Einstieg (`fugeUnten`) und
 *  die Flächen wechseln weiter Abschnitt für Abschnitt (vorher folgten Lage und Ablauf beide auf Fliese, Prüfung SF-B). Eigene
 *  Funktion, damit der Aufruf des Einstiegs unten unberührt bleibt (Teil A). */
function Teile({ inhalt, zeichnungen, werkzeug }: WissensSeiteProps) {
  const folge = wissenFolge({ wissenVorLage: inhalt.wissenVorLage });
  const getauscht = Boolean(inhalt.wissenVorLage && inhalt.lage.aufFliese);
  const imSchritt = werkzeug?.imSchritt ? werkzeug : undefined;
  const schritt = imSchritt ? { ...inhalt.schritt, hilfen: inhalt.schritt.hilfen?.filter((h) => h.href !== imSchritt.seite) } : inhalt.schritt;
  // Texte vor dem Qualitätsversprechen in der tatsächlichen Folge
  const texte: Partial<Record<WissenTeil, unknown>> = { lage: inhalt.lage, wissen: inhalt.wissen, ablauf: inhalt.ablauf, beleg: inhalt.beleg };
  const vorher = [inhalt.worum.vorspann, ...folge.slice(0, folge.indexOf('versprechen')).flatMap((t) => (texte[t] ? [texte[t]] : []))];
  const teile: Record<WissenTeil, ReactNode> = {
    lage: <Lage inhalt={getauscht ? { ...inhalt.lage, aufFliese: false } : inhalt.lage} />,
    wissen: <Wissen bloecke={inhalt.wissen} zeichnungen={zeichnungen} ersterAufFliese={getauscht} />,
    ablauf: <Ablauf inhalt={inhalt.ablauf} />,
    beleg: <Beleg inhalt={inhalt.beleg} pfad={inhalt.pfad} />,
    // alle Angaben des Inhalts an den Baustein, auch `offen` (M2-A3; die Darstellung baut SF2-A in Versprechen.tsx)
    versprechen: inhalt.versprechen && <Versprechen vorher={vorher} {...inhalt.versprechen} />,
    schritt: (
      <Schritt
        inhalt={schritt}
        pfad={inhalt.pfad}
        werkzeuge={
          imSchritt && (
            <ul className="border-t border-fuge">
              <li>
                <Werkzeug werkzeug={imSchritt} />
              </li>
            </ul>
          )
        }
      />
    ),
    werkzeug: werkzeug && !imSchritt && <Werkzeug werkzeug={werkzeug} />,
  };
  return folge.map((t) => <Fragment key={t}>{teile[t]}</Fragment>);
}

/** Bildunterschrift unter dem Plan im Einstieg (Mikrotext, M2-C4 Nr. 1): beschreibt die Gleich-Zeichen an der Maßlinie */
const PLAN_UNTERSCHRIFT = 'Die geschnittenen Fliesen am Rand sind links und rechts gleich breit.';

export default function WissensSeite({ inhalt, zeichnungen, werkzeug }: WissensSeiteProps) {
  const { worum } = inhalt;
  // Einstieg an der Schnur mit Bewertungszeile (UM-E4-SICHT-FIX M-A3): ein Rot im ersten Bildschirm, der Plan ohne seine Achse
  const bild = worum.plan ? <Verlegeplan plan={worum.plan} flucht={worum.planFlucht ?? 'zeigen'} ohneAchse /> : worum.bild;
  // erst ab sm: Auf dem Handy schöbe die Zeile den Vorspann (LCP-Element von /fliesen) aus dem ersten Bildschirm (m390: sichtbar
  // nur noch 54 statt 117 px), die H1 würde LCP-Element, mitten in der Messung des Abbruchkriteriums für „laden“ (E-113 Nr. 6)
  const unterBild = worum.plan ? <p className="mx-auto mt-2 hidden max-w-mass text-center font-text text-fs-2 text-pretty text-tinte-2 sm:block">{PLAN_UNTERSCHRIFT}</p> : undefined;
  return (
    <Seitenformel>
      <Einstieg pfad={inhalt.pfad} brotkrumen={worum.brotkrumen} titel={worum.titel} ort={worum.ort} vorspann={worum.vorspann} bild={bild} unterBild={unterBild} hauptziel={hauptziel(inhalt.pfad)} lot schnur bewertung fugeUnten={inhalt.lage.aufFliese} />
      <Leitachse>
        <Suspense fallback={<div aria-hidden="true" className="min-h-dvh noscript:hidden" />}>
          <Teile inhalt={inhalt} zeichnungen={zeichnungen} werkzeug={werkzeug} />
        </Suspense>
      </Leitachse>
    </Seitenformel>
  );
}
