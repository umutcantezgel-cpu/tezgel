// Vorlage „Arbeitsseite“ (KERN v3 K-009, E3-ORCH-01d, E-025): ruhig, dicht und schnell, für Kontakt, Termin, Beratung,
// Preise, Unterlagen und die Werkzeuge. Kompakter Einstieg (H1, Ort, Vorspann, Hauptknopf zum Formular der Seite oder zu
// `/kontakt`, Anruf), danach benannte Abschnitte mit den vorhandenen Funktionen als Inhalt (Formulare, Kalender, Karte
// hinter Einwilligung). Kennungen und Anker der Abschnitte bleiben wie im Bestand (Tests und Links). Keine Seitenformel:
// Arbeitsseiten erzählen nicht (K-009). Kein Signaturmoment (K-007, K-010): kein Eingang mit Zeilenmaske (Einstieg kompakt,
// nur das Logo baut sich im Kopf auf) und kein Leitfaden. Die Leitachse steht in Grundschicht mit den Fugenkreuzen der
// Abschnitte, ohne gezogenes Rot (gezogen={false}, R-02a; UM-E4-VORL nach der Übergabe aus UM-E3-LEIT: vorher wuchs das Rot
// mit dem Scrollen wie auf den Erzählseiten von v2, und bei scrollY 0 stand ein roter Stummel unter dem Kopf). Rückmeldung
// bleibt an den Bedienelementen und am Cursor-Schild („Nicht verfügbar“, „Lädt“ über den Treffertest in
// src/lib/motion/cursor.ts). Serverkomponente mit den Inseln der Funktionen.
// Formular im ersten Bildschirm (UM-E4-SICHT-FIX M-C5 Nr. 1 und 2, /kontakt): H1 in Satzzeilen (`titelZeilen`), der Vorspann
// darf im Einstieg fehlen (die Seite setzt ihn unter das Formular), ein Abschnitt kann dicht beginnen (`dicht`: eine Stufe
// weniger Raum über dem Kopf) und ohne sichtbaren Kopf (`kopfVerborgen`: die H2 nur für Hilfsmittel, die Einleitung setzt die
// Seite selbst, z. B. unter das Formular; Nacharbeit SF-C2: direkt unter dem Hauptknopf „Termin vor Ort anfragen“ stand dieselbe
// Zeile noch einmal als H2, dann Einleitung, Kastenkopf und „Schritt 1“). Der kompakte Einstieg selbst (vorlagen/teile/Einstieg)
// bleibt unverändert; ohne diese Angaben sieht die Seite aus wie bisher.
import type { ReactNode } from 'react';
import Leitachse from '@/components/kern/Leitachse';
import Abschnitt from '@/components/kern/Abschnitt';
import type { Krume } from '@/components/kern/Brotkrumen';
import Textmarken from '@/components/kern/Textmarken';
import Einstieg from './teile/Einstieg';
import Aufklapper from './teile/Aufklapper';

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
  /** Erzähl- und Wissensseite (UM-E4-SICHT-FIX M-B3, ein Abschluss je Seite): Das Werkzeug steht im nächsten Schritt unter
   *  Hauptknopf, Anruf und WhatsApp statt als eigener Abschnitt danach. Ohne Angabe bleibt es nach dem Schritt (Standard) */
  imSchritt?: boolean;
  /** Im Schritt geschlossen in einem nativen Aufklapper; der Wert ist die Zeile zum Öffnen (Mikrotext, z. B. „Badanfrage öffnen“).
   *  Ohne Angabe steht das Werkzeug offen (z. B. der Projektcheck auf /bad, F-05 prüft sichtbare Inhalte) */
  zu?: string;
  /** Eigene Seite des Werkzeugs (z. B. `/bad/badanfrage`): Steht es im Schritt, entfällt der Hilfen-Link dorthin (M-B3 Nr. 5) */
  seite?: string;
  /** Arbeitsseite: eine Stufe weniger Raum über dem Kopf (erster Abschnitt direkt nach dem Einstieg, M-C5) */
  dicht?: boolean;
  /** Arbeitsseite: kein sichtbarer Kopf. Die H2 steht nur für Hilfsmittel (sr-only, Kennung `titelId` wie bisher, die Region
   *  trägt den Titel als Namen), die Einleitung setzt die Seite selbst in den Inhalt (M-C5 Nr. 1, /kontakt: das Formular folgt
   *  direkt auf Hauptknopf und Anruf, dessen Wortlaut die H2 wiederholte) */
  kopfVerborgen?: boolean;
}

export interface ArbeitsSeiteProps {
  pfad: string;
  brotkrumen?: Krume[];
  titel: string;
  /** H1 in festen Satzzeilen (zusammen der Titel, Wortlaut gleich; M-A3 Nr. 5) */
  titelZeilen?: string[];
  ort: string;
  /** Vorspann im Einstieg; ohne Angabe steht er nicht dort (die Seite setzt ihn selbst, z. B. unter das Formular) */
  vorspann?: string;
  /** Ziel des Hauptknopfs (gleich für alle Hauptknöpfe der Seite, `hauptziel` in navigation.js) */
  hauptziel: string;
  abschnitte: Arbeitsabschnitt[];
}

/** Werkzeug der Seite nach dem nächsten Schritt (E-012: unter dem Hauptweg, nicht konkurrierend; Funktion wie im Bestand,
 *  F-02, F-04): eigener Abschnitt mit der Kennung aus dem Bestand. Kopf seit K-016 (E-047) mittig über dem Werkzeug statt
 *  seitlich daneben; `kopf: 'seitlich'` nur noch, wo das Werkzeug selbst schmal ist.
 *  Mit `imSchritt` (UM-E4-SICHT-FIX M-B3) kein eigener Abschnitt und keine eigene H2: Der Schritt trägt die eine Überschrift und
 *  den einen Hauptknopf, das Werkzeug steht darunter. Die Kennung aus dem Bestand liegt am Element um das Werkzeug, der Titel
 *  wird der Name der Region (aria-label). Mit `zu` steht das Werkzeug geschlossen im nativen Aufklapper (ohne JavaScript
 *  bedienbar, das Formular bleibt im DOM und lädt wie bisher nach); mit Einleitung und ohne `zu` als Zeile mit H3 und Satz
 *  (z. B. „Sie möchten mehr erzählen?“ im Formular-Schritt von /leistungen). */
export function Werkzeug({ werkzeug }: { werkzeug: Arbeitsabschnitt }) {
  if (werkzeug.imSchritt) {
    if (werkzeug.einleitung && !werkzeug.zu) {
      const hId = werkzeug.titelId ?? `${werkzeug.id}-titel`;
      return (
        <div id={werkzeug.id}>
          <h3 id={hId} className="font-text text-fs-3 font-semibold text-tinte">{werkzeug.titel}</h3>
          <p className="mt-2 font-text text-fs-2 text-tinte-2">
            <Textmarken text={werkzeug.einleitung} />
          </p>
          <div className="mt-2">{werkzeug.inhalt}</div>
        </div>
      );
    }
    const region = (
      <div id={werkzeug.id} role={werkzeug.titel ? 'region' : undefined} aria-label={werkzeug.titel || undefined} className={werkzeug.zu ? 'pt-4 pb-12' : 'py-12'}>
        {werkzeug.inhalt}
      </div>
    );
    return werkzeug.zu ? <Aufklapper zeile={werkzeug.zu}>{region}</Aufklapper> : region;
  }
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

export default function ArbeitsSeite({ pfad, brotkrumen, titel, titelZeilen, ort, vorspann, hauptziel, abschnitte }: ArbeitsSeiteProps) {
  return (
    <Leitachse gezogen={false}>
      <Einstieg pfad={pfad} brotkrumen={brotkrumen} titel={titel} titelZeilen={titelZeilen} ort={ort} vorspann={vorspann ?? ''} hauptziel={hauptziel} kompakt />
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
          titel={a.kopfVerborgen ? undefined : a.titel}
          aria-label={a.kopfVerborgen ? a.titel : undefined}
          einleitung={a.einleitung && !a.kopfVerborgen ? <p><Textmarken text={a.einleitung} /></p> : undefined}
          unterKopf={a.unterKopf}
          className={a.dicht ? 'pt-8 lg:pt-12' : undefined}
        >
          {a.kopfVerborgen && (
            <h2 id={a.titelId ?? `${a.id}-titel`} className="sr-only">
              {a.titel}
            </h2>
          )}
          {a.inhalt}
        </Abschnitt>
      ))}
    </Leitachse>
  );
}
