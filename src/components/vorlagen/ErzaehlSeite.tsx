// Vorlage „Erzählseite“ (KERN v3 K-009 Seitenformel, E3-ORCH-01a, E-025, E-044): setzt eine Seite aus ihrem Inhalt
// (`src/inhalte/<seite>.ts`, Modell in `inhalt.ts`) in der festen Folge Worum es geht · Ihre Lage · Was wir tun · So läuft
// es ab · Beleg · Nächster Schritt, mit den Bausteinen der Startseite; die Startseite selbst ist eine Erzählseite. Große
// Momente der Seite kommen als fertige Bausteine über `momente` an ihren Platz. Alle Hauptknöpfe führen zum Hauptziel der
// Seite (`hauptziel` in navigation.js, K-004). Strukturierte Daten (Brotkrumen) setzt die Seite wie bisher selbst.
// Rahmen wie auf der Startseite:
// - Mit Plan steht der Einstieg als Planblatt und trägt sein eigenes Rot (Waage und Lot, sig-kreuzlinie); die Leitachse
//   beginnt an seinem Fuß, wo das Lot des Einstiegs endet, und ihr rotes Stück wächst erst ab dort (vorher stand ab lg bei
//   scrollY 0 ein roter Stummel unter dem Kopf neben Waage und Lot, E2-SICHT-2 Befund 3, E3-START-02). Ohne Plan steht der
//   Einstieg an der Laserlinie.
// - Alles nach dem Einstieg ist eine Suspense-Grenze, also eine eigene Hydrierungseinheit: Ein früher Tipp im ersten
//   Bildschirm erzwingt nur den Rahmen und den Einstieg, nicht die ganze Seite in einem Zug (Reaktion, E-033; Next-Doku
//   „Streaming“, Abschnitt INP). Eine Grenze statt sieben: React lagert jede große Grenze aus und setzt sie per Skript an
//   ihren Platz, jede davon kostet eine Verschiebung mit Layout (Blockierzeit, E-034). Die Inhalte warten auf nichts; bis
//   React die ausgelagerte Grenze eingesetzt hat, hält ein Platzhalter von einer Bildschirmhöhe den Fuß unter dem ersten
//   Bildschirm (sonst stand er dort kurz und sprang dann weg: CLS 0,07 am Desktop, E-036). Ohne JavaScript entfällt der
//   Platzhalter, und globals.css rückt den ausgelagerten Inhalt hinter <main> (E-058).
// - Die Abschnitte nach dem Einstieg zeichnen spät (content-visibility): Stil und Layout erst in Sichtnähe, sonst rechnete
//   das Einsetzen der Grenze das Layout der ganzen Seite in einer langen Aufgabe (E3-LEIST-01); der nächste Schritt ist
//   Sprungziel und zeichnet sofort.
// Serverkomponente.
import { Suspense, type ReactNode } from 'react';
import Leitachse from '@/components/kern/Leitachse';
import Seitenformel from '@/components/kern/Seitenformel';
import { hauptziel } from '@/config/navigation';
import type { ErzaehlInhalt } from './inhalt';
import Einstieg from './teile/Einstieg';
import EinstiegMitte from './teile/EinstiegMitte';
import EinstiegPlanblatt from './teile/EinstiegPlanblatt';
import Lage from './teile/Lage';
import Tun from './teile/Tun';
import Ablauf from './teile/Ablauf';
import Beleg, { type ZweiterBeleg } from './teile/Beleg';
import Schritt, { Oeffnungszeiten } from './teile/Schritt';
import { Werkzeug, type Arbeitsabschnitt } from './ArbeitsSeite';

export interface ErzaehlSeiteProps {
  inhalt: ErzaehlInhalt;
  /** große Momente der Seite an ihrem Platz (Registereinträge, K-007); belegZwei steht als eigener Abschnitt mit H2 zwischen
   *  Fotos und Stimmen (E-045) */
  momente?: { tun?: ReactNode; ablauf?: ReactNode; beleg?: ReactNode; belegZwei?: ZweiterBeleg };
  /** Werkzeug der Seite (Badanfrage, Preisrechner …) nach dem nächsten Schritt, Kennung wie im Bestand */
  werkzeug?: Arbeitsabschnitt;
  /** eigener Abschnitt nach dem Beleg und vor dem nächsten Schritt, der seinen Kopf selbst mitbringt (z. B. die Bewertungen
   *  mit Themenfilter auf /referenzen, Abnahme E3-BAU-07: Belege vor der Bitte um einen Termin) */
  nachBeleg?: ReactNode;
  /** eigener Bildplatz für das hohe Foto im Planblatt (Startseite: das Startbild mit seinem großen Moment) */
  einstiegBild?: ReactNode;
  /** Anfrageformular im nächsten Schritt (vorhandene Logik als Insel, Pflichtfelder und Empfänger unverändert, G8) */
  formular?: ReactNode;
  /** Kennung der Überschrift über dem Formular, wenn sie ein Sprungziel des Bestands ist (z. B. `express-anfrage`); sonst
   *  aus dem Hauptziel der Seite */
  formularId?: string;
}

export default function ErzaehlSeite({ inhalt, momente, werkzeug, nachBeleg, einstiegBild, formular, formularId }: ErzaehlSeiteProps) {
  const { worum } = inhalt;
  const ziel = hauptziel(inhalt.pfad);
  const rest = (
    <Suspense fallback={<div aria-hidden="true" className="min-h-dvh noscript:hidden" />}>
      <Lage inhalt={inhalt.lage} />
      <Tun inhalt={inhalt.tun} moment={momente?.tun} />
      <Ablauf inhalt={inhalt.ablauf} moment={momente?.ablauf} />
      <Beleg inhalt={inhalt.beleg} moment={momente?.beleg} zweiter={momente?.belegZwei} />
      {nachBeleg}
      <Schritt
        inhalt={inhalt.schritt}
        pfad={inhalt.pfad}
        formular={formular}
        titelId={formularId ?? (ziel.startsWith('#') ? ziel.slice(1) : undefined)}
        zusatz={formular ? <Oeffnungszeiten /> : undefined}
      />
      {werkzeug && <Werkzeug werkzeug={werkzeug} />}
    </Suspense>
  );
  if (worum.einstieg === 'mitte' && worum.titelZeilen) {
    // ruhiger Einstieg (K-016, E-047): mittig, ohne Plan und ohne Waage; die Leitachse beginnt an seinem Fuß
    return (
      <Seitenformel>
        <EinstiegMitte
          pfad={inhalt.pfad}
          brotkrumen={worum.brotkrumen}
          titelZeilen={worum.titelZeilen}
          ort={worum.ort}
          hauptziel={ziel}
          bild={einstiegBild ?? worum.bild}
          bewertung={worum.bewertung}
          orteAnker={inhalt.beleg.orte ? 'einsatzgebiet' : undefined}
        />
        <Leitachse>{rest}</Leitachse>
      </Seitenformel>
    );
  }
  if (worum.plan && worum.titelZeilen && worum.bildGross) {
    return (
      <Seitenformel>
        <EinstiegPlanblatt
          pfad={inhalt.pfad}
          brotkrumen={worum.brotkrumen}
          firmensitz={worum.firmensitz}
          titelZeilen={worum.titelZeilen}
          ort={worum.ort}
          vorspann={worum.vorspann}
          hauptziel={ziel}
          plan={worum.plan}
          bildKlein={einstiegBild ?? worum.bild}
          bildGross={worum.bildGross}
          bewertung={worum.bewertung}
        />
        <Leitachse>{rest}</Leitachse>
      </Seitenformel>
    );
  }
  return (
    <Seitenformel>
      <Leitachse>
        <Einstieg pfad={inhalt.pfad} brotkrumen={worum.brotkrumen} titel={worum.titel} ort={worum.ort} vorspann={worum.vorspann} bild={worum.bild} hauptziel={ziel} />
        {rest}
      </Leitachse>
    </Seitenformel>
  );
}
