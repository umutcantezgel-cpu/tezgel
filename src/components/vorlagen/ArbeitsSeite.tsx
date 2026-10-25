// Vorlage „Arbeitsseite“ (KERN v3 K-009, E3-ORCH-01d, E-025): ruhig, dicht und schnell, für Kontakt, Termin, Beratung,
// Preise, Unterlagen und die Werkzeuge. Kompakter Einstieg (H1, Ort, Vorspann, Hauptknopf zum Formular der Seite oder zu
// `/kontakt`, Anruf), danach benannte Abschnitte mit den vorhandenen Funktionen als Inhalt (Formulare, Kalender, Karte
// hinter Einwilligung). Kennungen und Anker der Abschnitte bleiben wie im Bestand (Tests und Links). Keine Seitenformel:
// Arbeitsseiten erzählen nicht (K-009). Serverkomponente mit den Inseln der Funktionen.
import type { ReactNode } from 'react';
import Leitachse from '@/components/kern/Leitachse';
import Abschnitt from '@/components/kern/Abschnitt';
import type { Krume } from '@/components/kern/Brotkrumen';
import Textmarken from '@/components/kern/Textmarken';
import Einstieg from './teile/Einstieg';

export interface Arbeitsabschnitt {
  /** Anker des Abschnitts (`id` der Section), unverändert aus dem Bestand */
  id: string;
  /** Kennung der H2 (Bestand, z. B. `termin-buchen-heading`); Standard `${id}-titel` */
  titelId?: string;
  titel: string;
  einleitung?: string;
  inhalt: ReactNode;
  /** Block unter dem Kopf (ab lg in der Kopfspalte), z. B. Anruf neben einem Formular */
  unterKopf?: ReactNode;
  flaeche?: 'kalk' | 'fliese';
  kopf?: 'gestapelt' | 'seitlich';
}

export interface ArbeitsSeiteProps {
  pfad: string;
  brotkrumen?: Krume[];
  titel: string;
  ort: string;
  vorspann: string;
  /** Ziel des Hauptknopfs (gleich für alle Hauptknöpfe der Seite, `hauptziel` in navigation.js) */
  hauptziel: string;
  abschnitte: Arbeitsabschnitt[];
}

/** Werkzeug der Seite nach dem nächsten Schritt (E-012: unter dem Hauptweg, nicht konkurrierend; Funktion wie im Bestand,
 *  F-02, F-04): eigener Abschnitt mit der Kennung aus dem Bestand. Kopf seit K-016 (E-047) mittig über dem Werkzeug statt
 *  seitlich daneben; `kopf: 'seitlich'` nur noch, wo das Werkzeug selbst schmal ist. */
export function Werkzeug({ werkzeug }: { werkzeug: Arbeitsabschnitt }) {
  return (
    <Abschnitt
      id={werkzeug.id}
      titelId={werkzeug.titelId}
      art="arbeit"
      leitachse
      flaeche={werkzeug.flaeche ?? 'kalk'}
      kopf={werkzeug.kopf ?? 'gestapelt'}
      mitte={werkzeug.kopf !== 'seitlich'}
      titel={werkzeug.titel}
      einleitung={werkzeug.einleitung ? <p><Textmarken text={werkzeug.einleitung} /></p> : undefined}
      unterKopf={werkzeug.unterKopf}
    >
      {werkzeug.inhalt}
    </Abschnitt>
  );
}

export default function ArbeitsSeite({ pfad, brotkrumen, titel, ort, vorspann, hauptziel, abschnitte }: ArbeitsSeiteProps) {
  return (
    <Leitachse>
      <Einstieg pfad={pfad} brotkrumen={brotkrumen} titel={titel} ort={ort} vorspann={vorspann} hauptziel={hauptziel} kompakt />
      {abschnitte.map((a, i) => (
        <Abschnitt
          key={a.id}
          id={a.id}
          titelId={a.titelId}
          art="arbeit"
          leitachse
          flaeche={a.flaeche ?? (i % 2 === 0 ? 'fliese' : 'kalk')}
          kopf={a.kopf ?? 'gestapelt'}
          mitte={a.kopf !== 'seitlich'}
          titel={a.titel}
          einleitung={a.einleitung ? <p><Textmarken text={a.einleitung} /></p> : undefined}
          unterKopf={a.unterKopf}
        >
          {a.inhalt}
        </Abschnitt>
      ))}
    </Leitachse>
  );
}
