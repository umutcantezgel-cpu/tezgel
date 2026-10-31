// Vorlagen · Vergleich nach „Was wir tun“ (UM-E4-EP1, KERN v4 K-003 Nr. 3 und 4, K-009; Rückführung aus E0 nach UM-5): Bauweisen
// nebeneinander, damit man sieht, welche zur eigenen Fläche passt. Je Bauweise ein Schnitt im Stil der Plan-Vignetten (Linien
// 1,5 px, currentColor, Schraffur, Körnung und Pfeile in Strich, kein Rot, keine IDs), darunter der Name und die Kriterien als
// Beschreibungsliste an der Fuge. Ab lg stehen die Bauweisen als drei Spalten mit einer Fuge dazwischen; Schnitt, Name und
// jedes Kriterium sind über Subgrid je eine gemeinsame Zeile, so fluchten die Werte quer wie in einer Tabelle (ein Planblatt
// statt einer Kartenreihe). Darunter Bauweise für Bauweise untereinander in der Lesebreite. Die Schnitte stehen im selben Maßstab: Wie hoch
// der Belag über seinem Unterbau liegt, sieht man ohne Zahl (Stelzlager oben, Splittbett darunter, gebunden am tiefsten).
// Fläche Fliese: Sie setzt den Abschnitt gegen „Was wir tun“ auf Kalk ab. Ohne Bewegung (Ruhe; der große Moment der Seite
// steht direkt davor). Der Abschnitt zeichnet spät (unter dem ersten Bildschirm).
// Aufklapper (UM-E4-SICHT-FIX M-B4, E-104 Nr. 3): Offen stehen je Bauweise Schnitt, Name und das Kriterium, das die Wahl
// entscheidet (`offen`, auf /balkon-terrasse „Geeignet für“), ab lg in drei Spalten, mobil untereinander. Die übrigen Kriterien
// stehen im nativen Aufklapper „Alle Merkmale im Vergleich“: geöffnet ab lg die fluchtende Tabelle (Subgrid) wie bisher, mobil
// Bauweise für Bauweise in fester Folge. Der Hinweis (Plattenstärke) steht im Aufklapper „Mehr erfahren“. Keine Reiter: Der
// ganze Inhalt steht im DOM (EP1), lesbarkeit.mjs öffnet jedes details vor dem Lesen und misst so jede Zelle mit. Serverkomponente.
import type { ComponentType } from 'react';
import clsx from 'clsx';
import Abschnitt from '@/components/kern/Abschnitt';
import Textmarken from '@/components/kern/Textmarken';
import Aufklapper from './Aufklapper';
import { Linie, Planrahmen, Punkt, pfeil, schraffur } from '@/components/kern/vignetten/zeichnen';
import type { VergleichInhalt, VergleichSchnitt } from '../inhalt';

// Gemeinsamer Ausschnitt aller Schnitte (gleicher Maßstab): Unterbau unten, Belag oben, darüber Platz für den Weg des Wassers
const AUSSCHNITT = '0 24 240 96';
// Platten mit offener Fuge (4 Einheiten) über den Lagern bzw. dem Bett; Plattenkanten an den Fugen 66/70, 126/130, 186/190
const KANTEN = [8, 66, 70, 126, 130, 186, 190, 232];
const platten = (oben: number, unten: number) => {
  const teile: string[] = [];
  for (let i = 0; i < KANTEN.length; i += 2) teile.push(`M${KANTEN[i]} ${oben}H${KANTEN[i + 1]}V${unten}H${KANTEN[i]}Z`);
  return teile.join('');
};
// Rohdecke (schraffiert) mit Abdichtung als Band darauf; gilt für Stelzlager und gebundene Verlegung
const DECKE = 'M8 96H232M8 116H232M8 92V116M232 92V116';
const ABDICHTUNG = 'M8 92H232';
const DECKE_SCHRAFFUR = schraffur(8, 96, 224, 20);
// Körnung in versetzten Reihen (Splitt fein, Schotter grob); um den Pfeil des Wassers bei x = 128 bleibt eine Gasse frei
const koernung = (reihen: number[], abstand: number, r: number, gasse = false) =>
  reihen.flatMap((y, z) => {
    const punkte: [number, number, number][] = [];
    for (let x = 8 + r + 2 + (z % 2 ? abstand / 2 : 0); x <= 232 - r - 2; x += abstand) {
      if (!gasse || Math.abs(x - 128) > r + 4) punkte.push([x, y, r]);
    }
    return punkte;
  });

function Stelzlager() {
  // Lager unter jeder Fuge und nahe den Enden: Fuß auf der Abdichtung, Rohr, Kopf unter den Platten
  const lager = [16, 68, 128, 188, 224]
    .map((x) => `M${x - 9} 92V88H${x + 9}V92M${x - 3} 88V58M${x + 3} 88V58M${x - 8} 58H${x + 8}V56H${x - 8}Z`)
    .join('');
  return (
    <Planrahmen viewBox={AUSSCHNITT}>
      <g className="text-strich">
        <Linie d={DECKE_SCHRAFFUR} />
        {/* Regen läuft durch die offene Fuge auf die Abdichtung und dort im Gefälle ab */}
        <Linie d={pfeil(128, 26, 44)} />
        <Linie d="M140 86H176M172 82L176 86L172 90" />
      </g>
      <Linie d={DECKE + ABDICHTUNG} />
      <Linie d={lager} />
      <Linie d={platten(48, 56)} />
    </Planrahmen>
  );
}

function Splittbett() {
  return (
    <Planrahmen viewBox={AUSSCHNITT}>
      <g className="text-strich">
        {/* Erdreich (schraffiert), Unterbau aus Schotter, darauf das Splittbett */}
        <Linie d={schraffur(8, 104, 224, 12, 8)} />
        {koernung([86, 97], 14, 3, true).map(([x, y, r]) => (
          <Punkt key={`s${x}-${y}`} cx={x} cy={y} r={r} />
        ))}
        {koernung([71, 76], 8, 1, true).map(([x, y, r]) => (
          <Punkt key={`k${x}-${y}`} cx={x} cy={y} r={r} />
        ))}
        {/* Regen versickert durch Fuge und Bett in den Unterbau */}
        <Linie d={pfeil(128, 40, 100)} />
      </g>
      <Linie d="M8 80H232M8 104H232M8 116H232M8 68V116M232 68V116" />
      <Linie d={platten(60, 68)} />
    </Planrahmen>
  );
}

function Gebunden() {
  const bett = koernung([88], 6, 0.8);
  return (
    <Planrahmen viewBox={AUSSCHNITT}>
      <g className="text-strich">
        <Linie d={DECKE_SCHRAFFUR} />
        {bett.map(([x, y, r]) => (
          <Punkt key={`b${x}`} cx={x} cy={y} r={r} />
        ))}
        {/* geschlossene Fugen; Regen läuft oben auf dem Belag ab */}
        <Linie d="M68 76V84M128 76V84M188 76V84" />
        <Linie d="M136 66H196M191 61L196 66L191 71" />
      </g>
      <Linie d={DECKE + ABDICHTUNG} />
      {/* Kleber- bzw. Mörtelbett auf der Abdichtung, darauf der Belag in einem Stück */}
      <Linie d="M8 84H232M8 76H232M8 76V92M232 76V92" />
    </Planrahmen>
  );
}

const SCHNITTE: Record<VergleichSchnitt, ComponentType> = { stelzlager: Stelzlager, splittbett: Splittbett, gebunden: Gebunden };

// Zeilen je Spalte ab lg (Subgrid; Klassen fest im Quelltext): offen Schnitt, Name und das offene Kriterium; im Aufklapper der
// Name und je übriges Kriterium eine Zeile (bei 3 bis 6 Kriterien also 3 bis 6 Zeilen, die Liste 2 bis 5)
const ZEILEN: Record<number, string> = { 2: 'lg:row-span-2', 3: 'lg:row-span-3', 4: 'lg:row-span-4', 5: 'lg:row-span-5', 6: 'lg:row-span-6' };

/** ein Kriterium als Zeile an der Fuge: Name und Wert (als Absatz, damit lesbarkeit.mjs jede Zelle für sich misst) */
function Kriterium({ name, wert }: { name: string; wert: string }) {
  return (
    <div className="border-t border-fuge py-4 last:border-b">
      <dt className="font-text text-fs-2 font-semibold text-tinte-2">{name}</dt>
      <dd className="mt-1 font-text text-fs-3 text-pretty text-tinte">
        <p>
          <Textmarken text={wert} />
        </p>
      </dd>
    </div>
  );
}

// Spalte je Bauweise: bis lg in der Lesebreite mittig wie die Fliesen in „Was wir tun“, ab lg ein Subgrid über die gemeinsamen
// Zeilen mit demselben Innenabstand, die Fuge zwischen den Spalten
const spalte = (i: number, zeilen: string) =>
  clsx('mx-auto grid w-full max-w-mass content-start lg:max-w-full lg:grid-rows-subgrid lg:px-8', zeilen, i > 0 && 'lg:border-l lg:border-fuge');

export default function Vergleich({ inhalt }: { inhalt: VergleichInhalt }) {
  const zahl = inhalt.kriterien.length;
  if (zahl < 3 || zahl > 6) throw new Error(`Vergleich: ${zahl} Kriterien, vorgesehen sind 3 bis 6`);
  const offen = inhalt.kriterien.find((k) => k.id === inhalt.offen) ?? inhalt.kriterien[0];
  const uebrige = inhalt.kriterien.filter((k) => k !== offen);
  return (
    <Abschnitt
      id="vergleich"
      formel="tun"
      leitachse
      spaet
      flaeche="fliese"
      mitte
      titel={inhalt.titel}
      einleitung={inhalt.einleitung ? <p><Textmarken text={inhalt.einleitung} /></p> : undefined}
    >
      {/* je Bauweise: Schnitt, Name und das offene Kriterium; ab lg je Spalte ein Subgrid über die gemeinsamen Zeilen, gleich breite
          Spalten mit demselben Innenabstand (die Gruppe greift dafür um ihn über den Satzspiegel). Gruppen statt Liste: Als li
          zählte lesbarkeit.mjs jede Spalte als einen Satz von rund 50 Wörtern, wie es eine Tabelle nicht täte. Jeder Wert steht
          dagegen als Absatz in seiner Zelle: So misst lesbarkeit.mjs (p und li, kein dd) jede Zelle für sich mit, Satzlänge,
          Flesch und Glossar. Die Zellen tragen Textmarken: Steht ein Fachwort hier zum ersten Mal auf der Seite, folgt seine
          Erklärung in der Zelle (K-011), auch im Aufklapper (lesbarkeit.mjs liest geöffnet) */}
      <div className="grid grid-cols-1 gap-16 lg:-mx-8 lg:grid-cols-3 lg:gap-0">
        {inhalt.spalten.map((s, i) => {
          const Schnitt = SCHNITTE[s.schnitt];
          return (
            // von md bis lg Schnitt links, Name und Kriterium rechts: untereinander stand je Bauweise ein Schnitt in voller
            // Lesebreite, bei t768 und q844 rund 600 px je Bauweise (Prüfung SF-B, Nacharbeit); ab lg wieder eine Spalte im Subgrid
            <div key={s.name} className={clsx(spalte(i, ZEILEN[3]), 'md:grid-cols-2 md:gap-x-8 lg:grid-cols-1')}>
              <div className="pb-6 text-tinte md:row-span-2 lg:row-span-1">
                <Schnitt />
              </div>
              <h3 className="pb-4 font-anzeige text-fs-5 font-extrabold text-tinte">{s.name}</h3>
              <dl>
                <Kriterium name={offen.name} wert={s.werte[offen.id]} />
              </dl>
            </div>
          );
        })}
      </div>
      <Aufklapper zeile="Alle Merkmale im Vergleich" className="mt-12" zeileKlassen="mx-auto max-w-mass border-y border-fuge">
        <div className="grid grid-cols-1 gap-12 pt-8 lg:-mx-8 lg:grid-cols-3 lg:gap-0">
          {inhalt.spalten.map((s, i) => (
            <div key={s.name} className={spalte(i, ZEILEN[zahl])}>
              {/* Name der Bauweise als Zeile, keine zweite Überschrift (die H3 stehen offen darüber) */}
              <p className="pb-4 font-text text-fs-3 font-semibold text-tinte">{s.name}</p>
              <dl className={clsx('grid lg:grid-rows-subgrid', ZEILEN[zahl - 1])}>
                {uebrige.map((k) => (
                  <Kriterium key={k.id} name={k.name} wert={s.werte[k.id]} />
                ))}
              </dl>
            </div>
          ))}
        </div>
      </Aufklapper>
      {inhalt.hinweis && (
        <Aufklapper zeile="Mehr erfahren" zeileKlassen="mx-auto max-w-mass border-b border-fuge">
          <div className="mx-auto max-w-mass pt-4 pb-6">
            <p className="border-l-2 border-tinte pl-6 font-text text-fs-3 text-pretty text-tinte">
              <strong className="font-semibold">{inhalt.hinweis.stichwort}:</strong> <Textmarken text={inhalt.hinweis.text} />
            </p>
          </div>
        </Aufklapper>
      )}
    </Abschnitt>
  );
}
