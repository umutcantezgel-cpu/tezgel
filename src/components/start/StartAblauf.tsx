// Startseite · 4 So läuft es ab (KERN v3 K-003 Nr. 5, K-005, K-009; Text REF-start): drei Schritte an der Laserlinie.
// Die rote Linie führt durch die Schrittfolge (K-003 Nr. 5): ab lg waagrecht über den drei Spalten, der mittlere Schritt
// um ein Drittel der langen Fliesenseite tiefer (Stufe 16, der Versatz dieses Bildschirms), sodass die Linie wie eine
// versetzte Reihe springt; mobil senkrecht links vom Text, genau auf dem Lot der Laserlinie (die Leitachse steht dort
// links im Seitenrand, darum rückt die Liste um den Abstand Rand bis Lot nach links). Je Schritt ein Fugenkreuz am Anfang der Linie, die Nummer in
// Mono (Zahl), ohne Kästen, damit der Abschnitt anders gebaut ist als Lage, Stimmen und Orte. Darunter, abgesetzt durch eine
// Fuge, die drei Belege aus dem Faktenblatt (K-015), die vorher in „Was wir tun“ standen (Sichtabnahme E2, Befund 8): ab lg in
// drei Spalten wie die Schritte, mobil untereinander, je mit Fugenkreuz, ohne Kästen. Serverkomponente.
import clsx from 'clsx';
import Abschnitt from '@/components/kern/Abschnitt';
import Fachwort from '@/components/kern/Fachwort';
import Fugenkreuz from '@/components/kern/Fugenkreuz';

const SCHRITTE = [
  {
    titel: 'Termin bei Ihnen vor Ort',
    text: 'Deniz Tezgel kommt zu Ihnen. Er schaut sich den Raum genau an und prüft den Untergrund. Dieser Termin ist für Sie kostenfrei.',
  },
  {
    titel: 'Planen und auswählen',
    text: 'Sie suchen mit uns Fliesen, ihre Größe und die Farbe der Fugen aus. Danach bekommen Sie ein Angebot mit festem Preis.',
  },
  {
    titel: 'Verlegen und übergeben',
    text: 'Wir verlegen sauber und übergeben den Raum besenrein. Zum Schluss gehen wir alles gemeinsam durch.',
  },
];

export default function StartAblauf() {
  return (
    <Abschnitt id="ablauf" formel="ablauf" leitachse flaeche="fliese" titel="So kommen Sie zu Ihrem neuen Boden." className="lg:pb-32">
      <ol className="-ml-2 grid md:-ml-4 lg:ml-0 lg:grid-cols-3">
        {SCHRITTE.map((s, i) => {
          const letzter = i === SCHRITTE.length - 1;
          return (
            <li
              key={s.titel}
              className={clsx(
                'relative border-l-2 pb-12 pl-8 lg:border-t-2 lg:border-l-0 lg:pt-8 lg:pr-12 lg:pb-0 lg:pl-0',
                letzter ? 'border-l-transparent lg:border-t-laser' : 'border-laser',
                i === 1 && 'lg:mt-16',
              )}
            >
              <Fugenkreuz className="absolute top-1 left-0 size-3 -translate-x-1/2 text-tinte lg:top-0 lg:-translate-y-1/2" />
              <p className="font-mono text-fs-4 text-tinte-2">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-2 font-anzeige text-fs-5 font-extrabold text-tinte">{s.titel}</h3>
              <p className="mt-4 max-w-mass font-text text-fs-3 text-tinte-2">{s.text}</p>
            </li>
          );
        })}
      </ol>
      <ul className="mt-4 grid gap-6 border-t border-fuge pt-8 lg:mt-24 lg:grid-cols-3 lg:gap-12">
        <li className="flex gap-3">
          <Fugenkreuz className="mt-2 size-3 shrink-0 text-tinte" />
          <p className="font-text text-fs-3 text-tinte">Seit 2008 sind wir bei der Handwerkskammer Wiesbaden eingetragen.</p>
        </li>
        <li className="flex gap-3">
          <Fugenkreuz className="mt-2 size-3 shrink-0 text-tinte" />
          <p className="font-text text-fs-3 text-tinte">
            {/* zwei Sätze, jedes Fachwort mit seiner Erklärung am Satzende (höchstens 25 Wörter je Satz, K-010) */}
            Im Bad kommt vor dem Verlegen eine <Fachwort id="abdichtung">Abdichtung</Fachwort>. Dabei halten wir uns
            an <Fachwort id="din-18534">DIN 18534</Fachwort>.
          </p>
        </li>
        <li className="flex gap-3">
          <Fugenkreuz className="mt-2 size-3 shrink-0 text-tinte" />
          <p className="font-text text-fs-3 text-tinte">Wohnen Sie während der Arbeiten im Haus, schützen wir Ihre Räume vor Staub.</p>
        </li>
      </ul>
    </Abschnitt>
  );
}
