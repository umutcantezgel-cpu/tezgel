'use client';
// Großer Moment „formatregler“ (KERN v3.4 K-007, K-008; E3-GRAF-05; /leistungen Abschnitt 3, Schlitz momente.tun): dieselbe
// Wand links mit kleinen, rechts mit großen Fliesen (bis 120 × 260 cm, F-20); die Zeichnung zeigt, wie viel weniger Fugen große
// Fliesen haben (ohne Zahlen, E-045). Der Regler schiebt
// die Trennlinie direkt, ohne Übergang (Rückmeldung; reduziert gleich). Bedienung: nativer Schieberegler (Pfeile, Bild auf/ab,
// Pos1, Ende; Screenreader mit Ansage) und Zeiger auf der Wand (Maus klicken und ziehen; Finger waagrecht ziehen oder tippen,
// senkrecht scrollt die Seite weiter). Bewegt wird nur translate über --formatregler-teil (CSS in bewegung.css).
// Ohne JavaScript steht die Linie in der Mitte, beide Formate sind zu sehen; der Regler ist unsichtbar,
// sein Platz bleibt (kein Layoutsprung). Texte aus _werkstatt/texte/leistungen.md.
import { useId, useRef, useState, useSyncExternalStore, type CSSProperties, type PointerEvent as Zeigerereignis } from 'react';
import clsx from 'clsx';
import Icon from '@/components/icons/Icon';
import Wand from './Wand';
import { START, wertAusZeiger, wertText } from './geometrie';

const ohneAbo = () => () => {};
const NBSP = String.fromCharCode(160);
const GROSS_NAME = `Große Fliese, bis 120${NBSP}×${NBSP}260${NBSP}cm`;

export default function Formatregler() {
  const [wert, setWert] = useState(START);
  // true nach der Hydrierung, auf dem Server und ohne JavaScript false (Muster aus common/FussGruppe.tsx)
  const bereit = useSyncExternalStore(ohneAbo, () => true, () => false);
  const zeiger = useRef<number | null>(null);
  const reglerId = `formatregler-${useId().replace(/[^a-zA-Z0-9-]/g, '')}`;
  const ausZeiger = (e: Zeigerereignis<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const neu = wertAusZeiger(e.clientX, r.left, r.width);
    if (neu !== null) setWert(neu);
  };
  return (
    <div className="@container">
      {/* K-016 (E-047): der Satz über der Wand, mittig, kein zweiter Strang daneben; die Wand mittig, am Desktop halb so breit */}
      <figure data-motion="formatregler" className="formatregler mx-auto flex w-full max-w-md flex-col gap-6 text-tinte @2xl:max-w-full @2xl:w-1/2">
        <figcaption className="text-center font-text text-fs-4 font-semibold text-pretty">Große Fliesen haben weniger Fugen.</figcaption>
        {/* Namen stehen über der Wand, links über den kleinen, rechts über den großen Fliesen (die Pfeile zeigen dorthin) */}
        <div>
          <div className="mb-4 grid grid-cols-1 gap-4 @xs:grid-cols-2">
            <p className="flex items-center gap-2 font-text text-fs-3 font-semibold"><Icon name="pfeil-links" groesse={4} /><span className="min-w-0">Kleine Fliese</span></p>
            <p className="flex items-center gap-2 font-text text-fs-3 font-semibold @xs:justify-end"><span className="min-w-0 text-pretty @xs:text-right">{GROSS_NAME}</span><Icon name="pfeil-rechts" groesse={4} /></p>
          </div>
          <div
            role="img"
            aria-label="Dieselbe Wand, links mit kleinen Fliesen, rechts mit großen Fliesen."
            className={clsx('formatregler-bild touch-pan-y select-none', bereit && 'cursor-ew-resize')}
            style={{ '--formatregler-teil': `${wert}%` } as CSSProperties}
            onPointerDown={(e) => {
              if (e.button !== 0) return;
              zeiger.current = e.pointerId;
              e.currentTarget.setPointerCapture(e.pointerId);
              // Maus springt sofort; Finger erst beim Ziehen oder Tippen, damit Scrollen die Linie nicht versetzt
              if (e.pointerType === 'mouse') ausZeiger(e);
            }}
            onPointerMove={(e) => { if (zeiger.current === e.pointerId) ausZeiger(e); }}
            onPointerUp={(e) => { if (zeiger.current !== e.pointerId) return; ausZeiger(e); zeiger.current = null; }}
            onPointerCancel={() => { zeiger.current = null; }}
          >
            <Wand format="klein" />
            <div className="formatregler-gross" aria-hidden="true"><div><Wand format="gross" /></div></div>
            <div className="formatregler-trenner" aria-hidden="true">
              <span className="formatregler-griff flex size-11 items-center justify-center border border-tinte bg-fliese"><Icon name="pfeil-links" groesse={4} /><Icon name="pfeil-rechts" groesse={4} /></span>
            </div>
          </div>
          <div className={clsx('formatregler-regler mt-6', !bereit && 'invisible')}>
            <label htmlFor={reglerId} className="block font-text text-fs-2 text-tinte-2">Schieben Sie den Regler nach links oder rechts.</label>
            <input id={reglerId} type="range" min={0} max={100} step={1} value={wert} aria-valuetext={wertText(wert)} onChange={(e) => setWert(Number(e.target.value))} className="mt-2 block h-11 w-full cursor-pointer accent-tinte" />
          </div>
        </div>
      </figure>
    </div>
  );
}
