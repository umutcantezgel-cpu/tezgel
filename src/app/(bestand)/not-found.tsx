import type { Metadata } from 'next';
import Einstieg from '@/components/kern/Einstieg';
import Hauptknopf from '@/components/kern/Hauptknopf';
import Knopf from '@/components/kern/Knopf';
import { COMPANY_DATA } from '@/config/company';

export const metadata: Metadata = {
  // Marke hängt die Vorlage an (Root-Layout bzw. global-not-found.tsx), daher hier nur der Seitenname
  title: 'Seite nicht gefunden (404)',
  description: 'Diese Seite gibt es bei Fliesenverlegung Tezgel nicht. Von hier kommen Sie zur Startseite, zum Termin bei Ihnen vor Ort oder direkt ans Telefon.',
  robots: {
    index: false,
    follow: true,
  },
};

// Bodenausschnitt im Drittelverband mit einer verrutschten Fliese (KERN v3 K-008): Die Laserlinie läuft an der Fuge
// entlang, eine Fliese liegt schief daneben; in ihrem Platz sieht man das gekämmte Kleberbett. Dekorativ.
const B = 48;
const H = 24;
const REIHEN = 5;
const SPALTEN = 4; // vier Fliesen je Reihe, damit die verrutschte Fliese auch mobil groß genug ist
const LUECKE = { reihe: 2, x: 64 }; // Platz der verrutschten Fliese (Reihe 2 ist um zwei Drittel versetzt: x = −32 + 2 · 48)

function Boden() {
  const fliesen: { x: number; y: number }[] = [];
  for (let r = 0; r < REIHEN; r++) {
    const v = ((r % 3) * B) / 3;
    for (let x = -v; x < B * SPALTEN; x += B) {
      if (!(r === LUECKE.reihe && Math.round(x) === LUECKE.x)) fliesen.push({ x, y: r * H });
    }
  }
  const ly = LUECKE.reihe * H;
  return (
    <svg viewBox={`0 0 ${B * SPALTEN} ${H * REIHEN}`} aria-hidden="true" focusable="false" className="block h-auto w-full bg-fuge">
      <g className="fill-fliese">
        {fliesen.map((f) => (
          <rect key={`${f.x}-${f.y}`} x={f.x + 0.5} y={f.y + 0.5} width={B - 1} height={H - 1} />
        ))}
      </g>
      {/* Platz der Fliese: Kleberbett, mit dem Zahnspachtel gekämmt */}
      <rect x={LUECKE.x + 0.5} y={ly + 0.5} width={B - 1} height={H - 1} className="fill-kalk" />
      <g className="fill-none stroke-strich" strokeWidth="0.6">
        {Array.from({ length: 7 }, (_, i) => (
          <line key={i} x1={LUECKE.x + 4} x2={LUECKE.x + B - 4} y1={ly + 3 + i * 3} y2={ly + 3 + i * 3} />
        ))}
      </g>
      {/* Laserlinie an der Unterkante der Reihe */}
      <line x1="0" x2={B * SPALTEN} y1={ly + H} y2={ly + H} className="stroke-laser" strokeWidth="1" />
      {/* die verrutschte Fliese: liegt schief, halb über dem Platz daneben */}
      <g transform={`translate(${LUECKE.x + B / 2 + 14} ${ly + H / 2 - 6}) rotate(-9)`}>
        <rect x={-B / 2 + 1} y={-H / 2 + 2} width={B - 1} height={H - 1} className="fill-tinte opacity-10" />
        <rect x={-B / 2} y={-H / 2} width={B - 1} height={H - 1} className="fill-fliese stroke-strich" strokeWidth="0.6" />
      </g>
    </svg>
  );
}

// 404 (KERN v3 K-009, F-17): Arbeitsansicht mit der verrutschten Fliese und drei Wegen: Startseite, Termin anfragen, Anrufen.
export default function NotFound() {
  const { contact } = COMPANY_DATA;
  return (
    <Einstieg
      art="arbeit"
      titel="Seite nicht gefunden"
      vorspann={
        <p>
          Hier ist etwas verrutscht: Diese Seite gibt es nicht, oder sie ist umgezogen (Fehler 404). Einer dieser drei Wege
          bringt Sie weiter.
        </p>
      }
      aktionen={
        <>
          <Knopf href="/" variante="neben" iconLinks="haus">Zur Startseite</Knopf>
          <Hauptknopf breit />
          <Knopf href={`tel:${contact.phoneLink}`} variante="neben" iconLinks="telefon" aria-label={`Anrufen: ${contact.phone}`}>
            Anrufen: <span className="font-mono">{contact.phone}</span>
          </Knopf>
        </>
      }
      rand={
        <div className="border border-fuge bg-fliese p-6">
          <Boden />
        </div>
      }
    />
  );
}
