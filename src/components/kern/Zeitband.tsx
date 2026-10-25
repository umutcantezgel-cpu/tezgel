// Zeitband (KERN K-008; E4-NACH-01): die Firmengeschichte als gezeichneter Belag im Planblatt von /ueber-uns.
// Jeder Zeitraum zwischen zwei Jahren der Zeitleiste (`historyTimeline`) ist ein Belagstück, seine Breite folgt der Zahl
// der Jahre; das Fugenbild zeigt, was die Zeitleiste über den Zeitraum sagt: bis 2014 kleinformatige Fliesen im
// Kreuzverband, ab 2014 fugenarme Großformate („Große Fliesen mit wenig Fugen“), ab 2019 zusätzlich das umlaufende
// Dichtband („Abdichtung nach DIN 18534 als Standard“). An jeder Fuge steht das Jahr in Mono, am Ende „Heute“.
// Keine erfundenen Werte – nur die Jahre der Konfiguration und das Baujahr der Seite für „Heute“. Dekorativ.
import type { CSSProperties } from 'react';
import { historyTimeline } from '@/config/company';

const JAHR_HEUTE = new Date().getFullYear();
const H = 60; // Höhe des Bands in Zeichnungseinheiten
const E = 10; // Einheiten je Jahr

export default function Zeitband() {
  const punkte = historyTimeline.map((e: { year: string }) => ({
    etikett: e.year,
    jahr: /^\d{4}$/.test(e.year) ? Number(e.year) : JAHR_HEUTE,
  }));
  const abschnitte = punkte.slice(0, -1).map((p, i) => ({ von: p, bis: punkte[i + 1], jahre: Math.max(1, punkte[i + 1].jahr - p.jahr) }));
  // Lage je Stück = Summe der vorherigen Breiten (ohne veränderliche Zählvariable)
  const stuecke = abschnitte.map((a, i) => ({
    ...a,
    i,
    b: a.jahre * E,
    x: abschnitte.slice(0, i).reduce((summe, v) => summe + v.jahre * E, 0),
  }));
  const W = stuecke.reduce((summe, s) => summe + s.b, 0);

  return (
    <div aria-hidden="true" className="w-full">
      <svg viewBox={`-2 -2 ${W + 4} ${H + 4}`} className="verlegeplan block h-auto w-full" focusable="false">
        {stuecke.map((s) => {
          // Fugenbild je Zeitraum: 1. kleines Format (Raster 7,5), danach Großformat (Breite 20, eine Lagerfuge)
          const klein = s.i === 0;
          const schritt = klein ? 7.5 : 20;
          const senkrecht: number[] = [];
          for (let fx = s.x + schritt; fx < s.x + s.b - 0.5; fx += schritt) senkrecht.push(fx);
          const waagrecht = klein ? [15, 30, 45] : [30];
          return (
            <g key={s.von.etikett}>
              {waagrecht.map((wy) => <path key={`w${wy}`} className="plan-fuge" d={`M${s.x} ${wy}h${s.b}`} />)}
              {senkrecht.map((fx) => <path key={`s${fx}`} className="plan-fuge" d={`M${fx} 0v${H}`} />)}
              {s.i >= 2 && <rect className="plan-dichtband" x={s.x + 3} y={3} width={s.b - 6} height={H - 6} />}
              {s.i > 0 && <path className="plan-raum" d={`M${s.x} 0v${H}`} />}
            </g>
          );
        })}
        <rect className="plan-raum" x={0} y={0} width={W} height={H} />
      </svg>
      {/* Jahre an den Fugen */}
      <div className="mt-3 flex font-mono text-fs-1 text-tinte-2">
        {stuecke.map((s) => (
          // Breite je Zeitraum nach Zahl der Jahre: CSS-Variable --jahre, Regel `.zeitband-stueck` in globals.css
          <div key={s.von.etikett} className="zeitband-stueck flex justify-between" style={{ '--jahre': s.jahre } as CSSProperties}>
            <span className={s.i === 0 ? 'text-tinte' : undefined}>{s.von.etikett}</span>
            {s.i === stuecke.length - 1 && <span className="text-tinte">{s.bis.etikett}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
