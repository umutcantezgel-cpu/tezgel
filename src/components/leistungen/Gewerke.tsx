// /leistungen · Fachgewerke (S-01, KERN v2): `div#gewerke` wie im Bestand (Sprungziel), darin die vier Fachgewerke als
// Plan-Felder untereinander an einer durchgehenden Fuge (Rasterkante oben und links, jedes Feld schließt rechts und unten).
// Keine eigene Überschrift (der Bestand hat keine): Die Felder tragen je eine H2, der Sprungindex im Einstieg führt hierher.
import { SERVICES } from '@/config/services';
import { seitenKlassen } from '@/components/kern/stile';
import Gewerk from '@/components/leistungen/Gewerk';

export default function Gewerke() {
  return (
    <div id="gewerke" className="scroll-mt-24 py-16 lg:py-24">
      <div className={seitenKlassen}>
        <div className="border-t border-l border-fuge">
          {SERVICES.map((leistung, nr) => (
            <Gewerk key={leistung.id} leistung={leistung} nr={nr} />
          ))}
        </div>
      </div>
    </div>
  );
}
