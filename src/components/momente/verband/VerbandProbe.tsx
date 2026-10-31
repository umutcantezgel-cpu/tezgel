// Musterprobe „verband“ (KERN v3.4 K-007 und K-008, E3-GRAF-06): großer Moment auf /fliesen im Schlitz
// zeichnungen.verband der WissensSeite. Vier Verlegemuster zum Ausprobieren als native Radiogruppe ohne JavaScript; die
// Wahl wirkt über :has() (Regeln in bewegung.css, Abschnitt verband): Kreuzfuge, Halb- und Drittelverband versetzen die
// Reihen desselben Plans (translate, Regeln des VerbandUmschalters wiederverwendet), Fischgrät blendet die Reihen aus und
// legt sein Muster eine Viertelplatte weit an den Platz (opacity, translate); Wechsel dauer-3 · ease-setzen. Linien 1,5 px
// wie die Plan-Vignetten (Planrahmen, currentColor): Fugen in Strich, Wand in Tinte, kein Rot (das Rot trägt die Leitachse).
// data-motion nur am fieldset: bewegung.mjs ordnet die Ebenen über closest() zu; eine unsichtbare Fischgrät-Ebene mit
// eigenem data-motion meldete die Prüfung „reduziert“ als Fehler. Ohne :has(): Wahl und Zeichnung ausgeblendet, die vier
// Beschreibungen stehen untereinander. Texte wörtlich aus _werkstatt/texte/fliesen.md. Serverkomponente.
// Höhepunkt der Seite (UM-E4-SICHT-FIX M-C7 Nr. 1 und 2): ein Feld unter den Reitern, darin zuerst der Satz zum gewählten Muster,
// dann ab md die Zeichnung auf drei Fünfteln und daneben im selben Feld das passende vorhandene Foto (Halbverband, Fischgrät;
// über :has(), kein zweiter Kasten, höchstens max-w-md, nie hochskaliert). Bei Kreuzfuge und Drittelverband gibt es kein Foto
// im Bestand: Die Zeichnung steht dann ab md mittig im Feld statt links neben einer leeren Spalte (Nacharbeit SF-C2; die Höhe
// des Felds bleibt, sie kommt von der Zeichnung). Unter md stehen Zeichnung und Foto untereinander (V-7). Eine rote Laserlinie in der Raummitte ist die Bezugsachse, an der man den
// Versatz der Reihen abliest (das Rot dieses Bildschirms). Die Fliesen liegen als Fläche (Fuge) auf dem weißen Feld, die Fugen
// in Tinte 2 (Kontrast etwa 4,9 : 1 zur Fläche; vorher Weiß auf Weiß, die Kreuzfuge las sich als leeres Gitter). Die Geometrie
// (Platte 80 × 40, Raum 360 × 200) bleibt, sie ist in test/verband.test.mjs festgeschrieben.
import { useId } from 'react';
import clsx from 'clsx';
import { Linie, Planrahmen } from '@/components/kern/vignetten/zeichnen';
import Bildfeld from '@/components/kern/Bildfeld';
import type { ArbeitId } from '@/config/arbeiten';
import { RAND, RAUM, REIHEN, fischPfad, reihenDaten, reihenPfad, waagrechteFugen } from './geometrie';

export type Muster = 'kreuz' | 'halb' | 'drittel' | 'fisch';

const MUSTER: { id: Muster; name: string; satz: string }[] = [
  { id: 'kreuz', name: 'Kreuzfuge', satz: 'Die Fugen laufen gerade durch, in Reihen und Spalten wie ein Gitter. Gut passt das in Räume mit klaren Linien.' },
  { id: 'halb', name: 'Halbverband', satz: 'Jede zweite Reihe ist um eine halbe Fliese versetzt. Gut passt das in Wohnräume und auf den Balkon.' },
  { id: 'drittel', name: 'Drittelverband', satz: 'Jede Reihe ist um ein Drittel einer Fliese versetzt. Gut passt das zu großen Fliesen, die ruhig wirken sollen.' },
  { id: 'fisch', name: 'Fischgrät', satz: 'Rechteckige Fliesen liegen im rechten Winkel zueinander, wie beim Holzparkett. Gut passt das an eine Wand mit Nische.' },
];

/** vorhandene Fotos je Muster (Alt-Text aus ARBEITEN); Kreuzfuge und Drittelverband ohne Foto (start-galerie-3 ist dieselbe
 *  Balkonfläche wie fliesen-halbverband und belegt keinen Drittelverband) */
const FOTOS: { muster: Muster; bild: ArbeitId }[] = [
  { muster: 'halb', bild: 'fliesen-halbverband' },
  { muster: 'fisch', bild: 'fliesen-fischgraet' },
];

// Pfade einmal beim Laden des Moduls rechnen (Serverkomponente: nur das Ergebnis geht ins HTML)
const WAAGRECHT = waagrechteFugen();
const FISCH = fischPfad();
const REIHENLISTE = Array.from({ length: REIHEN }, (_, r) => ({ r, d: reihenPfad(r), ...reihenDaten(r) }));
const VIEWBOX = `${-RAND} ${-RAND} ${RAUM.b + 2 * RAND} ${RAUM.h + 2 * RAND}`;
const WAND = `M0 0H${RAUM.b}V${RAUM.h}H0Z`;

/** Draufsicht: Reihenverbände und Fischgrät als zwei Ebenen im selben Raum, beschnitten auf die Wand. */
function Zeichnung({ uid }: { uid: string }) {
  const clip = `muster-raum-${uid}`;
  return (
    <Planrahmen viewBox={VIEWBOX} className="text-tinte">
      {/* die verlegte Fläche: Fliesen in Fuge auf dem weißen Feld, darauf die Fugen */}
      <path d={WAND} stroke="none" className="fill-fuge" />
      <defs>
        <clipPath id={clip}>
          <rect x={0} y={0} width={RAUM.b} height={RAUM.h} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clip})`} className="text-tinte-2">
        <g className="muster-reihen">
          <Linie d={WAAGRECHT} />
          {REIHENLISTE.map((z) => (
            <g key={z.r} className="verband-reihe" data-halb={z.halb} data-drittel={z.drittel}>
              <Linie d={z.d} />
            </g>
          ))}
        </g>
        <g className="muster-fisch">
          <Linie d={FISCH} />
        </g>
      </g>
      <Linie d={WAND} />
      {/* Bezugsachse: rote Laserlinie in der Raummitte (Stoßfuge der Kreuzfuge), über die Wand hinaus bis an den Rand */}
      <Linie d={`M${RAUM.b / 2} ${-RAND}V${RAUM.h + RAND}`} className="text-laser" />
    </Planrahmen>
  );
}

export default function VerbandProbe({ start = 'kreuz', fotos = true, className }: { start?: Muster; fotos?: boolean; className?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9-]/g, '');
  const name = `muster-${uid}`;
  return (
    <div className={clsx('flex flex-col gap-12', className)}>
      {/* Musterwahl (Radiogruppe): Daneben tritt der Kopf des Leitfadens auf ihrer ganzen Höhe zurück, von der Legende bis zur
          Beschreibung (data-kopf-pause="ganz", bewegung.css „Leitfaden mit Abschnittsmarke“; UM-E4-CHOR-FIX): nie ein Kreuz
          neben einem Formular. Neben den Fotos darunter steht er wieder */}
      <fieldset className="verband m-0 min-w-0 border-0 p-0" data-motion="verband" data-kopf-pause="ganz">
        <legend className="muster-legende mb-4 font-text text-fs-3 font-semibold text-tinte">Wählen Sie ein Muster</legend>
        {/* mit :has(): die Wahl steht über der Zeichnung wie Reiter, darunter das Feld mit Satz, Zeichnung und Foto */}
        <div className="verband-bewegt">
          <div className="@container">
            <div className="grid grid-cols-1 gap-px border border-strich bg-strich @xs:grid-cols-2 @2xl:grid-cols-4">
              {MUSTER.map((m) => (
                <label
                  key={m.id}
                  className="verband-wahl relative flex min-h-12 cursor-pointer items-center justify-center bg-fliese px-3 py-3 text-center font-text text-fs-2 font-semibold text-tinte decoration-1 underline-offset-4 has-checked:bg-tinte has-checked:text-kalk pointer-fine:hover:underline"
                >
                  <input
                    type="radio"
                    name={name}
                    value={m.id}
                    defaultChecked={m.id === start}
                    aria-describedby={`${name}-${m.id}`}
                    data-verband-wahl={m.id}
                    className="absolute inset-0 m-0 cursor-pointer appearance-none focus-visible:outline-none"
                  />
                  <span className="relative">{m.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        {/* Beschreibung des gewählten Musters direkt unter den Reitern: mit :has() alle vier in einer Rasterzelle (Höhe der
            längsten, kein Springen), sichtbar nur die gewählte; ohne :has() alle vier untereinander */}
        <div className="muster-texte grid gap-4 border-x border-fuge bg-fliese px-4 pt-4 lg:px-6 lg:pt-6">
          {MUSTER.map((m) => (
            <p key={m.id} data-muster={m.id} className="muster-text max-w-mass font-text text-fs-3 text-pretty text-tinte-2">
              <span className="font-semibold text-tinte">{m.name}:</span>{' '}
              <span id={`${name}-${m.id}`}>{m.satz}</span>
            </p>
          ))}
        </div>
        <div className="verband-bewegt border-x border-b border-fuge bg-fliese p-4 lg:p-6">
          <div className="grid gap-6 md:grid-cols-5 md:items-center md:gap-8">
            {/* Spalten ab md in bewegung.css („verband · Foto im Feld“: drei Fünftel links, ohne Foto mittig), nicht als Utility:
                Die Utility-Schicht ginge der Regel des Zustands vor. Ab md nebeneinander (Nacharbeit 2): Das Foto (3 : 2) ist auf
                zwei Fünfteln stets niedriger als die Zeichnung (9 : 5) auf drei Fünfteln, die Höhe des Felds bleibt beim Wechsel */}
            <div className="verband-zeichnung">
              <Zeichnung uid={uid} />
            </div>
            {/* Foto zum Muster im selben Feld (bewegung.css „verband · Foto im Feld“): nur das des gewählten Musters steht; ohne Foto
                entfällt die Zelle, und die Zeichnung steht ab lg mittig */}
            {fotos && (
              <div className="verband-fotozelle md:col-span-2">
                {FOTOS.map((f) => (
                  <div key={f.muster} data-muster-foto={f.muster} className="verband-foto mx-auto w-full max-w-md">
                    <Bildfeld arbeit={f.bild} sizes="(min-width: 640px) 28rem, 100vw" flaeche />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </fieldset>
    </div>
  );
}
