// Dev-Schaufenster (nur next dev): Szene „Verlegeplan entsteht“ (szene-ablauf, großer Moment /bad) mit den
// Ablaufschritten aus der Firmenkonfiguration, davor die drei Planzustände einzeln.
import Einstieg from '@/components/kern/Einstieg';
import Abschnitt from '@/components/kern/Abschnitt';
import SzeneAblauf from '@/components/kern/SzeneAblauf';
import Verlegeplan from '@/components/kern/Verlegeplan';
import { processSteps } from '@/config/company';

export const metadata = { title: 'Schaufenster · Szene', robots: { index: false, follow: false } };

const schritte = processSteps.map((s) => ({ nummer: s.step, titel: s.title, untertitel: s.subtitle, text: s.description }));

export default function Szene() {
  return (
    <>
      <Einstieg art="arbeit" etikett="Schaufenster · nur Entwicklung" titel="Szene „Verlegeplan entsteht“" />
      <Abschnitt id="sf-zustaende" nummer="01" etikett="Planzustände" titel="Aufmaß · Fugenbild · verlegt">
        <div className="grid grid-cols-1 gap-px border border-fuge bg-fuge md:grid-cols-3">
          {(['aufmass', 'fugenbild', 'verlegt'] as const).map((z) => (
            <div key={z} className="bg-fliese p-6">
              <Verlegeplan plan="bad" zustand={z} />
              <div className="mt-4 font-mono text-fs-1 text-tinte-2">{z}</div>
            </div>
          ))}
        </div>
      </Abschnitt>
      <Abschnitt id="sf-szene" nummer="02" etikett="Ablauf" titel="In 3 Schritten zu Ihrem neuen Belag" flaeche="fliese">
        <SzeneAblauf schritte={schritte} untertitelOben />
      </Abschnitt>
    </>
  );
}
