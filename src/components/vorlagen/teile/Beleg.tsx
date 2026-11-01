// Vorlagen · 5 Beleg (KERN v3 K-003 Nr. 3 und 4, K-009, K-012; E-025; K-016 „Ruhe“, E-047): echte Fotos vollständig als Reihe
// zum Wischen, je Foto groß und ohne Unterschrift darunter (Name und Weg zur Leistung auf der Glasfläche), wahlweise ein
// Zweierbild desselben Vorgangs (zwei Blickwinkel, darum kein Regler), Kundenstimmen wörtlich und der Weg zu allen
// Arbeiten. Fotos und Stimmen stehen in zwei Abschnitten (beide data-formel="beleg"), damit jeder seine eigene Form hat
// wie auf der Startseite. Platz für einen großen Moment (z. B. Galerie mit Filter, Karte); steht nichts davor, beginnt er
// direkt unter der Überschrift. Wahlweise ein zweiter großer Moment mit eigener H2 als eigener Abschnitt zwischen Fotos und
// Stimmen (z. B. vorher-nachher auf /referenzen, E-045) und die Einsatzorte als letzter Abschnitt. Alle zeichnen spät (unter
// dem ersten Bildschirm, E-044).
// UM-E4-SICHT-FIX M-B6: Ab drei Fotos steht die Reihe im Drittelverband und die Namen ohne Maus auf dem kurzen Verlauf nur
// hinter der Namenszeile (wie auf /, Standard statt Schalter). Reihen mit einem oder zwei Hochformaten und das Zweierbild
// stehen höchstens 70svh hoch (glas-hoch), Kopf und Fotos passen bei d1440 in eine Bildschirmhöhe. Das Zweierbild steht als
// zwei Glasbilder an einer 1-px-Fuge, der Name auf der Glasfläche (K-016), der Kopf mittig wie die übrigen Köpfe; mit
// `zweierbild.abschnitt` als eigener Abschnitt mit H2 nach den Fotos (Muster wie `ZweiterBeleg`). Ein Beleg nur mit Satz
// (z. B. „Aus unserer Praxis“ auf /blog) trägt eine Stufe weniger Innenabstand. Zwischen Fotoreihe und Weg eine Fliesenstufe
// (16): Passen alle Fotos nebeneinander (bis drei ab lg, zwei ab md), entfällt dort der leere Platz der Karussell-Knöpfe, die
// dort nie gebraucht werden. Satzspiegel (M-B1): die Fotos breit.
// UM-E4-SICHT-FIX M-B5: Kundenstimmen ohne `stimmenGross` stehen als eine Stimme je Schritt mit Versatz wie auf / (Form
// „einzeln“, Karte ab lg um ein Drittel versetzt, Kennzeile im freien Drittel); die vier kleinen Karten ab lg sind kein Standard
// mehr (Sicht Anlauf 1: wiederholte gleiche Stimmenkarten auf vielen Seiten). Serverkomponente.
import type { ReactNode } from 'react';
import clsx from 'clsx';
import Abschnitt from '@/components/kern/Abschnitt';
import Glasbild from '@/components/kern/Glasbild';
import Karussell from '@/components/kern/Karussell';
import Textmarken from '@/components/kern/Textmarken';
import WeiterLink from '@/components/kern/WeiterLink';
import { ARBEITEN } from '@/config/arbeiten';
import type { BelegInhalt } from '../inhalt';
import Einsatzorte from './Einsatzorte';
import { Glaspaar, bildFormat } from './Fotos';
import Stimmen from './Stimmen';

/** zweiter großer Moment im Beleg mit eigener H2 (id des Abschnitts, H2 `${id}-titel`) */
export interface ZweiterBeleg {
  id: string;
  titel: string;
  moment: ReactNode;
  /** Fläche des Abschnitts (Standard Kalk); Fliese setzt den Bruch zwischen Fotos und dem, was folgt (UM-E4-CHOR-FIX,
   *  /referenzen: Galerie, Vorher-Nachher und Bewertungen lagen sonst rund 7 000 px auf Kalk); Tinte als Bühne für einen hohen
   *  Moment (UM-E4-SICHT-FIX-2 M2-A6, für den Vorher-Nachher-Regler auf /referenzen M2-C2; Abschnitt kennt die Fläche) */
  flaeche?: 'kalk' | 'fliese' | 'tinte';
}

/** Zweierbild (M-B6 Nr. 3): zwei Glasbilder an der Fuge; im Abschnitt der Fotos mit einem mittigen Unterkopf (eine Stufe unter
 *  der H2), als eigener Abschnitt (`abschnitt`) unter der H2 des Abschnitts. Neben dem Unterkopf tritt der Kopf des Leitfadens auf
 *  der ganzen Höhe zurück (data-kopf-pause="ganz", wie bisher): nie ein Kreuz neben einer Überschrift */
function Zweierbild({ zweierbild, unterkopf }: { zweierbild: NonNullable<BelegInhalt['zweierbild']>; unterkopf: boolean }) {
  if (!unterkopf) return <Glaspaar fotos={zweierbild.bilder} />;
  return (
    <figure data-kopf-pause="ganz">
      <figcaption className="mx-auto max-w-mass text-center font-anzeige text-fs-5 font-extrabold text-balance text-tinte">{zweierbild.titel}</figcaption>
      <div className="mt-8">
        <Glaspaar fotos={zweierbild.bilder} />
      </div>
    </figure>
  );
}

/** `stimmenZusatz` (UM-E4-SICHT-FIX-2 M2-A6, Schnittstelle für M2-C3): ein Element der Seite direkt nach der Einleitung der
 *  Kundenstimmen, vor den Stimmen (z. B. ein Leitsatz). Neben ihm tritt die Abschnittsmarke zurück (data-kopf-pause="ganz", nur
 *  auf Kalk wirksam; Stimmen tragen keine eigene Pause). Ohne Angabe unverändert */
export default function Beleg({ inhalt, pfad, moment, zweiter, stimmenTitel = 'Das sagen unsere Kunden.', stimmenZusatz }: { inhalt: BelegInhalt; pfad?: string; moment?: ReactNode; zweiter?: ZweiterBeleg; stimmenTitel?: string; stimmenZusatz?: ReactNode }) {
  const zweierEigen = inhalt.zweierbild?.abschnitt;
  const zweierInnen = inhalt.zweierbild && !zweierEigen ? inhalt.zweierbild : undefined;
  const davor = inhalt.fotos.length > 0 || Boolean(inhalt.satz) || Boolean(zweierInnen);
  // Ein Foto führt nur dann weiter, wenn sein Ziel eine andere Seite ist: ein Link auf die Seite, auf der man steht, lädt sie
  // bloß neu (Browserprüfung E4-W0, E-065)
  const ziel = (href?: string) => (href && href !== pfad ? href : undefined);
  const zahl = inhalt.fotos.length;
  // zwei Fotos ab md in zwei Spalten statt zwei von drei Plätzen (sonst bleibt rechts ein Loch im Raster, E-065)
  const karte = zahl === 2 ? 'w-full md:w-1/2' : 'w-full md:w-1/2 lg:w-1/3';
  // Drittelverband und Verlauf ab drei Fotos als Standard (M-B6 Nr. 1, wie /); `false` im Inhalt schaltet ab
  const versatzAn = zahl > 2 && inhalt.fotosVersatz !== false;
  const verlaufAn = zahl > 2 && inhalt.fotosVerlauf !== false;
  // Drittelverband in der Reihe (K-003 Nr. 4, UM-E3-FIX F4): ab md (zwei Fotos im Bild) steht jedes zweite, ab lg (drei im
  // Bild) jedes dritte Foto ab dem zweiten um 16 Stufen (64 px, ein Drittel der langen Fliesenseite) tiefer. Je zwei bzw.
  // drei Nachbarn enthalten genau eines davon: Wie weit man auch blättert, jeder Bildschirm der Reihe trägt einen Versatz.
  // Abstand innen statt Verschiebung: Die Spur beschneidet senkrecht, und die Knöpfe darunter rücken mit.
  const versatz = (i: number) => (versatzAn ? clsx(i % 2 === 1 && 'md:pt-16', i % 3 === 1 ? 'lg:pt-16' : 'lg:pt-0') : undefined);
  // Hochformat in einer Reihe aus einem oder zwei Fotos: höchstens 70svh (glas-hoch, M-B6 Nr. 2), mittig in seiner Karte (auch
  // unter md, wo jede Karte die volle Breite hat: Handy quer, Prüfung SF-B2); zwei rücken ab md an die Mitte zusammen (Abstand
  // der Karten 24 px), statt je mittig in ihrer Hälfte zu stehen
  const hoch = (bild: (typeof inhalt.fotos)[number]['bild']) => zahl <= 2 && ARBEITEN[bild].hoehe > ARBEITEN[bild].breite;
  const paarKante = (i: number) => clsx('mx-auto', zahl === 2 && (i === 0 ? 'md:mr-0' : 'md:ml-0'));
  // Passen alle Fotos nebeneinander, braucht die Reihe dort nie Knöpfe: Deren leerer Platz (aria-hidden, unsichtbar) entfällt
  // dort, zwischen Reihe und Weg bleibt eine Stufe 16 (M-B6 Nr. 5). Nur dort, wo nie geblättert wird, damit nichts springt
  const ohneKnoepfe = zahl === 2 ? 'md:[&>[aria-hidden]]:hidden' : zahl === 3 ? 'lg:[&>[aria-hidden]]:hidden' : undefined;
  // Beleg nur mit Satz (z. B. /blog): eine Stufe weniger über und unter dem Band, wie das geschlossene Versprechen (M-B6 Nr. 4)
  const nurSatz = zahl === 0 && !inhalt.zweierbild && !moment && Boolean(inhalt.satz);
  return (
    <>
      <Abschnitt id="unsere-arbeiten" formel="beleg" leitachse spaet mitte satz="breit" titel={inhalt.titel} className={nurSatz ? 'pt-12 pb-12 lg:pt-16 lg:pb-16' : undefined}>
        {/* ein einzelnes Foto wie die Fotos der Reihe: Glasfläche mit Name und Weg zur Leistungsseite, ohne Unterschrift darunter
            (K-016, Zusatz Regel 4; Gegenprüfung Welle 2), mittig in der Lesebreite, als Hochformat höchstens 70svh hoch */}
        {zahl === 1 && (
          <div style={hoch(inhalt.fotos[0].bild) ? bildFormat(inhalt.fotos[0].bild) : undefined} className={clsx('mx-auto max-w-mass', hoch(inhalt.fotos[0].bild) ? 'glas-hoch' : 'w-full')}>
            <Glasbild arbeit={inhalt.fotos[0].bild} name={inhalt.fotos[0].unterschrift} href={ziel(inhalt.fotos[0].href)} sizes="(min-width: 768px) 66ch, 100vw" />
          </div>
        )}
        {zahl > 1 && (
          <Karussell art="reihe" name="Fotos" karte={karte} className={ohneKnoepfe}>
            {inhalt.fotos.map((f, i) => (
              <div key={f.bild} style={hoch(f.bild) ? bildFormat(f.bild) : undefined} className={clsx(versatz(i), hoch(f.bild) && clsx('glas-hoch', paarKante(i)))}>
                <Glasbild arbeit={f.bild} name={f.unterschrift} href={ziel(f.href)} verlauf={verlaufAn || undefined} sizes={zahl === 2 ? '(min-width: 768px) 50vw, 100vw' : '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw'} />
              </div>
            ))}
          </Karussell>
        )}
        {inhalt.satz && (
          <p className="mx-auto mt-8 max-w-mass text-center font-text text-fs-4 text-pretty text-tinte">
            <Textmarken text={inhalt.satz} />
          </p>
        )}
        {zweierInnen && (
          <div className="mt-16">
            <Zweierbild zweierbild={zweierInnen} unterkopf />
          </div>
        )}
        {moment && <div className={davor ? 'mt-16' : undefined}>{moment}</div>}
        {inhalt.verweis && (
          <p className="mt-12 text-center">
            <WeiterLink href={inhalt.verweis.href}>{inhalt.verweis.name}</WeiterLink>
          </p>
        )}
      </Abschnitt>
      {inhalt.zweierbild && zweierEigen && (
        <Abschnitt id={zweierEigen.id} formel="beleg" leitachse spaet flaeche={zweierEigen.flaeche} mitte satz="breit" titel={inhalt.zweierbild.titel}>
          <Zweierbild zweierbild={inhalt.zweierbild} unterkopf={false} />
        </Abschnitt>
      )}
      {zweiter && (
        <Abschnitt id={zweiter.id} formel="beleg" leitachse spaet flaeche={zweiter.flaeche} mitte titel={zweiter.titel}>
          {zweiter.moment}
        </Abschnitt>
      )}
      {inhalt.stimmen && inhalt.stimmen.length > 0 && (
        <Abschnitt
          id="kundenstimmen"
          formel="beleg"
          leitachse
          spaet
          flaeche={inhalt.stimmenAufKalk ? 'kalk' : 'fliese'}
          mitte
          titel={inhalt.stimmenTitel ?? stimmenTitel}
          einleitung={inhalt.stimmenEinleitung ? <p><Textmarken text={inhalt.stimmenEinleitung} /></p> : undefined}
        >
          {stimmenZusatz && (
            <div data-kopf-pause="ganz" className="mb-12">
              {stimmenZusatz}
            </div>
          )}
          <Stimmen ids={inhalt.stimmen} form={inhalt.stimmenEinzeln || !inhalt.stimmenGross ? 'einzeln' : 'gross'} versatz={inhalt.stimmenEinzeln ? inhalt.stimmenVersatz : !inhalt.stimmenGross} />
        </Abschnitt>
      )}
      {inhalt.orte && <Einsatzorte titel={inhalt.orte.titel} einleitung={inhalt.orte.einleitung} />}
    </>
  );
}
